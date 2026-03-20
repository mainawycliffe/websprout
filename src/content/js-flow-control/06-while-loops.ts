import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-flow-control-while-loops",
  slug: "while-loops",
  title: "While Loops & Loop Control",
  description:
    "Learn while loops for when you don't know how many times to repeat, plus break and continue for fine-grained loop control.",
  order: 6,
  steps: [
    {
      id: "while-vs-for",
      type: "explanation",
      instruction: {
        heading: "When you don't know the count in advance",
        body: "A `for` loop is perfect when you know exactly how many times to repeat: 'do this 10 times' or 'do this for every item in the array.' But sometimes you don't know the count in advance. You just know when to stop.\n\nExamples:\n- Keep asking for a password **while** the user enters the wrong one\n- Keep scrolling the feed **while** there are more posts to load\n- Keep dealing cards **while** the player wants to hit\n\nThe `while` loop checks a condition before each iteration. As long as the condition is `true`, the body keeps running. The moment it becomes `false`, the loop stops.",
        analogy:
          "A while loop is like waiting for a bus: 'While the bus hasn't arrived, keep waiting.' You don't know if it'll take 2 minutes or 20 — you just keep checking until the condition changes.",
        docLinks: [
          {
            label: "while",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip: Infinite loop danger!",
            body: "Always make sure the condition will eventually become `false`, or you'll create an infinite loop that freezes the browser tab! The most common mistake is forgetting to update the variable that the condition checks. If you write `while (count < 10)` but never increase `count`, the loop runs forever.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `let count = 1;\n\nwhile (count <= 5) {\n  console.log("Count: " + count);\n  count++;  // Don't forget this! Without it, infinite loop!\n}\n// Count: 1\n// Count: 2\n// Count: 3\n// Count: 4\n// Count: 5`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "do-while",
      type: "explanation",
      instruction: {
        heading: "do...while: Always run at least once",
        body: "There's a variation called `do...while` that runs the body *first*, then checks the condition:\n\n```\ndo {\n  // code to repeat\n} while (condition);\n```\n\nThe key difference: a `while` loop might run **zero** times (if the condition is false from the start), but a `do...while` loop always runs **at least once**.\n\nThis is useful when you need to do something before you can check the condition. For example, in a menu system, you want to show the menu at least once before asking 'Do you want to continue?'\n\nReal-world example: When a website shows a 'cookie consent' popup, it uses `do...while`-style logic — show the popup first, *then* check if the user has responded.",
        docLinks: [
          {
            label: "do...while",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// This runs at least once, even though the condition is false\nlet num = 10;\n\ndo {\n  console.log("Number is: " + num);\n  num++;\n} while (num < 5);\n\n// Output: "Number is: 10"\n// The body ran once, then the condition (10 < 5) was false, so it stopped.`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "break-continue",
      type: "explanation",
      instruction: {
        heading: "break and continue: Fine-tuning your loops",
        body: "Sometimes you need more control over loop execution:\n\n**`break`** — Immediately exits the entire loop, no matter what the condition says. Use it when you've found what you're looking for and don't need to keep searching:\n```\nfor (let i = 0; i < 100; i++) {\n  if (names[i] === \"Alice\") {\n    console.log(\"Found Alice at index \" + i);\n    break; // stop searching\n  }\n}\n```\n\n**`continue`** — Skips the rest of the current iteration and jumps to the next one. Use it to skip items that don't meet a criterion:\n```\nfor (let i = 1; i <= 10; i++) {\n  if (i % 2 === 0) {\n    continue; // skip even numbers\n  }\n  console.log(i); // only prints odd numbers\n}\n```\n\nThink of `break` as leaving the gym entirely, and `continue` as skipping one rep but continuing the workout.",
        docLinks: [
          {
            label: "break",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break",
            type: "js-concept",
          },
          {
            label: "continue",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Both `break` and `continue` work in all loop types: for, while, and do...while. They are part of the core ECMAScript specification and behave identically in every JavaScript engine.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// break: stop when we find "banana"\nlet fruits = ["apple", "banana", "cherry", "date"];\nfor (let i = 0; i < fruits.length; i++) {\n  if (fruits[i] === "banana") {\n    console.log("Found banana at index " + i);\n    break;\n  }\n}\n\n// continue: skip numbers divisible by 3\nfor (let i = 1; i <= 10; i++) {\n  if (i % 3 === 0) continue;\n  console.log(i); // 1, 2, 4, 5, 7, 8, 10\n}`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "complete-while-loop",
      type: "gap-fill",
      instruction: {
        heading: "Complete the while loop",
        body: "Fill in the blanks to create a while loop that doubles a number until it exceeds 100.",
      },
      config: {
        type: "gap-fill",
        template:
          'let value = 1;\n\n{{keyword}} (value {{operator}} 100) {\n  console.log(value);\n  value = value {{multiply}} 2;\n}',
        gaps: [
          {
            id: "keyword",
            placeholder: "loop keyword",
            acceptedAnswers: ["while"],
            caseSensitive: true,
          },
          {
            id: "operator",
            placeholder: "comparison",
            acceptedAnswers: ["<=", "<"],
            caseSensitive: true,
          },
          {
            id: "multiply",
            placeholder: "operator",
            acceptedAnswers: ["*"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["keyword", "operator", "multiply"],
        },
      },
      hints: [
        "The loop keyword that checks a condition before each iteration is...",
        "We want to keep going while value is less than or equal to 100.",
        "To double a number, you multiply it by 2 using the * operator.",
      ],
    },
    {
      id: "countdown-timer",
      type: "js-console",
      instruction: {
        heading: "Build a countdown timer",
        body: "Write a while loop that counts down from 10 to 1, printing each number, and then prints `\"Liftoff!\"` after the loop ends.\n\nExpected output:\n```\n10\n9\n8\n... (all the way down)\n1\nLiftoff!\n```",
      },
      config: {
        type: "js-console",
        starterCode: `let countdown = 10;\n\n// Write a while loop that counts down from 10 to 1\n// Then print "Liftoff!" after the loop\n`,
        expectedOutput: ["10", "9", "8", "7", "6", "5", "4", "3", "2", "1", "Liftoff!"],
      },
      validation: {
        type: "console-output-match",
        criteria: { expectedOutput: ["10", "1", "Liftoff!"] },
      },
      hints: [
        "The condition should be: while (countdown >= 1) or while (countdown > 0)",
        "Inside the loop, console.log(countdown) and then decrease it: countdown--",
        'After the loop ends, add console.log("Liftoff!")',
      ],
    },
  ],
};
