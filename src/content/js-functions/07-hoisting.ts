import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-functions-hoisting",
  slug: "hoisting",
  title: "Hoisting",
  description:
    "Learn how JavaScript hoists declarations before running your code and why it matters.",
  order: 7,
  steps: [
    {
      id: "what-is-hoisting",
      type: "explanation",
      instruction: {
        heading: "JavaScript reads your code twice",
        body: "Before JavaScript runs a single line of your code, it does a quick scan of the entire scope to find all declarations — variable declarations (`var`, `let`, `const`) and function declarations. It then 'hoists' (lifts) them to the top of their scope conceptually. This means JavaScript knows about your variables and functions before it reaches the line where you wrote them. However, how they behave when accessed early depends on the keyword used. Understanding hoisting explains many confusing JavaScript behaviors.",
        analogy:
          "Hoisting is like a teacher taking attendance before class starts. JavaScript scans your code first to see who's declared — 'I see a variable called `name`, a function called `greet`...' — then starts executing. But `let` and `const` students can't participate until their actual line is reached — they're marked present but told to wait.",
        docLinks: [
          {
            label: "Hoisting",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Hoisting",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Hoisting is not something JavaScript literally does to your code — it doesn't physically move lines around. It's a mental model for understanding how the JavaScript engine's creation phase works. During this phase, the engine allocates memory for declarations before executing any code.",
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
      id: "var-hoisting",
      type: "explanation",
      instruction: {
        heading: "var is hoisted with undefined",
        body: "When you declare a variable with `var`, the declaration is hoisted to the top of its function scope, but the assignment stays where it is. This means if you access a `var` variable before its assignment line, you get `undefined` instead of an error. This silent failure is one of the biggest reasons `var` fell out of favor — your code runs without errors, but the values are wrong, creating hard-to-find bugs.",
        docLinks: [
          {
            label: "var hoisting",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#hoisting",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// What you write:\nconsole.log(greeting); // undefined (no error!)\nvar greeting = "Hello!";\nconsole.log(greeting); // "Hello!"\n\n// What JavaScript sees after hoisting:\n// var greeting;              // Declaration hoisted\n// console.log(greeting);     // undefined\n// greeting = "Hello!";       // Assignment stays here\n// console.log(greeting);     // "Hello!"',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "let-const-tdz",
      type: "explanation",
      instruction: {
        heading: "let and const: the Temporal Dead Zone",
        body: "Variables declared with `let` and `const` are also hoisted — JavaScript knows they exist — but they're placed in a Temporal Dead Zone (TDZ) from the start of their scope until the line where they're declared. If you try to access them in the TDZ, you get a ReferenceError. This is actually a good thing: it catches bugs early by loudly failing instead of silently giving you `undefined`. This is exactly why `let` and `const` are preferred over `var`.",
        docLinks: [
          {
            label: "Temporal Dead Zone",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "This is why we use `let` and `const` instead of `var`. Getting a clear error ('Cannot access before initialization') is much better than getting a silent `undefined` that causes mysterious bugs three functions later. Errors are your friends — they tell you exactly where the problem is.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// let — ReferenceError in the Temporal Dead Zone\n// console.log(name); // ReferenceError: Cannot access \'name\' before initialization\nlet name = "Alice";\nconsole.log(name); // "Alice" — works after declaration\n\n// const — same behavior\n// console.log(age); // ReferenceError\nconst age = 25;\nconsole.log(age); // 25\n\n// Compare to var — silent undefined, no error\nconsole.log(color); // undefined (no error — dangerous!)\nvar color = "blue";',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "function-declaration-hoisting",
      type: "explanation",
      instruction: {
        heading: "Function declarations are fully hoisted",
        body: "Function declarations get special treatment: they're hoisted completely — both the name and the entire function body. This means you can call a function declaration before the line where it's written, and it works perfectly. This is the one case where hoisting is genuinely convenient. Function expressions and arrow functions, however, follow the same rules as the variable keyword they use (`const`, `let`, or `var`).",
        docLinks: [
          {
            label: "Function hoisting",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#function_hoisting",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// Function DECLARATION — fully hoisted, works before the line\nsayHello(); // "Hello!" — no error!\n\nfunction sayHello() {\n  console.log("Hello!");\n}\n\n// Function EXPRESSION — NOT fully hoisted\n// sayGoodbye(); // TypeError: sayGoodbye is not a function\n\nconst sayGoodbye = function() {\n  console.log("Goodbye!");\n};\n\nsayGoodbye(); // "Goodbye!" — works after the line\n\n// Arrow function — same as expression\n// greet(); // ReferenceError\nconst greet = () => console.log("Hi!");',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "predict-hoisting",
      type: "gap-fill",
      instruction: {
        heading: "Predict the hoisting behavior",
        body: "Look at each scenario and predict what happens. Will it work, give `undefined`, or throw an error?",
      },
      config: {
        type: "gap-fill",
        template:
          "// Scenario 1:\nconsole.log(x);\nvar x = 10;\n// Output: {{var_result}}\n\n// Scenario 2:\n// console.log(y);\n// const y = 20;\n// This would cause a: {{const_result}}\n\n// Scenario 3:\nhello();\nfunction hello() { console.log(\"Hi!\"); }\n// This {{works_or_fails}} because function declarations are fully hoisted.",
        gaps: [
          {
            id: "var_result",
            placeholder: "what gets logged",
            acceptedAnswers: ["undefined"],
            caseSensitive: true,
          },
          {
            id: "const_result",
            placeholder: "error type",
            acceptedAnswers: ["ReferenceError", "error", "Error"],
            caseSensitive: false,
          },
          {
            id: "works_or_fails",
            placeholder: "works or fails",
            acceptedAnswers: ["works"],
            caseSensitive: false,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["var_result", "const_result", "works_or_fails"],
        },
      },
      hints: [
        "`var` declarations are hoisted but their value is `undefined` until assignment.",
        "`const` variables are in the Temporal Dead Zone before their declaration line.",
        "Function declarations are fully hoisted — name AND body.",
      ],
    },
    {
      id: "hoisting-experiment",
      type: "js-console",
      instruction: {
        heading: "Experiment with hoisting",
        body: "Try the following experiments to see hoisting in action:\n1. Call a function declaration before it's defined — it should work.\n2. Try logging a `var` variable before its assignment — you should get `undefined`.\n3. Observe that function expressions stored in `const` cannot be called early.",
      },
      config: {
        type: "js-console",
        starterCode:
          '// Experiment 1: Call a function declaration before it\'s defined\n// Does this work? Try it!\nconsole.log(multiply(3, 4));\n\nfunction multiply(a, b) {\n  return a * b;\n}\n\n// Experiment 2: Access a var before assignment\nconsole.log(color); // What do you see?\nvar color = "red";\nconsole.log(color); // And now?\n\n// Experiment 3: Try to call a const function expression before it\'s defined\n// Uncomment the line below to see the error:\n// console.log(divide(10, 2));\n// const divide = (a, b) => a / b;\n',
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["function", "console.log"] },
      },
      hints: [
        "Experiment 1 should print 12 — function declarations are fully hoisted.",
        "Experiment 2 first prints `undefined`, then prints `red`.",
        "Experiment 3 would throw a ReferenceError if uncommented.",
      ],
    },
  ],
};
