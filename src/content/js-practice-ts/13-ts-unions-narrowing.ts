import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-practice-ts-ts-unions-narrowing",
  slug: "ts-unions-narrowing",
  title: "Unions & Narrowing",
  description:
    "Model values that can be one of several shapes with union types, then narrow them with typeof and discriminated unions.",
  order: 13,
  steps: [
    {
      id: "why-unions",
      type: "explanation",
      instruction: {
        heading: "When a value can be more than one thing",
        body: "<p>Some values genuinely have more than one type. An ID might be a string in one API and a number in another. A status field might be one of three exact strings. A function might return a result OR an error.</p><p>Union types model this with <code>|</code>: <code>string | number</code>, <code>\"loading\" | \"success\" | \"error\"</code>, <code>Result | ApiError</code>.</p><p>Once you have a union, <strong>narrowing</strong> is how TypeScript lets you safely use it: by checking the type at runtime, the compiler knows which branch you’re in.</p>",
        docLinks: [
          {
            label: "Union types (TS handbook)",
            url: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "annotate-union",
      type: "gap-fill",
      instruction: {
        heading: "Annotate a string-or-number id",
        body: "<p>Some APIs return numeric IDs, others return strings. Annotate the parameter to accept either.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          'function lookupUser(id: {{a}}): void {\n  console.log(`Looking up user ${id}`);\n}\n\nlookupUser(7);\nlookupUser("user_abc");',
        gaps: [
          {
            id: "a",
            placeholder: "union type",
            acceptedAnswers: ["string | number", "number | string"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["a"] } },
      hints: [
        "Two types separated by <code>|</code>.",
      ],
    },
    {
      id: "narrowing-typeof",
      type: "explanation",
      instruction: {
        heading: "Narrowing with typeof",
        body: "<p>If you call <code>.toUpperCase()</code> on a <code>string | number</code>, TypeScript stops you — numbers don’t have <code>.toUpperCase</code>. The fix is a runtime check: inside <code>if (typeof x === \"string\")</code>, TypeScript knows <code>x</code> is a <code>string</code> and lets you call string methods. In the <code>else</code> branch, it knows <code>x</code> is a <code>number</code>.</p><p>This is <strong>narrowing</strong>, and it’s the single most-used pattern in real TypeScript code.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "TypeScript understands many narrowing patterns: <code>typeof</code>, <code>instanceof</code>, <code>in</code>, equality checks (<code>x === null</code>), and user-defined type guards (<code>function isUser(x: unknown): x is User</code>). Without narrowing, union types would be unusable.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'function formatId(id: string | number): string {\n  if (typeof id === "string") {\n    return id.toUpperCase();   // TS knows id is string here\n  }\n  return id.toString();        // TS knows id is number here\n}\n\nconsole.log(formatId("abc")); // "ABC"\nconsole.log(formatId(42));    // "42"',
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "build-format-id",
      type: "free-edit",
      instruction: {
        heading: "Build formatId yourself",
        body: "<p>Write <code>formatId(id: string | number): string</code>. If <code>id</code> is a string, return it uppercased. If it’s a number, return its <code>.toString()</code>.</p>",
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode:
          'function formatId(id: string | number): string {\n  // narrow with typeof\n}\n\n// formatId("abc") -> "ABC"\n// formatId(42)    -> "42"',
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["typeof", "string | number", "toUpperCase"] },
      },
      hints: [
        '<code>if (typeof id === "string")</code> narrows to string.',
        "Outside the <code>if</code>, TS knows it’s a number.",
      ],
    },
    {
      id: "discriminated-unions",
      type: "explanation",
      instruction: {
        heading: "Discriminated unions: the Result pattern",
        body: "<p>The most powerful union pattern is the <em>discriminated union</em>: each variant has a literal-typed field that uniquely identifies which one it is.</p><p>The classic shape is <code>Result&lt;T, E&gt;</code>:</p><pre><code>type Result&lt;T, E&gt; =\n  | { ok: true; data: T }\n  | { ok: false; error: E };</code></pre><p>Once you check <code>if (result.ok)</code>, TypeScript narrows the type and lets you read <code>result.data</code> in the success branch and <code>result.error</code> in the failure branch. This is what makes Rust-style error handling pleasant in TS.</p>",
        docLinks: [
          {
            label: "Discriminated unions (TS handbook)",
            url: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'type ApiResult =\n  | { ok: true;  data: { id: number; name: string } }\n  | { ok: false; error: string };\n\nfunction handle(r: ApiResult) {\n  if (r.ok) {\n    // r is narrowed to the success variant — r.data is safe\n    console.log(`Got ${r.data.name}`);\n  } else {\n    // r is narrowed to the failure variant — r.error is safe\n    console.log(`Failed: ${r.error}`);\n  }\n}\n\nhandle({ ok: true,  data: { id: 1, name: "Asha" } });\nhandle({ ok: false, error: "404" });',
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "consume-result",
      type: "gap-fill",
      instruction: {
        heading: "Read the right field",
        body: "<p>Given the <code>ApiResult</code> from the demo, fill in which field is safe to read in each branch.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          'function handle(r: ApiResult) {\n  if (r.ok) {\n    console.log(r.{{a}});  // success branch\n  } else {\n    console.log(r.{{b}});  // failure branch\n  }\n}',
        gaps: [
          { id: "a", placeholder: "field", acceptedAnswers: ["data"], caseSensitive: true },
          { id: "b", placeholder: "field", acceptedAnswers: ["error"], caseSensitive: true },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["a", "b"] } },
      hints: [
        "Success variant has <code>data</code>; failure variant has <code>error</code>.",
      ],
    },
    {
      id: "shape-area",
      type: "free-edit",
      instruction: {
        heading: "Shape area with a discriminated union",
        body: "<p>Define <code>type Shape</code> as a union of <code>Circle</code>, <code>Square</code>, and <code>Triangle</code>, each with a <code>kind</code> string literal. Then write <code>area(shape: Shape): number</code> using a <code>switch</code> on <code>kind</code>.</p><ul><li>Circle: <code>{ kind: \"circle\"; radius: number }</code></li><li>Square: <code>{ kind: \"square\"; size: number }</code></li><li>Triangle: <code>{ kind: \"triangle\"; base: number; height: number }</code></li></ul>",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Inside <code>switch (shape.kind)</code>, each <code>case</code> branch narrows <code>shape</code> to the matching variant. If you add a new variant later and forget a case, TypeScript can flag it via the <code>never</code> type — the compiler is your safety net.",
          },
        ],
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode:
          'type Shape =\n  | { kind: "circle";   radius: number }\n  | { kind: "square";   size:   number }\n  | { kind: "triangle"; base:   number; height: number };\n\nfunction area(shape: Shape): number {\n  switch (shape.kind) {\n    // case "circle":   return Math.PI * shape.radius * shape.radius;\n    // case "square":   return ...\n    // case "triangle": return ...\n  }\n}\n\n// area({ kind: "circle", radius: 1 })          -> ~3.14\n// area({ kind: "square", size: 4 })            -> 16\n// area({ kind: "triangle", base: 4, height: 3 }) -> 6',
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["Shape", "kind", "switch", "case"] },
      },
      hints: [
        '<code>case "circle":</code> narrows to the circle variant — <code>shape.radius</code> is now safe.',
        "Square area is <code>shape.size * shape.size</code>; triangle is <code>0.5 * shape.base * shape.height</code>.",
      ],
    },
  ],
};
