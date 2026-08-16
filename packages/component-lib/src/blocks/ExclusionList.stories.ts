import { EXCLUSIONS } from "@butter/content";
import type { StoryModule } from "../story.ts";
import { ExclusionList } from "./ExclusionList.ts";

export const story: StoryModule = {
  tier: "blocks",
  component: "ExclusionList",
  stories: [
    { name: "not in the stack", render: () => ExclusionList(EXCLUSIONS) },
  ],
};
