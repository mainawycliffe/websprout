import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-practice-ts-modern-features-drills",
  slug: "modern-features-drills",
  title: "Modern JS Features Drills",
  description:
    "Optional chaining, nullish coalescing, destructuring, spread, Object.entries, JSON, and try/catch — the features in every real codebase.",
  order: 6,
  steps: [
    {
      id: "modern-intro",
      type: "explanation",
      instruction: {
        heading: "The features you’ll see every day",
        body: "<p>If you open a real production codebase — Next.js, Stripe Checkout, the VSCode extension API — you will see the same modern features over and over: <code>?.</code>, <code>??</code>, destructuring, spread, <code>Object.entries</code>, <code>JSON.parse</code>, and <code>try</code>/<code>catch</code>.</p><p>This lesson drills each of them.</p>",
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "optional-chain",
      type: "explanation",
      instruction: {
        heading: "Optional chaining ?.",
        body: "<p><code>user?.address?.city</code> reads <code>city</code> only if both <code>user</code> and <code>address</code> are non-nullish (not <code>null</code> or <code>undefined</code>). If anything in the chain is missing, the whole expression returns <code>undefined</code> instead of throwing.</p><p>It also works on function calls: <code>onClick?.(event)</code> calls <code>onClick</code> only if it exists.</p>",
        docLinks: [
          {
            label: "Optional chaining (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining",
            type: "js-operator",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'const userA = { name: "Asha", address: { city: "Nairobi" } };\nconst userB = { name: "Ben" }; // no address\n\nconsole.log(userA?.address?.city); // "Nairobi"\nconsole.log(userB?.address?.city); // undefined\n\nfunction notify(callback) {\n  callback?.("hello"); // only calls if defined\n}\nnotify();              // no error\nnotify(msg => console.log(msg)); // "hello"',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "nullish-coalescing",
      type: "gap-fill",
      instruction: {
        heading: "?? vs ||",
        body: "<p><code>a ?? b</code> returns <code>b</code> only when <code>a</code> is <code>null</code> or <code>undefined</code>. <code>a || b</code> returns <code>b</code> when <code>a</code> is any falsy value — including <code>0</code>, <code>\"\"</code>, and <code>false</code>.</p><p>If <code>0</code> or empty string are valid values, <code>||</code> silently replaces them. <code>??</code> doesn’t. Pick the right one.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "When defaulting numeric inputs (volume, price, page count), reach for <code>??</code>. <code>page || 1</code> turns a real <code>0</code> into <code>1</code>, hiding bugs. <code>page ?? 1</code> only kicks in when <code>page</code> is missing.",
          },
        ],
        docLinks: [
          {
            label: "Nullish coalescing (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing",
            type: "js-operator",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template:
          '// volume can be 0 (muted) — that\'s a valid value!\nconst volume = 0;\n\nconst withOr = volume {{op1}} 50;     // wrong: turns 0 into 50\nconst withNullish = volume {{op2}} 50; // right: keeps 0\n\nconsole.log(withOr);      // 50\nconsole.log(withNullish); // 0',
        gaps: [
          { id: "op1", placeholder: "operator", acceptedAnswers: ["||"], caseSensitive: true },
          { id: "op2", placeholder: "operator", acceptedAnswers: ["??"], caseSensitive: true },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["op1", "op2"] } },
      hints: [
        "<code>||</code> uses falsiness — it treats <code>0</code> as missing.",
        "<code>??</code> only treats <code>null</code> and <code>undefined</code> as missing.",
      ],
    },
    {
      id: "destructuring-patterns",
      type: "js-console",
      instruction: {
        heading: "Destructure with rename, default, and nested",
        body: "<p>Destructuring lets you pull values out of objects and arrays in one line. You can rename, set defaults, and even reach into nested fields.</p>",
        docLinks: [
          {
            label: "Destructuring (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode:
          'const response = {\n  data: { user: { id: 7, name: "Sara" } },\n  meta: { lang: "en" },\n};\n\n// Pull out user.id (rename to userId), user.name, and meta.lang (default to "?")\n// using ONE destructuring statement.\nconst /* your destructure */ = response;\n\nconsole.log(userId);  // 7\nconsole.log(name);    // "Sara"\nconsole.log(lang);    // "en"',
        expectedOutput: ["7", "Sara", "en"],
      },
      validation: {
        type: "console-output-match",
        criteria: { expected: ["7", "Sara", "en"] },
      },
      hints: [
        "Nested destructure: <code>{ data: { user: { ... } } }</code>.",
        'Rename: <code>{ id: userId }</code>.',
        'Default: <code>{ lang = "?" }</code>.',
        'Full pattern: <code>const { data: { user: { id: userId, name } }, meta: { lang = "?" } } = response;</code>',
      ],
    },
    {
      id: "object-entries",
      type: "js-console",
      instruction: {
        heading: "Object.entries → transform → Object.fromEntries",
        body: "<p>The classic round-trip: turn an object into an array of <code>[key, value]</code> pairs, transform each pair with <code>map</code>, and turn it back into an object.</p><p>Below, double every value in a price list.</p>",
        docLinks: [
          {
            label: "Object.entries (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries",
            type: "js-method",
          },
          {
            label: "Object.fromEntries (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode:
          'const prices = { apple: 1, banana: 2, mango: 3 };\n\nconst doubled = /* entries -> map -> fromEntries */;\n\nconsole.log(doubled.apple);  // 2\nconsole.log(doubled.banana); // 4\nconsole.log(doubled.mango);  // 6',
        expectedOutput: ["2", "4", "6"],
      },
      validation: {
        type: "console-output-match",
        criteria: { expected: ["2", "4", "6"] },
      },
      hints: [
        "<code>Object.entries(prices)</code> yields <code>[[\"apple\", 1], ...]</code>.",
        "<code>.map(([k, v]) =&gt; [k, v * 2])</code> doubles each value.",
        "<code>Object.fromEntries(...)</code> rebuilds an object.",
      ],
    },
    {
      id: "json-roundtrip",
      type: "explanation",
      instruction: {
        heading: "JSON.parse and JSON.stringify",
        body: "<p>Browsers, APIs, and <code>localStorage</code> all speak JSON. Two methods cover 95% of usage:</p><ul><li><code>JSON.stringify(value)</code> — turns a value into a JSON string. <code>undefined</code> values are <strong>dropped</strong>; <code>null</code> is preserved.</li><li><code>JSON.parse(text)</code> — turns a JSON string back into a value. Throws if the text is not valid JSON, so wrap in <code>try</code>/<code>catch</code> at trust boundaries.</li></ul>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "<code>JSON.stringify({ a: 1, b: undefined, c: null })</code> returns <code>'{\"a\":1,\"c\":null}'</code> — the <code>undefined</code> field disappears. This is why APIs use <code>null</code> for explicit absence.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'const user = { name: "Asha", age: 30, nickname: undefined };\n\nconst text = JSON.stringify(user);\nconsole.log(text); // \'{"name":"Asha","age":30}\'  — nickname dropped\n\nconst parsed = JSON.parse(text);\nconsole.log(parsed.name); // "Asha"',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "safe-parse",
      type: "free-edit",
      instruction: {
        heading: "Build a safe user-record loader",
        body: '<p>You receive a JSON string with user records. Some entries may be malformed JSON. Parse what you can, skip the rest, and return a <code>Map&lt;string, User&gt;</code> keyed by email.</p><p>You\'ll combine: <code>JSON.parse</code>, <code>try</code>/<code>catch</code>, <code>Map</code>, optional chaining.</p>',
      },
      config: {
        type: "free-edit",
        language: "javascript",
        starterCode:
          'const lines = [\n  \'{"email":"asha@x.com","name":"Asha"}\',\n  \'NOT JSON\',\n  \'{"email":"ben@x.com","name":"Ben"}\',\n  \'{"email":"cleo@x.com"}\',\n];\n\nfunction loadUsers(lines) {\n  const out = new Map();\n  // for each line: try JSON.parse. If it throws, skip.\n  // If parsed.email exists, set the entry.\n  return out;\n}\n\nconst users = loadUsers(lines);\nconsole.log(users.size);                    // 3\nconsole.log(users.get("asha@x.com").name);  // "Asha"\nconsole.log(users.get("cleo@x.com")?.name); // undefined',
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["try", "catch", "JSON.parse", "Map"] },
      },
      hints: [
        "Wrap <code>JSON.parse(line)</code> in a <code>try</code>/<code>catch</code> and <code>continue</code> on error.",
        "Check <code>parsed?.email</code> before adding.",
        "<code>out.set(parsed.email, parsed);</code>",
      ],
    },
  ],
};
