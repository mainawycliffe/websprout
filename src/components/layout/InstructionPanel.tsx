"use client";

import { AnimatePresence, motion } from "motion/react";
import type { StepInstruction } from "@/types/lesson";
import Card from "@/components/ui/Card";

interface InstructionPanelProps {
  instruction: StepInstruction;
  hint?: string | null;
  feedback?: { valid: boolean; message: string } | null;
}

export default function InstructionPanel({
  instruction,
  hint,
  feedback,
}: InstructionPanelProps) {
  return (
    <Card className="border-2 border-primary-light/30">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold text-text">{instruction.heading}</h2>
        <p className="text-base text-text-muted leading-relaxed">
          {instruction.body}
        </p>

        {instruction.analogy && (
          <div className="bg-warning-light/20 border border-warning-light/40 rounded-[var(--radius-md)] px-4 py-3">
            <p className="text-sm text-text">
              <span className="font-semibold">Think of it this way: </span>
              {instruction.analogy}
            </p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {feedback && (
            <motion.div
              key={feedback.message}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`rounded-[var(--radius-md)] px-4 py-3 text-sm font-medium ${
                feedback.valid
                  ? "bg-success-light/20 border border-success-light/40 text-success"
                  : "bg-error-light/20 border border-error-light/40 text-error"
              }`}
            >
              {feedback.message}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {hint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-secondary-light/20 border border-secondary-light/40 rounded-[var(--radius-md)] px-4 py-3"
            >
              <p className="text-sm text-secondary">
                <span className="font-semibold">Hint: </span>
                {hint}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
