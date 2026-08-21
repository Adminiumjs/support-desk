/*
 * The automations builder (delta spec A §2, ruling R2).
 *
 * Small module, three rules that are easy to break:
 *
 *   1. Deleting is a blacklist, never a splice. `automations` only ever grows,
 *      `auGone` hides rows, and Undo just drops the id again. Everything that
 *      counts or mints must therefore be clear about *which* list it is looking
 *      at — see "id minting", where feeding the visible count instead of the
 *      full length hands out an id that is already in the blacklist.
 *   2. A rule is running only if it is neither paused this session (`auOff`)
 *      nor seeded paused (`on: false`). Two independent switches, one AND.
 *   3. Labels are de-capitalised on the first character only, so they read
 *      inside the "when … then …" sentence without wrecking acronyms.
 *
 * Fixtures are hand-built: no assertions on the seeded four rules, whose names
 * and copy are a marketing edit away from changing.
 */

import { describe, expect, it } from "vitest";
import type { Automation, AutomationOption } from "../data/types.ts";
import {
  auActionToast,
  auCreatedToast,
  auNameToast,
  auTriggerToast,
  automationDeleteToast,
  automationIntro,
  automationLast,
  automationToggleToast,
  buildAutomation,
  decapitalise,
  isAutomationOn,
  nextAutomationId,
  runningCount,
  visibleAutomations,
} from "./automations.ts";

/* ------------------------------------------------------------------ *
 * Fixtures
 * ------------------------------------------------------------------ */

function rule(over: Partial<Automation> = {}): Automation {
  return {
    id: "r1",
    name: "Porch light on arrival",
    on: true,
    when: "the doorbell sees a person",
    whenIcon: "user-round",
    then: [{ text: "turn on the porch light", icon: "lightbulb" }],
    last: "ran today, 08:12",
    ...over,
  };
}

/** Four rules, `r1`…`r4`, matching the shape the store keeps. */
function board(): Automation[] {
  return ["r1", "r2", "r3", "r4"].map((id) => rule({ id, name: `Rule ${id}` }));
}

const TRIGGER: AutomationOption = {
  value: "press",
  label: "Doorbell is pressed",
  icon: "bell-ring",
};

const ACTION: AutomationOption = {
  value: "lamp",
  label: "Turn on the porch light",
  icon: "lightbulb",
};

/* ------------------------------------------------------------------ *
 * Visibility — rule 1
 * ------------------------------------------------------------------ */

describe("visible automations", () => {
  it("hides the deleted ids and keeps the rest in order", () => {
    const all = board();
    expect(visibleAutomations(all, ["r2"]).map((r) => r.id)).toEqual([
      "r1",
      "r3",
      "r4",
    ]);
  });

  it("returns everything when nothing is deleted", () => {
    const all = board();
    expect(visibleAutomations(all, []).map((r) => r.id)).toEqual([
      "r1",
      "r2",
      "r3",
      "r4",
    ]);
  });

  it("never touches the list it filtered — Undo puts rows back", () => {
    const all = board();
    const snapshot = structuredClone(all);
    const visible = visibleAutomations(all, ["r1", "r1"]);
    expect(all).toEqual(snapshot);
    expect(visible).not.toBe(all);
    /* A repeated id in the blacklist removes one row, not two. */
    expect(visible).toHaveLength(3);
  });

  it("shrugs at an id that was never on the board", () => {
    expect(visibleAutomations(board(), ["r99"])).toHaveLength(4);
  });

  it("empties out when every rule is deleted, and on an empty board", () => {
    expect(visibleAutomations(board(), ["r1", "r2", "r3", "r4"])).toEqual([]);
    expect(visibleAutomations([], ["r1"])).toEqual([]);
  });
});

/* ------------------------------------------------------------------ *
 * Running or paused — rule 2
 * ------------------------------------------------------------------ */

describe("running state", () => {
  it("runs a rule that is on and not paused this session", () => {
    expect(isAutomationOn(rule({ on: true }), [])).toBe(true);
  });

  it("stops for either switch, and for both", () => {
    /* Session pause and the rule's own flag are independent: the seeded-paused
     * rule (`on: false`) is not in `auOff` at boot, so a check that only reads
     * the pause list would show it running. */
    expect(isAutomationOn(rule({ id: "r1", on: true }), ["r1"])).toBe(false);
    expect(isAutomationOn(rule({ id: "r1", on: false }), [])).toBe(false);
    expect(isAutomationOn(rule({ id: "r1", on: false }), ["r1"])).toBe(false);
  });

  it("only matches its own id in the pause list", () => {
    expect(isAutomationOn(rule({ id: "r1" }), ["r2", "r3"])).toBe(true);
  });

  it("counts the running rules, not the visible ones", () => {
    const all = [
      rule({ id: "r1", on: true }),
      rule({ id: "r2", on: true }),
      rule({ id: "r3", on: false }),
    ];
    expect(runningCount(all, [])).toBe(2);
    expect(runningCount(all, ["r1"])).toBe(1);
    expect(runningCount(all, ["r1", "r2"])).toBe(0);
    expect(runningCount([], [])).toBe(0);
  });

  it("counts what the screen shows when it is handed the visible list", () => {
    /* The screen filters first and counts second — a deleted-but-running rule
     * must not be in the headline. */
    const all = board();
    expect(runningCount(visibleAutomations(all, ["r4"]), [])).toBe(3);
  });
});

/* ------------------------------------------------------------------ *
 * Copy
 * ------------------------------------------------------------------ */

describe("intro line", () => {
  it("leads with the running-of-total count", () => {
    expect(automationIntro(3, 4)).toContain("3 of 4 running");
    expect(automationIntro(0, 4)).toContain("0 of 4 running");
  });

  it("switches to the empty-board sentence when there is nothing to count", () => {
    /* Zero *total*, not zero running — a board of four paused rules still gets
     * the count sentence. */
    expect(automationIntro(0, 0)).toContain("Nothing running yet");
    expect(automationIntro(0, 0)).not.toContain("0 of 0");
    expect(automationIntro(0, 4)).not.toContain("Nothing running yet");
  });
});

describe("the sub-line under a rule", () => {
  it("shows the rule's own history while it runs", () => {
    expect(automationLast(rule({ last: "ran yesterday, 19:26" }), true)).toBe(
      "ran yesterday, 19:26",
    );
  });

  it("replaces it with the literal word when paused", () => {
    expect(automationLast(rule({ last: "ran yesterday, 19:26" }), false)).toBe(
      "paused",
    );
  });

  it("hands back a stale history string when a paused rule is resumed", () => {
    /*
     * Known rough edge, asserted rather than assumed. `last` is authored data
     * and nothing refreshes it, so a rule seeded "paused since 12 Jul" that the
     * user switches back on reads as paused-since while its toggle says running.
     * The fix belongs in whatever turns the rule on, not here — this module is
     * given the flag and told what to print.
     */
    const resumed = rule({ on: true, last: "paused since 12 Jul" });
    expect(automationLast(resumed, isAutomationOn(resumed, []))).toBe(
      "paused since 12 Jul",
    );
  });
});

describe("toasts", () => {
  it("names the rule and its new state", () => {
    expect(automationToggleToast(rule({ name: "Away means Eco" }), true)).toBe(
      "Away means Eco running",
    );
    expect(automationToggleToast(rule({ name: "Away means Eco" }), false)).toBe(
      "Away means Eco paused",
    );
    expect(automationDeleteToast(rule({ name: "Away means Eco" }))).toBe(
      "Away means Eco deleted",
    );
  });

  it("keeps the three validation messages distinct", () => {
    /* They are the only signal about *which* field is missing — the panel
     * highlights nothing. */
    const toasts = [auNameToast(), auTriggerToast(), auActionToast()];
    expect(new Set(toasts).size).toBe(3);
    expect(toasts).not.toContain(auCreatedToast());
  });
});

/* ------------------------------------------------------------------ *
 * De-capitalising — rule 3
 * ------------------------------------------------------------------ */

describe("decapitalise", () => {
  it("lowers the first character and nothing else", () => {
    expect(decapitalise("Turn on the porch light")).toBe(
      "turn on the porch light",
    );
    expect(decapitalise("Hallway drops below 17°")).toBe(
      "hallway drops below 17°",
    );
  });

  it("leaves an acronym looking odd rather than lower-casing the word", () => {
    /* First char only, by design: "IKEA lamp" → "iKEA lamp". The word-wise
     * "fix" would wreck every product name in the action list. */
    expect(decapitalise("IKEA lamp")).toBe("iKEA lamp");
  });

  it("leaves an already-lowercase label alone", () => {
    expect(decapitalise("everyone leaves home")).toBe("everyone leaves home");
  });

  it("handles an accented capital", () => {
    expect(decapitalise("Éteindre la lampe")).toBe("éteindre la lampe");
  });

  it("passes through a label that does not start with a letter", () => {
    expect(decapitalise("30-second clip")).toBe("30-second clip");
    expect(decapitalise("  Leading space")).toBe("  Leading space");
  });

  it("does not shred a leading emoji", () => {
    /* `charAt(0)` takes half a surrogate pair; lower-casing a lone surrogate is
     * a no-op, so the halves re-join unharmed. Pinned because a naive rewrite
     * with `[...text]` or a locale-aware lower-caser changes this. */
    expect(decapitalise("🔔 Ring the bell")).toBe("🔔 Ring the bell");
  });

  it("returns an empty string for an empty label instead of throwing", () => {
    expect(decapitalise("")).toBe("");
    expect(decapitalise("A")).toBe("a");
  });
});

/* ------------------------------------------------------------------ *
 * Id minting — rule 1 again
 * ------------------------------------------------------------------ */

describe("id minting", () => {
  it("counts from one", () => {
    expect(nextAutomationId(0)).toBe("r1");
    expect(nextAutomationId(4)).toBe("r5");
  });

  it("is free as long as it is fed the length of the list that only grows", () => {
    const all = board();
    const minted = nextAutomationId(all.length);
    expect(all.some((r) => r.id === minted)).toBe(false);
  });

  it("collides if it is ever fed the visible count instead", () => {
    /*
     * The trap ruling R2 leaves behind. Delete r4 and the board shows three
     * rules — but r4 is still in `automations` and its id is in `auGone`.
     * Minting from the visible count re-issues "r4", so the new rule would be
     * created straight into the blacklist and never appear, and Undo on the
     * old delete would bring back a second row with the same id.
     */
    const all = board();
    const gone = ["r4"];
    const fromVisible = nextAutomationId(visibleAutomations(all, gone).length);
    expect(fromVisible).toBe("r4");
    expect(gone).toContain(fromVisible);
    expect(all.some((r) => r.id === fromVisible)).toBe(true);
    /* Which is why the store passes the full length. */
    expect(nextAutomationId(all.length)).toBe("r5");
  });
});

/* ------------------------------------------------------------------ *
 * Building a rule
 * ------------------------------------------------------------------ */

describe("buildAutomation", () => {
  const built = () =>
    buildAutomation({
      id: "r5",
      name: "Porch Light When Someone Calls",
      trigger: TRIGGER,
      action: ACTION,
    });

  it("writes the when/then sentence from the option labels", () => {
    const r = built();
    expect(r.when).toBe("doorbell is pressed");
    expect(r.then).toEqual([
      { text: "turn on the porch light", icon: "lightbulb" },
    ]);
  });

  it("keeps the name exactly as typed", () => {
    /* The labels are de-capitalised because they sit mid-sentence; the name is
     * a heading and must not be. Easy to "tidy" into one map over all three. */
    expect(built().name).toBe("Porch Light When Someone Calls");
  });

  it("carries each option's icon to the line it belongs to", () => {
    const r = built();
    expect(r.whenIcon).toBe(TRIGGER.icon);
    expect(r.then[0].icon).toBe(ACTION.icon);
  });

  it("builds exactly one THEN line even though the model allows many", () => {
    /* Seeded rules have two actions; the builder offers one select, so a rule
     * created in-session has one. A second `then` here means the panel grew a
     * field the store never wired up. */
    expect(built().then).toHaveLength(1);
  });

  it("starts running, flagged new, and with no run history", () => {
    const r = built();
    expect(r.on).toBe(true);
    expect(r.fresh).toBe(true);
    expect(r.last).toBe("never run yet");
    expect(r.id).toBe("r5");
  });

  it("survives an empty name and empty labels without throwing", () => {
    /* The store blocks an empty name with auNameToast(), but the builder is a
     * pure function and must not be the thing that explodes. */
    const r = buildAutomation({
      id: "r9",
      name: "",
      trigger: { value: "x", label: "", icon: "bell" },
      action: { value: "y", label: "", icon: "bell" },
    });
    expect(r.when).toBe("");
    expect(r.then[0].text).toBe("");
  });
});

/* ------------------------------------------------------------------ *
 * The board, end to end
 * ------------------------------------------------------------------ */

describe("the board", () => {
  it("takes a new rule from the panel to the top of a running list", () => {
    const all = board();
    const created = buildAutomation({
      id: nextAutomationId(all.length),
      name: "Kitchen lamp at sunset",
      trigger: TRIGGER,
      action: ACTION,
    });
    /* The store unshifts, so the newest rule reads first. */
    const next = [created, ...all];
    const visible = visibleAutomations(next, []);

    expect(visible[0].id).toBe("r5");
    expect(runningCount(visible, [])).toBe(5);
    expect(automationIntro(runningCount(visible, []), visible.length)).toContain(
      "5 of 5 running",
    );
    expect(automationLast(created, isAutomationOn(created, []))).toBe(
      "never run yet",
    );
  });

  it("pauses and deletes without losing the rule underneath", () => {
    const all = board();
    const off = ["r2"];
    const gone = ["r3"];
    const visible = visibleAutomations(all, gone);

    expect(visible.map((r) => r.id)).toEqual(["r1", "r2", "r4"]);
    expect(runningCount(visible, off)).toBe(2);
    expect(automationLast(all[1], isAutomationOn(all[1], off))).toBe("paused");
    /* Undo drops the id again and the row comes back exactly as it was. */
    expect(visibleAutomations(all, []).map((r) => r.id)).toEqual([
      "r1",
      "r2",
      "r3",
      "r4",
    ]);
  });

  it("shows the empty-board copy once every rule is deleted", () => {
    const all = board();
    const visible = visibleAutomations(all, ["r1", "r2", "r3", "r4"]);
    expect(automationIntro(runningCount(visible, []), visible.length)).toContain(
      "Nothing running yet",
    );
  });
});
