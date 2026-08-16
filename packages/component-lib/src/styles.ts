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

/** `ink2` → `--ink-2`, `wrapBg` → `--wrap-bg`. */
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

    --slab: ${TYPE.slab};
    --band: ${TYPE.band};
    --body: ${TYPE.body};
    --mono: ${TYPE.mono};

    --measure: 68ch;
    --rail: 88px;
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
    font-family: var(--body);
    font-size: 16px;
    line-height: 1.62;
    -webkit-font-smoothing: antialiased;
  }

  a { color: var(--link); text-underline-offset: 2px; }
  a:focus-visible, summary:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  code { font-family: var(--mono); font-size: 0.88em; }
  h1, h2, h3 { text-wrap: balance; }
  em { font-style: normal; font-weight: 700; }
`;

/**
 * The rail is the scored edge of the stick on wide screens and a horizontal
 * strip on narrow ones — one element, two presentations, because two navs
 * would be two things to keep in step.
 */
const SHELL = `
  .shell { display: block; }

  main {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 24px 96px;
  }

  .rail {
    position: sticky;
    top: 0;
    z-index: 2;
    display: flex;
    overflow-x: auto;
    background: var(--paper);
    border-bottom: 2px solid var(--hard);
  }
  .rail a {
    flex: 1 0 auto;
    display: flex;
    align-items: baseline;
    gap: 6px;
    padding: 9px 13px;
    text-decoration: none;
    color: var(--ink2);
    border-right: 1px solid var(--rule);
    font-family: var(--mono);
    font-size: 11.5px;
    white-space: nowrap;
  }
  .rail a:last-child { border-right: 0; }
  .rail a:hover { color: var(--ink); background: var(--sunken); }
  .rail b { color: var(--accent-ink); font-weight: 700; }
  .rail span { letter-spacing: 0.02em; }

  @media (min-width: 1080px) {
    .shell {
      display: grid;
      grid-template-columns: var(--rail) minmax(0, 1fr);
    }
    main { margin: 0; padding: 0 32px 120px; }
    .rail {
      flex-direction: column;
      height: 100dvh;
      overflow: hidden;
      border-bottom: 0;
      border-right: 2px solid var(--hard);
    }
    .rail a {
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      padding: 4px;
      border-right: 0;
      border-bottom: 1px solid var(--hard);
      font-size: 9.5px;
    }
    .rail a:last-child { border-bottom: 0; }
    .rail b { font-size: 15px; }
  }
`;

const WRAPPER = `
  .wrapper {
    margin-top: 40px;
    padding: 30px 26px 26px;
    background: var(--wrap-bg);
    color: var(--wrap-ink);
    border: 2px solid var(--wrap-rule);
  }
  @media (min-width: 720px) { .wrapper { padding: 40px 36px 32px; } }

  .band {
    margin: 0 0 24px;
    padding: 5px 0;
    border-top: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
    font-family: var(--band);
    font-weight: 700;
    font-size: 11.5px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
  }

  .wrapper h1 {
    margin: 0;
    font-family: var(--slab);
    font-weight: 700;
    font-size: clamp(36px, 7vw, 70px);
    line-height: 0.94;
    letter-spacing: -0.022em;
  }

  .glyphs { display: flex; flex-wrap: wrap; gap: 4px 0; margin-top: 22px; }
  .glyph { display: inline-flex; align-items: center; }
  .glyph b {
    font-family: var(--slab);
    font-weight: 700;
    font-size: 13px;
    background: var(--wrap-ink);
    color: var(--wrap-bg);
    padding: 4px 7px;
  }
  .glyph i {
    font-style: normal;
    font-family: var(--band);
    font-weight: 700;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--wrap-ink2);
    padding: 0 14px 0 4px;
  }

  .wrapper-lede { max-width: 56ch; margin-top: 22px; color: var(--wrap-ink2); }
  .wrapper-lede p { margin: 0; font-size: 16.5px; }
  .wrapper-lede .proof { margin-top: 8px; font-weight: 700; }
  .wrapper-lede code { background: color-mix(in srgb, currentColor 12%, transparent); padding: 1px 4px; }

  .wrapper-versions {
    margin: 20px 0 0;
    padding-top: 14px;
    border-top: 2px solid currentColor;
    display: flex;
    gap: 8px 22px;
    flex-wrap: wrap;
    font-family: var(--mono);
    font-size: 10.5px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--wrap-ink2);
  }
  .version { font-variant-numeric: tabular-nums; }
`;

const SECTIONS = `
  section { padding-top: 76px; }

  .sec-label {
    margin: 0 0 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--mono);
    font-size: 10.5px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent-ink);
  }
  .sec-label span {
    background: var(--accent);
    color: #101b3e;
    padding: 2px 7px;
    font-weight: 700;
  }

  section > h2 {
    margin: 0 0 20px;
    max-width: 24ch;
    font-family: var(--slab);
    font-weight: 700;
    font-size: clamp(26px, 3.6vw, 36px);
    line-height: 1.1;
    letter-spacing: -0.015em;
  }

  .prose { max-width: var(--measure); display: flex; flex-direction: column; gap: 15px; }
  .prose p { margin: 0; }
  .prose strong { font-weight: 700; }
  .prose .lede { font-size: 17.5px; color: var(--ink2); }

  footer {
    margin-top: 96px;
    padding-top: 20px;
    border-top: 2px solid var(--hard);
  }
  footer .stamp, footer p {
    margin: 0;
    font-family: var(--mono);
    font-size: 11px;
    line-height: 1.9;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--ink3);
  }
`;

const TERMINAL = `
  .term {
    margin: 22px 0 0;
    padding: 14px 16px;
    background: var(--term-bg);
    color: var(--term-ink);
    font-family: var(--mono);
    font-size: 12.5px;
    line-height: 1.8;
    overflow-x: auto;
    white-space: pre;
  }
  .term i { font-style: normal; color: var(--term-accent); }
  .term u { text-decoration: none; color: var(--term-dim); }
  .wrapper .term { margin-top: 24px; }

  .snippet { margin: 22px 0 0; }
  .snippet figcaption {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: var(--ink3);
    padding-bottom: 6px;
  }
  .code {
    margin: 0;
    padding: 14px 16px;
    background: var(--sunken);
    border: 1px solid var(--rule2);
    color: var(--ink);
    font-family: var(--mono);
    font-size: 12.5px;
    line-height: 1.7;
    overflow-x: auto;
    white-space: pre;
  }
`;

const PANEL = `
  .panel-hold { display: grid; gap: 26px; align-items: start; }
  @media (min-width: 900px) { .panel-hold { grid-template-columns: 420px minmax(0, 1fr); } }

  .facts {
    background: var(--panel-bg);
    color: var(--panel-ink);
    border: 3px solid var(--panel-ink);
    padding: 11px 13px 13px;
  }
  .facts-title {
    margin: 0;
    font-family: var(--slab);
    font-weight: 700;
    font-size: clamp(27px, 4.6vw, 37px);
    line-height: 0.92;
    letter-spacing: -0.02em;
  }
  .facts-serving { margin: 4px 0 0; font-size: 12px; font-weight: 700; }
  /* Not currentColor: the UA stylesheet gives <hr> its own \`color: gray\`, which
     wins over inheritance and turns every rule in the panel grey. */
  .facts hr { border: 0; height: 1px; background: var(--panel-ink); margin: 5px 0; }
  .facts hr.mid { height: 5px; }
  .facts hr.thick { height: 10px; }
  .facts-amount { margin: 3px 0; font-size: 11.5px; font-weight: 700; }
  .facts-dv { margin: 3px 0 2px; font-size: 11px; font-weight: 700; text-align: right; }
  .facts .row {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 3px 0 3px 15px;
    border-bottom: 1px solid currentColor;
    font-size: 12.5px;
  }
  .facts .row.lead { padding-left: 0; font-weight: 700; }
  .facts .row:last-of-type { border-bottom: 0; }
  .facts .row span {
    flex: none;
    font-family: var(--mono);
    font-size: 11.5px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  .facts-free {
    margin: 8px 0 0;
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }
`;

const LISTS = `
  .layers { margin-top: 24px; border-bottom: 1px solid var(--rule); }
  .layer { border-top: 1px solid var(--rule); padding: 12px 0; }
  .layer summary {
    cursor: pointer;
    display: flex;
    align-items: baseline;
    gap: 12px;
    list-style: none;
  }
  .layer summary::-webkit-details-marker { display: none; }
  .layer summary::before {
    content: "+";
    font-family: var(--mono);
    font-weight: 700;
    color: var(--accent-ink);
  }
  .layer[open] summary::before { content: "\\2212"; }
  .layer b { font-family: var(--slab); font-size: 16.5px; }
  .layer i {
    font-style: normal;
    margin-left: auto;
    font-family: var(--mono);
    font-size: 11.5px;
    color: var(--ink3);
  }
  .layer p {
    margin: 12px 0 0 24px;
    max-width: var(--measure);
    font-size: 15px;
    color: var(--ink2);
  }

  .exclusions { margin: 24px 0 0; border-top: 2px solid var(--hard); }
  .exclusions > div {
    display: grid;
    gap: 2px 22px;
    padding: 11px 0;
    border-bottom: 1px solid var(--rule);
  }
  @media (min-width: 640px) { .exclusions > div { grid-template-columns: 190px minmax(0, 1fr); } }
  .exclusions dt { margin: 0; font-family: var(--mono); font-size: 13.5px; font-weight: 700; }
  .exclusions dd { margin: 0; font-size: 15px; color: var(--ink2); max-width: 62ch; }

  .ingredients {
    margin-top: 24px;
    padding: 16px 18px;
    background: var(--sunken);
    border: 1px solid var(--rule2);
  }
  .ingredients h3 {
    margin: 0 0 9px;
    font-family: var(--band);
    font-weight: 700;
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent-ink);
  }
  .ingredients p {
    margin: 0;
    font-size: 12.5px;
    line-height: 1.65;
    text-transform: uppercase;
  }
  .ingredients .free { margin-top: 9px; font-weight: 700; }
`;

export const styles = [
  THEME,
  BASE,
  SHELL,
  WRAPPER,
  SECTIONS,
  TERMINAL,
  PANEL,
  LISTS,
].join("\n");
