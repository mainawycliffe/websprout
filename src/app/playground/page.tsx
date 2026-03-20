"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Diagnostic } from "@codemirror/lint";
import CodeEditor from "@/components/editor/CodeEditor";
import JsConsole from "@/components/editor/JsConsole";
import type { JsConsoleHandle } from "@/components/editor/JsConsole";
import { useIndexedDB } from "@/hooks/useIndexedDB";

type Language = "javascript" | "typescript";

const DEFAULT_JS = `// Welcome to the JavaScript Playground!
console.log("Hello, world!");
`;

const DEFAULT_TS = `// Welcome to the TypeScript Playground!
const greeting: string = "Hello, TypeScript!";
console.log(greeting);
`;

export default function PlaygroundPage() {
  const [language, setLanguage] = useState<Language>("javascript");
  const [code, setCode] = useState(DEFAULT_JS);
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const consoleRef = useRef<JsConsoleHandle>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const checkTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { isReady, savePlaygroundState, getPlaygroundState } = useIndexedDB();

  // Load saved state on mount
  useEffect(() => {
    if (!isReady) return;
    getPlaygroundState("playground").then((saved) => {
      if (saved) {
        setCode(saved.code);
        setLanguage(saved.language as Language);
      }
    });
  }, [isReady, getPlaygroundState]);

  // Auto-save on code/language change
  const saveToDb = useCallback(
    (codeToSave: string, lang: Language) => {
      if (!isReady) return;
      savePlaygroundState({
        id: "playground",
        code: codeToSave,
        language: lang,
        lastSaved: Date.now(),
      });
    },
    [isReady, savePlaygroundState]
  );

  // Debounced type checking for TypeScript
  useEffect(() => {
    if (language !== "typescript") {
      setDiagnostics([]);
      return;
    }
    if (checkTimerRef.current) clearTimeout(checkTimerRef.current);
    checkTimerRef.current = setTimeout(async () => {
      const { checkTypeScript } = await import("@/lib/ts-transpile");
      const diags = await checkTypeScript(code);
      setDiagnostics(diags);
    }, 500);
    return () => {
      if (checkTimerRef.current) clearTimeout(checkTimerRef.current);
    };
  }, [code, language]);

  const handleCodeChange = useCallback(
    (value: string) => {
      setCode(value);
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => saveToDb(value, language), 500);
    },
    [language, saveToDb]
  );

  const handleLanguageChange = useCallback(
    (lang: Language) => {
      setLanguage(lang);
      const newCode = lang === "typescript" ? DEFAULT_TS : DEFAULT_JS;
      setCode(newCode);
      setDiagnostics([]);
      saveToDb(newCode, lang);
    },
    [saveToDb]
  );

  const handleRun = useCallback(async () => {
    if (!consoleRef.current) return;

    if (language === "typescript") {
      const { transpileTypeScript } = await import("@/lib/ts-transpile");
      const result = await transpileTypeScript(code);
      if (result.error) {
        consoleRef.current.clear();
        await consoleRef.current.run(`throw new Error(${JSON.stringify("TypeScript Error: " + result.error)})`);
        return;
      }
      await consoleRef.current.run(result.code);
    } else {
      await consoleRef.current.run(code);
    }
  }, [code, language]);

  // Keyboard shortcut: Cmd/Ctrl + Enter to run
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        handleRun();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRun]);

  const editorDiagnostics = useMemo(
    () => (diagnostics.length > 0 ? diagnostics : undefined),
    [diagnostics]
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden max-w-7xl mx-auto w-full p-4 gap-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-0.5">
          <button
            onClick={() => handleLanguageChange("javascript")}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              language === "javascript"
                ? "bg-primary text-white"
                : "text-text-muted hover:text-text hover:bg-bg-warm"
            }`}
          >
            JavaScript
          </button>
          <button
            onClick={() => handleLanguageChange("typescript")}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              language === "typescript"
                ? "bg-primary text-white"
                : "text-text-muted hover:text-text hover:bg-bg-warm"
            }`}
          >
            TypeScript
          </button>
        </div>
        <div className="flex items-center gap-3">
          <kbd className="text-xs text-text-muted hidden sm:inline" suppressHydrationWarning>
            {typeof navigator !== "undefined" && navigator.platform?.includes("Mac") ? "\u2318" : "Ctrl"}+Enter to run
          </kbd>
          <button
            onClick={handleRun}
            className="px-4 py-1.5 rounded-lg bg-success hover:bg-success/90 text-white text-sm font-medium transition-colors shadow-sm"
          >
            Run
          </button>
        </div>
      </div>

      {/* Editor + Console — fills remaining viewport */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 grid-rows-[1fr] gap-4 min-h-0">
        <div className="min-h-0">
          <CodeEditor
            value={code}
            language={language}
            onChange={handleCodeChange}
            diagnostics={editorDiagnostics}
            className="h-full"
            fillHeight
          />
        </div>
        <div className="min-h-0">
          <JsConsole ref={consoleRef} className="h-full" />
        </div>
      </div>
    </div>
  );
}
