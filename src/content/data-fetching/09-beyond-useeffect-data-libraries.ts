import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "data-fetching-beyond-useeffect-data-libraries",
  slug: "beyond-useeffect-data-libraries",
  title: "Beyond useEffect: Data Libraries",
  description:
    "useFetch was a great start, but production apps need caching, deduplication, and revalidation. Meet the libraries that handle it: TanStack Query and SWR.",
  order: 9,
  steps: [
    {
      id: "the-boilerplate-problem",
      type: "explanation",
      instruction: {
        heading: "useEffect fetching has real limits",
        body: `<p>Your <code>useFetch</code> hook is solid for learning, but ship it to a big app and gaps appear. Navigate away from a page and back — it refetches from scratch, spinner and all, even though the data is seconds old. Two components on the same screen need the same data — they fire two identical requests. Want to refresh stale data in the background, retry failed requests, or update the UI instantly before the server confirms? You'd be writing a lot more code.</p><p>The diagram shows the core waste: without a cache, every single visit hits the network and shows a spinner again. A real app should remember data it already fetched and reuse it. Hand-rolling a proper cache — with expiry, deduplication, and background refresh — is genuinely hard, so the community built libraries that do it for you.</p>`,
        analogy: `Your <code>useFetch</code> is like fetching a fresh glass of water from the well every time you're thirsty, even if you just drank a minute ago. A data library is like keeping a jug on the table: it remembers what you fetched, hands out the same water to everyone who asks, and only walks back to the well when the jug is actually stale.`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — learn the manual way first (you just did)",
            body: `Don't skip straight to a library. Because you understand <code>useState</code> + <code>useEffect</code> fetching, you'll know exactly what a library is doing under the hood — and when you don't even need one (a single fetch on one page is fine with <code>useFetch</code> or a Server Component).`,
          },
        ],
        docLinks: [
          {
            label: "TanStack Query — Motivation",
            url: "https://tanstack.com/query/latest/docs/framework/react/overview",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "what-a-library-gives-you",
      type: "explanation",
      instruction: {
        heading: "What a query library does for free",
        body: `<p>A data-fetching library treats server data as a <strong>cache you subscribe to</strong>, not state you manually manage. You give it a unique <em>key</em> and a function that fetches. In return you get, automatically:</p><ul><li><strong>Caching</strong> — revisit a page and the data is already there, instantly (the diagram's "⚡ cache" rows).</li><li><strong>Deduplication</strong> — ten components asking for the same key trigger one request.</li><li><strong>Background revalidation</strong> — show cached data immediately, then quietly refetch to check it's fresh.</li><li><strong>Built-in loading, error, and retry</strong> — no more hand-written try/catch/finally.</li></ul><p>The mental shift: you stop thinking "I have data state I must keep in sync" and start thinking "I'm reading from a smart cache that keeps itself fresh."</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — server state vs UI state",
            body: `These libraries popularized a key distinction: <strong>UI state</strong> (is this dropdown open?) belongs in <code>useState</code>, while <strong>server state</strong> (the user's data on the backend) is a cached copy of something you don't own. Treating the two differently is what makes data libraries click.`,
          },
        ],
        docLinks: [
          {
            label: "TanStack Query — Important Defaults (caching)",
            url: "https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// TanStack Query — the same fetch, but cached, deduped, and retried:
import { useQuery } from "@tanstack/react-query";

function UserProfile({ id }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", id],                    // the cache key
    queryFn: () =>
      fetch("/api/users/" + id).then((r) => r.json()), // how to fetch
  });

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Something went wrong</p>;
  return <h2>{data.name}</h2>;
}
// Visit this page again within a few seconds -> no spinner, data is cached.`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "tanstack-and-swr",
      type: "explanation",
      instruction: {
        heading: "TanStack Query vs SWR — which one?",
        body: `<p>Two libraries dominate, and they share the same core idea (a key + a fetcher, with caching and revalidation):</p><ul><li><strong>TanStack Query</strong> (formerly React Query) — the powerful, feature-rich default. Great for apps with lots of mutations, pagination, optimistic updates, and devtools. This is the safe industry choice.</li><li><strong>SWR</strong> — made by Vercel (the Next.js company). Smaller and simpler; the name comes from "stale-while-revalidate." Perfect when you mostly read data and want minimal API surface.</li></ul><p>You install one with npm in a real project (<code>npm install @tanstack/react-query</code>), wrap your app in its provider once, and then call its hook anywhere. We're teaching the <em>concept</em> here; you'll wire a real toolchain in the Next.js lessons. And as you're about to see, Next.js Server Components remove the need for a client cache in many cases entirely.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — don't reach for a library too early",
            body: `If your page fetches once on the server (the next lessons) or has a single simple client fetch, you may not need a query library at all. Add one when you feel the pain it solves: repeated requests, stale caches, and lots of loading spinners.`,
          },
        ],
        docLinks: [
          {
            label: "SWR — Vercel's data fetching library",
            url: "https://swr.vercel.app/",
            type: "js-concept",
          },
          {
            label: "TanStack Query — Quick Start",
            url: "https://tanstack.com/query/latest/docs/framework/react/quick-start",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// SWR — even less code for read-heavy UIs:
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

function Profile({ id }) {
  const { data, error, isLoading } = useSWR("/api/users/" + id, fetcher);

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Failed to load</p>;
  return <h2>{data.name}</h2>;
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
