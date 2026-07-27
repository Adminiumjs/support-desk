/*
 * `appts` — Service appointments (port spec §6.18, logic §8.16).
 * Cancelling appends to `apptCancelled`; the list filters those out and splits
 * upcoming from past. Booking on the `repair` screen unshifts into `appts`.
 */

import { useMemo } from "react";
import {
  Avatar,
  ButtonPrimary,
  ButtonSecondary,
  Card,
  EmptyState,
  Eyebrow,
  IconChip,
  SoftPill,
} from "../components";
import { dataSource } from "../data/source";
import { useAppStore } from "../state/store";
import type { Appointment, ApptStatus, IconName } from "../data/types";
import "../styles/screen-appts.css";

interface ApptMeta {
  label: string;
  fg: string;
  soft: string;
  icon: IconName;
}

const APPT_META: Record<ApptStatus, ApptMeta> = {
  confirmed: {
    label: "Confirmed",
    fg: "--pos",
    soft: "--pos-soft",
    icon: "check-circle-2",
  },
  awaiting: {
    label: "Awaiting parcel",
    fg: "--warn",
    soft: "--warn-soft",
    icon: "clock",
  },
  completed: {
    label: "Completed",
    fg: "--fg-subtle",
    soft: "--surface-3",
    icon: "check",
  },
};

export default function Appts() {
  const appts = useAppStore((s) => s.appts);
  const apptCancelled = useAppStore((s) => s.apptCancelled);
  const set = useAppStore((s) => s.set);
  const go = useAppStore((s) => s.go);
  const showToast = useAppStore((s) => s.showToast);

  const live = useMemo(
    () => appts.filter((a) => !apptCancelled.includes(a.id)),
    [appts, apptCancelled],
  );
  const upcoming = useMemo(() => live.filter((a) => !a.past), [live]);
  const past = useMemo(() => live.filter((a) => a.past), [live]);

  const gotoRepair = () => go("repair");

  function onCal() {
    showToast("Calendar invite sent");
  }

  function onReschedule() {
    showToast("Pick a new slot below", "info");
    go("repair");
  }

  function onCancel(a: Appointment) {
    set({ apptCancelled: [...apptCancelled, a.id] });
    showToast(`Appointment ${a.id} cancelled`);
  }

  function onReport() {
    showToast("Service reports aren't available in this demo", "info");
  }

  return (
    <main className="fx-screen fx-page w-820 ap">
      <div className="ap__head">
        <div className="ap__head-text">
          <h1 className="ap__h1">Service appointments</h1>
          <p className="ap__lede">
            Engineer visits, mail-in repairs and installs, all in one place.
            Reschedule free up to 24 hours before.
          </p>
        </div>
        <ButtonPrimary
          className="ap__book"
          icon="calendar-plus"
          onClick={gotoRepair}
        >
          Book a visit
        </ButtonPrimary>
      </div>

      <Eyebrow>Upcoming</Eyebrow>
      {upcoming.length ? (
        <div className="ap__list">
          {upcoming.map((a) => {
            const prod = dataSource.product(a.prod);
            const meta = APPT_META[a.status];
            return (
              <Card key={a.id} className="ap__card fx-card">
                <div className="ap__top">
                  <IconChip
                    tint={prod.tint}
                    icon={prod.icon}
                    size={46}
                    radius={13}
                    iconSize={23}
                  />
                  <div className="ap__body">
                    <div className="ap__kindrow">
                      <span className="ap__kind">{a.kind}</span>
                      <SoftPill fg={meta.fg} soft={meta.soft} icon={meta.icon}>
                        {meta.label}
                      </SoftPill>
                    </div>
                    <p className="ap__when">{a.when}</p>
                    <p className="ap__where sd-mono">
                      {a.id} · {a.where}
                    </p>
                  </div>
                </div>
                <div className="ap__foot">
                  {a.engineer ? (
                    <div className="ap__eng">
                      <Avatar
                        initials={a.engInitials ?? ""}
                        tint={a.engTint ?? prod.tint}
                        size={36}
                        fontSize={13}
                      />
                      <span className="sd-col">
                        <span className="ap__eng-name">{a.engineer}</span>
                        <span className="ap__eng-role">{a.engRole}</span>
                      </span>
                    </div>
                  ) : null}
                  <div className="ap__actions">
                    <ButtonSecondary
                      className="ap__act"
                      icon="calendar"
                      iconSize={14}
                      onClick={onCal}
                    >
                      Add to calendar
                    </ButtonSecondary>
                    <ButtonSecondary
                      className="ap__act"
                      icon="clock"
                      iconSize={14}
                      onClick={onReschedule}
                    >
                      Reschedule
                    </ButtonSecondary>
                    <ButtonSecondary
                      className="ap__act ap__act--danger"
                      icon="x"
                      iconSize={14}
                      onClick={() => onCancel(a)}
                    >
                      Cancel
                    </ButtonSecondary>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="ap__list">
          <EmptyState
            compact
            icon="calendar-off"
            title="Nothing booked"
            body="When you book a repair or an install, it'll show up here with the engineer's details."
            action={{
              label: "Book a visit",
              icon: "calendar-plus",
              onClick: gotoRepair,
            }}
          />
        </div>
      )}

      {past.length ? (
        <>
          <Eyebrow>Past</Eyebrow>
          <div className="ap__pastlist">
            {past.map((a) => {
              const prod = dataSource.product(a.prod);
              const meta = APPT_META[a.status];
              return (
                <div key={a.id} className="ap__pastrow">
                  <IconChip
                    tint={prod.tint}
                    icon={prod.icon}
                    size={46}
                    radius={13}
                    iconSize={23}
                  />
                  <div className="ap__pastbody">
                    <p className="ap__pastkind">{a.kind}</p>
                    <p className="ap__pastwhen">{a.when}</p>
                  </div>
                  <SoftPill fg={meta.fg} soft={meta.soft} icon={meta.icon}>
                    {meta.label}
                  </SoftPill>
                  <ButtonSecondary
                    className="ap__act"
                    icon="file-text"
                    iconSize={14}
                    onClick={onReport}
                  >
                    Report
                  </ButtonSecondary>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </main>
  );
}
