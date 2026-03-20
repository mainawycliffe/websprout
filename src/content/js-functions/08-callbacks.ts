import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-functions-callbacks",
  slug: "callbacks",
  title: "Callbacks",
  description:
    "Discover how to pass functions as arguments to other functions and unlock powerful patterns.",
  order: 8,
  steps: [
    {
      id: "what-is-callback",
      type: "explanation",
      instruction: {
        heading: "Functions can receive other functions",
        body: "Since functions are values in JavaScript (just like numbers and strings), you can pass a function as an argument to another function. A function that's passed as an argument is called a callback — because the receiving function will 'call it back' at the right time. This is one of the most powerful patterns in JavaScript and the foundation for event handling, timers, array methods, and asynchronous code. You've already been using callbacks without knowing it: `setTimeout`, `.forEach()`, `.map()`, and `.filter()` all take callbacks.",
        analogy:
          "A callback is like telling a friend: 'When you finish cooking dinner, call me.' You're giving them a task (the callback function) to run at the right time. You don't cook the dinner yourself — you hand off the instructions and your friend executes them when the moment comes.",
        docLinks: [
          {
            label: "Callback function",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Callback_function",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Callbacks are central to JavaScript's event-driven architecture. The browser uses callbacks for everything: click handlers, network responses, timers, and more. This pattern allows JavaScript to be 'non-blocking' — it can start a timer or network request, continue running other code, and then run the callback when the result is ready.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// A function that takes another function as an argument\nfunction doTwice(action) {\n  action(); // Call the callback the first time\n  action(); // Call the callback the second time\n}\n\n// Pass a function as an argument\nfunction sayHello() {\n  console.log("Hello!");\n}\n\ndoTwice(sayHello);\n// "Hello!"\n// "Hello!"\n\n// Note: we pass sayHello, NOT sayHello()\n// sayHello  = the function itself (the recipe card)\n// sayHello() = calling the function (cooking the dish)',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "why-callbacks",
      type: "explanation",
      instruction: {
        heading: "Why callbacks exist: customizable behavior",
        body: "Callbacks let you write general-purpose functions that can be customized by the caller. Instead of hardcoding behavior, you leave a slot for a function that the user provides. This makes your code flexible and reusable. Consider a `repeat` function that does something N times — without callbacks, you'd need a different function for each action. With callbacks, you write `repeat` once and pass in whatever action you want.",
        docLinks: [
          {
            label: "First-class functions",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// A general-purpose "repeat" function\nfunction repeat(times, action) {\n  for (let i = 0; i < times; i++) {\n    action(i); // Pass the index to the callback\n  }\n}\n\n// Customize it with different callbacks:\nrepeat(3, (i) => console.log("Iteration " + i));\n// "Iteration 0"\n// "Iteration 1"\n// "Iteration 2"\n\nrepeat(3, (i) => console.log("*".repeat(i + 1)));\n// "*"\n// "**"\n// "***"',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "settimeout-callback",
      type: "explanation",
      instruction: {
        heading: "setTimeout: your first async callback",
        body: "`setTimeout` is a built-in function that takes a callback and a delay (in milliseconds). It waits for the specified time, then calls your callback. This is your first taste of asynchronous JavaScript — code that runs later, not immediately. Notice that `setTimeout` doesn't pause your program. JavaScript continues running the next lines while the timer counts down in the background. When the timer finishes, the callback gets called.",
        docLinks: [
          {
            label: "setTimeout()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/setTimeout",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "The delay in `setTimeout` is in milliseconds, not seconds. 1000ms = 1 second. A common mistake is writing `setTimeout(fn, 3)` thinking it's 3 seconds, when it's actually 3 milliseconds (nearly instant).",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'console.log("Starting...");\n\n// This callback runs AFTER 2 seconds\nsetTimeout(function() {\n  console.log("2 seconds later!");\n}, 2000);\n\n// This runs IMMEDIATELY — doesn\'t wait for setTimeout\nconsole.log("This runs first!");\n\n// Output order:\n// "Starting..."\n// "This runs first!"       (runs immediately)\n// "2 seconds later!"       (runs after 2 seconds)\n\n// Arrow function version:\nsetTimeout(() => console.log("Arrow timeout!"), 1000);',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "array-callbacks",
      type: "explanation",
      instruction: {
        heading: "Array methods with callbacks",
        body: "The most common place you'll use callbacks is with array methods. These methods iterate over an array and call your callback for each element:\n\n- `.forEach(callback)` — runs the callback for each item (no return value)\n- `.map(callback)` — transforms each item and returns a new array\n- `.filter(callback)` — keeps only items where the callback returns true\n\nThese replace manual `for` loops with cleaner, more readable code.",
        docLinks: [
          {
            label: "Array.prototype.map()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
            type: "js-method",
          },
          {
            label: "Array.prototype.filter()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
            type: "js-method",
          },
          {
            label: "Array.prototype.forEach()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'const numbers = [1, 2, 3, 4, 5];\n\n// .map() — transform each item\nconst doubled = numbers.map((n) => n * 2);\nconsole.log(doubled); // [2, 4, 6, 8, 10]\n\n// .filter() — keep items that pass a test\nconst evens = numbers.filter((n) => n % 2 === 0);\nconsole.log(evens); // [2, 4]\n\n// .forEach() — do something with each item\nnumbers.forEach((n) => {\n  console.log("Number: " + n);\n});\n// "Number: 1", "Number: 2", etc.\n\n// Chain them together:\nconst result = numbers\n  .filter(n => n > 2)     // [3, 4, 5]\n  .map(n => n * 10);      // [30, 40, 50]\nconsole.log(result);',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "callback-gap-fill",
      type: "gap-fill",
      instruction: {
        heading: "Pass a callback to .map() and .filter()",
        body: "Complete the code to double all numbers with `.map()`, then filter to keep only results greater than 5.",
      },
      config: {
        type: "gap-fill",
        template:
          "const numbers = [1, 2, 3, 4, 5];\n\n// Double each number\nconst doubled = numbers.{{map_method}}(n => n * 2);\nconsole.log(doubled); // [2, 4, 6, 8, 10]\n\n// Keep only numbers greater than 5\nconst big = doubled.{{filter_method}}(n => n {{comparison}} 5);\nconsole.log(big); // [6, 8, 10]",
        gaps: [
          {
            id: "map_method",
            placeholder: "array method",
            acceptedAnswers: ["map"],
            caseSensitive: true,
          },
          {
            id: "filter_method",
            placeholder: "array method",
            acceptedAnswers: ["filter"],
            caseSensitive: true,
          },
          {
            id: "comparison",
            placeholder: "operator",
            acceptedAnswers: [">"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["map_method", "filter_method", "comparison"],
        },
      },
      hints: [
        "`.map()` transforms each element into something new.",
        "`.filter()` keeps elements that pass a test (return true).",
        "Greater than uses the `>` operator.",
      ],
    },
    {
      id: "practice-callbacks",
      type: "js-console",
      instruction: {
        heading: "Practice with callbacks",
        body: "Given the array of names below, use array methods with callbacks to:\n1. Use `.map()` to convert all names to uppercase\n2. Use `.filter()` to keep only names longer than 4 characters\n3. Use `.forEach()` to log each filtered name with a greeting\n\nBonus: Write your own function that accepts a callback and calls it.",
        docLinks: [
          {
            label: "String.prototype.toUpperCase()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode:
          'const names = ["Alice", "Bob", "Charlotte", "Dan", "Elizabeth"];\n\n// 1. Convert all names to uppercase using .map()\n\n\n// 2. Filter names longer than 4 characters\n\n\n// 3. Log a greeting for each filtered name using .forEach()\n\n',
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: [".map", ".filter", "console.log"] },
      },
      hints: [
        "const upper = names.map(name => name.toUpperCase());",
        "const longNames = names.filter(name => name.length > 4);",
        "longNames.forEach(name => console.log(\"Hello, \" + name + \"!\"));",
      ],
    },
  ],
};
