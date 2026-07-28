/*
 * The automations builder.
 *
 * Rules are one trigger and one action. A rule is "running" when it is not in
 * `auOff` and its own `on` flag is not false; deleted rules go into `auGone`
 * so Undo can put them back.
 *
 * Ruling R2: the comp minted new ids with `Math.random()`. Ids here are the
 * list length plus one, which is unique because the list only ever grows —
 * deletion is an id blacklist, not a splice.
 */

import type { Automation, AutomationOption, AutomationStep } from "../data/types";

/** Rules still on the board — `auGone` removed. */
export function visibleAutomations(all: Automation[], gone: string[]): Automation[] {
  return all.filter((r) => !gone.includes(r.id));
}

/** A rule runs unless it is paused this session or seeded paused. */
export function isAutomationOn(rule: Automation, off: string[]): boolean {
  return !off.includes(rule.id) && rule.on !== false;
}

export function runningCount(rules: Automation[], off: string[]): number {
  return rules.filter((r) => isAutomationOn(r, off)).length;
}

export function automationIntro(running: number, total: number): string {
  return total
    ? `${running} of ${total} running. Each one is a trigger and an action — reorder nothing, break nothing.`
    : "Nothing running yet. Automations are one trigger and one action.";
}

/** The sub-line under a rule name: its `last` string, or the literal `paused`. */
export function automationLast(rule: Automation, on: boolean): string {
  return on ? rule.last : "paused";
}

export function automationToggleToast(rule: Automation, nextOn: boolean): string {
  return `${rule.name} ${nextOn ? "running" : "paused"}`;
}

export function automationDeleteToast(rule: Automation): string {
  return `${rule.name} deleted`;
}

/** "Turn on the porch light" → "turn on the porch light". First char only. */
export function decapitalise(text: string): string {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

/** `r5`, `r6`, … — the list only grows, so length + 1 is always free. */
export function nextAutomationId(count: number): string {
  return `r${count + 1}`;
}

/**
 * Assemble the rule `auSave()` unshifts. Trigger and action labels are
 * de-capitalised so they read inside the "when … then …" sentence.
 */
export function buildAutomation(input: {
  id: string;
  name: string;
  trigger: AutomationOption;
  action: AutomationOption;
}): Automation {
  const then: AutomationStep[] = [
    { text: decapitalise(input.action.label), icon: input.action.icon },
  ];
  return {
    id: input.id,
    name: input.name,
    on: true,
    fresh: true,
    when: decapitalise(input.trigger.label),
    whenIcon: input.trigger.icon,
    then,
    last: "never run yet",
  };
}

/* --------------------------------------------------------------- toasts */

export const AU_NAME_TOAST = "Give the automation a name";
export const AU_TRIGGER_TOAST = "Pick a trigger";
export const AU_ACTION_TOAST = "Pick an action";
export const AU_CREATED_TOAST = "Automation created";
