import { SPEC } from "@butter/content";
import type { StoryModule } from "../story.ts";
import { StackList } from "./StackList.ts";

export const story: StoryModule = {
  tier: "blocks",
  component: "StackList",
  stories: [
    { name: "the stack", render: () => StackList(SPEC) },
    { name: "no version", render: () => StackList(SPEC.slice(5, 6)) },
  ],
};
