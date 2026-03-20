import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-dom-event-listeners",
  slug: "event-listeners",
  title: "Event Listeners",
  description:
    "Make your page react to clicks, typing, scrolling, and more — events are how JavaScript knows the user did something.",
  order: 6,
  steps: [
    {
      id: "what-are-events",
      type: "explanation",
      instruction: {
        heading: "Events: the browser is always watching",
        body: "Every time you click, type, scroll, hover, resize the window, or even just move your mouse, the browser creates an **event** — a JavaScript object that describes exactly what happened. Without events, JavaScript would just run once when the page loads and then sit idle forever.\n\nEvents are the heartbeat of interactive websites. When you click 'Like' on Instagram, a `click` event fires. When you type in Google's search bar, an `input` event fires on every keystroke. When you submit a login form, a `submit` event fires. JavaScript listens for these events and runs your code in response.",
        analogy:
          "An event listener is like a doorbell. You install it once (`addEventListener`), and every time someone presses it (triggers the event), your function runs — like answering the door. You can install different doorbells for different actions: one for knocking (click), one for mail delivery (input), one for emergencies (submit).",
        docLinks: [
          {
            label: "Introduction to events",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events",
            type: "js-concept",
          },
          {
            label: "Event reference",
            url: "https://developer.mozilla.org/en-US/docs/Web/Events",
            type: "js-concept",
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
      id: "add-event-listener",
      type: "explanation",
      instruction: {
        heading: "addEventListener: the syntax",
        body: "`addEventListener` takes two arguments:\n1. The **event type** as a string — `'click'`, `'input'`, `'submit'`, etc.\n2. A **callback function** — the code to run when the event fires.\n\nThe callback function is called the **event handler**. It runs every time the event occurs, not just once. You can attach multiple listeners to the same element for different (or even the same) events.",
        docLinks: [
          {
            label: "EventTarget.addEventListener()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Always use `addEventListener` instead of the older `onclick` / `oninput` properties. The property approach only allows one handler per event — if two scripts both set `element.onclick`, the second overwrites the first. `addEventListener` lets you attach unlimited handlers to the same event.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'const button = document.querySelector("#save-btn");\n\n// Basic syntax\nbutton.addEventListener("click", function () {\n  console.log("Button was clicked!");\n});\n\n// With a named function\nfunction handleClick() {\n  console.log("Saved!");\n}\nbutton.addEventListener("click", handleClick);\n\n// Arrow function (shorter syntax)\nbutton.addEventListener("click", () => {\n  console.log("Arrow function handler!");\n});\n\n// Multiple listeners on the same element — both run\nbutton.addEventListener("click", handleClick);\nbutton.addEventListener("click", () => console.log("Also runs!"));',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "common-events",
      type: "explanation",
      instruction: {
        heading: "Common events you'll use all the time",
        body: "Here are the events you'll reach for most often:\n\n**Mouse:** `click` (button press + release), `dblclick`, `mouseenter` (hover in), `mouseleave` (hover out)\n\n**Keyboard:** `keydown` (key pressed), `keyup` (key released)\n\n**Form:** `input` (value changed — fires on every keystroke), `change` (value committed — fires when you leave the field), `submit` (form submitted)\n\n**Window/Document:** `DOMContentLoaded` (HTML fully parsed), `load` (everything loaded including images), `resize`, `scroll`\n\nThe `input` event is especially useful — it fires instantly as the user types, which is how live search suggestions work on Google.",
        docLinks: [
          {
            label: "click event",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event",
            type: "js-concept",
          },
          {
            label: "input event",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event",
            type: "js-concept",
          },
          {
            label: "submit event",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// Click\nbutton.addEventListener("click", () => { /* ... */ });\n\n// Live typing (every keystroke)\ninput.addEventListener("input", () => {\n  console.log("User typed:", input.value);\n});\n\n// Form submission\nform.addEventListener("submit", (event) => {\n  event.preventDefault(); // stop page reload\n  console.log("Form submitted!");\n});\n\n// Page fully loaded\ndocument.addEventListener("DOMContentLoaded", () => {\n  console.log("HTML is ready!");\n});\n\n// Keyboard\ndocument.addEventListener("keydown", (event) => {\n  console.log("Key pressed:", event.key);\n});',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "event-object",
      type: "explanation",
      instruction: {
        heading: "The event object: what happened and where",
        body: "Every event handler automatically receives an **event object** as its first argument. This object is packed with useful information:\n\n- `event.target` — the exact element that was clicked/typed on\n- `event.type` — the event type (`'click'`, `'input'`, etc.)\n- `event.key` — which key was pressed (for keyboard events)\n- `event.preventDefault()` — stops the browser's default action (like navigating on a link click, or reloading on form submit)\n\n`event.preventDefault()` is critical for forms — without it, submitting a form reloads the entire page, wiping out your JavaScript state.",
        docLinks: [
          {
            label: "Event object",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Event",
            type: "js-concept",
          },
          {
            label: "Event.preventDefault()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault",
            type: "js-method",
          },
          {
            label: "Event.target",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Event/target",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "The most common beginner mistake with forms: forgetting `event.preventDefault()` on the submit handler. Without it, the browser reloads the page and your JavaScript never gets to process the data. Always call it at the top of your submit handler.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// The event object is automatically passed to your handler\nbutton.addEventListener("click", function (event) {\n  console.log(event.type);    // "click"\n  console.log(event.target);  // the <button> element itself\n});\n\n// Prevent default: stop form from reloading the page\nconst form = document.querySelector("form");\nform.addEventListener("submit", function (event) {\n  event.preventDefault(); // MUST call this first!\n  const data = new FormData(form);\n  console.log("Processing form without page reload...");\n});\n\n// Keyboard events: check which key\ndocument.addEventListener("keydown", function (event) {\n  if (event.key === "Escape") {\n    closeModal();\n  }\n});',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "gap-fill-events",
      type: "gap-fill",
      instruction: {
        heading: "Practice: attach event listeners",
        body: "Fill in the blanks to make a button show an alert on click, and prevent a form from reloading the page.",
      },
      config: {
        type: "gap-fill",
        template:
          '// When the button is clicked, show an alert\nconst btn = document.querySelector("button");\nbtn.{{method}}("{{eventType}}", function () {\n  alert("Clicked!");\n});\n\n// Stop the form from reloading the page\nconst form = document.querySelector("form");\nform.addEventListener("submit", function (event) {\n  event.{{prevent}}();\n  console.log("Form handled by JS!");\n});',
        gaps: [
          {
            id: "method",
            placeholder: "method name",
            acceptedAnswers: ["addEventListener"],
            caseSensitive: true,
          },
          {
            id: "eventType",
            placeholder: "event type",
            acceptedAnswers: ["click"],
            caseSensitive: true,
          },
          {
            id: "prevent",
            placeholder: "prevent method",
            acceptedAnswers: ["preventDefault"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["method", "eventType", "prevent"],
        },
      },
      hints: [
        "The method name is 'add' + 'Event' + 'Listener'.",
        "The event type for pressing and releasing a mouse button is a 5-letter word.",
        "To stop the browser's default behavior, you 'prevent' + 'Default'.",
      ],
    },
  ],
};
