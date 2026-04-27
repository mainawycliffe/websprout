'use client';

import ContentLesson from '@/components/shared/ContentLesson';
import type { Lesson } from '@/types/lesson';

export default function CssBackgroundsLessonClient({
  lesson,
  initialStep,
}: {
  lesson: Lesson;
  lessonSlug: string;
  initialStep?: number;
}) {
  return (
    <ContentLesson
      moduleId='css-backgrounds'
      lesson={lesson}
      initialStep={initialStep}
    />
  );
}
