import type { Lesson } from "@/types/lesson";
import { lesson as scriptTag } from "./01-script-tag";
import { lesson as esModules } from "./02-es-modules";
import { lesson as selectingElements } from "./03-selecting-elements";
import { lesson as readingChanging } from "./04-reading-changing";
import { lesson as classesStyles } from "./05-classes-styles";
import { lesson as eventListeners } from "./06-event-listeners";
import { lesson as eventDelegation } from "./07-event-delegation";
import { lesson as capstone } from "./08-capstone";
import { lesson as codelabTodo } from "./09-codelab-todo";
import { lesson as codelabColor } from "./10-codelab-color";
import { lesson as practicePredictOutput } from "./11-practice-predict-output";
import { lesson as practiceFixBroken } from "./12-practice-fix-broken";
import { lesson as practiceBuildFromScratch } from "./13-practice-build-from-scratch";

export const jsDomLessons: Lesson[] = [
  scriptTag,
  esModules,
  selectingElements,
  readingChanging,
  classesStyles,
  eventListeners,
  eventDelegation,
  capstone,
  codelabTodo,
  codelabColor,
  practicePredictOutput,
  practiceFixBroken,
  practiceBuildFromScratch,
];
