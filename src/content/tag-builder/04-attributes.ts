import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "tag-builder-attributes",
  slug: "attributes",
  title: "Tag Attributes",
  description: "Add extra info to your tags with attributes.",
  order: 4,
  steps: [
    {
      id: "attrs-intro",
      type: "explanation",
      instruction: {
        heading: "Attributes are extra info",
        body: 'Attributes exist because tags alone aren\'t enough — sometimes you need to give a tag extra instructions. For example, an <a> tag creates a link, but the browser needs to know where the link goes. That\'s what href="..." does. Every clickable link you\'ve ever used on the web — from Google search results to "Add to Cart" buttons — uses the href attribute to know its destination.',
        analogy: 'Think of a shipping package: the box itself is the tag, but without a destination label, the courier doesn\'t know where to deliver it. Attributes are those labels — they give the browser the extra details it needs to handle the element correctly.',
        infoBoxes: [
          {
            variant: "standard",
            body: "The href attribute on <a> stands for 'hypertext reference' — it's the foundation of how web pages link together, which is what makes the web a 'web'.",
          },
        ],
        docLinks: [
          { label: "<a> anchor", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a", type: "html-element" },
          { label: "href attribute", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href", type: "html-attribute" },
        ],
      },
      config: {
        type: "explanation",
        demoCode: '<a href="https://example.com">Click me</a>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "add-href",
      type: "gap-fill",
      instruction: {
        heading: "Add a link attribute",
        body: "Fill in the attribute name to make this link work.",
      },
      config: {
        type: "gap-fill",
        template: '<a {{attr_name}}="https://example.com">Visit Example</a>',
        gaps: [
          { id: "attr_name", placeholder: "attribute", acceptedAnswers: ["href"], caseSensitive: true },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: ["The attribute that sets a link's destination is href."],
    },
    {
      id: "img-tag",
      type: "explanation",
      instruction: {
        heading: "Images use attributes too",
        body: 'The <img> tag displays images — every photo on Instagram, product image on Amazon, and meme you\'ve ever seen on the web uses this tag. The src attribute tells the browser where to find the image file, and alt provides a text description for people who can\'t see the image (using screen readers) or when the image fails to load. Notice: <img> doesn\'t need a closing tag — it\'s "self-closing" because it doesn\'t wrap around content.',
        infoBoxes: [
          {
            variant: "standard",
            body: "The alt attribute is required by WCAG 2.1 accessibility guidelines for all meaningful images. Screen readers read it aloud so visually impaired users understand what the image shows.",
          },
        ],
        docLinks: [
          { label: "<img>", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img", type: "html-element" },
          { label: "src attribute", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#src", type: "html-attribute" },
          { label: "alt attribute", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#alt", type: "html-attribute" },
        ],
      },
      config: {
        type: "explanation",
        demoCode: '<img src="photo.jpg" alt="A cute cat">',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "write-link",
      type: "free-edit",
      instruction: {
        heading: "Write a link tag",
        body: 'Create an <a> tag with an href attribute pointing to any URL. Links are the backbone of the web — they\'re what makes it a "web" of connected pages rather than isolated documents. You\'re building the same thing that powers every navigation menu, "Read more" link, and social media share button.',
        infoBoxes: [
          {
            variant: "tip",
            body: "Always quote attribute values with double quotes. While HTML technically allows some unquoted values, quotes prevent subtle bugs and are required in XHTML.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode: "",
        language: "html",
      },
      validation: { type: "contains-tag", criteria: { tag: "a" } },
      hints: [
        'Start with <a href="...">',
        'Example: <a href="https://google.com">Search</a>',
      ],
    },
  ],
};
