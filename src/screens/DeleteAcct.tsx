/*
 * `deleteacct` — Account deletion (delta B §8). Max-width 760.
 *
 * The comp flag is `isDelete`, not `isDeleteacct`. Entry is the Security
 * screen's "Start deletion" button, which routes through `gotoDelete()` and
 * resets `dlStep` to 1.
 *
 * Two branches: the scheduled card once `dlScheduled` is set, otherwise the
 * three-step wizard. The wizard is deliberately danger-coloured rather than
 * accent-coloured, and the Next button is never disabled — on step 3 it warns
 * instead of blocking (`deleteNext()` in the store).
 */

import {
  ButtonPrimary,
  ButtonSecondary,
  Callout,
  Card,
  Checkbox,
  Field,
  Icon,
  ListCard,
  FactRow,
  SelectField,
  SoftPill,
  StepIndicator,
} from "../components";
import { dataSource } from "../data/source";
import { DL_SCHEDULED_TEXT } from "../data/demo";
import { useT } from "../i18n";
import { useAppStore } from "../state/store";
import "../styles/screen-deleteacct.css";

/** The literal the store compares against — a machine token, never translated. */
const CONFIRM_WORD = "DELETE";

export default function DeleteAcct() {
  const t = useT();
  const STEP_LABELS = [
    t("screensA.delete.step1"),
    t("screensA.delete.step2"),
    t("screensA.delete.step3"),
  ];
  const dlStep = useAppStore((s) => s.dlStep);
  const dlReason = useAppStore((s) => s.dlReason);
  const dlOn = useAppStore((s) => s.dlOn);
  const dlPhrase = useAppStore((s) => s.dlPhrase);
  const dlScheduled = useAppStore((s) => s.dlScheduled);
  const set = useAppStore((s) => s.set);
  const go = useAppStore((s) => s.go);
  const goHome = useAppStore((s) => s.goHome);
  const openChat = useAppStore((s) => s.openChat);
  const toggleDeleteCheck = useAppStore((s) => s.toggleDeleteCheck);
  const deleteBack = useAppStore((s) => s.deleteBack);
  const deleteNext = useAppStore((s) => s.deleteNext);
  const deleteCancel = useAppStore((s) => s.deleteCancel);

  const items = dataSource.deleteItems();
  const reasons = dataSource.deleteReasons();
  const checks = dataSource.deleteChecks();
  const alts = dataSource.deleteAlternatives();

  if (dlScheduled) {
    return (
      <main className="fx-screen fx-page w-760 scr-delete">
        <div className="dl-done">
          <span className="dl-done__ico">
            <Icon name="clock" size={26} color="var(--danger)" />
          </span>
          <h1 className="dl-done__title">
            {t("screensA.delete.scheduledTitle")}
          </h1>
          <p className="dl-done__text">{DL_SCHEDULED_TEXT}</p>
          <div className="dl-done__chips">
            <span className="dl-chip">{dlScheduled.ref}</span>
            <span className="dl-chip dl-chip--danger">{dlScheduled.date}</span>
          </div>
          <div className="dl-done__actions">
            <ButtonPrimary
              icon="rotate-ccw"
              iconSize={16}
              className="dl-done__cta"
              onClick={deleteCancel}
            >
              {t("screensA.delete.keep")}
            </ButtonPrimary>
            <ButtonSecondary
              icon="download"
              iconSize={15}
              onClick={() => go("security")}
            >
              {t("screensA.delete.downloadFirst")}
            </ButtonSecondary>
          </div>
        </div>
      </main>
    );
  }

  /* Aligned with `DL_ALTS`: pause the plan, turn off cloud clips, talk to us. */
  const altActions: (() => void)[] = [
    () => go("plans"),
    () => go("security"),
    () => openChat(),
  ];

  const phraseTyped = dlPhrase.trim().toUpperCase();
  const phraseBad = dlPhrase.length > 0 && phraseTyped !== CONFIRM_WORD;
  const ok = dlOn.length >= 3 && phraseTyped === CONFIRM_WORD;

  /* One `{word}` slot, so a single split keeps the translator's word order
     around the highlighted literal. */
  const confirmText = t("screensA.delete.textConfirm").split("{word}");

  return (
    <main className="fx-screen fx-page w-760 scr-delete">
      <h1 className="dl-h1">{t("screensA.delete.h1")}</h1>
      <p className="dl-lede">{t("screensA.delete.lede")}</p>

      <StepIndicator
        labels={STEP_LABELS}
        current={dlStep}
        tone="danger"
        className="dl-steps"
      />

      <Card variant="form" className="dl-card">
        {dlStep === 1 ? (
          <div className="dl-panel">
            <h2 className="dl-h2">{t("screensA.delete.h2Things")}</h2>
            <p className="dl-text">{t("screensA.delete.textThings")}</p>
            <ListCard className="dl-inventory">
              {items.map((it, i) => (
                <FactRow
                  key={it.label}
                  icon={it.icon}
                  label={it.label}
                  bad={it.bad}
                  tone="danger"
                  last={i === items.length - 1}
                  pill={
                    <SoftPill
                      fg={it.bad ? "--danger" : "--pos"}
                      soft={it.bad ? "--danger-soft" : "--pos-soft"}
                    >
                      {it.fate}
                    </SoftPill>
                  }
                />
              ))}
            </ListCard>
            <Callout tone="info" icon="download">
              {t("screensA.delete.calloutCopy")}
            </Callout>
          </div>
        ) : null}

        {dlStep === 2 ? (
          <div className="dl-panel">
            <h2 className="dl-h2">{t("screensA.delete.h2Before")}</h2>
            <p className="dl-text">{t("screensA.delete.textBefore")}</p>
            <div className="dl-alts">
              {alts.map((a, i) => (
                <div className="dl-alt" key={a.title}>
                  <span className="dl-alt__ico">
                    <Icon name={a.icon} size={18} />
                  </span>
                  <div className="dl-alt__body">
                    <p className="dl-alt__title">{a.title}</p>
                    <p className="dl-alt__note">{a.text}</p>
                  </div>
                  <ButtonSecondary className="dl-alt__cta" onClick={altActions[i]}>
                    {a.cta}
                  </ButtonSecondary>
                </div>
              ))}
            </div>
            <Field
              label={t("screensA.delete.reasonLabel")}
              htmlFor="dl-reason"
              aside={
                <span className="dl-optional">
                  {t("screensA.delete.reasonOptional")}
                </span>
              }
            >
              <SelectField
                id="dl-reason"
                value={dlReason}
                options={reasons}
                placeholder={t("screensA.delete.reasonPlaceholder")}
                onChange={(v) => set({ dlReason: v })}
                className="dl-select"
              />
            </Field>
          </div>
        ) : null}

        {dlStep === 3 ? (
          <div className="dl-panel">
            <h2 className="dl-h2">{t("screensA.delete.h2Confirm")}</h2>
            <p className="dl-text">
              {confirmText[0]}
              <span className="dl-word">{CONFIRM_WORD}</span>
              {confirmText[1]}
            </p>
            <div className="dl-checks">
              {checks.map((c) => (
                <Checkbox
                  key={c.id}
                  checked={dlOn.includes(c.id)}
                  onChange={() => toggleDeleteCheck(c.id)}
                >
                  {c.label}
                </Checkbox>
              ))}
            </div>
            <div>
              <label className="dl-label" htmlFor="dl-phrase">
                {t("screensA.delete.phraseLabel")}
              </label>
              <input
                id="dl-phrase"
                className="fx-fld dl-phrase"
                value={dlPhrase}
                placeholder={CONFIRM_WORD}
                onChange={(e) => set({ dlPhrase: e.target.value })}
                style={
                  phraseBad ? { borderColor: "var(--danger)" } : undefined
                }
              />
            </div>
            <Callout tone="danger">
              {t("screensA.delete.calloutDanger")}
            </Callout>
          </div>
        ) : null}

        <div className="dl-footer">
          {dlStep > 1 ? (
            <ButtonSecondary icon="arrow-left" iconSize={15} onClick={deleteBack}>
              {t("screensA.delete.back")}
            </ButtonSecondary>
          ) : null}
          <button
            type="button"
            className={`fx-chip dl-next${
              dlStep === 3 ? (ok ? " dl-next--danger" : " dl-next--off") : ""
            }`}
            onClick={deleteNext}
          >
            {dlStep === 3
              ? t("screensA.delete.schedule")
              : t("screensA.delete.continue")}
            <Icon name={dlStep === 3 ? "trash-2" : "arrow-right"} size={15} />
          </button>
          <button type="button" className="fx-nav dl-cancel" onClick={goHome}>
            {t("screensA.delete.cancel")}
          </button>
        </div>
      </Card>
    </main>
  );
}
