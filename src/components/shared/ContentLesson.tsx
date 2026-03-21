"use client";

import { useCallback, useDeferredValue, useMemo, useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Lesson, GapFillConfig, FreeEditConfig, ExplanationConfig } from "@/types/lesson";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { useCodeValidation } from "@/hooks/useCodeValidation";
import { validateStep, getHintForStep, buildCodeFromGaps } from "@/lib/lesson-engine";
import { getModule, getNextLesson } from "@/content/modules";
import Link from "next/link";
import LessonStepper from "@/components/layout/LessonStepper";
import LessonCompleteScreen from "@/components/layout/LessonCompleteScreen";
import InstructionPanel from "@/components/layout/InstructionPanel";
import CodeEditor from "@/components/editor/CodeEditor";
import GapFillEditor from "@/components/editor/GapFillEditor";
import HtmlPreview from "@/components/editor/HtmlPreview";

interface ContentLessonProps {
  moduleId: string;
  lesson: Lesson;
  initialStep?: number;
  visualizer?: (stepId: string, stepIndex: number) => React.ReactNode | null;
}

export default function ContentLesson({ moduleId, lesson, initialStep, visualizer }: ContentLessonProps) {
  const {
    currentStep,
    completedSteps,
    completeStep,
    goToStep,
    goToNextStep,
    goToPrevStep,
    saveCode,
  } = useLessonProgress(moduleId, lesson, initialStep);

  const [code, setCode] = useState("");
  const [gapValues, setGapValues] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<{ valid: boolean; message: string } | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const saveCodeRef = useRef(saveCode);
  useEffect(() => { saveCodeRef.current = saveCode; }, [saveCode]);

  const step = lesson.steps[currentStep];

  const displayCode = useMemo(() => {
    if (step?.config.type === "gap-fill") {
      return buildCodeFromGaps((step.config as GapFillConfig).template, gapValues);
    }
    if (step?.config.type === "free-edit" && !code) {
      return (step.config as FreeEditConfig).starterCode;
    }
    return code;
  }, [step, gapValues, code]);

  const deferredDisplayCode = useDeferredValue(displayCode);
  const { parsedTree } = useCodeValidation(deferredDisplayCode);

  const demoCode = useMemo(() => {
    if (step?.config.type === "explanation") {
      return (step.config as ExplanationConfig).demoCode ?? "";
    }
    return "";
  }, [step]);

  const handleGapChange = useCallback((gapId: string, value: string) => {
    setGapValues((prev) => ({ ...prev, [gapId]: value }));
    setFeedback(null);
  }, []);

  const handleCodeChange = useCallback((value: string) => {
    setCode(value);
    setFeedback(null);

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveCodeRef.current(value);
    }, 1000);
  }, []);

  const isLastStep = currentStep === lesson.steps.length - 1;
  const [showComplete, setShowComplete] = useState(false);

  const nextLesson = useMemo(() => getNextLesson(moduleId, lesson.slug), [moduleId, lesson.slug]);

  const handleNext = useCallback(() => {
    if (!step) return;

    // If the last step is already completed, show completion screen
    if (isLastStep && completedSteps.has(currentStep)) {
      setShowComplete(true);
      return;
    }

    if (step.type === "explanation") {
      completeStep(currentStep);
      if (isLastStep) {
        setShowComplete(true);
      } else {
        goToNextStep();
      }
      setFeedback(null);
      setAttemptCount(0);
      return;
    }

    const input: Record<string, unknown> = {
      code: displayCode,
      gapValues,
    };

    const result = validateStep(step, input);
    setFeedback(result);

    if (result.valid) {
      completeStep(currentStep);
      setTimeout(() => {
        if (isLastStep) {
          setShowComplete(true);
        } else {
          goToNextStep();
          setFeedback(null);
          setAttemptCount(0);
          setGapValues({});
          setCode("");
        }
      }, 1000);
    } else {
      setAttemptCount((prev) => prev + 1);
    }
  }, [step, currentStep, isLastStep, completedSteps, displayCode, gapValues, completeStep, goToNextStep]);

  const handlePrev = useCallback(() => {
    goToPrevStep();
    setFeedback(null);
    setAttemptCount(0);
    setGapValues({});
    setCode("");
  }, [goToPrevStep]);

  const handleStepClick = useCallback(
    (stepIdx: number) => {
      goToStep(stepIdx);
      setFeedback(null);
      setAttemptCount(0);
      setGapValues({});
      setCode("");
    },
    [goToStep]
  );

  const hint = useMemo(() => {
    if (!step || attemptCount < 2) return null;
    return getHintForStep(step, attemptCount - 2);
  }, [step, attemptCount]);

  const canProgress =
    step?.type === "explanation" ||
    completedSteps.has(currentStep) ||
    feedback?.valid === true;

  const moduleTitle = useMemo(() => getModule(moduleId)?.title ?? moduleId, [moduleId]);

  if (!step) return null;

  return (
    <div className="max-w-6xl mx-auto w-full px-4 py-6">
      <div className="flex flex-col gap-6">
        <div>
          <nav aria-label="Breadcrumb" className="mb-2">
            <ol className="flex items-center gap-1.5 text-sm text-text-muted">
              <li>
                <Link href="/#modules" className="hover:text-text transition-colors">Modules</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={`/${moduleId}`} className="hover:text-text transition-colors">{moduleTitle}</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-text truncate max-w-50">{lesson.title}</li>
            </ol>
          </nav>
          <h1 className="text-2xl font-bold text-text">{lesson.title}</h1>
          <p className="text-sm text-text-muted">{lesson.description}</p>
        </div>

        {showComplete ? (
          <LessonCompleteScreen
            lessonTitle={lesson.title}
            moduleId={moduleId}
            nextLesson={nextLesson ? { slug: nextLesson.slug, title: nextLesson.title } : undefined}
          />
        ) : (
          <>
            <LessonStepper
              totalSteps={lesson.steps.length}
              currentStep={currentStep}
              completedSteps={completedSteps}
              onStepClick={handleStepClick}
              onNext={handleNext}
              onPrev={handlePrev}
              canProgress={canProgress}
            />

            <InstructionPanel
              instruction={step.instruction}
              hint={hint}
              feedback={feedback}
            />

            {visualizer && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`viz-${step.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {visualizer(step.id, currentStep)}
                </motion.div>
              </AnimatePresence>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={`step-${currentStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step.type === "explanation" && demoCode && (
                  <div className="flex flex-col gap-4">
                    <CodeEditor
                      value={demoCode}
                      language={(step.config as ExplanationConfig).demoLanguage ?? "html"}
                      readOnly
                    />
                    <HtmlPreview html={demoCode} />
                  </div>
                )}

                {step.type === "gap-fill" && step.config.type === "gap-fill" && (
                  <div className="flex flex-col gap-4">
                    <GapFillEditor
                      template={(step.config as GapFillConfig).template}
                      gaps={(step.config as GapFillConfig).gaps}
                      gapValues={gapValues}
                      onGapChange={handleGapChange}
                    />
                    <HtmlPreview html={displayCode} />
                  </div>
                )}

                {step.type === "free-edit" && step.config.type === "free-edit" && (
                  <div className="flex flex-col gap-4">
                    <CodeEditor
                      value={code || (step.config as FreeEditConfig).starterCode}
                      language={(step.config as FreeEditConfig).language}
                      onChange={handleCodeChange}
                    />
                    <HtmlPreview html={displayCode} />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}
