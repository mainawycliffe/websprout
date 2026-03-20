import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-functions-codelab-form-validator",
  slug: "codelab-form-validator",
  title: "Codelab: Form Validator",
  description:
    "Build a real form validation system from scratch using everything you've learned about functions.",
  order: 10,
  steps: [
    {
      id: "codelab-intro",
      type: "explanation",
      instruction: {
        heading: "Build a real form validator with functions!",
        body: "Every website with a sign-up form needs validation — checking that the user filled in their name, entered a valid email, and chose a strong password before submitting. In this codelab, you'll build a form validator from scratch on your own computer. You'll create validation functions like `isNotEmpty()`, `isValidEmail()`, and `isStrongPassword()`, then connect them to an HTML form. This is exactly how real-world form validation works behind the scenes.",
        docLinks: [
          {
            label: "Client-side form validation",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "HTML5 has built-in form validation attributes like `required`, `type=\"email\"`, and `minlength`. These are great for simple checks, but JavaScript validation gives you full control over custom rules, error messages, and the user experience. Most real websites use both: HTML5 validation as a first line of defense, and JavaScript for detailed checks.",
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
      id: "codelab-setup",
      type: "explanation",
      instruction: {
        heading: "Step 1: Set up your project",
        body: "Open your terminal and create a new project folder. You'll need two files: `index.html` for the form structure, and `validator.js` for the validation functions. Keep them in the same folder so the HTML file can find the JavaScript file.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "If you don't have a code editor installed, VS Code is free and beginner-friendly: https://code.visualstudio.com. You can also use any plain text editor like Nano, Gedit, or Notepad++. Do NOT use a word processor like Google Docs or LibreOffice Writer — they add hidden formatting that breaks code.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "# Open your terminal and run these commands:\nmkdir form-validator\ncd form-validator\n\n# Create the two files:\ntouch index.html\ntouch validator.js\n\n# Open the folder in your code editor:\n# (For VS Code:)\ncode .",
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-html",
      type: "explanation",
      instruction: {
        heading: "Step 2: Create the HTML form",
        body: "Open `index.html` and paste in the following code. This creates a simple sign-up form with three fields: name, email, and password. Each field has a `<span>` element below it where we'll display error messages. The `<script>` tag at the bottom loads our JavaScript file. Notice the `id` attributes on each input — we'll use these to grab the values with JavaScript.",
        docLinks: [
          {
            label: "HTML form element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form",
            type: "js-concept",
          },
          {
            label: "HTMLInputElement",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement",
            type: "js-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Form Validator</title>\n  <style>\n    body { font-family: sans-serif; max-width: 400px; margin: 50px auto; }\n    label { display: block; margin-top: 15px; font-weight: bold; }\n    input { width: 100%; padding: 8px; margin-top: 5px; box-sizing: border-box; }\n    .error { color: red; font-size: 14px; display: block; margin-top: 4px; }\n    .success { color: green; font-size: 14px; display: block; margin-top: 10px; }\n    button { margin-top: 20px; padding: 10px 20px; font-size: 16px; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <h1>Sign Up</h1>\n  <form id="signup-form">\n    <label for="name">Name</label>\n    <input type="text" id="name" placeholder="Your full name">\n    <span class="error" id="name-error"></span>\n\n    <label for="email">Email</label>\n    <input type="text" id="email" placeholder="you@example.com">\n    <span class="error" id="email-error"></span>\n\n    <label for="password">Password</label>\n    <input type="password" id="password" placeholder="At least 8 characters">\n    <span class="error" id="password-error"></span>\n\n    <button type="submit">Create Account</button>\n    <span class="success" id="success-message"></span>\n  </form>\n\n  <script src="validator.js"></script>\n</body>\n</html>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-validation-functions",
      type: "explanation",
      instruction: {
        heading: "Step 3: Write the validation functions",
        body: "Now open `validator.js` and let's write three validation functions. Each function takes a string value and returns `true` if it's valid or `false` if it's not. This is the core of our validator — pure functions that just check data. We're keeping them separate from the form-handling code because (1) it's easier to test them and (2) we can reuse them on different forms.\n\n- `isNotEmpty(value)` — returns true if the string is not empty after trimming whitespace\n- `isValidEmail(value)` — returns true if the string contains an `@` symbol with text on both sides\n- `isStrongPassword(value)` — returns true if the string is at least 8 characters long",
        docLinks: [
          {
            label: "String.prototype.trim()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim",
            type: "js-method",
          },
          {
            label: "String.prototype.includes()",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes",
            type: "js-method",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Our email check (contains `@` with text on both sides) is simplified for learning purposes. Real email validation is extremely complicated — the full spec allows characters most people have never seen. In production, developers typically use a well-tested library or server-side verification. But our simple check catches the most common mistakes.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// validator.js — Validation functions\n\n// Check if a value is not empty (after trimming whitespace)\nfunction isNotEmpty(value) {\n  return value.trim().length > 0;\n}\n\n// Check if a value looks like an email (contains @ with text on both sides)\nfunction isValidEmail(value) {\n  const atIndex = value.indexOf("@");\n  // @ must exist, not be first char, and not be last char\n  return atIndex > 0 && atIndex < value.length - 1;\n}\n\n// Check if a password is at least 8 characters long\nfunction isStrongPassword(value) {\n  return value.length >= 8;\n}',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-connect-form",
      type: "explanation",
      instruction: {
        heading: "Step 4: Connect the functions to the form",
        body: "Now we need to listen for the form's `submit` event and run our validation functions. We use `document.getElementById()` to grab each input's value, then call our validation functions. If any check fails, we display an error message in the corresponding `<span>`. If all checks pass, we show a success message. The `event.preventDefault()` call stops the form from actually submitting (which would reload the page) — we want to handle everything with JavaScript.\n\nAdd this code below the validation functions in `validator.js`:",
        docLinks: [
          {
            label: "addEventListener()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
            type: "js-method",
          },
          {
            label: "Event.preventDefault()",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault",
            type: "js-method",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// --- Add this below the validation functions ---\n\n// Helper: show or clear an error message\nfunction showError(elementId, message) {\n  document.getElementById(elementId).textContent = message;\n}\n\n// Get the form element\nconst form = document.getElementById("signup-form");\n\n// Listen for the submit event\nform.addEventListener("submit", function(event) {\n  // Stop the form from reloading the page\n  event.preventDefault();\n\n  // Clear previous errors\n  showError("name-error", "");\n  showError("email-error", "");\n  showError("password-error", "");\n  showError("success-message", "");\n\n  // Get the values from the form\n  const name = document.getElementById("name").value;\n  const email = document.getElementById("email").value;\n  const password = document.getElementById("password").value;\n\n  // Track whether all fields are valid\n  let isFormValid = true;\n\n  // Validate name\n  if (!isNotEmpty(name)) {\n    showError("name-error", "Name is required.");\n    isFormValid = false;\n  }\n\n  // Validate email\n  if (!isNotEmpty(email)) {\n    showError("email-error", "Email is required.");\n    isFormValid = false;\n  } else if (!isValidEmail(email)) {\n    showError("email-error", "Please enter a valid email address.");\n    isFormValid = false;\n  }\n\n  // Validate password\n  if (!isNotEmpty(password)) {\n    showError("password-error", "Password is required.");\n    isFormValid = false;\n  } else if (!isStrongPassword(password)) {\n    showError("password-error", "Password must be at least 8 characters.");\n    isFormValid = false;\n  }\n\n  // If everything is valid, show success\n  if (isFormValid) {\n    showError("success-message", "Account created successfully!");\n  }\n});',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-test",
      type: "explanation",
      instruction: {
        heading: "Step 5: Test your form validator",
        body: "Open `index.html` in your browser by double-clicking the file (or right-click and 'Open with' your browser). Try these tests:\n\n1. Click 'Create Account' with all fields empty — you should see error messages for all three fields.\n2. Type only spaces in the name field and submit — the `trim()` check should catch this.\n3. Enter 'alice' in the email field (no @) — you should see the email error.\n4. Enter a 3-character password — you should see the password error.\n5. Fill in all fields correctly — you should see the success message.\n\nOpen the browser's developer tools (F12 or Ctrl+Shift+I) and check the Console tab for any errors. If something isn't working, the console will tell you what went wrong and which line caused it.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "If you make changes to your JavaScript file, you need to refresh the browser page (F5 or Ctrl+R) to load the updated code. The browser caches files, so sometimes you need a 'hard refresh' (Ctrl+Shift+R) to force it to reload everything.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// Test checklist:\n// 1. Empty form → 3 error messages\n// 2. Spaces-only name → "Name is required."\n// 3. "alice" as email → "Please enter a valid email address."\n// 4. "abc" as password → "Password must be at least 8 characters."\n// 5. All valid → "Account created successfully!"',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-refactor",
      type: "explanation",
      instruction: {
        heading: "Step 6: Refactor to a reusable validator",
        body: "Our code works, but the submit handler is doing too much — it knows about every specific field. Let's refactor using a higher-order pattern: create a `validateField` function that takes the input ID, the error ID, a validation function (callback!), and an error message. This way, adding a new field is just one function call instead of a new block of if/else. This is the power of callbacks in real-world code.\n\nReplace the submit handler with this refactored version:",
        docLinks: [
          {
            label: "Higher-order functions",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "This refactoring pattern — passing validation functions as callbacks — is exactly how professional form libraries like Formik, Yup, and Zod work under the hood. They let you define validation rules as functions and compose them together.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '// Reusable field validator — takes a callback!\nfunction validateField(inputId, errorId, validationFn, errorMessage) {\n  const value = document.getElementById(inputId).value;\n  if (!validationFn(value)) {\n    showError(errorId, errorMessage);\n    return false;\n  }\n  return true;\n}\n\n// Refactored submit handler — much cleaner!\nform.addEventListener("submit", function(event) {\n  event.preventDefault();\n\n  // Clear errors\n  showError("name-error", "");\n  showError("email-error", "");\n  showError("password-error", "");\n  showError("success-message", "");\n\n  // Validate each field — notice how clean this is!\n  const nameOk = validateField(\n    "name", "name-error", isNotEmpty, "Name is required."\n  );\n  const emailOk = validateField(\n    "email", "email-error", isValidEmail, "Please enter a valid email."\n  );\n  const passwordOk = validateField(\n    "password", "password-error", isStrongPassword,\n    "Password must be at least 8 characters."\n  );\n\n  if (nameOk && emailOk && passwordOk) {\n    showError("success-message", "Account created successfully!");\n  }\n});\n\n// Challenge: Add a "Confirm Password" field that checks\n// if both password fields match. Write a new validation\n// function and add one more validateField() call!',
        demoLanguage: "javascript",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
  ],
};
