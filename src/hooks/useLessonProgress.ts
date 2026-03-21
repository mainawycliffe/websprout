"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useIndexedDB } from "./useIndexedDB";
import type { Lesson } from "@/types/lesson";

// Capture the native replaceState before Next.js patches it.
// This lets us update the URL bar without triggering a soft navigation.
const nativeReplaceState =
  typeof window !== "undefined"
    ? History.prototype.replaceState.bind(window.history)
    : undefined;

export function useLessonProgress(moduleId: string, lesson: Lesson, initialStep: number = 0) {
  const { isReady, saveProgress, getProgress } = useIndexedDB();
  const clampedInitial = Math.max(0, Math.min(initialStep, lesson.steps.length - 1));
  const [currentStep, setCurrentStep] = useState(clampedInitial);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [savedCode, setSavedCode] = useState("");

  // Refs for stable callbacks — avoids re-creating callbacks when these change
  const savedCodeRef = useRef(savedCode);
  savedCodeRef.current = savedCode;
  const completedStepsRef = useRef(completedSteps);
  completedStepsRef.current = completedSteps;
  const isReadyRef = useRef(isReady);
  isReadyRef.current = isReady;
  const currentStepRef = useRef(currentStep);
  currentStepRef.current = currentStep;

  // Load saved progress
  useEffect(() => {
    if (!isReady) return;
    getProgress(lesson.id).then((data) => {
      if (data) {
        setCompletedSteps(new Set(data.completedSteps));
        setSavedCode(data.savedCode);
      }
    });
  }, [isReady, lesson.id, getProgress]);

  const completeStep = useCallback(
    (stepIndex: number) => {
      setCompletedSteps((prev) => {
        const next = new Set(prev);
        next.add(stepIndex);

        // Save to IndexedDB
        saveProgress({
          lessonId: lesson.id,
          moduleId,
          completedSteps: Array.from(next),
          savedCode: savedCodeRef.current,
          lastAccessedAt: Date.now(),
        });

        return next;
      });
    },
    [lesson.id, moduleId, saveProgress]
  );

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < lesson.steps.length) {
        setCurrentStep(step);
        // Sync step to URL path using native replaceState to avoid
        // triggering Next.js soft navigation (which would re-render the page)
        if (nativeReplaceState) {
          const pathParts = window.location.pathname.split("/");
          // Base path is /<module>/<lesson> (segments: "", module, lesson)
          const basePath = pathParts.slice(0, 3).join("/");
          const newPath = step === 0 ? basePath : `${basePath}/${step}`;
          nativeReplaceState(null, "", newPath);
        }
      }
    },
    [lesson.steps.length]
  );

  const goToNextStep = useCallback(() => {
    goToStep(currentStepRef.current + 1);
  }, [goToStep]);

  const goToPrevStep = useCallback(() => {
    goToStep(currentStepRef.current - 1);
  }, [goToStep]);

  const saveCode = useCallback(
    (code: string) => {
      setSavedCode(code);
      if (isReadyRef.current) {
        saveProgress({
          lessonId: lesson.id,
          moduleId,
          completedSteps: Array.from(completedStepsRef.current),
          savedCode: code,
          lastAccessedAt: Date.now(),
        });
      }
    },
    [lesson.id, moduleId, saveProgress]
  );

  const isLessonComplete = completedSteps.size === lesson.steps.length;
  const progress = lesson.steps.length > 0 ? completedSteps.size / lesson.steps.length : 0;

  return {
    currentStep,
    completedSteps,
    savedCode,
    isLessonComplete,
    progress,
    completeStep,
    goToStep,
    goToNextStep,
    goToPrevStep,
    saveCode,
  };
}
