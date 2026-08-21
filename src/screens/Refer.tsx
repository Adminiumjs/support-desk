/*
 * `refer` — Refer a friend (port spec §6.24 / §8.19). Max-width 820.
 *
 * Everything is derived from the seeded `referrals` list: 2 joined of a goal
 * of 5 gives "£40 earned" and a 40% bar. The invite form uses the app-wide
 * weak email rule (`indexOf('@') < 1`) — there is no regex anywhere (§9.2).
 */

import {
  Avatar,
  ButtonPrimary,
  ButtonSecondary,
  Eyebrow,
  SoftPill,
} from "../components";
import {
  REFERRAL_BONUS,
  REFERRAL_CODE,
  REFERRAL_GOAL,
  REFERRAL_REWARD,
  FOOTER_URL,
} from "../data/demo";
import type { Referral } from "../data/types";
import { useI18n, type MessageKey } from "../i18n";
import { displayNameFromEmail, initialsFrom, poundsWhole } from "../lib/format";
import { useAppStore } from "../state/store";
import "../styles/screen-refer.css";

/** Best-effort copy; the toast fires either way, exactly as the comp does. */
function copyText(text: string): void {
  try {
    void navigator.clipboard?.writeText(text);
  } catch {
    /* clipboard is unavailable in some embeds — the toast still confirms */
  }
}

/** `label` is a message key — module scope, resolved at the render site. */
const PILL: Record<
  Referral["st"],
  { label: MessageKey; fg: string; soft: string; icon: string }
> = {
  joined: {
    label: "screensB.refer.pillJoined",
    fg: "--pos",
    soft: "--pos-soft",
    icon: "check-circle-2",
  },
  invited: {
    label: "screensB.refer.pillInvited",
    fg: "--warn",
    soft: "--warn-soft",
    icon: "clock",
  },
};

export default function Refer() {
  const { t, number } = useI18n();
  const referrals = useAppStore((s) => s.referrals);
  const refEmail = useAppStore((s) => s.refEmail);
  const set = useAppStore((s) => s.set);
  const showToast = useAppStore((s) => s.showToast);
  const gotoBoard = useAppStore((s) => s.gotoBoard);

  const joined = referrals.filter((r) => r.st === "joined").length;
  const earned = t("screensB.refer.earned", {
    amount: poundsWhole(joined * REFERRAL_REWARD),
  });
  const pct = Math.min(100, Math.round((joined / REFERRAL_GOAL) * 100));
  const progress = t("screensB.refer.progress", {
    joined: number(joined),
    goal: number(REFERRAL_GOAL),
    left: number(REFERRAL_GOAL - joined),
    bonus: poundsWhole(REFERRAL_BONUS),
  });

  const copyCode = () => {
    copyText(REFERRAL_CODE);
    showToast(t("screensB.refer.codeCopied"));
  };

  const copyLink = () => {
    copyText(`https://${FOOTER_URL}/?ref=${REFERRAL_CODE}`);
    showToast(t("screensB.refer.linkCopied"));
  };

  const sendInvite = () => {
    const email = refEmail.trim();
    if (email.indexOf("@") < 1) {
      showToast(t("screensB.refer.needEmail"), "warn");
      return;
    }
    const name = displayNameFromEmail(email);
    const next: Referral = {
      name,
      initials: initialsFrom(name),
      tint: "#8a6fb0",
      when: t("screensB.refer.invitedJustNow"),
      st: "invited",
      reward: t("screensB.refer.rewardPending"),
    };
    set({ referrals: [...referrals, next], refEmail: "" });
    showToast(t("screensB.refer.inviteSent", { email }));
  };

  return (
    <main className="fx-screen fx-page w-820">
      <section className="refer-hero">
        <p className="refer-hero__eyebrow">{t("screensB.refer.eyebrow")}</p>
        <h1 className="refer-hero__title">
          {t("screensB.refer.title", {
            amount: poundsWhole(REFERRAL_REWARD),
          })}
        </h1>
        <p className="refer-hero__lede">
          {t("screensB.refer.lede", { amount: poundsWhole(REFERRAL_REWARD) })}
        </p>
        <div className="refer-hero__row">
          <span className="refer-code">{REFERRAL_CODE}</span>
          <ButtonPrimary
            icon="copy"
            iconSize={16}
            className="refer-copy"
            onClick={copyCode}
          >
            {t("screensB.refer.copyCode")}
          </ButtonPrimary>
          {/* Delta §6.13 — cross-link to the new leaderboard. */}
          <ButtonSecondary
            icon="trophy"
            iconSize={16}
            className="refer-copy refer-copy--ghost"
            onClick={gotoBoard}
          >
            {t("screensB.refer.leaderboard")}
          </ButtonSecondary>
          <ButtonSecondary
            icon="link"
            iconSize={16}
            className="refer-copy refer-copy--ghost"
            onClick={copyLink}
          >
            {t("screensB.refer.copyLink")}
          </ButtonSecondary>
        </div>
      </section>

      <div className="refer-two">
        <section className="refer-card refer-card--progress">
          <div className="refer-progress__head">
            <Eyebrow>{t("screensB.refer.yourProgress")}</Eyebrow>
            <span className="refer-progress__earned">{earned}</span>
          </div>
          <div className="meter refer-progress__track">
            <span className="meter__fill" style={{ inlineSize: `${pct}%` }} />
          </div>
          <p className="refer-progress__note">{progress}</p>
        </section>

        <section className="refer-card">
          <Eyebrow>{t("screensB.refer.inviteByEmail")}</Eyebrow>
          <div className="refer-invite">
            <input
              className="fx-fld refer-invite__field"
              type="email"
              value={refEmail}
              placeholder="friend@example.com"
              aria-label={t("screensB.refer.friendEmailAria")}
              onChange={(e) => set({ refEmail: e.target.value })}
            />
            <ButtonPrimary
              icon="send"
              iconSize={15}
              className="refer-invite__send"
              onClick={sendInvite}
            >
              {t("screensB.refer.send")}
            </ButtonPrimary>
          </div>
          <p className="refer-invite__note">{t("screensB.refer.inviteNote")}</p>
        </section>
      </div>

      <Eyebrow>{t("screensB.refer.yourReferrals")}</Eyebrow>
      <div className="refer-list">
        {referrals.map((r, i) => {
          const p = PILL[r.st];
          return (
            <div key={`${r.name}-${i}`} className="refer-row">
              <Avatar
                initials={r.initials}
                tint={r.tint}
                size={38}
                fontSize={13}
              />
              <div className="refer-row__who">
                <div className="refer-row__name">{r.name}</div>
                <div className="refer-row__when">{r.when}</div>
              </div>
              <SoftPill fg={p.fg} soft={p.soft} icon={p.icon}>
                {t(p.label)}
              </SoftPill>
              <span className="refer-row__reward">{r.reward}</span>
            </div>
          );
        })}
      </div>

      <p className="refer-legal">
        {t("screensB.refer.legal", { amount: poundsWhole(30) })}
      </p>
    </main>
  );
}
