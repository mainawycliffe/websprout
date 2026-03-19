"use client";

import { AnimatePresence, motion } from "motion/react";
import type { StepInstruction } from "@/types/lesson";
import Card from "@/components/ui/Card";
import DocLinks from "@/components/ui/DocLinks";
import InfoBox from "@/components/ui/InfoBox";

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
    <Card className="border border-primary/20">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold text-text">{instruction.heading}</h2>
        <div className="text-base text-text-muted leading-relaxed flex flex-col gap-2">
          {instruction.body.split("\n\n").map((block, i) => {
            const lines = block.split("\n").filter(Boolean);
            const isList = lines.every((l) => l.startsWith("•"));
            if (isList) {
              return (
                <ul key={i} className="list-disc list-inside flex flex-col gap-1">
                  {lines.map((line, j) => (
                    <li key={j}>{line.replace(/^•\s*/, "")}</li>
                  ))}
                </ul>
              );
            }
            return <p key={i}>{block}</p>;
          })}
        </div>

        {instruction.analogy && (
          <div className="bg-warning-light/20 border border-warning-light/40 rounded-md px-4 py-3">
            <p className="text-sm text-text">
              <span className="font-semibold">Think of it this way: </span>
              {instruction.analogy}
            </p>
          </div>
        )}

        {instruction.infoBoxes && instruction.infoBoxes.length > 0 &&
          instruction.infoBoxes.map((box, i) => (
            <InfoBox key={`${box.variant}-${i}`} box={box} />
          ))
        }

        {instruction.docLinks && instruction.docLinks.length > 0 && (
          <DocLinks links={instruction.docLinks} />
        )}

        <AnimatePresence mode="wait">
          {feedback && (
            <motion.div
              key={feedback.message}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`rounded-md px-4 py-3 text-sm font-medium ${
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
              className="bg-secondary-light/20 border border-secondary-light/40 rounded-md px-4 py-3"
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
