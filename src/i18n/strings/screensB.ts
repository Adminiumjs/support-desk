/**
 * Area: screens, second half — `src/screens/` from Live through Wish
 * (alphabetical): Live, Members, MyTickets, NewTicket, NotFound, Notifs,
 * Orders, Overview, Partner, Parts, Plans, Recent, Recycle, Refer, Repair,
 * Returns, Saved, Security, Share, Status, Stores, Survey, Thread, Tour,
 * Trade, TradeIn, Transfer, Warranty, Wish.
 *
 * Conventions in force here:
 *  - `{placeholder}` names, count and spelling are identical in all eight
 *    locales; word order inside the message is the translator's.
 *  - `screensB.recent.note` and `screensB.trade.foot` carry a literal `{link}`
 *    marker. No params are passed for those two, so the marker survives lookup
 *    and the screen splits on it to wrap an inline button.
 *  - Brand and product names — Hearth, Hearth Care, Hearth Free, Hearth Pro —
 *    are never translated, only the words around them.
 *  - Money, counts and dates arrive already formatted by `Intl`; nothing in
 *    this file writes a currency symbol or a digit group of its own.
 */
import type { LocaleTag } from '../locales';

export const screensB = {
  'en-US': {
    /* ---------------------------------------------------------------- live */
    'screensB.live.h1': 'Live view & clips',
    'screensB.live.clipHistory': 'Clip history',
    'screensB.live.note':
      "Clips are encrypted end to end. Sharing creates a link that expires after 7 days, and we can't watch what's behind it.",

    /* ------------------------------------------------------------- members */
    'screensB.members.h1': 'Household members',
    'screensB.members.lede':
      'Share the home without sharing your password. Guests never see clip history, and you can remove anyone instantly.',
    'screensB.members.roleOwner': 'Owner',
    'screensB.members.roleAdult': 'Adult',
    'screensB.members.roleGuest': 'Guest',
    'screensB.members.roleLabel': 'Role',
    'screensB.members.needEmail': 'Enter an email address',
    'screensB.members.pendingMeta': '{email} · invite pending',
    'screensB.members.permFrontDoor': 'Front door only',
    'screensB.members.permAllDevices': 'All devices',
    'screensB.members.inviteByEmail': 'Invite by email',
    'screensB.members.sendInvite': 'Send invite',
    'screensB.members.inviteSent': 'Invite sent',
    'screensB.members.inviteSentTo': 'Invite sent to {email}',
    'screensB.members.inviteSentBody':
      "It expires in 14 days. They'll appear below as pending until they accept.",
    'screensB.members.nowAdult': '{name} is now an adult',
    'screensB.members.nowGuest': '{name} is now a guest',
    'screensB.members.removed': '{name} removed',
    'screensB.members.thatsYou': "That's you",
    'screensB.members.roleFor': 'Role for {name}',
    'screensB.members.remove': 'Remove',
    'screensB.members.emptyTitle': 'Just you in this household',
    'screensB.members.emptyBody':
      'Nobody else has access. Invite someone above and they can use live view and unlocking without ever seeing your password.',
    'screensB.members.note':
      'Only the owner can add or remove devices, see billing, or close the account. Adults can do everything else; guests get live view and unlocking during the hours you set.',

    /* ----------------------------------------------------------- myTickets */
    'screensB.myTickets.title': 'My tickets',
    'screensB.myTickets.lede': 'Look up your open and past conversations with us.',
    'screensB.myTickets.emailLabel': 'Email address',
    'screensB.myTickets.show': 'Show my tickets',
    'screensB.myTickets.showingFor': 'Showing tickets for {email}',
    'screensB.myTickets.help': "We'll show tickets for this address — demo data.",

    /* ----------------------------------------------------------- newTicket */
    'screensB.newTicket.title': 'Open a ticket',
    'screensB.newTicket.lede':
      "Tell us what's going on and we'll get back to you. The more detail, the faster we can help.",
    'screensB.newTicket.product': 'Which product?',
    'screensB.newTicket.topic': 'Topic',
    'screensB.newTicket.topicPlaceholder': 'Choose a topic…',
    'screensB.newTicket.subject': 'Subject',
    'screensB.newTicket.subjectPlaceholder':
      'A short summary, e.g. "Doorbell offline every night"',
    'screensB.newTicket.description': 'Description',
    'screensB.newTicket.counter': '{used}/{max}',
    'screensB.newTicket.descPlaceholder':
      "What's happening? Include what you've already tried, any error messages, and when it started.",
    'screensB.newTicket.attachments': 'Attachments',
    'screensB.newTicket.addFile': 'Add file',
    'screensB.newTicket.simulated': 'Replies in this demo are simulated.',
    'screensB.newTicket.submit': 'Submit ticket',

    /* ------------------------------------------------------------ notFound */
    'screensB.notFound.code': 'ERROR 404',
    'screensB.notFound.title': 'This page took a wrong turn.',
    'screensB.notFound.body':
      "The page you're looking for isn't here — it may have moved, or it hasn't been built for this demo yet.",
    'screensB.notFound.home': 'Back to help center',
    'screensB.notFound.ticket': 'Open a ticket',

    /* -------------------------------------------------------------- notifs */
    'screensB.notifs.h1': 'Notifications',
    'screensB.notifs.introUnread':
      '{count} unread · we keep 90 days of history, and you can tune what arrives.',
    'screensB.notifs.introClear': 'All caught up — we keep 90 days of history.',
    'screensB.notifs.markAllRead': 'Mark all read',
    'screensB.notifs.settingsLabel': 'Notification settings',
    'screensB.notifs.settingsLive': 'Alert settings live with accessibility here',
    'screensB.notifs.allMarkedRead': 'All marked read',
    'screensB.notifs.inboxCleared': 'Inbox cleared',
    'screensB.notifs.inboxClearedBody':
      'Nothing unread left. New alerts will appear at the top as they arrive.',
    'screensB.notifs.alertSettings': 'Alert settings',
    'screensB.notifs.unread': 'Unread',
    'screensB.notifs.emptyTitle': 'Nothing in this filter',
    'screensB.notifs.emptyBody': 'Try another category — we keep 90 days of history.',

    /* -------------------------------------------------------------- orders */
    'screensB.orders.h1': 'Order status',
    'screensB.orders.lede':
      'Enter your order number and the email you ordered with. Tracking updates land here within an hour of a scan.',
    'screensB.orders.statusTransit': 'In transit',
    'screensB.orders.statusDelivered': 'Delivered',
    'screensB.orders.statusPacking': 'Preparing',
    'screensB.orders.headlineDelivered': 'Delivered {day}',
    'screensB.orders.headlinePacking': 'Packing now, ships tomorrow',
    'screensB.orders.headlineTransit': 'Arriving Tue 28 Jul',
    'screensB.orders.errNoNumber': 'Enter the order number from your confirmation email.',
    'screensB.orders.errNotFound':
      "We couldn't find an order matching {id}. Check the number on your confirmation email — it starts with {prefix}.",
    'screensB.orders.errNoEmail':
      "Enter the email address used on the order so we can confirm it's yours.",
    'screensB.orders.errEmailMismatch':
      "That order exists, but the email doesn't match our records. Try the address on your confirmation email.",
    'screensB.orders.found': 'Found order {id}',
    'screensB.orders.trackingCopied': 'Tracking number copied',
    'screensB.orders.numberLabel': 'Order number',
    'screensB.orders.emailLabel': 'Email on the order',
    'screensB.orders.find': 'Find my order',
    'screensB.orders.demoOrders': 'Demo orders:',
    'screensB.orders.placedLine': 'Placed {placed} · {items}',
    'screensB.orders.carrier': 'Carrier',
    'screensB.orders.copyTracking': 'Copy tracking number',
    'screensB.orders.deliveringTo': 'Delivering to',
    'screensB.orders.inThisOrder': 'In this order',
    'screensB.orders.qty': 'Qty {n}',
    'screensB.orders.total': 'Total',
    'screensB.orders.somethingWrong': "Something's wrong with this order",
    'screensB.orders.askDelivery': 'Ask about delivery',

    /* ------------------------------------------------------------ overview */
    'screensB.overview.eyebrow': 'OVERVIEW',
    'screensB.overview.h1': 'Every screen in the portal',
    'screensB.overview.lede':
      '{count} screens, all interactive. Jump straight to any of them — flows link to each other the way they would in production.',
    'screensB.overview.lightTheme': 'Light theme',
    'screensB.overview.darkTheme': 'Dark theme',
    'screensB.overview.openPortal': 'Open the portal',

    /* ------------------------------------------------------------- partner */
    'screensB.partner.approved': 'Approved partner',
    'screensB.partner.tradeAccount': 'Trade account',
    'screensB.partner.supportLine': 'Partner support line',
    'screensB.partner.kpiJobs': 'Jobs this month',
    'screensB.partner.kpiRating': 'Rating',
    'screensB.partner.kpiPayout': 'Next payout',
    'screensB.partner.kpiResponse': 'Response time',
    'screensB.partner.jobRequests': 'Job requests',
    'screensB.partner.queueLine': '{waiting} waiting · matched to your skills',
    'screensB.partner.queueClear': 'Queue clear',
    'screensB.partner.queueClearBody':
      'New requests in your area land here. We match on distance, tier and the skills on your profile.',
    'screensB.partner.payWarranty': 'Paid by Hearth',
    'screensB.partner.payCustomer': 'Paid by customer',
    'screensB.partner.acceptJob': 'Accept job',
    'screensB.partner.pass': 'Pass',
    'screensB.partner.messageCustomer': 'Message customer',
    'screensB.partner.messagingToast': "Partner messaging isn't available in this demo",
    'screensB.partner.accepted': 'Job accepted — customer notified',
    'screensB.partner.passed': 'Passed — back to the pool',
    'screensB.partner.certification': 'Certification',
    'screensB.partner.certBody':
      'Two modules left before your Gold tier renews in October.',
    'screensB.partner.continueTraining': 'Continue training',
    'screensB.partner.trainingToast': 'Training modules live in the partner app',
    'screensB.partner.resources': 'Partner resources',
    'screensB.partner.resourcesToast': "Partner resources aren't in this demo",
    'screensB.partner.nextPayout': 'Next payout',

    /* --------------------------------------------------------------- parts */
    'screensB.parts.h1': 'Spare parts',
    'screensB.parts.lede':
      "Every part we've ever shipped, available for at least seven years after a product launches. Under warranty? Don't buy anything — make a claim and we'll send it free.",
    'screensB.parts.stockIn': 'In stock',
    'screensB.parts.stockLow': 'Low stock',
    'screensB.parts.stockOut': 'Back in 2 weeks',
    'screensB.parts.emptyTitle': 'No parts for that device',
    'screensB.parts.emptyBody':
      'We keep parts for at least seven years after launch, so if something is missing here it is worth asking us directly.',
    'screensB.parts.openTicket': 'Open a ticket',
    'screensB.parts.fitsLine': '{sku} · fits {fits}',
    'screensB.parts.removeOne': 'Remove one {name}',
    'screensB.parts.addAnother': 'Add another {name}',
    'screensB.parts.notifyToast': "We'll email you when it's back",
    'screensB.parts.notify': 'Notify me',
    'screensB.parts.add': 'Add',
    'screensB.parts.basketEmptied': 'Basket emptied',
    'screensB.parts.checkoutToast': "Checkout isn't available in this demo",
    'screensB.parts.freeDelivery': 'Free delivery included',
    'screensB.parts.moreForFree': '{amount} more for free delivery',
    'screensB.parts.inYourBasket': '{parts} in your basket',
    'screensB.parts.empty': 'Empty',
    'screensB.parts.checkout': 'Checkout',
    'screensB.parts.callout':
      'Most parts fit with a screwdriver and ten minutes. Every part page in the app links to a step-by-step repair guide — no soldering, ever.',

    /* --------------------------------------------------------------- plans */
    'screensB.plans.title': 'Hearth Care plans',
    'screensB.plans.lede':
      "Clip history, priority support and free out-of-warranty repairs. Every plan works with as many devices as you own — cancel any time, keep the recordings you've downloaded.",
    'screensB.plans.cycleLabel': 'Billing cycle',
    'screensB.plans.cycleMonthly': 'Monthly',
    'screensB.plans.free': 'Free',
    'screensB.plans.perAlways': 'always',
    'screensB.plans.perYear': 'per year',
    'screensB.plans.perMonth': 'per month',
    'screensB.plans.noCard': 'No card needed',
    'screensB.plans.worksOut': 'works out at {amount} a month',
    'screensB.plans.billedMonthly': 'billed monthly, cancel any time',
    'screensB.plans.freeTierBilling': "You're on the free tier — nothing to bill.",
    'screensB.plans.pricePerYear': '{amount} a year',
    'screensB.plans.pricePerMonth': '{amount} a month',
    'screensB.plans.billingLine': '{plan}, {price} {suffix} · next charge {date}',
    'screensB.plans.switched': 'Switched to {plan}',
    'screensB.plans.alreadyFree': "You're already on the free tier",
    'screensB.plans.cancelled': "Plan cancelled — you're on Hearth Free",
    'screensB.plans.currentPlan': 'Current plan',
    'screensB.plans.mostChosen': 'Most chosen',
    'screensB.plans.yourCurrentPlan': 'Your current plan',
    'screensB.plans.downgradeTo': 'Downgrade to {plan}',
    'screensB.plans.switchTo': 'Switch to {plan}',
    'screensB.plans.billing': 'Billing',
    'screensB.plans.invoices': 'Invoices',
    'screensB.plans.cancelPlan': 'Cancel plan',
    'screensB.plans.neverHead': "What's never behind a plan",
    'screensB.plans.neverBody':
      'Live view, alerts, schedules and local recording all work forever on the free tier. Plans only add cloud history and faster support.',

    /* -------------------------------------------------------------- recent */
    'screensB.recent.h1': 'Recently viewed',
    'screensB.recent.articleFallback': 'Article',
    'screensB.recent.helpFallback': 'Help',
    'screensB.recent.metaLine': '{source} · {time}',
    'screensB.recent.saveForLater': 'Save for later',
    'screensB.recent.saveToWishlist': 'Save to wishlist',
    'screensB.recent.clearHistory': 'Clear history',
    'screensB.recent.removeFromHistory': 'Remove from history',
    'screensB.recent.browseHelp': 'Browse help',
    'screensB.recent.restore': 'Put the demo history back',
    'screensB.recent.note':
      "History is stored on this device only and cleared automatically after 30 days. We don't use it for advertising, and turning off personalised tips in {link} stops it being used for suggestions.",
    'screensB.recent.securityLink': 'Security & privacy',

    /* ------------------------------------------------------------- recycle */
    'screensB.recycle.h1': 'Recycling drop-off',
    'screensB.recycle.lede':
      "Any Hearth device, any age, working or not — free to recycle, and it doesn't have to have come from us. If it still works, check the trade-in value first: you might get credit for it.",
    'screensB.recycle.postcodePost': 'Postcode for the label',
    'screensB.recycle.postcodeDrop':
      'Your postcode, so we can sort the list by distance',
    'screensB.recycle.postcodeCollect': 'Collection postcode',
    'screensB.recycle.submitPost': 'Email me a free label',
    'screensB.recycle.submitDrop': 'Reserve a drop-off',
    'screensB.recycle.submitCollect': 'Book a collection',
    'screensB.recycle.checkTradeIn': 'Check trade-in value instead',
    'screensB.recycle.somethingElse': 'Recycle something else',
    'screensB.recycle.methodLabel': 'How would you like to send it back?',
    'screensB.recycle.itemsLabel': 'What are you recycling?',
    'screensB.recycle.nearest': 'Nearest drop-off points',
    'screensB.recycle.directions': 'Directions',
    'screensB.recycle.allLocations': 'See all locations',
    'screensB.recycle.weTake': 'We take',
    'screensB.recycle.weCantTake': "We can't take",
    'screensB.recycle.warning':
      'Factory reset anything with a camera or microphone before you hand it over. We wipe every device we receive, but resetting first means nothing leaves your house with your data on it.',

    /* --------------------------------------------------------------- refer */
    'screensB.refer.eyebrow': 'REFER A FRIEND',
    'screensB.refer.title': 'Give {amount}, get {amount}.',
    'screensB.refer.lede':
      'Send a friend {amount} off their first Hearth device. When their order ships, we credit your account {amount} — no cap, no expiry.',
    'screensB.refer.earned': '{amount} earned',
    'screensB.refer.progress':
      '{joined} of {goal} friends joined — {left} more and we add a {bonus} bonus on top.',
    'screensB.refer.codeCopied': 'Referral code copied',
    'screensB.refer.linkCopied': 'Invite link copied',
    'screensB.refer.needEmail': "Enter your friend's email",
    'screensB.refer.invitedJustNow': 'Invited just now',
    'screensB.refer.rewardPending': 'Pending',
    'screensB.refer.inviteSent': 'Invite sent to {email}',
    'screensB.refer.copyCode': 'Copy code',
    'screensB.refer.leaderboard': 'Leaderboard',
    'screensB.refer.copyLink': 'Copy link',
    'screensB.refer.yourProgress': 'Your progress',
    'screensB.refer.inviteByEmail': 'Invite by email',
    'screensB.refer.friendEmailAria': "Your friend's email address",
    'screensB.refer.send': 'Send',
    'screensB.refer.inviteNote':
      'We send one email, and one reminder a week later. Nothing else, ever.',
    'screensB.refer.yourReferrals': 'Your referrals',
    'screensB.refer.pillJoined': 'Joined',
    'screensB.refer.pillInvited': 'Invited',
    'screensB.refer.legal':
      "Credit applies to new customers only and lands once their order ships. Referral credit can't be exchanged for cash and doesn't apply to repairs or accessories under {amount}.",

    /* -------------------------------------------------------------- repair */
    'screensB.repair.h1': 'Book a repair',
    'screensB.repair.lede':
      "Repairs under warranty are free, including collection. Out of warranty we'll quote before touching anything.",
    'screensB.repair.whenLine': '{dow} {day}, {slot}',
    'screensB.repair.slotFull': 'That slot is full — try another',
    'screensB.repair.needDevice': 'Pick which device needs repairing',
    'screensB.repair.needIssue': 'Choose what needs looking at',
    'screensB.repair.needSlot': 'Pick a day and a slot',
    'screensB.repair.engineerRole': 'Hardware engineer',
    'screensB.repair.booked': 'Repair booked — {ref}',
    'screensB.repair.doneTitle': "You're booked in",
    'screensB.repair.doneNote':
      'Please have the device accessible and your Wi-Fi password to hand. If you need to move the slot, do it up to 24 hours before at no charge.',
    'screensB.repair.seeAppointments': 'See my appointments',
    'screensB.repair.bookAnother': 'Book another',
    'screensB.repair.whichDevice': 'Which device?',
    'screensB.repair.whatIssue': 'What needs looking at?',
    'screensB.repair.chooseIssue': 'Choose an issue…',
    'screensB.repair.howLabel': 'How should we do it?',
    'screensB.repair.pickDay': 'Pick a day',
    'screensB.repair.pickSlot': 'Pick a slot',
    'screensB.repair.slotTaken': 'Full',
    'screensB.repair.confirm': 'Confirm booking',

    /* ------------------------------------------------------------- returns */
    'screensB.returns.h1': 'Start a return',
    'screensB.returns.lede':
      '30 days from delivery, no questions asked. Refunds land back on your card within five working days of the parcel reaching us.',
    'screensB.returns.stepItems': 'Items',
    'screensB.returns.stepReason': 'Reason',
    'screensB.returns.stepLabel': 'Label',
    'screensB.returns.needItem': 'Pick at least one item to return',
    'screensB.returns.needReason': 'Choose a reason so we can process it',
    'screensB.returns.created': 'Return created',
    'screensB.returns.labelEmailed': 'Label emailed to sam@example.com',
    'screensB.returns.continue': 'Continue',
    'screensB.returns.getLabel': 'Get my label',
    'screensB.returns.emailLabel': 'Email me the label',
    'screensB.returns.whichOrder': 'Which order?',
    'screensB.returns.orderLineDelivered': 'Delivered {placed} · {items} · {total}',
    'screensB.returns.orderLineArriving': 'Arriving {placed} · {items} · {total}',
    'screensB.returns.whatSending': 'What are you sending back?',
    'screensB.returns.whyReturning': 'Why are you returning it?',
    'screensB.returns.chooseReason': 'Choose a reason…',
    'screensB.returns.anythingKnow': 'Anything we should know?',
    'screensB.returns.optional': 'Optional',
    'screensB.returns.notePlaceholder':
      "It helps us fix things — but you don't have to explain.",
    'screensB.returns.howSend': 'How would you like to send it?',
    'screensB.returns.doneTitle': 'Your return is set up',
    'screensB.returns.doneBody': "We've emailed the label to sam@example.com. {detail}",
    'screensB.returns.reference': 'Return reference',
    'screensB.returns.qrHint':
      'Show this code at the drop-off point, or stick the printed label on the parcel.',
    'screensB.returns.whatNext': 'What happens next',
    'screensB.returns.next1':
      'Pack the items with any cables and mounts that came in the box.',
    'screensB.returns.next2':
      "Hand it over within 14 days — after that the label expires and you'll need a new one.",
    'screensB.returns.next3':
      "We refund within five working days of the parcel arriving, and email you when it's done.",
    'screensB.returns.back': 'Back',

    /* --------------------------------------------------------------- saved */
    'screensB.saved.h1': 'Saved articles',
    'screensB.saved.introHas':
      'Kept for later on this account — {articles}. They sync to the Hearth app too.',
    'screensB.saved.introEmpty':
      'Nothing saved yet. Anything you bookmark shows up here and in the app.',
    'screensB.saved.remove': 'Remove',
    'screensB.saved.emptyTitle': 'Nothing saved yet',
    'screensB.saved.emptyBody':
      'Tap "Save for later" on any article and it\'ll wait for you here — handy before you get up a ladder.',
    'screensB.saved.browse': 'Browse articles',
    'screensB.saved.suggested': 'Suggested next',
    'screensB.saved.save': 'Save',

    /* ------------------------------------------------------------ security */
    'screensB.security.h1': 'Security & privacy',
    'screensB.security.lede':
      "Clips are encrypted end to end — we can't watch them, and neither can anyone we work with. Everything below is yours to change or take with you.",
    'screensB.security.password': 'Password',
    'screensB.security.passwordToast': 'Password changes need email confirmation',
    'screensB.security.change': 'Change',
    'screensB.security.recommended': 'Recommended',
    'screensB.security.toggledOn': '{label} on',
    'screensB.security.toggledOff': '{label} off',
    'screensB.security.keepClipsFor': 'Keep clips for',
    'screensB.security.keepClipsNote':
      "Older clips are deleted automatically. Anything you've downloaded stays yours.",
    'screensB.security.whereSignedIn': "Where you're signed in",
    'screensB.security.signOutEverywhere': 'Sign out everywhere else',
    'screensB.security.signedOutEverywhere': 'Signed out everywhere else',
    'screensB.security.thisDevice': 'This device',
    'screensB.security.sessionMeta': '{where} · {when}',
    'screensB.security.signOut': 'Sign out',
    'screensB.security.signedOutOf': 'Signed out of {device}',
    'screensB.security.emptyTitle': 'No other devices signed in',
    'screensB.security.emptyBody':
      'This is the only session on your account. Anything else that signs in will show up here with its location.',
    'screensB.security.takeYourData': 'Take your data',
    'screensB.security.takeYourDataBody':
      'A zip of your account, devices, schedules and clip index — usually ready in about ten minutes.',
    'screensB.security.requestExport': 'Request export',
    'screensB.security.exportToast': "Export requested — we'll email a link",
    'screensB.security.deleteAccount': 'Delete your account',
    'screensB.security.deleteAccountBody':
      'Removes your account, clips and schedules for good after 30 days. Your devices keep working locally.',
    'screensB.security.startDeletion': 'Start deletion',

    /* --------------------------------------------------------------- share */
    'screensB.share.h1': 'Shared clips',
    'screensB.share.lede':
      'Share a clip with neighbours, a group chat, or the police without handing over your account. Every link expires, and you can pull one back at any moment.',
    'screensB.share.shareClip': 'Share a clip',
    'screensB.share.newLink': 'New shared link',
    'screensB.share.whichClip': 'Which clip?',
    'screensB.share.whoCanWatch': 'Who can watch',
    'screensB.share.linkExpires': 'Link expires',
    'screensB.share.createLink': 'Create link',
    'screensB.share.cancel': 'Cancel',
    'screensB.share.linkMeta': '{audience} · {expires}',
    'screensB.share.views': 'views',
    'screensB.share.copyLink': 'Copy link',
    'screensB.share.revoke': 'Revoke',
    'screensB.share.emptyTitle': 'Nothing shared right now',
    'screensB.share.emptyBody':
      "When you share a clip it appears here with its view count, so you always know what's out there — and can pull it back.",
    'screensB.share.note':
      "Shared clips are decrypted in the viewer's browser, never on our servers. Revoking kills the link immediately, though anyone who already downloaded a copy keeps it — the same as any video you send.",

    /* -------------------------------------------------------------- status */
    'screensB.status.h1': 'Service status',
    'screensB.status.lede':
      "Live health of the Hearth app, cloud and website. Your devices keep working locally even when our cloud doesn't.",
    'screensB.status.healthOk': 'Operational',
    'screensB.status.healthDegraded': 'Degraded',
    'screensB.status.healthDown': 'Outage',
    'screensB.status.allOperational': 'All systems operational',
    'screensB.status.someDegraded': '{services} degraded',
    'screensB.status.needEmail': 'Enter an email to subscribe',
    'screensB.status.subscribed': 'Subscribed to status updates',
    'screensB.status.uptimeLine': '{uptime} · 90d',
    'screensB.status.openIncident': 'Open incident',
    'screensB.status.incidentTitle': 'Video clip playback is slow for some homes',
    'screensB.status.resolved': 'Resolved',
    'screensB.status.subscribeTitle': 'Get status updates by email',
    'screensB.status.subscribeNote':
      "One email when something breaks, one when it's fixed.",
    'screensB.status.emailAria': 'Email address for status updates',
    'screensB.status.subscribe': 'Subscribe',
    'screensB.status.pastIncidents': 'Past incidents',
    'screensB.status.historyMeta': '{date} · {duration}',

    /* -------------------------------------------------------------- stores */
    'screensB.stores.h1': 'Find a store',
    'screensB.stores.lede':
      "Hearth's own shops plus stockists who carry the full range. Every location takes returns, and the two flagship stores do walk-in repairs.",
    'screensB.stores.searchLabel': 'Town or postcode',
    'screensB.stores.searchPlaceholder': 'Bristol, or BS1 4TR',
    'screensB.stores.search': 'Search',
    'screensB.stores.nearMe': 'Near me',
    'screensB.stores.shown': '{count} shown',
    'screensB.stores.open': 'Open',
    'screensB.stores.closed': 'Closed',
    'screensB.stores.directions': 'Directions',
    'screensB.stores.bookRepair': 'Book a repair here',
    'screensB.stores.emptyBody':
      'Nothing matched that search. Everything we sell ships free next day, and returns are free from home.',
    'screensB.stores.showEvery': 'Show every location',
    'screensB.stores.findInstaller': 'Find an installer instead',

    /* -------------------------------------------------------------- survey */
    'screensB.survey.eyebrow': '{minutes} MINUTES, {questions} QUESTIONS',
    'screensB.survey.h1': 'How did we do?',
    'screensB.survey.lede':
      'This goes straight to the support team — no marketing list, no follow-up unless you ask for one.',
    'screensB.survey.doneTitle': 'Thank you — genuinely',
    'screensB.survey.scoreOf': '{score}/{max}',
    'screensB.survey.scoreChip': 'score {score}',
    'screensB.survey.backToHelp': 'Back to help center',
    'screensB.survey.fillAgain': 'Fill it in again',
    'screensB.survey.needScore': 'Pick a score from 0 to 10 first',
    'screensB.survey.sent': 'Feedback sent — thank you',
    'screensB.survey.progressLabel': 'Survey progress',
    'screensB.survey.answered': '{answered} of {total} answered',
    'screensB.survey.q1': 'How likely are you to recommend Hearth to a friend?',
    'screensB.survey.q1Note': '0 is never, 10 is already told them.',
    'screensB.survey.npsGroup': 'Recommendation score',
    'screensB.survey.scaleAria': '{row}: {rating}',
    'screensB.survey.q2': 'What would you like us to fix first?',
    'screensB.survey.q2Note': 'Pick as many as you like.',
    'screensB.survey.q3': 'Anything else?',
    'screensB.survey.optional': 'Optional',
    'screensB.survey.q3Placeholder': 'The good, the bad, the pedantic — all of it helps.',
    'screensB.survey.emailOptIn': 'You can email me about this',
    'screensB.survey.send': 'Send feedback',

    /* -------------------------------------------------------------- thread */
    'screensB.thread.allTickets': 'All tickets',
    'screensB.thread.noTicketTitle': 'No ticket open',
    'screensB.thread.noTicketBody':
      'Pick a conversation from your tickets to read it here.',
    'screensB.thread.simulated': 'Replies in this demo are simulated.',
    'screensB.thread.typing': '{name} is typing',
    'screensB.thread.replyPlaceholder': 'Write a reply…',
    'screensB.thread.replyAria': 'Write a reply',
    'screensB.thread.attachTitle': 'Attach a file',
    'screensB.thread.attach': 'Attach',
    'screensB.thread.attachToast': "Attachments aren't available in this demo",
    'screensB.thread.markSolved': 'Mark as solved',
    'screensB.thread.sendReply': 'Send reply',

    /* ---------------------------------------------------------------- tour */
    'screensB.tour.progress': '{n} / {total}',
    'screensB.tour.stepAria': 'Step {n} of {total}: {title}',
    'screensB.tour.skip': 'Skip tour',
    'screensB.tour.back': 'Back',
    'screensB.tour.finish': 'Finish',
    'screensB.tour.next': 'Next',
    'screensB.tour.finished': 'Tour finished — welcome aboard',
    'screensB.tour.skipped': "Tour skipped — it's in the footer if you want it",

    /* --------------------------------------------------------------- trade */
    'screensB.trade.eyebrow': 'FOR INSTALLERS, ELECTRICIANS AND LETTING AGENTS',
    'screensB.trade.h1': 'Open a trade account',
    'screensB.trade.lede':
      "Trade pricing, 30-day terms and a named contact who answers the phone. Approval takes two working days and there's nothing to pay to join.",
    'screensB.trade.doneTitle': 'Application received',
    'screensB.trade.previewPortal': 'Preview the partner portal',
    'screensB.trade.startAnother': 'Start another application',
    'screensB.trade.pickTier': 'Pick a tier',
    'screensB.trade.businessDetails': 'Business details',
    'screensB.trade.tradingName': 'Trading name',
    'screensB.trade.businessType': 'Business type',
    'screensB.trade.chooseOne': 'Choose one…',
    'screensB.trade.companyNumber': 'Company number',
    'screensB.trade.optional': 'Optional',
    'screensB.trade.vatNumber': 'VAT number',
    'screensB.trade.vatHint':
      "Not VAT registered? Leave it blank — we'll set the account up gross.",
    'screensB.trade.whoWeDealWith': "Who we'll deal with",
    'screensB.trade.contactName': 'Contact name',
    'screensB.trade.workEmail': 'Work email',
    'screensB.trade.phone': 'Phone',
    'screensB.trade.installsAMonth': 'Installs a month',
    'screensB.trade.whatDoYouFit': 'What do you fit?',
    'screensB.trade.pickAny': 'Pick any',
    'screensB.trade.anythingElse': 'Anything else we should know?',
    'screensB.trade.notePlaceholder':
      'Accreditations, the areas you cover, or the volume you expect.',
    'screensB.trade.apply': 'Apply for a trade account',
    'screensB.trade.foot':
      "Already approved? The {link} has your job queue, payouts and training. Trade pricing shows automatically once you're signed in.",
    'screensB.trade.footLink': 'partner portal',

    /* ------------------------------------------------------------- tradein */
    'screensB.tradein.h1': "What's your old Hearth worth?",
    'screensB.tradein.lede':
      'Trade any working Hearth device against your next one. We refurbish what we can and recycle the rest — you get store credit either way.',
    'screensB.tradein.baseValue': 'Base value, {product}',
    'screensB.tradein.conditionRow': 'Condition: {condition}',
    'screensB.tradein.ageRow': 'Age: {age}',
    'screensB.tradein.factor': '× {factor}',
    'screensB.tradein.packOrdered': 'Prepaid pack ordered',
    'screensB.tradein.recycleToast': "We'll email you a free recycling label",
    'screensB.tradein.doneTitle': 'Prepaid pack on its way',
    'screensB.tradein.doneBody':
      'It arrives in two to three working days. Post the device back in the same box — postage is covered, and the credit lands within a week of it reaching us.',
    'screensB.tradein.creditChip': '{amount} credit',
    'screensB.tradein.valueAnother': 'Value another device',
    'screensB.tradein.whichDevice': 'Which device are you trading in?',
    'screensB.tradein.whatCondition': 'What condition is it in?',
    'screensB.tradein.howOld': 'How old is it?',
    'screensB.tradein.yourQuote': 'Your quote',
    'screensB.tradein.creditFor': 'store credit for your {product}',
    'screensB.tradein.quoteNote':
      "Quote valid 14 days. We check the device on arrival — if the condition doesn't match we'll re-quote before doing anything, and send it back free if you'd rather not proceed.",
    'screensB.tradein.sendPack': 'Send me a prepaid pack',
    'screensB.tradein.justRecycle': 'Just recycle it',

    /* ------------------------------------------------------------ transfer */
    'screensB.transfer.h1': 'Transfer a warranty',
    'screensB.transfer.lede':
      'Selling a device or leaving it behind when you move? The remaining cover goes with it, at no cost. The new owner just needs to accept by email.',
    'screensB.transfer.doneTitle': 'Transfer started',
    'screensB.transfer.registeredDevices': 'Your registered devices',
    'screensB.transfer.transferAnother': 'Transfer another',
    'screensB.transfer.whichDevice': 'Which device are you handing over?',
    'screensB.transfer.deviceNote': '{serial} · {left}',
    'screensB.transfer.emptyTitle': 'Nothing left to transfer',
    'screensB.transfer.emptyBody':
      'Every device on this account has already been transferred or removed. Register a device first and its cover becomes transferable straight away.',
    'screensB.transfer.registerDevice': 'Register a device',
    'screensB.transfer.newOwnerName': "New owner's name",
    'screensB.transfer.theirEmail': 'Their email',
    'screensB.transfer.whyTransfer': 'Why are you transferring it?',
    'screensB.transfer.chooseReason': 'Choose a reason…',
    'screensB.transfer.warning':
      "Transferring removes the device from your household and wipes its clip history for good. Factory reset it first if you haven't already — we can't recover anything afterwards.",
    'screensB.transfer.start': 'Start transfer',
    'screensB.transfer.howItWorks': 'How it works',
    'screensB.transfer.how1': "We email the new owner a link — it's valid for 14 days.",
    'screensB.transfer.how2':
      'They accept and add the device to their own Hearth account.',
    'screensB.transfer.how3':
      'Remaining cover carries over with the original purchase date. Nothing to pay, and the extra registered year comes too.',

    /* ------------------------------------------------------------ warranty */
    'screensB.warranty.h1': 'Register your warranty',
    'screensB.warranty.lede':
      "Registering takes a minute and adds a third year of cover for free. You'll also get firmware notes for the devices you own, and nothing else.",
    'screensB.warranty.needDevice': "Pick which device you're registering",
    'screensB.warranty.needSerial': 'Enter the full serial number',
    'screensB.warranty.needRetailer': 'Tell us where you bought it',
    'screensB.warranty.purchasedToday': 'Today',
    'screensB.warranty.coverLeft': '3y left',
    'screensB.warranty.registered': 'Warranty registered',
    'screensB.warranty.doneTitle': '{name} registered',
    'screensB.warranty.doneBody':
      "Cover runs to {date}. We've emailed the certificate to sam@example.com — keep it with your receipt.",
    'screensB.warranty.registerAnother': 'Register another device',
    'screensB.warranty.makeClaim': 'Make a claim',
    'screensB.warranty.whichDevice': 'Which device?',
    'screensB.warranty.serialNumber': 'Serial number',
    'screensB.warranty.serialHelp': 'On the back plate, and in the app under About.',
    'screensB.warranty.purchaseDate': 'Date of purchase',
    'screensB.warranty.whereBought': 'Where did you buy it?',
    'screensB.warranty.selectRetailer': 'Select a retailer…',
    'screensB.warranty.callout':
      'Bought it from us? Your order is already covered — registering just adds the extra year and the receipt to your account.',
    'screensB.warranty.submit': 'Register warranty',
    'screensB.warranty.listTitle': 'Your registered devices',
    'screensB.warranty.coverTo': 'Cover to {date}',
    'screensB.warranty.claim': 'Claim',
    'screensB.warranty.transferLabel': 'Transfer this warranty',
    'screensB.warranty.remainingAria': 'Warranty remaining for {model}',
    'screensB.warranty.emptyTitle': 'No registered devices',
    'screensB.warranty.emptyBody':
      'Nothing is registered to this account yet. Registering adds a free third year of cover and takes about a minute.',
    'screensB.warranty.registerDevice': 'Register a device',

    /* ---------------------------------------------------------------- wish */
    'screensB.wish.h1': 'Wishlist',
    'screensB.wish.shareList': 'Share list',
    'screensB.wish.addAllInStock': 'Add all in stock',
    'screensB.wish.priceDrop': 'Price drop',
    'screensB.wish.notifyMe': 'Notify me',
    'screensB.wish.addToBasket': 'Add to basket',
    'screensB.wish.remove': 'Remove',
    'screensB.wish.emptyTitle': 'Your wishlist is empty',
    'screensB.wish.emptyBody':
      "Save anything you're weighing up — we'll tell you if the price drops or it comes back in stock, and nothing expires.",
    'screensB.wish.browseBundles': 'Browse bundles',
    'screensB.wish.restore': 'Put the demo items back',
    'screensB.wish.othersSaved': 'Others also saved',
    'screensB.wish.saveIt': 'Save it',
  },

  'de-DE': {
    /* ---------------------------------------------------------------- live */
    'screensB.live.h1': 'Live-Ansicht & Clips',
    'screensB.live.clipHistory': 'Clip-Verlauf',
    'screensB.live.note':
      'Clips sind Ende-zu-Ende verschlüsselt. Beim Teilen entsteht ein Link, der nach 7 Tagen abläuft — und wir sehen nicht, was dahintersteckt.',

    /* ------------------------------------------------------------- members */
    'screensB.members.h1': 'Mitglieder im Haushalt',
    'screensB.members.lede':
      'Teilen Sie das Zuhause, ohne Ihr Passwort zu teilen. Gäste sehen nie den Clip-Verlauf, und Sie können jede Person sofort entfernen.',
    'screensB.members.roleOwner': 'Inhaber',
    'screensB.members.roleAdult': 'Erwachsen',
    'screensB.members.roleGuest': 'Gast',
    'screensB.members.roleLabel': 'Rolle',
    'screensB.members.needEmail': 'Bitte eine E-Mail-Adresse eingeben',
    'screensB.members.pendingMeta': '{email} · Einladung offen',
    'screensB.members.permFrontDoor': 'Nur Haustür',
    'screensB.members.permAllDevices': 'Alle Geräte',
    'screensB.members.inviteByEmail': 'Per E-Mail einladen',
    'screensB.members.sendInvite': 'Einladung senden',
    'screensB.members.inviteSent': 'Einladung gesendet',
    'screensB.members.inviteSentTo': 'Einladung an {email} gesendet',
    'screensB.members.inviteSentBody':
      'Sie läuft in 14 Tagen ab. Bis zur Annahme erscheint die Person unten als ausstehend.',
    'screensB.members.nowAdult': '{name} ist jetzt erwachsen',
    'screensB.members.nowGuest': '{name} ist jetzt Gast',
    'screensB.members.removed': '{name} entfernt',
    'screensB.members.thatsYou': 'Das sind Sie',
    'screensB.members.roleFor': 'Rolle für {name}',
    'screensB.members.remove': 'Entfernen',
    'screensB.members.emptyTitle': 'Nur Sie in diesem Haushalt',
    'screensB.members.emptyBody':
      'Sonst hat niemand Zugriff. Laden Sie oben jemanden ein, dann kann diese Person Live-Ansicht und Entsperren nutzen, ohne je Ihr Passwort zu sehen.',
    'screensB.members.note':
      'Nur der Inhaber kann Geräte hinzufügen oder entfernen, die Abrechnung sehen oder das Konto schließen. Erwachsene dürfen alles andere; Gäste erhalten Live-Ansicht und Entsperren in den Zeiten, die Sie festlegen.',

    /* ----------------------------------------------------------- myTickets */
    'screensB.myTickets.title': 'Meine Tickets',
    'screensB.myTickets.lede':
      'Sehen Sie Ihre offenen und früheren Unterhaltungen mit uns nach.',
    'screensB.myTickets.emailLabel': 'E-Mail-Adresse',
    'screensB.myTickets.show': 'Meine Tickets anzeigen',
    'screensB.myTickets.showingFor': 'Tickets für {email}',
    'screensB.myTickets.help':
      'Wir zeigen Tickets zu dieser Adresse — Demodaten.',

    /* ----------------------------------------------------------- newTicket */
    'screensB.newTicket.title': 'Ticket eröffnen',
    'screensB.newTicket.lede':
      'Sagen Sie uns, was los ist, und wir melden uns. Je mehr Details, desto schneller können wir helfen.',
    'screensB.newTicket.product': 'Welches Produkt?',
    'screensB.newTicket.topic': 'Thema',
    'screensB.newTicket.topicPlaceholder': 'Thema wählen…',
    'screensB.newTicket.subject': 'Betreff',
    'screensB.newTicket.subjectPlaceholder':
      'Kurze Zusammenfassung, z. B. "Türklingel jede Nacht offline"',
    'screensB.newTicket.description': 'Beschreibung',
    'screensB.newTicket.counter': '{used}/{max}',
    'screensB.newTicket.descPlaceholder':
      'Was passiert? Nennen Sie, was Sie schon versucht haben, alle Fehlermeldungen und seit wann es auftritt.',
    'screensB.newTicket.attachments': 'Anhänge',
    'screensB.newTicket.addFile': 'Datei hinzufügen',
    'screensB.newTicket.simulated': 'Antworten in dieser Demo sind simuliert.',
    'screensB.newTicket.submit': 'Ticket absenden',

    /* ------------------------------------------------------------ notFound */
    'screensB.notFound.code': 'FEHLER 404',
    'screensB.notFound.title': 'Diese Seite hat falsch abgebogen.',
    'screensB.notFound.body':
      'Die gesuchte Seite ist nicht hier — vielleicht ist sie umgezogen, oder sie wurde für diese Demo noch nicht gebaut.',
    'screensB.notFound.home': 'Zurück zum Hilfecenter',
    'screensB.notFound.ticket': 'Ticket eröffnen',

    /* -------------------------------------------------------------- notifs */
    'screensB.notifs.h1': 'Benachrichtigungen',
    'screensB.notifs.introUnread':
      '{count} ungelesen · wir bewahren 90 Tage Verlauf auf, und Sie bestimmen, was ankommt.',
    'screensB.notifs.introClear':
      'Alles erledigt — wir bewahren 90 Tage Verlauf auf.',
    'screensB.notifs.markAllRead': 'Alle als gelesen',
    'screensB.notifs.settingsLabel': 'Benachrichtigungseinstellungen',
    'screensB.notifs.settingsLive':
      'Die Alarmeinstellungen liegen hier bei der Barrierefreiheit',
    'screensB.notifs.allMarkedRead': 'Alle als gelesen markiert',
    'screensB.notifs.inboxCleared': 'Posteingang geleert',
    'screensB.notifs.inboxClearedBody':
      'Nichts Ungelesenes mehr. Neue Meldungen erscheinen oben, sobald sie eintreffen.',
    'screensB.notifs.alertSettings': 'Alarmeinstellungen',
    'screensB.notifs.unread': 'Ungelesen',
    'screensB.notifs.emptyTitle': 'Nichts in diesem Filter',
    'screensB.notifs.emptyBody':
      'Probieren Sie eine andere Kategorie — wir bewahren 90 Tage Verlauf auf.',

    /* -------------------------------------------------------------- orders */
    'screensB.orders.h1': 'Bestellstatus',
    'screensB.orders.lede':
      'Geben Sie Bestellnummer und die E-Mail-Adresse der Bestellung ein. Sendungsupdates erscheinen hier innerhalb einer Stunde nach dem Scan.',
    'screensB.orders.statusTransit': 'Unterwegs',
    'screensB.orders.statusDelivered': 'Zugestellt',
    'screensB.orders.statusPacking': 'In Vorbereitung',
    'screensB.orders.headlineDelivered': 'Zugestellt am {day}',
    'screensB.orders.headlinePacking': 'Wird gepackt, Versand morgen',
    'screensB.orders.headlineTransit': 'Ankunft Di., 28. Juli',
    'screensB.orders.errNoNumber':
      'Geben Sie die Bestellnummer aus Ihrer Bestätigungsmail ein.',
    'screensB.orders.errNotFound':
      'Wir haben keine Bestellung zu {id} gefunden. Prüfen Sie die Nummer in Ihrer Bestätigungsmail — sie beginnt mit {prefix}.',
    'screensB.orders.errNoEmail':
      'Geben Sie die bei der Bestellung genutzte E-Mail-Adresse ein, damit wir sie zuordnen können.',
    'screensB.orders.errEmailMismatch':
      'Diese Bestellung gibt es, aber die E-Mail-Adresse passt nicht zu unseren Daten. Versuchen Sie die Adresse aus Ihrer Bestätigungsmail.',
    'screensB.orders.found': 'Bestellung {id} gefunden',
    'screensB.orders.trackingCopied': 'Sendungsnummer kopiert',
    'screensB.orders.numberLabel': 'Bestellnummer',
    'screensB.orders.emailLabel': 'E-Mail der Bestellung',
    'screensB.orders.find': 'Bestellung finden',
    'screensB.orders.demoOrders': 'Demo-Bestellungen:',
    'screensB.orders.placedLine': 'Bestellt {placed} · {items}',
    'screensB.orders.carrier': 'Versanddienst',
    'screensB.orders.copyTracking': 'Sendungsnummer kopieren',
    'screensB.orders.deliveringTo': 'Lieferung an',
    'screensB.orders.inThisOrder': 'In dieser Bestellung',
    'screensB.orders.qty': 'Menge {n}',
    'screensB.orders.total': 'Gesamt',
    'screensB.orders.somethingWrong': 'Mit dieser Bestellung stimmt etwas nicht',
    'screensB.orders.askDelivery': 'Frage zur Lieferung',

    /* ------------------------------------------------------------ overview */
    'screensB.overview.eyebrow': 'ÜBERBLICK',
    'screensB.overview.h1': 'Jede Ansicht im Portal',
    'screensB.overview.lede':
      '{count} Ansichten, alle interaktiv. Springen Sie direkt zu jeder — die Abläufe verlinken einander genau wie im Produktivbetrieb.',
    'screensB.overview.lightTheme': 'Helles Design',
    'screensB.overview.darkTheme': 'Dunkles Design',
    'screensB.overview.openPortal': 'Portal öffnen',

    /* ------------------------------------------------------------- partner */
    'screensB.partner.approved': 'Zugelassener Partner',
    'screensB.partner.tradeAccount': 'Gewerbekonto',
    'screensB.partner.supportLine': 'Partner-Hotline',
    'screensB.partner.kpiJobs': 'Aufträge diesen Monat',
    'screensB.partner.kpiRating': 'Bewertung',
    'screensB.partner.kpiPayout': 'Nächste Auszahlung',
    'screensB.partner.kpiResponse': 'Reaktionszeit',
    'screensB.partner.jobRequests': 'Auftragsanfragen',
    'screensB.partner.queueLine': '{waiting} offen · passend zu Ihren Fähigkeiten',
    'screensB.partner.queueClear': 'Warteschlange leer',
    'screensB.partner.queueClearBody':
      'Neue Anfragen aus Ihrer Region landen hier. Wir gleichen nach Entfernung, Stufe und den Fähigkeiten in Ihrem Profil ab.',
    'screensB.partner.payWarranty': 'Bezahlt von Hearth',
    'screensB.partner.payCustomer': 'Zahlt die Kundschaft',
    'screensB.partner.acceptJob': 'Auftrag annehmen',
    'screensB.partner.pass': 'Ablehnen',
    'screensB.partner.messageCustomer': 'Kundschaft anschreiben',
    'screensB.partner.messagingToast':
      'Partnernachrichten gibt es in dieser Demo nicht',
    'screensB.partner.accepted': 'Auftrag angenommen — Kundschaft benachrichtigt',
    'screensB.partner.passed': 'Abgelehnt — zurück in den Pool',
    'screensB.partner.certification': 'Zertifizierung',
    'screensB.partner.certBody':
      'Noch zwei Module bis Ihre Gold-Stufe im Oktober verlängert wird.',
    'screensB.partner.continueTraining': 'Schulung fortsetzen',
    'screensB.partner.trainingToast': 'Schulungsmodule liegen in der Partner-App',
    'screensB.partner.resources': 'Partner-Material',
    'screensB.partner.resourcesToast': 'Partner-Material gibt es in dieser Demo nicht',
    'screensB.partner.nextPayout': 'Nächste Auszahlung',

    /* --------------------------------------------------------------- parts */
    'screensB.parts.h1': 'Ersatzteile',
    'screensB.parts.lede':
      'Jedes je ausgelieferte Teil, mindestens sieben Jahre ab Markteinführung erhältlich. Noch Garantie? Kaufen Sie nichts — stellen Sie einen Antrag, wir schicken es kostenlos.',
    'screensB.parts.stockIn': 'Auf Lager',
    'screensB.parts.stockLow': 'Wenig Bestand',
    'screensB.parts.stockOut': 'In 2 Wochen wieder da',
    'screensB.parts.emptyTitle': 'Keine Teile für dieses Gerät',
    'screensB.parts.emptyBody':
      'Wir halten Teile mindestens sieben Jahre nach Marktstart vor — fehlt hier etwas, fragen Sie uns ruhig direkt.',
    'screensB.parts.openTicket': 'Ticket eröffnen',
    'screensB.parts.fitsLine': '{sku} · passt zu {fits}',
    'screensB.parts.removeOne': 'Ein Stück {name} entfernen',
    'screensB.parts.addAnother': 'Noch ein Stück {name} hinzufügen',
    'screensB.parts.notifyToast': 'Wir mailen Ihnen, sobald es wieder da ist',
    'screensB.parts.notify': 'Benachrichtigen',
    'screensB.parts.add': 'Hinzufügen',
    'screensB.parts.basketEmptied': 'Warenkorb geleert',
    'screensB.parts.checkoutToast': 'Kasse gibt es in dieser Demo nicht',
    'screensB.parts.freeDelivery': 'Versand kostenlos',
    'screensB.parts.moreForFree': 'Noch {amount} bis zum Gratisversand',
    'screensB.parts.inYourBasket': '{parts} im Warenkorb',
    'screensB.parts.empty': 'Leeren',
    'screensB.parts.checkout': 'Zur Kasse',
    'screensB.parts.callout':
      'Die meisten Teile passen mit einem Schraubendreher und zehn Minuten. Jede Teileseite in der App verlinkt eine Schritt-für-Schritt-Anleitung — niemals löten.',

    /* --------------------------------------------------------------- plans */
    'screensB.plans.title': 'Hearth Care Tarife',
    'screensB.plans.lede':
      'Clip-Verlauf, bevorzugter Support und kostenlose Reparaturen außerhalb der Garantie. Jeder Tarif gilt für beliebig viele Geräte — jederzeit kündbar, heruntergeladene Aufnahmen bleiben Ihnen.',
    'screensB.plans.cycleLabel': 'Abrechnungszeitraum',
    'screensB.plans.cycleMonthly': 'Monatlich',
    'screensB.plans.free': 'Kostenlos',
    'screensB.plans.perAlways': 'immer',
    'screensB.plans.perYear': 'pro Jahr',
    'screensB.plans.perMonth': 'pro Monat',
    'screensB.plans.noCard': 'Keine Karte nötig',
    'screensB.plans.worksOut': 'entspricht {amount} im Monat',
    'screensB.plans.billedMonthly': 'monatlich abgerechnet, jederzeit kündbar',
    'screensB.plans.freeTierBilling':
      'Sie nutzen den kostenlosen Tarif — nichts abzurechnen.',
    'screensB.plans.pricePerYear': '{amount} im Jahr',
    'screensB.plans.pricePerMonth': '{amount} im Monat',
    'screensB.plans.billingLine':
      '{plan}, {price} {suffix} · nächste Abbuchung {date}',
    'screensB.plans.switched': 'Gewechselt zu {plan}',
    'screensB.plans.alreadyFree': 'Sie nutzen bereits den kostenlosen Tarif',
    'screensB.plans.cancelled': 'Tarif gekündigt — Sie sind bei Hearth Free',
    'screensB.plans.currentPlan': 'Aktueller Tarif',
    'screensB.plans.mostChosen': 'Am häufigsten gewählt',
    'screensB.plans.yourCurrentPlan': 'Ihr aktueller Tarif',
    'screensB.plans.downgradeTo': 'Wechsel zu {plan}',
    'screensB.plans.switchTo': 'Zu {plan} wechseln',
    'screensB.plans.billing': 'Abrechnung',
    'screensB.plans.invoices': 'Rechnungen',
    'screensB.plans.cancelPlan': 'Tarif kündigen',
    'screensB.plans.neverHead': 'Was nie hinter einem Tarif steckt',
    'screensB.plans.neverBody':
      'Live-Ansicht, Meldungen, Zeitpläne und lokale Aufnahme laufen im kostenlosen Tarif für immer. Tarife bringen nur Cloud-Verlauf und schnelleren Support.',

    /* -------------------------------------------------------------- recent */
    'screensB.recent.h1': 'Zuletzt angesehen',
    'screensB.recent.articleFallback': 'Beitrag',
    'screensB.recent.helpFallback': 'Hilfe',
    'screensB.recent.metaLine': '{source} · {time}',
    'screensB.recent.saveForLater': 'Für später speichern',
    'screensB.recent.saveToWishlist': 'Auf die Wunschliste',
    'screensB.recent.clearHistory': 'Verlauf löschen',
    'screensB.recent.removeFromHistory': 'Aus dem Verlauf entfernen',
    'screensB.recent.browseHelp': 'Hilfe durchsuchen',
    'screensB.recent.restore': 'Demo-Verlauf zurückholen',
    'screensB.recent.note':
      'Der Verlauf liegt nur auf diesem Gerät und wird nach 30 Tagen automatisch gelöscht. Wir nutzen ihn nicht für Werbung, und wer personalisierte Tipps unter {link} abschaltet, verhindert die Nutzung für Vorschläge.',
    'screensB.recent.securityLink': 'Sicherheit & Datenschutz',

    /* ------------------------------------------------------------- recycle */
    'screensB.recycle.h1': 'Recycling-Rückgabe',
    'screensB.recycle.lede':
      'Jedes Hearth-Gerät, egal wie alt, funktionierend oder nicht — Recycling ist kostenlos, und es muss nicht von uns stammen. Läuft es noch, prüfen Sie zuerst den Inzahlungnahmewert: vielleicht gibt es Guthaben dafür.',
    'screensB.recycle.postcodePost': 'Postleitzahl für das Etikett',
    'screensB.recycle.postcodeDrop':
      'Ihre Postleitzahl, damit wir die Liste nach Entfernung sortieren',
    'screensB.recycle.postcodeCollect': 'Postleitzahl für die Abholung',
    'screensB.recycle.submitPost': 'Gratis-Etikett mailen',
    'screensB.recycle.submitDrop': 'Rückgabe reservieren',
    'screensB.recycle.submitCollect': 'Abholung buchen',
    'screensB.recycle.checkTradeIn': 'Lieber Inzahlungnahme prüfen',
    'screensB.recycle.somethingElse': 'Etwas anderes recyceln',
    'screensB.recycle.methodLabel': 'Wie möchten Sie es zurückschicken?',
    'screensB.recycle.itemsLabel': 'Was recyceln Sie?',
    'screensB.recycle.nearest': 'Nächste Rückgabestellen',
    'screensB.recycle.directions': 'Route',
    'screensB.recycle.allLocations': 'Alle Standorte ansehen',
    'screensB.recycle.weTake': 'Wir nehmen',
    'screensB.recycle.weCantTake': 'Wir nehmen nicht',
    'screensB.recycle.warning':
      'Setzen Sie alles mit Kamera oder Mikrofon vor der Abgabe auf Werkseinstellungen zurück. Wir löschen jedes eingehende Gerät, aber wer vorher zurücksetzt, gibt gar nichts erst aus dem Haus.',

    /* --------------------------------------------------------------- refer */
    'screensB.refer.eyebrow': 'FREUNDE WERBEN',
    'screensB.refer.title': '{amount} schenken, {amount} bekommen.',
    'screensB.refer.lede':
      'Schenken Sie einem Freund {amount} auf sein erstes Hearth-Gerät. Sobald seine Bestellung verschickt ist, schreiben wir Ihrem Konto {amount} gut — ohne Obergrenze, ohne Ablauf.',
    'screensB.refer.earned': '{amount} verdient',
    'screensB.refer.progress':
      '{joined} von {goal} Freunden dabei — noch {left}, und wir legen {bonus} Bonus obendrauf.',
    'screensB.refer.codeCopied': 'Empfehlungscode kopiert',
    'screensB.refer.linkCopied': 'Einladungslink kopiert',
    'screensB.refer.needEmail': 'E-Mail-Adresse Ihres Freundes eingeben',
    'screensB.refer.invitedJustNow': 'Gerade eingeladen',
    'screensB.refer.rewardPending': 'Ausstehend',
    'screensB.refer.inviteSent': 'Einladung an {email} gesendet',
    'screensB.refer.copyCode': 'Code kopieren',
    'screensB.refer.leaderboard': 'Rangliste',
    'screensB.refer.copyLink': 'Link kopieren',
    'screensB.refer.yourProgress': 'Ihr Fortschritt',
    'screensB.refer.inviteByEmail': 'Per E-Mail einladen',
    'screensB.refer.friendEmailAria': 'E-Mail-Adresse Ihres Freundes',
    'screensB.refer.send': 'Senden',
    'screensB.refer.inviteNote':
      'Wir senden eine E-Mail und eine Woche später eine Erinnerung. Sonst nie etwas.',
    'screensB.refer.yourReferrals': 'Ihre Empfehlungen',
    'screensB.refer.pillJoined': 'Dabei',
    'screensB.refer.pillInvited': 'Eingeladen',
    'screensB.refer.legal':
      'Das Guthaben gilt nur für Neukunden und wird gutgeschrieben, sobald deren Bestellung verschickt ist. Empfehlungsguthaben ist nicht auszahlbar und gilt nicht für Reparaturen oder Zubehör unter {amount}.',

    /* -------------------------------------------------------------- repair */
    'screensB.repair.h1': 'Reparatur buchen',
    'screensB.repair.lede':
      'Reparaturen in der Garantie sind kostenlos, Abholung inklusive. Außerhalb der Garantie nennen wir einen Preis, bevor wir irgendetwas anfassen.',
    'screensB.repair.whenLine': '{dow} {day}, {slot}',
    'screensB.repair.slotFull': 'Dieser Termin ist voll — bitte einen anderen',
    'screensB.repair.needDevice': 'Wählen Sie das zu reparierende Gerät',
    'screensB.repair.needIssue': 'Wählen Sie, was angesehen werden soll',
    'screensB.repair.needSlot': 'Wählen Sie Tag und Uhrzeit',
    'screensB.repair.engineerRole': 'Hardwaretechniker',
    'screensB.repair.booked': 'Reparatur gebucht — {ref}',
    'screensB.repair.doneTitle': 'Ihr Termin steht',
    'screensB.repair.doneNote':
      'Halten Sie das Gerät zugänglich und Ihr WLAN-Passwort bereit. Bis 24 Stunden vorher können Sie den Termin kostenlos verschieben.',
    'screensB.repair.seeAppointments': 'Meine Termine ansehen',
    'screensB.repair.bookAnother': 'Weiteren buchen',
    'screensB.repair.whichDevice': 'Welches Gerät?',
    'screensB.repair.whatIssue': 'Was sollen wir ansehen?',
    'screensB.repair.chooseIssue': 'Problem wählen…',
    'screensB.repair.howLabel': 'Wie sollen wir vorgehen?',
    'screensB.repair.pickDay': 'Tag wählen',
    'screensB.repair.pickSlot': 'Uhrzeit wählen',
    'screensB.repair.slotTaken': 'Voll',
    'screensB.repair.confirm': 'Buchung bestätigen',

    /* ------------------------------------------------------------- returns */
    'screensB.returns.h1': 'Rücksendung starten',
    'screensB.returns.lede':
      '30 Tage ab Lieferung, ohne Nachfragen. Erstattungen gehen innerhalb von fünf Werktagen nach Eingang des Pakets zurück auf Ihre Karte.',
    'screensB.returns.stepItems': 'Artikel',
    'screensB.returns.stepReason': 'Grund',
    'screensB.returns.stepLabel': 'Etikett',
    'screensB.returns.needItem': 'Wählen Sie mindestens einen Artikel',
    'screensB.returns.needReason': 'Wählen Sie einen Grund, damit wir sie bearbeiten',
    'screensB.returns.created': 'Rücksendung angelegt',
    'screensB.returns.labelEmailed': 'Etikett an sam@example.com gemailt',
    'screensB.returns.continue': 'Weiter',
    'screensB.returns.getLabel': 'Etikett holen',
    'screensB.returns.emailLabel': 'Etikett mailen',
    'screensB.returns.whichOrder': 'Welche Bestellung?',
    'screensB.returns.orderLineDelivered': 'Zugestellt {placed} · {items} · {total}',
    'screensB.returns.orderLineArriving': 'Ankunft {placed} · {items} · {total}',
    'screensB.returns.whatSending': 'Was schicken Sie zurück?',
    'screensB.returns.whyReturning': 'Warum senden Sie es zurück?',
    'screensB.returns.chooseReason': 'Grund wählen…',
    'screensB.returns.anythingKnow': 'Sollen wir sonst etwas wissen?',
    'screensB.returns.optional': 'Optional',
    'screensB.returns.notePlaceholder':
      'Das hilft uns beim Nachbessern — erklären müssen Sie aber nichts.',
    'screensB.returns.howSend': 'Wie möchten Sie es schicken?',
    'screensB.returns.doneTitle': 'Ihre Rücksendung ist eingerichtet',
    'screensB.returns.doneBody':
      'Wir haben das Etikett an sam@example.com gemailt. {detail}',
    'screensB.returns.reference': 'Referenz der Rücksendung',
    'screensB.returns.qrHint':
      'Zeigen Sie diesen Code an der Abgabestelle oder kleben Sie das gedruckte Etikett aufs Paket.',
    'screensB.returns.whatNext': 'Wie es weitergeht',
    'screensB.returns.next1':
      'Packen Sie die Artikel mit allen Kabeln und Halterungen aus dem Karton ein.',
    'screensB.returns.next2':
      'Geben Sie es binnen 14 Tagen ab — danach verfällt das Etikett und Sie brauchen ein neues.',
    'screensB.returns.next3':
      'Wir erstatten innerhalb von fünf Werktagen nach Eingang des Pakets und mailen Ihnen, sobald es erledigt ist.',
    'screensB.returns.back': 'Zurück',

    /* --------------------------------------------------------------- saved */
    'screensB.saved.h1': 'Gespeicherte Beiträge',
    'screensB.saved.introHas':
      'Für später in diesem Konto abgelegt — {articles}. Sie sind auch in der Hearth-App.',
    'screensB.saved.introEmpty':
      'Noch nichts gespeichert. Alles, was Sie mit einem Lesezeichen versehen, erscheint hier und in der App.',
    'screensB.saved.remove': 'Entfernen',
    'screensB.saved.emptyTitle': 'Noch nichts gespeichert',
    'screensB.saved.emptyBody':
      'Tippen Sie in einem Beitrag auf "Für später speichern" — er wartet dann hier, praktisch bevor Sie auf die Leiter steigen.',
    'screensB.saved.browse': 'Beiträge durchsuchen',
    'screensB.saved.suggested': 'Passend dazu',
    'screensB.saved.save': 'Speichern',

    /* ------------------------------------------------------------ security */
    'screensB.security.h1': 'Sicherheit & Datenschutz',
    'screensB.security.lede':
      'Clips sind Ende-zu-Ende verschlüsselt — weder wir noch unsere Partner können sie ansehen. Alles Folgende können Sie ändern oder mitnehmen.',
    'screensB.security.password': 'Passwort',
    'screensB.security.passwordToast':
      'Passwortänderungen müssen per E-Mail bestätigt werden',
    'screensB.security.change': 'Ändern',
    'screensB.security.recommended': 'Empfohlen',
    'screensB.security.toggledOn': '{label} an',
    'screensB.security.toggledOff': '{label} aus',
    'screensB.security.keepClipsFor': 'Clips aufbewahren',
    'screensB.security.keepClipsNote':
      'Ältere Clips werden automatisch gelöscht. Was Sie heruntergeladen haben, bleibt Ihnen.',
    'screensB.security.whereSignedIn': 'Wo Sie angemeldet sind',
    'screensB.security.signOutEverywhere': 'Überall sonst abmelden',
    'screensB.security.signedOutEverywhere': 'Überall sonst abgemeldet',
    'screensB.security.thisDevice': 'Dieses Gerät',
    'screensB.security.sessionMeta': '{where} · {when}',
    'screensB.security.signOut': 'Abmelden',
    'screensB.security.signedOutOf': 'Von {device} abgemeldet',
    'screensB.security.emptyTitle': 'Keine anderen Geräte angemeldet',
    'screensB.security.emptyBody':
      'Das ist die einzige Sitzung in Ihrem Konto. Alles Weitere, das sich anmeldet, erscheint hier mit Standort.',
    'screensB.security.takeYourData': 'Ihre Daten mitnehmen',
    'screensB.security.takeYourDataBody':
      'Ein Zip mit Konto, Geräten, Zeitplänen und Clip-Index — meist in etwa zehn Minuten fertig.',
    'screensB.security.requestExport': 'Export anfordern',
    'screensB.security.exportToast': 'Export angefordert — wir mailen einen Link',
    'screensB.security.deleteAccount': 'Konto löschen',
    'screensB.security.deleteAccountBody':
      'Entfernt Konto, Clips und Zeitpläne nach 30 Tagen endgültig. Ihre Geräte laufen lokal weiter.',
    'screensB.security.startDeletion': 'Löschung starten',

    /* --------------------------------------------------------------- share */
    'screensB.share.h1': 'Geteilte Clips',
    'screensB.share.lede':
      'Teilen Sie einen Clip mit Nachbarn, einer Gruppe oder der Polizei, ohne Ihr Konto herzugeben. Jeder Link läuft ab, und Sie können ihn jederzeit zurückziehen.',
    'screensB.share.shareClip': 'Clip teilen',
    'screensB.share.newLink': 'Neuer geteilter Link',
    'screensB.share.whichClip': 'Welcher Clip?',
    'screensB.share.whoCanWatch': 'Wer zusehen darf',
    'screensB.share.linkExpires': 'Link läuft ab',
    'screensB.share.createLink': 'Link erstellen',
    'screensB.share.cancel': 'Abbrechen',
    'screensB.share.linkMeta': '{audience} · {expires}',
    'screensB.share.views': 'Aufrufe',
    'screensB.share.copyLink': 'Link kopieren',
    'screensB.share.revoke': 'Zurückziehen',
    'screensB.share.emptyTitle': 'Gerade nichts geteilt',
    'screensB.share.emptyBody':
      'Sobald Sie einen Clip teilen, erscheint er hier mit seiner Aufrufzahl — Sie wissen also immer, was draußen ist, und können ihn zurückziehen.',
    'screensB.share.note':
      'Geteilte Clips werden im Browser der Zusehenden entschlüsselt, nie auf unseren Servern. Zurückziehen killt den Link sofort; wer schon eine Kopie geladen hat, behält sie — wie bei jedem Video, das Sie verschicken.',

    /* -------------------------------------------------------------- status */
    'screensB.status.h1': 'Dienststatus',
    'screensB.status.lede':
      'Aktueller Zustand von Hearth-App, Cloud und Website. Ihre Geräte laufen lokal weiter, auch wenn unsere Cloud es nicht tut.',
    'screensB.status.healthOk': 'Betriebsbereit',
    'screensB.status.healthDegraded': 'Beeinträchtigt',
    'screensB.status.healthDown': 'Ausfall',
    'screensB.status.allOperational': 'Alle Systeme betriebsbereit',
    'screensB.status.someDegraded': '{services} beeinträchtigt',
    'screensB.status.needEmail': 'E-Mail-Adresse zum Abonnieren eingeben',
    'screensB.status.subscribed': 'Statusmeldungen abonniert',
    'screensB.status.uptimeLine': '{uptime} · 90 T',
    'screensB.status.openIncident': 'Offene Störung',
    'screensB.status.incidentTitle':
      'Die Clip-Wiedergabe ist in manchen Haushalten langsam',
    'screensB.status.resolved': 'Behoben',
    'screensB.status.subscribeTitle': 'Statusmeldungen per E-Mail',
    'screensB.status.subscribeNote':
      'Eine E-Mail, wenn etwas ausfällt, eine, wenn es behoben ist.',
    'screensB.status.emailAria': 'E-Mail-Adresse für Statusmeldungen',
    'screensB.status.subscribe': 'Abonnieren',
    'screensB.status.pastIncidents': 'Frühere Störungen',
    'screensB.status.historyMeta': '{date} · {duration}',

    /* -------------------------------------------------------------- stores */
    'screensB.stores.h1': 'Filiale finden',
    'screensB.stores.lede':
      'Eigene Läden von Hearth plus Händler mit dem vollen Sortiment. Jeder Standort nimmt Rücksendungen an, und die beiden Flagship-Stores reparieren vor Ort.',
    'screensB.stores.searchLabel': 'Ort oder Postleitzahl',
    'screensB.stores.searchPlaceholder': 'Bristol oder BS1 4TR',
    'screensB.stores.search': 'Suchen',
    'screensB.stores.nearMe': 'In der Nähe',
    'screensB.stores.shown': '{count} angezeigt',
    'screensB.stores.open': 'Geöffnet',
    'screensB.stores.closed': 'Geschlossen',
    'screensB.stores.directions': 'Route',
    'screensB.stores.bookRepair': 'Reparatur hier buchen',
    'screensB.stores.emptyBody':
      'Zu dieser Suche passte nichts. Alles, was wir verkaufen, kommt kostenlos am nächsten Tag, und Rücksendungen von zu Hause sind gratis.',
    'screensB.stores.showEvery': 'Alle Standorte zeigen',
    'screensB.stores.findInstaller': 'Lieber einen Installateur finden',

    /* -------------------------------------------------------------- survey */
    'screensB.survey.eyebrow': '{minutes} MINUTEN, {questions} FRAGEN',
    'screensB.survey.h1': 'Wie waren wir?',
    'screensB.survey.lede':
      'Das geht direkt an das Supportteam — kein Verteiler, keine Nachfassaktion, außer Sie bitten darum.',
    'screensB.survey.doneTitle': 'Danke — wirklich',
    'screensB.survey.scoreOf': '{score}/{max}',
    'screensB.survey.scoreChip': 'Wert {score}',
    'screensB.survey.backToHelp': 'Zurück zum Hilfecenter',
    'screensB.survey.fillAgain': 'Noch einmal ausfüllen',
    'screensB.survey.needScore': 'Wählen Sie zuerst einen Wert von 0 bis 10',
    'screensB.survey.sent': 'Feedback gesendet — danke',
    'screensB.survey.progressLabel': 'Fortschritt der Umfrage',
    'screensB.survey.answered': '{answered} von {total} beantwortet',
    'screensB.survey.q1': 'Wie wahrscheinlich empfehlen Sie Hearth weiter?',
    'screensB.survey.q1Note': '0 heißt nie, 10 heißt schon geschehen.',
    'screensB.survey.npsGroup': 'Empfehlungswert',
    'screensB.survey.scaleAria': '{row}: {rating}',
    'screensB.survey.q2': 'Was sollen wir zuerst verbessern?',
    'screensB.survey.q2Note': 'Wählen Sie so viel Sie mögen.',
    'screensB.survey.q3': 'Sonst noch etwas?',
    'screensB.survey.optional': 'Optional',
    'screensB.survey.q3Placeholder':
      'Das Gute, das Schlechte, das Kleinliche — alles hilft.',
    'screensB.survey.emailOptIn': 'Sie dürfen mich dazu anschreiben',
    'screensB.survey.send': 'Feedback senden',

    /* -------------------------------------------------------------- thread */
    'screensB.thread.allTickets': 'Alle Tickets',
    'screensB.thread.noTicketTitle': 'Kein Ticket geöffnet',
    'screensB.thread.noTicketBody':
      'Wählen Sie eine Unterhaltung aus Ihren Tickets, um sie hier zu lesen.',
    'screensB.thread.simulated': 'Antworten in dieser Demo sind simuliert.',
    'screensB.thread.typing': '{name} schreibt',
    'screensB.thread.replyPlaceholder': 'Antwort schreiben…',
    'screensB.thread.replyAria': 'Antwort schreiben',
    'screensB.thread.attachTitle': 'Datei anhängen',
    'screensB.thread.attach': 'Anhängen',
    'screensB.thread.attachToast': 'Anhänge gibt es in dieser Demo nicht',
    'screensB.thread.markSolved': 'Als gelöst markieren',
    'screensB.thread.sendReply': 'Antwort senden',

    /* ---------------------------------------------------------------- tour */
    'screensB.tour.progress': '{n} / {total}',
    'screensB.tour.stepAria': 'Schritt {n} von {total}: {title}',
    'screensB.tour.skip': 'Tour überspringen',
    'screensB.tour.back': 'Zurück',
    'screensB.tour.finish': 'Fertig',
    'screensB.tour.next': 'Weiter',
    'screensB.tour.finished': 'Tour beendet — willkommen an Bord',
    'screensB.tour.skipped':
      'Tour übersprungen — sie steht in der Fußzeile, falls Sie sie doch wollen',

    /* --------------------------------------------------------------- trade */
    'screensB.trade.eyebrow': 'FÜR INSTALLATEURE, ELEKTRIKER UND HAUSVERWALTUNGEN',
    'screensB.trade.h1': 'Gewerbekonto eröffnen',
    'screensB.trade.lede':
      'Gewerbepreise, 30 Tage Zahlungsziel und eine feste Ansprechperson, die ans Telefon geht. Die Freigabe dauert zwei Werktage, und der Beitritt kostet nichts.',
    'screensB.trade.doneTitle': 'Antrag eingegangen',
    'screensB.trade.previewPortal': 'Partnerportal ansehen',
    'screensB.trade.startAnother': 'Weiteren Antrag starten',
    'screensB.trade.pickTier': 'Stufe wählen',
    'screensB.trade.businessDetails': 'Angaben zum Betrieb',
    'screensB.trade.tradingName': 'Firmierung',
    'screensB.trade.businessType': 'Art des Betriebs',
    'screensB.trade.chooseOne': 'Bitte wählen…',
    'screensB.trade.companyNumber': 'Handelsregisternummer',
    'screensB.trade.optional': 'Optional',
    'screensB.trade.vatNumber': 'USt-IdNr.',
    'screensB.trade.vatHint':
      'Nicht umsatzsteuerpflichtig? Einfach frei lassen — wir richten das Konto brutto ein.',
    'screensB.trade.whoWeDealWith': 'Wer unser Kontakt ist',
    'screensB.trade.contactName': 'Name der Ansprechperson',
    'screensB.trade.workEmail': 'Geschäftliche E-Mail',
    'screensB.trade.phone': 'Telefon',
    'screensB.trade.installsAMonth': 'Installationen pro Monat',
    'screensB.trade.whatDoYouFit': 'Was montieren Sie?',
    'screensB.trade.pickAny': 'Beliebig viele',
    'screensB.trade.anythingElse': 'Sollen wir sonst etwas wissen?',
    'screensB.trade.notePlaceholder':
      'Zertifikate, Ihre Einsatzgebiete oder die erwartete Menge.',
    'screensB.trade.apply': 'Gewerbekonto beantragen',
    'screensB.trade.foot':
      'Schon freigegeben? Im {link} finden Sie Auftragsliste, Auszahlungen und Schulungen. Gewerbepreise erscheinen automatisch, sobald Sie angemeldet sind.',
    'screensB.trade.footLink': 'Partnerportal',

    /* ------------------------------------------------------------- tradein */
    'screensB.tradein.h1': 'Was ist Ihr altes Hearth wert?',
    'screensB.tradein.lede':
      'Geben Sie jedes funktionierende Hearth-Gerät gegen das nächste in Zahlung. Was geht, bereiten wir auf, den Rest recyceln wir — Guthaben gibt es so oder so.',
    'screensB.tradein.baseValue': 'Grundwert, {product}',
    'screensB.tradein.conditionRow': 'Zustand: {condition}',
    'screensB.tradein.ageRow': 'Alter: {age}',
    'screensB.tradein.factor': '× {factor}',
    'screensB.tradein.packOrdered': 'Frankiertes Paket bestellt',
    'screensB.tradein.recycleToast': 'Wir mailen Ihnen ein Gratis-Recyclingetikett',
    'screensB.tradein.doneTitle': 'Frankiertes Paket ist unterwegs',
    'screensB.tradein.doneBody':
      'Es kommt in zwei bis drei Werktagen. Schicken Sie das Gerät im selben Karton zurück — das Porto ist bezahlt, und das Guthaben kommt binnen einer Woche nach Eingang.',
    'screensB.tradein.creditChip': '{amount} Guthaben',
    'screensB.tradein.valueAnother': 'Weiteres Gerät bewerten',
    'screensB.tradein.whichDevice': 'Welches Gerät geben Sie in Zahlung?',
    'screensB.tradein.whatCondition': 'In welchem Zustand ist es?',
    'screensB.tradein.howOld': 'Wie alt ist es?',
    'screensB.tradein.yourQuote': 'Ihr Angebot',
    'screensB.tradein.creditFor': 'Guthaben für Ihr {product}',
    'screensB.tradein.quoteNote':
      'Angebot 14 Tage gültig. Wir prüfen das Gerät bei Ankunft — passt der Zustand nicht, machen wir erst ein neues Angebot und schicken es kostenlos zurück, wenn Sie doch nicht wollen.',
    'screensB.tradein.sendPack': 'Frankiertes Paket schicken',
    'screensB.tradein.justRecycle': 'Einfach recyceln',

    /* ------------------------------------------------------------ transfer */
    'screensB.transfer.h1': 'Garantie übertragen',
    'screensB.transfer.lede':
      'Gerät verkauft oder beim Umzug zurückgelassen? Die Restgarantie geht kostenlos mit über. Die neue Person muss nur per E-Mail zustimmen.',
    'screensB.transfer.doneTitle': 'Übertragung gestartet',
    'screensB.transfer.registeredDevices': 'Ihre registrierten Geräte',
    'screensB.transfer.transferAnother': 'Weiteres übertragen',
    'screensB.transfer.whichDevice': 'Welches Gerät geben Sie ab?',
    'screensB.transfer.deviceNote': '{serial} · {left}',
    'screensB.transfer.emptyTitle': 'Nichts mehr zu übertragen',
    'screensB.transfer.emptyBody':
      'Jedes Gerät in diesem Konto wurde bereits übertragen oder entfernt. Registrieren Sie erst ein Gerät, dann ist seine Garantie sofort übertragbar.',
    'screensB.transfer.registerDevice': 'Gerät registrieren',
    'screensB.transfer.newOwnerName': 'Name der neuen Person',
    'screensB.transfer.theirEmail': 'Ihre E-Mail-Adresse',
    'screensB.transfer.whyTransfer': 'Warum übertragen Sie es?',
    'screensB.transfer.chooseReason': 'Grund wählen…',
    'screensB.transfer.warning':
      'Die Übertragung entfernt das Gerät aus Ihrem Haushalt und löscht seinen Clip-Verlauf endgültig. Setzen Sie es vorher auf Werkseinstellungen zurück — danach können wir nichts mehr wiederherstellen.',
    'screensB.transfer.start': 'Übertragung starten',
    'screensB.transfer.howItWorks': 'So läuft es',
    'screensB.transfer.how1':
      'Wir mailen der neuen Person einen Link — er gilt 14 Tage.',
    'screensB.transfer.how2':
      'Sie stimmt zu und fügt das Gerät ihrem eigenen Hearth-Konto hinzu.',
    'screensB.transfer.how3':
      'Die Restgarantie geht mit dem ursprünglichen Kaufdatum über. Nichts zu zahlen, und das zusätzliche Registrierungsjahr kommt mit.',

    /* ------------------------------------------------------------ warranty */
    'screensB.warranty.h1': 'Garantie registrieren',
    'screensB.warranty.lede':
      'Die Registrierung dauert eine Minute und bringt ein drittes Garantiejahr gratis. Außerdem bekommen Sie Firmware-Hinweise zu Ihren Geräten — und sonst nichts.',
    'screensB.warranty.needDevice': 'Wählen Sie das zu registrierende Gerät',
    'screensB.warranty.needSerial': 'Geben Sie die vollständige Seriennummer ein',
    'screensB.warranty.needRetailer': 'Sagen Sie uns, wo Sie es gekauft haben',
    'screensB.warranty.purchasedToday': 'Heute',
    'screensB.warranty.coverLeft': '3 J. übrig',
    'screensB.warranty.registered': 'Garantie registriert',
    'screensB.warranty.doneTitle': '{name} registriert',
    'screensB.warranty.doneBody':
      'Die Garantie läuft bis {date}. Wir haben das Zertifikat an sam@example.com gemailt — bewahren Sie es beim Beleg auf.',
    'screensB.warranty.registerAnother': 'Weiteres Gerät registrieren',
    'screensB.warranty.makeClaim': 'Garantiefall melden',
    'screensB.warranty.whichDevice': 'Welches Gerät?',
    'screensB.warranty.serialNumber': 'Seriennummer',
    'screensB.warranty.serialHelp':
      'Auf der Rückplatte und in der App unter Über.',
    'screensB.warranty.purchaseDate': 'Kaufdatum',
    'screensB.warranty.whereBought': 'Wo haben Sie es gekauft?',
    'screensB.warranty.selectRetailer': 'Händler wählen…',
    'screensB.warranty.callout':
      'Bei uns gekauft? Ihre Bestellung ist schon abgedeckt — die Registrierung fügt nur das Extrajahr und den Beleg zu Ihrem Konto hinzu.',
    'screensB.warranty.submit': 'Garantie registrieren',
    'screensB.warranty.listTitle': 'Ihre registrierten Geräte',
    'screensB.warranty.coverTo': 'Garantie bis {date}',
    'screensB.warranty.claim': 'Melden',
    'screensB.warranty.transferLabel': 'Diese Garantie übertragen',
    'screensB.warranty.remainingAria': 'Restgarantie für {model}',
    'screensB.warranty.emptyTitle': 'Keine registrierten Geräte',
    'screensB.warranty.emptyBody':
      'In diesem Konto ist noch nichts registriert. Die Registrierung bringt ein kostenloses drittes Garantiejahr und dauert etwa eine Minute.',
    'screensB.warranty.registerDevice': 'Gerät registrieren',

    /* ---------------------------------------------------------------- wish */
    'screensB.wish.h1': 'Wunschliste',
    'screensB.wish.shareList': 'Liste teilen',
    'screensB.wish.addAllInStock': 'Alles Verfügbare hinzufügen',
    'screensB.wish.priceDrop': 'Preis gesenkt',
    'screensB.wish.notifyMe': 'Benachrichtigen',
    'screensB.wish.addToBasket': 'In den Warenkorb',
    'screensB.wish.remove': 'Entfernen',
    'screensB.wish.emptyTitle': 'Ihre Wunschliste ist leer',
    'screensB.wish.emptyBody':
      'Speichern Sie alles, worüber Sie nachdenken — wir sagen Bescheid, wenn der Preis fällt oder es wieder da ist, und nichts läuft ab.',
    'screensB.wish.browseBundles': 'Bundles ansehen',
    'screensB.wish.restore': 'Demo-Artikel zurückholen',
    'screensB.wish.othersSaved': 'Andere haben auch gespeichert',
    'screensB.wish.saveIt': 'Speichern',
  },
  /* Typographic apostrophes (’) throughout, and a NO-BREAK SPACE before ? ! : ; */
  'fr-FR': {
    /* ---------------------------------------------------------------- live */
    'screensB.live.h1': 'Vue en direct et clips',
    'screensB.live.clipHistory': 'Historique des clips',
    'screensB.live.note':
      'Les clips sont chiffrés de bout en bout. Le partage crée un lien qui expire au bout de 7 jours, et nous ne pouvons pas voir ce qu’il y a derrière.',

    /* ------------------------------------------------------------- members */
    'screensB.members.h1': 'Membres du foyer',
    'screensB.members.lede':
      'Partagez la maison sans partager votre mot de passe. Les invités ne voient jamais l’historique des clips, et vous pouvez retirer quelqu’un instantanément.',
    'screensB.members.roleOwner': 'Propriétaire',
    'screensB.members.roleAdult': 'Adulte',
    'screensB.members.roleGuest': 'Invité',
    'screensB.members.roleLabel': 'Rôle',
    'screensB.members.needEmail': 'Saisissez une adresse e-mail',
    'screensB.members.pendingMeta': '{email} · invitation en attente',
    'screensB.members.permFrontDoor': 'Porte d’entrée uniquement',
    'screensB.members.permAllDevices': 'Tous les appareils',
    'screensB.members.inviteByEmail': 'Inviter par e-mail',
    'screensB.members.sendInvite': 'Envoyer l’invitation',
    'screensB.members.inviteSent': 'Invitation envoyée',
    'screensB.members.inviteSentTo': 'Invitation envoyée à {email}',
    'screensB.members.inviteSentBody':
      'Elle expire dans 14 jours. La personne apparaîtra ci-dessous comme en attente jusqu’à son acceptation.',
    'screensB.members.nowAdult': '{name} est désormais adulte',
    'screensB.members.nowGuest': '{name} est désormais invité',
    'screensB.members.removed': '{name} retiré',
    'screensB.members.thatsYou': 'C’est vous',
    'screensB.members.roleFor': 'Rôle de {name}',
    'screensB.members.remove': 'Retirer',
    'screensB.members.emptyTitle': 'Vous seul dans ce foyer',
    'screensB.members.emptyBody':
      'Personne d’autre n’y a accès. Invitez quelqu’un ci-dessus et cette personne pourra utiliser la vue en direct et le déverrouillage sans jamais voir votre mot de passe.',
    'screensB.members.note':
      'Seul le propriétaire peut ajouter ou retirer des appareils, consulter la facturation ou fermer le compte. Les adultes font tout le reste ; les invités obtiennent la vue en direct et le déverrouillage sur les plages horaires que vous définissez.',

    /* ----------------------------------------------------------- myTickets */
    'screensB.myTickets.title': 'Mes tickets',
    'screensB.myTickets.lede':
      'Retrouvez vos conversations en cours et passées avec nous.',
    'screensB.myTickets.emailLabel': 'Adresse e-mail',
    'screensB.myTickets.show': 'Afficher mes tickets',
    'screensB.myTickets.showingFor': 'Tickets pour {email}',
    'screensB.myTickets.help':
      'Nous affichons les tickets liés à cette adresse — données de démo.',

    /* ----------------------------------------------------------- newTicket */
    'screensB.newTicket.title': 'Ouvrir un ticket',
    'screensB.newTicket.lede':
      'Dites-nous ce qui se passe et nous reviendrons vers vous. Plus il y a de détails, plus vite nous pouvons aider.',
    'screensB.newTicket.product': 'Quel produit ?',
    'screensB.newTicket.topic': 'Sujet',
    'screensB.newTicket.topicPlaceholder': 'Choisissez un sujet…',
    'screensB.newTicket.subject': 'Objet',
    'screensB.newTicket.subjectPlaceholder':
      'Un résumé court, par ex. "Sonnette hors ligne chaque nuit"',
    'screensB.newTicket.description': 'Description',
    'screensB.newTicket.counter': '{used}/{max}',
    'screensB.newTicket.descPlaceholder':
      'Que se passe-t-il ? Indiquez ce que vous avez déjà essayé, les messages d’erreur et depuis quand cela dure.',
    'screensB.newTicket.attachments': 'Pièces jointes',
    'screensB.newTicket.addFile': 'Ajouter un fichier',
    'screensB.newTicket.simulated': 'Les réponses de cette démo sont simulées.',
    'screensB.newTicket.submit': 'Envoyer le ticket',

    /* ------------------------------------------------------------ notFound */
    'screensB.notFound.code': 'ERREUR 404',
    'screensB.notFound.title': 'Cette page a pris un mauvais virage.',
    'screensB.notFound.body':
      'La page que vous cherchez n’est pas ici — elle a peut-être été déplacée, ou elle n’a pas encore été construite pour cette démo.',
    'screensB.notFound.home': 'Retour au centre d’aide',
    'screensB.notFound.ticket': 'Ouvrir un ticket',

    /* -------------------------------------------------------------- notifs */
    'screensB.notifs.h1': 'Notifications',
    'screensB.notifs.introUnread':
      '{count} non lue · nous gardons 90 jours d’historique, et vous réglez ce qui vous parvient.|{count} non lues · nous gardons 90 jours d’historique, et vous réglez ce qui vous parvient.',
    'screensB.notifs.introClear':
      'Tout est à jour — nous gardons 90 jours d’historique.',
    'screensB.notifs.markAllRead': 'Tout marquer comme lu',
    'screensB.notifs.settingsLabel': 'Réglages des notifications',
    'screensB.notifs.settingsLive':
      'Les réglages d’alerte se trouvent ici, avec l’accessibilité',
    'screensB.notifs.allMarkedRead': 'Tout marqué comme lu',
    'screensB.notifs.inboxCleared': 'Boîte vidée',
    'screensB.notifs.inboxClearedBody':
      'Plus rien de non lu. Les nouvelles alertes apparaîtront en haut dès leur arrivée.',
    'screensB.notifs.alertSettings': 'Réglages d’alerte',
    'screensB.notifs.unread': 'Non lue',
    'screensB.notifs.emptyTitle': 'Rien dans ce filtre',
    'screensB.notifs.emptyBody':
      'Essayez une autre catégorie — nous gardons 90 jours d’historique.',

    /* -------------------------------------------------------------- orders */
    'screensB.orders.h1': 'Suivi de commande',
    'screensB.orders.lede':
      'Saisissez votre numéro de commande et l’e-mail utilisé. Les mises à jour de suivi arrivent ici dans l’heure qui suit un scan.',
    'screensB.orders.statusTransit': 'En transit',
    'screensB.orders.statusDelivered': 'Livrée',
    'screensB.orders.statusPacking': 'En préparation',
    'screensB.orders.headlineDelivered': 'Livrée le {day}',
    'screensB.orders.headlinePacking': 'En cours d’emballage, expédition demain',
    'screensB.orders.headlineTransit': 'Arrivée mar. 28 juil.',
    'screensB.orders.errNoNumber':
      'Saisissez le numéro de commande figurant dans votre e-mail de confirmation.',
    'screensB.orders.errNotFound':
      'Nous n’avons trouvé aucune commande correspondant à {id}. Vérifiez le numéro dans votre e-mail de confirmation — il commence par {prefix}.',
    'screensB.orders.errNoEmail':
      'Saisissez l’adresse e-mail utilisée pour la commande afin que nous puissions la confirmer.',
    'screensB.orders.errEmailMismatch':
      'Cette commande existe, mais l’e-mail ne correspond pas à nos données. Essayez l’adresse de votre e-mail de confirmation.',
    'screensB.orders.found': 'Commande {id} trouvée',
    'screensB.orders.trackingCopied': 'Numéro de suivi copié',
    'screensB.orders.numberLabel': 'Numéro de commande',
    'screensB.orders.emailLabel': 'E-mail de la commande',
    'screensB.orders.find': 'Trouver ma commande',
    'screensB.orders.demoOrders': 'Commandes de démo :',
    'screensB.orders.placedLine': 'Passée le {placed} · {items}',
    'screensB.orders.carrier': 'Transporteur',
    'screensB.orders.copyTracking': 'Copier le numéro de suivi',
    'screensB.orders.deliveringTo': 'Livraison à',
    'screensB.orders.inThisOrder': 'Dans cette commande',
    'screensB.orders.qty': 'Qté {n}',
    'screensB.orders.total': 'Total',
    'screensB.orders.somethingWrong': 'Un problème avec cette commande',
    'screensB.orders.askDelivery': 'Question sur la livraison',

    /* ------------------------------------------------------------ overview */
    'screensB.overview.eyebrow': 'VUE D’ENSEMBLE',
    'screensB.overview.h1': 'Tous les écrans du portail',
    'screensB.overview.lede':
      '{count} écrans, tous interactifs. Allez directement à l’un d’eux — les parcours se relient entre eux comme en production.',
    'screensB.overview.lightTheme': 'Thème clair',
    'screensB.overview.darkTheme': 'Thème sombre',
    'screensB.overview.openPortal': 'Ouvrir le portail',

    /* ------------------------------------------------------------- partner */
    'screensB.partner.approved': 'Partenaire agréé',
    'screensB.partner.tradeAccount': 'Compte pro',
    'screensB.partner.supportLine': 'Ligne d’assistance partenaires',
    'screensB.partner.kpiJobs': 'Missions ce mois-ci',
    'screensB.partner.kpiRating': 'Note',
    'screensB.partner.kpiPayout': 'Prochain versement',
    'screensB.partner.kpiResponse': 'Délai de réponse',
    'screensB.partner.jobRequests': 'Demandes de mission',
    'screensB.partner.queueLine': '{waiting} en attente · selon vos compétences',
    'screensB.partner.queueClear': 'File vide',
    'screensB.partner.queueClearBody':
      'Les nouvelles demandes de votre secteur arrivent ici. Nous croisons distance, niveau et compétences de votre profil.',
    'screensB.partner.payWarranty': 'Payé par Hearth',
    'screensB.partner.payCustomer': 'Payé par le client',
    'screensB.partner.acceptJob': 'Accepter',
    'screensB.partner.pass': 'Passer',
    'screensB.partner.messageCustomer': 'Écrire au client',
    'screensB.partner.messagingToast':
      'La messagerie partenaire n’existe pas dans cette démo',
    'screensB.partner.accepted': 'Mission acceptée — client prévenu',
    'screensB.partner.passed': 'Passée — de retour dans la file',
    'screensB.partner.certification': 'Certification',
    'screensB.partner.certBody':
      'Encore deux modules avant le renouvellement de votre niveau Gold en octobre.',
    'screensB.partner.continueTraining': 'Poursuivre la formation',
    'screensB.partner.trainingToast':
      'Les modules de formation sont dans l’app partenaire',
    'screensB.partner.resources': 'Ressources partenaires',
    'screensB.partner.resourcesToast':
      'Les ressources partenaires ne sont pas dans cette démo',
    'screensB.partner.nextPayout': 'Prochain versement',

    /* --------------------------------------------------------------- parts */
    'screensB.parts.h1': 'Pièces détachées',
    'screensB.parts.lede':
      'Toutes les pièces que nous avons expédiées, disponibles au moins sept ans après la sortie d’un produit. Sous garantie ? N’achetez rien — faites une demande et nous l’envoyons gratuitement.',
    'screensB.parts.stockIn': 'En stock',
    'screensB.parts.stockLow': 'Stock faible',
    'screensB.parts.stockOut': 'De retour dans 2 semaines',
    'screensB.parts.emptyTitle': 'Aucune pièce pour cet appareil',
    'screensB.parts.emptyBody':
      'Nous gardons les pièces au moins sept ans après la sortie ; si quelque chose manque ici, cela vaut la peine de nous demander directement.',
    'screensB.parts.openTicket': 'Ouvrir un ticket',
    'screensB.parts.fitsLine': '{sku} · compatible {fits}',
    'screensB.parts.removeOne': 'Retirer un exemplaire de {name}',
    'screensB.parts.addAnother': 'Ajouter un exemplaire de {name}',
    'screensB.parts.notifyToast': 'Nous vous écrirons dès son retour',
    'screensB.parts.notify': 'M’avertir',
    'screensB.parts.add': 'Ajouter',
    'screensB.parts.basketEmptied': 'Panier vidé',
    'screensB.parts.checkoutToast':
      'Le paiement n’est pas disponible dans cette démo',
    'screensB.parts.freeDelivery': 'Livraison offerte',
    'screensB.parts.moreForFree': 'Encore {amount} pour la livraison offerte',
    'screensB.parts.inYourBasket': '{parts} dans votre panier',
    'screensB.parts.empty': 'Vider',
    'screensB.parts.checkout': 'Payer',
    'screensB.parts.callout':
      'La plupart des pièces se montent avec un tournevis et dix minutes. Chaque fiche de pièce dans l’app renvoie à un guide de réparation pas à pas — jamais de soudure.',

    /* --------------------------------------------------------------- plans */
    'screensB.plans.title': 'Formules Hearth Care',
    'screensB.plans.lede':
      'Historique des clips, assistance prioritaire et réparations hors garantie offertes. Chaque formule couvre autant d’appareils que vous en avez — résiliable à tout moment, vous gardez les enregistrements téléchargés.',
    'screensB.plans.cycleLabel': 'Cycle de facturation',
    'screensB.plans.cycleMonthly': 'Mensuel',
    'screensB.plans.free': 'Gratuit',
    'screensB.plans.perAlways': 'toujours',
    'screensB.plans.perYear': 'par an',
    'screensB.plans.perMonth': 'par mois',
    'screensB.plans.noCard': 'Aucune carte requise',
    'screensB.plans.worksOut': 'soit {amount} par mois',
    'screensB.plans.billedMonthly': 'facturé chaque mois, résiliable à tout moment',
    'screensB.plans.freeTierBilling':
      'Vous êtes sur l’offre gratuite — rien à facturer.',
    'screensB.plans.pricePerYear': '{amount} par an',
    'screensB.plans.pricePerMonth': '{amount} par mois',
    'screensB.plans.billingLine':
      '{plan}, {price} {suffix} · prochain prélèvement {date}',
    'screensB.plans.switched': 'Passé à {plan}',
    'screensB.plans.alreadyFree': 'Vous êtes déjà sur l’offre gratuite',
    'screensB.plans.cancelled': 'Formule résiliée — vous êtes sur Hearth Free',
    'screensB.plans.currentPlan': 'Formule actuelle',
    'screensB.plans.mostChosen': 'La plus choisie',
    'screensB.plans.yourCurrentPlan': 'Votre formule actuelle',
    'screensB.plans.downgradeTo': 'Revenir à {plan}',
    'screensB.plans.switchTo': 'Passer à {plan}',
    'screensB.plans.billing': 'Facturation',
    'screensB.plans.invoices': 'Factures',
    'screensB.plans.cancelPlan': 'Résilier la formule',
    'screensB.plans.neverHead': 'Ce qui n’est jamais derrière une formule',
    'screensB.plans.neverBody':
      'Vue en direct, alertes, programmations et enregistrement local fonctionnent pour toujours sur l’offre gratuite. Les formules n’ajoutent que l’historique dans le cloud et une assistance plus rapide.',

    /* -------------------------------------------------------------- recent */
    'screensB.recent.h1': 'Consultés récemment',
    'screensB.recent.articleFallback': 'Article',
    'screensB.recent.helpFallback': 'Aide',
    'screensB.recent.metaLine': '{source} · {time}',
    'screensB.recent.saveForLater': 'Garder pour plus tard',
    'screensB.recent.saveToWishlist': 'Ajouter aux envies',
    'screensB.recent.clearHistory': 'Effacer l’historique',
    'screensB.recent.removeFromHistory': 'Retirer de l’historique',
    'screensB.recent.browseHelp': 'Parcourir l’aide',
    'screensB.recent.restore': 'Remettre l’historique de démo',
    'screensB.recent.note':
      'L’historique reste sur cet appareil et s’efface automatiquement au bout de 30 jours. Nous ne l’utilisons pas pour la publicité, et désactiver les conseils personnalisés dans {link} l’empêche de servir aux suggestions.',
    'screensB.recent.securityLink': 'Sécurité et confidentialité',

    /* ------------------------------------------------------------- recycle */
    'screensB.recycle.h1': 'Dépôt pour recyclage',
    'screensB.recycle.lede':
      'Tout appareil Hearth, quel que soit son âge, en état ou non — recyclage gratuit, et il n’a pas besoin de venir de chez nous. S’il fonctionne encore, vérifiez d’abord la reprise : vous pourriez obtenir un avoir.',
    'screensB.recycle.postcodePost': 'Code postal pour l’étiquette',
    'screensB.recycle.postcodeDrop':
      'Votre code postal, pour trier la liste par distance',
    'screensB.recycle.postcodeCollect': 'Code postal de l’enlèvement',
    'screensB.recycle.submitPost': 'M’envoyer une étiquette gratuite',
    'screensB.recycle.submitDrop': 'Réserver un dépôt',
    'screensB.recycle.submitCollect': 'Réserver un enlèvement',
    'screensB.recycle.checkTradeIn': 'Voir plutôt la valeur de reprise',
    'screensB.recycle.somethingElse': 'Recycler autre chose',
    'screensB.recycle.methodLabel': 'Comment souhaitez-vous le renvoyer ?',
    'screensB.recycle.itemsLabel': 'Que recyclez-vous ?',
    'screensB.recycle.nearest': 'Points de dépôt les plus proches',
    'screensB.recycle.directions': 'Itinéraire',
    'screensB.recycle.allLocations': 'Voir tous les points',
    'screensB.recycle.weTake': 'Nous prenons',
    'screensB.recycle.weCantTake': 'Nous ne prenons pas',
    'screensB.recycle.warning':
      'Réinitialisez tout appareil doté d’une caméra ou d’un micro avant de le remettre. Nous effaçons chaque appareil reçu, mais réinitialiser d’abord garantit que rien ne quitte votre maison avec vos données.',

    /* --------------------------------------------------------------- refer */
    'screensB.refer.eyebrow': 'PARRAINER UN AMI',
    'screensB.refer.title': 'Offrez {amount}, recevez {amount}.',
    'screensB.refer.lede':
      'Offrez à un ami {amount} sur son premier appareil Hearth. Dès l’expédition de sa commande, nous créditons votre compte de {amount} — sans plafond, sans expiration.',
    'screensB.refer.earned': '{amount} gagnés',
    'screensB.refer.progress':
      '{joined} amis inscrits sur {goal} — encore {left} et nous ajoutons {bonus} de bonus.',
    'screensB.refer.codeCopied': 'Code de parrainage copié',
    'screensB.refer.linkCopied': 'Lien d’invitation copié',
    'screensB.refer.needEmail': 'Saisissez l’e-mail de votre ami',
    'screensB.refer.invitedJustNow': 'Invité à l’instant',
    'screensB.refer.rewardPending': 'En attente',
    'screensB.refer.inviteSent': 'Invitation envoyée à {email}',
    'screensB.refer.copyCode': 'Copier le code',
    'screensB.refer.leaderboard': 'Classement',
    'screensB.refer.copyLink': 'Copier le lien',
    'screensB.refer.yourProgress': 'Votre progression',
    'screensB.refer.inviteByEmail': 'Inviter par e-mail',
    'screensB.refer.friendEmailAria': 'Adresse e-mail de votre ami',
    'screensB.refer.send': 'Envoyer',
    'screensB.refer.inviteNote':
      'Nous envoyons un e-mail, puis un rappel une semaine plus tard. Rien d’autre, jamais.',
    'screensB.refer.yourReferrals': 'Vos parrainages',
    'screensB.refer.pillJoined': 'Inscrit',
    'screensB.refer.pillInvited': 'Invité',
    'screensB.refer.legal':
      'L’avoir ne concerne que les nouveaux clients et arrive dès l’expédition de leur commande. L’avoir de parrainage n’est pas échangeable contre des espèces et ne s’applique ni aux réparations ni aux accessoires de moins de {amount}.',

    /* -------------------------------------------------------------- repair */
    'screensB.repair.h1': 'Réserver une réparation',
    'screensB.repair.lede':
      'Les réparations sous garantie sont gratuites, enlèvement compris. Hors garantie, nous chiffrons avant de toucher à quoi que ce soit.',
    'screensB.repair.whenLine': '{dow} {day}, {slot}',
    'screensB.repair.slotFull': 'Ce créneau est complet — essayez-en un autre',
    'screensB.repair.needDevice': 'Choisissez l’appareil à réparer',
    'screensB.repair.needIssue': 'Choisissez ce qu’il faut examiner',
    'screensB.repair.needSlot': 'Choisissez un jour et un créneau',
    'screensB.repair.engineerRole': 'Technicien matériel',
    'screensB.repair.booked': 'Réparation réservée — {ref}',
    'screensB.repair.doneTitle': 'C’est réservé',
    'screensB.repair.doneNote':
      'Gardez l’appareil accessible et votre mot de passe Wi-Fi sous la main. Vous pouvez déplacer le créneau jusqu’à 24 heures avant, sans frais.',
    'screensB.repair.seeAppointments': 'Voir mes rendez-vous',
    'screensB.repair.bookAnother': 'En réserver un autre',
    'screensB.repair.whichDevice': 'Quel appareil ?',
    'screensB.repair.whatIssue': 'Que faut-il examiner ?',
    'screensB.repair.chooseIssue': 'Choisissez un problème…',
    'screensB.repair.howLabel': 'Comment procéder ?',
    'screensB.repair.pickDay': 'Choisissez un jour',
    'screensB.repair.pickSlot': 'Choisissez un créneau',
    'screensB.repair.slotTaken': 'Complet',
    'screensB.repair.confirm': 'Confirmer la réservation',

    /* ------------------------------------------------------------- returns */
    'screensB.returns.h1': 'Commencer un retour',
    'screensB.returns.lede':
      '30 jours après la livraison, sans justification. Le remboursement revient sur votre carte dans les cinq jours ouvrés suivant la réception du colis.',
    'screensB.returns.stepItems': 'Articles',
    'screensB.returns.stepReason': 'Motif',
    'screensB.returns.stepLabel': 'Étiquette',
    'screensB.returns.needItem': 'Choisissez au moins un article à retourner',
    'screensB.returns.needReason':
      'Choisissez un motif pour que nous puissions traiter le retour',
    'screensB.returns.created': 'Retour créé',
    'screensB.returns.labelEmailed': 'Étiquette envoyée à sam@example.com',
    'screensB.returns.continue': 'Continuer',
    'screensB.returns.getLabel': 'Obtenir mon étiquette',
    'screensB.returns.emailLabel': 'M’envoyer l’étiquette',
    'screensB.returns.whichOrder': 'Quelle commande ?',
    'screensB.returns.orderLineDelivered': 'Livrée le {placed} · {items} · {total}',
    'screensB.returns.orderLineArriving': 'Arrivée le {placed} · {items} · {total}',
    'screensB.returns.whatSending': 'Que renvoyez-vous ?',
    'screensB.returns.whyReturning': 'Pourquoi le retournez-vous ?',
    'screensB.returns.chooseReason': 'Choisissez un motif…',
    'screensB.returns.anythingKnow': 'Autre chose à nous signaler ?',
    'screensB.returns.optional': 'Facultatif',
    'screensB.returns.notePlaceholder':
      'Cela nous aide à corriger les choses — mais vous n’avez rien à expliquer.',
    'screensB.returns.howSend': 'Comment souhaitez-vous l’envoyer ?',
    'screensB.returns.doneTitle': 'Votre retour est prêt',
    'screensB.returns.doneBody':
      'Nous avons envoyé l’étiquette à sam@example.com. {detail}',
    'screensB.returns.reference': 'Référence du retour',
    'screensB.returns.qrHint':
      'Présentez ce code au point de dépôt, ou collez l’étiquette imprimée sur le colis.',
    'screensB.returns.whatNext': 'La suite',
    'screensB.returns.next1':
      'Emballez les articles avec les câbles et supports fournis dans la boîte.',
    'screensB.returns.next2':
      'Déposez-le sous 14 jours — passé ce délai l’étiquette expire et il en faut une nouvelle.',
    'screensB.returns.next3':
      'Nous remboursons dans les cinq jours ouvrés suivant l’arrivée du colis, et vous écrivons une fois que c’est fait.',
    'screensB.returns.back': 'Retour',

    /* --------------------------------------------------------------- saved */
    'screensB.saved.h1': 'Articles enregistrés',
    'screensB.saved.introHas':
      'Gardés pour plus tard sur ce compte — {articles}. Ils se synchronisent aussi avec l’app Hearth.',
    'screensB.saved.introEmpty':
      'Rien d’enregistré pour l’instant. Tout ce que vous marquez apparaît ici et dans l’app.',
    'screensB.saved.remove': 'Retirer',
    'screensB.saved.emptyTitle': 'Rien d’enregistré pour l’instant',
    'screensB.saved.emptyBody':
      'Touchez "Garder pour plus tard" sur un article et il vous attendra ici — pratique avant de monter à l’échelle.',
    'screensB.saved.browse': 'Parcourir les articles',
    'screensB.saved.suggested': 'À lire ensuite',
    'screensB.saved.save': 'Enregistrer',

    /* ------------------------------------------------------------ security */
    'screensB.security.h1': 'Sécurité et confidentialité',
    'screensB.security.lede':
      'Les clips sont chiffrés de bout en bout — ni nous ni nos partenaires ne pouvons les regarder. Tout ce qui suit vous appartient : modifiez-le ou emportez-le.',
    'screensB.security.password': 'Mot de passe',
    'screensB.security.passwordToast':
      'Les changements de mot de passe demandent une confirmation par e-mail',
    'screensB.security.change': 'Modifier',
    'screensB.security.recommended': 'Recommandé',
    'screensB.security.toggledOn': '{label} activé',
    'screensB.security.toggledOff': '{label} désactivé',
    'screensB.security.keepClipsFor': 'Conserver les clips',
    'screensB.security.keepClipsNote':
      'Les clips plus anciens sont supprimés automatiquement. Ce que vous avez téléchargé reste à vous.',
    'screensB.security.whereSignedIn': 'Où vous êtes connecté',
    'screensB.security.signOutEverywhere': 'Se déconnecter partout ailleurs',
    'screensB.security.signedOutEverywhere': 'Déconnecté partout ailleurs',
    'screensB.security.thisDevice': 'Cet appareil',
    'screensB.security.sessionMeta': '{where} · {when}',
    'screensB.security.signOut': 'Déconnecter',
    'screensB.security.signedOutOf': 'Déconnecté de {device}',
    'screensB.security.emptyTitle': 'Aucun autre appareil connecté',
    'screensB.security.emptyBody':
      'C’est la seule session de votre compte. Toute autre connexion apparaîtra ici avec son emplacement.',
    'screensB.security.takeYourData': 'Emporter vos données',
    'screensB.security.takeYourDataBody':
      'Un zip de votre compte, vos appareils, vos programmations et l’index des clips — prêt en une dizaine de minutes.',
    'screensB.security.requestExport': 'Demander l’export',
    'screensB.security.exportToast': 'Export demandé — nous enverrons un lien',
    'screensB.security.deleteAccount': 'Supprimer votre compte',
    'screensB.security.deleteAccountBody':
      'Supprime définitivement compte, clips et programmations au bout de 30 jours. Vos appareils continuent de fonctionner en local.',
    'screensB.security.startDeletion': 'Lancer la suppression',

    /* --------------------------------------------------------------- share */
    'screensB.share.h1': 'Clips partagés',
    'screensB.share.lede':
      'Partagez un clip avec des voisins, un groupe ou la police sans donner accès à votre compte. Chaque lien expire, et vous pouvez le retirer à tout instant.',
    'screensB.share.shareClip': 'Partager un clip',
    'screensB.share.newLink': 'Nouveau lien partagé',
    'screensB.share.whichClip': 'Quel clip ?',
    'screensB.share.whoCanWatch': 'Qui peut regarder',
    'screensB.share.linkExpires': 'Le lien expire',
    'screensB.share.createLink': 'Créer le lien',
    'screensB.share.cancel': 'Annuler',
    'screensB.share.linkMeta': '{audience} · {expires}',
    'screensB.share.views': 'vues',
    'screensB.share.copyLink': 'Copier le lien',
    'screensB.share.revoke': 'Révoquer',
    'screensB.share.emptyTitle': 'Rien de partagé pour l’instant',
    'screensB.share.emptyBody':
      'Dès que vous partagez un clip, il apparaît ici avec son nombre de vues : vous savez toujours ce qui circule, et vous pouvez le retirer.',
    'screensB.share.note':
      'Les clips partagés sont déchiffrés dans le navigateur de qui les regarde, jamais sur nos serveurs. Révoquer coupe le lien immédiatement, même si une personne ayant déjà téléchargé une copie la garde — comme pour n’importe quelle vidéo envoyée.',

    /* -------------------------------------------------------------- status */
    'screensB.status.h1': 'État des services',
    'screensB.status.lede':
      'État en direct de l’app Hearth, du cloud et du site. Vos appareils continuent de fonctionner en local même quand notre cloud flanche.',
    'screensB.status.healthOk': 'Opérationnel',
    'screensB.status.healthDegraded': 'Dégradé',
    'screensB.status.healthDown': 'Panne',
    'screensB.status.allOperational': 'Tous les systèmes sont opérationnels',
    'screensB.status.someDegraded': '{services} dégradés',
    'screensB.status.needEmail': 'Saisissez un e-mail pour vous abonner',
    'screensB.status.subscribed': 'Abonné aux mises à jour d’état',
    'screensB.status.uptimeLine': '{uptime} · 90 j',
    'screensB.status.openIncident': 'Incident en cours',
    'screensB.status.incidentTitle':
      'La lecture des clips vidéo est lente dans certains foyers',
    'screensB.status.resolved': 'Résolu',
    'screensB.status.subscribeTitle': 'Recevoir l’état par e-mail',
    'screensB.status.subscribeNote':
      'Un e-mail quand quelque chose casse, un autre quand c’est réparé.',
    'screensB.status.emailAria': 'Adresse e-mail pour les mises à jour d’état',
    'screensB.status.subscribe': 'S’abonner',
    'screensB.status.pastIncidents': 'Incidents passés',
    'screensB.status.historyMeta': '{date} · {duration}',

    /* -------------------------------------------------------------- stores */
    'screensB.stores.h1': 'Trouver une boutique',
    'screensB.stores.lede':
      'Les boutiques Hearth et les revendeurs qui portent toute la gamme. Chaque adresse accepte les retours, et les deux magasins phares réparent sans rendez-vous.',
    'screensB.stores.searchLabel': 'Ville ou code postal',
    'screensB.stores.searchPlaceholder': 'Bristol, ou BS1 4TR',
    'screensB.stores.search': 'Rechercher',
    'screensB.stores.nearMe': 'Près de moi',
    'screensB.stores.shown': '{count} affichées',
    'screensB.stores.open': 'Ouvert',
    'screensB.stores.closed': 'Fermé',
    'screensB.stores.directions': 'Itinéraire',
    'screensB.stores.bookRepair': 'Réserver une réparation ici',
    'screensB.stores.emptyBody':
      'Rien ne correspond à cette recherche. Tout ce que nous vendons part gratuitement en 24 h, et les retours depuis chez vous sont gratuits.',
    'screensB.stores.showEvery': 'Afficher toutes les adresses',
    'screensB.stores.findInstaller': 'Trouver plutôt un installateur',

    /* -------------------------------------------------------------- survey */
    'screensB.survey.eyebrow': '{minutes} MINUTES, {questions} QUESTIONS',
    'screensB.survey.h1': 'Comment avons-nous fait ?',
    'screensB.survey.lede':
      'Cela va droit à l’équipe d’assistance — aucune liste marketing, aucune relance sauf si vous en demandez une.',
    'screensB.survey.doneTitle': 'Merci — sincèrement',
    'screensB.survey.scoreOf': '{score}/{max}',
    'screensB.survey.scoreChip': 'note {score}',
    'screensB.survey.backToHelp': 'Retour au centre d’aide',
    'screensB.survey.fillAgain': 'Le remplir à nouveau',
    'screensB.survey.needScore': 'Choisissez d’abord une note de 0 à 10',
    'screensB.survey.sent': 'Avis envoyé — merci',
    'screensB.survey.progressLabel': 'Progression du questionnaire',
    'screensB.survey.answered': '{answered} sur {total} répondues',
    'screensB.survey.q1':
      'Quelle est la probabilité que vous recommandiez Hearth à un ami ?',
    'screensB.survey.q1Note': '0 : jamais ; 10 : c’est déjà fait.',
    'screensB.survey.npsGroup': 'Note de recommandation',
    'screensB.survey.scaleAria': '{row} : {rating}',
    'screensB.survey.q2': 'Que devrions-nous corriger en premier ?',
    'screensB.survey.q2Note': 'Choisissez-en autant que vous voulez.',
    'screensB.survey.q3': 'Autre chose ?',
    'screensB.survey.optional': 'Facultatif',
    'screensB.survey.q3Placeholder':
      'Le bon, le mauvais, le pointilleux — tout nous aide.',
    'screensB.survey.emailOptIn': 'Vous pouvez m’écrire à ce sujet',
    'screensB.survey.send': 'Envoyer mon avis',

    /* -------------------------------------------------------------- thread */
    'screensB.thread.allTickets': 'Tous les tickets',
    'screensB.thread.noTicketTitle': 'Aucun ticket ouvert',
    'screensB.thread.noTicketBody':
      'Choisissez une conversation dans vos tickets pour la lire ici.',
    'screensB.thread.simulated': 'Les réponses de cette démo sont simulées.',
    'screensB.thread.typing': '{name} est en train d’écrire',
    'screensB.thread.replyPlaceholder': 'Écrire une réponse…',
    'screensB.thread.replyAria': 'Écrire une réponse',
    'screensB.thread.attachTitle': 'Joindre un fichier',
    'screensB.thread.attach': 'Joindre',
    'screensB.thread.attachToast':
      'Les pièces jointes ne sont pas disponibles dans cette démo',
    'screensB.thread.markSolved': 'Marquer comme résolu',
    'screensB.thread.sendReply': 'Envoyer la réponse',

    /* ---------------------------------------------------------------- tour */
    'screensB.tour.progress': '{n} / {total}',
    'screensB.tour.stepAria': 'Étape {n} sur {total} : {title}',
    'screensB.tour.skip': 'Passer la visite',
    'screensB.tour.back': 'Retour',
    'screensB.tour.finish': 'Terminer',
    'screensB.tour.next': 'Suivant',
    'screensB.tour.finished': 'Visite terminée — bienvenue',
    'screensB.tour.skipped':
      'Visite passée — elle reste en pied de page si vous la voulez',

    /* --------------------------------------------------------------- trade */
    'screensB.trade.eyebrow':
      'POUR LES INSTALLATEURS, ÉLECTRICIENS ET AGENCES DE LOCATION',
    'screensB.trade.h1': 'Ouvrir un compte pro',
    'screensB.trade.lede':
      'Tarifs pro, paiement à 30 jours et un interlocuteur dédié qui décroche. L’agrément prend deux jours ouvrés et l’adhésion est gratuite.',
    'screensB.trade.doneTitle': 'Demande reçue',
    'screensB.trade.previewPortal': 'Aperçu du portail partenaire',
    'screensB.trade.startAnother': 'Faire une autre demande',
    'screensB.trade.pickTier': 'Choisissez un niveau',
    'screensB.trade.businessDetails': 'Informations sur l’entreprise',
    'screensB.trade.tradingName': 'Nom commercial',
    'screensB.trade.businessType': 'Type d’activité',
    'screensB.trade.chooseOne': 'Choisissez…',
    'screensB.trade.companyNumber': 'Numéro d’entreprise',
    'screensB.trade.optional': 'Facultatif',
    'screensB.trade.vatNumber': 'Numéro de TVA',
    'screensB.trade.vatHint':
      'Pas assujetti à la TVA ? Laissez vide — nous ouvrirons le compte en TTC.',
    'screensB.trade.whoWeDealWith': 'Votre interlocuteur',
    'screensB.trade.contactName': 'Nom du contact',
    'screensB.trade.workEmail': 'E-mail professionnel',
    'screensB.trade.phone': 'Téléphone',
    'screensB.trade.installsAMonth': 'Installations par mois',
    'screensB.trade.whatDoYouFit': 'Que posez-vous ?',
    'screensB.trade.pickAny': 'Autant que vous voulez',
    'screensB.trade.anythingElse': 'Autre chose à nous signaler ?',
    'screensB.trade.notePlaceholder':
      'Accréditations, zones couvertes ou volume attendu.',
    'screensB.trade.apply': 'Demander un compte pro',
    'screensB.trade.foot':
      'Déjà agréé ? Le {link} contient votre file de missions, vos versements et vos formations. Les tarifs pro s’affichent automatiquement une fois connecté.',
    'screensB.trade.footLink': 'portail partenaire',

    /* ------------------------------------------------------------- tradein */
    'screensB.tradein.h1': 'Combien vaut votre ancien Hearth ?',
    'screensB.tradein.lede':
      'Reprenez n’importe quel appareil Hearth en état contre le suivant. Nous reconditionnons ce que nous pouvons et recyclons le reste — vous obtenez un avoir dans les deux cas.',
    'screensB.tradein.baseValue': 'Valeur de base, {product}',
    'screensB.tradein.conditionRow': 'État : {condition}',
    'screensB.tradein.ageRow': 'Âge : {age}',
    'screensB.tradein.factor': '× {factor}',
    'screensB.tradein.packOrdered': 'Kit prépayé commandé',
    'screensB.tradein.recycleToast':
      'Nous vous enverrons une étiquette de recyclage gratuite',
    'screensB.tradein.doneTitle': 'Kit prépayé en route',
    'screensB.tradein.doneBody':
      'Il arrive sous deux à trois jours ouvrés. Renvoyez l’appareil dans la même boîte — l’affranchissement est couvert, et l’avoir arrive dans la semaine suivant sa réception.',
    'screensB.tradein.creditChip': '{amount} d’avoir',
    'screensB.tradein.valueAnother': 'Estimer un autre appareil',
    'screensB.tradein.whichDevice': 'Quel appareil reprenez-vous ?',
    'screensB.tradein.whatCondition': 'Dans quel état est-il ?',
    'screensB.tradein.howOld': 'Quel âge a-t-il ?',
    'screensB.tradein.yourQuote': 'Votre estimation',
    'screensB.tradein.creditFor': 'd’avoir en boutique pour votre {product}',
    'screensB.tradein.quoteNote':
      'Estimation valable 14 jours. Nous vérifions l’appareil à son arrivée — si l’état ne correspond pas, nous réestimons avant toute chose et le renvoyons gratuitement si vous préférez en rester là.',
    'screensB.tradein.sendPack': 'M’envoyer un kit prépayé',
    'screensB.tradein.justRecycle': 'Simplement le recycler',

    /* ------------------------------------------------------------ transfer */
    'screensB.transfer.h1': 'Transférer une garantie',
    'screensB.transfer.lede':
      'Vous vendez un appareil ou le laissez en déménageant ? La garantie restante suit, sans frais. Le nouveau propriétaire n’a qu’à accepter par e-mail.',
    'screensB.transfer.doneTitle': 'Transfert lancé',
    'screensB.transfer.registeredDevices': 'Vos appareils enregistrés',
    'screensB.transfer.transferAnother': 'En transférer un autre',
    'screensB.transfer.whichDevice': 'Quel appareil cédez-vous ?',
    'screensB.transfer.deviceNote': '{serial} · {left}',
    'screensB.transfer.emptyTitle': 'Plus rien à transférer',
    'screensB.transfer.emptyBody':
      'Tous les appareils de ce compte ont déjà été transférés ou retirés. Enregistrez d’abord un appareil et sa garantie devient transférable aussitôt.',
    'screensB.transfer.registerDevice': 'Enregistrer un appareil',
    'screensB.transfer.newOwnerName': 'Nom du nouveau propriétaire',
    'screensB.transfer.theirEmail': 'Son e-mail',
    'screensB.transfer.whyTransfer': 'Pourquoi le transférez-vous ?',
    'screensB.transfer.chooseReason': 'Choisissez un motif…',
    'screensB.transfer.warning':
      'Le transfert retire l’appareil de votre foyer et efface définitivement son historique de clips. Réinitialisez-le d’abord si ce n’est pas déjà fait — nous ne pouvons rien récupérer ensuite.',
    'screensB.transfer.start': 'Lancer le transfert',
    'screensB.transfer.howItWorks': 'Comment ça marche',
    'screensB.transfer.how1':
      'Nous envoyons un lien au nouveau propriétaire — il est valable 14 jours.',
    'screensB.transfer.how2':
      'Il accepte et ajoute l’appareil à son propre compte Hearth.',
    'screensB.transfer.how3':
      'La garantie restante suit avec la date d’achat d’origine. Rien à payer, et l’année supplémentaire liée à l’enregistrement suit aussi.',

    /* ------------------------------------------------------------ warranty */
    'screensB.warranty.h1': 'Enregistrer votre garantie',
    'screensB.warranty.lede':
      'L’enregistrement prend une minute et ajoute une troisième année de garantie gratuite. Vous recevrez aussi les notes de firmware de vos appareils, et rien d’autre.',
    'screensB.warranty.needDevice': 'Choisissez l’appareil à enregistrer',
    'screensB.warranty.needSerial': 'Saisissez le numéro de série complet',
    'screensB.warranty.needRetailer': 'Dites-nous où vous l’avez acheté',
    'screensB.warranty.purchasedToday': 'Aujourd’hui',
    'screensB.warranty.coverLeft': '3 ans restants',
    'screensB.warranty.registered': 'Garantie enregistrée',
    'screensB.warranty.doneTitle': '{name} enregistré',
    'screensB.warranty.doneBody':
      'La garantie court jusqu’au {date}. Nous avons envoyé le certificat à sam@example.com — gardez-le avec votre reçu.',
    'screensB.warranty.registerAnother': 'Enregistrer un autre appareil',
    'screensB.warranty.makeClaim': 'Faire une demande',
    'screensB.warranty.whichDevice': 'Quel appareil ?',
    'screensB.warranty.serialNumber': 'Numéro de série',
    'screensB.warranty.serialHelp':
      'Sur la plaque arrière, et dans l’app sous À propos.',
    'screensB.warranty.purchaseDate': 'Date d’achat',
    'screensB.warranty.whereBought': 'Où l’avez-vous acheté ?',
    'screensB.warranty.selectRetailer': 'Choisissez un revendeur…',
    'screensB.warranty.callout':
      'Acheté chez nous ? Votre commande est déjà couverte — l’enregistrement ajoute simplement l’année supplémentaire et le reçu à votre compte.',
    'screensB.warranty.submit': 'Enregistrer la garantie',
    'screensB.warranty.listTitle': 'Vos appareils enregistrés',
    'screensB.warranty.coverTo': 'Garantie jusqu’au {date}',
    'screensB.warranty.claim': 'Demander',
    'screensB.warranty.transferLabel': 'Transférer cette garantie',
    'screensB.warranty.remainingAria': 'Garantie restante pour {model}',
    'screensB.warranty.emptyTitle': 'Aucun appareil enregistré',
    'screensB.warranty.emptyBody':
      'Rien n’est encore enregistré sur ce compte. L’enregistrement ajoute une troisième année de garantie gratuite et prend environ une minute.',
    'screensB.warranty.registerDevice': 'Enregistrer un appareil',

    /* ---------------------------------------------------------------- wish */
    'screensB.wish.h1': 'Liste d’envies',
    'screensB.wish.shareList': 'Partager la liste',
    'screensB.wish.addAllInStock': 'Ajouter tout ce qui est en stock',
    'screensB.wish.priceDrop': 'Baisse de prix',
    'screensB.wish.notifyMe': 'M’avertir',
    'screensB.wish.addToBasket': 'Ajouter au panier',
    'screensB.wish.remove': 'Retirer',
    'screensB.wish.emptyTitle': 'Votre liste d’envies est vide',
    'screensB.wish.emptyBody':
      'Enregistrez tout ce que vous hésitez à prendre — nous vous préviendrons si le prix baisse ou si le produit revient, et rien n’expire.',
    'screensB.wish.browseBundles': 'Parcourir les packs',
    'screensB.wish.restore': 'Remettre les articles de démo',
    'screensB.wish.othersSaved': 'D’autres ont aussi enregistré',
    'screensB.wish.saveIt': 'Enregistrer',
  },
  'cs-CZ': {
    /* ---------------------------------------------------------------- live */
    'screensB.live.h1': 'Živý přenos a klipy',
    'screensB.live.clipHistory': 'Historie klipů',
    'screensB.live.note':
      'Klipy jsou šifrované od konce ke konci. Sdílení vytvoří odkaz, který vyprší za 7 dní, a my se na to, co je za ním, dívat nemůžeme.',

    /* ------------------------------------------------------------- members */
    'screensB.members.h1': 'Členové domácnosti',
    'screensB.members.lede':
      'Sdílejte domov, aniž byste sdíleli heslo. Hosté nikdy nevidí historii klipů a kohokoli můžete okamžitě odebrat.',
    'screensB.members.roleOwner': 'Vlastník',
    'screensB.members.roleAdult': 'Dospělý',
    'screensB.members.roleGuest': 'Host',
    'screensB.members.roleLabel': 'Role',
    'screensB.members.needEmail': 'Zadejte e-mailovou adresu',
    'screensB.members.pendingMeta': '{email} · pozvánka čeká',
    'screensB.members.permFrontDoor': 'Jen vchodové dveře',
    'screensB.members.permAllDevices': 'Všechna zařízení',
    'screensB.members.inviteByEmail': 'Pozvat e-mailem',
    'screensB.members.sendInvite': 'Odeslat pozvánku',
    'screensB.members.inviteSent': 'Pozvánka odeslána',
    'screensB.members.inviteSentTo': 'Pozvánka odeslána na {email}',
    'screensB.members.inviteSentBody':
      'Platí 14 dní. Než ji přijmou, uvidíte je níže jako čekající.',
    'screensB.members.nowAdult': '{name} je nyní dospělý',
    'screensB.members.nowGuest': '{name} je nyní host',
    'screensB.members.removed': '{name} odebrán',
    'screensB.members.thatsYou': 'To jste vy',
    'screensB.members.roleFor': 'Role pro {name}',
    'screensB.members.remove': 'Odebrat',
    'screensB.members.emptyTitle': 'V domácnosti jste jen vy',
    'screensB.members.emptyBody':
      'Nikdo další nemá přístup. Pozvěte někoho výše a bude moci používat živý přenos i odemykání, aniž by kdy viděl vaše heslo.',
    'screensB.members.note':
      'Přidávat či odebírat zařízení, vidět fakturaci nebo zrušit účet může jen vlastník. Dospělí zvládnou všechno ostatní; hosté mají živý přenos a odemykání v hodinách, které nastavíte.',

    /* ----------------------------------------------------------- myTickets */
    'screensB.myTickets.title': 'Moje požadavky',
    'screensB.myTickets.lede':
      'Vyhledejte své otevřené i dřívější konverzace s námi.',
    'screensB.myTickets.emailLabel': 'E-mailová adresa',
    'screensB.myTickets.show': 'Zobrazit mé požadavky',
    'screensB.myTickets.showingFor': 'Požadavky pro {email}',
    'screensB.myTickets.help':
      'Ukážeme požadavky k této adrese — demo data.',

    /* ----------------------------------------------------------- newTicket */
    'screensB.newTicket.title': 'Založit požadavek',
    'screensB.newTicket.lede':
      'Napište, co se děje, a my se ozveme. Čím víc podrobností, tím rychleji pomůžeme.',
    'screensB.newTicket.product': 'Který produkt?',
    'screensB.newTicket.topic': 'Téma',
    'screensB.newTicket.topicPlaceholder': 'Vyberte téma…',
    'screensB.newTicket.subject': 'Předmět',
    'screensB.newTicket.subjectPlaceholder':
      'Krátké shrnutí, např. "Zvonek je každou noc offline"',
    'screensB.newTicket.description': 'Popis',
    'screensB.newTicket.counter': '{used}/{max}',
    'screensB.newTicket.descPlaceholder':
      'Co se děje? Uveďte, co jste už zkusili, jaké chybové hlášky se objevily a odkdy to trvá.',
    'screensB.newTicket.attachments': 'Přílohy',
    'screensB.newTicket.addFile': 'Přidat soubor',
    'screensB.newTicket.simulated': 'Odpovědi v tomto demu jsou simulované.',
    'screensB.newTicket.submit': 'Odeslat požadavek',

    /* ------------------------------------------------------------ notFound */
    'screensB.notFound.code': 'CHYBA 404',
    'screensB.notFound.title': 'Tahle stránka zabočila špatně.',
    'screensB.notFound.body':
      'Hledaná stránka tu není — mohla se přesunout, nebo pro toto demo ještě nevznikla.',
    'screensB.notFound.home': 'Zpět do centra nápovědy',
    'screensB.notFound.ticket': 'Založit požadavek',

    /* -------------------------------------------------------------- notifs */
    'screensB.notifs.h1': 'Oznámení',
    'screensB.notifs.introUnread':
      '{count} nepřečtená zpráva · uchováváme 90 dní historie a můžete si nastavit, co vám chodí.|{count} nepřečtené zprávy · uchováváme 90 dní historie a můžete si nastavit, co vám chodí.|{count} nepřečtených zpráv · uchováváme 90 dní historie a můžete si nastavit, co vám chodí.',
    'screensB.notifs.introClear':
      'Vše vyřízeno — uchováváme 90 dní historie.',
    'screensB.notifs.markAllRead': 'Označit vše',
    'screensB.notifs.settingsLabel': 'Nastavení oznámení',
    'screensB.notifs.settingsLive':
      'Nastavení upozornění najdete zde u přístupnosti',
    'screensB.notifs.allMarkedRead': 'Vše označeno jako přečtené',
    'screensB.notifs.inboxCleared': 'Schránka vyčištěna',
    'screensB.notifs.inboxClearedBody':
      'Nic nepřečteného nezbývá. Nová upozornění se objeví nahoře, jakmile dorazí.',
    'screensB.notifs.alertSettings': 'Nastavení upozornění',
    'screensB.notifs.unread': 'Nepřečteno',
    'screensB.notifs.emptyTitle': 'V tomto filtru nic není',
    'screensB.notifs.emptyBody':
      'Zkuste jinou kategorii — uchováváme 90 dní historie.',

    /* -------------------------------------------------------------- orders */
    'screensB.orders.h1': 'Stav objednávky',
    'screensB.orders.lede':
      'Zadejte číslo objednávky a e-mail, se kterým jste objednávali. Aktualizace sledování se tu objeví do hodiny od načtení.',
    'screensB.orders.statusTransit': 'Na cestě',
    'screensB.orders.statusDelivered': 'Doručeno',
    'screensB.orders.statusPacking': 'Připravuje se',
    'screensB.orders.headlineDelivered': 'Doručeno {day}',
    'screensB.orders.headlinePacking': 'Balíme, zítra odesíláme',
    'screensB.orders.headlineTransit': 'Doručení út 28. 7.',
    'screensB.orders.errNoNumber':
      'Zadejte číslo objednávky z potvrzovacího e-mailu.',
    'screensB.orders.errNotFound':
      'Objednávku odpovídající {id} jsme nenašli. Zkontrolujte číslo v potvrzovacím e-mailu — začíná na {prefix}.',
    'screensB.orders.errNoEmail':
      'Zadejte e-mailovou adresu použitou u objednávky, ať ji můžeme ověřit.',
    'screensB.orders.errEmailMismatch':
      'Taková objednávka existuje, ale e-mail neodpovídá našim záznamům. Zkuste adresu z potvrzovacího e-mailu.',
    'screensB.orders.found': 'Objednávka {id} nalezena',
    'screensB.orders.trackingCopied': 'Číslo zásilky zkopírováno',
    'screensB.orders.numberLabel': 'Číslo objednávky',
    'screensB.orders.emailLabel': 'E-mail u objednávky',
    'screensB.orders.find': 'Najít objednávku',
    'screensB.orders.demoOrders': 'Demo objednávky:',
    'screensB.orders.placedLine': 'Objednáno {placed} · {items}',
    'screensB.orders.carrier': 'Dopravce',
    'screensB.orders.copyTracking': 'Zkopírovat číslo zásilky',
    'screensB.orders.deliveringTo': 'Doručujeme na',
    'screensB.orders.inThisOrder': 'V této objednávce',
    'screensB.orders.qty': 'Ks {n}',
    'screensB.orders.total': 'Celkem',
    'screensB.orders.somethingWrong': 'S touto objednávkou něco není v pořádku',
    'screensB.orders.askDelivery': 'Dotaz k doručení',

    /* ------------------------------------------------------------ overview */
    'screensB.overview.eyebrow': 'PŘEHLED',
    'screensB.overview.h1': 'Každá obrazovka portálu',
    'screensB.overview.lede':
      '{count} obrazovek, všechny interaktivní. Skočte rovnou na kteroukoli — toky na sebe odkazují stejně jako v ostrém provozu.',
    'screensB.overview.lightTheme': 'Světlý motiv',
    'screensB.overview.darkTheme': 'Tmavý motiv',
    'screensB.overview.openPortal': 'Otevřít portál',

    /* ------------------------------------------------------------- partner */
    'screensB.partner.approved': 'Schválený partner',
    'screensB.partner.tradeAccount': 'Živnostenský účet',
    'screensB.partner.supportLine': 'Partnerská linka',
    'screensB.partner.kpiJobs': 'Zakázky tento měsíc',
    'screensB.partner.kpiRating': 'Hodnocení',
    'screensB.partner.kpiPayout': 'Další výplata',
    'screensB.partner.kpiResponse': 'Doba odezvy',
    'screensB.partner.jobRequests': 'Poptávky',
    'screensB.partner.queueLine': '{waiting} čeká · vybráno podle vašich dovedností',
    'screensB.partner.queueClear': 'Fronta je prázdná',
    'screensB.partner.queueClearBody':
      'Nové poptávky z vašeho okolí přistanou tady. Párujeme podle vzdálenosti, úrovně a dovedností ve vašem profilu.',
    'screensB.partner.payWarranty': 'Platí Hearth',
    'screensB.partner.payCustomer': 'Platí zákazník',
    'screensB.partner.acceptJob': 'Přijmout zakázku',
    'screensB.partner.pass': 'Odmítnout',
    'screensB.partner.messageCustomer': 'Napsat zákazníkovi',
    'screensB.partner.messagingToast':
      'Partnerské zprávy v tomto demu nejsou',
    'screensB.partner.accepted': 'Zakázka přijata — zákazník informován',
    'screensB.partner.passed': 'Odmítnuto — zpět do fronty',
    'screensB.partner.certification': 'Certifikace',
    'screensB.partner.certBody':
      'Do obnovy úrovně Gold v říjnu zbývají dva moduly.',
    'screensB.partner.continueTraining': 'Pokračovat ve školení',
    'screensB.partner.trainingToast':
      'Školicí moduly najdete v partnerské aplikaci',
    'screensB.partner.resources': 'Partnerské materiály',
    'screensB.partner.resourcesToast': 'Partnerské materiály v tomto demu nejsou',
    'screensB.partner.nextPayout': 'Další výplata',

    /* --------------------------------------------------------------- parts */
    'screensB.parts.h1': 'Náhradní díly',
    'screensB.parts.lede':
      'Každý díl, který jsme kdy dodali, je k dispozici nejméně sedm let od uvedení produktu. Máte záruku? Nekupujte nic — uplatněte ji a díl pošleme zdarma.',
    'screensB.parts.stockIn': 'Skladem',
    'screensB.parts.stockLow': 'Poslední kusy',
    'screensB.parts.stockOut': 'Zpět za 2 týdny',
    'screensB.parts.emptyTitle': 'Pro toto zařízení nejsou žádné díly',
    'screensB.parts.emptyBody':
      'Díly držíme nejméně sedm let od uvedení, takže pokud tu něco chybí, vyplatí se zeptat nás přímo.',
    'screensB.parts.openTicket': 'Založit požadavek',
    'screensB.parts.fitsLine': '{sku} · pasuje na {fits}',
    'screensB.parts.removeOne': 'Odebrat jeden kus {name}',
    'screensB.parts.addAnother': 'Přidat další kus {name}',
    'screensB.parts.notifyToast': 'Napíšeme vám, jakmile bude zpět',
    'screensB.parts.notify': 'Upozornit mě',
    'screensB.parts.add': 'Přidat',
    'screensB.parts.basketEmptied': 'Košík vyprázdněn',
    'screensB.parts.checkoutToast': 'Pokladna v tomto demu není',
    'screensB.parts.freeDelivery': 'Doprava zdarma',
    'screensB.parts.moreForFree': 'Ještě {amount} do dopravy zdarma',
    'screensB.parts.inYourBasket': '{parts} v košíku',
    'screensB.parts.empty': 'Vyprázdnit',
    'screensB.parts.checkout': 'K pokladně',
    'screensB.parts.callout':
      'Většinu dílů zvládnete šroubovákem za deset minut. Každá stránka dílu v aplikaci odkazuje na návod krok za krokem — nikdy se nepájí.',

    /* --------------------------------------------------------------- plans */
    'screensB.plans.title': 'Tarify Hearth Care',
    'screensB.plans.lede':
      'Historie klipů, přednostní podpora a opravy po záruce zdarma. Každý tarif platí pro libovolný počet vašich zařízení — kdykoli zrušitelný, stažené nahrávky vám zůstanou.',
    'screensB.plans.cycleLabel': 'Fakturační období',
    'screensB.plans.cycleMonthly': 'Měsíčně',
    'screensB.plans.free': 'Zdarma',
    'screensB.plans.perAlways': 'stále',
    'screensB.plans.perYear': 'za rok',
    'screensB.plans.perMonth': 'za měsíc',
    'screensB.plans.noCard': 'Karta není potřeba',
    'screensB.plans.worksOut': 'vychází na {amount} měsíčně',
    'screensB.plans.billedMonthly': 'účtováno měsíčně, kdykoli zrušitelné',
    'screensB.plans.freeTierBilling':
      'Máte tarif zdarma — není co účtovat.',
    'screensB.plans.pricePerYear': '{amount} ročně',
    'screensB.plans.pricePerMonth': '{amount} měsíčně',
    'screensB.plans.billingLine':
      '{plan}, {price} {suffix} · další platba {date}',
    'screensB.plans.switched': 'Přepnuto na {plan}',
    'screensB.plans.alreadyFree': 'Tarif zdarma už máte',
    'screensB.plans.cancelled': 'Tarif zrušen — máte Hearth Free',
    'screensB.plans.currentPlan': 'Aktuální tarif',
    'screensB.plans.mostChosen': 'Nejčastější volba',
    'screensB.plans.yourCurrentPlan': 'Váš aktuální tarif',
    'screensB.plans.downgradeTo': 'Přejít na {plan}',
    'screensB.plans.switchTo': 'Přepnout na {plan}',
    'screensB.plans.billing': 'Fakturace',
    'screensB.plans.invoices': 'Faktury',
    'screensB.plans.cancelPlan': 'Zrušit tarif',
    'screensB.plans.neverHead': 'Co nikdy není za tarifem',
    'screensB.plans.neverBody':
      'Živý přenos, upozornění, plány i lokální nahrávání fungují v tarifu zdarma napořád. Tarify přidávají jen historii v cloudu a rychlejší podporu.',

    /* -------------------------------------------------------------- recent */
    'screensB.recent.h1': 'Naposledy zobrazené',
    'screensB.recent.articleFallback': 'Článek',
    'screensB.recent.helpFallback': 'Nápověda',
    'screensB.recent.metaLine': '{source} · {time}',
    'screensB.recent.saveForLater': 'Uložit na později',
    'screensB.recent.saveToWishlist': 'Uložit do oblíbených',
    'screensB.recent.clearHistory': 'Vymazat historii',
    'screensB.recent.removeFromHistory': 'Odebrat z historie',
    'screensB.recent.browseHelp': 'Procházet nápovědu',
    'screensB.recent.restore': 'Vrátit demo historii',
    'screensB.recent.note':
      'Historie je uložená jen v tomto zařízení a po 30 dnech se automaticky maže. Nepoužíváme ji k reklamě a vypnutí personalizovaných tipů v {link} zabrání jejímu využití pro doporučení.',
    'screensB.recent.securityLink': 'Zabezpečení a soukromí',

    /* ------------------------------------------------------------- recycle */
    'screensB.recycle.h1': 'Odevzdání k recyklaci',
    'screensB.recycle.lede':
      'Jakékoli zařízení Hearth, jakkoli staré, funkční i nefunkční — recyklace je zdarma a nemusí být od nás. Pokud ještě funguje, zjistěte nejdřív hodnotu výkupu: možná za něj dostanete kredit.',
    'screensB.recycle.postcodePost': 'PSČ pro štítek',
    'screensB.recycle.postcodeDrop':
      'Vaše PSČ, ať můžeme seznam seřadit podle vzdálenosti',
    'screensB.recycle.postcodeCollect': 'PSČ pro svoz',
    'screensB.recycle.submitPost': 'Poslat mi štítek zdarma',
    'screensB.recycle.submitDrop': 'Rezervovat odevzdání',
    'screensB.recycle.submitCollect': 'Objednat svoz',
    'screensB.recycle.checkTradeIn': 'Raději zjistit hodnotu výkupu',
    'screensB.recycle.somethingElse': 'Recyklovat něco dalšího',
    'screensB.recycle.methodLabel': 'Jak to chcete poslat zpět?',
    'screensB.recycle.itemsLabel': 'Co recyklujete?',
    'screensB.recycle.nearest': 'Nejbližší sběrná místa',
    'screensB.recycle.directions': 'Navigovat',
    'screensB.recycle.allLocations': 'Zobrazit všechna místa',
    'screensB.recycle.weTake': 'Bereme',
    'screensB.recycle.weCantTake': 'Nemůžeme vzít',
    'screensB.recycle.warning':
      'Cokoli s kamerou nebo mikrofonem před odevzdáním uveďte do továrního nastavení. Každé přijaté zařízení mažeme, ale když resetujete předem, nic s vašimi daty ani neopustí dům.',

    /* --------------------------------------------------------------- refer */
    'screensB.refer.eyebrow': 'DOPORUČTE NÁS PŘÍTELI',
    'screensB.refer.title': 'Dejte {amount}, získejte {amount}.',
    'screensB.refer.lede':
      'Dejte příteli {amount} na jeho první zařízení Hearth. Jakmile jeho objednávka odejde, připíšeme vám {amount} — bez stropu, bez expirace.',
    'screensB.refer.earned': 'Získáno {amount}',
    'screensB.refer.progress':
      'Přidalo se {joined} z {goal} přátel — ještě {left} a přidáme bonus {bonus}.',
    'screensB.refer.codeCopied': 'Kód doporučení zkopírován',
    'screensB.refer.linkCopied': 'Odkaz pozvánky zkopírován',
    'screensB.refer.needEmail': 'Zadejte e-mail svého přítele',
    'screensB.refer.invitedJustNow': 'Pozván právě teď',
    'screensB.refer.rewardPending': 'Čeká',
    'screensB.refer.inviteSent': 'Pozvánka odeslána na {email}',
    'screensB.refer.copyCode': 'Kopírovat kód',
    'screensB.refer.leaderboard': 'Žebříček',
    'screensB.refer.copyLink': 'Kopírovat odkaz',
    'screensB.refer.yourProgress': 'Váš postup',
    'screensB.refer.inviteByEmail': 'Pozvat e-mailem',
    'screensB.refer.friendEmailAria': 'E-mailová adresa vašeho přítele',
    'screensB.refer.send': 'Odeslat',
    'screensB.refer.inviteNote':
      'Pošleme jeden e-mail a o týden později jednu připomínku. Nic víc, nikdy.',
    'screensB.refer.yourReferrals': 'Vaše doporučení',
    'screensB.refer.pillJoined': 'Přidal se',
    'screensB.refer.pillInvited': 'Pozván',
    'screensB.refer.legal':
      'Kredit platí jen pro nové zákazníky a připíše se, jakmile odejde jejich objednávka. Kredit za doporučení nelze vyměnit za hotovost a nevztahuje se na opravy ani na příslušenství pod {amount}.',

    /* -------------------------------------------------------------- repair */
    'screensB.repair.h1': 'Objednat opravu',
    'screensB.repair.lede':
      'Opravy v záruce jsou zdarma včetně svozu. Po záruce oceníme dřív, než se čehokoli dotkneme.',
    'screensB.repair.whenLine': '{dow} {day}, {slot}',
    'screensB.repair.slotFull': 'Tento termín je plný — zkuste jiný',
    'screensB.repair.needDevice': 'Vyberte zařízení k opravě',
    'screensB.repair.needIssue': 'Vyberte, na co se máme podívat',
    'screensB.repair.needSlot': 'Vyberte den a termín',
    'screensB.repair.engineerRole': 'Hardwarový technik',
    'screensB.repair.booked': 'Oprava objednána — {ref}',
    'screensB.repair.doneTitle': 'Máte objednáno',
    'screensB.repair.doneNote':
      'Připravte si zařízení a heslo k Wi-Fi. Termín lze do 24 hodin předem zdarma přesunout.',
    'screensB.repair.seeAppointments': 'Zobrazit mé termíny',
    'screensB.repair.bookAnother': 'Objednat další',
    'screensB.repair.whichDevice': 'Které zařízení?',
    'screensB.repair.whatIssue': 'Na co se máme podívat?',
    'screensB.repair.chooseIssue': 'Vyberte problém…',
    'screensB.repair.howLabel': 'Jak to máme udělat?',
    'screensB.repair.pickDay': 'Vyberte den',
    'screensB.repair.pickSlot': 'Vyberte termín',
    'screensB.repair.slotTaken': 'Plno',
    'screensB.repair.confirm': 'Potvrdit objednání',

    /* ------------------------------------------------------------- returns */
    'screensB.returns.h1': 'Založit vrácení',
    'screensB.returns.lede':
      '30 dní od doručení, bez ptaní. Peníze se vrátí na vaši kartu do pěti pracovních dní od doručení balíku k nám.',
    'screensB.returns.stepItems': 'Položky',
    'screensB.returns.stepReason': 'Důvod',
    'screensB.returns.stepLabel': 'Štítek',
    'screensB.returns.needItem': 'Vyberte alespoň jednu položku k vrácení',
    'screensB.returns.needReason': 'Vyberte důvod, ať to můžeme zpracovat',
    'screensB.returns.created': 'Vrácení založeno',
    'screensB.returns.labelEmailed': 'Štítek odeslán na sam@example.com',
    'screensB.returns.continue': 'Pokračovat',
    'screensB.returns.getLabel': 'Získat štítek',
    'screensB.returns.emailLabel': 'Poslat mi štítek',
    'screensB.returns.whichOrder': 'Která objednávka?',
    'screensB.returns.orderLineDelivered': 'Doručeno {placed} · {items} · {total}',
    'screensB.returns.orderLineArriving': 'Doručení {placed} · {items} · {total}',
    'screensB.returns.whatSending': 'Co posíláte zpět?',
    'screensB.returns.whyReturning': 'Proč to vracíte?',
    'screensB.returns.chooseReason': 'Vyberte důvod…',
    'screensB.returns.anythingKnow': 'Máme vědět ještě něco?',
    'screensB.returns.optional': 'Nepovinné',
    'screensB.returns.notePlaceholder':
      'Pomůže nám to věci napravit — vysvětlovat ale nemusíte.',
    'screensB.returns.howSend': 'Jak to chcete poslat?',
    'screensB.returns.doneTitle': 'Vrácení je připravené',
    'screensB.returns.doneBody':
      'Štítek jsme poslali na sam@example.com. {detail}',
    'screensB.returns.reference': 'Referenční číslo vrácení',
    'screensB.returns.qrHint':
      'Ukažte tento kód na sběrném místě, nebo nalepte vytištěný štítek na balík.',
    'screensB.returns.whatNext': 'Co bude dál',
    'screensB.returns.next1':
      'Zabalte položky se všemi kabely a držáky, které byly v krabici.',
    'screensB.returns.next2':
      'Odevzdejte to do 14 dní — poté štítek propadne a budete potřebovat nový.',
    'screensB.returns.next3':
      'Vracíme peníze do pěti pracovních dní od doručení balíku a dáme vám e-mailem vědět.',
    'screensB.returns.back': 'Zpět',

    /* --------------------------------------------------------------- saved */
    'screensB.saved.h1': 'Uložené články',
    'screensB.saved.introHas':
      'Uloženo na později v tomto účtu — {articles}. Synchronizují se i s aplikací Hearth.',
    'screensB.saved.introEmpty':
      'Zatím nic uloženého. Cokoli si označíte, se objeví tady i v aplikaci.',
    'screensB.saved.remove': 'Odebrat',
    'screensB.saved.emptyTitle': 'Zatím nic uloženého',
    'screensB.saved.emptyBody':
      'Klepněte u článku na "Uložit na později" a počká tu na vás — hodí se, než vylezete na štafle.',
    'screensB.saved.browse': 'Procházet články',
    'screensB.saved.suggested': 'Doporučujeme dál',
    'screensB.saved.save': 'Uložit',

    /* ------------------------------------------------------------ security */
    'screensB.security.h1': 'Zabezpečení a soukromí',
    'screensB.security.lede':
      'Klipy jsou šifrované od konce ke konci — nemůžeme se na ně dívat my ani nikdo, s kým spolupracujeme. Vše níže je vaše: změňte to nebo si to odneste.',
    'screensB.security.password': 'Heslo',
    'screensB.security.passwordToast':
      'Změny hesla je nutné potvrdit e-mailem',
    'screensB.security.change': 'Změnit',
    'screensB.security.recommended': 'Doporučeno',
    'screensB.security.toggledOn': '{label} zapnuto',
    'screensB.security.toggledOff': '{label} vypnuto',
    'screensB.security.keepClipsFor': 'Uchovávat klipy',
    'screensB.security.keepClipsNote':
      'Starší klipy se mažou automaticky. Co jste si stáhli, zůstává vám.',
    'screensB.security.whereSignedIn': 'Kde jste přihlášeni',
    'screensB.security.signOutEverywhere': 'Odhlásit všude jinde',
    'screensB.security.signedOutEverywhere': 'Odhlášeno všude jinde',
    'screensB.security.thisDevice': 'Toto zařízení',
    'screensB.security.sessionMeta': '{where} · {when}',
    'screensB.security.signOut': 'Odhlásit',
    'screensB.security.signedOutOf': 'Odhlášeno ze zařízení {device}',
    'screensB.security.emptyTitle': 'Žádná další přihlášená zařízení',
    'screensB.security.emptyBody':
      'Toto je jediná relace vašeho účtu. Cokoli dalšího se přihlásí, objeví se tu i s místem.',
    'screensB.security.takeYourData': 'Vezměte si svá data',
    'screensB.security.takeYourDataBody':
      'Zip s účtem, zařízeními, plány a rejstříkem klipů — obvykle hotový asi za deset minut.',
    'screensB.security.requestExport': 'Požádat o export',
    'screensB.security.exportToast': 'Export vyžádán — pošleme odkaz e-mailem',
    'screensB.security.deleteAccount': 'Smazat účet',
    'screensB.security.deleteAccountBody':
      'Po 30 dnech nenávratně odstraní účet, klipy i plány. Vaše zařízení fungují lokálně dál.',
    'screensB.security.startDeletion': 'Zahájit mazání',

    /* --------------------------------------------------------------- share */
    'screensB.share.h1': 'Sdílené klipy',
    'screensB.share.lede':
      'Sdílejte klip se sousedy, se skupinou nebo s policií, aniž byste vydali účet. Každý odkaz vyprší a kdykoli ho můžete stáhnout zpět.',
    'screensB.share.shareClip': 'Sdílet klip',
    'screensB.share.newLink': 'Nový sdílený odkaz',
    'screensB.share.whichClip': 'Který klip?',
    'screensB.share.whoCanWatch': 'Kdo se může dívat',
    'screensB.share.linkExpires': 'Odkaz vyprší',
    'screensB.share.createLink': 'Vytvořit odkaz',
    'screensB.share.cancel': 'Zrušit',
    'screensB.share.linkMeta': '{audience} · {expires}',
    'screensB.share.views': 'zhlédnutí',
    'screensB.share.copyLink': 'Kopírovat odkaz',
    'screensB.share.revoke': 'Zneplatnit',
    'screensB.share.emptyTitle': 'Momentálně nic sdíleného',
    'screensB.share.emptyBody':
      'Jakmile klip nasdílíte, objeví se tu i s počtem zhlédnutí — vždy tak víte, co je venku, a můžete to stáhnout zpět.',
    'screensB.share.note':
      'Sdílené klipy se dešifrují v prohlížeči diváka, nikdy na našich serverech. Zneplatnění odkaz okamžitě zruší, i když komu se už kopii podařilo stáhnout, tomu zůstane — stejně jako u každého videa, které pošlete.',

    /* -------------------------------------------------------------- status */
    'screensB.status.h1': 'Stav služeb',
    'screensB.status.lede':
      'Aktuální stav aplikace Hearth, cloudu i webu. Vaše zařízení fungují lokálně dál, i když náš cloud ne.',
    'screensB.status.healthOk': 'V provozu',
    'screensB.status.healthDegraded': 'Omezeno',
    'screensB.status.healthDown': 'Výpadek',
    'screensB.status.allOperational': 'Všechny systémy jsou v provozu',
    'screensB.status.someDegraded': '{services} omezeno',
    'screensB.status.needEmail': 'Zadejte e-mail pro odběr',
    'screensB.status.subscribed': 'Odběr stavových hlášení nastaven',
    'screensB.status.uptimeLine': '{uptime} · 90 d',
    'screensB.status.openIncident': 'Otevřený incident',
    'screensB.status.incidentTitle':
      'Přehrávání videoklipů je v některých domácnostech pomalé',
    'screensB.status.resolved': 'Vyřešeno',
    'screensB.status.subscribeTitle': 'Stavová hlášení e-mailem',
    'screensB.status.subscribeNote':
      'Jeden e-mail, když se něco rozbije, a jeden, když je to opravené.',
    'screensB.status.emailAria': 'E-mailová adresa pro stavová hlášení',
    'screensB.status.subscribe': 'Odebírat',
    'screensB.status.pastIncidents': 'Dřívější incidenty',
    'screensB.status.historyMeta': '{date} · {duration}',

    /* -------------------------------------------------------------- stores */
    'screensB.stores.h1': 'Najít prodejnu',
    'screensB.stores.lede':
      'Vlastní obchody Hearth i prodejci, kteří vedou celou řadu. Vratky bere každé místo a dvě vlajkové prodejny opravují na počkání.',
    'screensB.stores.searchLabel': 'Město nebo PSČ',
    'screensB.stores.searchPlaceholder': 'Bristol nebo BS1 4TR',
    'screensB.stores.search': 'Hledat',
    'screensB.stores.nearMe': 'V mém okolí',
    'screensB.stores.shown': 'Zobrazeno {count}',
    'screensB.stores.open': 'Otevřeno',
    'screensB.stores.closed': 'Zavřeno',
    'screensB.stores.directions': 'Navigovat',
    'screensB.stores.bookRepair': 'Objednat opravu zde',
    'screensB.stores.emptyBody':
      'Tomuto hledání nic neodpovídá. Vše, co prodáváme, posíláme zdarma do druhého dne a vratky z domova jsou zdarma.',
    'screensB.stores.showEvery': 'Zobrazit všechna místa',
    'screensB.stores.findInstaller': 'Najít raději technika',

    /* -------------------------------------------------------------- survey */
    'screensB.survey.eyebrow': '{minutes} MINUTY, {questions} OTÁZKY',
    'screensB.survey.h1': 'Jak jsme si vedli?',
    'screensB.survey.lede':
      'Míří to rovnou týmu podpory — žádný marketingový seznam, žádné dotazování, pokud si o ně neřeknete.',
    'screensB.survey.doneTitle': 'Děkujeme — upřímně',
    'screensB.survey.scoreOf': '{score}/{max}',
    'screensB.survey.scoreChip': 'hodnocení {score}',
    'screensB.survey.backToHelp': 'Zpět do centra nápovědy',
    'screensB.survey.fillAgain': 'Vyplnit znovu',
    'screensB.survey.needScore': 'Nejdřív vyberte hodnocení od 0 do 10',
    'screensB.survey.sent': 'Zpětná vazba odeslána — děkujeme',
    'screensB.survey.progressLabel': 'Postup dotazníku',
    'screensB.survey.answered': 'Zodpovězeno {answered} z {total}',
    'screensB.survey.q1': 'Jak pravděpodobně doporučíte Hearth příteli?',
    'screensB.survey.q1Note': '0 znamená nikdy, 10 už jsem mu to řekl.',
    'screensB.survey.npsGroup': 'Hodnocení doporučení',
    'screensB.survey.scaleAria': '{row}: {rating}',
    'screensB.survey.q2': 'Co máme opravit jako první?',
    'screensB.survey.q2Note': 'Vyberte, kolik chcete.',
    'screensB.survey.q3': 'Ještě něco?',
    'screensB.survey.optional': 'Nepovinné',
    'screensB.survey.q3Placeholder':
      'Dobré, špatné i puntičkářské — pomůže všechno.',
    'screensB.survey.emailOptIn': 'Můžete mi k tomu napsat',
    'screensB.survey.send': 'Odeslat zpětnou vazbu',

    /* -------------------------------------------------------------- thread */
    'screensB.thread.allTickets': 'Všechny požadavky',
    'screensB.thread.noTicketTitle': 'Není otevřen žádný požadavek',
    'screensB.thread.noTicketBody':
      'Vyberte konverzaci ze svých požadavků a přečtěte si ji tady.',
    'screensB.thread.simulated': 'Odpovědi v tomto demu jsou simulované.',
    'screensB.thread.typing': '{name} píše',
    'screensB.thread.replyPlaceholder': 'Napsat odpověď…',
    'screensB.thread.replyAria': 'Napsat odpověď',
    'screensB.thread.attachTitle': 'Připojit soubor',
    'screensB.thread.attach': 'Připojit',
    'screensB.thread.attachToast': 'Přílohy v tomto demu nejsou k dispozici',
    'screensB.thread.markSolved': 'Označit jako vyřešené',
    'screensB.thread.sendReply': 'Odeslat odpověď',

    /* ---------------------------------------------------------------- tour */
    'screensB.tour.progress': '{n} / {total}',
    'screensB.tour.stepAria': 'Krok {n} z {total}: {title}',
    'screensB.tour.skip': 'Přeskočit prohlídku',
    'screensB.tour.back': 'Zpět',
    'screensB.tour.finish': 'Dokončit',
    'screensB.tour.next': 'Další',
    'screensB.tour.finished': 'Prohlídka dokončena — vítejte',
    'screensB.tour.skipped':
      'Prohlídka přeskočena — najdete ji v patičce, kdybyste chtěli',

    /* --------------------------------------------------------------- trade */
    'screensB.trade.eyebrow': 'PRO TECHNIKY, ELEKTRIKÁŘE A SPRÁVCE NEMOVITOSTÍ',
    'screensB.trade.h1': 'Založit živnostenský účet',
    'screensB.trade.lede':
      'Velkoobchodní ceny, splatnost 30 dní a konkrétní kontakt, který zvedá telefon. Schválení trvá dva pracovní dny a vstup nic nestojí.',
    'screensB.trade.doneTitle': 'Žádost přijata',
    'screensB.trade.previewPortal': 'Prohlédnout partnerský portál',
    'screensB.trade.startAnother': 'Založit další žádost',
    'screensB.trade.pickTier': 'Vyberte úroveň',
    'screensB.trade.businessDetails': 'Údaje o firmě',
    'screensB.trade.tradingName': 'Obchodní název',
    'screensB.trade.businessType': 'Typ podnikání',
    'screensB.trade.chooseOne': 'Vyberte…',
    'screensB.trade.companyNumber': 'IČO',
    'screensB.trade.optional': 'Nepovinné',
    'screensB.trade.vatNumber': 'DIČ',
    'screensB.trade.vatHint':
      'Nejste plátce DPH? Nechte prázdné — účet nastavíme včetně daně.',
    'screensB.trade.whoWeDealWith': 'S kým budeme jednat',
    'screensB.trade.contactName': 'Jméno kontaktu',
    'screensB.trade.workEmail': 'Pracovní e-mail',
    'screensB.trade.phone': 'Telefon',
    'screensB.trade.installsAMonth': 'Instalací měsíčně',
    'screensB.trade.whatDoYouFit': 'Co montujete?',
    'screensB.trade.pickAny': 'Vyberte cokoli',
    'screensB.trade.anythingElse': 'Máme vědět ještě něco?',
    'screensB.trade.notePlaceholder':
      'Certifikace, oblasti, které pokrýváte, nebo očekávaný objem.',
    'screensB.trade.apply': 'Požádat o živnostenský účet',
    'screensB.trade.foot':
      'Už schváleno? V {link} najdete frontu zakázek, výplaty i školení. Velkoobchodní ceny se zobrazí automaticky po přihlášení.',
    'screensB.trade.footLink': 'partnerském portálu',

    /* ------------------------------------------------------------- tradein */
    'screensB.tradein.h1': 'Kolik má vaše staré zařízení Hearth?',
    'screensB.tradein.lede':
      'Vykupujeme jakékoli funkční zařízení Hearth proti dalšímu. Co jde, repasujeme, zbytek recyklujeme — kredit do obchodu dostanete tak či tak.',
    'screensB.tradein.baseValue': 'Základní hodnota, {product}',
    'screensB.tradein.conditionRow': 'Stav: {condition}',
    'screensB.tradein.ageRow': 'Stáří: {age}',
    'screensB.tradein.factor': '× {factor}',
    'screensB.tradein.packOrdered': 'Předplacený balík objednán',
    'screensB.tradein.recycleToast':
      'Pošleme vám e-mailem recyklační štítek zdarma',
    'screensB.tradein.doneTitle': 'Předplacený balík je na cestě',
    'screensB.tradein.doneBody':
      'Dorazí za dva až tři pracovní dny. Zařízení pošlete zpět ve stejné krabici — poštovné je hrazené a kredit připíšeme do týdne od doručení k nám.',
    'screensB.tradein.creditChip': 'kredit {amount}',
    'screensB.tradein.valueAnother': 'Ocenit další zařízení',
    'screensB.tradein.whichDevice': 'Které zařízení vykupujeme?',
    'screensB.tradein.whatCondition': 'V jakém je stavu?',
    'screensB.tradein.howOld': 'Jak je staré?',
    'screensB.tradein.yourQuote': 'Vaše nabídka',
    'screensB.tradein.creditFor': 'kredit do obchodu za vaše {product}',
    'screensB.tradein.quoteNote':
      'Nabídka platí 14 dní. Zařízení po doručení zkontrolujeme — pokud stav nesedí, nabídneme cenu znovu, než cokoli uděláme, a zdarma vám ho pošleme zpět, když nebudete chtít pokračovat.',
    'screensB.tradein.sendPack': 'Poslat předplacený balík',
    'screensB.tradein.justRecycle': 'Jen recyklovat',

    /* ------------------------------------------------------------ transfer */
    'screensB.transfer.h1': 'Převést záruku',
    'screensB.transfer.lede':
      'Prodáváte zařízení nebo ho necháváte při stěhování? Zbývající krytí jde s ním, zdarma. Nový majitel to jen potvrdí e-mailem.',
    'screensB.transfer.doneTitle': 'Převod zahájen',
    'screensB.transfer.registeredDevices': 'Vaše registrovaná zařízení',
    'screensB.transfer.transferAnother': 'Převést další',
    'screensB.transfer.whichDevice': 'Které zařízení předáváte?',
    'screensB.transfer.deviceNote': '{serial} · {left}',
    'screensB.transfer.emptyTitle': 'Není co převádět',
    'screensB.transfer.emptyBody':
      'Všechna zařízení v tomto účtu už byla převedena nebo odebrána. Zaregistrujte nejdřív zařízení a jeho krytí bude hned převoditelné.',
    'screensB.transfer.registerDevice': 'Registrovat zařízení',
    'screensB.transfer.newOwnerName': 'Jméno nového majitele',
    'screensB.transfer.theirEmail': 'Jeho e-mail',
    'screensB.transfer.whyTransfer': 'Proč ho převádíte?',
    'screensB.transfer.chooseReason': 'Vyberte důvod…',
    'screensB.transfer.warning':
      'Převod odebere zařízení z vaší domácnosti a nenávratně smaže jeho historii klipů. Pokud jste to ještě neudělali, uveďte ho nejdřív do továrního nastavení — potom už nic neobnovíme.',
    'screensB.transfer.start': 'Zahájit převod',
    'screensB.transfer.howItWorks': 'Jak to funguje',
    'screensB.transfer.how1':
      'Novému majiteli pošleme e-mailem odkaz — platí 14 dní.',
    'screensB.transfer.how2':
      'Potvrdí ho a přidá zařízení do svého vlastního účtu Hearth.',
    'screensB.transfer.how3':
      'Zbývající krytí přechází s původním datem nákupu. Nic se neplatí a rok navíc za registraci jde s ním.',

    /* ------------------------------------------------------------ warranty */
    'screensB.warranty.h1': 'Registrovat záruku',
    'screensB.warranty.lede':
      'Registrace zabere minutu a přidá třetí rok krytí zdarma. Dostanete také poznámky k firmwaru pro svá zařízení, a nic víc.',
    'screensB.warranty.needDevice': 'Vyberte zařízení, které registrujete',
    'screensB.warranty.needSerial': 'Zadejte celé sériové číslo',
    'screensB.warranty.needRetailer': 'Sdělte nám, kde jste to koupili',
    'screensB.warranty.purchasedToday': 'Dnes',
    'screensB.warranty.coverLeft': 'zbývají 3 roky',
    'screensB.warranty.registered': 'Záruka registrována',
    'screensB.warranty.doneTitle': '{name} registrováno',
    'screensB.warranty.doneBody':
      'Krytí platí do {date}. Certifikát jsme poslali na sam@example.com — uschovejte si ho s dokladem.',
    'screensB.warranty.registerAnother': 'Registrovat další zařízení',
    'screensB.warranty.makeClaim': 'Uplatnit záruku',
    'screensB.warranty.whichDevice': 'Které zařízení?',
    'screensB.warranty.serialNumber': 'Sériové číslo',
    'screensB.warranty.serialHelp':
      'Na zadní desce a v aplikaci v sekci O aplikaci.',
    'screensB.warranty.purchaseDate': 'Datum nákupu',
    'screensB.warranty.whereBought': 'Kde jste to koupili?',
    'screensB.warranty.selectRetailer': 'Vyberte prodejce…',
    'screensB.warranty.callout':
      'Koupili jste to u nás? Vaše objednávka je už krytá — registrace jen přidá rok navíc a doklad do vašeho účtu.',
    'screensB.warranty.submit': 'Registrovat záruku',
    'screensB.warranty.listTitle': 'Vaše registrovaná zařízení',
    'screensB.warranty.coverTo': 'Krytí do {date}',
    'screensB.warranty.claim': 'Uplatnit',
    'screensB.warranty.transferLabel': 'Převést tuto záruku',
    'screensB.warranty.remainingAria': 'Zbývající záruka pro {model}',
    'screensB.warranty.emptyTitle': 'Žádná registrovaná zařízení',
    'screensB.warranty.emptyBody':
      'K tomuto účtu zatím nic registrováno není. Registrace přidá třetí rok krytí zdarma a zabere asi minutu.',
    'screensB.warranty.registerDevice': 'Registrovat zařízení',

    /* ---------------------------------------------------------------- wish */
    'screensB.wish.h1': 'Seznam přání',
    'screensB.wish.shareList': 'Sdílet seznam',
    'screensB.wish.addAllInStock': 'Přidat vše skladem',
    'screensB.wish.priceDrop': 'Sleva',
    'screensB.wish.notifyMe': 'Upozornit mě',
    'screensB.wish.addToBasket': 'Do košíku',
    'screensB.wish.remove': 'Odebrat',
    'screensB.wish.emptyTitle': 'Váš seznam přání je prázdný',
    'screensB.wish.emptyBody':
      'Uložte si cokoli, o čem uvažujete — dáme vědět, když cena klesne nebo se zboží vrátí skladem, a nic nevyprší.',
    'screensB.wish.browseBundles': 'Procházet sady',
    'screensB.wish.restore': 'Vrátit demo položky',
    'screensB.wish.othersSaved': 'Ostatní si uložili také',
    'screensB.wish.saveIt': 'Uložit',
  },
  'da-DK': {
    /* ---------------------------------------------------------------- live */
    'screensB.live.h1': 'Live-visning og klip',
    'screensB.live.clipHistory': 'Klip-historik',
    'screensB.live.note':
      'Klip er end-to-end-krypterede. Deling laver et link, der udløber efter 7 dage, og vi kan ikke se, hvad der ligger bag det.',

    /* ------------------------------------------------------------- members */
    'screensB.members.h1': 'Medlemmer i husstanden',
    'screensB.members.lede':
      'Del hjemmet uden at dele din adgangskode. Gæster ser aldrig klip-historikken, og du kan fjerne enhver med det samme.',
    'screensB.members.roleOwner': 'Ejer',
    'screensB.members.roleAdult': 'Voksen',
    'screensB.members.roleGuest': 'Gæst',
    'screensB.members.roleLabel': 'Rolle',
    'screensB.members.needEmail': 'Indtast en e-mailadresse',
    'screensB.members.pendingMeta': '{email} · invitation afventer',
    'screensB.members.permFrontDoor': 'Kun hoveddøren',
    'screensB.members.permAllDevices': 'Alle enheder',
    'screensB.members.inviteByEmail': 'Inviter via e-mail',
    'screensB.members.sendInvite': 'Send invitation',
    'screensB.members.inviteSent': 'Invitation sendt',
    'screensB.members.inviteSentTo': 'Invitation sendt til {email}',
    'screensB.members.inviteSentBody':
      'Den udløber om 14 dage. Indtil de accepterer, står de nedenfor som afventende.',
    'screensB.members.nowAdult': '{name} er nu voksen',
    'screensB.members.nowGuest': '{name} er nu gæst',
    'screensB.members.removed': '{name} fjernet',
    'screensB.members.thatsYou': 'Det er dig',
    'screensB.members.roleFor': 'Rolle for {name}',
    'screensB.members.remove': 'Fjern',
    'screensB.members.emptyTitle': 'Kun dig i denne husstand',
    'screensB.members.emptyBody':
      'Ingen andre har adgang. Inviter nogen ovenfor, så kan de bruge live-visning og oplåsning uden nogensinde at se din adgangskode.',
    'screensB.members.note':
      'Kun ejeren kan tilføje eller fjerne enheder, se fakturering eller lukke kontoen. Voksne kan alt det øvrige; gæster får live-visning og oplåsning i de tidsrum, du bestemmer.',

    /* ----------------------------------------------------------- myTickets */
    'screensB.myTickets.title': 'Mine sager',
    'screensB.myTickets.lede': 'Slå dine åbne og tidligere samtaler med os op.',
    'screensB.myTickets.emailLabel': 'E-mailadresse',
    'screensB.myTickets.show': 'Vis mine sager',
    'screensB.myTickets.showingFor': 'Sager for {email}',
    'screensB.myTickets.help':
      'Vi viser sager på denne adresse — demodata.',

    /* ----------------------------------------------------------- newTicket */
    'screensB.newTicket.title': 'Opret en sag',
    'screensB.newTicket.lede':
      'Fortæl os, hvad der sker, så vender vi tilbage. Jo flere detaljer, jo hurtigere kan vi hjælpe.',
    'screensB.newTicket.product': 'Hvilket produkt?',
    'screensB.newTicket.topic': 'Emne',
    'screensB.newTicket.topicPlaceholder': 'Vælg et emne…',
    'screensB.newTicket.subject': 'Overskrift',
    'screensB.newTicket.subjectPlaceholder':
      'Kort resumé, f.eks. "Dørklokken er offline hver nat"',
    'screensB.newTicket.description': 'Beskrivelse',
    'screensB.newTicket.counter': '{used}/{max}',
    'screensB.newTicket.descPlaceholder':
      'Hvad sker der? Skriv, hvad du allerede har prøvet, eventuelle fejlbeskeder, og hvornår det begyndte.',
    'screensB.newTicket.attachments': 'Vedhæftninger',
    'screensB.newTicket.addFile': 'Tilføj fil',
    'screensB.newTicket.simulated': 'Svar i denne demo er simulerede.',
    'screensB.newTicket.submit': 'Send sagen',

    /* ------------------------------------------------------------ notFound */
    'screensB.notFound.code': 'FEJL 404',
    'screensB.notFound.title': 'Denne side drejede forkert.',
    'screensB.notFound.body':
      'Siden, du leder efter, er ikke her — den kan være flyttet, eller den er endnu ikke bygget til denne demo.',
    'screensB.notFound.home': 'Tilbage til hjælpecenteret',
    'screensB.notFound.ticket': 'Opret en sag',

    /* -------------------------------------------------------------- notifs */
    'screensB.notifs.h1': 'Notifikationer',
    'screensB.notifs.introUnread':
      '{count} ulæst · vi gemmer 90 dages historik, og du bestemmer, hvad der kommer ind.|{count} ulæste · vi gemmer 90 dages historik, og du bestemmer, hvad der kommer ind.',
    'screensB.notifs.introClear': 'Alt er læst — vi gemmer 90 dages historik.',
    'screensB.notifs.markAllRead': 'Marker alt som læst',
    'screensB.notifs.settingsLabel': 'Notifikationsindstillinger',
    'screensB.notifs.settingsLive':
      'Alarmindstillingerne ligger her sammen med tilgængelighed',
    'screensB.notifs.allMarkedRead': 'Alt markeret som læst',
    'screensB.notifs.inboxCleared': 'Indbakken er tømt',
    'screensB.notifs.inboxClearedBody':
      'Intet ulæst tilbage. Nye alarmer dukker op øverst, når de kommer.',
    'screensB.notifs.alertSettings': 'Alarmindstillinger',
    'screensB.notifs.unread': 'Ulæst',
    'screensB.notifs.emptyTitle': 'Intet i dette filter',
    'screensB.notifs.emptyBody':
      'Prøv en anden kategori — vi gemmer 90 dages historik.',

    /* -------------------------------------------------------------- orders */
    'screensB.orders.h1': 'Ordrestatus',
    'screensB.orders.lede':
      'Indtast dit ordrenummer og den e-mail, du bestilte med. Sporingsopdateringer lander her inden for en time efter en scanning.',
    'screensB.orders.statusTransit': 'Undervejs',
    'screensB.orders.statusDelivered': 'Leveret',
    'screensB.orders.statusPacking': 'Under klargøring',
    'screensB.orders.headlineDelivered': 'Leveret {day}',
    'screensB.orders.headlinePacking': 'Pakkes nu, sendes i morgen',
    'screensB.orders.headlineTransit': 'Ankommer tir. 28. jul.',
    'screensB.orders.errNoNumber':
      'Indtast ordrenummeret fra din bekræftelsesmail.',
    'screensB.orders.errNotFound':
      'Vi kunne ikke finde en ordre, der matcher {id}. Tjek nummeret i din bekræftelsesmail — det begynder med {prefix}.',
    'screensB.orders.errNoEmail':
      'Indtast den e-mailadresse, ordren blev lagt med, så vi kan bekræfte, at den er din.',
    'screensB.orders.errEmailMismatch':
      'Ordren findes, men e-mailen passer ikke med vores oplysninger. Prøv adressen fra din bekræftelsesmail.',
    'screensB.orders.found': 'Ordre {id} fundet',
    'screensB.orders.trackingCopied': 'Sporingsnummer kopieret',
    'screensB.orders.numberLabel': 'Ordrenummer',
    'screensB.orders.emailLabel': 'E-mail på ordren',
    'screensB.orders.find': 'Find min ordre',
    'screensB.orders.demoOrders': 'Demoordrer:',
    'screensB.orders.placedLine': 'Bestilt {placed} · {items}',
    'screensB.orders.carrier': 'Fragtfirma',
    'screensB.orders.copyTracking': 'Kopier sporingsnummer',
    'screensB.orders.deliveringTo': 'Leveres til',
    'screensB.orders.inThisOrder': 'I denne ordre',
    'screensB.orders.qty': 'Antal {n}',
    'screensB.orders.total': 'I alt',
    'screensB.orders.somethingWrong': 'Noget er galt med denne ordre',
    'screensB.orders.askDelivery': 'Spørg om levering',

    /* ------------------------------------------------------------ overview */
    'screensB.overview.eyebrow': 'OVERBLIK',
    'screensB.overview.h1': 'Alle skærme i portalen',
    'screensB.overview.lede':
      '{count} skærme, alle interaktive. Hop direkte til en af dem — flowene linker til hinanden, som de ville i produktion.',
    'screensB.overview.lightTheme': 'Lyst tema',
    'screensB.overview.darkTheme': 'Mørkt tema',
    'screensB.overview.openPortal': 'Åbn portalen',

    /* ------------------------------------------------------------- partner */
    'screensB.partner.approved': 'Godkendt partner',
    'screensB.partner.tradeAccount': 'Erhvervskonto',
    'screensB.partner.supportLine': 'Partnerlinje',
    'screensB.partner.kpiJobs': 'Opgaver denne måned',
    'screensB.partner.kpiRating': 'Bedømmelse',
    'screensB.partner.kpiPayout': 'Næste udbetaling',
    'screensB.partner.kpiResponse': 'Svartid',
    'screensB.partner.jobRequests': 'Opgaveforespørgsler',
    'screensB.partner.queueLine': '{waiting} venter · matchet til dine kompetencer',
    'screensB.partner.queueClear': 'Køen er tom',
    'screensB.partner.queueClearBody':
      'Nye forespørgsler i dit område lander her. Vi matcher på afstand, niveau og kompetencerne i din profil.',
    'screensB.partner.payWarranty': 'Betalt af Hearth',
    'screensB.partner.payCustomer': 'Betalt af kunden',
    'screensB.partner.acceptJob': 'Tag opgaven',
    'screensB.partner.pass': 'Spring over',
    'screensB.partner.messageCustomer': 'Skriv til kunden',
    'screensB.partner.messagingToast':
      'Partnerbeskeder findes ikke i denne demo',
    'screensB.partner.accepted': 'Opgave taget — kunden er underrettet',
    'screensB.partner.passed': 'Sprunget over — tilbage i puljen',
    'screensB.partner.certification': 'Certificering',
    'screensB.partner.certBody':
      'To moduler tilbage, før dit Gold-niveau fornys i oktober.',
    'screensB.partner.continueTraining': 'Fortsæt uddannelsen',
    'screensB.partner.trainingToast': 'Uddannelsesmodulerne ligger i partnerappen',
    'screensB.partner.resources': 'Partnermateriale',
    'screensB.partner.resourcesToast': 'Partnermateriale findes ikke i denne demo',
    'screensB.partner.nextPayout': 'Næste udbetaling',

    /* --------------------------------------------------------------- parts */
    'screensB.parts.h1': 'Reservedele',
    'screensB.parts.lede':
      'Alle dele, vi nogensinde har sendt, kan fås i mindst syv år efter et produkts lancering. Inden for garantien? Køb ingenting — send en anmeldelse, så sender vi den gratis.',
    'screensB.parts.stockIn': 'På lager',
    'screensB.parts.stockLow': 'Få på lager',
    'screensB.parts.stockOut': 'Tilbage om 2 uger',
    'screensB.parts.emptyTitle': 'Ingen dele til den enhed',
    'screensB.parts.emptyBody':
      'Vi har dele i mindst syv år efter lanceringen, så mangler der noget her, er det værd at spørge os direkte.',
    'screensB.parts.openTicket': 'Opret en sag',
    'screensB.parts.fitsLine': '{sku} · passer til {fits}',
    'screensB.parts.removeOne': 'Fjern én {name}',
    'screensB.parts.addAnother': 'Tilføj endnu en {name}',
    'screensB.parts.notifyToast': 'Vi skriver, når den er tilbage',
    'screensB.parts.notify': 'Giv mig besked',
    'screensB.parts.add': 'Tilføj',
    'screensB.parts.basketEmptied': 'Kurven er tømt',
    'screensB.parts.checkoutToast': 'Betaling findes ikke i denne demo',
    'screensB.parts.freeDelivery': 'Fri fragt inkluderet',
    'screensB.parts.moreForFree': '{amount} mere til fri fragt',
    'screensB.parts.inYourBasket': '{parts} i kurven',
    'screensB.parts.empty': 'Tøm',
    'screensB.parts.checkout': 'Til betaling',
    'screensB.parts.callout':
      'De fleste dele kræver en skruetrækker og ti minutter. Hver deleside i appen linker til en trin-for-trin-vejledning — aldrig lodning.',

    /* --------------------------------------------------------------- plans */
    'screensB.plans.title': 'Hearth Care-abonnementer',
    'screensB.plans.lede':
      'Klip-historik, prioriteret support og gratis reparationer uden for garantien. Hvert abonnement dækker lige så mange enheder, du har — opsigeligt når som helst, og du beholder de optagelser, du har hentet.',
    'screensB.plans.cycleLabel': 'Betalingsperiode',
    'screensB.plans.cycleMonthly': 'Månedligt',
    'screensB.plans.free': 'Gratis',
    'screensB.plans.perAlways': 'altid',
    'screensB.plans.perYear': 'om året',
    'screensB.plans.perMonth': 'om måneden',
    'screensB.plans.noCard': 'Intet kort nødvendigt',
    'screensB.plans.worksOut': 'svarer til {amount} om måneden',
    'screensB.plans.billedMonthly': 'faktureres månedligt, opsigeligt når som helst',
    'screensB.plans.freeTierBilling':
      'Du er på gratisniveauet — der er intet at fakturere.',
    'screensB.plans.pricePerYear': '{amount} om året',
    'screensB.plans.pricePerMonth': '{amount} om måneden',
    'screensB.plans.billingLine':
      '{plan}, {price} {suffix} · næste betaling {date}',
    'screensB.plans.switched': 'Skiftet til {plan}',
    'screensB.plans.alreadyFree': 'Du er allerede på gratisniveauet',
    'screensB.plans.cancelled': 'Abonnement opsagt — du er på Hearth Free',
    'screensB.plans.currentPlan': 'Nuværende abonnement',
    'screensB.plans.mostChosen': 'Mest valgte',
    'screensB.plans.yourCurrentPlan': 'Dit nuværende abonnement',
    'screensB.plans.downgradeTo': 'Skift ned til {plan}',
    'screensB.plans.switchTo': 'Skift til {plan}',
    'screensB.plans.billing': 'Fakturering',
    'screensB.plans.invoices': 'Fakturaer',
    'screensB.plans.cancelPlan': 'Opsig abonnement',
    'screensB.plans.neverHead': 'Hvad der aldrig kræver abonnement',
    'screensB.plans.neverBody':
      'Live-visning, alarmer, tidsplaner og lokal optagelse virker for altid på gratisniveauet. Abonnementer tilføjer kun sky-historik og hurtigere support.',

    /* -------------------------------------------------------------- recent */
    'screensB.recent.h1': 'Senest set',
    'screensB.recent.articleFallback': 'Artikel',
    'screensB.recent.helpFallback': 'Hjælp',
    'screensB.recent.metaLine': '{source} · {time}',
    'screensB.recent.saveForLater': 'Gem til senere',
    'screensB.recent.saveToWishlist': 'Gem på ønskelisten',
    'screensB.recent.clearHistory': 'Ryd historik',
    'screensB.recent.removeFromHistory': 'Fjern fra historik',
    'screensB.recent.browseHelp': 'Gennemse hjælp',
    'screensB.recent.restore': 'Hent demohistorikken tilbage',
    'screensB.recent.note':
      'Historikken ligger kun på denne enhed og ryddes automatisk efter 30 dage. Vi bruger den ikke til reklamer, og slår du personlige tips fra under {link}, bruges den heller ikke til forslag.',
    'screensB.recent.securityLink': 'Sikkerhed og privatliv',

    /* ------------------------------------------------------------- recycle */
    'screensB.recycle.h1': 'Aflevering til genbrug',
    'screensB.recycle.lede':
      'Enhver Hearth-enhed, uanset alder, virkende eller ej — genbrug er gratis, og den behøver ikke være købt hos os. Virker den stadig, så tjek først bytteværdien: du kan måske få tilgodehavende for den.',
    'screensB.recycle.postcodePost': 'Postnummer til labelen',
    'screensB.recycle.postcodeDrop':
      'Dit postnummer, så vi kan sortere listen efter afstand',
    'screensB.recycle.postcodeCollect': 'Postnummer til afhentning',
    'screensB.recycle.submitPost': 'Send mig en gratis label',
    'screensB.recycle.submitDrop': 'Reserver en aflevering',
    'screensB.recycle.submitCollect': 'Book en afhentning',
    'screensB.recycle.checkTradeIn': 'Tjek hellere bytteværdien',
    'screensB.recycle.somethingElse': 'Genbrug noget andet',
    'screensB.recycle.methodLabel': 'Hvordan vil du sende den tilbage?',
    'screensB.recycle.itemsLabel': 'Hvad genbruger du?',
    'screensB.recycle.nearest': 'Nærmeste afleveringssteder',
    'screensB.recycle.directions': 'Rutevejledning',
    'screensB.recycle.allLocations': 'Se alle adresser',
    'screensB.recycle.weTake': 'Vi tager',
    'screensB.recycle.weCantTake': 'Vi kan ikke tage',
    'screensB.recycle.warning':
      'Nulstil alt med kamera eller mikrofon til fabriksindstillinger, før du afleverer det. Vi sletter hver enhed, vi modtager, men nulstiller du først, forlader dine data slet ikke huset.',

    /* --------------------------------------------------------------- refer */
    'screensB.refer.eyebrow': 'ANBEFAL EN VEN',
    'screensB.refer.title': 'Giv {amount}, få {amount}.',
    'screensB.refer.lede':
      'Giv en ven {amount} på deres første Hearth-enhed. Når deres ordre sendes, krediterer vi din konto {amount} — uden loft og uden udløb.',
    'screensB.refer.earned': '{amount} tjent',
    'screensB.refer.progress':
      '{joined} af {goal} venner er med — {left} mere, så lægger vi {bonus} i bonus oveni.',
    'screensB.refer.codeCopied': 'Anbefalingskode kopieret',
    'screensB.refer.linkCopied': 'Invitationslink kopieret',
    'screensB.refer.needEmail': 'Indtast din vens e-mail',
    'screensB.refer.invitedJustNow': 'Inviteret lige nu',
    'screensB.refer.rewardPending': 'Afventer',
    'screensB.refer.inviteSent': 'Invitation sendt til {email}',
    'screensB.refer.copyCode': 'Kopier kode',
    'screensB.refer.leaderboard': 'Rangliste',
    'screensB.refer.copyLink': 'Kopier link',
    'screensB.refer.yourProgress': 'Dit forløb',
    'screensB.refer.inviteByEmail': 'Inviter via e-mail',
    'screensB.refer.friendEmailAria': 'Din vens e-mailadresse',
    'screensB.refer.send': 'Send',
    'screensB.refer.inviteNote':
      'Vi sender én e-mail og én påmindelse en uge senere. Aldrig andet.',
    'screensB.refer.yourReferrals': 'Dine anbefalinger',
    'screensB.refer.pillJoined': 'Tilmeldt',
    'screensB.refer.pillInvited': 'Inviteret',
    'screensB.refer.legal':
      'Tilgodehavendet gælder kun nye kunder og udbetales, når deres ordre sendes. Anbefalingstilgodehavende kan ikke veksles til kontanter og gælder ikke reparationer eller tilbehør under {amount}.',

    /* -------------------------------------------------------------- repair */
    'screensB.repair.h1': 'Book en reparation',
    'screensB.repair.lede':
      'Reparationer inden for garantien er gratis, afhentning inklusive. Uden for garantien giver vi et tilbud, før vi rører noget.',
    'screensB.repair.whenLine': '{dow} {day}, {slot}',
    'screensB.repair.slotFull': 'Den tid er optaget — prøv en anden',
    'screensB.repair.needDevice': 'Vælg, hvilken enhed der skal repareres',
    'screensB.repair.needIssue': 'Vælg, hvad vi skal se på',
    'screensB.repair.needSlot': 'Vælg en dag og et tidsrum',
    'screensB.repair.engineerRole': 'Hardwaretekniker',
    'screensB.repair.booked': 'Reparation booket — {ref}',
    'screensB.repair.doneTitle': 'Du er booket',
    'screensB.repair.doneNote':
      'Sørg for, at enheden er tilgængelig, og hav din wi-fi-adgangskode klar. Du kan flytte tiden gratis indtil 24 timer før.',
    'screensB.repair.seeAppointments': 'Se mine aftaler',
    'screensB.repair.bookAnother': 'Book en mere',
    'screensB.repair.whichDevice': 'Hvilken enhed?',
    'screensB.repair.whatIssue': 'Hvad skal vi se på?',
    'screensB.repair.chooseIssue': 'Vælg et problem…',
    'screensB.repair.howLabel': 'Hvordan skal vi gøre det?',
    'screensB.repair.pickDay': 'Vælg en dag',
    'screensB.repair.pickSlot': 'Vælg et tidsrum',
    'screensB.repair.slotTaken': 'Optaget',
    'screensB.repair.confirm': 'Bekræft booking',

    /* ------------------------------------------------------------- returns */
    'screensB.returns.h1': 'Start en returnering',
    'screensB.returns.lede':
      '30 dage fra levering, uden spørgsmål. Pengene er tilbage på dit kort inden for fem hverdage, efter pakken når frem til os.',
    'screensB.returns.stepItems': 'Varer',
    'screensB.returns.stepReason': 'Årsag',
    'screensB.returns.stepLabel': 'Label',
    'screensB.returns.needItem': 'Vælg mindst én vare at returnere',
    'screensB.returns.needReason': 'Vælg en årsag, så vi kan behandle den',
    'screensB.returns.created': 'Returnering oprettet',
    'screensB.returns.labelEmailed': 'Label sendt til sam@example.com',
    'screensB.returns.continue': 'Fortsæt',
    'screensB.returns.getLabel': 'Hent min label',
    'screensB.returns.emailLabel': 'Send mig labelen',
    'screensB.returns.whichOrder': 'Hvilken ordre?',
    'screensB.returns.orderLineDelivered': 'Leveret {placed} · {items} · {total}',
    'screensB.returns.orderLineArriving': 'Ankommer {placed} · {items} · {total}',
    'screensB.returns.whatSending': 'Hvad sender du tilbage?',
    'screensB.returns.whyReturning': 'Hvorfor returnerer du den?',
    'screensB.returns.chooseReason': 'Vælg en årsag…',
    'screensB.returns.anythingKnow': 'Er der andet, vi bør vide?',
    'screensB.returns.optional': 'Valgfrit',
    'screensB.returns.notePlaceholder':
      'Det hjælper os med at rette op — men du behøver ikke forklare noget.',
    'screensB.returns.howSend': 'Hvordan vil du sende den?',
    'screensB.returns.doneTitle': 'Din returnering er klar',
    'screensB.returns.doneBody':
      'Vi har sendt labelen til sam@example.com. {detail}',
    'screensB.returns.reference': 'Returreference',
    'screensB.returns.qrHint':
      'Vis denne kode på afleveringsstedet, eller sæt den printede label på pakken.',
    'screensB.returns.whatNext': 'Sådan går det videre',
    'screensB.returns.next1':
      'Pak varerne ned med de kabler og beslag, der fulgte med i kassen.',
    'screensB.returns.next2':
      'Aflever den inden for 14 dage — derefter udløber labelen, og du skal bruge en ny.',
    'screensB.returns.next3':
      'Vi refunderer inden for fem hverdage, efter pakken er ankommet, og skriver, når det er sket.',
    'screensB.returns.back': 'Tilbage',

    /* --------------------------------------------------------------- saved */
    'screensB.saved.h1': 'Gemte artikler',
    'screensB.saved.introHas':
      'Gemt til senere på denne konto — {articles}. De synkroniseres også til Hearth-appen.',
    'screensB.saved.introEmpty':
      'Intet gemt endnu. Alt, du bogmærker, dukker op her og i appen.',
    'screensB.saved.remove': 'Fjern',
    'screensB.saved.emptyTitle': 'Intet gemt endnu',
    'screensB.saved.emptyBody':
      'Tryk på "Gem til senere" i en artikel, så venter den her — praktisk, inden du kravler op ad stigen.',
    'screensB.saved.browse': 'Gennemse artikler',
    'screensB.saved.suggested': 'Forslag herefter',
    'screensB.saved.save': 'Gem',

    /* ------------------------------------------------------------ security */
    'screensB.security.h1': 'Sikkerhed og privatliv',
    'screensB.security.lede':
      'Klip er end-to-end-krypterede — hverken vi eller nogen, vi samarbejder med, kan se dem. Alt herunder er dit at ændre eller tage med.',
    'screensB.security.password': 'Adgangskode',
    'screensB.security.passwordToast':
      'Ændring af adgangskode kræver bekræftelse på e-mail',
    'screensB.security.change': 'Skift',
    'screensB.security.recommended': 'Anbefalet',
    'screensB.security.toggledOn': '{label} slået til',
    'screensB.security.toggledOff': '{label} slået fra',
    'screensB.security.keepClipsFor': 'Gem klip i',
    'screensB.security.keepClipsNote':
      'Ældre klip slettes automatisk. Det, du har hentet, er stadig dit.',
    'screensB.security.whereSignedIn': 'Hvor du er logget ind',
    'screensB.security.signOutEverywhere': 'Log ud alle andre steder',
    'screensB.security.signedOutEverywhere': 'Logget ud alle andre steder',
    'screensB.security.thisDevice': 'Denne enhed',
    'screensB.security.sessionMeta': '{where} · {when}',
    'screensB.security.signOut': 'Log ud',
    'screensB.security.signedOutOf': 'Logget ud af {device}',
    'screensB.security.emptyTitle': 'Ingen andre enheder er logget ind',
    'screensB.security.emptyBody':
      'Dette er den eneste session på din konto. Alt andet, der logger ind, dukker op her med sin placering.',
    'screensB.security.takeYourData': 'Tag dine data med',
    'screensB.security.takeYourDataBody':
      'En zip med din konto, dine enheder, tidsplaner og klip-indeks — som regel klar på cirka ti minutter.',
    'screensB.security.requestExport': 'Anmod om eksport',
    'screensB.security.exportToast': 'Eksport anmodet — vi sender et link',
    'screensB.security.deleteAccount': 'Slet din konto',
    'screensB.security.deleteAccountBody':
      'Fjerner din konto, dine klip og tidsplaner for altid efter 30 dage. Dine enheder virker fortsat lokalt.',
    'screensB.security.startDeletion': 'Start sletning',

    /* --------------------------------------------------------------- share */
    'screensB.share.h1': 'Delte klip',
    'screensB.share.lede':
      'Del et klip med naboer, en gruppechat eller politiet uden at give din konto fra dig. Hvert link udløber, og du kan trække det tilbage når som helst.',
    'screensB.share.shareClip': 'Del et klip',
    'screensB.share.newLink': 'Nyt delt link',
    'screensB.share.whichClip': 'Hvilket klip?',
    'screensB.share.whoCanWatch': 'Hvem må se med',
    'screensB.share.linkExpires': 'Linket udløber',
    'screensB.share.createLink': 'Opret link',
    'screensB.share.cancel': 'Annuller',
    'screensB.share.linkMeta': '{audience} · {expires}',
    'screensB.share.views': 'visninger',
    'screensB.share.copyLink': 'Kopier link',
    'screensB.share.revoke': 'Tilbagekald',
    'screensB.share.emptyTitle': 'Intet delt lige nu',
    'screensB.share.emptyBody':
      'Når du deler et klip, dukker det op her med sit antal visninger, så du altid ved, hvad der er ude — og kan trække det tilbage.',
    'screensB.share.note':
      'Delte klip dekrypteres i seerens browser, aldrig på vores servere. Tilbagekald dræber linket med det samme, men den, der allerede har hentet en kopi, beholder den — præcis som med enhver video, du sender.',

    /* -------------------------------------------------------------- status */
    'screensB.status.h1': 'Driftsstatus',
    'screensB.status.lede':
      'Live tilstand for Hearth-appen, skyen og websitet. Dine enheder virker fortsat lokalt, selv når vores sky ikke gør.',
    'screensB.status.healthOk': 'Kører',
    'screensB.status.healthDegraded': 'Forringet',
    'screensB.status.healthDown': 'Nedbrud',
    'screensB.status.allOperational': 'Alle systemer kører',
    'screensB.status.someDegraded': '{services} forringet',
    'screensB.status.needEmail': 'Indtast en e-mail for at abonnere',
    'screensB.status.subscribed': 'Abonnerer på driftsopdateringer',
    'screensB.status.uptimeLine': '{uptime} · 90 d',
    'screensB.status.openIncident': 'Åben hændelse',
    'screensB.status.incidentTitle':
      'Afspilning af videoklip er langsom i nogle hjem',
    'screensB.status.resolved': 'Løst',
    'screensB.status.subscribeTitle': 'Få driftsopdateringer på e-mail',
    'screensB.status.subscribeNote':
      'Én e-mail når noget går ned, én når det er løst.',
    'screensB.status.emailAria': 'E-mailadresse til driftsopdateringer',
    'screensB.status.subscribe': 'Abonner',
    'screensB.status.pastIncidents': 'Tidligere hændelser',
    'screensB.status.historyMeta': '{date} · {duration}',

    /* -------------------------------------------------------------- stores */
    'screensB.stores.h1': 'Find en butik',
    'screensB.stores.lede':
      'Hearths egne butikker plus forhandlere, der fører hele sortimentet. Alle adresser tager imod returneringer, og de to flagskibsbutikker reparerer uden aftale.',
    'screensB.stores.searchLabel': 'By eller postnummer',
    'screensB.stores.searchPlaceholder': 'Bristol eller BS1 4TR',
    'screensB.stores.search': 'Søg',
    'screensB.stores.nearMe': 'Nær mig',
    'screensB.stores.shown': '{count} vist',
    'screensB.stores.open': 'Åbent',
    'screensB.stores.closed': 'Lukket',
    'screensB.stores.directions': 'Rutevejledning',
    'screensB.stores.bookRepair': 'Book en reparation her',
    'screensB.stores.emptyBody':
      'Intet matchede den søgning. Alt, vi sælger, sendes gratis til næste dag, og returnering hjemmefra er gratis.',
    'screensB.stores.showEvery': 'Vis alle adresser',
    'screensB.stores.findInstaller': 'Find en installatør i stedet',

    /* -------------------------------------------------------------- survey */
    'screensB.survey.eyebrow': '{minutes} MINUTTER, {questions} SPØRGSMÅL',
    'screensB.survey.h1': 'Hvordan gik det?',
    'screensB.survey.lede':
      'Det går direkte til supportteamet — ingen marketingliste og ingen opfølgning, medmindre du beder om det.',
    'screensB.survey.doneTitle': 'Tak — helt oprigtigt',
    'screensB.survey.scoreOf': '{score}/{max}',
    'screensB.survey.scoreChip': 'score {score}',
    'screensB.survey.backToHelp': 'Tilbage til hjælpecenteret',
    'screensB.survey.fillAgain': 'Udfyld den igen',
    'screensB.survey.needScore': 'Vælg først en score fra 0 til 10',
    'screensB.survey.sent': 'Feedback sendt — tak',
    'screensB.survey.progressLabel': 'Fremgang i undersøgelsen',
    'screensB.survey.answered': '{answered} af {total} besvaret',
    'screensB.survey.q1': 'Hvor sandsynligt er det, at du anbefaler Hearth til en ven?',
    'screensB.survey.q1Note': '0 er aldrig, 10 er allerede fortalt.',
    'screensB.survey.npsGroup': 'Anbefalingsscore',
    'screensB.survey.scaleAria': '{row}: {rating}',
    'screensB.survey.q2': 'Hvad skal vi rette først?',
    'screensB.survey.q2Note': 'Vælg lige så mange, du vil.',
    'screensB.survey.q3': 'Andet?',
    'screensB.survey.optional': 'Valgfrit',
    'screensB.survey.q3Placeholder':
      'Det gode, det dårlige, det pedantiske — alt hjælper.',
    'screensB.survey.emailOptIn': 'I må gerne skrive til mig om det',
    'screensB.survey.send': 'Send feedback',

    /* -------------------------------------------------------------- thread */
    'screensB.thread.allTickets': 'Alle sager',
    'screensB.thread.noTicketTitle': 'Ingen sag er åben',
    'screensB.thread.noTicketBody':
      'Vælg en samtale blandt dine sager for at læse den her.',
    'screensB.thread.simulated': 'Svar i denne demo er simulerede.',
    'screensB.thread.typing': '{name} skriver',
    'screensB.thread.replyPlaceholder': 'Skriv et svar…',
    'screensB.thread.replyAria': 'Skriv et svar',
    'screensB.thread.attachTitle': 'Vedhæft en fil',
    'screensB.thread.attach': 'Vedhæft',
    'screensB.thread.attachToast': 'Vedhæftninger findes ikke i denne demo',
    'screensB.thread.markSolved': 'Marker som løst',
    'screensB.thread.sendReply': 'Send svar',

    /* ---------------------------------------------------------------- tour */
    'screensB.tour.progress': '{n} / {total}',
    'screensB.tour.stepAria': 'Trin {n} af {total}: {title}',
    'screensB.tour.skip': 'Spring turen over',
    'screensB.tour.back': 'Tilbage',
    'screensB.tour.finish': 'Færdig',
    'screensB.tour.next': 'Næste',
    'screensB.tour.finished': 'Turen er slut — velkommen om bord',
    'screensB.tour.skipped':
      'Turen er sprunget over — den ligger i sidefoden, hvis du vil have den',

    /* --------------------------------------------------------------- trade */
    'screensB.trade.eyebrow': 'FOR INSTALLATØRER, ELEKTRIKERE OG UDLEJNINGSBUREAUER',
    'screensB.trade.h1': 'Opret en erhvervskonto',
    'screensB.trade.lede':
      'Erhvervspriser, 30 dages kredit og en fast kontaktperson, der tager telefonen. Godkendelsen tager to hverdage, og det koster intet at blive oprettet.',
    'screensB.trade.doneTitle': 'Ansøgning modtaget',
    'screensB.trade.previewPortal': 'Se partnerportalen',
    'screensB.trade.startAnother': 'Start en ny ansøgning',
    'screensB.trade.pickTier': 'Vælg et niveau',
    'screensB.trade.businessDetails': 'Oplysninger om virksomheden',
    'screensB.trade.tradingName': 'Firmanavn',
    'screensB.trade.businessType': 'Virksomhedstype',
    'screensB.trade.chooseOne': 'Vælg…',
    'screensB.trade.companyNumber': 'CVR-nummer',
    'screensB.trade.optional': 'Valgfrit',
    'screensB.trade.vatNumber': 'Momsnummer',
    'screensB.trade.vatHint':
      'Ikke momsregistreret? Lad feltet stå tomt — så opretter vi kontoen inklusive moms.',
    'screensB.trade.whoWeDealWith': 'Hvem vi taler med',
    'screensB.trade.contactName': 'Kontaktperson',
    'screensB.trade.workEmail': 'Arbejds-e-mail',
    'screensB.trade.phone': 'Telefon',
    'screensB.trade.installsAMonth': 'Installationer om måneden',
    'screensB.trade.whatDoYouFit': 'Hvad monterer du?',
    'screensB.trade.pickAny': 'Vælg frit',
    'screensB.trade.anythingElse': 'Er der andet, vi bør vide?',
    'screensB.trade.notePlaceholder':
      'Certifikater, de områder du dækker, eller det volumen du forventer.',
    'screensB.trade.apply': 'Ansøg om erhvervskonto',
    'screensB.trade.foot':
      'Allerede godkendt? {link} har din opgavekø, dine udbetalinger og din uddannelse. Erhvervspriser vises automatisk, når du er logget ind.',
    'screensB.trade.footLink': 'Partnerportalen',

    /* ------------------------------------------------------------- tradein */
    'screensB.tradein.h1': 'Hvad er din gamle Hearth værd?',
    'screensB.tradein.lede':
      'Byt enhver fungerende Hearth-enhed mod den næste. Vi renoverer, hvad vi kan, og genbruger resten — du får tilgodehavende i butikken uanset hvad.',
    'screensB.tradein.baseValue': 'Grundværdi, {product}',
    'screensB.tradein.conditionRow': 'Stand: {condition}',
    'screensB.tradein.ageRow': 'Alder: {age}',
    'screensB.tradein.factor': '× {factor}',
    'screensB.tradein.packOrdered': 'Frankeret pakke bestilt',
    'screensB.tradein.recycleToast': 'Vi sender dig en gratis genbrugslabel',
    'screensB.tradein.doneTitle': 'Frankeret pakke er på vej',
    'screensB.tradein.doneBody':
      'Den kommer om to til tre hverdage. Send enheden tilbage i samme kasse — portoen er betalt, og tilgodehavendet lander inden for en uge, efter den når frem til os.',
    'screensB.tradein.creditChip': '{amount} i tilgodehavende',
    'screensB.tradein.valueAnother': 'Vurder en anden enhed',
    'screensB.tradein.whichDevice': 'Hvilken enhed bytter du ind?',
    'screensB.tradein.whatCondition': 'Hvilken stand er den i?',
    'screensB.tradein.howOld': 'Hvor gammel er den?',
    'screensB.tradein.yourQuote': 'Dit tilbud',
    'screensB.tradein.creditFor': 'i butikstilgodehavende for din {product}',
    'screensB.tradein.quoteNote':
      'Tilbuddet gælder 14 dage. Vi tjekker enheden ved ankomst — passer standen ikke, giver vi et nyt tilbud, før vi gør noget, og sender den gratis retur, hvis du hellere vil springe fra.',
    'screensB.tradein.sendPack': 'Send mig en frankeret pakke',
    'screensB.tradein.justRecycle': 'Bare genbrug den',

    /* ------------------------------------------------------------ transfer */
    'screensB.transfer.h1': 'Overdrag en garanti',
    'screensB.transfer.lede':
      'Sælger du en enhed eller efterlader den, når du flytter? Den resterende dækning følger med, uden beregning. Den nye ejer skal blot acceptere på e-mail.',
    'screensB.transfer.doneTitle': 'Overdragelse startet',
    'screensB.transfer.registeredDevices': 'Dine registrerede enheder',
    'screensB.transfer.transferAnother': 'Overdrag en mere',
    'screensB.transfer.whichDevice': 'Hvilken enhed giver du videre?',
    'screensB.transfer.deviceNote': '{serial} · {left}',
    'screensB.transfer.emptyTitle': 'Der er intet tilbage at overdrage',
    'screensB.transfer.emptyBody':
      'Alle enheder på denne konto er allerede overdraget eller fjernet. Registrer en enhed først, så kan dens dækning straks overdrages.',
    'screensB.transfer.registerDevice': 'Registrer en enhed',
    'screensB.transfer.newOwnerName': 'Den nye ejers navn',
    'screensB.transfer.theirEmail': 'Deres e-mail',
    'screensB.transfer.whyTransfer': 'Hvorfor overdrager du den?',
    'screensB.transfer.chooseReason': 'Vælg en årsag…',
    'screensB.transfer.warning':
      'Overdragelsen fjerner enheden fra din husstand og sletter dens klip-historik for altid. Nulstil den til fabriksindstillinger først, hvis du ikke allerede har gjort det — bagefter kan vi intet gendanne.',
    'screensB.transfer.start': 'Start overdragelse',
    'screensB.transfer.howItWorks': 'Sådan virker det',
    'screensB.transfer.how1':
      'Vi sender den nye ejer et link — det gælder i 14 dage.',
    'screensB.transfer.how2':
      'De accepterer og føjer enheden til deres egen Hearth-konto.',
    'screensB.transfer.how3':
      'Den resterende dækning følger med den oprindelige købsdato. Intet at betale, og det ekstra registreringsår følger også med.',

    /* ------------------------------------------------------------ warranty */
    'screensB.warranty.h1': 'Registrer din garanti',
    'screensB.warranty.lede':
      'Registreringen tager et minut og giver et tredje års dækning gratis. Du får også firmwarenoter til de enheder, du ejer, og intet andet.',
    'screensB.warranty.needDevice': 'Vælg, hvilken enhed du registrerer',
    'screensB.warranty.needSerial': 'Indtast hele serienummeret',
    'screensB.warranty.needRetailer': 'Fortæl os, hvor du købte den',
    'screensB.warranty.purchasedToday': 'I dag',
    'screensB.warranty.coverLeft': '3 år tilbage',
    'screensB.warranty.registered': 'Garanti registreret',
    'screensB.warranty.doneTitle': '{name} registreret',
    'screensB.warranty.doneBody':
      'Dækningen løber til {date}. Vi har sendt certifikatet til sam@example.com — gem det sammen med kvitteringen.',
    'screensB.warranty.registerAnother': 'Registrer en enhed mere',
    'screensB.warranty.makeClaim': 'Anmeld en sag',
    'screensB.warranty.whichDevice': 'Hvilken enhed?',
    'screensB.warranty.serialNumber': 'Serienummer',
    'screensB.warranty.serialHelp':
      'På bagpladen og i appen under Om.',
    'screensB.warranty.purchaseDate': 'Købsdato',
    'screensB.warranty.whereBought': 'Hvor købte du den?',
    'screensB.warranty.selectRetailer': 'Vælg en forhandler…',
    'screensB.warranty.callout':
      'Købt hos os? Din ordre er allerede dækket — registreringen føjer blot det ekstra år og kvitteringen til din konto.',
    'screensB.warranty.submit': 'Registrer garanti',
    'screensB.warranty.listTitle': 'Dine registrerede enheder',
    'screensB.warranty.coverTo': 'Dækning til {date}',
    'screensB.warranty.claim': 'Anmeld',
    'screensB.warranty.transferLabel': 'Overdrag denne garanti',
    'screensB.warranty.remainingAria': 'Resterende garanti for {model}',
    'screensB.warranty.emptyTitle': 'Ingen registrerede enheder',
    'screensB.warranty.emptyBody':
      'Der er endnu intet registreret på denne konto. Registrering giver et gratis tredje års dækning og tager omkring et minut.',
    'screensB.warranty.registerDevice': 'Registrer en enhed',

    /* ---------------------------------------------------------------- wish */
    'screensB.wish.h1': 'Ønskeliste',
    'screensB.wish.shareList': 'Del listen',
    'screensB.wish.addAllInStock': 'Tilføj alt på lager',
    'screensB.wish.priceDrop': 'Prisfald',
    'screensB.wish.notifyMe': 'Giv mig besked',
    'screensB.wish.addToBasket': 'Læg i kurven',
    'screensB.wish.remove': 'Fjern',
    'screensB.wish.emptyTitle': 'Din ønskeliste er tom',
    'screensB.wish.emptyBody':
      'Gem alt, du overvejer — vi siger til, hvis prisen falder, eller varen kommer på lager igen, og intet udløber.',
    'screensB.wish.browseBundles': 'Gennemse pakker',
    'screensB.wish.restore': 'Hent demovarerne tilbage',
    'screensB.wish.othersSaved': 'Andre har også gemt',
    'screensB.wish.saveIt': 'Gem den',
  },
  /* Chinese has a single cardinal category — one variant, never a `|`. */
  'zh-CN': {
    /* ---------------------------------------------------------------- live */
    'screensB.live.h1': '实时画面与录像',
    'screensB.live.clipHistory': '录像记录',
    'screensB.live.note':
      '录像全程端到端加密。分享会生成一个 7 天后失效的链接，我们也看不到链接背后的内容。',

    /* ------------------------------------------------------------- members */
    'screensB.members.h1': '家庭成员',
    'screensB.members.lede':
      '共享住所，但不必共享密码。访客永远看不到录像记录，你也可以随时移除任何人。',
    'screensB.members.roleOwner': '所有者',
    'screensB.members.roleAdult': '成人',
    'screensB.members.roleGuest': '访客',
    'screensB.members.roleLabel': '角色',
    'screensB.members.needEmail': '请输入电子邮件地址',
    'screensB.members.pendingMeta': '{email} · 邀请待接受',
    'screensB.members.permFrontDoor': '仅前门',
    'screensB.members.permAllDevices': '全部设备',
    'screensB.members.inviteByEmail': '通过邮件邀请',
    'screensB.members.sendInvite': '发送邀请',
    'screensB.members.inviteSent': '邀请已发送',
    'screensB.members.inviteSentTo': '邀请已发送至 {email}',
    'screensB.members.inviteSentBody':
      '邀请 14 天后失效。在对方接受之前，会在下方显示为待处理。',
    'screensB.members.nowAdult': '{name} 现在是成人',
    'screensB.members.nowGuest': '{name} 现在是访客',
    'screensB.members.removed': '已移除 {name}',
    'screensB.members.thatsYou': '这是你',
    'screensB.members.roleFor': '{name} 的角色',
    'screensB.members.remove': '移除',
    'screensB.members.emptyTitle': '这个家里只有你',
    'screensB.members.emptyBody':
      '目前没有其他人有访问权限。在上方邀请一位成员，他们就能使用实时画面和开锁，而不会看到你的密码。',
    'screensB.members.note':
      '只有所有者可以增删设备、查看账单或注销账户。成人可以做其余所有操作；访客在你设定的时段内可使用实时画面和开锁。',

    /* ----------------------------------------------------------- myTickets */
    'screensB.myTickets.title': '我的工单',
    'screensB.myTickets.lede': '查询你与我们进行中和过往的对话。',
    'screensB.myTickets.emailLabel': '电子邮件地址',
    'screensB.myTickets.show': '显示我的工单',
    'screensB.myTickets.showingFor': '正在显示 {email} 的工单',
    'screensB.myTickets.help': '我们会显示该地址下的工单 — 演示数据。',

    /* ----------------------------------------------------------- newTicket */
    'screensB.newTicket.title': '提交工单',
    'screensB.newTicket.lede':
      '告诉我们发生了什么，我们会尽快回复。信息越详细，我们越快能帮上忙。',
    'screensB.newTicket.product': '哪个产品？',
    'screensB.newTicket.topic': '主题',
    'screensB.newTicket.topicPlaceholder': '选择主题…',
    'screensB.newTicket.subject': '标题',
    'screensB.newTicket.subjectPlaceholder': '一句话概括，例如“门铃每晚掉线”',
    'screensB.newTicket.description': '详细说明',
    'screensB.newTicket.counter': '{used}/{max}',
    'screensB.newTicket.descPlaceholder':
      '具体是什么情况？请说明你已经试过哪些方法、出现过什么错误提示，以及从什么时候开始的。',
    'screensB.newTicket.attachments': '附件',
    'screensB.newTicket.addFile': '添加文件',
    'screensB.newTicket.simulated': '本演示中的回复均为模拟内容。',
    'screensB.newTicket.submit': '提交工单',

    /* ------------------------------------------------------------ notFound */
    'screensB.notFound.code': '错误 404',
    'screensB.notFound.title': '这个页面走错了路。',
    'screensB.notFound.body':
      '你要找的页面不在这里 — 它可能已经移动，或者还没有为本演示做出来。',
    'screensB.notFound.home': '返回帮助中心',
    'screensB.notFound.ticket': '提交工单',

    /* -------------------------------------------------------------- notifs */
    'screensB.notifs.h1': '通知',
    'screensB.notifs.introUnread':
      '{count} 条未读 · 我们保留 90 天记录，你也可以调整接收内容。',
    'screensB.notifs.introClear': '已全部处理完 — 我们保留 90 天记录。',
    'screensB.notifs.markAllRead': '全部标为已读',
    'screensB.notifs.settingsLabel': '通知设置',
    'screensB.notifs.settingsLive': '提醒设置就在这里，与无障碍选项放在一起',
    'screensB.notifs.allMarkedRead': '已全部标为已读',
    'screensB.notifs.inboxCleared': '收件箱已清空',
    'screensB.notifs.inboxClearedBody':
      '没有未读内容了。新提醒到达时会显示在最上方。',
    'screensB.notifs.alertSettings': '提醒设置',
    'screensB.notifs.unread': '未读',
    'screensB.notifs.emptyTitle': '此筛选下没有内容',
    'screensB.notifs.emptyBody': '换个分类试试 — 我们保留 90 天记录。',

    /* -------------------------------------------------------------- orders */
    'screensB.orders.h1': '订单状态',
    'screensB.orders.lede':
      '输入订单号和下单时使用的邮箱。物流扫描后一小时内，更新会显示在这里。',
    'screensB.orders.statusTransit': '运送中',
    'screensB.orders.statusDelivered': '已送达',
    'screensB.orders.statusPacking': '备货中',
    'screensB.orders.headlineDelivered': '{day} 已送达',
    'screensB.orders.headlinePacking': '正在打包，明天发出',
    'screensB.orders.headlineTransit': '预计 7 月 28 日（周二）送达',
    'screensB.orders.errNoNumber': '请输入确认邮件中的订单号。',
    'screensB.orders.errNotFound':
      '没有找到与 {id} 匹配的订单。请核对确认邮件中的号码 — 它以 {prefix} 开头。',
    'screensB.orders.errNoEmail': '请输入下单时使用的邮箱，以便我们确认订单归属。',
    'screensB.orders.errEmailMismatch':
      '该订单存在，但邮箱与我们的记录不符。请试试确认邮件上的地址。',
    'screensB.orders.found': '已找到订单 {id}',
    'screensB.orders.trackingCopied': '已复制运单号',
    'screensB.orders.numberLabel': '订单号',
    'screensB.orders.emailLabel': '订单邮箱',
    'screensB.orders.find': '查找我的订单',
    'screensB.orders.demoOrders': '演示订单：',
    'screensB.orders.placedLine': '下单于 {placed} · {items}',
    'screensB.orders.carrier': '承运商',
    'screensB.orders.copyTracking': '复制运单号',
    'screensB.orders.deliveringTo': '送达地址',
    'screensB.orders.inThisOrder': '本单商品',
    'screensB.orders.qty': '数量 {n}',
    'screensB.orders.total': '合计',
    'screensB.orders.somethingWrong': '这笔订单有问题',
    'screensB.orders.askDelivery': '咨询配送',

    /* ------------------------------------------------------------ overview */
    'screensB.overview.eyebrow': '总览',
    'screensB.overview.h1': '门户中的每个页面',
    'screensB.overview.lede':
      '{count} 个页面，全部可交互。可以直接跳到任意一个 — 各流程之间的跳转与正式环境一致。',
    'screensB.overview.lightTheme': '浅色主题',
    'screensB.overview.darkTheme': '深色主题',
    'screensB.overview.openPortal': '打开门户',

    /* ------------------------------------------------------------- partner */
    'screensB.partner.approved': '认证合作伙伴',
    'screensB.partner.tradeAccount': '商用账户',
    'screensB.partner.supportLine': '合作伙伴专线',
    'screensB.partner.kpiJobs': '本月工单量',
    'screensB.partner.kpiRating': '评分',
    'screensB.partner.kpiPayout': '下次结算',
    'screensB.partner.kpiResponse': '响应时长',
    'screensB.partner.jobRequests': '工单请求',
    'screensB.partner.queueLine': '{waiting} 个待接 · 按你的技能匹配',
    'screensB.partner.queueClear': '队列已清空',
    'screensB.partner.queueClearBody':
      '你所在区域的新请求会出现在这里。我们按距离、等级和你资料中的技能进行匹配。',
    'screensB.partner.payWarranty': '由 Hearth 支付',
    'screensB.partner.payCustomer': '由客户支付',
    'screensB.partner.acceptJob': '接受工单',
    'screensB.partner.pass': '放弃',
    'screensB.partner.messageCustomer': '联系客户',
    'screensB.partner.messagingToast': '本演示不提供合作伙伴消息功能',
    'screensB.partner.accepted': '已接受工单 — 已通知客户',
    'screensB.partner.passed': '已放弃 — 退回派单池',
    'screensB.partner.certification': '认证',
    'screensB.partner.certBody': '还差两个模块，你的金牌等级将在十月续期。',
    'screensB.partner.continueTraining': '继续培训',
    'screensB.partner.trainingToast': '培训模块在合作伙伴 App 中',
    'screensB.partner.resources': '合作伙伴资料',
    'screensB.partner.resourcesToast': '本演示不包含合作伙伴资料',
    'screensB.partner.nextPayout': '下次结算',

    /* --------------------------------------------------------------- parts */
    'screensB.parts.h1': '备用配件',
    'screensB.parts.lede':
      '我们发售过的每个配件，在产品上市后至少供应七年。还在保修期内？先别买 — 提交申请，我们免费寄给你。',
    'screensB.parts.stockIn': '有货',
    'screensB.parts.stockLow': '库存紧张',
    'screensB.parts.stockOut': '2 周后到货',
    'screensB.parts.emptyTitle': '该设备暂无配件',
    'screensB.parts.emptyBody':
      '配件在产品上市后至少备货七年，如果这里没有你要的，直接来问我们是值得的。',
    'screensB.parts.openTicket': '提交工单',
    'screensB.parts.fitsLine': '{sku} · 适配 {fits}',
    'screensB.parts.removeOne': '减少一件 {name}',
    'screensB.parts.addAnother': '再加一件 {name}',
    'screensB.parts.notifyToast': '到货后我们会发邮件通知你',
    'screensB.parts.notify': '到货通知',
    'screensB.parts.add': '加入',
    'screensB.parts.basketEmptied': '购物车已清空',
    'screensB.parts.checkoutToast': '本演示不提供结账功能',
    'screensB.parts.freeDelivery': '已含免费配送',
    'screensB.parts.moreForFree': '再买 {amount} 即可免运费',
    'screensB.parts.inYourBasket': '购物车中有 {parts}',
    'screensB.parts.empty': '清空',
    'screensB.parts.checkout': '结账',
    'screensB.parts.callout':
      '多数配件用一把螺丝刀、十分钟就能装好。App 中每个配件页面都链接到分步维修指南 — 永远不需要焊接。',

    /* --------------------------------------------------------------- plans */
    'screensB.plans.title': 'Hearth Care 方案',
    'screensB.plans.lede':
      '录像记录、优先支持，以及保修期外的免费维修。每种方案都覆盖你名下任意数量的设备 — 随时可取消，已下载的录像仍归你所有。',
    'screensB.plans.cycleLabel': '计费周期',
    'screensB.plans.cycleMonthly': '按月',
    'screensB.plans.free': '免费',
    'screensB.plans.perAlways': '永久',
    'screensB.plans.perYear': '每年',
    'screensB.plans.perMonth': '每月',
    'screensB.plans.noCard': '无需银行卡',
    'screensB.plans.worksOut': '折合每月 {amount}',
    'screensB.plans.billedMonthly': '按月计费，随时可取消',
    'screensB.plans.freeTierBilling': '你使用的是免费方案 — 无需计费。',
    'screensB.plans.pricePerYear': '每年 {amount}',
    'screensB.plans.pricePerMonth': '每月 {amount}',
    'screensB.plans.billingLine': '{plan}，{price} {suffix} · 下次扣款 {date}',
    'screensB.plans.switched': '已切换到 {plan}',
    'screensB.plans.alreadyFree': '你已经在使用免费方案',
    'screensB.plans.cancelled': '方案已取消 — 你现在使用 Hearth Free',
    'screensB.plans.currentPlan': '当前方案',
    'screensB.plans.mostChosen': '最多人选',
    'screensB.plans.yourCurrentPlan': '你的当前方案',
    'screensB.plans.downgradeTo': '降级到 {plan}',
    'screensB.plans.switchTo': '切换到 {plan}',
    'screensB.plans.billing': '账单',
    'screensB.plans.invoices': '发票',
    'screensB.plans.cancelPlan': '取消方案',
    'screensB.plans.neverHead': '哪些功能永远不需要付费方案',
    'screensB.plans.neverBody':
      '实时画面、提醒、定时和本地录制在免费方案中永久可用。付费方案只增加云端记录和更快的支持。',

    /* -------------------------------------------------------------- recent */
    'screensB.recent.h1': '最近浏览',
    'screensB.recent.articleFallback': '文章',
    'screensB.recent.helpFallback': '帮助',
    'screensB.recent.metaLine': '{source} · {time}',
    'screensB.recent.saveForLater': '稍后再看',
    'screensB.recent.saveToWishlist': '加入心愿单',
    'screensB.recent.clearHistory': '清除记录',
    'screensB.recent.removeFromHistory': '从记录中移除',
    'screensB.recent.browseHelp': '浏览帮助',
    'screensB.recent.restore': '恢复演示记录',
    'screensB.recent.note':
      '浏览记录只保存在本设备上，30 天后自动清除。我们不会用它做广告；在 {link} 中关闭个性化提示后，它也不会用于推荐。',
    'screensB.recent.securityLink': '安全与隐私',

    /* ------------------------------------------------------------- recycle */
    'screensB.recycle.h1': '回收投递',
    'screensB.recycle.lede':
      '任何 Hearth 设备，无论新旧、能否使用 — 回收都免费，也不必是从我们这里买的。如果还能用，先看看折抵价值：也许能换到抵用额度。',
    'screensB.recycle.postcodePost': '用于寄件标签的邮编',
    'screensB.recycle.postcodeDrop': '你的邮编，方便我们按距离排序',
    'screensB.recycle.postcodeCollect': '上门取件邮编',
    'screensB.recycle.submitPost': '给我发免费寄件标签',
    'screensB.recycle.submitDrop': '预约投递',
    'screensB.recycle.submitCollect': '预约上门取件',
    'screensB.recycle.checkTradeIn': '改为查看折抵价值',
    'screensB.recycle.somethingElse': '回收其他物品',
    'screensB.recycle.methodLabel': '你想怎么寄回？',
    'screensB.recycle.itemsLabel': '你要回收什么？',
    'screensB.recycle.nearest': '最近的回收点',
    'screensB.recycle.directions': '导航',
    'screensB.recycle.allLocations': '查看全部门店',
    'screensB.recycle.weTake': '我们接收',
    'screensB.recycle.weCantTake': '我们无法接收',
    'screensB.recycle.warning':
      '带摄像头或麦克风的设备，交出前请先恢复出厂设置。我们会清除收到的每台设备，但先重置意味着你的数据根本不会离开家门。',

    /* --------------------------------------------------------------- refer */
    'screensB.refer.eyebrow': '推荐好友',
    'screensB.refer.title': '送 {amount}，得 {amount}。',
    'screensB.refer.lede':
      '为好友的第一台 Hearth 设备送上 {amount} 优惠。他们的订单发出后，我们会给你的账户返 {amount} — 不设上限，永不过期。',
    'screensB.refer.earned': '已赚 {amount}',
    'screensB.refer.progress':
      '{goal} 位好友中已有 {joined} 位加入 — 再来 {left} 位，我们额外奉送 {bonus} 奖励。',
    'screensB.refer.codeCopied': '已复制推荐码',
    'screensB.refer.linkCopied': '已复制邀请链接',
    'screensB.refer.needEmail': '请输入好友的邮箱',
    'screensB.refer.invitedJustNow': '刚刚邀请',
    'screensB.refer.rewardPending': '待发放',
    'screensB.refer.inviteSent': '邀请已发送至 {email}',
    'screensB.refer.copyCode': '复制推荐码',
    'screensB.refer.leaderboard': '排行榜',
    'screensB.refer.copyLink': '复制链接',
    'screensB.refer.yourProgress': '你的进度',
    'screensB.refer.inviteByEmail': '通过邮件邀请',
    'screensB.refer.friendEmailAria': '好友的电子邮件地址',
    'screensB.refer.send': '发送',
    'screensB.refer.inviteNote': '我们只发一封邮件，一周后再发一次提醒。此外绝不打扰。',
    'screensB.refer.yourReferrals': '你的推荐',
    'screensB.refer.pillJoined': '已加入',
    'screensB.refer.pillInvited': '已邀请',
    'screensB.refer.legal':
      '返利仅适用于新客户，并在其订单发出后到账。推荐返利不可兑换现金，也不适用于维修或 {amount} 以下的配件。',

    /* -------------------------------------------------------------- repair */
    'screensB.repair.h1': '预约维修',
    'screensB.repair.lede':
      '保修期内的维修免费，含上门取件。超出保修期的，我们会先报价再动手。',
    'screensB.repair.whenLine': '{dow} {day}，{slot}',
    'screensB.repair.slotFull': '该时段已满 — 换一个试试',
    'screensB.repair.needDevice': '请选择需要维修的设备',
    'screensB.repair.needIssue': '请选择需要检查的问题',
    'screensB.repair.needSlot': '请选择日期和时段',
    'screensB.repair.engineerRole': '硬件工程师',
    'screensB.repair.booked': '维修已预约 — {ref}',
    'screensB.repair.doneTitle': '预约完成',
    'screensB.repair.doneNote':
      '请让设备处于可取用状态，并准备好你的 Wi-Fi 密码。如需改期，提前 24 小时以上可免费调整。',
    'screensB.repair.seeAppointments': '查看我的预约',
    'screensB.repair.bookAnother': '再约一次',
    'screensB.repair.whichDevice': '哪台设备？',
    'screensB.repair.whatIssue': '需要检查什么？',
    'screensB.repair.chooseIssue': '选择问题…',
    'screensB.repair.howLabel': '你希望怎么处理？',
    'screensB.repair.pickDay': '选择日期',
    'screensB.repair.pickSlot': '选择时段',
    'screensB.repair.slotTaken': '已满',
    'screensB.repair.confirm': '确认预约',

    /* ------------------------------------------------------------- returns */
    'screensB.returns.h1': '发起退货',
    'screensB.returns.lede':
      '签收后 30 天内，无需理由。包裹到达我们这里后，退款将在五个工作日内退回你的卡。',
    'screensB.returns.stepItems': '商品',
    'screensB.returns.stepReason': '原因',
    'screensB.returns.stepLabel': '寄件标签',
    'screensB.returns.needItem': '请至少选择一件要退回的商品',
    'screensB.returns.needReason': '请选择原因，以便我们处理',
    'screensB.returns.created': '退货已创建',
    'screensB.returns.labelEmailed': '寄件标签已发送至 sam@example.com',
    'screensB.returns.continue': '继续',
    'screensB.returns.getLabel': '获取寄件标签',
    'screensB.returns.emailLabel': '把标签发给我',
    'screensB.returns.whichOrder': '哪笔订单？',
    'screensB.returns.orderLineDelivered': '{placed} 已送达 · {items} · {total}',
    'screensB.returns.orderLineArriving': '{placed} 送达 · {items} · {total}',
    'screensB.returns.whatSending': '你要寄回什么？',
    'screensB.returns.whyReturning': '为什么要退货？',
    'screensB.returns.chooseReason': '选择原因…',
    'screensB.returns.anythingKnow': '还有什么需要我们了解的吗？',
    'screensB.returns.optional': '选填',
    'screensB.returns.notePlaceholder': '这有助于我们改进 — 但你不必解释。',
    'screensB.returns.howSend': '你想怎么寄出？',
    'screensB.returns.doneTitle': '退货已安排好',
    'screensB.returns.doneBody': '我们已把寄件标签发送至 sam@example.com。{detail}',
    'screensB.returns.reference': '退货编号',
    'screensB.returns.qrHint': '在投递点出示此码，或把打印好的标签贴在包裹上。',
    'screensB.returns.whatNext': '接下来会发生什么',
    'screensB.returns.next1': '把商品连同盒中原配的线缆和支架一起装好。',
    'screensB.returns.next2': '请在 14 天内寄出 — 逾期标签会失效，需要重新申请。',
    'screensB.returns.next3': '包裹送达后五个工作日内退款，完成后我们会发邮件告知。',
    'screensB.returns.back': '上一步',

    /* --------------------------------------------------------------- saved */
    'screensB.saved.h1': '已保存的文章',
    'screensB.saved.introHas':
      '在此账户中留待稍后阅读 — {articles}。它们也会同步到 Hearth App。',
    'screensB.saved.introEmpty': '还没有保存任何内容。你收藏的内容会显示在这里和 App 中。',
    'screensB.saved.remove': '移除',
    'screensB.saved.emptyTitle': '还没有保存任何内容',
    'screensB.saved.emptyBody':
      '在任意文章上点“稍后再看”，它就会在这里等你 — 爬梯子之前先存好很方便。',
    'screensB.saved.browse': '浏览文章',
    'screensB.saved.suggested': '接着看',
    'screensB.saved.save': '保存',

    /* ------------------------------------------------------------ security */
    'screensB.security.h1': '安全与隐私',
    'screensB.security.lede':
      '录像全程端到端加密 — 我们看不到，我们的合作方也看不到。以下所有内容你都可以修改或带走。',
    'screensB.security.password': '密码',
    'screensB.security.passwordToast': '修改密码需要邮件确认',
    'screensB.security.change': '修改',
    'screensB.security.recommended': '推荐开启',
    'screensB.security.toggledOn': '{label} 已开启',
    'screensB.security.toggledOff': '{label} 已关闭',
    'screensB.security.keepClipsFor': '录像保留时长',
    'screensB.security.keepClipsNote': '较早的录像会自动删除。你已下载的内容仍归你所有。',
    'screensB.security.whereSignedIn': '你的登录设备',
    'screensB.security.signOutEverywhere': '退出其他所有设备',
    'screensB.security.signedOutEverywhere': '已退出其他所有设备',
    'screensB.security.thisDevice': '当前设备',
    'screensB.security.sessionMeta': '{where} · {when}',
    'screensB.security.signOut': '退出登录',
    'screensB.security.signedOutOf': '已退出 {device}',
    'screensB.security.emptyTitle': '没有其他已登录设备',
    'screensB.security.emptyBody':
      '这是你账户中唯一的会话。之后任何登录都会带着位置显示在这里。',
    'screensB.security.takeYourData': '带走你的数据',
    'screensB.security.takeYourDataBody':
      '一个包含账户、设备、定时计划和录像索引的压缩包 — 通常十分钟左右准备好。',
    'screensB.security.requestExport': '申请导出',
    'screensB.security.exportToast': '已申请导出 — 我们会把链接发到你的邮箱',
    'screensB.security.deleteAccount': '删除账户',
    'screensB.security.deleteAccountBody':
      '30 天后永久删除你的账户、录像和定时计划。你的设备仍可在本地继续工作。',
    'screensB.security.startDeletion': '开始删除',

    /* --------------------------------------------------------------- share */
    'screensB.share.h1': '已分享的录像',
    'screensB.share.lede':
      '把录像分享给邻居、群聊或警方，而不必交出账户。每个链接都会到期，你也可以随时撤回。',
    'screensB.share.shareClip': '分享录像',
    'screensB.share.newLink': '新建分享链接',
    'screensB.share.whichClip': '哪段录像？',
    'screensB.share.whoCanWatch': '谁可以观看',
    'screensB.share.linkExpires': '链接有效期',
    'screensB.share.createLink': '创建链接',
    'screensB.share.cancel': '取消',
    'screensB.share.linkMeta': '{audience} · {expires}',
    'screensB.share.views': '次观看',
    'screensB.share.copyLink': '复制链接',
    'screensB.share.revoke': '撤回',
    'screensB.share.emptyTitle': '目前没有分享内容',
    'screensB.share.emptyBody':
      '分享录像后，它会连同观看次数显示在这里，你随时知道有什么在外面 — 也可以随时撤回。',
    'screensB.share.note':
      '分享的录像在观看者的浏览器中解密，绝不在我们的服务器上解密。撤回会立即断开链接，但已经下载副本的人仍会保留 — 和你发出的任何视频一样。',

    /* -------------------------------------------------------------- status */
    'screensB.status.h1': '服务状态',
    'screensB.status.lede':
      'Hearth App、云端与网站的实时状态。即使我们的云端出问题，你的设备仍会在本地正常工作。',
    'screensB.status.healthOk': '运行正常',
    'screensB.status.healthDegraded': '性能下降',
    'screensB.status.healthDown': '服务中断',
    'screensB.status.allOperational': '所有系统运行正常',
    'screensB.status.someDegraded': '{services} 性能下降',
    'screensB.status.needEmail': '请输入邮箱以订阅',
    'screensB.status.subscribed': '已订阅状态更新',
    'screensB.status.uptimeLine': '{uptime} · 90 天',
    'screensB.status.openIncident': '进行中的故障',
    'screensB.status.incidentTitle': '部分家庭的录像回放速度偏慢',
    'screensB.status.resolved': '已解决',
    'screensB.status.subscribeTitle': '通过邮件接收状态更新',
    'screensB.status.subscribeNote': '出问题时发一封，修好后再发一封。',
    'screensB.status.emailAria': '接收状态更新的电子邮件地址',
    'screensB.status.subscribe': '订阅',
    'screensB.status.pastIncidents': '历史故障',
    'screensB.status.historyMeta': '{date} · {duration}',

    /* -------------------------------------------------------------- stores */
    'screensB.stores.h1': '查找门店',
    'screensB.stores.lede':
      'Hearth 自营门店，以及备齐全线产品的经销商。每家门店都接受退货，两家旗舰店还提供到店维修。',
    'screensB.stores.searchLabel': '城市或邮编',
    'screensB.stores.searchPlaceholder': 'Bristol 或 BS1 4TR',
    'screensB.stores.search': '搜索',
    'screensB.stores.nearMe': '附近门店',
    'screensB.stores.shown': '显示 {count} 家',
    'screensB.stores.open': '营业中',
    'screensB.stores.closed': '已打烊',
    'screensB.stores.directions': '导航',
    'screensB.stores.bookRepair': '在此门店预约维修',
    'screensB.stores.emptyBody':
      '没有匹配的结果。我们出售的所有商品次日免费送达，从家中退货也免费。',
    'screensB.stores.showEvery': '显示全部门店',
    'screensB.stores.findInstaller': '改为查找安装师傅',

    /* -------------------------------------------------------------- survey */
    'screensB.survey.eyebrow': '{minutes} 分钟，{questions} 个问题',
    'screensB.survey.h1': '我们做得怎么样？',
    'screensB.survey.lede':
      '内容直接送到支持团队 — 不进营销名单，除非你要求，否则不会有回访。',
    'screensB.survey.doneTitle': '谢谢你 — 由衷地',
    'screensB.survey.scoreOf': '{score}/{max}',
    'screensB.survey.scoreChip': '评分 {score}',
    'screensB.survey.backToHelp': '返回帮助中心',
    'screensB.survey.fillAgain': '再填一次',
    'screensB.survey.needScore': '请先选择 0 到 10 的分数',
    'screensB.survey.sent': '反馈已发送 — 谢谢',
    'screensB.survey.progressLabel': '问卷进度',
    'screensB.survey.answered': '已回答 {answered}／{total}',
    'screensB.survey.q1': '你有多大可能把 Hearth 推荐给朋友？',
    'screensB.survey.q1Note': '0 表示绝不会，10 表示已经推荐过了。',
    'screensB.survey.npsGroup': '推荐评分',
    'screensB.survey.scaleAria': '{row}：{rating}',
    'screensB.survey.q2': '你最希望我们先改进什么？',
    'screensB.survey.q2Note': '想选几项就选几项。',
    'screensB.survey.q3': '还有别的吗？',
    'screensB.survey.optional': '选填',
    'screensB.survey.q3Placeholder': '好的、坏的、吹毛求疵的 — 都对我们有帮助。',
    'screensB.survey.emailOptIn': '可以就此事给我发邮件',
    'screensB.survey.send': '发送反馈',

    /* -------------------------------------------------------------- thread */
    'screensB.thread.allTickets': '全部工单',
    'screensB.thread.noTicketTitle': '没有打开的工单',
    'screensB.thread.noTicketBody': '从你的工单中选择一段对话，就能在这里阅读。',
    'screensB.thread.simulated': '本演示中的回复均为模拟内容。',
    'screensB.thread.typing': '{name} 正在输入',
    'screensB.thread.replyPlaceholder': '写下回复…',
    'screensB.thread.replyAria': '写下回复',
    'screensB.thread.attachTitle': '添加附件',
    'screensB.thread.attach': '附件',
    'screensB.thread.attachToast': '本演示不支持附件',
    'screensB.thread.markSolved': '标记为已解决',
    'screensB.thread.sendReply': '发送回复',

    /* ---------------------------------------------------------------- tour */
    'screensB.tour.progress': '{n} / {total}',
    'screensB.tour.stepAria': '第 {n} 步，共 {total} 步：{title}',
    'screensB.tour.skip': '跳过导览',
    'screensB.tour.back': '上一步',
    'screensB.tour.finish': '完成',
    'screensB.tour.next': '下一步',
    'screensB.tour.finished': '导览结束 — 欢迎加入',
    'screensB.tour.skipped': '已跳过导览 — 想看的话，页脚里随时能找到',

    /* --------------------------------------------------------------- trade */
    'screensB.trade.eyebrow': '面向安装师傅、电工与租赁中介',
    'screensB.trade.h1': '开通商用账户',
    'screensB.trade.lede':
      '商用价格、30 天账期，以及一位接得起电话的专属联系人。审核需两个工作日，开通不收任何费用。',
    'screensB.trade.doneTitle': '申请已收到',
    'screensB.trade.previewPortal': '预览合作伙伴门户',
    'screensB.trade.startAnother': '再提交一份申请',
    'screensB.trade.pickTier': '选择等级',
    'screensB.trade.businessDetails': '企业资料',
    'screensB.trade.tradingName': '商号名称',
    'screensB.trade.businessType': '企业类型',
    'screensB.trade.chooseOne': '请选择…',
    'screensB.trade.companyNumber': '公司注册号',
    'screensB.trade.optional': '选填',
    'screensB.trade.vatNumber': '增值税号',
    'screensB.trade.vatHint': '未做增值税登记？留空即可 — 我们会按含税方式开通账户。',
    'screensB.trade.whoWeDealWith': '我们的对接人',
    'screensB.trade.contactName': '联系人姓名',
    'screensB.trade.workEmail': '工作邮箱',
    'screensB.trade.phone': '电话',
    'screensB.trade.installsAMonth': '每月安装量',
    'screensB.trade.whatDoYouFit': '你安装哪些产品？',
    'screensB.trade.pickAny': '可多选',
    'screensB.trade.anythingElse': '还有什么需要我们了解的吗？',
    'screensB.trade.notePlaceholder': '资质证书、覆盖区域，或你预计的业务量。',
    'screensB.trade.apply': '申请商用账户',
    'screensB.trade.foot':
      '已经通过审核？{link} 里有你的工单队列、结算和培训。登录后会自动显示商用价格。',
    'screensB.trade.footLink': '合作伙伴门户',

    /* ------------------------------------------------------------- tradein */
    'screensB.tradein.h1': '你的旧 Hearth 设备值多少？',
    'screensB.tradein.lede':
      '用任何还能工作的 Hearth 设备折抵下一台。能翻新的我们翻新，其余回收 — 无论如何你都会拿到抵用额度。',
    'screensB.tradein.baseValue': '基础估值，{product}',
    'screensB.tradein.conditionRow': '成色：{condition}',
    'screensB.tradein.ageRow': '使用年限：{age}',
    'screensB.tradein.factor': '× {factor}',
    'screensB.tradein.packOrdered': '已订购预付邮包',
    'screensB.tradein.recycleToast': '我们会把免费回收标签发到你的邮箱',
    'screensB.tradein.doneTitle': '预付邮包已在路上',
    'screensB.tradein.doneBody':
      '两到三个工作日送达。请用同一个盒子把设备寄回 — 邮费已包含，设备到达我们这里后一周内额度到账。',
    'screensB.tradein.creditChip': '{amount} 抵用额度',
    'screensB.tradein.valueAnother': '估算另一台设备',
    'screensB.tradein.whichDevice': '你要折抵哪台设备？',
    'screensB.tradein.whatCondition': '成色如何？',
    'screensB.tradein.howOld': '用了多久？',
    'screensB.tradein.yourQuote': '你的估价',
    'screensB.tradein.creditFor': '你的 {product} 可换的抵用额度',
    'screensB.tradein.quoteNote':
      '估价 14 天内有效。设备到达后我们会检查 — 如果成色不符，我们会先重新报价再处理；你若不想继续，我们免费寄回。',
    'screensB.tradein.sendPack': '给我寄预付邮包',
    'screensB.tradein.justRecycle': '直接回收',

    /* ------------------------------------------------------------ transfer */
    'screensB.transfer.h1': '转移保修',
    'screensB.transfer.lede':
      '设备要卖掉，或者搬家时留给别人？剩余保修会随之转移，不收费用。新主人只需通过邮件确认。',
    'screensB.transfer.doneTitle': '转移已开始',
    'screensB.transfer.registeredDevices': '你的已注册设备',
    'screensB.transfer.transferAnother': '再转移一台',
    'screensB.transfer.whichDevice': '你要交出哪台设备？',
    'screensB.transfer.deviceNote': '{serial} · {left}',
    'screensB.transfer.emptyTitle': '没有可转移的设备',
    'screensB.transfer.emptyBody':
      '此账户下的设备都已转移或移除。先注册一台设备，它的保修立刻就能转移。',
    'screensB.transfer.registerDevice': '注册设备',
    'screensB.transfer.newOwnerName': '新主人姓名',
    'screensB.transfer.theirEmail': '对方邮箱',
    'screensB.transfer.whyTransfer': '为什么要转移？',
    'screensB.transfer.chooseReason': '选择原因…',
    'screensB.transfer.warning':
      '转移会把设备从你的家庭中移除，并永久清除它的录像记录。如果还没做，请先恢复出厂设置 — 之后我们无法恢复任何内容。',
    'screensB.transfer.start': '开始转移',
    'screensB.transfer.howItWorks': '流程说明',
    'screensB.transfer.how1': '我们会给新主人发一个链接 — 有效期 14 天。',
    'screensB.transfer.how2': '对方确认后，把设备加入自己的 Hearth 账户。',
    'screensB.transfer.how3':
      '剩余保修按原购买日期一并转移。无需付费，注册赠送的额外一年也一起转过去。',

    /* ------------------------------------------------------------ warranty */
    'screensB.warranty.h1': '注册你的保修',
    'screensB.warranty.lede':
      '注册只需一分钟，免费延长第三年保修。你还会收到自己设备的固件说明，除此之外别无打扰。',
    'screensB.warranty.needDevice': '请选择要注册的设备',
    'screensB.warranty.needSerial': '请输入完整序列号',
    'screensB.warranty.needRetailer': '请告诉我们购买渠道',
    'screensB.warranty.purchasedToday': '今天',
    'screensB.warranty.coverLeft': '剩余 3 年',
    'screensB.warranty.registered': '保修已注册',
    'screensB.warranty.doneTitle': '{name} 已注册',
    'screensB.warranty.doneBody':
      '保修有效期至 {date}。我们已把凭证发送至 sam@example.com — 请与购买凭据一并保存。',
    'screensB.warranty.registerAnother': '注册另一台设备',
    'screensB.warranty.makeClaim': '提交保修申请',
    'screensB.warranty.whichDevice': '哪台设备？',
    'screensB.warranty.serialNumber': '序列号',
    'screensB.warranty.serialHelp': '在背板上，App 的“关于”页面里也能找到。',
    'screensB.warranty.purchaseDate': '购买日期',
    'screensB.warranty.whereBought': '你在哪里购买的？',
    'screensB.warranty.selectRetailer': '选择经销商…',
    'screensB.warranty.callout':
      '在我们这里买的？你的订单已经在保 — 注册只是把额外一年和购买凭据加入你的账户。',
    'screensB.warranty.submit': '注册保修',
    'screensB.warranty.listTitle': '你的已注册设备',
    'screensB.warranty.coverTo': '保修至 {date}',
    'screensB.warranty.claim': '申请',
    'screensB.warranty.transferLabel': '转移此保修',
    'screensB.warranty.remainingAria': '{model} 的剩余保修',
    'screensB.warranty.emptyTitle': '没有已注册的设备',
    'screensB.warranty.emptyBody':
      '此账户下还没有注册任何设备。注册可免费获得第三年保修，大约只需一分钟。',
    'screensB.warranty.registerDevice': '注册设备',

    /* ---------------------------------------------------------------- wish */
    'screensB.wish.h1': '心愿单',
    'screensB.wish.shareList': '分享清单',
    'screensB.wish.addAllInStock': '把有货的全部加入',
    'screensB.wish.priceDrop': '降价',
    'screensB.wish.notifyMe': '到货通知',
    'screensB.wish.addToBasket': '加入购物车',
    'screensB.wish.remove': '移除',
    'screensB.wish.emptyTitle': '你的心愿单是空的',
    'screensB.wish.emptyBody':
      '把还在犹豫的东西存起来 — 降价或补货时我们会通知你，而且永不过期。',
    'screensB.wish.browseBundles': '浏览套装',
    'screensB.wish.restore': '恢复演示商品',
    'screensB.wish.othersSaved': '其他人也保存了',
    'screensB.wish.saveIt': '保存',
  },
  /* Authored independently of zh-CN — Taiwan vocabulary, never converted. */
  'zh-TW': {
    /* ---------------------------------------------------------------- live */
    'screensB.live.h1': '即時畫面與影片',
    'screensB.live.clipHistory': '影片紀錄',
    'screensB.live.note':
      '影片全程端對端加密。分享會產生一組 7 天後失效的連結，我們也看不到連結背後的內容。',

    /* ------------------------------------------------------------- members */
    'screensB.members.h1': '家庭成員',
    'screensB.members.lede':
      '共用住家，不必共用密碼。訪客永遠看不到影片紀錄，你也可以隨時移除任何人。',
    'screensB.members.roleOwner': '擁有者',
    'screensB.members.roleAdult': '成人',
    'screensB.members.roleGuest': '訪客',
    'screensB.members.roleLabel': '角色',
    'screensB.members.needEmail': '請輸入電子郵件地址',
    'screensB.members.pendingMeta': '{email} · 邀請待接受',
    'screensB.members.permFrontDoor': '僅限大門',
    'screensB.members.permAllDevices': '所有裝置',
    'screensB.members.inviteByEmail': '以電子郵件邀請',
    'screensB.members.sendInvite': '送出邀請',
    'screensB.members.inviteSent': '邀請已送出',
    'screensB.members.inviteSentTo': '邀請已送至 {email}',
    'screensB.members.inviteSentBody':
      '邀請 14 天後失效。對方接受前，下方會顯示為等待中。',
    'screensB.members.nowAdult': '{name} 現在是成人',
    'screensB.members.nowGuest': '{name} 現在是訪客',
    'screensB.members.removed': '已移除 {name}',
    'screensB.members.thatsYou': '這是你',
    'screensB.members.roleFor': '{name} 的角色',
    'screensB.members.remove': '移除',
    'screensB.members.emptyTitle': '這個家裡只有你',
    'screensB.members.emptyBody':
      '目前沒有其他人有存取權。在上方邀請一位成員，他們就能使用即時畫面與解鎖，而不會看到你的密碼。',
    'screensB.members.note':
      '只有擁有者能新增或移除裝置、查看帳單或關閉帳戶。成人可執行其餘所有操作；訪客在你設定的時段內可使用即時畫面與解鎖。',

    /* ----------------------------------------------------------- myTickets */
    'screensB.myTickets.title': '我的工單',
    'screensB.myTickets.lede': '查詢你與我們進行中及過往的對話。',
    'screensB.myTickets.emailLabel': '電子郵件地址',
    'screensB.myTickets.show': '顯示我的工單',
    'screensB.myTickets.showingFor': '正在顯示 {email} 的工單',
    'screensB.myTickets.help': '我們會顯示這個地址的工單 — 示範資料。',

    /* ----------------------------------------------------------- newTicket */
    'screensB.newTicket.title': '建立工單',
    'screensB.newTicket.lede':
      '告訴我們發生什麼事，我們會盡快回覆。細節越多，我們就能越快幫上忙。',
    'screensB.newTicket.product': '哪一項產品？',
    'screensB.newTicket.topic': '主題',
    'screensB.newTicket.topicPlaceholder': '選擇主題…',
    'screensB.newTicket.subject': '主旨',
    'screensB.newTicket.subjectPlaceholder': '一句話摘要，例如「門鈴每晚離線」',
    'screensB.newTicket.description': '詳細說明',
    'screensB.newTicket.counter': '{used}/{max}',
    'screensB.newTicket.descPlaceholder':
      '狀況是什麼？請說明你試過哪些方法、出現過哪些錯誤訊息，以及從什麼時候開始。',
    'screensB.newTicket.attachments': '附件',
    'screensB.newTicket.addFile': '新增檔案',
    'screensB.newTicket.simulated': '本示範中的回覆皆為模擬。',
    'screensB.newTicket.submit': '送出工單',

    /* ------------------------------------------------------------ notFound */
    'screensB.notFound.code': '錯誤 404',
    'screensB.notFound.title': '這個頁面轉錯彎了。',
    'screensB.notFound.body':
      '你要找的頁面不在這裡 — 它可能已經搬走，或還沒為這份示範做出來。',
    'screensB.notFound.home': '返回說明中心',
    'screensB.notFound.ticket': '建立工單',

    /* -------------------------------------------------------------- notifs */
    'screensB.notifs.h1': '通知',
    'screensB.notifs.introUnread':
      '{count} 則未讀 · 我們保留 90 天紀錄，你也可以調整要收到什麼。',
    'screensB.notifs.introClear': '全部處理完畢 — 我們保留 90 天紀錄。',
    'screensB.notifs.markAllRead': '全部標為已讀',
    'screensB.notifs.settingsLabel': '通知設定',
    'screensB.notifs.settingsLive': '警示設定就在這裡，和無障礙選項放在一起',
    'screensB.notifs.allMarkedRead': '已全部標為已讀',
    'screensB.notifs.inboxCleared': '收件匣已清空',
    'screensB.notifs.inboxClearedBody':
      '沒有未讀項目了。新的警示送達時會顯示在最上方。',
    'screensB.notifs.alertSettings': '警示設定',
    'screensB.notifs.unread': '未讀',
    'screensB.notifs.emptyTitle': '這個篩選沒有內容',
    'screensB.notifs.emptyBody': '換個分類看看 — 我們保留 90 天紀錄。',

    /* -------------------------------------------------------------- orders */
    'screensB.orders.h1': '訂單狀態',
    'screensB.orders.lede':
      '輸入訂單編號與下訂時使用的電子郵件。物流掃描後一小時內，更新會出現在這裡。',
    'screensB.orders.statusTransit': '運送中',
    'screensB.orders.statusDelivered': '已送達',
    'screensB.orders.statusPacking': '備貨中',
    'screensB.orders.headlineDelivered': '{day} 已送達',
    'screensB.orders.headlinePacking': '正在打包，明天出貨',
    'screensB.orders.headlineTransit': '預計 7 月 28 日（週二）送達',
    'screensB.orders.errNoNumber': '請輸入確認信中的訂單編號。',
    'screensB.orders.errNotFound':
      '找不到符合 {id} 的訂單。請核對確認信上的編號 — 它以 {prefix} 開頭。',
    'screensB.orders.errNoEmail': '請輸入下訂時使用的電子郵件，讓我們確認訂單是你的。',
    'screensB.orders.errEmailMismatch':
      '這筆訂單存在，但電子郵件與我們的紀錄不符。請試試確認信上的地址。',
    'screensB.orders.found': '已找到訂單 {id}',
    'screensB.orders.trackingCopied': '已複製貨運單號',
    'screensB.orders.numberLabel': '訂單編號',
    'screensB.orders.emailLabel': '訂單電子郵件',
    'screensB.orders.find': '尋找我的訂單',
    'screensB.orders.demoOrders': '示範訂單：',
    'screensB.orders.placedLine': '{placed} 下訂 · {items}',
    'screensB.orders.carrier': '物流業者',
    'screensB.orders.copyTracking': '複製貨運單號',
    'screensB.orders.deliveringTo': '配送至',
    'screensB.orders.inThisOrder': '本次訂單內容',
    'screensB.orders.qty': '數量 {n}',
    'screensB.orders.total': '總計',
    'screensB.orders.somethingWrong': '這筆訂單有問題',
    'screensB.orders.askDelivery': '詢問配送',

    /* ------------------------------------------------------------ overview */
    'screensB.overview.eyebrow': '總覽',
    'screensB.overview.h1': '入口網站的每個畫面',
    'screensB.overview.lede':
      '{count} 個畫面，全部可互動。可直接跳到任何一個 — 各流程之間的連結和正式環境一樣。',
    'screensB.overview.lightTheme': '淺色佈景',
    'screensB.overview.darkTheme': '深色佈景',
    'screensB.overview.openPortal': '開啟入口網站',

    /* ------------------------------------------------------------- partner */
    'screensB.partner.approved': '認證合作夥伴',
    'screensB.partner.tradeAccount': '商用帳戶',
    'screensB.partner.supportLine': '合作夥伴專線',
    'screensB.partner.kpiJobs': '本月案件數',
    'screensB.partner.kpiRating': '評分',
    'screensB.partner.kpiPayout': '下次撥款',
    'screensB.partner.kpiResponse': '回應時間',
    'screensB.partner.jobRequests': '案件需求',
    'screensB.partner.queueLine': '{waiting} 件待接 · 依你的專長配對',
    'screensB.partner.queueClear': '佇列已清空',
    'screensB.partner.queueClearBody':
      '你所在區域的新需求會出現在這裡。我們依距離、等級與你檔案中的專長進行配對。',
    'screensB.partner.payWarranty': '由 Hearth 支付',
    'screensB.partner.payCustomer': '由客戶支付',
    'screensB.partner.acceptJob': '接下案件',
    'screensB.partner.pass': '略過',
    'screensB.partner.messageCustomer': '聯絡客戶',
    'screensB.partner.messagingToast': '本示範沒有合作夥伴訊息功能',
    'screensB.partner.accepted': '已接下案件 — 已通知客戶',
    'screensB.partner.passed': '已略過 — 退回派件池',
    'screensB.partner.certification': '認證',
    'screensB.partner.certBody': '還差兩個模組，你的金級資格將於十月續期。',
    'screensB.partner.continueTraining': '繼續培訓',
    'screensB.partner.trainingToast': '培訓模組在合作夥伴 App 中',
    'screensB.partner.resources': '合作夥伴資源',
    'screensB.partner.resourcesToast': '本示範不含合作夥伴資源',
    'screensB.partner.nextPayout': '下次撥款',

    /* --------------------------------------------------------------- parts */
    'screensB.parts.h1': '備用零件',
    'screensB.parts.lede':
      '我們出貨過的每個零件，在產品上市後至少供應七年。還在保固內？先別買 — 提出申請，我們免費寄給你。',
    'screensB.parts.stockIn': '有現貨',
    'screensB.parts.stockLow': '庫存不多',
    'screensB.parts.stockOut': '2 週後到貨',
    'screensB.parts.emptyTitle': '這台裝置目前沒有零件',
    'screensB.parts.emptyBody':
      '零件在上市後至少備貨七年，若這裡缺了什麼，直接問我們是值得的。',
    'screensB.parts.openTicket': '建立工單',
    'screensB.parts.fitsLine': '{sku} · 適用 {fits}',
    'screensB.parts.removeOne': '減少一件 {name}',
    'screensB.parts.addAnother': '再加一件 {name}',
    'screensB.parts.notifyToast': '到貨後我們會寄信通知你',
    'screensB.parts.notify': '到貨通知我',
    'screensB.parts.add': '加入',
    'screensB.parts.basketEmptied': '購物車已清空',
    'screensB.parts.checkoutToast': '本示範沒有結帳功能',
    'screensB.parts.freeDelivery': '已含免運',
    'screensB.parts.moreForFree': '再買 {amount} 即可免運',
    'screensB.parts.inYourBasket': '購物車中有 {parts}',
    'screensB.parts.empty': '清空',
    'screensB.parts.checkout': '結帳',
    'screensB.parts.callout':
      '大多數零件用一支螺絲起子、十分鐘就能裝好。App 中每個零件頁面都連到逐步維修指南 — 永遠不必焊接。',

    /* --------------------------------------------------------------- plans */
    'screensB.plans.title': 'Hearth Care 方案',
    'screensB.plans.lede':
      '影片紀錄、優先支援，以及保固外的免費維修。每個方案都適用你名下任意數量的裝置 — 隨時可取消，已下載的錄影仍屬於你。',
    'screensB.plans.cycleLabel': '計費週期',
    'screensB.plans.cycleMonthly': '每月',
    'screensB.plans.free': '免費',
    'screensB.plans.perAlways': '永久',
    'screensB.plans.perYear': '每年',
    'screensB.plans.perMonth': '每月',
    'screensB.plans.noCard': '不需要信用卡',
    'screensB.plans.worksOut': '折合每月 {amount}',
    'screensB.plans.billedMonthly': '按月計費，隨時可取消',
    'screensB.plans.freeTierBilling': '你使用的是免費方案 — 沒有需要計費的項目。',
    'screensB.plans.pricePerYear': '每年 {amount}',
    'screensB.plans.pricePerMonth': '每月 {amount}',
    'screensB.plans.billingLine': '{plan}，{price} {suffix} · 下次扣款 {date}',
    'screensB.plans.switched': '已切換至 {plan}',
    'screensB.plans.alreadyFree': '你已經在使用免費方案',
    'screensB.plans.cancelled': '方案已取消 — 你現在使用 Hearth Free',
    'screensB.plans.currentPlan': '目前方案',
    'screensB.plans.mostChosen': '最多人選擇',
    'screensB.plans.yourCurrentPlan': '你目前的方案',
    'screensB.plans.downgradeTo': '降級為 {plan}',
    'screensB.plans.switchTo': '切換至 {plan}',
    'screensB.plans.billing': '帳單',
    'screensB.plans.invoices': '發票',
    'screensB.plans.cancelPlan': '取消方案',
    'screensB.plans.neverHead': '哪些功能永遠不需要方案',
    'screensB.plans.neverBody':
      '即時畫面、警示、排程與本機錄影在免費方案中永久可用。方案只增加雲端紀錄與更快的支援。',

    /* -------------------------------------------------------------- recent */
    'screensB.recent.h1': '最近瀏覽',
    'screensB.recent.articleFallback': '文章',
    'screensB.recent.helpFallback': '說明',
    'screensB.recent.metaLine': '{source} · {time}',
    'screensB.recent.saveForLater': '稍後再看',
    'screensB.recent.saveToWishlist': '加入願望清單',
    'screensB.recent.clearHistory': '清除紀錄',
    'screensB.recent.removeFromHistory': '從紀錄中移除',
    'screensB.recent.browseHelp': '瀏覽說明',
    'screensB.recent.restore': '還原示範紀錄',
    'screensB.recent.note':
      '瀏覽紀錄只存在這台裝置上，30 天後自動清除。我們不會拿它做廣告；在 {link} 中關閉個人化提示後，它也不會用於建議。',
    'screensB.recent.securityLink': '安全與隱私',

    /* ------------------------------------------------------------- recycle */
    'screensB.recycle.h1': '回收交還',
    'screensB.recycle.lede':
      '任何 Hearth 裝置，不論年份、能否運作 — 回收都免費，也不必是向我們買的。如果還能用，先看看折抵價值：也許能換到購物金。',
    'screensB.recycle.postcodePost': '寄件標籤用的郵遞區號',
    'screensB.recycle.postcodeDrop': '你的郵遞區號，方便我們依距離排序',
    'screensB.recycle.postcodeCollect': '到府收件的郵遞區號',
    'screensB.recycle.submitPost': '寄給我免費寄件標籤',
    'screensB.recycle.submitDrop': '預約交還',
    'screensB.recycle.submitCollect': '預約到府收件',
    'screensB.recycle.checkTradeIn': '改看折抵價值',
    'screensB.recycle.somethingElse': '回收其他東西',
    'screensB.recycle.methodLabel': '你想怎麼寄回？',
    'screensB.recycle.itemsLabel': '你要回收什麼？',
    'screensB.recycle.nearest': '最近的回收據點',
    'screensB.recycle.directions': '路線',
    'screensB.recycle.allLocations': '查看所有門市',
    'screensB.recycle.weTake': '我們收',
    'screensB.recycle.weCantTake': '我們不能收',
    'screensB.recycle.warning':
      '帶有攝影機或麥克風的裝置，交出前請先回復原廠設定。我們會清除收到的每台裝置，但先重置代表你的資料根本不會離開家門。',

    /* --------------------------------------------------------------- refer */
    'screensB.refer.eyebrow': '推薦好友',
    'screensB.refer.title': '送 {amount}，拿 {amount}。',
    'screensB.refer.lede':
      '為好友的第一台 Hearth 裝置送上 {amount} 折扣。他們的訂單出貨後，我們會回饋 {amount} 到你的帳戶 — 不設上限，永不過期。',
    'screensB.refer.earned': '已賺得 {amount}',
    'screensB.refer.progress':
      '{goal} 位好友中已有 {joined} 位加入 — 再 {left} 位，我們額外加碼 {bonus}。',
    'screensB.refer.codeCopied': '已複製推薦碼',
    'screensB.refer.linkCopied': '已複製邀請連結',
    'screensB.refer.needEmail': '請輸入好友的電子郵件',
    'screensB.refer.invitedJustNow': '剛剛邀請',
    'screensB.refer.rewardPending': '待發放',
    'screensB.refer.inviteSent': '邀請已送至 {email}',
    'screensB.refer.copyCode': '複製推薦碼',
    'screensB.refer.leaderboard': '排行榜',
    'screensB.refer.copyLink': '複製連結',
    'screensB.refer.yourProgress': '你的進度',
    'screensB.refer.inviteByEmail': '以電子郵件邀請',
    'screensB.refer.friendEmailAria': '好友的電子郵件地址',
    'screensB.refer.send': '送出',
    'screensB.refer.inviteNote': '我們只寄一封信，一週後再寄一次提醒。此外絕不打擾。',
    'screensB.refer.yourReferrals': '你的推薦',
    'screensB.refer.pillJoined': '已加入',
    'screensB.refer.pillInvited': '已邀請',
    'screensB.refer.legal':
      '回饋僅適用新客戶，並在其訂單出貨後入帳。推薦回饋不可兌換現金，也不適用於維修或 {amount} 以下的配件。',

    /* -------------------------------------------------------------- repair */
    'screensB.repair.h1': '預約維修',
    'screensB.repair.lede':
      '保固內的維修免費，含到府收件。超出保固的，我們會先報價再動手。',
    'screensB.repair.whenLine': '{dow} {day}，{slot}',
    'screensB.repair.slotFull': '這個時段已滿 — 換一個試試',
    'screensB.repair.needDevice': '請選擇要維修的裝置',
    'screensB.repair.needIssue': '請選擇需要檢查的項目',
    'screensB.repair.needSlot': '請選擇日期與時段',
    'screensB.repair.engineerRole': '硬體工程師',
    'screensB.repair.booked': '維修已預約 — {ref}',
    'screensB.repair.doneTitle': '已為你預約',
    'screensB.repair.doneNote':
      '請讓裝置保持可取用，並準備好你的 Wi-Fi 密碼。需要改期時，提前 24 小時以上不收費用。',
    'screensB.repair.seeAppointments': '查看我的預約',
    'screensB.repair.bookAnother': '再預約一次',
    'screensB.repair.whichDevice': '哪台裝置？',
    'screensB.repair.whatIssue': '需要檢查什麼？',
    'screensB.repair.chooseIssue': '選擇問題…',
    'screensB.repair.howLabel': '你希望怎麼處理？',
    'screensB.repair.pickDay': '選擇日期',
    'screensB.repair.pickSlot': '選擇時段',
    'screensB.repair.slotTaken': '額滿',
    'screensB.repair.confirm': '確認預約',

    /* ------------------------------------------------------------- returns */
    'screensB.returns.h1': '申請退貨',
    'screensB.returns.lede':
      '到貨後 30 天內，不必說明理由。包裹送達我們這裡後，退款會在五個工作天內退回你的卡片。',
    'screensB.returns.stepItems': '商品',
    'screensB.returns.stepReason': '原因',
    'screensB.returns.stepLabel': '寄件標籤',
    'screensB.returns.needItem': '請至少選一件要退回的商品',
    'screensB.returns.needReason': '請選擇原因，我們才能處理',
    'screensB.returns.created': '退貨已建立',
    'screensB.returns.labelEmailed': '寄件標籤已寄至 sam@example.com',
    'screensB.returns.continue': '繼續',
    'screensB.returns.getLabel': '取得寄件標籤',
    'screensB.returns.emailLabel': '把標籤寄給我',
    'screensB.returns.whichOrder': '哪一筆訂單？',
    'screensB.returns.orderLineDelivered': '{placed} 已送達 · {items} · {total}',
    'screensB.returns.orderLineArriving': '{placed} 送達 · {items} · {total}',
    'screensB.returns.whatSending': '你要寄回什麼？',
    'screensB.returns.whyReturning': '為什麼要退貨？',
    'screensB.returns.chooseReason': '選擇原因…',
    'screensB.returns.anythingKnow': '還有什麼需要我們知道的嗎？',
    'screensB.returns.optional': '選填',
    'screensB.returns.notePlaceholder': '這能幫我們改進 — 但你不必解釋。',
    'screensB.returns.howSend': '你想怎麼寄出？',
    'screensB.returns.doneTitle': '你的退貨已安排好',
    'screensB.returns.doneBody': '我們已把寄件標籤寄至 sam@example.com。{detail}',
    'screensB.returns.reference': '退貨編號',
    'screensB.returns.qrHint': '在交件據點出示這組代碼，或把列印好的標籤貼在包裹上。',
    'screensB.returns.whatNext': '接下來會怎樣',
    'screensB.returns.next1': '把商品連同盒內原附的線材與支架一起裝好。',
    'screensB.returns.next2': '請在 14 天內交寄 — 逾期標籤會失效，需要重新申請。',
    'screensB.returns.next3': '包裹抵達後五個工作天內退款，完成時我們會寄信通知。',
    'screensB.returns.back': '上一步',

    /* --------------------------------------------------------------- saved */
    'screensB.saved.h1': '已儲存的文章',
    'screensB.saved.introHas':
      '在這個帳戶中留待稍後閱讀 — {articles}。它們也會同步到 Hearth App。',
    'screensB.saved.introEmpty': '還沒儲存任何東西。你加入書籤的內容會出現在這裡和 App 中。',
    'screensB.saved.remove': '移除',
    'screensB.saved.emptyTitle': '還沒儲存任何東西',
    'screensB.saved.emptyBody':
      '在任何文章上點「稍後再看」，它就會在這裡等你 — 爬梯子前先存好很方便。',
    'screensB.saved.browse': '瀏覽文章',
    'screensB.saved.suggested': '接著看',
    'screensB.saved.save': '儲存',

    /* ------------------------------------------------------------ security */
    'screensB.security.h1': '安全與隱私',
    'screensB.security.lede':
      '影片全程端對端加密 — 我們看不到，合作廠商也看不到。以下所有項目都由你決定要修改還是帶走。',
    'screensB.security.password': '密碼',
    'screensB.security.passwordToast': '變更密碼需要以電子郵件確認',
    'screensB.security.change': '變更',
    'screensB.security.recommended': '建議開啟',
    'screensB.security.toggledOn': '{label} 已開啟',
    'screensB.security.toggledOff': '{label} 已關閉',
    'screensB.security.keepClipsFor': '影片保留期限',
    'screensB.security.keepClipsNote': '較舊的影片會自動刪除。你已下載的內容仍屬於你。',
    'screensB.security.whereSignedIn': '你的登入裝置',
    'screensB.security.signOutEverywhere': '登出其他所有裝置',
    'screensB.security.signedOutEverywhere': '已登出其他所有裝置',
    'screensB.security.thisDevice': '這台裝置',
    'screensB.security.sessionMeta': '{where} · {when}',
    'screensB.security.signOut': '登出',
    'screensB.security.signedOutOf': '已登出 {device}',
    'screensB.security.emptyTitle': '沒有其他已登入的裝置',
    'screensB.security.emptyBody':
      '這是你帳戶中唯一的工作階段。之後任何登入都會連同位置顯示在這裡。',
    'screensB.security.takeYourData': '帶走你的資料',
    'screensB.security.takeYourDataBody':
      '一個包含帳戶、裝置、排程與影片索引的壓縮檔 — 通常十分鐘左右就準備好。',
    'screensB.security.requestExport': '申請匯出',
    'screensB.security.exportToast': '已申請匯出 — 我們會把連結寄給你',
    'screensB.security.deleteAccount': '刪除你的帳戶',
    'screensB.security.deleteAccountBody':
      '30 天後永久移除你的帳戶、影片與排程。你的裝置仍可在本機繼續運作。',
    'screensB.security.startDeletion': '開始刪除',

    /* --------------------------------------------------------------- share */
    'screensB.share.h1': '已分享的影片',
    'screensB.share.lede':
      '把影片分享給鄰居、群組或警方，而不必交出帳戶。每個連結都會到期，你也可以隨時收回。',
    'screensB.share.shareClip': '分享影片',
    'screensB.share.newLink': '新增分享連結',
    'screensB.share.whichClip': '哪一段影片？',
    'screensB.share.whoCanWatch': '誰可以觀看',
    'screensB.share.linkExpires': '連結到期時間',
    'screensB.share.createLink': '建立連結',
    'screensB.share.cancel': '取消',
    'screensB.share.linkMeta': '{audience} · {expires}',
    'screensB.share.views': '次觀看',
    'screensB.share.copyLink': '複製連結',
    'screensB.share.revoke': '收回',
    'screensB.share.emptyTitle': '目前沒有分享中的內容',
    'screensB.share.emptyBody':
      '分享影片後，它會連同觀看次數出現在這裡，你隨時知道有什麼在外面 — 也可以收回。',
    'screensB.share.note':
      '分享的影片在觀看者的瀏覽器中解密，絕不在我們的伺服器上解密。收回會立刻中斷連結，但已經下載副本的人仍會留著 — 就跟你寄出的任何影片一樣。',

    /* -------------------------------------------------------------- status */
    'screensB.status.h1': '服務狀態',
    'screensB.status.lede':
      'Hearth App、雲端與網站的即時狀態。就算我們的雲端出狀況，你的裝置仍會在本機正常運作。',
    'screensB.status.healthOk': '運作正常',
    'screensB.status.healthDegraded': '效能下降',
    'screensB.status.healthDown': '服務中斷',
    'screensB.status.allOperational': '所有系統運作正常',
    'screensB.status.someDegraded': '{services} 效能下降',
    'screensB.status.needEmail': '請輸入電子郵件以訂閱',
    'screensB.status.subscribed': '已訂閱狀態更新',
    'screensB.status.uptimeLine': '{uptime} · 90 天',
    'screensB.status.openIncident': '進行中的事件',
    'screensB.status.incidentTitle': '部分住家的影片播放速度偏慢',
    'screensB.status.resolved': '已解決',
    'screensB.status.subscribeTitle': '以電子郵件接收狀態更新',
    'screensB.status.subscribeNote': '出狀況時寄一封，修好後再寄一封。',
    'screensB.status.emailAria': '接收狀態更新的電子郵件地址',
    'screensB.status.subscribe': '訂閱',
    'screensB.status.pastIncidents': '過往事件',
    'screensB.status.historyMeta': '{date} · {duration}',

    /* -------------------------------------------------------------- stores */
    'screensB.stores.h1': '尋找門市',
    'screensB.stores.lede':
      'Hearth 直營門市，以及備齊全系列產品的經銷商。每間門市都受理退貨，兩家旗艦店還提供現場維修。',
    'screensB.stores.searchLabel': '城市或郵遞區號',
    'screensB.stores.searchPlaceholder': 'Bristol 或 BS1 4TR',
    'screensB.stores.search': '搜尋',
    'screensB.stores.nearMe': '附近門市',
    'screensB.stores.shown': '顯示 {count} 間',
    'screensB.stores.open': '營業中',
    'screensB.stores.closed': '已打烊',
    'screensB.stores.directions': '路線',
    'screensB.stores.bookRepair': '在這裡預約維修',
    'screensB.stores.emptyBody':
      '沒有符合的結果。我們販售的所有商品隔日免運送達，從家中退貨也免費。',
    'screensB.stores.showEvery': '顯示所有門市',
    'screensB.stores.findInstaller': '改為尋找安裝師傅',

    /* -------------------------------------------------------------- survey */
    'screensB.survey.eyebrow': '{minutes} 分鐘，{questions} 個問題',
    'screensB.survey.h1': '我們做得如何？',
    'screensB.survey.lede':
      '內容會直接送到支援團隊 — 不會進入行銷名單，除非你要求，否則不會再聯絡。',
    'screensB.survey.doneTitle': '謝謝你 — 真心的',
    'screensB.survey.scoreOf': '{score}/{max}',
    'screensB.survey.scoreChip': '評分 {score}',
    'screensB.survey.backToHelp': '返回說明中心',
    'screensB.survey.fillAgain': '再填一次',
    'screensB.survey.needScore': '請先選擇 0 到 10 的分數',
    'screensB.survey.sent': '意見已送出 — 謝謝',
    'screensB.survey.progressLabel': '問卷進度',
    'screensB.survey.answered': '已回答 {answered}／{total}',
    'screensB.survey.q1': '你有多大可能把 Hearth 推薦給朋友？',
    'screensB.survey.q1Note': '0 表示絕不會，10 表示已經推薦過了。',
    'screensB.survey.npsGroup': '推薦分數',
    'screensB.survey.scaleAria': '{row}：{rating}',
    'screensB.survey.q2': '你最希望我們先改善什麼？',
    'screensB.survey.q2Note': '想選幾項就選幾項。',
    'screensB.survey.q3': '還有其他的嗎？',
    'screensB.survey.optional': '選填',
    'screensB.survey.q3Placeholder': '好的、壞的、吹毛求疵的 — 都對我們有幫助。',
    'screensB.survey.emailOptIn': '可以就這件事寄信給我',
    'screensB.survey.send': '送出意見',

    /* -------------------------------------------------------------- thread */
    'screensB.thread.allTickets': '所有工單',
    'screensB.thread.noTicketTitle': '沒有開啟中的工單',
    'screensB.thread.noTicketBody': '從你的工單中挑一段對話，就能在這裡閱讀。',
    'screensB.thread.simulated': '本示範中的回覆皆為模擬。',
    'screensB.thread.typing': '{name} 正在輸入',
    'screensB.thread.replyPlaceholder': '寫下回覆…',
    'screensB.thread.replyAria': '寫下回覆',
    'screensB.thread.attachTitle': '附加檔案',
    'screensB.thread.attach': '附加',
    'screensB.thread.attachToast': '本示範不支援附件',
    'screensB.thread.markSolved': '標記為已解決',
    'screensB.thread.sendReply': '送出回覆',

    /* ---------------------------------------------------------------- tour */
    'screensB.tour.progress': '{n} / {total}',
    'screensB.tour.stepAria': '第 {n} 步，共 {total} 步：{title}',
    'screensB.tour.skip': '略過導覽',
    'screensB.tour.back': '上一步',
    'screensB.tour.finish': '完成',
    'screensB.tour.next': '下一步',
    'screensB.tour.finished': '導覽結束 — 歡迎加入',
    'screensB.tour.skipped': '已略過導覽 — 想看的話，頁尾隨時找得到',

    /* --------------------------------------------------------------- trade */
    'screensB.trade.eyebrow': '適用安裝師傅、電氣技師與租賃業者',
    'screensB.trade.h1': '開立商用帳戶',
    'screensB.trade.lede':
      '商用價格、30 天帳期，以及一位真的會接電話的專屬聯絡人。審核需兩個工作天，開戶完全免費。',
    'screensB.trade.doneTitle': '申請已收到',
    'screensB.trade.previewPortal': '預覽合作夥伴入口',
    'screensB.trade.startAnother': '再送一份申請',
    'screensB.trade.pickTier': '選擇等級',
    'screensB.trade.businessDetails': '公司資料',
    'screensB.trade.tradingName': '商業名稱',
    'screensB.trade.businessType': '營業類型',
    'screensB.trade.chooseOne': '請選擇…',
    'screensB.trade.companyNumber': '公司登記號',
    'screensB.trade.optional': '選填',
    'screensB.trade.vatNumber': '統一編號',
    'screensB.trade.vatHint': '沒有稅籍登記？留空即可 — 我們會以含稅方式開通帳戶。',
    'screensB.trade.whoWeDealWith': '我們的對口',
    'screensB.trade.contactName': '聯絡人姓名',
    'screensB.trade.workEmail': '工作電子郵件',
    'screensB.trade.phone': '電話',
    'screensB.trade.installsAMonth': '每月安裝量',
    'screensB.trade.whatDoYouFit': '你安裝哪些產品？',
    'screensB.trade.pickAny': '可複選',
    'screensB.trade.anythingElse': '還有什麼需要我們知道的嗎？',
    'screensB.trade.notePlaceholder': '證照、你服務的區域，或你預期的數量。',
    'screensB.trade.apply': '申請商用帳戶',
    'screensB.trade.foot':
      '已經通過審核？{link} 有你的案件佇列、撥款與培訓。登入後會自動顯示商用價格。',
    'screensB.trade.footLink': '合作夥伴入口',

    /* ------------------------------------------------------------- tradein */
    'screensB.tradein.h1': '你的舊 Hearth 裝置值多少？',
    'screensB.tradein.lede':
      '用任何還能運作的 Hearth 裝置折抵下一台。能整新的我們整新，其餘回收 — 不論如何你都會拿到購物金。',
    'screensB.tradein.baseValue': '基礎估值，{product}',
    'screensB.tradein.conditionRow': '狀況：{condition}',
    'screensB.tradein.ageRow': '使用年份：{age}',
    'screensB.tradein.factor': '× {factor}',
    'screensB.tradein.packOrdered': '已訂購預付包裹',
    'screensB.tradein.recycleToast': '我們會把免費回收標籤寄給你',
    'screensB.tradein.doneTitle': '預付包裹已寄出',
    'screensB.tradein.doneBody':
      '兩到三個工作天送達。請用同一個盒子把裝置寄回 — 郵資已含，裝置抵達我們這裡後一週內入帳。',
    'screensB.tradein.creditChip': '{amount} 購物金',
    'screensB.tradein.valueAnother': '估算另一台裝置',
    'screensB.tradein.whichDevice': '你要折抵哪台裝置？',
    'screensB.tradein.whatCondition': '狀況如何？',
    'screensB.tradein.howOld': '用了多久？',
    'screensB.tradein.yourQuote': '你的估價',
    'screensB.tradein.creditFor': '你的 {product} 可換得的購物金',
    'screensB.tradein.quoteNote':
      '估價 14 天內有效。裝置抵達後我們會檢查 — 若狀況不符，我們會先重新報價再處理；你若不想繼續，我們免費寄回。',
    'screensB.tradein.sendPack': '寄給我預付包裹',
    'screensB.tradein.justRecycle': '直接回收就好',

    /* ------------------------------------------------------------ transfer */
    'screensB.transfer.h1': '移轉保固',
    'screensB.transfer.lede':
      '裝置要賣掉，或搬家時留給別人？剩餘保固會跟著走，不收費用。新的擁有者只需以電子郵件確認。',
    'screensB.transfer.doneTitle': '移轉已開始',
    'screensB.transfer.registeredDevices': '你已註冊的裝置',
    'screensB.transfer.transferAnother': '再移轉一台',
    'screensB.transfer.whichDevice': '你要交出哪台裝置？',
    'screensB.transfer.deviceNote': '{serial} · {left}',
    'screensB.transfer.emptyTitle': '沒有可移轉的裝置',
    'screensB.transfer.emptyBody':
      '這個帳戶下的裝置都已移轉或移除。先註冊一台裝置，它的保固馬上就能移轉。',
    'screensB.transfer.registerDevice': '註冊裝置',
    'screensB.transfer.newOwnerName': '新擁有者姓名',
    'screensB.transfer.theirEmail': '對方的電子郵件',
    'screensB.transfer.whyTransfer': '為什麼要移轉？',
    'screensB.transfer.chooseReason': '選擇原因…',
    'screensB.transfer.warning':
      '移轉會把裝置移出你的家庭，並永久清除它的影片紀錄。如果還沒做，請先回復原廠設定 — 之後我們無法救回任何東西。',
    'screensB.transfer.start': '開始移轉',
    'screensB.transfer.howItWorks': '運作方式',
    'screensB.transfer.how1': '我們會寄一個連結給新擁有者 — 有效期 14 天。',
    'screensB.transfer.how2': '對方確認後，把裝置加入自己的 Hearth 帳戶。',
    'screensB.transfer.how3':
      '剩餘保固依原始購買日期一併移轉。不必付費，註冊加贈的那一年也會跟著過去。',

    /* ------------------------------------------------------------ warranty */
    'screensB.warranty.h1': '註冊你的保固',
    'screensB.warranty.lede':
      '註冊只要一分鐘，免費多加第三年保固。你也會收到自己裝置的韌體說明，除此之外別無其他。',
    'screensB.warranty.needDevice': '請選擇要註冊的裝置',
    'screensB.warranty.needSerial': '請輸入完整序號',
    'screensB.warranty.needRetailer': '請告訴我們你在哪裡購買',
    'screensB.warranty.purchasedToday': '今天',
    'screensB.warranty.coverLeft': '剩 3 年',
    'screensB.warranty.registered': '保固已註冊',
    'screensB.warranty.doneTitle': '{name} 已註冊',
    'screensB.warranty.doneBody':
      '保固有效至 {date}。我們已把憑證寄至 sam@example.com — 請與收據一起保存。',
    'screensB.warranty.registerAnother': '註冊另一台裝置',
    'screensB.warranty.makeClaim': '提出保固申請',
    'screensB.warranty.whichDevice': '哪台裝置？',
    'screensB.warranty.serialNumber': '序號',
    'screensB.warranty.serialHelp': '在背板上，App 的「關於」頁面也找得到。',
    'screensB.warranty.purchaseDate': '購買日期',
    'screensB.warranty.whereBought': '你在哪裡購買？',
    'screensB.warranty.selectRetailer': '選擇經銷商…',
    'screensB.warranty.callout':
      '在我們這裡買的？你的訂單已在保固中 — 註冊只是把多出來的一年與收據加進你的帳戶。',
    'screensB.warranty.submit': '註冊保固',
    'screensB.warranty.listTitle': '你已註冊的裝置',
    'screensB.warranty.coverTo': '保固至 {date}',
    'screensB.warranty.claim': '申請',
    'screensB.warranty.transferLabel': '移轉這份保固',
    'screensB.warranty.remainingAria': '{model} 的剩餘保固',
    'screensB.warranty.emptyTitle': '沒有已註冊的裝置',
    'screensB.warranty.emptyBody':
      '這個帳戶還沒有註冊任何裝置。註冊可免費多得第三年保固，大約只要一分鐘。',
    'screensB.warranty.registerDevice': '註冊裝置',

    /* ---------------------------------------------------------------- wish */
    'screensB.wish.h1': '願望清單',
    'screensB.wish.shareList': '分享清單',
    'screensB.wish.addAllInStock': '把有貨的全部加入',
    'screensB.wish.priceDrop': '降價',
    'screensB.wish.notifyMe': '到貨通知我',
    'screensB.wish.addToBasket': '加入購物車',
    'screensB.wish.remove': '移除',
    'screensB.wish.emptyTitle': '你的願望清單是空的',
    'screensB.wish.emptyBody':
      '把還在考慮的東西存起來 — 降價或補貨時我們會通知你，而且永不過期。',
    'screensB.wish.browseBundles': '瀏覽組合包',
    'screensB.wish.restore': '還原示範商品',
    'screensB.wish.othersSaved': '其他人也存了',
    'screensB.wish.saveIt': '儲存',
  },
  /* Modern Standard Arabic, and the only RTL locale. No directional control
   * characters anywhere — `dir="rtl"` on <html> does the work. Latin technical
   * tokens (Hearth, Wi-Fi, Gold, sam@example.com) stay as they are. */
  'ar-EG': {
    /* ---------------------------------------------------------------- live */
    'screensB.live.h1': 'البث المباشر والمقاطع',
    'screensB.live.clipHistory': 'سجل المقاطع',
    'screensB.live.note':
      'المقاطع مشفَّرة من طرف إلى طرف. تنشئ المشاركة رابطًا ينتهي بعد ٧ أيام، ولا يمكننا مشاهدة ما وراءه.',

    /* ------------------------------------------------------------- members */
    'screensB.members.h1': 'أفراد المنزل',
    'screensB.members.lede':
      'شارك المنزل دون مشاركة كلمة المرور. لا يرى الضيوف سجل المقاطع أبدًا، ويمكنك إزالة أي شخص فورًا.',
    'screensB.members.roleOwner': 'المالك',
    'screensB.members.roleAdult': 'بالغ',
    'screensB.members.roleGuest': 'ضيف',
    'screensB.members.roleLabel': 'الدور',
    'screensB.members.needEmail': 'أدخل عنوان بريد إلكتروني',
    'screensB.members.pendingMeta': '{email} · دعوة قيد الانتظار',
    'screensB.members.permFrontDoor': 'الباب الأمامي فقط',
    'screensB.members.permAllDevices': 'كل الأجهزة',
    'screensB.members.inviteByEmail': 'دعوة بالبريد الإلكتروني',
    'screensB.members.sendInvite': 'إرسال الدعوة',
    'screensB.members.inviteSent': 'أُرسلت الدعوة',
    'screensB.members.inviteSentTo': 'أُرسلت الدعوة إلى {email}',
    'screensB.members.inviteSentBody':
      'تنتهي صلاحيتها خلال ١٤ يومًا. سيظهر الشخص أدناه بحالة قيد الانتظار حتى يقبلها.',
    'screensB.members.nowAdult': '{name} أصبح بالغًا الآن',
    'screensB.members.nowGuest': '{name} أصبح ضيفًا الآن',
    'screensB.members.removed': 'تمت إزالة {name}',
    'screensB.members.thatsYou': 'هذا أنت',
    'screensB.members.roleFor': 'دور {name}',
    'screensB.members.remove': 'إزالة',
    'screensB.members.emptyTitle': 'أنت وحدك في هذا المنزل',
    'screensB.members.emptyBody':
      'لا أحد غيرك يملك حق الوصول. ادعُ شخصًا من الأعلى ليستخدم البث المباشر وفتح الأبواب دون أن يرى كلمة مرورك.',
    'screensB.members.note':
      'المالك وحده يستطيع إضافة الأجهزة أو إزالتها، ورؤية الفوترة، وإغلاق الحساب. أما البالغون فيمكنهم فعل كل ما عدا ذلك؛ ويحصل الضيوف على البث المباشر وفتح الأبواب في الأوقات التي تحددها.',

    /* ----------------------------------------------------------- myTickets */
    'screensB.myTickets.title': 'طلباتي',
    'screensB.myTickets.lede': 'ابحث عن محادثاتك المفتوحة والسابقة معنا.',
    'screensB.myTickets.emailLabel': 'عنوان البريد الإلكتروني',
    'screensB.myTickets.show': 'عرض طلباتي',
    'screensB.myTickets.showingFor': 'عرض الطلبات الخاصة بـ {email}',
    'screensB.myTickets.help': 'سنعرض الطلبات المرتبطة بهذا العنوان — بيانات تجريبية.',

    /* ----------------------------------------------------------- newTicket */
    'screensB.newTicket.title': 'فتح طلب دعم',
    'screensB.newTicket.lede':
      'أخبرنا بما يحدث وسنعود إليك. كلما زادت التفاصيل، أسرعنا في المساعدة.',
    'screensB.newTicket.product': 'أي منتج؟',
    'screensB.newTicket.topic': 'الموضوع',
    'screensB.newTicket.topicPlaceholder': 'اختر موضوعًا…',
    'screensB.newTicket.subject': 'العنوان',
    'screensB.newTicket.subjectPlaceholder':
      'ملخص قصير، مثل "جرس الباب ينقطع كل ليلة"',
    'screensB.newTicket.description': 'الوصف',
    'screensB.newTicket.counter': '{used}/{max}',
    'screensB.newTicket.descPlaceholder':
      'ما الذي يحدث؟ اذكر ما جربته بالفعل، وأي رسائل خطأ ظهرت، ومتى بدأت المشكلة.',
    'screensB.newTicket.attachments': 'المرفقات',
    'screensB.newTicket.addFile': 'إضافة ملف',
    'screensB.newTicket.simulated': 'الردود في هذا العرض التجريبي محاكاة.',
    'screensB.newTicket.submit': 'إرسال الطلب',

    /* ------------------------------------------------------------ notFound */
    'screensB.notFound.code': 'خطأ 404',
    'screensB.notFound.title': 'هذه الصفحة سلكت منعطفًا خاطئًا.',
    'screensB.notFound.body':
      'الصفحة التي تبحث عنها ليست هنا — ربما انتقلت، أو لم تُبنَ بعد لهذا العرض التجريبي.',
    'screensB.notFound.home': 'العودة إلى مركز المساعدة',
    'screensB.notFound.ticket': 'فتح طلب دعم',

    /* -------------------------------------------------------------- notifs */
    'screensB.notifs.h1': 'الإشعارات',
    'screensB.notifs.introUnread':
      'لا توجد إشعارات غير مقروءة · نحتفظ بسجل ٩٠ يومًا، ويمكنك ضبط ما يصلك.|إشعار واحد غير مقروء · نحتفظ بسجل ٩٠ يومًا، ويمكنك ضبط ما يصلك.|إشعاران غير مقروءين · نحتفظ بسجل ٩٠ يومًا، ويمكنك ضبط ما يصلك.|{count} إشعارات غير مقروءة · نحتفظ بسجل ٩٠ يومًا، ويمكنك ضبط ما يصلك.|{count} إشعارًا غير مقروء · نحتفظ بسجل ٩٠ يومًا، ويمكنك ضبط ما يصلك.|{count} إشعار غير مقروء · نحتفظ بسجل ٩٠ يومًا، ويمكنك ضبط ما يصلك.',
    'screensB.notifs.introClear': 'لا جديد — نحتفظ بسجل ٩٠ يومًا.',
    'screensB.notifs.markAllRead': 'تعليم الكل كمقروء',
    'screensB.notifs.settingsLabel': 'إعدادات الإشعارات',
    'screensB.notifs.settingsLive': 'إعدادات التنبيهات موجودة هنا مع إعدادات الوصول',
    'screensB.notifs.allMarkedRead': 'عُلِّم الكل كمقروء',
    'screensB.notifs.inboxCleared': 'أُفرغ صندوق الوارد',
    'screensB.notifs.inboxClearedBody':
      'لم يبقَ شيء غير مقروء. ستظهر التنبيهات الجديدة في الأعلى فور وصولها.',
    'screensB.notifs.alertSettings': 'إعدادات التنبيهات',
    'screensB.notifs.unread': 'غير مقروء',
    'screensB.notifs.emptyTitle': 'لا شيء ضمن هذه التصفية',
    'screensB.notifs.emptyBody': 'جرّب فئة أخرى — نحتفظ بسجل ٩٠ يومًا.',

    /* -------------------------------------------------------------- orders */
    'screensB.orders.h1': 'حالة الطلب',
    'screensB.orders.lede':
      'أدخل رقم طلبك والبريد الإلكتروني الذي طلبت به. تصل تحديثات التتبع هنا خلال ساعة من كل مسح.',
    'screensB.orders.statusTransit': 'في الطريق',
    'screensB.orders.statusDelivered': 'تم التسليم',
    'screensB.orders.statusPacking': 'قيد التجهيز',
    'screensB.orders.headlineDelivered': 'سُلِّم في {day}',
    'screensB.orders.headlinePacking': 'قيد التغليف، والشحن غدًا',
    'screensB.orders.headlineTransit': 'الوصول الثلاثاء ٢٨ يوليو',
    'screensB.orders.errNoNumber': 'أدخل رقم الطلب الوارد في رسالة التأكيد.',
    'screensB.orders.errNotFound':
      'لم نعثر على طلب يطابق {id}. راجع الرقم في رسالة التأكيد — يبدأ بـ {prefix}.',
    'screensB.orders.errNoEmail':
      'أدخل البريد الإلكتروني المستخدم في الطلب حتى نتأكد أنه لك.',
    'screensB.orders.errEmailMismatch':
      'الطلب موجود، لكن البريد الإلكتروني لا يطابق سجلاتنا. جرّب العنوان الوارد في رسالة التأكيد.',
    'screensB.orders.found': 'تم العثور على الطلب {id}',
    'screensB.orders.trackingCopied': 'نُسخ رقم التتبع',
    'screensB.orders.numberLabel': 'رقم الطلب',
    'screensB.orders.emailLabel': 'البريد الإلكتروني للطلب',
    'screensB.orders.find': 'ابحث عن طلبي',
    'screensB.orders.demoOrders': 'طلبات تجريبية:',
    'screensB.orders.placedLine': 'طُلب في {placed} · {items}',
    'screensB.orders.carrier': 'شركة الشحن',
    'screensB.orders.copyTracking': 'نسخ رقم التتبع',
    'screensB.orders.deliveringTo': 'التسليم إلى',
    'screensB.orders.inThisOrder': 'في هذا الطلب',
    'screensB.orders.qty': 'الكمية {n}',
    'screensB.orders.total': 'الإجمالي',
    'screensB.orders.somethingWrong': 'هناك خطأ في هذا الطلب',
    'screensB.orders.askDelivery': 'استفسار عن التسليم',

    /* ------------------------------------------------------------ overview */
    'screensB.overview.eyebrow': 'نظرة عامة',
    'screensB.overview.h1': 'كل شاشة في البوابة',
    'screensB.overview.lede':
      '{count} شاشة، جميعها تفاعلية. انتقل مباشرة إلى أي منها — تترابط المسارات ببعضها تمامًا كما في بيئة التشغيل.',
    'screensB.overview.lightTheme': 'المظهر الفاتح',
    'screensB.overview.darkTheme': 'المظهر الداكن',
    'screensB.overview.openPortal': 'فتح البوابة',

    /* ------------------------------------------------------------- partner */
    'screensB.partner.approved': 'شريك معتمد',
    'screensB.partner.tradeAccount': 'حساب تجاري',
    'screensB.partner.supportLine': 'خط دعم الشركاء',
    'screensB.partner.kpiJobs': 'مهام هذا الشهر',
    'screensB.partner.kpiRating': 'التقييم',
    'screensB.partner.kpiPayout': 'الدفعة القادمة',
    'screensB.partner.kpiResponse': 'زمن الاستجابة',
    'screensB.partner.jobRequests': 'طلبات المهام',
    'screensB.partner.queueLine': '{waiting} في الانتظار · مطابقة لمهاراتك',
    'screensB.partner.queueClear': 'قائمة الانتظار فارغة',
    'screensB.partner.queueClearBody':
      'تصل الطلبات الجديدة في منطقتك إلى هنا. نطابقها حسب المسافة والفئة والمهارات المدرجة في ملفك.',
    'screensB.partner.payWarranty': 'تدفع Hearth',
    'screensB.partner.payCustomer': 'يدفع العميل',
    'screensB.partner.acceptJob': 'قبول المهمة',
    'screensB.partner.pass': 'تخطٍّ',
    'screensB.partner.messageCustomer': 'مراسلة العميل',
    'screensB.partner.messagingToast':
      'مراسلة الشركاء غير متاحة في هذا العرض التجريبي',
    'screensB.partner.accepted': 'قُبلت المهمة — أُبلغ العميل',
    'screensB.partner.passed': 'تم التخطي — عادت إلى القائمة',
    'screensB.partner.certification': 'الاعتماد',
    'screensB.partner.certBody':
      'بقي وحدتان قبل تجديد فئة Gold الخاصة بك في أكتوبر.',
    'screensB.partner.continueTraining': 'متابعة التدريب',
    'screensB.partner.trainingToast': 'وحدات التدريب موجودة في تطبيق الشركاء',
    'screensB.partner.resources': 'موارد الشركاء',
    'screensB.partner.resourcesToast':
      'موارد الشركاء ليست ضمن هذا العرض التجريبي',
    'screensB.partner.nextPayout': 'الدفعة القادمة',

    /* --------------------------------------------------------------- parts */
    'screensB.parts.h1': 'قطع الغيار',
    'screensB.parts.lede':
      'كل قطعة شحناها يومًا متاحة لسبع سنوات على الأقل بعد إطلاق المنتج. ما زال ضمن الضمان؟ لا تشترِ شيئًا — قدّم مطالبة وسنرسلها مجانًا.',
    'screensB.parts.stockIn': 'متوفرة',
    'screensB.parts.stockLow': 'الكمية محدودة',
    'screensB.parts.stockOut': 'تعود خلال أسبوعين',
    'screensB.parts.emptyTitle': 'لا توجد قطع لهذا الجهاز',
    'screensB.parts.emptyBody':
      'نحتفظ بالقطع سبع سنوات على الأقل بعد الإطلاق، فإن غاب شيء هنا فيستحق أن تسألنا مباشرة.',
    'screensB.parts.openTicket': 'فتح طلب دعم',
    'screensB.parts.fitsLine': '{sku} · تناسب {fits}',
    'screensB.parts.removeOne': 'إزالة قطعة واحدة من {name}',
    'screensB.parts.addAnother': 'إضافة قطعة أخرى من {name}',
    'screensB.parts.notifyToast': 'سنراسلك فور توفرها',
    'screensB.parts.notify': 'أبلغني',
    'screensB.parts.add': 'إضافة',
    'screensB.parts.basketEmptied': 'أُفرغت السلة',
    'screensB.parts.checkoutToast': 'الدفع غير متاح في هذا العرض التجريبي',
    'screensB.parts.freeDelivery': 'التوصيل مجاني',
    'screensB.parts.moreForFree': '{amount} إضافية للحصول على توصيل مجاني',
    'screensB.parts.inYourBasket': '{parts} في سلتك',
    'screensB.parts.empty': 'إفراغ',
    'screensB.parts.checkout': 'إتمام الشراء',
    'screensB.parts.callout':
      'تُركَّب معظم القطع بمفك وعشر دقائق. تربط كل صفحة قطعة في التطبيق بدليل إصلاح خطوة بخطوة — ولا لحام أبدًا.',

    /* --------------------------------------------------------------- plans */
    'screensB.plans.title': 'باقات Hearth Care',
    'screensB.plans.lede':
      'سجل المقاطع، ودعم ذو أولوية، وإصلاحات مجانية خارج الضمان. تعمل كل باقة مع أي عدد من أجهزتك — يمكنك الإلغاء متى شئت، وتبقى التسجيلات التي نزّلتها لك.',
    'screensB.plans.cycleLabel': 'دورة الفوترة',
    'screensB.plans.cycleMonthly': 'شهريًا',
    'screensB.plans.free': 'مجانًا',
    'screensB.plans.perAlways': 'دائمًا',
    'screensB.plans.perYear': 'سنويًا',
    'screensB.plans.perMonth': 'شهريًا',
    'screensB.plans.noCard': 'لا حاجة إلى بطاقة',
    'screensB.plans.worksOut': 'أي ما يعادل {amount} شهريًا',
    'screensB.plans.billedMonthly': 'تُحتسب شهريًا، والإلغاء متاح في أي وقت',
    'screensB.plans.freeTierBilling': 'أنت على الباقة المجانية — لا شيء للفوترة.',
    'screensB.plans.pricePerYear': '{amount} سنويًا',
    'screensB.plans.pricePerMonth': '{amount} شهريًا',
    'screensB.plans.billingLine': '{plan}، {price} {suffix} · الخصم القادم {date}',
    'screensB.plans.switched': 'تم التبديل إلى {plan}',
    'screensB.plans.alreadyFree': 'أنت بالفعل على الباقة المجانية',
    'screensB.plans.cancelled': 'أُلغيت الباقة — أنت الآن على Hearth Free',
    'screensB.plans.currentPlan': 'الباقة الحالية',
    'screensB.plans.mostChosen': 'الأكثر اختيارًا',
    'screensB.plans.yourCurrentPlan': 'باقتك الحالية',
    'screensB.plans.downgradeTo': 'الرجوع إلى {plan}',
    'screensB.plans.switchTo': 'التبديل إلى {plan}',
    'screensB.plans.billing': 'الفوترة',
    'screensB.plans.invoices': 'الفواتير',
    'screensB.plans.cancelPlan': 'إلغاء الباقة',
    'screensB.plans.neverHead': 'ما لا يتطلب باقة أبدًا',
    'screensB.plans.neverBody':
      'البث المباشر والتنبيهات والجداول والتسجيل المحلي تعمل دائمًا على الباقة المجانية. الباقات تضيف فقط السجل السحابي ودعمًا أسرع.',

    /* -------------------------------------------------------------- recent */
    'screensB.recent.h1': 'شوهدت مؤخرًا',
    'screensB.recent.articleFallback': 'مقالة',
    'screensB.recent.helpFallback': 'المساعدة',
    'screensB.recent.metaLine': '{source} · {time}',
    'screensB.recent.saveForLater': 'حفظ لوقت لاحق',
    'screensB.recent.saveToWishlist': 'حفظ في قائمة الرغبات',
    'screensB.recent.clearHistory': 'مسح السجل',
    'screensB.recent.removeFromHistory': 'إزالة من السجل',
    'screensB.recent.browseHelp': 'تصفح المساعدة',
    'screensB.recent.restore': 'إعادة السجل التجريبي',
    'screensB.recent.note':
      'يُحفظ السجل على هذا الجهاز وحده ويُمسح تلقائيًا بعد ٣٠ يومًا. لا نستخدمه في الإعلانات، وإيقاف النصائح المخصصة من {link} يمنع استخدامه في الاقتراحات.',
    'screensB.recent.securityLink': 'الأمان والخصوصية',

    /* ------------------------------------------------------------- recycle */
    'screensB.recycle.h1': 'تسليم لإعادة التدوير',
    'screensB.recycle.lede':
      'أي جهاز Hearth، مهما كان عمره، عاملًا أو لا — إعادة التدوير مجانية، ولا يشترط أن يكون منّا. وإن كان لا يزال يعمل، فتحقق أولًا من قيمة الاستبدال: قد تحصل على رصيد مقابله.',
    'screensB.recycle.postcodePost': 'الرمز البريدي لملصق الشحن',
    'screensB.recycle.postcodeDrop': 'رمزك البريدي، لنرتب القائمة حسب المسافة',
    'screensB.recycle.postcodeCollect': 'الرمز البريدي لجمع الجهاز',
    'screensB.recycle.submitPost': 'أرسل لي ملصقًا مجانيًا',
    'screensB.recycle.submitDrop': 'حجز موعد تسليم',
    'screensB.recycle.submitCollect': 'حجز موعد جمع',
    'screensB.recycle.checkTradeIn': 'تحقق من قيمة الاستبدال بدلًا من ذلك',
    'screensB.recycle.somethingElse': 'إعادة تدوير شيء آخر',
    'screensB.recycle.methodLabel': 'كيف تفضّل إعادته إلينا؟',
    'screensB.recycle.itemsLabel': 'ما الذي تعيد تدويره؟',
    'screensB.recycle.nearest': 'أقرب نقاط التسليم',
    'screensB.recycle.directions': 'الاتجاهات',
    'screensB.recycle.allLocations': 'عرض كل الفروع',
    'screensB.recycle.weTake': 'نستقبل',
    'screensB.recycle.weCantTake': 'لا نستطيع استقبال',
    'screensB.recycle.warning':
      'أعد أي جهاز به كاميرا أو ميكروفون إلى ضبط المصنع قبل تسليمه. نمسح كل جهاز نستلمه، لكن إعادة الضبط أولًا تعني ألا تخرج بياناتك من بيتك أصلًا.',

    /* --------------------------------------------------------------- refer */
    'screensB.refer.eyebrow': 'ادعُ صديقًا',
    'screensB.refer.title': 'امنح {amount} واحصل على {amount}.',
    'screensB.refer.lede':
      'امنح صديقًا {amount} على أول جهاز Hearth يشتريه. وعند شحن طلبه، نضيف {amount} إلى رصيد حسابك — بلا حد أقصى وبلا انتهاء.',
    'screensB.refer.earned': 'كسبت {amount}',
    'screensB.refer.progress':
      'انضم {joined} من أصل {goal} من الأصدقاء — يتبقى {left}، وعندها نضيف مكافأة {bonus}.',
    'screensB.refer.codeCopied': 'نُسخ رمز الدعوة',
    'screensB.refer.linkCopied': 'نُسخ رابط الدعوة',
    'screensB.refer.needEmail': 'أدخل بريد صديقك الإلكتروني',
    'screensB.refer.invitedJustNow': 'دُعي للتو',
    'screensB.refer.rewardPending': 'قيد الانتظار',
    'screensB.refer.inviteSent': 'أُرسلت الدعوة إلى {email}',
    'screensB.refer.copyCode': 'نسخ الرمز',
    'screensB.refer.leaderboard': 'لوحة المتصدرين',
    'screensB.refer.copyLink': 'نسخ الرابط',
    'screensB.refer.yourProgress': 'تقدّمك',
    'screensB.refer.inviteByEmail': 'دعوة بالبريد الإلكتروني',
    'screensB.refer.friendEmailAria': 'عنوان البريد الإلكتروني لصديقك',
    'screensB.refer.send': 'إرسال',
    'screensB.refer.inviteNote':
      'نرسل رسالة واحدة، وتذكيرًا واحدًا بعد أسبوع. ولا شيء غير ذلك أبدًا.',
    'screensB.refer.yourReferrals': 'دعواتك',
    'screensB.refer.pillJoined': 'انضم',
    'screensB.refer.pillInvited': 'مدعو',
    'screensB.refer.legal':
      'يسري الرصيد على العملاء الجدد فقط ويُضاف عند شحن طلبهم. لا يُستبدل رصيد الدعوة نقدًا ولا يسري على الإصلاحات أو الملحقات التي تقل عن {amount}.',

    /* -------------------------------------------------------------- repair */
    'screensB.repair.h1': 'حجز موعد إصلاح',
    'screensB.repair.lede':
      'الإصلاحات ضمن الضمان مجانية، بما فيها الاستلام. أما خارج الضمان فنقدّم عرض سعر قبل أن نلمس أي شيء.',
    'screensB.repair.whenLine': '{dow} {day}، {slot}',
    'screensB.repair.slotFull': 'هذا الموعد ممتلئ — جرّب موعدًا آخر',
    'screensB.repair.needDevice': 'اختر الجهاز الذي يحتاج إصلاحًا',
    'screensB.repair.needIssue': 'اختر ما ينبغي فحصه',
    'screensB.repair.needSlot': 'اختر يومًا وموعدًا',
    'screensB.repair.engineerRole': 'مهندس أجهزة',
    'screensB.repair.booked': 'حُجز الإصلاح — {ref}',
    'screensB.repair.doneTitle': 'تم حجز موعدك',
    'screensB.repair.doneNote':
      'أبقِ الجهاز في متناول اليد واحتفظ بكلمة مرور Wi-Fi قريبة منك. ويمكنك تغيير الموعد مجانًا حتى ٢٤ ساعة قبله.',
    'screensB.repair.seeAppointments': 'عرض مواعيدي',
    'screensB.repair.bookAnother': 'حجز موعد آخر',
    'screensB.repair.whichDevice': 'أي جهاز؟',
    'screensB.repair.whatIssue': 'ما الذي ينبغي فحصه؟',
    'screensB.repair.chooseIssue': 'اختر المشكلة…',
    'screensB.repair.howLabel': 'كيف تريد أن نتعامل معها؟',
    'screensB.repair.pickDay': 'اختر يومًا',
    'screensB.repair.pickSlot': 'اختر موعدًا',
    'screensB.repair.slotTaken': 'ممتلئ',
    'screensB.repair.confirm': 'تأكيد الحجز',

    /* ------------------------------------------------------------- returns */
    'screensB.returns.h1': 'بدء إرجاع',
    'screensB.returns.lede':
      '٣٠ يومًا من التسليم، دون أسئلة. يعود المبلغ إلى بطاقتك خلال خمسة أيام عمل من وصول الطرد إلينا.',
    'screensB.returns.stepItems': 'العناصر',
    'screensB.returns.stepReason': 'السبب',
    'screensB.returns.stepLabel': 'الملصق',
    'screensB.returns.needItem': 'اختر عنصرًا واحدًا على الأقل لإرجاعه',
    'screensB.returns.needReason': 'اختر سببًا حتى نتمكن من معالجة الطلب',
    'screensB.returns.created': 'أُنشئ طلب الإرجاع',
    'screensB.returns.labelEmailed': 'أُرسل الملصق إلى sam@example.com',
    'screensB.returns.continue': 'متابعة',
    'screensB.returns.getLabel': 'احصل على الملصق',
    'screensB.returns.emailLabel': 'أرسل لي الملصق',
    'screensB.returns.whichOrder': 'أي طلب؟',
    'screensB.returns.orderLineDelivered': 'سُلِّم في {placed} · {items} · {total}',
    'screensB.returns.orderLineArriving': 'يصل في {placed} · {items} · {total}',
    'screensB.returns.whatSending': 'ما الذي ترسله إلينا؟',
    'screensB.returns.whyReturning': 'لماذا ترجعه؟',
    'screensB.returns.chooseReason': 'اختر سببًا…',
    'screensB.returns.anythingKnow': 'هل من شيء آخر ينبغي أن نعرفه؟',
    'screensB.returns.optional': 'اختياري',
    'screensB.returns.notePlaceholder':
      'هذا يساعدنا على تحسين الأمور — لكنك لست مضطرًا للشرح.',
    'screensB.returns.howSend': 'كيف تفضّل إرساله؟',
    'screensB.returns.doneTitle': 'أصبح الإرجاع جاهزًا',
    'screensB.returns.doneBody': 'أرسلنا الملصق إلى sam@example.com. {detail}',
    'screensB.returns.reference': 'رقم مرجع الإرجاع',
    'screensB.returns.qrHint':
      'اعرض هذا الرمز في نقطة التسليم، أو ألصق الملصق المطبوع على الطرد.',
    'screensB.returns.whatNext': 'ماذا بعد',
    'screensB.returns.next1':
      'غلِّف العناصر مع أي كابلات وحوامل جاءت في الصندوق.',
    'screensB.returns.next2':
      'سلّمه خلال ١٤ يومًا — بعدها تنتهي صلاحية الملصق وستحتاج إلى واحد جديد.',
    'screensB.returns.next3':
      'نرد المبلغ خلال خمسة أيام عمل من وصول الطرد، ونراسلك فور إتمام ذلك.',
    'screensB.returns.back': 'رجوع',

    /* --------------------------------------------------------------- saved */
    'screensB.saved.h1': 'المقالات المحفوظة',
    'screensB.saved.introHas':
      'محفوظة لوقت لاحق في هذا الحساب — {articles}. وتتزامن مع تطبيق Hearth أيضًا.',
    'screensB.saved.introEmpty':
      'لا شيء محفوظ بعد. كل ما تضيفه إلى المفضلة يظهر هنا وفي التطبيق.',
    'screensB.saved.remove': 'إزالة',
    'screensB.saved.emptyTitle': 'لا شيء محفوظ بعد',
    'screensB.saved.emptyBody':
      'اضغط "حفظ لوقت لاحق" في أي مقالة وستنتظرك هنا — مفيد قبل أن تصعد السلّم.',
    'screensB.saved.browse': 'تصفح المقالات',
    'screensB.saved.suggested': 'اقرأ بعدها',
    'screensB.saved.save': 'حفظ',

    /* ------------------------------------------------------------ security */
    'screensB.security.h1': 'الأمان والخصوصية',
    'screensB.security.lede':
      'المقاطع مشفَّرة من طرف إلى طرف — لا يمكننا مشاهدتها، ولا يمكن ذلك لأي جهة نتعامل معها. وكل ما يلي ملكك، تغيّره أو تأخذه معك.',
    'screensB.security.password': 'كلمة المرور',
    'screensB.security.passwordToast':
      'تغيير كلمة المرور يحتاج تأكيدًا عبر البريد الإلكتروني',
    'screensB.security.change': 'تغيير',
    'screensB.security.recommended': 'موصى به',
    'screensB.security.toggledOn': 'تم تفعيل {label}',
    'screensB.security.toggledOff': 'تم إيقاف {label}',
    'screensB.security.keepClipsFor': 'مدة الاحتفاظ بالمقاطع',
    'screensB.security.keepClipsNote':
      'تُحذف المقاطع الأقدم تلقائيًا. أما ما نزّلته فيبقى لك.',
    'screensB.security.whereSignedIn': 'أين سجّلت الدخول',
    'screensB.security.signOutEverywhere': 'تسجيل الخروج من كل مكان آخر',
    'screensB.security.signedOutEverywhere': 'تم تسجيل الخروج من كل مكان آخر',
    'screensB.security.thisDevice': 'هذا الجهاز',
    'screensB.security.sessionMeta': '{where} · {when}',
    'screensB.security.signOut': 'تسجيل الخروج',
    'screensB.security.signedOutOf': 'تم تسجيل الخروج من {device}',
    'screensB.security.emptyTitle': 'لا توجد أجهزة أخرى مسجّلة الدخول',
    'screensB.security.emptyBody':
      'هذه هي الجلسة الوحيدة في حسابك. وأي دخول آخر سيظهر هنا مع موقعه.',
    'screensB.security.takeYourData': 'خذ بياناتك معك',
    'screensB.security.takeYourDataBody':
      'ملف مضغوط يضم حسابك وأجهزتك وجداولك وفهرس المقاطع — يجهز عادة خلال عشر دقائق تقريبًا.',
    'screensB.security.requestExport': 'طلب تصدير',
    'screensB.security.exportToast': 'طُلب التصدير — سنرسل لك رابطًا',
    'screensB.security.deleteAccount': 'حذف حسابك',
    'screensB.security.deleteAccountBody':
      'يزيل حسابك ومقاطعك وجداولك نهائيًا بعد ٣٠ يومًا. وتظل أجهزتك تعمل محليًا.',
    'screensB.security.startDeletion': 'بدء الحذف',

    /* --------------------------------------------------------------- share */
    'screensB.share.h1': 'المقاطع المشاركة',
    'screensB.share.lede':
      'شارك مقطعًا مع الجيران أو مجموعة محادثة أو الشرطة دون أن تسلّم حسابك. كل رابط تنتهي صلاحيته، ويمكنك سحبه في أي لحظة.',
    'screensB.share.shareClip': 'مشاركة مقطع',
    'screensB.share.newLink': 'رابط مشاركة جديد',
    'screensB.share.whichClip': 'أي مقطع؟',
    'screensB.share.whoCanWatch': 'من يمكنه المشاهدة',
    'screensB.share.linkExpires': 'انتهاء صلاحية الرابط',
    'screensB.share.createLink': 'إنشاء الرابط',
    'screensB.share.cancel': 'إلغاء',
    'screensB.share.linkMeta': '{audience} · {expires}',
    'screensB.share.views': 'مشاهدة',
    'screensB.share.copyLink': 'نسخ الرابط',
    'screensB.share.revoke': 'سحب',
    'screensB.share.emptyTitle': 'لا شيء مشارك حاليًا',
    'screensB.share.emptyBody':
      'عندما تشارك مقطعًا يظهر هنا مع عدد مشاهداته، فتعرف دائمًا ما هو منشور — ويمكنك سحبه.',
    'screensB.share.note':
      'تُفك تشفير المقاطع المشاركة في متصفح المشاهد، لا على خوادمنا أبدًا. والسحب يعطّل الرابط فورًا، وإن كان من نزّل نسخة سيحتفظ بها — تمامًا كأي فيديو ترسله.',

    /* -------------------------------------------------------------- status */
    'screensB.status.h1': 'حالة الخدمة',
    'screensB.status.lede':
      'الحالة الحية لتطبيق Hearth والسحابة والموقع. تظل أجهزتك تعمل محليًا حتى حين تتعثر سحابتنا.',
    'screensB.status.healthOk': 'تعمل',
    'screensB.status.healthDegraded': 'أداء منخفض',
    'screensB.status.healthDown': 'انقطاع',
    'screensB.status.allOperational': 'كل الأنظمة تعمل',
    'screensB.status.someDegraded': '{services} بأداء منخفض',
    'screensB.status.needEmail': 'أدخل بريدًا إلكترونيًا للاشتراك',
    'screensB.status.subscribed': 'تم الاشتراك في تحديثات الحالة',
    'screensB.status.uptimeLine': '{uptime} · ٩٠ يومًا',
    'screensB.status.openIncident': 'عطل مفتوح',
    'screensB.status.incidentTitle': 'تشغيل المقاطع بطيء في بعض المنازل',
    'screensB.status.resolved': 'تم الحل',
    'screensB.status.subscribeTitle': 'استلام تحديثات الحالة بالبريد الإلكتروني',
    'screensB.status.subscribeNote':
      'رسالة واحدة عند حدوث عطل، وأخرى عند إصلاحه.',
    'screensB.status.emailAria': 'عنوان البريد الإلكتروني لتحديثات الحالة',
    'screensB.status.subscribe': 'اشتراك',
    'screensB.status.pastIncidents': 'أعطال سابقة',
    'screensB.status.historyMeta': '{date} · {duration}',

    /* -------------------------------------------------------------- stores */
    'screensB.stores.h1': 'ابحث عن متجر',
    'screensB.stores.lede':
      'متاجر Hearth الخاصة إلى جانب الموزعين الذين يوفرون التشكيلة كاملة. كل فرع يستقبل المرتجعات، والمتجران الرئيسيان يجريان إصلاحات فورية.',
    'screensB.stores.searchLabel': 'المدينة أو الرمز البريدي',
    'screensB.stores.searchPlaceholder': 'Bristol أو BS1 4TR',
    'screensB.stores.search': 'بحث',
    'screensB.stores.nearMe': 'بالقرب مني',
    'screensB.stores.shown': '{count} معروض',
    'screensB.stores.open': 'مفتوح',
    'screensB.stores.closed': 'مغلق',
    'screensB.stores.directions': 'الاتجاهات',
    'screensB.stores.bookRepair': 'احجز إصلاحًا هنا',
    'screensB.stores.emptyBody':
      'لا نتائج مطابقة لهذا البحث. كل ما نبيعه يُشحن مجانًا في اليوم التالي، والإرجاع من المنزل مجاني.',
    'screensB.stores.showEvery': 'عرض كل الفروع',
    'screensB.stores.findInstaller': 'ابحث عن فني تركيب بدلًا من ذلك',

    /* -------------------------------------------------------------- survey */
    'screensB.survey.eyebrow': '{minutes} دقيقة، {questions} أسئلة',
    'screensB.survey.h1': 'كيف كان أداؤنا؟',
    'screensB.survey.lede':
      'يصل هذا مباشرة إلى فريق الدعم — بلا قوائم تسويقية وبلا متابعة، إلا إن طلبتها.',
    'screensB.survey.doneTitle': 'شكرًا لك — بصدق',
    'screensB.survey.scoreOf': '{score}/{max}',
    'screensB.survey.scoreChip': 'التقييم {score}',
    'screensB.survey.backToHelp': 'العودة إلى مركز المساعدة',
    'screensB.survey.fillAgain': 'املأه مرة أخرى',
    'screensB.survey.needScore': 'اختر أولًا تقييمًا من ٠ إلى ١٠',
    'screensB.survey.sent': 'أُرسل رأيك — شكرًا لك',
    'screensB.survey.progressLabel': 'تقدّم الاستبيان',
    'screensB.survey.answered': 'أُجيب عن {answered} من {total}',
    'screensB.survey.q1': 'ما احتمال أن توصي صديقًا بـ Hearth؟',
    'screensB.survey.q1Note': '٠ تعني أبدًا، و١٠ تعني أنك أخبرته بالفعل.',
    'screensB.survey.npsGroup': 'درجة التوصية',
    'screensB.survey.scaleAria': '{row}: {rating}',
    'screensB.survey.q2': 'ما الذي تودّ أن نصلحه أولًا؟',
    'screensB.survey.q2Note': 'اختر ما شئت منها.',
    'screensB.survey.q3': 'أي شيء آخر؟',
    'screensB.survey.optional': 'اختياري',
    'screensB.survey.q3Placeholder':
      'الجيد والسيئ والتفاصيل الدقيقة — كل ذلك يفيدنا.',
    'screensB.survey.emailOptIn': 'يمكنكم مراسلتي بشأن هذا',
    'screensB.survey.send': 'إرسال الرأي',

    /* -------------------------------------------------------------- thread */
    'screensB.thread.allTickets': 'كل الطلبات',
    'screensB.thread.noTicketTitle': 'لا يوجد طلب مفتوح',
    'screensB.thread.noTicketBody': 'اختر محادثة من طلباتك لتقرأها هنا.',
    'screensB.thread.simulated': 'الردود في هذا العرض التجريبي محاكاة.',
    'screensB.thread.typing': '{name} يكتب الآن',
    'screensB.thread.replyPlaceholder': 'اكتب ردًا…',
    'screensB.thread.replyAria': 'اكتب ردًا',
    'screensB.thread.attachTitle': 'إرفاق ملف',
    'screensB.thread.attach': 'إرفاق',
    'screensB.thread.attachToast': 'المرفقات غير متاحة في هذا العرض التجريبي',
    'screensB.thread.markSolved': 'تعليمه كمحلول',
    'screensB.thread.sendReply': 'إرسال الرد',

    /* ---------------------------------------------------------------- tour */
    'screensB.tour.progress': '{n} / {total}',
    'screensB.tour.stepAria': 'الخطوة {n} من {total}: {title}',
    'screensB.tour.skip': 'تخطي الجولة',
    'screensB.tour.back': 'رجوع',
    'screensB.tour.finish': 'إنهاء',
    'screensB.tour.next': 'التالي',
    'screensB.tour.finished': 'انتهت الجولة — أهلًا بك',
    'screensB.tour.skipped': 'تم تخطي الجولة — تجدها في التذييل إن أردتها',

    /* --------------------------------------------------------------- trade */
    'screensB.trade.eyebrow': 'لفنيي التركيب والكهربائيين ووكلاء التأجير',
    'screensB.trade.h1': 'فتح حساب تجاري',
    'screensB.trade.lede':
      'أسعار تجارية، وسداد خلال ٣٠ يومًا، وجهة اتصال محددة ترد على الهاتف. تستغرق الموافقة يومَي عمل، والانضمام بلا رسوم.',
    'screensB.trade.doneTitle': 'استُلم الطلب',
    'screensB.trade.previewPortal': 'معاينة بوابة الشركاء',
    'screensB.trade.startAnother': 'بدء طلب آخر',
    'screensB.trade.pickTier': 'اختر فئة',
    'screensB.trade.businessDetails': 'بيانات النشاط',
    'screensB.trade.tradingName': 'الاسم التجاري',
    'screensB.trade.businessType': 'نوع النشاط',
    'screensB.trade.chooseOne': 'اختر واحدًا…',
    'screensB.trade.companyNumber': 'رقم السجل التجاري',
    'screensB.trade.optional': 'اختياري',
    'screensB.trade.vatNumber': 'الرقم الضريبي',
    'screensB.trade.vatHint':
      'غير مسجل ضريبيًا؟ اتركه فارغًا — وسنفتح الحساب شاملًا الضريبة.',
    'screensB.trade.whoWeDealWith': 'من سنتعامل معه',
    'screensB.trade.contactName': 'اسم جهة الاتصال',
    'screensB.trade.workEmail': 'بريد العمل الإلكتروني',
    'screensB.trade.phone': 'الهاتف',
    'screensB.trade.installsAMonth': 'عدد التركيبات شهريًا',
    'screensB.trade.whatDoYouFit': 'ما الذي تركّبه؟',
    'screensB.trade.pickAny': 'اختر ما شئت',
    'screensB.trade.anythingElse': 'هل من شيء آخر ينبغي أن نعرفه؟',
    'screensB.trade.notePlaceholder':
      'الاعتمادات، والمناطق التي تغطيها، أو الحجم الذي تتوقعه.',
    'screensB.trade.apply': 'التقديم على حساب تجاري',
    'screensB.trade.foot':
      'حصلت على الموافقة بالفعل؟ تجد في {link} قائمة مهامك ودفعاتك وتدريبك. وتظهر الأسعار التجارية تلقائيًا بمجرد تسجيل الدخول.',
    'screensB.trade.footLink': 'بوابة الشركاء',

    /* ------------------------------------------------------------- tradein */
    'screensB.tradein.h1': 'كم يساوي جهاز Hearth القديم لديك؟',
    'screensB.tradein.lede':
      'استبدل أي جهاز Hearth عامل بجهازك التالي. نجدّد ما نستطيع ونعيد تدوير الباقي — وتحصل على رصيد شراء في الحالتين.',
    'screensB.tradein.baseValue': 'القيمة الأساسية، {product}',
    'screensB.tradein.conditionRow': 'الحالة: {condition}',
    'screensB.tradein.ageRow': 'العمر: {age}',
    'screensB.tradein.factor': '× {factor}',
    'screensB.tradein.packOrdered': 'طُلبت عبوة الشحن المدفوعة',
    'screensB.tradein.recycleToast':
      'سنرسل إليك ملصق إعادة تدوير مجانيًا بالبريد الإلكتروني',
    'screensB.tradein.doneTitle': 'عبوة الشحن المدفوعة في الطريق',
    'screensB.tradein.doneBody':
      'تصل خلال يومين إلى ثلاثة أيام عمل. أعد الجهاز في العلبة نفسها — الشحن مغطى، ويُضاف الرصيد خلال أسبوع من وصوله إلينا.',
    'screensB.tradein.creditChip': 'رصيد {amount}',
    'screensB.tradein.valueAnother': 'تقييم جهاز آخر',
    'screensB.tradein.whichDevice': 'أي جهاز تستبدله؟',
    'screensB.tradein.whatCondition': 'ما حالته؟',
    'screensB.tradein.howOld': 'كم عمره؟',
    'screensB.tradein.yourQuote': 'عرضك',
    'screensB.tradein.creditFor': 'رصيد شراء مقابل {product}',
    'screensB.tradein.quoteNote':
      'العرض صالح ١٤ يومًا. نفحص الجهاز عند وصوله — فإن لم تطابق الحالة الوصف، نعيد التسعير قبل أن نفعل أي شيء، ونعيده إليك مجانًا إن فضّلت عدم المتابعة.',
    'screensB.tradein.sendPack': 'أرسل لي عبوة شحن مدفوعة',
    'screensB.tradein.justRecycle': 'أعد تدويره فقط',

    /* ------------------------------------------------------------ transfer */
    'screensB.transfer.h1': 'نقل الضمان',
    'screensB.transfer.lede':
      'تبيع جهازًا أو تتركه عند الانتقال؟ تنتقل التغطية المتبقية معه بلا تكلفة. وكل ما على المالك الجديد فعله هو القبول عبر البريد الإلكتروني.',
    'screensB.transfer.doneTitle': 'بدأ النقل',
    'screensB.transfer.registeredDevices': 'أجهزتك المسجّلة',
    'screensB.transfer.transferAnother': 'نقل جهاز آخر',
    'screensB.transfer.whichDevice': 'أي جهاز تسلّمه؟',
    'screensB.transfer.deviceNote': '{serial} · {left}',
    'screensB.transfer.emptyTitle': 'لم يبقَ ما يمكن نقله',
    'screensB.transfer.emptyBody':
      'كل جهاز في هذا الحساب نُقل أو أُزيل بالفعل. سجّل جهازًا أولًا لتصبح تغطيته قابلة للنقل فورًا.',
    'screensB.transfer.registerDevice': 'تسجيل جهاز',
    'screensB.transfer.newOwnerName': 'اسم المالك الجديد',
    'screensB.transfer.theirEmail': 'بريده الإلكتروني',
    'screensB.transfer.whyTransfer': 'لماذا تنقله؟',
    'screensB.transfer.chooseReason': 'اختر سببًا…',
    'screensB.transfer.warning':
      'يزيل النقل الجهاز من منزلك ويمحو سجل مقاطعه نهائيًا. أعده إلى ضبط المصنع أولًا إن لم تكن فعلت — فلن نستطيع استرجاع أي شيء بعد ذلك.',
    'screensB.transfer.start': 'بدء النقل',
    'screensB.transfer.howItWorks': 'كيف يعمل',
    'screensB.transfer.how1':
      'نرسل إلى المالك الجديد رابطًا — صالحًا لمدة ١٤ يومًا.',
    'screensB.transfer.how2': 'يقبله ويضيف الجهاز إلى حساب Hearth الخاص به.',
    'screensB.transfer.how3':
      'تنتقل التغطية المتبقية بتاريخ الشراء الأصلي. لا شيء يُدفع، والسنة الإضافية الممنوحة عند التسجيل تنتقل أيضًا.',

    /* ------------------------------------------------------------ warranty */
    'screensB.warranty.h1': 'تسجيل الضمان',
    'screensB.warranty.lede':
      'يستغرق التسجيل دقيقة ويضيف سنة ثالثة من التغطية مجانًا. كما ستصلك ملاحظات البرامج الثابتة للأجهزة التي تملكها، ولا شيء غير ذلك.',
    'screensB.warranty.needDevice': 'اختر الجهاز الذي تسجّله',
    'screensB.warranty.needSerial': 'أدخل الرقم التسلسلي كاملًا',
    'screensB.warranty.needRetailer': 'أخبرنا أين اشتريته',
    'screensB.warranty.purchasedToday': 'اليوم',
    'screensB.warranty.coverLeft': 'تبقّت ٣ سنوات',
    'screensB.warranty.registered': 'سُجّل الضمان',
    'screensB.warranty.doneTitle': 'سُجّل {name}',
    'screensB.warranty.doneBody':
      'تمتد التغطية حتى {date}. أرسلنا الشهادة إلى sam@example.com — احتفظ بها مع الإيصال.',
    'screensB.warranty.registerAnother': 'تسجيل جهاز آخر',
    'screensB.warranty.makeClaim': 'تقديم مطالبة',
    'screensB.warranty.whichDevice': 'أي جهاز؟',
    'screensB.warranty.serialNumber': 'الرقم التسلسلي',
    'screensB.warranty.serialHelp':
      'على اللوحة الخلفية، وفي التطبيق ضمن قسم "حول".',
    'screensB.warranty.purchaseDate': 'تاريخ الشراء',
    'screensB.warranty.whereBought': 'أين اشتريته؟',
    'screensB.warranty.selectRetailer': 'اختر متجرًا…',
    'screensB.warranty.callout':
      'اشتريته منّا؟ طلبك مغطى بالفعل — والتسجيل يضيف فقط السنة الإضافية والإيصال إلى حسابك.',
    'screensB.warranty.submit': 'تسجيل الضمان',
    'screensB.warranty.listTitle': 'أجهزتك المسجّلة',
    'screensB.warranty.coverTo': 'التغطية حتى {date}',
    'screensB.warranty.claim': 'مطالبة',
    'screensB.warranty.transferLabel': 'نقل هذا الضمان',
    'screensB.warranty.remainingAria': 'الضمان المتبقي لـ {model}',
    'screensB.warranty.emptyTitle': 'لا توجد أجهزة مسجّلة',
    'screensB.warranty.emptyBody':
      'لا شيء مسجّل في هذا الحساب بعد. يضيف التسجيل سنة ثالثة مجانية من التغطية ويستغرق دقيقة تقريبًا.',
    'screensB.warranty.registerDevice': 'تسجيل جهاز',

    /* ---------------------------------------------------------------- wish */
    'screensB.wish.h1': 'قائمة الرغبات',
    'screensB.wish.shareList': 'مشاركة القائمة',
    'screensB.wish.addAllInStock': 'أضف كل المتوفر',
    'screensB.wish.priceDrop': 'انخفاض السعر',
    'screensB.wish.notifyMe': 'أبلغني',
    'screensB.wish.addToBasket': 'أضف إلى السلة',
    'screensB.wish.remove': 'إزالة',
    'screensB.wish.emptyTitle': 'قائمة رغباتك فارغة',
    'screensB.wish.emptyBody':
      'احفظ كل ما تفكر فيه — سنخبرك إن انخفض السعر أو عاد المنتج للتوفر، ولا شيء تنتهي صلاحيته.',
    'screensB.wish.browseBundles': 'تصفح الحزم',
    'screensB.wish.restore': 'إعادة العناصر التجريبية',
    'screensB.wish.othersSaved': 'حفظه آخرون أيضًا',
    'screensB.wish.saveIt': 'احفظه',
  },
} satisfies Record<LocaleTag, Record<string, string>>;
