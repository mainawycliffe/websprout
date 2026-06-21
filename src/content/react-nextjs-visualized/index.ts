import type { Lesson } from "@/types/lesson";
import { lesson as componentsAndTrees } from "./01-components-and-trees";
import { lesson as oneWayDataFlow } from "./02-one-way-data-flow";
import { lesson as renderingAndRerenders } from "./03-rendering-and-rerenders";
import { lesson as useEffectVisualized } from "./04-useeffect-visualized";
import { lesson as useMemoAndUseCallback } from "./05-usememo-and-usecallback";
import { lesson as nextjsFileRouting } from "./06-nextjs-file-routing";
import { lesson as nextjsLayoutFile } from "./07-nextjs-layout-file";
import { lesson as serverVsClientComponents } from "./08-server-vs-client-components";
import { lesson as capstoneReadingAnApp } from "./09-capstone-reading-an-app";
import { lesson as codelabDecomposeUi } from "./10-codelab-decompose-ui";
import { lesson as codelabSearchEffectMemo } from "./11-codelab-search-effect-memo";
import { lesson as codelabNextjsLayoutRoutes } from "./12-codelab-nextjs-layout-routes";

export const reactNextjsVisualizedLessons: Lesson[] = [
  componentsAndTrees,
  oneWayDataFlow,
  renderingAndRerenders,
  useEffectVisualized,
  useMemoAndUseCallback,
  nextjsFileRouting,
  nextjsLayoutFile,
  serverVsClientComponents,
  capstoneReadingAnApp,
  codelabDecomposeUi,
  codelabSearchEffectMemo,
  codelabNextjsLayoutRoutes,
];
