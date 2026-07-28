/*
 * The ticket-thread reducer (port spec §8.4 / §8.6, orchestrator ruling R4).
 *
 * Pure and unit-testable: no timers, no React, no Math.random. The caller
 * schedules the agent reply through the injectable `delay` helper below, so a
 * test can run the whole simulation synchronously.
 *
 * Status vocabulary is exactly the four the spec documents:
 *   open · pending · solved · closed
 */

import { AGENT_REPLIES, TOPICS } from "../data/demo";
import { dataSource } from "../data/source";
import { NOW_STAMP, subjectFromMessage, ticketCode } from "./format";
import type {
  NewTicketForm,
  ProductId,
  StatusMeta,
  Ticket,
  TicketMessage,
  TicketStatus,
} from "../data/types";

/* ------------------------------------------------------ injectable delay */

/** Runs `fn` after `ms` and returns a cancel handle. */
export type DelayFn = (ms: number, fn: () => void) => () => void;

/** Production delay — a plain `setTimeout`. */
export const realDelay: DelayFn = (ms, fn) => {
  const id = setTimeout(fn, ms);
  return () => clearTimeout(id);
};

/** Test delay — runs the callback synchronously. */
export const immediateDelay: DelayFn = (_ms, fn) => {
  fn();
  return () => {};
};

let activeDelay: DelayFn = realDelay;

/** Swap the delay implementation (tests call this with `immediateDelay`). */
export function setDelay(fn: DelayFn): void {
  activeDelay = fn;
}

export function getDelay(): DelayFn {
  return activeDelay;
}

/** Sugar: `delay(TYPING_DELAY_MS, cb)` using whichever helper is active. */
export function delay(ms: number, fn: () => void): () => void {
  return activeDelay(ms, fn);
}

/** The agent-typing indicator, ~1.2 s in the shipped app (1700 ms in the comp). */
export const TYPING_DELAY_MS = 1200;

/** The chat bot's typing indicator. */
export const CHAT_TYPING_DELAY_MS = 1300;

/* ---------------------------------------------------------- status meta */

const STATUS_META: Record<TicketStatus, StatusMeta> = {
  open: { label: "Open", fg: "--info", soft: "--info-soft", icon: "circle-dot" },
  pending: { label: "Pending", fg: "--warn", soft: "--warn-soft", icon: "clock" },
  solved: {
    label: "Solved",
    fg: "--pos",
    soft: "--pos-soft",
    icon: "check-circle-2",
  },
  closed: {
    label: "Closed",
    fg: "--fg-subtle",
    soft: "--surface-3",
    icon: "archive",
  },
};

/** Falls back to `open`, exactly as the comp does. */
export function statusMeta(status: string): StatusMeta {
  return STATUS_META[status as TicketStatus] ?? STATUS_META.open;
}

/** A `closed` ticket has no Solve button, but a reply still reopens it. */
export function canSolve(ticket: Ticket): boolean {
  return ticket.status !== "solved" && ticket.status !== "closed";
}

/* ------------------------------------------------- deterministic replies */

/**
 * Topic → rotation offset into the reply pool. Unknown or empty topics use
 * offset 0, which reproduces the comp's `AGENT_REPLIES[msgs.length % 4]`.
 */
export function topicOffset(topic: string | undefined): number {
  const i = TOPICS.indexOf(topic ?? "");
  return i < 0 ? 0 : i;
}

/**
 * The canned agent reply — chosen deterministically by topic from a rotating
 * pool (ruling R4). `msgCount` is the message count *after* the customer
 * message was appended.
 */
export function pickAgentReply(
  topic: string | undefined,
  msgCount: number,
  pool: string[] = AGENT_REPLIES,
): string {
  const i = (msgCount + topicOffset(topic)) % pool.length;
  return pool[i];
}

/* ----------------------------------------------------------------- state */

export interface ThreadState {
  /** id → ticket. */
  tickets: Record<string, Ticket>;
  /** Display order; new tickets are unshifted onto the front. */
  order: string[];
  /** Monotonic sort key; the highest rank is the most recent activity. */
  maxRank: number;
  /** Next ticket number — seeded at 3118, so the first created id is HH-3118. */
  nextNum: number;
}

export function initialThreadState(): ThreadState {
  const seeded = dataSource.seedTickets();
  const tickets: Record<string, Ticket> = {};
  for (const t of seeded) tickets[t.id] = t;
  return {
    tickets,
    order: dataSource.seedTicketOrder(),
    maxRank: seeded.reduce((m, t) => Math.max(m, t.rank), 0),
    nextNum: 3118,
  };
}

/** Rows for My tickets — display order, newest activity first. */
export function ticketList(state: ThreadState): Ticket[] {
  return state.order
    .map((id) => state.tickets[id])
    .filter(Boolean)
    .sort((a, b) => b.rank - a.rank);
}

/* --------------------------------------------------------------- actions */

export type ThreadAction =
  /** New-ticket form submit. Creates an `open` ticket with one customer message. */
  | { type: "create"; form: NewTicketForm }
  /** Chat escalation. Creates a `pending` ticket carrying the transcript. */
  | {
      type: "createFromChat";
      product: ProductId;
      transcript: TicketMessage[];
      closer: string;
    }
  /** Customer reply — always moves the ticket back to `open`. */
  | { type: "reply"; id: string; text: string }
  /** The simulated agent reply landing after the typing delay. */
  | { type: "agentReply"; id: string; pool?: string[] }
  /** "Mark as solved". */
  | { type: "markSolved"; id: string };

export interface ThreadResult {
  state: ThreadState;
  /** The ticket the action touched, or `null` when it was a no-op. */
  ticketId: string | null;
  /** True when a customer reply reopened a solved/closed ticket. */
  reopened: boolean;
  /** True when the caller should show the typing indicator and schedule a reply. */
  typing: boolean;
  /** True when nothing changed (empty reply, unknown ticket). */
  noop: boolean;
}

function result(
  state: ThreadState,
  ticketId: string | null,
  extra: Partial<ThreadResult> = {},
): ThreadResult {
  return {
    state,
    ticketId,
    reopened: false,
    typing: false,
    noop: false,
    ...extra,
  };
}

/**
 * The whole ticket lifecycle in one pure function.
 *
 * Returns a fresh state — the input is never mutated, so React sees a new
 * reference every time (the comp mutated in place and called `forceUpdate`,
 * which a hooks port cannot do; spec §13.2 #1).
 */
export function threadReducer(
  state: ThreadState,
  action: ThreadAction,
): ThreadResult {
  switch (action.type) {
    case "create": {
      const { form } = action;
      const id = ticketCode(state.nextNum);
      const rank = state.maxRank + 1;
      const ticket: Ticket = {
        id,
        product: (form.product ?? "doorbell") as ProductId,
        subject: form.subject.trim(),
        status: "open",
        updated: NOW_STAMP,
        rank,
        topic: form.topic,
        msgs: [
          { who: "customer", text: form.desc.trim(), time: NOW_STAMP },
        ],
      };
      return result(
        {
          tickets: { ...state.tickets, [id]: ticket },
          order: [id, ...state.order],
          maxRank: rank,
          nextNum: state.nextNum + 1,
        },
        id,
      );
    }

    case "createFromChat": {
      const id = ticketCode(state.nextNum);
      const rank = state.maxRank + 1;
      const first = action.transcript.find((m) => m.who === "customer");
      const msgs: TicketMessage[] = [
        ...action.transcript,
        { who: "agent", text: action.closer, time: NOW_STAMP },
      ];
      const ticket: Ticket = {
        id,
        product: action.product,
        subject: subjectFromMessage(first?.text ?? "Live chat"),
        status: "pending",
        updated: NOW_STAMP,
        rank,
        msgs,
      };
      return result(
        {
          tickets: { ...state.tickets, [id]: ticket },
          order: [id, ...state.order],
          maxRank: rank,
          nextNum: state.nextNum + 1,
        },
        id,
      );
    }

    case "reply": {
      const text = action.text.trim();
      const prev = state.tickets[action.id];
      if (!text || !prev) return result(state, null, { noop: true });

      const reopened = prev.status === "solved" || prev.status === "closed";
      const rank = state.maxRank + 1;
      const next: Ticket = {
        ...prev,
        status: "open",
        updated: NOW_STAMP,
        rank,
        msgs: [...prev.msgs, { who: "customer", text, time: NOW_STAMP }],
      };
      return result(
        {
          ...state,
          tickets: { ...state.tickets, [action.id]: next },
          maxRank: rank,
        },
        action.id,
        { reopened, typing: true },
      );
    }

    case "agentReply": {
      const prev = state.tickets[action.id];
      if (!prev) return result(state, null, { noop: true });
      const text = pickAgentReply(
        prev.topic,
        prev.msgs.length,
        action.pool ?? AGENT_REPLIES,
      );
      const next: Ticket = {
        ...prev,
        status: "pending",
        updated: NOW_STAMP,
        msgs: [...prev.msgs, { who: "agent", text, time: NOW_STAMP }],
      };
      return result(
        { ...state, tickets: { ...state.tickets, [action.id]: next } },
        action.id,
      );
    }

    case "markSolved": {
      const prev = state.tickets[action.id];
      if (!prev) return result(state, null, { noop: true });
      /*
       * Solving is activity, so it bumps `rank` as well as the stamp.
       *
       * `updated` and `rank` are two views of the same fact — the stamp is
       * what the row says, `rank` is what `ticketList` sorts on. Refreshing
       * only the stamp made a ticket read "Updated Just now" while sitting
       * below one reading "Updated 2h ago", in a list documented as
       * newest-activity-first. The `reply` branch above already does this.
       */
      const rank = state.maxRank + 1;
      const next: Ticket = {
        ...prev,
        status: "solved",
        updated: NOW_STAMP,
        rank,
      };
      return result(
        {
          ...state,
          maxRank: rank,
          tickets: { ...state.tickets, [action.id]: next },
        },
        action.id,
      );
    }

    default:
      return result(state, null, { noop: true });
  }
}

/* -------------------------------------------------------------- timeline */

export type TimelineNodeState = "done" | "current" | "todo";

export interface TimelineNode {
  label: string;
  state: TimelineNodeState;
  /** Every node but the first draws a leading connector. */
  showLine: boolean;
  /** The connector is accent-coloured when the previous node is done. */
  lineActive: boolean;
}

/** The 3-node horizontal timeline on the thread header. */
export function threadTimeline(ticket: Ticket): TimelineNode[] {
  const hasAgent = ticket.msgs.some((m) => m.who === "agent");
  const resolved = ticket.status === "solved" || ticket.status === "closed";
  const done = [true, hasAgent, resolved];
  const cur = resolved ? -1 : hasAgent ? 2 : 1;
  const labels = [
    "Opened",
    "First reply",
    ticket.status === "closed" ? "Closed" : "Solved",
  ];
  return labels.map((label, i) => ({
    label,
    state: done[i] ? "done" : i === cur ? "current" : "todo",
    showLine: i > 0,
    lineActive: i > 0 ? done[i - 1] : false,
  }));
}
