import type { StoryModule } from "../story.ts";
import { Spread } from "./Spread.ts";

export const story: StoryModule = {
  tier: "sections",
  component: "Spread",
  stories: [{ name: "tbsp 8", render: Spread }],
};
