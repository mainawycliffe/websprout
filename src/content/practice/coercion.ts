import type { PracticeQuestionSeed } from "@/types/practice";

export const coercionQuestions: PracticeQuestionSeed[] = [
  {
    id: "coercion-triple-equals",
    slug: "why-use-triple-equals",
    title: "Why does == say these are equal?",
    topics: ["coercion", "equality", "operators"],
    relatedModule: "js-intro",
    step: {
      id: "coercion-triple-equals",
      type: "quiz",
      difficulty: "easy",
      instruction: {
        heading: "Why does == say these are equal?",
        body: "<p>A form field gives you the string <code>\"0\"</code> and you compare it with the number <code>0</code>.</p><p>Both comparisons below run without error but disagree. Work out which is which, and why.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet: 'console.log("0" == 0);\nconsole.log("0" === 0);',
        codeLanguage: "javascript",
        options: [
          {
            id: "coerce-then-strict",
            text: "<code>true</code>, then <code>false</code> — <code>==</code> converts the types first, <code>===</code> does not",
            correct: true,
            explanation:
              "Correct. <code>==</code> performs type coercion: seeing a string and a number, it converts the string to a number, so <code>0 == 0</code> is true. <code>===</code> compares type first and returns <code>false</code> immediately because a string is not a number. Default to <code>===</code> — it is the one whose result you can predict without consulting a table.",
          },
          {
            id: "both-true",
            text: "<code>true</code>, then <code>true</code>",
            correct: false,
            explanation:
              "If both were true there would be no reason for two operators to exist. <code>===</code> checks the type as well as the value, and <code>\"0\"</code> is a string.",
          },
          {
            id: "both-false",
            text: "<code>false</code>, then <code>false</code>",
            correct: false,
            explanation:
              "This is what you would want if JavaScript were strict by default — but <code>==</code> deliberately coerces, which is the whole reason it is considered a footgun.",
          },
          {
            id: "false-true",
            text: "<code>false</code>, then <code>true</code>",
            correct: false,
            explanation:
              "This has the two operators backwards. <code>===</code> is the <em>stricter</em> one — the extra character means fewer things are considered equal, not more.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "One operator compares types; the other converts them first.",
        "Which one has more characters — and does more characters mean stricter or looser?",
      ],
    },
  },

  {
    id: "coercion-plus-operator",
    slug: "why-does-plus-give-a-string",
    title: "Debug: why is the total 105 and not 15?",
    topics: ["coercion", "operators", "debugging"],
    relatedModule: "js-data-types",
    step: {
      id: "coercion-plus-operator",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Debug: why is the total 105 and not 15?",
        body: "<p>A quantity comes back from an input field as a string. The subtraction works fine; the addition does not.</p><p>The inconsistency is the clue. Ask what makes <code>+</code> different from every other arithmetic operator.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          'const fromInput = "10";\n\nconsole.log(fromInput - 5); // 5\nconsole.log(fromInput + 5); // "105"',
        codeLanguage: "javascript",
        options: [
          {
            id: "plus-is-overloaded",
            text: "<code>+</code> is also the string concatenation operator, so a string operand makes it join rather than add",
            correct: true,
            explanation:
              "Correct. <code>+</code> is overloaded: if either operand is a string it concatenates, otherwise it adds. Every other arithmetic operator has only the numeric meaning, so <code>-</code> converts the string to a number first — which is why subtraction silently worked. Fix it by converting explicitly: <code>Number(fromInput) + 5</code>.",
          },
          {
            id: "precedence",
            text: "Operator precedence makes <code>+</code> evaluate later than <code>-</code>",
            correct: false,
            explanation:
              "<code>+</code> and <code>-</code> have identical precedence, and precedence only decides grouping in longer expressions — it never changes what an operator <em>does</em> to its operands.",
          },
          {
            id: "input-bug",
            text: "The value from an input is a special type that only supports subtraction",
            correct: false,
            explanation:
              "It is an ordinary string — <code>input.value</code> is always a string, with nothing special about it. Both operators accept it; they just treat it differently.",
          },
          {
            id: "needs-parse",
            text: "You must always use <code>parseInt</code> before any arithmetic, or JavaScript throws",
            correct: false,
            explanation:
              "Converting first is good practice, but nothing throws here — that is the problem. JavaScript quietly produced a plausible-looking wrong answer instead of complaining.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "One of the two lines gave the answer you wanted. Why did that one work?",
        "What else does <code>+</code> do, that <code>-</code> cannot?",
      ],
    },
  },

  {
    id: "coercion-falsy-values",
    slug: "which-values-are-falsy",
    title: "Which of these are falsy?",
    topics: ["coercion", "truthiness", "conditionals"],
    relatedModule: "js-flow-control",
    step: {
      id: "coercion-falsy-values",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Which of these are falsy?",
        body: "<p>Writing <code>if (value)</code> asks whether the value is <em>truthy</em>. Getting the falsy list wrong is behind a whole family of bugs — a valid <code>0</code> treated as missing, an empty string treated as absent.</p><p><strong>Select every value below that is falsy.</strong> There are more of them than most people expect.</p>",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The falsy list is short and fixed: <code>false</code>, <code>0</code>, <code>-0</code>, <code>0n</code>, <code>\"\"</code>, <code>null</code>, <code>undefined</code> and <code>NaN</code>. Everything else in the language is truthy — including every object and every array, no matter how empty.",
          },
        ],
      },
      config: {
        type: "quiz",
        mode: "multiple",
        options: [
          {
            id: "empty-string",
            text: 'The empty string <code>""</code>',
            correct: true,
            explanation:
              "Falsy. This is the one that breaks form validation: a user who submits an empty text field fails an <code>if (name)</code> check, which is usually what you want — but so does a legitimately empty optional field.",
          },
          {
            id: "zero",
            text: "The number <code>0</code>",
            correct: true,
            explanation:
              "Falsy, and the most dangerous one on the list. A cart with <code>0</code> items, a score of <code>0</code>, a price of <code>0</code> — all skip an <code>if (value)</code> block. When <code>0</code> is a legitimate value, test explicitly with <code>value !== undefined</code>.",
          },
          {
            id: "empty-array",
            text: "An empty array <code>[]</code>",
            correct: false,
            explanation:
              "Truthy — every object is, and arrays are objects. This surprises people constantly: <code>if ([])</code> runs the block. To test for emptiness you must ask about <code>length</code>.",
          },
          {
            id: "nan",
            text: "<code>NaN</code>",
            correct: true,
            explanation:
              "Falsy. It is what you get from arithmetic that makes no sense, like <code>Number(\"abc\")</code>. Note it is also the only value not equal to itself, so test it with <code>Number.isNaN()</code> rather than <code>===</code>.",
          },
          {
            id: "string-false",
            text: 'The string <code>"false"</code>',
            correct: false,
            explanation:
              "Truthy — it is a non-empty string, and its contents are irrelevant. This catches people reading booleans out of <code>localStorage</code>, which stores everything as text: <code>if (localStorage.getItem(\"darkMode\"))</code> is true even when the stored value is <code>\"false\"</code>.",
          },
          {
            id: "empty-object",
            text: "An empty object <code>{}</code>",
            correct: false,
            explanation:
              "Truthy. Objects are always truthy regardless of content, so <code>if (config)</code> tells you the object exists, never whether it has anything useful in it.",
          },
        ],
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "There are exactly eight falsy values in the whole language. Everything else is truthy.",
        "Are any objects falsy? What does that tell you about <code>[]</code> and <code>{}</code>?",
      ],
    },
  },

  {
    id: "coercion-nullish-vs-or",
    slug: "nullish-coalescing-vs-or",
    title: "Why did the zero disappear?",
    topics: ["coercion", "operators", "debugging"],
    relatedModule: "modern-js",
    step: {
      id: "coercion-nullish-vs-or",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "Why did the zero disappear?",
        body: "<p>A settings object supplies a default when a value is absent. A user deliberately sets the volume to <code>0</code> — and gets <code>50</code> instead.</p><p>Both lines below are common idioms. Work out precisely which values each one treats as \"absent\", and pick the fix.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          "const volume = 0;\n\nconsole.log(volume || 50); // 50\nconsole.log(volume ?? 50); // 0",
        codeLanguage: "javascript",
        options: [
          {
            id: "falsy-vs-nullish",
            text: "<code>||</code> falls back for any <strong>falsy</strong> value, while <code>??</code> falls back only for <code>null</code> and <code>undefined</code>",
            correct: true,
            explanation:
              "Correct, and this is exactly why <code>??</code> was added to the language. <code>0</code> is falsy, so <code>||</code> discards a perfectly valid setting. <code>??</code> asks the narrower and usually correct question — \"was this actually provided?\" — so it keeps the <code>0</code>. Reach for <code>??</code> whenever <code>0</code>, <code>\"\"</code> or <code>false</code> are legitimate values.",
          },
          {
            id: "precedence",
            text: "<code>??</code> binds more tightly than <code>||</code>, so it evaluates the left side first",
            correct: false,
            explanation:
              "Both evaluate left-to-right and both short-circuit; precedence is not what differs. (JavaScript does refuse to let you mix <code>??</code> and <code>||</code> without parentheses — but that is a separate syntax rule.)",
          },
          {
            id: "type-check",
            text: "<code>??</code> checks the type, so it keeps the number and rejects the string default",
            correct: false,
            explanation:
              "Neither operator looks at types. Swap the <code>50</code> for <code>\"fifty\"</code> and the behaviour is unchanged — what matters is only the value on the left.",
          },
          {
            id: "zero-special",
            text: "<code>0</code> is a special case that only <code>??</code> knows about",
            correct: false,
            explanation:
              "Close, but it is not about <code>0</code> specifically. <code>||</code> discards <em>every</em> falsy value, so <code>\"\"</code> and <code>false</code> are lost in the same way — <code>0</code> is just the case people hit first.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Both operators fall back. The difference is what each one counts as \"nothing\".",
        "Would <code>\"\" || \"default\"</code> and <code>\"\" ?? \"default\"</code> also disagree?",
      ],
    },
  },

  {
    id: "coercion-safe-number",
    slug: "parse-a-number-safely",
    title: "Parse a number safely",
    topics: ["coercion", "numbers", "validation"],
    relatedModule: "js-data-types",
    step: {
      id: "coercion-safe-number",
      type: "code-challenge",
      difficulty: "advanced",
      instruction: {
        heading: "Parse a number safely",
        body: "<p>Write <code>toNumber(input, fallback)</code>. It should return <code>input</code> as a number when that is genuinely meaningful, and <code>fallback</code> when it is not.</p><p>The work here is deciding what \"genuinely meaningful\" means, because JavaScript's built-in conversions are each wrong in a different direction:</p><ul><li><code>Number(\"\")</code> is <code>0</code> — an empty field becomes a real zero.</li><li><code>parseInt(\"12abc\")</code> is <code>12</code> — it stops at the junk instead of rejecting it.</li><li><code>Number(\"abc\")</code> is <code>NaN</code> — which you must then detect.</li></ul><p>Read the tests to see which behaviour is wanted for each, then build the check that produces it. Watch the whitespace and boolean cases especially.</p>",
        analogy:
          "A bouncer checking IDs. Not \"does this vaguely resemble an ID\" but \"is this a real one, all the way through\" — half-valid gets turned away.",
        docLinks: [
          {
            label: "MDN: Number()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/Number",
            type: "js-method",
          },
          {
            label: "MDN: Number.isFinite()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — Number() is more literal than you think",
            body: "<code>Number(\"\")</code> and <code>Number(\"   \")</code> are both <code>0</code>, <code>Number(true)</code> is <code>1</code>, and <code>Number(null)</code> is <code>0</code>. Guard the input <em>before</em> converting rather than trying to untangle the result afterwards.",
          },
        ],
      },
      config: {
        type: "code-challenge",
        functionName: "toNumber",
        language: "javascript",
        starterCode:
          "function toNumber(input, fallback) {\n  // Accept: numbers, and strings that are entirely a number.\n  // Reject: empty/blank strings, partial numbers, booleans, null,\n  //         undefined, NaN and Infinity.\n}\n",
        tests: [
          { name: "converts a numeric string", args: ["42", -1], expected: 42 },
          { name: "converts a decimal string", args: ["3.5", -1], expected: 3.5 },
          { name: "passes a real number straight through", args: [7, -1], expected: 7 },
          { name: "keeps a legitimate zero", args: ["0", -1], expected: 0 },
          { name: "rejects an empty string", args: ["", -1], expected: -1 },
          { name: "rejects a blank string", args: ["   ", -1], expected: -1 },
          { name: "rejects a partial number", args: ["12abc", -1], expected: -1 },
          { name: "rejects a non-numeric string", args: ["abc", -1], expected: -1 },
          { name: "rejects booleans", args: [true, -1], expected: -1 },
          { name: "rejects null", args: [null, -1], expected: -1 },
          { name: "rejects undefined", args: [undefined, -1], expected: -1 },
          { name: "rejects NaN", args: [NaN, -1], expected: -1 },
          { name: "rejects Infinity", args: [Infinity, -1], expected: -1 },
          { name: "allows negative numbers", args: ["-8", -1], expected: -8 },
        ],
        solution:
          'function toNumber(input, fallback) {\n  if (typeof input === "number") {\n    return Number.isFinite(input) ? input : fallback;\n  }\n  if (typeof input !== "string") return fallback;\n  if (input.trim() === "") return fallback;\n  const parsed = Number(input);\n  return Number.isFinite(parsed) ? parsed : fallback;\n}\n',
      },
      validation: { type: "tests-pass", criteria: {} },
      hints: [
        "Handle the types in order: a real number first, then anything that is not a string is rejected outright.",
        "Reject blank strings before converting: <code>if (input.trim() === \"\") return fallback;</code> — otherwise <code>Number(\"\")</code> gives you <code>0</code>.",
        "<code>Number.isFinite</code> rejects <code>NaN</code> and <code>Infinity</code> in one check, and <code>Number(\"12abc\")</code> is already <code>NaN</code> so partial numbers fall out for free.",
      ],
    },
  },

  {
    id: "coercion-nan-compare",
    slug: "why-does-nan-not-equal-itself",
    title: "Why does NaN not equal itself?",
    topics: ["coercion", "numbers", "equality"],
    relatedModule: "js-data-types",
    step: {
      id: "coercion-nan-compare",
      type: "quiz",
      difficulty: "intermediate",
      instruction: {
        heading: "Why does NaN not equal itself?",
        body: "<p>A validation check tries to detect a failed conversion by comparing the result with <code>NaN</code>. It never fires.</p><p>Pick the option that both explains the behaviour and gives the working check.</p>",
      },
      config: {
        type: "quiz",
        mode: "single",
        codeSnippet:
          'const value = Number("abc"); // NaN\n\nconsole.log(value === NaN);\nconsole.log(Number.isNaN(value));',
        codeLanguage: "javascript",
        options: [
          {
            id: "not-reflexive",
            text: "<code>false</code>, then <code>true</code> — <code>NaN</code> is defined as not equal to anything, including itself, so you must use <code>Number.isNaN</code>",
            correct: true,
            explanation:
              "Correct. The IEEE 754 floating-point standard specifies that <code>NaN</code> compares unequal to every value, itself included — so <code>===</code> can never detect it. <code>Number.isNaN</code> exists for exactly this. (Prefer it over the older global <code>isNaN</code>, which coerces first and so claims <code>isNaN(\"abc\")</code> is true even though the string is not <code>NaN</code>.)",
          },
          {
            id: "both-true",
            text: "<code>true</code>, then <code>true</code>",
            correct: false,
            explanation:
              "If <code>===</code> worked there would be no need for <code>Number.isNaN</code> to exist. Self-inequality is the single most surprising rule about <code>NaN</code>.",
          },
          {
            id: "type-mismatch",
            text: "<code>false</code>, because <code>NaN</code> is a string and <code>value</code> is a number",
            correct: false,
            explanation:
              "<code>NaN</code> is a number — <code>typeof NaN</code> is <code>\"number\"</code>, which is itself a famous oddity. The comparison fails for a different reason entirely.",
          },
          {
            id: "needs-double-equals",
            text: "<code>false</code>, then <code>true</code> — and <code>value == NaN</code> would have worked",
            correct: false,
            explanation:
              "The first two values are right but the fix is not: <code>==</code> fails identically. No equality operator can match <code>NaN</code>, which is why a dedicated function is the only route.",
          },
        ],
        shuffle: true,
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Try it mentally: is <code>NaN === NaN</code> true?",
        "If no comparison operator can detect it, what is left?",
      ],
    },
  },
];
