import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "forms-capstone",
  slug: "capstone",
  title: "Capstone: Multi-Section Registration Form",
  description:
    "Put everything together! Build a complete, multi-section, validated, accessible, and styled registration form using all the skills you've learned.",
  order: 12,
  steps: [
    {
      id: "capstone-overview",
      type: "explanation",
      instruction: {
        heading: "What we're building",
        body: "In this capstone lesson, you'll combine everything you've learned about HTML forms into one comprehensive project: a multi-section registration form for a fictional online learning platform called \"WebSprout Academy.\"\n\nThe final form will have:\n<ul><li><strong>Personal Information</strong> — name, email, phone, birthday (text inputs, email, tel, date)</li><li><strong>Account Details</strong> — username, password with validation (pattern, minlength, required)</li><li><strong>Preferences</strong> — favorite language (select/option), interests (checkboxes), experience level (radio buttons)</li><li><strong>CSS styling</strong> — polished inputs, buttons, focus states, validation colors</li><li><strong>Accessibility</strong> — fieldset/legend grouping, aria-describedby, labels for every control</li></ul>\n\nThis form represents the kind of real registration form you'd find on GitHub, Coursera, or any modern web application. Each step builds one section, and by the end you'll have a complete, production-quality form.\n\nLet's get started!",
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- Preview of what we\'re building -->\n<form action="/register" method="post">\n  <h1>Join WebSprout Academy</h1>\n\n  <fieldset>\n    <legend>Personal Information</legend>\n    <!-- name, email, phone, birthday -->\n  </fieldset>\n\n  <fieldset>\n    <legend>Account Details</legend>\n    <!-- username, password with validation -->\n  </fieldset>\n\n  <fieldset>\n    <legend>Preferences</legend>\n    <!-- select, checkboxes, radio buttons -->\n  </fieldset>\n\n  <button type="submit">Create Account</button>\n</form>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "capstone-personal-info",
      type: "gap-fill",
      instruction: {
        heading: "Section 1: Personal Information",
        body: "Complete the Personal Information section. Each field needs proper label wiring, the correct input type, and the <code>required</code> attribute where appropriate. Pay attention to which input type matches each field's purpose.",
      },
      config: {
        type: "gap-fill",
        template:
          '<fieldset>\n  <legend>Personal Information</legend>\n\n  <label {{forid1}}="fullname">Full Name:</label>\n  <input type="text" id="fullname" name="full_name" {{req}} placeholder="Jane Doe">\n\n  <label for="email">Email Address:</label>\n  <input type="{{emailtype}}" id="email" name="email" {{req}} placeholder="jane@example.com">\n\n  <label for="phone">Phone Number:</label>\n  <input type="{{phonetype}}" id="phone" name="phone" placeholder="555-123-4567">\n\n  <label for="bday">Birthday:</label>\n  <input type="{{datetype}}" id="bday" name="birthday">\n</fieldset>',
        gaps: [
          {
            id: "forid1",
            placeholder: "label attribute",
            acceptedAnswers: ["for"],
            caseSensitive: false,
          },
          {
            id: "req",
            placeholder: "mandatory",
            acceptedAnswers: ["required"],
            caseSensitive: false,
          },
          {
            id: "emailtype",
            placeholder: "email input type",
            acceptedAnswers: ["email"],
            caseSensitive: false,
          },
          {
            id: "phonetype",
            placeholder: "phone input type",
            acceptedAnswers: ["tel"],
            caseSensitive: false,
          },
          {
            id: "datetype",
            placeholder: "date input type",
            acceptedAnswers: ["date"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The label attribute that points to an input's id is \"for\".",
        "The boolean attribute that makes a field mandatory is \"required\".",
        "The input type for email addresses is \"email\".",
        "The input type for phone numbers is \"tel\".",
        "The input type for dates with a calendar picker is \"date\".",
      ],
    },
    {
      id: "capstone-account-details",
      type: "gap-fill",
      instruction: {
        heading: "Section 2: Account Details with validation",
        body: "Complete the Account Details section with proper validation. The username should allow only letters, numbers, and underscores (3-20 characters). The password must be at least 8 characters. The email confirmation should use the email type for built-in validation.",
      },
      config: {
        type: "gap-fill",
        template:
          '<fieldset>\n  <legend>Account Details</legend>\n\n  <label for="username">Username:</label>\n  <input type="text" id="username" name="username"\n    {{pat}}="[A-Za-z0-9_]{3,20}"\n    title="3-20 letters, numbers, or underscores"\n    required aria-describedby="user-help">\n  <p id="user-help">3-20 characters. Letters, numbers, and underscores only.</p>\n\n  <label for="password">Password:</label>\n  <input type="password" id="password" name="password"\n    {{minattr}}="8" required\n    aria-describedby="pw-help">\n  <p id="pw-help">At least 8 characters.</p>\n\n  <label for="confirm-email">Confirm Email:</label>\n  <input type="{{etype}}" id="confirm-email" name="confirm_email" required>\n</fieldset>',
        gaps: [
          {
            id: "pat",
            placeholder: "regex validation",
            acceptedAnswers: ["pattern"],
            caseSensitive: false,
          },
          {
            id: "minattr",
            placeholder: "minimum chars",
            acceptedAnswers: ["minlength"],
            caseSensitive: false,
          },
          {
            id: "etype",
            placeholder: "email type",
            acceptedAnswers: ["email"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The attribute for regex validation is \"pattern\".",
        "The attribute for minimum character count is \"minlength\".",
        "To get automatic email validation, use type=\"email\".",
      ],
    },
    {
      id: "capstone-preferences",
      type: "gap-fill",
      instruction: {
        heading: "Section 3: Preferences",
        body: "Complete the Preferences section with a select dropdown, a checkbox group for interests, and a radio button group for experience level. Remember: radios in a group share the same <code>name</code>, and the <code>&lt;select&gt;</code> needs <code>&lt;option&gt;</code> elements.",
      },
      config: {
        type: "gap-fill",
        template:
          '<fieldset>\n  <legend>Preferences</legend>\n\n  <label for="language">Favorite Language:</label>\n  <{{sel}} id="language" name="language">\n    <option value="" disabled selected>Choose...</option>\n    <option value="html">HTML</option>\n    <option value="css">CSS</option>\n    <option value="js">JavaScript</option>\n    <option value="python">Python</option>\n  </{{sel}}>\n\n  <p>Interests (select all that apply):</p>\n  <label><input type="{{chk}}" name="interests" value="frontend"> Frontend</label>\n  <label><input type="{{chk}}" name="interests" value="backend"> Backend</label>\n  <label><input type="{{chk}}" name="interests" value="design"> Design</label>\n\n  <p>Experience Level:</p>\n  <label><input type="{{rad}}" name="experience" value="beginner"> Beginner</label>\n  <label><input type="{{rad}}" name="experience" value="intermediate"> Intermediate</label>\n  <label><input type="{{rad}}" name="experience" value="advanced"> Advanced</label>\n</fieldset>',
        gaps: [
          {
            id: "sel",
            placeholder: "dropdown element",
            acceptedAnswers: ["select"],
            caseSensitive: false,
          },
          {
            id: "chk",
            placeholder: "multi-select type",
            acceptedAnswers: ["checkbox"],
            caseSensitive: false,
          },
          {
            id: "rad",
            placeholder: "single-select type",
            acceptedAnswers: ["radio"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The element that creates a dropdown menu is <select>.",
        "For selecting multiple options, use type=\"checkbox\".",
        "For selecting exactly one option, use type=\"radio\".",
      ],
    },
    {
      id: "capstone-styling",
      type: "free-edit",
      instruction: {
        heading: "Style the registration form",
        body: "Now add CSS to make the form look polished and professional. Write CSS that includes:\n\n<ul><li>Styled text inputs with <code>border-radius</code>, padding, and a consistent border</li><li>A <code>:focus</code> effect with a colored border and box-shadow</li><li>Validation colors using <code>:valid</code> and <code>:invalid</code> (after user interaction)</li><li>A styled submit button with <code>:hover</code> and <code>:active</code> states</li><li><code>accent-color</code> on checkboxes and radio buttons</li><li>Clean fieldset and legend styling</li></ul>",
      },
      config: {
        type: "free-edit",
        starterCode:
          "/* Style the registration form */\n\n/* Reset form element fonts */\n\n/* Text inputs and select styling */\n\n/* Focus states */\n\n/* Validation colors */\n\n/* Button styling with hover/active */\n\n/* Checkbox/radio accent color */\n\n/* Fieldset and legend */\n",
        language: "css",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "border-radius" },
      },
      hints: [
        "Start with input, select, textarea { font: inherit; padding: 0.75rem; border: 2px solid #d1d5db; border-radius: 0.5rem; }",
        "Add input:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59,130,246,0.2); }",
        "Style the button: background-color, color: white, border: none, border-radius, cursor: pointer.",
        "Add accent-color: #3b82f6 to checkboxes and radios.",
      ],
    },
    {
      id: "capstone-accessibility",
      type: "free-edit",
      instruction: {
        heading: "Add accessibility features",
        body: "Enhance the form with accessibility features. Write the HTML for a registration form that includes:\n\n<ul><li>Three <code>&lt;fieldset&gt;</code> sections with descriptive <code>&lt;legend&gt;</code> elements</li><li><code>aria-describedby</code> linking the password field to its help text</li><li>An <code>aria-live=\"polite\"</code> region for error messages</li><li><code>aria-required=\"true\"</code> on required fields for extra assistive technology support</li><li>Proper label/input associations throughout</li></ul>",
      },
      config: {
        type: "free-edit",
        starterCode:
          '<form action="/register" method="post">\n  <h1>Join WebSprout Academy</h1>\n\n  <!-- Error announcement region -->\n\n  <!-- Fieldset 1: Personal Information -->\n\n  <!-- Fieldset 2: Account Details (with aria-describedby on password) -->\n\n  <!-- Fieldset 3: Preferences (radio group, checkbox group) -->\n\n  <button type="submit">Create Account</button>\n</form>',
        language: "html",
      },
      validation: { type: "contains-tag", criteria: { tag: "fieldset" } },
      hints: [
        "Add <div aria-live=\"polite\" id=\"form-errors\"></div> at the top of the form.",
        "Wrap each section in <fieldset><legend>Section Name</legend>...</fieldset>.",
        "Add aria-describedby=\"pw-help\" on the password input and id=\"pw-help\" on its helper text.",
        "Add aria-required=\"true\" alongside the required attribute for maximum compatibility.",
      ],
    },
    {
      id: "capstone-complete",
      type: "free-edit",
      instruction: {
        heading: "Complete the full registration form",
        body: "This is the final step! Build the complete multi-section registration form from the template below. Combine everything: proper HTML structure, validation attributes, accessibility features, and CSS styling. This is your chance to create something you'd be proud to put on a real website.\n\nThe form should:\n<ul><li>Have three fieldset sections (Personal Info, Account Details, Preferences)</li><li>Use appropriate input types (text, email, tel, date, password, number)</li><li>Include validation (required, minlength, pattern, type-based validation)</li><li>Be accessible (labels, fieldset/legend, aria-describedby)</li><li>Look polished with CSS (border-radius, focus states, button hover, accent-color)</li></ul>",
      },
      config: {
        type: "free-edit",
        starterCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Join WebSprout Academy</title>\n  <style>\n    body {\n      font-family: system-ui, -apple-system, sans-serif;\n      max-width: 600px;\n      margin: 2rem auto;\n      padding: 0 1rem;\n      color: #1f2937;\n    }\n    h1 {\n      text-align: center;\n      color: #3b82f6;\n    }\n\n    /* Add your form styles here */\n\n  </style>\n</head>\n<body>\n  <form action="/register" method="post">\n    <h1>Join WebSprout Academy</h1>\n\n    <!-- Build the complete form here -->\n\n    <button type="submit">Create Account</button>\n  </form>\n</body>\n</html>',
        language: "both",
      },
      validation: { type: "contains-tag", criteria: { tag: "form" } },
      hints: [
        "Start with <fieldset><legend>Personal Information</legend> containing name (text), email (email), phone (tel), birthday (date) fields.",
        "Add <fieldset><legend>Account Details</legend> with username (pattern-validated) and password (minlength) fields.",
        "Add <fieldset><legend>Preferences</legend> with a select dropdown, checkboxes, and radio buttons.",
        "Style everything with CSS: border-radius on inputs, :focus effects, button:hover, accent-color.",
        "Don't forget labels for every field, required on mandatory fields, and aria-describedby for help text.",
      ],
    },
  ],
};
