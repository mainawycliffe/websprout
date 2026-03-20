import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "display-layout-codelab-show-hide",
  slug: "codelab-show-hide",
  title: "Codelab: Show/Hide Toggle",
  description:
    "Toggle element visibility with CSS classes — compare display: none and visibility: hidden.",
  order: 10,
  steps: [
    // ── Step 1: Set up your project ──────────────────────────────────
    {
      id: "codelab-show-hide-setup",
      type: "explanation",
      instruction: {
        heading: "Set up your project",
        body: `Time to explore how CSS can make elements appear and disappear. In this codelab, you'll build a movie review page where spoilers are hidden by default. This teaches a pattern used everywhere on the web: FAQ accordions, cookie banners, mobile menus, and notification dismissals. Every time you see content appear or disappear on a website — a dropdown opening, a toast notification fading in, a modal dialog popping up — CSS visibility control is doing the work.

Open a terminal (Ctrl + Alt + T on Linux) and type the following commands one at a time, pressing Enter after each:

• mkdir ~/show-hide-lab — Creates a new folder called show-hide-lab. mkdir stands for "make directory" (a directory is just another word for folder). The ~ symbol is a shortcut that means "my home folder" — so the new folder lands right inside your personal files.

• cd ~/show-hide-lab — Moves into the new folder. cd stands for "change directory." From now on, any files you create will land inside show-hide-lab.

• touch index.html style.css — Creates two empty files: one for HTML structure and one for CSS styles. touch creates a file if it doesn't already exist.

• code . — Opens VS Code with this folder loaded. The . (dot) means "the folder I'm currently in." VS Code will open and show your two new files in the sidebar.

You should see index.html and style.css in the VS Code sidebar, ready for editing. That's your workspace — two files, one project, and a pattern you'll use on every website you build.`,
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
            body: "If you don't have VS Code, any plain-text editor works — gedit, nano, Kate, or Mousepad. Just save files with the correct extensions (.html and .css). Don't use a word processor like LibreOffice Writer — it adds invisible formatting that browsers can't read.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `mkdir ~/show-hide-lab
cd ~/show-hide-lab
touch index.html style.css
code .`,
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Open a terminal with Ctrl+Alt+T.",
        "Type each command and press Enter before typing the next one.",
        "If 'code .' doesn't work, open your text editor manually and use File → Open Folder to open ~/show-hide-lab.",
      ],
    },

    // ── Step 2: Write the spoiler HTML ───────────────────────────────
    {
      id: "codelab-show-hide-html",
      type: "explanation",
      instruction: {
        heading: "Write the spoiler HTML",
        body: `Click on index.html in the VS Code sidebar and type the following code. We're going to build a movie review page with two review cards, each hiding a spoiler in a different way. By putting both methods on the same page, you can compare them side by side — the differences become impossible to miss.

Let's break down every element so nothing feels mysterious:

• <h1>Movie Reviews</h1> — The main heading for the page. Every page should have exactly one <h1> — it tells both the reader and search engines what the page is about.

• <div class="review-card"> — A generic container that groups a single movie review together. We have two of these — one for The Matrix and one for Inception. Why two cards? Because we're going to hide each spoiler with a different CSS technique, and having them side by side makes the comparison crystal clear.

• <h2>The Matrix (1999)</h2> — A subheading for the movie title. <h2> tells the browser this is a second-level heading — less important than the page title (<h1>) but more important than regular text. Heading hierarchy matters for accessibility: screen readers let users jump between headings to navigate a page quickly.

• <p>A groundbreaking sci-fi film...</p> — A paragraph element for the review summary. This text is always visible — it's the non-spoiler part of the review.

• <div class="spoiler hidden"> — This is the spoiler container for The Matrix. Notice it has two classes: "spoiler" and "hidden." The "spoiler" class will handle the visual styling (red background, border). The "hidden" class will handle the hiding behavior (display: none). Separating concerns like this is a CSS best practice — one class for looks, another for behavior.

• <p><strong>Spoiler:</strong> Neo is The One...</p> — The <p> holds the spoiler text. <strong> makes the "Spoiler:" label bold and semantically marks it as important content. We use <strong> instead of <b> because <strong> carries meaning — screen readers may emphasize it with a different tone of voice.

• <div class="spoiler ghost"> — The Inception spoiler uses the "ghost" class instead of "hidden." We'll define .ghost to use visibility: hidden — a completely different hiding approach. The class name "ghost" is just a descriptive name we chose because the element becomes ghost-like: invisible but still present, still taking up space.

• <div class="info-box"> and <div class="secret-message hidden"> — At the bottom, we have a visible info box followed by a hidden message. This third hidden element lets you see how display: none affects the flow of surrounding content — the paragraph after it ("This text comes right after...") will jump up as if the hidden message doesn't exist.

Why <div> for the containers and <p> for the text? A <div> is a block-level container that groups related content — it has no semantic meaning on its own. A <p> specifically represents a paragraph of text. Using the right element for the right job is good HTML practice, even if the browser would render them similarly.

Save with Ctrl + S, then open in your browser:

xdg-open index.html

Right now, you'll see all the content — spoilers, hidden messages, everything — because we haven't written any CSS yet. Everything is visible and stacked vertically. Don't worry, we're about to change that.`,
        docLinks: [
          {
            label: "<div> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div",
            type: "html-element",
          },
          {
            label: "<strong> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong",
            type: "html-element",
          },
          {
            label: "class attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class",
            type: "html-attribute",
          },
          {
            label: "display",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/display",
            type: "css-property",
          },
          {
            label: "visibility",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/visibility",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            body: "Every time you change your HTML or CSS, you need to: 1) Press Ctrl+S to save the file, then 2) Switch to the browser and press Ctrl+R (or F5) to refresh the page. The browser doesn't detect changes automatically — this save-then-refresh workflow is the core development cycle.",
          },
          {
            variant: "standard",
            body: "Using multiple classes on one element (like class=\"spoiler hidden\") is a common CSS pattern called 'utility classes' or 'modifier classes.' The first class handles appearance, the second handles behavior. This keeps your CSS modular — you can reuse .hidden on any element, not just spoilers.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Show/Hide Demo</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Movie Reviews</h1>

  <div class="review-card">
    <h2>The Matrix (1999)</h2>
    <p>A groundbreaking sci-fi film that changed cinema forever.</p>
    <div class="spoiler hidden">
      <p><strong>Spoiler:</strong> Neo is The One, and the "real world" is actually a computer simulation called the Matrix.</p>
    </div>
  </div>

  <div class="review-card">
    <h2>Inception (2010)</h2>
    <p>A mind-bending thriller about dreams within dreams.</p>
    <div class="spoiler ghost">
      <p><strong>Spoiler:</strong> The spinning top at the end wobbles — or does it? Nolan intentionally left it ambiguous.</p>
    </div>
  </div>

  <div class="info-box">
    <p>There's a hidden message below this box.</p>
  </div>
  <div class="secret-message hidden">
    <p>You found me! I was hidden with display: none.</p>
  </div>
  <p>This text comes right after the hidden message.</p>
</body>
</html>`,
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Make sure the Matrix spoiler has class=\"spoiler hidden\" and the Inception spoiler has class=\"spoiler ghost\".",
        "Save with Ctrl+S, then open with xdg-open index.html.",
        "All content will be visible until we add CSS in the next step.",
      ],
    },

    // ── Step 3: Apply display: none ──────────────────────────────────
    {
      id: "codelab-show-hide-display-none",
      type: "explanation",
      instruction: {
        heading: "Apply display: none",
        body: `Now click on style.css in the VS Code sidebar and add the following CSS:

Let's walk through what each part does:

Body styles set up a readable, centered layout with a maximum width of 600px and auto margins for centering. The font-family: system-ui uses whatever font the operating system prefers, so the page looks native on any platform.

The .review-card styles create a card-like container with a light background (#F8FAFC), padding for breathing room, rounded corners (border-radius: 8px), vertical spacing between cards (margin-bottom: 16px), and a blue left border — a common design pattern for content cards that you'll see on sites like Medium, DEV Community, and documentation pages.

The .spoiler class styles the spoiler area with a red-tinted background (#FEF2F2) and a soft red border (#FECACA), making it visually distinct as sensitive content. The margin-top: 8px adds a small gap between the review text and the spoiler box.

And here's the important part — the .hidden class:

• display: none; — This completely removes the element from the page layout. The browser acts as if the element doesn't exist. It takes up zero space. Content below it moves up to fill the gap. The element is still in the HTML source code, but the browser skips it entirely when calculating where things go on the page.

Save with Ctrl + S and refresh with Ctrl + R. Look at the page carefully:

• The Matrix review — the spoiler is completely gone. No gap, no empty space. The card ends right after the summary paragraph, as if the spoiler div was never written in the HTML at all.

• The secret message at the bottom — also gone. The text "This text comes right after the hidden message" sits immediately below the info box with no gap whatsoever.

This is display: none in action: elements are removed from the visual flow entirely. They still exist in the HTML (you can see them in the source code), but the browser skips them when calculating layout.

Now try an experiment to really feel the difference: temporarily remove display: none from the .hidden class. Just delete that line, save, and refresh. The spoiler text appears! The Matrix card gets taller, the secret message shows up, and the text below it gets pushed down. Now add display: none back. Save, refresh. Everything snaps back — the spoiler vanishes, and the elements around it collapse together as if it was never there.

This isn't just making something invisible. It's completely removing it from the page's geometry. The browser doesn't reserve any space for it — no width, no height, no padding, nothing.`,
        analogy: "Think of a bookshelf with books lined up side by side. display: none is like physically pulling a book off the shelf and putting it in a drawer. The other books slide together to fill the gap — there's no empty space where the book used to be. The book still exists (it's in the drawer), but the shelf doesn't know about it anymore.",
        docLinks: [
          {
            label: "display: none",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/display#none",
            type: "css-property",
          },
          {
            label: "border-left",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/border-left",
            type: "css-property",
          },
          {
            label: "max-width",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/max-width",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            body: "display: none removes an element from the layout completely — it takes up zero space, and surrounding elements reflow as if it were deleted from the HTML. The element is still in the DOM (Document Object Model), so JavaScript can still find and modify it. This is how most show/hide interactions work on the web — dropdown menus, modal dialogs, tab panels, and notification banners all use this technique.",
          },
          {
            variant: "tip",
            body: "A common mistake is thinking display: none deletes the element. It doesn't — the element is still in the HTML and can be found by JavaScript or seen in DevTools. It's just excluded from layout calculations. You can bring it back at any time by changing display to block, flex, or any other value.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `body {
  font-family: system-ui, sans-serif;
  max-width: 600px;
  margin: 20px auto;
  padding: 0 16px;
}

.review-card {
  background: #F8FAFC;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  border-left: 4px solid #3B82F6;
}

.spoiler {
  background: #FEF2F2;
  padding: 12px;
  border-radius: 6px;
  margin-top: 8px;
  border: 1px solid #FECACA;
}

.hidden {
  display: none;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Make sure you're editing style.css, not index.html.",
        "Save with Ctrl+S, then refresh the browser with Ctrl+R.",
        "Notice how the Matrix spoiler and the secret message leave no gap — display: none removes them completely.",
      ],
    },

    // ── Step 4: Apply visibility: hidden ─────────────────────────────
    {
      id: "codelab-show-hide-visibility",
      type: "explanation",
      instruction: {
        heading: "Apply visibility: hidden",
        body: `Now add one more rule to your style.css — the .ghost class:

Save with Ctrl + S and refresh with Ctrl + R. Now look carefully at the Inception review card:

The spoiler text is invisible — you can't see "The spinning top at the end wobbles..." anywhere. But look at the space the card takes up. There's a noticeable empty area inside the card where the spoiler would be. The red-tinted background and border from the .spoiler class? Gone — the whole element is invisible. But the space it would occupy is still reserved, creating a suspicious blank gap.

If you open DevTools (F12) and hover over that gap, you'll see the blue/green DevTools overlay highlighting the invisible element's full dimensions. It's still there — full width, full height, full padding. The browser rendered it completely, calculated its layout position, and then at the very last step simply painted it invisible. The geometry is all there; only the pixels are missing.

Now compare the two approaches side by side on your page:

• The Matrix (display: none) — No gap. The card is compact. It's as if the spoiler never existed. Content below it moves up to fill the space.

• Inception (visibility: hidden) — There's a visible gap. The card is taller than it needs to be because the invisible spoiler still reserves its space. Content below it stays exactly where it would be if the spoiler were visible.

This is the fundamental difference:
• display: none — Removes the element from the layout flow entirely. Zero space. Other elements reflow.
• visibility: hidden — Hides the element visually but it still occupies its full space in the layout. Other elements don't move.

Try this experiment: add a colored border to the .ghost class — something like border: 3px solid red !important; Save and refresh. You'll see the red border renders in the empty space even though the content inside is invisible! The border, padding, and dimensions are all still computed and painted — only the content and background become invisible. Remove the experimental border when you're done.

When should you use each?
• Use display: none when you want to completely remove something — dropdown menus, modal dialogs, tab content that isn't active, and elements that should be totally gone until needed.
• Use visibility: hidden when you want to hide something temporarily without other elements jumping around — loading states where you want to reserve space, animation preparation where the layout shouldn't shift, or placeholder content that maintains page structure.`,
        analogy: "Think of a bookshelf again. visibility: hidden is like putting an invisible book cover on a book — the book is still on the shelf, still taking up the same amount of space, and the other books don't move. You just can't see it. It's like a mime's invisible wall — you can't see it, but it's definitely there, affecting everything around it.",
        docLinks: [
          {
            label: "visibility",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/visibility",
            type: "css-property",
          },
          {
            label: "display",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/display",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            body: "visibility: hidden is useful when you want to hide something temporarily without causing layout shift. For example, if removing an element would make other elements jump around (like a loading spinner being replaced by content), visibility: hidden keeps everything stable while the element is out of sight. Layout shift is something Google actually measures as a performance metric (Cumulative Layout Shift) — so keeping layouts stable matters for real-world SEO.",
          },
          {
            variant: "standard",
            body: "There's a third option you might encounter: opacity: 0. This makes an element fully transparent — like visibility: hidden, it still takes up space. But unlike visibility: hidden, it can still receive clicks and hover events. Each hiding method has its own behavior: display: none (gone from layout, no interaction), visibility: hidden (in layout, no interaction), opacity: 0 (in layout, still interactive).",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `.ghost {
  visibility: hidden;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Add the .ghost rule below your existing CSS — don't replace anything.",
        "Look at the Inception card — the spoiler area is blank but still takes up space.",
        "Compare the Matrix card (display: none, no gap) to the Inception card (visibility: hidden, gap visible).",
      ],
    },

    // ── Step 5: Inspect with DevTools ────────────────────────────────
    {
      id: "codelab-show-hide-devtools",
      type: "explanation",
      instruction: {
        heading: "Inspect the difference with DevTools",
        body: `Let's use the browser's developer tools to see exactly what's happening under the hood. DevTools lets you peek behind the curtain and see how the browser truly handles these two hiding methods. This isn't just an academic exercise — professional developers use DevTools every day to debug why elements aren't appearing, why layouts look wrong, or why hidden content is still taking up space.

Open DevTools by pressing F12 or Ctrl + Shift + I. Follow these steps carefully:

1. Press F12 to open DevTools. You'll see a panel appear, usually at the bottom or right side of your browser window.

2. Click the element inspector icon (the arrow in the top-left corner of DevTools, or press Ctrl + Shift + C). This lets you hover over elements on the page and see their details.

3. Try to hover over The Matrix spoiler on the page — you can't! There's nothing to hover over. The browser didn't render it at all, so there's no visual target. The space where the spoiler would be is now occupied by the bottom of the card — there's no gap to click on. This is your first clue that display: none truly removes the element from the rendered page.

4. In the Elements panel (the HTML tree in DevTools), manually find the div with class="spoiler hidden". You'll find it nested inside the first review-card div. Click on it. Even though it's invisible on the page, it still exists in the HTML tree — the browser parsed it, stored it in memory, but chose not to render it. Look at the box model diagram at the bottom of the Styles/Computed panel — it shows 0 x 0. The element takes up zero space. No width, no height, no padding, no margin in the layout. The browser calculated... nothing.

5. Now find the Inception spoiler in the Elements panel — look for the div with class="spoiler ghost". Click on it. Hover over it on the page — even though the text is invisible, you'll see the blue/green DevTools overlay highlighting a rectangular area on the page. The element is there, rendered at its full size!

6. With the ghost element selected, look at the box model diagram. It shows the element's full dimensions — width, height, padding, margin, everything. The browser rendered this element completely, laid it out in the normal flow, and only at the final painting step made it invisible. Compare this to the hidden element's 0 x 0 — the difference is stark.

7. Try this experiment in DevTools: find the .hidden element in the Elements panel, and in the Styles panel on the right, uncheck the checkbox next to display: none. The Matrix spoiler instantly appears on the page! The card expands, the spoiler text shows up in its red box, and everything below shifts down. This is how DevTools lets you toggle CSS rules on and off without editing your files. Check the box again to re-hide it, or just refresh the page (Ctrl + R) to restore the original state.

8. Now try the reverse: find the .ghost element, and in the Styles panel, uncheck visibility: hidden. The Inception spoiler text appears — but notice that nothing else on the page moves! The card doesn't change height, the text below doesn't shift. The space was already reserved.

The key takeaway: display: none removes the element from layout entirely (0 x 0 dimensions, no space reserved). visibility: hidden keeps the element in layout (full dimensions, space reserved) but skips rendering the visible pixels. Both elements exist in the DOM — the difference is purely about layout and painting.`,
        docLinks: [
          {
            label: "Browser developer tools",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Tools_and_setup/What_are_browser_developer_tools",
            type: "html-concept",
          },
          {
            label: "CSS box model",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            body: "In DevTools, elements with display: none still appear in the DOM tree (Elements panel) — they're just not rendered. You can temporarily remove display: none in DevTools to peek at hidden content on any website. This is also how developers debug issues with elements that aren't appearing as expected. Pro tip: you can also right-click any element in the Elements panel and select 'Force state' to simulate hover, focus, and other interactive states.",
          },
          {
            variant: "tip",
            body: "DevTools changes are temporary — they only last until you refresh the page. This makes DevTools a safe playground for experimentation. You can toggle properties on and off, change colors, adjust spacing, and test ideas without ever touching your source files. If you mess something up, just refresh and start over.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `1. Press F12 to open DevTools
2. Click the element inspector (top-left arrow icon)
3. Try to hover over The Matrix spoiler — you can't! It's display:none
4. In the Elements panel, find the div with class="spoiler hidden"
5. Look at the box model diagram — it shows 0 × 0
6. Now find the Inception spoiler (class="spoiler ghost")
7. Click on it — the box model shows full dimensions
8. Hover over it — the blue overlay appears even though text is invisible
9. Uncheck display:none in Styles panel — the Matrix spoiler appears!
10. Uncheck visibility:hidden — the Inception text appears without layout shift!`,
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Press F12 or Ctrl+Shift+I to open DevTools.",
        "The Elements panel shows the HTML tree — you can find hidden elements there even if they're not visible on the page.",
        "Try unchecking CSS rules in the Styles panel to toggle them on and off.",
      ],
    },

    // ── Step 6: Checkpoint ───────────────────────────────────────────
    {
      id: "codelab-show-hide-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: notification banner",
        body: `Time to practice! Write CSS for a notification banner that is hidden by default and shown when a .visible class is added.

Notification banners are everywhere on the web: cookie consent popups at the bottom of the page, success messages after submitting a form ("Your order has been placed!"), error alerts when something goes wrong ("Invalid password"), and info banners announcing sales or maintenance windows. Sites like GitHub show green success banners when you merge a pull request. Amazon shows notification bars for deals. Google Docs shows "All changes saved" messages. They all work the same way.

The pattern is simple: the banner HTML is always in the page, sitting there waiting. It's hidden with display: none so the user never sees it. When something happens (a form submission, an error, a timer expiring), JavaScript adds a class — like .visible — that overrides display: none with display: block, and the banner appears. When it's time to dismiss it, JavaScript removes the class, and the banner disappears again.

This is a common real-world pattern, and you're about to write the CSS half of it.

Your task:
• Hide the .notification by default using display: none. This ensures the banner is invisible when the page first loads.
• Show it when the .visible class is added by setting display: block. The selector .notification.visible (no space between the two class names) targets an element that has BOTH classes simultaneously.

Why display: none instead of visibility: hidden? Because when a notification banner is hidden, you don't want it taking up space at the top of the page and pushing your content down. It should be completely gone from the layout until it's needed. When it appears, the content below should shift down to make room — that's the expected behavior for notifications.

After writing your CSS, test it in DevTools: find the notification element in the Elements panel, double-click the class attribute to edit it, and add "visible" to the class list (so it reads class="notification visible"). Watch the banner appear on the page! Remove "visible" from the class to hide it again. This is exactly what JavaScript does in a real application — it manipulates classes, and your CSS responds.`,
        docLinks: [
          {
            label: "display",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/display",
            type: "css-property",
          },
          {
            label: "visibility",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/visibility",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            body: "In real applications, JavaScript adds and removes classes like .visible to show and hide elements dynamically. The CSS you write here is exactly how production notification systems work — the styling is always ready, and JavaScript just flips the class on and off. You'll learn the JavaScript side later, but the CSS pattern you're writing right now is the foundation.",
          },
          {
            variant: "standard",
            body: "The selector .notification.visible (no space) means 'an element that has both the notification class AND the visible class.' This is different from .notification .visible (with a space), which would mean 'an element with class visible that is inside an element with class notification.' The space changes the meaning entirely — be careful with compound selectors!",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode: `.notification {
  background: #ECFDF5;
  border: 1px solid #6EE7B7;
  padding: 12px 16px;
  border-radius: 8px;
  color: #065F46;
  /* Hide this notification by default */

}

.notification.visible {
  /* Show the notification when this class is added */

}`,
        language: "css",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "display" },
      },
      hints: [
        "Use display: none; to hide the notification by default.",
        "Use display: block; in .notification.visible to show it.",
        "The .notification.visible selector (no space) targets an element that has BOTH classes.",
      ],
    },
  ],
};
