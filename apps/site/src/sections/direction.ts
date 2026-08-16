export function renderDirection(): string {
  return `  <section>
    <p class="sec-label">Direction of travel</p>
    <h2>Three decided moves, and what each one costs</h2>
    <div class="prose">
      <p class="lede">
        Recorded here so the next agent reads the intent, not just the current state.
        None of these are hypothetical — all three are decisions already taken.
      </p>
    </div>

    <div class="callout">
      <h3>1 · Tailwind out, tokens + style objects in</h3>
      <p>
        SU-SRD is the only repo using it, and it is being removed in favour of the Binfinite
        pattern. This makes styling consistent across all six for the first time. Tracked as a
        five-layer stack of issues. The one constraint that shapes the work: Binfinite's style
        objects never had to carry <code>:hover</code> or <code>@media</code> because it is
        RN-first; SU-SRD has ~403 such usages, so the port takes the package-stylesheet half of
        the pattern too.
      </p>
    </div>

    <div class="callout warm">
      <h3>2 · Astro out, TanStack in — and lean on TanStack generally</h3>
      <p>
        The standing preference is <strong>TanStack wherever it applies</strong>, not only as
        the Astro replacement. Router and Query are already the app-shell answer in the two
        stateful surfaces; the intent is to make that the default reach rather than a
        per-app decision, and to consolidate the content surface onto it instead of keeping a
        second framework for static sites.
      </p>
      <p>
        Retiring Astro removes a whole framework from the stack, and it takes the last
        TypeScript 6 pin with it — <code>randsum/site</code> and <code>randsum/rdn</code> pin
        <code>typescript: 6.0.3</code> off-catalog purely because <code>@astrojs/check</code>
        needs the TS6 compiler API, which TypeScript 7 does not ship. That pin looks like drift
        and is not; it disappears with Astro.
      </p>
      <p>
        <strong>The conflict is Binfinite's marketing site.</strong> It ships zero JavaScript,
        and that is not a preference — it is asserted against built HTML by
        <code>check:marketing-zero-js</code>, and Lighthouse gates a11y, best-practices and SEO
        on every PR. Astro renders its React Native components through react-native-web at build
        time and ships no runtime. TanStack Start is a server framework built around SSR plus
        hydration; getting a genuinely zero-JS document out of it is working against its grain,
        not with it. Either that gate gets renegotiated, or marketing stays on Astro as a stated
        exception. Worth deciding before any migration work starts, because it determines whether
        this is a three-app move or a four-app one.
      </p>
      <p>
        The remaining two are cleaner: <code>randsum/rdn</code> is a spec site, and
        <code>randsum/site</code> is Starlight docs — the heaviest lift, since Starlight has no
        TanStack equivalent, making it a rebuild rather than a port.
      </p>
      <p>
        <strong>OptFall has already done it.</strong> It deleted Astro and Svelte together and is
        now React, which makes it the worked example rather than a migration target — and drops
        the portfolio-wide move from four apps to three. Worth reading that PR before starting
        the others.
      </p>
    </div>

    <div class="callout warm">
      <h3>3 · Expo / EAS as a concentration risk</h3>
      <p>
        Flagged as a going concern rather than a decided migration. Binfinite's
        <code>apps/platform</code> depends on EAS for build, hosting, updates and store
        submission simultaneously — four separable services bought from one vendor, which is what
        makes it hard to unwind incrementally. There is no in-house precedent to fall back on:
        it is the only mobile surface across all six repos. The realistic near-term move is
        reducing coupling where it is cheap (web hosting is the most portable of the four) rather
        than a wholesale exit.
      </p>
    </div>
  </section>`;
}
