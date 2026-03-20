import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-functions-scope",
  slug: "scope",
  title: "Variable Scope",
  description:
    "Understand where variables live and die — global scope, function scope, and block scope.",
  order: 6,
  steps: [
    {
      id: "what-is-scope",
      type: "explanation",
      instruction: {
        heading: "What is scope?",
        body: "Scope determines where a variable is visible and accessible in your code. When you declare a variable, it doesn't exist everywhere — it only exists within a certain region of your program. If you try to use a variable outside its scope, JavaScript will throw a ReferenceError because it can't see it. Understanding scope is essential for writing bug-free code and is one of the most important concepts in programming.",
        analogy:
          "Scope is like rooms in a house. A variable declared in the kitchen (inside a function) is only visible in the kitchen. But a variable declared in the hallway (outside all functions, at the top level) can be seen from any room. You can't grab something from the bedroom while standing in the kitchen — unless it's in the shared hallway.",
        docLinks: [
          {
            label: "Scope",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Scope",
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
      id: "global-scope",
      type: "explanation",
      instruction: {
        heading: "Global scope: visible everywhere",
        body: "A variable declared outside of any function or block is in the global scope. It can be accessed from anywhere in your program — inside functions, inside loops, everywhere. While this sounds convenient, global variables are dangerous in larger programs: any function can accidentally overwrite them, and name collisions become likely. In the browser, global variables are attached to the `window` object, meaning they're shared across all scripts on the page.",
        docLinks: [
          {
            label: "Global scope",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Global_scope",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Avoid global variables whenever possible. If two different parts of your code both use a global variable called `count`, they'll overwrite each other without warning. Keep variables in the narrowest scope possible — this is called the 'principle of least privilege.'",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// Global variable — declared outside any function\nconst appName = "WebSprout";\n\nfunction showAppName() {\n  // Can access the global variable from inside a function\n  console.log(appName); // "WebSprout"\n}\n\nshowAppName();\nconsole.log(appName); // "WebSprout" — also accessible here',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "function-scope",
      type: "explanation",
      instruction: {
        heading: "Function scope: trapped inside the function",
        body: "Variables declared inside a function (using `let`, `const`, or `var`) only exist inside that function. They're created when the function is called and destroyed when the function finishes. Code outside the function cannot see or access them. This is function scope. Each function call creates its own separate scope — variables from one call don't interfere with variables from another call.",
        docLinks: [
          {
            label: "Function scope",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Function_scope",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'function calculateTax(price) {\n  const taxRate = 0.08;  // Only exists inside this function\n  const tax = price * taxRate;\n  return tax;\n}\n\nconsole.log(calculateTax(100)); // 8\n\n// Trying to access function variables from outside:\n// console.log(taxRate); // ReferenceError: taxRate is not defined\n// console.log(tax);     // ReferenceError: tax is not defined',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "block-scope",
      type: "explanation",
      instruction: {
        heading: "Block scope: curly braces create boundaries",
        body: "With `let` and `const`, any pair of curly braces `{}` creates a new scope — this includes `if` blocks, `for` loops, and `while` loops (not just functions). Variables declared with `let` or `const` inside a block are only accessible inside that block. This is block scope, and it's one of the main reasons `let` and `const` replaced `var`. The older `var` keyword does NOT respect block scope — it only respects function scope — which led to many subtle bugs.",
        docLinks: [
          {
            label: "Block scope",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "`let` and `const` were introduced in ES6 (2015) specifically to provide block scoping. Before ES6, JavaScript only had `var`, which is function-scoped — it ignores block boundaries. This is why modern JavaScript best practice is to always use `let` and `const` instead of `var`.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'const age = 20;\n\nif (age >= 18) {\n  const message = "You are an adult.";  // Block-scoped\n  let status = "eligible";               // Block-scoped\n  console.log(message); // "You are an adult."\n}\n\n// Outside the block:\n// console.log(message); // ReferenceError!\n// console.log(status);  // ReferenceError!\n\n// var does NOT respect block scope:\nif (true) {\n  var leaked = "I escaped!";  // function-scoped, not block-scoped\n}\nconsole.log(leaked); // "I escaped!" — var leaks out of blocks!',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "closures-intro",
      type: "explanation",
      instruction: {
        heading: "Closures: a function remembers where it was born",
        body: "Here's a powerful concept: when a function is created inside another function, it remembers the variables from its parent scope even after the parent function has finished running. This is called a closure. You don't need to master closures right now, but understanding the basic idea will help you recognize patterns you'll see in callbacks, event handlers, and many JavaScript libraries. The inner function 'closes over' the variables it needs.",
        analogy:
          "A closure is like taking a photo in a room. Even after you leave the room, the photo still shows everything that was there. The inner function is the photo — it captures and remembers the variables from the scope where it was created, even after that scope is gone.",
        docLinks: [
          {
            label: "Closures",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'function createGreeter(greeting) {\n  // The inner function "remembers" greeting\n  return function(name) {\n    return greeting + ", " + name + "!";\n  };\n}\n\nconst sayHello = createGreeter("Hello");\nconst sayHowdy = createGreeter("Howdy");\n\n// greeting is gone from createGreeter... but the\n// inner functions still remember their greeting!\nconsole.log(sayHello("Alice")); // "Hello, Alice!"\nconsole.log(sayHowdy("Bob"));   // "Howdy, Bob!"',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "predict-scope",
      type: "gap-fill",
      instruction: {
        heading: "Predict the scope",
        body: "Look at the code and predict what gets logged. Think carefully about which variables are accessible where.",
      },
      config: {
        type: "gap-fill",
        template:
          'const color = "blue";\n\nfunction paint() {\n  const shade = "dark";\n  console.log(shade + " " + color);\n}\n\npaint();\n// The console prints: "{{output}}"\n\n// Is `shade` accessible outside the function? {{accessible}}',
        gaps: [
          {
            id: "output",
            placeholder: "what gets logged",
            acceptedAnswers: ["dark blue"],
            caseSensitive: true,
          },
          {
            id: "accessible",
            placeholder: "yes or no",
            acceptedAnswers: ["no"],
            caseSensitive: false,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["output", "accessible"],
        },
      },
      hints: [
        "`color` is global so paint() can see it. `shade` is defined inside paint().",
        "The function concatenates shade + space + color.",
        "`shade` is function-scoped — it only exists inside paint().",
      ],
    },
    {
      id: "experiment-scope",
      type: "js-console",
      instruction: {
        heading: "Experiment with scope",
        body: "Write code that demonstrates all three scope levels. Create a global variable, a function with a local variable, and an `if` block inside the function with a block-scoped variable. Log variables at different levels to see what's accessible where. Try accessing a variable outside its scope to see the error.",
        docLinks: [
          {
            label: "let statement",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode:
          '// 1. Declare a global variable\nconst planet = "Earth";\n\n// 2. Create a function with a local variable\nfunction explore() {\n  const vehicle = "spaceship";\n\n  // 3. Add an if-block with a block-scoped variable\n  if (true) {\n    const destination = "Mars";\n    // Log all three variables here — they should all work\n\n  }\n\n  // Try logging `destination` here — what happens?\n\n}\n\nexplore();\n\n// Try logging `vehicle` here — what happens?\n',
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["const", "function", "console.log"] },
      },
      hints: [
        "Inside the if-block, all three variables are accessible: planet, vehicle, destination.",
        "Outside the if-block but inside the function, destination is NOT accessible.",
        "Outside the function, only planet is accessible.",
      ],
    },
  ],
};
