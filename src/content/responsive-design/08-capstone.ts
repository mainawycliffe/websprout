import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "responsive-design-capstone",
  slug: "capstone",
  title: "Build a Responsive Landing Page",
  description:
    "Combine viewport meta, relative units, media queries, responsive images, and fluid typography into one complete page.",
  order: 8,
  steps: [
    {
      id: "what-were-building",
      type: "explanation",
      instruction: {
        heading: "What we're building",
        body: "In this capstone, you'll combine every responsive technique from this module into a single project: a responsive landing page for a fictional product. The page has five sections:\n\n<ol><li>A full-screen hero section with a fluid heading, subtext, and a call-to-action button.</li><li>A features grid that shows 1 column on mobile, 2 on tablet, and 3 on desktop.</li><li>A testimonial section with a responsive image and quote.</li><li>A pricing section with side-by-side cards on desktop that stack on mobile.</li><li>A footer with responsive navigation links.</li></ol>\n\nThis mirrors real landing pages you see everywhere — Stripe's homepage has a hero + features grid + pricing. Notion's landing page has a hero + feature sections + testimonials. Every startup, product, and portfolio site follows this same responsive pattern. The techniques you'll use are: the viewport meta tag (so mobile renders correctly), fluid typography with clamp() (so headings scale smoothly), relative units for spacing and widths (so the layout adapts), media queries for layout breakpoints (so columns reflow), and responsive images (so they scale without overflow).\n\nYou'll write the full HTML and CSS using the mobile-first approach: start with the mobile layout, then add media queries for larger screens.",
        docLinks: [
          {
            label: "MDN: Responsive design",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Real-world landing pages like Stripe, Notion, and Linear use exactly these techniques: a viewport meta tag, clamp()-based typography, CSS Grid for feature sections, and mobile-first media queries. You're building with the same tools the pros use.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Responsive Landing Page</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <header class="hero">\n    <h1>Build Faster</h1>\n    <p>The modern tool for modern teams.</p>\n    <a href="#" class="cta-button">Get Started</a>\n  </header>\n\n  <section class="features">\n    <h2>Features</h2>\n    <div class="features-grid">\n      <div class="feature-card">Fast</div>\n      <div class="feature-card">Secure</div>\n      <div class="feature-card">Simple</div>\n    </div>\n  </section>\n\n  <section class="testimonial">\n    <img src="avatar.jpg" alt="Customer" class="testimonial-img">\n    <blockquote>"This changed everything."</blockquote>\n  </section>\n\n  <section class="pricing">\n    <div class="price-card">Free</div>\n    <div class="price-card">Pro - $9/mo</div>\n  </section>\n\n  <footer>\n    <nav class="footer-nav">\n      <a href="#">About</a>\n      <a href="#">Contact</a>\n      <a href="#">Privacy</a>\n    </nav>\n  </footer>\n</body>\n</html>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "hero-section",
      type: "gap-fill",
      instruction: {
        heading: "Style the hero section",
        body: "The hero section should be a full-viewport-height centered layout with fluid typography. Complete the CSS below. Use 100vh for the full-screen effect, flexbox to center content, and clamp() for the heading size.",
        docLinks: [
          {
            label: "MDN: clamp()",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/clamp",
            type: "css-concept",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template:
          ".hero {\n  height: {{height}};\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  padding: 2rem;\n  background: #1E293B;\n  color: white;\n}\n\n.hero h1 {\n  font-size: {{font_size}};\n  margin-bottom: 1rem;\n}",
        gaps: [
          {
            id: "height",
            placeholder: "full viewport height",
            acceptedAnswers: ["100vh", "100dvh"],
            caseSensitive: false,
          },
          {
            id: "font_size",
            placeholder: "fluid font size",
            acceptedAnswers: [
              "clamp(2rem, 5vw + 1rem, 4rem)",
              "clamp(2rem, 4vw + 1rem, 3.5rem)",
              "clamp(1.5rem, 4vw + 1rem, 3rem)",
              "clamp(2rem, 5vw, 4rem)",
              "clamp(2rem, 4vw + 0.5rem, 3.5rem)",
            ],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "Use 100vh to make the hero fill the entire browser window.",
        "Use clamp() with a rem minimum, a vw-based preferred value, and a rem maximum.",
        "Example: clamp(2rem, 5vw + 1rem, 4rem)",
      ],
    },
    {
      id: "features-grid",
      type: "gap-fill",
      instruction: {
        heading: "Build the responsive features grid",
        body: "The features grid starts as a single column on mobile. At 768px, it becomes a 3-column layout. Complete the mobile-first CSS using CSS Grid and a min-width media query.",
      },
      config: {
        type: "gap-fill",
        template:
          ".features-grid {\n  display: {{display}};\n  grid-template-columns: 1fr;\n  gap: 1.5rem;\n  padding: 2rem;\n}\n\n@media ({{query}}: 768px) {\n  .features-grid {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}",
        gaps: [
          {
            id: "display",
            placeholder: "display value",
            acceptedAnswers: ["grid"],
            caseSensitive: true,
          },
          {
            id: "query",
            placeholder: "query type",
            acceptedAnswers: ["min-width"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "A grid layout uses display: grid.",
        "Mobile-first queries use min-width to add styles for larger screens.",
      ],
    },
    {
      id: "responsive-testimonial",
      type: "gap-fill",
      instruction: {
        heading: "Responsive testimonial image",
        body: "The testimonial section has a customer photo. Make it responsive so it never overflows its container, and use object-fit to keep the image from distorting when constrained to a circle.",
      },
      config: {
        type: "gap-fill",
        template:
          ".testimonial-img {\n  {{max_width_prop}}: 100%;\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  object-fit: {{fit}};\n}",
        gaps: [
          {
            id: "max_width_prop",
            placeholder: "property",
            acceptedAnswers: ["max-width"],
            caseSensitive: true,
          },
          {
            id: "fit",
            placeholder: "object-fit value",
            acceptedAnswers: ["cover"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "Use max-width to prevent overflow.",
        "object-fit: cover fills the circle without distorting the image.",
      ],
    },
    {
      id: "pricing-layout",
      type: "free-edit",
      instruction: {
        heading: "Complete the pricing section",
        body: "Write the full CSS for the pricing section. On mobile, the price cards should stack vertically. At 768px, they should sit side by side. Use flexbox with mobile-first min-width media queries. Style the cards with padding, background, and rounded corners. Make the CTA button in the hero responsive too — full width on mobile, auto width on desktop.",
        docLinks: [
          {
            label: "MDN: Flexbox",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "For the pricing cards, use flex: 1 so each card takes equal width on desktop. On mobile (the base styles), each card is naturally full width because flex-direction: column makes each item take the full container width.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          "/* Pricing section — mobile first */\n.pricing {\n  /* Stack cards vertically on mobile */\n  padding: 2rem;\n}\n\n.price-card {\n  padding: 2rem;\n  background: #F8FAFC;\n  border-radius: 12px;\n  text-align: center;\n  margin-bottom: 1rem;\n}\n\n/* CTA button */\n.cta-button {\n  display: inline-block;\n  padding: 0.75rem 2rem;\n  background: #3B82F6;\n  color: white;\n  border-radius: 8px;\n  text-decoration: none;\n  font-size: clamp(1rem, 1.5vw + 0.5rem, 1.25rem);\n}\n\n/* Add media query for tablet+ layout */\n",
        language: "css",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "min-width" },
      },
      hints: [
        "Set .pricing to display: flex and flex-direction: column for mobile.",
        "In a @media (min-width: 768px) query, change flex-direction to row and add gap.",
        "Give .price-card a flex: 1 inside the media query so they share space equally.",
      ],
    },
    {
      id: "full-page-assembly",
      type: "free-edit",
      instruction: {
        heading: "Assemble the complete page",
        body: "Write the complete CSS for the responsive landing page. Include: a global reset (img { max-width: 100%; height: auto; }), the full-screen hero with fluid typography, the responsive features grid, the testimonial with a circular responsive image, the pricing section that reflows, and a footer with responsive navigation. Use mobile-first media queries throughout. This is everything from the module in one stylesheet!",
        docLinks: [
          {
            label: "MDN: Responsive design",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "This landing page uses only standard CSS — no frameworks, no preprocessors, no JavaScript. Viewport meta + fluid units + media queries + responsive images are the complete responsive toolkit defined in web standards. Every modern website is built on these fundamentals.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "Build section by section: start with the global reset and body styles, then hero, then features grid, then testimonial, then pricing, then footer. Test each section before moving on. It's much easier to debug one section at a time than to write everything and then figure out what went wrong.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          "/* === Global Reset === */\n* { margin: 0; padding: 0; box-sizing: border-box; }\nimg { max-width: 100%; height: auto; }\nbody { font-family: system-ui, sans-serif; color: #1E293B; }\n\n/* === Hero === */\n.hero {\n  /* Full-screen, centered, dark background */\n}\n.hero h1 {\n  /* Fluid heading */\n}\n\n/* === Features Grid === */\n.features { padding: 3rem 1.5rem; text-align: center; }\n.features h2 { font-size: clamp(1.5rem, 3vw + 0.5rem, 2.5rem); margin-bottom: 2rem; }\n.features-grid {\n  /* Grid: 1 col mobile, 3 col desktop */\n}\n.feature-card {\n  padding: 1.5rem;\n  background: #F1F5F9;\n  border-radius: 12px;\n}\n\n/* === Testimonial === */\n.testimonial {\n  /* Centered layout */\n}\n\n/* === Pricing === */\n.pricing {\n  /* Stack on mobile, row on desktop */\n}\n.price-card {\n  padding: 2rem;\n  background: #F8FAFC;\n  border-radius: 12px;\n  text-align: center;\n}\n\n/* === Footer === */\nfooter {\n  padding: 2rem;\n  background: #1E293B;\n  color: white;\n  text-align: center;\n}\n.footer-nav a {\n  color: #94A3B8;\n  text-decoration: none;\n  margin: 0 0.5rem;\n}\n\n/* === Media Queries === */\n/* Add your responsive breakpoints here */\n",
        language: "css",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "grid-template-columns" },
      },
      hints: [
        "Hero: height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;",
        "Hero h1: font-size: clamp(2rem, 5vw + 1rem, 4rem);",
        "Features grid: display: grid; grid-template-columns: 1fr; gap: 1.5rem;",
        "@media (min-width: 768px) { .features-grid { grid-template-columns: repeat(3, 1fr); } }",
        "Pricing: display: flex; flex-direction: column; gap: 1rem; then flex-direction: row at 768px.",
      ],
    },
  ],
};
