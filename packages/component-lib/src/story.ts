import type { Html } from "@butter/core";

/**
 * The taxonomy. Three tiers, and a component's tier is its directory.
 *
 *   blocks/    owns its internal layout, takes data
 *   sections/  composes blocks, holds nothing but composition
 *
 * `story-coverage.test.ts` asserts that every component has exactly one story
 * module, that the module's declared tier matches the directory it sits in, and
 * that no story exists without a component. Filing a component under the wrong
 * tier is therefore a failing test rather than a slow drift back into a folder
 * called `misc`.
 */
export type Tier = "blocks" | "sections";

/**
 * The single source for the tier list. The story test and the workbench both
 * build their globs from it, so a tier cannot be added in one place and missed
 * in the other.
 */
export const TIERS: readonly Tier[] = ["blocks", "sections"];

export type Story = {
  readonly name: string;
  readonly render: () => Html;
};

export type StoryModule = {
  readonly tier: Tier;
  readonly component: string;
  readonly stories: readonly Story[];
};
