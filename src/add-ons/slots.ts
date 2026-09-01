/**
 * THE SLOTS THIS HELP DESK MOUNTS, and what it draws where nothing fills one.
 *
 * ── THREE OF TWELVE, AND THE BOUNDARY IS STRUCTURAL ────────────────────────
 *
 * `vendor/host/slots.ts` carries the CLOSED REGISTRY — twelve ids, every place
 * in any Adminium app an add-on may reach. This list is three of them, and the
 * three are what a CUSTOMER help portal can honestly host. `manifest.json`
 * declares exactly one frontend and its `side` is `customer`; the staff half
 * of this product is Adminium's generated dashboard, on the other side of the
 * API.
 *
 *   `record.actions`         act on the record in front of you. Here that
 *                            record is a RETURN the customer has just opened,
 *                            and the act is getting a prepaid label to send it
 *                            back — the reader's OWN record, which is half of
 *                            why the slot's surface is `both` (31 O1, §12.2).
 *   `order.dispatch.panel`   the READING of a shipment — where is it, what
 *                            reference can I quote. For a return the parcel
 *                            travels TOWARD the business (31 O4), and the
 *                            panel neither knows nor cares.
 *   `order.dispatch.actions` the DOING of a dispatch is a warehouse surface,
 *                            and this app has no screen where that person
 *                            works. NOT OURS — the add-on that fills the two
 *                            above fills it too; it simply never renders here.
 *
 * `settings.add-on.panel` is the third, and the odd one: its surface is
 * `admin` and this app has no admin. See `components/AddOnsDrawer.tsx` for
 * what was built to hold it and why that is not a contradiction.
 */

import {
  HOSTED_SLOTS as SLOT_REGISTRY,
  type SlotEmptyBehaviour,
  type SlotId,
} from "./vendor/host/index.ts";

/**
 * THIS host's list. The import above renames the closed registry on the way in
 * — `vendor/host/slots.ts` exports all twelve under the name `HOSTED_SLOTS`,
 * the same identifier this file uses for the three ids the app actually
 * mounts, and importing the wrong one silently widens every check in the kit.
 * `guards/mounts.ts` asserts this list is a strict subset of the registry so a
 * mis-import is a named failure.
 */
export const HOSTED_SLOTS = [
  "record.actions",
  "order.dispatch.panel",
  "settings.add-on.panel",
] as const satisfies readonly SlotId[];

export type HostedSlotId = (typeof HOSTED_SLOTS)[number];

/** Proof the three are members of the closed registry, at compile time. */
export type EveryHostedSlotIsInTheRegistry = Extract<
  HostedSlotId,
  (typeof SLOT_REGISTRY)[number]
>;

/**
 * WHAT THIS APP DRAWS WHERE NOTHING FILLS EACH SLOT (24 D6, D19).
 *
 * `speaks` — a real empty state in words, where a reader has something to be
 * told. `silent` — nothing at all, where a placeholder would make an
 * unconnected help desk look broken. There is deliberately no shared table of
 * these; `vendor/host/slots.ts` records why empty behaviour is a property of
 * the SCREEN a host built and not of the slot id.
 */
export const SLOT_EMPTY_BEHAVIOUR: Readonly<Record<HostedSlotId, SlotEmptyBehaviour>> = {
  /*
   * SILENT, and this is the mount where D6 does the most work here. The
   * returns wizard's final step has always ended in a reference code, an
   * email-a-label button and a what-happens-next list — a finished screen. The
   * slot is ADDITIVE: with nothing connected the step is byte-identical to the
   * screen this app shipped before the seam, which is exactly the claim a
   * reviewer switching the add-on off is checking.
   */
  "record.actions": "silent",
  /*
   * SILENT, for the same reason: with no carrier there is no shipment to read
   * and the step already says what happens next in its own words. A "tracking
   * is not connected" sentence under a demo help desk's return would be an
   * apology for a screen that is not broken.
   */
  "order.dispatch.panel": "silent",
  /*
   * SPEAKS, for the reason the manage drawer's other hosts speak: the drawer
   * puts each panel under its OWN heading, and a heading with a gap under it
   * is a hole. An add-on with nothing to configure says so in a sentence.
   */
  "settings.add-on.panel": "speaks",
};
