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
import { useT, type MessageKey } from "../i18n";
import { useAppStore } from "../state/store";
import type { Appointment, ApptStatus, IconName } from "../data/types";
import "../styles/screen-appts.css";

interface ApptMeta {
  /** Message key — resolved at the render site, never at module scope. */
  label: MessageKey;
  fg: string;
  soft: string;
  icon: IconName;
}

const APPT_META: Record<ApptStatus, ApptMeta> = {
  confirmed: {
    label: "screensA.appts.confirmed",
    fg: "--pos",
    soft: "--pos-soft",
    icon: "check-circle-2",
  },
  awaiting: {
    label: "screensA.appts.awaiting",
    fg: "--warn",
    soft: "--warn-soft",
    icon: "clock",
  },
  completed: {
    label: "screensA.appts.completed",
    fg: "--fg-subtle",
    soft: "--surface-3",
    icon: "check",
  },
};

export default function Appts() {
  const t = useT();
  const appts = useAppStore((s) => s.appts);
  const apptCancelled = useAppStore((s) => s.apptCancelled);
  const set = useAppStore((s) => s.set);
  const go = useAppStore((s) => s.go);
  const showToast = useAppStore((s) => s.showToast);
  const undoToast = useAppStore((s) => s.undoToast);

  const live = useMemo(
    () => appts.filter((a) => !apptCancelled.includes(a.id)),
    [appts, apptCancelled],
  );
  const upcoming = useMemo(() => live.filter((a) => !a.past), [live]);
  const past = useMemo(() => live.filter((a) => a.past), [live]);

  const gotoRepair = () => go("repair");

  function onCal() {
    showToast(t("screensA.appts.toastCalendar"));
  }

  function onReschedule() {
    showToast(t("screensA.appts.toastReschedule"), "info");
    go("repair");
  }

  /* Delta §6.3: same copy, now undoable. */
  function onCancel(a: Appointment) {
    set({ apptCancelled: [...apptCancelled, a.id] });
    undoToast(t("screensA.appts.toastCancelled", { id: a.id }), () =>
      set({
        apptCancelled: useAppStore
          .getState()
          .apptCancelled.filter((id) => id !== a.id),
      }),
    );
  }

  function onReport() {
    showToast(t("screensA.appts.toastReport"), "info");
  }

  return (
    <main className="fx-screen fx-page w-820 ap">
      <div className="ap__head">
        <div className="ap__head-text">
          <h1 className="ap__h1">{t("screensA.appts.title")}</h1>
          <p className="ap__lede">{t("screensA.appts.lede")}</p>
        </div>
        <ButtonPrimary
          className="ap__book"
          icon="calendar-plus"
          onClick={gotoRepair}
        >
          {t("screensA.appts.book")}
        </ButtonPrimary>
      </div>

      <Eyebrow>{t("screensA.appts.upcoming")}</Eyebrow>
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
                        {t(meta.label)}
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
                      {t("screensA.appts.addCalendar")}
                    </ButtonSecondary>
                    <ButtonSecondary
                      className="ap__act"
                      icon="clock"
                      iconSize={14}
                      onClick={onReschedule}
                    >
                      {t("screensA.appts.reschedule")}
                    </ButtonSecondary>
                    <ButtonSecondary
                      className="ap__act ap__act--danger"
                      icon="x"
                      iconSize={14}
                      onClick={() => onCancel(a)}
                    >
                      {t("screensA.appts.cancel")}
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
            title={t("screensA.appts.emptyTitle")}
            body={t("screensA.appts.emptyBody")}
            action={{
              label: t("screensA.appts.book"),
              icon: "calendar-plus",
              onClick: gotoRepair,
            }}
          />
        </div>
      )}

      {past.length ? (
        <>
          <Eyebrow>{t("screensA.appts.past")}</Eyebrow>
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
                    {t(meta.label)}
                  </SoftPill>
                  <ButtonSecondary
                    className="ap__act"
                    icon="file-text"
                    iconSize={14}
                    onClick={onReport}
                  >
                    {t("screensA.appts.report")}
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
