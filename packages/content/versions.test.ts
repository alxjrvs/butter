import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { MAJORS } from "./src/versions.ts";

/**
 * The page says "TypeScript 7+". This is what keeps that true.
 *
 * The assertion is equality rather than "at least", deliberately. A claim of
 * `7+` survives a bump to 8 without becoming false, which is exactly how it
 * would go stale unnoticed — so the test fails on any major change and makes
 * somebody decide whether the page should now say 8.
 */

const root = join(import.meta.dir, "..", "..");

type RootManifest = { readonly catalog: Record<string, string> };

const manifest = JSON.parse(
  readFileSync(join(root, "package.json"), "utf8"),
) as RootManifest;

function major(range: string | undefined): number {
  return Number.parseInt((range ?? "").replace(/^\D*/, ""), 10);
}

test("the TypeScript major the page claims is the one we install", () => {
  expect(major(manifest.catalog.typescript)).toBe(MAJORS.typescript);
});
