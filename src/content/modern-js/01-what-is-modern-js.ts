import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "modern-js-what-is-modern-js",
  slug: "what-is-modern-js",
  title: "What Modern JavaScript Means",
  description:
    "Meet the modern JavaScript toolkit — the features added since 2015 that make code shorter, safer, and that every framework like React is built on.",
  order: 1,
  steps: [
    {
      id: "the-2015-leap",
      type: "explanation",
      instruction: {
        heading: "JavaScript got a huge upgrade",
        body: `<p>In 2015, JavaScript received its biggest update ever — known as <strong>ES2015</strong> (or <strong>ES6</strong>). It added a whole set of features that made the language dramatically nicer to write: less boilerplate, fewer bugs, and far more readable code. Every year since, more has been added.</p><p>You've already met some of these features across the earlier modules: <code>let</code>/<code>const</code>, arrow functions, template literals, destructuring. This module pulls together the <em>rest</em> of the everyday modern toolkit and — importantly — shows how it's actually used to build real apps.</p><p>Why now? Because <strong>this is the exact dialect React, Vue, and Next.js are written in</strong>. Open any modern codebase and you'll see spread operators, <code>.map()</code>/<code>.filter()</code>, and destructuring on nearly every line. Master these and React will feel like a natural next step instead of a wall of unfamiliar syntax.</p>`,
        analogy: `Think of it like the difference between formal textbook English and the way people actually talk. The earlier modules taught you correct, working JavaScript. Modern JavaScript is how the language is <em>really</em> written today — the idioms every developer uses without thinking.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `"ES" stands for <strong>ECMAScript</strong> — the official specification that defines JavaScript. ES2015/ES6 was the turning point; all modern browsers support these features natively, so you can use them with confidence.`,
          },
        ],
        docLinks: [
          {
            label: "MDN — A re-introduction to JavaScript",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "before-after",
      type: "explanation",
      instruction: {
        heading: "The same task, old way vs modern way",
        body: `<p>Here's one job — adding up a list of prices — written two ways. The old style uses <code>var</code> and a manual <code>for</code> loop. The modern style uses <code>const</code> and the <code>reduce</code> array method (you'll learn it later in this module). Run it and watch both print the same total.</p><p>Notice the modern version says <em>what</em> you want ("sum these up") instead of spelling out <em>how</em> to loop. That shift — describing intent instead of mechanics — is the heart of modern JavaScript, and exactly the mindset React rewards.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `Don't worry if <code>reduce</code> looks mysterious right now — there's a whole lesson on it. The point here is just the contrast: modern JS lets you write less code that reads closer to plain language.`,
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// OLD style (pre-2015): manual loop, mutable total
var prices = [10, 20, 30];
var total = 0;
for (var i = 0; i < prices.length; i++) {
  total = total + prices[i];
}
console.log("Old total:", total);

// MODERN style: describe the result, not the loop
const modernPrices = [10, 20, 30];
const modernTotal = modernPrices.reduce((sum, price) => sum + price, 0);
console.log("Modern total:", modernTotal);`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
