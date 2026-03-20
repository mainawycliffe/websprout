import type { Lesson } from "@/types/lesson";
import { lesson as comparisonOperators } from "./01-comparison-operators";
import { lesson as ifElse } from "./02-if-else";
import { lesson as logicalOperators } from "./03-logical-operators";
import { lesson as switchStatement } from "./04-switch";
import { lesson as forLoops } from "./05-for-loops";
import { lesson as whileLoops } from "./06-while-loops";
import { lesson as ternary } from "./07-ternary";
import { lesson as errorHandling } from "./08-error-handling";
import { lesson as capstone } from "./09-capstone";
import { lesson as codelab } from "./10-codelab";

export const jsFlowControlLessons: Lesson[] = [
  comparisonOperators,
  ifElse,
  logicalOperators,
  switchStatement,
  forLoops,
  whileLoops,
  ternary,
  errorHandling,
  capstone,
  codelab,
];
