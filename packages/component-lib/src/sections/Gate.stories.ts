import type { StoryModule } from "../story.ts";
import { Gate } from "./Gate.ts";

export const story: StoryModule = {
  tier: "sections",
  component: "Gate",
  stories: [{ name: "tbsp 4", render: Gate }],
};
