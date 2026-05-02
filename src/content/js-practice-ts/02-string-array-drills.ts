import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-practice-ts-string-array-drills",
  slug: "string-array-drills",
  title: "String & Array Drills",
  description:
    "Rapid composition of slice, split, join, map, filter, and find. The methods you reach for every day in real codebases.",
  order: 2,
  steps: [
    {
      id: "drills-overview",
      type: "explanation",
      instruction: {
        heading: "The eight methods you'll use forever",
        body: "<p>Open any file in the React, Next.js, or VSCode source. You'll see the same handful of methods used over and over: <code>split</code>, <code>join</code>, <code>slice</code>, <code>map</code>, <code>filter</code>, <code>find</code>, <code>some</code>, <code>includes</code>. Master these and you can transform almost any data shape.</p><p>This lesson is rapid-fire practice. Each drill is small. Don't overthink — just type.</p>",
        docLinks: [
          {
            label: "Array methods (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_methods",
            type: "js-method",
          },
          {
            label: "String methods (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#instance_methods",
            type: "js-method",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "extract-username",
      type: "gap-fill",
      instruction: {
        heading: "Extract the username from an email",
        body: '<p>Given <code>"alice@gmail.com"</code>, extract <code>"alice"</code>. Real apps do this when displaying a profile placeholder before the user fills in their name.</p>',
      },
      config: {
        type: "gap-fill",
        template:
          'const email = "alice@gmail.com";\n\nconst username = email.{{method}}("@"){{index}};\n\nconsole.log(username); // "alice"',
        gaps: [
          { id: "method", placeholder: "method", acceptedAnswers: ["split"], caseSensitive: true },
          { id: "index", placeholder: "index", acceptedAnswers: ["[0]"], caseSensitive: true },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["method", "index"] } },
      hints: [
        "<code>split</code> turns a string into an array, splitting at every occurrence of the separator.",
        "After splitting, the part before <code>@</code> is at index <code>0</code>.",
      ],
    },
    {
      id: "uppercase-fruits",
      type: "js-console",
      instruction: {
        heading: "Uppercase and join an array",
        body: '<p>Turn <code>["apple", "banana", "cherry"]</code> into the single string <code>"APPLE, BANANA, CHERRY"</code>.</p>',
      },
      config: {
        type: "js-console",
        starterCode:
          'const fruits = ["apple", "banana", "cherry"];\n\n// Build the result string here:\nconst result = /* your code */;\n\nconsole.log(result);',
        expectedOutput: ["APPLE, BANANA, CHERRY"],
      },
      validation: {
        type: "console-output-match",
        criteria: { expected: ["APPLE, BANANA, CHERRY"] },
      },
      hints: [
        "<code>map</code> lets you transform every item.",
        "<code>.toUpperCase()</code> uppercases a string.",
        '<code>.join(", ")</code> glues an array into a string with the given separator.',
        'One liner: <code>fruits.map(f =&gt; f.toUpperCase()).join(", ")</code>.',
      ],
    },
    {
      id: "filter-then-map",
      type: "js-console",
      instruction: {
        heading: "Filter to evens, then square them",
        body: "<p>Two-stage transform: from <code>[1, 2, 3, 4, 5, 6]</code>, keep only the even numbers, then square each one. Expected output: <code>[ 4, 16, 36 ]</code>.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "<code>filter</code> and <code>map</code> are pure — they always return a NEW array. The original is untouched. This is exactly why React's reducer patterns lean on them.",
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode:
          'const nums = [1, 2, 3, 4, 5, 6];\n\nconst result = /* filter then map */;\n\nconsole.log(result); // [ 4, 16, 36 ]',
        expectedOutput: ["[ 4, 16, 36 ]"],
      },
      validation: {
        type: "console-output-match",
        criteria: { expected: ["[ 4, 16, 36 ]"] },
      },
      hints: [
        "Use <code>.filter(n =&gt; n % 2 === 0)</code> to keep evens.",
        "Then chain <code>.map(n =&gt; n * n)</code>.",
        "Full expression: <code>nums.filter(n =&gt; n % 2 === 0).map(n =&gt; n * n)</code>.",
      ],
    },
    {
      id: "find-adult",
      type: "gap-fill",
      instruction: {
        heading: "Find the first adult",
        body: "<p><code>find</code> returns the FIRST item matching a predicate, or <code>undefined</code>. Use it to find the first user with <code>age &gt; 18</code> in the array below.</p>",
        docLinks: [
          {
            label: "Array.prototype.find (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template:
          'const users = [\n  { name: "Kim", age: 12 },\n  { name: "Lila", age: 17 },\n  { name: "Mo", age: 23 },\n  { name: "Nia", age: 30 },\n];\n\nconst firstAdult = users.{{method}}(u =&gt; u.{{prop}} {{op}} 18);\n\nconsole.log(firstAdult.name); // "Mo"',
        gaps: [
          { id: "method", placeholder: "method", acceptedAnswers: ["find"], caseSensitive: true },
          { id: "prop", placeholder: "property", acceptedAnswers: ["age"], caseSensitive: true },
          { id: "op", placeholder: "operator", acceptedAnswers: [">", ">="], caseSensitive: true },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["method", "prop", "op"] } },
      hints: [
        "<code>find</code> returns the first match.",
        "We're checking the <code>age</code> property of each user.",
        "An adult is older than 18 — use <code>&gt;</code>.",
      ],
    },
    {
      id: "slug-maker",
      type: "free-edit",
      instruction: {
        heading: "Build a slug-maker",
        body: '<p>Slugs are the URL-friendly versions of titles you see at the end of every blog URL: <code>my-first-post</code>, not <code>My First Post!</code>.</p><p>Write a function <code>slugify(title)</code> that returns the lowercase, hyphenated version. <code>slugify("Hello World!")</code> should return <code>"hello-world"</code>.</p>',
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Real slug libraries (like GitHub\'s) also strip punctuation and accents. For this drill, lowercasing and replacing spaces with hyphens is enough — but punctuation like <code>!</code> should be removed.",
          },
        ],
      },
      config: {
        type: "free-edit",
        language: "javascript",
        starterCode:
          'function slugify(title) {\n  // 1. Lowercase the title\n  // 2. Remove punctuation (keep letters, numbers, and spaces)\n  // 3. Replace spaces with hyphens\n  // Your code here\n}\n\nconsole.log(slugify("Hello World!"));   // "hello-world"\nconsole.log(slugify("My First Post"));  // "my-first-post"',
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["toLowerCase", "replace"] },
      },
      hints: [
        "Start with <code>title.toLowerCase()</code>.",
        'Use <code>.replace(/[^a-z0-9 ]/g, "")</code> to strip non-alphanumerics.',
        'Then <code>.replace(/ +/g, "-")</code> turns spaces into hyphens.',
        'One pipeline: <code>title.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/ +/g, "-")</code>.',
      ],
    },
  ],
};
