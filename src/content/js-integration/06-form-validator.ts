import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-integration-form-validator",
  slug: "form-validator",
  title: "Build a Live Form Validator",
  description:
    "React to typing in real time — show errors as the user types, not after they submit. The pattern: input event → validate → toggle an error class.",
  order: 6,
  steps: [
    {
      id: "validator-explain",
      type: "explanation",
      instruction: {
        heading: "Listen to input, not submit",
        body: "<p>The <code>submit</code> event fires once, when the user presses Enter or clicks the submit button. The <code>input</code> event fires on every keystroke, immediately. For live feedback you want <code>input</code>.</p><p>Inside the handler, you read <code>event.target.value</code>, validate it, and toggle a class like <code>.error</code> on the input or its wrapper. CSS does the rest: red border, error message visible, etc.</p>",
        docLinks: [
          {
            label: "MDN: input event",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event",
            type: "js-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Live validation should be helpful, not punishing. Wait until the user has typed something <em>before</em> showing errors. A blank field is not yet a mistake — it is unfinished.",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "validator-fill",
      type: "gap-fill",
      instruction: {
        heading: "Predict: which event fires while the user types?",
        body: "<p>Fill the blank with the event name that fires on every keystroke.</p>",
      },
      config: {
        type: "gap-fill",
        template:
          'const email = document.querySelector("#email");\nemail.addEventListener("{{event}}", (e) => {\n  const valid = e.target.value.includes("@");\n  email.classList.toggle("error", !valid);\n});',
        gaps: [
          {
            id: "event",
            placeholder: "event name",
            acceptedAnswers: ["input"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: { gaps: ["event"] } },
      hints: [
        "It is a four-letter event name that fires on every keystroke.",
        "It is the same as the element name: input.",
      ],
    },
    {
      id: "validator-build",
      type: "free-edit",
      instruction: {
        heading: "Build it: a live email validator",
        body: "<p>Wire an <code>input</code> listener on the email field. After each keystroke, check if the value contains <code>@</code> AND is at least 5 characters. Toggle the <code>error</code> class on the field accordingly. CSS handles the red border and error message.</p>",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "<code>classList.toggle(\"error\", condition)</code> with a second argument is a one-line way to add the class when the condition is true and remove it when false.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { font-family: system-ui, sans-serif; max-width: 420px; margin: 0 auto; padding: 32px; }\n  label { display: block; margin-bottom: 4px; font-weight: 600; }\n  input { width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 16px; box-sizing: border-box; }\n  input.error { border-color: #ef4444; background: #fef2f2; }\n  .error-msg { display: none; color: #ef4444; font-size: 13px; margin-top: 4px; }\n  input.error + .error-msg { display: block; }\n</style>\n</head>\n<body>\n  <label for="email">Email</label>\n  <input type="email" id="email" placeholder="you@example.com">\n  <p class="error-msg">Please enter a valid email (must contain @ and be at least 5 characters).</p>\n\n  <script>\n    // TODO: select #email, listen for "input", validate, toggle "error" class on the input.\n  </script>\n</body>\n</html>',
        language: "html-js",
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["addEventListener", "input", "classList"] },
      },
      hints: [
        "const email = document.querySelector('#email');",
        "email.addEventListener('input', (e) => { const v = e.target.value; const valid = v.includes('@') && v.length >= 5; email.classList.toggle('error', !valid); });",
      ],
    },
  ],
};
