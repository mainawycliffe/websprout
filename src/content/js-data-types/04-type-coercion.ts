import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-data-types-type-coercion",
  slug: "type-coercion",
  title: "Type Coercion & typeof",
  description:
    "Understand why JavaScript silently converts types, how to check types with typeof, and how to convert values explicitly.",
  order: 4,
  steps: [
    {
      id: "why-coercion-happens",
      type: "explanation",
      instruction: {
        heading: "Why \"5\" + 3 equals \"53\"",
        body: "When you use an operator on two values of different types, JavaScript doesn't just give up — it tries to help by converting one value to match the other. This automatic conversion is called type coercion.\n\nThe most infamous example: `\"5\" + 3` gives you `\"53\"`, not `8`. Why? The `+` operator works for both addition (numbers) and concatenation (strings). When one side is a string, JavaScript assumes you meant concatenation and converts the number to a string. So `\"5\" + 3` becomes `\"5\" + \"3\"`, which is `\"53\"`.\n\nBut with other operators like `-`, `*`, and `/`, strings get converted to numbers: `\"5\" - 3` gives `2`, because subtraction only makes sense with numbers. This inconsistency is one of the most common sources of bugs in JavaScript.",
        analogy:
          "Type coercion is like JavaScript being an overly helpful translator — it guesses what you meant, but sometimes it guesses wrong. Imagine telling a friend '5 plus 3' in a noisy room, and they hear 'five and three' and write '53' on paper. They tried to help, but misunderstood the operation.",
        docLinks: [
          {
            label: "Type coercion",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Type coercion follows a precise set of rules defined in the ECMAScript specification. The `+` operator checks: if either operand is a string, convert the other to a string and concatenate. For `-`, `*`, `/`, and `%`, both operands are converted to numbers. These rules are consistent, even if the results seem surprising.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "// The + operator: string wins!\nconsole.log(\"5\" + 3);     // \"53\" (string)\nconsole.log(\"5\" + \"3\");   // \"53\" (string)\nconsole.log(5 + 3);       // 8 (number)\n\n// Other operators: number wins!\nconsole.log(\"5\" - 3);     // 2 (number)\nconsole.log(\"5\" * 3);     // 15 (number)\nconsole.log(\"10\" / 2);    // 5 (number)",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "typeof-operator",
      type: "explanation",
      instruction: {
        heading: "Checking types with typeof",
        body: "When you're not sure what type a value is — especially when data comes from user input or an external source — the `typeof` operator tells you. It returns a string describing the type:\n\n- `typeof 42` → `\"number\"`\n- `typeof \"hello\"` → `\"string\"`\n- `typeof true` → `\"boolean\"`\n- `typeof undefined` → `\"undefined\"`\n- `typeof null` → `\"object\"` (the famous bug)\n- `typeof NaN` → `\"number\"` (yes, Not-a-Number is a number)\n\nUsing `typeof` before doing math helps you avoid coercion bugs. If a user types \"25\" into a form, JavaScript receives it as a string — checking with typeof tells you to convert it before doing arithmetic.",
        docLinks: [
          {
            label: "typeof",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof",
            type: "js-operator",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Form inputs in HTML always give you strings, even when the user types a number. If someone types \"25\" into an age field, your JavaScript receives the string \"25\", not the number 25. Always convert before doing math!",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "console.log(typeof 42);         // \"number\"\nconsole.log(typeof \"hello\");     // \"string\"\nconsole.log(typeof true);        // \"boolean\"\nconsole.log(typeof undefined);   // \"undefined\"\nconsole.log(typeof null);        // \"object\" (bug!)\nconsole.log(typeof NaN);         // \"number\" (ironic)",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "explicit-conversion",
      type: "explanation",
      instruction: {
        heading: "Converting types on purpose",
        body: "Instead of relying on JavaScript's guessing (implicit coercion), you can convert types explicitly using built-in functions:\n\n- `Number(\"42\")` → `42` — converts a string to a number\n- `Number(\"hello\")` → `NaN` — can't convert non-numeric text\n- `Number(true)` → `1`, `Number(false)` → `0`\n- `String(42)` → `\"42\"` — converts a number to a string\n- `String(true)` → `\"true\"`\n- `Boolean(0)` → `false`, `Boolean(1)` → `true`\n- `Boolean(\"\")` → `false`, `Boolean(\"hi\")` → `true`\n\nExplicit conversion makes your code predictable. When you write `Number(userInput)`, anyone reading your code knows exactly what's happening — no guessing involved.",
        docLinks: [
          {
            label: "Number()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/Number",
            type: "js-method",
          },
          {
            label: "String()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/String",
            type: "js-method",
          },
          {
            label: "Boolean()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean/Boolean",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "You might also see `parseInt(\"42\")` and `parseFloat(\"3.14\")` for converting strings to numbers. These are more forgiving: `parseInt(\"42px\")` gives `42` (ignoring the \"px\"), while `Number(\"42px\")` gives `NaN`. Use `Number()` when you want strict conversion, and `parseInt()`/`parseFloat()` when you need to extract numbers from mixed text.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "// String to Number\nlet userAge = \"25\";\nlet age = Number(userAge);\nconsole.log(age + 5);        // 30 (correct!)\nconsole.log(userAge + 5);    // \"255\" (wrong!)\n\n// Number to String\nlet price = 9.99;\nlet label = \"Price: $\" + String(price);\nconsole.log(label);          // \"Price: $9.99\"\n\n// To Boolean\nconsole.log(Boolean(0));     // false\nconsole.log(Boolean(\"hi\"));  // true",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "gap-fill-coercion",
      type: "gap-fill",
      instruction: {
        heading: "Practice: predict and fix coercion",
        body: "A user typed their age into a form. The value arrives as a string. Convert it to a number before doing math, so you get the correct result instead of string concatenation.",
      },
      config: {
        type: "gap-fill",
        template:
          "let userInput = \"30\";\n\n// Convert the string to a number\nlet age = {{converter}}(userInput);\n\n// Now math works correctly\nlet ageNextYear = age + 1;\nconsole.log(ageNextYear);     // 31\nconsole.log(typeof ageNextYear); // \"{{type}}\"",
        gaps: [
          {
            id: "converter",
            placeholder: "function",
            acceptedAnswers: ["Number"],
            caseSensitive: true,
          },
          {
            id: "type",
            placeholder: "type",
            acceptedAnswers: ["number"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["converter", "type"],
        },
      },
      hints: [
        "Which built-in function converts a string to a number?",
        "After converting and adding 1, what type is the result?",
      ],
    },
    {
      id: "js-console-coercion-experiments",
      type: "js-console",
      instruction: {
        heading: "Your turn: coercion detective",
        body: "Predict the output of each expression, then run the code to check your answers. Type coercion can be tricky!\n\n1. Log `\"10\" - 5` (string minus number)\n2. Log `\"10\" + 5` (string plus number)\n3. Log `typeof (\"10\" - 5)` (what type is the result?)\n4. Log `typeof (\"10\" + 5)` (what type is this result?)\n5. Convert the string \"100\" to a number and log `Number(\"100\") + 50`",
      },
      config: {
        type: "js-console",
        starterCode:
          "// Predict each result BEFORE running!\n\n// 1. String minus number\nconsole.log(\"10\" - 5);\n\n// 2. String plus number\n\n// 3. Type of result from subtraction\n\n// 4. Type of result from addition\n\n// 5. Explicit conversion then addition\n",
        expectedOutput: ["5", "105", "number", "string", "150"],
      },
      validation: {
        type: "contains-js",
        criteria: {
          keywords: ["typeof", "Number", "console.log"],
        },
      },
      hints: [
        "The - operator converts strings to numbers, so \"10\" - 5 = 5.",
        "The + operator, when a string is involved, concatenates: \"10\" + 5 = \"105\".",
        "Use typeof to check: typeof (\"10\" - 5) and typeof (\"10\" + 5).",
        "Number(\"100\") converts to the number 100, so adding 50 gives 150.",
      ],
    },
  ],
};
