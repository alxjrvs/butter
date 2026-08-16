/**
 * The whole stylesheet, inlined into the document at build time.
 *
 * Theme handling has three states and all three are load-bearing:
 *   1. bare `:root`                     — the complete light palette. Every token
 *                                         gets its first definition here.
 *   2. `@media (prefers-color-scheme: dark)` guarded as
 *      `:root:not([data-theme="light"])` — the system default, which stamps no
 *                                         attribute on the root element.
 *   3. `:root[data-theme="dark"]`       — an explicit choice, which must win over
 *                                         a light system preference.
 *
 * A token defined only inside a media query has no light value at all, so the
 * light palette is never expressed as an override.
 */
export const styles = `
  :root {
    --ground: #f1f3f4;
    --surface: #ffffff;
    --surface-2: #e9edef;
    --ink: #131e26;
    --ink-2: #596c79;
    --ink-3: #8093a0;
    --rule: #d7dee2;
    --rule-2: #c2ccd2;
    --core: #0e6b75;
    --core-bg: #ddeced;
    --common: #3d5a73;
    --common-bg: #dee6ee;
    --varies: #a65d2e;
    --varies-bg: #f2e4d8;
    --off: #7b8892;
    --off-bg: #e4e8ea;

    --mono: ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
    --sans: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, "Helvetica Neue", Arial, sans-serif;
  }

  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      --ground: #0e151a;
      --surface: #162027;
      --surface-2: #1c282f;
      --ink: #e3eaef;
      --ink-2: #8b9daa;
      --ink-3: #6d808d;
      --rule: #24313a;
      --rule-2: #31414c;
      --core: #52b4bd;
      --core-bg: #123037;
      --common: #7ba3c4;
      --common-bg: #172836;
      --varies: #d28c52;
      --varies-bg: #33241a;
      --off: #7d8b95;
      --off-bg: #1c252b;
    }
  }

  :root[data-theme="dark"] {
    --ground: #0e151a;
    --surface: #162027;
    --surface-2: #1c282f;
    --ink: #e3eaef;
    --ink-2: #8b9daa;
    --ink-3: #6d808d;
    --rule: #24313a;
    --rule-2: #31414c;
    --core: #52b4bd;
    --core-bg: #123037;
    --common: #7ba3c4;
    --common-bg: #172836;
    --varies: #d28c52;
    --varies-bg: #33241a;
    --off: #7d8b95;
    --off-bg: #1c252b;
  }

  * { box-sizing: border-box; }

  body {
    background: var(--ground);
    color: var(--ink);
    font-family: var(--sans);
    font-size: 16px;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
  }

  .wrap {
    max-width: 1080px;
    margin: 0 auto;
    padding: 0 28px 96px;
  }

  .prose { max-width: 68ch; }

  /* ---------- masthead ---------- */

  .masthead {
    padding: 72px 0 40px;
    border-bottom: 2px solid var(--ink);
  }

  .eyebrow {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink-2);
    margin: 0 0 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px 18px;
  }

  h1 {
    font-size: clamp(38px, 6vw, 60px);
    line-height: 1.02;
    letter-spacing: -0.035em;
    font-weight: 800;
    margin: 0 0 22px;
    text-wrap: balance;
  }

  .standfirst {
    font-size: 19px;
    line-height: 1.55;
    color: var(--ink-2);
    margin: 0;
    max-width: 62ch;
  }

  .standfirst strong { color: var(--ink); font-weight: 600; }

  /* ---------- sections ---------- */

  section { padding-top: 64px; }

  h2 {
    font-size: 27px;
    letter-spacing: -0.022em;
    font-weight: 750;
    margin: 0 0 8px;
    text-wrap: balance;
  }

  h3 {
    font-size: 17px;
    letter-spacing: -0.01em;
    font-weight: 700;
    margin: 0 0 6px;
  }

  .sec-label {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--core);
    margin: 0 0 12px;
  }

  p { margin: 0 0 16px; }
  .lede { color: var(--ink-2); margin-bottom: 28px; }

  code {
    font-family: var(--mono);
    font-size: 0.875em;
    background: var(--surface-2);
    padding: 1px 5px;
    border-radius: 3px;
    color: var(--ink);
  }

  a { color: var(--core); }

  /* ---------- verdict chips ---------- */

  .chip {
    display: inline-block;
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 600;
    padding: 2px 7px;
    border-radius: 3px;
    white-space: nowrap;
    vertical-align: 1px;
  }
  .chip.core { background: var(--core-bg); color: var(--core); }
  .chip.common { background: var(--common-bg); color: var(--common); }
  .chip.varies { background: var(--varies-bg); color: var(--varies); }
  .chip.off { background: var(--off-bg); color: var(--off); }

  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 22px;
    margin: 0 0 24px;
    font-size: 13.5px;
    color: var(--ink-2);
  }
  .legend > div { display: flex; align-items: baseline; gap: 8px; }

  /* ---------- matrix ---------- */

  .scroller {
    overflow-x: auto;
    border: 1px solid var(--rule);
    border-radius: 6px;
    background: var(--surface);
  }

  table {
    border-collapse: collapse;
    width: 100%;
    min-width: 780px;
    font-size: 13.5px;
  }

  thead th {
    font-family: var(--mono);
    font-size: 10.5px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 600;
    color: var(--ink-2);
    text-align: left;
    padding: 12px 14px;
    border-bottom: 1px solid var(--rule-2);
    white-space: nowrap;
    background: var(--surface);
  }

  thead th.repo { text-align: center; }

  tbody td {
    padding: 11px 14px;
    border-bottom: 1px solid var(--rule);
    vertical-align: top;
  }

  tbody tr:last-child td { border-bottom: none; }

  td.layer {
    font-weight: 600;
    white-space: nowrap;
  }
  td.layer span {
    display: block;
    font-weight: 400;
    font-size: 12px;
    color: var(--ink-3);
    font-family: var(--mono);
  }

  td.cell {
    text-align: center;
    font-family: var(--mono);
    font-size: 12px;
    color: var(--ink-2);
    white-space: nowrap;
  }
  td.cell.yes { color: var(--core); font-weight: 600; }
  td.cell.no { color: var(--ink-3); }
  td.cell.alt { color: var(--varies); }

  td.verdict { text-align: right; white-space: nowrap; }

  /* ---------- layer stack ---------- */

  .layer-block {
    display: grid;
    grid-template-columns: 148px 1fr;
    gap: 28px;
    padding: 26px 0;
    border-top: 1px solid var(--rule);
  }
  .layer-block:first-of-type { border-top: 2px solid var(--rule-2); }

  .rail {
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: var(--ink-3);
    line-height: 1.5;
    padding-top: 3px;
  }
  .rail b {
    display: block;
    color: var(--ink);
    font-weight: 600;
    font-size: 12px;
    letter-spacing: 0.06em;
    margin-bottom: 3px;
  }

  .layer-body > p:last-child { margin-bottom: 0; }
  .layer-body ul { margin: 0 0 14px; padding-left: 20px; }
  .layer-body li { margin-bottom: 7px; }
  .layer-body li:last-child { margin-bottom: 0; }

  /* ---------- callout ---------- */

  .callout {
    background: var(--surface);
    border: 1px solid var(--rule);
    border-left: 3px solid var(--core);
    border-radius: 0 6px 6px 0;
    padding: 20px 24px;
    margin: 0 0 24px;
  }
  .callout.warm { border-left-color: var(--varies); }
  .callout h3 { margin-bottom: 8px; }
  .callout p:last-child { margin-bottom: 0; }

  /* ---------- scaffold tree ---------- */

  pre {
    font-family: var(--mono);
    font-size: 12.5px;
    line-height: 1.75;
    background: var(--surface);
    border: 1px solid var(--rule);
    border-radius: 6px;
    padding: 20px 22px;
    overflow-x: auto;
    margin: 0 0 24px;
    color: var(--ink);
  }
  pre .c { color: var(--ink-3); }
  pre .k { color: var(--core); font-weight: 600; }

  /* ---------- drift cards ---------- */

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
  }
  .card {
    background: var(--surface);
    border: 1px solid var(--rule);
    border-radius: 6px;
    padding: 18px 20px;
  }
  .card .name {
    font-family: var(--mono);
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 8px;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 10px;
  }
  .card p {
    font-size: 13.5px;
    color: var(--ink-2);
    line-height: 1.5;
    margin: 0;
  }

  /* ---------- name key ---------- */

  .namekey {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1px;
    margin: 34px 0 0;
    background: var(--rule);
    border: 1px solid var(--rule);
    border-radius: 6px;
    overflow: hidden;
  }

  .namekey > div {
    background: var(--surface);
    padding: 14px 12px 16px;
  }

  .namekey .glyph {
    font-family: var(--mono);
    font-size: 26px;
    font-weight: 700;
    line-height: 1;
    color: var(--core);
    margin-bottom: 9px;
  }

  .namekey .word {
    font-size: 13px;
    font-weight: 650;
    line-height: 1.25;
    margin-bottom: 3px;
  }

  .namekey .sub {
    font-family: var(--mono);
    font-size: 10.5px;
    line-height: 1.4;
    color: var(--ink-3);
  }

  @media (max-width: 720px) {
    .namekey { grid-template-columns: repeat(3, 1fr); }
  }

  footer {
    margin-top: 72px;
    padding-top: 22px;
    border-top: 1px solid var(--rule);
    font-family: var(--mono);
    font-size: 11.5px;
    letter-spacing: 0.04em;
    color: var(--ink-3);
    line-height: 1.7;
  }

  @media (max-width: 720px) {
    .layer-block { grid-template-columns: 1fr; gap: 12px; }
    .wrap { padding: 0 20px 72px; }
    .masthead { padding-top: 48px; }
  }
`;
