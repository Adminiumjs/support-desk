/*
 * `breach` — Data breach notice (delta B §5). Max-width 760.
 *
 * A public incident-disclosure page: what leaked, an "am I affected" checker
 * that runs against the canned exposed list, the suggested actions, and the
 * incident timeline.
 *
 * The checker lives in the store (`breachCheck`): an address with no usable
 * `@` produces the `info` card and deliberately fires no toast; everything
 * else produces `hit` or `clear` and toasts once.
 */

import {
  ButtonPrimary,
  ButtonSecondary,
  Card,
  EventTimeline,
  FactRow,
  Icon,
  ListCard,
  SoftPill,
} from "../components";
import { dataSource } from "../data/source";
import type { BreachResultKind } from "../data/types";
import { useAppStore } from "../state/store";
import "../styles/screen-breach.css";

/** The result card's colour family. `info` is the "that isn't an address" case. */
const RESULT_TONE: Record<BreachResultKind, string> = {
  hit: "--warn",
  clear: "--pos",
  info: "--info",
};

export default function Breach() {
  const brEmail = useAppStore((s) => s.brEmail);
  const brResult = useAppStore((s) => s.brResult);
  const setBreachEmail = useAppStore((s) => s.setBreachEmail);
  const breachCheck = useAppStore((s) => s.breachCheck);
  const breachReport = useAppStore((s) => s.breachReport);
  const go = useAppStore((s) => s.go);

  const items = dataSource.breachItems();
  const steps = dataSource.breachSteps();
  const timeline = dataSource.breachTimeline();

  /* Aligned with `BR_STEPS`: step 1 has no action, step 2 opens security
   * settings, step 3 opens a ticket. Explicit rather than inferred (ruling R6). */
  const stepActions: (() => void)[] = [
    () => undefined,
    () => go("security"),
    () => breachReport(),
  ];

  const tone = brResult ? RESULT_TONE[brResult.kind] : "--info";

  return (
    <main className="fx-screen fx-page w-760 scr-breach">
      <div className="br-meta">
        <span className="br-badge">
          <Icon name="shield-alert" size={13} />
          Security notice
        </span>
        <span className="br-published">
          published 24 Jul 2026 · updated 27 Jul 2026
        </span>
      </div>

      <h1 className="br-h1">
        A third-party email provider exposed some customer email addresses
      </h1>
      <p className="br-lede">
        On 22 July we found that a supplier we use to send order emails had a
        misconfigured backup. Email addresses and order reference numbers were
        readable for about 40 hours. No passwords, payment details, video clips
        or addresses were involved.
      </p>

      <div className="br-status">
        <span className="br-status__ico">
          <Icon name="check-circle-2" size={22} color="var(--pos)" />
        </span>
        <div>
          <p className="br-status__title">Contained and closed</p>
          <p className="br-status__text">
            The backup was secured within two hours of discovery. The supplier
            has been audited and the affected system retired.
          </p>
        </div>
      </div>

      <ListCard className="br-table">
        <p className="br-table__head">What was and wasn't affected</p>
        {items.map((b, i) => (
          <FactRow
            key={b.label}
            icon={b.icon}
            label={b.label}
            bad={b.bad}
            tone="warn"
            last={i === items.length - 1}
            pill={
              <SoftPill
                fg={b.bad ? "--warn" : "--pos"}
                soft={b.bad ? "--warn-soft" : "--pos-soft"}
              >
                {b.state}
              </SoftPill>
            }
          />
        ))}
      </ListCard>

      <h2 className="br-h2">Am I affected?</h2>
      <Card variant="lg" className="br-check">
        <p className="br-check__intro">
          Everyone affected was emailed on 24 July. You can also check here — we
          only compare against the list of exposed addresses, and we don't store
          what you type.
        </p>
        <div className="br-check__row">
          <div className="br-check__field">
            <label className="br-check__label" htmlFor="br-email">
              Your email address
            </label>
            <input
              id="br-email"
              type="email"
              className="fx-fld br-check__input"
              value={brEmail}
              placeholder="you@example.com"
              onChange={(e) => setBreachEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  breachCheck();
                }
              }}
            />
          </div>
          <ButtonPrimary
            icon="search-check"
            iconSize={16}
            className="br-check__btn"
            onClick={breachCheck}
          >
            Check
          </ButtonPrimary>
        </div>

        {brResult ? (
          <div
            className="br-result"
            style={{ background: `var(${tone}-soft)` }}
            role="status"
          >
            <Icon
              name={brResult.icon}
              size={18}
              color={`var(${tone})`}
              className="br-result__ico"
            />
            <p className="br-result__text">{brResult.text}</p>
          </div>
        ) : null}
      </Card>

      <h2 className="br-h2">What we'd suggest doing</h2>
      <ol className="br-steps">
        {steps.map((s, i) => (
          <li className="br-step" key={s.title}>
            <span className="br-step__num">{i + 1}</span>
            <div className="br-step__body">
              <p className="br-step__title">{s.title}</p>
              <p className="br-step__text">{s.text}</p>
              {s.action ? (
                <ButtonSecondary
                  icon={s.action.icon}
                  iconSize={14}
                  className="br-step__btn"
                  onClick={stepActions[i]}
                >
                  {s.action.label}
                </ButtonSecondary>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <h2 className="br-h2">Timeline</h2>
      <Card variant="lg" className="br-timeline">
        <EventTimeline entries={timeline} />
      </Card>

      <div className="br-pair">
        <Card variant="lg" className="br-panel">
          <span className="br-panel__head">
            <Icon name="scale" size={16} color="var(--fg-muted)" />
            <span className="br-panel__title">Regulator</span>
          </span>
          <p className="br-panel__text">
            Reported to the ICO on 23 July, reference{" "}
            <span className="br-panel__ref">IC-4471-8823</span>. You can
            complain to them directly at any time.
          </p>
        </Card>

        <Card variant="lg" className="br-panel">
          <span className="br-panel__head">
            <Icon name="mail" size={16} color="var(--fg-muted)" />
            <span className="br-panel__title">Questions</span>
          </span>
          <p className="br-panel__text">
            Our data protection lead answers these personally at{" "}
            <span className="br-panel__ref">privacy@hearth.example</span>.
          </p>
          <ButtonSecondary
            icon="message-circle"
            iconSize={14}
            className="br-panel__btn"
            onClick={() => go("contact")}
          >
            Contact us
          </ButtonSecondary>
        </Card>
      </div>

      <p className="br-disclaimer">
        This is a demo portal. The incident described here is fictional and no
        real data is involved.
      </p>
    </main>
  );
}
