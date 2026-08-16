import { escapeHtml } from "../html.ts";

type Stratum = {
  /** e.g. "01 · Runtime" */
  readonly rail: string;
  /** the sub-line under the rail heading */
  readonly tag: string;
  /** authored markup — deliberately raw, not escaped */
  readonly body: string;
};

const STRATA: readonly Stratum[] = [
  {
    rail: "01 · Runtime",
    tag: "Bun, end to end",
    body: `        <p>
          Bun is the runtime, package manager, workspace host, test runner and script runner —
          not just the installer. Cross-package work always goes through
          <code>bun run --filter '&lt;pkg&gt;' &lt;script&gt;</code>, never a task-runner like Turbo or Nx.
          Every repo carries a <code>bunfig.toml</code>, and it's where the hard-won operational
          knowledge lives: <code>linker = 'isolated'</code> in RANDSUM and SU-SRD,
          deliberately <code>hoisted</code> in Binfinite to single-instance the Expo tree,
          test <code>preload</code> lists, and SU-SRD's 3-day <code>minimumReleaseAge</code>
          supply-chain cooldown.
        </p>`,
  },
  {
    rail: "02 · Layout",
    tag: "apps/* + packages/*",
    body: `        <p>
          Exactly two workspace directories, every time, with a consistent meaning:
          <code>packages/*</code> is libraries, <code>apps/*</code> is deployables. The root
          <code>package.json</code> is <code>private</code>, holds no source, and exists to
          declare workspaces, the catalog, security <code>overrides</code>, and the script surface.
        </p>
        <p>
          The internal dependency graph has the same shape in all four: a zero-dependency
          domain core at the bottom, a data/reference layer above it, a shared component
          library above that, and apps that consume but never re-export.
          <code>@randsum/roller</code>, <code>optfall-legality</code>,
          <code>salvageunion-reference</code> and <code>@binfinite/core</code> are the same
          slot in four repos. Sibling packages at the same level never depend on each other.
        </p>`,
  },
  {
    rail: "03 · Language",
    tag: "TS 7, strict-plus",
    body: `        <p>
          TypeScript 7.0.2 in three of four (Binfinite is still on ~6.0.3). A root base config
          — <code>tsconfig.base.json</code>, or a root <code>tsconfig.json</code> with project
          references — that every workspace extends. The flag set beyond
          <code>strict</code> is remarkably stable across repos that never shared a file:
        </p>
        <ul>
          <li><code>noUncheckedIndexedAccess</code>, <code>noUnusedLocals</code>, <code>noFallthroughCasesInSwitch</code> — all four</li>
          <li><code>exactOptionalPropertyTypes</code>, <code>noImplicitOverride</code> — all but SU-SRD</li>
          <li><code>moduleResolution: "Bundler"</code>, <code>moduleDetection: "force"</code>, <code>skipLibCheck</code>, <code>resolveJsonModule</code></li>
          <li>RANDSUM goes furthest: <code>isolatedDeclarations</code>, <code>noPropertyAccessFromIndexSignature</code>, plus GritQL Biome plugins that ban <code>let</code> and <code>as unknown as T</code> outright</li>
        </ul>
        <p>
          Shared conventions that recur in the written rules: <code>import type</code> enforced,
          no <code>any</code>, named exports except route components, and relative imports
          over <code>@/</code> path aliases.
        </p>`,
  },
  {
    rail: "04 · Gates",
    tag: "biome · lefthook · knip",
    body: `        <p>
          Biome as the <em>single</em> tool for lint and format — Prettier is explicitly removed
          rather than merely unused, and the accepted cost (Biome parses neither Markdown nor
          YAML, so those go unformatted) is written down in both repos that made the call.
          OptFall is the outlier, on oxlint with no formatter.
        </p>
        <p>
          Lefthook wires the same two-tier shape everywhere:
          <strong>pre-commit is staged-files-only</strong>
          (<code>biome check --write {staged_files}</code> with <code>stage_fixed: true</code>)
          and <strong>pre-push is the expensive tier</strong> — full typecheck, tests, build.
          Knip runs as a dead-code gate with hand-tuned per-workspace
          <code>entry</code>/<code>project</code> globs.
        </p>
        <p>
          Then every repo grows a family of bespoke <code>check:*</code> / <code>validate:*</code>
          scripts that encode project-specific invariants — <code>check:tokens</code>,
          <code>check:hub</code>, <code>check:stories</code>, <code>validate:architecture</code>,
          <code>check:disclaimer</code>, <code>check:provenance</code>. This is arguably the most
          distinctive thing in the stack: rules get promoted from prose into an executable gate.
        </p>`,
  },
  {
    rail: "05 · CI",
    tag: "filter → fan out → gate",
    body: `        <p>
          Identical three-part topology in all four repos, and the most consistent thing found:
        </p>
        <ul>
          <li>A <code>changes</code> job (<code>dorny/paths-filter</code>) computing which workspaces are affected</li>
          <li>Parallel per-concern jobs — lint, typecheck, test, knip, audit, build — gated on that filter</li>
          <li><strong>One aggregate job with <code>if: always()</code> that <code>needs:</code> every other job</strong>, and that job alone is the required status check for branch protection</li>
        </ul>
        <p>
          Plus <code>concurrency</code> with <code>cancel-in-progress</code> on every one.
          Two repos independently discovered the same failure mode and wrote a meta-check for it
          — Binfinite's <code>check:ci-aggregator</code> diffs the job keys against the
          <code>needs:</code> list, because a job missing from that list can never fail the
          required check.
        </p>`,
  },
  {
    rail: "06 · Surface",
    tag: "chosen per app",
    body: `        <p>
          The top layer is where you genuinely re-decide, and the choice tracks
          <em>what kind of surface it is</em> rather than what the repo is:
        </p>
        <ul>
          <li><strong>Stateful application</strong> → React 19 + TanStack Router with file-based routes and a generated <code>routeTree.gen.ts</code>, on Vite. Query joins it when there's a server. This is SU-SRD's <code>itun</code> and Binfinite's <code>admin</code> — the only two TanStack surfaces in the four repos.</li>
          <li><strong>Content or marketing site</strong> → Astro today, in four apps across three repos (<code>randsum/site</code>, <code>randsum/rdn</code>, <code>optfall/site</code>, <code>binfinite/marketing</code>), usually with a sitemap and the Netlify adapter. SU-SRD already left, onto an in-house Vite SSG with an ADR explaining why. <strong>This layer is being retired</strong> — see <em>Direction of travel</em> below.</li>
          <li><strong>Headless service, bot, or CLI</strong> → plain Bun, no framework. Rendered to Render as a worker.</li>
        </ul>
        <p>
          Two recurring package patterns sit under all of it. A <strong>shared component
          library with no build step</strong> that exports TypeScript source directly and lets
          the consuming app's bundler handle it — SU-SRD and Binfinite both do this and both
          document it as deliberate. And a <strong>framework-agnostic tokens package</strong> as
          the single brand source (<code>@binfinite/tokens</code>, <code>optfall-theme</code>),
          which apps are forbidden from bypassing.
        </p>`,
  },
  {
    rail: "07 · Workbench",
    tag: "the design surface",
    body: `        <p>
          Every repo with a component library also has a workbench, and it always lives
          <em>inside that package</em> — never in an app, never as a separate workspace.
          SU-SRD runs <strong>Ladle</strong> (106 stories, pinned and patched at 5.1.1, with a
          heavily customized <code>.ladle/config.mjs</code> that rebuilds the nav shell and turns
          the axe-core a11y addon on per component). Binfinite and OptFall run
          <strong>Storybook</strong> (75 and 8 stories). RANDSUM has no workbench — its
          <code>dice-ui</code> is private and small enough not to need one.
        </p>
        <p>
          The tool is not the standard; <strong>the story rule is</strong>. SU-SRD and Binfinite
          independently arrived at the same one and both made it executable:
          <em>one public component = one co-located story file = one nav leaf, with a title
          matching a closed taxonomy</em> — enforced by
          <code>story-coverage.test.ts</code> and <code>check-stories.ts</code> respectively.
          Both wrote down the same reason: presence alone let the sidebar rot. Binfinite's
          checker records that before the title rule, 74 titles resolved to 17 top-level groups
          encoding four incompatible things at once — release phase, ticket id, audience, and
          platform.
        </p>
        <p>
          Binfinite goes furthest and treats the workbench as the <em>only</em> design surface:
          it deleted a bespoke design gallery and registry in favour of it, deploys the
          Storybook as its own Netlify site (Storybook needs
          <code>X-Frame-Options: SAMEORIGIN</code>, the admin console sets <code>DENY</code>),
          and gates it three ways — presence, built-manifest shape, and a headless visit to
          every story.
        </p>`,
  },
  {
    rail: "08 · Platform",
    tag: "where it runs",
    body: `        <p>
          Three vendors carry almost everything, and the split is by <em>workload type</em>
          rather than by project:
        </p>
        <ul>
          <li>
            <strong>Netlify — the web host.</strong> Seven sites across three repos.
            SU-SRD runs three (<code>srd</code>, <code>itun</code>, <code>su-assets</code>),
            Binfinite three (<code>admin</code>, <code>marketing</code>, and the Storybook as
            its own origin), OptFall one. Netlify Blobs is also the binary store — SU-SRD keeps
            licensed artwork there rather than in git, served through a single function.
          </li>
          <li>
            <strong>Render — the worker host.</strong> Three services, and every one is
            <code>region: oregon</code> / <code>plan: starter</code>. Two are Discord bots
            (<code>randsum-discord-bot</code>, <code>suref-discord-bot</code>), one is Hermuz's
            web service plus a data disk.
          </li>
          <li>
            <strong>Convex — the backend, where there is one.</strong> SU-SRD's
            <code>itun</code> and Binfinite's <code>packages/backend</code> +
            <code>packages/catalog</code>. Both treat the Convex schema as the source of truth
            and check the generated API into git with a CI freshness gate.
          </li>
        </ul>
        <p>
          <strong>Expo / EAS is the one single-vendor dependency</strong>, and it is the
          deepest: Binfinite's <code>apps/platform</code> uses EAS Build for iOS and Android
          and EAS Hosting for web, with <code>eas-cli</code> pinned at 21.2.0 across 13 call
          sites. It is also the least substitutable thing in the stack — moving off it means
          replacing the build service, the hosting, the update channel, and the store-submission
          path at once. Worth treating as a concentration risk rather than a settled choice.
        </p>
        <p>
          <strong><code>BinfiniteLLC/binfinite-app</code> is the reference implementation for
          Expo</strong> — the only mobile surface across all six repos, so its conventions are
          the defaults to copy rather than re-derive:
        </p>
        <ul>
          <li><strong>Layout</strong> — the app is <code>apps/platform</code>, routes live in <code>src/app</code> under Expo Router. It owns screens, data and state only; every visual element comes from the shared component library.</li>
          <li><strong>Typed routes on</strong> (<code>expo.experiments.typedRoutes</code>) — every <code>&lt;Link&gt;</code>, <code>router.push</code> and <code>router.replace</code> uses the generated typed <code>Href</code>.</li>
          <li><strong>New Architecture is the SDK 57 default</strong> — no explicit <code>newArchEnabled</code> flag, and every native module must be New-Arch compatible. <code>bunx expo-doctor</code> is the check.</li>
          <li><strong>RN components import by deep subpath</strong> — <code>@binfinite/component-lib/native/Button</code>, because Metro does not tree-shake. That subpath map is <em>generated</em>, and <code>check:native-exports</code> fails if it goes stale; a missing subpath means the app cannot import the module at all.</li>
          <li><strong>Platform forks need a conditional export.</strong> Metro applies <code>.web.tsx</code> resolution to file paths, <em>not</em> to a package <code>exports</code> target — so a bare target silently ships the native fork to Expo Web. The generator emits <code>{ browser, default }</code> whenever a <code>.web.tsx</code> exists.</li>
          <li><strong><code>bunfig.toml</code> pins <code>linker = "hoisted"</code></strong> — adding <code>workspaces</code> flips Bun to the isolated linker, which duplicates the Expo tree and trips <code>expo-doctor</code>. This is the one place the house <code>isolated</code> default is deliberately inverted.</li>
          <li><strong>Lint is <code>expo lint</code>, not Biome</strong>, for this app only — Biome ignores <code>apps/platform</code> and a separate Lefthook step covers it.</li>
          <li><strong>Storybook scripts must not be named <code>storybook</code></strong> — it shadows the bin and fails <code>expo-doctor</code>. Use <code>sb</code> / <code>storybook:dev</code>.</li>
        </ul>
        <p>
          <strong>The Discord bots are the one place Bun does not reach.</strong> All three
          build for Node and start with it — RANDSUM via <code>bunup</code> then
          <code>node dist/index.js</code>, SU-SRD via <code>bun build --target node</code> then
          <code>node --enable-source-maps</code> — and both Render services declare
          <code>runtime: node</code>. Hermuz's <code>render.yaml</code> notes that Render picks
          Bun up automatically when <code>BUN_VERSION</code> is set and a <code>bun.lock</code>
          is present, which is the same lever the two bots could pull. Every bot is built
          directly on <code>discord.js</code> v14 with no framework in between — that part is
          already consistent.
        </p>
        <p>
          Outlier worth noting: <strong>vellum deploys to GitHub Pages</strong> from a
          <code>pages.yml</code> that is also the repo's only workflow — so it publishes builds
          whose tests never ran.
        </p>`,
  },
];

function renderStratum(stratum: Stratum): string {
  return `    <div class="layer-block">
      <div class="rail"><b>${escapeHtml(stratum.rail)}</b>${escapeHtml(stratum.tag)}</div>
      <div class="layer-body">
${stratum.body}
      </div>
    </div>`;
}

export function renderStrata(): string {
  return `  <section>
    <p class="sec-label">The stack, bottom up</p>
    <h2>Eight strata, in dependency order</h2>
    <div class="prose">
      <p class="lede">
        Ordered the way they actually stack — each layer assumes the ones beneath it. The
        lower strata you never re-decide; the upper ones you decide per surface.
      </p>
    </div>

${STRATA.map(renderStratum).join("\n\n")}
  </section>`;
}
