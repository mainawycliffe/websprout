import type { Lesson } from "@/types/lesson";
import { lesson as warmUpDrills } from "./01-warm-up-drills";
import { lesson as stringArrayDrills } from "./02-string-array-drills";
import { lesson as functionDrills } from "./03-function-drills";
import { lesson as classDrills } from "./04-class-drills";
import { lesson as mapsSetsDrills } from "./05-maps-sets-drills";
import { lesson as modernFeaturesDrills } from "./06-modern-features-drills";
import { lesson as equalityCoercion } from "./07-equality-coercion";
import { lesson as nanPrecisionPitfalls } from "./08-nan-precision-pitfalls";
import { lesson as referenceVsValue } from "./09-reference-vs-value";
import { lesson as hoistingClosuresThis } from "./10-hoisting-closures-this";
import { lesson as tsWhyAndTypes } from "./11-ts-why-and-types";
import { lesson as tsInterfacesAliases } from "./12-ts-interfaces-aliases";
import { lesson as tsUnionsNarrowing } from "./13-ts-unions-narrowing";
import { lesson as tsGenericsBasics } from "./14-ts-generics-basics";
import { lesson as capstoneTypedTodoEngine } from "./15-capstone-typed-todo-engine";
import { lesson as codelabTypedBudgetTracker } from "./16-codelab-typed-budget-tracker";

export const jsPracticeTsLessons: Lesson[] = [
  warmUpDrills,
  stringArrayDrills,
  functionDrills,
  classDrills,
  mapsSetsDrills,
  modernFeaturesDrills,
  equalityCoercion,
  nanPrecisionPitfalls,
  referenceVsValue,
  hoistingClosuresThis,
  tsWhyAndTypes,
  tsInterfacesAliases,
  tsUnionsNarrowing,
  tsGenericsBasics,
  capstoneTypedTodoEngine,
  codelabTypedBudgetTracker,
];
