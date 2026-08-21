/*
 * Header — the sticky bar on every screen (port spec §5.7), including the
 * live search dropdown.
 *
 * Store-connected: takes no props.
 *
 * Ruling R5: the 980 / 1120 switches are real CSS media queries. The nav and
 * the CTA carry `.hdr-nav` / `.hdr-cta`, the hamburger `.hdr-menu-btn`, the
 * inline field `.hdr-search-field` and the fallback button `.hdr-search-btn`;
 * the responsive block at the END of components.css decides which of each pair
 * is visible. It has to live there, not in base.css: these rules toggle
 * `display` on elements that also carry `.sd-iconbtn` / `.sd-btn`, and
 * components.css is imported after base.css — at equal specificity the later
 * sheet wins.
 */

import { Fragment, useEffect, useMemo, useRef } from "react";
import { BRAND } from "../data/demo";
import { dataSource } from "../data/source";
import { useT } from "../i18n";
import { readTimeShort } from "../lib/format";
import { headerSearch } from "../lib/search";
import { HEADER_BLUR_MS, useAppStore } from "../state/store";
import { Icon } from "./Icon";
import { LocalePicker } from "./LocalePicker";
import { IconChip } from "./PlaceholderTile";
import { ButtonPrimary, IconButton } from "./Primitives";
import { NAV_LINKS, slots } from "./chrome";

export function Header() {
  const t = useT();
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
        /* Below 1120 the inline field is `display: none`: it is still in the
         * DOM, but focusing it is a no-op. Fall back to the search screen so
         * the documented shortcut is never a dead key (ruling R5 / R2). */
        const field = inputRef.current;
        if (field && field.offsetParent !== null) {
          field.focus();
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
      <div className="hdr__bar w-1120 fx-wide">
        <button type="button" className="hdr__logo fx-nav" onClick={goHome}>
          <span className="hdr__mark">
            <Icon name="life-buoy" size={19} />
          </span>
          <span className="hdr__word">
            {/* `.hdr__word span` is the subtle half, so the brand stays a bare
              * text node and whatever the translator puts around it is the
              * span — in any word order. */}
            {slots(t("chrome.header.wordmark")).map((part, i) =>
              part === "{brand}" ? (
                <Fragment key={i}>{BRAND}</Fragment>
              ) : (
                <span key={i}>{part}</span>
              ),
            )}
          </span>
        </button>

        <nav className="hdr__nav hdr-nav" aria-label={t("chrome.header.navAria")}>
          {NAV_LINKS.map((l) => (
            <button
              key={l.view}
              type="button"
              className="hdr__navitem fx-nav"
              aria-current={l.active.includes(view) ? "page" : undefined}
              onClick={() => go(l.view)}
            >
              <Icon name={l.icon} size={15} />
              {t(l.label)}
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
              className="fx-fld"
              value={hq}
              aria-label={t("chrome.header.searchLabel")}
              placeholder={t("chrome.header.searchPlaceholder")}
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
                    {t("chrome.header.noMatch")}
                  </div>
                ) : (
                  <>
                    {results.map((a) => {
                      const cat = dataSource.category(a.cat);
                      return (
                        <button
                          key={a.id}
                          type="button"
                          className="sd-drop__row fx-res"
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
                              {t("chrome.header.resultMeta", {
                                category: cat?.name ?? "",
                                read: readTimeShort(a.read),
                              })}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      className="sd-drop__all fx-res"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        gotoKb(hq);
                        set({ hqFocus: false });
                      }}
                    >
                      {t("chrome.header.seeAll", { query: hq })}
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
            label={t("chrome.header.searchLabel")}
            showLabel={labels}
            onClick={() => gotoKb()}
          />
          {/* Both are desktop-only (see the responsive block in components.css):
           * ⌘K means nothing on touch, and the overview is linked from the
           * footer on every page. Below 980px the bar cannot fit five icons
           * beside the wordmark without overflowing the viewport. */}
          <IconButton
            className="hdr-cmd-btn"
            icon="command"
            label={t("chrome.header.paletteLabel")}
            showLabel={labels}
            onClick={cpToggle}
          />
          <IconButton
            className="hdr-grid-btn"
            icon="layout-grid"
            label={t("chrome.crumb.overview")}
            showLabel={labels}
            onClick={gotoOverview}
          />
          {/* Gated at 560px with the other header extras — below that the
            * MobileSheet carries the picker instead, so no viewport loses the
            * ability to change language. */}
          <LocalePicker className="hdr-lang-ctl" />
          <IconButton
            icon={theme === "dark" ? "sun" : "moon"}
            label={t("chrome.header.toggleTheme")}
            showLabel={labels}
            onClick={toggleTheme}
          />
          <ButtonPrimary
            className="hdr-cta"
            size="sm"
            icon="pen-line"
            onClick={openTicket}
          >
            {t("chrome.link.openTicket")}
          </ButtonPrimary>
          <IconButton
            className="hdr-menu-btn"
            icon="menu"
            label={t("chrome.header.menu")}
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
