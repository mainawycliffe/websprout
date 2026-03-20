"use client";

import dynamic from "next/dynamic";
import type { Lesson } from "@/types/lesson";
import ContentLesson from "@/components/shared/ContentLesson";

const AccessibilityVisualizer = dynamic(
  () => import("@/components/visualizers/accessibility/AccessibilityVisualizer"),
  { ssr: false }
);

export default function WebAccessibilityLessonClient({ lesson, lessonSlug }: { lesson: Lesson; lessonSlug: string }) {
  return (
    <ContentLesson
      moduleId="web-accessibility"
      lesson={lesson}
      visualizer={(stepId, stepIndex) => (
        <AccessibilityVisualizer lessonSlug={lessonSlug} stepId={stepId} stepIndex={stepIndex} />
      )}
    />
  );
}
