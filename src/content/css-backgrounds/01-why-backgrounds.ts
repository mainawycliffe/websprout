import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "css-backgrounds-why",
  slug: "why-backgrounds",
  title: "Why Backgrounds Matter",
  description:
    "Backgrounds are how a flat web page becomes a recognisable brand. See why every site you visit puts effort into the layer behind the text.",
  order: 1,
  steps: [
    {
      id: "why-backgrounds-intro",
      type: "explanation",
      instruction: {
        heading: "The layer behind the words",
        body: "<p>A page with no background is a sheet of white paper with text on it. Add a background and that same content suddenly feels like Spotify, Stripe, or your bank. Backgrounds carry brand, set mood, and guide the eye toward the parts of the page that matter.</p><p>CSS gives you four ways to fill the space behind an element: a flat <code>background-color</code>, an image with <code>background-image</code>, a generated gradient (also via <code>background-image</code>), or several of these stacked together. The browser treats every element as a rectangle that has a paintable background — even if you have not painted one yet.</p>",
        analogy:
          "Think about restaurant menus. The food can be identical, but a printed menu on cheap white paper feels different from one with a deep navy background and gold accents. The words have not changed — the surface behind them has.",
        docLinks: [
          {
            label: "MDN: background",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/background",
            type: "css-property",
          },
          {
            label: "MDN: background-color",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/background-color",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Every element has a background by default — it is just transparent. That means a child's background can show the parent's background through it, which is how overlay tricks work later in this module.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  body { margin: 0; font-family: system-ui, sans-serif; }\n  .hero {\n    background-color: #0f172a;\n    color: white;\n    padding: 48px 24px;\n    text-align: center;\n  }\n  .hero h1 { margin: 0 0 8px; font-size: 28px; }\n  .hero p  { margin: 0; opacity: 0.8; }\n</style>\n<section class="hero">\n  <h1>Welcome to Mboga Direct</h1>\n  <p>Fresh produce delivered from the market to your door.</p>\n</section>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "why-real-world",
      type: "explanation",
      instruction: {
        heading: "Where you have seen this already",
        body: "<p>Look at sites you use every day:</p><ul><li><strong>Spotify</strong> uses gradient album covers as page backgrounds — the colour matches the music.</li><li><strong>Stripe</strong> ships gradient cards on its product pages, so each product has its own visual identity.</li><li><strong>YouTube Premium</strong> has a deep red gradient hero that immediately signals the brand.</li><li><strong>Bank statements online</strong> use subtle pale backgrounds for alternating rows so your eye does not get lost.</li></ul><p>None of these are decoration for decoration's sake. Each background does a real job: orienting you, setting tone, separating sections, or making text readable.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Before reaching for a fancy gradient, ask: <em>what job does this background do?</em> Brand? Hierarchy? Mood? Readability? A clear answer leads to clearer design.",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "why-roadmap",
      type: "explanation",
      instruction: {
        heading: "What is coming up",
        body: "<p>In this module you will learn to:</p><ol><li>Add an image to the background of any element.</li><li>Control how that image fills the space — cover, contain, repeat or not.</li><li>Generate gradients with <code>linear-gradient()</code>, <code>radial-gradient()</code>, and <code>conic-gradient()</code>.</li><li>Stack multiple backgrounds for hero overlays.</li><li>Read and write the <code>background</code> shorthand — the form you will see most often in real codebases.</li></ol><p>By the capstone, you will build a full hero section: a photo with a dark gradient overlay and centred white text. By the codelab, you will ship a pricing card with gradient buttons.</p>",
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
