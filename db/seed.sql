-- Support Desk — seed data.
--
-- Mirrors src/data/demo.ts exactly: the same 4 products, 5 KB categories, 20
-- articles (with their block-DSL bodies), 4 tickets with all 18 messages, and 3
-- orders with their line items and fulfilment timelines. The portal demo data
-- and this seed MUST stay in sync so the frontend and the auto-generated
-- Adminium dashboard show one desk.
--
-- Ids are assigned explicitly for readable foreign-key references; the serial
-- sequences are advanced at the end so future inserts continue cleanly.
--
-- Article bodies are dollar-quoted so the JSON needs no escaping.

-- Agents --------------------------------------------------------------------

INSERT INTO agents (id, name, full_name, email, initials, tint, active) VALUES
  (1, 'Maya', 'Maya from Hearth', 'maya@hearth.example', 'MA', '#4f8bd6', true);

-- Customers -----------------------------------------------------------------

INSERT INTO customers (id, name, email, initials, tint, address) VALUES
  (1, 'Sam Ashworth', 'sam@example.com', 'SA', '#5f9e6b', '24 Ellery Lane, Bristol BS1 4TR');

-- Products ------------------------------------------------------------------

INSERT INTO products (id, code, name, model, icon, tint) VALUES
  (1, 'thermostat', 'Thermostat',    'Hearth Thermostat', 'thermometer', '#d0703f'),
  (2, 'doorbell',   'Video Doorbell','Hearth Doorbell',   'bell-ring',   '#4f8bd6'),
  (3, 'plug',       'Smart Plug',    'Hearth Plug',       'plug-zap',    '#5f9e6b'),
  (4, 'sensor',     'Sensor',        'Hearth Sensor',     'radar',       '#8a6fb0');

-- Knowledge-base categories -------------------------------------------------

INSERT INTO kb_categories (id, slug, name, icon, tint, blurb, position) VALUES
  (1, 'setup',    'Setup & install',    'wrench',       '#4f8bd6', 'Get a new device out of the box and onto your network.', 1),
  (2, 'connect',  'Connectivity',       'wifi',         '#3f9e78', 'Wi-Fi trouble, offline devices, and network changes.',   2),
  (3, 'devices',  'Devices',            'cpu',          '#8a6fb0', 'Schedules, motion zones, firmware, and resets.',         3),
  (4, 'account',  'Account',            'circle-user',  '#c0865f', 'Login, household members, and notifications.',           4),
  (5, 'shipping', 'Shipping & returns', 'truck',        '#b06f8f', 'Orders, returns, warranty, and damaged items.',          5);

-- Knowledge-base articles (4 per category, 20 total) -------------------------

INSERT INTO kb_articles (id, slug, category_id, title, snippet, read_minutes, position, updated_at, body) VALUES
  (1, 'a_setup_account', 1, 'Set up your Hearth account and app',
   'Create your account, then add every device from one place.', 3, 1, '2026-05-12 09:00:00+00', $json$[
    {"t":"p","x":"The whole Hearth system runs through one free app. Set up your account first, then every device you add lives in the same place."},
    {"t":"h","x":"Create your account"},
    {"t":"ol","x":["Download the Hearth app from the App Store or Google Play.","Tap Create account and enter your email.","Enter the six-digit code we email you.","Set a password and give your home a name."]},
    {"t":"h","x":"Add your first device"},
    {"t":"p","x":"On the home screen, tap the + in the top corner and pick your device type. The app walks you through the rest, one screen at a time."},
    {"t":"tip","x":"Use an email you check often — order updates, security alerts, and this help desk all use the same address."}
  ]$json$),

  (2, 'a_pair_thermostat', 1, 'Pairing the thermostat with the app',
   'Five minutes, your Wi-Fi password, and a phone nearby.', 4, 2, '2026-05-19 09:00:00+00', $json$[
    {"t":"p","x":"Pairing takes about five minutes. Have your Wi-Fi password handy and keep your phone within a few feet of the thermostat."},
    {"t":"ol","x":["In the app, tap + then Thermostat.","Press and hold the dial until the ring turns blue.","Choose your 2.4 GHz Wi-Fi network and enter the password.","Wait for the ring to turn solid green — that means it is online."]},
    {"t":"h","x":"If pairing stalls"},
    {"t":"ul","x":["Make sure Bluetooth is on for the setup step.","Stand closer to your router while pairing.","If the ring never turns blue, hold the dial for 15 seconds to restart it."]},
    {"t":"tip","x":"The thermostat only joins 2.4 GHz networks. If your router hides the band names, see “Which Wi-Fi bands Hearth devices support.”"}
  ]$json$),

  (3, 'a_mount_doorbell', 1, 'Mount and wire the video doorbell',
   'Run it on battery, or wire it in so it never needs charging.', 6, 3, '2026-06-02 09:00:00+00', $json$[
    {"t":"p","x":"The doorbell can run on its battery or on your existing doorbell wires. Wiring keeps it charged so you never have to take it down."},
    {"t":"warn","x":"Turn off power to your doorbell at the breaker before you touch any wires. This is the one step you should not skip."},
    {"t":"h","x":"Mount it"},
    {"t":"ol","x":["Turn off power at the breaker.","Loosen your old doorbell and disconnect the two wires.","Screw the Hearth base plate to the wall or bracket.","Connect the two wires to the base plate screws — either wire on either screw is fine.","Click the doorbell onto the plate and turn the power back on."]},
    {"t":"tip","x":"No existing wires? Skip wiring entirely and top up the doorbell with the included USB-C cable every couple of months."}
  ]$json$),

  (4, 'a_add_plug', 1, 'Add a smart plug to a room',
   'The quickest device to add — usually under a minute.', 2, 4, '2026-06-09 09:00:00+00', $json$[
    {"t":"p","x":"A smart plug is the quickest device to add — most people are done in under a minute."},
    {"t":"ol","x":["Plug it into any outlet.","In the app, tap + then Smart Plug.","When the plug’s light blinks, confirm your Wi-Fi network.","Name it for the room or the thing it controls, like “Living room lamp.”"]},
    {"t":"tip","x":"Naming the plug after what it controls makes voice commands and schedules much easier to remember later."}
  ]$json$),

  (5, 'a_doorbell_wifi', 2, 'Doorbell won''t hold a Wi-Fi connection',
   'Keeps dropping? It''s almost always signal, not a fault.', 5, 1, '2026-07-14 09:00:00+00', $json$[
    {"t":"p","x":"A doorbell that keeps dropping off Wi-Fi is almost always a signal problem, not a broken device. Here is how to steady the connection."},
    {"t":"h","x":"Check the signal first"},
    {"t":"p","x":"Open the doorbell in the app and tap Device health. Anything below two bars at the door will drop out, especially at night when more devices are awake."},
    {"t":"h","x":"What usually fixes it"},
    {"t":"ol","x":["Move your router or add a mesh point closer to the front door.","Make sure the doorbell is on the 2.4 GHz network, which reaches farther than 5 GHz.","Restart the doorbell from Settings → Restart device.","If it still drops, re-pair it so it picks the strongest band."]},
    {"t":"tip","x":"Thick doors, brick, and metal screens all cut signal. A mesh point one room from the door does more than any in-app setting."}
  ]$json$),

  (6, 'a_wifi_bands', 2, 'Which Wi-Fi bands Hearth devices support',
   'Hearth devices use 2.4 GHz for range — here''s why.', 3, 2, '2026-06-16 09:00:00+00', $json$[
    {"t":"p","x":"All Hearth devices connect over 2.4 GHz Wi-Fi. It is slower than 5 GHz but reaches much farther and passes through walls better — exactly what a doorbell or sensor needs."},
    {"t":"h","x":"If your networks share one name"},
    {"t":"p","x":"Many modern routers broadcast both bands under a single name and pick one for you. That is usually fine. If a device refuses to pair, split the bands temporarily or make a guest network on 2.4 GHz just for setup."},
    {"t":"tip","x":"Once a device is paired it stays on 2.4 GHz on its own. You only need to think about bands during setup."}
  ]$json$),

  (7, 'a_move_network', 2, 'Move a device to a new Wi-Fi network',
   'New router or password? Point each device at the new network.', 3, 3, '2026-06-23 09:00:00+00', $json$[
    {"t":"p","x":"Changing routers or Wi-Fi passwords? Each device needs to be pointed at the new network. There is no bulk switch, but it only takes a minute per device."},
    {"t":"ol","x":["Open the device in the app.","Tap Settings → Wi-Fi.","Choose the new network and enter the password.","Wait for the status light to turn solid."]},
    {"t":"warn","x":"If you have already returned the old router, you will need to reset each device and add it fresh, since it can no longer reach the old network to hand off."}
  ]$json$),

  (8, 'a_offline', 2, 'Fix a device that shows offline',
   'An "offline" label usually clears itself — here''s how to help.', 4, 4, '2026-07-07 09:00:00+00', $json$[
    {"t":"p","x":"An “Offline” label means the device cannot reach the Hearth servers right now. Nine times out of ten it comes back on its own; here is how to help it along."},
    {"t":"ol","x":["Check that your internet is up on another device.","Restart the Hearth device — unplug it or use Settings → Restart.","Restart your router if more than one device is offline.","Give it two full minutes to reconnect before trying anything else."]},
    {"t":"tip","x":"If only one device is offline, the problem is usually signal at that spot. If everything is offline at once, it is your router or internet."}
  ]$json$),

  (9, 'a_thermo_schedule', 3, 'Thermostat schedules and Eco mode',
   'Warm up before you''re home, ease off when you''re out.', 4, 1, '2026-05-26 09:00:00+00', $json$[
    {"t":"p","x":"Schedules let the thermostat warm up or cool down before you need it, then ease off when you are asleep or out. Eco mode handles the “out” part automatically."},
    {"t":"h","x":"Build a schedule"},
    {"t":"ol","x":["Open the thermostat and tap Schedule.","Add a set point for each part of your day — morning, day, evening, night.","Drag a point to change its time, or tap it to change the temperature."]},
    {"t":"h","x":"Eco mode"},
    {"t":"p","x":"Turn on Eco and the thermostat relaxes to an energy-saving range whenever your phones leave home, then returns to your schedule when someone comes back."},
    {"t":"tip","x":"Start with just two set points — a comfortable evening and a cooler night. You can always add more once you see how it feels."}
  ]$json$),

  (10, 'a_motion_zones', 3, 'Set up doorbell motion zones and alerts',
   'Get alerts for people at your door, not cars on the street.', 5, 2, '2026-07-01 09:00:00+00', $json$[
    {"t":"p","x":"Motion zones tell the doorbell which parts of its view matter, so you get alerts for people at your door and not for cars on the street."},
    {"t":"h","x":"Draw your zones"},
    {"t":"ol","x":["Open the doorbell and tap Motion → Zones.","Drag the corners of the box to cover your walkway and porch.","Leave the sidewalk and road outside the box.","Save, then watch for a day and adjust."]},
    {"t":"h","x":"Tune your alerts"},
    {"t":"ul","x":["Lower the sensitivity if you get too many alerts.","Turn on Person alerts to ignore animals and shadows.","Use quiet hours so overnight motion is recorded but silent."]},
    {"t":"tip","x":"Smaller, tighter zones almost always beat one big zone. Aim for the three steps in front of your door."}
  ]$json$),

  (11, 'a_firmware', 3, 'Update your device firmware',
   'Updates install overnight on their own — or nudge one by hand.', 2, 3, '2026-07-09 09:00:00+00', $json$[
    {"t":"p","x":"Firmware updates arrive automatically and install overnight while a device is idle. You rarely need to do anything — but you can check or nudge an update by hand."},
    {"t":"ol","x":["Open the device and tap Settings → About.","If an update is waiting, tap Update now.","Keep the device powered until the light stops blinking."]},
    {"t":"warn","x":"Do not unplug a device while it updates. A half-finished update is the most common cause of a device that will not start up."}
  ]$json$),

  (12, 'a_factory_reset', 3, 'Reset a device to factory settings',
   'Wipe a device back to how it left the box, step by step.', 3, 4, '2026-06-30 09:00:00+00', $json$[
    {"t":"p","x":"A factory reset wipes a device back to how it left the box. Use it before you give a device away, or as a last resort when nothing else fixes a problem."},
    {"t":"h","x":"How to reset each device"},
    {"t":"ul","x":["Thermostat: hold the dial for 15 seconds until the ring flashes red.","Doorbell: hold the button on the back for 15 seconds.","Smart plug: hold the side button for 10 seconds until it blinks fast.","Sensor: hold the pinhole button for 10 seconds with a paperclip."]},
    {"t":"warn","x":"A reset removes the device from your home and erases its settings and recordings. You will need to add it again from scratch."},
    {"t":"tip","x":"Try a simple restart first. A reset should be your last step, not your first."}
  ]$json$),

  (13, 'a_change_login', 4, 'Change your email or password',
   'Update your sign-in details in under a minute.', 2, 1, '2026-05-05 09:00:00+00', $json$[
    {"t":"p","x":"You can change your email and password any time from your profile. Both take effect right away across every device in your home."},
    {"t":"ol","x":["Open the app and tap your profile picture.","Tap Account → Email or Password.","Confirm the change with the code we send you."]},
    {"t":"tip","x":"Turn on two-step verification while you are here. It adds a code at sign-in and takes about thirty seconds to set up."}
  ]$json$),

  (14, 'a_add_member', 4, 'Add a family member or housemate',
   'Share your home without handing out your password.', 3, 2, '2026-06-11 09:00:00+00', $json$[
    {"t":"p","x":"Share your home so family or housemates can see the same devices — no need to hand out your password."},
    {"t":"ol","x":["Tap your home name, then Members → Invite.","Enter their email and choose Full access or View only.","They accept from their own free Hearth account."]},
    {"t":"ul","x":["Full access can change settings and schedules.","View only can watch and get alerts but not change things."]},
    {"t":"tip","x":"You can change or remove a member’s access at any time from the same Members screen."}
  ]$json$),

  (15, 'a_notifications', 4, 'Manage notifications and quiet hours',
   'Tune alerts so Hearth stays helpful, not noisy.', 3, 3, '2026-07-03 09:00:00+00', $json$[
    {"t":"p","x":"Hearth can send a lot of alerts. A few minutes tuning them is the difference between helpful and noisy."},
    {"t":"h","x":"Set quiet hours"},
    {"t":"p","x":"Under Notifications → Quiet hours, pick a window — say 10pm to 7am. Events are still recorded; your phone just stays silent."},
    {"t":"ul","x":["Mute a single device without muting the rest.","Keep security alerts on even during quiet hours.","Choose per-device sounds so you know what is happening without looking."]},
    {"t":"tip","x":"Start with Person alerts only. You can always widen it later if you feel like you are missing things."}
  ]$json$),

  (16, 'a_close_account', 4, 'Close your Hearth account',
   'Remove your devices and data from Hearth for good.', 2, 4, '2026-04-28 09:00:00+00', $json$[
    {"t":"p","x":"Closing your account removes your devices, recordings, and personal details from Hearth for good. It cannot be undone, so take a moment first."},
    {"t":"ol","x":["Remove each device from your home.","Tap Account → Close account.","Confirm with the code we email you."]},
    {"t":"warn","x":"Closing an account deletes all saved recordings immediately. Download anything you want to keep before you start."}
  ]$json$),

  (17, 'a_track_order', 5, 'Track your Hearth order',
   'Find the tracking link for an order on its way.', 2, 1, '2026-07-10 09:00:00+00', $json$[
    {"t":"p","x":"Every Hearth order gets a tracking link by email the moment it ships. You can also find it in your account."},
    {"t":"ol","x":["Sign in at the Hearth store and open Orders.","Tap the order you are waiting on.","Follow the tracking link for live carrier updates."]},
    {"t":"tip","x":"Orders usually ship within one business day. If it has been longer than two with no tracking email, open a ticket and we will chase it down."}
  ]$json$),

  (18, 'a_return', 5, 'Start a return or exchange',
   '30 days to return or exchange, with a prepaid label.', 3, 2, '2026-07-06 09:00:00+00', $json$[
    {"t":"p","x":"Changed your mind or got the wrong thing? You have 30 days from delivery to start a return or exchange, no questions asked."},
    {"t":"h","x":"Start a return"},
    {"t":"ol","x":["Open Orders and pick the item.","Tap Return or exchange and choose a reason.","Print the prepaid label we email you.","Drop it at any carrier location within 14 days."]},
    {"t":"tip","x":"Keep the original box if you can — it makes the device much safer in transit and speeds up your refund."}
  ]$json$),

  (19, 'a_warranty', 5, 'What the warranty covers',
   'A two-year limited warranty covers defects — here''s the detail.', 4, 3, '2026-06-18 09:00:00+00', $json$[
    {"t":"p","x":"Every Hearth device comes with a two-year limited warranty that covers defects in materials and workmanship."},
    {"t":"h","x":"What it covers"},
    {"t":"ul","x":["Hardware that fails on its own during normal use.","A battery that will no longer hold a reasonable charge.","Buttons, sensors, or lights that stop responding."]},
    {"t":"h","x":"What it does not cover"},
    {"t":"ul","x":["Accidental damage, drops, or water past the rated level.","Normal wear like scuffs and scratches.","Loss or theft."]},
    {"t":"tip","x":"Open a ticket with your order number and a short description, and we will sort a repair or replacement."}
  ]$json$),

  (20, 'a_damaged', 5, 'Report a missing or damaged item',
   'Missing or damaged in the box? We''ll make it right fast.', 3, 4, '2026-07-13 09:00:00+00', $json$[
    {"t":"p","x":"If something arrived missing or damaged, we will make it right quickly — this is on us, not you."},
    {"t":"ol","x":["Take a photo of the box and the item if you can.","Open a ticket under Shipping & returns.","Tell us your order number and what is wrong."]},
    {"t":"tip","x":"Photos are optional, but they let us skip a few back-and-forth messages and ship a replacement the same day."}
  ]$json$);

-- Tickets (the seeded queue; next number is HH-3118) --------------------------

-- `first_response_minutes` is the gap from the opening message to the first
-- agent reply below, so the two stay consistent.

INSERT INTO tickets (id, number, requester_name, requester_email, customer_id, product_id, topic, subject, status, priority, assignee_id, first_response_minutes, created_at, updated_at) VALUES
  (1, 'HH-3117', 'Sam Ashworth', 'sam@example.com', 1, 2, 'connectivity', 'Doorbell keeps dropping off Wi-Fi at night',  'open',    'high',   1, 19, '2026-07-22 20:12:00+00', '2026-07-23 07:05:00+00'),
  (2, 'HH-3114', 'Sam Ashworth', 'sam@example.com', 1, 1, 'device',       'Thermostat won''t hold my evening schedule',  'pending', 'normal', 1, 35, '2026-07-20 18:40:00+00', '2026-07-21 09:14:00+00'),
  (3, 'HH-3109', 'Sam Ashworth', 'sam@example.com', 1, 3, 'shipping',     'Return label for a smart plug 2-pack',        'solved',  'normal', 1, 12, '2026-07-18 14:10:00+00', '2026-07-19 09:03:00+00'),
  (4, 'HH-3102', 'Sam Ashworth', 'sam@example.com', 1, 2, 'device',       'Motion alerts stopped after firmware update', 'closed',  'normal', 1, 32, '2026-07-08 11:20:00+00', '2026-07-09 19:01:00+00');

-- Ticket messages (18 turns across the 4 threads) ----------------------------

INSERT INTO ticket_messages (id, ticket_id, author, agent_id, created_at, body) VALUES
  -- HH-3117
  (1, 1, 'customer', NULL, '2026-07-22 20:12:00+00',
   'Our video doorbell keeps going offline every night around 11pm, then comes back by morning. Wi-Fi is fine on everything else. Any ideas?'),
  (2, 1, 'agent', 1, '2026-07-22 20:31:00+00',
   'Thanks for the detail, Sam — that timing is a great clue. Overnight is when a lot of devices wake up to update, which can crowd the 2.4 GHz band the doorbell uses. Could you open the doorbell in the app and tell me how many signal bars it shows under Device health?'),
  (3, 1, 'customer', NULL, '2026-07-23 07:05:00+00',
   'Just two bars, sometimes one. The router is on the far side of the house from the front door.'),

  -- HH-3114
  (4, 2, 'customer', NULL, '2026-07-20 18:40:00+00',
   'My thermostat keeps forgetting the evening set point. Every night it just stays at the daytime temperature until I fix it by hand.'),
  (5, 2, 'agent', 1, '2026-07-20 19:15:00+00',
   'Sorry about that — a schedule that won''t stick is annoying. Can you check whether Eco mode is on? When phones leave and return it can briefly override the schedule. It''s under Settings → Eco.'),
  (6, 2, 'customer', NULL, '2026-07-21 08:02:00+00',
   'Eco is off. The evening point is set for 6pm at 70°, but at 6 it just doesn''t change.'),
  (7, 2, 'agent', 1, '2026-07-21 09:14:00+00',
   'Got it, thank you for checking. That points to the schedule itself rather than Eco. I''ve passed the details to our devices team and we''ll follow up with a fix shortly — really appreciate your patience.'),

  -- HH-3109
  (8, 3, 'customer', NULL, '2026-07-18 14:10:00+00',
   'I need to return a smart plug 2-pack — bought the wrong region by mistake. How do I get a label?'),
  (9, 3, 'agent', 1, '2026-07-18 14:22:00+00',
   'Happy to help! Since it''s within 30 days you''re all set for a full refund. What''s your order number? I''ll email a prepaid label right over.'),
  (10, 3, 'customer', NULL, '2026-07-18 14:40:00+00',
   'It''s HH-ORD-88231.'),
  (11, 3, 'agent', 1, '2026-07-18 14:47:00+00',
   'Perfect — the label is on its way to your email now. Drop it at any carrier within 14 days and your refund lands 3–5 days after it scans. Anything else I can do?'),
  (12, 3, 'customer', NULL, '2026-07-19 09:03:00+00',
   'That''s everything, thank you!'),

  -- HH-3102
  (13, 4, 'customer', NULL, '2026-07-08 11:20:00+00',
   'After the last firmware update my doorbell stopped sending motion alerts. Live view still works fine.'),
  (14, 4, 'agent', 1, '2026-07-08 11:52:00+00',
   'Thanks for flagging this — you''re not the only one, and we''re on it. As a quick check, can you confirm Person alerts and your motion zones are still turned on under Motion?'),
  (15, 4, 'customer', NULL, '2026-07-08 13:15:00+00',
   'Zones look fine and Person alerts are on. Still nothing coming through.'),
  (16, 4, 'agent', 1, '2026-07-09 09:30:00+00',
   'Appreciated. We shipped a small update this morning that addresses exactly this. Could you go to Settings → About and tap Update now?'),
  (17, 4, 'customer', NULL, '2026-07-09 18:44:00+00',
   'That did it — alerts are back. Thanks for the quick turnaround.'),
  (18, 4, 'agent', 1, '2026-07-09 19:01:00+00',
   'Wonderful, so glad that''s sorted! I''ll close this out, but reply any time to reopen it if anything comes back.');

-- Orders (totals in GBP; total = sum of qty × unit_price) ---------------------

INSERT INTO orders (id, number, customer_id, status, carrier, tracking_code, total, placed_at) VALUES
  (1, 'HH-88214', 1, 'transit',   'Northline Express', 'NL8842197034', 208.00, '2026-07-18 09:14:00+00'),
  (2, 'HH-87109', 1, 'delivered', 'Northline Express', 'NL8710964220', 129.00, '2026-06-02 20:33:00+00'),
  (3, 'HH-88790', 1, 'packing',   'Northline Express', NULL,            78.00, '2026-07-26 21:08:00+00');

-- Order line items -----------------------------------------------------------

INSERT INTO order_items (order_id, product_id, title, qty, unit_price) VALUES
  (1, 1, 'Hearth Thermostat',       1, 149.00),
  (1, 4, 'Hearth Sensor (2-pack)',  1,  59.00),
  (2, 2, 'Hearth Video Doorbell',   1, 129.00),
  (3, 3, 'Hearth Smart Plug',       2,  29.00),
  (3, 4, 'Mounting kit',            1,  20.00);

-- Fulfilment timelines -------------------------------------------------------

INSERT INTO order_events (order_id, position, label, detail, state) VALUES
  (1, 1, 'Order placed',                   '18 Jul, 09:14',       'done'),
  (1, 2, 'Packed in Bristol',              '18 Jul, 16:02',       'done'),
  (1, 3, 'Picked up by carrier',           '19 Jul, 07:41',       'done'),
  (1, 4, 'Out for delivery',               'Expected Tue 28 Jul', 'current'),
  (1, 5, 'Delivered',                      NULL,                  'todo'),

  (2, 1, 'Order placed',                   '02 Jun, 20:33',       'done'),
  (2, 2, 'Packed in Bristol',              '03 Jun, 10:15',       'done'),
  (2, 3, 'Picked up by carrier',           '03 Jun, 18:20',       'done'),
  (2, 4, 'Out for delivery',               '04 Jun, 08:05',       'done'),
  (2, 5, 'Delivered — left with neighbour','04 Jun, 13:47',       'done'),

  (3, 1, 'Order placed',                   '26 Jul, 21:08',       'done'),
  (3, 2, 'Packing',                        'In progress',         'current'),
  (3, 3, 'Picked up by carrier',           'Expected 28 Jul',     'todo'),
  (3, 4, 'Out for delivery',               NULL,                  'todo'),
  (3, 5, 'Delivered',                      NULL,                  'todo');

-- Advance serial sequences past the explicit ids above ----------------------

SELECT setval('agents_id_seq',          (SELECT max(id) FROM agents));
SELECT setval('customers_id_seq',       (SELECT max(id) FROM customers));
SELECT setval('products_id_seq',        (SELECT max(id) FROM products));
SELECT setval('kb_categories_id_seq',   (SELECT max(id) FROM kb_categories));
SELECT setval('kb_articles_id_seq',     (SELECT max(id) FROM kb_articles));
SELECT setval('tickets_id_seq',         (SELECT max(id) FROM tickets));
SELECT setval('ticket_messages_id_seq', (SELECT max(id) FROM ticket_messages));
SELECT setval('orders_id_seq',          (SELECT max(id) FROM orders));
SELECT setval('order_items_id_seq',     (SELECT max(id) FROM order_items));
SELECT setval('order_events_id_seq',    (SELECT max(id) FROM order_events));
