/*
 * The four search surfaces (port spec §10).
 *
 * Everything here runs on hand-built fixtures — a copy edit to the demo
 * knowledge base must never turn this file red.
 *
 * The rules worth guarding hardest:
 *
 *   1. An empty query is not the same thing everywhere. `matchArticles`
 *      matches *everything* (it is the KB page's "no filter"), while the two
 *      dropdowns show *nothing* until you type. Collapsing those two into one
 *      behaviour dumps the whole knowledge base into a header dropdown.
 *   2. Ranking is a three-tier score with a stable tie-break on source order.
 *      `Array.prototype.sort` is stable in every engine the app supports, and
 *      the explicit `|| a.i - b.i` says so out loud; both are pinned here.
 *   3. The facet counts are computed *before* the facet filter and the count
 *      label *after* it. They are deliberately different numbers.
 *   4. Normalisation is trim + lower-case and nothing else. No accent folding,
 *      no whitespace collapsing — asserted below so the limits are visible
 *      rather than assumed.
 */

import { describe, expect, it } from "vitest";
import type { Article, Category, Command } from "../data/types.ts";
import {
  HEADER_SEARCH_LIMIT,
  HERO_SEARCH_LIMIT,
  PALETTE_EMPTY_LIMIT,
  PALETTE_LIMIT,
  clampIndex,
  headerSearch,
  heroSearch,
  kbSearch,
  matchArticles,
  rankCommands,
  scoreCommand,
  showsGroupHeader,
} from "./search.ts";

/* ------------------------------------------------------------------ *
 * Fixtures
 * ------------------------------------------------------------------ */

function article(
  id: string,
  title: string,
  snippet: string,
  cat: Article["cat"] = "setup",
  read = 3,
): Article {
  return { id, cat, title, read, snippet };
}

const HUB = article("a1", "Pairing the hub", "Hold the button for ten seconds", "setup", 4);
const WIFI = article("a2", "Wi-Fi keeps dropping", "Move the hub off channel 13", "connect", 2);
const OFFLINE = article("a3", "Device shows offline", "A sensor that dropped off the network", "devices", 7);
const BILLING = article("a4", "Change your card", "Billing lives under Account", "account", 1);

const ARTICLES = [HUB, WIFI, OFFLINE, BILLING];

function category(slug: Category["slug"], name: string): Category {
  return { slug, name, icon: "cog", tint: "#000000", blurb: "" };
}

const CATEGORIES = [
  category("setup", "Setup"),
  category("connect", "Connectivity"),
  category("devices", "Devices"),
];

function command(
  id: string,
  label: string,
  group: string,
  words = "",
  hint = "Screen",
): Command {
  return { id, label, icon: "cog", group, hint, words, run: () => {} };
}

/* ------------------------------------------------------------------ *
 * matchArticles — rules 1 and 4
 * ------------------------------------------------------------------ */

describe("matchArticles", () => {
  it("matches the title or the snippet, case-insensitively", () => {
    expect(matchArticles(ARTICLES, "pairing").map((a) => a.id)).toEqual(["a1"]);
    expect(matchArticles(ARTICLES, "PAIRING").map((a) => a.id)).toEqual(["a1"]);
    /* "billing" appears only in a snippet. */
    expect(matchArticles(ARTICLES, "billing").map((a) => a.id)).toEqual(["a4"]);
  });

  it("matches a substring, not a word — no tokenising", () => {
    expect(matchArticles(ARTICLES, "air").map((a) => a.id)).toEqual(["a1"]); // "Pairing"
  });

  it("returns everything for an empty or blank query — rule 1", () => {
    expect(matchArticles(ARTICLES, "")).toHaveLength(4);
    expect(matchArticles(ARTICLES, "   ")).toHaveLength(4);
  });

  it("returns a fresh array, never the caller's", () => {
    /* The KB page sorts the result in place elsewhere; handing back the source
     * array would let a sort reorder the store's own data. */
    const all = matchArticles(ARTICLES, "");
    expect(all).not.toBe(ARTICLES);
    expect(all).toEqual(ARTICLES);
  });

  it("returns nothing on a genuine miss, and copes with an empty corpus", () => {
    expect(matchArticles(ARTICLES, "thermostat")).toEqual([]);
    expect(matchArticles([], "hub")).toEqual([]);
    expect(matchArticles([], "")).toEqual([]);
  });

  it("preserves source order rather than ranking", () => {
    /* "off" hits a2 in its snippet only and a3 in its title. The title hit
     * does NOT float to the top — this surface has no scoring at all. */
    expect(matchArticles(ARTICLES, "off").map((a) => a.id)).toEqual(["a2", "a3"]);
  });

  it("trims the query at the ends but does not collapse it inside — rule 4", () => {
    expect(matchArticles(ARTICLES, "  hub  ").map((a) => a.id)).toEqual(["a1", "a2"]);
    /*
     * A double space between words is NOT normalised, so a fat-fingered query
     * finds nothing even though the words are both there. Documented rather
     * than fixed: substring matching is the stated rule (§10), and collapsing
     * whitespace would also have to decide what to do with a quoted phrase.
     */
    expect(matchArticles(ARTICLES, "pairing  the")).toEqual([]);
  });

  it("does not fold accents — rule 4", () => {
    /*
     * `norm` is trim + toLowerCase only. A customer searching "cafe" will not
     * find "Café", and vice versa. Harmless for the current English corpus,
     * a real gap the moment an article title carries a diacritic; the fix is
     * `.normalize("NFD").replace(/\p{Diacritic}/gu, "")` on both sides.
     */
    const cafe = [article("c1", "Café mode", "Ambient lighting")];
    expect(matchArticles(cafe, "cafe")).toEqual([]);
    /* Case still folds across the accent, so this half works. */
    expect(matchArticles(cafe, "CAFÉ")).toHaveLength(1);
  });
});

/* ------------------------------------------------------------------ *
 * The two dropdowns — rule 1
 * ------------------------------------------------------------------ */

describe("header and hero dropdowns", () => {
  it("show nothing until something is typed", () => {
    expect(headerSearch(ARTICLES, "")).toEqual([]);
    expect(headerSearch(ARTICLES, "   ")).toEqual([]);
    expect(heroSearch(ARTICLES, "")).toEqual([]);
    expect(heroSearch(ARTICLES, "   ")).toEqual([]);
  });

  it("cap at their own limits", () => {
    const many = Array.from({ length: 20 }, (_, i) =>
      article(`m${i}`, `Hub topic ${i}`, ""),
    );
    expect(HEADER_SEARCH_LIMIT).toBe(5);
    expect(HERO_SEARCH_LIMIT).toBe(6);
    expect(headerSearch(many, "hub")).toHaveLength(HEADER_SEARCH_LIMIT);
    expect(heroSearch(many, "hub")).toHaveLength(HERO_SEARCH_LIMIT);
  });

  it("take the first N in source order, not the best N", () => {
    const many = Array.from({ length: 8 }, (_, i) =>
      article(`m${i}`, `Hub topic ${i}`, ""),
    );
    expect(headerSearch(many, "hub").map((a) => a.id)).toEqual([
      "m0",
      "m1",
      "m2",
      "m3",
      "m4",
    ]);
  });

  it("return fewer than the cap when fewer match", () => {
    expect(headerSearch(ARTICLES, "pairing")).toHaveLength(1);
    expect(headerSearch(ARTICLES, "thermostat")).toEqual([]);
  });
});

/* ------------------------------------------------------------------ *
 * The knowledge-base page — rule 3
 * ------------------------------------------------------------------ */

describe("kbSearch", () => {
  it("counts facets over the query result, before the facet filter", () => {
    const r = kbSearch(ARTICLES, CATEGORIES, "hub", "all", "relevance");
    expect(r.base.map((a) => a.id)).toEqual(["a1", "a2"]);
    expect(r.facets).toEqual([
      { id: "all", name: "All", count: 2 },
      { id: "setup", name: "Setup", count: 1 },
      { id: "connect", name: "Connectivity", count: 1 },
      { id: "devices", name: "Devices", count: 0 },
    ]);
  });

  it("keeps the facet counts steady when the facet changes — rule 3", () => {
    /*
     * The counts describe the query, not the current selection: narrowing to
     * one category must not renumber the others to 0, or the chips become
     * unclickable one at a time.
     */
    const all = kbSearch(ARTICLES, CATEGORIES, "hub", "all", "relevance");
    const narrowed = kbSearch(ARTICLES, CATEGORIES, "hub", "setup", "relevance");
    expect(narrowed.facets).toEqual(all.facets);
    expect(narrowed.list.map((a) => a.id)).toEqual(["a1"]);
    /* `base` ignores the facet too — it is the pre-filter set by definition. */
    expect(narrowed.base.map((a) => a.id)).toEqual(["a1", "a2"]);
  });

  it("shows the whole corpus for an empty query", () => {
    const r = kbSearch(ARTICLES, CATEGORIES, "", "all", "relevance");
    expect(r.list).toHaveLength(4);
    expect(r.facets[0].count).toBe(4);
  });

  it("returns an empty list for an unknown facet, keeping the chips", () => {
    const r = kbSearch(ARTICLES, CATEGORIES, "", "shipping", "relevance");
    expect(r.list).toEqual([]);
    expect(r.facets).toHaveLength(4);
    expect(r.countLabel).toBe("0 results");
  });

  it("leaves the order alone under 'relevance'", () => {
    /* There is no scoring on this surface: relevance means source order. */
    const r = kbSearch(ARTICLES, CATEGORIES, "", "all", "relevance");
    expect(r.list.map((a) => a.id)).toEqual(["a1", "a2", "a3", "a4"]);
  });

  it("sorts shortest first, keeping ties in source order", () => {
    const tie = [
      article("t1", "Bravo", "", "setup", 5),
      article("t2", "Alpha", "", "setup", 5),
      article("t3", "Charlie", "", "setup", 1),
    ];
    const r = kbSearch(tie, CATEGORIES, "", "all", "short");
    expect(r.list.map((a) => a.id)).toEqual(["t3", "t1", "t2"]);
  });

  it("sorts A–Z case-insensitively via localeCompare", () => {
    /*
     * A naive `a.title < b.title` would put every capitalised title before
     * every lower-case one ("Zebra" before "apple"). localeCompare does not,
     * which is the whole reason it is used here.
     */
    const mixed = [
      article("z", "Zebra crossings", ""),
      article("a", "apple pairing", ""),
      article("b", "Banana hub", ""),
    ];
    const r = kbSearch(mixed, CATEGORIES, "", "all", "az");
    expect(r.list.map((a) => a.id)).toEqual(["a", "b", "z"]);
  });

  it("does not mutate the corpus while sorting", () => {
    const order = ARTICLES.map((a) => a.id);
    kbSearch(ARTICLES, CATEGORIES, "", "all", "az");
    expect(ARTICLES.map((a) => a.id)).toEqual(order);
  });

  it("labels the count off the filtered list, not the base — rule 3", () => {
    /* 2 articles match "hub" but only 1 is in Setup: the line reads 1. */
    const r = kbSearch(ARTICLES, CATEGORIES, "hub", "setup", "relevance");
    expect(r.base).toHaveLength(2);
    expect(r.countLabel).toBe("1 result for “hub”");
  });

  it("pluralises the count and quotes the query with curly quotes", () => {
    const none = kbSearch(ARTICLES, CATEGORIES, "thermostat", "all", "relevance");
    expect(none.countLabel).toBe("0 results for “thermostat”");
    const two = kbSearch(ARTICLES, CATEGORIES, "hub", "all", "relevance");
    expect(two.countLabel).toBe("2 results for “hub”");
  });

  it("drops the 'for …' clause on a blank query and quotes the trimmed text", () => {
    expect(kbSearch(ARTICLES, CATEGORIES, "", "all", "relevance").countLabel).toBe(
      "4 results",
    );
    expect(kbSearch(ARTICLES, CATEGORIES, "   ", "all", "relevance").countLabel).toBe(
      "4 results",
    );
    /* The label shows what was searched for, not what was typed. */
    expect(
      kbSearch(ARTICLES, CATEGORIES, "  hub  ", "all", "relevance").countLabel,
    ).toBe("2 results for “hub”");
  });

  it("copes with no categories at all", () => {
    const r = kbSearch(ARTICLES, [], "", "all", "relevance");
    expect(r.facets).toEqual([{ id: "all", name: "All", count: 4 }]);
    expect(r.list).toHaveLength(4);
  });
});

/* ------------------------------------------------------------------ *
 * The command palette — rule 2
 * ------------------------------------------------------------------ */

describe("scoreCommand", () => {
  const cmd = command("c1", "Open live chat", "Actions", "agent talk human", "c");

  it("scores a prefix 0, a containment 1 and a keyword hit 2", () => {
    expect(scoreCommand(cmd, "open")).toBe(0);
    expect(scoreCommand(cmd, "live")).toBe(1);
    expect(scoreCommand(cmd, "human")).toBe(2);
    /* The group name is folded into tier 3 alongside the keywords. */
    expect(scoreCommand(cmd, "actions")).toBe(2);
  });

  it("scores a miss -1 so it can be filtered out", () => {
    expect(scoreCommand(cmd, "thermostat")).toBe(-1);
  });

  it("normalises case and surrounding whitespace", () => {
    expect(scoreCommand(cmd, "  OPEN ")).toBe(0);
    expect(scoreCommand(cmd, "LIVE")).toBe(1);
  });

  it("scores everything 0 on an empty query", () => {
    /* Nothing is more relevant than anything else when nothing was typed.
     * `rankCommands` never asks — it short-circuits — but the function is
     * exported and must not return -1 (which would mean "drop it"). */
    expect(scoreCommand(cmd, "")).toBe(0);
    expect(scoreCommand(cmd, "   ")).toBe(0);
  });

  it("prefers the strongest tier when several would match", () => {
    const both = command("c2", "Chat", "Actions", "chat chat chat", "c");
    expect(scoreCommand(both, "chat")).toBe(0);
  });
});

describe("rankCommands", () => {
  const ROWS = [
    command("r1", "Track an order", "Orders", "delivery parcel"),
    command("r2", "Open live chat", "Actions", "agent talk", "c"),
    command("r3", "Orders overview", "Orders", ""),
    command("r4", "Return an order", "Orders", ""),
    command("r5", "Settings", "Account", "order history"),
  ];

  it("orders prefix hits, then containments, then keyword-only hits", () => {
    expect(rankCommands(ROWS, "order").map((c) => c.id)).toEqual([
      "r3", // label starts with "Orders"
      "r1", // label contains "order"
      "r4", // label contains "order"
      "r5", // only the keywords contain it
    ]);
  });

  it("breaks ties on source order, not label or id", () => {
    /* r1 and r4 both score 1; r1 wins because it comes first in the list. */
    const reversed = [...ROWS].reverse();
    expect(rankCommands(reversed, "order").map((c) => c.id)).toEqual([
      "r3",
      "r4",
      "r1",
      "r5",
    ]);
  });

  it("drops the misses entirely", () => {
    expect(rankCommands(ROWS, "chat").map((c) => c.id)).toEqual(["r2"]);
    expect(rankCommands(ROWS, "thermostat")).toEqual([]);
  });

  it("caps a broad query at the palette limit", () => {
    const many = Array.from({ length: 30 }, (_, i) =>
      command(`m${i}`, `Open thing ${i}`, "Actions"),
    );
    expect(PALETTE_LIMIT).toBe(12);
    expect(rankCommands(many, "open")).toHaveLength(PALETTE_LIMIT);
  });

  it("puts actions before screens on an empty query — rule 1", () => {
    /*
     * The comp pushed screens first and then sliced 9, which buried the
     * Actions group where no one could reach it without typing (spec §13.2
     * #10). This ordering is the fix, so it is asserted, not incidental.
     */
    const mixed = [
      command("s1", "Home", "Browse", "", "Screen"),
      command("a1", "Toggle theme", "Actions", "", "t"),
      command("s2", "Orders", "Browse", "", "Screen"),
      command("a2", "Open a ticket", "Actions", "", "n"),
    ];
    expect(rankCommands(mixed, "").map((c) => c.id)).toEqual([
      "a1",
      "a2",
      "s1",
      "s2",
    ]);
    expect(rankCommands(mixed, "   ").map((c) => c.id)).toEqual([
      "a1",
      "a2",
      "s1",
      "s2",
    ]);
  });

  it("caps the empty-query list at nine", () => {
    const many = Array.from({ length: 20 }, (_, i) =>
      command(`s${i}`, `Screen ${i}`, "Browse", "", "Screen"),
    );
    expect(PALETTE_EMPTY_LIMIT).toBe(9);
    expect(rankCommands(many, "")).toHaveLength(PALETTE_EMPTY_LIMIT);
  });

  it("shows nothing on an empty query when nothing qualifies", () => {
    /* A row that is neither an Action nor a Screen is unreachable until the
     * user types — by design, the empty palette is a shortlist. */
    const odd = [command("x1", "Something else", "Other", "", "Action")];
    expect(rankCommands(odd, "")).toEqual([]);
  });

  it("would list a row twice if it were both an Action and a Screen", () => {
    /*
     * The empty-query branch concatenates two independently-filtered lists
     * with no de-duplication. No real command is in group "Actions" *and*
     * hinted "Screen" (screens carry their own group names), so this is
     * unreachable today — but if one ever is, it renders twice and React
     * gets a duplicate `key` in CommandPalette. Pinned so the day it happens
     * this test says why.
     */
    const dual = [command("d1", "Dashboard", "Actions", "", "Screen")];
    expect(rankCommands(dual, "").map((c) => c.id)).toEqual(["d1", "d1"]);
  });

  it("ignores the Action/Screen split once something is typed", () => {
    const odd = [command("x1", "Something else", "Other", "", "Action")];
    expect(rankCommands(odd, "some").map((c) => c.id)).toEqual(["x1"]);
  });
});

describe("clampIndex", () => {
  it("clamps into the list", () => {
    expect(clampIndex(0, 5)).toBe(0);
    expect(clampIndex(3, 5)).toBe(3);
    expect(clampIndex(4, 5)).toBe(4);
    /* One past the end lands on the last row, not off it. */
    expect(clampIndex(5, 5)).toBe(4);
    expect(clampIndex(99, 5)).toBe(4);
    expect(clampIndex(-1, 5)).toBe(0);
    expect(clampIndex(0, 1)).toBe(0);
  });

  it("returns 0 on an empty list — NOT the -1 its doc comment promises", () => {
    /*
     * The JSDoc says "-1 when the list is empty"; the code returns 0. The code
     * is what the app does — `cpMove` in state/store.ts inlines exactly this
     * expression, including the `len ? … : 0` — and nothing imports
     * `clampIndex` at all, so no screen can tell the difference. Asserting the
     * real behaviour rather than the comment; see the report.
     */
    expect(clampIndex(0, 0)).toBe(0);
    expect(clampIndex(3, 0)).toBe(0);
    expect(clampIndex(-3, -1)).toBe(0);
  });
});

describe("showsGroupHeader", () => {
  const rows = [
    command("g1", "A", "Actions"),
    command("g2", "B", "Actions"),
    command("g3", "C", "Browse"),
    command("g4", "D", "Actions"),
  ];

  it("always heads the first row", () => {
    expect(showsGroupHeader(rows, 0)).toBe(true);
    /* Even a single-row list gets its header. */
    expect(showsGroupHeader([rows[0]], 0)).toBe(true);
  });

  it("heads a row only when its group differs from the one above", () => {
    expect(showsGroupHeader(rows, 1)).toBe(false);
    expect(showsGroupHeader(rows, 2)).toBe(true);
  });

  it("repeats a header when a group comes back after another", () => {
    /*
     * It compares against the previous row, not the set of groups already
     * seen. Ranking interleaves groups by score, so "Actions" legitimately
     * appears twice — that is the rule, not a duplicate-header bug.
     */
    expect(showsGroupHeader(rows, 3)).toBe(true);
  });
});
