/*
 * Header — the sticky bar on every screen (port spec §5.7), including the
 * live search dropdown.
 *
 * Store-connected: takes no props.
 *
 * Ruling R5: the 980 / 1120 switches are real CSS media queries. The nav and
 * the CTA carry `.hdr-nav` / `.hdr-cta`, the hamburger `.hdr-menu-btn`, the
 * inline field `.hdr-search-field` and the fallback button `.hdr-search-btn`;
 * base.css decides which of each pair is visible.
 */

import { useEffect, useMemo, useRef } from "react";
import { BRAND } from "../data/demo";
import { dataSource } from "../data/source";
import { headerSearch } from "../lib/search";
import { HEADER_BLUR_MS, useAppStore } from "../state/store";
import { Icon } from "./Icon";
import { IconChip } from "./PlaceholderTile";
import { ButtonPrimary, IconButton } from "./Primitives";
import { NAV_LINKS } from "./chrome";

export function Header() {
  const view = useAppStore((s) => s.view);
  const theme = useAppStore((s) => s.theme);
  const hq = useAppStore((s) => s.hq);
  const hqFocus = useAppStore((s) => s.hqFocus);
  const labels = useAppStore((s) => s.a11y.on.labels);
  const set = useAppStore((s) => s.set);
  const go = useAppStore((s) => s.go);
  const goHome = useAppStore((s) => s.goHome);
  const gotoKb = useAppStore((s) => s.gotoKb);
  const gotoOverview = useAppStore((s) => s.gotoOverview);
  const openTicket = useAppStore((s) => s.openTicket);
  const openArticle = useAppStore((s) => s.openArticle);
  const openMenu = useAppStore((s) => s.openMenu);
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  const cpToggle = useAppStore((s) => s.cpToggle);

  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(
    () => headerSearch(dataSource.articles(), hq),
    [hq],
  );

  useEffect(() => {
    /* `/` focuses the header search from anywhere. */
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      const typing =
        el instanceof HTMLElement &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.tagName === "SELECT" ||
          el.isContentEditable);
      if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "/") {
        e.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
          set({ hqFocus: true });
        } else {
          gotoKb("");
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (blurTimer.current) clearTimeout(blurTimer.current);
    };
  }, [set, gotoKb]);

  const dropOpen = hqFocus && hq.length > 0;

  return (
    <header className="hdr">
      <div className="hdr__bar">
        <button type="button" className="hdr__logo oh-nav" onClick={goHome}>
          <span className="hdr__mark">
            <Icon name="life-buoy" size={19} />
          </span>
          <span className="hdr__word">
            {BRAND} <span>Help</span>
          </span>
        </button>

        <nav className="hdr__nav hdr-nav" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <button
              key={l.view}
              type="button"
              className="hdr__navitem oh-nav"
              aria-current={l.active.includes(view) ? "page" : undefined}
              onClick={() => go(l.view)}
            >
              <Icon name={l.icon} size={15} />
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hdr__right">
          <div className="hdr__search hdr-search-field">
            <span className="hdr__search-ico">
              <Icon name="search" size={15} />
            </span>
            <input
              ref={inputRef}
              className="oh-fld"
              value={hq}
              aria-label="Search help"
              placeholder="Search help…"
              onChange={(e) => set({ hq: e.target.value, hqFocus: true })}
              onFocus={() => set({ hqFocus: true })}
              onBlur={() => {
                if (blurTimer.current) clearTimeout(blurTimer.current);
                blurTimer.current = setTimeout(
                  () => set({ hqFocus: false }),
                  HEADER_BLUR_MS,
                );
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  gotoKb(hq);
                  set({ hqFocus: false });
                } else if (e.key === "Escape") {
                  set({ hq: "", hqFocus: false });
                }
              }}
            />
            <span className="hdr__search-key">/</span>

            {dropOpen ? (
              <div className="sd-drop">
                {results.length === 0 ? (
                  <div className="sd-drop__empty">
                    <Icon name="search-x" size={20} />
                    Nothing matched — try fewer words.
                  </div>
                ) : (
                  <>
                    {results.map((a) => {
                      const cat = dataSource.category(a.cat);
                      return (
                        <button
                          key={a.id}
                          type="button"
                          className="sd-drop__row oh-res"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            openArticle(a.id);
                            set({ hqFocus: false });
                          }}
                        >
                          <IconChip
                            tint={cat?.tint ?? "#4f8bd6"}
                            icon={cat?.icon ?? "file-text"}
                            size={32}
                            radius={10}
                            iconSize={16}
                          />
                          <span className="sd-col sd-grow">
                            <span style={{ fontSize: 13.5, fontWeight: 700 }}>
                              {a.title}
                            </span>
                            <span
                              style={{ fontSize: 11.5, color: "var(--fg-subtle)" }}
                            >
                              {cat?.name} · {a.read} min
                            </span>
                          </span>
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      className="sd-drop__all oh-res"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        gotoKb(hq);
                        set({ hqFocus: false });
                      }}
                    >
                      See all results for “{hq}”
                      <Icon name="arrow-right" size={14} />
                    </button>
                  </>
                )}
              </div>
            ) : null}
          </div>

          <IconButton
            className="hdr-search-btn"
            icon="search"
            label="Search help"
            showLabel={labels}
            onClick={() => gotoKb()}
          />
          <IconButton
            icon="command"
            label="Command palette — ⌘K"
            showLabel={labels}
            onClick={cpToggle}
          />
          <IconButton
            icon="layout-grid"
            label="All screens"
            showLabel={labels}
            onClick={gotoOverview}
          />
          <IconButton
            icon={theme === "dark" ? "sun" : "moon"}
            label="Toggle theme"
            showLabel={labels}
            onClick={toggleTheme}
          />
          <ButtonPrimary
            className="hdr-cta"
            size="sm"
            icon="pen-line"
            onClick={openTicket}
          >
            Open a ticket
          </ButtonPrimary>
          <IconButton
            className="hdr-menu-btn"
            icon="menu"
            label="Menu"
            iconSize={20}
            showLabel={labels}
            onClick={openMenu}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
