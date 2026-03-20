import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-functions-function-expressions",
  slug: "function-expressions",
  title: "Function Expressions",
  description:
    "Understand function expressions, anonymous functions, and the difference between declarations and expressions.",
  order: 5,
  steps: [
    {
      id: "what-are-expressions",
      type: "explanation",
      instruction: {
        heading: "Storing a function in a variable",
        body: "In JavaScript, functions are values — just like numbers and strings. You can store a function in a variable, pass it to another function, or return it from a function. A function expression creates a function and assigns it to a variable using `const`, `let`, or `var`. The function itself often has no name (it's anonymous) — the variable name is how you refer to it. Arrow functions are actually a type of function expression, since they're always assigned to a variable.",
        analogy:
          "A function expression is like saving a recipe to a specific shelf. Instead of just having a recipe card floating around with a name tag, you put it in a labeled container: `const makeBreakfast = function() { ... }`. The container (variable) holds the recipe (function). You find the recipe by looking at the shelf label.",
        docLinks: [
          {
            label: "Function expressions",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// Function DECLARATION — uses the function keyword and a name\nfunction greetDeclaration(name) {\n  return "Hello, " + name + "!";\n}\n\n// Function EXPRESSION — stored in a variable\nconst greetExpression = function(name) {\n  return "Hello, " + name + "!";\n};\n\n// Arrow function — also an expression\nconst greetArrow = (name) => "Hello, " + name + "!";\n\n// All three work the same way:\nconsole.log(greetDeclaration("Alice")); // "Hello, Alice!"\nconsole.log(greetExpression("Alice"));  // "Hello, Alice!"\nconsole.log(greetArrow("Alice"));       // "Hello, Alice!"',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "anonymous-vs-named",
      type: "explanation",
      instruction: {
        heading: "Anonymous vs. named function expressions",
        body: "A function expression can be anonymous (no name after `function`) or named (a name after `function`). Anonymous functions are by far more common in expressions since the variable name already identifies them. Named function expressions are occasionally useful because the name shows up in error stack traces, making debugging easier. In practice, most developers use anonymous expressions or arrow functions.",
        docLinks: [
          {
            label: "Function expression",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// Anonymous function expression (most common)\nconst add = function(a, b) {\n  return a + b;\n};\n\n// Named function expression (name is "addNumbers")\nconst addNamed = function addNumbers(a, b) {\n  return a + b;\n};\n\n// The name "addNumbers" is only accessible INSIDE the function.\n// Outside, you still use the variable name:\nconsole.log(addNamed(3, 7));    // 10\n// console.log(addNumbers(3, 7)); // ReferenceError!',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "hoisting-difference",
      type: "explanation",
      instruction: {
        heading: "The critical difference: hoisting",
        body: "Here's the most important practical difference between function declarations and function expressions. Function declarations are hoisted — JavaScript moves them to the top of their scope, so you can call them before the line where they're written. Function expressions are NOT hoisted — the variable exists (if declared with `var`) but its value is `undefined` until the assignment line is reached. With `const` or `let`, you'll get a ReferenceError if you try to use it before the declaration. This matters when organizing your code.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Function declarations are hoisted, function expressions are NOT. This means `sayHi()` works before the declaration, but `const sayHi = function() {...}` does not. If you get 'Cannot access before initialization' or 'is not a function' errors, check if you're calling a function expression before it's defined.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// DECLARATION — works! Hoisted to the top.\nsayHello(); // "Hello!"\nfunction sayHello() {\n  console.log("Hello!");\n}\n\n// EXPRESSION — ERROR! Not hoisted.\n// sayGoodbye(); // TypeError: sayGoodbye is not a function\nconst sayGoodbye = function() {\n  console.log("Goodbye!");\n};\nsayGoodbye(); // "Goodbye!" — works after the assignment',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "write-expression",
      type: "gap-fill",
      instruction: {
        heading: "Write a function expression",
        body: "Complete the code to create a function expression that doubles a number.",
      },
      config: {
        type: "gap-fill",
        template:
          "// Create a function expression\n{{variable_keyword}} double = {{function_keyword}}(number) {\n  return number * 2;\n};\n\nconsole.log(double(8)); // 16",
        gaps: [
          {
            id: "variable_keyword",
            placeholder: "variable keyword",
            acceptedAnswers: ["const"],
            caseSensitive: true,
          },
          {
            id: "function_keyword",
            placeholder: "keyword",
            acceptedAnswers: ["function"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["variable_keyword", "function_keyword"],
        },
      },
      hints: [
        "Store the function in a variable that won't be reassigned — use `const`.",
        "The function keyword comes after the `=` sign.",
      ],
    },
    {
      id: "practice-forms",
      type: "js-console",
      instruction: {
        heading: "Three ways to write the same function",
        body: "Write a function called `isPositive` that takes a number and returns `true` if it's greater than 0, and `false` otherwise. Write it three ways: (1) as a function declaration, (2) as a function expression, and (3) as an arrow function. Test all three to confirm they give the same results.",
        docLinks: [
          {
            label: "Comparison operators",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Greater_than",
            type: "js-operator",
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode:
          "// 1. Function declaration\n\n\n// 2. Function expression\n\n\n// 3. Arrow function\n\n\n// Test all three:\n// console.log(isPositive1(5));  // true\n// console.log(isPositive2(-3)); // false\n// console.log(isPositive3(0));  // false\n",
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["function", "=>", "console.log"] },
      },
      hints: [
        "Declaration: function isPositive1(n) { return n > 0; }",
        "Expression: const isPositive2 = function(n) { return n > 0; };",
        "Arrow: const isPositive3 = n => n > 0;",
      ],
    },
  ],
};
