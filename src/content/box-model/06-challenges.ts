import type { Lesson } from "@/types/lesson";

const defaultSides = { top: 0, right: 0, bottom: 0, left: 0 };

export const lesson: Lesson = {
  id: "box-model-challenges",
  slug: "challenges",
  title: "Box Model Challenges",
  description: "Test your understanding by matching target box models.",
  order: 6,
  steps: [
    {
      id: "challenge-1",
      type: "challenge",
      instruction: {
        heading: "Challenge 1: Spacious padding",
        body: "Create a box with generous internal spacing. Your target:\n\n• Content size: 250px wide, 120px tall\n• Padding: 40px on all four sides\n\nThis amount of padding is typical for hero sections and large call-to-action cards.",
        docLinks: [
          { label: "padding", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/padding", type: "css-property" },
          { label: "width", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/width", type: "css-property" },
          { label: "height", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/height", type: "css-property" },
        ],
        infoBoxes: [
          { variant: "tip", body: "When all four sides have the same value, you can use the shorthand padding: 40px instead of setting each side individually." },
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
          contentWidth: 250,
          contentHeight: 120,
          padding: { top: 40, right: 40, bottom: 40, left: 40 },
          border: defaultSides,
          margin: defaultSides,
          boxSizing: "content-box",
        },
        tolerance: 5,
        lockedProperties: ["border", "margin", "boxSizing"],
      },
      validation: { type: "values-match", criteria: {} },
      hints: ["Set width to 250 and height to 120.", "Set all padding values to 40."],
    },
    {
      id: "challenge-2",
      type: "challenge",
      instruction: {
        heading: "Challenge 2: Full box model",
        body: "Now use all four layers at once. Your target:\n\n• Content: 180px wide, 90px tall\n• Padding: 15px on all sides\n• Border: 4px on all sides\n• Margin: 25px on all sides\n\nWork from the inside out — set the content size first, then add each layer.",
        docLinks: [
          { label: "padding", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/padding", type: "css-property" },
          { label: "border", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/border", type: "css-property" },
          { label: "margin", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/margin", type: "css-property" },
        ],
        infoBoxes: [
          { variant: "tip", body: "Reading a box model from inside out: content, then padding, then border, then margin. The browser computes each layer in this order." },
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
          contentWidth: 180,
          contentHeight: 90,
          padding: { top: 15, right: 15, bottom: 15, left: 15 },
          border: { top: 4, right: 4, bottom: 4, left: 4 },
          margin: { top: 25, right: 25, bottom: 25, left: 25 },
          boxSizing: "content-box",
        },
        tolerance: 3,
        lockedProperties: ["boxSizing"],
      },
      validation: { type: "values-match", criteria: {} },
      hints: [
        "Start with content: 180 wide, 90 tall.",
        "Then padding: 15 on all sides.",
        "Border: 4 on all sides.",
        "Margin: 25 on all sides.",
      ],
    },
    {
      id: "challenge-3",
      type: "challenge",
      instruction: {
        heading: "Challenge 3: Asymmetric box",
        body: "Real-world elements rarely have the same value on all sides. Build a box with different values per side:\n\n• Content: 200px wide, 100px tall\n• Padding: 30px top/bottom, 10px left/right\n• Border: 2px on all sides\n• Margin: 20px on top only, 0px everywhere else\n\nThis pattern is common for list items that need vertical separation but sit flush against the container edges.",
        docLinks: [
          { label: "padding", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/padding", type: "css-property" },
          { label: "border", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/border", type: "css-property" },
          { label: "margin", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/margin", type: "css-property" },
        ],
        infoBoxes: [
          { variant: "tip", body: "CSS shorthand for different vertical/horizontal values: padding: 30px 10px sets top/bottom to 30px and left/right to 10px." },
        ],
      },
      config: {
        type: "challenge",
        initialValues: {
          contentWidth: 150,
          contentHeight: 80,
          padding: defaultSides,
          border: defaultSides,
          margin: defaultSides,
          boxSizing: "content-box",
        },
        targetValues: {
          contentWidth: 200,
          contentHeight: 100,
          padding: { top: 30, right: 10, bottom: 30, left: 10 },
          border: { top: 2, right: 2, bottom: 2, left: 2 },
          margin: { top: 20, right: 0, bottom: 0, left: 0 },
          boxSizing: "content-box",
        },
        tolerance: 3,
        lockedProperties: ["boxSizing"],
      },
      validation: { type: "values-match", criteria: {} },
      hints: [
        "Content: 200 wide, 100 tall.",
        "Padding: 30 top/bottom, 10 left/right.",
        "Border: 2 on all sides.",
        "Margin: only 20 on top, 0 everywhere else.",
      ],
    },
  ],
};
