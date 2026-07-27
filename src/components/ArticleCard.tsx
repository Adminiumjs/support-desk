/*
 * ArticleCard — the two article list shapes.
 *
 * `<ArticleRow>` is the flat `.oh-res` row inside a `<ListCard>` (home
 * "Popular articles", category listings, KB results, saved articles).
 * `<ArticleCard>` is the standalone bordered card used by "Related articles".
 */

import { readTime } from "../lib/format";
import { dataSource } from "../data/source";
import { Icon } from "./Icon";
import { IconChip } from "./PlaceholderTile";
import type { Article } from "../data/types";

export interface ArticleRowProps {
  article: Article;
  onClick: () => void;
  /** Override the sub-line; defaults to the category name. */
  sub?: string;
  className?: string;
}

/** `<ArticleRow article={a} onClick={() => openArticle(a.id)} />` */
export function ArticleRow({ article, onClick, sub, className }: ArticleRowProps) {
  const cat = dataSource.category(article.cat);
  return (
    <button
      type="button"
      className={`art-row oh-res${className ? ` ${className}` : ""}`}
      onClick={onClick}
    >
      <IconChip
        tint={cat?.tint ?? "#4f8bd6"}
        icon={cat?.icon ?? "file-text"}
        size={38}
        radius={11}
        iconSize={18}
      />
      <span className="sd-col sd-grow">
        <span className="art-row__title">{article.title}</span>
        <span className="art-row__sub">{sub ?? cat?.name}</span>
      </span>
      <span className="art-row__read">{readTime(article.read)}</span>
      <Icon name="chevron-right" size={18} color="var(--fg-subtle)" />
    </button>
  );
}

export interface ArticleCardProps {
  article: Article;
  onClick: () => void;
  className?: string;
}

/** `<ArticleCard article={related} onClick={() => openArticle(related.id)} />` */
export function ArticleCard({ article, onClick, className }: ArticleCardProps) {
  return (
    <button
      type="button"
      className={`art-card oh-card${className ? ` ${className}` : ""}`}
      onClick={onClick}
    >
      <Icon name="file-text" size={17} color="var(--fg-subtle)" />
      <span
        className="sd-grow"
        style={{ fontSize: 14.5, fontWeight: 700, letterSpacing: "-0.01em" }}
      >
        {article.title}
      </span>
      <span className="sd-mono" style={{ fontSize: 11, color: "var(--fg-subtle)" }}>
        {article.read} min
      </span>
      <Icon name="arrow-right" size={16} />
    </button>
  );
}

export default ArticleCard;
