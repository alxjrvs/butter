import { expect, test } from "bun:test";
import { NAME_KEY, nameInitial } from "./src/cream.ts";
import { WRAPPER } from "./src/wrapper.ts";

/**
 * The name key still spells the name.
 *
 * `NameKeyEntry` used to carry a `letter` alongside its `word`, and the label
 * printed both — which is where "B Bun" came from. The letter is the word's own
 * first character now, coloured in place, so there is nothing left to disagree.
 *
 * That removed a constraint, though, and this replaces it with a better one.
 * The old field only required that an entry carry *a* letter; it never checked
 * that the letters added up to anything, so `NAME_KEY` could have grown an
 * entry, lost one, or been reordered and still typechecked. What the section
 * actually claims is that these six initials are the name — so that is what is
 * asserted, against `WRAPPER.name` rather than a literal, because the name is
 * already written down once.
 *
 * `nameInitial` is the label's own function, not a second copy of the rule.
 * Re-deriving the first character here would assert about this file's idea of
 * it, and leave the panel free to colour something else.
 */

const initials = NAME_KEY.map((entry) => nameInitial(entry.word)).join("");

test("the name key's initials spell the name", () => {
  expect(initials.toLowerCase()).toBe(WRAPPER.name.toLowerCase());
});

test("every entry starts with a letter, so every entry can be coloured", () => {
  const wordless = NAME_KEY.filter(
    (entry) => !/^[A-Za-z]/.test(entry.word),
  ).map((entry) => entry.word);
  expect(wordless).toEqual([]);
});
