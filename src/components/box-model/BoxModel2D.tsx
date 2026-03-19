"use client";

import { useBoxModelStore } from "@/stores/box-model-store";
import { calculateBoxModel } from "@/lib/box-model-calc";

export default function BoxModel2D() {
  const state = useBoxModelStore();
  const derived = calculateBoxModel(state);

  return (
    <div className="rounded-[var(--radius-lg)] overflow-hidden shadow-card">
      <div className="flex items-center justify-between px-4 py-2 bg-bg-warm text-xs text-text-muted border-b border-border">
        <span>2D BOX MODEL</span>
        <span className="font-mono">
          Total: {derived.totalWidth}px x {derived.totalHeight}px
        </span>
      </div>
      <div className="bg-white p-6 flex items-center justify-center min-h-[300px]">
        {/* Margin */}
        <div
          className="relative flex items-center justify-center"
          style={{
            padding: `${state.margin.top}px ${state.margin.right}px ${state.margin.bottom}px ${state.margin.left}px`,
            backgroundColor: "rgba(251, 146, 60, 0.2)",
            border: "1px dashed rgba(251, 146, 60, 0.5)",
          }}
        >
          <span className="absolute top-1 left-1 text-[10px] font-bold text-box-margin">
            margin
          </span>
          {/* Border */}
          <div
            className="relative flex items-center justify-center"
            style={{
              padding: `${state.border.top}px ${state.border.right}px ${state.border.bottom}px ${state.border.left}px`,
              backgroundColor: "rgba(251, 191, 36, 0.4)",
            }}
          >
            <span className="absolute top-1 left-1 text-[10px] font-bold text-box-border">
              border
            </span>
            {/* Padding */}
            <div
              className="relative flex items-center justify-center"
              style={{
                padding: `${state.padding.top}px ${state.padding.right}px ${state.padding.bottom}px ${state.padding.left}px`,
                backgroundColor: "rgba(74, 222, 128, 0.3)",
              }}
            >
              <span className="absolute top-1 left-1 text-[10px] font-bold text-box-padding">
                padding
              </span>
              {/* Content */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: `${state.contentWidth}px`,
                  height: `${state.contentHeight}px`,
                  backgroundColor: "rgba(96, 165, 250, 0.3)",
                  maxWidth: "100%",
                }}
              >
                <span className="text-[11px] font-bold text-box-content">
                  {state.contentWidth} x {state.contentHeight}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
