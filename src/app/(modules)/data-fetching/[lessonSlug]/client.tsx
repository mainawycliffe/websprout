"use client";

import type { Lesson } from "@/types/lesson";
import JavaScriptLesson from "@/components/javascript/JavaScriptLesson";
import DataFetchingVisualizer from "@/components/visualizers/data-fetching/DataFetchingVisualizer";

export default function DataFetchingLessonClient({
  lesson,
  lessonSlug,
  initialStep,
}: {
  lesson: Lesson;
  lessonSlug: string;
  initialStep?: number;
}) {
  return (
    <JavaScriptLesson
      moduleId="data-fetching"
      lesson={lesson}
      initialStep={initialStep}
      visualizer={(stepId, stepIndex) => (
        <DataFetchingVisualizer lessonSlug={lessonSlug} stepId={stepId} stepIndex={stepIndex} />
      )}
    />
  );
}
