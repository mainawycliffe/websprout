import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-flow-control-for-loops",
  slug: "for-loops",
  title: "For Loops",
  description:
    "Automate repetitive tasks by telling JavaScript to repeat code a specific number of times.",
  order: 5,
  steps: [
    {
      id: "why-loops",
      type: "explanation",
      instruction: {
        heading: "Why do we need loops?",
        body: "Imagine you run an online store and need to display 100 products on a page. Would you write `console.log(product1)`, `console.log(product2)`, ... 100 times? Of course not! That would be tedious, error-prone, and impossible to maintain.\n\nLoops let you say: 'Repeat this block of code a certain number of times' or 'Repeat this for every item in a list.' They're one of the most powerful tools in programming because they turn 100 lines of repetitive code into 3.\n\nEvery website you use relies on loops. When Twitter displays your timeline, it loops through an array of tweets and renders each one. When Spotify shows your playlist, it loops through the song list. When Google shows search results, it loops through the results array.",
        analogy:
          "A for loop is like a gym workout with reps: 'Start at rep 1, keep going while under 10, add 1 after each rep.' You define the starting point, the stopping condition, and what changes after each repetition.",
        docLinks: [
          {
            label: "for",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The for loop syntax in JavaScript is identical to C, Java, and many other languages. The three-part header (initialization; condition; update) is one of the most universal patterns in programming — learn it once, use it everywhere.",
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
      id: "for-loop-anatomy",
      type: "explanation",
      instruction: {
        heading: "Anatomy of a for loop",
        body: "A for loop has three parts inside its parentheses, separated by semicolons:\n\n```\nfor (initialization; condition; update) {\n  // code to repeat\n}\n```\n\n1. **Initialization** — Runs once before the loop starts. Usually creates a counter: `let i = 0`\n2. **Condition** — Checked before *each* iteration. If `true`, the loop body runs. If `false`, the loop stops: `i < 5`\n3. **Update** — Runs after *each* iteration. Usually increments the counter: `i++` (shorthand for `i = i + 1`)\n\n**Execution order:**\n1. Initialize → 2. Check condition → 3. Run body → 4. Update → back to step 2\n\nThe variable `i` is a convention — it stands for 'index' or 'iterator.' You'll see it in almost every for loop.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip: Common counting patterns",
            body: "Count up from 0: `for (let i = 0; i < 10; i++)`\nCount up from 1: `for (let i = 1; i <= 10; i++)`\nCount down: `for (let i = 10; i > 0; i--)`\nCount by twos: `for (let i = 0; i < 20; i += 2)`\n\nProgrammers usually start counting at 0 because arrays are zero-indexed. You'll see `i = 0` far more often than `i = 1`.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// Count from 1 to 5\nfor (let i = 1; i <= 5; i++) {\n  console.log("Rep " + i);\n}\n// Output:\n// Rep 1\n// Rep 2\n// Rep 3\n// Rep 4\n// Rep 5`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "looping-arrays",
      type: "explanation",
      instruction: {
        heading: "Looping through arrays",
        body: "One of the most common uses of for loops is iterating through an array. Since array indices start at 0 and go up to `array.length - 1`, the pattern looks like this:\n\n```\nlet fruits = [\"apple\", \"banana\", \"cherry\"];\n\nfor (let i = 0; i < fruits.length; i++) {\n  console.log(fruits[i]);\n}\n```\n\nNotice: the condition is `i < fruits.length`, NOT `i <= fruits.length`. If the array has 3 items, their indices are 0, 1, 2. Using `<=` would try to access index 3, which doesn't exist and gives you `undefined`.\n\nThis is exactly how Amazon's product page works: it has an array of product images and loops through them to display each thumbnail.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip: Off-by-one errors",
            body: "The most common loop bug is the 'off-by-one' error — your loop runs one too many or one too few times. Always double-check: should the condition use `<` or `<=`? Should you start at 0 or 1? When in doubt, trace through the first and last iterations manually.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `let colors = ["red", "green", "blue", "yellow"];\n\nfor (let i = 0; i < colors.length; i++) {\n  console.log("Color " + (i + 1) + ": " + colors[i]);\n}\n// Color 1: red\n// Color 2: green\n// Color 3: blue\n// Color 4: yellow`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "complete-for-loop",
      type: "gap-fill",
      instruction: {
        heading: "Complete the for loop",
        body: "Fill in the three parts of the for loop header to print the numbers 1 through 5.",
      },
      config: {
        type: "gap-fill",
        template:
          'for ({{init}}; {{condition}}; {{update}}) {\n  console.log(i);\n}\n// Should print: 1, 2, 3, 4, 5',
        gaps: [
          {
            id: "init",
            placeholder: "initialization",
            acceptedAnswers: ["let i = 1"],
            caseSensitive: true,
          },
          {
            id: "condition",
            placeholder: "condition",
            acceptedAnswers: ["i <= 5", "i < 6"],
            caseSensitive: true,
          },
          {
            id: "update",
            placeholder: "update",
            acceptedAnswers: ["i++", "i += 1", "i = i + 1"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["init", "condition", "update"],
        },
      },
      hints: [
        "We want to start counting at 1, so initialize with let i = 1",
        "We want to include 5, so use <= 5 (or < 6)",
        "After each iteration, increase i by 1. The shorthand for that is i++",
      ],
    },
    {
      id: "multiplication-table",
      type: "js-console",
      instruction: {
        heading: "Build a multiplication table",
        body: "Use a for loop to print the multiplication table for 7 (from 7 x 1 to 7 x 10). Each line should look like:\n\n`\"7 x 1 = 7\"`\n`\"7 x 2 = 14\"`\n... and so on up to `\"7 x 10 = 70\"`.\n\nUse string concatenation (`+`) or template literals to build each line.",
      },
      config: {
        type: "js-console",
        starterCode: `let number = 7;\n\n// Write a for loop that prints the multiplication table\n// from 7 x 1 to 7 x 10\n`,
        expectedOutput: [
          "7 x 1 = 7",
          "7 x 2 = 14",
          "7 x 3 = 21",
          "7 x 4 = 28",
          "7 x 5 = 35",
          "7 x 6 = 42",
          "7 x 7 = 49",
          "7 x 8 = 56",
          "7 x 9 = 63",
          "7 x 10 = 70",
        ],
      },
      validation: {
        type: "console-output-match",
        criteria: { expectedOutput: ["7 x 1 = 7", "7 x 10 = 70"] },
      },
      hints: [
        "Start your loop at 1 and go up to 10: for (let i = 1; i <= 10; i++)",
        "Inside the loop, multiply number * i to get the result.",
        'Use console.log(number + " x " + i + " = " + number * i) to format the output.',
      ],
    },
  ],
};
