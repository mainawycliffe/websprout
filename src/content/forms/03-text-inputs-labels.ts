import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "forms-text-inputs-labels",
  slug: "text-inputs-labels",
  title: "Text Inputs and Labels",
  description:
    "Master the <input> element, the <label> element, and learn why wiring them together is essential for usability and accessibility.",
  order: 3,
  steps: [
    {
      id: "the-input-element",
      type: "explanation",
      instruction: {
        heading: "The <input> element — the workhorse of forms",
        body: "The <code>&lt;input&gt;</code> element is the most versatile and commonly used form element in HTML. In its default form (<code>type=\"text\"</code>), it creates a single-line text field where users can type information.\n\nEvery input needs three key attributes to be useful:\n\n<strong>The <code>type</code> attribute</strong> determines what kind of input it is. <code>type=\"text\"</code> is the default and creates a plain text field. We'll explore many other types in a later lesson.\n\n<strong>The <code>name</code> attribute</strong> gives the field a name that the server uses to identify the data. When the form is submitted, the browser sends name-value pairs like <code>username=alex</code>. Without a <code>name</code> attribute, the input's data is simply not sent — it's as if the field doesn't exist.\n\n<strong>The <code>placeholder</code> attribute</strong> shows faint hint text inside the input before the user types anything. It gives users a clue about what to enter. For example, <code>placeholder=\"Enter your email\"</code> shows gray text that disappears as soon as the user starts typing.\n\nThe <code>&lt;input&gt;</code> element is a <strong>void element</strong> (also called a self-closing element) — it has no closing tag. You write <code>&lt;input type=\"text\" name=\"email\"&gt;</code>, not <code>&lt;input&gt;...&lt;/input&gt;</code>. This is because inputs don't wrap around other content; they are standalone interactive widgets.",
        docLinks: [
          {
            label: "MDN: <input> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input",
            type: "html-element",
          },
          {
            label: "MDN: <input type=\"text\">",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "The <code>placeholder</code> attribute is for hints only — short examples like \"e.g., alex@email.com\" or \"Enter your city\". It disappears when the user starts typing, so it should never contain important instructions. Users with cognitive disabilities may confuse placeholder text with pre-filled data. Always use a <code>&lt;label&gt;</code> for the field's actual name.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- A text input with name and placeholder -->\n<input type="text" name="username" placeholder="Enter your username">\n\n<!-- Multiple inputs in a form -->\n<form action="/register" method="post">\n  <input type="text" name="first_name" placeholder="First name">\n  <input type="text" name="last_name" placeholder="Last name">\n  <input type="text" name="email" placeholder="Email address">\n  <button type="submit">Register</button>\n</form>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "the-label-element",
      type: "explanation",
      instruction: {
        heading: "The <label> element — every input needs a name tag",
        body: "The <code>&lt;label&gt;</code> element provides a visible, descriptive text label for a form field. It tells the user what information goes in each input. Without labels, users have to guess what each field is for — and screen reader users may not be able to use the form at all.\n\nThere are two ways to connect a label to an input:\n\n<strong>Explicit labeling (recommended):</strong> Use the <code>for</code> attribute on the label, matching the <code>id</code> attribute on the input:\n<code>&lt;label for=\"email\"&gt;Email:&lt;/label&gt;<br>&lt;input type=\"text\" id=\"email\" name=\"email\"&gt;</code>\n\nThe <code>for</code> attribute's value must exactly match the <code>id</code> of the input. This creates a programmatic association that browsers and assistive technologies understand.\n\n<strong>Implicit labeling:</strong> Wrap the input inside the label element:\n<code>&lt;label&gt;Email: &lt;input type=\"text\" name=\"email\"&gt;&lt;/label&gt;</code>\n\nBoth methods work, but explicit labeling with <code>for</code>/<code>id</code> is generally preferred because it's more flexible (the label and input don't need to be adjacent in the HTML) and has better support across assistive technologies.\n\n<strong>Why labels matter beyond accessibility:</strong> When a label is properly connected to an input, clicking the label text focuses the input field. This is a huge usability win, especially for small targets like checkboxes and radio buttons. Try it — click the label text and watch the input light up!",
        docLinks: [
          {
            label: "MDN: <label> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label",
            type: "html-element",
          },
          {
            label: "MDN: for attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/for",
            type: "html-attribute",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "WCAG 2.1 Success Criterion 1.3.1 (Info and Relationships) and 3.3.2 (Labels or Instructions) require that form fields have programmatically associated labels. This means using <code>&lt;label&gt;</code> elements with proper <code>for</code>/<code>id</code> connections — not just placing text visually near an input. Screen readers rely on this association to announce what each field is for.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "A <code>placeholder</code> is <strong>not</strong> a substitute for a <code>&lt;label&gt;</code>. Placeholders disappear when the user starts typing, leaving them with no reminder of what the field is for. Users who tab between fields may never even see the placeholder. Always provide a visible <code>&lt;label&gt;</code> in addition to any placeholder text.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- Explicit labeling: for/id connection -->\n<label for="email">Email address:</label>\n<input type="text" id="email" name="email" placeholder="you@example.com">\n\n<!-- Implicit labeling: wrapping -->\n<label>\n  Phone number:\n  <input type="text" name="phone" placeholder="555-123-4567">\n</label>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "name-attribute-matters",
      type: "explanation",
      instruction: {
        heading: "The name attribute — without it, data vanishes",
        body: "The <code>name</code> attribute on an input is absolutely critical. It is the key in the key-value pair that gets sent to the server. Without it, the browser silently ignores the field's data during submission — the user fills it in, clicks Submit, and their data simply disappears.\n\nConsider this form:\n<code>&lt;form action=\"/register\" method=\"post\"&gt;<br>&nbsp;&nbsp;&lt;input type=\"text\" name=\"username\"&gt;<br>&nbsp;&nbsp;&lt;input type=\"text\"&gt;<br>&nbsp;&nbsp;&lt;button type=\"submit\"&gt;Register&lt;/button&gt;<br>&lt;/form&gt;</code>\n\nWhen submitted, the browser sends <code>username=whatever_was_typed</code> for the first input. But the second input? Nothing. Zero. Its data is not included in the submission because it has no <code>name</code>. The server never even knows it existed.\n\nThis is one of the most common form bugs for beginners. You build a beautiful form, test it, everything looks great visually — but certain fields don't appear on the server side because you forgot the <code>name</code> attribute.\n\n<strong>Naming conventions:</strong> Use lowercase, descriptive names without spaces. Use underscores or hyphens to separate words: <code>first_name</code>, <code>email-address</code>, <code>phone_number</code>. These names should make sense to the server-side developer who will process the data.",
        analogy: "Imagine dropping off a box at the post office, but you forgot to write your name on it or fill out the shipping label. The post office can't deliver an unmarked box — they don't know who it's from or where it goes, so it sits in lost-and-found. The <code>name</code> attribute is like the shipping label on the box. Without it, the browser doesn't know what to call the data, so it doesn't send it at all.",
        docLinks: [
          {
            label: "MDN: name attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name",
            type: "html-attribute",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Don't confuse <code>name</code> with <code>id</code>. The <code>id</code> attribute is used for label association and CSS/JavaScript targeting — it must be unique on the page. The <code>name</code> attribute is used for form submission — it's the key sent to the server. An input usually needs both: <code>id</code> for the label connection, and <code>name</code> for the form data.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<form action="/register" method="post">\n  <!-- This field WILL be sent: name="username" -->\n  <label for="user">Username:</label>\n  <input type="text" id="user" name="username">\n\n  <!-- This field will NOT be sent: no name! -->\n  <label for="secret">Secret (no name):</label>\n  <input type="text" id="secret">\n\n  <button type="submit">Register</button>\n</form>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "practice-explicit-label",
      type: "gap-fill",
      instruction: {
        heading: "Wire a label to an input using for/id",
        body: "Fill in the blanks to connect the label to the input using explicit labeling. The <code>for</code> attribute on the label must match the <code>id</code> on the input.",
      },
      config: {
        type: "gap-fill",
        template:
          '<label {{attr1}}="fullname">Full Name:</label>\n<input type="text" {{attr2}}="fullname" name="full_name">',
        gaps: [
          {
            id: "attr1",
            placeholder: "label attribute",
            acceptedAnswers: ["for"],
            caseSensitive: false,
          },
          {
            id: "attr2",
            placeholder: "input attribute",
            acceptedAnswers: ["id"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The label uses the \"for\" attribute to point to an input.",
        "The input uses the \"id\" attribute that matches the label's \"for\" value.",
      ],
    },
    {
      id: "practice-implicit-label",
      type: "gap-fill",
      instruction: {
        heading: "Create an implicit label by wrapping",
        body: "Fill in the blanks to create an implicit label — the input is wrapped inside the label element. With implicit labeling, you don't need <code>for</code> and <code>id</code> attributes because the association is created by the nesting.",
      },
      config: {
        type: "gap-fill",
        template:
          '<{{outer}}>\n  Email:\n  <{{inner}} type="text" name="email" placeholder="you@example.com">\n</{{outer}}>',
        gaps: [
          {
            id: "outer",
            placeholder: "wrapping element",
            acceptedAnswers: ["label"],
            caseSensitive: false,
          },
          {
            id: "inner",
            placeholder: "form field",
            acceptedAnswers: ["input"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The wrapping element that creates an implicit association is <label>.",
        "The form field element for text entry is <input>.",
      ],
    },
    {
      id: "build-labeled-inputs",
      type: "free-edit",
      instruction: {
        heading: "Build a form with three labeled text inputs",
        body: "Create a form with at least three text inputs, each with a properly connected <code>&lt;label&gt;</code>. Your form should collect a user's name, email, and city.\n\n<ul><li>Use explicit labeling (<code>for</code>/<code>id</code>) for each field</li><li>Give every input a <code>name</code> attribute</li><li>Add helpful <code>placeholder</code> text</li><li>Wrap everything in a <code>&lt;form&gt;</code> with an <code>action</code> and <code>method</code></li><li>Include a submit button</li></ul>",
        docLinks: [
          {
            label: "MDN: <label> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label",
            type: "html-element",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          "<!-- Build a form with 3 labeled text inputs -->\n<form>\n\n</form>\n",
        language: "html",
      },
      validation: { type: "contains-tag", criteria: { tag: "label" } },
      hints: [
        "Start by adding action and method attributes to the <form> tag.",
        "For each field, write a <label for=\"...\"> followed by an <input id=\"...\" name=\"...\">.",
        "Make sure each for value exactly matches the corresponding id value.",
        "Don't forget the name attribute on each input — without it, the data won't be submitted.",
      ],
    },
  ],
};
