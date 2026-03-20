import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "display-layout-codelab-inline-block-nav",
  slug: "codelab-inline-block-nav",
  title: "Codelab: Inline-Block Nav Pills",
  description:
    "Build a navigation bar with inline-block pills — styled, spaced, and polished.",
  order: 9,
  steps: [
    // ── Step 1: Set up your project ──────────────────────────────────
    {
      id: "codelab-nav-setup",
      type: "explanation",
      instruction: {
        heading: "Set up your project",
        body: `In this codelab, you'll build a navigation bar like the ones on GitHub, Notion, or Slack — where links sit side by side as styled pills. Every major website has one: a horizontal row of clickable items at the top of the page that lets users jump between sections. By the end of this exercise, you'll have built a complete, polished nav bar from scratch using the inline-block technique, and you'll understand *why* inline-block is needed here (and not just inline or block).

Let's set up the project. Open a terminal (Ctrl + Alt + T on Linux) and type the following commands one at a time, pressing Enter after each:

• mkdir ~/nav-pills-lab — Creates a new folder called nav-pills-lab in your home directory. mkdir stands for "make directory." The ~ symbol is a shortcut that means "my home folder" — so the new folder lands right inside your personal files.

• cd ~/nav-pills-lab — Moves you into the new folder. cd stands for "change directory." From now on, any files you create will land inside nav-pills-lab.

• touch index.html style.css — Creates two empty files: one for HTML structure and one for CSS styles. touch creates a file if it doesn't already exist.

• code . — Opens VS Code with the current folder loaded. The . (dot) means "this folder." VS Code will open and show your two new files in the sidebar.

Your workspace is ready. You should see index.html and style.css in the VS Code sidebar.`,
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
            body: "If you don't have VS Code, any plain-text editor works — gedit, nano, Kate, or Mousepad. Just make sure you save files with the correct extensions (.html and .css). Avoid word processors like LibreOffice Writer — they add invisible formatting.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `mkdir ~/nav-pills-lab
cd ~/nav-pills-lab
touch index.html style.css
code .`,
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Open a terminal with Ctrl+Alt+T.",
        "Type each command and press Enter before typing the next one.",
        "If 'code .' doesn't work, open your text editor manually and use File → Open Folder to open ~/nav-pills-lab.",
      ],
    },

    // ── Step 2: Write the navigation HTML ────────────────────────────
    {
      id: "codelab-nav-html",
      type: "explanation",
      instruction: {
        heading: "Write the navigation HTML",
        body: `Click on index.html in the VS Code sidebar and type (or copy) the following code. Before you do, let's walk through every meaningful element so you understand not just *what* to type, but *why* each piece exists.

The boilerplate (<!DOCTYPE html>, <html>, <head>, <body>) works the same way as in the previous codelab, so we'll focus on the new parts:

• <nav class="nav-bar"> — The <nav> element is a semantic HTML element specifically designed for navigation sections. "Semantic" means it carries meaning beyond its appearance — it tells the browser and assistive technologies "this section contains navigation links." When a screen reader encounters a <nav>, it announces "navigation" to the user, letting them jump directly to it or skip past it. This is a huge accessibility win. You could use a plain <div> instead, but <div> is meaningless — it just says "this is a box." Using <nav> says "this is a navigation area," which helps everyone: screen readers, search engines, and other developers reading your code. A page can have multiple <nav> elements — for example, a main navigation at the top and a sidebar or footer nav.

• <a href="#" class="nav-pill active"> — This is an anchor element (<a>), which creates a hyperlink. We're using links here (not buttons) because navigation items take the user to a different page — that's what links are for. Buttons, by contrast, trigger an action on the current page (like submitting a form or opening a menu). This distinction matters for accessibility: screen readers announce links and buttons differently, and keyboard navigation treats them differently too.

• href="#" — The href attribute specifies where the link goes. The # is a placeholder that means "link to the top of the current page" — it doesn't navigate anywhere meaningful. In a real website, you'd replace # with actual page URLs like /blog, /projects, /about, or /contact. We use # in prototypes and exercises so the links are functional (clickable) without needing real pages to exist.

• class="nav-pill" — This class name will let us target all navigation links in CSS. All five links share this class, so any styles we apply to .nav-pill will affect every link in the nav bar. The name "nav-pill" is descriptive — it tells other developers (and future you) that these elements should look like rounded pill shapes.

• class="nav-pill active" — The first link ("Home") has an extra class: active. An HTML element can have multiple classes separated by spaces. The active class visually marks this link as the current page — the one the user is currently viewing. When you visit a real website and see one of the nav items highlighted in a different color, that's the active state in action. It's a crucial wayfinding cue: "You are here." Without it, users would have to remember which page they clicked on, or check the URL bar.

Save with Ctrl + S, then open in your browser:

xdg-open index.html

You'll see five plain blue underlined links in a row. They're inline by default (links are inline elements), so they sit side by side. But they look like plain text links from the 1990s — no pills, no bar, no style. The HTML gives us structure and meaning; CSS will transform the appearance next.`,
        analogy: "Using <nav> instead of <div> is like putting a sign on a door that says \"Reception\" instead of just \"Room 3.\" Both are technically rooms, but the labeled door tells visitors exactly what's inside without them having to open it. Semantic HTML labels your content so browsers, screen readers, and search engines know what they're looking at.",
        docLinks: [
          {
            label: "<nav> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav",
            type: "html-element",
          },
          {
            label: "<a> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a",
            type: "html-element",
          },
          {
            label: "class attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class",
            type: "html-attribute",
          },
          {
            label: "href attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href",
            type: "html-attribute",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            body: "Always use the <nav> element for primary navigation sections. Screen readers can jump directly to <nav> elements, making your site easier to navigate for people using assistive technology. A page can have multiple <nav> elements (e.g., main navigation, sidebar navigation, footer links).",
          },
          {
            variant: "tip",
            body: "Use links (<a>) for navigation (going to a different page) and buttons (<button>) for actions (submitting a form, toggling a menu, playing a video). This distinction isn't just semantic — it affects keyboard behavior, screen reader announcements, and how search engines index your site. Getting it right is a core accessibility practice.",
          },
          {
            variant: "standard",
            body: "An element can have multiple CSS classes separated by spaces: class=\"nav-pill active\" gives the element two classes. In CSS, .nav-pill targets all elements with the nav-pill class, and .nav-pill.active (no space!) targets elements that have BOTH classes. This pattern — a shared base class plus a modifier class — is one of the most common patterns in CSS.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Nav Pills</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav class="nav-bar">
    <a href="#" class="nav-pill active">Home</a>
    <a href="#" class="nav-pill">Blog</a>
    <a href="#" class="nav-pill">Projects</a>
    <a href="#" class="nav-pill">About</a>
    <a href="#" class="nav-pill">Contact</a>
  </nav>
</body>
</html>`,
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Make sure all five <a> tags are inside the <nav> element.",
        'Only the first link should have both classes: class="nav-pill active".',
        "Save with Ctrl+S, then open with xdg-open index.html.",
      ],
    },

    // ── Step 3: Apply inline-block styling ───────────────────────────
    {
      id: "codelab-nav-inline-block",
      type: "explanation",
      instruction: {
        heading: "Apply inline-block styling",
        body: `Now click on style.css in the sidebar and add the following CSS. This step is the heart of the codelab — we're going to make links behave like proper, styled boxes while keeping them on the same line. Let's walk through every section.

Body styles:
• font-family: system-ui, sans-serif; — Uses the operating system's default font (San Francisco on macOS, Segoe UI on Windows, Ubuntu/Roboto on Linux). This looks clean and loads instantly because no font file needs to be downloaded. It's what many modern apps use.
• margin: 0; — Removes the browser's default body margin (usually 8px on all sides). Without this, your nav bar would float slightly away from the edges of the page. Resetting the margin gives us full control over spacing.
• padding: 20px; — Adds our own consistent spacing around the entire page content.
• background: #F8FAFC; — A very light cool gray background, softer and easier on the eyes than pure white (#FFFFFF).

Nav bar styles:
• background: white; — The nav bar is a white strip sitting on the light gray background, creating visual separation.
• padding: 8px; — Internal spacing so the pill elements don't touch the edges of the nav bar. Think of it as the foam inside a shipping box — it keeps the contents (pills) away from the walls (edges of the bar).
• border-radius: 12px; — Rounds the corners of the nav bar container for a modern, friendly look.
• box-shadow: 0 1px 3px rgba(0,0,0,0.1); — A subtle drop shadow that gives the bar a slight "lift" off the background, creating a sense of depth. The values mean: 0 horizontal offset, 1px vertical offset, 3px blur radius, and a black color at 10% opacity.

Nav pill styles — this is the critical part:
• display: inline-block; — This is THE essential property and the entire reason this codelab exists. By default, <a> tags are inline elements. Inline elements have a critical limitation: they don't properly respect vertical padding, vertical margin, width, or height. The padding will *appear* visually, but it won't push neighboring elements away — it'll overlap with content above and below, creating a broken-looking layout. With display: inline-block, each link becomes a proper box that respects all box model properties (padding, margin, width, height) while still sitting next to its siblings on the same line. It's the best of both worlds: block-level sizing with inline-level flow.

• padding: 8px 16px; — The two-value shorthand: 8px top/bottom, 16px left/right. This makes each pill taller and wider than the text alone, creating a comfortable click target. On touch devices, small links are hard to tap — the padding makes the clickable area large enough for fingers.
• text-decoration: none; — Removes the default blue underline from links. Navigation pills communicate "clickable" through their shape and hover state instead of an underline.
• color: #334155; — A dark slate gray for the text. Softer than pure black, which can feel harsh.
• border-radius: 8px; — Rounds the corners of each individual pill. This is what gives them the "pill" shape.
• font-size: 14px; — Slightly smaller than the browser default (16px), which is common for navigation text.
• font-weight: 500; — Medium weight, slightly bolder than normal (400) for better readability at small sizes.

Try this experiment to understand *why* inline-block is needed: Temporarily remove the display: inline-block; line from .nav-pill (comment it out with /* and */). Save with Ctrl + S and refresh with Ctrl + R. The links still sit side by side (they're inline by default), and the padding still *appears* visually. But look closely — the vertical padding overlaps with the nav bar's edges and doesn't create proper spacing. The pills look squished and broken. Now uncomment the display: inline-block; line, save, and refresh. Everything snaps into place — proper spacing, proper sizing, proper boxes. That one line makes all the difference.

Save with Ctrl + S and refresh with Ctrl + R.`,
        analogy: "Inline-block is like giving each person at a standing-room concert their own personal space bubble. Without it (plain inline), everyone is jammed together with no personal boundaries — bumping into each other, overlapping. With inline-block, each person still stands in a line (not stacked vertically), but they each have their own defined space that others respect.",
        docLinks: [
          {
            label: "display",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/display",
            type: "css-property",
          },
          {
            label: "border-radius",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius",
            type: "css-property",
          },
          {
            label: "box-shadow",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow",
            type: "css-property",
          },
          {
            label: "text-decoration",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            body: "Try temporarily removing the display: inline-block; line, saving, and refreshing. You'll notice the vertical padding still appears visually, but it overlaps other content instead of pushing it away. This is a classic inline-element gotcha — and the exact reason inline-block exists.",
          },
          {
            variant: "standard",
            body: "Why not use display: block? Because block elements start on a new line and stretch full-width. Each nav pill would be on its own line, stacked vertically — the opposite of what we want. We need the pills to flow horizontally (inline behavior) while respecting padding and sizing (block behavior). That's exactly what inline-block provides.",
          },
          {
            variant: "tip",
            body: "Try adding width: 120px; to .nav-pill. Because we're using inline-block, the width is respected — all pills become the same width, creating a uniform grid-like navigation. Now try changing display to just inline and keep the width — it's completely ignored. This is the practical difference between inline and inline-block: inline-block respects dimensions, inline does not.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `body {
  font-family: system-ui, sans-serif;
  margin: 0;
  padding: 20px;
  background: #F8FAFC;
}

.nav-bar {
  background: white;
  padding: 8px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.nav-pill {
  display: inline-block;
  padding: 8px 16px;
  text-decoration: none;
  color: #334155;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Make sure you're editing style.css, not index.html.",
        "The display: inline-block; on .nav-pill is the key property — it lets links respect padding and sizing.",
        "Save with Ctrl+S, refresh with Ctrl+R.",
      ],
    },

    // ── Step 4: Add hover and active states ──────────────────────────
    {
      id: "codelab-nav-hover-active",
      type: "explanation",
      instruction: {
        heading: "Add hover and active states",
        body: `A navigation bar that just sits there looking static feels dead. Users need visual feedback to know something is clickable, and they need a clear indicator of where they currently are. These are two of the most fundamental principles of interactive design — feedback and wayfinding. Without them, users feel lost and unsure whether links are actually links.

Think about every website you've ever used: YouTube, Google, Amazon, Wikipedia. When you hover your mouse over a clickable element, something changes — the color shifts, a background appears, the cursor changes. This immediate visual response tells your brain "yes, this is interactive, clicking it will do something." And on every site with navigation, the current page is highlighted somehow — a different background, a bold font, an underline. This tells you "you are here."

Add these rules below your existing CSS:

How these work:

• .nav-pill:hover — The :hover pseudo-class applies styles only when the user's mouse cursor is over the element. We're adding a light gray background (#F1F5F9) and a slightly darker text color (#1E293B). The moment the cursor moves away, the styles disappear. This gives instant, real-time feedback: "yes, this is clickable, and you're pointing at it right now." :hover is one of the most commonly used pseudo-classes in CSS — you'll use it on buttons, links, cards, and virtually every interactive element.

• .nav-pill.active — This is NOT a pseudo-class (no colon). It's a compound selector that targets elements which have BOTH the .nav-pill class AND the .active class on the same element. Remember in our HTML, the first link has class="nav-pill active" — two classes, separated by a space. This selector matches that element specifically. We give it a blue background with white text, making it clearly stand out from the other pills. This permanent visual difference tells the user "this is the page you're currently on."

Save with Ctrl + S, switch to the browser, and press Ctrl + R to refresh. Now hover your mouse over each pill — you should see the gray background highlight appear as you enter each pill and disappear as you leave. The "Home" pill stays blue regardless of hovering because it has the .active class.

Try this: move the .active class to a different link in your HTML. For example, change the "Blog" link to class="nav-pill active" and remove "active" from the "Home" link. Save and refresh — now "Blog" is highlighted as the current page. In a real website, server-side code or JavaScript would add the "active" class to whichever page the user is currently viewing.

The combination of hover feedback and an active-page indicator is a standard pattern used on virtually every website with navigation — from YouTube to GitHub to Amazon to Notion. Users expect this behavior. A nav bar without these states feels broken.`,
        analogy: "Interactive states are like the feedback you get from physical buttons. When you hover, it's like resting your finger on a button — you can feel it's there and ready. When you click, the button depresses — that's the :active state. And the highlighted \"active\" pill is like the lit floor button in an elevator — it tells you which floor you're on.",
        docLinks: [
          {
            label: ":hover pseudo-class",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/:hover",
            type: "css-selector",
          },
          {
            label: "Class selectors",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Class_selector",
            type: "css-selector",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            body: "The :hover state only works with a mouse or trackpad. On touch devices (phones, tablets), there's no hover — your finger is either touching the screen or it isn't. That's why the .active class provides a permanent visual indicator for the current page. Always make sure your design works without hover as a primary cue. Never hide critical information behind a hover-only state.",
          },
          {
            variant: "standard",
            body: "The selector .nav-pill.active (no space between the two classes) means \"an element that has both classes.\" This is different from .nav-pill .active (with a space), which would mean \"an element with class .active that is a DESCENDANT of an element with class .nav-pill.\" The space vs. no-space distinction in selectors is a common source of bugs — pay close attention to it.",
          },
          {
            variant: "tip",
            body: "Try adding a :active pseudo-class too: .nav-pill:active { background: #E2E8F0; }. The :active state triggers for the split second you're clicking (mouse button down). It creates a satisfying \"press\" effect. Order matters in CSS — put :hover before :active in your stylesheet.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `.nav-pill:hover {
  background: #F1F5F9;
  color: #1E293B;
}

.nav-pill.active {
  background: #3B82F6;
  color: white;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Add these rules below your existing CSS — don't replace what you already have.",
        "The :hover styles apply when the mouse is over the element.",
        "The .nav-pill.active selector targets elements with both classes (no space between them).",
      ],
    },

    // ── Step 5: Spacing and polish ───────────────────────────────────
    {
      id: "codelab-nav-polish",
      type: "explanation",
      instruction: {
        heading: "Spacing and polish",
        body: `Let's add the finishing touches that separate a rough prototype from something that feels professional: smooth transitions and intentional spacing. These are small details, but they make a huge difference in perceived quality. Update your .nav-pill rule to match the code below (we're adding transition and margin):

What's new:

• transition: background 0.2s, color 0.2s; — This property tells the browser "when the background or color property changes (because of :hover, for instance), don't snap to the new value instantly. Instead, animate smoothly over 0.2 seconds." Without transition, the hover color change is like flipping a light switch — instant, on or off. With transition, it's like a dimmer — a smooth fade from one state to another. This tiny 200-millisecond animation makes the interaction feel polished and intentional rather than abrupt and mechanical.

The transition property goes on the BASE state (.nav-pill), not on :hover. Why? Because you want the animation to happen in both directions — when the mouse enters (idle to hover) AND when it leaves (hover back to idle). If you put transition on :hover, the fade-in would be smooth but the fade-out would be instant (because the :hover styles, including the transition, disappear the moment the cursor leaves).

Try this experiment: Temporarily change 0.2s to 2s (two whole seconds) to make the transition dramatically slow. Save and refresh, then hover over a pill. You'll clearly see the background color gradually blend from transparent to gray. Move the mouse away and watch it fade back. Now change it to 0s (zero seconds) — the transition is instant, like before. Finally, set it back to 0.2s — the sweet spot where it's fast enough to feel responsive but slow enough to be noticed as an animation rather than a snap.

• margin: 2px; — Adds a tiny gap between each pill. But here's a nuance: even without this margin, you'd likely see small gaps between the pills. Why? Because of the infamous inline-block whitespace quirk. When your <a> tags are on separate lines in the HTML, the browser treats the newline character between them as a space — just like the space between words in a sentence. This creates a gap of about 4px between each pill, even with zero margin.

This whitespace gap is one of the most well-known quirks in CSS. It's not a bug — it's by design, because inline and inline-block elements are meant to flow like text, and text has spaces between words. But it can be surprising and hard to control. Common workarounds include:

1. Setting font-size: 0 on the parent (.nav-bar) and restoring the font-size on the children (.nav-pill). The whitespace still exists, but at size 0 it's invisible.
2. Putting all <a> tags on a single line in the HTML (no whitespace between them). Functional but ugly to read.
3. Using HTML comments between tags to "eat" the whitespace: </a><!-- --><a>.
4. Using Flexbox instead of inline-block — Flexbox doesn't have this quirk at all (you'll learn Flexbox in a later module).

For now, the small whitespace gaps actually look nice — they add natural breathing room between pills. The margin: 2px adds just a touch more. Don't worry about fixing the whitespace quirk in this exercise.

Save with Ctrl + S and refresh with Ctrl + R. Hover over the pills — the color transition is subtle but makes a real difference in feel. Your nav bar is now complete! You built a fully styled, interactive navigation component using inline-block — the same pattern used on countless real websites.`,
        analogy: "Transitions are like the difference between a light switch and a dimmer. A switch is binary — on or off, no in-between. A dimmer lets you smoothly change brightness. CSS transitions are dimmers for any visual property: instead of snapping from gray to blue, the color smoothly fades, making the interface feel alive and responsive.",
        docLinks: [
          {
            label: "transition",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/transition",
            type: "css-property",
          },
          {
            label: "margin",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/margin",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            body: "The small gap between inline-block elements comes from whitespace in your HTML. If your <a> tags are on separate lines, the browser treats the newline character as a space — just like spaces between words. Some developers remove this by setting font-size: 0 on the parent and restoring it on children, or by putting elements on the same line with no spaces. Flexbox (which you'll learn in a later lesson) doesn't have this quirk.",
          },
          {
            variant: "tip",
            body: "Always put the transition property on the base state of the element, not on :hover. If you put it on :hover, the animation only works when hovering in — the mouse-leave transition will snap back instantly because the :hover rule (including its transition) no longer applies. Base state = smooth animation both ways. Hover state = smooth in, instant out.",
          },
          {
            variant: "standard",
            body: "The transition shorthand accepts multiple properties separated by commas: transition: background 0.2s, color 0.2s; means \"animate background over 0.2 seconds AND animate color over 0.2 seconds.\" You can also use transition: all 0.2s; to animate every property that changes — but this can cause unexpected animations on properties you didn't intend to animate, so listing specific properties is considered best practice.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `.nav-pill {
  display: inline-block;
  padding: 8px 16px;
  text-decoration: none;
  color: #334155;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
  margin: 2px;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Update the existing .nav-pill rule — don't create a duplicate.",
        "The transition property goes on the base state, not on :hover.",
        "Save with Ctrl+S and refresh with Ctrl+R to see the smooth hover animation.",
      ],
    },

    // ── Step 6: Checkpoint ───────────────────────────────────────────
    {
      id: "codelab-nav-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: Add a filter bar",
        body: `Time to practice! Add a filter bar below the navigation bar using the same inline-block technique you just learned. The HTML is provided — your job is to write the CSS for .filter-pill.

Filter bars are everywhere on the web. Think of the GitHub Issues page — at the top you see buttons like "Open", "Closed", and "All" that let you filter which issues are displayed. Or Airbnb's search results, where you can filter by "Price", "Type of place", "Rooms". Or YouTube's home page, where topic chips like "All", "Music", "Gaming", "Live" let you filter the feed. They all follow the same pattern: a row of clickable pills where one is highlighted as the active selection, and clicking a different one changes the filter.

Your filter pills should:
• Use display: inline-block; so they sit side by side with proper box model support. Without it, the spans would be plain inline elements that don't respect vertical padding or width.
• Have a different color scheme from the nav pills — try green (#10B981 for active background), violet (#8B5CF6), or warm orange (#F59E0B). Using a distinct color creates visual separation between the two components, so users immediately understand they're different controls.
• Include padding (try 6px 14px;), border-radius (8px for subtle rounding or 9999px for full pills), and margin for spacing between pills.
• Have an .active state for the currently selected filter — give it a solid background color with white text.
• Optionally add a :hover state and a transition for polish.

Think about what you've learned: inline-block lets inline elements respect padding, margin, and dimensions. Without it, your pills would be plain inline text that can't be properly sized or spaced — the padding would visually overlap with neighboring content instead of creating clean, separate boxes.

Experiment freely! Try different color combinations, padding amounts, font sizes, and border-radius values. There's no single correct answer — the goal is to practice the technique and develop your design eye.`,
        docLinks: [
          {
            label: "display",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/display",
            type: "css-property",
          },
          {
            label: "border-radius",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            body: "When choosing colors for a second component, pick a completely different hue from the first. If your nav uses blue, try green or violet for the filter bar. This creates clear visual distinction so users know they're interacting with different things.",
          },
          {
            variant: "standard",
            body: "Filter bars and navigation bars use the same inline-block technique, but they serve different purposes. Navigation takes you to a different page; filters change what's displayed on the current page. In code, the visual implementation is nearly identical — the difference is in the HTML semantics and JavaScript behavior (which you'll learn later). For now, focus on the CSS: the display: inline-block pattern works for both.",
          },
          {
            variant: "tip",
            body: "To make your filter bar feel distinct from the nav bar, try more than just a different color. You could use a smaller font-size, add a 1px solid border instead of a background, use a different border-radius, or add a subtle bottom border on the active pill instead of a full background. Small design differences help users distinguish between components.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode: `<nav class="filter-bar">
  <span class="filter-pill active">All</span>
  <span class="filter-pill">Recent</span>
  <span class="filter-pill">Popular</span>
  <span class="filter-pill">Archived</span>
</nav>

<style>
.filter-bar {
  margin-top: 16px;
  padding: 8px;
}

.filter-pill {
  /* Style these as inline-block pills with a different color scheme */

}
</style>`,
        language: "both",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "inline-block" },
      },
      hints: [
        "Use display: inline-block; on .filter-pill.",
        "Try a different color scheme — maybe green or violet pills.",
        "Add padding: 6px 14px; border-radius: 8px; and a background color to create the pill shape.",
      ],
    },
  ],
};
