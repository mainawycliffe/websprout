import type { PracticeQuestionSeed } from "@/types/practice";

export const scopeQuestions: PracticeQuestionSeed[] = [
  {
    id: "scope-tdz",
    slug: "let-before-declaration",
    title: "Debug: ReferenceError on a variable that exists",
    topics: ["scope", "hoisting", "debugging"],
    relatedModule: "modern-js",
    step: {
      id: "scope-tdz",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Debug: ReferenceError on a variable that exists",
        body: "<p>The variable is declared two lines below where it is read. With <code>var</code> this would log <code>undefined</code>; with <code>let</code> it throws.</p><p>Work out what is different about <code>let</code> — the answer is not \"it isn't hoisted\".</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          'console.log(count); // ReferenceError\nlet count = 1;',
        codeLanguage: "javascript",
        options: [
          {
            id: "tdz",
            text: "<code>let</code> <em>is</em> hoisted, but sits in a temporal dead zone until the declaration runs, and reading it there throws",
            correct: true,
            explanation:
              "Correct, and the distinction matters. The binding is created when the block is entered — which is why it shadows any outer <code>count</code> from the very top — but it is uninitialised until execution reaches <code>let count = 1</code>. Reading it in that window is the temporal dead zone, and it throws deliberately, turning a silent <code>undefined</code> bug into a loud error.",
          },
          {
            id: "not-hoisted",
            text: "<code>let</code> is not hoisted at all, so the variable does not exist yet",
            correct: false,
            explanation:
              "This is the common shorthand, and it is close enough to predict the error — but it mispredicts shadowing. If <code>let</code> truly did not exist yet, an outer <code>count</code> would be found instead of throwing. The binding exists; it is just unusable.",
          },
          {
            id: "const-only",
            text: "Only <code>const</code> behaves this way; <code>let</code> should log <code>undefined</code>",
            correct: false,
            explanation:
              "<code>let</code> and <code>const</code> share the temporal dead zone exactly. <code>undefined</code>-before-declaration is <code>var</code>'s behaviour, and it is the thing the TDZ was designed to stop.",
          },
          {
            id: "strict-mode",
            text: "This only happens in strict mode",
            correct: false,
            explanation:
              "The TDZ applies everywhere <code>let</code> and <code>const</code> are legal, strict mode or not. It is a property of the declaration, not of the mode.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "If the binding genuinely did not exist yet, what would JavaScript do instead of throwing?",
        "There is a name for the window between entering the block and reaching the declaration.",
      ],
    },
  },

  {
    id: "scope-shadowing",
    slug: "which-variable-wins",
    title: "Which variable does this log?",
    topics: ["scope", "shadowing"],
    relatedModule: "js-functions",
    step: {
      id: "scope-shadowing",
      type: "quiz",
      difficulty: "easy",
      instruction: {
        heading: "Which variable does this log?",
        body: "<p>Two variables share a name at different levels. Trace which one each log sees.</p><p>The rule is simple once stated, and it is the whole basis of how scope chains work.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          'const name = "outer";\n\nfunction show() {\n  const name = "inner";\n  console.log(name);\n}\n\nshow();\nconsole.log(name);',
        codeLanguage: "javascript",
        options: [
          {
            id: "inner-outer",
            text: "<code>inner</code>, then <code>outer</code>",
            correct: true,
            explanation:
              "Correct. Inside <code>show</code> the local <code>name</code> shadows the outer one — lookup always starts in the current scope and only walks outward if the name is not found. The outer variable is untouched, so the second log still sees <code>outer</code>. Shadowing hides, it does not overwrite.",
          },
          {
            id: "inner-inner",
            text: "<code>inner</code>, then <code>inner</code>",
            correct: false,
            explanation:
              "That would require the inner declaration to have reassigned the outer variable. It did not — <code>const name</code> inside the function creates a brand-new binding that ceases to exist when the function returns.",
          },
          {
            id: "outer-outer",
            text: "<code>outer</code>, then <code>outer</code>",
            correct: false,
            explanation:
              "This assumes the inner declaration is ignored. Lookup starts locally, so the nearest <code>name</code> wins inside the function.",
          },
          {
            id: "error",
            text: "It throws, because <code>name</code> is already declared",
            correct: false,
            explanation:
              "Redeclaring in a <em>nested</em> scope is perfectly legal — that is what shadowing is. You would only get an error redeclaring in the <em>same</em> scope.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Where does JavaScript start looking when it sees a name?",
        "Did anything reassign the outer variable, or just declare a new one?",
      ],
    },
  },

  {
    id: "scope-counter-closure",
    slug: "build-a-private-counter",
    title: "Build a counter with private state",
    topics: ["scope", "closures", "functions"],
    relatedModule: "js-functions",
    step: {
      id: "scope-counter-closure",
      type: "code-challenge",
      difficulty: "intermediate",
      instruction: {
        heading: "Build a counter with private state",
        body: "<p>Write <code>makeCounter()</code> that returns an object with two methods: <code>increment()</code>, which adds one and returns the new value, and <code>value()</code>, which returns the current count without changing it. Counting starts at zero.</p><p>The real requirement is the word <strong>private</strong>: there must be no way to reach the count from outside except through those two methods. Setting <code>counter.count = 100</code> must not work.</p><p>Also think about what happens when someone calls <code>makeCounter()</code> twice — the two counters must not share a total.</p>",
        analogy:
          "A turnstile at a stadium. It will tell you how many people have gone through, and it will let one more through — but there is no dial on the outside to set the number to whatever you like.",
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
            title: "Tip — privacy comes from where you declare, not from a keyword",
            body: "A variable declared inside <code>makeCounter</code> is unreachable from outside by construction. The returned methods keep it alive because they close over it — that is the whole mechanism, and it needs no special syntax.",
          },
        ],
      },
      config: {
        type: "code-challenge",
        functionName: "makeCounter",
        language: "javascript",
        starterCode:
          "function makeCounter() {\n  // Declare the count here, where nothing outside can reach it.\n  return {\n    increment() {},\n    value() {},\n  };\n}\n",
        tests: [
          { name: "starts at zero", expression: "return makeCounter().value();", expected: 0 },
          {
            name: "increment returns the new value",
            expression: "const c = makeCounter(); return c.increment();",
            expected: 1,
          },
          {
            name: "counts repeated increments",
            expression: "const c = makeCounter(); c.increment(); c.increment(); return c.value();",
            expected: 2,
          },
          {
            name: "value() does not change the count",
            expression: "const c = makeCounter(); c.increment(); c.value(); return c.value();",
            expected: 1,
          },
          {
            name: "two counters are independent",
            expression: "const a = makeCounter(); const b = makeCounter(); a.increment(); a.increment(); return b.value();",
            expected: 0,
          },
          {
            name: "the count is private",
            expression: "const c = makeCounter(); c.count = 100; return c.value();",
            expected: 0,
          },
        ],
        solution:
          "function makeCounter() {\n  let count = 0;\n  return {\n    increment() {\n      count += 1;\n      return count;\n    },\n    value() {\n      return count;\n    },\n  };\n}\n",
      },
      validation: { type: "tests-pass", criteria: {} },
      hints: [
        "Declare <code>let count = 0;</code> inside <code>makeCounter</code>, above the returned object.",
        "Both methods refer to that same <code>count</code> — that shared reference is the closure.",
        "Do not store it as a property on the returned object, or the privacy test will fail.",
      ],
    },
  },

  {
    id: "scope-block-vs-function",
    slug: "does-var-respect-a-block",
    title: "Does var respect an if block?",
    topics: ["scope", "var", "blocks"],
    relatedModule: "modern-js",
    step: {
      id: "scope-block-vs-function",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Does var respect an if block?",
        body: "<p>Two variables are declared inside an <code>if</code> block and read after it.</p><p>Predict what each log does — one of them throws.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          'if (true) {\n  var a = 1;\n  let b = 2;\n}\n\nconsole.log(a);\nconsole.log(b);',
        codeLanguage: "javascript",
        options: [
          {
            id: "one-then-throw",
            text: "<code>1</code>, then a <code>ReferenceError</code>",
            correct: true,
            explanation:
              "Correct. <code>var</code> is <strong>function</strong>-scoped, so the block is invisible to it and <code>a</code> leaks out to the surrounding scope. <code>let</code> is <strong>block</strong>-scoped, so <code>b</code> ceases to exist at the closing brace. This leaking is precisely why <code>let</code> was introduced, and why <code>var</code> is best avoided in new code.",
          },
          {
            id: "both-work",
            text: "<code>1</code>, then <code>2</code>",
            correct: false,
            explanation:
              "That would mean <code>let</code> also leaks out of the block, which would leave no difference between the two keywords.",
          },
          {
            id: "both-throw",
            text: "Two <code>ReferenceError</code>s",
            correct: false,
            explanation:
              "This assumes <code>var</code> is block-scoped too. It is not — it has only ever been scoped to the nearest enclosing function.",
          },
          {
            id: "undefined-then-two",
            text: "<code>undefined</code>, then <code>2</code>",
            correct: false,
            explanation:
              "<code>a</code> was genuinely assigned <code>1</code> before the log ran, so it holds <code>1</code>. You would only see <code>undefined</code> reading it <em>before</em> the assignment.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "One keyword is scoped to functions, the other to blocks.",
        "An <code>if</code> block is a block, but it is not a function.",
      ],
    },
  },

  {
    id: "scope-memoize",
    slug: "write-memoize",
    title: "Write memoize(fn)",
    topics: ["scope", "closures", "caching", "higher-order"],
    relatedModule: "js-functions",
    step: {
      id: "scope-memoize",
      type: "code-challenge",
      difficulty: "advanced",
      instruction: {
        heading: "Write memoize(fn)",
        body: "<p>Write <code>memoize(fn)</code>, which returns a wrapped version of <code>fn</code> that remembers results. Calling it twice with the same argument must run <code>fn</code> only once and return the cached answer the second time.</p><p>Assume a single argument, and that it is a primitive.</p><p>Two things to decide. Where does the cache live so that it survives between calls but is not shared with other memoized functions? And — the subtle one — how do you tell \"I cached <code>undefined</code>\" apart from \"I have not seen this argument\"? One of the tests exists purely to catch a cache that gets this wrong.</p>",
        analogy:
          "A reference librarian with a notebook. Asked a question they have answered before, they read from the notebook instead of walking back into the stacks — even if the answer they wrote down was \"nothing found\".",
        docLinks: [
          {
            label: "MDN: Map",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
            type: "js-concept",
          },
          {
            label: "MDN: Closures",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — Map.has beats a truthiness check",
            body: "<code>if (cache[key])</code> re-runs the function whenever the cached value is falsy — <code>0</code>, <code>\"\"</code>, <code>undefined</code>. <code>Map</code> gives you <code>has()</code>, which asks about the key rather than the value, and it accepts any type of key without stringifying it.",
          },
        ],
      },
      config: {
        type: "code-challenge",
        functionName: "memoize",
        language: "javascript",
        starterCode:
          "function memoize(fn) {\n  // Create the cache here so it lives between calls.\n  return function (arg) {\n    // Return the cached result if this arg has been seen before.\n  };\n}\n",
        tests: [
          {
            name: "returns the right answer",
            expression: "const double = memoize((n) => n * 2); return double(4);",
            expected: 8,
          },
          {
            name: "only calls fn once per distinct argument",
            expression:
              "let calls = 0; const f = memoize((n) => { calls++; return n * 2; }); f(4); f(4); f(4); return calls;",
            expected: 1,
          },
          {
            name: "still calls fn for a new argument",
            expression:
              "let calls = 0; const f = memoize((n) => { calls++; return n; }); f(1); f(2); return calls;",
            expected: 2,
          },
          {
            name: "caches a falsy result",
            expression:
              "let calls = 0; const f = memoize(() => { calls++; return 0; }); f(1); f(1); return calls;",
            expected: 1,
          },
          {
            name: "caches an undefined result",
            expression:
              "let calls = 0; const f = memoize(() => { calls++; return undefined; }); f(1); f(1); return calls;",
            expected: 1,
          },
          {
            name: "two memoized functions have separate caches",
            expression:
              "let calls = 0; const make = () => memoize((n) => { calls++; return n; }); const a = make(); const b = make(); a(1); b(1); return calls;",
            expected: 2,
          },
        ],
        solution:
          "function memoize(fn) {\n  const cache = new Map();\n  return function (arg) {\n    if (cache.has(arg)) return cache.get(arg);\n    const result = fn(arg);\n    cache.set(arg, result);\n    return result;\n  };\n}\n",
      },
      validation: { type: "tests-pass", criteria: {} },
      hints: [
        "Declare <code>const cache = new Map();</code> inside <code>memoize</code> but outside the returned function.",
        "Check with <code>cache.has(arg)</code>, not with the truthiness of the stored value.",
        "On a miss: call <code>fn</code>, <code>cache.set(arg, result)</code>, then return it.",
      ],
    },
  },

  {
    id: "scope-iife-module",
    slug: "why-wrap-code-in-a-function",
    title: "Why wrap a script in a function?",
    topics: ["scope", "modules", "globals"],
    relatedModule: "modern-js",
    step: {
      id: "scope-iife-module",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "Why wrap a script in a function?",
        body: "<p>Older scripts are often wrapped in a function that is called immediately — the IIFE pattern.</p><p><strong>Select every genuine reason this was done.</strong> Some of the options describe real benefits of other techniques rather than of this one.</p>",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "A classic <code>&lt;script&gt;</code> shares one global scope with every other script on the page, so two libraries declaring <code>$</code> collide. ES modules (<code>&lt;script type=\"module\"&gt;</code>) each get their own scope automatically, which is why the IIFE is largely historical now.",
          },
        ],
      },
      config: {
        type: "quiz",
        mode: "multiple",
        codeSnippet:
          "(function () {\n  var helper = 1;\n  // ...\n})();",
        codeLanguage: "javascript",
        options: [
          {
            id: "avoid-globals",
            text: "It keeps variables out of the global scope so two scripts cannot clash",
            correct: true,
            explanation:
              "The main reason. Without the wrapper, a top-level <code>var helper</code> becomes a property of <code>window</code>, and any other script using that name silently overwrites it. The function body gives the code a private scope.",
          },
          {
            id: "private-state",
            text: "It allows private state that only the returned API can reach",
            correct: true,
            explanation:
              "The module pattern: the IIFE returns an object whose methods close over variables nobody outside can touch. This is the same mechanism as the private counter, applied to a whole file.",
          },
          {
            id: "faster",
            text: "It makes the code run measurably faster",
            correct: false,
            explanation:
              "There is no meaningful performance motivation — if anything you add one function call. The IIFE is about encapsulation, not speed.",
          },
          {
            id: "hoisting-fix",
            text: "It prevents <code>var</code> from being hoisted",
            correct: false,
            explanation:
              "Hoisting still happens — <code>var helper</code> is hoisted to the top of the IIFE's own scope. What changes is <em>where</em> it is hoisted to, which is the scoping point rather than a separate benefit.",
          },
        ],
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "What happens to a top-level <code>var</code> in a plain script, without the wrapper?",
        "Two of these are about scope. The other two claim benefits the pattern does not provide.",
      ],
    },
  },
];
