/*
 * Timelines (port spec §4.4): the 3-node horizontal one on the ticket thread,
 * the vertical one on orders / claims / status incidents, and the numbered
 * step indicator on the returns wizard.
 */

import type { StepState } from "../data/types";
import type { TimelineNode } from "../lib/thread";

/* --------------------------------------------------------- horizontal */

export interface HorizontalTimelineProps {
  /** Straight from `threadTimeline(ticket)`. */
  nodes: TimelineNode[];
  className?: string;
}

/** `<HorizontalTimeline nodes={threadTimeline(ticket)} />` */
export function HorizontalTimeline({
  nodes,
  className,
}: HorizontalTimelineProps) {
  return (
    <div className={`tl-h${className ? ` ${className}` : ""}`}>
      {nodes.map((n) => (
        <div key={n.label} style={{ display: "contents" }}>
          {n.showLine ? (
            <span className={`tl-line${n.lineActive ? " tl-line--on" : ""}`} />
          ) : null}
          <span className={`tl-dot tl-dot--${n.state}`} />
          <span className={`tl-label tl-label--${n.state}`}>{n.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ----------------------------------------------------------- vertical */

export interface VerticalTimelineEntry {
  label: string;
  st: StepState;
  /** Mono timestamp shown under the label. */
  when?: string;
  /** Plain note shown under the label (takes precedence over `when`). */
  note?: string;
}

export interface VerticalTimelineProps {
  entries: VerticalTimelineEntry[];
  className?: string;
}

/** `<VerticalTimeline entries={order.steps.map(s => ({ label: s.label, st: s.st, when: s.when }))} />` */
export function VerticalTimeline({ entries, className }: VerticalTimelineProps) {
  return (
    <div className={`tl-v${className ? ` ${className}` : ""}`}>
      {entries.map((e, i) => (
        <div className="tl-v__row" key={`${e.label}-${i}`}>
          <div className="tl-v__rail">
            <span className={`tl-dot tl-dot--${e.st}`} />
            {i < entries.length - 1 ? (
              <span
                className={`tl-v__conn${e.st === "done" ? " tl-v__conn--on" : ""}`}
              />
            ) : null}
          </div>
          <div>
            <div
              className={`tl-v__label${
                e.st === "todo"
                  ? ""
                  : e.st === "current"
                    ? " tl-label--current"
                    : ""
              }`}
              style={
                e.st === "todo"
                  ? { color: "var(--fg-subtle)" }
                  : e.st === "current"
                    ? { color: "var(--accent)" }
                    : undefined
              }
            >
              {e.label}
            </div>
            {e.note ? (
              <div className="tl-v__note">{e.note}</div>
            ) : e.when ? (
              <div className="tl-v__time">{e.when}</div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------- event rail */

export interface EventTimelineEntry {
  /** Mono timestamp, rendered above the text. */
  when: string;
  text: string;
  st: StepState;
}

export interface EventTimelineProps {
  entries: EventTimelineEntry[];
  className?: string;
}

/**
 * The incident rail: timestamp first, then the sentence. Same dots and
 * connectors as `<VerticalTimeline>`, opposite text order.
 *
 * `<EventTimeline entries={dataSource.breachTimeline()} />`
 */
export function EventTimeline({ entries, className }: EventTimelineProps) {
  return (
    <div className={`tl-v tl-e${className ? ` ${className}` : ""}`}>
      {entries.map((e, i) => (
        <div className="tl-v__row" key={`${e.when}-${i}`}>
          <div className="tl-v__rail">
            <span className={`tl-dot tl-dot--${e.st}`} />
            {i < entries.length - 1 ? (
              <span
                className={`tl-v__conn${e.st === "done" ? " tl-v__conn--on" : ""}`}
              />
            ) : null}
          </div>
          <div className="tl-e__body">
            <div className="tl-v__time">{e.when}</div>
            <p className="tl-e__text">{e.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------- steps */

export interface StepIndicatorProps {
  labels: string[];
  /** 1-based current step. */
  current: number;
  /**
   * `danger` paints the nodes, connectors and current label in `--danger` —
   * the account-deletion wizard, which is deliberately not accent-coloured.
   */
  tone?: "accent" | "danger";
  className?: string;
}

/** `<StepIndicator labels={["What goes", "Alternatives", "Confirm"]} current={dlStep} tone="danger" />` */
export function StepIndicator({
  labels,
  current,
  tone = "accent",
  className,
}: StepIndicatorProps) {
  return (
    <div
      className={`steps${tone === "danger" ? " steps--danger" : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      {labels.map((label, i) => {
        const n = i + 1;
        const done = current > n;
        const isCurrent = current === n;
        return (
          <div key={label} style={{ display: "contents" }}>
            {i > 0 ? (
              <span className={`steps__line${done || isCurrent ? " steps__line--on" : ""}`} />
            ) : null}
            <span className={`steps__num${done || isCurrent ? " steps__num--on" : ""}`}>
              {n}
            </span>
            <span
              className={`steps__label${
                isCurrent
                  ? " steps__label--current"
                  : done
                    ? " steps__label--done"
                    : ""
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
