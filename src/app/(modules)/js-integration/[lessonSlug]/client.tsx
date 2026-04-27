'use client';

import JavaScriptLesson from '@/components/javascript/JavaScriptLesson';
import type { Lesson } from '@/types/lesson';

export default function JsIntegrationLessonClient({
  lesson,
  initialStep,
}: {
  lesson: Lesson;
  lessonSlug: string;
  initialStep?: number;
}) {
  return (
    <JavaScriptLesson
      moduleId='js-integration'
      lesson={lesson}
      initialStep={initialStep}
    />
  );
}
