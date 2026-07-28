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
 *   1. `money` is always two decimals; `moneyLoose` drops `.00` only on whole
 *      numbers. Swapping one for the other changes every price on the site.
 *   2. Rounding is JS rounding: `Math.round` breaks ties toward +∞, so it is
 *      NOT symmetric across zero, and `toFixed` rounds the binary double, not
 *      the decimal you typed. Both are pinned below.
 *   3. Negative money uses a real U+2212 MINUS SIGN in `signedMoney` and a
 *      plain hyphen everywhere else. That is a deliberate split, not a slip.
 *   4. The reference generators are pure functions of a count, so their whole
 *      job is to be unique across the range the app can actually produce.
 *      Each one is swept over its reachable domain here.
 */

import { describe, expect, it } from "vitest";
import { CODE_PREFIX, GIFT_CODE_PREFIX, SURVEY_TAGS } from "../data/demo.ts";
import {
  NOW_STAMP,
  articleCount,
  barHeight,
  claimRef,
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
  pluralise,
  poundsWhole,
  readTime,
  readTimeShort,
  recycleRef,
  relativeTime,
  repairRef,
  resultCount,
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

  it("prints negatives with a plain hyphen, after the pound sign", () => {
    /*
     * `-£12.00` would be the typographically correct form; `money` produces
     * `£-12.00` because it interpolates the raw number. Only `signedMoney`
     * moves the sign in front of the symbol — see the signedMoney block.
     */
    expect(money(-12)).toBe("£-12.00");
    /* Negative zero loses its sign in `toFixed`, so no "£-0.00" ever appears. */
    expect(money(-0)).toBe("£0.00");
  });

  it("rounds the binary double, not the decimal literal", () => {
    /*
     * The obvious answer for 1.005 is "1.01" and it is wrong: the nearest
     * double to 1.005 is slightly *below* it, so `toFixed` rounds down. 12.005
     * happens to land slightly above and rounds up. Anyone "fixing" this pair
     * to be consistent is fixing IEEE 754, not this function.
     */
    expect(money(1.005)).toBe("£1.00");
    expect(money(2.675)).toBe("£2.67");
    expect(money(12.005)).toBe("£12.01");
    /* Straightforward halves still round up. */
    expect(money(1.015)).toBe("£1.01"); // also below the half, in binary
    expect(money(0.125)).toBe("£0.13"); // exactly representable, ties up
  });

  it("truncates nothing and groups nothing at four figures and beyond", () => {
    /*
     * Deliberate: the module header rules out `Intl.NumberFormat` so the demo
     * renders identically on every machine. The cost is no thousands
     * separator — £1234.50, not £1,234.50.
     */
    expect(money(1234.5)).toBe("£1234.50");
    expect(money(1_000_000)).toBe("£1000000.00");
  });

  it("hands back whatever `toFixed` does for absurd magnitudes", () => {
    /* Above 1e21 `toFixed` gives up and returns exponential notation. There is
     * no guard, and no reachable path that produces such a price. */
    expect(money(1e21)).toBe("£1e+21");
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
    expect(moneyLoose(-50)).toBe("£-50");
    expect(moneyLoose(-12.5)).toBe("£-12.50");
  });

  it("shows £0.00 for a non-zero amount below half a penny", () => {
    /*
     * Not a rounding bug so much as a rounding consequence: the fraction makes
     * it take the two-decimal branch, and two decimals of 0.004 is 0.00. The
     * gift-card screen's custom field is the only way to type such a value.
     */
    expect(moneyLoose(0.004)).toBe("£0.00");
  });
});

describe("poundsWhole", () => {
  it("rounds to whole pounds", () => {
    expect(poundsWhole(149)).toBe("£149");
    expect(poundsWhole(149.4)).toBe("£149");
    expect(poundsWhole(149.5)).toBe("£150");
  });

  it("breaks ties toward +∞, so negatives round the other way — rule 2", () => {
    /* Math.round(-149.5) is -149, not -150. Symmetry is the intuitive answer
     * and the wrong one. */
    expect(poundsWhole(-149.5)).toBe("£-149");
    expect(poundsWhole(-150.5)).toBe("£-150");
  });

  it("never prints a negative zero", () => {
    /* Math.round(-0.4) is -0, but template interpolation stringifies it "0". */
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
  it("uses a real U+2212 MINUS SIGN for negatives, before the symbol", () => {
    expect(signedMoney(-129)).toBe("−£129.00");
    /* Spelled out so a hyphen substitution cannot pass unnoticed. */
    expect(signedMoney(-1).charCodeAt(0)).toBe(0x2212);
    expect(signedMoney(-1)).not.toContain("-");
  });

  it("leaves positives and zero unsigned", () => {
    expect(signedMoney(129)).toBe("£129.00");
    expect(signedMoney(0)).toBe("£0.00");
    /* -0 < 0 is false, so negative zero takes the positive branch. */
    expect(signedMoney(-0)).toBe("£0.00");
  });

  it("agrees with `money` on magnitude", () => {
    expect(signedMoney(-12.345)).toBe(`−${money(12.345)}`);
  });
});

/* ------------------------------------------------------------------ *
 * counting
 * ------------------------------------------------------------------ */

describe("pluralise", () => {
  it("uses the singular at exactly one and the plural everywhere else", () => {
    expect(pluralise(0, "ticket")).toBe("0 tickets");
    expect(pluralise(1, "ticket")).toBe("1 ticket");
    expect(pluralise(2, "ticket")).toBe("2 tickets");
  });

  it("pluralises fractions and negatives — only 1 exactly is singular", () => {
    expect(pluralise(1.5, "ticket")).toBe("1.5 tickets");
    /* English agrees: "-1 degrees". */
    expect(pluralise(-1, "ticket")).toBe("-1 tickets");
    expect(pluralise(1.0, "ticket")).toBe("1 ticket");
  });

  it("takes an irregular plural", () => {
    expect(pluralise(2, "reply", "replies")).toBe("2 replies");
    expect(pluralise(1, "reply", "replies")).toBe("1 reply");
  });

  it("honours an empty override, because the fallback is ?? not ||", () => {
    /* `"" ?? x` is "", so an empty plural really does suppress the noun. */
    expect(pluralise(2, "ticket", "")).toBe("2 ");
  });

  it("wires the two named counters through the same rule", () => {
    expect(resultCount(1)).toBe("1 result");
    expect(resultCount(4)).toBe("4 results");
    expect(articleCount(1)).toBe("1 article");
    expect(articleCount(0)).toBe("0 articles");
  });
});

describe("read times", () => {
  it("never pluralises the unit — 'min' is an abbreviation, not a count", () => {
    expect(readTime(1)).toBe("1 min read");
    expect(readTime(5)).toBe("5 min read");
    expect(readTimeShort(1)).toBe("1 min");
    expect(readTime(0)).toBe("0 min read");
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
    expect(warrantyExpiry(new Date(2026, 6, 27))).toBe("27 Jul 2029");
    expect(warrantyExpiry(new Date(2019, 0, 1))).toBe("27 Jul 2022");
  });

  it("keeps the day and month fixed whatever the clock says", () => {
    /*
     * Counter-intuitive but correct: the comp derives the expiry as
     * `'27 Jul ' + (year + 3)`, so a device registered on New Year's Day still
     * expires "27 Jul". Deriving the real anniversary would be a behaviour
     * change, not a bug fix.
     */
    expect(warrantyExpiry(new Date(2026, 11, 31))).toBe("27 Jul 2029");
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
