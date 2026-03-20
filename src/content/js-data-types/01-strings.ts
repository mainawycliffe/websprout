import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-data-types-strings",
  slug: "strings",
  title: "Strings: Working with Text",
  description:
    "Learn how JavaScript stores and manipulates text using strings — from creating them with quotes to combining and transforming them.",
  order: 1,
  steps: [
    {
      id: "what-are-strings",
      type: "explanation",
      instruction: {
        heading: "Text lives inside quotes",
        body: "Every piece of text you see on a website — usernames, search results, error messages, button labels — is stored in JavaScript as a string. A string is simply a sequence of characters (letters, numbers, spaces, symbols) wrapped in quotes. Without strings, JavaScript couldn't handle any text at all — no displaying names, no reading what someone typed, no showing messages.\n\nYou create a string by wrapping text in quotes. JavaScript gives you three options: single quotes ('hello'), double quotes (\"hello\"), or backticks (`hello`). Single and double quotes work identically — pick one style and be consistent. Backticks are special and we'll explore them shortly.",
        analogy:
          "A string is like a necklace of beads — each bead is a character, and you can count them, rearrange them, or pick out specific ones. The quotes are like the clasp that holds the necklace together: they mark where the string starts and ends.",
        docLinks: [
          {
            label: "String",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Strings in JavaScript are encoded as UTF-16, which means they can hold characters from virtually any language — English, Chinese, Arabic, emoji, and more. When you write `let greeting = \"こんにちは\";`, JavaScript handles it just fine.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "let single = 'Hello';\nlet double = \"World\";\nlet backtick = `Hi there`;\n\nconsole.log(single);\nconsole.log(double);\nconsole.log(backtick);",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "string-length-and-access",
      type: "explanation",
      instruction: {
        heading: "Measuring and inspecting strings",
        body: "Every string knows how long it is. The `.length` property tells you the number of characters in a string — including spaces and punctuation. This is useful everywhere: checking if a password is long enough, limiting a tweet to 280 characters, or making sure a form field isn't empty.\n\nYou can also access individual characters using bracket notation with an index number. The first character is at index 0 (not 1!), the second is at index 1, and so on. This zero-based counting is a fundamental pattern in programming that you'll see again with arrays.",
        docLinks: [
          {
            label: "String.length",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Spaces count as characters! The string \"hi there\" has a length of 8, not 7. The space between \"hi\" and \"there\" is character index 2.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "let city = \"Tokyo\";\nconsole.log(city.length);    // 5\nconsole.log(city[0]);        // \"T\"\nconsole.log(city[1]);        // \"o\"\nconsole.log(city[4]);        // \"o\"",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "concatenation-and-templates",
      type: "explanation",
      instruction: {
        heading: "Combining strings together",
        body: "You'll often need to build a string from separate pieces — combining a user's first and last name, assembling a greeting message, or constructing a URL. JavaScript gives you two ways to combine (concatenate) strings.\n\nThe `+` operator joins strings end-to-end: `\"Hello\" + \" \" + \"World\"` produces `\"Hello World\"`. This works, but it gets messy when you have many pieces and variables mixed together.\n\nTemplate literals (backtick strings) are the modern, cleaner approach. Inside backticks, you can embed any expression using `${...}`. JavaScript evaluates whatever is inside the curly braces and inserts the result into the string. Template literals also preserve line breaks, making multi-line strings easy.",
        analogy:
          "Concatenation with + is like taping pieces of paper together end-to-end — it works, but gets unwieldy. Template literals are like a fill-in-the-blank form — the structure is already there, and you just drop values into the blanks.",
        docLinks: [
          {
            label: "Template literals",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals",
            type: "js-concept",
          },
          {
            label: "Addition operator (+) for strings",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition",
            type: "js-operator",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Template literals were added in ES6 (2015). Before that, developers had to use `+` for everything or resort to awkward workarounds. Today, template literals are the preferred way to build strings that include variables.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "let firstName = \"Ada\";\nlet lastName = \"Lovelace\";\n\n// Old way: concatenation with +\nlet full1 = firstName + \" \" + lastName;\nconsole.log(full1);\n\n// Modern way: template literals\nlet full2 = `${firstName} ${lastName}`;\nconsole.log(full2);\n\n// Template literals can include expressions\nlet age = 28;\nconsole.log(`${firstName} is ${age} years old.`);",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "gap-fill-strings",
      type: "gap-fill",
      instruction: {
        heading: "Practice: create and combine strings",
        body: "Use a template literal (backtick string) to build a greeting that includes the person's name and age. Remember: template literals use backticks (`) and embed values with `${...}`.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "The backtick key (`) is usually in the top-left corner of your keyboard, on the same key as the tilde (~). Don't confuse it with a single quote (')!",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template:
          "let name = \"Mia\";\nlet age = 15;\n\nlet greeting = {{open}}My name is ${name} and I am ${age} years old.{{close}};\nconsole.log(greeting);",
        gaps: [
          {
            id: "open",
            placeholder: "quote type",
            acceptedAnswers: ["`"],
            caseSensitive: true,
          },
          {
            id: "close",
            placeholder: "quote type",
            acceptedAnswers: ["`"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["open", "close"],
        },
      },
      hints: [
        "Template literals use backtick characters — the key in the top-left of your keyboard.",
        "Both the opening and closing quote must be backticks (`) for template literals to work.",
      ],
    },
    {
      id: "js-console-string-methods",
      type: "js-console",
      instruction: {
        heading: "Your turn: explore string methods",
        body: "Strings come with built-in methods that transform and inspect text. Try these out:\n\n- `.toUpperCase()` — converts to all caps: `\"hello\".toUpperCase()` gives `\"HELLO\"`\n- `.toLowerCase()` — converts to all lowercase\n- `.includes(\"text\")` — checks if a string contains the given text (returns true or false)\n- `.trim()` — removes whitespace from both ends\n- `.slice(start, end)` — extracts a portion of the string\n\nCreate a variable called `message` with the value \"  Hello, World!  \" (with spaces on both sides). Then:\n1. Log the trimmed version (no extra spaces)\n2. Log it in all uppercase\n3. Log whether it includes the word \"World\"",
        docLinks: [
          {
            label: "String.prototype.toUpperCase()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase",
            type: "js-method",
          },
          {
            label: "String.prototype.includes()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes",
            type: "js-method",
          },
          {
            label: "String.prototype.trim()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim",
            type: "js-method",
          },
          {
            label: "String.prototype.slice()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "String methods don't change the original string — they return a new one. If you write `message.toUpperCase()`, the variable `message` still holds the original value. You'd need to do `message = message.toUpperCase()` to actually update it.",
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode:
          "// Create a message with extra spaces on both sides\nlet message = \"  Hello, World!  \";\n\n// 1. Log the trimmed version\n\n// 2. Log it in all uppercase\n\n// 3. Log whether it includes \"World\"\n",
        expectedOutput: ["Hello, World!", "  HELLO, WORLD!  ", "true"],
      },
      validation: {
        type: "contains-js",
        criteria: {
          keywords: ["trim", "toUpperCase", "includes"],
        },
      },
      hints: [
        "Use message.trim() to remove the extra spaces.",
        "Use message.toUpperCase() for all caps.",
        "Use message.includes(\"World\") to check — note the capital W!",
        "Remember to wrap each in console.log().",
      ],
    },
  ],
};
