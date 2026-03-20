"use client";

import { memo, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { createSandboxSrcdoc, executeInSandbox } from "@/lib/js-sandbox";
import type { ConsoleEntry } from "@/lib/js-sandbox";

export interface JsConsoleHandle {
  run: (code: string) => Promise<void>;
  clear: () => void;
}

interface JsConsoleProps {
  code?: string;
  autoRun?: boolean;
  className?: string;
  timeout?: number;
  onOutput?: (output: ConsoleEntry[]) => void;
  ref?: React.Ref<JsConsoleHandle>;
}

const entryColors: Record<ConsoleEntry["type"], string> = {
  log: "text-green-400",
  warn: "text-yellow-400",
  error: "text-red-400",
  info: "text-blue-400",
};

const JsConsole = memo(function JsConsole({
  code,
  autoRun = false,
  className = "",
  timeout,
  onOutput,
  ref,
}: JsConsoleProps) {
  const [entries, setEntries] = useState<ConsoleEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.source !== iframeRef.current?.contentWindow) return;
      if (e.data?.type === "console") {
        setEntries((prev) => [...prev, e.data.entry]);
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleIframeLoad = useCallback(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [entries]);

  const runCode = useCallback(async (codeToRun: string) => {
    if (!iframeRef.current || !isReady) return;
    setEntries([]);
    setError(null);
    setIsRunning(true);

    const result = await executeInSandbox(iframeRef.current, codeToRun, timeout);
    setIsRunning(false);
    setError(result.error);
    setEntries(result.output);
    onOutput?.(result.output);
  }, [isReady, onOutput, timeout]);

  const handleRun = useCallback(async () => {
    if (code !== undefined) {
      await runCode(code);
    }
  }, [code, runCode]);

  const handleClear = useCallback(() => {
    setEntries([]);
    setError(null);
  }, []);

  // Expose imperative handle for playground use
  useImperativeHandle(ref, () => ({
    run: runCode,
    clear: handleClear,
  }), [runCode, handleClear]);

  useEffect(() => {
    if (autoRun && isReady && code) {
      handleRun();
    }
  }, [autoRun, isReady, code, handleRun]);

  return (
    <div className={`rounded-[var(--radius-md)] overflow-hidden shadow-card flex flex-col ${className}`}>
      <div className="flex items-center justify-between px-4 py-2 bg-[#181825] text-xs text-[#666] shrink-0">
        <span>CONSOLE</span>
        <div className="flex gap-2">
          <button
            onClick={handleClear}
            className="px-2 py-0.5 rounded bg-[#2a2a3a] hover:bg-[#3a3a4a] text-[#999] transition-colors"
          >
            Clear
          </button>
          {code !== undefined && (
            <button
              onClick={handleRun}
              disabled={isRunning || !isReady}
              className="px-3 py-0.5 rounded bg-green-700 hover:bg-green-600 text-white disabled:opacity-50 transition-colors"
            >
              {isRunning ? "Running..." : "Run"}
            </button>
          )}
        </div>
      </div>
      <div
        ref={outputRef}
        className="bg-[#1e1e2e] min-h-[120px] flex-1 overflow-y-auto p-4 font-mono text-sm"
      >
        {entries.length === 0 && !error && (
          <span className="text-[#555]">Click &quot;Run&quot; to execute your code...</span>
        )}
        {entries.map((entry, i) => (
          <div key={i} className={`${entryColors[entry.type]} whitespace-pre-wrap`}>
            {entry.type === "error" && <span className="text-red-500 mr-1">✗</span>}
            {entry.type === "warn" && <span className="text-yellow-500 mr-1">⚠</span>}
            {entry.args.join(" ")}
          </div>
        ))}
        {error && entries.every((e) => e.args.join(" ") !== error) && (
          <div className="text-red-400 whitespace-pre-wrap">
            <span className="text-red-500 mr-1">✗</span>
            {error}
          </div>
        )}
      </div>
      <iframe
        ref={iframeRef}
        title="JS Sandbox"
        sandbox="allow-scripts allow-same-origin"
        srcDoc={createSandboxSrcdoc()}
        onLoad={handleIframeLoad}
        className="hidden"
      />
    </div>
  );
});

export default JsConsole;
