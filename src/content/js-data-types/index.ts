import type { Lesson } from "@/types/lesson";
import { lesson as strings } from "./01-strings";
import { lesson as numbers } from "./02-numbers";
import { lesson as booleans } from "./03-booleans";
import { lesson as typeCoercion } from "./04-type-coercion";
import { lesson as arrays } from "./05-arrays";
import { lesson as loopingArrays } from "./06-looping-arrays";
import { lesson as objects } from "./07-objects";
import { lesson as destructuring } from "./08-destructuring";
import { lesson as capstone } from "./09-capstone";
import { lesson as codelab } from "./10-codelab";

export const jsDataTypesLessons: Lesson[] = [
  strings,
  numbers,
  booleans,
  typeCoercion,
  arrays,
  loopingArrays,
  objects,
  destructuring,
  capstone,
  codelab,
];
