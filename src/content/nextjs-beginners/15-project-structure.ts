import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "nextjs-beginners-project-structure",
  slug: "project-structure",
  title: "Structuring a Growing App: src/, components & lib",
  description:
    "Pull it all together: where shared code lives, the optional src/ folder, the @/ import shortcut, and how to pick a structure that scales.",
  order: 15,
  steps: [
    {
      id: "shared-folders",
      type: "explanation",
      instruction: {
        heading: "Folders for the code you reuse everywhere",
        body: `<p>Colocation is perfect for files used by <em>one</em> route. But a <code>&lt;Button&gt;</code> or a <code>formatPrice()</code> helper gets used <em>all over</em> the app. Stashing those inside one route's folder makes no sense — they need a shared home.</p><p>The community has settled on a handful of folder names for this. None of them are magic to Next.js — they're just conventions — but using the expected names makes your project instantly familiar to other developers:</p><ul><li><code>components/</code> — reusable UI pieces (<code>Button</code>, <code>Navbar</code>, <code>Card</code>).</li><li><code>lib/</code> — helper functions and shared logic (API clients, formatters).</li><li><code>hooks/</code> — your custom React hooks (<code>useUser</code>, <code>useCart</code>).</li><li><code>utils/</code> — small pure helpers (<code>slugify</code>, <code>clamp</code>).</li><li><code>styles/</code> — shared CSS files.</li></ul><p>You don't need all of these — start with <code>components/</code> and <code>lib/</code> and add more only when a folder gets crowded.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — these names have no framework meaning",
            body: `Next.js doesn't care whether you call it <code>lib/</code>, <code>utils/</code>, or <code>helpers/</code> — only the special routing files (<code>page</code>, <code>layout</code>, etc.) inside <code>app/</code> are reserved. Everything else is your choice. The win is <em>consistency</em>, not a specific name.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Organizing your project",
            url: "https://nextjs.org/docs/app/getting-started/project-structure",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `my-app/
├── app/                ← routes (pages & layouts)
├── components/         ← reusable UI: Button.js, Navbar.js
├── lib/               ← shared logic: api.js, formatPrice.js
├── hooks/             ← custom hooks: useUser.js
└── public/             ← images & static files`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "src-folder",
      type: "explanation",
      instruction: {
        heading: "The optional src/ folder",
        body: `<p>As a project grows, the project root fills up with <em>config</em> files — <code>package.json</code>, <code>next.config.js</code>, <code>tsconfig.json</code>, <code>.gitignore</code> — mixed in with your <em>code</em> folders. It gets noisy.</p><p>Next.js offers a tidy fix: an optional <strong><code>src/</code> folder</strong>. Move <code>app/</code> and your code folders (<code>components/</code>, <code>lib/</code>, …) inside <code>src/</code>, and the config files stay at the root. Now there's a clean line: <strong>config at the root, your code in <code>src/</code></strong>.</p><p>This is opt-in — <code>create-next-app</code> asks whether you want it. (In fact, the very app you're learning in uses a <code>src/</code> folder.) Both layouts are equally valid; it's about which feels cleaner to you.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — public/ stays at the root",
            body: `Even with <code>src/</code>, the <code>public/</code> folder and config files remain at the project root. Only <code>app/</code> and your source code move inside <code>src/</code>.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — src folder",
            url: "https://nextjs.org/docs/app/api-reference/file-conventions/src-folder",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `my-app/
├── package.json        ← config stays at the root
├── next.config.js
├── tsconfig.json
├── public/             ← static assets stay at the root
└── src/                ← all your CODE lives here
    ├── app/
    ├── components/
    └── lib/`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "import-alias",
      type: "explanation",
      instruction: {
        heading: "The @/ import shortcut",
        body: `<p>Once your files are nested in folders, relative imports get ugly fast: <code>import Button from "../../../components/Button"</code>. Count the dots wrong and it breaks. Move the file and they all break.</p><p><code>create-next-app</code> sets up a shortcut to fix this: the <strong><code>@/</code> alias</strong>, which always points at the root of your code. So no matter how deeply nested the current file is, you write <code>import Button from "@/components/Button"</code> — clean, stable, and the same from everywhere.</p><p>It's configured once in <code>tsconfig.json</code> (or <code>jsconfig.json</code>) under <code>paths</code>. With a <code>src/</code> folder, <code>@/</code> maps to <code>./src/</code> — which is exactly how this app is set up.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — @/ beats counting ../",
            body: `Prefer <code>@/lib/formatPrice</code> over <code>../../lib/formatPrice</code>. Absolute-style aliases don't change when you move a file, so refactoring stops breaking your imports.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Absolute imports & module aliases",
            url: "https://nextjs.org/docs/app/getting-started/installation",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// tsconfig.json (set up by create-next-app)
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]   // @/ → your code root
    }
  }
}

// Anywhere in the app, no matter how nested:
import Button from "@/components/Button";
import { formatPrice } from "@/lib/formatPrice";`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "strategies",
      type: "explanation",
      instruction: {
        heading: "Three strategies — and the one rule that matters",
        body: `<p>So where should everything actually go? The Next.js docs describe three common strategies, and <strong>all of them are valid</strong>:</p><ol><li><strong>Code outside <code>app/</code></strong> — keep <code>app/</code> purely for routing, and put all shared code in top-level <code>components/</code>, <code>lib/</code>, etc. (optionally under <code>src/</code>). Clean separation of "routes" vs "everything else."</li><li><strong>Code in top-level folders inside <code>app/</code></strong> — put <code>app/components/</code>, <code>app/lib/</code> alongside your routes. Everything lives under <code>app/</code>.</li><li><strong>Split by feature/route</strong> — keep truly global code at the top, but <a href="/nextjs-beginners/colocation">colocate</a> route-specific code inside each route folder. Best for large apps.</li></ol><p>The single most important takeaway: <strong>pick one strategy and be consistent.</strong> A predictable structure where teammates can guess where a file lives beats any "perfect" layout that's applied haphazardly.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — Next.js is unopinionated here",
            body: `Next.js deliberately doesn't force a structure on you. That freedom means the responsibility is yours: choose a convention early, write it down for your team, and apply it everywhere. Consistency is the real best practice.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Project organization strategies",
            url: "https://nextjs.org/docs/app/getting-started/project-structure",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// Strategy 1 — code outside app/
src/
├── app/            (routes only)
├── components/
└── lib/

// Strategy 2 — code inside app/
src/app/
├── components/
├── lib/
└── dashboard/page.js

// Strategy 3 — split: global up top, route-specific colocated
src/
├── components/             (shared everywhere)
└── app/dashboard/
    ├── _components/Chart.js  (only /dashboard uses it)
    └── page.js`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "structure-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: a shared helper, imported with @/",
        body: `<p>Put it together. Imagine a shared helper at <code>lib/formatDate.js</code> that <code>export</code>s a <code>formatDate</code> function. Below, write a page that <strong>imports it using the <code>@/</code> alias</strong> (not a pile of <code>../</code>) and uses it.</p><p>This is the everyday payoff of a good structure: shared code in <code>lib/</code>, reached cleanly from anywhere with <code>@/lib/...</code>.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `Use a <em>named</em> import for a named export: <code>import { formatDate } from "@/lib/formatDate";</code>.`,
          },
        ],
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode: `// app/page.js
// import formatDate from lib using the @/ alias, then call it.

export default function HomePage() {
  return (
    <main>
      {/* e.g. <p>{formatDate(new Date())}</p> */}
    </main>
  );
}`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["@/lib", "import"] },
      },
      hints: [
        "At the top: <code>import { formatDate } from \"@/lib/formatDate\";</code>",
        "Then call it inside the JSX, e.g. <code>&lt;p&gt;{formatDate(new Date())}&lt;/p&gt;</code>",
      ],
    },
  ],
};
