/**
 * Area: screens, first half — `src/screens/` from A11y through Kb
 * (alphabetical): A11y, About, Appts, Article, Auto, Billing, Board, Breach,
 * Bundles, Category, Claim, Contact, DeleteAcct, Devices, Downloads, Energy,
 * Firmware, Forum, Gift, Guide, Home, Imprint, Installers, Insurance, Kb.
 *
 * Every key is namespaced `screensA.<screen>.<name>` so it cannot collide with
 * another area's bundle.
 *
 * Plural variants are `|`-separated in the locale's own CLDR cardinal order,
 * exactly as `PLURAL_ORDER` in `../index.tsx` declares it:
 *   en/de/fr/da  one | other
 *   cs           one | few | other
 *   zh-CN/zh-TW  other            (a single variant, no `|`)
 *   ar           zero | one | two | few | many | other
 *
 * Money, dates, counts and percentages are NOT baked into these strings: the
 * screens format them through `lib/format` (which is `Intl` all the way down)
 * and pass the result in as a `{placeholder}`.
 *
 * Category.tsx contributes no keys — every string it renders comes from the
 * data seam.
 *
 * NOT translated, by 18-marketplace-launch.md §3.4 and the brand rules: the
 * Hearth brand, Adminium, personal and place names, postal addresses, e-mail
 * addresses, phone numbers, file names, version strings, reference codes, and
 * the literal confirmation word DELETE (the store compares against it).
 */
import type { LocaleTag } from '../locales';

export const screensA = {
  'en-US': {
    /* ------------------------------------------------------------- a11y */
    'screensA.a11y.title': 'Accessibility settings',
    'screensA.a11y.lede':
      'These apply across the help center and the Hearth app on this account. Changes take effect immediately — the preview shows exactly what you’ll get.',
    'screensA.a11y.size': 'Display size',
    'screensA.a11y.sizeNote':
      'Scales every screen in the help center — text, buttons and spacing together. Applies as soon as you pick one.',
    'screensA.a11y.palette': 'Colour palette',
    'screensA.a11y.paletteNote':
      'Status colours are always paired with an icon and a label, never colour alone.',
    'screensA.a11y.sample': 'Live sample',
    'screensA.a11y.sampleTitle': 'Fix a device that shows offline',
    'screensA.a11y.sampleBody':
      'An “offline” label usually clears itself within a few minutes. If it doesn’t, restart the device and check your router hasn’t changed channel.',
    'screensA.a11y.solved': 'Solved',
    'screensA.a11y.pending': 'Pending',
    'screensA.a11y.actionNeeded': 'Action needed',
    'screensA.a11y.readArticle': 'Read the article',
    'screensA.a11y.shortcuts': 'Keyboard shortcuts',
    'screensA.a11y.shortcutsBody':
      'Press {slash} to search from anywhere, {esc} to close any panel.',
    'screensA.a11y.seeAll': 'See all shortcuts',
    'screensA.a11y.appearance': 'Appearance',
    'screensA.a11y.followSystem': 'Follow my system theme',
    'screensA.a11y.save': 'Save settings',
    'screensA.a11y.reset': 'Reset',

    /* ------------------------------------------------------------ about */
    'screensA.about.eyebrow': 'ABOUT HEARTH',
    'screensA.about.h1': 'We build home tech that gets out of the way.',
    'screensA.about.lede':
      'Hearth started in a Bristol workshop in 2015 with one stubborn idea: a smart home should feel calmer than a normal one. Ten years on, we still ship every device with a printed quick-start card and a phone number that a human answers.',
    'screensA.about.stat1': 'Founded in Bristol',
    'screensA.about.stat2': 'Homes running Hearth',
    'screensA.about.stat3': 'People, {count} of them on support',
    'screensA.about.h2Products': 'Fewer devices, better ones',
    'screensA.about.body1':
      'We make four products. That’s on purpose — it means every one of them gets firmware support for at least seven years, and our support team knows all of them inside out.',
    'screensA.about.body2':
      'Everything is designed in Bristol and assembled in Portugal. Our packaging has been plastic-free since 2021, and any Hearth device can be repaired rather than replaced.',
    'screensA.about.h2Values': 'What we hold to',
    'screensA.about.value1Title': 'A human answers',
    'screensA.about.value1Body':
      'No phone trees, no bot-only queues. Median first reply is under two hours on weekdays.',
    'screensA.about.value2Title': 'Your home, your data',
    'screensA.about.value2Body':
      'Video clips are encrypted end to end and never sold, shared, or used to train anything.',
    'screensA.about.value3Title': 'Built to be fixed',
    'screensA.about.value3Body':
      'Spare parts for seven years, free repair guides, and a trade-in credit for old units.',
    'screensA.about.h2Team': 'The support team',
    'screensA.about.role1': 'Support lead',
    'screensA.about.role2': 'Hardware diagnostics',
    'screensA.about.role3': 'Community manager',
    'screensA.about.role4': 'Returns & warranty',
    'screensA.about.ctaTitle': 'Got a question about your Hearth?',
    'screensA.about.ctaBody':
      'Start in the help center, or talk to the team directly — whichever is quicker for you.',
    'screensA.about.contact': 'Contact us',
    'screensA.about.helpCenter': 'Help center',

    /* ------------------------------------------------------------ appts */
    'screensA.appts.confirmed': 'Confirmed',
    'screensA.appts.awaiting': 'Awaiting parcel',
    'screensA.appts.completed': 'Completed',
    'screensA.appts.toastCalendar': 'Calendar invite sent',
    'screensA.appts.toastReschedule': 'Pick a new slot below',
    'screensA.appts.toastCancelled': 'Appointment {id} cancelled',
    'screensA.appts.toastReport': 'Service reports aren’t available in this demo',
    'screensA.appts.title': 'Service appointments',
    'screensA.appts.lede':
      'Engineer visits, mail-in repairs and installs, all in one place. Reschedule free up to 24 hours before.',
    'screensA.appts.book': 'Book a visit',
    'screensA.appts.upcoming': 'Upcoming',
    'screensA.appts.past': 'Past',
    'screensA.appts.addCalendar': 'Add to calendar',
    'screensA.appts.reschedule': 'Reschedule',
    'screensA.appts.cancel': 'Cancel',
    'screensA.appts.report': 'Report',
    'screensA.appts.emptyTitle': 'Nothing booked',
    'screensA.appts.emptyBody':
      'When you book a repair or an install, it’ll show up here with the engineer’s details.',

    /* ---------------------------------------------------------- article */
    'screensA.article.saved': 'Saved for later',
    'screensA.article.save': 'Save for later',
    'screensA.article.savedArticles': 'Saved articles',
    'screensA.article.helpful': 'Was this helpful?',
    'screensA.article.yes': 'Yes',
    'screensA.article.no': 'No',
    'screensA.article.related': 'Related articles',

    /* ------------------------------------------------------------- auto */
    'screensA.auto.title': 'Automations',
    'screensA.auto.close': 'Close',
    'screensA.auto.new': 'New automation',
    'screensA.auto.nameLabel': 'Name it',
    'screensA.auto.namePlaceholder': 'e.g. Porch light when someone calls',
    'screensA.auto.when': 'WHEN',
    'screensA.auto.then': 'THEN',
    'screensA.auto.whenLabel': 'this happens',
    'screensA.auto.thenLabel': 'do this',
    'screensA.auto.chooseTrigger': 'Choose a trigger…',
    'screensA.auto.chooseAction': 'Choose an action…',
    'screensA.auto.create': 'Create automation',
    'screensA.auto.cancel': 'Cancel',
    'screensA.auto.badgeNew': 'New',
    'screensA.auto.toggleLabel': 'Enable or pause',
    'screensA.auto.deleteLabel': 'Delete automation',
    'screensA.auto.emptyTitle': 'No automations yet',
    'screensA.auto.emptyBody':
      'Automations are one trigger and one action — start with something small, like the porch light coming on when the doorbell sees someone after dark.',
    'screensA.auto.emptyAction': 'Create your first one',
    'screensA.auto.note':
      'Automations run on your devices, not our cloud — they keep working during an outage and when your internet drops.',

    /* ---------------------------------------------------------- billing */
    'screensA.billing.title': 'Billing & invoices',
    'screensA.billing.export': 'Export all as CSV',
    'screensA.billing.currentPlan': 'Current plan',
    'screensA.billing.changePlan': 'Change plan',
    'screensA.billing.applyCredit': 'Apply credit',
    'screensA.billing.paymentMethod': 'Payment method',
    'screensA.billing.cardMeta': 'Visa · expires {exp}',
    'screensA.billing.credit': 'Account credit',
    'screensA.billing.updateCard': 'Update card',
    'screensA.billing.history': 'History',
    'screensA.billing.periodLabel': 'Invoice period',
    'screensA.billing.note':
      'Hardware invoices are issued by Hearth Home Ltd. and include VAT at 20%. Plan invoices show the period they cover — cancel mid-period and we refund the unused days automatically.',

    /* ------------------------------------------------------------ board */
    'screensA.board.title': 'Referral leaderboard',
    'screensA.board.lede':
      'Top referrers this quarter. Everyone still gets {amount} a friend — the leaderboard is just for the bonus prizes.',
    'screensA.board.quarter': 'This quarter',
    'screensA.board.allTime': 'All time',
    'screensA.board.periodLabel': 'Leaderboard period',
    'screensA.board.you': 'You',
    'screensA.board.friendsJoined': 'friends joined',
    'screensA.board.invite': 'Invite someone',
    'screensA.board.prizes': 'Bonus prizes',
    'screensA.board.legal':
      'Only referrals whose order has shipped are counted, and self-referrals are removed automatically. Prizes are credited to your account within a week of the quarter ending. Ranks update hourly.',

    /* ----------------------------------------------------------- breach */
    'screensA.breach.badge': 'Security notice',
    'screensA.breach.published': 'published {published} · updated {updated}',
    'screensA.breach.h1':
      'A third-party email provider exposed some customer email addresses',
    'screensA.breach.lede':
      'On 22 July we found that a supplier we use to send order emails had a misconfigured backup. Email addresses and order reference numbers were readable for about 40 hours. No passwords, payment details, video clips or addresses were involved.',
    'screensA.breach.statusTitle': 'Contained and closed',
    'screensA.breach.statusText':
      'The backup was secured within two hours of discovery. The supplier has been audited and the affected system retired.',
    'screensA.breach.tableHead': 'What was and wasn’t affected',
    'screensA.breach.affected': 'Am I affected?',
    'screensA.breach.checkIntro':
      'Everyone affected was emailed on 24 July. You can also check here — we only compare against the list of exposed addresses, and we don’t store what you type.',
    'screensA.breach.emailLabel': 'Your email address',
    'screensA.breach.check': 'Check',
    'screensA.breach.steps': 'What we’d suggest doing',
    'screensA.breach.timeline': 'Timeline',
    'screensA.breach.regulator': 'Regulator',
    'screensA.breach.regulatorText':
      'Reported to the ICO on {date}, reference {ref}. You can complain to them directly at any time.',
    'screensA.breach.questions': 'Questions',
    'screensA.breach.questionsText':
      'Our data protection lead answers these personally at {email}.',
    'screensA.breach.contact': 'Contact us',
    'screensA.breach.disclaimer':
      'This is a demo portal. The incident described here is fictional and no real data is involved.',

    /* ---------------------------------------------------------- bundles */
    'screensA.bundles.title': 'Bundle deals',
    'screensA.bundles.lede':
      'Buy devices together and the discount is applied at checkout — no codes. Bundles ship as one parcel and share a single two-year warranty start date.',
    'screensA.bundles.save': 'Save {save}',
    'screensA.bundles.add': 'Add bundle',
    'screensA.bundles.byoTitle': 'Build your own',
    'screensA.bundles.byoSub': 'Three or more devices takes 10% off automatically.',
    'screensA.bundles.noteDiscount': '10% bundle discount applied',
    'screensA.bundles.noteMore': '{count} more for 10% off|{count} more for 10% off',
    'screensA.bundles.notePick': 'pick three or more',
    'screensA.bundles.toastMin': 'Pick at least two devices',
    'screensA.bundles.toastAddedDiscount': 'Bundle added — 10% off applied',
    'screensA.bundles.toastAddedPlain': 'Bundle added — no discount yet',
    'screensA.bundles.toastAddedNamed': '{name} bundle added — saving {save}',
    'screensA.bundles.groupLabel': 'Devices in your bundle',
    'screensA.bundles.selected': '{devices} selected',
    'screensA.bundles.addMine': 'Add my bundle',

    /* ------------------------------------------------------------ claim */
    'screensA.claim.toastFiles': 'That’s all the demo files',
    'screensA.claim.toastFault': 'Tell us a little more about the fault',
    'screensA.claim.toastSubmitted': 'Claim submitted',
    'screensA.claim.doneTitle': 'Claim received',
    'screensA.claim.doneBody':
      'We’ll assess it within two working days. Keep the device to hand — we may ask for a photo of the serial plate.',
    'screensA.claim.outcomeChip': '{outcome} requested',
    'screensA.claim.tl1Note': 'We have your description and photos.',
    'screensA.claim.tl2Label': 'Assessment',
    'screensA.claim.tl2Note': 'An engineer reviews it within two working days.',
    'screensA.claim.tl3Label': '{outcome} arranged',
    'screensA.claim.tl3Note': 'We’ll confirm by email and book anything needed.',
    'screensA.claim.bookRepair': 'Book a repair slot',
    'screensA.claim.another': 'Start another claim',
    'screensA.claim.h1': 'Make a warranty claim',
    'screensA.claim.lede':
      'Two-year cover as standard, three if you registered. Faults from normal use are covered; accidental damage and water ingress aren’t.',
    'screensA.claim.whichDevice': 'Which device is faulty?',
    'screensA.claim.deviceNote': '{serial} · cover to {expires}',
    'screensA.claim.faultLabel': 'What’s gone wrong?',
    'screensA.claim.faultPlaceholder':
      'Describe the fault, when it started, and anything you’ve already tried.',
    'screensA.claim.preferredOutcome': 'Preferred outcome',
    'screensA.claim.photos': 'Photos of the fault',
    'screensA.claim.addPhoto': 'Add photo',
    'screensA.claim.submit': 'Submit claim',

    /* ---------------------------------------------------------- contact */
    'screensA.contact.toastMissing': 'Add your name, email and a short message',
    'screensA.contact.toastSent': 'Message sent — we’ll reply within a day',
    'screensA.contact.h1': 'Contact us',
    'screensA.contact.lede':
      'Support is open Monday to Friday, 8am–7pm UK time, and Saturday 9am–2pm. Pick whichever channel suits you.',
    'screensA.contact.chat': 'Live chat',
    'screensA.contact.chatBody': 'Fastest option. Typical wait under two minutes.',
    'screensA.contact.online': 'Online now',
    'screensA.contact.email': 'Email',
    'screensA.contact.emailBody': 'We reply within one working day.',
    'screensA.contact.phone': 'Phone',
    'screensA.contact.phoneBody': 'Best for urgent install or safety questions.',
    'screensA.contact.ticket': 'Open a ticket',
    'screensA.contact.ticketBody': 'Best when you can attach photos or logs.',
    'screensA.contact.startTicket': 'Start a ticket',
    'screensA.contact.formTitle': 'Send us a note',
    'screensA.contact.formLede': 'For anything that isn’t about a specific device.',
    'screensA.contact.name': 'Your name',
    'screensA.contact.message': 'Message',
    'screensA.contact.messagePlaceholder': 'How can we help?',
    'screensA.contact.send': 'Send message',
    'screensA.contact.headOffice': 'Head office',
    'screensA.contact.returnsDepot': 'Returns depot',
    'screensA.contact.returnsBody':
      'Don’t post returns to the office — start a return first and use the prepaid label you get by email.',
    'screensA.contact.returnsLink': 'How returns work',

    /* ----------------------------------------------------------- delete */
    'screensA.delete.step1': 'What goes',
    'screensA.delete.step2': 'Alternatives',
    'screensA.delete.step3': 'Confirm',
    'screensA.delete.scheduledTitle': 'Deletion scheduled',
    'screensA.delete.keep': 'Keep my account',
    'screensA.delete.downloadFirst': 'Download my data first',
    'screensA.delete.h1': 'Delete your account',
    'screensA.delete.lede':
      'We’ll walk you through what goes and what stays. Nothing happens until the last step, and you get 30 days to change your mind.',
    'screensA.delete.h2Things': 'What happens to your things',
    'screensA.delete.textThings':
      'Your devices keep working locally — schedules, alerts and local recording all carry on. It’s the account and everything in our cloud that goes.',
    'screensA.delete.calloutCopy':
      'Take a copy first if you want one — a zip of your account, devices, schedules and clip index, usually ready in ten minutes.',
    'screensA.delete.h2Before': 'Before you go',
    'screensA.delete.textBefore':
      'These often solve the reason people leave. Skip them if you’ve already decided — we won’t ask twice.',
    'screensA.delete.reasonLabel': 'Why are you leaving?',
    'screensA.delete.reasonOptional': 'Optional, but it helps',
    'screensA.delete.reasonPlaceholder': 'Prefer not to say',
    'screensA.delete.h2Confirm': 'Confirm it’s you',
    'screensA.delete.textConfirm':
      'Type {word} to confirm. We’ll email you a link too — the account isn’t touched until you follow it.',
    'screensA.delete.phraseLabel': 'Type DELETE',
    'screensA.delete.calloutDanger':
      'After 30 days this can’t be undone by anyone, including us. Clips, schedules, order history and any remaining credit go with it.',
    'screensA.delete.back': 'Back',
    'screensA.delete.schedule': 'Schedule deletion',
    'screensA.delete.continue': 'Continue',
    'screensA.delete.cancel': 'Cancel and keep my account',

    /* ---------------------------------------------------------- devices */
    'screensA.devices.online': 'Online',
    'screensA.devices.batteryLow': 'Battery low',
    'screensA.devices.offline': 'Offline',
    'screensA.devices.summaryOffline':
      '{devices} · {count} offline · armed since {time}|{devices} · {count} offline · armed since {time}',
    'screensA.devices.summaryAll': '{devices} · all reachable · armed since {time}',
    'screensA.devices.unread': '{count} unread|{count} unread',
    'screensA.devices.allCaught': 'All caught up',
    'screensA.devices.memberLine':
      '{people} · {count} invite pending|{people} · {count} invites pending',
    'screensA.devices.liveLine':
      '{cameras} · {count} clip today|{cameras} · {count} clips today',
    'screensA.devices.autoLine': '{running} running, {paused} paused',
    'screensA.devices.toastOn': '{name} · {label} on',
    'screensA.devices.toastOff': '{name} · {label} off',
    'screensA.devices.toastAdd': 'Adding devices happens in the Hearth app',
    'screensA.devices.add': 'Add a device',
    'screensA.devices.energy': 'Energy insights',
    'screensA.devices.liveView': 'Live view',
    'screensA.devices.automations': 'Automations',
    'screensA.devices.notifications': 'Notifications',
    'screensA.devices.household': 'Household',

    /* -------------------------------------------------------- downloads */
    'screensA.downloads.appIphone': 'Hearth for iPhone',
    'screensA.downloads.appAndroid': 'Hearth for Android',
    'screensA.downloads.toastStore': 'App store links are disabled in this demo',
    'screensA.downloads.h1': 'Downloads & manuals',
    'screensA.downloads.lede':
      'Manuals, quick-start cards, wiring diagrams and installer tools. Everything here is free and doesn’t need an account.',
    'screensA.downloads.toastFile': 'Downloading {file}',
    'screensA.downloads.getFile': 'Get file',
    'screensA.downloads.download': 'Download',
    'screensA.downloads.getApp': 'Get the app',

    /* ----------------------------------------------------------- energy */
    'screensA.energy.week': 'Week',
    'screensA.energy.month': 'Month',
    'screensA.energy.year': 'Year',
    'screensA.energy.h1': 'Energy insights',
    'screensA.energy.lede':
      'Worked out from your thermostat and plugs. Estimates use your tariff — change it in the app if it’s out of date.',
    'screensA.energy.periodLabel': 'Period',
    'screensA.energy.byRoom': 'By room',

    /* --------------------------------------------------------- firmware */
    'screensA.firmware.h1': 'Firmware release notes',
    'screensA.firmware.lede':
      'Updates install overnight on their own. You can always nudge one by hand in the app under Settings → About.',
    'screensA.firmware.allDevices': 'All devices',
    'screensA.firmware.rolling': 'Rolling out',

    /* ------------------------------------------------------------ forum */
    'screensA.forum.toastPost': 'Posting is disabled in this demo',
    'screensA.forum.h1': 'Community forum',
    'screensA.forum.lede':
      'Swap setups, automations and fixes with other Hearth owners. Hearth staff drop in daily — look for the badge.',
    'screensA.forum.start': 'Start a discussion',
    'screensA.forum.answered': 'Answered',
    'screensA.forum.inCat': 'in {cat}',
    'screensA.forum.answerFrom': 'Answer from {name}',
    'screensA.forum.reply': 'Reply in thread',
    'screensA.forum.askSupport': 'Ask support instead',
    'screensA.forum.emptyTitle': 'No discussions here yet',
    'screensA.forum.emptyBody':
      'Nothing in this category so far. Start the first thread and it will sit at the top for everyone.',
    'screensA.forum.thisWeek': 'This week',
    'screensA.forum.newPosts': 'new posts',
    'screensA.forum.answeredStat': 'answered',
    'screensA.forum.topContributors': 'Top contributors',
    'screensA.forum.helpfulPosts': '{count} helpful post|{count} helpful posts',
    'screensA.forum.rules': 'House rules',
    'screensA.forum.rulesBody':
      'Be kind, keep it on-topic, and never post serial numbers or order details in public threads.',

    /* ------------------------------------------------------------- gift */
    'screensA.gift.whenNow': 'Right away',
    'screensA.gift.whenTomorrow': 'Tomorrow morning',
    'screensA.gift.whenDate': 'On a date I choose',
    'screensA.gift.sentNow':
      'It’s on its way to {where} right now, with your message attached.',
    'screensA.gift.theirInbox': 'their inbox',
    'screensA.gift.sentLater':
      'We’ll deliver it on the morning you picked, with your message attached.',
    'screensA.gift.toastMin': 'Gift cards start at {min}',
    'screensA.gift.toastWho': 'Who is it for?',
    'screensA.gift.toastEmail': 'Add their email address',
    'screensA.gift.toastSent': 'Gift card sent',
    'screensA.gift.toastCode': 'Enter the full code from the email',
    'screensA.gift.toastBalance': '{amount} added to your balance',
    'screensA.gift.buyAnother': 'Buy another',
    'screensA.gift.h1': 'Gift cards',
    'screensA.gift.lede':
      'Spendable on any Hearth device, spare part or Hearth Care plan. No expiry, no fees, and refundable within 14 days if it’s unused.',
    'screensA.gift.design': 'Pick a design',
    'screensA.gift.amount': 'Amount',
    'screensA.gift.other': 'Other',
    'screensA.gift.customPlaceholder': 'Any amount from {min} to {max}',
    'screensA.gift.customAria': 'Custom gift card amount',
    'screensA.gift.recipient': 'Recipient’s name',
    'screensA.gift.theirEmail': 'Their email',
    'screensA.gift.message': 'Message',
    'screensA.gift.optional': 'Optional',
    'screensA.gift.messagePlaceholder': 'Happy birthday — go make the house clever.',
    'screensA.gift.whenLabel': 'When should we send it?',
    'screensA.gift.buy': 'Buy {amount} gift card',
    'screensA.gift.preview': 'Preview',
    'screensA.gift.for': 'For {name}',
    'screensA.gift.someoneLucky': 'someone lucky',
    'screensA.gift.messageHere': 'Your message appears here.',
    'screensA.gift.foot': 'no expiry · {url}',
    'screensA.gift.redeem': 'Redeem a card',
    'screensA.gift.codeAria': 'Gift card code',
    'screensA.gift.addBalance': 'Add to balance',
    'screensA.gift.yourBalance': 'Your balance',

    /* ------------------------------------------------------------ guide */
    'screensA.guide.buyCard': 'Buy a gift card instead',
    'screensA.guide.filterLabel': 'Filter the gift guide',
    'screensA.guide.addBasket': 'Add to basket',
    'screensA.guide.saveLater': 'Save for later',
    'screensA.guide.delivery': 'Delivery in time',
    'screensA.guide.wrapHead': 'Gift-ready as standard',
    'screensA.guide.wrapText':
      'Plastic-free boxes, no prices on the packing slip, and a handwritten card if you add a message at checkout. Returns run to 31 January on anything bought from November.',
    'screensA.guide.returnsLink': 'How extended returns work',

    /* ------------------------------------------------------------- home */
    'screensA.home.browse': 'Browse by topic',
    'screensA.home.popular': 'Popular articles',
    'screensA.home.ctaTitle': 'Can’t find what you need?',
    'screensA.home.ctaBody':
      'Open a ticket and we’ll take it from here. Most replies land within a day.',
    'screensA.home.openTicket': 'Open a ticket',

    /* ---------------------------------------------------------- imprint */
    'screensA.imprint.termCompany': 'Registered company',
    'screensA.imprint.termAddress': 'Registered address',
    'screensA.imprint.termDirectors': 'Managing directors',
    'screensA.imprint.termNumber': 'Company number',
    'screensA.imprint.termVat': 'VAT ID',
    'screensA.imprint.termContact': 'Contact',
    'screensA.imprint.termResponsible': 'Responsible for content',
    'screensA.imprint.responsibleValue': '{name}, address as above',
    'screensA.imprint.h1': 'Imprint',
    'screensA.imprint.lede':
      'Legally required company information for Hearth Home Ltd. and this website.',
    'screensA.imprint.updated': 'Last updated {date}',
    'screensA.imprint.h2Adr': 'Consumer dispute resolution',
    'screensA.imprint.bodyAdr':
      'We take part in the independent Retail ADR scheme. If we can’t settle a complaint between us, you can refer it to Retail ADR free of charge. Our support team will send you the case reference and forms on request.',
    'screensA.imprint.h2Content': 'Liability for content',
    'screensA.imprint.bodyContent':
      'We prepare the content of these pages with care, but we can’t guarantee that every article stays accurate as firmware and app versions change. Where an article conflicts with the printed safety guide in the box, the printed guide takes precedence.',
    'screensA.imprint.h2Links': 'Liability for links',
    'screensA.imprint.bodyLinks':
      'Some articles link to carrier tracking, app stores, or community posts we don’t control. We check external links when we add them, but we aren’t responsible for what changes on those pages later.',
    'screensA.imprint.h2Copyright': 'Copyright',
    'screensA.imprint.bodyCopyright':
      'All text, illustrations, and product photography on this site belong to Hearth Home Ltd. unless stated otherwise. You’re welcome to quote a help article with a link back; please ask before reproducing a full page.',
    'screensA.imprint.callout':
      'This is a demo portal built with Adminium. Every company detail, address, and registration number on this page is fictional.',

    /* ------------------------------------------------------- installers */
    'screensA.installers.radius': '{count} mile|{count} miles',
    'screensA.installers.count':
      '{installers} within {count} mile|{installers} within {count} miles',
    'screensA.installers.toastPostcode': 'Enter a postcode to search',
    'screensA.installers.toastFound':
      '{count} installer near {postcode}|{count} installers near {postcode}',
    'screensA.installers.toastCall': 'Calling isn’t available in this demo',
    'screensA.installers.toastRequest': 'Request sent to {name}',
    'screensA.installers.h1': 'Find an approved installer',
    'screensA.installers.lede':
      'Every installer here is trained on Hearth hardware, insured, and rated only by customers who actually booked. Wiring a doorbell or swapping a thermostat usually takes under two hours.',
    'screensA.installers.postcode': 'Postcode',
    'screensA.installers.within': 'Within',
    'screensA.installers.find': 'Find installers',
    'screensA.installers.sorted': 'sorted by distance',
    'screensA.installers.approved': 'Approved',
    'screensA.installers.call': 'Call',
    'screensA.installers.request': 'Request a visit',
    'screensA.installers.note':
      'Installers are independent businesses. Work booked through Hearth is covered by our two-year installation guarantee — keep the invoice and we’ll handle any dispute.',

    /* -------------------------------------------------------- insurance */
    'screensA.insurance.retention':
      'Your plan keeps clips for {days} days, so anything before {date} has already gone. Ask us as early as you can — once a clip expires we can’t recover it.',
    'screensA.insurance.h1': 'Insurance claims',
    'screensA.insurance.lede':
      'Insurers usually want the footage, the timestamps and proof the device was working. We can put all three in one pack — free, and normally ready within an hour.',
    'screensA.insurance.pack': 'What’s in an evidence pack',
    'screensA.insurance.packText':
      'Original clips, a signed timestamp log, device status history and a PDF summary an adjuster can read.',
    'screensA.insurance.privacy': 'We never talk to your insurer',
    'screensA.insurance.privacyText':
      'The pack goes to you. Nothing is shared with anyone unless you send it, or a court orders it.',
    'screensA.insurance.yourClaims': 'Your claims',
    'screensA.insurance.emailInsurer': 'Email to insurer',
    'screensA.insurance.requestTitle': 'Request an evidence pack',
    'screensA.insurance.what': 'What happened?',
    'screensA.insurance.date': 'Date of the incident',
    'screensA.insurance.window': 'Time window to cover',
    'screensA.insurance.ref': 'Insurer or reference',
    'screensA.insurance.optional': 'Optional',
    'screensA.insurance.refPlaceholder': 'e.g. Aviva · claim 4471882',
    'screensA.insurance.note': 'Anything the adjuster should know?',
    'screensA.insurance.notePlaceholder':
      'What was damaged or taken, and roughly when you noticed.',
    'screensA.insurance.submit': 'Build my evidence pack',

    /* --------------------------------------------------------------- kb */
    'screensA.kb.h1': 'Search the knowledge base',
    'screensA.kb.placeholder':
      'Search {count} article — try “reset” or “offline”|Search {count} articles — try “reset” or “offline”',
    'screensA.kb.clear': 'Clear',
    'screensA.kb.sortLabel': 'Sort results',
    'screensA.kb.sortRelevance': 'Most relevant',
    'screensA.kb.sortShort': 'Quickest read',
    'screensA.kb.sortAz': 'A – Z',
    'screensA.kb.emptyTitle': 'Nothing matched “{query}”',
    'screensA.kb.emptyBody':
      'Try fewer words, or one of these instead — most people find what they need in the first result.',
    'screensA.kb.emptyAction': 'Ask us instead',
    'screensA.kb.alsoSearch': 'People also search:',
  },

  'de-DE': {
    /* ------------------------------------------------------------- a11y */
    'screensA.a11y.title': 'Einstellungen für Barrierefreiheit',
    'screensA.a11y.lede':
      'Diese Einstellungen gelten im gesamten Hilfecenter und in der Hearth-App dieses Kontos. Änderungen wirken sofort — die Vorschau zeigt genau das Ergebnis.',
    'screensA.a11y.size': 'Anzeigegröße',
    'screensA.a11y.sizeNote':
      'Skaliert jede Ansicht im Hilfecenter — Text, Schaltflächen und Abstände zusammen. Gilt, sobald Sie eine Größe wählen.',
    'screensA.a11y.palette': 'Farbpalette',
    'screensA.a11y.paletteNote':
      'Statusfarben stehen immer zusammen mit einem Symbol und einer Beschriftung, nie allein.',
    'screensA.a11y.sample': 'Live-Beispiel',
    'screensA.a11y.sampleTitle': 'Ein Gerät reparieren, das offline angezeigt wird',
    'screensA.a11y.sampleBody':
      'Der Hinweis „offline“ verschwindet meist innerhalb weniger Minuten von selbst. Wenn nicht, starten Sie das Gerät neu und prüfen Sie, ob Ihr Router den Kanal gewechselt hat.',
    'screensA.a11y.solved': 'Gelöst',
    'screensA.a11y.pending': 'Ausstehend',
    'screensA.a11y.actionNeeded': 'Aktion nötig',
    'screensA.a11y.readArticle': 'Beitrag lesen',
    'screensA.a11y.shortcuts': 'Tastenkürzel',
    'screensA.a11y.shortcutsBody':
      'Mit {slash} suchen Sie von überall, mit {esc} schließen Sie jedes Panel.',
    'screensA.a11y.seeAll': 'Alle Tastenkürzel',
    'screensA.a11y.appearance': 'Darstellung',
    'screensA.a11y.followSystem': 'Systemdesign übernehmen',
    'screensA.a11y.save': 'Einstellungen speichern',
    'screensA.a11y.reset': 'Zurücksetzen',

    /* ------------------------------------------------------------ about */
    'screensA.about.eyebrow': 'ÜBER HEARTH',
    'screensA.about.h1': 'Wir bauen Haustechnik, die nicht im Weg steht.',
    'screensA.about.lede':
      'Hearth begann 2015 in einer Werkstatt in Bristol mit einer sturen Idee: Ein smartes Zuhause sollte ruhiger wirken als ein normales. Zehn Jahre später liegt jedem Gerät noch immer eine gedruckte Kurzanleitung bei — und eine Telefonnummer, an der ein Mensch abnimmt.',
    'screensA.about.stat1': 'Gegründet in Bristol',
    'screensA.about.stat2': 'Haushalte mit Hearth',
    'screensA.about.stat3': 'Mitarbeitende, {count} davon im Support',
    'screensA.about.h2Products': 'Weniger Geräte, dafür bessere',
    'screensA.about.body1':
      'Wir machen vier Produkte. Das ist Absicht — so bekommt jedes mindestens sieben Jahre lang Firmware-Updates, und unser Support kennt sie alle in- und auswendig.',
    'screensA.about.body2':
      'Alles wird in Bristol entwickelt und in Portugal gefertigt. Unsere Verpackung ist seit 2021 plastikfrei, und jedes Hearth-Gerät lässt sich reparieren statt ersetzen.',
    'screensA.about.h2Values': 'Woran wir festhalten',
    'screensA.about.value1Title': 'Ein Mensch antwortet',
    'screensA.about.value1Body':
      'Keine Telefonmenüs, keine reinen Bot-Warteschlangen. Die erste Antwort kommt werktags im Median in unter zwei Stunden.',
    'screensA.about.value2Title': 'Ihr Zuhause, Ihre Daten',
    'screensA.about.value2Body':
      'Videoclips sind Ende-zu-Ende verschlüsselt und werden nie verkauft, weitergegeben oder zum Trainieren verwendet.',
    'screensA.about.value3Title': 'Zum Reparieren gebaut',
    'screensA.about.value3Body':
      'Ersatzteile für sieben Jahre, kostenlose Reparaturanleitungen und ein Ankaufsbonus für Altgeräte.',
    'screensA.about.h2Team': 'Das Support-Team',
    'screensA.about.role1': 'Support-Leitung',
    'screensA.about.role2': 'Hardware-Diagnose',
    'screensA.about.role3': 'Community-Management',
    'screensA.about.role4': 'Rückgaben & Garantie',
    'screensA.about.ctaTitle': 'Eine Frage zu Ihrem Hearth?',
    'screensA.about.ctaBody':
      'Fangen Sie im Hilfecenter an oder sprechen Sie direkt mit dem Team — je nachdem, was schneller geht.',
    'screensA.about.contact': 'Kontakt',
    'screensA.about.helpCenter': 'Hilfecenter',

    /* ------------------------------------------------------------ appts */
    'screensA.appts.confirmed': 'Bestätigt',
    'screensA.appts.awaiting': 'Wartet auf Paket',
    'screensA.appts.completed': 'Abgeschlossen',
    'screensA.appts.toastCalendar': 'Kalendereinladung gesendet',
    'screensA.appts.toastReschedule': 'Wählen Sie unten einen neuen Termin',
    'screensA.appts.toastCancelled': 'Termin {id} storniert',
    'screensA.appts.toastReport': 'Serviceberichte gibt es in dieser Demo nicht',
    'screensA.appts.title': 'Servicetermine',
    'screensA.appts.lede':
      'Technikerbesuche, Einsendereparaturen und Installationen an einem Ort. Bis 24 Stunden vorher kostenlos verschieben.',
    'screensA.appts.book': 'Termin buchen',
    'screensA.appts.upcoming': 'Anstehend',
    'screensA.appts.past': 'Vergangen',
    'screensA.appts.addCalendar': 'Zum Kalender',
    'screensA.appts.reschedule': 'Verschieben',
    'screensA.appts.cancel': 'Stornieren',
    'screensA.appts.report': 'Bericht',
    'screensA.appts.emptyTitle': 'Nichts gebucht',
    'screensA.appts.emptyBody':
      'Sobald Sie eine Reparatur oder Installation buchen, erscheint sie hier samt Angaben zum Techniker.',

    /* ---------------------------------------------------------- article */
    'screensA.article.saved': 'Gemerkt',
    'screensA.article.save': 'Merken',
    'screensA.article.savedArticles': 'Gemerkte Beiträge',
    'screensA.article.helpful': 'War das hilfreich?',
    'screensA.article.yes': 'Ja',
    'screensA.article.no': 'Nein',
    'screensA.article.related': 'Ähnliche Beiträge',

    /* ------------------------------------------------------------- auto */
    'screensA.auto.title': 'Automationen',
    'screensA.auto.close': 'Schließen',
    'screensA.auto.new': 'Neue Automation',
    'screensA.auto.nameLabel': 'Name vergeben',
    'screensA.auto.namePlaceholder': 'z. B. Vorplatzlicht, wenn jemand klingelt',
    'screensA.auto.when': 'WENN',
    'screensA.auto.then': 'DANN',
    'screensA.auto.whenLabel': 'das passiert',
    'screensA.auto.thenLabel': 'mach das',
    'screensA.auto.chooseTrigger': 'Auslöser wählen…',
    'screensA.auto.chooseAction': 'Aktion wählen…',
    'screensA.auto.create': 'Automation anlegen',
    'screensA.auto.cancel': 'Abbrechen',
    'screensA.auto.badgeNew': 'Neu',
    'screensA.auto.toggleLabel': 'Aktivieren oder pausieren',
    'screensA.auto.deleteLabel': 'Automation löschen',
    'screensA.auto.emptyTitle': 'Noch keine Automationen',
    'screensA.auto.emptyBody':
      'Eine Automation besteht aus einem Auslöser und einer Aktion — fangen Sie klein an, etwa mit dem Vorplatzlicht, das angeht, wenn die Türklingel nach Einbruch der Dunkelheit jemanden sieht.',
    'screensA.auto.emptyAction': 'Die erste anlegen',
    'screensA.auto.note':
      'Automationen laufen auf Ihren Geräten, nicht in unserer Cloud — sie funktionieren auch bei einer Störung und wenn Ihr Internet ausfällt.',

    /* ---------------------------------------------------------- billing */
    'screensA.billing.title': 'Abrechnung & Rechnungen',
    'screensA.billing.export': 'Alle als CSV exportieren',
    'screensA.billing.currentPlan': 'Aktueller Tarif',
    'screensA.billing.changePlan': 'Tarif wechseln',
    'screensA.billing.applyCredit': 'Guthaben einlösen',
    'screensA.billing.paymentMethod': 'Zahlungsmethode',
    'screensA.billing.cardMeta': 'Visa · gültig bis {exp}',
    'screensA.billing.credit': 'Kontoguthaben',
    'screensA.billing.updateCard': 'Karte ändern',
    'screensA.billing.history': 'Verlauf',
    'screensA.billing.periodLabel': 'Abrechnungszeitraum',
    'screensA.billing.note':
      'Hardware-Rechnungen stellt Hearth Home Ltd. aus, inklusive 20 % Mehrwertsteuer. Tarifrechnungen weisen den abgedeckten Zeitraum aus — bei einer Kündigung mitten im Zeitraum erstatten wir die ungenutzten Tage automatisch.',

    /* ------------------------------------------------------------ board */
    'screensA.board.title': 'Empfehlungs-Rangliste',
    'screensA.board.lede':
      'Die besten Empfehlungen dieses Quartals. Alle bekommen weiterhin {amount} pro geworbener Person — die Rangliste zählt nur für die Bonuspreise.',
    'screensA.board.quarter': 'Dieses Quartal',
    'screensA.board.allTime': 'Insgesamt',
    'screensA.board.periodLabel': 'Zeitraum der Rangliste',
    'screensA.board.you': 'Sie',
    'screensA.board.friendsJoined': 'geworbene Personen',
    'screensA.board.invite': 'Jemanden einladen',
    'screensA.board.prizes': 'Bonuspreise',
    'screensA.board.legal':
      'Gezählt werden nur Empfehlungen, deren Bestellung versandt wurde; Eigenempfehlungen entfernen wir automatisch. Preise schreiben wir Ihrem Konto innerhalb einer Woche nach Quartalsende gut. Die Ränge werden stündlich aktualisiert.',

    /* ----------------------------------------------------------- breach */
    'screensA.breach.badge': 'Sicherheitshinweis',
    'screensA.breach.published': 'veröffentlicht {published} · aktualisiert {updated}',
    'screensA.breach.h1':
      'Ein externer E-Mail-Dienstleister hat einige Kunden-E-Mail-Adressen offengelegt',
    'screensA.breach.lede':
      'Am 22. Juli haben wir festgestellt, dass ein Dienstleister für unsere Bestell-E-Mails ein falsch konfiguriertes Backup hatte. E-Mail-Adressen und Bestellnummern waren rund 40 Stunden lang lesbar. Passwörter, Zahlungsdaten, Videoclips und Anschriften waren nicht betroffen.',
    'screensA.breach.statusTitle': 'Eingedämmt und geschlossen',
    'screensA.breach.statusText':
      'Das Backup wurde innerhalb von zwei Stunden nach der Entdeckung gesichert. Der Dienstleister wurde auditiert und das betroffene System stillgelegt.',
    'screensA.breach.tableHead': 'Was betroffen war und was nicht',
    'screensA.breach.affected': 'Bin ich betroffen?',
    'screensA.breach.checkIntro':
      'Alle Betroffenen haben am 24. Juli eine E-Mail erhalten. Sie können es auch hier prüfen — wir vergleichen nur mit der Liste der offengelegten Adressen und speichern Ihre Eingabe nicht.',
    'screensA.breach.emailLabel': 'Ihre E-Mail-Adresse',
    'screensA.breach.check': 'Prüfen',
    'screensA.breach.steps': 'Was wir empfehlen',
    'screensA.breach.timeline': 'Zeitverlauf',
    'screensA.breach.regulator': 'Aufsichtsbehörde',
    'screensA.breach.regulatorText':
      'Am {date} an die ICO gemeldet, Aktenzeichen {ref}. Sie können sich jederzeit direkt dort beschweren.',
    'screensA.breach.questions': 'Fragen',
    'screensA.breach.questionsText':
      'Unsere Datenschutzbeauftragte beantwortet sie persönlich unter {email}.',
    'screensA.breach.contact': 'Kontakt',
    'screensA.breach.disclaimer':
      'Dies ist ein Demo-Portal. Der beschriebene Vorfall ist erfunden, echte Daten sind nicht betroffen.',

    /* ---------------------------------------------------------- bundles */
    'screensA.bundles.title': 'Set-Angebote',
    'screensA.bundles.lede':
      'Kaufen Sie Geräte zusammen, wird der Rabatt an der Kasse abgezogen — ganz ohne Code. Sets kommen als ein Paket und teilen sich ein gemeinsames Startdatum der zweijährigen Garantie.',
    'screensA.bundles.save': '{save} sparen',
    'screensA.bundles.add': 'Set hinzufügen',
    'screensA.bundles.byoTitle': 'Set selbst zusammenstellen',
    'screensA.bundles.byoSub': 'Ab drei Geräten gibt es automatisch 10 % Rabatt.',
    'screensA.bundles.noteDiscount': '10 % Set-Rabatt angewendet',
    'screensA.bundles.noteMore':
      'noch {count} für 10 % Rabatt|noch {count} für 10 % Rabatt',
    'screensA.bundles.notePick': 'mindestens drei wählen',
    'screensA.bundles.toastMin': 'Wählen Sie mindestens zwei Geräte',
    'screensA.bundles.toastAddedDiscount': 'Set hinzugefügt — 10 % Rabatt aktiv',
    'screensA.bundles.toastAddedPlain': 'Set hinzugefügt — noch kein Rabatt',
    'screensA.bundles.toastAddedNamed': 'Set {name} hinzugefügt — {save} gespart',
    'screensA.bundles.groupLabel': 'Geräte in Ihrem Set',
    'screensA.bundles.selected': '{devices} ausgewählt',
    'screensA.bundles.addMine': 'Mein Set hinzufügen',

    /* ------------------------------------------------------------ claim */
    'screensA.claim.toastFiles': 'Mehr Demo-Dateien gibt es nicht',
    'screensA.claim.toastFault': 'Beschreiben Sie den Fehler bitte etwas genauer',
    'screensA.claim.toastSubmitted': 'Garantiefall eingereicht',
    'screensA.claim.doneTitle': 'Garantiefall eingegangen',
    'screensA.claim.doneBody':
      'Wir prüfen ihn innerhalb von zwei Werktagen. Halten Sie das Gerät bereit — eventuell brauchen wir ein Foto des Typenschilds.',
    'screensA.claim.outcomeChip': '{outcome} gewünscht',
    'screensA.claim.tl1Note': 'Ihre Beschreibung und Ihre Fotos liegen uns vor.',
    'screensA.claim.tl2Label': 'Prüfung',
    'screensA.claim.tl2Note':
      'Ein Techniker prüft den Fall innerhalb von zwei Werktagen.',
    'screensA.claim.tl3Label': '{outcome} veranlasst',
    'screensA.claim.tl3Note': 'Wir bestätigen per E-Mail und buchen alles Nötige.',
    'screensA.claim.bookRepair': 'Reparaturtermin buchen',
    'screensA.claim.another': 'Weiteren Fall melden',
    'screensA.claim.h1': 'Garantiefall melden',
    'screensA.claim.lede':
      'Zwei Jahre Garantie serienmäßig, drei bei registriertem Gerät. Fehler bei normalem Gebrauch sind abgedeckt; Unfallschäden und Wassereintritt nicht.',
    'screensA.claim.whichDevice': 'Welches Gerät ist defekt?',
    'screensA.claim.deviceNote': '{serial} · Garantie bis {expires}',
    'screensA.claim.faultLabel': 'Was ist passiert?',
    'screensA.claim.faultPlaceholder':
      'Beschreiben Sie den Fehler, wann er auftrat und was Sie schon versucht haben.',
    'screensA.claim.preferredOutcome': 'Gewünschte Lösung',
    'screensA.claim.photos': 'Fotos des Defekts',
    'screensA.claim.addPhoto': 'Foto hinzufügen',
    'screensA.claim.submit': 'Fall einreichen',

    /* ---------------------------------------------------------- contact */
    'screensA.contact.toastMissing': 'Name, E-Mail und eine kurze Nachricht fehlen',
    'screensA.contact.toastSent':
      'Nachricht gesendet — wir antworten innerhalb eines Tages',
    'screensA.contact.h1': 'Kontakt',
    'screensA.contact.lede':
      'Der Support ist Montag bis Freitag von 8–19 Uhr (UK-Zeit) und samstags von 9–14 Uhr erreichbar. Wählen Sie den Kanal, der Ihnen passt.',
    'screensA.contact.chat': 'Live-Chat',
    'screensA.contact.chatBody':
      'Der schnellste Weg. Wartezeit meist unter zwei Minuten.',
    'screensA.contact.online': 'Jetzt online',
    'screensA.contact.email': 'E-Mail',
    'screensA.contact.emailBody': 'Wir antworten innerhalb eines Werktags.',
    'screensA.contact.phone': 'Telefon',
    'screensA.contact.phoneBody':
      'Am besten bei dringenden Installations- oder Sicherheitsfragen.',
    'screensA.contact.ticket': 'Ticket eröffnen',
    'screensA.contact.ticketBody':
      'Am besten, wenn Sie Fotos oder Logs anhängen können.',
    'screensA.contact.startTicket': 'Ticket starten',
    'screensA.contact.formTitle': 'Schreiben Sie uns',
    'screensA.contact.formLede': 'Für alles, was kein bestimmtes Gerät betrifft.',
    'screensA.contact.name': 'Ihr Name',
    'screensA.contact.message': 'Nachricht',
    'screensA.contact.messagePlaceholder': 'Wie können wir helfen?',
    'screensA.contact.send': 'Nachricht senden',
    'screensA.contact.headOffice': 'Hauptsitz',
    'screensA.contact.returnsDepot': 'Retourenlager',
    'screensA.contact.returnsBody':
      'Schicken Sie Rücksendungen nicht ans Büro — starten Sie zuerst eine Rücksendung und nutzen Sie das frankierte Label aus der E-Mail.',
    'screensA.contact.returnsLink': 'So funktionieren Rücksendungen',

    /* ----------------------------------------------------------- delete */
    'screensA.delete.step1': 'Was gelöscht wird',
    'screensA.delete.step2': 'Alternativen',
    'screensA.delete.step3': 'Bestätigen',
    'screensA.delete.scheduledTitle': 'Löschung geplant',
    'screensA.delete.keep': 'Konto behalten',
    'screensA.delete.downloadFirst': 'Erst meine Daten laden',
    'screensA.delete.h1': 'Konto löschen',
    'screensA.delete.lede':
      'Wir zeigen Ihnen, was gelöscht wird und was bleibt. Bis zum letzten Schritt passiert nichts, und Sie haben 30 Tage, es sich anders zu überlegen.',
    'screensA.delete.h2Things': 'Was mit Ihren Daten passiert',
    'screensA.delete.textThings':
      'Ihre Geräte laufen lokal weiter — Zeitpläne, Warnungen und lokale Aufnahmen bleiben aktiv. Es geht um das Konto und alles in unserer Cloud.',
    'screensA.delete.calloutCopy':
      'Sichern Sie sich vorher eine Kopie, wenn Sie möchten — ein ZIP mit Konto, Geräten, Zeitplänen und Clip-Index, meist in zehn Minuten fertig.',
    'screensA.delete.h2Before': 'Bevor Sie gehen',
    'screensA.delete.textBefore':
      'Das löst oft genau den Grund für den Abschied. Überspringen Sie es, wenn Sie sich entschieden haben — wir fragen kein zweites Mal.',
    'screensA.delete.reasonLabel': 'Warum gehen Sie?',
    'screensA.delete.reasonOptional': 'Freiwillig, hilft uns aber',
    'screensA.delete.reasonPlaceholder': 'Keine Angabe',
    'screensA.delete.h2Confirm': 'Bestätigen, dass Sie es sind',
    'screensA.delete.textConfirm':
      'Tippen Sie {word}, um zu bestätigen. Wir senden Ihnen zusätzlich einen Link — das Konto bleibt unangetastet, bis Sie ihm folgen.',
    'screensA.delete.phraseLabel': 'DELETE eingeben',
    'screensA.delete.calloutDanger':
      'Nach 30 Tagen kann das niemand mehr rückgängig machen, auch wir nicht. Clips, Zeitpläne, Bestellhistorie und restliches Guthaben gehen mit.',
    'screensA.delete.back': 'Zurück',
    'screensA.delete.schedule': 'Löschung planen',
    'screensA.delete.continue': 'Weiter',
    'screensA.delete.cancel': 'Abbrechen und Konto behalten',

    /* ---------------------------------------------------------- devices */
    'screensA.devices.online': 'Online',
    'screensA.devices.batteryLow': 'Akku schwach',
    'screensA.devices.offline': 'Offline',
    'screensA.devices.summaryOffline':
      '{devices} · {count} offline · scharf seit {time}|{devices} · {count} offline · scharf seit {time}',
    'screensA.devices.summaryAll': '{devices} · alle erreichbar · scharf seit {time}',
    'screensA.devices.unread': '{count} ungelesen|{count} ungelesen',
    'screensA.devices.allCaught': 'Alles erledigt',
    'screensA.devices.memberLine':
      '{people} · {count} Einladung offen|{people} · {count} Einladungen offen',
    'screensA.devices.liveLine':
      '{cameras} · {count} Clip heute|{cameras} · {count} Clips heute',
    'screensA.devices.autoLine': '{running} aktiv, {paused} pausiert',
    'screensA.devices.toastOn': '{name} · {label} ein',
    'screensA.devices.toastOff': '{name} · {label} aus',
    'screensA.devices.toastAdd': 'Geräte fügen Sie in der Hearth-App hinzu',
    'screensA.devices.add': 'Gerät hinzufügen',
    'screensA.devices.energy': 'Energieauswertung',
    'screensA.devices.liveView': 'Live-Ansicht',
    'screensA.devices.automations': 'Automationen',
    'screensA.devices.notifications': 'Benachrichtigungen',
    'screensA.devices.household': 'Haushalt',

    /* -------------------------------------------------------- downloads */
    'screensA.downloads.appIphone': 'Hearth für iPhone',
    'screensA.downloads.appAndroid': 'Hearth für Android',
    'screensA.downloads.toastStore':
      'App-Store-Links sind in dieser Demo deaktiviert',
    'screensA.downloads.h1': 'Downloads & Handbücher',
    'screensA.downloads.lede':
      'Handbücher, Kurzanleitungen, Anschlussdiagramme und Werkzeuge für Installateure. Alles hier ist kostenlos und braucht kein Konto.',
    'screensA.downloads.toastFile': '{file} wird geladen',
    'screensA.downloads.getFile': 'Datei holen',
    'screensA.downloads.download': 'Herunterladen',
    'screensA.downloads.getApp': 'App laden',

    /* ----------------------------------------------------------- energy */
    'screensA.energy.week': 'Woche',
    'screensA.energy.month': 'Monat',
    'screensA.energy.year': 'Jahr',
    'screensA.energy.h1': 'Energieauswertung',
    'screensA.energy.lede':
      'Ermittelt aus Thermostat und Steckdosen. Schätzungen nutzen Ihren Tarif — ändern Sie ihn in der App, falls er veraltet ist.',
    'screensA.energy.periodLabel': 'Zeitraum',
    'screensA.energy.byRoom': 'Nach Raum',

    /* --------------------------------------------------------- firmware */
    'screensA.firmware.h1': 'Firmware-Versionshinweise',
    'screensA.firmware.lede':
      'Updates installieren sich nachts von selbst. Sie können eines jederzeit von Hand anstoßen, in der App unter Einstellungen → Über.',
    'screensA.firmware.allDevices': 'Alle Geräte',
    'screensA.firmware.rolling': 'Wird ausgerollt',

    /* ------------------------------------------------------------ forum */
    'screensA.forum.toastPost': 'Beiträge sind in dieser Demo deaktiviert',
    'screensA.forum.h1': 'Community-Forum',
    'screensA.forum.lede':
      'Tauschen Sie Setups, Automationen und Lösungen mit anderen Hearth-Nutzern. Das Hearth-Team schaut täglich vorbei — achten Sie auf das Abzeichen.',
    'screensA.forum.start': 'Diskussion starten',
    'screensA.forum.answered': 'Beantwortet',
    'screensA.forum.inCat': 'in {cat}',
    'screensA.forum.answerFrom': 'Antwort von {name}',
    'screensA.forum.reply': 'Im Thread antworten',
    'screensA.forum.askSupport': 'Lieber den Support fragen',
    'screensA.forum.emptyTitle': 'Hier gibt es noch keine Diskussionen',
    'screensA.forum.emptyBody':
      'In dieser Kategorie ist bisher nichts los. Starten Sie den ersten Thread — er steht dann für alle ganz oben.',
    'screensA.forum.thisWeek': 'Diese Woche',
    'screensA.forum.newPosts': 'neue Beiträge',
    'screensA.forum.answeredStat': 'beantwortet',
    'screensA.forum.topContributors': 'Top-Mitwirkende',
    'screensA.forum.helpfulPosts':
      '{count} hilfreicher Beitrag|{count} hilfreiche Beiträge',
    'screensA.forum.rules': 'Hausregeln',
    'screensA.forum.rulesBody':
      'Bleiben Sie freundlich und beim Thema, und posten Sie nie Seriennummern oder Bestelldaten in öffentlichen Threads.',

    /* ------------------------------------------------------------- gift */
    'screensA.gift.whenNow': 'Sofort',
    'screensA.gift.whenTomorrow': 'Morgen früh',
    'screensA.gift.whenDate': 'An einem Datum meiner Wahl',
    'screensA.gift.sentNow':
      'Sie ist gerade unterwegs an {where}, mit Ihrer Nachricht.',
    'screensA.gift.theirInbox': 'das Postfach',
    'screensA.gift.sentLater':
      'Wir liefern sie am gewählten Morgen aus, mit Ihrer Nachricht.',
    'screensA.gift.toastMin': 'Geschenkkarten beginnen bei {min}',
    'screensA.gift.toastWho': 'Für wen ist sie?',
    'screensA.gift.toastEmail': 'E-Mail-Adresse ergänzen',
    'screensA.gift.toastSent': 'Geschenkkarte gesendet',
    'screensA.gift.toastCode': 'Geben Sie den vollständigen Code aus der E-Mail ein',
    'screensA.gift.toastBalance': '{amount} zum Guthaben hinzugefügt',
    'screensA.gift.buyAnother': 'Noch eine kaufen',
    'screensA.gift.h1': 'Geschenkkarten',
    'screensA.gift.lede':
      'Einlösbar für jedes Hearth-Gerät, jedes Ersatzteil und jeden Hearth-Care-Tarif. Ohne Ablauf, ohne Gebühren und innerhalb von 14 Tagen erstattbar, solange sie unbenutzt ist.',
    'screensA.gift.design': 'Design wählen',
    'screensA.gift.amount': 'Betrag',
    'screensA.gift.other': 'Andere',
    'screensA.gift.customPlaceholder': 'Beliebiger Betrag von {min} bis {max}',
    'screensA.gift.customAria': 'Eigener Betrag der Geschenkkarte',
    'screensA.gift.recipient': 'Name der beschenkten Person',
    'screensA.gift.theirEmail': 'E-Mail der beschenkten Person',
    'screensA.gift.message': 'Nachricht',
    'screensA.gift.optional': 'Optional',
    'screensA.gift.messagePlaceholder': 'Alles Gute — mach das Haus schlau.',
    'screensA.gift.whenLabel': 'Wann sollen wir sie senden?',
    'screensA.gift.buy': 'Geschenkkarte über {amount} kaufen',
    'screensA.gift.preview': 'Vorschau',
    'screensA.gift.for': 'Für {name}',
    'screensA.gift.someoneLucky': 'jemanden mit Glück',
    'screensA.gift.messageHere': 'Hier erscheint Ihre Nachricht.',
    'screensA.gift.foot': 'ohne Ablauf · {url}',
    'screensA.gift.redeem': 'Karte einlösen',
    'screensA.gift.codeAria': 'Code der Geschenkkarte',
    'screensA.gift.addBalance': 'Zum Guthaben',
    'screensA.gift.yourBalance': 'Ihr Guthaben',

    /* ------------------------------------------------------------ guide */
    'screensA.guide.buyCard': 'Lieber Geschenkkarte kaufen',
    'screensA.guide.filterLabel': 'Geschenkeführer filtern',
    'screensA.guide.addBasket': 'In den Warenkorb',
    'screensA.guide.saveLater': 'Merken',
    'screensA.guide.delivery': 'Rechtzeitig geliefert',
    'screensA.guide.wrapHead': 'Geschenkfertig ohne Aufpreis',
    'screensA.guide.wrapText':
      'Plastikfreie Kartons, keine Preise auf dem Lieferschein und eine handgeschriebene Karte, wenn Sie an der Kasse eine Nachricht hinterlassen. Für alles ab November Gekaufte gilt das Rückgaberecht bis zum 31. Januar.',
    'screensA.guide.returnsLink': 'So funktioniert die verlängerte Rückgabe',

    /* ------------------------------------------------------------- home */
    'screensA.home.browse': 'Nach Thema stöbern',
    'screensA.home.popular': 'Beliebte Beiträge',
    'screensA.home.ctaTitle': 'Nichts Passendes gefunden?',
    'screensA.home.ctaBody':
      'Eröffnen Sie ein Ticket, wir übernehmen ab hier. Die meisten Antworten kommen innerhalb eines Tages.',
    'screensA.home.openTicket': 'Ticket eröffnen',

    /* ---------------------------------------------------------- imprint */
    'screensA.imprint.termCompany': 'Eingetragene Firma',
    'screensA.imprint.termAddress': 'Eingetragene Anschrift',
    'screensA.imprint.termDirectors': 'Geschäftsführung',
    'screensA.imprint.termNumber': 'Handelsregisternummer',
    'screensA.imprint.termVat': 'USt-IdNr.',
    'screensA.imprint.termContact': 'Kontakt',
    'screensA.imprint.termResponsible': 'Inhaltlich verantwortlich',
    'screensA.imprint.responsibleValue': '{name}, Anschrift wie oben',
    'screensA.imprint.h1': 'Impressum',
    'screensA.imprint.lede':
      'Gesetzlich vorgeschriebene Angaben zu Hearth Home Ltd. und zu dieser Website.',
    'screensA.imprint.updated': 'Zuletzt aktualisiert am {date}',
    'screensA.imprint.h2Adr': 'Verbraucherschlichtung',
    'screensA.imprint.bodyAdr':
      'Wir nehmen am unabhängigen Verfahren von Retail ADR teil. Wenn wir eine Beschwerde untereinander nicht klären können, können Sie sie kostenfrei an Retail ADR weitergeben. Unser Support schickt Ihnen auf Wunsch das Aktenzeichen und die Formulare.',
    'screensA.imprint.h2Content': 'Haftung für Inhalte',
    'screensA.imprint.bodyContent':
      'Wir erstellen die Inhalte dieser Seiten mit Sorgfalt, können aber nicht garantieren, dass jeder Beitrag bei wechselnden Firmware- und App-Versionen aktuell bleibt. Widerspricht ein Beitrag der gedruckten Sicherheitsanleitung aus der Verpackung, gilt die gedruckte Anleitung.',
    'screensA.imprint.h2Links': 'Haftung für Links',
    'screensA.imprint.bodyLinks':
      'Einige Beiträge verlinken auf Sendungsverfolgung, App-Stores oder Community-Beiträge, die wir nicht kontrollieren. Wir prüfen externe Links beim Einfügen, sind aber nicht dafür verantwortlich, was sich später dort ändert.',
    'screensA.imprint.h2Copyright': 'Urheberrecht',
    'screensA.imprint.bodyCopyright':
      'Alle Texte, Illustrationen und Produktfotos auf dieser Website gehören Hearth Home Ltd., sofern nicht anders angegeben. Zitate aus einem Hilfebeitrag mit Link zurück sind willkommen; fragen Sie bitte an, bevor Sie eine ganze Seite übernehmen.',
    'screensA.imprint.callout':
      'Dies ist ein Demo-Portal, gebaut mit Adminium. Sämtliche Firmenangaben, Anschriften und Registernummern auf dieser Seite sind erfunden.',

    /* ------------------------------------------------------- installers */
    'screensA.installers.radius': '{count} Meile|{count} Meilen',
    'screensA.installers.count':
      '{installers} im Umkreis von {count} Meile|{installers} im Umkreis von {count} Meilen',
    'screensA.installers.toastPostcode': 'Geben Sie eine Postleitzahl ein',
    'screensA.installers.toastFound':
      '{count} Installateur in der Nähe von {postcode}|{count} Installateure in der Nähe von {postcode}',
    'screensA.installers.toastCall': 'Anrufen ist in dieser Demo nicht möglich',
    'screensA.installers.toastRequest': 'Anfrage an {name} gesendet',
    'screensA.installers.h1': 'Zugelassene Installateure finden',
    'screensA.installers.lede':
      'Alle Installateure hier sind auf Hearth-Hardware geschult, versichert und werden nur von Kundschaft bewertet, die tatsächlich gebucht hat. Eine Türklingel zu verkabeln oder ein Thermostat zu tauschen dauert meist unter zwei Stunden.',
    'screensA.installers.postcode': 'Postleitzahl',
    'screensA.installers.within': 'Umkreis',
    'screensA.installers.find': 'Installateure suchen',
    'screensA.installers.sorted': 'nach Entfernung sortiert',
    'screensA.installers.approved': 'Zugelassen',
    'screensA.installers.call': 'Anrufen',
    'screensA.installers.request': 'Besuch anfragen',
    'screensA.installers.note':
      'Installateure sind selbstständige Betriebe. Über Hearth gebuchte Arbeiten deckt unsere zweijährige Installationsgarantie ab — bewahren Sie die Rechnung auf, wir kümmern uns um jeden Streitfall.',

    /* -------------------------------------------------------- insurance */
    'screensA.insurance.retention':
      'Ihr Tarif bewahrt Clips {days} Tage auf, alles vor dem {date} ist also bereits gelöscht. Fragen Sie so früh wie möglich — ist ein Clip abgelaufen, können wir ihn nicht wiederherstellen.',
    'screensA.insurance.h1': 'Versicherungsfälle',
    'screensA.insurance.lede':
      'Versicherer wollen meist das Videomaterial, die Zeitstempel und einen Nachweis, dass das Gerät lief. Wir packen alle drei in ein Paket — kostenlos und meist innerhalb einer Stunde fertig.',
    'screensA.insurance.pack': 'Was im Beweispaket steckt',
    'screensA.insurance.packText':
      'Originalclips, ein signiertes Zeitstempel-Protokoll, der Verlauf des Gerätestatus und eine PDF-Zusammenfassung für die Sachbearbeitung.',
    'screensA.insurance.privacy': 'Wir sprechen nie mit Ihrer Versicherung',
    'screensA.insurance.privacyText':
      'Das Paket geht an Sie. Es wird mit niemandem geteilt, außer Sie senden es selbst oder ein Gericht ordnet es an.',
    'screensA.insurance.yourClaims': 'Ihre Fälle',
    'screensA.insurance.emailInsurer': 'An Versicherung senden',
    'screensA.insurance.requestTitle': 'Beweispaket anfordern',
    'screensA.insurance.what': 'Was ist passiert?',
    'screensA.insurance.date': 'Datum des Vorfalls',
    'screensA.insurance.window': 'Abzudeckender Zeitraum',
    'screensA.insurance.ref': 'Versicherung oder Aktenzeichen',
    'screensA.insurance.optional': 'Optional',
    'screensA.insurance.refPlaceholder': 'z. B. Aviva · Schaden 4471882',
    'screensA.insurance.note': 'Sollte die Sachbearbeitung etwas wissen?',
    'screensA.insurance.notePlaceholder':
      'Was beschädigt oder entwendet wurde und wann es Ihnen ungefähr aufgefallen ist.',
    'screensA.insurance.submit': 'Beweispaket erstellen',

    /* --------------------------------------------------------------- kb */
    'screensA.kb.h1': 'Wissensdatenbank durchsuchen',
    'screensA.kb.placeholder':
      '{count} Beitrag durchsuchen — etwa „reset“ oder „offline“|{count} Beiträge durchsuchen — etwa „reset“ oder „offline“',
    'screensA.kb.clear': 'Leeren',
    'screensA.kb.sortLabel': 'Ergebnisse sortieren',
    'screensA.kb.sortRelevance': 'Beste Treffer',
    'screensA.kb.sortShort': 'Kürzeste Lesezeit',
    'screensA.kb.sortAz': 'A – Z',
    'screensA.kb.emptyTitle': 'Nichts gefunden für „{query}“',
    'screensA.kb.emptyBody':
      'Versuchen Sie es mit weniger Wörtern oder mit einem dieser Begriffe — die meisten finden schon im ersten Treffer, was sie suchen.',
    'screensA.kb.emptyAction': 'Lieber uns fragen',
    'screensA.kb.alsoSearch': 'Ebenfalls gesucht:',
  },

  /* French: typographic apostrophes throughout, and a NO-BREAK SPACE (written
   * ` ` so it survives every editor) before `? ! : ;`, inside guillemets
   * and before `%`. */
  'fr-FR': {
    /* ------------------------------------------------------------- a11y */
    'screensA.a11y.title': 'Paramètres d’accessibilité',
    'screensA.a11y.lede':
      'Ils s’appliquent à tout le centre d’aide et à l’app Hearth de ce compte. Les changements prennent effet immédiatement — l’aperçu montre exactement le résultat.',
    'screensA.a11y.size': 'Taille d’affichage',
    'screensA.a11y.sizeNote':
      'Met à l’échelle tout le centre d’aide — texte, boutons et espacements ensemble. S’applique dès que vous en choisissez une.',
    'screensA.a11y.palette': 'Palette de couleurs',
    'screensA.a11y.paletteNote':
      'Les couleurs de statut sont toujours accompagnées d’une icône et d’un libellé, jamais seules.',
    'screensA.a11y.sample': 'Aperçu en direct',
    'screensA.a11y.sampleTitle': 'Réparer un appareil affiché hors ligne',
    'screensA.a11y.sampleBody':
      'Une mention « hors ligne » disparaît souvent d’elle-même en quelques minutes. Sinon, redémarrez l’appareil et vérifiez que votre routeur n’a pas changé de canal.',
    'screensA.a11y.solved': 'Résolu',
    'screensA.a11y.pending': 'En attente',
    'screensA.a11y.actionNeeded': 'Action requise',
    'screensA.a11y.readArticle': 'Lire l’article',
    'screensA.a11y.shortcuts': 'Raccourcis clavier',
    'screensA.a11y.shortcutsBody':
      'Appuyez sur {slash} pour rechercher depuis n’importe où, sur {esc} pour fermer un panneau.',
    'screensA.a11y.seeAll': 'Voir tous les raccourcis',
    'screensA.a11y.appearance': 'Apparence',
    'screensA.a11y.followSystem': 'Suivre le thème du système',
    'screensA.a11y.save': 'Enregistrer',
    'screensA.a11y.reset': 'Réinitialiser',

    /* ------------------------------------------------------------ about */
    'screensA.about.eyebrow': 'À PROPOS DE HEARTH',
    'screensA.about.h1': 'Nous concevons une domotique qui se fait oublier.',
    'screensA.about.lede':
      'Hearth est né en 2015 dans un atelier de Bristol, avec une idée tenace : une maison connectée devrait être plus calme qu’une maison ordinaire. Dix ans plus tard, chaque appareil part encore avec une fiche de démarrage imprimée et un numéro auquel un humain répond.',
    'screensA.about.stat1': 'Fondée à Bristol',
    'screensA.about.stat2': 'Foyers équipés Hearth',
    'screensA.about.stat3': 'Personnes, dont {count} au support',
    'screensA.about.h2Products': 'Moins d’appareils, mais meilleurs',
    'screensA.about.body1':
      'Nous fabriquons quatre produits. C’est volontaire — chacun reçoit au moins sept ans de mises à jour, et notre équipe support les connaît tous par cœur.',
    'screensA.about.body2':
      'Tout est conçu à Bristol et assemblé au Portugal. Nos emballages sont sans plastique depuis 2021, et tout appareil Hearth se répare plutôt qu’il ne se remplace.',
    'screensA.about.h2Values': 'Ce à quoi nous tenons',
    'screensA.about.value1Title': 'Un humain répond',
    'screensA.about.value1Body':
      'Pas de serveur vocal, pas de file réservée aux robots. En semaine, la première réponse arrive en moins de deux heures en médiane.',
    'screensA.about.value2Title': 'Votre maison, vos données',
    'screensA.about.value2Body':
      'Les vidéos sont chiffrées de bout en bout et ne sont jamais vendues, partagées ni utilisées pour entraîner quoi que ce soit.',
    'screensA.about.value3Title': 'Conçu pour être réparé',
    'screensA.about.value3Body':
      'Pièces détachées pendant sept ans, guides de réparation gratuits et reprise créditée des anciens appareils.',
    'screensA.about.h2Team': 'L’équipe support',
    'screensA.about.role1': 'Responsable support',
    'screensA.about.role2': 'Diagnostic matériel',
    'screensA.about.role3': 'Animation de la communauté',
    'screensA.about.role4': 'Retours et garantie',
    'screensA.about.ctaTitle': 'Une question sur votre Hearth ?',
    'screensA.about.ctaBody':
      'Commencez par le centre d’aide ou parlez directement à l’équipe — au plus rapide pour vous.',
    'screensA.about.contact': 'Nous contacter',
    'screensA.about.helpCenter': 'Centre d’aide',

    /* ------------------------------------------------------------ appts */
    'screensA.appts.confirmed': 'Confirmé',
    'screensA.appts.awaiting': 'Colis en attente',
    'screensA.appts.completed': 'Terminé',
    'screensA.appts.toastCalendar': 'Invitation d’agenda envoyée',
    'screensA.appts.toastReschedule': 'Choisissez un nouveau créneau ci-dessous',
    'screensA.appts.toastCancelled': 'Rendez-vous {id} annulé',
    'screensA.appts.toastReport':
      'Les rapports d’intervention ne sont pas disponibles dans cette démo',
    'screensA.appts.title': 'Rendez-vous de service',
    'screensA.appts.lede':
      'Visites de technicien, réparations par envoi et installations, au même endroit. Report gratuit jusqu’à 24 heures avant.',
    'screensA.appts.book': 'Réserver une visite',
    'screensA.appts.upcoming': 'À venir',
    'screensA.appts.past': 'Passés',
    'screensA.appts.addCalendar': 'Ajouter à l’agenda',
    'screensA.appts.reschedule': 'Reporter',
    'screensA.appts.cancel': 'Annuler',
    'screensA.appts.report': 'Rapport',
    'screensA.appts.emptyTitle': 'Rien de réservé',
    'screensA.appts.emptyBody':
      'Dès que vous réservez une réparation ou une installation, elle apparaît ici avec les coordonnées du technicien.',

    /* ---------------------------------------------------------- article */
    'screensA.article.saved': 'Enregistré',
    'screensA.article.save': 'Enregistrer',
    'screensA.article.savedArticles': 'Articles enregistrés',
    'screensA.article.helpful': 'Cet article vous a-t-il aidé ?',
    'screensA.article.yes': 'Oui',
    'screensA.article.no': 'Non',
    'screensA.article.related': 'Articles liés',

    /* ------------------------------------------------------------- auto */
    'screensA.auto.title': 'Automatisations',
    'screensA.auto.close': 'Fermer',
    'screensA.auto.new': 'Nouvelle automatisation',
    'screensA.auto.nameLabel': 'Donnez-lui un nom',
    'screensA.auto.namePlaceholder': 'ex. Lumière du porche quand on sonne',
    'screensA.auto.when': 'QUAND',
    'screensA.auto.then': 'ALORS',
    'screensA.auto.whenLabel': 'ceci se produit',
    'screensA.auto.thenLabel': 'fais ceci',
    'screensA.auto.chooseTrigger': 'Choisir un déclencheur…',
    'screensA.auto.chooseAction': 'Choisir une action…',
    'screensA.auto.create': 'Créer l’automatisation',
    'screensA.auto.cancel': 'Annuler',
    'screensA.auto.badgeNew': 'Nouveau',
    'screensA.auto.toggleLabel': 'Activer ou mettre en pause',
    'screensA.auto.deleteLabel': 'Supprimer l’automatisation',
    'screensA.auto.emptyTitle': 'Aucune automatisation',
    'screensA.auto.emptyBody':
      'Une automatisation, c’est un déclencheur et une action — commencez petit, par exemple la lumière du porche qui s’allume quand la sonnette voit quelqu’un après la tombée de la nuit.',
    'screensA.auto.emptyAction': 'Créer la première',
    'screensA.auto.note':
      'Les automatisations tournent sur vos appareils, pas sur notre cloud — elles continuent pendant une panne et quand votre connexion tombe.',

    /* ---------------------------------------------------------- billing */
    'screensA.billing.title': 'Facturation et factures',
    'screensA.billing.export': 'Tout exporter en CSV',
    'screensA.billing.currentPlan': 'Forfait actuel',
    'screensA.billing.changePlan': 'Changer de forfait',
    'screensA.billing.applyCredit': 'Utiliser l’avoir',
    'screensA.billing.paymentMethod': 'Moyen de paiement',
    'screensA.billing.cardMeta': 'Visa · expire le {exp}',
    'screensA.billing.credit': 'Avoir sur le compte',
    'screensA.billing.updateCard': 'Modifier la carte',
    'screensA.billing.history': 'Historique',
    'screensA.billing.periodLabel': 'Période de facturation',
    'screensA.billing.note':
      'Les factures de matériel sont émises par Hearth Home Ltd. et incluent une TVA de 20 %. Les factures d’abonnement indiquent la période couverte — en cas de résiliation en cours de période, nous remboursons automatiquement les jours non utilisés.',

    /* ------------------------------------------------------------ board */
    'screensA.board.title': 'Classement des parrainages',
    'screensA.board.lede':
      'Les meilleurs parrains du trimestre. Tout le monde reçoit toujours {amount} par filleul — le classement ne sert qu’aux prix bonus.',
    'screensA.board.quarter': 'Ce trimestre',
    'screensA.board.allTime': 'Depuis toujours',
    'screensA.board.periodLabel': 'Période du classement',
    'screensA.board.you': 'Vous',
    'screensA.board.friendsJoined': 'filleuls inscrits',
    'screensA.board.invite': 'Inviter quelqu’un',
    'screensA.board.prizes': 'Prix bonus',
    'screensA.board.legal':
      'Seuls les parrainages dont la commande a été expédiée sont comptés, et les auto-parrainages sont retirés automatiquement. Les prix sont crédités sur votre compte dans la semaine qui suit la fin du trimestre. Le classement est mis à jour toutes les heures.',

    /* ----------------------------------------------------------- breach */
    'screensA.breach.badge': 'Avis de sécurité',
    'screensA.breach.published': 'publié le {published} · mis à jour le {updated}',
    'screensA.breach.h1':
      'Un prestataire e-mail tiers a exposé des adresses e-mail de clients',
    'screensA.breach.lede':
      'Le 22 juillet, nous avons découvert qu’un prestataire utilisé pour l’envoi des e-mails de commande avait une sauvegarde mal configurée. Des adresses e-mail et des numéros de commande sont restés lisibles pendant environ 40 heures. Aucun mot de passe, donnée de paiement, vidéo ni adresse postale n’était concerné.',
    'screensA.breach.statusTitle': 'Contenu et clos',
    'screensA.breach.statusText':
      'La sauvegarde a été sécurisée dans les deux heures suivant la découverte. Le prestataire a été audité et le système concerné mis hors service.',
    'screensA.breach.tableHead': 'Ce qui a été touché et ce qui ne l’a pas été',
    'screensA.breach.affected': 'Suis-je concerné ?',
    'screensA.breach.checkIntro':
      'Toutes les personnes concernées ont reçu un e-mail le 24 juillet. Vous pouvez aussi vérifier ici — nous comparons seulement avec la liste des adresses exposées et ne conservons pas votre saisie.',
    'screensA.breach.emailLabel': 'Votre adresse e-mail',
    'screensA.breach.check': 'Vérifier',
    'screensA.breach.steps': 'Ce que nous vous conseillons',
    'screensA.breach.timeline': 'Chronologie',
    'screensA.breach.regulator': 'Autorité de contrôle',
    'screensA.breach.regulatorText':
      'Signalé à l’ICO le {date}, référence {ref}. Vous pouvez la saisir directement à tout moment.',
    'screensA.breach.questions': 'Questions',
    'screensA.breach.questionsText':
      'Notre responsable de la protection des données y répond personnellement à {email}.',
    'screensA.breach.contact': 'Nous contacter',
    'screensA.breach.disclaimer':
      'Ceci est un portail de démonstration. L’incident décrit est fictif et aucune donnée réelle n’est concernée.',

    /* ---------------------------------------------------------- bundles */
    'screensA.bundles.title': 'Offres groupées',
    'screensA.bundles.lede':
      'Achetez plusieurs appareils ensemble et la remise s’applique au paiement — sans code. Un lot est expédié en un seul colis et partage une même date de départ de garantie de deux ans.',
    'screensA.bundles.save': '{save} d’économie',
    'screensA.bundles.add': 'Ajouter le lot',
    'screensA.bundles.byoTitle': 'Composez le vôtre',
    'screensA.bundles.byoSub':
      'À partir de trois appareils, 10 % de remise automatique.',
    'screensA.bundles.noteDiscount': 'Remise de lot de 10 % appliquée',
    'screensA.bundles.noteMore':
      'encore {count} pour 10 % de remise|encore {count} pour 10 % de remise',
    'screensA.bundles.notePick': 'choisissez-en au moins trois',
    'screensA.bundles.toastMin': 'Choisissez au moins deux appareils',
    'screensA.bundles.toastAddedDiscount':
      'Lot ajouté — remise de 10 % appliquée',
    'screensA.bundles.toastAddedPlain': 'Lot ajouté — pas encore de remise',
    'screensA.bundles.toastAddedNamed': 'Lot {name} ajouté — {save} d’économie',
    'screensA.bundles.groupLabel': 'Appareils de votre lot',
    'screensA.bundles.selected': '{devices} sélectionnés',
    'screensA.bundles.addMine': 'Ajouter mon lot',

    /* ------------------------------------------------------------ claim */
    'screensA.claim.toastFiles': 'Il n’y a pas d’autre fichier de démo',
    'screensA.claim.toastFault': 'Décrivez la panne un peu plus en détail',
    'screensA.claim.toastSubmitted': 'Demande envoyée',
    'screensA.claim.doneTitle': 'Demande reçue',
    'screensA.claim.doneBody':
      'Nous l’examinons sous deux jours ouvrés. Gardez l’appareil à portée — nous pourrions demander une photo de la plaque signalétique.',
    'screensA.claim.outcomeChip': '{outcome} demandé',
    'screensA.claim.tl1Note': 'Nous avons votre description et vos photos.',
    'screensA.claim.tl2Label': 'Évaluation',
    'screensA.claim.tl2Note': 'Un technicien l’examine sous deux jours ouvrés.',
    'screensA.claim.tl3Label': '{outcome} organisé',
    'screensA.claim.tl3Note':
      'Nous confirmons par e-mail et réservons ce qu’il faut.',
    'screensA.claim.bookRepair': 'Réserver une réparation',
    'screensA.claim.another': 'Faire une autre demande',
    'screensA.claim.h1': 'Faire jouer la garantie',
    'screensA.claim.lede':
      'Deux ans de couverture d’office, trois si l’appareil est enregistré. Les pannes d’usage normal sont couvertes ; les dommages accidentels et les infiltrations d’eau ne le sont pas.',
    'screensA.claim.whichDevice': 'Quel appareil est en panne ?',
    'screensA.claim.deviceNote': '{serial} · couvert jusqu’au {expires}',
    'screensA.claim.faultLabel': 'Que s’est-il passé ?',
    'screensA.claim.faultPlaceholder':
      'Décrivez la panne, quand elle a commencé et ce que vous avez déjà essayé.',
    'screensA.claim.preferredOutcome': 'Solution souhaitée',
    'screensA.claim.photos': 'Photos de la panne',
    'screensA.claim.addPhoto': 'Ajouter une photo',
    'screensA.claim.submit': 'Envoyer la demande',

    /* ---------------------------------------------------------- contact */
    'screensA.contact.toastMissing':
      'Indiquez votre nom, votre e-mail et un court message',
    'screensA.contact.toastSent': 'Message envoyé — nous répondons sous un jour',
    'screensA.contact.h1': 'Nous contacter',
    'screensA.contact.lede':
      'Le support est ouvert du lundi au vendredi de 8h à 19h (heure du Royaume-Uni) et le samedi de 9h à 14h. Choisissez le canal qui vous convient.',
    'screensA.contact.chat': 'Chat en direct',
    'screensA.contact.chatBody':
      'Le plus rapide. Attente habituelle sous deux minutes.',
    'screensA.contact.online': 'En ligne',
    'screensA.contact.email': 'E-mail',
    'screensA.contact.emailBody': 'Nous répondons sous un jour ouvré.',
    'screensA.contact.phone': 'Téléphone',
    'screensA.contact.phoneBody':
      'Idéal pour une question urgente d’installation ou de sécurité.',
    'screensA.contact.ticket': 'Ouvrir un ticket',
    'screensA.contact.ticketBody':
      'Idéal quand vous pouvez joindre des photos ou des journaux.',
    'screensA.contact.startTicket': 'Créer un ticket',
    'screensA.contact.formTitle': 'Écrivez-nous',
    'screensA.contact.formLede':
      'Pour tout ce qui ne concerne pas un appareil précis.',
    'screensA.contact.name': 'Votre nom',
    'screensA.contact.message': 'Message',
    'screensA.contact.messagePlaceholder': 'Comment pouvons-nous aider ?',
    'screensA.contact.send': 'Envoyer le message',
    'screensA.contact.headOffice': 'Siège social',
    'screensA.contact.returnsDepot': 'Entrepôt des retours',
    'screensA.contact.returnsBody':
      'N’envoyez pas les retours au bureau — ouvrez d’abord un retour et utilisez l’étiquette prépayée reçue par e-mail.',
    'screensA.contact.returnsLink': 'Comment fonctionnent les retours',

    /* ----------------------------------------------------------- delete */
    'screensA.delete.step1': 'Ce qui part',
    'screensA.delete.step2': 'Alternatives',
    'screensA.delete.step3': 'Confirmation',
    'screensA.delete.scheduledTitle': 'Suppression programmée',
    'screensA.delete.keep': 'Garder mon compte',
    'screensA.delete.downloadFirst': 'Télécharger mes données d’abord',
    'screensA.delete.h1': 'Supprimer votre compte',
    'screensA.delete.lede':
      'Nous vous montrons ce qui part et ce qui reste. Rien ne se passe avant la dernière étape, et vous avez 30 jours pour changer d’avis.',
    'screensA.delete.h2Things': 'Ce qui arrive à vos données',
    'screensA.delete.textThings':
      'Vos appareils continuent de fonctionner en local — programmations, alertes et enregistrement local restent actifs. C’est le compte et tout ce qui est dans notre cloud qui part.',
    'screensA.delete.calloutCopy':
      'Faites-en une copie si vous le souhaitez — une archive de votre compte, de vos appareils, de vos programmations et de l’index des vidéos, prête en général en dix minutes.',
    'screensA.delete.h2Before': 'Avant de partir',
    'screensA.delete.textBefore':
      'Cela résout souvent la raison même du départ. Passez si votre décision est prise — nous ne le redemanderons pas.',
    'screensA.delete.reasonLabel': 'Pourquoi partez-vous ?',
    'screensA.delete.reasonOptional': 'Facultatif, mais utile',
    'screensA.delete.reasonPlaceholder': 'Je préfère ne pas répondre',
    'screensA.delete.h2Confirm': 'Confirmez que c’est bien vous',
    'screensA.delete.textConfirm':
      'Tapez {word} pour confirmer. Nous vous envoyons aussi un lien par e-mail — le compte n’est pas touché tant que vous ne le suivez pas.',
    'screensA.delete.phraseLabel': 'Tapez DELETE',
    'screensA.delete.calloutDanger':
      'Passé 30 jours, personne ne peut revenir en arrière, nous compris. Vidéos, programmations, historique de commandes et avoir restant partent avec.',
    'screensA.delete.back': 'Retour',
    'screensA.delete.schedule': 'Programmer la suppression',
    'screensA.delete.continue': 'Continuer',
    'screensA.delete.cancel': 'Annuler et garder mon compte',

    /* ---------------------------------------------------------- devices */
    'screensA.devices.online': 'En ligne',
    'screensA.devices.batteryLow': 'Batterie faible',
    'screensA.devices.offline': 'Hors ligne',
    'screensA.devices.summaryOffline':
      '{devices} · {count} hors ligne · armé depuis {time}|{devices} · {count} hors ligne · armé depuis {time}',
    'screensA.devices.summaryAll':
      '{devices} · tous joignables · armé depuis {time}',
    'screensA.devices.unread': '{count} non lue|{count} non lues',
    'screensA.devices.allCaught': 'Tout est à jour',
    'screensA.devices.memberLine':
      '{people} · {count} invitation en attente|{people} · {count} invitations en attente',
    'screensA.devices.liveLine':
      '{cameras} · {count} vidéo aujourd’hui|{cameras} · {count} vidéos aujourd’hui',
    'screensA.devices.autoLine': '{running} actives, {paused} en pause',
    'screensA.devices.toastOn': '{name} · {label} activé',
    'screensA.devices.toastOff': '{name} · {label} désactivé',
    'screensA.devices.toastAdd': 'L’ajout d’appareils se fait dans l’app Hearth',
    'screensA.devices.add': 'Ajouter un appareil',
    'screensA.devices.energy': 'Suivi énergie',
    'screensA.devices.liveView': 'Vue en direct',
    'screensA.devices.automations': 'Automatisations',
    'screensA.devices.notifications': 'Notifications',
    'screensA.devices.household': 'Foyer',

    /* -------------------------------------------------------- downloads */
    'screensA.downloads.appIphone': 'Hearth pour iPhone',
    'screensA.downloads.appAndroid': 'Hearth pour Android',
    'screensA.downloads.toastStore':
      'Les liens vers les stores sont désactivés dans cette démo',
    'screensA.downloads.h1': 'Téléchargements et manuels',
    'screensA.downloads.lede':
      'Manuels, fiches de démarrage, schémas de câblage et outils pour installateurs. Tout est gratuit et ne demande aucun compte.',
    'screensA.downloads.toastFile': 'Téléchargement de {file}',
    'screensA.downloads.getFile': 'Obtenir le fichier',
    'screensA.downloads.download': 'Télécharger',
    'screensA.downloads.getApp': 'Obtenir l’app',

    /* ----------------------------------------------------------- energy */
    'screensA.energy.week': 'Semaine',
    'screensA.energy.month': 'Mois',
    'screensA.energy.year': 'Année',
    'screensA.energy.h1': 'Suivi énergie',
    'screensA.energy.lede':
      'Calculé à partir de votre thermostat et de vos prises. Les estimations utilisent votre tarif — modifiez-le dans l’app s’il n’est plus à jour.',
    'screensA.energy.periodLabel': 'Période',
    'screensA.energy.byRoom': 'Par pièce',

    /* --------------------------------------------------------- firmware */
    'screensA.firmware.h1': 'Notes de version du firmware',
    'screensA.firmware.lede':
      'Les mises à jour s’installent seules la nuit. Vous pouvez toujours en lancer une à la main dans l’app, sous Réglages → À propos.',
    'screensA.firmware.allDevices': 'Tous les appareils',
    'screensA.firmware.rolling': 'Déploiement en cours',

    /* ------------------------------------------------------------ forum */
    'screensA.forum.toastPost': 'La publication est désactivée dans cette démo',
    'screensA.forum.h1': 'Forum de la communauté',
    'screensA.forum.lede':
      'Échangez montages, automatisations et solutions avec d’autres propriétaires Hearth. L’équipe Hearth passe tous les jours — repérez le badge.',
    'screensA.forum.start': 'Lancer une discussion',
    'screensA.forum.answered': 'Résolu',
    'screensA.forum.inCat': 'dans {cat}',
    'screensA.forum.answerFrom': 'Réponse de {name}',
    'screensA.forum.reply': 'Répondre dans le fil',
    'screensA.forum.askSupport': 'Demander plutôt au support',
    'screensA.forum.emptyTitle': 'Aucune discussion pour l’instant',
    'screensA.forum.emptyBody':
      'Rien dans cette catégorie pour le moment. Lancez le premier fil et il restera en tête pour tout le monde.',
    'screensA.forum.thisWeek': 'Cette semaine',
    'screensA.forum.newPosts': 'nouveaux messages',
    'screensA.forum.answeredStat': 'résolus',
    'screensA.forum.topContributors': 'Meilleurs contributeurs',
    'screensA.forum.helpfulPosts': '{count} message utile|{count} messages utiles',
    'screensA.forum.rules': 'Règles du forum',
    'screensA.forum.rulesBody':
      'Restez courtois, restez dans le sujet, et ne publiez jamais de numéro de série ni de détail de commande dans un fil public.',

    /* ------------------------------------------------------------- gift */
    'screensA.gift.whenNow': 'Tout de suite',
    'screensA.gift.whenTomorrow': 'Demain matin',
    'screensA.gift.whenDate': 'À une date de mon choix',
    'screensA.gift.sentNow': 'Elle part vers {where} à l’instant, avec votre message.',
    'screensA.gift.theirInbox': 'sa boîte mail',
    'screensA.gift.sentLater':
      'Nous la livrerons le matin choisi, avec votre message.',
    'screensA.gift.toastMin': 'Les cartes cadeaux commencent à {min}',
    'screensA.gift.toastWho': 'Pour qui est-elle ?',
    'screensA.gift.toastEmail': 'Ajoutez son adresse e-mail',
    'screensA.gift.toastSent': 'Carte cadeau envoyée',
    'screensA.gift.toastCode': 'Saisissez le code complet reçu par e-mail',
    'screensA.gift.toastBalance': '{amount} ajoutés à votre solde',
    'screensA.gift.buyAnother': 'En acheter une autre',
    'screensA.gift.h1': 'Cartes cadeaux',
    'screensA.gift.lede':
      'Utilisable sur tout appareil Hearth, toute pièce détachée ou tout forfait Hearth Care. Sans expiration, sans frais, et remboursable sous 14 jours si elle n’a pas servi.',
    'screensA.gift.design': 'Choisir un visuel',
    'screensA.gift.amount': 'Montant',
    'screensA.gift.other': 'Autre',
    'screensA.gift.customPlaceholder': 'Montant libre de {min} à {max}',
    'screensA.gift.customAria': 'Montant libre de la carte cadeau',
    'screensA.gift.recipient': 'Nom du destinataire',
    'screensA.gift.theirEmail': 'Son adresse e-mail',
    'screensA.gift.message': 'Message',
    'screensA.gift.optional': 'Facultatif',
    'screensA.gift.messagePlaceholder':
      'Joyeux anniversaire — rends la maison plus maligne.',
    'screensA.gift.whenLabel': 'Quand devons-nous l’envoyer ?',
    'screensA.gift.buy': 'Acheter une carte de {amount}',
    'screensA.gift.preview': 'Aperçu',
    'screensA.gift.for': 'Pour {name}',
    'screensA.gift.someoneLucky': 'quelqu’un de chanceux',
    'screensA.gift.messageHere': 'Votre message s’affiche ici.',
    'screensA.gift.foot': 'sans expiration · {url}',
    'screensA.gift.redeem': 'Utiliser une carte',
    'screensA.gift.codeAria': 'Code de la carte cadeau',
    'screensA.gift.addBalance': 'Ajouter au solde',
    'screensA.gift.yourBalance': 'Votre solde',

    /* ------------------------------------------------------------ guide */
    'screensA.guide.buyCard': 'Offrir plutôt une carte cadeau',
    'screensA.guide.filterLabel': 'Filtrer le guide cadeaux',
    'screensA.guide.addBasket': 'Ajouter au panier',
    'screensA.guide.saveLater': 'Enregistrer',
    'screensA.guide.delivery': 'Livraison à temps',
    'screensA.guide.wrapHead': 'Prêt à offrir, d’office',
    'screensA.guide.wrapText':
      'Boîtes sans plastique, aucun prix sur le bon de livraison, et une carte manuscrite si vous ajoutez un message au paiement. Les retours vont jusqu’au 31 janvier pour tout achat effectué à partir de novembre.',
    'screensA.guide.returnsLink': 'Comment fonctionnent les retours étendus',

    /* ------------------------------------------------------------- home */
    'screensA.home.browse': 'Parcourir par thème',
    'screensA.home.popular': 'Articles populaires',
    'screensA.home.ctaTitle': 'Vous ne trouvez pas ?',
    'screensA.home.ctaBody':
      'Ouvrez un ticket et nous prenons le relais. La plupart des réponses arrivent sous un jour.',
    'screensA.home.openTicket': 'Ouvrir un ticket',

    /* ---------------------------------------------------------- imprint */
    'screensA.imprint.termCompany': 'Société immatriculée',
    'screensA.imprint.termAddress': 'Adresse du siège',
    'screensA.imprint.termDirectors': 'Direction',
    'screensA.imprint.termNumber': 'Numéro d’immatriculation',
    'screensA.imprint.termVat': 'Numéro de TVA',
    'screensA.imprint.termContact': 'Contact',
    'screensA.imprint.termResponsible': 'Responsable du contenu',
    'screensA.imprint.responsibleValue': '{name}, adresse ci-dessus',
    'screensA.imprint.h1': 'Mentions légales',
    'screensA.imprint.lede':
      'Informations légales concernant Hearth Home Ltd. et ce site.',
    'screensA.imprint.updated': 'Dernière mise à jour le {date}',
    'screensA.imprint.h2Adr': 'Règlement des litiges de consommation',
    'screensA.imprint.bodyAdr':
      'Nous participons au dispositif indépendant Retail ADR. Si nous ne parvenons pas à régler un litige entre nous, vous pouvez le soumettre gratuitement à Retail ADR. Notre équipe support vous envoie sur demande la référence du dossier et les formulaires.',
    'screensA.imprint.h2Content': 'Responsabilité du contenu',
    'screensA.imprint.bodyContent':
      'Nous rédigeons ces pages avec soin, mais nous ne pouvons pas garantir que chaque article reste exact au fil des versions de firmware et d’application. En cas de contradiction avec le guide de sécurité imprimé fourni dans la boîte, c’est le guide imprimé qui prévaut.',
    'screensA.imprint.h2Links': 'Responsabilité des liens',
    'screensA.imprint.bodyLinks':
      'Certains articles renvoient vers un suivi de colis, des boutiques d’applications ou des messages de la communauté que nous ne contrôlons pas. Nous vérifions les liens externes au moment de les ajouter, mais nous ne répondons pas de ce qui change ensuite sur ces pages.',
    'screensA.imprint.h2Copyright': 'Droit d’auteur',
    'screensA.imprint.bodyCopyright':
      'Tous les textes, illustrations et photos produit de ce site appartiennent à Hearth Home Ltd., sauf mention contraire. Vous pouvez citer un article d’aide avec un lien vers la source ; merci de nous demander avant de reproduire une page entière.',
    'screensA.imprint.callout':
      'Ceci est un portail de démonstration construit avec Adminium. Toutes les informations d’entreprise, adresses et numéros d’immatriculation de cette page sont fictifs.',

    /* ------------------------------------------------------- installers */
    'screensA.installers.radius': '{count} mile|{count} miles',
    'screensA.installers.count':
      '{installers} dans un rayon de {count} mile|{installers} dans un rayon de {count} miles',
    'screensA.installers.toastPostcode':
      'Saisissez un code postal pour lancer la recherche',
    'screensA.installers.toastFound':
      '{count} installateur près de {postcode}|{count} installateurs près de {postcode}',
    'screensA.installers.toastCall':
      'L’appel n’est pas disponible dans cette démo',
    'screensA.installers.toastRequest': 'Demande envoyée à {name}',
    'screensA.installers.h1': 'Trouver un installateur agréé',
    'screensA.installers.lede':
      'Chaque installateur ici est formé au matériel Hearth, assuré, et noté uniquement par des clients qui ont réellement réservé. Câbler une sonnette ou remplacer un thermostat prend en général moins de deux heures.',
    'screensA.installers.postcode': 'Code postal',
    'screensA.installers.within': 'Rayon',
    'screensA.installers.find': 'Chercher',
    'screensA.installers.sorted': 'triés par distance',
    'screensA.installers.approved': 'Agréé',
    'screensA.installers.call': 'Appeler',
    'screensA.installers.request': 'Demander une visite',
    'screensA.installers.note':
      'Les installateurs sont des entreprises indépendantes. Les travaux réservés via Hearth sont couverts par notre garantie d’installation de deux ans — conservez la facture, nous gérons tout litige.',

    /* -------------------------------------------------------- insurance */
    'screensA.insurance.retention':
      'Votre forfait conserve les vidéos {days} jours ; tout ce qui précède le {date} a donc déjà disparu. Demandez-nous le plus tôt possible — une fois expirée, une vidéo est irrécupérable.',
    'screensA.insurance.h1': 'Sinistres d’assurance',
    'screensA.insurance.lede':
      'Les assureurs veulent en général la vidéo, les horodatages et la preuve que l’appareil fonctionnait. Nous réunissons les trois dans un même dossier — gratuit, et prêt en général en moins d’une heure.',
    'screensA.insurance.pack': 'Ce que contient un dossier de preuves',
    'screensA.insurance.packText':
      'Vidéos originales, journal d’horodatage signé, historique de l’état des appareils et un résumé PDF lisible par un expert.',
    'screensA.insurance.privacy': 'Nous ne parlons jamais à votre assureur',
    'screensA.insurance.privacyText':
      'Le dossier vous est remis. Rien n’est partagé avec qui que ce soit, sauf si vous l’envoyez ou si un tribunal l’ordonne.',
    'screensA.insurance.yourClaims': 'Vos dossiers',
    'screensA.insurance.emailInsurer': 'Envoyer à l’assureur',
    'screensA.insurance.requestTitle': 'Demander un dossier de preuves',
    'screensA.insurance.what': 'Que s’est-il passé ?',
    'screensA.insurance.date': 'Date du sinistre',
    'screensA.insurance.window': 'Plage horaire à couvrir',
    'screensA.insurance.ref': 'Assureur ou référence',
    'screensA.insurance.optional': 'Facultatif',
    'screensA.insurance.refPlaceholder': 'ex. Aviva · dossier 4471882',
    'screensA.insurance.note': 'Un détail utile pour l’expert ?',
    'screensA.insurance.notePlaceholder':
      'Ce qui a été endommagé ou volé, et à peu près quand vous l’avez remarqué.',
    'screensA.insurance.submit': 'Constituer mon dossier',

    /* --------------------------------------------------------------- kb */
    'screensA.kb.h1': 'Rechercher dans la base de connaissances',
    'screensA.kb.placeholder':
      'Rechercher dans {count} article — essayez « reset » ou « offline »|Rechercher dans {count} articles — essayez « reset » ou « offline »',
    'screensA.kb.clear': 'Effacer',
    'screensA.kb.sortLabel': 'Trier les résultats',
    'screensA.kb.sortRelevance': 'Plus pertinents',
    'screensA.kb.sortShort': 'Lecture la plus courte',
    'screensA.kb.sortAz': 'A – Z',
    'screensA.kb.emptyTitle': 'Aucun résultat pour « {query} »',
    'screensA.kb.emptyBody':
      'Essayez avec moins de mots, ou l’une de ces recherches — la plupart des gens trouvent dès le premier résultat.',
    'screensA.kb.emptyAction': 'Nous poser la question',
    'screensA.kb.alsoSearch': 'Recherches associées :',
  },

  /* Czech: three cardinal categories — one | few | other. */
  'cs-CZ': {
    /* ------------------------------------------------------------- a11y */
    'screensA.a11y.title': 'Nastavení přístupnosti',
    'screensA.a11y.lede':
      'Platí v celém centru nápovědy i v aplikaci Hearth na tomto účtu. Změny se projeví okamžitě — náhled ukazuje přesně výsledek.',
    'screensA.a11y.size': 'Velikost zobrazení',
    'screensA.a11y.sizeNote':
      'Zvětší celé centrum nápovědy — text, tlačítka i mezery zároveň. Projeví se hned po výběru.',
    'screensA.a11y.palette': 'Barevná paleta',
    'screensA.a11y.paletteNote':
      'Stavové barvy vždy doplňuje ikona a popisek, nikdy nestojí samy.',
    'screensA.a11y.sample': 'Živá ukázka',
    'screensA.a11y.sampleTitle': 'Oprava zařízení, které hlásí offline',
    'screensA.a11y.sampleBody':
      'Označení „offline“ obvykle samo zmizí během několika minut. Pokud ne, restartujte zařízení a zkontrolujte, jestli router nezměnil kanál.',
    'screensA.a11y.solved': 'Vyřešeno',
    'screensA.a11y.pending': 'Čeká',
    'screensA.a11y.actionNeeded': 'Vyžaduje akci',
    'screensA.a11y.readArticle': 'Přečíst článek',
    'screensA.a11y.shortcuts': 'Klávesové zkratky',
    'screensA.a11y.shortcutsBody':
      'Klávesou {slash} vyhledáte odkudkoli, klávesou {esc} zavřete každý panel.',
    'screensA.a11y.seeAll': 'Všechny zkratky',
    'screensA.a11y.appearance': 'Vzhled',
    'screensA.a11y.followSystem': 'Převzít motiv systému',
    'screensA.a11y.save': 'Uložit nastavení',
    'screensA.a11y.reset': 'Obnovit',

    /* ------------------------------------------------------------ about */
    'screensA.about.eyebrow': 'O ZNAČCE HEARTH',
    'screensA.about.h1': 'Stavíme domácí techniku, která nepřekáží.',
    'screensA.about.lede':
      'Hearth vznikl v roce 2015 v dílně v Bristolu s jednou tvrdošíjnou myšlenkou: chytrá domácnost má působit klidněji než obyčejná. Po deseti letech ke každému zařízení pořád přikládáme tištěnou kartu pro rychlý start a telefonní číslo, kde zvedá člověk.',
    'screensA.about.stat1': 'Založeno v Bristolu',
    'screensA.about.stat2': 'Domácností s Hearth',
    'screensA.about.stat3': 'Lidí, z toho {count} v podpoře',
    'screensA.about.h2Products': 'Méně zařízení, zato lepších',
    'screensA.about.body1':
      'Děláme čtyři produkty. Je to záměr — každý z nich tak dostává firmware nejméně sedm let a naše podpora je zná do posledního detailu.',
    'screensA.about.body2':
      'Vše navrhujeme v Bristolu a kompletujeme v Portugalsku. Naše obaly jsou od roku 2021 bez plastu a každé zařízení Hearth lze opravit místo vyhodit.',
    'screensA.about.h2Values': 'Na čem trváme',
    'screensA.about.value1Title': 'Odpovídá člověk',
    'screensA.about.value1Body':
      'Žádné hlasové rozcestníky, žádné fronty jen pro boty. První odpověď přichází ve všední dny mediánově do dvou hodin.',
    'screensA.about.value2Title': 'Váš domov, vaše data',
    'screensA.about.value2Body':
      'Videozáznamy jsou šifrované od konce ke konci a nikdy je neprodáváme, nesdílíme ani na nich nic netrénujeme.',
    'screensA.about.value3Title': 'Postaveno k opravám',
    'screensA.about.value3Body':
      'Náhradní díly sedm let, návody na opravu zdarma a kredit za vrácení starého kusu.',
    'screensA.about.h2Team': 'Tým podpory',
    'screensA.about.role1': 'Vedoucí podpory',
    'screensA.about.role2': 'Diagnostika hardwaru',
    'screensA.about.role3': 'Správa komunity',
    'screensA.about.role4': 'Vrácení a záruka',
    'screensA.about.ctaTitle': 'Máte dotaz ke svému Hearth?',
    'screensA.about.ctaBody':
      'Začněte v centru nápovědy, nebo mluvte přímo s týmem — podle toho, co je pro vás rychlejší.',
    'screensA.about.contact': 'Kontaktujte nás',
    'screensA.about.helpCenter': 'Centrum nápovědy',

    /* ------------------------------------------------------------ appts */
    'screensA.appts.confirmed': 'Potvrzeno',
    'screensA.appts.awaiting': 'Čeká na zásilku',
    'screensA.appts.completed': 'Dokončeno',
    'screensA.appts.toastCalendar': 'Pozvánka do kalendáře odeslána',
    'screensA.appts.toastReschedule': 'Vyberte níže nový termín',
    'screensA.appts.toastCancelled': 'Termín {id} zrušen',
    'screensA.appts.toastReport': 'Servisní zprávy v této ukázce nejsou',
    'screensA.appts.title': 'Servisní termíny',
    'screensA.appts.lede':
      'Návštěvy techniků, opravy poštou i instalace na jednom místě. Přeložení je zdarma až 24 hodin předem.',
    'screensA.appts.book': 'Objednat návštěvu',
    'screensA.appts.upcoming': 'Nadcházející',
    'screensA.appts.past': 'Proběhlé',
    'screensA.appts.addCalendar': 'Do kalendáře',
    'screensA.appts.reschedule': 'Přeložit',
    'screensA.appts.cancel': 'Zrušit',
    'screensA.appts.report': 'Zpráva',
    'screensA.appts.emptyTitle': 'Nic objednáno',
    'screensA.appts.emptyBody':
      'Jakmile objednáte opravu nebo instalaci, objeví se tady i s údaji o technikovi.',

    /* ---------------------------------------------------------- article */
    'screensA.article.saved': 'Uloženo',
    'screensA.article.save': 'Uložit',
    'screensA.article.savedArticles': 'Uložené články',
    'screensA.article.helpful': 'Bylo to užitečné?',
    'screensA.article.yes': 'Ano',
    'screensA.article.no': 'Ne',
    'screensA.article.related': 'Související články',

    /* ------------------------------------------------------------- auto */
    'screensA.auto.title': 'Automatizace',
    'screensA.auto.close': 'Zavřít',
    'screensA.auto.new': 'Nová automatizace',
    'screensA.auto.nameLabel': 'Pojmenujte ji',
    'screensA.auto.namePlaceholder': 'např. Světlo u vchodu, když někdo zazvoní',
    'screensA.auto.when': 'KDYŽ',
    'screensA.auto.then': 'PAK',
    'screensA.auto.whenLabel': 'se stane tohle',
    'screensA.auto.thenLabel': 'udělej tohle',
    'screensA.auto.chooseTrigger': 'Vyberte spouštěč…',
    'screensA.auto.chooseAction': 'Vyberte akci…',
    'screensA.auto.create': 'Vytvořit automatizaci',
    'screensA.auto.cancel': 'Zrušit',
    'screensA.auto.badgeNew': 'Nové',
    'screensA.auto.toggleLabel': 'Zapnout nebo pozastavit',
    'screensA.auto.deleteLabel': 'Smazat automatizaci',
    'screensA.auto.emptyTitle': 'Zatím žádné automatizace',
    'screensA.auto.emptyBody':
      'Automatizace je jeden spouštěč a jedna akce — začněte něčím malým, třeba světlem u vchodu, které se rozsvítí, když zvonek po setmění někoho uvidí.',
    'screensA.auto.emptyAction': 'Vytvořit první',
    'screensA.auto.note':
      'Automatizace běží na vašich zařízeních, ne v našem cloudu — fungují i při výpadku a když vypadne internet.',

    /* ---------------------------------------------------------- billing */
    'screensA.billing.title': 'Fakturace a faktury',
    'screensA.billing.export': 'Exportovat vše jako CSV',
    'screensA.billing.currentPlan': 'Aktuální tarif',
    'screensA.billing.changePlan': 'Změnit tarif',
    'screensA.billing.applyCredit': 'Uplatnit kredit',
    'screensA.billing.paymentMethod': 'Způsob platby',
    'screensA.billing.cardMeta': 'Visa · platnost do {exp}',
    'screensA.billing.credit': 'Kredit na účtu',
    'screensA.billing.updateCard': 'Upravit kartu',
    'screensA.billing.history': 'Historie',
    'screensA.billing.periodLabel': 'Fakturační období',
    'screensA.billing.note':
      'Faktury za hardware vystavuje Hearth Home Ltd. a obsahují 20% DPH. Faktury za tarif uvádějí pokryté období — při zrušení uprostřed období nevyužité dny automaticky vracíme.',

    /* ------------------------------------------------------------ board */
    'screensA.board.title': 'Žebříček doporučení',
    'screensA.board.lede':
      'Nejlepší doporučení tohoto čtvrtletí. Každý dál dostává {amount} za přivedeného kamaráda — žebříček je jen pro bonusové ceny.',
    'screensA.board.quarter': 'Toto čtvrtletí',
    'screensA.board.allTime': 'Celkově',
    'screensA.board.periodLabel': 'Období žebříčku',
    'screensA.board.you': 'Vy',
    'screensA.board.friendsJoined': 'přivedených lidí',
    'screensA.board.invite': 'Pozvat někoho',
    'screensA.board.prizes': 'Bonusové ceny',
    'screensA.board.legal':
      'Počítají se jen doporučení, jejichž objednávka byla odeslána; doporučení sebe sama automaticky odstraňujeme. Ceny připisujeme na účet do týdne od konce čtvrtletí. Pořadí se aktualizuje každou hodinu.',

    /* ----------------------------------------------------------- breach */
    'screensA.breach.badge': 'Bezpečnostní upozornění',
    'screensA.breach.published': 'zveřejněno {published} · aktualizováno {updated}',
    'screensA.breach.h1':
      'Externí poskytovatel e-mailů odhalil část e-mailových adres zákazníků',
    'screensA.breach.lede':
      '22. července jsme zjistili, že dodavatel, kterého používáme k rozesílání e-mailů o objednávkách, měl špatně nastavenou zálohu. E-mailové adresy a čísla objednávek byly čitelné asi 40 hodin. Hesla, platební údaje, videozáznamy ani adresy se toho netýkaly.',
    'screensA.breach.statusTitle': 'Zvládnuto a uzavřeno',
    'screensA.breach.statusText':
      'Zálohu jsme zabezpečili do dvou hodin od objevení. Dodavatele jsme prověřili a dotčený systém vyřadili.',
    'screensA.breach.tableHead': 'Co bylo zasaženo a co ne',
    'screensA.breach.affected': 'Týká se to mě?',
    'screensA.breach.checkIntro':
      'Všem dotčeným jsme 24. července poslali e-mail. Můžete si to ověřit i tady — porovnáváme jen se seznamem odhalených adres a co napíšete, neukládáme.',
    'screensA.breach.emailLabel': 'Vaše e-mailová adresa',
    'screensA.breach.check': 'Ověřit',
    'screensA.breach.steps': 'Co doporučujeme udělat',
    'screensA.breach.timeline': 'Časová osa',
    'screensA.breach.regulator': 'Dozorový úřad',
    'screensA.breach.regulatorText':
      'Nahlášeno úřadu ICO {date}, značka {ref}. Můžete se na něj kdykoli obrátit přímo.',
    'screensA.breach.questions': 'Dotazy',
    'screensA.breach.questionsText':
      'Naše pověřenkyně pro ochranu osobních údajů je zodpovídá osobně na {email}.',
    'screensA.breach.contact': 'Kontaktujte nás',
    'screensA.breach.disclaimer':
      'Toto je ukázkový portál. Popsaný incident je smyšlený a žádná skutečná data se ho netýkají.',

    /* ---------------------------------------------------------- bundles */
    'screensA.bundles.title': 'Zvýhodněné sady',
    'screensA.bundles.lede':
      'Kupte zařízení dohromady a sleva se uplatní u pokladny — bez kódů. Sada přijde v jednom balíku a má jedno společné datum začátku dvouleté záruky.',
    'screensA.bundles.save': 'Ušetříte {save}',
    'screensA.bundles.add': 'Přidat sadu',
    'screensA.bundles.byoTitle': 'Sestavte si vlastní',
    'screensA.bundles.byoSub': 'Od tří zařízení se automaticky odečte 10 %.',
    'screensA.bundles.noteDiscount': 'Sleva 10 % na sadu uplatněna',
    'screensA.bundles.noteMore':
      'ještě {count} pro slevu 10 %|ještě {count} pro slevu 10 %|ještě {count} pro slevu 10 %',
    'screensA.bundles.notePick': 'vyberte alespoň tři',
    'screensA.bundles.toastMin': 'Vyberte alespoň dvě zařízení',
    'screensA.bundles.toastAddedDiscount': 'Sada přidána — sleva 10 % uplatněna',
    'screensA.bundles.toastAddedPlain': 'Sada přidána — zatím bez slevy',
    'screensA.bundles.toastAddedNamed': 'Sada {name} přidána — ušetříte {save}',
    'screensA.bundles.groupLabel': 'Zařízení ve vaší sadě',
    'screensA.bundles.selected': '{devices} vybráno',
    'screensA.bundles.addMine': 'Přidat mou sadu',

    /* ------------------------------------------------------------ claim */
    'screensA.claim.toastFiles': 'Víc ukázkových souborů není',
    'screensA.claim.toastFault': 'Popište závadu prosím trochu podrobněji',
    'screensA.claim.toastSubmitted': 'Reklamace odeslána',
    'screensA.claim.doneTitle': 'Reklamace přijata',
    'screensA.claim.doneBody':
      'Posoudíme ji do dvou pracovních dnů. Mějte zařízení po ruce — můžeme si říct o fotku výrobního štítku.',
    'screensA.claim.outcomeChip': 'Požadováno: {outcome}',
    'screensA.claim.tl1Note': 'Máme váš popis i fotky.',
    'screensA.claim.tl2Label': 'Posouzení',
    'screensA.claim.tl2Note': 'Technik ji posoudí do dvou pracovních dnů.',
    'screensA.claim.tl3Label': 'Zařízeno: {outcome}',
    'screensA.claim.tl3Note': 'Potvrdíme e-mailem a objednáme, co bude potřeba.',
    'screensA.claim.bookRepair': 'Objednat opravu',
    'screensA.claim.another': 'Zadat další reklamaci',
    'screensA.claim.h1': 'Uplatnit záruku',
    'screensA.claim.lede':
      'Dva roky krytí ve standardu, tři při registraci. Závady z běžného používání jsou kryté; poškození nehodou a vniknutí vody ne.',
    'screensA.claim.whichDevice': 'Které zařízení je vadné?',
    'screensA.claim.deviceNote': '{serial} · kryto do {expires}',
    'screensA.claim.faultLabel': 'Co se pokazilo?',
    'screensA.claim.faultPlaceholder':
      'Popište závadu, kdy začala a co jste už zkusili.',
    'screensA.claim.preferredOutcome': 'Preferované řešení',
    'screensA.claim.photos': 'Fotky závady',
    'screensA.claim.addPhoto': 'Přidat fotku',
    'screensA.claim.submit': 'Odeslat reklamaci',

    /* ---------------------------------------------------------- contact */
    'screensA.contact.toastMissing': 'Doplňte jméno, e-mail a krátkou zprávu',
    'screensA.contact.toastSent': 'Zpráva odeslána — odpovíme do jednoho dne',
    'screensA.contact.h1': 'Kontaktujte nás',
    'screensA.contact.lede':
      'Podpora je otevřená v pondělí až pátek 8–19 hodin britského času a v sobotu 9–14 hodin. Vyberte si kanál, který vám vyhovuje.',
    'screensA.contact.chat': 'Živý chat',
    'screensA.contact.chatBody': 'Nejrychlejší cesta. Čekání obvykle do dvou minut.',
    'screensA.contact.online': 'Právě online',
    'screensA.contact.email': 'E-mail',
    'screensA.contact.emailBody': 'Odpovídáme do jednoho pracovního dne.',
    'screensA.contact.phone': 'Telefon',
    'screensA.contact.phoneBody':
      'Nejlepší pro naléhavé dotazy k instalaci nebo bezpečnosti.',
    'screensA.contact.ticket': 'Založit požadavek',
    'screensA.contact.ticketBody':
      'Nejlepší, když můžete přiložit fotky nebo logy.',
    'screensA.contact.startTicket': 'Začít požadavek',
    'screensA.contact.formTitle': 'Napište nám',
    'screensA.contact.formLede': 'Pro všechno, co se netýká konkrétního zařízení.',
    'screensA.contact.name': 'Vaše jméno',
    'screensA.contact.message': 'Zpráva',
    'screensA.contact.messagePlaceholder': 'S čím vám můžeme pomoct?',
    'screensA.contact.send': 'Odeslat zprávu',
    'screensA.contact.headOffice': 'Sídlo',
    'screensA.contact.returnsDepot': 'Sklad vratek',
    'screensA.contact.returnsBody':
      'Vratky neposílejte do kanceláře — nejdřív založte vrácení a použijte předplacený štítek, který dostanete e-mailem.',
    'screensA.contact.returnsLink': 'Jak funguje vrácení',

    /* ----------------------------------------------------------- delete */
    'screensA.delete.step1': 'Co zmizí',
    'screensA.delete.step2': 'Alternativy',
    'screensA.delete.step3': 'Potvrzení',
    'screensA.delete.scheduledTitle': 'Smazání naplánováno',
    'screensA.delete.keep': 'Ponechat účet',
    'screensA.delete.downloadFirst': 'Nejdřív stáhnout data',
    'screensA.delete.h1': 'Smazat účet',
    'screensA.delete.lede':
      'Projdeme s vámi, co zmizí a co zůstane. Do posledního kroku se nic nestane a máte 30 dní na rozmyšlenou.',
    'screensA.delete.h2Things': 'Co se stane s vašimi věcmi',
    'screensA.delete.textThings':
      'Zařízení dál fungují lokálně — plány, upozornění i lokální nahrávání běží dál. Mizí účet a všechno v našem cloudu.',
    'screensA.delete.calloutCopy':
      'Pokud chcete, udělejte si nejdřív kopii — zip s účtem, zařízeními, plány a rejstříkem záznamů bývá hotový do deseti minut.',
    'screensA.delete.h2Before': 'Než odejdete',
    'screensA.delete.textBefore':
      'Tohle často vyřeší přesně ten důvod, proč lidé odcházejí. Přeskočte to, pokud máte jasno — podruhé se ptát nebudeme.',
    'screensA.delete.reasonLabel': 'Proč odcházíte?',
    'screensA.delete.reasonOptional': 'Nepovinné, ale pomůže nám to',
    'screensA.delete.reasonPlaceholder': 'Raději neuvedu',
    'screensA.delete.h2Confirm': 'Potvrďte, že jste to vy',
    'screensA.delete.textConfirm':
      'Napište {word} pro potvrzení. Pošleme vám i odkaz e-mailem — dokud na něj neklepnete, účtu se nic nestane.',
    'screensA.delete.phraseLabel': 'Napište DELETE',
    'screensA.delete.calloutDanger':
      'Po 30 dnech to nedokáže vrátit nikdo, ani my. Záznamy, plány, historie objednávek i zbylý kredit zmizí s ním.',
    'screensA.delete.back': 'Zpět',
    'screensA.delete.schedule': 'Naplánovat smazání',
    'screensA.delete.continue': 'Pokračovat',
    'screensA.delete.cancel': 'Zrušit a účet ponechat',

    /* ---------------------------------------------------------- devices */
    'screensA.devices.online': 'Online',
    'screensA.devices.batteryLow': 'Slabá baterie',
    'screensA.devices.offline': 'Offline',
    'screensA.devices.summaryOffline':
      '{devices} · {count} offline · střeženo od {time}|{devices} · {count} offline · střeženo od {time}|{devices} · {count} offline · střeženo od {time}',
    'screensA.devices.summaryAll': '{devices} · vše dostupné · střeženo od {time}',
    'screensA.devices.unread':
      '{count} nepřečtená|{count} nepřečtené|{count} nepřečtených',
    'screensA.devices.allCaught': 'Vše vyřízeno',
    'screensA.devices.memberLine':
      '{people} · {count} pozvánka čeká|{people} · {count} pozvánky čekají|{people} · {count} pozvánek čeká',
    'screensA.devices.liveLine':
      '{cameras} · {count} záznam dnes|{cameras} · {count} záznamy dnes|{cameras} · {count} záznamů dnes',
    'screensA.devices.autoLine': '{running} běží, {paused} pozastaveno',
    'screensA.devices.toastOn': '{name} · {label} zapnuto',
    'screensA.devices.toastOff': '{name} · {label} vypnuto',
    'screensA.devices.toastAdd': 'Zařízení se přidávají v aplikaci Hearth',
    'screensA.devices.add': 'Přidat zařízení',
    'screensA.devices.energy': 'Přehled spotřeby',
    'screensA.devices.liveView': 'Živý pohled',
    'screensA.devices.automations': 'Automatizace',
    'screensA.devices.notifications': 'Oznámení',
    'screensA.devices.household': 'Domácnost',

    /* -------------------------------------------------------- downloads */
    'screensA.downloads.appIphone': 'Hearth pro iPhone',
    'screensA.downloads.appAndroid': 'Hearth pro Android',
    'screensA.downloads.toastStore':
      'Odkazy do obchodů s aplikacemi jsou v této ukázce vypnuté',
    'screensA.downloads.h1': 'Soubory a návody',
    'screensA.downloads.lede':
      'Návody, karty pro rychlý start, schémata zapojení a nástroje pro techniky. Všechno je zdarma a nepotřebuje účet.',
    'screensA.downloads.toastFile': 'Stahuji {file}',
    'screensA.downloads.getFile': 'Získat soubor',
    'screensA.downloads.download': 'Stáhnout',
    'screensA.downloads.getApp': 'Získat aplikaci',

    /* ----------------------------------------------------------- energy */
    'screensA.energy.week': 'Týden',
    'screensA.energy.month': 'Měsíc',
    'screensA.energy.year': 'Rok',
    'screensA.energy.h1': 'Přehled spotřeby',
    'screensA.energy.lede':
      'Spočítáno z termostatu a zásuvek. Odhady používají váš tarif — pokud je zastaralý, změňte ho v aplikaci.',
    'screensA.energy.periodLabel': 'Období',
    'screensA.energy.byRoom': 'Podle místnosti',

    /* --------------------------------------------------------- firmware */
    'screensA.firmware.h1': 'Poznámky k verzím firmwaru',
    'screensA.firmware.lede':
      'Aktualizace se instalují samy přes noc. Ručně ji můžete kdykoli spustit v aplikaci v Nastavení → O aplikaci.',
    'screensA.firmware.allDevices': 'Všechna zařízení',
    'screensA.firmware.rolling': 'Postupné vydávání',

    /* ------------------------------------------------------------ forum */
    'screensA.forum.toastPost': 'Přispívání je v této ukázce vypnuté',
    'screensA.forum.h1': 'Komunitní fórum',
    'screensA.forum.lede':
      'Sdílejte sestavy, automatizace a řešení s ostatními majiteli Hearth. Tým Hearth se staví denně — hledejte odznak.',
    'screensA.forum.start': 'Založit diskusi',
    'screensA.forum.answered': 'Zodpovězeno',
    'screensA.forum.inCat': 'v kategorii {cat}',
    'screensA.forum.answerFrom': 'Odpověď od {name}',
    'screensA.forum.reply': 'Odpovědět ve vlákně',
    'screensA.forum.askSupport': 'Raději se zeptat podpory',
    'screensA.forum.emptyTitle': 'Zatím tu nejsou žádné diskuse',
    'screensA.forum.emptyBody':
      'V této kategorii zatím nic není. Založte první vlákno a bude pro všechny nahoře.',
    'screensA.forum.thisWeek': 'Tento týden',
    'screensA.forum.newPosts': 'nových příspěvků',
    'screensA.forum.answeredStat': 'zodpovězeno',
    'screensA.forum.topContributors': 'Nejaktivnější přispěvatelé',
    'screensA.forum.helpfulPosts':
      '{count} užitečný příspěvek|{count} užitečné příspěvky|{count} užitečných příspěvků',
    'screensA.forum.rules': 'Pravidla fóra',
    'screensA.forum.rulesBody':
      'Buďte laskaví, držte se tématu a nikdy nezveřejňujte sériová čísla ani údaje o objednávce ve veřejných vláknech.',

    /* ------------------------------------------------------------- gift */
    'screensA.gift.whenNow': 'Hned',
    'screensA.gift.whenTomorrow': 'Zítra ráno',
    'screensA.gift.whenDate': 'K datu, které vyberu',
    'screensA.gift.sentNow': 'Právě míří na {where}, i s vaší zprávou.',
    'screensA.gift.theirInbox': 'schránku příjemce',
    'screensA.gift.sentLater':
      'Doručíme ho ráno, které jste vybrali, i s vaší zprávou.',
    'screensA.gift.toastMin': 'Dárkové poukazy začínají na {min}',
    'screensA.gift.toastWho': 'Pro koho to je?',
    'screensA.gift.toastEmail': 'Doplňte e-mailovou adresu příjemce',
    'screensA.gift.toastSent': 'Dárkový poukaz odeslán',
    'screensA.gift.toastCode': 'Zadejte celý kód z e-mailu',
    'screensA.gift.toastBalance': '{amount} přidáno na váš zůstatek',
    'screensA.gift.buyAnother': 'Koupit další',
    'screensA.gift.h1': 'Dárkové poukazy',
    'screensA.gift.lede':
      'Uplatníte je na jakékoli zařízení Hearth, náhradní díl i tarif Hearth Care. Bez expirace, bez poplatků a do 14 dnů vratné, pokud jsou nepoužité.',
    'screensA.gift.design': 'Vyberte motiv',
    'screensA.gift.amount': 'Částka',
    'screensA.gift.other': 'Jiná',
    'screensA.gift.customPlaceholder': 'Libovolná částka od {min} do {max}',
    'screensA.gift.customAria': 'Vlastní částka dárkového poukazu',
    'screensA.gift.recipient': 'Jméno příjemce',
    'screensA.gift.theirEmail': 'E-mail příjemce',
    'screensA.gift.message': 'Zpráva',
    'screensA.gift.optional': 'Nepovinné',
    'screensA.gift.messagePlaceholder':
      'Všechno nejlepší — udělej ten dům chytřejší.',
    'screensA.gift.whenLabel': 'Kdy ho máme poslat?',
    'screensA.gift.buy': 'Koupit poukaz na {amount}',
    'screensA.gift.preview': 'Náhled',
    'screensA.gift.for': 'Pro {name}',
    'screensA.gift.someoneLucky': 'někoho šťastného',
    'screensA.gift.messageHere': 'Tady se objeví vaše zpráva.',
    'screensA.gift.foot': 'bez expirace · {url}',
    'screensA.gift.redeem': 'Uplatnit poukaz',
    'screensA.gift.codeAria': 'Kód dárkového poukazu',
    'screensA.gift.addBalance': 'Přidat na zůstatek',
    'screensA.gift.yourBalance': 'Váš zůstatek',

    /* ------------------------------------------------------------ guide */
    'screensA.guide.buyCard': 'Raději koupit dárkový poukaz',
    'screensA.guide.filterLabel': 'Filtrovat průvodce dárky',
    'screensA.guide.addBasket': 'Do košíku',
    'screensA.guide.saveLater': 'Uložit',
    'screensA.guide.delivery': 'Doručení včas',
    'screensA.guide.wrapHead': 'Připraveno k darování',
    'screensA.guide.wrapText':
      'Krabice bez plastu, žádné ceny na dodacím listu a ručně psaná kartička, když u pokladny přidáte zprávu. Na všechno koupené od listopadu platí vrácení až do 31. ledna.',
    'screensA.guide.returnsLink': 'Jak funguje prodloužené vrácení',

    /* ------------------------------------------------------------- home */
    'screensA.home.browse': 'Procházet podle tématu',
    'screensA.home.popular': 'Oblíbené články',
    'screensA.home.ctaTitle': 'Nenašli jste, co potřebujete?',
    'screensA.home.ctaBody':
      'Založte požadavek a my se toho ujmeme. Většina odpovědí dorazí do jednoho dne.',
    'screensA.home.openTicket': 'Založit požadavek',

    /* ---------------------------------------------------------- imprint */
    'screensA.imprint.termCompany': 'Zapsaná společnost',
    'screensA.imprint.termAddress': 'Sídlo',
    'screensA.imprint.termDirectors': 'Jednatelé',
    'screensA.imprint.termNumber': 'IČO',
    'screensA.imprint.termVat': 'DIČ',
    'screensA.imprint.termContact': 'Kontakt',
    'screensA.imprint.termResponsible': 'Odpovědnost za obsah',
    'screensA.imprint.responsibleValue': '{name}, adresa viz výše',
    'screensA.imprint.h1': 'Tiráž',
    'screensA.imprint.lede':
      'Zákonem vyžadované údaje o společnosti Hearth Home Ltd. a o tomto webu.',
    'screensA.imprint.updated': 'Naposledy aktualizováno {date}',
    'screensA.imprint.h2Adr': 'Řešení spotřebitelských sporů',
    'screensA.imprint.bodyAdr':
      'Účastníme se nezávislého programu Retail ADR. Pokud se na vyřízení stížnosti mezi sebou nedohodneme, můžete ji zdarma předat Retail ADR. Naše podpora vám na požádání pošle číslo případu i formuláře.',
    'screensA.imprint.h2Content': 'Odpovědnost za obsah',
    'screensA.imprint.bodyContent':
      'Obsah těchto stránek připravujeme pečlivě, nemůžeme ale zaručit, že každý článek zůstane přesný, jak se mění verze firmwaru a aplikace. Pokud si článek odporuje s tištěným bezpečnostním návodem z krabice, platí tištěný návod.',
    'screensA.imprint.h2Links': 'Odpovědnost za odkazy',
    'screensA.imprint.bodyLinks':
      'Některé články odkazují na sledování zásilek, obchody s aplikacemi nebo komunitní příspěvky, které neřídíme. Externí odkazy kontrolujeme, když je přidáváme, neodpovídáme ale za to, co se na těch stránkách změní později.',
    'screensA.imprint.h2Copyright': 'Autorská práva',
    'screensA.imprint.bodyCopyright':
      'Veškeré texty, ilustrace a produktové fotografie na tomto webu patří společnosti Hearth Home Ltd., není-li uvedeno jinak. Citovat článek nápovědy s odkazem zpět můžete; před převzetím celé stránky se nás prosím zeptejte.',
    'screensA.imprint.callout':
      'Toto je ukázkový portál postavený na Adminium. Všechny firemní údaje, adresy i registrační čísla na této stránce jsou smyšlené.',

    /* ------------------------------------------------------- installers */
    'screensA.installers.radius': '{count} míle|{count} míle|{count} mil',
    'screensA.installers.count':
      '{installers} do {count} míle|{installers} do {count} mil|{installers} do {count} mil',
    'screensA.installers.toastPostcode': 'Zadejte PSČ pro vyhledávání',
    'screensA.installers.toastFound':
      '{count} technik poblíž {postcode}|{count} technici poblíž {postcode}|{count} techniků poblíž {postcode}',
    'screensA.installers.toastCall': 'Volání v této ukázce nefunguje',
    'screensA.installers.toastRequest': 'Poptávka odeslána technikovi {name}',
    'screensA.installers.h1': 'Najít schváleného technika',
    'screensA.installers.lede':
      'Každý technik tady je vyškolený na hardware Hearth, pojištěný a hodnocený jen zákazníky, kteří si ho opravdu objednali. Zapojení zvonku nebo výměna termostatu zabere obvykle méně než dvě hodiny.',
    'screensA.installers.postcode': 'PSČ',
    'screensA.installers.within': 'Do vzdálenosti',
    'screensA.installers.find': 'Najít techniky',
    'screensA.installers.sorted': 'seřazeno podle vzdálenosti',
    'screensA.installers.approved': 'Schválený',
    'screensA.installers.call': 'Zavolat',
    'screensA.installers.request': 'Poptat návštěvu',
    'screensA.installers.note':
      'Technici jsou samostatné firmy. Práce objednaná přes Hearth je krytá naší dvouletou zárukou na instalaci — schovejte si fakturu a případný spor vyřešíme my.',

    /* -------------------------------------------------------- insurance */
    'screensA.insurance.retention':
      'Váš tarif uchovává záznamy {days} dní, takže cokoli před {date} už je pryč. Ozvěte se co nejdřív — jakmile záznam vyprší, obnovit ho nedokážeme.',
    'screensA.insurance.h1': 'Pojistné události',
    'screensA.insurance.lede':
      'Pojišťovny obvykle chtějí záznam, časová razítka a doklad, že zařízení fungovalo. Všechno tři umíme dát do jednoho balíčku — zdarma a obvykle do hodiny.',
    'screensA.insurance.pack': 'Co je v důkazním balíčku',
    'screensA.insurance.packText':
      'Původní záznamy, podepsaný protokol časových razítek, historie stavu zařízení a shrnutí v PDF, které přečte likvidátor.',
    'screensA.insurance.privacy': 'S vaší pojišťovnou nikdy nemluvíme',
    'screensA.insurance.privacyText':
      'Balíček dostanete vy. Nikomu ho nesdílíme, dokud ho neodešlete sami nebo to nenařídí soud.',
    'screensA.insurance.yourClaims': 'Vaše události',
    'screensA.insurance.emailInsurer': 'Poslat pojišťovně',
    'screensA.insurance.requestTitle': 'Vyžádat důkazní balíček',
    'screensA.insurance.what': 'Co se stalo?',
    'screensA.insurance.date': 'Datum události',
    'screensA.insurance.window': 'Časové okno k pokrytí',
    'screensA.insurance.ref': 'Pojišťovna nebo značka',
    'screensA.insurance.optional': 'Nepovinné',
    'screensA.insurance.refPlaceholder': 'např. Aviva · událost 4471882',
    'screensA.insurance.note': 'Má likvidátor něco vědět?',
    'screensA.insurance.notePlaceholder':
      'Co bylo poškozeno nebo odcizeno a kdy jste si toho zhruba všimli.',
    'screensA.insurance.submit': 'Sestavit důkazní balíček',

    /* --------------------------------------------------------------- kb */
    'screensA.kb.h1': 'Prohledat znalostní bázi',
    'screensA.kb.placeholder':
      'Prohledat {count} článek — zkuste „reset“ nebo „offline“|Prohledat {count} články — zkuste „reset“ nebo „offline“|Prohledat {count} článků — zkuste „reset“ nebo „offline“',
    'screensA.kb.clear': 'Vymazat',
    'screensA.kb.sortLabel': 'Seřadit výsledky',
    'screensA.kb.sortRelevance': 'Nejrelevantnější',
    'screensA.kb.sortShort': 'Nejrychlejší čtení',
    'screensA.kb.sortAz': 'A – Z',
    'screensA.kb.emptyTitle': 'Nic neodpovídá dotazu „{query}“',
    'screensA.kb.emptyBody':
      'Zkuste méně slov nebo některý z těchto dotazů — většina lidí najde, co hledá, hned v prvním výsledku.',
    'screensA.kb.emptyAction': 'Zeptat se nás',
    'screensA.kb.alsoSearch': 'Lidé také hledají:',
  },

  'da-DK': {
    /* ------------------------------------------------------------- a11y */
    'screensA.a11y.title': 'Indstillinger for tilgængelighed',
    'screensA.a11y.lede':
      'De gælder i hele hjælpecenteret og i Hearth-appen på denne konto. Ændringer træder i kraft med det samme — forhåndsvisningen viser præcis resultatet.',
    'screensA.a11y.size': 'Visningsstørrelse',
    'screensA.a11y.sizeNote':
      'Skalerer hele hjælpecenteret — tekst, knapper og afstande på én gang. Virker, så snart du vælger en.',
    'screensA.a11y.palette': 'Farvepalet',
    'screensA.a11y.paletteNote':
      'Statusfarver følges altid af et ikon og en tekst, aldrig farven alene.',
    'screensA.a11y.sample': 'Levende eksempel',
    'screensA.a11y.sampleTitle': 'Ret en enhed, der står som offline',
    'screensA.a11y.sampleBody':
      'Mærkatet »offline« forsvinder som regel af sig selv i løbet af få minutter. Sker det ikke, så genstart enheden og tjek, at din router ikke har skiftet kanal.',
    'screensA.a11y.solved': 'Løst',
    'screensA.a11y.pending': 'Afventer',
    'screensA.a11y.actionNeeded': 'Handling kræves',
    'screensA.a11y.readArticle': 'Læs artiklen',
    'screensA.a11y.shortcuts': 'Tastaturgenveje',
    'screensA.a11y.shortcutsBody':
      'Tryk på {slash} for at søge overalt, og på {esc} for at lukke et panel.',
    'screensA.a11y.seeAll': 'Se alle genveje',
    'screensA.a11y.appearance': 'Udseende',
    'screensA.a11y.followSystem': 'Følg systemets tema',
    'screensA.a11y.save': 'Gem indstillinger',
    'screensA.a11y.reset': 'Nulstil',

    /* ------------------------------------------------------------ about */
    'screensA.about.eyebrow': 'OM HEARTH',
    'screensA.about.h1': 'Vi bygger hjemmeteknik, der ikke er i vejen.',
    'screensA.about.lede':
      'Hearth begyndte i et værksted i Bristol i 2015 med én stædig idé: et smart hjem skal føles roligere end et almindeligt. Ti år efter sender vi stadig et trykt startkort med hver enhed — og et telefonnummer, hvor et menneske tager den.',
    'screensA.about.stat1': 'Grundlagt i Bristol',
    'screensA.about.stat2': 'Hjem med Hearth',
    'screensA.about.stat3': 'Ansatte, {count} af dem i support',
    'screensA.about.h2Products': 'Færre enheder, bedre enheder',
    'screensA.about.body1':
      'Vi laver fire produkter. Det er med vilje — så får hvert af dem firmware i mindst syv år, og vores support kender dem alle ud og ind.',
    'screensA.about.body2':
      'Alt designes i Bristol og samles i Portugal. Vores emballage har været plastfri siden 2021, og enhver Hearth-enhed kan repareres i stedet for at blive skiftet ud.',
    'screensA.about.h2Values': 'Det, vi holder fast i',
    'screensA.about.value1Title': 'Et menneske svarer',
    'screensA.about.value1Body':
      'Ingen telefonmenuer, ingen køer kun med bots. Første svar kommer på hverdage typisk på under to timer.',
    'screensA.about.value2Title': 'Dit hjem, dine data',
    'screensA.about.value2Body':
      'Videoklip er krypteret hele vejen og bliver aldrig solgt, delt eller brugt til at træne noget.',
    'screensA.about.value3Title': 'Bygget til at blive repareret',
    'screensA.about.value3Body':
      'Reservedele i syv år, gratis reparationsguides og bytterabat på gamle enheder.',
    'screensA.about.h2Team': 'Supportteamet',
    'screensA.about.role1': 'Supportchef',
    'screensA.about.role2': 'Hardwarediagnostik',
    'screensA.about.role3': 'Community-ansvarlig',
    'screensA.about.role4': 'Returnering og garanti',
    'screensA.about.ctaTitle': 'Spørgsmål til din Hearth?',
    'screensA.about.ctaBody':
      'Start i hjælpecenteret, eller tal direkte med teamet — alt efter hvad der er hurtigst for dig.',
    'screensA.about.contact': 'Kontakt os',
    'screensA.about.helpCenter': 'Hjælpecenter',

    /* ------------------------------------------------------------ appts */
    'screensA.appts.confirmed': 'Bekræftet',
    'screensA.appts.awaiting': 'Afventer pakke',
    'screensA.appts.completed': 'Afsluttet',
    'screensA.appts.toastCalendar': 'Kalenderinvitation sendt',
    'screensA.appts.toastReschedule': 'Vælg et nyt tidspunkt nedenfor',
    'screensA.appts.toastCancelled': 'Aftale {id} aflyst',
    'screensA.appts.toastReport': 'Servicerapporter findes ikke i denne demo',
    'screensA.appts.title': 'Serviceaftaler',
    'screensA.appts.lede':
      'Teknikerbesøg, indsendte reparationer og installationer samlet ét sted. Gratis ombooking indtil 24 timer før.',
    'screensA.appts.book': 'Book et besøg',
    'screensA.appts.upcoming': 'Kommende',
    'screensA.appts.past': 'Tidligere',
    'screensA.appts.addCalendar': 'Føj til kalender',
    'screensA.appts.reschedule': 'Book om',
    'screensA.appts.cancel': 'Aflys',
    'screensA.appts.report': 'Rapport',
    'screensA.appts.emptyTitle': 'Intet booket',
    'screensA.appts.emptyBody':
      'Når du booker en reparation eller installation, dukker den op her med teknikerens oplysninger.',

    /* ---------------------------------------------------------- article */
    'screensA.article.saved': 'Gemt',
    'screensA.article.save': 'Gem',
    'screensA.article.savedArticles': 'Gemte artikler',
    'screensA.article.helpful': 'Var det nyttigt?',
    'screensA.article.yes': 'Ja',
    'screensA.article.no': 'Nej',
    'screensA.article.related': 'Relaterede artikler',

    /* ------------------------------------------------------------- auto */
    'screensA.auto.title': 'Automatiseringer',
    'screensA.auto.close': 'Luk',
    'screensA.auto.new': 'Ny automatisering',
    'screensA.auto.nameLabel': 'Giv den et navn',
    'screensA.auto.namePlaceholder': 'f.eks. Udelys når nogen ringer på',
    'screensA.auto.when': 'NÅR',
    'screensA.auto.then': 'SÅ',
    'screensA.auto.whenLabel': 'dette sker',
    'screensA.auto.thenLabel': 'gør dette',
    'screensA.auto.chooseTrigger': 'Vælg en udløser…',
    'screensA.auto.chooseAction': 'Vælg en handling…',
    'screensA.auto.create': 'Opret automatisering',
    'screensA.auto.cancel': 'Annullér',
    'screensA.auto.badgeNew': 'Ny',
    'screensA.auto.toggleLabel': 'Slå til eller sæt på pause',
    'screensA.auto.deleteLabel': 'Slet automatisering',
    'screensA.auto.emptyTitle': 'Ingen automatiseringer endnu',
    'screensA.auto.emptyBody':
      'En automatisering er én udløser og én handling — start i det små, for eksempel udelyset, der tænder, når dørklokken ser nogen efter mørkets frembrud.',
    'screensA.auto.emptyAction': 'Opret den første',
    'screensA.auto.note':
      'Automatiseringer kører på dine enheder, ikke i vores sky — de virker også under et nedbrud, og når internettet falder ud.',

    /* ---------------------------------------------------------- billing */
    'screensA.billing.title': 'Betaling og fakturaer',
    'screensA.billing.export': 'Eksportér alt som CSV',
    'screensA.billing.currentPlan': 'Nuværende abonnement',
    'screensA.billing.changePlan': 'Skift abonnement',
    'screensA.billing.applyCredit': 'Brug tilgodehavende',
    'screensA.billing.paymentMethod': 'Betalingsmetode',
    'screensA.billing.cardMeta': 'Visa · udløber {exp}',
    'screensA.billing.credit': 'Tilgodehavende',
    'screensA.billing.updateCard': 'Opdatér kort',
    'screensA.billing.history': 'Historik',
    'screensA.billing.periodLabel': 'Faktureringsperiode',
    'screensA.billing.note':
      'Fakturaer for hardware udstedes af Hearth Home Ltd. og indeholder 20 % moms. Abonnementsfakturaer viser den periode, de dækker — opsiger du midt i en periode, refunderer vi automatisk de ubrugte dage.',

    /* ------------------------------------------------------------ board */
    'screensA.board.title': 'Henvisningstoplisten',
    'screensA.board.lede':
      'Kvartalets bedste henvisere. Alle får stadig {amount} pr. ven — toplisten gælder kun bonuspræmierne.',
    'screensA.board.quarter': 'Dette kvartal',
    'screensA.board.allTime': 'Nogensinde',
    'screensA.board.periodLabel': 'Periode for toplisten',
    'screensA.board.you': 'Dig',
    'screensA.board.friendsJoined': 'venner tilmeldt',
    'screensA.board.invite': 'Inviter nogen',
    'screensA.board.prizes': 'Bonuspræmier',
    'screensA.board.legal':
      'Kun henvisninger, hvor ordren er afsendt, tælles med, og selvhenvisninger fjernes automatisk. Præmier godskrives din konto inden for en uge efter kvartalets afslutning. Placeringer opdateres hver time.',

    /* ----------------------------------------------------------- breach */
    'screensA.breach.badge': 'Sikkerhedsmeddelelse',
    'screensA.breach.published': 'udgivet {published} · opdateret {updated}',
    'screensA.breach.h1':
      'En ekstern e-mailleverandør blotlagde nogle kunders e-mailadresser',
    'screensA.breach.lede':
      'Den 22. juli opdagede vi, at en leverandør, vi bruger til ordremails, havde en forkert opsat backup. E-mailadresser og ordrenumre kunne læses i omkring 40 timer. Ingen adgangskoder, betalingsoplysninger, videoklip eller adresser var berørt.',
    'screensA.breach.statusTitle': 'Inddæmmet og lukket',
    'screensA.breach.statusText':
      'Backuppen blev sikret inden for to timer efter opdagelsen. Leverandøren er blevet auditeret, og det berørte system er taget ud af drift.',
    'screensA.breach.tableHead': 'Hvad der blev berørt — og hvad der ikke gjorde',
    'screensA.breach.affected': 'Er jeg berørt?',
    'screensA.breach.checkIntro':
      'Alle berørte fik en e-mail den 24. juli. Du kan også tjekke her — vi sammenligner kun med listen over blotlagte adresser og gemmer ikke, hvad du skriver.',
    'screensA.breach.emailLabel': 'Din e-mailadresse',
    'screensA.breach.check': 'Tjek',
    'screensA.breach.steps': 'Det anbefaler vi',
    'screensA.breach.timeline': 'Tidslinje',
    'screensA.breach.regulator': 'Tilsynsmyndighed',
    'screensA.breach.regulatorText':
      'Anmeldt til ICO den {date}, sagsnummer {ref}. Du kan altid klage direkte til dem.',
    'screensA.breach.questions': 'Spørgsmål',
    'screensA.breach.questionsText':
      'Vores databeskyttelsesansvarlige svarer personligt på {email}.',
    'screensA.breach.contact': 'Kontakt os',
    'screensA.breach.disclaimer':
      'Dette er en demoportal. Den beskrevne hændelse er opdigtet, og ingen rigtige data er involveret.',

    /* ---------------------------------------------------------- bundles */
    'screensA.bundles.title': 'Pakketilbud',
    'screensA.bundles.lede':
      'Køb enheder samlet, så trækkes rabatten ved betaling — uden koder. En pakke sendes som én forsendelse og deler samme startdato for den toårige garanti.',
    'screensA.bundles.save': 'Spar {save}',
    'screensA.bundles.add': 'Tilføj pakke',
    'screensA.bundles.byoTitle': 'Byg din egen',
    'screensA.bundles.byoSub': 'Fra tre enheder trækkes 10 % automatisk.',
    'screensA.bundles.noteDiscount': '10 % pakkerabat anvendt',
    'screensA.bundles.noteMore':
      '{count} mere for 10 % rabat|{count} mere for 10 % rabat',
    'screensA.bundles.notePick': 'vælg mindst tre',
    'screensA.bundles.toastMin': 'Vælg mindst to enheder',
    'screensA.bundles.toastAddedDiscount': 'Pakke tilføjet — 10 % rabat anvendt',
    'screensA.bundles.toastAddedPlain': 'Pakke tilføjet — ingen rabat endnu',
    'screensA.bundles.toastAddedNamed':
      'Pakken {name} tilføjet — du sparer {save}',
    'screensA.bundles.groupLabel': 'Enheder i din pakke',
    'screensA.bundles.selected': '{devices} valgt',
    'screensA.bundles.addMine': 'Tilføj min pakke',

    /* ------------------------------------------------------------ claim */
    'screensA.claim.toastFiles': 'Der er ikke flere demofiler',
    'screensA.claim.toastFault': 'Fortæl lidt mere om fejlen',
    'screensA.claim.toastSubmitted': 'Sag indsendt',
    'screensA.claim.doneTitle': 'Sag modtaget',
    'screensA.claim.doneBody':
      'Vi vurderer den inden for to hverdage. Hav enheden ved hånden — vi kan bede om et foto af typeskiltet.',
    'screensA.claim.outcomeChip': '{outcome} ønsket',
    'screensA.claim.tl1Note': 'Vi har din beskrivelse og dine fotos.',
    'screensA.claim.tl2Label': 'Vurdering',
    'screensA.claim.tl2Note': 'En tekniker gennemgår den inden for to hverdage.',
    'screensA.claim.tl3Label': '{outcome} arrangeret',
    'screensA.claim.tl3Note': 'Vi bekræfter på mail og booker det nødvendige.',
    'screensA.claim.bookRepair': 'Book en reparationstid',
    'screensA.claim.another': 'Opret en ny sag',
    'screensA.claim.h1': 'Gør garantien gældende',
    'screensA.claim.lede':
      'To års dækning som standard, tre hvis du registrerede enheden. Fejl ved normal brug er dækket; skader ved uheld og vandindtrængning er ikke.',
    'screensA.claim.whichDevice': 'Hvilken enhed er defekt?',
    'screensA.claim.deviceNote': '{serial} · dækket til {expires}',
    'screensA.claim.faultLabel': 'Hvad er gået galt?',
    'screensA.claim.faultPlaceholder':
      'Beskriv fejlen, hvornår den startede, og hvad du allerede har prøvet.',
    'screensA.claim.preferredOutcome': 'Foretrukken løsning',
    'screensA.claim.photos': 'Fotos af fejlen',
    'screensA.claim.addPhoto': 'Tilføj foto',
    'screensA.claim.submit': 'Indsend sag',

    /* ---------------------------------------------------------- contact */
    'screensA.contact.toastMissing': 'Tilføj navn, e-mail og en kort besked',
    'screensA.contact.toastSent': 'Besked sendt — vi svarer inden for en dag',
    'screensA.contact.h1': 'Kontakt os',
    'screensA.contact.lede':
      'Supporten er åben mandag til fredag kl. 8–19 britisk tid og lørdag kl. 9–14. Vælg den kanal, der passer dig.',
    'screensA.contact.chat': 'Livechat',
    'screensA.contact.chatBody': 'Hurtigste vej. Ventetid typisk under to minutter.',
    'screensA.contact.online': 'Online nu',
    'screensA.contact.email': 'E-mail',
    'screensA.contact.emailBody': 'Vi svarer inden for én hverdag.',
    'screensA.contact.phone': 'Telefon',
    'screensA.contact.phoneBody':
      'Bedst ved akutte spørgsmål om installation eller sikkerhed.',
    'screensA.contact.ticket': 'Opret en sag',
    'screensA.contact.ticketBody': 'Bedst når du kan vedhæfte fotos eller logfiler.',
    'screensA.contact.startTicket': 'Start en sag',
    'screensA.contact.formTitle': 'Skriv til os',
    'screensA.contact.formLede': 'Til alt, der ikke handler om en bestemt enhed.',
    'screensA.contact.name': 'Dit navn',
    'screensA.contact.message': 'Besked',
    'screensA.contact.messagePlaceholder': 'Hvad kan vi hjælpe med?',
    'screensA.contact.send': 'Send besked',
    'screensA.contact.headOffice': 'Hovedkontor',
    'screensA.contact.returnsDepot': 'Returlager',
    'screensA.contact.returnsBody':
      'Send ikke returvarer til kontoret — opret først en returnering og brug den forudbetalte label, du får på mail.',
    'screensA.contact.returnsLink': 'Sådan fungerer returnering',

    /* ----------------------------------------------------------- delete */
    'screensA.delete.step1': 'Hvad forsvinder',
    'screensA.delete.step2': 'Alternativer',
    'screensA.delete.step3': 'Bekræft',
    'screensA.delete.scheduledTitle': 'Sletning planlagt',
    'screensA.delete.keep': 'Behold min konto',
    'screensA.delete.downloadFirst': 'Hent mine data først',
    'screensA.delete.h1': 'Slet din konto',
    'screensA.delete.lede':
      'Vi viser dig, hvad der forsvinder, og hvad der bliver. Intet sker før sidste trin, og du har 30 dage til at skifte mening.',
    'screensA.delete.h2Things': 'Hvad der sker med dine ting',
    'screensA.delete.textThings':
      'Dine enheder kører videre lokalt — tidsplaner, advarsler og lokal optagelse fortsætter. Det er kontoen og alt i vores sky, der forsvinder.',
    'screensA.delete.calloutCopy':
      'Tag en kopi først, hvis du vil — en zip med din konto, dine enheder, tidsplaner og klipindeks, typisk klar på ti minutter.',
    'screensA.delete.h2Before': 'Før du går',
    'screensA.delete.textBefore':
      'De her løser ofte netop grunden til, at folk siger op. Spring dem over, hvis du har besluttet dig — vi spørger ikke igen.',
    'screensA.delete.reasonLabel': 'Hvorfor siger du op?',
    'screensA.delete.reasonOptional': 'Frivilligt, men det hjælper',
    'screensA.delete.reasonPlaceholder': 'Vil ikke oplyse',
    'screensA.delete.h2Confirm': 'Bekræft, at det er dig',
    'screensA.delete.textConfirm':
      'Skriv {word} for at bekræfte. Vi sender også et link på mail — kontoen røres ikke, før du følger det.',
    'screensA.delete.phraseLabel': 'Skriv DELETE',
    'screensA.delete.calloutDanger':
      'Efter 30 dage kan ingen fortryde det, heller ikke os. Klip, tidsplaner, ordrehistorik og eventuelt tilgodehavende følger med.',
    'screensA.delete.back': 'Tilbage',
    'screensA.delete.schedule': 'Planlæg sletning',
    'screensA.delete.continue': 'Fortsæt',
    'screensA.delete.cancel': 'Annullér og behold min konto',

    /* ---------------------------------------------------------- devices */
    'screensA.devices.online': 'Online',
    'screensA.devices.batteryLow': 'Lavt batteri',
    'screensA.devices.offline': 'Offline',
    'screensA.devices.summaryOffline':
      '{devices} · {count} offline · tilkoblet siden {time}|{devices} · {count} offline · tilkoblet siden {time}',
    'screensA.devices.summaryAll':
      '{devices} · alle kan nås · tilkoblet siden {time}',
    'screensA.devices.unread': '{count} ulæst|{count} ulæste',
    'screensA.devices.allCaught': 'Alt er læst',
    'screensA.devices.memberLine':
      '{people} · {count} invitation afventer|{people} · {count} invitationer afventer',
    'screensA.devices.liveLine':
      '{cameras} · {count} klip i dag|{cameras} · {count} klip i dag',
    'screensA.devices.autoLine': '{running} kører, {paused} på pause',
    'screensA.devices.toastOn': '{name} · {label} slået til',
    'screensA.devices.toastOff': '{name} · {label} slået fra',
    'screensA.devices.toastAdd': 'Enheder tilføjes i Hearth-appen',
    'screensA.devices.add': 'Tilføj en enhed',
    'screensA.devices.energy': 'Energiindsigt',
    'screensA.devices.liveView': 'Livevisning',
    'screensA.devices.automations': 'Automatiseringer',
    'screensA.devices.notifications': 'Notifikationer',
    'screensA.devices.household': 'Husstand',

    /* -------------------------------------------------------- downloads */
    'screensA.downloads.appIphone': 'Hearth til iPhone',
    'screensA.downloads.appAndroid': 'Hearth til Android',
    'screensA.downloads.toastStore':
      'Links til app-butikker er slået fra i denne demo',
    'screensA.downloads.h1': 'Downloads og manualer',
    'screensA.downloads.lede':
      'Manualer, startkort, tilslutningsdiagrammer og værktøjer til installatører. Alt her er gratis og kræver ingen konto.',
    'screensA.downloads.toastFile': 'Henter {file}',
    'screensA.downloads.getFile': 'Hent fil',
    'screensA.downloads.download': 'Download',
    'screensA.downloads.getApp': 'Hent appen',

    /* ----------------------------------------------------------- energy */
    'screensA.energy.week': 'Uge',
    'screensA.energy.month': 'Måned',
    'screensA.energy.year': 'År',
    'screensA.energy.h1': 'Energiindsigt',
    'screensA.energy.lede':
      'Beregnet ud fra din termostat og dine stikkontakter. Skøn bruger din tarif — ret den i appen, hvis den er forældet.',
    'screensA.energy.periodLabel': 'Periode',
    'screensA.energy.byRoom': 'Efter rum',

    /* --------------------------------------------------------- firmware */
    'screensA.firmware.h1': 'Udgivelsesnoter for firmware',
    'screensA.firmware.lede':
      'Opdateringer installerer sig selv om natten. Du kan altid sætte en i gang manuelt i appen under Indstillinger → Om.',
    'screensA.firmware.allDevices': 'Alle enheder',
    'screensA.firmware.rolling': 'Rulles ud',

    /* ------------------------------------------------------------ forum */
    'screensA.forum.toastPost': 'Indlæg er slået fra i denne demo',
    'screensA.forum.h1': 'Brugerforum',
    'screensA.forum.lede':
      'Del opsætninger, automatiseringer og løsninger med andre Hearth-ejere. Hearth-teamet kigger forbi hver dag — se efter mærket.',
    'screensA.forum.start': 'Start en diskussion',
    'screensA.forum.answered': 'Besvaret',
    'screensA.forum.inCat': 'i {cat}',
    'screensA.forum.answerFrom': 'Svar fra {name}',
    'screensA.forum.reply': 'Svar i tråden',
    'screensA.forum.askSupport': 'Spørg supporten i stedet',
    'screensA.forum.emptyTitle': 'Ingen diskussioner her endnu',
    'screensA.forum.emptyBody':
      'Der er ikke noget i denne kategori endnu. Start den første tråd, så ligger den øverst for alle.',
    'screensA.forum.thisWeek': 'Denne uge',
    'screensA.forum.newPosts': 'nye indlæg',
    'screensA.forum.answeredStat': 'besvaret',
    'screensA.forum.topContributors': 'Mest aktive',
    'screensA.forum.helpfulPosts': '{count} nyttigt indlæg|{count} nyttige indlæg',
    'screensA.forum.rules': 'Husregler',
    'screensA.forum.rulesBody':
      'Vær venlig, hold dig til emnet, og skriv aldrig serienumre eller ordreoplysninger i offentlige tråde.',

    /* ------------------------------------------------------------- gift */
    'screensA.gift.whenNow': 'Med det samme',
    'screensA.gift.whenTomorrow': 'I morgen tidlig',
    'screensA.gift.whenDate': 'På en dato, jeg vælger',
    'screensA.gift.sentNow': 'Det er på vej til {where} lige nu, med din besked.',
    'screensA.gift.theirInbox': 'modtagerens indbakke',
    'screensA.gift.sentLater':
      'Vi leverer det den morgen, du valgte, med din besked.',
    'screensA.gift.toastMin': 'Gavekort starter ved {min}',
    'screensA.gift.toastWho': 'Hvem er det til?',
    'screensA.gift.toastEmail': 'Tilføj modtagerens e-mailadresse',
    'screensA.gift.toastSent': 'Gavekort sendt',
    'screensA.gift.toastCode': 'Indtast hele koden fra mailen',
    'screensA.gift.toastBalance': '{amount} lagt til din saldo',
    'screensA.gift.buyAnother': 'Køb et mere',
    'screensA.gift.h1': 'Gavekort',
    'screensA.gift.lede':
      'Kan bruges på enhver Hearth-enhed, reservedel eller Hearth Care-abonnement. Ingen udløbsdato, ingen gebyrer, og pengene tilbage inden for 14 dage, hvis det er ubrugt.',
    'screensA.gift.design': 'Vælg et design',
    'screensA.gift.amount': 'Beløb',
    'screensA.gift.other': 'Andet',
    'screensA.gift.customPlaceholder': 'Frit beløb fra {min} til {max}',
    'screensA.gift.customAria': 'Selvvalgt beløb på gavekortet',
    'screensA.gift.recipient': 'Modtagerens navn',
    'screensA.gift.theirEmail': 'Modtagerens e-mail',
    'screensA.gift.message': 'Besked',
    'screensA.gift.optional': 'Valgfrit',
    'screensA.gift.messagePlaceholder':
      'Tillykke med fødselsdagen — gør huset klogere.',
    'screensA.gift.whenLabel': 'Hvornår skal vi sende det?',
    'screensA.gift.buy': 'Køb gavekort på {amount}',
    'screensA.gift.preview': 'Forhåndsvisning',
    'screensA.gift.for': 'Til {name}',
    'screensA.gift.someoneLucky': 'en heldig',
    'screensA.gift.messageHere': 'Din besked vises her.',
    'screensA.gift.foot': 'ingen udløbsdato · {url}',
    'screensA.gift.redeem': 'Indløs et kort',
    'screensA.gift.codeAria': 'Gavekortkode',
    'screensA.gift.addBalance': 'Læg til saldo',
    'screensA.gift.yourBalance': 'Din saldo',

    /* ------------------------------------------------------------ guide */
    'screensA.guide.buyCard': 'Køb et gavekort i stedet',
    'screensA.guide.filterLabel': 'Filtrér gaveguiden',
    'screensA.guide.addBasket': 'Læg i kurv',
    'screensA.guide.saveLater': 'Gem',
    'screensA.guide.delivery': 'Levering til tiden',
    'screensA.guide.wrapHead': 'Klar som gave som standard',
    'screensA.guide.wrapText':
      'Plastfri æsker, ingen priser på følgesedlen og et håndskrevet kort, hvis du tilføjer en besked ved betaling. Alt købt fra november kan returneres til og med 31. januar.',
    'screensA.guide.returnsLink': 'Sådan fungerer forlænget returret',

    /* ------------------------------------------------------------- home */
    'screensA.home.browse': 'Find efter emne',
    'screensA.home.popular': 'Populære artikler',
    'screensA.home.ctaTitle': 'Kan du ikke finde det, du søger?',
    'screensA.home.ctaBody':
      'Opret en sag, så tager vi over. De fleste svar kommer inden for en dag.',
    'screensA.home.openTicket': 'Opret en sag',

    /* ---------------------------------------------------------- imprint */
    'screensA.imprint.termCompany': 'Registreret selskab',
    'screensA.imprint.termAddress': 'Registreret adresse',
    'screensA.imprint.termDirectors': 'Direktion',
    'screensA.imprint.termNumber': 'Selskabsnummer',
    'screensA.imprint.termVat': 'Momsnummer',
    'screensA.imprint.termContact': 'Kontakt',
    'screensA.imprint.termResponsible': 'Ansvarlig for indhold',
    'screensA.imprint.responsibleValue': '{name}, adresse som ovenfor',
    'screensA.imprint.h1': 'Kolofon',
    'screensA.imprint.lede':
      'Lovpligtige selskabsoplysninger for Hearth Home Ltd. og dette website.',
    'screensA.imprint.updated': 'Sidst opdateret {date}',
    'screensA.imprint.h2Adr': 'Klageadgang for forbrugere',
    'screensA.imprint.bodyAdr':
      'Vi deltager i den uafhængige Retail ADR-ordning. Kan vi ikke løse en klage indbyrdes, kan du sende den videre til Retail ADR uden beregning. Vores support sender dig sagsnummer og formularer på forespørgsel.',
    'screensA.imprint.h2Content': 'Ansvar for indhold',
    'screensA.imprint.bodyContent':
      'Vi udarbejder indholdet på disse sider med omhu, men vi kan ikke garantere, at hver artikel forbliver præcis, når firmware- og appversioner ændrer sig. Hvis en artikel er i modstrid med den trykte sikkerhedsvejledning i æsken, gælder den trykte vejledning.',
    'screensA.imprint.h2Links': 'Ansvar for links',
    'screensA.imprint.bodyLinks':
      'Nogle artikler linker til fragtsporing, app-butikker eller indlæg i fællesskabet, som vi ikke kontrollerer. Vi tjekker eksterne links, når vi tilføjer dem, men vi er ikke ansvarlige for, hvad der senere ændrer sig på de sider.',
    'screensA.imprint.h2Copyright': 'Ophavsret',
    'screensA.imprint.bodyCopyright':
      'Al tekst, alle illustrationer og alle produktfotos på dette website tilhører Hearth Home Ltd., medmindre andet er angivet. Du må gerne citere en hjælpeartikel med et link tilbage; spørg os, før du gengiver en hel side.',
    'screensA.imprint.callout':
      'Dette er en demoportal bygget med Adminium. Alle selskabsoplysninger, adresser og registreringsnumre på denne side er opdigtede.',

    /* ------------------------------------------------------- installers */
    'screensA.installers.radius': '{count} mile|{count} miles',
    'screensA.installers.count':
      '{installers} inden for {count} mile|{installers} inden for {count} miles',
    'screensA.installers.toastPostcode': 'Indtast et postnummer for at søge',
    'screensA.installers.toastFound':
      '{count} installatør nær {postcode}|{count} installatører nær {postcode}',
    'screensA.installers.toastCall': 'Opkald er ikke muligt i denne demo',
    'screensA.installers.toastRequest': 'Forespørgsel sendt til {name}',
    'screensA.installers.h1': 'Find en godkendt installatør',
    'screensA.installers.lede':
      'Alle installatører her er uddannet i Hearth-hardware, forsikrede og kun bedømt af kunder, der rent faktisk har booket. At trække en dørklokke eller skifte en termostat tager som regel under to timer.',
    'screensA.installers.postcode': 'Postnummer',
    'screensA.installers.within': 'Inden for',
    'screensA.installers.find': 'Find installatører',
    'screensA.installers.sorted': 'sorteret efter afstand',
    'screensA.installers.approved': 'Godkendt',
    'screensA.installers.call': 'Ring op',
    'screensA.installers.request': 'Anmod om besøg',
    'screensA.installers.note':
      'Installatører er selvstændige virksomheder. Arbejde booket gennem Hearth er dækket af vores toårige installationsgaranti — gem fakturaen, så håndterer vi enhver tvist.',

    /* -------------------------------------------------------- insurance */
    'screensA.insurance.retention':
      'Dit abonnement gemmer klip i {days} dage, så alt før {date} er allerede væk. Spørg os så tidligt som muligt — når et klip er udløbet, kan vi ikke hente det tilbage.',
    'screensA.insurance.h1': 'Forsikringssager',
    'screensA.insurance.lede':
      'Forsikringsselskaber vil som regel have optagelsen, tidsstemplerne og bevis for, at enheden virkede. Vi kan samle alle tre i én pakke — gratis og normalt klar inden for en time.',
    'screensA.insurance.pack': 'Hvad en bevispakke indeholder',
    'screensA.insurance.packText':
      'Originale klip, en signeret tidsstempellog, historik over enhedernes status og et PDF-resumé, som en taksator kan læse.',
    'screensA.insurance.privacy': 'Vi taler aldrig med dit forsikringsselskab',
    'screensA.insurance.privacyText':
      'Pakken går til dig. Intet deles med nogen, medmindre du sender det, eller en domstol kræver det.',
    'screensA.insurance.yourClaims': 'Dine sager',
    'screensA.insurance.emailInsurer': 'Send til selskabet',
    'screensA.insurance.requestTitle': 'Bestil en bevispakke',
    'screensA.insurance.what': 'Hvad skete der?',
    'screensA.insurance.date': 'Dato for hændelsen',
    'screensA.insurance.window': 'Tidsrum, der skal dækkes',
    'screensA.insurance.ref': 'Selskab eller reference',
    'screensA.insurance.optional': 'Valgfrit',
    'screensA.insurance.refPlaceholder': 'f.eks. Aviva · sag 4471882',
    'screensA.insurance.note': 'Noget taksatoren bør vide?',
    'screensA.insurance.notePlaceholder':
      'Hvad der blev beskadiget eller taget, og cirka hvornår du opdagede det.',
    'screensA.insurance.submit': 'Byg min bevispakke',

    /* --------------------------------------------------------------- kb */
    'screensA.kb.h1': 'Søg i vidensbasen',
    'screensA.kb.placeholder':
      'Søg i {count} artikel — prøv »reset« eller »offline«|Søg i {count} artikler — prøv »reset« eller »offline«',
    'screensA.kb.clear': 'Ryd',
    'screensA.kb.sortLabel': 'Sortér resultater',
    'screensA.kb.sortRelevance': 'Mest relevante',
    'screensA.kb.sortShort': 'Hurtigst at læse',
    'screensA.kb.sortAz': 'A – Z',
    'screensA.kb.emptyTitle': 'Intet matchede »{query}«',
    'screensA.kb.emptyBody':
      'Prøv med færre ord, eller en af disse i stedet — de fleste finder det, de søger, i første resultat.',
    'screensA.kb.emptyAction': 'Spørg os i stedet',
    'screensA.kb.alsoSearch': 'Folk søger også efter:',
  },

  /* Chinese has a single cardinal category — one variant, never a `|`. */
  'zh-CN': {
    /* ------------------------------------------------------------- a11y */
    'screensA.a11y.title': '辅助功能设置',
    'screensA.a11y.lede':
      '这些设置适用于本账号下的整个帮助中心和 Hearth 应用。更改立即生效——预览会显示确切效果。',
    'screensA.a11y.size': '显示大小',
    'screensA.a11y.sizeNote': '同时缩放帮助中心的文字、按钮和间距。选择后立即生效。',
    'screensA.a11y.palette': '配色方案',
    'screensA.a11y.paletteNote': '状态颜色始终配有图标和文字说明，绝不单靠颜色表达。',
    'screensA.a11y.sample': '实时示例',
    'screensA.a11y.sampleTitle': '修复显示为离线的设备',
    'screensA.a11y.sampleBody':
      '“离线”标记通常几分钟后会自行消失。如果没有，请重启设备，并检查路由器是否更换了信道。',
    'screensA.a11y.solved': '已解决',
    'screensA.a11y.pending': '处理中',
    'screensA.a11y.actionNeeded': '需要处理',
    'screensA.a11y.readArticle': '阅读文章',
    'screensA.a11y.shortcuts': '键盘快捷键',
    'screensA.a11y.shortcutsBody': '按 {slash} 可随时搜索，按 {esc} 关闭任意面板。',
    'screensA.a11y.seeAll': '查看全部快捷键',
    'screensA.a11y.appearance': '外观',
    'screensA.a11y.followSystem': '跟随系统主题',
    'screensA.a11y.save': '保存设置',
    'screensA.a11y.reset': '重置',

    /* ------------------------------------------------------------ about */
    'screensA.about.eyebrow': '关于 HEARTH',
    'screensA.about.h1': '我们打造不碍事的家居科技。',
    'screensA.about.lede':
      'Hearth 于 2015 年在布里斯托的一间工坊起步，只有一个执拗的想法：智能家居应该比普通家居更让人安心。十年过去，我们仍然为每台设备附上一张印刷的快速上手卡，以及一个有真人接听的电话号码。',
    'screensA.about.stat1': '创立于布里斯托',
    'screensA.about.stat2': '个家庭在使用 Hearth',
    'screensA.about.stat3': '名员工，其中 {count} 名在客服团队',
    'screensA.about.h2Products': '设备更少，品质更好',
    'screensA.about.body1':
      '我们只做四款产品。这是刻意为之——每款都能获得至少七年的固件支持，客服团队也对它们了如指掌。',
    'screensA.about.body2':
      '所有产品在布里斯托设计、在葡萄牙组装。我们的包装自 2021 年起不含塑料，任何 Hearth 设备都可以修，而不是换。',
    'screensA.about.h2Values': '我们坚持的原则',
    'screensA.about.value1Title': '由真人回复',
    'screensA.about.value1Body':
      '没有电话语音菜单，也没有纯机器人排队。工作日首次回复的中位时间不到两小时。',
    'screensA.about.value2Title': '你的家，你的数据',
    'screensA.about.value2Body':
      '视频片段端到端加密，绝不出售、共享，也不用于训练任何模型。',
    'screensA.about.value3Title': '为维修而生',
    'screensA.about.value3Body':
      '备件供应七年、免费维修指南，旧机以旧换新还能抵扣。',
    'screensA.about.h2Team': '客服团队',
    'screensA.about.role1': '客服主管',
    'screensA.about.role2': '硬件诊断',
    'screensA.about.role3': '社区运营',
    'screensA.about.role4': '退货与保修',
    'screensA.about.ctaTitle': '对你的 Hearth 有疑问？',
    'screensA.about.ctaBody':
      '可以先看帮助中心，也可以直接联系团队——哪个更快就用哪个。',
    'screensA.about.contact': '联系我们',
    'screensA.about.helpCenter': '帮助中心',

    /* ------------------------------------------------------------ appts */
    'screensA.appts.confirmed': '已确认',
    'screensA.appts.awaiting': '等待包裹',
    'screensA.appts.completed': '已完成',
    'screensA.appts.toastCalendar': '日历邀请已发送',
    'screensA.appts.toastReschedule': '请在下方选择新的时段',
    'screensA.appts.toastCancelled': '预约 {id} 已取消',
    'screensA.appts.toastReport': '本演示中没有服务报告',
    'screensA.appts.title': '上门服务预约',
    'screensA.appts.lede':
      '工程师上门、寄修和安装都在这里。提前 24 小时以上可免费改期。',
    'screensA.appts.book': '预约上门',
    'screensA.appts.upcoming': '即将进行',
    'screensA.appts.past': '已结束',
    'screensA.appts.addCalendar': '加入日历',
    'screensA.appts.reschedule': '改期',
    'screensA.appts.cancel': '取消',
    'screensA.appts.report': '报告',
    'screensA.appts.emptyTitle': '暂无预约',
    'screensA.appts.emptyBody': '预约维修或安装后，会连同工程师的信息显示在这里。',

    /* ---------------------------------------------------------- article */
    'screensA.article.saved': '已收藏',
    'screensA.article.save': '稍后再读',
    'screensA.article.savedArticles': '已收藏文章',
    'screensA.article.helpful': '这篇文章有帮助吗？',
    'screensA.article.yes': '有',
    'screensA.article.no': '没有',
    'screensA.article.related': '相关文章',

    /* ------------------------------------------------------------- auto */
    'screensA.auto.title': '自动化',
    'screensA.auto.close': '关闭',
    'screensA.auto.new': '新建自动化',
    'screensA.auto.nameLabel': '起个名字',
    'screensA.auto.namePlaceholder': '例如：有人按门铃时打开门廊灯',
    'screensA.auto.when': '当',
    'screensA.auto.then': '则',
    'screensA.auto.whenLabel': '发生这件事',
    'screensA.auto.thenLabel': '执行这个动作',
    'screensA.auto.chooseTrigger': '选择触发条件…',
    'screensA.auto.chooseAction': '选择动作…',
    'screensA.auto.create': '创建自动化',
    'screensA.auto.cancel': '取消',
    'screensA.auto.badgeNew': '新',
    'screensA.auto.toggleLabel': '启用或暂停',
    'screensA.auto.deleteLabel': '删除自动化',
    'screensA.auto.emptyTitle': '还没有自动化',
    'screensA.auto.emptyBody':
      '一条自动化就是一个触发条件加一个动作——先从小处开始，比如天黑后门铃看到有人时点亮门廊灯。',
    'screensA.auto.emptyAction': '创建第一条',
    'screensA.auto.note':
      '自动化在你的设备上运行，而不是我们的云端——服务中断或断网时依然有效。',

    /* ---------------------------------------------------------- billing */
    'screensA.billing.title': '账单与发票',
    'screensA.billing.export': '全部导出为 CSV',
    'screensA.billing.currentPlan': '当前套餐',
    'screensA.billing.changePlan': '更换套餐',
    'screensA.billing.applyCredit': '使用余额',
    'screensA.billing.paymentMethod': '支付方式',
    'screensA.billing.cardMeta': 'Visa · 有效期至 {exp}',
    'screensA.billing.credit': '账户余额',
    'screensA.billing.updateCard': '更新银行卡',
    'screensA.billing.history': '历史记录',
    'screensA.billing.periodLabel': '账单周期',
    'screensA.billing.note':
      '硬件发票由 Hearth Home Ltd. 开具，含 20% 增值税。套餐发票会标明所覆盖的周期——周期中途取消，我们会自动退还未使用的天数。',

    /* ------------------------------------------------------------ board */
    'screensA.board.title': '推荐排行榜',
    'screensA.board.lede':
      '本季度推荐最多的用户。每成功推荐一位好友仍可获得 {amount}——排行榜只用于额外奖励。',
    'screensA.board.quarter': '本季度',
    'screensA.board.allTime': '全部时间',
    'screensA.board.periodLabel': '排行榜周期',
    'screensA.board.you': '你',
    'screensA.board.friendsJoined': '位好友已加入',
    'screensA.board.invite': '邀请好友',
    'screensA.board.prizes': '额外奖励',
    'screensA.board.legal':
      '只有订单已发货的推荐才计入，自我推荐会被自动剔除。奖励将在季度结束后一周内计入你的账户。排名每小时更新一次。',

    /* ----------------------------------------------------------- breach */
    'screensA.breach.badge': '安全公告',
    'screensA.breach.published': '发布于 {published} · 更新于 {updated}',
    'screensA.breach.h1': '第三方邮件服务商泄露了部分客户邮箱地址',
    'screensA.breach.lede':
      '7 月 22 日，我们发现用于发送订单邮件的一家供应商备份配置有误。邮箱地址和订单编号在约 40 小时内可被读取。密码、支付信息、视频片段和住址均未涉及。',
    'screensA.breach.statusTitle': '已控制并关闭',
    'screensA.breach.statusText':
      '备份在发现后两小时内完成加固。该供应商已接受审计，受影响的系统已下线。',
    'screensA.breach.tableHead': '哪些受到影响，哪些没有',
    'screensA.breach.affected': '我受影响了吗？',
    'screensA.breach.checkIntro':
      '所有受影响的用户已于 7 月 24 日收到邮件。你也可以在这里查询——我们只与泄露地址清单比对，不会保存你输入的内容。',
    'screensA.breach.emailLabel': '你的邮箱地址',
    'screensA.breach.check': '查询',
    'screensA.breach.steps': '我们的建议',
    'screensA.breach.timeline': '时间线',
    'screensA.breach.regulator': '监管机构',
    'screensA.breach.regulatorText':
      '已于 {date} 向 ICO 报告，案号 {ref}。你随时可以直接向其投诉。',
    'screensA.breach.questions': '疑问',
    'screensA.breach.questionsText':
      '我们的数据保护负责人会亲自在 {email} 回复。',
    'screensA.breach.contact': '联系我们',
    'screensA.breach.disclaimer':
      '这是一个演示门户。此处描述的事件为虚构，不涉及任何真实数据。',

    /* ---------------------------------------------------------- bundles */
    'screensA.bundles.title': '套装优惠',
    'screensA.bundles.lede':
      '一起购买设备，结算时自动打折——无需优惠码。套装合并为一个包裹寄出，共用同一个两年保修起始日。',
    'screensA.bundles.save': '省 {save}',
    'screensA.bundles.add': '加入套装',
    'screensA.bundles.byoTitle': '自由搭配',
    'screensA.bundles.byoSub': '选满三台设备自动享 9 折。',
    'screensA.bundles.noteDiscount': '已享套装 9 折优惠',
    'screensA.bundles.noteMore': '再选 {count} 台即可享 9 折',
    'screensA.bundles.notePick': '至少选三台',
    'screensA.bundles.toastMin': '请至少选择两台设备',
    'screensA.bundles.toastAddedDiscount': '套装已加入——已享 9 折',
    'screensA.bundles.toastAddedPlain': '套装已加入——暂无折扣',
    'screensA.bundles.toastAddedNamed': '{name} 套装已加入——省 {save}',
    'screensA.bundles.groupLabel': '套装中的设备',
    'screensA.bundles.selected': '已选 {devices}',
    'screensA.bundles.addMine': '加入我的套装',

    /* ------------------------------------------------------------ claim */
    'screensA.claim.toastFiles': '演示文件已全部添加',
    'screensA.claim.toastFault': '请再多描述一些故障情况',
    'screensA.claim.toastSubmitted': '保修申请已提交',
    'screensA.claim.doneTitle': '已收到保修申请',
    'screensA.claim.doneBody':
      '我们会在两个工作日内评估。请把设备放在手边——我们可能需要铭牌的照片。',
    'screensA.claim.outcomeChip': '申请：{outcome}',
    'screensA.claim.tl1Note': '我们已收到你的描述和照片。',
    'screensA.claim.tl2Label': '评估',
    'screensA.claim.tl2Note': '工程师会在两个工作日内查看。',
    'screensA.claim.tl3Label': '已安排：{outcome}',
    'screensA.claim.tl3Note': '我们会通过邮件确认，并预约所需事项。',
    'screensA.claim.bookRepair': '预约维修时段',
    'screensA.claim.another': '再提交一份申请',
    'screensA.claim.h1': '申请保修',
    'screensA.claim.lede':
      '标配两年保修，注册后为三年。正常使用产生的故障在保修范围内；意外损坏和进水不在其列。',
    'screensA.claim.whichDevice': '哪台设备有故障？',
    'screensA.claim.deviceNote': '{serial} · 保修至 {expires}',
    'screensA.claim.faultLabel': '出了什么问题？',
    'screensA.claim.faultPlaceholder': '描述故障、出现时间，以及你已经尝试过的方法。',
    'screensA.claim.preferredOutcome': '希望的处理方式',
    'screensA.claim.photos': '故障照片',
    'screensA.claim.addPhoto': '添加照片',
    'screensA.claim.submit': '提交申请',

    /* ---------------------------------------------------------- contact */
    'screensA.contact.toastMissing': '请填写姓名、邮箱和简短留言',
    'screensA.contact.toastSent': '留言已发送——我们会在一天内回复',
    'screensA.contact.h1': '联系我们',
    'screensA.contact.lede':
      '客服工作时间为周一至周五 8:00–19:00（英国时间），周六 9:00–14:00。选择你方便的渠道即可。',
    'screensA.contact.chat': '在线客服',
    'screensA.contact.chatBody': '最快的方式，通常等待不到两分钟。',
    'screensA.contact.online': '当前在线',
    'screensA.contact.email': '电子邮件',
    'screensA.contact.emailBody': '我们会在一个工作日内回复。',
    'screensA.contact.phone': '电话',
    'screensA.contact.phoneBody': '安装或安全方面的紧急问题最适合打电话。',
    'screensA.contact.ticket': '提交工单',
    'screensA.contact.ticketBody': '需要附上照片或日志时最合适。',
    'screensA.contact.startTicket': '开始提交工单',
    'screensA.contact.formTitle': '给我们留言',
    'screensA.contact.formLede': '适用于与具体设备无关的任何问题。',
    'screensA.contact.name': '你的姓名',
    'screensA.contact.message': '留言',
    'screensA.contact.messagePlaceholder': '我们能帮你什么？',
    'screensA.contact.send': '发送留言',
    'screensA.contact.headOffice': '总部',
    'screensA.contact.returnsDepot': '退货仓库',
    'screensA.contact.returnsBody':
      '请勿把退货寄到办公室——先发起退货，再使用邮件中的预付运单。',
    'screensA.contact.returnsLink': '退货流程说明',

    /* ----------------------------------------------------------- delete */
    'screensA.delete.step1': '会删除什么',
    'screensA.delete.step2': '其他选择',
    'screensA.delete.step3': '确认',
    'screensA.delete.scheduledTitle': '删除已排期',
    'screensA.delete.keep': '保留我的账号',
    'screensA.delete.downloadFirst': '先下载我的数据',
    'screensA.delete.h1': '删除账号',
    'screensA.delete.lede':
      '我们会说明哪些会删除、哪些会保留。在最后一步之前不会有任何变动，之后还有 30 天可以反悔。',
    'screensA.delete.h2Things': '你的数据会怎样',
    'screensA.delete.textThings':
      '设备会继续在本地运行——定时、提醒和本地录制都不受影响。删除的是账号以及云端的一切。',
    'screensA.delete.calloutCopy':
      '如果需要，可以先导出一份副本——包含账号、设备、定时和录像索引的压缩包，通常十分钟内就绪。',
    'screensA.delete.h2Before': '在你离开之前',
    'screensA.delete.textBefore':
      '这些往往能解决大家想离开的原因。如果你已经决定，直接跳过即可——我们不会再问第二次。',
    'screensA.delete.reasonLabel': '为什么要离开？',
    'screensA.delete.reasonOptional': '选填，但对我们很有帮助',
    'screensA.delete.reasonPlaceholder': '不想说明',
    'screensA.delete.h2Confirm': '确认是你本人',
    'screensA.delete.textConfirm':
      '输入 {word} 以确认。我们还会给你发一封带链接的邮件——在你点击之前，账号不会有任何变动。',
    'screensA.delete.phraseLabel': '输入 DELETE',
    'screensA.delete.calloutDanger':
      '30 天后任何人都无法撤销，包括我们。录像、定时、订单记录和剩余余额都会一并删除。',
    'screensA.delete.back': '上一步',
    'screensA.delete.schedule': '排期删除',
    'screensA.delete.continue': '继续',
    'screensA.delete.cancel': '取消并保留我的账号',

    /* ---------------------------------------------------------- devices */
    'screensA.devices.online': '在线',
    'screensA.devices.batteryLow': '电量低',
    'screensA.devices.offline': '离线',
    'screensA.devices.summaryOffline': '{devices} · {count} 台离线 · 自 {time} 起布防',
    'screensA.devices.summaryAll': '{devices} · 全部在线 · 自 {time} 起布防',
    'screensA.devices.unread': '{count} 条未读',
    'screensA.devices.allCaught': '全部已读',
    'screensA.devices.memberLine': '{people} · {count} 份邀请待接受',
    'screensA.devices.liveLine': '{cameras} · 今天 {count} 段录像',
    'screensA.devices.autoLine': '{running} 条运行中，{paused} 条已暂停',
    'screensA.devices.toastOn': '{name} · {label} 已开启',
    'screensA.devices.toastOff': '{name} · {label} 已关闭',
    'screensA.devices.toastAdd': '请在 Hearth 应用中添加设备',
    'screensA.devices.add': '添加设备',
    'screensA.devices.energy': '能耗分析',
    'screensA.devices.liveView': '实时画面',
    'screensA.devices.automations': '自动化',
    'screensA.devices.notifications': '通知',
    'screensA.devices.household': '家庭成员',

    /* -------------------------------------------------------- downloads */
    'screensA.downloads.appIphone': 'Hearth iPhone 版',
    'screensA.downloads.appAndroid': 'Hearth Android 版',
    'screensA.downloads.toastStore': '本演示中已停用应用商店链接',
    'screensA.downloads.h1': '下载与手册',
    'screensA.downloads.lede':
      '说明书、快速上手卡、接线图和安装工具。全部免费，无需账号。',
    'screensA.downloads.toastFile': '正在下载 {file}',
    'screensA.downloads.getFile': '获取文件',
    'screensA.downloads.download': '下载',
    'screensA.downloads.getApp': '获取应用',

    /* ----------------------------------------------------------- energy */
    'screensA.energy.week': '周',
    'screensA.energy.month': '月',
    'screensA.energy.year': '年',
    'screensA.energy.h1': '能耗分析',
    'screensA.energy.lede':
      '根据你的恒温器和插座推算。估算使用你设置的电价——如果过期了，请在应用中修改。',
    'screensA.energy.periodLabel': '周期',
    'screensA.energy.byRoom': '按房间',

    /* --------------------------------------------------------- firmware */
    'screensA.firmware.h1': '固件更新说明',
    'screensA.firmware.lede':
      '更新会在夜间自动安装。你也可以随时在应用的「设置 → 关于」中手动触发。',
    'screensA.firmware.allDevices': '全部设备',
    'screensA.firmware.rolling': '灰度发布中',

    /* ------------------------------------------------------------ forum */
    'screensA.forum.toastPost': '本演示中已停用发帖',
    'screensA.forum.h1': '用户社区',
    'screensA.forum.lede':
      '与其他 Hearth 用户交流配置、自动化和排障经验。Hearth 团队每天都会来看看——认准徽章。',
    'screensA.forum.start': '发起讨论',
    'screensA.forum.answered': '已解答',
    'screensA.forum.inCat': '发布于 {cat}',
    'screensA.forum.answerFrom': '来自 {name} 的解答',
    'screensA.forum.reply': '在帖子中回复',
    'screensA.forum.askSupport': '改为咨询客服',
    'screensA.forum.emptyTitle': '这里还没有讨论',
    'screensA.forum.emptyBody':
      '这个分类暂时还没有内容。发起第一个帖子，它会置顶给所有人看到。',
    'screensA.forum.thisWeek': '本周',
    'screensA.forum.newPosts': '个新帖',
    'screensA.forum.answeredStat': '已解答',
    'screensA.forum.topContributors': '活跃贡献者',
    'screensA.forum.helpfulPosts': '{count} 个有帮助的帖子',
    'screensA.forum.rules': '社区规则',
    'screensA.forum.rulesBody':
      '请友善、切题，切勿在公开帖子中发布序列号或订单信息。',

    /* ------------------------------------------------------------- gift */
    'screensA.gift.whenNow': '立即发送',
    'screensA.gift.whenTomorrow': '明天早上',
    'screensA.gift.whenDate': '我指定的日期',
    'screensA.gift.sentNow': '正在发往 {where}，并附上你的留言。',
    'screensA.gift.theirInbox': '对方的邮箱',
    'screensA.gift.sentLater': '我们会在你选定的那个早上送达，并附上你的留言。',
    'screensA.gift.toastMin': '礼品卡最低 {min}',
    'screensA.gift.toastWho': '这份礼物送给谁？',
    'screensA.gift.toastEmail': '请填写对方的邮箱地址',
    'screensA.gift.toastSent': '礼品卡已发送',
    'screensA.gift.toastCode': '请输入邮件中的完整兑换码',
    'screensA.gift.toastBalance': '{amount} 已加入你的余额',
    'screensA.gift.buyAnother': '再买一张',
    'screensA.gift.h1': '礼品卡',
    'screensA.gift.lede':
      '可用于任意 Hearth 设备、备件或 Hearth Care 套餐。永不过期、无手续费，未使用可在 14 天内退款。',
    'screensA.gift.design': '选择卡面',
    'screensA.gift.amount': '金额',
    'screensA.gift.other': '其他',
    'screensA.gift.customPlaceholder': '{min} 到 {max} 之间的任意金额',
    'screensA.gift.customAria': '自定义礼品卡金额',
    'screensA.gift.recipient': '收礼人姓名',
    'screensA.gift.theirEmail': '收礼人邮箱',
    'screensA.gift.message': '留言',
    'screensA.gift.optional': '选填',
    'screensA.gift.messagePlaceholder': '生日快乐——把家变得更聪明吧。',
    'screensA.gift.whenLabel': '什么时候发送？',
    'screensA.gift.buy': '购买 {amount} 礼品卡',
    'screensA.gift.preview': '预览',
    'screensA.gift.for': '赠予 {name}',
    'screensA.gift.someoneLucky': '某位幸运儿',
    'screensA.gift.messageHere': '你的留言会显示在这里。',
    'screensA.gift.foot': '永不过期 · {url}',
    'screensA.gift.redeem': '兑换礼品卡',
    'screensA.gift.codeAria': '礼品卡兑换码',
    'screensA.gift.addBalance': '加入余额',
    'screensA.gift.yourBalance': '你的余额',

    /* ------------------------------------------------------------ guide */
    'screensA.guide.buyCard': '改买礼品卡',
    'screensA.guide.filterLabel': '筛选礼品指南',
    'screensA.guide.addBasket': '加入购物车',
    'screensA.guide.saveLater': '稍后再看',
    'screensA.guide.delivery': '准时送达',
    'screensA.guide.wrapHead': '默认礼品包装',
    'screensA.guide.wrapText':
      '无塑料包装盒，装箱单上不显示价格；结算时留言还会附上手写卡片。11 月起购买的商品可退货至 1 月 31 日。',
    'screensA.guide.returnsLink': '延长退货政策说明',

    /* ------------------------------------------------------------- home */
    'screensA.home.browse': '按主题浏览',
    'screensA.home.popular': '热门文章',
    'screensA.home.ctaTitle': '没找到需要的内容？',
    'screensA.home.ctaBody': '提交工单，剩下的交给我们。多数回复会在一天内送达。',
    'screensA.home.openTicket': '提交工单',

    /* ---------------------------------------------------------- imprint */
    'screensA.imprint.termCompany': '注册公司',
    'screensA.imprint.termAddress': '注册地址',
    'screensA.imprint.termDirectors': '董事',
    'screensA.imprint.termNumber': '公司编号',
    'screensA.imprint.termVat': '增值税税号',
    'screensA.imprint.termContact': '联系方式',
    'screensA.imprint.termResponsible': '内容负责人',
    'screensA.imprint.responsibleValue': '{name}，地址同上',
    'screensA.imprint.h1': '公司信息',
    'screensA.imprint.lede': 'Hearth Home Ltd. 及本网站依法须公示的公司信息。',
    'screensA.imprint.updated': '最后更新于 {date}',
    'screensA.imprint.h2Adr': '消费争议解决',
    'screensA.imprint.bodyAdr':
      '我们参与独立的 Retail ADR 机制。如果双方无法就投诉达成一致，你可以免费将其提交给 Retail ADR。客服团队可应要求提供案件编号和表格。',
    'screensA.imprint.h2Content': '内容责任',
    'screensA.imprint.bodyContent':
      '我们用心撰写这些页面的内容，但无法保证每篇文章都能随固件和应用版本更新而始终准确。若文章与包装内的印刷安全指南冲突，以印刷版为准。',
    'screensA.imprint.h2Links': '链接责任',
    'screensA.imprint.bodyLinks':
      '部分文章会链接到物流查询、应用商店或我们无法控制的社区帖子。添加链接时我们会检查，但对这些页面此后的变化不承担责任。',
    'screensA.imprint.h2Copyright': '版权',
    'screensA.imprint.bodyCopyright':
      '除非另有说明，本网站的全部文字、插图和产品图片均归 Hearth Home Ltd. 所有。欢迎在注明出处并附上链接的前提下引用帮助文章；转载整页请先联系我们。',
    'screensA.imprint.callout':
      '这是使用 Adminium 搭建的演示门户。本页所有公司信息、地址和注册编号均为虚构。',

    /* ------------------------------------------------------- installers */
    'screensA.installers.radius': '{count} 英里',
    'screensA.installers.count': '{count} 英里内 {installers}',
    'screensA.installers.toastPostcode': '请输入邮编后再搜索',
    'screensA.installers.toastFound': '{postcode} 附近有 {count} 位安装师傅',
    'screensA.installers.toastCall': '本演示中无法拨打电话',
    'screensA.installers.toastRequest': '预约请求已发送给 {name}',
    'screensA.installers.h1': '查找认证安装师傅',
    'screensA.installers.lede':
      '这里的每位师傅都受过 Hearth 硬件培训、投保，并且只由真正下过单的客户评分。接一个门铃或换一个恒温器通常不到两小时。',
    'screensA.installers.postcode': '邮编',
    'screensA.installers.within': '范围',
    'screensA.installers.find': '查找师傅',
    'screensA.installers.sorted': '按距离排序',
    'screensA.installers.approved': '已认证',
    'screensA.installers.call': '拨打电话',
    'screensA.installers.request': '预约上门',
    'screensA.installers.note':
      '安装师傅均为独立经营者。通过 Hearth 预约的施工享有两年安装保障——请保留发票，出现争议由我们处理。',

    /* -------------------------------------------------------- insurance */
    'screensA.insurance.retention':
      '你的套餐保存录像 {days} 天，因此 {date} 之前的内容已经删除。请尽早联系我们——录像一旦过期就无法恢复。',
    'screensA.insurance.h1': '保险理赔',
    'screensA.insurance.lede':
      '保险公司通常需要录像、时间戳，以及设备当时正常工作的证明。我们可以把这三样打包在一起——免费，通常一小时内准备好。',
    'screensA.insurance.pack': '证据包里有什么',
    'screensA.insurance.packText':
      '原始录像、带签名的时间戳日志、设备状态历史，以及理赔员看得懂的 PDF 摘要。',
    'screensA.insurance.privacy': '我们绝不与你的保险公司接触',
    'screensA.insurance.privacyText':
      '证据包只交给你。除非你自己发送或法院要求，否则不会与任何人共享。',
    'screensA.insurance.yourClaims': '你的理赔',
    'screensA.insurance.emailInsurer': '发送给保险公司',
    'screensA.insurance.requestTitle': '申请证据包',
    'screensA.insurance.what': '发生了什么？',
    'screensA.insurance.date': '事发日期',
    'screensA.insurance.window': '需要覆盖的时间段',
    'screensA.insurance.ref': '保险公司或案号',
    'screensA.insurance.optional': '选填',
    'screensA.insurance.refPlaceholder': '例如：Aviva · 案号 4471882',
    'screensA.insurance.note': '理赔员还需要了解什么吗？',
    'screensA.insurance.notePlaceholder':
      '哪些物品受损或被拿走，以及你大概什么时候发现的。',
    'screensA.insurance.submit': '生成我的证据包',

    /* --------------------------------------------------------------- kb */
    'screensA.kb.h1': '搜索知识库',
    'screensA.kb.placeholder': '在 {count} 篇文章中搜索——试试“reset”或“offline”',
    'screensA.kb.clear': '清除',
    'screensA.kb.sortLabel': '结果排序',
    'screensA.kb.sortRelevance': '最相关',
    'screensA.kb.sortShort': '阅读最快',
    'screensA.kb.sortAz': 'A – Z',
    'screensA.kb.emptyTitle': '没有匹配“{query}”的结果',
    'screensA.kb.emptyBody':
      '试着少用几个词，或换成下面这些——多数人在第一条结果里就能找到答案。',
    'screensA.kb.emptyAction': '直接问我们',
    'screensA.kb.alsoSearch': '大家还在搜：',
  },

  /* Traditional Chinese, translated independently of zh-CN — Taiwan
   * terminology (裝置 / 應用程式 / 韌體 / 設定 / 儲存 / 建立 / 訂單), never a
   * character conversion of the Simplified block. */
  'zh-TW': {
    /* ------------------------------------------------------------- a11y */
    'screensA.a11y.title': '無障礙設定',
    'screensA.a11y.lede':
      '這些設定會套用到本帳號的整個說明中心與 Hearth 應用程式。變更立即生效——預覽會呈現實際結果。',
    'screensA.a11y.size': '顯示大小',
    'screensA.a11y.sizeNote': '同時縮放說明中心的文字、按鈕與間距。選好之後立刻套用。',
    'screensA.a11y.palette': '色彩配置',
    'screensA.a11y.paletteNote': '狀態顏色一律搭配圖示與文字，絕不只靠顏色表達。',
    'screensA.a11y.sample': '即時範例',
    'screensA.a11y.sampleTitle': '修復顯示為離線的裝置',
    'screensA.a11y.sampleBody':
      '「離線」標示通常幾分鐘內就會自行消失。若沒有，請重新啟動裝置，並確認路由器沒有更換頻道。',
    'screensA.a11y.solved': '已解決',
    'screensA.a11y.pending': '處理中',
    'screensA.a11y.actionNeeded': '需要處理',
    'screensA.a11y.readArticle': '閱讀文章',
    'screensA.a11y.shortcuts': '鍵盤快速鍵',
    'screensA.a11y.shortcutsBody': '按 {slash} 可隨處搜尋，按 {esc} 關閉任何面板。',
    'screensA.a11y.seeAll': '檢視所有快速鍵',
    'screensA.a11y.appearance': '外觀',
    'screensA.a11y.followSystem': '跟隨系統佈景主題',
    'screensA.a11y.save': '儲存設定',
    'screensA.a11y.reset': '重設',

    /* ------------------------------------------------------------ about */
    'screensA.about.eyebrow': '關於 HEARTH',
    'screensA.about.h1': '我們打造不礙事的居家科技。',
    'screensA.about.lede':
      'Hearth 在 2015 年從布里斯托的一間工作室起步，只有一個固執的想法：智慧住宅應該比一般住宅更讓人安心。十年後，我們仍在每台裝置裡附上一張印製的快速上手卡，以及一支有真人接聽的電話。',
    'screensA.about.stat1': '在布里斯托創立',
    'screensA.about.stat2': '個家庭使用 Hearth',
    'screensA.about.stat3': '位員工，其中 {count} 位在客服',
    'screensA.about.h2Products': '裝置更少，品質更好',
    'screensA.about.body1':
      '我們只做四款產品。這是刻意的——每一款都能獲得至少七年的韌體支援，客服團隊也對它們瞭若指掌。',
    'screensA.about.body2':
      '所有產品都在布里斯托設計、在葡萄牙組裝。我們的包裝自 2021 年起不含塑膠，任何 Hearth 裝置都能維修，而不是丟掉重買。',
    'screensA.about.h2Values': '我們堅持的事',
    'screensA.about.value1Title': '由真人回覆',
    'screensA.about.value1Body':
      '沒有電話語音選單，也沒有純機器人排隊。平日首次回覆的中位時間不到兩小時。',
    'screensA.about.value2Title': '你的家，你的資料',
    'screensA.about.value2Body':
      '影片片段採端對端加密，絕不販售、分享，也不用於訓練任何模型。',
    'screensA.about.value3Title': '為維修而生',
    'screensA.about.value3Body': '零件供應七年、免費維修指南，舊機回收還能折抵。',
    'screensA.about.h2Team': '客服團隊',
    'screensA.about.role1': '客服主管',
    'screensA.about.role2': '硬體診斷',
    'screensA.about.role3': '社群經營',
    'screensA.about.role4': '退貨與保固',
    'screensA.about.ctaTitle': '對你的 Hearth 有疑問嗎？',
    'screensA.about.ctaBody':
      '可以先看說明中心，也可以直接找團隊——哪個比較快就用哪個。',
    'screensA.about.contact': '聯絡我們',
    'screensA.about.helpCenter': '說明中心',

    /* ------------------------------------------------------------ appts */
    'screensA.appts.confirmed': '已確認',
    'screensA.appts.awaiting': '等待包裹',
    'screensA.appts.completed': '已完成',
    'screensA.appts.toastCalendar': '行事曆邀請已寄出',
    'screensA.appts.toastReschedule': '請在下方挑選新的時段',
    'screensA.appts.toastCancelled': '預約 {id} 已取消',
    'screensA.appts.toastReport': '本示範沒有服務報告',
    'screensA.appts.title': '到府服務預約',
    'screensA.appts.lede':
      '工程師到府、寄修與安裝都在同一處。提前 24 小時以上可免費改期。',
    'screensA.appts.book': '預約到府',
    'screensA.appts.upcoming': '即將到來',
    'screensA.appts.past': '已結束',
    'screensA.appts.addCalendar': '加入行事曆',
    'screensA.appts.reschedule': '改期',
    'screensA.appts.cancel': '取消',
    'screensA.appts.report': '報告',
    'screensA.appts.emptyTitle': '尚無預約',
    'screensA.appts.emptyBody': '預約維修或安裝後，會連同工程師的資訊顯示在這裡。',

    /* ---------------------------------------------------------- article */
    'screensA.article.saved': '已收藏',
    'screensA.article.save': '稍後閱讀',
    'screensA.article.savedArticles': '已收藏文章',
    'screensA.article.helpful': '這篇有幫助嗎？',
    'screensA.article.yes': '有',
    'screensA.article.no': '沒有',
    'screensA.article.related': '相關文章',

    /* ------------------------------------------------------------- auto */
    'screensA.auto.title': '自動化',
    'screensA.auto.close': '關閉',
    'screensA.auto.new': '新增自動化',
    'screensA.auto.nameLabel': '取個名稱',
    'screensA.auto.namePlaceholder': '例如：有人按門鈴時開啟門廊燈',
    'screensA.auto.when': '當',
    'screensA.auto.then': '就',
    'screensA.auto.whenLabel': '發生這件事',
    'screensA.auto.thenLabel': '執行這個動作',
    'screensA.auto.chooseTrigger': '選擇觸發條件…',
    'screensA.auto.chooseAction': '選擇動作…',
    'screensA.auto.create': '建立自動化',
    'screensA.auto.cancel': '取消',
    'screensA.auto.badgeNew': '新',
    'screensA.auto.toggleLabel': '啟用或暫停',
    'screensA.auto.deleteLabel': '刪除自動化',
    'screensA.auto.emptyTitle': '尚未建立自動化',
    'screensA.auto.emptyBody':
      '一條自動化就是一個觸發條件加一個動作——先從小地方開始，例如天黑後門鈴看到有人時點亮門廊燈。',
    'screensA.auto.emptyAction': '建立第一條',
    'screensA.auto.note':
      '自動化在你的裝置上執行，不在我們的雲端——服務中斷或網路斷線時照樣有效。',

    /* ---------------------------------------------------------- billing */
    'screensA.billing.title': '帳務與發票',
    'screensA.billing.export': '全部匯出為 CSV',
    'screensA.billing.currentPlan': '目前方案',
    'screensA.billing.changePlan': '變更方案',
    'screensA.billing.applyCredit': '使用餘額',
    'screensA.billing.paymentMethod': '付款方式',
    'screensA.billing.cardMeta': 'Visa · 有效期至 {exp}',
    'screensA.billing.credit': '帳戶餘額',
    'screensA.billing.updateCard': '更新卡片',
    'screensA.billing.history': '紀錄',
    'screensA.billing.periodLabel': '帳務期間',
    'screensA.billing.note':
      '硬體發票由 Hearth Home Ltd. 開立，含 20% 加值稅。方案發票會標明涵蓋期間——期間中途取消，我們會自動退還未使用的天數。',

    /* ------------------------------------------------------------ board */
    'screensA.board.title': '推薦排行榜',
    'screensA.board.lede':
      '本季推薦最多的人。每推薦一位朋友仍可獲得 {amount}——排行榜只影響額外獎項。',
    'screensA.board.quarter': '本季',
    'screensA.board.allTime': '歷來',
    'screensA.board.periodLabel': '排行榜期間',
    'screensA.board.you': '你',
    'screensA.board.friendsJoined': '位朋友已加入',
    'screensA.board.invite': '邀請朋友',
    'screensA.board.prizes': '額外獎項',
    'screensA.board.legal':
      '只有訂單已出貨的推薦才計入，自我推薦會自動剔除。獎項會在該季結束後一週內存入你的帳戶。名次每小時更新一次。',

    /* ----------------------------------------------------------- breach */
    'screensA.breach.badge': '安全公告',
    'screensA.breach.published': '發布於 {published} · 更新於 {updated}',
    'screensA.breach.h1': '第三方電子郵件服務商外洩了部分客戶的電子郵件地址',
    'screensA.breach.lede':
      '7 月 22 日，我們發現用來寄送訂單郵件的一家供應商備份設定有誤。電子郵件地址與訂單編號約有 40 小時可被讀取。密碼、付款資料、影片片段與住址都未涉及。',
    'screensA.breach.statusTitle': '已控制並結案',
    'screensA.breach.statusText':
      '備份在發現後兩小時內完成防護。該供應商已完成稽核，受影響的系統也已停用。',
    'screensA.breach.tableHead': '哪些受到影響，哪些沒有',
    'screensA.breach.affected': '我受影響了嗎？',
    'screensA.breach.checkIntro':
      '所有受影響的人已於 7 月 24 日收到郵件。你也可以在這裡查詢——我們只比對外洩地址清單，不會儲存你輸入的內容。',
    'screensA.breach.emailLabel': '你的電子郵件地址',
    'screensA.breach.check': '查詢',
    'screensA.breach.steps': '我們的建議做法',
    'screensA.breach.timeline': '時間軸',
    'screensA.breach.regulator': '主管機關',
    'screensA.breach.regulatorText':
      '已於 {date} 向 ICO 通報，案號 {ref}。你隨時可以直接向其申訴。',
    'screensA.breach.questions': '疑問',
    'screensA.breach.questionsText': '我們的資料保護負責人會親自在 {email} 回覆。',
    'screensA.breach.contact': '聯絡我們',
    'screensA.breach.disclaimer':
      '這是示範入口網站。此處描述的事件為虛構，不涉及任何真實資料。',

    /* ---------------------------------------------------------- bundles */
    'screensA.bundles.title': '組合優惠',
    'screensA.bundles.lede':
      '把裝置一起買，結帳時自動折扣——不需優惠碼。組合會併成一個包裹寄出，並共用同一個兩年保固起算日。',
    'screensA.bundles.save': '省 {save}',
    'screensA.bundles.add': '加入組合',
    'screensA.bundles.byoTitle': '自由組合',
    'screensA.bundles.byoSub': '選滿三台裝置自動打 9 折。',
    'screensA.bundles.noteDiscount': '已套用組合 9 折',
    'screensA.bundles.noteMore': '再選 {count} 台即可打 9 折',
    'screensA.bundles.notePick': '至少選三台',
    'screensA.bundles.toastMin': '請至少選兩台裝置',
    'screensA.bundles.toastAddedDiscount': '組合已加入——已打 9 折',
    'screensA.bundles.toastAddedPlain': '組合已加入——尚無折扣',
    'screensA.bundles.toastAddedNamed': '{name} 組合已加入——省 {save}',
    'screensA.bundles.groupLabel': '你組合中的裝置',
    'screensA.bundles.selected': '已選 {devices}',
    'screensA.bundles.addMine': '加入我的組合',

    /* ------------------------------------------------------------ claim */
    'screensA.claim.toastFiles': '示範檔案已全部加入',
    'screensA.claim.toastFault': '請再多描述一些故障狀況',
    'screensA.claim.toastSubmitted': '保固申請已送出',
    'screensA.claim.doneTitle': '已收到保固申請',
    'screensA.claim.doneBody':
      '我們會在兩個工作天內評估。請把裝置放在手邊——我們可能會請你拍序號銘牌。',
    'screensA.claim.outcomeChip': '申請：{outcome}',
    'screensA.claim.tl1Note': '我們已收到你的說明與照片。',
    'screensA.claim.tl2Label': '評估',
    'screensA.claim.tl2Note': '工程師會在兩個工作天內查看。',
    'screensA.claim.tl3Label': '已安排：{outcome}',
    'screensA.claim.tl3Note': '我們會以電子郵件確認，並預約需要的項目。',
    'screensA.claim.bookRepair': '預約維修時段',
    'screensA.claim.another': '再送出一份申請',
    'screensA.claim.h1': '申請保固',
    'screensA.claim.lede':
      '標準保固兩年，完成註冊為三年。正常使用產生的故障在保固範圍內；意外損壞與進水則不在其中。',
    'screensA.claim.whichDevice': '哪一台裝置故障？',
    'screensA.claim.deviceNote': '{serial} · 保固至 {expires}',
    'screensA.claim.faultLabel': '發生了什麼問題？',
    'screensA.claim.faultPlaceholder': '描述故障、出現的時間，以及你已經試過的方法。',
    'screensA.claim.preferredOutcome': '希望的處理方式',
    'screensA.claim.photos': '故障照片',
    'screensA.claim.addPhoto': '新增照片',
    'screensA.claim.submit': '送出申請',

    /* ---------------------------------------------------------- contact */
    'screensA.contact.toastMissing': '請填寫姓名、電子郵件與簡短訊息',
    'screensA.contact.toastSent': '訊息已送出——我們會在一天內回覆',
    'screensA.contact.h1': '聯絡我們',
    'screensA.contact.lede':
      '客服服務時間為週一至週五 8:00–19:00（英國時間），週六 9:00–14:00。挑選你方便的管道即可。',
    'screensA.contact.chat': '線上客服',
    'screensA.contact.chatBody': '最快的方式，通常等候不到兩分鐘。',
    'screensA.contact.online': '目前上線',
    'screensA.contact.email': '電子郵件',
    'screensA.contact.emailBody': '我們會在一個工作天內回覆。',
    'screensA.contact.phone': '電話',
    'screensA.contact.phoneBody': '安裝或安全方面的緊急問題最適合打電話。',
    'screensA.contact.ticket': '建立服務單',
    'screensA.contact.ticketBody': '需要附上照片或紀錄檔時最合適。',
    'screensA.contact.startTicket': '開始建立服務單',
    'screensA.contact.formTitle': '寫訊息給我們',
    'screensA.contact.formLede': '適用於與特定裝置無關的任何問題。',
    'screensA.contact.name': '你的姓名',
    'screensA.contact.message': '訊息',
    'screensA.contact.messagePlaceholder': '我們能幫上什麼忙？',
    'screensA.contact.send': '送出訊息',
    'screensA.contact.headOffice': '總部',
    'screensA.contact.returnsDepot': '退貨倉庫',
    'screensA.contact.returnsBody':
      '請勿把退貨寄到辦公室——先建立退貨，再使用電子郵件中的預付寄件標籤。',
    'screensA.contact.returnsLink': '退貨方式說明',

    /* ----------------------------------------------------------- delete */
    'screensA.delete.step1': '會刪除什麼',
    'screensA.delete.step2': '其他選擇',
    'screensA.delete.step3': '確認',
    'screensA.delete.scheduledTitle': '刪除已排程',
    'screensA.delete.keep': '保留我的帳號',
    'screensA.delete.downloadFirst': '先下載我的資料',
    'screensA.delete.h1': '刪除你的帳號',
    'screensA.delete.lede':
      '我們會說明哪些會刪除、哪些會保留。在最後一步之前不會有任何變動，之後還有 30 天可以反悔。',
    'screensA.delete.h2Things': '你的資料會怎麼樣',
    'screensA.delete.textThings':
      '你的裝置會繼續在本機運作——排程、警示與本機錄影都照常。刪除的是帳號以及雲端裡的一切。',
    'screensA.delete.calloutCopy':
      '如果需要，可以先留一份副本——包含帳號、裝置、排程與影片索引的壓縮檔，通常十分鐘內就好。',
    'screensA.delete.h2Before': '在你離開之前',
    'screensA.delete.textBefore':
      '這些往往正好解決大家想離開的原因。若你已經決定，直接跳過即可——我們不會再問第二次。',
    'screensA.delete.reasonLabel': '為什麼要離開？',
    'screensA.delete.reasonOptional': '選填，但對我們很有幫助',
    'screensA.delete.reasonPlaceholder': '不方便說明',
    'screensA.delete.h2Confirm': '確認是你本人',
    'screensA.delete.textConfirm':
      '輸入 {word} 以確認。我們也會寄一封含連結的郵件給你——在你點開之前，帳號不會有任何變動。',
    'screensA.delete.phraseLabel': '輸入 DELETE',
    'screensA.delete.calloutDanger':
      '30 天後任何人都無法復原，包括我們。影片、排程、訂單紀錄與剩餘餘額都會一併消失。',
    'screensA.delete.back': '上一步',
    'screensA.delete.schedule': '排程刪除',
    'screensA.delete.continue': '繼續',
    'screensA.delete.cancel': '取消並保留我的帳號',

    /* ---------------------------------------------------------- devices */
    'screensA.devices.online': '已連線',
    'screensA.devices.batteryLow': '電量偏低',
    'screensA.devices.offline': '已離線',
    'screensA.devices.summaryOffline': '{devices} · {count} 台離線 · 自 {time} 起警戒',
    'screensA.devices.summaryAll': '{devices} · 全部可連線 · 自 {time} 起警戒',
    'screensA.devices.unread': '{count} 則未讀',
    'screensA.devices.allCaught': '全部已讀',
    'screensA.devices.memberLine': '{people} · {count} 份邀請待接受',
    'screensA.devices.liveLine': '{cameras} · 今天 {count} 段錄影',
    'screensA.devices.autoLine': '{running} 條執行中，{paused} 條已暫停',
    'screensA.devices.toastOn': '{name} · {label} 已開啟',
    'screensA.devices.toastOff': '{name} · {label} 已關閉',
    'screensA.devices.toastAdd': '請在 Hearth 應用程式中新增裝置',
    'screensA.devices.add': '新增裝置',
    'screensA.devices.energy': '用電分析',
    'screensA.devices.liveView': '即時畫面',
    'screensA.devices.automations': '自動化',
    'screensA.devices.notifications': '通知',
    'screensA.devices.household': '家庭成員',

    /* -------------------------------------------------------- downloads */
    'screensA.downloads.appIphone': 'Hearth iPhone 版',
    'screensA.downloads.appAndroid': 'Hearth Android 版',
    'screensA.downloads.toastStore': '本示範已停用應用程式商店連結',
    'screensA.downloads.h1': '下載與手冊',
    'screensA.downloads.lede':
      '手冊、快速上手卡、配線圖與安裝工具。全部免費，也不需要帳號。',
    'screensA.downloads.toastFile': '正在下載 {file}',
    'screensA.downloads.getFile': '取得檔案',
    'screensA.downloads.download': '下載',
    'screensA.downloads.getApp': '取得應用程式',

    /* ----------------------------------------------------------- energy */
    'screensA.energy.week': '週',
    'screensA.energy.month': '月',
    'screensA.energy.year': '年',
    'screensA.energy.h1': '用電分析',
    'screensA.energy.lede':
      '依你的恆溫器與智慧插座推算。估算會採用你設定的電價——若已過期，請在應用程式中修改。',
    'screensA.energy.periodLabel': '期間',
    'screensA.energy.byRoom': '依房間',

    /* --------------------------------------------------------- firmware */
    'screensA.firmware.h1': '韌體更新說明',
    'screensA.firmware.lede':
      '更新會在夜間自動安裝。你也可以隨時在應用程式的「設定 → 關於」中手動觸發。',
    'screensA.firmware.allDevices': '所有裝置',
    'screensA.firmware.rolling': '逐步推送中',

    /* ------------------------------------------------------------ forum */
    'screensA.forum.toastPost': '本示範已停用發文',
    'screensA.forum.h1': '社群論壇',
    'screensA.forum.lede':
      '和其他 Hearth 使用者交流設定、自動化與排除方法。Hearth 團隊每天都會來看看——認明徽章。',
    'screensA.forum.start': '發起討論',
    'screensA.forum.answered': '已解答',
    'screensA.forum.inCat': '發表於 {cat}',
    'screensA.forum.answerFrom': '{name} 的解答',
    'screensA.forum.reply': '在討論串中回覆',
    'screensA.forum.askSupport': '改為詢問客服',
    'screensA.forum.emptyTitle': '這裡還沒有討論',
    'screensA.forum.emptyBody':
      '這個分類目前還沒有內容。發起第一個討論串，它會置頂讓大家看到。',
    'screensA.forum.thisWeek': '本週',
    'screensA.forum.newPosts': '則新貼文',
    'screensA.forum.answeredStat': '已解答',
    'screensA.forum.topContributors': '熱心貢獻者',
    'screensA.forum.helpfulPosts': '{count} 則有幫助的貼文',
    'screensA.forum.rules': '版規',
    'screensA.forum.rulesBody':
      '請保持友善、切合主題，也絕對不要在公開討論串貼出序號或訂單資訊。',

    /* ------------------------------------------------------------- gift */
    'screensA.gift.whenNow': '立即寄出',
    'screensA.gift.whenTomorrow': '明天早上',
    'screensA.gift.whenDate': '我指定的日期',
    'screensA.gift.sentNow': '正在寄往 {where}，並附上你的留言。',
    'screensA.gift.theirInbox': '對方的信箱',
    'screensA.gift.sentLater': '我們會在你選的那個早上送達，並附上你的留言。',
    'screensA.gift.toastMin': '禮物卡最低 {min}',
    'screensA.gift.toastWho': '這份禮物要送給誰？',
    'screensA.gift.toastEmail': '請填寫對方的電子郵件地址',
    'screensA.gift.toastSent': '禮物卡已寄出',
    'screensA.gift.toastCode': '請輸入郵件中的完整兌換碼',
    'screensA.gift.toastBalance': '{amount} 已加入你的餘額',
    'screensA.gift.buyAnother': '再買一張',
    'screensA.gift.h1': '禮物卡',
    'screensA.gift.lede':
      '可用於任何 Hearth 裝置、零件或 Hearth Care 方案。永不過期、免手續費，未使用可在 14 天內退款。',
    'screensA.gift.design': '選擇卡面',
    'screensA.gift.amount': '金額',
    'screensA.gift.other': '其他',
    'screensA.gift.customPlaceholder': '{min} 到 {max} 之間的任意金額',
    'screensA.gift.customAria': '自訂禮物卡金額',
    'screensA.gift.recipient': '收禮人姓名',
    'screensA.gift.theirEmail': '收禮人電子郵件',
    'screensA.gift.message': '留言',
    'screensA.gift.optional': '選填',
    'screensA.gift.messagePlaceholder': '生日快樂——把家變得更聰明吧。',
    'screensA.gift.whenLabel': '要在什麼時候寄出？',
    'screensA.gift.buy': '購買 {amount} 禮物卡',
    'screensA.gift.preview': '預覽',
    'screensA.gift.for': '致 {name}',
    'screensA.gift.someoneLucky': '某位幸運兒',
    'screensA.gift.messageHere': '你的留言會顯示在這裡。',
    'screensA.gift.foot': '永不過期 · {url}',
    'screensA.gift.redeem': '兌換禮物卡',
    'screensA.gift.codeAria': '禮物卡兌換碼',
    'screensA.gift.addBalance': '加入餘額',
    'screensA.gift.yourBalance': '你的餘額',

    /* ------------------------------------------------------------ guide */
    'screensA.guide.buyCard': '改送禮物卡',
    'screensA.guide.filterLabel': '篩選送禮指南',
    'screensA.guide.addBasket': '加入購物車',
    'screensA.guide.saveLater': '稍後再看',
    'screensA.guide.delivery': '準時送達',
    'screensA.guide.wrapHead': '預設就是送禮包裝',
    'screensA.guide.wrapText':
      '無塑膠紙盒、出貨單上不顯示價格；結帳時留言還會附上手寫卡片。11 月起購買的商品可退貨至 1 月 31 日。',
    'screensA.guide.returnsLink': '延長退貨的方式',

    /* ------------------------------------------------------------- home */
    'screensA.home.browse': '依主題瀏覽',
    'screensA.home.popular': '熱門文章',
    'screensA.home.ctaTitle': '找不到需要的內容嗎？',
    'screensA.home.ctaBody': '建立服務單，剩下的交給我們。多數回覆會在一天內送達。',
    'screensA.home.openTicket': '建立服務單',

    /* ---------------------------------------------------------- imprint */
    'screensA.imprint.termCompany': '登記公司',
    'screensA.imprint.termAddress': '登記地址',
    'screensA.imprint.termDirectors': '董事',
    'screensA.imprint.termNumber': '公司編號',
    'screensA.imprint.termVat': '加值稅編號',
    'screensA.imprint.termContact': '聯絡方式',
    'screensA.imprint.termResponsible': '內容負責人',
    'screensA.imprint.responsibleValue': '{name}，地址同上',
    'screensA.imprint.h1': '公司資訊',
    'screensA.imprint.lede': 'Hearth Home Ltd. 與本網站依法須揭露的公司資訊。',
    'screensA.imprint.updated': '最後更新於 {date}',
    'screensA.imprint.h2Adr': '消費爭議處理',
    'screensA.imprint.bodyAdr':
      '我們參與獨立的 Retail ADR 機制。若雙方無法就申訴達成共識，你可以免費將案件送交 Retail ADR。客服團隊可依要求提供案件編號與表單。',
    'screensA.imprint.h2Content': '內容責任',
    'screensA.imprint.bodyContent':
      '我們用心撰寫這些頁面的內容，但無法保證每篇文章都能隨韌體與應用程式版本更新而持續正確。若文章與包裝內的印製安全指南牴觸，以印製版本為準。',
    'screensA.imprint.h2Links': '連結責任',
    'screensA.imprint.bodyLinks':
      '部分文章會連往物流查詢、應用程式商店或我們無法掌控的社群貼文。加入連結時我們會確認，但對那些頁面日後的變動不負責任。',
    'screensA.imprint.h2Copyright': '著作權',
    'screensA.imprint.bodyCopyright':
      '除另有註明外，本網站的所有文字、插圖與產品照片均屬 Hearth Home Ltd. 所有。歡迎在附上原始連結的情況下引用說明文章；整頁轉載請先詢問我們。',
    'screensA.imprint.callout':
      '這是以 Adminium 打造的示範入口網站。本頁所有公司資料、地址與登記編號皆為虛構。',

    /* ------------------------------------------------------- installers */
    'screensA.installers.radius': '{count} 英里',
    'screensA.installers.count': '{count} 英里內 {installers}',
    'screensA.installers.toastPostcode': '請先輸入郵遞區號再搜尋',
    'screensA.installers.toastFound': '{postcode} 附近有 {count} 位安裝師傅',
    'screensA.installers.toastCall': '本示範無法撥打電話',
    'screensA.installers.toastRequest': '預約需求已送給 {name}',
    'screensA.installers.h1': '尋找認證安裝師傅',
    'screensA.installers.lede':
      '這裡的每位師傅都受過 Hearth 硬體訓練、投保，而且只由真正下單的客戶評分。接一個門鈴或換一個恆溫器通常不用兩小時。',
    'screensA.installers.postcode': '郵遞區號',
    'screensA.installers.within': '範圍',
    'screensA.installers.find': '尋找師傅',
    'screensA.installers.sorted': '依距離排序',
    'screensA.installers.approved': '已認證',
    'screensA.installers.call': '撥打電話',
    'screensA.installers.request': '預約到府',
    'screensA.installers.note':
      '安裝師傅都是獨立業者。透過 Hearth 預約的施工享有兩年安裝保障——請保留發票，有爭議由我們處理。',

    /* -------------------------------------------------------- insurance */
    'screensA.insurance.retention':
      '你的方案會保留影片 {days} 天，因此 {date} 之前的內容已經消失。請盡早告訴我們——影片一旦過期就無法還原。',
    'screensA.insurance.h1': '保險理賠',
    'screensA.insurance.lede':
      '保險公司通常會要影片、時間戳記，以及裝置當時正常運作的證明。我們可以把三者放進同一份資料包——免費，通常一小時內就好。',
    'screensA.insurance.pack': '證據資料包內容',
    'screensA.insurance.packText':
      '原始影片、含簽章的時間戳記紀錄、裝置狀態歷程，以及理賠人員看得懂的 PDF 摘要。',
    'screensA.insurance.privacy': '我們絕不與你的保險公司接觸',
    'screensA.insurance.privacyText':
      '資料包只交給你。除非你自己寄出或法院要求，否則不會分享給任何人。',
    'screensA.insurance.yourClaims': '你的理賠',
    'screensA.insurance.emailInsurer': '寄給保險公司',
    'screensA.insurance.requestTitle': '申請證據資料包',
    'screensA.insurance.what': '發生了什麼事？',
    'screensA.insurance.date': '事故日期',
    'screensA.insurance.window': '需涵蓋的時間範圍',
    'screensA.insurance.ref': '保險公司或案號',
    'screensA.insurance.optional': '選填',
    'screensA.insurance.refPlaceholder': '例如：Aviva · 案號 4471882',
    'screensA.insurance.note': '理賠人員還需要知道什麼嗎？',
    'screensA.insurance.notePlaceholder':
      '哪些東西受損或遺失，以及你大約什麼時候發現的。',
    'screensA.insurance.submit': '產生我的資料包',

    /* --------------------------------------------------------------- kb */
    'screensA.kb.h1': '搜尋知識庫',
    'screensA.kb.placeholder': '在 {count} 篇文章中搜尋——試試「reset」或「offline」',
    'screensA.kb.clear': '清除',
    'screensA.kb.sortLabel': '結果排序',
    'screensA.kb.sortRelevance': '最相關',
    'screensA.kb.sortShort': '閱讀最快',
    'screensA.kb.sortAz': 'A – Z',
    'screensA.kb.emptyTitle': '找不到符合「{query}」的內容',
    'screensA.kb.emptyBody':
      '試著少用幾個詞，或改用下面這些——多數人在第一筆結果就找到答案。',
    'screensA.kb.emptyAction': '直接問我們',
    'screensA.kb.alsoSearch': '大家也在搜尋：',
  },

  /* Modern Standard Arabic — six cardinal categories
   * (zero | one | two | few | many | other), and the only RTL locale. The low
   * counts read naturally by dropping the numeral, which is why several of
   * them carry no `{count}`. No directional control characters: the embedded
   * Latin tokens are bidi-resolved by the browser. */
  'ar-EG': {
    /* ------------------------------------------------------------- a11y */
    'screensA.a11y.title': 'إعدادات إمكانية الوصول',
    'screensA.a11y.lede':
      'تُطبَّق هذه الإعدادات على مركز المساعدة بالكامل وعلى تطبيق Hearth في هذا الحساب. تسري التغييرات فورًا — والمعاينة تعرض النتيجة تمامًا.',
    'screensA.a11y.size': 'حجم العرض',
    'screensA.a11y.sizeNote':
      'يوسّع كل شاشات مركز المساعدة — النص والأزرار والمسافات معًا. ويسري فور اختيارك حجمًا.',
    'screensA.a11y.palette': 'لوحة الألوان',
    'screensA.a11y.paletteNote':
      'ألوان الحالة مصحوبة دائمًا بأيقونة ووصف، ولا تعتمد على اللون وحده.',
    'screensA.a11y.sample': 'نموذج حي',
    'screensA.a11y.sampleTitle': 'إصلاح جهاز يظهر بحالة غير متصل',
    'screensA.a11y.sampleBody':
      'عادةً ما تختفي علامة «غير متصل» من تلقاء نفسها خلال دقائق. وإن لم يحدث ذلك، أعد تشغيل الجهاز وتأكد أن جهاز التوجيه لم يغيّر القناة.',
    'screensA.a11y.solved': 'تم الحل',
    'screensA.a11y.pending': 'قيد الانتظار',
    'screensA.a11y.actionNeeded': 'يتطلب إجراءً',
    'screensA.a11y.readArticle': 'قراءة المقالة',
    'screensA.a11y.shortcuts': 'اختصارات لوحة المفاتيح',
    'screensA.a11y.shortcutsBody':
      'اضغط {slash} للبحث من أي مكان، و{esc} لإغلاق أي لوحة.',
    'screensA.a11y.seeAll': 'عرض كل الاختصارات',
    'screensA.a11y.appearance': 'المظهر',
    'screensA.a11y.followSystem': 'اتّباع مظهر النظام',
    'screensA.a11y.save': 'حفظ الإعدادات',
    'screensA.a11y.reset': 'إعادة الضبط',

    /* ------------------------------------------------------------ about */
    'screensA.about.eyebrow': 'عن HEARTH',
    'screensA.about.h1': 'نصنع تقنيات منزلية لا تقف في طريقك.',
    'screensA.about.lede':
      'بدأت Hearth عام 2015 في ورشة صغيرة بمدينة بريستول بفكرة عنيدة واحدة: المنزل الذكي ينبغي أن يكون أهدأ من المنزل العادي. وبعد عشر سنوات، ما زلنا نرفق مع كل جهاز بطاقة بدء سريع مطبوعة ورقم هاتف يردّ عليه إنسان.',
    'screensA.about.stat1': 'تأسست في بريستول',
    'screensA.about.stat2': 'منزل يعمل بـ Hearth',
    'screensA.about.stat3': 'موظفًا، منهم {count} في الدعم',
    'screensA.about.h2Products': 'أجهزة أقل، لكنها أفضل',
    'screensA.about.body1':
      'نصنع أربعة منتجات فقط، وهذا مقصود — فكل منتج يحصل على تحديثات للبرنامج الثابت لسبع سنوات على الأقل، وفريق الدعم لدينا يعرفها جميعًا عن ظهر قلب.',
    'screensA.about.body2':
      'نصمّم كل شيء في بريستول ونجمّعه في البرتغال. وعبواتنا خالية من البلاستيك منذ 2021، وأي جهاز Hearth يمكن إصلاحه بدل استبداله.',
    'screensA.about.h2Values': 'ما نتمسك به',
    'screensA.about.value1Title': 'يردّ عليك إنسان',
    'screensA.about.value1Body':
      'لا قوائم هاتفية ولا طوابير للروبوتات وحدها. ووسيط زمن أول رد أقل من ساعتين في أيام العمل.',
    'screensA.about.value2Title': 'منزلك وبياناتك',
    'screensA.about.value2Body':
      'مقاطع الفيديو مشفَّرة من طرف إلى طرف، ولا تُباع ولا تُشارَك ولا تُستخدم في تدريب أي نموذج.',
    'screensA.about.value3Title': 'مصمَّم ليُصلَّح',
    'screensA.about.value3Body':
      'قطع غيار لسبع سنوات، وأدلة إصلاح مجانية، ورصيد استبدال للأجهزة القديمة.',
    'screensA.about.h2Team': 'فريق الدعم',
    'screensA.about.role1': 'مسؤول الدعم',
    'screensA.about.role2': 'تشخيص الأجهزة',
    'screensA.about.role3': 'إدارة المجتمع',
    'screensA.about.role4': 'المرتجعات والضمان',
    'screensA.about.ctaTitle': 'عندك سؤال عن جهاز Hearth؟',
    'screensA.about.ctaBody':
      'ابدأ من مركز المساعدة، أو تحدث مع الفريق مباشرة — أيهما أسرع بالنسبة إليك.',
    'screensA.about.contact': 'اتصل بنا',
    'screensA.about.helpCenter': 'مركز المساعدة',

    /* ------------------------------------------------------------ appts */
    'screensA.appts.confirmed': 'مؤكَّد',
    'screensA.appts.awaiting': 'بانتظار الطرد',
    'screensA.appts.completed': 'مكتمل',
    'screensA.appts.toastCalendar': 'تم إرسال دعوة التقويم',
    'screensA.appts.toastReschedule': 'اختر موعدًا جديدًا من الأسفل',
    'screensA.appts.toastCancelled': 'تم إلغاء الموعد {id}',
    'screensA.appts.toastReport': 'تقارير الخدمة غير متاحة في هذا العرض التوضيحي',
    'screensA.appts.title': 'مواعيد الخدمة',
    'screensA.appts.lede':
      'زيارات الفنيين والإصلاح بالبريد وعمليات التركيب في مكان واحد. وإعادة الجدولة مجانية حتى 24 ساعة قبل الموعد.',
    'screensA.appts.book': 'حجز زيارة',
    'screensA.appts.upcoming': 'القادمة',
    'screensA.appts.past': 'السابقة',
    'screensA.appts.addCalendar': 'إضافة إلى التقويم',
    'screensA.appts.reschedule': 'إعادة جدولة',
    'screensA.appts.cancel': 'إلغاء',
    'screensA.appts.report': 'التقرير',
    'screensA.appts.emptyTitle': 'لا توجد حجوزات',
    'screensA.appts.emptyBody':
      'عند حجز إصلاح أو تركيب، سيظهر هنا مع بيانات الفني.',

    /* ---------------------------------------------------------- article */
    'screensA.article.saved': 'محفوظة',
    'screensA.article.save': 'حفظ لوقت لاحق',
    'screensA.article.savedArticles': 'المقالات المحفوظة',
    'screensA.article.helpful': 'هل كانت مفيدة؟',
    'screensA.article.yes': 'نعم',
    'screensA.article.no': 'لا',
    'screensA.article.related': 'مقالات ذات صلة',

    /* ------------------------------------------------------------- auto */
    'screensA.auto.title': 'الأتمتة',
    'screensA.auto.close': 'إغلاق',
    'screensA.auto.new': 'أتمتة جديدة',
    'screensA.auto.nameLabel': 'اختر اسمًا',
    'screensA.auto.namePlaceholder': 'مثال: إضاءة المدخل عند رنّ الجرس',
    'screensA.auto.when': 'عندما',
    'screensA.auto.then': 'عندئذٍ',
    'screensA.auto.whenLabel': 'يحدث هذا',
    'screensA.auto.thenLabel': 'نفّذ هذا',
    'screensA.auto.chooseTrigger': 'اختر مُشغّلًا…',
    'screensA.auto.chooseAction': 'اختر إجراءً…',
    'screensA.auto.create': 'إنشاء الأتمتة',
    'screensA.auto.cancel': 'إلغاء',
    'screensA.auto.badgeNew': 'جديد',
    'screensA.auto.toggleLabel': 'تفعيل أو إيقاف مؤقت',
    'screensA.auto.deleteLabel': 'حذف الأتمتة',
    'screensA.auto.emptyTitle': 'لا توجد أتمتة بعد',
    'screensA.auto.emptyBody':
      'الأتمتة مُشغّل واحد وإجراء واحد — ابدأ بشيء بسيط، مثل إضاءة المدخل التي تعمل عندما يرى الجرس شخصًا بعد حلول الظلام.',
    'screensA.auto.emptyAction': 'أنشئ أول واحدة',
    'screensA.auto.note':
      'تعمل الأتمتة على أجهزتك لا على سحابتنا — فتستمر أثناء الأعطال وعند انقطاع الإنترنت.',

    /* ---------------------------------------------------------- billing */
    'screensA.billing.title': 'الفوترة والفواتير',
    'screensA.billing.export': 'تصدير الكل بصيغة CSV',
    'screensA.billing.currentPlan': 'الخطة الحالية',
    'screensA.billing.changePlan': 'تغيير الخطة',
    'screensA.billing.applyCredit': 'استخدام الرصيد',
    'screensA.billing.paymentMethod': 'طريقة الدفع',
    'screensA.billing.cardMeta': 'Visa · تنتهي في {exp}',
    'screensA.billing.credit': 'رصيد الحساب',
    'screensA.billing.updateCard': 'تحديث البطاقة',
    'screensA.billing.history': 'السجل',
    'screensA.billing.periodLabel': 'فترة الفوترة',
    'screensA.billing.note':
      'تصدر فواتير الأجهزة عن Hearth Home Ltd. وتشمل ضريبة قيمة مضافة 20%. أما فواتير الخطة فتوضّح الفترة التي تغطيها — وإذا ألغيت في منتصف الفترة نردّ الأيام غير المستخدمة تلقائيًا.',

    /* ------------------------------------------------------------ board */
    'screensA.board.title': 'لوحة صدارة الإحالات',
    'screensA.board.lede':
      'أفضل المُحيلين هذا الربع. الجميع يحصل على {amount} عن كل صديق — واللوحة مخصّصة لجوائز المكافأة فقط.',
    'screensA.board.quarter': 'هذا الربع',
    'screensA.board.allTime': 'كل الأوقات',
    'screensA.board.periodLabel': 'فترة لوحة الصدارة',
    'screensA.board.you': 'أنت',
    'screensA.board.friendsJoined': 'أصدقاء انضموا',
    'screensA.board.invite': 'ادعُ شخصًا',
    'screensA.board.prizes': 'جوائز المكافأة',
    'screensA.board.legal':
      'لا تُحتسب إلا الإحالات التي شُحنت طلباتها، وتُحذف الإحالات الذاتية تلقائيًا. وتُضاف الجوائز إلى حسابك خلال أسبوع من نهاية الربع. ويُحدَّث الترتيب كل ساعة.',

    /* ----------------------------------------------------------- breach */
    'screensA.breach.badge': 'إشعار أمني',
    'screensA.breach.published': 'نُشر في {published} · حُدِّث في {updated}',
    'screensA.breach.h1':
      'مزوّد بريد إلكتروني خارجي كشف بعض عناوين البريد الإلكتروني للعملاء',
    'screensA.breach.lede':
      'في 22 يوليو اكتشفنا أن مورّدًا نستخدمه لإرسال رسائل الطلبات كانت لديه نسخة احتياطية مضبوطة بشكل خاطئ. وظلّت عناوين البريد الإلكتروني وأرقام مراجع الطلبات قابلة للقراءة نحو 40 ساعة. ولم تتأثر أي كلمات مرور أو بيانات دفع أو مقاطع فيديو أو عناوين.',
    'screensA.breach.statusTitle': 'تمت السيطرة عليه وإغلاقه',
    'screensA.breach.statusText':
      'جرى تأمين النسخة الاحتياطية خلال ساعتين من اكتشافها. وخضع المورّد للتدقيق، وأُوقف النظام المتأثر.',
    'screensA.breach.tableHead': 'ما تأثّر وما لم يتأثّر',
    'screensA.breach.affected': 'هل أنا متأثر؟',
    'screensA.breach.checkIntro':
      'أرسلنا رسالة إلى كل المتأثرين في 24 يوليو. ويمكنك التحقق هنا أيضًا — فنحن نقارن فقط بقائمة العناوين المكشوفة، ولا نحتفظ بما تكتبه.',
    'screensA.breach.emailLabel': 'عنوان بريدك الإلكتروني',
    'screensA.breach.check': 'تحقق',
    'screensA.breach.steps': 'ما نقترح عمله',
    'screensA.breach.timeline': 'التسلسل الزمني',
    'screensA.breach.regulator': 'الجهة التنظيمية',
    'screensA.breach.regulatorText':
      'أُبلغت ICO في {date}، والمرجع {ref}. ويمكنك تقديم شكوى إليها مباشرة في أي وقت.',
    'screensA.breach.questions': 'أسئلة',
    'screensA.breach.questionsText':
      'يجيب عنها مسؤول حماية البيانات لدينا شخصيًا على {email}.',
    'screensA.breach.contact': 'اتصل بنا',
    'screensA.breach.disclaimer':
      'هذه بوابة تجريبية. والحادثة الموصوفة هنا خيالية ولا تتضمن أي بيانات حقيقية.',

    /* ---------------------------------------------------------- bundles */
    'screensA.bundles.title': 'عروض الحزم',
    'screensA.bundles.lede':
      'اشترِ الأجهزة معًا ويُطبَّق الخصم عند الدفع — بدون أكواد. وتُشحن الحزمة في طرد واحد وتشترك في تاريخ بدء واحد لضمان السنتين.',
    'screensA.bundles.save': 'وفّر {save}',
    'screensA.bundles.add': 'إضافة الحزمة',
    'screensA.bundles.byoTitle': 'كوّن حزمتك',
    'screensA.bundles.byoSub': 'ثلاثة أجهزة أو أكثر تعني خصم 10% تلقائيًا.',
    'screensA.bundles.noteDiscount': 'تم تطبيق خصم الحزمة 10%',
    'screensA.bundles.noteMore':
      'أضف المزيد لخصم 10%|جهاز واحد إضافي لخصم 10%|جهازان إضافيان لخصم 10%|{count} أجهزة إضافية لخصم 10%|{count} جهازًا إضافيًا لخصم 10%|{count} جهاز إضافي لخصم 10%',
    'screensA.bundles.notePick': 'اختر ثلاثة على الأقل',
    'screensA.bundles.toastMin': 'اختر جهازين على الأقل',
    'screensA.bundles.toastAddedDiscount': 'أُضيفت الحزمة — طُبِّق خصم 10%',
    'screensA.bundles.toastAddedPlain': 'أُضيفت الحزمة — لا يوجد خصم بعد',
    'screensA.bundles.toastAddedNamed': 'أُضيفت حزمة {name} — توفير {save}',
    'screensA.bundles.groupLabel': 'الأجهزة في حزمتك',
    'screensA.bundles.selected': 'تم اختيار {devices}',
    'screensA.bundles.addMine': 'إضافة حزمتي',

    /* ------------------------------------------------------------ claim */
    'screensA.claim.toastFiles': 'لا مزيد من الملفات التجريبية',
    'screensA.claim.toastFault': 'أخبرنا بمزيد من التفاصيل عن العطل',
    'screensA.claim.toastSubmitted': 'تم إرسال المطالبة',
    'screensA.claim.doneTitle': 'استلمنا المطالبة',
    'screensA.claim.doneBody':
      'سنقيّمها خلال يومي عمل. أبقِ الجهاز في متناولك — فقد نطلب صورة للوحة الرقم التسلسلي.',
    'screensA.claim.outcomeChip': 'المطلوب: {outcome}',
    'screensA.claim.tl1Note': 'لدينا وصفك وصورك.',
    'screensA.claim.tl2Label': 'التقييم',
    'screensA.claim.tl2Note': 'يراجعها فني خلال يومي عمل.',
    'screensA.claim.tl3Label': 'تم ترتيب: {outcome}',
    'screensA.claim.tl3Note': 'سنؤكد بالبريد الإلكتروني ونحجز ما يلزم.',
    'screensA.claim.bookRepair': 'حجز موعد إصلاح',
    'screensA.claim.another': 'بدء مطالبة أخرى',
    'screensA.claim.h1': 'تقديم مطالبة ضمان',
    'screensA.claim.lede':
      'تغطية سنتين بشكل قياسي، وثلاث إذا سجّلت الجهاز. الأعطال الناتجة عن الاستخدام العادي مغطاة؛ أما الأضرار العرضية وتسرّب المياه فلا.',
    'screensA.claim.whichDevice': 'أي جهاز به عطل؟',
    'screensA.claim.deviceNote': '{serial} · التغطية حتى {expires}',
    'screensA.claim.faultLabel': 'ما الذي حدث؟',
    'screensA.claim.faultPlaceholder': 'صف العطل ومتى بدأ وما جربته بالفعل.',
    'screensA.claim.preferredOutcome': 'الحل المفضّل',
    'screensA.claim.photos': 'صور العطل',
    'screensA.claim.addPhoto': 'إضافة صورة',
    'screensA.claim.submit': 'إرسال المطالبة',

    /* ---------------------------------------------------------- contact */
    'screensA.contact.toastMissing': 'أضف اسمك وبريدك الإلكتروني ورسالة قصيرة',
    'screensA.contact.toastSent': 'أُرسلت الرسالة — سنرد خلال يوم',
    'screensA.contact.h1': 'اتصل بنا',
    'screensA.contact.lede':
      'الدعم متاح من الاثنين إلى الجمعة من 8 صباحًا حتى 7 مساءً بتوقيت المملكة المتحدة، والسبت من 9 صباحًا حتى 2 ظهرًا. اختر القناة التي تناسبك.',
    'screensA.contact.chat': 'الدردشة المباشرة',
    'screensA.contact.chatBody': 'الأسرع. والانتظار عادةً أقل من دقيقتين.',
    'screensA.contact.online': 'متصل الآن',
    'screensA.contact.email': 'البريد الإلكتروني',
    'screensA.contact.emailBody': 'نرد خلال يوم عمل واحد.',
    'screensA.contact.phone': 'الهاتف',
    'screensA.contact.phoneBody': 'الأفضل للأسئلة العاجلة عن التركيب أو السلامة.',
    'screensA.contact.ticket': 'فتح تذكرة',
    'screensA.contact.ticketBody': 'الأفضل عندما يمكنك إرفاق صور أو سجلات.',
    'screensA.contact.startTicket': 'ابدأ تذكرة',
    'screensA.contact.formTitle': 'أرسل لنا رسالة',
    'screensA.contact.formLede': 'لكل ما لا يتعلق بجهاز بعينه.',
    'screensA.contact.name': 'اسمك',
    'screensA.contact.message': 'الرسالة',
    'screensA.contact.messagePlaceholder': 'كيف يمكننا المساعدة؟',
    'screensA.contact.send': 'إرسال الرسالة',
    'screensA.contact.headOffice': 'المقر الرئيسي',
    'screensA.contact.returnsDepot': 'مستودع المرتجعات',
    'screensA.contact.returnsBody':
      'لا ترسل المرتجعات إلى المكتب — ابدأ عملية إرجاع أولًا واستخدم الملصق المدفوع مسبقًا الذي يصلك بالبريد.',
    'screensA.contact.returnsLink': 'كيف يعمل الإرجاع',

    /* ----------------------------------------------------------- delete */
    'screensA.delete.step1': 'ما سيُحذف',
    'screensA.delete.step2': 'بدائل',
    'screensA.delete.step3': 'تأكيد',
    'screensA.delete.scheduledTitle': 'تمت جدولة الحذف',
    'screensA.delete.keep': 'الاحتفاظ بحسابي',
    'screensA.delete.downloadFirst': 'تنزيل بياناتي أولًا',
    'screensA.delete.h1': 'حذف حسابك',
    'screensA.delete.lede':
      'سنوضح لك ما سيُحذف وما سيبقى. لا يحدث شيء قبل الخطوة الأخيرة، ولديك 30 يومًا لتغيير رأيك.',
    'screensA.delete.h2Things': 'ماذا يحدث لأشيائك',
    'screensA.delete.textThings':
      'تواصل أجهزتك العمل محليًا — الجداول والتنبيهات والتسجيل المحلي كلها مستمرة. والذي يُحذف هو الحساب وكل ما في سحابتنا.',
    'screensA.delete.calloutCopy':
      'خذ نسخة أولًا إن أردت — ملف مضغوط بحسابك وأجهزتك وجداولك وفهرس مقاطعك، جاهز عادةً خلال عشر دقائق.',
    'screensA.delete.h2Before': 'قبل أن تذهب',
    'screensA.delete.textBefore':
      'هذه غالبًا ما تعالج السبب الذي يدفع الناس للمغادرة. تخطَّها إن كنت قد حسمت أمرك — لن نسأل مرة أخرى.',
    'screensA.delete.reasonLabel': 'لماذا تغادر؟',
    'screensA.delete.reasonOptional': 'اختياري، لكنه يساعدنا',
    'screensA.delete.reasonPlaceholder': 'أفضّل عدم الإفصاح',
    'screensA.delete.h2Confirm': 'أكّد أنك أنت',
    'screensA.delete.textConfirm':
      'اكتب {word} للتأكيد. وسنرسل لك رابطًا بالبريد أيضًا — ولا يُمسّ الحساب حتى تفتحه.',
    'screensA.delete.phraseLabel': 'اكتب DELETE',
    'screensA.delete.calloutDanger':
      'بعد 30 يومًا لا يستطيع أحد التراجع، ولا نحن. وتذهب معه المقاطع والجداول وسجل الطلبات وأي رصيد متبقٍ.',
    'screensA.delete.back': 'رجوع',
    'screensA.delete.schedule': 'جدولة الحذف',
    'screensA.delete.continue': 'متابعة',
    'screensA.delete.cancel': 'إلغاء والاحتفاظ بحسابي',

    /* ---------------------------------------------------------- devices */
    'screensA.devices.online': 'متصل',
    'screensA.devices.batteryLow': 'البطارية منخفضة',
    'screensA.devices.offline': 'غير متصل',
    'screensA.devices.summaryOffline':
      '{devices} · لا شيء غير متصل · مؤمَّن منذ {time}|{devices} · جهاز واحد غير متصل · مؤمَّن منذ {time}|{devices} · جهازان غير متصلين · مؤمَّن منذ {time}|{devices} · {count} أجهزة غير متصلة · مؤمَّن منذ {time}|{devices} · {count} جهازًا غير متصل · مؤمَّن منذ {time}|{devices} · {count} جهاز غير متصل · مؤمَّن منذ {time}',
    'screensA.devices.summaryAll': '{devices} · كلها متاحة · مؤمَّن منذ {time}',
    'screensA.devices.unread':
      'لا رسائل غير مقروءة|رسالة واحدة غير مقروءة|رسالتان غير مقروءتين|{count} رسائل غير مقروءة|{count} رسالة غير مقروءة|{count} رسالة غير مقروءة',
    'screensA.devices.allCaught': 'لا جديد',
    'screensA.devices.memberLine':
      '{people} · لا دعوات معلّقة|{people} · دعوة واحدة معلّقة|{people} · دعوتان معلّقتان|{people} · {count} دعوات معلّقة|{people} · {count} دعوة معلّقة|{people} · {count} دعوة معلّقة',
    'screensA.devices.liveLine':
      '{cameras} · لا مقاطع اليوم|{cameras} · مقطع واحد اليوم|{cameras} · مقطعان اليوم|{cameras} · {count} مقاطع اليوم|{cameras} · {count} مقطعًا اليوم|{cameras} · {count} مقطع اليوم',
    'screensA.devices.autoLine': '{running} قيد التشغيل، {paused} متوقفة مؤقتًا',
    'screensA.devices.toastOn': '{name} · {label} مُفعَّل',
    'screensA.devices.toastOff': '{name} · {label} مُعطَّل',
    'screensA.devices.toastAdd': 'تُضاف الأجهزة من تطبيق Hearth',
    'screensA.devices.add': 'إضافة جهاز',
    'screensA.devices.energy': 'رؤى الطاقة',
    'screensA.devices.liveView': 'العرض المباشر',
    'screensA.devices.automations': 'الأتمتة',
    'screensA.devices.notifications': 'الإشعارات',
    'screensA.devices.household': 'أفراد المنزل',

    /* -------------------------------------------------------- downloads */
    'screensA.downloads.appIphone': 'Hearth لـ iPhone',
    'screensA.downloads.appAndroid': 'Hearth لـ Android',
    'screensA.downloads.toastStore':
      'روابط متاجر التطبيقات معطّلة في هذا العرض التوضيحي',
    'screensA.downloads.h1': 'التنزيلات والأدلة',
    'screensA.downloads.lede':
      'أدلة وبطاقات بدء سريع ومخططات توصيل وأدوات للفنيين. وكل ما هنا مجاني ولا يحتاج حسابًا.',
    'screensA.downloads.toastFile': 'جارٍ تنزيل {file}',
    'screensA.downloads.getFile': 'الحصول على الملف',
    'screensA.downloads.download': 'تنزيل',
    'screensA.downloads.getApp': 'احصل على التطبيق',

    /* ----------------------------------------------------------- energy */
    'screensA.energy.week': 'أسبوع',
    'screensA.energy.month': 'شهر',
    'screensA.energy.year': 'سنة',
    'screensA.energy.h1': 'رؤى الطاقة',
    'screensA.energy.lede':
      'محسوبة من الثرموستات والمقابس. وتعتمد التقديرات على تعرفتك — غيّرها في التطبيق إن كانت قديمة.',
    'screensA.energy.periodLabel': 'الفترة',
    'screensA.energy.byRoom': 'حسب الغرفة',

    /* --------------------------------------------------------- firmware */
    'screensA.firmware.h1': 'ملاحظات إصدارات البرنامج الثابت',
    'screensA.firmware.lede':
      'تُثبَّت التحديثات ليلًا من تلقاء نفسها. ويمكنك دائمًا بدء أحدها يدويًا من التطبيق ضمن «الإعدادات» ثم «حول».',
    'screensA.firmware.allDevices': 'كل الأجهزة',
    'screensA.firmware.rolling': 'قيد الطرح',

    /* ------------------------------------------------------------ forum */
    'screensA.forum.toastPost': 'النشر معطّل في هذا العرض التوضيحي',
    'screensA.forum.h1': 'منتدى المجتمع',
    'screensA.forum.lede':
      'تبادل الإعدادات والأتمتة والحلول مع مالكي Hearth الآخرين. وفريق Hearth يمرّ يوميًا — ابحث عن الشارة.',
    'screensA.forum.start': 'ابدأ نقاشًا',
    'screensA.forum.answered': 'تمت الإجابة',
    'screensA.forum.inCat': 'في {cat}',
    'screensA.forum.answerFrom': 'إجابة من {name}',
    'screensA.forum.reply': 'الرد في الموضوع',
    'screensA.forum.askSupport': 'اسأل الدعم بدلًا من ذلك',
    'screensA.forum.emptyTitle': 'لا توجد نقاشات هنا بعد',
    'screensA.forum.emptyBody':
      'لا شيء في هذا القسم حتى الآن. ابدأ أول موضوع وسيبقى في الأعلى للجميع.',
    'screensA.forum.thisWeek': 'هذا الأسبوع',
    'screensA.forum.newPosts': 'مشاركات جديدة',
    'screensA.forum.answeredStat': 'تمت الإجابة',
    'screensA.forum.topContributors': 'أبرز المساهمين',
    'screensA.forum.helpfulPosts':
      'لا مشاركات مفيدة|مشاركة مفيدة واحدة|مشاركتان مفيدتان|{count} مشاركات مفيدة|{count} مشاركة مفيدة|{count} مشاركة مفيدة',
    'screensA.forum.rules': 'قواعد المنتدى',
    'screensA.forum.rulesBody':
      'كن لطيفًا، والتزم بالموضوع، ولا تنشر أبدًا أرقامًا تسلسلية أو تفاصيل طلبات في مواضيع عامة.',

    /* ------------------------------------------------------------- gift */
    'screensA.gift.whenNow': 'فورًا',
    'screensA.gift.whenTomorrow': 'صباح الغد',
    'screensA.gift.whenDate': 'في تاريخ أختاره',
    'screensA.gift.sentNow': 'إنها في طريقها إلى {where} الآن، ومعها رسالتك.',
    'screensA.gift.theirInbox': 'بريده',
    'screensA.gift.sentLater': 'سنسلّمها في الصباح الذي اخترته، ومعها رسالتك.',
    'screensA.gift.toastMin': 'تبدأ بطاقات الهدايا من {min}',
    'screensA.gift.toastWho': 'لمن هي؟',
    'screensA.gift.toastEmail': 'أضف عنوان بريده الإلكتروني',
    'screensA.gift.toastSent': 'أُرسلت بطاقة الهدية',
    'screensA.gift.toastCode': 'أدخل الكود كاملًا من الرسالة',
    'screensA.gift.toastBalance': 'أُضيف {amount} إلى رصيدك',
    'screensA.gift.buyAnother': 'شراء أخرى',
    'screensA.gift.h1': 'بطاقات الهدايا',
    'screensA.gift.lede':
      'تُستخدم في أي جهاز Hearth أو قطعة غيار أو خطة Hearth Care. بلا انتهاء صلاحية ولا رسوم، وقابلة للاسترداد خلال 14 يومًا ما دامت غير مستخدمة.',
    'screensA.gift.design': 'اختر تصميمًا',
    'screensA.gift.amount': 'المبلغ',
    'screensA.gift.other': 'مبلغ آخر',
    'screensA.gift.customPlaceholder': 'أي مبلغ من {min} إلى {max}',
    'screensA.gift.customAria': 'مبلغ مخصص لبطاقة الهدية',
    'screensA.gift.recipient': 'اسم المُهدى إليه',
    'screensA.gift.theirEmail': 'بريده الإلكتروني',
    'screensA.gift.message': 'رسالة',
    'screensA.gift.optional': 'اختياري',
    'screensA.gift.messagePlaceholder': 'كل سنة وأنت طيب — خلّي البيت أذكى.',
    'screensA.gift.whenLabel': 'متى نرسلها؟',
    'screensA.gift.buy': 'شراء بطاقة بقيمة {amount}',
    'screensA.gift.preview': 'معاينة',
    'screensA.gift.for': 'إلى {name}',
    'screensA.gift.someoneLucky': 'شخص محظوظ',
    'screensA.gift.messageHere': 'ستظهر رسالتك هنا.',
    'screensA.gift.foot': 'بلا انتهاء صلاحية · {url}',
    'screensA.gift.redeem': 'استبدال بطاقة',
    'screensA.gift.codeAria': 'كود بطاقة الهدية',
    'screensA.gift.addBalance': 'إضافة إلى الرصيد',
    'screensA.gift.yourBalance': 'رصيدك',

    /* ------------------------------------------------------------ guide */
    'screensA.guide.buyCard': 'اشترِ بطاقة هدية بدلًا من ذلك',
    'screensA.guide.filterLabel': 'تصفية دليل الهدايا',
    'screensA.guide.addBasket': 'أضف إلى السلة',
    'screensA.guide.saveLater': 'حفظ لوقت لاحق',
    'screensA.guide.delivery': 'التوصيل في الوقت المناسب',
    'screensA.guide.wrapHead': 'جاهزة للإهداء دائمًا',
    'screensA.guide.wrapText':
      'علب خالية من البلاستيك، ولا أسعار على قسيمة التغليف، وبطاقة مكتوبة بخط اليد إذا أضفت رسالة عند الدفع. والإرجاع متاح حتى 31 يناير لكل ما اشتُري ابتداءً من نوفمبر.',
    'screensA.guide.returnsLink': 'كيف يعمل الإرجاع الممتد',

    /* ------------------------------------------------------------- home */
    'screensA.home.browse': 'تصفح حسب الموضوع',
    'screensA.home.popular': 'المقالات الشائعة',
    'screensA.home.ctaTitle': 'لم تجد ما تحتاجه؟',
    'screensA.home.ctaBody': 'افتح تذكرة ونتولى الباقي. ومعظم الردود تصل خلال يوم.',
    'screensA.home.openTicket': 'فتح تذكرة',

    /* ---------------------------------------------------------- imprint */
    'screensA.imprint.termCompany': 'الشركة المسجَّلة',
    'screensA.imprint.termAddress': 'العنوان المسجَّل',
    'screensA.imprint.termDirectors': 'أعضاء الإدارة',
    'screensA.imprint.termNumber': 'رقم الشركة',
    'screensA.imprint.termVat': 'الرقم الضريبي',
    'screensA.imprint.termContact': 'التواصل',
    'screensA.imprint.termResponsible': 'المسؤول عن المحتوى',
    'screensA.imprint.responsibleValue': '{name}، العنوان كما هو أعلاه',
    'screensA.imprint.h1': 'بيانات الناشر',
    'screensA.imprint.lede':
      'المعلومات القانونية المطلوبة عن Hearth Home Ltd. وعن هذا الموقع.',
    'screensA.imprint.updated': 'آخر تحديث في {date}',
    'screensA.imprint.h2Adr': 'تسوية منازعات المستهلك',
    'screensA.imprint.bodyAdr':
      'نشارك في برنامج Retail ADR المستقل. وإذا لم نتمكن من تسوية شكوى فيما بيننا، يمكنك إحالتها إلى Retail ADR مجانًا. وسيرسل لك فريق الدعم رقم القضية والنماذج عند الطلب.',
    'screensA.imprint.h2Content': 'المسؤولية عن المحتوى',
    'screensA.imprint.bodyContent':
      'نعدّ محتوى هذه الصفحات بعناية، لكننا لا نضمن بقاء كل مقالة دقيقة مع تغيّر إصدارات البرنامج الثابت والتطبيق. وحين تتعارض مقالة مع دليل السلامة المطبوع داخل العلبة، فالأولوية للدليل المطبوع.',
    'screensA.imprint.h2Links': 'المسؤولية عن الروابط',
    'screensA.imprint.bodyLinks':
      'تحيل بعض المقالات إلى تتبع الشحن أو متاجر التطبيقات أو مشاركات مجتمعية لا نتحكم فيها. ونتحقق من الروابط الخارجية عند إضافتها، لكننا لسنا مسؤولين عما يتغير في تلك الصفحات لاحقًا.',
    'screensA.imprint.h2Copyright': 'حقوق النشر',
    'screensA.imprint.bodyCopyright':
      'جميع النصوص والرسوم وصور المنتجات على هذا الموقع مملوكة لشركة Hearth Home Ltd. ما لم يُذكر خلاف ذلك. ويسعدنا اقتباس مقالة مساعدة مع رابط إلى المصدر؛ يرجى مراسلتنا قبل إعادة نشر صفحة كاملة.',
    'screensA.imprint.callout':
      'هذه بوابة تجريبية مبنية بـ Adminium. وكل بيانات الشركة والعناوين وأرقام التسجيل في هذه الصفحة خيالية.',

    /* ------------------------------------------------------- installers */
    'screensA.installers.radius':
      'لا أميال|ميل واحد|ميلان|{count} أميال|{count} ميلًا|{count} ميل',
    'screensA.installers.count':
      '{installers} ضمن أي مسافة|{installers} ضمن ميل واحد|{installers} ضمن ميلين|{installers} ضمن {count} أميال|{installers} ضمن {count} ميلًا|{installers} ضمن {count} ميل',
    'screensA.installers.toastPostcode': 'أدخل رمزًا بريديًا للبحث',
    'screensA.installers.toastFound':
      'لا يوجد فنيون قرب {postcode}|فني واحد قرب {postcode}|فنيان قرب {postcode}|{count} فنيين قرب {postcode}|{count} فنيًا قرب {postcode}|{count} فني قرب {postcode}',
    'screensA.installers.toastCall': 'الاتصال غير متاح في هذا العرض التوضيحي',
    'screensA.installers.toastRequest': 'أُرسل الطلب إلى {name}',
    'screensA.installers.h1': 'ابحث عن فني تركيب معتمد',
    'screensA.installers.lede':
      'كل فني هنا مدرَّب على أجهزة Hearth ومؤمَّن، ولا يقيّمه إلا عملاء حجزوا فعلًا. وتوصيل جرس الباب أو تبديل الثرموستات يستغرق عادةً أقل من ساعتين.',
    'screensA.installers.postcode': 'الرمز البريدي',
    'screensA.installers.within': 'ضمن',
    'screensA.installers.find': 'ابحث عن فنيين',
    'screensA.installers.sorted': 'مرتَّبة حسب المسافة',
    'screensA.installers.approved': 'معتمد',
    'screensA.installers.call': 'اتصال',
    'screensA.installers.request': 'طلب زيارة',
    'screensA.installers.note':
      'فنيو التركيب أعمال مستقلة. والأعمال المحجوزة عبر Hearth مشمولة بضمان التركيب لسنتين — احتفظ بالفاتورة ونحن نتولى أي نزاع.',

    /* -------------------------------------------------------- insurance */
    'screensA.insurance.retention':
      'تحتفظ خطتك بالمقاطع {days} يومًا، لذا فكل ما قبل {date} قد اختفى بالفعل. اطلب منا في أقرب وقت — فبعد انتهاء صلاحية المقطع لا يمكننا استعادته.',
    'screensA.insurance.h1': 'مطالبات التأمين',
    'screensA.insurance.lede':
      'عادةً ما تطلب شركات التأمين التسجيل والطوابع الزمنية وإثباتًا أن الجهاز كان يعمل. ويمكننا وضع الثلاثة في حزمة واحدة — مجانًا، وجاهزة عادةً خلال ساعة.',
    'screensA.insurance.pack': 'ما في حزمة الأدلة',
    'screensA.insurance.packText':
      'المقاطع الأصلية وسجل طوابع زمنية موقَّع وتاريخ حالة الأجهزة وملخص PDF يقرؤه خبير التسويات.',
    'screensA.insurance.privacy': 'لا نتحدث أبدًا مع شركة تأمينك',
    'screensA.insurance.privacyText':
      'تصل الحزمة إليك أنت. ولا تُشارَك مع أحد إلا إذا أرسلتها بنفسك أو أمرت بذلك محكمة.',
    'screensA.insurance.yourClaims': 'مطالباتك',
    'screensA.insurance.emailInsurer': 'إرسال إلى شركة التأمين',
    'screensA.insurance.requestTitle': 'طلب حزمة أدلة',
    'screensA.insurance.what': 'ماذا حدث؟',
    'screensA.insurance.date': 'تاريخ الحادثة',
    'screensA.insurance.window': 'النطاق الزمني المطلوب تغطيته',
    'screensA.insurance.ref': 'شركة التأمين أو المرجع',
    'screensA.insurance.optional': 'اختياري',
    'screensA.insurance.refPlaceholder': 'مثال: Aviva · مطالبة 4471882',
    'screensA.insurance.note': 'هل هناك ما يجب أن يعرفه خبير التسويات؟',
    'screensA.insurance.notePlaceholder':
      'ما الذي تضرر أو فُقد، ومتى لاحظت ذلك تقريبًا.',
    'screensA.insurance.submit': 'أنشئ حزمة الأدلة',

    /* --------------------------------------------------------------- kb */
    'screensA.kb.h1': 'ابحث في قاعدة المعرفة',
    'screensA.kb.placeholder':
      'ابحث في المقالات — جرّب «reset» أو «offline»|ابحث في مقالة واحدة — جرّب «reset» أو «offline»|ابحث في مقالتين — جرّب «reset» أو «offline»|ابحث في {count} مقالات — جرّب «reset» أو «offline»|ابحث في {count} مقالة — جرّب «reset» أو «offline»|ابحث في {count} مقالة — جرّب «reset» أو «offline»',
    'screensA.kb.clear': 'مسح',
    'screensA.kb.sortLabel': 'ترتيب النتائج',
    'screensA.kb.sortRelevance': 'الأكثر صلة',
    'screensA.kb.sortShort': 'الأسرع قراءة',
    'screensA.kb.sortAz': 'A – Z',
    'screensA.kb.emptyTitle': 'لا نتائج مطابقة لـ «{query}»',
    'screensA.kb.emptyBody':
      'جرّب كلمات أقل، أو أحد هذه البدائل — فمعظم الناس يجدون ما يحتاجونه في النتيجة الأولى.',
    'screensA.kb.emptyAction': 'اسألنا بدلًا من ذلك',
    'screensA.kb.alsoSearch': 'يبحث الناس أيضًا عن:',
  },
} satisfies Record<LocaleTag, Record<string, string>>;
