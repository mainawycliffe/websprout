import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-data-types-numbers",
  slug: "numbers",
  title: "Numbers and Math",
  description:
    "Master JavaScript's number type — arithmetic operators, rounding, and what happens when math goes wrong.",
  order: 2,
  steps: [
    {
      id: "one-number-type",
      type: "explanation",
      instruction: {
        heading: "JavaScript has one number type",
        body: "Many programming languages distinguish between integers (whole numbers like 42) and floating-point numbers (decimals like 3.14). JavaScript keeps it simple: there's just one `number` type that handles both. Whether you write `10` or `10.5`, JavaScript treats them as the same kind of data.\n\nThis simplicity is great for beginners — you don't have to think about which number type to use. But it does come with one quirk: floating-point math can produce tiny rounding errors. For example, `0.1 + 0.2` doesn't equal `0.3` exactly — it equals `0.30000000000000004`. This isn't a JavaScript bug; it's how all computers store decimals in binary. For most purposes, it doesn't matter, but it's worth knowing about.",
        analogy:
          "JavaScript's calculator is always in your pocket — it handles basic arithmetic, rounding, and even tells you when something doesn't compute. Unlike a cash register that separates dollars from cents, JavaScript's calculator treats everything as one continuous number line.",
        docLinks: [
          {
            label: "Number",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "JavaScript numbers follow the IEEE 754 double-precision floating-point standard. This gives you safe integer precision up to 2^53 - 1 (about 9 quadrillion). For everyday web development — calculating prices, scores, dimensions — this is more than enough.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "let whole = 42;\nlet decimal = 3.14;\nlet negative = -7;\n\nconsole.log(whole);     // 42\nconsole.log(decimal);   // 3.14\nconsole.log(negative);  // -7\n\n// The floating-point quirk\nconsole.log(0.1 + 0.2); // 0.30000000000000004",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "arithmetic-operators",
      type: "explanation",
      instruction: {
        heading: "Arithmetic operators: the basics",
        body: "JavaScript supports the math operations you already know, plus one you might not:\n\n- `+` Addition: `10 + 3` gives `13`\n- `-` Subtraction: `10 - 3` gives `7`\n- `*` Multiplication: `10 * 3` gives `30`\n- `/` Division: `10 / 3` gives `3.3333...`\n- `%` Remainder (modulo): `10 % 3` gives `1` (10 divided by 3 leaves a remainder of 1)\n- `**` Exponentiation: `2 ** 3` gives `8` (2 to the power of 3)\n\nThe remainder operator `%` is surprisingly useful: it tells you if a number is even (`n % 2 === 0`), helps wrap values around (like clock arithmetic), and cycles through repeating patterns.",
        docLinks: [
          {
            label: "Arithmetic operators",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators#arithmetic_operators",
            type: "js-operator",
          },
          {
            label: "Remainder (%)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder",
            type: "js-operator",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "JavaScript follows standard math order of operations (PEMDAS): parentheses first, then exponents, then multiplication/division/remainder, then addition/subtraction. Use parentheses to make your intent clear: `(2 + 3) * 4` is 20, but `2 + 3 * 4` is 14.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "console.log(10 + 3);   // 13\nconsole.log(10 - 3);   // 7\nconsole.log(10 * 3);   // 30\nconsole.log(10 / 3);   // 3.3333...\nconsole.log(10 % 3);   // 1 (remainder)\nconsole.log(2 ** 3);   // 8 (exponent)\n\n// Is a number even or odd?\nconsole.log(4 % 2);    // 0 — even!\nconsole.log(7 % 2);    // 1 — odd!",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "math-object",
      type: "explanation",
      instruction: {
        heading: "The Math object: rounding and more",
        body: "JavaScript includes a built-in `Math` object with useful methods for operations beyond basic arithmetic:\n\n- `Math.round(4.7)` → `5` — rounds to the nearest integer\n- `Math.floor(4.9)` → `4` — always rounds down\n- `Math.ceil(4.1)` → `5` — always rounds up\n- `Math.max(3, 7, 2)` → `7` — returns the largest value\n- `Math.min(3, 7, 2)` → `2` — returns the smallest value\n- `Math.random()` → a random decimal between 0 (inclusive) and 1 (exclusive)\n\nYou'll use `Math.round()` for displaying clean prices, `Math.floor()` for generating random whole numbers, and `Math.max()`/`Math.min()` for finding extremes in data.",
        docLinks: [
          {
            label: "Math",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math",
            type: "js-concept",
          },
          {
            label: "Math.round()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round",
            type: "js-method",
          },
          {
            label: "Math.floor()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "console.log(Math.round(4.7));  // 5\nconsole.log(Math.floor(4.9));  // 4\nconsole.log(Math.ceil(4.1));   // 5\nconsole.log(Math.max(3, 7, 2)); // 7\nconsole.log(Math.min(3, 7, 2)); // 2\n\n// Random number between 1 and 10\nlet random = Math.floor(Math.random() * 10) + 1;\nconsole.log(random);",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "gap-fill-arithmetic",
      type: "gap-fill",
      instruction: {
        heading: "Practice: arithmetic and rounding",
        body: "A pizza costs $12.99 and you're splitting it between 4 friends. Calculate each person's share, then round it to a clean number using `Math.ceil()` (round up so you collect enough money).",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "`Math.ceil()` rounds up because in real life, you can't pay $3.2475 — you'd round up to $4 to make sure you have enough. Use `Math.floor()` to round down and `Math.round()` for standard rounding.",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template:
          "const pizzaPrice = 12.99;\nconst friends = 4;\n\nconst share = pizzaPrice {{operator}} friends;\nconsole.log(share);\n\nconst roundedShare = Math.{{method}}(share);\nconsole.log(roundedShare);",
        gaps: [
          {
            id: "operator",
            placeholder: "operator",
            acceptedAnswers: ["/"],
            caseSensitive: true,
          },
          {
            id: "method",
            placeholder: "method",
            acceptedAnswers: ["ceil"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["operator", "method"],
        },
      },
      hints: [
        "To split a cost, you divide the total by the number of people.",
        "We want to round UP so we collect enough money — which Math method always rounds up?",
      ],
    },
    {
      id: "js-console-nan",
      type: "js-console",
      instruction: {
        heading: "NaN: when math goes wrong",
        body: "`NaN` stands for \"Not a Number\" — JavaScript's way of telling you a math operation didn't produce a valid number. It appears when you try to do math with something that isn't a number, like multiplying a string by a number.\n\nYour task: experiment with NaN. Write code to:\n1. Log the result of `\"hello\" * 5`\n2. Log the result of `Math.sqrt(-1)` (square root of a negative number)\n3. Use `isNaN()` to check if the result of `\"abc\" / 2` is NaN, and log the result",
        docLinks: [
          {
            label: "NaN",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN",
            type: "js-concept",
          },
          {
            label: "isNaN()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "NaN is a special value of the number type — yes, \"Not a Number\" is technically a number! This sounds absurd, but it means NaN can appear wherever a number is expected without crashing your program. It's JavaScript's way of saying \"I tried, but this math doesn't work.\"",
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode:
          "// 1. What happens when you multiply a string by a number?\nconsole.log(\"hello\" * 5);\n\n// 2. Square root of a negative number?\n\n// 3. Check if \"abc\" / 2 is NaN\n",
        expectedOutput: ["NaN", "NaN", "true"],
      },
      validation: {
        type: "contains-js",
        criteria: {
          keywords: ["Math.sqrt", "isNaN", "console.log"],
        },
      },
      hints: [
        "For step 2, use Math.sqrt(-1) and log the result.",
        "For step 3, use isNaN(\"abc\" / 2) — it returns true or false.",
        "Wrap each result in console.log() to see the output.",
      ],
    },
  ],
};
