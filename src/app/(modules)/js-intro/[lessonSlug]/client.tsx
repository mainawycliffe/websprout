"use client";

import dynamic from "next/dynamic";
import type { Lesson } from "@/types/lesson";
import JavaScriptLesson from "@/components/javascript/JavaScriptLesson";

const JavaScriptVisualizer = dynamic(
  () => import("@/components/visualizers/javascript/JavaScriptVisualizer"),
  { ssr: false }
);

export default function JsIntroLessonClient({
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
      moduleId="js-intro"
      lesson={lesson}
      initialStep={initialStep}
      visualizer={(stepId, stepIndex) => (
        <JavaScriptVisualizer
          lessonSlug={lessonSlug}
          stepId={stepId}
          stepIndex={stepIndex}
        />
      )}
    />
  );
}
