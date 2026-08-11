import type { PracticeQuestionSeed } from "@/types/practice";

export const asyncQuestions: PracticeQuestionSeed[] = [
  {
    id: "async-log-order",
    slug: "predict-the-log-order",
    title: "Predict the log order",
    topics: ["async", "event loop", "timers"],
    relatedModule: "js-fetch",
    step: {
      id: "async-log-order",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Predict the log order",
        body: "<p>Four logs, only one of which is inside a callback. Work out the order the browser prints them in.</p><p>The trick is to separate what runs <em>now</em> from what is queued for <em>later</em> — and to notice that not everything queued is queued in the same place.</p>",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The event loop drains all pending <strong>microtasks</strong> (promise callbacks) before it takes the next <strong>macrotask</strong> (a <code>setTimeout</code> callback). That is why a resolved promise always beats <code>setTimeout(..., 0)</code>, no matter which was scheduled first.",
          },
        ],
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          'console.log("A");\nsetTimeout(() => console.log("B"), 0);\nPromise.resolve().then(() => console.log("C"));\nconsole.log("D");',
        codeLanguage: "javascript",
        options: [
          {
            id: "adcb",
            text: "<code>A D C B</code>",
            correct: true,
            explanation:
              "Correct. <code>A</code> and <code>D</code> are plain synchronous statements, so they run first in source order. Then the current task ends and the engine drains the microtask queue, which holds the promise callback <code>C</code>. Only then does it take a macrotask, giving <code>B</code>. The <code>0</code> in <code>setTimeout</code> means \"as soon as possible\", never \"immediately\".",
          },
          {
            id: "abcd",
            text: "<code>A B C D</code>",
            correct: false,
            explanation:
              "This reads the file top to bottom and ignores asynchrony altogether. <code>D</code> is synchronous, so it cannot possibly wait behind two callbacks.",
          },
          {
            id: "adbc",
            text: "<code>A D B C</code>",
            correct: false,
            explanation:
              "The synchronous half is right, but this assumes the callbacks run in the order they were scheduled. Microtasks are a separate, higher-priority queue, so the promise jumps ahead of the timer.",
          },
          {
            id: "acdb",
            text: "<code>A C D B</code>",
            correct: false,
            explanation:
              "This runs the promise callback too early. <code>.then</code> always defers — even on an already-resolved promise — so <code>D</code> finishes first.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Which two lines are not callbacks at all? Those run first, in order.",
        "Between a promise callback and a <code>setTimeout</code> callback, one queue has priority.",
      ],
    },
  },

  {
    id: "async-forgotten-await",
    slug: "why-did-i-get-a-promise",
    title: "Debug: why did I get a Promise instead of data?",
    topics: ["async", "promises", "debugging"],
    relatedModule: "js-fetch",
    step: {
      id: "async-forgotten-await",
      type: "quiz",
      difficulty: "easy",
      instruction: {
        heading: "Debug: why did I get a Promise instead of data?",
        body: "<p>The log shows <code>Promise { &lt;pending&gt; }</code> rather than the user object.</p><p>Look at what the function returns versus what the caller does with it.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          'async function getUser() {\n  const response = await fetch("/api/user");\n  return response.json();\n}\n\nconst user = getUser();\nconsole.log(user); // Promise { <pending> }',
        codeLanguage: "javascript",
        options: [
          {
            id: "missing-await",
            text: "<code>getUser()</code> was not awaited — an <code>async</code> function always returns a promise",
            correct: true,
            explanation:
              "Correct. Marking a function <code>async</code> means its return value is wrapped in a promise, whatever you write inside. The <code>await</code> inside <code>getUser</code> only unwraps <code>fetch</code> for the code in that function — the caller still receives a promise and must <code>await</code> it too, or use <code>.then()</code>.",
          },
          {
            id: "json-missing-await",
            text: "<code>response.json()</code> needed an <code>await</code>",
            correct: false,
            explanation:
              "Worth spotting that <code>json()</code> is async — but <code>return</code>ing a promise from an async function is fine, since it gets flattened automatically. Adding <code>await</code> there is harmless and changes nothing about what the caller sees.",
          },
          {
            id: "fetch-failed",
            text: "The fetch failed, so the promise never resolved",
            correct: false,
            explanation:
              "A failed fetch would give a rejection or an error, not a pending promise logged synchronously. The log happens immediately, before any network work could finish.",
          },
          {
            id: "needs-then",
            text: "You cannot use <code>await</code> here; only <code>.then()</code> works at the top level",
            correct: false,
            explanation:
              "Both work. Top-level <code>await</code> is available in ES modules, and inside a non-module you can wrap the call in an <code>async</code> function. Either way, the caller has to unwrap the promise somehow.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "What does <em>any</em> <code>async</code> function return, regardless of its body?",
        "The <code>await</code> inside only helps the code inside.",
      ],
    },
  },

  {
    id: "async-sequential-vs-parallel",
    slug: "why-is-this-fetch-loop-slow",
    title: "Why does this take 3 seconds instead of 1?",
    topics: ["async", "promises", "performance"],
    relatedModule: "js-fetch",
    step: {
      id: "async-sequential-vs-parallel",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "Why does this take 3 seconds instead of 1?",
        body: "<p>Three independent requests, each taking about one second. The loop takes three seconds total.</p><p>The requests do not depend on each other, so they could overlap. <strong>Select every change that would genuinely make them run concurrently.</strong></p>",
      },
      config: {
        type: "quiz",
        mode: "multiple",
        codeSnippet:
          "const results = [];\nfor (const id of [1, 2, 3]) {\n  results.push(await fetchUser(id));\n}",
        codeLanguage: "javascript",
        options: [
          {
            id: "promise-all",
            text: "<code>const results = await Promise.all([1,2,3].map(fetchUser));</code>",
            correct: true,
            explanation:
              "This is the standard fix. <code>map</code> starts all three requests immediately — calling an async function begins its work — and <code>Promise.all</code> waits for the whole set. Total time becomes the slowest request rather than the sum, and the results stay in input order.",
          },
          {
            id: "start-then-await",
            text: "Start every request first, collect the promises, then <code>await</code> them in a second loop",
            correct: true,
            explanation:
              "This works, and it is worth understanding because it shows <em>why</em> <code>Promise.all</code> works. The expensive part is starting the request; once all three are in flight, awaiting them one by one costs nothing extra. <code>Promise.all</code> is just a tidier spelling of this.",
          },
          {
            id: "for-each",
            text: "Swap the <code>for...of</code> for <code>forEach</code> with an <code>async</code> callback",
            correct: false,
            explanation:
              "This appears to work and is a genuine trap. The requests do start concurrently, but <code>forEach</code> ignores the returned promises entirely — so execution continues immediately and <code>results</code> is still empty when you read it. Faster and wrong is worse than slow and right.",
          },
          {
            id: "remove-await",
            text: "Just drop the <code>await</code> inside the loop",
            correct: false,
            explanation:
              "The requests would overlap, but <code>results</code> would fill with pending promises instead of users. You have to await them somewhere — the question is only whether you do it before or after starting them all.",
          },
        ],
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "<code>await</code> inside a loop pauses the loop. Ask when each request actually <em>starts</em>.",
        "Two of these four genuinely work. One of the wrong ones looks right but silently loses the results.",
      ],
    },
  },

  {
    id: "async-delay",
    slug: "write-a-delay-function",
    title: "Write a delay function",
    topics: ["async", "promises"],
    relatedModule: "js-fetch",
    step: {
      id: "async-delay",
      type: "code-challenge",
      difficulty: "intermediate",
      instruction: {
        heading: "Write a delay function",
        body: "<p>Write <code>delay(ms, value)</code> that returns a promise resolving to <code>value</code> after <code>ms</code> milliseconds.</p><p><code>setTimeout</code> is callback-based and predates promises, so this is the small adapter that bridges the two worlds. Once you can write it, you can wrap any callback API the same way.</p><p>The thing to work out: <code>setTimeout</code> gives you no way to \"return\" anything. So how does the value get out?</p>",
        analogy:
          "Leaving a note with a courier. You hand over the message now; the courier delivers it later. The promise is the receipt that lets the caller wait for delivery.",
        docLinks: [
          {
            label: "MDN: Promise constructor",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise",
            type: "js-concept",
          },
          {
            label: "MDN: setTimeout()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — resolve is how the value escapes",
            body: "The function you pass to <code>new Promise</code> receives <code>resolve</code>. Calling it later — from inside the timer callback — is what settles the promise. The <code>return</code> of the timer callback goes nowhere.",
          },
        ],
      },
      config: {
        type: "code-challenge",
        functionName: "delay",
        language: "javascript",
        starterCode:
          "function delay(ms, value) {\n  // Return a promise that resolves to `value` after `ms`.\n}\n",
        tests: [
          { name: "resolves to the value", expression: "return await delay(10, 'done');", expected: "done" },
          { name: "returns a promise", expression: "return delay(1, 1) instanceof Promise;", expected: true },
          { name: "works with no value", expression: "return await delay(5);", expected: undefined },
          { name: "resolves numbers too", expression: "return await delay(5, 42);", expected: 42 },
          {
            name: "actually waits before resolving",
            expression: "let done = false; const p = delay(30).then(() => { done = true; }); const during = done; await p; return [during, done];",
            expected: [false, true],
          },
        ],
        solution:
          "function delay(ms, value) {\n  return new Promise((resolve) => {\n    setTimeout(() => resolve(value), ms);\n  });\n}\n",
      },
      validation: { type: "tests-pass", criteria: {} },
      hints: [
        "Start with <code>return new Promise((resolve) =&gt; { ... });</code>",
        "Inside, schedule the resolve: <code>setTimeout(() =&gt; resolve(value), ms);</code>",
        "Do not <code>return</code> from inside the timer callback — nothing reads that return value. Call <code>resolve</code> instead.",
      ],
    },
  },

  {
    id: "async-retry",
    slug: "retry-a-failing-operation",
    title: "Retry a failing operation",
    topics: ["async", "promises", "error handling"],
    relatedModule: "js-fetch",
    step: {
      id: "async-retry",
      type: "code-challenge",
      difficulty: "advanced",
      instruction: {
        heading: "Retry a failing operation",
        body: "<p>Write <code>retry(fn, attempts)</code>. It calls the async function <code>fn</code>, and if it rejects, tries again — up to <code>attempts</code> times in total. If the last attempt still fails, the error must propagate to the caller.</p><p>Two decisions to make before writing code. First, <code>attempts</code> is a <em>total</em>, not a number of retries — so <code>attempts: 3</code> means at most three calls, not four. Second, when every attempt fails, the caller needs to see the real error, not a generic one you invented.</p><p>Think about how you hold on to the last error while still looping.</p>",
        analogy:
          "Redialling a busy number. You try a fixed number of times, and if it never connects you report the actual engaged tone — not \"something went wrong\".",
        docLinks: [
          {
            label: "MDN: try...catch",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch",
            type: "js-concept",
          },
          {
            label: "MDN: async function",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — rethrow, do not wrap",
            body: "Catching an error and throwing <code>new Error(\"failed\")</code> destroys the diagnosis. Keep the original in a variable and <code>throw</code> it after the loop, so the caller sees what actually went wrong.",
          },
        ],
      },
      config: {
        type: "code-challenge",
        functionName: "retry",
        language: "javascript",
        starterCode:
          "async function retry(fn, attempts) {\n  // Try fn() up to `attempts` times.\n  // Return the first success; if none succeed, throw the last error.\n}\n",
        tests: [
          {
            name: "returns the value when it succeeds first time",
            expression: "return await retry(async () => 'ok', 3);",
            expected: "ok",
          },
          {
            name: "calls fn only once on success",
            expression: "let calls = 0; await retry(async () => { calls++; return 1; }, 3); return calls;",
            expected: 1,
          },
          {
            name: "retries until it succeeds",
            expression:
              "let calls = 0; const value = await retry(async () => { calls++; if (calls < 3) throw new Error('nope'); return 'ok'; }, 5); return [value, calls];",
            expected: ["ok", 3],
          },
          {
            name: "stops after the given number of attempts",
            expression:
              "let calls = 0; try { await retry(async () => { calls++; throw new Error('always'); }, 3); } catch {} return calls;",
            expected: 3,
          },
          {
            name: "throws the original error when all attempts fail",
            expression:
              "try { await retry(async () => { throw new Error('real reason'); }, 2); return 'did not throw'; } catch (err) { return err.message; }",
            expected: "real reason",
          },
        ],
        solution:
          "async function retry(fn, attempts) {\n  let lastError;\n  for (let i = 0; i < attempts; i++) {\n    try {\n      return await fn();\n    } catch (err) {\n      lastError = err;\n    }\n  }\n  throw lastError;\n}\n",
      },
      validation: { type: "tests-pass", criteria: {} },
      hints: [
        "Loop <code>attempts</code> times. Inside the loop, <code>try { return await fn(); }</code> — a success returns immediately and ends everything.",
        "In the <code>catch</code>, do not rethrow yet — store the error and let the loop continue.",
        "After the loop, <code>throw lastError;</code> so the caller sees the genuine failure.",
      ],
    },
  },

  {
    id: "async-await-in-foreach",
    slug: "why-is-this-array-empty",
    title: "Debug: why is the array empty after the loop?",
    topics: ["async", "arrays", "debugging"],
    relatedModule: "js-fetch",
    step: {
      id: "async-await-in-foreach",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "Debug: why is the array empty after the loop?",
        body: "<p>The <code>await</code> is right there inside the callback, and yet the log shows an empty array.</p><p>Ask what <code>forEach</code> does with the value its callback returns.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          'const names = [];\n\n[1, 2, 3].forEach(async (id) => {\n  const user = await getUser(id);\n  names.push(user.name);\n});\n\nconsole.log(names); // []',
        codeLanguage: "javascript",
        options: [
          {
            id: "foreach-ignores-promise",
            text: "<code>forEach</code> ignores the promise its callback returns, so it finishes before any <code>await</code> resolves",
            correct: true,
            explanation:
              "Correct. An <code>async</code> callback returns a promise, and <code>forEach</code> simply discards it — there is no mechanism for it to wait. All three callbacks start, hit their <code>await</code>, and return pending promises; <code>forEach</code> then returns and the log runs with the array still empty. Use <code>for...of</code> (sequential) or <code>Promise.all(map(...))</code> (concurrent).",
          },
          {
            id: "push-async",
            text: "<code>push</code> is asynchronous, so the writes have not landed yet",
            correct: false,
            explanation:
              "<code>push</code> is entirely synchronous. It just has not been <em>reached</em> yet — each callback is still suspended at its <code>await</code>.",
          },
          {
            id: "closure",
            text: "The callback closes over a stale copy of <code>names</code>",
            correct: false,
            explanation:
              "There is only one array and the closure sees it correctly. Log it a second later and the names are there — proof the pushes do happen, just after the log.",
          },
          {
            id: "needs-async-outer",
            text: "The outer scope needs to be <code>async</code> for the awaits to work",
            correct: false,
            explanation:
              "The awaits do work — they are inside an <code>async</code> callback, which is legal. Marking the outer scope <code>async</code> changes nothing, because there is still no promise to await.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "The callback is <code>async</code>, so it returns a promise. Who receives that promise?",
        "Would the same code with <code>for...of</code> behave differently?",
      ],
    },
  },
];
