import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-practice-ts-function-drills",
  slug: "function-drills",
  title: "Function Drills",
  description:
    "Switch between declarations, arrows, defaults, rest, and higher-order patterns until they feel automatic.",
  order: 3,
  steps: [
    {
      id: "drills-intro",
      type: "explanation",
      instruction: {
        heading: "Functions are the substrate",
        body: "<p>Closures, <code>this</code>, generics — every advanced topic in this module rests on confidence with the four function shapes:</p><ul><li><strong>Declaration</strong>: <code>function add(a, b) { return a + b; }</code></li><li><strong>Expression</strong>: <code>const add = function (a, b) { return a + b; };</code></li><li><strong>Arrow</strong>: <code>const add = (a, b) =&gt; a + b;</code></li><li><strong>Method</strong>: <code>{ add(a, b) { return a + b; } }</code></li></ul><p>Plus the parameter features: defaults, rest (<code>...args</code>), and destructuring. Let's drill them.</p>",
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "to-arrow",
      type: "gap-fill",
      instruction: {
        heading: "Convert a declaration to an arrow",
        body: "<p>Rewrite <code>function double(n) { return n * 2; }</code> as an arrow function with an <em>implicit return</em> (no braces, no <code>return</code> keyword).</p>",
      },
      config: {
        type: "gap-fill",
        template:
          'const double = ({{param}}) {{arrow}} {{body}};\n\nconsole.log(double(7)); // 14',
        gaps: [
          { id: "param", placeholder: "parameter", acceptedAnswers: ["n"], caseSensitive: true },
          { id: "arrow", placeholder: "arrow", acceptedAnswers: ["=>"], caseSensitive: true },
          { id: "body", placeholder: "expression", acceptedAnswers: ["n * 2", "n*2"], caseSensitive: false },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["param", "arrow", "body"] } },
      hints: [
        "An arrow function uses <code>=&gt;</code>.",
        "With one parameter and an implicit return, no braces are needed.",
      ],
    },
    {
      id: "default-param",
      type: "gap-fill",
      instruction: {
        heading: "Add a default parameter",
        body: '<p>Defaults run when the argument is <code>undefined</code>. They make functions safer and remove a layer of <code>if (!greeting) greeting = "Hi"</code> boilerplate.</p>',
      },
      config: {
        type: "gap-fill",
        template:
          'function greet(name, greeting {{eq}} "Hi") {\n  return `${greeting}, ${name}!`;\n}\n\nconsole.log(greet("Sara"));            // "Hi, Sara!"\nconsole.log(greet("Sara", "Welcome")); // "Welcome, Sara!"',
        gaps: [
          { id: "eq", placeholder: "operator", acceptedAnswers: ["="], caseSensitive: true },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["eq"] } },
      hints: [
        "Defaults are written with a single <code>=</code> in the parameter list.",
      ],
    },
    {
      id: "rest-sum",
      type: "js-console",
      instruction: {
        heading: "Sum any number of arguments",
        body: "<p>Rest parameters (<code>...nums</code>) collect any extra arguments into a real array. Combined with <code>reduce</code>, you get a clean variadic <code>sum</code>.</p>",
        docLinks: [
          {
            label: "Rest parameters (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters",
            type: "js-concept",
          },
          {
            label: "Array.prototype.reduce (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode:
          "// Write a variadic sum: sum(1, 2, 3) === 6\nfunction sum(/* ...nums */) {\n  // your code\n}\n\nconsole.log(sum(1, 2, 3));        // 6\nconsole.log(sum(10, 20, 30, 40)); // 100\nconsole.log(sum());               // 0",
        expectedOutput: ["6", "100", "0"],
      },
      validation: {
        type: "console-output-match",
        criteria: { expected: ["6", "100", "0"] },
      },
      hints: [
        "Use rest: <code>function sum(...nums) { ... }</code>.",
        "<code>nums.reduce((total, n) =&gt; total + n, 0)</code> with a starting value of <code>0</code> handles the empty case.",
      ],
    },
    {
      id: "compose",
      type: "js-console",
      instruction: {
        heading: "Build compose(f, g)",
        body: "<p><code>compose(f, g)</code> returns a new function <code>x =&gt; f(g(x))</code>. Composition is everywhere in functional pipelines: middleware, RxJS, Redux. Building it from scratch nails the idea that functions are values.</p>",
      },
      config: {
        type: "js-console",
        starterCode:
          "const double = n => n * 2;\nconst addOne = n => n + 1;\n\nfunction compose(f, g) {\n  // return a function that takes x and returns f(g(x))\n}\n\nconst doubleAfterAdd = compose(double, addOne);\nconsole.log(doubleAfterAdd(5)); // 12   // (5 + 1) * 2\nconsole.log(doubleAfterAdd(0)); // 2",
        expectedOutput: ["12", "2"],
      },
      validation: {
        type: "console-output-match",
        criteria: { expected: ["12", "2"] },
      },
      hints: [
        "<code>compose</code> returns a function. Use an arrow inside.",
        "<code>return x =&gt; f(g(x));</code>",
      ],
    },
    {
      id: "my-map",
      type: "code-challenge",
      difficulty: "intermediate",
      instruction: {
        heading: "Re-implement Array.prototype.map",
        body: "<p>Build <code>myMap(arr, fn)</code> from scratch using a <code>for</code> loop. It should return a <strong>new</strong> array where each element is <code>fn(element)</code> — leaving the array you were handed completely untouched.</p><p>Re-implementing a built-in is the fastest way to understand what the language hands you for free. Every time you write <code>.map()</code> after this, you will know exactly what the engine is doing under the hood.</p><p>Write your function, then click <strong>Run Tests</strong>. Each test shows you what it passed in and what it expected back, so a failure tells you exactly which behaviour is missing.</p>",
        analogy:
          "A photocopier with a filter on the glass. You feed in a stack of pages, each one comes out transformed — and the originals go back to you unchanged.",
        docLinks: [
          {
            label: "MDN: Array.prototype.map()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
            type: "js-method",
          },
          {
            label: "MDN: for statement",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "<code>Array.prototype.map</code> is specified to call the callback with three arguments — <code>(element, index, array)</code> — and to skip holes in sparse arrays. The simplified version here only passes the element, which is all the drill needs.",
          },
          {
            variant: "tip",
            title: "Tip — don't mutate the input",
            body: "Two of the tests check that the array you were given comes back unchanged, and that you returned a genuinely new array. If you write back into <code>arr</code> instead of building a fresh one, those tests will catch you — and so will a code reviewer.",
          },
        ],
      },
      config: {
        type: "code-challenge",
        functionName: "myMap",
        language: "javascript",
        starterCode:
          "function myMap(arr, fn) {\n  // 1. Create a new empty array.\n  // 2. Loop through arr with a for loop.\n  // 3. Push fn(arr[i]) into the new array.\n  // 4. Return the new array.\n}\n",
        // Every test uses `expression` because the callbacks are functions, and
        // functions cannot cross postMessage's structured clone.
        tests: [
          {
            name: "transforms every number",
            expression: "return myMap([1, 2, 3], n => n * 10);",
            expected: [10, 20, 30],
          },
          {
            name: "works on strings too",
            expression: "return myMap(['a', 'b'], s => s.toUpperCase());",
            expected: ["A", "B"],
          },
          {
            name: "returns an empty array for an empty input",
            expression: "return myMap([], n => n);",
            expected: [],
          },
          {
            name: "does not mutate the original array",
            expression: "const original = [1, 2, 3]; myMap(original, n => n * 2); return original;",
            expected: [1, 2, 3],
          },
          {
            name: "returns a NEW array, not the same one",
            expression: "const original = [1, 2]; return myMap(original, n => n) === original;",
            expected: false,
          },
        ],
        solution:
          "function myMap(arr, fn) {\n  const result = [];\n  for (let i = 0; i < arr.length; i++) {\n    result.push(fn(arr[i]));\n  }\n  return result;\n}\n",
      },
      validation: { type: "tests-pass", criteria: {} },
      hints: [
        "Start with <code>const result = [];</code> then <code>for (let i = 0; i &lt; arr.length; i++) { }</code>",
        "Inside the loop: <code>result.push(fn(arr[i]));</code>",
        "Don't forget <code>return result;</code> at the very end — a function with no <code>return</code> gives back <code>undefined</code>.",
      ],
    },
  ],
};
