import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-dom-practice-fix-broken",
  slug: "practice-fix-broken",
  title: "Practice: Fix the Broken Code",
  description:
    "Each step has DOM code that almost works — but one specific bug stops it. Spot the bug, type the fix into the blank, and learn the kinds of mistakes every developer hits.",
  order: 12,
  steps: [
    {
      id: "fix-intro",
      type: "explanation",
      instruction: {
        heading: "Bugs are how you really learn",
        body: "<p>Every working line of code you have ever seen was once broken. The difference between a beginner and a senior is not that the senior writes perfect code — it is that they recognise familiar bugs and know where to look.</p><p>In this lesson, each step shows DOM code that <strong>almost</strong> works. One specific token has been replaced with a blank. Read the comment above the snippet — it tells you what the code is supposed to do. Spot the bug, type the correct token into the blank.</p>",
        analogy:
          "Think of it like spotting a typo on a printed sign. The sign almost says the right thing, but one letter is off. Fix the letter and the sign reads cleanly again.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "When a real DOM script silently does nothing, the bug is usually one of these: a typo in a method name, a wrong selector, a missing <code>.value</code>, a forgotten <code>preventDefault()</code>, or a bad event name.",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fix-method-typo",
      type: "gap-fill",
      instruction: {
        heading: "The method name is wrong",
        body: "<p>This script is supposed to grab the first matching element by CSS selector — but the method name has a typo. Fill the blank with the correct method.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          '// Grab the submit button using a CSS selector\nconst button = document.{{method}}("#submit");\nbutton.textContent = "Send";',
        gaps: [
          {
            id: "method",
            placeholder: "method",
            acceptedAnswers: ["querySelector"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["method"] } },
      hints: [
        "It is the modern method that takes any CSS selector — id, class, tag.",
        "It starts with 'query' and ends with 'Selector'.",
        "querySelector — capital S in the middle.",
      ],
    },
    {
      id: "fix-getelementbyid-casing",
      type: "gap-fill",
      instruction: {
        heading: "Capital letters matter",
        body: "<p>JavaScript method names are case-sensitive. This line should grab an element by its id but the casing is off. Type the correctly-cased method into the blank.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          '// Get the heading element by its id\nconst heading = document.{{method}}("title");\nconsole.log(heading.textContent);',
        gaps: [
          {
            id: "method",
            placeholder: "method",
            acceptedAnswers: ["getElementById"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["method"] } },
      hints: [
        "The classic id-lookup method. Three words mashed into one identifier.",
        "Beginners often type ID in caps — the actual name uses Id (capital I, lowercase d).",
        "getElementById — pay attention to the d at the end.",
      ],
    },
    {
      id: "fix-input-value",
      type: "gap-fill",
      instruction: {
        heading: "Reading from a form input",
        body: "<p>This code is meant to read what the user typed into the input — but it is reading the wrong property and getting <code>undefined</code>. Replace the blank with the right property name.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          '// Read the user\'s typed answer\nconst input = document.querySelector("#answer");\nconst answer = input.{{prop}};\nconsole.log("You typed:", answer);',
        gaps: [
          {
            id: "prop",
            placeholder: "property",
            acceptedAnswers: ["value"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["prop"] } },
      hints: [
        "Form inputs do not use textContent or innerHTML.",
        "It is a 5-letter property, all lowercase.",
        "input.value — every form-aware site uses this dozens of times per session.",
      ],
    },
    {
      id: "fix-event-listener-event-name",
      type: "gap-fill",
      instruction: {
        heading: "Wrong event name",
        body: "<p>This handler is supposed to run every time the user clicks the button — but the event name is misspelled, so nothing fires. Fix the event name.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          'const button = document.querySelector("#go");\n// React to the user pressing the mouse button\nbutton.addEventListener("{{event}}", () => {\n  console.log("Clicked!");\n});',
        gaps: [
          {
            id: "event",
            placeholder: "event name",
            acceptedAnswers: ["click"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["event"] } },
      hints: [
        "The DOM event names are short and lowercase — no 'on' prefix here.",
        "What do you call the action when a user presses and releases the mouse on something?",
      ],
    },
    {
      id: "fix-prevent-default",
      type: "gap-fill",
      instruction: {
        heading: "The form keeps reloading the page",
        body: "<p>This handler tries to read the input and log it, but the page reloads before the log appears — because the form's default submit behaviour was not stopped. Fill the blank with the method that cancels the default behaviour.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          'const form = document.querySelector("form");\nform.addEventListener("submit", (event) => {\n  event.{{method}}();\n  const name = document.querySelector("#name").value;\n  console.log("Hello", name);\n});',
        gaps: [
          {
            id: "method",
            placeholder: "method",
            acceptedAnswers: ["preventDefault"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["method"] } },
      hints: [
        "The browser's default for a form submit is to navigate. You need to cancel that.",
        "It is two words mashed together: 'prevent' + 'Default'.",
      ],
    },
    {
      id: "fix-classlist",
      type: "gap-fill",
      instruction: {
        heading: "Adding a class — the modern way",
        body: "<p>This code is trying to add a class to a card but it overwrites the existing classes. Use the <code>classList</code> API instead — fill the blank with the right method.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          'const card = document.querySelector(".card");\n// Add the class without wiping the others\ncard.classList.{{method}}("highlighted");',
        gaps: [
          {
            id: "method",
            placeholder: "method",
            acceptedAnswers: ["add"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["method"] } },
      hints: [
        "classList has methods that mirror everyday verbs: add, remove, toggle, contains.",
        "You want to put a new class onto the element while keeping existing ones.",
      ],
    },
    {
      id: "fix-append-vs-create",
      type: "gap-fill",
      instruction: {
        heading: "The new element never appears",
        body: "<p>This script creates a new <code>&lt;li&gt;</code> and gives it text — but nothing shows up on the page. The element exists in memory; the missing step attaches it. Fill the blank with the method that adds it as the last child of the list.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          'const list = document.querySelector("#todos");\nconst item = document.createElement("li");\nitem.textContent = "Buy sukuma";\n// Attach the new item to the list so it actually shows\nlist.{{method}}(item);',
        gaps: [
          {
            id: "method",
            placeholder: "method",
            acceptedAnswers: ["appendChild", "append"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["method"] } },
      hints: [
        "createElement makes the node, but it lives only in memory until you attach it.",
        "The classic way reads like a sentence: parent.append___(child).",
      ],
    },
  ],
};
