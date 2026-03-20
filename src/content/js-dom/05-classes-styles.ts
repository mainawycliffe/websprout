import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-dom-classes-styles",
  slug: "classes-styles",
  title: "Adding & Removing Classes",
  description:
    "Learn how to change an element's appearance by toggling CSS classes with JavaScript — the clean, maintainable way to handle dynamic styles.",
  order: 5,
  steps: [
    {
      id: "classlist-basics",
      type: "explanation",
      instruction: {
        heading: "classList: your CSS wardrobe",
        body: "Every element has a `.classList` property that lets you add, remove, and toggle CSS classes. This is the primary way JavaScript controls visual changes on a page.\n\n- `element.classList.add('active')` — adds the class\n- `element.classList.remove('active')` — removes the class\n- `element.classList.toggle('active')` — adds it if missing, removes it if present\n- `element.classList.contains('active')` — returns `true` or `false`\n\nWhen YouTube highlights the current video tab, that's `classList.add('active')`. When you close a dropdown menu, that's `classList.remove('open')`. When you click a dark mode toggle, that's `classList.toggle('dark')`.",
        analogy:
          "classList is like a wardrobe system. Instead of sewing new clothes onto a person (writing inline styles), you have pre-made outfits (CSS classes) hanging in the closet that you can swap on and off. It's faster, cleaner, and you can reuse outfits across multiple people (elements).",
        docLinks: [
          {
            label: "Element.classList",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/classList",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'const button = document.querySelector("#menu-toggle");\nconst nav = document.querySelector(".sidebar");\n\n// Add a class\nnav.classList.add("open");\n\n// Remove a class\nnav.classList.remove("open");\n\n// Toggle: add if missing, remove if present\nbutton.addEventListener("click", function () {\n  nav.classList.toggle("open");\n});\n\n// Check if a class exists\nif (nav.classList.contains("open")) {\n  console.log("Sidebar is visible");\n}\n\n// Add multiple classes at once\nnav.classList.add("open", "animated", "slide-in");',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "why-classlist-over-style",
      type: "explanation",
      instruction: {
        heading: "Why classList beats inline styles",
        body: "You could change styles directly with `element.style.color = 'red'`, but this is almost always the wrong approach. Here's why:\n\n**Separation of concerns** — CSS belongs in CSS files, not scattered throughout your JavaScript. If a designer wants to change the 'active' color from blue to green, they change one CSS rule. With inline styles, they'd have to hunt through your JS code.\n\n**Reusability** — A CSS class like `.hidden { display: none; }` can be toggled on any element. Inline styles must be repeated for each element.\n\n**Specificity** — Inline styles override almost everything in CSS, making them hard to override later.\n\n**Performance** — The browser is optimized for class changes. Toggling one class that sets 10 properties is faster than setting 10 individual `.style` properties.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Keep styles in CSS classes and toggle them with JS — this is easier to maintain than writing styles directly in JavaScript. The only time `.style` is justified is for truly dynamic values that can't be predetermined in CSS, like positioning based on mouse coordinates or setting a width from a calculation.",
          },
        ],
        docLinks: [
          {
            label: "HTMLElement.style",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '/* CSS — define the styles once */\n.hidden { display: none; }\n.active { background: #3b82f6; color: white; }\n.error  { border: 2px solid red; }\n\n// JS — toggle classes, don\'t write styles\nconst panel = document.querySelector(".panel");\npanel.classList.toggle("hidden");  // Clean!\n\n// AVOID this (harder to maintain):\npanel.style.display = "none";      // Messy!\npanel.style.display = "";          // Undo? Confusing!',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "style-property",
      type: "explanation",
      instruction: {
        heading: "The .style property: for dynamic values",
        body: "Sometimes you genuinely need inline styles — when the value is computed at runtime and can't be set in CSS ahead of time. The `.style` property lets you read and write individual CSS properties.\n\nCSS property names with hyphens become camelCase in JavaScript: `background-color` becomes `backgroundColor`, `font-size` becomes `fontSize`, `z-index` becomes `zIndex`.\n\nA common real-world use: progress bars where the width comes from a calculation, color pickers where the background changes to a user-chosen color, or drag-and-drop where position comes from mouse coordinates.",
        docLinks: [
          {
            label: "CSSStyleDeclaration",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// Setting dynamic values that CSS can\'t predetermine\nconst bar = document.querySelector(".progress-bar");\nconst percent = 73; // from a calculation\nbar.style.width = percent + "%";\n\n// Color picker preview\nconst preview = document.querySelector(".preview");\npreview.style.backgroundColor = "#ff6600";\n\n// CSS properties with hyphens → camelCase in JS\nelement.style.fontSize = "20px";      // font-size\nelement.style.marginTop = "16px";     // margin-top\nelement.style.borderRadius = "8px";   // border-radius\n\n// Reading a style (only reads inline styles, not CSS file styles)\nconsole.log(element.style.fontSize); // "20px"\n\n// To read computed styles (including CSS file styles):\nconst computed = getComputedStyle(element);\nconsole.log(computed.fontSize); // actual rendered size',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "gap-fill-classes",
      type: "gap-fill",
      instruction: {
        heading: "Practice: toggle classes",
        body: "Complete the code to show/hide a dropdown menu and highlight the active tab.",
      },
      config: {
        type: "gap-fill",
        template:
          '// Toggle the dropdown visibility on click\nconst dropdown = document.querySelector(".dropdown");\ndropdown.classList.{{toggleMethod}}("open");\n\n// Add the "active" class to the clicked tab\nconst tab = document.querySelector(".tab");\ntab.classList.{{addMethod}}("active");\n\n// Check if the menu is currently visible\nif (dropdown.classList.{{checkMethod}}("open")) {\n  console.log("Menu is open!");\n}',
        gaps: [
          {
            id: "toggleMethod",
            placeholder: "method",
            acceptedAnswers: ["toggle"],
            caseSensitive: true,
          },
          {
            id: "addMethod",
            placeholder: "method",
            acceptedAnswers: ["add"],
            caseSensitive: true,
          },
          {
            id: "checkMethod",
            placeholder: "method",
            acceptedAnswers: ["contains"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["toggleMethod", "addMethod", "checkMethod"],
        },
      },
      hints: [
        "To flip a class on and off with one call, you use a method that rhymes with 'boggle'.",
        "To put a new class on an element, you 'add' it.",
        "To check if a class is already there, you ask if the classList 'contains' it.",
      ],
    },
  ],
};
