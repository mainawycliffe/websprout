export interface ConsoleEntry {
  type: "log" | "warn" | "error" | "info";
  args: string[];
  timestamp: number;
}

export interface SandboxResult {
  output: ConsoleEntry[];
  error: string | null;
}

const SANDBOX_HTML = `<!DOCTYPE html><html><head><script>
const __output = [];
const __originalConsole = { log: console.log, warn: console.warn, error: console.error, info: console.info };

function __stringify(val) {
  if (val === undefined) return "undefined";
  if (val === null) return "null";
  if (typeof val === "string") return val;
  if (typeof val === "function") return val.toString();
  try { return JSON.stringify(val, null, 2); } catch { return String(val); }
}

["log", "warn", "error", "info"].forEach(method => {
  console[method] = (...args) => {
    const entry = { type: method, args: args.map(__stringify), timestamp: Date.now() };
    __output.push(entry);
    parent.postMessage({ type: "console", entry }, "*");
  };
});

window.addEventListener("message", (e) => {
  if (e.data?.type !== "execute") return;
  __output.length = 0;
  try {
    const fn = new Function("return (async () => {\\n" + e.data.code + "\\n})()");
    fn().then(() => {
      parent.postMessage({ type: "done", output: __output, error: null }, "*");
    }).catch((err) => {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error(errorMsg);
      parent.postMessage({ type: "done", output: __output, error: errorMsg }, "*");
    });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error(errorMsg);
    parent.postMessage({ type: "done", output: __output, error: errorMsg }, "*");
  }
});
<\/script></head><body></body></html>`;

export function createSandboxSrcdoc(): string {
  return SANDBOX_HTML;
}

export function executeInSandbox(
  iframe: HTMLIFrameElement,
  code: string,
  timeout = 3000
): Promise<SandboxResult> {
  return new Promise((resolve) => {
    function handleMessage(e: MessageEvent) {
      if (e.source !== iframe.contentWindow) return;
      if (e.data?.type === "done") {
        clearTimeout(timer);
        window.removeEventListener("message", handleMessage);
        resolve({ output: e.data.output ?? [], error: e.data.error ?? null });
      }
    }

    const timer = setTimeout(() => {
      window.removeEventListener("message", handleMessage);
      resolve({ output: [], error: "Code took too long to run (possible infinite loop)" });
    }, timeout);

    window.addEventListener("message", handleMessage);
    iframe.contentWindow?.postMessage({ type: "execute", code }, "*");
  });
}
