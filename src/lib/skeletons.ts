/*
 * Loading skeletons.
 *
 * `SKEL_SHAPE` maps a view to one of four block layouts. Note that `grid` is
 * a SHAPE here, not a view — the delta brief's sixteenth "view" was this table
 * leaking into a probe (delta B §0a). Anything unlisted falls to `list`.
 *
 * The busy cycle is time-based and load-bearing for the demo feel:
 * 620 ms on first paint, 480 ms per navigation, 620 ms on retry.
 */

import type { SkeletonShape, ViewId } from "../data/types";
import { t } from "../i18n/ambient";

/* -------------------------------------------------------------- timings */

export const BUSY_MOUNT_MS = 620;
export const BUSY_NAV_MS = 480;
export const BUSY_RETRY_MS = 620;

/* --------------------------------------------------------------- shapes */

export const SKEL_SHAPE: Partial<Record<ViewId, SkeletonShape>> = {
  home: "grid",
  overview: "grid",
  devices: "grid",
  energy: "grid",
  live: "grid",
  contact: "grid",
  refer: "grid",
  plans: "grid",
  partner: "grid",
  bundles: "grid",
  trade: "grid",

  article: "doc",
  about: "doc",
  imprint: "doc",
  breach: "doc",
  "404": "doc",

  newticket: "form",
  orders: "form",
  warranty: "form",
  claim: "form",
  returns: "form",
  repair: "form",
  gift: "form",
  transfer: "form",
  recycle: "form",
  survey: "form",
  tour: "form",
  a11y: "form",
};

/** `SKEL_SHAPE[view] || 'list'`. */
export function skeletonShape(view: ViewId): SkeletonShape {
  return SKEL_SHAPE[view] ?? "list";
}

/* --------------------------------------------------------------- blocks */

export interface SkeletonBlock {
  /** Index, used as the React key. */
  i: number;
  height: number;
  /** CSS width — `100%` unless the doc shape's text bars override it. */
  width: string;
  /** Blocks taller than 40px get the 16px radius, the rest 8px. */
  radius: number;
}

const DOC_BARS = ["92%", "86%", "74%", "90%", "58%"];

function block(i: number, height: number, width = "100%"): SkeletonBlock {
  return { i, height, width, radius: height > 40 ? 16 : 8 };
}

/** The block list for a shape: 6 tiles / 2 slabs / hero + 5 bars / 4 rows. */
export function skeletonBlocks(shape: SkeletonShape): SkeletonBlock[] {
  if (shape === "grid") return Array.from({ length: 6 }, (_, i) => block(i, 150));
  if (shape === "form") return [block(0, 290), block(1, 120)];
  if (shape === "doc")
    return [block(0, 190), ...DOC_BARS.map((w, i) => block(i + 1, 14, w))];
  return Array.from({ length: 4 }, (_, i) => block(i, 82));
}

/** `grid` lays out as a grid; every other shape is a column. */
export function skeletonIsGrid(shape: SkeletonShape): boolean {
  return shape === "grid";
}

/**
 * The mono caption under the blocks. Lower case in the languages that have
 * case; the view id itself is a machine token and stays as authored.
 */
export function skeletonNote(view: ViewId): string {
  const name =
    view === "home"
      ? t("lib.skeletons.helpCentre")
      : view.replace(/([a-z])([A-Z])/g, "$1 $2");
  return t("lib.skeletons.note", { name });
}
