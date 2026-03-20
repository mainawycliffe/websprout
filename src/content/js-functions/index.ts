import type { Lesson } from "@/types/lesson";
import { lesson as whyFunctions } from "./01-why-functions";
import { lesson as functionDeclarations } from "./02-function-declarations";
import { lesson as parametersReturn } from "./03-parameters-return";
import { lesson as arrowFunctions } from "./04-arrow-functions";
import { lesson as functionExpressions } from "./05-function-expressions";
import { lesson as scope } from "./06-scope";
import { lesson as hoisting } from "./07-hoisting";
import { lesson as callbacks } from "./08-callbacks";
import { lesson as capstone } from "./09-capstone";
import { lesson as codelab } from "./10-codelab";

export const jsFunctionsLessons: Lesson[] = [
  whyFunctions,
  functionDeclarations,
  parametersReturn,
  arrowFunctions,
  functionExpressions,
  scope,
  hoisting,
  callbacks,
  capstone,
  codelab,
];
