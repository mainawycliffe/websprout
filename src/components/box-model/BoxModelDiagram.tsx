"use client";

import { motion } from "motion/react";

export default function BoxModelDiagram() {
  return (
    <div className="rounded-[var(--radius-lg)] overflow-hidden shadow-card">
      <div className="flex items-center px-4 py-2 bg-bg-warm text-xs text-text-muted border-b border-border">
        <span>THE CSS BOX MODEL</span>
      </div>
      <div className="bg-white p-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          {/* Margin layer */}
          <div
            className="relative flex items-center justify-center"
            style={{
              padding: "28px",
              backgroundColor: "rgba(251, 146, 60, 0.15)",
              border: "2px dashed rgba(251, 146, 60, 0.5)",
              borderRadius: "4px",
            }}
          >
            <span className="absolute top-1.5 left-2 text-[11px] font-bold" style={{ color: "#FB923C" }}>
              margin
            </span>

            {/* Border layer */}
            <div
              className="relative flex items-center justify-center"
              style={{
                padding: "20px",
                backgroundColor: "rgba(251, 191, 36, 0.3)",
                border: "3px solid rgba(251, 191, 36, 0.7)",
                borderRadius: "3px",
              }}
            >
              <span className="absolute top-1 left-1.5 text-[11px] font-bold" style={{ color: "#D97706" }}>
                border
              </span>

              {/* Padding layer */}
              <div
                className="relative flex items-center justify-center"
                style={{
                  padding: "24px",
                  backgroundColor: "rgba(74, 222, 128, 0.2)",
                  border: "1px dashed rgba(74, 222, 128, 0.6)",
                  borderRadius: "2px",
                }}
              >
                <span className="absolute top-1 left-1.5 text-[11px] font-bold" style={{ color: "#16A34A" }}>
                  padding
                </span>

                {/* Content layer */}
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "160px",
                    height: "80px",
                    backgroundColor: "rgba(96, 165, 250, 0.25)",
                    border: "2px solid rgba(96, 165, 250, 0.5)",
                    borderRadius: "2px",
                  }}
                >
                  <span className="text-sm font-bold" style={{ color: "#2563EB" }}>
                    content
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-4 mt-4">
            {[
              { label: "Content", color: "#60A5FA" },
              { label: "Padding", color: "#4ADE80" },
              { label: "Border", color: "#FBBF24" },
              { label: "Margin", color: "#FB923C" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: item.color, opacity: 0.6 }}
                />
                <span className="text-xs text-text-muted">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
