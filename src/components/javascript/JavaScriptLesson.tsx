"use client";

import { useCallback, useDeferredValue, useMemo, useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import type {
  Lesson,
  GapFillConfig,
  FreeEditConfig,
  ExplanationConfig,
  JsConsoleConfig,
} from "@/types/lesson";
import type { ConsoleEntry } from "@/lib/js-sandbox";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { validateStep, getHintForStep, buildCodeFromGaps } from "@/lib/lesson-engine";
import { getHtmlDiagnostics } from "@/lib/html-diagnostics";
import { getCssDiagnostics } from "@/lib/css-diagnostics";
import { getModule, getNextLesson } from "@/content/modules";
import Link from "next/link";
import LessonStepper from "@/components/layout/LessonStepper";
import LessonCompleteScreen from "@/components/layout/LessonCompleteScreen";
import InstructionPanel from "@/components/layout/InstructionPanel";
import CodeEditor from "@/components/editor/CodeEditor";
import GapFillEditor from "@/components/editor/GapFillEditor";
import JsConsole from "@/components/editor/JsConsole";

interface JavaScriptLessonProps {
  moduleId: string;
  lesson: Lesson;
  initialStep?: number;
  visualizer?: (stepId: string, stepIndex: number) => React.ReactNode | null;
}

export default function JavaScriptLesson({ moduleId, lesson, initialStep, visualizer }: JavaScriptLessonProps) {
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
  const [consoleOutput, setConsoleOutput] = useState<ConsoleEntry[]>([]);
  const [showComplete, setShowComplete] = useState(false);
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
    if (step?.config.type === "js-console" && !code) {
      return (step.config as JsConsoleConfig).starterCode;
    }
    return code;
  }, [step, gapValues, code]);

  const deferredDisplayCode = useDeferredValue(displayCode);

  const demoCode = useMemo(() => {
    if (step?.config.type === "explanation") {
      return (step.config as ExplanationConfig).demoCode ?? "";
    }
    return "";
  }, [step]);

  // HTML/CSS diagnostics for non-JS free-edit steps
  const editorDiagnostics = useMemo(() => {
    if (!step || step.config.type !== "free-edit") return undefined;
    const lang = (step.config as FreeEditConfig).language;
    const codeToCheck = deferredDisplayCode;
    if (!codeToCheck) return undefined;
    if (lang === "html" || lang === "both") {
      const diags = getHtmlDiagnostics(codeToCheck);
      return diags.length > 0 ? diags : undefined;
    }
    if (lang === "css") {
      const diags = getCssDiagnostics(codeToCheck);
      return diags.length > 0 ? diags : undefined;
    }
    return undefined;
  }, [step, deferredDisplayCode]);

  const isJsStep = useMemo(() => {
    if (!step) return false;
    if (step.config.type === "js-console") return true;
    if (step.config.type === "free-edit") {
      const lang = (step.config as FreeEditConfig).language;
      return lang === "javascript" || lang === "html-js";
    }
    if (step.config.type === "explanation") {
      return (step.config as ExplanationConfig).demoLanguage === "javascript";
    }
    return false;
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

  const handleConsoleOutput = useCallback((output: ConsoleEntry[]) => {
    setConsoleOutput(output);
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
      consoleOutput: consoleOutput.map((e) => e.args.join(" ")),
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
          setConsoleOutput([]);
        }
      }, 1000);
    } else {
      setAttemptCount((prev) => prev + 1);
    }
  }, [step, currentStep, isLastStep, completedSteps, displayCode, gapValues, consoleOutput, completeStep, goToNextStep]);

  const handlePrev = useCallback(() => {
    goToPrevStep();
    setFeedback(null);
    setAttemptCount(0);
    setGapValues({});
    setCode("");
    setConsoleOutput([]);
  }, [goToPrevStep]);

  const handleStepClick = useCallback(
    (stepIdx: number) => {
      goToStep(stepIdx);
      setFeedback(null);
      setAttemptCount(0);
      setGapValues({});
      setCode("");
      setConsoleOutput([]);
    },
    [goToStep]
  );

  const hint = useMemo(() => {
    if (!step || attemptCount < 2) return null;
    return getHintForStep(step, attemptCount - 2);
  }, [step, attemptCount]);

  const moduleTitle = useMemo(() => getModule(moduleId)?.title ?? moduleId, [moduleId]);

  const canProgress =
    step?.type === "explanation" ||
    completedSteps.has(currentStep) ||
    feedback?.valid === true;

  if (!step && !showComplete) return null;

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

            {visualizer && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`viz-${step!.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {visualizer(step!.id, currentStep)}
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
                {step!.type === "explanation" && demoCode && (
                  <div className="flex flex-col gap-4">
                    <CodeEditor
                      value={demoCode}
                      language={(step!.config as ExplanationConfig).demoLanguage ?? "html"}
                      readOnly
                    />
                    {isJsStep ? (
                      <JsConsole code={demoCode} autoRun />
                    ) : null}
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
                    {isJsStep && (
                      <JsConsole code={displayCode} onOutput={handleConsoleOutput} />
                    )}
                  </div>
                )}

                {step!.type === "free-edit" && step!.config.type === "free-edit" && (
                  <div className="flex flex-col gap-4">
                    <CodeEditor
                      value={code || (step!.config as FreeEditConfig).starterCode}
                      language={(step!.config as FreeEditConfig).language}
                      onChange={handleCodeChange}
                      diagnostics={editorDiagnostics}
                    />
                    {isJsStep && (
                      <JsConsole
                        code={deferredDisplayCode}
                        onOutput={handleConsoleOutput}
                      />
                    )}
                  </div>
                )}

                {step!.type === "js-console" && step!.config.type === "js-console" && (
                  <div className="flex flex-col gap-4">
                    <CodeEditor
                      value={code || (step!.config as JsConsoleConfig).starterCode}
                      language="javascript"
                      onChange={handleCodeChange}
                    />
                    <JsConsole
                      code={deferredDisplayCode}
                      onOutput={handleConsoleOutput}
                    />
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
