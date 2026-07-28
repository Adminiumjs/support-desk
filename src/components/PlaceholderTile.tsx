/*
 * PlaceholderTile — the procedural tile system used for every "image".
 *
 * The comp never loads a bitmap. Article heroes, product tiles, category
 * chips and avatars are all three stacked gradients derived from a per-entity
 * hex tint (port spec §2.6). Same helpers, same alpha constants.
 */

import { useAppStore } from "../state/store";
import { Icon } from "./Icon";
import type { CSSProperties, ReactNode } from "react";

/* ------------------------------------------------------------- helpers */

/** `#4f8bd6` + `0.2` → `rgba(79,139,214,0.2)`. Accepts 3- or 6-digit hex. */
export function hexToRgba(hex: string, a: number): string {
  let h = (hex || "#2563eb").replace("#", "");
  if (h.length === 3)
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

/** The three-layer placeholder background. */
export function phBg(tint: string, dark: boolean, ang = "155deg"): string {
  const highlight = dark
    ? "radial-gradient(120% 82% at 50% 0%, rgba(255,255,255,.05), transparent 55%)"
    : "radial-gradient(120% 82% at 50% 0%, rgba(255,255,255,.6), transparent 58%)";
  const pedestal = `radial-gradient(60% 30% at 50% 88%, ${hexToRgba(
    tint,
    dark ? 0.32 : 0.2,
  )}, transparent 72%)`;
  const base = `linear-gradient(${ang}, ${hexToRgba(
    tint,
    dark ? 0.3 : 0.19,
  )}, ${hexToRgba(tint, dark ? 0.12 : 0.07)})`;
  return `${highlight}, ${pedestal}, ${base}`;
}

/** The icon colour that sits on a placeholder background. */
export function phIco(tint: string, dark: boolean): string {
  return hexToRgba(tint, dark ? 0.7 : 0.55);
}

/** The avatar initials colour. */
export function phInitials(tint: string, dark: boolean): string {
  return hexToRgba(tint, dark ? 0.95 : 0.78);
}

/** True when the app is rendering the dark palette. */
export function useIsDark(): boolean {
  return useAppStore((s) => s.theme === "dark");
}

/* ---------------------------------------------------------- IconChip */

export interface IconChipProps {
  /** Hex tint from the data record. */
  tint: string;
  /** Chip edge length in px. Comp sizes: 50/46/42/40/38/34/32. */
  size?: number;
  /** Corner radius in px. Comp radii: 14/13/12/11/10. */
  radius?: number;
  /** Kebab-case lucide name. */
  icon: string;
  /** Icon size in px. Comp sizes: 24/23/21/20/19/18/17/16. */
  iconSize?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * The small tinted square that precedes almost every list row.
 *
 * `<IconChip tint={product.tint} icon={product.icon} size={40} radius={12} iconSize={20} />`
 */
export function IconChip({
  tint,
  size = 40,
  radius = 12,
  icon,
  iconSize = 20,
  className,
  style,
}: IconChipProps) {
  const dark = useIsDark();
  return (
    <span
      className={`sd-iconchip${className ? ` ${className}` : ""}`}
      style={{
        inlineSize: size,
        blockSize: size,
        borderRadius: radius,
        background: phBg(tint, dark),
        ...style,
      }}
    >
      <Icon name={icon} size={iconSize} color={phIco(tint, dark)} />
    </span>
  );
}

/* ------------------------------------------------------ PlaceholderTile */

export interface PlaceholderTileProps {
  tint: string;
  icon: string;
  /** Minimum block size in px — 190 for the article hero. */
  minHeight?: number;
  /** Big icon size in px — 72 on the article hero. */
  iconSize?: number;
  /** Gradient angle. */
  angle?: string;
  /** Optional mono file-name chip pinned bottom-start. */
  filename?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * The large "image" surface — article heroes, tour figures, map stand-ins.
 *
 * `<PlaceholderTile tint={cat.tint} icon={cat.icon} minHeight={190} iconSize={72} filename="doorbell_wifi.png" />`
 */
export function PlaceholderTile({
  tint,
  icon,
  minHeight = 190,
  iconSize = 72,
  angle = "155deg",
  filename,
  className,
  style,
  children,
}: PlaceholderTileProps) {
  const dark = useIsDark();
  return (
    <div
      className={`sd-tile${className ? ` ${className}` : ""}`}
      style={{
        minBlockSize: minHeight,
        background: phBg(tint, dark, angle),
        ...style,
      }}
    >
      <Icon name={icon} size={iconSize} color={phIco(tint, dark)} />
      {filename ? <span className="sd-tile__fname">{filename}</span> : null}
      {children}
    </div>
  );
}

/* ------------------------------------------------------ MapPlaceholder */

export interface MapPlaceholderProps {
  /** Mono file-name chip, bottom-start, e.g. `map-stores-bristol.png`. */
  filename: string;
  /** Mono count chip, top-end, e.g. `3 shown`. */
  count?: string;
  className?: string;
}

/**
 * The accent-washed map stand-in on the store locator. Unlike
 * `<PlaceholderTile>` it is not tinted from a record — the wash is the accent.
 *
 * `<MapPlaceholder filename={storeMapFile(stQ)} count={`${n} shown`} />`
 */
export function MapPlaceholder({ filename, count, className }: MapPlaceholderProps) {
  return (
    <div className={`sd-map${className ? ` ${className}` : ""}`}>
      <Icon name="map" size={58} color="color-mix(in srgb, var(--accent) 60%, transparent)" />
      <span className="sd-map__file">{filename}</span>
      {count ? <span className="sd-map__count">{count}</span> : null}
    </div>
  );
}

export default PlaceholderTile;
