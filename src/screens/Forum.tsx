/*
 * `forum` — Community forum (port spec §6.35 / §8.9). Max-width 1120.
 *
 * Category chips filter the thread list; the list itself is an accordion with
 * exactly one open thread at a time (`fopen`, seeded to `f2`). Ruling R2:
 * the sidebar "This week" numbers are hard-coded in the markup as authored —
 * they are NOT derived from the thread data.
 *
 * Delta §6.1: a category with no threads now shows an empty state instead of a
 * blank column.
 */

import { useMemo } from "react";
import {
  Avatar,
  ButtonPrimary,
  ButtonSecondary,
  Card,
  Chip,
  ChipRow,
  EmptyState,
  Eyebrow,
  Icon,
} from "../components";
import { dataSource } from "../data/source";
import { useI18n } from "../i18n";
import { percentText } from "../lib/format";
import { useAppStore } from "../state/store";
import "../styles/screen-forum.css";

/* Ruling R2: the sidebar figures are authored in the comp, not derived — kept
 * as numbers so `Intl` renders the digits and the percent sign. */
const WEEK_POSTS = 128;
const WEEK_ANSWERED_PCT = 91;

export default function Forum() {
  const { t, number } = useI18n();
  const fcat = useAppStore((s) => s.fcat);
  const fopen = useAppStore((s) => s.fopen);
  const set = useAppStore((s) => s.set);
  const showToast = useAppStore((s) => s.showToast);
  const openTicket = useAppStore((s) => s.openTicket);

  const cats = dataSource.forumCategories();
  const threads = dataSource.threads();
  const contributors = dataSource.contributors();

  const list = useMemo(
    () => (fcat === "all" ? threads : threads.filter((t) => t.cat === fcat)),
    [threads, fcat],
  );

  const catName = (id: string) => cats.find((c) => c.id === id)?.name ?? id;

  const catCount = (id: string) =>
    id === "all" ? threads.length : threads.filter((t) => t.cat === id).length;

  /* Posting is a demo dead end everywhere it appears (§8.2). */
  const newPost = () => showToast(t("screensA.forum.toastPost"), "info");

  const toggle = (id: string) => set({ fopen: fopen === id ? null : id });

  return (
    <main className="fx-screen fx-page w-1120 fx-wide">
      <div className="forum-head">
        <div className="forum-head__text">
          <h1 className="forum-head__title">{t("screensA.forum.h1")}</h1>
          <p className="forum-head__lede">{t("screensA.forum.lede")}</p>
        </div>
        <ButtonPrimary icon="pen-line" onClick={newPost}>
          {t("screensA.forum.start")}
        </ButtonPrimary>
      </div>

      <ChipRow className="forum-cats">
        {cats.map((c) => (
          <Chip
            key={c.id}
            icon={dataSource.forumCategoryIcon(c.id)}
            active={fcat === c.id}
            count={catCount(c.id)}
            onClick={() => set({ fcat: c.id })}
          >
            {c.name}
          </Chip>
        ))}
      </ChipRow>

      <div className="forum-body">
        <div className="forum-list">
          {list.map((thread) => {
            const open = fopen === thread.id;
            return (
              <div key={thread.id} className="fx-card forum-thread">
                <button
                  type="button"
                  className="forum-thread__head"
                  aria-expanded={open}
                  onClick={() => toggle(thread.id)}
                >
                  <Avatar
                    initials={thread.initials}
                    tint={thread.tint}
                    size={40}
                    fontSize={14}
                  />
                  <span className="forum-thread__main">
                    <span className="forum-thread__titleline">
                      {thread.pinned ? (
                        <Icon name="pin" size={14} color="var(--accent)" />
                      ) : null}
                      <span className="forum-thread__title">{thread.title}</span>
                      {thread.solved ? (
                        <span className="forum-thread__answered">
                          <Icon name="check-circle-2" size={12} />
                          {t("screensA.forum.answered")}
                        </span>
                      ) : null}
                    </span>
                    <span className="forum-thread__meta">
                      <b>{thread.author}</b>
                      {thread.staff ? (
                        <span className="forum-thread__staff">
                          <Icon name="badge-check" size={11} />
                          Hearth
                        </span>
                      ) : null}
                      <span>
                        {t("screensA.forum.inCat", { cat: catName(thread.cat) })}
                      </span>
                      <span>· {thread.time}</span>
                    </span>
                  </span>
                  <span className="forum-thread__stats">
                    <span className="forum-thread__stat">
                      <Icon name="reply" size={14} />
                      {number(thread.replies)}
                    </span>
                    <span className="forum-thread__stat">
                      <Icon name="eye" size={14} />
                      {thread.views}
                    </span>
                  </span>
                </button>

                {open ? (
                  <div className="forum-thread__panel">
                    <p className="forum-thread__first">{thread.first}</p>

                    {thread.answer && thread.answerBy ? (
                      <div className="forum-answer">
                        <Icon
                          name="check-circle-2"
                          size={18}
                          color="var(--pos)"
                        />
                        <div>
                          <p className="forum-answer__by">
                            {t("screensA.forum.answerFrom", {
                              name: thread.answerBy,
                            })}
                          </p>
                          <p className="forum-answer__body">{thread.answer}</p>
                        </div>
                      </div>
                    ) : null}

                    <div className="forum-thread__acts">
                      <ButtonSecondary
                        icon="reply"
                        iconSize={15}
                        onClick={newPost}
                      >
                        {t("screensA.forum.reply")}
                      </ButtonSecondary>
                      <ButtonSecondary
                        icon="life-buoy"
                        iconSize={15}
                        tone="var(--fg-muted)"
                        onClick={openTicket}
                      >
                        {t("screensA.forum.askSupport")}
                      </ButtonSecondary>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}

          {list.length === 0 ? (
            <EmptyState
              icon="messages-square"
              title={t("screensA.forum.emptyTitle")}
              body={t("screensA.forum.emptyBody")}
              action={{
                label: t("screensA.forum.start"),
                icon: "pen-line",
                onClick: newPost,
              }}
            />
          ) : null}
        </div>

        <aside className="forum-side">
          <Card className="forum-side__card">
            <Eyebrow>{t("screensA.forum.thisWeek")}</Eyebrow>
            {/* Ruling R2: hard-coded in the comp, kept as authored. */}
            <div className="forum-stats">
              <div>
                <div className="forum-stats__n">{number(WEEK_POSTS)}</div>
                <div className="forum-stats__l">
                  {t("screensA.forum.newPosts")}
                </div>
              </div>
              <div>
                <div className="forum-stats__n">
                  {percentText(WEEK_ANSWERED_PCT)}
                </div>
                <div className="forum-stats__l">
                  {t("screensA.forum.answeredStat")}
                </div>
              </div>
            </div>
          </Card>

          <Card className="forum-side__card">
            <Eyebrow>{t("screensA.forum.topContributors")}</Eyebrow>
            <div className="forum-contribs">
              {contributors.map((c) => (
                <div key={c.name} className="forum-contrib">
                  <Avatar
                    initials={c.initials}
                    tint={c.tint}
                    size={36}
                    fontSize={13}
                  />
                  <div className="sd-grow">
                    <div className="forum-contrib__name">{c.name}</div>
                    <div className="forum-contrib__posts">
                      {t("screensA.forum.helpfulPosts", undefined, c.posts)}
                    </div>
                  </div>
                  <Icon name={c.icon} size={15} />
                </div>
              ))}
            </div>
          </Card>

          <div className="forum-rules">
            <p className="forum-rules__head">
              <Icon name="shield-check" size={16} color="var(--fg-muted)" />
              {t("screensA.forum.rules")}
            </p>
            <p className="forum-rules__body">{t("screensA.forum.rulesBody")}</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
