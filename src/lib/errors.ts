/*
 * The error-state model (ruling R4).
 *
 * The comp exposed `errorState` as an authoring boolean so a designer could
 * force every screen into its failure state. Here the real behaviour is
 * first-class — `state.failed` holds the view id that failed and Retry clears
 * it — and the forced demo mode is reached with the URL query `?demo=error`,
 * so it stays testable without adding UI chrome.
 *
 * Precedence, decided once in `viewGate()`: loading beats error beats the
 * screen. Ruling R6: screens do not replicate the comp's `is*` suppression
 * sweep; App renders one of the three and nothing else.
 */

import type { ViewId } from "../data/types";

/* -------------------------------------------------------------- copy */

/** Object phrases spliced into the error headline. Default: "this screen". */
export const ERR_LABELS: Partial<Record<ViewId, string>> = {
  live: "the live view",
  auto: "your automations",
  billing: "your invoices",
  orders: "your order",
  devices: "your devices",
  energy: "your energy data",
  notifs: "your notifications",
  mytickets: "your tickets",
  thread: "this conversation",
  status: "the status page",
};

/**
 * The body copy. The comp left a literal `—` escape unrendered here;
 * ruling R7 says emit the real em dash.
 */
export const ERR_TEXT =
  "The request timed out on our side, so nothing you were doing has been lost. Trying again usually works — if it doesn't, the status page will say whether it's us.";

/** Hard-coded in the comp, kept hard-coded here (ruling R2: no `Date.now()`). */
export const ERR_TIME = "27 Jul, 14:31";

export function errorTitle(view: ViewId): string {
  return `We couldn't load ${ERR_LABELS[view] ?? "this screen"}`;
}

export function errorCode(view: ViewId): string {
  return `ERR_TIMEOUT · ${view.toUpperCase()}_FETCH`;
}

/** The two dashed reassurance cards under the buttons. */
export interface ErrorCard {
  title: string;
  icon: string;
  text: string;
  /** Only the second card carries a link button. */
  action?: { label: string; icon: string };
}

export const ERR_CARDS: ErrorCard[] = [
  {
    title: "Your devices are fine",
    icon: "cpu",
    text: "Schedules, alerts and local recording run on the hardware. This is our website, not your home.",
  },
  {
    title: "Need an answer now?",
    icon: "message-circle",
    text: "Chat works independently of this page — open it and a person will pick up.",
    action: { label: "Open live chat", icon: "message-circle" },
  },
];

/* ------------------------------------------------------------ offline */

export const OFFLINE_TITLE = "You're offline";
export const OFFLINE_TEXT =
  "Pages you've already opened still work. Anything you send will wait until you're back.";
export const OFFLINE_BACK_TOAST = "Back online";
export const OFFLINE_STILL_TOAST = "Still no connection";

/** `navigator.onLine`, guarded — treated as online where unavailable. */
export function isOnline(): boolean {
  try {
    return navigator.onLine !== false;
  } catch {
    return true;
  }
}

/** Subscribe to the browser's online/offline events. Returns unsubscribe. */
export function watchConnection(onChange: (offline: boolean) => void): () => void {
  const handler = () => onChange(!isOnline());
  try {
    window.addEventListener("online", handler);
    window.addEventListener("offline", handler);
  } catch {
    return () => {};
  }
  return () => {
    window.removeEventListener("online", handler);
    window.removeEventListener("offline", handler);
  };
}

/* -------------------------------------------------------- demo switch */

/**
 * `?demo=error` forces the error screen on every view — the testable stand-in
 * for the comp's `errorState` authoring prop. Retry still runs the busy cycle
 * and lands back on the error, exactly as the comp's permanent-error mode did.
 */
export function forcedErrorMode(search?: string): boolean {
  const raw = search ?? (typeof window === "undefined" ? "" : window.location.search);
  try {
    return new URLSearchParams(raw).get("demo") === "error";
  } catch {
    return false;
  }
}

/* --------------------------------------------------------- the gate */

export type ViewGate = "loading" | "error" | "screen";

/**
 * The single precedence decision (spec C §7.3 ported as an early return).
 *
 * `<main>` renders the skeleton while busy, the error screen when this view
 * has failed (or the demo switch is on), and the real screen otherwise.
 */
export function viewGate(input: {
  view: ViewId;
  busy: boolean;
  failed: ViewId | null;
  forced?: boolean;
}): ViewGate {
  if (input.busy) return "loading";
  if (input.forced || input.failed === input.view) return "error";
  return "screen";
}

/* ------------------------------------------------------------ toasts */

export const RETRY_TOAST = "Retrying…";
export const REPORT_TOAST = "Tell us what you were doing";
export const SIMULATE_FAIL_TOAST = "Simulated a failed load";
