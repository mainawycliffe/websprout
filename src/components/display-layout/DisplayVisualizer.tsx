"use client";

import { memo } from "react";
import { AnimatePresence } from "motion/react";
import LayoutItemBox from "@/components/display-layout/LayoutItemBox";
import type { VisualizerItem } from "@/types/display-layout";

interface DisplayVisualizerProps {
  items: VisualizerItem[];
  containerDisplay?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  gridTemplateColumns?: string;
  gap?: string;
  className?: string;
}

const DisplayVisualizer = memo(function DisplayVisualizer({
  items,
  containerDisplay = "block",
  flexDirection,
  justifyContent,
  alignItems,
  gridTemplateColumns,
  gap,
  className = "",
}: DisplayVisualizerProps) {
  const containerStyle: React.CSSProperties = {
    display: containerDisplay,
    minHeight: "120px",
    position: "relative",
  };

  if (containerDisplay === "flex") {
    containerStyle.flexDirection = (flexDirection as React.CSSProperties["flexDirection"]) ?? "row";
    containerStyle.justifyContent = justifyContent ?? "flex-start";
    containerStyle.alignItems = alignItems ?? "stretch";
    if (gap) containerStyle.gap = gap;
  }

  if (containerDisplay === "grid") {
    containerStyle.gridTemplateColumns = gridTemplateColumns ?? "1fr";
    if (gap) containerStyle.gap = gap;
  }

  if (items.length === 0) {
    return (
      <div className={`rounded-[var(--radius-md)] overflow-hidden shadow-card ${className}`}>
        <div className="flex items-center px-4 py-2 bg-bg-warm text-xs text-text-muted border-b border-border">
          <span>LAYOUT VIEW</span>
        </div>
        <div className="bg-white p-6 min-h-[120px] flex items-center justify-center">
          <p className="text-text-muted text-sm">
            Layout visualization will appear here...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-[var(--radius-md)] overflow-hidden shadow-card ${className}`}>
      <div className="flex items-center justify-between px-4 py-2 bg-bg-warm text-xs text-text-muted border-b border-border">
        <span>LAYOUT VIEW</span>
        <span className="font-mono">display: {containerDisplay}</span>
      </div>
      <div className="bg-white p-4 overflow-auto">
        <div
          className="rounded-[var(--radius-sm)] border border-dashed border-border p-3"
          style={containerStyle}
        >
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <LayoutItemBox
                key={item.id}
                label={item.label}
                color={item.color}
                display={item.display}
                visibility={item.visibility}
                width={item.width}
                height={item.height}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
});

export default DisplayVisualizer;
