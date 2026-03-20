import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-intro-capstone",
  slug: "capstone-tip-calculator",
  title: "Capstone: Tip Calculator",
  description:
    "Put everything together by building a tip calculator that computes how much to tip at a restaurant.",
  order: 6,
  steps: [
    {
      id: "capstone-intro",
      type: "explanation",
      instruction: {
        heading: "Let's put it all together!",
        body: "We'll build a tip calculator that computes how much to tip at a restaurant. You've learned variables, data types, operators, and console.log — this project uses all of them. By the end, you'll have a working calculator that takes a bill amount, applies a tip percentage, and tells you exactly how much to pay.",
        analogy:
          "Imagine you're at a restaurant and the bill comes. You want to leave a 15% tip — let's write code to figure out the exact amount instead of guessing or reaching for a phone calculator.",
        docLinks: [
          {
            label: "Arithmetic operators",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators#arithmetic_operators",
            type: "js-operator",
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
      id: "capstone-variables",
      type: "gap-fill",
      instruction: {
        heading: "Set up the variables",
        body: "Every tip calculation starts with two pieces of information: the bill amount and the tip percentage. We need to store these in variables so we can use them in our math. Since these values won't change during the calculation, we should use the keyword that prevents reassignment.",
        docLinks: [
          {
            label: "const declaration",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "In JavaScript, percentages are written as decimals: 15% becomes 0.15, 20% becomes 0.20, and so on. Just divide the percentage by 100.",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template:
          "// The restaurant bill\n{{bill_keyword}} billAmount = 50;\n\n// Tip percentage (15%)\n{{tip_keyword}} tipRate = 0.15;",
        gaps: [
          {
            id: "bill_keyword",
            placeholder: "keyword",
            acceptedAnswers: ["const"],
            caseSensitive: true,
          },
          {
            id: "tip_keyword",
            placeholder: "keyword",
            acceptedAnswers: ["const"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: { bill_keyword: "const", tip_keyword: "const" },
      },
      hints: [
        "Both values won't change once set — which keyword locks a value?",
        "Use const for values that don't change",
      ],
    },
    {
      id: "capstone-calculate-tip",
      type: "gap-fill",
      instruction: {
        heading: "Calculate the tip",
        body: "Now that we have the bill amount and tip rate stored in variables, we can compute the tip. To find 15% of $50, we need to multiply the bill by the rate. Which arithmetic operator performs multiplication in JavaScript?",
        docLinks: [
          {
            label: "Multiplication operator (*)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Multiplication",
            type: "js-operator",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template:
          "const billAmount = 50;\nconst tipRate = 0.15;\n\n// Calculate the tip amount\nconst tipAmount = billAmount {{operator}} tipRate;\nconsole.log(tipAmount);",
        gaps: [
          {
            id: "operator",
            placeholder: "operator",
            acceptedAnswers: ["*"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: { operator: "*" },
      },
      hints: [
        "To find 15% of 50, you multiply",
        "Use the * operator for multiplication",
      ],
    },
    {
      id: "capstone-calculate-total",
      type: "gap-fill",
      instruction: {
        heading: "Calculate the total",
        body: "We know the tip amount — now let's find the total bill. The total is simply the original bill plus the tip. Store it in a descriptively named variable and log it to the console so you can verify the result.",
        docLinks: [
          {
            label: "Addition operator (+)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition",
            type: "js-operator",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Use camelCase for variable names with multiple words: `totalBill`, `tipAmount`, `totalAmount`. This is the standard naming convention in JavaScript.",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template:
          "const billAmount = 50;\nconst tipRate = 0.15;\nconst tipAmount = billAmount * tipRate;\n\n// Calculate the total bill\nconst {{total_name}} = billAmount + tipAmount;\nconsole.log({{log_value}});",
        gaps: [
          {
            id: "total_name",
            placeholder: "variableName",
            acceptedAnswers: ["total", "totalBill", "totalAmount"],
            caseSensitive: true,
          },
          {
            id: "log_value",
            placeholder: "variableName",
            acceptedAnswers: ["total", "totalBill", "totalAmount"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          total_name: ["total", "totalBill", "totalAmount"],
          log_value: ["total", "totalBill", "totalAmount"],
        },
      },
      hints: [
        "Give the total a descriptive camelCase name",
        "Log the variable you just created",
      ],
    },
    {
      id: "capstone-free-code",
      type: "js-console",
      instruction: {
        heading: "Your turn: build the complete tip calculator",
        body: "Now write the entire tip calculator from scratch! Pick your own bill amount and tip percentage. Calculate both the tip and the total, then log them to the console. This is your chance to prove you understand variables, arithmetic, and console.log — all in one program.",
        analogy:
          "You've learned each ingredient separately — now it's time to cook the whole meal on your own.",
        docLinks: [
          {
            label: "console.log()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/console/log_static",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode:
          "// Build a complete tip calculator!\n// 1. Create a constant for the bill amount (pick any amount)\n// 2. Create a constant for the tip percentage (try 20% = 0.20)\n// 3. Calculate the tip amount\n// 4. Calculate the total (bill + tip)\n// 5. Log both the tip amount and total\n",
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["const", "console.log"] },
      },
      hints: [
        "Start by declaring your bill amount with const",
        "Remember: 20% is written as 0.20 in code",
        "Use * to multiply and + to add",
        "Use console.log() to display your results",
      ],
    },
  ],
};
