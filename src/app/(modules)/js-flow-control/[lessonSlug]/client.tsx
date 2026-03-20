"use client";

import type { Lesson } from "@/types/lesson";
import JavaScriptLesson from "@/components/javascript/JavaScriptLesson";

export default function JsFlowControlLessonClient({
  lesson,
}: {
  lesson: Lesson;
  lessonSlug: string;
}) {
  return (
    <JavaScriptLesson
      moduleId="js-flow-control"
      lesson={lesson}
    />
  );
}
