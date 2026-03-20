import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "responsive-design-codelab-responsive-nav",
  slug: "codelab-responsive-nav",
  title: "Codelab: Responsive Navigation",
  description:
    "Build a navigation bar that switches from a hamburger menu on mobile to a horizontal link bar on desktop.",
  order: 10,
  steps: [
    {
      id: "codelab-nav-setup",
      type: "explanation",
      instruction: {
        heading: "Set up your project",
        body: `In this codelab, you'll build one of the most important responsive patterns on the web: a navigation bar that adapts to screen size. On desktop, navigation links sit in a horizontal row. On mobile, there's no room for all those links, so they're hidden behind a hamburger button (those three horizontal lines you see on every mobile site). When you tap the hamburger, the links appear in a vertical dropdown.

Every major website uses this pattern: Google, YouTube, GitHub, Amazon, Twitter/X, Instagram — they all have horizontal nav on desktop and a hamburger menu on mobile. You'll build this using pure CSS (no JavaScript), which teaches you the limits and capabilities of CSS-only responsive solutions.

Open a terminal (Ctrl + Alt + T) and run:

<ul><li>mkdir ~/responsive-nav — Creates the project folder.</li><li>cd ~/responsive-nav — Moves into the folder.</li><li>touch index.html style.css — Creates the two files we need.</li><li>code . — Opens VS Code with the folder loaded.</li></ul>`,
        infoBoxes: [
          {
            variant: "tip",
            body: "This codelab builds on the previous one. If you're comfortable with the setup process, feel free to move quickly through this step. The key files are the same: index.html and style.css.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `mkdir ~/responsive-nav
cd ~/responsive-nav
touch index.html style.css
code .`,
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Open a terminal with Ctrl+Alt+T.",
        "Type each command and press Enter.",
      ],
    },
    {
      id: "codelab-nav-html",
      type: "explanation",
      instruction: {
        heading: "Write the HTML structure",
        body: `Click on index.html and type the following code. The navigation uses a clever CSS-only technique: a hidden checkbox (<input type="checkbox">) and a <label> styled as the hamburger button. When the checkbox is checked, we use CSS to show the navigation links. When it's unchecked, the links are hidden. No JavaScript needed!

Here's the anatomy:

<ul><li><nav class="navbar"> wraps the entire navigation bar.</li><li><a class="logo"> is the site logo/name — it's always visible.</li><li><input type="checkbox" id="menu-toggle"> is an invisible checkbox that tracks the open/closed state.</li><li><label for="menu-toggle" class="hamburger"> is the hamburger button. The "for" attribute connects it to the checkbox — clicking the label toggles the checkbox. The ☰ character (Unicode hamburger) is a simple three-line icon.</li><li><ul class="nav-links"> contains the actual navigation links. On mobile, this list is hidden by default and shown when the checkbox is checked.</li></ul>

The checkbox hack works because CSS has a selector for checked checkboxes: input:checked. Combined with the sibling selector (~), we can write CSS that says "when the checkbox is checked, show the nav links that come after it."

Save with Ctrl + S and open in your browser with xdg-open index.html.`,
        docLinks: [
          {
            label: "MDN: <nav> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav",
            type: "html-element",
          },
          {
            label: "MDN: <label> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label",
            type: "html-element",
          },
          {
            label: "MDN: :checked pseudo-class",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/:checked",
            type: "css-selector",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            body: "The <nav> element is semantic HTML — it tells browsers and screen readers that this section contains navigation links. Always wrap your site navigation in a <nav> element. This is important for accessibility: screen reader users can jump directly to navigation landmarks on the page.",
          },
          {
            variant: "tip",
            body: "The checkbox hack is a great way to learn CSS selectors, but in production you'd typically use JavaScript for hamburger menus — it gives you more control over animations, focus management, and accessibility (like trapping focus inside the open menu and closing it with the Escape key).",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Responsive Navigation</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav class="navbar">
    <a href="#" class="logo">WebSprout</a>

    <!-- Hidden checkbox for toggle state -->
    <input type="checkbox" id="menu-toggle" class="menu-checkbox">

    <!-- Hamburger label (only visible on mobile) -->
    <label for="menu-toggle" class="hamburger">&#9776;</label>

    <!-- Navigation links -->
    <ul class="nav-links">
      <li><a href="#">Home</a></li>
      <li><a href="#">Courses</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Blog</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>

  <main class="content">
    <h1>Welcome to WebSprout</h1>
    <p>Resize the browser window to see the navigation change!</p>
  </main>
</body>
</html>`,
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "The checkbox must come before the nav-links in the HTML for the CSS sibling selector to work.",
      ],
    },
    {
      id: "codelab-nav-mobile-css",
      type: "explanation",
      instruction: {
        heading: "Style the mobile navigation",
        body: `Click on style.css and add the following CSS. This is the mobile-first base — the navbar starts as a mobile hamburger menu.

Let's break down the key techniques:

<ul><li>.navbar uses display: flex with flex-wrap: wrap. The flex-wrap: wrap is crucial — it allows the nav-links list to drop to a new line below the logo and hamburger.</li><li>.menu-checkbox { display: none; } hides the actual checkbox. We never want users to see it — the hamburger label is the visual control.</li><li>.hamburger is styled as a button (font-size: 1.5rem makes it large enough to tap on mobile). On mobile, it's visible.</li><li>.nav-links { display: none; width: 100%; } hides the navigation links by default and makes them full-width so they fill the entire row below the logo when shown.</li><li>The magic line: .menu-checkbox:checked ~ .nav-links { display: flex; } — This uses the general sibling combinator (~) to select .nav-links that comes after a checked .menu-checkbox. When the hamburger is tapped (toggling the checkbox), the links appear as a vertical list.</li></ul>

Save and refresh. You should see just the logo and the hamburger icon. Click the hamburger — the links slide into view below. Click again — they disappear. All with zero JavaScript!`,
        docLinks: [
          {
            label: "MDN: General sibling combinator (~)",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_combinator",
            type: "css-selector",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            body: "The ~ (general sibling combinator) selects all siblings that come after the specified element. The + (adjacent sibling combinator) only selects the immediately next sibling. We use ~ here because the .nav-links isn't immediately after the checkbox — the label is in between.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `/* Global reset */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, sans-serif;
  color: #1E293B;
}

/* Navbar container */
.navbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #1E293B;
}

/* Logo */
.logo {
  color: white;
  font-size: 1.25rem;
  font-weight: 700;
  text-decoration: none;
}

/* Hide the actual checkbox */
.menu-checkbox {
  display: none;
}

/* Hamburger button */
.hamburger {
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

/* Nav links — hidden on mobile by default */
.nav-links {
  display: none;
  flex-direction: column;
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-links li a {
  display: block;
  padding: 0.75rem 1rem;
  color: #CBD5E1;
  text-decoration: none;
  border-top: 1px solid #334155;
}

.nav-links li a:hover {
  background: #334155;
  color: white;
}

/* Show links when checkbox is checked */
.menu-checkbox:checked ~ .nav-links {
  display: flex;
}

/* Content area */
.content {
  padding: 2rem;
}

.content h1 {
  font-size: clamp(1.5rem, 3vw + 0.5rem, 2.5rem);
  margin-bottom: 1rem;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "The key selector is .menu-checkbox:checked ~ .nav-links — it shows links when the checkbox is toggled.",
        "Save and refresh, then click the hamburger icon to test.",
      ],
    },
    {
      id: "codelab-nav-desktop-css",
      type: "explanation",
      instruction: {
        heading: "Add the desktop media query",
        body: `Now add the media query that transforms the navigation for desktop screens. Add this at the bottom of your style.css:

Here's what changes at 768px and above:

<ul><li>.hamburger { display: none; } hides the hamburger button — on desktop, there's plenty of room for all the links, so the toggle button isn't needed.</li><li>.nav-links { display: flex; flex-direction: row; width: auto; } makes the links always visible (overriding the mobile display: none), arranges them horizontally, and lets them take only the space they need (instead of full width).</li><li>The border-top on links is removed since they're now in a row, not a column.</li><li>.nav-links li a gets horizontal padding instead of full-block padding, and a border-radius for a subtle pill shape on hover.</li></ul>

Save and refresh. Now resize your browser:
<ul><li>Below 768px: You see the hamburger, and clicking it toggles a vertical dropdown.</li><li>Above 768px: The hamburger disappears, and all links are visible in a horizontal row.</li></ul>

This is the exact same pattern used by GitHub's navigation, Bootstrap's navbar component, and virtually every responsive website on the internet. The only difference in production code is that most sites use JavaScript for the toggle (for better accessibility) instead of the checkbox hack.`,
        docLinks: [
          {
            label: "MDN: @media",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            body: "In the desktop media query, .nav-links { display: flex; } overrides both the default display: none AND the .menu-checkbox:checked ~ .nav-links rule. This means the links are always visible on desktop regardless of the checkbox state. The cascade ensures that later rules (or more specific rules) win.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `/* Desktop navigation */
@media (min-width: 768px) {
  .hamburger {
    display: none;
  }

  .nav-links {
    display: flex;
    flex-direction: row;
    width: auto;
    gap: 0.25rem;
  }

  .nav-links li a {
    border-top: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
  }
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Add this at the very end of your style.css file.",
        "Save and resize the browser to test both mobile and desktop layouts.",
      ],
    },
    {
      id: "codelab-nav-transitions",
      type: "explanation",
      instruction: {
        heading: "Add smooth transitions",
        body: `The current menu snaps open and closed instantly. Let's add a smooth slide-down animation. This is a common polish step that makes the navigation feel professional.

Replace the .nav-links rule with a version that uses max-height for animation instead of display: none. The trick: display: none can't be animated with CSS transitions, but max-height can. We set max-height: 0 and overflow: hidden to hide the content, then transition max-height to a large value when checked.

Replace your existing .nav-links and .menu-checkbox:checked ~ .nav-links rules with the updated versions below. Keep everything else the same.

Save and refresh. Now when you click the hamburger, the menu slides down smoothly instead of popping in. Click again and it slides back up. This is a much more polished experience.

Note: We use max-height: 500px as the "open" value — it needs to be larger than the actual content height. The transition animates from 0 to 500px, but the element only expands to its actual content height. The excess doesn't matter visually, but it means the animation timing won't be perfectly linear. In production, JavaScript would measure the actual height for a perfectly smooth animation.`,
        infoBoxes: [
          {
            variant: "tip",
            body: "You cannot animate the 'display' property with CSS transitions — it's either visible or not, with no in-between states. To animate showing/hiding, use max-height (as we do here), opacity, or transform: scaleY(). Each has trade-offs: max-height is simple but imprecise timing, opacity keeps the element in the flow, and scaleY has smooth timing but can look unusual.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `/* Replace your existing .nav-links rule with this: */
.nav-links {
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

/* Replace your existing checked rule with this: */
.menu-checkbox:checked ~ .nav-links {
  max-height: 500px;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Replace the old display: none approach with max-height: 0 and overflow: hidden.",
        "The transition property animates the change smoothly.",
      ],
    },
    {
      id: "codelab-nav-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: Enhance the navigation",
        body: `Experiment and customize your navigation. Here are some challenges:

<ul><li>Add a dropdown submenu under one of the links (use nested <ul> elements and :hover to reveal them).</li><li>Change the hamburger icon from the Unicode character to three styled <span> lines (this is how most sites do it — it enables animating the lines into an X when open).</li><li>Add an "active" state — highlight the current page link with a different color or underline.</li><li>Try a different breakpoint — what if the navigation switches at 1024px instead of 768px?</li><li>Add a semi-transparent backdrop overlay behind the dropdown on mobile.</li><li>Make the logo responsive — show an icon on mobile and the full name on desktop.</li></ul>

Experiment freely! Change values, add rules, break things, and fix them. This is how you build real CSS intuition.`,
      },
      config: {
        type: "free-edit",
        starterCode:
          "/* Customize your responsive navigation!\n * Try:\n * - A different color scheme\n * - Animated hamburger lines (span-based)\n * - Active link highlighting\n * - A dropdown submenu\n * - A backdrop overlay on mobile\n */\n\n.navbar {\n  /* Your customizations here */\n}\n",
        language: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "For an active link, add a class 'active' to one <li> and style .nav-links li.active a with a different color.",
        "For animated hamburger lines, replace &#9776; with three <span> elements and use transform: rotate() when .menu-checkbox:checked.",
      ],
    },
  ],
};
