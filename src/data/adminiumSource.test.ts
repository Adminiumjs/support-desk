// SPDX-License-Identifier: AGPL-3.0-only
/**
 * Connected mode (28-public-surface.md §5.2, 28-T28 wave 3).
 *
 * ── WHY THIS DRIVES A REAL CLIENT ──────────────────────────────────────────
 * `createPublicClient` takes an injectable `fetch`, so these run the SHIPPED
 * client against canned wire responses rather than a hand-written stub of it.
 * `assertRefs`, the config fetch, the paging and the URL building are therefore
 * under test too.
 *
 * ── AND WHAT IS WORTH ASSERTING IN AN APP THIS FAR AHEAD OF ITS SCHEMA ─────
 * 28-T33 §7 said this repo "cannot be reconciled at all as scoped", and the
 * source file's header lists the twenty-odd features with no table. So the
 * tests below pin the boundary rather than pretending there is not one: what
 * the ten real tables produce, what the two closed unions drop, what a
 * customer-side key may not see, and that everything else is knowingly the
 * demo's.
 */

import { describe, expect, it } from "vitest";

import { createPublicClient } from "@adminiumjs/public-client";

import { loadSnapshot, snapshotSource } from "./adminiumSource";
import { dataSource, demoDataSource, isConnected, setDataSource } from "./source";

const PUBLIC = ["agents", "products", "kbCategories", "kbArticles"];
const STAFF = ["customers", "tickets", "ticketMessages", "orders", "orderItems", "orderEvents"];

const ROWS: Record<string, unknown[]> = {
  agents: [
    { id: 1, name: "Maya", full_name: "Maya from Hearth", initials: "MA", tint: "#4f8bd6", active: true },
  ],
  products: [
    { id: 5, code: "doorbell", name: "Video Doorbell", model: "Hearth Doorbell", icon: "bell", tint: "#4f8bd6" },
    { id: 6, code: "kettle", name: "Smart Kettle", model: "Hearth Kettle", icon: "cup", tint: "#aa3311" },
  ],
  kbCategories: [
    { id: 10, slug: "setup", name: "Setting up", icon: "wrench", tint: "#4f8bd6", blurb: "Out of the box.", position: 0 },
    { id: 11, slug: "recipes", name: "Recipes", icon: "chef", tint: "#111111", blurb: "Not a section.", position: 1 },
  ],
  kbArticles: [
    {
      id: 20, slug: "pair-your-doorbell", category_id: 10, title: "Pair your doorbell",
      snippet: "Two minutes, one button.", read_minutes: 2,
      body: [{ t: "p", x: "Hold the button." }], published: true, position: 0,
    },
    {
      id: 21, slug: "draft-note", category_id: 10, title: "Draft", snippet: "",
      read_minutes: 1, body: [], published: false, position: 1,
    },
    {
      id: 22, slug: "orphan", category_id: 11, title: "Orphan", snippet: "",
      read_minutes: 1, body: [], published: true, position: 2,
    },
  ],
  customers: [{ id: 30, address: "1 Alder Street\nOld Mill", email: "sam@example.test" }],
  tickets: [
    { id: 40, number: "TCK-9001", product_id: 5, topic: "setup", subject: "Won't pair", status: "open", updated_at: "2026-07-28T09:00:00Z" },
    { id: 41, number: "TCK-9000", product_id: null, topic: "account", subject: "Billing", status: "solved", updated_at: "2026-07-20T09:00:00Z" },
  ],
  ticketMessages: [
    { ticket_id: 40, author: "customer", body: "It blinks red.", created_at: "2026-07-28T08:00:00Z" },
    { ticket_id: 40, author: "agent", body: "Hold for ten seconds.", created_at: "2026-07-28T09:00:00Z" },
  ],
  orders: [
    { id: 50, number: "ORD-1", customer_id: 30, status: "delivered", carrier: "Parcelforce", tracking_code: "PF1", total: "129.00", placed_at: "2026-07-10T09:00:00Z" },
    { id: 51, number: "ORD-2", customer_id: 30, status: "cancelled", carrier: null, tracking_code: null, total: "40.00", placed_at: "2026-07-12T09:00:00Z" },
  ],
  orderItems: [
    { order_id: 50, product_id: 5, title: "Video Doorbell", qty: 1, unit_price: "129.00" },
  ],
  orderEvents: [
    { order_id: 50, label: "Delivered", detail: "Left with a neighbour", state: "done", position: 1 },
    { order_id: 50, label: "Packed", detail: null, state: "done", position: 0 },
  ],
};

interface FakeOptions {
  rows?: Record<string, unknown[]>;
  expose?: (ref: string) => string[];
  limit?: number;
  side?: string;
}

/** A server that answers exactly what the scope would, paging included. */
function fakeFetch(overrides: FakeOptions = {}) {
  const rows = overrides.rows ?? ROWS;
  const limit = overrides.limit ?? 500;
  const side = overrides.side ?? "staff";
  return async (input: RequestInfo | URL): Promise<Response> => {
    const url = new URL(String(input));
    const json = (body: unknown) =>
      new Response(JSON.stringify(body), { status: 200, headers: { "content-type": "application/json" } });

    if (url.pathname.endsWith("/public/config")) {
      const refs: Record<string, unknown> = {};
      for (const ref of side === "staff" ? [...PUBLIC, ...STAFF] : PUBLIC) {
        refs[ref] = {
          actions: ["list"],
          expose: overrides.expose?.(ref) ?? Object.keys((rows[ref]?.[0] ?? {}) as object),
          filterable: [], searchable: [], orderable: [], writable: [], limit,
        };
      }
      // `/public/config` is the one route the client unwraps: it reads
      // `body.data`, while `list` reads the body itself.
      return json({
        data: { version: 1, side, timezone: "Europe/London", currency: "GBP", claim: null, refs },
      });
    }

    const ref = url.pathname.split("/").pop() ?? "";
    const all = rows[ref] ?? [];
    const offset = Number(url.searchParams.get("offset") ?? "0");
    const size = Number(url.searchParams.get("limit") ?? String(all.length));
    return json({ data: all.slice(offset, offset + size) });
  };
}

const clientWith = (fetch: ReturnType<typeof fakeFetch>) =>
  createPublicClient({ baseUrl: "https://api.example.test", publishableKey: "adm_pub_test", fetch });

const snapshot = async (overrides: FakeOptions = {}) =>
  loadSnapshot(clientWith(fakeFetch(overrides))!);

describe("demo mode is the structural default", () => {
  it("builds no client when either variable is absent", () => {
    expect(createPublicClient({ baseUrl: "https://x.test", publishableKey: "" })).toBeNull();
    expect(createPublicClient({ baseUrl: "", publishableKey: "adm_pub_x" })).toBeNull();
    expect(createPublicClient(undefined)).toBeNull();
  });

  it("falls back rather than throwing when the server is unreachable", async () => {
    const client = clientWith(async () => {
      throw new Error("ECONNREFUSED");
    });
    expect(await loadSnapshot(client!)).toBeNull();
  });

  it("falls back when the scope does not expose a column the app reads", async () => {
    expect(await snapshot({ expose: () => ["id"] })).toBeNull();
  });
});

describe("two closed unions decide what survives", () => {
  it("drops a product and a section the app's types cannot name", async () => {
    const snap = await snapshot();
    expect(snap).not.toBeNull();
    // `ProductId` is four devices and `CategorySlug` is five sections, and the
    // tint tables, the icon map and `byoPrices` are all keyed by them. A fifth
    // of either is a row the dashboard can edit and the help desk cannot
    // mention — the people-ops pattern, applied to a catalogue.
    expect(snap!.products.map((p) => p.id)).toEqual(["doorbell"]);
    expect(snap!.categories.map((c) => c.slug)).toEqual(["setup"]);
    // …and the article filed under the section that went with it.
    expect(snap!.articles.map((a) => a.id)).toEqual(["pair-your-doorbell"]);
  });

  it("keeps drafts out of the knowledge base and parses a jsonb body", async () => {
    const parsed = await snapshot();
    expect(parsed!.bodies["pair-your-doorbell"]).toEqual([{ t: "p", x: "Hold the button." }]);
    // sqlite hands a `json` column back as TEXT while postgres and mysql parse
    // it — the same split `packages/meta`'s public-api repo had to handle.
    const asText = await snapshot({
      rows: {
        ...ROWS,
        kbArticles: [{ ...(ROWS["kbArticles"]![0] as object), body: '[{"t":"p","x":"Hold the button."}]' }],
      },
    });
    expect(asText!.bodies["pair-your-doorbell"]).toEqual([{ t: "p", x: "Hold the button." }]);
  });
});

describe("the side of the key decides what is read", () => {
  it("reads no ticket and no order through a customer-side scope", async () => {
    const snap = await snapshot({ side: "customer" });
    // The knowledge base is public; a requester's name, e-mail and delivery
    // address are not.
    expect(snap!.articles).toHaveLength(1);
    expect(snap!.tickets).toEqual([]);
    expect(snap!.orders).toEqual([]);
  });

  it("reads the desk itself through a staff-side scope, newest first", async () => {
    const snap = await snapshot({ side: "staff" });
    expect(snap!.tickets.map((t) => t.id)).toEqual(["TCK-9001", "TCK-9000"]);
    expect(snap!.tickets[0]!.msgs).toEqual([
      { who: "customer", text: "It blinks red.", time: "2026-07-28" },
      { who: "agent", text: "Hold for ten seconds.", time: "2026-07-28" },
    ]);
    // A cancelled order is not a delivery anybody is tracking.
    expect(snap!.orders.map((o) => o.id)).toEqual(["ORD-1"]);
    const order = snap!.orders[0]!;
    expect(order.addr).toEqual(["1 Alder Street", "Old Mill"]);
    // Steps come back in `position` order, and WS-I G-3: there is no time
    // column, so `when` carries the event's detail or nothing.
    expect(order.steps.map((s) => s.label)).toEqual(["Packed", "Delivered"]);
    expect(order.steps[0]!.when).toBe("");
    expect(order.items[0]).toMatchObject({ prod: "doorbell", qty: "1", price: "129.00" });
  });

  it("reads every page, not just the first the scope allows", async () => {
    const snap = await snapshot({ limit: 1 });
    expect(snap!.tickets).toHaveLength(2);
    expect(snap!.tickets[0]!.msgs).toHaveLength(2);
  });
});

describe("what a connected build refuses to carry over", () => {
  it("prints no brand and knows no customer", async () => {
    const connected = snapshotSource((await snapshot())!);
    // WS-I G-1: seven components printed HEARTH straight from the seed.
    expect(connected.brand()).toBe("");
    // WS-I G-2: identity is not solved.
    expect(connected.customer()).toEqual({ initials: "", tint: "", email: "" });
    expect(connected.agent().name).toBe("Maya");
  });

  it("answers every method the seam declares, delegating the ones with no table", async () => {
    const connected = snapshotSource((await snapshot())!);
    const keys = Object.keys(demoDataSource) as (keyof typeof demoDataSource)[];
    // `demoDataSource` is an object LITERAL, so a spread really does carry its
    // methods — unlike booking-scheduler's class, where the same shape would
    // have silently produced ninety `undefined`s.
    expect(keys.length).toBeGreaterThan(80);
    for (const key of keys) expect(typeof connected[key], key).toBe("function");
    // And these are the fiction the header is about: the forum, the shop, the
    // status page, the smart home. None of them has a table.
    expect(connected.forumCategories().length).toBeGreaterThan(0);
    expect(connected.bundles().length).toBeGreaterThan(0);
    expect(connected.statusComponents().length).toBeGreaterThan(0);
    expect(connected.energyRooms().length).toBeGreaterThan(0);
  });

  it("derives what the schema has no column for", async () => {
    const connected = snapshotSource((await snapshot())!);
    // No "popular" column, so the catalogue's own order stands in.
    expect(connected.popularArticles().map((a) => a.id)).toEqual(["pair-your-doorbell"]);
    // A return needs a delivered order to return.
    expect(connected.returnableOrders()).toEqual(["ORD-1"]);
    expect(connected.articlesInCategory("setup")).toHaveLength(1);
    expect(connected.category("recipes")).toBeUndefined();
  });
});

describe("the seam", () => {
  it("reports demo mode until a real source is installed", async () => {
    expect(isConnected()).toBe(false);
    const connected = snapshotSource((await snapshot())!);
    setDataSource(connected);
    expect(isConnected()).toBe(true);
    // The Proxy means a component reading `dataSource` sees the swap at once —
    // which is why the store, and only the store, forces the dynamic import.
    expect(dataSource.brand()).toBe("");
    setDataSource(demoDataSource);
    expect(isConnected()).toBe(false);
  });
});
