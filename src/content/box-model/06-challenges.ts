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
        body: "Create a box that is 250px wide, 120px tall, with 40px padding on all sides.",
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
        body: "Build a box with: content 180x90, padding 15px all around, border 4px all around, margin 25px all around.",
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
        body: "Build a box with: content 200x100, padding 30px top/bottom and 10px left/right, border 2px all around, margin 20px top and 0px everywhere else.",
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
