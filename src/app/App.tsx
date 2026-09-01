/*
 * App — the whole portal.
 *
 * Routing is the `view` string on the Zustand store (house rule: no router).
 * `renderView` is an exhaustive switch over all 54 ViewIds, so adding a view
 * to the union without adding a screen here is a compile error rather than a
 * blank page.
 *
 * Everything around the switch is the global chrome: the outage banner, the
 * sticky header, the mobile sheet, the breadcrumb trail, the offline strip,
 * the success banner, the footer, and the four overlays (toast, command
 * palette, shortcuts modal, chat widget).
 *
 * Ruling R5: nothing here measures the window. The 560 / 980 / 1120 / 1800
 * switches are real CSS media queries in base.css and components.css.
 *
 * Ruling R6: the loading / error / screen precedence is one early return via
 * `viewGate()`, not the comp's `is*` string-prefix suppression sweep.
 */

import { useEffect, useRef } from "react";
import {
  AddOnsDrawer,
  Breadcrumbs,
  ChatWidget,
  CommandPalette,
  ErrorScreen,
  Footer,
  Header,
  MobileSheet,
  OfflineBanner,
  OutageBanner,
  ShortcutsOverlay,
  SkeletonScreen,
  SuccessBanner,
  Toast,
} from "../components";
import { CHORD_MAP } from "../components/chrome";
import { applyA11ySettings, watchReducedMotion } from "../lib/a11y";
import { forcedErrorMode, isOnline, viewGate, watchConnection } from "../lib/errors";
import { systemTheme, watchSystemTheme } from "../lib/theme";
import { useI18n } from "../i18n";
import { setAmbient } from "../i18n/ambient";
import { CHORD_MS, useAppStore } from "../state/store";
import type { ViewId } from "../data/types";

import A11y from "../screens/A11y";
import About from "../screens/About";
import Appts from "../screens/Appts";
import Article from "../screens/Article";
import Auto from "../screens/Auto";
import Billing from "../screens/Billing";
import Board from "../screens/Board";
import Breach from "../screens/Breach";
import Bundles from "../screens/Bundles";
import Category from "../screens/Category";
import Claim from "../screens/Claim";
import Contact from "../screens/Contact";
import DeleteAcct from "../screens/DeleteAcct";
import Devices from "../screens/Devices";
import Downloads from "../screens/Downloads";
import Energy from "../screens/Energy";
import Firmware from "../screens/Firmware";
import Forum from "../screens/Forum";
import Gift from "../screens/Gift";
import Guide from "../screens/Guide";
import Home from "../screens/Home";
import Imprint from "../screens/Imprint";
import Installers from "../screens/Installers";
import Insurance from "../screens/Insurance";
import Kb from "../screens/Kb";
import Live from "../screens/Live";
import Members from "../screens/Members";
import MyTickets from "../screens/MyTickets";
import NewTicket from "../screens/NewTicket";
import NotFound from "../screens/NotFound";
import Notifs from "../screens/Notifs";
import Orders from "../screens/Orders";
import Overview from "../screens/Overview";
import Partner from "../screens/Partner";
import Parts from "../screens/Parts";
import Plans from "../screens/Plans";
import Recent from "../screens/Recent";
import Recycle from "../screens/Recycle";
import Refer from "../screens/Refer";
import Repair from "../screens/Repair";
import Returns from "../screens/Returns";
import Saved from "../screens/Saved";
import Security from "../screens/Security";
import Share from "../screens/Share";
import Status from "../screens/Status";
import Stores from "../screens/Stores";
import Survey from "../screens/Survey";
import Thread from "../screens/Thread";
import Tour from "../screens/Tour";
import Trade from "../screens/Trade";
import TradeIn from "../screens/TradeIn";
import Transfer from "../screens/Transfer";
import Warranty from "../screens/Warranty";
import Wish from "../screens/Wish";

/* --------------------------------------------------------------- routing */

/** Exhaustive over ViewId — TypeScript enforces the 54. */
function renderView(view: ViewId) {
  switch (view) {
    case "home":
      return <Home />;
    case "kb":
      return <Kb />;
    case "category":
      return <Category />;
    case "article":
      return <Article />;
    case "newticket":
      return <NewTicket />;
    case "mytickets":
      return <MyTickets />;
    case "thread":
      return <Thread />;
    case "orders":
      return <Orders />;
    case "forum":
      return <Forum />;
    case "about":
      return <About />;
    case "contact":
      return <Contact />;
    case "imprint":
      return <Imprint />;
    case "warranty":
      return <Warranty />;
    case "claim":
      return <Claim />;
    case "returns":
      return <Returns />;
    case "appts":
      return <Appts />;
    case "firmware":
      return <Firmware />;
    case "repair":
      return <Repair />;
    case "refer":
      return <Refer />;
    case "downloads":
      return <Downloads />;
    case "status":
      return <Status />;
    case "tradein":
      return <TradeIn />;
    case "installers":
      return <Installers />;
    case "parts":
      return <Parts />;
    case "a11y":
      return <A11y />;
    case "overview":
      return <Overview />;
    case "gift":
      return <Gift />;
    case "plans":
      return <Plans />;
    case "security":
      return <Security />;
    case "survey":
      return <Survey />;
    case "devices":
      return <Devices />;
    case "energy":
      return <Energy />;
    case "saved":
      return <Saved />;
    case "tour":
      return <Tour />;
    case "bundles":
      return <Bundles />;
    case "members":
      return <Members />;
    case "notifs":
      return <Notifs />;
    case "partner":
      return <Partner />;

    /* --- the fifteen views added by the revised comp --- */
    case "live":
      return <Live />;
    case "auto":
      return <Auto />;
    case "billing":
      return <Billing />;
    case "transfer":
      return <Transfer />;
    case "wish":
      return <Wish />;
    case "recent":
      return <Recent />;
    case "stores":
      return <Stores />;
    case "board":
      return <Board />;
    case "breach":
      return <Breach />;
    case "recycle":
      return <Recycle />;
    case "trade":
      return <Trade />;
    case "share":
      return <Share />;
    case "insurance":
      return <Insurance />;
    case "guide":
      return <Guide />;
    case "deleteacct":
      return <DeleteAcct />;

    case "404":
      return <NotFound />;
    default: {
      /* Unreachable while the switch stays exhaustive. */
      const never: never = view;
      void never;
      return <NotFound />;
    }
  }
}

/* ------------------------------------------------------------- the shell */

export function App() {
  const view = useAppStore((s) => s.view);
  const theme = useAppStore((s) => s.theme);
  const a11y = useAppStore((s) => s.a11y);
  const busy = useAppStore((s) => s.busy);
  const failed = useAppStore((s) => s.failed);

  /*
   * Publish the live locale to the module-level bridge before anything below
   * renders. `src/lib/` and the store produce customer-visible strings outside
   * React and cannot hold a hook; this is the one place that knows both sides.
   * Assigning during render (rather than in an effect) matters: children render
   * after this line, so the first paint after a locale switch is already in the
   * new locale instead of one frame behind.
   *
   * Consuming the context here is also what makes the switch felt: `children`
   * is a stable element created in main.tsx, so React would otherwise bail out
   * of re-rendering this subtree when only the provider's value changed.
   */
  const { locale, t, money, number, date } = useI18n();
  setAmbient(locale, t, money, number, date);

  /* --- theme: an explicit stamp always beats prefers-color-scheme --- */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  /* --- accessibility: stamp on mount, and re-stamp when the OS flips --- */
  useEffect(() => {
    applyA11ySettings(a11y);
  }, [a11y]);

  useEffect(
    () =>
      watchReducedMotion(() => {
        applyA11ySettings(useAppStore.getState().a11y);
      }),
    [],
  );

  /* --- ruling R3: resolve the OS theme on mount, then keep tracking it
   * until the user toggles by hand. `syncSystemTheme` is the guard. --- */
  useEffect(() => {
    const { syncSystemTheme } = useAppStore.getState();
    syncSystemTheme(systemTheme());
    return watchSystemTheme((next) => {
      useAppStore.getState().syncSystemTheme(next);
    });
  }, []);

  /* --- spec C §2.1: the browser's own connection state --- */
  useEffect(() => {
    const { setOffline } = useAppStore.getState();
    if (!isOnline()) setOffline(true);
    return watchConnection((offline) => {
      useAppStore.getState().setOffline(offline);
    });
  }, []);

  /* --- spec C §2.2: 620 ms of skeleton on first paint; `go()` owns the
   * 480 ms window on every navigation after that. --- */
  useEffect(() => {
    useAppStore.getState().bootBusy();
  }, []);

  useGlobalShortcuts();

  const gate = viewGate({ view, busy, failed, forced: forcedErrorMode() });

  return (
    <div className="app-root">
      <OutageBanner />
      <Header />
      <MobileSheet />
      <div className="app-main">
        <Breadcrumbs />
        <OfflineBanner />
        <SuccessBanner />
        {gate === "loading" ? (
          <SkeletonScreen />
        ) : gate === "error" ? (
          <ErrorScreen />
        ) : (
          renderView(view)
        )}
      </div>
      <Footer />

      <Toast />
      <CommandPalette />
      <ShortcutsOverlay />
      <ChatWidget />
      <AddOnsDrawer />
    </div>
  );
}

/* --------------------------------------------------------- the key layer */

/** True while the user is typing somewhere a bare letter must not be a hotkey. */
function isTyping(): boolean {
  const el = document.activeElement;
  return (
    el instanceof HTMLElement &&
    (el.tagName === "INPUT" ||
      el.tagName === "TEXTAREA" ||
      el.tagName === "SELECT" ||
      el.isContentEditable)
  );
}

/**
 * The document-level shortcuts (port spec §5.5).
 *
 * `/` belongs to the header, and Escape inside a trapped overlay belongs to
 * that overlay; both are handled where they are owned. Everything else — the
 * palette, the `g` chords and the four single-key actions — lives here.
 */
function useGlobalShortcuts(): void {
  const chord = useRef<{ armed: boolean; timer: number | null }>({
    armed: false,
    timer: null,
  });

  useEffect(() => {
    const held = chord.current;

    const disarm = () => {
      held.armed = false;
      if (held.timer !== null) {
        clearTimeout(held.timer);
        held.timer = null;
      }
    };

    const onKey = (e: KeyboardEvent) => {
      const s = useAppStore.getState();

      /* ⌘K / Ctrl+K works even inside a field. */
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        disarm();
        s.cpToggle();
        return;
      }

      if (e.key === "Escape") {
        disarm();
        /* The overlays that trap focus close themselves; this is the
         * catch-all for when focus sits on the page behind them. */
        if (s.cpOpen) s.cpClose();
        else if (s.shortcuts) s.scClose();
        else if (s.menu) s.closeMenu();
        else if (s.chatOpen) s.closeChat();
        return;
      }

      if (isTyping() || e.metaKey || e.ctrlKey || e.altKey) return;

      /* Second half of a `g` chord. */
      if (held.armed) {
        const target = CHORD_MAP[e.key.toLowerCase()];
        disarm();
        if (target) {
          e.preventDefault();
          s.go(target);
          return;
        }
      }

      switch (e.key) {
        case "g":
          e.preventDefault();
          disarm();
          held.armed = true;
          held.timer = window.setTimeout(disarm, CHORD_MS);
          return;
        case "?":
          e.preventDefault();
          s.scToggle();
          return;
        case "n":
          e.preventDefault();
          s.openTicket();
          return;
        case "c":
          e.preventDefault();
          s.openChat();
          return;
        case "t":
          e.preventDefault();
          s.toggleTheme();
          return;
        default:
          return;
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      disarm();
    };
  }, []);
}

export default App;
