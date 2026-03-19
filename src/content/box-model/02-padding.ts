import type { Lesson } from "@/types/lesson";

const defaultSides = { top: 0, right: 0, bottom: 0, left: 0 };

export const lesson: Lesson = {
  id: "box-model-padding",
  slug: "padding",
  title: "Padding",
  description: "Add breathing room between content and its border.",
  order: 2,
  steps: [
    {
      id: "padding-intro",
      type: "explanation",
      instruction: {
        heading: "Padding: space inside the box",
        body: "Padding is the space between the content and the border. It pushes the content inward, giving it breathing room. You can set padding for each side independently: top, right, bottom, left.",
        analogy: "Padding is like the foam inside a shipping box. It protects the contents by creating space between them and the box walls.",
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "explore-padding",
      type: "slider-explore",
      instruction: {
        heading: "Try adding padding",
        body: "Use the sliders to add padding to each side. Watch how the green padding layer grows around the blue content!",
      },
      config: {
        type: "slider-explore",
        initialValues: {
          contentWidth: 200,
          contentHeight: 100,
          padding: { top: 10, right: 10, bottom: 10, left: 10 },
          border: defaultSides,
          margin: defaultSides,
          boxSizing: "content-box",
        },
        lockedProperties: ["content", "border", "margin", "boxSizing"],
        highlightProperty: "padding",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "padding-challenge",
      type: "challenge",
      instruction: {
        heading: "Match the padding",
        body: "Set padding to 30px on top and bottom, and 20px on left and right.",
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
          contentWidth: 200,
          contentHeight: 100,
          padding: { top: 30, right: 20, bottom: 30, left: 20 },
          border: defaultSides,
          margin: defaultSides,
          boxSizing: "content-box",
        },
        tolerance: 3,
        lockedProperties: ["content", "border", "margin", "boxSizing"],
      },
      validation: { type: "values-match", criteria: {} },
      hints: [
        "Top and bottom padding should be 30px.",
        "Left and right padding should be 20px.",
      ],
    },
  ],
};
