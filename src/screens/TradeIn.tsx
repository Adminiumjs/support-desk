/*
 * `tradein` — Trade-in valuation (port spec §6.14, logic §8.39, data §7.17).
 *
 * Two states: the pack confirmation once `tiSent` is set, otherwise the
 * valuation form with a live quote. The maths is deterministic —
 * `max(3, round(base * cond.f * age.f))`, so doorbell / good / 2–4 years
 * gives £38 and reference TI-70448.
 *
 * Max-width 820.
 */

import {
  ButtonPrimary,
  ButtonSecondary,
  Card,
  Eyebrow,
  Icon,
  ProductPicker,
  Radio,
} from "../components";
import { dataSource } from "../data/source";
import { useI18n } from "../i18n";
import { poundsWhole, tradeInRef } from "../lib/format";
import { top, useAppStore } from "../state/store";
import "../styles/screen-tradein.css";

export default function TradeIn() {
  const { t, number } = useI18n();
  const tiProd = useAppStore((s) => s.tiProd);
  const tiCond = useAppStore((s) => s.tiCond);
  const tiAge = useAppStore((s) => s.tiAge);
  const tiSent = useAppStore((s) => s.tiSent);
  const set = useAppStore((s) => s.set);
  const showToast = useAppStore((s) => s.showToast);

  const conditions = dataSource.tradeInConditions();
  const ages = dataSource.tradeInAges();
  const condition = conditions.find((c) => c.id === tiCond) ?? conditions[0];
  const age = ages.find((a) => a.value === tiAge) ?? ages[0];
  const product = dataSource.product(tiProd);

  const base = dataSource.tradeInBase()[tiProd] ?? 20;
  const quote = Math.max(3, Math.round(base * condition.f * age.f));
  const quoteText = poundsWhole(quote);

  /** `× 0.80` — two decimals, in the reader's own numbering system. */
  const factor = (f: number) =>
    t("screensB.tradein.factor", {
      factor: number(f, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    });

  const breakdown: [string, string][] = [
    [
      t("screensB.tradein.baseValue", { product: product.name }),
      poundsWhole(base),
    ],
    [
      t("screensB.tradein.conditionRow", {
        condition: condition.label.split(" —")[0],
      }),
      factor(condition.f),
    ],
    [t("screensB.tradein.ageRow", { age: age.label }), factor(age.f)],
  ];

  function tiAccept() {
    set({ tiSent: tradeInRef(quote) });
    showToast(t("screensB.tradein.packOrdered"));
    top();
  }

  function tiRecycle() {
    showToast(t("screensB.tradein.recycleToast"));
  }

  if (tiSent) {
    return (
      <main className="fx-screen fx-page w-820 scr-tradein">
        <Card variant="form" className="ti-done">
          <span className="ti-done__tile">
            <Icon name="package-check" size={26} color="var(--pos)" />
          </span>
          <h1 className="ti-done__title">
            {t("screensB.tradein.doneTitle")}
          </h1>
          <p className="ti-done__body">{t("screensB.tradein.doneBody")}</p>
          <div className="ti-done__chips">
            <span className="ti-chip">{tiSent}</span>
            <span className="ti-chip">
              {t("screensB.tradein.creditChip", { amount: quoteText })}
            </span>
          </div>
          <ButtonSecondary
            icon="rotate-ccw"
            iconSize={16}
            className="ti-done__again"
            onClick={() => set({ tiSent: null })}
          >
            {t("screensB.tradein.valueAnother")}
          </ButtonSecondary>
        </Card>
      </main>
    );
  }

  return (
    <main className="fx-screen fx-page w-820 scr-tradein">
      <h1 className="scr-tradein__h1">{t("screensB.tradein.h1")}</h1>
      <p className="scr-tradein__lede">{t("screensB.tradein.lede")}</p>

      <Card variant="form" className="ti-form">
        <div>
          <h2 className="ti-label">{t("screensB.tradein.whichDevice")}</h2>
          <ProductPicker
            label={t("screensB.tradein.whichDevice")}
            products={dataSource.products()}
            value={tiProd}
            onChange={(id) => set({ tiProd: id })}
          />
        </div>

        <div>
          <h2 className="ti-label">{t("screensB.tradein.whatCondition")}</h2>
          <div className="ti-rows">
            {conditions.map((c) => (
              <Radio
                key={c.id}
                className="ti-cond"
                name="tradein-condition"
                selected={tiCond === c.id}
                onSelect={() => set({ tiCond: c.id })}
                note={c.note}
              >
                {c.label}
              </Radio>
            ))}
          </div>
        </div>

        <div>
          <label className="ti-label" htmlFor="ti-age">
            {t("screensB.tradein.howOld")}
          </label>
          <select
            id="ti-age"
            className="sd-select fx-fld"
            value={tiAge}
            onChange={(e) => set({ tiAge: e.target.value })}
          >
            {ages.map((a) => (
              <option key={a.value} value={a.value}>
                {a.label}
              </option>
            ))}
          </select>
        </div>
      </Card>

      <div className="ti-quote">
        <Eyebrow>{t("screensB.tradein.yourQuote")}</Eyebrow>
        <p className="ti-quote__value">{quoteText}</p>
        <p className="ti-quote__for">
          {t("screensB.tradein.creditFor", { product: product.name })}
        </p>

        <div className="ti-break">
          {breakdown.map(([label, value]) => (
            <div className="ti-break__row" key={label}>
              <span>{label}</span>
              <span className="ti-break__value">{value}</span>
            </div>
          ))}
        </div>

        <p className="ti-quote__note">{t("screensB.tradein.quoteNote")}</p>

        <div className="ti-quote__actions">
          <ButtonPrimary icon="package" iconSize={16} onClick={tiAccept}>
            {t("screensB.tradein.sendPack")}
          </ButtonPrimary>
          <ButtonSecondary icon="recycle" iconSize={16} onClick={tiRecycle}>
            {t("screensB.tradein.justRecycle")}
          </ButtonSecondary>
        </div>
      </div>
    </main>
  );
}
