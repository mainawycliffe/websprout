import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-practice-ts-ts-why-and-types",
  slug: "ts-why-and-types",
  title: "Why TypeScript? Basic Types",
  description:
    "What TypeScript adds, why VSCode and Slack are written in it, and how to annotate the basics: string, number, boolean, arrays, objects, and function signatures.",
  order: 11,
  steps: [
    {
      id: "why-ts",
      type: "explanation",
      instruction: {
        heading: "Why TypeScript exists",
        body: "<p>Microsoft started TypeScript in 2012 because the VSCode codebase grew too big to keep in any one developer’s head. They needed types as a tool for navigation, refactoring, and catching typos before they shipped.</p><p>Today TypeScript is the default for serious frontend work. <strong>VSCode</strong>, <strong>Slack</strong>, <strong>Airbnb</strong>, <strong>Bloomberg Terminal</strong>, <strong>Discord</strong>, and the <strong>Next.js, React, and Vue</strong> source code itself — all TypeScript.</p><p>The pitch in one sentence: TypeScript catches <code>user.nme</code> as a typo before the code runs, and lets your editor offer accurate autocomplete on every variable.</p>",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "TypeScript is a superset of JavaScript: every valid <code>.js</code> file is a valid <code>.ts</code> file. The TypeScript compiler erases all type information at build time — runtime behaviour is identical to plain JavaScript. The browser never sees a single type annotation.",
          },
        ],
        docLinks: [
          {
            label: "TypeScript handbook",
            url: "https://www.typescriptlang.org/docs/handbook/intro.html",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "annotation-syntax",
      type: "explanation",
      instruction: {
        heading: "Annotation syntax",
        body: "<p>You annotate a variable with <code>: type</code> after the name. For function parameters and return types, the same syntax works.</p><p>TypeScript can also <em>infer</em> types — if you write <code>let count = 0;</code> the compiler knows <code>count</code> is a <code>number</code>. Most variables don’t need explicit annotations; functions are where annotations earn their keep.</p>",
      },
      config: {
        type: "explanation",
        demoCode:
          '// Variable annotations\nlet age: number = 25;\nlet name: string = "Asha";\nlet isAdmin: boolean = false;\n\n// Inference — same effect, no annotation needed\nlet count = 0;        // inferred number\nlet greeting = "hi";  // inferred string\n\n// Function: parameters and return type\nfunction add(a: number, b: number): number {\n  return a + b;\n}\n\n// Arrow with annotations\nconst multiply = (a: number, b: number): number => a * b;',
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "annotate-three",
      type: "gap-fill",
      instruction: {
        heading: "Annotate three variables",
        body: "<p>Pick the right type annotation for each variable.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          'let firstName: {{a}} = "Wanjiru";\nlet price: {{b}} = 1250;\nlet inStock: {{c}} = true;',
        gaps: [
          { id: "a", placeholder: "type", acceptedAnswers: ["string"], caseSensitive: true },
          { id: "b", placeholder: "type", acceptedAnswers: ["number"], caseSensitive: true },
          { id: "c", placeholder: "type", acceptedAnswers: ["boolean"], caseSensitive: true },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["a", "b", "c"] } },
      hints: [
        "Lowercase: <code>string</code>, <code>number</code>, <code>boolean</code>. Capitalised <code>String</code>/<code>Number</code> are different (and rarely correct).",
      ],
    },
    {
      id: "array-and-object-types",
      type: "explanation",
      instruction: {
        heading: "Arrays and objects",
        body: "<p>Arrays use <code>T[]</code> or the equivalent <code>Array&lt;T&gt;</code>. Object types are written inline with field names and types.</p>",
      },
      config: {
        type: "explanation",
        demoCode:
          '// Array of numbers\nconst scores: number[] = [10, 20, 30];\n\n// Equivalent generic syntax\nconst scoresAlt: Array<number> = [10, 20, 30];\n\n// Array of strings\nconst tags: string[] = ["react", "ts"];\n\n// Inline object type\nlet user: { id: number; name: string } = { id: 1, name: "Asha" };\n\n// Function returning an object\nfunction makePoint(x: number, y: number): { x: number; y: number } {\n  return { x, y };\n}',
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "annotate-array-and-user",
      type: "gap-fill",
      instruction: {
        heading: "Annotate the collection types",
        body: "<p>Add the right annotations.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          'const tags: {{a}} = ["react", "ts", "next"];\n\nconst user: { id: {{b}}; name: {{c}} } = {\n  id: 7,\n  name: "Sara",\n};',
        gaps: [
          { id: "a", placeholder: "array type", acceptedAnswers: ["string[]", "Array<string>"], caseSensitive: true },
          { id: "b", placeholder: "type", acceptedAnswers: ["number"], caseSensitive: true },
          { id: "c", placeholder: "type", acceptedAnswers: ["string"], caseSensitive: true },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["a", "b", "c"] } },
      hints: [
        "<code>string[]</code> is the typical way to write &quot;array of strings&quot;.",
      ],
    },
    {
      id: "type-a-function",
      type: "free-edit",
      instruction: {
        heading: "Convert a JS function to TypeScript",
        body: "<p>Take this plain JavaScript <code>formatUser</code> function and add type annotations. Annotate every parameter and the return type. The function should accept a user object and a boolean for whether to capitalise.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "TypeScript code in this lesson is for reading and editing only — there’s no transpiler attached to the lesson runner here. The validation checks for the presence of correct annotations.",
          },
        ],
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode:
          '// Add types: user is { name: string; age: number }, capitalise is boolean,\n// and the function returns a string.\nfunction formatUser(user, capitalise) {\n  const name = capitalise ? user.name.toUpperCase() : user.name;\n  return `${name} (${user.age})`;\n}\n\n// Example usage that should type-check:\n// formatUser({ name: "Asha", age: 30 }, true)',
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["string", "number", "boolean", ":"] },
      },
      hints: [
        '<code>function formatUser(user: { name: string; age: number }, capitalise: boolean): string</code>',
        "Don’t forget the return type — TypeScript will infer it, but writing it makes the contract explicit.",
      ],
    },
  ],
};
