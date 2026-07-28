/*
 * The error / offline model (ruling R4, spec C §7.3).
 *
 * Three things are worth guarding here, and they are all seams rather than
 * arithmetic:
 *
 *   1. `viewGate` is the single precedence decision in the app: loading beats
 *      error beats screen, and a failure is scoped to *one* view id. Getting
 *      the order wrong shows a skeleton over an error, or an error over a
 *      screen the user can still use. The whole matrix is enumerated below.
 *   2. `isOnline` / `watchConnection` touch globals that do not exist in a
 *      test (or in SSR). Both must degrade to "online" rather than throw, so
 *      the guards are exercised with the globals stubbed away entirely.
 *   3. The copy constants carry typographic rulings (R7's real em dash) and a
 *      grammatical contract: every ERR_LABELS entry is spliced mid-sentence.
 */

import { afterEach, describe, expect, it, vi } from "vitest";
import type { ViewId } from "../data/types.ts";
import {
  ERR_CARDS,
  ERR_LABELS,
  ERR_TEXT,
  ERR_TIME,
  errorCode,
  errorTitle,
  forcedErrorMode,
  isOnline,
  viewGate,
  watchConnection,
} from "./errors.ts";

afterEach(() => {
  vi.unstubAllGlobals();
});

/* ------------------------------------------------------------------ *
 * Copy — rule 3
 * ------------------------------------------------------------------ */

describe("error copy", () => {
  it("splices the mapped phrase into the headline", () => {
    expect(errorTitle("billing")).toBe("We couldn't load your invoices");
    expect(errorTitle("thread")).toBe("We couldn't load this conversation");
  });

  it("falls back to 'this screen' for an unmapped view", () => {
    /* Most of the ~40 view ids have no bespoke phrase, and must not render
     * "We couldn't load undefined". */
    expect(errorTitle("home")).toBe("We couldn't load this screen");
    expect(errorTitle("imprint")).toBe("We couldn't load this screen");
  });

  it("keeps every label lower-case so the sentence still reads", () => {
    /* Each phrase lands mid-sentence after "We couldn't load ". A capitalised
     * entry would read "We couldn't load Your invoices". */
    for (const [view, label] of Object.entries(ERR_LABELS)) {
      expect(label, view).toBeTruthy();
      expect(label![0], view).toBe(label![0].toLowerCase());
      expect(errorTitle(view as ViewId)).toBe(`We couldn't load ${label}`);
    }
  });

  it("upper-cases the view id into the diagnostic code", () => {
    expect(errorCode("billing")).toBe("ERR_TIMEOUT · BILLING_FETCH");
    expect(errorCode("mytickets")).toBe("ERR_TIMEOUT · MYTICKETS_FETCH");
    /* A numeric view id has nothing to upper-case and passes through. */
    expect(errorCode("404")).toBe("ERR_TIMEOUT · 404_FETCH");
  });

  it("emits a real em dash in the body copy (ruling R7)", () => {
    /* The comp left the escape unrendered; a literal "&mdash;" (or a hyphen
     * standing in for the dash) would be invisible in review but not on
     * screen. Spelled as an escape so the assertion cannot be misread. */
    expect(ERR_TEXT).toContain("—");
    expect(ERR_TEXT).not.toContain("&mdash;");
    expect(ERR_TEXT).not.toContain(" - ");
  });

  it("keeps the timestamp a static 'DD Mon, HH:MM' (ruling R2: no Date.now())", () => {
    /* The shape is the contract, not the date — a copy edit may move it, a
     * live clock or an ISO stamp leaking in may not. */
    expect(ERR_TIME).toMatch(/^\d{1,2} [A-Z][a-z]{2}, \d{2}:\d{2}$/);
  });

  it("carries two reassurance cards, only the second of which acts", () => {
    expect(ERR_CARDS).toHaveLength(2);
    expect(ERR_CARDS[0].action).toBeUndefined();
    expect(ERR_CARDS[1].action?.label).toBeTruthy();
    for (const card of ERR_CARDS) {
      expect(card.title).toBeTruthy();
      expect(card.icon).toBeTruthy();
      expect(card.text).toBeTruthy();
    }
  });
});

/* ------------------------------------------------------------------ *
 * The gate — rule 1
 * ------------------------------------------------------------------ */

describe("viewGate", () => {
  it("shows the screen when nothing is wrong", () => {
    expect(viewGate({ view: "home", busy: false, failed: null })).toBe("screen");
  });

  it("shows the error only for the view that actually failed", () => {
    expect(viewGate({ view: "orders", busy: false, failed: "orders" })).toBe("error");
    /* Another view's failure must not poison this one — `failed` holds one id,
     * not a boolean. */
    expect(viewGate({ view: "orders", busy: false, failed: "billing" })).toBe("screen");
  });

  it("lets loading win over everything", () => {
    expect(viewGate({ view: "orders", busy: true, failed: "orders" })).toBe("loading");
    expect(viewGate({ view: "orders", busy: true, failed: null, forced: true })).toBe(
      "loading",
    );
  });

  it("lets the demo switch force the error on any view", () => {
    expect(viewGate({ view: "home", busy: false, failed: null, forced: true })).toBe(
      "error",
    );
    /* And explicitly off, it changes nothing. */
    expect(viewGate({ view: "home", busy: false, failed: null, forced: false })).toBe(
      "screen",
    );
  });

  it("resolves the whole matrix in one place", () => {
    const cases: Array<[boolean, ViewId | null, boolean, string]> = [
      [false, null, false, "screen"],
      [false, null, true, "error"],
      [false, "home", false, "error"],
      [false, "home", true, "error"],
      [true, null, false, "loading"],
      [true, null, true, "loading"],
      [true, "home", false, "loading"],
      [true, "home", true, "loading"],
    ];
    for (const [busy, failed, forced, want] of cases) {
      expect(viewGate({ view: "home", busy, failed, forced }), `${busy}/${failed}/${forced}`).toBe(
        want,
      );
    }
  });
});

/* ------------------------------------------------------------------ *
 * The demo switch
 * ------------------------------------------------------------------ */

describe("forcedErrorMode", () => {
  it("is on only for exactly demo=error", () => {
    expect(forcedErrorMode("?demo=error")).toBe(true);
    /* The leading "?" is optional — URLSearchParams strips it. */
    expect(forcedErrorMode("demo=error")).toBe(true);
    expect(forcedErrorMode("?x=1&demo=error&y=2")).toBe(true);
  });

  it("is off for anything else, including a near miss", () => {
    expect(forcedErrorMode("")).toBe(false);
    expect(forcedErrorMode("?demo=errors")).toBe(false);
    expect(forcedErrorMode("?demo=")).toBe(false);
    expect(forcedErrorMode("?demo")).toBe(false);
    expect(forcedErrorMode("?error")).toBe(false);
    expect(forcedErrorMode("?other=error")).toBe(false);
  });

  it("is case-sensitive on the value", () => {
    /* Deliberate: it is a URL literal, not user-facing copy. Worth pinning so
     * nobody "helpfully" lower-cases the comparison and widens the switch. */
    expect(forcedErrorMode("?demo=ERROR")).toBe(false);
    expect(forcedErrorMode("?DEMO=error")).toBe(false);
  });

  it("reads window.location.search when given nothing", () => {
    vi.stubGlobal("window", { location: { search: "?demo=error" } });
    expect(forcedErrorMode()).toBe(true);
    vi.stubGlobal("window", { location: { search: "?demo=off" } });
    expect(forcedErrorMode()).toBe(false);
  });

  it("returns false rather than throwing where there is no window", () => {
    /* The suite runs in the node environment, so `window` is genuinely absent
     * here — the same path SSR would take. */
    expect(typeof window).toBe("undefined");
    expect(forcedErrorMode()).toBe(false);
  });

  it("treats an empty explicit argument as 'no query', not as 'read window'", () => {
    /* `??` not `||`: an empty string is a real value and short-circuits the
     * window read, so a page at ?demo=error asking about "" gets false. */
    vi.stubGlobal("window", { location: { search: "?demo=error" } });
    expect(forcedErrorMode("")).toBe(false);
  });
});

/* ------------------------------------------------------------------ *
 * Connection state — rule 2
 * ------------------------------------------------------------------ */

describe("isOnline", () => {
  it("is true unless the browser says exactly false", () => {
    vi.stubGlobal("navigator", { onLine: true });
    expect(isOnline()).toBe(true);
    vi.stubGlobal("navigator", { onLine: false });
    expect(isOnline()).toBe(false);
  });

  it("assumes online where navigator.onLine is unimplemented", () => {
    /* `!== false` rather than `=== true`: node's navigator has no onLine, and
     * an undefined flag must not read as "offline" and hide the whole app
     * behind an offline banner. */
    vi.stubGlobal("navigator", {});
    expect(isOnline()).toBe(true);
  });

  it("assumes online when navigator itself is missing", () => {
    vi.stubGlobal("navigator", undefined);
    expect(isOnline()).toBe(true);
  });
});

describe("watchConnection", () => {
  /** A minimal window double that records its listeners. */
  function fakeWindow() {
    const listeners = new Map<string, Set<() => void>>();
    return {
      listeners,
      addEventListener(type: string, fn: () => void) {
        if (!listeners.has(type)) listeners.set(type, new Set());
        listeners.get(type)!.add(fn);
      },
      removeEventListener(type: string, fn: () => void) {
        listeners.get(type)?.delete(fn);
      },
      fire(type: string) {
        for (const fn of listeners.get(type) ?? []) fn();
      },
      count() {
        let n = 0;
        for (const set of listeners.values()) n += set.size;
        return n;
      },
    };
  }

  it("subscribes to both events and reports the inverse of isOnline", () => {
    const win = fakeWindow();
    vi.stubGlobal("window", win);
    vi.stubGlobal("navigator", { onLine: true });

    const seen: boolean[] = [];
    watchConnection((offline) => seen.push(offline));
    expect(win.count()).toBe(2);

    /* The handler re-reads the flag; the event name alone is not trusted. */
    vi.stubGlobal("navigator", { onLine: false });
    win.fire("offline");
    vi.stubGlobal("navigator", { onLine: true });
    win.fire("online");
    expect(seen).toEqual([true, false]);
  });

  it("does not fire on subscribe — only on a change", () => {
    vi.stubGlobal("window", fakeWindow());
    vi.stubGlobal("navigator", { onLine: false });
    const onChange = vi.fn();
    watchConnection(onChange);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("unsubscribes both listeners", () => {
    const win = fakeWindow();
    vi.stubGlobal("window", win);
    vi.stubGlobal("navigator", { onLine: true });

    const onChange = vi.fn();
    const stop = watchConnection(onChange);
    stop();
    expect(win.count()).toBe(0);
    win.fire("offline");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("removes exactly the handler it added, leaving others alone", () => {
    const win = fakeWindow();
    vi.stubGlobal("window", win);
    vi.stubGlobal("navigator", { onLine: true });

    const stopA = watchConnection(vi.fn());
    watchConnection(vi.fn());
    expect(win.count()).toBe(4);
    stopA();
    expect(win.count()).toBe(2);
  });

  it("returns a safe no-op where there is no window", () => {
    /* No stub: node has no `window`, so the guard fires. The returned function
     * must still be callable — callers use it as a useEffect cleanup. */
    const stop = watchConnection(vi.fn());
    expect(typeof stop).toBe("function");
    expect(() => stop()).not.toThrow();
  });
});
