/*
 * `survey` — Feedback survey (port spec §6.33, logic §8.36). Max-width 760.
 * Two states, keyed off `svDone`.
 *
 * The progress meter counts five answers even though the form shows four
 * questions: Q2 contributes one per rating row, so 1 + 3 + 1 = 5. That is how
 * the comp counts and the label says so out loud ("<n> of 5 answered").
 *
 * The reference is deterministic — `surveyRef(nps, tagCount)` = FB-(52100 +
 * nps*13 + tags), no randomness anywhere (ruling R4).
 */

import {
  ButtonPrimary,
  ButtonSecondary,
  Card,
  Chip,
  ChipRow,
  Icon,
  ListCard,
  TextArea,
} from "../components";
import { SURVEY_THANKS_HIGH, SURVEY_THANKS_LOW } from "../data/demo";
import { dataSource } from "../data/source";
import { useI18n } from "../i18n";
import { surveyRef } from "../lib/format";
import { top, useAppStore } from "../state/store";
import "../styles/screen-survey.css";

const NPS_SCORES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const TOTAL_Q = 5;
const TEXT_CAP = 800;
const NPS_MAX = 10;
const SURVEY_MINUTES = 2;
const SURVEY_QUESTIONS = 4;

/** The band a chosen NPS score sits in — promoter / passive / detractor. */
function npsToken(n: number): string {
  if (n >= 9) return "--pos";
  if (n >= 7) return "--warn";
  return "--danger";
}

export default function Survey() {
  const { t, number } = useI18n();
  const ROWS = dataSource.surveyRows();
  const SCALE = dataSource.surveyScale();
  const TAGS = dataSource.surveyTags();

  const svNps = useAppStore((s) => s.svNps);
  const svRatings = useAppStore((s) => s.svRatings);
  const svTagsOn = useAppStore((s) => s.svTagsOn);
  const svText = useAppStore((s) => s.svText);
  const svContact = useAppStore((s) => s.svContact);
  const svDone = useAppStore((s) => s.svDone);
  const set = useAppStore((s) => s.set);
  const showToast = useAppStore((s) => s.showToast);
  const goHome = useAppStore((s) => s.goHome);

  const scoreText =
    svNps === null
      ? "—"
      : t("screensB.survey.scoreOf", {
          score: number(svNps),
          max: number(NPS_MAX),
        });

  /* ------------------------------------------------------- thank-you state */

  if (svDone) {
    return (
      <main className="fx-screen fx-page w-760 svy">
        <Card className="svy__done">
          <span className="svy__done-tile">
            <Icon name="heart" size={26} />
          </span>
          <h1 className="svy__done-title">{t("screensB.survey.doneTitle")}</h1>
          <p className="svy__done-body">
            {svNps !== null && svNps >= 9
              ? SURVEY_THANKS_HIGH
              : SURVEY_THANKS_LOW}
          </p>
          <div className="svy__done-chips">
            <span className="svy__ref">{svDone}</span>
            <span className="svy__ref">
              {t("screensB.survey.scoreChip", { score: scoreText })}
            </span>
          </div>
          <div className="svy__done-actions">
            <ButtonPrimary icon="life-buoy" onClick={goHome}>
              {t("screensB.survey.backToHelp")}
            </ButtonPrimary>
            <ButtonSecondary
              icon="rotate-ccw"
              onClick={() =>
                set({
                  svNps: null,
                  svRatings: {},
                  svTagsOn: [],
                  svText: "",
                  svContact: false,
                  svDone: null,
                })
              }
            >
              {t("screensB.survey.fillAgain")}
            </ButtonSecondary>
          </div>
        </Card>
      </main>
    );
  }

  /* ------------------------------------------------------------- the form */

  const answered =
    (svNps !== null ? 1 : 0) +
    Object.keys(svRatings).length +
    (svTagsOn.length ? 1 : 0);
  const pct = Math.round((answered / TOTAL_Q) * 100);

  const submit = () => {
    if (svNps === null) {
      showToast(t("screensB.survey.needScore"), "warn");
      return;
    }
    set({ svDone: surveyRef(svNps, svTagsOn.length) });
    showToast(t("screensB.survey.sent"));
    top();
  };

  const toggleTag = (tag: string) =>
    set({
      svTagsOn: svTagsOn.includes(tag)
        ? svTagsOn.filter((x) => x !== tag)
        : [...svTagsOn, tag],
    });

  return (
    <main className="fx-screen fx-page w-760 svy">
      <p className="svy__eyebrow">
        {t("screensB.survey.eyebrow", {
          minutes: number(SURVEY_MINUTES),
          questions: number(SURVEY_QUESTIONS),
        })}
      </p>
      <h1 className="svy__h1">{t("screensB.survey.h1")}</h1>
      <p className="svy__lede">{t("screensB.survey.lede")}</p>

      <div className="svy__progress">
        <div
          className="svy__track"
          role="progressbar"
          aria-valuenow={answered}
          aria-valuemin={0}
          aria-valuemax={TOTAL_Q}
          aria-label={t("screensB.survey.progressLabel")}
        >
          <div className="svy__fill" style={{ inlineSize: `${pct}%` }} />
        </div>
        <span className="svy__count">
          {t("screensB.survey.answered", {
            answered: number(answered),
            total: number(TOTAL_Q),
          })}
        </span>
      </div>

      <div className="svy__questions">
        <Card className="svy__q">
          <h2 className="svy__q-title">{t("screensB.survey.q1")}</h2>
          <p className="svy__q-note">{t("screensB.survey.q1Note")}</p>
          <div
            className="svy__nps"
            role="group"
            aria-label={t("screensB.survey.npsGroup")}
          >
            {NPS_SCORES.map((n) => {
              const on = svNps === n;
              return (
                <button
                  type="button"
                  key={n}
                  className={`sd-chip fx-chip svy__nps-btn${on ? " svy__nps-btn--on" : ""}`}
                  aria-pressed={on}
                  style={
                    on
                      ? {
                          background: `var(${npsToken(n)})`,
                          borderColor: `var(${npsToken(n)})`,
                          color: "var(--bg)",
                        }
                      : undefined
                  }
                  onClick={() => set({ svNps: n })}
                >
                  {number(n)}
                </button>
              );
            })}
          </div>
        </Card>

        <ListCard className="svy__rows">
          {ROWS.map((r) => (
            <div className="sd-listrow svy__row" key={r.id}>
              <span className="svy__row-label">{r.label}</span>
              <div className="svy__scale" role="group" aria-label={r.label}>
                {SCALE.map((o) => {
                  const on = svRatings[r.id] === o.v;
                  return (
                    <button
                      type="button"
                      key={o.v}
                      className={`sd-chip fx-chip svy__scale-btn${on ? " svy__scale-btn--on" : ""}`}
                      title={o.title}
                      aria-label={t("screensB.survey.scaleAria", {
                        row: r.label,
                        rating: o.title,
                      })}
                      aria-pressed={on}
                      onClick={() =>
                        set({ svRatings: { ...svRatings, [r.id]: o.v } })
                      }
                    >
                      <Icon name={o.icon} size={16} />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </ListCard>

        <Card className="svy__q">
          <h2 className="svy__q-title">{t("screensB.survey.q2")}</h2>
          <p className="svy__q-note">{t("screensB.survey.q2Note")}</p>
          <ChipRow>
            {TAGS.map((tag) => (
              <Chip
                key={tag}
                active={svTagsOn.includes(tag)}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Chip>
            ))}
          </ChipRow>
        </Card>

        <Card className="svy__q">
          <div className="svy__q-head">
            <h2 className="svy__q-title" id="svy-text-label">
              {t("screensB.survey.q3")}
            </h2>
            <span className="svy__optional">
              {t("screensB.survey.optional")}
            </span>
          </div>
          <TextArea
            value={svText}
            onChange={(v) => set({ svText: v })}
            placeholder={t("screensB.survey.q3Placeholder")}
            maxLength={TEXT_CAP}
            minHeight={110}
            ariaLabel={t("screensB.survey.q3")}
          />
          <div className="svy__q-foot">
            <label className="svy__optin">
              <input
                type="checkbox"
                className="sr-only"
                checked={svContact}
                onChange={(e) => set({ svContact: e.target.checked })}
              />
              <span
                className={`sd-box${svContact ? " sd-box--on" : ""}`}
                aria-hidden="true"
              >
                {svContact ? <Icon name="check" size={13} /> : null}
              </span>
              {t("screensB.survey.emailOptIn")}
            </label>
            <ButtonPrimary icon="send" onClick={submit}>
              {t("screensB.survey.send")}
            </ButtonPrimary>
          </div>
        </Card>
      </div>
    </main>
  );
}
