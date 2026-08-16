import { html } from "@butter/core";
import type { StoryModule } from "../story.ts";
import { Version } from "./Version.ts";

export const story: StoryModule = {
  tier: "marks",
  component: "Version",
  stories: [
    {
      name: "catalog keys",
      render: () =>
        html(
          `bun ${Version("bun")} · typescript ${Version("typescript")} · ` +
            `biome ${Version("biome")}`,
        ),
    },
  ],
};
