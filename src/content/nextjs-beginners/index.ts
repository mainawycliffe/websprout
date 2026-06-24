import type { Lesson } from "@/types/lesson";
import { lesson as whatIsNextjs } from "./01-what-is-nextjs";
import { lesson as installingNodeNpm } from "./02-installing-node-npm";
import { lesson as createNextApp } from "./03-create-next-app";
import { lesson as projectTour } from "./04-project-tour";
import { lesson as appRouterPagesLayouts } from "./05-app-router-pages-layouts";
import { lesson as creatingRoutes } from "./06-creating-routes";
import { lesson as linkingWithNextLink } from "./07-linking-with-next-link";
import { lesson as nestedLayouts } from "./08-nested-layouts";
import { lesson as serverVsClientComponents } from "./09-server-vs-client-components";
import { lesson as dataFetching } from "./10-data-fetching";
import { lesson as stylingAndAssets } from "./11-styling-and-assets";
import { lesson as colocation } from "./12-colocation";
import { lesson as routeGroups } from "./13-route-groups";
import { lesson as dynamicRoutes } from "./14-dynamic-routes";
import { lesson as projectStructure } from "./15-project-structure";
import { lesson as capstoneMultipageSite } from "./16-capstone-multipage-site";
import { lesson as codelabFanPage } from "./17-codelab-fan-page";

export const nextjsBeginnersLessons: Lesson[] = [
  whatIsNextjs,
  installingNodeNpm,
  createNextApp,
  projectTour,
  appRouterPagesLayouts,
  creatingRoutes,
  linkingWithNextLink,
  nestedLayouts,
  serverVsClientComponents,
  dataFetching,
  stylingAndAssets,
  colocation,
  routeGroups,
  dynamicRoutes,
  projectStructure,
  capstoneMultipageSite,
  codelabFanPage,
];
