/**
 * THIS HELP DESK'S RECORDS, TURNED INTO SLOT PAYLOADS.
 *
 * A slot id names a SURFACE, so its payload has to be a shape every host of
 * that surface can honestly produce. This app has a returns wizard whose state
 * is five store fields and a derived reference; the seam wants an entity name,
 * a record and — for the dispatch panel — an `OutboundOrder`. Something has to
 * convert, and THE HOST IS THE ONLY PARTY THAT CAN: it is the one that knows
 * both its own records and the shape it promised. Nothing here names an
 * add-on; `src/add-ons/registry.ts` is the only shipped file that does.
 *
 * ── THE INBOUND READING (31 O4) ────────────────────────────────────────────
 *
 * A return travels TOWARD the business. The conformance suite makes the
 * carrier contract direction-symmetric, and the payload mapping here follows
 * the same reading: `origin` stays what its doc comment says it is — THE
 * SHOP'S OWN ADDRESS, the one end of the route this app can state as a fact —
 * and `destination` is omitted, because the other end belongs to the sender
 * and the sender types it into the add-on's own form. The tracking panel
 * reads neither; what it reads is `ref`, which is the RMA reference both
 * sides already use.
 */

import type {
  CatalogueSample,
  OutboundOrder,
  PostalAddress,
  RecordActionsPayload,
  ShopClock,
  SlotItem,
} from "./vendor/host/index.ts";
import type { Order, Product } from "../data/types.ts";
import { dataSource } from "../data/source.ts";

/**
 * WHEN THIS SHOP THINKS IT IS.
 *
 * A pin and not `new Date()`, for 24 D11's reason: a delivery estimate is date
 * arithmetic relative to today, and a demo whose dates move is a demo nobody
 * can screenshot or assert. A WEDNESDAY, mid-morning and before the carrier's
 * default cut-off, because "today's van has not gone yet" is the ordinary case
 * worth showing; a reader who wants the other one moves the cut-off in the
 * settings panel.
 */
export const SHOP_CLOCK: ShopClock = { iso: "2026-08-19", hour: 11, minute: 25 };

/**
 * Where this business receives things — its own end of any route.
 *
 * The NAME comes off the seam's `brand()` fact rather than being spelled here,
 * for the same reason seven components stopped printing `BRAND` from the demo
 * module: the brand is data, and this file is not where it lives. The address
 * lines are this app's seeded fiction, in the same city as its seeded
 * customer, because a domestic return is the ordinary case a demo should pin.
 */
export function shopAddress(): PostalAddress {
  return {
    name: dataSource.brand(),
    lines: ["Unit 9, Ferry Works"],
    city: "Bristol",
    postcode: "BS2 0FZ",
    country: "GB",
  };
}

/** `"×2"`, `"x 1"`, `"٢"` — whatever a seeded quantity string carries, as a count. */
function quantityOf(qty: string): number {
  const digits = qty.replace(/[^0-9]/g, "");
  const parsed = Number.parseInt(digits, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

/** The picked lines of an order, in the seam's own item shape. */
function pickedItems(order: Order | undefined, picked: readonly string[]): SlotItem[] {
  if (order === undefined) return [];
  return order.items
    .filter((item) => picked.includes(item.name))
    .map((item) => ({
      id: item.name,
      key: item.prod,
      label: item.name,
      quantity: quantityOf(item.qty),
    }));
}

/** What the returns wizard knows, as `record.actions` wants it. */
export function returnRecordFor(state: {
  rRma: string;
  rOrder: string;
  rPicked: readonly string[];
  rReason: string;
  rMethod: string;
}): Pick<RecordActionsPayload, "entity" | "recordId" | "record" | "now"> {
  return {
    /*
     * The host's own word for what kind of record this is. An add-on decides
     * whether it applies from THIS field and never from sniffing the record —
     * which is why the record below can honestly carry whatever this app
     * finds useful to pass.
     */
    entity: "return",
    recordId: state.rRma,
    record: {
      order: state.rOrder,
      items: [...state.rPicked],
      reason: state.rReason,
      method: state.rMethod,
    },
    now: SHOP_CLOCK,
  };
}

/** The return as something crossing the dispatch surface — see the header. */
export function inboundOrderFor(state: {
  rRma: string;
  rOrder: string;
  rPicked: readonly string[];
}): OutboundOrder {
  return {
    ref: state.rRma,
    recipient: { name: dataSource.brand() },
    items: pickedItems(dataSource.order(state.rOrder), state.rPicked),
    origin: shopAddress(),
  };
}

/**
 * WHAT THE SHOP KNOWS AND NO ADD-ON DOES: one row per product family, for a
 * settings form. Required on the settings payload — the second host to mount
 * that slot once passed `{ patch }` alone, `tsc` was happy, and a settings
 * form threw on `.map`. Nothing here is weighed or priced, because this help
 * desk's catalogue is names and icons; the optional facts stay honestly
 * absent and an add-on with an opinion says "assumed" on screen.
 */
export function sampleCatalogue(products: readonly Product[]): CatalogueSample[] {
  return products.map((product) => ({
    key: product.id,
    label: product.name,
    quantity: 1,
  }));
}
