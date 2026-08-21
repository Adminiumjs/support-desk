/*
 * `plans` — Hearth Care plans (port spec §6.23 / §8.34). Max-width 1000.
 *
 * Ruling R1: this screen ships. Its pricing copy is demo fiction inside the
 * example app and is exempt from the deferred-monetization sweep (18 §3.4).
 *
 * Annual price is simply `mo * 10` ("2 months free"); the per-month equivalent
 * shown under it is `yr / 12`.
 */

import {
  ButtonSecondary,
  Card,
  Icon,
  SoftPill,
  Tabs,
} from "../components";
import { PLAN_ANNUAL_LABEL, PLAN_BILLING_SUFFIX } from "../data/demo";
import { nextChargeDate } from "../lib/derive.ts";
import { dataSource } from "../data/source";
import type { Plan, PlanCycle } from "../data/types";
import { useT, type TFunction } from "../i18n";
import { money } from "../lib/format";
import { useAppStore } from "../state/store";
import "../styles/screen-plans.css";

function priceOf(plan: Plan, cycle: PlanCycle, t: TFunction): string {
  if (plan.mo === 0) return t("screensB.plans.free");
  return cycle === "annual" ? money(plan.mo * 10) : money(plan.mo);
}

function perOf(plan: Plan, cycle: PlanCycle, t: TFunction): string {
  if (plan.mo === 0) return t("screensB.plans.perAlways");
  return cycle === "annual"
    ? t("screensB.plans.perYear")
    : t("screensB.plans.perMonth");
}

function billedOf(plan: Plan, cycle: PlanCycle, t: TFunction): string {
  if (plan.mo === 0) return t("screensB.plans.noCard");
  return cycle === "annual"
    ? t("screensB.plans.worksOut", { amount: money((plan.mo * 10) / 12) })
    : t("screensB.plans.billedMonthly");
}

export default function Plans() {
  const t = useT();
  const planCycle = useAppStore((s) => s.planCycle);
  const planCurrent = useAppStore((s) => s.planCurrent);
  const set = useAppStore((s) => s.set);
  const showToast = useAppStore((s) => s.showToast);
  const gotoBilling = useAppStore((s) => s.gotoBilling);

  const CYCLES: { id: PlanCycle; label: string }[] = [
    { id: "monthly", label: t("screensB.plans.cycleMonthly") },
    { id: "annual", label: PLAN_ANNUAL_LABEL },
  ];

  const plans = dataSource.plans();
  const current = plans.find((p) => p.id === planCurrent) ?? plans[0];

  const billingLine =
    current.mo === 0
      ? t("screensB.plans.freeTierBilling")
      : t("screensB.plans.billingLine", {
          plan: current.name,
          price:
            planCycle === "annual"
              ? t("screensB.plans.pricePerYear", {
                  amount: money(current.mo * 10),
                })
              : t("screensB.plans.pricePerMonth", {
                  amount: money(current.mo),
                }),
          suffix: PLAN_BILLING_SUFFIX,
          date: nextChargeDate(planCycle),
        });

  const choose = (plan: Plan) => {
    if (plan.id === planCurrent) return;
    set({ planCurrent: plan.id });
    showToast(t("screensB.plans.switched", { plan: plan.name }));
  };

  const cancel = () => {
    if (planCurrent === "free") {
      showToast(t("screensB.plans.alreadyFree"), "info");
      return;
    }
    set({ planCurrent: "free" });
    showToast(t("screensB.plans.cancelled"));
  };

  return (
    <main className="fx-screen fx-page w-1000 fx-wide">
      <h1 className="plans-title">{t("screensB.plans.title")}</h1>
      <p className="plans-lede">{t("screensB.plans.lede")}</p>

      <Tabs
        label={t("screensB.plans.cycleLabel")}
        gap={9}
        className="plans-cycle"
        options={CYCLES}
        value={planCycle}
        onChange={(id) => set({ planCycle: id })}
      />

      <div className="plans-grid">
        {plans.map((p) => {
          const cur = p.id === planCurrent;
          return (
            <Card key={p.id} accent={cur} className="plans-card">
              <div className="plans-card__head">
                <span className="plans-card__name">{p.name}</span>
                {cur ? (
                  <SoftPill fg="--pos" soft="--pos-soft" icon="check">
                    {t("screensB.plans.currentPlan")}
                  </SoftPill>
                ) : p.popular ? (
                  <SoftPill
                    fg="--accent"
                    soft="--accent-soft"
                    icon="sparkles"
                  >
                    {t("screensB.plans.mostChosen")}
                  </SoftPill>
                ) : null}
              </div>

              <div className="plans-card__pricerow">
                <span className="plans-card__price">
                  {priceOf(p, planCycle, t)}
                </span>
                <span className="plans-card__per">
                  {perOf(p, planCycle, t)}
                </span>
              </div>
              <p className="plans-card__billed">
                {billedOf(p, planCycle, t)}
              </p>

              <p className="plans-card__blurb">{p.blurb}</p>

              <ul className="plans-features">
                {p.features.map(([icon, text, positive]) => (
                  <li key={text} className="plans-feature">
                    <Icon
                      name={icon === "check" ? "check" : "minus"}
                      size={16}
                      color={positive ? "var(--pos)" : "var(--fg-subtle)"}
                      className="plans-feature__ico"
                    />
                    <span
                      className="plans-feature__text"
                      style={{
                        color: positive ? "var(--fg-muted)" : "var(--fg-subtle)",
                      }}
                    >
                      {text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={`fx-chip plans-card__btn${
                  cur ? " plans-card__btn--cur" : ""
                }`}
                aria-disabled={cur}
                onClick={() => choose(p)}
              >
                {cur
                  ? t("screensB.plans.yourCurrentPlan")
                  : p.id === "free"
                    ? t("screensB.plans.downgradeTo", { plan: p.name })
                    : t("screensB.plans.switchTo", { plan: p.name })}
              </button>
            </Card>
          );
        })}
      </div>

      <div className="plans-bottom">
        <Card className="plans-billing">
          <p className="plans-bottom__head">
            <Icon name="credit-card" size={16} />
            {t("screensB.plans.billing")}
          </p>
          <p className="plans-bottom__body">{billingLine}</p>
          <div className="plans-billing__acts">
            {/* Delta §6.13 — the real invoice history now exists. */}
            <ButtonSecondary icon="file-text" onClick={gotoBilling}>
              {t("screensB.plans.invoices")}
            </ButtonSecondary>
            <ButtonSecondary
              icon="x-circle"
              tone="var(--danger)"
              onClick={cancel}
            >
              {t("screensB.plans.cancelPlan")}
            </ButtonSecondary>
          </div>
        </Card>

        <div className="plans-never">
          <p className="plans-bottom__head">
            <Icon name="info" size={16} />
            {t("screensB.plans.neverHead")}
          </p>
          <p className="plans-bottom__body">{t("screensB.plans.neverBody")}</p>
        </div>
      </div>
    </main>
  );
}
