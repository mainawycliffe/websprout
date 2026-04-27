import type { Lesson } from "@/types/lesson";
import { lesson as whyPositioning } from "./01-why-positioning";
import { lesson as staticRelative } from "./02-position-static-relative";
import { lesson as absolutePos } from "./03-position-absolute";
import { lesson as fixedPos } from "./04-position-fixed";
import { lesson as stickyPos } from "./05-position-sticky";
import { lesson as zIndexStacking } from "./06-z-index-stacking";
import { lesson as stackingContexts } from "./07-stacking-contexts";
import { lesson as pseudoTooltip } from "./08-pseudo-elements-tooltip";
import { lesson as capstone } from "./09-capstone";
import { lesson as codelabModal } from "./10-codelab-modal";

export const cssPositioningLessons: Lesson[] = [
  whyPositioning,
  staticRelative,
  absolutePos,
  fixedPos,
  stickyPos,
  zIndexStacking,
  stackingContexts,
  pseudoTooltip,
  capstone,
  codelabModal,
];
