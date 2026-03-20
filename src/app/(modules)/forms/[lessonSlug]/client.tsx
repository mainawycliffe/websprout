"use client";

import type { Lesson } from "@/types/lesson";
import ContentLesson from "@/components/shared/ContentLesson";

export default function FormsLessonClient({ lesson, lessonSlug }: { lesson: Lesson; lessonSlug: string }) {
  return (
    <ContentLesson
      moduleId="forms"
      lesson={lesson}
    />
  );
}
