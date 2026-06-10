import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "react-fundamentals-graduating-to-a-toolchain",
  slug: "graduating-to-a-toolchain",
  title: "Graduating to a Real Toolchain",
  description:
    "Understand why the CDN + in-browser Babel setup doesn't scale, and what a build tool like Next.js gives you instead.",
  order: 13,
  steps: [
    {
      id: "cdn-limits",
      type: "explanation",
      instruction: {
        heading: "The CDN setup got you here — but it can't go further",
        body: `<p>Everything you built loaded React from a CDN and let Babel translate JSX <em>in the browser</em>. That was perfect for learning: zero install, instant results. But it quietly does a lot of expensive, fragile things that no real app would ship:</p><ul><li><strong>It ships the entire Babel compiler to every visitor</strong> — megabytes of translator that exist only to convert your code, downloaded fresh by every user, every visit.</li><li><strong>It translates on every page load</strong> instead of once, ahead of time — so the page is slower to start.</li><li><strong>Everything lives in one HTML file.</strong> There's no clean way to split components into separate files, or to pull in packages from npm (the millions of free libraries other developers share).</li><li><strong>There's no routing, no server rendering, no optimization.</strong> One page, rendered entirely in the browser.</li></ul><p>Real React apps fix all of this with a <strong>build tool</strong>: a program that translates and bundles your code <em>once</em>, on your machine, into small optimized files ready to serve.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `Production React is <strong>compiled ahead of time</strong>, not in the browser. The visitor downloads plain, already-translated JavaScript — no Babel, no JSX, just fast code. The browser never knows JSX existed.`,
          },
        ],
        docLinks: [
          {
            label: "React.dev — Start a new React project",
            url: "https://react.dev/learn/start-a-new-react-project",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "the-difference",
      type: "explanation",
      instruction: {
        heading: "What changes with a build tool",
        body: `<p>With a build tool, your files get cleaner and more powerful. Instead of the CDN script soup at the top of every HTML file, you simply <code>import</code> what you need at the top of each component file — and split your app into as many files as you like.</p><p>The demo shows the contrast: the learning setup (the script tags you've been using) versus a single tidy <code>import</code> line. The build tool handles finding React, translating JSX, and bundling everything — so you can focus on components.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `You don't set up a build tool by hand. A single command — <code>npx create-next-app</code> — scaffolds the whole thing: the bundler, the translator, the dev server, and a sensible project structure. That's the very first codelab of the next module.`,
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// THE LEARNING SETUP (what you've used):
//   <script src=".../react.development.js"></script>
//   <script src=".../react-dom.development.js"></script>
//   <script src=".../@babel/standalone/babel.min.js"></script>
//   <script type="text/babel"> ...all your code in one HTML file... </script>

// WITH A BUILD TOOL (what real apps use):
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
// Clean imports. Many files. npm packages. Optimized output.`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "onward-to-nextjs",
      type: "explanation",
      instruction: {
        heading: "Next stop: Next.js",
        body: `<p>The most popular way to build real React apps today is <strong>Next.js</strong> — a framework built on top of React that gives you the build tool, plus file-based routing, server rendering, image optimization, and a clear project structure, all preconfigured.</p><p>Companies you use every day run on it: <strong>Notion</strong>, <strong>Twitch</strong>, <strong>OpenAI</strong>, and many more. And everything you just learned — components, JSX, props, state, events, lists, effects — carries over <em>exactly</em>. Next.js doesn't replace React; it gives React a professional home.</p><p>You're ready. Head to the <strong>Next.js for Beginners</strong> module and build your first real, installed React project.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `A framework like Next.js is still just React underneath, producing standard HTML, CSS, and JavaScript for the browser. You're not learning something that replaces the fundamentals — you're learning the professional tooling built around them.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Documentation",
            url: "https://nextjs.org/docs",
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
