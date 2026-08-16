import type { SpecGroup } from "./types.ts";
import { VERSIONS } from "./versions.ts";

/**
 * Stack Facts.
 *
 * A nutrition label lists what is in the package. Left column the layer, right
 * column the version, rule weights carrying the grouping. Nothing here is a
 * proportion, a trend or a date, so nothing here expires on its own — an em
 * dash means the layer has no pinned version, not that it is missing.
 */
export const SPEC: {
  readonly serving: string;
  readonly groups: readonly SpecGroup[];
  readonly free: string;
} = {
  serving: "Serving size 1 monorepo",

  groups: [
    {
      rows: [
        {
          label: "Bun — runtime, PM, workspaces, tests",
          value: VERSIONS.bun,
          lead: true,
        },
        {
          label: "TypeScript — strict, plus five",
          value: VERSIONS.typescript,
          lead: true,
        },
        {
          label: "Biome — lint and format",
          value: VERSIONS.biome,
          lead: true,
        },
        { label: "React", value: "19", lead: true },
      ],
    },
    {
      rows: [
        { label: "Workspaces — apps/*, packages/*", value: "—", lead: false },
        { label: "Version catalog", value: "—", lead: false },
        {
          label: "Lefthook — staged, then whole-repo",
          value: VERSIONS.lefthook,
          lead: false,
        },
        {
          label: "Knip — dead-code gate",
          value: VERSIONS.knip,
          lead: false,
        },
        {
          label: "One aggregate CI gate",
          value: "if: always()",
          lead: false,
        },
      ],
    },
    {
      rows: [
        { label: "TanStack Router + Query", value: "—", lead: false },
        { label: "Tokens + component library", value: "—", lead: false },
        {
          label: "Story gate — 1 component, 1 story",
          value: "—",
          lead: false,
        },
      ],
    },
    {
      rows: [
        { label: "Netlify — web", value: "—", lead: false },
        { label: "Render — workers", value: "—", lead: false },
        { label: "Convex — backend", value: "—", lead: false },
      ],
    },
  ],

  free: "Contains no Prettier, no Turbo, no Nx, no CSS Modules",
};
