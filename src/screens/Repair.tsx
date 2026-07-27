/*
 * `repair` — Repair booking (port spec §6.17, logic §8.18, validation §9.2).
 * Two states: the confirmation card once `rpRef` is set, otherwise the form.
 *
 * Booking really does push onto `appts`, so the Appointments screen updates.
 */

import { useMemo } from "react";
import {
  ButtonPrimary,
  ButtonSecondary,
  Callout,
  Card,
  Icon,
  ProductPicker,
  Radio,
  SelectField,
} from "../components";
import { dataSource } from "../data/source";
import { REPAIR_CONFIRM_LINES, REPAIR_LOCATIONS } from "../data/demo";
import { repairRef } from "../lib/format";
import { top, useAppStore } from "../state/store";
import type { Appointment } from "../data/types";
import "../styles/screen-repair.css";

export default function Repair() {
  const rpRef = useAppStore((s) => s.rpRef);
  const rpProd = useAppStore((s) => s.rpProd);
  const rpIssue = useAppStore((s) => s.rpIssue);
  const rpType = useAppStore((s) => s.rpType);
  const rpDate = useAppStore((s) => s.rpDate);
  const rpSlot = useAppStore((s) => s.rpSlot);
  const appts = useAppStore((s) => s.appts);
  const set = useAppStore((s) => s.set);
  const go = useAppStore((s) => s.go);
  const showToast = useAppStore((s) => s.showToast);

  const products = useMemo(() => dataSource.products(), []);
  const issues = useMemo(() => dataSource.repairIssues(), []);
  const types = useMemo(() => dataSource.repairTypes(), []);
  const dates = useMemo(() => dataSource.repairDates(), []);
  const slots = useMemo(() => dataSource.repairSlots(), []);

  const day = dates.find((d) => d.id === rpDate) ?? dates[0];
  const type = types.find((t) => t.id === rpType) ?? types[0];
  const rpWhen = `${day.dow} ${day.day}, ${rpSlot ?? ""}`;

  /* ------------------------------------------------------------ handlers */

  function pickSlot(label: string, taken: boolean) {
    if (taken) {
      showToast("That slot is full — try another", "warn");
      return;
    }
    set({ rpSlot: label });
  }

  function bookRepair() {
    if (!rpProd) {
      showToast("Pick which device needs repairing", "warn");
      return;
    }
    if (!rpIssue) {
      showToast("Choose what needs looking at", "warn");
      return;
    }
    if (!rpSlot) {
      showToast("Pick a day and a slot", "warn");
      return;
    }
    const ref = repairRef(appts.length);
    const booked: Appointment = {
      id: ref,
      kind: type.label,
      prod: rpProd,
      when: `${day.dow} ${day.day}, ${rpSlot}`,
      where: REPAIR_LOCATIONS[rpType] ?? REPAIR_LOCATIONS.visit,
      status: "confirmed",
      engineer: rpType === "visit" ? "Tomas Reis" : null,
      engInitials: "TR",
      engTint: "#4f8bd6",
      engRole: "Hardware engineer",
      past: false,
    };
    set({ appts: [booked, ...appts], rpRef: ref });
    showToast(`Repair booked — ${ref}`);
    top();
  }

  function rpReset() {
    set({ rpRef: null, rpProd: null, rpIssue: "", rpSlot: null });
  }

  /* ------------------------------------------------------ A. confirmation */

  if (rpRef) {
    return (
      <main className="fx-screen fx-page w-820 rp">
        <Card className="rp__done">
          <span className="rp__done-ico">
            <Icon name="calendar-check" size={26} color="var(--pos)" />
          </span>
          <h1 className="rp__done-title">You&rsquo;re booked in</h1>
          <p className="rp__done-body">
            {REPAIR_CONFIRM_LINES[rpType] ?? REPAIR_CONFIRM_LINES.visit}
          </p>
          <div className="rp__codes">
            <span className="rp__code sd-mono">{rpRef}</span>
            <span className="rp__code sd-mono">{rpWhen}</span>
          </div>
          <Callout tone="info" icon="info">
            Please have the device accessible and your Wi-Fi password to hand.
            If you need to move the slot, do it up to 24 hours before at no
            charge.
          </Callout>
          <div className="rp__done-actions">
            <ButtonPrimary icon="calendar" onClick={() => go("appts")}>
              See my appointments
            </ButtonPrimary>
            <ButtonSecondary icon="rotate-ccw" iconSize={16} onClick={rpReset}>
              Book another
            </ButtonSecondary>
          </div>
        </Card>
      </main>
    );
  }

  /* -------------------------------------------------------------- B. form */

  return (
    <main className="fx-screen fx-page w-820 rp">
      <h1 className="rp__h1">Book a repair</h1>
      <p className="rp__lede">
        Repairs under warranty are free, including collection. Out of warranty
        we&rsquo;ll quote before touching anything.
      </p>

      <Card className="rp__form">
        <section className="rp__sec">
          <p className="rp__label" id="rp-device">
            Which device?
          </p>
          <ProductPicker
            label="Which device?"
            products={products}
            value={rpProd}
            onChange={(id) => set({ rpProd: id })}
          />
        </section>

        <section className="rp__sec">
          <label className="rp__label" htmlFor="rp-issue">
            What needs looking at?
          </label>
          <SelectField
            id="rp-issue"
            value={rpIssue}
            onChange={(v) => set({ rpIssue: v })}
            placeholder="Choose an issue…"
            options={issues}
          />
        </section>

        <section className="rp__sec">
          <p className="rp__label">How should we do it?</p>
          <div className="rp__types">
            {types.map((t) => (
              <Radio
                key={t.id}
                name="rp-type"
                selected={rpType === t.id}
                onSelect={() => set({ rpType: t.id })}
                note={t.note}
                leading={
                  <span className="rp__type-ico">
                    <Icon name={t.icon} size={18} />
                  </span>
                }
              >
                {t.label}
              </Radio>
            ))}
          </div>
        </section>

        <section className="rp__sec">
          <p className="rp__label" id="rp-day">
            Pick a day
          </p>
          <div className="rp__days" role="radiogroup" aria-labelledby="rp-day">
            {dates.map((d) => {
              const on = d.id === rpDate;
              return (
                <button
                  key={d.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  className={`rp__day fx-chip${on ? " rp__day--on" : ""}`}
                  onClick={() => set({ rpDate: d.id, rpSlot: null })}
                >
                  <span className="rp__day-dow">{d.dow}</span>
                  <span className="rp__day-num">{d.day}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rp__sec">
          <p className="rp__label" id="rp-slot">
            Pick a slot
          </p>
          <div className="rp__slots" role="radiogroup" aria-labelledby="rp-slot">
            {slots.map((s) => {
              const on = rpSlot === s.label;
              return (
                <button
                  key={s.label}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  aria-disabled={s.taken || undefined}
                  className={`rp__slot fx-chip${on ? " rp__slot--on" : ""}${
                    s.taken ? " rp__slot--taken" : ""
                  }`}
                  onClick={() => pickSlot(s.label, s.taken)}
                >
                  <span className="rp__slot-label sd-mono">{s.label}</span>
                  {s.taken ? <span className="rp__slot-full">Full</span> : null}
                </button>
              );
            })}
          </div>
        </section>

        <ButtonPrimary
          className="rp__submit"
          icon="calendar-check"
          iconSize={17}
          onClick={bookRepair}
        >
          Confirm booking
        </ButtonPrimary>
      </Card>
    </main>
  );
}
