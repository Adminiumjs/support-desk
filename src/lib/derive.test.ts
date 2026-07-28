/*
 * The derived-value layer (delta screens A/B, logic C).
 *
 * `derive.ts` exists for one reason: a number and the sentence that quotes it
 * must be computed once, so a toast, a chip and a paragraph can never drift
 * apart. This suite therefore does two jobs.
 *
 *   1. Pin each rule on its own — boundaries, ties, zero/one, empty input.
 *   2. Assert *coherence*: where a figure and its copy are produced by
 *      different functions, drive the copy from the same fixture the figure
 *      came from and check they agree. Those tests are the ones that would
 *      catch a "harmless" edit to one of the pair.
 *
 * The rules worth guarding hardest, because each is one plausible cleanup away
 * from being wrong:
 *
 *   a. The leaderboard gap ("n more and you're into the prize places") is
 *      `third.count - you.count + 1`. The `+ 1` is not padding: `sortLeaders`
 *      is descending-by-count only and `Array.prototype.sort` is stable, so
 *      *tying* with third leaves you fourth. Dropping the `+ 1` would print a
 *      number that does not actually move you.
 *   b. `billingEmpty` decides on the *period* count first and the kind filter
 *      second. Swap the order and an empty period blames the filter.
 *   c. Chip counts and rows come from `recentCounts` / `filterRecent`, which
 *      are separate functions over the same list. They must partition.
 *
 * Fixtures are hand-built here. Nothing asserts on seed copy that an editorial
 * pass could legitimately change; the places that touch `data/demo` do so to
 * check two authored sources agree with each other, not to pin a string.
 *
 * TWO TESTS ARE RED ON PURPOSE, each marked "FAILING ON PURPOSE" at the point
 * of assertion. Both are user-reachable copy/number disagreements whose fix
 * lives in app source this suite does not own:
 *
 *   - "quotes the next-charge date the plans screen quotes, on the annual
 *     cycle" — Plans says 12 Aug 2026, Billing says 12 Aug 2027.
 *   - "says 'thing', singular, for a history of one" — the recently-viewed
 *     lede reads "1 things you've looked at recently".
 */

import { describe, expect, it } from "vitest";
import { LB_PRIZES, PLAN_ANNUAL_LABEL, PLAN_BILLING_SUFFIX } from "../data/demo.ts";
import type {
  GiftPick,
  Invoice,
  InvoiceKind,
  InvoiceStatus,
  Leader,
  PartStock,
  RecentEntry,
  RecentFilterId,
  RecentKind,
  StoreKind,
  StoreLocation,
  TransferReceipt,
  WishItem,
} from "../data/types.ts";
import {
  INSURANCE_STATE_META,
  INVOICE_STATUS_META,
  WISH_STOCK_META,
  billingEmpty,
  filterGiftPicks,
  filterInvoices,
  filterRecent,
  filterStores,
  giftHasWas,
  groupRecent,
  insurancePrimaryIcon,
  insurancePrimaryLabel,
  invoiceDownloadToast,
  invoicesInPeriod,
  leaderEarned,
  leaderLine,
  leaderPrize,
  leaderTier,
  leaderTitle,
  nextChargeDate,
  nextChargeLine,
  planPriceLine,
  recentCounts,
  recentEmpty,
  recentIntro,
  sortLeaders,
  storeEmptyTitle,
  storeKeyToast,
  storeMapFile,
  storeMeta,
  storeSearchToast,
  transferDoneLine,
  visibleRecent,
  visibleWish,
  wishAddToast,
  wishAlert,
  wishDropped,
  wishIntro,
} from "./derive.ts";

/* ------------------------------------------------------------------ *
 * Fixtures — tiny, hand-checkable, no seed data
 * ------------------------------------------------------------------ */

function store(
  id: string,
  kind: StoreKind,
  name: string,
  address: string,
  over: Partial<StoreLocation> = {},
): StoreLocation {
  return {
    id,
    name,
    kind,
    address,
    distance: "0.4 mi",
    phone: "0117 000 0000",
    open: true,
    hours: "Mon–Sat 9–6",
    tint: "#000000",
    services: [],
    ...over,
  };
}

function invoice(
  id: string,
  date: string,
  kind: InvoiceKind,
  status: InvoiceStatus = "paid",
  amount = 10,
): Invoice {
  return { id, desc: id, date, amount, kind, status };
}

function wish(
  id: string,
  price: number,
  was: number,
  stock: PartStock = "in",
  name = id,
): WishItem {
  return { id, prod: "plug", name, blurb: "", price, was, added: "saved 1 Jul", stock };
}

function recent(id: string, kind: RecentKind, when: string): RecentEntry {
  return { id, kind, when, time: "14:20", ref: "a1", name: id, prod: "plug" };
}

function leader(name: string, count: number, you = false): Leader {
  return { name, initials: name.slice(0, 2), tint: "#000000", place: "Bristol", count, ...(you ? { you: true } : {}) };
}

function gift(id: string, tag: GiftPick["tag"], price: number, was: number): GiftPick {
  return { id, prod: "plug", forWho: "", name: id, price, was, badge: null, tag, blurb: "" };
}

/** `"£20"` → `20`. Lets a test compare a figure with the copy that quotes it. */
function poundsOf(text: string): number {
  const match = text.match(/£([\d.]+)/);
  return match ? Number(match[1]) : NaN;
}

/* ================================================================== *
 * Stores
 * ================================================================== */

const STORES = [
  store("s1", "flagship", "Hearth Bristol", "12 Park Street, Bristol"),
  store("s2", "stockist", "Wilcox Electrical", "8 High Street, Bath"),
  store("s3", "recycling", "Avonmouth Recycling", "Kings Weston Lane, Bristol"),
];

describe("filterStores", () => {
  it("returns everything when nothing is asked of it", () => {
    expect(filterStores(STORES, "", "all")).toHaveLength(3);
    expect(filterStores([], "bristol", "all")).toEqual([]);
  });

  it("applies the kind filter alone", () => {
    expect(filterStores(STORES, "", "flagship").map((s) => s.id)).toEqual(["s1"]);
    expect(filterStores(STORES, "", "recycling").map((s) => s.id)).toEqual(["s3"]);
  });

  it("matches the query against the name and the address", () => {
    expect(filterStores(STORES, "wilcox", "all").map((s) => s.id)).toEqual(["s2"]);
    expect(filterStores(STORES, "park street", "all").map((s) => s.id)).toEqual(["s1"]);
  });

  it("normalises case and surrounding whitespace, and only those", () => {
    expect(filterStores(STORES, "  BRISTOL  ", "all")).toHaveLength(2);
    /*
     * Internal whitespace is *not* collapsed and accents are *not* folded —
     * the match is a plain `includes` on the lower-cased pair. A double space
     * or a typed accent misses. Documented rather than fixed: the search box
     * is a demo affordance, but anyone adding fuzzy matching should start here.
     */
    expect(filterStores(STORES, "park  street", "all")).toEqual([]);
  });

  it("treats a whitespace-only query as no query at all", () => {
    /* `"   "` trims to `""`, so the kind filter is left in sole charge —
     * it must not fall through to an empty substring match on the kind. */
    expect(filterStores(STORES, "   ", "all")).toHaveLength(3);
    expect(filterStores(STORES, "   ", "stockist").map((s) => s.id)).toEqual(["s2"]);
  });

  it("combines the two filters rather than choosing between them", () => {
    /* "bristol" alone matches s1 and s3; the flagship chip cuts it to one. */
    expect(filterStores(STORES, "bristol", "flagship").map((s) => s.id)).toEqual(["s1"]);
    expect(filterStores(STORES, "bath", "flagship")).toEqual([]);
  });

  it("can match across the join between name and address", () => {
    /*
     * The haystack is `` `${name} ${address}` ``, so a query may straddle the
     * space between them and match text that appears nowhere contiguously on
     * the card. Surprising, but it is what makes "hearth bristol" work, and a
     * per-field match would quietly change the result count the toast quotes.
     */
    expect(filterStores(STORES, "bristol 12 park", "all").map((s) => s.id)).toEqual(["s1"]);
  });
});

describe("store copy", () => {
  it("quotes the same count the list is built from", () => {
    /* The toast is fired from the store with `filterStores(...).length`
     * (state/store.ts `storeSearch`) — the figure and the rows are one rule. */
    const rows = filterStores(STORES, "bristol", "all");
    expect(storeSearchToast(rows.length, "bristol")).toBe("2 locations near bristol");
    expect(storeKeyToast(rows.length)).toBe("2 locations found");
  });

  it("says 'location', singular, for exactly one", () => {
    const rows = filterStores(STORES, "bath", "all");
    expect(rows).toHaveLength(1);
    expect(storeSearchToast(rows.length, "bath")).toBe("1 location near bath");
    expect(storeKeyToast(rows.length)).toBe("1 location found");
  });

  it("falls back to 'near you' when the query is blank", () => {
    expect(storeSearchToast(3, "")).toBe("3 locations near you");
    expect(storeSearchToast(3, "   ")).toBe("3 locations near you");
  });

  it("describes zero differently depending on how the search was run", () => {
    /*
     * Deliberate assertion of an inconsistency, not an endorsement of it:
     * clicking Search fires `storeSearchToast` ("Nothing matched that search",
     * warn) but pressing Enter fires `storeKeyToast`, which has no zero branch
     * and reads "0 locations found" in the ok tone. Same list, same count, two
     * sentences. Flagged in the report.
     */
    expect(storeSearchToast(0, "bristol")).toBe("Nothing matched that search");
    expect(storeKeyToast(0)).toBe("0 locations found");
  });

  it("blames the search or the filter in the empty title", () => {
    expect(storeEmptyTitle("Bristol")).toBe("Nothing near “Bristol”");
    /* Trimmed, but the case the customer typed is preserved. */
    expect(storeEmptyTitle("  Bristol  ")).toBe("Nothing near “Bristol”");
    expect(storeEmptyTitle("")).toBe("No locations in this filter");
    expect(storeEmptyTitle("   ")).toBe("No locations in this filter");
  });

  it("slugs the map filename and names the no-query case 'all'", () => {
    expect(storeMapFile("")).toBe("map-stores-all.png");
    expect(storeMapFile("  ")).toBe("map-stores-all.png");
    expect(storeMapFile("Bristol")).toBe("map-stores-bristol.png");
    expect(storeMapFile("BS1 4TR")).toBe("map-stores-bs1-4tr.png");
    expect(storeMapFile("St. Ives")).toBe("map-stores-st-ives.png");
    /* Trailing punctuation leaves a trailing separator — the replace has no
     * edge trim. Cosmetic (it is a placeholder filename), pinned so a future
     * trim is a deliberate change rather than a surprise. */
    expect(storeMapFile("Bristol!")).toBe("map-stores-bristol-.png");
  });

  it("puts the open state after the authored hours", () => {
    expect(storeMeta(STORES[0])).toBe("Mon–Sat 9–6 · open now");
    expect(storeMeta(store("x", "stockist", "X", "Y", { open: false, hours: "Sun 11–5" }))).toBe(
      "Sun 11–5 · closed now",
    );
  });
});

/* ================================================================== *
 * Billing
 * ================================================================== */

const INVOICES = [
  invoice("INV-1", "12 Jul 2026", "plan"),
  invoice("INV-2", "04 Jul 2026", "hardware"),
  invoice("INV-3", "09 Jun 2026", "refund", "refunded", -129),
  invoice("INV-4", "12 Apr 2026", "plan", "failed"),
  invoice("INV-5", "12 Nov 2025", "plan"),
  invoice("INV-6", "02 Jul 2025", "hardware"),
];

describe("invoicesInPeriod", () => {
  it("scopes by the year the authored date ends with", () => {
    expect(invoicesInPeriod(INVOICES, "2026").map((i) => i.id)).toEqual([
      "INV-1",
      "INV-2",
      "INV-3",
      "INV-4",
    ]);
    expect(invoicesInPeriod(INVOICES, "2025").map((i) => i.id)).toEqual(["INV-5", "INV-6"]);
  });

  it("scopes 'month' to July 2026 only — not to July", () => {
    /* The month regex is `/Jul 2026$/`, so July 2025 is excluded. Matching on
     * "Jul" alone would silently mix two years into one month's total. */
    expect(invoicesInPeriod(INVOICES, "month").map((i) => i.id)).toEqual(["INV-1", "INV-2"]);
  });

  it("keeps 'month' a strict subset of its year", () => {
    const year = invoicesInPeriod(INVOICES, "2026").map((i) => i.id);
    const month = invoicesInPeriod(INVOICES, "month").map((i) => i.id);
    expect(month.every((id) => year.includes(id))).toBe(true);
    expect(month.length).toBeLessThan(year.length);
  });

  it("passes everything through for an unknown period", () => {
    /* No regex, no filtering — an unrecognised period must not empty the
     * table and trip the "No invoices in that period" copy. */
    expect(invoicesInPeriod(INVOICES, "1999")).toHaveLength(INVOICES.length);
    expect(invoicesInPeriod(INVOICES, "")).toHaveLength(INVOICES.length);
    expect(invoicesInPeriod([], "2026")).toEqual([]);
  });
});

describe("filterInvoices", () => {
  it("returns the same array contents for 'all'", () => {
    const rows = invoicesInPeriod(INVOICES, "2026");
    expect(filterInvoices(rows, "all")).toEqual(rows);
  });

  it("partitions the period across the three kind chips", () => {
    /*
     * The chips render `filterInvoices(inPeriod, id).length` while the table
     * renders the filtered rows. If the parts stopped summing to the whole,
     * a chip would promise rows the table cannot show.
     */
    const rows = invoicesInPeriod(INVOICES, "2026");
    const kinds: InvoiceKind[] = ["plan", "hardware", "refund"];
    const sum = kinds.reduce((n, k) => n + filterInvoices(rows, k).length, 0);
    expect(sum).toBe(filterInvoices(rows, "all").length);
  });

  it("returns nothing rather than everything when a kind is absent", () => {
    expect(filterInvoices(invoicesInPeriod(INVOICES, "month"), "refund")).toEqual([]);
  });
});

describe("billingEmpty", () => {
  it("blames the period first, whatever the filter is", () => {
    /* Precedence matters: with no invoices at all in the period, a kind chip
     * is not the reason the table is empty, and telling someone to "try
     * another filter" would send them round in circles. */
    for (const filter of ["all", "plan", "hardware", "refund"]) {
      expect(billingEmpty(0, filter).title).toBe("No invoices in that period");
    }
  });

  it("blames the filter once the period has invoices", () => {
    const empty = billingEmpty(4, "plan");
    expect(empty.title).toBe("Nothing in this filter");
    expect(empty.text).toContain("No plan invoices in this period");
  });

  it("says 'refunds', not 'refund invoices'", () => {
    /* The only kind whose label is not a noun phrase with "invoices". */
    expect(billingEmpty(4, "refund").text).toContain("No refunds in this period");
    expect(billingEmpty(4, "hardware").text).toContain("No hardware invoices in this period");
  });

  it("is only ever reached for a real kind filter", () => {
    /*
     * `billingEmpty(n, "all")` produces "No all invoices in this period" —
     * nonsense, but unreachable: Billing.tsx renders the empty state only when
     * `filterInvoices(inPeriod, blFilter)` is empty, and for "all" that is
     * `inPeriod` itself, which forces the periodCount === 0 branch above.
     * Pinned so that anyone who makes the second branch reachable (a new
     * "everything" chip, say) sees this test and writes the copy.
     */
    expect(billingEmpty(4, "all").text).toContain("No all invoices");
  });
});

describe("plan lines", () => {
  it("says 'free' and 'nothing to bill' together", () => {
    /* The price and the charge sentence must agree about the free tier —
     * a "£0 / month" next to "Nothing to bill" would be the give-away. */
    for (const cycle of ["monthly", "annual"]) {
      expect(planPriceLine(0, cycle)).toBe("free");
      expect(nextChargeLine(0, cycle)).toBe("Nothing to bill — the free tier has no charges.");
    }
  });

  it("prices the year at ten months, matching the 'two months free' label", () => {
    /*
     * Coherence, not a pinned string: the annual multiplier in derive.ts and
     * the discount claimed by the plan-switch label in demo.ts are authored
     * separately. Change one without the other and the maths stops matching
     * the promise.
     */
    const monthsFree = Number(PLAN_ANNUAL_LABEL.match(/(\d+) months free/)![1]);
    expect(poundsOf(planPriceLine(5, "annual"))).toBe(5 * (12 - monthsFree));
    expect(planPriceLine(3.99, "annual")).toBe("£39.90 / year");
  });

  it("pads the annual figure to two decimals but not the monthly one", () => {
    /*
     * Asymmetry inside one function, and the obvious "fix" would change what
     * the seeded plans render: `£3.99 / month` only looks padded because the
     * seed happens to have two decimals. A one-decimal price leaks straight
     * through — `format.planPrice` would have shown "£4.50". Flagged in the
     * report; pinned here so the behaviour is a decision, not an accident.
     */
    expect(planPriceLine(4.5, "monthly")).toBe("£4.5 / month");
    expect(planPriceLine(4.5, "annual")).toBe("£45.00 / year");
    expect(planPriceLine(4, "monthly")).toBe("£4 / month");
  });

  it("moves the next charge a year out on the annual cycle", () => {
    expect(nextChargeLine(3.99, "monthly")).toContain("12 Aug 2026");
    expect(nextChargeLine(3.99, "annual")).toContain("12 Aug 2027");
    /* Any unrecognised cycle is treated as monthly by both lines, so they
     * cannot disagree with each other. */
    expect(planPriceLine(3.99, "weekly")).toBe("£3.99 / month");
    expect(nextChargeLine(3.99, "weekly")).toContain("12 Aug 2026");
  });

  it("quotes the same next-charge date on both screens, whatever the cycle", () => {
    /*
     * Regression. This fact used to be authored twice — Billing derived it
     * from the cycle, Plans appended a hard-coded `PLAN_BILLING_SUFFIX` — so
     * switching to annual made one account read 12 Aug 2026 on Plans and
     * 12 Aug 2027 on Billing. Both now go through `nextChargeDate`, and the
     * suffix carries only the card.
     *
     * Asserting agreement rather than a literal: an editorial change to the
     * date should not fail this, but the two screens diverging must.
     */
    for (const cycle of ["monthly", "annual", "weekly"]) {
      expect(nextChargeLine(3.99, cycle)).toContain(nextChargeDate(cycle));
    }
    /* The suffix must no longer smuggle a second copy of the date in. Match a
     * year specifically — a bare \d{4} also matches the card's last four. */
    expect(PLAN_BILLING_SUFFIX).not.toMatch(/next charge/);
    expect(PLAN_BILLING_SUFFIX).not.toMatch(/20\d{2}/);

    /* And the two cycles really are different days. */
    expect(nextChargeDate("annual")).not.toBe(nextChargeDate("monthly"));
    /* Anything unrecognised falls back to the monthly date on both sides. */
    expect(nextChargeDate("weekly")).toBe(nextChargeDate("monthly"));
  });
});

describe("invoiceDownloadToast", () => {
  it("uses the same verb as the status pill for a failed payment", () => {
    /* The row shows "Retrying" (never "Failed"); the toast must not call it
     * something else. Driven off the pill so a relabel moves both. */
    const toast = invoiceDownloadToast(invoice("INV-9", "12 Apr 2026", "plan", "failed"));
    expect(toast.startsWith(INVOICE_STATUS_META.failed.label)).toBe(true);
    expect(toast).toBe("Retrying payment for INV-9");
  });

  it("lower-cases the id for the filename and only for the filename", () => {
    expect(invoiceDownloadToast(invoice("INV-9", "12 Jul 2026", "plan", "paid"))).toBe(
      "Downloading inv-9.pdf",
    );
    expect(invoiceDownloadToast(invoice("CRN-1", "09 Jun 2026", "refund", "refunded"))).toBe(
      "Downloading crn-1.pdf",
    );
  });
});

/* ================================================================== *
 * Wishlist
 * ================================================================== */

describe("visibleWish", () => {
  it("hides only the forgotten ids", () => {
    const items = [wish("w1", 10, 12), wish("w2", 10, 10)];
    expect(visibleWish(items, []).map((w) => w.id)).toEqual(["w1", "w2"]);
    expect(visibleWish(items, ["w1"]).map((w) => w.id)).toEqual(["w2"]);
    expect(visibleWish(items, ["w1", "w2"])).toEqual([]);
    /* An id that is not in the list is ignored, not an error — `wlOut` can
     * outlive the dataset it was built against. */
    expect(visibleWish(items, ["nope"])).toHaveLength(2);
  });
});

describe("wishDropped", () => {
  it("needs a strictly lower price", () => {
    expect(wishDropped(wish("w", 119, 129))).toBe(true);
    /* Equal is not a drop: the seed carries items whose `was` matches `price`
     * precisely so they do *not* light up the "Price drop" flag. */
    expect(wishDropped(wish("w", 129, 129))).toBe(false);
    /* And a rise certainly is not. */
    expect(wishDropped(wish("w", 139, 129))).toBe(false);
  });
});

describe("wishIntro", () => {
  it("switches sentence at zero", () => {
    expect(wishIntro(0)).toBe("Nothing saved right now.");
    expect(wishIntro(1)).toBe("1 saved · we watch the price and tell you when something moves.");
    expect(wishIntro(4)).toContain("4 saved");
  });
});

describe("wishAlert", () => {
  it("says nothing when nothing has moved", () => {
    expect(wishAlert([])).toBeNull();
    expect(wishAlert([wish("w1", 10, 10), wish("w2", 12, 12)])).toBeNull();
  });

  it("names the single item and quotes the size of its drop", () => {
    const item = wish("w1", 119, 149, "in", "Hearth Thermostat");
    expect(wishAlert([item])).toBe("Hearth Thermostat has dropped £30 since you saved it.");
  });

  it("counts, and stops naming, from two upwards", () => {
    const items = [wish("w1", 119, 149), wish("w2", 40, 58), wish("w3", 10, 10)];
    expect(wishAlert(items)).toBe("2 items have dropped in price since you saved them.");
    /* Only the dropped ones count — w3 is unchanged and must not inflate it. */
    expect(wishAlert(items)).not.toContain("3");
  });

  it("tracks the list on screen, not the dataset", () => {
    /*
     * Wish.tsx passes `visibleWish(...)` into `wishAlert`, so removing the one
     * discounted item must take the banner with it. Computing the banner from
     * the raw dataset would leave a price-drop callout above a list that no
     * longer contains the item.
     */
    const items = [wish("w1", 119, 149), wish("w2", 10, 10)];
    expect(wishAlert(visibleWish(items, []))).not.toBeNull();
    expect(wishAlert(visibleWish(items, ["w1"]))).toBeNull();
  });

  it("subtracts raw, with no money formatting", () => {
    /*
     * The singular branch interpolates `was - price` directly rather than
     * going through `format.money`. Integer seed prices hide it; a decimal
     * price would put binary float noise in the banner. Asserted as-is so the
     * defect is visible in the suite — see the report.
     */
    expect(wishAlert([wish("w1", 74.5, 89.99)])).toContain("£15.489999999999995");
  });
});

describe("wishAddToast", () => {
  it("promises an email only for out-of-stock items", () => {
    expect(wishAddToast(wish("w1", 39, 39, "out", "Chime kit"))).toBe(
      "We'll email you when it's back",
    );
    expect(wishAddToast(wish("w1", 39, 39, "in", "Chime kit"))).toBe(
      "Chime kit added to your basket",
    );
    /* "low" is still buyable — the pill warns, the toast does not. */
    expect(wishAddToast(wish("w1", 39, 39, "low", "Chime kit"))).toBe(
      "Chime kit added to your basket",
    );
  });

  it("agrees with the stock pill about which state is unavailable", () => {
    /* The only stock state whose pill promises a future date is the only one
     * whose toast promises an email. */
    const restocking = (Object.keys(WISH_STOCK_META) as PartStock[]).filter((s) =>
      /back in/i.test(WISH_STOCK_META[s].label),
    );
    expect(restocking).toEqual(["out"]);
    for (const stock of Object.keys(WISH_STOCK_META) as PartStock[]) {
      const emailed = wishAddToast(wish("w1", 1, 1, stock)).includes("email you");
      expect(emailed).toBe(restocking.includes(stock));
    }
  });
});

/* ================================================================== *
 * Recently viewed
 * ================================================================== */

const RECENT_ROWS = [
  recent("v1", "article", "Today"),
  recent("v2", "product", "Today"),
  recent("v3", "article", "Yesterday"),
  recent("v4", "product", "Earlier this week"),
];

describe("visibleRecent", () => {
  it("hides the forgotten ids and tolerates unknown ones", () => {
    expect(visibleRecent(RECENT_ROWS, [])).toHaveLength(4);
    expect(visibleRecent(RECENT_ROWS, ["v2", "v3"]).map((e) => e.id)).toEqual(["v1", "v4"]);
    expect(visibleRecent(RECENT_ROWS, ["ghost"])).toHaveLength(4);
    /* "Clear history" pushes every id into `rvOut` — that is the empty state,
     * not a special flag. */
    expect(visibleRecent(RECENT_ROWS, RECENT_ROWS.map((e) => e.id))).toEqual([]);
  });
});

describe("recentCounts", () => {
  it("counts nothing as zeroes, not as an empty object", () => {
    expect(recentCounts([])).toEqual({ all: 0, article: 0, product: 0 });
  });

  it("keeps every chip count equal to the rows that chip shows", () => {
    /*
     * The chip label and the list underneath it are computed by two different
     * functions over the same array. This is the assertion that stops them
     * drifting: a chip may never claim a number the filter cannot produce.
     */
    const visible = visibleRecent(RECENT_ROWS, ["v3"]);
    const counts = recentCounts(visible);
    for (const id of ["all", "article", "product"] as RecentFilterId[]) {
      expect(filterRecent(visible, id)).toHaveLength(counts[id]);
    }
    expect(counts).toEqual({ all: 3, article: 1, product: 2 });
  });

  it("partitions: the kinds add up to 'all'", () => {
    const counts = recentCounts(RECENT_ROWS);
    expect(counts.article + counts.product).toBe(counts.all);
    expect(counts.all).toBe(RECENT_ROWS.length);
  });

  it("keeps 'all' honest even if a row carries an unknown kind", () => {
    /*
     * `all` is the array length, not the sum of the buckets, so a malformed
     * row still counts in "Everything" — the row would render, and a chip that
     * disagreed with the list is the failure mode this guards. (The unknown
     * bucket itself goes NaN; unreachable while `kind` is a two-member union.)
     */
    const rows = [...RECENT_ROWS, { ...recent("v5", "article", "Today"), kind: "video" as RecentKind }];
    expect(recentCounts(rows).all).toBe(5);
  });
});

describe("filterRecent", () => {
  it("returns the list untouched for 'all'", () => {
    expect(filterRecent(RECENT_ROWS, "all")).toEqual(RECENT_ROWS);
  });

  it("keeps only the asked-for kind", () => {
    expect(filterRecent(RECENT_ROWS, "article").map((e) => e.id)).toEqual(["v1", "v3"]);
    expect(filterRecent([], "product")).toEqual([]);
  });
});

describe("groupRecent", () => {
  it("groups by `when` in first-seen order", () => {
    const groups = groupRecent(RECENT_ROWS);
    expect(groups.map((g) => g.when)).toEqual(["Today", "Yesterday", "Earlier this week"]);
    expect(groups[0].rows.map((r) => r.id)).toEqual(["v1", "v2"]);
  });

  it("returns no groups for no rows", () => {
    expect(groupRecent([])).toEqual([]);
  });

  it("merges a repeated `when` into the group that already exists", () => {
    /*
     * The lookup is `out.find(...)`, not "is this the same as the previous
     * row", so a Today row appearing *after* a Yesterday row is pulled back up
     * into the Today group rather than starting a second one. The list is
     * therefore not necessarily in the input's row order — which is correct
     * for a date-grouped history and the opposite of what a run-length
     * grouping would do.
     */
    const groups = groupRecent([
      recent("a", "article", "Today"),
      recent("b", "article", "Yesterday"),
      recent("c", "article", "Today"),
    ]);
    expect(groups.map((g) => g.when)).toEqual(["Today", "Yesterday"]);
    expect(groups[0].rows.map((r) => r.id)).toEqual(["a", "c"]);
    expect(groups[1].rows.map((r) => r.id)).toEqual(["b"]);
  });

  it("gives every group a count string that matches its own rows", () => {
    /* The header count and the rows beneath it are the same number, and the
     * singular is "1 item" — the off-by-one that reads worst. */
    for (const g of groupRecent(RECENT_ROWS)) {
      expect(g.count).toBe(`${g.rows.length} item${g.rows.length === 1 ? "" : "s"}`);
    }
    expect(groupRecent(RECENT_ROWS)[0].count).toBe("2 items");
    expect(groupRecent(RECENT_ROWS)[1].count).toBe("1 item");
  });

  it("counts the filtered rows, not the whole history", () => {
    /* Recent.tsx groups `filterRecent(visible, rvCat)`, so switching to the
     * Articles chip must shrink the group headers too. */
    const groups = groupRecent(filterRecent(RECENT_ROWS, "article"));
    expect(groups.map((g) => g.count)).toEqual(["1 item", "1 item"]);
  });
});

describe("recent copy", () => {
  it("switches the lede at zero", () => {
    expect(recentIntro(0)).toBe("Nothing here — your history is empty.");
    expect(recentIntro(7)).toContain("7 things you've looked at recently");
  });

  it("says 'thing', singular, for a history of one", () => {
    /*
     * FAILING ON PURPOSE — real defect, reachable in six clicks. `recentIntro`
     * interpolates the count raw instead of going through `format.pluralise`,
     * so forgetting rows until one is left renders "1 things you've looked at
     * recently". Every other count in this module pluralises: the group header
     * says "1 item", the store toast says "1 location". The fix is app source
     * this suite does not own, so the test stays red.
     */
    expect(recentIntro(1)).toContain("1 thing you've looked at recently");
  });

  it("distinguishes a filtered-to-nothing list from a cleared one", () => {
    /* `hasHistory` is "are there any visible rows at all", so the two empties
     * can never both be true. */
    expect(recentEmpty(true).title).toBe("Nothing in this filter");
    expect(recentEmpty(false).title).toBe("Your history is clear");
    expect(recentEmpty(false).text).toContain("forgotten");
  });
});

/* ================================================================== *
 * Leaderboard
 * ================================================================== */

/** Board.tsx's own ranking, so the tests rank exactly the way the screen does. */
function ranked(rows: Leader[]): { sorted: Leader[]; you: Leader; rank: number } {
  const sorted = sortLeaders(rows);
  const index = sorted.findIndex((l) => l.you);
  return { sorted, you: sorted[index] ?? sorted[0], rank: (index < 0 ? 0 : index) + 1 };
}

/** The same board with "You" on a different count. */
function bump(rows: Leader[], by: number): Leader[] {
  return rows.map((l) => (l.you ? { ...l, count: l.count + by } : l));
}

describe("sortLeaders", () => {
  it("orders by count, descending", () => {
    const sorted = sortLeaders([leader("A", 2), leader("B", 14), leader("C", 9)]);
    expect(sorted.map((l) => l.name)).toEqual(["B", "C", "A"]);
  });

  it("leaves a tie in the order it was authored", () => {
    /* The comparator is `b.count - a.count` and nothing else, so a tie is
     * settled by `Array.prototype.sort`'s stability — the seeded board relies
     * on this to keep "You" behind the other person on the same count. */
    const sorted = sortLeaders([leader("A", 5), leader("You", 2, true), leader("B", 2)]);
    expect(sorted.map((l) => l.name)).toEqual(["A", "You", "B"]);
  });

  it("does not reorder the array it was given", () => {
    /* `dataSource.leaders()` hands back the seed array itself; sorting it in
     * place would permanently reorder the demo data for every later render. */
    const rows = [leader("A", 2), leader("B", 14)];
    sortLeaders(rows);
    expect(rows.map((l) => l.name)).toEqual(["A", "B"]);
  });

  it("handles a board of nought and of one", () => {
    expect(sortLeaders([])).toEqual([]);
    expect(sortLeaders([leader("A", 0)]).map((l) => l.name)).toEqual(["A"]);
  });
});

describe("leaderTitle", () => {
  it("names the period it is showing", () => {
    expect(leaderTitle("quarter")).toBe("Top referrers, this quarter");
    expect(leaderTitle("alltime")).toBe("Top referrers, all time");
  });
});

describe("leaderPrize", () => {
  it("pays the top three and nobody else", () => {
    expect(leaderPrize(1)).toBe("£250");
    expect(leaderPrize(2)).toBe("£120");
    expect(leaderPrize(3)).toBe("£60");
    /* One past the boundary, and the degenerate ranks either side of it. */
    expect(leaderPrize(4)).toBeNull();
    expect(leaderPrize(0)).toBeNull();
    expect(leaderPrize(-1)).toBeNull();
  });

  it("pays what the prize cards promise", () => {
    /*
     * The pill on the row and the card at the bottom of the screen are
     * authored in two files. This checks they agree rather than pinning the
     * amounts — an editorial change to both keeps it green.
     */
    LB_PRIZES.forEach((prize, i) => {
      expect(leaderPrize(i + 1)).toBe(prize.prize);
    });
    /* And that there is exactly one card per paying rank. */
    expect(leaderPrize(LB_PRIZES.length + 1)).toBeNull();
  });
});

describe("leaderTier", () => {
  it("changes tier at the threshold, not one past it", () => {
    expect(leaderTier(0)).toBe("Bronze referrer");
    expect(leaderTier(4)).toBe("Bronze referrer");
    expect(leaderTier(5)).toBe("Silver referrer");
    expect(leaderTier(9)).toBe("Silver referrer");
    expect(leaderTier(10)).toBe("Gold referrer");
    expect(leaderTier(63)).toBe("Gold referrer");
  });

  it("does not promote a negative count", () => {
    expect(leaderTier(-3)).toBe("Bronze referrer");
  });
});

describe("leaderEarned", () => {
  it("pays £20 a friend, from zero", () => {
    expect(leaderEarned(0)).toBe("£0");
    expect(leaderEarned(1)).toBe("£20");
    expect(leaderEarned(14)).toBe("£280");
  });
});

describe("leaderLine", () => {
  it("congratulates anyone already in a prize place", () => {
    for (let rank = 1; rank <= 3; rank++) {
      const rows = [leader("A", 9), leader("B", 7), leader("C", 5)];
      rows[rank - 1] = { ...rows[rank - 1], you: true };
      const { sorted, you } = ranked(rows);
      expect(leaderLine(sorted, you, rank)).toBe(
        "You're in the prizes — hold your place until the quarter ends.",
      );
    }
  });

  it("agrees with leaderPrize about where the prize places end", () => {
    /*
     * The pill on your row (`leaderPrize`) and the sentence under your name
     * (`leaderLine`) decide "am I in the prizes?" independently. Ranks 1–5,
     * both answers, every time.
     */
    for (let rank = 1; rank <= 5; rank++) {
      const rows = Array.from({ length: 5 }, (_, i) =>
        leader(i === rank - 1 ? "You" : `P${i}`, 50 - i * 10, i === rank - 1),
      );
      const { sorted, you } = ranked(rows);
      const inPrizes = leaderLine(sorted, you, rank).includes("You're in the prizes");
      expect(inPrizes).toBe(leaderPrize(rank) !== null);
    }
  });

  it("quotes a gap that actually lands you in third", () => {
    /*
     * The whole point of the module. The sentence says "n more and you're into
     * the prize places"; this re-runs the screen's ranking with exactly n more
     * referrals and checks the promise holds — and that one fewer does not.
     */
    const rows = [leader("A", 9), leader("B", 7), leader("C", 5), leader("You", 2, true), leader("D", 2)];
    const { sorted, you, rank } = ranked(rows);
    expect(rank).toBe(4);

    const line = leaderLine(sorted, you, rank);
    const gap = Number(line.match(/^(\d+) more/)![1]);
    expect(gap).toBe(4); // 5 (third) − 2 (you) + 1

    expect(ranked(bump(rows, gap)).rank).toBe(3);
    expect(ranked(bump(rows, gap - 1)).rank).toBeGreaterThan(3);
  });

  it("still needs one more when you are level with third", () => {
    /*
     * The `+ 1` in the gap is load-bearing, and this is the case that proves
     * it: tied with third, the stable sort keeps you *below* them, so the
     * honest answer is 1 — not 0. A "gap = third − you" simplification would
     * print "0 more and you're into the prize places" to someone who is not.
     */
    const rows = [leader("A", 9), leader("B", 7), leader("C", 5), leader("You", 5, true)];
    const { sorted, you, rank } = ranked(rows);
    expect(rank).toBe(4);
    expect(leaderLine(sorted, you, rank)).toMatch(/^1 more/);
    expect(ranked(bump(rows, 1)).rank).toBe(3);
    /* Nought more changes nothing — still fourth. */
    expect(ranked(bump(rows, 0)).rank).toBe(4);
  });

  it("clears every tie at third in one step, not one person at a time", () => {
    /* Three people level on third place: passing the count passes all of them
     * at once, because the sort is on count alone. */
    const rows = [
      leader("A", 9),
      leader("B", 7),
      leader("C", 5),
      leader("D", 5),
      leader("E", 5),
      leader("You", 3, true),
    ];
    const { sorted, you, rank } = ranked(rows);
    expect(rank).toBe(6);
    const gap = Number(leaderLine(sorted, you, rank).match(/^(\d+) more/)![1]);
    expect(gap).toBe(3); // 5 − 3 + 1
    expect(ranked(bump(rows, gap)).rank).toBe(3);
  });

  it("quotes the same £20 a friend that the earnings column pays", () => {
    /*
     * "Every friend is still £20 either way" sits next to a column rendered by
     * `leaderEarned`. Derive the marginal rate from the column and check the
     * sentence quotes it.
     */
    const rows = [leader("A", 9), leader("B", 7), leader("C", 5), leader("You", 2, true)];
    const { sorted, you, rank } = ranked(rows);
    const quoted = Number(leaderLine(sorted, you, rank).match(/£(\d+) either way/)![1]);
    const marginal = poundsOf(leaderEarned(you.count + 1)) - poundsOf(leaderEarned(you.count));
    expect(quoted).toBe(marginal);
  });

  it("falls back to the congratulation on a board too short to have a third", () => {
    /*
     * `rank > 3 && sorted[2]` — with fewer than three rows there is no third
     * place to quote a gap to. Unreachable from the seeded boards (rank can
     * never exceed the row count), but the guard is what stops an
     * "undefined more and you're into the prize places".
     */
    const rows = [leader("A", 9), leader("You", 2, true)];
    const { sorted, you, rank } = ranked(rows);
    expect(rank).toBe(2);
    expect(leaderLine(sorted, you, rank)).toContain("You're in the prizes");
    /* Even asked for an impossible rank, it must not interpolate undefined. */
    expect(leaderLine(sorted, you, 9)).not.toContain("undefined");
  });
});

/* ================================================================== *
 * Gift guide
 * ================================================================== */

const PICKS = [
  gift("g1", "popular", 109, 129),
  gift("g2", "budget", 49, 58),
  gift("g3", "newhome", 109, 119),
  gift("g4", "budget", 25, 25),
];

describe("filterGiftPicks", () => {
  it("returns everything for 'all' and only the tag otherwise", () => {
    expect(filterGiftPicks(PICKS, "all")).toHaveLength(4);
    expect(filterGiftPicks(PICKS, "budget").map((g) => g.id)).toEqual(["g2", "g4"]);
  });

  it("returns nothing rather than falling back to everything", () => {
    /*
     * The screen has no empty state because every seeded filter matches at
     * least one pick. That is a property of the seed, not of this function —
     * if a filter ever stops matching, the grid must go empty here rather than
     * silently showing the whole guide under the wrong chip.
     */
    expect(filterGiftPicks(PICKS, "splurge")).toEqual([]);
    expect(filterGiftPicks([], "all")).toEqual([]);
  });
});

describe("giftHasWas", () => {
  it("only strikes through a genuinely higher old price", () => {
    expect(giftHasWas(PICKS[0])).toBe(true);
    /* The gift card is £25 was £25 — equal must not render a struck-through
     * "£25" beside an identical "£25". */
    expect(giftHasWas(PICKS[3])).toBe(false);
    expect(giftHasWas(gift("x", "budget", 30, 25))).toBe(false);
  });
});

/* ================================================================== *
 * Transfer / insurance
 * ================================================================== */

describe("transferDoneLine", () => {
  it("names the recipient, the address it went to and the device", () => {
    const receipt: TransferReceipt = {
      ref: "WT-8823-01",
      serial: "HD-8823",
      name: "Video Doorbell",
      to: "Ada Byron",
      email: "ada@example.com",
    };
    const line = transferDoneLine(receipt);
    expect(line).toContain("Ada Byron");
    expect(line).toContain("ada@example.com");
    expect(line).toContain("Video Doorbell");
    /* The paragraph makes a claim about state — the device has already gone —
     * which is what the screen's own copy is written around. */
    expect(line).toContain("already left your household");
  });
});

describe("insurance pack state", () => {
  it("labels and icons the two states consistently with the pill", () => {
    expect(insurancePrimaryLabel("ready")).toBe("Download pack");
    expect(insurancePrimaryIcon("ready")).toBe("download");
    expect(INSURANCE_STATE_META.ready.label).toBe("Ready");

    expect(insurancePrimaryLabel("building")).toBe("Check progress");
    expect(insurancePrimaryIcon("building")).toBe("refresh-cw");
    expect(INSURANCE_STATE_META.building.label).toBe("Building");
  });

  it("treats anything that is not 'ready' as still building", () => {
    /*
     * Both helpers test for "ready" rather than switching on the union, so an
     * unknown state degrades to the safe half — you are offered progress, not
     * a download that does not exist. Note the pill has no such fallback:
     * `INSURANCE_STATE_META[unknown]` is undefined, so a third state would
     * need a meta entry as well as these two branches.
     */
    expect(insurancePrimaryLabel("queued")).toBe("Check progress");
    expect(insurancePrimaryIcon("")).toBe("refresh-cw");
    expect(INSURANCE_STATE_META["queued"]).toBeUndefined();
  });
});
