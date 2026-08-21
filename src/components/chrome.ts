/*
 * Constants for the global chrome.
 *
 * They live apart from the components that render them so Fast Refresh keeps
 * working — a module that exports both a component and a plain value forces a
 * full invalidate on every edit.
 *
 * i18n: every `label` / `name` below is a MESSAGE KEY, not display text. This
 * module has no hook to hold, so nothing here is translated; `<Header>`,
 * `<MobileSheet>`, `<Footer>`, `<Breadcrumbs>` and `<ShortcutsOverlay>` call
 * `t(key)` at the render site, which is also what makes the whole chrome
 * re-render the instant the locale changes. Keys carrying `{brand}` are handed
 * `{ brand: BRAND }` by the render site; the brand name is never translated.
 */

import type { MessageKey } from "../i18n";
import type { ViewId } from "../data/types";

/* ---------------------------------------------------------------- header */

export interface NavLink {
  /** Message key. */
  label: MessageKey;
  icon: string;
  view: ViewId;
  /** Views that light this item up. */
  active: ViewId[];
}

/** The four primary nav items, shared with the mobile sheet. */
export const NAV_LINKS: NavLink[] = [
  {
    label: "chrome.link.helpCenter",
    icon: "life-buoy",
    view: "home",
    active: ["home", "category", "article", "404"],
  },
  {
    label: "chrome.link.myTickets",
    icon: "ticket",
    view: "mytickets",
    active: ["mytickets", "thread"],
  },
  {
    label: "chrome.link.orders",
    icon: "package",
    view: "orders",
    active: ["orders"],
  },
  {
    label: "chrome.link.community",
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
  /** Message key. */
  label: MessageKey;
  to: FooterTarget;
}

export interface FooterColumn {
  /** Message key. */
  name: MessageKey;
  links: FooterLink[];
}

/** 8 columns; the delta added 15 more links across four of them. */
export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    name: "chrome.footer.col.support",
    links: [
      { label: "chrome.link.helpCenter", to: "home" },
      { label: "chrome.link.searchArticles", to: "kb" },
      { label: "chrome.link.savedArticles", to: "saved" },
      { label: "chrome.link.takeTour", to: "tour" },
      { label: "chrome.link.myTickets", to: "mytickets" },
      { label: "chrome.link.orderStatus", to: "orders" },
      { label: "chrome.link.openTicket", to: "openTicket" },
    ],
  },
  {
    name: "chrome.footer.col.service",
    links: [
      { label: "chrome.link.warrantyReg", to: "warranty" },
      { label: "chrome.link.warrantyClaim", to: "claim" },
      { label: "chrome.link.returns", to: "returns" },
      { label: "chrome.link.repairBooking", to: "repair" },
      { label: "chrome.link.appts", to: "appts" },
      { label: "chrome.link.installers", to: "installers" },
    ],
  },
  {
    name: "chrome.footer.col.shop",
    links: [
      { label: "chrome.link.parts", to: "parts" },
      { label: "chrome.link.tradein", to: "tradein" },
      { label: "chrome.link.bundles", to: "bundles" },
      { label: "chrome.link.gift", to: "gift" },
      { label: "chrome.link.guide", to: "guide" },
      { label: "chrome.link.wish", to: "wish" },
      { label: "chrome.link.recent", to: "recent" },
      { label: "chrome.link.stores", to: "stores" },
      { label: "chrome.link.recycle", to: "recycle" },
      { label: "chrome.link.refer", to: "refer" },
      { label: "chrome.link.board", to: "board" },
    ],
  },
  {
    name: "chrome.footer.col.yourHome",
    links: [
      { label: "chrome.link.devices", to: "devices" },
      { label: "chrome.link.live", to: "live" },
      { label: "chrome.link.share", to: "share" },
      { label: "chrome.link.auto", to: "auto" },
      { label: "chrome.link.energy", to: "energy" },
      { label: "chrome.link.members", to: "members" },
      { label: "chrome.link.notifs", to: "notifs" },
    ],
  },
  {
    name: "chrome.footer.col.account",
    links: [
      { label: "chrome.link.plans", to: "plans" },
      { label: "chrome.link.billing", to: "billing" },
      { label: "chrome.link.transfer", to: "transfer" },
      { label: "chrome.link.security", to: "security" },
      { label: "chrome.link.a11y", to: "a11y" },
      { label: "chrome.link.survey", to: "survey" },
    ],
  },
  {
    name: "chrome.footer.col.resources",
    links: [
      { label: "chrome.link.downloads", to: "downloads" },
      { label: "chrome.link.firmware", to: "firmware" },
      { label: "chrome.link.status", to: "status" },
      { label: "chrome.link.breach", to: "breach" },
      { label: "chrome.link.insurance", to: "insurance" },
      { label: "chrome.link.deleteAcct", to: "deleteacct" },
    ],
  },
  {
    name: "chrome.footer.col.community",
    links: [
      { label: "chrome.link.forum", to: "forum" },
      { label: "chrome.link.liveChat", to: "openChat" },
      { label: "chrome.link.refer", to: "refer" },
    ],
  },
  {
    /* The brand column is the brand name — never translated. */
    name: "chrome.footer.col.brand",
    links: [
      { label: "chrome.link.about", to: "about" },
      { label: "chrome.link.contact", to: "contact" },
      { label: "chrome.link.partner", to: "partner" },
      { label: "chrome.link.trade", to: "trade" },
      { label: "chrome.link.imprint", to: "imprint" },
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

/**
 * Single-label trails, as message keys. `home` is absent on purpose — Home has
 * no breadcrumb.
 */
export const CRUMB_LABELS: Partial<Record<ViewId, MessageKey>> = {
  kb: "chrome.crumb.kb",
  mytickets: "chrome.link.myTickets",
  newticket: "chrome.link.openTicket",
  orders: "chrome.link.orderStatus",
  returns: "chrome.link.returns",
  tradein: "chrome.link.tradein",
  warranty: "chrome.link.warrantyReg",
  repair: "chrome.crumb.repair",
  appts: "chrome.link.appts",
  installers: "chrome.link.installers",
  parts: "chrome.link.parts",
  bundles: "chrome.link.bundles",
  gift: "chrome.link.gift",
  plans: "chrome.crumb.plans",
  refer: "chrome.link.refer",
  downloads: "chrome.link.downloads",
  firmware: "chrome.link.firmware",
  status: "chrome.crumb.status",
  a11y: "chrome.crumb.a11y",
  security: "chrome.link.security",
  survey: "chrome.crumb.survey",
  saved: "chrome.link.savedArticles",
  tour: "chrome.crumb.tour",
  devices: "chrome.crumb.devices",
  notifs: "chrome.link.notifs",
  forum: "chrome.crumb.forum",
  about: "chrome.link.about",
  contact: "chrome.link.contact",
  imprint: "chrome.link.imprint",
  partner: "chrome.link.partner",
  overview: "chrome.crumb.overview",
  "404": "chrome.crumb.notFound",
  /* --- delta: the single-label trails --- */
  recent: "chrome.link.recent",
  stores: "chrome.link.stores",
  recycle: "chrome.link.recycle",
  insurance: "chrome.link.insurance",
  guide: "chrome.link.guide",
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
 * Delta trails with a clickable middle crumb: `[parent view, parent label key,
 * last label key]`. Rendered by `<Breadcrumbs>`.
 */
export const CRUMB_TRAILS: Partial<Record<ViewId, [ViewId, MessageKey, MessageKey]>> = {
  live: ["devices", "chrome.crumb.devices", "chrome.link.live"],
  auto: ["devices", "chrome.crumb.devices", "chrome.link.auto"],
  billing: ["plans", "chrome.crumb.plans", "chrome.link.billing"],
  transfer: ["warranty", "chrome.crumb.warranty", "chrome.crumb.transferLast"],
  wish: ["parts", "chrome.link.parts", "chrome.link.wish"],
  board: ["refer", "chrome.link.refer", "chrome.link.board"],
  breach: ["security", "chrome.link.security", "chrome.link.breach"],
  deleteacct: ["security", "chrome.link.security", "chrome.link.deleteAcct"],
  share: ["live", "chrome.link.live", "chrome.link.share"],
  trade: ["partner", "chrome.link.partner", "chrome.link.trade"],
};

/* ------------------------------------------------------------- shortcuts */

export interface ShortcutGroup {
  /** Message key. */
  name: MessageKey;
  /** `label` is a message key; `keys` are machine tokens and stay literal. */
  rows: { label: MessageKey; keys: string[] }[];
}

/** The literal `SC` table from the comp (port spec §5.5). */
export const SHORTCUT_GROUPS: ShortcutGroup[] = [
  {
    name: "chrome.sc.group.goto",
    rows: [
      { label: "chrome.sc.row.home", keys: ["g", "h"] },
      { label: "chrome.link.myTickets", keys: ["g", "t"] },
      { label: "chrome.link.orderStatus", keys: ["g", "o"] },
      { label: "chrome.crumb.status", keys: ["g", "s"] },
      { label: "chrome.crumb.forum", keys: ["g", "f"] },
      { label: "chrome.link.parts", keys: ["g", "p"] },
      { label: "chrome.link.overviewAll", keys: ["g", "a"] },
    ],
  },
  {
    name: "chrome.sc.group.do",
    rows: [
      { label: "chrome.sc.row.palette", keys: ["⌘", "K"] },
      { label: "chrome.sc.row.search", keys: ["/"] },
      { label: "chrome.cmd.newTicket", keys: ["n"] },
      { label: "chrome.link.liveChatOpen", keys: ["c"] },
      { label: "chrome.sc.row.theme", keys: ["t"] },
    ],
  },
  {
    name: "chrome.sc.group.anywhere",
    rows: [
      { label: "chrome.sc.row.list", keys: ["?"] },
      { label: "chrome.sc.row.close", keys: ["Esc"] },
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

/* ------------------------------------------------------------- messages */

/**
 * Splits a translated string on its `{slot}` markers, keeping the markers as
 * their own entries: `"{brand} Help"` → `["{brand}", " Help"]`.
 *
 * This is how a sentence that carries an inline element — a styled wordmark, a
 * `<kbd>`, a link the reader can press — survives translation with its word
 * order intact. The translator moves the marker; the render site only decides
 * what each marker becomes.
 */
export function slots(text: string): string[] {
  return text.split(/(\{\w+\})/g).filter((part) => part !== "");
}
