/*
 * `devices` — Device dashboard (port spec §6.25, logic §8.25). Max-width 1000.
 *
 * Five seeded devices with live stats and working toggles. The toggle value is
 * `devOn[id] ?? device.on`, and the toast reports the state the device is
 * moving *to*, derived from the previous value.
 *
 * Delta §6.13: the shortcut row gained Live view and Automations cards ahead of
 * Notifications and Household. Their subtitles are derived rather than the
 * comp's hard-coded strings, so pausing a rule updates the card.
 */

import { useMemo } from "react";
import {
  AccentIconTile,
  ButtonPrimary,
  ButtonSecondary,
  Card,
  Icon,
  IconChip,
  SoftPill,
  Toggle,
} from "../components";
import { dataSource } from "../data/source";
import { HOUSEHOLD_NAME } from "../data/demo";
import { runningCount, visibleAutomations } from "../lib/automations";
import { pluralise } from "../lib/format";
import { useAppStore } from "../state/store";
import type { DeviceHealth } from "../data/types";
import "../styles/screen-devices.css";

/** The device status family (port spec §4.2). */
const DEVICE_STATUS: Record<
  DeviceHealth,
  { label: string; fg: string; soft: string; icon: string }
> = {
  ok: {
    label: "Online",
    fg: "--pos",
    soft: "--pos-soft",
    icon: "check-circle-2",
  },
  low: {
    label: "Battery low",
    fg: "--warn",
    soft: "--warn-soft",
    icon: "battery-low",
  },
  off: {
    label: "Offline",
    fg: "--fg-subtle",
    soft: "--surface-3",
    icon: "plug",
  },
};

export default function Devices() {
  const devOn = useAppStore((s) => s.devOn);
  const ntRead = useAppStore((s) => s.ntRead);
  const members = useAppStore((s) => s.members);
  const mbOut = useAppStore((s) => s.mbOut);
  const automations = useAppStore((s) => s.automations);
  const auOff = useAppStore((s) => s.auOff);
  const auGone = useAppStore((s) => s.auGone);
  const set = useAppStore((s) => s.set);
  const go = useAppStore((s) => s.go);
  const showToast = useAppStore((s) => s.showToast);
  const gotoLive = useAppStore((s) => s.gotoLive);
  const gotoAuto = useAppStore((s) => s.gotoAuto);

  const devices = dataSource.devices();

  const summary = useMemo(() => {
    const off = devices.filter((d) => d.st === "off").length;
    const tail = off ? `${off} offline · ` : "all reachable · ";
    return `${pluralise(devices.length, "device")} · ${tail}armed since 08:12`;
  }, [devices]);

  const notifLine = useMemo(() => {
    const unread = dataSource
      .notifications()
      .filter((n) => n.unread && !ntRead.includes(n.id)).length;
    return unread ? `${unread} unread` : "All caught up";
  }, [ntRead]);

  const memberLine = useMemo(() => {
    const live = members.filter((m) => !mbOut.includes(m.id)).length;
    return `${pluralise(live, "person", "people")} · 1 invite pending`;
  }, [members, mbOut]);

  /* Delta §6.13 — the two new shortcut cards. */
  const liveLine = useMemo(() => {
    const online = dataSource.cameras().filter((c) => !c.offline).length;
    const today = dataSource.clips().filter((c) => c.day === "Today").length;
    return `${pluralise(online, "camera")} · ${today} clips today`;
  }, []);

  const autoLine = useMemo(() => {
    const rules = visibleAutomations(automations, auGone);
    const live = runningCount(rules, auOff);
    return `${live} running, ${rules.length - live} paused`;
  }, [automations, auGone, auOff]);

  const onToggle = (id: string, name: string, label: string, was: boolean) => {
    set({ devOn: { ...devOn, [id]: !was } });
    showToast(`${name} · ${label}${was ? " off" : " on"}`);
  };

  return (
    <main className="fx-screen fx-page w-1000 fx-wide dv">
      <div className="dv__head">
        <div className="dv__head-text">
          <h1 className="dv__h1">{HOUSEHOLD_NAME}</h1>
          <p className="dv__lede">{summary}</p>
        </div>
        <div className="dv__head-acts">
          <ButtonSecondary
            icon="plus"
            onClick={() =>
              showToast("Adding devices happens in the Hearth app", "info")
            }
          >
            Add a device
          </ButtonSecondary>
          <ButtonPrimary icon="leaf" size="md" onClick={() => go("energy")}>
            Energy insights
          </ButtonPrimary>
        </div>
      </div>

      <div className="dv__grid">
        {devices.map((d) => {
          const product = dataSource.product(d.prod);
          const meta = DEVICE_STATUS[d.st];
          const on = devOn[d.id] ?? d.on;
          return (
            <Card
              key={d.id}
              className={`fx-card dv__card${
                d.st === "off" ? " dv__card--off" : ""
              }`}
            >
              <div className="dv__card-head">
                <IconChip
                  tint={product.tint}
                  icon={product.icon}
                  size={40}
                  radius={12}
                  iconSize={20}
                />
                <div className="dv__id">
                  <span className="dv__name">{d.name}</span>
                  <span className="dv__room">{d.room}</span>
                </div>
                <SoftPill fg={meta.fg} soft={meta.soft} icon={meta.icon}>
                  {meta.label}
                </SoftPill>
              </div>

              <div className="dv__stats">
                {d.stats.map((s) => (
                  <div className="dv__stat" key={s.label}>
                    <span className="dv__stat-val">
                      <Icon name={s.icon} size={14} />
                      {s.value}
                    </span>
                    <span className="dv__stat-label">{s.label}</span>
                  </div>
                ))}
              </div>

              <p className="dv__last">{d.last}</p>

              <div className="dv__toggle-row">
                <span className="dv__toggle-label">{d.toggle}</span>
                <Toggle
                  label={`${d.name} · ${d.toggle}`}
                  on={on}
                  onChange={() => onToggle(d.id, d.name, d.toggle, on)}
                />
              </div>
            </Card>
          );
        })}
      </div>

      <div className="dv__shortcuts">
        <button
          type="button"
          className="sd-card fx-card dv__shortcut"
          onClick={gotoLive}
        >
          <AccentIconTile icon="video" size={42} radius={13} iconSize={20} />
          <span className="dv__shortcut-text">
            <span className="dv__shortcut-title">Live view</span>
            <span className="dv__shortcut-sub">{liveLine}</span>
          </span>
          <Icon name="arrow-right" size={17} />
        </button>

        <button
          type="button"
          className="sd-card fx-card dv__shortcut"
          onClick={gotoAuto}
        >
          <AccentIconTile icon="workflow" size={42} radius={13} iconSize={20} />
          <span className="dv__shortcut-text">
            <span className="dv__shortcut-title">Automations</span>
            <span className="dv__shortcut-sub">{autoLine}</span>
          </span>
          <Icon name="arrow-right" size={17} />
        </button>

        <button
          type="button"
          className="sd-card fx-card dv__shortcut"
          onClick={() => go("notifs")}
        >
          <AccentIconTile icon="bell" size={42} radius={13} iconSize={20} />
          <span className="dv__shortcut-text">
            <span className="dv__shortcut-title">Notifications</span>
            <span className="dv__shortcut-sub">{notifLine}</span>
          </span>
          <Icon name="arrow-right" size={17} />
        </button>

        <button
          type="button"
          className="sd-card fx-card dv__shortcut"
          onClick={() => go("members")}
        >
          <AccentIconTile icon="users" size={42} radius={13} iconSize={20} />
          <span className="dv__shortcut-text">
            <span className="dv__shortcut-title">Household</span>
            <span className="dv__shortcut-sub">{memberLine}</span>
          </span>
          <Icon name="arrow-right" size={17} />
        </button>
      </div>
    </main>
  );
}
