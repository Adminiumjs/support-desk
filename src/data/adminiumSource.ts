// SPDX-License-Identifier: AGPL-3.0-only
/**
 * A `DataSource` backed by a real Adminium instance (28-public-surface.md §5.2,
 * 28-T28 wave 3).
 *
 * ── READ THIS FIRST: THIS APP IS MOSTLY NOT IN ITS OWN DATABASE ────────────
 * 28-T33 §7 said support-desk "cannot be reconciled at all as scoped", and this
 * file is what that sentence looks like in code. The seam declares about ninety
 * methods. `db/schema.sql` is TEN TABLES: agents, customers, products, the
 * knowledge base, tickets and their messages, and orders with their lines and
 * events. Everything else the app renders — the forum, warranty registration
 * and claims, returns, repair booking, firmware and downloads, the status page,
 * the parts shop and bundles and gift cards and plans and trade-in, the smart
 * home, energy, members, referrals, installers and partner jobs, sessions and
 * security, the survey, cameras and clips, automations, invoices and warranty
 * transfer — has NO TABLE ANYWHERE. Those methods are delegated to the demo
 * source unchanged, and they are fiction against a real deployment.
 *
 * That is not a gap to close in a mapping. It is 28-T36's re-scope, and until
 * it happens a connected build of this app is a real help desk wrapped in a
 * demo. The `DELEGATED` list at the bottom of this file is the honest inventory
 * — read it before pointing this at a tenant.
 *
 * ── THE SIDE OF THE KEY DECIDES WHAT IS READ ───────────────────────────────
 * A CUSTOMER-side scope reads the catalogue and the knowledge base. A STAFF-side
 * scope additionally reads tickets, their messages and orders — which carry a
 * requester's name, e-mail and delivery address. Getting this backwards puts
 * every customer's support history on a public help centre.
 *
 * ── TWO CLOSED UNIONS DECIDE WHAT SURVIVES ─────────────────────────────────
 * `ProductId` is four devices and `CategorySlug` is five sections, both
 * compile-time unions the tint tables, the icon map and `byoPrices` are keyed
 * by. A product or a section whose slug is not one of them is DROPPED, and so
 * is every ticket, order line and article that points at it. A tenant with a
 * fifth device gets a row the generated dashboard can edit and the help desk
 * cannot mention — the people-ops pattern, applied to a catalogue.
 *
 * ── WHAT THE SCHEMA CANNOT SAY (WS-I gaps, marked not hidden) ──────────────
 * G-1 THE VENDOR HAS NO RECORD: no brand name, no footer URL, no copyright
 *     line. Connected mode returns an empty brand, so the header wordmark is
 *     blank rather than another company's name.
 * G-2 Identity is not solved, so `customer()` is blank. The account screens
 *     have nobody to be until the claim flow lands (§3.4, O2).
 * G-3 `order_events` records a label and an order, never a TIME, so every step
 *     on the tracker reads without one.
 * G-4 A ticket's "updated" stamp is a relative phrase in the seed ("2h ago").
 *     There is no locale here to phrase one in, so it is the tenant's date.
 */

import {
  createPublicClient,
  toTenantDay,
  type PublicClient,
  type PublicConfig,
} from "@adminiumjs/public-client";

import type {
  Article,
  BodyBlock,
  Category,
  CategorySlug,
  CustomerIdentity,
  Order,
  OrderItem,
  OrderStatus,
  OrderStep,
  Person,
  Product,
  ProductId,
  StepState,
  Ticket,
  TicketMessage,
  TicketStatus,
} from "./types";
import { demoDataSource, type DataSource } from "./source";

/* --------------------------------------------------------------- the wire */

interface WireAgent {
  id: number;
  name: string;
  full_name: string;
  initials: string;
  tint: string;
  active: boolean;
}

interface WireProduct {
  id: number;
  code: string;
  name: string;
  model: string;
  icon: string;
  tint: string;
}

interface WireKbCategory {
  id: number;
  slug: string;
  name: string;
  icon: string;
  tint: string;
  blurb: string;
  position: number;
}

interface WireKbArticle {
  id: number;
  slug: string;
  category_id: number;
  title: string;
  snippet: string;
  read_minutes: number;
  /** `jsonb`: parsed on postgres and mysql, TEXT on sqlite. */
  body: BodyBlock[] | string;
  published: boolean;
  position: number;
}

interface WireTicket {
  id: number;
  number: string;
  product_id: number | null;
  topic: string;
  subject: string;
  status: TicketStatus;
  updated_at: string;
}

interface WireTicketMessage {
  ticket_id: number;
  author: "customer" | "agent";
  body: string;
  created_at: string;
}

interface WireCustomer {
  id: number;
  address: string | null;
  email: string;
}

interface WireOrder {
  id: number;
  number: string;
  customer_id: number;
  status: string;
  carrier: string | null;
  tracking_code: string | null;
  /** `numeric` serializes as a STRING, not a number. */
  total: string;
  placed_at: string;
}

interface WireOrderItem {
  order_id: number;
  product_id: number | null;
  title: string;
  qty: number;
  unit_price: string;
}

interface WireOrderEvent {
  order_id: number;
  label: string;
  detail: string | null;
  state: StepState;
  position: number;
}

/** The four devices and five sections the app's types actually admit. */
const PRODUCT_IDS: readonly string[] = ["thermostat", "doorbell", "plug", "sensor"];
const CATEGORY_SLUGS: readonly string[] = ["setup", "connect", "devices", "account", "orders"];

/** The catalogue and the knowledge base — readable by a key handed out. */
const PUBLIC_REFS = {
  agents: ["id", "name", "full_name", "initials", "tint", "active"],
  products: ["id", "code", "name", "model", "icon", "tint"],
  kbCategories: ["id", "slug", "name", "icon", "tint", "blurb", "position"],
  kbArticles: [
    "id", "slug", "category_id", "title", "snippet", "read_minutes", "body", "published", "position",
  ],
};

/** Everything with a requester's name or address on it — staff-side only. */
const STAFF_REFS = {
  customers: ["id", "address", "email"],
  tickets: ["id", "number", "product_id", "topic", "subject", "status", "updated_at"],
  ticketMessages: ["ticket_id", "author", "body", "created_at"],
  orders: ["id", "number", "customer_id", "status", "carrier", "tracking_code", "total", "placed_at"],
  orderItems: ["order_id", "product_id", "title", "qty", "unit_price"],
  orderEvents: ["order_id", "label", "detail", "state", "position"],
};

export interface Snapshot {
  side: PublicConfig["side"];
  agent: Person;
  products: Product[];
  categories: Category[];
  articles: Article[];
  bodies: Record<string, BodyBlock[]>;
  tickets: Ticket[];
  orders: Order[];
}

/**
 * The client, or null when either build-time variable is absent.
 *
 * The emptiness check is `createPublicClient`'s, not repeated here: it already
 * treats a missing or empty value as "this build has no server", and a second
 * copy of that rule is a second place for it to drift.
 */
export function clientFromEnv(): PublicClient | null {
  return createPublicClient({
    baseUrl: import.meta.env["VITE_ADMINIUM_API_BASE_URL"] as string | undefined,
    publishableKey: import.meta.env["VITE_ADMINIUM_PUBLISHABLE_KEY"] as string | undefined,
  });
}

/** Read a whole ref, a page at a time, at whatever size the scope permits. */
async function listAll<T>(
  client: PublicClient,
  ref: string,
  size: number,
  max: number,
): Promise<T[]> {
  const out: T[] = [];
  const page = Math.max(1, Math.min(size, 500));
  for (let offset = 0; offset < max; offset += page) {
    const res = await client.list<T>(ref, { limit: page, offset });
    out.push(...res.data);
    if (res.data.length < page) return out;
  }
  console.warn(`[adminium] ${ref}: stopped at ${String(max)} rows — the rest were not read.`);
  return out;
}

/** `jsonb` arrives parsed on postgres and mysql, and as text on sqlite. */
function bodyOf(value: BodyBlock[] | string): BodyBlock[] {
  if (Array.isArray(value)) return value;
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as BodyBlock[]) : [];
  } catch {
    return [];
  }
}

/**
 * Fetch the read-set and map it into the app's shapes.
 *
 * Returns `null` on ANY failure so the caller falls back to demo mode
 * structurally rather than in a catch — the marketplace demos are static clones
 * with no server and must keep working byte-identically.
 */
export async function loadSnapshot(client: PublicClient): Promise<Snapshot | null> {
  try {
    const config = await client.config();
    const staff = config.side === "staff";
    await client.assertRefs(staff ? { ...PUBLIC_REFS, ...STAFF_REFS } : PUBLIC_REFS);

    const tz = config.timezone;
    const cap = (ref: string): number => config.refs[ref]?.limit ?? 100;

    const [agents, products, categories, articles] = await Promise.all([
      listAll<WireAgent>(client, "agents", cap("agents"), 1_000),
      listAll<WireProduct>(client, "products", cap("products"), 1_000),
      listAll<WireKbCategory>(client, "kbCategories", cap("kbCategories"), 500),
      listAll<WireKbArticle>(client, "kbArticles", cap("kbArticles"), 20_000),
    ]);

    const [customers, tickets, messages, orders, items, events] = staff
      ? await Promise.all([
          listAll<WireCustomer>(client, "customers", cap("customers"), 50_000),
          listAll<WireTicket>(client, "tickets", cap("tickets"), 100_000),
          listAll<WireTicketMessage>(client, "ticketMessages", cap("ticketMessages"), 200_000),
          listAll<WireOrder>(client, "orders", cap("orders"), 100_000),
          listAll<WireOrderItem>(client, "orderItems", cap("orderItems"), 200_000),
          listAll<WireOrderEvent>(client, "orderEvents", cap("orderEvents"), 200_000),
        ])
      : ([[], [], [], [], [], []] as [
          WireCustomer[], WireTicket[], WireTicketMessage[], WireOrder[], WireOrderItem[], WireOrderEvent[],
        ]);

    /* --- the catalogue, narrowed to what the app's types admit ---------- */

    const mappedProducts: Product[] = products
      .filter((row) => PRODUCT_IDS.includes(row.code))
      .map((row) => ({
        id: row.code as ProductId,
        name: row.name,
        model: row.model,
        icon: row.icon as Product["icon"],
        tint: row.tint,
      }));
    const productCode = new Map<number, ProductId>(
      products
        .filter((row) => PRODUCT_IDS.includes(row.code))
        .map((row) => [row.id, row.code as ProductId]),
    );

    const mappedCategories: Category[] = [...categories]
      .filter((row) => CATEGORY_SLUGS.includes(row.slug))
      .sort((a, b) => a.position - b.position)
      .map((row) => ({
        slug: row.slug as CategorySlug,
        name: row.name,
        icon: row.icon as Category["icon"],
        tint: row.tint,
        blurb: row.blurb,
      }));
    const categorySlug = new Map<number, string>(categories.map((c) => [c.id, c.slug]));

    const mappedArticles: Article[] = [];
    const bodies: Record<string, BodyBlock[]> = {};
    for (const row of [...articles].sort((a, b) => a.position - b.position)) {
      if (!row.published) continue;
      const slug = categorySlug.get(row.category_id);
      // An article filed under a section this build has no tint or icon for has
      // nowhere to appear. Dropped, not filed under a guess.
      if (slug === undefined || !CATEGORY_SLUGS.includes(slug)) continue;
      mappedArticles.push({
        id: row.slug,
        cat: slug as CategorySlug,
        title: row.title,
        read: row.read_minutes,
        snippet: row.snippet,
      });
      bodies[row.slug] = bodyOf(row.body);
    }

    /* --- tickets and orders, staff-side only ---------------------------- */

    const messagesByTicket = new Map<number, TicketMessage[]>();
    for (const row of messages) {
      const list = messagesByTicket.get(row.ticket_id) ?? [];
      list.push({ who: row.author, text: row.body, time: toTenantDay(row.created_at, tz) });
      messagesByTicket.set(row.ticket_id, list);
    }

    const mappedTickets: Ticket[] = tickets
      .map((row) => {
        const product = row.product_id === null ? undefined : productCode.get(row.product_id);
        const ticket: Ticket = {
          id: row.number,
          // A ticket about a device this build cannot name still exists; the
          // first product is the least misleading stand-in for its icon.
          product: product ?? (mappedProducts[0]?.id ?? "thermostat"),
          subject: row.subject,
          status: row.status,
          // WS-I G-4: the seed's "2h ago" is a phrase, and there is no locale
          // here to phrase one in.
          updated: toTenantDay(row.updated_at, tz),
          rank: Date.parse(row.updated_at),
          msgs: messagesByTicket.get(row.id) ?? [],
          topic: row.topic,
        };
        return ticket;
      })
      .sort((a, b) => b.rank - a.rank);

    const customerOf = new Map(customers.map((c) => [c.id, c]));

    const itemsByOrder = new Map<number, OrderItem[]>();
    for (const row of items) {
      const list = itemsByOrder.get(row.order_id) ?? [];
      list.push({
        prod: (row.product_id === null ? undefined : productCode.get(row.product_id)) ??
          (mappedProducts[0]?.id ?? "thermostat"),
        name: row.title,
        qty: String(row.qty),
        price: row.unit_price,
      });
      itemsByOrder.set(row.order_id, list);
    }

    const stepsByOrder = new Map<number, OrderStep[]>();
    for (const row of [...events].sort((a, b) => a.position - b.position)) {
      const list = stepsByOrder.get(row.order_id) ?? [];
      // WS-I G-3: `order_events` records a label and never a time.
      list.push({ label: row.label, when: row.detail ?? "", st: row.state });
      stepsByOrder.set(row.order_id, list);
    }

    const mappedOrders: Order[] = orders
      .filter((row) => row.status !== "cancelled")
      .map((row) => {
        const guest = customerOf.get(row.customer_id);
        return {
          id: row.number,
          email: guest?.email ?? "",
          placed: toTenantDay(row.placed_at, tz),
          status: row.status as OrderStatus,
          carrier: row.carrier ?? "",
          tracking: row.tracking_code ?? "",
          total: row.total,
          addr: (guest?.address ?? "").split("\n").filter((line) => line.length > 0),
          items: itemsByOrder.get(row.id) ?? [],
          steps: stepsByOrder.get(row.id) ?? [],
        };
      });

    const first = agents.find((a) => a.active) ?? agents[0];

    return {
      side: config.side,
      agent: {
        name: first?.name ?? "",
        full: first?.full_name ?? "",
        initials: first?.initials ?? "",
        tint: first?.tint ?? "",
      } as Person,
      products: mappedProducts,
      categories: mappedCategories,
      articles: mappedArticles,
      bodies,
      tickets: mappedTickets,
      orders: mappedOrders,
    };
  } catch (error) {
    console.warn("[adminium] connected mode unavailable, using demo data:", error);
    return null;
  }
}

/**
 * A synchronous `DataSource` over an already-fetched snapshot.
 *
 * ── DELEGATED, AND EVERY ONE IS FICTION AGAINST A REAL DEPLOYMENT ──────────
 * `demoDataSource` is an object literal, so spreading it really does carry its
 * methods — but what it carries is the demo's forum, warranty claims, returns,
 * repair slots, firmware, downloads, status page, parts shop, bundles, gift
 * cards, plans, trade-in, smart home, energy, members, referrals, installers,
 * partner jobs, sessions, security, survey, cameras, clips, automations,
 * invoices and warranty transfer. None of those has a table. See the header:
 * this is 28-T36's re-scope written down, not a mapping that could be finished.
 */
export function snapshotSource(snap: Snapshot): DataSource {
  const productById = new Map(snap.products.map((p) => [p.id as string, p]));
  const articleById = new Map(snap.articles.map((a) => [a.id, a]));
  const orderById = new Map(snap.orders.map((o) => [o.id, o]));

  return {
    ...demoDataSource,

    /* identity */
    agent: () => snap.agent,
    // WS-I G-1: no brand column. Blank beats another company's name.
    brand: () => "",
    // WS-I G-2: nothing here knows who is reading.
    customer: (): CustomerIdentity => ({ initials: "", tint: "", email: "" }),

    /* catalogue */
    products: () => snap.products.map((p) => ({ ...p })),
    product: (id) =>
      (id === null || id === undefined ? undefined : productById.get(id)) ??
      snap.products[0] ??
      demoDataSource.product(id),

    /* knowledge base */
    categories: () => snap.categories.map((c) => ({ ...c })),
    category: (slug) => snap.categories.find((c) => c.slug === slug),
    articles: () => snap.articles.map((a) => ({ ...a })),
    article: (id) => (id ? articleById.get(id) : undefined),
    articleBody: (id) => (snap.bodies[id] ?? []).map((block) => ({ ...block })),
    articlesInCategory: (slug) => snap.articles.filter((a) => a.cat === slug),
    // The seed curates these; the schema has no "popular" column, so the first
    // few in the catalogue's own order stand in.
    popularArticles: () => snap.articles.slice(0, 4),

    /* tickets and orders — empty on a customer-side build, by construction */
    seedTickets: () => snap.tickets.map((t) => ({ ...t, msgs: t.msgs.map((m) => ({ ...m })) })),
    seedTicketOrder: () => snap.tickets.map((t) => t.id),
    orders: () => snap.orders.map((o) => ({ ...o })),
    order: (id) => orderById.get(id),
    // A return needs a delivered order to return.
    returnableOrders: () => snap.orders.filter((o) => o.status === "delivered").map((o) => o.id),
  };
}
