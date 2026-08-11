"use client";

import { memo, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import CodeEditor from "@/components/editor/CodeEditor";
import Button from "@/components/ui/Button";
import { renderLessonInlineHtml } from "@/lib/lesson-html";
import { isQuizCorrect, type QuizState } from "@/lib/lesson-engine";
import type { QuizConfig, QuizOption } from "@/types/lesson";

interface QuizQuestionProps {
  config: QuizConfig;
  state: QuizState;
  onSelect: (optionId: string) => void;
  /** Only used by mode === "multiple". */
  onCheck: () => void;
  /** Usually step.id — keeps the shuffle stable across remounts. */
  seed: string;
}

/** Deterministic shuffle: navigating away and back must not reorder the options. */
function seededShuffle<T>(items: T[], seed: string): T[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  let state = h >>> 0 || 1;
  const next = () => {
    // xorshift32
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    state >>>= 0;
    return state / 4294967296;
  };

  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

interface OptionButtonProps {
  option: QuizOption;
  index: number;
  isSelected: boolean;
  revealed: boolean;
  locked: boolean;
  multiple: boolean;
  onSelect: (optionId: string) => void;
}

const OptionButton = memo(function OptionButton({
  option,
  index,
  isSelected,
  revealed,
  locked,
  multiple,
  onSelect,
}: OptionButtonProps) {
  // Once the student is right, every explanation opens — this is the moment of
  // peak attention, so it is spent on why the distractors were tempting.
  const showExplanation = revealed && (locked || isSelected);

  let stateClass = "border-border bg-card hover:border-primary/40";
  if (revealed && isSelected && option.correct) {
    stateClass = "border-success-light/60 bg-success-light/20 animate-success-pop";
  } else if (revealed && isSelected && !option.correct) {
    stateClass = "border-error-light/60 bg-error-light/20";
  } else if (revealed && locked && option.correct) {
    stateClass = "border-success-light/40 bg-success-light/10";
  } else if (isSelected) {
    stateClass = "border-primary bg-primary/10";
  }

  let marker: string | null = null;
  if (revealed && (isSelected || locked)) marker = option.correct ? "✓" : "✗";

  return (
    <div className="flex flex-col">
      <button
        type="button"
        role={multiple ? "checkbox" : "radio"}
        aria-checked={isSelected}
        disabled={locked}
        onClick={() => onSelect(option.id)}
        className={`text-left rounded-md border-2 px-4 py-3 transition-colors w-full ${stateClass} ${
          locked ? "cursor-default" : "cursor-pointer"
        }`}
      >
        <span className="flex items-start gap-3">
          <span
            className={`shrink-0 w-6 h-6 rounded-full grid place-items-center text-xs font-bold ${
              revealed && (isSelected || locked)
                ? option.correct
                  ? "bg-success text-white"
                  : isSelected
                    ? "bg-error text-white"
                    : "bg-bg-warm text-text-muted"
                : isSelected
                  ? "bg-primary text-white"
                  : "bg-bg-warm text-text-muted"
            }`}
            aria-hidden="true"
          >
            {marker ?? String.fromCharCode(65 + index)}
          </span>
          <span
            className="text-base text-text [&_code]:bg-secondary-light/20 [&_code]:px-1 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono"
            dangerouslySetInnerHTML={{ __html: renderLessonInlineHtml(option.text) }}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p
              className={`text-sm mt-1.5 ml-9 mr-1 mb-1 [&_code]:bg-secondary-light/20 [&_code]:px-1 [&_code]:rounded [&_code]:font-mono ${
                option.correct ? "text-success" : "text-text-muted"
              }`}
              dangerouslySetInnerHTML={{ __html: renderLessonInlineHtml(option.explanation) }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default function QuizQuestion({ config, state, onSelect, onCheck, seed }: QuizQuestionProps) {
  const options = useMemo(
    () => (config.shuffle ? seededShuffle(config.options, seed) : config.options),
    [config.options, config.shuffle, seed]
  );

  const multiple = config.mode === "multiple";
  const solved = state.revealed && isQuizCorrect(config, state.selected);
  const selected = new Set(state.selected);

  return (
    <div className="flex flex-col gap-4">
      {config.codeSnippet && (
        <CodeEditor value={config.codeSnippet} language={config.codeLanguage ?? "javascript"} readOnly />
      )}

      <div
        role={multiple ? "group" : "radiogroup"}
        aria-label="Answer options"
        className={config.mode === "true-false" ? "grid sm:grid-cols-2 gap-3" : "flex flex-col gap-3"}
      >
        {options.map((option, index) => (
          <OptionButton
            key={option.id}
            option={option}
            index={index}
            isSelected={selected.has(option.id)}
            revealed={state.revealed}
            locked={solved}
            multiple={multiple}
            onSelect={onSelect}
          />
        ))}
      </div>

      {multiple && !solved && (
        <div>
          <Button size="sm" onClick={onCheck} disabled={state.selected.length === 0}>
            Check answer
          </Button>
        </div>
      )}
    </div>
  );
}
