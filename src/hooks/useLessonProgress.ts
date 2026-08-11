"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useIndexedDB } from "./useIndexedDB";
import { useGamification } from "./useGamification";
import { getModule } from "@/content/modules";
import type { Lesson } from "@/types/lesson";

// Capture the native replaceState before Next.js patches it.
// This lets us update the URL bar without triggering a soft navigation.
const nativeReplaceState =
  typeof window !== "undefined"
    ? History.prototype.replaceState.bind(window.history)
    : undefined;

export function useLessonProgress(moduleId: string, lesson: Lesson, initialStep: number = 0) {
  const { isReady, saveProgress, getProgress, getModuleProgress } = useIndexedDB();
  const { award } = useGamification();
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
      // Everything here runs OUTSIDE a state updater on purpose. StrictMode
      // double-invokes updaters with the same `prev`, so a side effect placed
      // inside one fires twice — which previously paid XP twice per step.
      if (completedStepsRef.current.has(stepIndex)) return;

      const next = new Set(completedStepsRef.current);
      next.add(stepIndex);
      // Updated eagerly so a second call in the same tick is a no-op, before
      // any re-render has had a chance to refresh the ref.
      completedStepsRef.current = next;
      setCompletedSteps(next);

      saveProgress({
        lessonId: lesson.id,
        moduleId,
        completedSteps: Array.from(next),
        savedCode: savedCodeRef.current,
        lastAccessedAt: Date.now(),
      });

      award({ kind: "lesson-step" });

      if (next.size === lesson.steps.length) {
        // Finishing the last lesson of a module also unlocks Module Master, so
        // the module's other lessons have to be checked before awarding.
        void (async () => {
          let moduleCompleted = false;
          try {
            const mod = getModule(moduleId);
            if (mod) {
              const records = await getModuleProgress(moduleId);
              const finished = new Set(
                records
                  .filter((record) => {
                    const target = mod.lessons.find((l) => l.id === record.lessonId);
                    return target && record.completedSteps.length >= target.steps.length;
                  })
                  .map((record) => record.lessonId)
              );
              finished.add(lesson.id);
              moduleCompleted = finished.size >= mod.lessons.length;
            }
          } catch {
            // A failed read must not cost the student their lesson XP.
          }
          await award({ kind: "lesson-complete", moduleCompleted });
        })();
      }
    },
    [lesson.id, lesson.steps.length, moduleId, saveProgress, award, getModuleProgress]
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
