/*
 * `security` — Security & privacy (port spec §6.32, logic §8.35).
 * Max-width 820.
 *
 * The "Recommended" badge on a toggle row shows only when the toggle is
 * recommended AND currently off, so on the seeded state it never appears
 * (two-factor ships on).
 *
 * Accessibility note: the comp made the whole settings row a button with a
 * nested switch button. Nested buttons are invalid, so the row itself carries
 * `role="switch"` and the switch graphic is decorative (`aria-hidden`).
 */

import { useMemo } from "react";
import {
  ButtonSecondary,
  Card,
  Chip,
  ChipRow,
  Eyebrow,
  Icon,
  ListCard,
  SoftPill,
} from "../components";
import { dataSource } from "../data/source";
import { SEC_PASSWORD_LINE } from "../data/demo";
import { useAppStore } from "../state/store";
import "../styles/screen-security.css";

export default function Security() {
  const secOn = useAppStore((s) => s.secOn);
  const secRetain = useAppStore((s) => s.secRetain);
  const secOut = useAppStore((s) => s.secOut);
  const set = useAppStore((s) => s.set);
  const showToast = useAppStore((s) => s.showToast);

  const toggles = dataSource.securityToggles();
  const retains = dataSource.retentionOptions();
  const allSessions = dataSource.sessions();

  const sessions = useMemo(
    () => allSessions.filter((s) => !secOut.includes(s.id)),
    [allSessions, secOut],
  );

  const flip = (id: string, label: string, was: boolean) => {
    set({ secOn: { ...secOn, [id]: !was } });
    showToast(`${label}${was ? " off" : " on"}`);
  };

  const revokeAll = () => {
    set({ secOut: allSessions.filter((s) => !s.current).map((s) => s.id) });
    showToast("Signed out everywhere else");
  };

  return (
    <main className="oh-screen oh-page w-820 sec">
      <h1 className="sec__h1">Security &amp; privacy</h1>
      <p className="sec__lede">
        {
          "Clips are encrypted end to end — we can't watch them, and neither can anyone we work with. Everything below is yours to change or take with you."
        }
      </p>

      <ListCard className="sec__card">
        <div className="sec__pw">
          <span className="sd-accent-tile sec__pw-tile">
            <Icon name="key-round" size={21} />
          </span>
          <div className="sec__pw-text">
            <span className="sec__row-label">Password</span>
            <span className="sec__pw-line">{SEC_PASSWORD_LINE}</span>
          </div>
          <ButtonSecondary
            icon="pencil"
            onClick={() =>
              showToast("Password changes need email confirmation", "info")
            }
          >
            Change
          </ButtonSecondary>
        </div>

        {toggles.map((t) => {
          const on = secOn[t.id] ?? false;
          return (
            <button
              type="button"
              key={t.id}
              role="switch"
              aria-checked={on}
              className="oh-res sec__row"
              onClick={() => flip(t.id, t.label, on)}
            >
              <span className="sec__row-text">
                <span className="sec__row-head">
                  <span className="sec__row-label">{t.label}</span>
                  {t.rec && !on ? (
                    <SoftPill
                      fg="--warn"
                      soft="--warn-soft"
                      icon="alert-triangle"
                    >
                      Recommended
                    </SoftPill>
                  ) : null}
                </span>
                <span className="sec__row-note">{t.note}</span>
              </span>
              <span className="sd-toggle" aria-checked={on} aria-hidden="true">
                <span className="sd-toggle__knob" />
              </span>
            </button>
          );
        })}

        <div className="sec__retain">
          <span className="sec__row-label">Keep clips for</span>
          <span className="sec__row-note">
            {
              "Older clips are deleted automatically. Anything you've downloaded stays yours."
            }
          </span>
          <ChipRow className="sec__retain-chips" gap={10}>
            {retains.map((r) => (
              <Chip
                key={r.id}
                active={secRetain === r.id}
                onClick={() => set({ secRetain: r.id })}
              >
                {r.label}
              </Chip>
            ))}
          </ChipRow>
        </div>
      </ListCard>

      <div className="sec__sessions-head">
        <Eyebrow>{"Where you're signed in"}</Eyebrow>
        <button type="button" className="oh-nav sec__revoke-all" onClick={revokeAll}>
          Sign out everywhere else
        </button>
      </div>

      <ListCard>
        {sessions.map((s) => (
          <div className="sd-listrow sec__session" key={s.id}>
            <span className="sec__session-tile">
              <Icon name={s.icon} size={19} />
            </span>
            <div className="sec__session-text">
              <span className="sec__session-head">
                <span className="sec__row-label">{s.device}</span>
                {s.current ? (
                  <SoftPill fg="--pos" soft="--pos-soft">
                    This device
                  </SoftPill>
                ) : null}
              </span>
              <span className="sec__session-meta">
                {s.where} · {s.when}
              </span>
            </div>
            {s.current ? null : (
              <ButtonSecondary
                icon="log-out"
                tone="var(--danger)"
                onClick={() => {
                  set({ secOut: [...secOut, s.id] });
                  showToast(`Signed out of ${s.device}`);
                }}
              >
                Sign out
              </ButtonSecondary>
            )}
          </div>
        ))}
      </ListCard>

      <div className="sec__split">
        <Card variant="lg" className="sec__panel">
          <span className="sec__panel-head">
            <Icon name="download" size={19} />
            <span className="sec__panel-title">Take your data</span>
          </span>
          <p className="sec__panel-body">
            A zip of your account, devices, schedules and clip index — usually
            ready in about ten minutes.
          </p>
          <ButtonSecondary
            icon="package"
            onClick={() =>
              showToast("Export requested — we'll email a link")
            }
          >
            Request export
          </ButtonSecondary>
        </Card>

        <Card variant="lg" className="sec__panel sec__panel--danger">
          <span className="sec__panel-head">
            <Icon name="trash-2" size={19} color="var(--danger)" />
            <span className="sec__panel-title sec__panel-title--danger">
              Delete your account
            </span>
          </span>
          <p className="sec__panel-body">
            Removes your account, clips and schedules for good after 30 days.
            Your devices keep working locally.
          </p>
          <ButtonSecondary
            icon="alert-triangle"
            tone="var(--danger)"
            className="sec__danger-btn"
            onClick={() =>
              showToast("Deletion needs confirming from your email", "warn")
            }
          >
            Start deletion
          </ButtonSecondary>
        </Card>
      </div>
    </main>
  );
}
