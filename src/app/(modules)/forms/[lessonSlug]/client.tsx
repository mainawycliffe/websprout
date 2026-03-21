"use client";

import type { Lesson } from "@/types/lesson";
import ContentLesson from "@/components/shared/ContentLesson";

export default function FormsLessonClient({ lesson, lessonSlug, initialStep }: { lesson: Lesson; lessonSlug: string; initialStep?: number }) {
  return (
    <ContentLesson
      moduleId="forms"
      lesson={lesson}
      initialStep={initialStep}
    />
  );
}
