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
}: {
  lesson: Lesson;
  lessonSlug: string;
}) {
  return (
    <ContentLesson
      moduleId="responsive-design"
      lesson={lesson}
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
