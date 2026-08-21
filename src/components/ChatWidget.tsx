/*
 * ChatWidget — the floating FAB and panel (port spec §5.10, logic §8.11).
 * A global overlay, not a view. Store-connected: takes no props.
 *
 * Replies are simulated and deterministic (ruling R4): the bot line is
 * `CHAT_REPLIES[priorUserMessages % 4]`, and the typing indicator runs
 * through the injectable delay helper in lib/thread.ts.
 */

import { useEffect, useRef } from "react";
import { AGENT, BRAND, CHAT_QUICK } from "../data/demo";
import { useI18n } from "../i18n";
import { selectCanEscalate, useAppStore } from "../state/store";
import { Avatar } from "./Avatar";
import { Icon } from "./Icon";
import { AccentIconTile, IconButton } from "./Primitives";
import { TypingDots } from "./TypingDots";

/** The reply promise the status line quotes, in minutes. */
const REPLY_MINUTES = 2;

export function ChatWidget() {
  const { t, number } = useI18n();
  const enabled = useAppStore((s) => s.chatEnabled);
  const open = useAppStore((s) => s.chatOpen);
  const input = useAppStore((s) => s.chatInput);
  const typing = useAppStore((s) => s.chatTyping);
  const quick = useAppStore((s) => s.chatQuick);
  const msgs = useAppStore((s) => s.chatMsgs);
  const canEscalate = useAppStore(selectCanEscalate);
  const set = useAppStore((s) => s.set);
  const openChat = useAppStore((s) => s.openChat);
  const closeChat = useAppStore((s) => s.closeChat);
  const chatAsk = useAppStore((s) => s.chatAsk);
  const chatSubmit = useAppStore((s) => s.chatSubmit);
  const chatAct = useAppStore((s) => s.chatAct);
  const escalateChat = useAppStore((s) => s.escalateChat);

  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [msgs, typing]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeChat();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeChat]);

  if (!enabled) return null;

  if (!open) {
    return (
      <button type="button" className="chat__fab fx-btn" onClick={openChat}>
        <Icon name="message-circle" size={19} />
        {t("chrome.chat.fab")}
        <span className="chat__dot" />
      </button>
    );
  }

  return (
    <div
      className="chat"
      role="dialog"
      aria-label={t("chrome.chat.dialogAria", { brand: BRAND })}
    >
      <div className="chat__head">
        <Avatar initials={AGENT.initials} tint={AGENT.tint} size={38} fontSize={14} />
        <div className="sd-grow sd-col">
          <span className="chat__title">
            {t("chrome.chat.title", { brand: BRAND })}
          </span>
          <span className="chat__status">
            <span className="chat__online" />
            {t("chrome.chat.status", { minutes: number(REPLY_MINUTES) })}
          </span>
        </div>
        <IconButton
          icon="ticket"
          label={t("chrome.chat.escalate")}
          small
          iconSize={17}
          onClick={escalateChat}
        />
        <IconButton
          icon="x"
          label={t("chrome.chat.close")}
          small
          iconSize={17}
          onClick={closeChat}
        />
      </div>

      <div className="chat__log fx-scroll" ref={logRef}>
        {msgs.map((m) => (
          <div key={m.id} className="sd-col" style={{ gap: 8 }}>
            <div
              className={`chat__bubble chat__bubble--${m.who === "you" ? "you" : "bot"}`}
            >
              {m.text}
            </div>
            {m.act ? (
              <button
                type="button"
                className="chat__act fx-gi"
                onClick={() => chatAct(m.act as string)}
              >
                {m.actIcon ? <Icon name={m.actIcon} size={14} /> : null}
                {m.actLabel}
              </button>
            ) : null}
          </div>
        ))}

        {typing ? (
          <TypingDots
            variant="chat"
            bubble
            label={t("chrome.chat.typing", { name: AGENT.name })}
          />
        ) : null}

        {canEscalate ? (
          <button type="button" className="chat__escalate fx-gi" onClick={escalateChat}>
            <AccentIconTile icon="ticket" size={32} radius={10} iconSize={16} />
            <span className="sd-col">
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "-0.01em" }}>
                {t("chrome.chat.escalateTitle")}
              </span>
              <span style={{ fontSize: 12, color: "var(--fg-muted)", lineHeight: 1.45 }}>
                {t("chrome.chat.escalateText")}
              </span>
            </span>
          </button>
        ) : null}

        {quick ? (
          <div className="chat__quick">
            <p className="sd-eyebrow">{t("chrome.chat.quickHead")}</p>
            {CHAT_QUICK.map((qr, i) => (
              <button
                key={qr.label}
                type="button"
                className="fx-chip"
                onClick={() => chatAsk(i)}
              >
                {qr.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="chat__composer">
        <input
          className="fx-fld"
          value={input}
          aria-label={t("chrome.chat.inputLabel")}
          placeholder={t("chrome.chat.inputPlaceholder")}
          onChange={(e) => set({ chatInput: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              chatSubmit();
            }
          }}
        />
        <button
          type="button"
          className="chat__send fx-btn"
          title={t("chrome.chat.send")}
          aria-label={t("chrome.chat.sendLabel")}
          disabled={!input.trim()}
          onClick={chatSubmit}
        >
          <Icon name="send" size={17} />
        </button>
      </div>

      <p className="chat__note">{t("chrome.chat.note")}</p>
    </div>
  );
}

export default ChatWidget;
