import { HANDLE } from "@butter/content";
import type { StoryModule } from "../story.ts";
import { CodeBlock } from "./CodeBlock.ts";

export const story: StoryModule = {
  tier: "blocks",
  component: "CodeBlock",
  stories: [{ name: "the gate", render: () => CodeBlock(HANDLE.snippet) }],
};
