import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-intro-variables-let",
  slug: "variables-let",
  title: "Variables with let",
  description:
    "Learn how to store and update values using variables — the building blocks of every program.",
  order: 3,
  steps: [
    {
      id: "what-are-variables",
      type: "explanation",
      instruction: {
        heading: "A labeled box that holds a value",
        body: "Programs need to remember things. A game needs to track your score. A shopping site needs to remember what's in your cart. A chat app stores the message you're typing. In JavaScript, you store values using variables.\n\nA variable has two parts: a name (the label) and a value (what's inside). You create one with the `let` keyword, give it a name, use `=` to assign a value, and end the line with a semicolon. The name can be almost anything you choose — but it should describe what's stored inside, so your code is easy to read.",
        analogy:
          "Imagine a row of labeled boxes on a shelf. Each box has a name tag and holds one thing inside. A box labeled 'age' might hold the number 25. A box labeled 'name' might hold the text 'Alice'. You can look inside any box by reading its label, and you can swap out what's inside whenever you need to.",
        docLinks: [
          {
            label: "let",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'let age = 25;\nlet name = "Alice";\nconsole.log(age);\nconsole.log(name);',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "let-reassignment",
      type: "explanation",
      instruction: {
        heading: "Changing what's in the box",
        body: "The power of `let` is that the value can change over time. After you create a variable, you can reassign it — replace the old value with a new one — by using the variable name and `=` again, without the `let` keyword. You only use `let` once, when you first create the variable. After that, just use the name.\n\nThis is essential for anything that changes: a score going up, a countdown timer ticking down, a user updating their profile name. The variable name stays the same, but the value inside evolves as the program runs.",
        analogy:
          "It's like a whiteboard with your name on it. The first time, you write a number on it. Later, you erase the old number and write a new one. The whiteboard (variable) is the same — only the contents changed.",
        docLinks: [
          {
            label: "let",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "`let` was introduced in ES6 (ECMAScript 2015) as a modern replacement for the older `var` keyword. Unlike `var`, `let` is block-scoped — meaning it only exists within the nearest curly braces `{}`. This prevents many confusing bugs that plagued JavaScript for years. Today, `let` (and its sibling `const`) are the standard way to declare variables.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "let score = 0;\nconsole.log(score);\nscore = 10;\nconsole.log(score);",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "gap-fill-let-basics",
      type: "gap-fill",
      instruction: {
        heading: "Declare a variable",
        body: 'Use the correct keyword to create a variable called `greeting` that holds the text "Hello", then create a variable called `count` and give it a starting number.',
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Variable names are case-sensitive: `greeting` and `Greeting` are two different variables. By convention, JavaScript variable names use camelCase — starting lowercase, with each new word capitalized (like `firstName` or `itemCount`).",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template:
          '{{keyword}} greeting = "Hello";\nconsole.log(greeting);\n\nlet count = {{value}};\nconsole.log(count);',
        gaps: [
          {
            id: "keyword",
            placeholder: "keyword",
            acceptedAnswers: ["let"],
            caseSensitive: true,
          },
          {
            id: "value",
            placeholder: "number",
            acceptedAnswers: ["0", "1", "2", "3", "4", "5", "10", "100", "42", "7", "99"],
            caseSensitive: false,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["keyword", "value"],
        },
      },
      hints: [
        "Which keyword did we just learn for creating variables?",
        "Any number works for count — try 0, 1, or any number you like.",
      ],
    },
    {
      id: "gap-fill-reassignment",
      type: "gap-fill",
      instruction: {
        heading: "Reassign a variable",
        body: "The variable `temperature` starts at 72. Change it to a new value on the third line. Remember: you don't use `let` again when reassigning — the variable already exists.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "A common beginner mistake is writing `let temperature = 85;` on the reassignment line. This would try to create a brand new variable with the same name, which causes an error. Once a variable exists, just use its name directly: `temperature = 85;`",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template:
          "let temperature = 72;\nconsole.log(temperature);\ntemperature = {{new_value}};\nconsole.log(temperature);",
        gaps: [
          {
            id: "new_value",
            placeholder: "new number",
            acceptedAnswers: [
              "0", "1", "10", "32", "50", "68", "70", "75", "80", "85",
              "90", "95", "100", "212",
            ],
            caseSensitive: false,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["new_value"],
        },
      },
      hints: [
        "Just type any number — you're choosing what the new temperature should be.",
        "Don't add `let` before temperature — the variable already exists from the first line.",
      ],
    },
    {
      id: "js-console-variables",
      type: "js-console",
      instruction: {
        heading: "Your turn: create and change a variable",
        body: "Create a variable called `lives` that starts at 3 (like in a video game). Log it so you can see the starting value. Then reassign it to 2 — the player lost a life! — and log it again. You should see both 3 and 2 printed in the console.",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Variable names in JavaScript can contain letters, digits, underscores (_), and dollar signs ($), but must not start with a digit. Names like `lives`, `player1Score`, and `_count` are all valid. Names like `2fast` or `my-var` (with a hyphen) are not.",
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode:
          "// Create a variable called \"lives\" with a starting value of 3\n// Then change it to 2\n// Log both values\n",
        expectedOutput: ["3", "2"],
      },
      validation: {
        type: "contains-js",
        criteria: {
          keywords: ["let", "lives", "console.log"],
        },
      },
      hints: [
        "Start with: let lives = 3;",
        "Use console.log(lives); to print the current value.",
        "To reassign, just write: lives = 2; (no let keyword this time).",
        "Don't forget to console.log(lives); again after reassigning!",
      ],
    },
  ],
};
