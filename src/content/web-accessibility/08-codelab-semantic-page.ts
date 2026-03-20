import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "web-accessibility-codelab-semantic-page",
  slug: "codelab-semantic-page",
  title: "Codelab: Converting to Semantic HTML",
  description:
    "Replace generic divs with semantic landmarks and headings to create an accessible page structure in a real code editor.",
  order: 8,
  steps: [
    {
      id: "codelab-semantic-setup",
      type: "explanation",
      instruction: {
        heading: "Set up your project",
        body: `In this codelab, you are going to take a page built entirely from divs — "div soup" — and convert it to semantic HTML. By the end, you will have a page that screen readers can navigate by landmarks and headings, while looking exactly the same visually. This is one of the most common real-world accessibility tasks: you inherit existing code and need to make it accessible without changing the design.

Open a terminal by pressing Ctrl + Alt + T on Linux, then type the following commands one at a time, pressing Enter after each:

• mkdir ~/semantic-lab — This creates a new folder called semantic-lab in your home directory. mkdir stands for "make directory." The ~ symbol is a shortcut that means "my home folder."

• cd ~/semantic-lab — This moves you into the folder you just created. cd stands for "change directory." Any files you create from now on will land in this folder.

• touch index.html style.css — This creates two empty files. touch creates a file if it does not already exist. We need index.html for our HTML structure and style.css for our CSS styles.

• code . — This opens VS Code with the current folder loaded. The . (dot) means "this folder." If you do not have VS Code, use any plain-text editor — gedit, nano, Kate, or Mousepad all work fine.

Your project is ready. In the next step, we will write the inaccessible "before" version so you can see what div soup looks like.`,
        docLinks: [
          {
            label: "MDN: Getting started with HTML",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            body: "If you do not have VS Code installed, use any plain-text editor. The key is to save files with the correct extensions (.html and .css). Do not use a word processor like LibreOffice Writer — it adds invisible formatting that browsers cannot understand.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `mkdir ~/semantic-lab
cd ~/semantic-lab
touch index.html style.css
code .`,
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Open a terminal with Ctrl+Alt+T.",
        "Type each command and press Enter before typing the next one.",
        "If 'code .' does not work, open your text editor manually and use File > Open Folder to open ~/semantic-lab.",
      ],
    },
    {
      id: "codelab-semantic-div-soup",
      type: "explanation",
      instruction: {
        heading: "Write the div soup version",
        body: `Click on index.html in the VS Code sidebar and type the following code. This is the inaccessible "before" version — a page built entirely from divs. Read through each section carefully so you understand what it is trying to represent, even though the HTML does not express any of that meaning.

After typing the code, press Ctrl + S to save, then open the page in your browser:

xdg-open index.html

The page will look like a normal website with a header, navigation, main content, sidebar, and footer. But if a screen reader user visits this page, every single div is announced as just a generic container with no meaning. The screen reader has no way to identify the navigation, skip to the main content, or understand the page structure. There are no landmarks, no heading hierarchy, and no semantic meaning.

Here is what a screen reader would announce for this page: "group, link Home, link About, link Blog, link Contact, clickable div Welcome to Our Blog, div Browse our latest articles and tutorials below, div Latest Posts, div Understanding Accessibility, div Learn why accessibility matters for all users, link Read more, div CSS Grid Layout, div Master the grid system, link Read more, div Related Links, link Resource 1, link Resource 2, link Resource 3, div Copyright 2024 My Blog."

Compare that to what a sighted user sees: a clear header with navigation, a main content area with article previews, a sidebar with related links, and a footer. The visual design communicates structure — but the HTML does not. Our job in the next steps is to fix that.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Screen readers process the DOM (Document Object Model) — the HTML structure — not the visual appearance. CSS can make a div look like a heading, but the screen reader does not see CSS. It only sees that the element is a div with some text inside. This is why semantic HTML matters more than visual styling for accessibility.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Blog</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="header">
    <div class="logo">My Blog</div>
    <div class="nav">
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/blog">Blog</a>
      <a href="/contact">Contact</a>
    </div>
  </div>

  <div class="page-body">
    <div class="content">
      <div class="page-title">Welcome to Our Blog</div>
      <div class="subtitle">Browse our latest articles and tutorials below.</div>

      <div class="section-title">Latest Posts</div>

      <div class="post">
        <div class="post-title">Understanding Accessibility</div>
        <div class="post-text">Learn why accessibility matters for all users and how to implement it in your projects.</div>
        <a href="/post-1">Read more</a>
      </div>

      <div class="post">
        <div class="post-title">CSS Grid Layout</div>
        <div class="post-text">Master the CSS grid system to build responsive, modern page layouts.</div>
        <a href="/post-2">Read more</a>
      </div>
    </div>

    <div class="sidebar">
      <div class="sidebar-title">Related Links</div>
      <a href="/resources/1">Resource 1</a>
      <a href="/resources/2">Resource 2</a>
      <a href="/resources/3">Resource 3</a>
    </div>
  </div>

  <div class="footer">
    <div class="copyright">Copyright 2024 My Blog</div>
  </div>
</body>
</html>`,
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Type or copy the code into index.html.",
        "Save with Ctrl+S, then open with xdg-open index.html.",
        "Notice that the page looks structured but the HTML is all divs.",
      ],
    },
    {
      id: "codelab-semantic-css",
      type: "explanation",
      instruction: {
        heading: "Add the CSS styles",
        body: `Now click on style.css in the VS Code sidebar and add the following styles. These styles make the div soup page look like a real website — with a dark header, navigation links, a two-column layout, and a footer.

After typing the code, save with Ctrl + S and refresh the browser with Ctrl + R.

Important: notice that all the styling uses class selectors (.header, .nav, .content, etc.) rather than element selectors (header, nav, main). This is common in codebases that use div soup — the developers used class names to describe what the divs represent, but they did not use semantic HTML elements. When we convert to semantic HTML in the next step, we will also update some CSS selectors to target the semantic elements directly, though many class-based styles will continue to work.

The page should now look like a proper blog layout. The visual design is fine — the accessibility problem is entirely in the HTML structure. This is the key insight: accessibility issues are often invisible to sighted users. The page looks correct but is fundamentally broken for assistive technology users.`,
        infoBoxes: [
          {
            variant: "tip",
            body: "Every time you change your HTML or CSS, you need to: 1) Press Ctrl+S to save the file, then 2) Switch to the browser and press Ctrl+R (or F5) to refresh the page. The browser does not detect changes automatically.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #1E293B;
  line-height: 1.6;
}

.header {
  background: #1E293B;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
}

.logo {
  font-size: 1.4em;
  font-weight: bold;
}

.nav a {
  color: #94A3B8;
  text-decoration: none;
  margin-left: 20px;
}
.nav a:hover { color: white; }

.page-body {
  display: flex;
  max-width: 960px;
  margin: 0 auto;
  padding: 24px;
  gap: 24px;
}

.content { flex: 1; }

.page-title {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 8px;
}

.subtitle {
  color: #64748B;
  margin-bottom: 24px;
}

.section-title {
  font-size: 1.4em;
  font-weight: bold;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 2px solid #E2E8F0;
}

.post {
  background: #F8FAFC;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.post-title {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 8px;
}

.post-text {
  color: #475569;
  margin-bottom: 12px;
}

.post a {
  color: #2563EB;
  text-decoration: underline;
}

.sidebar {
  width: 240px;
  flex-shrink: 0;
}

.sidebar-title {
  font-size: 1.1em;
  font-weight: bold;
  margin-bottom: 12px;
}

.sidebar a {
  display: block;
  color: #2563EB;
  text-decoration: none;
  padding: 6px 0;
}
.sidebar a:hover { text-decoration: underline; }

.footer {
  background: #F1F5F9;
  text-align: center;
  padding: 20px;
  color: #64748B;
  margin-top: 40px;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Make sure you are editing style.css, not index.html.",
        "Save with Ctrl+S, then refresh the browser with Ctrl+R.",
      ],
    },
    {
      id: "codelab-semantic-convert",
      type: "explanation",
      instruction: {
        heading: "Convert to semantic HTML",
        body: `Now for the main task: go back to index.html and replace the generic divs with semantic HTML elements. Here is a detailed guide for each replacement. Make each change one at a time, save, and refresh to verify the page still looks the same.

<strong>1. Header:</strong>
Replace <div class="header"> with <header>. The header element tells screen readers "this is the site banner." The CSS class is no longer needed for semantics, but you can keep it for styling — or update your CSS to target the header element directly.

<strong>2. Navigation:</strong>
Replace <div class="nav"> with <nav aria-label="Main navigation">. The nav element tells screen readers this is a navigation landmark. The aria-label distinguishes it from other nav elements that might exist on the page (like footer navigation).

<strong>3. Page body wrapper:</strong>
The <div class="page-body"> is a layout wrapper — it has no semantic meaning. Keep it as a div. Not every div needs to become a semantic element. Divs are perfectly fine for layout wrappers that group elements for CSS purposes without conveying any meaning to assistive technologies.

<strong>4. Main content:</strong>
Replace <div class="content"> with <main>. This is the most important landmark on the page — screen readers offer a shortcut to jump directly to <main>. There must be only one <main> per page.

<strong>5. Page title:</strong>
Replace <div class="page-title"> with <h1>. This is the main heading of the page. Every page should have exactly one <h1>.

<strong>6. Subtitle:</strong>
Replace <div class="subtitle"> with <p>. It is a paragraph of text, not a heading.

<strong>7. Section title:</strong>
Replace <div class="section-title"> with <h2>. It is a second-level heading under the <h1>.

<strong>8. Each post:</strong>
Replace <div class="post"> with <article>. Each blog post preview is a self-contained piece of content — exactly what <article> is designed for.

<strong>9. Post titles:</strong>
Replace <div class="post-title"> with <h3>. They are third-level headings under the <h2> "Latest Posts" section heading.

<strong>10. Post text:</strong>
Replace <div class="post-text"> with <p>. They are paragraphs.

<strong>11. Sidebar:</strong>
Replace <div class="sidebar"> with <aside>. The sidebar contains content tangentially related to the main content — exactly what <aside> is for. Add aria-label="Related links" for clarity.

<strong>12. Sidebar title:</strong>
Replace <div class="sidebar-title"> with <h2>. It is a heading for the sidebar section.

<strong>13. Sidebar links:</strong>
Wrap the sidebar links in a <ul> with <li> elements. A list of links should use a list element — this tells screen readers how many items are in the list and lets users navigate by list item.

<strong>14. Footer:</strong>
Replace <div class="footer"> with <footer>. Replace the copyright div with a <p>.

After making all these changes, save and refresh. The page should look exactly the same — but now a screen reader user can navigate by landmarks (header, nav, main, aside, footer) and by headings (h1, h2, h3). You have transformed an inaccessible page into an accessible one without changing a single pixel of the visual design.

You will also need to update some CSS selectors to match the new elements. Replace .header with header, .nav with nav, .footer with footer, .content with main, and .sidebar with aside. Or keep both selectors if you prefer. The key is that the styles continue to apply correctly.`,
        docLinks: [
          {
            label: "MDN: <header>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header",
            type: "html-element",
          },
          {
            label: "MDN: <main>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main",
            type: "html-element",
          },
          {
            label: "MDN: <article>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article",
            type: "html-element",
          },
          {
            label: "MDN: <aside>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside",
            type: "html-element",
          },
          {
            label: "MDN: <nav>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "After this conversion, a screen reader user will hear landmarks: \"banner, navigation Main navigation, main, heading level 1 Welcome to Our Blog, heading level 2 Latest Posts, article, heading level 3 Understanding Accessibility...\" They can press D to jump between landmarks or H to jump between headings. This is an enormous improvement in navigability.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "Not every div needs to become a semantic element. The page-body wrapper div exists purely for CSS layout (flexbox) — it has no semantic meaning, so keeping it as a div is correct. Use semantic elements for content that has meaning; use divs for layout wrappers.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Blog</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <div class="logo">My Blog</div>
    <nav aria-label="Main navigation">
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/blog">Blog</a>
      <a href="/contact">Contact</a>
    </nav>
  </header>

  <div class="page-body">
    <main>
      <h1>Welcome to Our Blog</h1>
      <p class="subtitle">Browse our latest articles and tutorials below.</p>

      <h2>Latest Posts</h2>

      <article class="post">
        <h3>Understanding Accessibility</h3>
        <p>Learn why accessibility matters for all users and how to implement it in your projects.</p>
        <a href="/post-1">Read more</a>
      </article>

      <article class="post">
        <h3>CSS Grid Layout</h3>
        <p>Master the CSS grid system to build responsive, modern page layouts.</p>
        <a href="/post-2">Read more</a>
      </article>
    </main>

    <aside aria-label="Related links">
      <h2>Related Links</h2>
      <ul>
        <li><a href="/resources/1">Resource 1</a></li>
        <li><a href="/resources/2">Resource 2</a></li>
        <li><a href="/resources/3">Resource 3</a></li>
      </ul>
    </aside>
  </div>

  <footer>
    <p>Copyright 2024 My Blog</p>
  </footer>
</body>
</html>`,
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Replace divs one at a time, save, and refresh to verify the page still looks correct.",
        "Update CSS selectors to match the new elements (header instead of .header, etc.).",
        "Keep the page-body div as a div — it is a layout wrapper with no semantic meaning.",
      ],
    },
    {
      id: "codelab-semantic-skip-link",
      type: "explanation",
      instruction: {
        heading: "Add a skip link and focus styles",
        body: `The page now has proper semantic structure, but we can make it even better. Two important improvements remain: a skip link so keyboard users can bypass the navigation, and visible focus indicators so keyboard users can see where they are.

<strong>Add the skip link:</strong>
Open index.html and add the following as the very first element inside <body>, before the <header>:

<a href="#main-content" class="skip-link">Skip to main content</a>

Then add an id to the <main> element so the skip link has a target:

<main id="main-content">

<strong>Add the CSS for the skip link and focus indicators:</strong>
Open style.css and add the following at the end:

The skip link CSS works by positioning the link off-screen (top: -100%) by default. When it receives keyboard focus (the user presses Tab), the :focus selector moves it on-screen (top: 16px). This means sighted mouse users never see it, but it is the very first thing keyboard users encounter.

The :focus-visible styles add a clear blue outline to every focused element, but only when the user is navigating by keyboard (not when clicking with a mouse). This is the modern, recommended approach to focus indicators.

Save both files, refresh the browser, and test:
1. Click in the browser address bar and press Tab. The "Skip to main content" link should appear at the top of the page.
2. Press Enter. Focus should jump to the main content area.
3. Press Tab again — focus should move to the first link inside the main content, skipping all the header navigation.
4. Continue tabbing through the page — every link and interactive element should show a visible blue outline.

You have now converted an inaccessible div-soup page into a fully accessible semantic page with skip navigation and focus indicators — without changing the visual design.`,
        docLinks: [
          {
            label: "MDN: Skip navigation",
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Operable#skip_navigation_links",
            type: "html-concept",
          },
          {
            label: "MDN: :focus-visible",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible",
            type: "css-selector",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "WCAG 2.4.1 (Bypass Blocks) requires a way to skip repeated navigation. WCAG 2.4.7 (Focus Visible) requires visible focus indicators. Adding a skip link and :focus-visible styles satisfies both criteria — two Level A/AA requirements checked off with minimal code.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `.skip-link {
  position: absolute;
  top: -100%;
  left: 16px;
  padding: 8px 16px;
  background: #1E293B;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  z-index: 100;
  font-weight: bold;
}

.skip-link:focus {
  top: 16px;
}

*:focus-visible {
  outline: 2px solid #2563EB;
  outline-offset: 2px;
}

/* Remove default outline for mouse users */
*:focus:not(:focus-visible) {
  outline: none;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "The skip link goes before the header as the first element in body.",
        "Add id=\"main-content\" to the <main> element.",
        "Test by pressing Tab from the address bar — the skip link should appear.",
      ],
    },
    {
      id: "codelab-semantic-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: extend the page",
        body: "Now it is your turn to practice. Add a new section to the blog page with the following requirements:\n\n1. Add a third <article> for a new blog post with a proper <h3> heading and <p> paragraph.\n2. Add a second <nav> in the footer with links to Privacy Policy and Terms of Service — give it an aria-label to distinguish it from the main navigation.\n3. Add an <aside> inside one of the articles for a \"quick tip\" callout — use aria-label to describe it.\n4. Verify the heading hierarchy: h1 for the page title, h2 for section headings, h3 for post titles.\n\nAfter making your changes, test keyboard navigation: Tab through the entire page and verify every link is reachable and has a visible focus indicator.",
        docLinks: [
          {
            label: "MDN: <article>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            body: "When you have multiple <nav> elements, each MUST have a unique aria-label. Without labels, screen reader users hear 'navigation, navigation' with no way to tell them apart. Good labels: 'Main navigation' and 'Footer navigation'.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          "<!-- Add a third article with an h3 heading -->\n<article class=\"post\">\n  <!-- Your new blog post here -->\n</article>\n\n<!-- Add a footer nav with aria-label -->\n<footer>\n  <nav>\n    <!-- Privacy and Terms links -->\n  </nav>\n  <p>Copyright 2024 My Blog</p>\n</footer>",
        language: "html",
      },
      validation: {
        type: "contains-tag",
        criteria: { tag: "article" },
      },
      hints: [
        "Add an <h3> inside the new article for the post title.",
        "Add aria-label=\"Footer navigation\" to the footer <nav>.",
        "Test by pressing Tab through the page — every link should have a visible focus ring.",
      ],
    },
  ],
};
