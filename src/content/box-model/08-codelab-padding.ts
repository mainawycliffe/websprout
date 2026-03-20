import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "box-model-codelab-padding",
  slug: "codelab-padding",
  title: "Codelab 1: Padding a Quote Box",
  description: "Build a styled quote box in VS Code — learn padding hands-on.",
  order: 8,
  steps: [
    // ── Step 1: Set up your project ──────────────────────────────────
    {
      id: "codelab-padding-setup",
      type: "explanation",
      instruction: {
        heading: "Set up your project",
        body: `Before we write any code, we need a place to put our files. We'll use the terminal — a text-based way to give commands to your computer. Think of it like texting instructions to your computer instead of clicking around with a mouse.

Open a terminal by pressing Ctrl + Alt + T on Linux. You'll see a blinking cursor waiting for your commands. Now type the following commands one at a time, pressing Enter after each one:

• mkdir ~/box-model-lab — This creates a new folder called box-model-lab. mkdir stands for "make directory" (a directory is just another word for folder). The ~ symbol is a shortcut that means "my home folder" — so the new folder lands right inside your personal files.

• cd ~/box-model-lab — This moves you into the folder you just created. cd stands for "change directory". From now on, any files you create will land inside box-model-lab.

• touch index.html style.css — This creates two empty files. touch creates a file if it doesn't already exist. We need index.html for our web page structure and style.css for our visual styles.

• code . — This opens VS Code with the current folder loaded. The . (dot) means "the folder I'm currently in". VS Code will open and show your two new files in the sidebar.

That's it — your project is ready! You now have a folder with two empty files, and VS Code is open and waiting for you to start coding.`,
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
        demoCode: `mkdir ~/box-model-lab
cd ~/box-model-lab
touch index.html style.css
code .`,
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Open a terminal with Ctrl+Alt+T.",
        "Type each command and press Enter before typing the next one.",
        "If 'code .' doesn't work, open your text editor manually and use File → Open Folder to open ~/box-model-lab.",
      ],
    },

    // ── Step 2: Write the HTML boilerplate ───────────────────────────
    {
      id: "codelab-padding-boilerplate",
      type: "explanation",
      instruction: {
        heading: "Write the HTML boilerplate",
        body: `Click on index.html in the VS Code sidebar to open it. It's empty right now — every HTML page needs a standard starting structure called the boilerplate. Type (or copy) the following code into the file:

Let's break down every line so nothing feels mysterious:

• <!DOCTYPE html> — This isn't actually an HTML tag. It's a declaration that tells the browser "this document is written in HTML5" (the current version of HTML). Without it, browsers might render your page in an older, quirky mode.

• <html lang="en"> — The root element that wraps everything on the page. The lang="en" attribute tells browsers and screen readers that the content is in English. This matters for accessibility — a screen reader will use the correct pronunciation rules.

• <head> — The invisible section. Nothing inside <head> appears on the page. It holds metadata — information about the page (its title, character set, linked files, etc.).

• <meta charset="UTF-8"> — Sets the character encoding to UTF-8, which supports virtually every character from every language, plus emoji. Without this, special characters like é, ñ, or — might display as garbled symbols.

• <title>Quote Box</title> — The text that appears on the browser tab. Try changing it to your name and refreshing — you'll see it update in the tab.

• <link rel="stylesheet" href="style.css"> — This connects our CSS file to the HTML. When the browser loads the page, it reads this tag and fetches style.css to apply the styles. Since both files are in the same folder, the filename alone works as the path.

• <body> — Everything visible on the page goes inside <body>. Right now it's empty, so the page will be blank.

Press Ctrl + S to save the file.`,
        docLinks: [
          {
            label: "DOCTYPE",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Doctype",
            type: "html-concept",
          },
          {
            label: "<link> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link",
            type: "html-element",
          },
          {
            label: "<html> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html",
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
            body: "The <link> tag connects your CSS file to your HTML. The href attribute is the path to the CSS file. Since both files are in the same folder, just the filename works. If your CSS were in a subfolder called css/, you'd write href=\"css/style.css\" instead.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Quote Box</title>
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

    // ── Step 3: Add a quote box ──────────────────────────────────────
    {
      id: "codelab-padding-quote-html",
      type: "explanation",
      instruction: {
        heading: "Add a quote box",
        body: `Now let's add some actual content to the page. Place the following HTML between the opening <body> and closing </body> tags:

Here's what each piece does:

• <div class="quote-box"> — A <div> is a generic container element. On its own it does nothing visible — it's just a box that groups content together. The class="quote-box" gives it a name we can target with CSS later.

• <p> — A paragraph element containing our quote text. Browsers automatically add a little vertical spacing above and below paragraphs.

• <span class="author"> — A <span> is an inline container (it doesn't start a new line). We're using it to wrap the author name so we can style it differently from the quote later.

Save the file with Ctrl + S, then open it in your browser. Go back to your terminal and type:

xdg-open index.html

This command tells Linux to open the file in your default web browser. Alternatively, you can open your browser manually and press Ctrl + O to open a file, then navigate to ~/box-model-lab/index.html.

What you'll see: plain black text on a white background. No spacing, no box, no visual distinction at all. It looks like a boring document — and that's completely expected! HTML gives structure and meaning; CSS is what makes things look good. We'll add that next.`,
        docLinks: [
          {
            label: "<div> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div",
            type: "html-element",
          },
          {
            label: "<p> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p",
            type: "html-element",
          },
          {
            label: "<span> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span",
            type: "html-element",
          },
          {
            label: "class attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class",
            type: "html-attribute",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            body: "Every time you change your HTML or CSS, you need to: 1) Press Ctrl+S to save the file, then 2) Switch to the browser and press Ctrl+R (or F5) to refresh the page. The browser doesn't detect changes automatically — you have to tell it to reload. This save-then-refresh cycle is the core development workflow you'll use thousands of times.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `<body>
  <div class="quote-box">
    <p>"The only way to learn a new programming language is by writing programs in it."</p>
    <span class="author">— Dennis Ritchie</span>
  </div>
</body>`,
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Place the <div> between <body> and </body>.",
        "Make sure the class name is exactly \"quote-box\" — CSS is case-sensitive.",
        "Save with Ctrl+S, then refresh the browser with Ctrl+R.",
      ],
    },

    // ── Step 4: Add padding ──────────────────────────────────────────
    {
      id: "codelab-padding-add-padding",
      type: "explanation",
      instruction: {
        heading: "Add padding",
        body: `Now click on style.css in VS Code's sidebar to open it. This is where we make things look good.

Type the following CSS:

Save with Ctrl + S, then switch to your browser and press Ctrl + R to refresh.

What changed? The text now has breathing room around it, and the box has a light blue-gray background so you can actually see it. That breathing room is padding — the space between the content (your text) and the edge of the element's box.

Why does padding exist? Imagine shipping a fragile vase in a cardboard box. You wouldn't just drop the vase in and close the lid — you'd stuff foam or bubble wrap around it to keep it away from the edges. Padding works the same way: it's the protective space between your content and the box's border/edge. Without it, text crammed against the edge of a colored box looks cramped and hard to read.

Experiment with different values to build your intuition:
• Change padding: 24px; to padding: 0; — save, refresh. The text touches the very edge of the background. Uncomfortable, right?
• Try padding: 48px; — save, refresh. Now there's tons of room, maybe too much for this small quote.
• Set it back to padding: 24px; — a comfortable middle ground.

Each time you change a value, save and refresh to see the result. This experiment-and-observe cycle is how professional developers work too — nobody memorizes the perfect values. You try, look, and adjust.`,
        analogy: "Padding is like the foam inside a shipping box — it protects the contents by keeping them away from the edges. The more foam (padding) you add, the more space between the item (content) and the box walls (border).",
        docLinks: [
          {
            label: "padding",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/padding",
            type: "css-property",
          },
          {
            label: "background-color",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/background-color",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            body: "Padding is always inside the element's border. It pushes the content inward, away from the edges. If you add a background color, the padding area gets that color too — the background fills both the content area and the padding area. This is an important detail: padding is visually part of the element's colored box.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `.quote-box {
  padding: 24px;
  background-color: #f0f4f8;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Make sure you're editing style.css, not index.html.",
        "The dot before quote-box (.quote-box) is a CSS class selector — it targets elements with class=\"quote-box\".",
        "Don't forget the semicolon at the end of each line inside the curly braces.",
      ],
    },

    // ── Step 5: Different padding per side ───────────────────────────
    {
      id: "codelab-padding-shorthand",
      type: "explanation",
      instruction: {
        heading: "Different padding per side",
        body: `So far we've used a single value (padding: 24px;) which applies the same padding to all four sides — top, right, bottom, and left. But real designs often need different amounts of space on different sides. CSS gives you several ways to do this.

Two-value shorthand:
Change your CSS to padding: 12px 24px; — save, refresh. Notice the difference? With two values:
• First value = top AND bottom (12px)
• Second value = left AND right (24px)

The sides now have more space than the top and bottom. This is useful when you want horizontal breathing room without making the element too tall.

Four-value shorthand:
Now try padding: 10px 24px 20px 24px; — save, refresh. With four values, each side gets its own number, going clockwise from the top:
• Top = 10px
• Right = 24px
• Bottom = 20px
• Left = 24px

Notice the bottom (20px) has more padding than the top (10px). This is common in UI design — extra space at the bottom can make text feel more grounded.

Individual properties:
You can also set each side one at a time:

padding-top: 10px;
padding-right: 24px;
padding-bottom: 20px;
padding-left: 24px;

This does exactly the same thing as the four-value shorthand, but it's more verbose. Use individual properties when you only need to change one side; use the shorthand when setting multiple sides at once.

Set your padding back to padding: 24px; for now — we'll keep it simple for the rest of this codelab.`,
        analogy: "Think of a clock face. The four-value shorthand starts at 12 o'clock (top) and goes clockwise: 12 = top, 3 = right, 6 = bottom, 9 = left.",
        docLinks: [
          {
            label: "padding",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/padding",
            type: "css-property",
          },
          {
            label: "padding-top",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/padding-top",
            type: "css-property",
          },
          {
            label: "padding-right",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/padding-right",
            type: "css-property",
          },
          {
            label: "padding-bottom",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/padding-bottom",
            type: "css-property",
          },
          {
            label: "padding-left",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/padding-left",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            body: "The clockwise order (top, right, bottom, left) is the same for padding, margin, and border-width. A popular mnemonic is TRouBLe: Top, Right, Bottom, Left. Once you memorize this for padding, you know it for all box model shorthand properties.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `/* Two-value shorthand: top/bottom | left/right */
.quote-box {
  padding: 12px 24px;
  background-color: #f0f4f8;
}

/* Four-value shorthand: top | right | bottom | left */
.quote-box {
  padding: 10px 24px 20px 24px;
  background-color: #f0f4f8;
}

/* Individual properties (same result as four-value above) */
.quote-box {
  padding-top: 10px;
  padding-right: 24px;
  padding-bottom: 20px;
  padding-left: 24px;
  background-color: #f0f4f8;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Two values: first is top/bottom, second is left/right.",
        "Four values go clockwise: top, right, bottom, left (TRouBLe).",
        "You only need one .quote-box rule in your file — don't paste all three examples at once.",
      ],
    },

    // ── Step 6: Add width and height ─────────────────────────────────
    {
      id: "codelab-padding-width",
      type: "explanation",
      instruction: {
        heading: "Add width and finishing styles",
        body: `Let's give our quote box a fixed width and some finishing touches to make it look like the quote callouts you see on sites like Medium, DEV Community, and documentation pages.

Update your style.css to match the code below. We're adding several new properties — let's walk through each one:

• width: 400px; — Sets the content area to 400 pixels wide. But here's a crucial detail: how wide is the entire box on screen? It's NOT 400px. With padding: 24px on each side, the total visible width is 400 + 24 + 24 = 448px. This is because width only sets the content area, and padding is added outside of it. This default behavior is called the content-box model.

• border-left: 4px solid #3B82F6; — Adds a blue vertical line on the left edge. This is a classic design pattern for quote boxes and callouts — you've probably seen it on Medium articles, Slack messages, and developer documentation. The 4px is the thickness, solid is the line style, and #3B82F6 is a pleasant blue color.

• font-style: italic; — Makes the quote text italic, a traditional typographic convention for quotations.

• color: #334155; — A dark slate gray that's softer than pure black. Pure black (#000000) on pure white (#FFFFFF) creates harsh contrast that can cause eye strain. Professional designs almost always use a dark gray instead.

• line-height: 1.6; — Increases the spacing between lines of text. The default (around 1.2) feels cramped for reading. 1.6 gives each line room to breathe.

Save and refresh. Your quote box should now look like a polished callout component — the kind you'd find on a real website!

Open your browser's developer tools (F12 or Ctrl + Shift + I), hover over the quote box, and look at the box model diagram. You'll see the content area (400px) surrounded by the padding (24px on each side). The total space taken up is wider than the width value you set — that's the content-box model in action.`,
        docLinks: [
          {
            label: "width",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/width",
            type: "css-property",
          },
          {
            label: "border-left",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/border-left",
            type: "css-property",
          },
          {
            label: "font-style",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/font-style",
            type: "css-property",
          },
          {
            label: "line-height",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/line-height",
            type: "css-property",
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
            body: "By default, width only controls the content area. Padding, border, and margin are added on top of that value. So a 400px-wide element with 24px padding on each side actually takes up 448px of horizontal space (plus any border width). This is called the content-box model — you'll learn how to change this behavior with box-sizing: border-box in a later codelab.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `.quote-box {
  width: 400px;
  padding: 24px;
  background-color: #f0f4f8;
  border-left: 4px solid #3B82F6;
  font-style: italic;
  color: #334155;
  line-height: 1.6;
}

.author {
  display: block;
  margin-top: 12px;
  font-style: normal;
  font-weight: 600;
  color: #64748b;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Replace your entire style.css content with the code shown.",
        "The total visible width = content width + left padding + right padding + left border. Here: 400 + 24 + 24 + 4 = 452px.",
        "Press F12 in the browser to open developer tools and inspect the box model visually.",
      ],
    },

    // ── Step 7: Checkpoint ───────────────────────────────────────────
    {
      id: "codelab-padding-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Test yourself: padding shorthand",
        body: `Time to practice what you've learned! Write CSS for two versions of a .callout class:

Version 1 (.callout): A box that is 300px wide with 20px of padding on all four sides. Use the single-value padding shorthand.

Version 2 (.callout-v2): The same 300px-wide box, but with different vertical and horizontal padding: 10px on top and bottom, 30px on left and right. Use the two-value padding shorthand.

Think about the total rendered width of each box:
• Version 1: 300 + 20 + 20 = 340px total width
• Version 2: 300 + 30 + 30 = 360px total width

Even though both have width: 300px, they take up different amounts of space on screen because their horizontal padding differs. This is the content-box model at work!`,
        docLinks: [
          {
            label: "padding",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/padding",
            type: "css-property",
          },
          {
            label: "width",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/width",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            body: "Remember: one value means all four sides are the same. Two values mean top/bottom and left/right. Four values go clockwise from the top (TRouBLe: Top, Right, Bottom, Left).",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode: `.callout {
  /* Version 1: equal padding on all sides */

}

.callout-v2 {
  /* Version 2: different padding top/bottom vs left/right */

}`,
        language: "css",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "padding" },
      },
      hints: [
        "For version 1: width: 300px; padding: 20px;",
        "For version 2: padding: 10px 30px; — first value is top/bottom, second is left/right.",
        "Don't forget to add width: 300px; to both versions!",
      ],
    },
  ],
};
