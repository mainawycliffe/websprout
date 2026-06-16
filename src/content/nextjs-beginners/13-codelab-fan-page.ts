import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "nextjs-beginners-codelab-fan-page",
  slug: "codelab-fan-page",
  title: "Codelab: Build & Deploy a Fan Page",
  description:
    "A guided 2–3 hour project. Scaffold a Next.js app, build a customizable fan page from your own data, refactor it into reusable components, style it with CSS Modules, and deploy it live to the web.",
  order: 13,
  steps: [
    {
      id: "fan-brief",
      type: "explanation",
      instruction: {
        heading: "What you'll build",
        body: `<p>Set aside <strong>2–3 hours</strong> for this one. You'll go from an empty folder to a real, multi-page website that's <strong>deployed live on the internet</strong> — a <em>fan page</em> about something you love: games, movies, sneakers, recipes, a football club, anything.</p><p>Because you fill in your own topic, your own list, and your own colours, <strong>no two people build the same site</strong>. Watch for <strong>🔧 Your turn</strong> boxes — that's where you make it yours.</p><p>Two habits run through the whole codelab: <strong>formatting your code</strong> (we'll automate it) and <strong>refactoring into reusable components</strong>. Build each piece in your real project, keep <code>npm run dev</code> running, and check the browser after every step.</p><p>📚 New to a concept along the way? Each step links to the matching lesson. If you've finished <a href="/nextjs-beginners/what-is-nextjs">this module</a> already, you're more than ready.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — work in your real project",
            body: `Keep two windows side by side: this lesson, and your project in VS Code with <code>npm run dev</code> running. The code blocks in each step are your reference — type them into your own files and watch the browser update.`,
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fan-tools",
      type: "explanation",
      instruction: {
        heading: "Part 0 — get your tools ready",
        body: `<p>Before writing code, get three tools and two accounts in place:</p><ul><li><strong>Node.js</strong> (version <strong>20.9 or newer</strong>) from <a href="https://nodejs.org">nodejs.org</a> — installing it also gives you <strong>npm</strong>.</li><li><strong>VS Code</strong> from <a href="https://code.visualstudio.com">code.visualstudio.com</a> — your editor.</li><li>Free <a href="https://github.com">GitHub</a> and <a href="https://vercel.com">Vercel</a> accounts — for the live deploy at the end. Sign up for Vercel <em>with</em> GitHub to make Part 10 easy.</li></ul><p>Open a terminal (PowerShell on Windows, Terminal on Mac) and confirm Node and npm are installed.</p><p>📚 More on WebSprout: <a href="/nextjs-beginners/installing-node-npm">Installing Node and npm</a>.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — we use npm",
            body: `Every command in this codelab uses <strong>npm</strong> (it comes with Node). If you've heard of yarn, pnpm, or bun — ignore them for now and type the npm commands exactly as written.`,
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `# Check your versions (you need Node 20.9 or newer):
node -v
npm -v

# If you see "command not found", restart the terminal
# (or your computer) after installing Node, then try again.`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fan-create",
      type: "explanation",
      instruction: {
        heading: "Part 1 — create your app",
        body: `<p>In the terminal, move to where your projects live (your Desktop is fine), then run <code>create-next-app</code>. The flags below pick the simplest setup for a first project: <strong>JavaScript</strong> (not TypeScript), <strong>plain CSS</strong> (no Tailwind), ESLint, and the App Router.</p><p>📚 More on WebSprout: <a href="/nextjs-beginners/create-next-app">Scaffolding with create-next-app</a>.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — if it still asks questions",
            body: `Depending on your version it may ask a question or two. Press Enter to accept defaults. If it asks <em>"Would you like to include AGENTS.md?"</em> you can choose <strong>No</strong> — that file is for AI tools, not for us.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — create-next-app reference",
            url: "https://nextjs.org/docs/app/api-reference/cli/create-next-app",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `# Move to where your projects live (e.g. the Desktop):
cd Desktop

# Create the app in one command:
npx create-next-app@latest my-fan-page --js --no-tailwind --eslint --app --use-npm

#   my-fan-page   -> your project folder name
#   --js          -> use JavaScript (simpler than TypeScript to start)
#   --no-tailwind -> skip Tailwind; we'll write real CSS
#   --eslint      -> add ESLint to catch mistakes
#   --app         -> use the modern App Router
#   --use-npm     -> install with npm`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fan-run-tour",
      type: "explanation",
      instruction: {
        heading: "Part 1 — run it and tour the project",
        body: `<p>Move into the new folder, open it in VS Code, and start the development server. Then open <a href="http://localhost:3000">http://localhost:3000</a> — you should see the default Next.js welcome page. 🎉</p><p>In the VS Code sidebar, find your bearings:</p><ul><li><code>app/</code> — your website lives here; each folder becomes a page.</li><li><code>app/page.js</code> — the home page (the <code>/</code> route).</li><li><code>app/layout.js</code> — the shared frame wrapped around every page.</li><li><code>app/globals.css</code> — site-wide styles.</li><li><code>public/</code> — images and files served as-is.</li></ul><p>📚 More on WebSprout: <a href="/nextjs-beginners/project-tour">A Tour of Your Project</a>.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — keep it running",
            body: `Leave <code>npm run dev</code> running the whole time; it refreshes the browser every time you save. Press <strong>Ctrl+C</strong> to stop it. If a command fails with "could not find package.json", you're in the wrong folder — <code>cd my-fan-page</code> and try again.`,
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `cd my-fan-page
code .          # opens the current folder in VS Code
npm run dev     # then open http://localhost:3000`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fan-formatting",
      type: "explanation",
      instruction: {
        heading: "Part 1 — set up automatic formatting",
        body: `<p>Let's make VS Code <strong>clean up your code every time you save</strong> — a habit real developers rely on.</p><ol><li>Open the <strong>Extensions</strong> panel (the squares icon, or <code>Ctrl+Shift+X</code> / <code>Cmd+Shift+X</code>) and install <strong>Prettier - Code formatter</strong> (id <code>esbenp.prettier-vscode</code>).</li><li>Create a file <code>.vscode/settings.json</code> at the top of your project with the contents below.</li><li>Test it: open <code>app/page.js</code>, mess up the indentation on purpose, then save (<code>Ctrl+S</code> / <code>Cmd+S</code>) and watch it snap back.</li></ol><p>You can also format any file manually with <strong>Shift+Alt+F</strong> (Windows/Linux) or <strong>⇧⌥F</strong> (Mac).</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Prettier vs ESLint",
            body: `<strong>Prettier</strong> handles <em>formatting</em> — indentation, quotes, spacing (how code looks). <strong>ESLint</strong> (added by <code>--eslint</code>) catches <em>mistakes</em> — run it any time with <code>npm run lint</code>. They're a team. From here on, whenever a step says "save", Prettier formats your file for you.`,
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// .vscode/settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}`,
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fan-hero",
      type: "explanation",
      instruction: {
        heading: "Part 2 — build your hero",
        body: `<p>Open <code>app/page.js</code>, delete everything, and write a <strong>hero</strong> — the big headline at the top. Then replace <code>app/globals.css</code> with some basic resets and typography. Save and check the browser.</p><p>A few things to notice: <code>export default function Home()</code> defines a <strong>component</strong> (a function that returns what the screen looks like). The HTML-looking code inside <code>return ( ... )</code> is <strong>JSX</strong>. A component must return <em>one</em> outer element — here everything sits inside one <code>&lt;main&gt;</code>.</p><p>📚 More on WebSprout: <a href="/nextjs-beginners/app-router-pages-layouts">page.js and layout.js</a> and the <a href="/box-model">Box Model</a> for CSS basics.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "🔧 Your turn",
            body: `This is the first big choice: <strong>what is your fan page about?</strong> Change the <code>&lt;h1&gt;</code>, the <code>&lt;p&gt;</code>, and the emoji to your topic. Everything else in this codelab builds on this.`,
          },
          {
            variant: "tip",
            title: "Tip — JSX quirks",
            body: `In JSX every tag must close (<code>&lt;br /&gt;</code>, not <code>&lt;br&gt;</code>), and you write <code>className="..."</code> instead of <code>class="..."</code>. The editor warns you if you forget.`,
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// app/page.js
export default function Home() {
  return (
    <main>
      <h1>🎮 My Favorite Video Games</h1>
      <p>A few games I could play forever — and why they're worth your time.</p>
    </main>
  );
}

/* app/globals.css */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  color: #1a1a2e;
  background: #f6f7fb;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fan-data",
      type: "explanation",
      instruction: {
        heading: "Part 3 — add your data",
        body: `<p>A fan page is a <em>list</em> of things you love. Instead of hard-coding each one into the page, store them as <strong>data</strong> — exactly how real sites work. Create a new file <code>app/data.js</code> with an array of items.</p><p>Each <code>{ ... }</code> is an <strong>object</strong> with named fields. The <code>id</code> must be <strong>unique</strong> for each item — you'll see why in the next step.</p><p>📚 More on WebSprout: <a href="/js-data-types">Data Explorer</a> (arrays &amp; objects).</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "🔧 Your turn",
            body: `Replace these with <strong>your own</strong> favourites — at least three, more if you like. Keep the field names (<code>id</code>, <code>name</code>, <code>blurb</code>, <code>rating</code>, <code>emoji</code>) the same, but the values are all yours. Give every item a different <code>id</code>.`,
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// app/data.js
export const items = [
  {
    id: 1,
    name: "The Legend of Zelda: Breath of the Wild",
    blurb: "An open world that begs to be explored in every direction.",
    rating: 5,
    emoji: "🗡️",
  },
  {
    id: 2,
    name: "Hollow Knight",
    blurb: "A gorgeous, lonely world with combat that feels incredible.",
    rating: 5,
    emoji: "🐛",
  },
  {
    id: 3,
    name: "Stardew Valley",
    blurb: "Run a farm, befriend a town, lose track of time. Pure comfort.",
    rating: 4,
    emoji: "🌾",
  },
];`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fan-cards-inline",
      type: "explanation",
      instruction: {
        heading: "Part 4 — show your cards",
        body: `<p>Now turn that data into a grid of cards — the <em>quick</em> way first, directly inside <code>page.js</code>. Update the file to loop over your data and render one card per item.</p><p>What's happening: <code>{items.map((item) => ( ... ))}</code> runs once <strong>per item</strong> and produces one <code>&lt;article&gt;</code> each — that's how you turn a list of data into a list of UI. <code>{item.name}</code> drops a value into the markup. And <code>key={item.id}</code> gives each card a unique label React needs to track it.</p><p>Notice how <code>page.js</code> is getting <strong>long and crowded</strong> — all the card markup is jammed into the page. That's intentional; we'll fix it next.</p><p>📚 More on WebSprout: <a href="/js-functions">Function Factory</a> (<code>.map()</code> &amp; arrow functions).</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — always add a key",
            body: `Forgetting <code>key={item.id}</code> when you <code>.map()</code> is the #1 beginner mistake here — you'll see a warning in the browser console. That's why each item needed a unique <code>id</code>.`,
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// app/page.js
import { items } from "./data";

export default function Home() {
  return (
    <main>
      <h1>🎮 My Favorite Video Games</h1>
      <p>A few games I could play forever — and why they're worth your time.</p>

      <div className="grid">
        {items.map((item) => (
          <article className="card" key={item.id}>
            <div className="emoji">{item.emoji}</div>
            <h2>{item.name}</h2>
            <p>{item.blurb}</p>
            <p className="stars">{"⭐".repeat(item.rating)}</p>
          </article>
        ))}
      </div>
    </main>
  );
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fan-refactor-extract",
      type: "explanation",
      instruction: {
        heading: "Part 5 — refactor into components ⭐",
        body: `<p>This is the most important skill in the whole codelab. Professional apps are built from small, reusable pieces called <strong>components</strong>. We'll <strong>refactor</strong> — restructure without changing what the user sees — by pulling the card and hero into their own files.</p><p>Make a new folder <code>app/components/</code> and create the three files below. See <code>{ name, blurb, rating, emoji }</code> in <code>Card</code>'s parentheses? Those are <strong>props</strong> — the inputs a component receives. Instead of reaching into <code>item.name</code>, the card just expects to be <em>handed</em> the values, which makes it reusable.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — capital letters matter",
            body: `A component's name <strong>must</strong> start with a capital letter (<code>Card</code>, not <code>card</code>). That's how React tells your components apart from regular HTML tags like <code>&lt;article&gt;</code>.`,
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// app/components/Card.js
export default function Card({ name, blurb, rating, emoji }) {
  return (
    <article className="card">
      <div className="emoji">{emoji}</div>
      <h2>{name}</h2>
      <p>{blurb}</p>
      <p className="stars">{"⭐".repeat(rating)}</p>
    </article>
  );
}

// app/components/CardGrid.js
import Card from "./Card";

export default function CardGrid({ items }) {
  return (
    <div className="grid">
      {items.map((item) => (
        <Card
          key={item.id}
          name={item.name}
          blurb={item.blurb}
          rating={item.rating}
          emoji={item.emoji}
        />
      ))}
    </div>
  );
}

// app/components/Hero.js
export default function Hero({ title, tagline }) {
  return (
    <header className="hero">
      <h1>{title}</h1>
      <p>{tagline}</p>
    </header>
  );
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fan-refactor-compose",
      type: "explanation",
      instruction: {
        heading: "Part 5 — compose your page",
        body: `<p>Now <code>page.js</code> becomes wonderfully short — it just <strong>composes</strong> the components. Update it to import and use them. Save: the page looks <em>exactly the same</em> in the browser, but the code is clean, named, and reusable. That's a successful refactor. 🎯</p><p>📚 More on WebSprout: <a href="/react-fundamentals">React Fundamentals</a> (components &amp; props) and <a href="/modern-js">Modern JavaScript</a> (import/export).</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Additional info — everything about components",
            body: `<ul><li><strong>What is a component?</strong> A function that returns JSX, named with a Capital letter.</li><li><strong>Props</strong> pass data <em>into</em> a component, like attributes on a tag: <code>&lt;Card name="..." rating={5} /&gt;</code>. One <code>Card</code> can render a hundred different cards.</li><li><strong>One component per file</strong>, and <code>export default</code> it so others can <code>import</code> it. Forget either and you get an error — the most common refactoring slip.</li><li><strong>The <code>key</code> prop</strong> goes on the element you repeat in <code>.map()</code> (<code>&lt;Card key={item.id} /&gt;</code>), not inside the card.</li><li><strong>When to extract?</strong> When markup <em>repeats</em>, a piece deserves a <em>name</em>, or a file gets <em>long</em>. All three were true a minute ago.</li></ul>`,
          },
          {
            variant: "tip",
            title: "🔧 Your turn",
            body: `Add a new field to your data (say <code>year</code> or <code>genre</code>), then add a matching prop to <code>Card</code> and display it. You edit <code>Card</code> <strong>once</strong> and every card updates — that's the power of components.`,
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// app/page.js
import { items } from "./data";
import Hero from "./components/Hero";
import CardGrid from "./components/CardGrid";

export default function Home() {
  return (
    <main>
      <Hero
        title="🎮 My Favorite Video Games"
        tagline="A few games I could play forever — and why they're worth your time."
      />
      <CardGrid items={items} />
    </main>
  );
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fan-refactor-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: your Card component",
        body: `<p>Paste your finished <code>Card</code> component below. It should take props in the function's parentheses and <code>return</code> the card's JSX. This confirms you've got the shape of a reusable component down before we style it.</p>`,
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode: `// app/components/Card.js — paste your Card here
export default function Card({ name, blurb, rating, emoji }) {
  return (
    // your card JSX
  );
}`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["export default", "return"] },
      },
      hints: [
        "A component is a function that returns JSX.",
        "Receive props inside the curly braces of the parameters: <code>function Card({ name, blurb })</code>.",
      ],
    },
    {
      id: "fan-css-modules",
      type: "explanation",
      instruction: {
        heading: "Part 6 — style your components",
        body: `<p>Now make it look good with <strong>CSS Modules</strong> — a <code>.css</code> file whose styles are <em>scoped</em> to one component, so class names never clash. Create <code>Card.module.css</code> and import it into <code>Card.js</code>, swapping the plain <code>className</code> strings for <code>styles.something</code>. Do the same for the grid.</p><p><code>auto-fill</code> + <code>minmax</code> makes the grid <strong>responsive</strong> for free — cards reflow into more or fewer columns as the window resizes. Try it!</p><p>📚 More on WebSprout: <a href="/display-layout">Display &amp; Layout</a> (grid &amp; flexbox), <a href="/responsive-design">Responsive Web Design</a>, and <a href="/css-backgrounds">Backgrounds &amp; Gradients</a>.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "🔧 Your turn",
            body: `Make the design yours: change the card <code>background</code>, <code>border-radius</code>, the star colour, the grid <code>gap</code>, or the minimum card width. Want a dark theme? Change the <code>body</code> background and text colour in <code>globals.css</code>.`,
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `/* app/components/Card.module.css */
.card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
}
.emoji { font-size: 2.5rem; }
.stars { color: #f5a623; }

// app/components/Card.js
import styles from "./Card.module.css";

export default function Card({ name, blurb, rating, emoji }) {
  return (
    <article className={styles.card}>
      <div className={styles.emoji}>{emoji}</div>
      <h2>{name}</h2>
      <p>{blurb}</p>
      <p className={styles.stars}>{"⭐".repeat(rating)}</p>
    </article>
  );
}

/* app/components/CardGrid.module.css */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

// app/components/CardGrid.js — add the import + className
import styles from "./CardGrid.module.css";
// ...then change the wrapper to: <div className={styles.grid}>`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fan-second-page",
      type: "explanation",
      instruction: {
        heading: "Part 7 — add a second page and navigation",
        body: `<p>A real site has more than one page. In the App Router, <strong>a folder inside <code>app/</code> becomes a URL</strong>. Create <code>app/about/page.js</code> and visit <code>/about</code> — you made a route just by making a folder.</p><p>Then build a shared <code>Nav</code> component using <code>&lt;Link&gt;</code>, and put the nav and a footer in <code>app/layout.js</code> so they appear on <em>every</em> page (that's the payoff of components — one <code>Nav</code>, used everywhere). <code>{children}</code> is where each page's content slots in.</p><p>📚 More on WebSprout: <a href="/nextjs-beginners/creating-routes">Creating Pages and Routes</a>, <a href="/nextjs-beginners/linking-with-next-link">Navigating with next/link</a>, and <a href="/nextjs-beginners/nested-layouts">Layouts and Nested Layouts</a>.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — don't put <a> inside <Link>",
            body: `Write <code>&lt;Link href="/about"&gt;About&lt;/Link&gt;</code> — it renders the link for you. Old tutorials wrap an <code>&lt;a&gt;</code> inside <code>&lt;Link&gt;</code>; that's outdated and will warn.`,
          },
          {
            variant: "standard",
            title: "Web Standard — the layout",
            body: `<code>layout.js</code> renders once and wraps every page through <code>{children}</code> — the perfect home for site-wide UI. The <code>metadata</code> object sets your browser tab's title; no manual <code>&lt;title&gt;</code> tag needed.`,
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// app/about/page.js  ->  "/about"
export default function About() {
  return (
    <main>
      <h1>About this page</h1>
      <p>Hi! I'm your name, and this is my collection of favourites.</p>
    </main>
  );
}

// app/components/Nav.js
import Link from "next/link";

export default function Nav() {
  return (
    <nav style={{ display: "flex", gap: "16px", marginBottom: "1rem" }}>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}

// app/layout.js
import "./globals.css";
import Nav from "./components/Nav";

export const metadata = {
  title: "My Fan Page",
  description: "A page about the things I love.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <footer style={{ marginTop: "3rem", textAlign: "center", color: "#888" }}>
          Built with Next.js 💙
        </footer>
      </body>
    </html>
  );
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fan-stretch-image",
      type: "explanation",
      instruction: {
        heading: "Stretch goal — real images with next/image",
        body: `<p><em>Optional — skip to Part 10 to deploy if you're short on time.</em></p><p>Emojis are fun, but you can use real pictures with Next.js's <code>&lt;Image&gt;</code> component, which optimizes them automatically. Drop a file into <code>public/</code> (e.g. <code>public/zelda.jpg</code>), add an <code>image</code> field to one item in <code>data.js</code> (<code>image: "/zelda.jpg"</code> — files in <code>public/</code> are served from <code>/</code>), then use it in <code>Card</code>.</p><p><code>&lt;Image&gt;</code> <strong>requires</strong> <code>alt</code> (describes the picture for screen readers) and <code>width</code>/<code>height</code> (so the page doesn't jump as images load).</p><p>📚 More on WebSprout: <a href="/nextjs-beginners/styling-and-assets">Styling and Static Assets</a>.</p>`,
      },
      config: {
        type: "explanation",
        demoCode: `// app/components/Card.js
import Image from "next/image";
import styles from "./Card.module.css";

export default function Card({ name, blurb, rating, emoji, image }) {
  return (
    <article className={styles.card}>
      {image ? (
        <Image src={image} alt={name} width={240} height={140} />
      ) : (
        <div className={styles.emoji}>{emoji}</div>
      )}
      <h2>{name}</h2>
      <p>{blurb}</p>
      <p className={styles.stars}>{"⭐".repeat(rating)}</p>
    </article>
  );
}
// Remember to pass image={item.image} down from CardGrid.`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fan-stretch-dynamic",
      type: "explanation",
      instruction: {
        heading: "Stretch goal — a page for each item",
        body: `<p><em>Optional and advanced.</em> Give every item its own page, like <code>/faves/1</code>, using a <strong>dynamic route</strong>: a folder named with square brackets, <code>app/faves/[id]/page.js</code>. Then link to it from each card using the item's <code>id</code>.</p><p>📚 More on WebSprout: <a href="/nextjs-beginners/server-vs-client-components">Server vs Client Components</a> and <a href="/nextjs-beginners/data-fetching">Fetching Data on the Server</a>.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — Next.js 16 gotcha",
            body: `Notice <code>const { id } = await params;</code>. In Next.js 16, <code>params</code> arrives as a <strong>Promise</strong>, so you must <code>await</code> it inside an <code>async</code> function. Older tutorials write <code>params.id</code> directly — that no longer works.`,
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// app/faves/[id]/page.js
import { items } from "../../data";

export default async function FaveDetail({ params }) {
  const { id } = await params;
  const item = items.find((i) => String(i.id) === id);

  if (!item) {
    return (
      <main>
        <p>Sorry, that one doesn't exist.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>{item.emoji} {item.name}</h1>
      <p>{item.blurb}</p>
      <p>{"⭐".repeat(item.rating)}</p>
    </main>
  );
}

// In CardGrid.js, link each card to its detail page:
import Link from "next/link";
// ...inside the map:
<Link href={"/faves/" + item.id} key={item.id}>
  <Card name={item.name} blurb={item.blurb} rating={item.rating} emoji={item.emoji} />
</Link>`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fan-stretch-client",
      type: "explanation",
      instruction: {
        heading: "Stretch goal — an interactive button",
        body: `<p><em>Optional and advanced.</em> Everything so far renders on the <strong>server</strong>. To make something <em>interactive</em> (responds to clicks in the browser), a component needs the <code>"use client"</code> directive on its very first line. Create a <code>LikeButton</code> and drop <code>&lt;LikeButton /&gt;</code> inside your <code>Card</code>.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — when you need use client",
            body: `<code>useState</code> remembers a value between clicks. Anything using <code>useState</code>, <code>useEffect</code>, or an event handler like <code>onClick</code> must live in a file that starts with <code>"use client";</code>. Most components don't need it — only the interactive ones.`,
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `// app/components/LikeButton.js
"use client";

import { useState } from "react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? "❤️ Liked" : "🤍 Like"}
    </button>
  );
}`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fan-deploy",
      type: "explanation",
      instruction: {
        heading: "Part 10 — deploy your site to the web 🚀",
        body: `<p>Let's give your project a real, shareable URL. Stop the dev server (<strong>Ctrl+C</strong>), then save a snapshot with Git, push it to GitHub, and let Vercel host it.</p><ol><li>Commit your work (the commands below).</li><li>Create an empty repo at <a href="https://github.com/new">github.com/new</a> named <code>my-fan-page</code> (no README). It shows you the "push an existing repository" commands — run them with <em>your</em> username.</li><li>Go to <a href="https://vercel.com">vercel.com</a> → <strong>Add New… → Project</strong>, import your repo, and click <strong>Deploy</strong>. About a minute later you get a live URL like <code>https://my-fan-page-yourname.vercel.app</code>. 🎉</li></ol><p>📚 More on WebSprout: <a href="/nextjs-beginners/capstone-multipage-site">the Capstone</a> walks through deploying too.</p>`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard — npm run build",
            body: `<code>npm run build</code> compiles your app ahead of time into optimized files. If the build succeeds locally, it will succeed on the host. Vercel runs it for you automatically.`,
          },
          {
            variant: "tip",
            title: "🔧 Your turn — and a bonus",
            body: `Open your live link and <strong>share it</strong>! Bonus: because GitHub is connected, every <code>git push</code> redeploys automatically — edit your data, commit, push, and your live site updates in seconds.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Deploying",
            url: "https://nextjs.org/docs/app/getting-started/deploying",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `# 1. Save a snapshot of your code (create-next-app already set up Git):
git add .
git commit -m "My finished fan page"

# 2. Connect it to your new GitHub repo (use YOUR username) and push:
git remote add origin https://github.com/YOUR-USERNAME/my-fan-page.git
git branch -M main
git push -u origin main

# 3. Then import the repo at vercel.com and click Deploy.`,
        demoLanguage: "typescript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fan-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: your data, your site",
        body: `<p>You built and deployed a real website! As a final record, paste your <code>app/data.js</code> below — the heart of your fan page and the thing that makes it uniquely yours.</p><p>Two habits to carry into every project from here: <strong>format on save, always</strong>, and <strong>reach for components</strong> whenever markup repeats or a file grows long.</p>`,
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip — what to learn next",
            body: `Great next steps: more pages, <code>loading.js</code> for instant loading states, route handlers (API endpoints), and a real database. The official Next.js "Learn" course is an excellent guided follow-up.`,
          },
        ],
        docLinks: [
          {
            label: "Next.js — Learn course",
            url: "https://nextjs.org/learn",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "free-edit",
        language: "typescript",
        starterCode: `// app/data.js — paste your finished data here
export const items = [
  // your favourite things
];`,
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["export", "const", "items"] },
      },
      hints: [
        "Your data should start with <code>export const items = [</code>.",
        "Each item is an object with the fields you chose, e.g. name, blurb, rating, emoji.",
      ],
    },
  ],
};
