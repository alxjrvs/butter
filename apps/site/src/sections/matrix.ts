import { escapeHtml } from "../html.ts";

/** The four active monorepos the teardown read. Column order for every row. */
const REPOS = ["RANDSUM", "SU-SRD", "OptFall", "Binfinite"] as const;

type Tone = "yes" | "no" | "alt";
type Verdict = "core" | "common" | "varies";

type Cell = { readonly tone: Tone; readonly text: string };

/**
 * `cells` is a fixed-length tuple, not an array, so a row that forgets a repo is
 * a type error rather than a silently short table row.
 */
type Row = {
  readonly layer: string;
  readonly note: string;
  readonly cells: readonly [Cell, Cell, Cell, Cell];
  readonly verdict: Verdict;
};

const VERDICT_LABEL: Record<Verdict, string> = {
  core: "Core",
  common: "Common",
  varies: "Varies",
};

const yes = (text: string): Cell => ({ tone: "yes", text });
const alt = (text: string): Cell => ({ tone: "alt", text });
const no = (text = "—"): Cell => ({ tone: "no", text });

const ROWS: readonly Row[] = [
  {
    layer: "Runtime & PM",
    note: "bun",
    cells: [yes("bun 1.3"), yes("bun 1.3"), yes("bun"), yes("bun 1.3.14")],
    verdict: "core",
  },
  {
    layer: "Workspace shape",
    note: "apps/* packages/*",
    cells: [yes("✓"), yes("✓"), yes("✓"), yes("✓")],
    verdict: "core",
  },
  {
    layer: "Language",
    note: "typescript",
    cells: [yes("7.0.2"), yes("7.0.2"), yes("7.0.2"), alt("6.0.3")],
    verdict: "common",
  },
  {
    layer: "Shared tsconfig",
    note: "strict + extras",
    cells: [yes("refs"), yes("root"), yes("base"), yes("base")],
    verdict: "core",
  },
  {
    layer: "Version catalog",
    note: "catalog:",
    cells: [yes("✓"), yes("✓"), no(), yes("✓")],
    verdict: "common",
  },
  {
    layer: "Lint + format",
    note: "biome",
    cells: [yes("2.5.3"), yes("2.5.7"), alt("oxlint"), yes("2.5.4")],
    verdict: "common",
  },
  {
    layer: "Git hooks",
    note: "lefthook",
    cells: [yes("✓"), yes("✓"), no(), yes("✓")],
    verdict: "common",
  },
  {
    layer: "Dead-code gate",
    note: "knip",
    cells: [yes("✓"), yes("✓"), no(), yes("✓")],
    verdict: "common",
  },
  {
    layer: "Test runner",
    note: "bun:test",
    cells: [yes("bun"), yes("bun"), yes("bun"), alt("vitest")],
    verdict: "common",
  },
  {
    layer: "CI aggregate gate",
    note: "if: always()",
    cells: [
      yes("ci-gate"),
      yes("quality-checks"),
      yes("gate"),
      yes("CI Success"),
    ],
    verdict: "core",
  },
  {
    layer: "UI runtime",
    note: "react 19",
    cells: [yes("react"), yes("react"), yes("react"), yes("react")],
    verdict: "core",
  },
  {
    layer: "App shell",
    note: "tanstack",
    cells: [no(), yes("router+query"), no(), yes("router+start")],
    verdict: "varies",
  },
  {
    layer: "Content surface",
    note: "astro — being retired",
    cells: [
      yes("site, rdn"),
      alt("own SSG"),
      alt("already out"),
      yes("marketing"),
    ],
    verdict: "varies",
  },
  {
    layer: "Component workbench",
    note: "in component-lib",
    cells: [
      no(),
      alt("ladle · 106"),
      alt("storybook · 8"),
      alt("storybook · 75"),
    ],
    verdict: "common",
  },
  {
    layer: "Story gate",
    note: "1 component = 1 story",
    cells: [no(), yes("✓"), no(), yes("✓")],
    verdict: "common",
  },
  {
    layer: "Styling",
    note: "tailwind being removed",
    cells: [
      no("minimal"),
      alt("→ tokens pkg"),
      alt("theme pkg"),
      alt("tokens pkg"),
    ],
    verdict: "varies",
  },
  {
    layer: "Web hosting",
    note: "netlify",
    cells: [no(), yes("3 sites"), yes("1 site"), yes("3 sites")],
    verdict: "core",
  },
  {
    layer: "Worker hosting",
    note: "render",
    cells: [yes("1 worker"), yes("1 worker"), no(), no()],
    verdict: "common",
  },
  {
    layer: "Backend",
    note: "convex",
    cells: [no(), yes("itun"), no(), yes("2 projects")],
    verdict: "varies",
  },
  {
    layer: "Mobile / app store",
    note: "expo + EAS",
    cells: [no(), no(), no(), alt("EAS")],
    verdict: "varies",
  },
];

function renderRow(row: Row): string {
  const cells = row.cells
    .map(
      (cell) =>
        `            <td class="cell ${cell.tone}">${escapeHtml(cell.text)}</td>`,
    )
    .join("\n");

  return `          <tr>
            <td class="layer">${escapeHtml(row.layer)}<span>${escapeHtml(row.note)}</span></td>
${cells}
            <td class="verdict"><span class="chip ${row.verdict}">${VERDICT_LABEL[row.verdict]}</span></td>
          </tr>`;
}

export function renderMatrix(): string {
  return `  <section>
    <p class="sec-label">The reading</p>
    <h2>What's actually fixed, and what you re-decide</h2>
    <div class="prose">
      <p class="lede">
        Read across <code>@RANDSUM</code>, <code>SU-SRD</code>, <code>OptFall</code> and
        <code>BinfiniteApp</code>. The bottom of the stack is invariant; the top is a
        per-project decision made against a stable set of options.
      </p>
    </div>

    <div class="legend">
      <div><span class="chip core">Core</span> all four repos</div>
      <div><span class="chip common">Common</span> three of four</div>
      <div><span class="chip varies">Varies</span> chosen per surface</div>
    </div>

    <div class="scroller">
      <table>
        <thead>
          <tr>
            <th>Layer</th>
${REPOS.map((repo) => `            <th class="repo">${escapeHtml(repo)}</th>`).join("\n")}
            <th></th>
          </tr>
        </thead>
        <tbody>
${ROWS.map(renderRow).join("\n")}
        </tbody>
      </table>
    </div>
  </section>`;
}
