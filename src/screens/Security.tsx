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
 *
 * Delta §6.9: signing a session out is undoable, an empty state appears once
 * this device is the only one left, and "Start deletion" is no longer a
 * dead-end toast — it opens the three-step `deleteacct` flow.
 */

import { useMemo } from "react";
import {
  ButtonSecondary,
  Card,
  Chip,
  ChipRow,
  EmptyState,
  Eyebrow,
  Icon,
  ListCard,
  SoftPill,
} from "../components";
import { dataSource } from "../data/source";
import { SEC_PASSWORD_LINE } from "../data/demo";
import { useT } from "../i18n";
import { useAppStore } from "../state/store";
import "../styles/screen-security.css";

export default function Security() {
  const t = useT();
  const secOn = useAppStore((s) => s.secOn);
  const secRetain = useAppStore((s) => s.secRetain);
  const secOut = useAppStore((s) => s.secOut);
  const set = useAppStore((s) => s.set);
  const showToast = useAppStore((s) => s.showToast);
  const undoToast = useAppStore((s) => s.undoToast);
  const gotoDelete = useAppStore((s) => s.gotoDelete);

  const toggles = dataSource.securityToggles();
  const retains = dataSource.retentionOptions();
  const allSessions = dataSource.sessions();

  const sessions = useMemo(
    () => allSessions.filter((s) => !secOut.includes(s.id)),
    [allSessions, secOut],
  );

  /* Only this device left signed in — the empty state below (delta §6.9). */
  const onlyThisDevice = sessions.every((s) => s.current);

  const flip = (id: string, label: string, was: boolean) => {
    set({ secOn: { ...secOn, [id]: !was } });
    showToast(
      was
        ? t("screensB.security.toggledOff", { label })
        : t("screensB.security.toggledOn", { label }),
    );
  };

  const revokeAll = () => {
    set({ secOut: allSessions.filter((s) => !s.current).map((s) => s.id) });
    showToast(t("screensB.security.signedOutEverywhere"));
  };

  return (
    <main className="fx-screen fx-page w-820 sec">
      <h1 className="sec__h1">{t("screensB.security.h1")}</h1>
      <p className="sec__lede">{t("screensB.security.lede")}</p>

      <ListCard className="sec__card">
        <div className="sec__pw">
          <span className="sd-accent-tile sec__pw-tile">
            <Icon name="key-round" size={21} />
          </span>
          <div className="sec__pw-text">
            <span className="sec__row-label">
              {t("screensB.security.password")}
            </span>
            <span className="sec__pw-line">{SEC_PASSWORD_LINE}</span>
          </div>
          <ButtonSecondary
            icon="pencil"
            onClick={() =>
              showToast(t("screensB.security.passwordToast"), "info")
            }
          >
            {t("screensB.security.change")}
          </ButtonSecondary>
        </div>

        {toggles.map((tg) => {
          const on = secOn[tg.id] ?? false;
          return (
            <button
              type="button"
              key={tg.id}
              role="switch"
              aria-checked={on}
              className="fx-res sec__row"
              onClick={() => flip(tg.id, tg.label, on)}
            >
              <span className="sec__row-text">
                <span className="sec__row-head">
                  <span className="sec__row-label">{tg.label}</span>
                  {tg.rec && !on ? (
                    <SoftPill
                      fg="--warn"
                      soft="--warn-soft"
                      icon="alert-triangle"
                    >
                      {t("screensB.security.recommended")}
                    </SoftPill>
                  ) : null}
                </span>
                <span className="sec__row-note">{tg.note}</span>
              </span>
              <span className="sd-toggle" aria-checked={on} aria-hidden="true">
                <span className="sd-toggle__knob" />
              </span>
            </button>
          );
        })}

        <div className="sec__retain">
          <span className="sec__row-label">
            {t("screensB.security.keepClipsFor")}
          </span>
          <span className="sec__row-note">
            {t("screensB.security.keepClipsNote")}
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
        <Eyebrow>{t("screensB.security.whereSignedIn")}</Eyebrow>
        <button type="button" className="fx-nav sec__revoke-all" onClick={revokeAll}>
          {t("screensB.security.signOutEverywhere")}
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
                    {t("screensB.security.thisDevice")}
                  </SoftPill>
                ) : null}
              </span>
              <span className="sec__session-meta">
                {t("screensB.security.sessionMeta", {
                  where: s.where,
                  when: s.when,
                })}
              </span>
            </div>
            {s.current ? null : (
              <ButtonSecondary
                icon="log-out"
                tone="var(--danger)"
                onClick={() => {
                  set({ secOut: [...secOut, s.id] });
                  undoToast(
                    t("screensB.security.signedOutOf", { device: s.device }),
                    () =>
                      set({
                        secOut: useAppStore
                          .getState()
                          .secOut.filter((id) => id !== s.id),
                      }),
                  );
                }}
              >
                {t("screensB.security.signOut")}
              </ButtonSecondary>
            )}
          </div>
        ))}
      </ListCard>

      {onlyThisDevice ? (
        <EmptyState
          compact
          className="sec__empty"
          icon="monitor-off"
          title={t("screensB.security.emptyTitle")}
          body={t("screensB.security.emptyBody")}
        />
      ) : null}

      <div className="sec__split">
        <Card variant="lg" className="sec__panel">
          <span className="sec__panel-head">
            <Icon name="download" size={19} />
            <span className="sec__panel-title">
              {t("screensB.security.takeYourData")}
            </span>
          </span>
          <p className="sec__panel-body">
            {t("screensB.security.takeYourDataBody")}
          </p>
          <ButtonSecondary
            icon="package"
            onClick={() => showToast(t("screensB.security.exportToast"))}
          >
            {t("screensB.security.requestExport")}
          </ButtonSecondary>
        </Card>

        <Card variant="lg" className="sec__panel sec__panel--danger">
          <span className="sec__panel-head">
            <Icon name="trash-2" size={19} color="var(--danger)" />
            <span className="sec__panel-title sec__panel-title--danger">
              {t("screensB.security.deleteAccount")}
            </span>
          </span>
          <p className="sec__panel-body">
            {t("screensB.security.deleteAccountBody")}
          </p>
          <ButtonSecondary
            icon="alert-triangle"
            tone="var(--danger)"
            className="sec__danger-btn"
            onClick={gotoDelete}
          >
            {t("screensB.security.startDeletion")}
          </ButtonSecondary>
        </Card>
      </div>
    </main>
  );
}
