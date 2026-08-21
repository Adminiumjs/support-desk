/*
 * `recent` — Recently viewed (delta spec A §6, logic C §3.3 `recentVals`).
 * Falls to the 820 default column.
 *
 * Device-local history of help articles and store products. Chip counts come
 * from the not-forgotten list, so removing a row updates them; the rows are
 * then grouped by `when` in first-seen order.
 *
 * The empty state carries two buttons, so it is composed from the shared
 * `.empty` classes rather than `<EmptyState>` (which takes one action).
 */

import { useMemo } from "react";
import {
  ButtonPrimary,
  ButtonSecondary,
  Callout,
  Chip,
  ChipRow,
  GroupHeader,
  Icon,
  IconButton,
  IconChip,
  ListCard,
  columnClass,
} from "../components";
import { dataSource } from "../data/source";
import { useT, type TFunction } from "../i18n";
import {
  filterRecent,
  groupRecent,
  recentCounts,
  recentEmpty,
  recentIntro,
  recentProductSub,
  visibleRecent,
} from "../lib/derive";
import { money } from "../lib/format";
import { useAppStore } from "../state/store";
import type { RecentEntry } from "../data/types";
import "../styles/screen-recent.css";

/** Everything a row needs, resolved from the article or product record. */
interface RowCopy {
  tint: string;
  icon: string;
  title: string;
  sub: string;
  meta: string;
  price: string | null;
  secondIcon: string;
  secondLabel: string;
}

function rowCopy(entry: RecentEntry, t: TFunction): RowCopy {
  if (entry.kind === "article") {
    const article = dataSource.article(entry.ref);
    const cat = article ? dataSource.category(article.cat) : undefined;
    return {
      tint: cat?.tint ?? "#4f8bd6",
      icon: cat?.icon ?? "file-text",
      title: article?.title ?? t("screensB.recent.articleFallback"),
      sub: article?.snippet ?? "",
      meta: t("screensB.recent.metaLine", {
        source: cat?.name ?? t("screensB.recent.helpFallback"),
        time: entry.time,
      }),
      price: null,
      secondIcon: "bookmark-plus",
      secondLabel: t("screensB.recent.saveForLater"),
    };
  }
  const product = dataSource.product(entry.prod);
  return {
    tint: product.tint,
    icon: product.icon,
    title: entry.name ?? product.name,
    sub: recentProductSub(),
    meta: t("screensB.recent.metaLine", {
      source: product.name,
      time: entry.time,
    }),
    price: entry.price === undefined ? null : money(entry.price),
    secondIcon: "heart",
    secondLabel: t("screensB.recent.saveToWishlist"),
  };
}

export default function Recent() {
  const t = useT();
  const rvCat = useAppStore((s) => s.rvCat);
  const rvOut = useAppStore((s) => s.rvOut);
  const rvCleared = useAppStore((s) => s.rvCleared);
  const set = useAppStore((s) => s.set);
  const go = useAppStore((s) => s.go);
  const goHome = useAppStore((s) => s.goHome);
  const openRecent = useAppStore((s) => s.openRecent);
  const recentSecondary = useAppStore((s) => s.recentSecondary);
  const recentForget = useAppStore((s) => s.recentForget);
  const recentClear = useAppStore((s) => s.recentClear);
  const recentRestore = useAppStore((s) => s.recentRestore);

  const cats = dataSource.recentFilters();

  const visible = useMemo(
    () => visibleRecent(dataSource.recentlyViewed(), rvOut),
    [rvOut],
  );
  const counts = useMemo(() => recentCounts(visible), [visible]);
  const groups = useMemo(
    () => groupRecent(filterRecent(visible, rvCat)),
    [visible, rvCat],
  );

  const has = visible.length > 0;
  const empty = recentEmpty(has);

  /*
   * The privacy note wraps a link mid-sentence. The message is authored as one
   * string with a `{link}` marker so word order stays the translator's — no
   * params are passed, so the marker survives lookup and is split on here.
   */
  const [noteBefore, noteAfter] = t("screensB.recent.note").split("{link}");

  return (
    <main className={`fx-screen fx-page ${columnClass("recent")} rv`}>
      <div className="rv__head">
        <div className="rv__head-text">
          <h1 className="rv__h1">{t("screensB.recent.h1")}</h1>
          <p className="rv__lede">{recentIntro(visible.length)}</p>
        </div>
        {has ? (
          <ButtonSecondary
            icon="eraser"
            tone="var(--danger)"
            onClick={recentClear}
          >
            {t("screensB.recent.clearHistory")}
          </ButtonSecondary>
        ) : null}
      </div>

      <ChipRow className="rv__cats" gap={9}>
        {cats.map(([id, label, icon]) => (
          <Chip
            key={id}
            icon={icon}
            active={rvCat === id}
            count={counts[id]}
            onClick={() => set({ rvCat: id })}
          >
            {label}
          </Chip>
        ))}
      </ChipRow>

      {groups.length ? (
        <div className="rv__groups">
          {groups.map((g) => (
            <section className="rv__group" key={g.when}>
              <GroupHeader label={g.when} count={g.count} />
              <ListCard>
                {g.rows.map((entry) => {
                  const copy = rowCopy(entry, t);
                  return (
                    <div className="sd-listrow rv-row" key={entry.id}>
                      <IconChip
                        tint={copy.tint}
                        icon={copy.icon}
                        size={42}
                        radius={12}
                        iconSize={21}
                      />
                      <button
                        type="button"
                        className="rv-row__open"
                        onClick={() => openRecent(entry)}
                      >
                        <span className="rv-row__title">{copy.title}</span>
                        <span className="rv-row__sub">{copy.sub}</span>
                        <span className="rv-row__meta">{copy.meta}</span>
                      </button>
                      {copy.price ? (
                        <span className="rv-row__price">{copy.price}</span>
                      ) : null}
                      <IconButton
                        icon={copy.secondIcon}
                        label={copy.secondLabel}
                        small
                        iconSize={16}
                        onClick={() => recentSecondary(entry)}
                      />
                      <IconButton
                        icon="x"
                        label={t("screensB.recent.removeFromHistory")}
                        small
                        iconSize={16}
                        onClick={() => recentForget(entry)}
                      />
                    </div>
                  );
                })}
              </ListCard>
            </section>
          ))}
        </div>
      ) : (
        <div className="empty rv__empty">
          <span className="empty__ico">
            <Icon name="history" size={27} />
          </span>
          <h3 className="empty__title">{empty.title}</h3>
          <p className="empty__body">{empty.text}</p>
          <div className="rv__empty-acts">
            <ButtonPrimary size="md" icon="life-buoy" onClick={goHome}>
              {t("screensB.recent.browseHelp")}
            </ButtonPrimary>
            {rvCleared ? (
              <ButtonSecondary icon="rotate-ccw" onClick={recentRestore}>
                {t("screensB.recent.restore")}
              </ButtonSecondary>
            ) : null}
          </div>
        </div>
      )}

      <Callout tone="info" icon="lock" className="rv__note">
        {noteBefore}
        <button
          type="button"
          className="rv__note-link"
          onClick={() => go("security")}
        >
          {t("screensB.recent.securityLink")}
        </button>
        {noteAfter}
      </Callout>
    </main>
  );
}
