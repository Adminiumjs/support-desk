/*
 * EmptyState — the dashed-outline empty (port spec §4.8). Six in the comp:
 * KB results, appointments, saved articles, notifications, partner queue,
 * spare-parts basket.
 */

import { Icon } from "./Icon";
import { ButtonPrimary } from "./Primitives";
import type { ReactNode } from "react";

export interface EmptyStateSuggestion {
  label: string;
  onClick: () => void;
}

export interface EmptyStateProps {
  icon: string;
  title: string;
  /** Body copy — max-width 360px, 14px muted. */
  body?: ReactNode;
  /** Optional chip row under the body. */
  suggestions?: EmptyStateSuggestion[];
  /** The primary escape hatch. */
  action?: { label: string; icon?: string; onClick: () => void };
  /** Tighter padding variant (appointments, partner queue, saved, notifs). */
  compact?: boolean;
  className?: string;
}

/**
 * `<EmptyState icon="search-x" title="No results" body="Try fewer words."
 *    action={{ label: "Open a ticket", icon: "pen-line", onClick: openTicket }} />`
 */
export function EmptyState({
  icon,
  title,
  body,
  suggestions,
  action,
  compact = false,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={`empty${compact ? " empty--sm" : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      <span className="empty__ico">
        <Icon name={icon} size={compact ? 25 : 27} />
      </span>
      <h3 className="empty__title">{title}</h3>
      {body ? <p className="empty__body">{body}</p> : null}
      {suggestions?.length ? (
        <div className="empty__chips">
          {suggestions.map((s) => (
            <button
              key={s.label}
              type="button"
              className="empty__chip fx-chip"
              onClick={s.onClick}
            >
              {s.label}
            </button>
          ))}
        </div>
      ) : null}
      {action ? (
        <ButtonPrimary
          size="md"
          icon={action.icon}
          onClick={action.onClick}
          style={{ marginBlockStart: 8 }}
        >
          {action.label}
        </ButtonPrimary>
      ) : null}
    </div>
  );
}

export default EmptyState;
