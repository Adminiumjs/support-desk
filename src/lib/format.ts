/*
 * Formatters.
 *
 * Every number, price, percentage and date a customer reads goes through this
 * file, and every one of them is now rendered by `Intl` bound to the locale the
 * provider is currently showing — reached through `../i18n/ambient`, because
 * this is a pure module with no hook to hold. Before React mounts (and in the
 * vitest suites, which render nothing) the bridge serves `en-US`.
 *
 * What the locale decides: digit grouping, the decimal separator, where the
 * currency symbol sits, the numbering system (`٧٢٪` in Arabic), month and
 * weekday names, date field order, and whether a clock is 12- or 24-hour.
 *
 * What the locale does NOT decide: the currency. `CURRENCY` is a property of
 * Hearth's transactions, not of the reader's language — a German customer of a
 * British shop is billed in pounds and is shown pounds, formatted the German
 * way (`12,00 £`).
 *
 * Counted nouns do not live here as string surgery any more. `counted()` hands
 * the number to the message bundle, which carries one variant per CLDR plural
 * category for the locale; see `count.*` in `../i18n/strings/chrome.ts`.
 */

import { CODE_PREFIX, GIFT_CODE_PREFIX } from "../data/demo";
import {
  date as fmtDate,
  money as fmtMoney,
  number as fmtNumber,
  t,
} from "../i18n/ambient";
import type { MessageKey } from "../i18n/messages";

/** Hearth prices everything in pounds, whoever is reading. */
export const CURRENCY = "GBP";

/* ----------------------------------------------------------------- money */

/**
 * `-0` formats as "-£0.00" through `Intl`, which is technically right and
 * always wrong on a price tag. Every money helper folds it to a plain zero.
 */
const noNegZero = (n: number): number => (Object.is(n, -0) ? 0 : n);

/** `12` → `"£12.00"` (en-US) / `"12,00 £"` (de-DE). Always two decimals. */
export function money(amount: number): string {
  return fmtMoney(noNegZero(amount), CURRENCY);
}

/** `50` → `"£50"`, `12.5` → `"£12.50"` — drops the decimals on whole numbers. */
export function moneyLoose(amount: number): string {
  return amount % 1 ? money(amount) : wholeMoney(amount);
}

/** `149` → `"£149"`. Integer pounds, no decimals. */
export function poundsWhole(amount: number): string {
  /*
   * Rounded before formatting, not by formatting: `Math.round` breaks ties
   * toward +∞, so `-149.5` is `-149`. `Intl`'s own rounding is half-expand and
   * would give `-150`. The comp's arithmetic is the one being preserved.
   */
  return wholeMoney(Math.round(amount));
}

/** Currency style with the decimals suppressed — `money()` minus the pennies. */
function wholeMoney(amount: number): string {
  return fmtNumber(noNegZero(amount), {
    style: "currency",
    currency: CURRENCY,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

/** Monthly price for a plan card: `0` → `"Free"`, else `"£3.99"`. */
export function planPrice(amount: number): string {
  return amount === 0 ? t("lib.format.planPriceFree") : money(amount);
}

/**
 * Invoice amounts. The sign is the locale's own — a hyphen-minus in English, a
 * `؜-` in Arabic — and `Intl` places it correctly against the symbol rather
 * than the old hand-rolled `−£` prefix, which put a U+2212 in front of every
 * locale's layout whether or not it belonged there.
 */
export function signedMoney(amount: number): string {
  return money(amount);
}

/* ------------------------------------------------------------ read times */

/** `5` → `"5 min read"`. */
export function readTime(minutes: number): string {
  return t("lib.format.readTime", { minutes: fmtNumber(minutes) });
}

/** `5` → `"5 min"` — the command-palette hint form. */
export function readTimeShort(minutes: number): string {
  return t("lib.format.readTimeShort", { minutes: fmtNumber(minutes) });
}

/* ------------------------------------------------------------- counting */

/**
 * `counted('count.ticket', 4)` → `"4 tickets"` / `"4 Tickets"` / `"٤ طلبات"`.
 *
 * This replaces the old `pluralise(n, noun)`, which appended an English "s" and
 * therefore had exactly two plural forms available to it — enough for English
 * and Danish, wrong for Czech (three) and Arabic (six), and wrong again for
 * Chinese, which has one. The count now selects a variant through
 * `Intl.PluralRules`; the variants are authored per locale in the bundle.
 */
export function counted(key: MessageKey, n: number): string {
  return t(key, undefined, n);
}

/* ------------------------------------------------------ relative times */

/**
 * The comp stores relative stamps as authored strings ("2h ago", "Just now")
 * rather than dates, so this is a pass-through with two normalisations: an
 * empty stamp reads "just now", and so does the `NOW_STAMP` sentinel.
 *
 * `NOW_STAMP` is deliberately a stored *token*, not a translated string. A
 * ticket created while the portal was in German would otherwise carry a frozen
 * German stamp for the rest of the session, and switching to English would not
 * move it. Translating here — at the point of rendering — keeps the stored
 * record locale-free and the reading locale-current.
 */
export function relativeTime(stamp: string | null | undefined): string {
  const raw = stamp && stamp.trim() ? stamp : NOW_STAMP;
  return raw === NOW_STAMP ? t("lib.format.justNow") : raw;
}

/**
 * The sentinel every freshly created record carries. Never rendered directly —
 * `relativeTime()` swaps it for the reader's own wording.
 */
export const NOW_STAMP = "Just now";

/** "Updated 2h ago · Video Doorbell" — the ticket-row sub-line. */
export function updatedLine(updated: string, productName: string): string {
  return t("lib.format.updatedLine", {
    when: relativeTime(updated),
    product: productName,
  });
}

/* ------------------------------------------------------------- date bits */

/** Day + month + year, the way the reader's locale orders and names them. */
export function longDate(when: Date): string {
  return fmtDate(when, { day: "numeric", month: "short", year: "numeric" });
}

/** Day + month, no year — the clip and error stamps. */
export function shortDate(when: Date): string {
  return fmtDate(when, { day: "numeric", month: "short" });
}

/** A wall clock. 12-hour in en-US, 24-hour in de-DE — the locale decides. */
export function clockTime(when: Date, withSeconds = false): string {
  return fmtDate(when, {
    hour: "2-digit",
    minute: "2-digit",
    ...(withSeconds ? { second: "2-digit" } : {}),
  });
}

/**
 * The warranty expiry the comp derives as 27 July, three years out.
 * Pass a clock for determinism in tests.
 */
export function warrantyExpiry(now: Date = new Date()): string {
  return longDate(new Date(now.getFullYear() + 3, 6, 27));
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

/* ------------------------------------------------------------ delta refs */

/** `'AD-' + (90410 + ticked)` — all three boxes → `AD-90413`. */
export function deleteRef(tickedCount: number): string {
  return `AD-${90410 + tickedCount}`;
}

/** `'TA-' + (78200 + trimmedName.length * 11)`. */
export function tradeRef(nameLength: number): string {
  return `TA-${78200 + nameLength * 11}`;
}

/** `'RC-' + (31940 + items * 13)` — the default one item → `RC-31953`. */
export function recycleRef(itemCount: number): string {
  return `RC-${31940 + itemCount * 13}`;
}

/** `WT-8823-01` — the last four serial digits plus a 2-digit sequence. */
export function transferRef(serial: string, seq: number): string {
  const digits = (serial.match(/\d/g) ?? ["0"]).join("").slice(-4);
  return `WT-${digits}-${String(seq).padStart(2, "0")}`;
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

/** `72` → `"72%"` / `"72 %"` (fr-FR) / `"٧٢٪"` (ar-EG). */
export function percentText(value: number): string {
  /*
   * Rounded first, for the same reason `poundsWhole` is: the comp's rule is
   * `Math.round`, and `Intl` is asked only to render the result. Dividing by
   * 100 is what `style: 'percent'` expects — it multiplies back.
   */
  return fmtNumber(noNegZero(Math.round(value)) / 100, { style: "percent" });
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
