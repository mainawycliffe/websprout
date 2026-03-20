import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "forms-styling-forms",
  slug: "styling-forms",
  title: "Styling Forms with CSS",
  description:
    "Learn how to override default browser form styles, create polished inputs, style buttons with hover/active/disabled states, and use accent-color for checkboxes.",
  order: 9,
  steps: [
    {
      id: "why-forms-look-different",
      type: "explanation",
      instruction: {
        heading: "Why forms look different on every browser",
        body: "If you've ever built a form and noticed it looks different on Chrome, Firefox, Safari, and Edge, you're not alone. Form elements are among the hardest things to style consistently in CSS. Here's why.\n\nForm elements like <code>&lt;input&gt;</code>, <code>&lt;select&gt;</code>, <code>&lt;textarea&gt;</code>, and <code>&lt;button&gt;</code> are what CSS specifications call <strong>replaced elements</strong> (or more precisely, elements with native rendering). Unlike a <code>&lt;div&gt;</code> or <code>&lt;p&gt;</code> that the browser renders entirely using its CSS engine, form elements are partially rendered by the operating system itself. That's why a checkbox on macOS looks different from a checkbox on Windows — each OS draws them in its native style.\n\nThe CSS property <code>appearance: none</code> strips away the browser's default styling, giving you a blank canvas to style from scratch:\n<code>input, select, textarea { appearance: none; }</code>\n\nAfter resetting with <code>appearance: none</code>, the element still functions the same (you can still type in it, click it, submit data), but it looks like a plain rectangle that you can style however you want.\n\nAnother common reset is normalizing fonts. By default, form elements don't inherit the page's font — they use the system font. Adding <code>font: inherit;</code> fixes this:\n<code>input, select, textarea, button { font: inherit; }</code>\n\nThis single line makes form elements match the rest of your page's typography, which is usually what you want.",
        docLinks: [
          {
            label: "MDN: Styling web forms",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Styling_web_forms",
            type: "css-concept",
          },
          {
            label: "MDN: appearance property",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/appearance",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Form elements have historically been among the hardest to style because they are rendered partly by the browser and partly by the operating system. The CSS <code>appearance</code> property was introduced to give developers control over this behavior. With <code>appearance: none</code>, the element's native look is removed, allowing full CSS customization. This is now well-supported across all modern browsers.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '/* Reset form element defaults */\ninput,\nselect,\ntextarea,\nbutton {\n  /* Remove native OS styling */\n  appearance: none;\n  /* Inherit page font instead of system font */\n  font: inherit;\n  /* Consistent box model */\n  box-sizing: border-box;\n}',
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "styling-text-inputs",
      type: "explanation",
      instruction: {
        heading: "Styling text inputs and textareas",
        body: "Text inputs and textareas are the easiest form elements to style. After the appearance reset, they're essentially rectangles that respond to all standard CSS properties.\n\nHere's a clean, modern text input style:\n\n<code>input[type=\"text\"],<br>input[type=\"email\"],<br>input[type=\"password\"],<br>textarea {<br>&nbsp;&nbsp;width: 100%;<br>&nbsp;&nbsp;padding: 0.75rem 1rem;<br>&nbsp;&nbsp;border: 2px solid #d1d5db;<br>&nbsp;&nbsp;border-radius: 0.5rem;<br>&nbsp;&nbsp;font-size: 1rem;<br>&nbsp;&nbsp;transition: border-color 0.2s;<br>}</code>\n\nThe <code>:focus</code> state is critical — it tells the user which field is currently active. Never remove the focus indicator (that's an accessibility violation). Instead, make it look great:\n\n<code>input:focus, textarea:focus {<br>&nbsp;&nbsp;outline: none;<br>&nbsp;&nbsp;border-color: #3b82f6;<br>&nbsp;&nbsp;box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);<br>}</code>\n\nThis creates a blue border with a soft glow — similar to what you see on Apple's and Google's forms. The <code>outline: none</code> removes the browser's default outline, and the <code>box-shadow</code> provides a more attractive focus ring.\n\nFor textareas specifically, you might want to control resizing:\n<code>textarea { resize: vertical; }</code>\nThis allows the user to resize the textarea vertically (taller/shorter) but not horizontally, preventing them from breaking your layout.",
        docLinks: [
          {
            label: "MDN: :focus pseudo-class",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/:focus",
            type: "css-selector",
          },
          {
            label: "MDN: border-radius property",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Never use <code>outline: none</code> without providing an alternative focus indicator (like a colored border or box-shadow). Removing the focus outline with no replacement makes the form unusable for keyboard users — they can't tell which field is currently selected. This violates WCAG 2.1 Success Criterion 2.4.7 (Focus Visible).",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'input[type="text"],\ninput[type="email"],\ninput[type="password"],\ntextarea {\n  width: 100%;\n  padding: 0.75rem 1rem;\n  border: 2px solid #d1d5db;\n  border-radius: 0.5rem;\n  font: inherit;\n  font-size: 1rem;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n\ninput:focus,\ntextarea:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);\n}\n\ntextarea {\n  resize: vertical;\n  min-height: 6rem;\n}',
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "styling-buttons",
      type: "explanation",
      instruction: {
        heading: "Styling buttons with hover, active, and disabled states",
        body: "Buttons benefit enormously from thoughtful styling. A well-styled button communicates its purpose and gives feedback when the user interacts with it.\n\nA modern button style includes multiple states:\n\n<strong>Default state</strong> — the button's normal appearance:\n<code>button {<br>&nbsp;&nbsp;padding: 0.75rem 1.5rem;<br>&nbsp;&nbsp;background-color: #3b82f6;<br>&nbsp;&nbsp;color: white;<br>&nbsp;&nbsp;border: none;<br>&nbsp;&nbsp;border-radius: 0.5rem;<br>&nbsp;&nbsp;font-size: 1rem;<br>&nbsp;&nbsp;cursor: pointer;<br>&nbsp;&nbsp;transition: background-color 0.2s;<br>}</code>\n\n<strong><code>:hover</code> state</strong> — when the mouse is over the button:\n<code>button:hover { background-color: #2563eb; }</code>\nA slightly darker shade tells the user \"this is clickable and you're about to click it.\"\n\n<strong><code>:active</code> state</strong> — the moment the button is being pressed:\n<code>button:active { background-color: #1d4ed8; transform: scale(0.98); }</code>\nAn even darker shade with a slight shrink gives satisfying \"pressed\" feedback.\n\n<strong><code>:disabled</code> state</strong> — when the button is not interactive:\n<code>button:disabled { background-color: #9ca3af; cursor: not-allowed; opacity: 0.7; }</code>\nA grayed-out appearance with a \"not-allowed\" cursor clearly communicates that the button can't be clicked.\n\n<strong><code>:focus-visible</code></strong> — focus ring for keyboard users (not mouse users):\n<code>button:focus-visible { outline: 2px solid #3b82f6; outline-offset: 2px; }</code>\nUnlike <code>:focus</code>, <code>:focus-visible</code> only shows the focus ring when the user is navigating with a keyboard, not when they click with a mouse.",
        docLinks: [
          {
            label: "MDN: :hover pseudo-class",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/:hover",
            type: "css-selector",
          },
          {
            label: "MDN: :active pseudo-class",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/:active",
            type: "css-selector",
          },
          {
            label: "MDN: :disabled pseudo-class",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/:disabled",
            type: "css-selector",
          },
          {
            label: "MDN: :focus-visible pseudo-class",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible",
            type: "css-selector",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          'button {\n  padding: 0.75rem 1.5rem;\n  background-color: #3b82f6;\n  color: white;\n  border: none;\n  border-radius: 0.5rem;\n  font: inherit;\n  font-size: 1rem;\n  cursor: pointer;\n  transition: background-color 0.2s, transform 0.1s;\n}\n\nbutton:hover {\n  background-color: #2563eb;\n}\n\nbutton:active {\n  background-color: #1d4ed8;\n  transform: scale(0.98);\n}\n\nbutton:disabled {\n  background-color: #9ca3af;\n  cursor: not-allowed;\n  opacity: 0.7;\n}\n\nbutton:focus-visible {\n  outline: 2px solid #3b82f6;\n  outline-offset: 2px;\n}',
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "styling-select-checkboxes",
      type: "explanation",
      instruction: {
        heading: "Styling select, checkboxes, and radios with accent-color",
        body: "Select dropdowns, checkboxes, and radio buttons have historically been the hardest form elements to style. Each browser renders them using native OS widgets, and overriding that appearance requires significant CSS effort.\n\nFor <code>&lt;select&gt;</code> dropdowns, you can style the closed state (the box the user sees) but the open dropdown menu is controlled by the OS and is very difficult to customize. Basic select styling:\n<code>select {<br>&nbsp;&nbsp;padding: 0.75rem 1rem;<br>&nbsp;&nbsp;border: 2px solid #d1d5db;<br>&nbsp;&nbsp;border-radius: 0.5rem;<br>&nbsp;&nbsp;background-color: white;<br>&nbsp;&nbsp;font: inherit;<br>}</code>\n\nFor checkboxes and radio buttons, CSS introduced the <code>accent-color</code> property — a simple, modern way to change the color of these native controls without fully restyling them:\n<code>input[type=\"checkbox\"],<br>input[type=\"radio\"] {<br>&nbsp;&nbsp;accent-color: #3b82f6;<br>}</code>\n\nThis single property changes the check mark color (checkbox), the dot color (radio), and the progress bar color (<code>&lt;progress&gt;</code>). It respects the native look and feel while matching your brand colors. It's supported in all modern browsers and is the recommended approach unless you need a fully custom design.\n\nFor fully custom checkboxes, the common technique is:\n<ol><li>Hide the native checkbox: <code>appearance: none</code></li><li>Style the element directly with width, height, border, border-radius</li><li>Use <code>:checked</code> pseudo-class to show the check state</li></ol>\n\nThis gives you complete control but requires more CSS work.",
        docLinks: [
          {
            label: "MDN: accent-color property",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color",
            type: "css-property",
          },
          {
            label: "MDN: :checked pseudo-class",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/:checked",
            type: "css-selector",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The <code>accent-color</code> CSS property was added to solve the long-standing problem of coloring form controls. Before it existed, developers had to completely rebuild checkboxes and radios from scratch using CSS hacks. <code>accent-color</code> provides a simple, accessible, standards-based way to theme form controls while keeping their native behavior and accessibility intact.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '/* Simple theming with accent-color */\ninput[type="checkbox"],\ninput[type="radio"] {\n  accent-color: #8b5cf6; /* purple */\n  width: 1.25rem;\n  height: 1.25rem;\n}\n\n/* Styled select dropdown */\nselect {\n  padding: 0.75rem 1rem;\n  border: 2px solid #d1d5db;\n  border-radius: 0.5rem;\n  background-color: white;\n  font: inherit;\n  cursor: pointer;\n}\n\nselect:focus {\n  border-color: #8b5cf6;\n  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);\n}',
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "practice-css-styling",
      type: "gap-fill",
      instruction: {
        heading: "Complete the CSS for a styled form",
        body: "Fill in the blanks to complete the CSS that styles form inputs with rounded corners, a focus effect, and themed checkboxes.",
      },
      config: {
        type: "gap-fill",
        template:
          'input[type="text"],\ninput[type="email"] {\n  padding: 0.75rem 1rem;\n  border: 2px solid #d1d5db;\n  {{radius}}: 0.5rem;\n  font: inherit;\n}\n\ninput:{{focus}} {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);\n}\n\ninput[type="checkbox"] {\n  {{accent}}: #3b82f6;\n}',
        gaps: [
          {
            id: "radius",
            placeholder: "round corners",
            acceptedAnswers: ["border-radius"],
            caseSensitive: false,
          },
          {
            id: "focus",
            placeholder: "focus state",
            acceptedAnswers: ["focus"],
            caseSensitive: false,
          },
          {
            id: "accent",
            placeholder: "control color",
            acceptedAnswers: ["accent-color"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The CSS property for rounded corners is border-radius.",
        "The pseudo-class for when a field is focused is :focus.",
        "The CSS property that colors checkboxes is accent-color.",
      ],
    },
    {
      id: "style-a-form",
      type: "free-edit",
      instruction: {
        heading: "Style a complete form",
        body: "The HTML for a contact form is provided. Your job is to add CSS that transforms it from plain browser defaults into a polished, modern-looking form.\n\nYour CSS should include:\n<ul><li><code>border-radius</code> on inputs and the button</li><li>A <code>:focus</code> effect with a colored border and/or box-shadow</li><li>Button styling with <code>:hover</code> and <code>:active</code> states</li><li><code>accent-color</code> on the checkbox</li><li>Consistent padding and font sizes</li></ul>",
      },
      config: {
        type: "free-edit",
        starterCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Styled Contact Form</title>\n  <style>\n    /* Add your CSS here */\n    body {\n      font-family: system-ui, sans-serif;\n      max-width: 500px;\n      margin: 2rem auto;\n      padding: 0 1rem;\n    }\n\n\n  </style>\n</head>\n<body>\n  <h1>Contact Us</h1>\n  <form action="/contact" method="post">\n    <div style="margin-bottom: 1rem;">\n      <label for="name">Name:</label><br>\n      <input type="text" id="name" name="name" placeholder="Your name" required>\n    </div>\n    <div style="margin-bottom: 1rem;">\n      <label for="email">Email:</label><br>\n      <input type="email" id="email" name="email" placeholder="you@example.com" required>\n    </div>\n    <div style="margin-bottom: 1rem;">\n      <label for="msg">Message:</label><br>\n      <textarea id="msg" name="message" rows="5" placeholder="Your message..." required></textarea>\n    </div>\n    <div style="margin-bottom: 1rem;">\n      <label>\n        <input type="checkbox" name="newsletter" value="yes">\n        Subscribe to our newsletter\n      </label>\n    </div>\n    <button type="submit">Send Message</button>\n  </form>\n</body>\n</html>',
        language: "both",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "border-radius" },
      },
      hints: [
        "Start by styling inputs: width: 100%, padding, border, border-radius.",
        "Add input:focus with outline: none, a colored border-color, and box-shadow.",
        "Style the button with background-color, color: white, border: none, border-radius, padding.",
        "Add button:hover with a darker background-color.",
        "Use accent-color on the checkbox to match your color scheme.",
      ],
    },
  ],
};
