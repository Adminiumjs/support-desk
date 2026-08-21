/*
 * The ticket-thread reducer (port spec §8.4 / §8.6, ruling R4).
 *
 * This is the state machine behind every conversation in the app, so the suite
 * is built on hand-made tickets rather than the demo seed — a failure here is a
 * failure in the rule, not in a copy edit.
 *
 * The rules worth guarding hardest, because each is a plausible "cleanup" away
 * from being wrong:
 *
 *   1. A customer reply always reopens. `solved` and `closed` are not terminal
 *      states — a reply drags either back to `open` and reports `reopened`, so
 *      the store can toast it. Only the *reply* does this; nothing else may.
 *   2. Ordering is `rank`, not `order`. `order` is insertion order and never
 *      re-sorted; `ticketList` sorts by rank descending. An action that changes
 *      what a ticket says about itself ("Updated Just now") without changing its
 *      rank puts the list and the row out of step — see the failing test in
 *      "mark as solved".
 *   3. The agent reply is a pure function of (topic, message count). No clock,
 *      no `Math.random()`: the same conversation always produces the same words.
 *   4. Nothing is mutated. Every branch returns a fresh state, and the no-op
 *      branches return the *same* reference so React can skip the render.
 *
 * The illegal-transition tests below assert what the reducer actually does, not
 * what the UI allows. Where the two differ (the reducer will happily solve a
 * closed ticket) the comment says which screen holds the guard.
 */

import { afterEach, describe, expect, it, vi } from "vitest";
import { AGENT_REPLIES, FIRST_TICKET_NUM, TOPICS } from "../data/demo.ts";
import { NOW_STAMP, ticketCode } from "./format.ts";
import type {
  MessageAuthor,
  NewTicketForm,
  Ticket,
  TicketMessage,
  TicketStatus,
} from "../data/types.ts";
import {
  type ThreadState,
  TYPING_DELAY_MS,
  canSolve,
  delay,
  getDelay,
  immediateDelay,
  initialThreadState,
  pickAgentReply,
  realDelay,
  setDelay,
  statusMeta,
  threadReducer,
  threadTimeline,
  ticketList,
  topicOffset,
} from "./thread.ts";

/* ------------------------------------------------------------------ *
 * Fixtures — deliberately tiny and hand-checkable
 * ------------------------------------------------------------------ */

/** An authored timestamp; the reducer only ever writes `NOW_STAMP` itself. */
const THEN = "Jul 22, 8:12 PM";

function msg(who: MessageAuthor, text: string): TicketMessage {
  return { who, text, time: THEN };
}

function ticket(over: Partial<Ticket> = {}): Ticket {
  return {
    id: "HH-1000",
    product: "doorbell",
    subject: "Doorbell drops off Wi-Fi",
    status: "open",
    updated: "2h ago",
    rank: 1,
    msgs: [msg("customer", "It keeps going offline at night.")],
    ...over,
  };
}

/** `order` is the argument order; `maxRank` is derived, as the store's is. */
function stateOf(tickets: Ticket[], over: Partial<ThreadState> = {}): ThreadState {
  return {
    tickets: Object.fromEntries(tickets.map((t) => [t.id, t])),
    order: tickets.map((t) => t.id),
    maxRank: tickets.reduce((max, t) => Math.max(max, t.rank), 0),
    nextNum: 5000,
    ...over,
  };
}

function form(over: Partial<NewTicketForm> = {}): NewTicketForm {
  return {
    product: "thermostat",
    topic: TOPICS[1],
    subject: "Schedule will not hold",
    desc: "The evening set point is forgotten every night.",
    attachments: [],
    ...over,
  };
}

const ALL_STATUSES: TicketStatus[] = ["open", "pending", "solved", "closed"];

/** A four-entry stand-in for AGENT_REPLIES, so rotation tests read by index. */
const POOL = ["p0", "p1", "p2", "p3"];

/* ------------------------------------------------------------------ *
 * Status vocabulary
 * ------------------------------------------------------------------ */

describe("status meta", () => {
  it("gives each of the four statuses its own label", () => {
    const labels = ALL_STATUSES.map((s) => statusMeta(s).label);
    expect(labels).toEqual(["Open", "Pending", "Solved", "Closed"]);
    expect(new Set(labels).size).toBe(4);
  });

  it("falls back to the open meta for anything it does not know", () => {
    /*
     * The whole pill, not just the label — it reads `fg`/`soft`/`icon` too.
     * Compared by value rather than by identity: the label is now looked up
     * per call so that it follows the reader's locale, so `statusMeta` builds
     * a fresh object each time instead of handing back a frozen table row.
     */
    expect(statusMeta("archived")).toStrictEqual(statusMeta("open"));
    expect(statusMeta("")).toStrictEqual(statusMeta("open"));
  });

  it("is case-sensitive: a capitalised status is an unknown status", () => {
    /* Worth pinning because the fallback hides it — "Solved" renders as Open,
     * green never appears, and nothing throws to say why. */
    expect(statusMeta("Solved")).toStrictEqual(statusMeta("open"));
    expect(statusMeta("SOLVED").label).toBe("Open");
  });
});

describe("canSolve", () => {
  it("offers the button only while the ticket is still live", () => {
    expect(canSolve(ticket({ status: "open" }))).toBe(true);
    expect(canSolve(ticket({ status: "pending" }))).toBe(true);
    expect(canSolve(ticket({ status: "solved" }))).toBe(false);
    expect(canSolve(ticket({ status: "closed" }))).toBe(false);
  });
});

/* ------------------------------------------------------------------ *
 * Deterministic replies — rule 3
 * ------------------------------------------------------------------ */

describe("topic offset", () => {
  it("maps a known topic to its index in the list", () => {
    expect(topicOffset(TOPICS[0])).toBe(0);
    expect(topicOffset(TOPICS[2])).toBe(2);
    expect(topicOffset(TOPICS[TOPICS.length - 1])).toBe(TOPICS.length - 1);
  });

  it("treats an unknown, empty or absent topic as the first one", () => {
    /* Not a bug, but non-obvious: offset 0 is both "the first topic" and "no
     * topic at all", so a chat-escalated ticket rotates like a Setup ticket. */
    expect(topicOffset("Something we never shipped")).toBe(0);
    expect(topicOffset("")).toBe(0);
    expect(topicOffset(undefined)).toBe(0);
    expect(topicOffset(TOPICS[0])).toBe(topicOffset(undefined));
  });
});

describe("agent reply choice", () => {
  it("walks the pool with the message count", () => {
    expect(pickAgentReply(undefined, 0, POOL)).toBe("p0");
    expect(pickAgentReply(undefined, 1, POOL)).toBe("p1");
    expect(pickAgentReply(undefined, 3, POOL)).toBe("p3");
  });

  it("wraps instead of running off the end", () => {
    expect(pickAgentReply(undefined, 4, POOL)).toBe("p0");
    expect(pickAgentReply(undefined, 11, POOL)).toBe("p3");
  });

  it("rotates the pool by the topic so two tickets do not read alike", () => {
    expect(pickAgentReply(TOPICS[2], 0, POOL)).toBe("p2");
    expect(pickAgentReply(TOPICS[2], 3, POOL)).toBe("p1"); // (3 + 2) % 4
    expect(pickAgentReply(TOPICS[0], 0, POOL)).not.toBe(
      pickAgentReply(TOPICS[2], 0, POOL),
    );
  });

  it("collides deliberately once the topic index passes the pool size", () => {
    /* There are more topics than canned replies, so the rotation wraps: topic
     * 4 reads exactly like topic 0. That is the documented cost of a fixed
     * pool, not a lookup bug — assert it so nobody "fixes" it into a hash. */
    expect(TOPICS.length).toBeGreaterThan(POOL.length);
    expect(pickAgentReply(TOPICS[4], 7, POOL)).toBe(
      pickAgentReply(TOPICS[0], 7, POOL),
    );
  });

  it("survives a one-entry pool at every count", () => {
    expect(pickAgentReply(TOPICS[3], 0, ["only"])).toBe("only");
    expect(pickAgentReply(TOPICS[3], 99, ["only"])).toBe("only");
  });

  it("defaults to the shipped pool when the caller passes none", () => {
    for (const count of [0, 1, 5, 40]) {
      expect(AGENT_REPLIES).toContain(pickAgentReply(TOPICS[1], count));
    }
  });
});

/* ------------------------------------------------------------------ *
 * The injectable delay
 * ------------------------------------------------------------------ */

describe("the delay seam", () => {
  afterEach(() => {
    setDelay(realDelay);
    vi.useRealTimers();
  });

  it("swaps the implementation globally", () => {
    setDelay(immediateDelay);
    expect(getDelay()).toBe(immediateDelay);
    setDelay(realDelay);
    expect(getDelay()).toBe(realDelay);
  });

  it("runs the callback synchronously under the test delay", () => {
    setDelay(immediateDelay);
    const seen: string[] = [];
    const cancel = delay(TYPING_DELAY_MS, () => seen.push("agent"));
    expect(seen).toEqual(["agent"]);
    /* Cancelling after the fact is a harmless no-op, not a throw — the store
     * calls `cancelAgentReply?.()` on the next reply whether it fired or not. */
    expect(() => cancel()).not.toThrow();
    expect(seen).toEqual(["agent"]);
  });

  it("fires the real delay at the deadline, not a tick before it", () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    realDelay(TYPING_DELAY_MS, fn);
    vi.advanceTimersByTime(TYPING_DELAY_MS - 1);
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("cancels a scheduled reply", () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const cancel = realDelay(TYPING_DELAY_MS, fn);
    cancel();
    vi.advanceTimersByTime(TYPING_DELAY_MS * 5);
    expect(fn).not.toHaveBeenCalled();
  });
});

/* ------------------------------------------------------------------ *
 * Seeded state
 * ------------------------------------------------------------------ */

describe("initial state", () => {
  it("indexes every seeded ticket and shows every one of them", () => {
    const s = initialThreadState();
    /* Both directions matter. An id in `order` with no ticket renders nothing;
     * a ticket missing from `order` is invisible however valid it is. */
    for (const id of s.order) expect(s.tickets[id]).toBeDefined();
    for (const id of Object.keys(s.tickets)) expect(s.order).toContain(id);
  });

  it("starts maxRank at the highest seeded rank", () => {
    const s = initialThreadState();
    const ranks = Object.values(s.tickets).map((t) => t.rank);
    expect(s.maxRank).toBe(Math.max(...ranks));
  });

  it("takes its first ticket number from the data set's own constant", () => {
    /* `initialThreadState` hard-codes 3118 while the data set exports
     * FIRST_TICKET_NUM for exactly this. They agree today; if a seeded ticket
     * is ever renumbered past it, `create` overwrites a real ticket. */
    expect(initialThreadState().nextNum).toBe(FIRST_TICKET_NUM);
  });

  it("never mints an id that a seeded ticket already owns", () => {
    let s = initialThreadState();
    const before = Object.keys(s.tickets).length;
    const minted: string[] = [];
    for (let i = 0; i < 5; i += 1) {
      const res = threadReducer(s, { type: "create", form: form() });
      minted.push(res.ticketId!);
      s = res.state;
    }
    expect(new Set(minted).size).toBe(5);
    expect(Object.keys(s.tickets)).toHaveLength(before + 5);
    expect(new Set(s.order).size).toBe(s.order.length);
  });

  it("hands out a fresh copy of the seed each time", () => {
    /* The store seeds once, but a second call must not share message arrays
     * with the first — a reply would show up in both. */
    const a = initialThreadState();
    const b = initialThreadState();
    const id = a.order[0];
    expect(a.tickets[id]).not.toBe(b.tickets[id]);
    expect(a.tickets[id].msgs).not.toBe(b.tickets[id].msgs);
  });
});

/* ------------------------------------------------------------------ *
 * List ordering — rule 2
 * ------------------------------------------------------------------ */

describe("ticket list", () => {
  it("sorts by rank descending, whatever order the ids are stored in", () => {
    const s = stateOf([
      ticket({ id: "a", rank: 1 }),
      ticket({ id: "b", rank: 9 }),
      ticket({ id: "c", rank: 4 }),
    ]);
    expect(ticketList(s).map((t) => t.id)).toEqual(["b", "c", "a"]);
  });

  it("does not re-order the state it read", () => {
    const s = stateOf([ticket({ id: "a", rank: 1 }), ticket({ id: "b", rank: 9 })]);
    const order = s.order;
    ticketList(s);
    expect(s.order).toBe(order);
    expect(s.order).toEqual(["a", "b"]);
  });

  it("skips an id in `order` with no ticket behind it", () => {
    const s = stateOf([ticket({ id: "a", rank: 1 })]);
    s.order = ["ghost", "a"];
    expect(ticketList(s).map((t) => t.id)).toEqual(["a"]);
  });

  it("hides a ticket that is not in `order` at all", () => {
    /* `order` is the display list, not a cache: `create` must unshift onto it
     * or the ticket exists and is unreachable. */
    const s = stateOf([ticket({ id: "a", rank: 1 })]);
    s.tickets.orphan = ticket({ id: "orphan", rank: 99 });
    expect(ticketList(s).map((t) => t.id)).toEqual(["a"]);
  });

  it("returns nothing for an empty desk", () => {
    expect(ticketList(stateOf([]))).toEqual([]);
  });
});

/* ------------------------------------------------------------------ *
 * Creating a ticket
 * ------------------------------------------------------------------ */

describe("create", () => {
  it("mints the next id, ranks it top and puts it at the front", () => {
    const s = stateOf([ticket({ id: "old", rank: 7 })]);
    const res = threadReducer(s, { type: "create", form: form() });
    const t = res.state.tickets[res.ticketId!];

    expect(res.ticketId).toBe(ticketCode(5000));
    expect(res.state.nextNum).toBe(5001);
    expect(t.rank).toBe(8);
    expect(res.state.maxRank).toBe(8);
    expect(res.state.order[0]).toBe(res.ticketId);
    expect(ticketList(res.state)[0].id).toBe(res.ticketId);
  });

  it("opens with exactly one customer message, stamped now", () => {
    const res = threadReducer(stateOf([]), { type: "create", form: form() });
    const t = res.state.tickets[res.ticketId!];
    expect(t.status).toBe("open");
    expect(t.updated).toBe(NOW_STAMP);
    expect(t.msgs).toHaveLength(1);
    expect(t.msgs[0]).toEqual({
      who: "customer",
      text: form().desc,
      time: NOW_STAMP,
    });
  });

  it("trims the subject and the description but leaves the middle alone", () => {
    const res = threadReducer(stateOf([]), {
      type: "create",
      form: form({ subject: "  Spaced out  ", desc: "\n line one\nline two \t" }),
    });
    const t = res.state.tickets[res.ticketId!];
    expect(t.subject).toBe("Spaced out");
    expect(t.msgs[0].text).toBe("line one\nline two");
  });

  it("falls back to the doorbell when no product was chosen", () => {
    /* The form validator blocks this in the UI; the reducer still has to pick
     * something because `Ticket.product` drives the icon and the tint. */
    const res = threadReducer(stateOf([]), {
      type: "create",
      form: form({ product: null }),
    });
    expect(res.state.tickets[res.ticketId!].product).toBe("doorbell");
  });

  it("carries the topic through, because the agent reply depends on it", () => {
    const res = threadReducer(stateOf([]), {
      type: "create",
      form: form({ topic: TOPICS[3] }),
    });
    expect(res.state.tickets[res.ticketId!].topic).toBe(TOPICS[3]);
  });

  it("drops the attachments the form collected", () => {
    /* A ticket has no attachment field — the composer says as much. Pinned so
     * a future attachment feature has to change this test on purpose. */
    const res = threadReducer(stateOf([]), {
      type: "create",
      form: form({ attachments: ["router_lights.jpg"] }),
    });
    expect(Object.keys(res.state.tickets[res.ticketId!])).not.toContain(
      "attachments",
    );
  });

  it("reports a plain creation — nothing typing, nothing reopened", () => {
    const res = threadReducer(stateOf([]), { type: "create", form: form() });
    expect(res).toMatchObject({ noop: false, typing: false, reopened: false });
  });

  it("leaves the previous state untouched", () => {
    const s = stateOf([ticket({ id: "old", rank: 7 })]);
    const snapshot = structuredClone(s);
    const res = threadReducer(s, { type: "create", form: form() });
    expect(s).toEqual(snapshot);
    expect(res.state).not.toBe(s);
    expect(res.state.tickets).not.toBe(s.tickets);
    expect(res.state.order).not.toBe(s.order);
  });

  it("keeps handing out consecutive ids", () => {
    let s = stateOf([]);
    const first = threadReducer(s, { type: "create", form: form() });
    s = first.state;
    const second = threadReducer(s, { type: "create", form: form() });
    expect(second.ticketId).toBe(ticketCode(5001));
    expect(second.state.tickets[second.ticketId!].rank).toBeGreaterThan(
      first.state.tickets[first.ticketId!].rank,
    );
  });
});

/* ------------------------------------------------------------------ *
 * Escalating a chat
 * ------------------------------------------------------------------ */

describe("create from chat", () => {
  const transcript = () => [
    msg("customer", "My doorbell is offline again"),
    msg("agent", "Let me look that up for you."),
    msg("customer", "Thanks"),
  ];

  it("keeps the transcript in order and puts the closer last", () => {
    const res = threadReducer(stateOf([]), {
      type: "createFromChat",
      product: "doorbell",
      transcript: transcript(),
      closer: "An agent will pick this up shortly.",
    });
    const t = res.state.tickets[res.ticketId!];
    expect(t.msgs.map((m) => m.text)).toEqual([
      "My doorbell is offline again",
      "Let me look that up for you.",
      "Thanks",
      "An agent will pick this up shortly.",
    ]);
    expect(t.msgs.at(-1)).toEqual({
      who: "agent",
      text: "An agent will pick this up shortly.",
      time: NOW_STAMP,
    });
  });

  it("opens as pending, not open", () => {
    /* An escalated chat already has an agent in it, so it lands in the queue
     * rather than at the start of the funnel — and the header timeline shows
     * "First reply" as done from the first render. */
    const res = threadReducer(stateOf([]), {
      type: "createFromChat",
      product: "plug",
      transcript: transcript(),
      closer: "Closing note",
    });
    const t = res.state.tickets[res.ticketId!];
    expect(t.status).toBe("pending");
    expect(threadTimeline(t).map((n) => n.state)).toEqual([
      "done",
      "done",
      "current",
    ]);
  });

  it("titles the ticket from the first customer line, not the first line", () => {
    const res = threadReducer(stateOf([]), {
      type: "createFromChat",
      product: "sensor",
      transcript: [
        msg("agent", "Hi! How can I help?"),
        msg("customer", "Sensor keeps false-alarming"),
      ],
      closer: "Closing note",
    });
    expect(res.state.tickets[res.ticketId!].subject).toBe(
      "Sensor keeps false-alarming",
    );
  });

  it("falls back to a generic subject when the customer never spoke", () => {
    const res = threadReducer(stateOf([]), {
      type: "createFromChat",
      product: "plug",
      transcript: [msg("agent", "Hi! How can I help?")],
      closer: "Closing note",
    });
    expect(res.state.tickets[res.ticketId!].subject).toBe("Live chat");
  });

  it("copes with an empty transcript — the closer alone", () => {
    const res = threadReducer(stateOf([]), {
      type: "createFromChat",
      product: "plug",
      transcript: [],
      closer: "Closing note",
    });
    const t = res.state.tickets[res.ticketId!];
    expect(t.subject).toBe("Live chat");
    expect(t.msgs).toHaveLength(1);
    expect(t.msgs[0].who).toBe("agent");
  });

  it("truncates a long opening line into a subject", () => {
    const long = "x".repeat(63);
    const res = threadReducer(stateOf([]), {
      type: "createFromChat",
      product: "plug",
      transcript: [msg("customer", long)],
      closer: "Closing note",
    });
    const subject = res.state.tickets[res.ticketId!].subject;
    expect(subject).toBe(`${"x".repeat(60)}…`);
    expect(subject.length).toBeLessThan(long.length);
  });

  it("copies the transcript instead of holding on to the chat's array", () => {
    const msgs = transcript();
    const res = threadReducer(stateOf([]), {
      type: "createFromChat",
      product: "doorbell",
      transcript: msgs,
      closer: "Closing note",
    });
    const t = res.state.tickets[res.ticketId!];
    msgs.push(msg("customer", "…and one more thing"));
    /* The chat panel keeps typing after escalation; the ticket must not grow. */
    expect(t.msgs).toHaveLength(4);
    expect(t.msgs).not.toBe(msgs);
  });

  it("shares the id counter with the new-ticket form", () => {
    const first = threadReducer(stateOf([]), { type: "create", form: form() });
    const second = threadReducer(first.state, {
      type: "createFromChat",
      product: "plug",
      transcript: transcript(),
      closer: "Closing note",
    });
    expect(first.ticketId).toBe(ticketCode(5000));
    expect(second.ticketId).toBe(ticketCode(5001));
    expect(second.state.order.slice(0, 2)).toEqual([
      second.ticketId,
      first.ticketId,
    ]);
  });

  it("leaves the topic unset, so its replies rotate from offset zero", () => {
    const res = threadReducer(stateOf([]), {
      type: "createFromChat",
      product: "plug",
      transcript: transcript(),
      closer: "Closing note",
    });
    expect(res.state.tickets[res.ticketId!].topic).toBeUndefined();
  });
});

/* ------------------------------------------------------------------ *
 * Customer replies — rule 1
 * ------------------------------------------------------------------ */

describe("reply", () => {
  it("appends the message, reopens and asks for the typing indicator", () => {
    const s = stateOf([ticket({ id: "a", rank: 3, status: "pending" })]);
    const res = threadReducer(s, { type: "reply", id: "a", text: "Any news?" });
    const t = res.state.tickets.a;

    expect(t.status).toBe("open");
    expect(t.updated).toBe(NOW_STAMP);
    expect(t.msgs.at(-1)).toEqual({
      who: "customer",
      text: "Any news?",
      time: NOW_STAMP,
    });
    expect(res).toMatchObject({ ticketId: "a", typing: true, noop: false });
  });

  it.each(["solved", "closed"] as const)(
    "reports a reopen when the ticket was %s",
    (status) => {
      const s = stateOf([ticket({ id: "a", status })]);
      const res = threadReducer(s, { type: "reply", id: "a", text: "Hello?" });
      expect(res.reopened).toBe(true);
      expect(res.state.tickets.a.status).toBe("open");
    },
  );

  it.each(["open", "pending"] as const)(
    "does not report a reopen when the ticket was %s",
    (status) => {
      const s = stateOf([ticket({ id: "a", status })]);
      const res = threadReducer(s, { type: "reply", id: "a", text: "Hello?" });
      expect(res.reopened).toBe(false);
      expect(res.state.tickets.a.status).toBe("open");
    },
  );

  it("trims the text", () => {
    const s = stateOf([ticket({ id: "a" })]);
    const res = threadReducer(s, { type: "reply", id: "a", text: "  hi  " });
    expect(res.state.tickets.a.msgs.at(-1)!.text).toBe("hi");
  });

  it("is a no-op for an empty or blank reply, and hands back the same state", () => {
    const s = stateOf([ticket({ id: "a" })]);
    for (const text of ["", "   ", "\n\t "]) {
      const res = threadReducer(s, { type: "reply", id: "a", text });
      expect(res).toMatchObject({ noop: true, ticketId: null, typing: false });
      /* Same reference, so the store's `if (res.noop) return` keeps React from
       * re-rendering the thread on a stray Enter. */
      expect(res.state).toBe(s);
    }
  });

  it("is a no-op for a ticket that is not there", () => {
    const s = stateOf([ticket({ id: "a" })]);
    const res = threadReducer(s, { type: "reply", id: "nope", text: "hi" });
    expect(res).toMatchObject({ noop: true, ticketId: null, typing: false });
    expect(res.state).toBe(s);
  });

  it("lifts the ticket to the top of the list without touching `order`", () => {
    const s = stateOf([
      ticket({ id: "a", rank: 1 }),
      ticket({ id: "b", rank: 9 }),
    ]);
    const res = threadReducer(s, { type: "reply", id: "a", text: "ping" });
    expect(res.state.tickets.a.rank).toBe(10);
    expect(res.state.maxRank).toBe(10);
    expect(ticketList(res.state).map((t) => t.id)).toEqual(["a", "b"]);
    /* `order` is insertion order and is deliberately never re-sorted. */
    expect(res.state.order).toEqual(["a", "b"]);
  });

  it("gives every reply a rank of its own", () => {
    let s = stateOf([ticket({ id: "a", rank: 1 }), ticket({ id: "b", rank: 2 })]);
    s = threadReducer(s, { type: "reply", id: "a", text: "one" }).state;
    s = threadReducer(s, { type: "reply", id: "b", text: "two" }).state;
    expect(s.tickets.a.rank).toBe(3);
    expect(s.tickets.b.rank).toBe(4);
    expect(ticketList(s).map((t) => t.id)).toEqual(["b", "a"]);
  });

  it("never writes into the ticket the screen is still holding", () => {
    const s = stateOf([ticket({ id: "a" })]);
    const before = s.tickets.a;
    const snapshot = structuredClone(s);
    const res = threadReducer(s, { type: "reply", id: "a", text: "hi" });
    expect(s).toEqual(snapshot);
    expect(res.state.tickets.a).not.toBe(before);
    expect(res.state.tickets.a.msgs).not.toBe(before.msgs);
    expect(before.msgs).toHaveLength(1);
  });
});

/* ------------------------------------------------------------------ *
 * The simulated agent reply
 * ------------------------------------------------------------------ */

describe("agent reply", () => {
  it("appends an agent message and parks the ticket in pending", () => {
    const s = stateOf([ticket({ id: "a", status: "open" })]);
    const res = threadReducer(s, { type: "agentReply", id: "a", pool: POOL });
    const t = res.state.tickets.a;
    expect(t.status).toBe("pending");
    expect(t.updated).toBe(NOW_STAMP);
    expect(t.msgs.at(-1)).toMatchObject({ who: "agent", time: NOW_STAMP });
    expect(res).toMatchObject({ ticketId: "a", noop: false, typing: false });
  });

  it("counts the customer message that has already landed", () => {
    /* The store appends the reply first and schedules this second, so the
     * count includes it: two messages plus topic offset 0 picks pool[2]. */
    const s = stateOf([
      ticket({ id: "a", msgs: [msg("customer", "one"), msg("customer", "two")] }),
    ]);
    const res = threadReducer(s, { type: "agentReply", id: "a", pool: POOL });
    expect(res.state.tickets.a.msgs.at(-1)!.text).toBe("p2");
  });

  it("says something different on the next round trip", () => {
    /* Two customer replies in a row must not get the same canned answer — the
     * count moves by two per round trip, which is coprime with nothing but
     * still lands on a different quarter of the pool. */
    let s = stateOf([ticket({ id: "a", msgs: [msg("customer", "one")] })]);
    s = threadReducer(s, { type: "reply", id: "a", text: "two" }).state;
    s = threadReducer(s, { type: "agentReply", id: "a", pool: POOL }).state;
    const first = s.tickets.a.msgs.at(-1)!.text;
    s = threadReducer(s, { type: "reply", id: "a", text: "three" }).state;
    s = threadReducer(s, { type: "agentReply", id: "a", pool: POOL }).state;
    expect(s.tickets.a.msgs.at(-1)!.text).not.toBe(first);
  });

  it("uses the ticket's own topic", () => {
    const s = stateOf([
      ticket({ id: "a", topic: TOPICS[2], msgs: [msg("customer", "one")] }),
    ]);
    const res = threadReducer(s, { type: "agentReply", id: "a", pool: POOL });
    expect(res.state.tickets.a.msgs.at(-1)!.text).toBe("p3"); // (1 + 2) % 4
  });

  it("draws from the shipped pool when the action names none", () => {
    const s = stateOf([ticket({ id: "a" })]);
    const res = threadReducer(s, { type: "agentReply", id: "a" });
    expect(AGENT_REPLIES).toContain(res.state.tickets.a.msgs.at(-1)!.text);
  });

  it("does not move the ticket in the list", () => {
    /* The customer reply that triggered it already took the top rank; bumping
     * again here would be harmless but would break the 1-rank-per-reply count
     * the rest of the reducer relies on. */
    const s = stateOf([ticket({ id: "a", rank: 4 }), ticket({ id: "b", rank: 9 })]);
    const res = threadReducer(s, { type: "agentReply", id: "a", pool: POOL });
    expect(res.state.tickets.a.rank).toBe(4);
    expect(res.state.maxRank).toBe(9);
  });

  it("is a no-op for a ticket that is not there", () => {
    const s = stateOf([ticket({ id: "a" })]);
    const res = threadReducer(s, { type: "agentReply", id: "gone", pool: POOL });
    expect(res).toMatchObject({ noop: true, ticketId: null });
    expect(res.state).toBe(s);
  });

  it("would pull a solved ticket back to pending — the guard is in the store", () => {
    /*
     * The reducer has no status guard here. Nothing in the UI can reach it:
     * `markSolved` cancels the pending timeout before it solves, so a reply
     * that is still "typing" never lands on a solved ticket. Asserted rather
     * than assumed, because dropping that cancel — or replaying an action log —
     * silently un-solves a ticket the customer just closed out.
     */
    const s = stateOf([ticket({ id: "a", status: "solved" })]);
    const res = threadReducer(s, { type: "agentReply", id: "a", pool: POOL });
    expect(res.state.tickets.a.status).toBe("pending");
  });

  it("leaves the previous state untouched", () => {
    const s = stateOf([ticket({ id: "a" })]);
    const snapshot = structuredClone(s);
    threadReducer(s, { type: "agentReply", id: "a", pool: POOL });
    expect(s).toEqual(snapshot);
  });
});

/* ------------------------------------------------------------------ *
 * Solving
 * ------------------------------------------------------------------ */

describe("mark as solved", () => {
  it("solves an open ticket without touching the conversation", () => {
    const s = stateOf([ticket({ id: "a", status: "open" })]);
    const before = s.tickets.a.msgs;
    const res = threadReducer(s, { type: "markSolved", id: "a" });
    expect(res.state.tickets.a.status).toBe("solved");
    expect(res.state.tickets.a.updated).toBe(NOW_STAMP);
    expect(res.state.tickets.a.msgs).toBe(before);
    expect(res).toMatchObject({ ticketId: "a", noop: false, typing: false });
  });

  it("solves a pending ticket too", () => {
    const s = stateOf([ticket({ id: "a", status: "pending" })]);
    expect(threadReducer(s, { type: "markSolved", id: "a" }).state.tickets.a.status)
      .toBe("solved");
  });

  it("is idempotent — solving a solved ticket changes nothing but the stamp", () => {
    const s = stateOf([ticket({ id: "a", status: "solved", updated: "3d ago" })]);
    const res = threadReducer(s, { type: "markSolved", id: "a" });
    expect(res.state.tickets.a.status).toBe("solved");
    expect(res.state.tickets.a.updated).toBe(NOW_STAMP);
    /* Still not a no-op: the store toasts "Marked as solved" a second time.
     * The Solve button is hidden by `canSolve`, so only a keyboard repeat or a
     * replayed action gets here. */
    expect(res.noop).toBe(false);
  });

  it("will move a closed ticket to solved — the guard is `canSolve`, not this", () => {
    /*
     * closed → solved is not a transition the desk means to offer: closed is
     * the archive, solved is a live state. The reducer allows it and the Thread
     * screen prevents it by hiding the button. Pinned so that a screen which
     * ever renders the button unconditionally is a test failure, not a
     * silently resurrected ticket.
     */
    const s = stateOf([ticket({ id: "a", status: "closed" })]);
    const res = threadReducer(s, { type: "markSolved", id: "a" });
    expect(res.state.tickets.a.status).toBe("solved");
    expect(canSolve(s.tickets.a)).toBe(false);
  });

  it("is a no-op for a ticket that is not there", () => {
    const s = stateOf([ticket({ id: "a" })]);
    const res = threadReducer(s, { type: "markSolved", id: "gone" });
    expect(res).toMatchObject({ noop: true, ticketId: null });
    expect(res.state).toBe(s);
  });

  it("keeps the row's stamp and the list order in step", () => {
    /*
     * FAILING — reported as a bug, not a wrong expectation.
     *
     * `markSolved` refreshes `updated` to "Just now" but leaves `rank` alone,
     * and `ticketList` sorts on rank. Solve the older of two tickets and My
     * tickets renders "Updated 2h ago" above "Updated Just now", in a list its
     * own screen comment calls "sorted newest-activity-first".
     *
     * Repro in the shipped app: My tickets → open HH-3114 ("1d ago", rank 3) →
     * Mark as solved → All tickets. HH-3117 ("2h ago", rank 4) still sits above
     * it. Either bump the rank the way `reply` does, or stop rewriting
     * `updated` — the two lines currently disagree about whether solving is
     * activity.
     */
    const s = stateOf([
      ticket({ id: "fresh", rank: 2, updated: "2h ago" }),
      ticket({ id: "stale", rank: 1, updated: "3d ago", status: "pending" }),
    ]);
    const res = threadReducer(s, { type: "markSolved", id: "stale" });
    expect(res.state.tickets.stale.updated).toBe(NOW_STAMP);
    expect(ticketList(res.state)[0].updated).toBe(NOW_STAMP);
  });

  it("leaves the previous state untouched", () => {
    const s = stateOf([ticket({ id: "a" })]);
    const snapshot = structuredClone(s);
    threadReducer(s, { type: "markSolved", id: "a" });
    expect(s).toEqual(snapshot);
  });
});

/* ------------------------------------------------------------------ *
 * The whole conversation
 * ------------------------------------------------------------------ */

describe("the lifecycle", () => {
  afterEach(() => setDelay(realDelay));

  it("runs create → reply → agent → solve → reopen in one synchronous pass", () => {
    setDelay(immediateDelay);
    let s = stateOf([]);

    const created = threadReducer(s, {
      type: "create",
      form: form({ topic: TOPICS[0] }),
    });
    const id = created.ticketId!;
    s = created.state;
    expect(s.tickets[id].status).toBe("open");

    /* The store's `sendReply`: reduce, then schedule the agent through the
     * seam. Under `immediateDelay` the callback runs before `delay` returns. */
    const replied = threadReducer(s, { type: "reply", id, text: "Still broken" });
    expect(replied.typing).toBe(true);
    s = replied.state;
    delay(TYPING_DELAY_MS, () => {
      s = threadReducer(s, { type: "agentReply", id, pool: POOL }).state;
    });

    expect(s.tickets[id].msgs.map((m) => m.who)).toEqual([
      "customer",
      "customer",
      "agent",
    ]);
    expect(s.tickets[id].status).toBe("pending");

    s = threadReducer(s, { type: "markSolved", id }).state;
    expect(s.tickets[id].status).toBe("solved");
    expect(canSolve(s.tickets[id])).toBe(false);

    const reopened = threadReducer(s, { type: "reply", id, text: "It is back" });
    expect(reopened.reopened).toBe(true);
    s = reopened.state;
    expect(s.tickets[id].status).toBe("open");
    expect(s.tickets[id].msgs).toHaveLength(4);
    expect(canSolve(s.tickets[id])).toBe(true);
  });

  it("keeps the newest conversation at the top across the whole flow", () => {
    let s = stateOf([ticket({ id: "old", rank: 4 })]);
    const created = threadReducer(s, { type: "create", form: form() });
    const id = created.ticketId!;
    s = created.state;
    expect(ticketList(s).map((t) => t.id)).toEqual([id, "old"]);

    s = threadReducer(s, { type: "reply", id: "old", text: "bump" }).state;
    expect(ticketList(s).map((t) => t.id)).toEqual(["old", id]);
  });
});

/* ------------------------------------------------------------------ *
 * The header timeline
 * ------------------------------------------------------------------ */

describe("thread timeline", () => {
  const states = (t: Ticket) => threadTimeline(t).map((n) => n.state);

  it("always draws three nodes, with no connector before the first", () => {
    const nodes = threadTimeline(ticket());
    expect(nodes).toHaveLength(3);
    expect(nodes.map((n) => n.showLine)).toEqual([false, true, true]);
    expect(nodes[0].lineActive).toBe(false);
  });

  it("sits on 'First reply' while the customer is waiting", () => {
    const t = ticket({ status: "open", msgs: [msg("customer", "hi")] });
    expect(states(t)).toEqual(["done", "current", "todo"]);
    expect(threadTimeline(t).map((n) => n.lineActive)).toEqual([
      false,
      true,
      false,
    ]);
  });

  it("moves to 'Solved' once an agent has spoken", () => {
    const t = ticket({
      status: "pending",
      msgs: [msg("customer", "hi"), msg("agent", "on it")],
    });
    expect(states(t)).toEqual(["done", "done", "current"]);
    expect(threadTimeline(t).map((n) => n.lineActive)).toEqual([
      false,
      true,
      true,
    ]);
  });

  it("completes every node once the ticket is resolved", () => {
    const solved = ticket({
      status: "solved",
      msgs: [msg("customer", "hi"), msg("agent", "fixed")],
    });
    expect(states(solved)).toEqual(["done", "done", "done"]);
    expect(threadTimeline(solved)[2].label).toBe("Solved");
  });

  it("renames the last node for a closed ticket", () => {
    const closed = ticket({
      status: "closed",
      msgs: [msg("customer", "hi"), msg("agent", "fixed")],
    });
    expect(threadTimeline(closed)[2].label).toBe("Closed");
    expect(states(closed)).toEqual(["done", "done", "done"]);
    /* "Opened" and "First reply" keep their labels whatever the status. */
    expect(threadTimeline(closed).map((n) => n.label).slice(0, 2)).toEqual([
      "Opened",
      "First reply",
    ]);
  });

  it("leaves 'First reply' undone when a ticket is solved without one", () => {
    /*
     * Counter-intuitive but right: a customer can solve their own ticket
     * before anyone answers, so node 2 is done while node 1 is still todo and
     * the connector into it stays inactive. The obvious "fix" — marking every
     * earlier node done once the last one is — would claim an agent replied
     * when nobody did.
     */
    const t = ticket({ status: "solved", msgs: [msg("customer", "never mind")] });
    expect(states(t)).toEqual(["done", "todo", "done"]);
    expect(threadTimeline(t)[2].lineActive).toBe(false);
  });

  it("never shows two current nodes", () => {
    for (const status of ALL_STATUSES) {
      for (const msgs of [
        [msg("customer", "hi")],
        [msg("customer", "hi"), msg("agent", "hello")],
      ]) {
        const current = states(ticket({ status, msgs })).filter(
          (s) => s === "current",
        );
        expect(current.length).toBeLessThanOrEqual(1);
      }
    }
  });
});
