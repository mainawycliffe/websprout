import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "display-layout-codelab-flexbox-cards",
  slug: "codelab-flexbox-cards",
  title: "Codelab: Flexbox Card Row",
  description:
    "Build a horizontal card layout with flexbox — wrapping, spacing, and responsive sizing.",
  order: 12,
  steps: [
    // ── Step 1: Set up your project ──────────────────────────────────
    {
      id: "flex-cards-setup",
      type: "explanation",
      instruction: {
        heading: "Set up your project",
        body: `Card layouts are one of the most common patterns on the web. Stripe's pricing page, Vercel's feature grid, Medium's article feed — they all use cards arranged in flexible rows. In this codelab, you'll build a card row that wraps responsively, like a real product page. By the end, you'll understand how flexbox turns a stack of elements into a flowing, responsive grid.

Open a terminal by pressing Ctrl + Alt + T on Linux. Type the following commands one at a time, pressing Enter after each one:

• mkdir ~/flex-cards-lab — Creates a new folder called flex-cards-lab inside your home directory. mkdir stands for "make directory" (a directory is just another word for folder). The ~ symbol is a shortcut that means "my home folder" — so the new folder lands right inside your personal files.

• cd ~/flex-cards-lab — Moves you into the new folder so any files you create land here. cd stands for "change directory." From now on, any files you create will land inside flex-cards-lab.

• touch index.html style.css — Creates two empty files: one for the HTML structure and one for CSS styles. touch creates a file if it doesn't already exist.

• code . — Opens VS Code with the current folder loaded. The dot means "this folder." VS Code will open and show your two new files in the sidebar.

Your project is ready. You should see index.html and style.css in the VS Code sidebar. These two files are all you need — no build tools, no frameworks, just plain HTML and CSS opened directly in a browser.`,
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
            body: "If you just finished the Flexbox Navbar codelab, you already know this workflow. Each codelab uses a separate folder so your projects don't mix together. You can always go back to a previous lab by opening its folder.",
          },
          {
            variant: "standard",
            body: "If you don't have VS Code installed, any plain text editor works — gedit, nano, Kate, or Mousepad. The important thing is that you save plain text files with the correct file extensions (.html and .css). Don't use a word processor like LibreOffice Writer — it adds invisible formatting that browsers can't read.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `mkdir ~/flex-cards-lab
cd ~/flex-cards-lab
touch index.html style.css
code .`,
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Open a terminal with Ctrl+Alt+T.",
        "Type each command and press Enter before typing the next one.",
        "If 'code .' doesn't work, open your text editor manually and use File → Open Folder to open ~/flex-cards-lab.",
      ],
    },

    // ── Step 2: Write the card HTML ──────────────────────────────────
    {
      id: "flex-cards-html",
      type: "explanation",
      instruction: {
        heading: "Write the card HTML",
        body: `Click on index.html in the VS Code sidebar and type (or copy) the following code. This is the complete HTML for our card layout — let's break down every piece so nothing feels mysterious.

Let's walk through the structure element by element:

• <!DOCTYPE html> — Tells the browser this is an HTML5 document. Without it, the browser might render your page in an older, quirky mode.

• <html lang="en"> — The root element wrapping everything. The lang="en" attribute tells browsers and screen readers the content is in English.

• <head> — The invisible section holding metadata. The <meta charset="UTF-8"> ensures special characters display correctly. The <title> sets the browser tab text. The <link> tag connects our CSS file.

• <h1>Feature Cards</h1> — A top-level heading for the page. Every page should have exactly one <h1> — it tells search engines and screen readers what the page is about.

• <div class="card-container"> — This is our flex container. It's the outer wrapper that will control how cards are arranged. Right now it's just a plain <div>, but once we add display: flex in CSS, it becomes the command center for the entire layout. The class name "card-container" is our choice — we could call it anything, but descriptive names make code readable.

• Six <div class="card"> elements — Each card is a flex item. Inside each card, <h2> is the card title (the feature name) and <p> is the description text. We're building a feature grid like you'd see on a product landing page.

Why six cards? We need enough cards to demonstrate wrapping behavior. With only 2 or 3 cards, they might all fit on one row and you'd never see flex-wrap in action. Six cards guarantees that at most screen sizes, some cards will need to wrap to a second row — which is the whole point of this codelab.

Save with Ctrl + S and open the file in your browser (xdg-open index.html or Ctrl + O in the browser). Without any CSS, all the cards stack vertically — each <div> is a block element that takes the full width of the page. That's the browser's default behavior. The page looks like a boring document with headings and paragraphs. That's completely normal! HTML provides structure and meaning; CSS is what transforms it into a visual layout. We'll use flexbox to arrange these stacked cards into a horizontal row.`,
        analogy: "Think of the card container like a bookshelf. Each card is a book. If the shelf is wide, all books fit in one row. If the shelf is narrow, books wrap to the next row. That's exactly what flex-wrap does — and we'll add it in a few steps.",
        docLinks: [
          {
            label: "<div> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div",
            type: "html-element",
          },
          {
            label: "<h2> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements",
            type: "html-element",
          },
          {
            label: "<h1> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            body: "Every time you change your HTML or CSS, you need to: 1) Press Ctrl+S to save the file, then 2) Switch to the browser and press Ctrl+R (or F5) to refresh the page. The browser doesn't detect changes automatically — you have to tell it to reload. This save-then-refresh cycle is the core development workflow you'll use thousands of times.",
          },
          {
            variant: "standard",
            body: "In a production site, you might use semantic HTML like <section> or <article> for each card instead of plain <div> elements. We're using <div> here to keep the focus on learning flexbox layout. Once you're comfortable with the layout concepts, upgrading to semantic elements is straightforward.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Flex Cards</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Feature Cards</h1>
  <div class="card-container">
    <div class="card">
      <h2>Fast</h2>
      <p>Lightning-quick load times with optimized code.</p>
    </div>
    <div class="card">
      <h2>Secure</h2>
      <p>Built-in protection against common web attacks.</p>
    </div>
    <div class="card">
      <h2>Accessible</h2>
      <p>Designed for everyone, including screen reader users.</p>
    </div>
    <div class="card">
      <h2>Responsive</h2>
      <p>Looks great on phones, tablets, and desktops.</p>
    </div>
    <div class="card">
      <h2>Modern</h2>
      <p>Uses the latest web standards and best practices.</p>
    </div>
    <div class="card">
      <h2>Simple</h2>
      <p>Clean code that's easy to read and maintain.</p>
    </div>
  </div>
</body>
</html>`,
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Make sure the <link> tag points to style.css.",
        "All six cards must be inside the card-container div.",
        "Save with Ctrl+S, then open in a browser to see the unstyled cards stacking vertically.",
      ],
    },

    // ── Step 3: Create the flex container ────────────────────────────
    {
      id: "flex-cards-container",
      type: "explanation",
      instruction: {
        heading: "Create the flex container",
        body: `Now click on style.css in VS Code and type the following CSS. This is where we transform the stacked cards into a horizontal layout.

Let's walk through each rule in detail:

• body — We set a clean system font (system-ui, sans-serif), remove default margins with margin: 0, add 24px of padding around the page for breathing room, and use a light slate background (#F1F5F9) to create contrast with the white cards we'll add. The light background is important — without it, white cards on a white page look like they're floating in nothing.

• h1 — A dark heading color (#1E293B) that's softer than pure black (which can cause eye strain), and a bottom margin of 16px to space it from the cards below.

• .card-container { display: flex; } — This single line is the most important CSS in this entire codelab. Without display: flex, all 6 cards stack vertically — each one takes a full row because <div> is a block element. Adding display: flex tells the container "lay your children out in a row instead of stacking them." The card-container becomes a flex container, and all six cards become flex items arranged side by side.

But look what happens — the cards are all squished together in one line, crammed side by side with no spacing! Each card is only as wide as its text content, so some cards are wider than others. It doesn't look great yet, but the fundamental layout shift — from vertical stacking to horizontal row — is the power of flexbox in action.

• .card — Each card gets a white background for contrast against the page, 24px of padding for internal breathing room, rounded corners (border-radius: 12px) for a modern look, and a subtle shadow (box-shadow: 0 1px 3px rgba(0,0,0,0.1)) for depth. The shadow creates the illusion that cards are floating slightly above the background — a pattern used heavily in Material Design and modern UI frameworks like Tailwind and HeroUI.

• .card h2 and .card p — We reset margins on the heading and paragraph inside each card to get precise control over spacing. The paragraph gets a smaller font size (14px) and a muted gray color (#64748B) so it reads as secondary text — the heading is the star, the paragraph supports it.

Save with Ctrl + S, refresh the browser. You'll see all six cards crammed into a single row, each only as wide as its text.

Experiment: Resize your browser window narrower. Notice the cards overflow past the right edge! They won't wrap to a new line yet — they just get cut off or cause a horizontal scrollbar. That's because flex containers default to keeping everything on one line (flex-wrap: nowrap). We need card sizing and flex-wrap to fix this — coming in the next steps.`,
        analogy: "Think of display: flex like rearranging desks in a classroom. By default, desks are in rows front-to-back (block layout — everything stacks vertically). Adding display: flex is like the teacher saying 'everyone move your desks side by side in a single row.' Suddenly the same desks are arranged horizontally instead of vertically.",
        docLinks: [
          {
            label: "display: flex",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/display",
            type: "css-property",
          },
          {
            label: "box-shadow",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow",
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
            variant: "standard",
            body: "By default, flex items try to fit on a single line. If there are too many items, they'll shrink to fit rather than wrap to the next line. This is because flex-wrap defaults to nowrap. The items will compress their content as much as possible to stay on one row — even if that means text becomes unreadable. We'll fix this shortly.",
          },
          {
            variant: "tip",
            body: "Open your browser's developer tools (F12 or Ctrl+Shift+I) and hover over the card-container. You'll see it highlighted as a single-row flex container. Many browsers even show a 'flex' badge next to the element in the inspector — click it to see a visual overlay of the flex layout.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `body {
  font-family: system-ui, sans-serif;
  margin: 0;
  padding: 24px;
  background: #F1F5F9;
}

h1 {
  margin-bottom: 16px;
  color: #1E293B;
}

.card-container {
  display: flex;
}

.card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.card h2 {
  margin: 0 0 8px;
  color: #1E293B;
}

.card p {
  margin: 0;
  color: #64748B;
  font-size: 14px;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Make sure you're editing style.css, not index.html.",
        "All six cards should appear in a single squished row after this step.",
        "If the cards are still stacking vertically, double-check that .card-container has display: flex;",
      ],
    },

    // ── Step 4: Add card sizing ──────────────────────────────────────
    {
      id: "flex-cards-sizing",
      type: "explanation",
      instruction: {
        heading: "Add card sizing",
        body: `The cards are crammed together because they have no defined width — they're just as wide as their text content. Some cards are wider than others because their text is longer. Let's give them a consistent width and minimum height so they look uniform.

Update your .card rule to add width and min-height:

• width: 250px; — Each card is now 250 pixels wide. This gives them a consistent, readable size regardless of how much text is inside. All six cards are the same width, creating a clean visual grid.

But here's an important subtlety: flex items can shrink below their stated width to fit the container. In some cases, your 250px card might shrink to 200px or even 150px if the container is narrow! This is because the default flex-shrink value is 1, which means "yes, I'm willing to shrink." If you never want cards to shrink below 250px, you could use min-width: 250px instead — it sets a hard floor. We'll use width for now because we're about to add flex-wrap, which solves the shrinking problem by pushing cards to a new row instead.

• min-height: 120px; — Ensures short cards don't look too squished. The "Fast" card might only have one line of text, while the "Accessible" card has more. Without min-height, short cards would be noticeably shorter than their neighbors. min-height sets a floor: if a card has more content, it can grow taller than 120px, but it won't shrink below that. This keeps the row visually balanced.

Save with Ctrl + S and refresh. The cards now have a defined width, but they STILL don't wrap to the next line. If your browser window is narrower than about 1500px (6 cards at 250px each), some cards are cut off on the right. That's because flex containers default to flex-wrap: nowrap — items stay on one line no matter what.

Experiment with different widths to build your intuition:
• Try width: 400px — cards are much bigger and definitely overflow on most screens.
• Try width: 100px — cards are tiny and all the text wraps awkwardly.
• Try width: 250px — a comfortable middle ground for card content.
• Set it back to width: 250px before moving to the next step.

The "right" width depends on your design — there's no universal answer. Professional developers try different values, look at the result, and adjust. That's exactly what you're doing here.`,
        analogy: "Setting a card's width is like choosing the size of picture frames for a gallery wall. Too small and the content is cramped. Too large and only a few fit per row. You want a size that balances content readability with how many frames fit side by side.",
        docLinks: [
          {
            label: "width",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/width",
            type: "css-property",
          },
          {
            label: "min-height",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/min-height",
            type: "css-property",
          },
          {
            label: "min-width",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/min-width",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            body: "Try resizing your browser window while looking at the cards. Notice how they overflow instead of wrapping? That's the default flex behavior — it assumes you want everything on one line. This is useful for some layouts (like a navbar where you never want items to wrap), but not for a card grid where wrapping is essential.",
          },
          {
            variant: "standard",
            body: "The difference between width and min-width matters in flexbox. width: 250px says 'I want to be 250px, but I'll shrink if the container is too narrow.' min-width: 250px says 'I will never be smaller than 250px, no matter what.' When combined with flex-wrap (next step), width works well because items wrap to a new line instead of shrinking.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `.card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  width: 250px;
  min-height: 120px;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Add width and min-height inside the existing .card rule.",
        "Don't create a second .card rule — update the one you already have.",
        "The cards should now have consistent widths but still overflow on narrow screens.",
      ],
    },

    // ── Step 5: Enable flex-wrap ─────────────────────────────────────
    {
      id: "flex-cards-wrap",
      type: "explanation",
      instruction: {
        heading: "Enable flex-wrap",
        body: `Here's the fix for the overflow problem — and it's just one line of CSS. Update your .card-container rule to add flex-wrap: wrap:

• flex-wrap: wrap; — This tells the flex container: "If items don't fit on one line, push them to the next line instead of squishing them." Without this property, flex items will shrink infinitely to fit one row — even if that means text becomes unreadable and cards collapse to unusable widths.

flex-wrap: wrap is the key to responsive layouts without media queries. With it, items maintain their width and flow to the next row when space runs out. This is how most responsive card layouts work on the modern web — from Stripe's pricing page to Vercel's feature grid to GitHub's repository cards.

Save with Ctrl + S and refresh. Now resize your browser window by dragging the edge slowly:
- Wide window (1500px+) → all 6 cards on one row
- Medium window (900px) → 3 cards on the first row, 3 on the second
- Narrower window (600px) → 2 cards per row across 3 rows
- Very narrow (350px) → 1 card per row, all 6 stacked

Resize your browser slowly from wide to narrow. Watch the cards flow from one row to two rows to three. Each card keeps its 250px width — they don't squish or distort. This is responsive design with just two lines of CSS (display: flex and flex-wrap: wrap)!

Why is this so powerful? Before flexbox, achieving this layout required JavaScript to detect the window size and rearrange elements, or complex CSS float hacks with clearfix divs. Flexbox made it declarative — you describe what you want ("wrap when items don't fit") and the browser handles the math.

Experiment:
• Try flex-wrap: nowrap (the default) — cards go back to overflowing in one line.
• Try flex-wrap: wrap-reverse — cards wrap, but new rows appear above instead of below. This is rarely used but demonstrates that flex-wrap controls the direction of wrapping.
• Set it back to flex-wrap: wrap before moving on.`,
        analogy: "flex-wrap is like text wrapping in a word processor. When a word doesn't fit at the end of a line, it moves to the next line. The word keeps its size — it doesn't get squished to fit. flex-wrap does the same thing for layout items: when a card doesn't fit in the current row, it flows to the next row at its full width.",
        docLinks: [
          {
            label: "flex-wrap",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            body: "flex-wrap: wrap is how many websites create responsive card layouts. As the viewport gets narrower, cards naturally flow to new rows. Combine this with min-width instead of fixed width for even better responsiveness — you'll try that in the checkpoint at the end of this codelab.",
          },
          {
            variant: "tip",
            body: "The combination of display: flex, flex-wrap: wrap, and a fixed width on items is sometimes called the 'flexbox card pattern.' It's one of the most commonly used layout patterns in professional web development. Once you internalize it, you'll recognize it on almost every website you visit.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `.card-container {
  display: flex;
  flex-wrap: wrap;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Add flex-wrap: wrap; inside the existing .card-container rule.",
        "Resize your browser window to see the cards wrap to new rows.",
        "If cards aren't wrapping, make sure the property is flex-wrap (with a hyphen), not flexWrap.",
      ],
    },

    // ── Step 6: Add gap and polish ───────────────────────────────────
    {
      id: "flex-cards-polish",
      type: "explanation",
      instruction: {
        heading: "Add gap and polish",
        body: `The cards wrap now, but they're still jammed together with no spacing between them. Let's add gap for spacing and a hover effect for polish — these two additions will take our layout from "functional" to "professional."

Update your .card-container to add gap, and update .card to add a hover transition:

• gap: 16px; — Adds 16 pixels of space between every card, both horizontally and vertically. Before the gap property existed, developers had to use margin on each card and then use negative margins on the container (or :last-child selectors) to avoid unwanted spacing on the edges. It was messy and error-prone. gap solved this elegantly — it adds space BETWEEN items only, never on the outer edges. No extra margin on the first card, no extra margin on the last card. Just clean, consistent spacing between neighbors. The gap property works on both flex and grid containers.

• transition: box-shadow 0.2s, transform 0.2s; — This tells the browser: "When box-shadow or transform changes, don't snap to the new value instantly — animate the change over 200 milliseconds (0.2 seconds)." Without transition, the hover effect would appear and disappear instantly, which feels jarring and cheap. The 200ms duration is a sweet spot — fast enough to feel responsive, slow enough to be noticed as an animation.

• .card:hover { box-shadow: ...; transform: translateY(-2px); } — This rule applies only when the user's mouse is hovering over a card. Two things happen simultaneously:

  - translateY(-2px) moves the card 2 pixels UP on hover, creating a "lift" effect. The card visually rises off the page. Negative Y means up (because the Y axis points downward in CSS).

  - The box-shadow changes from a subtle 1px shadow to a deeper 4px shadow with more spread. Combined with the lift, this creates the illusion of the card rising off the surface — like picking up a playing card from a table. The card's shadow gets deeper because it's "farther" from the surface.

This micro-interaction is used by Stripe, Linear, Vercel, and virtually every modern design system to make UIs feel responsive and alive. It communicates "this is interactive — click me" without any text or icons.

Save with Ctrl + S, refresh, and hover over each card. You should see a smooth lift animation. Try resizing the browser too — the cards should wrap with consistent spacing.

Experiment:
• Try gap: 0 — cards touch each other. Claustrophobic!
• Try gap: 32px — lots of breathing room, maybe too much for this design.
• Try gap: 8px 24px — that's 8px between rows, 24px between columns. Different rhythm!
• Try changing translateY(-2px) to translateY(-6px) — a more dramatic lift.
• Try removing the transition line, then hover — the effect snaps instantly. Add it back and feel the difference.`,
        docLinks: [
          {
            label: "gap",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/gap",
            type: "css-property",
          },
          {
            label: "transform",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/transform",
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
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            body: "The hover lift effect (translateY with a deeper shadow) is a small detail that makes a big difference in perceived quality. Users subconsciously feel that the card is interactive and clickable. This is why nearly every modern design system includes hover states on card components. Keep the lift subtle (1-4px) — anything more feels exaggerated.",
          },
          {
            variant: "standard",
            body: "Before the gap property existed (pre-2020 in most browsers), developers used margin on flex items and then had to deal with unwanted spacing on the edges. Common workarounds included negative margins on the container or margin: 0 on :first-child/:last-child. The gap property eliminated all of that complexity. If you see older code using these margin hacks, you can safely replace them with gap.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  width: 250px;
  min-height: 120px;
  transition: box-shadow 0.2s, transform 0.2s;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transform: translateY(-2px);
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Add gap: 16px; to .card-container.",
        "Add transition to .card and create a new .card:hover rule.",
        "Save and refresh, then hover over cards to see the lift animation.",
      ],
    },

    // ── Step 7: Checkpoint ───────────────────────────────────────────
    {
      id: "flex-cards-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: Flexible card width",
        body: `Time to practice on your own! Right now, each card has a fixed width of 250px. This means if you have extra space in a row, it's just empty space on the right side. For example, if your browser is 850px wide, three 250px cards (plus two 16px gaps) take up 782px, leaving 68px of wasted space on the right. A better approach is to let cards grow to fill available space while maintaining a minimum width.

Your task: Replace width: 250px with the flex shorthand property to make cards flexible.

flex: 1 1 250px is shorthand for three separate properties packed into one line. Let's break down each value:

• flex-grow: 1 — The first value. It means "this item CAN grow to fill extra space." The number 1 means it gets an equal share of extra space relative to other flex items. If all items have flex-grow: 1, they share extra space equally. If you set one card to flex-grow: 2, it would grab twice as much extra space as its siblings. A value of 0 means "never grow — stay exactly at my basis size."

• flex-shrink: 1 — The second value. It means "this item CAN shrink if the container is too narrow." With flex-wrap: wrap in place, shrinking rarely happens because items wrap to a new row instead. But if wrapping were disabled, this value would control how much each item compresses.

• flex-basis: 250px — The third value. This is the starting width before any growing or shrinking happens. Think of it as the "ideal" width. The browser uses this value to calculate how many items fit per row. Items start at 250px, then grow to fill leftover space.

Here's what happens with flex: 1 1 250px in practice: If a row has space for 3 cards at 250px each (750px) and the container is 900px wide, there's 150px of extra space (minus gaps). Each card grows by 50px to become 300px wide, filling the row evenly. The result is a card grid that always fills the full width with no awkward empty space on the right.

Why it matters: This is how most production card layouts work. Netflix's title rows, Airbnb's listing grids, and Amazon's product cards all use some form of flexible sizing so that cards fill the available space regardless of screen width. Fixed-width cards leave gaps; flexible cards adapt.`,
        docLinks: [
          {
            label: "flex shorthand",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/flex",
            type: "css-property",
          },
          {
            label: "flex-grow",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow",
            type: "css-property",
          },
          {
            label: "flex-shrink",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink",
            type: "css-property",
          },
          {
            label: "flex-basis",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            body: "The flex shorthand (flex: grow shrink basis) is one of the most powerful tools in CSS layout. Understanding these three values gives you precise control over how items share space. flex: 1 1 250px means 'start at 250px, grow to fill extra space, and shrink if absolutely necessary.' This is how most production card layouts work.",
          },
          {
            variant: "tip",
            body: "A common gotcha: flex: 1 is NOT the same as flex: 1 1 250px. The shorthand flex: 1 expands to flex: 1 1 0, which sets the basis to 0 — meaning items start with no width and grow from nothing. That's useful for equal-width columns, but for cards you want a minimum size, so always specify the basis explicitly.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode: `.card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  /* Replace width: 250px with flex shorthand */
  /* Cards should grow to fill available space but not shrink below 250px */

}`,
        language: "css",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "flex" },
      },
      hints: [
        "Use the flex shorthand: flex: 1 1 250px;",
        "This means: grow (1), shrink (1), with a base size of 250px.",
        "Cards will grow to fill the row but won't shrink below 250px.",
      ],
    },
  ],
};
