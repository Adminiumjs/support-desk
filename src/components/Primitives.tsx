/*
 * The repeated signatures worth extracting first (port spec §4.1):
 * Card, ListCard, Eyebrow, Callout, AccentIconTile and the two buttons.
 */

import { Icon } from "./Icon";
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

/* ------------------------------------------------------------------ Card */

export interface CardProps {
  children: ReactNode;
  /** `form` = 20px radius + roomier padding; `lg` = clamp(18,3vw,24). */
  variant?: "default" | "lg" | "form";
  /** Adds the 1.5px accent border used by the highlighted plan/bundle card. */
  accent?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** `<Card variant="form"><h2>…</h2></Card>` */
export function Card({
  children,
  variant = "default",
  accent = false,
  className,
  style,
}: CardProps) {
  const cls = [
    "sd-card",
    variant === "lg" ? "sd-card--lg" : "",
    variant === "form" ? "sd-card--form" : "",
    accent ? "sd-card--accent" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls} style={style}>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------- ListCard */

export interface ListCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/** Row container. Rows supply their own padding and bottom border. */
export function ListCard({ children, className, style }: ListCardProps) {
  return (
    <div className={`sd-listcard${className ? ` ${className}` : ""}`} style={style}>
      {children}
    </div>
  );
}

/* --------------------------------------------------------------- Eyebrow */

export interface EyebrowProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/** `<Eyebrow>Job requests</Eyebrow>` — 11px/700 uppercase, ls .06em. */
export function Eyebrow({ children, className, style }: EyebrowProps) {
  return (
    <p className={`sd-eyebrow${className ? ` ${className}` : ""}`} style={style}>
      {children}
    </p>
  );
}

/* --------------------------------------------------------------- Callout */

export type CalloutTone = "info" | "pos" | "warn" | "danger";

export interface CalloutProps {
  /** Drives both the soft background and the icon colour. */
  tone?: CalloutTone;
  icon?: string;
  /** Optional uppercase eyebrow, e.g. `Tip` / `Heads up`. */
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}

const TONE_ICON: Record<CalloutTone, string> = {
  info: "lightbulb",
  pos: "check-circle-2",
  warn: "alert-triangle",
  danger: "alert-triangle",
};

/** `<Callout tone="warn" eyebrow="Heads up">Do not unplug…</Callout>` */
export function Callout({
  tone = "info",
  icon,
  eyebrow,
  children,
  className,
}: CalloutProps) {
  return (
    <div
      className={`sd-callout${className ? ` ${className}` : ""}`}
      style={{ background: `var(--${tone}-soft)` }}
    >
      <Icon
        name={icon ?? TONE_ICON[tone]}
        size={19}
        color={`var(--${tone})`}
      />
      <div>
        {eyebrow ? (
          <p className="sd-callout__eyebrow" style={{ color: `var(--${tone})` }}>
            {eyebrow}
          </p>
        ) : null}
        <div className="sd-callout__body">{children}</div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------- AccentIconTile */

export interface AccentIconTileProps {
  icon: string;
  /** Edge length in px — 30 to 56 across the comp. */
  size?: number;
  radius?: number;
  iconSize?: number;
  className?: string;
}

/** `<AccentIconTile icon="keyboard" size={40} radius={12} iconSize={20} />` */
export function AccentIconTile({
  icon,
  size = 40,
  radius = 12,
  iconSize = 20,
  className,
}: AccentIconTileProps) {
  return (
    <span
      className={`sd-accent-tile${className ? ` ${className}` : ""}`}
      style={{ inlineSize: size, blockSize: size, borderRadius: radius }}
    >
      <Icon name={icon} size={iconSize} />
    </span>
  );
}

/* --------------------------------------------------------------- buttons */

type NativeButton = ButtonHTMLAttributes<HTMLButtonElement>;

export interface ButtonProps extends Omit<NativeButton, "children"> {
  children?: ReactNode;
  /** Leading kebab-case lucide name. */
  icon?: string;
  /** Trailing kebab-case lucide name. */
  iconEnd?: string;
  iconSize?: number;
  size?: "sm" | "md" | "lg";
  block?: boolean;
}

/**
 * The filled accent CTA.
 * `<ButtonPrimary icon="pen-line" onClick={openTicket}>Open a ticket</ButtonPrimary>`
 */
export function ButtonPrimary({
  children,
  icon,
  iconEnd,
  iconSize = 16,
  size = "lg",
  block = false,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  const cls = [
    "sd-btn",
    "oh-btn",
    size === "sm" ? "sd-btn--sm" : "",
    size === "md" ? "sd-btn--md" : "",
    block ? "sd-btn--block" : "",
    disabled ? "sd-btn--off" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button type="button" className={cls} disabled={disabled} {...rest}>
      {icon ? <Icon name={icon} size={iconSize} /> : null}
      {children}
      {iconEnd ? <Icon name={iconEnd} size={iconSize} /> : null}
    </button>
  );
}

export interface ButtonSecondaryProps extends ButtonProps {
  /** Dashed outline variant (the "Add file" affordance). */
  dashed?: boolean;
  /** Override the label colour, e.g. `var(--pos)` on "Mark as solved". */
  tone?: string;
}

/** `<ButtonSecondary icon="paperclip">Attach</ButtonSecondary>` */
export function ButtonSecondary({
  children,
  icon,
  iconEnd,
  iconSize = 15,
  dashed = false,
  tone,
  className,
  style,
  ...rest
}: ButtonSecondaryProps) {
  const cls = [
    "sd-btn-ghost",
    "oh-gi",
    dashed ? "sd-btn-ghost--dashed" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button
      type="button"
      className={cls}
      style={tone ? { color: tone, ...style } : style}
      {...rest}
    >
      {icon ? <Icon name={icon} size={iconSize} /> : null}
      {children}
      {iconEnd ? <Icon name={iconEnd} size={iconSize} /> : null}
    </button>
  );
}

export interface IconButtonProps extends Omit<NativeButton, "children"> {
  icon: string;
  /** Required — becomes both the tooltip and the accessible name (ruling R6). */
  label: string;
  /** Renders the label as visible text (the a11y "icon labels" toggle). */
  showLabel?: boolean;
  iconSize?: number;
  small?: boolean;
}

/** `<IconButton icon="x" label="Close" small onClick={close} />` */
export function IconButton({
  icon,
  label,
  showLabel = false,
  iconSize = 18,
  small = false,
  className,
  ...rest
}: IconButtonProps) {
  const cls = [
    "sd-iconbtn",
    "oh-gi",
    small ? "sd-iconbtn--sm" : "",
    showLabel ? "sd-iconbtn--labelled" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button type="button" className={cls} title={label} aria-label={label} {...rest}>
      <Icon name={icon} size={iconSize} />
      {showLabel ? <span aria-hidden="true">{label}</span> : null}
    </button>
  );
}
