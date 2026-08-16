import { expect, test } from "bun:test";
import { NAME_KEY } from "./src/cream.ts";

/**
 * The name key has to spell the name.
 *
 * The label renders each entry's word with its first character picked out in
 * butter, so the acronym is only legible if the initials really do line up.
 * Adding a seventh favourite tool, or reordering two, breaks the word the page
 * is named after — quietly, and only to a reader who tries to read down the
 * left edge. This makes it break loudly instead.
 */

test("the name key spells BUTTER", () => {
  expect(NAME_KEY.map((entry) => entry.word.charAt(0)).join("")).toBe("BUTTER");
});

test("every entry has a word to take an initial from", () => {
  const empty = NAME_KEY.filter((entry) => entry.word.length === 0);
  expect(empty).toEqual([]);
});
