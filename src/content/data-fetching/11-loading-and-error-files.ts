import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "data-fetching-loading-and-error-files",
  slug: "loading-and-error-files",
  title: "loading.js, error.js, and Caching",
  description:
    "Next.js gives you loading and error UI through special files — no state to manage — plus a built-in fetch cache you control with one option.",
  order: 11,
  steps: [
    {
      id: "loading-js",
      type: "explanation",
      instruction: {
        heading: "loading.js: instant loading UI, for free",
        body: `<p>If a Server Component <code>await</code>s data, the page can't render until that data arrives. So how do you show a loading state when there's no <code>useState</code>? Next.js answers with a <strong>special file</strong>: drop a <code>loading.js</code> next to your <code>page.js</code>, and Next.js shows it automatically while the page's data is loading.</p><p>Under the hood this wraps your page in a React <strong>Suspense</strong> boundary and <em>streams</em> the result: the shell and your loading UI are sent instantly, and the page content streams in when the server finishes fetching. You write zero loading logic — just a component that returns a skeleton or spinner. The diagram is the same three-state idea you already know, now handled by the framework instead of by hand.</p>`,
        analogy: `It's like a TV channel that shows a "Please stand by" card the moment you tune in, then cuts to the live show once the broadcast is ready. You don't wire up the card-to-show switch — the station does it. <code>loading.js</code> is that "please stand by" card, shown automatically.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — streaming with Suspense",
            body: `Streaming lets the server send HTML in chunks instead of waiting for everything. The user sees the layout and loading placeholders immediately, and slow data fills in as it's ready — better perceived performance with no extra code from you.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — loading.js and Streaming",
            url: "https://nextjs.org/docs/app/api-reference/file-conventions/loading",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// FILE: app/dashboard/loading.js
// Next.js shows this automatically while app/dashboard/page.js is fetching.
// You write ONLY this — the page.js (an async Server Component like in
// lesson 10) stays exactly as it is; you don't change it.

export default function Loading() {
  return <p>Loading your dashboard…</p>; // or a skeleton component
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "error-js",
      type: "explanation",
      instruction: {
        heading: "error.js: catch failures without try/catch everywhere",
        body: `<p>What about failures? An <code>error.js</code> file is an automatic <strong>error boundary</strong> for that route. If anything in the page throws — a failed fetch, a bad <code>res.ok</code> check you re-threw, a runtime bug — Next.js catches it and renders your <code>error.js</code> instead of a white screen of death.</p><p>Two details: <code>error.js</code> must be a Client Component (it needs <code>"use client"</code> at the top, because it uses interactivity), and it receives two props — the <code>error</code> object and a <code>reset</code> function that retries rendering the segment. That gives users a real "Try again" button. One file protects the whole route subtree.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — throw to trigger it",
            body: `In a Server Component, do the same <code>if (!res.ok) throw new Error(...)</code> check you learned in lesson 3. That thrown error bubbles up to the nearest <code>error.js</code> — connecting your manual error handling to the framework's boundary.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — error.js and error handling",
            url: "https://nextjs.org/docs/app/api-reference/file-conventions/error",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// FILE: app/dashboard/error.js
"use client"; // error boundaries must be client components

export default function Error({ error, reset }) {
  return (
    <div>
      <p>Couldn't load the dashboard.</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "caching-and-revalidation",
      type: "explanation",
      instruction: {
        heading: "Caching fetch on the server — opt in when you want it",
        body: `<p>Remember the caching problem from the data-libraries lesson? On the server, Next.js extends the native <code>fetch</code> with caching options. In <strong>Next.js 16, server <code>fetch</code> is NOT cached by default</strong> — each request goes to the network (older tutorials say the opposite; that default changed). You opt into caching when the data is safe to reuse, with one extra option:</p><ul><li><code>next: { revalidate: 3600 }</code> — cache for an hour, then refresh in the background. Great for data that changes slowly (a product catalog).</li><li><code>cache: "force-cache"</code> — cache until you revalidate it. For data that rarely changes.</li><li><code>cache: "no-store"</code> — explicitly never cache; fetch fresh every request. For data that must be live (a user's account balance).</li></ul><p>The diagram shows the payoff once you opt in: the first request hits the network, and repeat requests are served instantly from the cache until the revalidation window passes — a production-grade cache without installing anything.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — same fetch, changing defaults",
            body: `It's the same <code>fetch()</code> from MDN — Next.js just adds caching options on top, so <code>fetch</code>, <code>response.ok</code>, and <code>response.json()</code> all work identically on the server. But <strong>heed the docs and deprecation notes</strong>: caching defaults have shifted across Next.js versions (uncached-by-default in 16), so always confirm the behavior for your version rather than trusting an old blog post.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Caching and revalidating",
            url: "https://nextjs.org/docs/app/getting-started/fetching-data#caching-data",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// In Next.js 16, server fetch is uncached by default (fresh each request).

// Opt in: cache for 1 hour, then revalidate in the background:
const res = await fetch("https://api.example.com/products", {
  next: { revalidate: 3600 },
});

// Or cache until revalidated:
const cached = await fetch("https://api.example.com/categories", {
  cache: "force-cache",
});

// Be explicit that data must always be live (the default-like behavior):
const live = await fetch("https://api.example.com/balance", {
  cache: "no-store",
});`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
