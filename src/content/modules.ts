import type { Module } from "@/types/lesson";
import { tagBuilderLessons } from "./tag-builder";
import { boxModelLessons } from "./box-model";
import { displayLayoutLessons } from "./display-layout";

export const modules: Module[] = [
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
];

export function getModule(slug: string): Module | undefined {
  return modules.find((m) => m.slug === slug);
}

export function getLesson(moduleSlug: string, lessonSlug: string) {
  const mod = getModule(moduleSlug);
  if (!mod) return undefined;
  return mod.lessons.find((l) => l.slug === lessonSlug);
}
