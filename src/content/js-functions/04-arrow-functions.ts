import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-functions-arrow-functions",
  slug: "arrow-functions",
  title: "Arrow Functions",
  description:
    "Learn the shorter arrow function syntax and when to use it.",
  order: 4,
  steps: [
    {
      id: "arrow-syntax",
      type: "explanation",
      instruction: {
        heading: "A shorter way to write functions",
        body: "ES6 (2015) introduced arrow functions — a more compact syntax for writing functions. Instead of the `function` keyword, you use a fat arrow `=>` between the parameters and the body. Arrow functions are especially popular for short, simple functions and when passing functions as arguments (which you'll do a lot with array methods). They aren't a complete replacement for regular functions — each has its place — but for most beginner use cases, they're interchangeable.",
        analogy:
          "Arrow functions are like text message abbreviations — 'see you later' becomes 'cya l8r.' Same meaning, fewer characters. Just like abbreviations are great for quick texts but you'd use full words in a formal letter, arrow functions are perfect for short helper functions but you might prefer declarations for big, important ones.",
        docLinks: [
          {
            label: "Arrow function expressions",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Arrow functions were introduced in ECMAScript 2015 (ES6). They have a key technical difference from regular functions: they do not have their own `this` binding. For now this won't matter, but it becomes important later when working with objects and event handlers.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// Regular function declaration\nfunction greet(name) {\n  return "Hello, " + name + "!";\n}\n\n// Same thing as an arrow function\nconst greetArrow = (name) => {\n  return "Hello, " + name + "!";\n};\n\nconsole.log(greet("Alice"));      // "Hello, Alice!"\nconsole.log(greetArrow("Alice")); // "Hello, Alice!"',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "converting-to-arrow",
      type: "explanation",
      instruction: {
        heading: "Converting regular functions to arrow functions",
        body: "Here's the conversion process, step by step: (1) Remove the `function` keyword. (2) Assign the function to a variable with `const`. (3) Add `=>` after the parentheses. That's it for the basic conversion. The result works exactly the same way — same parameters, same body, same return value.",
        docLinks: [
          {
            label: "Arrow functions",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "// Step-by-step conversion:\n\n// 1. Start with a regular function\nfunction add(a, b) {\n  return a + b;\n}\n\n// 2. Remove 'function', assign to const, add '=>'\nconst add = (a, b) => {\n  return a + b;\n};\n\n// Both work the same way:\nconsole.log(add(3, 7)); // 10",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "implicit-return",
      type: "explanation",
      instruction: {
        heading: "Implicit return: the one-liner shortcut",
        body: "When your arrow function has only a single expression (one line of logic), you can remove both the curly braces and the `return` keyword. The value of that expression is automatically returned — this is called an implicit return. This is why arrow functions are so popular for quick calculations and transformations. If your function body has multiple statements, you must keep the curly braces and explicit `return`.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "With a single parameter, you can also drop the parentheses: `const double = n => n * 2;`. But with zero or multiple parameters, parentheses are required: `const greet = () => \"Hi!\";` and `const add = (a, b) => a + b;`.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// Full arrow function\nconst double = (n) => {\n  return n * 2;\n};\n\n// Same thing with implicit return (no braces, no return)\nconst doubleConcise = (n) => n * 2;\n\n// Even shorter with single parameter (no parens needed)\nconst doubleShort = n => n * 2;\n\nconsole.log(double(5));        // 10\nconsole.log(doubleConcise(5)); // 10\nconsole.log(doubleShort(5));   // 10\n\n// Multiple params — parentheses required\nconst add = (a, b) => a + b;\nconsole.log(add(3, 7)); // 10',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "convert-to-arrow",
      type: "gap-fill",
      instruction: {
        heading: "Convert to arrow syntax",
        body: "Convert this regular function to a concise arrow function with implicit return.",
      },
      config: {
        type: "gap-fill",
        template:
          "// Original:\n// function triple(n) {\n//   return n * 3;\n// }\n\n// Arrow function version:\nconst triple = {{params}} {{arrow}} n * 3;\n\nconsole.log(triple(4)); // 12",
        gaps: [
          {
            id: "params",
            placeholder: "parameter(s)",
            acceptedAnswers: ["(n)", "n"],
            caseSensitive: true,
          },
          {
            id: "arrow",
            placeholder: "arrow",
            acceptedAnswers: ["=>"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["params", "arrow"],
        },
      },
      hints: [
        "For a single parameter, you can write just `n` or `(n)`.",
        "The arrow syntax uses `=>` (equals sign followed by greater-than sign).",
      ],
    },
    {
      id: "practice-arrows",
      type: "js-console",
      instruction: {
        heading: "Practice with arrow functions",
        body: "Rewrite these three functions as arrow functions with implicit return, then test them:\n\n1. A function `square` that returns a number times itself\n2. A function `isEven` that returns true if a number is divisible by 2\n3. A function `shout` that returns a string in uppercase (use `.toUpperCase()`)",
        docLinks: [
          {
            label: "String.prototype.toUpperCase()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode:
          "// 1. square: takes a number, returns it squared\n\n\n// 2. isEven: takes a number, returns true if even\n\n\n// 3. shout: takes a string, returns it in UPPERCASE\n\n\n// Test them:\n// console.log(square(5));       // 25\n// console.log(isEven(4));       // true\n// console.log(shout(\"hello\")); // \"HELLO\"\n",
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["=>", "console.log"] },
      },
      hints: [
        "const square = n => n * n;",
        "const isEven = n => n % 2 === 0;",
        "const shout = str => str.toUpperCase();",
      ],
    },
  ],
};
