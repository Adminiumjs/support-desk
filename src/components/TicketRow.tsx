/*
 * TicketRow — one liftable row in the My tickets list (port spec §6.9).
 */

import { dataSource } from "../data/source";
import { updatedLine } from "../lib/format";
import { Icon } from "./Icon";
import { IconChip } from "./PlaceholderTile";
import { StatusPill } from "./StatusPill";
import type { Ticket } from "../data/types";

export interface TicketRowProps {
  ticket: Ticket;
  onClick: () => void;
  className?: string;
}

/** `<TicketRow ticket={t} onClick={() => openThread(t.id)} />` */
export function TicketRow({ ticket, onClick, className }: TicketRowProps) {
  const product = dataSource.product(ticket.product);
  return (
    <button
      type="button"
      className={`ticket-row oh-card${className ? ` ${className}` : ""}`}
      onClick={onClick}
    >
      <IconChip
        tint={product.tint}
        icon={product.icon}
        size={40}
        radius={12}
        iconSize={20}
      />
      <span className="sd-col sd-grow" style={{ gap: 5 }}>
        <span className="sd-row sd-wrap" style={{ gap: 10 }}>
          <span className="ticket-row__id">{ticket.id}</span>
          <span className="ticket-row__subject">{ticket.subject}</span>
        </span>
        <span className="ticket-row__sub">
          {updatedLine(ticket.updated, product.name)}
        </span>
      </span>
      <StatusPill status={ticket.status} />
      <Icon name="chevron-right" size={18} color="var(--fg-subtle)" />
    </button>
  );
}

export default TicketRow;
