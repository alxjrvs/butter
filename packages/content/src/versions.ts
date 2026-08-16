/**
 * The major versions the page commits to in prose, and nothing finer.
 *
 * A patch number is noise on a page about a stack, and it dates the copy within
 * a week of being written. What is worth saying is the major, and only where
 * the major means something: TypeScript 7 is a different language to work in
 * than TypeScript 5, so "TypeScript 7+" earns its place. "Biome 2.5.8" does
 * not.
 *
 * `versions.test.ts` asserts the major this repository installs still matches
 * the one the page claims, so a jump to TypeScript 8 turns the build red until
 * somebody decides what the page ought to say.
 */
export const MAJORS = {
  typescript: 7,
} as const;

export type MajorKey = keyof typeof MAJORS;
