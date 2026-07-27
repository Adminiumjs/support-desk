/*
 * Category — every article in one knowledge-base category (port spec §6.3).
 * Content cap 1120px.
 */

import { ArticleRow, IconChip, ListCard } from "../components";
import { dataSource } from "../data/source";
import { articleCount } from "../lib/format";
import { useAppStore } from "../state/store";
import "../styles/screen-category.css";

export default function Category() {
  const catSlug = useAppStore((s) => s.catSlug);
  const openArticle = useAppStore((s) => s.openArticle);

  const categories = dataSource.categories();
  const category = dataSource.category(catSlug) ?? categories[0];
  const articles = dataSource.articlesInCategory(category.slug);

  return (
    <main className="oh-screen oh-page w-1120 cat">
      <header className="cat__head">
        <IconChip
          tint={category.tint}
          icon={category.icon}
          size={46}
          radius={13}
          iconSize={23}
        />
        <div className="cat__head-copy">
          <h1 className="cat__h1">{category.name}</h1>
          <p className="cat__blurb">{category.blurb}</p>
          <span className="cat__count sd-mono">
            {articleCount(articles.length)}
          </span>
        </div>
      </header>

      <ListCard>
        {articles.map((a) => (
          <ArticleRow
            key={a.id}
            article={a}
            sub={a.snippet}
            onClick={() => openArticle(a.id)}
          />
        ))}
      </ListCard>
    </main>
  );
}
