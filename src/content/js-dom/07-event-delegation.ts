import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-dom-event-delegation",
  slug: "event-delegation",
  title: "Event Delegation & Bubbling",
  description:
    "Discover how events travel up the DOM tree and how to use this behavior to efficiently handle events on many elements with a single listener.",
  order: 7,
  steps: [
    {
      id: "event-bubbling",
      type: "explanation",
      instruction: {
        heading: "Event bubbling: events travel upward",
        body: "When you click a `<button>` inside a `<div>` inside the `<body>`, the click event doesn't just fire on the button. It **bubbles up** through every ancestor: button -> div -> body -> html -> document. Every ancestor has a chance to hear the event.\n\nThis is called **event bubbling** and it's built into how browsers work. It's not a bug — it's a feature that enables a powerful pattern called event delegation.\n\nYou can see this in action: if you add a click listener to the `<body>`, it will fire when you click anything on the page — because every click eventually bubbles up to the body.",
        analogy:
          "Event bubbling is like shouting in a building. If you shout in a room (child element), people in the hallway (parent) and lobby (grandparent) can hear it too. The shout travels outward from where it started, reaching every container along the way.",
        docLinks: [
          {
            label: "Event bubbling",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Most events bubble, but a few don't — `focus`, `blur`, `mouseenter`, and `mouseleave` are notable exceptions. Use `focusin`/`focusout` if you need bubbling versions of focus/blur. You can check if an event bubbles by reading `event.bubbles`.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- Clicking the button triggers click on ALL of these -->\n<body>          <!-- 4th: click fires here too -->\n  <div class="card">  <!-- 3rd: click fires here too -->\n    <p>             <!-- 2nd: click fires here too -->\n      <button>Click me</button>  <!-- 1st: click starts here -->\n    </p>\n  </div>\n</body>\n\n<script>\n// This fires when you click ANYTHING on the page\ndocument.body.addEventListener("click", function (event) {\n  console.log("Body heard a click on:", event.target);\n});\n</script>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "target-vs-currenttarget",
      type: "explanation",
      instruction: {
        heading: "event.target vs event.currentTarget",
        body: "When an event bubbles, two properties help you figure out what's going on:\n\n- `event.target` — the element that **actually triggered** the event (where the user clicked). This never changes as the event bubbles.\n- `event.currentTarget` — the element whose **listener is running right now**. This changes as the event bubbles from listener to listener.\n\nIf you click a `<button>` inside a `<div>`, and the `<div>` has the listener:\n- `event.target` = the `<button>` (what you clicked)\n- `event.currentTarget` = the `<div>` (what has the listener)\n\nThis distinction is the key to event delegation.",
        docLinks: [
          {
            label: "Event.target",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Event/target",
            type: "js-method",
          },
          {
            label: "Event.currentTarget",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "A common mistake is using `event.currentTarget` when you meant `event.target`. Remember: `target` = what was clicked, `currentTarget` = what has the listener. In event delegation, you almost always want `event.target`.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'const list = document.querySelector("ul");\n\nlist.addEventListener("click", function (event) {\n  // event.target = the <li> that was actually clicked\n  console.log("Clicked on:", event.target.textContent);\n\n  // event.currentTarget = the <ul> (which has the listener)\n  console.log("Listener is on:", event.currentTarget.tagName); // "UL"\n});',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "delegation-pattern",
      type: "explanation",
      instruction: {
        heading: "Event delegation: one listener to rule them all",
        body: "Instead of attaching a listener to every `<li>` in a list (what if there are 1000 of them?), you attach **one listener to the parent `<ul>`**. When any `<li>` is clicked, the event bubbles up to the `<ul>`, and you use `event.target` to figure out which `<li>` was clicked.\n\nThis is called **event delegation** and it solves two problems:\n\n1. **Performance** — One listener instead of hundreds or thousands.\n2. **Dynamic content** — If you add new `<li>` items later with JavaScript, they automatically work because the listener is on the parent, not on individual items. No need to attach new listeners.\n\nEvery major website uses this pattern. Amazon's product lists, Gmail's email rows, YouTube's video grids — they all use delegation.",
        docLinks: [
          {
            label: "Event delegation",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling#event_delegation",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// WITHOUT delegation: one listener per item (bad)\nconst items = document.querySelectorAll("li");\nitems.forEach(function (item) {\n  item.addEventListener("click", function () {\n    console.log(item.textContent);\n  });\n});\n// Problem: new items added later won\'t have listeners!\n\n// WITH delegation: one listener on parent (good)\nconst list = document.querySelector("ul");\nlist.addEventListener("click", function (event) {\n  // Check that we clicked an <li>, not the <ul> itself\n  if (event.target.tagName === "LI") {\n    console.log("Clicked:", event.target.textContent);\n    event.target.classList.toggle("completed");\n  }\n});\n// New items added later automatically work!',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "gap-fill-delegation",
      type: "gap-fill",
      instruction: {
        heading: "Practice: event delegation",
        body: "Complete the event delegation pattern to handle clicks on a list of items.",
      },
      config: {
        type: "gap-fill",
        template:
          '// Attach ONE listener to the parent <ul>\nconst list = document.querySelector("ul");\n\nlist.addEventListener("click", function (event) {\n  // event.{{targetProp}} is the element that was actually clicked\n  const clicked = event.{{targetProp}};\n\n  // Only respond if an <li> was clicked\n  if (clicked.{{tagProp}} === "LI") {\n    clicked.classList.toggle("selected");\n  }\n});',
        gaps: [
          {
            id: "targetProp",
            placeholder: "property",
            acceptedAnswers: ["target"],
            caseSensitive: true,
          },
          {
            id: "tagProp",
            placeholder: "property",
            acceptedAnswers: ["tagName"],
            caseSensitive: true,
          },
        ],
      },
      validation: {
        type: "exact-match",
        criteria: {
          gaps: ["targetProp", "tagProp"],
        },
      },
      hints: [
        "The property that tells you which element was actually clicked (not which element has the listener) is a 6-letter word.",
        "To check what type of HTML element something is, use the property that returns the tag name in uppercase (e.g., 'LI', 'DIV').",
      ],
    },
  ],
};
