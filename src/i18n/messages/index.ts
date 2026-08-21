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

const AREAS: [Area<(typeof chrome)["en-US"]>, Area<(typeof lib)["en-US"]>, Area<(typeof screensA)["en-US"]>, Area<(typeof screensB)["en-US"]>] = [chrome, lib, screensA, screensB];
export const MESSAGES = Object.fromEntries(
  LOCALE_TAGS.map((t) => [t, Object.assign({}, ...AREAS.map((a) => a[t] ?? {}))]),
) as Record<LocaleTag, Record<string, string>>;

/** Keys are typed off English — the source of truth — so a typo is a compile error. */
export type MessageKey =
  | keyof (typeof chrome)['en-US']
  | keyof (typeof lib)['en-US']
  | keyof (typeof screensA)['en-US']
  | keyof (typeof screensB)['en-US'];
