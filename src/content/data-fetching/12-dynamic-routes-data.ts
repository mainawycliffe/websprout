import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "data-fetching-dynamic-routes-data",
  slug: "dynamic-routes-data",
  title: "Dynamic Routes and Per-Page Data",
  description:
    "One file, infinite pages. Use a [bracket] folder to build a detail page for every item, read the URL through params, and fetch that item's data on the server.",
  order: 12,
  steps: [
    {
      id: "the-bracket-folder",
      type: "explanation",
      instruction: {
        heading: "You can't write a page for every product",
        body: `<p>Amazon has hundreds of millions of product pages. Nobody wrote a file for each one. They wrote <strong>one</strong> template — "a product page" — and the URL tells it <em>which</em> product to show. <code>/product/B07XYZ</code> and <code>/product/A01ABC</code> are the same component, fed different data based on the id in the URL.</p><p>In the Next.js App Router (which you met in <code>react-nextjs-visualized</code>), you create this with a <strong>dynamic segment</strong>: a folder whose name is wrapped in square brackets, like <code>app/country/[code]/page.js</code>. The <code>[code]</code> part is a placeholder. Visit <code>/country/usa</code> and <code>code</code> is "usa"; visit <code>/country/jpn</code> and it's "jpn". One file, every country.</p>`,
        analogy: `Think of a mail merge. You write one letter template with "Dear [NAME]," and the system stamps out a personalized letter for every name in your list. The <code>[code]</code> folder is that template slot — Next.js fills it in from the URL to produce a real page for each value.`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — the bracket name becomes the param name",
            body: `The word inside the brackets is the key you'll read later. <code>[code]</code> → <code>params.code</code>. <code>[slug]</code> → <code>params.slug</code>. <code>[id]</code> → <code>params.id</code>. Name it after what it represents.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Dynamic Route Segments",
            url: "https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "read-params-and-fetch",
      type: "explanation",
      instruction: {
        heading: "Read the URL with params — and await it",
        body: `<p>Next.js passes the dynamic part of the URL to your page as a <code>params</code> prop. Here's the modern detail you must get right: <strong>in Next.js 16, <code>params</code> is a Promise</strong>. You make the page <code>async</code> and <code>await params</code> to read the value. Old tutorials write <code>params.code</code> directly — that no longer works and will error.</p><p>Once you have the id, it's the server fetching you already learned: <code>await fetch</code> the specific item's data, then render it. No <code>useState</code>, no <code>useEffect</code> — the page is an <code>async</code> Server Component, so the data is ready before the HTML is sent. Pair this page with a <code>loading.js</code> and <code>error.js</code> in the same folder and you've got a complete, robust detail page.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — why params is async now",
            body: `Next.js made <code>params</code> (and <code>searchParams</code>) Promises so the framework can start rendering and streaming a page <em>before</em> every dynamic value is resolved. <code>await</code>ing them is the small price for that performance. In a Client Component you'd read them with React's <code>use(params)</code> instead.`,
          },
        ],
        docLinks: [
          {
            label: "MDN — Promise (await refresher)",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// app/country/[code]/page.js  — a dynamic Server Component
export default async function CountryPage({ params }) {
  const { code } = await params; // <-- params is a Promise in Next.js 16

  const res = await fetch("https://restcountries.com/v3.1/alpha/" + code);
  if (!res.ok) throw new Error("Country not found"); // -> error.js
  const [country] = await res.json();

  return (
    <main>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Population: {country.population.toLocaleString()}</p>
    </main>
  );
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "generate-static-params",
      type: "explanation",
      instruction: {
        heading: "generateStaticParams: pre-build the popular pages",
        body: `<p>For dynamic routes, Next.js can pre-render pages at <strong>build time</strong> instead of on each request — making them load instantly and reducing server work. You opt in by exporting a <code>generateStaticParams</code> function that returns the list of values to build. For a blog, that's every post's slug; for our dashboard, it could be every country code.</p><p>You don't have to use it — without it, pages are rendered on demand the first time someone visits (then cached). But for a known, finite set of pages, <code>generateStaticParams</code> is a free performance win. It's the App Router's answer to "how do I turn dynamic routes into a fast static site?"</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — it returns the params, not the data",
            body: `<code>generateStaticParams</code> returns an array of <em>param objects</em> like <code>[{ code: "usa" }, { code: "jpn" }]</code> — just the URL pieces. Next.js then calls your page component once per entry, and <em>that's</em> where the per-page <code>fetch</code> happens. Keep the two jobs separate.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — generateStaticParams",
            url: "https://nextjs.org/docs/app/api-reference/functions/generate-static-params",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// app/country/[code]/page.js

// Pre-build a page for each of these codes at build time:
export async function generateStaticParams() {
  return [{ code: "usa" }, { code: "jpn" }, { code: "bra" }, { code: "ken" }];
}

export default async function CountryPage({ params }) {
  const { code } = await params;
  // ...fetch and render this country (runs once per code above)
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
