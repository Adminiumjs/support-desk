/*
 * Constants for the global chrome.
 *
 * They live apart from the components that render them so Fast Refresh keeps
 * working — a module that exports both a component and a plain value forces a
 * full invalidate on every edit.
 */

import { BRAND } from "../data/demo";
import type { ViewId } from "../data/types";

/* ---------------------------------------------------------------- header */

export interface NavLink {
  label: string;
  icon: string;
  view: ViewId;
  /** Views that light this item up. */
  active: ViewId[];
}

/** The four primary nav items, shared with the mobile sheet. */
export const NAV_LINKS: NavLink[] = [
  {
    label: "Help center",
    icon: "life-buoy",
    view: "home",
    active: ["home", "category", "article", "404"],
  },
  {
    label: "My tickets",
    icon: "ticket",
    view: "mytickets",
    active: ["mytickets", "thread"],
  },
  { label: "Orders", icon: "package", view: "orders", active: ["orders"] },
  {
    label: "Community",
    icon: "messages-square",
    view: "forum",
    active: ["forum"],
  },
];

/* ---------------------------------------------------------------- footer */

export type FooterTarget =
  | ViewId
  | "openTicket"
  | "openChat"
  | "returnsArticle";

export interface FooterLink {
  label: string;
  to: FooterTarget;
}

export interface FooterColumn {
  name: string;
  links: FooterLink[];
}

/** 8 columns; the delta added 15 more links across four of them. */
export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    name: "Support",
    links: [
      { label: "Help center", to: "home" },
      { label: "Search articles", to: "kb" },
      { label: "Saved articles", to: "saved" },
      { label: "Take the tour", to: "tour" },
      { label: "My tickets", to: "mytickets" },
      { label: "Order status", to: "orders" },
      { label: "Open a ticket", to: "openTicket" },
    ],
  },
  {
    name: "Service",
    links: [
      { label: "Warranty registration", to: "warranty" },
      { label: "Warranty claim", to: "claim" },
      { label: "Returns", to: "returns" },
      { label: "Repair booking", to: "repair" },
      { label: "Service appointments", to: "appts" },
      { label: "Installer finder", to: "installers" },
    ],
  },
  {
    name: "Shop",
    links: [
      { label: "Spare parts", to: "parts" },
      { label: "Trade-in valuation", to: "tradein" },
      { label: "Bundle deals", to: "bundles" },
      { label: "Gift cards", to: "gift" },
      { label: "Gift guide", to: "guide" },
      { label: "Wishlist", to: "wish" },
      { label: "Recently viewed", to: "recent" },
      { label: "Find a store", to: "stores" },
      { label: "Recycling drop-off", to: "recycle" },
      { label: "Refer a friend", to: "refer" },
      { label: "Leaderboard", to: "board" },
    ],
  },
  {
    name: "Your home",
    links: [
      { label: "Device dashboard", to: "devices" },
      { label: "Live view & clips", to: "live" },
      { label: "Shared clips", to: "share" },
      { label: "Automations", to: "auto" },
      { label: "Energy insights", to: "energy" },
      { label: "Household members", to: "members" },
      { label: "Notifications", to: "notifs" },
    ],
  },
  {
    name: "Account",
    links: [
      { label: "Subscription plans", to: "plans" },
      { label: "Billing & invoices", to: "billing" },
      { label: "Warranty transfer", to: "transfer" },
      { label: "Security & privacy", to: "security" },
      { label: "Accessibility settings", to: "a11y" },
      { label: "Give feedback", to: "survey" },
    ],
  },
  {
    name: "Resources",
    links: [
      { label: "Downloads & manuals", to: "downloads" },
      { label: "Firmware release notes", to: "firmware" },
      { label: "Service & system status", to: "status" },
      { label: "Security notice", to: "breach" },
      { label: "Insurance claims", to: "insurance" },
      { label: "Delete account", to: "deleteacct" },
    ],
  },
  {
    name: "Community",
    links: [
      { label: "Forum", to: "forum" },
      { label: "Live chat", to: "openChat" },
      { label: "Refer a friend", to: "refer" },
    ],
  },
  {
    name: BRAND,
    links: [
      { label: "About us", to: "about" },
      { label: "Contact us", to: "contact" },
      { label: "Partner portal", to: "partner" },
      { label: "Trade account", to: "trade" },
      { label: "Imprint", to: "imprint" },
    ],
  },
];

/* ----------------------------------------------------------- breadcrumbs */

/** Content max-width per view, in px. Default 820. */
export const CRUMB_W: Partial<Record<ViewId, number>> = {
  category: 1120,
  forum: 1120,
  overview: 1120,
  about: 1000,
  plans: 1000,
  bundles: 1000,
  devices: 1000,
  partner: 1000,
  guide: 1000,
  contact: 900,
  downloads: 900,
  installers: 900,
  parts: 900,
  a11y: 900,
  gift: 900,
  energy: 900,
  live: 900,
  auto: 900,
  billing: 900,
  wish: 900,
  stores: 900,
  recycle: 900,
  trade: 900,
  share: 900,
  imprint: 760,
  returns: 760,
  survey: 760,
  deleteacct: 760,
  breach: 760,
  newticket: 720,
  tour: 720,
  "404": 620,
  /* `recent`, `board`, `insurance` and `transfer` fall to the 820 default. */
};

/** Single-label trails. `home` is absent on purpose — Home has no breadcrumb. */
export const CRUMB_LABELS: Partial<Record<ViewId, string>> = {
  kb: "Search",
  mytickets: "My tickets",
  newticket: "Open a ticket",
  orders: "Order status",
  returns: "Returns",
  tradein: "Trade-in valuation",
  warranty: "Warranty registration",
  repair: "Book a repair",
  appts: "Service appointments",
  installers: "Installer finder",
  parts: "Spare parts",
  bundles: "Bundle deals",
  gift: "Gift cards",
  plans: `${BRAND} Care plans`,
  refer: "Refer a friend",
  downloads: "Downloads & manuals",
  firmware: "Firmware release notes",
  status: "Service status",
  a11y: "Accessibility",
  security: "Security & privacy",
  survey: "Feedback",
  saved: "Saved articles",
  tour: "Getting started",
  devices: "Devices",
  notifs: "Notifications",
  forum: "Community forum",
  about: "About us",
  contact: "Contact us",
  imprint: "Imprint",
  partner: "Partner portal",
  overview: "All screens",
  "404": "Page not found",
  /* --- delta: the single-label trails --- */
  recent: "Recently viewed",
  stores: "Find a store",
  recycle: "Recycling drop-off",
  insurance: "Insurance claims",
  guide: "Gift guide",
};

/**
 * The width utility classes for a view's `<main>`: `w-900`, `w-1000 fx-wide`…
 *
 * Ruling R5: the 1800 → 1440 ultra-wide bump exists once, in CSS. Columns of
 * 1000px and wider opt in via `.fx-wide`; narrower ones never stretch. Use
 * this rather than an inline `maxWidth`, which would beat the media query.
 */
export function columnClass(view: ViewId): string {
  const w = CRUMB_W[view] ?? 820;
  return w >= 1000 ? `w-${w} fx-wide` : `w-${w}`;
}

/**
 * Delta trails with a clickable middle crumb: `[parent view, parent label,
 * last label]`. Rendered by `<Breadcrumbs>`.
 */
export const CRUMB_TRAILS: Partial<Record<ViewId, [ViewId, string, string]>> = {
  live: ["devices", "Devices", "Live view & clips"],
  auto: ["devices", "Devices", "Automations"],
  billing: ["plans", `${BRAND} Care plans`, "Billing & invoices"],
  transfer: ["warranty", "Warranty", "Transfer a warranty"],
  wish: ["parts", "Spare parts", "Wishlist"],
  board: ["refer", "Refer a friend", "Leaderboard"],
  breach: ["security", "Security & privacy", "Security notice"],
  deleteacct: ["security", "Security & privacy", "Delete account"],
  share: ["live", "Live view & clips", "Shared clips"],
  trade: ["partner", "Partner portal", "Trade account"],
};

/* ------------------------------------------------------------- shortcuts */

export interface ShortcutGroup {
  name: string;
  rows: { label: string; keys: string[] }[];
}

/** The literal `SC` table from the comp (port spec §5.5). */
export const SHORTCUT_GROUPS: ShortcutGroup[] = [
  {
    name: "Go to",
    rows: [
      { label: "Help center home", keys: ["g", "h"] },
      { label: "My tickets", keys: ["g", "t"] },
      { label: "Order status", keys: ["g", "o"] },
      { label: "Service status", keys: ["g", "s"] },
      { label: "Community forum", keys: ["g", "f"] },
      { label: "Spare parts", keys: ["g", "p"] },
      { label: "All screens overview", keys: ["g", "a"] },
    ],
  },
  {
    name: "Do",
    rows: [
      { label: "Open the command palette", keys: ["⌘", "K"] },
      { label: "Focus search", keys: ["/"] },
      { label: "Open a new ticket", keys: ["n"] },
      { label: "Open live chat", keys: ["c"] },
      { label: "Switch light / dark", keys: ["t"] },
    ],
  },
  {
    name: "Anywhere",
    rows: [
      { label: "Show this list", keys: ["?"] },
      { label: "Close panel, menu or chat", keys: ["Esc"] },
    ],
  },
];

/**
 * The `g` chord map. `g d`, `g p` and `g r` are real but undocumented in the
 * overlay — the comp had them and they are kept.
 */
export const CHORD_MAP: Record<string, ViewId> = {
  h: "home",
  t: "mytickets",
  o: "orders",
  s: "status",
  a: "overview",
  f: "forum",
  d: "downloads",
  p: "parts",
  r: "repair",
};
