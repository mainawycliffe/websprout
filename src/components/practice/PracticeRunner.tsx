"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import InstructionPanel from "@/components/layout/InstructionPanel";
import CodeChallenge from "@/components/editor/CodeChallenge";
import CodeEditor from "@/components/editor/CodeEditor";
import GapFillEditor from "@/components/editor/GapFillEditor";
import QuizQuestion from "@/components/editor/QuizQuestion";
import Button from "@/components/ui/Button";
import DifficultyBadge from "@/components/ui/DifficultyBadge";
import XpToast, { type XpNotice } from "@/components/ui/XpToast";
import { useIndexedDB } from "@/hooks/useIndexedDB";
import { useGamification } from "@/hooks/useGamification";
import {
  applyQuizSelection,
  EMPTY_QUIZ_STATE,
  getHintForStep,
  isQuizCorrect,
  validateStep,
  type QuizState,
} from "@/lib/lesson-engine";
import type { TestRunResult } from "@/lib/js-sandbox";
import { practiceQuestions } from "@/content/practice";
import { getPracticeKind, getPracticeLevel, type PracticeQuestion } from "@/types/practice";
import type { CodeChallengeConfig, GapFillConfig, QuizConfig } from "@/types/lesson";

interface PracticeRunnerProps {
  question: PracticeQuestion;
}

/** Failed attempts before the reference solution is offered. */
const REVEAL_AFTER_ATTEMPTS = 3;

export default function PracticeRunner({ question }: PracticeRunnerProps) {
  const router = useRouter();
  const { isReady, savePracticeResult, getPracticeResult, getAllPracticeResults } = useIndexedDB();
  const { award } = useGamification();

  const step = question.step;
  const level = getPracticeLevel(question);
  const kind = getPracticeKind(question);

  const [code, setCode] = useState("");
  const [gapValues, setGapValues] = useState<Record<string, string>>({});
  const [quizState, setQuizState] = useState<QuizState>(EMPTY_QUIZ_STATE);
  const [testRun, setTestRun] = useState<TestRunResult | null>(null);
  const [feedback, setFeedback] = useState<{ valid: boolean; message: string } | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [solved, setSolved] = useState(false);
  const [alreadySolved, setAlreadySolved] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [notice, setNotice] = useState<XpNotice | null>(null);
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set());

  // Per-question state is reset by remounting — the route passes key={question.id}.
  useEffect(() => {
    if (!isReady) return;
    let cancelled = false;
    getPracticeResult(question.id).then((record) => {
      if (cancelled) return;
      setAlreadySolved(record?.status === "solved");
      if (record?.lastCode) setCode(record.lastCode);
    });
    getAllPracticeResults().then((records) => {
      if (cancelled) return;
      setSolvedIds(new Set(records.filter((r) => r.status === "solved").map((r) => r.questionId)));
    });
    return () => {
      cancelled = true;
    };
  }, [isReady, question.id, getPracticeResult, getAllPracticeResults]);

  const displayCode = useMemo(() => {
    if (step.config.type === "code-challenge" && !code) {
      return (step.config as CodeChallengeConfig).starterCode;
    }
    return code;
  }, [step, code]);

  const effectiveAttempts = attemptCount + quizState.wrongAttempts;
  const usedHint = effectiveAttempts >= 2 || showSolution;

  const hint = useMemo(() => {
    if (effectiveAttempts < 2) return null;
    return getHintForStep(step, effectiveAttempts - 2);
  }, [step, effectiveAttempts]);

  const solution =
    step.config.type === "code-challenge" ? (step.config as CodeChallengeConfig).solution : undefined;
  const canRevealSolution =
    Boolean(solution) && !solved && effectiveAttempts >= REVEAL_AFTER_ATTEMPTS;

  // Position in the bank, for prev/next and "n of N".
  const index = useMemo(() => practiceQuestions.findIndex((q) => q.id === question.id), [question.id]);
  const previous = index > 0 ? practiceQuestions[index - 1] : undefined;
  const next = index >= 0 && index < practiceQuestions.length - 1 ? practiceQuestions[index + 1] : undefined;

  const nextUnsolved = useMemo(
    () => practiceQuestions.find((q) => q.id !== question.id && !solvedIds.has(q.id)),
    [question.id, solvedIds]
  );

  const handleQuizSelect = useCallback(
    (optionId: string) => {
      setQuizState((prev) => applyQuizSelection(step.config as QuizConfig, prev, { kind: "select", optionId }));
      setFeedback(null);
    },
    [step]
  );

  const handleQuizCheck = useCallback(() => {
    setQuizState((prev) => applyQuizSelection(step.config as QuizConfig, prev, { kind: "check" }));
    setFeedback(null);
  }, [step]);

  const handleGapChange = useCallback((gapId: string, value: string) => {
    setGapValues((prev) => ({ ...prev, [gapId]: value }));
    setFeedback(null);
  }, []);

  const handleCodeChange = useCallback((value: string) => {
    setCode(value);
    setFeedback(null);
  }, []);

  const handleCheck = useCallback(async () => {
    const result = validateStep(step, {
      code: displayCode,
      gapValues,
      quizSelection: quizState.selected,
      testRun,
    });
    setFeedback(result);

    if (!result.valid) {
      setAttemptCount((prev) => prev + 1);
      await savePracticeResult({
        questionId: question.id,
        status: "attempted",
        attempts: effectiveAttempts + 1,
        lastCode: displayCode,
        usedHint,
        solvedAt: null,
      });
      return;
    }

    setSolved(true);

    // XP is awarded on FIRST solve only. `alreadySolved` starts false and is
    // only filled in by an async read, so a fast answer on a returning visit
    // could beat it — re-read the record here rather than trusting that state.
    let previouslySolved = alreadySolved;
    if (!previouslySolved) {
      try {
        const record = await getPracticeResult(question.id);
        previouslySolved = record?.status === "solved";
      } catch {
        // If storage is unreadable, fall back to the in-memory guess.
      }
    }

    await savePracticeResult({
      questionId: question.id,
      status: "solved",
      attempts: effectiveAttempts + 1,
      lastCode: displayCode,
      usedHint,
      solvedAt: Date.now(),
    });
    setSolvedIds((prev) => new Set(prev).add(question.id));

    if (previouslySolved) return;
    setAlreadySolved(true);

    const outcome = await award({
      kind: "practice-solved",
      level,
      questionKind: kind,
      firstTry: effectiveAttempts === 0,
      usedHint,
    });

    if (outcome) {
      setNotice({
        id: `${question.id}-${outcome.player.xp}`,
        xpGained: outcome.xpGained,
        newBadges: outcome.newBadges,
        rankUp: outcome.rankUp,
      });
    }
  }, [
    step, displayCode, gapValues, quizState.selected, testRun, question.id,
    effectiveAttempts, usedHint, alreadySolved, award, level, kind,
    savePracticeResult, getPracticeResult,
  ]);

  const checkLabel = step.type === "code-challenge" ? "Submit solution" : "Check answer";

  const looksCorrect =
    (step.config.type === "quiz" &&
      quizState.revealed &&
      isQuizCorrect(step.config as QuizConfig, quizState.selected)) ||
    (testRun !== null &&
      !testRun.compileError &&
      testRun.results.length > 0 &&
      testRun.results.every((r) => r.passed));

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-6 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-text-muted">
            <li>
              <Link href="/practice" className="hover:text-text transition-colors">
                Practice
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="truncate">{question.category}</li>
          </ol>
        </nav>

        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold text-text">{question.title}</h1>
          <DifficultyBadge level={level} />
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
            {kind}
          </span>
          {alreadySolved && !solved && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-success-light/30 text-success font-semibold">
              Solved before
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 text-xs text-text-muted">
          <span>{question.topics.join(" · ")}</span>
          {effectiveAttempts > 0 && !solved && (
            <span>
              {effectiveAttempts} {effectiveAttempts === 1 ? "attempt" : "attempts"}
            </span>
          )}
        </div>
      </div>

      <InstructionPanel instruction={step.instruction} hint={hint} feedback={feedback} />

      {step.type === "quiz" && step.config.type === "quiz" && (
        <QuizQuestion
          config={step.config as QuizConfig}
          state={quizState}
          onSelect={handleQuizSelect}
          onCheck={handleQuizCheck}
          seed={step.id}
        />
      )}

      {step.type === "code-challenge" && step.config.type === "code-challenge" && (
        <CodeChallenge
          config={step.config as CodeChallengeConfig}
          code={displayCode}
          onCodeChange={handleCodeChange}
          run={testRun}
          onRun={setTestRun}
        />
      )}

      {step.type === "gap-fill" && step.config.type === "gap-fill" && (
        <GapFillEditor
          template={(step.config as GapFillConfig).template}
          gaps={(step.config as GapFillConfig).gaps}
          gapValues={gapValues}
          onGapChange={handleGapChange}
        />
      )}

      {/* Offered only after real effort — reading it early would skip the learning. */}
      <AnimatePresence initial={false}>
        {canRevealSolution && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            {showSolution ? (
              <div className="flex flex-col gap-2">
                <p className="text-sm text-text-muted">
                  One way to solve it — compare it with your attempt rather than pasting it in.
                </p>
                <CodeEditor value={solution ?? ""} language="javascript" readOnly />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowSolution(true)}
                className="text-sm text-secondary hover:underline font-medium"
              >
                Stuck? Show a worked solution
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {solved ? (
        <div className="bg-success-light/20 border border-success-light/40 rounded-md p-5 flex flex-col gap-3 animate-success-pop">
          <div className="text-center">
            <span className="text-3xl block mb-1">&#127881;</span>
            <p className="font-bold text-success">Solved!</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {nextUnsolved ? (
              <Button size="sm" onClick={() => router.push(`/practice/${nextUnsolved.slug}`)}>
                Next unsolved
              </Button>
            ) : (
              <Button size="sm" onClick={() => router.push("/practice")}>
                Back to all questions
              </Button>
            )}
            <Button size="sm" variant="ghost" onClick={() => router.push("/practice")}>
              Back to hub
            </Button>
            {question.relatedModule && (
              <Link
                href={`/${question.relatedModule}`}
                className="text-sm text-primary hover:underline self-center"
              >
                Review the lesson →
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Button onClick={handleCheck} variant={looksCorrect ? "success" : "primary"}>
            {checkLabel}
          </Button>
          <Link href="/practice" className="text-sm text-text-muted hover:text-text transition-colors">
            Skip for now
          </Link>
        </div>
      )}

      <nav
        aria-label="Question navigation"
        className="flex items-center justify-between gap-3 border-t border-border/60 pt-4 text-sm"
      >
        {previous ? (
          <Link
            href={`/practice/${previous.slug}`}
            className="text-text-muted hover:text-text transition-colors truncate max-w-2/5"
          >
            ← {previous.title}
          </Link>
        ) : (
          <span />
        )}

        <span className="text-xs text-text-muted shrink-0">
          {index + 1} of {practiceQuestions.length}
        </span>

        {next ? (
          <Link
            href={`/practice/${next.slug}`}
            className="text-text-muted hover:text-text transition-colors truncate max-w-2/5 text-right"
          >
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <XpToast notice={notice} onDismiss={() => setNotice(null)} />
    </div>
  );
}
