import type { StoryModule } from "../story.ts";
import { Keeping } from "./Keeping.ts";

export const story: StoryModule = {
  tier: "sections",
  component: "Keeping",
  stories: [{ name: "keeping", render: Keeping }],
};
