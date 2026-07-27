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
import { surveyRef } from "../lib/format";
import { top, useAppStore } from "../state/store";
import "../styles/screen-survey.css";

const NPS_SCORES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const TOTAL_Q = 5;
const TEXT_CAP = 800;

/** The band a chosen NPS score sits in — promoter / passive / detractor. */
function npsToken(n: number): string {
  if (n >= 9) return "--pos";
  if (n >= 7) return "--warn";
  return "--danger";
}

export default function Survey() {
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

  const scoreText = svNps === null ? "—" : `${svNps}/10`;

  /* ------------------------------------------------------- thank-you state */

  if (svDone) {
    return (
      <main className="oh-screen oh-page w-760 svy">
        <Card className="svy__done">
          <span className="svy__done-tile">
            <Icon name="heart" size={26} />
          </span>
          <h1 className="svy__done-title">Thank you — genuinely</h1>
          <p className="svy__done-body">
            {svNps !== null && svNps >= 9
              ? SURVEY_THANKS_HIGH
              : SURVEY_THANKS_LOW}
          </p>
          <div className="svy__done-chips">
            <span className="svy__ref">{svDone}</span>
            <span className="svy__ref">score {scoreText}</span>
          </div>
          <div className="svy__done-actions">
            <ButtonPrimary icon="life-buoy" onClick={goHome}>
              Back to help center
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
              Fill it in again
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
      showToast("Pick a score from 0 to 10 first", "warn");
      return;
    }
    set({ svDone: surveyRef(svNps, svTagsOn.length) });
    showToast("Feedback sent — thank you");
    top();
  };

  const toggleTag = (tag: string) =>
    set({
      svTagsOn: svTagsOn.includes(tag)
        ? svTagsOn.filter((t) => t !== tag)
        : [...svTagsOn, tag],
    });

  return (
    <main className="oh-screen oh-page w-760 svy">
      <p className="svy__eyebrow">2 MINUTES, 4 QUESTIONS</p>
      <h1 className="svy__h1">How did we do?</h1>
      <p className="svy__lede">
        This goes straight to the support team — no marketing list, no follow-up
        unless you ask for one.
      </p>

      <div className="svy__progress">
        <div
          className="svy__track"
          role="progressbar"
          aria-valuenow={answered}
          aria-valuemin={0}
          aria-valuemax={TOTAL_Q}
          aria-label="Survey progress"
        >
          <div className="svy__fill" style={{ inlineSize: `${pct}%` }} />
        </div>
        <span className="svy__count">{answered} of {TOTAL_Q} answered</span>
      </div>

      <div className="svy__questions">
        <Card className="svy__q">
          <h2 className="svy__q-title">
            How likely are you to recommend Hearth to a friend?
          </h2>
          <p className="svy__q-note">0 is never, 10 is already told them.</p>
          <div className="svy__nps" role="group" aria-label="Recommendation score">
            {NPS_SCORES.map((n) => {
              const on = svNps === n;
              return (
                <button
                  type="button"
                  key={n}
                  className={`sd-chip oh-chip svy__nps-btn${on ? " svy__nps-btn--on" : ""}`}
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
                  {n}
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
                      className={`sd-chip oh-chip svy__scale-btn${on ? " svy__scale-btn--on" : ""}`}
                      title={o.title}
                      aria-label={`${r.label}: ${o.title}`}
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
          <h2 className="svy__q-title">What would you like us to fix first?</h2>
          <p className="svy__q-note">Pick as many as you like.</p>
          <ChipRow>
            {TAGS.map((t) => (
              <Chip
                key={t}
                active={svTagsOn.includes(t)}
                onClick={() => toggleTag(t)}
              >
                {t}
              </Chip>
            ))}
          </ChipRow>
        </Card>

        <Card className="svy__q">
          <div className="svy__q-head">
            <h2 className="svy__q-title" id="svy-text-label">
              Anything else?
            </h2>
            <span className="svy__optional">Optional</span>
          </div>
          <TextArea
            value={svText}
            onChange={(v) => set({ svText: v })}
            placeholder="The good, the bad, the pedantic — all of it helps."
            maxLength={TEXT_CAP}
            minHeight={110}
            ariaLabel="Anything else?"
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
              You can email me about this
            </label>
            <ButtonPrimary icon="send" onClick={submit}>
              Send feedback
            </ButtonPrimary>
          </div>
        </Card>
      </div>
    </main>
  );
}
