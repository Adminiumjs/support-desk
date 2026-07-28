/*
 * The billing table (delta spec A §3.4): a header strip plus six-column rows.
 *
 * The columns are fixed-flex so the head and the rows line up; both live here
 * so they cannot drift apart.
 */

import { signedMoney } from "../lib/format";
import { INVOICE_STATUS_META } from "../lib/derive";
import { IconButton } from "./Primitives";
import { SoftPill } from "./StatusPill";
import type { Invoice } from "../data/types";

/** The uppercase `--surface-2` header strip. */
export function InvoiceHead() {
  return (
    <div className="inv inv--head">
      <span className="inv__id">Invoice</span>
      <span className="inv__desc">Description</span>
      <span className="inv__date">Date</span>
      <span className="inv__amount">Amount</span>
      <span className="inv__status">Status</span>
      <span className="inv__action" />
    </div>
  );
}

export interface InvoiceRowProps {
  invoice: Invoice;
  /** Drops the bottom border on the last row. */
  last?: boolean;
  /** "Download PDF", or a payment retry on a failed invoice. */
  onDownload: () => void;
}

/** `<InvoiceRow invoice={i} onDownload={() => downloadInvoice(i)} />` */
export function InvoiceRow({ invoice, last = false, onDownload }: InvoiceRowProps) {
  const meta = INVOICE_STATUS_META[invoice.status];
  const failed = invoice.status === "failed";
  const negative = invoice.amount < 0;

  return (
    <div className={`inv${last ? " inv--last" : ""}`}>
      <span className="inv__id">{invoice.id}</span>
      <span className="inv__desc">{invoice.desc}</span>
      <span className="inv__date">{invoice.date}</span>
      <span
        className="inv__amount"
        style={negative ? { color: "var(--pos)" } : undefined}
      >
        {signedMoney(invoice.amount)}
      </span>
      <span className="inv__status">
        <SoftPill fg={meta.fg} soft={meta.soft} icon={meta.icon} iconSize={12}>
          {meta.label}
        </SoftPill>
      </span>
      <span className="inv__action">
        <IconButton
          icon={failed ? "refresh-cw" : "download"}
          label={failed ? "Retry payment" : "Download PDF"}
          small
          onClick={onDownload}
        />
      </span>
    </div>
  );
}

export default InvoiceRow;
