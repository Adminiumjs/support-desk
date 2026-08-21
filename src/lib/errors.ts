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
import { clockTime, shortDate } from "./format";
import { t } from "../i18n/ambient";
import type { MessageKey } from "../i18n/messages";

/* -------------------------------------------------------------- copy */

/**
 * One WHOLE headline per view, not an object phrase spliced into a frame.
 *
 * English gets away with "We couldn't load " + "your invoices" because the
 * verb never agrees with its object; German, Czech and Arabic all decline the
 * object, and Arabic reverses the clause order outright. The frame is the
 * translator's to choose, so each view names a complete sentence.
 */
export const ERR_TITLE_KEYS: Partial<Record<ViewId, MessageKey>> = {
  live: "lib.errors.titleLive",
  auto: "lib.errors.titleAuto",
  billing: "lib.errors.titleBilling",
  orders: "lib.errors.titleOrders",
  devices: "lib.errors.titleDevices",
  energy: "lib.errors.titleEnergy",
  notifs: "lib.errors.titleNotifs",
  mytickets: "lib.errors.titleMytickets",
  thread: "lib.errors.titleThread",
  status: "lib.errors.titleStatus",
};

/**
 * The body copy. The comp left a literal `—` escape unrendered here;
 * ruling R7 says emit the real em dash.
 */
export function errText(): string {
  return t("lib.errors.text");
}

/**
 * Hard-coded in the comp, kept hard-coded here (ruling R2: no `Date.now()`) —
 * but only the instant is fixed. Rendering runs through `Intl` at call time so
 * the stamp follows the reader's locale, which a module-level const could not.
 */
export const ERR_INSTANT = new Date(2026, 6, 27, 14, 31);

export function errTime(): string {
  return `${shortDate(ERR_INSTANT)}, ${clockTime(ERR_INSTANT)}`;
}

export function errorTitle(view: ViewId): string {
  return t(ERR_TITLE_KEYS[view] ?? "lib.errors.titleDefault");
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

export function errCards(): ErrorCard[] {
  return [
    {
      title: t("lib.errors.card1Title"),
      icon: "cpu",
      text: t("lib.errors.card1Text"),
    },
    {
      title: t("lib.errors.card2Title"),
      icon: "message-circle",
      text: t("lib.errors.card2Text"),
      action: { label: t("lib.errors.card2Action"), icon: "message-circle" },
    },
  ];
}

/* ------------------------------------------------------------ offline */

export function offlineTitle(): string {
  return t("lib.errors.offlineTitle");
}

export function offlineText(): string {
  return t("lib.errors.offlineText");
}

export function offlineBackToast(): string {
  return t("lib.errors.offlineBackToast");
}

export function offlineStillToast(): string {
  return t("lib.errors.offlineStillToast");
}

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

export function retryToast(): string {
  return t("lib.errors.retryToast");
}

export function reportToast(): string {
  return t("lib.errors.reportToast");
}

export function simulateFailToast(): string {
  return t("lib.errors.simulateFailToast");
}
