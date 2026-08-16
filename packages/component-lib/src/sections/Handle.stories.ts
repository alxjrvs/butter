import type { StoryModule } from "../story.ts";
import { Handle } from "./Handle.ts";

export const story: StoryModule = {
  tier: "sections",
  component: "Handle",
  stories: [{ name: "tbsp 4", render: Handle }],
};
