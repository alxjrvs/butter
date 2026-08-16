import { escapeHtml } from "../html.ts";

/** One letter of B·U·T·T·E·R. */
type NameKeyEntry = {
  readonly glyph: string;
  readonly word: string;
  /** Two lines, rendered stacked. */
  readonly sub: readonly [string, string];
};

const NAME_KEY: readonly NameKeyEntry[] = [
  { glyph: "B", word: "Bun", sub: ["runtime · pm", "tests · scripts"] },
  { glyph: "U", word: "Unified workspace", sub: ["apps/*", "packages/*"] },
  { glyph: "T", word: "TypeScript", sub: ["7.0.2", "strict-plus"] },
  { glyph: "T", word: "TanStack", sub: ["router · query", "start"] },
  { glyph: "E", word: "Edge-deployed", sub: ["netlify · render", "convex"] },
  { glyph: "R", word: "React", sub: ["19", "+ component-lib"] },
];

const EYEBROW: readonly string[] = [
  "Stack teardown",
  "6 repos read",
  "2026-08-15",
];

function renderNameKey(): string {
  return NAME_KEY.map(
    (entry) => `      <div>
        <div class="glyph">${escapeHtml(entry.glyph)}</div>
        <div class="word">${escapeHtml(entry.word)}</div>
        <div class="sub">${entry.sub.map(escapeHtml).join("<br>")}</div>
      </div>`,
  ).join("\n");
}

export function renderMasthead(): string {
  return `  <header class="masthead">
    <p class="eyebrow">
${EYEBROW.map((item) => `      <span>${escapeHtml(item)}</span>`).join("\n")}
    </p>
    <h1>The Butter Stack</h1>
    <p class="standfirst">
      Named because it goes on the Bun. Four active monorepos converge on the same spine without
      ever having been templated from one another — <strong>Bun workspaces, a strict-plus
      TypeScript base config, Biome, a single aggregate CI gate, and Netlify + Render +
      Convex</strong>. Written down so the next agent inherits the reasoning, not just the file
      tree, including the three moves already decided: Tailwind out, Astro out, TanStack
      wherever it applies.
    </p>

    <div class="namekey">
${renderNameKey()}
    </div>
  </header>`;
}
