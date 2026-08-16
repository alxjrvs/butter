import type { StoryModule } from "../story.ts";
import { Start } from "./Start.ts";

export const story: StoryModule = {
  tier: "sections",
  component: "Start",
  stories: [{ name: "tbsp 8", render: Start }],
};
