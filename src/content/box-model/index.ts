import type { Lesson } from "@/types/lesson";
import { lesson as contentBox } from "./01-content-box";
import { lesson as padding } from "./02-padding";
import { lesson as border } from "./03-border";
import { lesson as margin } from "./04-margin";
import { lesson as boxSizing } from "./05-box-sizing";
import { lesson as challenges } from "./06-challenges";
import { lesson as realWorld } from "./07-real-world";
import { lesson as codelabPadding } from "./08-codelab-padding";
import { lesson as codelabBorderMargin } from "./09-codelab-border-margin";
import { lesson as codelabBoxSizing } from "./10-codelab-box-sizing";

export const boxModelLessons: Lesson[] = [
  contentBox,
  padding,
  border,
  margin,
  boxSizing,
  challenges,
  realWorld,
  codelabPadding,
  codelabBorderMargin,
  codelabBoxSizing,
];
