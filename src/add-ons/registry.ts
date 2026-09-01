/**
 * The static list this help desk registers at startup (24 §5.9).
 *
 * ── THE IMPORT BELOW IS THE ONLY PLACE THIS APP NAMES AN ADD-ON ────────────
 *
 * Acceptance criterion 5, grep-checked rather than promised: no shipped file
 * outside `./vendor/` and the registration line here mentions a company or an
 * add-on's key. Their settings, their defaults, the words on their forms,
 * their eight-locale strings and their seeded activity all arrive inside the
 * object `register()` returns — so swapping the delivery company is one line
 * here and one repository over there.
 *
 * ── AN EMPTY REGISTRY IS A VALID STATE, AND THAT IS WHY IT IS A LIST ───────
 *
 * `state/store.ts` boots `createRegistry([])` and this list is handed to it
 * at bootstrap. With an empty registry every slot draws its fallback and the
 * app is unchanged on screen, so the seam lands before any add-on does; the
 * store stops importing add-on bundles; and connected mode later swaps only
 * the SOURCE of this list. `ecommerce-storefront`'s copy of this file records
 * the three reasons at length.
 *
 * ── `./vendor/` IS A SYNCED COPY, NOT A FORK ───────────────────────────────
 *
 * Edit the package in the `add-ons` monorepo and re-run
 * `scripts/sync-add-ons.sh`; a hand-edit under `vendor/` is invisible until
 * it is a bug in two places at once.
 */

import { registerAddOnMessages } from "../i18n/messages/index.ts";
import { register as shippingDhl } from "./vendor/shipping-dhl/index.ts";
import { defaultSettingsFor, type AddOn, type AddOnSettings } from "./vendor/host/index.ts";

/**
 * Registered once, at module load, because REGISTRATION IS WHERE THE MESSAGES
 * ARRIVE. `registerAddOnMessages` THROWS on a bundle that is not complete in
 * all eight locales — a boot that dies naming the add-on, the locale and the
 * key is strictly better than a screen with a dotted key on it in exactly one
 * language.
 */
const REGISTERED: readonly AddOn[] = [shippingDhl()];
for (const addOn of REGISTERED) {
  if (addOn.messages !== undefined) registerAddOnMessages(addOn.key, addOn.messages);
}

/**
 * Everything the manage drawer shows. One entry and no shelf rows beside it:
 * a customer help portal's drawer is a list of what is CONNECTED to this
 * business, not a marketplace page, and a row that cannot be switched on
 * would be an advertisement inside a support flow.
 */
export function demoAddOns(): AddOn[] {
  return [...REGISTERED];
}

/**
 * What every add-on starts from, keyed by add-on key and OPAQUE to this app.
 * The credentialled add-on's `secret: true` settings are absent by
 * CONSTRUCTION (24 D15): they live in its server half and `register()` does
 * not put them in `settings`.
 */
export const DEFAULT_ADD_ON_SETTINGS: AddOnSettings = defaultSettingsFor(REGISTERED);
