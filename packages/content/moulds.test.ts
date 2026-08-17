import { expect, test } from "bun:test";
import { MOULDS, MOULDS_LIST } from "./src/moulds.ts";

/**
 * The links in "Moulds", asserted rather than trusted.
 *
 * CLAUDE.md says every app the page points at is a public repository reached by
 * an absolute `https://github.com/…` href. Written only there, that is advice —
 * and the page is published under `/butter/`, so the failure mode of getting it
 * wrong is a 404 on the only clickable evidence the section offers.
 *
 * What is checkable offline is checked here: the scheme, the host, and the
 * agreement between a label and the thing it labels. Whether the url *resolves*
 * is not — public or private, `main` still the default branch, the directory
 * not since renamed are all facts about GitHub on the day someone reads the
 * page, not about this file — so that stays a rule in CLAUDE.md and a link to
 * open by hand when adding an entry.
 *
 * "A shape names at least one app" is deliberately not here. `Mould.apps` is a
 * non-empty tuple, so an empty list does not compile, and a test that cannot
 * fail reads as coverage while providing none.
 */

const apps = MOULDS_LIST.flatMap((mould) =>
  mould.apps.map((app) => ({ shape: mould.shape, ...app })),
);

test("every href is an absolute GitHub url", () => {
  const wrong = apps
    .filter((app) => !app.href.startsWith("https://github.com/"))
    .map((app) => `${app.label}: ${app.href}`);
  expect(wrong).toEqual([]);
});

/**
 * The label is a shorthand for the href, so the two can disagree — retarget a
 * link, leave the label, and the page names one app while linking another.
 * Nothing else would notice.
 *
 * A label is `<repo>/<path>` today because every entry is an app inside a
 * monorepo, but the shapes are not required to be: a whole repository is a
 * legitimate thing to point at, and its label has no path at all. That case is
 * split out rather than left to fall through, because the fall-through does not
 * merely miss it — it fails a correct entry, with a message describing a
 * mismatch that isn't there.
 */
test("every label agrees with the url it labels", () => {
  const mismatched: string[] = [];

  for (const app of apps) {
    // `/owner/repo` for a repository, `/owner/repo/tree/<ref>/<path>` inside
    // one. Split into segments rather than searched: a substring test for
    // `/<repo>/` is satisfied by the OWNER segment just as happily, so the one
    // disagreement this test exists to catch — a label naming a repository the
    // url does not — is the one it would miss.
    // Leading "" from the leading slash, then owner, then the repository.
    const [, , repo = "", kind = "", , ...rest] = new URL(
      app.href,
    ).pathname.split("/");
    const [labelRepo = "", ...labelPath] = app.label.split("/");

    if (labelRepo !== repo) {
      mismatched.push(`${app.label}: url is in "${repo}", not "${labelRepo}"`);
    }
    if (labelPath.join("/") !== rest.join("/")) {
      mismatched.push(
        `${app.label}: url points at "${rest.join("/") || repo}"`,
      );
    }
    if (labelPath.length > 0 && kind !== "tree") {
      mismatched.push(`${app.label}: url is not a tree url`);
    }
  }

  expect(mismatched).toEqual([]);
});

/**
 * The outro says the shape is chosen per app: every shape appears in more than
 * one repository, and one repository is in all four at once.
 *
 * That is a count in prose about data sitting in the same file, which is the
 * drift `versions.test.ts` and `recipe.test.ts` exist to stop — and CLAUDE.md's
 * own "counting dates the claim" rule is two lines from where it is written. So
 * the claims are derived from `MOULDS_LIST` here instead of trusted: add an app
 * that makes either sentence false and the build says so.
 */
const reposIn = (shape: (typeof MOULDS_LIST)[number]): ReadonlySet<string> =>
  new Set(shape.apps.map((app) => app.label.split("/")[0] ?? ""));

test("every shape is in more than one repository", () => {
  const lonely = MOULDS_LIST.filter((mould) => reposIn(mould).size < 2).map(
    (mould) => mould.shape,
  );
  expect(lonely).toEqual([]);
});

test("one repository is in every shape", () => {
  const [first, ...others] = MOULDS_LIST.map(reposIn);
  const inAll = [...(first ?? [])].filter((repo) =>
    others.every((repos) => repos.has(repo)),
  );
  expect(inAll.length).toBeGreaterThan(0);
});

/**
 * The section says "four" three times — in the deck, the intro and the outro —
 * about an array in the same file. A fifth shape would leave three sentences on
 * the published page saying four, with everything green.
 *
 * The assertion is that the spelled count is *present*, not that no other
 * number word appears: "one" is doing honest work in the outro as a quantifier,
 * and a check that banned it would be wrong about correct prose.
 */
const NUMBERS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
];

test("the prose counts the shapes correctly", () => {
  const prose = `${MOULDS.deck} ${MOULDS.intro} ${MOULDS.outro}`.toLowerCase();
  expect(prose).toContain(NUMBERS[MOULDS_LIST.length] ?? "unspellable");
});

test("an app is listed once per shape", () => {
  for (const mould of MOULDS_LIST) {
    const labels = mould.apps.map((app) => app.label);
    expect(new Set(labels).size).toBe(labels.length);
  }
});
