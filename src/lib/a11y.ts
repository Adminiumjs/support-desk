/*
 * Accessibility layers (port spec §2.4, orchestrator ruling R6).
 *
 * Three palette overrides — high contrast, deuteranopia, monochrome — plus a
 * reduce-motion setting and a display-size scale. All three palettes layer ON
 * TOP of the canonical tokens in tokens.css; they never replace them. The
 * actual declarations live in `styles/base.css`, keyed off the data
 * attributes this module stamps on `<html>`.
 */

import type { A11yFlags, A11yPalette, A11ySettings } from "../data/types";
import { locale as activeLocale, t } from "../i18n/ambient";
import { percentText } from "./format";

/* -------------------------------------------------------------- defaults */

/** The documented INITIAL values (spec §7.0). */
export const A11Y_INITIAL_FLAGS: A11yFlags = {
  contrast: false,
  motion: false,
  captions: true,
  chime: false,
  labels: false,
};

export const A11Y_INITIAL: A11ySettings = {
  size: 1,
  palette: "default",
  on: { ...A11Y_INITIAL_FLAGS },
};

/**
 * Reset restores the documented initial values.
 *
 * The comp's `a11yReset()` set `motion: true` while the initial state had
 * `motion: false` (spec §13.1) — a real source inconsistency. Ruling R2: fix
 * it, so reset and first paint now agree.
 */
export function a11yReset(): A11ySettings {
  return { size: 1, palette: "default", on: { ...A11Y_INITIAL_FLAGS } };
}

/* ------------------------------------------------------- reduced motion */

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** True when the OS asks for reduced motion. Safe outside the browser. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/** The in-app toggle OR the OS preference — either one suppresses motion. */
export function motionReduced(settings: A11ySettings): boolean {
  return settings.on.motion || prefersReducedMotion();
}

/** Subscribe to OS reduce-motion changes. Returns an unsubscribe function. */
export function watchReducedMotion(cb: (reduced: boolean) => void): () => void {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  const handler = (e: MediaQueryListEvent) => cb(e.matches);
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}

/** `fx-nomotion` when motion is suppressed, otherwise an empty string. */
export function rootMotionClass(settings: A11ySettings): string {
  return motionReduced(settings) ? "fx-nomotion" : "";
}

/* ----------------------------------------------------------- application */

/**
 * Stamp the settings onto `<html>`:
 *   `data-a11y-contrast="on"` — the high-contrast token block
 *   `data-a11y-palette="deuter" | "mono"` — the semantic-hue overrides
 *   `--a11y-scale` — the display-size multiplier, consumed by `:root`
 *   `.fx-nomotion` — the motion kill switch
 */
export function applyA11ySettings(
  settings: A11ySettings,
  root: HTMLElement | null = typeof document === "undefined"
    ? null
    : document.documentElement,
): void {
  if (!root) return;

  if (settings.on.contrast) root.setAttribute("data-a11y-contrast", "on");
  else root.removeAttribute("data-a11y-contrast");

  if (settings.palette === "default") root.removeAttribute("data-a11y-palette");
  else root.setAttribute("data-a11y-palette", settings.palette);

  root.style.setProperty("--a11y-scale", String(settings.size));
  root.classList.toggle("fx-nomotion", motionReduced(settings));
}

/* -------------------------------------------------------- palette tables */

type TokenMap = Record<string, string>;

/** High-contrast overrides, applied after the base token block. */
export const CONTRAST_TOKENS: { light: TokenMap; dark: TokenMap } = {
  light: {
    "--fg": "#000000",
    "--fg-muted": "#1e1e26",
    "--fg-subtle": "#32323c",
    "--border": "#c6c6d0",
    "--border-strong": "#96969f",
    "--surface-3": "#e5e5eb",
  },
  dark: {
    "--fg": "#ffffff",
    "--fg-muted": "#ededf3",
    "--fg-subtle": "#d6d6e0",
    "--border": "rgba(255,255,255,.30)",
    "--border-strong": "rgba(255,255,255,.48)",
    "--surface-3": "#32323c",
  },
};

/** Red-green friendly. `--warn` / `--warn-soft` are deliberately untouched. */
export const DEUTER_TOKENS: { light: TokenMap; dark: TokenMap } = {
  light: {
    "--pos": "#1c59e0",
    "--pos-soft": "#e7edfd",
    "--danger": "#7a1fa2",
    "--danger-soft": "#f4e9fa",
    "--info": "#0e7490",
    "--info-soft": "#e2f4f7",
  },
  dark: {
    "--pos": "#7fa7ff",
    "--pos-soft": "rgba(127,167,255,.16)",
    "--danger": "#d9a2ff",
    "--danger-soft": "rgba(217,162,255,.16)",
    "--info": "#5eead4",
    "--info-soft": "rgba(94,234,212,.14)",
  },
};

/** Monochrome — all four semantic hues collapse. */
export const MONO_TOKENS: { light: TokenMap; dark: TokenMap } = {
  light: {
    "--pos": "#26262e",
    "--warn": "#26262e",
    "--danger": "#26262e",
    "--info": "#26262e",
    "--pos-soft": "#ededf1",
    "--warn-soft": "#ededf1",
    "--danger-soft": "#ededf1",
    "--info-soft": "#ededf1",
  },
  dark: {
    "--pos": "#e8e8ee",
    "--warn": "#e8e8ee",
    "--danger": "#e8e8ee",
    "--info": "#e8e8ee",
    "--pos-soft": "rgba(255,255,255,.10)",
    "--warn-soft": "rgba(255,255,255,.10)",
    "--danger-soft": "rgba(255,255,255,.10)",
    "--info-soft": "rgba(255,255,255,.10)",
  },
};

export function paletteTokens(
  palette: A11yPalette,
  dark: boolean,
): TokenMap {
  if (palette === "deuter") return dark ? DEUTER_TOKENS.dark : DEUTER_TOKENS.light;
  if (palette === "mono") return dark ? MONO_TOKENS.dark : MONO_TOKENS.light;
  return {};
}

/* ------------------------------------------------------------- the chime */

let audioCtx: AudioContext | null = null;

/**
 * The a11y "sound with alerts" blip: 520 Hz for warnings, 880 Hz otherwise.
 * A no-op unless `settings.on.chime` is true, and silently ignored where
 * WebAudio is unavailable (tests, SSR).
 */
export function chime(kind: "ok" | "warn" | "info", settings: A11ySettings): void {
  if (!settings.on.chime) return;
  if (typeof window === "undefined") return;
  const Ctor = window.AudioContext;
  if (!Ctor) return;
  try {
    audioCtx = audioCtx ?? new Ctor();
    const ctx = audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = kind === "warn" ? 520 : 880;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.07, ctx.currentTime + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.16);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.18);
  } catch {
    /* audio is a nicety; never let it break an action */
  }
}

/* ------------------------------------------------------------ the note */

/**
 * The live summary line on the accessibility screen.
 *
 * The bits are joined by `Intl.ListFormat`, not by a hard-coded `", "`. The
 * separator is a property of the language — Arabic uses `،` and Chinese `、` —
 * and only the runtime's locale knows which. The frame around the list is a
 * single message so the translator owns the word order.
 */
export function a11yActiveNote(settings: A11ySettings): string {
  const bits: string[] = [];
  if (settings.size !== 1)
    bits.push(t("lib.a11y.noteSize", { percent: percentText(settings.size * 100) }));
  if (settings.on.contrast) bits.push(t("lib.a11y.noteContrast"));
  if (settings.on.motion) bits.push(t("lib.a11y.noteMotion"));
  if (settings.palette === "deuter") bits.push(t("lib.a11y.noteDeuter"));
  if (settings.palette === "mono") bits.push(t("lib.a11y.noteMono"));
  if (settings.on.labels) bits.push(t("lib.a11y.noteLabels"));
  if (settings.on.chime) bits.push(t("lib.a11y.noteChime"));
  if (!bits.length) return t("lib.a11y.noteNone");
  return t("lib.a11y.noteApplied", { list: joinList(bits) });
}

/** `Intl.ListFormat` where it exists, a plain comma join where it does not. */
function joinList(items: string[]): string {
  try {
    return new Intl.ListFormat(activeLocale(), {
      style: "long",
      type: "unit",
    }).format(items);
  } catch {
    return items.join(", ");
  }
}

/* ------------------------------------------------------------ focus trap */

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * Trap Tab focus inside `node` and restore it on release. Used by the modal,
 * the command palette and the mobile sheet (ruling R6).
 */
export function trapFocus(node: HTMLElement): () => void {
  const previous = document.activeElement as HTMLElement | null;

  const focusables = () =>
    Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (el) => el.offsetParent !== null || el === document.activeElement,
    );

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const items = focusables();
    if (!items.length) {
      e.preventDefault();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    const current = document.activeElement;
    if (e.shiftKey && (current === first || !node.contains(current))) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && current === last) {
      e.preventDefault();
      first.focus();
    }
  };

  node.addEventListener("keydown", onKeyDown);
  const initial = focusables()[0] ?? node;
  initial.focus?.();

  return () => {
    node.removeEventListener("keydown", onKeyDown);
    previous?.focus?.();
  };
}
