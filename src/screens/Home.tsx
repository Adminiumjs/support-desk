/*
 * Home — the help-center landing page (port spec §6.1).
 *
 * Four stacked bands, each capped at 1120px: the search hero, the category
 * grid, the popular-article list and the "open a ticket" CTA. No breadcrumbs.
 *
 * Ruling R5: the width cap comes from the shared `.w-1120` + `.fx-wide` pair so
 * the 1800px ultra-wide rule reaches the bands too.
 */

import {
  ArticleRow,
  ButtonPrimary,
  CategoryTile,
  ListCard,
  SearchHero,
} from "../components";
import { dataSource } from "../data/source";
import { useT } from "../i18n";
import { useAppStore } from "../state/store";
import "../styles/screen-home.css";

export default function Home() {
  const t = useT();
  const openCategory = useAppStore((s) => s.openCategory);
  const openArticle = useAppStore((s) => s.openArticle);
  const openTicket = useAppStore((s) => s.openTicket);

  const categories = dataSource.categories();
  const popular = dataSource.popularArticles();

  return (
    <main className="fx-screen home">
      {/* A — search hero */}
      <div className="home__band w-1120 fx-wide">
        <SearchHero />
      </div>

      {/* B — browse by topic */}
      <section className="home__band w-1120 fx-wide home__sec">
        <h2 className="home__h2">{t("screensA.home.browse")}</h2>
        <div className="home__grid">
          {categories.map((c) => (
            <CategoryTile
              key={c.slug}
              category={c}
              count={dataSource.articlesInCategory(c.slug).length}
              onClick={() => openCategory(c.slug)}
            />
          ))}
        </div>
      </section>

      {/* C — popular articles */}
      <section className="home__band w-1120 fx-wide home__sec">
        <h2 className="home__h2">{t("screensA.home.popular")}</h2>
        <ListCard>
          {popular.map((a) => (
            <ArticleRow
              key={a.id}
              article={a}
              onClick={() => openArticle(a.id)}
            />
          ))}
        </ListCard>
      </section>

      {/* D — open a ticket */}
      <section className="home__band w-1120 fx-wide home__cta">
        <div className="home__cta-inner">
          <div className="home__cta-copy">
            <h3>{t("screensA.home.ctaTitle")}</h3>
            <p>{t("screensA.home.ctaBody")}</p>
          </div>
          <ButtonPrimary icon="pen-line" iconSize={18} onClick={openTicket}>
            {t("screensA.home.openTicket")}
          </ButtonPrimary>
        </div>
      </section>
    </main>
  );
}
