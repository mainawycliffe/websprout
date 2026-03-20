import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-flow-control-ternary",
  slug: "ternary",
  title: "The Ternary Operator",
  description:
    "Write compact one-line conditionals for simple either/or decisions — a concise alternative to if...else.",
  order: 7,
  steps: [
    {
      id: "why-ternary",
      type: "explanation",
      instruction: {
        heading: "A shortcut for simple decisions",
        body: "Sometimes you need a quick either/or decision to assign a value. With if/else, that takes at least 5 lines:\n\n```\nlet message;\nif (isLoggedIn) {\n  message = \"Welcome back!\";\n} else {\n  message = \"Please log in.\";\n}\n```\n\nThe **ternary operator** lets you do the same thing in one line:\n\n```\nlet message = isLoggedIn ? \"Welcome back!\" : \"Please log in.\";\n```\n\nIt's called 'ternary' because it takes three parts: a condition, a result for true, and a result for false. It's not a replacement for all if/else statements — just the simple ones where you're picking between two values.",
        analogy:
          "The ternary operator is like a quick text message reply: 'Is it raining? Umbrella : Sunglasses' — one line, two options, done. No need to write a whole paragraph when a quick answer will do.",
        docLinks: [
          {
            label: "Conditional (ternary) operator",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator",
            type: "js-operator",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The ternary operator `? :` is the only JavaScript operator that takes three operands. It has been part of the language since the beginning and exists in nearly every C-family language (C, C++, Java, C#, PHP).",
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
      id: "ternary-syntax",
      type: "explanation",
      instruction: {
        heading: "Ternary syntax breakdown",
        body: "The ternary operator has this structure:\n\n```\ncondition ? valueIfTrue : valueIfFalse\n```\n\n- The **condition** is evaluated first (just like in an `if` statement).\n- If `true`, the expression resolves to `valueIfTrue`.\n- If `false`, it resolves to `valueIfFalse`.\n\nBecause it produces a value (unlike if/else, which is a *statement*), you can use it anywhere a value is expected:\n\n- Assigning to a variable: `let status = age >= 18 ? \"adult\" : \"minor\";`\n- Inside a string: `` console.log(`You are ${age >= 18 ? \"an adult\" : \"a minor\"}`); ``\n- As a function argument: `greet(isVIP ? \"Welcome, VIP!\" : \"Hello!\")`\n\nOn websites like Twitter/X, the like button label is often set with a ternary: `isLiked ? \"Unlike\" : \"Like\"`.",
      },
      config: {
        type: "explanation",
        demoCode: `let score = 85;\nlet grade = score >= 60 ? "Pass" : "Fail";\nconsole.log(grade); // "Pass"\n\nlet hour = 20;\nlet greeting = hour < 12 ? "Good morning" : "Good evening";\nconsole.log(greeting); // "Good evening"\n\n// Using ternary inside a template literal\nlet items = 3;\nconsole.log(\`You have \${items} item\${items === 1 ? "" : "s"} in your cart.\`);\n// "You have 3 items in your cart."`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "when-not-to-use",
      type: "explanation",
      instruction: {
        heading: "When NOT to use ternaries",
        body: "The ternary operator is great for simple, two-option choices. But it becomes unreadable quickly if you try to do too much:\n\n**Bad — nested ternaries:**\n```\nlet label = score >= 90 ? \"A\" : score >= 80 ? \"B\" : score >= 70 ? \"C\" : \"F\";\n// Hard to read! Use if/else or switch instead.\n```\n\n**Bad — complex logic in ternary:**\n```\nisAdmin ? (deleteUser(), logAction(), sendEmail()) : showError();\n// Too much happening! Use if/else.\n```\n\n**Good rule of thumb:** If your ternary doesn't fit comfortably on one line, or if you need to do more than pick between two values, use `if/else` instead. Code is read far more often than it's written — always favor clarity over cleverness.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip: Don't nest ternaries",
            body: "Nested ternaries (putting a ternary inside another ternary) are technically valid but widely considered bad practice. They're hard to read and a common source of bugs. Most professional code style guides explicitly ban nested ternaries. If you need more than two options, use if/else if/else or switch.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// GOOD: simple ternary\nlet canVote = age >= 18 ? "Yes" : "No";\n\n// BAD: nested ternary — hard to read!\nlet grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";\n\n// BETTER: use if/else for multiple conditions\nlet grade2;\nif (score >= 90) grade2 = "A";\nelse if (score >= 80) grade2 = "B";\nelse if (score >= 70) grade2 = "C";\nelse grade2 = "F";`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "convert-to-ternary",
      type: "gap-fill",
      instruction: {
        heading: "Convert if/else to ternary",
        body: "The if/else below assigns a shipping label. Convert it to a single-line ternary expression by filling in the blanks.\n\n```\n// Original if/else:\nlet label;\nif (weight > 50) {\n  label = \"Heavy\";\n} else {\n  label = \"Standard\";\n}\n```",
      },
      config: {
        type: "gap-fill",
        template:
          'let label = weight {{operator}} 50 {{ternaryTrue}} "Heavy" {{ternarySep}} "Standard";',
        gaps: [
          {
            id: "operator",
            placeholder: "comparison",
            acceptedAnswers: [">"],
            caseSensitive: true,
          },
          {
            id: "ternaryTrue",
            placeholder: "symbol",
            acceptedAnswers: ["?"],
            caseSensitive: true,
          },
          {
            id: "ternarySep",
            placeholder: "symbol",
            acceptedAnswers: [":"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["operator", "ternaryTrue", "ternarySep"],
        },
      },
      hints: [
        "The condition checks if weight is greater than 50 — what comparison operator is that?",
        "After the condition, the ternary uses a ? to introduce the true value.",
        "A colon : separates the true value from the false value.",
      ],
    },
    {
      id: "status-message-generator",
      type: "js-console",
      instruction: {
        heading: "Build a status message generator",
        body: "Use ternary operators to generate status messages. Create three variables using ternaries:\n\n1. `onlineStatus` — If `isOnline` is true, set to `\"Online\"`, otherwise `\"Offline\"`\n2. `badge` — If `messageCount` is greater than 0, set to `messageCount + \" new\"`, otherwise `\"No new\"`\n3. Log a combined message: `\"Status: Online | No new messages\"` (use your variables)\n\nThe starter values should produce: `\"Status: Online | No new messages\"`",
      },
      config: {
        type: "js-console",
        starterCode: `let isOnline = true;\nlet messageCount = 0;\n\n// Create onlineStatus using a ternary\n\n// Create badge using a ternary\n\n// Log the combined status message\n`,
        expectedOutput: ["Status: Online | No new messages"],
      },
      validation: {
        type: "console-output-match",
        criteria: { expectedOutput: ["Status: Online | No new messages"] },
      },
      hints: [
        'For onlineStatus: let onlineStatus = isOnline ? "Online" : "Offline";',
        'For badge: let badge = messageCount > 0 ? messageCount + " new" : "No new";',
        "Combine them with: console.log(\"Status: \" + onlineStatus + \" | \" + badge + \" messages\");",
      ],
    },
  ],
};
