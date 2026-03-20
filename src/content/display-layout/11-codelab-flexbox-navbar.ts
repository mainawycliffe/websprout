import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "display-layout-codelab-flexbox-navbar",
  slug: "codelab-flexbox-navbar",
  title: "Codelab: Flexbox Navigation Bar",
  description:
    "Build a professional navigation bar from scratch using flexbox — logo, links, and spacing.",
  order: 11,
  steps: [
    // ── Step 1: Set up your project ──────────────────────────────────
    {
      id: "flexbox-navbar-setup",
      type: "explanation",
      instruction: {
        heading: "Set up your project",
        body: `Every website has a navigation bar. GitHub, YouTube, Amazon, Netflix, Wikipedia — all of them use flexbox to build their top bars. The navigation bar is often the very first thing a user sees and interacts with, and it's one of the most common UI patterns on the entire web. In this codelab, you'll build one from scratch, understanding exactly why each CSS property is needed and how it contributes to the final result.

Before we write any code, we need a place to put our files. Open a terminal by pressing Ctrl + Alt + T on Linux. You'll see a blinking cursor waiting for your commands. Type the following commands one at a time, pressing Enter after each one:

• mkdir ~/flexbox-nav-lab — This creates a new folder called flexbox-nav-lab. mkdir stands for "make directory" (a directory is just another word for folder). The ~ symbol is a shortcut that means "my home folder" — so the new folder lands right inside your personal files.

• cd ~/flexbox-nav-lab — This moves you into the folder you just created. cd stands for "change directory." From now on, any files you create will land inside flexbox-nav-lab.

• touch index.html style.css — This creates two empty files. touch creates a file if it doesn't already exist. We need index.html for our page structure and style.css for our visual styles.

• code . — This opens VS Code with the current folder loaded. The . (dot) means "the folder I'm currently in." VS Code will open and show your two new files in the sidebar.

That's it — your project is ready! You now have a folder with two empty files, and VS Code is open and waiting for you to start coding. By the end of this codelab, you'll have a professional-looking navbar that uses the exact same CSS techniques as the sites you visit every day.`,
        docLinks: [
          {
            label: "Getting started with HTML",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            body: "If you don't have VS Code installed, use any text editor you have — gedit, nano, Kate, or even Mousepad. The important thing is that you save plain text files with the correct file extensions (.html and .css). Don't use a word processor like LibreOffice Writer — it adds invisible formatting that browsers can't read.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `mkdir ~/flexbox-nav-lab
cd ~/flexbox-nav-lab
touch index.html style.css
code .`,
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Open a terminal with Ctrl+Alt+T.",
        "Type each command and press Enter before typing the next one.",
        "If 'code .' doesn't work, open your text editor manually and use File → Open Folder to open ~/flexbox-nav-lab.",
      ],
    },

    // ── Step 2: Write the navigation HTML ────────────────────────────
    {
      id: "flexbox-navbar-html",
      type: "explanation",
      instruction: {
        heading: "Write the navigation HTML",
        body: `Click on index.html in the VS Code sidebar and type (or copy) the following code into the file.

Let's break down every element — understanding the HTML structure is essential because flexbox operates on parent-child relationships, and the structure you build here directly determines how the CSS layout works:

• <nav class="navbar"> — The <nav> element is a semantic HTML element that tells browsers and screen readers "this section contains navigation links." It works identically to a <div> in terms of visual behavior — it's a block-level container. But it carries meaning that a <div> doesn't. Screen readers announce it as "navigation" and let users jump directly to it with keyboard shortcuts. If you used a plain <div> instead, sighted users would never notice a difference, but blind and low-vision users would lose a critical navigation landmark. Always use <nav> for navigation.

• <div class="logo">WebSprout</div> — A container for the site brand name. This is the first direct child of the navbar. Why wrap it in a <div> instead of just putting text directly in the <nav>? Because flexbox treats direct children as "flex items" — by wrapping the logo in its own container, we make it a single flex item that we can position independently. On a real site, this might contain an <img> tag with a company logo, or an <a> tag linking back to the homepage.

• <div class="nav-links"> — This is the second direct child of the navbar. It groups all the navigation links together into a single container. This is the key to the two-group pattern: the navbar has two groups — logo on the left, links on the right. We wrap each group in its own container so flexbox can treat them as two items and push them apart. Without this wrapper, each individual <a> tag would be its own flex item, and spacing them would be much harder.

• <a href="#">Home</a>, <a href="#">Lessons</a>, etc. — Anchor tags for each navigation link. The href="#" is a placeholder that doesn't navigate anywhere — in a real project, these would point to actual pages like href="/lessons" or href="/about". These are children of .nav-links, not direct children of .navbar. This distinction matters: the outer flex container (.navbar) only sees two items (logo and nav-links). The inner links are invisible to the outer flex layout.

• <main class="content"> — The <main> element represents the primary content of the page. Like <nav>, it's a semantic element — it tells assistive technologies where the main content begins. A page should have exactly one <main> element. This content sits below the navbar and gives us something to look at on the page.

Save with Ctrl + S, then open the file in your browser (type xdg-open index.html in your terminal, or use File → Open in your browser). Everything stacks vertically — the logo, each link, the heading, and the paragraph all sit on separate lines. This is because all these elements are block-level by default — they each take up the full width of the page and start on a new line. The navigation looks nothing like a navbar yet. We'll fix that with flexbox next.`,
        analogy: "Think of the navbar HTML like organizing a desk. You have two groups of items: your computer (the logo) and your stationery holder with pens, pencils, and markers (the nav-links with individual links inside). You could scatter everything loose on the desk, but it's much easier to arrange things when they're grouped into containers. Flexbox then lets you say 'push the computer to the left edge and the stationery holder to the right edge.'",
        docLinks: [
          {
            label: "<nav> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav",
            type: "html-element",
          },
          {
            label: "<main> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main",
            type: "html-element",
          },
          {
            label: "<a> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            body: "Semantic HTML elements like <nav> and <main> help screen readers understand the structure of your page. A screen reader user can press a shortcut to jump directly to <nav> or <main> without scrolling through everything. Using <div> for everything works visually, but it makes your site harder to navigate for people who rely on assistive technology. The W3C Web Accessibility Guidelines (WCAG) recommend using semantic elements wherever possible.",
          },
          {
            variant: "tip",
            body: "The two-group pattern (logo + nav-links as separate containers) is the standard way to build navbars. You'll see this exact HTML structure on virtually every website. Some sites add a third group (like a search bar or user avatar in the middle), but the principle is the same: group related items, then use flexbox to position the groups.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Flexbox Navbar</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav class="navbar">
    <div class="logo">WebSprout</div>
    <div class="nav-links">
      <a href="#">Home</a>
      <a href="#">Lessons</a>
      <a href="#">Practice</a>
      <a href="#">About</a>
    </div>
  </nav>

  <main class="content">
    <h1>Welcome to WebSprout</h1>
    <p>This is a demo page with a flexbox navigation bar.</p>
  </main>
</body>
</html>`,
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Make sure the <link> tag points to style.css — both files must be in the same folder.",
        "Save with Ctrl+S, then open in a browser with xdg-open index.html or Ctrl+O in the browser.",
        "Don't worry that it looks plain — CSS will handle the styling.",
      ],
    },

    // ── Step 3: Activate flexbox ─────────────────────────────────────
    {
      id: "flexbox-navbar-activate",
      type: "explanation",
      instruction: {
        heading: "Activate flexbox",
        body: `Now click on style.css in VS Code's sidebar and type the following CSS. This is where the magic happens — we're going to transform that ugly vertical stack into a real navbar with just a few lines of CSS.

Let's walk through what each rule does in detail:

• The universal reset (* { margin: 0; padding: 0; box-sizing: border-box; }) — This is the first thing you'll see in almost every professional stylesheet, and understanding why is important. Every browser adds its own default styling to HTML elements. The <body> gets 8px of margin. The <h1> gets large top and bottom margins. Lists get left padding for bullet indentation. Paragraphs get vertical margins. And these defaults vary between Chrome, Firefox, Safari, and Edge! The universal reset strips ALL of that away so you start from a completely clean, predictable slate.

Why each property in the reset matters:
  - margin: 0 removes all default outer spacing from every element. Without this, you'd see mysterious gaps around the edges of your page (that's the body's default margin) and extra space above headings.
  - padding: 0 removes all default inner spacing. Without this, lists would have unexpected left indentation, and some form elements would have built-in padding you didn't ask for.
  - box-sizing: border-box changes how the browser calculates element sizes. Without it, when you set width: 100px and add 10px of padding, the element becomes 120px wide (100 + 10 + 10). That's the default "content-box" model, and it's confusing. With border-box, width: 100px means 100px total — padding is included inside that measurement, not added on top. This single property eliminates an entire category of layout bugs.

• body { font-family: system-ui, -apple-system, sans-serif; } sets a clean, modern system font. system-ui uses whatever font the operating system prefers — San Francisco on macOS, Segoe UI on Windows, or Roboto on Android. The fallbacks ensure every system gets a reasonable font.

• .navbar { display: flex; } — This is the transformative line. Adding display: flex to the navbar turns it into a flex container. Its direct children (the logo div and the nav-links div) become flex items and are automatically placed side by side in a row instead of stacking vertically. Just one property — display: flex — changes the entire layout from vertical to horizontal. This is why flexbox revolutionized CSS layout when it was introduced.

• The .navbar background (#1E293B) is a dark slate color, and we set color: white for text. The padding: 16px 24px gives the navbar comfortable internal spacing — 16px on top and bottom, 24px on left and right.

• The .logo styles (font-weight: bold, font-size: 1.2em) make the brand name slightly larger and bold, so it stands out from the navigation links.

• The link styles (.nav-links a) remove the default underline (text-decoration: none) and set a muted color (#CBD5E1) for a clean, modern look. By default, browsers render links as blue underlined text — that looks dated on a dark navbar.

Save with Ctrl + S, switch to the browser, and press Ctrl + R to refresh.

The logo and links are now on the same line — that's flexbox working! But they're squished together on the left side of the navbar. We need to push them apart. That's what justify-content is for, and we'll add it in the next step.

Experiment: try commenting out the universal reset (* { ... }) by putting /* before it and */ after it. Save and refresh. Notice the extra gaps and spacing that appear? There's a gap around the edges of the page (body's default 8px margin), and the heading has extra space above it. That's browser defaults leaking through. Uncomment the reset to restore the clean slate.`,
        analogy: "The universal reset is like clearing a table before setting it for dinner. The table might have crumbs, placemats, and random items from earlier — you sweep it all clean before placing your plates and silverware exactly where you want them. Without clearing first, you'd be arranging things around the mess. The reset gives you a blank canvas.",
        docLinks: [
          {
            label: "display: flex",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/display",
            type: "css-property",
          },
          {
            label: "box-sizing",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing",
            type: "css-property",
          },
          {
            label: "CSS basic box model",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Introduction_to_the_CSS_box_model",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            body: "box-sizing: border-box is so universally useful that virtually every CSS framework and reset stylesheet includes it. Without it, layouts constantly break because adding padding or borders makes elements wider than you intended. Once you start using border-box, you'll never go back to the default content-box behavior.",
          },
          {
            variant: "standard",
            body: "The * (universal) selector targets every single element on the page — headings, paragraphs, divs, links, images, everything. It's the broadest possible selector. Using it for the reset is fine because margin: 0, padding: 0, and box-sizing: border-box are safe defaults that you'll override with more specific rules as needed.",
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
  font-family: system-ui, -apple-system, sans-serif;
}

.navbar {
  display: flex;
  background: #1E293B;
  color: white;
  padding: 16px 24px;
}

.logo {
  font-weight: bold;
  font-size: 1.2em;
}

.nav-links a {
  color: #CBD5E1;
  text-decoration: none;
  padding: 4px 12px;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Make sure you're editing style.css, not index.html.",
        "The * selector targets every element on the page — it's a universal selector.",
        "Save with Ctrl+S, then refresh the browser with Ctrl+R to see the change.",
      ],
    },

    // ── Step 4: Space with justify-content ───────────────────────────
    {
      id: "flexbox-navbar-justify",
      type: "explanation",
      instruction: {
        heading: "Space with justify-content",
        body: `The logo and links are side by side now, but they're bunched together on the left. We need to push the logo to the left edge and the links to the right edge — the classic navbar layout. Update your .navbar rule to add two new properties:

• justify-content: space-between; — This is the property that creates the signature navbar look. Here's what it does conceptually: it takes all the available horizontal space in the flex container that isn't occupied by flex items, and distributes it between the items. With only two items (logo and nav-links), ALL the extra space goes between them. The result: the first item (logo) gets pushed to the far left edge, the last item (nav-links) gets pushed to the far right edge, and all the remaining space sits in the middle as a gap. This is exactly the "logo left, nav right" pattern you see on GitHub, YouTube, Amazon, and virtually every other website.

• align-items: center; — This vertically centers all flex items within the container. By default, flex items align to the top edge of the container (flex-start). This isn't noticeable when all items are the same height, but the logo (font-size: 1.2em, bold) is taller than the links. Without align-items: center, the logo and links would be aligned at their top edges, creating a subtle misalignment. With it, they sit centered on the same visual horizontal line — clean and professional.

Save with Ctrl + S, switch to the browser, and press Ctrl + R to refresh. The logo should now be on the far left and the links on the far right. This is the classic navigation bar layout you see on nearly every website — and it took just two properties.

Experiment with different justify-content values to understand what each one does:
• Change space-between to center — save, refresh. Both the logo and links are now bunched together in the center of the navbar. This is useful for centered layouts but not for navbars.
• Try flex-end — save, refresh. Everything jumps to the right side. The left edge is empty.
• Try space-around — save, refresh. Similar to space-between, but there's also some space before the first item and after the last item. The items don't touch the edges.
• Try space-evenly — save, refresh. The space before the first item, between items, and after the last item are all exactly equal.
• Set it back to space-between — this is what we want for the navbar.

Each value distributes the extra space differently along the main axis (the horizontal row). Understanding these options is key to mastering flexbox layout.`,
        analogy: "Imagine you're arranging two pictures on a long shelf — one on each end. justify-content: space-between is like telling someone 'push one picture to the far left and the other to the far right.' All the empty shelf space ends up in the middle. If you had three pictures, the third would go in the center with equal gaps between all three.",
        docLinks: [
          {
            label: "justify-content",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content",
            type: "css-property",
          },
          {
            label: "align-items",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/align-items",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            body: "Almost every navigation bar you see on the web (GitHub, Twitter/X, Amazon, Netflix) uses this exact pattern: display: flex; justify-content: space-between; align-items: center; It's one of the most fundamental CSS layout recipes. If you remember only one flexbox combination, make it this one — you'll use it constantly.",
          },
          {
            variant: "tip",
            body: "justify-content controls the main axis (horizontal in a row layout). align-items controls the cross axis (vertical in a row layout). A common mistake is mixing them up. Remember: justify = main axis direction, align = perpendicular to main axis.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1E293B;
  color: white;
  padding: 16px 24px;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Add justify-content and align-items inside the existing .navbar rule.",
        "Don't create a second .navbar rule — update the one you already have.",
        "Save and refresh to see the logo jump to the left and links to the right.",
      ],
    },

    // ── Step 5: Make the links flex too ──────────────────────────────
    {
      id: "flexbox-navbar-nested-flex",
      type: "explanation",
      instruction: {
        heading: "Make the links flex too",
        body: `The navbar layout is working — logo on the left, links on the right. But the individual links inside nav-links are still stacking vertically or behaving awkwardly. That's because the <a> elements inside .nav-links are block-level by default and each one takes up its own line. We need to make them sit side by side in a row. The solution? Make .nav-links a flex container too.

Yes, flex containers can be nested! This is totally valid and extremely common in real-world CSS. The .nav-links div is simultaneously two things: it's a flex item (a child of .navbar, positioned by the outer flex layout) AND a flex container (a parent of the <a> links, controlling how they're arranged). There's no conflict — an element can be both a flex item and a flex container at the same time.

Here's how the nesting works:
- The outer flex container (.navbar) handles the big-picture layout: logo on the left, nav-links group on the right.
- The inner flex container (.nav-links) handles the detail layout: spacing the individual Home, Lessons, Practice, and About links evenly in a row.

Each level of flexbox only cares about its direct children. The outer .navbar flex doesn't know or care about the individual <a> tags — it only sees .logo and .nav-links as two flex items. The inner .nav-links flex doesn't know about .logo — it only sees the four <a> tags.

Add the following CSS rules to your style.css. Replace the existing .nav-links a rule with the updated version:

• .nav-links { display: flex; gap: 4px; align-items: center; } — We're turning nav-links into a flex container. Its children (the <a> links) will line up in a row. The gap: 4px adds consistent spacing between each link without using margins.

• gap: 4px; — The gap property adds space between flex items automatically. It's cleaner and more predictable than adding margin-right to each item. Why? Because margin-right would also add unwanted space after the last item. Before gap existed, developers had to use the hack :last-child { margin-right: 0; } to remove that trailing space. gap eliminates the problem entirely — it only adds space between items, never before the first or after the last.

• The updated .nav-links a rule adds padding: 8px 16px (making each link a comfortable click/tap target), border-radius: 6px (rounding the corners for the hover effect), and transition: background 0.2s, color 0.2s (making the hover color change smooth instead of instant — 0.2s means the animation takes 200 milliseconds, just fast enough to feel responsive but slow enough to notice).

• The hover effect (.nav-links a:hover { background: #334155; color: white; }) gives visual feedback when the user moves their cursor over a link. The :hover pseudo-class applies styles only while the mouse is over the element. The rounded background highlight you see on hover is a modern UI pattern — much more polished than the old-school underline-on-hover approach.

Save with Ctrl + S, refresh, and hover over the links. You should see a smooth, rounded highlight appear on each link. Try hovering slowly between links — notice how the highlight transitions smoothly in and out? That's the transition property at work.`,
        docLinks: [
          {
            label: "gap",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/gap",
            type: "css-property",
          },
          {
            label: "transition",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/transition",
            type: "css-property",
          },
          {
            label: ":hover pseudo-class",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/:hover",
            type: "css-selector",
          },
          {
            label: "Nesting flex containers",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Mastering_wrapping_of_flex_items",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            body: "Before gap existed, developers used margin-right on each item and then had to remove it from the last item with :last-child { margin-right: 0; }. The gap property eliminates that hack entirely — it only adds space between items, never before the first or after the last. Use gap whenever you can. It works in both flexbox and CSS Grid.",
          },
          {
            variant: "standard",
            body: "Nesting flex containers is a core flexbox skill. Almost every real-world layout uses multiple levels of flex: a page-level flex for the overall structure, section-level flex for content areas, and component-level flex for things like navbars, cards, and form rows. Once you understand that any flex item can also be a flex container, layout possibilities open up dramatically.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `.nav-links {
  display: flex;
  gap: 4px;
  align-items: center;
}

.nav-links a {
  color: #CBD5E1;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;
}

.nav-links a:hover {
  background: #334155;
  color: white;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Add the .nav-links rule as a new block — don't put it inside the .navbar rule.",
        "Replace your existing .nav-links a rule with the updated version that includes padding, border-radius, and transition.",
        "The :hover pseudo-class goes on a separate rule: .nav-links a:hover { ... }",
      ],
    },

    // ── Step 6: Add active state and content spacing ─────────────────
    {
      id: "flexbox-navbar-active-state",
      type: "explanation",
      instruction: {
        heading: "Add active state and content spacing",
        body: `Almost every navigation bar highlights the current page so users know where they are on the site. This is such a universal pattern that you probably don't even notice it anymore — but start looking, and you'll see it everywhere:

• GitHub: the current tab (Code, Issues, Pull Requests) has a colored underline and bold text.
• YouTube: the selected section in the sidebar is highlighted with a darker background.
• Amazon: the active department category is visually emphasized.
• Google: the active search type (All, Images, Videos, News) has a blue underline.

The .active class is the simplest approach to this pattern — you add it to whichever link matches the current page. In a static HTML page like ours, you set it manually. In a real web application, JavaScript or the framework handles this automatically by comparing the current URL to each link's href and adding the .active class to the matching one.

First, go back to index.html and add class="active" to the Home link:

<a href="#" class="active">Home</a>

This tells our CSS "this is the current page." Now add these CSS rules to style.css:

• .nav-links a.active — This selector targets any <a> tag inside .nav-links that also has the class "active." The selector reads right-to-left: find an element with class active, that is also an <a> tag, that is inside an element with class nav-links. It gets a blue background (#3B82F6) and white text, making it visually distinct from the other links. The blue color matches the brand accent, creating visual consistency. On a real site, you'd set this class dynamically based on which page the user is currently viewing.

• .content — This styles the main page content below the navbar. Let's break down each property:
  - max-width: 800px limits how wide the text can get. On a large monitor, text that stretches all the way across the screen is exhausting to read — your eyes have to travel too far from the end of one line back to the start of the next. 800px is a comfortable maximum for reading. This is why newspaper columns are narrow and why Medium, DEV Community, and most blogs limit their content width.
  - margin: 40px auto creates 40px of space above and below the content (separating it from the navbar), and auto on left and right splits the remaining horizontal space evenly — this is the classic centering technique for block elements. If the page is 1200px wide and the content is 800px, the auto margins each become 200px, centering the content perfectly.
  - padding: 0 24px adds horizontal padding so the text doesn't touch the edges of the viewport on narrow screens. On a phone where the screen is less than 800px wide, the max-width has no effect, but the 24px padding still keeps the text from being flush against the screen edges.

Save both files (Ctrl + S in each tab), then refresh. The Home link should have a blue highlight that's visually distinct from the other links, and the page content below the navbar should be nicely centered with comfortable spacing.`,
        docLinks: [
          {
            label: "max-width",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/max-width",
            type: "css-property",
          },
          {
            label: "margin: auto",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/margin",
            type: "css-property",
          },
          {
            label: "CSS selectors",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            body: "Don't forget to add class=\"active\" to the Home link in your HTML file! The CSS rule .nav-links a.active won't have any effect unless an <a> element actually has that class. This is a common mistake — you write the CSS but forget to add the class in the HTML. If you don't see the blue highlight after refreshing, check the HTML first.",
          },
          {
            variant: "standard",
            body: "The margin: auto centering technique only works on elements with a set width or max-width. If you remove max-width, the content stretches to fill the entire page, and there's no 'remaining space' for auto to split. This is why max-width and margin: auto almost always appear together — one constrains the width, the other centers the constrained element.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `.nav-links a.active {
  background: #3B82F6;
  color: white;
}

.content {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 24px;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Update the Home link in index.html: <a href=\"#\" class=\"active\">Home</a>",
        "Add both new CSS rules at the bottom of style.css.",
        "Save BOTH files before refreshing — changes to index.html won't appear until you save it too.",
      ],
    },

    // ── Step 7: Checkpoint ───────────────────────────────────────────
    {
      id: "flexbox-navbar-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: Add a mobile menu button",
        body: `Time to practice on your own! Add a "Menu" button to the right side of the navbar. On a real responsive site, this button would be hidden on desktop and shown on mobile screens (using a media query). For now, just style the button and hide it with display: none — you'd toggle it visible on small screens later.

On mobile, there's not enough horizontal space for all the navigation links. Try resizing your browser window to a narrow width — the links get cramped, may wrap to a second line, or overflow off the edge. This is a real problem that every website has to solve. The standard solution is called "responsive navigation": on small screens, you hide the full nav-links and show a compact hamburger menu button instead. The hamburger icon (three horizontal lines, often written as the character ☰) has become the universal symbol for "tap here to open the menu."

This pattern is built with the same display: none and display: flex techniques you've already learned in the show/hide codelab! On desktop, the menu button has display: none (hidden) and the nav-links have display: flex (visible). On mobile, a media query flips them: the nav-links get display: none and the menu button gets display: block. It's the same show/hide toggle, just triggered by screen width instead of a button click.

Your tasks:
1. Style the .menu-btn with a background color, text color, border, padding, and border-radius that match the navbar's dark theme. It should look like it belongs in the navbar — not like a default browser button.
2. Use display: none; to hide it by default — on desktop screens, the full navigation links are visible, so the menu button isn't needed. On a real site, a CSS media query like @media (max-width: 768px) { .menu-btn { display: block; } } would show it on mobile.

Think about how this button would fit into the flex layout: since the navbar uses justify-content: space-between, adding a third direct child element would change the spacing — the browser would distribute space between three items instead of two. On mobile, you'd typically hide the nav-links (display: none) and show only the logo and menu button, keeping the two-item space-between layout intact.`,
        docLinks: [
          {
            label: "display",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/display",
            type: "css-property",
          },
          {
            label: "<button> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button",
            type: "html-element",
          },
          {
            label: "Responsive design",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            body: "The hamburger menu pattern (three horizontal lines ☰) is the most common mobile navigation pattern on the web. On desktop, the full nav-links are visible. On mobile, they're hidden and replaced by a menu button that toggles a dropdown or slide-out panel. This pattern is used by virtually every responsive website — from small blogs to Google, Facebook, and Twitter/X.",
          },
          {
            variant: "tip",
            body: "When you add the menu button to your HTML, place it inside the <nav> element as a sibling of .logo and .nav-links. This makes it a third flex item. Since it's hidden with display: none on desktop, it won't affect the layout. On mobile (with a media query), you'd show it and hide .nav-links instead.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode: `<button class="menu-btn">Menu</button>

<style>
.menu-btn {
  /* Style this as a navbar button */
  /* Use display: none to hide on desktop */

}
</style>`,
        language: "both",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "display" },
      },
      hints: [
        "Style the button with background, color, border, padding, border-radius.",
        "Use display: none; to hide it by default (you'd show it on mobile with a media query later).",
        "Example: .menu-btn { display: none; background: #334155; color: white; border: 1px solid #475569; padding: 8px 16px; border-radius: 6px; cursor: pointer; }",
      ],
    },
  ],
};
