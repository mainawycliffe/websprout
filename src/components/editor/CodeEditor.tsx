"use client";

import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { EditorView } from "@codemirror/view";

interface CodeEditorProps {
  value: string;
  language: "html" | "css" | "both";
  onChange?: (value: string) => void;
  readOnly?: boolean;
  className?: string;
}

const beginnerTheme = EditorView.theme({
  "&": {
    fontSize: "16px",
    backgroundColor: "var(--color-editor-bg)",
  },
  ".cm-content": {
    fontFamily: "var(--font-mono), monospace",
    padding: "16px",
    caretColor: "#fff",
  },
  ".cm-gutters": {
    backgroundColor: "var(--color-editor-bg)",
    color: "#666",
    border: "none",
    paddingLeft: "8px",
  },
  ".cm-activeLine": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  ".cm-selectionBackground": {
    backgroundColor: "rgba(59, 130, 246, 0.3) !important",
  },
  ".cm-cursor": {
    borderLeftColor: "#fff",
    borderLeftWidth: "2px",
  },
});

function getExtensions(language: "html" | "css" | "both") {
  switch (language) {
    case "html":
      return [html()];
    case "css":
      return [css()];
    case "both":
      return [html()];
  }
}

export default function CodeEditor({
  value,
  language,
  onChange,
  readOnly = false,
  className = "",
}: CodeEditorProps) {
  return (
    <div className={`rounded-[var(--radius-md)] overflow-hidden shadow-card ${className}`}>
      <div className="flex items-center justify-between px-4 py-2 bg-[#181825] text-xs text-[#666]">
        <span>{language.toUpperCase()}</span>
        {readOnly && <span className="text-warning">READ ONLY</span>}
      </div>
      <CodeMirror
        value={value}
        onChange={onChange}
        extensions={[...getExtensions(language), beginnerTheme]}
        theme="dark"
        readOnly={readOnly}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: false,
          foldGutter: false,
          searchKeymap: false,
        }}
        minHeight="120px"
      />
    </div>
  );
}
