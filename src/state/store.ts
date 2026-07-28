/*
 * The single Zustand store.
 *
 * Modelled on the comp's state shape (port spec §7.0) with three deliberate
 * changes:
 *   • the JS window width is gone — layout switches are real CSS media
 *     queries at 980 / 1120 (ruling R5);
 *   • the comp's instance-mutable stores (tickets, appointments, registered
 *     devices, referrals, members) are first-class state, because a hooks
 *     port cannot rely on `forceUpdate` (spec §13.2 #1);
 *   • the lazily-created keys (shortcuts, cpOpen, cpQ, cpIndex) are declared
 *     up front with their documented defaults.
 *
 * Routing is this `view` string. There is no router.
 */

import { useMemo } from "react";
import { create } from "zustand";
import {
  AGENT,
  BREACH_HIT_EMAIL,
  CHAT_ESCALATION_CLOSER,
  CHAT_QUICK,
  CHAT_REPLIES,
  CUSTOMER,
  DL_SCHEDULED_DATE,
  INVOICE_EXPORT_FILE,
  OV_GROUPS,
  PRODUCTS,
  SEEDED_ATTACHMENT,
  SHARE_HOST,
} from "../data/demo";
import { dataSource } from "../data/source";
import {
  A11Y_INITIAL,
  a11yReset,
  applyA11ySettings,
  chime,
} from "../lib/a11y";
import {
  AU_ACTION_TOAST,
  AU_CREATED_TOAST,
  AU_NAME_TOAST,
  AU_TRIGGER_TOAST,
  automationDeleteToast,
  automationToggleToast,
  buildAutomation,
  isAutomationOn,
  nextAutomationId,
} from "../lib/automations";
import {
  CLIP_DELETE_TOAST,
  CLIP_SHARE_TOAST,
  LIVE_TROUBLESHOOT_ARTICLE,
  clipDownloadToast,
  clipPlayToast,
  liveRetryToast,
  newShareLink,
  shareExtendToast,
} from "../lib/clips";
import {
  OFFLINE_BACK_TOAST,
  OFFLINE_STILL_TOAST,
  REPORT_TOAST,
  RETRY_TOAST,
  SIMULATE_FAIL_TOAST,
  isOnline,
} from "../lib/errors";
import {
  FREE_DELIVERY_LINE,
  filterStores,
  invoiceDownloadToast,
  storeKeyToast,
  storeSearchToast,
  visibleWish,
  wishAddToast,
} from "../lib/derive";
import { BUSY_MOUNT_MS, BUSY_NAV_MS, BUSY_RETRY_MS } from "../lib/skeletons";
import { FOLLOW_SYSTEM_TOAST, systemTheme } from "../lib/theme";
import {
  NOW_STAMP,
  deleteRef,
  money,
  pluralise,
  recycleRef,
  tradeRef,
  transferRef,
} from "../lib/format";
import {
  CHAT_TYPING_DELAY_MS,
  TYPING_DELAY_MS,
  delay,
  initialThreadState,
  threadReducer,
  ticketList,
} from "../lib/thread";
import type { ThreadState } from "../lib/thread";
import type { KbSort } from "../lib/search";
import type {
  A11ySettings,
  A11yToggleId,
  Appointment,
  ChatMessage,
  Command,
  FormErrors,
  GiftWhen,
  Member,
  MemberRole,
  NewTicketForm,
  OverviewId,
  PlanCycle,
  PlanId,
  ProductId,
  Referral,
  RegisteredDevice,
  SecurityRetention,
  ThemeName,
  Ticket,
  TicketMessage,
  ToastKind,
  ToastMessage,
  ViewId,
  /* --- delta --- */
  Automation,
  BillingFilterId,
  BillingPeriodId,
  BreachResult,
  Clip,
  ClipFilterId,
  DeleteSchedule,
  GiftFilterId,
  InsuranceClaim,
  Invoice,
  LeaderPeriod,
  LiveControl,
  RecentEntry,
  RecentFilterId,
  RecycleBooking,
  RecycleMethodId,
  ShareLink,
  StoreFilterId,
  StoreLocation,
  SuccessMessage,
  ToastAction,
  TradeApplication,
  TransferReceipt,
  WishItem,
} from "../data/types";

/* ---------------------------------------------------------------- helpers */

/** `window.scrollTo(0, 0)`, guarded. Every navigation and submit calls it. */
export function top(): void {
  try {
    window.scrollTo(0, 0);
  } catch {
    /* non-browser */
  }
}

/** The weak email check the comp uses everywhere: `@` at index >= 1. */
export function looksLikeEmail(value: string): boolean {
  return value.indexOf("@") >= 1;
}

const TOAST_MS = 2600;

/** Actionable toasts (Undo) stay up longer. */
const TOAST_ACTION_MS = 5200;

/** The inline success banner auto-dismisses after seven seconds. */
const SUCCESS_MS = 7000;

/** Both free-text notes (trade, insurance) clamp at 600 characters. */
export const NOTE_MAX = 600;

/** The `g`-chord window. */
export const CHORD_MS = 1400;

/** Blur-close delays for the two search dropdowns. */
export const HEADER_BLUR_MS = 140;
export const HERO_BLUR_MS = 150;

let toastTimer: ReturnType<typeof setTimeout> | null = null;
let successTimer: ReturnType<typeof setTimeout> | null = null;
let busyTimer: ReturnType<typeof setTimeout> | null = null;
/** The transfer reference counter — WT-8823-01, -02, … */
let transferSeq = 0;
let cancelAgentReply: (() => void) | null = null;
let cancelChatReply: (() => void) | null = null;

/* ------------------------------------------------------------------ state */

export interface AppState {
  /* --- shell --- */
  theme: ThemeName;
  view: ViewId;
  menu: boolean;
  toast: ToastMessage | null;
  shortcuts: boolean;
  cpOpen: boolean;
  cpQ: string;
  cpIndex: number;

  /* --- search surfaces --- */
  q: string;
  searchFocus: boolean;
  hq: string;
  hqFocus: boolean;

  /* --- help content --- */
  catSlug: string;
  articleId: string | null;
  feedback: "yes" | "no" | null;
  savedIds: string[];
  kbQ: string;
  kbFacet: string;
  kbSort: KbSort;

  /* --- tickets --- */
  thread: ThreadState;
  threadId: string | null;
  reply: string;
  typing: boolean;
  form: NewTicketForm;
  errs: FormErrors;
  mtEmail: string;
  mtSubmitted: boolean;

  /* --- orders --- */
  ordNum: string;
  ordEmail: string;
  ordFound: string | null;
  ordErr: string;

  /* --- forum --- */
  fcat: string;
  fopen: string | null;

  /* --- contact --- */
  cName: string;
  cEmail: string;
  cMsg: string;

  /* --- warranty --- */
  registered: RegisteredDevice[];
  wProd: ProductId | null;
  wSerial: string;
  wDate: string;
  wRetailer: string;
  wDone: { name: string; expires: string } | null;

  /* --- warranty claim --- */
  clDev: string;
  clFault: string;
  clOutcome: string;
  clPhotos: string[];
  clRef: string | null;

  /* --- returns wizard --- */
  rStep: 1 | 2 | 3;
  rOrder: string;
  rPicked: string[];
  rReason: string;
  rNote: string;
  rMethod: string;
  rRma: string | null;

  /* --- appointments + repair --- */
  appts: Appointment[];
  apptCancelled: string[];
  rpProd: ProductId | null;
  rpIssue: string;
  rpType: string;
  rpDate: string;
  rpSlot: string | null;
  rpRef: string | null;

  /* --- filter + email fields --- */
  fwCat: string;
  dlCat: string;
  refEmail: string;
  stEmail: string;

  /* --- trade-in --- */
  tiProd: ProductId;
  tiCond: string;
  tiAge: string;
  tiSent: string | null;

  /* --- installers --- */
  inPostcode: string;
  inRadius: string;

  /* --- spare parts --- */
  partCat: string;
  basket: Record<string, number>;

  /* --- accessibility --- */
  a11y: A11ySettings;

  /* --- gift cards --- */
  gcDesign: string;
  gcAmount: number | "custom";
  gcCustom: string;
  gcTo: string;
  gcEmail: string;
  gcMsg: string;
  gcWhen: GiftWhen;
  gcBought: string | null;
  gcRedeem: string;
  gcBal: number;

  /* --- plans --- */
  planCycle: PlanCycle;
  planCurrent: PlanId;

  /* --- security --- */
  secOn: Record<string, boolean>;
  secRetain: SecurityRetention;
  secOut: string[];

  /* --- survey --- */
  svNps: number | null;
  svRatings: Record<string, number>;
  svTagsOn: string[];
  svText: string;
  svContact: boolean;
  svDone: string | null;

  /* --- banners / tour / bundles --- */
  obOut: boolean;
  tourStep: number;
  byoOn: ProductId[];

  /* --- energy / devices / household --- */
  enPeriod: "week" | "month" | "year";
  devOn: Record<string, boolean>;
  members: Member[];
  mbEmail: string;
  mbRole: "adult" | "guest";
  mbOut: string[];
  mbRoles: Record<string, MemberRole>;

  /* --- notifications / partner --- */
  ntCat: string;
  ntRead: string[];
  ptOut: string[];

  /* --- referrals --- */
  referrals: Referral[];

  /* --- live chat --- */
  chatEnabled: boolean;
  chatOpen: boolean;
  chatInput: string;
  chatTyping: boolean;
  chatQuick: boolean;
  chatMsgs: ChatMessage[];

  /* ================================================================ delta */

  /* --- cross-cutting: busy / failure / offline / success banner --- */
  /** True during the view-change skeleton window. */
  busy: boolean;
  /** The view id that "failed"; the error screen renders for that view only. */
  failed: ViewId | null;
  offline: boolean;
  succ: SuccessMessage | null;
  /**
   * Ruling R3: the persisted theme stays binary. This flag records that the
   * user toggled it by hand, which stops the OS being followed.
   */
  themeManual: boolean;

  /* --- live view + clips --- */
  lvCam: string;
  lvType: ClipFilterId;
  lvOut: string[];

  /* --- automations --- */
  /** Seeded from the source; created rules are unshifted onto it. */
  automations: Automation[];
  auOff: string[];
  auGone: string[];
  auNewOpen: boolean;
  auName: string;
  auTrigger: string;
  auAction: string;

  /* --- billing --- */
  blFilter: BillingFilterId;
  blPeriod: BillingPeriodId;
  blCredit: number;

  /* --- wishlist --- */
  wlOut: string[];

  /* --- recently viewed --- */
  rvCat: RecentFilterId;
  rvOut: string[];
  rvCleared: boolean;

  /* --- store locator --- */
  stQ: string;
  stFilter: StoreFilterId;

  /* --- referral leaderboard --- */
  lbPeriod: LeaderPeriod;

  /* --- breach notice --- */
  brEmail: string;
  brResult: BreachResult | null;

  /* --- recycling --- */
  rcMethod: RecycleMethodId;
  rcOn: string[];
  rcPostcode: string;
  rcBooked: RecycleBooking | null;

  /* --- account deletion --- */
  dlStep: 1 | 2 | 3;
  dlReason: string;
  dlOn: string[];
  dlPhrase: string;
  dlScheduled: DeleteSchedule | null;

  /* --- shared clips --- */
  /** Seeded from the source; created links are unshifted onto it. */
  shareLinks: ShareLink[];
  shNewOpen: boolean;
  shClip: string;
  shAudience: string;
  shExpiry: string;
  shOn: string[];
  shOut: string[];

  /* --- insurance claims --- */
  inKind: string;
  inDate: string;
  inWindow: string;
  inRefInput: string;
  inNote: string;
  /** Read by the claim filter; nothing writes it (kept from the comp). */
  inOut: string[];

  /* --- gift guide --- */
  ggFilter: GiftFilterId;

  /* --- trade account --- */
  tdTier: string;
  tdName: string;
  tdType: string;
  tdCo: string;
  tdVat: string;
  tdContact: string;
  tdEmail: string;
  tdPhone: string;
  tdVolume: string;
  tdSkillsOn: string[];
  tdNote: string;
  tdOn: string[];
  tdDone: TradeApplication | null;

  /* --- warranty transfer --- */
  trDev: string | null;
  trName: string;
  trEmail: string;
  trReason: string;
  trOn: string[];
  trDone: TransferReceipt | null;
}

export interface AppActions {
  /** The escape hatch: shallow-merge any slice of state. */
  set: (patch: Partial<AppState>) => void;

  /* shell */
  /** `action` makes it an Undo-style toast: 5200 ms instead of 2600 ms. */
  showToast: (msg: string, kind?: ToastKind, action?: ToastAction | null) => void;
  clearToast: () => void;
  toggleTheme: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  dismissOutage: () => void;

  /* navigation */
  go: (view: ViewId, patch?: Partial<AppState>) => void;
  goHome: () => void;
  openCategory: (slug: string) => void;
  openArticle: (id: string) => void;
  openThread: (id: string) => void;
  openTicket: () => void;
  gotoKb: (q?: string) => void;
  gotoOverview: () => void;
  ovGo: (id: OverviewId) => void;

  /* knowledge base */
  toggleSave: (id: string) => void;
  giveFeedback: (v: "yes" | "no") => void;

  /* new ticket */
  setForm: <K extends keyof NewTicketForm>(
    key: K,
    value: NewTicketForm[K],
  ) => void;
  addAttachment: () => void;
  removeAttachment: (name: string) => void;
  validateTicket: () => FormErrors;
  submitTicket: () => void;

  /* thread */
  sendReply: () => void;
  markSolved: () => void;

  /* command palette */
  cpToggle: () => void;
  cpClose: () => void;
  cpSetQuery: (q: string) => void;
  cpMove: (delta: number, len: number) => void;
  cpAsk: () => void;
  commands: () => Command[];

  /* shortcuts overlay */
  scToggle: () => void;
  scClose: () => void;

  /* accessibility */
  setA11ySize: (scale: number) => void;
  setA11yPalette: (palette: A11ySettings["palette"]) => void;
  toggleA11y: (id: A11yToggleId) => void;
  saveA11y: () => void;
  resetA11y: () => void;

  /* live chat */
  openChat: () => void;
  closeChat: () => void;
  chatAsk: (index: number) => void;
  chatSubmit: () => void;
  chatAct: (act: string) => void;
  escalateChat: () => void;

  /* ================================================================ delta */

  /* --- toasts, undo and the success banner --- */
  /** `showToast(msg, kind, action)` — actionable toasts live 5200 ms. */
  undoToast: (msg: string, undo: () => void) => void;
  runToastAction: () => void;
  succeed: (title: string, text: string, action?: ToastAction | null) => void;
  dismissSuccess: () => void;
  runSuccessAction: () => void;

  /* --- the busy / error / offline layer (ruling R4) --- */
  /** Start the 620 ms first-paint skeleton. App calls this once on mount. */
  bootBusy: () => void;
  /** Explicit busy window; `go()` already fires a 480 ms one. */
  startBusy: (ms?: number) => void;
  /** Error-screen "Try again": clears `failed`, 620 ms skeleton, toasts. */
  retryView: () => void;
  /** Error-screen "Report it": opens a ticket. */
  reportFailure: () => void;
  /** Command-palette "Simulate a failed load". */
  failView: () => void;
  /** Command-palette "Simulate being offline" — a toggle, no toast. */
  toggleOffline: () => void;
  setOffline: (offline: boolean) => void;
  /** Offline banner "Retry now". */
  retryConnection: () => void;

  /* --- theme (ruling R3) --- */
  /** Adopt an OS theme change; ignored once the user has toggled by hand. */
  syncSystemTheme: (theme: ThemeName) => void;
  /** The Accessibility screen's escape hatch. */
  followSystemTheme: () => void;

  /* --- navigation into the fifteen new views --- */
  gotoLive: () => void;
  gotoAuto: () => void;
  gotoBilling: () => void;
  gotoTransfer: () => void;
  gotoWish: () => void;
  gotoRecent: () => void;
  gotoStores: () => void;
  gotoBoard: () => void;
  gotoBreach: () => void;
  gotoRecycle: () => void;
  gotoTrade: () => void;
  gotoShare: () => void;
  gotoInsurance: () => void;
  gotoGuide: () => void;
  gotoDelete: () => void;

  /* --- live view --- */
  playClip: (clip: Clip) => void;
  downloadClip: (clip: Clip) => void;
  shareClipLink: (clip: Clip) => void;
  deleteClip: (clip: Clip) => void;
  runLiveControl: (control: LiveControl) => void;
  liveRetry: () => void;
  liveTroubleshoot: () => void;

  /* --- automations --- */
  toggleAutomation: (id: string) => void;
  deleteAutomation: (id: string) => void;
  toggleNewAutomation: () => void;
  saveAutomation: () => void;

  /* --- billing --- */
  applyCredit: () => void;
  updateCard: () => void;
  exportInvoices: () => void;
  downloadInvoice: (invoice: Invoice) => void;

  /* --- wishlist --- */
  wishAdd: (item: WishItem) => void;
  wishRemove: (item: WishItem) => void;
  wishAddAll: () => void;
  wishShare: () => void;
  wishRestore: () => void;
  saveToWishlist: (name: string) => void;

  /* --- recently viewed --- */
  openRecent: (entry: RecentEntry) => void;
  recentSecondary: (entry: RecentEntry) => void;
  recentForget: (entry: RecentEntry) => void;
  recentClear: () => void;
  recentRestore: () => void;

  /* --- store locator --- */
  storeSearch: () => void;
  storeSearchKey: () => void;
  storeNearMe: () => void;
  storeReset: () => void;
  storeDirections: (name: string) => void;
  storeCall: () => void;
  storeBook: (store: StoreLocation) => void;

  /* --- breach notice --- */
  setBreachEmail: (value: string) => void;
  breachCheck: () => void;
  breachReport: () => void;

  /* --- recycling --- */
  toggleRecycleItem: (id: string) => void;
  setRecyclePostcode: (value: string) => void;
  recycleSubmit: () => void;
  recycleReset: () => void;

  /* --- account deletion --- */
  toggleDeleteCheck: (id: string) => void;
  deleteBack: () => void;
  deleteNext: () => void;
  deleteCancel: () => void;

  /* --- shared clips --- */
  toggleShareNew: () => void;
  toggleShareOption: (id: string) => void;
  shareCreate: () => void;
  shareCopy: () => void;
  shareExtend: (link: ShareLink) => void;
  shareRevoke: (link: ShareLink) => void;

  /* --- insurance claims --- */
  setInsuranceNote: (value: string) => void;
  insurancePrimary: (claim: InsuranceClaim) => void;
  insuranceShare: () => void;
  insuranceSubmit: () => void;

  /* --- gift guide --- */
  addToBasketByName: (name: string) => void;

  /* --- trade account --- */
  setTradeCompany: (value: string) => void;
  setTradeVat: (value: string) => void;
  setTradeNote: (value: string) => void;
  toggleTradeSkill: (label: string) => void;
  toggleTradeCheck: (id: string) => void;
  tradeSubmit: () => void;
  tradeReset: () => void;

  /* --- warranty transfer --- */
  toggleTransferCheck: (id: string) => void;
  transferSubmit: () => void;
  transferReset: () => void;
}

export type Store = AppState & AppActions;

/* ---------------------------------------------------------------- initial */

const EMPTY_FORM: NewTicketForm = {
  product: null,
  topic: "",
  subject: "",
  desc: "",
  attachments: [SEEDED_ATTACHMENT],
};

function initialState(): AppState {
  return {
    theme: "light",
    view: "home",
    menu: false,
    toast: null,
    shortcuts: false,
    cpOpen: false,
    cpQ: "",
    cpIndex: 0,

    q: "",
    searchFocus: false,
    hq: "",
    hqFocus: false,

    catSlug: "setup",
    articleId: null,
    feedback: null,
    savedIds: ["a_doorbell_wifi", "a_factory_reset", "a_return"],
    kbQ: "offline",
    kbFacet: "all",
    kbSort: "relevance",

    thread: initialThreadState(),
    threadId: null,
    reply: "",
    typing: false,
    form: { ...EMPTY_FORM, attachments: [SEEDED_ATTACHMENT] },
    errs: {},
    mtEmail: CUSTOMER.email,
    mtSubmitted: true,

    ordNum: "HH-88214",
    ordEmail: CUSTOMER.email,
    ordFound: "HH-88214",
    ordErr: "",

    fcat: "all",
    fopen: "f2",

    cName: "",
    cEmail: "",
    cMsg: "",

    registered: dataSource.seedRegistered(),
    wProd: null,
    wSerial: "",
    wDate: "",
    wRetailer: "",
    wDone: null,

    clDev: "d1",
    clFault: "",
    clOutcome: "repair",
    clPhotos: ["fault-front.jpg"],
    clRef: null,

    rStep: 1,
    rOrder: "HH-87109",
    rPicked: ["Hearth Video Doorbell"],
    rReason: "",
    rNote: "",
    rMethod: "dropoff",
    rRma: null,

    appts: dataSource.seedAppointments(),
    apptCancelled: [],
    rpProd: null,
    rpIssue: "",
    rpType: "visit",
    rpDate: "d1",
    rpSlot: null,
    rpRef: null,

    fwCat: "all",
    dlCat: "all",
    refEmail: "",
    stEmail: "",

    tiProd: "doorbell",
    tiCond: "good",
    tiAge: "2",
    tiSent: null,

    inPostcode: "BS1 4TR",
    inRadius: "10",

    partCat: "all",
    basket: {},

    a11y: { ...A11Y_INITIAL, on: { ...A11Y_INITIAL.on } },

    gcDesign: "classic",
    gcAmount: 50,
    gcCustom: "",
    gcTo: "",
    gcEmail: "",
    gcMsg: "",
    gcWhen: "now",
    gcBought: null,
    gcRedeem: "",
    gcBal: 0,

    planCycle: "monthly",
    planCurrent: "plus",

    secOn: { twofa: true, alerts: true, analytics: false, tips: true },
    secRetain: "30",
    secOut: [],

    svNps: null,
    svRatings: {},
    svTagsOn: [],
    svText: "",
    svContact: false,
    svDone: null,

    obOut: false,
    tourStep: 0,
    byoOn: ["doorbell", "plug"],

    enPeriod: "month",
    devOn: {},
    members: dataSource.seedMembers(),
    mbEmail: "",
    mbRole: "adult",
    mbOut: [],
    mbRoles: {},

    ntCat: "all",
    ntRead: [],
    ptOut: [],

    referrals: dataSource.seedReferrals(),

    chatEnabled: true,
    chatOpen: false,
    chatInput: "",
    chatTyping: false,
    chatQuick: true,
    chatMsgs: [dataSource.chatGreeting()],

    /* ============================================================== delta */

    busy: false,
    failed: null,
    offline: false,
    succ: null,
    themeManual: false,

    lvCam: "front",
    lvType: "all",
    lvOut: [],

    automations: dataSource.seedAutomations(),
    auOff: [],
    auGone: [],
    auNewOpen: false,
    auName: "",
    auTrigger: "",
    auAction: "",

    blFilter: "all",
    blPeriod: "2026",
    blCredit: 40,

    wlOut: [],

    rvCat: "all",
    rvOut: [],
    rvCleared: false,

    stQ: "Bristol",
    stFilter: "all",

    lbPeriod: "quarter",

    brEmail: "",
    brResult: null,

    rcMethod: "post",
    rcOn: ["doorbell"],
    rcPostcode: "BS1 4TR",
    rcBooked: null,

    dlStep: 1,
    dlReason: "",
    dlOn: [],
    dlPhrase: "",
    dlScheduled: null,

    shareLinks: dataSource.seedShareLinks(),
    shNewOpen: false,
    shClip: "c1",
    shAudience: "link",
    shExpiry: "7d",
    shOn: ["notify"],
    shOut: [],

    inKind: "theft",
    inDate: "",
    inWindow: "60",
    inRefInput: "",
    inNote: "",
    inOut: [],

    ggFilter: "all",

    tdTier: "silver",
    tdName: "",
    tdType: "",
    tdCo: "",
    tdVat: "",
    tdContact: "",
    tdEmail: "",
    tdPhone: "",
    tdVolume: "5",
    tdSkillsOn: ["Doorbell wiring", "Thermostats"],
    tdNote: "",
    tdOn: [],
    tdDone: null,

    trDev: "d1",
    trName: "",
    trEmail: "",
    trReason: "",
    trOn: [],
    trDone: null,
  };
}

/* ------------------------------------------------------------------ store */

export const useAppStore = create<Store>((set, get) => ({
  ...initialState(),

  set: (patch) => set(patch),

  /* ------------------------------------------------------------- shell */

  showToast: (msg, kind = "ok", action = null) => {
    if (toastTimer) clearTimeout(toastTimer);
    set({ toast: { msg, kind, action } });
    chime(kind, get().a11y);
    toastTimer = setTimeout(
      () => set({ toast: null }),
      action ? TOAST_ACTION_MS : TOAST_MS,
    );
  },

  clearToast: () => {
    if (toastTimer) clearTimeout(toastTimer);
    set({ toast: null });
  },

  /* Ruling R3: toggling by hand latches the theme; the OS is no longer
   * followed until `followSystemTheme()` releases it. */
  toggleTheme: () =>
    set((s) => ({
      theme: s.theme === "dark" ? "light" : "dark",
      themeManual: true,
    })),

  openMenu: () => set({ menu: true }),
  closeMenu: () => set({ menu: false }),

  dismissOutage: () => {
    set({ obOut: true });
    get().showToast("Banner hidden until the next update", "info");
  },

  /* -------------------------------------------------------- navigation */

  /* Every navigation restarts the 480 ms skeleton window (spec C §2.2). */
  go: (view, patch) => {
    const changed = get().view !== view;
    set({ view, menu: false, ...(patch ?? {}) });
    if (changed) get().startBusy(BUSY_NAV_MS);
    top();
  },

  goHome: () => get().go("home"),

  openCategory: (slug) => get().go("category", { catSlug: slug }),

  openArticle: (id) =>
    get().go("article", {
      articleId: id,
      feedback: null,
      q: "",
      searchFocus: false,
    }),

  openThread: (id) =>
    get().go("thread", { threadId: id, reply: "", typing: false }),

  openTicket: () => get().go("newticket", { errs: {} }),

  gotoKb: (q) =>
    get().go("kb", {
      searchFocus: false,
      ...(q === undefined ? {} : { kbQ: q }),
    }),

  gotoOverview: () => get().go("overview"),

  ovGo: (id) => {
    const s = get();
    if (id === "chat") {
      set({ chatOpen: true, menu: false });
      s.showToast("Chat opens over any screen", "info");
      return;
    }
    if (id === "category") return s.openCategory("setup");
    if (id === "article") return s.openArticle("a_doorbell_wifi");
    if (id === "thread") return s.openThread("HH-3117");
    if (id === "kb") return s.gotoKb("offline");
    if (id === "gift") return s.go("gift", { gcBought: null });
    if (id === "survey") return s.go("survey", { svDone: null });
    if (id === "tour") return s.go("tour", { tourStep: 0 });
    /* The delta screens that reset a done/step field on entry. */
    if (id === "deleteacct") return s.gotoDelete();
    if (id === "trade") return s.gotoTrade();
    if (id === "recycle") return s.gotoRecycle();
    if (id === "transfer") return s.gotoTransfer();
    if (id === "auto") return s.gotoAuto();
    return s.go(id);
  },

  /* ---------------------------------------------------- knowledge base */

  toggleSave: (id) => {
    const s = get();
    const saved = s.savedIds.includes(id);
    set({
      savedIds: saved
        ? s.savedIds.filter((x) => x !== id)
        : [id, ...s.savedIds],
    });
    s.showToast(saved ? "Removed from saved" : "Saved for later");
  },

  giveFeedback: (v) => {
    set({ feedback: v });
    get().showToast("Thanks for the feedback!");
  },

  /* -------------------------------------------------------- new ticket */

  setForm: (key, value) =>
    set((s) => {
      const errs = { ...s.errs };
      delete errs[key as string];
      return { form: { ...s.form, [key]: value }, errs };
    }),

  addAttachment: () => {
    const s = get();
    const next = dataSource
      .attachmentPool()
      .find((f) => !s.form.attachments.includes(f));
    if (!next) {
      s.showToast("That's all the demo files", "warn");
      return;
    }
    set({
      form: { ...s.form, attachments: [...s.form.attachments, next] },
    });
  },

  removeAttachment: (name) =>
    set((s) => ({
      form: {
        ...s.form,
        attachments: s.form.attachments.filter((f) => f !== name),
      },
    })),

  validateTicket: () => {
    const { form } = get();
    const errs: FormErrors = {};
    if (!form.product) errs.product = "Pick the product this is about";
    if (!form.topic) errs.topic = "Choose a topic";
    if (form.subject.trim().length < 4) errs.subject = "Add a short subject";
    if (form.desc.trim().length < 15)
      errs.desc = "Tell us a little more (at least 15 characters)";
    return errs;
  },

  submitTicket: () => {
    const s = get();
    const errs = s.validateTicket();
    if (Object.keys(errs).length) {
      set({ errs });
      s.showToast("Please fix the highlighted fields", "warn");
      return;
    }
    const res = threadReducer(s.thread, { type: "create", form: s.form });
    set({
      thread: res.state,
      view: "thread",
      threadId: res.ticketId,
      reply: "",
      typing: false,
      form: { ...EMPTY_FORM, attachments: [SEEDED_ATTACHMENT] },
      errs: {},
      menu: false,
    });
    s.showToast(`Ticket ${res.ticketId} created`);
    top();
  },

  /* ------------------------------------------------------------ thread */

  sendReply: () => {
    const s = get();
    const id = s.threadId;
    if (!id) return;
    const res = threadReducer(s.thread, { type: "reply", id, text: s.reply });
    if (res.noop) return;

    set({ thread: res.state, reply: "", typing: true });
    if (res.reopened) s.showToast("Ticket reopened");

    cancelAgentReply?.();
    cancelAgentReply = delay(TYPING_DELAY_MS, () => {
      const later = get();
      const next = threadReducer(later.thread, { type: "agentReply", id });
      set({ thread: next.state, typing: false });
      cancelAgentReply = null;
    });
  },

  markSolved: () => {
    const s = get();
    const id = s.threadId;
    if (!id) return;
    cancelAgentReply?.();
    cancelAgentReply = null;
    const res = threadReducer(s.thread, { type: "markSolved", id });
    set({ thread: res.state, typing: false });
    s.showToast("Marked as solved");
  },

  /* -------------------------------------------------- command palette */

  cpToggle: () =>
    set((s) =>
      s.cpOpen
        ? { cpOpen: false, cpQ: "", cpIndex: 0 }
        : { cpOpen: true, cpQ: "", cpIndex: 0, shortcuts: false },
    ),

  cpClose: () => set({ cpOpen: false, cpQ: "", cpIndex: 0 }),

  cpSetQuery: (q) => set({ cpQ: q, cpIndex: 0 }),

  cpMove: (delta, len) =>
    set((s) => ({
      cpIndex: len ? Math.max(0, Math.min(s.cpIndex + delta, len - 1)) : 0,
    })),

  cpAsk: () => {
    set({ cpOpen: false, cpQ: "", cpIndex: 0 });
    get().openTicket();
  },

  commands: () => {
    const s = get();
    const out: Command[] = [];

    for (const group of OV_GROUPS) {
      for (const [id, name, icon, blurb] of group.items) {
        out.push({
          id: `screen:${id}`,
          label: name,
          icon,
          group: group.name,
          hint: "Screen",
          words: blurb,
          run: () => s.ovGo(id),
        });
      }
    }

    out.push(
      {
        id: "act:theme",
        label: "Toggle light / dark theme",
        icon: "sun-moon",
        group: "Actions",
        hint: "t",
        words: "theme dark light appearance",
        run: () => s.toggleTheme(),
      },
      {
        id: "act:chat",
        label: "Open live chat",
        icon: "message-circle",
        group: "Actions",
        hint: "c",
        words: "chat agent talk human",
        run: () => s.openChat(),
      },
      {
        id: "act:ticket",
        label: "Open a new ticket",
        icon: "pen-line",
        group: "Actions",
        hint: "n",
        words: "support ask help ticket",
        run: () => s.openTicket(),
      },
      {
        id: "act:notifs",
        label: "Mark all notifications read",
        icon: "check-check",
        group: "Actions",
        hint: "Action",
        words: "notifications inbox clear",
        run: () => {
          set({ ntRead: dataSource.notifications().map((n) => n.id) });
          s.showToast("All notifications marked read");
        },
      },
      {
        id: "act:tour",
        label: "Start the onboarding tour",
        icon: "presentation",
        group: "Actions",
        hint: "Action",
        words: "tour welcome guide getting started",
        run: () => s.go("tour", { tourStep: 0 }),
      },
      {
        id: "act:shortcuts",
        label: "Show keyboard shortcuts",
        icon: "keyboard",
        group: "Actions",
        hint: "?",
        words: "shortcuts keys help",
        run: () => set({ shortcuts: true }),
      },
      {
        id: "act:fail",
        label: "Simulate a failed load",
        icon: "cloud-off",
        group: "Actions",
        hint: "Action",
        words: "error failure retry broken offline",
        run: () => s.failView(),
      },
      {
        id: "act:offline",
        /* A toggle, and deliberately silent. */
        label: "Simulate being offline",
        icon: "wifi-off",
        group: "Actions",
        hint: "Action",
        words: "offline connection network",
        run: () => s.toggleOffline(),
      },
    );

    for (const a of dataSource.articles()) {
      out.push({
        id: `article:${a.id}`,
        label: a.title,
        icon: "file-text",
        group: "Articles",
        hint: `${a.read} min`,
        words: a.snippet,
        run: () => s.openArticle(a.id),
      });
    }

    return out;
  },

  /* --------------------------------------------------------- shortcuts */

  scToggle: () => set((s) => ({ shortcuts: !s.shortcuts })),
  scClose: () => set({ shortcuts: false }),

  /* ----------------------------------------------------- accessibility */

  setA11ySize: (scale) =>
    set((s) => {
      const next = { ...s.a11y, size: scale };
      applyA11ySettings(next);
      return { a11y: next };
    }),

  setA11yPalette: (palette) =>
    set((s) => {
      const next = { ...s.a11y, palette };
      applyA11ySettings(next);
      return { a11y: next };
    }),

  toggleA11y: (id) =>
    set((s) => {
      const next: A11ySettings = {
        ...s.a11y,
        on: { ...s.a11y.on, [id]: !s.a11y.on[id] },
      };
      applyA11ySettings(next);
      return { a11y: next };
    }),

  saveA11y: () => {
    const s = get();
    s.showToast("Accessibility settings saved");
    s.succeed(
      "Settings saved",
      "These now apply across the help centre and the Hearth app on this account.",
      { label: "See it on Home", icon: "life-buoy", fn: () => get().goHome() },
    );
  },

  resetA11y: () => {
    const next = a11yReset();
    applyA11ySettings(next);
    set({ a11y: next });
    get().showToast("Reset to defaults");
  },

  /* -------------------------------------------------------- live chat */

  openChat: () => set({ chatOpen: true, menu: false, shortcuts: false }),

  closeChat: () => set({ chatOpen: false }),

  chatAsk: (index) => {
    const quick = CHAT_QUICK[index];
    if (!quick) return;
    const s = get();
    const msgs: ChatMessage[] = [
      ...s.chatMsgs,
      { id: s.chatMsgs.length + 1, who: "you", text: quick.label },
    ];
    set({ chatMsgs: msgs, chatTyping: true, chatQuick: false });
    cancelChatReply?.();
    cancelChatReply = delay(CHAT_TYPING_DELAY_MS, () => {
      const later = get();
      set({
        chatTyping: false,
        chatMsgs: [
          ...later.chatMsgs,
          {
            id: later.chatMsgs.length + 1,
            who: "bot",
            text: quick.reply,
            act: quick.act,
            actLabel: quick.actLabel,
            actIcon: quick.actIcon,
          },
        ],
      });
      cancelChatReply = null;
    });
  },

  chatSubmit: () => {
    const s = get();
    const text = s.chatInput.trim();
    if (!text) return;
    /* prior user messages — the index rotates 0,1,2,3,0,… deterministically */
    const prior = s.chatMsgs.filter((m) => m.who === "you").length;
    const msgs: ChatMessage[] = [
      ...s.chatMsgs,
      { id: s.chatMsgs.length + 1, who: "you", text },
    ];
    set({
      chatMsgs: msgs,
      chatInput: "",
      chatTyping: true,
      chatQuick: false,
    });
    cancelChatReply?.();
    cancelChatReply = delay(CHAT_TYPING_DELAY_MS, () => {
      const later = get();
      const escalate = prior >= 2;
      set({
        chatTyping: false,
        chatMsgs: [
          ...later.chatMsgs,
          {
            id: later.chatMsgs.length + 1,
            who: "bot",
            text: CHAT_REPLIES[prior % CHAT_REPLIES.length],
            ...(escalate
              ? {
                  act: "escalate",
                  actLabel: "Move this chat to a ticket",
                  actIcon: "ticket",
                }
              : {}),
          },
        ],
      });
      cancelChatReply = null;
    });
  },

  chatAct: (act) => {
    const s = get();
    if (act === "escalate") return s.escalateChat();
    if (act === "orders") s.go("orders");
    else if (act === "newticket") s.openTicket();
    else if (act.startsWith("article:")) s.openArticle(act.slice(8));
    set({ chatOpen: false });
  },

  escalateChat: () => {
    const s = get();
    const userMsgs = s.chatMsgs.filter((m) => m.who === "you");
    if (!userMsgs.length) {
      set({ chatOpen: false });
      s.openTicket();
      s.showToast("Tell us what's up and we'll open a ticket", "info");
      return;
    }

    const transcript: TicketMessage[] = s.chatMsgs.slice(1).map((m) => ({
      who: m.who === "you" ? "customer" : "agent",
      text: m.text,
      time: NOW_STAMP,
    }));

    const res = threadReducer(s.thread, {
      type: "createFromChat",
      product: inferProduct(userMsgs.map((m) => m.text).join(" ")),
      transcript,
      closer: CHAT_ESCALATION_CLOSER,
    });

    set({
      thread: res.state,
      view: "thread",
      threadId: res.ticketId,
      reply: "",
      typing: false,
      chatOpen: false,
      chatTyping: false,
      chatQuick: true,
      chatInput: "",
      chatMsgs: [dataSource.chatGreeting()],
      menu: false,
    });
    s.showToast(`Chat moved to ticket ${res.ticketId}`);
    top();
  },

  /* ==================================================================== *
   * delta                                                                *
   * ==================================================================== */

  /* ------------------------------------------ toasts, undo and success */

  undoToast: (msg, undo) => {
    get().showToast(msg, "ok", {
      label: "Undo",
      fn: () => {
        undo();
        if (toastTimer) clearTimeout(toastTimer);
        set({ toast: null });
        get().showToast("Put back");
      },
    });
  },

  runToastAction: () => {
    get().toast?.action?.fn();
  },

  succeed: (title, text, action = null) => {
    if (successTimer) clearTimeout(successTimer);
    set({ succ: { title, text, action } });
    successTimer = setTimeout(() => set({ succ: null }), SUCCESS_MS);
  },

  dismissSuccess: () => {
    if (successTimer) clearTimeout(successTimer);
    set({ succ: null });
  },

  runSuccessAction: () => {
    const action = get().succ?.action;
    get().dismissSuccess();
    action?.fn();
  },

  /* ------------------------------------------- busy, failure, offline */

  startBusy: (ms = BUSY_NAV_MS) => {
    if (busyTimer) clearTimeout(busyTimer);
    if (!get().busy) set({ busy: true });
    busyTimer = setTimeout(() => set({ busy: false }), ms);
  },

  bootBusy: () => get().startBusy(BUSY_MOUNT_MS),

  retryView: () => {
    const s = get();
    set({ failed: null });
    s.startBusy(BUSY_RETRY_MS);
    s.showToast(RETRY_TOAST, "info");
  },

  reportFailure: () => {
    const s = get();
    set({ failed: null });
    s.openTicket();
    s.showToast(REPORT_TOAST, "info");
  },

  failView: () => {
    const s = get();
    set({ failed: s.view });
    s.showToast(SIMULATE_FAIL_TOAST, "warn");
  },

  toggleOffline: () => set((s) => ({ offline: !s.offline })),

  setOffline: (offline) => set({ offline }),

  retryConnection: () => {
    const s = get();
    if (isOnline()) {
      set({ offline: false });
      s.showToast(OFFLINE_BACK_TOAST);
      return;
    }
    s.showToast(OFFLINE_STILL_TOAST, "warn");
  },

  /* --------------------------------------------------------- theme R3 */

  syncSystemTheme: (theme) => {
    if (!get().themeManual) set({ theme });
  },

  followSystemTheme: () => {
    set({ themeManual: false, theme: systemTheme() });
    get().showToast(FOLLOW_SYSTEM_TOAST);
  },

  /* -------------------------------------------------------- navigation */

  gotoLive: () => get().go("live"),
  gotoAuto: () => get().go("auto", { auNewOpen: false }),
  gotoBilling: () => get().go("billing"),
  gotoTransfer: () => get().go("transfer", { trDone: null }),
  gotoWish: () => get().go("wish"),
  gotoRecent: () => get().go("recent"),
  gotoStores: () => get().go("stores"),
  gotoBoard: () => get().go("board"),
  gotoBreach: () => get().go("breach"),
  gotoRecycle: () => get().go("recycle", { rcBooked: null }),
  gotoTrade: () => get().go("trade", { tdDone: null }),
  gotoShare: () => get().go("share"),
  gotoInsurance: () => get().go("insurance"),
  gotoGuide: () => get().go("guide"),
  gotoDelete: () => get().go("deleteacct", { dlStep: 1 }),

  /* --------------------------------------------------------- live view */

  playClip: (clip) => get().showToast(clipPlayToast(clip)),

  downloadClip: (clip) => get().showToast(clipDownloadToast(clip)),

  shareClipLink: () => get().showToast(CLIP_SHARE_TOAST),

  deleteClip: (clip) => {
    const s = get();
    set({ lvOut: [...s.lvOut, clip.id] });
    s.undoToast(CLIP_DELETE_TOAST, () =>
      set((cur) => ({ lvOut: cur.lvOut.filter((id) => id !== clip.id) })),
    );
  },

  runLiveControl: (control) => get().showToast(control.toast, "info"),

  /* Deliberately never succeeds — the seeded camera stays offline. */
  liveRetry: () =>
    get().showToast(liveRetryToast(dataSource.camera(get().lvCam)), "warn"),

  liveTroubleshoot: () => get().openArticle(LIVE_TROUBLESHOOT_ARTICLE),

  /* ------------------------------------------------------- automations */

  /**
   * The pause list and the rule's own `on` flag are kept in step, so a rule
   * seeded paused (`r4`) can be started again — the comp could not.
   */
  toggleAutomation: (id) => {
    const s = get();
    const rule = s.automations.find((r) => r.id === id);
    if (!rule) return;
    const nextOn = !isAutomationOn(rule, s.auOff);
    set({
      automations: s.automations.map((r) =>
        r.id === id ? { ...r, on: nextOn } : r,
      ),
      auOff: nextOn ? s.auOff.filter((x) => x !== id) : [...s.auOff, id],
    });
    s.showToast(automationToggleToast(rule, nextOn));
  },

  deleteAutomation: (id) => {
    const s = get();
    const rule = s.automations.find((r) => r.id === id);
    if (!rule) return;
    set({ auGone: [...s.auGone, id] });
    s.undoToast(automationDeleteToast(rule), () =>
      set((cur) => ({ auGone: cur.auGone.filter((x) => x !== id) })),
    );
  },

  toggleNewAutomation: () =>
    set((s) => ({
      auNewOpen: !s.auNewOpen,
      auName: "",
      auTrigger: "",
      auAction: "",
    })),

  saveAutomation: () => {
    const s = get();
    if (!s.auName.trim()) {
      s.showToast(AU_NAME_TOAST, "warn");
      return;
    }
    const trigger = dataSource
      .automationTriggers()
      .find((t) => t.value === s.auTrigger);
    if (!trigger) {
      s.showToast(AU_TRIGGER_TOAST, "warn");
      return;
    }
    const action = dataSource
      .automationActions()
      .find((a) => a.value === s.auAction);
    if (!action) {
      s.showToast(AU_ACTION_TOAST, "warn");
      return;
    }
    const rule = buildAutomation({
      id: nextAutomationId(s.automations.length),
      name: s.auName.trim(),
      trigger,
      action,
    });
    set({
      automations: [rule, ...s.automations],
      auNewOpen: false,
      auName: "",
      auTrigger: "",
      auAction: "",
    });
    s.showToast(AU_CREATED_TOAST);
  },

  /* ----------------------------------------------------------- billing */

  applyCredit: () => {
    const s = get();
    if (s.blCredit > 0) {
      s.showToast(`${money(s.blCredit)} will come off your next invoice`);
      return;
    }
    s.showToast("No credit on the account", "info");
  },

  updateCard: () => get().showToast("Card changes happen in the Hearth app", "info"),

  exportInvoices: () => get().showToast(`Downloading ${INVOICE_EXPORT_FILE}`),

  downloadInvoice: (invoice) => get().showToast(invoiceDownloadToast(invoice)),

  /* ---------------------------------------------------------- wishlist */

  wishAdd: (item) => get().showToast(wishAddToast(item)),

  wishRemove: (item) => {
    const s = get();
    set({ wlOut: [...s.wlOut, item.id] });
    s.undoToast(`${item.name} removed`, () =>
      set((cur) => ({ wlOut: cur.wlOut.filter((id) => id !== item.id) })),
    );
  },

  wishAddAll: () => {
    const s = get();
    const inStock = visibleWish(dataSource.wishlist(), s.wlOut).filter(
      (w) => w.stock !== "out",
    );
    if (!inStock.length) {
      s.showToast("Nothing in stock to add yet", "warn");
      return;
    }
    const label = pluralise(inStock.length, "item");
    s.showToast(`${label} added`);
    s.succeed(`${label} in your basket`, FREE_DELIVERY_LINE, {
      label: "View basket",
      icon: "shopping-basket",
      fn: () => get().go("parts"),
    });
  },

  wishShare: () =>
    get().showToast("Wishlist link copied — anyone can view it"),

  wishRestore: () => {
    set({ wlOut: [] });
    get().showToast("Demo wishlist restored");
  },

  saveToWishlist: (name) => get().showToast(`${name} saved to your wishlist`),

  /* --------------------------------------------------- recently viewed */

  openRecent: (entry) => {
    const s = get();
    if (entry.kind === "article" && entry.ref) {
      s.openArticle(entry.ref);
      return;
    }
    s.go("parts");
    s.showToast(`Opening ${entry.name ?? "it"} in the store`, "info");
  },

  recentSecondary: (entry) => {
    const s = get();
    if (entry.kind === "article" && entry.ref) {
      s.toggleSave(entry.ref);
      return;
    }
    s.saveToWishlist(entry.name ?? "It");
  },

  recentForget: (entry) => {
    const s = get();
    set({ rvOut: [...s.rvOut, entry.id] });
    s.undoToast("Removed from history", () =>
      set((cur) => ({ rvOut: cur.rvOut.filter((id) => id !== entry.id) })),
    );
  },

  recentClear: () => {
    const s = get();
    const before = [...s.rvOut];
    set({
      rvOut: dataSource.recentlyViewed().map((e) => e.id),
      rvCleared: true,
    });
    s.undoToast("History cleared", () =>
      set({ rvOut: before, rvCleared: false }),
    );
  },

  recentRestore: () => {
    set({ rvOut: [], rvCleared: false });
    get().showToast("Demo history restored");
  },

  /* ----------------------------------------------------- store locator */

  storeSearch: () => {
    const s = get();
    const found = filterStores(dataSource.stores(), s.stQ, s.stFilter);
    s.showToast(
      storeSearchToast(found.length, s.stQ),
      found.length ? "ok" : "warn",
    );
  },

  storeSearchKey: () => {
    const s = get();
    const found = filterStores(dataSource.stores(), s.stQ, s.stFilter);
    s.showToast(storeKeyToast(found.length));
  },

  storeNearMe: () => {
    set({ stQ: "Bristol", stFilter: "all" });
    get().showToast("Using your last known area — Bristol", "info");
  },

  storeReset: () => set({ stQ: "", stFilter: "all" }),

  storeDirections: (name) => get().showToast(`Directions to ${name} copied`),

  storeCall: () => get().showToast("Calling isn't available in this demo", "info"),

  storeBook: (store) => {
    const s = get();
    s.go("repair");
    s.showToast(`Pick a walk-in slot at ${store.name}`, "info");
  },

  /* ----------------------------------------------------- breach notice */

  /* Typing clears the last verdict. */
  setBreachEmail: (value) => set({ brEmail: value, brResult: null }),

  breachCheck: () => {
    const s = get();
    const email = s.brEmail.trim().toLowerCase();
    if (email.indexOf("@") < 1) {
      /* No toast on this branch, by design. */
      set({
        brResult: {
          kind: "info",
          icon: "info",
          text: "Enter the email address you use for your Hearth account.",
        },
      });
      return;
    }
    const hit = email === BREACH_HIT_EMAIL || email.startsWith("sam");
    const result: BreachResult = hit
      ? {
          kind: "hit",
          icon: "shield-alert",
          text: "This address was in the exposed set. We emailed you on 24 July. Nothing else of yours was involved — the steps below are all we’d suggest.",
        }
      : {
          kind: "clear",
          icon: "shield-check",
          text: "This address wasn’t in the exposed set. Nothing to do, though two-factor authentication is always worth turning on.",
        };
    set({ brResult: result });
    s.showToast("Checked against the exposed list");
  },

  breachReport: () => {
    const s = get();
    s.openTicket();
    s.showToast("Tell us what you received", "info");
  },

  /* --------------------------------------------------------- recycling */

  toggleRecycleItem: (id) =>
    set((s) => ({
      rcOn: s.rcOn.includes(id)
        ? s.rcOn.filter((x) => x !== id)
        : [...s.rcOn, id],
    })),

  setRecyclePostcode: (value) => set({ rcPostcode: value.toUpperCase() }),

  recycleSubmit: () => {
    const s = get();
    if (!s.rcOn.length) {
      s.showToast("Pick at least one thing to recycle", "warn");
      return;
    }
    if (s.rcPostcode.trim().length < 3) {
      s.showToast("Add your postcode", "warn");
      return;
    }
    const method =
      dataSource.recycleMethods().find((m) => m.id === s.rcMethod) ??
      dataSource.recycleMethods()[0];
    const title =
      s.rcMethod === "post"
        ? "Label on its way"
        : s.rcMethod === "drop"
          ? "Drop-off reserved"
          : "Collection booked";
    const booking: RecycleBooking = {
      ref: recycleRef(s.rcOn.length),
      method: method.label,
      title,
      text: `${method.done} We’ll email a certificate once it’s processed, and confirm what was reused versus recycled.`,
    };
    set({ rcBooked: booking });
    s.showToast("Recycling arranged");
    top();
  },

  recycleReset: () => set({ rcBooked: null }),

  /* --------------------------------------------------- account deletion */

  toggleDeleteCheck: (id) =>
    set((s) => ({
      dlOn: s.dlOn.includes(id)
        ? s.dlOn.filter((x) => x !== id)
        : [...s.dlOn, id],
    })),

  deleteBack: () => {
    set((s) => ({ dlStep: (s.dlStep > 1 ? s.dlStep - 1 : 1) as 1 | 2 | 3 }));
    top();
  },

  /* Never disabled — step 3 warns instead of blocking. */
  deleteNext: () => {
    const s = get();
    if (s.dlStep < 3) {
      set({ dlStep: (s.dlStep + 1) as 2 | 3 });
      top();
      return;
    }
    const ok =
      s.dlOn.length >= 3 && s.dlPhrase.trim().toUpperCase() === "DELETE";
    if (!ok) {
      s.showToast("Tick all three and type DELETE to confirm", "warn");
      return;
    }
    const scheduled: DeleteSchedule = {
      ref: deleteRef(s.dlOn.length),
      date: DL_SCHEDULED_DATE,
    };
    set({ dlScheduled: scheduled });
    /* Deliberately `warn`, not `ok`. */
    s.showToast("Deletion scheduled for 26 August", "warn");
    top();
  },

  deleteCancel: () => {
    const s = get();
    set({ dlScheduled: null, dlStep: 1, dlOn: [], dlPhrase: "" });
    s.showToast("Deletion cancelled — welcome back");
    s.succeed(
      "Your account is staying",
      "Nothing was deleted and everything is exactly where you left it.",
    );
  },

  /* ------------------------------------------------------ shared clips */

  toggleShareNew: () => set((s) => ({ shNewOpen: !s.shNewOpen })),

  toggleShareOption: (id) =>
    set((s) => ({
      shOn: s.shOn.includes(id)
        ? s.shOn.filter((x) => x !== id)
        : [...s.shOn, id],
    })),

  /* No validation — creating a link always succeeds. */
  shareCreate: () => {
    const s = get();
    const clips = dataSource.clips();
    const clip = clips.find((c) => c.id === s.shClip) ?? clips[0];
    const audience =
      dataSource.shareAudiences().find((a) => a.value === s.shAudience) ??
      dataSource.shareAudiences()[0];
    const expiry =
      dataSource.shareExpiries().find((e) => e.value === s.shExpiry) ??
      dataSource.shareExpiries()[0];
    const link = newShareLink({
      clip,
      audience,
      expiry,
      count: s.shareLinks.length,
      host: SHARE_HOST,
    });
    set({ shareLinks: [link, ...s.shareLinks], shNewOpen: false });
    s.showToast("Share link created");
    s.succeed(
      "Link ready to send",
      "Copy it from the top of the list. You can revoke it at any point and the link dies instantly.",
    );
  },

  shareCopy: () => get().showToast("Link copied"),

  shareExtend: (link) => get().showToast(shareExtendToast(link.state)),

  shareRevoke: (link) => {
    const s = get();
    set({ shOut: [...s.shOut, link.id] });
    s.undoToast("Link revoked", () =>
      set((cur) => ({ shOut: cur.shOut.filter((id) => id !== link.id) })),
    );
  },

  /* --------------------------------------------------- insurance claims */

  setInsuranceNote: (value) => set({ inNote: value.slice(0, NOTE_MAX) }),

  insurancePrimary: (claim) => {
    const s = get();
    if (claim.state === "ready") {
      s.showToast(`Downloading ${claim.id.toUpperCase()}-evidence.zip`);
      return;
    }
    s.showToast("Still building — about 4 minutes left", "info");
  },

  insuranceShare: () => {
    const s = get();
    s.go("share");
    s.showToast("Send it as an expiring link", "info");
  },

  /* Nothing is appended to the claim list — only the banner appears. */
  insuranceSubmit: () => {
    const s = get();
    if (!s.inDate) {
      s.showToast("When did it happen?", "warn");
      return;
    }
    if (s.inNote.trim().length < 15) {
      s.showToast("Add a line or two for the adjuster", "warn");
      return;
    }
    s.showToast("Building your evidence pack");
    s.succeed(
      "Pack requested",
      "We’re collecting the clips and signing the timestamp log. You’ll get an email when it’s ready — usually within the hour.",
    );
  },

  /* -------------------------------------------------------- gift guide */

  addToBasketByName: (name) => get().showToast(`${name} added to your basket`),

  /* ----------------------------------------------------- trade account */

  setTradeCompany: (value) => set({ tdCo: value.toUpperCase() }),
  setTradeVat: (value) => set({ tdVat: value.toUpperCase() }),
  setTradeNote: (value) => set({ tdNote: value.slice(0, NOTE_MAX) }),

  toggleTradeSkill: (label) =>
    set((s) => ({
      tdSkillsOn: s.tdSkillsOn.includes(label)
        ? s.tdSkillsOn.filter((x) => x !== label)
        : [...s.tdSkillsOn, label],
    })),

  toggleTradeCheck: (id) =>
    set((s) => ({
      tdOn: s.tdOn.includes(id)
        ? s.tdOn.filter((x) => x !== id)
        : [...s.tdOn, id],
    })),

  tradeSubmit: () => {
    const s = get();
    if (!s.tdName.trim()) {
      s.showToast("What’s the trading name?", "warn");
      return;
    }
    if (!s.tdType) {
      s.showToast("Pick a business type", "warn");
      return;
    }
    if (!s.tdContact.trim()) {
      s.showToast("Who should we deal with?", "warn");
      return;
    }
    if (!looksLikeEmail(s.tdEmail)) {
      s.showToast("Add a work email address", "warn");
      return;
    }
    if (s.tdPhone.replace(/\D/g, "").length < 9) {
      s.showToast("Add a phone number we can reach you on", "warn");
      return;
    }
    if (!s.tdSkillsOn.length) {
      s.showToast("Tell us what you fit", "warn");
      return;
    }
    if (s.tdOn.length < 2) {
      s.showToast("Tick both confirmations to apply", "warn");
      return;
    }
    const tier = dataSource.tradeTier(s.tdTier);
    const name = s.tdName.trim();
    const email = s.tdEmail.trim();
    const done: TradeApplication = {
      ref: tradeRef(name.length),
      tier: `${tier.name} · ${tier.discount}`,
      text: `We’ll review ${name} within two working days and email ${email} either way. If we need your insurance certificate, that email will say so — nothing else to send for now.`,
    };
    set({ tdDone: done });
    s.showToast("Trade application sent");
    top();
  },

  tradeReset: () => set({ tdDone: null }),

  /* ------------------------------------------------- warranty transfer */

  toggleTransferCheck: (id) =>
    set((s) => ({
      trOn: s.trOn.includes(id)
        ? s.trOn.filter((x) => x !== id)
        : [...s.trOn, id],
    })),

  /**
   * The one destructive cross-screen side effect: a successful transfer also
   * removes the device from the Warranty screen's registered list.
   */
  transferSubmit: () => {
    const s = get();
    if (!s.trName.trim()) {
      s.showToast("Who are you transferring it to?", "warn");
      return;
    }
    if (!looksLikeEmail(s.trEmail)) {
      s.showToast("Add the new owner's email", "warn");
      return;
    }
    if (!s.trReason) {
      s.showToast("Pick a reason for the transfer", "warn");
      return;
    }
    if (s.trOn.length < 2) {
      s.showToast("Tick both confirmations to continue", "warn");
      return;
    }
    const device = s.registered.find((d) => d.id === s.trDev);
    if (!device) {
      s.showToast("Pick the device you're handing over", "warn");
      return;
    }
    const product = dataSource.product(device.prod);
    transferSeq += 1;
    const receipt: TransferReceipt = {
      ref: transferRef(device.serial, transferSeq),
      serial: device.serial,
      name: product.model,
      to: s.trName.trim(),
      email: s.trEmail.trim(),
    };
    const rest = s.registered.filter((d) => d.id !== device.id);
    set({ registered: rest, trDone: receipt, trDev: rest[0]?.id ?? null });
    s.showToast(`${product.model} transfer started`);
    top();
  },

  transferReset: () =>
    set((s) => ({ trDone: null, trDev: s.registered[0]?.id ?? null })),
}));

/* ------------------------------------------------------------- selectors */

/**
 * My tickets rows — newest activity first.
 *
 * This builds a NEW array, so never pass it straight to `useAppStore(...)`:
 * zustand v5 requires a stable snapshot and will loop. Use `useTickets()` in
 * components; this pure form is for tests and non-hook callers.
 */
export function selectTickets(s: AppState): Ticket[] {
  return ticketList(s.thread);
}

/** The memoised hook form of `selectTickets`. */
export function useTickets(): Ticket[] {
  const thread = useAppStore((s) => s.thread);
  return useMemo(() => ticketList(thread), [thread]);
}

/** The currently open ticket, if any. */
export function selectThreadTicket(s: AppState): Ticket | undefined {
  return s.threadId ? s.thread.tickets[s.threadId] : undefined;
}

/** The chat can escalate once there is at least one user message. */
export function selectCanEscalate(s: AppState): boolean {
  return s.chatMsgs.some((m) => m.who === "you") && !s.chatTyping;
}

/** The outage banner shows unless dismissed, healthy, or already on `status`. */
export function selectOutageVisible(s: AppState): boolean {
  if (s.obOut || s.view === "status") return false;
  return dataSource.statusComponents().some((c) => c.st !== "ok");
}

/** The agent + customer identities the thread and chat render. */
export const IDENTITY = { agent: AGENT, customer: CUSTOMER };

/** First product whose name or id appears in the text; falls back to doorbell. */
export function inferProduct(text: string): ProductId {
  const t = text.toLowerCase();
  const hit = PRODUCTS.find(
    (p) => t.includes(p.name.toLowerCase()) || t.includes(p.id),
  );
  return hit ? hit.id : "doorbell";
}
