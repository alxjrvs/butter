import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { VERSIONS, type VersionKey } from "./src/versions.ts";

/**
 * The page prints versions. This is what makes them true.
 *
 * `VERSIONS` is the only place a version is written for display, and every
 * entry has to match what the repository installs. Bumping a dependency
 * without updating the content therefore fails CI, rather than shipping a page
 * that describes a toolchain nobody is running.
 */

const root = join(import.meta.dir, "..", "..");

type RootManifest = {
  readonly catalog: Record<string, string>;
  readonly devDependencies: Record<string, string>;
};

const manifest = JSON.parse(
  readFileSync(join(root, "package.json"), "utf8"),
) as RootManifest;

const bunVersion = readFileSync(join(root, ".bun-version"), "utf8").trim();

/** Widened: the literal types are the point everywhere except in here. */
const declared: Record<VersionKey, string> = VERSIONS;

const CASES: readonly (readonly [VersionKey, string, string | undefined])[] = [
  ["bun", ".bun-version", bunVersion],
  ["typescript", "catalog.typescript", manifest.catalog.typescript],
  ["biome", "catalog.@biomejs/biome", manifest.catalog["@biomejs/biome"]],
  ["knip", "devDependencies.knip", manifest.devDependencies.knip],
  ["lefthook", "devDependencies.lefthook", manifest.devDependencies.lefthook],
];

for (const [key, source, actual] of CASES) {
  test(`${key} matches ${source}`, () => {
    expect(declared[key]).toBe(actual as string);
  });
}
