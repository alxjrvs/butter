import type { StoryModule } from "../story.ts";
import { Layers } from "./Layers.ts";

export const story: StoryModule = {
  tier: "sections",
  component: "Layers",
  stories: [{ name: "tbsp 3", render: Layers }],
};
