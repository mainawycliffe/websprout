import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "tag-builder-full-page",
  slug: "full-page",
  title: "Build a Profile Page",
  description:
    "Combine everything you've learned — tags, nesting, attributes, and CSS — to build a complete personal profile page from scratch.",
  order: 13,
  steps: [
    {
      id: "full-page-intro",
      type: "explanation",
      instruction: {
        heading: "What makes a real webpage?",
        body: "Every webpage you visit — your GitHub profile, a LinkedIn bio, an Instagram about page — is built from the same pieces you already know. Headings give structure. Paragraphs hold text. Links connect pages together. Images add visuals. CSS makes it all look polished. The difference between a bunch of separate exercises and a real webpage is that all these pieces work together inside one document. That's exactly what you're about to do.",
        analogy:
          "Think of it like building a house. You've already learned how to lay bricks (HTML tags), install windows (images and links), paint walls (CSS properties), and label rooms (classes and selectors). Now it's time to combine those skills and construct a whole house from the ground up.",
        infoBoxes: [
          {
            variant: "standard",
            body: "Professional web pages follow a predictable structure: a container element wraps the content, headings establish hierarchy, semantic elements like <nav> group navigation links, and a <style> block (or external stylesheet) handles all visual presentation. This separation of structure and style is a core principle of web development.",
          },
        ],
        docLinks: [
          {
            label: "<div>: Content Division element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div",
            type: "html-element",
          },
          {
            label: "Document and website structure",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Structuring_documents",
            type: "html-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  .profile {\n    max-width: 400px;\n    margin: 20px auto;\n    padding: 24px;\n    background-color: #f9fafb;\n    border: 2px solid #e5e7eb;\n    text-align: center;\n    font-family: sans-serif;\n  }\n  .profile img {\n    width: 120px;\n    border-radius: 50%;\n  }\n  .profile h1 {\n    color: #1f2937;\n    margin-top: 12px;\n  }\n  .profile p {\n    color: #6b7280;\n  }\n  .profile a {\n    color: #2563eb;\n  }\n</style>\n\n<div class="profile">\n  <img src="https://via.placeholder.com/120" alt="Profile photo">\n  <h1>Alex Rivera</h1>\n  <p>Web developer in training. I love building things for the internet.</p>\n  <nav>\n    <a href="https://github.com">GitHub</a> |\n    <a href="https://codepen.io">CodePen</a>\n  </nav>\n</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "html-skeleton",
      type: "gap-fill",
      instruction: {
        heading: "Build the HTML skeleton",
        body: "Every profile page starts with a container and the essential content inside it: a name, a photo, and a short bio. Fill in the gaps to complete this profile card's HTML structure. Pay close attention to which tag goes where — the heading holds the name, the image needs a source, and the alt attribute describes the image for screen readers and search engines.",
        docLinks: [
          {
            label: "<h1>–<h6>: HTML Section Heading elements",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements",
            type: "html-element",
          },
          {
            label: "<img>: Image Embed element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img",
            type: "html-element",
          },
          {
            label: "alt attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#alt",
            type: "html-attribute",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Every <img> element must have an alt attribute. Screen readers announce this text to visually impaired users, and browsers display it when the image fails to load. Skipping alt is an accessibility violation under WCAG guidelines.",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template:
          '<div class="{{div_class}}">\n  <{{heading_tag}}>Sam Johnson</{{heading_tag}}>\n  <img {{img_attr}}="https://via.placeholder.com/120" alt="{{alt_text}}">\n  <p>Aspiring web developer and lifelong learner.</p>\n</div>',
        gaps: [
          {
            id: "div_class",
            placeholder: "class name",
            acceptedAnswers: ["profile"],
            caseSensitive: true,
          },
          {
            id: "heading_tag",
            placeholder: "heading tag",
            acceptedAnswers: ["h1"],
            caseSensitive: true,
          },
          {
            id: "img_attr",
            placeholder: "image attribute",
            acceptedAnswers: ["src"],
            caseSensitive: true,
          },
          {
            id: "alt_text",
            placeholder: "alt description",
            acceptedAnswers: [
              "Profile photo",
              "Profile picture",
              "Photo of Sam Johnson",
              "Sam Johnson profile photo",
            ],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The class name should match what we used in the demo — 'profile'.",
        "The main name on a page is typically an <h1> — the highest-level heading.",
        "The attribute that sets an image's URL is 'src' (short for source).",
        "The alt text should describe the image — something like 'Profile photo'.",
      ],
    },
    {
      id: "nav-links",
      type: "gap-fill",
      instruction: {
        heading: "Add navigation links",
        body: "A profile page isn't very useful if visitors can't find your other pages. Navigation links let people jump to your GitHub, portfolio, or social media. Fill in the gaps to create working anchor tags. Remember: the href attribute holds the URL, and the text between the opening and closing tags is what the user sees and clicks.",
        docLinks: [
          {
            label: "<a>: Anchor element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a",
            type: "html-element",
          },
          {
            label: "href attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href",
            type: "html-attribute",
          },
          {
            label: "<nav>: Navigation Section element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Common Mistake",
            body: "A frequent beginner error is putting the URL as the link text instead of inside the href attribute. The href holds the address; the visible text between <a> and </a> should be a human-readable label like 'GitHub' — not the raw URL.",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template:
          '<nav>\n  <a href="{{github_url}}">{{github_text}}</a>\n  |\n  <a href="{{portfolio_url}}">Portfolio</a>\n</nav>',
        gaps: [
          {
            id: "github_url",
            placeholder: "GitHub URL",
            acceptedAnswers: [
              "https://github.com",
              "https://www.github.com",
            ],
            caseSensitive: false,
          },
          {
            id: "github_text",
            placeholder: "link text",
            acceptedAnswers: ["GitHub", "My GitHub", "GitHub Profile"],
            caseSensitive: false,
          },
          {
            id: "portfolio_url",
            placeholder: "portfolio URL",
            acceptedAnswers: [
              "https://example.com",
              "https://www.example.com",
              "https://myportfolio.com",
            ],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "GitHub's URL is https://github.com — make sure to include https://.",
        "The link text is what users see — use a clear label like 'GitHub'.",
        "For the portfolio URL, any valid URL works — try https://example.com.",
      ],
    },
    {
      id: "style-profile",
      type: "gap-fill",
      instruction: {
        heading: "Style with CSS",
        body: "Now connect CSS to your HTML to make the profile page look polished. You need a selector that targets the profile container, a property that sets its background color, and a value that centers the text. This is the exact same workflow every web developer follows: write the HTML, then style it with CSS using classes as the bridge between the two.",
        docLinks: [
          {
            label: "Class selectors",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Class_selectors",
            type: "css-selector",
          },
          {
            label: "background-color",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/background-color",
            type: "css-property",
          },
          {
            label: "text-align",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/text-align",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "CSS class selectors start with a dot (.) followed by the class name. The dot tells the browser 'find elements whose class attribute contains this name.' Without the dot, the browser would look for an HTML element with that tag name instead.",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template:
          '<style>\n  {{selector}} {\n    {{bg_property}}: #f0f4f8;\n    text-align: {{align_value}};\n    padding: 24px;\n    border: 2px solid #cbd5e1;\n  }\n</style>\n\n<div class="profile">\n  <h1>Sam Johnson</h1>\n  <p>Aspiring web developer.</p>\n</div>',
        gaps: [
          {
            id: "selector",
            placeholder: "CSS selector",
            acceptedAnswers: [".profile"],
            caseSensitive: true,
          },
          {
            id: "bg_property",
            placeholder: "property name",
            acceptedAnswers: ["background-color", "background"],
            caseSensitive: true,
          },
          {
            id: "align_value",
            placeholder: "alignment value",
            acceptedAnswers: ["center"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "A class selector starts with a dot — .profile targets elements with class=\"profile\".",
        "The property for setting a background color is background-color.",
        "To center text horizontally, the value for text-align is 'center'.",
      ],
    },
    {
      id: "build-profile",
      type: "free-edit",
      instruction: {
        heading: "Build your own profile page",
        body: "This is your capstone challenge. Build a complete profile page from scratch using everything you've learned. Your page must include:\n\n• An <h1> with a name\n• A <p> with a short bio\n• At least one <a> link to an external site\n• At least one <img> tag with src and alt attributes\n• A <div> with a class attribute wrapping the content\n• A <style> tag with at least 3 CSS rules\n\nMake it your own — pick any name, bio, and colors you like. This is the same process developers at companies like GitHub, Spotify, and Notion use every day: structure content with HTML, then bring it to life with CSS.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Best Practice",
            body: "Use class selectors (.profile, .bio, .links) instead of element selectors (div, p, a) whenever possible. Classes are reusable — if you later add a second paragraph that shouldn't share the same style, element selectors would apply to both. Classes give you precise control.",
          },
          {
            variant: "standard",
            title: "Web Standard",
            body: "A well-structured HTML document uses headings (h1–h6) in order to create a logical outline. Screen readers and search engines rely on this heading hierarchy to understand your page. Always start with h1 for the main title, then use h2 for subsections.",
          },
        ],
        docLinks: [
          {
            label: "Structuring the web with HTML",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content",
            type: "html-concept",
          },
          {
            label: "CSS first steps",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics",
            type: "css-concept",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          '<style>\n  /* Add your CSS rules here */\n  \n</style>\n\n<!-- Build your profile page below -->\n<div>\n  \n</div>',
        language: "both",
      },
      validation: { type: "contains-tag", criteria: { tag: "style" } },
      hints: [
        "Start by adding a class to the <div>, like class=\"profile\".",
        "Inside the div, add an <h1> for the name and a <p> for the bio.",
        "Add an <img src=\"https://via.placeholder.com/120\" alt=\"Profile photo\"> for the picture.",
        "Add a link: <a href=\"https://github.com\">My GitHub</a>.",
        "In the <style> block, target your class: .profile { background-color: #f0f4f8; padding: 20px; text-align: center; }",
      ],
    },
    {
      id: "full-page-outro",
      type: "explanation",
      instruction: {
        heading: "What's next?",
        body: "Congratulations — you just built a complete webpage from scratch! Take a moment to appreciate what you've accomplished. You started with nothing and assembled a real, working profile page using headings, paragraphs, images, links, nesting, classes, and CSS styling. That's not a toy exercise — professional developers at GitHub, Google, and every web company on the planet use these exact same building blocks every single day.\n\nThe profile page you built follows the same pattern as a GitHub profile, a LinkedIn bio card, or an Instagram about section. The only difference is scale — real sites have more elements and more CSS rules, but the fundamentals are identical.\n\nUp next, you'll move into a guided codelab where you'll build more complex layouts and learn how elements are sized and spaced on the page. The skills you've mastered here — writing tags, nesting elements, connecting classes to CSS — are the foundation everything else builds on.",
        infoBoxes: [
          {
            variant: "standard",
            body: "You now understand the two core languages of the web: HTML for structure and CSS for presentation. Every framework, library, and tool in web development — React, Tailwind, WordPress, Wix — ultimately generates HTML and CSS. The fundamentals you've learned will never become obsolete.",
          },
          {
            variant: "tip",
            title: "Keep Practicing",
            body: "Try right-clicking on any webpage and selecting 'Inspect' or 'View Page Source.' You'll recognize the same tags and CSS rules you just learned. Reading real-world code is one of the fastest ways to level up.",
          },
        ],
        docLinks: [
          {
            label: "Learn web development — MDN",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development",
            type: "html-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  .profile {\n    max-width: 420px;\n    margin: 20px auto;\n    padding: 32px;\n    background-color: #f8fafc;\n    border: 2px solid #e2e8f0;\n    text-align: center;\n    font-family: sans-serif;\n  }\n  .profile img {\n    width: 120px;\n    border-radius: 50%;\n  }\n  .profile h1 {\n    color: #1e293b;\n    margin-top: 16px;\n    margin-bottom: 4px;\n  }\n  .profile .bio {\n    color: #64748b;\n    font-size: 15px;\n    margin-bottom: 16px;\n  }\n  .profile nav a {\n    color: #3b82f6;\n    text-decoration: none;\n    margin: 0 8px;\n  }\n  .profile nav a:hover {\n    text-decoration: underline;\n  }\n</style>\n\n<div class="profile">\n  <img src="https://via.placeholder.com/120" alt="Profile photo">\n  <h1>Sam Johnson</h1>\n  <p class="bio">Aspiring web developer and lifelong learner. I build things for the web.</p>\n  <nav>\n    <a href="https://github.com">GitHub</a>\n    <a href="https://codepen.io">CodePen</a>\n    <a href="https://example.com">Portfolio</a>\n  </nav>\n</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
