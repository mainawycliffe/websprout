import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "nextjs-beginners-dynamic-routes",
  slug: "dynamic-routes",
  title: "Dynamic Routes: One File for Many Pages",
  description:
    "A blog with 500 posts shouldn't be 500 folders. Use [slug] to build one page template that serves an unlimited number of URLs.",
  order: 14,
  steps: [
    {
      id: "why-dynamic",
      type: "explanation",
      instruction: {
        heading: "One template, unlimited pages",
        body: `<p>You know that <code>app/about/page.js</code> makes the <code>/about</code> page. But imagine a blog with 500 posts, or a shop with 10,000 products. Making a folder for each — <code>app/blog/my-first-post/</code>, <code>app/blog/another-post/</code> … 500 times — would be madness.</p><p>Instead, you write <strong>one</strong> page and let the URL fill in the blank. Name a folder with <strong>square brackets</strong> — <code>[slug]</code> — and it becomes a <strong>dynamic segment</strong> that matches <em>any</em> value. So <code>app/blog/[slug]/page.js</code> serves <code>/blog/my-first-post</code>, <code>/blog/hello-world</code>, and every other <code>/blog/anything</code> — all from a single file.</p><p>This is how every real content site works: Wikipedia, YouTube, Amazon, and Medium all serve millions of pages from a handful of dynamic templates. The page is one file; the <em>data</em> changes per URL.</p>`,
        analogy: `A dynamic route is a fill-in-the-blank form letter: "Dear ____, thanks for your order." You write the letter once; the blank gets filled with a different name each time it's sent. <code>[slug]</code> is that blank.`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — slug is just a name",
            body: `The word inside the brackets is the <em>variable name</em> you'll read later, and you choose it. <code>[slug]</code>, <code>[id]</code>, <code>[productId]</code> all work — pick whatever describes the value. <code>[slug]</code> is the common choice for human-readable text in a URL.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Dynamic routes",
            url: "https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `app/
└── blog/
    └── [slug]/
        └── page.js     ← ONE file serves every /blog/... URL

// /blog/my-first-post   → slug = "my-first-post"
// /blog/hello-world      → slug = "hello-world"
// /blog/anything-at-all  → slug = "anything-at-all"

// Want to match MANY segments at once?
//   [...slug]    → catch-all: /blog/2024/03/post
//   [[...slug]]  → optional catch-all: also matches /blog`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "reading-params",
      type: "explanation",
      instruction: {
        heading: "Reading the value with params",
        body: `<p>Great — the URL matches. But how does your page know <em>which</em> post to show? Next.js hands every dynamic page a <code>params</code> prop containing the filled-in values. For <code>app/blog/[slug]/page.js</code>, visiting <code>/blog/hello-world</code> gives you <code>{ slug: "hello-world" }</code>.</p><p>One important detail for modern Next.js: <strong><code>params</code> is asynchronous</strong>. It arrives as a Promise, so you make your page an <code>async</code> function and <code>await</code> it:</p><p>Read the slug, then use it to fetch and display the right content. The same page renders for every post — only the data changes.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — params is a Promise in Next.js 16",
            body: `In current Next.js, <code>params</code> (and <code>searchParams</code>) are <strong>Promises</strong> — you must <code>await</code> them: <code>const { slug } = await params;</code>. The old synchronous form (<code>params.slug</code> with no await) is from Next.js 14 and earlier and is being removed. Always write the <code>async</code>/<code>await</code> version.`,
          },
          {
            variant: "tip",
            title: "Tip — TypeScript gets it for free",
            body: `If you use TypeScript, Next.js gives you a global <code>PageProps</code> helper typed from your route: <code>function Page(props: PageProps&lt;'/blog/[slug]'&gt;)</code> — then <code>await props.params</code> is fully typed. No manual interfaces needed.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — page.js params",
            url: "https://nextjs.org/docs/app/api-reference/file-conventions/page",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// app/blog/[slug]/page.js
export default async function BlogPostPage({ params }) {
  // params is a Promise — await it to read the value
  const { slug } = await params;

  return (
    <main>
      <h1>Post: {slug}</h1>
      <p>You are reading the "{slug}" article.</p>
    </main>
  );
}

// Visit /blog/hello-world  →  <h1>Post: hello-world</h1>`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "dynamic-routes-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: build a dynamic product page",
        body: `<p>Create <code>app/products/[id]/page.js</code> — one template that serves every product URL like <code>/products/42</code> or <code>/products/socks</code>. Make the component <code>async</code>, <code>await params</code> to read the <code>id</code>, and show it in a heading. Paste your version below.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: `Remember the two halves: the <strong>folder</strong> name in brackets (<code>[id]</code>) creates the dynamic URL, and <strong><code>await params</code></strong> inside the component reads the value.`,
          },
        ],
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode: `// app/products/[id]/page.js
export default async function ProductPage({ params }) {
  // await params, pull out id, then show it in an <h1>

  return (
    <main>
      {/* show the product id here */}
    </main>
  );
}`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["await params", "export default"] },
      },
      hints: [
        "Inside the function: <code>const { id } = await params;</code>",
        "Then render it: <code>&lt;h1&gt;Product {id}&lt;/h1&gt;</code>",
      ],
    },
  ],
};
