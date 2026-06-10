import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "nextjs-beginners-styling-and-assets",
  slug: "styling-and-assets",
  title: "Styling and Static Assets",
  description:
    "Add CSS with global styles and CSS Modules, serve images from the public folder, and use next/image for automatic optimization.",
  order: 11,
  steps: [
    {
      id: "css-options",
      type: "explanation",
      instruction: {
        heading: "Global CSS and CSS Modules",
        body: `<p>You already know CSS — Next.js just gives it a home. There are two common ways to style an app:</p><ul><li><strong>Global CSS</strong> — rules that apply everywhere. <code>create-next-app</code> made <code>app/globals.css</code>, and the root <code>layout.js</code> imports it with <code>import "./globals.css"</code>. Put resets and site-wide styles here.</li><li><strong>CSS Modules</strong> — styles <em>scoped to one component</em>. Name a file <code>something.module.css</code>, import it as an object, and use its class names like <code>className={styles.title}</code>. Next.js renames the classes behind the scenes so they can never clash with another component's.</li></ul><p>CSS Modules solve the oldest headache in CSS: two components both defining <code>.title</code> and accidentally overriding each other. With modules, each component's styles stay private.</p>`,
        analogy: `Global CSS is the house's central thermostat — it affects every room. A CSS Module is a space heater in one room — it only changes that room, no matter what the other rooms do.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: `Global CSS can only be imported in the root <code>layout.js</code>. CSS Modules (<code>*.module.css</code>) can be imported into any component file — and they compile to plain, standard CSS class names, just uniquely generated so they don't collide.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — CSS",
            url: "https://nextjs.org/docs/app/getting-started/css",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `/* app/page.module.css  —  styles scoped to one component */
.title {
  font-size: 32px;
  color: #0070f3;
}

// app/page.js  —  import the module and use its classes
import styles from "./page.module.css";

export default function Page() {
  return <h1 className={styles.title}>Styled with a CSS Module</h1>;
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "assets-images",
      type: "explanation",
      instruction: {
        heading: "Images and the public folder",
        body: `<p>Static files — images, icons, downloadable PDFs — go in the <code>public/</code> folder. Anything there is served from the site root: <code>public/logo.png</code> is reachable at <code>/logo.png</code>.</p><p>For images, Next.js gives you the <code>&lt;Image&gt;</code> component from <code>next/image</code>. It works like a normal <code>&lt;img&gt;</code> but automatically optimizes the file — resizing it, serving modern formats, and lazy-loading off-screen images — which makes pages noticeably faster. You give it a <code>src</code>, <code>alt</code>, and a <code>width</code>/<code>height</code>.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — the leading slash",
            body: `Reference public assets with a leading slash from the site root: <code>src="/logo.png"</code>, not <code>"logo.png"</code> or <code>"./public/logo.png"</code>. The <code>public</code> folder name never appears in the URL.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Images",
            url: "https://nextjs.org/docs/app/getting-started/images",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// Put the file at: public/logo.png
import Image from "next/image";

export default function Page() {
  return (
    <Image src="/logo.png" alt="My logo" width={120} height={40} />
  );
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "styling-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: style a component with a module",
        body: `<p>Write a component that imports a CSS Module and applies one of its classes. <code>import styles from "./page.module.css"</code>, then use <code>className={styles.something}</code> on an element. Paste it below, and create the matching <code>.module.css</code> file in your project to see it styled.</p>`,
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode: `// app/page.js
import styles from "./page.module.css";

export default function Page() {
  return (
    <main>
      {/* Use className={styles.title} on a heading */}
    </main>
  );
}`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["module.css", "className", "styles."] },
      },
      hints: [
        'Heading: <code>&lt;h1 className={styles.title}&gt;Hello&lt;/h1&gt;</code>, with a <code>.title</code> rule in page.module.css.',
      ],
    },
  ],
};
