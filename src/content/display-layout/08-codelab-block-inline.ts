import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "display-layout-codelab-block-inline",
  slug: "codelab-block-inline",
  title: "Codelab: Block & Inline Experiment",
  description:
    "See block and inline elements in action — add backgrounds, toggle display values, and inspect with DevTools.",
  order: 8,
  steps: [
    // ── Step 1: Set up your project ──────────────────────────────────
    {
      id: "codelab-block-inline-setup",
      type: "explanation",
      instruction: {
        heading: "Set up your project",
        body: `In this codelab, you're going to run a hands-on experiment to answer one of the most important questions in CSS: what's the difference between block and inline elements? Instead of just reading about it, you'll build a page with both types, paint them with colors so you can *see* how they behave, and then flip their display values to watch them transform. By the end, you'll have a gut-level understanding of how block and inline work — the kind of intuition you can only build by experimenting.

Before we start experimenting, we need a project folder with two files. Open a terminal by pressing Ctrl + Alt + T on Linux, then type the following commands one at a time, pressing Enter after each:

• mkdir ~/display-lab — This creates a new folder called display-lab in your home directory. mkdir stands for "make directory" (a directory is just another word for folder). The ~ symbol is a shortcut that means "my home folder" — so the new folder lands right inside your personal files.

• cd ~/display-lab — This moves you into the folder you just created. cd stands for "change directory." From now on, any files you create will land inside display-lab.

• touch index.html style.css — This creates two empty files. touch creates a file if it doesn't already exist. We need index.html for our HTML structure and style.css for our visual styles.

• code . — This opens VS Code with the current folder loaded. The . (dot) means "the folder I'm currently in." VS Code will open and show your two new files in the sidebar.

Your project is ready — two empty files waiting for code.`,
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
            body: "If you don't have VS Code installed, use any plain-text editor — gedit, nano, Kate, or Mousepad all work fine. The key is to save files with the correct extensions (.html and .css). Don't use a word processor like LibreOffice Writer — it adds invisible formatting that browsers can't understand.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `mkdir ~/display-lab
cd ~/display-lab
touch index.html style.css
code .`,
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Open a terminal with Ctrl+Alt+T.",
        "Type each command and press Enter before typing the next one.",
        "If 'code .' doesn't work, open your text editor manually and use File → Open Folder to open ~/display-lab.",
      ],
    },

    // ── Step 2: Write the HTML boilerplate ───────────────────────────
    {
      id: "codelab-block-inline-boilerplate",
      type: "explanation",
      instruction: {
        heading: "Write the HTML boilerplate",
        body: `Click on index.html in the VS Code sidebar to open it. It's empty right now — every HTML page needs a standard starting structure called the boilerplate. Think of it like the foundation of a house: you can't put up walls and a roof without it. Type (or copy) the following code into the file:

Let's break down every line so nothing feels mysterious:

• <!DOCTYPE html> — This isn't actually an HTML tag. It's a declaration that tells the browser "this document is written in HTML5" (the current version of HTML). Without it, browsers fall back to "quirks mode" — an older, unpredictable rendering mode from the early 2000s where layout rules work differently. Always include this line first.

• <html lang="en"> — The root element that wraps absolutely everything on the page. Think of it as the outer walls of the house. The lang="en" attribute tells browsers and screen readers that the content is in English. This matters for accessibility — a screen reader will use English pronunciation rules, and auto-translate features know the source language.

• <head> — The invisible section of the page. Nothing inside <head> appears on screen. It holds metadata — information *about* the page, like its title, character set, and links to external files. Think of it as the blueprints and permits for the house — important but hidden from visitors.

• <meta charset="UTF-8"> — Sets the character encoding to UTF-8, which supports virtually every character from every language, plus emoji. Without this, special characters like é, ñ, ü, or — might display as garbled symbols (like Ã© instead of é). Always include this as the first tag inside <head>.

• <title>Display Experiment</title> — The text that appears on the browser tab. It doesn't show up on the page itself. Try changing it to something like "My First Experiment" and refreshing — you'll see the tab title update. This is also what search engines show as the clickable headline in search results.

• <link rel="stylesheet" href="style.css"> — This connects our CSS file to the HTML. When the browser loads the page, it reads this tag and fetches style.css to apply our styles. The rel="stylesheet" tells the browser what kind of file it's linking to. The href="style.css" is the path — since both files are in the same folder, just the filename works.

• <body> — Everything visible on the page goes inside <body>. This is the house itself — the rooms, furniture, and decorations that visitors actually see. Right now it's empty, so the page will be completely blank.

Press Ctrl + S to save the file.`,
        docLinks: [
          {
            label: "DOCTYPE",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Doctype",
            type: "html-concept",
          },
          {
            label: "<html> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html",
            type: "html-element",
          },
          {
            label: "<link> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link",
            type: "html-element",
          },
          {
            label: "<meta> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            body: 'The <link> tag connects your CSS file to your HTML. The href attribute is the path to the CSS file. Since both files are in the same folder, just the filename works. If your CSS were in a subfolder called css/, you\'d write href="css/style.css" instead.',
          },
          {
            variant: "standard",
            body: "The order of tags inside <head> matters slightly: <meta charset=\"UTF-8\"> should come first because the browser needs to know the character encoding before it reads the rest of the document. The <title> and <link> can come in any order after that.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Display Experiment</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

</body>
</html>`,
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Make sure you type the code exactly — HTML tags need angle brackets < and >.",
        "The <link> tag does not have a closing tag. It's a self-closing (void) element.",
        "Press Ctrl+S to save after typing.",
      ],
    },

    // ── Step 3: Add mixed elements ───────────────────────────────────
    {
      id: "codelab-block-inline-mixed",
      type: "explanation",
      instruction: {
        heading: "Add mixed elements",
        body: `Now let's add some content to the page. Place the following HTML between the opening <body> and closing </body> tags. Don't just copy-paste blindly — read the explanation for each element so you understand *why* it's here and what role it plays.

Let's walk through every element and explain why it behaves the way it does:

• <h1>Display Experiment</h1> — A level-1 heading. The <h1> element is a block-level element, which means it always starts on a new line and stretches to fill the full width of its container, even if the text inside is short. Headings exist to give structure to a document — they're like chapter titles in a book. Browsers render <h1> in large, bold text by default, but the important thing is that it's block: it claims an entire horizontal row for itself.

• <p>This paragraph is a <strong>block</strong> element.</p> — A paragraph element, another block-level element. Like <h1>, it starts on a new line and takes up the full width. But notice the <strong> tag inside it — <strong> is an inline element. It makes the word "block" bold without breaking the text onto a new line. Inline elements live *inside* the flow of text, like a highlighted word in a sentence. The paragraph is the block container; the <strong> is an inline decoration within it.

• <div class="box">I am a div (block)</div> — A <div> is a generic block container. It has no visual appearance or semantic meaning on its own — it's a blank box you can style with CSS. Because it's block-level, each <div> starts on a new line and stretches full-width. We're using two of them so you can see how block elements stack vertically, like boxes in a shipping container stacked from top to bottom.

• <span class="tag">HTML</span> — A <span> is the inline counterpart of <div>. It's a generic inline container with no visual appearance by default. Because it's inline, multiple spans sit side by side on the same line, flowing left to right like words in a sentence. We have three spans here: HTML, CSS, and JavaScript — they'll all appear on one line, touching each other.

• <a href="#">I'm a link (inline)</a> — An anchor element that creates a hyperlink. Links are inline elements — they flow within text without breaking the line. The href="#" is a placeholder URL (the # symbol means "link to the top of this page"). In a real site, you'd replace # with an actual URL like https://example.com. Notice that the link appears on the same line as the spans, because both are inline.

Save with Ctrl + S, then open the page in your browser. In the terminal, type:

xdg-open index.html

Look at the result: the <h1>, <p>, and two <div> elements each take up their own line, stacking vertically like shelves on a bookcase. But the three <span> elements and the <a> link all sit on the same line, flowing horizontally like words in a sentence. This is the fundamental difference between block and inline — and you can see it with zero CSS applied! The browser's default stylesheet is doing all the work here.`,
        analogy: "Block elements are like shelves in a bookcase — each one takes up the full width and stacks on top of the previous one. Inline elements are like books on a single shelf — they sit side by side, flowing left to right, and only take up as much space as they need.",
        docLinks: [
          {
            label: "<div> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div",
            type: "html-element",
          },
          {
            label: "<span> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span",
            type: "html-element",
          },
          {
            label: "<a> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a",
            type: "html-element",
          },
          {
            label: "<strong> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong",
            type: "html-element",
          },
          {
            label: "Block-level elements",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Block-level_content",
            type: "html-concept",
          },
          {
            label: "Inline elements",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Inline-level_content",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            body: "Every time you change your HTML or CSS, you need to: 1) Press Ctrl+S to save the file, then 2) Switch to the browser and press Ctrl+R (or F5) to refresh the page. The browser doesn't detect changes automatically — you have to tell it to reload. This save-then-refresh cycle is the core development workflow.",
          },
          {
            variant: "standard",
            body: "The distinction between block and inline is built into the HTML specification. Every HTML element has a default display value. Headings (<h1>-<h6>), paragraphs (<p>), divs (<div>), lists (<ul>, <ol>), and sections (<section>, <article>) are all block by default. Spans (<span>), links (<a>), bold (<strong>), italic (<em>), and images (<img>) are all inline by default. You can override these defaults with CSS, but it helps to know the starting point.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `<body>
  <h1>Display Experiment</h1>
  <p>This paragraph is a <strong>block</strong> element.</p>

  <div class="box">I am a div (block)</div>
  <div class="box">I am another div (block)</div>

  <span class="tag">HTML</span>
  <span class="tag">CSS</span>
  <span class="tag">JavaScript</span>
  <a href="#">I'm a link (inline)</a>
</body>`,
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Place the elements between <body> and </body>.",
        "Save with Ctrl+S, then open in browser with xdg-open index.html or Ctrl+O in the browser.",
        "Notice how divs stack and spans sit side by side — that's block vs. inline.",
      ],
    },

    // ── Step 4: Add background colors ────────────────────────────────
    {
      id: "codelab-block-inline-backgrounds",
      type: "explanation",
      instruction: {
        heading: "Add background colors to see the boxes",
        body: `Right now everything is black text on white — you can see the stacking behavior, but you can't see the actual *shape* of each element's box. Every element in CSS generates an invisible rectangular box, but you'd never know it just by looking at plain text. We need to make these invisible boxes visible.

Think of it like using a highlighter on printed text. The words are already there, but the highlighter reveals something you couldn't see before — the exact boundaries of what you selected. Adding background colors to elements works the same way: it paints the element's box, revealing its true size and shape.

Click on style.css in the VS Code sidebar and type the following:

Save with Ctrl + S, then switch to your browser and press Ctrl + R to refresh.

Now you can see something crucial:

• The .box divs (blue backgrounds) stretch all the way across the page, even though their text is short. The blue rectangle goes from the left edge of the page to the right edge. That's block behavior — block elements always expand to fill the full width of their container, like a shelf that runs wall to wall.

• The .tag spans (pink backgrounds) only wrap tightly around their text. "HTML", "CSS", and "JavaScript" each have a small pink rectangle that hugs the text. They take up exactly as much horizontal space as they need and no more. That's inline behavior — like highlighting individual words.

• The link (cyan background) also wraps tightly around its text — it's inline too.

Why this matters for debugging: When your layout isn't working and you can't figure out why, the first thing professional developers do is add temporary background colors to elements. This reveals whether an element is taking up more or less space than expected, whether it's stretching full-width when it shouldn't be, or whether two elements are overlapping. It's the CSS equivalent of turning on the lights in a dark room.

Try this experiment: Temporarily remove the background: #DBEAFE; line from the .box rule (put a /* before it and */ after it to comment it out). Save and refresh. Notice how you can no longer see where the block element ends? The text just sits there, looking the same as the inline text. Now uncomment it (remove the /* and */) — the blue background instantly reveals the element's true shape. This is why backgrounds are such a powerful debugging tool.

Notice something else about the padding on the inline .tag elements: the horizontal padding (left and right) works perfectly — there's a nice pink cushion on each side of the text. But look closely at the vertical padding. If the spans are near other content, the vertical padding visually appears, but it doesn't push other content away. It *overlaps* with the lines above and below. This is a key limitation of inline elements — they don't participate in vertical spacing the same way block elements do. We'll solve this problem later with display: inline-block.`,
        analogy: "Adding background colors to elements is like using a highlighter on text — the words were already there, but the color reveals their exact boundaries. Block elements highlight like full lines, stretching edge to edge. Inline elements highlight like individual words, wrapping tightly around the content.",
        docLinks: [
          {
            label: "background",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/background",
            type: "css-property",
          },
          {
            label: "padding",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/padding",
            type: "css-property",
          },
          {
            label: "CSS display property",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/display",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            body: "Block elements expand to fill the full width of their parent container. Inline elements only take up as much width as their content needs. This is one of the most fundamental rules of CSS layout — and adding background colors is the easiest way to see it in action.",
          },
          {
            variant: "tip",
            body: "Professional developers often add 'background: red;' or 'outline: 2px solid red;' to elements they're debugging. The outline property is especially useful because, unlike border, it doesn't affect the element's size or layout — it draws a line around the outside without changing anything. Keep this trick in your back pocket.",
          },
          {
            variant: "standard",
            body: "Inline elements have a quirky relationship with vertical padding and margin. The padding *appears* visually (you can see the background color extending), but it doesn't *push* other elements away vertically. This means inline padding can overlap with content on adjacent lines. This is not a bug — it's by design. Inline elements are meant to flow within text, and text lines have their own spacing rules (line-height). If inline elements pushed content away vertically, it would disrupt the natural flow of text.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `.box {
  background: #DBEAFE;
  padding: 12px;
  margin: 4px;
}

.tag {
  background: #FCE7F3;
  padding: 4px 8px;
}

a {
  background: #CFFAFE;
  padding: 4px 8px;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Make sure you're editing style.css, not index.html.",
        "Save with Ctrl+S, then refresh the browser with Ctrl+R.",
        "Look at how the blue boxes stretch full-width while the pink and cyan boxes wrap tightly.",
      ],
    },

    // ── Step 5: Change display values ────────────────────────────────
    {
      id: "codelab-block-inline-toggle",
      type: "explanation",
      instruction: {
        heading: "Change display values",
        body: `Here's where things get really interesting. The display property in CSS lets you override the *default* behavior of any element. You can make a block element behave like an inline element, or vice versa. It's like telling a shelf "stop stretching wall to wall — shrink down and sit next to the other shelves" or telling a word "stop flowing in the sentence — take up your own entire line."

This is one of the most powerful concepts in CSS: the HTML tag determines the *default* display, but CSS gives you the power to change it.

Experiment 1 — Make spans behave like blocks:
Add display: block; to the .tag rule in your CSS. Save with Ctrl + S and refresh with Ctrl + R. Watch what happens: the three tags that were sitting side by side ("HTML", "CSS", "JavaScript") now stack vertically, each one stretching the full width of the page — exactly like the divs! The pink background now extends edge to edge instead of wrapping tightly around the text. By adding display: block, you gave these spans the full block behavior package: they start on a new line, they expand to fill available width, and they can have meaningful width, height, and vertical margin/padding. You fundamentally changed how the browser treats them.

Experiment 2 — Make divs behave like inline:
Now add display: inline; to the .box rule. Save and refresh. The two divs that were stacking vertically now sit on the same line, one after the other! But look closely — something is wrong. The vertical padding and margin look broken. The blue backgrounds might overlap with surrounding content. The boxes look cramped even though you have padding: 12px set. That's because inline elements don't respect vertical padding and margin in the normal way. The padding *appears* visually, but it doesn't push other elements away. You also lose the ability to set a meaningful width or height — inline elements ignore those properties entirely. By setting display: inline, you gave the divs inline behavior, including all of its limitations.

Experiment 3 — The best of both worlds with inline-block:
Change the .tag rule to display: inline-block; instead of display: block;. Save and refresh. Now the tags sit side by side on the same line (like inline) but they fully respect padding, margin, width, and height (like block). This is the hybrid display value — inline-block gives you horizontal flow with full box model support.

Try setting both elements to inline-block:
Set .box to display: inline-block; and .tag to display: inline-block;. Save and refresh. Now *everything* sits side by side, but with proper spacing and sizing. Try adding width: 200px; to .box — it works! Inline-block elements respect width and height, unlike pure inline elements. Try adding width: 200px; to .tag with display: inline; — nothing happens, because inline elements ignore width.

Here's a summary of the three display values:
• block — Full width, new line, respects all box model properties (width, height, margin, padding).
• inline — Content width only, flows in-line, ignores width/height, vertical padding/margin doesn't push.
• inline-block — Content width (or set width), flows in-line, respects ALL box model properties. The best of both worlds.

Try each variation one at a time. Save, refresh, and observe after every single change. The goal is to build an intuition for how display values change element behavior — and the only way to build that intuition is through hands-on experimentation.`,
        analogy: "Think of display values like seating arrangements. Block is like a long banquet table — each one takes up the entire width of the room and the next table goes below it. Inline is like chairs at a counter — they sit side by side but you can't change their width or put space above and below them. Inline-block is like individual desks — they sit side by side, but each desk can have its own width, height, and personal space.",
        docLinks: [
          {
            label: "display",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/display",
            type: "css-property",
          },
          {
            label: "Inline-level content",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Inline-level_content",
            type: "html-concept",
          },
          {
            label: "Block-level content",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Block-level_content",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            body: "When you set display: inline; on an element, vertical padding and margin appear visually but don't actually push other elements away. This is one of the most common sources of confusion in CSS. If your spacing looks broken on an inline element, it's probably because you need display: inline-block; instead.",
          },
          {
            variant: "standard",
            body: "Here's a quick cheat sheet for what each display value respects:\n\n• block: width ✓, height ✓, margin (all sides) ✓, padding (all sides) ✓\n• inline: width ✗, height ✗, margin (horizontal only) ✓, padding (visual only, doesn't push vertically) ~\n• inline-block: width ✓, height ✓, margin (all sides) ✓, padding (all sides) ✓\n\nThe difference between block and inline-block is only about line behavior: block starts a new line and fills the width; inline-block stays on the current line.",
          },
          {
            variant: "tip",
            body: "Try display: inline-block; on the .box divs and then add width: 150px; — notice how both divs sit side by side at exactly 150px wide? Now try the same width with display: inline; — the width is completely ignored. This is the most practical difference between inline and inline-block.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `/* Make a span behave like a block */
.tag {
  background: #FCE7F3;
  padding: 4px 8px;
  display: block;
}

/* Make a div behave like inline */
.box {
  background: #DBEAFE;
  padding: 12px;
  margin: 4px;
  display: inline;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Try one experiment at a time — change the display value, save, refresh, observe.",
        "After trying display: block; on .tag, change it to display: inline-block; to see the hybrid.",
        "Notice how display: inline; on .box makes the padding overlap — that's expected for inline elements.",
      ],
    },

    // ── Step 6: Inspect with DevTools ────────────────────────────────
    {
      id: "codelab-block-inline-devtools",
      type: "explanation",
      instruction: {
        heading: "Inspect with DevTools",
        body: `Your browser's developer tools (DevTools) let you see exactly how the browser interprets your CSS — including computed display values, box dimensions, and more. If adding background colors is like turning on the lights, DevTools is like having X-ray vision. You can see every CSS property, every computed value, and the exact pixel dimensions of every element.

Open DevTools by pressing F12 or Ctrl + Shift + I. A panel will appear at the bottom or side of your browser. Follow these steps:

1. Activate the element inspector by clicking the arrow icon in the top-left corner of the DevTools panel (it looks like a cursor over a square), or press Ctrl + Shift + C. This lets you point at elements on the page to select them.

2. Hover over one of the .box divs on the page. You'll see a colored overlay appear: the blue area shows the content, the green area shows the padding, and the orange area shows the margin. This overlay visually maps the box model — content, padding, border, and margin — directly onto the page. Notice how the overlay stretches the full width of the page for block elements.

3. Click on one of the .box elements to select it. In the right-side panel, you'll see the "Styles" tab showing all CSS rules that apply to this element. Look for your .box rule — you'll see the background, padding, margin, and display properties you wrote.

4. Switch to the "Computed" tab (next to "Styles"). This tab shows the *final, resolved* value of every CSS property after all rules are applied. Scroll down or search for "display" — it will show the actual computed value: inline, block, or inline-block, depending on what you set. If you didn't set a display value, it shows the browser's default (block for divs, inline for spans). This is the ground truth of how the browser is rendering the element.

5. At the top of the Computed tab (in Chrome and Firefox), you'll see a colorful box model diagram. This diagram shows the exact pixel measurements for content, padding, border, and margin. For a block-level .box div, the content width will match the page width minus padding and margin. For an inline .tag span, the content width will match the text width. Click on any number in the diagram to see the exact value.

6. Now hover over one of the .tag spans. Compare its box model diagram to the .box div. If the span has display: inline, you'll notice the box model might show 0 for width — that's because inline elements don't have a computed width in the traditional sense. Change it to display: inline-block in your CSS, save, refresh, and inspect again — now you'll see a proper width value in the box model diagram.

7. Try live-editing CSS in DevTools! In the "Styles" panel, click on any property value and type a new one. The page updates instantly — no need to save or refresh. Try changing display: block to display: inline-block directly in DevTools. This is incredibly useful for rapid experimentation. Note: these changes are temporary — they vanish when you refresh the page. Your actual CSS file is unchanged.

8. Right-click on any element on the page (not in DevTools) and choose "Inspect" from the context menu. This jumps directly to that element in DevTools. This is faster than using the inspector tool when you already know which element you want to examine.

DevTools is one of the most powerful tools a web developer has. Get comfortable opening it on every page you visit — you can inspect how any website is built. Try it on Google, Wikipedia, YouTube, or your favorite site. The more you use it now, the faster you'll debug CSS layout issues later.`,
        docLinks: [
          {
            label: "Chrome DevTools overview",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Tools_and_setup/What_are_browser_developer_tools",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            body: "DevTools is your best friend as a developer. Get comfortable opening it on every page you visit — you can inspect how any website is built. Right-click any element and choose \"Inspect\" to jump straight to it in DevTools.",
          },
          {
            variant: "standard",
            body: "The box model diagram in the Computed tab uses color coding: blue/content in the center, green/padding around it, then border, then orange/margin on the outside. Each zone shows its pixel dimensions. This diagram is the definitive answer to \"how big is this element?\" — it accounts for display type, padding, border, and margin all at once.",
          },
          {
            variant: "tip",
            body: "When debugging layout, try this workflow: 1) Inspect the element, 2) Check the Computed tab for its display value, 3) Look at the box model diagram for unexpected dimensions, 4) Check the Styles tab for conflicting rules (crossed-out properties mean they're being overridden). This four-step process solves most CSS layout mysteries.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `1. Press F12 to open DevTools
2. Press Ctrl+Shift+C to activate the element inspector
3. Hover over a .box div — see the blue/green overlay
4. Click the element, then find the "Computed" tab
5. Look for "display" in the computed styles list
6. Hover over a .tag span — compare its box model
7. In the "Styles" panel, try editing display values live`,
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Press F12 or Ctrl+Shift+I to open DevTools.",
        "The Computed tab shows the final, resolved value of every CSS property.",
        "Try right-clicking any element and choosing 'Inspect' to jump to it in DevTools.",
      ],
    },

    // ── Step 7: Checkpoint ───────────────────────────────────────────
    {
      id: "codelab-block-inline-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: Tag cloud",
        body: `Time to apply what you've learned! Create a tag cloud — a collection of keyword pills that sit side by side and wrap naturally when they run out of horizontal space.

You've probably seen tag clouds all over the web without realizing they have a name. GitHub uses them for repository topics — those little rounded labels like "javascript", "react", "machine-learning" under a repo's description. Stack Overflow shows them as tags on every question — "html", "css", "display". WordPress and Medium show them as category labels on blog posts. Even the hashtags on Instagram and Twitter/X are a form of tag cloud. They all share the same pattern: small, pill-shaped labels that flow horizontally and wrap to the next line when they run out of space.

Your tags should:
• Sit side by side (not stack vertically) — so they can't be plain block elements, because block elements start a new line and fill the full width.
• Fully respect padding and margin — so they can't be plain inline elements, because inline elements don't push neighbors away vertically and ignore width/height.
• Have rounded corners, a background color, and enough padding to look like pills.
• Wrap to the next line naturally when the browser window is too narrow — just like words in a paragraph.

The answer is display: inline-block — it gives you horizontal flow (like inline) with full box model support (like block). This is the exact same technique GitHub, Stack Overflow, and every tag-based UI uses under the hood.

Style the .tag-cloud container however you like, and make each span inside it look like a pill-shaped tag. Experiment with different colors, padding amounts, border-radius values, and font sizes. Try border-radius: 9999px; for fully rounded pill shapes, or border-radius: 4px; for subtle rounding.`,
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
            body: "Inline-block elements are affected by whitespace in your HTML. If you have spaces or newlines between your <span> tags, you'll see small gaps between the pills. That's normal! For this exercise, the gaps actually look nice — they give each pill breathing room.",
          },
          {
            variant: "standard",
            body: "Tag clouds are one of the oldest and most enduring UI patterns on the web. The key insight is that they need inline-block (or modern flexbox/grid) because pure inline elements can't be styled as proper boxes, and pure block elements can't flow side by side. Whenever you need \"boxes that flow like text,\" inline-block is the classic solution.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode: `.tag-cloud {
  /* Style the container */
}

.tag-cloud span {
  /* Make each tag an inline-block pill */

}`,
        language: "css",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "inline-block" },
      },
      hints: [
        "Set display: inline-block; on .tag-cloud span.",
        "Add padding, background color, border-radius, and margin to make them look like pills.",
        "Try border-radius: 9999px; for fully rounded pill shapes.",
      ],
    },
  ],
};
