import type { PracticeQuestionSeed } from "@/types/practice";

export const functionQuestions: PracticeQuestionSeed[] = [
  {
    id: "functions-no-return",
    slug: "what-does-a-function-with-no-return-give-back",
    title: "What comes back when there is no return?",
    topics: ["functions", "return values"],
    relatedModule: "js-functions",
    step: {
      id: "functions-no-return",
      type: "quiz",
      difficulty: "easy",
      instruction: {
        heading: "What comes back when there is no return?",
        body: "<p>Someone calls <code>greet(\"Ada\")</code> and stores the result. What ends up in <code>message</code>?</p><p>Read what the function <em>does</em> versus what it <em>gives back</em> — they are not the same thing, and separating them is one of the most useful habits you can build early.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          'function greet(name) {\n  console.log("Hello, " + name);\n}\n\nconst message = greet("Ada");',
        codeLanguage: "javascript",
        options: [
          {
            id: "undefined",
            text: "<code>undefined</code>",
            correct: true,
            explanation:
              "Correct. A function with no <code>return</code> hands back <code>undefined</code>. The greeting was <em>printed</em>, not <em>returned</em> — and printing is a side effect, not a result. This is the single most common cause of a mysterious <code>undefined</code> in beginner code.",
          },
          {
            id: "string",
            text: '<code>"Hello, Ada"</code>',
            correct: false,
            explanation:
              "That string went to the console, not to the caller. <code>console.log</code> displays a value and itself returns <code>undefined</code> — it never feeds the result back into your program.",
          },
          {
            id: "null",
            text: "<code>null</code>",
            correct: false,
            explanation:
              "<code>null</code> is a value <em>you</em> choose to represent \"deliberately empty\". JavaScript never picks it for you — the absence of a return gives <code>undefined</code>.",
          },
          {
            id: "error",
            text: "A TypeError, because nothing was returned",
            correct: false,
            explanation:
              "No error. Returning nothing is completely legal — plenty of functions exist purely for their side effects. That silence is exactly what makes this bug slippery.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "There is no <code>return</code> anywhere in the function body.",
        "Ask what the function <em>gives back</em>, not what it <em>displays</em>.",
      ],
    },
  },

  {
    id: "functions-once",
    slug: "write-once",
    title: "Write once(fn)",
    topics: ["functions", "closures", "higher-order"],
    relatedModule: "js-functions",
    step: {
      id: "functions-once",
      type: "code-challenge",
      difficulty: "intermediate",
      instruction: {
        heading: "Write once(fn)",
        body: "<p>Write <code>once(fn)</code>. It takes a function and returns a <strong>new</strong> function that will call <code>fn</code> at most one time. Every call after the first returns the value from that first call, without running <code>fn</code> again.</p><p>This is a real pattern — it is how you make an \"initialise\" or \"submit order\" routine safe against a double click.</p><p>The problem to solve: the returned function needs to remember two things <em>between</em> calls, and that memory must not be shared with any other function <code>once</code> produces. Where can a variable live so that it survives between calls but stays private to this one wrapper?</p>",
        analogy:
          "A vending machine that has taken your coin. Press the button as many times as you like — you get the one drink you paid for, not a new one each press.",
        docLinks: [
          {
            label: "MDN: Closures",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — remember that it ran, separately from what it returned",
            body: "Tracking only the saved result is not enough: a function that legitimately returns <code>undefined</code> or <code>0</code> would look like it never ran. Keep a separate boolean flag and you sidestep the whole problem.",
          },
        ],
      },
      config: {
        type: "code-challenge",
        functionName: "once",
        language: "javascript",
        starterCode:
          "function once(fn) {\n  // Declare the memory here, outside the returned function,\n  // so it survives between calls.\n  return function (...args) {\n    // Call fn the first time; reuse the result after that.\n  };\n}\n",
        tests: [
          {
            name: "returns fn's value on the first call",
            expression: "const f = once(() => 42); return f();",
            expected: 42,
          },
          {
            name: "only ever runs fn once",
            expression: "let calls = 0; const f = once(() => { calls++; return calls; }); f(); f(); f(); return calls;",
            expected: 1,
          },
          {
            name: "later calls reuse the first result",
            expression: "let n = 0; const f = once(() => ++n); return [f(), f(), f()];",
            expected: [1, 1, 1],
          },
          {
            name: "passes arguments through on the first call",
            expression: "const f = once((a, b) => a + b); return f(2, 3);",
            expected: 5,
          },
          {
            name: "each wrapper has its own memory",
            expression: "const a = once(() => 'a'); const b = once(() => 'b'); a(); return b();",
            expected: "b",
          },
          {
            name: "works even when fn returns undefined",
            expression: "let calls = 0; const f = once(() => { calls++; }); f(); f(); return calls;",
            expected: 1,
          },
        ],
        solution:
          "function once(fn) {\n  let called = false;\n  let result;\n  return function (...args) {\n    if (!called) {\n      called = true;\n      result = fn(...args);\n    }\n    return result;\n  };\n}\n",
      },
      validation: { type: "tests-pass", criteria: {} },
      hints: [
        "Declare <code>let called = false;</code> and <code>let result;</code> <em>inside</em> <code>once</code> but <em>outside</em> the function you return. That is the closure.",
        "<code>if (!called) { called = true; result = fn(...args); }</code>",
        "Then <code>return result;</code> on every call — the flag, not the value, is what decides whether to run <code>fn</code>.",
      ],
    },
  },

  {
    id: "functions-closure-loop",
    slug: "var-vs-let-in-a-loop",
    title: "Debug: why does this log 3, 3, 3?",
    topics: ["functions", "closures", "scope", "debugging"],
    relatedModule: "modern-js",
    step: {
      id: "functions-closure-loop",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "Debug: why does this log 3, 3, 3?",
        body: "<p>This loop is supposed to log <code>0</code>, <code>1</code>, <code>2</code>. It logs <code>3</code>, <code>3</code>, <code>3</code>.</p><p>You have already identified <em>what</em> is wrong. The question is <strong>why</strong> — and picking the right explanation is what tells you which fixes will actually work. Several of the options below describe real JavaScript behaviour; only one explains this bug.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}\n// logs: 3, 3, 3",
        codeLanguage: "javascript",
        options: [
          {
            id: "shared-binding",
            text: "<code>var</code> creates <strong>one</strong> variable for the whole loop, so all three callbacks close over that same <code>i</code> — which is <code>3</code> by the time they run",
            correct: true,
            explanation:
              "Correct, and it explains both halves. <code>var</code> is function-scoped, so there is exactly one <code>i</code>; the callbacks all capture that one binding, not its value at the time. The loop finishes (leaving <code>i === 3</code>) before any timer fires. Swapping in <code>let</code> fixes it because <code>let</code> creates a <em>fresh</em> binding per iteration — which is also why the same loop with <code>let</code> logs 0, 1, 2 with no other change.",
          },
          {
            id: "async",
            text: "<code>setTimeout</code> is asynchronous, so the callbacks run after the loop finishes",
            correct: false,
            explanation:
              "True, and necessary — but not sufficient. Timing is only half the story: change <code>var</code> to <code>let</code> and the callbacks still run after the loop, yet now they log 0, 1, 2. So asynchrony alone cannot be the cause; the <em>shared binding</em> is.",
          },
          {
            id: "hoisting",
            text: "<code>var</code> is hoisted, so <code>i</code> is <code>undefined</code> when the arrow functions are created",
            correct: false,
            explanation:
              "Hoisting is real, but it is not what bites here — and if it were, you would see <code>undefined</code> logged, not <code>3</code>. By the time the callbacks run, <code>i</code> has been assigned many times over.",
          },
          {
            id: "arrow-this",
            text: "Arrow functions do not have their own scope, so they cannot capture <code>i</code>",
            correct: false,
            explanation:
              "Arrow functions do create a scope; what they lack is their own <code>this</code>. And capturing is exactly what happens here — the trouble is that all three captured the <em>same</em> binding. Replacing the arrow with <code>function () {}</code> changes nothing.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Try the thought experiment: change <code>var</code> to <code>let</code>. It logs 0, 1, 2. What differs — the timing, or the variable?",
        "Ask how many separate <code>i</code> variables exist across the whole loop.",
      ],
    },
  },
];
