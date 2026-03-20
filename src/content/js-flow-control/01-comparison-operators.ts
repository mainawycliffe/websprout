import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-flow-control-comparison-operators",
  slug: "comparison-operators",
  title: "Comparison Operators",
  description:
    "Learn how JavaScript compares values and produces true or false verdicts — the foundation of every decision your code will ever make.",
  order: 1,
  steps: [
    {
      id: "why-compare",
      type: "explanation",
      instruction: {
        heading: "Why does code need to compare things?",
        body: "Every interesting program makes decisions: Is the user old enough? Did the password match? Is the shopping cart empty? Before your code can decide anything, it needs a way to compare two values and get a yes-or-no answer. That answer is always one of two JavaScript values: `true` or `false` (called **booleans**). Comparison operators are the tools that produce those booleans.",
        analogy:
          "Comparison operators are like a judge at a competition — they look at two things and give a verdict: true or false. 'Is contestant A's score higher than contestant B's?' The judge doesn't change the scores; they just announce the result.",
        docLinks: [
          {
            label: "Comparison operators",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#comparison_operators",
            type: "js-operator",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Comparison operators are defined in the ECMAScript specification. Every JavaScript engine — whether in Chrome, Firefox, Safari, or Node.js — follows the same rules for how comparisons work, so your code behaves identically everywhere.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `let age = 18;\nconsole.log(age >= 18); // true\nconsole.log(age > 21);  // false`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "strict-equality",
      type: "explanation",
      instruction: {
        heading: "Strict equality (===) and strict inequality (!==)",
        body: "The **strict equality** operator `===` checks whether two values are the same value *and* the same type. If both match, you get `true`; otherwise `false`. Its opposite, `!==`, returns `true` when the values are different in value or type.\n\nExamples:\n- `5 === 5` → `true` (same value, same type)\n- `5 === \"5\"` → `false` (number vs. string — different types!)\n- `\"hello\" !== \"world\"` → `true` (different values)\n- `10 !== 10` → `false` (same value and type)\n\nOn Google's login page, when you submit your password, JavaScript compares what you typed against the stored value using strict equality. If it matches exactly, you get in.",
        docLinks: [
          {
            label: "Strict equality (===)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality",
            type: "js-operator",
          },
          {
            label: "Strict inequality (!==)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_inequality",
            type: "js-operator",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip: Always use === instead of ==",
            body: "JavaScript also has a *loose* equality operator `==` that tries to convert types before comparing. This leads to bizarre surprises: `0 == \"\"` is `true`, and `null == undefined` is `true`. Professional developers almost exclusively use `===` and `!==` to avoid these traps. Make this your habit from day one.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `console.log(5 === 5);      // true\nconsole.log(5 === "5");    // false — different types!\nconsole.log(5 == "5");     // true — == converts types (avoid this!)\nconsole.log("hello" !== "world"); // true`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "relational-operators",
      type: "explanation",
      instruction: {
        heading: "Greater than, less than, and friends",
        body: "JavaScript has four relational operators for comparing magnitude:\n\n- `<` — **less than**: Is the left value smaller?\n- `>` — **greater than**: Is the left value bigger?\n- `<=` — **less than or equal to**: Is the left value smaller *or* the same?\n- `>=` — **greater than or equal to**: Is the left value bigger *or* the same?\n\nThese work with numbers as you'd expect. They also work with strings (compared alphabetically, character by character), but stick with numbers for now.\n\nReal-world example: On an e-commerce site like Amazon, JavaScript checks `cartTotal >= freeShippingThreshold` to decide whether to show the 'Free Shipping' badge.",
        docLinks: [
          {
            label: "Less than (<)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Less_than",
            type: "js-operator",
          },
          {
            label: "Greater than (>)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Greater_than",
            type: "js-operator",
          },
          {
            label: "Less than or equal (<=)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Less_than_or_equal",
            type: "js-operator",
          },
          {
            label: "Greater than or equal (>=)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Greater_than_or_equal",
            type: "js-operator",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `let temperature = 30;\n\nconsole.log(temperature > 25);   // true — it's hot!\nconsole.log(temperature < 0);    // false — not freezing\nconsole.log(temperature >= 30);  // true — exactly 30 counts\nconsole.log(temperature <= 29);  // false — 30 is not ≤ 29`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "predict-comparisons",
      type: "gap-fill",
      instruction: {
        heading: "Predict the verdict",
        body: "For each comparison below, fill in whether the result is `true` or `false`. Think carefully about types and values.",
      },
      config: {
        type: "gap-fill",
        template:
          '10 === 10     // {{result1}}\n"10" === 10   // {{result2}}\n7 > 3         // {{result3}}\n5 <= 5        // {{result4}}\n"abc" !== "abc" // {{result5}}',
        gaps: [
          {
            id: "result1",
            placeholder: "true or false",
            acceptedAnswers: ["true"],
            caseSensitive: false,
          },
          {
            id: "result2",
            placeholder: "true or false",
            acceptedAnswers: ["false"],
            caseSensitive: false,
          },
          {
            id: "result3",
            placeholder: "true or false",
            acceptedAnswers: ["true"],
            caseSensitive: false,
          },
          {
            id: "result4",
            placeholder: "true or false",
            acceptedAnswers: ["true"],
            caseSensitive: false,
          },
          {
            id: "result5",
            placeholder: "true or false",
            acceptedAnswers: ["false"],
            caseSensitive: false,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["result1", "result2", "result3", "result4", "result5"],
        },
      },
      hints: [
        "Remember: === checks both value AND type. A number and a string are different types.",
        "The <= operator returns true if the left side is less than OR equal to the right side.",
        "!== returns true only when the values are different. If both sides are the same, it returns false.",
      ],
    },
    {
      id: "practice-comparisons",
      type: "js-console",
      instruction: {
        heading: "Try comparisons yourself",
        body: "Use `console.log()` to test different comparisons. Try comparing:\n1. Your age to the voting age (18)\n2. The number of letters in your name to 5\n3. Whether the string `\"JavaScript\"` is strictly equal to `\"javascript\"` (careful — case matters!)\n\nExperiment! Every comparison returns `true` or `false`.",
      },
      config: {
        type: "js-console",
        starterCode: `// Try your own comparisons!\nlet myAge = 25;\nconsole.log(myAge >= 18);  // Can I vote?\n\n// Try comparing strings\nconsole.log("JavaScript" === "javascript");\n\n// Add more comparisons below:\n`,
        expectedOutput: ["true", "false"],
      },
      validation: {
        type: "console-output-match",
        criteria: { requiredOutputCount: 2 },
      },
      hints: [
        "Remember that string comparison is case-sensitive — uppercase and lowercase letters are different.",
        "Try using >, <, >=, <= with numbers to see how they work.",
      ],
    },
  ],
};
