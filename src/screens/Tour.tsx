/*
 * `tour` — Onboarding tour (port spec §6.6, logic §8.28). Max-width 720.
 *
 * Four steps in one card. `tourStep` is clamped with `min(step, 3)` exactly as
 * the comp does, so a stale value can never index past the end of TOUR.
 * Finishing and skipping both reset `tourStep` to 0 and go home, so the tour
 * always restarts from the beginning next time it is opened.
 */

import { ButtonPrimary, ButtonSecondary, Icon, PlaceholderTile } from "../components";
import { dataSource } from "../data/source";
import { useI18n } from "../i18n";
import { useAppStore } from "../state/store";
import "../styles/screen-tour.css";

export default function Tour() {
  const { t, number } = useI18n();
  const STEPS = dataSource.tour();
  const LAST = STEPS.length - 1;

  const tourStep = useAppStore((s) => s.tourStep);
  const set = useAppStore((s) => s.set);
  const go = useAppStore((s) => s.go);
  const goHome = useAppStore((s) => s.goHome);
  const showToast = useAppStore((s) => s.showToast);

  const i = Math.min(tourStep, LAST);
  const step = STEPS[i];
  const canBack = i > 0;
  const isLast = i === LAST;

  const next = () => {
    if (isLast) {
      set({ tourStep: 0 });
      goHome();
      showToast(t("screensB.tour.finished"));
      return;
    }
    go("tour", { tourStep: i + 1 });
  };

  /* Back and the dots move within the card; only Next scrolls to top (§8.28). */
  const back = () => set({ tourStep: i - 1 });

  const skip = () => {
    set({ tourStep: 0 });
    goHome();
    showToast(t("screensB.tour.skipped"), "info");
  };

  return (
    <main className="fx-screen fx-page w-720 tur">
      <div className="tur__card">
        <PlaceholderTile
          tint={step.tint}
          icon={step.icon}
          minHeight={210}
          iconSize={68}
          filename={step.file}
          className="tur__fig"
        >
          <span className="tur__count">
            {t("screensB.tour.progress", {
              n: number(i + 1),
              total: number(STEPS.length),
            })}
          </span>
        </PlaceholderTile>

        <div className="tur__body">
          <p className="tur__eyebrow">{step.eyebrow}</p>
          <h1 className="tur__title">{step.title}</h1>
          <p className="tur__text">{step.body}</p>
          <ul className="tur__points">
            {step.points.map((p) => (
              <li className="tur__point" key={p}>
                <span className="tur__check" aria-hidden="true">
                  <Icon name="check" size={13} />
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="tur__footer">
          <div className="tur__dots">
            {STEPS.map((s, n) => (
              <button
                type="button"
                key={s.file}
                className={`tur__dot${n === i ? " tur__dot--on" : ""}`}
                aria-label={t("screensB.tour.stepAria", {
                  n: number(n + 1),
                  total: number(STEPS.length),
                  title: s.title,
                })}
                aria-current={n === i ? "step" : undefined}
                onClick={() => set({ tourStep: n })}
              />
            ))}
          </div>

          <div className="tur__actions">
            <button type="button" className="fx-nav tur__skip" onClick={skip}>
              {t("screensB.tour.skip")}
            </button>
            {canBack ? (
              <ButtonSecondary icon="arrow-left" onClick={back}>
                {t("screensB.tour.back")}
              </ButtonSecondary>
            ) : null}
            <ButtonPrimary
              icon={isLast ? "check" : "arrow-right"}
              onClick={next}
            >
              {isLast ? t("screensB.tour.finish") : t("screensB.tour.next")}
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </main>
  );
}
