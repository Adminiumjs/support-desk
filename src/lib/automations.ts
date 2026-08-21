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
import { number as fmtNumber, t } from "../i18n/ambient";

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
    ? t("lib.auto.intro", {
        running: fmtNumber(running),
        total: fmtNumber(total),
      })
    : t("lib.auto.introEmpty");
}

/**
 * The sub-line under a rule name: its `last` string, or "paused".
 *
 * `NEVER_RUN_STAMP` is a stored token, not prose — a rule created while the
 * portal was in Danish would otherwise keep a Danish sub-line forever. It is
 * translated here, at the point of rendering.
 */
export function automationLast(rule: Automation, on: boolean): string {
  if (!on) return t("lib.auto.paused");
  return rule.last === NEVER_RUN_STAMP ? t("lib.auto.neverRun") : rule.last;
}

export function automationToggleToast(rule: Automation, nextOn: boolean): string {
  return nextOn
    ? t("lib.auto.toastRunning", { name: rule.name })
    : t("lib.auto.toastPaused", { name: rule.name });
}

export function automationDeleteToast(rule: Automation): string {
  return t("lib.auto.toastDeleted", { name: rule.name });
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
    last: NEVER_RUN_STAMP,
  };
}

/** Stored marker for a rule that has not fired yet. See `automationLast()`. */
export const NEVER_RUN_STAMP = "never run yet";

/* --------------------------------------------------------------- toasts */

export function auNameToast(): string {
  return t("lib.auto.nameToast");
}

export function auTriggerToast(): string {
  return t("lib.auto.triggerToast");
}

export function auActionToast(): string {
  return t("lib.auto.actionToast");
}

export function auCreatedToast(): string {
  return t("lib.auto.createdToast");
}
