import type { PracticeQuestionSeed } from "@/types/practice";

export const objectQuestions: PracticeQuestionSeed[] = [
  {
    id: "objects-reference-copy",
    slug: "why-did-both-objects-change",
    title: "Debug: why did both objects change?",
    topics: ["objects", "references", "debugging"],
    relatedModule: "js-data-types",
    step: {
      id: "objects-reference-copy",
      type: "quiz",
      difficulty: "easy",
      instruction: {
        heading: "Debug: why did both objects change?",
        body: "<p>The intent was to make a copy of <code>original</code> and change only the copy. Both ended up with <code>role: \"admin\"</code>.</p><p>Ask what the <code>=</code> actually copied — the object, or something else?</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          'const original = { name: "Ada", role: "user" };\nconst copy = original;\ncopy.role = "admin";\n\nconsole.log(original.role); // "admin"',
        codeLanguage: "javascript",
        options: [
          {
            id: "reference",
            text: "<code>=</code> copied the <strong>reference</strong>, so both names point at one object",
            correct: true,
            explanation:
              "Correct. Objects are stored by reference: the variable holds an address, not the contents. Assigning copies that address, so <code>original</code> and <code>copy</code> are two labels on one object. To get a real copy use <code>{ ...original }</code> or <code>structuredClone(original)</code>.",
          },
          {
            id: "const",
            text: "<code>const</code> made the object shared between the two variables",
            correct: false,
            explanation:
              "<code>const</code> only stops the variable being reassigned to something else — it says nothing about sharing. The same thing happens with <code>let</code>, so <code>const</code> cannot be the cause.",
          },
          {
            id: "hoisting",
            text: "The properties were hoisted to the outer scope",
            correct: false,
            explanation:
              "Hoisting applies to declarations of variables and functions, not to object properties. Properties never leave the object they belong to.",
          },
          {
            id: "mutation-only",
            text: "You cannot change a property on a <code>const</code> object at all",
            correct: false,
            explanation:
              "You can, and that is exactly what happened. <code>const</code> freezes the binding, not the contents — if you want the contents frozen too, that is <code>Object.freeze()</code>.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "How many objects were actually created by that code?",
        "The <code>=</code> did copy something — just not the contents.",
      ],
    },
  },

  {
    id: "objects-shallow-spread",
    slug: "how-deep-does-spread-copy",
    title: "How deep does the spread copy go?",
    topics: ["objects", "spread", "references"],
    relatedModule: "modern-js",
    step: {
      id: "objects-shallow-spread",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "How deep does the spread copy go?",
        body: "<p>The spread operator is the usual way to copy an object. Here it is used on an object that has another object nested inside it.</p><p>Work out what gets a fresh copy and what does not, then decide what the last line logs.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          'const user = { name: "Ada", address: { city: "London" } };\nconst copy = { ...user };\n\ncopy.name = "Grace";\ncopy.address.city = "Paris";\n\nconsole.log(user.name, user.address.city);',
        codeLanguage: "javascript",
        options: [
          {
            id: "shallow",
            text: '<code>Ada Paris</code>',
            correct: true,
            explanation:
              "Correct — this is what <em>shallow</em> copy means. Spread copies the top level only: <code>name</code> is a fresh string on the copy, so changing it leaves the original alone. But <code>address</code> was copied as a <strong>reference</strong>, so both objects share one address. For a deep copy use <code>structuredClone(user)</code>.",
          },
          {
            id: "deep",
            text: "<code>Ada London</code>",
            correct: false,
            explanation:
              "This is what you would get from a <em>deep</em> copy — and it is the answer most people expect, which is exactly why shallow copying causes bugs. Spread does not recurse into nested objects.",
          },
          {
            id: "both-changed",
            text: "<code>Grace Paris</code>",
            correct: false,
            explanation:
              "That would mean spread copied nothing at all. It genuinely did copy the top level — <code>name</code> is proof, since the original still says <code>Ada</code>.",
          },
          {
            id: "error",
            text: "It throws, because you cannot spread a nested object",
            correct: false,
            explanation:
              "Spread handles nested objects without complaint — it simply copies the reference across rather than duplicating the contents. No error is involved, which is what makes this quiet.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Two properties, two different outcomes. Ask why they differ.",
        "One of them is a primitive; the other is an object.",
      ],
    },
  },

  {
    id: "objects-count-by",
    slug: "count-items-by-key",
    title: "Count items by key",
    topics: ["objects", "reduce", "grouping"],
    relatedModule: "js-functions",
    step: {
      id: "objects-count-by",
      type: "code-challenge",
      difficulty: "intermediate",
      instruction: {
        heading: "Count items by key",
        body: "<p>Write <code>countBy(items)</code>. Given an array of strings, return an object mapping each distinct string to how many times it appeared. So <code>[\"a\", \"b\", \"a\"]</code> gives <code>{ a: 2, b: 1 }</code>.</p><p>The interesting part is the very first time you see a word: there is no count to add to yet. Decide how you will handle that missing starting value — the neat solution handles it without a separate branch.</p>",
        analogy:
          "Tallying votes. Each ballot either adds a mark to an existing name on the sheet, or starts a new line for a name you have not seen before.",
        docLinks: [
          {
            label: "MDN: Working with objects",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects",
            type: "js-concept",
          },
          {
            label: "MDN: Nullish coalescing (??)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing",
            type: "js-operator",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — reading a missing key is not an error",
            body: "<code>counts[\"new\"]</code> gives <code>undefined</code>, not a crash. Combine that with <code>?? 0</code> and the first-sighting case disappears: <code>counts[word] = (counts[word] ?? 0) + 1;</code>",
          },
        ],
      },
      config: {
        type: "code-challenge",
        functionName: "countBy",
        language: "javascript",
        starterCode:
          "function countBy(items) {\n  // 1. Start with an empty object.\n  // 2. For each item, add one to its count.\n  // 3. Remember the very first sighting has no count yet.\n}\n",
        tests: [
          { name: "counts repeats", args: [["a", "b", "a"]], expected: { a: 2, b: 1 } },
          { name: "single item", args: [["x"]], expected: { x: 1 } },
          { name: "empty array gives an empty object", args: [[]], expected: {} },
          { name: "all the same", args: [["z", "z", "z"]], expected: { z: 3 } },
          { name: "preserves distinct keys", args: [["a", "b", "c"]], expected: { a: 1, b: 1, c: 1 } },
        ],
        solution:
          "function countBy(items) {\n  const counts = {};\n  for (const item of items) {\n    counts[item] = (counts[item] ?? 0) + 1;\n  }\n  return counts;\n}\n",
      },
      validation: { type: "tests-pass", criteria: {} },
      hints: [
        "Start with <code>const counts = {};</code> and loop with <code>for (const item of items)</code>.",
        "Reading a key that is not there gives <code>undefined</code>, so default it: <code>(counts[item] ?? 0)</code>",
        "Then <code>counts[item] = (counts[item] ?? 0) + 1;</code> and return <code>counts</code>.",
      ],
    },
  },

  {
    id: "objects-deep-get",
    slug: "safely-read-a-nested-value",
    title: "Safely read a nested value",
    topics: ["objects", "optional chaining", "edge cases"],
    relatedModule: "modern-js",
    step: {
      id: "objects-deep-get",
      type: "code-challenge",
      difficulty: "advanced",
      instruction: {
        heading: "Safely read a nested value",
        body: "<p>Write <code>getIn(object, path, fallback)</code>. <code>path</code> is an array of keys to follow, like <code>[\"user\", \"address\", \"city\"]</code>. Return whatever is at the end of that path, or <code>fallback</code> if any step along the way is missing.</p><p>The whole difficulty is the word <em>any</em>. Walking the path is four lines; the work is deciding, at each step, whether it is safe to keep going. Reading a property off <code>undefined</code> throws, so you must check <em>before</em> you step, not after.</p><p>One test asks for a key whose value is genuinely <code>null</code>. Think about whether that should return <code>null</code> or the fallback, and make your code say what you decided.</p>",
        analogy:
          "Following directions in a building. At every door you check whether the room actually exists before walking through — otherwise you walk into a wall.",
        docLinks: [
          {
            label: "MDN: Optional chaining (?.)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining",
            type: "js-operator",
          },
          {
            label: "MDN: Property accessors",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — track a cursor, not a copy",
            body: "Keep one variable pointing at the current level and reassign it as you step down the path. If it ever becomes <code>null</code> or <code>undefined</code> before you have consumed the whole path, stop and return the fallback.",
          },
        ],
      },
      config: {
        type: "code-challenge",
        functionName: "getIn",
        language: "javascript",
        starterCode:
          "function getIn(object, path, fallback) {\n  // Walk the path one key at a time.\n  // Stop and return fallback the moment you cannot go deeper.\n}\n",
        tests: [
          {
            name: "reads a nested value",
            args: [{ user: { address: { city: "London" } } }, ["user", "address", "city"], "none"],
            expected: "London",
          },
          {
            name: "falls back on a missing middle step",
            args: [{ user: {} }, ["user", "address", "city"], "none"],
            expected: "none",
          },
          {
            name: "falls back on a missing first step",
            args: [{}, ["user", "address"], "none"],
            expected: "none",
          },
          {
            name: "an empty path returns the object itself",
            args: [{ a: 1 }, [], "none"],
            expected: { a: 1 },
          },
          {
            name: "reads a top-level value",
            args: [{ count: 0 }, ["count"], "none"],
            expected: 0,
          },
          {
            name: "does not mistake a real null for a missing key",
            args: [{ user: { middleName: null } }, ["user", "middleName"], "none"],
            expected: null,
          },
          {
            name: "handles a null object argument",
            args: [null, ["a"], "none"],
            expected: "none",
          },
        ],
        solution:
          "function getIn(object, path, fallback) {\n  let current = object;\n  for (const key of path) {\n    if (current === null || current === undefined) return fallback;\n    if (!(key in Object(current))) return fallback;\n    current = current[key];\n  }\n  return current;\n}\n",
      },
      validation: { type: "tests-pass", criteria: {} },
      hints: [
        "Use a cursor: <code>let current = object;</code> then reassign it inside a <code>for (const key of path)</code> loop.",
        "Before stepping, bail out: <code>if (current === null || current === undefined) return fallback;</code>",
        "For the real-<code>null</code> test, check whether the key <em>exists</em> (<code>key in Object(current)</code>) rather than whether its value is falsy.",
      ],
    },
  },

  {
    id: "objects-key-order",
    slug: "what-order-do-object-keys-come-out",
    title: "What order do object keys come out in?",
    topics: ["objects", "iteration", "spec detail"],
    relatedModule: "js-data-types",
    step: {
      id: "objects-key-order",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "What order do object keys come out in?",
        body: "<p>A developer builds an object with keys inserted in a deliberate order and is surprised by what <code>Object.keys</code> gives back.</p><p>This is a spec detail rather than something you can reason out from first principles — but it bites often enough to be worth knowing, especially when object keys come from user data or an API.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          'const scores = {};\nscores["banana"] = 1;\nscores[2] = 2;\nscores["apple"] = 3;\nscores[1] = 4;\n\nconsole.log(Object.keys(scores));',
        codeLanguage: "javascript",
        options: [
          {
            id: "integers-first",
            text: '<code>["1", "2", "banana", "apple"]</code>',
            correct: true,
            explanation:
              "Correct, and it surprises nearly everyone. The spec orders own string keys in two groups: <strong>integer-like keys first, in ascending numeric order</strong>, then all remaining string keys in insertion order. So <code>1</code> and <code>2</code> jump the queue and sort themselves, while <code>banana</code> and <code>apple</code> keep the order you added them. If order matters, use a <code>Map</code> — it preserves insertion order for every key type.",
          },
          {
            id: "insertion",
            text: '<code>["banana", "2", "apple", "1"]</code>',
            correct: false,
            explanation:
              "Pure insertion order is what you would get if every key were a non-integer string — and it is what most people assume. The integer-like keys break it.",
          },
          {
            id: "alphabetical",
            text: '<code>["1", "2", "apple", "banana"]</code>',
            correct: false,
            explanation:
              "The integer part is right, but string keys are <em>not</em> sorted alphabetically — they stay in insertion order, so <code>banana</code> comes before <code>apple</code> here.",
          },
          {
            id: "unspecified",
            text: "The order is unspecified and varies by engine",
            correct: false,
            explanation:
              "This was a reasonable belief years ago, but ES2015 pinned it down: <code>Object.keys</code>, <code>for...in</code> and <code>JSON.stringify</code> all follow the same defined order across engines.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Two of the four keys look like numbers. Does that matter?",
        "There are two groups, and only one of them is sorted.",
      ],
    },
  },

  {
    id: "objects-invert",
    slug: "invert-an-object",
    title: "Invert an object",
    topics: ["objects", "iteration"],
    relatedModule: "js-data-types",
    step: {
      id: "objects-invert",
      type: "code-challenge",
      difficulty: "easy",
      instruction: {
        heading: "Invert an object",
        body: "<p>Write <code>invert(object)</code> that swaps keys and values, so <code>{ a: \"1\", b: \"2\" }</code> becomes <code>{ \"1\": \"a\", \"2\": \"b\" }</code>.</p><p>Worth pausing on before you start: keys must be unique, but values need not be. Look at the duplicate-value test and decide what your loop will naturally do about it.</p>",
        docLinks: [
          {
            label: "MDN: Object.entries()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Object keys are always strings (or symbols). Assigning <code>result[1] = \"a\"</code> quietly stores the key as <code>\"1\"</code> — which is why the expected results here use string keys.",
          },
        ],
      },
      config: {
        type: "code-challenge",
        functionName: "invert",
        language: "javascript",
        starterCode: "function invert(object) {\n  // Swap each key with its value.\n}\n",
        tests: [
          { name: "swaps keys and values", args: [{ a: "1", b: "2" }], expected: { "1": "a", "2": "b" } },
          { name: "empty object", args: [{}], expected: {} },
          { name: "single pair", args: [{ only: "one" }], expected: { one: "only" } },
          { name: "a later duplicate value wins", args: [{ a: "x", b: "x" }], expected: { x: "b" } },
        ],
        solution:
          "function invert(object) {\n  const result = {};\n  for (const [key, value] of Object.entries(object)) {\n    result[value] = key;\n  }\n  return result;\n}\n",
      },
      validation: { type: "tests-pass", criteria: {} },
      hints: [
        "<code>Object.entries(object)</code> gives you an array of <code>[key, value]</code> pairs.",
        "Destructure in the loop head: <code>for (const [key, value] of Object.entries(object))</code>",
        "Assign the other way round: <code>result[value] = key;</code> — duplicates overwrite, so the last one wins on its own.",
      ],
    },
  },

  {
    id: "objects-optional-chaining-call",
    slug: "optional-chaining-on-a-method",
    title: "What does ?. do when the method is missing?",
    topics: ["objects", "optional chaining"],
    relatedModule: "modern-js",
    step: {
      id: "objects-optional-chaining-call",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "What does ?. do when the method is missing?",
        body: "<p>Optional chaining is usually shown reading properties. Here it is used to <em>call</em> something that may not exist.</p><p>Predict the two logged values before choosing.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          'const logger = {};\n\nconsole.log(logger.warn?.("careful"));\nconsole.log(logger.warn?.("careful") ?? "no logger");',
        codeLanguage: "javascript",
        options: [
          {
            id: "undefined-then-fallback",
            text: "<code>undefined</code>, then <code>no logger</code>",
            correct: true,
            explanation:
              "Correct. <code>?.()</code> checks whether the thing being called is <code>null</code> or <code>undefined</code>; if it is, the whole call expression short-circuits to <code>undefined</code> instead of throwing. The second line then swaps that <code>undefined</code> for the fallback via <code>??</code>. This pairing is the idiomatic way to make an optional callback safe.",
          },
          {
            id: "throws",
            text: "It throws <code>TypeError: logger.warn is not a function</code>",
            correct: false,
            explanation:
              "That is what plain <code>logger.warn(\"careful\")</code> would do. The <code>?.</code> before the parentheses exists precisely to prevent it.",
          },
          {
            id: "null",
            text: "<code>null</code>, then <code>null</code>",
            correct: false,
            explanation:
              "Short-circuiting always produces <code>undefined</code>, never <code>null</code>. And since <code>??</code> treats both as absent, the second line would still show the fallback.",
          },
          {
            id: "empty",
            text: "It logs nothing at all, because the call is skipped",
            correct: false,
            explanation:
              "The <em>call</em> is skipped, but <code>console.log</code> still runs and still receives a value — the expression evaluated to <code>undefined</code> rather than to nothing.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "What value does a short-circuited optional chain produce?",
        "<code>??</code> only replaces <code>null</code> and <code>undefined</code>.",
      ],
    },
  },

  {
    id: "objects-pick",
    slug: "pick-only-the-keys-you-need",
    title: "Pick only the keys you need",
    topics: ["objects", "filtering"],
    relatedModule: "js-functions",
    step: {
      id: "objects-pick",
      type: "code-challenge",
      difficulty: "intermediate",
      instruction: {
        heading: "Pick only the keys you need",
        body: "<p>Write <code>pick(object, keys)</code> that returns a new object containing only the listed keys. It is the function you reach for before sending an API response, so a password field cannot leak by accident.</p><p>The judgement call: what should happen for a requested key the object does not have? Adding it with <code>undefined</code> and leaving it out are both defensible — but they behave very differently downstream, and one of the tests pins down which one we want.</p>",
        docLinks: [
          {
            label: "MDN: Object.hasOwn()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — a key holding undefined still exists",
            body: "<code>{ a: undefined }</code> and <code>{}</code> look identical when you read <code>obj.a</code>, but they differ to <code>Object.keys</code>, to <code>JSON.stringify</code>, and to the deep-equality check these tests use. Test by key existence, not by value.",
          },
        ],
      },
      config: {
        type: "code-challenge",
        functionName: "pick",
        language: "javascript",
        starterCode:
          "function pick(object, keys) {\n  // Build a new object with only the requested keys.\n  // Skip any key the object does not actually have.\n}\n",
        tests: [
          { name: "keeps the requested keys", args: [{ a: 1, b: 2, c: 3 }, ["a", "c"]], expected: { a: 1, c: 3 } },
          { name: "an empty key list gives an empty object", args: [{ a: 1 }, []], expected: {} },
          { name: "omits keys that are not present", args: [{ a: 1 }, ["a", "zzz"]], expected: { a: 1 } },
          { name: "keeps a falsy value", args: [{ a: 0, b: 1 }, ["a"]], expected: { a: 0 } },
          {
            name: "does not mutate the source",
            expression: "const src = { a: 1, b: 2 }; pick(src, ['a']); return src;",
            expected: { a: 1, b: 2 },
          },
        ],
        solution:
          "function pick(object, keys) {\n  const result = {};\n  for (const key of keys) {\n    if (Object.hasOwn(object, key)) {\n      result[key] = object[key];\n    }\n  }\n  return result;\n}\n",
      },
      validation: { type: "tests-pass", criteria: {} },
      hints: [
        "Loop over <code>keys</code>, not over the object — you only care about what was asked for.",
        "Guard with <code>Object.hasOwn(object, key)</code> so missing keys are skipped entirely.",
        "Do not test with <code>if (object[key])</code> — that would drop the <code>0</code> in the falsy-value test.",
      ],
    },
  },
];
