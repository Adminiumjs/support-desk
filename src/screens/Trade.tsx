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
import { useT } from "../i18n";
import { useAppStore } from "../state/store";
import "../styles/screen-trade.css";

export default function Trade() {
  const t = useT();
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
          <h1 className="td-done__title">{t("screensB.trade.doneTitle")}</h1>
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
              {t("screensB.trade.previewPortal")}
            </ButtonPrimary>
            <ButtonSecondary
              icon="rotate-ccw"
              iconSize={16}
              onClick={tradeReset}
            >
              {t("screensB.trade.startAnother")}
            </ButtonSecondary>
          </div>
        </div>
      </main>
    );
  }

  /* -------------------------------------------------------- B. form */

  /*
   * The closing callout wraps a link mid-sentence. It is authored as one
   * message with a `{link}` marker — no params are passed, so the marker
   * survives lookup and is split on here, leaving word order to the
   * translator.
   */
  const [footBefore, footAfter] = t("screensB.trade.foot").split("{link}");

  return (
    <main className={`fx-screen fx-page ${column} scr-trade`}>
      <p className="td-eyebrow">{t("screensB.trade.eyebrow")}</p>
      <h1 className="td-h1">{t("screensB.trade.h1")}</h1>
      <p className="td-lede">{t("screensB.trade.lede")}</p>

      <div className="td-perks">
        {perks.map((p) => (
          <div className="td-perk" key={p.title}>
            <AccentIconTile icon={p.icon} size={42} radius={12} iconSize={21} />
            <span className="td-perk__title">{p.title}</span>
            <span className="td-perk__text">{p.text}</span>
          </div>
        ))}
      </div>

      <h2 className="td-h2">{t("screensB.trade.pickTier")}</h2>
      <div
        className="td-tiers"
        role="radiogroup"
        aria-label={t("screensB.trade.pickTier")}
      >
        {tiers.map((tier) => {
          const on = tdTier === tier.id;
          return (
            <button
              key={tier.id}
              type="button"
              role="radio"
              aria-checked={on}
              className={`td-tier fx-chip${on ? " td-tier--on" : ""}`}
              onClick={() => set({ tdTier: tier.id })}
            >
              <span className="td-tier__head">
                <span className="td-tier__name">{tier.name}</span>
                <span
                  className={`sd-radio${on ? " sd-radio--on" : ""}`}
                  aria-hidden="true"
                />
              </span>
              <span className="td-tier__discount">{tier.discount}</span>
              <span className="td-tier__req">{tier.req}</span>
            </button>
          );
        })}
      </div>

      <Card variant="form" className="td-card">
        <div>
          <Eyebrow>{t("screensB.trade.businessDetails")}</Eyebrow>
          <div className="td-grid">
            <Field label={t("screensB.trade.tradingName")} htmlFor="td-name">
              <TextInput
                id="td-name"
                value={tdName}
                placeholder="Halloway Electrical"
                onChange={(v) => set({ tdName: v })}
              />
            </Field>

            <Field label={t("screensB.trade.businessType")} htmlFor="td-type">
              <SelectField
                id="td-type"
                value={tdType}
                placeholder={t("screensB.trade.chooseOne")}
                options={types}
                onChange={(v) => set({ tdType: v })}
              />
            </Field>

            <Field
              label={t("screensB.trade.companyNumber")}
              htmlFor="td-co"
              aside={
                <span className="td-optional">
                  {t("screensB.trade.optional")}
                </span>
              }
            >
              <TextInput
                id="td-co"
                className="sd-mono"
                value={tdCo}
                placeholder="09241886"
                onChange={setTradeCompany}
              />
            </Field>

            <Field label={t("screensB.trade.vatNumber")} htmlFor="td-vat">
              <TextInput
                id="td-vat"
                className="sd-mono"
                value={tdVat}
                placeholder="GB 412 9930 77"
                onChange={setTradeVat}
              />
              <p className="td-hint">{t("screensB.trade.vatHint")}</p>
            </Field>
          </div>
        </div>

        <div>
          <Eyebrow>{t("screensB.trade.whoWeDealWith")}</Eyebrow>
          <div className="td-grid">
            <Field label={t("screensB.trade.contactName")} htmlFor="td-contact">
              <TextInput
                id="td-contact"
                value={tdContact}
                placeholder="Dan Halloway"
                onChange={(v) => set({ tdContact: v })}
              />
            </Field>

            <Field label={t("screensB.trade.workEmail")} htmlFor="td-email">
              <TextInput
                id="td-email"
                type="email"
                value={tdEmail}
                placeholder="dan@halloway.example"
                onChange={(v) => set({ tdEmail: v })}
              />
            </Field>

            <Field label={t("screensB.trade.phone")} htmlFor="td-phone">
              <TextInput
                id="td-phone"
                className="sd-mono"
                value={tdPhone}
                placeholder="0117 496 0110"
                onChange={(v) => set({ tdPhone: v })}
              />
            </Field>

            <Field
              label={t("screensB.trade.installsAMonth")}
              htmlFor="td-volume"
            >
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
          label={t("screensB.trade.whatDoYouFit")}
          aside={
            <span className="td-optional">{t("screensB.trade.pickAny")}</span>
          }
        >
          <div
            className="td-skills"
            role="group"
            aria-label={t("screensB.trade.whatDoYouFit")}
          >
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
          label={t("screensB.trade.anythingElse")}
          htmlFor="td-note"
          aside={
            <span className="td-optional">{t("screensB.trade.optional")}</span>
          }
        >
          <TextArea
            id="td-note"
            value={tdNote}
            minHeight={100}
            placeholder={t("screensB.trade.notePlaceholder")}
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
          {t("screensB.trade.apply")}
        </ButtonPrimary>
      </Card>

      <Callout tone="info" icon="info" className="td-foot">
        {footBefore}
        <button
          type="button"
          className="td-link fx-nav"
          onClick={() => go("partner")}
        >
          {t("screensB.trade.footLink")}
        </button>
        {footAfter}
      </Callout>
    </main>
  );
}
