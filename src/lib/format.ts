/*
 * Formatters. Pure, deterministic, no locale surprises — the demo is
 * GBP / en-GB and every derived string is pinned in the port spec (§12).
 */

import {
  CODE_PREFIX,
  GIFT_CODE_PREFIX,
} from "../data/demo";

/* ----------------------------------------------------------------- money */

/** `12` → `"£12.00"`. Always two decimals. */
export function money(amount: number): string {
  return `£${amount.toFixed(2)}`;
}

/** `50` → `"£50"`, `12.5` → `"£12.50"` — drops `.00` on whole numbers. */
export function moneyLoose(amount: number): string {
  return `£${amount.toFixed(amount % 1 ? 2 : 0)}`;
}

/** `149` → `"£149"`. Integer pounds, no decimals. */
export function poundsWhole(amount: number): string {
  return `£${Math.round(amount)}`;
}

/** Monthly price for a plan card: `0` → `"Free"`, else `"£3.99"`. */
export function planPrice(amount: number): string {
  return amount === 0 ? "Free" : `£${amount.toFixed(2)}`;
}

/* ------------------------------------------------------------ read times */

/** `5` → `"5 min read"`. */
export function readTime(minutes: number): string {
  return `${minutes} min read`;
}

/** `5` → `"5 min"` — the command-palette hint form. */
export function readTimeShort(minutes: number): string {
  return `${minutes} min`;
}

/* ------------------------------------------------------------- counting */

/** `pluralise(4, "ticket")` → `"4 tickets"`; `1` → `"1 ticket"`. */
export function pluralise(n: number, noun: string, plural?: string): string {
  return `${n} ${n === 1 ? noun : (plural ?? `${noun}s`)}`;
}

/** `"4 results"` / `"1 result"`. */
export function resultCount(n: number): string {
  return pluralise(n, "result");
}

/** `"4 articles"` / `"1 article"`. */
export function articleCount(n: number): string {
  return pluralise(n, "article");
}

/* ------------------------------------------------------ relative times */

/**
 * The comp stores relative stamps as authored strings ("2h ago", "Just now")
 * rather than dates, so this is a pass-through with one normalisation: an
 * empty stamp reads "Just now".
 */
export function relativeTime(stamp: string | null | undefined): string {
  return stamp && stamp.trim() ? stamp : NOW_STAMP;
}

/** The stamp every freshly created record carries. */
export const NOW_STAMP = "Just now";

/** "Updated 2h ago · Video Doorbell" — the ticket-row sub-line. */
export function updatedLine(updated: string, productName: string): string {
  return `Updated ${relativeTime(updated)} · ${productName}`;
}

/* ------------------------------------------------------------- date bits */

/**
 * The warranty expiry the comp derives as `'27 Jul ' + (year + 3)`.
 * Pass a clock for determinism in tests.
 */
export function warrantyExpiry(now: Date = new Date()): string {
  return `27 Jul ${now.getFullYear() + 3}`;
}

/** `"18 Jul, 09:14"` → `"18 Jul"` — the delivered headline takes the day. */
export function dayPart(when: string): string {
  return when.split(",")[0];
}

/* ------------------------------------------------------- code formatting */

/** `3118` → `"HH-3118"`. */
export function ticketCode(num: number): string {
  return `${CODE_PREFIX}${num}`;
}

/**
 * Normalise whatever the customer typed into an order id.
 * `88214` → `HH-88214`; `hh88214` → `HH-88214`; `#HH-88214` → `HH-88214`.
 */
export function normaliseOrderCode(raw: string): string {
  let s = raw.trim().toUpperCase().replace(/^#/, "").replace(/\s+/g, "");
  const bare = CODE_PREFIX.replace("-", "");
  if (/^\d{5}$/.test(s)) s = `${CODE_PREFIX}${s}`;
  if (new RegExp(`^${bare}\\d{5}$`).test(s)) {
    s = `${CODE_PREFIX}${s.slice(bare.length)}`;
  }
  return s;
}

/** `'WC-' + (48210 + registered * 7)` — 2 seeded devices → `WC-48224`. */
export function claimRef(registeredCount: number): string {
  return `WC-${48210 + registeredCount * 7}`;
}

/** `'RMA-' + (4419000 + picked * 137)` — 1 item → `RMA-4419137`. */
export function rmaRef(pickedCount: number): string {
  return `RMA-${4419000 + pickedCount * 137}`;
}

/** `'AP-' + (2050 + appointments)` — 4 seeded → `AP-2054`. */
export function repairRef(apptCount: number): string {
  return `AP-${2050 + apptCount}`;
}

/** `'TI-' + (70410 + quote)` — quote £38 → `TI-70448`. */
export function tradeInRef(quote: number): string {
  return `TI-${70410 + quote}`;
}

/** `'FB-' + (52100 + nps * 13 + tags)` — nps 9, 0 tags → `FB-52217`. */
export function surveyRef(nps: number, tagCount: number): string {
  return `FB-${52100 + nps * 13 + tagCount}`;
}

/** `HEARTH-4150-9221` for amount 50 and recipient "Ada". */
export function giftCode(amount: number, recipient: string): string {
  const a = String(4100 + Math.round(amount)).slice(0, 4);
  const b = String(9200 + recipient.length * 7).slice(0, 4);
  return `${GIFT_CODE_PREFIX}${a}-${b}`;
}

/** `'d' + (registered + 1)` / `'m' + (members + 1)`. */
export function nextRegisteredId(count: number): string {
  return `d${count + 1}`;
}

export function nextMemberId(count: number): string {
  return `m${count + 1}`;
}

/* ----------------------------------------------------------------- names */

/** `jo.smith@example.com` → `Jo Smith`. */
export function displayNameFromEmail(email: string): string {
  return email
    .split("@")[0]
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** First two characters, upper-cased — the avatar initials rule. */
export function initialsFrom(name: string): string {
  return name.slice(0, 2).toUpperCase();
}

/* ------------------------------------------------------------- subjects */

/**
 * Chat → ticket subject: the first user message, truncated to 60 characters
 * with trailing punctuation stripped and an ellipsis when longer than 62.
 */
export function subjectFromMessage(text: string): string {
  const first = text.trim();
  if (first.length <= 62) return first;
  return `${first.slice(0, 60).replace(/[\s,.;:—-]+$/, "")}…`;
}

/** Article titles longer than 52 chars are cut to 50 + `…` in breadcrumbs. */
export function truncateCrumb(title: string): string {
  return title.length > 52 ? `${title.slice(0, 50)}…` : title;
}

/* ------------------------------------------------------------ percentage */

export function percent(value: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((value / total) * 100);
}

/** `"72%"`. */
export function percentText(value: number): string {
  return `${Math.round(value)}%`;
}

/* -------------------------------------------------------------- numerics */

/** The energy bar height rule: `max(6, round(v / max * 130))` px. */
export function barHeight(value: number, max: number): number {
  if (max <= 0) return 6;
  return Math.max(6, Math.round((value / max) * 130));
}

/** `parseFloat("1.2 mi")` → `1.2`. */
export function distanceMiles(distance: string): number {
  return parseFloat(distance);
}
