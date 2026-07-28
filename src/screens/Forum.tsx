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
import { useAppStore } from "../state/store";
import "../styles/screen-forum.css";

export default function Forum() {
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
  const newPost = () => showToast("Posting is disabled in this demo", "info");

  const toggle = (id: string) => set({ fopen: fopen === id ? null : id });

  return (
    <main className="fx-screen fx-page w-1120 fx-wide">
      <div className="forum-head">
        <div className="forum-head__text">
          <h1 className="forum-head__title">Community forum</h1>
          <p className="forum-head__lede">
            Swap setups, automations and fixes with other Hearth owners. Hearth
            staff drop in daily — look for the badge.
          </p>
        </div>
        <ButtonPrimary icon="pen-line" onClick={newPost}>
          Start a discussion
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
          {list.map((t) => {
            const open = fopen === t.id;
            return (
              <div key={t.id} className="fx-card forum-thread">
                <button
                  type="button"
                  className="forum-thread__head"
                  aria-expanded={open}
                  onClick={() => toggle(t.id)}
                >
                  <Avatar
                    initials={t.initials}
                    tint={t.tint}
                    size={40}
                    fontSize={14}
                  />
                  <span className="forum-thread__main">
                    <span className="forum-thread__titleline">
                      {t.pinned ? (
                        <Icon name="pin" size={14} color="var(--accent)" />
                      ) : null}
                      <span className="forum-thread__title">{t.title}</span>
                      {t.solved ? (
                        <span className="forum-thread__answered">
                          <Icon name="check-circle-2" size={12} />
                          Answered
                        </span>
                      ) : null}
                    </span>
                    <span className="forum-thread__meta">
                      <b>{t.author}</b>
                      {t.staff ? (
                        <span className="forum-thread__staff">
                          <Icon name="badge-check" size={11} />
                          Hearth
                        </span>
                      ) : null}
                      <span>in {catName(t.cat)}</span>
                      <span>· {t.time}</span>
                    </span>
                  </span>
                  <span className="forum-thread__stats">
                    <span className="forum-thread__stat">
                      <Icon name="reply" size={14} />
                      {t.replies}
                    </span>
                    <span className="forum-thread__stat">
                      <Icon name="eye" size={14} />
                      {t.views}
                    </span>
                  </span>
                </button>

                {open ? (
                  <div className="forum-thread__panel">
                    <p className="forum-thread__first">{t.first}</p>

                    {t.answer && t.answerBy ? (
                      <div className="forum-answer">
                        <Icon
                          name="check-circle-2"
                          size={18}
                          color="var(--pos)"
                        />
                        <div>
                          <p className="forum-answer__by">
                            Answer from {t.answerBy}
                          </p>
                          <p className="forum-answer__body">{t.answer}</p>
                        </div>
                      </div>
                    ) : null}

                    <div className="forum-thread__acts">
                      <ButtonSecondary
                        icon="reply"
                        iconSize={15}
                        onClick={newPost}
                      >
                        Reply in thread
                      </ButtonSecondary>
                      <ButtonSecondary
                        icon="life-buoy"
                        iconSize={15}
                        tone="var(--fg-muted)"
                        onClick={openTicket}
                      >
                        Ask support instead
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
              title="No discussions here yet"
              body="Nothing in this category so far. Start the first thread and it will sit at the top for everyone."
              action={{
                label: "Start a discussion",
                icon: "pen-line",
                onClick: newPost,
              }}
            />
          ) : null}
        </div>

        <aside className="forum-side">
          <Card className="forum-side__card">
            <Eyebrow>This week</Eyebrow>
            {/* Ruling R2: hard-coded in the comp, kept as authored. */}
            <div className="forum-stats">
              <div>
                <div className="forum-stats__n">128</div>
                <div className="forum-stats__l">new posts</div>
              </div>
              <div>
                <div className="forum-stats__n">91%</div>
                <div className="forum-stats__l">answered</div>
              </div>
            </div>
          </Card>

          <Card className="forum-side__card">
            <Eyebrow>Top contributors</Eyebrow>
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
                      {c.posts} helpful posts
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
              House rules
            </p>
            <p className="forum-rules__body">
              Be kind, keep it on-topic, and never post serial numbers or order
              details in public threads.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
