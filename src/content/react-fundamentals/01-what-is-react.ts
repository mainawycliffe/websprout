import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "react-fundamentals-what-is-react",
  slug: "what-is-react",
  title: "What is React (and Why It Exists)",
  description:
    "Understand the problem React solves: keeping a complex UI in sync with changing data, without hand-writing DOM updates.",
  order: 1,
  steps: [
    {
      id: "the-problem",
      type: "explanation",
      instruction: {
        heading: "The problem: keeping the screen in sync with your data",
        body: `<p>You already know how to change a page with JavaScript: grab an element with <code>document.querySelector</code>, then update its <code>textContent</code> or <code>innerHTML</code>. That works fine for one button or one counter.</p><p>But think about a screen like the <strong>YouTube</strong> homepage, the <strong>Instagram</strong> feed, or a <strong>Twitch</strong> chat. Hundreds of pieces of information change every second — like counts, new comments, who is online. If you tried to keep all of that correct by hand, you would write thousands of tiny "find this element, change that text" instructions, and a single missed update means the screen shows a lie.</p><p>This is <em>the</em> hard problem of building user interfaces: <strong>the screen must always match the current data</strong>. React was created at Facebook in 2013 for exactly this reason — their UI had grown too complex to keep in sync by hand.</p>`,
        analogy: `Imagine a restaurant where the kitchen's order screen has to match every change a customer makes. The old way is a waiter running back and forth erasing and rewriting each line by hand — easy to get wrong. React is like a system where you just hand over the <em>final order</em>, and a manager figures out exactly which lines on the screen need to change.`,
        docLinks: [
          {
            label: "React.dev — Quick Start",
            url: "https://react.dev/learn",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "the-vanilla-way",
      type: "explanation",
      instruction: {
        heading: "The painful way: updating the DOM by hand",
        body: `<p>Here is a counter written with plain JavaScript and the DOM — the skills from the earlier modules. Read it carefully. Notice that the value lives in <strong>two places at once</strong>: the <code>count</code> variable <em>and</em> the text on screen. Every time the data changes, you must remember to manually copy it into the DOM with <code>countEl.textContent = count</code>.</p><p>For one counter this is fine. But every new feature means another variable, another DOM lookup, and another "don't forget to update the screen" line. Miss one, and your UI silently falls out of sync with reality.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `The bug hiding in every hand-written UI is the <em>forgotten update</em> — you change the data but forget the matching <code>textContent =</code> line. React's whole purpose is to make that bug impossible.`,
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// Plain JavaScript + DOM — the way you already know.
let count = 0;

const countEl = document.querySelector("#count");
const button = document.querySelector("#add");

button.addEventListener("click", () => {
  count = count + 1;
  // You MUST remember this line, or the screen lies:
  countEl.textContent = count;
});`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "the-react-idea",
      type: "explanation",
      instruction: {
        heading: "The React idea: describe the UI, let React do the updating",
        body: `<p>React flips the work around. Instead of writing step-by-step instructions to <em>change</em> the page, you write a function that <strong>describes what the page should look like for the current data</strong>. When the data changes, React re-runs your description, compares it to what is already on screen, and updates only the parts that actually changed.</p><p>You stop saying <em>"find the count element and set its text"</em>. You start saying <em>"the screen shows the count"</em> — and React keeps that promise for you, every time.</p><p>Two things to hold onto before we start coding:</p><ul><li><strong>React is a library, not a new language.</strong> It runs on top of the same HTML, CSS, JavaScript, and DOM you already learned. Everything you know still applies.</li><li><strong>React is built from functions.</strong> If you are comfortable with JavaScript functions (from the Function Factory module), you already know the hardest part.</li></ul>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `React does not replace the DOM — it manages it for you. Under the hood it still calls the same browser APIs (<code>document.createElement</code>, <code>textContent</code>, and friends) that you used by hand. React is a smart layer on top of web standards, not a detour around them.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Thinking in React",
            url: "https://react.dev/learn/thinking-in-react",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
