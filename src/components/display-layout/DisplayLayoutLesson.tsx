"use client";

import { useCallback, useDeferredValue, useMemo, useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Lesson, GapFillConfig, FreeEditConfig, ExplanationConfig } from "@/types/lesson";
import type { VisualizerItem } from "@/types/display-layout";
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
import DisplayVisualizer from "@/components/display-layout/DisplayVisualizer";

const DEMO_ITEMS: VisualizerItem[] = [
  { id: "a", label: "A", color: "#3B82F6", width: "80px", height: "48px" },
  { id: "b", label: "B", color: "#8B5CF6", width: "80px", height: "48px" },
  { id: "c", label: "C", color: "#10B981", width: "80px", height: "48px" },
];

/** Extract display-related CSS properties from code via simple regex */
function extractDisplayProps(code: string) {
  const get = (prop: string) => {
    const match = code.match(new RegExp(`${prop}\\s*:\\s*([^;}"']+)`));
    return match?.[1]?.trim();
  };
  return {
    containerDisplay: get("display") ?? "block",
    flexDirection: get("flex-direction"),
    justifyContent: get("justify-content"),
    alignItems: get("align-items"),
    gridTemplateColumns: get("grid-template-columns"),
    gap: get("gap"),
  };
}

interface DisplayLayoutLessonProps {
  moduleId: string;
  lesson: Lesson;
  initialStep?: number;
}

export default function DisplayLayoutLesson({ moduleId, lesson, initialStep }: DisplayLayoutLessonProps) {
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
  const [showComplete, setShowComplete] = useState(false);
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

  // Extract display CSS props from current code for the visualizer
  const displayProps = useMemo(() => {
    const codeToAnalyze = step?.type === "explanation" ? demoCode : deferredDisplayCode;
    return extractDisplayProps(codeToAnalyze);
  }, [step, demoCode, deferredDisplayCode]);

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
  const nextLesson = useMemo(() => getNextLesson(moduleId, lesson.slug), [moduleId, lesson.slug]);

  const handleNext = useCallback(() => {
    if (!step) return;

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

  if (!step && !showComplete) return null;

  const showVisualizer =
    step?.type !== "explanation" ||
    (demoCode && (step?.config as ExplanationConfig).demoLanguage !== "css");

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
              instruction={step!.instruction}
              hint={hint}
              feedback={feedback}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={`step-${currentStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step!.type === "explanation" && demoCode && (
                  <div className="flex flex-col gap-4">
                    <CodeEditor
                      value={demoCode}
                      language={(step!.config as ExplanationConfig).demoLanguage ?? "html"}
                      readOnly
                    />
                    {(step!.config as ExplanationConfig).demoLanguage === "css" ? (
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
                        <DisplayVisualizer
                          items={DEMO_ITEMS}
                          containerDisplay={displayProps.containerDisplay}
                          flexDirection={displayProps.flexDirection}
                          justifyContent={displayProps.justifyContent}
                          alignItems={displayProps.alignItems}
                          gridTemplateColumns={displayProps.gridTemplateColumns}
                          gap={displayProps.gap}
                        />
                        <HtmlPreview html={demoCode} />
                      </div>
                    )}
                  </div>
                )}

                {step!.type === "gap-fill" && step!.config.type === "gap-fill" && (
                  <div className="flex flex-col gap-4">
                    <GapFillEditor
                      template={(step!.config as GapFillConfig).template}
                      gaps={(step!.config as GapFillConfig).gaps}
                      gapValues={gapValues}
                      onGapChange={handleGapChange}
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {showVisualizer && (
                        <DisplayVisualizer
                          items={DEMO_ITEMS}
                          containerDisplay={displayProps.containerDisplay}
                          flexDirection={displayProps.flexDirection}
                          justifyContent={displayProps.justifyContent}
                          alignItems={displayProps.alignItems}
                          gridTemplateColumns={displayProps.gridTemplateColumns}
                          gap={displayProps.gap}
                        />
                      )}
                      <HtmlPreview html={displayCode} />
                    </div>
                  </div>
                )}

                {step!.type === "free-edit" && step!.config.type === "free-edit" && (
                  <div className="flex flex-col gap-4">
                    <CodeEditor
                      value={code || (step!.config as FreeEditConfig).starterCode}
                      language={(step!.config as FreeEditConfig).language}
                      onChange={handleCodeChange}
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <DisplayVisualizer
                        items={DEMO_ITEMS}
                        containerDisplay={displayProps.containerDisplay}
                        flexDirection={displayProps.flexDirection}
                        justifyContent={displayProps.justifyContent}
                        alignItems={displayProps.alignItems}
                        gridTemplateColumns={displayProps.gridTemplateColumns}
                        gap={displayProps.gap}
                      />
                      <HtmlPreview html={displayCode} />
                    </div>
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
