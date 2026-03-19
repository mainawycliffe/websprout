"use client";

import { memo } from "react";
import type { TagNode } from "@/types/tag-builder";

interface TagVisualizerProps {
  tree: TagNode[];
  className?: string;
}

const TAG_COLORS: Record<string, { bg: string; border: string }> = {
  h1: { bg: "#DBEAFE", border: "#3B82F6" },
  h2: { bg: "#E0E7FF", border: "#6366F1" },
  h3: { bg: "#EDE9FE", border: "#8B5CF6" },
  p: { bg: "#D1FAE5", border: "#10B981" },
  div: { bg: "#FEF3C7", border: "#F59E0B" },
  span: { bg: "#FCE7F3", border: "#EC4899" },
  a: { bg: "#CFFAFE", border: "#06B6D4" },
  style: { bg: "#F3E8FF", border: "#A855F7" },
  default: { bg: "#F1F5F9", border: "#94A3B8" },
};

function getColor(tagName: string) {
  return TAG_COLORS[tagName] ?? TAG_COLORS.default;
}

const TagNodeView = memo(function TagNodeView({
  node,
  depth = 0,
}: {
  node: TagNode;
  depth?: number;
}) {
  if (node.type === "text") {
    if (!node.content?.trim()) return null;
    return (
      <span className="text-sm text-text-muted px-2 py-0.5">
        {node.content.trim()}
      </span>
    );
  }

  if (node.type === "error") {
    return (
      <div className="inline-flex items-center gap-1 px-2 py-1 bg-error-light/30 border border-error/50 rounded-[var(--radius-sm)] text-error text-xs font-mono">
        {node.content}
        <span className="text-[10px] ml-1">{node.error?.message}</span>
      </div>
    );
  }

  const color = getColor(node.tagName ?? "");
  const hasError = !!node.error;

  return (
    <div
      className={`relative rounded-[var(--radius-md)] border-2 p-3 my-1 transition-colors duration-200 ${
        hasError ? "animate-leak" : ""
      }`}
      style={{
        backgroundColor: hasError ? "#FEF2F2" : color.bg,
        borderColor: hasError ? "#EF4444" : color.border,
        marginLeft: depth > 0 ? "12px" : 0,
      }}
    >
      {/* Tag label */}
      <div
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold mb-1"
        style={{
          backgroundColor: hasError ? "#FCA5A5" : color.border,
          color: "white",
        }}
      >
        &lt;{node.tagName}&gt;
        {hasError && (
          <span className="text-[10px] font-normal ml-1">
            {node.error?.message}
          </span>
        )}
      </div>

      {/* Children */}
      <div className="flex flex-col gap-1">
        {node.children.map((child, i) => (
          <TagNodeView
            key={`${child.type}-${child.tagName ?? ""}-${i}`}
            node={child}
            depth={depth + 1}
          />
        ))}
      </div>

      {/* Overflow leak effect for unclosed tags */}
      {hasError && node.error?.type === "unclosed" && (
        <div className="absolute -bottom-2 left-4 right-4 h-4 bg-gradient-to-b from-error/20 to-transparent rounded-b-[var(--radius-md)]" />
      )}
    </div>
  );
});

const TagVisualizer = memo(function TagVisualizer({
  tree,
  className = "",
}: TagVisualizerProps) {
  if (tree.length === 0) {
    return (
      <div
        className={`rounded-[var(--radius-md)] overflow-hidden shadow-card ${className}`}
      >
        <div className="flex items-center px-4 py-2 bg-bg-warm text-xs text-text-muted border-b border-border">
          <span>TAG VIEW</span>
        </div>
        <div className="bg-white p-6 min-h-[120px] flex items-center justify-center">
          <p className="text-text-muted text-sm">
            Start typing to see your tags visualized here...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-[var(--radius-md)] overflow-hidden shadow-card ${className}`}
    >
      <div className="flex items-center px-4 py-2 bg-bg-warm text-xs text-text-muted border-b border-border">
        <span>TAG VIEW</span>
      </div>
      <div className="bg-white p-4 min-h-[120px]">
        {tree.map((node, i) => (
          <TagNodeView key={`root-${i}`} node={node} />
        ))}
      </div>
    </div>
  );
});

export default TagVisualizer;
