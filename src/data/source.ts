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
