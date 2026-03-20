import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-functions-why-functions",
  slug: "why-functions",
  title: "Why Functions Exist",
  description:
    "Discover why programmers invented functions and how they save you from writing the same code over and over.",
  order: 1,
  steps: [
    {
      id: "repetition-problem",
      type: "explanation",
      instruction: {
        heading: "The copy-paste trap",
        body: "Imagine you're building a website and you need to calculate sales tax in five different places. Without functions, you'd copy and paste the same math five times. Now imagine the tax rate changes — you'd have to find and update every single copy. Miss one? Bug. This is the core problem functions solve: they let you write a piece of logic once and reuse it everywhere. Programmers call this the DRY principle — Don't Repeat Yourself.",
        analogy:
          "A function is like a recipe card. You write the steps once, give it a name like 'Chocolate Cake', and whenever you want cake, you follow the recipe instead of figuring it out from scratch every time. If you improve the recipe, you only update one card — not fifty sticky notes scattered around the kitchen.",
        docLinks: [
          {
            label: "Functions — reusable blocks of code",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Functions",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Functions are one of the fundamental building blocks in JavaScript and in virtually every programming language. The ECMAScript specification defines several kinds of functions — declarations, expressions, arrow functions, generators, and async functions. You'll learn the first three in this module.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "// WITHOUT functions — repeating the same logic 3 times:\nconst price1 = 29.99;\nconst tax1 = price1 * 0.08;\nconst total1 = price1 + tax1;\nconsole.log(total1); // 32.3892\n\nconst price2 = 49.99;\nconst tax2 = price2 * 0.08;\nconst total2 = price2 + tax2;\nconsole.log(total2); // 53.9892\n\nconst price3 = 9.99;\nconst tax3 = price3 * 0.08;\nconst total3 = price3 + tax3;\nconsole.log(total3); // 10.7892",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "functions-solve-repetition",
      type: "explanation",
      instruction: {
        heading: "Functions eliminate repetition",
        body: "With a function, you write the tax calculation once and call it whenever you need it. If the tax rate changes from 8% to 9%, you update one line — not dozens. This is reusability in action. Functions also make your code easier to read: instead of seeing raw math scattered everywhere, someone reading your code sees `calculateTotal(29.99)` and instantly understands what's happening.",
        docLinks: [
          {
            label: "Function declaration",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// WITH a function — write the logic ONCE:\nfunction calculateTotal(price) {\n  const tax = price * 0.08;\n  return price + tax;\n}\n\n// Call it whenever you need it:\nconsole.log(calculateTotal(29.99)); // 32.3892\nconsole.log(calculateTotal(49.99)); // 53.9892\nconsole.log(calculateTotal(9.99));  // 10.7892\n\n// Tax rate changes? Update ONE line.',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "abstraction-concept",
      type: "explanation",
      instruction: {
        heading: "Abstraction: hiding the messy details",
        body: "Functions give you abstraction — the ability to hide complex details behind a simple name. You don't need to know how a microwave works internally to heat your food; you just press the button. Similarly, once you write a function, anyone can use it without understanding every line inside. This is how large programs are built: teams write functions that other teams call without needing to read the source code. Every built-in method you've used — console.log(), Math.round(), Array.push() — is a function someone else wrote for you.",
        analogy:
          "Abstraction is like a TV remote control. You press 'Volume Up' and the volume increases. You don't need to know about the infrared signal, the amplifier circuit, or the speaker driver. The remote is the function name; the electronics are the implementation details hidden inside.",
        docLinks: [
          {
            label: "JavaScript building blocks",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "When you see parentheses after a name — like console.log() or Math.random() — that's a function being called. The parentheses are the 'do it now' signal. Without them, you're just referring to the function without running it.",
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
      id: "spot-the-repetition",
      type: "gap-fill",
      instruction: {
        heading: "Spot the repetition",
        body: "Look at the code below. The same greeting logic is repeated. Fill in the blanks to identify what concept eliminates this repetition and what we call the reusable block of code.",
      },
      config: {
        type: "gap-fill",
        template:
          '// This code repeats the same logic:\nconsole.log("Hello, Alice! Welcome!");\nconsole.log("Hello, Bob! Welcome!");\nconsole.log("Hello, Carol! Welcome!");\n\n// The principle that says "don\'t repeat code" is called:\n// {{dry_principle}}\n\n// We can fix this by creating a {{reusable_block}}.',
        gaps: [
          {
            id: "dry_principle",
            placeholder: "principle name",
            acceptedAnswers: ["DRY", "Don't Repeat Yourself"],
            caseSensitive: false,
          },
          {
            id: "reusable_block",
            placeholder: "what to create",
            acceptedAnswers: ["function"],
            caseSensitive: false,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["dry_principle", "reusable_block"],
        },
      },
      hints: [
        "The acronym stands for Don't Repeat Yourself.",
        "A reusable block of code that you can call by name is a ______.",
      ],
    },
  ],
};
