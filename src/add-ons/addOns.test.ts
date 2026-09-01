/**
 * The add-on seam's gates, wired into this repo's own suite.
 *
 * ── THE GUARDS ARE NOT AUTO-DISCOVERED, AND THAT IS DELIBERATE ─────────────
 *
 * Every one of them is a factory that declares its own `describe`, and this
 * file is the only thing that calls them. A guard that ran because a file
 * existed would stop running the day a glob changed — silently, which is the
 * exact failure the kit was written after. `tierGuard` closes the loop by
 * reading this file's source and failing if any of the seven that need no DOM
 * is not named in it.
 *
 * ── AND THIS FILE NAMES THE ADD-ON ON PURPOSE ──────────────────────────────
 *
 * Acceptance criterion 5 is about SHIPPED source: nothing outside the vendored
 * tree and the one import line in `registry.ts` may name a company. A suite is
 * not shipped, and a suite that asserted the seam without naming what is on
 * the far side of it could not tell "the carrier's fill resolves" from "no
 * fill resolves".
 */

import { describe, expect, it } from "vitest";

import { hostKit } from "./host-kit.config.ts";
import { HOSTED_SLOTS, SLOT_EMPTY_BEHAVIOUR } from "./slots.ts";
import { DEFAULT_ADD_ON_SETTINGS, demoAddOns } from "./registry.ts";
import { inboundOrderFor, returnRecordFor, sampleCatalogue, SHOP_CLOCK } from "./records.ts";
import { dataSource } from "../data/source.ts";
import { createRegistry, SLOT_FILL } from "./vendor/host/index.ts";
import { MESSAGES, registeredAddOnMessageKeys } from "../i18n/messages/index.ts";
import {
  brandGuard,
  factsGuard,
  labelPairingSourceGuard,
  lexiconGuard,
  payloadCastsGuard,
  stylesGuard,
  tierGuard,
  vendoredGuard,
} from "../testing/kit/index.ts";

/* ─── the kit's own gates ─────────────────────────────────────────────────── */

/**
 * The vocabulary ban, over the MERGED bundle. Importing `./registry.ts` above
 * is what merges the add-on's strings into `MESSAGES` at module load — the
 * import is for its side effect as much as for `demoAddOns`. Reading the
 * host's own area modules instead would run this gate over exactly the half
 * of the copy that is not on trial.
 */
lexiconGuard(hostKit, { bundleFor: (locale) => MESSAGES[locale as keyof typeof MESSAGES] ?? {} });

brandGuard(hostKit);
labelPairingSourceGuard(hostKit);
payloadCastsGuard(hostKit);
factsGuard(hostKit);
vendoredGuard(hostKit);
stylesGuard(hostKit);
tierGuard(hostKit);

/* ─── what is true of THIS host and no other ──────────────────────────────── */

describe("support-desk · the add-ons it registers", () => {
  const registry = createRegistry(demoAddOns());

  it("registers at least one, so every case below is deciding something", () => {
    // THE GUARD ON THE GUARD: `every` over an empty list is true, and an empty
    // registry is one bad merge in `registry.ts` away with nothing else red.
    expect(registry.all.length).toBeGreaterThan(0);
  });

  it("merged every registered add-on's strings into all eight locales", () => {
    const withStrings = registry.all.filter((addOn) => addOn.messages !== undefined);
    expect(registeredAddOnMessageKeys()).toEqual(withStrings.map((a) => a.key).sort());
    for (const locale of hostKit.localeTags) {
      const bundle = MESSAGES[locale as keyof typeof MESSAGES];
      expect(bundle["addon.shipping-dhl.line"], locale).toBeTypeOf("string");
      // The inbound half's own copy travelled with the rest of the bundle.
      expect(bundle["addon.shipping-dhl.returns.title"], locale).toBeTypeOf("string");
    }
  });

  it("starts with nothing switched on, so the desk is finished without it", () => {
    // 24 D6, asserted rather than described: the first render after a boot
    // draws every slot's empty state, and this step of the wizard is
    // byte-identical to the screen this app shipped before the seam.
    for (const slot of HOSTED_SLOTS) {
      expect(registry.fillsFor(slot, new Set()), slot).toEqual([]);
    }
  });

  it("seeds a default for every setting an add-on declares", () => {
    for (const addOn of registry.all) {
      const values = DEFAULT_ADD_ON_SETTINGS[addOn.key] ?? {};
      for (const setting of addOn.settings) {
        expect(values[setting.key], `${addOn.key}.${setting.key}`).toBeDefined();
      }
    }
  });

  it("holds no secret, because there is nowhere in this app to put one", () => {
    // 24 D15 from the host's side: the default document this app boots with
    // has no field for either of the carrier's two credentials.
    const flat = JSON.stringify(DEFAULT_ADD_ON_SETTINGS);
    expect(flat).not.toContain("api_key");
    expect(flat).not.toContain("account_number");
  });

  it("fills the record slot the returns wizard mounts", () => {
    // The seam is only worth having if something crosses it: the carrier's
    // prepaid-return-label fill reaches `record.actions` (31 O4). It also
    // fills three slots this app does not mount, and those never render —
    // which is D21 working rather than a mismatch.
    const all = new Set(registry.all.map((a) => a.key));
    expect(registry.fillsFor("record.actions", all).map((f) => f.addOn)).toContain("shipping-dhl");
  });

  it("fills the customer tracking panel the same step mounts", () => {
    const all = new Set(registry.all.map((a) => a.key));
    expect(registry.fillsFor("order.dispatch.panel", all).map((f) => f.addOn)).toContain(
      "shipping-dhl",
    );
  });

  it("gives the settings drawer ONE panel, not every add-on's", () => {
    const all = new Set(registry.all.map((a) => a.key));
    expect(SLOT_FILL["settings.add-on.panel"]).toBe("per-add-on");
    for (const addOn of registry.all) {
      const mine = registry.fillsFor("settings.add-on.panel", all, addOn.key);
      expect(mine.every((f) => f.addOn === addOn.key), addOn.key).toBe(true);
    }
  });
});

/**
 * THE MAPPING THE HOST OWNS, held to what the payloads promise.
 *
 * `records.ts` is where this app's wizard state becomes the seam's shapes,
 * and the far side can never notice a wrong key or a hollow address — an
 * add-on handed a reference belonging to nothing simply reports, forever,
 * that nothing exists. `mountsGuard` would watch the rendered half of this
 * and needs a DOM; this host declares tier 1, so these cases are the half
 * that runs.
 */
describe("support-desk · the shapes it hands across the seam", () => {
  const wizard = {
    rRma: "RMA-4419137",
    rOrder: "HH-87109",
    rPicked: ["Hearth Video Doorbell"],
    rReason: "faulty",
    rMethod: "post",
  };

  it("names the record a return, identified by the RMA reference", () => {
    const payload = returnRecordFor(wizard);
    expect(payload.entity).toBe("return");
    expect(payload.recordId).toBe(wizard.rRma);
    expect(payload.now).toEqual(SHOP_CLOCK);
  });

  it("hands the dispatch panel the same reference, or the two surfaces tell two stories", () => {
    // The action fill books under `recordId` and the tracking panel looks up
    // `order.ref`; they meet inside the transport, so the two spellings of
    // the reference must be one.
    expect(inboundOrderFor(wizard).ref).toBe(returnRecordFor(wizard).recordId);
  });

  it("states its own end of the route as a complete address", () => {
    const origin = inboundOrderFor(wizard).origin;
    expect(origin.name).toBe(dataSource.brand());
    expect(origin.city.trim().length).toBeGreaterThan(0);
    expect(origin.postcode.trim().length).toBeGreaterThan(0);
    expect(origin.country).toMatch(/^[A-Z]{2}$/);
  });

  it("maps only the PICKED lines into the parcel, with real quantities", () => {
    const items = inboundOrderFor(wizard).items;
    expect(items.map((i) => i.label)).toEqual(wizard.rPicked);
    for (const item of items) {
      expect(Number.isInteger(item.quantity) && item.quantity > 0, item.label).toBe(true);
    }
  });

  it("pins the shop's clock to a working day, mid-morning", () => {
    // The carrier's collection arithmetic runs off this pin; a weekend pin
    // would make every screenshot show a postponed collection.
    const day = new Date(`${SHOP_CLOCK.iso}T12:00:00Z`).getUTCDay();
    expect(day).toBeGreaterThanOrEqual(1);
    expect(day).toBeLessThanOrEqual(5);
    expect(SHOP_CLOCK.hour).toBeLessThan(15);
  });

  it("samples the catalogue by keys that are rows", () => {
    const products = dataSource.products();
    const keys = new Set<string>(products.map((p) => p.id));
    const samples = sampleCatalogue(products);
    expect(samples.length).toBeGreaterThan(0);
    expect(samples.filter((sample) => !keys.has(sample.key))).toEqual([]);
  });
});

describe("support-desk · the slots it says it hosts", () => {
  it("hosts a strict subset of the closed registry", () => {
    for (const slot of HOSTED_SLOTS) {
      expect(slot in SLOT_FILL, slot).toBe(true);
    }
    expect(HOSTED_SLOTS.length).toBeLessThan(Object.keys(SLOT_FILL).length);
  });

  it("decides an empty behaviour for every slot it hosts, and no other", () => {
    expect(Object.keys(SLOT_EMPTY_BEHAVIOUR).sort()).toEqual([...HOSTED_SLOTS].sort());
  });

  it("does not claim the staff surfaces it has no screen for", () => {
    /*
     * `manifest.json` declares one frontend and its side is `customer`. The
     * DOING of a dispatch is somebody in a warehouse, and the checkout rate
     * step belongs to a till this help desk does not have. Named here rather
     * than merely absent, because "we did not get to it" and "this app has no
     * such surface" look identical in a list.
     */
    const hosted: readonly string[] = HOSTED_SLOTS;
    for (const slot of ["order.dispatch.actions", "checkout.delivery.methods"]) {
      expect(hosted.includes(slot), slot).toBe(false);
    }
  });
});
