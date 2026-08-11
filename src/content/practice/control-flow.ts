import type { PracticeQuestionSeed } from "@/types/practice";

export const controlFlowQuestions: PracticeQuestionSeed[] = [
  {
    id: "flow-switch-fallthrough",
    slug: "why-do-three-cases-run",
    title: "Debug: why did three cases run?",
    topics: ["control-flow", "switch", "debugging"],
    relatedModule: "js-flow-control",
    step: {
      id: "flow-switch-fallthrough",
      type: "quiz",
      difficulty: "easy",
      instruction: {
        heading: "Debug: why did three cases run?",
        body: "<p>The input is <code>\"b\"</code> and the expectation was one log. Three appear.</p><p>Look at what is missing from each case.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          'switch ("b") {\n  case "a": console.log("A");\n  case "b": console.log("B");\n  case "c": console.log("C");\n  default: console.log("D");\n}',
        codeLanguage: "javascript",
        options: [
          {
            id: "missing-break",
            text: "There is no <code>break</code>, so once a case matches, execution falls through every case below it",
            correct: true,
            explanation:
              "Correct. <code>case</code> labels mark an entry point, not a self-contained block — matching <code>\"b\"</code> jumps in there and then runs straight on through <code>C</code> and <code>default</code>. Adding <code>break</code> (or <code>return</code>) to each case stops it. Deliberate fall-through is occasionally useful for grouping cases, which is why the language allows it, and why it is worth a comment when you mean it.",
          },
          {
            id: "loose-compare",
            text: "<code>switch</code> compares loosely, so several cases matched",
            correct: false,
            explanation:
              "<code>switch</code> uses strict comparison, so only <code>\"b\"</code> matched. The other two logs are not matches at all — they are the same single match continuing downward.",
          },
          {
            id: "default-always",
            text: "<code>default</code> always runs in addition to the matching case",
            correct: false,
            explanation:
              "<code>default</code> only runs when nothing matched — or, as here, when execution falls into it. Add <code>break</code> statements and it stops running.",
          },
          {
            id: "needs-return",
            text: "<code>switch</code> requires a <code>return</code> in every case",
            correct: false,
            explanation:
              "<code>return</code> would work, but only because it exits the enclosing function. <code>break</code> is the construct meant for this, and it works outside a function too.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Which three logs appeared, and where do they sit relative to the match?",
        "What keyword normally ends a <code>case</code>?",
      ],
    },
  },

  {
    id: "flow-fizzbuzz",
    slug: "fizzbuzz",
    title: "FizzBuzz",
    topics: ["control-flow", "loops", "conditionals"],
    relatedModule: "js-flow-control",
    step: {
      id: "flow-fizzbuzz",
      type: "code-challenge",
      difficulty: "easy",
      instruction: {
        heading: "FizzBuzz",
        body: "<p>Write <code>fizzBuzz(n)</code> returning an array of length <code>n</code>, counting from 1. Multiples of 3 become <code>\"Fizz\"</code>, multiples of 5 become <code>\"Buzz\"</code>, multiples of both become <code>\"FizzBuzz\"</code>, and everything else is the number itself (as a number, not a string).</p><p>The classic trap is ordering. If you test for 3 first, 15 never reaches the combined case. Work out which condition has to come first and why — that ordering insight is the entire point of the exercise.</p>",
        docLinks: [
          {
            label: "MDN: Remainder (%)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder",
            type: "js-operator",
          },
          {
            label: "MDN: if...else",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — most specific condition first",
            body: "In an <code>if / else if</code> chain only the first true branch runs, so the narrowest case must come first. This is a general rule, not a FizzBuzz quirk — the same ordering logic decides which route matches in a web framework.",
          },
        ],
      },
      config: {
        type: "code-challenge",
        functionName: "fizzBuzz",
        language: "javascript",
        starterCode:
          "function fizzBuzz(n) {\n  // Count 1..n, replacing multiples of 3 and 5.\n  // Think carefully about which check goes first.\n}\n",
        tests: [
          { name: "handles the first five", args: [5], expected: [1, 2, "Fizz", 4, "Buzz"] },
          { name: "catches 15 as FizzBuzz", args: [15], expected: [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"] },
          { name: "returns an empty array for 0", args: [0], expected: [] },
          { name: "starts counting at 1", args: [1], expected: [1] },
          { name: "keeps non-multiples as numbers", args: [2], expected: [1, 2] },
        ],
        solution:
          'function fizzBuzz(n) {\n  const out = [];\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) out.push("FizzBuzz");\n    else if (i % 3 === 0) out.push("Fizz");\n    else if (i % 5 === 0) out.push("Buzz");\n    else out.push(i);\n  }\n  return out;\n}\n',
      },
      validation: { type: "tests-pass", criteria: {} },
      hints: [
        "Loop from 1 to n inclusive: <code>for (let i = 1; i &lt;= n; i++)</code>",
        "Test the combined case first — either <code>i % 15 === 0</code> or <code>i % 3 === 0 &amp;&amp; i % 5 === 0</code>.",
        "The <code>else</code> branch pushes <code>i</code> itself, not <code>String(i)</code>.",
      ],
    },
  },

  {
    id: "flow-loop-labels",
    slug: "break-out-of-nested-loops",
    title: "Break out of two loops at once",
    topics: ["control-flow", "loops"],
    relatedModule: "js-flow-control",
    step: {
      id: "flow-loop-labels",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "Break out of two loops at once",
        body: "<p>A search runs over a grid and should stop entirely the moment it finds a match. A plain <code>break</code> only escapes the inner loop, so the outer one keeps going.</p><p><strong>Select every approach that stops both loops.</strong></p>",
      },
      config: {
        type: "quiz",
        mode: "multiple",
        codeSnippet:
          "for (const row of grid) {\n  for (const cell of row) {\n    if (cell === target) {\n      break; // only escapes the inner loop\n    }\n  }\n}",
        codeLanguage: "javascript",
        options: [
          {
            id: "label",
            text: "Label the outer loop and use <code>break outer;</code>",
            correct: true,
            explanation:
              "This is what labels are for. Writing <code>outer:</code> before the loop lets <code>break outer;</code> terminate that specific loop from any depth. Labels are rare enough to look exotic, but this is their legitimate use — no flag variable and no restructuring needed.",
          },
          {
            id: "extract-function",
            text: "Move the search into a function and <code>return</code> when found",
            correct: true,
            explanation:
              "Usually the cleanest answer. <code>return</code> exits the whole function regardless of nesting depth, and extracting the search tends to improve the code anyway by giving the operation a name.",
          },
          {
            id: "flag",
            text: "Set a <code>found</code> flag and check it in the outer loop's condition",
            correct: true,
            explanation:
              "It works, and predates labels in most people's habits. The cost is noise: an extra variable plus a check on every outer iteration, and it is easy to forget the second <code>break</code>. Correct but the least tidy of the three.",
          },
          {
            id: "continue",
            text: "Replace <code>break</code> with <code>continue</code>",
            correct: false,
            explanation:
              "<code>continue</code> skips to the next iteration rather than leaving the loop, so this makes things worse — the search would carry on scanning both loops to the end.",
          },
        ],
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Three of the four genuinely work; they differ in tidiness.",
        "What exits a function from any depth of nesting?",
      ],
    },
  },

  {
    id: "flow-for-of-vs-in",
    slug: "for-of-versus-for-in",
    title: "Debug: why am I looping over indexes?",
    topics: ["control-flow", "loops", "debugging"],
    relatedModule: "js-flow-control",
    step: {
      id: "flow-for-of-vs-in",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Debug: why am I looping over indexes?",
        body: "<p>The intent was to log each colour. The output is <code>0 1 2</code>.</p><p>Two similar-looking loop forms do quite different things. Work out which one is in use.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          'const colours = ["red", "green", "blue"];\n\nfor (const c in colours) {\n  console.log(c); // 0, 1, 2\n}',
        codeLanguage: "javascript",
        options: [
          {
            id: "in-gives-keys",
            text: "<code>for...in</code> iterates over <strong>keys</strong>; <code>for...of</code> iterates over <strong>values</strong>",
            correct: true,
            explanation:
              "Correct. <code>for...in</code> walks enumerable property names — and an array's property names are its indexes, as strings. <code>for...of</code> walks the iterable's values, which is what you want here. A further reason to avoid <code>for...in</code> on arrays: it also picks up enumerable properties added to the prototype, and it gives no ordering guarantee for non-integer keys.",
          },
          {
            id: "needs-let",
            text: "<code>const</code> in a loop head gives the index; <code>let</code> would give the value",
            correct: false,
            explanation:
              "The declaration keyword has no bearing on what is iterated. Swap in <code>let</code> and you still get indexes — only the loop <em>form</em> matters.",
          },
          {
            id: "array-bug",
            text: "Arrays cannot be iterated directly; you must use <code>colours.forEach</code>",
            correct: false,
            explanation:
              "Arrays are iterable, so <code>for...of</code> works directly. <code>forEach</code> is a fine alternative but not a necessity, and it cannot be stopped early with <code>break</code>.",
          },
          {
            id: "strings",
            text: "The values are strings, so JavaScript logs their positions instead",
            correct: false,
            explanation:
              "The element type is irrelevant. An array of numbers looped with <code>for...in</code> would give the same index strings.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Only two characters differ between the two loop forms.",
        "Which one is designed for objects, and which for iterables?",
      ],
    },
  },

  {
    id: "flow-range",
    slug: "build-a-range-function",
    title: "Build a range function",
    topics: ["control-flow", "loops", "arrays"],
    relatedModule: "js-flow-control",
    step: {
      id: "flow-range",
      type: "code-challenge",
      difficulty: "intermediate",
      instruction: {
        heading: "Build a range function",
        body: "<p>Write <code>range(start, end, step)</code> returning an array from <code>start</code> up to <strong>but not including</strong> <code>end</code>, moving by <code>step</code>. Default <code>step</code> to <code>1</code> when it is not supplied.</p><p>Two edge cases decide whether this is correct or merely usually-correct. A negative step has to count <em>downwards</em>, which means the loop's stop condition flips direction. And a step of <code>0</code> would never terminate — decide what to return rather than hanging the browser.</p><p>Exclusive end bounds are the convention across the language (<code>slice</code>, <code>substring</code>) precisely because <code>end - start</code> then gives the length.</p>",
        docLinks: [
          {
            label: "MDN: for statement",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for",
            type: "js-concept",
          },
          {
            label: "MDN: Default parameters",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — guard the infinite loop before you loop",
            body: "A <code>step</code> of <code>0</code> means the counter never moves and the condition never becomes false. Because this runs in a sandbox with a timeout you would see \"took too long\" rather than a frozen tab — but the habit of rejecting the impossible input up front is the real lesson.",
          },
        ],
      },
      config: {
        type: "code-challenge",
        functionName: "range",
        language: "javascript",
        starterCode:
          "function range(start, end, step = 1) {\n  // Count from start toward end, excluding end.\n  // Handle a negative step, and refuse a step of 0.\n}\n",
        tests: [
          { name: "counts up", args: [0, 5], expected: [0, 1, 2, 3, 4] },
          { name: "excludes the end value", args: [1, 4], expected: [1, 2, 3] },
          { name: "honours a step", args: [0, 10, 3], expected: [0, 3, 6, 9] },
          { name: "counts down with a negative step", args: [5, 0, -1], expected: [5, 4, 3, 2, 1] },
          { name: "empty when start equals end", args: [3, 3], expected: [] },
          { name: "empty when the step points the wrong way", args: [0, 5, -1], expected: [] },
          { name: "returns empty for a step of 0 rather than hanging", args: [0, 5, 0], expected: [] },
        ],
        solution:
          "function range(start, end, step = 1) {\n  const out = [];\n  if (step === 0) return out;\n  if (step > 0) {\n    for (let i = start; i < end; i += step) out.push(i);\n  } else {\n    for (let i = start; i > end; i += step) out.push(i);\n  }\n  return out;\n}\n",
      },
      validation: { type: "tests-pass", criteria: {} },
      hints: [
        "Return early for <code>step === 0</code> before any loop runs.",
        "The comparison has to flip: <code>i &lt; end</code> when counting up, <code>i &gt; end</code> when counting down.",
        "Both branches advance the same way — <code>i += step</code> — since the step already carries its sign.",
      ],
    },
  },

  {
    id: "flow-short-circuit",
    slug: "what-does-and-return",
    title: "What does && actually return?",
    topics: ["control-flow", "operators", "short-circuit"],
    relatedModule: "js-flow-control",
    step: {
      id: "flow-short-circuit",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "What does && actually return?",
        body: "<p>The logical operators are usually met in <code>if</code> conditions, where only truthiness matters. Used as expressions they return something more specific than <code>true</code> or <code>false</code>.</p><p>Work out both logged values.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet: 'console.log("a" && "b");\nconsole.log("" || "fallback");',
        codeLanguage: "javascript",
        options: [
          {
            id: "operands",
            text: '<code>b</code>, then <code>fallback</code> — these operators return one of their <em>operands</em>, not a boolean',
            correct: true,
            explanation:
              "Correct. <code>&&</code> returns the first falsy operand, or the last one if none are falsy — so <code>\"a\" && \"b\"</code> gives <code>\"b\"</code>. <code>||</code> returns the first truthy operand, or the last one — so the empty string is skipped for <code>\"fallback\"</code>. This is what makes <code>value || default</code> and JSX's <code>cond && &lt;El /&gt;</code> work at all.",
          },
          {
            id: "booleans",
            text: "<code>true</code>, then <code>true</code>",
            correct: false,
            explanation:
              "This is what the operators do in languages that coerce results to booleans. JavaScript preserves the operand, which is exactly why the fallback idiom is possible.",
          },
          {
            id: "first-operand",
            text: '<code>a</code>, then <code>""</code>',
            correct: false,
            explanation:
              "This has both operators returning their first operand unconditionally, which would make short-circuiting pointless. Each returns the operand that <em>decided</em> the result.",
          },
          {
            id: "error",
            text: "It throws, because these operators require boolean operands",
            correct: false,
            explanation:
              "Any value is acceptable on either side. The operators evaluate truthiness to decide which operand to return, but never demand actual booleans.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "If these returned booleans, <code>value || \"default\"</code> could never give you the default string.",
        "Which operand decides the outcome in each case?",
      ],
    },
  },
];
