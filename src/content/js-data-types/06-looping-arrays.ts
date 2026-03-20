import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-data-types-looping-arrays",
  slug: "looping-arrays",
  title: "Looping Through Arrays",
  description:
    "Learn how to do something to every item in an array using for loops, .forEach(), and .map().",
  order: 6,
  steps: [
    {
      id: "why-loops",
      type: "explanation",
      instruction: {
        heading: "Why we need loops",
        body: "Imagine you have an array of 100 student names and you need to print each one. You could write 100 `console.log()` statements — but that's absurd. What if the list grows to 1,000? Or what if you don't know the length in advance?\n\nLoops solve this: they let you run the same code once for every item in an array, automatically. You write the action once, and the loop repeats it for each element. This is one of the most powerful ideas in programming — doing repetitive work without repetitive code.\n\nEvery web app uses loops constantly: rendering a list of search results, displaying chat messages, iterating through shopping cart items, processing form data.",
        analogy:
          "Looping is like a mail carrier walking down a street — they stop at each house (array item), do their job (deliver mail), then move to the next one. They don't need separate instructions for each house; the same routine repeats at every stop.",
        docLinks: [
          {
            label: "Loops and iteration",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "let students = [\"Alice\", \"Bob\", \"Charlie\", \"Diana\"];\n\n// Without a loop: repetitive and brittle\nconsole.log(students[0]);\nconsole.log(students[1]);\nconsole.log(students[2]);\nconsole.log(students[3]);\n// What if we add a 5th student? We'd miss them!",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "for-loop",
      type: "explanation",
      instruction: {
        heading: "The classic for loop",
        body: "The `for` loop is the traditional way to iterate over an array. It has three parts inside the parentheses, separated by semicolons:\n\n1. **Initialization**: `let i = 0` — create a counter variable starting at 0 (the first index)\n2. **Condition**: `i < array.length` — keep going as long as this is true\n3. **Update**: `i++` — after each iteration, increase the counter by 1\n\nInside the loop body (the curly braces), `i` is the current index, so `array[i]` gives you the current item. The loop runs once for each index: 0, 1, 2, ... until `i` reaches the array's length.\n\nThe `for` loop gives you full control — you can skip items, loop backward, or step by 2. But for simply visiting every item, JavaScript offers simpler alternatives.",
        docLinks: [
          {
            label: "for statement",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Use `i < array.length` (less than), NOT `i <= array.length` (less than or equal). Since indexes start at 0, an array of 4 items has indexes 0, 1, 2, 3. Using `<=` would try to access index 4, which doesn't exist and gives `undefined`.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "let students = [\"Alice\", \"Bob\", \"Charlie\", \"Diana\"];\n\nfor (let i = 0; i < students.length; i++) {\n  console.log(`Student ${i + 1}: ${students[i]}`);\n}\n// Student 1: Alice\n// Student 2: Bob\n// Student 3: Charlie\n// Student 4: Diana",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "foreach-method",
      type: "explanation",
      instruction: {
        heading: ".forEach() — the cleaner way",
        body: "If you just need to do something with each item and don't need the index counter, `.forEach()` is simpler. You call it on an array and pass it a function that receives each item one at a time.\n\nThe function you pass to `.forEach()` is called a callback — it's code that gets \"called back\" for every item in the array. The callback receives up to two arguments: the current item and its index (the index is optional — include it only if you need it).\n\n`.forEach()` does the same thing as a `for` loop but with less boilerplate — no counter variable, no condition, no increment. It's more readable when your intent is simply \"do this for each item.\"",
        docLinks: [
          {
            label: "Array.prototype.forEach()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The arrow function syntax `(item) => { ... }` was introduced in ES6. It's a shorter way to write functions. You'll see it everywhere in modern JavaScript. For now, just know that `(item) => { console.log(item); }` means \"a function that takes an item and logs it.\"",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "let fruits = [\"apple\", \"banana\", \"cherry\"];\n\n// forEach with just the item\nfruits.forEach((fruit) => {\n  console.log(fruit);\n});\n\n// forEach with item AND index\nfruits.forEach((fruit, index) => {\n  console.log(`${index}: ${fruit}`);\n});\n// 0: apple\n// 1: banana\n// 2: cherry",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "map-method",
      type: "explanation",
      instruction: {
        heading: ".map() — transform every item",
        body: "`.map()` is like `.forEach()` with a superpower: it creates a brand new array by transforming each item. Whatever your callback function returns becomes the corresponding item in the new array.\n\nThis is incredibly useful: turn an array of prices into an array of prices with tax, turn an array of names into an array of greetings, turn an array of numbers into an array of doubled numbers. The original array stays unchanged — `.map()` always produces a fresh copy.\n\nThe key difference: `.forEach()` does something for each item (like logging), while `.map()` creates a new array from each item. If you need a transformed list, use `.map()`. If you just need to perform actions, use `.forEach()`.",
        docLinks: [
          {
            label: "Array.prototype.map()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "A common mistake is using `.map()` when you don't need the new array — like using `.map()` just to log each item. Use `.forEach()` for side effects (logging, updating the DOM) and `.map()` when you need a new, transformed array.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "let prices = [10, 20, 30, 40];\n\n// Double every price\nlet doubled = prices.map((price) => {\n  return price * 2;\n});\nconsole.log(doubled); // [20, 40, 60, 80]\n\n// Original is unchanged\nconsole.log(prices);  // [10, 20, 30, 40]\n\n// Turn names into greetings\nlet names = [\"Alice\", \"Bob\"];\nlet greetings = names.map((name) => {\n  return `Hello, ${name}!`;\n});\nconsole.log(greetings); // [\"Hello, Alice!\", \"Hello, Bob!\"]",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "gap-fill-for-loop",
      type: "gap-fill",
      instruction: {
        heading: "Practice: complete a for loop",
        body: "Fill in the missing parts of this for loop to print every color in the array. Remember the three parts: start at index 0, continue while the index is less than the array length, and increment the counter after each pass.",
      },
      config: {
        type: "gap-fill",
        template:
          "let colors = [\"red\", \"green\", \"blue\", \"yellow\"];\n\nfor (let i = {{start}}; i < colors.{{prop}}; i++) {\n  console.log(colors[i]);\n}",
        gaps: [
          {
            id: "start",
            placeholder: "start value",
            acceptedAnswers: ["0"],
            caseSensitive: false,
          },
          {
            id: "prop",
            placeholder: "property",
            acceptedAnswers: ["length"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["start", "prop"],
        },
      },
      hints: [
        "Array indexes start at what number?",
        "What property gives you the number of items in an array?",
      ],
    },
    {
      id: "js-console-map",
      type: "js-console",
      instruction: {
        heading: "Your turn: transform an array with .map()",
        body: "You have an array of test scores. Use `.map()` to create a new array where each score has 5 bonus points added. Then log both the original and the new array.\n\nRemember: `.map()` returns a new array — the original stays the same.",
      },
      config: {
        type: "js-console",
        starterCode:
          "let scores = [78, 85, 92, 67, 88];\n\n// Use .map() to add 5 bonus points to each score\nlet boosted = scores.map((score) => {\n  // return the boosted score here\n});\n\nconsole.log(scores);  // original: [78, 85, 92, 67, 88]\nconsole.log(boosted); // boosted: should be [83, 90, 97, 72, 93]\n",
        expectedOutput: ["78,85,92,67,88", "83,90,97,72,93"],
      },
      validation: {
        type: "contains-js",
        criteria: {
          keywords: ["map", "return", "console.log"],
        },
      },
      hints: [
        "Inside the .map() callback, return score + 5.",
        "Make sure to use the `return` keyword — without it, .map() gives you undefined for every item.",
        "Log both `scores` and `boosted` to see the difference.",
      ],
    },
  ],
};
