import type { Lesson } from "@/types/lesson";
import { lesson as buildingBlocksOfWeb } from "./01-building-blocks-of-web";
import { lesson as whatIsHtml } from "./02-what-is-html";
import { lesson as whatIsCss } from "./03-what-is-css";
import { lesson as whatIsJavascript } from "./04-what-is-javascript";
import { lesson as webConcepts } from "./05-web-concepts";
import { lesson as clientServer } from "./06-client-server";
import { lesson as capstone } from "./07-capstone";

export const courseOverviewLessons: Lesson[] = [
  buildingBlocksOfWeb,
  whatIsHtml,
  whatIsCss,
  whatIsJavascript,
  webConcepts,
  clientServer,
  capstone,
];
