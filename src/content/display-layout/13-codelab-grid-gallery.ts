import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "display-layout-codelab-grid-gallery",
  slug: "codelab-grid-gallery",
  title: "Codelab: Grid Photo Gallery",
  description:
    "Create a responsive photo gallery with CSS Grid — columns, gaps, and auto-fit for any screen size.",
  order: 13,
  steps: [
    // ── Step 1: Set up your project ──────────────────────────────────
    {
      id: "grid-gallery-setup",
      type: "explanation",
      instruction: {
        heading: "Set up your project",
        body: `Photo galleries are everywhere on the web: Instagram's profile grid, Pinterest's pin layout, Google Images results, Unsplash's homepage. CSS Grid is the perfect tool for galleries because it creates a rigid column structure that photos snap into — no math, no JavaScript, just a few lines of CSS. In this codelab, you'll build a gallery that automatically adjusts its columns based on screen size, just like the sites you use every day.

Open a terminal by pressing Ctrl + Alt + T on Linux. Type the following commands one at a time, pressing Enter after each one:

• mkdir ~/grid-gallery-lab — Creates a new folder called grid-gallery-lab inside your home directory. mkdir stands for "make directory" (a directory is just another word for folder). The ~ symbol is a shortcut that means "my home folder."

• cd ~/grid-gallery-lab — Moves you into the new folder. cd stands for "change directory." From now on, any files you create will land inside grid-gallery-lab.

• touch index.html style.css — Creates two empty files: one for the HTML structure and one for CSS styles. touch creates a file if it doesn't already exist.

• code . — Opens VS Code with the current folder loaded. The dot means "the folder I'm currently in."

If you've done the previous codelabs, this workflow should feel familiar. Each codelab gets its own folder to keep projects separate — you can always go back to a previous lab by opening its folder.`,
        docLinks: [
          {
            label: "Getting started with CSS",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Getting_started",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            body: "If you don't have VS Code installed, any plain text editor works — gedit, nano, Kate, or Mousepad. The important thing is that you save plain text files with the correct extensions (.html and .css). Don't use a word processor like LibreOffice Writer — it adds invisible formatting that browsers can't read.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `mkdir ~/grid-gallery-lab
cd ~/grid-gallery-lab
touch index.html style.css
code .`,
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Open a terminal with Ctrl+Alt+T.",
        "Type each command and press Enter before typing the next one.",
        "If 'code .' doesn't work, open your text editor manually and use File → Open Folder to open ~/grid-gallery-lab.",
      ],
    },

    // ── Step 2: Write the gallery HTML ───────────────────────────────
    {
      id: "grid-gallery-html",
      type: "explanation",
      instruction: {
        heading: "Write the gallery HTML",
        body: `Click on index.html in the VS Code sidebar and type (or copy) the following code. Let's break down every element so you understand exactly what each piece does.

• <!DOCTYPE html> — Tells the browser this is an HTML5 document. Without it, the browser might render your page in an older, quirky mode.

• <html lang="en"> — The root element wrapping everything. The lang="en" attribute tells browsers and screen readers the content is in English.

• <head> — The invisible section holding metadata. The <meta charset="UTF-8"> ensures special characters display correctly. The <title> sets the browser tab text. The <link> tag connects our CSS file.

• <h1>Photo Gallery</h1> — The page heading. Every page should have exactly one <h1>.

• <div class="gallery"> — This is our grid container. Once we add display: grid in CSS, this element becomes the command center for the entire layout. Every direct child of this div will become a grid item that snaps into the column structure we define.

• Nine <div class="photo"> elements — Each one represents a photo placeholder. In a real project, you'd use <img> tags with actual photo files, but colored divs let us focus purely on the layout without downloading images or worrying about aspect ratios. The colored backgrounds simulate different photos so you can see where each item lands in the grid.

Why nine photos? Because 9 divides evenly into 3 columns (3 rows x 3 columns = 9 items), giving us a clean, complete grid. With a different number like 7 or 10, you'd see incomplete rows — and that's completely fine! CSS Grid handles this gracefully, leaving empty cells where photos would go. We're using 9 to start with a satisfying, full grid.

• The style="background: #3B82F6;" attribute on each photo sets a unique background color directly on the element. Inline styles override CSS file styles for that specific element. We're using them here as a quick way to give each "photo" a unique color — in production code, you'd rarely use inline styles, but for prototyping they're fast and effective.

• The text inside each div ("Sunset", "Mountains", etc.) serves as a label so you can track which photo is where as you rearrange the grid. In a real gallery, this would be a caption overlay or alt text.

Save with Ctrl + S and open in your browser (xdg-open index.html or press Ctrl + O in the browser and navigate to the file). Without CSS, you'll see nine colored blocks stacking vertically, each taking the full width of the page. That's the default block behavior of <div> elements — every block element starts on a new line and stretches to fill its container. We'll override this with CSS Grid to create columns.`,
        analogy: "Think of the gallery container as a photo album page with pre-cut slots. Each photo div is a picture you're placing into the album. Without CSS Grid, the photos just pile up in a stack. With Grid, the album page has neat rows and columns, and each photo slides into the next available slot.",
        docLinks: [
          {
            label: "<div> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div",
            type: "html-element",
          },
          {
            label: "style attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/style",
            type: "html-attribute",
          },
          {
            label: "<figure> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            body: "In a production gallery, you'd use semantic HTML: <figure> wrapping an <img> with a <figcaption> for each photo. This gives screen readers and search engines meaningful context about each image. We're using plain <div> elements here to keep the focus on learning CSS Grid layout. Once you're comfortable with Grid, you can swap in proper semantic markup.",
          },
          {
            variant: "tip",
            body: "Every time you change your HTML or CSS, you need to: 1) Press Ctrl+S to save the file, then 2) Switch to the browser and press Ctrl+R (or F5) to refresh the page. The browser doesn't detect changes automatically — you have to tell it to reload. This save-then-refresh cycle is the core development workflow you'll use thousands of times.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Grid Gallery</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Photo Gallery</h1>
  <div class="gallery">
    <div class="photo" style="background: #3B82F6;">Sunset</div>
    <div class="photo" style="background: #8B5CF6;">Mountains</div>
    <div class="photo" style="background: #EC4899;">Beach</div>
    <div class="photo" style="background: #10B981;">Forest</div>
    <div class="photo" style="background: #F59E0B;">City</div>
    <div class="photo" style="background: #EF4444;">Lake</div>
    <div class="photo" style="background: #06B6D4;">Desert</div>
    <div class="photo" style="background: #84CC16;">Waterfall</div>
    <div class="photo" style="background: #F97316;">Canyon</div>
  </div>
</body>
</html>`,
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Make sure the <link> tag points to style.css.",
        "All nine photo divs must be inside the gallery div.",
        "Save with Ctrl+S, then open in a browser to see the colored blocks stacking vertically.",
      ],
    },

    // ── Step 3: Create the grid ──────────────────────────────────────
    {
      id: "grid-gallery-create",
      type: "explanation",
      instruction: {
        heading: "Create the grid",
        body: `Now click on style.css in VS Code and type the following CSS. This is where we transform those nine stacked blocks into a proper photo grid.

Let's walk through the key parts in detail:

• body — We're using a dark background (#0F172A) because photo galleries look stunning on dark backgrounds — it makes the colors pop, just like paintings in a museum are displayed on dark walls. White text (color: white) provides high contrast against the dark background. We remove the default body margin and add 24px padding so the gallery has breathing room on all sides.

• .gallery { display: grid; grid-template-columns: 1fr 1fr 1fr; } — These two properties create the entire grid layout:

  - display: grid tells the browser "this container uses grid layout." It's the grid equivalent of display: flex. Every direct child of the gallery div becomes a grid item.

  - grid-template-columns: 1fr 1fr 1fr creates three columns, each taking an equal fraction (1fr) of the available width. The fr unit stands for "fraction" — it divides the available space proportionally. Three 1fr values means the container width is split into three equal parts.

Items automatically flow into cells left-to-right, top-to-bottom — like reading text on a page. The first item (Sunset) goes in row 1, column 1. The second (Mountains) goes in row 1, column 2. The third (Beach) goes in row 1, column 3. The fourth (Forest) starts a new row: row 2, column 1. And so on until all 9 items are placed in a clean 3x3 grid.

• .photo — Each photo is 200px tall (height: 200px). We use display: flex and align-items: flex-end on each photo to push the label text to the bottom of the colored rectangle. This is a classic photo caption overlay pattern — the photo fills the space and the caption sits at the bottom, just like you see on Unsplash, Pexels, and most gallery sites where the photographer's name appears at the bottom of each image. The padding: 12px gives the label text some breathing room from the edges.

Save with Ctrl + S, refresh the browser. You should see a clean 3x3 grid of colored rectangles with labels at the bottom of each one! But notice the photos are jammed together with no spacing — like tiles on a floor with no grout lines. We'll fix that next.

Experiment with the column definition to build your intuition:
• Try changing 1fr 1fr 1fr to just 1fr — you'll get one column with all 9 photos stacked vertically (but now they're grid items, not block elements).
• Try 1fr 1fr — two columns. The 9 photos fill 4 full rows plus one item on a 5th row.
• Try 1fr 1fr 1fr 1fr — four columns. Now you get 2 full rows of 4 and a partial third row.
• Set it back to 1fr 1fr 1fr before moving to the next step.

The fr unit divides the available space into the fractions you specify. The browser handles all the width calculations automatically.`,
        analogy: "CSS Grid is like a spreadsheet. When you set grid-template-columns: 1fr 1fr 1fr, you're creating a spreadsheet with 3 equal-width columns. Items fill cells from left to right, top to bottom — just like data fills cells in a spreadsheet. When a row is full, the next item starts on the next row.",
        docLinks: [
          {
            label: "display: grid",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/display",
            type: "css-property",
          },
          {
            label: "grid-template-columns",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns",
            type: "css-property",
          },
          {
            label: "fr unit",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout#the_fr_unit",
            type: "css-concept",
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
            body: "The fr unit is unique to CSS Grid. It divides available space proportionally. 1fr 1fr 1fr gives three equal columns. 2fr 1fr would make the first column twice as wide as the second. Think of fr as 'fraction of remaining space' — it automatically handles the math for you. Unlike percentages, fr accounts for gaps automatically, so you never have to subtract gap sizes from your column widths.",
          },
          {
            variant: "tip",
            body: "We use display: flex on each .photo element (which is itself a grid item) to position the label text at the bottom. This is perfectly valid — a grid item can also be a flex container for its own children. Nesting flex inside grid (or vice versa) is a common and powerful pattern in real-world CSS.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `body {
  font-family: system-ui, sans-serif;
  margin: 0;
  padding: 24px;
  background: #0F172A;
  color: white;
}

h1 {
  margin-bottom: 16px;
}

.gallery {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.photo {
  height: 200px;
  display: flex;
  align-items: flex-end;
  padding: 12px;
  color: white;
  font-weight: bold;
  font-size: 14px;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Make sure you're editing style.css, not index.html.",
        "You should see a 3x3 grid of colored rectangles with labels at the bottom.",
        "If photos are still stacking vertically, check that .gallery has display: grid;",
      ],
    },

    // ── Step 4: Add gap for spacing ──────────────────────────────────
    {
      id: "grid-gallery-gap",
      type: "explanation",
      instruction: {
        heading: "Add gap for spacing",
        body: `The photos are touching each other — all nine colored rectangles are jammed edge-to-edge like a tile floor with no grout lines. Let's add spacing and rounded corners to make it look like a proper gallery.

Update your .gallery rule to add gap, and update .photo to add border-radius:

• gap: 8px; — Adds 8 pixels of space between all grid items, both horizontally and vertically. Without gap, the photos create a solid wall of color where one photo ends and the next begins with no visual separation. The gap property adds breathing room between every row and every column simultaneously.

Compare this to using margin on each photo — with margin, you'd get doubled spacing where two margins meet (one photo's right margin + the next photo's left margin = double the intended gap). You'd also get unwanted spacing on the outer edges of the grid. gap is surgically precise: spacing between items only, never around the outside. This is one of the reasons CSS Grid is so much cleaner than older layout techniques.

You can also use two values to set different row and column gaps: gap: 8px 16px would give you 8px between rows and 16px between columns, creating a different visual rhythm. We'll stick with a single value (8px) for uniform spacing.

• border-radius: 8px; — Rounds the corners of each photo. This is a small detail that makes a big visual difference — sharp corners feel harsh and industrial, while rounded corners feel modern and approachable. This is why virtually every modern UI uses rounded corners: iOS, Material Design, every design system. Photo galleries especially benefit from rounded corners because they soften the rigid grid structure and make each photo feel like its own distinct card.

Save with Ctrl + S and refresh. Now it looks like a proper photo gallery — evenly spaced photos with rounded corners on a dark background. The dark background makes the colored photos pop, and the gap creates clear visual boundaries between each one.

Experiment with different gap values:
• Try gap: 0 — the photos touch edge-to-edge. It looks claustrophobic and it's hard to tell where one photo ends and the next begins.
• Try gap: 24px — lots of breathing room. The dark background shows through between photos, creating a more spacious, luxurious feel.
• Try gap: 4px 16px — that's 4px between rows, 16px between columns. This creates a horizontal emphasis, making rows feel like filmstrips.
• Try gap: 16px 4px — the opposite: tall vertical gaps with tight columns. Different visual rhythm entirely.
• Set it back to gap: 8px before moving on.`,
        analogy: "gap is like the grout between tiles in a bathroom. Without grout, tiles are pressed together and the edges blend. With grout, each tile is clearly defined as its own unit. The gap property is your grout — it creates visual separation between grid items without affecting the outer edges.",
        docLinks: [
          {
            label: "gap",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/gap",
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
            body: "The gap property replaced the older grid-gap property. Both work, but gap is the modern standard and also works in flexbox. If you see grid-gap in older tutorials or Stack Overflow answers, just use gap instead — it does the same thing with a shorter, more universal name.",
          },
          {
            variant: "standard",
            body: "One of the best things about gap is that it plays perfectly with the fr unit. When you write grid-template-columns: 1fr 1fr 1fr with gap: 8px, the browser subtracts the total gap space (2 gaps x 8px = 16px) from the container width BEFORE dividing the remaining space into three equal fractions. You never have to do this math yourself — fr handles it automatically.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `.gallery {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
}

.photo {
  height: 200px;
  display: flex;
  align-items: flex-end;
  padding: 12px;
  color: white;
  font-weight: bold;
  font-size: 14px;
  border-radius: 8px;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Add gap: 8px; inside the existing .gallery rule.",
        "Add border-radius: 8px; inside the existing .photo rule.",
        "Save and refresh to see the spacing and rounded corners.",
      ],
    },

    // ── Step 5: Try different column widths ──────────────────────────
    {
      id: "grid-gallery-columns",
      type: "explanation",
      instruction: {
        heading: "Try different column widths",
        body: `One of the best ways to understand grid-template-columns is to experiment with different values. The column definition is the most powerful part of CSS Grid — it controls the entire structure of your layout. Try each of the following, one at a time — change the value in your .gallery rule, save with Ctrl + S, and refresh with Ctrl + R:

• grid-template-columns: 2fr 1fr; — Two columns where the first is twice as wide as the second. The total fractions are 2 + 1 = 3, so the first column gets 2/3 of the space and the second gets 1/3. With 9 photos, you'll get rows of 2 items each (4 full rows plus a single item on the 5th row), with the left photo being noticeably wider than the right. Imagine a page layout with a large featured photo on the left and a sidebar of thumbnails on the right — that's exactly when you'd use this pattern.

• grid-template-columns: repeat(4, 1fr); — Four equal columns. The repeat() function is shorthand — repeat(4, 1fr) is identical to writing 1fr 1fr 1fr 1fr, but much cleaner, especially when you need many columns. With 9 photos, you'll have 2 full rows of 4 and 1 photo on the third row. This is better for smaller photos or thumbnails where you want to show more items at once.

• grid-template-columns: 200px 1fr 1fr; — Three columns where the first has a fixed 200px width and the other two split the remaining space equally. The fixed column always stays 200px regardless of the browser width; the flexible columns grow and shrink as the browser resizes. This pattern is extremely common for sidebars (fixed width) with content areas (flexible). Think of a dashboard with a fixed navigation sidebar on the left and two content panels that share the remaining space.

Try each one, observe the result, and think about when you'd use each pattern. Notice how the fr unit always distributes the remaining space — it automatically handles the math for you. Then set it back to repeat(3, 1fr) before moving to the next step.

The key insight: CSS Grid gives you precise control over column sizes. You can mix fixed sizes (px), flexible sizes (fr), percentages (%), and even min/max ranges. This is much more powerful than flexbox for two-dimensional layouts where you need both row and column control. Flexbox controls one axis at a time; Grid controls both simultaneously.`,
        analogy: "Think of grid-template-columns as choosing table column widths in a word processor. You can make columns equal, or make one wide for the main content and another narrow for notes. The fr unit is like saying 'fill the remaining space proportionally' — you don't need to know the exact page width.",
        docLinks: [
          {
            label: "grid-template-columns",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns",
            type: "css-property",
          },
          {
            label: "repeat()",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/repeat",
            type: "css-concept",
          },
          {
            label: "fr unit",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout#the_fr_unit",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            body: "The fr unit distributes remaining space after fixed-width columns are placed. In grid-template-columns: 200px 1fr 1fr, the browser first reserves 200px for the first column, then splits whatever space is left between the two 1fr columns equally. This is why fr is so powerful — it handles the math automatically, and the flexible columns respond to browser resizing while the fixed column stays put.",
          },
          {
            variant: "tip",
            body: "You can mix units freely: grid-template-columns: 100px 2fr 1fr 150px creates four columns where the first and last are fixed-width (100px and 150px), and the middle two share the remaining space with a 2:1 ratio. This kind of precise control is what makes CSS Grid indispensable for complex layouts.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `/* Try each of these one at a time: */

/* Two columns: wide + narrow */
grid-template-columns: 2fr 1fr;

/* Four equal columns */
grid-template-columns: repeat(4, 1fr);

/* Fixed sidebar + flexible content */
grid-template-columns: 200px 1fr 1fr;`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Only use one grid-template-columns value at a time — replace the previous one.",
        "Save and refresh after each change to see the new layout.",
        "Set it back to repeat(3, 1fr) when you're done experimenting.",
      ],
    },

    // ── Step 6: Make it responsive with auto-fit ─────────────────────
    {
      id: "grid-gallery-autofit",
      type: "explanation",
      instruction: {
        heading: "Make it responsive with auto-fit",
        body: `Now for the most powerful feature of CSS Grid — automatic responsive columns with zero media queries. This single line of CSS is arguably the most powerful layout declaration you'll learn in this entire course.

Update your .gallery rule to use this grid-template-columns value:

repeat(auto-fit, minmax(200px, 1fr))

Let's break it down piece by piece, from the inside out:

• minmax(200px, 1fr) — This defines the size range for each column. Each column has a minimum width of 200px and a maximum width of 1fr (an equal share of remaining space). A column will never be narrower than 200px, but it can grow wider if there's extra space. Think of it as saying: "Each column should be at least 200px wide, but stretch wider if there's room."

• repeat() — This function means "repeat this column definition multiple times." In previous steps, we used repeat(3, 1fr) to create exactly 3 columns. But how many columns should a responsive gallery have? On a wide monitor, maybe 5. On a tablet, 3. On a phone, 1. We don't want to hardcode a number.

• auto-fit — This is the magic keyword. Instead of specifying a fixed number of columns, auto-fit means "figure out how many columns fit based on the container width." The browser does the math for you! It calculates: "How many 200px-minimum columns can I fit in this container?" If the container is 900px wide, that's 4 columns (4 x 200px = 800px, with room left over that gets distributed as the 1fr maximum). If the container is 500px wide, that's 2 columns. If it's 250px wide, just 1 column.

Put it all together: the browser says "how many 200px columns can I fit? If the container is 800px wide, that's 4 columns. If it's 500px, that's 2 columns. If it's 300px, that's 1 column." AND each column grows beyond 200px to fill any leftover space, thanks to the 1fr maximum. There's never wasted space on the right side.

This is responsive design without a single media query! No @media rules, no breakpoints, no JavaScript. The CSS itself adapts to any screen size. This is how Pinterest, Unsplash, and many photo gallery sites create layouts that work on everything from a 4K monitor to a phone screen.

Save with Ctrl + S and refresh. Then spend a minute resizing your browser window slowly to see the magic in action.

Experiment to deepen your understanding:
• Resize your browser window slowly from wide to narrow. Watch the columns reflow: 4 columns, then 3, then 2, then 1. Each transition is smooth and automatic.
• Change 200px to 300px — columns collapse to fewer columns sooner because each column needs more minimum space. On a medium-width screen, you might see 2 columns instead of 3.
• Change 200px to 100px — you get more columns on the same screen because each column needs less minimum space. On a medium screen, you might see 5 or 6 columns.
• The minimum value (200px) is effectively your breakpoint control. A larger minimum means fewer, wider columns. A smaller minimum means more, narrower columns. Choose based on the content — photos look best at 200-300px minimum; text cards might need 250-400px.
• Set it back to minmax(200px, 1fr) before moving on.`,
        analogy: "auto-fit with minmax is like a smart bookshelf that adjusts its dividers automatically. You tell it 'each section should be at least 200px wide' and it figures out how many sections fit. If you bring a wider shelf, it creates more sections. If the shelf is narrow, fewer sections — but each one is always at least 200px. No manual measuring needed.",
        docLinks: [
          {
            label: "repeat()",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/repeat",
            type: "css-concept",
          },
          {
            label: "minmax()",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/minmax",
            type: "css-concept",
          },
          {
            label: "auto-fit keyword",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/repeat#auto-fit",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            body: "repeat(auto-fit, minmax(min, max)) is the gold standard for responsive grids without media queries. Change the minimum value (200px) to control when columns collapse. A larger minimum means fewer columns at each breakpoint. For example, minmax(300px, 1fr) will show fewer but wider columns, while minmax(150px, 1fr) will pack more narrower columns per row.",
          },
          {
            variant: "tip",
            body: "You might also see auto-fill instead of auto-fit. The difference: auto-fit collapses empty tracks (columns with no content) so the remaining items stretch to fill the space. auto-fill keeps empty tracks, which can leave blank space on the right. For galleries, auto-fit is almost always what you want because it ensures items stretch to fill the full width.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Replace your existing grid-template-columns value with: repeat(auto-fit, minmax(200px, 1fr))",
        "Save and refresh, then resize your browser to see the automatic column adjustment.",
        "Try changing 200px to 300px or 150px to see how the minimum affects the layout.",
      ],
    },

    // ── Step 7: Checkpoint ───────────────────────────────────────────
    {
      id: "grid-gallery-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: Styled gallery with hover",
        body: `Time to practice on your own! Add a hover effect to the gallery photos. When the user hovers over a photo, it should scale up slightly, gain a glowing shadow, and transition smoothly.

Subtle hover effects tell users "this is interactive — click me to see the full photo." Almost every gallery site on the web uses some form of scale + shadow on hover. It's a universal visual language that communicates interactivity without any text or icons. Instagram uses it on profile grid photos. Unsplash uses it on every image in search results. Even Google Images adds a subtle border highlight on hover.

Think about which CSS properties you need:

• transition on .photo — This enables smooth animation. Without it, the hover effect would snap instantly from the normal state to the hovered state, which looks cheap and jarring. You want to animate both transform and box-shadow, each over about 200 milliseconds (0.2s). The transition property goes on the base .photo rule (not the :hover rule) because it needs to animate both INTO and OUT OF the hover state.

• transform: scale() on .photo:hover — This zooms the photo slightly. scale(1.03) means "103% of normal size" — just 3% bigger. That's enough to notice without being jarring. The photo grows from its center, overlapping its neighbors slightly, which creates a sense of depth and focus. Keep the value subtle: scale(1.03) to scale(1.05) looks professional. scale(1.5) would make the photo grow 50%, which looks amateurish and covers other photos.

• box-shadow on .photo:hover — This adds a glow around the photo on hover. A shadow like 0 8px 24px rgba(0,0,0,0.3) creates a soft, diffused glow beneath and around the photo. Combined with the scale, it creates the illusion of the photo lifting off the page toward you. The glow also serves as a visual highlight, drawing the eye to the hovered photo among the grid of many photos.

Why this combination works: Scale makes the photo grow slightly. Shadow makes it appear to lift. Together, they create a 3D "pop" effect — the photo feels like it's coming toward you. This is a fundamental interaction pattern in UI design, used not just in galleries but in product cards, dashboard tiles, and any clickable grid item.`,
        docLinks: [
          {
            label: "transform: scale()",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale",
            type: "css-property",
          },
          {
            label: "box-shadow",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow",
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
            body: "Keep the scale value subtle — something like 1.03 to 1.05. A value of 1.5 would make the photo grow 50%, which looks jarring and covers neighboring photos. Subtle animations feel professional; exaggerated ones feel amateurish. The best hover effects are ones users feel but don't consciously notice.",
          },
          {
            variant: "standard",
            body: "Put the transition property on the base .photo rule, not on .photo:hover. If you put it only on :hover, the animation plays when hovering IN but snaps back instantly when hovering OUT. Placing transition on the base rule ensures smooth animation in both directions — a detail that separates polished UIs from rough ones.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode: `.photo {
  height: 200px;
  display: flex;
  align-items: flex-end;
  padding: 12px;
  color: white;
  font-weight: bold;
  font-size: 14px;
  border-radius: 8px;
  /* Add a smooth transition and hover effect */

}

.photo:hover {
  /* Scale up slightly and add a glow */

}`,
        language: "css",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "transform" },
      },
      hints: [
        "Add transition: transform 0.2s, box-shadow 0.2s; to .photo",
        "Add transform: scale(1.03); to .photo:hover for a subtle zoom.",
        "Add box-shadow: 0 8px 24px rgba(0,0,0,0.3); to .photo:hover for a glow.",
      ],
    },
  ],
};
