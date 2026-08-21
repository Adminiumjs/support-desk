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
import { useT } from "../i18n";
import { longDate } from "../lib/format";
import { useAppStore } from "../state/store";
import "../styles/screen-breach.css";

/** The result card's colour family. `info` is the "that isn't an address" case. */
const RESULT_TONE: Record<BreachResultKind, string> = {
  hit: "--warn",
  clear: "--pos",
  info: "--info",
};

/* The disclosure's own dates, as Dates rather than authored strings, so the
 * meta line and the regulator note read in the locale's own calendar format. */
const PUBLISHED = new Date(2026, 6, 24);
const UPDATED = new Date(2026, 6, 27);
const REPORTED = new Date(2026, 6, 23);
const ICO_REF = "IC-4471-8823";
const PRIVACY_EMAIL = "privacy@hearth.example";

export default function Breach() {
  const t = useT();
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

  /* One `{ref}` / `{email}` slot each, so a single split keeps the sentence
     the translator wrote intact around the styled token. */
  const regulator = t("screensA.breach.regulatorText", {
    date: longDate(REPORTED),
  }).split("{ref}");
  const questions = t("screensA.breach.questionsText").split("{email}");

  return (
    <main className="fx-screen fx-page w-760 scr-breach">
      <div className="br-meta">
        <span className="br-badge">
          <Icon name="shield-alert" size={13} />
          {t("screensA.breach.badge")}
        </span>
        <span className="br-published">
          {t("screensA.breach.published", {
            published: longDate(PUBLISHED),
            updated: longDate(UPDATED),
          })}
        </span>
      </div>

      <h1 className="br-h1">{t("screensA.breach.h1")}</h1>
      <p className="br-lede">{t("screensA.breach.lede")}</p>

      <div className="br-status">
        <span className="br-status__ico">
          <Icon name="check-circle-2" size={22} color="var(--pos)" />
        </span>
        <div>
          <p className="br-status__title">{t("screensA.breach.statusTitle")}</p>
          <p className="br-status__text">{t("screensA.breach.statusText")}</p>
        </div>
      </div>

      <ListCard className="br-table">
        <p className="br-table__head">{t("screensA.breach.tableHead")}</p>
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

      <h2 className="br-h2">{t("screensA.breach.affected")}</h2>
      <Card variant="lg" className="br-check">
        <p className="br-check__intro">{t("screensA.breach.checkIntro")}</p>
        <div className="br-check__row">
          <div className="br-check__field">
            <label className="br-check__label" htmlFor="br-email">
              {t("screensA.breach.emailLabel")}
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
            {t("screensA.breach.check")}
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

      <h2 className="br-h2">{t("screensA.breach.steps")}</h2>
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

      <h2 className="br-h2">{t("screensA.breach.timeline")}</h2>
      <Card variant="lg" className="br-timeline">
        <EventTimeline entries={timeline} />
      </Card>

      <div className="br-pair">
        <Card variant="lg" className="br-panel">
          <span className="br-panel__head">
            <Icon name="scale" size={16} color="var(--fg-muted)" />
            <span className="br-panel__title">
              {t("screensA.breach.regulator")}
            </span>
          </span>
          <p className="br-panel__text">
            {regulator[0]}
            <span className="br-panel__ref">{ICO_REF}</span>
            {regulator[1]}
          </p>
        </Card>

        <Card variant="lg" className="br-panel">
          <span className="br-panel__head">
            <Icon name="mail" size={16} color="var(--fg-muted)" />
            <span className="br-panel__title">
              {t("screensA.breach.questions")}
            </span>
          </span>
          <p className="br-panel__text">
            {questions[0]}
            <span className="br-panel__ref">{PRIVACY_EMAIL}</span>
            {questions[1]}
          </p>
          <ButtonSecondary
            icon="message-circle"
            iconSize={14}
            className="br-panel__btn"
            onClick={() => go("contact")}
          >
            {t("screensA.breach.contact")}
          </ButtonSecondary>
        </Card>
      </div>

      <p className="br-disclaimer">{t("screensA.breach.disclaimer")}</p>
    </main>
  );
}
