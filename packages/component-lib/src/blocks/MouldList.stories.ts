import { MOULDS_LIST } from "@butter/content";
import type { StoryModule } from "../story.ts";
import { MouldList } from "./MouldList.ts";

export const story: StoryModule = {
  tier: "blocks",
  component: "MouldList",
  stories: [
    { name: "four shapes", render: () => MouldList(MOULDS_LIST) },
    { name: "single", render: () => MouldList(MOULDS_LIST.slice(0, 1)) },
  ],
};
