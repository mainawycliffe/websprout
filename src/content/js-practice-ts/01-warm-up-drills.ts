import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-practice-ts-warm-up-drills",
  slug: "warm-up-drills",
  title: "Warm-Up: Variables & Math Drills",
  description:
    "Shake off the rust. Quickfire drills on const, let, template literals, and arithmetic to build muscle memory before we go deeper.",
  order: 1,
  steps: [
    {
      id: "warm-up-intro",
      type: "explanation",
      instruction: {
        heading: "Why drills?",
        body: "<p>Senior engineers at Google, Stripe, and Shopify don't pause to look up <code>const</code> syntax — fluency frees their brains for harder problems. The way you get fluent is the same way pianists get fluent: short, focused repetitions of the basics.</p><p>This module assumes you have completed <strong>JS Playground</strong>, <strong>Data Explorer</strong>, <strong>Flow Control</strong>, and <strong>Function Factory</strong>. We won't re-teach those concepts — we'll drill them, then push you into the famous quirks of JavaScript and finally on-ramp to TypeScript.</p><p>Let's start small. Variables, template literals, and a few math operations.</p>",
        analogy:
          "Think of these drills as scales for a musician. The pieces of music you'll play later (closures, generics, discriminated unions) all rest on the scales feeling automatic.",
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "declare-three",
      type: "gap-fill",
      instruction: {
        heading: "Pick the right keyword",
        body: "<p>You have three values. One never changes (the user's first name once they sign up), one is updated on every quiz (their score), and one flips when the game ends (whether they won).</p><p>Pick <code>const</code> for values that should never be reassigned, and <code>let</code> for values that will change.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Default to <code>const</code>. Reach for <code>let</code> only when you actually need to reassign. If you find yourself reaching for <code>var</code> — don't. <code>var</code> has scoping quirks we'll cover in the quirks lessons.",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template:
          '{{kw1}} firstName = "Amani";\n{{kw2}} score = 0;\n{{kw3}} isWinner = false;\n\nscore = score + 10;\nisWinner = score > 5;',
        gaps: [
          { id: "kw1", placeholder: "keyword", acceptedAnswers: ["const"], caseSensitive: true },
          { id: "kw2", placeholder: "keyword", acceptedAnswers: ["let"], caseSensitive: true },
          { id: "kw3", placeholder: "keyword", acceptedAnswers: ["let"], caseSensitive: true },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["kw1", "kw2", "kw3"] } },
      hints: [
        "If a value is reassigned later, it cannot be <code>const</code>.",
        "<code>firstName</code> is never reassigned. <code>score</code> and <code>isWinner</code> are.",
      ],
    },
    {
      id: "template-literal",
      type: "gap-fill",
      instruction: {
        heading: "Build a receipt with a template literal",
        body: "<p>Template literals (the backtick strings) interpolate values directly into a string with <code>${expression}</code>. They're how every modern app builds dynamic strings — no more <code>'$' + price + ' for ' + name</code> chains.</p><p>Fill the gaps to build the receipt line.</p>",
        docLinks: [
          {
            label: "Template literals (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template:
          'const name = "Wanjiru";\nconst total = 1250;\n\nconst receipt = {{open}}Hello ${name}, your total is KSh ${total}.{{close}};\n\nconsole.log(receipt);',
        gaps: [
          { id: "open", placeholder: "open quote", acceptedAnswers: ["`"], caseSensitive: true },
          { id: "close", placeholder: "close quote", acceptedAnswers: ["`"], caseSensitive: true },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["open", "close"] } },
      hints: [
        "Template literals use backticks, not single or double quotes.",
        "The backtick character is to the left of the <code>1</code> key on most keyboards.",
      ],
    },
    {
      id: "math-six-pack",
      type: "js-console",
      instruction: {
        heading: "Six math micro-drills",
        body: "<p>Run six tiny drills in one buffer. Each <code>console.log</code> should produce the value in the comment to its right.</p><p>You'll use <code>%</code> (remainder), <code>**</code> (exponent), and <code>++</code> (increment).</p>",
        docLinks: [
          {
            label: "Arithmetic operators (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#arithmetic_operators",
            type: "js-operator",
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode:
          '// Fill in the right-hand side of each log so the output matches the comment.\nconsole.log(/* remainder of 17 / 5 */); // 2\nconsole.log(/* 2 to the power of 10 */); // 1024\nlet n = 4;\nn++;\nconsole.log(n); // 5\nconsole.log(/* is 8 even? use % */); // true\nconsole.log(/* round 3.7 down */); // 3\nconsole.log(/* the larger of 12 and 30 */); // 30',
        expectedOutput: ["2", "1024", "5", "true", "3", "30"],
      },
      validation: {
        type: "console-output-match",
        criteria: { expected: ["2", "1024", "5", "true", "3", "30"] },
      },
      hints: [
        "Remainder is <code>%</code>. <code>17 % 5</code> is <code>2</code>.",
        "Exponent is <code>**</code>. <code>2 ** 10</code> is <code>1024</code>.",
        "Even check: <code>8 % 2 === 0</code>.",
        "Use <code>Math.floor</code> to round down and <code>Math.max</code> for the larger of two.",
      ],
    },
    {
      id: "swap-with-temp",
      type: "js-console",
      instruction: {
        heading: "Swap two variables",
        body: "<p>A classic interview warm-up: swap the values of <code>a</code> and <code>b</code> using a temporary variable. Modern JS has destructuring tricks for this, but the temp-variable version is the foundation everyone should be able to write in their sleep.</p>",
      },
      config: {
        type: "js-console",
        starterCode:
          'let a = "first";\nlet b = "second";\n\n// Swap a and b using a temporary variable.\n// Your code here:\n\n\nconsole.log(a); // should print "second"\nconsole.log(b); // should print "first"',
        expectedOutput: ["second", "first"],
      },
      validation: {
        type: "console-output-match",
        criteria: { expected: ["second", "first"] },
      },
      hints: [
        "Save <code>a</code> into a third variable before overwriting it.",
        "Pattern: <code>const temp = a; a = b; b = temp;</code>",
      ],
    },
  ],
};
