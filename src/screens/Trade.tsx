/*
 * `trade` — Trade account signup (delta spec B §7, logic C §3.3).
 *
 * B2B: installers, electricians and letting agents apply for a discount tier
 * and 30-day credit terms. This is NOT `tradein` (the B2C device valuation) —
 * they share no state, no handler and no dataset. See delta spec B §0b.
 *
 * Two states: the confirmation card once `tdDone` holds an application,
 * otherwise the form. Validation is toast-only and lives in the store
 * (`tradeSubmit`), which also mints the deterministic `TA-` reference.
 *
 * Max-width 900 (`columnClass("trade")`).
 */

import {
  AccentIconTile,
  ButtonPrimary,
  ButtonSecondary,
  Callout,
  Card,
  Chip,
  Eyebrow,
  Field,
  Icon,
  SelectField,
  TextArea,
  TextInput,
  columnClass,
} from "../components";
import { dataSource } from "../data/source";
import { useAppStore } from "../state/store";
import "../styles/screen-trade.css";

export default function Trade() {
  const tdTier = useAppStore((s) => s.tdTier);
  const tdName = useAppStore((s) => s.tdName);
  const tdType = useAppStore((s) => s.tdType);
  const tdCo = useAppStore((s) => s.tdCo);
  const tdVat = useAppStore((s) => s.tdVat);
  const tdContact = useAppStore((s) => s.tdContact);
  const tdEmail = useAppStore((s) => s.tdEmail);
  const tdPhone = useAppStore((s) => s.tdPhone);
  const tdVolume = useAppStore((s) => s.tdVolume);
  const tdSkillsOn = useAppStore((s) => s.tdSkillsOn);
  const tdNote = useAppStore((s) => s.tdNote);
  const tdOn = useAppStore((s) => s.tdOn);
  const tdDone = useAppStore((s) => s.tdDone);

  const set = useAppStore((s) => s.set);
  const go = useAppStore((s) => s.go);
  const setTradeCompany = useAppStore((s) => s.setTradeCompany);
  const setTradeVat = useAppStore((s) => s.setTradeVat);
  const setTradeNote = useAppStore((s) => s.setTradeNote);
  const toggleTradeSkill = useAppStore((s) => s.toggleTradeSkill);
  const toggleTradeCheck = useAppStore((s) => s.toggleTradeCheck);
  const tradeSubmit = useAppStore((s) => s.tradeSubmit);
  const tradeReset = useAppStore((s) => s.tradeReset);

  const perks = dataSource.tradePerks();
  const tiers = dataSource.tradeTiers();
  const types = dataSource.tradeTypes();
  const volumes = dataSource.tradeVolumes();
  const skills = dataSource.tradeSkills();
  const checks = dataSource.tradeChecks();

  const column = columnClass("trade");

  /* ------------------------------------------------- A. confirmation */

  if (tdDone) {
    return (
      <main className={`fx-screen fx-page ${column} scr-trade`}>
        <div className="td-done">
          <span className="td-done__tile">
            <Icon name="hard-hat" size={26} />
          </span>
          <h1 className="td-done__title">Application received</h1>
          <p className="td-done__body">{tdDone.text}</p>
          <div className="td-done__chips">
            <span className="td-chip">{tdDone.ref}</span>
            <span className="td-chip">{tdDone.tier}</span>
          </div>
          <div className="td-done__actions">
            <ButtonPrimary
              icon="layout-dashboard"
              iconSize={16}
              onClick={() => go("partner")}
            >
              Preview the partner portal
            </ButtonPrimary>
            <ButtonSecondary
              icon="rotate-ccw"
              iconSize={16}
              onClick={tradeReset}
            >
              Start another application
            </ButtonSecondary>
          </div>
        </div>
      </main>
    );
  }

  /* -------------------------------------------------------- B. form */

  return (
    <main className={`fx-screen fx-page ${column} scr-trade`}>
      <p className="td-eyebrow">FOR INSTALLERS, ELECTRICIANS AND LETTING AGENTS</p>
      <h1 className="td-h1">Open a trade account</h1>
      <p className="td-lede">
        Trade pricing, 30-day terms and a named contact who answers the phone.
        Approval takes two working days and there's nothing to pay to join.
      </p>

      <div className="td-perks">
        {perks.map((p) => (
          <div className="td-perk" key={p.title}>
            <AccentIconTile icon={p.icon} size={42} radius={12} iconSize={21} />
            <span className="td-perk__title">{p.title}</span>
            <span className="td-perk__text">{p.text}</span>
          </div>
        ))}
      </div>

      <h2 className="td-h2">Pick a tier</h2>
      <div className="td-tiers" role="radiogroup" aria-label="Pick a tier">
        {tiers.map((t) => {
          const on = tdTier === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={on}
              className={`td-tier fx-chip${on ? " td-tier--on" : ""}`}
              onClick={() => set({ tdTier: t.id })}
            >
              <span className="td-tier__head">
                <span className="td-tier__name">{t.name}</span>
                <span
                  className={`sd-radio${on ? " sd-radio--on" : ""}`}
                  aria-hidden="true"
                />
              </span>
              <span className="td-tier__discount">{t.discount}</span>
              <span className="td-tier__req">{t.req}</span>
            </button>
          );
        })}
      </div>

      <Card variant="form" className="td-card">
        <div>
          <Eyebrow>Business details</Eyebrow>
          <div className="td-grid">
            <Field label="Trading name" htmlFor="td-name">
              <TextInput
                id="td-name"
                value={tdName}
                placeholder="Halloway Electrical"
                onChange={(v) => set({ tdName: v })}
              />
            </Field>

            <Field label="Business type" htmlFor="td-type">
              <SelectField
                id="td-type"
                value={tdType}
                placeholder="Choose one…"
                options={types}
                onChange={(v) => set({ tdType: v })}
              />
            </Field>

            <Field
              label="Company number"
              htmlFor="td-co"
              aside={<span className="td-optional">Optional</span>}
            >
              <TextInput
                id="td-co"
                className="sd-mono"
                value={tdCo}
                placeholder="09241886"
                onChange={setTradeCompany}
              />
            </Field>

            <Field label="VAT number" htmlFor="td-vat">
              <TextInput
                id="td-vat"
                className="sd-mono"
                value={tdVat}
                placeholder="GB 412 9930 77"
                onChange={setTradeVat}
              />
              <p className="td-hint">
                Not VAT registered? Leave it blank — we’ll set the account up
                gross.
              </p>
            </Field>
          </div>
        </div>

        <div>
          <Eyebrow>Who we'll deal with</Eyebrow>
          <div className="td-grid">
            <Field label="Contact name" htmlFor="td-contact">
              <TextInput
                id="td-contact"
                value={tdContact}
                placeholder="Dan Halloway"
                onChange={(v) => set({ tdContact: v })}
              />
            </Field>

            <Field label="Work email" htmlFor="td-email">
              <TextInput
                id="td-email"
                type="email"
                value={tdEmail}
                placeholder="dan@halloway.example"
                onChange={(v) => set({ tdEmail: v })}
              />
            </Field>

            <Field label="Phone" htmlFor="td-phone">
              <TextInput
                id="td-phone"
                className="sd-mono"
                value={tdPhone}
                placeholder="0117 496 0110"
                onChange={(v) => set({ tdPhone: v })}
              />
            </Field>

            <Field label="Installs a month" htmlFor="td-volume">
              <SelectField
                id="td-volume"
                value={
                  volumes.find((v) => v.value === tdVolume)?.label ??
                  volumes[0].label
                }
                options={volumes.map((v) => v.label)}
                onChange={(label) =>
                  set({
                    tdVolume:
                      volumes.find((v) => v.label === label)?.value ??
                      volumes[0].value,
                  })
                }
              />
            </Field>
          </div>
        </div>

        <Field
          label="What do you fit?"
          aside={<span className="td-optional">Pick any</span>}
        >
          <div className="td-skills" role="group" aria-label="What do you fit?">
            {skills.map(([label, icon]) => (
              <Chip
                key={label}
                icon={icon}
                active={tdSkillsOn.includes(label)}
                onClick={() => toggleTradeSkill(label)}
              >
                {label}
              </Chip>
            ))}
          </div>
        </Field>

        <Field
          label="Anything else we should know?"
          htmlFor="td-note"
          aside={<span className="td-optional">Optional</span>}
        >
          <TextArea
            id="td-note"
            value={tdNote}
            minHeight={100}
            placeholder="Accreditations, the areas you cover, or the volume you expect."
            onChange={setTradeNote}
          />
        </Field>

        <div className="td-checks">
          {checks.map((c) => {
            const on = tdOn.includes(c.id);
            return (
              <button
                key={c.id}
                type="button"
                role="checkbox"
                aria-checked={on}
                className="td-check fx-gi"
                onClick={() => toggleTradeCheck(c.id)}
              >
                <span
                  className={`sd-box${on ? " sd-box--on" : ""}`}
                  aria-hidden="true"
                >
                  {on ? <Icon name="check" size={13} /> : null}
                </span>
                <span className="td-check__label">{c.label}</span>
              </button>
            );
          })}
        </div>

        <ButtonPrimary
          icon="send"
          iconSize={17}
          className="td-submit"
          onClick={tradeSubmit}
        >
          Apply for a trade account
        </ButtonPrimary>
      </Card>

      <Callout tone="info" icon="info" className="td-foot">
        Already approved? The{" "}
        <button
          type="button"
          className="td-link fx-nav"
          onClick={() => go("partner")}
        >
          partner portal
        </button>{" "}
        has your job queue, payouts and training. Trade pricing shows
        automatically once you're signed in.
      </Callout>
    </main>
  );
}
