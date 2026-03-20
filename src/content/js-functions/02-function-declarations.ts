import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-functions-function-declarations",
  slug: "function-declarations",
  title: "Function Declarations",
  description:
    "Learn how to declare and call your first function using the function keyword.",
  order: 2,
  steps: [
    {
      id: "anatomy-of-declaration",
      type: "explanation",
      instruction: {
        heading: "The anatomy of a function declaration",
        body: "A function declaration has four parts: (1) the `function` keyword, which tells JavaScript you're creating a function; (2) the name, which is how you'll refer to it later; (3) parentheses `()` that will hold inputs (we'll cover those in the next lesson); and (4) curly braces `{}` containing the code that runs when the function is called. The code inside the curly braces is called the function body.",
        analogy:
          "Declaring a function is like writing a recipe card and filing it in a recipe box. You give it a name ('Chocolate Cake'), list the steps inside, and put it away. The recipe doesn't make itself — it just sits there, ready to be used when you decide to cook.",
        docLinks: [
          {
            label: "function declaration",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Function declarations are 'hoisted' in JavaScript — the engine moves them to the top of their scope before executing any code. This means you can call a function before the line where it's declared. We'll explore hoisting in depth in a later lesson.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// keyword  name      parentheses\n//   |       |           |\nfunction sayHello() {\n  // function body — the code that runs\n  console.log("Hello, world!");\n}',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "naming-functions",
      type: "explanation",
      instruction: {
        heading: "Naming functions: verb + noun",
        body: "Good function names describe what the function does using a verb (action) followed by a noun (thing). Think of it as answering the question: 'What does this function do?' Examples: `calculateTotal` (calculates a total), `formatName` (formats a name), `sendEmail` (sends an email), `validatePassword` (validates a password). Avoid vague names like `doStuff` or `process` — they tell the reader nothing. A well-named function is like a good chapter title: you know what's inside without reading it.",
        docLinks: [
          {
            label: "JavaScript naming conventions",
            url: "https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Writing_style_guide/Code_style_guide/JavaScript#functions_and_objects",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Use camelCase for function names, just like variables: `calculateTax`, `getUserName`, `isValidEmail`. Functions that return true/false often start with `is` or `has`: `isEmpty()`, `hasPermission()`.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// GOOD names — clear what they do:\nfunction calculateTax() { /* ... */ }\nfunction formatPhoneNumber() { /* ... */ }\nfunction showErrorMessage() { /* ... */ }\nfunction isOldEnough() { /* ... */ }\n\n// BAD names — vague and confusing:\nfunction doStuff() { /* ... */ }\nfunction handle() { /* ... */ }\nfunction x() { /* ... */ }',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "calling-a-function",
      type: "explanation",
      instruction: {
        heading: "Calling a function",
        body: "Declaring a function doesn't run its code — it just stores the instructions. To actually execute those instructions, you call (or invoke) the function by writing its name followed by parentheses: `sayHello()`. The parentheses are critical — they're the 'go' signal. Without them, you're just referencing the function object, not running it. You can call the same function as many times as you want.",
        analogy:
          "If declaring a function is writing a recipe card, calling a function is pulling that card out of the box and actually cooking the dish. You can cook the same recipe ten times — you just call it ten times.",
        docLinks: [
          {
            label: "Calling functions",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#calling_functions",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// 1. DECLARE the function (write the recipe)\nfunction sayHello() {\n  console.log("Hello, world!");\n}\n\n// 2. CALL the function (cook the dish)\nsayHello(); // "Hello, world!"\nsayHello(); // "Hello, world!" — again!\nsayHello(); // "Hello, world!" — three times!',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "declare-and-call",
      type: "gap-fill",
      instruction: {
        heading: "Declare and call a function",
        body: "Complete the code below to declare a function called `greetUser` that logs a greeting, then call it.",
      },
      config: {
        type: "gap-fill",
        template:
          '// Declare the function\n{{keyword}} greetUser() {\n  console.log("Welcome to WebSprout!");\n}\n\n// Call the function\n{{call}};',
        gaps: [
          {
            id: "keyword",
            placeholder: "keyword",
            acceptedAnswers: ["function"],
            caseSensitive: true,
          },
          {
            id: "call",
            placeholder: "call the function",
            acceptedAnswers: ["greetUser()"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["keyword", "call"],
        },
      },
      hints: [
        "The keyword that creates a function is `function`.",
        "To call a function, write its name followed by parentheses: functionName()",
      ],
    },
    {
      id: "write-your-own",
      type: "js-console",
      instruction: {
        heading: "Write and call your own function",
        body: "Create a function called `introduce` that logs your name and a fun fact about yourself. Then call it twice. You should see your introduction printed two times in the console.",
        docLinks: [
          {
            label: "console.log()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/console/log_static",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode:
          "// 1. Declare a function called 'introduce'\n//    Inside, use console.log() to print your name and a fun fact\n\n\n// 2. Call the function twice\n",
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["function", "introduce", "console.log"] },
      },
      hints: [
        "Start with: function introduce() {",
        "Put a console.log() inside the curly braces",
        "Call it with: introduce()",
      ],
    },
  ],
};
