/*
 * Live view, clip history and shared links.
 *
 * The largest of the delta's four logic sections. Everything here is pure and
 * deterministic — ruling R2 forbids `Math.random()` and `Date.now()` in src,
 * so the comp's random share slug is replaced by `shareSlug()`, a stable hash
 * of the clip id and the sequence number.
 */

import { clockTime, counted, shortDate } from "./format";
import { number as fmtNumber, t } from "../i18n/ambient";
import type {
  Camera,
  Clip,
  ClipFilterId,
  ClipType,
  LiveControl,
  ShareLink,
  ShareOption,
  ShareState,
} from "../data/types";

/* ================================================================= live == */

/**
 * The overlay clock. The *instant* is hard-coded, as the comp has it (ruling
 * R2: no `Date.now()`); the rendering is not. A function rather than a const
 * because a const would freeze at whatever locale happened to be active when
 * this module was first evaluated — which is `en-US`, before React mounts.
 *
 * en-US reads "Jul 27 · 02:26:08 PM", de-DE "27. Juli · 14:26:08". Whether the
 * clock has an AM/PM at all is the locale's call, not ours.
 */
export const LIVE_INSTANT = new Date(2026, 6, 27, 14, 26, 8);

export function liveClock(): string {
  return `${shortDate(LIVE_INSTANT)} · ${clockTime(LIVE_INSTANT, true)}`;
}

/** The mono retention caption beside "Clip history". */
export function liveRetention(): string {
  return t("lib.live.retention", { days: fmtNumber(90) });
}

/** `live-front-2160p.stream`. */
export function liveFile(camId: string): string {
  return `live-${camId}-2160p.stream`;
}

/**
 * The four always-rendered stage buttons. Every one toasts `info`.
 *
 * A function, not a const: the labels have to be looked up at render time or
 * they freeze in whatever locale was active at module evaluation.
 */
export function liveControls(): LiveControl[] {
  return [
    { icon: "mic", label: t("lib.live.ctlTalk"), toast: t("lib.live.ctlTalkToast") },
    {
      icon: "camera",
      label: t("lib.live.ctlSnapshot"),
      toast: t("lib.live.ctlSnapshotToast"),
    },
    {
      icon: "volume-2",
      label: t("lib.live.ctlSound"),
      toast: t("lib.live.ctlSoundToast"),
    },
    {
      icon: "maximize",
      label: t("lib.live.ctlFullscreen"),
      toast: t("lib.live.ctlFullscreenToast"),
    },
  ];
}

export function liveIntro(cam: Camera): string {
  return cam.offline
    ? t("lib.live.introOffline", { name: cam.name })
    : t("lib.live.introOnline", { name: cam.name });
}

export function liveNoFeedTitle(cam: Camera): string {
  return t("lib.live.noFeedTitle", { name: cam.name });
}

export function liveNoFeedText(): string {
  return t("lib.live.noFeedText");
}

export function liveLastSeen(cam: Camera): string {
  return cam.since ?? t("lib.live.lastSeenUnknown");
}

/** Deliberately never succeeds — the offline camera stays offline. */
export function liveRetryToast(cam: Camera): string {
  return t("lib.live.retryToast", { name: cam.name });
}

/** The troubleshooting link target on the offline stage. */
export const LIVE_TROUBLESHOOT_ARTICLE = "a_offline";

/* --------------------------------------------------------------- filters */

export interface ClipTypeMeta {
  label: string;
  /** CSS custom property name, e.g. `--info`. */
  fg: string;
  soft: string;
  icon: string;
}

export function clipTypeMeta(type: ClipType): ClipTypeMeta {
  const labels: Record<ClipType, string> = {
    person: t("lib.clips.typePerson"),
    parcel: t("lib.clips.typeParcel"),
    press: t("lib.clips.typePress"),
    motion: t("lib.clips.typeMotion"),
  };
  const style: Record<ClipType, Omit<ClipTypeMeta, "label">> = {
    person: { fg: "--info", soft: "--info-soft", icon: "user-round" },
    parcel: { fg: "--pos", soft: "--pos-soft", icon: "package" },
    press: { fg: "--accent", soft: "--accent-soft", icon: "bell-ring" },
    motion: { fg: "--warn", soft: "--warn-soft", icon: "radar" },
  };
  return { label: labels[type], ...style[type] };
}

/** Every clip on one camera, minus the ones deleted this session. */
export function clipsForCamera(
  clips: Clip[],
  camId: string,
  hidden: string[],
): Clip[] {
  return clips.filter((c) => c.cam === camId && !hidden.includes(c.id));
}

/**
 * Chip counts, computed BEFORE the type filter is applied so they never
 * collapse to the active filter.
 */
export function clipTypeCounts(mine: Clip[]): Record<ClipFilterId, number> {
  const counts: Record<ClipFilterId, number> = {
    all: mine.length,
    person: 0,
    parcel: 0,
    press: 0,
    motion: 0,
  };
  for (const c of mine) counts[c.type] += 1;
  return counts;
}

export function filterClipsByType(mine: Clip[], type: ClipFilterId): Clip[] {
  return type === "all" ? mine : mine.filter((c) => c.type === type);
}

export interface ClipGroup {
  day: string;
  clips: Clip[];
  /** "3 clips" / "1 clip". */
  count: string;
}

/** Grouped by `day` in first-seen order. */
export function groupClipsByDay(clips: Clip[]): ClipGroup[] {
  const out: ClipGroup[] = [];
  for (const clip of clips) {
    const group = out.find((g) => g.day === clip.day);
    if (group) group.clips.push(clip);
    else out.push({ day: clip.day, clips: [clip], count: "" });
  }
  for (const g of out) g.count = counted("count.clip", g.clips.length);
  return out;
}

export interface LiveEmptyCopy {
  title: string;
  text: string;
}

/**
 * Three branches: nothing on this camera at all (online / offline), or clips
 * exist but the type filter emptied the list.
 */
export function liveEmpty(cam: Camera, hasAnyClips: boolean): LiveEmptyCopy {
  if (hasAnyClips) {
    return {
      title: t("lib.clips.emptyFilterTitle"),
      text: t("lib.clips.emptyFilterText"),
    };
  }
  return {
    title: t("lib.clips.emptyCamTitle", { name: cam.name }),
    text: cam.offline
      ? t("lib.clips.emptyCamOfflineText", { name: cam.name })
      : t("lib.clips.emptyCamOnlineText", { name: cam.name }),
  };
}

/* ------------------------------------------------------------ clip rows */

/** "Front door · 14:12". */
export function clipMeta(clip: Clip, cam: Camera): string {
  return t("lib.clips.meta", { cam: cam.name, time: clip.time });
}

export function clipPlayToast(clip: Clip): string {
  return t("lib.clips.playToast", {
    title: clip.title.toLowerCase(),
    duration: clip.dur,
  });
}

export function clipDownloadToast(clip: Clip): string {
  return t("lib.clips.downloadToast", { file: `clip-${clip.id}.mp4` });
}

export function clipShareToast(): string {
  return t("lib.clips.shareToast", { days: fmtNumber(7) });
}

export function clipDeleteToast(): string {
  return t("lib.clips.deleteToast");
}

/* ================================================================ share == */

export interface ShareStateMeta {
  label: string;
  fg: string;
  soft: string;
  icon: string;
}

export function shareStateMeta(state: ShareState): ShareStateMeta {
  const labels: Record<ShareState, string> = {
    live: t("lib.share.stateActive"),
    expiring: t("lib.share.stateExpiring"),
    expired: t("lib.share.stateExpired"),
  };
  const style: Record<ShareState, Omit<ShareStateMeta, "label">> = {
    live: { fg: "--pos", soft: "--pos-soft", icon: "link" },
    expiring: { fg: "--warn", soft: "--warn-soft", icon: "clock" },
    expired: { fg: "--fg-subtle", soft: "--surface-3", icon: "link-2-off" },
  };
  return { label: labels[state], ...style[state] };
}

/**
 * A stable six-character base36 slug (FNV-1a). Replaces the comp's
 * `Math.random().toString(36).slice(2,8)` — same shape, deterministic.
 */
export function shareSlug(seed: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(36).padStart(6, "0").slice(-6);
}

/** "Reactivate" once the link has expired, else "Extend 7 days". */
export function shareExtendLabel(state: ShareState): string {
  return state === "expired"
    ? t("lib.share.reactivate")
    : t("lib.share.extendDays", { days: fmtNumber(7) });
}

export function shareExtendToast(state: ShareState): string {
  return state === "expired"
    ? t("lib.share.reactivatedToast", { days: fmtNumber(7) })
    : t("lib.share.extendedToast", { days: fmtNumber(7) });
}

/**
 * "no expiry" / "expires in 7 days".
 *
 * Keyed off `expiry.value` — the machine token — rather than lower-casing
 * `expiry.label`, which was an English typographic habit: German nouns stay
 * capitalised mid-sentence, and the seed labels are English either way.
 */
export function shareExpiryLine(expiry: ShareOption): string {
  if (expiry.value === "never") return t("lib.share.expiryNever");
  if (expiry.value === "24h")
    return t("lib.share.expiry24h", { hours: fmtNumber(24) });
  if (expiry.value === "30d")
    return t("lib.share.expiry30d", { days: fmtNumber(30) });
  return t("lib.share.expiry7d", { days: fmtNumber(7) });
}

/** "Front door · today 14:12 · 0:06" — the composer's clip sub-line. */
export function shareClipMeta(clip: Clip, cam: Camera): string {
  return t("lib.share.clipMeta", {
    cam: cam.name,
    day: clip.day.toLowerCase(),
    time: clip.time,
    duration: clip.dur,
  });
}

/** Links minus the ones revoked this session. */
export function visibleShareLinks(links: ShareLink[], revoked: string[]): ShareLink[] {
  return links.filter((l) => !revoked.includes(l.id));
}

/** Builds the record `shCreate()` unshifts onto the list. */
export function newShareLink(input: {
  clip: Clip;
  audience: ShareOption;
  expiry: ShareOption;
  /** Current link count — the new id is `sl${count + 1}`. */
  count: number;
  /** Host prefix, e.g. `hearth.example/s/`. */
  host: string;
}): ShareLink {
  const n = input.count + 1;
  return {
    id: `sl${n}`,
    title: input.clip.title,
    cam: input.clip.cam,
    audience: input.audience.label,
    url: `${input.host}${shareSlug(`${input.clip.id}-${n}`)}`,
    views: 0,
    expires: shareExpiryLine(input.expiry),
    state: "live",
    watchers: [],
  };
}
