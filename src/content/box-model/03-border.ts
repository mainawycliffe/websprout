import type { Lesson } from "@/types/lesson";

const defaultSides = { top: 0, right: 0, bottom: 0, left: 0 };

export const lesson: Lesson = {
  id: "box-model-border",
  slug: "border",
  title: "Border",
  description: "Add visible edges around your elements.",
  order: 3,
  steps: [
    {
      id: "border-intro",
      type: "explanation",
      instruction: {
        heading: "Border: the visible edge",
        body: "The border is the one box model layer you can actually see. It wraps around the padding and gives elements a visible frame — like the outline around input fields on Google's login form, or the subtle lines separating cards on Instagram.\n\nIn CSS, borders have three properties: width (thickness), style (solid, dashed, etc.), and color. In our visualization, the border is the yellow layer.",
        analogy: "The border is the actual wall of the box. Padding is the foam inside, and the border is the cardboard itself.",
        docLinks: [
          { label: "border", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/border", type: "css-property" },
        ],
        infoBoxes: [
          { variant: "standard", body: "Borders have three properties: width, style, and color. The border shorthand sets all three at once (e.g., border: 2px solid #333). Without a style, borders are invisible even if they have a width." },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "explore-border",
      type: "slider-explore",
      instruction: {
        heading: "Add a border",
        body: "Use the border sliders on the right to adjust the border width on each side. Watch the yellow border layer appear between the green padding and the content.\n\nNotice how increasing the border makes the overall element bigger — the border is added outside the padding.",
        docLinks: [
          { label: "border", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/border", type: "css-property" },
        ],
        infoBoxes: [
          { variant: "tip", body: "Borders add to the element's total size in content-box mode. A 200px-wide element with 5px borders on each side takes up 210px total — this catches many beginners off guard." },
        ],
      },
      config: {
        type: "slider-explore",
        initialValues: {
          contentWidth: 200,
          contentHeight: 100,
          padding: { top: 20, right: 20, bottom: 20, left: 20 },
          border: { top: 4, right: 4, bottom: 4, left: 4 },
          margin: defaultSides,
          boxSizing: "content-box",
        },
        lockedProperties: ["content", "padding", "margin", "boxSizing"],
        highlightProperty: "border",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "border-challenge",
      type: "challenge",
      instruction: {
        heading: "Match the border",
        body: "Set all four border sides to the same value: 8px each. A uniform border (equal on all sides) is the most common pattern — you'll see it on buttons, cards, and input fields across the web.",
        docLinks: [
          { label: "border", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/border", type: "css-property" },
        ],
      },
      config: {
        type: "challenge",
        initialValues: {
          contentWidth: 200,
          contentHeight: 100,
          padding: { top: 20, right: 20, bottom: 20, left: 20 },
          border: defaultSides,
          margin: defaultSides,
          boxSizing: "content-box",
        },
        targetValues: {
          contentWidth: 200,
          contentHeight: 100,
          padding: { top: 20, right: 20, bottom: 20, left: 20 },
          border: { top: 8, right: 8, bottom: 8, left: 8 },
          margin: defaultSides,
          boxSizing: "content-box",
        },
        tolerance: 2,
        lockedProperties: ["content", "padding", "margin", "boxSizing"],
      },
      validation: { type: "values-match", criteria: {} },
      hints: ["Set all four border sides to 8px."],
    },
  ],
};
