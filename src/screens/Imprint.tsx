/*
 * `imprint` — legally-required company information (port spec §6.38).
 * Max-width 760. Fully static: no state, no handlers, no `imprintVals()`.
 *
 * Every detail is fictional, which the closing callout says out loud.
 *
 * The terms on the left are UI labels and are keyed; the values on the right
 * are the fictional record itself — company name, postal address, personal
 * names, registration numbers, e-mail and phone — and stay as authored (§3.4).
 */

import { Callout } from "../components";
import type { ReactNode } from "react";
import { useT, type MessageKey } from "../i18n";
import { longDate } from "../lib/format";
import "../styles/screen-imprint.css";

interface Detail {
  /** Message key for the term; the value beside it is verbatim record data. */
  term: MessageKey;
  value: ReactNode;
  mono?: boolean;
}

/** The one director who is also named as responsible for the content. */
const CONTENT_LEAD = "Priya Raghunathan";

/** Last substantive edit to this page. */
const UPDATED = new Date(2026, 4, 14);

const PROSE: { heading: MessageKey; body: MessageKey }[] = [
  { heading: "screensA.imprint.h2Adr", body: "screensA.imprint.bodyAdr" },
  { heading: "screensA.imprint.h2Content", body: "screensA.imprint.bodyContent" },
  { heading: "screensA.imprint.h2Links", body: "screensA.imprint.bodyLinks" },
  {
    heading: "screensA.imprint.h2Copyright",
    body: "screensA.imprint.bodyCopyright",
  },
];

export default function Imprint() {
  const t = useT();

  const details: Detail[] = [
    { term: "screensA.imprint.termCompany", value: "Hearth Home Ltd." },
    {
      term: "screensA.imprint.termAddress",
      value:
        "Unit 4, Ellery Works, 24 Ellery Lane, Bristol BS1 4TR, United Kingdom",
    },
    /* The comp named this founder after the brand; de-branded to a plain name. */
    {
      term: "screensA.imprint.termDirectors",
      value: `Nils Vandermeer, ${CONTENT_LEAD}`,
    },
    { term: "screensA.imprint.termNumber", value: "09241886", mono: true },
    { term: "screensA.imprint.termVat", value: "GB 412 9930 77", mono: true },
    {
      term: "screensA.imprint.termContact",
      value: (
        <>
          help@hearth.example
          <br />
          +44 117 496 0110
        </>
      ),
      mono: true,
    },
    {
      term: "screensA.imprint.termResponsible",
      value: t("screensA.imprint.responsibleValue", { name: CONTENT_LEAD }),
    },
  ];

  return (
    <main className="fx-screen fx-page w-760 imp">
      <h1 className="imp__h1">{t("screensA.imprint.h1")}</h1>
      <p className="imp__lede">{t("screensA.imprint.lede")}</p>
      <p className="imp__date">
        {t("screensA.imprint.updated", { date: longDate(UPDATED) })}
      </p>

      <dl className="imp__table">
        {details.map((d) => (
          <div className="imp__row" key={d.term}>
            <dt className="imp__term">{t(d.term)}</dt>
            <dd className={`imp__value${d.mono ? " imp__value--mono" : ""}`}>
              {d.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="imp__prose">
        {PROSE.map((p) => (
          <section key={p.heading}>
            <h2 className="imp__h2">{t(p.heading)}</h2>
            <p className="imp__body">{t(p.body)}</p>
          </section>
        ))}

        <Callout tone="info" icon="info">
          {t("screensA.imprint.callout")}
        </Callout>
      </div>
    </main>
  );
}
