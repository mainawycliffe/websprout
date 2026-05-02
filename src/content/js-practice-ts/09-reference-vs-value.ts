import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-practice-ts-reference-vs-value",
  slug: "reference-vs-value",
  title: "Reference vs Value & The Const Mutation Trap",
  description:
    "Why arr.push works on a const array, why two equal-looking objects aren't ===, and the immutable update pattern React relies on.",
  order: 9,
  steps: [
    {
      id: "primitives-vs-objects",
      type: "explanation",
      instruction: {
        heading: "Two types of variables: primitives and objects",
        body: "<p>JavaScript has seven <strong>primitive</strong> types: <code>number</code>, <code>string</code>, <code>boolean</code>, <code>null</code>, <code>undefined</code>, <code>symbol</code>, <code>bigint</code>. When you assign one to a variable, you store the value itself.</p><p>Everything else (objects, arrays, functions, Maps, Sets, classes) is an <strong>object</strong>. When you assign one, you store a <em>reference</em> to it. Two variables can point at the same object; mutating through one is visible through the other.</p>",
        analogy:
          "A primitive is like writing a number on a sticky note — copying the note copies the number. An object is like writing the address of a house on a sticky note — copying the note still points at the same house.",
        docLinks: [
          {
            label: "Data types (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "value-vs-ref-demo",
      type: "js-console",
      instruction: {
        heading: "See it in action",
        body: "<p>Run the experiment. The primitive copy is independent. The object copy shares the reference.</p>",
      },
      config: {
        type: "js-console",
        starterCode:
          'let a = 5;\nlet b = a;\nb = 10;\nconsole.log(a); // 5  — independent\n\nlet x = [1];\nlet y = x;\ny.push(2);\nconsole.log(x); // [ 1, 2 ]  — y and x point at the same array',
        expectedOutput: ["5", "[ 1, 2 ]"],
      },
      validation: {
        type: "console-output-match",
        criteria: { expected: ["5", "[ 1, 2 ]"] },
      },
      hints: [
        "Just run it — the goal is to see the difference.",
      ],
    },
    {
      id: "const-mutation-trap",
      type: "explanation",
      instruction: {
        heading: "const freezes the binding, not the contents",
        body: "<p><code>const</code> means &quot;you cannot reassign this variable&quot;. It does NOT mean &quot;the value can’t change&quot;. With objects, the <em>contents</em> remain mutable.</p><p>That is why <code>const arr = []; arr.push(1)</code> works. <code>arr</code> still points at the same array; the array is what changed.</p>",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "ECMAScript binds <code>const</code> identifiers as immutable bindings — the variable cannot be reassigned. The value at that binding is unaffected. For shallow immutability, use <code>Object.freeze(obj)</code>; the engine will then ignore writes to the object’s direct properties (silently in non-strict mode, with a TypeError in strict mode).",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "const arr = [];\narr.push(1);          // OK — mutating contents\narr.push(2);\nconsole.log(arr);     // [ 1, 2 ]\n// arr = [3];         // TypeError — reassignment not allowed\n\nconst obj = {};\nobj.x = 1;            // OK — adding a property\nconsole.log(obj.x);   // 1\n// obj = { x: 2 };    // TypeError — reassignment not allowed\n\nconst frozen = Object.freeze({ a: 1 });\nfrozen.a = 999;       // silently ignored (or throws in strict mode)\nconsole.log(frozen.a); // 1",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "predict-throws",
      type: "gap-fill",
      instruction: {
        heading: "Will it throw?",
        body: "<p>For each line, fill in <code>ok</code> if the line runs successfully, or <code>throws</code> if it raises an error.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          'const arr = [];\narr.push(1);            // {{a}}\n\nconst arr2 = [];\narr2 = [1];             // {{b}}\n\nconst obj = {};\nobj.x = 1;              // {{c}}\n\nconst obj2 = {};\nobj2 = { x: 1 };        // {{d}}',
        gaps: [
          { id: "a", placeholder: "ok or throws", acceptedAnswers: ["ok"], caseSensitive: false },
          { id: "b", placeholder: "ok or throws", acceptedAnswers: ["throws"], caseSensitive: false },
          { id: "c", placeholder: "ok or throws", acceptedAnswers: ["ok"], caseSensitive: false },
          { id: "d", placeholder: "ok or throws", acceptedAnswers: ["throws"], caseSensitive: false },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["a", "b", "c", "d"] } },
      hints: [
        "<code>const</code> blocks REASSIGNMENT (the <code>=</code> after declaration), not mutation.",
        "<code>arr.push(...)</code> mutates. <code>arr = ...</code> reassigns.",
      ],
    },
    {
      id: "object-equality",
      type: "js-console",
      instruction: {
        heading: "Object equality is reference equality",
        body: "<p>Two object literals with the same fields are NOT <code>===</code>. They’re different objects in memory.</p><p>Build a small <code>shallowEqual(a, b)</code> that returns <code>true</code> when the two objects have the same keys and the same primitive values for each.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "React’s memoization (<code>React.memo</code>, <code>useMemo</code>) uses shallow equality on props. If you build a new object every render — <code>{ ...prev, x: 1 }</code> — props will look new even when nothing meaningful changed. That’s the same trap people hit with the <code>useEffect</code> dependency array.",
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode:
          'console.log({ a: 1 } === { a: 1 }); // false — different objects\n\nfunction shallowEqual(a, b) {\n  // 1. If a and b are the same reference -> true\n  // 2. If they have different number of keys -> false\n  // 3. For each key in a: a[key] !== b[key] -> false\n  // 4. Otherwise true\n}\n\nconsole.log(shallowEqual({ a: 1 }, { a: 1 }));        // true\nconsole.log(shallowEqual({ a: 1 }, { a: 2 }));        // false\nconsole.log(shallowEqual({ a: 1 }, { a: 1, b: 2 }));  // false',
        expectedOutput: ["false", "true", "false", "false"],
      },
      validation: {
        type: "console-output-match",
        criteria: { expected: ["false", "true", "false", "false"] },
      },
      hints: [
        "Use <code>Object.keys(a)</code> and <code>Object.keys(b)</code> to compare lengths.",
        'Loop with <code>for (const key of Object.keys(a))</code> and check <code>a[key] !== b[key]</code>.',
      ],
    },
    {
      id: "safe-update",
      type: "free-edit",
      instruction: {
        heading: "Build safeUpdate (immutable update)",
        body: "<p>Instead of mutating an object in place, return a NEW object with the updated field. This is exactly the rule React enforces with <code>setState</code>: never mutate state — always replace.</p>",
      },
      config: {
        type: "free-edit",
        language: "javascript",
        starterCode:
          'function safeUpdate(obj, key, value) {\n  // return a new object with all of obj\'s fields plus { [key]: value }\n}\n\nconst original = { name: "Sara", age: 30 };\nconst updated = safeUpdate(original, "age", 31);\n\nconsole.log(original.age); // 30 (unchanged!)\nconsole.log(updated.age);  // 31\nconsole.log(original === updated); // false (new object)',
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["...", "return"] },
      },
      hints: [
        "Spread syntax: <code>{ ...obj, [key]: value }</code>.",
        "<code>[key]</code> in an object literal is a computed key — it uses the variable’s value as the property name.",
        "One-liner: <code>return { ...obj, [key]: value };</code>",
      ],
    },
  ],
};
