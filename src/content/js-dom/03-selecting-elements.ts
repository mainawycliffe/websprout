import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-dom-selecting-elements",
  slug: "selecting-elements",
  title: "Selecting Elements",
  description:
    "Meet the DOM — the browser's live representation of your HTML — and learn how to reach in and grab any element with JavaScript.",
  order: 3,
  steps: [
    {
      id: "what-is-dom",
      type: "explanation",
      instruction: {
        heading: "The DOM: your HTML comes alive",
        body: "When the browser loads an HTML file, it doesn't just display the text — it builds a live data structure called the **Document Object Model (DOM)**. The DOM is a tree of JavaScript objects, one for each HTML element. Every `<div>`, `<p>`, `<button>`, and `<img>` becomes a node in this tree.\n\nThe DOM is live — if you change it with JavaScript, the page updates instantly. This is the foundation of every interactive website. The `document` object is your entry point — it represents the entire page and gives you methods to find and manipulate elements.",
        analogy:
          "The DOM is like a family tree of your HTML. The `<html>` element is the grandparent at the top. `<head>` and `<body>` are its children. Every nested element is a child of its parent. `querySelector` is like pointing at a specific person in the tree and saying 'I want to talk to you.'",
        docLinks: [
          {
            label: "Introduction to the DOM",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction",
            type: "js-concept",
          },
          {
            label: "document object",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Document",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The DOM is a W3C standard that defines the structure of HTML and XML documents as a tree of objects. Every browser implements the same DOM API, so `document.querySelector()` works identically in Chrome, Firefox, Safari, and Edge.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "<!-- Your HTML -->\n<body>\n  <h1>My Page</h1>\n  <p class=\"intro\">Welcome!</p>\n</body>\n\n<!-- The browser builds this DOM tree: -->\n<!--\n  document\n    └── html\n        ├── head\n        └── body\n            ├── h1 → \"My Page\"\n            └── p.intro → \"Welcome!\"\n-->",
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "query-selector",
      type: "explanation",
      instruction: {
        heading: "querySelector: find one element",
        body: "`document.querySelector()` is the most versatile way to find an element. You pass it a CSS selector — the same selectors you used in CSS — and it returns the first matching element. If no element matches, it returns `null`.\n\nYou can use any CSS selector: tag names (`'p'`), classes (`'.intro'`), IDs (`'#header'`), attribute selectors (`'[type=\"email\"]'`), combinators (`'.card > h2'`), and more. If you know CSS selectors, you already know how to use `querySelector`.",
        docLinks: [
          {
            label: "document.querySelector()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Always check if `querySelector` returned `null` before using the result. If the element doesn't exist (typo in selector, element not loaded yet), calling methods on `null` will crash your code with: `TypeError: Cannot read properties of null`.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// Find by tag name\nconst heading = document.querySelector("h1");\n\n// Find by class\nconst intro = document.querySelector(".intro");\n\n// Find by ID\nconst header = document.querySelector("#header");\n\n// Find by attribute\nconst emailInput = document.querySelector(\'[type="email"]\');\n\n// Find by combinator\nconst cardTitle = document.querySelector(".card > h2");\n\n// Always returns the FIRST match\nconst firstParagraph = document.querySelector("p");',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "query-selector-all",
      type: "explanation",
      instruction: {
        heading: "querySelectorAll: find all matching elements",
        body: "`document.querySelectorAll()` works just like `querySelector`, but returns **all** matching elements as a NodeList (similar to an array). You can loop over a NodeList with `forEach` or a `for...of` loop.\n\nThis is essential when you need to do something to every element of a kind — like adding a click handler to every button, or highlighting all paragraphs with a certain class.",
        docLinks: [
          {
            label: "document.querySelectorAll()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "A NodeList looks like an array but isn't one. It has `forEach` and `length`, but not `map` or `filter`. To use array methods, convert it first: `Array.from(nodeList)` or `[...nodeList]`.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// Get all paragraphs\nconst allParagraphs = document.querySelectorAll("p");\nconsole.log(allParagraphs.length); // number of <p> elements\n\n// Loop with forEach\nallParagraphs.forEach(function (p) {\n  console.log(p.textContent);\n});\n\n// Loop with for...of\nfor (const p of allParagraphs) {\n  p.style.color = "blue";\n}\n\n// Convert to array for map/filter\nconst texts = Array.from(allParagraphs).map(p => p.textContent);',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "get-element-by-id",
      type: "explanation",
      instruction: {
        heading: "getElementById: the classic approach",
        body: "Before `querySelector` existed, developers used `document.getElementById()`. It finds a single element by its `id` attribute — without the `#` symbol. You'll see this in older code, tutorials, and Stack Overflow answers everywhere, so it's important to recognize.\n\n`getElementById` is slightly faster than `querySelector` for ID lookups, but the difference is negligible. Most modern code uses `querySelector` for consistency since it handles all selector types.",
        docLinks: [
          {
            label: "document.getElementById()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- HTML -->\n<!-- <div id="main-content">Hello</div> -->\n\n// These two do the same thing:\nconst el1 = document.getElementById("main-content");\nconst el2 = document.querySelector("#main-content");\n\n// getElementById does NOT use the # symbol\n// querySelector DOES use the # symbol\n\n// Other older methods you may encounter:\n// document.getElementsByClassName("intro")  → live HTMLCollection\n// document.getElementsByTagName("p")        → live HTMLCollection',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "gap-fill-selectors",
      type: "gap-fill",
      instruction: {
        heading: "Practice: select elements",
        body: "Fill in the correct method names and selectors to grab elements from the page.",
      },
      config: {
        type: "gap-fill",
        template:
          '// Select the first element with class "card"\nconst card = document.{{method1}}(".card");\n\n// Select ALL <li> elements on the page\nconst items = document.{{method2}}("li");\n\n// Select the element with id "title"\nconst title = document.{{method3}}("title");',
        gaps: [
          {
            id: "method1",
            placeholder: "method name",
            acceptedAnswers: ["querySelector"],
            caseSensitive: true,
          },
          {
            id: "method2",
            placeholder: "method name",
            acceptedAnswers: ["querySelectorAll"],
            caseSensitive: true,
          },
          {
            id: "method3",
            placeholder: "method name",
            acceptedAnswers: ["getElementById"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["method1", "method2", "method3"],
        },
      },
      hints: [
        "To find the first matching element, use the method that takes any CSS selector.",
        "To find ALL matching elements, use the 'All' version of that method.",
        "The classic method for finding by ID doesn't use the # symbol — notice the selector is just 'title', not '#title'.",
      ],
    },
  ],
};
