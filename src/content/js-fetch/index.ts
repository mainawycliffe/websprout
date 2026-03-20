import type { Lesson } from "@/types/lesson";
import { lesson as whyFetching } from "./01-why-fetching";
import { lesson as jsonFormat } from "./02-json-format";
import { lesson as promises } from "./03-promises";
import { lesson as asyncAwait } from "./04-async-await";
import { lesson as firstFetch } from "./05-first-fetch";
import { lesson as responseObject } from "./06-response-object";
import { lesson as errorHandling } from "./07-error-handling";
import { lesson as fetchToDom } from "./08-fetch-to-dom";
import { lesson as postRequests } from "./09-post-requests";
import { lesson as loadingStates } from "./10-loading-states";
import { lesson as capstonePokemon } from "./11-capstone-pokemon";
import { lesson as codelabWeather } from "./12-codelab-weather";

export const jsFetchLessons: Lesson[] = [
  whyFetching,
  jsonFormat,
  promises,
  asyncAwait,
  firstFetch,
  responseObject,
  errorHandling,
  fetchToDom,
  postRequests,
  loadingStates,
  capstonePokemon,
  codelabWeather,
];
