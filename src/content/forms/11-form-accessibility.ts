import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "forms-form-accessibility",
  slug: "form-accessibility",
  title: "Form Accessibility",
  description:
    "Make your forms usable by everyone — proper grouping with fieldset/legend, ARIA attributes for help text, error handling, and keyboard navigation.",
  order: 11,
  steps: [
    {
      id: "why-accessible-forms",
      type: "explanation",
      instruction: {
        heading: "Why accessible forms matter",
        body: "Forms are the gatekeepers of the internet. Want to create an account? Fill out a form. Need to buy something? Fill out a form. Applying for a job? Fill out a form. If a form is inaccessible, it doesn't just cause mild inconvenience — it can completely block someone from essential services.\n\nApproximately 15% of the world's population — over one billion people — live with some form of disability. Many of these people rely on assistive technologies like screen readers, voice control software, switch devices, or keyboard-only navigation to use the web. When a form is not built with accessibility in mind, these users may:\n\n<ul><li>Not know what a field is asking for (missing labels)</li><li>Not understand which fields are required (no clear indication)</li><li>Not be able to navigate to all fields (broken tab order)</li><li>Not receive error messages (errors only communicated visually)</li><li>Not understand how fields are related (no grouping)</li></ul>\n\nThe good news is that most form accessibility comes from using standard HTML correctly — elements and attributes you already know. Labels, fieldsets, legends, and proper input types get you 80% of the way there. ARIA attributes handle the remaining edge cases.\n\nAccessibility is not just about compliance or avoiding lawsuits (though inaccessible websites do face legal action). It's about building forms that work for everyone — including users on slow connections, users with temporary injuries, users in bright sunlight, and users in a hurry. Accessible forms are better forms, period.",
        docLinks: [
          {
            label: "MDN: Creating accessible forms",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/How_to_structure_a_web_form#creating_accessible_forms",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "WCAG 2.1 includes multiple success criteria specifically about forms: 1.3.1 (Info and Relationships) requires programmatic label associations, 3.3.1 (Error Identification) requires errors to be described in text, 3.3.2 (Labels or Instructions) requires labels for user input, and 4.1.2 (Name, Role, Value) requires all form controls to have accessible names. Proper HTML form markup naturally satisfies most of these.",
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
      id: "fieldset-legend-grouping",
      type: "explanation",
      instruction: {
        heading: "Fieldset and legend — grouping for screen readers",
        body: "We covered <code>&lt;fieldset&gt;</code> and <code>&lt;legend&gt;</code> briefly in an earlier lesson, but their accessibility impact deserves a deeper look. These elements are not just visual decoration — they provide critical context to screen reader users.\n\nWhen a screen reader encounters a group of radio buttons without a fieldset, it announces each option individually: \"Small, radio button. Medium, radio button. Large, radio button.\" The user has no idea what they're choosing. Small <em>what</em>? Medium <em>what</em>?\n\nWith a fieldset and legend, the screen reader announces: \"Pizza size: Small, radio button. Pizza size: Medium, radio button. Pizza size: Large, radio button.\" Now the context is clear — they're choosing a pizza size.\n\nThe magic is that the <code>&lt;legend&gt;</code> text is prepended to every control announcement within the fieldset. This happens automatically — no JavaScript or ARIA needed. It's built into how browsers communicate with screen readers.\n\n<strong>When to use fieldset/legend:</strong>\n<ul><li>Radio button groups — always. Without a legend, the question being asked is invisible to screen readers.</li><li>Checkbox groups — when the checkboxes relate to a single question (\"Select your interests:\").</li><li>Related field sections — like \"Shipping Address\" vs \"Billing Address\" to distinguish fields with the same labels (both have a \"Street\" field, but the legend clarifies which address).</li></ul>\n\nYou can nest fieldsets for sub-groups, and you can style or even visually hide the legend while keeping it accessible using CSS techniques like <code>.visually-hidden</code>.",
        docLinks: [
          {
            label: "MDN: <fieldset> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset",
            type: "html-element",
          },
          {
            label: "MDN: <legend> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend",
            type: "html-element",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<form action="/order" method="post">\n  <fieldset>\n    <legend>Pizza Size</legend>\n    <label><input type="radio" name="size" value="small"> Small (10")</label><br>\n    <label><input type="radio" name="size" value="medium"> Medium (12")</label><br>\n    <label><input type="radio" name="size" value="large"> Large (14")</label>\n  </fieldset>\n\n  <fieldset>\n    <legend>Delivery Address</legend>\n    <label for="street">Street:</label>\n    <input type="text" id="street" name="street" required><br>\n    <label for="city">City:</label>\n    <input type="text" id="city" name="city" required>\n  </fieldset>\n\n  <button type="submit">Place Order</button>\n</form>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "aria-describedby",
      type: "explanation",
      instruction: {
        heading: "aria-describedby — linking help text to fields",
        body: "Sometimes a label isn't enough. You might need to provide additional instructions, format requirements, or help text for a form field. The <code>aria-describedby</code> attribute connects a field to one or more elements that describe it.\n\nFor example, a password field might have helper text explaining the requirements:\n\n<code>&lt;label for=\"pw\"&gt;Password:&lt;/label&gt;<br>&lt;input type=\"password\" id=\"pw\" name=\"password\" aria-describedby=\"pw-help\"&gt;<br>&lt;p id=\"pw-help\"&gt;Must be at least 8 characters with one number.&lt;/p&gt;</code>\n\nWhen a screen reader focuses this input, it announces: \"Password, edit text. Must be at least 8 characters with one number.\" The label provides the field name, and <code>aria-describedby</code> provides the additional description.\n\nThis is different from the label — the label is the field's <em>name</em> (\"Password\"), while <code>aria-describedby</code> provides <em>supplementary information</em> (format requirements, constraints, examples).\n\nYou can reference multiple IDs separated by spaces:\n<code>aria-describedby=\"pw-help pw-error\"</code>\nThis is useful when a field has both help text and a dynamic error message.\n\n<strong>Common uses:</strong>\n<ul><li>Password requirements</li><li>Input format hints (\"Format: MM/DD/YYYY\")</li><li>Character count remaining</li><li>Error messages specific to a field</li><li>Terms and conditions linked to a checkbox</li></ul>",
        docLinks: [
          {
            label: "MDN: aria-describedby",
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby",
            type: "html-attribute",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Don't put help text only in the <code>placeholder</code> attribute. Placeholder text disappears when the user starts typing, and it's often displayed in low-contrast gray. Instead, use visible help text below the field connected with <code>aria-describedby</code>. This ensures the information is always visible and always announced by screen readers.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<form action="/register" method="post">\n  <div>\n    <label for="username">Username:</label>\n    <input type="text" id="username" name="username"\n      aria-describedby="user-help" required>\n    <p id="user-help" style="font-size: 0.875rem; color: #6b7280;">\n      3-20 characters. Letters, numbers, and underscores only.\n    </p>\n  </div>\n\n  <div>\n    <label for="pw">Password:</label>\n    <input type="password" id="pw" name="password"\n      aria-describedby="pw-help" required minlength="8">\n    <p id="pw-help" style="font-size: 0.875rem; color: #6b7280;">\n      Must be at least 8 characters with one number and one uppercase letter.\n    </p>\n  </div>\n\n  <button type="submit">Create Account</button>\n</form>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "error-messages-aria-live",
      type: "explanation",
      instruction: {
        heading: "Error messages and aria-live regions",
        body: "When a form has validation errors, sighted users can see the red text and error icons. But screen reader users need errors announced audibly. This is where <code>aria-live</code> regions come in.\n\nAn <code>aria-live</code> region tells screen readers: \"Watch this area. Whenever its content changes, announce the new content out loud.\" This is perfect for dynamic error messages that appear after the user tries to submit or leaves a field.\n\n<code>&lt;div aria-live=\"polite\" id=\"email-error\"&gt;&lt;/div&gt;</code>\n\nWhen JavaScript adds an error message to this div, the screen reader automatically announces it. The <code>polite</code> value means \"wait until the user finishes what they're doing, then announce.\" For critical errors, you can use <code>assertive</code>, which interrupts whatever the screen reader is currently saying.\n\nBest practices for form errors:\n\n<ul><li><strong>Identify the field with the error</strong> — don't just say \"There was an error.\" Say \"Email: Please enter a valid email address.\"</li><li><strong>Connect errors to fields</strong> — use <code>aria-describedby</code> to link the error message to its field, so the error is announced when the user focuses the field.</li><li><strong>Use <code>aria-invalid=\"true\"</code></strong> on fields that have errors. This tells the screen reader the field's current value is invalid.</li><li><strong>Provide a summary</strong> — for forms with multiple errors, add a summary at the top listing all errors with links to each field.</li><li><strong>Set focus</strong> — after submission fails, move focus to the first field with an error or to the error summary.</li></ul>",
        docLinks: [
          {
            label: "MDN: aria-live attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live",
            type: "html-attribute",
          },
          {
            label: "MDN: aria-invalid attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid",
            type: "html-attribute",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "WCAG 2.1 Success Criterion 3.3.1 (Error Identification) requires that if an input error is automatically detected, the item that is in error is identified and the error is described to the user in text. Success Criterion 3.3.3 (Error Suggestion) additionally requires that if an error is detected and suggestions for correction are known, the suggestions are provided to the user. Using <code>aria-live</code> regions ensures these error descriptions reach screen reader users.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<form action="/register" method="post">\n  <!-- Error summary at top -->\n  <div role="alert" aria-live="assertive" id="error-summary"\n    style="color: red; display: none;">\n    <!-- Errors appear here dynamically -->\n  </div>\n\n  <div>\n    <label for="email">Email:</label>\n    <input type="email" id="email" name="email"\n      aria-describedby="email-error"\n      aria-invalid="false" required>\n    <div id="email-error" aria-live="polite"\n      style="color: red; font-size: 0.875rem;">\n      <!-- Error message appears here when invalid -->\n    </div>\n  </div>\n\n  <button type="submit">Register</button>\n</form>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "keyboard-navigation",
      type: "explanation",
      instruction: {
        heading: "Keyboard navigation — Tab, Enter, and focus management",
        body: "Many users navigate forms entirely with the keyboard — people with motor disabilities, power users who prefer keyboard shortcuts, and anyone whose mouse or trackpad is unavailable. Your form must be fully usable without a mouse.\n\n<strong>Tab order:</strong> When a user presses the Tab key, focus moves to the next interactive element on the page. By default, the tab order follows the DOM order — the order elements appear in your HTML. If your HTML is written in a logical order, the tab order is automatically correct. This is one of many reasons to write semantic, well-ordered HTML.\n\n<strong>The <code>tabindex</code> attribute:</strong>\n<ul><li><code>tabindex=\"0\"</code> — makes a non-interactive element (like a <code>&lt;div&gt;</code>) focusable via Tab. Use this sparingly — prefer native interactive elements.</li><li><code>tabindex=\"-1\"</code> — removes an element from the tab order but allows it to be focused programmatically with JavaScript. Useful for focus management (moving focus to an error summary).</li><li><code>tabindex=\"1\"</code> or higher — changes the tab order. <strong>Avoid this</strong> — it creates a confusing, non-sequential tab order that is nearly impossible to maintain.</li></ul>\n\n<strong>Enter to submit:</strong> When a text input is focused in a form, pressing Enter submits the form. This is expected behavior — users rely on it. Make sure your forms support this.\n\n<strong><code>:focus-visible</code></strong> is a CSS pseudo-class that shows focus rings only when the user is navigating with the keyboard (not when clicking with a mouse). This gives keyboard users the visual indicator they need without adding focus rings for mouse users:\n<code>input:focus-visible { outline: 2px solid #3b82f6; outline-offset: 2px; }</code>\n\nTest your forms by putting your mouse away and navigating with only Tab, Shift+Tab, Enter, Space, and arrow keys. If you can't fill out and submit the form with the keyboard alone, it needs work.",
        docLinks: [
          {
            label: "MDN: tabindex attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex",
            type: "html-attribute",
          },
          {
            label: "MDN: :focus-visible pseudo-class",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible",
            type: "css-selector",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "WCAG 2.1 Success Criterion 2.1.1 (Keyboard) requires that all functionality is operable through a keyboard interface. This means every form field must be reachable via Tab, every button activatable via Enter or Space, and every radio/checkbox toggleable via Space. Success Criterion 2.4.7 (Focus Visible) requires a visible focus indicator. Using native HTML form elements automatically satisfies these criteria — custom-built form controls often do not.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- Keyboard-friendly form styles -->\n<style>\n  /* Focus ring for keyboard users only */\n  input:focus-visible,\n  select:focus-visible,\n  textarea:focus-visible,\n  button:focus-visible {\n    outline: 2px solid #3b82f6;\n    outline-offset: 2px;\n  }\n\n  /* Remove default outline for mouse users */\n  input:focus:not(:focus-visible),\n  button:focus:not(:focus-visible) {\n    outline: none;\n  }\n</style>\n\n<form action="/test" method="post">\n  <!-- Tab moves through these in order -->\n  <label for="first">First Name:</label>\n  <input type="text" id="first" name="first"><br>\n\n  <label for="last">Last Name:</label>\n  <input type="text" id="last" name="last"><br>\n\n  <button type="submit">Submit</button>\n</form>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "build-accessible-form",
      type: "free-edit",
      instruction: {
        heading: "Enhance a form with accessibility features",
        body: "Take the starter code and add accessibility features to make it fully usable by screen reader and keyboard users. Add:\n\n<ul><li><code>&lt;fieldset&gt;</code> and <code>&lt;legend&gt;</code> to group the personal info fields and the preferences section</li><li><code>aria-describedby</code> on the password field linking to the help text</li><li>An <code>aria-live=\"polite\"</code> region for potential error messages</li><li><code>:focus-visible</code> styles in the CSS</li><li><code>required</code> attributes on mandatory fields</li></ul>",
        docLinks: [
          {
            label: "MDN: Creating accessible forms",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/How_to_structure_a_web_form#creating_accessible_forms",
            type: "html-concept",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Accessible Form</title>\n  <style>\n    body { font-family: system-ui, sans-serif; max-width: 500px; margin: 2rem auto; }\n    label { display: block; margin-top: 1rem; font-weight: bold; }\n    input, select { display: block; width: 100%; padding: 0.5rem; margin-top: 0.25rem; }\n    button { margin-top: 1.5rem; padding: 0.75rem 1.5rem; }\n    .help-text { font-size: 0.875rem; color: #6b7280; margin-top: 0.25rem; }\n  </style>\n</head>\n<body>\n  <h1>Registration</h1>\n  <form action="/register" method="post">\n\n    <!-- Add fieldset/legend, aria-describedby, aria-live, etc. -->\n\n    <label for="name">Full Name:</label>\n    <input type="text" id="name" name="name">\n\n    <label for="email">Email:</label>\n    <input type="email" id="email" name="email">\n\n    <label for="pw">Password:</label>\n    <input type="password" id="pw" name="password" minlength="8">\n    <p class="help-text">At least 8 characters with one number.</p>\n\n    <label for="role">Role:</label>\n    <select id="role" name="role">\n      <option value="" disabled selected>Choose...</option>\n      <option value="student">Student</option>\n      <option value="teacher">Teacher</option>\n    </select>\n\n    <button type="submit">Register</button>\n  </form>\n</body>\n</html>',
        language: "html",
      },
      validation: { type: "contains-tag", criteria: { tag: "fieldset" } },
      hints: [
        "Wrap name, email, and password fields in <fieldset><legend>Account Details</legend>...</fieldset>.",
        "Add aria-describedby=\"pw-help\" to the password input and id=\"pw-help\" to the help text paragraph.",
        "Add an empty <div aria-live=\"polite\" id=\"form-errors\"></div> for error announcements.",
        "Add required to the name, email, and password fields.",
        "Add :focus-visible styles in the <style> block.",
      ],
    },
  ],
};
