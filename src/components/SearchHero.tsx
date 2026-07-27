/*
 * SearchHero — the home hero: eyebrow, display heading, lede and the big
 * search field with its live dropdown (port spec §6.1 A).
 *
 * Store-connected: takes no props.
 *
 * Ruling R2 fix — the comp styled "open a ticket" in the no-results line like
 * a link but attached no handler. It is a real button here.
 */

import { useEffect, useRef, useState } from "react";
import { BRAND } from "../data/demo";
import { dataSource } from "../data/source";
import { heroSearch } from "../lib/search";
import { HERO_BLUR_MS, useAppStore } from "../state/store";
import { Icon } from "./Icon";
import { IconChip } from "./PlaceholderTile";

export function SearchHero() {
  const q = useAppStore((s) => s.q);
  const searchFocus = useAppStore((s) => s.searchFocus);
  const set = useAppStore((s) => s.set);
  const gotoKb = useAppStore((s) => s.gotoKb);
  const openArticle = useAppStore((s) => s.openArticle);
  const openTicket = useAppStore((s) => s.openTicket);

  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [results, setResults] = useState(() => heroSearch(dataSource.articles(), q));

  useEffect(() => {
    setResults(heroSearch(dataSource.articles(), q));
  }, [q]);

  useEffect(
    () => () => {
      if (blurTimer.current) clearTimeout(blurTimer.current);
    },
    [],
  );

  const open = searchFocus && q.length > 0;

  return (
    <section className="hero">
      <div className="hero__inner">
        <span className="hero__eyebrow">
          <Icon name="sparkles" size={13} />
          {BRAND} Help Center
        </span>
        <h1>How can we help?</h1>
        <p className="hero__lede">
          Search our guides for smart thermostats, doorbells, plugs, and sensors
          — or open a ticket and a real person gets back to you.
        </p>

        <div className="hero__field">
          <span className="hero__ico">
            <Icon name="search" size={20} />
          </span>
          <input
            className="oh-fld"
            value={q}
            aria-label="Search help articles"
            placeholder={'Try "doorbell wifi" or "factory reset"'}
            onChange={(e) => set({ q: e.target.value, searchFocus: true })}
            onFocus={() => set({ searchFocus: true })}
            onBlur={() => {
              if (blurTimer.current) clearTimeout(blurTimer.current);
              blurTimer.current = setTimeout(
                () => set({ searchFocus: false }),
                HERO_BLUR_MS,
              );
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") gotoKb(q);
            }}
          />
          {q ? (
            <button
              type="button"
              className="hero__clear oh-gi"
              aria-label="Clear search"
              onMouseDown={(e) => {
                e.preventDefault();
                set({ q: "" });
              }}
            >
              <Icon name="x" size={16} />
            </button>
          ) : null}

          {open ? (
            <div className="hero__drop oh-scroll">
              {results.length === 0 ? (
                <div
                  style={{
                    padding: "22px 16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13.5,
                    color: "var(--fg-muted)",
                  }}
                >
                  <Icon name="search-x" size={22} />
                  <span>
                    No articles match that yet. Try fewer words, or{" "}
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        openTicket();
                      }}
                      style={{
                        border: "none",
                        background: "transparent",
                        padding: 0,
                        font: "inherit",
                        fontWeight: 700,
                        color: "var(--accent)",
                        cursor: "pointer",
                      }}
                    >
                      open a ticket
                    </button>
                    .
                  </span>
                </div>
              ) : (
                results.map((a) => {
                  const cat = dataSource.category(a.cat);
                  return (
                    <button
                      key={a.id}
                      type="button"
                      className="hero__res oh-res"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        openArticle(a.id);
                      }}
                    >
                      <IconChip
                        tint={cat?.tint ?? "#4f8bd6"}
                        icon={cat?.icon ?? "file-text"}
                        size={34}
                        radius={10}
                        iconSize={17}
                      />
                      <span className="sd-col sd-grow">
                        <span className="hero__res-title">{a.title}</span>
                        <span className="hero__res-snippet">{a.snippet}</span>
                      </span>
                      <span className="hero__res-cat">{cat?.name}</span>
                    </button>
                  );
                })
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default SearchHero;
