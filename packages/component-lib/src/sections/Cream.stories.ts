import type { StoryModule } from "../story.ts";
import { Cream } from "./Cream.ts";

export const story: StoryModule = {
  tier: "sections",
  component: "Cream",
  stories: [{ name: "tbsp 1", render: Cream }],
};
