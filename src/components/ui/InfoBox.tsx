"use client";

import { motion } from "motion/react";
import type { InfoBox as InfoBoxType } from "@/types/lesson";

interface InfoBoxProps {
  box: InfoBoxType;
}

const variants = {
  standard: {
    bg: "bg-primary/5 border-primary/20",
    iconColor: "text-primary/70",
    titleColor: "text-primary/90",
    defaultTitle: "Web Standard",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  tip: {
    bg: "bg-warning-light/20 border-warning-light/40",
    iconColor: "text-warning",
    titleColor: "text-warning",
    defaultTitle: "Tip",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="9" y1="18" x2="15" y2="18" />
        <line x1="10" y1="22" x2="14" y2="22" />
        <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
      </svg>
    ),
  },
} as const;

export default function InfoBox({ box }: InfoBoxProps) {
  const v = variants[box.variant];
  const title = box.title ?? v.defaultTitle;

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-md border px-4 py-3 ${v.bg}`}
    >
      <div className={`flex items-center gap-1.5 mb-1 ${v.iconColor}`}>
        {v.icon}
        <span className={`text-xs font-semibold ${v.titleColor}`}>{title}</span>
      </div>
      <div className="text-sm text-text leading-relaxed [&_code]:bg-black/10 [&_code]:px-1 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono" dangerouslySetInnerHTML={{ __html: box.body }} />
    </motion.div>
  );
}
