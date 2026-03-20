"use client";

import { memo, useMemo } from "react";
import type { GapDefinition } from "@/types/lesson";

interface GapFillEditorProps {
  template: string;
  gaps: GapDefinition[];
  gapValues: Record<string, string>;
  onGapChange: (gapId: string, value: string) => void;
}

/** A single segment of the template: either static text or a gap placeholder */
interface TemplatePart {
  type: "text" | "gap";
  content: string; // For text: the literal text. For gap: the gap ID.
  key: string;
}

/** Parse the template into a stable array of parts — only recomputes when template changes */
function parseTemplate(template: string): TemplatePart[] {
  const parts: TemplatePart[] = [];
  let remaining = template;
  let textIndex = 0;
  const gapCount: Record<string, number> = {};

  while (remaining.length > 0) {
    const gapMatch = remaining.match(/\{\{(\w+)\}\}/);

    if (!gapMatch) {
      parts.push({ type: "text", content: remaining, key: `text-${textIndex++}` });
      break;
    }

    const gapId = gapMatch[1];
    const beforeGap = remaining.slice(0, gapMatch.index);

    if (beforeGap) {
      parts.push({ type: "text", content: beforeGap, key: `text-${textIndex++}` });
    }

    const occurrence = gapCount[gapId] ?? 0;
    gapCount[gapId] = occurrence + 1;
    parts.push({ type: "gap", content: gapId, key: `gap-${gapId}-${occurrence}` });

    remaining = remaining.slice((gapMatch.index ?? 0) + gapMatch[0].length);
  }

  return parts;
}

/** Memoized gap input — only re-renders when its own value changes */
const GapInput = memo(function GapInput({
  gap,
  value,
  onGapChange,
}: {
  gap: GapDefinition;
  value: string;
  onGapChange: (gapId: string, value: string) => void;
}) {
  const isCorrect = gap.acceptedAnswers.some((a) =>
    gap.caseSensitive
      ? value.trim() === a
      : value.trim().toLowerCase() === a.toLowerCase()
  );

  return (
    <span className="inline-flex items-center mx-0.5">
      <input
        type="text"
        value={value}
        onChange={(e) => onGapChange(gap.id, e.target.value)}
        placeholder={gap.placeholder}
        className={`
          inline-block w-auto min-w-[80px] max-w-[160px]
          px-2 py-0.5 text-base font-mono
          border-2 border-dashed rounded-[var(--radius-sm)]
          bg-[#313244] text-white placeholder-[#666]
          focus:outline-none focus:border-primary
          transition-colors
          ${value && isCorrect ? "border-success bg-success/10" : ""}
          ${value && !isCorrect ? "border-warning-light" : ""}
          ${!value ? "border-[#555] animate-pulse-glow" : ""}
        `}
        style={{ width: `${Math.max(80, value.length * 10 + 40)}px` }}
        autoComplete="off"
        spellCheck={false}
      />
    </span>
  );
});

export default function GapFillEditor({
  template,
  gaps,
  gapValues,
  onGapChange,
}: GapFillEditorProps) {
  // Parse template structure once — stable across gap value changes
  const templateParts = useMemo(() => parseTemplate(template), [template]);

  // Index gaps by ID for O(1) lookup
  const gapMap = useMemo(
    () => new Map(gaps.map((g) => [g.id, g])),
    [gaps]
  );

  return (
    <div className="rounded-[var(--radius-md)] overflow-hidden shadow-card">
      <div className="flex items-center px-4 py-2 bg-[#181825] text-xs text-[#666]">
        <span>FILL IN THE BLANKS</span>
      </div>
      <div className="bg-editor-bg p-4 font-mono text-base leading-relaxed whitespace-pre-wrap">
        {templateParts.map((part) => {
          if (part.type === "text") {
            return (
              <span key={part.key} className="text-[#cdd6f4]">
                {part.content}
              </span>
            );
          }

          const gap = gapMap.get(part.content);
          if (!gap) return null;

          return (
            <GapInput
              key={part.key}
              gap={gap}
              value={gapValues[part.content] ?? ""}
              onGapChange={onGapChange}
            />
          );
        })}
      </div>
    </div>
  );
}
