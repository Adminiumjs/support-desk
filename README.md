# Support Desk

A complete, production-shaped customer-support help desk — built with Vite +
React + TypeScript, no CSS framework, no backend required. It's the example app
that ships with [Adminium](https://adminium.dev): search a knowledge base, walk
a guided troubleshooter, open and track tickets, chat with support, and browse a
community forum — all from built-in demo data.

The demo is dressed as **Hearth**, a fictional smart-home maker (thermostats,
doorbells, plugs, sensors), so the articles, tickets, and warranty flows read
like a real product's support site rather than lorem ipsum.

**Live demo → [adminium.dev/demo/support-desk](https://adminium.dev/demo/support-desk)**

## Highlights

- **State-based routing** (no router) — a single `view` value drives all 39
  screens: home and search, the article reader, ticket list and detail, the
  new-ticket flow, live chat, guided troubleshooters, the returns wizard,
  warranty and order lookup, the community forum, account and accessibility
  settings, status, contact, and the rest.
- **Real support logic** — full-text-ish article search with topic chips,
  ticket state machine with a timeline, SLA badges, canned-reply composition,
  and a returns wizard that branches on reason.
- **Light / dark themes** via CSS custom properties, persisted to
  `localStorage`.
- **Accessibility as a feature, not a footnote** — three shipped override
  palettes (high-contrast, deuteranopia, monochrome) layered on top of the
  canonical design tokens, plus a reduce-motion setting backed by
  `prefers-reduced-motion`, focus traps on every overlay, and `aria-live`
  announcements.
- **Simulated, not fake-real** — the chat agent's replies are deterministic
  (chosen by topic from a rotating pool, never random) and the UI says so:
  every simulated surface carries a "Replies in this demo are simulated"
  label. Nothing is ever sent to a human.

## Local development

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default http://localhost:5173).

## Deploy

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Adminiumjs/support-desk&project-name=support-desk&repository-name=support-desk)
&nbsp;
[![Deploy to DigitalOcean](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/Adminiumjs/support-desk/tree/main)

- **Vercel** — click the button above, or import the repo. Build command
  `npm run build`, output `dist`.
- **DigitalOcean App Platform** — click the button above, or use the included
  [`.do/deploy.template.yaml`](.do/deploy.template.yaml).
- **Host anywhere** — `npm run build` produces a fully static `dist/` you can
  drop on any static host (Netlify, Cloudflare Pages, S3, GitHub Pages…). Or
  build the container:

  ```bash
  docker build -t support-desk .
  docker run -p 8080:80 support-desk
  ```

### Build scripts

| Script               | What it does                                                    |
| -------------------- | --------------------------------------------------------------- |
| `npm run dev`        | Start the Vite dev server.                                      |
| `npm run build`      | Type-check + build to `dist/` at base `/` (root deploys).       |
| `npm run build:demo` | Build to `dist/` at base `/demo/support-desk/` (Adminium demo). |
| `npm run preview`    | Preview a production build locally.                             |

## Full implementation (self-host)

There are two tiers to running this desk.

**Tier 1 — the frontend, one click.** The Vercel / DigitalOcean buttons above
deploy the help desk on its own, running on the bundled demo data. No database,
no admin — a fully static preview.

**Tier 2 — the whole stack, one command.** [`docker-compose.yml`](docker-compose.yml)
stands up Postgres (seeded with the *same* tickets, articles, and agents), an
auto-generated Adminium admin dashboard that works those tickets on that real
database, and the customer-facing desk:

```bash
cp .env.example .env      # then set ADMINIUM_SECRET — e.g. openssl rand -hex 32
docker compose up
```

- **Help desk** → http://localhost:8080
- **Adminium admin dashboard** → http://localhost:4600

On first boot, `desk-db` applies `db/schema.sql` then `db/seed.sql`, and
Adminium imports the help-desk database as its first source connection,
introspects the schema, and generates the agent-side dashboard. Finish the
~1-minute first-run wizard at `:4600` — it's pre-pointed at the seeded desk DB.
The public desk and the dashboard are the **same desk**: a ticket a customer
opens on `:8080` is the ticket an agent answers on `:4600`. The install spec
Adminium reads to configure itself is `manifest.json`.

## Connecting to Adminium

All data access goes through a thin `DataSource` interface
([`src/data/source.ts`](src/data/source.ts)) with a single `demoSource`
implementation backed by the bundled demo data. **Today the deployed demo is
demo data only — nothing is persisted and no ticket reaches a person.** Once
Adminium's browser-safe **publishable key** (`adm_pub_…`) ships, the frontend
will read and write **live** data — your real tickets, articles, and agents from
the database above — through the Adminium records API via a second `DataSource`
implementation, without touching any of the screens or the store. The seam is
already in place; the key is the only missing piece.

## Project structure

```
src/
  app/         App shell + view switch
  state/       Zustand store (tickets, search, chat, theme, a11y settings)
  data/        demo data, types, DataSource seam
  lib/         search, formatting, SLA, the injectable delay helper
  screens/     the 39 views — home, article, tickets, chat, wizards, forum, …
  components/  header, footer, command palette, modal, toast, mobile sheet, …
  styles/      tokens.css (design tokens + accent) + base.css (fonts, a11y layers)
public/fonts/  self-hosted Manrope + JetBrains Mono (woff2)
```

## License

[AGPL-3.0](LICENSE) © 2026 Support Desk. A demo shipped with Adminium.
