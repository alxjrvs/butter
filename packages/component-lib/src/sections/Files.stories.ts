import type { StoryModule } from "../story.ts";
import { Files } from "./Files.ts";

export const story: StoryModule = {
  tier: "sections",
  component: "Files",
  stories: [{ name: "tbsp 5", render: Files }],
};
