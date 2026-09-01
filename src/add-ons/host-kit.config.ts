/**
 * EVERY FACT ABOUT THIS APP THE HOST KIT NEEDS, in one object.
 *
 * HOST-OWNED AND NEVER SYNCED. `scripts/host-kit.sh` refuses to write this
 * file and refuses to compare it, because everything in it is a fact about
 * this help desk rather than about the seam — a path, a prefix, the slots this
 * app draws, the languages it ships.
 *
 * ── THE TWO FIELDS WORTH READING TWICE ─────────────────────────────────────
 *
 * `hostedSlots` takes THIS APP'S three, not the closed registry's twelve. The
 * import trap the kit warns about is dodged by renaming at the import in
 * `./slots.ts` rather than here — see that file.
 *
 * `classPrefix` is `hd`. Unlike the two shops that had the seam first, this
 * app has no single app-wide prefix — its styles are `fx-*` utilities plus a
 * per-screen `scr-*`/`rt-*` convention — so the seam takes a prefix of its
 * own, unused anywhere else (grep-checked at adoption). It appears in five
 * places that must agree, four of them test files that go GREEN when they
 * match nothing; one field, `selectorsFor`, five readers.
 */

import type { HostKitConfig } from "./kit/index.ts";
import { LOCALE_TAGS } from "../i18n/locales";
import { HOSTED_SLOTS, SLOT_EMPTY_BEHAVIOUR, type HostedSlotId } from "./slots.ts";

/**
 * The three filesystem paths, computed as string work and not `new URL()` —
 * Vite treats `new URL(<literal>, import.meta.url)` as an asset reference and
 * warns on every build. Under Node this yields a real absolute path; in a
 * browser a meaningless-but-harmless string nothing reads. `decodeURIComponent`
 * because a checkout path with a space arrives as `%20`, and a guard walking a
 * directory that does not exist reports no findings — green.
 */
function dirUp(levels: number): string {
  const here = decodeURIComponent(import.meta.url).replace(/^file:\/\//, "");
  let path = here.replace(/\/[^/]*$/, "");
  for (let i = 0; i < levels; i += 1) path = path.replace(/\/[^/]*$/, "");
  return path;
}

/** `src/add-ons/`, with its trailing slash — the directory this file is in. */
const HERE = `${dirUp(0)}/`;
const ROOT_DIR = dirUp(2);
const SRC_DIR = dirUp(1);

export const hostKit: HostKitConfig<HostedSlotId> = {
  appKey: "support-desk",
  classPrefix: "hd",
  hostedSlots: HOSTED_SLOTS,
  slotEmptyBehaviour: SLOT_EMPTY_BEHAVIOUR,

  /**
   * TIER 1 — the seven file-and-text guards, declared rather than drifted
   * into: this repo has no `jsdom`, no `.test.tsx` and no component test of
   * any kind today, and the kit's ratchet is that a host may sit at tier 1 but
   * MAY NOT SIT THERE QUIETLY — every run prints, by name, the four guards
   * that are not running and the defect each one leaves open. The cost of
   * tier 2 is one devDependency (`jsdom`) plus this app's first rendered
   * suites; `factory-ops` sits at tier 1 on the same reasoning and its config
   * carries the same note. Raising the tier is a deliberate later change, not
   * a thing this retrofit does silently.
   */
  tier: 1,

  rootDir: ROOT_DIR,
  srcDir: SRC_DIR,
  vendorDir: `${HERE}vendor`,

  /**
   * Every language this help desk ships, English first — read from the app's
   * own locale registry rather than written out, because that table is already
   * the single source of truth the picker and the parity guard read. The
   * lexicon gate runs PER LOCALE; a host that passed only `en-US` would be
   * repeating the release grep and performing none of the seven checks it
   * cannot.
   */
  localeTags: LOCALE_TAGS,

  /**
   * The stylesheet that may carry the slot rule pair. Exactly one — two copies
   * of a cascade rule is how one gets edited and the other does not. This app
   * has per-screen stylesheets plus three shared ones; `components.css` is the
   * shared file that holds rules (tokens.css is custom properties only).
   */
  stylesheets: [`${SRC_DIR}/styles/components.css`],

  affiliationExempt: {},
};
