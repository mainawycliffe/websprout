import type { Module } from "@/types/lesson";
import { courseOverviewLessons } from "./course-overview";
import { tagBuilderLessons } from "./tag-builder";
import { boxModelLessons } from "./box-model";
import { displayLayoutLessons } from "./display-layout";
import { responsiveDesignLessons } from "./responsive-design";
import { webAccessibilityLessons } from "./web-accessibility";

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
];

export function getModule(slug: string): Module | undefined {
  return modules.find((m) => m.slug === slug);
}

export function getLesson(moduleSlug: string, lessonSlug: string) {
  const mod = getModule(moduleSlug);
  if (!mod) return undefined;
  return mod.lessons.find((l) => l.slug === lessonSlug);
}
