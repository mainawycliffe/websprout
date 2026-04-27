import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "css-backgrounds-capstone",
  slug: "capstone",
  title: "Capstone: A Real Hero Section",
  description:
    "Stack everything you have learned — photo, gradient overlay, sizing, positioning — into a hero section you would actually ship.",
  order: 9,
  steps: [
    {
      id: "capstone-brief",
      type: "explanation",
      instruction: {
        heading: "The brief",
        body: "<p>You are building the top section of a homepage for an imaginary brand called <strong>Mboga Direct</strong> — a market-to-door grocery service. The hero must:</p><ol><li>Show a recognisable photo behind it (use Picsum with seed <code>market</code>).</li><li>Have a dark translucent overlay so the white text stays readable.</li><li>Show a heading and a tagline, centred horizontally.</li><li>Be at least 320 pixels tall.</li></ol><p>Use what you learned: layered <code>background-image</code>, <code>background-size: cover</code>, <code>background-position: center</code>, and an <code>rgba()</code> overlay. The next step is the editor.</p>",
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "capstone-build",
      type: "free-edit",
      instruction: {
        heading: "Build the hero",
        body: "<p>Open the editor and finish the <code>.hero</code> rule. Test as you go — the preview updates after each save.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "If your text is hard to read, increase the alpha on the gradient overlay (try <code>0.6</code>). If the photo is the wrong part, change <code>background-position</code>.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          '<style>\n  body { margin: 0; font-family: system-ui, sans-serif; }\n  .hero {\n    min-height: 320px;\n    color: white;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    text-align: center;\n    padding: 32px 16px;\n    /* Add a layered background here:\n       linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)),\n       url(\'https://picsum.photos/seed/market/1200/600\')\n       Then size: cover, position: center, repeat: no-repeat. */\n  }\n  .hero h1 { margin: 0 0 8px; font-size: 36px; }\n  .hero p  { margin: 0; font-size: 18px; opacity: 0.9; }\n</style>\n<section class="hero">\n  <h1>Mboga Direct</h1>\n  <p>Fresh produce delivered from the market to your door.</p>\n</section>',
        language: "both",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "linear-gradient" },
      },
      hints: [
        "Inside .hero add: background-image: linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://picsum.photos/seed/market/1200/600');",
        "Then add background-size: cover; background-position: center; background-repeat: no-repeat;",
        "Or do it all in one line with the background shorthand.",
      ],
    },
    {
      id: "capstone-recap",
      type: "explanation",
      instruction: {
        heading: "What you just built",
        body: "<p>You combined four ideas into one block of CSS:</p><ol><li>A photo as a background image with <code>url()</code>.</li><li>A second background image (a gradient) layered on top to darken the photo.</li><li><code>background-size: cover</code> + <code>background-position: center</code> so the photo always fills the box, no matter the screen size.</li><li><code>rgba()</code> for a translucent overlay that makes white text legible.</li></ol><p>This is a pattern you will reach for again and again. Most landing-page heroes on the modern web are some form of this exact stack.</p>",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Always check that text on top of a hero meets WCAG AA contrast (4.5:1 for normal text). Tools like the Chrome DevTools accessibility panel will compute this for you.",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
