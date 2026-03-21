"use client";

import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Lesson, GapFillConfig, FreeEditConfig, ExplanationConfig } from "@/types/lesson";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { useCodeValidation } from "@/hooks/useCodeValidation";
import { validateStep, getHintForStep, buildCodeFromGaps } from "@/lib/lesson-engine";
import { getHtmlDiagnostics } from "@/lib/html-diagnostics";
import LessonStepper from "@/components/layout/LessonStepper";
import InstructionPanel from "@/components/layout/InstructionPanel";
import CodeEditor from "@/components/editor/CodeEditor";
import GapFillEditor from "@/components/editor/GapFillEditor";
import HtmlPreview from "@/components/editor/HtmlPreview";
import TagVisualizer from "@/components/tag-builder/TagVisualizer";

interface TagBuilderLessonProps {
  lesson: Lesson;
  initialStep?: number;
}

export default function TagBuilderLesson({ lesson, initialStep }: TagBuilderLessonProps) {
  const {
    currentStep,
    completedSteps,
    completeStep,
    goToStep,
    goToNextStep,
    goToPrevStep,
    saveCode,
  } = useLessonProgress("tag-builder", lesson, initialStep);

  const [code, setCode] = useState("");
  const [gapValues, setGapValues] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<{ valid: boolean; message: string } | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep a ref to saveCode so handleCodeChange never needs to change
  const saveCodeRef = useRef(saveCode);
  useEffect(() => { saveCodeRef.current = saveCode; }, [saveCode]);

  const step = lesson.steps[currentStep];

  // Build the displayed code from gap values or free-edit code
  const displayCode = useMemo(() => {
    if (step?.config.type === "gap-fill") {
      return buildCodeFromGaps((step.config as GapFillConfig).template, gapValues);
    }
    return code;
  }, [step, gapValues, code]);

  // Defer the code passed to validation so it doesn't block typing
  const deferredDisplayCode = useDeferredValue(displayCode);
  const { parsedTree } = useCodeValidation(deferredDisplayCode);

  // HTML diagnostics for inline linting
  const htmlDiagnostics = useMemo(() => {
    if (!deferredDisplayCode) return undefined;
    const diags = getHtmlDiagnostics(deferredDisplayCode);
    return diags.length > 0 ? diags : undefined;
  }, [deferredDisplayCode]);

  // Demo code for explanation steps
  const demoCode = useMemo(() => {
    if (step?.config.type === "explanation") {
      return (step.config as ExplanationConfig).demoCode ?? "";
    }
    return "";
  }, [step]);

  // Only parse demo code — no need to defer since it doesn't change during typing
  const { parsedTree: demoTree } = useCodeValidation(demoCode, 100);

  const handleGapChange = useCallback((gapId: string, value: string) => {
    setGapValues((prev) => ({ ...prev, [gapId]: value }));
    setFeedback(null);
  }, []);

  const handleCodeChange = useCallback(
    (value: string) => {
      setCode(value);
      setFeedback(null);

      // Debounce IndexedDB save — don't write on every keystroke
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        saveCodeRef.current(value);
      }, 1000);
    },
    []
  );

  const handleNext = useCallback(() => {
    if (!step) return;

    // Explanation steps can always proceed
    if (step.type === "explanation") {
      completeStep(currentStep);
      goToNextStep();
      setFeedback(null);
      setAttemptCount(0);
      return;
    }

    // Validate the step
    const input: Record<string, unknown> = {
      code: displayCode,
      gapValues,
    };

    const result = validateStep(step, input);
    setFeedback(result);

    if (result.valid) {
      completeStep(currentStep);
      setTimeout(() => {
        goToNextStep();
        setFeedback(null);
        setAttemptCount(0);
        setGapValues({});
        setCode("");
      }, 1000);
    } else {
      setAttemptCount((prev) => prev + 1);
    }
  }, [step, currentStep, displayCode, gapValues, completeStep, goToNextStep]);

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
          hint={hint}
          feedback={feedback}
        />

        {/* Interactive area */}
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
                {(step.config as ExplanationConfig).demoLanguage === "css" ? (
                  <div className="rounded-[var(--radius-md)] overflow-hidden shadow-card">
                    <div className="flex items-center px-4 py-2 bg-bg-warm text-xs text-text-muted border-b border-border">
                      CSS PREVIEW
                    </div>
                    <div className="bg-white p-4 min-h-[120px]">
                      <pre className="text-sm font-mono text-text whitespace-pre-wrap">{demoCode}</pre>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <TagVisualizer tree={demoTree} />
                    <HtmlPreview html={demoCode} />
                  </div>
                )}
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <TagVisualizer tree={parsedTree} />
                  <HtmlPreview html={displayCode} />
                </div>
              </div>
            )}

            {step.type === "free-edit" && step.config.type === "free-edit" && (
              <div className="flex flex-col gap-4">
                <CodeEditor
                  value={code || (step.config as FreeEditConfig).starterCode}
                  language={(step.config as FreeEditConfig).language}
                  onChange={handleCodeChange}
                  diagnostics={htmlDiagnostics}
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <TagVisualizer tree={parsedTree} />
                  <HtmlPreview html={displayCode} />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
