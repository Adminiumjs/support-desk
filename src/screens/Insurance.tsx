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
import {
  INSURANCE_STATE_META,
  insurancePrimaryIcon,
  insurancePrimaryLabel,
} from "../lib/derive";
import { useAppStore } from "../state/store";
import "../styles/screen-insurance.css";

/*
 * The 90-day retention strip. `IN_RETENTION_WARNING` exists in demo.ts but is
 * not exposed on the DataSource seam, and screens must not import demo.ts —
 * so the copy is pinned here, verbatim.
 */
const IN_RETENTION_WARNING =
  "Your plan keeps clips for 90 days, so anything before 28 April 2026 has already gone. Ask us as early as you can — once a clip expires we can't recover it.";

export default function Insurance() {
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
      <h1 className="ins-h1">Insurance claims</h1>
      <p className="ins-lede">
        Insurers usually want the footage, the timestamps and proof the device
        was working. We can put all three in one pack — free, and normally ready
        within an hour.
      </p>

      <div className="ins-explainers">
        <div className="ins-explainer">
          <AccentIconTile
            icon="file-archive"
            size={42}
            radius={12}
            iconSize={21}
          />
          <span className="ins-explainer__title">
            What's in an evidence pack
          </span>
          <span className="ins-explainer__text">
            Original clips, a signed timestamp log, device status history and a
            PDF summary an adjuster can read.
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
            We never talk to your insurer
          </span>
          <span className="ins-explainer__text">
            The pack goes to you. Nothing is shared with anyone unless you send
            it, or a court orders it.
          </span>
        </div>
      </div>

      {claims.length ? (
        <>
          <Eyebrow>Your claims</Eyebrow>
          <div className="ins-claims">
            {claims.map((c) => {
              const meta = INSURANCE_STATE_META[c.state];
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
                      Email to insurer
                    </ButtonSecondary>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      ) : null}

      <Card variant="form" className="ins-form">
        <h2 className="ins-form__title">Request an evidence pack</h2>

        <Field label="What happened?">
          <div className="ins-kinds" role="radiogroup" aria-label="What happened?">
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
          <Field label="Date of the incident" htmlFor="in-date">
            <input
              id="in-date"
              type="date"
              className="sd-input fx-fld ins-date"
              value={inDate}
              onChange={(e) => set({ inDate: e.target.value })}
            />
          </Field>

          <Field label="Time window to cover" htmlFor="in-window">
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
          label="Insurer or reference"
          htmlFor="in-ref"
          aside={<span className="ins-optional">Optional</span>}
        >
          <TextInput
            id="in-ref"
            className="ins-input"
            value={inRefInput}
            placeholder="e.g. Aviva · claim 4471882"
            onChange={(v) => set({ inRefInput: v })}
          />
        </Field>

        <Field label="Anything the adjuster should know?" htmlFor="in-note">
          <TextArea
            id="in-note"
            value={inNote}
            minHeight={110}
            placeholder="What was damaged or taken, and roughly when you noticed."
            onChange={setInsuranceNote}
          />
        </Field>

        <Callout tone="warn" icon="alert-triangle" className="ins-retention">
          {IN_RETENTION_WARNING}
        </Callout>

        <ButtonPrimary
          icon="file-archive"
          iconSize={17}
          className="ins-submit"
          onClick={insuranceSubmit}
        >
          Build my evidence pack
        </ButtonPrimary>
      </Card>
    </main>
  );
}
