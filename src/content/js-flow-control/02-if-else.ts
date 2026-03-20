import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-flow-control-if-else",
  slug: "if-else",
  title: "If...Else: Making Decisions",
  description:
    "Teach your code to choose different paths based on conditions — the most fundamental building block of program logic.",
  order: 2,
  steps: [
    {
      id: "why-conditionals",
      type: "explanation",
      instruction: {
        heading: "Why does code need to make decisions?",
        body: "So far, your programs have been a straight line — every instruction runs, top to bottom, every time. But real software constantly adapts. YouTube shows different recommendations based on what you've watched. A weather app displays a sun icon or a rain icon depending on the forecast. A login form shows a welcome message or an error. All of these require the program to *choose* between different code paths based on some condition.\n\nThis is what `if...else` gives you: the ability to say 'IF this condition is true, do this; OTHERWISE, do that.' It turns your straight-line program into a choose-your-own-adventure book.",
        analogy:
          "if...else is like standing at a fork in the road. You check the signpost (the condition), and it tells you which path to take. If the sign says 'Bridge Open,' you cross the bridge. Otherwise, you take the detour. The signpost doesn't change the roads — it just decides which one you walk down.",
        docLinks: [
          {
            label: "if...else",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The if...else statement has been part of JavaScript since its very first version in 1995. Its syntax is shared with C, Java, and many other languages — once you learn it in JavaScript, you'll recognize it everywhere.",
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
      id: "if-syntax",
      type: "explanation",
      instruction: {
        heading: "The if statement",
        body: "The `if` statement is the simplest conditional. It runs a block of code only when a condition is `true`:\n\n```\nif (condition) {\n  // code that runs only when condition is true\n}\n```\n\nThe **condition** goes inside parentheses `()`. It must be an expression that evaluates to `true` or `false` — usually a comparison like `age >= 18` or `password === correctPassword`.\n\nThe **code block** goes inside curly braces `{}`. If the condition is `false`, JavaScript skips the entire block and moves on.\n\nThink of Instagram's like button: `if (userTappedHeart) { incrementLikeCount(); turnHeartRed(); }` — the like animation only happens *if* the user actually tapped it.",
      },
      config: {
        type: "explanation",
        demoCode: `let temperature = 35;\n\nif (temperature > 30) {\n  console.log("It's hot outside! Stay hydrated.");\n}\n\nconsole.log("This always runs, regardless of temperature.");`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "if-else-syntax",
      type: "explanation",
      instruction: {
        heading: "Adding else and else if",
        body: "Often you need to handle multiple scenarios:\n\n**`else`** provides a fallback — code that runs when the `if` condition is false:\n```\nif (isLoggedIn) {\n  console.log(\"Welcome back!\");\n} else {\n  console.log(\"Please log in.\");\n}\n```\n\n**`else if`** lets you check additional conditions in sequence:\n```\nif (score >= 90) {\n  console.log(\"Grade: A\");\n} else if (score >= 80) {\n  console.log(\"Grade: B\");\n} else if (score >= 70) {\n  console.log(\"Grade: C\");\n} else {\n  console.log(\"Grade: F\");\n}\n```\n\nJavaScript checks conditions from top to bottom and runs the *first* block whose condition is true. Once a match is found, all remaining `else if` and `else` blocks are skipped — even if their conditions would also be true.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip: Order matters with else if",
            body: "Because JavaScript stops at the first true condition, put your most specific conditions first. If you checked `score >= 70` before `score >= 90`, everyone with a 95 would get a C because 95 >= 70 is true and gets matched first!",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `let hour = 14;\n\nif (hour < 12) {\n  console.log("Good morning!");\n} else if (hour < 18) {\n  console.log("Good afternoon!");\n} else {\n  console.log("Good evening!");\n}\n// Output: "Good afternoon!"`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "complete-if-else",
      type: "gap-fill",
      instruction: {
        heading: "Complete the conditional",
        body: "Fill in the blanks to create a working if/else if/else chain that categorizes a person's age group.",
      },
      config: {
        type: "gap-fill",
        template:
          'let age = 15;\n\n{{keyword1}} (age < 13) {\n  console.log("Child");\n} {{keyword2}} (age < 18) {\n  console.log("Teenager");\n} {{keyword3}} {\n  console.log("Adult");\n}',
        gaps: [
          {
            id: "keyword1",
            placeholder: "keyword",
            acceptedAnswers: ["if"],
            caseSensitive: true,
          },
          {
            id: "keyword2",
            placeholder: "keyword",
            acceptedAnswers: ["else if"],
            caseSensitive: true,
          },
          {
            id: "keyword3",
            placeholder: "keyword",
            acceptedAnswers: ["else"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["keyword1", "keyword2", "keyword3"],
        },
      },
      hints: [
        "The first condition check uses the keyword that starts a conditional chain.",
        "Additional conditions after the first use two words together.",
        "The final fallback uses a single keyword — no condition needed.",
      ],
    },
    {
      id: "grade-checker",
      type: "js-console",
      instruction: {
        heading: "Build a grade checker",
        body: "Write a program that assigns a letter grade based on a numeric score:\n- 90 or above → A\n- 80–89 → B\n- 70–79 → C\n- 60–69 → D\n- Below 60 → F\n\nUse `if`, `else if`, and `else` to check the score and `console.log()` the result. Test with the starter score of 85, which should output `\"Grade: B\"`.",
      },
      config: {
        type: "js-console",
        starterCode: `let score = 85;\n\n// Write your if/else if/else chain below:\n// It should console.log the grade like: "Grade: B"\n`,
        expectedOutput: ["Grade: B"],
      },
      validation: {
        type: "console-output-match",
        criteria: { expectedOutput: ["Grade: B"] },
      },
      hints: [
        "Start with the highest grade: if (score >= 90)",
        "Each else if checks the next range down: else if (score >= 80)",
        "The final else catches everything below 60.",
        'Use console.log("Grade: B") — make sure the format matches exactly.',
      ],
    },
  ],
};
