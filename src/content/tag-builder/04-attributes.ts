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
        body: 'Attributes go inside the opening tag and give extra information. For example, <a href="..."> tells the browser where a link goes. Attributes have a name, an equals sign, and a value in quotes.',
        analogy: 'If a tag is a box, attributes are labels stuck to the outside. A shipping box might have a "DESTINATION: London" label — that\'s an attribute!',
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
        body: 'The <img> tag uses src for the image file and alt for a text description. Notice: <img> doesn\'t need a closing tag — it\'s a "self-closing" tag!',
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
        body: 'Create an <a> tag with an href attribute. Make it link to anywhere you want!',
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
