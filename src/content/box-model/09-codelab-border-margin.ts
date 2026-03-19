import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "box-model-codelab-border-margin",
  slug: "codelab-border-margin",
  title: "Codelab 2: Card with Border & Spacing",
  description: "Add borders and margins to create spaced-out card layouts.",
  order: 9,
  steps: [
    {
      id: "open-project",
      type: "explanation",
      instruction: {
        heading: "Open your project",
        body: "Let's pick up where Codelab 1 left off and build something new: a set of styled cards with borders and spacing.\n\nOpen your terminal by pressing Ctrl+Alt+T. Navigate to your project folder:\n\ncd ~/box-model-lab\n\nThen open it in VS Code:\n\ncode .\n\nIf you're starting fresh and didn't do Codelab 1, create the folder and files first:\n\nmkdir ~/box-model-lab && cd ~/box-model-lab\ntouch index.html style.css\ncode .\n\nOnce VS Code opens, you should see your index.html and style.css files in the left sidebar. We'll update both of these in the following steps.",
        infoBoxes: [
          {
            variant: "tip",
            body: "If you completed Codelab 1, your project folder already exists with your quote box code. We'll replace it with cards in the next step — but your setup is already done.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "# If continuing from Codelab 1:\ncd ~/box-model-lab\ncode .\n\n# If starting fresh:\nmkdir ~/box-model-lab && cd ~/box-model-lab\ntouch index.html style.css\ncode .",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "create-card-html",
      type: "explanation",
      instruction: {
        heading: "Create card HTML",
        body: "Open index.html in VS Code (click it in the sidebar). Replace everything with the HTML shown below — or if you're continuing from Codelab 1, just replace the content inside <body>.\n\nWe're creating 3 cards. Each card is a <div> with a class of card, containing an <h2> title and a <p> description. This is one of the most common patterns on the entire web:\n\n• Amazon uses cards for every product listing\n• Twitter/X uses cards for every tweet\n• Airbnb uses cards for every property listing\n• Trello uses cards for every task on a board\n\nThey all follow the same structure: a container with a title and some content. That's exactly what we're building.\n\nAfter pasting the code, save the file with Ctrl+S. Then open it in your browser:\n\nxdg-open index.html\n\nOr if you already have it open from Codelab 1, just press Ctrl+R in the browser to refresh.\n\nYou'll see 3 cards stacked vertically — but right now they look like plain text with no visual separation. There are no borders, no spacing, nothing to tell the reader where one card ends and the next begins. We'll fix that with CSS in the following steps.",
        docLinks: [
          {
            label: "div",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div",
            type: "html-element",
          },
          {
            label: "h2",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements",
            type: "html-element",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Box Model Cards</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n\n  <div class="card">\n    <h2>Learning HTML</h2>\n    <p>HTML gives your page structure — headings, paragraphs, images, and links. It\'s the skeleton of every website.</p>\n  </div>\n\n  <div class="card">\n    <h2>Learning CSS</h2>\n    <p>CSS controls how things look — colors, fonts, spacing, and layout. It\'s what makes a website feel designed.</p>\n  </div>\n\n  <div class="card">\n    <h2>Learning the Box Model</h2>\n    <p>Every element is a box with content, padding, border, and margin. Understanding this is the key to CSS layouts.</p>\n  </div>\n\n</body>\n</html>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "add-border",
      type: "explanation",
      instruction: {
        heading: "Add a border",
        body: "Open style.css in VS Code. Add the following rule:\n\n.card {\n  border: 2px solid #ccc;\n}\n\nSave with Ctrl+S, then refresh your browser with Ctrl+R.\n\nNow each card has a visible outline — you can finally see where one card ends and another begins. The border shorthand takes 3 values:\n\n• Width — 2px (how thick the line is)\n• Style — solid (a continuous line)\n• Color — #ccc (a light gray)\n\nIn the box model layers, border sits between padding and margin: content → padding → border → margin. It's the frame that wraps around your content and any padding.\n\nTry experimenting! Change the border declaration and save/refresh each time:\n• border: 2px dashed #ccc; — a dashed line\n• border: 3px dotted blue; — thick blue dots\n• border: 1px solid black; — a thin black outline\n\nWhen you're done experimenting, set it back to border: 2px solid #ccc; for the next steps.",
        analogy:
          "A border is like the frame around a picture — it visually separates the content from everything outside it. Without a frame, a painting on a white wall blends into the background. Without a border, a card on a white page does the same.",
        docLinks: [
          {
            label: "border",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/border",
            type: "css-property",
          },
          {
            label: "border-style",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/border-style",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The border shorthand is one of the most convenient in CSS. You can also set sides individually: border-top: 2px solid red; only affects the top edge. This is useful when you want a decorative line on just one side — for example, a colored left border to highlight a quote.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: ".card {\n  border: 2px solid #ccc;\n}",
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "add-padding",
      type: "explanation",
      instruction: {
        heading: "Add padding inside the card",
        body: "Look at your cards in the browser — the text is pressed right up against the border. That looks cramped and hard to read. Let's fix it.\n\nAdd padding: 16px; to the .card rule in style.css:\n\n.card {\n  border: 2px solid #ccc;\n  padding: 16px;\n}\n\nSave (Ctrl+S) and refresh (Ctrl+R).\n\nNow there's breathing room between the text and the border. The card immediately looks more professional and readable.\n\nRemember from Codelab 1: padding is the space inside the element, between the content and the border. Here's the full layer order from inside to outside:\n\n• Content — your text (the <h2> and <p>)\n• Padding — breathing room (the 16px gap)\n• Border — the frame (the 2px line)\n• Margin — space between elements (we'll add this next)\n\nEach layer wraps around the previous one, like nesting boxes inside boxes.",
        docLinks: [
          {
            label: "padding",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/padding",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            body: "A card without padding looks unprofessional — text jammed against the border is hard to read and feels rushed. Most cards on real websites use 16px to 24px of padding. When in doubt, 16px is a safe default.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: ".card {\n  border: 2px solid #ccc;\n  padding: 16px;\n}",
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "add-margin",
      type: "explanation",
      instruction: {
        heading: "Add margin for spacing",
        body: "Your cards have nice borders and padding now, but they're stacked right against each other with no gap between them. The bottom border of one card is touching the top border of the next. Let's fix that.\n\nAdd margin-bottom: 16px; to the .card rule:\n\n.card {\n  border: 2px solid #ccc;\n  padding: 16px;\n  margin-bottom: 16px;\n}\n\nSave (Ctrl+S) and refresh (Ctrl+R).\n\nNow there's a clear gap between each card. Margin is the space outside the border, pushing neighboring elements away. While padding pushes content inward (away from the border), margin pushes other elements outward (away from this element).\n\nWhy margin-bottom instead of margin? For vertical lists of cards, you typically only want space below each card. Using margin: 16px; would add space on all four sides — including left and right, which you usually don't want for full-width cards.\n\nTry both to see the difference:\n• margin: 16px; — space on all four sides\n• margin-bottom: 16px; — space only below each card\n\nSet it back to margin-bottom: 16px; when you're done experimenting.",
        analogy:
          "Margin is like the gap between houses on a street. Each house (element) has its own yard space that keeps it from touching the neighbors. You can have a big yard (large margin) or a small one, but some space between houses makes the whole street look better.",
        docLinks: [
          {
            label: "margin",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/margin",
            type: "css-property",
          },
          {
            label: "margin-bottom",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "When two vertical margins touch (like the margin-bottom of card 1 and the margin-top of card 2), they collapse into one margin — the larger of the two wins. This is called margin collapsing, and it's one of the most common sources of CSS confusion. Using only margin-bottom avoids this issue entirely, because there's no margin-top to collide with.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          ".card {\n  border: 2px solid #ccc;\n  padding: 16px;\n  margin-bottom: 16px;\n}",
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "inspect-devtools",
      type: "explanation",
      instruction: {
        heading: "Inspect in DevTools",
        body: "Now for something powerful: let's see the box model in action using the browser's built-in Developer Tools.\n\nRight-click on one of your cards in the browser and select \"Inspect\" (or press F12). This opens the Developer Tools — the same tools professional web developers use every single day.\n\nIn the panel that opens, look for the box model diagram in the Styles or Computed tab. You'll see a set of nested colored rectangles:\n\n• Blue (center): the content area — your text\n• Green: padding — the 16px breathing room\n• Yellow/tan: border — the 2px outline\n• Orange: margin — the 16px gap below the card\n\nNow try this: hover over the card element in the DevTools Elements panel. The browser will highlight each layer directly on the page with matching colors. You can visually see the content, padding, border, and margin as separate colored zones.\n\nThis is the same visualization you used in WebSprout's Box Model Explorer — but it's built into every browser. Whenever something looks wrong in your CSS, this is the first place to check.\n\nYou can even click on the values in the box model diagram and edit them live. Try changing the padding from 16 to 32 and watch the card update in real time. (Don't worry — these live edits are temporary and will reset when you refresh.)",
        docLinks: [
          {
            label: "border",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/border",
            type: "css-property",
          },
          {
            label: "padding",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/padding",
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
            variant: "tip",
            body: "DevTools are your best friend for debugging CSS. If something looks wrong — unexpected spacing, elements overlapping, things not lining up — inspect it first. The box model diagram shows you exactly where the space is coming from: padding, border, or margin. Professional developers check this dozens of times a day.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "/* Your complete style.css so far: */\n\n.card {\n  border: 2px solid #ccc;\n  padding: 16px;\n  margin-bottom: 16px;\n}",
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Test yourself: card styling",
        body: "Time to check what you've learned. Without looking at the previous steps, write the CSS for a .card class with:\n\n• A 2px solid border (pick any color you like)\n• 20px padding on all sides\n• 12px margin on the bottom only\n\nType your CSS in the editor below. Think about what each property does:\n• border draws the frame around the card\n• padding creates breathing room between the text and the border\n• margin-bottom pushes the next card away, creating a gap\n\nYou've got this — you just built all three of these in the steps above!",
      },
      config: {
        type: "free-edit",
        starterCode:
          ".card {\n  /* Add border, padding, and margin-bottom */\n  \n}",
        language: "css",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "border" },
      },
      hints: [
        "border: 2px solid #ccc;",
        "padding: 20px;",
        "margin-bottom: 12px;",
      ],
    },
  ],
};
