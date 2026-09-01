/**
 * The composed message bundle.
 *
 * The app's strings are split across four area modules so they can be authored
 * in parallel without four agents fighting over one file. This is the only
 * place that flattens them; nothing else imports `../strings/*` directly.
 *
 * A later area silently wins a key collision, so keep namespaces disjoint —
 * `chrome.*` / `count.*`, `lib.*`, and the per-screen prefixes.
 */
import type { Translated } from "../untranslated.ts";
import { LOCALE_TAGS, type LocaleTag } from '../locales';
import { addOns } from '../strings/addOns';
import { chrome } from '../strings/chrome';
import { lib } from '../strings/lib';
import { screensA } from '../strings/screensA';
import { screensB } from '../strings/screensB';

/**
 * Parity guard. `en-US` defines the keys; the other seven must each carry a
 * string for every one of them. A translation module that is missing an English
 * key is a COMPILE error here rather than a silent per-key fallback to English
 * at runtime — which is the failure mode this whole layer exists to prevent.
 */
type Area<EN extends Record<string, string>> = { 'en-US': EN } & Record<
  Exclude<LocaleTag, 'en-US'>,
  Translated<EN>
>;

const AREAS: [Area<(typeof chrome)["en-US"]>, Area<(typeof lib)["en-US"]>, Area<(typeof screensA)["en-US"]>, Area<(typeof screensB)["en-US"]>, Area<(typeof addOns)["en-US"]>] = [chrome, lib, screensA, screensB, addOns];
export const MESSAGES = Object.fromEntries(
  LOCALE_TAGS.map((t) => [t, Object.assign({}, ...AREAS.map((a) => a[t] ?? {}))]),
) as Record<LocaleTag, Record<string, string>>;

/** Keys are typed off English — the source of truth — so a typo is a compile error. */
export type MessageKey =
  | keyof (typeof chrome)['en-US']
  | keyof (typeof lib)['en-US']
  | keyof (typeof screensA)['en-US']
  | keyof (typeof screensB)['en-US']
  | keyof (typeof addOns)['en-US'];

/** One add-on's bundle, as it travels on the add-on object. */
export type AddOnMessages = Readonly<Record<string, Readonly<Record<string, string>>>>;

/** Which add-ons have registered, for the suite that checks they all did. */
const registered = new Set<string>();

export function registeredAddOnMessageKeys(): readonly string[] {
  return [...registered].sort();
}

/**
 * Merge an add-on's strings into the runtime bundle, refusing a bundle that is
 * not complete in all eight locales.
 *
 * The five areas above are checked by `Area<>`: `en-US` defines the keys and
 * the other seven must each carry a string for every one, so a dropped
 * translation is a COMPILE error. An add-on's keys cannot have that guarantee
 * — they are not members of `MessageKey`, because the alternative is this
 * file, the host's own i18n core, importing and naming every add-on that
 * happens to be vendored. So the guarantee moved from the type checker to
 * here, and here THROWS, at module load, on every boot including the demo —
 * `add-ons/registry.ts` calls it at module scope and the store imports that,
 * so it cannot be skipped the way a test can.
 *
 * The four-line version — `Object.assign(MESSAGES[locale], bundle[locale])`
 * in a loop — works, passes every test in this repo, and silently accepts an
 * add-on missing three locales, which then falls back to English on screen
 * for a reader who cannot read it. Everything below the first line of the
 * loop is the reason this is not that. A COLLISION IS REFUSED for the same
 * reason: a later bundle silently winning is how an add-on ends up quietly
 * rewriting the host's own copy.
 */
export function registerAddOnMessages(addOnKey: string, bundle: AddOnMessages): void {
  const english = bundle['en-US'];
  if (english === undefined) {
    throw new Error(`add-on "${addOnKey}" registered no en-US strings`);
  }

  const keys = Object.keys(english);
  for (const locale of LOCALE_TAGS) {
    const localeBundle = bundle[locale];
    if (localeBundle === undefined) {
      throw new Error(`add-on "${addOnKey}" is missing the ${locale} locale entirely`);
    }
    for (const key of keys) {
      const value = localeBundle[key];
      if (typeof value !== 'string' || value.trim() === '') {
        throw new Error(`add-on "${addOnKey}" is missing ${locale} for "${key}"`);
      }
    }
  }

  for (const key of keys) {
    if (MESSAGES['en-US'][key] !== undefined) {
      throw new Error(`add-on "${addOnKey}" would overwrite the existing message key "${key}"`);
    }
  }

  /*
   * Mutating the same objects rather than rebuilding `MESSAGES` is what lets
   * the i18n provider hold a reference to a locale's bundle across a
   * registration — and registration happens at module load, before any bundle
   * is read, so nothing is ever seen half-merged.
   */
  for (const locale of LOCALE_TAGS) Object.assign(MESSAGES[locale], bundle[locale]);
  registered.add(addOnKey);
}
