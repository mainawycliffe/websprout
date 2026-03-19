"use client";

import { motion } from "motion/react";

interface ProgressIndicatorProps {
  progress: number; // 0 to 1
  size?: "sm" | "md";
  color?: string;
  showLabel?: boolean;
}

export default function ProgressIndicator({
  progress,
  size = "md",
  color = "var(--color-primary)",
  showLabel = false,
}: ProgressIndicatorProps) {
  const height = size === "sm" ? "h-2" : "h-3";
  const percentage = Math.round(progress * 100);
  const isDefaultColor = color === "var(--color-primary)";
  const barStyle = isDefaultColor
    ? { backgroundImage: "linear-gradient(to right, var(--color-gradient-start), var(--color-gradient-end))" }
    : { backgroundColor: color };

  return (
    <div className="flex flex-col gap-1">
      {showLabel && (
        <span className="text-xs font-medium text-text-muted">
          {percentage}% complete
        </span>
      )}
      <div className={`w-full ${height} bg-border rounded-full overflow-hidden`}>
        <motion.div
          className={`${height} rounded-full`}
          style={barStyle}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
