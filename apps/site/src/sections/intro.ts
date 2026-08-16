/**
 * The one section that is not part of the original teardown: it says what this
 * repository is, for a reader arriving cold.
 */
export function renderIntro(): string {
  return `  <section>
    <p class="sec-label">This repository</p>
    <h2>A teardown that is also an example of itself</h2>
    <div class="prose">
      <p class="lede">
        <code>alxjrvs/butter</code> is the home of the Butter Stack — this page, and a repository
        deliberately built on the stack the page describes. Everything in the conformance matrix
        below that a documentation repo can honestly have, it has: Bun workspaces, a strict-plus
        <code>tsconfig.base.json</code> every workspace extends, a <code>biome.json</code> carrying
        only its divergences from Biome's defaults, two-tier Lefthook, Knip, and one aggregate CI
        gate that every other job reports into. So the reference implementation is the repo you are
        reading about, and the config files are the primary source — the page is the commentary.
      </p>
      <p>
        The page itself is static HTML written to <code>apps/site/dist</code> by a Bun + TypeScript
        script, with no framework and no bundler. One page does not need either, and a stack
        document is more convincing when it is not over-built.
      </p>
    </div>
  </section>`;
}
