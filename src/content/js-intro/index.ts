import type { Lesson } from "@/types/lesson";
import { lesson as whatIsJs } from "./01-what-is-js";
import { lesson as browserConsole } from "./02-browser-console";
import { lesson as variablesLet } from "./03-variables-let";
import { lesson as constants } from "./04-constants";
import { lesson as comments } from "./05-comments";
import { lesson as capstone } from "./06-capstone";
import { lesson as codelab } from "./07-codelab";

export const jsIntroLessons: Lesson[] = [
  whatIsJs,
  browserConsole,
  variablesLet,
  constants,
  comments,
  capstone,
  codelab,
];
