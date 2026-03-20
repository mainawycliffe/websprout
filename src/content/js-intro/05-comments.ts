import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-intro-comments",
  slug: "comments",
  title: "Comments & Readability",
  description:
    "Learn how to leave notes in your code and name variables clearly.",
  order: 5,
  steps: [
    {
      id: "what-are-comments",
      type: "explanation",
      instruction: {
        heading: "What are comments?",
        body: "As your code grows, it becomes harder to remember why you wrote something a certain way. Comments let you leave notes for yourself and other developers — JavaScript completely ignores them when running your code.\n\nThere are two styles of comments:\n\n- **Single-line comments** start with `//`. Everything after `//` on that line is ignored.\n- **Multi-line comments** start with `/*` and end with `*/`. Everything between those markers is ignored, even across multiple lines.\n\nYou can also place a single-line comment at the end of a line of code to explain what that specific line does.\n\nBeyond comments, the names you choose for your variables matter just as much for readability. JavaScript developers follow these conventions:\n\n- **camelCase** for regular variables and `let` declarations: `firstName`, `totalScore`, `currentLevel`.\n- **UPPER_SNAKE_CASE** for constants that represent fixed, universal values: `MAX_RETRIES`, `API_URL`, `TAX_RATE`.",
        analogy:
          "Comments are like sticky notes you leave on your code — reminders for your future self.",
        docLinks: [
          {
            label: "Comments",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#comments",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Good variable names reduce the need for comments. `let x = 5;` is confusing — `let playerLives = 5;` is self-explanatory.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "// This is a single-line comment\nlet score = 0; // You can also put them at the end\n\n/* This is a multi-line comment.\n   It can span several lines.\n   Useful for longer explanations. */",
        demoLanguage: "javascript",
      },
      validation: {
        type: "none",
        criteria: {},
      },
      hints: [
        "Single-line comments use //. Multi-line comments use /* ... */.",
        "Comments are for humans only — the browser skips them entirely.",
        "Use camelCase for variables (myScore) and UPPER_SNAKE_CASE for constants (MAX_SCORE).",
      ],
    },
    {
      id: "practice-comments",
      type: "gap-fill",
      instruction: {
        heading: "Add comments to code",
        body: "This code calculates a total price. Add a single-line comment above the first line to describe what the code does, and an inline comment after the `console.log` line to explain the output.\n\nRemember: single-line comments start with `//`.",
      },
      config: {
        type: "gap-fill",
        template:
          "{{comment_start}} Calculate the total price\nconst price = 10;\nconst tax = 1.5;\nconst total = price + tax;\nconsole.log(total); {{inline_comment}} logs 11.5",
        gaps: [
          {
            id: "comment_start",
            placeholder: "comment syntax",
            acceptedAnswers: ["//"],
            caseSensitive: true,
          },
          {
            id: "inline_comment",
            placeholder: "comment syntax",
            acceptedAnswers: ["//"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          comment_start: "//",
          inline_comment: "//",
        },
      },
      hints: [
        "Both gaps need the same two characters.",
        "Single-line comments in JavaScript start with two forward slashes: //",
      ],
    },
    {
      id: "practice-readable-code",
      type: "js-console",
      instruction: {
        heading: "Write well-commented, well-named code",
        body: "Put your new skills together. Write code that:\n\n1. Declares a `const` for a product price (use a clear, descriptive name).\n2. Declares a `let` variable for quantity.\n3. Calculates the total and logs it with `console.log`.\n\nAdd at least one comment explaining what your code does. Use proper naming conventions — camelCase for regular variables, UPPER_SNAKE_CASE for fixed constants.",
      },
      config: {
        type: "js-console",
        starterCode:
          "// Your task: Create well-named variables with comments\n// 1. A constant for a product price\n// 2. A let variable for quantity\n// 3. Calculate and log the total\n",
      },
      validation: {
        type: "contains-js",
        criteria: {
          keywords: ["const", "let", "console.log"],
        },
      },
      hints: [
        "Start with something like: const PRODUCT_PRICE = 9.99;",
        "Then: let quantity = 3;",
        "Calculate: const total = PRODUCT_PRICE * quantity;",
        "Log the result: console.log(total);",
        "Add a comment above or beside each line to explain your thinking.",
      ],
    },
  ],
};
