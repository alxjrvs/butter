import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { SECTIONS } from "@butter/content";
import { escapeHtml, html } from "@butter/core";
import { Glob } from "bun";
import { Document } from "../src/document.ts";
import { type StoryModule, TIERS, type Tier } from "../src/story.ts";

/**
 * The workbench, and the one place the house pattern is adapted rather than
 * copied.
 *
 * The stack says the workbench lives *in* the package. It does not say the
 * workbench is Storybook — and Ladle and Storybook both want a bundler and a
 * framework, neither of which this repository has by decision. So this renders
 * every story into one static gallery page using the same components the site
 * does, which is forty lines and no new dependencies.
 *
 *   bun run --filter '@butter/component-lib' workbench
 */

const root = join(import.meta.dir, "..");
const src = join(root, "src");
const outDir = join(import.meta.dir, "dist");

type Loaded = { readonly tier: Tier; readonly module: StoryModule };

const paths = [
  ...new Glob("{marks,blocks,sections}/*.stories.ts").scanSync(src),
]
  .map((path) => path.replaceAll("\\", "/"))
  .sort();

const loaded: Loaded[] = [];
for (const path of paths) {
  const imported = (await import(join(src, path))) as {
    readonly story?: StoryModule;
  };
  if (imported.story !== undefined) {
    loaded.push({ tier: imported.story.tier, module: imported.story });
  }
}

function renderTier(tier: Tier): string {
  const entries = loaded.filter((entry) => entry.tier === tier);
  if (entries.length === 0) {
    return "";
  }

  const bodies = entries
    .map((entry) => {
      const stories = entry.module.stories
        .map(
          (story) => `      <p class="sec-label">${escapeHtml(story.name)}</p>
      <div class="workbench-render">${story.render()}</div>`,
        )
        .join("\n");

      return `    <div class="workbench-entry">
      <h3>${escapeHtml(entry.module.component)}</h3>
${stories}
    </div>`;
    })
    .join("\n");

  return `  <section id="${tier}">
    <p class="sec-label"><span>${escapeHtml(tier)}</span>${String(entries.length)} components</p>
    <h2>${escapeHtml(tier)}</h2>
${bodies}
  </section>`;
}

const body = TIERS.map(renderTier)
  .filter((part) => part !== "")
  .join("\n\n");

const page = Document({
  title: "Butter — component workbench",
  description:
    "Every component in @butter/component-lib, rendered from its stories.",
  sections: SECTIONS,
  body: html(`  <header class="wrapper">
    <p class="band"><span>Workbench</span><span>@butter/component-lib</span><span>${String(loaded.length)} components</span></p>
    <h1>Component workbench</h1>
  </header>

${body}`),
});

await mkdir(outDir, { recursive: true });
await writeFile(join(outDir, "index.html"), page, "utf8");

console.log(
  `workbench: ${String(loaded.length)} components, ` +
    `${String(loaded.reduce((n, entry) => n + entry.module.stories.length, 0))} stories`,
);
