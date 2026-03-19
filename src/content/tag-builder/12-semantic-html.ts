import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "tag-builder-semantic-html",
  slug: "semantic-html",
  title: "Semantic HTML vs. Div Soup",
  description:
    "Discover why meaningful HTML tags matter more than wrapping everything in <div>.",
  order: 12,
  steps: [
    {
      id: "semantic-divville",
      type: "explanation",
      instruction: {
        heading:
          "Welcome to Divville: the city where everything is 'Building'",
        body: 'Imagine you move to a new city. You need to find the hospital, the library, the post office, and a restaurant. But when you arrive, every single building has the same sign on the front: "BUILDING." No names. No numbers. No clues. You would have to walk into every door and look around before figuring out what is inside. That would be exhausting, confusing, and slow.\n\nThat is exactly what happens when a webpage is built using only <div> tags. A <div> is a generic container with no meaning — it is just "a thing." When a screen reader encounters a page full of nested divs, it has no idea what is a navigation bar, what is the main content, and what is a footer. Search engines like Google face the same problem: they see a blob of content with no structure. And the developer who has to maintain the code six months later? They see a wall of <div><div><div>... and have to read every line to understand the page layout.\n\nThere is a better way. HTML provides tags that are just as easy to use as <div> but carry meaning: <header>, <nav>, <main>, <section>, <article>, <aside>, and <footer>. These are called semantic elements — "semantic" means "relating to meaning." They work exactly like <div> (they are all block-level containers), but they tell the browser, screen readers, search engines, and other developers what role each section plays.',
        analogy:
          "Would you label every room in your house 'room'? The kitchen, bedroom, bathroom, garage — all just 'room'? Of course not. You give each room a name because the name tells people what happens there. Semantic HTML tags do the same thing for a webpage: <header> is the entrance hall, <nav> is the directory, <main> is the living area, <footer> is the exit sign.",
        infoBoxes: [
          {
            variant: "standard",
            title: "Why semantic HTML was invented",
            body: 'Semantic HTML was introduced in HTML5 (2014) specifically to solve the "div soup" problem. Before HTML5, developers had no choice but to use <div id="header">, <div id="nav">, etc. The new tags standardized these patterns so every website uses the same vocabulary.',
          },
        ],
        docLinks: [
          {
            label: "Document structure",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents",
            type: "html-concept",
          },
          {
            label: "Semantics in HTML",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html",
            type: "html-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- Divville: everything is "Building" -->\n<div class="header">\n  <div class="logo">My Site</div>\n  <div class="nav">\n    <a href="/">Home</a>\n    <a href="/about">About</a>\n  </div>\n</div>\n<div class="content">\n  <div class="article">\n    <div class="title">Welcome!</div>\n    <div class="text">This is my homepage.</div>\n  </div>\n</div>\n<div class="footer">\n  <div class="copyright">&copy; 2026</div>\n</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "semantic-city",
      type: "explanation",
      instruction: {
        heading: "Now welcome to Semantic City",
        body: "Here is the exact same page, but using semantic tags instead of divs. Notice: the visual result in the browser is identical. The page looks the same. But under the hood, it is dramatically different.\n\n<header> tells the browser \"this is the page header — logo and navigation live here.\" <nav> says \"these links are for navigation.\" <main> marks the primary content. <article> wraps a self-contained piece of content (something that would make sense on its own, like a blog post or news story). <footer> marks the page footer.\n\nThree groups benefit immediately:\n\n1. Screen readers and assistive technology: When a visually impaired user arrives at this page, their screen reader announces \"navigation region\" and lets them jump directly to <main> content. With div-soup, they must listen to every single element in order.\n\n2. Search engines (SEO): Google's crawler can identify the main content vs. the navigation vs. the footer. This helps it understand and rank your page better.\n\n3. Developers: Anyone reading the code immediately understands the page layout without reading the class names or content.",
        analogy:
          "It's the difference between a library where every shelf is labeled 'Shelf' vs. one that says 'Fiction', 'Science', 'History', 'Children\\'s Books.' Both hold the same books, but you'd find what you need ten times faster in the labeled library.",
        infoBoxes: [
          {
            variant: "standard",
            title: "Landmark navigation",
            body: "Screen readers provide keyboard shortcuts to jump between landmark regions (header, nav, main, footer). A page built with semantic HTML can be navigated in seconds. A page built with divs forces sequential reading from top to bottom — potentially minutes of listening.",
          },
          {
            variant: "tip",
            title: "Div is not the enemy",
            body: "<div> is not bad or wrong — it still has a place. Use <div> when you need a container purely for styling purposes (like a wrapper for CSS Grid or Flexbox) and the container has no semantic meaning. The rule: if the container represents a meaningful section of the page, use a semantic tag. If it is just a styling hook, use <div>.",
          },
        ],
        docLinks: [
          {
            label: "<header>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header",
            type: "html-element",
          },
          {
            label: "<nav>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav",
            type: "html-element",
          },
          {
            label: "<main>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main",
            type: "html-element",
          },
          {
            label: "<article>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article",
            type: "html-element",
          },
          {
            label: "<footer>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer",
            type: "html-element",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- Semantic City: every building has a name -->\n<header>\n  <h1>My Site</h1>\n  <nav>\n    <a href="/">Home</a>\n    <a href="/about">About</a>\n  </nav>\n</header>\n<main>\n  <article>\n    <h2>Welcome!</h2>\n    <p>This is my homepage.</p>\n  </article>\n</main>\n<footer>\n  <p>&copy; 2026</p>\n</footer>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "semantic-more-tags",
      type: "explanation",
      instruction: {
        heading: "More semantic tags for richer structure",
        body: "Beyond header/nav/main/footer, three more semantic tags help you describe content with precision:\n\n<section> groups related content under a common theme. A long page might have a <section> for \"Features,\" \"Pricing,\" and \"Testimonials.\" Each section typically has its own heading.\n\n<article> wraps content that is self-contained and could be distributed independently — a blog post, a news story, a product card, a forum comment. The test: \"Would this make sense if I pulled it out and put it on a different page?\" If yes, it is an article.\n\n<aside> marks content that is tangentially related to the surrounding content — a sidebar, a pull quote, a \"related articles\" box, or an ad. On news sites like BBC, the main story is in <article> and the sidebar links are in <aside>.",
        analogy:
          "Think of a newspaper. The entire front page is the <main>. Each news story is an <article> — it makes sense on its own. A sidebar with weather or stock prices is an <aside>. And grouping stories under 'World News' or 'Sports' headings creates <section>s.",
        infoBoxes: [
          {
            variant: "standard",
            title: "Only one <main> per page",
            body: "<main> must only appear once per page — it marks the unique content that is not repeated across pages (unlike headers and footers). This constraint exists because assistive technology uses <main> as a landmark to skip directly to the primary content.",
          },
        ],
        docLinks: [
          {
            label: "<section>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section",
            type: "html-element",
          },
          {
            label: "<article>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article",
            type: "html-element",
          },
          {
            label: "<aside>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside",
            type: "html-element",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "<main>\n  <section>\n    <h2>Latest Posts</h2>\n    <article>\n      <h3>Learning HTML</h3>\n      <p>Today I built my first table...</p>\n    </article>\n    <article>\n      <h3>CSS is fun</h3>\n      <p>Colors, fonts, layouts — so many\n        possibilities...</p>\n    </article>\n  </section>\n\n  <aside>\n    <h2>About the Author</h2>\n    <p>A student learning web development,\n      one tag at a time.</p>\n  </aside>\n</main>",
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "semantic-gap-rescue",
      type: "gap-fill",
      instruction: {
        heading: "Rescue this page from Divville",
        body: "This page uses <div> for everything. Fill in the blanks to replace the divs with the correct semantic tags. Think about what role each section plays: which one is the page header? Which one holds the navigation links? Which is the main content? Which is the footer?",
        infoBoxes: [
          {
            variant: "tip",
            title: "Match the tag to the purpose",
            body: "If you are unsure which semantic tag to use, ask yourself: \"What is this section's job on the page?\" If it holds navigation links, it is <nav>. If it is the primary content area, it is <main>. If it wraps the whole page header with the logo and menu, it is <header>. The tag name matches the section's purpose.",
          },
        ],
        docLinks: [],
      },
      config: {
        type: "gap-fill",
        template:
          '<{{header_tag}}>\n  <h1>My Blog</h1>\n  <nav>\n    <a href="/">Home</a>\n    <a href="/posts">Posts</a>\n  </nav>\n</{{header_tag}}>\n\n<{{main_tag}}>\n  <{{article_tag}}>\n    <h2>My First Post</h2>\n    <p>Hello world! I am learning HTML.</p>\n  </{{article_tag}}>\n</{{main_tag}}>\n\n<{{footer_tag}}>\n  <p>Made with love &amp; HTML</p>\n</{{footer_tag}}>',
        gaps: [
          {
            id: "header_tag",
            placeholder: "page header tag",
            acceptedAnswers: ["header"],
            caseSensitive: true,
          },
          {
            id: "main_tag",
            placeholder: "main content tag",
            acceptedAnswers: ["main"],
            caseSensitive: true,
          },
          {
            id: "article_tag",
            placeholder: "self-contained content tag",
            acceptedAnswers: ["article"],
            caseSensitive: true,
          },
          {
            id: "footer_tag",
            placeholder: "page footer tag",
            acceptedAnswers: ["footer"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The page header (logo + navigation) uses the <header> tag.",
        "The primary content area uses <main>.",
        "A self-contained blog post is an <article>.",
        "The bottom of the page uses <footer>.",
      ],
    },
    {
      id: "semantic-gap-section-aside",
      type: "gap-fill",
      instruction: {
        heading: "Add sections and a sidebar",
        body: "Fill in the blanks to properly structure this page with sections and an aside. A <section> groups related content, while <aside> marks supplementary content like a sidebar.",
        docLinks: [],
      },
      config: {
        type: "gap-fill",
        template:
          '<main>\n  <{{section_tag}}>\n    <h2>Featured Products</h2>\n    <p>Check out our latest items...</p>\n  </{{section_tag}}>\n\n  <{{section_tag2}}>\n    <h2>Customer Reviews</h2>\n    <p>"Great products!" - Alex</p>\n  </{{section_tag2}}>\n\n  <{{aside_tag}}>\n    <h3>Special Offer</h3>\n    <p>Use code SAVE20 for 20% off!</p>\n  </{{aside_tag}}>\n</main>',
        gaps: [
          {
            id: "section_tag",
            placeholder: "content group tag",
            acceptedAnswers: ["section"],
            caseSensitive: true,
          },
          {
            id: "section_tag2",
            placeholder: "content group tag",
            acceptedAnswers: ["section"],
            caseSensitive: true,
          },
          {
            id: "aside_tag",
            placeholder: "sidebar/supplementary tag",
            acceptedAnswers: ["aside"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "Related content grouped under a heading uses <section>.",
        "Both 'Featured Products' and 'Customer Reviews' are sections of the page.",
        "The special offer box is supplementary content — that's <aside>.",
      ],
    },
    {
      id: "semantic-free-edit",
      type: "free-edit",
      instruction: {
        heading: "Build a blog page the right way",
        body: "Build a complete blog page using zero unnecessary divs. Your page must include:\n\n- A <header> with a site name (<h1>) and a <nav> with at least 2 links\n- A <main> containing at least one <article> with a heading and paragraph\n- A <section> grouping related content\n- An <aside> with sidebar content (an author bio, related links, or a fun fact)\n- A <footer> with copyright text\n\nChallenge yourself: can you build the entire page without a single <div>? Remember, every tag you use communicates the page's structure to screen readers, search engines, and future developers. You are building the same semantic structure used by major news sites, blogs, and documentation pages across the web.",
        infoBoxes: [
          {
            variant: "standard",
            title: "Accessibility is the law",
            body: "Using semantic HTML is not just a best practice — it is increasingly a legal requirement. Many countries (including the US, UK, and EU members) require government and public-facing websites to meet WCAG accessibility standards, which rely heavily on proper semantic structure.",
          },
          {
            variant: "tip",
            title: "When to still use <div>",
            body: "If you need a container purely for visual styling (like centering a group of elements), <div> is still the right choice. Semantic tags are for meaning; <div> is for layout plumbing. Both have their place.",
          },
        ],
        docLinks: [
          {
            label: "HTML heading elements",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements",
            type: "html-element",
          },
          {
            label: "ARIA landmark roles",
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles#landmark_roles",
            type: "html-concept",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          "<!-- Build a semantic blog page — no div soup! -->\n",
        language: "html",
      },
      validation: { type: "contains-tag", criteria: { tag: "main" } },
      hints: [
        "Start with <header> containing an <h1> and a <nav> with links.",
        "Add <main> with an <article> inside it — give the article an <h2> and a <p>.",
        "Add an <aside> inside <main> for sidebar content.",
        "Wrap related articles in a <section> with its own heading.",
        "End with <footer> — a simple <p> with copyright text works.",
      ],
    },
  ],
};
