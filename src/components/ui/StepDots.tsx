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
              w-3 h-3 rounded-full transition-colors cursor-pointer
              ${isActive ? "bg-primary ring-2 ring-primary-light ring-offset-2" : ""}
              ${isCompleted && !isActive ? "bg-success" : ""}
              ${!isActive && !isCompleted ? "bg-border" : ""}
            `}
            aria-label={`Step ${i + 1}${isCompleted ? " (completed)" : ""}${isActive ? " (current)" : ""}`}
          />
        );
      })}
    </div>
  );
}
