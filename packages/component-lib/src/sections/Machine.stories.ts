import type { StoryModule } from "../story.ts";
import { Machine } from "./Machine.ts";

export const story: StoryModule = {
  tier: "sections",
  component: "Machine",
  stories: [{ name: "tbsp 7", render: Machine }],
};
