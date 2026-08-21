/*
 * TypingDots — three blinking dots (port spec §3.5). The thread uses the 7px
 * / 1.3s pair inside a bubble; the chat widget uses the 6px / 1.2s pair.
 *
 * `.fx-nomotion` freezes the animation for reduce-motion users.
 */

import { useT } from "../i18n";

export interface TypingDotsProps {
  /** `thread` = 7px dots at 1.3s; `chat` = 6px dots at 1.2s. */
  variant?: "thread" | "chat";
  /** Wraps the dots in the agent bubble shell. */
  bubble?: boolean;
  /** Accessible status text announced to screen readers. Defaults to the
   * generic "someone is typing" line. */
  label?: string;
  className?: string;
}

/** `<TypingDots bubble />` */
export function TypingDots({
  variant = "thread",
  bubble = false,
  label,
  className,
}: TypingDotsProps) {
  const t = useT();
  const status = label ?? t("chrome.chat.agentTyping");
  const dots = (
    <span
      className={`dots${variant === "chat" ? " dots--sm" : ""}${
        !bubble && className ? ` ${className}` : ""
      }`}
      role="status"
      aria-live="polite"
      aria-label={status}
    >
      <span />
      <span />
      <span />
    </span>
  );
  if (!bubble) return dots;
  return (
    <div className={`dots-bubble${className ? ` ${className}` : ""}`}>{dots}</div>
  );
}

export default TypingDots;
