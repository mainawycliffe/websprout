import type { Lesson } from "@/types/lesson";

const defaultSides = { top: 0, right: 0, bottom: 0, left: 0 };

export const lesson: Lesson = {
  id: "box-model-margin",
  slug: "margin",
  title: "Margin",
  description: "Create space between elements with margin.",
  order: 4,
  steps: [
    {
      id: "margin-intro",
      type: "explanation",
      instruction: {
        heading: "Margin: space outside the box",
        body: "Margin is the outermost layer. It creates space between this element and its neighbors. Margin is always transparent — you can't see it, but it pushes other elements away.",
        analogy: "Margin is like your personal space bubble. You can't see it, but it keeps other people at a comfortable distance.",
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "explore-margin",
      type: "slider-explore",
      instruction: {
        heading: "Add margin",
        body: "Use the sliders to add margin. The orange layer shows the margin space outside the border. This is the space between this element and anything next to it.",
      },
      config: {
        type: "slider-explore",
        initialValues: {
          contentWidth: 200,
          contentHeight: 100,
          padding: { top: 15, right: 15, bottom: 15, left: 15 },
          border: { top: 3, right: 3, bottom: 3, left: 3 },
          margin: { top: 20, right: 20, bottom: 20, left: 20 },
          boxSizing: "content-box",
        },
        lockedProperties: ["content", "padding", "border", "boxSizing"],
        highlightProperty: "margin",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "all-layers",
      type: "slider-explore",
      instruction: {
        heading: "See all layers together",
        body: "Now all layers are unlocked! Explore how content, padding, border, and margin work together. Try changing different values and watch the total size change.",
      },
      config: {
        type: "slider-explore",
        initialValues: {
          contentWidth: 150,
          contentHeight: 80,
          padding: { top: 20, right: 20, bottom: 20, left: 20 },
          border: { top: 3, right: 3, bottom: 3, left: 3 },
          margin: { top: 15, right: 15, bottom: 15, left: 15 },
          boxSizing: "content-box",
        },
        lockedProperties: [],
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
