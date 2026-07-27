/*
 * `overview` — Every screen in the portal (port spec §6.39). Max-width 1120.
 *
 * The catalogue is `dataSource.overviewGroups()`: 8 groups, 39 entries. Every
 * card routes through `ovGo`, which owns the seeding special cases (`chat`
 * opens the widget, `category` lands on setup, `thread` on HH-3117, and so on)
 * so this screen never seeds sub-state itself.
 *
 * `overview` is the one view absent from the catalogue, and `chat` is a
 * pseudo-screen rather than a `ViewId` — so "current" only ever matches a real
 * view id.
 */

import { AccentIconTile, ButtonPrimary, ButtonSecondary } from "../components";
import { OV_COUNT } from "../data/demo";
import { dataSource } from "../data/source";
import { pluralise } from "../lib/format";
import { useAppStore } from "../state/store";
import "../styles/screen-overview.css";

export default function Overview() {
  const GROUPS = dataSource.overviewGroups();

  const view = useAppStore((s) => s.view);
  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  const goHome = useAppStore((s) => s.goHome);
  const ovGo = useAppStore((s) => s.ovGo);

  const dark = theme === "dark";

  return (
    <main className="fx-screen fx-page w-1120 ovw">
      <header className="ovw__head">
        <div className="ovw__intro">
          <p className="ovw__eyebrow">OVERVIEW</p>
          <h1 className="ovw__h1">Every screen in the portal</h1>
          <p className="ovw__lede">
            {OV_COUNT} screens, all interactive. Jump straight to any of them —
            flows link to each other the way they would in production.
          </p>
        </div>
        <div className="ovw__actions">
          <ButtonSecondary
            icon={dark ? "sun" : "moon"}
            onClick={toggleTheme}
          >
            {dark ? "Light theme" : "Dark theme"}
          </ButtonSecondary>
          <ButtonPrimary icon="life-buoy" onClick={goHome}>
            Open the portal
          </ButtonPrimary>
        </div>
      </header>

      <div className="ovw__groups">
        {GROUPS.map((g) => (
          <section className="ovw__group" key={g.name}>
            <div className="ovw__group-head">
              <p className="sd-eyebrow">{g.name}</p>
              <span className="ovw__rule" aria-hidden="true" />
              <span className="ovw__group-count">
                {pluralise(g.items.length, "screen")}
              </span>
            </div>

            <div className="ovw__grid">
              {g.items.map(([id, name, icon, blurb]) => {
                const current = id === view;
                return (
                  <button
                    type="button"
                    key={id}
                    className={`fx-card ovw__card${current ? " ovw__card--on" : ""}`}
                    aria-current={current ? "page" : undefined}
                    onClick={() => ovGo(id)}
                  >
                    <span className="ovw__card-row">
                      <AccentIconTile
                        icon={icon}
                        size={38}
                        radius={11}
                        iconSize={19}
                      />
                      <span className="ovw__card-name">{name}</span>
                      {current ? (
                        <span className="ovw__dot" aria-hidden="true" />
                      ) : null}
                    </span>
                    <span className="ovw__card-blurb">{blurb}</span>
                    <span className="ovw__card-id">{id}</span>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
