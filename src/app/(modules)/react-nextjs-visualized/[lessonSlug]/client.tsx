"use client";

import type { Lesson } from "@/types/lesson";
import JavaScriptLesson from "@/components/javascript/JavaScriptLesson";
import ReactConceptsVisualizer from "@/components/visualizers/react-concepts/ReactConceptsVisualizer";

export default function ReactNextjsVisualizedLessonClient({
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
      moduleId="react-nextjs-visualized"
      lesson={lesson}
      initialStep={initialStep}
      visualizer={(stepId, stepIndex) => (
        <ReactConceptsVisualizer lessonSlug={lessonSlug} stepId={stepId} stepIndex={stepIndex} />
      )}
    />
  );
}
