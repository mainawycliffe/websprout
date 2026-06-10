import type { Lesson } from "@/types/lesson";
import { lesson as whatIsModernJs } from "./01-what-is-modern-js";
import { lesson as defaultParameters } from "./02-default-parameters";
import { lesson as spreadAndRest } from "./03-spread-and-rest";
import { lesson as objectShorthandComputed } from "./04-object-shorthand-computed";
import { lesson as arrayMap } from "./05-array-map";
import { lesson as arrayFilterFind } from "./06-array-filter-find";
import { lesson as arrayReduce } from "./07-array-reduce";
import { lesson as chainingPipelines } from "./08-chaining-pipelines";
import { lesson as destructuringInPractice } from "./09-destructuring-in-practice";
import { lesson as safeDataAccess } from "./10-safe-data-access";
import { lesson as asyncAndPromiseAll } from "./11-async-and-promise-all";
import { lesson as capstoneDataDashboard } from "./12-capstone-data-dashboard";
import { lesson as codelabCartModule } from "./13-codelab-cart-module";

export const modernJsLessons: Lesson[] = [
  whatIsModernJs,
  defaultParameters,
  spreadAndRest,
  objectShorthandComputed,
  arrayMap,
  arrayFilterFind,
  arrayReduce,
  chainingPipelines,
  destructuringInPractice,
  safeDataAccess,
  asyncAndPromiseAll,
  capstoneDataDashboard,
  codelabCartModule,
];
