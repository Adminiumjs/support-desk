-- Support Desk — PostgreSQL schema (§10.4 contract).
--
-- This is the real database that backs the full self-host stack: the help desk
-- portal reads it (through Adminium's records API) and the auto-generated
-- Adminium admin dashboard is the agent desk that works it. Applied
-- automatically on first boot of the `desk-db` container via
-- /docker-entrypoint-initdb.d/01-schema.sql, then seeded by 02-seed.sql. The
-- seed mirrors src/data/demo.ts one-for-one (same products, KB categories and
-- articles, tickets, messages, and orders) so the portal and the dashboard show
-- the same desk.
--
-- Money is stored as numeric(10, 2); the demo desk trades in GBP.

DROP TABLE IF EXISTS order_events CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS ticket_messages CASCADE;
DROP TABLE IF EXISTS tickets CASCADE;
DROP TABLE IF EXISTS kb_articles CASCADE;
DROP TABLE IF EXISTS kb_categories CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS agents CASCADE;

-- People --------------------------------------------------------------------

-- Support agents. `initials` and `tint` drive the avatar the portal renders for
-- an agent reply when `avatar_url` is empty, so both are required.
CREATE TABLE agents (
  id         serial PRIMARY KEY,
  name       text NOT NULL,
  full_name  text NOT NULL,
  email      text NOT NULL UNIQUE,
  initials   text NOT NULL CHECK (char_length(initials) BETWEEN 1 AND 3),
  tint       text NOT NULL CHECK (tint ~ '^#[0-9a-f]{6}$'),
  avatar_url text,
  active     boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Customers. v1 has no customer accounts: the portal looks a person up by email
-- plus a ticket or order number, so a ticket may exist without a customer row.
CREATE TABLE customers (
  id         serial PRIMARY KEY,
  name       text NOT NULL,
  email      text NOT NULL UNIQUE,
  initials   text NOT NULL CHECK (char_length(initials) BETWEEN 1 AND 3),
  tint       text NOT NULL CHECK (tint ~ '^#[0-9a-f]{6}$'),
  address    text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Catalog -------------------------------------------------------------------

-- The device line a ticket, article, or order line can point at. `code` is the
-- stable slug the frontend uses ('thermostat'); `icon` is a Lucide icon name.
CREATE TABLE products (
  id    serial PRIMARY KEY,
  code  text NOT NULL UNIQUE,
  name  text NOT NULL,
  model text NOT NULL,
  icon  text NOT NULL,
  tint  text NOT NULL CHECK (tint ~ '^#[0-9a-f]{6}$')
);

-- Knowledge base ------------------------------------------------------------

-- KB categories. `position` fixes the order of the help-center category grid.
CREATE TABLE kb_categories (
  id       serial PRIMARY KEY,
  slug     text NOT NULL UNIQUE,
  name     text NOT NULL,
  icon     text NOT NULL,
  tint     text NOT NULL CHECK (tint ~ '^#[0-9a-f]{6}$'),
  blurb    text NOT NULL,
  position integer NOT NULL DEFAULT 0
);

-- KB articles. `body` is the block DSL the portal renders: a JSON array of
-- { "t": "p"|"h"|"ul"|"ol"|"tip"|"warn", "x": string | string[] } objects.
CREATE TABLE kb_articles (
  id           serial PRIMARY KEY,
  slug         text NOT NULL UNIQUE,
  category_id  integer NOT NULL REFERENCES kb_categories (id) ON DELETE RESTRICT,
  title        text NOT NULL,
  snippet      text NOT NULL,
  read_minutes integer NOT NULL CHECK (read_minutes > 0),
  body         jsonb NOT NULL CHECK (jsonb_typeof(body) = 'array'),
  published    boolean NOT NULL DEFAULT true,
  position     integer NOT NULL DEFAULT 0,
  updated_at   timestamptz NOT NULL DEFAULT now()
);

-- Tickets -------------------------------------------------------------------

-- The support queue. `number` carries the desk's ticket prefix (HH-3117) and is
-- the public handle a customer quotes; `customer_id` is optional because a
-- ticket can be opened by anyone with an email address.
-- `first_response_minutes` is minutes from `created_at` to the first agent
-- message, denormalised so the dashboard can chart it without a window query;
-- it is null until an agent has replied.
CREATE TABLE tickets (
  id              serial PRIMARY KEY,
  number          text NOT NULL UNIQUE,
  requester_name  text NOT NULL,
  requester_email text NOT NULL,
  customer_id     integer REFERENCES customers (id) ON DELETE SET NULL,
  product_id      integer REFERENCES products (id) ON DELETE SET NULL,
  topic           text NOT NULL
                  CHECK (topic IN ('setup', 'connectivity', 'device', 'account', 'shipping')),
  subject         text NOT NULL,
  status          text NOT NULL DEFAULT 'open'
                  CHECK (status IN ('open', 'pending', 'solved', 'closed')),
  priority        text NOT NULL DEFAULT 'normal'
                  CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  assignee_id     integer REFERENCES agents (id) ON DELETE SET NULL,
  first_response_minutes integer CHECK (first_response_minutes >= 0),
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  CHECK (updated_at >= created_at)
);

-- One turn in a ticket thread. An agent message must name its agent and a
-- customer message must not, which the paired CHECK enforces.
CREATE TABLE ticket_messages (
  id         serial PRIMARY KEY,
  ticket_id  integer NOT NULL REFERENCES tickets (id) ON DELETE CASCADE,
  author     text NOT NULL CHECK (author IN ('customer', 'agent')),
  agent_id   integer REFERENCES agents (id) ON DELETE SET NULL,
  body       text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK ((author = 'agent') = (agent_id IS NOT NULL))
);

-- Orders --------------------------------------------------------------------

-- Orders exist so the portal's order-status lookup and the shipping/returns
-- tickets have something real to resolve against. `tracking_code` is null until
-- a carrier assigns one.
CREATE TABLE orders (
  id            serial PRIMARY KEY,
  number        text NOT NULL UNIQUE,
  customer_id   integer NOT NULL REFERENCES customers (id) ON DELETE RESTRICT,
  status        text NOT NULL DEFAULT 'packing'
                CHECK (status IN ('packing', 'transit', 'delivered', 'cancelled')),
  carrier       text,
  tracking_code text,
  total         numeric(10, 2) NOT NULL CHECK (total >= 0),
  placed_at     timestamptz NOT NULL DEFAULT now()
);

-- Order line items. `title` is the line as printed on the order (it can name a
-- pack or an accessory); the line total is qty × unit_price.
CREATE TABLE order_items (
  id         serial PRIMARY KEY,
  order_id   integer NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
  product_id integer REFERENCES products (id) ON DELETE SET NULL,
  title      text NOT NULL,
  qty        integer NOT NULL CHECK (qty > 0),
  unit_price numeric(10, 2) NOT NULL CHECK (unit_price >= 0)
);

-- The fulfilment timeline shown on the order-status view. Exactly one event per
-- position, ordered by `position`; `detail` is free text ("18 Jul, 09:14",
-- "Expected Tue 28 Jul") and is null for a step that has not happened yet.
CREATE TABLE order_events (
  id       serial PRIMARY KEY,
  order_id integer NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
  label    text NOT NULL,
  detail   text,
  state    text NOT NULL DEFAULT 'todo'
           CHECK (state IN ('done', 'current', 'todo')),
  position integer NOT NULL,
  UNIQUE (order_id, position)
);

-- Indexes -------------------------------------------------------------------

CREATE INDEX idx_kb_articles_category  ON kb_articles (category_id);
CREATE INDEX idx_kb_articles_published ON kb_articles (published);
CREATE INDEX idx_tickets_status        ON tickets (status);
CREATE INDEX idx_tickets_assignee      ON tickets (assignee_id);
CREATE INDEX idx_tickets_updated       ON tickets (updated_at DESC);
CREATE INDEX idx_tickets_requester     ON tickets (requester_email);
CREATE INDEX idx_ticket_messages_ticket ON ticket_messages (ticket_id, created_at);
CREATE INDEX idx_orders_customer       ON orders (customer_id);
CREATE INDEX idx_orders_status         ON orders (status);
CREATE INDEX idx_order_items_order     ON order_items (order_id);
CREATE INDEX idx_order_events_order    ON order_events (order_id, position);
