'use client';

import ContentLesson from '@/components/shared/ContentLesson';
import type { Lesson } from '@/types/lesson';
import dynamic from 'next/dynamic';

const AnimationVisualizer = dynamic(() => import('@/components/visualizers/animation/AnimationVisualizer'), {
  ssr: false,
});

export default function CssAnimationsLessonClient({
  lesson,
  lessonSlug,
  initialStep,
}: {
  lesson: Lesson;
  lessonSlug: string;
  initialStep?: number;
}) {
  return (
    <ContentLesson
      moduleId='css-animations'
      lesson={lesson}
      initialStep={initialStep}
      visualizer={(stepId, stepIndex) => (
        <AnimationVisualizer lessonSlug={lessonSlug} stepId={stepId} stepIndex={stepIndex} />
      )}
    />
  );
}
