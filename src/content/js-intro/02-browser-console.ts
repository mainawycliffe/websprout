import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-intro-browser-console",
  slug: "browser-console",
  title: "The Browser Console",
  description:
    "Meet the browser console — your built-in playground for writing and testing JavaScript instantly.",
  order: 2,
  steps: [
    {
      id: "console-intro",
      type: "explanation",
      instruction: {
        heading: "Your built-in JavaScript playground",
        body: "Every browser ships with a set of developer tools (DevTools), and one of the most useful panels is the Console. The console lets you type JavaScript code and see the result immediately — no files to create, no setup required. Developers use it constantly: to test quick ideas, inspect values, debug problems, and experiment with code before putting it into a real project.",
        analogy:
          "Think of the console like a sketchpad for testing ideas. An artist doesn't paint directly on the final canvas — they sketch on scratch paper first to try out compositions and colors. The console is your scratch paper for code.",
        docLinks: [
          {
            label: "Console API",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Console",
            type: "js-method",
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
      id: "console-log",
      type: "explanation",
      instruction: {
        heading: "Printing messages with console.log()",
        body: 'To open the console, press Ctrl+Shift+J on Windows/Linux or Cmd+Option+J on Mac. A panel will appear at the bottom (or side) of your browser. Now you can type JavaScript directly into it.\n\nThe most important command you\'ll learn is `console.log()`. It prints whatever you put inside the parentheses to the console. Think of it as JavaScript\'s way of talking to you. Every developer — from beginners to experts at Google and Meta — uses `console.log()` daily to check what their code is doing.',
        analogy:
          "console.log() is like a 'show your work' step in math class. It doesn't change anything on the page — it just lets you see what's happening behind the scenes so you can verify your thinking.",
        docLinks: [
          {
            label: "console.log()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/console/log_static",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "console.log() is the single most used debugging tool in JavaScript. When something isn't working, the first thing most developers do is add a console.log() to see what values their code is actually producing. You'll use it in almost every lesson from here on.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: 'console.log("Hello, world!");',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "console-expressions",
      type: "explanation",
      instruction: {
        heading: "The console is also a calculator",
        body: "The console doesn't just print text — it can evaluate any JavaScript expression. Type a math expression and it will show the result instantly. JavaScript supports all the basic math operators: `+` for addition, `-` for subtraction, `*` for multiplication, `/` for division, and `%` for remainder (modulo). You can also use parentheses to control the order of operations, just like in math class.",
        analogy:
          "It works exactly like typing into a calculator, except this calculator also understands text, logic, and eventually entire programs.",
        docLinks: [
          {
            label: "Arithmetic operators",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#arithmetic_operators",
            type: "js-operator",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: "2 + 3\n10 * 5\n100 / 4",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "gap-fill-console",
      type: "gap-fill",
      instruction: {
        heading: "Fill in the blanks",
        body: 'Complete the code to print a welcome message, then figure out what a simple math expression evaluates to.',
      },
      config: {
        type: "gap-fill",
        template:
          'console.{{method}}("Welcome to JavaScript!");\n\n// What does 7 + 3 equal?\n// Answer: {{math_result}}',
        gaps: [
          {
            id: "method",
            placeholder: "method name",
            acceptedAnswers: ["log"],
            caseSensitive: true,
          },
          {
            id: "math_result",
            placeholder: "result",
            acceptedAnswers: ["10"],
            caseSensitive: false,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["method", "math_result"],
        },
      },
      hints: [
        "The method we've been using to print messages is console.____().",
        "7 + 3 is basic addition — count it out if you need to!",
      ],
    },
    {
      id: "free-coding-console",
      type: "js-console",
      instruction: {
        heading: "Your turn: talk to the console",
        body: "Write three `console.log()` statements. Log your name (as text in quotes), a number, and a math expression. For example, you might log your age, then multiply it by 365 to see roughly how many days you've been alive. There's no single right answer — just experiment!",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: 'Text must be wrapped in quotes — either "double quotes" or \'single quotes\'. Numbers don\'t need quotes. A math expression like 5 * 10 will be calculated before it\'s logged.',
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode:
          "// Write three console.log() statements below\n// Try logging your name, a number, and a math expression\n",
        expectedOutput: [],
      },
      validation: {
        type: "contains-js",
        criteria: {
          keywords: ["console.log"],
        },
      },
      hints: [
        'Start with console.log("your name here"); — don\'t forget the quotes around text!',
        "For a number, just put it inside the parentheses without quotes: console.log(42);",
        "For a math expression, try something like console.log(7 * 8);",
      ],
    },
  ],
};
