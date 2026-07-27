/*
 * Kb — the knowledge-base results page (port spec §6.2 / §10.3).
 *
 * Query, facet chips and sort all live in the store; `kbSearch` does the
 * matching, the facet counts (computed over the pre-facet base, so they react
 * to the query) and the count label. No pagination anywhere (ruling R3).
 */

import { useMemo } from "react";
import {
  Chip,
  ChipRow,
  EmptyState,
  Icon,
  IconChip,
  ListCard,
} from "../components";
import { dataSource } from "../data/source";
import { readTime } from "../lib/format";
import { kbSearch } from "../lib/search";
import { useAppStore } from "../state/store";
import type { KbSort } from "../lib/search";
import type { Article } from "../data/types";
import "../styles/screen-kb.css";

/* One result row — title, snippet and a mono category · read-time meta line.
   Local to this screen: the shared `ArticleRow` carries a single sub-line and
   a chevron, the KB row carries three lines and a trailing arrow. */
function KbResultRow({
  article,
  onClick,
}: {
  article: Article;
  onClick: () => void;
}) {
  const cat = dataSource.category(article.cat);
  return (
    <button type="button" className="kb__row fx-res" onClick={onClick}>
      <IconChip
        tint={cat?.tint ?? "#4f8bd6"}
        icon={cat?.icon ?? "file-text"}
        size={38}
        radius={11}
        iconSize={18}
      />
      <span className="kb__row-text">
        <span className="kb__row-title">{article.title}</span>
        <span className="kb__row-snippet">{article.snippet}</span>
        <span className="kb__row-meta sd-mono">
          {cat?.name} · {readTime(article.read)}
        </span>
      </span>
      <Icon name="arrow-right" size={16} color="var(--fg-subtle)" />
    </button>
  );
}

export default function Kb() {
  const kbQ = useAppStore((s) => s.kbQ);
  const kbFacet = useAppStore((s) => s.kbFacet);
  const kbSort = useAppStore((s) => s.kbSort);
  const set = useAppStore((s) => s.set);
  const openArticle = useAppStore((s) => s.openArticle);
  const openTicket = useAppStore((s) => s.openTicket);

  const articles = dataSource.articles();
  const categories = dataSource.categories();
  const suggestions = dataSource.kbSuggestions();

  const { list, facets, countLabel } = useMemo(
    () => kbSearch(articles, categories, kbQ, kbFacet, kbSort),
    [articles, categories, kbQ, kbFacet, kbSort],
  );

  const runSuggestion = (term: string) => set({ kbQ: term, kbFacet: "all" });

  return (
    <main className="fx-screen fx-page w-820 kb">
      <h1 className="kb__h1">Search the knowledge base</h1>

      <div className="kb__field">
        <span className="kb__ico">
          <Icon name="search" size={18} />
        </span>
        <input
          className="fx-fld kb__input"
          type="text"
          value={kbQ}
          aria-label="Search the knowledge base"
          placeholder={`Search ${articles.length} articles — try "reset" or "offline"`}
          onChange={(e) => set({ kbQ: e.target.value })}
        />
        {kbQ ? (
          <button
            type="button"
            className="kb__clear fx-gi"
            title="Clear"
            aria-label="Clear"
            onClick={() => set({ kbQ: "" })}
          >
            <Icon name="x" size={16} />
          </button>
        ) : null}
      </div>

      <ChipRow className="kb__facets">
        {facets.map((f) => (
          <Chip
            key={f.id}
            active={kbFacet === f.id}
            count={f.count}
            onClick={() => set({ kbFacet: f.id })}
          >
            {f.name}
          </Chip>
        ))}
      </ChipRow>

      <div className="kb__toolbar">
        <span className="kb__count">{countLabel}</span>
        <select
          className="fx-fld kb__sort"
          value={kbSort}
          aria-label="Sort results"
          onChange={(e) => set({ kbSort: e.target.value as KbSort })}
        >
          <option value="relevance">Most relevant</option>
          <option value="short">Quickest read</option>
          <option value="az">A – Z</option>
        </select>
      </div>

      {list.length ? (
        <ListCard>
          {list.map((a) => (
            <KbResultRow
              key={a.id}
              article={a}
              onClick={() => openArticle(a.id)}
            />
          ))}
        </ListCard>
      ) : (
        <EmptyState
          icon="search-x"
          title={`Nothing matched "${kbQ}"`}
          body="Try fewer words, or one of these instead — most people find what they need in the first result."
          suggestions={suggestions.map((term) => ({
            label: term,
            onClick: () => runSuggestion(term),
          }))}
          action={{
            label: "Ask us instead",
            icon: "pen-line",
            onClick: openTicket,
          }}
        />
      )}

      <div className="kb__related">
        <span className="kb__related-label">People also search:</span>
        {suggestions.slice(0, 4).map((term) => (
          <button
            key={term}
            type="button"
            className="kb__related-link fx-nav"
            onClick={() => runSuggestion(term)}
          >
            {term}
          </button>
        ))}
      </div>
    </main>
  );
}
