/*
 * `notifs` — Notifications history (port spec §6.28, logic §8.31).
 * Max-width 820.
 *
 * Read state is tracked in `ntRead`, so a seeded notification is unread when
 * `n.unread && !ntRead.includes(n.id)`. Category counts are taken over the
 * FULL list, not the filtered one; the filtered list is grouped by `n.day`
 * preserving first-seen day order.
 */

import { useMemo } from "react";
import {
  ButtonSecondary,
  Chip,
  ChipRow,
  EmptyState,
  Eyebrow,
  Icon,
  IconButton,
} from "../components";
import { dataSource } from "../data/source";
import { ticketCode } from "../lib/format";
import { useAppStore } from "../state/store";
import type { Notification } from "../data/types";
import "../styles/screen-notifs.css";

/** The ticket the seeded "Maya replied" notification points at. */
const REPLY_TICKET = ticketCode(3117);

interface DayGroup {
  day: string;
  rows: Notification[];
}

export default function Notifs() {
  const ntCat = useAppStore((s) => s.ntCat);
  const ntRead = useAppStore((s) => s.ntRead);
  const set = useAppStore((s) => s.set);
  const go = useAppStore((s) => s.go);
  const openThread = useAppStore((s) => s.openThread);
  const showToast = useAppStore((s) => s.showToast);

  const all = dataSource.notifications();
  const cats = dataSource.notifCategories();

  const isUnread = (n: Notification) => n.unread && !ntRead.includes(n.id);

  const unreadCount = useMemo(
    () => all.filter((n) => n.unread && !ntRead.includes(n.id)).length,
    [all, ntRead],
  );

  const filtered = useMemo(
    () => (ntCat === "all" ? all : all.filter((n) => n.cat === ntCat)),
    [all, ntCat],
  );

  const groups = useMemo<DayGroup[]>(() => {
    const out: DayGroup[] = [];
    for (const n of filtered) {
      const last = out[out.length - 1];
      if (last && last.day === n.day) last.rows.push(n);
      else out.push({ day: n.day, rows: [n] });
    }
    return out;
  }, [filtered]);

  const intro = unreadCount
    ? `${unreadCount} unread · we keep 90 days of history, and you can tune what arrives.`
    : "All caught up — we keep 90 days of history.";

  const markAll = () => {
    set({ ntRead: all.map((n) => n.id) });
    showToast("All notifications marked read");
  };

  const openSettings = () => {
    go("a11y");
    showToast("Alert settings live with accessibility here", "info");
  };

  const onRow = (n: Notification) => {
    if (isUnread(n)) set({ ntRead: [...ntRead, n.id] });
    if (n.cat === "ticket") openThread(REPLY_TICKET);
    else if (n.cat === "order") go("orders");
  };

  return (
    <main className="oh-screen oh-page w-820 nt">
      <div className="nt__head">
        <div className="nt__head-text">
          <h1 className="nt__h1">Notifications</h1>
          <p className="nt__lede">{intro}</p>
        </div>
        <div className="nt__head-acts">
          <ButtonSecondary icon="check-check" onClick={markAll}>
            Mark all read
          </ButtonSecondary>
          <IconButton
            icon="settings"
            label="Notification settings"
            className="nt__settings"
            onClick={openSettings}
          />
        </div>
      </div>

      <ChipRow className="nt__cats" gap={10}>
        {cats.map((c) => (
          <Chip
            key={c.id}
            icon={c.icon}
            active={ntCat === c.id}
            count={
              c.id === "all"
                ? all.length
                : all.filter((n) => n.cat === c.id).length
            }
            onClick={() => set({ ntCat: c.id })}
          >
            {c.name}
          </Chip>
        ))}
      </ChipRow>

      {groups.length ? (
        <div className="nt__days">
          {groups.map((g) => (
            <section className="nt__day" key={g.day}>
              <div className="nt__day-head">
                <Eyebrow>{g.day}</Eyebrow>
                <span className="nt__rule" />
              </div>
              <div className="nt__rows">
                {g.rows.map((n) => {
                  const unread = isUnread(n);
                  return (
                    <button
                      type="button"
                      key={n.id}
                      className="oh-res nt__row"
                      onClick={() => onRow(n)}
                    >
                      <span className="nt__chip">
                        <Icon name={n.icon} size={19} />
                      </span>
                      <span className="nt__text">
                        <span
                          className={`nt__title${
                            unread ? " nt__title--unread" : ""
                          }`}
                        >
                          {n.title}
                        </span>
                        <span className="nt__body">{n.text}</span>
                      </span>
                      <span className="nt__time">{n.time}</span>
                      {unread ? (
                        <span className="nt__dot" aria-label="Unread" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <EmptyState
          compact
          icon="bell-off"
          title="Nothing in this filter"
          body="Try another category — we keep 90 days of history."
        />
      )}
    </main>
  );
}
