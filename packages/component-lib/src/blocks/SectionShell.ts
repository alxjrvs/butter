import { escapeHtml, type Html, html } from "@butter/core";

export type SectionShellProps = {
  /** matches a `SectionRef.id`, so the rail's anchors resolve */
  readonly id: string;
  /** which tablespoon this is, 1–8 */
  readonly tbsp: number;
  readonly label: string;
  readonly heading: string;
  readonly body: Html;
};

/**
 * The chrome every tablespoon shares: anchor, eyebrow, heading, body.
 *
 * Sections compose this rather than each writing their own `<section>`, which
 * is what keeps the heading hierarchy and the anchor convention in one place
 * instead of eight.
 */
export function SectionShell(props: SectionShellProps): Html {
  return html(`  <section id="${escapeHtml(props.id)}">
    <p class="sec-label"><span>Tbsp ${String(props.tbsp)}</span>${escapeHtml(props.label)}</p>
    <h2>${escapeHtml(props.heading)}</h2>
${props.body}
  </section>`);
}
