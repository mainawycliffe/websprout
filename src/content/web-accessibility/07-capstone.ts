import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "web-accessibility-capstone",
  slug: "capstone",
  title: "Build an Accessible Contact Form",
  description:
    "Combine labels, ARIA attributes, keyboard navigation, and color contrast to build a fully accessible contact form.",
  order: 7,
  steps: [
    {
      id: "what-were-building",
      type: "explanation",
      instruction: {
        heading: "What we're building",
        body: "In this capstone, you will combine everything from this module to build a fully accessible contact form. Contact forms are on almost every website — from Amazon's customer service page to your local restaurant's website. They look simple, but they are one of the most common sources of accessibility failures on the web. Missing labels, no error feedback, keyboard traps in custom dropdowns, low-contrast placeholder text, and missing ARIA attributes make forms unusable for millions of people.\n\nOur contact form will have:\n- A proper form structure with <form>, <fieldset>, and <legend>.\n- Text inputs for name and email with visible <label> elements.\n- A textarea for the message.\n- Required field indicators that do not rely on color alone.\n- A live region for form validation feedback (using aria-live).\n- Proper focus management with visible focus indicators.\n- A skip link to jump past the page header.\n- Sufficient color contrast on all text.\n- Semantic HTML landmarks wrapping the entire page.\n\nBy the end, you will have a form that a blind user can fill out with a screen reader, a motor-impaired user can complete with only a keyboard, a color-blind user can understand without confusion, and a sighted user finds clean and professional. This is what accessibility looks like in practice — it is not a separate layer of work, it is simply good HTML and CSS.",
        docLinks: [
          {
            label: "MDN: <form>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form",
            type: "html-element",
          },
          {
            label: "MDN: <label>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label",
            type: "html-element",
          },
          {
            label: "MDN: <fieldset>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "WCAG has multiple success criteria specifically about forms: 1.3.1 (Info and Relationships — labels must be programmatically associated), 3.3.1 (Error Identification — errors must be described in text), 3.3.2 (Labels or Instructions — inputs must have labels), and 4.1.2 (Name, Role, Value — all form controls must have accessible names). Our form will satisfy all of these.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "<a href=\"#main\" class=\"skip-link\">Skip to main content</a>\n\n<header>\n  <nav aria-label=\"Main navigation\">\n    <a href=\"/\">Home</a>\n    <a href=\"/about\">About</a>\n    <a href=\"/contact\">Contact</a>\n  </nav>\n</header>\n\n<main id=\"main\" tabindex=\"-1\">\n  <h1>Contact Us</h1>\n  <form>\n    <fieldset>\n      <legend>Your Information</legend>\n\n      <label for=\"name\">Name <span aria-hidden=\"true\">*</span>\n        <span class=\"sr-only\">(required)</span>\n      </label>\n      <input type=\"text\" id=\"name\" required\n        aria-required=\"true\">\n\n      <label for=\"email\">Email <span aria-hidden=\"true\">*</span>\n        <span class=\"sr-only\">(required)</span>\n      </label>\n      <input type=\"email\" id=\"email\" required\n        aria-required=\"true\">\n\n      <label for=\"message\">Message</label>\n      <textarea id=\"message\" rows=\"5\"></textarea>\n    </fieldset>\n\n    <div aria-live=\"polite\" id=\"form-status\"></div>\n    <button type=\"submit\">Send Message</button>\n  </form>\n</main>\n\n<footer>\n  <p>&copy; 2024 My Company</p>\n</footer>",
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "labels-and-inputs",
      type: "gap-fill",
      instruction: {
        heading: "Associate labels with inputs",
        body: "Every form input MUST have a label. The <label> element's \"for\" attribute connects it to the input's \"id\" attribute. When they match, clicking the label focuses the input — and more importantly, screen readers announce the label text when the user focuses the input. Without this association, a screen reader user hears just \"edit text\" with no idea what information to enter.\n\nFill in the missing attributes to properly associate the label with the input.",
        docLinks: [
          {
            label: "MDN: <label>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "The \"for\" attribute on <label> must exactly match the \"id\" attribute on the associated input. They are case-sensitive. If they do not match, the label is not associated and screen readers will not announce it.",
          },
        ],
      },
      config: {
        type: "gap-fill",
        template:
          "<label {{for_attr}}=\"{{id_value}}\">Email Address</label>\n<input type=\"email\" {{id_attr}}=\"{{id_value2}}\" required>",
        gaps: [
          {
            id: "for_attr",
            placeholder: "attribute",
            acceptedAnswers: ["for"],
            caseSensitive: true,
          },
          {
            id: "id_value",
            placeholder: "identifier",
            acceptedAnswers: ["email"],
            caseSensitive: true,
          },
          {
            id: "id_attr",
            placeholder: "attribute",
            acceptedAnswers: ["id"],
            caseSensitive: true,
          },
          {
            id: "id_value2",
            placeholder: "identifier",
            acceptedAnswers: ["email"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The label uses the \"for\" attribute to point to the input.",
        "The input needs an \"id\" attribute that matches the label's \"for\" value.",
        "Use the same value for both — like \"email\".",
      ],
    },
    {
      id: "required-fields-gapfill",
      type: "gap-fill",
      instruction: {
        heading: "Mark required fields accessibly",
        body: "A visual asterisk (*) is a common convention for required fields, but screen readers may not understand it. We need two things: the visual asterisk hidden from screen readers (so they do not announce \"star\"), and a screen-reader-only text that says \"required.\" We also use the aria-required attribute on the input itself.\n\nFill in the missing values to make this required field accessible.",
      },
      config: {
        type: "gap-fill",
        template:
          "<label for=\"name\">Full Name\n  <span {{hidden_attr}}=\"{{hidden_val}}\">*</span>\n  <span class=\"sr-only\">(required)</span>\n</label>\n<input type=\"text\" id=\"name\" required\n  {{aria_attr}}=\"{{aria_val}}\">",
        gaps: [
          {
            id: "hidden_attr",
            placeholder: "attribute",
            acceptedAnswers: ["aria-hidden"],
            caseSensitive: true,
          },
          {
            id: "hidden_val",
            placeholder: "value",
            acceptedAnswers: ["true"],
            caseSensitive: true,
          },
          {
            id: "aria_attr",
            placeholder: "attribute",
            acceptedAnswers: ["aria-required"],
            caseSensitive: true,
          },
          {
            id: "aria_val",
            placeholder: "value",
            acceptedAnswers: ["true"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The asterisk should be hidden from screen readers with aria-hidden.",
        "Set aria-hidden to \"true\" to hide the asterisk from assistive tech.",
        "The input itself should have aria-required set to \"true\".",
      ],
    },
    {
      id: "live-region-feedback",
      type: "gap-fill",
      instruction: {
        heading: "Add a live region for feedback",
        body: "When a user submits the form, they need to know if it succeeded or if there were errors. For screen reader users, we need a live region — an area of the page that the screen reader monitors for changes and announces automatically.\n\nThe feedback area should wait politely until the screen reader finishes its current announcement. Fill in the correct attributes.",
      },
      config: {
        type: "gap-fill",
        template:
          "<div {{live_attr}}=\"{{live_val}}\" id=\"form-feedback\">\n  <!-- JS will inject: \"Message sent!\" or \"Error: email is required\" -->\n</div>",
        gaps: [
          {
            id: "live_attr",
            placeholder: "attribute",
            acceptedAnswers: ["aria-live"],
            caseSensitive: true,
          },
          {
            id: "live_val",
            placeholder: "value",
            acceptedAnswers: ["polite"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The attribute that creates a live region is aria-live.",
        "\"polite\" waits for the screen reader to finish before announcing the update.",
      ],
    },
    {
      id: "build-full-form",
      type: "free-edit",
      instruction: {
        heading: "Build the complete accessible form",
        body: "Now put it all together. Build a complete, accessible contact form with:\n\n1. <strong>Semantic page structure</strong> — <header>, <main>, <footer> wrapping the appropriate content.\n2. <strong>A skip link</strong> — as the first element in body, linking to the main content.\n3. <strong>A form with <fieldset> and <legend></strong> — grouping the form fields with a descriptive legend.\n4. <strong>Labeled inputs</strong> — every input has a <label> with a matching \"for\" attribute. Include fields for name, email, and message.\n5. <strong>Required field indicators</strong> — visual asterisks hidden from screen readers (aria-hidden=\"true\"), plus aria-required=\"true\" on required inputs.\n6. <strong>A live region</strong> — a div with aria-live=\"polite\" for form submission feedback.\n7. <strong>A submit button</strong> — a real <button> element, not a div.\n8. <strong>Visible focus styles</strong> — add CSS with :focus-visible for clear focus indicators.\n9. <strong>Sufficient color contrast</strong> — all text colors pass WCAG AA (4.5:1 for normal text).\n\nUse the starter code as a foundation and fill in the missing accessibility features. This form should be fully usable by keyboard-only users, screen reader users, and users with color vision deficiency.",
        docLinks: [
          {
            label: "MDN: <form>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form",
            type: "html-element",
          },
          {
            label: "MDN: ARIA",
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "A fully accessible form satisfies multiple WCAG criteria simultaneously: 1.1.1 (Non-text Content), 1.3.1 (Info and Relationships), 1.4.3 (Contrast Minimum), 2.1.1 (Keyboard), 2.4.1 (Bypass Blocks), 2.4.7 (Focus Visible), 3.3.1 (Error Identification), 3.3.2 (Labels or Instructions), and 4.1.2 (Name, Role, Value).",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "Work from the outside in: start with the page landmarks (header, main, footer), then add the form structure (form, fieldset, legend), then the individual fields (label + input pairs), then the accessibility extras (skip link, live region, focus styles, contrast). Testing after each addition makes it easier to catch issues.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          "<!-- Add a skip link here -->\n\n<header>\n  <nav>\n    <a href=\"/\">Home</a>\n    <a href=\"/contact\">Contact</a>\n  </nav>\n</header>\n\n<main>\n  <h1>Contact Us</h1>\n  <form>\n    <!-- Add fieldset, legend, labels, inputs, live region, and submit button -->\n\n  </form>\n</main>\n\n<footer>\n  <p>&copy; 2024 WebSprout</p>\n</footer>\n\n<style>\n/* Add focus-visible styles and ensure contrast */\nbody {\n  font-family: sans-serif;\n  color: #1E293B;\n  background: #FFFFFF;\n  max-width: 600px;\n  margin: 0 auto;\n  padding: 24px;\n}\n\nlabel {\n  display: block;\n  margin-top: 16px;\n  font-weight: 600;\n  color: #334155;\n}\n\ninput, textarea {\n  display: block;\n  width: 100%;\n  padding: 8px 12px;\n  margin-top: 4px;\n  border: 2px solid #94A3B8;\n  border-radius: 6px;\n  font-size: 1rem;\n}\n\nbutton[type=\"submit\"] {\n  margin-top: 20px;\n  padding: 10px 24px;\n  background: #2563EB;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-size: 1rem;\n  cursor: pointer;\n}\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n\n/* Add :focus-visible styles */\n</style>",
        language: "html",
      },
      validation: {
        type: "contains-tag",
        criteria: { tag: "label" },
      },
      hints: [
        "Add <a href=\"#main\" class=\"skip-link\">Skip to main content</a> before the header.",
        "Add id=\"main\" and tabindex=\"-1\" to the <main> element.",
        "Wrap inputs in a <fieldset> with a <legend>.",
        "Each input needs a <label for=\"...\"> matching the input's id.",
        "Add <div aria-live=\"polite\" id=\"form-feedback\"></div> before the submit button.",
        "Add *:focus-visible { outline: 2px solid #2563EB; outline-offset: 2px; } to the styles.",
      ],
    },
  ],
};
