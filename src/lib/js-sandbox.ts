export interface ConsoleEntry {
  type: "log" | "warn" | "error" | "info";
  args: string[];
  timestamp: number;
}

export interface SandboxResult {
  output: ConsoleEntry[];
  error: string | null;
}

export interface TestResult {
  name: string;
  passed: boolean;
  /** Formatted args, or the raw expression / assert source. */
  input: string;
  expected: string;
  actual: string;
  error: string | null;
  hidden: boolean;
}

export interface TestRunResult {
  results: TestResult[];
  /** Syntax error, missing function, or a failed React CDN load. Blocks all tests. */
  compileError: string | null;
  logs: ConsoleEntry[];
  timedOut: boolean;
}

export interface SandboxTestSpec {
  name: string;
  args?: unknown[];
  expression?: string;
  expected: unknown;
  hidden?: boolean;
  render?: { props?: Record<string, unknown>; assert: string };
}

/**
 * Source for the code that runs INSIDE the sandbox iframe.
 *
 * This is a JS source string embedded in a template literal, so:
 *   - never write a backtick or a `${` in here
 *   - a newline escape inside a sandbox string literal must be written \\n
 *   - close any script tag as <\/script>
 */
const HARNESS = `
const __output = [];
let __suppressStream = false;

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
    if (!__suppressStream) parent.postMessage({ type: "console", entry }, "*");
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

/* ---------------- test harness ---------------- */

/* Realm-safe type tag. instanceof would silently fail across realms and make
   two different Sets compare equal via the plain-object fallback. */
function __tag(v) { return Object.prototype.toString.call(v).slice(8, -1); }

function __fmt(v, d) {
  d = d || 0;
  if (v === undefined) return "undefined";
  if (v === null) return "null";
  var t = typeof v;
  if (t === "number" || t === "boolean" || t === "bigint" || t === "symbol") return String(v);
  if (t === "string") return JSON.stringify(v);
  if (t === "function") return "[Function " + (v.name || "anonymous") + "]";
  if (d > 3) return "...";
  var tag = __tag(v);
  if (tag === "Array") return "[" + v.map(function (x) { return __fmt(x, d + 1); }).join(", ") + "]";
  if (tag === "Date") return "Date(" + v.toISOString() + ")";
  if (tag === "Error") return v.name + ": " + v.message;
  if (tag === "Map") return "Map(" + Array.from(v).map(function (e) { return __fmt(e[0], d + 1) + " => " + __fmt(e[1], d + 1); }).join(", ") + ")";
  if (tag === "Set") return "Set(" + Array.from(v).map(function (x) { return __fmt(x, d + 1); }).join(", ") + ")";
  if (typeof v.nodeName === "string" && typeof v.nodeType === "number") return "<" + v.nodeName.toLowerCase() + ">";
  try {
    return "{ " + Object.keys(v).map(function (k) { return k + ": " + __fmt(v[k], d + 1); }).join(", ") + " }";
  } catch (e) { return String(v); }
}

function __eq(a, b, d) {
  d = d || 0;
  if (d > 20) return false;
  /* NaN equals NaN and +0 equals -0 — Object.is would say otherwise, which
     surprises learners more than it helps them. */
  if (a === b) return true;
  if (a !== a && b !== b) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null || typeof a !== "object") return false;

  var ta = __tag(a), tb = __tag(b);
  if (ta !== tb) return false;

  if (ta === "Date") return a.getTime() === b.getTime();
  if (ta === "RegExp") return String(a) === String(b);
  if (ta === "Array") {
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) if (!__eq(a[i], b[i], d + 1)) return false;
    return true;
  }
  if (ta === "Map") {
    if (a.size !== b.size) return false;
    for (var me of a) { if (!b.has(me[0]) || !__eq(b.get(me[0]), me[1], d + 1)) return false; }
    return true;
  }
  if (ta === "Set") {
    if (a.size !== b.size) return false;
    for (var sv of a) { if (!b.has(sv)) return false; }
    return true;
  }

  var ka = Object.keys(a), kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  for (var k of ka) {
    if (!Object.prototype.hasOwnProperty.call(b, k)) return false;
    if (!__eq(a[k], b[k], d + 1)) return false;
  }
  return true;
}

function __macrotask() { return new Promise(function (r) { setTimeout(r, 0); }); }

/* Timers, not rAF — rAF is throttled or skipped in a hidden iframe. */
async function __settle() { await __macrotask(); await __macrotask(); }

var __AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

function __errMsg(err) { return err && err.message ? err.message : String(err); }

function __friendlyCompileError(msg) {
  if (/\\bexport\\b|\\bimport\\b/.test(msg)) {
    return "Remove the export/import keywords — this editor runs a single plain script.";
  }
  return "Your code has a syntax error: " + msg;
}

function __missingFnMessage(fnName) {
  return 'Define a function named "' + fnName + '". The tests call ' + fnName + '(...) — the name must match exactly.';
}

function __withTimeout(promise, ms, message) {
  var timer;
  var guard = new Promise(function (_, reject) {
    timer = setTimeout(function () { reject(new Error(message)); }, ms);
  });
  return Promise.race([promise, guard]).finally(function () { clearTimeout(timer); });
}

async function __runTests(code, fnName, tests, perTestTimeout) {
  try {
    var probe = new Function("return (async () => {\\n" + code + "\\n; return typeof " + fnName + " === 'function' ? " + fnName + " : undefined;\\n})()");
    var maybeFn = await probe();
    if (typeof maybeFn !== "function") {
      return { results: [], compileError: __missingFnMessage(fnName) };
    }
  } catch (err) {
    return { results: [], compileError: __friendlyCompileError(__errMsg(err)) };
  }

  var results = [];
  for (var i = 0; i < tests.length; i++) {
    var t = tests[i];
    var body = t.expression ? t.expression : "return " + fnName + ".apply(null, __args);";
    var input = t.expression
      ? t.expression
      : fnName + "(" + (t.args || []).map(function (a) { return __fmt(a); }).join(", ") + ")";
    var row = {
      name: t.name, passed: false, input: input,
      expected: __fmt(t.expected), actual: "", error: null, hidden: !!t.hidden
    };

    try {
      /* Re-evaluate the student's code per test, so a mutation in one cannot
         corrupt the next. */
      var runner = new Function("__args", "return (async () => {\\n" + code + "\\n;\\n" + body + "\\n})()");
      var value = await __withTimeout(
        Promise.resolve(runner(t.args || [])),
        perTestTimeout,
        "Test timed out — did you await something that never resolves?"
      );
      row.actual = __fmt(value);
      row.passed = __eq(value, t.expected);
    } catch (err) {
      row.error = __errMsg(err);
      row.actual = "(threw)";
    }
    results.push(row);
  }
  return { results: results, compileError: null };
}

async function __runReactTests(code, compName, tests, perTestTimeout) {
  if (!window.React || !window.ReactDOM || !window.Babel) {
    return { results: [], compileError: "Could not load React from unpkg — check your connection and click Run Tests again." };
  }

  var transpiled;
  try {
    transpiled = window.Babel.transform(code, { presets: ["react"] }).code;
  } catch (err) {
    return { results: [], compileError: "JSX error: " + __errMsg(err) };
  }

  var Component;
  try {
    var probe = new Function("React", "return (() => {\\n" + transpiled + "\\n; return typeof " + compName + " === 'function' ? " + compName + " : undefined;\\n})()");
    Component = probe(window.React);
  } catch (err) {
    return { results: [], compileError: "Your code has an error: " + __errMsg(err) };
  }

  if (typeof Component !== "function") {
    var lower = compName.charAt(0).toLowerCase() + compName.slice(1);
    if (new RegExp("(function|const|let|var)\\\\s+" + lower + "\\\\b").test(code)) {
      return { results: [], compileError: "React treats lowercase names as HTML tags — your component must start with a capital letter. Rename " + lower + " to " + compName + "." };
    }
    return { results: [], compileError: 'Define a component named "' + compName + '". The tests render <' + compName + ' />.' };
  }

  var results = [];
  for (var i = 0; i < tests.length; i++) {
    var t = tests[i];
    var spec = t.render || { props: {}, assert: "return container.textContent;" };
    var row = {
      name: t.name, passed: false,
      input: "<" + compName + " " + __fmt(spec.props || {}) + " />",
      expected: __fmt(t.expected), actual: "", error: null, hidden: !!t.hidden
    };

    var container = document.createElement("div");
    document.body.appendChild(container);
    var root = null;

    try {
      root = window.ReactDOM.createRoot(container);
      var assertFn = new __AsyncFunction("container", "tick", "React", spec.assert);
      var value = await __withTimeout((async function () {
        root.render(window.React.createElement(Component, spec.props || {}));
        await __settle();
        return await assertFn(container, __settle, window.React);
      })(), perTestTimeout, "Test timed out — did you await something that never resolves?");
      row.actual = __fmt(value);
      row.passed = __eq(value, t.expected);
    } catch (err) {
      row.error = __errMsg(err);
      row.actual = "(threw)";
    } finally {
      try { if (root) root.unmount(); } catch (e) {}
      try { container.remove(); } catch (e) {}
    }
    results.push(row);
  }
  return { results: results, compileError: null };
}

window.addEventListener("message", async (e) => {
  if (e.data?.type !== "run-tests") return;
  __output.length = 0;
  __suppressStream = true;
  var payload;
  try {
    payload = e.data.mode === "react"
      ? await __runReactTests(e.data.code, e.data.functionName, e.data.tests || [], e.data.perTestTimeout || 2000)
      : await __runTests(e.data.code, e.data.functionName, e.data.tests || [], e.data.perTestTimeout || 2000);
  } catch (err) {
    payload = { results: [], compileError: __errMsg(err) };
  }
  __suppressStream = false;
  parent.postMessage({
    type: "tests-done",
    runId: e.data.runId,
    results: payload.results,
    compileError: payload.compileError,
    logs: __output.slice(0, 200)
  }, "*");
});

function __announceReady() {
  parent.postMessage({
    type: "sandbox-ready",
    hasReact: !!(window.React && window.ReactDOM && window.Babel)
  }, "*");
}

if (document.readyState === "complete") __announceReady();
else window.addEventListener("load", __announceReady);
`;

const SANDBOX_HTML =
  `<!DOCTYPE html><html><head><script>` + HARNESS + `<\/script></head><body></body></html>`;

/**
 * React 18 UMD, matching what src/content/react-fundamentals/ already teaches.
 * Babel MUST stay pinned to @7 — Babel 8 blanks the preview.
 * React 19 dropped UMD builds, which is why this is 18 while the app runs 19.
 */
const REACT_CDN_SCRIPTS =
  `<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"><\/script>` +
  `<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"><\/script>` +
  `<script src="https://unpkg.com/@babel/standalone@7/babel.min.js"><\/script>`;

const REACT_SANDBOX_HTML =
  `<!DOCTYPE html><html><head>` + REACT_CDN_SCRIPTS + `<script>` + HARNESS +
  `<\/script></head><body></body></html>`;

export function createSandboxSrcdoc(): string {
  return SANDBOX_HTML;
}

export function createReactSandboxSrcdoc(): string {
  return REACT_SANDBOX_HTML;
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

let runCounter = 0;

export function runTestsInSandbox(
  iframe: HTMLIFrameElement,
  code: string,
  functionName: string,
  tests: SandboxTestSpec[],
  timeout = 5000,
  mode: "js" | "react" = "js"
): Promise<TestRunResult> {
  runCounter += 1;
  const runId = "run-" + runCounter;

  return new Promise((resolve) => {
    function handleMessage(e: MessageEvent) {
      if (e.source !== iframe.contentWindow) return;
      if (e.data?.type !== "tests-done") return;
      // Ignore a stale run's reply.
      if (e.data.runId !== runId) return;
      clearTimeout(timer);
      window.removeEventListener("message", handleMessage);
      resolve({
        results: e.data.results ?? [],
        compileError: e.data.compileError ?? null,
        logs: e.data.logs ?? [],
        timedOut: false,
      });
    }

    const timer = setTimeout(() => {
      window.removeEventListener("message", handleMessage);
      resolve({
        results: [],
        compileError: "Your code took too long to run — check for an infinite loop.",
        logs: [],
        timedOut: true,
      });
    }, timeout);

    window.addEventListener("message", handleMessage);
    iframe.contentWindow?.postMessage(
      {
        type: "run-tests",
        runId,
        code,
        functionName,
        tests,
        mode,
        perTestTimeout: Math.max(1000, Math.floor(timeout / 2)),
      },
      "*"
    );
  });
}
