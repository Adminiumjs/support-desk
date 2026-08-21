/*
 * The four search surfaces (port spec §10). All case-insensitive substring
 * matching — no fuzzy scoring, no randomness, stable ordering everywhere.
 */

import type { Article, Category, Command } from "../data/types";
import { counted } from "./format";
import { t } from "../i18n/ambient";

/* --------------------------------------------------------------- article */

/** Limits taken straight from the comp. */
export const HEADER_SEARCH_LIMIT = 5;
export const HERO_SEARCH_LIMIT = 6;
export const PALETTE_LIMIT = 12;
export const PALETTE_EMPTY_LIMIT = 9;

function norm(q: string): string {
  return q.trim().toLowerCase();
}

/** `title` or `snippet` contains the query. Empty query matches everything. */
export function matchArticles(articles: Article[], q: string): Article[] {
  const needle = norm(q);
  if (!needle) return articles.slice();
  return articles.filter(
    (a) =>
      a.title.toLowerCase().includes(needle) ||
      a.snippet.toLowerCase().includes(needle),
  );
}

/** Header dropdown — source order, max 5. */
export function headerSearch(articles: Article[], q: string): Article[] {
  if (!q.trim()) return [];
  return matchArticles(articles, q).slice(0, HEADER_SEARCH_LIMIT);
}

/** Home hero dropdown — source order, max 6. */
export function heroSearch(articles: Article[], q: string): Article[] {
  if (!q.trim()) return [];
  return matchArticles(articles, q).slice(0, HERO_SEARCH_LIMIT);
}

/* ---------------------------------------------------------- KB results */

export type KbSort = "relevance" | "short" | "az";

export interface KbFacet {
  id: string;
  name: string;
  count: number;
}

export interface KbResults {
  /** Everything matching the query, before the facet filter. */
  base: Article[];
  /** After the facet filter and the sort. */
  list: Article[];
  /** `all` + one per category, counted over `base`. */
  facets: KbFacet[];
  /** `"4 results for “offline”"` — the count line. */
  countLabel: string;
}

/**
 * The knowledge-base results page. Facet counts are computed over `base`, so
 * they react to the query; the sort is applied last.
 */
export function kbSearch(
  articles: Article[],
  categories: Category[],
  q: string,
  facet: string,
  sort: KbSort,
): KbResults {
  const base = matchArticles(articles, q);

  const facets: KbFacet[] = [
    { id: "all", name: t("lib.search.facetAll"), count: base.length },
    ...categories.map((c) => ({
      id: c.slug,
      name: c.name,
      count: base.filter((a) => a.cat === c.slug).length,
    })),
  ];

  let list = facet === "all" ? base.slice() : base.filter((a) => a.cat === facet);

  if (sort === "short") list = list.slice().sort((a, b) => a.read - b.read);
  else if (sort === "az")
    list = list.slice().sort((a, b) => a.title.localeCompare(b.title));

  /*
   * "4 results for “offline”" is one sentence, not a count with a suffix
   * glued on: the quotation marks are the locale's own, and Arabic puts the
   * query before the count. The counted noun stays a `count.*` lookup so the
   * plural category is still chosen by `Intl.PluralRules`.
   */
  const trimmed = q.trim();
  const results = counted("count.result", list.length);
  const countLabel = trimmed
    ? t("lib.search.countFor", { results, query: trimmed })
    : results;

  return { base, list, facets, countLabel };
}

/* ------------------------------------------------------ command palette */

/**
 * Three-tier score, lower is better:
 *   0 — label starts with the query
 *   1 — label contains the query
 *   2 — group + keywords contain the query
 *  -1 — no match, dropped
 */
export function scoreCommand(cmd: Command, q: string): number {
  const needle = norm(q);
  if (!needle) return 0;
  const label = cmd.label.toLowerCase();
  if (label.startsWith(needle)) return 0;
  if (label.includes(needle)) return 1;
  if (`${cmd.group} ${cmd.words}`.toLowerCase().includes(needle)) return 2;
  return -1;
}

/**
 * What a palette row *is*, decided by the `id` prefix the store mints
 * (`act:` / `screen:` / `article:`).
 *
 * This deliberately does NOT look at `group` or `hint`. Those two carry
 * translated display text — `group` is `t('chrome.cmd.group.actions')` and
 * `hint` is `t('chrome.cmd.hint.screen')` — so matching them against the
 * English words "Actions" and "Screen" silently emptied the whole
 * empty-query palette in every locale that translates them (de, cs, da,
 * zh-CN, zh-TW, ar; fr lost only the screens). The `id` prefix is the one
 * part of a Command that is the same in all eight locales.
 */
const isAction = (c: Command) => c.id.startsWith("act:");
const isScreen = (c: Command) => c.id.startsWith("screen:");

/**
 * Ranked palette rows.
 *
 * Empty query: the comp filtered for `Actions` or screen rows and then sliced
 * 9 — but because screens are pushed first, the Actions group was unreachable
 * without typing (spec §13.2 #10, a dead affordance). Fixed here: actions
 * come first, then screens, still capped at 9.
 */
export function rankCommands(commands: Command[], q: string): Command[] {
  if (!q.trim()) {
    const actions = commands.filter(isAction);
    const screens = commands.filter(isScreen);
    return [...actions, ...screens].slice(0, PALETTE_EMPTY_LIMIT);
  }

  return commands
    .map((cmd, i) => ({ cmd, i, score: scoreCommand(cmd, q) }))
    .filter((r) => r.score >= 0)
    .sort((a, b) => a.score - b.score || a.i - b.i)
    .slice(0, PALETTE_LIMIT)
    .map((r) => r.cmd);
}

/** Clamp the palette cursor into `[0, len - 1]`; `-1` when the list is empty. */
export function clampIndex(index: number, len: number): number {
  if (len <= 0) return 0;
  return Math.max(0, Math.min(index, len - 1));
}

/** Group headers render when the group changed from the previous row. */
export function showsGroupHeader(rows: Command[], i: number): boolean {
  if (i === 0) return true;
  return rows[i].group !== rows[i - 1].group;
}
