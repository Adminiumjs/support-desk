/*
 * `about` — About us (port spec §6.37). Max-width 1000.
 *
 * Fully static: the comp builds no `aboutVals()`, only two navigation
 * handlers. The team tiles and the workshop panel are procedural gradients
 * (§2.6 / §2.8), not bitmaps — the workshop panel is the one placeholder keyed
 * off `--accent` rather than a per-entity tint, so it uses a local class
 * instead of `<PlaceholderTile>`.
 */

import { ButtonPrimary, ButtonSecondary, Icon, hexToRgba, useIsDark } from "../components";
import { useAppStore } from "../state/store";
import "../styles/screen-about.css";

interface Stat {
  value: string;
  caption: string;
}

const STATS: Stat[] = [
  { value: "2015", caption: "Founded in Bristol" },
  { value: "1.2M", caption: "Homes running Hearth" },
  { value: "42", caption: "People, 9 of them on support" },
];

interface Value {
  icon: string;
  title: string;
  body: string;
}

const VALUES: Value[] = [
  {
    icon: "user-round",
    title: "A human answers",
    body: "No phone trees, no bot-only queues. Median first reply is under two hours on weekdays.",
  },
  {
    icon: "lock",
    title: "Your home, your data",
    body: "Video clips are encrypted end to end and never sold, shared, or used to train anything.",
  },
  {
    icon: "recycle",
    title: "Built to be fixed",
    body: "Spare parts for seven years, free repair guides, and a trade-in credit for old units.",
  },
];

interface TeamMember {
  initials: string;
  tint: string;
  name: string;
  role: string;
}

const TEAM: TeamMember[] = [
  { initials: "MA", tint: "#4f8bd6", name: "Maya Aturi", role: "Support lead" },
  { initials: "TR", tint: "#5f9e6b", name: "Tomas Reis", role: "Hardware diagnostics" },
  { initials: "JN", tint: "#8a6fb0", name: "Jo Nkemdi", role: "Community manager" },
  { initials: "EL", tint: "#c0865f", name: "Elin Vasquez", role: "Returns & warranty" },
];

export default function About() {
  const go = useAppStore((s) => s.go);
  const goHome = useAppStore((s) => s.goHome);
  const dark = useIsDark();

  return (
    <main className="oh-screen oh-page w-1000 abt">
      <p className="abt__eyebrow">ABOUT HEARTH</p>
      <h1 className="abt__h1">We build home tech that gets out of the way.</h1>
      <p className="abt__lede">
        Hearth started in a Bristol workshop in 2015 with one stubborn idea: a
        smart home should feel calmer than a normal one. Ten years on, we still
        ship every device with a printed quick-start card and a phone number
        that a human answers.
      </p>

      <div className="abt__stats">
        {STATS.map((s) => (
          <div className="sd-card abt__stat" key={s.value}>
            <p className="abt__stat-value">{s.value}</p>
            <p className="abt__stat-caption">{s.caption}</p>
          </div>
        ))}
      </div>

      <section className="abt__twoup">
        <div className="abt__twoup-text">
          <h2 className="abt__h2 abt__h2--tight">Fewer devices, better ones</h2>
          <p className="abt__body">
            We make four products. That's on purpose — it means every one of
            them gets firmware support for at least seven years, and our support
            team knows all of them inside out.
          </p>
          <p className="abt__body">
            Everything is designed in Bristol and assembled in Portugal. Our
            packaging has been plastic-free since 2021, and any Hearth device
            can be repaired rather than replaced.
          </p>
        </div>
        <div className="abt__panel">
          <Icon name="home" size={74} className="abt__panel-icon" />
          <span className="abt__fname">workshop-bristol.jpg</span>
        </div>
      </section>

      <h2 className="abt__h2">What we hold to</h2>
      <div className="abt__values">
        {VALUES.map((v) => (
          <div className="sd-card abt__value" key={v.title}>
            <span className="sd-accent-tile abt__value-tile">
              <Icon name={v.icon} size={21} />
            </span>
            <p className="abt__value-title">{v.title}</p>
            <p className="abt__value-body">{v.body}</p>
          </div>
        ))}
      </div>

      <h2 className="abt__h2">The support team</h2>
      <div className="abt__team">
        {TEAM.map((m) => (
          <div className="abt__member" key={m.initials}>
            <div
              className="abt__member-tile"
              style={{
                background: `linear-gradient(155deg, ${hexToRgba(
                  m.tint,
                  0.24,
                )}, ${hexToRgba(m.tint, 0.08)})`,
              }}
            >
              <span
                className="abt__member-initials"
                style={{ color: hexToRgba(m.tint, dark ? 0.95 : 0.85) }}
              >
                {m.initials}
              </span>
            </div>
            <p className="abt__member-name">{m.name}</p>
            <p className="abt__member-role">{m.role}</p>
          </div>
        ))}
      </div>

      <div className="abt__cta">
        <div className="abt__cta-text">
          <h2 className="abt__cta-title">Got a question about your Hearth?</h2>
          <p className="abt__cta-body">
            Start in the help center, or talk to the team directly — whichever
            is quicker for you.
          </p>
        </div>
        <div className="abt__cta-actions">
          <ButtonPrimary icon="mail" onClick={() => go("contact")}>
            Contact us
          </ButtonPrimary>
          <ButtonSecondary icon="life-buoy" iconSize={16} onClick={goHome}>
            Help center
          </ButtonSecondary>
        </div>
      </div>
    </main>
  );
}
