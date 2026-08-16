import { escapeHtml, type Html, html } from "@butter/core";

export type SectionShellProps = {
  /** matches a `SectionRef.id`, so the contents line's anchors resolve */
  readonly id: string;
  readonly heading: string;
  /** plain English, under a heading that is not */
  readonly deck: string;
  readonly body: Html;
};

/**
 * Anchor, heading, deck, body.
 *
 * The deck is the load-bearing half. The page's headings are butter all the way
 * down — Cream, The churn, Buttermilk — which is fun exactly once and useless
 * to a reader scanning for the section about CI. Pairing every one of them with
 * a plain line saying what it actually is buys the voice without charging the
 * reader for it, so the deck is required rather than optional.
 */
export function SectionShell(props: SectionShellProps): Html {
  return html(`  <section id="${escapeHtml(props.id)}">
    <h2>${escapeHtml(props.heading)}</h2>
    <p class="deck">${escapeHtml(props.deck)}</p>
${props.body}
  </section>`);
}
