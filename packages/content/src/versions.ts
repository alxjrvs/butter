/**
 * Every version the page prints — all three of them, in the banner.
 *
 * Declared once, here, and checked against the root `package.json` catalog and
 * `.bun-version` by `versions.test.ts` — so a version can go out of date in
 * exactly one place, and the test fails when it does. Components take a
 * `VersionKey` rather than a string, which is what stops a number being typed
 * into a template and quietly outliving the thing it describes.
 *
 * `knip` and `lefthook` were here for the nutrition label's version column,
 * which is gone. They are not kept "in case": this list is the page's display
 * source, not a mirror of the manifest, and an entry nothing renders is a
 * version the test asserts about nobody. Printing one again is a typecheck
 * error naming the missing key, which is the moment to add it back with its
 * case in the test.
 */
export const VERSIONS = {
  bun: "1.4.0",
  typescript: "7.0.2",
  biome: "2.5.8",
} as const;

export type VersionKey = keyof typeof VERSIONS;
