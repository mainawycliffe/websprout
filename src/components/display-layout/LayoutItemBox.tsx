"use client";

import { memo } from "react";
import { motion } from "motion/react";

interface LayoutItemBoxProps {
  label: string;
  color: string;
  display?: string;
  visibility?: "visible" | "hidden";
  width?: string;
  height?: string;
}

const LayoutItemBox = memo(function LayoutItemBox({
  label,
  color,
  display,
  visibility = "visible",
  width,
  height,
}: LayoutItemBoxProps) {
  if (display === "none") {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0, scale: 0.8 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.3 }}
      />
    );
  }

  const isHidden = visibility === "hidden";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isHidden ? 0.15 : 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3, layout: { duration: 0.4 } }}
      className="flex items-center justify-center rounded-[var(--radius-md)] text-xs font-bold text-white select-none"
      style={{
        backgroundColor: color,
        width: width ?? "80px",
        height: height ?? "48px",
        border: isHidden ? `2px dashed ${color}` : "none",
        display: display === "inline" || display === "inline-block" ? display : undefined,
      }}
    >
      {label}
    </motion.div>
  );
});

export default LayoutItemBox;
