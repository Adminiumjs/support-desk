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
import { displayNameFromEmail, initialsFrom } from "../lib/format";
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

const PILL: Record<Referral["st"], { label: string; fg: string; soft: string; icon: string }> = {
  joined: {
    label: "Joined",
    fg: "--pos",
    soft: "--pos-soft",
    icon: "check-circle-2",
  },
  invited: {
    label: "Invited",
    fg: "--warn",
    soft: "--warn-soft",
    icon: "clock",
  },
};

export default function Refer() {
  const referrals = useAppStore((s) => s.referrals);
  const refEmail = useAppStore((s) => s.refEmail);
  const set = useAppStore((s) => s.set);
  const showToast = useAppStore((s) => s.showToast);

  const joined = referrals.filter((r) => r.st === "joined").length;
  const earned = `£${joined * REFERRAL_REWARD} earned`;
  const pct = Math.min(100, Math.round((joined / REFERRAL_GOAL) * 100));
  const progress = `${joined} of ${REFERRAL_GOAL} friends joined — ${
    REFERRAL_GOAL - joined
  } more and we add a £${REFERRAL_BONUS} bonus on top.`;

  const copyCode = () => {
    copyText(REFERRAL_CODE);
    showToast("Referral code copied");
  };

  const copyLink = () => {
    copyText(`https://${FOOTER_URL}/?ref=${REFERRAL_CODE}`);
    showToast("Invite link copied");
  };

  const sendInvite = () => {
    const email = refEmail.trim();
    if (email.indexOf("@") < 1) {
      showToast("Enter your friend's email", "warn");
      return;
    }
    const name = displayNameFromEmail(email);
    const next: Referral = {
      name,
      initials: initialsFrom(name),
      tint: "#8a6fb0",
      when: "Invited just now",
      st: "invited",
      reward: "Pending",
    };
    set({ referrals: [...referrals, next], refEmail: "" });
    showToast(`Invite sent to ${email}`);
  };

  return (
    <main className="fx-screen fx-page w-820">
      <section className="refer-hero">
        <p className="refer-hero__eyebrow">REFER A FRIEND</p>
        <h1 className="refer-hero__title">Give £20, get £20.</h1>
        <p className="refer-hero__lede">
          Send a friend £20 off their first Hearth device. When their order
          ships, we credit your account £20 — no cap, no expiry.
        </p>
        <div className="refer-hero__row">
          <span className="refer-code">{REFERRAL_CODE}</span>
          <ButtonPrimary
            icon="copy"
            iconSize={16}
            className="refer-copy"
            onClick={copyCode}
          >
            Copy code
          </ButtonPrimary>
          <ButtonSecondary
            icon="link"
            iconSize={16}
            className="refer-copy refer-copy--ghost"
            onClick={copyLink}
          >
            Copy link
          </ButtonSecondary>
        </div>
      </section>

      <div className="refer-two">
        <section className="refer-card refer-card--progress">
          <div className="refer-progress__head">
            <Eyebrow>Your progress</Eyebrow>
            <span className="refer-progress__earned">{earned}</span>
          </div>
          <div className="meter refer-progress__track">
            <span className="meter__fill" style={{ inlineSize: `${pct}%` }} />
          </div>
          <p className="refer-progress__note">{progress}</p>
        </section>

        <section className="refer-card">
          <Eyebrow>Invite by email</Eyebrow>
          <div className="refer-invite">
            <input
              className="fx-fld refer-invite__field"
              type="email"
              value={refEmail}
              placeholder="friend@example.com"
              aria-label="Your friend's email address"
              onChange={(e) => set({ refEmail: e.target.value })}
            />
            <ButtonPrimary
              icon="send"
              iconSize={15}
              className="refer-invite__send"
              onClick={sendInvite}
            >
              Send
            </ButtonPrimary>
          </div>
          <p className="refer-invite__note">
            We send one email, and one reminder a week later. Nothing else,
            ever.
          </p>
        </section>
      </div>

      <Eyebrow>Your referrals</Eyebrow>
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
                {p.label}
              </SoftPill>
              <span className="refer-row__reward">{r.reward}</span>
            </div>
          );
        })}
      </div>

      <p className="refer-legal">
        Credit applies to new customers only and lands once their order ships.
        Referral credit can't be exchanged for cash and doesn't apply to repairs
        or accessories under £30.
      </p>
    </main>
  );
}
