/*
 * Chip — `fchipStyle`, the most reused control in the comp (port spec §4.3).
 * Filter chips, product tiles, feedback thumbs, quick replies, period toggles.
 */

import { Icon } from "./Icon";
import type { CSSProperties, ReactNode } from "react";

export interface ChipProps {
  children: ReactNode;
  /** Pill fills with the accent when true. */
  active?: boolean;
  /** Leading kebab-case lucide name. */
  icon?: string;
  iconSize?: number;
  /** Trailing mono count, e.g. a facet count. */
  count?: number | string;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
  title?: string;
}

/** `<Chip icon="wrench" active={facet === "setup"} count={4} onClick={…}>Setup</Chip>` */
export function Chip({
  children,
  active = false,
  icon,
  iconSize = 14,
  count,
  onClick,
  className,
  style,
  title,
}: ChipProps) {
  return (
    <button
      type="button"
      className={`sd-chip fx-chip${className ? ` ${className}` : ""}`}
      aria-pressed={active}
      onClick={onClick}
      style={style}
      title={title}
    >
      {icon ? <Icon name={icon} size={iconSize} /> : null}
      {children}
      {count !== undefined ? (
        <span className="sd-chip__count">{count}</span>
      ) : null}
    </button>
  );
}

export interface ChipRowProps {
  children: ReactNode;
  /** Gap in px — 9 on KB/forum/firmware rows, 10 elsewhere. */
  gap?: number;
  className?: string;
}

/** `<ChipRow>{cats.map(c => <Chip … />)}</ChipRow>` */
export function ChipRow({ children, gap = 9, className }: ChipRowProps) {
  return (
    <div
      className={`sd-chiprow${className ? ` ${className}` : ""}`}
      style={{ gap }}
    >
      {children}
    </div>
  );
}

export default Chip;
