import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "web-accessibility-codelab-aria-form",
  slug: "codelab-aria-form",
  title: "Codelab: Adding ARIA to a Form",
  description:
    "Build a real registration form with aria-label, aria-describedby, aria-live error messages, and accessible validation.",
  order: 9,
  steps: [
    {
      id: "codelab-aria-form-setup",
      type: "explanation",
      instruction: {
        heading: "Set up your project",
        body: `In this codelab, you will build a registration form from scratch that uses ARIA attributes to create a fully accessible experience. The form will have labeled inputs, descriptive help text connected via aria-describedby, a live error region, and proper focus management. By the end, you will understand exactly when and how to use ARIA to enhance forms beyond what native HTML provides.

Open a terminal by pressing Ctrl + Alt + T on Linux, then type the following commands one at a time, pressing Enter after each:

• mkdir ~/aria-form-lab — Creates a new project folder.

• cd ~/aria-form-lab — Moves into the folder.

• touch index.html style.css script.js — Creates three files: HTML for structure, CSS for styles, and JavaScript for form validation. This is the first time we are using JavaScript in a codelab — it is necessary because ARIA live regions work by dynamically updating content, which requires JavaScript.

• code . — Opens VS Code with the project folder.

We will start with the HTML and CSS, then add JavaScript for the validation behavior that makes the ARIA attributes come alive.`,
        docLinks: [
          {
            label: "MDN: ARIA forms",
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/forms",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            body: "If you do not have VS Code installed, use any plain-text editor. We are creating three files this time — make sure you edit the right file for each step (index.html, style.css, or script.js).",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `mkdir ~/aria-form-lab
cd ~/aria-form-lab
touch index.html style.css script.js
code .`,
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Open a terminal with Ctrl+Alt+T.",
        "Type each command and press Enter before typing the next one.",
      ],
    },
    {
      id: "codelab-aria-form-html",
      type: "explanation",
      instruction: {
        heading: "Build the form HTML with ARIA",
        body: `Click on index.html and type the following code. Read through every line — each ARIA attribute has a specific purpose that we will explain.

Let us break down the ARIA attributes used in this form:

<strong>aria-label="Main navigation"</strong> on the <nav> — Provides a descriptive label for the navigation landmark. Screen readers announce "Main navigation, navigation" so users know which navigation region this is.

<strong>aria-required="true"</strong> on required inputs — Tells screen readers that the field is required. While the HTML required attribute also does this, aria-required provides redundancy for older assistive technologies and makes the requirement explicit in the accessibility tree.

<strong>aria-describedby="username-help"</strong> on the username input — Points to an element that provides additional description. When a screen reader user focuses the username field, they hear the label ("Username, required") AND the description ("Must be 3-20 characters, letters and numbers only"). This is different from the label — the label identifies the field, while aria-describedby provides supplementary instructions.

<strong>aria-describedby="password-help"</strong> on the password input — Same pattern: connects the input to its help text so screen readers announce the password requirements when the field receives focus.

<strong>aria-live="polite"</strong> on the error container — Creates a live region. When JavaScript injects error messages into this div, the screen reader will automatically announce them. The "polite" value means it waits until the screen reader finishes its current announcement before reading the error.

<strong>role="alert"</strong> is not used initially — but our JavaScript will add it dynamically when validation errors occur, for immediate announcement of critical issues.

<strong>aria-hidden="true"</strong> on the asterisk spans — Hides the visual asterisk (*) from screen readers. Without this, a screen reader would announce "Username star required" — the star is meaningless in speech. The requirement is already communicated through aria-required and the "(required)" sr-only text.

Save with Ctrl + S.`,
        docLinks: [
          {
            label: "MDN: aria-describedby",
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby",
            type: "html-attribute",
          },
          {
            label: "MDN: aria-required",
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-required",
            type: "html-attribute",
          },
          {
            label: "MDN: aria-live",
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live",
            type: "html-attribute",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The difference between <label> and aria-describedby: the label provides the primary name for the field (\"Username\"). aria-describedby provides supplementary description (\"Must be 3-20 characters\"). Screen readers announce both, in order: name first, then description. The label is essential; the description is additional context.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "The aria-describedby attribute takes an id (or space-separated list of ids) as its value, not the text itself. The most common mistake is writing aria-describedby=\"Must be 3-20 characters\" instead of pointing to an element's id. The attribute value must be an id reference.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Create Account</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <header>
    <nav aria-label="Main navigation">
      <a href="/">Home</a>
      <a href="/register">Register</a>
      <a href="/login">Login</a>
    </nav>
  </header>

  <main id="main-content" tabindex="-1">
    <h1>Create an Account</h1>

    <form id="register-form" novalidate>
      <fieldset>
        <legend>Account Information</legend>

        <div class="field">
          <label for="username">
            Username
            <span aria-hidden="true">*</span>
            <span class="sr-only">(required)</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            aria-required="true"
            aria-describedby="username-help"
            autocomplete="username"
          >
          <p id="username-help" class="help-text">
            Must be 3-20 characters, letters and numbers only.
          </p>
        </div>

        <div class="field">
          <label for="email">
            Email
            <span aria-hidden="true">*</span>
            <span class="sr-only">(required)</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            aria-required="true"
            autocomplete="email"
          >
        </div>

        <div class="field">
          <label for="password">
            Password
            <span aria-hidden="true">*</span>
            <span class="sr-only">(required)</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            aria-required="true"
            aria-describedby="password-help"
            autocomplete="new-password"
          >
          <p id="password-help" class="help-text">
            At least 8 characters with one uppercase letter and one number.
          </p>
        </div>
      </fieldset>

      <div id="form-errors" aria-live="polite"></div>

      <button type="submit">Create Account</button>
    </form>
  </main>

  <footer>
    <p>&copy; 2024 WebSprout</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>`,
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Type or copy the code into index.html.",
        "Make sure every aria-describedby value matches an id on the page.",
        "Save with Ctrl+S.",
      ],
    },
    {
      id: "codelab-aria-form-css",
      type: "explanation",
      instruction: {
        heading: "Style the form",
        body: `Click on style.css and add the following styles. Pay attention to the accessibility-related CSS patterns:

<strong>The .sr-only class</strong> is a standard technique for visually hiding content while keeping it accessible to screen readers. It uses a combination of properties to make the element invisible and take up zero visual space, but screen readers still read it. This is how we provide the "(required)" text — sighted users see the asterisk, screen readers hear "(required)."

<strong>The :focus-visible styles</strong> ensure that every focused element has a clear, high-contrast blue outline. This only appears during keyboard navigation, not when clicking with a mouse. The outline-offset creates a small gap between the element and the outline, making it easier to see.

<strong>The .help-text styles</strong> use a color (#64748B) that passes WCAG AA contrast requirements against the white background (4.61:1 ratio). Help text is often styled in a lighter color, but it must still meet minimum contrast.

<strong>The .error-text styles</strong> use red (#DC2626) along with a text prefix ("Error:") so the error is not communicated by color alone. The font-weight: 600 makes it more prominent.

<strong>The .field-error class</strong> on inputs adds a red border AND a thicker border width — two visual indicators that do not rely solely on color.

<strong>The skip link styles</strong> position the link off-screen by default and bring it on-screen when focused — the same pattern we used in the previous codelab.

Save with Ctrl + S, then open the page in your browser:

xdg-open index.html

The form should look clean and professional. Try tabbing through it — every field should have a visible focus indicator, and the skip link should appear on the first Tab press.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The .sr-only pattern is used by every major accessibility-focused framework (Bootstrap, Tailwind, Material UI). The exact CSS properties are standardized through years of cross-browser testing. Never use display: none or visibility: hidden to hide content that screen readers should access — those hide from assistive technologies too.",
          },
          {
            variant: "tip",
            body: "The help text color #64748B has a contrast ratio of 4.61:1 against white — just above the 4.5:1 WCAG AA minimum. If you want more breathing room, use a darker shade like #475569 (7.03:1). For the error text, #DC2626 on white has a ratio of 4.63:1 — also passes AA.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #1E293B;
  line-height: 1.6;
  background: #F8FAFC;
}

/* Skip link */
.skip-link {
  position: absolute;
  top: -100%;
  left: 16px;
  padding: 8px 16px;
  background: #1E293B;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  z-index: 100;
  font-weight: bold;
}
.skip-link:focus {
  top: 16px;
}

/* Header */
header {
  background: #1E293B;
  padding: 16px 24px;
}
header nav a {
  color: #94A3B8;
  text-decoration: none;
  margin-right: 20px;
}
header nav a:hover { color: white; }

/* Main content */
main {
  max-width: 500px;
  margin: 40px auto;
  padding: 0 24px;
}

h1 {
  font-size: 1.8em;
  margin-bottom: 24px;
}

/* Form */
fieldset {
  border: 2px solid #E2E8F0;
  border-radius: 8px;
  padding: 24px;
}

legend {
  font-weight: 700;
  font-size: 1.1em;
  padding: 0 8px;
}

.field {
  margin-top: 20px;
}
.field:first-of-type {
  margin-top: 16px;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 4px;
}

input {
  display: block;
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #CBD5E1;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #2563EB;
}

.help-text {
  font-size: 0.875rem;
  color: #64748B;
  margin-top: 4px;
}

.error-text {
  font-size: 0.875rem;
  color: #DC2626;
  font-weight: 600;
  margin-top: 4px;
}

.field-error {
  border-color: #DC2626;
  border-width: 3px;
}

#form-errors {
  margin-top: 16px;
}

button[type="submit"] {
  display: block;
  width: 100%;
  margin-top: 24px;
  padding: 12px;
  background: #2563EB;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}
button[type="submit"]:hover {
  background: #1D4ED8;
}

/* Focus indicators */
*:focus-visible {
  outline: 2px solid #2563EB;
  outline-offset: 2px;
}
*:focus:not(:focus-visible) {
  outline: none;
}

/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

/* Footer */
footer {
  text-align: center;
  padding: 24px;
  color: #64748B;
  margin-top: 60px;
}`,
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Make sure you are editing style.css, not index.html.",
        "Save with Ctrl+S, then open index.html in the browser.",
        "Tab through the form to verify focus indicators are visible.",
      ],
    },
    {
      id: "codelab-aria-form-js",
      type: "explanation",
      instruction: {
        heading: "Add JavaScript validation with ARIA feedback",
        body: `Click on script.js and add the following code. This JavaScript makes the ARIA live regions come alive — when a user submits the form with invalid data, error messages appear and are automatically announced by screen readers.

Let us walk through the key accessibility patterns in this JavaScript:

<strong>Preventing default form submission (e.preventDefault()):</strong> We use novalidate on the form element and handle validation ourselves. This gives us full control over how and when error messages appear, allowing us to manage the screen reader experience.

<strong>Clearing previous errors:</strong> Before validating, we remove all previous error messages and error styling. This prevents errors from accumulating and confusing users.

<strong>aria-invalid="true":</strong> When a field has a validation error, we add aria-invalid="true" to the input. Screen readers announce this as "invalid" — telling the user the field needs attention even if they navigate away and come back.

<strong>aria-describedby update:</strong> We dynamically add error message ids to aria-describedby. This means when a user tabs back to a field with an error, the screen reader announces both the help text AND the error message. We append the error id rather than replacing, so the original help text (like "Must be 3-20 characters") is preserved alongside the error ("Username is required").

<strong>Setting focus to the first error field:</strong> After validation, we move focus to the first field with an error. This is critical — it tells the keyboard user exactly where to start fixing problems. Without this, the user has to search for the errors themselves.

<strong>aria-live="polite" on #form-errors:</strong> When we inject the error summary into this div, the screen reader automatically announces it. Because we set it to "polite," it waits until the screen reader finishes its current announcement.

<strong>Success handling:</strong> On successful validation, we clear the form, update the live region with a success message, and focus the status area so the user knows the form was submitted.

Save with Ctrl + S, refresh the browser, and test:
1. Click the "Create Account" button without filling in anything — error messages should appear and focus should move to the first invalid field.
2. Fill in only the username and submit — the username error should disappear but email and password errors remain.
3. Fill in all fields correctly and submit — a success message should appear.
4. Tab through a field with an error — the screen reader should announce both the help text and the error.`,
        docLinks: [
          {
            label: "MDN: aria-invalid",
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid",
            type: "html-attribute",
          },
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
            body: "WCAG 3.3.1 (Error Identification) requires errors to be identified and described to the user in text. WCAG 3.3.3 (Error Suggestion) recommends providing suggestions for fixing errors. Our validation does both: it identifies which fields have errors, describes what is wrong, and suggests what the user should enter.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "Always focus the first error field after validation fails. This is the single most impactful accessibility improvement you can make to form validation. Without it, keyboard and screen reader users have to manually search the form to find what went wrong.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `const form = document.getElementById('register-form');
const errorsContainer = document.getElementById('form-errors');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  clearErrors();

  const errors = validateForm();

  if (errors.length > 0) {
    showErrors(errors);
  } else {
    showSuccess();
  }
});

function validateForm() {
  const errors = [];
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  // Username validation
  if (!username.value.trim()) {
    errors.push({ field: username, message: 'Username is required.' });
  } else if (username.value.length < 3 || username.value.length > 20) {
    errors.push({ field: username, message: 'Username must be 3-20 characters.' });
  }

  // Email validation
  if (!email.value.trim()) {
    errors.push({ field: email, message: 'Email is required.' });
  } else if (!email.value.includes('@')) {
    errors.push({ field: email, message: 'Please enter a valid email address.' });
  }

  // Password validation
  if (!password.value) {
    errors.push({ field: password, message: 'Password is required.' });
  } else if (password.value.length < 8) {
    errors.push({ field: password, message: 'Password must be at least 8 characters.' });
  }

  return errors;
}

function clearErrors() {
  errorsContainer.innerHTML = '';
  const fields = form.querySelectorAll('input');
  fields.forEach(function(field) {
    field.classList.remove('field-error');
    field.removeAttribute('aria-invalid');
    // Remove dynamic error id from aria-describedby
    const errorEl = document.getElementById(field.id + '-error');
    if (errorEl) errorEl.remove();
  });
}

function showErrors(errors) {
  // Add error messages next to each field
  errors.forEach(function(error) {
    error.field.classList.add('field-error');
    error.field.setAttribute('aria-invalid', 'true');

    // Create inline error message
    const errorEl = document.createElement('p');
    errorEl.className = 'error-text';
    errorEl.id = error.field.id + '-error';
    errorEl.textContent = 'Error: ' + error.message;
    error.field.parentNode.appendChild(errorEl);

    // Add error id to aria-describedby
    const existing = error.field.getAttribute('aria-describedby') || '';
    error.field.setAttribute('aria-describedby',
      (existing + ' ' + errorEl.id).trim()
    );
  });

  // Update live region with error summary
  const summary = errors.length + ' error'
    + (errors.length > 1 ? 's' : '') + ' found. '
    + errors.map(function(e) { return e.message; }).join(' ');
  errorsContainer.textContent = summary;

  // Focus the first error field
  errors[0].field.focus();
}

function showSuccess() {
  errorsContainer.textContent = 'Account created successfully!';
  form.reset();
  errorsContainer.focus();
}`,
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Type or copy the code into script.js.",
        "Save with Ctrl+S, refresh the browser, and test by submitting the empty form.",
        "Check that error messages appear and focus moves to the first invalid field.",
      ],
    },
    {
      id: "codelab-aria-form-test",
      type: "explanation",
      instruction: {
        heading: "Test accessibility",
        body: `Now let us test the form we built using the techniques from Lesson 6 (Accessibility Testing Tools). Follow this checklist:

<strong>1. Keyboard testing:</strong>
- Press Tab from the address bar. Does the skip link appear?
- Press Enter on the skip link. Does focus move to the main content?
- Tab through every form field. Can you reach every input and the submit button?
- Is the focus indicator visible on every element?
- Submit the form with Tab + Enter on the submit button (do not use the mouse).
- After validation errors appear, is focus on the first invalid field?

<strong>2. Lighthouse audit:</strong>
- Press F12 to open DevTools.
- Go to the Lighthouse tab.
- Run an accessibility audit.
- The score should be 90 or higher. Review any flagged issues and fix them.

<strong>3. Screen reader test (optional but recommended):</strong>
- If you are on Mac, press Cmd + F5 to enable VoiceOver.
- If you are on Windows, open NVDA.
- Tab to the username field. You should hear: "Username, required, edit text, Must be 3-20 characters, letters and numbers only."
- Submit the empty form. You should hear the error count and error messages announced.
- Tab to a field with an error. You should hear both the help text and the error message.

<strong>4. Visual checks:</strong>
- Does every required field have a visible asterisk?
- Are all colors readable? (Dark text on light backgrounds, sufficient contrast.)
- Do error messages include text (not just red color)?
- Does the error state include a visible border change on the input?

<strong>5. HTML validation:</strong>
- Open https://validator.w3.org/ and paste your HTML. Fix any errors.
- Valid HTML is the foundation of accessibility — invalid markup can cause unpredictable behavior in assistive technologies.

If all these tests pass, congratulations — you have built a fully accessible registration form. This form works for sighted mouse users, keyboard-only users, screen reader users, and users with color vision deficiency. That is what inclusive design looks like.`,
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Testing is not optional — it is part of the development process. WCAG Conformance Requirement 5 states that conformance claims must be based on testing complete web pages. Running automated scans, manual keyboard tests, and screen reader tests gives you confidence that your form actually works for the people it is designed to serve.",
          },
          {
            variant: "tip",
            body: "Save this testing checklist and use it on every form you build. After a few times, it becomes second nature — just like checking your code for typos before committing. Accessibility testing is a skill that gets faster with practice.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: `Accessibility Testing Checklist:

KEYBOARD TESTING:
[ ] Skip link appears on first Tab
[ ] Skip link jumps to main content
[ ] Every input reachable by Tab
[ ] Focus indicator visible on all elements
[ ] Form submittable by keyboard (Tab + Enter)
[ ] Focus moves to first error after validation

AUTOMATED TESTING:
[ ] Lighthouse accessibility score 90+
[ ] No critical or serious axe DevTools issues

SCREEN READER (optional):
[ ] Labels announced on focus
[ ] Help text announced via aria-describedby
[ ] Errors announced via aria-live
[ ] Required fields announced as required

VISUAL:
[ ] Required indicators visible
[ ] Sufficient color contrast
[ ] Error state has non-color indicator
[ ] Error messages include descriptive text`,
      },
      validation: { type: "none", criteria: {} },
      hints: [
        "Run through the keyboard testing checklist first — it catches the most common issues.",
        "Open DevTools (F12) and run a Lighthouse audit for your accessibility score.",
        "Fix any issues found before moving to the checkpoint.",
      ],
    },
    {
      id: "codelab-aria-form-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: extend the form",
        body: "Now practice on your own. Add the following enhancements to the registration form:\n\n1. <strong>Add a \"Confirm Password\" field</strong> — it should have a <label>, aria-required, and its own validation rule (must match the password field). Add an aria-describedby pointing to help text that says \"Must match the password above.\"\n\n2. <strong>Add a <select> dropdown for \"How did you hear about us?\"</strong> with options like \"Search engine,\" \"Social media,\" \"Friend referral,\" and \"Other.\" Give it a proper <label>. Select elements are natively accessible — you do not need ARIA for basic selects.\n\n3. <strong>Add a checkbox for agreeing to Terms of Service</strong> — the label should contain a link to the terms page. Make sure the checkbox is keyboard-accessible (it is by default with native <input type=\"checkbox\">). Add aria-required=\"true\" and validate that it is checked on submit.\n\n4. <strong>Update the JavaScript</strong> to validate the new fields — the confirm password must match, and the terms checkbox must be checked.\n\nTest your additions with the keyboard and verify all new fields are announced correctly by tabbing through them.",
        docLinks: [
          {
            label: "MDN: <select>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select",
            type: "html-element",
          },
          {
            label: "MDN: <input type=\"checkbox\">",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            body: "Remember the First Rule of ARIA: native HTML elements like <select>, <input type=\"checkbox\">, and <label> provide built-in accessibility. You do not need ARIA roles for these — just use the native elements correctly with proper labels.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          "<!-- Add a confirm password field -->\n<div class=\"field\">\n  <label for=\"confirm-password\">\n    Confirm Password\n    <span aria-hidden=\"true\">*</span>\n    <span class=\"sr-only\">(required)</span>\n  </label>\n  <!-- Add input with aria-required and aria-describedby -->\n\n  <p id=\"confirm-help\" class=\"help-text\">\n    Must match the password above.\n  </p>\n</div>\n\n<!-- Add a select dropdown -->\n<div class=\"field\">\n  <!-- Add label and select element -->\n\n</div>\n\n<!-- Add a terms checkbox -->\n<div class=\"field\">\n  <!-- Add checkbox input and label -->\n\n</div>",
        language: "html",
      },
      validation: {
        type: "contains-tag",
        criteria: { tag: "input" },
      },
      hints: [
        "The confirm password input needs: type=\"password\", id=\"confirm-password\", aria-required=\"true\", aria-describedby=\"confirm-help\".",
        "The select needs a <label for=\"referral\"> and <select id=\"referral\">.",
        "The checkbox needs <input type=\"checkbox\" id=\"terms\"> and <label for=\"terms\">I agree to the <a href=\"/terms\">Terms of Service</a></label>.",
        "Update script.js to add validation for the new fields.",
      ],
    },
  ],
};
