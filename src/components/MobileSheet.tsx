/*
 * MobileSheet — the top-dropping menu behind the hamburger (port spec §5.6).
 * Store-connected: takes no props.
 *
 * Ruling R6 adds `role="dialog"`, `aria-modal`, a focus trap and Escape.
 */

import { useEffect, useRef } from "react";
import { useT } from "../i18n";
import { trapFocus } from "../lib/a11y";
import { useAppStore } from "../state/store";
import { Icon } from "./Icon";
import { LocalePicker } from "./LocalePicker";
import { NAV_LINKS } from "./chrome";
import { ButtonPrimary, IconButton } from "./Primitives";

export function MobileSheet() {
  const t = useT();
  const open = useAppStore((s) => s.menu);
  const chatEnabled = useAppStore((s) => s.chatEnabled);
  const close = useAppStore((s) => s.closeMenu);
  const go = useAppStore((s) => s.go);
  const cpToggle = useAppStore((s) => s.cpToggle);
  const openChat = useAppStore((s) => s.openChat);
  const openTicket = useAppStore((s) => s.openTicket);

  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const node = sheetRef.current;
    const release = node ? trapFocus(node) : () => {};
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      release();
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div className="sheet__scrim" onClick={close}>
      <div
        ref={sheetRef}
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-label={t("chrome.header.menu")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet__head">
          <span className="sheet__title">{t("chrome.header.menu")}</span>
          <IconButton icon="x" label={t("chrome.sheet.close")} onClick={close} />
        </div>

        <div className="sheet__list">
          {NAV_LINKS.map((l) => (
            <button
              key={l.view}
              type="button"
              className="sheet__item fx-gi"
              onClick={() => go(l.view)}
            >
              <Icon name={l.icon} size={18} color="var(--fg-muted)" />
              {t(l.label)}
            </button>
          ))}

          <button type="button" className="sheet__item fx-gi" onClick={cpToggle}>
            <Icon name="command" size={18} color="var(--fg-muted)" />
            <span className="sd-grow" style={{ textAlign: "start" }}>
              {t("chrome.cp.title")}
            </span>
            <span className="sd-mono" style={{ fontSize: 11 }}>
              ⌘K
            </span>
          </button>

          {chatEnabled ? (
            <button type="button" className="sheet__item fx-gi" onClick={openChat}>
              <Icon name="message-circle" size={18} color="var(--fg-muted)" />
              <span className="sd-grow" style={{ textAlign: "start" }}>
                {t("chrome.link.liveChat")}
              </span>
              <span
                className="sd-row"
                style={{ gap: 6, fontSize: 11.5, fontWeight: 700, color: "var(--pos)" }}
              >
                <span className="chat__online" />
                {t("chrome.chat.online")}
              </span>
            </button>
          ) : null}

          {/* The header's picker is hidden below 560px; this is where a phone
            * changes language. The picker carries its own globe and its own
            * accessible name, so the row is just a container. */}
          <div className="sheet__item sheet__item--static">
            <LocalePicker variant="block" />
          </div>
        </div>

        <ButtonPrimary
          block
          size="md"
          icon="pen-line"
          iconSize={17}
          onClick={openTicket}
          style={{ marginBlockStart: 12 }}
        >
          {t("chrome.link.openTicket")}
        </ButtonPrimary>
      </div>
    </div>
  );
}

export default MobileSheet;
