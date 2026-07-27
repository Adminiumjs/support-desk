/*
 * MiniChart — the energy bar chart and the progress meter (port spec §4.5).
 * Both are pure CSS; there is no charting library in the comp or the port.
 */

import { barHeight } from "../lib/format";

export interface MiniChartBar {
  label: string;
  value: number;
  /** Optional override for the printed value; defaults to `String(value)`. */
  display?: string;
}

export interface MiniChartProps {
  bars: MiniChartBar[];
  /** Accessible summary — required (ruling R6). */
  label: string;
  /** Chart block size in px. */
  height?: number;
  className?: string;
}

/**
 * `<MiniChart label="Energy this month" bars={bars.map(([label, value]) => ({ label, value }))} />`
 */
export function MiniChart({
  bars,
  label,
  height = 180,
  className,
}: MiniChartProps) {
  const max = bars.reduce((m, b) => Math.max(m, b.value), 0);
  return (
    <div
      className={`chart${className ? ` ${className}` : ""}`}
      style={{ blockSize: height }}
      role="img"
      aria-label={`${label}: ${bars
        .map((b) => `${b.label} ${b.display ?? b.value}`)
        .join(", ")}`}
    >
      {bars.map((b) => (
        <div className="chart__col" key={b.label}>
          <span className="chart__val">{b.display ?? b.value}</span>
          <span
            className="chart__bar"
            style={{ blockSize: barHeight(b.value, max) }}
          />
          <span className="chart__label">{b.label}</span>
        </div>
      ))}
    </div>
  );
}

export interface ProgressBarProps {
  /** 0–100. */
  pct: number;
  /** Rail height in px — 6 survey/warranty, 7 rooms/training, 8 refer. */
  height?: number;
  /** Accessible name — required (ruling R6). */
  label: string;
  className?: string;
}

/** `<ProgressBar label="Warranty remaining" pct={94} height={6} />` */
export function ProgressBar({
  pct,
  height = 8,
  label,
  className,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(pct)));
  return (
    <div
      className={`meter${className ? ` ${className}` : ""}`}
      style={{ blockSize: height }}
      role="progressbar"
      aria-label={label}
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span className="meter__fill" style={{ inlineSize: `${clamped}%` }} />
    </div>
  );
}

export default MiniChart;
