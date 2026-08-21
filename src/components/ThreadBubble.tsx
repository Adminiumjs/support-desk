/*
 * ThreadBubble — one message in a ticket thread (port spec §6.10 step 4).
 * Agent bubbles sit start-aligned with a shadow; customer bubbles mirror to
 * the end and fill with `--accent-soft`.
 */

import { AGENT, CUSTOMER } from "../data/demo";
import { useT } from "../i18n";
import { Avatar } from "./Avatar";
import type { TicketMessage } from "../data/types";

export interface ThreadBubbleProps {
  message: TicketMessage;
  className?: string;
}

/** `<ThreadBubble message={m} />` */
export function ThreadBubble({ message, className }: ThreadBubbleProps) {
  const t = useT();
  const mine = message.who === "customer";
  return (
    <div
      className={`bubble-row${mine ? " bubble-row--customer" : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      <Avatar
        initials={mine ? CUSTOMER.initials : AGENT.initials}
        tint={mine ? CUSTOMER.tint : AGENT.tint}
        size={36}
        fontSize={13}
      />
      <div className="bubble-col">
        <span className="bubble-meta">
          <b>{mine ? t("chrome.thread.you") : AGENT.full}</b>
          <span>{message.time}</span>
        </span>
        <div className={`bubble${mine ? " bubble--customer" : ""}`}>
          {message.text}
        </div>
      </div>
    </div>
  );
}

export default ThreadBubble;
