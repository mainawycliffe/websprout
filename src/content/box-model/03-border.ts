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
        body: "The border wraps around the padding. Unlike padding and margin which are invisible, borders are visible — they have a width, style, and color. In our model, the border is the yellow layer.",
        analogy: "The border is the actual wall of the box. Padding is the foam inside, and the border is the cardboard itself.",
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
        body: "Use the sliders to add border width to each side. Watch the yellow border layer appear between the green padding and orange margin!",
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
        body: "Set a uniform border of 8px on all sides.",
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
