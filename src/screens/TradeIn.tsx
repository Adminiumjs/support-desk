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
import { poundsWhole, tradeInRef } from "../lib/format";
import { top, useAppStore } from "../state/store";
import "../styles/screen-tradein.css";

export default function TradeIn() {
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

  const breakdown: [string, string][] = [
    [`Base value, ${product.name}`, `£${base}`],
    [`Condition: ${condition.label.split(" —")[0]}`, `× ${condition.f.toFixed(2)}`],
    [`Age: ${age.label}`, `× ${age.f.toFixed(2)}`],
  ];

  function tiAccept() {
    set({ tiSent: tradeInRef(quote) });
    showToast("Prepaid pack ordered");
    top();
  }

  function tiRecycle() {
    showToast("We'll email you a free recycling label");
  }

  if (tiSent) {
    return (
      <main className="fx-screen fx-page w-820 scr-tradein">
        <Card variant="form" className="ti-done">
          <span className="ti-done__tile">
            <Icon name="package-check" size={26} color="var(--pos)" />
          </span>
          <h1 className="ti-done__title">Prepaid pack on its way</h1>
          <p className="ti-done__body">
            It arrives in two to three working days. Post the device back in the
            same box — postage is covered, and the credit lands within a week of
            it reaching us.
          </p>
          <div className="ti-done__chips">
            <span className="ti-chip">{tiSent}</span>
            <span className="ti-chip">{quoteText} credit</span>
          </div>
          <ButtonSecondary
            icon="rotate-ccw"
            iconSize={16}
            className="ti-done__again"
            onClick={() => set({ tiSent: null })}
          >
            Value another device
          </ButtonSecondary>
        </Card>
      </main>
    );
  }

  return (
    <main className="fx-screen fx-page w-820 scr-tradein">
      <h1 className="scr-tradein__h1">What's your old Hearth worth?</h1>
      <p className="scr-tradein__lede">
        Trade any working Hearth device against your next one. We refurbish what
        we can and recycle the rest — you get store credit either way.
      </p>

      <Card variant="form" className="ti-form">
        <div>
          <h2 className="ti-label">Which device are you trading in?</h2>
          <ProductPicker
            label="Which device are you trading in?"
            products={dataSource.products()}
            value={tiProd}
            onChange={(id) => set({ tiProd: id })}
          />
        </div>

        <div>
          <h2 className="ti-label">What condition is it in?</h2>
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
            How old is it?
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
        <Eyebrow>Your quote</Eyebrow>
        <p className="ti-quote__value">{quoteText}</p>
        <p className="ti-quote__for">store credit for your {product.name}</p>

        <div className="ti-break">
          {breakdown.map(([label, value]) => (
            <div className="ti-break__row" key={label}>
              <span>{label}</span>
              <span className="ti-break__value">{value}</span>
            </div>
          ))}
        </div>

        <p className="ti-quote__note">
          Quote valid 14 days. We check the device on arrival — if the condition
          doesn't match we'll re-quote before doing anything, and send it back
          free if you'd rather not proceed.
        </p>

        <div className="ti-quote__actions">
          <ButtonPrimary icon="package" iconSize={16} onClick={tiAccept}>
            Send me a prepaid pack
          </ButtonPrimary>
          <ButtonSecondary icon="recycle" iconSize={16} onClick={tiRecycle}>
            Just recycle it
          </ButtonSecondary>
        </div>
      </div>
    </main>
  );
}
