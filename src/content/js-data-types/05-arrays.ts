import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-data-types-arrays",
  slug: "arrays",
  title: "Arrays: Ordered Lists",
  description:
    "Learn how to store multiple values in a single variable using arrays — JavaScript's ordered, numbered lists.",
  order: 5,
  steps: [
    {
      id: "what-are-arrays",
      type: "explanation",
      instruction: {
        heading: "One variable, many values",
        body: "So far, each variable has held a single value — one name, one score, one boolean. But what if you need to store a list of things? A playlist of songs, a class roster of student names, a shopping cart of items? You could create separate variables (`song1`, `song2`, `song3`...), but that quickly becomes unmanageable.\n\nArrays solve this problem. An array is an ordered list of values stored in a single variable. You create one with square brackets `[]`, placing values inside separated by commas. Arrays can hold any type of data — strings, numbers, booleans, even other arrays.",
        analogy:
          "An array is like a row of numbered mailboxes in an apartment lobby — each box has a number (starting from 0), and you can put something in, take something out, or check what's there. The mailboxes stay in order, and you refer to each one by its number.",
        docLinks: [
          {
            label: "Array",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "JavaScript arrays are actually a special type of object. Unlike arrays in some other languages, JavaScript arrays can hold mixed types (strings and numbers together), grow and shrink dynamically, and have no fixed size. They are one of the most commonly used data structures in all of programming.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "// An array of strings\nlet fruits = [\"apple\", \"banana\", \"cherry\"];\nconsole.log(fruits);\n\n// An array of numbers\nlet scores = [95, 87, 72, 100];\nconsole.log(scores);\n\n// An empty array (we'll add items later)\nlet shoppingCart = [];\nconsole.log(shoppingCart);",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "accessing-by-index",
      type: "explanation",
      instruction: {
        heading: "Accessing items by index",
        body: "Every item in an array has a position number called an index. The crucial detail: indexes start at 0, not 1. The first item is at index 0, the second at index 1, and so on.\n\nYou access an item using bracket notation: `fruits[0]` gives you the first item, `fruits[1]` the second. You can also change an item by assigning to its index: `fruits[1] = \"blueberry\"` replaces the second item.\n\nThe `.length` property tells you how many items are in the array. Since indexes start at 0, the last item is always at index `length - 1`. Accessing an index that doesn't exist returns `undefined` — no error, just nothing.",
        docLinks: [
          {
            label: "Array — accessing items",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#accessing_array_elements",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "The most common beginner mistake with arrays is forgetting that indexes start at 0. If an array has 3 items, the valid indexes are 0, 1, and 2 — NOT 1, 2, and 3. Using index 3 on a 3-item array gives you `undefined`, not the last item.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "let colors = [\"red\", \"green\", \"blue\"];\n\nconsole.log(colors[0]);      // \"red\" (first item)\nconsole.log(colors[1]);      // \"green\" (second item)\nconsole.log(colors[2]);      // \"blue\" (third/last item)\nconsole.log(colors[3]);      // undefined (nothing here)\nconsole.log(colors.length);  // 3\n\n// Change an item\ncolors[1] = \"yellow\";\nconsole.log(colors);         // [\"red\", \"yellow\", \"blue\"]",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "push-pop-methods",
      type: "explanation",
      instruction: {
        heading: "Adding and removing items",
        body: "Arrays would be pretty limited if you could only work with the items you started with. JavaScript provides methods to grow and shrink arrays:\n\n- `.push(item)` — adds an item to the end of the array. Like joining the back of a line.\n- `.pop()` — removes and returns the last item. Like the last person leaving the line.\n- `.unshift(item)` — adds an item to the beginning. Like cutting to the front of the line.\n- `.shift()` — removes and returns the first item.\n\n`.push()` and `.pop()` are by far the most commonly used. You'll use `.push()` constantly — adding items to a shopping cart, logging messages, building up results from a loop.",
        docLinks: [
          {
            label: "Array.prototype.push()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push",
            type: "js-method",
          },
          {
            label: "Array.prototype.pop()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "let tasks = [\"wake up\", \"eat breakfast\"];\nconsole.log(tasks); // [\"wake up\", \"eat breakfast\"]\n\n// Add to the end\ntasks.push(\"go to school\");\nconsole.log(tasks); // [\"wake up\", \"eat breakfast\", \"go to school\"]\n\n// Remove from the end\nlet removed = tasks.pop();\nconsole.log(removed); // \"go to school\"\nconsole.log(tasks);   // [\"wake up\", \"eat breakfast\"]\n\n// Array length updates automatically\nconsole.log(tasks.length); // 2",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "gap-fill-arrays",
      type: "gap-fill",
      instruction: {
        heading: "Practice: array access and methods",
        body: "You have an array of favorite movies. Access the first movie by its index, then add a new movie to the end of the list using the right method.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Remember: the first item in an array is at index 0, not index 1. This zero-based indexing is a core concept in programming.",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template:
          "let movies = [\"Toy Story\", \"Finding Nemo\", \"Up\"];\n\n// Access the first movie\nlet firstMovie = movies[{{index}}];\nconsole.log(firstMovie); // \"Toy Story\"\n\n// Add a new movie to the end\nmovies.{{method}}(\"Coco\");\nconsole.log(movies.length); // 4",
        gaps: [
          {
            id: "index",
            placeholder: "number",
            acceptedAnswers: ["0"],
            caseSensitive: false,
          },
          {
            id: "method",
            placeholder: "method",
            acceptedAnswers: ["push"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["index", "method"],
        },
      },
      hints: [
        "What index number does the first item in an array have?",
        "Which array method adds an item to the end?",
      ],
    },
    {
      id: "js-console-build-array",
      type: "js-console",
      instruction: {
        heading: "Your turn: build and manipulate an array",
        body: "Create an array called `playlist` with 3 of your favorite song names (as strings). Then:\n1. Log the array\n2. Log the length of the array\n3. Add a fourth song using `.push()`\n4. Log the updated array\n5. Remove the last song using `.pop()` and log what was removed",
        docLinks: [
          {
            label: "Array.prototype.push()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push",
            type: "js-method",
          },
          {
            label: "Array.prototype.pop()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Arrays in JavaScript are reference types. When you assign an array to a new variable, both variables point to the same array in memory. Changing one changes the other: `let a = [1, 2]; let b = a; b.push(3);` — now `a` is also `[1, 2, 3]`. We'll learn how to avoid this with the spread operator soon.",
          },
        ],
      },
      config: {
        type: "js-console",
        starterCode:
          "// Create an array of 3 songs\nlet playlist = [];\n\n// 1. Log the array\n\n// 2. Log the length\n\n// 3. Add a fourth song with .push()\n\n// 4. Log the updated array\n\n// 5. Remove the last song with .pop() and log it\n",
      },
      validation: {
        type: "contains-js",
        criteria: {
          keywords: ["playlist", "push", "pop", "console.log"],
        },
      },
      hints: [
        "Start by putting 3 song names in the array: let playlist = [\"Song A\", \"Song B\", \"Song C\"];",
        "Use playlist.push(\"New Song\") to add one.",
        "Use let removed = playlist.pop(); then console.log(removed);",
      ],
    },
  ],
};
