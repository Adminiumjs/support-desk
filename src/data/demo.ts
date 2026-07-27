/*
 * The seeded demo dataset (port spec §7), transcribed from the comp.
 *
 * Every string is verbatim apart from the de-branding pass: the fictional
 * company is "Hearth", and ticket / order / serial / SKU / gift codes carry
 * the matching "HH" prefixes. Typographic apostrophes (’) are preserved
 * exactly as authored.
 *
 * Nothing in here is reactive. Screens reach it through `./source.ts`.
 */

import type {
  A11yPaletteOption,
  A11ySize,
  A11yToggle,
  Appointment,
  Article,
  ArticleBodies,
  Bundle,
  Category,
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
  PartCategory,
  PartnerJob,
  PartnerLink,
  Part,
  Person,
  Plan,
  ProductId,
  Product,
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

/* ------------------------------------------------------------- identity */

export const AGENT: Person = {
  name: "Maya",
  full: "Maya from Hearth",
  initials: "MA",
  tint: "#4f8bd6",
};

export const CUSTOMER: CustomerIdentity = {
  initials: "SA",
  tint: "#5f9e6b",
  email: "sam@example.com",
};

/** Ticket / order code prefix. */
export const CODE_PREFIX = "HH-";

export const BRAND = "Hearth";

/* ------------------------------------------------------------- products */

export const PRODUCTS: Product[] = [
  {
    id: "thermostat",
    name: "Thermostat",
    model: "Hearth Thermostat",
    icon: "thermometer",
    tint: "#d0703f",
  },
  {
    id: "doorbell",
    name: "Video Doorbell",
    model: "Hearth Doorbell",
    icon: "bell-ring",
    tint: "#4f8bd6",
  },
  {
    id: "plug",
    name: "Smart Plug",
    model: "Hearth Plug",
    icon: "plug-zap",
    tint: "#5f9e6b",
  },
  {
    id: "sensor",
    name: "Sensor",
    model: "Hearth Sensor",
    icon: "radar",
    tint: "#8a6fb0",
  },
];

/* ----------------------------------------------------- knowledge base */

export const CATS: Category[] = [
  {
    slug: "setup",
    name: "Setup & install",
    icon: "wrench",
    tint: "#4f8bd6",
    blurb: "Get a new device out of the box and onto your network.",
  },
  {
    slug: "connect",
    name: "Connectivity",
    icon: "wifi",
    tint: "#3f9e78",
    blurb: "Wi-Fi trouble, offline devices, and network changes.",
  },
  {
    slug: "devices",
    name: "Devices",
    icon: "cpu",
    tint: "#8a6fb0",
    blurb: "Schedules, motion zones, firmware, and resets.",
  },
  {
    slug: "account",
    name: "Account",
    icon: "circle-user",
    tint: "#c0865f",
    blurb: "Login, household members, and notifications.",
  },
  {
    slug: "shipping",
    name: "Shipping & returns",
    icon: "truck",
    tint: "#b06f8f",
    blurb: "Orders, returns, warranty, and damaged items.",
  },
];

export const ARTICLES: Article[] = [
  {
    id: "a_setup_account",
    cat: "setup",
    title: "Set up your Hearth account and app",
    read: 3,
    snippet: "Create your account, then add every device from one place.",
  },
  {
    id: "a_pair_thermostat",
    cat: "setup",
    title: "Pairing the thermostat with the app",
    read: 4,
    snippet: "Five minutes, your Wi-Fi password, and a phone nearby.",
  },
  {
    id: "a_mount_doorbell",
    cat: "setup",
    title: "Mount and wire the video doorbell",
    read: 6,
    snippet: "Run it on battery, or wire it in so it never needs charging.",
  },
  {
    id: "a_add_plug",
    cat: "setup",
    title: "Add a smart plug to a room",
    read: 2,
    snippet: "The quickest device to add — usually under a minute.",
  },
  {
    id: "a_doorbell_wifi",
    cat: "connect",
    title: "Doorbell won't hold a Wi-Fi connection",
    read: 5,
    snippet: "Keeps dropping? It's almost always signal, not a fault.",
  },
  {
    id: "a_wifi_bands",
    cat: "connect",
    title: "Which Wi-Fi bands Hearth devices support",
    read: 3,
    snippet: "Hearth devices use 2.4 GHz for range — here's why.",
  },
  {
    id: "a_move_network",
    cat: "connect",
    title: "Move a device to a new Wi-Fi network",
    read: 3,
    snippet: "New router or password? Point each device at the new network.",
  },
  {
    id: "a_offline",
    cat: "connect",
    title: "Fix a device that shows offline",
    read: 4,
    snippet: 'An "offline" label usually clears itself — here\'s how to help.',
  },
  {
    id: "a_thermo_schedule",
    cat: "devices",
    title: "Thermostat schedules and Eco mode",
    read: 4,
    snippet: "Warm up before you're home, ease off when you're out.",
  },
  {
    id: "a_motion_zones",
    cat: "devices",
    title: "Set up doorbell motion zones and alerts",
    read: 5,
    snippet: "Get alerts for people at your door, not cars on the street.",
  },
  {
    id: "a_firmware",
    cat: "devices",
    title: "Update your device firmware",
    read: 2,
    snippet: "Updates install overnight on their own — or nudge one by hand.",
  },
  {
    id: "a_factory_reset",
    cat: "devices",
    title: "Reset a device to factory settings",
    read: 3,
    snippet: "Wipe a device back to how it left the box, step by step.",
  },
  {
    id: "a_change_login",
    cat: "account",
    title: "Change your email or password",
    read: 2,
    snippet: "Update your sign-in details in under a minute.",
  },
  {
    id: "a_add_member",
    cat: "account",
    title: "Add a family member or housemate",
    read: 3,
    snippet: "Share your home without handing out your password.",
  },
  {
    id: "a_notifications",
    cat: "account",
    title: "Manage notifications and quiet hours",
    read: 3,
    snippet: "Tune alerts so Hearth stays helpful, not noisy.",
  },
  {
    id: "a_close_account",
    cat: "account",
    title: "Close your Hearth account",
    read: 2,
    snippet: "Remove your devices and data from Hearth for good.",
  },
  {
    id: "a_track_order",
    cat: "shipping",
    title: "Track your Hearth order",
    read: 2,
    snippet: "Find the tracking link for an order on its way.",
  },
  {
    id: "a_return",
    cat: "shipping",
    title: "Start a return or exchange",
    read: 3,
    snippet: "30 days to return or exchange, with a prepaid label.",
  },
  {
    id: "a_warranty",
    cat: "shipping",
    title: "What the warranty covers",
    read: 4,
    snippet: "A two-year limited warranty covers defects — here's the detail.",
  },
  {
    id: "a_damaged",
    cat: "shipping",
    title: "Report a missing or damaged item",
    read: 3,
    snippet: "Missing or damaged in the box? We'll make it right fast.",
  },
];

export const POPULAR: string[] = [
  "a_doorbell_wifi",
  "a_pair_thermostat",
  "a_motion_zones",
  "a_return",
  "a_factory_reset",
];

export const BODIES: ArticleBodies = {
  a_setup_account: [
    {
      t: "p",
      x: "The whole Hearth system runs through one free app. Set up your account first, then every device you add lives in the same place.",
    },
    { t: "h", x: "Create your account" },
    {
      t: "ol",
      x: [
        "Download the Hearth app from the App Store or Google Play.",
        "Tap Create account and enter your email.",
        "Enter the six-digit code we email you.",
        "Set a password and give your home a name.",
      ],
    },
    { t: "h", x: "Add your first device" },
    {
      t: "p",
      x: "On the home screen, tap the + in the top corner and pick your device type. The app walks you through the rest, one screen at a time.",
    },
    {
      t: "tip",
      x: "Use an email you check often — order updates, security alerts, and this help desk all use the same address.",
    },
  ],
  a_pair_thermostat: [
    {
      t: "p",
      x: "Pairing takes about five minutes. Have your Wi-Fi password handy and keep your phone within a few feet of the thermostat.",
    },
    {
      t: "ol",
      x: [
        "In the app, tap + then Thermostat.",
        "Press and hold the dial until the ring turns blue.",
        "Choose your 2.4 GHz Wi-Fi network and enter the password.",
        "Wait for the ring to turn solid green — that means it is online.",
      ],
    },
    { t: "h", x: "If pairing stalls" },
    {
      t: "ul",
      x: [
        "Make sure Bluetooth is on for the setup step.",
        "Stand closer to your router while pairing.",
        "If the ring never turns blue, hold the dial for 15 seconds to restart it.",
      ],
    },
    {
      t: "tip",
      x: "The thermostat only joins 2.4 GHz networks. If your router hides the band names, see “Which Wi-Fi bands Hearth devices support.”",
    },
  ],
  a_mount_doorbell: [
    {
      t: "p",
      x: "The doorbell can run on its battery or on your existing doorbell wires. Wiring keeps it charged so you never have to take it down.",
    },
    {
      t: "warn",
      x: "Turn off power to your doorbell at the breaker before you touch any wires. This is the one step you should not skip.",
    },
    { t: "h", x: "Mount it" },
    {
      t: "ol",
      x: [
        "Turn off power at the breaker.",
        "Loosen your old doorbell and disconnect the two wires.",
        "Screw the Hearth base plate to the wall or bracket.",
        "Connect the two wires to the base plate screws — either wire on either screw is fine.",
        "Click the doorbell onto the plate and turn the power back on.",
      ],
    },
    {
      t: "tip",
      x: "No existing wires? Skip wiring entirely and top up the doorbell with the included USB-C cable every couple of months.",
    },
  ],
  a_add_plug: [
    {
      t: "p",
      x: "A smart plug is the quickest device to add — most people are done in under a minute.",
    },
    {
      t: "ol",
      x: [
        "Plug it into any outlet.",
        "In the app, tap + then Smart Plug.",
        "When the plug’s light blinks, confirm your Wi-Fi network.",
        "Name it for the room or the thing it controls, like “Living room lamp.”",
      ],
    },
    {
      t: "tip",
      x: "Naming the plug after what it controls makes voice commands and schedules much easier to remember later.",
    },
  ],
  a_doorbell_wifi: [
    {
      t: "p",
      x: "A doorbell that keeps dropping off Wi-Fi is almost always a signal problem, not a broken device. Here is how to steady the connection.",
    },
    { t: "h", x: "Check the signal first" },
    {
      t: "p",
      x: "Open the doorbell in the app and tap Device health. Anything below two bars at the door will drop out, especially at night when more devices are awake.",
    },
    { t: "h", x: "What usually fixes it" },
    {
      t: "ol",
      x: [
        "Move your router or add a mesh point closer to the front door.",
        "Make sure the doorbell is on the 2.4 GHz network, which reaches farther than 5 GHz.",
        "Restart the doorbell from Settings → Restart device.",
        "If it still drops, re-pair it so it picks the strongest band.",
      ],
    },
    {
      t: "tip",
      x: "Thick doors, brick, and metal screens all cut signal. A mesh point one room from the door does more than any in-app setting.",
    },
  ],
  a_wifi_bands: [
    {
      t: "p",
      x: "All Hearth devices connect over 2.4 GHz Wi-Fi. It is slower than 5 GHz but reaches much farther and passes through walls better — exactly what a doorbell or sensor needs.",
    },
    { t: "h", x: "If your networks share one name" },
    {
      t: "p",
      x: "Many modern routers broadcast both bands under a single name and pick one for you. That is usually fine. If a device refuses to pair, split the bands temporarily or make a guest network on 2.4 GHz just for setup.",
    },
    {
      t: "tip",
      x: "Once a device is paired it stays on 2.4 GHz on its own. You only need to think about bands during setup.",
    },
  ],
  a_move_network: [
    {
      t: "p",
      x: "Changing routers or Wi-Fi passwords? Each device needs to be pointed at the new network. There is no bulk switch, but it only takes a minute per device.",
    },
    {
      t: "ol",
      x: [
        "Open the device in the app.",
        "Tap Settings → Wi-Fi.",
        "Choose the new network and enter the password.",
        "Wait for the status light to turn solid.",
      ],
    },
    {
      t: "warn",
      x: "If you have already returned the old router, you will need to reset each device and add it fresh, since it can no longer reach the old network to hand off.",
    },
  ],
  a_offline: [
    {
      t: "p",
      x: "An “Offline” label means the device cannot reach the Hearth servers right now. Nine times out of ten it comes back on its own; here is how to help it along.",
    },
    {
      t: "ol",
      x: [
        "Check that your internet is up on another device.",
        "Restart the Hearth device — unplug it or use Settings → Restart.",
        "Restart your router if more than one device is offline.",
        "Give it two full minutes to reconnect before trying anything else.",
      ],
    },
    {
      t: "tip",
      x: "If only one device is offline, the problem is usually signal at that spot. If everything is offline at once, it is your router or internet.",
    },
  ],
  a_thermo_schedule: [
    {
      t: "p",
      x: "Schedules let the thermostat warm up or cool down before you need it, then ease off when you are asleep or out. Eco mode handles the “out” part automatically.",
    },
    { t: "h", x: "Build a schedule" },
    {
      t: "ol",
      x: [
        "Open the thermostat and tap Schedule.",
        "Add a set point for each part of your day — morning, day, evening, night.",
        "Drag a point to change its time, or tap it to change the temperature.",
      ],
    },
    { t: "h", x: "Eco mode" },
    {
      t: "p",
      x: "Turn on Eco and the thermostat relaxes to an energy-saving range whenever your phones leave home, then returns to your schedule when someone comes back.",
    },
    {
      t: "tip",
      x: "Start with just two set points — a comfortable evening and a cooler night. You can always add more once you see how it feels.",
    },
  ],
  a_motion_zones: [
    {
      t: "p",
      x: "Motion zones tell the doorbell which parts of its view matter, so you get alerts for people at your door and not for cars on the street.",
    },
    { t: "h", x: "Draw your zones" },
    {
      t: "ol",
      x: [
        "Open the doorbell and tap Motion → Zones.",
        "Drag the corners of the box to cover your walkway and porch.",
        "Leave the sidewalk and road outside the box.",
        "Save, then watch for a day and adjust.",
      ],
    },
    { t: "h", x: "Tune your alerts" },
    {
      t: "ul",
      x: [
        "Lower the sensitivity if you get too many alerts.",
        "Turn on Person alerts to ignore animals and shadows.",
        "Use quiet hours so overnight motion is recorded but silent.",
      ],
    },
    {
      t: "tip",
      x: "Smaller, tighter zones almost always beat one big zone. Aim for the three steps in front of your door.",
    },
  ],
  a_firmware: [
    {
      t: "p",
      x: "Firmware updates arrive automatically and install overnight while a device is idle. You rarely need to do anything — but you can check or nudge an update by hand.",
    },
    {
      t: "ol",
      x: [
        "Open the device and tap Settings → About.",
        "If an update is waiting, tap Update now.",
        "Keep the device powered until the light stops blinking.",
      ],
    },
    {
      t: "warn",
      x: "Do not unplug a device while it updates. A half-finished update is the most common cause of a device that will not start up.",
    },
  ],
  a_factory_reset: [
    {
      t: "p",
      x: "A factory reset wipes a device back to how it left the box. Use it before you give a device away, or as a last resort when nothing else fixes a problem.",
    },
    { t: "h", x: "How to reset each device" },
    {
      t: "ul",
      x: [
        "Thermostat: hold the dial for 15 seconds until the ring flashes red.",
        "Doorbell: hold the button on the back for 15 seconds.",
        "Smart plug: hold the side button for 10 seconds until it blinks fast.",
        "Sensor: hold the pinhole button for 10 seconds with a paperclip.",
      ],
    },
    {
      t: "warn",
      x: "A reset removes the device from your home and erases its settings and recordings. You will need to add it again from scratch.",
    },
    {
      t: "tip",
      x: "Try a simple restart first. A reset should be your last step, not your first.",
    },
  ],
  a_change_login: [
    {
      t: "p",
      x: "You can change your email and password any time from your profile. Both take effect right away across every device in your home.",
    },
    {
      t: "ol",
      x: [
        "Open the app and tap your profile picture.",
        "Tap Account → Email or Password.",
        "Confirm the change with the code we send you.",
      ],
    },
    {
      t: "tip",
      x: "Turn on two-step verification while you are here. It adds a code at sign-in and takes about thirty seconds to set up.",
    },
  ],
  a_add_member: [
    {
      t: "p",
      x: "Share your home so family or housemates can see the same devices — no need to hand out your password.",
    },
    {
      t: "ol",
      x: [
        "Tap your home name, then Members → Invite.",
        "Enter their email and choose Full access or View only.",
        "They accept from their own free Hearth account.",
      ],
    },
    {
      t: "ul",
      x: [
        "Full access can change settings and schedules.",
        "View only can watch and get alerts but not change things.",
      ],
    },
    {
      t: "tip",
      x: "You can change or remove a member’s access at any time from the same Members screen.",
    },
  ],
  a_notifications: [
    {
      t: "p",
      x: "Hearth can send a lot of alerts. A few minutes tuning them is the difference between helpful and noisy.",
    },
    { t: "h", x: "Set quiet hours" },
    {
      t: "p",
      x: "Under Notifications → Quiet hours, pick a window — say 10pm to 7am. Events are still recorded; your phone just stays silent.",
    },
    {
      t: "ul",
      x: [
        "Mute a single device without muting the rest.",
        "Keep security alerts on even during quiet hours.",
        "Choose per-device sounds so you know what is happening without looking.",
      ],
    },
    {
      t: "tip",
      x: "Start with Person alerts only. You can always widen it later if you feel like you are missing things.",
    },
  ],
  a_close_account: [
    {
      t: "p",
      x: "Closing your account removes your devices, recordings, and personal details from Hearth for good. It cannot be undone, so take a moment first.",
    },
    {
      t: "ol",
      x: [
        "Remove each device from your home.",
        "Tap Account → Close account.",
        "Confirm with the code we email you.",
      ],
    },
    {
      t: "warn",
      x: "Closing an account deletes all saved recordings immediately. Download anything you want to keep before you start.",
    },
  ],
  a_track_order: [
    {
      t: "p",
      x: "Every Hearth order gets a tracking link by email the moment it ships. You can also find it in your account.",
    },
    {
      t: "ol",
      x: [
        "Sign in at the Hearth store and open Orders.",
        "Tap the order you are waiting on.",
        "Follow the tracking link for live carrier updates.",
      ],
    },
    {
      t: "tip",
      x: "Orders usually ship within one business day. If it has been longer than two with no tracking email, open a ticket and we will chase it down.",
    },
  ],
  a_return: [
    {
      t: "p",
      x: "Changed your mind or got the wrong thing? You have 30 days from delivery to start a return or exchange, no questions asked.",
    },
    { t: "h", x: "Start a return" },
    {
      t: "ol",
      x: [
        "Open Orders and pick the item.",
        "Tap Return or exchange and choose a reason.",
        "Print the prepaid label we email you.",
        "Drop it at any carrier location within 14 days.",
      ],
    },
    {
      t: "tip",
      x: "Keep the original box if you can — it makes the device much safer in transit and speeds up your refund.",
    },
  ],
  a_warranty: [
    {
      t: "p",
      x: "Every Hearth device comes with a two-year limited warranty that covers defects in materials and workmanship.",
    },
    { t: "h", x: "What it covers" },
    {
      t: "ul",
      x: [
        "Hardware that fails on its own during normal use.",
        "A battery that will no longer hold a reasonable charge.",
        "Buttons, sensors, or lights that stop responding.",
      ],
    },
    { t: "h", x: "What it does not cover" },
    {
      t: "ul",
      x: [
        "Accidental damage, drops, or water past the rated level.",
        "Normal wear like scuffs and scratches.",
        "Loss or theft.",
      ],
    },
    {
      t: "tip",
      x: "Open a ticket with your order number and a short description, and we will sort a repair or replacement.",
    },
  ],
  a_damaged: [
    {
      t: "p",
      x: "If something arrived missing or damaged, we will make it right quickly — this is on us, not you.",
    },
    {
      t: "ol",
      x: [
        "Take a photo of the box and the item if you can.",
        "Open a ticket under Shipping & returns.",
        "Tell us your order number and what is wrong.",
      ],
    },
    {
      t: "tip",
      x: "Photos are optional, but they let us skip a few back-and-forth messages and ship a replacement the same day.",
    },
  ],
};

/* -------------------------------------------------------------- tickets */

export const TOPICS: string[] = [
  "Setup & install",
  "Connectivity",
  "Device behavior",
  "Account & billing",
  "Shipping & returns",
  "Something else",
];

export const ATTACH_POOL: string[] = [
  "router_lights.jpg",
  "error_screen.png",
  "doorbell_back.jpg",
  "setup_step3.png",
];

export const SEEDED_ATTACHMENT = "IMG_2214.jpg";

/** The canned pool for simulated agent replies (verbatim, 4 entries). */
export const AGENT_REPLIES: string[] = [
  "Thanks for the extra detail — that really helps. I’m digging into it now and will follow up with the next step shortly.",
  "Great question! Let me check with our devices team and get right back to you. Appreciate your patience.",
  "Sorry for the trouble here. Could you try restarting the device and let me know if the status light turns solid? That clears this up more often than not.",
  "Got it, thank you. I’ve noted this on your ticket and we’ll keep an eye on it together until it’s fully sorted.",
];

/** First ticket number handed out by the store. Seeded tickets end at 3117. */
export const FIRST_TICKET_NUM = 3118;

export const SEEDED_TICKET_ORDER: string[] = [
  "HH-3117",
  "HH-3114",
  "HH-3109",
  "HH-3102",
];

export const SEEDED_TICKETS: Ticket[] = [
  {
    id: "HH-3117",
    product: "doorbell",
    subject: "Doorbell keeps dropping off Wi-Fi at night",
    status: "open",
    updated: "2h ago",
    rank: 4,
    msgs: [
      {
        who: "customer",
        text: "Our video doorbell keeps going offline every night around 11pm, then comes back by morning. Wi-Fi is fine on everything else. Any ideas?",
        time: "Jul 22, 8:12 PM",
      },
      {
        who: "agent",
        text: "Thanks for the detail, Sam — that timing is a great clue. Overnight is when a lot of devices wake up to update, which can crowd the 2.4 GHz band the doorbell uses. Could you open the doorbell in the app and tell me how many signal bars it shows under Device health?",
        time: "Jul 22, 8:31 PM",
      },
      {
        who: "customer",
        text: "Just two bars, sometimes one. The router is on the far side of the house from the front door.",
        time: "Jul 23, 7:05 AM",
      },
    ],
  },
  {
    id: "HH-3114",
    product: "thermostat",
    subject: "Thermostat won't hold my evening schedule",
    status: "pending",
    updated: "1d ago",
    rank: 3,
    msgs: [
      {
        who: "customer",
        text: "My thermostat keeps forgetting the evening set point. Every night it just stays at the daytime temperature until I fix it by hand.",
        time: "Jul 20, 6:40 PM",
      },
      {
        who: "agent",
        text: "Sorry about that — a schedule that won't stick is annoying. Can you check whether Eco mode is on? When phones leave and return it can briefly override the schedule. It's under Settings → Eco.",
        time: "Jul 20, 7:15 PM",
      },
      {
        who: "customer",
        text: "Eco is off. The evening point is set for 6pm at 70°, but at 6 it just doesn't change.",
        time: "Jul 21, 8:02 AM",
      },
      {
        who: "agent",
        text: "Got it, thank you for checking. That points to the schedule itself rather than Eco. I've passed the details to our devices team and we'll follow up with a fix shortly — really appreciate your patience.",
        time: "Jul 21, 9:14 AM",
      },
    ],
  },
  {
    id: "HH-3109",
    product: "plug",
    subject: "Return label for a smart plug 2-pack",
    status: "solved",
    updated: "3d ago",
    rank: 2,
    msgs: [
      {
        who: "customer",
        text: "I need to return a smart plug 2-pack — bought the wrong region by mistake. How do I get a label?",
        time: "Jul 18, 2:10 PM",
      },
      {
        who: "agent",
        text: "Happy to help! Since it's within 30 days you're all set for a full refund. What's your order number? I'll email a prepaid label right over.",
        time: "Jul 18, 2:22 PM",
      },
      {
        who: "customer",
        text: "It's HH-ORD-88231.",
        time: "Jul 18, 2:40 PM",
      },
      {
        who: "agent",
        text: "Perfect — the label is on its way to your email now. Drop it at any carrier within 14 days and your refund lands 3–5 days after it scans. Anything else I can do?",
        time: "Jul 18, 2:47 PM",
      },
      {
        who: "customer",
        text: "That's everything, thank you!",
        time: "Jul 19, 9:03 AM",
      },
    ],
  },
  {
    id: "HH-3102",
    product: "doorbell",
    subject: "Motion alerts stopped after firmware update",
    status: "closed",
    updated: "2w ago",
    rank: 1,
    msgs: [
      {
        who: "customer",
        text: "After the last firmware update my doorbell stopped sending motion alerts. Live view still works fine.",
        time: "Jul 8, 11:20 AM",
      },
      {
        who: "agent",
        text: "Thanks for flagging this — you're not the only one, and we're on it. As a quick check, can you confirm Person alerts and your motion zones are still turned on under Motion?",
        time: "Jul 8, 11:52 AM",
      },
      {
        who: "customer",
        text: "Zones look fine and Person alerts are on. Still nothing coming through.",
        time: "Jul 8, 1:15 PM",
      },
      {
        who: "agent",
        text: "Appreciated. We shipped a small update this morning that addresses exactly this. Could you go to Settings → About and tap Update now?",
        time: "Jul 9, 9:30 AM",
      },
      {
        who: "customer",
        text: "That did it — alerts are back. Thanks for the quick turnaround.",
        time: "Jul 9, 6:44 PM",
      },
      {
        who: "agent",
        text: "Wonderful, so glad that's sorted! I'll close this out, but reply any time to reopen it if anything comes back.",
        time: "Jul 9, 7:01 PM",
      },
    ],
  },
];

/* --------------------------------------------------------------- orders */

const ORDER_ADDR = ["Sam Ashworth", "24 Ellery Lane, Bristol BS1 4TR"];

export const ORDERS: Order[] = [
  {
    id: "HH-88214",
    email: "sam@example.com",
    placed: "18 Jul 2026",
    status: "transit",
    carrier: "Northline Express",
    tracking: "NL8842197034",
    total: "£208.00",
    addr: ORDER_ADDR,
    items: [
      {
        prod: "thermostat",
        name: "Hearth Thermostat",
        qty: "×1",
        price: "£149.00",
      },
      {
        prod: "sensor",
        name: "Hearth Sensor (2-pack)",
        qty: "×1",
        price: "£59.00",
      },
    ],
    steps: [
      { label: "Order placed", when: "18 Jul, 09:14", st: "done" },
      { label: "Packed in Bristol", when: "18 Jul, 16:02", st: "done" },
      { label: "Picked up by carrier", when: "19 Jul, 07:41", st: "done" },
      { label: "Out for delivery", when: "Expected Tue 28 Jul", st: "current" },
      { label: "Delivered", when: "—", st: "todo" },
    ],
  },
  {
    id: "HH-87109",
    email: "sam@example.com",
    placed: "02 Jun 2026",
    status: "delivered",
    carrier: "Northline Express",
    tracking: "NL8710964220",
    total: "£129.00",
    addr: ORDER_ADDR,
    items: [
      {
        prod: "doorbell",
        name: "Hearth Video Doorbell",
        qty: "×1",
        price: "£129.00",
      },
    ],
    steps: [
      { label: "Order placed", when: "02 Jun, 20:33", st: "done" },
      { label: "Packed in Bristol", when: "03 Jun, 10:15", st: "done" },
      { label: "Picked up by carrier", when: "03 Jun, 18:20", st: "done" },
      { label: "Out for delivery", when: "04 Jun, 08:05", st: "done" },
      {
        label: "Delivered — left with neighbour",
        when: "04 Jun, 13:47",
        st: "done",
      },
    ],
  },
  {
    id: "HH-88790",
    email: "sam@example.com",
    placed: "26 Jul 2026",
    status: "packing",
    carrier: "Northline Express",
    tracking: "Assigned at pickup",
    total: "£78.00",
    addr: ORDER_ADDR,
    items: [
      { prod: "plug", name: "Hearth Smart Plug", qty: "×2", price: "£58.00" },
      { prod: "sensor", name: "Mounting kit", qty: "×1", price: "£20.00" },
    ],
    steps: [
      { label: "Order placed", when: "26 Jul, 21:08", st: "done" },
      { label: "Packing", when: "In progress", st: "current" },
      { label: "Picked up by carrier", when: "Expected 28 Jul", st: "todo" },
      { label: "Out for delivery", when: "—", st: "todo" },
      { label: "Delivered", when: "—", st: "todo" },
    ],
  },
];

/* ----------------------------------------------------------------- forum */

export const FCATS: ForumCategory[] = [
  { id: "all", name: "All" },
  { id: "setup", name: "Setup help" },
  { id: "automations", name: "Automations" },
  { id: "devices", name: "Devices" },
  { id: "ideas", name: "Feature ideas" },
];

/** Chip icons, in FCATS order. */
export const FCAT_ICONS: Record<string, string> = {
  all: "messages-square",
  setup: "wrench",
  automations: "workflow",
  devices: "cpu",
  ideas: "lightbulb",
};

export const THREADS: ForumThread[] = [
  {
    id: "f1",
    cat: "automations",
    pinned: true,
    staff: true,
    solved: false,
    title: "Show us your best Hearth automation — July thread",
    author: "Jo Nkemdi",
    initials: "JN",
    tint: "#4f8bd6",
    time: "2 days ago",
    replies: 64,
    views: "4.1k",
    first:
      "Monthly thread! Post the automation you're proudest of — what it does, which devices it uses, and any gotchas. I'll pull the best ones into the newsletter at the end of the month.",
    answerBy: null,
    answer: null,
  },
  {
    id: "f2",
    cat: "setup",
    pinned: false,
    staff: false,
    solved: true,
    title: "Thermostat pairs but the ring stays blue — fixed it, here's how",
    author: "Rowan H.",
    initials: "RH",
    tint: "#5f9e6b",
    time: "5 hours ago",
    replies: 12,
    views: "840",
    first:
      "Spent an hour on this. The ring stayed blue after entering my Wi-Fi password, then timed out. Turns out my router had band steering on, so the 2.4 GHz network was invisible to the thermostat during setup.",
    answerBy: "Tomas Reis (Hearth)",
    answer:
      "This is the single most common pairing failure we see. Split the bands temporarily, pair the device, then re-enable band steering — once paired the thermostat stays on 2.4 GHz. We're shipping a setup warning for this in the next app update.",
  },
  {
    id: "f3",
    cat: "devices",
    pinned: false,
    staff: false,
    solved: true,
    title: "Best doorbell motion zone setup for a house on a busy road?",
    author: "Mira K.",
    initials: "MK",
    tint: "#8a6fb0",
    time: "yesterday",
    replies: 23,
    views: "1.9k",
    first:
      "I get about forty alerts an hour from passing cars. I've tried lowering sensitivity but then I miss actual people at the door. What zone shapes are working for you?",
    answerBy: "Rowan H.",
    answer:
      "Draw the zone as a narrow wedge covering only your path and doorstep — not the pavement — then turn Person alerts on and everything-else alerts off. Mine went from ~300 a day to about six.",
  },
  {
    id: "f4",
    cat: "ideas",
    pinned: false,
    staff: false,
    solved: false,
    title: "Feature request: per-room Eco schedules in the app",
    author: "Dee Abara",
    initials: "DA",
    tint: "#c0865f",
    time: "3 days ago",
    replies: 41,
    views: "2.6k",
    first:
      "One Eco schedule for the whole house doesn't work for us — the nursery needs to stay warmer overnight than the rest of the house. Would love per-room overrides on the existing schedule screen.",
    answerBy: null,
    answer: null,
  },
  {
    id: "f5",
    cat: "devices",
    pinned: false,
    staff: false,
    solved: true,
    title: "Smart plug clicking every few minutes — normal or faulty?",
    author: "Sanjay P.",
    initials: "SP",
    tint: "#4f8bd6",
    time: "4 days ago",
    replies: 9,
    views: "610",
    first:
      "Newly installed plug in the kitchen makes a faint click roughly every three minutes even with nothing plugged in. Should I be worried?",
    answerBy: "Elin Vasquez (Hearth)",
    answer:
      "A click on the hour or half-hour is the relay checking state and is normal. Every three minutes is not — that's usually a schedule looping. If clearing schedules doesn't settle it, start a ticket and we'll swap it under warranty.",
  },
  {
    id: "f6",
    cat: "setup",
    pinned: false,
    staff: false,
    solved: false,
    title: "Wiring the doorbell into a 1930s chime — anyone done this?",
    author: "Ines Bauer",
    initials: "IB",
    tint: "#b06f8f",
    time: "6 days ago",
    replies: 17,
    views: "1.2k",
    first:
      "Our chime is original to the house and I'd rather keep it. Transformer reads 11V AC. Has anyone wired a Hearth doorbell to an old mechanical chime without the digital adapter?",
    answerBy: null,
    answer: null,
  },
];

export const CONTRIBUTORS: Contributor[] = [
  { name: "Rowan H.", initials: "RH", tint: "#5f9e6b", posts: 412, icon: "trophy" },
  { name: "Tomas Reis", initials: "TR", tint: "#4f8bd6", posts: 268, icon: "badge-check" },
  { name: "Mira K.", initials: "MK", tint: "#8a6fb0", posts: 157, icon: "star" },
  { name: "Sanjay P.", initials: "SP", tint: "#c0865f", posts: 96, icon: "star" },
];

/* -------------------------------------------------------------- warranty */

export const REGISTERED: RegisteredDevice[] = [
  {
    id: "d1",
    prod: "doorbell",
    serial: "HHD-4471-8823",
    purchased: "02 Jun 2026",
    expires: "02 Jun 2029",
    left: "2y 10m left",
    pct: 94,
  },
  {
    id: "d2",
    prod: "thermostat",
    serial: "HHT-1190-4457",
    purchased: "14 Mar 2025",
    expires: "14 Mar 2027",
    left: "7m left",
    pct: 31,
  },
];

export const RETAILERS: string[] = [
  "Hearth online store",
  "Hearth partner installer",
  "John Lewis",
  "Currys",
  "Amazon",
  "Other retailer",
];

export const CLAIM_OUTCOMES: ClaimOutcome[] = [
  {
    id: "repair",
    label: "Repair",
    icon: "wrench",
    note: "Fastest. Usually 5–7 days door to door.",
  },
  {
    id: "replace",
    label: "Replace",
    icon: "package",
    note: "New unit if it can't be fixed economically.",
  },
  {
    id: "refund",
    label: "Refund",
    icon: "banknote",
    note: "Within 6 months of purchase only.",
  },
];

export const CLAIM_PHOTO_POOL: string[] = [
  "fault-back.jpg",
  "serial-plate.jpg",
  "install-photo.jpg",
];

export const SEEDED_CLAIM_PHOTO = "fault-front.jpg";

/* --------------------------------------------------------------- returns */

export const RETURN_REASONS: string[] = [
  "Changed my mind",
  "Doesn't work with my setup",
  "Arrived damaged",
  "Wrong item sent",
  "Bought the wrong model",
  "Not what I expected",
];

export const RETURN_METHODS: ReturnMethod[] = [
  {
    id: "collect",
    label: "Free collection from home",
    icon: "truck",
    note: "Pick a day at checkout. Courier brings the label.",
    done: "A courier will collect between 8am and 6pm on your chosen day.",
  },
  {
    id: "dropoff",
    label: "Drop off at a parcel point",
    icon: "map-pin",
    note: "12,000 shops. Show the QR code, no printer needed.",
    done: "Show the QR code at any parcel point — no printing needed.",
  },
  {
    id: "post",
    label: "Post it yourself",
    icon: "mail",
    note: "Print the label and use any postal service.",
    done: "Print the label and send it whenever suits you.",
  },
];

/** Orders eligible for a return — hard-coded in the comp. */
export const RETURNABLE_ORDERS: string[] = ["HH-87109", "HH-88214"];

/* ---------------------------------------------------------------- repair */

export const REPAIR_ISSUES: string[] = [
  "Won't power on",
  "Keeps dropping off Wi-Fi",
  "Physical damage to the housing",
  "Camera image is faulty",
  "Buttons or dial unresponsive",
  "Something else",
];

export const REPAIR_TYPES: RepairType[] = [
  {
    id: "visit",
    label: "Engineer visit",
    icon: "home",
    note: "We come to you. Best for wired doorbells and thermostats.",
  },
  {
    id: "mailin",
    label: "Mail-in repair",
    icon: "package",
    note: "Free prepaid box. Back with you in about a week.",
  },
  {
    id: "walkin",
    label: "Partner walk-in",
    icon: "store",
    note: "Drop it at an approved shop — 12 across the UK.",
  },
];

export const REPAIR_DATES: RepairDate[] = [
  { id: "d0", dow: "Mon", day: "3 Aug" },
  { id: "d1", dow: "Tue", day: "4 Aug" },
  { id: "d2", dow: "Wed", day: "5 Aug" },
  { id: "d3", dow: "Thu", day: "6 Aug" },
];

export const REPAIR_SLOTS: RepairSlot[] = [
  { label: "09:00 – 11:00", taken: false },
  { label: "11:00 – 13:00", taken: true },
  { label: "14:00 – 16:00", taken: false },
  { label: "16:00 – 18:00", taken: false },
];

export const REPAIR_CONFIRM_LINES: Record<string, string> = {
  visit:
    "An engineer will come to 24 Ellery Lane in the slot below. We'll text you a two-hour window the morning of the visit.",
  mailin:
    "A prepaid box is on its way. Drop the device in and hand it to the courier on your chosen day.",
  walkin:
    "Take the device to your chosen partner shop in the slot below — no need to bring the box.",
};

export const REPAIR_LOCATIONS: Record<string, string> = {
  visit: "24 Ellery Lane, Bristol",
  mailin: "Northline prepaid",
  walkin: "Bristol Broadmead partner",
};

/* ---------------------------------------------------------- appointments */

export const APPOINTMENTS: Appointment[] = [
  {
    id: "AP-2041",
    kind: "Engineer visit",
    prod: "doorbell",
    when: "Tuesday 4 August, 10:00 – 12:00",
    where: "24 Ellery Lane, Bristol",
    status: "confirmed",
    engineer: "Tomas Reis",
    engInitials: "TR",
    engTint: "#4f8bd6",
    engRole: "Hardware engineer",
    past: false,
  },
  {
    id: "AP-1998",
    kind: "Mail-in repair",
    prod: "thermostat",
    when: "Prepaid box sent 21 Jul — due with us Wed 30 Jul",
    where: "Northline prepaid",
    status: "awaiting",
    engineer: null,
    past: false,
  },
  {
    id: "AP-1802",
    kind: "Install visit",
    prod: "thermostat",
    when: "Thursday 12 June, 09:00 – 11:00",
    where: "24 Ellery Lane, Bristol",
    status: "completed",
    engineer: null,
    past: true,
  },
  {
    id: "AP-1655",
    kind: "Partner walk-in",
    prod: "plug",
    when: "Saturday 3 May, 14:30",
    where: "Bristol Broadmead partner",
    status: "completed",
    engineer: null,
    past: true,
  },
];

/* -------------------------------------------------------------- firmware */

export const FIRMWARE: FirmwareRelease[] = [
  {
    ver: "4.8.2",
    date: "22 Jul 2026",
    type: "Stability",
    rolling: true,
    devices: ["doorbell"],
    notes: [
      {
        icon: "wrench",
        text: "Fixes the motion alerts that stopped arriving after a router reboot.",
      },
      {
        icon: "zap",
        text: "Roughly 15% less battery drain when night vision runs for long stretches.",
      },
      {
        icon: "shield",
        text: "Hardened the pairing handshake against replay attempts on open networks.",
      },
    ],
  },
  {
    ver: "3.4.0",
    date: "09 Jul 2026",
    type: "Feature",
    rolling: false,
    devices: ["thermostat"],
    notes: [
      {
        icon: "plus",
        text: "Per-room Eco overrides — the most requested thing on the forum, finally shipped.",
      },
      {
        icon: "wrench",
        text: "Schedules no longer drift by a minute or two after a power cut.",
      },
    ],
  },
  {
    ver: "2.1.7",
    date: "27 Jun 2026",
    type: "Security",
    rolling: false,
    devices: ["plug", "sensor"],
    notes: [
      {
        icon: "shield",
        text: "Updated the TLS stack and rotated the device certificate chain.",
      },
      {
        icon: "wrench",
        text: "Fixed the relay clicking every few minutes when two schedules overlapped.",
      },
    ],
  },
  {
    ver: "4.7.9",
    date: "11 Jun 2026",
    type: "Stability",
    rolling: false,
    devices: ["doorbell"],
    notes: [
      {
        icon: "wrench",
        text: "Chime adapter detection is more reliable on older mechanical chimes.",
      },
      {
        icon: "zap",
        text: "Live view starts about a second faster on 2.4 GHz networks.",
      },
    ],
  },
];

/* ------------------------------------------------------------- downloads */

export const DOWNLOADS: DownloadFile[] = [
  {
    name: "Hearth Thermostat — user manual",
    file: "hearth-thermostat-manual-en.pdf",
    size: "2.4 MB",
    kind: "manual",
    icon: "file-text",
    ver: "Rev. F",
  },
  {
    name: "Hearth Video Doorbell — wiring diagram",
    file: "hearth-doorbell-wiring.pdf",
    size: "1.1 MB",
    kind: "manual",
    icon: "file-text",
    ver: "Rev. C",
  },
  {
    name: "Hearth Smart Plug — quick start card",
    file: "hearth-plug-quickstart.pdf",
    size: "640 KB",
    kind: "manual",
    icon: "file-text",
    ver: "Rev. B",
  },
  {
    name: "Doorbell firmware (manual install)",
    file: "hearth-doorbell-4.8.2.bin",
    size: "8.9 MB",
    kind: "firmware",
    icon: "cpu",
    ver: "v4.8.2",
  },
  {
    name: "Thermostat firmware (manual install)",
    file: "hearth-thermostat-3.4.0.bin",
    size: "6.2 MB",
    kind: "firmware",
    icon: "cpu",
    ver: "v3.4.0",
  },
  {
    name: "Safety & compliance booklet",
    file: "hearth-safety-compliance.pdf",
    size: "3.8 MB",
    kind: "safety",
    icon: "shield-check",
    ver: "2026 ed.",
  },
  {
    name: "Installer toolkit (mounting templates)",
    file: "hearth-installer-toolkit.zip",
    size: "12.4 MB",
    kind: "installer",
    icon: "ruler",
    ver: "2026.2",
  },
  {
    name: "Declaration of conformity (UKCA / CE)",
    file: "hearth-doc-ukca-ce.pdf",
    size: "420 KB",
    kind: "safety",
    icon: "scale",
    ver: "Mar 2026",
  },
];

export const DL_CATS: DownloadCategory[] = [
  { id: "all", name: "Everything", icon: "layers" },
  { id: "manual", name: "Manuals", icon: "file-text" },
  { id: "firmware", name: "Firmware", icon: "cpu" },
  { id: "safety", name: "Safety & legal", icon: "shield-check" },
  { id: "installer", name: "Installers", icon: "ruler" },
];

/* ---------------------------------------------------------------- status */

export const ST_COMPS: StatusComponent[] = [
  { name: "Hearth app", note: "iOS and Android", st: "ok", uptime: "99.99%" },
  {
    name: "Cloud sync",
    note: "Schedules, members, settings",
    st: "ok",
    uptime: "99.97%",
  },
  {
    name: "Video streaming",
    note: "Live view and clip playback",
    st: "degraded",
    uptime: "99.61%",
  },
  {
    name: "Push notifications",
    note: "Motion and doorbell alerts",
    st: "ok",
    uptime: "99.95%",
  },
  {
    name: "Website & help center",
    note: "Store, help desk, community",
    st: "ok",
    uptime: "100.0%",
  },
];

export const ST_UPDATES: StatusUpdate[] = [
  {
    label: "Monitoring",
    time: "27 Jul, 11:40",
    st: "current",
    text: "Playback times are back to normal for most homes. We're watching the queue before we call this resolved.",
  },
  {
    label: "Identified",
    time: "27 Jul, 10:15",
    st: "done",
    text: "A storage node in our EU region is rebuilding, which slows down older clip retrieval. Live view is unaffected.",
  },
  {
    label: "Investigating",
    time: "27 Jul, 09:52",
    st: "done",
    text: "We're looking into reports of clips taking more than ten seconds to open.",
  },
];

export const ST_HISTORY: StatusIncident[] = [
  {
    title: "Push notifications delayed up to 20 minutes",
    date: "14 Jul 2026",
    dur: "1h 12m",
    text: "A misconfigured retry policy backed up the alert queue after a provider failover. Retries are now capped and alerted on.",
  },
  {
    title: "App sign-in failing for new accounts",
    date: "02 Jul 2026",
    dur: "38m",
    text: "A bad deploy to the account service rejected fresh sign-ups. Rolled back within the hour; no data was affected.",
  },
  {
    title: "Scheduled maintenance — cloud sync",
    date: "21 Jun 2026",
    dur: "2h 00m",
    text: "Planned database upgrade. Devices ran on local schedules throughout, as designed.",
  },
];

/** Literal strings the status screen and outage banner render. */
export const ST_CHECKED = "checked 30s ago";
export const ST_OK_SUB =
  "Everything is running normally across app, cloud and website.";
export const ST_DEGRADED_SUB =
  "Clip playback is slower than usual for some homes. Live view, alerts and schedules are unaffected.";
export const OUTAGE_TIME = "updated 11:40";

/* ------------------------------------------------------------- referrals */

export const REFERRALS: Referral[] = [
  {
    name: "Ines Bauer",
    initials: "IB",
    tint: "#b06f8f",
    when: "Joined 12 Jul",
    st: "joined",
    reward: "£20",
  },
  {
    name: "Rowan Hale",
    initials: "RH",
    tint: "#5f9e6b",
    when: "Joined 28 Jun",
    st: "joined",
    reward: "£20",
  },
  {
    name: "Dee Abara",
    initials: "DA",
    tint: "#c0865f",
    when: "Invited 21 Jul",
    st: "invited",
    reward: "Pending",
  },
];

export const REFERRAL_CODE = "SAM-HEARTH-20";
export const REFERRAL_GOAL = 5;
export const REFERRAL_REWARD = 20;
export const REFERRAL_BONUS = 50;

/* --------------------------------------------------------------- tradein */

export const TI_BASE: Record<ProductId, number> = {
  thermostat: 62,
  doorbell: 58,
  plug: 14,
  sensor: 18,
};

export const TI_CONDS: TradeInCondition[] = [
  {
    id: "good",
    label: "Good — works, barely marked",
    note: "Powers on, no cracks, all clips and screws present.",
    f: 1,
  },
  {
    id: "fair",
    label: "Fair — works, visible wear",
    note: "Scuffs or a yellowed faceplate, but fully working.",
    f: 0.7,
  },
  {
    id: "poor",
    label: "Not working",
    note: "Won't power on or has damage. Still worth something to us.",
    f: 0.35,
  },
];

export const TI_AGES: TradeInAge[] = [
  { value: "0", label: "Under a year", f: 1 },
  { value: "1", label: "1 – 2 years", f: 0.85 },
  { value: "2", label: "2 – 4 years", f: 0.65 },
  { value: "4", label: "Over 4 years", f: 0.45 },
];

/* ------------------------------------------------------------ installers */

export const INSTALLERS: Installer[] = [
  {
    name: "Halloway Electrical",
    initials: "HE",
    tint: "#4f8bd6",
    area: "Bedminster",
    distance: "1.2 mi",
    rating: 4.9,
    reviews: 214,
    verified: true,
    next: "Next slot tomorrow, 8am",
    skills: [
      { label: "Doorbell wiring", icon: "bell-ring" },
      { label: "Chime adapters", icon: "zap" },
    ],
  },
  {
    name: "Priya Sandhu Heating",
    initials: "PS",
    tint: "#5f9e6b",
    area: "Clifton",
    distance: "2.6 mi",
    rating: 4.8,
    reviews: 167,
    verified: true,
    next: "Next slot Thu 30 Jul",
    skills: [
      { label: "Thermostats", icon: "thermometer" },
      { label: "Combi boilers", icon: "flame" },
    ],
  },
  {
    name: "Westside Smart Homes",
    initials: "WS",
    tint: "#8a6fb0",
    area: "Southville",
    distance: "3.4 mi",
    rating: 4.7,
    reviews: 98,
    verified: true,
    next: "Next slot Fri 31 Jul",
    skills: [
      { label: "Full-home installs", icon: "home" },
      { label: "Sensors", icon: "radar" },
    ],
  },
  {
    name: "Ellis & Son Electrics",
    initials: "ES",
    tint: "#c0865f",
    area: "Fishponds",
    distance: "4.8 mi",
    rating: 4.6,
    reviews: 53,
    verified: false,
    next: "Next slot Mon 3 Aug",
    skills: [
      { label: "Doorbell wiring", icon: "bell-ring" },
      { label: "Outdoor sockets", icon: "plug-zap" },
    ],
  },
];

/* ----------------------------------------------------------- spare parts */

export const PARTS: Part[] = [
  {
    sku: "HHP-DB-FACE",
    name: "Doorbell faceplate (graphite)",
    price: 12,
    stock: "in",
    fits: ["doorbell"],
    icon: "square",
    cat: "doorbell",
  },
  {
    sku: "HHP-DB-CHIME",
    name: "Digital chime adapter",
    price: 18,
    stock: "in",
    fits: ["doorbell"],
    icon: "zap",
    cat: "doorbell",
  },
  {
    sku: "HHP-DB-WEDGE",
    name: "20° angled mounting wedge",
    price: 8,
    stock: "low",
    fits: ["doorbell"],
    icon: "triangle",
    cat: "doorbell",
  },
  {
    sku: "HHP-TH-DIAL",
    name: "Thermostat dial ring",
    price: 15,
    stock: "in",
    fits: ["thermostat"],
    icon: "circle-dot",
    cat: "thermostat",
  },
  {
    sku: "HHP-TH-PLATE",
    name: "Wall plate + backing kit",
    price: 11,
    stock: "in",
    fits: ["thermostat"],
    icon: "layout-grid",
    cat: "thermostat",
  },
  {
    sku: "HHP-SN-MOUNT",
    name: "Sensor magnetic mount (2-pack)",
    price: 9,
    stock: "in",
    fits: ["sensor"],
    icon: "magnet",
    cat: "sensor",
  },
  {
    sku: "HHP-SN-CELL",
    name: "CR2450 cell (5-pack)",
    price: 6,
    stock: "in",
    fits: ["sensor"],
    icon: "battery",
    cat: "sensor",
  },
  {
    sku: "HHP-PL-SHELL",
    name: "Smart plug outer shell",
    price: 7,
    stock: "out",
    fits: ["plug"],
    icon: "plug-zap",
    cat: "plug",
  },
  {
    sku: "HHP-UN-SCREW",
    name: "Fixings & screwdriver set",
    price: 5,
    stock: "in",
    fits: ["doorbell", "thermostat", "sensor"],
    icon: "wrench",
    cat: "universal",
  },
];

export const PART_CATS: PartCategory[] = [
  { id: "all", name: "All parts" },
  { id: "doorbell", name: "Doorbell" },
  { id: "thermostat", name: "Thermostat" },
  { id: "sensor", name: "Sensor" },
  { id: "plug", name: "Plug" },
  { id: "universal", name: "Universal" },
];

/* --------------------------------------------------- accessibility data */

export const A11Y_SIZES: A11ySize[] = [
  { label: "Default", scale: 1 },
  { label: "Large", scale: 1.12 },
  { label: "Larger", scale: 1.25 },
  { label: "Largest", scale: 1.4 },
];

export const A11Y_PALETTES: A11yPaletteOption[] = [
  { id: "default", name: "Standard" },
  { id: "deuter", name: "Red-green friendly" },
  { id: "mono", name: "Monochrome" },
];

export const A11Y_TOGGLES: A11yToggle[] = [
  {
    id: "contrast",
    label: "Higher contrast",
    note: "Stronger borders and darker body text throughout.",
  },
  {
    id: "motion",
    label: "Reduce motion",
    note: "Turns off screen transitions, card lifts and the typing animation.",
  },
  {
    id: "captions",
    label: "Always caption clips",
    note: "Doorbell and live-view clips play with captions on by default in the app.",
  },
  {
    id: "chime",
    label: "Sound with alerts",
    note: "Plays a short chime with every on-screen confirmation. Try any action once it's on.",
  },
  {
    id: "labels",
    label: "Show text labels on icons",
    note: "Adds a word to icon-only buttons, starting with the header.",
  },
];

export const KB_SUGGEST: string[] = [
  "factory reset",
  "wifi",
  "doorbell offline",
  "return",
  "warranty",
];

/* --------------------------------------------------------------- devices */

export const DEVICES: Device[] = [
  {
    id: "dv1",
    prod: "doorbell",
    name: "Front door",
    room: "Porch",
    st: "ok",
    stats: [
      { icon: "battery", value: "78%", label: "battery" },
      { icon: "wifi", value: "-52 dBm", label: "signal" },
    ],
    last: "Person seen 14 minutes ago",
    toggle: "Motion alerts",
    on: true,
  },
  {
    id: "dv2",
    prod: "thermostat",
    name: "Hallway",
    room: "Ground floor",
    st: "ok",
    stats: [
      { icon: "thermometer", value: "19.5°", label: "now" },
      { icon: "target", value: "20°", label: "target" },
    ],
    last: "Eco mode until 4pm",
    toggle: "Eco mode",
    on: true,
  },
  {
    id: "dv3",
    prod: "plug",
    name: "Kitchen lamp",
    room: "Kitchen",
    st: "ok",
    stats: [
      { icon: "zap", value: "12 W", label: "draw" },
      { icon: "clock", value: "6h", label: "on today" },
    ],
    last: "Scheduled off at 11pm",
    toggle: "Power",
    on: true,
  },
  {
    id: "dv4",
    prod: "sensor",
    name: "Back door",
    room: "Utility",
    st: "low",
    stats: [
      { icon: "battery", value: "11%", label: "battery" },
      { icon: "wifi", value: "-71 dBm", label: "signal" },
    ],
    last: "Opened 2 hours ago",
    toggle: "Armed",
    on: true,
  },
  {
    id: "dv5",
    prod: "plug",
    name: "Garage heater",
    room: "Garage",
    st: "off",
    stats: [
      { icon: "zap", value: "0 W", label: "draw" },
      { icon: "wifi", value: "—", label: "signal" },
    ],
    last: "Offline since Thursday",
    toggle: "Power",
    on: false,
  },
];

export const HOUSEHOLD_NAME = "Ellery Lane";

/* ---------------------------------------------------------------- energy */

export const ENERGY: EnergyData = {
  week: {
    title: "This week, by day",
    bars: [
      ["Mon", 7.4],
      ["Tue", 8.1],
      ["Wed", 6.9],
      ["Thu", 9.2],
      ["Fri", 8.8],
      ["Sat", 11.4],
      ["Sun", 10.2],
    ],
    kpis: [
      ["£14.80", "Spend", "wallet", "12% less than last week", "trending-down"],
      ["62.0 kWh", "Used", "zap", "8% less", "trending-down"],
      ["4.2 kg", "CO₂ avoided", "leaf", "best week yet", "trending-up"],
    ],
  },
  month: {
    title: "This month, by week",
    bars: [
      ["W1", 58.2],
      ["W2", 61.4],
      ["W3", 54.9],
      ["W4", 49.7],
    ],
    kpis: [
      ["£54.20", "Spend", "wallet", "19% less than June", "trending-down"],
      ["224 kWh", "Used", "zap", "14% less", "trending-down"],
      ["18.6 kg", "CO₂ avoided", "leaf", "up 3 kg", "trending-up"],
    ],
  },
  year: {
    title: "This year, by month",
    bars: [
      ["Jan", 412],
      ["Feb", 388],
      ["Mar", 311],
      ["Apr", 248],
      ["May", 196],
      ["Jun", 241],
      ["Jul", 224],
    ],
    kpis: [
      ["£486", "Spend", "wallet", "£112 under forecast", "trending-down"],
      ["2,020 kWh", "Used", "zap", "11% less than 2025", "trending-down"],
      ["164 kg", "CO₂ avoided", "leaf", "on track", "trending-up"],
    ],
  },
};

export const ENERGY_ROOMS: EnergyRoom[] = [
  ["Ground floor heating", 48],
  ["Hot water", 26],
  ["Kitchen sockets", 14],
  ["Garage", 12],
];

export const ENERGY_TIPS: EnergyTip[] = [
  {
    icon: "clock",
    text: "Your heating comes on at 5:30am but nobody's up until 6:45. Shifting the schedule keeps the same comfort.",
    saving: "saves about £4.10 a month",
  },
  {
    icon: "thermometer",
    text: "Dropping the hallway target by half a degree is usually imperceptible in a house this size.",
    saving: "saves about £2.60 a month",
  },
  {
    icon: "plug-zap",
    text: "The garage heater drew power for 40 hours last month while the door was open.",
    saving: "saves about £6.80 a month",
  },
];

/* ------------------------------------------------------------------ tour */

export const TOUR: TourStep[] = [
  {
    eyebrow: "STEP 1 OF 4",
    title: "Welcome to Hearth",
    icon: "life-buoy",
    file: "tour-welcome.png",
    tint: "#4f8bd6",
    body: "A two-minute tour of the things people ask us about most. You can leave at any point — nothing here changes your setup.",
    points: [
      "Every device you own lives in one app",
      "Support is a person, not a phone tree",
      "Nothing you see here needs an account",
    ],
  },
  {
    eyebrow: "STEP 2 OF 4",
    title: "Add your first device",
    icon: "plus-circle",
    file: "tour-add-device.png",
    tint: "#5f9e6b",
    body: "Open the app, tap the plus in the corner, and pick your device type. The app walks you through pairing one screen at a time.",
    points: [
      "Have your Wi-Fi password to hand",
      "Stand near the router while pairing",
      "Hearth devices use 2.4 GHz for range",
    ],
  },
  {
    eyebrow: "STEP 3 OF 4",
    title: "Set it and forget it",
    icon: "calendar-clock",
    file: "tour-schedules.png",
    tint: "#8a6fb0",
    body: "Schedules and Eco mode do the thinking. Set the hours you're usually home and Hearth eases off when you're out.",
    points: [
      "Warm the house before you get in",
      "Motion zones ignore the pavement",
      "Quiet hours mute non-urgent alerts",
    ],
  },
  {
    eyebrow: "STEP 4 OF 4",
    title: "When you need us",
    icon: "messages-square",
    file: "tour-support.png",
    tint: "#c0865f",
    body: "Search the help center first — most answers are two minutes of reading. If not, chat or a ticket both reach the same team.",
    points: [
      "Median first reply under two hours",
      "Chat can turn into a ticket, transcript included",
      "Warranty claims are handled in-house",
    ],
  },
];

/* --------------------------------------------------------------- bundles */

export const BUNDLES: Bundle[] = [
  {
    id: "starter",
    name: "Starter",
    save: "£20",
    now: 199,
    was: 219,
    blurb: "The two devices most people begin with, ready to grow.",
    items: [
      { prod: "doorbell", name: "Hearth Video Doorbell", qty: "×1" },
      { prod: "plug", name: "Hearth Smart Plug", qty: "×2" },
    ],
  },
  {
    id: "security",
    name: "Security",
    save: "£45",
    now: 289,
    was: 334,
    blurb: "Cover the doors and know the second something moves.",
    items: [
      { prod: "doorbell", name: "Hearth Video Doorbell", qty: "×1" },
      { prod: "sensor", name: "Hearth Sensor", qty: "×4" },
      { prod: "plug", name: "Hearth Smart Plug", qty: "×1" },
    ],
  },
  {
    id: "whole",
    name: "Whole home",
    save: "£80",
    now: 429,
    was: 509,
    blurb: "Heating, entry and power for a three-bed house.",
    items: [
      { prod: "thermostat", name: "Hearth Thermostat", qty: "×1" },
      { prod: "doorbell", name: "Hearth Video Doorbell", qty: "×1" },
      { prod: "sensor", name: "Hearth Sensor", qty: "×4" },
      { prod: "plug", name: "Hearth Smart Plug", qty: "×2" },
    ],
  },
];

export const BYO_PRICES: Record<ProductId, number> = {
  thermostat: 149,
  doorbell: 129,
  plug: 29,
  sensor: 34,
};

/* --------------------------------------------------------------- members */

export const MEMBERS: Member[] = [
  {
    id: "m1",
    name: "Sam Ashworth",
    initials: "SA",
    tint: "#5f9e6b",
    role: "owner",
    meta: "sam@example.com · added Jun 2025",
    perms: [
      ["All devices", "cpu"],
      ["Billing", "credit-card"],
      ["Clip history", "video"],
    ],
  },
  {
    id: "m2",
    name: "Nadia Ashworth",
    initials: "NA",
    tint: "#4f8bd6",
    role: "adult",
    meta: "nadia@example.com · added Jun 2025",
    perms: [
      ["All devices", "cpu"],
      ["Clip history", "video"],
    ],
  },
  {
    id: "m3",
    name: "Theo Ashworth",
    initials: "TA",
    tint: "#8a6fb0",
    role: "adult",
    meta: "theo@example.com · added Mar 2026",
    perms: [["All devices", "cpu"]],
  },
  {
    id: "m4",
    name: "Dog walker (Priya)",
    initials: "DW",
    tint: "#c0865f",
    role: "guest",
    meta: "invite pending · expires in 5 days",
    perms: [
      ["Front door only", "door-open"],
      ["9am – 5pm", "clock"],
    ],
  },
];

/* --------------------------------------------------------- notifications */

export const NOTIFS: Notification[] = [
  {
    id: "n1",
    day: "Today",
    cat: "device",
    icon: "bell-ring",
    title: "Person at the front door",
    text: "A clip is waiting in the app — 6 seconds.",
    time: "14:12",
    unread: true,
  },
  {
    id: "n2",
    day: "Today",
    cat: "ticket",
    icon: "ticket",
    title: "Maya replied to HH-3117",
    text: '"Could you check the Wi-Fi band in Settings → About?"',
    time: "11:48",
    unread: true,
  },
  {
    id: "n3",
    day: "Today",
    cat: "device",
    icon: "battery-low",
    title: "Back door sensor battery low",
    text: "11% left — about a week of normal use.",
    time: "09:03",
    unread: false,
  },
  {
    id: "n4",
    day: "Yesterday",
    cat: "order",
    icon: "truck",
    title: "Order HH-88214 is out for delivery",
    text: "Northline expects to arrive before 6pm.",
    time: "08:20",
    unread: false,
  },
  {
    id: "n5",
    day: "Yesterday",
    cat: "system",
    icon: "cpu",
    title: "Firmware 4.8.2 installed",
    text: "Front door updated overnight. Nothing for you to do.",
    time: "03:41",
    unread: false,
  },
  {
    id: "n6",
    day: "Yesterday",
    cat: "device",
    icon: "door-open",
    title: "Back door opened",
    text: "While the house was in Away mode.",
    time: "19:26",
    unread: false,
  },
  {
    id: "n7",
    day: "Earlier this week",
    cat: "system",
    icon: "alert-triangle",
    title: "Video playback was slow",
    text: "We fixed a storage issue affecting clip retrieval.",
    time: "Fri 10:15",
    unread: false,
  },
  {
    id: "n8",
    day: "Earlier this week",
    cat: "order",
    icon: "package-check",
    title: "Spare part delivered",
    text: "Digital chime adapter, left with a neighbour.",
    time: "Thu 13:47",
    unread: false,
  },
  {
    id: "n9",
    day: "Earlier this week",
    cat: "ticket",
    icon: "check-circle-2",
    title: "HH-3109 marked solved",
    text: "Motion alerts are working again after the update.",
    time: "Wed 19:01",
    unread: false,
  },
];

export const NT_CATS: NotifCategory[] = [
  { id: "all", name: "Everything", icon: "layers" },
  { id: "device", name: "Devices", icon: "cpu" },
  { id: "ticket", name: "Support", icon: "ticket" },
  { id: "order", name: "Orders", icon: "package" },
  { id: "system", name: "System", icon: "settings" },
];

/* --------------------------------------------------------------- partner */

export const PT_JOBS: PartnerJob[] = [
  {
    id: "j1",
    prod: "doorbell",
    title: "Doorbell install, wired",
    detail:
      "Victorian terrace, existing chime, customer has the transformer spec.",
    meta: "BS3 · 1.4 mi · requested for Tue 4 Aug, morning",
    fee: "£95",
    pay: "warranty",
  },
  {
    id: "j2",
    prod: "thermostat",
    title: "Thermostat swap",
    detail: "Replacing a 12-year-old dial stat on a combi system.",
    meta: "BS8 · 2.9 mi · flexible, this week",
    fee: "£120",
    pay: "customer",
  },
  {
    id: "j3",
    prod: "sensor",
    title: "Four sensors, first-floor windows",
    detail: "New build, no drilling needed — adhesive mounts.",
    meta: "BS1 · 0.8 mi · Fri 31 Jul, afternoon",
    fee: "£65",
    pay: "customer",
  },
  {
    id: "j4",
    prod: "doorbell",
    title: "Doorbell diagnostic",
    detail: "Unit drops off Wi-Fi nightly; support suspects the chime adapter.",
    meta: "BS16 · 4.6 mi · any time next week",
    fee: "£55",
    pay: "warranty",
  },
];

export const PT_LINKS: PartnerLink[] = [
  ["Install guides and torque specs", "book-open"],
  ["Order trade stock", "package"],
  ["Warranty claim form", "file-check"],
  ["Brand and signage kit", "palette"],
];

export const PARTNER = {
  name: "Halloway Electrical",
  initials: "HE",
  meta: "partner #4471 · Bristol & Bath · tier Gold",
  rating: "4.9",
  reviewsNote: "214 customer reviews",
  payout: "£1,840",
  payoutDue: "due Fri 31 Jul",
  response: "42 min",
  responseNote: "median, last 30 days",
  jobsBase: 18,
  training: 72,
  payoutBlurb:
    "£1,840 across 9 completed jobs, paid Friday by bank transfer. Warranty work is settled weekly, customer-paid work on completion.",
  supportLine: "Partner line: +44 117 496 0180",
};

/* ------------------------------------------------------------ gift cards */

export const GIFT_DESIGNS: GiftDesign[] = [
  { id: "classic", name: "Classic", icon: "gift", tint: "#4f8bd6" },
  { id: "birthday", name: "Birthday", icon: "cake", tint: "#b06f8f" },
  { id: "newhome", name: "New home", icon: "home", tint: "#5f9e6b" },
  { id: "thanks", name: "Thank you", icon: "heart", tint: "#c0865f" },
];

export const GIFT_AMOUNTS: number[] = [25, 50, 75, 100];

/** Gift-code prefix. */
export const GIFT_CODE_PREFIX = "HEARTH-";

/* ------------------------------------------------------------------ plans */

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Hearth Free",
    mo: 0,
    popular: false,
    blurb: "Everything the hardware can do on its own, forever.",
    features: [
      ["check", "Live view and instant alerts", true],
      ["check", "Schedules and automations", true],
      ["check", "Local recording to the base", true],
      ["x", "No cloud clip history", false],
      ["x", "Standard support queue", false],
    ],
  },
  {
    id: "plus",
    name: "Hearth Plus",
    mo: 3.99,
    popular: true,
    blurb: "Cloud history and a faster route to a human.",
    features: [
      ["check", "Everything in Free", true],
      ["check", "30 days of cloud clip history", true],
      ["check", "Person and parcel detection", true],
      ["check", "Priority support, under 1 hour", true],
      ["x", "No out-of-warranty repair cover", false],
    ],
  },
  {
    id: "family",
    name: "Hearth Family",
    mo: 7.99,
    popular: false,
    blurb: "Unlimited devices, longer history, repairs covered.",
    features: [
      ["check", "Everything in Plus", true],
      ["check", "90 days of cloud clip history", true],
      ["check", "Unlimited devices and members", true],
      ["check", "One free repair a year, any age", true],
      ["check", "Named support contact", true],
    ],
  },
];

export const PLAN_BILLING_SUFFIX = "· Visa ending 4417 · next charge 12 Aug 2026";
export const PLAN_ANNUAL_LABEL = "Annual · 2 months free";

/* -------------------------------------------------------------- security */

export const SESSIONS: Session[] = [
  {
    id: "s1",
    device: "iPhone 15 — Hearth app",
    icon: "smartphone",
    where: "Bristol, UK",
    when: "active now",
    current: true,
  },
  {
    id: "s2",
    device: "MacBook Air — Safari",
    icon: "laptop",
    where: "Bristol, UK",
    when: "2 hours ago",
    current: false,
  },
  {
    id: "s3",
    device: "iPad — Hearth app",
    icon: "tablet",
    where: "Bristol, UK",
    when: "yesterday",
    current: false,
  },
  {
    id: "s4",
    device: "Chrome on Windows",
    icon: "monitor",
    where: "Manchester, UK",
    when: "6 days ago",
    current: false,
  },
];

export const SEC_TOGGLES: SecurityToggle[] = [
  {
    id: "twofa",
    label: "Two-factor authentication",
    note: "A six-digit code from your authenticator app on every new sign-in.",
    rec: true,
  },
  {
    id: "alerts",
    label: "Alert me about new sign-ins",
    note: "An email whenever your account is used on a device we haven't seen.",
    rec: false,
  },
  {
    id: "analytics",
    label: "Share anonymous usage data",
    note: "Helps us find crashes. Never includes clips, audio or addresses.",
    rec: false,
  },
  {
    id: "tips",
    label: "Personalised tips",
    note: "Uses which devices you own to pick which articles to suggest.",
    rec: false,
  },
];

export const SEC_RETAIN: RetentionOption[] = [
  { id: "7", label: "7 days" },
  { id: "30", label: "30 days" },
  { id: "90", label: "90 days" },
  { id: "off", label: "Don't store clips" },
];

export const SEC_PASSWORD_LINE = "Last changed 14 March 2026 · strong";

/* ---------------------------------------------------------------- survey */

export const SURVEY_ROWS: SurveyRow[] = [
  { id: "ease", label: "Finding what you needed" },
  { id: "speed", label: "How quickly we replied" },
  { id: "tone", label: "How we spoke to you" },
];

export const SURVEY_SCALE: SurveyScalePoint[] = [
  { v: 1, icon: "frown", title: "Poor" },
  { v: 2, icon: "meh", title: "Below average" },
  { v: 3, icon: "smile", title: "Fine" },
  { v: 4, icon: "thumbs-up", title: "Good" },
  { v: 5, icon: "star", title: "Excellent" },
];

export const SURVEY_TAGS: string[] = [
  "Search results",
  "Article detail",
  "Reply speed",
  "Chat handover",
  "Order tracking",
  "Returns",
  "App reliability",
  "Pricing clarity",
];

export const SURVEY_THANKS_HIGH =
  "That means a lot. We read every response on Monday mornings — if you left a note, it's already in the queue.";
export const SURVEY_THANKS_LOW =
  "We read every response on Monday mornings, and the low scores first. If you asked us to email you, we will.";

/* ------------------------------------------------------------------ chat */

export const CHAT_GREETING: ChatMessage = {
  id: 1,
  who: "bot",
  text: "Hi — Maya here from Hearth. What can I help with today?",
};

export const CHAT_QUICK: ChatQuickReply[] = [
  {
    label: "My doorbell keeps going offline",
    reply:
      "That’s nearly always Wi-Fi signal rather than a fault — the doorbell sits on the far side of a wall from most routers. Try the signal check in the app first, then the guide below.",
    act: "article:a_doorbell_wifi",
    actLabel: "Read the Wi-Fi guide",
    actIcon: "book-open",
  },
  {
    label: "Where is my order?",
    reply:
      "I can check that in a second — you’ll need your order number and the email you ordered with. The lookup page shows live carrier scans.",
    act: "orders",
    actLabel: "Open order lookup",
    actIcon: "package-search",
  },
  {
    label: "I’d like to return something",
    reply:
      "No problem. Returns are free within 30 days and we email you a prepaid label — you don’t need the original box, just something sturdy.",
    act: "article:a_return",
    actLabel: "Start a return",
    actIcon: "arrow-left-right",
  },
  {
    label: "Can I talk to a person?",
    reply:
      "Of course — I’m Maya, and I’m here. If it’s something we’ll need photos or logs for, I can move this chat into a ticket — everything we’ve said comes with it and you’ll get email updates.",
    act: "escalate",
    actLabel: "Move this chat to a ticket",
    actIcon: "ticket",
  },
];

export const CHAT_REPLIES: string[] = [
  "Got it — thanks. Which device is this about, and roughly when did it start?",
  "That helps. Can you tell me what the status light is doing right now? Solid, blinking, or off?",
  "Understood. I’ve made a note on your account. If it needs a hardware swap we can arrange that from here — nothing to pay.",
  "Thanks for bearing with me. I’d like to get this into a ticket so an engineer can look at your device logs properly.",
];

export const CHAT_ESCALATION_CLOSER =
  "I've moved our chat into this ticket so nothing gets lost — the whole conversation is above. You'll get an email whenever there's an update, and anything you add here comes straight to me.";

/* -------------------------------------------------------------- overview */

export const OV_GROUPS: OverviewGroup[] = [
  {
    name: "Help & content",
    items: [
      ["home", "Home", "life-buoy", "Search hero, category tiles and popular articles."],
      ["saved", "Saved articles", "bookmark", "Bookmarked guides, with a real empty state."],
      ["tour", "Onboarding tour", "presentation", "Four guided steps with dots, back and skip."],
      ["kb", "Search results", "search", "Faceted results, sorting, and a real empty state."],
      ["category", "Category", "wrench", "Every article in one category, with counts."],
      ["article", "Article", "file-text", "Long-form guide with steps, tips and warnings."],
      ["404", "Not found", "compass", "The friendly dead end, with a way back."],
    ],
  },
  {
    name: "Tickets & conversation",
    items: [
      ["newticket", "New ticket", "pen-line", "Product picker, topic, attachments, validation."],
      ["mytickets", "My tickets", "ticket", "Email lookup and a list of open and past tickets."],
      ["thread", "Ticket thread", "messages-square", "Status timeline, replies, and a simulated agent."],
      ["chat", "Live chat", "message-circle", "Floating widget that escalates into a real ticket."],
      ["contact", "Contact us", "mail", "Four channels, offices, and a short note form."],
    ],
  },
  {
    name: "Orders & returns",
    items: [
      ["orders", "Order status", "package-search", "Lookup with validation and a carrier timeline."],
      ["returns", "Returns wizard", "arrow-left-right", "Three steps to an RMA code and a prepaid label."],
      ["tradein", "Trade-in valuation", "banknote", "Live quote from device, condition and age."],
    ],
  },
  {
    name: "Service & repair",
    items: [
      ["warranty", "Warranty registration", "shield-check", "Register a device and see remaining cover."],
      ["claim", "Warranty claim", "file-check", "Fault details, preferred outcome, claim reference."],
      ["repair", "Repair booking", "wrench", "Service type, day and slot, with a real booking."],
      ["appts", "Service appointments", "calendar", "Upcoming visits, reschedule, cancel, history."],
      ["installers", "Installer finder", "map-pin", "Approved installers by postcode and radius."],
    ],
  },
  {
    name: "Shop",
    items: [
      ["parts", "Spare parts", "box", "Stock states, quantity steppers and a live basket."],
      ["bundles", "Bundle deals", "boxes", "Three bundles plus a build-your-own discount."],
      ["gift", "Gift cards", "gift", "Design, amount and message with a live card preview."],
      ["plans", "Subscription plans", "layers", "Hearth Care tiers with monthly / annual pricing."],
      ["refer", "Refer a friend", "users", "Referral code, progress, and email invites."],
    ],
  },
  {
    name: "Resources",
    items: [
      ["downloads", "Downloads & manuals", "download", "Manuals, firmware files and installer tools."],
      ["firmware", "Firmware release notes", "cpu", "Versioned notes filtered by device."],
      ["status", "Service status", "activity", "Component health, live incident, past incidents."],
      ["a11y", "Accessibility settings", "accessibility", "Display size, contrast, motion and palette — all live."],
      ["security", "Security & privacy", "lock", "Two-factor, sessions, clip retention, data export."],
      ["survey", "Feedback survey", "clipboard-check", "NPS, rating scales and a thank-you state."],
    ],
  },
  {
    name: "Your home",
    items: [
      ["devices", "Device dashboard", "cpu", "Five devices with live stats and working toggles."],
      ["energy", "Energy insights", "leaf", "Bar chart, room split and tips, by week/month/year."],
      ["members", "Household members", "users", "Roles, permissions, invites and removal."],
      ["notifs", "Notifications history", "bell", "Grouped by day, filterable, unread tracking."],
    ],
  },
  {
    name: "Company",
    items: [
      ["partner", "Partner portal", "hard-hat", "Installer view: KPIs, job queue, certification."],
      ["forum", "Community forum", "users", "Threads that expand to show accepted answers."],
      ["about", "About us", "building-2", "Story, numbers, values and the support team."],
      ["imprint", "Imprint", "scale", "Company details and legal notices."],
    ],
  },
];

/** 39 — the overview lede renders this. */
export const OV_COUNT = OV_GROUPS.reduce((n, g) => n + g.items.length, 0);

/* ---------------------------------------------------------------- chrome */

export const FOOTER_URL = "adminium.dev/demo/support-desk";
export const FOOTER_COPYRIGHT =
  "© 2026 Hearth. A demo support portal shipped with Adminium.";
