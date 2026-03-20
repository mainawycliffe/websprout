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
        body: "Margin is the outermost layer of the box model. It creates space between one element and its neighbors — the spacing between paragraphs on Wikipedia, or the gaps between movie cards on Netflix. Without margin, every element would press right against its neighbors.\n\nUnlike padding and border, margin is always transparent. You can't see it, but it pushes other elements away. In our visualization, margin is the orange layer.",
        analogy: "Margin is like your personal space bubble. You can't see it, but it keeps other people at a comfortable distance.",
        docLinks: [
          { label: "margin", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/margin", type: "css-property" },
        ],
        infoBoxes: [
          { variant: "standard", body: "Vertical margins between adjacent block elements collapse — only the larger margin is used. This is called margin collapsing and is one of the most surprising CSS behaviors for beginners." },
        ],
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
        body: "Use the margin sliders on the right to adjust the space outside the border. The orange layer in the visualization shows exactly how much margin surrounds the element.\n\nTry increasing only the top margin to 40px while keeping the others at 20px — this pushes the element down from whatever is above it.",
        docLinks: [
          { label: "margin", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/margin", type: "css-property" },
        ],
        infoBoxes: [
          { variant: "tip", body: "Use margin: 0 auto to horizontally center a block element. This is how most centered page layouts work on the web — including sites like GitHub and Medium." },
        ],
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
        body: "All four layers are now unlocked. Experiment freely and watch the total size (shown at the top of the visualization) update as you adjust each layer.\n\nTry this: keep the content at 150x80, then add 20px padding, 3px border, and 15px margin. Notice how each layer adds to the total size. This is how the browser calculates space for every element on a page.",
        docLinks: [
          { label: "CSS Box Model", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model", type: "css-concept" },
          { label: "padding", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/padding", type: "css-property" },
          { label: "border", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/border", type: "css-property" },
          { label: "margin", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/margin", type: "css-property" },
        ],
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
