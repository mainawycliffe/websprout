'use client';

import ContentLesson from '@/components/shared/ContentLesson';
import type { Lesson } from '@/types/lesson';

export default function CssPositioningLessonClient({
  lesson,
  initialStep,
}: {
  lesson: Lesson;
  lessonSlug: string;
  initialStep?: number;
}) {
  return (
    <ContentLesson
      moduleId='css-positioning'
      lesson={lesson}
      initialStep={initialStep}
    />
  );
}
