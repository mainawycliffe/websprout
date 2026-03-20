import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-functions-capstone-utility-belt",
  slug: "capstone-utility-belt",
  title: "Capstone: Utility Library",
  description:
    "Build a set of reusable utility functions that combine everything you've learned about functions.",
  order: 9,
  steps: [
    {
      id: "capstone-intro",
      type: "explanation",
      instruction: {
        heading: "Build your own utility library!",
        body: "Professional developers don't write the same helper code over and over — they build utility libraries: collections of small, reusable functions that solve common problems. Libraries like Lodash and date-fns are just big collections of utility functions. In this capstone, you'll build your own mini utility library with five functions that format text, do math, and work with arrays. Each function uses concepts from the lessons you've completed: declarations, parameters, return values, arrow functions, and callbacks.",
        analogy:
          "Think of a utility library like a toolbox. Each function is a tool — a hammer, a screwdriver, a wrench. You build the toolbox once, and whenever you start a new project, you bring the whole toolbox along. No need to build a new hammer every time.",
        docLinks: [
          {
            label: "Functions guide",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
            type: "js-concept",
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
      id: "format-currency",
      type: "gap-fill",
      instruction: {
        heading: "Utility 1: formatCurrency(amount)",
        body: "Let's start with a function that formats a number as a dollar amount. Given `7`, it returns `\"$7.00\"`. Given `19.5`, it returns `\"$19.50\"`. This kind of function is used on every e-commerce site — Amazon, Etsy, any store that displays prices. We'll use the built-in `.toFixed(2)` method to ensure two decimal places.",
        docLinks: [
          {
            label: "Number.prototype.toFixed()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "`.toFixed(2)` returns a string, not a number. So `(7).toFixed(2)` gives you the string `\"7.00\"`, which is perfect for display but not for further math. If you need to do math with it later, convert it back with `parseFloat()`.",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template:
          'function formatCurrency({{param}}) {\n  return "{{symbol}}" + amount.toFixed({{decimals}});\n}\n\nconsole.log(formatCurrency(7));    // "$7.00"\nconsole.log(formatCurrency(19.5)); // "$19.50"',
        gaps: [
          {
            id: "param",
            placeholder: "parameter",
            acceptedAnswers: ["amount"],
            caseSensitive: true,
          },
          {
            id: "symbol",
            placeholder: "currency symbol",
            acceptedAnswers: ["$"],
            caseSensitive: true,
          },
          {
            id: "decimals",
            placeholder: "decimal places",
            acceptedAnswers: ["2"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["param", "symbol", "decimals"],
        },
      },
      hints: [
        "The function receives a number — what should the parameter be called?",
        "US currency uses the $ symbol.",
        "Currency always shows 2 decimal places.",
      ],
    },
    {
      id: "capitalize-and-clamp",
      type: "gap-fill",
      instruction: {
        heading: "Utilities 2 & 3: capitalizeWords and clamp",
        body: "`capitalizeWords(str)` takes a string like `\"hello world\"` and returns `\"Hello World\"` — capitalizing the first letter of every word. `clamp(value, min, max)` ensures a number stays within a range: if it's too low, return min; if it's too high, return max; otherwise return it unchanged. Clamping is used everywhere in games (health bars, scores) and UI (slider values, scroll positions).",
        docLinks: [
          {
            label: "String.prototype.split()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
            type: "js-method",
          },
          {
            label: "Math.min()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min",
            type: "js-method",
          },
          {
            label: "Math.max()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template:
          '// clamp: keeps a value between min and max\nfunction clamp(value, min, max) {\n  return Math.{{max_fn}}(min, Math.{{min_fn}}(max, value));\n}\n\nconsole.log(clamp(5, 1, 10));   // 5 (within range)\nconsole.log(clamp(-3, 1, 10));  // 1 (clamped to min)\nconsole.log(clamp(99, 1, 10));  // 10 (clamped to max)',
        gaps: [
          {
            id: "max_fn",
            placeholder: "Math method",
            acceptedAnswers: ["max"],
            caseSensitive: true,
          },
          {
            id: "min_fn",
            placeholder: "Math method",
            acceptedAnswers: ["min"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["max_fn", "min_fn"],
        },
      },
      hints: [
        "To ensure the value isn't below the minimum, we take the max of the value and min.",
        "To ensure the value isn't above the maximum, we take the min of the value and max.",
        "The pattern is: Math.max(min, Math.min(max, value))",
      ],
    },
    {
      id: "calculate-age",
      type: "gap-fill",
      instruction: {
        heading: "Utility 4: calculateAge(birthYear)",
        body: "This function takes a birth year and returns the person's current age. It uses the `Date` object to get the current year dynamically — so it stays accurate as time passes. Default parameters shine here: we could let the user optionally specify a different year to calculate age for.",
        docLinks: [
          {
            label: "Date.prototype.getFullYear()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template:
          "function calculateAge(birthYear) {\n  const currentYear = new Date().{{get_year}}();\n  {{return_keyword}} currentYear - birthYear;\n}\n\nconsole.log(calculateAge(2000)); // depends on current year\nconsole.log(calculateAge(1995)); // depends on current year",
        gaps: [
          {
            id: "get_year",
            placeholder: "Date method",
            acceptedAnswers: ["getFullYear"],
            caseSensitive: true,
          },
          {
            id: "return_keyword",
            placeholder: "keyword",
            acceptedAnswers: ["return"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["get_year", "return_keyword"],
        },
      },
      hints: [
        "The Date method that returns the four-digit year is `getFullYear()`.",
        "Don't forget to send the result back with `return`.",
      ],
    },
    {
      id: "higher-order-function",
      type: "js-console",
      instruction: {
        heading: "Utility 5: applyToAll (higher-order function)",
        body: "Now for the grand finale: a higher-order function. `applyToAll(array, formatter)` takes an array and a callback function, applies the formatter to every element, and returns a new array. This is essentially your own version of `.map()`! Then use it with your `formatCurrency` function to format an array of prices. This combines function declarations, arrow functions, parameters, return values, and callbacks — everything from this module.",
        docLinks: [
          {
            label: "Higher-order functions",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "A higher-order function is a function that takes a function as an argument or returns a function. Built-in methods like `.map()`, `.filter()`, and `.reduce()` are all higher-order functions. Writing your own is a sign you truly understand how functions work in JavaScript.",
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode:
          "// Build the complete utility library!\n\n// 1. formatCurrency: returns a dollar string\nfunction formatCurrency(amount) {\n  return \"$\" + amount.toFixed(2);\n}\n\n// 2. capitalizeWords: capitalize first letter of each word\n// Hint: split into words, capitalize each, join back\n\n\n// 3. clamp: keep a value within a min/max range\n\n\n// 4. calculateAge: subtract birth year from current year\n\n\n// 5. applyToAll: takes an array and a formatter callback,\n//    returns a new array with the formatter applied to each item\n//    (This is your own version of .map()!)\n\n\n// Test everything:\nconst prices = [5, 12.5, 99, 3.75];\n// console.log(applyToAll(prices, formatCurrency));\n// Should output: [\"$5.00\", \"$12.50\", \"$99.00\", \"$3.75\"]\n\n// console.log(capitalizeWords(\"hello world\"));\n// console.log(clamp(150, 0, 100));\n// console.log(calculateAge(2005));\n",
      },
      validation: {
        type: "contains-js",
        criteria: {
          keywords: ["function", "return", "console.log"],
        },
      },
      hints: [
        "For capitalizeWords: split the string with .split(\" \"), map each word to capitalize its first character, then join with .join(\" \")",
        "For clamp: return Math.max(min, Math.min(max, value))",
        "For calculateAge: return new Date().getFullYear() - birthYear",
        "For applyToAll: loop through the array, call formatter(item) on each, collect results",
        "applyToAll can use: return array.map(item => formatter(item));",
      ],
    },
  ],
};
