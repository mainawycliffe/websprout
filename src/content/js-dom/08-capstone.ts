import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-dom-capstone-faq",
  slug: "capstone-faq",
  title: "Capstone: Interactive FAQ Page",
  description:
    "Put it all together by building a fully interactive FAQ page with expandable answers, a live search filter, and a dark mode toggle.",
  order: 8,
  steps: [
    {
      id: "faq-data",
      type: "explanation",
      instruction: {
        heading: "Step 1: Define your FAQ data",
        body: "Every interactive page starts with data. Instead of hardcoding HTML for each FAQ item, we'll store our questions and answers in a JavaScript array of objects. This is exactly how real websites work — the data comes from a source (a database, an API, or a local array), and JavaScript turns it into HTML.\n\nWe'll use an array where each object has a `question` and `answer` property. Later, we'll loop through this array to create the page.",
      },
      config: {
        type: "explanation",
        demoCode:
          'const faqData = [\n  {\n    question: "What is HTML?",\n    answer: "HTML (HyperText Markup Language) is the standard language for creating web pages. It defines the structure and content of a page using elements like headings, paragraphs, links, and images."\n  },\n  {\n    question: "What is CSS?",\n    answer: "CSS (Cascading Style Sheets) controls how HTML elements look — colors, fonts, spacing, layout, and animations. It separates presentation from structure."\n  },\n  {\n    question: "What is JavaScript?",\n    answer: "JavaScript is a programming language that adds interactivity to web pages. It can respond to user actions, update content dynamically, validate forms, and much more."\n  },\n  {\n    question: "What is the DOM?",\n    answer: "The DOM (Document Object Model) is the browser\'s live representation of an HTML page as a tree of JavaScript objects. JS uses the DOM to read and change the page."\n  },\n  {\n    question: "Do I need to learn all three?",\n    answer: "Yes! HTML provides structure, CSS provides style, and JavaScript provides behavior. Together they form the foundation of every website."\n  }\n];',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "render-faq",
      type: "explanation",
      instruction: {
        heading: "Step 2: Render FAQ items to the page",
        body: "Now we'll loop through the `faqData` array and create HTML elements for each FAQ item. Each item needs:\n- A container `<div>` with a class for styling\n- A `<button>` for the question (clickable to toggle the answer)\n- A `<div>` for the answer (hidden by default)\n\nWe use `document.createElement` and `appendChild` to build the DOM dynamically. The answer div gets a `hidden` class that we'll toggle with JavaScript.",
        docLinks: [
          {
            label: "document.createElement()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'const container = document.querySelector("#faq-container");\n\nfunction renderFAQ(data) {\n  // Clear existing content\n  container.innerHTML = "";\n\n  data.forEach(function (item) {\n    // Create the FAQ item wrapper\n    const faqItem = document.createElement("div");\n    faqItem.classList.add("faq-item");\n\n    // Create the question button\n    const questionBtn = document.createElement("button");\n    questionBtn.classList.add("faq-question");\n    questionBtn.textContent = item.question;\n\n    // Create the answer div (hidden by default)\n    const answerDiv = document.createElement("div");\n    answerDiv.classList.add("faq-answer", "hidden");\n    answerDiv.textContent = item.answer;\n\n    // Assemble: question + answer into wrapper\n    faqItem.appendChild(questionBtn);\n    faqItem.appendChild(answerDiv);\n\n    // Attach to page\n    container.appendChild(faqItem);\n  });\n}\n\n// Initial render\nrenderFAQ(faqData);',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "toggle-answers",
      type: "explanation",
      instruction: {
        heading: "Step 3: Toggle answers with event delegation",
        body: "Now we make it interactive. When a question button is clicked, its answer should toggle between visible and hidden. We use **event delegation** — one listener on the container instead of one per button.\n\nWe check if the clicked element is a question button, then find its sibling answer div with `.nextElementSibling` and toggle the `hidden` class.",
        docLinks: [
          {
            label: "Element.classList.toggle()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle",
            type: "js-method",
          },
          {
            label: "Element.nextElementSibling",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/nextElementSibling",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "We use event delegation here because FAQ items are dynamically created. If we re-render the list (e.g., after filtering), individual listeners would be lost. The parent listener survives because it never gets removed.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// Event delegation: one listener on the container\ncontainer.addEventListener("click", function (event) {\n  // Only respond to question button clicks\n  if (event.target.classList.contains("faq-question")) {\n    // Find the answer div (the next sibling element)\n    const answer = event.target.nextElementSibling;\n\n    // Toggle visibility\n    answer.classList.toggle("hidden");\n\n    // Toggle an "open" class on the button for styling (e.g., rotate arrow)\n    event.target.classList.toggle("open");\n  }\n});\n\n/* CSS you\'d need:\n.hidden { display: none; }\n.faq-question.open::after { transform: rotate(180deg); }\n*/',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "search-filter",
      type: "explanation",
      instruction: {
        heading: "Step 4: Add a live search filter",
        body: "Next, we'll add a search input that filters FAQ items as the user types. The `input` event fires on every keystroke, so results update in real time — just like Google's search suggestions.\n\nThe logic: listen for `input` events on the search field, filter the `faqData` array to only include items whose question or answer contains the search text, then re-render the FAQ list with the filtered data.",
        docLinks: [
          {
            label: "String.prototype.includes()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes",
            type: "js-method",
          },
          {
            label: "Array.prototype.filter()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'const searchInput = document.querySelector("#faq-search");\n\nsearchInput.addEventListener("input", function () {\n  const query = searchInput.value.toLowerCase();\n\n  // Filter FAQ data: keep items where question OR answer contains the query\n  const filtered = faqData.filter(function (item) {\n    const questionMatch = item.question.toLowerCase().includes(query);\n    const answerMatch = item.answer.toLowerCase().includes(query);\n    return questionMatch || answerMatch;\n  });\n\n  // Re-render with filtered data\n  renderFAQ(filtered);\n});\n\n// Why this works:\n// - "input" event fires on every keystroke\n// - .toLowerCase() makes the search case-insensitive\n// - .filter() creates a new array with only matching items\n// - renderFAQ() clears and rebuilds the DOM with the filtered data',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "dark-mode",
      type: "explanation",
      instruction: {
        heading: "Step 5: Add a dark mode toggle",
        body: "Finally, let's add a dark mode toggle button. When clicked, it adds or removes a `dark` class on the `<body>` element. All dark mode styles are defined in CSS — JavaScript just flips the switch.\n\nThis is the power of `classList.toggle` combined with well-organized CSS. One line of JavaScript can transform the entire page appearance because all the visual rules live in CSS where they belong.\n\nCongratulations! You've built a complete interactive page that combines: data-driven rendering, event delegation, DOM manipulation, live filtering, and class toggling.",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Many sites also use `@media (prefers-color-scheme: dark)` in CSS to respect the user's OS-level dark mode preference. You can detect this in JS with `window.matchMedia('(prefers-color-scheme: dark)').matches` to set the initial state.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'const themeToggle = document.querySelector("#theme-toggle");\n\nthemeToggle.addEventListener("click", function () {\n  // Toggle dark class on the body\n  document.body.classList.toggle("dark");\n\n  // Update button text\n  const isDark = document.body.classList.contains("dark");\n  themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";\n});\n\n/* CSS for dark mode:\nbody {\n  background: #ffffff;\n  color: #1a1a1a;\n  transition: background 0.3s, color 0.3s;\n}\nbody.dark {\n  background: #1a1a1a;\n  color: #f0f0f0;\n}\nbody.dark .faq-item {\n  background: #2a2a2a;\n  border-color: #444;\n}\n*/\n\n// COMPLETE FAQ PAGE — all concepts combined:\n// 1. Data stored in a JS array of objects\n// 2. DOM elements created with createElement + appendChild\n// 3. Event delegation for toggle functionality\n// 4. Live search with input event + filter + re-render\n// 5. Dark mode with classList.toggle on body',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
