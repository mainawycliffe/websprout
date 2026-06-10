"use client";

import type { Lesson } from "@/types/lesson";
import JavaScriptLesson from "@/components/javascript/JavaScriptLesson";

export default function ReactFundamentalsLessonClient({
  lesson,
  initialStep,
}: {
  lesson: Lesson;
  lessonSlug: string;
  initialStep?: number;
}) {
  return (
    <JavaScriptLesson
      moduleId="react-fundamentals"
      lesson={lesson}
      initialStep={initialStep}
    />
  );
}
