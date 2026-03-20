import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "forms-html5-validation",
  slug: "html5-validation",
  title: "HTML5 Form Validation",
  description:
    "Learn how to validate form data using built-in HTML attributes — required, minlength, pattern, and more — plus CSS pseudo-classes for styling valid/invalid fields.",
  order: 8,
  steps: [
    {
      id: "why-validate",
      type: "explanation",
      instruction: {
        heading: "Why validate form data?",
        body: "Form validation is the process of checking that user input meets certain requirements before it is submitted. Without validation, users can submit incomplete, incorrectly formatted, or nonsensical data — leading to errors, confusion, and wasted time.\n\nConsider a registration form that requires an email address. Without validation, a user might type \"hello\" instead of \"hello@example.com\". The form submits, the server tries to send a confirmation email to \"hello\", it fails, and the user never knows why they didn't receive their account verification. Validation catches this mistake immediately and tells the user: \"Please enter a valid email address.\"\n\nHTML5 introduced built-in validation attributes that work without any JavaScript. The browser itself checks the data and shows error messages when requirements aren't met. This is called <strong>client-side validation</strong> — it happens in the user's browser before any data is sent to the server.\n\nHTML5 validation provides instant feedback (the user doesn't have to wait for a server response), reduces server load (invalid submissions are caught before they're sent), and improves user experience (clear, immediate error messages).\n\nBut there's a critical caveat: client-side validation is a convenience, not a security measure. A knowledgeable user can bypass it by modifying the HTML in their browser's developer tools. Server-side validation is always required for security.",
        analogy: "Think of form validation like a bouncer at a concert venue. The bouncer checks your ticket at the door before you enter. If your ticket is expired, the wrong date, or clearly fake, the bouncer catches it immediately and turns you away — you don't have to walk all the way inside only to be escorted out by security later. Client-side validation is the bouncer at the door (quick, convenient). Server-side validation is security inside the venue (the real protection). You need both.",
        docLinks: [
          {
            label: "MDN: Client-side form validation",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Client-side validation should never replace server-side validation. HTML validation attributes can be removed or modified by anyone using browser developer tools. Always validate data on the server as well. Think of client-side validation as a helpful user experience enhancement, not a security mechanism.",
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
      id: "required-attribute",
      type: "explanation",
      instruction: {
        heading: "The required attribute — \"you must fill this in\"",
        body: "The simplest and most common validation attribute is <code>required</code>. Adding it to any form field tells the browser: \"This field cannot be left empty. The form must not submit until this field has a value.\"\n\n<code>&lt;input type=\"text\" name=\"username\" required&gt;</code>\n\nWhen the user tries to submit a form with an empty required field, the browser:\n<ol><li>Prevents the form from submitting</li><li>Scrolls to the first invalid field</li><li>Shows a built-in error message like \"Please fill out this field\"</li></ol>\n\nThe <code>required</code> attribute is a <strong>boolean attribute</strong> — its mere presence enables the behavior. You write <code>required</code>, not <code>required=\"true\"</code> (though that also works). To disable the requirement, you remove the attribute entirely.\n\n<code>required</code> works on most form elements:\n<ul><li><code>&lt;input&gt;</code> (text, email, password, number, date, etc.)</li><li><code>&lt;textarea&gt;</code></li><li><code>&lt;select&gt;</code> (requires a non-empty value to be selected)</li><li>Radio buttons (at least one in the group must be selected)</li><li>Checkboxes (the specific checkbox must be checked — useful for \"I agree to terms\")</li></ul>\n\nReal-world example: Almost every login form marks both email and password as required. Amazon's checkout won't proceed without a shipping address. Any field that the system cannot function without should be <code>required</code>.",
        docLinks: [
          {
            label: "MDN: required attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required",
            type: "html-attribute",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "For <code>&lt;select&gt;</code> elements, <code>required</code> only works if the placeholder option has an empty <code>value</code>: <code>&lt;option value=\"\"&gt;Choose...&lt;/option&gt;</code>. If all options have non-empty values, the select is always considered valid because something is always selected.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<form action="/register" method="post">\n  <label for="user">Username (required):</label>\n  <input type="text" id="user" name="username" required><br><br>\n\n  <label for="email">Email (required):</label>\n  <input type="email" id="email" name="email" required><br><br>\n\n  <label for="bio">Bio (optional):</label>\n  <textarea id="bio" name="bio" rows="3"></textarea><br><br>\n\n  <label>\n    <input type="checkbox" name="terms" required>\n    I agree to the Terms of Service\n  </label><br><br>\n\n  <button type="submit">Register</button>\n</form>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "length-range-constraints",
      type: "explanation",
      instruction: {
        heading: "Length and range constraints: minlength, maxlength, min, max, step",
        body: "Beyond just requiring a field to be filled in, you can constrain what values are acceptable using several built-in attributes.\n\n<strong>For text fields (<code>&lt;input type=\"text\"&gt;</code>, <code>&lt;textarea&gt;</code>):</strong>\n<ul><li><code>minlength</code> — the minimum number of characters required. A password field with <code>minlength=\"8\"</code> rejects anything shorter than 8 characters.</li><li><code>maxlength</code> — the maximum number of characters allowed. The browser actually prevents the user from typing beyond this limit. Twitter's 280-character limit is enforced with <code>maxlength=\"280\"</code>.</li></ul>\n\n<strong>For numeric and date fields (<code>&lt;input type=\"number\"&gt;</code>, <code>&lt;input type=\"date\"&gt;</code>, <code>&lt;input type=\"range\"&gt;</code>):</strong>\n<ul><li><code>min</code> — the minimum acceptable value. <code>min=\"1\"</code> prevents zero or negative numbers.</li><li><code>max</code> — the maximum acceptable value. <code>max=\"100\"</code> rejects anything above 100.</li><li><code>step</code> — the increment between valid values. <code>step=\"5\"</code> means only multiples of 5 are valid (5, 10, 15...). <code>step=\"0.01\"</code> allows cents in a price field.</li></ul>\n\nThese attributes provide validation and also enhance the UI. Number inputs show spinner arrows that respect min/max/step. Date inputs gray out dates outside the min/max range. Range sliders snap to step intervals.\n\nYou can combine these attributes: <code>&lt;input type=\"number\" min=\"1\" max=\"10\" step=\"1\" required&gt;</code> creates a required field that only accepts whole numbers from 1 to 10.",
        docLinks: [
          {
            label: "MDN: minlength attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/minlength",
            type: "html-attribute",
          },
          {
            label: "MDN: maxlength attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/maxlength",
            type: "html-attribute",
          },
          {
            label: "MDN: min attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/min",
            type: "html-attribute",
          },
          {
            label: "MDN: max attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/max",
            type: "html-attribute",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<form action="/profile" method="post">\n  <label for="user">Username (3-20 characters):</label>\n  <input type="text" id="user" name="username"\n    minlength="3" maxlength="20" required><br><br>\n\n  <label for="pw">Password (min 8 characters):</label>\n  <input type="password" id="pw" name="password"\n    minlength="8" required><br><br>\n\n  <label for="age">Age (18-120):</label>\n  <input type="number" id="age" name="age"\n    min="18" max="120" step="1"><br><br>\n\n  <label for="donation">Donation ($5-$500, increments of $5):</label>\n  <input type="number" id="donation" name="donation"\n    min="5" max="500" step="5"><br><br>\n\n  <button type="submit">Save</button>\n</form>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "pattern-attribute",
      type: "explanation",
      instruction: {
        heading: "The pattern attribute — custom validation with regex",
        body: "For validation rules that go beyond simple length or range checks, the <code>pattern</code> attribute lets you define a custom validation rule using a <strong>regular expression</strong> (regex). A regular expression is a pattern that describes what valid input looks like.\n\nFor example, to require a 5-digit US zip code:\n<code>&lt;input type=\"text\" name=\"zip\" pattern=\"[0-9]{5}\"&gt;</code>\n\nThe pattern <code>[0-9]{5}</code> means \"exactly 5 digits (0-9)\". If the user types \"1234\" (too short) or \"abcde\" (not digits), the browser blocks submission and shows an error.\n\nCommon patterns:\n<ul><li><code>[A-Za-z]{2,}</code> — two or more letters only (no numbers/symbols)</li><li><code>[0-9]{3}-[0-9]{3}-[0-9]{4}</code> — US phone format: 123-456-7890</li><li><code>[A-Za-z0-9_]{3,16}</code> — username: 3-16 alphanumeric characters or underscore</li><li><code>.{8,}</code> — any 8 or more characters (basic password length check)</li></ul>\n\nThe browser automatically anchors the pattern to the full value — you don't need to add <code>^</code> (start) and <code>$</code> (end) markers. The pattern <code>[0-9]{5}</code> matches exactly 5 digits, not \"contains 5 digits somewhere\".\n\nAlways pair <code>pattern</code> with the <code>title</code> attribute. The <code>title</code> text is included in the browser's error message, telling the user what format is expected:\n<code>&lt;input pattern=\"[0-9]{5}\" title=\"Please enter a 5-digit zip code\"&gt;</code>",
        docLinks: [
          {
            label: "MDN: pattern attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern",
            type: "html-attribute",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Always include a <code>title</code> attribute when using <code>pattern</code>. Without it, the browser shows a generic error like \"Please match the requested format\" — which tells the user nothing useful. The <code>title</code> provides the specific instruction, like \"Enter a 5-digit zip code\" or \"Username must be 3-16 letters, numbers, or underscores\".",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<form action="/verify" method="post">\n  <label for="zip">US Zip Code:</label>\n  <input type="text" id="zip" name="zip"\n    pattern="[0-9]{5}" title="Enter a 5-digit zip code"\n    placeholder="e.g., 90210" required><br><br>\n\n  <label for="phone">Phone (xxx-xxx-xxxx):</label>\n  <input type="tel" id="phone" name="phone"\n    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"\n    title="Format: 123-456-7890"\n    placeholder="123-456-7890"><br><br>\n\n  <label for="uname">Username (letters/numbers, 3-16 chars):</label>\n  <input type="text" id="uname" name="username"\n    pattern="[A-Za-z0-9_]{3,16}"\n    title="3-16 letters, numbers, or underscores"\n    required><br><br>\n\n  <button type="submit">Verify</button>\n</form>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "css-valid-invalid",
      type: "explanation",
      instruction: {
        heading: "Styling validation with :valid and :invalid CSS pseudo-classes",
        body: "CSS provides pseudo-classes that let you style form fields based on their validation state. This gives users immediate visual feedback as they fill out the form — green borders for valid fields, red borders for invalid ones.\n\n<strong><code>:valid</code></strong> matches any form field that currently passes all its validation constraints:\n<code>input:valid { border-color: green; }</code>\n\n<strong><code>:invalid</code></strong> matches any form field that currently fails one or more validation constraints:\n<code>input:invalid { border-color: red; }</code>\n\n<strong><code>:required</code></strong> matches fields with the <code>required</code> attribute:\n<code>input:required { border-left: 3px solid orange; }</code>\n\n<strong><code>:optional</code></strong> matches fields without the <code>required</code> attribute.\n\n<strong><code>:placeholder-shown</code></strong> matches fields where the placeholder is visible (the field is empty and unfocused). This is useful for avoiding red borders on empty fields that the user hasn't interacted with yet.\n\nA common pattern combines these pseudo-classes:\n<code>input:not(:placeholder-shown):invalid { border-color: red; }</code>\nThis only shows the red border after the user has started typing — not on page load when all required fields are technically \"invalid\" but the user hasn't had a chance to fill them in yet.\n\nThese pseudo-classes update in real time as the user types. There's no JavaScript required — the browser applies them automatically based on the current validation state.",
        docLinks: [
          {
            label: "MDN: :valid pseudo-class",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/:valid",
            type: "css-selector",
          },
          {
            label: "MDN: :invalid pseudo-class",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/:invalid",
            type: "css-selector",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Be careful with <code>:invalid</code> on required fields. On page load, every empty required field is immediately <code>:invalid</code> — which means your form loads with a sea of red borders before the user has typed a single character. Use <code>:not(:placeholder-shown):invalid</code> or add a <code>.touched</code> class via JavaScript to only show error styles after the user has interacted with the field.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<style>\n  /* Only show validation colors after user starts typing */\n  input:not(:placeholder-shown):valid {\n    border: 2px solid #22c55e; /* green */\n    background-color: #f0fdf4;\n  }\n\n  input:not(:placeholder-shown):invalid {\n    border: 2px solid #ef4444; /* red */\n    background-color: #fef2f2;\n  }\n\n  /* Mark required fields with a left border */\n  input:required {\n    border-left: 3px solid #f59e0b; /* amber */\n  }\n</style>\n\n<form action="/signup" method="post">\n  <label for="email">Email (required):</label>\n  <input type="email" id="email" name="email"\n    placeholder="you@example.com" required><br><br>\n\n  <label for="zip">Zip Code (5 digits):</label>\n  <input type="text" id="zip" name="zip"\n    pattern="[0-9]{5}" placeholder="e.g., 90210"><br><br>\n\n  <button type="submit">Submit</button>\n</form>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "practice-validation",
      type: "gap-fill",
      instruction: {
        heading: "Add validation attributes to a registration form",
        body: "Fill in the blanks to add the correct validation attributes to each field. Think about what constraints each field needs.",
      },
      config: {
        type: "gap-fill",
        template:
          '<form action="/register" method="post">\n  <label for="user">Username:</label>\n  <input type="text" id="user" name="username"\n    {{req}} minlength="3" maxlength="20"><br>\n\n  <label for="email">Email:</label>\n  <input type="{{emailtype}}" id="email" name="email" {{req}}><br>\n\n  <label for="pw">Password:</label>\n  <input type="password" id="pw" name="password"\n    {{req}} {{minattr}}="8"><br>\n\n  <button type="submit">Register</button>\n</form>',
        gaps: [
          {
            id: "req",
            placeholder: "must fill in",
            acceptedAnswers: ["required"],
            caseSensitive: false,
          },
          {
            id: "emailtype",
            placeholder: "validates email",
            acceptedAnswers: ["email"],
            caseSensitive: false,
          },
          {
            id: "minattr",
            placeholder: "minimum length",
            acceptedAnswers: ["minlength"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The boolean attribute that makes a field mandatory is \"required\".",
        "The input type that validates email format automatically is \"email\".",
        "The attribute that sets the minimum number of characters is \"minlength\".",
      ],
    },
    {
      id: "build-validated-form",
      type: "free-edit",
      instruction: {
        heading: "Build a validated registration form",
        body: "Create a registration form that uses HTML5 validation attributes. Your form should include:\n\n<ul><li>A <code>required</code> username field with <code>minlength=\"3\"</code> and <code>maxlength=\"20\"</code></li><li>A <code>required</code> email field using <code>type=\"email\"</code></li><li>A <code>required</code> password field with <code>minlength=\"8\"</code></li><li>A zip code field with <code>pattern=\"[0-9]{5}\"</code> and a <code>title</code></li><li>An age field using <code>type=\"number\"</code> with <code>min=\"13\"</code> and <code>max=\"120\"</code></li><li>A submit button</li></ul>\n\nTry submitting the form with empty or invalid values to see the browser's built-in validation in action!",
        docLinks: [
          {
            label: "MDN: Client-side form validation",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation",
            type: "html-concept",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          '<form action="/register" method="post">\n  <h2>Create Your Account</h2>\n\n  <!-- Add validated fields here -->\n\n  <button type="submit">Create Account</button>\n</form>',
        language: "html",
      },
      validation: { type: "contains-tag", criteria: { tag: "form" } },
      hints: [
        "Add required to username, email, and password fields.",
        "Use type=\"email\" for automatic email validation.",
        "Add pattern=\"[0-9]{5}\" title=\"5-digit zip code\" for the zip field.",
        "Use type=\"number\" min=\"13\" max=\"120\" for the age field.",
      ],
    },
  ],
};
