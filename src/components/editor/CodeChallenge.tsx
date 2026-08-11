"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CodeEditor from "@/components/editor/CodeEditor";
import TestResults from "@/components/editor/TestResults";
import Button from "@/components/ui/Button";
import {
  createReactSandboxSrcdoc,
  createSandboxSrcdoc,
  runTestsInSandbox,
  type SandboxTestSpec,
  type TestRunResult,
} from "@/lib/js-sandbox";
import type { CodeChallengeConfig } from "@/types/lesson";

interface CodeChallengeProps {
  config: CodeChallengeConfig;
  code: string;
  onCodeChange: (code: string) => void;
  run: TestRunResult | null;
  onRun: (result: TestRunResult | null) => void;
}

const CDN_ERROR =
  "Could not load React from unpkg — check your connection, then click Retry.";
const SANDBOX_ERROR = "The code sandbox did not start. Click Retry to rebuild it.";

/** How long to wait for the React CDN before telling the student it failed. */
const REACT_READY_TIMEOUT = 10000;
/** The plain sandbox is inline, so it should be ready almost immediately. */
const PLAIN_READY_TIMEOUT = 5000;

export default function CodeChallenge({
  config,
  code,
  onCodeChange,
  run,
  onRun,
}: CodeChallengeProps) {
  const isReact = config.language === "react";
  const iframeRef = useRef<HTMLIFrameElement>(null);
  /** Identifies the newest run so superseded ones can be discarded. */
  const runTokenRef = useRef(0);
  const [isReady, setIsReady] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [cdnError, setCdnError] = useState<string | null>(null);
  // Remounting the iframe is the only way to kill a synchronous infinite loop.
  const [sandboxKey, setSandboxKey] = useState(0);

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.source !== iframeRef.current?.contentWindow) return;
      if (e.data?.type !== "sandbox-ready") return;
      setIsReady(true);
      // Surfaced on step entry, not on first Run, so a broken CDN is visible early.
      if (isReact) setCdnError(e.data.hasReact ? null : CDN_ERROR);
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [isReact, sandboxKey]);

  // The ready message never arrives if the sandbox document itself fails to
  // load. Without this the button would sit disabled behind "Preparing
  // sandbox…" forever, with no error and no way to retry.
  useEffect(() => {
    if (isReady) return;
    const timer = setTimeout(
      () => setCdnError(isReact ? CDN_ERROR : SANDBOX_ERROR),
      isReact ? REACT_READY_TIMEOUT : PLAIN_READY_TIMEOUT
    );
    return () => clearTimeout(timer);
  }, [isReact, isReady, sandboxKey]);

  /** Rebuild the sandbox from scratch — the only recovery from a failed load. */
  const handleRetry = useCallback(() => {
    setCdnError(null);
    setIsReady(false);
    setSandboxKey((k) => k + 1);
  }, []);

  const handleRunTests = useCallback(async () => {
    const iframe = iframeRef.current;
    if (!iframe || !isReady || isRunning) return;

    // A run started on one step must never deliver its result onto another.
    // Without this a slow passing run could land on the next challenge's
    // `testRun` and let the student advance past something they never solved.
    const token = ++runTokenRef.current;
    const isStale = () => token !== runTokenRef.current;

    onRun(null);
    setIsRunning(true);

    let source = code;
    if (config.language === "typescript") {
      const { transpileTypeScript } = await import("@/lib/ts-transpile");
      const transpiled = await transpileTypeScript(code);
      if (isStale()) return;
      if (transpiled.error) {
        setIsRunning(false);
        onRun({
          results: [],
          compileError: `TypeScript error: ${transpiled.error}`,
          logs: [],
          timedOut: false,
        });
        return;
      }
      source = transpiled.code;
    }

    const result = await runTestsInSandbox(
      iframe,
      source,
      isReact ? (config.componentName ?? config.functionName) : config.functionName,
      config.tests as SandboxTestSpec[],
      config.timeout ?? 5000,
      isReact ? "react" : "js"
    );

    if (isStale()) return;

    setIsRunning(false);
    onRun(result);

    if (result.timedOut) {
      // Tear the iframe down so the runaway loop dies with its document.
      setIsReady(false);
      setSandboxKey((k) => k + 1);
    }
  }, [code, config, isReact, isReady, isRunning, onRun]);

  // Switching to a different challenge invalidates anything still in flight.
  useEffect(() => {
    runTokenRef.current++;
    setIsRunning(false);
  }, [config]);

  const handleReset = useCallback(() => {
    onCodeChange(config.starterCode);
    onRun(null);
  }, [config.starterCode, onCodeChange, onRun]);

  const editorLanguage = config.language === "react" ? "javascript" : config.language;

  return (
    <div className="flex flex-col gap-4">
      <CodeEditor value={code} language={editorLanguage} onChange={onCodeChange} />

      <div className="flex items-center gap-2">
        <Button size="sm" onClick={handleRunTests} disabled={isRunning || !isReady}>
          {isRunning ? "Running…" : "Run Tests"}
        </Button>
        <Button size="sm" variant="ghost" onClick={handleReset}>
          Reset code
        </Button>
        {cdnError && !isReady && (
          <Button size="sm" variant="secondary" onClick={handleRetry}>
            Retry
          </Button>
        )}
        {!isReady && !cdnError && (
          <span className="text-xs text-text-muted">Preparing sandbox…</span>
        )}
      </div>

      <TestResults
        results={run?.results ?? []}
        compileError={run?.compileError ?? cdnError}
        logs={run?.logs ?? []}
        isRunning={isRunning}
        hasRun={run !== null || cdnError !== null}
        totalTests={config.tests.length}
      />

      {/*
        Deliberately not `display: none`: a hidden iframe gets its timers and
        rendering throttled, which makes React mounting and click simulation
        flaky. Zero-sized and offscreen keeps the document live.
      */}
      <iframe
        key={sandboxKey}
        ref={iframeRef}
        title="Test Sandbox"
        sandbox="allow-scripts"
        srcDoc={isReact ? createReactSandboxSrcdoc() : createSandboxSrcdoc()}
        aria-hidden="true"
        tabIndex={-1}
        className="absolute w-px h-px opacity-0 pointer-events-none -z-10 border-0"
      />
    </div>
  );
}
