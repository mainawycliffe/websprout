import type { Lesson } from "@/types/lesson";

const defaultSides = { top: 0, right: 0, bottom: 0, left: 0 };

export const lesson: Lesson = {
  id: "box-model-content",
  slug: "content-box",
  title: "The Content Box",
  description: "Every element starts with a content box — the innermost layer.",
  order: 1,
  steps: [
    {
      id: "intro",
      type: "explanation",
      instruction: {
        heading: "Everything is a box",
        body: "In CSS, every element on the page is a rectangular box. Even text, images, and buttons — they're all boxes. The CSS Box Model describes the layers that make up each box.",
        analogy: "Think of a picture frame. The photo is the content, and it's surrounded by layers of matting, the frame itself, and space on the wall around it.",
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "content-layer",
      type: "slider-explore",
      instruction: {
        heading: "The content layer",
        body: "The content is the innermost box. It holds your text, images, or other elements. Try changing the width and height to see how it changes!",
      },
      config: {
        type: "slider-explore",
        initialValues: {
          contentWidth: 200,
          contentHeight: 100,
          padding: defaultSides,
          border: defaultSides,
          margin: defaultSides,
          boxSizing: "content-box",
        },
        lockedProperties: ["padding", "border", "margin", "boxSizing"],
        highlightProperty: "content",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "size-matters",
      type: "challenge",
      instruction: {
        heading: "Match the target size",
        body: "Adjust the content width and height to match the target box. The target is 300px wide and 150px tall.",
      },
      config: {
        type: "challenge",
        initialValues: {
          contentWidth: 200,
          contentHeight: 100,
          padding: defaultSides,
          border: defaultSides,
          margin: defaultSides,
          boxSizing: "content-box",
        },
        targetValues: {
          contentWidth: 300,
          contentHeight: 150,
          padding: defaultSides,
          border: defaultSides,
          margin: defaultSides,
          boxSizing: "content-box",
        },
        tolerance: 5,
        lockedProperties: ["padding", "border", "margin", "boxSizing"],
      },
      validation: { type: "values-match", criteria: {} },
      hints: ["Set the width to 300.", "Set the height to 150."],
    },
  ],
};
