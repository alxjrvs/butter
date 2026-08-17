import type { StoryModule } from "../story.ts";
import { Moulds } from "./Moulds.ts";

export const story: StoryModule = {
  tier: "sections",
  component: "Moulds",
  stories: [{ name: "tbsp 7", render: Moulds }],
};
