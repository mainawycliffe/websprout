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
        body: "In CSS, every element on the page is a rectangular box — text, images, buttons, everything. Why? Because the browser needs to know exactly how much space each element occupies so it can lay out the page.\n\nThe CSS Box Model is the system browsers use to calculate that space. It wraps every element in four layers: content, padding, border, and margin. Every YouTube thumbnail, every Google search result card, every Instagram post — they're all boxes with these four layers.",
        analogy: "Think of a picture frame. The photo is the content, and it's surrounded by layers of matting, the frame itself, and space on the wall around it.",
        docLinks: [
          { label: "CSS Box Model", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model", type: "css-concept" },
        ],
        infoBoxes: [
          { variant: "standard", body: "Every HTML element generates a box — even inline elements like <span>. The box model is part of the CSS specification and governs all layout in the browser." },
        ],
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
        body: "The content is the innermost layer of the box model. It holds your text, images, or other elements. Its size is controlled by the width and height properties.\n\nUse the sliders on the right to adjust the width and height. Watch how the blue content area grows and shrinks in the visualization.",
        docLinks: [
          { label: "width", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/width", type: "css-property" },
          { label: "height", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/height", type: "css-property" },
        ],
        infoBoxes: [
          { variant: "tip", body: "Width and height only set the content area by default. The total space the element takes up also includes padding, border, and margin — you'll learn about those next." },
        ],
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
        body: "Time to practice! Use the sliders to set the content to exactly 300px wide and 150px tall. The target values panel below will turn green when you match each value.",
        docLinks: [
          { label: "width", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/width", type: "css-property" },
          { label: "height", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/height", type: "css-property" },
        ],
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
