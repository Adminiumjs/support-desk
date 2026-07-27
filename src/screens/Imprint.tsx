/*
 * `imprint` — legally-required company information (port spec §6.38).
 * Max-width 760. Fully static: no state, no handlers, no `imprintVals()`.
 *
 * Every detail is fictional, which the closing callout says out loud.
 */

import { Callout } from "../components";
import type { ReactNode } from "react";
import "../styles/screen-imprint.css";

interface Detail {
  term: string;
  value: ReactNode;
  mono?: boolean;
}

const DETAILS: Detail[] = [
  { term: "Registered company", value: "Hearth Home Ltd." },
  {
    term: "Registered address",
    value: "Unit 4, Ellery Works, 24 Ellery Lane, Bristol BS1 4TR, United Kingdom",
  },
  /* The comp named this founder after the brand; de-branded to a plain name. */
  { term: "Managing directors", value: "Nils Vandermeer, Priya Raghunathan" },
  { term: "Company number", value: "09241886", mono: true },
  { term: "VAT ID", value: "GB 412 9930 77", mono: true },
  {
    term: "Contact",
    value: (
      <>
        help@hearth.example
        <br />
        +44 117 496 0110
      </>
    ),
    mono: true,
  },
  { term: "Responsible for content", value: "Priya Raghunathan, address as above" },
];

interface Prose {
  heading: string;
  body: string;
}

const PROSE: Prose[] = [
  {
    heading: "Consumer dispute resolution",
    body: "We take part in the independent Retail ADR scheme. If we can't settle a complaint between us, you can refer it to Retail ADR free of charge. Our support team will send you the case reference and forms on request.",
  },
  {
    heading: "Liability for content",
    body: "We prepare the content of these pages with care, but we can't guarantee that every article stays accurate as firmware and app versions change. Where an article conflicts with the printed safety guide in the box, the printed guide takes precedence.",
  },
  {
    heading: "Liability for links",
    body: "Some articles link to carrier tracking, app stores, or community posts we don't control. We check external links when we add them, but we aren't responsible for what changes on those pages later.",
  },
  {
    heading: "Copyright",
    body: "All text, illustrations, and product photography on this site belong to Hearth Home Ltd. unless stated otherwise. You're welcome to quote a help article with a link back; please ask before reproducing a full page.",
  },
];

export default function Imprint() {
  return (
    <main className="oh-screen oh-page w-760 imp">
      <h1 className="imp__h1">Imprint</h1>
      <p className="imp__lede">
        Legally required company information for Hearth Home Ltd. and this
        website.
      </p>
      <p className="imp__date">Last updated 14 May 2026</p>

      <dl className="imp__table">
        {DETAILS.map((d) => (
          <div className="imp__row" key={d.term}>
            <dt className="imp__term">{d.term}</dt>
            <dd className={`imp__value${d.mono ? " imp__value--mono" : ""}`}>
              {d.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="imp__prose">
        {PROSE.map((p) => (
          <section key={p.heading}>
            <h2 className="imp__h2">{p.heading}</h2>
            <p className="imp__body">{p.body}</p>
          </section>
        ))}

        <Callout tone="info" icon="info">
          This is a demo portal built with Adminium. Every company detail,
          address, and registration number on this page is fictional.
        </Callout>
      </div>
    </main>
  );
}
