import { DARK, LIGHT, type Palette, TYPE } from "@butter/tokens";

/**
 * The whole stylesheet, generated from tokens and inlined at build time.
 *
 * Theme handling has three states and all three are load-bearing:
 *
 *   1. bare `:root`                          the complete light palette. Every
 *                                            token gets its first definition here.
 *   2. `prefers-color-scheme: dark` guarded
 *      as `:root:not([data-theme="light"])`  the system default, which stamps no
 *                                            attribute on the root element.
 *   3. `:root[data-theme="dark"]`            an explicit choice, which has to win
 *                                            over a light system preference.
 *
 * Emitting all three from one `Palette` type is why the tokens package types
 * `DARK` as a `Palette` rather than a partial: a token that exists only in the
 * dark map has no light value at all, and the page renders one theme's text on
 * the other theme's ground.
 */

/** `ink2` → `--ink-2`, `bannerBg` → `--banner-bg`. */
function cssName(token: string): string {
  return `--${token.replace(/([a-z])([0-9A-Z])/g, "$1-$2").toLowerCase()}`;
}

function declarations(palette: Palette): string {
  return Object.entries(palette)
    .map(([token, value]) => `    ${cssName(token)}: ${value};`)
    .join("\n");
}

const THEME = `
  :root {
${declarations(LIGHT)}

    --serif: ${TYPE.serif};
    --mono: ${TYPE.mono};
    --label: ${TYPE.label};
    --measure: 34rem;
  }

  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
${declarations(DARK)}
    }
  }

  :root[data-theme="dark"] {
${declarations(DARK)}
  }
`;

const BASE = `
  * { box-sizing: border-box; }

  body {
    margin: 0;
    background: var(--paper);
    color: var(--ink);
    font-family: var(--serif);
    font-size: 18px;
    line-height: 1.65;
  }

  a { color: inherit; text-decoration-color: var(--accent-ink); text-underline-offset: 3px; }
  a:hover { text-decoration-color: currentColor; }
  a:focus-visible, summary:focus-visible { outline: 2px solid var(--accent-ink); outline-offset: 3px; }

  code { font-family: var(--mono); font-size: 0.82em; }
  h1, h2 { text-wrap: balance; font-weight: 700; }
  em { font-style: italic; }

  section, .contents, footer { max-width: 46rem; margin: 0 auto; padding: 0 1.5rem; }
  .prose { max-width: var(--measure); }
  .prose p { margin: 0 0 1rem; }
  .prose p:last-child { margin-bottom: 0; }
  /* Two prose blocks in a row are one piece of writing split around something
     that sits between them in the source but not on the page. The last-child
     rule above zeroes the gap at the seam, so it is put back here — otherwise
     the two paragraphs either side of it run together as if they were one. */
  .prose + .prose { margin-top: 1rem; }
  .prose .lede { color: var(--ink-2); }

  /* The page's headings are butter — Cream, The churn, Buttermilk. The deck is
     the plain line under each one that says what the section actually is, so a
     reader scanning for CI can still find it. */
  .deck {
    margin: -0.7rem 0 1.4rem;
    max-width: var(--measure);
    font-size: 1.02rem;
    font-style: italic;
    color: var(--ink-2);
  }

  .prose h3 {
    margin: 2rem 0 0.8rem;
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--accent-ink);
  }
  .prose ul, .prose ol { margin: 0 0 1rem; padding-left: 1.4rem; }
  .prose li { margin-bottom: 0.5rem; }
  .prose li:last-child { margin-bottom: 0; }
  .prose ol { padding-left: 1.6rem; }
  .prose ol li::marker { font-variant-numeric: tabular-nums; color: var(--ink-3); }
`;

/**
 * One field of butter, then paper the rest of the way. The colour earns its
 * strength by not being repeated — a second yellow panel further down would
 * turn it into a pattern and cost it the emphasis.
 */
const BANNER = `
  /* A centred grid column rather than \`max-width\` + \`margin: auto\` on each
     child: the children set their own margins, and a margin shorthand on a
     more specific selector silently wins over the auto centring. Column width
     is 46rem minus the banner's own padding, so the header lines up with the
     sections below it. */
  .banner {
    background: var(--banner-bg);
    color: var(--banner-ink);
    padding: 3.5rem 1.5rem 3rem;
    display: grid;
    grid-template-columns: minmax(0, 43rem);
    justify-content: center;
  }

  .name {
    margin: 0 0 1.5rem;
    font-family: var(--mono);
    font-size: 0.8rem;
    letter-spacing: 0.14em;
    text-transform: lowercase;
  }

  .banner h1 {
    margin: 0;
    font-size: clamp(2rem, 5.2vw, 3.1rem);
    line-height: 1.08;
    letter-spacing: -0.015em;
  }

  .banner .lede {
    max-width: var(--measure);
    margin: 1.5rem 0 0;
    font-size: 1.05rem;
    color: var(--banner-ink-2);
  }
  .banner .lede code { background: rgba(20, 38, 79, 0.1); padding: 0.05em 0.3em; }

  .banner .proof {
    max-width: var(--measure);
    margin: 0.6rem 0 0;
    font-size: 1.05rem;
    font-style: italic;
  }

  .banner .versions {
    margin: 1.6rem 0 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem 1.4rem;
    font-family: var(--mono);
    font-size: 0.72rem;
    letter-spacing: 0.06em;
    color: var(--banner-ink-2);
  }
  .version { font-variant-numeric: tabular-nums; }

  .contents {
    padding-top: 2.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem 1.4rem;
    font-family: var(--mono);
    font-size: 0.78rem;
  }
  .contents a { color: var(--ink-2); text-decoration: none; }
  .contents a:hover { color: var(--ink); text-decoration: underline; }
`;

const SECTIONS = `
  /* \`flow-root\` so a section contains its own floats. Without it the label
     floats out of Cream and into the top of the next section, and what wraps
     around it there is that section's heading. */
  section { padding-top: 4rem; display: flow-root; }

  section > h2 {
    margin: 0 0 1.2rem;
    font-size: 1.6rem;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  footer {
    margin-top: 5rem;
    padding-top: 1.5rem;
    padding-bottom: 5rem;
  }
  footer p {
    max-width: 46rem;
    margin: 0;
    padding-top: 1.5rem;
    border-top: 1px solid var(--rule);
    font-family: var(--mono);
    font-size: 0.78rem;
    color: var(--ink-3);
  }
  footer a { color: var(--ink-2); }
`;

const CODE = `
  .term, .code {
    font-family: var(--mono);
    font-size: 0.78rem;
    line-height: 1.85;
    overflow-x: auto;
    white-space: pre;
    -webkit-text-size-adjust: 100%;
  }

  .term {
    margin: 1.6rem 0 0;
    padding: 1rem 1.1rem;
    background: var(--term-bg);
    color: var(--term-ink);
    border-radius: 2px;
  }
  .term i { font-style: normal; color: var(--accent); }
  .term u { text-decoration: none; color: var(--term-dim); }
  .banner .term { margin-top: 2rem; }

  .snippet { margin: 1.6rem 0 0; }
  .snippet figcaption {
    padding-bottom: 0.4rem;
    font-family: var(--mono);
    font-size: 0.72rem;
    color: var(--ink-3);
  }
  .code {
    margin: 0;
    padding: 1rem 1.1rem;
    background: var(--sunken);
    color: var(--ink);
    border-radius: 2px;
  }
`;

const LABEL = `
  /* A printed panel sitting on the page, not the page dressing up as one. The
     rule weights are the hierarchy — heavy bar between the name key and
     everything else, hairlines between rows — which is how a real label carries
     structure without a legend. */
  .label {
    margin: 1.8rem 0;
    padding: 0.7rem 0.9rem 0.9rem;
    max-width: 25rem;
    background: var(--label-bg);
    color: var(--label-ink);
    border: 3px solid var(--label-ink);
    font-family: var(--label);
  }

  /* Floated into the margin, so the commentary reads AROUND the tin rather than
     after it, and pulled past the column edge so it sits on the page like
     something stuck there rather than something set in the copy.

     The 4.5rem overhang spends the section's own 1.5rem of padding first, so
     only 3rem lands outside the 46rem column — which needs a viewport of about
     52rem to have somewhere to land. Below the breakpoint the float is dropped
     entirely: the alternative is a page that scrolls sideways on a phone, and
     the label is perfectly happy as a block.

     Text wraps to roughly 25rem beside it. That is short for a measure and it
     is the trade being made; the section's own body is the only prose that
     pays it, and it is commentary rather than the argument. */
  @media (min-width: 62rem) {
    .label {
      float: right;
      width: 21rem;
      max-width: none;
      margin: 0.4rem -4.5rem 1.4rem 2.5rem;
    }
  }
  .ltitle {
    margin: 0;
    font-size: clamp(1.7rem, 4.6vw, 2.2rem);
    font-weight: 800;
    letter-spacing: -0.025em;
    line-height: 0.95;
  }
  .lserving { margin: 0.15rem 0 0; font-size: 0.78rem; }
  .lserving b { font-weight: 700; }

  /* Not currentColor: the UA stylesheet gives <hr> its own \`color: gray\`, which
     beats inheritance and turns every rule in the panel grey. */
  .label hr { border: 0; margin: 0.3rem 0; background: var(--label-ink); }
  .label hr.hair { height: 1px; }
  .label hr.mid { height: 5px; }
  .label hr.thick { height: 9px; }

  .lhead {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.8rem;
    font-size: 0.82rem;
    font-weight: 700;
  }
  .lamount { font-size: 0.72rem; padding-bottom: 0.15rem; }
  .lrow { padding: 0.3rem 0; border-bottom: 1px solid var(--label-ink); }
  .lrow:last-of-type { border-bottom: 0; }
  .lrow.sub { padding-left: 1rem; }
  .lrow.sub .lhead { font-weight: 400; }
  /* The word's own first character, not a letter standing in a gutter beside
     it — so neither the inline-block nor the min-width that used to reserve
     that gutter, both of which set the letter apart, which is the thing being
     undone. It stays a shade heavier than the word it starts, so the acronym
     still reads at a glance. */
  .letter { font-weight: 800; color: var(--accent-ink); }
  .ldetail { margin: 0.1rem 0 0; font-size: 0.72rem; line-height: 1.35; }
  .lrow.sub .ldetail { padding-left: 0; }
  .lfree {
    margin: 0.5rem 0 0;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }
`;

const LISTS = `

  .layers { margin-top: 1.6rem; }
  .layer { padding: 0.75rem 0; border-top: 1px solid var(--rule); }
  .layer:last-child { border-bottom: 1px solid var(--rule); }
  .layer summary {
    cursor: pointer;
    display: flex;
    align-items: baseline;
    gap: 0.8rem;
    list-style: none;
  }
  .layer summary::-webkit-details-marker { display: none; }
  .layer b { font-weight: 700; }
  .layer i {
    font-style: normal;
    margin-left: auto;
    font-family: var(--mono);
    font-size: 0.72rem;
    color: var(--ink-3);
  }
  .layer[open] summary b { color: var(--accent-ink); }
  .layer p {
    margin: 0.8rem 0 0;
    max-width: var(--measure);
    color: var(--ink-2);
  }

  /* The shapes, always open. The layers above them collapse because there are
     more of them and a tag line is enough to scan by; here the links at the
     bottom of each block are the point, so folding them away would hide the
     only part a reader can click through to. */
  .moulds { margin-top: 1.6rem; }
  .mould { padding: 1.1rem 0; border-top: 1px solid var(--rule); }
  .mould:last-child { border-bottom: 1px solid var(--rule); }
  .mould h3 {
    margin: 0;
    display: flex;
    align-items: baseline;
    gap: 0.8rem;
    font-size: 1.05rem;
  }
  .mould b { font-weight: 700; color: var(--accent-ink); }
  .mould i {
    font-style: normal;
    margin-left: auto;
    font-family: var(--mono);
    font-size: 0.72rem;
    color: var(--ink-3);
  }
  .mould p {
    margin: 0.8rem 0 0;
    max-width: var(--measure);
    color: var(--ink-2);
  }

  /* The apps are data, and they read as data: monospace, dim, and wrapping
     rather than scrolling, because these are repository paths on a page that
     has to survive a phone. */
  .apps {
    margin: 1rem 0 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem 1.2rem;
    font-family: var(--mono);
    font-size: 0.72rem;
  }
  /* --ink-2, not the --ink-3 the tag line uses: these are the only links in the
     section and they are 0.72rem, where --ink-3 on light paper is about 3.3:1
     and misses AA. The tag beside them is decoration and can be dimmer; a link
     a reader is meant to follow cannot be. */
  .apps a { color: var(--ink-2); }
  .apps a:hover { color: var(--ink); }

  .prose.outro { margin-top: 1.8rem; }

  .exclusions { margin: 1.6rem 0 0; }
  .exclusions > div { padding: 0.7rem 0; border-top: 1px solid var(--rule); }
  .exclusions > div:last-child { border-bottom: 1px solid var(--rule); }
  .exclusions dt { margin: 0; font-weight: 700; }
  .exclusions dd { margin: 0; max-width: var(--measure); color: var(--ink-2); }
`;

export const styles = [THEME, BASE, BANNER, SECTIONS, CODE, LABEL, LISTS].join(
  "\n",
);
