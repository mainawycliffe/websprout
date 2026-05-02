import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-practice-ts-equality-coercion",
  slug: "equality-coercion",
  title: "== vs === and the Coercion Trap",
  description:
    "The infamous coercion table, why == is dangerous, the two legitimate uses, and how Object.is differs from === at the corners.",
  order: 7,
  steps: [
    {
      id: "ten-day-history",
      type: "explanation",
      instruction: {
        heading: "JavaScript was built in ten days",
        body: "<p>Brendan Eich wrote the first version of JavaScript in 1995, in ten days, under intense pressure from Netscape. Several decisions made then are now famous quirks. <code>==</code> is the headline one.</p><p><code>==</code> is <em>loose equality</em>: it tries to convert its operands to the same type before comparing. <code>===</code> is <em>strict equality</em>: same type required, no conversion. Loose equality leads to surprising results that have caused real bugs at real companies.</p><p>The fix: use <code>===</code> everywhere. ESLint configurations at React, Next.js, TypeScript, and most modern codebases enforce this with the <code>eqeqeq</code> rule.</p>",
        docLinks: [
          {
            label: "Equality comparisons (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "the-table",
      type: "explanation",
      instruction: {
        heading: "The infamous table",
        body: "<p>A few results from the <code>==</code> coercion algorithm — each one is true:</p><ul><li><code>0 == \"\"</code> — both coerce to <code>0</code>.</li><li><code>0 == \"0\"</code> — string <code>\"0\"</code> coerces to <code>0</code>.</li><li><code>\"\" == false</code> — both coerce to <code>0</code>.</li><li><code>null == undefined</code> — special case, both are loosely equal to each other but to nothing else.</li><li><code>[] == false</code> — empty array coerces to <code>0</code>, false coerces to <code>0</code>.</li><li><code>[] == ![]</code> — yes, an array equals its own negation. <code>![]</code> is <code>false</code>, then both coerce to <code>0</code>.</li></ul><p>Run the demo. Each line is genuinely <code>true</code>.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "There are two legitimate uses of <code>==</code>: writing <code>x == null</code> to catch both <code>null</code> and <code>undefined</code> in one check. Some teams accept this; others ban <code>==</code> entirely and write <code>x === null || x === undefined</code>. Either way, default to <code>===</code>.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'console.log(0 == "");          // true\nconsole.log(0 == "0");         // true\nconsole.log("" == false);      // true\nconsole.log(null == undefined); // true\nconsole.log([] == false);      // true\nconsole.log([] == ![]);        // true (!)\n\n// All of these are FALSE with ===\nconsole.log(0 === "");         // false\nconsole.log(null === undefined); // false',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "predict-five",
      type: "gap-fill",
      instruction: {
        heading: "Predict the output",
        body: "<p>Don’t run the code yet. Predict the output of each comparison and fill in <code>true</code> or <code>false</code>.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          '0 == "0"                 // {{a}}\n0 === "0"                // {{b}}\nnull == undefined        // {{c}}\nnull === undefined       // {{d}}\n"true" == true           // {{e}}',
        gaps: [
          { id: "a", placeholder: "true/false", acceptedAnswers: ["true"], caseSensitive: false },
          { id: "b", placeholder: "true/false", acceptedAnswers: ["false"], caseSensitive: false },
          { id: "c", placeholder: "true/false", acceptedAnswers: ["true"], caseSensitive: false },
          { id: "d", placeholder: "true/false", acceptedAnswers: ["false"], caseSensitive: false },
          { id: "e", placeholder: "true/false", acceptedAnswers: ["false"], caseSensitive: false },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["a", "b", "c", "d", "e"] } },
      hints: [
        "<code>==</code> coerces, <code>===</code> doesn’t.",
        '<code>"true"</code> as a string coerces to <code>NaN</code>, not to the boolean <code>true</code>.',
      ],
    },
    {
      id: "fix-the-bug",
      type: "js-console",
      instruction: {
        heading: "Fix a real bug from a form input",
        body: "<p>Form inputs always come back as strings. The buggy code below uses <code>==</code> and silently treats the string <code>\"0\"</code> as falsy-equal to numbers in surprising ways. Rewrite the comparison using <code>===</code> AND a proper conversion to a number.</p>",
      },
      config: {
        type: "js-console",
        starterCode:
          'const formValue = "0"; // came from <input>.value\n\n// BUG: this looks correct but uses == and mixes types\n// if (formValue == 0) { ... }\n\n// Rewrite the check below so it logs "muted" only when formValue\n// represents the number 0, comparing as numbers with ===.\nlet message;\n\n// Your code here that sets `message` to "muted" or "loud"\n\n\nconsole.log(message); // "muted"',
        expectedOutput: ["muted"],
      },
      validation: {
        type: "console-output-match",
        criteria: { expected: ["muted"] },
      },
      hints: [
        "Convert first: <code>const n = Number(formValue);</code>.",
        'Then <code>if (n === 0) message = "muted"; else message = "loud";</code>.',
      ],
    },
    {
      id: "object-is",
      type: "explanation",
      instruction: {
        heading: "Object.is — same as === except at the corners",
        body: "<p><code>Object.is(a, b)</code> implements the spec’s <strong>SameValue</strong> algorithm. It agrees with <code>===</code> almost everywhere — except at two corners that are widely considered <code>===</code> bugs:</p><ul><li><code>NaN === NaN</code> is <strong>false</strong> (the only value not equal to itself). <code>Object.is(NaN, NaN)</code> is <code>true</code>.</li><li><code>+0 === -0</code> is <strong>true</strong>. <code>Object.is(+0, -0)</code> is <code>false</code>.</li></ul><p>You will rarely need <code>Object.is</code> directly, but it is the right tool for the job when comparing potentially-NaN values without writing <code>Number.isNaN</code> checks.</p>",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "ECMAScript defines four equality algorithms: IsLooselyEqual (<code>==</code>), IsStrictlyEqual (<code>===</code>), SameValue (<code>Object.is</code>), and SameValueZero (used by <code>Map</code>, <code>Set</code>, and <code>Array.prototype.includes</code>). They differ only at NaN and signed zero.",
          },
        ],
        docLinks: [
          {
            label: "Object.is (MDN)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "console.log(NaN === NaN);          // false\nconsole.log(Object.is(NaN, NaN));  // true\n\nconsole.log(+0 === -0);            // true\nconsole.log(Object.is(+0, -0));    // false\n\n// Everywhere else they agree:\nconsole.log(Object.is(1, 1));      // true\nconsole.log(Object.is(\"x\", \"x\"));  // true\nconsole.log(Object.is({}, {}));    // false (different objects)",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "safe-equals",
      type: "free-edit",
      instruction: {
        heading: "Build safeEquals",
        body: "<p>Combine the rules into one helper:</p><ul><li>Two NaN values count as equal.</li><li><code>null</code> and <code>undefined</code> count as equal to each other (but not to other values).</li><li>Otherwise behave like <code>===</code>.</li></ul><p>This is a real pattern: many test libraries use a similar comparator for their <code>toEqual</code>.</p>",
      },
      config: {
        type: "free-edit",
        language: "javascript",
        starterCode:
          'function safeEquals(a, b) {\n  // 1. If both are NaN -> true\n  // 2. If a == null && b == null (catches null and undefined together) -> true\n  // 3. Otherwise return a === b\n}\n\nconsole.log(safeEquals(NaN, NaN));        // true\nconsole.log(safeEquals(null, undefined)); // true\nconsole.log(safeEquals(1, 1));            // true\nconsole.log(safeEquals(1, "1"));          // false\nconsole.log(safeEquals({}, {}));          // false',
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["Number.isNaN", "===", "return"] },
      },
      hints: [
        "<code>Number.isNaN(a) && Number.isNaN(b)</code> handles the NaN case.",
        "<code>a == null && b == null</code> is the one place <code>==</code> earns its keep.",
        "Otherwise <code>return a === b;</code>",
      ],
    },
  ],
};
