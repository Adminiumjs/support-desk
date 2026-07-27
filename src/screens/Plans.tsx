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
import { dataSource } from "../data/source";
import type { Plan, PlanCycle } from "../data/types";
import { planPrice } from "../lib/format";
import { useAppStore } from "../state/store";
import "../styles/screen-plans.css";

const CYCLES: { id: PlanCycle; label: string }[] = [
  { id: "monthly", label: "Monthly" },
  { id: "annual", label: PLAN_ANNUAL_LABEL },
];

function priceOf(plan: Plan, cycle: PlanCycle): string {
  if (plan.mo === 0) return planPrice(0);
  return cycle === "annual"
    ? `£${(plan.mo * 10).toFixed(2)}`
    : `£${plan.mo.toFixed(2)}`;
}

function perOf(plan: Plan, cycle: PlanCycle): string {
  if (plan.mo === 0) return "always";
  return cycle === "annual" ? "per year" : "per month";
}

function billedOf(plan: Plan, cycle: PlanCycle): string {
  if (plan.mo === 0) return "No card needed";
  return cycle === "annual"
    ? `works out at £${((plan.mo * 10) / 12).toFixed(2)} a month`
    : "billed monthly, cancel any time";
}

export default function Plans() {
  const planCycle = useAppStore((s) => s.planCycle);
  const planCurrent = useAppStore((s) => s.planCurrent);
  const set = useAppStore((s) => s.set);
  const showToast = useAppStore((s) => s.showToast);

  const plans = dataSource.plans();
  const current = plans.find((p) => p.id === planCurrent) ?? plans[0];

  const billingLine =
    current.mo === 0
      ? "You're on the free tier — nothing to bill."
      : `${current.name}, ${
          planCycle === "annual"
            ? `£${(current.mo * 10).toFixed(2)} a year`
            : `£${current.mo.toFixed(2)} a month`
        } ${PLAN_BILLING_SUFFIX}`;

  const choose = (plan: Plan) => {
    if (plan.id === planCurrent) return;
    set({ planCurrent: plan.id });
    showToast(`Switched to ${plan.name}`);
  };

  const cancel = () => {
    if (planCurrent === "free") {
      showToast("You're already on the free tier", "info");
      return;
    }
    set({ planCurrent: "free" });
    showToast("Plan cancelled — you're on Hearth Free");
  };

  return (
    <main className="oh-screen oh-page w-1000">
      <h1 className="plans-title">Hearth Care plans</h1>
      <p className="plans-lede">
        Clip history, priority support and free out-of-warranty repairs. Every
        plan works with as many devices as you own — cancel any time, keep the
        recordings you've downloaded.
      </p>

      <Tabs
        label="Billing cycle"
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
                    Current plan
                  </SoftPill>
                ) : p.popular ? (
                  <SoftPill
                    fg="--accent"
                    soft="--accent-soft"
                    icon="sparkles"
                  >
                    Most chosen
                  </SoftPill>
                ) : null}
              </div>

              <div className="plans-card__pricerow">
                <span className="plans-card__price">
                  {priceOf(p, planCycle)}
                </span>
                <span className="plans-card__per">{perOf(p, planCycle)}</span>
              </div>
              <p className="plans-card__billed">{billedOf(p, planCycle)}</p>

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
                className={`oh-chip plans-card__btn${
                  cur ? " plans-card__btn--cur" : ""
                }`}
                aria-disabled={cur}
                onClick={() => choose(p)}
              >
                {cur
                  ? "Your current plan"
                  : p.id === "free"
                    ? "Downgrade to Free"
                    : `Switch to ${p.name}`}
              </button>
            </Card>
          );
        })}
      </div>

      <div className="plans-bottom">
        <Card className="plans-billing">
          <p className="plans-bottom__head">
            <Icon name="credit-card" size={16} />
            Billing
          </p>
          <p className="plans-bottom__body">{billingLine}</p>
          <div className="plans-billing__acts">
            <ButtonSecondary
              icon="file-text"
              onClick={() =>
                showToast("Invoices aren't available in this demo", "info")
              }
            >
              Invoices
            </ButtonSecondary>
            <ButtonSecondary
              icon="x-circle"
              tone="var(--danger)"
              onClick={cancel}
            >
              Cancel plan
            </ButtonSecondary>
          </div>
        </Card>

        <div className="plans-never">
          <p className="plans-bottom__head">
            <Icon name="info" size={16} />
            What's never behind a plan
          </p>
          <p className="plans-bottom__body">
            Live view, alerts, schedules and local recording all work forever on
            the free tier. Plans only add cloud history and faster support.
          </p>
        </div>
      </div>
    </main>
  );
}
