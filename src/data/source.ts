/*
 * The DataSource seam.
 *
 * Screens and the store never import `./demo` directly — they go through
 * `dataSource` (or `getDataSource()`), so the demo dataset can be swapped for
 * a real API without touching a single screen.
 *
 * Everything here is read-only reference data. Mutable demo state (tickets,
 * appointments, registrations, referrals, members, baskets…) lives in the
 * Zustand store, seeded once from this seam.
 */

import * as demo from "./demo";
import type {
  A11yPaletteOption,
  A11ySize,
  A11yToggle,
  Appointment,
  Article,
  BodyBlock,
  Bundle,
  Category,
  CategorySlug,
  ChatMessage,
  ChatQuickReply,
  ClaimOutcome,
  Contributor,
  CustomerIdentity,
  Device,
  DownloadCategory,
  DownloadFile,
  EnergyData,
  EnergyRoom,
  EnergyTip,
  FirmwareRelease,
  ForumCategory,
  ForumThread,
  GiftDesign,
  Installer,
  Member,
  NotifCategory,
  Notification,
  Order,
  OverviewGroup,
  Part,
  PartCategory,
  PartnerJob,
  PartnerLink,
  Person,
  Plan,
  Product,
  ProductId,
  Referral,
  RegisteredDevice,
  RepairDate,
  RepairSlot,
  RepairType,
  RetentionOption,
  ReturnMethod,
  SecurityToggle,
  Session,
  StatusComponent,
  StatusIncident,
  StatusUpdate,
  SurveyRow,
  SurveyScalePoint,
  Ticket,
  TourStep,
  TradeInAge,
  TradeInCondition,
  /* --- delta --- */
  Automation,
  AutomationOption,
  BillingFilterOption,
  BillingPeriodOption,
  BreachEvent,
  BreachItem,
  BreachStep,
  Camera,
  DeleteAlternative,
  Clip,
  ClipTypeOption,
  DeleteCheck,
  DeleteItem,
  GiftDate,
  GiftFilterOption,
  GiftPick,
  InsuranceClaim,
  InsuranceKindOption,
  InsuranceWindow,
  Invoice,
  Leader,
  LeaderPeriod,
  LeaderPrize,
  RecentEntry,
  RecentFilterOption,
  RecycleItem,
  RecycleMethod,
  RecyclePoint,
  RecycleRule,
  RecycleStat,
  ShareLink,
  ShareOption,
  ShareToggleOption,
  StoreFilterOption,
  StoreLocation,
  TradeCheck,
  TradePerk,
  TradeSkill,
  TradeTier,
  TradeVolume,
  TransferCheck,
  WishItem,
  WishSuggestion,
} from "./types";

export interface DataSource {
  /* identity */
  agent(): Person;
  customer(): CustomerIdentity;

  /* catalogue */
  products(): Product[];
  /** Never throws — falls back to the first product, as the comp does. */
  product(id: ProductId | string | null | undefined): Product;

  /* knowledge base */
  categories(): Category[];
  category(slug: string): Category | undefined;
  articles(): Article[];
  article(id: string | null | undefined): Article | undefined;
  articleBody(id: string): BodyBlock[];
  articlesInCategory(slug: string): Article[];
  popularArticles(): Article[];
  kbSuggestions(): string[];

  /* tickets */
  seedTickets(): Ticket[];
  seedTicketOrder(): string[];
  topics(): string[];
  agentReplies(): string[];
  attachmentPool(): string[];

  /* orders */
  orders(): Order[];
  order(id: string): Order | undefined;
  returnableOrders(): string[];

  /* forum */
  forumCategories(): ForumCategory[];
  forumCategoryIcon(id: string): string;
  threads(): ForumThread[];
  contributors(): Contributor[];

  /* warranty + claims */
  seedRegistered(): RegisteredDevice[];
  retailers(): string[];
  claimOutcomes(): ClaimOutcome[];
  claimPhotoPool(): string[];

  /* returns */
  returnReasons(): string[];
  returnMethods(): ReturnMethod[];

  /* repair + appointments */
  repairIssues(): string[];
  repairTypes(): RepairType[];
  repairDates(): RepairDate[];
  repairSlots(): RepairSlot[];
  seedAppointments(): Appointment[];

  /* resources */
  firmware(): FirmwareRelease[];
  downloads(): DownloadFile[];
  downloadCategories(): DownloadCategory[];
  statusComponents(): StatusComponent[];
  statusUpdates(): StatusUpdate[];
  statusHistory(): StatusIncident[];

  /* shop */
  parts(): Part[];
  partCategories(): PartCategory[];
  bundles(): Bundle[];
  byoPrices(): Record<ProductId, number>;
  giftDesigns(): GiftDesign[];
  giftAmounts(): number[];
  plans(): Plan[];
  tradeInBase(): Record<ProductId, number>;
  tradeInConditions(): TradeInCondition[];
  tradeInAges(): TradeInAge[];

  /* home */
  devices(): Device[];
  energy(): EnergyData;
  energyRooms(): EnergyRoom[];
  energyTips(): EnergyTip[];
  seedMembers(): Member[];
  notifications(): Notification[];
  notifCategories(): NotifCategory[];

  /* people + partners */
  seedReferrals(): Referral[];
  installers(): Installer[];
  partnerJobs(): PartnerJob[];
  partnerLinks(): PartnerLink[];

  /* account */
  sessions(): Session[];
  securityToggles(): SecurityToggle[];
  retentionOptions(): RetentionOption[];
  surveyRows(): SurveyRow[];
  surveyScale(): SurveyScalePoint[];
  surveyTags(): string[];

  /* chrome */
  tour(): TourStep[];
  overviewGroups(): OverviewGroup[];
  chatGreeting(): ChatMessage;
  chatQuickReplies(): ChatQuickReply[];
  chatReplies(): string[];
  accessibilitySizes(): A11ySize[];
  accessibilityPalettes(): A11yPaletteOption[];
  accessibilityToggles(): A11yToggle[];

  /* ------------------------------------------------------------- delta -- */

  /* live view + clips */
  cameras(): Camera[];
  /** Never throws — falls back to the first camera. */
  camera(id: string | null | undefined): Camera;
  clipTypes(): ClipTypeOption[];
  clips(): Clip[];
  clip(id: string | null | undefined): Clip | undefined;

  /* automations */
  automationTriggers(): AutomationOption[];
  automationActions(): AutomationOption[];
  seedAutomations(): Automation[];

  /* billing */
  invoices(): Invoice[];
  billingFilters(): BillingFilterOption[];
  billingPeriods(): BillingPeriodOption[];

  /* warranty transfer */
  transferReasons(): string[];
  transferChecks(): TransferCheck[];

  /* wishlist — nothing mutates it; removal is the `wlOut` id list */
  wishlist(): WishItem[];
  wishSuggestions(): WishSuggestion[];

  /* recently viewed */
  recentlyViewed(): RecentEntry[];
  recentFilters(): RecentFilterOption[];

  /* store locator */
  stores(): StoreLocation[];
  storeFilters(): StoreFilterOption[];

  /* referral leaderboard */
  leaders(period: LeaderPeriod): Leader[];
  leaderPrizes(): LeaderPrize[];

  /* breach notice */
  breachItems(): BreachItem[];
  breachTimeline(): BreachEvent[];
  breachSteps(): BreachStep[];

  /* recycling */
  recycleMethods(): RecycleMethod[];
  recycleStats(): RecycleStat[];
  recyclePoints(): RecyclePoint[];
  recycleAccepted(): RecycleRule[];
  recycleRejected(): RecycleRule[];
  /** `products()` plus the two synthetic rows (`other`, `cables`). */
  recycleItems(): RecycleItem[];

  /* trade account */
  tradePerks(): TradePerk[];
  tradeTiers(): TradeTier[];
  tradeTier(id: string | null | undefined): TradeTier;
  tradeTypes(): string[];
  tradeVolumes(): TradeVolume[];
  tradeSkills(): TradeSkill[];
  tradeChecks(): TradeCheck[];

  /* shared clips */
  seedShareLinks(): ShareLink[];
  shareAudiences(): ShareOption[];
  shareExpiries(): ShareOption[];
  shareOptions(): ShareToggleOption[];

  /* insurance claims */
  insuranceClaims(): InsuranceClaim[];
  insuranceKinds(): InsuranceKindOption[];
  insuranceWindows(): InsuranceWindow[];

  /* gift guide */
  giftPicks(): GiftPick[];
  giftFilters(): GiftFilterOption[];
  giftDates(): GiftDate[];

  /* account deletion */
  deleteItems(): DeleteItem[];
  deleteReasons(): string[];
  deleteChecks(): DeleteCheck[];
  deleteAlternatives(): DeleteAlternative[];
}

/** Deep-ish clone so seeded collections handed to the store are never shared. */
function clone<T>(value: T): T {
  return structuredClone(value);
}

export const demoDataSource: DataSource = {
  agent: () => demo.AGENT,
  customer: () => demo.CUSTOMER,

  products: () => demo.PRODUCTS,
  product: (id) =>
    demo.PRODUCTS.find((p) => p.id === id) ?? demo.PRODUCTS[0],

  categories: () => demo.CATS,
  category: (slug) => demo.CATS.find((c) => c.slug === slug),
  articles: () => demo.ARTICLES,
  article: (id) => (id ? demo.ARTICLES.find((a) => a.id === id) : undefined),
  articleBody: (id) => demo.BODIES[id] ?? [],
  articlesInCategory: (slug) =>
    demo.ARTICLES.filter((a) => a.cat === (slug as CategorySlug)),
  popularArticles: () =>
    demo.POPULAR.map((id) => demo.ARTICLES.find((a) => a.id === id)).filter(
      (a): a is Article => Boolean(a),
    ),
  kbSuggestions: () => demo.KB_SUGGEST,

  seedTickets: () => clone(demo.SEEDED_TICKETS),
  seedTicketOrder: () => [...demo.SEEDED_TICKET_ORDER],
  topics: () => demo.TOPICS,
  agentReplies: () => demo.AGENT_REPLIES,
  attachmentPool: () => demo.ATTACH_POOL,

  orders: () => demo.ORDERS,
  order: (id) => demo.ORDERS.find((o) => o.id === id),
  returnableOrders: () => demo.RETURNABLE_ORDERS,

  forumCategories: () => demo.FCATS,
  forumCategoryIcon: (id) => demo.FCAT_ICONS[id] ?? "messages-square",
  threads: () => demo.THREADS,
  contributors: () => demo.CONTRIBUTORS,

  seedRegistered: () => clone(demo.REGISTERED),
  retailers: () => demo.RETAILERS,
  claimOutcomes: () => demo.CLAIM_OUTCOMES,
  claimPhotoPool: () => demo.CLAIM_PHOTO_POOL,

  returnReasons: () => demo.RETURN_REASONS,
  returnMethods: () => demo.RETURN_METHODS,

  repairIssues: () => demo.REPAIR_ISSUES,
  repairTypes: () => demo.REPAIR_TYPES,
  repairDates: () => demo.REPAIR_DATES,
  repairSlots: () => demo.REPAIR_SLOTS,
  seedAppointments: () => clone(demo.APPOINTMENTS),

  firmware: () => demo.FIRMWARE,
  downloads: () => demo.DOWNLOADS,
  downloadCategories: () => demo.DL_CATS,
  statusComponents: () => demo.ST_COMPS,
  statusUpdates: () => demo.ST_UPDATES,
  statusHistory: () => demo.ST_HISTORY,

  parts: () => demo.PARTS,
  partCategories: () => demo.PART_CATS,
  bundles: () => demo.BUNDLES,
  byoPrices: () => demo.BYO_PRICES,
  giftDesigns: () => demo.GIFT_DESIGNS,
  giftAmounts: () => demo.GIFT_AMOUNTS,
  plans: () => demo.PLANS,
  tradeInBase: () => demo.TI_BASE,
  tradeInConditions: () => demo.TI_CONDS,
  tradeInAges: () => demo.TI_AGES,

  devices: () => demo.DEVICES,
  energy: () => demo.ENERGY,
  energyRooms: () => demo.ENERGY_ROOMS,
  energyTips: () => demo.ENERGY_TIPS,
  seedMembers: () => clone(demo.MEMBERS),
  notifications: () => demo.NOTIFS,
  notifCategories: () => demo.NT_CATS,

  seedReferrals: () => clone(demo.REFERRALS),
  installers: () => demo.INSTALLERS,
  partnerJobs: () => demo.PT_JOBS,
  partnerLinks: () => demo.PT_LINKS,

  sessions: () => demo.SESSIONS,
  securityToggles: () => demo.SEC_TOGGLES,
  retentionOptions: () => demo.SEC_RETAIN,
  surveyRows: () => demo.SURVEY_ROWS,
  surveyScale: () => demo.SURVEY_SCALE,
  surveyTags: () => demo.SURVEY_TAGS,

  tour: () => demo.TOUR,
  overviewGroups: () => demo.OV_GROUPS,
  chatGreeting: () => clone(demo.CHAT_GREETING),
  chatQuickReplies: () => demo.CHAT_QUICK,
  chatReplies: () => demo.CHAT_REPLIES,
  accessibilitySizes: () => demo.A11Y_SIZES,
  accessibilityPalettes: () => demo.A11Y_PALETTES,
  accessibilityToggles: () => demo.A11Y_TOGGLES,

  /* ------------------------------------------------------------- delta -- */

  cameras: () => demo.CAMS,
  camera: (id) => demo.CAMS.find((c) => c.id === id) ?? demo.CAMS[0],
  clipTypes: () => demo.CLIP_TYPES,
  clips: () => demo.CLIPS,
  clip: (id) => (id ? demo.CLIPS.find((c) => c.id === id) : undefined),

  automationTriggers: () => demo.AU_TRIGGERS,
  automationActions: () => demo.AU_ACTIONS,
  seedAutomations: () => clone(demo.AUTOMATIONS),

  invoices: () => demo.INVOICES,
  billingFilters: () => demo.BL_FILTERS,
  billingPeriods: () => demo.BL_PERIODS,

  transferReasons: () => demo.TR_REASONS,
  transferChecks: () => demo.TR_CHECKS,

  wishlist: () => demo.WISH,
  wishSuggestions: () => demo.WISH_SUGGEST,

  recentlyViewed: () => demo.RECENT,
  recentFilters: () => demo.RV_CATS,

  stores: () => demo.STORES,
  storeFilters: () => demo.ST_FILTERS,

  leaders: (period) => demo.LEADERS[period],
  leaderPrizes: () => demo.LB_PRIZES,

  breachItems: () => demo.BREACH_ITEMS,
  breachTimeline: () => demo.BREACH_TIMELINE,
  breachSteps: () => demo.BR_STEPS,

  recycleMethods: () => demo.RC_METHODS,
  recycleStats: () => demo.RC_STATS,
  recyclePoints: () => demo.RC_POINTS,
  recycleAccepted: () => demo.RC_ACCEPT,
  recycleRejected: () => demo.RC_REJECT,
  recycleItems: () => [
    ...demo.PRODUCTS.map((p) => ({
      id: p.id as string,
      name: p.name,
      model: p.model,
      icon: p.icon,
      tint: p.tint,
    })),
    { id: "other", name: "Other brand", model: "Other brand device", icon: "boxes", tint: "#7a7a86" },
    { id: "cables", name: "Cables & mounts", model: "Cables and mounts", icon: "cable", tint: "#5f9e6b" },
  ],

  tradePerks: () => demo.TD_PERKS,
  tradeTiers: () => demo.TD_TIERS,
  tradeTier: (id) => demo.TD_TIERS.find((t) => t.id === id) ?? demo.TD_TIERS[1],
  tradeTypes: () => demo.TD_TYPES,
  tradeVolumes: () => demo.TD_VOLUMES,
  tradeSkills: () => demo.TD_SKILLS,
  tradeChecks: () => demo.TD_CHECKS,

  seedShareLinks: () => clone(demo.SH_LINKS),
  shareAudiences: () => demo.SH_AUDIENCES,
  shareExpiries: () => demo.SH_EXPIRIES,
  shareOptions: () => demo.SH_OPTS,

  insuranceClaims: () => demo.IN_CLAIMS,
  insuranceKinds: () => demo.IN_KINDS,
  insuranceWindows: () => demo.IN_WINDOWS,

  giftPicks: () => demo.GG_PICKS,
  giftFilters: () => demo.GG_FILTERS,
  giftDates: () => demo.GG_DATES,

  deleteItems: () => demo.DL_ITEMS,
  deleteReasons: () => demo.DL_REASONS,
  deleteChecks: () => demo.DL_CHECKS,
  deleteAlternatives: () => demo.DL_ALTS,
};

let active: DataSource = demoDataSource;

/** The live source. Screens should import this. */
export const dataSource: DataSource = new Proxy({} as DataSource, {
  get(_t, key: string) {
    return (active as unknown as Record<string, unknown>)[key];
  },
});

export function getDataSource(): DataSource {
  return active;
}

/** Swap the seam (tests, or a future real backend). */
export function setDataSource(next: DataSource): void {
  active = next;
}
