import type { Lesson } from "@/types/lesson";
import { lesson as firstTag } from "./01-first-tag";
import { lesson as headingsParagraphs } from "./02-headings-paragraphs";
import { lesson as nesting } from "./03-nesting";
import { lesson as attributes } from "./04-attributes";
import { lesson as linkingCss } from "./05-linking-css";
import { lesson as firstCssRule } from "./06-first-css-rule";
import { lesson as propertiesValues } from "./07-properties-values";
import { lesson as selectors } from "./08-selectors";
import { lesson as combiningHtmlCss } from "./09-combining-html-css";

export const tagBuilderLessons: Lesson[] = [
  firstTag,
  headingsParagraphs,
  nesting,
  attributes,
  linkingCss,
  firstCssRule,
  propertiesValues,
  selectors,
  combiningHtmlCss,
];
