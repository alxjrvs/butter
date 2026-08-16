export function renderDivergence(): string {
  return `  <section>
    <p class="sec-label">Divergence</p>
    <h2>Where the four genuinely disagree</h2>
    <div class="prose">
      <p class="lede">
        Worth separating real per-surface choices from repos that have simply drifted behind.
      </p>
    </div>

    <div class="callout">
      <h3>Styling: now decided, previously the loosest joint</h3>
      <p>
        SU-SRD was the only repo of the six using Tailwind — v4 with the shadcn-shaped kit
        (<code>class-variance-authority</code>, <code>clsx</code>, <code>tailwind-merge</code>,
        Base UI, lucide). Binfinite deliberately avoided it, using a tokens package with style
        objects so the same components render through react-native-web; OptFall uses a theme
        package, since retired along with its Svelte surface. <strong>Tailwind is now being removed from SU-SRD</strong> in
        favour of the Binfinite pattern, which makes the styling approach consistent across all
        six for the first time.
      </p>
      <p>
        One constraint that shapes the migration: Binfinite's component library contains zero
        <code>:hover</code> and zero <code>@media</code>, because it's React-Native-first and RN
        has neither — so its style objects were never asked to carry interaction or responsive
        state. SU-SRD has ~403 such usages. The port therefore takes <em>both</em> halves of the
        pattern, style objects plus the package-level stylesheet, rather than the objects alone.
      </p>
      <p>
        A consistent negative worth recording: <strong>zero CSS Modules across all four
        repos</strong>, verified — the <code>css.d.ts</code> files in two component libraries
        declare plain side-effect <code>.css</code> imports, not modules.
      </p>
    </div>

    <div class="callout warm">
      <h3>Two repos are off-stack, not part of it</h3>
      <p>
        <code>vellum</code> and <code>Hermuz</code> still run ESLint + Prettier, have no
        Lefthook, no knip, no catalog, and no aggregate CI gate — vellum on
        <code>simple-git-hooks</code> and TS 6, Hermuz on TS 5.8. They read as earlier-generation
        rather than as deliberate variants. If the stack is to be a real standard, these
        are the two migration targets.
      </p>
    </div>

    <div class="cards">
      <div class="card">
        <div class="name"><span>OptFall</span><span class="chip core">Ahead</span></div>
        <p>
          Modern in language and CI, and <strong>the first to finish the Astro removal</strong>
          the rest of the portfolio is only planning — it deleted Astro and Svelte together and
          is now React. Still missing Lefthook, knip, a catalog and <code>.bun-version</code>.
        </p>
      </div>
      <div class="card">
        <div class="name"><span>Binfinite</span><span class="chip varies">Outlier</span></div>
        <p>
          The only vitest repo and the only one still on TS 6 — both defensible, since Expo and
          Convex constrain the toolchain more than the others do.
        </p>
      </div>
      <div class="card">
        <div class="name"><span>SU-SRD</span><span class="chip varies">Outlier</span></div>
        <p>
          Skips <code>exactOptionalPropertyTypes</code> and <code>noImplicitOverride</code>,
          and runs its own Vite SSG where the others reach for Astro.
        </p>
      </div>
    </div>
  </section>`;
}
