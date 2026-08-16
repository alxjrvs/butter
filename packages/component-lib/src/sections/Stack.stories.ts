import type { StoryModule } from "../story.ts";
import { Stack } from "./Stack.ts";

export const story: StoryModule = {
  tier: "sections",
  component: "Stack",
  stories: [{ name: "tbsp 1", render: Stack }],
};
