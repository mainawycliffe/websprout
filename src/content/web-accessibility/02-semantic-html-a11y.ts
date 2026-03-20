import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "web-accessibility-semantic-html-a11y",
  slug: "semantic-html-a11y",
  title: "The Role of Semantic HTML",
  description:
    "Learn why semantic elements like <nav>, <main>, and <header> are essential for screen readers and accessible navigation.",
  order: 2,
  steps: [
    {
      id: "divs-vs-semantics",
      type: "explanation",
      instruction: {
        heading: "The problem with div soup",
        body: "Open any modern website in DevTools and you will often find hundreds of <div> elements nested inside each other. Developers sometimes call this \"div soup\" — a page where every piece of structure is built from generic <div> and <span> tags with no semantic meaning. To a sighted user looking at the page, everything might look fine because CSS has styled the divs to look like headers, navigation bars, sidebars, and footers. But to a screen reader, every single one of those elements is just a nameless, meaningless container.\n\nImagine walking into a large building where none of the rooms have signs. No \"Exit\" signs, no \"Restroom\" labels, no room numbers, no directory in the lobby. You could eventually figure out where things are by wandering around and looking, but it would take far longer and be far more frustrating. Now imagine navigating that building blindfolded. Without those signs, it would be nearly impossible. That is what a screen reader user experiences on a page built entirely from divs — there are no landmarks, no signposts, and no structure to navigate by.\n\nSemantic HTML elements solve this problem. Elements like <nav>, <main>, <header>, <footer>, <section>, and <article> carry meaning that browsers and assistive technologies can understand. They create a structural map of the page that screen reader users can use to jump directly to the content they need — just like a sighted user can glance at a page and immediately spot the navigation bar or main content area.\n\nWhen a screen reader encounters a <nav> element, it announces \"navigation\" and the user knows they have found a menu. When it encounters <main>, it knows this is the primary content and can offer a shortcut to jump there. With divs, the screen reader has no idea what anything is — it just reads through every element in order, which can mean listening to dozens of menu items before reaching the actual page content.",
        analogy: "Think of a building. Semantic HTML elements are like the signs on rooms — \"Exit,\" \"Lobby,\" \"Restroom,\" \"Conference Room A.\" Divs are like blank, unmarked doors. A sighted person can look through a glass door and figure out what is inside. A blindfolded person relies entirely on the signs. Screen readers are like that blindfolded person — they need the signs (semantic elements) to help users navigate efficiently.",
        docLinks: [
          {
            label: "MDN: Semantics",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Semantics",
            type: "html-concept",
          },
          {
            label: "MDN: Document and website structure",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "HTML5 introduced landmark elements specifically to improve accessibility. Screen readers use these landmarks to build a navigation menu that lets users jump between sections — similar to a table of contents. Without landmarks, users must tab through every single element on the page to find what they need.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "A common mistake is wrapping everything in divs and then adding ARIA roles to fake the semantics: <div role=\"navigation\">. This works, but it is backwards — if a native HTML element exists for the purpose (and <nav> does), always use the native element. It is simpler, more reliable, and better supported.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "<!-- Bad: div soup — screen reader sees no structure -->\n<div class=\"header\">\n  <div class=\"nav\">\n    <div class=\"nav-link\">Home</div>\n    <div class=\"nav-link\">About</div>\n  </div>\n</div>\n<div class=\"content\">\n  <div class=\"title\">Welcome</div>\n  <div class=\"text\">Hello world</div>\n</div>\n\n<!-- Good: semantic HTML — screen reader understands the page -->\n<header>\n  <nav>\n    <a href=\"/\">Home</a>\n    <a href=\"/about\">About</a>\n  </nav>\n</header>\n<main>\n  <h1>Welcome</h1>\n  <p>Hello world</p>\n</main>",
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "landmark-elements",
      type: "explanation",
      instruction: {
        heading: "HTML landmark elements",
        body: "HTML provides several landmark elements that create a navigable page structure for assistive technologies. Here are the most important ones and when to use them:\n\n<strong><header></strong> — Represents introductory content at the top of a page or section. Typically contains the site logo, navigation, and search. A page should have one main <header> (usually at the top), but <article> and <section> elements can have their own headers too. Screen readers announce it as a \"banner\" landmark.\n\n<strong><nav></strong> — Wraps major navigation blocks — the main menu, breadcrumbs, or a table of contents. Do not use it for every single group of links — only for major navigation. A footer with links to the privacy policy and terms of service is fine as plain links; they do not need a <nav>. On Wikipedia, the sidebar with links to other languages and the top menu bar would each be wrapped in <nav>. Screen readers announce it as \"navigation.\"\n\n<strong><main></strong> — Wraps the primary content of the page — the content unique to this specific page. There must be only one <main> per page. It should not include sidebars, navigation, or footers that repeat across pages. On YouTube, the <main> would contain the video player and comments, but not the sidebar recommendations or the top navigation bar. Screen readers offer a shortcut to jump directly to <main>, which is one of the most important accessibility features on any page.\n\n<strong><footer></strong> — Represents closing content — copyright notices, contact information, related links. Like <header>, a page has one main footer, but sections can have their own footers. Screen readers announce it as \"contentinfo.\"\n\n<strong><aside></strong> — Represents content tangentially related to the main content — sidebars, pull quotes, related articles, or advertisements. On a news site like CNN, the \"Trending Stories\" sidebar would be an <aside>. Screen readers announce it as \"complementary.\"\n\n<strong><section></strong> — Groups related content with a heading. Use it when a chunk of content has a natural heading and represents a thematic grouping. On a product page at Amazon, there might be sections for product description, customer reviews, and related products.\n\n<strong><article></strong> — Represents a self-contained piece of content that could stand alone — a blog post, a news article, a comment, a forum post. On Instagram, each post in a feed would be an <article>.",
        docLinks: [
          {
            label: "MDN: <header>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header",
            type: "html-element",
          },
          {
            label: "MDN: <nav>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav",
            type: "html-element",
          },
          {
            label: "MDN: <main>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main",
            type: "html-element",
          },
          {
            label: "MDN: <footer>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer",
            type: "html-element",
          },
          {
            label: "MDN: <aside>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside",
            type: "html-element",
          },
          {
            label: "MDN: <article>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Screen readers like NVDA, JAWS, and VoiceOver build a \"landmarks\" menu from these elements. Users can press a single key to list all landmarks and jump to any one instantly. Without landmarks, the only way to reach the main content is to tab through every element on the page — which can mean 50+ tab presses on a complex site like Amazon or YouTube.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "<header>\n  <nav aria-label=\"Main\">\n    <a href=\"/\">Home</a>\n    <a href=\"/products\">Products</a>\n    <a href=\"/about\">About</a>\n  </nav>\n</header>\n\n<main>\n  <h1>Our Products</h1>\n  <section>\n    <h2>Featured</h2>\n    <article>\n      <h3>Widget Pro</h3>\n      <p>The best widget on the market.</p>\n    </article>\n  </section>\n  <aside>\n    <h2>Related Articles</h2>\n    <ul>\n      <li><a href=\"/blog/widgets\">All About Widgets</a></li>\n    </ul>\n  </aside>\n</main>\n\n<footer>\n  <p>&copy; 2024 WidgetCo</p>\n</footer>",
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "heading-hierarchy",
      type: "explanation",
      instruction: {
        heading: "Heading hierarchy matters",
        body: "Headings (<h1> through <h6>) are not just about making text big and bold — they create a hierarchical outline of your page content that screen readers use for navigation. Screen reader users can press a single key (\"H\" in most screen readers) to jump from heading to heading, quickly scanning the page structure. If your headings skip levels or are used out of order, this outline becomes confusing and unreliable.\n\nThe rules are simple:\n\n1. <strong>Every page should have exactly one <h1></strong> — the main title of the page content. On a Google search results page, the <h1> would be the search query. On a Wikipedia article, it would be the article title.\n\n2. <strong>Headings should not skip levels</strong> — do not jump from <h1> to <h3>. An <h2> should follow an <h1>, an <h3> should follow an <h2>. Think of it like an outline: you would not have a chapter title (h1) followed directly by a sub-sub-section (h3) with no section title (h2) in between.\n\n3. <strong>Do not choose heading levels for their size</strong> — if you want smaller text, use CSS (font-size). Heading levels communicate document structure, not visual appearance. Using <h4> because it looks like the right size but is not the right level in the hierarchy breaks the document outline for screen reader users.\n\nA screen reader user can pull up a list of all headings on the page and use them like a table of contents. If your headings are well-structured, they can jump to any section in seconds. If your headings are random or missing, they are stuck listening to the entire page linearly.",
        docLinks: [
          {
            label: "MDN: <h1>-<h6>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "WCAG Success Criterion 1.3.1 (Info and Relationships) requires that heading levels convey the document structure. WCAG 2.4.6 (Headings and Labels) requires headings to be descriptive. These are Level A and AA requirements respectively — skipping heading levels or using non-descriptive headings fails both criteria.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "Quick test: if you extracted just the headings from your page, would they read like a coherent table of contents? If yes, your heading structure is good. If it reads like random phrases at random levels, screen reader users will struggle to navigate your page.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "<!-- Bad: skipped heading levels, multiple h1s -->\n<h1>My Website</h1>\n<h1>Welcome</h1>\n<h4>About Us</h4>\n<h2>Contact</h2>\n\n<!-- Good: proper hierarchy, one h1 -->\n<h1>My Website</h1>\n<h2>About Us</h2>\n<h3>Our Team</h3>\n<h3>Our Mission</h3>\n<h2>Contact</h2>\n<h3>Email</h3>\n<h3>Phone</h3>",
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "landmark-gapfill",
      type: "gap-fill",
      instruction: {
        heading: "Choose the right landmark",
        body: "Replace each blank with the correct semantic HTML element. Remember: <nav> wraps navigation, <main> wraps the primary content, and <header> wraps introductory content.",
      },
      config: {
        type: "gap-fill",
        template:
          "<{{landmark1}}>\n  <a href=\"/\">Logo</a>\n  <{{landmark2}}>\n    <a href=\"/home\">Home</a>\n    <a href=\"/about\">About</a>\n  </{{landmark2_close}}>\n</{{landmark1_close}}>\n<{{landmark3}}>\n  <h1>Page Title</h1>\n  <p>Content goes here.</p>\n</{{landmark3_close}}>",
        gaps: [
          {
            id: "landmark1",
            placeholder: "element",
            acceptedAnswers: ["header"],
            caseSensitive: true,
          },
          {
            id: "landmark2",
            placeholder: "element",
            acceptedAnswers: ["nav"],
            caseSensitive: true,
          },
          {
            id: "landmark2_close",
            placeholder: "element",
            acceptedAnswers: ["nav"],
            caseSensitive: true,
          },
          {
            id: "landmark1_close",
            placeholder: "element",
            acceptedAnswers: ["header"],
            caseSensitive: true,
          },
          {
            id: "landmark3",
            placeholder: "element",
            acceptedAnswers: ["main"],
            caseSensitive: true,
          },
          {
            id: "landmark3_close",
            placeholder: "element",
            acceptedAnswers: ["main"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The top section with the logo and links is a header.",
        "The group of navigation links should be wrapped in a nav element.",
        "The primary page content goes inside a main element.",
      ],
    },
    {
      id: "fix-div-soup",
      type: "free-edit",
      instruction: {
        heading: "Fix the div soup",
        body: "The HTML below uses divs for everything. Replace the generic divs with the appropriate semantic HTML elements. The page has a header area with navigation, a main content area, and a footer. Use <header>, <nav>, <main>, and <footer> to give this page proper structure that screen readers can understand.",
        docLinks: [
          {
            label: "MDN: Content sectioning",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element#content_sectioning",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "You do not need to change any of the content or styling — just replace the div tags with the appropriate semantic elements. The visual appearance stays the same, but the accessibility improves dramatically.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          "<div class=\"header\">\n  <div class=\"nav\">\n    <a href=\"/\">Home</a>\n    <a href=\"/about\">About</a>\n    <a href=\"/contact\">Contact</a>\n  </div>\n</div>\n<div class=\"content\">\n  <h1>Welcome to My Site</h1>\n  <p>This is the main content of the page.</p>\n</div>\n<div class=\"footer\">\n  <p>&copy; 2024 My Site</p>\n</div>",
        language: "html",
      },
      validation: {
        type: "contains-tag",
        criteria: { tag: "main" },
      },
      hints: [
        "Replace <div class=\"header\"> with <header>.",
        "Replace <div class=\"nav\"> with <nav>.",
        "Replace <div class=\"content\"> with <main>.",
        "Replace <div class=\"footer\"> with <footer>.",
      ],
    },
  ],
};
