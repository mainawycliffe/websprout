import type { Lesson } from "@/types/lesson";
import { lesson as whyReactDataFetching } from "./01-why-react-data-fetching";
import { lesson as fetchInUseEffect } from "./02-fetch-in-useeffect";
import { lesson as loadingAndErrorStates } from "./03-loading-and-error-states";
import { lesson as renderingFetchedLists } from "./04-rendering-fetched-lists";
import { lesson as animatedLoadingUx } from "./05-animated-loading-ux";
import { lesson as refetchingOnChange } from "./06-refetching-on-change";
import { lesson as raceConditionsAndCleanup } from "./07-race-conditions-and-cleanup";
import { lesson as customFetchHook } from "./08-custom-fetch-hook";
import { lesson as beyondUseEffectDataLibraries } from "./09-beyond-useeffect-data-libraries";
import { lesson as nextjsServerComponentsFetching } from "./10-nextjs-server-components-fetching";
import { lesson as loadingAndErrorFiles } from "./11-loading-and-error-files";
import { lesson as dynamicRoutesData } from "./12-dynamic-routes-data";
import { lesson as capstoneDataPanel } from "./13-capstone-data-panel";
import { lesson as codelabCountryDashboard } from "./14-codelab-country-dashboard";

export const dataFetchingLessons: Lesson[] = [
  whyReactDataFetching,
  fetchInUseEffect,
  loadingAndErrorStates,
  renderingFetchedLists,
  animatedLoadingUx,
  refetchingOnChange,
  raceConditionsAndCleanup,
  customFetchHook,
  beyondUseEffectDataLibraries,
  nextjsServerComponentsFetching,
  loadingAndErrorFiles,
  dynamicRoutesData,
  capstoneDataPanel,
  codelabCountryDashboard,
];
