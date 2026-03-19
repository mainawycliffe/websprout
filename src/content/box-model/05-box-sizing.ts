import type { Lesson } from "@/types/lesson";

const defaultSides = { top: 0, right: 0, bottom: 0, left: 0 };

export const lesson: Lesson = {
  id: "box-model-box-sizing",
  slug: "box-sizing",
  title: "Box Sizing",
  description: "Understand the difference between content-box and border-box.",
  order: 5,
  steps: [
    {
      id: "content-box-mode",
      type: "explanation",
      instruction: {
        heading: "content-box: width means content only",
        body: "By default, CSS uses content-box — the original behavior from the earliest CSS specification. When you set width: 200px, that only sets the content area. Padding and border are added on top, making the element bigger than 200px.\n\nFor example: a 200px-wide element with 20px padding and 5px border actually takes up 250px (200 + 20 + 20 + 5 + 5). This unintuitive math caused real headaches for early web developers.",
        analogy: "It's like ordering a 12-inch pizza and the box adds 2 inches on each side. You asked for 12 inches but the total package is 16 inches!",
        docLinks: [
          { label: "box-sizing", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing", type: "css-property" },
        ],
        infoBoxes: [
          { variant: "standard", body: "content-box is the CSS specification default. The width property sets only the content width — padding and border are added on top." },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "border-box-mode",
      type: "explanation",
      instruction: {
        heading: "border-box: width includes padding and border",
        body: "With border-box, the width you set is the total size including content, padding, and border. Set width: 200px and the element stays exactly 200px wide — padding and border shrink the content area instead of expanding the element.\n\nThis makes layout math much simpler. That's why virtually every modern CSS framework — Bootstrap, Tailwind, and others — sets box-sizing: border-box globally as one of the first things they do.",
        analogy: "It's like saying the pizza box must be exactly 12 inches. If the box walls are thick, the pizza inside gets smaller to fit.",
        docLinks: [
          { label: "box-sizing", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing", type: "css-property" },
        ],
        infoBoxes: [
          { variant: "tip", body: "Most professional projects start with *, *::before, *::after { box-sizing: border-box; } in their reset stylesheet. This is considered best practice across the industry." },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "toggle-box-sizing",
      type: "slider-explore",
      instruction: {
        heading: "Toggle between modes",
        body: "This element starts with 20px padding and 5px border on all sides. Use the box-sizing toggle in the controls to switch between the two modes and watch the total size change.\n\nIn content-box mode, the total is larger than the declared width. Switch to border-box and the total snaps to match the declared width — padding and border shrink inward instead of expanding outward.",
        docLinks: [
          { label: "box-sizing", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing", type: "css-property" },
          { label: "width", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/width", type: "css-property" },
        ],
        infoBoxes: [
          { variant: "tip", body: "If your layout unexpectedly overflows its container, check whether you're using content-box — padding and border might be making elements wider than you expect." },
        ],
      },
      config: {
        type: "slider-explore",
        initialValues: {
          contentWidth: 200,
          contentHeight: 100,
          padding: { top: 20, right: 20, bottom: 20, left: 20 },
          border: { top: 5, right: 5, bottom: 5, left: 5 },
          margin: defaultSides,
          boxSizing: "content-box",
        },
        lockedProperties: [],
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
