import type { StoryModule } from "../story.ts";
import { Lamination } from "./Lamination.ts";

export const story: StoryModule = {
  tier: "sections",
  component: "Lamination",
  stories: [{ name: "tbsp 3", render: Lamination }],
};
