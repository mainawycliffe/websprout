import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-data-types-booleans",
  slug: "booleans",
  title: "Booleans, null & undefined",
  description:
    "Understand true/false values, comparison operators, and JavaScript's two ways of saying 'nothing.'",
  order: 3,
  steps: [
    {
      id: "what-are-booleans",
      type: "explanation",
      instruction: {
        heading: "The simplest data type: true or false",
        body: "A boolean is a value that can only be one of two things: `true` or `false`. That's it — no maybes, no in-betweens. Booleans are named after George Boole, a mathematician who developed the logic that all computers are built on.\n\nWhy do booleans matter? Because every decision your code makes boils down to a yes-or-no question. Is the user logged in? Is the password correct? Is the shopping cart empty? Did the student pass? Each of these is answered by a boolean. When we learn `if` statements in a later module, booleans will be at the heart of every decision.",
        analogy:
          "Booleans are like light switches — they can only be on (true) or off (false). Every decision in your code comes down to this simple yes-or-no question. An entire computer is built from billions of these tiny on/off switches.",
        docLinks: [
          {
            label: "Boolean",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "let isLoggedIn = true;\nlet hasPermission = false;\n\nconsole.log(isLoggedIn);    // true\nconsole.log(hasPermission); // false\nconsole.log(typeof true);   // \"boolean\"",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "comparison-operators",
      type: "explanation",
      instruction: {
        heading: "Comparison operators: asking questions",
        body: "You rarely type `true` or `false` directly. Instead, booleans are usually the result of a comparison — JavaScript evaluating a question and giving you the answer.\n\n- `===` Strict equality: are these the same value AND the same type?\n- `!==` Strict inequality: are these different?\n- `>` Greater than\n- `<` Less than\n- `>=` Greater than or equal to\n- `<=` Less than or equal to\n\nEach of these produces a boolean: `5 > 3` evaluates to `true`, `10 === \"10\"` evaluates to `false` (number vs. string — different types).",
        docLinks: [
          {
            label: "Comparison operators",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#comparison_operators",
            type: "js-operator",
          },
          {
            label: "Strict equality (===)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality",
            type: "js-operator",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Always use `===` (strict equality) instead of `==` (loose equality). The double-equals operator `==` performs type coercion — it tries to convert values before comparing, which leads to surprises like `\"0\" == false` being true. Triple-equals is predictable: same value, same type, no tricks.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "console.log(5 > 3);         // true\nconsole.log(5 < 3);         // false\nconsole.log(10 === 10);     // true\nconsole.log(10 === \"10\");   // false (different types!)\nconsole.log(10 !== \"10\");   // true\nconsole.log(7 >= 7);        // true\nconsole.log(\"a\" < \"b\");     // true (alphabetical order)",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "truthy-falsy",
      type: "explanation",
      instruction: {
        heading: "Truthy and falsy: not everything is true or false, but everything acts like it",
        body: "Here's a JavaScript quirk that surprises beginners: even non-boolean values can be treated as true or false in a boolean context. JavaScript has exactly six \"falsy\" values — values that act like `false`:\n\n- `false` — the boolean itself\n- `0` — the number zero\n- `\"\"` — an empty string (no characters)\n- `null` — intentionally empty\n- `undefined` — not yet assigned\n- `NaN` — not a number\n\nEverything else is \"truthy\" — it acts like `true`. This includes non-zero numbers, non-empty strings, arrays, and objects. Understanding truthy/falsy is essential for writing conditions later on.",
        docLinks: [
          {
            label: "Truthy",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Truthy",
            type: "js-concept",
          },
          {
            label: "Falsy",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Falsy",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The falsy list is short and fixed — only those six values. A common gotcha: the string \"false\" (with quotes) is truthy! It's a non-empty string, so it acts like true. Same with the string \"0\" — it's not the number 0, so it's truthy.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "// Convert any value to its boolean equivalent with Boolean()\nconsole.log(Boolean(1));         // true\nconsole.log(Boolean(0));         // false\nconsole.log(Boolean(\"hello\"));   // true\nconsole.log(Boolean(\"\"));        // false\nconsole.log(Boolean(null));      // false\nconsole.log(Boolean(undefined)); // false\nconsole.log(Boolean(\"false\"));   // true! (non-empty string)",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "null-vs-undefined",
      type: "explanation",
      instruction: {
        heading: "null vs. undefined: two kinds of 'nothing'",
        body: "JavaScript has two ways to represent the absence of a value, and they mean different things:\n\n`undefined` means \"this variable exists but hasn't been given a value yet.\" JavaScript assigns it automatically when you declare a variable without initializing it: `let x;` makes x `undefined`.\n\n`null` means \"this value is intentionally empty.\" A programmer sets it on purpose to signal \"there's nothing here right now.\" For example, a search function might return `null` when it finds no results.\n\nThe key difference: `undefined` is JavaScript's default \"no value,\" while `null` is a deliberate choice by the developer. You can check for both using `typeof` — though beware that `typeof null` returns `\"object\"` due to a famous JavaScript bug that's been around since 1995.",
        docLinks: [
          {
            label: "null",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null",
            type: "js-concept",
          },
          {
            label: "undefined",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined",
            type: "js-concept",
          },
          {
            label: "typeof",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof",
            type: "js-operator",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "`typeof null` returns \"object\" — this is a well-known bug from the very first version of JavaScript. It was never fixed because too much existing code depends on it. Just remember: null is NOT an object, despite what typeof says.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "let notYetAssigned;\nconsole.log(notYetAssigned);         // undefined\nconsole.log(typeof notYetAssigned);  // \"undefined\"\n\nlet intentionallyEmpty = null;\nconsole.log(intentionallyEmpty);         // null\nconsole.log(typeof intentionallyEmpty);  // \"object\" (bug!)\n\n// Both are falsy\nconsole.log(Boolean(undefined)); // false\nconsole.log(Boolean(null));      // false",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "gap-fill-comparisons",
      type: "gap-fill",
      instruction: {
        heading: "Practice: comparisons and typeof",
        body: "Fill in the correct comparison operator and typeof result. Remember: use strict equality (`===`) to check if values are equal.",
      },
      config: {
        type: "gap-fill",
        template:
          "let score = 100;\nlet passingScore = 70;\n\n// Is the score greater than or equal to the passing score?\nlet passed = score {{comparison}} passingScore;\nconsole.log(passed); // true\n\n// What type is the boolean value true?\nconsole.log(typeof true); // \"{{type}}\"",
        gaps: [
          {
            id: "comparison",
            placeholder: "operator",
            acceptedAnswers: [">="],
            caseSensitive: true,
          },
          {
            id: "type",
            placeholder: "type name",
            acceptedAnswers: ["boolean"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["comparison", "type"],
        },
      },
      hints: [
        "We need 'greater than or equal to' — which operator is that?",
        "What data type are true and false?",
      ],
    },
    {
      id: "js-console-truthy-falsy",
      type: "js-console",
      instruction: {
        heading: "Your turn: truthy and falsy experiments",
        body: "Use `Boolean()` to test which values are truthy and which are falsy. Log the boolean version of each of these values:\n1. The number `42`\n2. The number `0`\n3. The string `\"\"` (empty string)\n4. The string `\"0\"` (the character zero)\n5. `null`\n\nPredict each result before you run the code!",
      },
      config: {
        type: "js-console",
        starterCode:
          "// Test each value — is it truthy or falsy?\nconsole.log(Boolean(42));\n\n// Add the rest: 0, \"\", \"0\", null\n",
        expectedOutput: ["true", "false", "false", "true", "false"],
      },
      validation: {
        type: "contains-js",
        criteria: {
          keywords: ["Boolean", "null", "console.log"],
        },
      },
      hints: [
        "Wrap each value in Boolean() and console.log() it.",
        "Remember: 0 is falsy, but \"0\" is truthy (it's a non-empty string).",
        "null is one of the six falsy values.",
      ],
    },
  ],
};
