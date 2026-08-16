/**
 * Every version the page prints.
 *
 * Declared once, here, and checked against the root `package.json` catalog and
 * `.bun-version` by `versions.test.ts` — so a version can go out of date in
 * exactly one place, and the test fails when it does. Components take a
 * `VersionKey` rather than a string, which is what stops a number being typed
 * into a template and quietly outliving the thing it describes.
 */
export const VERSIONS = {
  bun: "1.3.14",
  typescript: "7.0.2",
  biome: "2.5.8",
  knip: "6.32.2",
  lefthook: "2.1.10",
} as const;

export type VersionKey = keyof typeof VERSIONS;
