/*
 * Pure derivations shared by the delta screens: the list filters, the grouped
 * rows, the pill vocabularies and every piece of generated copy.
 *
 * They live here rather than inside each screen so the store and the screen
 * agree on the numbers a toast quotes ("3 locations found") and so no two
 * screens can drift on a sentence. Nothing here touches the store, the DOM,
 * `Math.random()` or the clock.
 */

import { pluralise } from "./format";
import type {
  GiftFilterId,
  GiftPick,
  Invoice,
  InvoiceStatus,
  Leader,
  LeaderPeriod,
  PartStock,
  RecentEntry,
  RecentFilterId,
  RecentKind,
  StoreFilterId,
  StoreKind,
  StoreLocation,
  TransferReceipt,
  WishItem,
} from "../data/types";

/** The shape every soft pill in the delta screens is built from. */
export interface PillMeta {
  label: string;
  /** CSS custom property name, e.g. `--pos`. */
  fg: string;
  soft: string;
  icon: string;
}

/* ============================================================== stores == */

export const STORE_KIND_META: Record<StoreKind, PillMeta> = {
  flagship: { label: "Hearth store", fg: "--accent", soft: "--accent-soft", icon: "store" },
  stockist: { label: "Stockist", fg: "--info", soft: "--info-soft", icon: "shopping-bag" },
  recycling: { label: "Recycling point", fg: "--pos", soft: "--pos-soft", icon: "recycle" },
};

/** Kind filter AND a substring match of the query against name + address. */
export function filterStores(
  stores: StoreLocation[],
  query: string,
  kind: StoreFilterId,
): StoreLocation[] {
  const q = query.trim().toLowerCase();
  return stores.filter((s) => {
    if (kind !== "all" && s.kind !== kind) return false;
    if (!q) return true;
    return `${s.name} ${s.address}`.toLowerCase().includes(q);
  });
}

/** "Mon–Sat 9–6, Sun 11–5 · open now". */
export function storeMeta(store: StoreLocation): string {
  return `${store.hours} · ${store.open ? "open now" : "closed now"}`;
}

/** `map-stores-bristol.png`, or `map-stores-all.png` with no query. */
export function storeMapFile(query: string): string {
  const q = query.trim().toLowerCase();
  return `map-stores-${q ? q.replace(/[^a-z0-9]+/g, "-") : "all"}.png`;
}

/** Curly quotes, as authored. */
export function storeEmptyTitle(query: string): string {
  const q = query.trim();
  return q ? `Nothing near “${q}”` : "No locations in this filter";
}

export function storeSearchToast(count: number, query: string): string {
  if (!count) return "Nothing matched that search";
  return `${pluralise(count, "location")} near ${query.trim() || "you"}`;
}

export function storeKeyToast(count: number): string {
  return `${pluralise(count, "location")} found`;
}

/* ============================================================= billing == */

export const INVOICE_STATUS_META: Record<InvoiceStatus, PillMeta> = {
  paid: { label: "Paid", fg: "--pos", soft: "--pos-soft", icon: "check-circle-2" },
  refunded: { label: "Refunded", fg: "--info", soft: "--info-soft", icon: "rotate-ccw" },
  /* Deliberately not "Failed". */
  failed: { label: "Retrying", fg: "--warn", soft: "--warn-soft", icon: "alert-triangle" },
};

const PERIOD_RE: Record<string, RegExp> = {
  "2026": /2026$/,
  "2025": /2025$/,
  month: /Jul 2026$/,
};

/** Period scoping is a regex over the authored `date` string. */
export function invoicesInPeriod(invoices: Invoice[], period: string): Invoice[] {
  const re = PERIOD_RE[period];
  return re ? invoices.filter((i) => re.test(i.date)) : invoices;
}

export function filterInvoices(rows: Invoice[], filter: string): Invoice[] {
  return filter === "all" ? rows : rows.filter((i) => i.kind === filter);
}

export interface EmptyCopy {
  title: string;
  text: string;
}

/**
 * Two distinct empties: nothing in the period at all, or the kind filter
 * emptied a period that does have invoices.
 */
export function billingEmpty(periodCount: number, filter: string): EmptyCopy {
  if (!periodCount) {
    return {
      title: "No invoices in that period",
      text: "Nothing was issued while you were on this account in that period. Invoices appear the day they're raised, and we keep seven years of them.",
    };
  }
  const what = filter === "refund" ? "refunds" : `${filter} invoices`;
  return {
    title: "Nothing in this filter",
    text: `No ${what} in this period — try another filter, or export everything as a CSV.`,
  };
}

export const BL_INTRO =
  "Every invoice since you joined, plus what's coming next. Downloads are PDFs with VAT broken out.";

/** `free` / `£3.99 / month` / `£39.90 / year`. */
export function planPriceLine(monthly: number, cycle: string): string {
  if (monthly === 0) return "free";
  return cycle === "annual"
    ? `£${(monthly * 10).toFixed(2)} / year`
    : `£${monthly} / month`;
}

export function nextChargeLine(monthly: number, cycle: string): string {
  if (monthly === 0) return "Nothing to bill — the free tier has no charges.";
  const year = cycle === "annual" ? "2027" : "2026";
  return `Next charge 12 Aug ${year}, taken from the card below.`;
}

export function invoiceDownloadToast(invoice: Invoice): string {
  return invoice.status === "failed"
    ? `Retrying payment for ${invoice.id}`
    : `Downloading ${invoice.id.toLowerCase()}.pdf`;
}

/* ============================================================ wishlist == */

export const WISH_STOCK_META: Record<PartStock, PillMeta> = {
  in: { label: "In stock", fg: "--pos", soft: "--pos-soft", icon: "check" },
  low: { label: "Low stock", fg: "--warn", soft: "--warn-soft", icon: "alert-triangle" },
  out: { label: "Back in 2 weeks", fg: "--fg-subtle", soft: "--surface-3", icon: "clock" },
};

export function visibleWish(items: WishItem[], out: string[]): WishItem[] {
  return items.filter((w) => !out.includes(w.id));
}

export function wishDropped(item: WishItem): boolean {
  return item.price < item.was;
}

export function wishIntro(count: number): string {
  return count
    ? `${count} saved · we watch the price and tell you when something moves.`
    : "Nothing saved right now.";
}

/** The price-drop band, or `null` when nothing has moved. */
export function wishAlert(items: WishItem[]): string | null {
  const drops = items.filter(wishDropped);
  if (!drops.length) return null;
  if (drops.length === 1) {
    const one = drops[0];
    return `${one.name} has dropped £${one.was - one.price} since you saved it.`;
  }
  return `${drops.length} items have dropped in price since you saved them.`;
}

export function wishAddToast(item: WishItem): string {
  return item.stock === "out"
    ? "We'll email you when it's back"
    : `${item.name} added to your basket`;
}

/* ====================================================== recently viewed == */

export function visibleRecent(entries: RecentEntry[], out: string[]): RecentEntry[] {
  return entries.filter((e) => !out.includes(e.id));
}

/** Chip counts, computed from the not-forgotten list. */
export function recentCounts(
  entries: RecentEntry[],
): Record<RecentFilterId, number> {
  const counts: Record<RecentFilterId, number> = {
    all: entries.length,
    article: 0,
    product: 0,
  };
  for (const e of entries) counts[e.kind as RecentKind] += 1;
  return counts;
}

export function filterRecent(
  entries: RecentEntry[],
  cat: RecentFilterId,
): RecentEntry[] {
  return cat === "all" ? entries : entries.filter((e) => e.kind === cat);
}

export interface RecentGroup {
  when: string;
  rows: RecentEntry[];
  /** "3 items" / "1 item". */
  count: string;
}

/** Grouped by `when` in first-seen order. */
export function groupRecent(entries: RecentEntry[]): RecentGroup[] {
  const out: RecentGroup[] = [];
  for (const e of entries) {
    const group = out.find((g) => g.when === e.when);
    if (group) group.rows.push(e);
    else out.push({ when: e.when, rows: [e], count: "" });
  }
  for (const g of out) g.count = pluralise(g.rows.length, "item");
  return out;
}

export function recentIntro(count: number): string {
  return count
    ? `${count} things you've looked at recently, newest first. Stored on this device only.`
    : "Nothing here — your history is empty.";
}

/** Filtered-to-nothing reads differently from a cleared history. */
export function recentEmpty(hasHistory: boolean): EmptyCopy {
  return hasHistory
    ? {
        title: "Nothing in this filter",
        text: "Try another category — articles and products are tracked separately.",
      }
    : {
        title: "Your history is clear",
        text: "We've forgotten what you looked at. New visits will start appearing here again.",
      };
}

export const RECENT_PRODUCT_SUB = "Viewed in the Hearth store";

/* ========================================================= leaderboard == */

/**
 * Descending by count only. `Array.prototype.sort` is stable, so the seeded
 * tie between "You" and Sanjay P. keeps "You" in fourth place.
 */
export function sortLeaders(rows: Leader[]): Leader[] {
  return [...rows].sort((a, b) => b.count - a.count);
}

export function leaderTitle(period: LeaderPeriod): string {
  return period === "quarter" ? "Top referrers, this quarter" : "Top referrers, all time";
}

export const LB_UPDATED = "updated 12 minutes ago";

/** `£250` / `£120` / `£60`, or null outside the top three. */
export function leaderPrize(rank: number): string | null {
  if (rank === 1) return "£250";
  if (rank === 2) return "£120";
  if (rank === 3) return "£60";
  return null;
}

/** `£20` a friend. */
export function leaderEarned(count: number): string {
  return `£${count * 20}`;
}

export function leaderTier(count: number): string {
  if (count >= 10) return "Gold referrer";
  if (count >= 5) return "Silver referrer";
  return "Bronze referrer";
}

/** The line under "You" — the gap to third place, or a hold-your-place nudge. */
export function leaderLine(sorted: Leader[], you: Leader, rank: number): string {
  if (rank > 3 && sorted[2]) {
    const gap = sorted[2].count - you.count + 1;
    return `${gap} more and you're into the prize places. Every friend is still £20 either way.`;
  }
  return "You're in the prizes — hold your place until the quarter ends.";
}

/* ========================================================== gift guide == */

/** Every filter matches at least one pick, so there is no empty state. */
export function filterGiftPicks(picks: GiftPick[], filter: GiftFilterId): GiftPick[] {
  return filter === "all" ? picks : picks.filter((g) => g.tag === filter);
}

export function giftHasWas(pick: GiftPick): boolean {
  return pick.was > pick.price;
}

export const GG_SEASON = "WINTER 2026 GIFT GUIDE";
export const GG_TITLE = "Presents that make the house quieter, not busier.";
export const GG_BLURB =
  "Six things worth wrapping, picked by the people who answer the phone when they go wrong. Everything here installs in an evening without an electrician.";
export const GG_CUTOFF = "Free delivery, order by 19 Dec";

/* ============================================================ transfer == */

/** The confirmation paragraph. */
export function transferDoneLine(receipt: TransferReceipt): string {
  return `We've emailed ${receipt.to} at ${receipt.email}. Once they accept, the remaining cover on your ${receipt.name} moves across — it has already left your household.`;
}

/* =========================================================== insurance == */

export const INSURANCE_STATE_META: Record<string, PillMeta> = {
  ready: { label: "Ready", fg: "--pos", soft: "--pos-soft", icon: "check-circle-2" },
  building: { label: "Building", fg: "--warn", soft: "--warn-soft", icon: "loader" },
};

/** `Download pack` / `Check progress`. */
export function insurancePrimaryLabel(state: string): string {
  return state === "ready" ? "Download pack" : "Check progress";
}

export function insurancePrimaryIcon(state: string): string {
  return state === "ready" ? "download" : "refresh-cw";
}

/* ============================================================== basket == */

/** The wishlist "Add all in stock" success banner body. */
export const FREE_DELIVERY_LINE =
  "Delivery is free over £25 and everything ships together next working day.";
