"use client";

import type { Lesson } from "@/types/lesson";
import JavaScriptLesson from "@/components/javascript/JavaScriptLesson";

export default function JsFetchLessonClient({
  lesson,
}: {
  lesson: Lesson;
  lessonSlug: string;
}) {
  return (
    <JavaScriptLesson
      moduleId="js-fetch"
      lesson={lesson}
    />
  );
}
