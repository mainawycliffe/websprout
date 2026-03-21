"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { Lesson, SliderConfig, ChallengeConfig } from "@/types/lesson";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { useBoxModelStore } from "@/stores/box-model-store";
import { validateStep } from "@/lib/lesson-engine";
import LessonStepper from "@/components/layout/LessonStepper";
import InstructionPanel from "@/components/layout/InstructionPanel";
import ValueControls from "@/components/box-model/ValueControls";
import BoxModel2D from "@/components/box-model/BoxModel2D";
import BoxModelCodePanel from "@/components/box-model/BoxModelCodePanel";
import BoxModelDiagram from "@/components/box-model/BoxModelDiagram";
import TargetChallenge from "@/components/box-model/TargetChallenge";

// Lazy load Three.js canvas
const BoxModelCanvas = dynamic(() => import("./BoxModelCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] rounded-[var(--radius-lg)] bg-[#0F0F23] flex items-center justify-center">
      <span className="text-white/50 text-sm">Loading 3D view...</span>
    </div>
  ),
});

interface BoxModelLessonProps {
  lesson: Lesson;
  initialStep?: number;
}

export default function BoxModelLesson({ lesson, initialStep }: BoxModelLessonProps) {
  const {
    currentStep,
    completedSteps,
    completeStep,
    goToStep,
    goToNextStep,
    goToPrevStep,
  } = useLessonProgress("box-model", lesson, initialStep);

  const store = useBoxModelStore();
  const [feedback, setFeedback] = useState<{ valid: boolean; message: string } | null>(null);

  const step = lesson.steps[currentStep];

  // Initialize values when step changes
  useEffect(() => {
    if (!step) return;
    if (step.config.type === "slider-explore") {
      const config = step.config as SliderConfig;
      store.setAllValues({
        contentWidth: config.initialValues.contentWidth,
        contentHeight: config.initialValues.contentHeight,
        padding: config.initialValues.padding,
        border: config.initialValues.border,
        margin: config.initialValues.margin,
        boxSizing: config.initialValues.boxSizing,
      });
    } else if (step.config.type === "challenge") {
      const config = step.config as ChallengeConfig;
      store.setAllValues({
        contentWidth: config.initialValues.contentWidth,
        contentHeight: config.initialValues.contentHeight,
        padding: config.initialValues.padding,
        border: config.initialValues.border,
        margin: config.initialValues.margin,
        boxSizing: config.initialValues.boxSizing,
      });
    }
    setFeedback(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const highlightLayer = useMemo(() => {
    if (step?.config.type === "slider-explore") {
      return (step.config as SliderConfig).highlightProperty;
    }
    return undefined;
  }, [step]);

  const lockedProperties = useMemo(() => {
    if (step?.config.type === "slider-explore") {
      return (step.config as SliderConfig).lockedProperties;
    }
    if (step?.config.type === "challenge") {
      return (step.config as ChallengeConfig).lockedProperties;
    }
    return [];
  }, [step]);

  const handleNext = useCallback(() => {
    if (!step) return;

    if (step.type === "explanation" || step.type === "slider-explore") {
      completeStep(currentStep);
      goToNextStep();
      setFeedback(null);
      return;
    }

    if (step.type === "challenge") {
      const result = validateStep(step, {
        values: {
          contentWidth: store.contentWidth,
          contentHeight: store.contentHeight,
          padding: store.padding,
          border: store.border,
          margin: store.margin,
          boxSizing: store.boxSizing,
        },
      });
      setFeedback(result);

      if (result.valid) {
        completeStep(currentStep);
        setTimeout(() => {
          goToNextStep();
          setFeedback(null);
        }, 1500);
      }
    }
  }, [step, currentStep, store, completeStep, goToNextStep]);

  const handlePrev = useCallback(() => {
    goToPrevStep();
    setFeedback(null);
  }, [goToPrevStep]);

  const handleStepClick = useCallback(
    (stepIdx: number) => {
      goToStep(stepIdx);
      setFeedback(null);
    },
    [goToStep]
  );

  const canProgress =
    step?.type === "explanation" ||
    step?.type === "slider-explore" ||
    completedSteps.has(currentStep) ||
    feedback?.valid === true;

  if (!step) return null;

  return (
    <div className="max-w-6xl mx-auto w-full px-4 py-6">
      <div className="flex flex-col gap-6">
        {/* Lesson title */}
        <div>
          <h1 className="text-2xl font-bold text-text">{lesson.title}</h1>
          <p className="text-sm text-text-muted">{lesson.description}</p>
        </div>

        {/* Step stepper */}
        <LessonStepper
          totalSteps={lesson.steps.length}
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepClick={handleStepClick}
          onNext={handleNext}
          onPrev={handlePrev}
          canProgress={canProgress}
        />

        {/* Instruction */}
        <InstructionPanel
          instruction={step.instruction}
          feedback={feedback}
        />

        {/* Interactive area */}
        {step.type === "explanation" ? (
          <BoxModelDiagram />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
            <div className="flex flex-col gap-4">
              {store.viewMode === "3d" ? (
                <BoxModelCanvas highlightLayer={highlightLayer} />
              ) : (
                <BoxModel2D />
              )}

              <BoxModelCodePanel lockedProperties={lockedProperties} />

              {step.type === "challenge" && step.config.type === "challenge" && (
                <TargetChallenge
                  targetValues={(step.config as ChallengeConfig).targetValues}
                  tolerance={(step.config as ChallengeConfig).tolerance}
                />
              )}
            </div>

            <div>
              <ValueControls
                lockedProperties={lockedProperties}
                highlightProperty={highlightLayer}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
