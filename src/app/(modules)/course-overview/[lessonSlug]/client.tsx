"use client";

import dynamic from "next/dynamic";
import type { Lesson } from "@/types/lesson";
import ContentLesson from "@/components/shared/ContentLesson";

const WebConceptsVisualizer = dynamic(
  () => import("@/components/visualizers/web-concepts/WebConceptsVisualizer"),
  { ssr: false }
);

export default function CourseOverviewLessonClient({
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
      moduleId="course-overview"
      lesson={lesson}
      initialStep={initialStep}
      visualizer={(stepId, stepIndex) => (
        <WebConceptsVisualizer
          lessonSlug={lessonSlug}
          stepId={stepId}
          stepIndex={stepIndex}
        />
      )}
    />
  );
}
