"use client";

import dynamic from "next/dynamic";
import type { Lesson } from "@/types/lesson";
import ContentLesson from "@/components/shared/ContentLesson";

const ResponsiveVisualizer = dynamic(
  () => import("@/components/visualizers/responsive/ResponsiveVisualizer"),
  { ssr: false }
);

export default function ResponsiveDesignLessonClient({
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
      moduleId="responsive-design"
      lesson={lesson}
      initialStep={initialStep}
      visualizer={(stepId, stepIndex) => (
        <ResponsiveVisualizer
          lessonSlug={lessonSlug}
          stepId={stepId}
          stepIndex={stepIndex}
        />
      )}
    />
  );
}
