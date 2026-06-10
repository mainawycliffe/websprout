"use client";

import type { Lesson } from "@/types/lesson";
import JavaScriptLesson from "@/components/javascript/JavaScriptLesson";

export default function ModernJsLessonClient({
  lesson,
  initialStep,
}: {
  lesson: Lesson;
  lessonSlug: string;
  initialStep?: number;
}) {
  return (
    <JavaScriptLesson
      moduleId="modern-js"
      lesson={lesson}
      initialStep={initialStep}
    />
  );
}
