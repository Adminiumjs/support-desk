/*
 * Live view, clip history and shared links.
 *
 * The largest of the delta's four logic sections. Everything here is pure and
 * deterministic — ruling R2 forbids `Math.random()` and `Date.now()` in src,
 * so the comp's random share slug is replaced by `shareSlug()`, a stable hash
 * of the clip id and the sequence number.
 */

import { pluralise } from "./format";
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

/** The overlay clock. Hard-coded, as the comp has it. */
export const LIVE_CLOCK = "27 Jul · 14:26:08";

/** The mono retention caption beside "Clip history". */
export const LIVE_RETENTION = "kept 90 days on Hearth Family";

/** `live-front-2160p.stream`. */
export function liveFile(camId: string): string {
  return `live-${camId}-2160p.stream`;
}

/** The four always-rendered stage buttons. Every one toasts `info`. */
export const LIVE_CONTROLS: LiveControl[] = [
  { icon: "mic", label: "Talk", toast: "Two-way talk needs the Hearth app" },
  { icon: "camera", label: "Snapshot", toast: "Snapshot saved to your clips" },
  { icon: "volume-2", label: "Sound on", toast: "Audio is muted in this demo" },
  { icon: "maximize", label: "Full screen", toast: "Full screen isn't available here" },
];

export function liveIntro(cam: Camera): string {
  return cam.offline
    ? `${cam.name} isn't reachable. Clips recorded before it dropped off are still here — nothing is lost.`
    : `Streaming from ${cam.name}. Live view is peer-to-peer, so it keeps working even when our cloud doesn't.`;
}

export function liveNoFeedTitle(cam: Camera): string {
  return `No feed from ${cam.name}`;
}

export const LIVE_NO_FEED_TEXT =
  "The camera hasn't checked in, so there's nothing live to show. It's almost always power or Wi-Fi range rather than a fault.";

export function liveLastSeen(cam: Camera): string {
  return cam.since ?? "last seen a while ago";
}

/** Deliberately never succeeds — the offline camera stays offline. */
export function liveRetryToast(cam: Camera): string {
  return `Still no answer from ${cam.name}`;
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

export const CLIP_TYPE_META: Record<ClipType, ClipTypeMeta> = {
  person: { label: "Person", fg: "--info", soft: "--info-soft", icon: "user-round" },
  parcel: { label: "Parcel", fg: "--pos", soft: "--pos-soft", icon: "package" },
  press: { label: "Pressed", fg: "--accent", soft: "--accent-soft", icon: "bell-ring" },
  motion: { label: "Motion", fg: "--warn", soft: "--warn-soft", icon: "radar" },
};

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
  for (const g of out) g.count = pluralise(g.clips.length, "clip");
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
      title: "No clips in this filter",
      text: "Try another event type, or another camera. Clips are kept for as long as your plan allows.",
    };
  }
  return {
    title: `No clips from ${cam.name} yet`,
    text: cam.offline
      ? `Nothing was recorded before ${cam.name} went offline. Once it's back, new events appear here within a minute.`
      : `Nothing recorded on ${cam.name} so far. Motion and doorbell events start a clip automatically.`,
  };
}

/* ------------------------------------------------------------ clip rows */

/** "Front door · 14:12". */
export function clipMeta(clip: Clip, cam: Camera): string {
  return `${cam.name} · ${clip.time}`;
}

export function clipPlayToast(clip: Clip): string {
  return `Playing ${clip.title.toLowerCase()} · ${clip.dur}`;
}

export function clipDownloadToast(clip: Clip): string {
  return `Downloading clip-${clip.id}.mp4`;
}

export const CLIP_SHARE_TOAST = "Share link copied — expires in 7 days";
export const CLIP_DELETE_TOAST = "Clip deleted";

/* ================================================================ share == */

export interface ShareStateMeta {
  label: string;
  fg: string;
  soft: string;
  icon: string;
}

export const SHARE_STATE_META: Record<ShareState, ShareStateMeta> = {
  live: { label: "Active", fg: "--pos", soft: "--pos-soft", icon: "link" },
  expiring: { label: "Expires soon", fg: "--warn", soft: "--warn-soft", icon: "clock" },
  expired: { label: "Expired", fg: "--fg-subtle", soft: "--surface-3", icon: "link-2-off" },
};

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
  return state === "expired" ? "Reactivate" : "Extend 7 days";
}

export function shareExtendToast(state: ShareState): string {
  return state === "expired" ? "Link reactivated for 7 days" : "Extended by 7 days";
}

/** "no expiry" / "expires in 7 days". */
export function shareExpiryLine(expiry: ShareOption): string {
  return expiry.value === "never"
    ? "no expiry"
    : `expires in ${expiry.label.toLowerCase()}`;
}

/** "Front door · today 14:12 · 0:06" — the composer's clip sub-line. */
export function shareClipMeta(clip: Clip, cam: Camera): string {
  return `${cam.name} · ${clip.day.toLowerCase()} ${clip.time} · ${clip.dur}`;
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
