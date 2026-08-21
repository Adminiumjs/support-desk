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
import { useT } from "../i18n";
import { repairRef } from "../lib/format";
import { top, useAppStore } from "../state/store";
import type { Appointment } from "../data/types";
import "../styles/screen-repair.css";

export default function Repair() {
  const t = useT();
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
  const type = types.find((ty) => ty.id === rpType) ?? types[0];
  const rpWhen = t("screensB.repair.whenLine", {
    dow: day.dow,
    day: day.day,
    slot: rpSlot ?? "",
  });

  /* ------------------------------------------------------------ handlers */

  function pickSlot(label: string, taken: boolean) {
    if (taken) {
      showToast(t("screensB.repair.slotFull"), "warn");
      return;
    }
    set({ rpSlot: label });
  }

  function bookRepair() {
    if (!rpProd) {
      showToast(t("screensB.repair.needDevice"), "warn");
      return;
    }
    if (!rpIssue) {
      showToast(t("screensB.repair.needIssue"), "warn");
      return;
    }
    if (!rpSlot) {
      showToast(t("screensB.repair.needSlot"), "warn");
      return;
    }
    const ref = repairRef(appts.length);
    const booked: Appointment = {
      id: ref,
      kind: type.label,
      prod: rpProd,
      when: t("screensB.repair.whenLine", {
        dow: day.dow,
        day: day.day,
        slot: rpSlot,
      }),
      where: REPAIR_LOCATIONS[rpType] ?? REPAIR_LOCATIONS.visit,
      status: "confirmed",
      engineer: rpType === "visit" ? "Tomas Reis" : null,
      engInitials: "TR",
      engTint: "#4f8bd6",
      engRole: t("screensB.repair.engineerRole"),
      past: false,
    };
    set({ appts: [booked, ...appts], rpRef: ref });
    showToast(t("screensB.repair.booked", { ref }));
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
          <h1 className="rp__done-title">{t("screensB.repair.doneTitle")}</h1>
          <p className="rp__done-body">
            {REPAIR_CONFIRM_LINES[rpType] ?? REPAIR_CONFIRM_LINES.visit}
          </p>
          <div className="rp__codes">
            <span className="rp__code sd-mono">{rpRef}</span>
            <span className="rp__code sd-mono">{rpWhen}</span>
          </div>
          <Callout tone="info" icon="info">
            {t("screensB.repair.doneNote")}
          </Callout>
          <div className="rp__done-actions">
            <ButtonPrimary icon="calendar" onClick={() => go("appts")}>
              {t("screensB.repair.seeAppointments")}
            </ButtonPrimary>
            <ButtonSecondary icon="rotate-ccw" iconSize={16} onClick={rpReset}>
              {t("screensB.repair.bookAnother")}
            </ButtonSecondary>
          </div>
        </Card>
      </main>
    );
  }

  /* -------------------------------------------------------------- B. form */

  return (
    <main className="fx-screen fx-page w-820 rp">
      <h1 className="rp__h1">{t("screensB.repair.h1")}</h1>
      <p className="rp__lede">{t("screensB.repair.lede")}</p>

      <Card className="rp__form">
        <section className="rp__sec">
          <p className="rp__label" id="rp-device">
            {t("screensB.repair.whichDevice")}
          </p>
          <ProductPicker
            label={t("screensB.repair.whichDevice")}
            products={products}
            value={rpProd}
            onChange={(id) => set({ rpProd: id })}
          />
        </section>

        <section className="rp__sec">
          <label className="rp__label" htmlFor="rp-issue">
            {t("screensB.repair.whatIssue")}
          </label>
          <SelectField
            id="rp-issue"
            value={rpIssue}
            onChange={(v) => set({ rpIssue: v })}
            placeholder={t("screensB.repair.chooseIssue")}
            options={issues}
          />
        </section>

        <section className="rp__sec">
          <p className="rp__label">{t("screensB.repair.howLabel")}</p>
          <div className="rp__types">
            {types.map((ty) => (
              <Radio
                key={ty.id}
                name="rp-type"
                selected={rpType === ty.id}
                onSelect={() => set({ rpType: ty.id })}
                note={ty.note}
                leading={
                  <span className="rp__type-ico">
                    <Icon name={ty.icon} size={18} />
                  </span>
                }
              >
                {ty.label}
              </Radio>
            ))}
          </div>
        </section>

        <section className="rp__sec">
          <p className="rp__label" id="rp-day">
            {t("screensB.repair.pickDay")}
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
            {t("screensB.repair.pickSlot")}
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
                  {s.taken ? (
                    <span className="rp__slot-full">
                      {t("screensB.repair.slotTaken")}
                    </span>
                  ) : null}
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
          {t("screensB.repair.confirm")}
        </ButtonPrimary>
      </Card>
    </main>
  );
}
