/**
 * The `<pre>` block is whitespace-significant, so it is deliberately written
 * flush to column 0 rather than indented to match the surrounding markup.
 */
export function renderDistillate(): string {
  return `  <section>
    <p class="sec-label">The distillate</p>
    <h2>What a new repo would inherit</h2>
    <div class="prose">
      <p class="lede">
        Everything below appears in at least three of the four, unprompted. This is Butter in
        one screen — the part worth turning into a template or a kickoff skill.
      </p>
    </div>

<pre><span class="c"># root — private, no source</span>
package.json         <span class="c">workspaces: ["packages/*", "apps/*"] + catalog + overrides</span>
bunfig.toml          <span class="c">linker, test preload, install policy</span>
bun.lock
<span class="k">tsconfig.base.json</span>   <span class="c">strict + noUncheckedIndexedAccess + exactOptionalPropertyTypes</span>
<span class="k">biome.json</span>           <span class="c">only divergences from biome defaults</span>
<span class="k">lefthook.yml</span>         <span class="c">pre-commit: staged biome  ·  pre-push: typecheck + test</span>
knip.json            <span class="c">per-workspace entry/project globs</span>
CLAUDE.md            <span class="c">architecture + the gotchas, not the what</span>
.github/workflows/
  ci.yml             <span class="c">changes → fan-out → ONE always() aggregate gate</span>

packages/
  core/              <span class="c">zero-dependency domain logic</span>
  reference/         <span class="c">schema-validated data, ships TS source, no build step</span>
  tokens/            <span class="c">framework-agnostic brand source</span>
  component-lib/     <span class="c">the only place visual elements live</span>
    <span class="k">.ladle/</span> or <span class="k">.storybook/</span>  <span class="c">workbench lives IN the package</span>
    <span class="k">story-coverage.test</span>  <span class="c">1 component = 1 story, taxonomy-checked</span>

apps/
  app/               <span class="c">react 19 + tanstack router/query + vite</span>
  site/              <span class="c">tanstack start                     (content too)</span>
  bot/               <span class="c">discord.js v14 → render worker     (if headless)</span>

<span class="c"># platform</span>
netlify              <span class="c">every web surface</span>
render               <span class="c">workers + bots (oregon / starter)</span>
convex               <span class="c">backend, where there is one</span></pre>

    <div class="prose">
      <p>
        The two rules that carry the most weight and are the easiest to lose: the
        <strong>aggregate CI gate must list every job</strong>, and
        <strong>anything you'd otherwise write as a convention in CLAUDE.md should become a
        <code>check:*</code> script</strong> wired into that gate. The two largest repos
        arrived at those independently, and both wrote down an incident that caused it.
      </p>
    </div>
  </section>`;
}
