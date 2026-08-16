import { LAYERS } from "@butter/content";
import type { StoryModule } from "../story.ts";
import { LayerList } from "./LayerList.ts";

export const story: StoryModule = {
  tier: "blocks",
  component: "LayerList",
  stories: [
    { name: "eight layers", render: () => LayerList(LAYERS) },
    { name: "single", render: () => LayerList(LAYERS.slice(0, 1)) },
  ],
};
