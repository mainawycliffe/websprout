import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "course-overview-building-blocks-of-web",
  slug: "building-blocks-of-web",
  title: "The Building Blocks of the Web",
  description:
    "Discover what websites are really made of — three languages working together.",
  order: 1,
  steps: [
    {
      id: "what-is-a-website",
      type: "explanation",
      instruction: {
        heading: "What is a website, really?",
        body: "Every website you visit — Google, YouTube, Wikipedia, Instagram — is just a collection of text files that your browser downloads and turns into the visual pages you see. There is no magic. When you open instagram.com, your browser fetches a few files, reads the instructions inside them, and paints the result on your screen. Those files are written in three languages, and learning those three languages is what this entire course is about.",
        analogy:
          "Think of a website like a house. Before you can live in it, someone had to draw blueprints (the structure), choose the paint colors and furniture (the style), and wire up the electricity and plumbing (the interactive stuff). Websites work the same way — three different jobs, three different languages.",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The web is built on open standards maintained by the W3C (World Wide Web Consortium) and WHATWG. This means anyone can build a website, and any browser can display it. No single company controls the web.",
          },
        ],
        docLinks: [
          {
            label: "MDN: Getting started with the web",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website",
            type: "html-concept",
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
      id: "the-trio",
      type: "explanation",
      instruction: {
        heading: "The three languages of the web",
        body: "Every website is built with three core languages:\n\n<ol><li><strong>HTML</strong> (HyperText Markup Language) defines the structure and content — headings, paragraphs, images, links. It tells the browser <em>what</em> is on the page.</li>\n<li><strong>CSS</strong> (Cascading Style Sheets) controls the appearance — colors, fonts, spacing, layout. It tells the browser <em>how things should look</em>.</li>\n<li><strong>JavaScript</strong> adds interactivity and behavior — dropdown menus, form validation, animations, loading new content without refreshing. It tells the browser <em>what should happen</em> when a user does something.</li></ol>\n\nThese three languages were created separately on purpose. Keeping structure, style, and behavior apart makes websites easier to build, maintain, and update. You can change colors without touching your content, or add a new interactive feature without redesigning the page.",
        analogy:
          "Think of a school newspaper. The writers create the articles (HTML — the content). The design team picks the fonts, colors, and layout (CSS — the style). The web team adds interactive features like a comments section or a poll (JavaScript — the behavior). Each team can work independently because their jobs are separated.",
        docLinks: [
          {
            label: "MDN: HTML basics",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content",
            type: "html-concept",
          },
          {
            label: "MDN: CSS basics",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Styling_the_content",
            type: "css-concept",
          },
          {
            label: "MDN: JavaScript basics",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Adding_interactivity",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "You do not need all three to make a web page. A valid web page can be just HTML — no CSS, no JavaScript. CSS and JS enhance the page, but HTML is the foundation. In this course, we start with HTML alone before adding the others.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- HTML: the structure -->\n<h1>Welcome to My Site</h1>\n<p>This is a paragraph of text.</p>\n\n<!-- CSS would style it -->\n<!-- JavaScript would make it interactive -->',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "real-world-examples",
      type: "explanation",
      instruction: {
        heading: "See it in the real world",
        body: "Let's look at websites you already use:\n\n<ul><li><strong>Google Search</strong>: The search box, the logo, the list of results — that's all HTML. The colors, fonts, and spacing of those results — that's CSS. When you type and suggestions appear instantly — that's JavaScript.</li>\n<li><strong>YouTube</strong>: The video player, title, description, and comments are HTML. The dark theme, thumbnail grid layout, and red accent color are CSS. Playing/pausing video, loading comments as you scroll, and the like button animation are JavaScript.</li>\n<li><strong>Amazon</strong>: Product titles, prices, and images are HTML. The grid of products, the orange buttons, and the navigation bar styling are CSS. Adding items to your cart without leaving the page, filtering search results, and the image zoom feature are JavaScript.</li></ul>\n\nEvery website, no matter how complex, uses these same three building blocks.",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "You can see the HTML of any website right now. Right-click on any webpage and select 'View Page Source' or press Ctrl+U (Cmd+Option+U on Mac). What you see is the raw HTML the browser received.",
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
      id: "gap-fill-trio",
      type: "gap-fill",
      instruction: {
        heading: "Check your understanding",
        body: "Fill in the three languages of the web based on what each one does.",
      },
      config: {
        type: "gap-fill",
        template:
          "{{lang1}} defines the structure and content of a web page.\n{{lang2}} controls how the page looks (colors, fonts, layout).\n{{lang3}} adds interactivity and behavior.",
        gaps: [
          {
            id: "lang1",
            placeholder: "structure language",
            acceptedAnswers: ["HTML", "html"],
            caseSensitive: false,
          },
          {
            id: "lang2",
            placeholder: "style language",
            acceptedAnswers: ["CSS", "css"],
            caseSensitive: false,
          },
          {
            id: "lang3",
            placeholder: "behavior language",
            acceptedAnswers: [
              "JavaScript",
              "javascript",
              "JS",
              "js",
            ],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The structure language is a four-letter abbreviation starting with H.",
        "The style language is a three-letter abbreviation starting with C.",
        "The behavior language was named after a popular programming language — it starts with J.",
      ],
    },
    {
      id: "try-html",
      type: "free-edit",
      instruction: {
        heading: "Try it yourself",
        body: "You have not learned HTML yet, but let's get a taste. Type an opening tag <h1>, some text, and a closing tag </h1> in the editor below. Watch the preview update as you type — that is your browser reading HTML in real time.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Do not worry about getting it perfect. This is just a preview of what you will learn. The Tag Builder module will teach you everything about HTML tags step by step.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode: "<!-- Type your first HTML below -->\n",
        language: "html",
      },
      validation: { type: "contains-tag", criteria: { tag: "h1|h2|p" } },
      hints: [
        "Try typing: <h1>Hello World</h1>",
        "An HTML tag has an opening part <h1> and a closing part </h1> with text in between.",
      ],
    },
  ],
};
