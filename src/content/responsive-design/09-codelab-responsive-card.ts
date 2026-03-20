import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "responsive-design-codelab-responsive-card",
  slug: "codelab-responsive-card",
  title: "Codelab: A Card That Adapts",
  description:
    "Build a product card component that adapts its layout from vertical on mobile to horizontal on desktop using media queries.",
  order: 9,
  steps: [
    {
      id: "codelab-card-setup",
      type: "explanation",
      instruction: {
        heading: "Set up your project",
        body: `In this codelab, you'll build a product card component — the kind you see on Amazon product listings, Airbnb property cards, or app store listings. On mobile, the card shows the image on top and details below (vertical layout). On tablet and up, the image moves to the left side with details on the right (horizontal layout). This is one of the most common responsive patterns on the web.

Open a terminal by pressing Ctrl + Alt + T on Linux, then type the following commands one at a time, pressing Enter after each:

<ul><li>mkdir ~/responsive-card — This creates a new folder called responsive-card in your home directory. mkdir stands for "make directory."</li><li>cd ~/responsive-card — This moves you into the folder you just created. cd stands for "change directory."</li><li>touch index.html style.css — This creates two empty files: index.html for the HTML structure and style.css for the CSS styles.</li><li>code . — This opens VS Code with the current folder loaded. The dot (.) means "the folder I'm currently in."</li></ul>

If you don't have VS Code installed, use any plain-text editor — gedit, nano, Kate, or Mousepad all work fine.`,
        infoBoxes: [
          {
            variant: "tip",
            body: "If 'code .' doesn't open VS Code, try 'codium .' (for VS Codium) or open your editor manually and use File > Open Folder to navigate to ~/responsive-card.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `mkdir ~/responsive-card
cd ~/responsive-card
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
      id: "codelab-card-html",
      type: "explanation",
      instruction: {
        heading: "Write the HTML structure",
        body: `Click on index.html in the VS Code sidebar and type the following code. Let's break down every part:

<ul><li><!DOCTYPE html> declares this as an HTML5 document.</li><li><meta name="viewport" content="width=device-width, initial-scale=1"> is critical — without it, mobile browsers will shrink the entire page to fit a virtual 980px viewport. This tag tells the browser to use the real screen width.</li><li>The <link> tag connects our CSS file.</li></ul>

The card structure uses semantic HTML: a <div> wrapper with class "card", an <img> for the product image (we use a placeholder URL from picsum.photos — a free image placeholder service), and a div with class "card-body" containing the title, description, price, and a button.

Save with Ctrl + S. Then open the file in your browser:

xdg-open index.html

You should see a raw, unstyled page with an image, some text, and a button. It looks plain because we haven't added any CSS yet — that's next.`,
        docLinks: [
          {
            label: "MDN: Viewport meta tag",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            body: "Always include the viewport meta tag in every HTML page you create. Without it, none of your responsive CSS will work correctly on mobile devices. This is the single most important line for mobile responsiveness.",
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
  <title>Responsive Card</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="card">
    <img
      src="https://picsum.photos/600/400"
      alt="Product image"
      class="card-img"
    >
    <div class="card-body">
      <h2 class="card-title">Wireless Headphones</h2>
      <p class="card-desc">
        Premium noise-cancelling headphones with 30-hour
        battery life. Perfect for music, calls, and focus.
      </p>
      <span class="card-price">$79.99</span>
      <button class="card-btn">Add to Cart</button>
    </div>
  </div>
</body>
</html>`,
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Make sure you include the viewport meta tag — it's essential for responsive design.",
        "Save with Ctrl+S, then open in browser with xdg-open index.html.",
      ],
    },
    {
      id: "codelab-card-base-css",
      type: "explanation",
      instruction: {
        heading: "Add mobile-first base styles",
        body: `Click on style.css and add the following CSS. These are the mobile-first base styles — they define how the card looks on the smallest screens first.

Let's walk through each rule:

<ul><li>The global reset (* { box-sizing: border-box; margin: 0; padding: 0; }) ensures consistent sizing across browsers. box-sizing: border-box makes padding and border included in the element's total width, which makes responsive math much simpler.</li><li>img { max-width: 100%; height: auto; } is the universal responsive image rule. It prevents images from overflowing their containers and maintains their aspect ratio.</li><li>body { font-family: system-ui, sans-serif; } uses the operating system's built-in font for fast loading and a native feel.</li><li>.card uses max-width: 500px so it doesn't stretch too wide on large screens, and margin: 2rem auto centers it horizontally. The overflow: hidden ensures the image corners are clipped by the card's border-radius.</li><li>.card-img { width: 100%; } makes the image fill the full width of the card. On mobile, this creates a nice full-width image at the top of the card.</li><li>The card body has padding for breathing room, and we use rem units for font sizes so they respect the user's browser settings.</li></ul>

Save with Ctrl + S and refresh your browser (Ctrl + R). You should see a nicely styled card with the image on top and details below — a clean mobile layout.`,
        infoBoxes: [
          {
            variant: "tip",
            body: "The combination of max-width on the card and margin: auto centers the card horizontally. This is one of the most common centering patterns in CSS — it works because auto margins distribute equal space on both sides.",
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

img {
  max-width: 100%;
  height: auto;
}

body {
  font-family: system-ui, sans-serif;
  background: #F1F5F9;
  padding: 1rem;
  color: #1E293B;
}

/* Card — mobile layout (vertical) */
.card {
  max-width: 500px;
  margin: 2rem auto;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-body {
  padding: 1.5rem;
}

.card-title {
  font-size: clamp(1.25rem, 2vw + 0.5rem, 1.75rem);
  margin-bottom: 0.5rem;
}

.card-desc {
  font-size: 1rem;
  color: #64748B;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.card-price {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #059669;
  margin-bottom: 1rem;
}

.card-btn {
  width: 100%;
  padding: 0.75rem;
  background: #3B82F6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Make sure you're editing style.css, not index.html.",
        "Save with Ctrl+S, then refresh the browser with Ctrl+R.",
      ],
    },
    {
      id: "codelab-card-media-query",
      type: "explanation",
      instruction: {
        heading: "Add the tablet media query",
        body: `Now comes the responsive magic. Add the following media query to the bottom of your style.css file. This transforms the card from a vertical layout to a horizontal one when the screen is at least 600px wide.

Here's what happens inside the media query:

<ul><li>.card gets display: flex, which places the image and card-body side by side instead of stacked. We also increase max-width to 700px because the horizontal layout needs more room.</li><li>.card-img gets a fixed width of 250px so it doesn't dominate the card. height: auto replaces the fixed 200px so it stretches to match the card-body height naturally.</li><li>.card-body gets flex: 1 which tells it to take up all remaining space after the image. It also gets display: flex and flex-direction: column so we can push the button to the bottom using margin-top: auto on the button.</li><li>.card-btn changes from width: 100% to width: auto so it only takes up as much space as its text needs, rather than stretching full width.</li></ul>

Save and refresh. Now resize your browser window: narrow it below 600px and watch the card snap to the vertical mobile layout. Widen it past 600px and it switches to the horizontal desktop layout. This is responsive design in action — one component, two layouts, zero JavaScript.

Try it on your phone too: open the file on your phone (or use DevTools device mode with F12) and you'll see the mobile-optimized vertical layout.`,
        docLinks: [
          {
            label: "MDN: @media",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media",
            type: "css-concept",
          },
          {
            label: "MDN: flex",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/flex",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            body: "We chose 600px as the breakpoint because that's roughly where the horizontal layout starts to look good — the image and text both have enough room to breathe. This isn't a magic number based on a specific device; it's based on where the design starts to break. Always let your content dictate breakpoints.",
          },
          {
            variant: "tip",
            body: "The flex: 1 shorthand is equivalent to flex-grow: 1; flex-shrink: 1; flex-basis: 0%. It tells the element to grow and fill all available space. This is the most common way to make a flex item fill remaining width.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `/* Tablet and up — horizontal card layout */
@media (min-width: 600px) {
  .card {
    display: flex;
    max-width: 700px;
  }

  .card-img {
    width: 250px;
    height: auto;
    object-fit: cover;
  }

  .card-body {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .card-btn {
    width: auto;
    margin-top: auto;
  }
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Add this code at the very bottom of your style.css file.",
        "Save and refresh, then resize the browser window to see the layout change.",
      ],
    },
    {
      id: "codelab-card-polish",
      type: "explanation",
      instruction: {
        heading: "Polish with hover effects and transitions",
        body: `Let's add some final polish. Add these rules to your CSS (anywhere before the media query is fine, or at the very end — order doesn't matter for these since they don't conflict with the media query rules):

<ul><li>The .card transition adds a smooth animation when the shadow changes. transform: translateY(-4px) on hover lifts the card slightly, creating a subtle 3D effect.</li><li>The .card-btn:hover rule darkens the button on hover, giving users visual feedback that it's clickable.</li><li>transition: all 0.2s ease makes the hover effects animate smoothly instead of snapping instantly.</li></ul>

These are small details, but they make the difference between a student project and a professional-feeling component. Every e-commerce site — Amazon, Shopify stores, Etsy — uses hover effects on their product cards.

Save and refresh. Hover over the card — it lifts slightly. Hover over the button — it darkens. These transitions work on desktop; on mobile (where there's no hover), the card just looks clean and static.

Congratulations! You've built a responsive product card component from scratch. It adapts its layout based on screen size, uses fluid typography, has responsive images, and includes polished interactions.`,
        infoBoxes: [
          {
            variant: "tip",
            body: "Hover effects don't work on touchscreens (phones and tablets). That's okay — they're an enhancement for mouse users, not a requirement. Never put essential functionality behind a hover state. Buttons should work on tap without needing hover.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `/* Hover effects */
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-btn {
  transition: background 0.2s ease;
}

.card-btn:hover {
  background: #2563EB;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-card-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: Customize your card",
        body: `Time to experiment! Modify the card to make it your own. Here are some ideas:

<ul><li>Change the breakpoint from 600px to something else — try 480px or 768px and see how it feels.</li><li>Add a second card below the first and see how they stack.</li><li>Change the color scheme — try a dark card (dark background, light text).</li><li>Add a "Sale" badge using a positioned element (position: absolute on the badge, position: relative on the card).</li><li>Try changing the image height on mobile or the image width in the horizontal layout.</li><li>Add a rating display with star characters (★★★★☆).</li><li>Make the button full-width on mobile but compact on desktop (you already have this — try reversing it).</li></ul>

The goal is to get comfortable modifying responsive CSS. Change values, save, refresh, resize — this is the daily workflow of a front-end developer.`,
        docLinks: [
          {
            label: "MDN: position",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/position",
            type: "css-property",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          "/* Customize your responsive card!\n * Try:\n * - A different breakpoint\n * - Dark mode colors\n * - A sale badge\n * - Star ratings\n * - Multiple cards\n */\n\n.card {\n  /* Your customizations here */\n}\n",
        language: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Try adding background: #1E293B and color: white to .card for a dark theme.",
        "For a sale badge, add a <span class='badge'>SALE</span> in the HTML and style it with position: absolute.",
      ],
    },
  ],
};
