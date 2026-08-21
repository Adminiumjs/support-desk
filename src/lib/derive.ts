/*
 * Pure derivations shared by the delta screens: the list filters, the grouped
 * rows, the pill vocabularies and every piece of generated copy.
 *
 * They live here rather than inside each screen so the store and the screen
 * agree on the numbers a toast quotes ("3 locations found") and so no two
 * screens can drift on a sentence. Nothing here touches the store, the DOM,
 * `Math.random()` or the clock.
 */

import { counted, longDate, money, moneyLoose, shortDate } from "./format";
import { number as fmtNumber, t } from "../i18n/ambient";
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

/**
 * Pill vocabularies are functions rather than frozen tables: a table built at
 * module-evaluation time would hold whatever locale was active before React
 * mounted (always `en-US`) and never move again. Only the `label` is
 * locale-dependent; the token names and icons are machine identifiers.
 */
export function storeKindMeta(kind: StoreKind): PillMeta {
  const labels: Record<StoreKind, string> = {
    flagship: t("lib.stores.kindFlagship"),
    stockist: t("lib.stores.kindStockist"),
    recycling: t("lib.stores.kindRecycling"),
  };
  const style: Record<StoreKind, Omit<PillMeta, "label">> = {
    flagship: { fg: "--accent", soft: "--accent-soft", icon: "store" },
    stockist: { fg: "--info", soft: "--info-soft", icon: "shopping-bag" },
    recycling: { fg: "--pos", soft: "--pos-soft", icon: "recycle" },
  };
  return { label: labels[kind], ...style[kind] };
}

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
  return t("lib.stores.meta", {
    hours: store.hours,
    state: store.open ? t("lib.stores.openNow") : t("lib.stores.closedNow"),
  });
}

/** `map-stores-bristol.png`, or `map-stores-all.png` with no query. */
export function storeMapFile(query: string): string {
  const q = query.trim().toLowerCase();
  return `map-stores-${q ? q.replace(/[^a-z0-9]+/g, "-") : "all"}.png`;
}

/** Quotation marks are the locale's own — “…”, „…“, « … », 「…」. */
export function storeEmptyTitle(query: string): string {
  const q = query.trim();
  return q
    ? t("lib.stores.emptyQuery", { query: q })
    : t("lib.stores.emptyFilter");
}

export function storeSearchToast(count: number, query: string): string {
  if (!count) return t("lib.stores.searchNone");
  const locations = counted("count.location", count);
  const where = query.trim();
  return where
    ? t("lib.stores.searchNearQuery", { locations, query: where })
    : t("lib.stores.searchNearYou", { locations });
}

/**
 * `count` is passed as well as interpolated: French and Czech agree the past
 * participle with the noun ("1 adresse trouvée" / "2 adresses trouvées"), and
 * only `Intl.PluralRules` knows which form the number selects.
 */
export function storeKeyToast(count: number): string {
  return t(
    "lib.stores.foundToast",
    { locations: counted("count.location", count) },
    count,
  );
}

/* ============================================================= billing == */

export function invoiceStatusMeta(status: InvoiceStatus): PillMeta {
  const labels: Record<InvoiceStatus, string> = {
    paid: t("lib.billing.statusPaid"),
    refunded: t("lib.billing.statusRefunded"),
    /* Deliberately not "Failed". */
    failed: t("lib.billing.statusRetrying"),
  };
  const style: Record<InvoiceStatus, Omit<PillMeta, "label">> = {
    paid: { fg: "--pos", soft: "--pos-soft", icon: "check-circle-2" },
    refunded: { fg: "--info", soft: "--info-soft", icon: "rotate-ccw" },
    failed: { fg: "--warn", soft: "--warn-soft", icon: "alert-triangle" },
  };
  return { label: labels[status], ...style[status] };
}

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
      title: t("lib.billing.emptyPeriodTitle"),
      text: t("lib.billing.emptyPeriodText"),
    };
  }
  /*
   * One whole sentence per filter rather than a noun spliced into a frame:
   * "No refunds in this period" and "No plan invoices in this period" do not
   * share a skeleton once the article, gender and word order are the
   * translator's to choose.
   */
  const text =
    filter === "refund"
      ? t("lib.billing.emptyFilterRefund")
      : filter === "hardware"
        ? t("lib.billing.emptyFilterHardware")
        : t("lib.billing.emptyFilterPlan");
  return { title: t("lib.billing.emptyFilterTitle"), text };
}

export function blIntro(): string {
  return t("lib.billing.intro");
}

/** `free` / `£3.99 / month` / `£39.90 / year`. */
export function planPriceLine(monthly: number, cycle: string): string {
  if (monthly === 0) return t("lib.billing.planFree");
  return cycle === "annual"
    ? t("lib.billing.perYear", { price: money(monthly * 10) })
    : t("lib.billing.perMonth", { price: moneyLoose(monthly) });
}

/**
 * When the next payment falls, for a given cycle.
 *
 * The single source of this fact. Plans and Billing both quote it, and they
 * used to derive it independently — Billing from the cycle, Plans from a
 * hard-coded suffix in `demo.ts` — so switching to annual made the same
 * account show 12 Aug 2026 on one screen and 12 Aug 2027 on the other.
 *
 * The day and month are the comp's; the rendering is the reader's — "Aug 12,
 * 2026" in en-US, "12. Aug. 2026" in de-DE, "٢٠٢٦/٨/١٢" in ar-EG.
 */
export function nextChargeDate(cycle: string): string {
  return longDate(new Date(cycle === "annual" ? 2027 : 2026, 7, 12));
}

export function nextChargeLine(monthly: number, cycle: string): string {
  if (monthly === 0) return t("lib.billing.noCharge");
  return t("lib.billing.nextCharge", { date: nextChargeDate(cycle) });
}

export function invoiceDownloadToast(invoice: Invoice): string {
  return invoice.status === "failed"
    ? t("lib.billing.retryingPayment", { id: invoice.id })
    : t("lib.billing.downloading", { file: `${invoice.id.toLowerCase()}.pdf` });
}

/* ============================================================ wishlist == */

export function wishStockMeta(stock: PartStock): PillMeta {
  const labels: Record<PartStock, string> = {
    in: t("lib.wish.stockIn"),
    low: t("lib.wish.stockLow"),
    out: t("lib.wish.stockOut"),
  };
  const style: Record<PartStock, Omit<PillMeta, "label">> = {
    in: { fg: "--pos", soft: "--pos-soft", icon: "check" },
    low: { fg: "--warn", soft: "--warn-soft", icon: "alert-triangle" },
    out: { fg: "--fg-subtle", soft: "--surface-3", icon: "clock" },
  };
  return { label: labels[stock], ...style[stock] };
}

export function visibleWish(items: WishItem[], out: string[]): WishItem[] {
  return items.filter((w) => !out.includes(w.id));
}

export function wishDropped(item: WishItem): boolean {
  return item.price < item.was;
}

export function wishIntro(count: number): string {
  return count
    ? t("lib.wish.intro", { n: fmtNumber(count) })
    : t("lib.wish.introEmpty");
}

/** The price-drop band, or `null` when nothing has moved. */
export function wishAlert(items: WishItem[]): string | null {
  const drops = items.filter(wishDropped);
  if (!drops.length) return null;
  if (drops.length === 1) {
    const one = drops[0];
    return t("lib.wish.dropOne", {
      name: one.name,
      amount: moneyLoose(one.was - one.price),
    });
  }
  return t("lib.wish.dropMany", { n: fmtNumber(drops.length) }, drops.length);
}

export function wishAddToast(item: WishItem): string {
  return item.stock === "out"
    ? t("lib.wish.addOut")
    : t("lib.wish.added", { name: item.name });
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
  for (const g of out) g.count = counted("count.item", g.rows.length);
  return out;
}

export function recentIntro(count: number): string {
  /* Every other count in this module goes through `counted`; this one
   * interpolated a hard-coded plural, so forgetting all but one row left the
   * lede reading "1 things you've looked at recently". */
  return count
    ? t("lib.recent.intro", { things: counted("count.thing", count) }, count)
    : t("lib.recent.introEmpty");
}

/** Filtered-to-nothing reads differently from a cleared history. */
export function recentEmpty(hasHistory: boolean): EmptyCopy {
  return hasHistory
    ? {
        title: t("lib.recent.emptyFilterTitle"),
        text: t("lib.recent.emptyFilterText"),
      }
    : {
        title: t("lib.recent.emptyClearTitle"),
        text: t("lib.recent.emptyClearText"),
      };
}

export function recentProductSub(): string {
  return t("lib.recent.productSub");
}

/* ========================================================= leaderboard == */

/**
 * Descending by count only. `Array.prototype.sort` is stable, so the seeded
 * tie between "You" and Sanjay P. keeps "You" in fourth place.
 */
export function sortLeaders(rows: Leader[]): Leader[] {
  return [...rows].sort((a, b) => b.count - a.count);
}

export function leaderTitle(period: LeaderPeriod): string {
  return period === "quarter"
    ? t("lib.board.titleQuarter")
    : t("lib.board.titleAllTime");
}

export function lbUpdated(): string {
  return t("lib.board.updated", { minutes: fmtNumber(12) });
}

/** `£250` / `£120` / `£60`, or null outside the top three. */
export function leaderPrize(rank: number): string | null {
  if (rank === 1) return moneyLoose(250);
  if (rank === 2) return moneyLoose(120);
  if (rank === 3) return moneyLoose(60);
  return null;
}

/** `£20` a friend. */
export function leaderEarned(count: number): string {
  return moneyLoose(count * 20);
}

export function leaderTier(count: number): string {
  if (count >= 10) return t("lib.board.tierGold");
  if (count >= 5) return t("lib.board.tierSilver");
  return t("lib.board.tierBronze");
}

/** The line under "You" — the gap to third place, or a hold-your-place nudge. */
export function leaderLine(sorted: Leader[], you: Leader, rank: number): string {
  if (rank > 3 && sorted[2]) {
    const gap = sorted[2].count - you.count + 1;
    return t(
      "lib.board.gapLine",
      { n: fmtNumber(gap), amount: moneyLoose(20) },
      gap,
    );
  }
  return t("lib.board.holdLine");
}

/* ========================================================== gift guide == */

/** Every filter matches at least one pick, so there is no empty state. */
export function filterGiftPicks(picks: GiftPick[], filter: GiftFilterId): GiftPick[] {
  return filter === "all" ? picks : picks.filter((g) => g.tag === filter);
}

export function giftHasWas(pick: GiftPick): boolean {
  return pick.was > pick.price;
}

export function ggSeason(): string {
  return t("lib.guide.season");
}

export function ggTitle(): string {
  return t("lib.guide.title");
}

export function ggBlurb(): string {
  return t("lib.guide.blurb");
}

/** The order-by day, ordered and named by the reader's locale. */
export const GG_CUTOFF_DATE = new Date(2026, 11, 19);

export function ggCutoff(): string {
  return t("lib.guide.cutoff", { date: shortDate(GG_CUTOFF_DATE) });
}

/* ============================================================ transfer == */

/** The confirmation paragraph. */
export function transferDoneLine(receipt: TransferReceipt): string {
  return t("lib.transfer.done", {
    name: receipt.to,
    email: receipt.email,
    product: receipt.name,
  });
}

/* =========================================================== insurance == */

export function insuranceStateMeta(state: string): PillMeta {
  return state === "ready"
    ? {
        label: t("lib.insurance.stateReady"),
        fg: "--pos",
        soft: "--pos-soft",
        icon: "check-circle-2",
      }
    : {
        label: t("lib.insurance.stateBuilding"),
        fg: "--warn",
        soft: "--warn-soft",
        icon: "loader",
      };
}

/** `Download pack` / `Check progress`. */
export function insurancePrimaryLabel(state: string): string {
  return state === "ready"
    ? t("lib.insurance.download")
    : t("lib.insurance.checkProgress");
}

export function insurancePrimaryIcon(state: string): string {
  return state === "ready" ? "download" : "refresh-cw";
}

/* ============================================================== basket == */

/** The wishlist "Add all in stock" success banner body. */
export function freeDeliveryLine(): string {
  return t("lib.basket.freeDelivery", { amount: moneyLoose(25) });
}
