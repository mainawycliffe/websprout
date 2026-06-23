import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "data-fetching-nextjs-server-components-fetching",
  slug: "nextjs-server-components-fetching",
  title: "Fetching on the Server with Next.js",
  description:
    "Next.js Server Components can fetch data on the server, before any HTML reaches the browser — no useEffect, no spinner, no exposed API keys.",
  order: 10,
  steps: [
    {
      id: "the-client-way-recap",
      type: "explanation",
      instruction: {
        heading: "The cost of fetching in the browser",
        body: `<p>Everything so far fetched in the <strong>browser</strong>: the page loads empty, JavaScript runs, <code>useEffect</code> fires, the request goes out, and only then does data appear. The diagram traces that journey — and you can see the gap where the user stares at a spinner. There are three real downsides:</p><ul><li><strong>The waterfall</strong> — download HTML, download JS, <em>then</em> start fetching. Data is always a step behind.</li><li><strong>The flicker</strong> — every visitor sees a loading state, even on fast connections.</li><li><strong>Exposure</strong> — the fetch runs on the user's device, so API URLs and any keys are visible in the browser's network tab.</li></ul><p>For data that's ready when the page loads — a product page, a blog post, a dashboard's initial numbers — there's a better way.</p>`,
        analogy: `Client fetching is like arriving at a restaurant and only <em>then</em> starting to cook your meal while you wait at the table. Server fetching is like a meal-kit that arrives fully cooked — the kitchen did the work before it ever reached you.`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — client fetching still has its place",
            body: `Browser fetching with <code>useEffect</code> (or a query library) is still right for data that changes <em>after</em> load in response to the user: live search, infinite scroll, polling a price, anything driven by interaction. Server fetching shines for the data a page needs <em>up front</em>.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Data Fetching and Caching",
            url: "https://nextjs.org/docs/app/getting-started/fetching-data",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fetch-on-the-server",
      type: "explanation",
      instruction: {
        heading: "async components: await right in the component",
        body: `<p>In the Next.js App Router, components are <strong>Server Components by default</strong> — they run on the server, never in the browser (you saw this in <code>react-nextjs-visualized</code>). And Server Components have a superpower: they can be <code>async</code> and use <code>await</code> directly in the component body.</p><p>That means no <code>useState</code>, no <code>useEffect</code>, no loading state to manage. You just <code>await fetch(...)</code>, then return JSX using the data. By the time the component renders, the data is already there. The diagram shows the cleaner flow: the server fetches, builds HTML <em>with</em> the data inside, and ships a finished page. The user sees content immediately — no spinner.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — secrets stay on the server",
            body: `Because the fetch runs on the server, you can safely read environment variables like <code>process.env.API_KEY</code> and call private APIs. None of it is sent to the browser — only the resulting HTML is. This is a genuine security win over client fetching.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Fetching data on the server",
            url: "https://nextjs.org/docs/app/getting-started/fetching-data#server-components",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// app/users/page.js  — a Server Component (no "use client" at the top)
// Notice: the component itself is async, and we await inside it.

export default async function UsersPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  // No loading state needed — by the time we render, data is here.
  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "when-to-use-each",
      type: "explanation",
      instruction: {
        heading: "A simple rule of thumb",
        body: `<p>You now have two ways to fetch. Here's how to choose without overthinking it:</p><ul><li><strong>Does the page need this data to first render?</strong> Fetch it on the server in an <code>async</code> Server Component. (Product details, an article, the initial dashboard.)</li><li><strong>Is the data driven by user interaction after load?</strong> Fetch it in the browser with <code>useEffect</code> or a query library inside a <code>"use client"</code> component. (Search-as-you-type, "load more", live updates.)</li></ul><p>Most real pages mix both: a Server Component fetches the initial data and passes it down, and a small Client Component handles the interactive parts. The next lessons add the finishing touches — loading and error UI for server fetches, and dynamic routes — before you build a full dashboard.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — you can pass server data into client components",
            body: `A Server Component can fetch data and pass it as <strong>props</strong> to a Client Component. That's the common pattern: fetch once on the server, hand the result to an interactive client component for filtering or sorting — no second request needed.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Server and Client Components",
            url: "https://nextjs.org/docs/app/getting-started/server-and-client-components",
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
