/*
 * StatTile — the KPI card used on energy, partner and about (port spec §4.5).
 */

import { Icon } from "./Icon";
import { Card } from "./Primitives";
import type { ReactNode } from "react";

export interface StatTileProps {
  /** Uppercase eyebrow label. */
  label: string;
  /** Big mono value, e.g. `£54.20`. */
  value: ReactNode;
  icon?: string;
  /** Optional delta pill under the value. */
  delta?: string;
  /** `trending-down` reads as good (less energy) and colours `--pos`. */
  deltaIcon?: string;
  /** Plain footnote under the value — the recycling stat strip. */
  note?: string;
  /** Smaller 26px value — the partner KPI row. */
  compact?: boolean;
  className?: string;
}

/**
 * `<StatTile label="Spend" value="£54.20" icon="wallet" delta="19% less than June" deltaIcon="trending-down" />`
 */
export function StatTile({
  label,
  value,
  icon,
  delta,
  deltaIcon,
  note,
  compact = false,
  className,
}: StatTileProps) {
  const tone = deltaIcon === "trending-down" ? "--pos" : "--accent";
  return (
    <Card className={className}>
      <span className="stat__label">
        {icon ? <Icon name={icon} size={13} /> : null}
        {label}
      </span>
      <div className={`stat__value${compact ? " stat__value--sm" : ""}`}>
        {value}
      </div>
      {delta ? (
        <span
          className="stat__delta"
          style={{ background: `var(${tone}-soft)`, color: `var(${tone})` }}
        >
          {deltaIcon ? <Icon name={deltaIcon} size={13} /> : null}
          {delta}
        </span>
      ) : null}
      {note ? <p className="stat__note">{note}</p> : null}
    </Card>
  );
}

export interface StatGridProps {
  children: ReactNode;
  /** Minimum column width in px — 200 by default, 190 on the partner row. */
  min?: number;
  className?: string;
}

/** `<StatGrid>{kpis.map(k => <StatTile … />)}</StatGrid>` */
export function StatGrid({ children, min = 200, className }: StatGridProps) {
  return (
    <div
      className={`stat-grid${className ? ` ${className}` : ""}`}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(min(${min}px, 100%), 1fr))`,
      }}
    >
      {children}
    </div>
  );
}

export default StatTile;
