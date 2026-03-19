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
        body: "Padding is the space between the content and the border. It exists so content doesn't press right up against the edges — imagine a button on Amazon where the text \"Add to Cart\" is crammed against the edge with no room to read it.\n\nYou can set padding independently for each side: top, right, bottom, and left. In the box model, padding is the green layer that wraps around the blue content.",
        analogy: "Padding is like the foam inside a shipping box. It protects the contents by creating space between them and the box walls.",
        docLinks: [
          { label: "padding", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/padding", type: "css-property" },
        ],
        infoBoxes: [
          { variant: "standard", body: "Padding contributes to the element's background area — background colors and images extend through the padding, not just the content." },
        ],
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
        body: "Use the padding sliders on the right to adjust each side independently. Watch how the green padding layer grows around the blue content in the visualization.\n\nTry making the top and bottom padding different from the left and right — this is a common pattern for buttons and cards.",
        docLinks: [
          { label: "padding", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/padding", type: "css-property" },
        ],
        infoBoxes: [
          { variant: "tip", body: "On mobile, generous padding on buttons (at least 8px) makes them easier to tap. This is an accessibility best practice — Apple and Google both recommend minimum 44px tap targets." },
        ],
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
        body: "Now try matching a specific padding layout. Your target:\n\n• Top and bottom padding: 30px\n• Left and right padding: 20px\n\nThis asymmetric pattern is common in card headers where you want more vertical breathing room than horizontal.",
        docLinks: [
          { label: "padding", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/padding", type: "css-property" },
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
