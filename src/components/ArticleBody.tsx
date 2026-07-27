/*
 * ArticleBody — the block renderer for the article body DSL (port spec §6.4
 * step 5). Six block kinds: p, h, ul, ol, tip, warn.
 */

import { Callout } from "./Primitives";
import type { BodyBlock } from "../data/types";

export interface ArticleBodyProps {
  /** From `dataSource.articleBody(id)`. */
  blocks: BodyBlock[];
  className?: string;
}

/** `<ArticleBody blocks={dataSource.articleBody(articleId)} />` */
export function ArticleBody({ blocks, className }: ArticleBodyProps) {
  return (
    <article className={`body-blocks${className ? ` ${className}` : ""}`}>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h":
            return <h2 key={i}>{b.x}</h2>;
          case "ul":
            return (
              <ul key={i}>
                {b.x.map((li, j) => (
                  <li key={j}>{li}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                {b.x.map((li, j) => (
                  <li key={j}>{li}</li>
                ))}
              </ol>
            );
          case "tip":
            return (
              <Callout key={i} tone="info" icon="lightbulb" eyebrow="Tip">
                {b.x}
              </Callout>
            );
          case "warn":
            return (
              <Callout key={i} tone="warn" icon="alert-triangle" eyebrow="Heads up">
                {b.x}
              </Callout>
            );
          case "p":
          default:
            return <p key={i}>{b.x}</p>;
        }
      })}
    </article>
  );
}

export default ArticleBody;
