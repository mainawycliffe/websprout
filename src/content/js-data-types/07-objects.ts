import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-data-types-objects",
  slug: "objects",
  title: "Objects: Named Properties",
  description:
    "Learn how to group related data together using objects — JavaScript's key-value data structure.",
  order: 7,
  steps: [
    {
      id: "what-are-objects",
      type: "explanation",
      instruction: {
        heading: "Data with labels, not numbers",
        body: "Arrays are great for ordered lists, but sometimes position numbers don't make sense. If you're storing information about a person — their name, age, and email — would you remember that index 0 is the name, index 1 is the age, and index 2 is the email? That's fragile and confusing.\n\nObjects solve this by letting you label each piece of data with a descriptive name. Instead of positions (0, 1, 2), you use keys (name, age, email). Each key is paired with a value, forming a key-value pair. Together, the pairs describe a single thing — a person, a product, a song, a tweet.\n\nObjects are everywhere in web development. API responses from servers, user profiles, configuration settings, and event data are all typically objects.",
        analogy:
          "An object is like a contact card — instead of numbered slots like arrays, each piece of data has a label: name, phone, email. You don't ask for 'the first field' — you ask for 'the phone number.' The labels make the data self-describing.",
        docLinks: [
          {
            label: "Object",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object",
            type: "js-concept",
          },
          {
            label: "Working with objects",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Nearly everything in JavaScript is an object or behaves like one. Arrays are objects. Functions are objects. Even strings have object-like behavior (which is why they have methods like `.toUpperCase()`). Understanding objects is understanding the core of JavaScript.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "// Array: position-based (what does index 2 mean?)\nlet personArray = [\"Alice\", 28, \"alice@email.com\"];\n\n// Object: label-based (clear and self-describing)\nlet person = {\n  name: \"Alice\",\n  age: 28,\n  email: \"alice@email.com\"\n};\n\nconsole.log(person);",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "dot-and-bracket-notation",
      type: "explanation",
      instruction: {
        heading: "Accessing properties: dot vs. bracket",
        body: "There are two ways to read a value from an object:\n\n**Dot notation** is the most common and readable: `person.name` gives you `\"Alice\"`. Use this whenever the key is a simple name you know in advance.\n\n**Bracket notation** uses a string inside brackets: `person[\"name\"]` does the same thing. You need bracket notation when:\n- The key has spaces or special characters: `person[\"favorite color\"]`\n- The key is stored in a variable: `let key = \"name\"; person[key]`\n\nYou can also add new properties or change existing ones using either notation: `person.city = \"Seattle\"` adds a new key-value pair. Deleting a property uses the `delete` keyword: `delete person.city`.",
        docLinks: [
          {
            label: "Property accessors",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Accessing a property that doesn't exist returns `undefined` — it doesn't crash your program. This means a typo like `person.naem` silently gives you `undefined` instead of an error. Double-check your property names!",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "let person = {\n  name: \"Alice\",\n  age: 28,\n  email: \"alice@email.com\"\n};\n\n// Dot notation (most common)\nconsole.log(person.name);   // \"Alice\"\nconsole.log(person.age);    // 28\n\n// Bracket notation (for dynamic keys)\nlet key = \"email\";\nconsole.log(person[key]);   // \"alice@email.com\"\n\n// Add a new property\nperson.city = \"Seattle\";\nconsole.log(person.city);   // \"Seattle\"",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "nesting-objects",
      type: "explanation",
      instruction: {
        heading: "Nesting: objects inside objects, arrays of objects",
        body: "Real-world data is rarely flat. A user profile might include an address (which itself has street, city, and zip). A school has students, each with their own properties. JavaScript handles this naturally — objects can contain other objects, and arrays can hold objects.\n\nAn **array of objects** is one of the most common patterns in programming. Think of it as a spreadsheet: each object is a row, and the keys are column headers. A list of products, a feed of social media posts, search results — they're all arrays of objects.\n\nTo access nested data, chain dot notation: `user.address.city`. For arrays of objects, combine index access with dot notation: `students[0].name`.",
        docLinks: [
          {
            label: "Working with objects",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "// Object inside an object\nlet user = {\n  name: \"Bob\",\n  address: {\n    street: \"123 Main St\",\n    city: \"Portland\",\n    zip: \"97201\"\n  }\n};\nconsole.log(user.address.city); // \"Portland\"\n\n// Array of objects\nlet students = [\n  { name: \"Alice\", grade: 92 },\n  { name: \"Bob\", grade: 85 },\n  { name: \"Charlie\", grade: 97 }\n];\nconsole.log(students[0].name);  // \"Alice\"\nconsole.log(students[2].grade); // 97",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "gap-fill-objects",
      type: "gap-fill",
      instruction: {
        heading: "Practice: access object properties",
        body: "You have a book object. Use dot notation to access its title, then use bracket notation to access a property whose key is stored in a variable.",
      },
      config: {
        type: "gap-fill",
        template:
          "let book = {\n  title: \"The Hobbit\",\n  author: \"J.R.R. Tolkien\",\n  pages: 310\n};\n\n// Access the title with dot notation\nconsole.log(book.{{prop1}}); // \"The Hobbit\"\n\n// Access a property using a variable key\nlet key = \"author\";\nconsole.log(book[{{prop2}}]); // \"J.R.R. Tolkien\"",
        gaps: [
          {
            id: "prop1",
            placeholder: "property",
            acceptedAnswers: ["title"],
            caseSensitive: true,
          },
          {
            id: "prop2",
            placeholder: "variable",
            acceptedAnswers: ["key"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["prop1", "prop2"],
        },
      },
      hints: [
        "Which property holds the book's title?",
        "With bracket notation, use the variable name (not a string) — the variable already holds the string \"author\".",
      ],
    },
    {
      id: "js-console-objects",
      type: "js-console",
      instruction: {
        heading: "Your turn: create and explore objects",
        body: "Create an object called `movie` with these properties:\n- `title` (a string — pick your favorite movie)\n- `year` (a number)\n- `rating` (a number out of 10)\n\nThen:\n1. Log the entire object\n2. Log just the title using dot notation\n3. Add a new property `genre` (a string) and log it\n4. Log a sentence using a template literal: \"[title] ([year]) - [rating]/10\"",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "When you log an object with `console.log()`, the browser console shows you an interactive, expandable view of all its properties. This is one of the best ways to inspect data while debugging. In most consoles, you can click the triangle icon to expand nested objects and arrays.",
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode:
          "// Create a movie object with title, year, and rating\nlet movie = {\n  // add properties here\n};\n\n// 1. Log the entire object\n\n// 2. Log just the title\n\n// 3. Add a genre property\n\n// 4. Log a template literal sentence\n",
      },
      validation: {
        type: "contains-js",
        criteria: {
          keywords: ["movie", "title", "console.log"],
        },
      },
      hints: [
        "Fill in the object: let movie = { title: \"Inception\", year: 2010, rating: 9 };",
        "Use movie.title to access the title.",
        "Add a genre: movie.genre = \"Sci-Fi\";",
        "Template literal: console.log(`${movie.title} (${movie.year}) - ${movie.rating}/10`);",
      ],
    },
  ],
};
