import type { StoryModule } from "../story.ts";
import { Thesis } from "./Thesis.ts";

export const story: StoryModule = {
  tier: "sections",
  component: "Thesis",
  stories: [{ name: "tbsp 2", render: Thesis }],
};
