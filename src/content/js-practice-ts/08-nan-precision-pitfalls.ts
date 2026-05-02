import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-practice-ts-nan-precision-pitfalls",
  slug: "nan-precision-pitfalls",
  title: "NaN, null vs undefined, and Number Precision",
  description:
    "The three small-but-everywhere quirks: NaN is not equal to itself, null vs undefined have different meanings, and 0.1 + 0.2 isn't 0.3.",
  order: 8,
  steps: [
    {
      id: "nan-explainer",
      type: "explanation",
      instruction: {
        heading: "NaN: the value not equal to itself",
        body: "<p><code>NaN</code> stands for Not-A-Number and is the result of meaningless math: <code>0/0</code>, <code>Math.sqrt(-1)</code>, <code>Number(\"hello\")</code>. It exists because the IEEE 754 floating-point spec demands that broken math returns a defined value rather than crashing.</p><p>NaN has one famous property: it is NOT equal to itself. <code>NaN === NaN</code> is <code>false</code>. This is why JavaScript ships <code>Number.isNaN(x)</code> — the right way to check.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Always use <code>Number.isNaN</code>, not the global <code>isNaN</code>. The global one coerces its argument first — <code>isNaN(\"hello\")</code> returns <code>true</code> because <code>\"hello\"</code> coerces to <code>NaN</code>, which is misleading. <code>Number.isNaN(\"hello\")</code> correctly returns <code>false</code> because <code>\"hello\"</code> is not actually <code>NaN</code>.",
          },
        ],
        docLinks: [
          {
            label: "Number.isNaN (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN",
            type: "js-method",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "global-vs-number-isnan",
      type: "js-console",
      instruction: {
        heading: "Compare isNaN and Number.isNaN",
        body: "<p>Run the experiment. Notice how the global <code>isNaN</code> gives wrong answers for non-numbers, while <code>Number.isNaN</code> tells you the truth.</p>",
      },
      config: {
        type: "js-console",
        starterCode:
          'console.log(isNaN("hello"));           // true  (misleading!)\nconsole.log(Number.isNaN("hello"));    // false (correct — "hello" is a string)\n\nconsole.log(isNaN(NaN));               // true\nconsole.log(Number.isNaN(NaN));        // true\n\nconsole.log(Number.isNaN(0/0));        // ?  guess before running\nconsole.log(Number.isNaN(undefined));  // ?  guess before running',
        expectedOutput: ["true", "false", "true", "true", "true", "false"],
      },
      validation: {
        type: "console-output-match",
        criteria: { expected: ["true", "false", "true", "true", "true", "false"] },
      },
      hints: [
        "<code>0/0</code> evaluates to <code>NaN</code>.",
        "<code>undefined</code> is not <code>NaN</code>, so <code>Number.isNaN(undefined)</code> is <code>false</code>.",
      ],
    },
    {
      id: "null-vs-undefined",
      type: "explanation",
      instruction: {
        heading: "null vs undefined: who set what",
        body: "<p>Both mean &quot;no value&quot;, but with different intent:</p><ul><li><code>undefined</code> = JavaScript hasn't set this. A function that doesn't return anything returns <code>undefined</code>; an unset object property reads as <code>undefined</code>.</li><li><code>null</code> = a developer explicitly said &quot;empty here&quot;. APIs use <code>null</code> for fields that were intentionally cleared, like <code>user.avatar = null</code>.</li></ul><p>One concrete consequence: <strong>JSON has <code>null</code> but no <code>undefined</code></strong>. <code>JSON.stringify({ a: undefined })</code> drops the field. <code>JSON.stringify({ a: null })</code> keeps it.</p>",
        docLinks: [
          {
            label: "null (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null",
            type: "js-concept",
          },
          {
            label: "undefined (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "pick-null-or-undefined",
      type: "gap-fill",
      instruction: {
        heading: "Pick the right one",
        body: "<p>For each scenario, fill in <code>null</code> or <code>undefined</code> — whichever models the situation more accurately.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          '// 1. A function that does nothing returns this:\nfunction noop() {}\nconsole.log(noop()); // {{a}}\n\n// 2. A user clears their profile picture. The avatar field becomes:\nuser.avatar = {{b}};\n\n// 3. You read a property that was never set:\nconst obj = {};\nconsole.log(obj.missing); // {{c}}\n\n// 4. An API returns a row where the column is intentionally blank:\n// (the JSON looks like {"middleName": _____ })\n// Fill in the JSON value:\n{{d}}',
        gaps: [
          { id: "a", placeholder: "null or undefined", acceptedAnswers: ["undefined"], caseSensitive: true },
          { id: "b", placeholder: "null or undefined", acceptedAnswers: ["null"], caseSensitive: true },
          { id: "c", placeholder: "null or undefined", acceptedAnswers: ["undefined"], caseSensitive: true },
          { id: "d", placeholder: "null or undefined", acceptedAnswers: ["null"], caseSensitive: true },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["a", "b", "c", "d"] } },
      hints: [
        "If the developer set the field deliberately, it's <code>null</code>.",
        "If JS or the runtime is the one returning &quot;not set&quot;, it's <code>undefined</code>.",
        "JSON only has <code>null</code> — there is no JSON <code>undefined</code>.",
      ],
    },
    {
      id: "money-precision",
      type: "explanation",
      instruction: {
        heading: "0.1 + 0.2 is not 0.3",
        body: "<p>JavaScript numbers are 64-bit floating-point (IEEE 754). Most decimals can’t be represented exactly in binary, so <code>0.1 + 0.2</code> is <code>0.30000000000000004</code>. This is not a JavaScript bug — Python, Java, and C all behave the same way.</p><p><strong>This is why your bank, Stripe, and PayPal store money as integer cents</strong>, not decimal dollars. <code>$1.99</code> is stored as <code>199</code>. Add and subtract integers; divide by 100 only when displaying.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "If you must work in decimals, the safe pattern is <code>Number((a + b).toFixed(2))</code>. <code>toFixed(2)</code> rounds and returns a string with two decimals; <code>Number(...)</code> turns it back into a number. Or use a library like <code>decimal.js</code>.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "console.log(0.1 + 0.2);                     // 0.30000000000000004\nconsole.log(0.1 + 0.2 === 0.3);             // false (!)\n\n// Safe display\nconsole.log((0.1 + 0.2).toFixed(2));        // \"0.30\"\nconsole.log(Number((0.1 + 0.2).toFixed(2))); // 0.3\n\n// Real solution: store cents\nconst priceCents = 199; // $1.99\nconst total = priceCents * 3;\nconsole.log(`$${(total / 100).toFixed(2)}`); // \"$5.97\"",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "add-money",
      type: "js-console",
      instruction: {
        heading: "Build addMoney",
        body: "<p>Write <code>addMoney(a, b)</code> that adds two decimal money values and returns a number rounded to 2 decimal places. The classic <code>0.1 + 0.2</code> case must produce <code>0.3</code>.</p>",
      },
      config: {
        type: "js-console",
        starterCode:
          "function addMoney(a, b) {\n  // round (a + b) to 2 decimals, return as a number\n}\n\nconsole.log(addMoney(0.1, 0.2));   // 0.3\nconsole.log(addMoney(1.005, 2.5)); // 3.51 (or 3.5 depending on rounding)\nconsole.log(addMoney(99.99, 0.01)); // 100",
        expectedOutput: ["0.3"],
      },
      validation: {
        type: "console-output-match",
        criteria: { expected: ["0.3"] },
      },
      hints: [
        "<code>(a + b).toFixed(2)</code> gives a 2-decimal string.",
        "Wrap in <code>Number(...)</code> to return a number.",
        "Full one-liner: <code>return Number((a + b).toFixed(2));</code>",
      ],
    },
  ],
};
