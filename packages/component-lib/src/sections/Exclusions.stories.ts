import type { StoryModule } from "../story.ts";
import { Exclusions } from "./Exclusions.ts";

export const story: StoryModule = {
  tier: "sections",
  component: "Exclusions",
  stories: [{ name: "tbsp 6", render: Exclusions }],
};
