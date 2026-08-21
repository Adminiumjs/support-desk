/*
 * Article — one knowledge-base article (port spec §6.4). Content cap 820px.
 *
 * Meta row, display heading, placeholder hero, save/library actions, the
 * block-DSL body, the helpful bar and up to three related articles.
 */

import {
  ArticleCard,
  ButtonSecondary,
  Chip,
  ArticleBody,
  Icon,
  PlaceholderTile,
} from "../components";
import { dataSource } from "../data/source";
import { useT } from "../i18n";
import { readTime } from "../lib/format";
import { useAppStore } from "../state/store";
import "../styles/screen-article.css";

/** The seeded default the overview and the command palette both open. */
const FALLBACK_ARTICLE = "a_doorbell_wifi";

export default function Article() {
  const t = useT();
  const articleId = useAppStore((s) => s.articleId);
  const savedIds = useAppStore((s) => s.savedIds);
  const feedback = useAppStore((s) => s.feedback);
  const toggleSave = useAppStore((s) => s.toggleSave);
  const giveFeedback = useAppStore((s) => s.giveFeedback);
  const openArticle = useAppStore((s) => s.openArticle);
  const go = useAppStore((s) => s.go);

  const article =
    dataSource.article(articleId) ??
    dataSource.article(FALLBACK_ARTICLE) ??
    dataSource.articles()[0];

  const category = dataSource.category(article.cat);
  const tint = category?.tint ?? "#4f8bd6";
  const icon = category?.icon ?? "file-text";
  const saved = savedIds.includes(article.id);
  const related = dataSource
    .articlesInCategory(article.cat)
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  return (
    <main className="fx-screen fx-page w-820 art">
      <div className="art__meta">
        <span className="art__cat">
          <Icon name={icon} size={13} />
          {category?.name}
        </span>
        <span className="art__read sd-mono">{readTime(article.read)}</span>
      </div>

      <h1 className="art__h1">{article.title}</h1>

      <PlaceholderTile
        tint={tint}
        icon={icon}
        minHeight={190}
        iconSize={72}
        filename={`${article.id.replace("a_", "")}.png`}
      />

      <div className="art__actions">
        <button
          type="button"
          className={`art__save fx-chip${saved ? " art__save--on" : ""}`}
          aria-pressed={saved}
          onClick={() => toggleSave(article.id)}
        >
          <Icon name={saved ? "bookmark-check" : "bookmark-plus"} size={15} />
          {saved ? t("screensA.article.saved") : t("screensA.article.save")}
        </button>
        <ButtonSecondary icon="library" onClick={() => go("saved")}>
          {t("screensA.article.savedArticles")}
        </ButtonSecondary>
      </div>

      <ArticleBody
        className="art__body"
        blocks={dataSource.articleBody(article.id)}
      />

      <div className="art__feedback">
        <span className="art__feedback-label">
          {t("screensA.article.helpful")}
        </span>
        <div className="art__feedback-btns">
          <Chip
            icon="thumbs-up"
            iconSize={15}
            active={feedback === "yes"}
            onClick={() => giveFeedback("yes")}
          >
            {t("screensA.article.yes")}
          </Chip>
          <Chip
            icon="thumbs-down"
            iconSize={15}
            active={feedback === "no"}
            onClick={() => giveFeedback("no")}
          >
            {t("screensA.article.no")}
          </Chip>
        </div>
      </div>

      {related.length ? (
        <section className="art__related">
          <h2 className="art__related-h2">{t("screensA.article.related")}</h2>
          <div className="art__related-list">
            {related.map((r) => (
              <ArticleCard
                key={r.id}
                article={r}
                onClick={() => openArticle(r.id)}
              />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
