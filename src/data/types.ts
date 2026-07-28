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

/** The 54 real screens. `view` in the store is one of these — no router. */
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
  | "a11y"
  /* --- the fifteen views added by the revised comp --- */
  | "live"
  | "auto"
  | "billing"
  | "transfer"
  | "wish"
  | "recent"
  | "stores"
  | "board"
  | "breach"
  | "recycle"
  | "trade"
  | "share"
  | "insurance"
  | "guide"
  | "deleteacct";

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

/** The optional button carried by an actionable toast or a success banner. */
export interface ToastAction {
  label: string;
  /** Defaults to `arrow-right` on the success banner; unused on toasts. */
  icon?: IconName;
  fn: () => void;
}

export interface ToastMessage {
  msg: string;
  kind: ToastKind;
  /** Present on undoable toasts — they live 5200 ms instead of 2600 ms. */
  action?: ToastAction | null;
}

/** The inline success banner (`succeed()`), auto-dismissed after 7000 ms. */
export interface SuccessMessage {
  title: string;
  text: string;
  action: ToastAction | null;
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

/* ================================================================= delta =
 *
 * Everything below belongs to the fifteen views added by the revised comp
 * (delta specs A, B and C). Ordering follows the spec: live, auto, billing,
 * transfer, wish, recent, stores, board, breach, recycle, trade, share,
 * insurance, guide, deleteacct — then the cross-cutting error / skeleton
 * models.
 * ======================================================================== */

/* -------------------------------------------------- live view and clips */

export interface Camera {
  id: string;
  name: string;
  tint: Tint;
  icon: IconName;
  /** e.g. `-52 dBm`; an em dash when the camera is offline. */
  signal: string;
  offline?: boolean;
  /** "offline since Thursday, 21:14" — only on offline cameras. */
  since?: string;
}

export type ClipType = "person" | "parcel" | "press" | "motion";

/** `all` is the filter-only pseudo type. */
export type ClipFilterId = "all" | ClipType;

/** `[id, label, icon]`. */
export type ClipTypeOption = [ClipFilterId, string, IconName];

export interface Clip {
  id: string;
  /** Camera id. */
  cam: string;
  /** Group header — "Today" / "Yesterday" / "Earlier this week". */
  day: string;
  time: string;
  /** `0:06`. */
  dur: string;
  type: ClipType;
  title: string;
  text: string;
}

/** One of the four always-rendered stage buttons under the live feed. */
export interface LiveControl {
  icon: IconName;
  label: string;
  /** Always toasted as `info`. */
  toast: string;
}

/* -------------------------------------------------------- automations */

/** A WHEN trigger or a THEN action offered by the builder. */
export interface AutomationOption {
  value: string;
  label: string;
  icon: IconName;
}

/** One THEN line inside a rule. */
export interface AutomationStep {
  text: string;
  icon: IconName;
}

export interface Automation {
  id: string;
  name: string;
  on: boolean;
  /** The lower-case WHEN clause. */
  when: string;
  whenIcon: IconName;
  then: AutomationStep[];
  /** "ran yesterday, 19:26" / "paused since 12 Jul" / "never run yet". */
  last: string;
  /** Set on rules created in-session; drives the "New" pill. */
  fresh?: boolean;
}

/* ------------------------------------------------------------- billing */

export type InvoiceKind = "plan" | "hardware" | "refund";

/** `failed` renders as **Retrying**, not "Failed". */
export type InvoiceStatus = "paid" | "refunded" | "failed";

export interface Invoice {
  id: string;
  desc: string;
  /** "12 Jul 2026" — the period filters regex this string. */
  date: string;
  /** Negative on credit notes; rendered with U+2212. */
  amount: number;
  kind: InvoiceKind;
  status: InvoiceStatus;
}

export type BillingFilterId = "all" | InvoiceKind;

export type BillingPeriodId = "2026" | "2025" | "month";

/** `[id, label]`. */
export type BillingFilterOption = [BillingFilterId, string];

/** `[id, label]`. */
export type BillingPeriodOption = [BillingPeriodId, string];

/* ------------------------------------------------------------ transfer */

export interface TransferCheck {
  id: string;
  label: string;
}

/** The confirmation snapshot written by a successful transfer. */
export interface TransferReceipt {
  /** `WT-8823-01`. */
  ref: string;
  serial: string;
  /** The product model string. */
  name: string;
  to: string;
  email: string;
}

/* ------------------------------------------------------------ wishlist */

export interface WishItem {
  id: string;
  prod: ProductId;
  name: string;
  blurb: string;
  price: number;
  was: number;
  /** "saved 12 Jul". */
  added: string;
  stock: PartStock;
}

export interface WishSuggestion {
  id: string;
  prod: ProductId;
  name: string;
  price: number;
}

/* ------------------------------------------------------ recently viewed */

export type RecentKind = "article" | "product";

export interface RecentEntry {
  id: string;
  kind: RecentKind;
  /** Article id — `article` rows only. */
  ref?: string;
  /** Product display name — `product` rows only. */
  name?: string;
  prod?: ProductId;
  price?: number;
  /** Group header — "Today" / "Yesterday" / "Earlier this week". */
  when: string;
  time: string;
}

export type RecentFilterId = "all" | RecentKind;

/** `[id, label, icon]`. */
export type RecentFilterOption = [RecentFilterId, string, IconName];

/* ------------------------------------------------------- store locator */

export type StoreKind = "flagship" | "stockist" | "recycling";

/** `[label, icon]`. */
export type StoreService = [string, IconName];

export interface StoreLocation {
  id: string;
  name: string;
  kind: StoreKind;
  address: string;
  /** "0.4 mi". */
  distance: string;
  phone: string;
  open: boolean;
  hours: string;
  tint: Tint;
  services: StoreService[];
}

export type StoreFilterId = "all" | StoreKind;

/** `[id, label, icon]`. */
export type StoreFilterOption = [StoreFilterId, string, IconName];

/* ------------------------------------------------- referral leaderboard */

export type LeaderPeriod = "quarter" | "alltime";

export interface Leader {
  name: string;
  initials: string;
  tint: Tint;
  place: string;
  count: number;
  /** Exactly one row per period carries this. */
  you?: boolean;
}

export type LeaderBoard = Record<LeaderPeriod, Leader[]>;

export interface LeaderPrize {
  place: string;
  prize: string;
  icon: IconName;
  note: string;
}

/* -------------------------------------------------------- breach notice */

export interface BreachItem {
  label: string;
  /** "Exposed" / "Not affected". */
  state: string;
  bad: boolean;
  icon: IconName;
}

export interface BreachEvent {
  when: string;
  text: string;
  st: StepState;
}

export type BreachResultKind = "hit" | "clear" | "info";

export interface BreachResult {
  kind: BreachResultKind;
  icon: IconName;
  text: string;
}

/** One of the three "what we'd suggest doing" cards. */
export interface BreachStep {
  title: string;
  text: string;
  action?: { label: string; icon: IconName };
}

/* ------------------------------------------------------------ recycling */

export type RecycleMethodId = "post" | "drop" | "collect";

export interface RecycleMethod {
  id: RecycleMethodId;
  label: string;
  icon: IconName;
  note: string;
  /** The first sentence of the confirmation body. */
  done: string;
}

export interface RecycleStat {
  label: string;
  value: string;
  icon: IconName;
  note: string;
}

export interface RecyclePoint {
  name: string;
  address: string;
  hours: string;
  distance: string;
}

/** A bullet on the "We take" / "We can't take" pair. */
export interface RecycleRule {
  text: string;
}

/** `PRODUCTS` plus the two synthetic rows (`other`, `cables`). */
export interface RecycleItem {
  id: string;
  name: string;
  model: string;
  icon: IconName;
  tint: Tint;
}

export interface RecycleBooking {
  /** `RC-31953` with the default selection. */
  ref: string;
  method: string;
  title: string;
  text: string;
}

/* -------------------------------------------------------- trade account */

export interface TradePerk {
  title: string;
  icon: IconName;
  text: string;
}

export interface TradeTier {
  id: string;
  name: string;
  /** "20% off". */
  discount: string;
  req: string;
}

export interface TradeVolume {
  value: string;
  label: string;
}

/** `[label, icon]` — the label string is what `tdSkillsOn` stores. */
export type TradeSkill = [string, IconName];

export interface TradeCheck {
  id: string;
  label: string;
}

export interface TradeApplication {
  /** `TA-78200 + name.length * 11`. */
  ref: string;
  /** "Silver · 20% off". */
  tier: string;
  text: string;
}

/* --------------------------------------------------------------- share */

export type ShareState = "live" | "expiring" | "expired";

/** `[name, initials, tint]`. */
export type ShareWatcher = [string, string, Tint];

export interface ShareLink {
  id: string;
  title: string;
  /** Camera id. */
  cam: string;
  audience: string;
  url: string;
  views: number;
  /** "expires in 5 days" / "expired" / "no expiry". */
  expires: string;
  state: ShareState;
  watchers: ShareWatcher[];
}

/** Both `SH_AUDIENCES` and `SH_EXPIRIES` rows. */
export interface ShareOption {
  value: string;
  label: string;
}

export interface ShareToggleOption {
  id: string;
  label: string;
  note: string;
}

/* ----------------------------------------------------- insurance claims */

export type ClaimPackState = "ready" | "building";

export interface InsuranceClaim {
  id: string;
  /** Carried but never rendered. */
  kind: string;
  title: string;
  state: ClaimPackState;
  text: string;
  meta: string;
}

/** `[id, label, icon]`. */
export type InsuranceKindOption = [string, string, IconName];

export interface InsuranceWindow {
  value: string;
  label: string;
}

/* ----------------------------------------------------------- gift guide */

export type GiftTag = "popular" | "budget" | "newhome" | "splurge";

export interface GiftPick {
  id: string;
  /** Drives the tile icon and tint via `dataSource.product()`. */
  prod: ProductId;
  /** "For the worrier". */
  forWho: string;
  name: string;
  price: number;
  was: number;
  badge: string | null;
  tag: GiftTag;
  blurb: string;
}

export type GiftFilterId = "all" | GiftTag;

/** `[id, label, icon]`. */
export type GiftFilterOption = [GiftFilterId, string, IconName];

export interface GiftDate {
  label: string;
  date: string;
  /** Misleading name, kept from the comp: `true` renders `--pos`. */
  late: boolean;
}

/* ------------------------------------------------------ account deletion */

export interface DeleteItem {
  label: string;
  /** "Deleted" / "Keep working locally" / … */
  fate: string;
  bad: boolean;
  icon: IconName;
}

export interface DeleteCheck {
  id: string;
  label: string;
}

/** One of the three retention offers on step 2. */
export interface DeleteAlternative {
  icon: IconName;
  title: string;
  text: string;
  cta: string;
}

export interface DeleteSchedule {
  /** `AD-90413` with all three boxes ticked. */
  ref: string;
  /** "deletes 26 Aug 2026". */
  date: string;
}

/* -------------------------------------------- errors, skeletons, layout */

/** `grid` is a SKELETON SHAPE, not a view (delta B §0a). */
export type SkeletonShape = "grid" | "form" | "doc" | "list";

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
