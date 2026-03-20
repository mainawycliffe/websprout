import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-intro-constants",
  slug: "constants",
  title: "Constants with const",
  description:
    "Learn how to declare values that never change using the const keyword.",
  order: 4,
  steps: [
    {
      id: "what-is-const",
      type: "explanation",
      instruction: {
        heading: "What is const?",
        body: "Sometimes you have a value that should never change after you set it — the speed of light, the name of your app, or the number of sides on a hexagon. JavaScript gives you the `const` keyword for exactly this purpose. When you declare a variable with `const`, you are telling JavaScript (and anyone reading your code): 'This value is fixed. Do not touch it.'\n\nIf any code later tries to reassign a `const` variable, JavaScript will throw an error and stop execution. This is a safety net — it protects important values from being accidentally overwritten.",
        analogy:
          "const is like a box with a padlock — once you put something in, it stays.",
        docLinks: [
          {
            label: "const",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'const PI = 3.14159;\nconst APP_NAME = "WebSprout";\nconsole.log(PI);\nconsole.log(APP_NAME);',
        demoLanguage: "javascript",
      },
      validation: {
        type: "none",
        criteria: {},
      },
      hints: [
        "const works just like let, but the value cannot be reassigned after creation.",
        "Convention: constants that represent truly fixed values are often written in UPPER_SNAKE_CASE.",
      ],
    },
    {
      id: "const-keyword",
      type: "explanation",
      instruction: {
        heading: "Why does const exist?",
        body: "Imagine you are building a game and you set `MAX_LIVES = 3` at the top of your code. Hundreds of lines later, a bug accidentally sets `MAX_LIVES = 0`. Now players start with zero lives and the game is broken. If you had used `const`, JavaScript would have caught that mistake instantly with a clear error message.\n\n`const` exists to prevent accidental reassignment. It makes your code safer and easier to understand — when another developer (or future-you) sees `const`, they immediately know that value will not change.",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Modern JavaScript best practice is to prefer `const` by default. Only use `let` when you know the value needs to be reassigned. You will rarely need `let` — most values in a program are set once and read many times. This convention is followed across major projects and recommended by linters like ESLint.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "const MAX_LIVES = 3;\nconsole.log(MAX_LIVES);\n// MAX_LIVES = 5; // \u274c Error! Cannot reassign a constant",
        demoLanguage: "javascript",
      },
      validation: {
        type: "none",
        criteria: {},
      },
      hints: [
        "Try uncommenting the reassignment line in a real console to see the error yourself.",
        "The error message will say something like: TypeError: Assignment to constant variable.",
      ],
    },
    {
      id: "let-vs-const",
      type: "explanation",
      instruction: {
        heading: "When to use let vs const",
        body: "Now you know two ways to declare variables: `let` and `const`. How do you choose?\n\n- Use `const` when the value will not change: a person's name, a tax rate, a configuration setting, the title of a page.\n- Use `let` when the value needs to be updated: a running score, a counter, the current level in a game.\n\nIn practice, you will find that most variables can be `const`. The value you assign at creation is often the only value they ever need.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Rule of thumb: start with const. Only switch to let if you need to reassign the value later.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'const name = "Alice"; // won\'t change\nlet score = 0; // will change\nscore = 10; // \u2713 this works\n// name = "Bob"; // \u2717 this would error',
        demoLanguage: "javascript",
      },
      validation: {
        type: "none",
        criteria: {},
      },
      hints: [
        "If you are unsure, default to const — you can always change it to let later if needed.",
        "Some teams enforce this rule automatically using code-checking tools called linters.",
      ],
    },
    {
      id: "practice-keywords",
      type: "gap-fill",
      instruction: {
        heading: "Pick the right keyword",
        body: "A car has a maximum speed that never changes and a current speed that changes as you drive. Fill in the correct keyword (`const` or `let`) for each variable declaration.",
      },
      config: {
        type: "gap-fill",
        template:
          "{{keyword1}} maxSpeed = 120; // never changes\n{{keyword2}} currentSpeed = 0; // changes as you drive\ncurrentSpeed = 60;",
        gaps: [
          {
            id: "keyword1",
            placeholder: "keyword",
            acceptedAnswers: ["const"],
            caseSensitive: true,
          },
          {
            id: "keyword2",
            placeholder: "keyword",
            acceptedAnswers: ["let"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          keyword1: "const",
          keyword2: "let",
        },
      },
      hints: [
        "Which value will be reassigned later in the code?",
        "maxSpeed is set once and never touched again — that sounds like a job for const.",
        "currentSpeed is updated to 60, so it needs let.",
      ],
    },
    {
      id: "practice-const-let",
      type: "js-console",
      instruction: {
        heading: "Use const and let together",
        body: "Time to write your own code. Create a constant called `GAME_NAME` with any string value, a `let` variable called `level` starting at 1, then change `level` to 2 and log both values to the console.\n\nRemember: use `const` for the value that should never change and `let` for the one that will.",
      },
      config: {
        type: "js-console",
        starterCode:
          "// Create a constant called GAME_NAME with any value\n// Create a let variable called level starting at 1\n// Change level to 2\n// Log both values\n",
      },
      validation: {
        type: "contains-js",
        criteria: {
          keywords: ["const", "let", "console.log"],
        },
      },
      hints: [
        'Start with: const GAME_NAME = "Your Game";',
        "Then: let level = 1;",
        "Reassign with: level = 2; (no let keyword needed for reassignment)",
        "Log with: console.log(GAME_NAME); and console.log(level);",
      ],
    },
  ],
};
