import type { Module } from "@/types/lesson";
import { courseOverviewLessons } from "./course-overview";
import { tagBuilderLessons } from "./tag-builder";
import { boxModelLessons } from "./box-model";
import { displayLayoutLessons } from "./display-layout";
import { responsiveDesignLessons } from "./responsive-design";
import { webAccessibilityLessons } from "./web-accessibility";
import { jsIntroLessons } from "./js-intro";
import { jsDataTypesLessons } from "./js-data-types";
import { jsFlowControlLessons } from "./js-flow-control";
import { jsFunctionsLessons } from "./js-functions";
import { jsDomLessons } from "./js-dom";

export const modules: Module[] = [
  {
    id: "course-overview",
    title: "Course Overview",
    description:
      "Understand what the web is and how it works — HTML, CSS, JavaScript, browsers, servers, and the journey of a web page.",
    slug: "course-overview",
    icon: "\u{1F310}",
    color: "#06B6D4",
    lessons: courseOverviewLessons,
  },
  {
    id: "tag-builder",
    title: "Tag Builder",
    description:
      "Learn how HTML & CSS work from the ground up. Build tags, nest elements, and write your first styles.",
    slug: "tag-builder",
    icon: "\u{1F4E6}",
    color: "#3B82F6",
    lessons: tagBuilderLessons,
  },
  {
    id: "box-model",
    title: "Box Model Explorer",
    description:
      "See the CSS box model in 3D. Understand how content, padding, border, and margin work together.",
    slug: "box-model",
    icon: "\u{1F4D0}",
    color: "#8B5CF6",
    lessons: boxModelLessons,
  },
  {
    id: "display-layout",
    title: "Display & Layout",
    description:
      "Learn how the browser arranges elements. Master block, inline, flexbox, and CSS grid to build real page layouts.",
    slug: "display-layout",
    icon: "\u{1F9E9}",
    color: "#EC4899",
    lessons: displayLayoutLessons,
  },
  {
    id: "responsive-design",
    title: "Responsive Web Design",
    description:
      "Make websites adapt to any screen size. Master media queries, fluid typography, and mobile-first design.",
    slug: "responsive-design",
    icon: "\u{1F4F1}",
    color: "#F59E0B",
    lessons: responsiveDesignLessons,
  },
  {
    id: "web-accessibility",
    title: "Web Accessibility (A11y)",
    description:
      "Learn how to make websites accessible to all users. Master semantic HTML, ARIA attributes, keyboard navigation, color contrast, and accessibility testing.",
    slug: "web-accessibility",
    icon: "\u267F",
    color: "#10B981",
    lessons: webAccessibilityLessons,
  },
  {
    id: "js-intro",
    title: "JS Playground",
    description:
      "Discover what JavaScript is and write your first lines of code. Learn variables, constants, and the browser console.",
    slug: "js-intro",
    icon: "\u26A1",
    color: "#F59E0B",
    lessons: jsIntroLessons,
  },
  {
    id: "js-data-types",
    title: "Data Explorer",
    description:
      "Master JavaScript data types, arrays, and objects. Learn strings, numbers, booleans, and how to organize data into collections.",
    slug: "js-data-types",
    icon: "\u{1F4CA}",
    color: "#3B82F6",
    lessons: jsDataTypesLessons,
  },
  {
    id: "js-flow-control",
    title: "Flow Control",
    description:
      "Make your programs smart with decisions and loops. Master if/else, switch, for loops, and the ternary operator.",
    slug: "js-flow-control",
    icon: "\u{1F500}",
    color: "#8B5CF6",
    lessons: jsFlowControlLessons,
  },
  {
    id: "js-functions",
    title: "Function Factory",
    description:
      "Write reusable code with functions. Learn declarations, arrow functions, scope, hoisting, and callbacks.",
    slug: "js-functions",
    icon: "\u{2699}\uFE0F",
    color: "#EC4899",
    lessons: jsFunctionsLessons,
  },
  {
    id: "js-dom",
    title: "DOM Connector",
    description:
      "Connect JavaScript to the browser. Select elements, respond to events, and build interactive web pages.",
    slug: "js-dom",
    icon: "\u{1F50C}",
    color: "#10B981",
    lessons: jsDomLessons,
  },
];

export function getModule(slug: string): Module | undefined {
  return modules.find((m) => m.slug === slug);
}

export function getLesson(moduleSlug: string, lessonSlug: string) {
  const mod = getModule(moduleSlug);
  if (!mod) return undefined;
  return mod.lessons.find((l) => l.slug === lessonSlug);
}
