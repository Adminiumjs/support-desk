/*
 * CommandPalette — ⌘K (port spec §5.4, ranking §10.4).
 * Store-connected: takes no props.
 *
 * Ruling R6 adds `role="dialog"`, `aria-modal`, a focus trap and a listbox
 * relationship the comp did not have.
 */

import { useEffect, useMemo, useRef } from "react";
import { useT } from "../i18n";
import { rankCommands, showsGroupHeader } from "../lib/search";
import { trapFocus } from "../lib/a11y";
import { useAppStore } from "../state/store";
import { Icon } from "./Icon";

export function CommandPalette() {
  const t = useT();
  const open = useAppStore((s) => s.cpOpen);
  const q = useAppStore((s) => s.cpQ);
  const index = useAppStore((s) => s.cpIndex);
  const setQuery = useAppStore((s) => s.cpSetQuery);
  const move = useAppStore((s) => s.cpMove);
  const close = useAppStore((s) => s.cpClose);
  const ask = useAppStore((s) => s.cpAsk);
  const commands = useAppStore((s) => s.commands);
  const set = useAppStore((s) => s.set);

  const cardRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const rows = useMemo(
    () => (open ? rankCommands(commands(), q) : []),
    [open, q, commands],
  );

  useEffect(() => {
    if (!open) return;
    const node = cardRef.current;
    const release = node ? trapFocus(node) : () => {};
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      clearTimeout(t);
      release();
    };
  }, [open]);

  if (!open) return null;

  const run = (i: number) => {
    const cmd = rows[i];
    if (!cmd) return;
    /* state is reset before the command runs, as the comp does */
    set({ cpOpen: false, cpQ: "", cpIndex: 0 });
    cmd.run();
  };

  return (
    <div className="cp__scrim" onClick={close}>
      <div
        ref={cardRef}
        className="cp"
        role="dialog"
        aria-modal="true"
        aria-label={t("chrome.cp.title")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cp__inputrow">
          <Icon name="search" size={18} color="var(--fg-subtle)" />
          <input
            ref={inputRef}
            className="cp__input"
            value={q}
            aria-label={t("chrome.cp.inputLabel")}
            placeholder={t("chrome.cp.inputPlaceholder")}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                move(1, rows.length);
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                move(-1, rows.length);
              } else if (e.key === "Enter") {
                e.preventDefault();
                run(index);
              } else if (e.key === "Escape") {
                e.preventDefault();
                close();
              }
            }}
          />
          <kbd className="sd-kbd sd-kbd--sm">esc</kbd>
        </div>

        <div className="cp__list fx-scroll" role="listbox" aria-label={t("chrome.cp.results")}>
          {rows.length === 0 ? (
            <div className="cp__empty">
              <Icon name="search-x" size={24} />
              <span style={{ fontSize: 14, fontWeight: 700 }}>
                {t("chrome.cp.noMatch", { query: q })}
              </span>
              <button type="button" className="sd-btn-ghost fx-gi" onClick={ask}>
                <Icon name="pen-line" size={14} />
                {t("chrome.cp.askInstead")}
              </button>
            </div>
          ) : (
            rows.map((c, i) => (
              <div key={c.id}>
                {showsGroupHeader(rows, i) ? (
                  <div className="cp__group">{c.group}</div>
                ) : null}
                <button
                  type="button"
                  role="option"
                  aria-selected={i === index}
                  className={`cp__row${i === index ? " cp__row--on" : ""}`}
                  onMouseEnter={() => set({ cpIndex: i })}
                  onClick={() => run(i)}
                >
                  <span className="cp__chip">
                    <Icon name={c.icon} size={16} />
                  </span>
                  <span className="cp__label">{c.label}</span>
                  <span className="cp__hint">{c.hint}</span>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cp__footer">
          <span>
            <kbd className="sd-kbd sd-kbd--sm">↑</kbd>{" "}
            <kbd className="sd-kbd sd-kbd--sm">↓</kbd> {t("chrome.cp.move")}
          </span>
          <span>
            <kbd className="sd-kbd sd-kbd--sm">↵</kbd> {t("chrome.cp.run")}
          </span>
          <span className="cp__footer-end">
            <kbd className="sd-kbd sd-kbd--sm">?</kbd> {t("chrome.cp.allShortcuts")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;
