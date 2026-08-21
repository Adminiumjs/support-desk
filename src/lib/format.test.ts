/*
 * The formatters (port spec §12).
 *
 * Every string a customer reads goes through this file, so the tests here are
 * about the *rules*, not the seed data — prefixes come from `../data/demo` so
 * a rebrand moves the tests with the app instead of breaking them.
 *
 * The rules worth guarding hardest, because each is one "tidy-up" away from
 * being wrong:
 *
 *   1. `money` is always two decimals; `moneyLoose` drops them only on whole
 *      numbers. Swapping one for the other changes every price on the site.
 *   2. Where a rule is the comp's arithmetic, the rounding happens BEFORE
 *      `Intl` sees the number: `Math.round` breaks ties toward +∞, so it is
 *      NOT symmetric across zero, and `poundsWhole` / `percentText` preserve
 *      that. `money` hands the raw value over and gets `Intl`'s half-expand.
 *   3. Negative money is signed by `Intl`, which places the sign against the
 *      symbol the way the locale does. The old hand-rolled U+2212 prefix is
 *      gone — it hard-coded one language's typography into every locale.
 *   4. The reference generators are pure functions of a count, so their whole
 *      job is to be unique across the range the app can actually produce.
 *      Each one is swept over its reachable domain here.
 */

import { describe, expect, it } from "vitest";
import { CODE_PREFIX, GIFT_CODE_PREFIX, SURVEY_TAGS } from "../data/demo.ts";
import { tOr } from "../i18n/ambient";
import type { MessageKey } from "../i18n/messages";
import {
  NOW_STAMP,
  barHeight,
  clockTime,
  claimRef,
  counted,
  dayPart,
  deleteRef,
  displayNameFromEmail,
  distanceMiles,
  giftCode,
  initialsFrom,
  money,
  moneyLoose,
  nextMemberId,
  nextRegisteredId,
  normaliseOrderCode,
  percent,
  percentText,
  planPrice,
  poundsWhole,
  readTime,
  readTimeShort,
  recycleRef,
  relativeTime,
  repairRef,
  rmaRef,
  signedMoney,
  subjectFromMessage,
  surveyRef,
  ticketCode,
  tradeInRef,
  tradeRef,
  transferRef,
  truncateCrumb,
  updatedLine,
  warrantyExpiry,
} from "./format.ts";

/* ------------------------------------------------------------------ *
 * money — rule 1
 * ------------------------------------------------------------------ */

describe("money", () => {
  it("always shows two decimals, including zero and whole pounds", () => {
    expect(money(0)).toBe("£0.00");
    expect(money(1)).toBe("£1.00");
    expect(money(12)).toBe("£12.00");
    expect(money(12.5)).toBe("£12.50");
  });

  it("puts the sign in front of the symbol, as en-US does", () => {
    /*
     * The old implementation interpolated the raw number and produced the
     * wrong `£-12.00`. `Intl` knows where each locale wants the sign, so this
     * is now correct everywhere rather than tidy in one place.
     */
    expect(money(-12)).toBe("-£12.00");
    /* `Intl` would render -0 as "-£0.00"; `noNegZero` folds it first, because a
     * signed zero on a price tag is never what anyone meant. */
    expect(money(-0)).toBe("£0.00");
  });

  it("rounds half away from zero, the way `Intl` does", () => {
    /*
     * `toFixed` used to round the binary double, which made 1.005 → "£1.00"
     * and 12.005 → "£12.01" — a pair nobody could defend. `Intl` rounds the
     * decimal value half-expand, so both go up and the results are consistent.
     */
    expect(money(1.005)).toBe("£1.01");
    expect(money(2.675)).toBe("£2.68");
    expect(money(12.005)).toBe("£12.01");
    expect(money(1.015)).toBe("£1.02");
    expect(money(0.125)).toBe("£0.13");
  });

  it("groups thousands, because the locale says to", () => {
    /*
     * The old implementation refused `Intl.NumberFormat` to keep the demo
     * byte-identical on every machine, and paid for it with £1234.50. The
     * grouping separator is now the reader's: "," in en-US, "." in de-DE, a
     * narrow space in fr-FR.
     */
    expect(money(1234.5)).toBe("£1,234.50");
    expect(money(1_000_000)).toBe("£1,000,000.00");
  });

  it("copes with magnitudes no price can reach", () => {
    /* `toFixed` used to give up above 1e21 and emit "£1e+21". `Intl` does not. */
    expect(money(1e21)).toBe("£1,000,000,000,000,000,000,000.00");
    expect(money(NaN)).toBe("£NaN");
  });
});

describe("moneyLoose", () => {
  it("drops the decimals on whole numbers and keeps them otherwise", () => {
    expect(moneyLoose(50)).toBe("£50");
    expect(moneyLoose(0)).toBe("£0");
    expect(moneyLoose(12.5)).toBe("£12.50");
    expect(moneyLoose(12.05)).toBe("£12.05");
  });

  it("treats a negative whole number as whole", () => {
    /* `-50 % 1` is -0, which is falsy, so the whole-number branch wins. */
    expect(moneyLoose(-50)).toBe("-£50");
    expect(moneyLoose(-12.5)).toBe("-£12.50");
  });

  it("shows £0.00 for a non-zero amount below half a penny", () => {
    /*
     * Not a rounding bug so much as a rounding consequence: the fraction makes
     * it take the two-decimal branch, and two decimals of 0.004 is 0.00. The
     * gift-card screen's custom field is the only way to type such a value.
     */
    expect(moneyLoose(0.004)).toBe("£0.00");
  });

  it("groups a loose whole number too", () => {
    expect(moneyLoose(1_500)).toBe("£1,500");
  });
});

describe("poundsWhole", () => {
  it("rounds to whole pounds", () => {
    expect(poundsWhole(149)).toBe("£149");
    expect(poundsWhole(149.4)).toBe("£149");
    expect(poundsWhole(149.5)).toBe("£150");
  });

  it("breaks ties toward +∞, so negatives round the other way — rule 2", () => {
    /*
     * Math.round(-149.5) is -149, not -150. Symmetry is the intuitive answer
     * and the wrong one. This is why the value is rounded before `Intl` sees
     * it: `Intl`'s own half-expand rounding would give -150 and quietly change
     * the comp's arithmetic.
     */
    expect(poundsWhole(-149.5)).toBe("-£149");
    expect(poundsWhole(-150.5)).toBe("-£150");
  });

  it("never prints a negative zero", () => {
    /* Math.round(-0.4) is -0, which `Intl` would sign; `noNegZero` folds it. */
    expect(poundsWhole(-0.4)).toBe("£0");
    expect(poundsWhole(0)).toBe("£0");
  });
});

describe("planPrice", () => {
  it("labels a zero price rather than printing it", () => {
    expect(planPrice(0)).toBe("Free");
    /* -0 === 0, so a negative zero is also "Free". */
    expect(planPrice(-0)).toBe("Free");
  });

  it("prices everything else with two decimals", () => {
    expect(planPrice(3.99)).toBe("£3.99");
    expect(planPrice(4)).toBe("£4.00");
  });

  it("only says Free at exactly zero, not at a price that rounds to zero", () => {
    /* £0.004 a month renders "£0.00" — visually free, not labelled Free. The
     * `=== 0` test is exact by design; the plan data has no such price. */
    expect(planPrice(0.004)).toBe("£0.00");
  });
});

describe("signedMoney — rule 3", () => {
  it("lets the locale sign the number", () => {
    /*
     * Was a hand-rolled `−£` with a U+2212 MINUS SIGN. That is the right glyph
     * for en-GB typography and the wrong one for a locale that signs with
     * `؜-` and puts it elsewhere, so the choice now belongs to `Intl`.
     */
    expect(signedMoney(-129)).toBe("-£129.00");
  });

  it("leaves positives and zero unsigned", () => {
    expect(signedMoney(129)).toBe("£129.00");
    expect(signedMoney(0)).toBe("£0.00");
    /* `noNegZero` keeps a signed zero off the invoice. */
    expect(signedMoney(-0)).toBe("£0.00");
  });

  it("is `money` — one formatter, so an invoice cannot drift from a price", () => {
    expect(signedMoney(-12.345)).toBe(money(-12.345));
  });
});

/* ------------------------------------------------------------------ *
 * counting
 * ------------------------------------------------------------------ */

describe("counted", () => {
  /*
   * The replacement for `pluralise(n, noun)`, which appended an English "s".
   * With no provider mounted the ambient bridge serves the en-US bundle and
   * English's two categories, so these assert the English forms; the point of
   * the change is that Czech gets three variants and Arabic six from exactly
   * the same call.
   */
  it("uses the singular at exactly one and the plural everywhere else", () => {
    expect(counted("count.ticket", 0)).toBe("0 tickets");
    expect(counted("count.ticket", 1)).toBe("1 ticket");
    expect(counted("count.ticket", 2)).toBe("2 tickets");
  });

  it("takes an irregular plural from the bundle, not from a call site", () => {
    /* No `plural` argument to forget: "people" is authored once, in the
     * message, where a translator can see it. */
    expect(counted("count.person", 1)).toBe("1 person");
    expect(counted("count.person", 3)).toBe("3 people");
  });

  it("follows CLDR, so a fraction is `other` in English", () => {
    expect(counted("count.ticket", 1.5)).toBe("1.5 tickets");
    expect(counted("count.ticket", -1)).toBe("-1 tickets");
  });

  it("falls back to the key when a noun has no message", () => {
    /* A missing key renders itself rather than throwing — a wrong label is
     * recoverable in a demo, a blank screen is not.
     *
     * `counted()` itself can no longer be handed one: its parameter is
     * `MessageKey`, so `counted("count.nonesuch", 2)` is a COMPILE error now,
     * which is a strictly stronger guarantee than this test was making. The
     * one seam an unchecked key still travels is `tOr()` — the lookup for keys
     * assembled at runtime from catalogue data — so the runtime behaviour is
     * asserted there. `tOr` can only return its fallback by observing that
     * `t()` handed the key straight back. */
    expect(tOr("count.nonesuch", "no such noun")).toBe("no such noun");
    /* …and an authored key resolves, so the miss above is a real miss and not
     * `tOr` returning its fallback unconditionally. */
    expect(tOr("count.ticket", "no such noun")).not.toBe("no such noun");
  });

  it("carries every noun the app counts", () => {
    /* `as const satisfies` keeps these as literal keys: a noun that is deleted
     * from the bundle fails to compile here before it can fail to render. */
    const NOUNS = [
      "count.article",
      "count.camera",
      "count.clip",
      "count.device",
      "count.installer",
      "count.item",
      "count.location",
      "count.part",
      "count.person",
      "count.result",
      "count.screen",
      "count.service",
      "count.thing",
      "count.ticket",
    ] as const satisfies readonly MessageKey[];

    for (const key of NOUNS) {
      expect(counted(key, 2)).not.toBe(key);
    }
  });
});

describe("read times", () => {
  it("never pluralises the unit — 'min' is an abbreviation, not a count", () => {
    expect(readTime(1)).toBe("1 min read");
    expect(readTime(5)).toBe("5 min read");
    expect(readTimeShort(1)).toBe("1 min");
    expect(readTime(0)).toBe("0 min read");
    /* The number is `Intl`'s, so it groups and uses the locale's digits. */
    expect(readTime(1200)).toBe("1,200 min read");
  });
});

/* ------------------------------------------------------------------ *
 * relative time
 * ------------------------------------------------------------------ */

describe("relativeTime", () => {
  it("passes an authored stamp straight through", () => {
    expect(relativeTime("2h ago")).toBe("2h ago");
    /* No trimming of a non-empty stamp: only emptiness is normalised. */
    expect(relativeTime(" 2h ago ")).toBe(" 2h ago ");
  });

  it("falls back to the fresh-record stamp on anything blank", () => {
    expect(relativeTime("")).toBe(NOW_STAMP);
    expect(relativeTime("   ")).toBe(NOW_STAMP);
    expect(relativeTime(null)).toBe(NOW_STAMP);
    expect(relativeTime(undefined)).toBe(NOW_STAMP);
  });

  it("composes the ticket sub-line with a middot", () => {
    expect(updatedLine("2h ago", "Video Doorbell")).toBe(
      "Updated 2h ago · Video Doorbell",
    );
    expect(updatedLine("", "Video Doorbell")).toBe(
      `Updated ${NOW_STAMP} · Video Doorbell`,
    );
  });
});

describe("date bits", () => {
  it("adds three years to the injected clock's year", () => {
    /* Rendered by `Intl` in the ambient locale — en-US here, which orders the
     * fields month-day-year. The *date* is the contract, not that order. */
    expect(warrantyExpiry(new Date(2026, 6, 27))).toBe("Jul 27, 2029");
    expect(warrantyExpiry(new Date(2019, 0, 1))).toBe("Jul 27, 2022");
  });

  it("keeps the day and month fixed whatever the clock says", () => {
    /*
     * Counter-intuitive but correct: the comp derives the expiry as
     * `'27 Jul ' + (year + 3)`, so a device registered on New Year's Day still
     * expires "27 Jul". Deriving the real anniversary would be a behaviour
     * change, not a bug fix.
     */
    expect(warrantyExpiry(new Date(2026, 11, 31))).toBe("Jul 27, 2029");
  });

  it("lets the locale decide whether a clock has an AM/PM", () => {
    /* en-US is a 12-hour locale; de-DE is not. The hand-rolled "14:26:08"
     * asserted one of those on every reader. */
    const noon = new Date(2026, 6, 27, 14, 26, 8);
    expect(clockTime(noon)).toBe("02:26 PM");
    expect(clockTime(noon, true)).toBe("02:26:08 PM");
  });

  it("takes the day half of a stamp, and copes when there is no comma", () => {
    expect(dayPart("18 Jul, 09:14")).toBe("18 Jul");
    expect(dayPart("18 Jul")).toBe("18 Jul");
    expect(dayPart("")).toBe("");
    /* Only the first comma splits — everything after it is dropped. */
    expect(dayPart("18 Jul, 09:14, BST")).toBe("18 Jul");
  });
});

/* ------------------------------------------------------------------ *
 * order codes
 * ------------------------------------------------------------------ */

describe("normaliseOrderCode", () => {
  const code = (n: string) => `${CODE_PREFIX}${n}`;

  it("prefixes a bare five-digit number", () => {
    expect(normaliseOrderCode("88214")).toBe(code("88214"));
  });

  it("upper-cases, re-inserts the dash and strips a leading hash", () => {
    expect(normaliseOrderCode("hh88214")).toBe(code("88214"));
    expect(normaliseOrderCode(`#${CODE_PREFIX}88214`)).toBe(code("88214"));
    expect(normaliseOrderCode("#hh88214")).toBe(code("88214"));
  });

  it("removes whitespace anywhere, not just at the ends", () => {
    expect(normaliseOrderCode("  88214  ")).toBe(code("88214"));
    expect(normaliseOrderCode("hh 882 14")).toBe(code("88214"));
    /* The hash is stripped before the inner whitespace, so this still works. */
    expect(normaliseOrderCode("# 88214")).toBe(code("88214"));
  });

  it("is idempotent — a normalised code survives another pass", () => {
    const once = normaliseOrderCode("hh88214");
    expect(normaliseOrderCode(once)).toBe(once);
  });

  it("leaves anything that is not five digits alone, uppercased", () => {
    /* The five-digit test is exact: four or six digits are not order numbers,
     * so they are handed back rather than guessed at. */
    expect(normaliseOrderCode("8821")).toBe("8821");
    expect(normaliseOrderCode("882145")).toBe("882145");
    expect(normaliseOrderCode("not an order")).toBe("NOTANORDER");
    expect(normaliseOrderCode("")).toBe("");
  });
});

describe("ticketCode", () => {
  it("prefixes the number without padding it", () => {
    expect(ticketCode(3118)).toBe(`${CODE_PREFIX}3118`);
    expect(ticketCode(1)).toBe(`${CODE_PREFIX}1`);
    expect(ticketCode(3118)).toMatch(/^[A-Z]+-\d+$/);
  });
});

/* ------------------------------------------------------------------ *
 * reference generators — rule 4
 * ------------------------------------------------------------------ */

describe("reference generators", () => {
  it("pins the documented shape at the documented input", () => {
    expect(claimRef(2)).toBe("WC-48224");
    expect(rmaRef(1)).toBe("RMA-4419137");
    expect(repairRef(4)).toBe("AP-2054");
    expect(tradeInRef(38)).toBe("TI-70448");
    expect(surveyRef(9, 0)).toBe("FB-52217");
    expect(deleteRef(3)).toBe("AD-90413");
    expect(tradeRef(5)).toBe("TA-78255");
    expect(recycleRef(1)).toBe("RC-31953");
  });

  it("starts from its base at a count of zero", () => {
    expect(claimRef(0)).toBe("WC-48210");
    expect(rmaRef(0)).toBe("RMA-4419000");
    expect(repairRef(0)).toBe("AP-2050");
    expect(deleteRef(0)).toBe("AD-90410");
    expect(tradeRef(0)).toBe("TA-78200");
    expect(recycleRef(0)).toBe("RC-31940");
  });

  it("is unique across every count the app can reach", () => {
    /* Each generator is strictly monotonic in its count, so uniqueness is the
     * property to guard: a stride of 0 (or a duplicated base) would collapse
     * every reference onto one string and nothing else would notice. */
    const sweep = (fn: (n: number) => string, upTo: number) => {
      const seen = new Set(Array.from({ length: upTo }, (_, i) => fn(i)));
      expect(seen.size).toBe(upTo);
    };
    sweep(claimRef, 50);
    sweep(rmaRef, 50);
    sweep(repairRef, 50);
    sweep(deleteRef, 4); // three tick-boxes: 0..3
    sweep(tradeRef, 60); // trimmed name length
    sweep(recycleRef, 20);
    sweep(tradeInRef, 200); // quote in whole pounds
  });

  it("keeps every survey reference distinct over the reachable grid", () => {
    /*
     * `surveyRef` mixes two inputs into one number: nps * 13 + tags. That is
     * only injective while the tag count stays under the multiplier — with 13
     * tags, (nps 1, 13 tags) and (nps 2, 0 tags) produce the same reference.
     * The tag list is well short of that today; this sweep is the tripwire if
     * anyone extends it past twelve.
     */
    expect(SURVEY_TAGS.length).toBeLessThan(13);
    const refs = new Set<string>();
    for (let nps = 0; nps <= 10; nps++) {
      for (let tags = 0; tags <= SURVEY_TAGS.length; tags++) {
        refs.add(surveyRef(nps, tags));
      }
    }
    expect(refs.size).toBe(11 * (SURVEY_TAGS.length + 1));
    /* The collision the bound protects against, spelled out. */
    expect(surveyRef(1, 13)).toBe(surveyRef(2, 0));
  });

  it("gives the next sequential record id", () => {
    expect(nextRegisteredId(0)).toBe("d1");
    expect(nextRegisteredId(2)).toBe("d3");
    expect(nextMemberId(0)).toBe("m1");
    expect(nextMemberId(9)).toBe("m10");
  });
});

describe("transferRef", () => {
  it("takes the last four serial digits and a two-digit sequence", () => {
    expect(transferRef("SN-4471-8823", 1)).toBe("WT-8823-01");
    /* Digits are gathered from anywhere in the serial, letters ignored. */
    expect(transferRef("A8B8C2D3", 1)).toBe("WT-8823-01");
  });

  it("pads the sequence but never truncates it", () => {
    expect(transferRef("8823", 0)).toBe("WT-8823-00");
    expect(transferRef("8823", 9)).toBe("WT-8823-09");
    expect(transferRef("8823", 10)).toBe("WT-8823-10");
    /* Three digits stay three digits — padStart only pads. */
    expect(transferRef("8823", 100)).toBe("WT-8823-100");
  });

  it("degrades rather than throwing on a short or digit-free serial", () => {
    expect(transferRef("AB12", 1)).toBe("WT-12-01");
    /* No digits at all falls back to a literal "0" rather than an empty gap. */
    expect(transferRef("NO-DIGITS", 1)).toBe("WT-0-01");
    expect(transferRef("", 1)).toBe("WT-0-01");
  });
});

describe("giftCode", () => {
  const shape = new RegExp(`^${GIFT_CODE_PREFIX}\\d{4}-\\d{4}$`);

  it("pins the documented code", () => {
    expect(giftCode(50, "Ada")).toBe(`${GIFT_CODE_PREFIX}4150-9221`);
  });

  it("holds its shape across the amounts the screen offers", () => {
    /* £10 minimum, £500 maximum — the range the custom field advertises. */
    for (const amount of [10, 25, 50, 75, 100, 250, 500]) {
      expect(giftCode(amount, "Ada")).toMatch(shape);
    }
  });

  it("is unique per amount across that advertised range", () => {
    const codes = new Set(
      Array.from({ length: 491 }, (_, i) => giftCode(10 + i, "Ada")),
    );
    expect(codes.size).toBe(491);
  });

  it("rounds the amount, so pennies do not change the code", () => {
    expect(giftCode(50.4, "Ada")).toBe(giftCode(50, "Ada"));
    expect(giftCode(50.5, "Ada")).toBe(giftCode(51, "Ada"));
  });

  it("keys the second block on the recipient's LENGTH, not their name", () => {
    /*
     * Deliberate (the screen's header calls the code "deterministic, never
     * random"), and surprising if you assume a code identifies a card: two
     * three-letter recipients at the same amount get byte-identical codes.
     * Worth knowing before anyone treats this value as a primary key.
     */
    expect(giftCode(50, "Ada")).toBe(giftCode(50, "Bob"));
    expect(giftCode(50, "Ada")).not.toBe(giftCode(50, "Adam"));
    /* An empty recipient still yields a well-formed code. */
    expect(giftCode(50, "")).toMatch(shape);
  });

  it("silently truncates once a block passes four digits", () => {
    /*
     * `.slice(0, 4)` forces the shape rather than the value, so above £5,899
     * the first block stops encoding the amount and ten consecutive amounts
     * share a code. Out of the advertised £10–£500 range, but reachable: the
     * gift screen validates only the £10 floor, never the £500 ceiling its own
     * placeholder promises. See the report — the fix belongs in Gift.tsx.
     */
    expect(giftCode(5900, "Ada")).toBe(giftCode(5909, "Ada"));
    expect(giftCode(5900, "Ada")).toMatch(shape); // still *looks* valid
    /* Same edge on the other block, at a 115-character recipient name. */
    expect(giftCode(50, "x".repeat(116))).toBe(giftCode(50, "x".repeat(117)));
  });
});

/* ------------------------------------------------------------------ *
 * names
 * ------------------------------------------------------------------ */

describe("displayNameFromEmail", () => {
  it("splits the local part on separators and title-cases it", () => {
    expect(displayNameFromEmail("jo.smith@example.com")).toBe("Jo Smith");
    expect(displayNameFromEmail("jo_smith@example.com")).toBe("Jo Smith");
    expect(displayNameFromEmail("jo-smith@example.com")).toBe("Jo Smith");
    /* Runs of separators collapse to a single space. */
    expect(displayNameFromEmail("jo..-_smith@example.com")).toBe("Jo Smith");
  });

  it("upper-cases after any word boundary, including an apostrophe", () => {
    expect(displayNameFromEmail("jo.o'brien@example.com")).toBe("Jo O'Brien");
  });

  it("does not lower-case what it does not touch", () => {
    /* Only the first letter of each word is forced; the rest is the user's. */
    expect(displayNameFromEmail("JO.SMITH@example.com")).toBe("JO SMITH");
    expect(displayNameFromEmail("jo.mcdonald@example.com")).toBe("Jo Mcdonald");
  });

  it("treats a digit as part of the word, not a new one", () => {
    /* There is no word boundary between "2" and "s", so it stays lower-case. */
    expect(displayNameFromEmail("jo2smith@example.com")).toBe("Jo2smith");
  });

  it("survives input that is not an email", () => {
    expect(displayNameFromEmail("plainname")).toBe("Plainname");
    expect(displayNameFromEmail("")).toBe("");
    expect(displayNameFromEmail("@example.com")).toBe("");
    /* A leading separator becomes a leading space — it is not trimmed. */
    expect(displayNameFromEmail(".jo@example.com")).toBe(" Jo");
  });
});

describe("initialsFrom", () => {
  it("takes the first two characters — NOT the initials of each word", () => {
    /*
     * The obvious expectation is "JS" for "Jo Smith". The avatar rule is the
     * first two characters, so a two-word name gives "JO". Changing it would
     * silently reshuffle every avatar in the app.
     */
    expect(initialsFrom("Jo Smith")).toBe("JO");
    expect(initialsFrom("ada")).toBe("AD");
  });

  it("copes with short, empty and non-ASCII names", () => {
    expect(initialsFrom("A")).toBe("A");
    expect(initialsFrom("")).toBe("");
    expect(initialsFrom("Émile")).toBe("ÉM");
    /* A leading space is kept, so a padded name yields a one-letter avatar. */
    expect(initialsFrom(" jo")).toBe(" J");
  });
});

/* ------------------------------------------------------------------ *
 * subjects
 * ------------------------------------------------------------------ */

describe("subjectFromMessage", () => {
  const chars = (n: number) => "a".repeat(n);

  it("keeps a message of exactly 62 characters whole", () => {
    /* The threshold is > 62, so 62 passes through and 63 is cut. */
    expect(subjectFromMessage(chars(62))).toBe(chars(62));
    expect(subjectFromMessage(chars(63))).toBe(`${chars(60)}…`);
  });

  it("trims before measuring", () => {
    /* 62 characters of content plus padding is still a whole subject. */
    expect(subjectFromMessage(`   ${chars(62)}   `)).toBe(chars(62));
    expect(subjectFromMessage("   ")).toBe("");
    expect(subjectFromMessage("")).toBe("");
  });

  it("strips trailing punctuation and whitespace before the ellipsis", () => {
    const head = chars(57);
    expect(subjectFromMessage(`${head} , ${chars(20)}`)).toBe(`${head}…`);
    expect(subjectFromMessage(`${head}...${chars(20)}`)).toBe(`${head}…`);
    expect(subjectFromMessage(`${head}—-;${chars(20)}`)).toBe(`${head}…`);
    /* Only the tail of the cut is stripped — inner punctuation stays. */
    expect(subjectFromMessage(`My door, it ${chars(80)}`)).toContain(
      "My door, it",
    );
  });

  it("never returns more than 61 characters", () => {
    expect(subjectFromMessage(chars(500)).length).toBe(61);
  });
});

describe("truncateCrumb", () => {
  const chars = (n: number) => "a".repeat(n);

  it("cuts only past 52 characters, and cuts to 50 plus an ellipsis", () => {
    expect(truncateCrumb(chars(52))).toBe(chars(52));
    expect(truncateCrumb(chars(53))).toBe(`${chars(50)}…`);
    expect(truncateCrumb("Short title")).toBe("Short title");
    expect(truncateCrumb("")).toBe("");
  });

  it("does not tidy the cut, unlike the subject rule", () => {
    /* No trailing-punctuation strip here: whatever the 50th character is,
     * stays. The two truncation rules are deliberately different. */
    expect(truncateCrumb(`${chars(49)}. ${chars(10)}`)).toBe(
      `${chars(49)}.…`,
    );
  });
});

/* ------------------------------------------------------------------ *
 * numerics
 * ------------------------------------------------------------------ */

describe("percent", () => {
  it("returns a rounded whole percentage", () => {
    expect(percent(1, 4)).toBe(25);
    expect(percent(1, 3)).toBe(33);
    expect(percent(2, 3)).toBe(67);
    expect(percent(3, 3)).toBe(100);
  });

  it("guards a zero or negative total instead of returning Infinity", () => {
    expect(percent(5, 0)).toBe(0);
    expect(percent(0, 0)).toBe(0);
    expect(percent(5, -1)).toBe(0);
  });

  it("does not clamp — a value above the total goes past 100", () => {
    expect(percent(5, 4)).toBe(125);
  });

  it("rounds halves up, which is asymmetric across zero — rule 2", () => {
    expect(percent(1, 8)).toBe(13); // 12.5 → 13
    expect(percent(3, 8)).toBe(38); // 37.5 → 38
    /* -12.5 rounds to -12, not -13. */
    expect(percent(-1, 8)).toBe(-12);
  });

  it("prints a rounded percentage with no negative zero", () => {
    expect(percentText(72)).toBe("72%");
    expect(percentText(72.4)).toBe("72%");
    expect(percentText(72.5)).toBe("73%");
    expect(percentText(0)).toBe("0%");
    /* Math.round(-0.4) is -0, which stringifies without its sign. */
    expect(percentText(-0.4)).toBe("0%");
  });
});

describe("barHeight", () => {
  it("scales the value across 130px", () => {
    expect(barHeight(100, 100)).toBe(130);
    expect(barHeight(50, 100)).toBe(65);
  });

  it("floors at 6px so a tiny bar is still visible", () => {
    expect(barHeight(0, 100)).toBe(6);
    /* 4/100 * 130 is 5.2, below the floor; 5/100 is 6.5 and clears it. */
    expect(barHeight(4, 100)).toBe(6);
    expect(barHeight(5, 100)).toBe(7);
    expect(barHeight(-20, 100)).toBe(6);
  });

  it("returns the floor rather than dividing by zero", () => {
    expect(barHeight(10, 0)).toBe(6);
    expect(barHeight(10, -5)).toBe(6);
  });
});

describe("distanceMiles", () => {
  it("reads the leading number out of a distance string", () => {
    expect(distanceMiles("1.2 mi")).toBe(1.2);
    expect(distanceMiles("0.4mi")).toBe(0.4);
    expect(distanceMiles(" 2.5 mi")).toBe(2.5);
    expect(distanceMiles("12")).toBe(12);
  });

  it("returns NaN when there is no number to read", () => {
    /* Unguarded on purpose — the distances are authored data, so a NaN here
     * means the data is wrong and should show as wrong. */
    expect(distanceMiles("mi")).toBeNaN();
    expect(distanceMiles("")).toBeNaN();
  });
});
