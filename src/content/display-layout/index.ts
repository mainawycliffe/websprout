import type { Lesson } from "@/types/lesson";
import { lesson as normalFlow } from "./01-normal-flow";
import { lesson as blockVsInline } from "./02-block-vs-inline";
import { lesson as inlineBlock } from "./03-inline-block";
import { lesson as displayNone } from "./04-display-none";
import { lesson as flexbox } from "./05-flexbox";
import { lesson as cssGrid } from "./06-css-grid";
import { lesson as capstone } from "./07-capstone";
import { lesson as codelabBlockInline } from "./08-codelab-block-inline";
import { lesson as codelabInlineBlockNav } from "./09-codelab-inline-block-nav";
import { lesson as codelabShowHide } from "./10-codelab-show-hide";
import { lesson as codelabFlexboxNavbar } from "./11-codelab-flexbox-navbar";
import { lesson as codelabFlexboxCards } from "./12-codelab-flexbox-cards";
import { lesson as codelabGridGallery } from "./13-codelab-grid-gallery";

export const displayLayoutLessons: Lesson[] = [
  normalFlow,
  blockVsInline,
  inlineBlock,
  displayNone,
  flexbox,
  cssGrid,
  capstone,
  codelabBlockInline,
  codelabInlineBlockNav,
  codelabShowHide,
  codelabFlexboxNavbar,
  codelabFlexboxCards,
  codelabGridGallery,
];
