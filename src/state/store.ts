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
  CHAT_ESCALATION_CLOSER,
  CHAT_QUICK,
  CHAT_REPLIES,
  CUSTOMER,
  OV_GROUPS,
  PRODUCTS,
  SEEDED_ATTACHMENT,
} from "../data/demo";
import { dataSource } from "../data/source";
import {
  A11Y_INITIAL,
  a11yReset,
  applyA11ySettings,
  chime,
} from "../lib/a11y";
import { NOW_STAMP } from "../lib/format";
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

/** The `g`-chord window. */
export const CHORD_MS = 1400;

/** Blur-close delays for the two search dropdowns. */
export const HEADER_BLUR_MS = 140;
export const HERO_BLUR_MS = 150;

let toastTimer: ReturnType<typeof setTimeout> | null = null;
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
}

export interface AppActions {
  /** The escape hatch: shallow-merge any slice of state. */
  set: (patch: Partial<AppState>) => void;

  /* shell */
  showToast: (msg: string, kind?: ToastKind) => void;
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
  };
}

/* ------------------------------------------------------------------ store */

export const useAppStore = create<Store>((set, get) => ({
  ...initialState(),

  set: (patch) => set(patch),

  /* ------------------------------------------------------------- shell */

  showToast: (msg, kind = "ok") => {
    if (toastTimer) clearTimeout(toastTimer);
    set({ toast: { msg, kind } });
    chime(kind, get().a11y);
    toastTimer = setTimeout(() => set({ toast: null }), TOAST_MS);
  },

  clearToast: () => {
    if (toastTimer) clearTimeout(toastTimer);
    set({ toast: null });
  },

  toggleTheme: () =>
    set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),

  openMenu: () => set({ menu: true }),
  closeMenu: () => set({ menu: false }),

  dismissOutage: () => {
    set({ obOut: true });
    get().showToast("Banner hidden until the next update", "info");
  },

  /* -------------------------------------------------------- navigation */

  go: (view, patch) => {
    set({ view, menu: false, ...(patch ?? {}) });
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

  saveA11y: () => get().showToast("Accessibility settings saved"),

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
