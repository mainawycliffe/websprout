import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-data-types-destructuring",
  slug: "destructuring",
  title: "Destructuring",
  description:
    "Learn the shorthand syntax for unpacking values from arrays and objects into individual variables.",
  order: 8,
  steps: [
    {
      id: "why-destructuring",
      type: "explanation",
      instruction: {
        heading: "Unpacking values without the repetition",
        body: "Imagine you have a user object and you need to use the name, age, and email in several places. Without destructuring, you'd write:\n\n```\nlet name = user.name;\nlet age = user.age;\nlet email = user.email;\n```\n\nThat's a lot of repetition — the word `user` appears in every line. Destructuring is a shorthand that lets you unpack values from objects (or arrays) into variables in a single, clean statement. It doesn't add new functionality — everything you can do with destructuring, you could do the long way. But it makes your code significantly shorter and easier to read.\n\nDestructuring was introduced in ES6 (2015) and is now used everywhere in modern JavaScript. You'll see it in function parameters, import statements, and virtually every codebase.",
        analogy:
          "Destructuring is like opening a gift box and immediately putting each item where it belongs — instead of reaching into the box every time you need something. You unpack once, and everything has its own named spot.",
        docLinks: [
          {
            label: "Destructuring assignment",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "let user = { name: \"Alice\", age: 28, email: \"alice@email.com\" };\n\n// Without destructuring (repetitive)\nlet name1 = user.name;\nlet age1 = user.age;\nconsole.log(name1, age1); // \"Alice\" 28\n\n// With destructuring (clean!)\nlet { name, age, email } = user;\nconsole.log(name, age, email); // \"Alice\" 28 \"alice@email.com\"",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "object-destructuring",
      type: "explanation",
      instruction: {
        heading: "Object destructuring in detail",
        body: "To destructure an object, use curly braces `{}` on the left side of the `=` sign. The variable names inside the braces must match the property names in the object.\n\nYou can:\n- **Pick only what you need**: `let { name } = user;` — ignores age and email\n- **Rename variables**: `let { name: fullName } = user;` — creates a variable called `fullName` with the value of `user.name`\n- **Set defaults**: `let { name, role = \"guest\" } = user;` — if `user.role` doesn't exist, `role` gets the value `\"guest\"`\n\nThe order of properties doesn't matter — JavaScript matches by name, not position.",
        docLinks: [
          {
            label: "Object destructuring",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#object_destructuring",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "A common mistake is trying to destructure a property that doesn't exist in the object. It won't throw an error — the variable just gets `undefined`. Use default values to protect against this: `let { nickname = \"Anonymous\" } = user;`",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "let product = {\n  name: \"Laptop\",\n  price: 999,\n  brand: \"TechCo\"\n};\n\n// Pick only what you need\nlet { name, price } = product;\nconsole.log(name);    // \"Laptop\"\nconsole.log(price);   // 999\n\n// Rename while destructuring\nlet { name: productName, brand: maker } = product;\nconsole.log(productName); // \"Laptop\"\nconsole.log(maker);       // \"TechCo\"\n\n// Default values\nlet { name: n, stock = 0 } = product;\nconsole.log(stock); // 0 (doesn't exist in product)",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "array-destructuring",
      type: "explanation",
      instruction: {
        heading: "Array destructuring",
        body: "Array destructuring works similarly but uses square brackets `[]` instead of curly braces. Since arrays are ordered, variables are assigned by position — the first variable gets the first item, the second gets the second, and so on.\n\nYou can:\n- **Skip items** with empty commas: `let [first, , third] = colors;` — skips the second item\n- **Use rest syntax** to collect remaining items: `let [first, ...rest] = colors;` — `rest` becomes an array of everything after the first item\n- **Swap variables** without a temporary variable: `[a, b] = [b, a];`\n\nArray destructuring is especially useful when a function returns multiple values as an array.",
        docLinks: [
          {
            label: "Array destructuring",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#array_destructuring",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The rest syntax (`...rest`) collects the remaining items into a new array. It must always come last in the destructuring pattern. This syntax also works with objects: `let { name, ...otherProps } = user;` puts everything except `name` into `otherProps`.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "let colors = [\"red\", \"green\", \"blue\", \"yellow\"];\n\n// Basic array destructuring\nlet [first, second] = colors;\nconsole.log(first);  // \"red\"\nconsole.log(second); // \"green\"\n\n// Skip items with empty commas\nlet [, , third] = colors;\nconsole.log(third);  // \"blue\"\n\n// Rest syntax: collect the remainder\nlet [primary, ...others] = colors;\nconsole.log(primary); // \"red\"\nconsole.log(others);  // [\"green\", \"blue\", \"yellow\"]\n\n// Swap two variables\nlet a = 1;\nlet b = 2;\n[a, b] = [b, a];\nconsole.log(a, b);   // 2 1",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "gap-fill-destructuring",
      type: "gap-fill",
      instruction: {
        heading: "Practice: destructuring syntax",
        body: "Use object destructuring to extract the `title` and `author` from the book object in a single line. Remember: the variable names inside the curly braces must match the property names.",
      },
      config: {
        type: "gap-fill",
        template:
          "let book = {\n  title: \"Dune\",\n  author: \"Frank Herbert\",\n  year: 1965\n};\n\n// Destructure title and author\nlet {{open}} title, author {{close}} = book;\n\nconsole.log(title);  // \"Dune\"\nconsole.log(author); // \"Frank Herbert\"",
        gaps: [
          {
            id: "open",
            placeholder: "bracket",
            acceptedAnswers: ["{"],
            caseSensitive: true,
          },
          {
            id: "close",
            placeholder: "bracket",
            acceptedAnswers: ["}"],
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
        "Object destructuring uses curly braces — which bracket opens it?",
        "And which bracket closes it?",
      ],
    },
    {
      id: "js-console-destructuring",
      type: "js-console",
      instruction: {
        heading: "Your turn: practice destructuring",
        body: "Given the `weather` object and `coordinates` array below, use destructuring to:\n1. Extract `city` and `temperature` from the weather object\n2. Extract the first and second values from the coordinates array into variables called `lat` and `lng`\n3. Log all four variables",
      },
      config: {
        type: "js-console",
        starterCode:
          "let weather = {\n  city: \"Tokyo\",\n  temperature: 22,\n  humidity: 65\n};\n\nlet coordinates = [35.6762, 139.6503];\n\n// 1. Destructure city and temperature from weather\n\n// 2. Destructure lat and lng from coordinates\n\n// 3. Log all four values\n",
        expectedOutput: ["Tokyo", "22", "35.6762", "139.6503"],
      },
      validation: {
        type: "contains-js",
        criteria: {
          keywords: ["city", "temperature", "console.log"],
        },
      },
      hints: [
        "Object destructuring: let { city, temperature } = weather;",
        "Array destructuring: let [lat, lng] = coordinates;",
        "Log each variable with console.log().",
      ],
    },
  ],
};
