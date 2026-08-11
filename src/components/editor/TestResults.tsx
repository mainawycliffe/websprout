"use client";

import type { ConsoleEntry, TestResult } from "@/lib/js-sandbox";

interface TestResultsProps {
  results: TestResult[];
  compileError: string | null;
  logs: ConsoleEntry[];
  isRunning: boolean;
  hasRun: boolean;
  totalTests: number;
}

const entryColors: Record<ConsoleEntry["type"], string> = {
  log: "text-green-400",
  warn: "text-yellow-400",
  error: "text-red-400",
  info: "text-blue-400",
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="text-[#666] w-16 shrink-0">{label}</span>
      <span className="text-[#cdd6f4] whitespace-pre-wrap break-all">{value}</span>
    </div>
  );
}

export default function TestResults({
  results,
  compileError,
  logs,
  isRunning,
  hasRun,
  totalTests,
}: TestResultsProps) {
  const passing = results.filter((r) => r.passed).length;
  const allPass = results.length > 0 && passing === results.length;

  return (
    <div className="rounded-md overflow-hidden shadow-card flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 bg-[#181825] text-xs text-[#666] shrink-0">
        <span>TESTS</span>
        {results.length > 0 && (
          <span className={allPass ? "text-success font-semibold" : "text-[#999]"}>
            {passing} / {results.length} passing
          </span>
        )}
        {results.length === 0 && totalTests > 0 && <span>{totalTests} to run</span>}
      </div>

      <div className="bg-[#1e1e2e] min-h-[120px] p-4 font-mono text-sm flex flex-col gap-2">
        {isRunning && <span className="text-[#555]">Running tests…</span>}

        {!isRunning && !hasRun && (
          <span className="text-[#555]">Click &quot;Run Tests&quot; to check your solution.</span>
        )}

        {/* A compile error makes every row noise, so the rows are suppressed. */}
        {!isRunning && compileError && (
          <div className="bg-error-light/20 border border-error-light/40 text-error rounded-md px-3 py-2 whitespace-pre-wrap">
            {compileError}
          </div>
        )}

        {!isRunning && !compileError && allPass && (
          <div className="bg-success-light/20 border border-success-light/40 rounded-md p-4 text-center animate-success-pop">
            <span className="text-2xl block mb-1">&#127881;</span>
            <span className="text-success font-bold">All {results.length} tests pass!</span>
          </div>
        )}

        {!isRunning &&
          !compileError &&
          results.map((result, i) => (
            <div key={`${result.name}-${i}`} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-semibold shrink-0 ${
                    result.passed ? "bg-success-light/30 text-success" : "bg-error-light/30 text-error"
                  }`}
                >
                  {result.passed ? "PASS" : "FAIL"}
                </span>
                <span className="text-[#cdd6f4]">{result.name}</span>
              </div>

              {!result.passed && (
                <div className="ml-2 pl-3 border-l-2 border-[#2a2a3a] flex flex-col gap-0.5 text-xs">
                  {result.error ? (
                    <DetailRow label="error" value={result.error} />
                  ) : result.hidden ? (
                    <DetailRow label="returned" value={result.actual} />
                  ) : (
                    <>
                      <DetailRow label="input" value={result.input} />
                      <DetailRow label="expected" value={result.expected} />
                      <DetailRow label="actual" value={result.actual} />
                    </>
                  )}
                </div>
              )}
            </div>
          ))}

        {!isRunning && logs.length > 0 && (
          <details className="mt-1 text-xs">
            <summary className="cursor-pointer text-[#666] hover:text-[#999]">
              Console output ({logs.length})
            </summary>
            <div className="mt-2 flex flex-col gap-0.5">
              {logs.map((entry, i) => (
                <div key={i} className={`${entryColors[entry.type]} whitespace-pre-wrap`}>
                  {entry.args.join(" ")}
                </div>
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}
