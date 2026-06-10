import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "nextjs-beginners-linking-with-next-link",
  slug: "linking-with-next-link",
  title: "Navigating with next/link",
  description:
    "Connect your pages with the <Link> component for fast, client-side navigation — and learn why it beats a plain <a> tag for internal links.",
  order: 7,
  steps: [
    {
      id: "why-link",
      type: "explanation",
      instruction: {
        heading: "Why not just use an <a> tag?",
        body: `<p>You have an <code>/about</code> page, but no way to get there except typing the URL. You could use a plain <code>&lt;a href="/about"&gt;</code> — and it would work — but it does a <strong>full page reload</strong>: the browser throws away the whole page and re-downloads everything, causing a visible flash.</p><p>Next.js gives you a smarter tool: the <code>&lt;Link&gt;</code> component from <code>next/link</code>. It looks just like an <code>&lt;a&gt;</code>, but it does <strong>client-side navigation</strong> — it swaps in just the new page without a full reload, so transitions feel instant. It also <strong>prefetches</strong> linked pages in the background, so they're ready before the user even clicks.</p>`,
        analogy: `A plain <code>&lt;a&gt;</code> is like leaving a building and walking all the way around to enter through a different door. <code>&lt;Link&gt;</code> is an interior hallway — you step straight from one room to the next, no going outside.`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — internal vs external",
            body: `Use <code>&lt;Link&gt;</code> for links <em>within your own site</em> (<code>/about</code>, <code>/blog</code>). For links to <em>other</em> websites (like <code>https://nextjs.org</code>), use a normal <code>&lt;a&gt;</code> tag — there's no internal navigation to optimize.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Linking and navigating",
            url: "https://nextjs.org/docs/app/getting-started/linking-and-navigating",
            type: "js-concept",
          },
          {
            label: "Next.js — <Link> component",
            url: "https://nextjs.org/docs/app/api-reference/components/link",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// app/page.js  —  a home page that links to other routes
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <h1>Home</h1>
      <nav>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </main>
  );
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "link-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: add navigation",
        body: `<p>Build a small navigation menu. <code>import Link from "next/link"</code> at the top, then return a <code>&lt;nav&gt;</code> with at least two <code>&lt;Link&gt;</code> elements — one to <code>/about</code> and one to <code>/contact</code>. Paste it below, then add it to your real home page and click between routes (notice there's no page-reload flash).</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `<code>&lt;Link&gt;</code> renders a real <code>&lt;a&gt;</code> tag in the final HTML, so it stays fully accessible and keyboard-navigable. Next.js just enhances it with prefetching and client-side transitions on top.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — <Link> component",
            url: "https://nextjs.org/docs/app/api-reference/components/link",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode: `// app/page.js
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <h1>Home</h1>
      {/* Add a <nav> with <Link> elements to /about and /contact */}
    </main>
  );
}`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["next/link", "<Link", "href"] },
      },
      hints: [
        'Inside the &lt;nav&gt;: <code>&lt;Link href="/about"&gt;About&lt;/Link&gt;</code> and one more for /contact.',
        'Make sure the import is at the top: <code>import Link from "next/link";</code>',
      ],
    },
  ],
};
