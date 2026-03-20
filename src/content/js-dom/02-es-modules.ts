import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-dom-es-modules",
  slug: "es-modules",
  title: "ES Modules: Import & Export",
  description:
    "Learn how to split your JavaScript into organized, reusable files using the modern module system.",
  order: 2,
  steps: [
    {
      id: "why-modules-exist",
      type: "explanation",
      instruction: {
        heading: "Why modules exist",
        body: "In the early days of the web, all JavaScript went into one giant file. As websites grew, this became a nightmare — thousands of lines of code, naming collisions (two functions with the same name overwriting each other), and no clear way to organize things. Modules solve this by letting you split code into separate files, each with its own scope. A module only exposes what it explicitly exports, and other files only get what they explicitly import.\n\nThis is how every large JavaScript project is organized today. Google, YouTube, Amazon — they all use modules to manage millions of lines of code split across thousands of files.",
        analogy:
          "Modules are like departments in a company. The Accounting department exports financial reports. The Marketing department imports those reports when they need the numbers. Each department keeps its internal work private — Marketing doesn't see Accounting's scratch calculations, only the finished report.",
        docLinks: [
          {
            label: "JavaScript modules",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "ES Modules (ESM) were introduced in ES2015 (ES6) and are now the official standard module system for JavaScript. Browsers support them natively with `<script type=\"module\">`. Older systems like CommonJS (`require()`) are still used in Node.js but are not the browser standard.",
          },
        ],
      },
      config: {
        type: "explanation",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "named-exports",
      type: "explanation",
      instruction: {
        heading: "Exporting: sharing code from a file",
        body: "To make a function, variable, or class available to other files, you use the `export` keyword. Named exports let you export multiple things from one file. You can either put `export` in front of the declaration, or list everything at the bottom in an export statement.\n\nEach exported item keeps its name — the importing file must use the same name (or explicitly rename it).",
        docLinks: [
          {
            label: "export statement",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// math.js — two ways to do named exports\n\n// Way 1: export in front of each declaration\nexport function add(a, b) {\n  return a + b;\n}\n\nexport const PI = 3.14159;\n\n// Way 2: export list at the bottom\nfunction subtract(a, b) {\n  return a - b;\n}\n\nconst E = 2.71828;\n\nexport { subtract, E };',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "importing",
      type: "explanation",
      instruction: {
        heading: "Importing: using code from another file",
        body: "To use something exported from another file, you use the `import` keyword with curly braces `{}` around the names you want. The `from` keyword specifies the file path.\n\nYou only import what you need — if a module exports 10 functions but you only use 2, just import those 2. This keeps your code lean and makes it clear what dependencies each file has.",
        analogy:
          "Importing is like ordering from a menu. The kitchen (module) can make 50 dishes (exports), but you only order the 3 you want. You get exactly what you asked for, nothing more.",
        docLinks: [
          {
            label: "import statement",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "The file path in `from './math.js'` must start with `./` (same folder) or `../` (parent folder) for local files. Forgetting the `./` is a very common mistake — the browser won't find the file without it.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "// app.js — importing from math.js\nimport { add, PI } from './math.js';\n\nconsole.log(add(2, 3));  // 5\nconsole.log(PI);         // 3.14159\n\n// You can rename imports with 'as'\nimport { subtract as minus } from './math.js';\nconsole.log(minus(10, 4));  // 6",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "default-exports",
      type: "explanation",
      instruction: {
        heading: "Default exports: one main thing per file",
        body: "Sometimes a file has one primary thing to export. For this, use `export default`. A file can have only one default export (but can also have named exports alongside it).\n\nWhen importing a default export, you don't use curly braces — and you can name it whatever you want.\n\n**Named exports** = multiple items, imported with `{ }`, names must match.\n**Default exports** = one main item, imported without `{ }`, you choose the name.",
        docLinks: [
          {
            label: "export default",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export#description",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// greeting.js — default export\nexport default function greet(name) {\n  return `Hello, ${name}!`;\n}\n\n// app.js — importing a default (no curly braces, any name)\nimport greet from \'./greeting.js\';\nimport sayHi from \'./greeting.js\';  // same thing, different name\n\nconsole.log(greet("Alice")); // "Hello, Alice!"\n\n// Mixing default and named exports\n// utils.js\nexport default function main() { /* ... */ }\nexport function helper() { /* ... */ }\n\n// app.js\nimport main, { helper } from \'./utils.js\';',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "gap-fill-modules",
      type: "gap-fill",
      instruction: {
        heading: "Practice: import and export",
        body: "Complete the code to export a function from one file and import it in another.",
      },
      config: {
        type: "gap-fill",
        template:
          '// helpers.js\n{{exportKeyword}} function double(n) {\n  return n * 2;\n}\n\n// app.js\n{{importKeyword}} { double } {{fromKeyword}} \'./helpers.js\';\n\nconsole.log(double(5)); // 10',
        gaps: [
          {
            id: "exportKeyword",
            placeholder: "keyword",
            acceptedAnswers: ["export"],
            caseSensitive: true,
          },
          {
            id: "importKeyword",
            placeholder: "keyword",
            acceptedAnswers: ["import"],
            caseSensitive: true,
          },
          {
            id: "fromKeyword",
            placeholder: "keyword",
            acceptedAnswers: ["from"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["exportKeyword", "importKeyword", "fromKeyword"],
        },
      },
      hints: [
        "To share a function with other files, you place a keyword before the function declaration.",
        "To bring code from another file into yours, you use the opposite keyword.",
        "The keyword that connects the import to a file path is a common English word.",
      ],
    },
  ],
};
