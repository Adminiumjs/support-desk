/*
 * `status` — Service status (port spec §6.31, logic §8.21).
 * Seeded data has one degraded component, so the banner reads degraded and the
 * open-incident timeline is visible.
 *
 * The incident timeline needs three lines per node (label, mono time, body),
 * which the shared `<VerticalTimeline>` cannot express, so it is built here
 * from the shared `tl-*` classes rather than forking the component.
 */

import { useMemo } from "react";
import {
  ButtonPrimary,
  Card,
  Eyebrow,
  Icon,
  ListCard,
  SoftPill,
  TextInput,
} from "../components";
import { dataSource } from "../data/source";
import { ST_CHECKED, ST_DEGRADED_SUB, ST_OK_SUB } from "../data/demo";
import { pluralise } from "../lib/format";
import { looksLikeEmail, useAppStore } from "../state/store";
import type { ComponentHealth, IconName } from "../data/types";
import "../styles/screen-status.css";

interface HealthMeta {
  label: string;
  fg: string;
  soft: string;
  icon: IconName;
}

const HEALTH: Record<ComponentHealth, HealthMeta> = {
  ok: {
    label: "Operational",
    fg: "--pos",
    soft: "--pos-soft",
    icon: "check-circle-2",
  },
  degraded: {
    label: "Degraded",
    fg: "--warn",
    soft: "--warn-soft",
    icon: "alert-triangle",
  },
  down: {
    label: "Outage",
    fg: "--danger",
    soft: "--danger-soft",
    icon: "x-circle",
  },
};

export default function Status() {
  const stEmail = useAppStore((s) => s.stEmail);
  const set = useAppStore((s) => s.set);
  const showToast = useAppStore((s) => s.showToast);

  const comps = useMemo(() => dataSource.statusComponents(), []);
  const updates = useMemo(() => dataSource.statusUpdates(), []);
  const history = useMemo(() => dataSource.statusHistory(), []);

  const bad = comps.filter((c) => c.st !== "ok").length;
  const ok = bad === 0;
  const headline = ok
    ? "All systems operational"
    : `${pluralise(bad, "service")} degraded`;
  const sub = ok ? ST_OK_SUB : ST_DEGRADED_SUB;

  function stSubscribe() {
    if (!looksLikeEmail(stEmail)) {
      showToast("Enter an email to subscribe", "warn");
      return;
    }
    set({ stEmail: "" });
    showToast("Subscribed to status updates");
  }

  return (
    <main className="fx-screen fx-page w-820 st">
      <h1 className="st__h1">Service status</h1>
      <p className="st__lede">
        Live health of the Hearth app, cloud and website. Your devices keep
        working locally even when our cloud doesn&rsquo;t.
      </p>

      <Card className={`st__banner${ok ? " st__banner--ok" : " st__banner--bad"}`}>
        <span className="st__banner-ico">
          <Icon name={ok ? "check-circle-2" : "alert-triangle"} size={24} />
        </span>
        <div className="st__banner-text">
          <p className="st__headline">{headline}</p>
          <p className="st__sub">{sub}</p>
        </div>
        <span className="st__checked sd-mono">{ST_CHECKED}</span>
      </Card>

      <ListCard className="st__comps">
        {comps.map((c) => {
          const m = HEALTH[c.st];
          return (
            <div key={c.name} className="sd-listrow fx-res">
              <div className="st__comp">
                <p className="st__comp-name">{c.name}</p>
                <p className="st__comp-note">{c.note}</p>
              </div>
              <span className="st__uptime sd-mono">{c.uptime} · 90d</span>
              <SoftPill fg={m.fg} soft={m.soft} icon={m.icon}>
                {m.label}
              </SoftPill>
            </div>
          );
        })}
      </ListCard>

      {!ok ? (
        <Card className="st__incident">
          <span className="st__open">
            <Icon name="activity" size={13} />
            Open incident
          </span>
          <h2 className="st__incident-title">
            Video clip playback is slow for some homes
          </h2>
          <div className="tl-v st__timeline">
            {updates.map((u, i) => (
              <div className="tl-v__row" key={u.label}>
                <div className="tl-v__rail">
                  <span className={`tl-dot tl-dot--${u.st}`} />
                  {i < updates.length - 1 ? (
                    <span
                      className={`tl-v__conn${u.st === "done" ? " tl-v__conn--on" : ""}`}
                    />
                  ) : null}
                </div>
                <div>
                  <div
                    className="st__uplabel"
                    style={
                      u.st === "current"
                        ? { color: "var(--accent)" }
                        : u.st === "todo"
                          ? { color: "var(--fg-subtle)" }
                          : undefined
                    }
                  >
                    {u.label}
                  </div>
                  <div className="st__uptime-stamp sd-mono">{u.time}</div>
                  <p className="st__uptext">{u.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      <div className="st__subscribe">
        <div className="st__sub-text">
          <p className="st__sub-title">Get status updates by email</p>
          <p className="st__sub-note">
            One email when something breaks, one when it&rsquo;s fixed.
          </p>
        </div>
        <TextInput
          className="st__input"
          type="email"
          value={stEmail}
          onChange={(v) => set({ stEmail: v })}
          placeholder="you@example.com"
          ariaLabel="Email address for status updates"
        />
        <ButtonPrimary className="st__go" icon="bell" onClick={stSubscribe}>
          Subscribe
        </ButtonPrimary>
      </div>

      <Eyebrow>Past incidents</Eyebrow>
      <div className="st__history">
        {history.map((h) => (
          <Card key={h.title} className="st__hcard">
            <div className="st__hhead">
              <p className="st__htitle">{h.title}</p>
              <SoftPill fg="--pos" soft="--pos-soft" icon="check-circle-2">
                Resolved
              </SoftPill>
              <span className="st__hmeta sd-mono">
                {h.date} · {h.dur}
              </span>
            </div>
            <p className="st__htext">{h.text}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
