import { expect, test } from "bun:test";
import { join } from "node:path";
import { Glob } from "bun";
import { type StoryModule, TIERS, type Tier } from "./src/story.ts";

/**
 * One component, one story, taxonomy checked.
 *
 * The house rule is that visual elements live in exactly one package and that
 * every one of them has a story. Written down it is advice; written here it is
 * a failing job. Adding a component without a story fails CI, so does filing
 * one under the wrong tier, and so does leaving a story behind after deleting
 * the thing it documented.
 */

const src = join(import.meta.dir, "src");

/**
 * Files allowed at `src/` root — everything that is package machinery rather
 * than a component. Asserted, so "outside the taxonomy" cannot quietly become
 * a folder called `misc`.
 */
const INFRASTRUCTURE = ["document.ts", "story.ts", "styles.ts"];

type Entry = {
  readonly tier: string;
  readonly name: string;
  readonly file: string;
};

function scan(pattern: string): readonly string[] {
  return [...new Glob(pattern).scanSync(src)]
    .map((path) => path.replaceAll("\\", "/"))
    .sort();
}

function parse(paths: readonly string[], suffix: string): readonly Entry[] {
  return paths.map((path) => {
    const [tier = "", file = ""] = path.split("/");
    return { tier, file: path, name: file.slice(0, -suffix.length) };
  });
}

const components = parse(
  scan("{marks,blocks,sections}/*.ts").filter(
    (path) => !path.endsWith(".stories.ts"),
  ),
  ".ts",
);
const stories = parse(
  scan("{marks,blocks,sections}/*.stories.ts"),
  ".stories.ts",
);

const key = (entry: Entry): string => `${entry.tier}/${entry.name}`;

test("the taxonomy has all three tiers, and each is populated", () => {
  const populated = new Set(components.map((entry) => entry.tier));
  expect([...populated].sort()).toEqual([...TIERS].sort());
});

test("every component has exactly one story module", () => {
  const missing = components
    .filter(
      (component) => !stories.some((story) => key(story) === key(component)),
    )
    .map(key);
  expect(missing).toEqual([]);
});

test("no story without a component", () => {
  const orphans = stories
    .filter(
      (story) => !components.some((component) => key(component) === key(story)),
    )
    .map(key);
  expect(orphans).toEqual([]);
});

test("every story module's tier matches its directory", async () => {
  const mismatched: string[] = [];

  for (const entry of stories) {
    const module = (await import(join(src, entry.file))) as {
      readonly story?: StoryModule;
    };
    const story = module.story;

    if (story === undefined) {
      mismatched.push(`${key(entry)}: no exported \`story\``);
      continue;
    }
    if ((story.tier as string) !== entry.tier) {
      mismatched.push(`${key(entry)}: declares tier "${story.tier}"`);
    }
    if (story.component !== entry.name) {
      mismatched.push(`${key(entry)}: declares component "${story.component}"`);
    }
    if (story.stories.length === 0) {
      mismatched.push(`${key(entry)}: no stories`);
    }
  }

  expect(mismatched).toEqual([]);
});

test("every story renders something", async () => {
  const empty: string[] = [];

  for (const entry of stories) {
    const module = (await import(join(src, entry.file))) as {
      readonly story?: StoryModule;
    };
    for (const story of module.story?.stories ?? []) {
      if (story.render().trim().length === 0) {
        empty.push(`${key(entry)} › ${story.name}`);
      }
    }
  }

  expect(empty).toEqual([]);
});

test("src/ root holds only known infrastructure", () => {
  const loose = scan("*.ts").filter((file) => !INFRASTRUCTURE.includes(file));
  expect(loose).toEqual([]);
});

test("a tier is a directory name, not a free string", () => {
  const dirs: readonly Tier[] = TIERS;
  expect(new Set(dirs).size).toBe(dirs.length);
});
