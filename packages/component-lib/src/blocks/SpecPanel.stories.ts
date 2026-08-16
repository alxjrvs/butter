import { SPEC } from "@butter/content";
import type { StoryModule } from "../story.ts";
import { SpecPanel } from "./SpecPanel.ts";

export const story: StoryModule = {
  tier: "blocks",
  component: "SpecPanel",
  stories: [
    {
      name: "stack facts",
      render: () =>
        SpecPanel({
          serving: SPEC.serving,
          groups: SPEC.groups,
          free: SPEC.free,
        }),
    },
  ],
};
