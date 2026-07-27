/*
 * Domain types for the Support Desk demo.
 *
 * Ported from the Hearth Help Desk comp (port spec §7). Every collection the
 * screens read is typed here; the seeded values live in `./demo.ts` and are
 * reached through the DataSource seam in `./source.ts`.
 *
 * Naming note: the fictional smart-home company is "Hearth"; every ticket
 * and order code carries the "HH-" prefix.
 */

/* ------------------------------------------------------------------ views */

/** The 39 real screens. `view` in the store is one of these — no router. */
export type ViewId =
  | "home"
  | "category"
  | "article"
  | "newticket"
  | "mytickets"
  | "thread"
  | "404"
  | "orders"
  | "forum"
  | "about"
  | "contact"
  | "imprint"
  | "warranty"
  | "claim"
  | "returns"
  | "appts"
  | "firmware"
  | "repair"
  | "refer"
  | "downloads"
  | "status"
  | "devices"
  | "energy"
  | "saved"
  | "tour"
  | "bundles"
  | "members"
  | "notifs"
  | "partner"
  | "gift"
  | "plans"
  | "security"
  | "survey"
  | "overview"
  | "kb"
  | "tradein"
  | "installers"
  | "parts"
  | "a11y";

/** `chat` is a pseudo-screen: a global overlay listed in the overview grid. */
export type OverviewId = ViewId | "chat";

export type ThemeName = "light" | "dark";

/** Kebab-case lucide icon name, e.g. `life-buoy`. */
export type IconName = string;

/** Literal hex tint carried on data records; feeds the placeholder art. */
export type Tint = string;

/* --------------------------------------------------------------- products */

export type ProductId = "thermostat" | "doorbell" | "plug" | "sensor";

export interface Product {
  id: ProductId;
  /** Short name, e.g. "Video Doorbell". */
  name: string;
  /** Full model name, e.g. "Hearth Doorbell". */
  model: string;
  icon: IconName;
  tint: Tint;
}

/* ------------------------------------------------------- knowledge base */

export type CategorySlug =
  | "setup"
  | "connect"
  | "devices"
  | "account"
  | "shipping";

export interface Category {
  slug: CategorySlug;
  name: string;
  icon: IconName;
  tint: Tint;
  blurb: string;
}

export interface Article {
  id: string;
  cat: CategorySlug;
  title: string;
  /** Estimated read time in minutes. */
  read: number;
  snippet: string;
}

/** One block of an article body. `ul` / `ol` carry a string[]; the rest a string. */
export type BodyBlock =
  | { t: "p"; x: string }
  | { t: "h"; x: string }
  | { t: "ul"; x: string[] }
  | { t: "ol"; x: string[] }
  | { t: "tip"; x: string }
  | { t: "warn"; x: string };

export type ArticleBodies = Record<string, BodyBlock[]>;

/* --------------------------------------------------------------- tickets */

/** The complete status vocabulary. There are exactly four. */
export type TicketStatus = "open" | "pending" | "solved" | "closed";

export type MessageAuthor = "customer" | "agent";

export interface TicketMessage {
  who: MessageAuthor;
  text: string;
  time: string;
}

export interface Ticket {
  id: string;
  product: ProductId;
  subject: string;
  status: TicketStatus;
  /** Human-readable relative stamp, e.g. "2h ago" / "Just now". */
  updated: string;
  /** Sort key — higher is more recent activity. */
  rank: number;
  msgs: TicketMessage[];
  /** Topic chosen on the new-ticket form; "" for seeded tickets. */
  topic?: string;
}

export interface StatusMeta {
  label: string;
  /** CSS custom property name including the leading `--`. */
  fg: string;
  soft: string;
  icon: IconName;
}

/* ---------------------------------------------------------------- orders */

export type OrderStatus = "transit" | "delivered" | "packing";

export type StepState = "done" | "current" | "todo";

export interface OrderStep {
  label: string;
  when: string;
  st: StepState;
}

export interface OrderItem {
  prod: ProductId;
  name: string;
  qty: string;
  price: string;
}

export interface Order {
  id: string;
  email: string;
  placed: string;
  status: OrderStatus;
  carrier: string;
  tracking: string;
  total: string;
  addr: string[];
  items: OrderItem[];
  steps: OrderStep[];
}

/* ----------------------------------------------------------------- forum */

export interface ForumCategory {
  id: string;
  name: string;
}

export interface ForumThread {
  id: string;
  cat: string;
  pinned: boolean;
  staff: boolean;
  solved: boolean;
  title: string;
  author: string;
  initials: string;
  tint: Tint;
  time: string;
  replies: number;
  views: string;
  first: string;
  answerBy: string | null;
  answer: string | null;
}

export interface Contributor {
  name: string;
  initials: string;
  tint: Tint;
  posts: number;
  icon: IconName;
}

/* -------------------------------------------------------------- warranty */

export interface RegisteredDevice {
  id: string;
  prod: ProductId;
  serial: string;
  purchased: string;
  expires: string;
  /** Human phrase, e.g. "2y 10m left". */
  left: string;
  /** Remaining-cover percentage, 0–100. */
  pct: number;
}

export interface ClaimOutcome {
  id: string;
  label: string;
  icon: IconName;
  note: string;
}

/* --------------------------------------------------------------- returns */

export interface ReturnMethod {
  id: string;
  label: string;
  icon: IconName;
  note: string;
  /** The confirmation line shown on step 3. */
  done: string;
}

/* ---------------------------------------------------------------- repair */

export interface RepairType {
  id: string;
  label: string;
  icon: IconName;
  note: string;
}

export interface RepairDate {
  id: string;
  dow: string;
  day: string;
}

export interface RepairSlot {
  label: string;
  taken: boolean;
}

/* ---------------------------------------------------------- appointments */

export type ApptStatus = "confirmed" | "awaiting" | "completed";

export interface Appointment {
  id: string;
  kind: string;
  prod: ProductId;
  when: string;
  where: string;
  status: ApptStatus;
  engineer: string | null;
  engInitials?: string;
  engTint?: Tint;
  engRole?: string;
  past: boolean;
}

/* -------------------------------------------------------------- firmware */

export type FirmwareType = "Stability" | "Feature" | "Security";

export interface FirmwareNote {
  icon: IconName;
  text: string;
}

export interface FirmwareRelease {
  ver: string;
  date: string;
  type: FirmwareType;
  rolling: boolean;
  devices: ProductId[];
  notes: FirmwareNote[];
}

/* ------------------------------------------------------------- downloads */

export type DownloadKind = "manual" | "firmware" | "safety" | "installer";

export interface DownloadFile {
  name: string;
  file: string;
  size: string;
  kind: DownloadKind;
  icon: IconName;
  ver: string;
}

export interface DownloadCategory {
  id: string;
  name: string;
  icon: IconName;
}

/* ---------------------------------------------------------------- status */

export type ComponentHealth = "ok" | "degraded" | "down";

export interface StatusComponent {
  name: string;
  note: string;
  st: ComponentHealth;
  uptime: string;
}

export interface StatusUpdate {
  label: string;
  time: string;
  st: StepState;
  text: string;
}

export interface StatusIncident {
  title: string;
  date: string;
  dur: string;
  text: string;
}

/* ------------------------------------------------------------- referrals */

export type ReferralState = "joined" | "invited";

export interface Referral {
  name: string;
  initials: string;
  tint: Tint;
  when: string;
  st: ReferralState;
  reward: string;
}

/* --------------------------------------------------------------- tradein */

export interface TradeInCondition {
  id: string;
  label: string;
  note: string;
  /** Multiplier applied to the base value. */
  f: number;
}

export interface TradeInAge {
  value: string;
  label: string;
  f: number;
}

/* ------------------------------------------------------------ installers */

export interface InstallerSkill {
  label: string;
  icon: IconName;
}

export interface Installer {
  name: string;
  initials: string;
  tint: Tint;
  area: string;
  /** e.g. "1.2 mi" — parsed with parseFloat for the radius filter. */
  distance: string;
  rating: number;
  reviews: number;
  verified: boolean;
  next: string;
  skills: InstallerSkill[];
}

/* ----------------------------------------------------------- spare parts */

export type PartStock = "in" | "low" | "out";

export interface Part {
  sku: string;
  name: string;
  price: number;
  stock: PartStock;
  fits: ProductId[];
  icon: IconName;
  cat: string;
}

export interface PartCategory {
  id: string;
  name: string;
}

/* --------------------------------------------------------------- devices */

export type DeviceHealth = "ok" | "low" | "off";

export interface DeviceStat {
  icon: IconName;
  value: string;
  label: string;
}

export interface Device {
  id: string;
  prod: ProductId;
  name: string;
  room: string;
  st: DeviceHealth;
  stats: DeviceStat[];
  last: string;
  toggle: string;
  on: boolean;
}

/* ---------------------------------------------------------------- energy */

export type EnergyPeriod = "week" | "month" | "year";

/** `[label, value]`. */
export type EnergyBar = [string, number];

/** `[value, label, icon, delta, deltaIcon]`. */
export type EnergyKpi = [string, string, IconName, string, IconName];

export interface EnergyPeriodData {
  title: string;
  bars: EnergyBar[];
  kpis: EnergyKpi[];
}

export type EnergyData = Record<EnergyPeriod, EnergyPeriodData>;

/** `[room, percentage]`. */
export type EnergyRoom = [string, number];

export interface EnergyTip {
  icon: IconName;
  text: string;
  saving: string;
}

/* ------------------------------------------------------------------ tour */

export interface TourStep {
  eyebrow: string;
  title: string;
  icon: IconName;
  file: string;
  tint: Tint;
  body: string;
  points: string[];
}

/* --------------------------------------------------------------- bundles */

export interface BundleItem {
  prod: ProductId;
  name: string;
  qty: string;
}

export interface Bundle {
  id: string;
  name: string;
  save: string;
  now: number;
  was: number;
  blurb: string;
  items: BundleItem[];
}

/* --------------------------------------------------------------- members */

export type MemberRole = "owner" | "adult" | "guest";

/** `[label, icon]`. */
export type MemberPerm = [string, IconName];

export interface Member {
  id: string;
  name: string;
  initials: string;
  tint: Tint;
  role: MemberRole;
  meta: string;
  perms: MemberPerm[];
}

/* --------------------------------------------------------- notifications */

export type NotifCat = "device" | "ticket" | "order" | "system";

export interface Notification {
  id: string;
  day: string;
  cat: NotifCat;
  icon: IconName;
  title: string;
  text: string;
  time: string;
  unread: boolean;
}

export interface NotifCategory {
  id: string;
  name: string;
  icon: IconName;
}

/* --------------------------------------------------------------- partner */

export type PartnerPay = "warranty" | "customer";

export interface PartnerJob {
  id: string;
  prod: ProductId;
  title: string;
  detail: string;
  meta: string;
  fee: string;
  pay: PartnerPay;
}

/** `[label, icon]`. */
export type PartnerLink = [string, IconName];

/* ------------------------------------------------------------ gift cards */

export interface GiftDesign {
  id: string;
  name: string;
  icon: IconName;
  tint: Tint;
}

export type GiftWhen = "now" | "tomorrow" | "date";

/* ------------------------------------------------------------------ plans */

export type PlanId = "free" | "plus" | "family";

export type PlanCycle = "monthly" | "annual";

/** `[icon, text, positive]` — a `false` positive renders a `minus` icon. */
export type PlanFeature = [IconName, string, boolean];

export interface Plan {
  id: PlanId;
  name: string;
  mo: number;
  popular: boolean;
  blurb: string;
  features: PlanFeature[];
}

/* -------------------------------------------------------------- security */

export interface Session {
  id: string;
  device: string;
  icon: IconName;
  where: string;
  when: string;
  current: boolean;
}

export interface SecurityToggle {
  id: string;
  label: string;
  note: string;
  /** Recommended — the badge shows when `rec && !on`. */
  rec: boolean;
}

export type SecurityRetention = "7" | "30" | "90" | "off";

export interface RetentionOption {
  id: SecurityRetention;
  label: string;
}

/* ---------------------------------------------------------------- survey */

export interface SurveyRow {
  id: string;
  label: string;
}

export interface SurveyScalePoint {
  v: number;
  icon: IconName;
  title: string;
}

/* ------------------------------------------------------------------ chat */

export type ChatAuthor = "bot" | "you";

export interface ChatMessage {
  id: number;
  who: ChatAuthor;
  text: string;
  /** Optional inline action, e.g. `escalate`, `orders`, `article:a_return`. */
  act?: string;
  actLabel?: string;
  actIcon?: IconName;
}

export interface ChatQuickReply {
  label: string;
  reply: string;
  act: string;
  actLabel: string;
  actIcon: IconName;
}

/* -------------------------------------------------------------- overview */

/** `[id, name, icon, blurb]`. */
export type OverviewItem = [OverviewId, string, IconName, string];

export interface OverviewGroup {
  name: string;
  items: OverviewItem[];
}

/* --------------------------------------------------------- accessibility */

export type A11yPalette = "default" | "deuter" | "mono";

export type A11yToggleId =
  | "contrast"
  | "motion"
  | "captions"
  | "chime"
  | "labels";

export interface A11yToggle {
  id: A11yToggleId;
  label: string;
  note: string;
}

export interface A11ySize {
  label: string;
  scale: number;
}

export interface A11yPaletteOption {
  id: A11yPalette;
  name: string;
}

export type A11yFlags = Record<A11yToggleId, boolean>;

export interface A11ySettings {
  size: number;
  palette: A11yPalette;
  on: A11yFlags;
}

/* ----------------------------------------------------------------- misc */

export type ToastKind = "ok" | "warn" | "info";

export interface ToastMessage {
  msg: string;
  kind: ToastKind;
}

export interface Person {
  name: string;
  full: string;
  initials: string;
  tint: Tint;
}

export interface CustomerIdentity {
  initials: string;
  tint: Tint;
  email: string;
}

export interface NewTicketForm {
  product: ProductId | null;
  topic: string;
  subject: string;
  desc: string;
  attachments: string[];
}

export type FormErrors = Record<string, string>;

/** A command-palette row, built from screens + actions + articles. */
export interface Command {
  id: string;
  label: string;
  icon: IconName;
  group: string;
  hint: string;
  /** Extra keywords folded into tier-3 matching. */
  words: string;
  run: () => void;
}
