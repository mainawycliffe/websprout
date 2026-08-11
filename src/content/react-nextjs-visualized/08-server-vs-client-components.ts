import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "react-nextjs-visualized-server-vs-client-components",
  slug: "server-vs-client-components",
  title: "Server vs Client Components",
  description:
    "Where does your code actually run? Visualize the server/browser split and what the 'use client' directive changes.",
  order: 8,
  steps: [
    {
      id: "where-code-runs",
      type: "explanation",
      instruction: {
        heading: "Components run on the server by default",
        body: `<p>Here's the mental shift that trips up everyone coming from plain React: in the Next.js App Router, your components run on the <strong>server</strong> by default. They execute once, on the machine, and send finished HTML to the browser.</p><p>The diagram shows the split. On the <strong>server</strong> side, a component can read files, use secrets, and query a database directly — because that code never ships to the user. It runs, produces HTML, and the user only receives the result.</p><p>Why is this good? Less JavaScript is sent to the browser (faster loads), data fetching happens close to the database, and secrets like API keys stay safely on the server. For content that just <em>displays</em> data — a product list, an article, a profile — server components are the ideal default.</p>`,
        analogy: `A restaurant kitchen (server) prepares the dish out of sight and sends out a finished plate (HTML). The diner (browser) never sees the raw ingredients, the recipe, or the mess — just the result. Server components keep the cooking in the kitchen.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — HTML first",
            body: `Sending real HTML from the server means content is visible immediately and is readable by search engines and assistive tech before any JavaScript loads. This "HTML first, enhance later" approach is <a href="https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement">progressive enhancement</a>, a core web principle.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Server Components",
            url: "https://nextjs.org/docs/app/building-your-application/rendering/server-components",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoLanguage: "typescript",
        demoCode: `// app/products/page.tsx — a Server Component (the default)
// This runs ON THE SERVER. The db call and secrets never reach the browser.

import { db } from "@/lib/db";

export default async function ProductsPage() {
  const products = await db.query("SELECT * FROM products");
  return (
    <ul>
      {products.map((p) => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}`,
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "the-use-client-boundary",
      type: "explanation",
      instruction: {
        heading: '"use client" moves a component to the browser',
        body: `<p>Server components have one big limitation: they can't be interactive. No <code>useState</code>, no <code>onClick</code>, no <code>useEffect</code> — those need the browser, where the user actually clicks and types.</p><p>So when you <em>do</em> need interactivity, you add the directive <code>"use client"</code> at the very top of the file. The diagram shows that component crossing the boundary into the browser, where it ships its JavaScript and becomes interactive — buttons respond, state updates, effects run.</p><p>The skill is choosing the boundary well: keep most of your tree as server components (fast, light), and opt <em>only</em> the interactive leaves into client components. A typical page is a server component that renders a small <code>&lt;AddToCart /&gt;</code> client component inside it — not the other way around.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — \"use client\" is contagious downward",
            body: `Once a component is a client component, every component it imports and renders is client too. So push <code>"use client"</code> as far down the tree as you can — to the actual interactive piece — rather than putting it at the top of a big page.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Client Components",
            url: "https://nextjs.org/docs/app/building-your-application/rendering/client-components",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoLanguage: "typescript",
        demoCode: `// app/components/AddToCart.tsx
"use client"; // <-- opts this component into the browser

import { useState } from "react";

export default function AddToCart() {
  const [count, setCount] = useState(0);
  // useState + onClick only work because this runs in the browser
  return (
    <button onClick={() => setCount(count + 1)}>
      In cart: {count}
    </button>
  );
}`,
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "server-or-client",
      type: "quiz",
      difficulty: "advanced",
      instruction: {
        heading: "Server or client?",
        body: `<p>You have inherited four components from a real online store, and the team wants to ship less JavaScript. <strong>Select every one that must be a Client Component</strong> — every one that would actually break if it only ever ran on the server.</p><p>Work it out rather than guessing: for each component, ask the deciding question below and follow the consequence. Two of the four are traps in opposite directions — one looks server-ish but is not, and one looks harmless to move but must never leave the server.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — the deciding question",
            body: `Ask: "does this need state, effects, event handlers, or browser-only APIs?" If yes, it must be a Client Component. If it only fetches data and displays it, leave it on the server — you ship less JavaScript and the page paints sooner.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — When to use Server vs Client Components",
            url: "https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "quiz",
        mode: "multiple",
        options: [
          {
            id: "article",
            text: "A product description that renders text fetched from the CMS",
            correct: false,
            explanation:
              "No state, no events, no browser APIs — just data in, HTML out. Leave it on the server and you ship <strong>zero</strong> JavaScript for it. Marking this <code>\"use client\"</code> would cost bundle size and buy nothing.",
          },
          {
            id: "cart",
            text: 'An "Add to cart" button using <code>useState</code> and <code>onClick</code>',
            correct: true,
            explanation:
              "<code>useState</code> and <code>onClick</code> only exist once the component is running in a browser. Without <code>\"use client\"</code> this fails at build time — the error is loud and immediate, which makes it the easiest of the four to get right.",
          },
          {
            id: "secret",
            text: "A component that reads <code>process.env.STRIPE_SECRET_KEY</code> to fetch orders",
            correct: false,
            explanation:
              "This one must stay on the <strong>server</strong> — and the cost of getting it wrong is the worst on the list. Adding <code>\"use client\"</code> here bundles your secret key into JavaScript that every single visitor can read in devtools. When you are unsure, ask what leaks if this runs in the browser.",
          },
          {
            id: "theme",
            text: "A dark-mode toggle that reads <code>localStorage</code>",
            correct: true,
            explanation:
              "<code>localStorage</code> is a browser API — it simply does not exist during server rendering, so this needs <code>\"use client\"</code>. It also needs a guard for the very first render, before <code>localStorage</code> is readable, or the server and client HTML disagree and React reports a hydration mismatch.",
          },
        ],
      },
      validation: { type: "quiz-answer", criteria: {} },
      hints: [
        "Two of the four need the browser. Look for <code>useState</code>, event handlers, and browser-only globals like <code>localStorage</code>.",
        "The secret-key one is the trap — it is the <em>most</em> server-only component on the list, not a client one.",
      ],
    },
  ],
};
