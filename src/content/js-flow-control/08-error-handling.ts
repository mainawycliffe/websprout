import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-flow-control-error-handling",
  slug: "error-handling",
  title: "When Things Go Wrong: try...catch",
  description:
    "Learn how to gracefully handle errors so your program recovers instead of crashing.",
  order: 8,
  steps: [
    {
      id: "what-are-errors",
      type: "explanation",
      instruction: {
        heading: "Programs break — and that's okay",
        body: "No matter how carefully you write code, errors happen. A user types letters where a number is expected. A network request fails because the WiFi dropped. A JSON file has a missing comma. These are not bugs in your code — they're normal situations that your code needs to handle.\n\nWithout error handling, a single error crashes your entire program. The browser shows a cryptic message in the console, and nothing else runs. That's a terrible experience for users — imagine if Google crashed every time a search request timed out!\n\nJavaScript gives you `try...catch` to deal with errors gracefully: try something risky, and if it fails, catch the error and handle it instead of crashing.",
        analogy:
          "try...catch is like a safety net under a tightrope walker. You try the risky move, and if you fall, the catch block catches you instead of crashing to the ground. The show goes on — the audience might not even notice anything went wrong.",
        docLinks: [
          {
            label: "try...catch",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Error handling with try...catch has been in JavaScript since ES3 (1999). The Error object and its subtypes (TypeError, SyntaxError, RangeError, etc.) are defined by the ECMAScript specification. Every JavaScript engine throws the same types of errors in the same situations.",
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
      id: "try-catch-syntax",
      type: "explanation",
      instruction: {
        heading: "try...catch syntax",
        body: "Here's the basic structure:\n\n```\ntry {\n  // Code that might throw an error\n} catch (error) {\n  // Code that runs if an error occurs\n}\n```\n\n**How it works:**\n1. JavaScript runs the code inside `try`.\n2. If no error occurs, the `catch` block is skipped entirely.\n3. If an error is thrown, JavaScript immediately jumps to the `catch` block, passing the error object as a parameter.\n4. After `catch` finishes, the program continues normally — it does NOT crash.\n\nThe `error` parameter (you can name it anything, but `error` or `err` is conventional) is an object with useful properties:\n- `error.message` — A human-readable description of what went wrong\n- `error.name` — The type of error (e.g., 'TypeError', 'SyntaxError')\n\nReal-world example: When YouTube can't load a video, it doesn't crash the whole page — it catches the error and shows 'This video is unavailable' instead.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip: Don't use try...catch to hide bugs",
            body: "try...catch should be used for situations where errors are *expected* — like parsing user input, loading external data, or accessing something that might not exist. Don't wrap your entire program in try...catch to suppress errors — that hides bugs and makes debugging impossible. Only catch what you can actually handle.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// Without try...catch — this crashes!\n// let data = JSON.parse("not valid json"); // ERROR!\n\n// With try...catch — error handled gracefully\ntry {\n  let data = JSON.parse("not valid json");\n  console.log(data);\n} catch (error) {\n  console.log("Error type: " + error.name);\n  console.log("Error message: " + error.message);\n}\n\nconsole.log("Program continues running!");`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "finally-block",
      type: "explanation",
      instruction: {
        heading: "The finally block: Code that always runs",
        body: "You can add a `finally` block after `catch`. Code in `finally` runs no matter what — whether the try succeeded or an error was caught:\n\n```\ntry {\n  // risky code\n} catch (error) {\n  // handle error\n} finally {\n  // ALWAYS runs — success or failure\n}\n```\n\n`finally` is useful for cleanup tasks that must happen regardless of the outcome:\n- Closing a file or connection\n- Hiding a loading spinner\n- Resetting a form\n\nThink of it like this: you try to cook dinner, and if something goes wrong (catch), you deal with it. But either way (finally), you clean the kitchen.\n\nOn a website like Amazon, when you submit an order: the `try` block processes payment, `catch` handles payment failures, and `finally` re-enables the submit button and hides the loading spinner — regardless of whether the payment succeeded or failed.",
        docLinks: [
          {
            label: "Error",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `console.log("Starting...");\n\ntry {\n  console.log("Trying to parse JSON...");\n  let result = JSON.parse('{"name": "Alice"}');\n  console.log("Success: " + result.name);\n} catch (error) {\n  console.log("Failed: " + error.message);\n} finally {\n  console.log("Cleanup complete (always runs).");\n}\n\n// Output:\n// Starting...\n// Trying to parse JSON...\n// Success: Alice\n// Cleanup complete (always runs).`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "wrap-in-try-catch",
      type: "gap-fill",
      instruction: {
        heading: "Wrap risky code in try...catch",
        body: "Fill in the blanks to properly handle an error from parsing invalid JSON.",
      },
      config: {
        type: "gap-fill",
        template:
          '{{tryKeyword}} {\n  let data = JSON.parse("this is not JSON");\n  console.log(data);\n} {{catchKeyword}} (error) {\n  console.log("Parsing failed: " + error.{{property}});\n}',
        gaps: [
          {
            id: "tryKeyword",
            placeholder: "keyword",
            acceptedAnswers: ["try"],
            caseSensitive: true,
          },
          {
            id: "catchKeyword",
            placeholder: "keyword",
            acceptedAnswers: ["catch"],
            caseSensitive: true,
          },
          {
            id: "property",
            placeholder: "error property",
            acceptedAnswers: ["message"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["tryKeyword", "catchKeyword", "property"],
        },
      },
      hints: [
        "The block that wraps risky code starts with the keyword...",
        "The block that handles the error starts with the keyword...",
        "The error object property that contains the human-readable description is...",
      ],
    },
    {
      id: "handle-json-errors",
      type: "js-console",
      instruction: {
        heading: "Handle JSON.parse errors gracefully",
        body: "You're building a function that receives JSON data from a user. Sometimes the data is valid, sometimes it's not. Use `try...catch` to:\n\n1. Try to parse the `userInput` string with `JSON.parse()`\n2. If it succeeds, log the parsed object's `name` property\n3. If it fails, log `\"Invalid JSON: \"` followed by the error message\n4. In a `finally` block, log `\"Processing complete.\"`\n\nThe starter input is invalid JSON, so the expected output is the error message followed by the finally message.",
      },
      config: {
        type: "js-console",
        starterCode: `let userInput = '{name: "Alice"}';\n// Note: this is invalid JSON! (property names need double quotes)\n\n// Use try...catch...finally to handle the parsing\n`,
        expectedOutput: ["Invalid JSON:", "Processing complete."],
      },
      validation: {
        type: "console-output-match",
        criteria: { requiredOutputCount: 2 },
      },
      hints: [
        "Start with: try { let data = JSON.parse(userInput); ... }",
        'In the catch block: console.log("Invalid JSON: " + error.message);',
        'In the finally block: console.log("Processing complete.");',
      ],
    },
  ],
};
