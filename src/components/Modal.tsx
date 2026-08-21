/*
 * Modal — the generic overlay pattern the shortcuts sheet established
 * (port spec §5.5). Ruling R6 adds what the comp lacked: `role="dialog"`,
 * `aria-modal`, a focus trap, Escape handling and body scroll locking.
 */

import { useEffect, useId, useRef } from "react";
import { useT } from "../i18n";
import { trapFocus } from "../lib/a11y";
import { AccentIconTile } from "./Primitives";
import { IconButton } from "./Primitives";
import type { ReactNode } from "react";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Secondary line under the title. */
  subtitle?: ReactNode;
  /** Kebab-case lucide name for the accent header tile. */
  icon?: string;
  children: ReactNode;
  /** Hides the default header — for fully custom overlays. */
  bare?: boolean;
  className?: string;
}

/**
 * `<Modal open={shortcuts} onClose={scClose} title="Keyboard shortcuts" icon="keyboard">…</Modal>`
 */
export function Modal({
  open,
  onClose,
  title,
  subtitle,
  icon,
  children,
  bare = false,
  className,
}: ModalProps) {
  const t = useT();
  const cardRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const node = cardRef.current;
    const release = node ? trapFocus(node) : () => {};
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      release();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal__scrim" onClick={onClose}>
      <div
        ref={cardRef}
        className={`modal fx-scroll${className ? ` ${className}` : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        {bare ? null : (
          <div className="modal__head">
            {icon ? <AccentIconTile icon={icon} size={40} radius={12} iconSize={20} /> : null}
            <div className="sd-grow">
              <h2 className="modal__title" id={titleId}>
                {title}
              </h2>
              {subtitle ? <p className="modal__sub">{subtitle}</p> : null}
            </div>
            <IconButton
              icon="x"
              label={t("chrome.action.close")}
              small
              iconSize={17}
              onClick={onClose}
            />
          </div>
        )}
        {bare ? (
          <span className="sr-only" id={titleId}>
            {title}
          </span>
        ) : null}
        {children}
      </div>
    </div>
  );
}

export default Modal;
