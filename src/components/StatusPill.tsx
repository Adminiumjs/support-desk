/*
 * StatusPill — `pillStyle` / `softPill` (port spec §4.2).
 *
 * `<StatusPill status={ticket.status} />` covers the four ticket statuses.
 * Every other family (orders, devices, appointments, parts stock, roles…)
 * uses the same shape with its own tone + label, so the generic `<SoftPill>`
 * is exported alongside.
 */

import { Icon } from "./Icon";
import { statusMeta } from "../lib/thread";
import type { ReactNode } from "react";

export interface StatusPillProps {
  /** One of `open` | `pending` | `solved` | `closed`. Unknown falls back to open. */
  status: string;
  /** Icon size in px — 13 normally, 14 on the orders summary. */
  iconSize?: number;
  className?: string;
}

/** `<StatusPill status={ticket.status} />` */
export function StatusPill({
  status,
  iconSize = 13,
  className,
}: StatusPillProps) {
  const m = statusMeta(status);
  return (
    <span
      className={`sd-pill${className ? ` ${className}` : ""}`}
      style={{ background: `var(${m.soft})`, color: `var(${m.fg})` }}
    >
      <Icon name={m.icon} size={iconSize} />
      {m.label}
    </span>
  );
}

export interface SoftPillProps {
  children: ReactNode;
  /** CSS custom property name for the text colour, e.g. `--pos`. */
  fg: string;
  /** CSS custom property name for the background, e.g. `--pos-soft`. */
  soft: string;
  icon?: string;
  iconSize?: number;
  /** Smaller 11.5px variant with no letter-spacing. */
  soften?: boolean;
  className?: string;
}

/** `<SoftPill fg="--pos" soft="--pos-soft" icon="truck">In transit</SoftPill>` */
export function SoftPill({
  children,
  fg,
  soft,
  icon,
  iconSize = 13,
  soften = true,
  className,
}: SoftPillProps) {
  return (
    <span
      className={`sd-pill${soften ? " sd-pill--soft" : ""}${
        className ? ` ${className}` : ""
      }`}
      style={{ background: `var(${soft})`, color: `var(${fg})` }}
    >
      {icon ? <Icon name={icon} size={iconSize} /> : null}
      {children}
    </span>
  );
}

export default StatusPill;
