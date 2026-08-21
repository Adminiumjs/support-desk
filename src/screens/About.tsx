/*
 * `about` — About us (port spec §6.37). Max-width 1000.
 *
 * Fully static: the comp builds no `aboutVals()`, only two navigation
 * handlers. The team tiles and the workshop panel are procedural gradients
 * (§2.6 / §2.8), not bitmaps — the workshop panel is the one placeholder keyed
 * off `--accent` rather than a per-entity tint, so it uses a local class
 * instead of `<PlaceholderTile>`.
 *
 * The three stat figures go through `Intl` rather than being authored as
 * strings: `1.2M` is `1,2 Mio.` in German and `١٫٢ مليون` in Arabic, and the
 * founding year must not pick up digit grouping.
 */

import { ButtonPrimary, ButtonSecondary, Icon, hexToRgba, useIsDark } from "../components";
import { useI18n, type MessageKey } from "../i18n";
import { useAppStore } from "../state/store";
import "../styles/screen-about.css";

/** Icon + the two message keys behind one value card. */
const VALUES: { icon: string; title: MessageKey; body: MessageKey }[] = [
  {
    icon: "user-round",
    title: "screensA.about.value1Title",
    body: "screensA.about.value1Body",
  },
  {
    icon: "lock",
    title: "screensA.about.value2Title",
    body: "screensA.about.value2Body",
  },
  {
    icon: "recycle",
    title: "screensA.about.value3Title",
    body: "screensA.about.value3Body",
  },
];

/* Names are in-fiction demo content (§3.4) and stay as authored; the job
   titles beside them are UI labels and are keyed. */
const TEAM: { initials: string; tint: string; name: string; role: MessageKey }[] = [
  { initials: "MA", tint: "#4f8bd6", name: "Maya Aturi", role: "screensA.about.role1" },
  { initials: "TR", tint: "#5f9e6b", name: "Tomas Reis", role: "screensA.about.role2" },
  { initials: "JN", tint: "#8a6fb0", name: "Jo Nkemdi", role: "screensA.about.role3" },
  { initials: "EL", tint: "#c0865f", name: "Elin Vasquez", role: "screensA.about.role4" },
];

export default function About() {
  const go = useAppStore((s) => s.go);
  const goHome = useAppStore((s) => s.goHome);
  const dark = useIsDark();
  const { t, number } = useI18n();

  const stats = [
    /* A year is a number, not a quantity — no grouping separator. */
    { value: number(2015, { useGrouping: false }), caption: t("screensA.about.stat1") },
    {
      value: number(1_200_000, { notation: "compact", maximumFractionDigits: 1 }),
      caption: t("screensA.about.stat2"),
    },
    {
      value: number(42),
      caption: t("screensA.about.stat3", { count: number(9) }),
    },
  ];

  return (
    <main className="fx-screen fx-page w-1000 fx-wide abt">
      <p className="abt__eyebrow">{t("screensA.about.eyebrow")}</p>
      <h1 className="abt__h1">{t("screensA.about.h1")}</h1>
      <p className="abt__lede">{t("screensA.about.lede")}</p>

      <div className="abt__stats">
        {stats.map((s) => (
          <div className="sd-card abt__stat" key={s.caption}>
            <p className="abt__stat-value">{s.value}</p>
            <p className="abt__stat-caption">{s.caption}</p>
          </div>
        ))}
      </div>

      <section className="abt__twoup">
        <div className="abt__twoup-text">
          <h2 className="abt__h2 abt__h2--tight">
            {t("screensA.about.h2Products")}
          </h2>
          <p className="abt__body">{t("screensA.about.body1")}</p>
          <p className="abt__body">{t("screensA.about.body2")}</p>
        </div>
        <div className="abt__panel">
          <Icon name="home" size={74} className="abt__panel-icon" />
          <span className="abt__fname">workshop-bristol.jpg</span>
        </div>
      </section>

      <h2 className="abt__h2">{t("screensA.about.h2Values")}</h2>
      <div className="abt__values">
        {VALUES.map((v) => (
          <div className="sd-card abt__value" key={v.title}>
            <span className="sd-accent-tile abt__value-tile">
              <Icon name={v.icon} size={21} />
            </span>
            <p className="abt__value-title">{t(v.title)}</p>
            <p className="abt__value-body">{t(v.body)}</p>
          </div>
        ))}
      </div>

      <h2 className="abt__h2">{t("screensA.about.h2Team")}</h2>
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
            <p className="abt__member-role">{t(m.role)}</p>
          </div>
        ))}
      </div>

      <div className="abt__cta">
        <div className="abt__cta-text">
          <h2 className="abt__cta-title">{t("screensA.about.ctaTitle")}</h2>
          <p className="abt__cta-body">{t("screensA.about.ctaBody")}</p>
        </div>
        <div className="abt__cta-actions">
          <ButtonPrimary icon="mail" onClick={() => go("contact")}>
            {t("screensA.about.contact")}
          </ButtonPrimary>
          <ButtonSecondary icon="life-buoy" iconSize={16} onClick={goHome}>
            {t("screensA.about.helpCenter")}
          </ButtonSecondary>
        </div>
      </div>
    </main>
  );
}
