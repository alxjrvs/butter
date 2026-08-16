import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { HANDLE } from "./src/handle.ts";
import { RECIPE } from "./src/recipe.ts";
import type { Snippet } from "./src/types.ts";

/**
 * The page says its snippets are lifted straight out of the repository. This
 * is what makes that true.
 *
 * Comparison is line-by-line on trimmed lines, so a snippet may be dedented for
 * display but may not drop a line, reorder one, or reword one. That is the
 * whole failure mode worth catching: a config gains a command, the page keeps
 * showing the old one, and a reader copies something that no longer matches the
 * repo it came from.
 */

const root = join(import.meta.dir, "..", "..");

/** Every snippet on the page, wherever it lives. */
const SNIPPETS: readonly Snippet[] = [...RECIPE.snippets, HANDLE.snippet];

function lines(source: string): readonly string[] {
  return source
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

/** Is `needle` a contiguous run inside `haystack`? */
function containsRun(
  haystack: readonly string[],
  needle: readonly string[],
): boolean {
  if (needle.length === 0) {
    return false;
  }
  for (let start = 0; start + needle.length <= haystack.length; start++) {
    if (needle.every((line, offset) => haystack[start + offset] === line)) {
      return true;
    }
  }
  return false;
}

for (const snippet of SNIPPETS) {
  test(`${snippet.caption} still matches ${snippet.file}`, () => {
    const actual = lines(readFileSync(join(root, snippet.file), "utf8"));
    const quoted = lines(snippet.source);

    const missing = quoted.filter((line) => !actual.includes(line));
    expect(missing).toEqual([]);
    expect(containsRun(actual, quoted)).toBe(true);
  });
}
