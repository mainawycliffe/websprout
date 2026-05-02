import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-practice-ts-ts-generics-basics",
  slug: "ts-generics-basics",
  title: "Generics: Reusable Types",
  description:
    "<T> for reusable types. Generic functions, generic classes, and constraining generics with extends.",
  order: 14,
  steps: [
    {
      id: "why-generics",
      type: "explanation",
      instruction: {
        heading: "The motivation: don’t lose information",
        body: "<p>Without generics, a function that returns the first item of an array is forced to either:</p><ul><li>Lock to a specific type (<code>function first(arr: number[]): number</code>) — only works for numbers.</li><li>Use <code>any</code> or <code>unknown</code> — works for everything but loses the type information the caller had.</li></ul><p>Generics let the function say: &quot;I don’t care what <code>T</code> is, but the array of <code>T</code>s I take and the <code>T</code> I return have to be the same type.&quot;</p><pre><code>function first&lt;T&gt;(arr: T[]): T | undefined {\n  return arr[0];\n}</code></pre><p>This is exactly how <code>Array.prototype.map</code> is typed in TypeScript’s built-in library — generic over the element type.</p>",
        docLinks: [
          {
            label: "Generics (TS handbook)",
            url: "https://www.typescriptlang.org/docs/handbook/2/generics.html",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'function first<T>(arr: T[]): T | undefined {\n  return arr[0];\n}\n\nconst a = first([1, 2, 3]);            // T = number, a is number | undefined\nconst b = first(["x", "y"]);           // T = string, b is string | undefined\nconst c = first<boolean>([true, false]); // explicit T (rare)',
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fill-last",
      type: "gap-fill",
      instruction: {
        heading: "Build last<T>",
        body: "<p>Fill the generic slots so <code>last</code> returns the last element of any array, preserving its type.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          'function last{{a}}(arr: {{b}}): {{c}} | undefined {\n  return arr[arr.length - 1];\n}\n\n// last([1, 2, 3])     -> 3   (T = number)\n// last(["a", "b"])    -> "b" (T = string)',
        gaps: [
          { id: "a", placeholder: "type parameter", acceptedAnswers: ["<T>"], caseSensitive: true },
          { id: "b", placeholder: "array type", acceptedAnswers: ["T[]", "Array<T>"], caseSensitive: true },
          { id: "c", placeholder: "element type", acceptedAnswers: ["T"], caseSensitive: true },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["a", "b", "c"] } },
      hints: [
        "Type parameter goes between <code>last</code> and the parameter list, in angle brackets.",
        "<code>T[]</code> is the array type. The return is <code>T | undefined</code> because the array could be empty.",
      ],
    },
    {
      id: "use-first-last",
      type: "free-edit",
      instruction: {
        heading: "Use the typed helpers",
        body: "<p>Use <code>first</code> and <code>last</code> on a few different arrays. Make at least one call where TypeScript correctly infers the element type for you (no explicit <code>&lt;T&gt;</code> needed).</p>",
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode:
          'function first<T>(arr: T[]): T | undefined {\n  return arr[0];\n}\n\nfunction last<T>(arr: T[]): T | undefined {\n  return arr[arr.length - 1];\n}\n\n// Call them with different array types and assign the results to constants.\nconst firstNumber = /* ... */;\nconst lastFruit   = /* ... */;\n\n// In a real editor you would hover over firstNumber and see "number | undefined"',
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["first", "last"] },
      },
      hints: [
        "<code>const firstNumber = first([10, 20, 30]);</code> — TS infers <code>T = number</code>.",
        '<code>const lastFruit = last(["apple", "banana"]);</code> — TS infers <code>T = string</code>.',
      ],
    },
    {
      id: "constrained-generic",
      type: "explanation",
      instruction: {
        heading: "Constraining a generic with extends",
        body: "<p>Without a constraint, a generic type variable can be anything. Sometimes you need it to be a bit more specific.</p><p>The classic example is <code>pluck</code>: read a property from any object.</p><pre><code>function pluck&lt;T, K extends keyof T&gt;(obj: T, key: K): T[K] {\n  return obj[key];\n}</code></pre><p><code>K extends keyof T</code> means &quot;<code>K</code> must be one of the keys of <code>T</code>&quot;. Then <code>T[K]</code> (an indexed-access type) is the type of the value at that key. Try to call <code>pluck(user, \"missing\")</code> and TypeScript catches it.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "If your generic doesn’t constrain anything, it’s effectively <code>any</code>. Constraints (<code>extends</code>) are how generics gain teeth. The pattern <code>K extends keyof T</code> is one you’ll write dozens of times in real codebases.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'function pluck<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\nconst user = { id: 1, name: "Asha", age: 30 };\n\nconst id   = pluck(user, "id");   // number\nconst name = pluck(user, "name"); // string\n// const bad = pluck(user, "nope"); // Error: "nope" is not a key of user',
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "use-pluck",
      type: "free-edit",
      instruction: {
        heading: "Use pluck on a Product",
        body: "<p>Define a small <code>Product</code> object and use <code>pluck</code> on at least two different keys. Try writing a third call with a wrong key as a comment and explain in your code that TypeScript would reject it.</p>",
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode:
          'function pluck<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\nconst product = {\n  id: 1,\n  title: "Linen Pillow",\n  priceCents: 1999,\n};\n\n// const title = pluck(product, "title");\n// const price = pluck(product, "priceCents");\n// const bad   = pluck(product, "discount"); // TS would reject this',
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["pluck", "product"] },
      },
      hints: [
        '<code>const title = pluck(product, "title");</code>',
        "Hover (in a real editor) to see <code>title</code> typed as <code>string</code>.",
      ],
    },
    {
      id: "stack-class",
      type: "free-edit",
      instruction: {
        heading: "Build a typed Stack<T>",
        body: "<p>Generic classes are written with <code>&lt;T&gt;</code> after the class name. Build a stack with the operations <code>push</code>, <code>pop</code>, <code>peek</code>, and <code>size</code>. Internally, store the items as <code>T[]</code>.</p><p>This revisits the class lesson from earlier — but now the type system carries the element type all the way through.</p>",
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode:
          'class Stack<T> {\n  // private #items: T[] = [];\n\n  push(item: T): void { /* ... */ }\n  pop():  T | undefined { /* ... */ }\n  peek(): T | undefined { /* ... */ }\n  size(): number        { /* ... */ }\n}\n\nconst nums = new Stack<number>();\nnums.push(1);\nnums.push(2);\n// nums.pop() should be 2; nums.peek() should be 1; nums.size() should be 1.\n\nconst words = new Stack<string>();\nwords.push("hello");\n// words.peek() should be "hello"',
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["class", "Stack", "<T>", "push", "pop"] },
      },
      hints: [
        "<code>private #items: T[] = [];</code> stores the elements.",
        "<code>push</code> calls <code>this.#items.push(item)</code>.",
        "<code>pop</code> calls <code>this.#items.pop()</code> — already returns <code>T | undefined</code>.",
        "<code>peek</code> returns <code>this.#items[this.#items.length - 1]</code>.",
      ],
    },
  ],
};
