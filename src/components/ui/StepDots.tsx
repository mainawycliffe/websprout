"use client";

import { motion } from "motion/react";

interface StepDotsProps {
  total: number;
  current: number;
  completed: Set<number>;
  onStepClick?: (step: number) => void;
}

export default function StepDots({
  total,
  current,
  completed,
  onStepClick,
}: StepDotsProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => {
        const isActive = i === current;
        const isCompleted = completed.has(i);

        return (
          <motion.button
            key={i}
            onClick={() => onStepClick?.(i)}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            className={`
              w-3.5 h-3.5 rounded-full transition-colors cursor-pointer
              ${isActive ? "bg-linear-to-r from-(--color-gradient-start) to-(--color-gradient-end) ring-2 ring-primary-light ring-offset-2 ring-offset-bg" : ""}
              ${isCompleted && !isActive ? "bg-success" : ""}
              ${!isActive && !isCompleted ? "bg-border/80" : ""}
            `}
            aria-label={`Step ${i + 1}${isCompleted ? " (completed)" : ""}${isActive ? " (current)" : ""}`}
          />
        );
      })}
    </div>
  );
}
