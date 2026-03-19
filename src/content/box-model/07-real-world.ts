import type { Lesson } from "@/types/lesson";

const defaultSides = { top: 0, right: 0, bottom: 0, left: 0 };

export const lesson: Lesson = {
  id: "box-model-real-world",
  slug: "real-world",
  title: "Real-World Challenges",
  description: "Apply the box model to scenarios you'll encounter on real websites.",
  order: 7,
  steps: [
    {
      id: "profile-card",
      type: "challenge",
      instruction: {
        heading: "Style a profile card",
        body: "Profile cards on sites like LinkedIn and Instagram need internal breathing room and a subtle border to frame the content. Your target:\n\n• Padding: 24px on all sides (space between the text and the card edge)\n• Border: 1px on all sides (a thin frame around the card)\n\nThe content size is already set — focus on padding and border only.",
        docLinks: [
          { label: "padding", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/padding", type: "css-property" },
          { label: "border", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/border", type: "css-property" },
        ],
        infoBoxes: [
          { variant: "tip", body: "Cards almost always use equal padding on all sides for a balanced, professional look. This is one of the most common patterns in web design." },
        ],
      },
      config: {
        type: "challenge",
        initialValues: {
          contentWidth: 280,
          contentHeight: 160,
          padding: defaultSides,
          border: defaultSides,
          margin: defaultSides,
          boxSizing: "content-box",
        },
        targetValues: {
          contentWidth: 280,
          contentHeight: 160,
          padding: { top: 24, right: 24, bottom: 24, left: 24 },
          border: { top: 1, right: 1, bottom: 1, left: 1 },
          margin: defaultSides,
          boxSizing: "content-box",
        },
        tolerance: 3,
        lockedProperties: ["content", "margin", "boxSizing"],
      },
      validation: { type: "values-match", criteria: {} },
      hints: ["Set all padding to 24px.", "Set all border to 1px."],
    },
    {
      id: "nav-button",
      type: "challenge",
      instruction: {
        heading: "Create a navigation button",
        body: "Buttons in apps like Discord and Slack use padding for their clickable area and margin to space them apart. Your target:\n\n• Padding: 12px top/bottom, 24px left/right (wider than tall)\n• Margin: 0px top/bottom, 8px left/right (horizontal spacing between buttons)\n\nNotice how the wider horizontal padding makes the button readable and easy to click.",
        docLinks: [
          { label: "padding", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/padding", type: "css-property" },
          { label: "margin", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/margin", type: "css-property" },
        ],
        infoBoxes: [
          { variant: "tip", body: "Horizontal padding greater than vertical padding creates wide, readable buttons — this is the standard pattern used across the web." },
        ],
      },
      config: {
        type: "challenge",
        initialValues: {
          contentWidth: 80,
          contentHeight: 20,
          padding: defaultSides,
          border: defaultSides,
          margin: defaultSides,
          boxSizing: "content-box",
        },
        targetValues: {
          contentWidth: 80,
          contentHeight: 20,
          padding: { top: 12, right: 24, bottom: 12, left: 24 },
          border: defaultSides,
          margin: { top: 0, right: 8, bottom: 0, left: 8 },
          boxSizing: "content-box",
        },
        tolerance: 3,
        lockedProperties: ["content", "border", "boxSizing"],
      },
      validation: { type: "values-match", criteria: {} },
      hints: [
        "Padding: 12px top/bottom, 24px left/right.",
        "Margin: 0 top/bottom, 8px left/right.",
      ],
    },
    {
      id: "product-card",
      type: "challenge",
      instruction: {
        heading: "Layout a product card",
        body: "Product cards on sites like Amazon use all four box model layers. Build one from scratch:\n\n• Content: 240px wide, 200px tall\n• Padding: 16px on all sides (internal spacing)\n• Border: 2px on all sides (card frame)\n• Margin: 12px on all sides (gap between cards in a grid)\n\nWork from the inside out: content first, then padding, border, and finally margin.",
        docLinks: [
          { label: "padding", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/padding", type: "css-property" },
          { label: "border", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/border", type: "css-property" },
          { label: "margin", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/margin", type: "css-property" },
        ],
        infoBoxes: [
          { variant: "standard", body: "Cards in a grid use margin to create gutters between items. In modern CSS, you can also use the gap property with Flexbox or Grid — but margin is the foundational technique." },
        ],
      },
      config: {
        type: "challenge",
        initialValues: {
          contentWidth: 200,
          contentHeight: 150,
          padding: defaultSides,
          border: defaultSides,
          margin: defaultSides,
          boxSizing: "content-box",
        },
        targetValues: {
          contentWidth: 240,
          contentHeight: 200,
          padding: { top: 16, right: 16, bottom: 16, left: 16 },
          border: { top: 2, right: 2, bottom: 2, left: 2 },
          margin: { top: 12, right: 12, bottom: 12, left: 12 },
          boxSizing: "content-box",
        },
        tolerance: 3,
        lockedProperties: ["boxSizing"],
      },
      validation: { type: "values-match", criteria: {} },
      hints: [
        "Content: 240 wide, 200 tall.",
        "Padding: 16 on all sides.",
        "Border: 2 on all sides.",
        "Margin: 12 on all sides.",
      ],
    },
    {
      id: "notification-badge",
      type: "challenge",
      instruction: {
        heading: "Build a notification badge",
        body: "Notification badges — like the red dots on Gmail or YouTube — are tiny elements where every pixel matters. Your target:\n\n• Content: 20px wide, 20px tall (just enough for a number)\n• Padding: 4px on all sides (tight spacing)\n• Border: 2px on all sides (visible outline)\n\nSmall elements like badges use proportionally small padding to avoid looking oversized.",
        docLinks: [
          { label: "padding", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/padding", type: "css-property" },
          { label: "border", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/border", type: "css-property" },
        ],
        infoBoxes: [
          { variant: "tip", body: "Small elements need small padding — too much overwhelms the content. A notification badge with 20px padding would look absurd. Scale padding to the element's purpose." },
        ],
      },
      config: {
        type: "challenge",
        initialValues: {
          contentWidth: 30,
          contentHeight: 30,
          padding: defaultSides,
          border: defaultSides,
          margin: defaultSides,
          boxSizing: "content-box",
        },
        targetValues: {
          contentWidth: 20,
          contentHeight: 20,
          padding: { top: 4, right: 4, bottom: 4, left: 4 },
          border: { top: 2, right: 2, bottom: 2, left: 2 },
          margin: defaultSides,
          boxSizing: "content-box",
        },
        tolerance: 2,
        lockedProperties: ["margin", "boxSizing"],
      },
      validation: { type: "values-match", criteria: {} },
      hints: [
        "Content: 20 wide, 20 tall.",
        "Padding: 4 on all sides.",
        "Border: 2 on all sides.",
      ],
    },
    {
      id: "blog-paragraph",
      type: "challenge",
      instruction: {
        heading: "Space out blog paragraphs",
        body: "On reading-heavy sites like Wikipedia and Medium, paragraphs need vertical spacing but stretch edge-to-edge horizontally. Your target:\n\n• Margin: 20px on top and bottom (separates paragraphs)\n• Margin: 0px on left and right (no horizontal offset)\n\nOnly the margin sliders are unlocked — this challenge focuses purely on spacing between elements.",
        docLinks: [
          { label: "margin", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/margin", type: "css-property" },
        ],
        infoBoxes: [
          { variant: "standard", body: "Vertical margin between paragraphs is how browsers separate <p> elements by default. The browser's built-in stylesheet applies top and bottom margin to paragraphs automatically." },
        ],
      },
      config: {
        type: "challenge",
        initialValues: {
          contentWidth: 400,
          contentHeight: 80,
          padding: defaultSides,
          border: defaultSides,
          margin: defaultSides,
          boxSizing: "content-box",
        },
        targetValues: {
          contentWidth: 400,
          contentHeight: 80,
          padding: defaultSides,
          border: defaultSides,
          margin: { top: 20, right: 0, bottom: 20, left: 0 },
          boxSizing: "content-box",
        },
        tolerance: 3,
        lockedProperties: ["content", "padding", "border", "boxSizing"],
      },
      validation: { type: "values-match", criteria: {} },
      hints: [
        "Margin: 20px top and bottom.",
        "Margin: 0 left and right.",
      ],
    },
    {
      id: "pricing-table-cell",
      type: "challenge",
      instruction: {
        heading: "Design a pricing table cell",
        body: "Pricing pages on sites like Stripe and Netlify use border-box sizing so columns stay at their declared width. This challenge uses all the skills you've learned:\n\n• Width: 200px, Height: 120px\n• Padding: 16px on all sides\n• Border: 2px on all sides\n• Box-sizing: switch to border-box\n\nWith border-box, the 200px width includes the padding and border — the content shrinks to fit.",
        docLinks: [
          { label: "box-sizing", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing", type: "css-property" },
          { label: "padding", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/padding", type: "css-property" },
          { label: "border", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/border", type: "css-property" },
        ],
        infoBoxes: [
          { variant: "tip", body: "border-box is essential for grid layouts — it keeps columns at their declared width regardless of padding and border. Without it, adding padding would push columns out of alignment." },
        ],
      },
      config: {
        type: "challenge",
        initialValues: {
          contentWidth: 200,
          contentHeight: 120,
          padding: defaultSides,
          border: defaultSides,
          margin: defaultSides,
          boxSizing: "content-box",
        },
        targetValues: {
          contentWidth: 200,
          contentHeight: 120,
          padding: { top: 16, right: 16, bottom: 16, left: 16 },
          border: { top: 2, right: 2, bottom: 2, left: 2 },
          margin: defaultSides,
          boxSizing: "border-box",
        },
        tolerance: 3,
        lockedProperties: ["margin"],
      },
      validation: { type: "values-match", criteria: {} },
      hints: [
        "Set padding to 16 on all sides.",
        "Set border to 2 on all sides.",
        "Switch box-sizing to border-box.",
      ],
    },
  ],
};
