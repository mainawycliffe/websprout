"use client";

import type { Lesson } from "@/types/lesson";
import JavaScriptLesson from "@/components/javascript/JavaScriptLesson";

export default function JsFunctionsLessonClient({
  lesson,
}: {
  lesson: Lesson;
  lessonSlug: string;
}) {
  return (
    <JavaScriptLesson
      moduleId="js-functions"
      lesson={lesson}
    />
  );
}
