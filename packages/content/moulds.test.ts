import { expect, test } from "bun:test";
import { MOULDS_LIST } from "./src/moulds.ts";

/**
 * The links in "Moulds", asserted rather than trusted.
 *
 * CLAUDE.md says every app the page points at is a public repository reached by
 * an absolute `https://github.com/…` href. Written only there, that is advice —
 * and the page is published under `/butter/`, so the failure mode of getting it
 * wrong is a 404 on the only clickable evidence the section offers.
 *
 * What is checkable offline is checked here: the scheme, the host, and the
 * agreement between a label and the thing it labels. Whether a repository is
 * *public* is not — that is a property of GitHub on the day someone reads it,
 * not of this file — so it stays a rule in CLAUDE.md and a step when adding an
 * entry.
 */

const apps = MOULDS_LIST.flatMap((mould) =>
  mould.apps.map((app) => ({ shape: mould.shape, ...app })),
);

test("every mould names at least one app", () => {
  const empty = MOULDS_LIST.filter((mould) => mould.apps.length === 0).map(
    (mould) => mould.shape,
  );
  expect(empty).toEqual([]);
});

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
 */
test("every label agrees with the url it labels", () => {
  const mismatched: string[] = [];

  for (const app of apps) {
    const [repo = "", ...path] = app.label.split("/");

    if (!app.href.includes(`/${repo}/`)) {
      mismatched.push(`${app.label}: url names no repository "${repo}"`);
    }
    if (!app.href.endsWith(`/${path.join("/")}`)) {
      mismatched.push(`${app.label}: url does not end at ${path.join("/")}`);
    }
  }

  expect(mismatched).toEqual([]);
});

test("an app is listed once per shape", () => {
  for (const mould of MOULDS_LIST) {
    const labels = mould.apps.map((app) => app.label);
    expect(new Set(labels).size).toBe(labels.length);
  }
});
