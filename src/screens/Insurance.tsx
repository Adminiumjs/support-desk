/*
 * `insurance` — Insurance claims / evidence packs (delta spec B §10, logic C §3.3).
 *
 * Explains the evidence-pack product, lists existing packs with a
 * ready/building state, and offers a request form. Submitting does NOT append
 * a claim — it only toasts and raises the success banner (spec B §10.4).
 *
 * The claim list has no empty branch by design: when `inOut` hides everything
 * the whole section simply vanishes.
 *
 * "Email to insurer" jumps to `share` — that cross-view hop lives in the
 * store's `insuranceShare()`.
 *
 * Max-width 820 (`columnClass("insurance")` — absent from CRUMB_W, so the
 * 820 default applies).
 */

import {
  AccentIconTile,
  ButtonPrimary,
  ButtonSecondary,
  Callout,
  Card,
  Eyebrow,
  Field,
  Icon,
  SelectField,
  SoftPill,
  TextArea,
  TextInput,
  columnClass,
} from "../components";
import { dataSource } from "../data/source";
import { useT } from "../i18n";
import { longDate } from "../lib/format";
import {
  insuranceStateMeta,
  insurancePrimaryIcon,
  insurancePrimaryLabel,
} from "../lib/derive";
import { useAppStore } from "../state/store";
import "../styles/screen-insurance.css";

/*
 * The 90-day retention strip. `IN_RETENTION_WARNING` exists in demo.ts but is
 * not exposed on the DataSource seam, and screens must not import demo.ts —
 * so the window and its cut-off date are pinned here and the sentence around
 * them comes from the bundle.
 */
const RETENTION_DAYS = 90;
const RETENTION_CUTOFF = new Date(2026, 3, 28);

export default function Insurance() {
  const t = useT();
  const inKind = useAppStore((s) => s.inKind);
  const inDate = useAppStore((s) => s.inDate);
  const inWindow = useAppStore((s) => s.inWindow);
  const inRefInput = useAppStore((s) => s.inRefInput);
  const inNote = useAppStore((s) => s.inNote);
  const inOut = useAppStore((s) => s.inOut);

  const set = useAppStore((s) => s.set);
  const setInsuranceNote = useAppStore((s) => s.setInsuranceNote);
  const insurancePrimary = useAppStore((s) => s.insurancePrimary);
  const insuranceShare = useAppStore((s) => s.insuranceShare);
  const insuranceSubmit = useAppStore((s) => s.insuranceSubmit);

  const claims = dataSource
    .insuranceClaims()
    .filter((c) => !inOut.includes(c.id));
  const kinds = dataSource.insuranceKinds();
  const windows = dataSource.insuranceWindows();

  const windowLabel =
    windows.find((w) => w.value === inWindow)?.label ?? windows[0].label;

  return (
    <main className={`fx-screen fx-page ${columnClass("insurance")} scr-insurance`}>
      <h1 className="ins-h1">{t("screensA.insurance.h1")}</h1>
      <p className="ins-lede">{t("screensA.insurance.lede")}</p>

      <div className="ins-explainers">
        <div className="ins-explainer">
          <AccentIconTile
            icon="file-archive"
            size={42}
            radius={12}
            iconSize={21}
          />
          <span className="ins-explainer__title">
            {t("screensA.insurance.pack")}
          </span>
          <span className="ins-explainer__text">
            {t("screensA.insurance.packText")}
          </span>
        </div>
        <div className="ins-explainer">
          <AccentIconTile
            icon="shield-check"
            size={42}
            radius={12}
            iconSize={21}
          />
          <span className="ins-explainer__title">
            {t("screensA.insurance.privacy")}
          </span>
          <span className="ins-explainer__text">
            {t("screensA.insurance.privacyText")}
          </span>
        </div>
      </div>

      {claims.length ? (
        <>
          <Eyebrow>{t("screensA.insurance.yourClaims")}</Eyebrow>
          <div className="ins-claims">
            {claims.map((c) => {
              const meta = insuranceStateMeta(c.state);
              const ready = c.state === "ready";
              return (
                <Card key={c.id} className="ins-claim">
                  <div className="ins-claim__top">
                    <AccentIconTile
                      icon={ready ? "file-archive" : "loader"}
                      size={44}
                      radius={13}
                      iconSize={20}
                    />
                    <div className="ins-claim__body">
                      <div className="ins-claim__head">
                        <span className="ins-claim__title">{c.title}</span>
                        <SoftPill fg={meta.fg} soft={meta.soft} icon={meta.icon}>
                          {meta.label}
                        </SoftPill>
                      </div>
                      <p className="ins-claim__text">{c.text}</p>
                      <p className="ins-claim__meta">{c.meta}</p>
                    </div>
                  </div>
                  <div className="ins-claim__actions">
                    {ready ? (
                      <ButtonPrimary
                        icon={insurancePrimaryIcon(c.state)}
                        iconSize={14}
                        className="ins-primary"
                        onClick={() => insurancePrimary(c)}
                      >
                        {insurancePrimaryLabel(c.state)}
                      </ButtonPrimary>
                    ) : (
                      <ButtonSecondary
                        icon={insurancePrimaryIcon(c.state)}
                        iconSize={14}
                        className="ins-primary"
                        onClick={() => insurancePrimary(c)}
                      >
                        {insurancePrimaryLabel(c.state)}
                      </ButtonSecondary>
                    )}
                    <ButtonSecondary
                      icon="send"
                      iconSize={14}
                      className="ins-secondary"
                      onClick={insuranceShare}
                    >
                      {t("screensA.insurance.emailInsurer")}
                    </ButtonSecondary>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      ) : null}

      <Card variant="form" className="ins-form">
        <h2 className="ins-form__title">
          {t("screensA.insurance.requestTitle")}
        </h2>

        <Field label={t("screensA.insurance.what")}>
          <div
            className="ins-kinds"
            role="radiogroup"
            aria-label={t("screensA.insurance.what")}
          >
            {kinds.map(([id, label, icon]) => {
              const on = inKind === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  className={`ins-kind fx-chip${on ? " ins-kind--on" : ""}`}
                  onClick={() => set({ inKind: id })}
                >
                  <Icon name={icon} size={19} />
                  <span className="ins-kind__label">{label}</span>
                </button>
              );
            })}
          </div>
        </Field>

        <div className="ins-when">
          <Field label={t("screensA.insurance.date")} htmlFor="in-date">
            <input
              id="in-date"
              type="date"
              className="sd-input fx-fld ins-date"
              value={inDate}
              onChange={(e) => set({ inDate: e.target.value })}
            />
          </Field>

          <Field label={t("screensA.insurance.window")} htmlFor="in-window">
            <SelectField
              id="in-window"
              className="ins-select"
              value={windowLabel}
              options={windows.map((w) => w.label)}
              onChange={(label) =>
                set({
                  inWindow:
                    windows.find((w) => w.label === label)?.value ??
                    windows[0].value,
                })
              }
            />
          </Field>
        </div>

        <Field
          label={t("screensA.insurance.ref")}
          htmlFor="in-ref"
          aside={
            <span className="ins-optional">
              {t("screensA.insurance.optional")}
            </span>
          }
        >
          <TextInput
            id="in-ref"
            className="ins-input"
            value={inRefInput}
            placeholder={t("screensA.insurance.refPlaceholder")}
            onChange={(v) => set({ inRefInput: v })}
          />
        </Field>

        <Field label={t("screensA.insurance.note")} htmlFor="in-note">
          <TextArea
            id="in-note"
            value={inNote}
            minHeight={110}
            placeholder={t("screensA.insurance.notePlaceholder")}
            onChange={setInsuranceNote}
          />
        </Field>

        <Callout tone="warn" icon="alert-triangle" className="ins-retention">
          {t("screensA.insurance.retention", {
            days: RETENTION_DAYS,
            date: longDate(RETENTION_CUTOFF),
          })}
        </Callout>

        <ButtonPrimary
          icon="file-archive"
          iconSize={17}
          className="ins-submit"
          onClick={insuranceSubmit}
        >
          {t("screensA.insurance.submit")}
        </ButtonPrimary>
      </Card>
    </main>
  );
}
