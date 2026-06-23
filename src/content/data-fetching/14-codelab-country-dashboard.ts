import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "data-fetching-codelab-country-dashboard",
  slug: "codelab-country-dashboard",
  title: "Codelab: Build a Country Explorer Dashboard",
  description:
    "A guided 2–3 hour project. Scaffold a Next.js app, fetch live data on the server, build a searchable grid, add dynamic detail pages with loading and error UI, and deploy the multi-page dashboard to the web.",
  order: 14,
  steps: [
    {
      id: "codelab-intro",
      type: "explanation",
      instruction: {
        heading: "What you'll build",
        body: `<p>Set aside <strong>2–3 hours</strong>. You'll build a real, multi-page <strong>Country Explorer</strong> dashboard and deploy it live: a home page showing a searchable grid of every country, and a detail page for each one — flag, capital, population, languages, and more. All of it powered by the free, live <strong>REST Countries</strong> API.</p><p>This is where the whole module comes together. You'll fetch on the <strong>server</strong> with async components (lesson 10), build <strong>dynamic routes</strong> for detail pages (lesson 12), add <strong>loading and error</strong> files (lesson 11), and hand server data to a <strong>client component</strong> for live search. Keep <code>npm run dev</code> running and check the browser after every step.</p><p>📚 New to a concept along the way? Each step links back to the matching lesson.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — fill the blanks, don't just copy",
            body: `Several steps are <strong>fill-in-the-blank</strong>: the file is shown with a few gaps for the key bits of CSS and JSX. Type the missing pieces (they turn green when right), <em>then</em> copy the finished file into your real project. Thinking through each blank is how the patterns stick. Stuck? Reveal a hint.`,
          },
        ],
        docLinks: [
          {
            label: "REST Countries — the API we'll use",
            url: "https://restcountries.com/",
            type: "js-concept",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "create-the-app",
      type: "explanation",
      instruction: {
        heading: "Part 1 — create and run the app (terminal)",
        body: `<p>You'll need <strong>Node.js 20.9+</strong> (from <a href="https://nodejs.org">nodejs.org</a>), <strong>VS Code</strong>, and free <a href="https://github.com">GitHub</a> + <a href="https://vercel.com">Vercel</a> accounts for the deploy at the end. Then scaffold the project with <code>create-next-app</code>. The flags pick the simplest setup: JavaScript, plain CSS, ESLint, and the App Router.</p><p>These commands all run in your <strong>terminal</strong> (not in a file). After it installs, move into the folder and start the dev server. Open <a href="http://localhost:3000">localhost:3000</a> — you'll see the Next.js starter page. Leave this terminal running for the whole codelab.</p><p>📚 More on WebSprout: <a href="/nextjs-beginners/create-next-app">Scaffolding with create-next-app</a>.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — accept the defaults",
            body: `If <code>create-next-app</code> asks any extra questions, press Enter to accept defaults. If it asks about <em>Turbopack</em>, yes is fine. If it asks to include <em>AGENTS.md</em>, choose No — that file is for AI tools, not for us.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — create-next-app",
            url: "https://nextjs.org/docs/app/api-reference/cli/create-next-app",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `# --- Run these in your TERMINAL ---

# Move to where your projects live (the Desktop is fine):
cd Desktop

# Create the app in one command:
npx create-next-app@latest country-explorer --js --no-tailwind --eslint --app --use-npm

#   country-explorer -> your project folder name
#   --js             -> JavaScript (simpler than TypeScript to start)
#   --no-tailwind    -> plain CSS
#   --eslint         -> catch mistakes
#   --app            -> the modern App Router
#   --use-npm        -> install with npm

# Then move in and start the dev server:
cd country-explorer
npm run dev
# Visit http://localhost:3000 — leave this running.`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fetch-the-country-list",
      type: "explanation",
      instruction: {
        heading: "Part 2 — fetch the country list (app/page.js)",
        body: `<p>Open <code>app/page.js</code> and <strong>replace its entire contents</strong> with the code below. This is your first piece, so it's complete — read it carefully, because the next steps will blank out the key bits for you to fill. It's a <strong>Server Component</strong> (no <code>"use client"</code>), so it can be <code>async</code> and <code>await</code> the fetch directly — the data is ready before any HTML reaches the browser (lesson 10).</p><p>One REST Countries detail to know: the <code>/all</code> endpoint <strong>requires a <code>?fields=</code> query</strong> listing the fields you want, or it returns an error. We ask for just what the grid needs, sort alphabetically, then render a simple list of names for now.</p><p>Save and refresh <a href="http://localhost:3000">localhost:3000</a> — you should see a long list of country names, fetched live.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — the ?fields= parameter is required",
            body: `Calling <code>https://restcountries.com/v3.1/all</code> with no <code>?fields=</code> now returns a 400 error. Always list the fields you need — it's required <em>and</em> it keeps the response small and fast.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Fetching data in Server Components",
            url: "https://nextjs.org/docs/app/getting-started/fetching-data",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// FILE: app/page.js  (replace the whole file)

const API =
  "https://restcountries.com/v3.1/all?fields=name,flags,cca3,region,population,capital";

export default async function HomePage() {
  const res = await fetch(API);
  if (!res.ok) throw new Error("Failed to load countries"); // -> error.js later
  const countries = await res.json();
  countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
      <h1>🌍 Country Explorer</h1>
      <p>{countries.length} countries, fetched live on the server.</p>
      <ul>
        {countries.map((c) => (
          <li key={c.cca3}>{c.name.common}</li>
        ))}
      </ul>
    </main>
  );
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "add-grid-styles",
      type: "gap-fill",
      instruction: {
        heading: "Part 3 — card styles (app/globals.css)",
        body: `<p>A list of names is dull. We'll turn each country into a <strong>card</strong>, in two steps. <strong>This step is just CSS</strong> — fill the three blanks, then add the finished rules to the <em>bottom</em> of <code>app/globals.css</code> (don't delete what's already there).</p><p>The blanks are the parts that make the layout work: the display mode that creates a grid, the function that repeats the columns, and how we remove the underline since each card is a link.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — add, don't replace",
            body: `<code>globals.css</code> already has starter styles from <code>create-next-app</code>. Scroll to the very bottom and paste these rules <em>after</em> the existing ones.`,
          },
        ],
        docLinks: [
          {
            label: "MDN — CSS Grid layout",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout",
            type: "css-concept",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template: `/* FILE: app/globals.css  (add to the BOTTOM of the file) */

.grid {
  list-style: none;
  padding: 0;
  display: {{display}};
  grid-template-columns: {{repeat}}(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}
.card {
  display: block;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  text-decoration: {{deco}};
  color: inherit;
  transition: box-shadow 0.2s;
}
.card:hover { box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08); }
.card img { width: 56px; border: 1px solid #e2e8f0; border-radius: 4px; }
.card h2 { font-size: 16px; margin: 8px 0 2px; }
.card p { color: #64748b; font-size: 13px; margin: 0; }`,
        gaps: [
          {
            id: "display",
            placeholder: "display mode for a grid",
            acceptedAnswers: ["grid"],
            caseSensitive: false,
          },
          {
            id: "repeat",
            placeholder: "function that repeats columns",
            acceptedAnswers: ["repeat"],
            caseSensitive: false,
          },
          {
            id: "deco",
            placeholder: "remove the link underline",
            acceptedAnswers: ["none"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["display", "repeat", "deco"] } },
      hints: [
        "<code>display: grid;</code> turns the &lt;ul&gt; into a CSS grid container.",
        "<code>repeat(auto-fill, minmax(180px, 1fr))</code> makes as many ~180px columns as fit.",
        "Each card is a &lt;Link&gt;, so <code>text-decoration: none;</code> removes the default underline.",
      ],
    },
    {
      id: "render-the-cards",
      type: "gap-fill",
      instruction: {
        heading: "Part 3 — render the cards (app/page.js)",
        body: `<p>Now the markup. Fill the four blanks in <code>app/page.js</code> below, then copy the finished file over your current one. Each blank is a core React idea you learned this module: the array method that turns data into elements, the special prop every list item needs, the link target, and the JSX expression that shows the name.</p><p>Each country is wrapped in a <code>&lt;Link&gt;</code> (from <code>next/link</code>) pointing at <code>/country/&lt;code&gt;</code> — the detail page you'll build in Part 5. Save and refresh: a real card grid with flags.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "🔧 Your turn",
            body: `Once it works, make the grid yours: change the card colours in <code>globals.css</code>, the column count, or add the capital city to each card (<code>{c.capital?.[0]}</code>).`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Linking and navigating",
            url: "https://nextjs.org/docs/app/getting-started/linking-and-navigating",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template: `// FILE: app/page.js  (replace the whole file)

import Link from "next/link";

const API =
  "https://restcountries.com/v3.1/all?fields=name,flags,cca3,region,population,capital";

export default async function HomePage() {
  const res = await fetch(API);
  if (!res.ok) throw new Error("Failed to load countries");
  const countries = await res.json();
  countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
      <h1>🌍 Country Explorer</h1>
      <ul className="grid">
        {countries.{{map}}((c) => (
          <li {{key}}={c.cca3}>
            <Link className="card" href={"/country/" + {{code}}}>
              <img src={c.flags.svg} alt={"Flag of " + c.name.common} />
              <h2>{{name}}</h2>
              <p>{c.region} · {c.population.toLocaleString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}`,
        gaps: [
          {
            id: "map",
            placeholder: "array method → elements",
            acceptedAnswers: ["map"],
            caseSensitive: true,
          },
          {
            id: "key",
            placeholder: "required list prop",
            acceptedAnswers: ["key"],
            caseSensitive: true,
          },
          {
            id: "code",
            placeholder: "the country code",
            acceptedAnswers: ["c.cca3"],
            caseSensitive: true,
          },
          {
            id: "name",
            placeholder: "show the name in JSX",
            acceptedAnswers: ["{c.name.common}"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["map", "key", "code", "name"] } },
      hints: [
        "<code>countries.map((c) =&gt; …)</code> turns each country object into an &lt;li&gt;.",
        "Every mapped element needs a unique <code>key</code> — here <code>key={c.cca3}</code>.",
        "The link target is <code>\"/country/\" + c.cca3</code>, and the name is the JSX expression <code>{c.name.common}</code> (type the braces).",
      ],
    },
    {
      id: "build-search-component",
      type: "gap-fill",
      instruction: {
        heading: "Part 4 — the search box (app/CountryGrid.js)",
        body: `<p>Search is interactive — it needs <code>useState</code> and <code>onChange</code> — so it must run in the browser. The professional pattern (lesson 10): <strong>the Server Component fetches the data and passes it as a prop to a Client Component</strong> that handles the interactivity. One fetch, no second request.</p><p><strong>Create a new file</strong> <code>app/CountryGrid.js</code> and fill the four blanks: the directive that marks it a browser component, the initial value of the search box state, the array method that narrows the list, and the value you read from the input event.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — fetch on the server, interact on the client",
            body: `Do the heavy data work on the server (fast, secure, no spinner), and push only the small interactive piece to the browser. Passing server data down as props avoids a second client-side fetch entirely.`,
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
      config: {
        type: "gap-fill",
        template: `// FILE: app/CountryGrid.js  (create this new file)

"use {{directive}}";

import { useState } from "react";
import Link from "next/link";

export default function CountryGrid({ countries }) {
  const [query, setQuery] = useState({{initial}});

  const visible = countries.{{filter}}((c) =>
    c.name.common.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        placeholder="Search countries…"
        value={query}
        onChange={(e) => setQuery({{value}})}
        style={{ padding: "8px 12px", maxWidth: 320, width: "100%",
                 borderRadius: 8, border: "1px solid #cbd5e1", marginBottom: 16 }}
      />
      <p>{visible.length} of {countries.length} countries</p>
      <ul className="grid">
        {visible.map((c) => (
          <li key={c.cca3}>
            <Link className="card" href={"/country/" + c.cca3}>
              <img src={c.flags.svg} alt={"Flag of " + c.name.common} />
              <h2>{c.name.common}</h2>
              <p>{c.region} · {c.population.toLocaleString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
        gaps: [
          {
            id: "directive",
            placeholder: "moves it to the browser",
            acceptedAnswers: ["client"],
            caseSensitive: false,
          },
          {
            id: "initial",
            placeholder: "empty string",
            acceptedAnswers: ['""', "''"],
            caseSensitive: false,
          },
          {
            id: "filter",
            placeholder: "array method that narrows",
            acceptedAnswers: ["filter"],
            caseSensitive: true,
          },
          {
            id: "value",
            placeholder: "the typed text",
            acceptedAnswers: ["e.target.value"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["directive", "initial", "filter", "value"] } },
      hints: [
        "<code>\"use client\";</code> at the very top opts this file into the browser so it can use state and events.",
        "Start the search empty: <code>useState(\"\")</code>. Narrow the list with <code>countries.filter(...)</code>.",
        "A controlled input reads its new text from <code>e.target.value</code> in the onChange handler.",
      ],
    },
    {
      id: "use-search-component",
      type: "explanation",
      instruction: {
        heading: "Part 4 — connect search to the page (app/page.js)",
        body: `<p>Now the page just fetches and hands the data to your new component. Back in <code>app/page.js</code>, <strong>replace the whole file</strong> with this slimmer version (it's complete — no blanks). The markup and search logic now live in <code>CountryGrid</code>, so the page is purely "fetch on the server, pass down as a prop."</p><p>Save and refresh. Type in the box — the grid filters instantly, with no network calls, because all the data is already in memory from the single server fetch.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — the import path",
            body: `<code>import CountryGrid from "./CountryGrid";</code> — the <code>./</code> means "in the same folder." Both files live directly inside <code>app/</code>. If you see "module not found," check the filename matches exactly (capital G).`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Passing props to Client Components",
            url: "https://nextjs.org/docs/app/getting-started/server-and-client-components#passing-data-from-server-to-client-components",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// FILE: app/page.js  (replace the whole file)

import CountryGrid from "./CountryGrid";

const API =
  "https://restcountries.com/v3.1/all?fields=name,flags,cca3,region,population,capital";

export default async function HomePage() {
  const res = await fetch(API);
  if (!res.ok) throw new Error("Failed to load countries");
  const countries = await res.json();
  countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
      <h1>🌍 Country Explorer</h1>
      <CountryGrid countries={countries} />
    </main>
  );
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "dynamic-detail-pages",
      type: "gap-fill",
      instruction: {
        heading: "Part 5 — a detail page for every country (app/country/[code]/page.js)",
        body: `<p>Now the second page. <strong>Create the folders and file</strong> <code>app/country/[code]/page.js</code> (the brackets are part of the folder name). The <code>[code]</code> brackets make it a <strong>dynamic route</strong> (lesson 12): one file that serves a page for every country code.</p><p>Fill the three blanks: how you read the URL value (remember, <strong>in Next.js 16 <code>params</code> is a Promise</strong> — this is the gotcha everyone hits), the method that parses the JSON body, and the JSX expression for the capital. Then copy the finished file into your project.</p><p>Click any card on the home page — you should land on its detail page. One file, every country.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — await params, always",
            body: `<code>const { code } = await params;</code> — writing <code>params.code</code> directly throws in Next.js 16. This is the single most common mistake when following older tutorials.`,
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
      config: {
        type: "gap-fill",
        template: `// FILE: app/country/[code]/page.js  (create this new file)

import Link from "next/link";

export default async function CountryPage({ params }) {
  const { code } = {{awaitparams}}; // params is a Promise in Next.js 16

  const res = await fetch(
    "https://restcountries.com/v3.1/alpha/" + code +
    "?fields=name,flags,capital,region,subregion,population,languages"
  );
  if (!res.ok) throw new Error("Country not found"); // -> error.js
  const [country] = await res.{{parse}}(); // /alpha returns an array

  const languages = Object.values(country.languages || {}).join(", ");

  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: 24 }}>
      <Link href="/">← Back to all countries</Link>
      <img src={country.flags.svg} alt={"Flag of " + country.name.common}
           style={{ width: 120, display: "block", margin: "16px 0" }} />
      <h1>{country.name.common}</h1>
      <p><strong>Capital:</strong> {{capital}}</p>
      <p><strong>Region:</strong> {country.region} ({country.subregion})</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Languages:</strong> {languages || "—"}</p>
    </main>
  );
}`,
        gaps: [
          {
            id: "awaitparams",
            placeholder: "params is a Promise…",
            acceptedAnswers: ["await params"],
            caseSensitive: false,
          },
          {
            id: "parse",
            placeholder: "parse the JSON body",
            acceptedAnswers: ["json"],
            caseSensitive: false,
          },
          {
            id: "capital",
            placeholder: "show the capital in JSX",
            acceptedAnswers: ["{country.capital?.[0]}", "{country.capital?.[0] || \"—\"}"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["awaitparams", "parse", "capital"] } },
      hints: [
        "Read the URL value with <code>const { code } = await params;</code> — params is a Promise in Next.js 16.",
        "Parse the response body with <code>await res.json()</code>.",
        "Show the capital with the JSX expression <code>{country.capital?.[0]}</code> (the <code>?.</code> guards the few places with no capital).",
      ],
    },
    {
      id: "add-loading-file",
      type: "explanation",
      instruction: {
        heading: "Part 6 — loading UI (app/country/[code]/loading.js)",
        body: `<p>Real networks are slow. Next.js gives you loading UI through a <strong>special file</strong> (lesson 11) — no state to manage. <strong>Create a new file</strong> <code>app/country/[code]/loading.js</code>, right next to the detail <code>page.js</code> you just wrote. This one's small, so it's complete.</p><p>Next.js shows this component automatically while the detail page fetches, then streams in the page when the data is ready. Test it: click a country and you'll see this text flash before the details appear.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — same folder as the page",
            body: `<code>loading.js</code> must sit in the <em>same folder</em> as the <code>page.js</code> it covers — here, inside <code>app/country/[code]/</code>. It automatically wraps that page in a loading boundary.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — loading.js convention",
            url: "https://nextjs.org/docs/app/api-reference/file-conventions/loading",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// FILE: app/country/[code]/loading.js  (create this new file)

export default function Loading() {
  return <p style={{ padding: 24 }}>Loading country…</p>;
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "add-error-file",
      type: "gap-fill",
      instruction: {
        heading: "Part 6 — error UI (app/country/[code]/error.js)",
        body: `<p>And failures. An <strong>error file</strong> is an automatic error boundary for that route. <strong>Create a new file</strong> <code>app/country/[code]/error.js</code> and fill its two blanks: the directive it needs (error boundaries are interactive, so they run in the browser) and the prop you call to retry rendering.</p><p>Test it with a bogus code like <code>/country/zzz</code> — the page's <code>throw new Error</code> fires and this renders instead of a crash, with a working "Try again" button.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — honest, accessible states",
            body: `Together, <code>loading.js</code> and <code>error.js</code> give every visitor a clear answer at every moment — "loading…", the content, or "something went wrong, retry" — instead of a frozen or blank screen. That's the three-state principle from lesson 3, enforced across a whole route.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — error.js convention",
            url: "https://nextjs.org/docs/app/api-reference/file-conventions/error",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template: `// FILE: app/country/[code]/error.js  (create this new file)

"use {{directive}}"; // error boundaries must be client components

export default function Error({ error, reset }) {
  return (
    <main style={{ padding: 24 }}>
      <h1>Couldn’t load that country</h1>
      <p style={{ color: "#64748b" }}>{error.message}</p>
      <button onClick={{{retry}}}>Try again</button>
    </main>
  );
}`,
        gaps: [
          {
            id: "directive",
            placeholder: "browser directive",
            acceptedAnswers: ["client"],
            caseSensitive: false,
          },
          {
            id: "retry",
            placeholder: "function that retries",
            acceptedAnswers: ["reset"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["directive", "retry"] } },
      hints: [
        "Error boundaries are interactive, so the file starts with <code>\"use client\";</code>.",
        "Next.js passes a <code>reset</code> function in — wire it to the button: <code>onClick={reset}</code> (type the braces).",
      ],
    },
    {
      id: "deploy",
      type: "explanation",
      instruction: {
        heading: "Part 7 — deploy it live (terminal + browser)",
        body: `<p>Your dashboard works on your machine — now put it on the internet. The smoothest path is <strong>GitHub → Vercel</strong> (Vercel makes Next.js, so it's a two-click deploy).</p><ol><li>Create a new repository on <a href="https://github.com/new">github.com/new</a> (no README — your project has its files already).</li><li>In your project <strong>terminal</strong>, run the commands below to push your code up.</li><li>On <a href="https://vercel.com/new">vercel.com/new</a>, "Import" your new repo and click <strong>Deploy</strong>. In about a minute you'll get a live URL like <code>country-explorer.vercel.app</code>.</li></ol><p>Share the link — anyone can browse and search your dashboard. From now on, every <code>git push</code> redeploys automatically.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — set the remote URL to yours",
            body: `Replace <code>YOUR-USERNAME</code> in the <code>git remote add</code> line with your real GitHub username and repo name — GitHub shows the exact command on your new empty repo's page.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Deploying to Vercel",
            url: "https://nextjs.org/docs/app/getting-started/deploying",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `# --- Run these in your TERMINAL, inside the project folder ---
# (create-next-app already ran 'git init' for you)

git add -A
git commit -m "Country Explorer dashboard"

# Connect your GitHub repo and push (use YOUR repo URL):
git remote add origin https://github.com/YOUR-USERNAME/country-explorer.git
git branch -M main
git push -u origin main

# Then import the repo at https://vercel.com/new and click Deploy.`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "make-it-yours",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: make it yours",
        body: `<p>You've shipped a real, multi-page, data-driven dashboard. Now extend it — each idea reuses a skill from this module. Sketch your approach in the editor below (it's a scratchpad — write notes or pseudo-code), then build it in your real project:</p><ul><li><strong>Region filter:</strong> add buttons (Africa, Europe, Asia…) that filter the grid — pure client-side, no refetch needed since you have all countries.</li><li><strong>Sort toggle:</strong> sort by population or alphabetically.</li><li><strong>Pre-build detail pages:</strong> add <code>generateStaticParams</code> to <code>[code]/page.js</code> so popular countries are built ahead of time (lesson 12).</li><li><strong>Border countries:</strong> on the detail page, the API's <code>borders</code> field lists neighbour codes — render them as links to <em>their</em> detail pages.</li><li><strong>Skeletons:</strong> replace the loading text with a grid of shimmering skeleton cards (lesson 5).</li></ul><p>There's no single right answer. Pick one, ship it, then pick another. That's how real projects grow.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — you've learned the whole journey",
            body: `From <code>useEffect</code> fetching to Server Components, dynamic routes, and a live deploy — you can now build the data layer of a real web app. The next step is making those fetches production-grade with a library like TanStack Query (lesson 9).`,
          },
        ],
        docLinks: [
          {
            label: "REST Countries — all fields & endpoints",
            url: "https://restcountries.com/#endpoints-all",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "free-edit",
        language: "javascript",
        starterCode: `// Scratchpad — plan your extension before building it in your project.
//
// Pick one feature and outline the steps. Example:
//
// FEATURE: Region filter buttons
// 1. Add state in CountryGrid:  const [region, setRegion] = useState("All");
// 2. Render a row of buttons: All, Africa, Americas, Asia, Europe, Oceania
// 3. In the filter, also check:  (region === "All" || c.region === region)
// 4. Combine with the existing search filter.
//
// YOUR PLAN:
//
`,
        expectedOutput: "A plan for one extension to your dashboard.",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "The region filter is the easiest win — you already have every country in memory, so it's a pure client-side filter.",
        "For generateStaticParams, return an array of objects like <code>[{ code: \"usa\" }, { code: \"ken\" }]</code> — just the URL codes.",
        "Border countries: the /alpha detail response includes a <code>borders</code> array of codes; map each to a <code>&lt;Link href={\"/country/\" + b}&gt;</code>.",
      ],
    },
  ],
};
