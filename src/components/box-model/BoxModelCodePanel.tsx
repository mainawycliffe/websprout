"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useBoxModelStore } from "@/stores/box-model-store";
import { generateBoxModelCSS, generateBoxModelHTML } from "@/lib/css-box-generator";
import { parseBoxModelCSS } from "@/lib/css-box-parser";
import type { BoxModelValues } from "@/types/lesson";
import CodeEditor from "@/components/editor/CodeEditor";
import HtmlPreview from "@/components/editor/HtmlPreview";

interface BoxModelCodePanelProps {
  lockedProperties?: string[];
}

function storeToValues(store: {
  contentWidth: number;
  contentHeight: number;
  padding: { top: number; right: number; bottom: number; left: number };
  border: { top: number; right: number; bottom: number; left: number };
  margin: { top: number; right: number; bottom: number; left: number };
  boxSizing: "content-box" | "border-box";
}): BoxModelValues {
  return {
    contentWidth: store.contentWidth,
    contentHeight: store.contentHeight,
    padding: store.padding,
    border: store.border,
    margin: store.margin,
    boxSizing: store.boxSizing,
  };
}

export default function BoxModelCodePanel({
  lockedProperties = [],
}: BoxModelCodePanelProps) {
  const store = useBoxModelStore();
  const sourceRef = useRef<"editor" | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [cssText, setCssText] = useState(() =>
    generateBoxModelCSS(storeToValues(store))
  );
  const [htmlText, setHtmlText] = useState(() =>
    generateBoxModelHTML(store.contentText)
  );

  // Store → Editor sync (only when not editing)
  useEffect(() => {
    if (sourceRef.current === "editor") return;
    setCssText(generateBoxModelCSS(storeToValues(store)));
  }, [
    store.contentWidth,
    store.contentHeight,
    store.padding,
    store.border,
    store.margin,
    store.boxSizing,
  ]);

  useEffect(() => {
    if (sourceRef.current === "editor") return;
    setHtmlText(generateBoxModelHTML(store.contentText));
  }, [store.contentText]);

  // Editor → Store sync (debounced)
  const handleCssChange = useCallback(
    (value: string) => {
      setCssText(value);
      sourceRef.current = "editor";

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        const parsed = parseBoxModelCSS(value);
        if (parsed) {
          // Strip locked properties so they aren't overwritten
          const filtered = { ...parsed };
          for (const locked of lockedProperties) {
            if (locked === "content") {
              delete filtered.contentWidth;
              delete filtered.contentHeight;
            } else {
              delete filtered[locked as keyof typeof filtered];
            }
          }
          store.setAllValues(filtered);
        }
        // Reset source after store update has propagated
        setTimeout(() => {
          sourceRef.current = null;
        }, 0);
      }, 300);
    },
    [lockedProperties, store],
  );

  const handleHtmlChange = useCallback(
    (value: string) => {
      setHtmlText(value);
      // Extract text content from the HTML for the preview
      const textMatch = value.match(/<div[^>]*>([\s\S]*?)<\/div>/);
      if (textMatch) {
        store.setContentText(textMatch[1].trim());
      }
    },
    [store],
  );

  // Build combined preview HTML
  const previewHtml = `<style>${cssText}</style>\n${htmlText}`;

  return (
    <div className="flex flex-col gap-3">
      <CodeEditor
        value={htmlText}
        language="html"
        onChange={handleHtmlChange}
        className="max-h-[140px]"
      />
      <CodeEditor
        value={cssText}
        language="css"
        onChange={handleCssChange}
      />
      <HtmlPreview html={previewHtml} />
    </div>
  );
}
