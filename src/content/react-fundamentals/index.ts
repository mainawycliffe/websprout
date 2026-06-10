import type { Lesson } from "@/types/lesson";
import { lesson as whatIsReact } from "./01-what-is-react";
import { lesson as firstRenderCdnSetup } from "./02-first-render-cdn-setup";
import { lesson as jsxBasics } from "./03-jsx-basics";
import { lesson as components } from "./04-components";
import { lesson as props } from "./05-props";
import { lesson as stateUseState } from "./06-state-usestate";
import { lesson as eventHandling } from "./07-event-handling";
import { lesson as conditionalRendering } from "./08-conditional-rendering";
import { lesson as listsAndKeys } from "./09-lists-and-keys";
import { lesson as useEffectBasics } from "./10-useeffect-basics";
import { lesson as capstoneTipCalculator } from "./11-capstone-tip-calculator";
import { lesson as codelabTodoApp } from "./12-codelab-todo-app";
import { lesson as graduatingToAToolchain } from "./13-graduating-to-a-toolchain";

export const reactFundamentalsLessons: Lesson[] = [
  whatIsReact,
  firstRenderCdnSetup,
  jsxBasics,
  components,
  props,
  stateUseState,
  eventHandling,
  conditionalRendering,
  listsAndKeys,
  useEffectBasics,
  capstoneTipCalculator,
  codelabTodoApp,
  graduatingToAToolchain,
];
