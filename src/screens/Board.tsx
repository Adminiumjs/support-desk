/*
 * `board` — Referral leaderboard (delta A §8). Max-width 820.
 *
 * There is no empty state: the seeded list is always populated. The sort is
 * `sortLeaders()`, whose comparator is `b.count - a.count` only — the seeded
 * tie between "You" and Sanjay P. therefore keeps "You" in fourth place, which
 * is what the "£n more and you're into the prize places" line is written for.
 *
 * Every number on the screen comes from `lib/derive` so the copy and the store
 * quote the same figures.
 */

import { useMemo } from "react";
import {
  Avatar,
  ButtonPrimary,
  Card,
  Icon,
  ListCard,
  SoftPill,
  Tabs,
} from "../components";
import { dataSource } from "../data/source";
import type { LeaderPeriod } from "../data/types";
import {
  LB_UPDATED,
  leaderEarned,
  leaderLine,
  leaderPrize,
  leaderTier,
  leaderTitle,
  sortLeaders,
} from "../lib/derive";
import { useAppStore } from "../state/store";
import "../styles/screen-board.css";

const PERIODS: { id: LeaderPeriod; label: string }[] = [
  { id: "quarter", label: "This quarter" },
  { id: "alltime", label: "All time" },
];

export default function Board() {
  const lbPeriod = useAppStore((s) => s.lbPeriod);
  const set = useAppStore((s) => s.set);
  const go = useAppStore((s) => s.go);

  const rows = dataSource.leaders(lbPeriod);
  const prizes = dataSource.leaderPrizes();
  const sorted = useMemo(() => sortLeaders(rows), [rows]);

  const youIndex = sorted.findIndex((l) => l.you);
  const you = sorted[youIndex] ?? sorted[0];
  const youRank = (youIndex < 0 ? 0 : youIndex) + 1;

  return (
    <main className="fx-screen fx-page w-820 scr-board">
      <div className="lb-head">
        <div className="lb-head__text">
          <h1 className="lb-h1">Referral leaderboard</h1>
          <p className="lb-lede">
            Top referrers this quarter. Everyone still gets £20 a friend — the
            leaderboard is just for the bonus prizes.
          </p>
        </div>
        <Tabs
          label="Leaderboard period"
          options={PERIODS}
          value={lbPeriod}
          onChange={(id) => set({ lbPeriod: id })}
        />
      </div>

      <section className="lb-you">
        <span
          className={`lb-rank lb-rank--lg${youRank <= 3 ? " lb-rank--top" : ""}`}
        >
          #{youRank}
        </span>
        <Avatar initials={you.initials} tint={you.tint} size={44} fontSize={15} />
        <div className="lb-you__mid">
          <div className="lb-you__head">
            <span className="lb-you__name">You</span>
            <SoftPill
              fg="--accent"
              soft="--accent-soft"
              icon="user-round"
              iconSize={12}
            >
              {leaderTier(you.count)}
            </SoftPill>
          </div>
          <p className="lb-you__line">{leaderLine(sorted, you, youRank)}</p>
        </div>
        <div className="lb-you__score">
          <span className="lb-you__count">{you.count}</span>
          <span className="lb-you__caption">friends joined</span>
        </div>
        <ButtonPrimary
          icon="gift"
          iconSize={16}
          className="lb-you__cta"
          onClick={() => go("refer")}
        >
          Invite someone
        </ButtonPrimary>
      </section>

      <div className="lb-tablehead">
        <span className="lb-tablehead__title">{leaderTitle(lbPeriod)}</span>
        <span className="lb-tablehead__updated">{LB_UPDATED}</span>
      </div>

      <ListCard>
        {sorted.map((l, i) => {
          const rank = i + 1;
          const prize = leaderPrize(rank);
          return (
            <div
              key={`${l.name}-${i}`}
              className={`sd-listrow lb-row${l.you ? " lb-row--you" : ""}`}
            >
              <span className={`lb-rank${rank <= 3 ? " lb-rank--top" : ""}`}>
                {rank}
              </span>
              <Avatar initials={l.initials} tint={l.tint} size={38} fontSize={13} />
              <div className="lb-row__body">
                <span className="lb-row__head">
                  <span
                    className={`lb-row__name${l.you ? " lb-row__name--you" : ""}`}
                  >
                    {l.name}
                  </span>
                  {prize ? (
                    <SoftPill
                      fg="--warn"
                      soft="--warn-soft"
                      icon="trophy"
                      iconSize={12}
                    >
                      {prize}
                    </SoftPill>
                  ) : null}
                </span>
                <span className="lb-row__place">{l.place}</span>
              </div>
              <span className="lb-row__count">{l.count}</span>
              <span className="lb-row__earned">{leaderEarned(l.count)}</span>
            </div>
          );
        })}
      </ListCard>

      <h2 className="lb-h2">Bonus prizes</h2>
      <div className="lb-prizes">
        {prizes.map((p, i) => (
          <Card key={p.place} accent={i === 0} className="lb-prize">
            <span
              className={`lb-prize__ico${i === 0 ? " lb-prize__ico--first" : ""}`}
            >
              <Icon name={p.icon} size={20} />
            </span>
            <span className="lb-prize__place">{p.place}</span>
            <span className="lb-prize__amount">{p.prize}</span>
            <p className="lb-prize__note">{p.note}</p>
          </Card>
        ))}
      </div>

      <p className="lb-legal">
        Only referrals whose order has shipped are counted, and self-referrals
        are removed automatically. Prizes are credited to your account within a
        week of the quarter ending. Ranks update hourly.
      </p>
    </main>
  );
}
