/*
 * `saved` — Saved articles (port spec §6.5, logic §8.27). Max-width 820.
 *
 * `savedIds` is insertion-ordered newest-first (the store's `toggleSave`
 * unshifts), so the list is rendered in that order with no extra sorting.
 * "Suggested next" is the first three articles that are NOT saved.
 */

import { useMemo } from "react";
import {
  EmptyState,
  Icon,
  IconButton,
  IconChip,
  ListCard,
} from "../components";
import { dataSource } from "../data/source";
import { useT } from "../i18n";
import { counted, readTime } from "../lib/format";
import { useAppStore } from "../state/store";
import type { Article } from "../data/types";
import "../styles/screen-saved.css";

const SUGGEST_LIMIT = 3;

export default function Saved() {
  const t = useT();
  const savedIds = useAppStore((s) => s.savedIds);
  const openArticle = useAppStore((s) => s.openArticle);
  const toggleSave = useAppStore((s) => s.toggleSave);
  const goHome = useAppStore((s) => s.goHome);

  const rows = useMemo<Article[]>(
    () =>
      savedIds
        .map((id) => dataSource.article(id))
        .filter((a): a is Article => Boolean(a)),
    [savedIds],
  );

  const suggestions = useMemo<Article[]>(
    () =>
      dataSource
        .articles()
        .filter((a) => !savedIds.includes(a.id))
        .slice(0, SUGGEST_LIMIT),
    [savedIds],
  );

  const has = rows.length > 0;
  const intro = has
    ? t("screensB.saved.introHas", {
        articles: counted("count.article", rows.length),
      })
    : t("screensB.saved.introEmpty");

  return (
    <main className="fx-screen fx-page w-820 svd">
      <h1 className="svd__h1">{t("screensB.saved.h1")}</h1>
      <p className="svd__lede">{intro}</p>

      {has ? (
        <ListCard>
          {rows.map((a) => {
            const cat = dataSource.category(a.cat);
            return (
              <div className="sd-listrow svd__row" key={a.id}>
                {cat ? (
                  <IconChip
                    tint={cat.tint}
                    icon={cat.icon}
                    size={38}
                    radius={11}
                    iconSize={18}
                  />
                ) : null}
                <button
                  type="button"
                  className="svd__open"
                  onClick={() => openArticle(a.id)}
                >
                  <span className="svd__title">{a.title}</span>
                  <span className="svd__snippet">{a.snippet}</span>
                  <span className="svd__meta">{readTime(a.read)}</span>
                </button>
                <IconButton
                  icon="bookmark-x"
                  label={t("screensB.saved.remove")}
                  iconSize={17}
                  className="svd__rm"
                  onClick={() => toggleSave(a.id)}
                />
              </div>
            );
          })}
        </ListCard>
      ) : (
        <EmptyState
          compact
          icon="bookmark"
          title={t("screensB.saved.emptyTitle")}
          body={t("screensB.saved.emptyBody")}
          action={{
            label: t("screensB.saved.browse"),
            icon: "library",
            onClick: goHome,
          }}
        />
      )}

      <h2 className="svd__h2">{t("screensB.saved.suggested")}</h2>
      <div className="svd__suggest">
        {suggestions.map((s) => (
          <div className="sd-card fx-card svd__sug" key={s.id}>
            <Icon name="file-text" size={18} />
            <button
              type="button"
              className="svd__sug-open"
              onClick={() => openArticle(s.id)}
            >
              {s.title}
            </button>
            <IconButton
              icon="bookmark-plus"
              label={t("screensB.saved.save")}
              small
              iconSize={16}
              onClick={() => toggleSave(s.id)}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
