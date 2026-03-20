import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "course-overview-what-is-html",
  slug: "what-is-html",
  title: "What is HTML?",
  description:
    "Understand how HTML gives structure to every web page — like a skeleton gives shape to a body.",
  order: 2,
  steps: [
    {
      id: "why-html-exists",
      type: "explanation",
      instruction: {
        heading: "Why does HTML exist?",
        body: "Imagine you wrote an essay and emailed it to a friend, but when they opened it, all the headings, paragraphs, and bullet points were gone — just one giant wall of text. That is exactly what would happen on the web without HTML.\n\nHTML was invented in 1991 by Tim Berners-Lee to solve this problem. He needed a way to share scientific documents between universities so that the structure — headings, paragraphs, links to other documents — would be preserved no matter what computer opened them. HTML is that solution: a language that marks up plain text with tags that describe its structure.\n\nThe name says it all: <strong>H</strong>yper<strong>T</strong>ext <strong>M</strong>arkup <strong>L</strong>anguage. 'HyperText' means text with links (you can click to jump to other documents). 'Markup' means you annotate the text to describe its role.",
        analogy:
          "Think of HTML like the labels on a filing cabinet. The papers inside are your content, but without the labels — 'Invoices,' 'Contracts,' 'Personal' — you would have no idea what anything is. HTML labels your content so the browser knows what to do with it.",
        docLinks: [
          {
            label: "MDN: HTML",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "HTML is maintained by the WHATWG (Web Hypertext Application Technology Working Group) as a 'living standard' — it is continuously updated rather than released in numbered versions. The current specification is simply called 'HTML.'",
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
      id: "what-are-tags",
      type: "explanation",
      instruction: {
        heading: "What are HTML tags?",
        body: "An HTML tag is a label you wrap around content to tell the browser what that content is. Tags come in pairs: an opening tag and a closing tag.\n\n<ul><li><strong>Opening tag</strong>: <p> — starts with < and ends with ></li>\n<li><strong>Closing tag</strong>: </p> — same, but with a / before the tag name</li>\n<li><strong>Content</strong>: the text (or other tags) between the opening and closing tags</li>\n<li><strong>Element</strong>: the whole package — opening tag + content + closing tag</li></ul>\n\nFor example, <p>This is a paragraph.</p> creates a paragraph element. The browser sees the <p> tag and knows: 'Everything between here and </p> should be treated as a paragraph.'\n\nThere are about 100 different HTML tags, each with a specific meaning. <h1> means 'top-level heading.' <a> means 'a link to somewhere.' <img> means 'display an image.' You will learn the most important ones in this course.",
        analogy:
          "Tags are like the chapter titles and section headers in a book. When you see 'Chapter 3' in bold at the top of a page, you know a new chapter is starting. HTML tags do the same thing — they tell the browser 'a new heading starts here' or 'a new paragraph starts here.'",
        docLinks: [
          {
            label: "MDN: HTML elements reference",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Some tags are 'self-closing' — they do not have a closing tag because they do not wrap around content. For example, <img> displays an image and <br> creates a line break. You will learn about these later.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "<h1>This is a heading</h1>\n<p>This is a paragraph of text.</p>\n<a href=\"https://example.com\">This is a link</a>",
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "document-structure",
      type: "explanation",
      instruction: {
        heading: "The HTML document",
        body: "Every web page is an HTML document. Just like a letter has a standard format (date, greeting, body, signature), an HTML document has a standard structure:\n\n<ul><li><strong>&lt;!DOCTYPE html&gt;</strong> — tells the browser 'this is a modern HTML document'</li>\n<li><strong>&lt;html&gt;</strong> — the root element that wraps everything</li>\n<li><strong>&lt;head&gt;</strong> — contains metadata (the page title, links to CSS files, etc.) — this is invisible to the user</li>\n<li><strong>&lt;body&gt;</strong> — contains everything the user actually sees on the page</li></ul>\n\nWhen you visit any website, the browser receives an HTML document with this exact structure. The browser reads it from top to bottom, building the page as it goes.",
        analogy:
          "An HTML document is like a shipping package. The <head> is the label on the outside — it has the tracking number, sender, and destination (metadata) but you do not see it when you open the box. The <body> is what is inside the box — the actual stuff you care about.",
        docLinks: [
          {
            label: "MDN: Anatomy of an HTML document",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax#anatomy_of_an_html_document",
            type: "html-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!DOCTYPE html>\n<html>\n  <head>\n    <title>My First Page</title>\n  </head>\n  <body>\n    <h1>Hello, World!</h1>\n    <p>This is my web page.</p>\n  </body>\n</html>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "gap-fill-tags",
      type: "gap-fill",
      instruction: {
        heading: "Check your understanding",
        body: "Fill in the blanks about HTML tags and document structure.",
      },
      config: {
        type: "gap-fill",
        template:
          "An HTML tag has an opening tag and a {{part}} tag.\nThe invisible metadata goes inside the <{{head}}> element.\nThe visible page content goes inside the <{{body}}> element.",
        gaps: [
          {
            id: "part",
            placeholder: "type of tag",
            acceptedAnswers: ["closing"],
            caseSensitive: false,
          },
          {
            id: "head",
            placeholder: "element name",
            acceptedAnswers: ["head"],
            caseSensitive: false,
          },
          {
            id: "body",
            placeholder: "element name",
            acceptedAnswers: ["body"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The second tag in a pair starts with a / — what is that type called?",
        "Metadata like the page title goes in the <____> section.",
        "Everything the user sees on the page is inside the <____> section.",
      ],
    },
    {
      id: "free-edit-html",
      type: "free-edit",
      instruction: {
        heading: "Write some HTML",
        body: "Try writing a heading and a paragraph. Use <h1> for the heading and <p> for the paragraph. Put any text you like inside them — your name, a greeting, anything. Watch the preview update live as you type.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Make sure every opening tag has a matching closing tag. If you write <h1>, you need </h1> to close it. Forgetting the closing tag is the number one beginner mistake.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode: "<!-- Write a heading and a paragraph -->\n",
        language: "html",
      },
      validation: { type: "contains-tag", criteria: { tag: "h1|p" } },
      hints: [
        "Start with <h1>Your Heading</h1>",
        "Then on a new line, add <p>Your paragraph text here.</p>",
      ],
    },
  ],
};
