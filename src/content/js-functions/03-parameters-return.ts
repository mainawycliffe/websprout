import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-functions-parameters-return",
  slug: "parameters-return",
  title: "Parameters & Return Values",
  description:
    "Learn how to pass data into functions and get results back out.",
  order: 3,
  steps: [
    {
      id: "parameters-as-inputs",
      type: "explanation",
      instruction: {
        heading: "Parameters: filling in the blanks",
        body: "So far our functions have done the exact same thing every time. But real functions need to work with different data. Parameters are variables listed inside the parentheses of a function declaration — they act as placeholders for the actual values you'll provide when you call the function. When you call `greet(\"Alice\")`, the string `\"Alice\"` gets assigned to the parameter `name` inside the function. The value you pass in is called an argument. Think of it this way: the parameter is the blank on the form, the argument is what you fill in.",
        analogy:
          "Parameters are like blanks in a Mad Libs story. The function is the template: 'Make a sandwich with _____ and _____.' You fill in the blanks each time you use it — 'Make a sandwich with turkey and cheese' or 'Make a sandwich with peanut butter and jelly.' Same recipe, different ingredients.",
        docLinks: [
          {
            label: "Function parameters",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Parameter",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Technically, 'parameter' refers to the variable in the function definition, and 'argument' refers to the actual value passed when calling the function. Many developers use the terms interchangeably, but knowing the difference helps when reading documentation.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '//              parameter (the blank)\n//                  |\nfunction greet(name) {\n  console.log("Hello, " + name + "!");\n}\n\n//       argument (what you fill in)\n//            |\ngreet("Alice"); // "Hello, Alice!"\ngreet("Bob");   // "Hello, Bob!"',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "multiple-parameters",
      type: "explanation",
      instruction: {
        heading: "Multiple parameters",
        body: "Functions can accept more than one parameter — just separate them with commas. When you call the function, pass the arguments in the same order as the parameters are listed. The order matters: the first argument goes to the first parameter, the second argument to the second parameter, and so on. There's no built-in limit to how many parameters a function can have, but more than 3-4 usually means the function is trying to do too much.",
        docLinks: [
          {
            label: "Functions guide",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "If you call a function with fewer arguments than it has parameters, the missing parameters will be `undefined`. This is a common source of bugs — always check that you're passing the right number of arguments.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// Two parameters: firstName and lastName\nfunction formatName(firstName, lastName) {\n  console.log(firstName + " " + lastName);\n}\n\nformatName("Ada", "Lovelace");    // "Ada Lovelace"\nformatName("Grace", "Hopper");    // "Grace Hopper"\n\n// Order matters!\nformatName("Lovelace", "Ada");    // "Lovelace Ada" — oops!',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "return-values",
      type: "explanation",
      instruction: {
        heading: "Return values: getting results out",
        body: "Most useful functions don't just log things — they compute a result and hand it back. The `return` keyword sends a value back to wherever the function was called. Once a `return` statement executes, the function stops immediately — any code after it won't run. The returned value can be stored in a variable, used in an expression, or passed to another function. Think of `return` as the function's answer.",
        analogy:
          "If calling a function is like ordering food at a restaurant, the return value is the dish that comes back to your table. You gave the kitchen your order (arguments), they cooked it (function body), and they returned the finished plate (return value). Without `return`, it's like the kitchen cooked the food but forgot to bring it out.",
        docLinks: [
          {
            label: "return statement",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "// This function RETURNS a value\nfunction add(a, b) {\n  return a + b;  // sends the result back\n}\n\n// Store the returned value in a variable\nconst sum = add(3, 7);\nconsole.log(sum); // 10\n\n// Or use it directly in an expression\nconsole.log(add(10, 20) + 5); // 35\n\n// Without return, you get undefined\nfunction addNoReturn(a, b) {\n  a + b;  // calculates but doesn't return!\n}\nconsole.log(addNoReturn(3, 7)); // undefined",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "default-parameters",
      type: "explanation",
      instruction: {
        heading: "Default parameters: built-in fallbacks",
        body: "Sometimes you want a parameter to have a sensible default value if the caller doesn't provide one. ES6 introduced default parameters — you assign a default value right in the parameter list using `=`. If the caller provides an argument, it overrides the default. If they don't, the default kicks in. This is especially useful for optional settings.",
        docLinks: [
          {
            label: "Default parameters",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Default parameters should come AFTER required parameters. Putting a default parameter first and a required one second leads to awkward calls where you have to pass `undefined` to skip the first argument.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// taxRate has a default value of 0.08 (8%)\nfunction calculateTotal(price, taxRate = 0.08) {\n  return price + (price * taxRate);\n}\n\n// Uses default 8% tax rate\nconsole.log(calculateTotal(100));       // 108\n\n// Overrides with 10% tax rate\nconsole.log(calculateTotal(100, 0.10)); // 110\n\n// Greeting with default name\nfunction greet(name = "friend") {\n  return "Hello, " + name + "!";\n}\nconsole.log(greet());         // "Hello, friend!"\nconsole.log(greet("Alice"));  // "Hello, Alice!"',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fill-in-params-return",
      type: "gap-fill",
      instruction: {
        heading: "Add parameters and a return value",
        body: "Complete the function so it takes two numbers (width and height) and returns their product (the area of a rectangle).",
      },
      config: {
        type: "gap-fill",
        template:
          "function calculateArea({{param1}}, {{param2}}) {\n  {{return_keyword}} width * height;\n}\n\nconst area = calculateArea(5, 10);\nconsole.log(area); // 50",
        gaps: [
          {
            id: "param1",
            placeholder: "first parameter",
            acceptedAnswers: ["width"],
            caseSensitive: true,
          },
          {
            id: "param2",
            placeholder: "second parameter",
            acceptedAnswers: ["height"],
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
          gaps: ["param1", "param2", "return_keyword"],
        },
      },
      hints: [
        "The function multiplies width * height, so those must be the parameter names.",
        "To send a value back from a function, use the `return` keyword.",
      ],
    },
    {
      id: "area-calculator",
      type: "js-console",
      instruction: {
        heading: "Build an area calculator",
        body: "Write a function called `calculateArea` that takes `width` and `height` as parameters and returns the area (width times height). Then call it with at least two different sets of dimensions and log the results.",
        docLinks: [
          {
            label: "Multiplication operator (*)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Multiplication",
            type: "js-operator",
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode:
          "// Write a function that calculates area (width * height)\n// Then test it with different values\n\n",
        expectedOutput: ["50", "36"],
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["function", "return", "console.log"] },
      },
      hints: [
        "Start with: function calculateArea(width, height) {",
        "Inside the function body, use: return width * height;",
        "Call it: console.log(calculateArea(5, 10));",
        "Try another: console.log(calculateArea(6, 6));",
      ],
    },
  ],
};
