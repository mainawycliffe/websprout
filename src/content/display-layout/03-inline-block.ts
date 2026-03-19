import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "display-layout-inline-block",
  slug: "inline-block",
  title: "Inline-Block",
  description:
    "The best of both worlds — elements that flow inline but respect width and height.",
  order: 3,
  steps: [
    {
      id: "why-inline-block",
      type: "explanation",
      instruction: {
        heading: "Why inline-block exists",
        body: "You've learned that inline elements ignore width and height, and block elements always break to a new line. But what if you need both — an element with a fixed size that still sits next to its neighbors? That's exactly the problem display: inline-block solves. It gives you the sizing power of block elements with the flow behavior of inline elements. You'll see it used for navigation tabs on GitHub, pill-shaped tags on blog posts, and buttons that sit side-by-side.",
        analogy:
          "Think of photo frames on a shelf. Each frame has a fixed width and height (like a block element), but they sit next to each other on the shelf (like inline elements). If you add too many frames, they wrap to the next shelf — just like inline-block elements wrap to the next line.",
        docLinks: [
          {
            label: "display: inline-block",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/display",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "inline-block was the go-to tool for horizontal layouts before flexbox existed. You'll still see it in older codebases and it remains useful for small UI elements like buttons, badges, and navigation pills.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "Inline-block elements have a quirk: the browser adds a small space between them (about 4px) because it treats the whitespace in your HTML as a text space. This catches many beginners off guard. You'll notice it when elements don't quite fit where you expect.",
          },
        ],
      },
      config: {
        type: "explanation",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "inline-block-in-action",
      type: "explanation",
      instruction: {
        heading: "Inline-block in action",
        body: "These <span> elements now have fixed dimensions and sit side-by-side — like navigation pills you'd see on a real website. This works because display: inline-block lets them respect width and height (which plain inline ignores) while still flowing horizontally (which plain block doesn't do). Try mentally removing display: inline-block — the spans would collapse to just fit their text. Change it to display: block and each pill would take its own full-width line.",
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  .pill {\n    display: inline-block;\n    width: 120px;\n    height: 40px;\n    line-height: 40px;\n    text-align: center;\n    background: #8B5CF6;\n    color: white;\n    border-radius: 20px;\n    margin: 4px;\n  }\n</style>\n<span class="pill">Home</span>\n<span class="pill">About</span>\n<span class="pill">Contact</span>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "set-the-display",
      type: "gap-fill",
      instruction: {
        heading: "Set the display",
        body: "What display value lets an element have a fixed size while still sitting next to its neighbors? Fill in the blank to make these navigation links behave as inline-block elements.",
      },
      config: {
        type: "gap-fill",
        template:
          ".nav-link {\n  display: {{display_value}};\n  width: 100px;\n  height: 36px;\n}",
        gaps: [
          {
            id: "display_value",
            placeholder: "display value",
            acceptedAnswers: ["inline-block"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "It's a combination of two display types you already know.",
        "The answer is 'inline-block'.",
      ],
    },
    {
      id: "build-nav-pills",
      type: "free-edit",
      instruction: {
        heading: "Build navigation pills",
        body: "Style the navigation links below as inline-block pills. Give them a fixed size, background color, rounded corners, and make sure they sit side-by-side. This is a pattern you'll see on countless websites — from GitHub's tab navigation to blog category tags.",
      },
      config: {
        type: "free-edit",
        starterCode:
          '<nav>\n  <a href="#" class="nav-pill">Home</a>\n  <a href="#" class="nav-pill">Blog</a>\n  <a href="#" class="nav-pill">About</a>\n</nav>\n\n<style>\n.nav-pill {\n  /* Add your styles here */\n}\n</style>',
        language: "both",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "inline-block" },
      },
      hints: [
        "Set display: inline-block; so the links respect width and height.",
        "Try adding: display: inline-block; padding: 8px 16px; background: #3B82F6; color: white; border-radius: 16px; text-decoration: none;",
      ],
    },
  ],
};
