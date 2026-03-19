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
        body: "By default, CSS uses content-box. When you set width: 200px, that's ONLY the content. Padding and border get ADDED on top, making the element bigger than 200px. Total = content + padding + border.",
        analogy: "It's like ordering a 12-inch pizza and the box adds 2 inches on each side. You asked for 12 inches but the total package is 16 inches!",
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
        body: "With border-box, the width you set includes content + padding + border. Set width: 200px and the total stays 200px — padding and border eat into the content space. Most developers prefer this because it's more predictable!",
        analogy: "It's like saying the pizza box must be exactly 12 inches. If the box walls are thick, the pizza inside gets smaller to fit.",
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
        body: "This element has padding and border. Toggle the box-sizing switch and watch what happens to the total size! In content-box mode, the total is bigger. In border-box mode, the total matches the width you set.",
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
