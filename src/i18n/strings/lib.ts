/**
 * Area: lib — the `src/lib/` layer. Formatters, validators, derived labels and
 * any prose constant that reaches the UI (`derive.ts`, `clips.ts`, `errors.ts`,
 * `thread.ts`, `automations.ts`, `search.ts`).
 *
 * Counted nouns do NOT belong here: they are already authored as `count.*` in
 * `./chrome.ts` and reached through `countOf()` in `lib/format.ts`.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * Two conventions this file follows, both inherited from `./chrome.ts`:
 *
 * 1. `|` variants appear ONLY on the handful of keys whose call site passes a
 *    `count`, and only in the locales whose wording actually changes with the
 *    number. A frame that reads the same for every count is authored as a
 *    single variant — the runtime never splits a message without a `|`.
 *    The keys with variants are `lib.wish.dropMany`, `lib.board.gapLine`,
 *    `lib.stores.foundToast` and `lib.recent.intro`.
 *
 * 2. Variant order is the locale's own CLDR cardinal order:
 *      en/de/fr/da  one | other
 *      cs           one | few | other
 *      zh-CN/zh-TW  other            (a single variant, no `|`)
 *      ar           zero | one | two | few | many | other
 *
 * Never translated anywhere below: `Hearth` and `Hearth Family` (the in-demo
 * brand and its plan name), `Wi-Fi`, `CSV`, `PDF`, and every `{placeholder}`.
 * ────────────────────────────────────────────────────────────────────────────
 */
import type { LocaleTag } from '../locales';

export const lib = {
  'en-US': {
    /* ---------------------------------------------------------- format */
    'lib.format.planPriceFree': "Free",
    'lib.format.readTime': "{minutes} min read",
    'lib.format.readTimeShort': "{minutes} min",
    'lib.format.justNow': "Just now",
    'lib.format.updatedLine': "Updated {when} · {product}",

    /* ---------------------------------------------------------- stores */
    'lib.stores.kindFlagship': "Hearth store",
    'lib.stores.kindStockist': "Stockist",
    'lib.stores.kindRecycling': "Recycling point",
    'lib.stores.meta': "{hours} · {state}",
    'lib.stores.openNow': "open now",
    'lib.stores.closedNow': "closed now",
    'lib.stores.emptyQuery': "Nothing near “{query}”",
    'lib.stores.emptyFilter': "No locations in this filter",
    'lib.stores.searchNone': "Nothing matched that search",
    'lib.stores.searchNearQuery': "{locations} near {query}",
    'lib.stores.searchNearYou': "{locations} near you",
    'lib.stores.foundToast': "{locations} found",

    /* --------------------------------------------------------- billing */
    'lib.billing.statusPaid': "Paid",
    'lib.billing.statusRefunded': "Refunded",
    'lib.billing.statusRetrying': "Retrying",
    'lib.billing.emptyPeriodTitle': "No invoices in that period",
    'lib.billing.emptyPeriodText':
      "Nothing was issued while you were on this account in that period. Invoices appear the day they're raised, and we keep seven years of them.",
    'lib.billing.emptyFilterTitle': "Nothing in this filter",
    'lib.billing.emptyFilterPlan':
      "No plan invoices in this period — try another filter, or export everything as a CSV.",
    'lib.billing.emptyFilterHardware':
      "No hardware invoices in this period — try another filter, or export everything as a CSV.",
    'lib.billing.emptyFilterRefund':
      "No refunds in this period — try another filter, or export everything as a CSV.",
    'lib.billing.intro':
      "Every invoice since you joined, plus what's coming next. Downloads are PDFs with VAT broken out.",
    'lib.billing.planFree': "free",
    'lib.billing.perYear': "{price} / year",
    'lib.billing.perMonth': "{price} / month",
    'lib.billing.noCharge': "Nothing to bill — the free tier has no charges.",
    'lib.billing.nextCharge': "Next charge {date}, taken from the card below.",
    'lib.billing.retryingPayment': "Retrying payment for {id}",
    'lib.billing.downloading': "Downloading {file}",

    /* ------------------------------------------------------------ wish */
    'lib.wish.stockIn': "In stock",
    'lib.wish.stockLow': "Low stock",
    'lib.wish.stockOut': "Back in 2 weeks",
    'lib.wish.intro':
      "{n} saved · we watch the price and tell you when something moves.",
    'lib.wish.introEmpty': "Nothing saved right now.",
    'lib.wish.dropOne': "{name} has dropped {amount} since you saved it.",
    'lib.wish.dropMany':
      "{n} item has dropped in price since you saved it.|{n} items have dropped in price since you saved them.",
    'lib.wish.addOut': "We'll email you when it's back",
    'lib.wish.added': "{name} added to your basket",

    /* ---------------------------------------------------------- recent */
    'lib.recent.intro':
      "{things} you've looked at recently, newest first. Stored on this device only.",
    'lib.recent.introEmpty': "Nothing here — your history is empty.",
    'lib.recent.emptyFilterTitle': "Nothing in this filter",
    'lib.recent.emptyFilterText':
      "Try another category — articles and products are tracked separately.",
    'lib.recent.emptyClearTitle': "Your history is clear",
    'lib.recent.emptyClearText':
      "We've forgotten what you looked at. New visits will start appearing here again.",
    'lib.recent.productSub': "Viewed in the Hearth store",

    /* ----------------------------------------------------------- board */
    'lib.board.titleQuarter': "Top referrers, this quarter",
    'lib.board.titleAllTime': "Top referrers, all time",
    'lib.board.updated': "updated {minutes} minutes ago",
    'lib.board.tierGold': "Gold referrer",
    'lib.board.tierSilver': "Silver referrer",
    'lib.board.tierBronze': "Bronze referrer",
    'lib.board.gapLine':
      "{n} more and you're into the prize places. Every friend is still {amount} either way.|{n} more and you're into the prize places. Every friend is still {amount} either way.",
    'lib.board.holdLine':
      "You're in the prizes — hold your place until the quarter ends.",

    /* ----------------------------------------------------------- guide */
    'lib.guide.season': "WINTER 2026 GIFT GUIDE",
    'lib.guide.title': "Presents that make the house quieter, not busier.",
    'lib.guide.blurb':
      "Six things worth wrapping, picked by the people who answer the phone when they go wrong. Everything here installs in an evening without an electrician.",
    'lib.guide.cutoff': "Free delivery, order by {date}",

    /* -------------------------------------------------------- transfer */
    'lib.transfer.done':
      "We've emailed {name} at {email}. Once they accept, the remaining cover on your {product} moves across — it has already left your household.",

    /* ------------------------------------------------------- insurance */
    'lib.insurance.stateReady': "Ready",
    'lib.insurance.stateBuilding': "Building",
    'lib.insurance.download': "Download pack",
    'lib.insurance.checkProgress': "Check progress",

    /* ---------------------------------------------------------- basket */
    'lib.basket.freeDelivery':
      "Delivery is free over {amount} and everything ships together next working day.",

    /* ------------------------------------------------------------ live */
    'lib.live.retention': "kept {days} days on Hearth Family",
    'lib.live.ctlTalk': "Talk",
    'lib.live.ctlTalkToast': "Two-way talk needs the Hearth app",
    'lib.live.ctlSnapshot': "Snapshot",
    'lib.live.ctlSnapshotToast': "Snapshot saved to your clips",
    'lib.live.ctlSound': "Sound on",
    'lib.live.ctlSoundToast': "Audio is muted in this demo",
    'lib.live.ctlFullscreen': "Full screen",
    'lib.live.ctlFullscreenToast': "Full screen isn't available here",
    'lib.live.introOffline':
      "{name} isn't reachable. Clips recorded before it dropped off are still here — nothing is lost.",
    'lib.live.introOnline':
      "Streaming from {name}. Live view is peer-to-peer, so it keeps working even when our cloud doesn't.",
    'lib.live.noFeedTitle': "No feed from {name}",
    'lib.live.noFeedText':
      "The camera hasn't checked in, so there's nothing live to show. It's almost always power or Wi-Fi range rather than a fault.",
    'lib.live.lastSeenUnknown': "last seen a while ago",
    'lib.live.retryToast': "Still no answer from {name}",

    /* ----------------------------------------------------------- clips */
    'lib.clips.typePerson': "Person",
    'lib.clips.typeParcel': "Parcel",
    'lib.clips.typePress': "Pressed",
    'lib.clips.typeMotion': "Motion",
    'lib.clips.emptyFilterTitle': "No clips in this filter",
    'lib.clips.emptyFilterText':
      "Try another event type, or another camera. Clips are kept for as long as your plan allows.",
    'lib.clips.emptyCamTitle': "No clips from {name} yet",
    'lib.clips.emptyCamOfflineText':
      "Nothing was recorded before {name} went offline. Once it's back, new events appear here within a minute.",
    'lib.clips.emptyCamOnlineText':
      "Nothing recorded on {name} so far. Motion and doorbell events start a clip automatically.",
    'lib.clips.meta': "{cam} · {time}",
    'lib.clips.playToast': "Playing {title} · {duration}",
    'lib.clips.downloadToast': "Downloading {file}",
    'lib.clips.shareToast': "Share link copied — expires in {days} days",
    'lib.clips.deleteToast': "Clip deleted",

    /* ----------------------------------------------------------- share */
    'lib.share.stateActive': "Active",
    'lib.share.stateExpiring': "Expires soon",
    'lib.share.stateExpired': "Expired",
    'lib.share.reactivate': "Reactivate",
    'lib.share.extendDays': "Extend {days} days",
    'lib.share.reactivatedToast': "Link reactivated for {days} days",
    'lib.share.extendedToast': "Extended by {days} days",
    'lib.share.expiryNever': "no expiry",
    'lib.share.expiry24h': "expires in {hours} hours",
    'lib.share.expiry7d': "expires in {days} days",
    'lib.share.expiry30d': "expires in {days} days",
    'lib.share.clipMeta': "{cam} · {day} {time} · {duration}",

    /* ---------------------------------------------------------- errors */
    'lib.errors.titleLive': "We couldn't load the live view",
    'lib.errors.titleAuto': "We couldn't load your automations",
    'lib.errors.titleBilling': "We couldn't load your invoices",
    'lib.errors.titleOrders': "We couldn't load your order",
    'lib.errors.titleDevices': "We couldn't load your devices",
    'lib.errors.titleEnergy': "We couldn't load your energy data",
    'lib.errors.titleNotifs': "We couldn't load your notifications",
    'lib.errors.titleMytickets': "We couldn't load your tickets",
    'lib.errors.titleThread': "We couldn't load this conversation",
    'lib.errors.titleStatus': "We couldn't load the status page",
    'lib.errors.titleDefault': "We couldn't load this screen",
    'lib.errors.text':
      "The request timed out on our side, so nothing you were doing has been lost. Trying again usually works — if it doesn't, the status page will say whether it's us.",
    'lib.errors.card1Title': "Your devices are fine",
    'lib.errors.card1Text':
      "Schedules, alerts and local recording run on the hardware. This is our website, not your home.",
    'lib.errors.card2Title': "Need an answer now?",
    'lib.errors.card2Text':
      "Chat works independently of this page — open it and a person will pick up.",
    'lib.errors.card2Action': "Open live chat",
    'lib.errors.offlineTitle': "You're offline",
    'lib.errors.offlineText':
      "Pages you've already opened still work. Anything you send will wait until you're back.",
    'lib.errors.offlineBackToast': "Back online",
    'lib.errors.offlineStillToast': "Still no connection",
    'lib.errors.retryToast': "Retrying…",
    'lib.errors.reportToast': "Tell us what you were doing",
    'lib.errors.simulateFailToast': "Simulated a failed load",

    /* ------------------------------------------------------------ auto */
    'lib.auto.intro':
      "{running} of {total} running. Each one is a trigger and an action — reorder nothing, break nothing.",
    'lib.auto.introEmpty':
      "Nothing running yet. Automations are one trigger and one action.",
    'lib.auto.paused': "paused",
    'lib.auto.neverRun': "never run yet",
    'lib.auto.toastRunning': "{name} running",
    'lib.auto.toastPaused': "{name} paused",
    'lib.auto.toastDeleted': "{name} deleted",
    'lib.auto.nameToast': "Give the automation a name",
    'lib.auto.triggerToast': "Pick a trigger",
    'lib.auto.actionToast': "Pick an action",
    'lib.auto.createdToast': "Automation created",

    /* ---------------------------------------------------------- search */
    'lib.search.facetAll': "All",
    'lib.search.countFor': "{results} for “{query}”",

    /* ---------------------------------------------------------- thread */
    'lib.thread.statusOpen': "Open",
    'lib.thread.statusPending': "Pending",
    'lib.thread.statusSolved': "Solved",
    'lib.thread.statusClosed': "Closed",
    'lib.thread.timelineOpened': "Opened",
    'lib.thread.timelineFirstReply': "First reply",
    'lib.thread.timelineSolved': "Solved",
    'lib.thread.timelineClosed': "Closed",
    'lib.thread.chatSubject': "Live chat",

    /* ------------------------------------------------------------ a11y */
    'lib.a11y.noteSize': "{percent} display size",
    'lib.a11y.noteContrast': "higher contrast",
    'lib.a11y.noteMotion': "reduced motion",
    'lib.a11y.noteDeuter': "red-green friendly palette",
    'lib.a11y.noteMono': "monochrome palette",
    'lib.a11y.noteLabels': "icon labels",
    'lib.a11y.noteChime': "alert sound",
    'lib.a11y.noteNone':
      "Nothing changed from the defaults yet — pick an option and the whole portal updates.",
    'lib.a11y.noteApplied': "Applied across the portal: {list}.",

    /* ------------------------------------------------------- skeletons */
    'lib.skeletons.note': "loading {name}…",
    'lib.skeletons.helpCentre': "help centre",

    /* ----------------------------------------------------------- theme */
    'lib.theme.noteManual':
      "You've set the theme by hand, so it stays put. Switch back to following your device whenever you like.",
    'lib.theme.noteSystem':
      "Matching your device — it flips automatically when your system does, including on a schedule.",
    'lib.theme.followToast': "Following your system theme",
  },

  'de-DE': {
    'lib.format.planPriceFree': 'Kostenlos',
    'lib.format.readTime': '{minutes} Min. Lesezeit',
    'lib.format.readTimeShort': '{minutes} Min.',
    'lib.format.justNow': 'Gerade eben',
    'lib.format.updatedLine': 'Aktualisiert {when} · {product}',

    'lib.stores.kindFlagship': 'Hearth-Filiale',
    'lib.stores.kindStockist': 'Fachhändler',
    'lib.stores.kindRecycling': 'Recyclingstelle',
    'lib.stores.meta': '{hours} · {state}',
    'lib.stores.openNow': 'jetzt geöffnet',
    'lib.stores.closedNow': 'jetzt geschlossen',
    'lib.stores.emptyQuery': 'Nichts in der Nähe von „{query}“',
    'lib.stores.emptyFilter': 'Keine Standorte in diesem Filter',
    'lib.stores.searchNone': 'Nichts passte zu dieser Suche',
    'lib.stores.searchNearQuery': '{locations} in der Nähe von {query}',
    'lib.stores.searchNearYou': '{locations} in Ihrer Nähe',
    'lib.stores.foundToast': '{locations} gefunden',

    'lib.billing.statusPaid': 'Bezahlt',
    'lib.billing.statusRefunded': 'Erstattet',
    'lib.billing.statusRetrying': 'Neuer Versuch',
    'lib.billing.emptyPeriodTitle': 'Keine Rechnungen in diesem Zeitraum',
    'lib.billing.emptyPeriodText':
      'In diesem Zeitraum wurde nichts ausgestellt, während Sie dieses Konto hatten. Rechnungen erscheinen am Tag der Ausstellung, und wir bewahren sie sieben Jahre lang auf.',
    'lib.billing.emptyFilterTitle': 'Nichts in diesem Filter',
    'lib.billing.emptyFilterPlan':
      'Keine Tarifrechnungen in diesem Zeitraum — probieren Sie einen anderen Filter oder exportieren Sie alles als CSV.',
    'lib.billing.emptyFilterHardware':
      'Keine Hardwarerechnungen in diesem Zeitraum — probieren Sie einen anderen Filter oder exportieren Sie alles als CSV.',
    'lib.billing.emptyFilterRefund':
      'Keine Erstattungen in diesem Zeitraum — probieren Sie einen anderen Filter oder exportieren Sie alles als CSV.',
    'lib.billing.intro':
      'Jede Rechnung seit Ihrem Beitritt, plus was als Nächstes kommt. Downloads sind PDFs mit ausgewiesener MwSt.',
    'lib.billing.planFree': 'kostenlos',
    'lib.billing.perYear': '{price} / Jahr',
    'lib.billing.perMonth': '{price} / Monat',
    'lib.billing.noCharge':
      'Nichts abzurechnen — der kostenlose Tarif verursacht keine Kosten.',
    'lib.billing.nextCharge':
      'Nächste Abbuchung {date}, von der Karte unten.',
    'lib.billing.retryingPayment': 'Zahlung für {id} wird erneut versucht',
    'lib.billing.downloading': '{file} wird heruntergeladen',

    'lib.wish.stockIn': 'Auf Lager',
    'lib.wish.stockLow': 'Wenig Bestand',
    'lib.wish.stockOut': 'In 2 Wochen wieder da',
    'lib.wish.intro':
      '{n} gespeichert · wir beobachten den Preis und melden uns, wenn sich etwas tut.',
    'lib.wish.introEmpty': 'Derzeit nichts gespeichert.',
    'lib.wish.dropOne': '{name} ist seit dem Speichern um {amount} gefallen.',
    'lib.wish.dropMany':
      '{n} Artikel ist seit dem Speichern im Preis gefallen.|{n} Artikel sind seit dem Speichern im Preis gefallen.',
    'lib.wish.addOut': 'Wir mailen Ihnen, sobald es wieder da ist',
    'lib.wish.added': '{name} in den Warenkorb gelegt',

    'lib.recent.intro':
      '{things}, die Sie sich zuletzt angesehen haben, neueste zuerst. Nur auf diesem Gerät gespeichert.',
    'lib.recent.introEmpty': 'Nichts hier — Ihr Verlauf ist leer.',
    'lib.recent.emptyFilterTitle': 'Nichts in diesem Filter',
    'lib.recent.emptyFilterText':
      'Probieren Sie eine andere Kategorie — Beiträge und Produkte werden getrennt erfasst.',
    'lib.recent.emptyClearTitle': 'Ihr Verlauf ist geleert',
    'lib.recent.emptyClearText':
      'Wir haben vergessen, was Sie angesehen haben. Neue Besuche erscheinen hier wieder.',
    'lib.recent.productSub': 'In der Hearth-Filiale angesehen',

    'lib.board.titleQuarter': 'Top-Empfehler, dieses Quartal',
    'lib.board.titleAllTime': 'Top-Empfehler, aller Zeiten',
    'lib.board.updated': 'vor {minutes} Minuten aktualisiert',
    'lib.board.tierGold': 'Gold-Empfehler',
    'lib.board.tierSilver': 'Silber-Empfehler',
    'lib.board.tierBronze': 'Bronze-Empfehler',
    'lib.board.gapLine':
      'Noch {n} und Sie sind auf einem Preisrang. Jede Empfehlung bringt so oder so {amount}.|Noch {n} und Sie sind auf einem Preisrang. Jede Empfehlung bringt so oder so {amount}.',
    'lib.board.holdLine':
      'Sie sind auf einem Preisrang — halten Sie ihn bis zum Quartalsende.',

    'lib.guide.season': 'GESCHENKEGUIDE WINTER 2026',
    'lib.guide.title':
      'Geschenke, die das Haus ruhiger machen, nicht geschäftiger.',
    'lib.guide.blurb':
      'Sechs Dinge, die sich zu verpacken lohnen, ausgewählt von den Leuten, die ans Telefon gehen, wenn etwas kaputtgeht. Alles hier ist an einem Abend ohne Elektriker installiert.',
    'lib.guide.cutoff': 'Kostenloser Versand, bestellen Sie bis {date}',

    'lib.transfer.done':
      'Wir haben {name} unter {email} benachrichtigt. Sobald sie annehmen, geht die verbleibende Absicherung für Ihr {product} über — es hat Ihren Haushalt bereits verlassen.',

    'lib.insurance.stateReady': 'Fertig',
    'lib.insurance.stateBuilding': 'Wird erstellt',
    'lib.insurance.download': 'Paket laden',
    'lib.insurance.checkProgress': 'Fortschritt prüfen',

    'lib.basket.freeDelivery':
      'Ab {amount} ist der Versand kostenlos, und alles wird am nächsten Werktag zusammen verschickt.',

    'lib.live.retention': '{days} Tage bei Hearth Family gespeichert',
    'lib.live.ctlTalk': 'Sprechen',
    'lib.live.ctlTalkToast': 'Gegensprechen erfordert die Hearth-App',
    'lib.live.ctlSnapshot': 'Schnappschuss',
    'lib.live.ctlSnapshotToast': 'Schnappschuss in Ihren Clips gespeichert',
    'lib.live.ctlSound': 'Ton an',
    'lib.live.ctlSoundToast': 'Der Ton ist in dieser Demo stumm',
    'lib.live.ctlFullscreen': 'Vollbild',
    'lib.live.ctlFullscreenToast': 'Vollbild ist hier nicht verfügbar',
    'lib.live.introOffline':
      '{name} ist nicht erreichbar. Clips von davor sind weiterhin hier — nichts ist verloren.',
    'lib.live.introOnline':
      'Übertragung von {name}. Die Live-Ansicht läuft peer-to-peer und funktioniert auch, wenn unsere Cloud es nicht tut.',
    'lib.live.noFeedTitle': 'Kein Bild von {name}',
    'lib.live.noFeedText':
      'Die Kamera hat sich nicht gemeldet, daher gibt es nichts live zu zeigen. Fast immer liegt es an Strom oder WLAN-Reichweite, nicht an einem Defekt.',
    'lib.live.lastSeenUnknown': 'vor einer Weile zuletzt gesehen',
    'lib.live.retryToast': 'Weiterhin keine Antwort von {name}',

    'lib.clips.typePerson': 'Person',
    'lib.clips.typeParcel': 'Paket',
    'lib.clips.typePress': 'Gedrückt',
    'lib.clips.typeMotion': 'Bewegung',
    'lib.clips.emptyFilterTitle': 'Keine Clips in diesem Filter',
    'lib.clips.emptyFilterText':
      'Probieren Sie einen anderen Ereignistyp oder eine andere Kamera. Clips bleiben so lange erhalten, wie Ihr Tarif es erlaubt.',
    'lib.clips.emptyCamTitle': 'Noch keine Clips von {name}',
    'lib.clips.emptyCamOfflineText':
      'Vor dem Ausfall von {name} wurde nichts aufgezeichnet. Sobald die Kamera zurück ist, erscheinen neue Ereignisse hier innerhalb einer Minute.',
    'lib.clips.emptyCamOnlineText':
      'Auf {name} wurde bisher nichts aufgezeichnet. Bewegung und Klingeln starten automatisch einen Clip.',
    'lib.clips.meta': '{cam} · {time}',
    'lib.clips.playToast': '{title} wird abgespielt · {duration}',
    'lib.clips.downloadToast': '{file} wird heruntergeladen',
    'lib.clips.shareToast':
      'Freigabelink kopiert — läuft in {days} Tagen ab',
    'lib.clips.deleteToast': 'Clip gelöscht',

    'lib.share.stateActive': 'Aktiv',
    'lib.share.stateExpiring': 'Läuft bald ab',
    'lib.share.stateExpired': 'Abgelaufen',
    'lib.share.reactivate': 'Reaktivieren',
    'lib.share.extendDays': 'Um {days} Tage verlängern',
    'lib.share.reactivatedToast': 'Link für {days} Tage reaktiviert',
    'lib.share.extendedToast': 'Um {days} Tage verlängert',
    'lib.share.expiryNever': 'kein Ablauf',
    'lib.share.expiry24h': 'läuft in {hours} Stunden ab',
    'lib.share.expiry7d': 'läuft in {days} Tagen ab',
    'lib.share.expiry30d': 'läuft in {days} Tagen ab',
    'lib.share.clipMeta': '{cam} · {day} {time} · {duration}',

    'lib.errors.titleLive': 'Die Live-Ansicht konnte nicht geladen werden',
    'lib.errors.titleAuto':
      'Ihre Automationen konnten nicht geladen werden',
    'lib.errors.titleBilling':
      'Ihre Rechnungen konnten nicht geladen werden',
    'lib.errors.titleOrders':
      'Ihre Bestellung konnte nicht geladen werden',
    'lib.errors.titleDevices': 'Ihre Geräte konnten nicht geladen werden',
    'lib.errors.titleEnergy':
      'Ihre Energiedaten konnten nicht geladen werden',
    'lib.errors.titleNotifs':
      'Ihre Benachrichtigungen konnten nicht geladen werden',
    'lib.errors.titleMytickets':
      'Ihre Tickets konnten nicht geladen werden',
    'lib.errors.titleThread':
      'Diese Unterhaltung konnte nicht geladen werden',
    'lib.errors.titleStatus':
      'Die Statusseite konnte nicht geladen werden',
    'lib.errors.titleDefault':
      'Diese Ansicht konnte nicht geladen werden',
    'lib.errors.text':
      'Die Anfrage ist auf unserer Seite abgelaufen, es ist also nichts von dem verloren, was Sie gerade getan haben. Ein neuer Versuch hilft meist — wenn nicht, sagt die Statusseite, ob es an uns liegt.',
    'lib.errors.card1Title': 'Ihren Geräten geht es gut',
    'lib.errors.card1Text':
      'Zeitpläne, Alarme und lokale Aufnahmen laufen auf der Hardware. Das hier ist unsere Website, nicht Ihr Zuhause.',
    'lib.errors.card2Title': 'Brauchen Sie jetzt eine Antwort?',
    'lib.errors.card2Text':
      'Der Chat funktioniert unabhängig von dieser Seite — öffnen Sie ihn, und jemand meldet sich.',
    'lib.errors.card2Action': 'Live-Chat öffnen',
    'lib.errors.offlineTitle': 'Sie sind offline',
    'lib.errors.offlineText':
      'Bereits geöffnete Seiten funktionieren weiter. Alles, was Sie senden, wartet, bis Sie zurück sind.',
    'lib.errors.offlineBackToast': 'Wieder online',
    'lib.errors.offlineStillToast': 'Weiterhin keine Verbindung',
    'lib.errors.retryToast': 'Neuer Versuch …',
    'lib.errors.reportToast': 'Sagen Sie uns, was Sie gerade getan haben',
    'lib.errors.simulateFailToast': 'Fehlgeschlagenes Laden simuliert',

    'lib.auto.intro':
      '{running} von {total} laufen. Jede ist ein Auslöser und eine Aktion — nichts umsortieren, nichts kaputt machen.',
    'lib.auto.introEmpty':
      'Noch läuft nichts. Automationen bestehen aus einem Auslöser und einer Aktion.',
    'lib.auto.paused': 'pausiert',
    'lib.auto.neverRun': 'noch nie ausgeführt',
    'lib.auto.toastRunning': '{name} läuft',
    'lib.auto.toastPaused': '{name} pausiert',
    'lib.auto.toastDeleted': '{name} gelöscht',
    'lib.auto.nameToast': 'Geben Sie der Automation einen Namen',
    'lib.auto.triggerToast': 'Wählen Sie einen Auslöser',
    'lib.auto.actionToast': 'Wählen Sie eine Aktion',
    'lib.auto.createdToast': 'Automation erstellt',

    'lib.search.facetAll': 'Alle',
    'lib.search.countFor': '{results} für „{query}“',

    'lib.thread.statusOpen': 'Offen',
    'lib.thread.statusPending': 'Wartet',
    'lib.thread.statusSolved': 'Gelöst',
    'lib.thread.statusClosed': 'Geschlossen',
    'lib.thread.timelineOpened': 'Eröffnet',
    'lib.thread.timelineFirstReply': 'Erste Antwort',
    'lib.thread.timelineSolved': 'Gelöst',
    'lib.thread.timelineClosed': 'Geschlossen',
    'lib.thread.chatSubject': 'Live-Chat',

    'lib.a11y.noteSize': '{percent} Anzeigegröße',
    'lib.a11y.noteContrast': 'höherer Kontrast',
    'lib.a11y.noteMotion': 'reduzierte Bewegung',
    'lib.a11y.noteDeuter': 'rot-grün-freundliche Palette',
    'lib.a11y.noteMono': 'monochrome Palette',
    'lib.a11y.noteLabels': 'Symbolbeschriftungen',
    'lib.a11y.noteChime': 'Signalton',
    'lib.a11y.noteNone':
      'Noch nichts von den Standardwerten geändert — wählen Sie eine Option, und das ganze Portal passt sich an.',
    'lib.a11y.noteApplied': 'Im ganzen Portal angewendet: {list}.',

    'lib.skeletons.note': '{name} wird geladen …',
    'lib.skeletons.helpCentre': 'Hilfebereich',

    'lib.theme.noteManual':
      'Sie haben das Design von Hand gesetzt, also bleibt es so. Sie können jederzeit wieder Ihrem Gerät folgen.',
    'lib.theme.noteSystem':
      'Passt zu Ihrem Gerät — es wechselt automatisch mit Ihrem System, auch nach Zeitplan.',
    'lib.theme.followToast': 'Folgt Ihrem Systemdesign',
  },

  'fr-FR': {
    'lib.format.planPriceFree': 'Gratuit',
    'lib.format.readTime': '{minutes} min de lecture',
    'lib.format.readTimeShort': '{minutes} min',
    'lib.format.justNow': 'À l’instant',
    'lib.format.updatedLine': 'Mis à jour {when} · {product}',

    'lib.stores.kindFlagship': 'Boutique Hearth',
    'lib.stores.kindStockist': 'Revendeur',
    'lib.stores.kindRecycling': 'Point de recyclage',
    'lib.stores.meta': '{hours} · {state}',
    'lib.stores.openNow': 'ouvert',
    'lib.stores.closedNow': 'fermé',
    'lib.stores.emptyQuery': 'Rien près de « {query} »',
    'lib.stores.emptyFilter': 'Aucune adresse dans ce filtre',
    'lib.stores.searchNone': 'Aucun résultat pour cette recherche',
    'lib.stores.searchNearQuery': '{locations} près de {query}',
    'lib.stores.searchNearYou': '{locations} près de chez vous',
    /* Le participe s’accorde avec « adresse », d’où les deux variantes. */
    'lib.stores.foundToast': '{locations} trouvée|{locations} trouvées',

    'lib.billing.statusPaid': 'Payée',
    'lib.billing.statusRefunded': 'Remboursée',
    'lib.billing.statusRetrying': 'Nouvelle tentative',
    'lib.billing.emptyPeriodTitle': 'Aucune facture sur cette période',
    'lib.billing.emptyPeriodText':
      'Rien n’a été émis pendant que vous étiez sur ce compte sur cette période. Les factures apparaissent le jour de leur émission, et nous les conservons sept ans.',
    'lib.billing.emptyFilterTitle': 'Rien dans ce filtre',
    'lib.billing.emptyFilterPlan':
      'Aucune facture d’abonnement sur cette période — essayez un autre filtre, ou exportez tout en CSV.',
    'lib.billing.emptyFilterHardware':
      'Aucune facture de matériel sur cette période — essayez un autre filtre, ou exportez tout en CSV.',
    'lib.billing.emptyFilterRefund':
      'Aucun remboursement sur cette période — essayez un autre filtre, ou exportez tout en CSV.',
    'lib.billing.intro':
      'Toutes vos factures depuis votre inscription, et ce qui arrive ensuite. Les téléchargements sont des PDF avec la TVA détaillée.',
    'lib.billing.planFree': 'gratuit',
    'lib.billing.perYear': '{price} / an',
    'lib.billing.perMonth': '{price} / mois',
    'lib.billing.noCharge':
      'Rien à facturer — l’offre gratuite n’entraîne aucun frais.',
    'lib.billing.nextCharge':
      'Prochain prélèvement le {date}, sur la carte ci-dessous.',
    'lib.billing.retryingPayment': 'Nouvelle tentative de paiement pour {id}',
    'lib.billing.downloading': 'Téléchargement de {file}',

    'lib.wish.stockIn': 'En stock',
    'lib.wish.stockLow': 'Stock faible',
    'lib.wish.stockOut': 'De retour dans 2 semaines',
    'lib.wish.intro':
      '{n} en favoris · nous surveillons le prix et vous prévenons dès qu’il bouge.',
    'lib.wish.introEmpty': 'Rien d’enregistré pour le moment.',
    'lib.wish.dropOne':
      '{name} a baissé de {amount} depuis que vous l’avez enregistré.',
    'lib.wish.dropMany':
      '{n} article a baissé de prix depuis que vous l’avez enregistré.|{n} articles ont baissé de prix depuis que vous les avez enregistrés.',
    'lib.wish.addOut': 'Nous vous préviendrons par e-mail dès son retour',
    'lib.wish.added': '{name} ajouté à votre panier',

    'lib.recent.intro':
      '{things} consulté récemment. Stocké uniquement sur cet appareil.|{things} consultés récemment, du plus récent au plus ancien. Stockés uniquement sur cet appareil.',
    'lib.recent.introEmpty': 'Rien ici — votre historique est vide.',
    'lib.recent.emptyFilterTitle': 'Rien dans ce filtre',
    'lib.recent.emptyFilterText':
      'Essayez une autre catégorie — les articles et les produits sont suivis séparément.',
    'lib.recent.emptyClearTitle': 'Votre historique est vide',
    'lib.recent.emptyClearText':
      'Nous avons oublié ce que vous avez consulté. Les nouvelles visites réapparaîtront ici.',
    'lib.recent.productSub': 'Consulté dans la boutique Hearth',

    'lib.board.titleQuarter': 'Meilleurs parrains, ce trimestre',
    'lib.board.titleAllTime': 'Meilleurs parrains, depuis toujours',
    'lib.board.updated': 'mis à jour il y a {minutes} minutes',
    'lib.board.tierGold': 'Parrain or',
    'lib.board.tierSilver': 'Parrain argent',
    'lib.board.tierBronze': 'Parrain bronze',
    'lib.board.gapLine':
      'Encore {n} et vous entrez dans les places gagnantes. Chaque ami rapporte {amount} dans tous les cas.|Encore {n} et vous entrez dans les places gagnantes. Chaque ami rapporte {amount} dans tous les cas.',
    'lib.board.holdLine':
      'Vous êtes dans les places gagnantes — gardez votre rang jusqu’à la fin du trimestre.',

    'lib.guide.season': 'GUIDE CADEAUX HIVER 2026',
    'lib.guide.title':
      'Des cadeaux qui rendent la maison plus calme, pas plus occupée.',
    'lib.guide.blurb':
      'Six idées qui méritent un emballage, choisies par ceux qui répondent au téléphone quand ça tombe en panne. Tout s’installe en une soirée sans électricien.',
    'lib.guide.cutoff': 'Livraison offerte, commandez avant le {date}',

    'lib.transfer.done':
      'Nous avons écrit à {name} à l’adresse {email}. Dès qu’il ou elle accepte, la garantie restante de votre {product} est transférée — elle a déjà quitté votre foyer.',

    'lib.insurance.stateReady': 'Prêt',
    'lib.insurance.stateBuilding': 'En cours',
    'lib.insurance.download': 'Télécharger le dossier',
    'lib.insurance.checkProgress': 'Voir l’avancement',

    'lib.basket.freeDelivery':
      'La livraison est offerte au-delà de {amount} et tout part ensemble le jour ouvré suivant.',

    'lib.live.retention': 'conservé {days} jours avec Hearth Family',
    'lib.live.ctlTalk': 'Parler',
    'lib.live.ctlTalkToast': 'L’interphone nécessite l’application Hearth',
    'lib.live.ctlSnapshot': 'Capture',
    'lib.live.ctlSnapshotToast': 'Capture enregistrée dans vos clips',
    'lib.live.ctlSound': 'Son activé',
    'lib.live.ctlSoundToast': 'Le son est coupé dans cette démo',
    'lib.live.ctlFullscreen': 'Plein écran',
    'lib.live.ctlFullscreenToast': 'Le plein écran n’est pas disponible ici',
    'lib.live.introOffline':
      '{name} est injoignable. Les clips enregistrés avant la coupure sont toujours là — rien n’est perdu.',
    'lib.live.introOnline':
      'Diffusion depuis {name}. La vue en direct est pair-à-pair, elle continue de fonctionner même quand notre cloud est en panne.',
    'lib.live.noFeedTitle': 'Aucun flux depuis {name}',
    'lib.live.noFeedText':
      'La caméra ne s’est pas manifestée, il n’y a donc rien à montrer en direct. C’est presque toujours l’alimentation ou la portée Wi-Fi, rarement une panne.',
    'lib.live.lastSeenUnknown': 'vue il y a un moment',
    'lib.live.retryToast': 'Toujours aucune réponse de {name}',

    'lib.clips.typePerson': 'Personne',
    'lib.clips.typeParcel': 'Colis',
    'lib.clips.typePress': 'Appui',
    'lib.clips.typeMotion': 'Mouvement',
    'lib.clips.emptyFilterTitle': 'Aucun clip dans ce filtre',
    'lib.clips.emptyFilterText':
      'Essayez un autre type d’événement, ou une autre caméra. Les clips sont conservés aussi longtemps que votre offre le permet.',
    'lib.clips.emptyCamTitle': 'Aucun clip de {name} pour l’instant',
    'lib.clips.emptyCamOfflineText':
      'Rien n’a été enregistré avant la déconnexion de {name}. Dès son retour, les nouveaux événements apparaissent ici en moins d’une minute.',
    'lib.clips.emptyCamOnlineText':
      'Rien d’enregistré sur {name} jusqu’ici. Les mouvements et les appuis démarrent un clip automatiquement.',
    'lib.clips.meta': '{cam} · {time}',
    'lib.clips.playToast': 'Lecture de {title} · {duration}',
    'lib.clips.downloadToast': 'Téléchargement de {file}',
    'lib.clips.shareToast':
      'Lien de partage copié — expire dans {days} jours',
    'lib.clips.deleteToast': 'Clip supprimé',

    'lib.share.stateActive': 'Actif',
    'lib.share.stateExpiring': 'Expire bientôt',
    'lib.share.stateExpired': 'Expiré',
    'lib.share.reactivate': 'Réactiver',
    'lib.share.extendDays': 'Prolonger de {days} jours',
    'lib.share.reactivatedToast': 'Lien réactivé pour {days} jours',
    'lib.share.extendedToast': 'Prolongé de {days} jours',
    'lib.share.expiryNever': 'sans expiration',
    'lib.share.expiry24h': 'expire dans {hours} heures',
    'lib.share.expiry7d': 'expire dans {days} jours',
    'lib.share.expiry30d': 'expire dans {days} jours',
    'lib.share.clipMeta': '{cam} · {day} {time} · {duration}',

    'lib.errors.titleLive': 'Impossible de charger la vue en direct',
    'lib.errors.titleAuto': 'Impossible de charger vos automatisations',
    'lib.errors.titleBilling': 'Impossible de charger vos factures',
    'lib.errors.titleOrders': 'Impossible de charger votre commande',
    'lib.errors.titleDevices': 'Impossible de charger vos appareils',
    'lib.errors.titleEnergy':
      'Impossible de charger vos données d’énergie',
    'lib.errors.titleNotifs': 'Impossible de charger vos notifications',
    'lib.errors.titleMytickets': 'Impossible de charger vos tickets',
    'lib.errors.titleThread': 'Impossible de charger cette conversation',
    'lib.errors.titleStatus': 'Impossible de charger la page d’état',
    'lib.errors.titleDefault': 'Impossible de charger cet écran',
    'lib.errors.text':
      'La requête a expiré de notre côté, rien de ce que vous faisiez n’a donc été perdu. Réessayer suffit en général — sinon, la page d’état vous dira si le problème vient de nous.',
    'lib.errors.card1Title': 'Vos appareils vont bien',
    'lib.errors.card1Text':
      'Les programmations, les alertes et l’enregistrement local tournent sur le matériel. Ceci est notre site, pas votre maison.',
    'lib.errors.card2Title': 'Besoin d’une réponse tout de suite ?',
    'lib.errors.card2Text':
      'Le chat fonctionne indépendamment de cette page — ouvrez-le et quelqu’un vous répondra.',
    'lib.errors.card2Action': 'Ouvrir le chat',
    'lib.errors.offlineTitle': 'Vous êtes hors ligne',
    'lib.errors.offlineText':
      'Les pages déjà ouvertes fonctionnent encore. Tout ce que vous envoyez attendra votre retour.',
    'lib.errors.offlineBackToast': 'De nouveau en ligne',
    'lib.errors.offlineStillToast': 'Toujours pas de connexion',
    'lib.errors.retryToast': 'Nouvelle tentative…',
    'lib.errors.reportToast': 'Dites-nous ce que vous faisiez',
    'lib.errors.simulateFailToast': 'Échec de chargement simulé',

    'lib.auto.intro':
      '{running} sur {total} en cours. Chacune est un déclencheur et une action — rien à réordonner, rien à casser.',
    'lib.auto.introEmpty':
      'Rien en cours pour l’instant. Une automatisation, c’est un déclencheur et une action.',
    'lib.auto.paused': 'en pause',
    'lib.auto.neverRun': 'jamais exécutée',
    'lib.auto.toastRunning': '{name} en cours',
    'lib.auto.toastPaused': '{name} en pause',
    'lib.auto.toastDeleted': '{name} supprimée',
    'lib.auto.nameToast': 'Donnez un nom à l’automatisation',
    'lib.auto.triggerToast': 'Choisissez un déclencheur',
    'lib.auto.actionToast': 'Choisissez une action',
    'lib.auto.createdToast': 'Automatisation créée',

    'lib.search.facetAll': 'Tout',
    'lib.search.countFor': '{results} pour « {query} »',

    'lib.thread.statusOpen': 'Ouvert',
    'lib.thread.statusPending': 'En attente',
    'lib.thread.statusSolved': 'Résolu',
    'lib.thread.statusClosed': 'Clos',
    'lib.thread.timelineOpened': 'Ouvert',
    'lib.thread.timelineFirstReply': 'Première réponse',
    'lib.thread.timelineSolved': 'Résolu',
    'lib.thread.timelineClosed': 'Clos',
    'lib.thread.chatSubject': 'Chat en direct',

    'lib.a11y.noteSize': 'taille d’affichage {percent}',
    'lib.a11y.noteContrast': 'contraste renforcé',
    'lib.a11y.noteMotion': 'animations réduites',
    'lib.a11y.noteDeuter': 'palette adaptée au daltonisme',
    'lib.a11y.noteMono': 'palette monochrome',
    'lib.a11y.noteLabels': 'libellés des icônes',
    'lib.a11y.noteChime': 'son d’alerte',
    'lib.a11y.noteNone':
      'Rien n’a changé par rapport aux réglages par défaut — choisissez une option et tout le portail s’adapte.',
    'lib.a11y.noteApplied': 'Appliqué à tout le portail : {list}.',

    'lib.skeletons.note': 'chargement de {name}…',
    'lib.skeletons.helpCentre': 'centre d’aide',

    'lib.theme.noteManual':
      'Vous avez choisi le thème à la main, il ne bougera donc plus. Vous pouvez revenir au suivi de votre appareil quand vous voulez.',
    'lib.theme.noteSystem':
      'Aligné sur votre appareil — il bascule automatiquement avec votre système, y compris selon un horaire.',
    'lib.theme.followToast': 'Suit le thème de votre système',
  },

  'cs-CZ': {
    'lib.format.planPriceFree': 'Zdarma',
    'lib.format.readTime': '{minutes} min čtení',
    'lib.format.readTimeShort': '{minutes} min',
    'lib.format.justNow': 'Právě teď',
    'lib.format.updatedLine': 'Aktualizováno {when} · {product}',

    'lib.stores.kindFlagship': 'Prodejna Hearth',
    'lib.stores.kindStockist': 'Prodejce',
    'lib.stores.kindRecycling': 'Sběrné místo',
    'lib.stores.meta': '{hours} · {state}',
    'lib.stores.openNow': 'právě otevřeno',
    'lib.stores.closedNow': 'právě zavřeno',
    'lib.stores.emptyQuery': 'Nic poblíž „{query}“',
    'lib.stores.emptyFilter': 'V tomto filtru nejsou žádné pobočky',
    'lib.stores.searchNone': 'Hledání nic nenašlo',
    'lib.stores.searchNearQuery': '{locations} poblíž {query}',
    'lib.stores.searchNearYou': '{locations} ve vašem okolí',
    /* Příčestí se shoduje s počítaným podstatným jménem. */
    'lib.stores.foundToast':
      '{locations} nalezena|{locations} nalezeny|{locations} nalezeno',

    'lib.billing.statusPaid': 'Zaplaceno',
    'lib.billing.statusRefunded': 'Vráceno',
    'lib.billing.statusRetrying': 'Opakuje se',
    'lib.billing.emptyPeriodTitle': 'V tomto období žádné faktury',
    'lib.billing.emptyPeriodText':
      'V tomto období vám na tomto účtu nebylo nic vystaveno. Faktury se objeví v den vystavení a uchováváme je sedm let.',
    'lib.billing.emptyFilterTitle': 'V tomto filtru nic není',
    'lib.billing.emptyFilterPlan':
      'V tomto období nejsou žádné faktury za tarif — zkuste jiný filtr, nebo vše exportujte jako CSV.',
    'lib.billing.emptyFilterHardware':
      'V tomto období nejsou žádné faktury za hardware — zkuste jiný filtr, nebo vše exportujte jako CSV.',
    'lib.billing.emptyFilterRefund':
      'V tomto období nejsou žádné vratky — zkuste jiný filtr, nebo vše exportujte jako CSV.',
    'lib.billing.intro':
      'Každá faktura od vašeho začátku a k tomu, co přijde příště. Ke stažení jsou PDF s rozepsanou DPH.',
    'lib.billing.planFree': 'zdarma',
    'lib.billing.perYear': '{price} / rok',
    'lib.billing.perMonth': '{price} / měsíc',
    'lib.billing.noCharge':
      'Není co účtovat — bezplatný tarif nic nestojí.',
    'lib.billing.nextCharge':
      'Další platba {date}, stržená z karty níže.',
    'lib.billing.retryingPayment': 'Opakujeme platbu za {id}',
    'lib.billing.downloading': 'Stahuje se {file}',

    'lib.wish.stockIn': 'Skladem',
    'lib.wish.stockLow': 'Málo skladem',
    'lib.wish.stockOut': 'Zpět za 2 týdny',
    'lib.wish.intro':
      '{n} uloženo · hlídáme cenu a dáme vědět, když se pohne.',
    'lib.wish.introEmpty': 'Zatím nic uloženo.',
    'lib.wish.dropOne':
      '{name} zlevnil o {amount} od chvíle, kdy jste si ho uložili.',
    'lib.wish.dropMany':
      '{n} položka zlevnila od chvíle, kdy jste si ji uložili.|{n} položky zlevnily od chvíle, kdy jste si je uložili.|{n} položek zlevnilo od chvíle, kdy jste si je uložili.',
    'lib.wish.addOut': 'Napíšeme vám e-mail, až bude zpět',
    'lib.wish.added': '{name} přidán do košíku',

    'lib.recent.intro':
      '{things}, na kterou jste se nedávno dívali. Uloženo jen na tomto zařízení.|{things}, na které jste se nedávno dívali, od nejnovějších. Uloženo jen na tomto zařízení.|{things}, na které jste se nedávno dívali, od nejnovějších. Uloženo jen na tomto zařízení.',
    'lib.recent.introEmpty': 'Nic tu není — historie je prázdná.',
    'lib.recent.emptyFilterTitle': 'V tomto filtru nic není',
    'lib.recent.emptyFilterText':
      'Zkuste jinou kategorii — články a produkty se sledují zvlášť.',
    'lib.recent.emptyClearTitle': 'Historie je smazaná',
    'lib.recent.emptyClearText':
      'Zapomněli jsme, na co jste se dívali. Nové návštěvy se tu začnou objevovat znovu.',
    'lib.recent.productSub': 'Prohlédnuto v prodejně Hearth',

    'lib.board.titleQuarter': 'Nejlepší doporučovatelé, toto čtvrtletí',
    'lib.board.titleAllTime': 'Nejlepší doporučovatelé, za celou dobu',
    'lib.board.updated': 'aktualizováno před {minutes} minutami',
    'lib.board.tierGold': 'Zlatý doporučovatel',
    'lib.board.tierSilver': 'Stříbrný doporučovatel',
    'lib.board.tierBronze': 'Bronzový doporučovatel',
    'lib.board.gapLine':
      'Ještě {n} a jste v cenách. Každý kamarád znamená {amount} tak či tak.|Ještě {n} a jste v cenách. Každý kamarád znamená {amount} tak či tak.|Ještě {n} a jste v cenách. Každý kamarád znamená {amount} tak či tak.',
    'lib.board.holdLine':
      'Jste v cenách — udržte si pozici do konce čtvrtletí.',

    'lib.guide.season': 'ZIMNÍ DÁRKOVÝ PRŮVODCE 2026',
    'lib.guide.title': 'Dárky, po kterých je doma klid, ne shon.',
    'lib.guide.blurb':
      'Šest věcí, které stojí za zabalení, vybraných lidmi, kteří zvedají telefon, když se něco pokazí. Všechno se dá nainstalovat za večer bez elektrikáře.',
    'lib.guide.cutoff': 'Doprava zdarma, objednejte do {date}',

    'lib.transfer.done':
      'Poslali jsme e-mail {name} na {email}. Jakmile převod přijme, zbývající krytí vašeho {product} přejde na ně — z vaší domácnosti už odešlo.',

    'lib.insurance.stateReady': 'Hotovo',
    'lib.insurance.stateBuilding': 'Připravuje se',
    'lib.insurance.download': 'Stáhnout balíček',
    'lib.insurance.checkProgress': 'Zkontrolovat průběh',

    'lib.basket.freeDelivery':
      'Nad {amount} je doprava zdarma a vše odejde společně následující pracovní den.',

    'lib.live.retention': 'uchováno {days} dní v Hearth Family',
    'lib.live.ctlTalk': 'Mluvit',
    'lib.live.ctlTalkToast': 'Obousměrný hovor vyžaduje aplikaci Hearth',
    'lib.live.ctlSnapshot': 'Snímek',
    'lib.live.ctlSnapshotToast': 'Snímek uložen mezi klipy',
    'lib.live.ctlSound': 'Zvuk zapnut',
    'lib.live.ctlSoundToast': 'Zvuk je v této ukázce ztlumený',
    'lib.live.ctlFullscreen': 'Celá obrazovka',
    'lib.live.ctlFullscreenToast': 'Celá obrazovka tu není dostupná',
    'lib.live.introOffline':
      '{name} není dostupná. Klipy natočené předtím, než vypadla, tu pořád jsou — nic se neztratilo.',
    'lib.live.introOnline':
      'Vysílá {name}. Živý přenos jde peer-to-peer, takže funguje, i když náš cloud ne.',
    'lib.live.noFeedTitle': 'Žádný obraz z {name}',
    'lib.live.noFeedText':
      'Kamera se neohlásila, takže není co živě ukázat. Skoro vždycky jde o napájení nebo dosah Wi-Fi, ne o závadu.',
    'lib.live.lastSeenUnknown': 'naposledy viděna před delší dobou',
    'lib.live.retryToast': '{name} stále neodpovídá',

    'lib.clips.typePerson': 'Osoba',
    'lib.clips.typeParcel': 'Zásilka',
    'lib.clips.typePress': 'Stisknuto',
    'lib.clips.typeMotion': 'Pohyb',
    'lib.clips.emptyFilterTitle': 'V tomto filtru nejsou klipy',
    'lib.clips.emptyFilterText':
      'Zkuste jiný typ události nebo jinou kameru. Klipy se uchovávají tak dlouho, jak dovolí váš tarif.',
    'lib.clips.emptyCamTitle': 'Zatím žádné klipy z {name}',
    'lib.clips.emptyCamOfflineText':
      'Než {name} vypadla, nic se nenatočilo. Jakmile bude zpět, nové události se tu objeví do minuty.',
    'lib.clips.emptyCamOnlineText':
      'Na {name} se zatím nic nenatočilo. Pohyb a zvonek spustí klip automaticky.',
    'lib.clips.meta': '{cam} · {time}',
    'lib.clips.playToast': 'Přehrává se {title} · {duration}',
    'lib.clips.downloadToast': 'Stahuje se {file}',
    'lib.clips.shareToast': 'Odkaz zkopírován — vyprší za {days} dní',
    'lib.clips.deleteToast': 'Klip smazán',

    'lib.share.stateActive': 'Aktivní',
    'lib.share.stateExpiring': 'Brzy vyprší',
    'lib.share.stateExpired': 'Vypršel',
    'lib.share.reactivate': 'Znovu aktivovat',
    'lib.share.extendDays': 'Prodloužit o {days} dní',
    'lib.share.reactivatedToast': 'Odkaz znovu aktivován na {days} dní',
    'lib.share.extendedToast': 'Prodlouženo o {days} dní',
    'lib.share.expiryNever': 'bez vypršení',
    'lib.share.expiry24h': 'vyprší za {hours} hodin',
    'lib.share.expiry7d': 'vyprší za {days} dní',
    'lib.share.expiry30d': 'vyprší za {days} dní',
    'lib.share.clipMeta': '{cam} · {day} {time} · {duration}',

    'lib.errors.titleLive': 'Nepodařilo se načíst živý přenos',
    'lib.errors.titleAuto': 'Nepodařilo se načíst vaše automatizace',
    'lib.errors.titleBilling': 'Nepodařilo se načíst vaše faktury',
    'lib.errors.titleOrders': 'Nepodařilo se načíst vaši objednávku',
    'lib.errors.titleDevices': 'Nepodařilo se načíst vaše zařízení',
    'lib.errors.titleEnergy': 'Nepodařilo se načíst data o spotřebě',
    'lib.errors.titleNotifs': 'Nepodařilo se načíst vaše oznámení',
    'lib.errors.titleMytickets': 'Nepodařilo se načíst vaše požadavky',
    'lib.errors.titleThread': 'Nepodařilo se načíst tuto konverzaci',
    'lib.errors.titleStatus': 'Nepodařilo se načíst stavovou stránku',
    'lib.errors.titleDefault': 'Nepodařilo se načíst tuto obrazovku',
    'lib.errors.text':
      'Požadavek u nás vypršel, takže nic z toho, co jste dělali, se neztratilo. Většinou pomůže zkusit to znovu — pokud ne, stavová stránka řekne, jestli je chyba u nás.',
    'lib.errors.card1Title': 'Vaše zařízení jsou v pořádku',
    'lib.errors.card1Text':
      'Plány, upozornění i místní nahrávání běží na hardwaru. Tohle je náš web, ne váš domov.',
    'lib.errors.card2Title': 'Potřebujete odpověď hned?',
    'lib.errors.card2Text':
      'Chat funguje nezávisle na této stránce — otevřete ho a někdo se ozve.',
    'lib.errors.card2Action': 'Otevřít živý chat',
    'lib.errors.offlineTitle': 'Jste offline',
    'lib.errors.offlineText':
      'Stránky, které jste už otevřeli, fungují dál. Cokoli odešlete, počká, až budete zpět.',
    'lib.errors.offlineBackToast': 'Zase online',
    'lib.errors.offlineStillToast': 'Stále bez připojení',
    'lib.errors.retryToast': 'Zkoušíme znovu…',
    'lib.errors.reportToast': 'Napište nám, co jste dělali',
    'lib.errors.simulateFailToast': 'Simulováno neúspěšné načtení',

    'lib.auto.intro':
      'Běží {running} z {total}. Každá je jeden spouštěč a jedna akce — nic nepřehazujte, nic nerozbijete.',
    'lib.auto.introEmpty':
      'Zatím nic neběží. Automatizace je jeden spouštěč a jedna akce.',
    'lib.auto.paused': 'pozastaveno',
    'lib.auto.neverRun': 'zatím nespuštěno',
    'lib.auto.toastRunning': '{name} běží',
    'lib.auto.toastPaused': '{name} pozastaveno',
    'lib.auto.toastDeleted': '{name} smazáno',
    'lib.auto.nameToast': 'Pojmenujte automatizaci',
    'lib.auto.triggerToast': 'Vyberte spouštěč',
    'lib.auto.actionToast': 'Vyberte akci',
    'lib.auto.createdToast': 'Automatizace vytvořena',

    'lib.search.facetAll': 'Vše',
    'lib.search.countFor': '{results} pro „{query}“',

    'lib.thread.statusOpen': 'Otevřeno',
    'lib.thread.statusPending': 'Čeká',
    'lib.thread.statusSolved': 'Vyřešeno',
    'lib.thread.statusClosed': 'Uzavřeno',
    'lib.thread.timelineOpened': 'Založeno',
    'lib.thread.timelineFirstReply': 'První odpověď',
    'lib.thread.timelineSolved': 'Vyřešeno',
    'lib.thread.timelineClosed': 'Uzavřeno',
    'lib.thread.chatSubject': 'Živý chat',

    'lib.a11y.noteSize': 'velikost zobrazení {percent}',
    'lib.a11y.noteContrast': 'vyšší kontrast',
    'lib.a11y.noteMotion': 'omezený pohyb',
    'lib.a11y.noteDeuter': 'paleta pro barvoslepé',
    'lib.a11y.noteMono': 'monochromatická paleta',
    'lib.a11y.noteLabels': 'popisky ikon',
    'lib.a11y.noteChime': 'zvuk upozornění',
    'lib.a11y.noteNone':
      'Zatím nic změněno oproti výchozímu nastavení — vyberte možnost a celý portál se přizpůsobí.',
    'lib.a11y.noteApplied': 'Použito v celém portálu: {list}.',

    'lib.skeletons.note': 'načítá se {name}…',
    'lib.skeletons.helpCentre': 'centrum nápovědy',

    'lib.theme.noteManual':
      'Motiv jste nastavili ručně, takže zůstane. Kdykoli se můžete vrátit k nastavení zařízení.',
    'lib.theme.noteSystem':
      'Řídí se vaším zařízením — přepne se automaticky se systémem, i podle plánu.',
    'lib.theme.followToast': 'Řídí se motivem systému',
  },

  'da-DK': {
    'lib.format.planPriceFree': 'Gratis',
    'lib.format.readTime': '{minutes} min. læsning',
    'lib.format.readTimeShort': '{minutes} min.',
    'lib.format.justNow': 'Lige nu',
    'lib.format.updatedLine': 'Opdateret {when} · {product}',

    'lib.stores.kindFlagship': 'Hearth-butik',
    'lib.stores.kindStockist': 'Forhandler',
    'lib.stores.kindRecycling': 'Genbrugssted',
    'lib.stores.meta': '{hours} · {state}',
    'lib.stores.openNow': 'åbent nu',
    'lib.stores.closedNow': 'lukket nu',
    'lib.stores.emptyQuery': 'Intet i nærheden af „{query}“',
    'lib.stores.emptyFilter': 'Ingen adresser i dette filter',
    'lib.stores.searchNone': 'Intet passede til søgningen',
    'lib.stores.searchNearQuery': '{locations} nær {query}',
    'lib.stores.searchNearYou': '{locations} i nærheden af dig',
    'lib.stores.foundToast': '{locations} fundet',

    'lib.billing.statusPaid': 'Betalt',
    'lib.billing.statusRefunded': 'Refunderet',
    'lib.billing.statusRetrying': 'Forsøger igen',
    'lib.billing.emptyPeriodTitle': 'Ingen fakturaer i den periode',
    'lib.billing.emptyPeriodText':
      'Der blev ikke udstedt noget, mens du havde denne konto i den periode. Fakturaer vises den dag, de udstedes, og vi gemmer dem i syv år.',
    'lib.billing.emptyFilterTitle': 'Intet i dette filter',
    'lib.billing.emptyFilterPlan':
      'Ingen abonnementsfakturaer i denne periode — prøv et andet filter, eller eksportér det hele som CSV.',
    'lib.billing.emptyFilterHardware':
      'Ingen hardwarefakturaer i denne periode — prøv et andet filter, eller eksportér det hele som CSV.',
    'lib.billing.emptyFilterRefund':
      'Ingen refusioner i denne periode — prøv et andet filter, eller eksportér det hele som CSV.',
    'lib.billing.intro':
      'Alle fakturaer siden du blev kunde, plus hvad der kommer næste gang. Downloads er PDF-filer med moms specificeret.',
    'lib.billing.planFree': 'gratis',
    'lib.billing.perYear': '{price} / år',
    'lib.billing.perMonth': '{price} / måned',
    'lib.billing.noCharge':
      'Intet at fakturere — det gratis niveau koster ikke noget.',
    'lib.billing.nextCharge':
      'Næste betaling {date}, trukket fra kortet nedenfor.',
    'lib.billing.retryingPayment': 'Prøver betalingen for {id} igen',
    'lib.billing.downloading': 'Downloader {file}',

    'lib.wish.stockIn': 'På lager',
    'lib.wish.stockLow': 'Få på lager',
    'lib.wish.stockOut': 'Tilbage om 2 uger',
    'lib.wish.intro':
      '{n} gemt · vi holder øje med prisen og siger til, når noget rykker.',
    'lib.wish.introEmpty': 'Intet gemt lige nu.',
    'lib.wish.dropOne': '{name} er faldet {amount}, siden du gemte den.',
    'lib.wish.dropMany':
      '{n} vare er faldet i pris, siden du gemte den.|{n} varer er faldet i pris, siden du gemte dem.',
    'lib.wish.addOut': 'Vi sender en mail, når den er tilbage',
    'lib.wish.added': '{name} lagt i kurven',

    'lib.recent.intro':
      '{things} du har set på for nylig, nyeste først. Kun gemt på denne enhed.',
    'lib.recent.introEmpty': 'Intet her — din historik er tom.',
    'lib.recent.emptyFilterTitle': 'Intet i dette filter',
    'lib.recent.emptyFilterText':
      'Prøv en anden kategori — artikler og produkter spores hver for sig.',
    'lib.recent.emptyClearTitle': 'Din historik er ryddet',
    'lib.recent.emptyClearText':
      'Vi har glemt, hvad du så på. Nye besøg dukker op her igen.',
    'lib.recent.productSub': 'Set i Hearth-butikken',

    'lib.board.titleQuarter': 'Bedste henvisere, dette kvartal',
    'lib.board.titleAllTime': 'Bedste henvisere, gennem tiden',
    'lib.board.updated': 'opdateret for {minutes} minutter siden',
    'lib.board.tierGold': 'Guldhenviser',
    'lib.board.tierSilver': 'Sølvhenviser',
    'lib.board.tierBronze': 'Bronzehenviser',
    'lib.board.gapLine':
      '{n} mere, så er du i præmierækkerne. Hver ven giver stadig {amount} uanset hvad.|{n} mere, så er du i præmierækkerne. Hver ven giver stadig {amount} uanset hvad.',
    'lib.board.holdLine':
      'Du er i præmierækkerne — hold pladsen til kvartalet slutter.',

    'lib.guide.season': 'GAVEGUIDE VINTER 2026',
    'lib.guide.title': 'Gaver, der gør huset roligere, ikke travlere.',
    'lib.guide.blurb':
      'Seks ting, der er værd at pakke ind, valgt af dem, der tager telefonen, når noget går galt. Alt her installeres på en aften uden elektriker.',
    'lib.guide.cutoff': 'Fri fragt, bestil inden {date}',

    'lib.transfer.done':
      'Vi har sendt en mail til {name} på {email}. Når de accepterer, flytter den resterende dækning på din {product} med — den har allerede forladt din husstand.',

    'lib.insurance.stateReady': 'Klar',
    'lib.insurance.stateBuilding': 'Bygges',
    'lib.insurance.download': 'Hent pakke',
    'lib.insurance.checkProgress': 'Se status',

    'lib.basket.freeDelivery':
      'Fragten er gratis over {amount}, og det hele sendes samlet næste hverdag.',

    'lib.live.retention': 'gemt i {days} dage på Hearth Family',
    'lib.live.ctlTalk': 'Tal',
    'lib.live.ctlTalkToast': 'Tovejstale kræver Hearth-appen',
    'lib.live.ctlSnapshot': 'Snapshot',
    'lib.live.ctlSnapshotToast': 'Snapshot gemt i dine klip',
    'lib.live.ctlSound': 'Lyd til',
    'lib.live.ctlSoundToast': 'Lyden er slået fra i denne demo',
    'lib.live.ctlFullscreen': 'Fuld skærm',
    'lib.live.ctlFullscreenToast': 'Fuld skærm er ikke tilgængelig her',
    'lib.live.introOffline':
      '{name} kan ikke nås. Klip optaget før den faldt ud er der stadig — intet er tabt.',
    'lib.live.introOnline':
      'Streamer fra {name}. Live-visning er peer-to-peer, så den bliver ved med at virke, selv når vores sky ikke gør.',
    'lib.live.noFeedTitle': 'Intet signal fra {name}',
    'lib.live.noFeedText':
      'Kameraet har ikke meldt sig, så der er intet at vise live. Det er næsten altid strøm eller Wi-Fi-rækkevidde og ikke en fejl.',
    'lib.live.lastSeenUnknown': 'sidst set for et stykke tid siden',
    'lib.live.retryToast': 'Stadig intet svar fra {name}',

    'lib.clips.typePerson': 'Person',
    'lib.clips.typeParcel': 'Pakke',
    'lib.clips.typePress': 'Trykket',
    'lib.clips.typeMotion': 'Bevægelse',
    'lib.clips.emptyFilterTitle': 'Ingen klip i dette filter',
    'lib.clips.emptyFilterText':
      'Prøv en anden hændelsestype eller et andet kamera. Klip gemmes, så længe dit abonnement tillader.',
    'lib.clips.emptyCamTitle': 'Ingen klip fra {name} endnu',
    'lib.clips.emptyCamOfflineText':
      'Der blev ikke optaget noget, før {name} gik offline. Når den er tilbage, dukker nye hændelser op her inden for et minut.',
    'lib.clips.emptyCamOnlineText':
      'Intet optaget på {name} indtil videre. Bevægelse og dørklokke starter automatisk et klip.',
    'lib.clips.meta': '{cam} · {time}',
    'lib.clips.playToast': 'Afspiller {title} · {duration}',
    'lib.clips.downloadToast': 'Downloader {file}',
    'lib.clips.shareToast':
      'Delelink kopieret — udløber om {days} dage',
    'lib.clips.deleteToast': 'Klip slettet',

    'lib.share.stateActive': 'Aktiv',
    'lib.share.stateExpiring': 'Udløber snart',
    'lib.share.stateExpired': 'Udløbet',
    'lib.share.reactivate': 'Genaktivér',
    'lib.share.extendDays': 'Forlæng {days} dage',
    'lib.share.reactivatedToast': 'Link genaktiveret i {days} dage',
    'lib.share.extendedToast': 'Forlænget med {days} dage',
    'lib.share.expiryNever': 'ingen udløb',
    'lib.share.expiry24h': 'udløber om {hours} timer',
    'lib.share.expiry7d': 'udløber om {days} dage',
    'lib.share.expiry30d': 'udløber om {days} dage',
    'lib.share.clipMeta': '{cam} · {day} {time} · {duration}',

    'lib.errors.titleLive': 'Vi kunne ikke indlæse live-visningen',
    'lib.errors.titleAuto': 'Vi kunne ikke indlæse dine automatiseringer',
    'lib.errors.titleBilling': 'Vi kunne ikke indlæse dine fakturaer',
    'lib.errors.titleOrders': 'Vi kunne ikke indlæse din ordre',
    'lib.errors.titleDevices': 'Vi kunne ikke indlæse dine enheder',
    'lib.errors.titleEnergy': 'Vi kunne ikke indlæse dine energidata',
    'lib.errors.titleNotifs': 'Vi kunne ikke indlæse dine notifikationer',
    'lib.errors.titleMytickets': 'Vi kunne ikke indlæse dine sager',
    'lib.errors.titleThread': 'Vi kunne ikke indlæse denne samtale',
    'lib.errors.titleStatus': 'Vi kunne ikke indlæse statussiden',
    'lib.errors.titleDefault': 'Vi kunne ikke indlæse denne skærm',
    'lib.errors.text':
      'Forespørgslen fik timeout hos os, så intet af det, du var i gang med, er gået tabt. Et nyt forsøg plejer at virke — hvis ikke, siger statussiden, om det er os.',
    'lib.errors.card1Title': 'Dine enheder er i orden',
    'lib.errors.card1Text':
      'Tidsplaner, alarmer og lokal optagelse kører på hardwaren. Dette er vores website, ikke dit hjem.',
    'lib.errors.card2Title': 'Brug for svar nu?',
    'lib.errors.card2Text':
      'Chatten fungerer uafhængigt af denne side — åbn den, og et menneske svarer.',
    'lib.errors.card2Action': 'Åbn live-chat',
    'lib.errors.offlineTitle': 'Du er offline',
    'lib.errors.offlineText':
      'Sider, du allerede har åbnet, virker stadig. Alt hvad du sender, venter, til du er tilbage.',
    'lib.errors.offlineBackToast': 'Online igen',
    'lib.errors.offlineStillToast': 'Stadig ingen forbindelse',
    'lib.errors.retryToast': 'Prøver igen…',
    'lib.errors.reportToast': 'Fortæl os, hvad du var i gang med',
    'lib.errors.simulateFailToast': 'Simulerede en mislykket indlæsning',

    'lib.auto.intro':
      '{running} af {total} kører. Hver er én udløser og én handling — omorganisér intet, ødelæg intet.',
    'lib.auto.introEmpty':
      'Intet kører endnu. Automatiseringer er én udløser og én handling.',
    'lib.auto.paused': 'sat på pause',
    'lib.auto.neverRun': 'aldrig kørt endnu',
    'lib.auto.toastRunning': '{name} kører',
    'lib.auto.toastPaused': '{name} sat på pause',
    'lib.auto.toastDeleted': '{name} slettet',
    'lib.auto.nameToast': 'Giv automatiseringen et navn',
    'lib.auto.triggerToast': 'Vælg en udløser',
    'lib.auto.actionToast': 'Vælg en handling',
    'lib.auto.createdToast': 'Automatisering oprettet',

    'lib.search.facetAll': 'Alle',
    'lib.search.countFor': '{results} for „{query}“',

    'lib.thread.statusOpen': 'Åben',
    'lib.thread.statusPending': 'Afventer',
    'lib.thread.statusSolved': 'Løst',
    'lib.thread.statusClosed': 'Lukket',
    'lib.thread.timelineOpened': 'Oprettet',
    'lib.thread.timelineFirstReply': 'Første svar',
    'lib.thread.timelineSolved': 'Løst',
    'lib.thread.timelineClosed': 'Lukket',
    'lib.thread.chatSubject': 'Live-chat',

    'lib.a11y.noteSize': '{percent} visningsstørrelse',
    'lib.a11y.noteContrast': 'højere kontrast',
    'lib.a11y.noteMotion': 'reduceret bevægelse',
    'lib.a11y.noteDeuter': 'rød-grøn-venlig palet',
    'lib.a11y.noteMono': 'monokrom palet',
    'lib.a11y.noteLabels': 'ikonetiketter',
    'lib.a11y.noteChime': 'alarmlyd',
    'lib.a11y.noteNone':
      'Intet ændret fra standarderne endnu — vælg en indstilling, og hele portalen opdateres.',
    'lib.a11y.noteApplied': 'Anvendt i hele portalen: {list}.',

    'lib.skeletons.note': 'indlæser {name}…',
    'lib.skeletons.helpCentre': 'hjælpecenter',

    'lib.theme.noteManual':
      'Du har valgt temaet manuelt, så det bliver stående. Skift tilbage til at følge din enhed, når du vil.',
    'lib.theme.noteSystem':
      'Følger din enhed — det skifter automatisk med dit system, også efter tidsplan.',
    'lib.theme.followToast': 'Følger dit systemtema',
  },

  /* Chinese has a single cardinal category — one variant, never a `|`. */
  'zh-CN': {
    'lib.format.planPriceFree': '免费',
    'lib.format.readTime': '阅读约 {minutes} 分钟',
    'lib.format.readTimeShort': '{minutes} 分钟',
    'lib.format.justNow': '刚刚',
    'lib.format.updatedLine': '更新于 {when} · {product}',

    'lib.stores.kindFlagship': 'Hearth 门店',
    'lib.stores.kindStockist': '经销商',
    'lib.stores.kindRecycling': '回收点',
    'lib.stores.meta': '{hours} · {state}',
    'lib.stores.openNow': '现在营业',
    'lib.stores.closedNow': '现已打烊',
    'lib.stores.emptyQuery': '“{query}”附近没有门店',
    'lib.stores.emptyFilter': '该筛选下没有门店',
    'lib.stores.searchNone': '没有匹配的搜索结果',
    'lib.stores.searchNearQuery': '{query} 附近有 {locations}',
    'lib.stores.searchNearYou': '你附近有 {locations}',
    'lib.stores.foundToast': '找到 {locations}',

    'lib.billing.statusPaid': '已支付',
    'lib.billing.statusRefunded': '已退款',
    'lib.billing.statusRetrying': '重试中',
    'lib.billing.emptyPeriodTitle': '该期间没有账单',
    'lib.billing.emptyPeriodText':
      '在该期间，你使用此账户时没有开具任何账单。账单在开具当天出现，我们会保留七年。',
    'lib.billing.emptyFilterTitle': '该筛选下没有内容',
    'lib.billing.emptyFilterPlan':
      '该期间没有套餐账单 — 换个筛选条件，或把全部导出为 CSV。',
    'lib.billing.emptyFilterHardware':
      '该期间没有硬件账单 — 换个筛选条件，或把全部导出为 CSV。',
    'lib.billing.emptyFilterRefund':
      '该期间没有退款 — 换个筛选条件，或把全部导出为 CSV。',
    'lib.billing.intro':
      '自你加入以来的每一张账单，以及接下来的费用。下载文件为 PDF，增值税单独列出。',
    'lib.billing.planFree': '免费',
    'lib.billing.perYear': '{price} / 年',
    'lib.billing.perMonth': '{price} / 月',
    'lib.billing.noCharge': '无需付费 — 免费套餐不产生任何费用。',
    'lib.billing.nextCharge': '下次扣款 {date}，从下方的卡片扣除。',
    'lib.billing.retryingPayment': '正在重试 {id} 的付款',
    'lib.billing.downloading': '正在下载 {file}',

    'lib.wish.stockIn': '有货',
    'lib.wish.stockLow': '库存不多',
    'lib.wish.stockOut': '两周后到货',
    'lib.wish.intro': '已收藏 {n} 件 · 我们会盯着价格，有变动就通知你。',
    'lib.wish.introEmpty': '目前没有收藏。',
    'lib.wish.dropOne': '{name} 自你收藏以来降了 {amount}。',
    'lib.wish.dropMany': '自你收藏以来，有 {n} 件商品降价了。',
    'lib.wish.addOut': '到货后我们会发邮件通知你',
    'lib.wish.added': '{name} 已加入购物车',

    'lib.recent.intro':
      '最近看过的 {things}，最新的在前。仅保存在本设备上。',
    'lib.recent.introEmpty': '这里什么都没有 — 你的浏览记录是空的。',
    'lib.recent.emptyFilterTitle': '该筛选下没有内容',
    'lib.recent.emptyFilterText': '换个分类看看 — 文章和商品是分开记录的。',
    'lib.recent.emptyClearTitle': '浏览记录已清空',
    'lib.recent.emptyClearText':
      '我们已经忘了你看过什么。新的浏览会重新出现在这里。',
    'lib.recent.productSub': '在 Hearth 门店浏览',

    'lib.board.titleQuarter': '本季度推荐榜',
    'lib.board.titleAllTime': '历史推荐榜',
    'lib.board.updated': '{minutes} 分钟前更新',
    'lib.board.tierGold': '金牌推荐人',
    'lib.board.tierSilver': '银牌推荐人',
    'lib.board.tierBronze': '铜牌推荐人',
    'lib.board.gapLine':
      '再来 {n} 个就进入奖励名次了。无论如何，每位好友仍能带来 {amount}。',
    'lib.board.holdLine': '你已进入奖励名次 — 保持到本季度结束。',

    'lib.guide.season': '2026 冬季礼物指南',
    'lib.guide.title': '让家更安静、而不是更忙碌的礼物。',
    'lib.guide.blurb':
      '六件值得包起来的东西，由那些在出问题时接电话的人挑选。这里的一切都能在一个晚上装好，不用请电工。',
    'lib.guide.cutoff': '免运费，请在 {date} 前下单',

    'lib.transfer.done':
      '我们已发邮件给 {name}（{email}）。对方接受后，你 {product} 的剩余保障就会转过去 — 它已经离开你的家庭。',

    'lib.insurance.stateReady': '已就绪',
    'lib.insurance.stateBuilding': '生成中',
    'lib.insurance.download': '下载资料包',
    'lib.insurance.checkProgress': '查看进度',

    'lib.basket.freeDelivery':
      '满 {amount} 免运费，所有商品会在下一个工作日一起发出。',

    'lib.live.retention': 'Hearth Family 可保存 {days} 天',
    'lib.live.ctlTalk': '对讲',
    'lib.live.ctlTalkToast': '双向对讲需要 Hearth 应用',
    'lib.live.ctlSnapshot': '抓拍',
    'lib.live.ctlSnapshotToast': '抓拍已保存到你的录像',
    'lib.live.ctlSound': '开启声音',
    'lib.live.ctlSoundToast': '本演示中已静音',
    'lib.live.ctlFullscreen': '全屏',
    'lib.live.ctlFullscreenToast': '此处无法全屏',
    'lib.live.introOffline':
      '无法连接 {name}。掉线前录下的片段都还在 — 什么都没丢。',
    'lib.live.introOnline':
      '正在播放 {name} 的画面。实时画面是点对点传输，即使我们的云出问题也能继续。',
    'lib.live.noFeedTitle': '没有来自 {name} 的画面',
    'lib.live.noFeedText':
      '摄像头没有上报，所以没有实时画面。几乎总是供电或 Wi-Fi 信号的问题，而不是故障。',
    'lib.live.lastSeenUnknown': '上次出现是一段时间之前',
    'lib.live.retryToast': '{name} 仍然没有响应',

    'lib.clips.typePerson': '人形',
    'lib.clips.typeParcel': '包裹',
    'lib.clips.typePress': '按铃',
    'lib.clips.typeMotion': '移动',
    'lib.clips.emptyFilterTitle': '该筛选下没有录像',
    'lib.clips.emptyFilterText':
      '换个事件类型，或换个摄像头。录像会按你的套餐允许的时长保存。',
    'lib.clips.emptyCamTitle': '{name} 还没有录像',
    'lib.clips.emptyCamOfflineText':
      '{name} 掉线前没有录下任何内容。恢复后，新事件会在一分钟内出现在这里。',
    'lib.clips.emptyCamOnlineText':
      '{name} 目前还没有录下任何内容。检测到移动或有人按铃会自动开始录制。',
    'lib.clips.meta': '{cam} · {time}',
    'lib.clips.playToast': '正在播放 {title} · {duration}',
    'lib.clips.downloadToast': '正在下载 {file}',
    'lib.clips.shareToast': '分享链接已复制 — {days} 天后失效',
    'lib.clips.deleteToast': '录像已删除',

    'lib.share.stateActive': '有效',
    'lib.share.stateExpiring': '即将失效',
    'lib.share.stateExpired': '已失效',
    'lib.share.reactivate': '重新启用',
    'lib.share.extendDays': '延长 {days} 天',
    'lib.share.reactivatedToast': '链接已重新启用 {days} 天',
    'lib.share.extendedToast': '已延长 {days} 天',
    'lib.share.expiryNever': '永不失效',
    'lib.share.expiry24h': '{hours} 小时后失效',
    'lib.share.expiry7d': '{days} 天后失效',
    'lib.share.expiry30d': '{days} 天后失效',
    'lib.share.clipMeta': '{cam} · {day} {time} · {duration}',

    'lib.errors.titleLive': '无法加载实时画面',
    'lib.errors.titleAuto': '无法加载你的自动化',
    'lib.errors.titleBilling': '无法加载你的账单',
    'lib.errors.titleOrders': '无法加载你的订单',
    'lib.errors.titleDevices': '无法加载你的设备',
    'lib.errors.titleEnergy': '无法加载你的用电数据',
    'lib.errors.titleNotifs': '无法加载你的通知',
    'lib.errors.titleMytickets': '无法加载你的工单',
    'lib.errors.titleThread': '无法加载这段对话',
    'lib.errors.titleStatus': '无法加载状态页',
    'lib.errors.titleDefault': '无法加载此页面',
    'lib.errors.text':
      '请求在我们这边超时了，你刚才做的一切都没有丢失。重试通常就能解决 — 如果不行，状态页会说明是不是我们的问题。',
    'lib.errors.card1Title': '你的设备没有问题',
    'lib.errors.card1Text':
      '定时、警报和本地录制都在硬件上运行。出问题的是我们的网站，不是你的家。',
    'lib.errors.card2Title': '现在就需要答复？',
    'lib.errors.card2Text': '聊天独立于此页面运行 — 打开它，会有人接待你。',
    'lib.errors.card2Action': '打开在线聊天',
    'lib.errors.offlineTitle': '你已离线',
    'lib.errors.offlineText':
      '已经打开过的页面仍然可用。你发送的内容会等到恢复连接后再处理。',
    'lib.errors.offlineBackToast': '已恢复连接',
    'lib.errors.offlineStillToast': '仍然没有连接',
    'lib.errors.retryToast': '正在重试…',
    'lib.errors.reportToast': '告诉我们你当时在做什么',
    'lib.errors.simulateFailToast': '已模拟一次加载失败',

    'lib.auto.intro':
      '{total} 条中有 {running} 条在运行。每条都是一个触发条件加一个动作 — 不用排序，也不会弄坏什么。',
    'lib.auto.introEmpty':
      '还没有正在运行的规则。自动化就是一个触发条件加一个动作。',
    'lib.auto.paused': '已暂停',
    'lib.auto.neverRun': '还没有运行过',
    'lib.auto.toastRunning': '{name} 已启动',
    'lib.auto.toastPaused': '{name} 已暂停',
    'lib.auto.toastDeleted': '{name} 已删除',
    'lib.auto.nameToast': '给这条自动化起个名字',
    'lib.auto.triggerToast': '选择一个触发条件',
    'lib.auto.actionToast': '选择一个动作',
    'lib.auto.createdToast': '自动化已创建',

    'lib.search.facetAll': '全部',
    'lib.search.countFor': '“{query}”的 {results}',

    'lib.thread.statusOpen': '待处理',
    'lib.thread.statusPending': '等待回复',
    'lib.thread.statusSolved': '已解决',
    'lib.thread.statusClosed': '已关闭',
    'lib.thread.timelineOpened': '已提交',
    'lib.thread.timelineFirstReply': '首次回复',
    'lib.thread.timelineSolved': '已解决',
    'lib.thread.timelineClosed': '已关闭',
    'lib.thread.chatSubject': '在线聊天',

    'lib.a11y.noteSize': '显示大小 {percent}',
    'lib.a11y.noteContrast': '更高对比度',
    'lib.a11y.noteMotion': '减弱动效',
    'lib.a11y.noteDeuter': '红绿色盲友好配色',
    'lib.a11y.noteMono': '单色配色',
    'lib.a11y.noteLabels': '图标文字',
    'lib.a11y.noteChime': '提示音',
    'lib.a11y.noteNone':
      '还没有改动默认设置 — 选一项，整个门户都会跟着变。',
    'lib.a11y.noteApplied': '已应用于整个门户：{list}。',

    'lib.skeletons.note': '正在加载 {name}…',
    'lib.skeletons.helpCentre': '帮助中心',

    'lib.theme.noteManual':
      '你已手动设置主题，所以它不会变。随时都可以改回跟随设备。',
    'lib.theme.noteSystem':
      '跟随你的设备 — 系统切换时会自动跟着变，包括按计划切换。',
    'lib.theme.followToast': '已跟随系统主题',
  },

  'zh-TW': {
    'lib.format.planPriceFree': '免費',
    'lib.format.readTime': '閱讀約 {minutes} 分鐘',
    'lib.format.readTimeShort': '{minutes} 分鐘',
    'lib.format.justNow': '剛剛',
    'lib.format.updatedLine': '更新於 {when} · {product}',

    'lib.stores.kindFlagship': 'Hearth 門市',
    'lib.stores.kindStockist': '經銷商',
    'lib.stores.kindRecycling': '回收點',
    'lib.stores.meta': '{hours} · {state}',
    'lib.stores.openNow': '現正營業',
    'lib.stores.closedNow': '目前休息',
    'lib.stores.emptyQuery': '「{query}」附近沒有門市',
    'lib.stores.emptyFilter': '此篩選沒有門市',
    'lib.stores.searchNone': '沒有符合的搜尋結果',
    'lib.stores.searchNearQuery': '{query} 附近有 {locations}',
    'lib.stores.searchNearYou': '你附近有 {locations}',
    'lib.stores.foundToast': '找到 {locations}',

    'lib.billing.statusPaid': '已付款',
    'lib.billing.statusRefunded': '已退款',
    'lib.billing.statusRetrying': '重試中',
    'lib.billing.emptyPeriodTitle': '此期間沒有帳單',
    'lib.billing.emptyPeriodText':
      '在此期間，你使用這個帳戶時沒有開立任何帳單。帳單會在開立當天出現，我們會保留七年。',
    'lib.billing.emptyFilterTitle': '此篩選沒有內容',
    'lib.billing.emptyFilterPlan':
      '此期間沒有方案帳單 — 換個篩選條件，或將全部匯出為 CSV。',
    'lib.billing.emptyFilterHardware':
      '此期間沒有硬體帳單 — 換個篩選條件，或將全部匯出為 CSV。',
    'lib.billing.emptyFilterRefund':
      '此期間沒有退款 — 換個篩選條件，或將全部匯出為 CSV。',
    'lib.billing.intro':
      '自你加入以來的每一張帳單，以及接下來的費用。下載檔案為 PDF，加值稅另行列出。',
    'lib.billing.planFree': '免費',
    'lib.billing.perYear': '{price} / 年',
    'lib.billing.perMonth': '{price} / 月',
    'lib.billing.noCharge': '沒有要收的費用 — 免費方案不會產生任何費用。',
    'lib.billing.nextCharge': '下次扣款 {date}，從下方的卡片扣除。',
    'lib.billing.retryingPayment': '正在重試 {id} 的付款',
    'lib.billing.downloading': '正在下載 {file}',

    'lib.wish.stockIn': '有貨',
    'lib.wish.stockLow': '庫存不多',
    'lib.wish.stockOut': '兩週後到貨',
    'lib.wish.intro': '已收藏 {n} 件 · 我們會盯著價格，有變動就通知你。',
    'lib.wish.introEmpty': '目前沒有收藏。',
    'lib.wish.dropOne': '{name} 自你收藏以來降了 {amount}。',
    'lib.wish.dropMany': '自你收藏以來，有 {n} 件商品降價了。',
    'lib.wish.addOut': '到貨後我們會寄電子郵件通知你',
    'lib.wish.added': '{name} 已加入購物車',

    'lib.recent.intro':
      '最近看過的 {things}，最新的在前。僅儲存在這台裝置上。',
    'lib.recent.introEmpty': '這裡什麼都沒有 — 你的瀏覽紀錄是空的。',
    'lib.recent.emptyFilterTitle': '此篩選沒有內容',
    'lib.recent.emptyFilterText': '換個分類看看 — 文章和商品是分開記錄的。',
    'lib.recent.emptyClearTitle': '瀏覽紀錄已清空',
    'lib.recent.emptyClearText':
      '我們已經忘了你看過什麼。新的瀏覽會重新出現在這裡。',
    'lib.recent.productSub': '在 Hearth 門市瀏覽',

    'lib.board.titleQuarter': '本季推薦榜',
    'lib.board.titleAllTime': '歷來推薦榜',
    'lib.board.updated': '{minutes} 分鐘前更新',
    'lib.board.tierGold': '金牌推薦人',
    'lib.board.tierSilver': '銀牌推薦人',
    'lib.board.tierBronze': '銅牌推薦人',
    'lib.board.gapLine':
      '再來 {n} 個就進入獎勵名次了。無論如何，每位朋友仍能帶來 {amount}。',
    'lib.board.holdLine': '你已進入獎勵名次 — 保持到本季結束。',

    'lib.guide.season': '2026 冬季禮物指南',
    'lib.guide.title': '讓家更安靜、而不是更忙碌的禮物。',
    'lib.guide.blurb':
      '六件值得包起來的東西，由那些在出問題時接電話的人挑選。這裡的一切都能在一個晚上裝好，不用請水電師傅。',
    'lib.guide.cutoff': '免運費，請在 {date} 前下單',

    'lib.transfer.done':
      '我們已寄電子郵件給 {name}（{email}）。對方接受後，你 {product} 的剩餘保障就會轉過去 — 它已經離開你的家庭。',

    'lib.insurance.stateReady': '已就緒',
    'lib.insurance.stateBuilding': '產生中',
    'lib.insurance.download': '下載資料包',
    'lib.insurance.checkProgress': '查看進度',

    'lib.basket.freeDelivery':
      '滿 {amount} 免運費，所有商品會在下一個工作日一起寄出。',

    'lib.live.retention': 'Hearth Family 可保存 {days} 天',
    'lib.live.ctlTalk': '對講',
    'lib.live.ctlTalkToast': '雙向對講需要 Hearth 應用程式',
    'lib.live.ctlSnapshot': '快照',
    'lib.live.ctlSnapshotToast': '快照已儲存到你的錄影',
    'lib.live.ctlSound': '開啟聲音',
    'lib.live.ctlSoundToast': '本示範已靜音',
    'lib.live.ctlFullscreen': '全螢幕',
    'lib.live.ctlFullscreenToast': '這裡無法全螢幕',
    'lib.live.introOffline':
      '無法連線到 {name}。斷線前錄下的片段都還在 — 什麼都沒有遺失。',
    'lib.live.introOnline':
      '正在播放 {name} 的畫面。即時畫面採點對點傳輸，就算我們的雲端出問題也能繼續。',
    'lib.live.noFeedTitle': '沒有來自 {name} 的畫面',
    'lib.live.noFeedText':
      '攝影機沒有回報，所以沒有即時畫面。幾乎都是供電或 Wi-Fi 訊號的問題，而不是故障。',
    'lib.live.lastSeenUnknown': '上次出現是一段時間之前',
    'lib.live.retryToast': '{name} 仍然沒有回應',

    'lib.clips.typePerson': '人形',
    'lib.clips.typeParcel': '包裹',
    'lib.clips.typePress': '按鈴',
    'lib.clips.typeMotion': '移動',
    'lib.clips.emptyFilterTitle': '此篩選沒有錄影',
    'lib.clips.emptyFilterText':
      '換個事件類型，或換一台攝影機。錄影會依你的方案允許的時間保存。',
    'lib.clips.emptyCamTitle': '{name} 還沒有錄影',
    'lib.clips.emptyCamOfflineText':
      '{name} 斷線前沒有錄下任何內容。恢復後，新事件會在一分鐘內出現在這裡。',
    'lib.clips.emptyCamOnlineText':
      '{name} 目前還沒有錄下任何內容。偵測到移動或有人按鈴會自動開始錄製。',
    'lib.clips.meta': '{cam} · {time}',
    'lib.clips.playToast': '正在播放 {title} · {duration}',
    'lib.clips.downloadToast': '正在下載 {file}',
    'lib.clips.shareToast': '分享連結已複製 — {days} 天後失效',
    'lib.clips.deleteToast': '錄影已刪除',

    'lib.share.stateActive': '有效',
    'lib.share.stateExpiring': '即將失效',
    'lib.share.stateExpired': '已失效',
    'lib.share.reactivate': '重新啟用',
    'lib.share.extendDays': '延長 {days} 天',
    'lib.share.reactivatedToast': '連結已重新啟用 {days} 天',
    'lib.share.extendedToast': '已延長 {days} 天',
    'lib.share.expiryNever': '永不失效',
    'lib.share.expiry24h': '{hours} 小時後失效',
    'lib.share.expiry7d': '{days} 天後失效',
    'lib.share.expiry30d': '{days} 天後失效',
    'lib.share.clipMeta': '{cam} · {day} {time} · {duration}',

    'lib.errors.titleLive': '無法載入即時畫面',
    'lib.errors.titleAuto': '無法載入你的自動化',
    'lib.errors.titleBilling': '無法載入你的帳單',
    'lib.errors.titleOrders': '無法載入你的訂單',
    'lib.errors.titleDevices': '無法載入你的裝置',
    'lib.errors.titleEnergy': '無法載入你的用電資料',
    'lib.errors.titleNotifs': '無法載入你的通知',
    'lib.errors.titleMytickets': '無法載入你的工單',
    'lib.errors.titleThread': '無法載入這段對話',
    'lib.errors.titleStatus': '無法載入狀態頁',
    'lib.errors.titleDefault': '無法載入這個畫面',
    'lib.errors.text':
      '請求在我們這邊逾時了，你剛才做的一切都沒有遺失。重試通常就能解決 — 如果不行，狀態頁會說明是不是我們的問題。',
    'lib.errors.card1Title': '你的裝置沒有問題',
    'lib.errors.card1Text':
      '排程、警示和本機錄影都在硬體上執行。出問題的是我們的網站，不是你的家。',
    'lib.errors.card2Title': '現在就需要答覆？',
    'lib.errors.card2Text': '聊天獨立於這個頁面運作 — 打開它，會有人接手。',
    'lib.errors.card2Action': '開啟線上聊天',
    'lib.errors.offlineTitle': '你目前離線',
    'lib.errors.offlineText':
      '已經開過的頁面仍然可用。你送出的內容會等到恢復連線後再處理。',
    'lib.errors.offlineBackToast': '已恢復連線',
    'lib.errors.offlineStillToast': '仍然沒有連線',
    'lib.errors.retryToast': '正在重試…',
    'lib.errors.reportToast': '告訴我們你當時在做什麼',
    'lib.errors.simulateFailToast': '已模擬一次載入失敗',

    'lib.auto.intro':
      '{total} 條中有 {running} 條在執行。每條都是一個觸發條件加一個動作 — 不用排序，也不會弄壞什麼。',
    'lib.auto.introEmpty':
      '還沒有正在執行的規則。自動化就是一個觸發條件加一個動作。',
    'lib.auto.paused': '已暫停',
    'lib.auto.neverRun': '還沒有執行過',
    'lib.auto.toastRunning': '{name} 已啟動',
    'lib.auto.toastPaused': '{name} 已暫停',
    'lib.auto.toastDeleted': '{name} 已刪除',
    'lib.auto.nameToast': '給這條自動化取個名字',
    'lib.auto.triggerToast': '選擇一個觸發條件',
    'lib.auto.actionToast': '選擇一個動作',
    'lib.auto.createdToast': '自動化已建立',

    'lib.search.facetAll': '全部',
    'lib.search.countFor': '「{query}」的 {results}',

    'lib.thread.statusOpen': '待處理',
    'lib.thread.statusPending': '等待回覆',
    'lib.thread.statusSolved': '已解決',
    'lib.thread.statusClosed': '已關閉',
    'lib.thread.timelineOpened': '已送出',
    'lib.thread.timelineFirstReply': '首次回覆',
    'lib.thread.timelineSolved': '已解決',
    'lib.thread.timelineClosed': '已關閉',
    'lib.thread.chatSubject': '線上聊天',

    'lib.a11y.noteSize': '顯示大小 {percent}',
    'lib.a11y.noteContrast': '更高對比',
    'lib.a11y.noteMotion': '減弱動態效果',
    'lib.a11y.noteDeuter': '紅綠色盲友善配色',
    'lib.a11y.noteMono': '單色配色',
    'lib.a11y.noteLabels': '圖示文字',
    'lib.a11y.noteChime': '提示音',
    'lib.a11y.noteNone':
      '還沒有更動預設值 — 選一項，整個入口網站都會跟著變。',
    'lib.a11y.noteApplied': '已套用於整個入口網站：{list}。',

    'lib.skeletons.note': '正在載入 {name}…',
    'lib.skeletons.helpCentre': '說明中心',

    'lib.theme.noteManual':
      '你已手動設定佈景主題，所以它不會變。隨時都可以改回跟隨裝置。',
    'lib.theme.noteSystem':
      '跟隨你的裝置 — 系統切換時會自動跟著變，包括按排程切換。',
    'lib.theme.followToast': '已跟隨系統佈景主題',
  },

  /* Six variants, and the only RTL locale. Low counts read naturally in Arabic
   * by dropping the numeral, which is why some `zero`/`one`/`two` variants
   * carry no `{n}` — the same convention `count.*` in `./chrome.ts` uses. */
  'ar-EG': {
    'lib.format.planPriceFree': 'مجاني',
    'lib.format.readTime': '{minutes} دقيقة للقراءة',
    'lib.format.readTimeShort': '{minutes} دقيقة',
    'lib.format.justNow': 'الآن',
    'lib.format.updatedLine': 'تم التحديث {when} · {product}',

    'lib.stores.kindFlagship': 'متجر Hearth',
    'lib.stores.kindStockist': 'موزّع معتمد',
    'lib.stores.kindRecycling': 'نقطة إعادة تدوير',
    'lib.stores.meta': '{hours} · {state}',
    'lib.stores.openNow': 'مفتوح الآن',
    'lib.stores.closedNow': 'مغلق الآن',
    'lib.stores.emptyQuery': 'لا يوجد شيء بالقرب من «{query}»',
    'lib.stores.emptyFilter': 'لا توجد فروع ضمن هذه التصفية',
    'lib.stores.searchNone': 'لم يطابق البحث أي نتيجة',
    'lib.stores.searchNearQuery': '{locations} بالقرب من {query}',
    'lib.stores.searchNearYou': '{locations} بالقرب منك',
    'lib.stores.foundToast': 'تم العثور على {locations}',

    'lib.billing.statusPaid': 'مدفوعة',
    'lib.billing.statusRefunded': 'مستردة',
    'lib.billing.statusRetrying': 'إعادة المحاولة',
    'lib.billing.emptyPeriodTitle': 'لا توجد فواتير في تلك الفترة',
    'lib.billing.emptyPeriodText':
      'لم يصدر أي شيء أثناء وجودك على هذا الحساب في تلك الفترة. تظهر الفواتير يوم إصدارها، ونحتفظ بها سبع سنوات.',
    'lib.billing.emptyFilterTitle': 'لا يوجد شيء ضمن هذه التصفية',
    'lib.billing.emptyFilterPlan':
      'لا توجد فواتير اشتراك في هذه الفترة — جرّب تصفية أخرى، أو صدّر كل شيء بصيغة CSV.',
    'lib.billing.emptyFilterHardware':
      'لا توجد فواتير أجهزة في هذه الفترة — جرّب تصفية أخرى، أو صدّر كل شيء بصيغة CSV.',
    'lib.billing.emptyFilterRefund':
      'لا توجد مبالغ مستردة في هذه الفترة — جرّب تصفية أخرى، أو صدّر كل شيء بصيغة CSV.',
    'lib.billing.intro':
      'كل فاتورة منذ انضمامك، بالإضافة إلى ما هو قادم. الملفات المتاحة للتنزيل بصيغة PDF مع بيان ضريبة القيمة المضافة.',
    'lib.billing.planFree': 'مجاني',
    'lib.billing.perYear': '{price} / سنة',
    'lib.billing.perMonth': '{price} / شهر',
    'lib.billing.noCharge': 'لا شيء للفوترة — الباقة المجانية بلا رسوم.',
    'lib.billing.nextCharge': 'الخصم التالي {date}، من البطاقة أدناه.',
    'lib.billing.retryingPayment': 'إعادة محاولة الدفع للفاتورة {id}',
    'lib.billing.downloading': 'جارٍ تنزيل {file}',

    'lib.wish.stockIn': 'متوفر',
    'lib.wish.stockLow': 'الكمية محدودة',
    'lib.wish.stockOut': 'يعود خلال أسبوعين',
    'lib.wish.intro': '{n} محفوظة · نراقب السعر ونخبرك عند أي تغيّر.',
    'lib.wish.introEmpty': 'لا يوجد شيء محفوظ حاليًا.',
    'lib.wish.dropOne': 'انخفض سعر {name} بمقدار {amount} منذ حفظه.',
    'lib.wish.dropMany':
      'لم ينخفض سعر أي عنصر منذ حفظه.|انخفض سعر عنصر واحد منذ حفظه.|انخفض سعر عنصرين منذ حفظهما.|انخفضت أسعار {n} عناصر منذ حفظها.|انخفضت أسعار {n} عنصرًا منذ حفظها.|انخفضت أسعار {n} عنصر منذ حفظها.',
    'lib.wish.addOut': 'سنرسل لك بريدًا إلكترونيًا عند توفره',
    'lib.wish.added': 'تمت إضافة {name} إلى سلتك',

    'lib.recent.intro':
      '{things} اطّلعت عليها مؤخرًا، الأحدث أولًا. محفوظة على هذا الجهاز فقط.',
    'lib.recent.introEmpty': 'لا يوجد شيء هنا — سجلك فارغ.',
    'lib.recent.emptyFilterTitle': 'لا يوجد شيء ضمن هذه التصفية',
    'lib.recent.emptyFilterText':
      'جرّب فئة أخرى — تُتابَع المقالات والمنتجات كلٌّ على حدة.',
    'lib.recent.emptyClearTitle': 'تم مسح سجلك',
    'lib.recent.emptyClearText':
      'نسينا ما اطّلعت عليه. ستبدأ الزيارات الجديدة بالظهور هنا من جديد.',
    'lib.recent.productSub': 'شوهد في متجر Hearth',

    'lib.board.titleQuarter': 'أفضل المُحيلين هذا الربع',
    'lib.board.titleAllTime': 'أفضل المُحيلين على الإطلاق',
    'lib.board.updated': 'تم التحديث قبل {minutes} دقيقة',
    'lib.board.tierGold': 'مُحيل ذهبي',
    'lib.board.tierSilver': 'مُحيل فضي',
    'lib.board.tierBronze': 'مُحيل برونزي',
    'lib.board.gapLine':
      'لم يتبقَّ سوى {n} لتدخل مراكز الجوائز. كل صديق يمنحك {amount} على أي حال.|صديق واحد إضافي يدخلك مراكز الجوائز. كل صديق يمنحك {amount} على أي حال.|صديقان إضافيان يدخلانك مراكز الجوائز. كل صديق يمنحك {amount} على أي حال.|{n} أصدقاء إضافيين يدخلونك مراكز الجوائز. كل صديق يمنحك {amount} على أي حال.|{n} صديقًا إضافيًا يدخلك مراكز الجوائز. كل صديق يمنحك {amount} على أي حال.|{n} صديق إضافي يدخلك مراكز الجوائز. كل صديق يمنحك {amount} على أي حال.',
    'lib.board.holdLine':
      'أنت ضمن مراكز الجوائز — حافظ على مركزك حتى نهاية الربع.',

    'lib.guide.season': 'دليل هدايا شتاء ٢٠٢٦',
    'lib.guide.title': 'هدايا تجعل البيت أهدأ، لا أكثر انشغالًا.',
    'lib.guide.blurb':
      'ستة أشياء تستحق التغليف، اختارها من يردّون على الهاتف حين تتعطل. كل ما هنا يُركَّب في أمسية واحدة دون كهربائي.',
    'lib.guide.cutoff': 'توصيل مجاني، اطلب قبل {date}',

    'lib.transfer.done':
      'أرسلنا بريدًا إلى {name} على {email}. بمجرد قبوله، تنتقل التغطية المتبقية على {product} إليه — فقد غادر منزلك بالفعل.',

    'lib.insurance.stateReady': 'جاهز',
    'lib.insurance.stateBuilding': 'قيد الإعداد',
    'lib.insurance.download': 'تنزيل الحزمة',
    'lib.insurance.checkProgress': 'متابعة التقدم',

    'lib.basket.freeDelivery':
      'التوصيل مجاني لما يتجاوز {amount}، ويُشحن كل شيء معًا في يوم العمل التالي.',

    'lib.live.retention': 'محفوظة {days} يومًا على Hearth Family',
    'lib.live.ctlTalk': 'تحدث',
    'lib.live.ctlTalkToast': 'التحدث ثنائي الاتجاه يتطلب تطبيق Hearth',
    'lib.live.ctlSnapshot': 'لقطة',
    'lib.live.ctlSnapshotToast': 'حُفظت اللقطة ضمن مقاطعك',
    'lib.live.ctlSound': 'تشغيل الصوت',
    'lib.live.ctlSoundToast': 'الصوت مكتوم في هذا العرض التوضيحي',
    'lib.live.ctlFullscreen': 'ملء الشاشة',
    'lib.live.ctlFullscreenToast': 'ملء الشاشة غير متاح هنا',
    'lib.live.introOffline':
      'تعذّر الوصول إلى {name}. المقاطع المسجلة قبل انقطاعها ما زالت هنا — لم يُفقد شيء.',
    'lib.live.introOnline':
      'بث مباشر من {name}. العرض المباشر يتم من جهاز إلى جهاز، فيستمر في العمل حتى عندما تتعطل سحابتنا.',
    'lib.live.noFeedTitle': 'لا يوجد بث من {name}',
    'lib.live.noFeedText':
      'لم تسجّل الكاميرا حضورها، فلا يوجد بث مباشر لعرضه. غالبًا ما يكون السبب الكهرباء أو مدى Wi-Fi وليس عطلًا.',
    'lib.live.lastSeenUnknown': 'آخر ظهور منذ فترة',
    'lib.live.retryToast': 'ما زال لا رد من {name}',

    'lib.clips.typePerson': 'شخص',
    'lib.clips.typeParcel': 'طرد',
    'lib.clips.typePress': 'ضغط الجرس',
    'lib.clips.typeMotion': 'حركة',
    'lib.clips.emptyFilterTitle': 'لا توجد مقاطع ضمن هذه التصفية',
    'lib.clips.emptyFilterText':
      'جرّب نوع حدث آخر، أو كاميرا أخرى. تُحفظ المقاطع طوال المدة التي تسمح بها باقتك.',
    'lib.clips.emptyCamTitle': 'لا توجد مقاطع من {name} بعد',
    'lib.clips.emptyCamOfflineText':
      'لم يُسجَّل شيء قبل انقطاع {name}. وبمجرد عودتها، تظهر الأحداث الجديدة هنا خلال دقيقة.',
    'lib.clips.emptyCamOnlineText':
      'لم يُسجَّل شيء على {name} حتى الآن. الحركة وضغط الجرس يبدآن مقطعًا تلقائيًا.',
    'lib.clips.meta': '{cam} · {time}',
    'lib.clips.playToast': 'تشغيل {title} · {duration}',
    'lib.clips.downloadToast': 'جارٍ تنزيل {file}',
    'lib.clips.shareToast': 'تم نسخ رابط المشاركة — ينتهي خلال {days} أيام',
    'lib.clips.deleteToast': 'تم حذف المقطع',

    'lib.share.stateActive': 'نشط',
    'lib.share.stateExpiring': 'ينتهي قريبًا',
    'lib.share.stateExpired': 'منتهٍ',
    'lib.share.reactivate': 'إعادة التفعيل',
    'lib.share.extendDays': 'تمديد {days} أيام',
    'lib.share.reactivatedToast': 'أُعيد تفعيل الرابط لمدة {days} أيام',
    'lib.share.extendedToast': 'تم التمديد {days} أيام',
    'lib.share.expiryNever': 'بلا انتهاء',
    'lib.share.expiry24h': 'ينتهي خلال {hours} ساعة',
    'lib.share.expiry7d': 'ينتهي خلال {days} أيام',
    'lib.share.expiry30d': 'ينتهي خلال {days} يومًا',
    'lib.share.clipMeta': '{cam} · {day} {time} · {duration}',

    'lib.errors.titleLive': 'تعذّر تحميل العرض المباشر',
    'lib.errors.titleAuto': 'تعذّر تحميل الأتمتة الخاصة بك',
    'lib.errors.titleBilling': 'تعذّر تحميل فواتيرك',
    'lib.errors.titleOrders': 'تعذّر تحميل طلبك',
    'lib.errors.titleDevices': 'تعذّر تحميل أجهزتك',
    'lib.errors.titleEnergy': 'تعذّر تحميل بيانات الطاقة الخاصة بك',
    'lib.errors.titleNotifs': 'تعذّر تحميل إشعاراتك',
    'lib.errors.titleMytickets': 'تعذّر تحميل طلباتك',
    'lib.errors.titleThread': 'تعذّر تحميل هذه المحادثة',
    'lib.errors.titleStatus': 'تعذّر تحميل صفحة الحالة',
    'lib.errors.titleDefault': 'تعذّر تحميل هذه الشاشة',
    'lib.errors.text':
      'انتهت مهلة الطلب لدينا، فلم يضع أي شيء كنت تقوم به. المحاولة مرة أخرى تنجح عادةً — وإن لم تنجح، فستوضح صفحة الحالة ما إذا كان الخلل من عندنا.',
    'lib.errors.card1Title': 'أجهزتك بخير',
    'lib.errors.card1Text':
      'الجداول والتنبيهات والتسجيل المحلي تعمل على الجهاز نفسه. هذا موقعنا، وليس منزلك.',
    'lib.errors.card2Title': 'تحتاج إلى إجابة الآن؟',
    'lib.errors.card2Text':
      'تعمل الدردشة بمعزل عن هذه الصفحة — افتحها وسيرد عليك أحد الموظفين.',
    'lib.errors.card2Action': 'فتح الدردشة المباشرة',
    'lib.errors.offlineTitle': 'أنت غير متصل',
    'lib.errors.offlineText':
      'الصفحات التي فتحتها بالفعل ما زالت تعمل. وكل ما ترسله سينتظر حتى تعود.',
    'lib.errors.offlineBackToast': 'عاد الاتصال',
    'lib.errors.offlineStillToast': 'ما زال لا يوجد اتصال',
    'lib.errors.retryToast': 'جارٍ إعادة المحاولة…',
    'lib.errors.reportToast': 'أخبرنا بما كنت تفعله',
    'lib.errors.simulateFailToast': 'تمت محاكاة فشل في التحميل',

    'lib.auto.intro':
      '{running} من {total} قيد التشغيل. كل قاعدة هي مُشغِّل واحد وإجراء واحد — لا ترتيب ولا أعطال.',
    'lib.auto.introEmpty':
      'لا شيء قيد التشغيل بعد. الأتمتة هي مُشغِّل واحد وإجراء واحد.',
    'lib.auto.paused': 'متوقفة مؤقتًا',
    'lib.auto.neverRun': 'لم تُشغَّل بعد',
    'lib.auto.toastRunning': '{name} قيد التشغيل',
    'lib.auto.toastPaused': '{name} متوقفة مؤقتًا',
    'lib.auto.toastDeleted': 'تم حذف {name}',
    'lib.auto.nameToast': 'أعطِ الأتمتة اسمًا',
    'lib.auto.triggerToast': 'اختر مُشغِّلًا',
    'lib.auto.actionToast': 'اختر إجراءً',
    'lib.auto.createdToast': 'تم إنشاء الأتمتة',

    'lib.search.facetAll': 'الكل',
    'lib.search.countFor': '{results} عن «{query}»',

    'lib.thread.statusOpen': 'مفتوح',
    'lib.thread.statusPending': 'قيد الانتظار',
    'lib.thread.statusSolved': 'تم الحل',
    'lib.thread.statusClosed': 'مغلق',
    'lib.thread.timelineOpened': 'تم الفتح',
    'lib.thread.timelineFirstReply': 'أول رد',
    'lib.thread.timelineSolved': 'تم الحل',
    'lib.thread.timelineClosed': 'مغلق',
    'lib.thread.chatSubject': 'دردشة مباشرة',

    'lib.a11y.noteSize': 'حجم العرض {percent}',
    'lib.a11y.noteContrast': 'تباين أعلى',
    'lib.a11y.noteMotion': 'حركة مخفّفة',
    'lib.a11y.noteDeuter': 'لوحة ألوان مناسبة لعمى الأحمر والأخضر',
    'lib.a11y.noteMono': 'لوحة ألوان أحادية',
    'lib.a11y.noteLabels': 'تسميات الأيقونات',
    'lib.a11y.noteChime': 'صوت التنبيه',
    'lib.a11y.noteNone':
      'لم يتغير شيء عن الإعدادات الافتراضية بعد — اختر خيارًا وستتحدث البوابة بالكامل.',
    'lib.a11y.noteApplied': 'مُطبَّق على البوابة بالكامل: {list}.',

    'lib.skeletons.note': 'جارٍ تحميل {name}…',
    'lib.skeletons.helpCentre': 'مركز المساعدة',

    'lib.theme.noteManual':
      'لقد ضبطت المظهر يدويًا، لذا سيبقى كما هو. يمكنك العودة إلى اتباع جهازك متى شئت.',
    'lib.theme.noteSystem':
      'مطابق لجهازك — يتبدّل تلقائيًا مع نظامك، بما في ذلك حسب جدول زمني.',
    'lib.theme.followToast': 'يتبع مظهر نظامك',
  },
} satisfies Record<LocaleTag, Record<string, string>>;
