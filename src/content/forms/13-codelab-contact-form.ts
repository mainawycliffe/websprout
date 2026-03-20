import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "forms-codelab-contact-form",
  slug: "codelab-contact-form",
  title: "Codelab: Build a Contact Form",
  description:
    "Follow along step-by-step to build a complete, styled, accessible contact form from scratch in your code editor and browser.",
  order: 13,
  steps: [
    {
      id: "codelab-contact-setup",
      type: "explanation",
      instruction: {
        heading: "Step 1: Set up your project",
        body: "In this codelab, you'll build a real contact form from scratch — no frameworks, no build tools, just an HTML file and a browser. This is exactly how professional web developers started, and it's the best way to internalize how forms work.\n\n<strong>What you'll build:</strong> A \"Contact Us\" form for a fictional design agency. It will include text inputs, an email field, a dropdown, a textarea, validation, accessibility features, and polished CSS styling.\n\n<strong>Setup instructions:</strong>\n<ol><li>Open your terminal (Terminal on Mac, or press <code>Ctrl+Alt+T</code> on Linux)</li><li>Create a project folder: <code>mkdir contact-form && cd contact-form</code></li><li>Create an HTML file: <code>touch index.html</code></li><li>Open the file in your code editor (VS Code: <code>code index.html</code>)</li></ol>\n\nStart with this HTML boilerplate:\n\n<code>&lt;!DOCTYPE html&gt;<br>&lt;html lang=\"en\"&gt;<br>&lt;head&gt;<br>&nbsp;&nbsp;&lt;meta charset=\"UTF-8\"&gt;<br>&nbsp;&nbsp;&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"&gt;<br>&nbsp;&nbsp;&lt;title&gt;Contact Us - PixelCraft Agency&lt;/title&gt;<br>&lt;/head&gt;<br>&lt;body&gt;<br>&nbsp;&nbsp;&lt;h1&gt;Contact Us&lt;/h1&gt;<br>&lt;/body&gt;<br>&lt;/html&gt;</code>\n\nSave the file and open <code>index.html</code> in your browser (double-click the file, or drag it into a browser window). You should see \"Contact Us\" as a heading. Keep both your editor and browser open side by side — you'll be switching between them frequently.",
        docLinks: [
          {
            label: "MDN: Getting started with HTML",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax",
            type: "html-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Contact Us - PixelCraft Agency</title>\n</head>\n<body>\n  <h1>Contact Us</h1>\n</body>\n</html>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-contact-structure",
      type: "explanation",
      instruction: {
        heading: "Step 2: Add the form structure",
        body: "Now add the <code>&lt;form&gt;</code> element with its core attributes. Inside the <code>&lt;body&gt;</code>, after the <code>&lt;h1&gt;</code>, add:\n\n<code>&lt;form action=\"/contact\" method=\"post\"&gt;<br>&nbsp;&nbsp;&lt;p&gt;Fill out the form below and we'll get back to you within 24 hours.&lt;/p&gt;<br>&lt;/form&gt;</code>\n\nWe're using <code>method=\"post\"</code> because contact form data (name, email, message) is personal information that shouldn't appear in the URL. The <code>action=\"/contact\"</code> specifies where the data would be sent on a real server.\n\nSave and refresh your browser. You should see the heading and the introductory paragraph. The form is invisible — it's just a container at this point. The visual elements come from the inputs and buttons we'll add inside it.\n\nNext, add a container div inside the form to wrap each form field. This is a common pattern that makes styling easier later:\n\n<code>&lt;form action=\"/contact\" method=\"post\"&gt;<br>&nbsp;&nbsp;&lt;p&gt;Fill out the form below and we'll get back to you within 24 hours.&lt;/p&gt;<br><br>&nbsp;&nbsp;&lt;div class=\"form-group\"&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Fields will go here --&gt;<br>&nbsp;&nbsp;&lt;/div&gt;<br>&lt;/form&gt;</code>",
        docLinks: [
          {
            label: "MDN: <form> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form",
            type: "html-element",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<h1>Contact Us</h1>\n\n<form action="/contact" method="post">\n  <p>Fill out the form below and we\'ll get back to you within 24 hours.</p>\n\n  <div class="form-group">\n    <!-- Fields will go here -->\n  </div>\n</form>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-contact-inputs",
      type: "explanation",
      instruction: {
        heading: "Step 3: Add the input fields",
        body: "Now add the form fields. Replace the <code>&lt;!-- Fields will go here --&gt;</code> comment with these fields. Each field is wrapped in its own <code>&lt;div class=\"form-group\"&gt;</code> for layout control:\n\n<code>&lt;div class=\"form-group\"&gt;<br>&nbsp;&nbsp;&lt;label for=\"name\"&gt;Full Name&lt;/label&gt;<br>&nbsp;&nbsp;&lt;input type=\"text\" id=\"name\" name=\"name\" placeholder=\"Jane Doe\" required&gt;<br>&lt;/div&gt;<br><br>&lt;div class=\"form-group\"&gt;<br>&nbsp;&nbsp;&lt;label for=\"email\"&gt;Email Address&lt;/label&gt;<br>&nbsp;&nbsp;&lt;input type=\"email\" id=\"email\" name=\"email\" placeholder=\"jane@example.com\" required&gt;<br>&lt;/div&gt;<br><br>&lt;div class=\"form-group\"&gt;<br>&nbsp;&nbsp;&lt;label for=\"subject\"&gt;Subject&lt;/label&gt;<br>&nbsp;&nbsp;&lt;select id=\"subject\" name=\"subject\" required&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;option value=\"\" disabled selected&gt;Choose a topic...&lt;/option&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;option value=\"general\"&gt;General Inquiry&lt;/option&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;option value=\"project\"&gt;New Project&lt;/option&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;option value=\"support\"&gt;Support&lt;/option&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;option value=\"feedback\"&gt;Feedback&lt;/option&gt;<br>&nbsp;&nbsp;&lt;/select&gt;<br>&lt;/div&gt;<br><br>&lt;div class=\"form-group\"&gt;<br>&nbsp;&nbsp;&lt;label for=\"message\"&gt;Message&lt;/label&gt;<br>&nbsp;&nbsp;&lt;textarea id=\"message\" name=\"message\" rows=\"6\" placeholder=\"Tell us about your project or question...\" required minlength=\"20\"&gt;&lt;/textarea&gt;<br>&lt;/div&gt;</code>\n\nNotice the key details: every input has a <code>name</code> (for form submission), an <code>id</code> (for label wiring), and a <code>required</code> attribute (for validation). The email field uses <code>type=\"email\"</code> for automatic format checking. The textarea has <code>minlength=\"20\"</code> to encourage meaningful messages.\n\nSave and refresh. You should see all four fields rendered with the browser's default styling.",
      },
      config: {
        type: "explanation",
        demoCode:
          '<div class="form-group">\n  <label for="name">Full Name</label>\n  <input type="text" id="name" name="name"\n    placeholder="Jane Doe" required>\n</div>\n\n<div class="form-group">\n  <label for="email">Email Address</label>\n  <input type="email" id="email" name="email"\n    placeholder="jane@example.com" required>\n</div>\n\n<div class="form-group">\n  <label for="subject">Subject</label>\n  <select id="subject" name="subject" required>\n    <option value="" disabled selected>Choose a topic...</option>\n    <option value="general">General Inquiry</option>\n    <option value="project">New Project</option>\n    <option value="support">Support</option>\n    <option value="feedback">Feedback</option>\n  </select>\n</div>\n\n<div class="form-group">\n  <label for="message">Message</label>\n  <textarea id="message" name="message" rows="6"\n    placeholder="Tell us about your project or question..."\n    required minlength="20"></textarea>\n</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-contact-a11y",
      type: "explanation",
      instruction: {
        heading: "Step 4: Add labels, button, and accessibility",
        body: "Add the submit button and a newsletter checkbox, then enhance the form with accessibility features.\n\nAfter the message textarea's <code>form-group</code>, add:\n\n<code>&lt;div class=\"form-group\"&gt;<br>&nbsp;&nbsp;&lt;label&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;input type=\"checkbox\" name=\"newsletter\" value=\"yes\"&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;Subscribe to our newsletter<br>&nbsp;&nbsp;&lt;/label&gt;<br>&lt;/div&gt;<br><br>&lt;button type=\"submit\"&gt;Send Message&lt;/button&gt;</code>\n\nNow add accessibility enhancements:\n\n<strong>1. Add a fieldset and legend</strong> to group the contact fields semantically. Wrap all the form-groups (except the newsletter and button) in:\n<code>&lt;fieldset&gt;<br>&nbsp;&nbsp;&lt;legend&gt;Your Details&lt;/legend&gt;<br>&nbsp;&nbsp;&lt;!-- form-groups here --&gt;<br>&lt;/fieldset&gt;</code>\n\n<strong>2. Add aria-describedby</strong> to the message textarea to link it to helpful text:\n<code>&lt;textarea ... aria-describedby=\"msg-help\"&gt;&lt;/textarea&gt;<br>&lt;p id=\"msg-help\" class=\"help-text\"&gt;Please include as much detail as possible. Minimum 20 characters.&lt;/p&gt;</code>\n\n<strong>3. Add an aria-live region</strong> at the top of the form for potential error messages:\n<code>&lt;div aria-live=\"polite\" id=\"form-status\"&gt;&lt;/div&gt;</code>\n\nSave and refresh. Try tabbing through the form with your keyboard to verify the tab order makes sense. Every field should be reachable and the submit button should be last.",
        docLinks: [
          {
            label: "MDN: <fieldset> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset",
            type: "html-element",
          },
          {
            label: "MDN: aria-describedby",
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby",
            type: "html-attribute",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<form action="/contact" method="post">\n  <div aria-live="polite" id="form-status"></div>\n\n  <fieldset>\n    <legend>Your Details</legend>\n\n    <div class="form-group">\n      <label for="name">Full Name</label>\n      <input type="text" id="name" name="name" required>\n    </div>\n\n    <div class="form-group">\n      <label for="email">Email Address</label>\n      <input type="email" id="email" name="email" required>\n    </div>\n\n    <!-- ... subject select ... -->\n\n    <div class="form-group">\n      <label for="message">Message</label>\n      <textarea id="message" name="message" rows="6"\n        required minlength="20"\n        aria-describedby="msg-help"></textarea>\n      <p id="msg-help" class="help-text">\n        Please include as much detail as possible. Min 20 characters.\n      </p>\n    </div>\n  </fieldset>\n\n  <div class="form-group">\n    <label>\n      <input type="checkbox" name="newsletter" value="yes">\n      Subscribe to our newsletter\n    </label>\n  </div>\n\n  <button type="submit">Send Message</button>\n</form>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-contact-validation",
      type: "explanation",
      instruction: {
        heading: "Step 5: Test the built-in validation",
        body: "Before adding CSS, let's verify that the HTML validation is working correctly. Save your file and open it in the browser.\n\n<strong>Test 1: Submit with empty fields.</strong> Click the \"Send Message\" button without filling in anything. The browser should prevent submission and show an error on the first required field (\"Please fill out this field\").\n\n<strong>Test 2: Enter an invalid email.</strong> Fill in the name, then type \"not-an-email\" in the email field and try to submit. The browser should catch this and show an email validation error.\n\n<strong>Test 3: Select no subject.</strong> Fill in name and email, but leave the subject dropdown on \"Choose a topic...\" and try to submit. Because the placeholder option has <code>value=\"\"</code> and the select is <code>required</code>, this should fail validation.\n\n<strong>Test 4: Short message.</strong> Fill everything in, but type only \"Hi\" in the message (which is shorter than the <code>minlength=\"20\"</code>). The browser should show a minlength validation error.\n\n<strong>Test 5: Valid submission.</strong> Fill in all fields correctly. When you click Submit, the browser will try to navigate to <code>/contact</code> — since that page doesn't exist on your local file, you'll see an error page. That's fine! It means the form validated successfully and attempted to submit.\n\nAll of this validation happened without a single line of JavaScript — it's all built into HTML5 attributes. This is the power of semantic HTML.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Different browsers show validation messages in slightly different styles and wording. Chrome and Firefox have different visual designs for their validation popups. This is normal and expected — it's the browser's native validation UI. You can customize these messages with JavaScript using the Constraint Validation API, but the built-in messages are usually good enough.",
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
      id: "codelab-contact-css",
      type: "explanation",
      instruction: {
        heading: "Step 6: Add CSS styling",
        body: "Now add a <code>&lt;style&gt;</code> block inside the <code>&lt;head&gt;</code> of your HTML to transform the form from browser defaults into a polished design.\n\nHere's the CSS to add:\n\n<code>&lt;style&gt;<br>&nbsp;&nbsp;* { box-sizing: border-box; margin: 0; padding: 0; }<br>&nbsp;&nbsp;body {<br>&nbsp;&nbsp;&nbsp;&nbsp;font-family: system-ui, -apple-system, sans-serif;<br>&nbsp;&nbsp;&nbsp;&nbsp;max-width: 560px;<br>&nbsp;&nbsp;&nbsp;&nbsp;margin: 2rem auto;<br>&nbsp;&nbsp;&nbsp;&nbsp;padding: 0 1rem;<br>&nbsp;&nbsp;&nbsp;&nbsp;color: #1f2937;<br>&nbsp;&nbsp;&nbsp;&nbsp;line-height: 1.6;<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;h1 { margin-bottom: 0.5rem; color: #3b82f6; }<br>&nbsp;&nbsp;fieldset {<br>&nbsp;&nbsp;&nbsp;&nbsp;border: 2px solid #e5e7eb;<br>&nbsp;&nbsp;&nbsp;&nbsp;border-radius: 0.75rem;<br>&nbsp;&nbsp;&nbsp;&nbsp;padding: 1.5rem;<br>&nbsp;&nbsp;&nbsp;&nbsp;margin-bottom: 1.5rem;<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;legend { font-weight: bold; padding: 0 0.5rem; color: #3b82f6; }<br>&nbsp;&nbsp;.form-group { margin-bottom: 1.25rem; }<br>&nbsp;&nbsp;label { display: block; font-weight: 600; margin-bottom: 0.375rem; }<br>&nbsp;&nbsp;input[type=\"text\"],<br>&nbsp;&nbsp;input[type=\"email\"],<br>&nbsp;&nbsp;select,<br>&nbsp;&nbsp;textarea {<br>&nbsp;&nbsp;&nbsp;&nbsp;width: 100%;<br>&nbsp;&nbsp;&nbsp;&nbsp;padding: 0.75rem 1rem;<br>&nbsp;&nbsp;&nbsp;&nbsp;border: 2px solid #d1d5db;<br>&nbsp;&nbsp;&nbsp;&nbsp;border-radius: 0.5rem;<br>&nbsp;&nbsp;&nbsp;&nbsp;font: inherit;<br>&nbsp;&nbsp;&nbsp;&nbsp;font-size: 1rem;<br>&nbsp;&nbsp;&nbsp;&nbsp;transition: border-color 0.2s, box-shadow 0.2s;<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;input:focus, select:focus, textarea:focus {<br>&nbsp;&nbsp;&nbsp;&nbsp;outline: none;<br>&nbsp;&nbsp;&nbsp;&nbsp;border-color: #3b82f6;<br>&nbsp;&nbsp;&nbsp;&nbsp;box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;textarea { resize: vertical; }<br>&nbsp;&nbsp;.help-text { font-size: 0.8rem; color: #6b7280; margin-top: 0.375rem; }<br>&nbsp;&nbsp;input[type=\"checkbox\"] { accent-color: #3b82f6; }<br>&nbsp;&nbsp;button[type=\"submit\"] {<br>&nbsp;&nbsp;&nbsp;&nbsp;width: 100%; padding: 0.875rem; background: #3b82f6;<br>&nbsp;&nbsp;&nbsp;&nbsp;color: white; border: none; border-radius: 0.5rem;<br>&nbsp;&nbsp;&nbsp;&nbsp;font: inherit; font-size: 1.05rem; font-weight: 600;<br>&nbsp;&nbsp;&nbsp;&nbsp;cursor: pointer; transition: background-color 0.2s;<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;button:hover { background-color: #2563eb; }<br>&nbsp;&nbsp;button:active { background-color: #1d4ed8; }<br>&lt;/style&gt;</code>\n\nSave and refresh your browser. The form should now look clean and modern — rounded corners, focused input highlights, a polished button, and consistent spacing. This is the level of quality you'd expect on a professional website.",
      },
      config: {
        type: "explanation",
        demoCode:
          '* { box-sizing: border-box; margin: 0; padding: 0; }\nbody {\n  font-family: system-ui, -apple-system, sans-serif;\n  max-width: 560px;\n  margin: 2rem auto;\n  padding: 0 1rem;\n  color: #1f2937;\n}\nh1 { margin-bottom: 0.5rem; color: #3b82f6; }\nfieldset {\n  border: 2px solid #e5e7eb;\n  border-radius: 0.75rem;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n}\nlegend { font-weight: bold; padding: 0 0.5rem; color: #3b82f6; }\n.form-group { margin-bottom: 1.25rem; }\nlabel { display: block; font-weight: 600; margin-bottom: 0.375rem; }\ninput[type="text"],\ninput[type="email"],\nselect,\ntextarea {\n  width: 100%;\n  padding: 0.75rem 1rem;\n  border: 2px solid #d1d5db;\n  border-radius: 0.5rem;\n  font: inherit;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\ninput:focus, select:focus, textarea:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);\n}\nbutton[type="submit"] {\n  width: 100%; padding: 0.875rem;\n  background: #3b82f6; color: white;\n  border: none; border-radius: 0.5rem;\n  font: inherit; font-weight: 600;\n  cursor: pointer;\n}\nbutton:hover { background-color: #2563eb; }',
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-contact-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: Your complete contact form",
        body: "Here's the complete contact form from this codelab. Review it, make sure you understand every part, and then customize it! Some ideas:\n\n<ul><li>Change the color scheme (try a green or purple theme)</li><li>Add a phone number field with <code>type=\"tel\"</code></li><li>Add a \"How did you hear about us?\" radio button group</li><li>Add validation feedback colors using <code>:valid</code> and <code>:invalid</code></li><li>Add a \"Preferred contact method\" radio group inside a fieldset</li></ul>\n\nThis is your free-edit playground — experiment and make the form your own!",
      },
      config: {
        type: "free-edit",
        starterCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Contact Us - PixelCraft Agency</title>\n  <style>\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body {\n      font-family: system-ui, -apple-system, sans-serif;\n      max-width: 560px;\n      margin: 2rem auto;\n      padding: 0 1rem;\n      color: #1f2937;\n      line-height: 1.6;\n    }\n    h1 { margin-bottom: 0.5rem; color: #3b82f6; }\n    p.intro { color: #6b7280; margin-bottom: 1.5rem; }\n    fieldset {\n      border: 2px solid #e5e7eb;\n      border-radius: 0.75rem;\n      padding: 1.5rem;\n      margin-bottom: 1.5rem;\n    }\n    legend { font-weight: bold; padding: 0 0.5rem; color: #3b82f6; }\n    .form-group { margin-bottom: 1.25rem; }\n    label { display: block; font-weight: 600; margin-bottom: 0.375rem; }\n    input[type="text"],\n    input[type="email"],\n    select,\n    textarea {\n      width: 100%;\n      padding: 0.75rem 1rem;\n      border: 2px solid #d1d5db;\n      border-radius: 0.5rem;\n      font: inherit;\n      font-size: 1rem;\n      transition: border-color 0.2s, box-shadow 0.2s;\n    }\n    input:focus, select:focus, textarea:focus {\n      outline: none;\n      border-color: #3b82f6;\n      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);\n    }\n    textarea { resize: vertical; }\n    .help-text { font-size: 0.8rem; color: #6b7280; margin-top: 0.375rem; }\n    input[type="checkbox"] { accent-color: #3b82f6; }\n    .checkbox-label { display: flex; align-items: center; gap: 0.5rem; font-weight: normal; }\n    button[type="submit"] {\n      width: 100%;\n      padding: 0.875rem;\n      background: #3b82f6;\n      color: white;\n      border: none;\n      border-radius: 0.5rem;\n      font: inherit;\n      font-size: 1.05rem;\n      font-weight: 600;\n      cursor: pointer;\n      transition: background-color 0.2s, transform 0.1s;\n    }\n    button:hover { background-color: #2563eb; }\n    button:active { background-color: #1d4ed8; transform: scale(0.99); }\n    button:focus-visible { outline: 2px solid #3b82f6; outline-offset: 2px; }\n  </style>\n</head>\n<body>\n  <h1>Contact Us</h1>\n  <p class="intro">Fill out the form below and we\'ll get back to you within 24 hours.</p>\n\n  <form action="/contact" method="post">\n    <div aria-live="polite" id="form-status"></div>\n\n    <fieldset>\n      <legend>Your Details</legend>\n\n      <div class="form-group">\n        <label for="name">Full Name</label>\n        <input type="text" id="name" name="name"\n          placeholder="Jane Doe" required>\n      </div>\n\n      <div class="form-group">\n        <label for="email">Email Address</label>\n        <input type="email" id="email" name="email"\n          placeholder="jane@example.com" required>\n      </div>\n\n      <div class="form-group">\n        <label for="subject">Subject</label>\n        <select id="subject" name="subject" required>\n          <option value="" disabled selected>Choose a topic...</option>\n          <option value="general">General Inquiry</option>\n          <option value="project">New Project</option>\n          <option value="support">Support</option>\n          <option value="feedback">Feedback</option>\n        </select>\n      </div>\n\n      <div class="form-group">\n        <label for="message">Message</label>\n        <textarea id="message" name="message" rows="6"\n          placeholder="Tell us about your project or question..."\n          required minlength="20"\n          aria-describedby="msg-help"></textarea>\n        <p id="msg-help" class="help-text">\n          Please include as much detail as possible. Minimum 20 characters.\n        </p>\n      </div>\n    </fieldset>\n\n    <div class="form-group">\n      <label class="checkbox-label">\n        <input type="checkbox" name="newsletter" value="yes">\n        Subscribe to our newsletter\n      </label>\n    </div>\n\n    <button type="submit">Send Message</button>\n  </form>\n</body>\n</html>',
        language: "both",
      },
      validation: { type: "contains-tag", criteria: { tag: "form" } },
      hints: [
        "Try changing #3b82f6 to a different color like #10b981 (green) or #8b5cf6 (purple).",
        "Add a new form-group with <input type=\"tel\"> for a phone number.",
        "Add a <fieldset><legend>Contact Preference</legend> with radio buttons for Email/Phone/Either.",
        "Add validation styles: input:not(:placeholder-shown):valid { border-color: #22c55e; }",
      ],
    },
  ],
};
