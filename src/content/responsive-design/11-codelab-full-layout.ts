import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "responsive-design-codelab-full-layout",
  slug: "codelab-full-layout",
  title: "Codelab: Full Responsive Page Layout",
  description:
    "Build a complete multi-section responsive page with a hero, feature cards, testimonials, and footer — mobile-first.",
  order: 11,
  steps: [
    {
      id: "codelab-layout-setup",
      type: "explanation",
      instruction: {
        heading: "Set up your project",
        body: `This is the most ambitious codelab in the module. You'll build a complete, multi-section responsive page from scratch — the kind of page a freelancer would deliver to a client or a startup would use as their homepage. By the end, you'll have a real, functional website that works beautifully on phones, tablets, and desktops.

The page has six sections:
<ol><li>A responsive navigation bar (from the previous codelab, simplified)</li><li>A full-screen hero section with fluid typography</li><li>A features section with a responsive grid of cards</li><li>A testimonials section with responsive images</li><li>A call-to-action (CTA) banner</li><li>A responsive footer with multi-column links</li></ol>

Open a terminal (Ctrl + Alt + T) and run:

<ul><li>mkdir ~/responsive-page — Creates the project folder.</li><li>cd ~/responsive-page — Moves into it.</li><li>touch index.html style.css — Creates the HTML and CSS files.</li><li>code . — Opens VS Code.</li></ul>

This codelab is longer than the previous ones because we're building a full page. Take it section by section — don't try to write everything at once. After each step, save and preview in the browser to see your progress.`,
        infoBoxes: [
          {
            variant: "tip",
            body: "Keep your browser open side by side with VS Code. Every time you save (Ctrl+S), switch to the browser and refresh (Ctrl+R). This rapid feedback loop is how professional developers work — you should be refreshing your browser dozens of times per session.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `mkdir ~/responsive-page
cd ~/responsive-page
touch index.html style.css
code .`,
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Open a terminal with Ctrl+Alt+T.",
        "Type each command and press Enter.",
      ],
    },
    {
      id: "codelab-layout-html",
      type: "explanation",
      instruction: {
        heading: "Write the complete HTML",
        body: `Click on index.html and type the following HTML. This is the complete structure for the entire page. Don't worry if it looks like a lot — each section is simple, and you've already learned every concept used here.

Key things to notice:

<ul><li>The viewport meta tag is in the <head> — essential for mobile responsiveness.</li><li>The navigation uses a simplified structure (no hamburger for this codelab — we focus on the page layout).</li><li>The hero uses semantic elements: <header> for the top section, <h1> for the main heading.</li><li>The features section uses a <section> element with a heading and a grid of cards.</li><li>Testimonials use <blockquote> for semantic quotes and placeholder images from picsum.photos.</li><li>The footer uses <footer> with multiple <div> columns for link groups.</li><li>We use placeholder images from picsum.photos — a free service that returns random photos at whatever dimensions you specify in the URL.</li></ul>

Save with Ctrl + S and open in your browser with xdg-open index.html. You'll see raw, unstyled HTML — headings, text, images, and links all stacked in default browser styling. It's readable but ugly. The CSS we add next will transform it into a polished, responsive page.`,
        docLinks: [
          {
            label: "MDN: <section> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section",
            type: "html-element",
          },
          {
            label: "MDN: <blockquote> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote",
            type: "html-element",
          },
          {
            label: "MDN: <footer> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            body: "Using semantic HTML elements (<header>, <nav>, <main>, <section>, <footer>) instead of generic <div> elements is important for accessibility. Screen readers announce these landmarks, helping users navigate the page. Search engines also use semantic markup to understand page structure.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Responsive Page Layout</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Navigation -->
  <nav class="navbar">
    <a href="#" class="logo">Acme Co</a>
    <ul class="nav-links">
      <li><a href="#features">Features</a></li>
      <li><a href="#testimonials">Testimonials</a></li>
      <li><a href="#cta">Pricing</a></li>
      <li><a href="#" class="nav-btn">Sign Up</a></li>
    </ul>
  </nav>

  <!-- Hero Section -->
  <header class="hero" id="hero">
    <h1>Build something amazing</h1>
    <p class="hero-sub">
      The all-in-one platform that helps teams
      ship faster, collaborate better, and grow.
    </p>
    <div class="hero-buttons">
      <a href="#" class="btn btn-primary">Get Started Free</a>
      <a href="#" class="btn btn-secondary">Watch Demo</a>
    </div>
  </header>

  <!-- Features Section -->
  <section class="features" id="features">
    <h2>Everything you need</h2>
    <p class="section-subtitle">
      Powerful tools that grow with your team.
    </p>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">&#9889;</div>
        <h3>Lightning Fast</h3>
        <p>Built for speed. Pages load in under
           100ms with our global edge network.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">&#128274;</div>
        <h3>Secure by Default</h3>
        <p>Enterprise-grade security with automatic
           encryption and compliance built in.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">&#128200;</div>
        <h3>Real-time Analytics</h3>
        <p>Track every metric that matters with
           beautiful, live dashboards.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">&#129309;</div>
        <h3>Team Collaboration</h3>
        <p>Work together seamlessly with shared
           workspaces and instant sync.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">&#127912;</div>
        <h3>Customizable</h3>
        <p>Make it yours with themes, plugins,
           and a powerful API.</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">&#128640;</div>
        <h3>One-click Deploy</h3>
        <p>Ship to production with a single click.
           Rollbacks included.</p>
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="testimonials" id="testimonials">
    <h2>Loved by teams everywhere</h2>
    <div class="testimonial-grid">
      <div class="testimonial-card">
        <img src="https://picsum.photos/seed/person1/100/100"
             alt="Sarah Chen" class="testimonial-img">
        <blockquote>
          "Acme Co transformed how our team works.
           We shipped 3x faster in the first month."
        </blockquote>
        <cite>Sarah Chen, CTO at Startup</cite>
      </div>
      <div class="testimonial-card">
        <img src="https://picsum.photos/seed/person2/100/100"
             alt="Marcus Johnson" class="testimonial-img">
        <blockquote>
          "The analytics alone are worth it.
           We finally understand our users."
        </blockquote>
        <cite>Marcus Johnson, PM at BigCorp</cite>
      </div>
      <div class="testimonial-card">
        <img src="https://picsum.photos/seed/person3/100/100"
             alt="Priya Patel" class="testimonial-img">
        <blockquote>
          "Setup took 5 minutes. Migration from
           our old tool was seamless."
        </blockquote>
        <cite>Priya Patel, Eng Lead at Agency</cite>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="cta" id="cta">
    <h2>Ready to get started?</h2>
    <p>Join 10,000+ teams already using Acme Co.</p>
    <a href="#" class="btn btn-primary btn-large">
      Start Free Trial
    </a>
  </section>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="footer-grid">
      <div class="footer-col">
        <h4>Product</h4>
        <a href="#">Features</a>
        <a href="#">Pricing</a>
        <a href="#">Changelog</a>
        <a href="#">Docs</a>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <a href="#">About</a>
        <a href="#">Blog</a>
        <a href="#">Careers</a>
        <a href="#">Press</a>
      </div>
      <div class="footer-col">
        <h4>Support</h4>
        <a href="#">Help Center</a>
        <a href="#">Contact</a>
        <a href="#">Status</a>
        <a href="#">Community</a>
      </div>
      <div class="footer-col">
        <h4>Legal</h4>
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Cookies</a>
        <a href="#">Licenses</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Acme Co. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>`,
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "This is a long file — take your time typing it or copy-paste it.",
        "Save with Ctrl+S and preview in the browser to see the unstyled page.",
      ],
    },
    {
      id: "codelab-layout-base-css",
      type: "explanation",
      instruction: {
        heading: "Add the mobile-first base CSS",
        body: `Now for the CSS. Click on style.css and add the following. This is the mobile-first base — every rule here defines how the page looks on the smallest screens. We'll add media queries for larger screens in the next step.

The CSS is organized in the same order as the HTML sections (navbar, hero, features, testimonials, CTA, footer). This top-to-bottom organization mirrors the page flow and makes it easy to find any rule.

Key techniques used:

<ul><li>Global reset with box-sizing: border-box — makes responsive sizing predictable.</li><li>img { max-width: 100%; height: auto; } — the universal responsive image rule.</li><li>Fluid typography with clamp() on all headings — smooth scaling with minimum and maximum bounds.</li><li>Relative units (rem, %) for spacing and sizing — scales with user preferences.</li><li>Flexbox for centering (hero) and aligning items (navbar, buttons).</li><li>CSS Grid for the features and testimonials cards — starts as 1 column on mobile.</li><li>Mobile-optimized layouts — everything stacks vertically, full-width buttons, centered text.</li></ul>

Save and refresh. The page should look good on a phone-sized window — clean, readable, and properly spaced. Everything stacks vertically, images are contained, and text is sized well.`,
        docLinks: [
          {
            label: "MDN: box-sizing",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            body: "This is a lot of CSS, but every rule serves a purpose. Read through each section and connect it to the HTML it styles. If you're unsure what a rule does, try commenting it out (wrap it in /* ... */) and refreshing — seeing what breaks helps you understand what the rule was doing.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `/* === Global Reset === */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

img {
  max-width: 100%;
  height: auto;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  color: #1E293B;
  line-height: 1.6;
}

a {
  text-decoration: none;
  color: inherit;
}

/* === Navbar === */
.navbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: white;
  border-bottom: 1px solid #E2E8F0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  font-size: 1.25rem;
  font-weight: 800;
  color: #3B82F6;
}

.nav-links {
  display: none;
  list-style: none;
  width: 100%;
  flex-direction: column;
  padding-top: 1rem;
}

.nav-links li a {
  display: block;
  padding: 0.5rem 0;
  color: #64748B;
}

.nav-btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #3B82F6;
  color: white !important;
  border-radius: 6px;
  margin-top: 0.5rem;
}

/* === Hero === */
.hero {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 1.5rem;
  background: linear-gradient(135deg, #1E293B 0%, #334155 100%);
  color: white;
}

.hero h1 {
  font-size: clamp(2rem, 5vw + 0.5rem, 3.75rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;
}

.hero-sub {
  font-size: clamp(1rem, 1.5vw + 0.5rem, 1.25rem);
  color: #94A3B8;
  max-width: 600px;
  margin-bottom: 2rem;
}

.hero-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  max-width: 300px;
}

/* === Buttons === */
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  transition: background 0.2s ease, transform 0.2s ease;
}

.btn-primary {
  background: #3B82F6;
  color: white;
}

.btn-primary:hover {
  background: #2563EB;
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid #64748B;
}

.btn-secondary:hover {
  border-color: white;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

/* === Sections (shared) === */
.features,
.testimonials,
.cta {
  padding: 4rem 1.5rem;
  text-align: center;
}

.features h2,
.testimonials h2,
.cta h2 {
  font-size: clamp(1.5rem, 3vw + 0.5rem, 2.5rem);
  margin-bottom: 0.75rem;
}

.section-subtitle {
  color: #64748B;
  margin-bottom: 2.5rem;
  font-size: clamp(1rem, 1.25vw + 0.5rem, 1.125rem);
}

/* === Features Grid === */
.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  padding: 2rem 1.5rem;
  background: #F8FAFC;
  border-radius: 12px;
  text-align: center;
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: #64748B;
  font-size: 0.95rem;
}

/* === Testimonials === */
.testimonials {
  background: #F8FAFC;
}

.testimonial-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 1000px;
  margin: 2rem auto 0;
}

.testimonial-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.testimonial-img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.testimonial-card blockquote {
  font-style: italic;
  color: #334155;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.testimonial-card cite {
  font-style: normal;
  font-size: 0.875rem;
  color: #94A3B8;
  font-weight: 600;
}

/* === CTA Section === */
.cta {
  background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
  color: white;
}

.cta p {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  font-size: clamp(1rem, 1.25vw + 0.5rem, 1.125rem);
}

.cta .btn-primary {
  background: white;
  color: #3B82F6;
}

.cta .btn-primary:hover {
  background: #F1F5F9;
}

/* === Footer === */
.site-footer {
  background: #0F172A;
  color: #CBD5E1;
  padding: 3rem 1.5rem 1.5rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto 2rem;
}

.footer-col h4 {
  color: white;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.footer-col a {
  display: block;
  color: #94A3B8;
  font-size: 0.9rem;
  padding: 0.25rem 0;
}

.footer-col a:hover {
  color: white;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #1E293B;
  font-size: 0.875rem;
  color: #64748B;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "This is a large CSS file — type it section by section.",
        "Save and refresh after each section to verify it looks correct.",
      ],
    },
    {
      id: "codelab-layout-media-queries",
      type: "explanation",
      instruction: {
        heading: "Add responsive media queries",
        body: `Now add the media queries at the bottom of your style.css. These transform the mobile layout into tablet and desktop layouts at two breakpoints: 768px (tablet) and 1024px (desktop).

At 768px (tablet):
<ul><li>Navigation links become visible and horizontal (no hamburger needed at this size — we kept the nav simple for this codelab).</li><li>Hero buttons switch from stacked to side by side.</li><li>Features grid goes from 1 column to 2 columns.</li><li>Testimonials grid goes to 3 columns so all three quotes are visible at once.</li><li>Footer grid expands to 4 columns (one for each link group).</li></ul>

At 1024px (desktop):
<ul><li>Features grid goes to 3 columns (2 rows of 3 cards each).</li><li>Hero gets more vertical padding for a grander feel.</li><li>Section padding increases for more breathing room.</li></ul>

Save and refresh. Now slowly resize your browser from narrow to wide. Watch:
<ol><li>Mobile (< 768px): Everything stacked, single columns, full-width buttons.</li><li>Tablet (768px-1023px): Two-column features, three-column testimonials, horizontal nav and buttons.</li><li>Desktop (1024px+): Three-column features, generous spacing, dramatic hero.</li></ol>

This is the complete responsive experience — one HTML file, one CSS file, zero JavaScript, working beautifully from 320px phones to 2560px ultrawide monitors.`,
        docLinks: [
          {
            label: "MDN: Using media queries",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries",
            type: "css-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            body: "Notice how the media queries only add or modify rules — they never undo or reset anything. That's the power of mobile-first design. The base CSS handles mobile, and each breakpoint layers on enhancements. If you ever find yourself writing 'undo' rules in media queries, it's a sign to reconsider your approach.",
          },
          {
            variant: "tip",
            body: "Test your page at these widths: 375px (iPhone), 768px (iPad), 1024px (laptop), 1440px (desktop), and 1920px (full HD). Use Chrome DevTools (F12 > device icon) to simulate any width. The layout should look good at every single pixel width, not just at the breakpoints.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `/* ============================
   Tablet (768px and up)
   ============================ */
@media (min-width: 768px) {
  /* Nav: show links horizontally */
  .nav-links {
    display: flex;
    flex-direction: row;
    width: auto;
    padding-top: 0;
    gap: 0.5rem;
    align-items: center;
  }

  .nav-links li a {
    padding: 0.5rem 0.75rem;
  }

  .nav-btn {
    margin-top: 0;
  }

  /* Hero: side-by-side buttons */
  .hero-buttons {
    flex-direction: row;
    max-width: none;
    width: auto;
  }

  /* Features: 2 columns */
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  /* Testimonials: 3 columns */
  .testimonial-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  /* Footer: 4 columns */
  .footer-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* ============================
   Desktop (1024px and up)
   ============================ */
@media (min-width: 1024px) {
  /* Features: 3 columns */
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  /* More breathing room */
  .hero {
    min-height: 90vh;
    padding: 4rem 2rem;
  }

  .features,
  .testimonials,
  .cta {
    padding: 5rem 2rem;
  }

  /* Larger section headings */
  .feature-card {
    padding: 2.5rem 2rem;
  }
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Add these media queries at the very bottom of your style.css.",
        "The tablet query comes first (768px), then the desktop query (1024px).",
        "Save and resize the browser to test all three layouts.",
      ],
    },
    {
      id: "codelab-layout-polish",
      type: "explanation",
      instruction: {
        heading: "Final polish: hover effects and smooth scrolling",
        body: `Add these finishing touches anywhere in your CSS (before the media queries is conventional, but the order doesn't matter for these rules):

<ul><li>html { scroll-behavior: smooth; } makes anchor links (#features, #testimonials) scroll smoothly instead of jumping instantly. Click the "Features" link in the nav and watch the page glide to that section.</li><li>Feature cards get a subtle lift effect on hover — the same pattern used by Stripe, Notion, and most modern SaaS landing pages.</li><li>The CTA button gets a slight scale effect on hover for satisfying feedback.</li></ul>

Save and refresh one final time. Your page is complete! You've built a professional-quality, fully responsive landing page using only HTML and CSS. No frameworks, no build tools, no JavaScript — just the fundamental web technologies.

Open DevTools (F12) and toggle the device simulation to test on different phone and tablet sizes. Everything should look polished at every size. You now have a template you can customize for any project — change the text, colors, and images to make it your own.`,
        infoBoxes: [
          {
            variant: "standard",
            body: "scroll-behavior: smooth is a CSS property (not JavaScript) that enables smooth scrolling for same-page anchor links. It's supported in all modern browsers. This is the recommended way to add smooth scrolling — no JavaScript library needed.",
          },
          {
            variant: "tip",
            body: "To share this page with others or view it on your phone, you can use a simple local server. In the terminal, run: python3 -m http.server 8000 (from inside the project folder). Then open http://localhost:8000 in your browser, or use your computer's local IP address to access it from your phone on the same Wi-Fi network.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}

/* Feature card hover effect */
.feature-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

/* Button press effect */
.btn:active {
  transform: scale(0.98);
}

/* Testimonial card hover */
.testimonial-card {
  transition: box-shadow 0.2s ease;
}

.testimonial-card:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-layout-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: Make it yours",
        body: `You now have a complete responsive page. Time to customize it! Here are some challenges, from easy to advanced:

Easy:
<ul><li>Change the color scheme (try a green theme: primary color #059669 instead of #3B82F6).</li><li>Change the hero gradient to a different direction or different colors.</li><li>Update all the placeholder text to describe a real or imaginary product.</li></ul>

Medium:
<ul><li>Add a new section between testimonials and CTA — perhaps a "How it works" section with numbered steps (1, 2, 3).</li><li>Make the navbar sticky with a background blur effect (backdrop-filter: blur(10px) with a semi-transparent background).</li><li>Add a hamburger menu to the nav for mobile (refer to the previous codelab).</li></ul>

Advanced:
<ul><li>Add a dark mode toggle using CSS custom properties and prefers-color-scheme media query.</li><li>Add subtle scroll-triggered animations using @keyframes and animation-delay.</li><li>Create an additional breakpoint at 1440px for large desktop screens with a max-width container.</li><li>Add a "pricing cards" section with 3 tiers that stack on mobile and sit side by side on desktop.</li></ul>

This page is your canvas — experiment freely! Every change teaches you something about responsive CSS.`,
      },
      config: {
        type: "free-edit",
        starterCode:
          "/* Make this responsive page your own!\n * \n * Ideas:\n * - New color scheme\n * - Additional sections\n * - Dark mode with prefers-color-scheme\n * - Hamburger menu for mobile nav\n * - Scroll animations\n * - Pricing tier cards\n */\n\n/* Your customizations here */\n",
        language: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "To change the color scheme, find all instances of #3B82F6 and replace with your chosen color.",
        "For dark mode, wrap your colors in CSS variables on :root and override them in @media (prefers-color-scheme: dark).",
      ],
    },
  ],
};
