import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "forms-codelab-survey-form",
  slug: "codelab-survey-form",
  title: "Codelab: Build a Survey Form",
  description:
    "Build a complete survey form from scratch with multiple question types, datalist autocomplete, grouped fieldsets, validation, and responsive CSS styling.",
  order: 14,
  steps: [
    {
      id: "codelab-survey-setup",
      type: "explanation",
      instruction: {
        heading: "Step 1: Set up the survey project",
        body: "In this codelab, you'll build a survey form for a fictional product called \"CloudNote\" — a note-taking app that wants user feedback. This survey will use nearly every form element and technique you've learned in this module.\n\n<strong>What you'll build:</strong> A multi-section survey with text inputs, radio buttons, checkboxes, a select dropdown, a datalist for autocomplete suggestions, a textarea, range sliders, validation, and polished CSS.\n\n<strong>Setup instructions:</strong>\n<ol><li>Open your terminal</li><li>Create a project folder: <code>mkdir survey-form && cd survey-form</code></li><li>Create your HTML file: <code>touch index.html</code></li><li>Open it in your code editor</li></ol>\n\nStart with this boilerplate — note the viewport meta tag for mobile-friendly rendering:\n\n<code>&lt;!DOCTYPE html&gt;<br>&lt;html lang=\"en\"&gt;<br>&lt;head&gt;<br>&nbsp;&nbsp;&lt;meta charset=\"UTF-8\"&gt;<br>&nbsp;&nbsp;&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"&gt;<br>&nbsp;&nbsp;&lt;title&gt;CloudNote User Survey&lt;/title&gt;<br>&lt;/head&gt;<br>&lt;body&gt;<br>&nbsp;&nbsp;&lt;h1&gt;CloudNote User Survey&lt;/h1&gt;<br>&nbsp;&nbsp;&lt;p&gt;Help us improve CloudNote! This survey takes about 3 minutes.&lt;/p&gt;<br>&lt;/body&gt;<br>&lt;/html&gt;</code>\n\nSave and open in your browser to confirm you see the heading and intro text.",
        docLinks: [
          {
            label: "MDN: Your first form",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Your_first_form",
            type: "html-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>CloudNote User Survey</title>\n</head>\n<body>\n  <h1>CloudNote User Survey</h1>\n  <p>Help us improve CloudNote! This survey takes about 3 minutes.</p>\n</body>\n</html>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-survey-structure",
      type: "explanation",
      instruction: {
        heading: "Step 2: Create the form with fieldset sections",
        body: "Surveys are naturally divided into sections. We'll use <code>&lt;fieldset&gt;</code> and <code>&lt;legend&gt;</code> to create three clear sections, each representing a different aspect of the survey.\n\nAdd this structure inside the <code>&lt;body&gt;</code>, after the intro text:\n\n<code>&lt;form action=\"/survey\" method=\"post\"&gt;<br><br>&nbsp;&nbsp;&lt;fieldset&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;legend&gt;About You&lt;/legend&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- User info fields --&gt;<br>&nbsp;&nbsp;&lt;/fieldset&gt;<br><br>&nbsp;&nbsp;&lt;fieldset&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;legend&gt;Your Experience&lt;/legend&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Experience questions --&gt;<br>&nbsp;&nbsp;&lt;/fieldset&gt;<br><br>&nbsp;&nbsp;&lt;fieldset&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;legend&gt;Feature Feedback&lt;/legend&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Feature questions --&gt;<br>&nbsp;&nbsp;&lt;/fieldset&gt;<br><br>&nbsp;&nbsp;&lt;button type=\"submit\"&gt;Submit Survey&lt;/button&gt;<br>&lt;/form&gt;</code>\n\nThis gives us a clear, organized structure. Screen readers will announce the legend before each group of fields, so users always know which section they're in. Save and refresh to see the three fieldset sections with their borders and legends.",
        docLinks: [
          {
            label: "MDN: How to structure a web form",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/How_to_structure_a_web_form",
            type: "html-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<form action="/survey" method="post">\n\n  <fieldset>\n    <legend>About You</legend>\n    <!-- User info fields -->\n  </fieldset>\n\n  <fieldset>\n    <legend>Your Experience</legend>\n    <!-- Experience questions -->\n  </fieldset>\n\n  <fieldset>\n    <legend>Feature Feedback</legend>\n    <!-- Feature questions -->\n  </fieldset>\n\n  <button type="submit">Submit Survey</button>\n</form>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-survey-question-types",
      type: "explanation",
      instruction: {
        heading: "Step 3: Add various question types",
        body: "Now fill in each section with appropriate question types.\n\n<strong>Section 1: About You</strong> — Add inside the first fieldset:\n\n<code>&lt;div class=\"form-group\"&gt;<br>&nbsp;&nbsp;&lt;label for=\"name\"&gt;Name (optional)&lt;/label&gt;<br>&nbsp;&nbsp;&lt;input type=\"text\" id=\"name\" name=\"name\" placeholder=\"Your name\"&gt;<br>&lt;/div&gt;<br><br>&lt;div class=\"form-group\"&gt;<br>&nbsp;&nbsp;&lt;label for=\"email\"&gt;Email&lt;/label&gt;<br>&nbsp;&nbsp;&lt;input type=\"email\" id=\"email\" name=\"email\" required placeholder=\"you@example.com\"&gt;<br>&lt;/div&gt;<br><br>&lt;div class=\"form-group\"&gt;<br>&nbsp;&nbsp;&lt;label for=\"age-range\"&gt;Age Range&lt;/label&gt;<br>&nbsp;&nbsp;&lt;select id=\"age-range\" name=\"age_range\" required&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;option value=\"\" disabled selected&gt;Select...&lt;/option&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;option value=\"18-24\"&gt;18-24&lt;/option&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;option value=\"25-34\"&gt;25-34&lt;/option&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;option value=\"35-44\"&gt;35-44&lt;/option&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;option value=\"45-54\"&gt;45-54&lt;/option&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;option value=\"55+\"&gt;55+&lt;/option&gt;<br>&nbsp;&nbsp;&lt;/select&gt;<br>&lt;/div&gt;</code>\n\n<strong>Section 2: Your Experience</strong> — Radio buttons for satisfaction + checkbox group:\n\n<code>&lt;div class=\"form-group\"&gt;<br>&nbsp;&nbsp;&lt;p class=\"question\"&gt;How satisfied are you with CloudNote?&lt;/p&gt;<br>&nbsp;&nbsp;&lt;label&gt;&lt;input type=\"radio\" name=\"satisfaction\" value=\"very-satisfied\" required&gt; Very Satisfied&lt;/label&gt;<br>&nbsp;&nbsp;&lt;label&gt;&lt;input type=\"radio\" name=\"satisfaction\" value=\"satisfied\"&gt; Satisfied&lt;/label&gt;<br>&nbsp;&nbsp;&lt;label&gt;&lt;input type=\"radio\" name=\"satisfaction\" value=\"neutral\"&gt; Neutral&lt;/label&gt;<br>&nbsp;&nbsp;&lt;label&gt;&lt;input type=\"radio\" name=\"satisfaction\" value=\"dissatisfied\"&gt; Dissatisfied&lt;/label&gt;<br>&lt;/div&gt;<br><br>&lt;div class=\"form-group\"&gt;<br>&nbsp;&nbsp;&lt;p class=\"question\"&gt;Which features do you use? (select all that apply)&lt;/p&gt;<br>&nbsp;&nbsp;&lt;label&gt;&lt;input type=\"checkbox\" name=\"features\" value=\"notes\"&gt; Note Taking&lt;/label&gt;<br>&nbsp;&nbsp;&lt;label&gt;&lt;input type=\"checkbox\" name=\"features\" value=\"folders\"&gt; Folder Organization&lt;/label&gt;<br>&nbsp;&nbsp;&lt;label&gt;&lt;input type=\"checkbox\" name=\"features\" value=\"search\"&gt; Search&lt;/label&gt;<br>&nbsp;&nbsp;&lt;label&gt;&lt;input type=\"checkbox\" name=\"features\" value=\"sharing\"&gt; Sharing&lt;/label&gt;<br>&nbsp;&nbsp;&lt;label&gt;&lt;input type=\"checkbox\" name=\"features\" value=\"sync\"&gt; Cloud Sync&lt;/label&gt;<br>&lt;/div&gt;</code>\n\nSave and refresh to see both sections populated with interactive controls.",
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- Section 1: About You -->\n<div class="form-group">\n  <label for="name">Name (optional)</label>\n  <input type="text" id="name" name="name">\n</div>\n<div class="form-group">\n  <label for="email">Email</label>\n  <input type="email" id="email" name="email" required>\n</div>\n<div class="form-group">\n  <label for="age-range">Age Range</label>\n  <select id="age-range" name="age_range" required>\n    <option value="" disabled selected>Select...</option>\n    <option value="18-24">18-24</option>\n    <option value="25-34">25-34</option>\n    <!-- ... -->\n  </select>\n</div>\n\n<!-- Section 2: Experience -->\n<div class="form-group">\n  <p class="question">How satisfied are you?</p>\n  <label><input type="radio" name="satisfaction" value="very-satisfied" required> Very Satisfied</label>\n  <label><input type="radio" name="satisfaction" value="satisfied"> Satisfied</label>\n  <!-- ... -->\n</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-survey-datalist",
      type: "explanation",
      instruction: {
        heading: "Step 4: Add a datalist and range slider",
        body: "In the \"Feature Feedback\" section (the third fieldset), we'll add more advanced form elements.\n\n<strong>A datalist for suggested features:</strong> Let users type a feature request, with autocomplete suggestions for common requests:\n\n<code>&lt;div class=\"form-group\"&gt;<br>&nbsp;&nbsp;&lt;label for=\"feature-request\"&gt;Feature you'd most like to see&lt;/label&gt;<br>&nbsp;&nbsp;&lt;input type=\"text\" id=\"feature-request\" name=\"feature_request\"<br>&nbsp;&nbsp;&nbsp;&nbsp;list=\"feature-suggestions\" placeholder=\"Type or select...\"&gt;<br>&nbsp;&nbsp;&lt;datalist id=\"feature-suggestions\"&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;option value=\"Dark mode\"&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;option value=\"Markdown support\"&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;option value=\"Offline mode\"&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;option value=\"AI assistant\"&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;option value=\"Collaboration\"&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;option value=\"Templates\"&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;option value=\"Calendar integration\"&gt;<br>&nbsp;&nbsp;&lt;/datalist&gt;<br>&lt;/div&gt;</code>\n\n<strong>A range slider for recommendation score:</strong>\n\n<code>&lt;div class=\"form-group\"&gt;<br>&nbsp;&nbsp;&lt;label for=\"recommend\"&gt;How likely to recommend? (1-10)&lt;/label&gt;<br>&nbsp;&nbsp;&lt;div class=\"range-container\"&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;input type=\"range\" id=\"recommend\" name=\"recommend_score\"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min=\"1\" max=\"10\" value=\"5\" step=\"1\"&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;output for=\"recommend\"&gt;5&lt;/output&gt;<br>&nbsp;&nbsp;&lt;/div&gt;<br>&lt;/div&gt;</code>\n\n<strong>A textarea for additional comments:</strong>\n\n<code>&lt;div class=\"form-group\"&gt;<br>&nbsp;&nbsp;&lt;label for=\"comments\"&gt;Additional Comments&lt;/label&gt;<br>&nbsp;&nbsp;&lt;textarea id=\"comments\" name=\"comments\" rows=\"4\"<br>&nbsp;&nbsp;&nbsp;&nbsp;placeholder=\"Anything else you'd like to share...\"<br>&nbsp;&nbsp;&nbsp;&nbsp;maxlength=\"500\"&gt;&lt;/textarea&gt;<br>&nbsp;&nbsp;&lt;p class=\"help-text\"&gt;Maximum 500 characters.&lt;/p&gt;<br>&lt;/div&gt;</code>\n\nSave and refresh. Try typing in the feature request field — you should see autocomplete suggestions appear. Drag the range slider to see it move (the output value won't update without JavaScript, but the slider itself works).",
        docLinks: [
          {
            label: "MDN: <datalist> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist",
            type: "html-element",
          },
          {
            label: "MDN: <input type=\"range\">",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range",
            type: "html-element",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- Datalist for autocomplete suggestions -->\n<label for="feature-request">Feature you\'d most like to see</label>\n<input type="text" id="feature-request" name="feature_request"\n  list="feature-suggestions" placeholder="Type or select...">\n<datalist id="feature-suggestions">\n  <option value="Dark mode">\n  <option value="Markdown support">\n  <option value="Offline mode">\n  <option value="AI assistant">\n  <option value="Collaboration">\n  <option value="Templates">\n</datalist>\n\n<!-- Range slider with output -->\n<label for="recommend">How likely to recommend? (1-10)</label>\n<input type="range" id="recommend" name="recommend_score"\n  min="1" max="10" value="5" step="1">\n<output for="recommend">5</output>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-survey-validation",
      type: "explanation",
      instruction: {
        heading: "Step 5: Add validation and accessibility",
        body: "Let's add the final accessibility and validation touches.\n\n<strong>Validation:</strong> Make sure the required fields can't be skipped:\n<ul><li>Email: already has <code>required</code> and <code>type=\"email\"</code></li><li>Age range: already has <code>required</code> on the select</li><li>Satisfaction: already has <code>required</code> on the first radio (only needed on one radio in the group)</li></ul>\n\n<strong>Accessibility enhancements:</strong>\n\n1. Add <code>aria-describedby</code> to the comments textarea:\n<code>&lt;textarea ... aria-describedby=\"comments-help\"&gt;&lt;/textarea&gt;<br>&lt;p id=\"comments-help\" class=\"help-text\"&gt;Maximum 500 characters.&lt;/p&gt;</code>\n\n2. Add an <code>aria-live</code> region at the top of the form:\n<code>&lt;div aria-live=\"polite\" id=\"survey-status\"&gt;&lt;/div&gt;</code>\n\n3. Add a required indicator to labels. Update required field labels to include a visual asterisk:\n<code>&lt;label for=\"email\"&gt;Email &lt;span aria-hidden=\"true\"&gt;*&lt;/span&gt;&lt;/label&gt;</code>\nThe <code>aria-hidden=\"true\"</code> hides the asterisk from screen readers (since the field is already announced as required via the <code>required</code> attribute).\n\n4. Add a note at the top explaining the asterisk:\n<code>&lt;p class=\"required-note\"&gt;Fields marked with &lt;span aria-hidden=\"true\"&gt;*&lt;/span&gt; are required.&lt;/p&gt;</code>\n\nSave, refresh, and test by tabbing through the entire form with your keyboard. Every field should be reachable, and the submit button should be the last tab stop before the form.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Visual asterisks (*) for required fields are a well-understood convention, but they must be supplemented with the actual <code>required</code> attribute on the input. The asterisk is a visual hint for sighted users; the <code>required</code> attribute is the programmatic indicator for browsers and screen readers. Never rely on the asterisk alone.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- At top of form: aria-live region and required note -->\n<div aria-live="polite" id="survey-status"></div>\n<p class="required-note">\n  Fields marked with <span aria-hidden="true">*</span> are required.\n</p>\n\n<!-- Label with required indicator -->\n<label for="email">\n  Email <span aria-hidden="true">*</span>\n</label>\n<input type="email" id="email" name="email" required>\n\n<!-- Textarea with aria-describedby -->\n<textarea id="comments" name="comments"\n  aria-describedby="comments-help"\n  maxlength="500"></textarea>\n<p id="comments-help" class="help-text">Maximum 500 characters.</p>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-survey-css",
      type: "explanation",
      instruction: {
        heading: "Step 6: Style the survey form",
        body: "Add a <code>&lt;style&gt;</code> block in the <code>&lt;head&gt;</code> with comprehensive CSS. This survey uses a card-based design with each fieldset appearing as its own card.\n\nHere's the CSS to add:\n\n<code>&lt;style&gt;<br>&nbsp;&nbsp;* { box-sizing: border-box; margin: 0; padding: 0; }<br>&nbsp;&nbsp;body {<br>&nbsp;&nbsp;&nbsp;&nbsp;font-family: system-ui, -apple-system, sans-serif;<br>&nbsp;&nbsp;&nbsp;&nbsp;max-width: 640px; margin: 2rem auto; padding: 0 1rem;<br>&nbsp;&nbsp;&nbsp;&nbsp;color: #1f2937; line-height: 1.6;<br>&nbsp;&nbsp;&nbsp;&nbsp;background-color: #f9fafb;<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;h1 { text-align: center; color: #7c3aed; margin-bottom: 0.25rem; }<br>&nbsp;&nbsp;.intro { text-align: center; color: #6b7280; margin-bottom: 2rem; }<br>&nbsp;&nbsp;fieldset {<br>&nbsp;&nbsp;&nbsp;&nbsp;border: none; background: white; border-radius: 1rem;<br>&nbsp;&nbsp;&nbsp;&nbsp;padding: 1.5rem; margin-bottom: 1.5rem;<br>&nbsp;&nbsp;&nbsp;&nbsp;box-shadow: 0 1px 3px rgba(0,0,0,0.1);<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;legend { font-size: 1.2rem; font-weight: 700; color: #7c3aed; margin-bottom: 1rem; }<br>&nbsp;&nbsp;.form-group { margin-bottom: 1.25rem; }<br>&nbsp;&nbsp;label { display: block; margin-bottom: 0.25rem; }<br>&nbsp;&nbsp;.question { font-weight: 600; margin-bottom: 0.5rem; }<br>&nbsp;&nbsp;input[type=\"text\"], input[type=\"email\"], select, textarea {<br>&nbsp;&nbsp;&nbsp;&nbsp;width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb;<br>&nbsp;&nbsp;&nbsp;&nbsp;border-radius: 0.5rem; font: inherit;<br>&nbsp;&nbsp;&nbsp;&nbsp;transition: border-color 0.2s, box-shadow 0.2s;<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;input:focus, select:focus, textarea:focus {<br>&nbsp;&nbsp;&nbsp;&nbsp;outline: none; border-color: #7c3aed;<br>&nbsp;&nbsp;&nbsp;&nbsp;box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;input[type=\"checkbox\"], input[type=\"radio\"] { accent-color: #7c3aed; }<br>&nbsp;&nbsp;input[type=\"range\"] { width: 100%; accent-color: #7c3aed; }<br>&nbsp;&nbsp;.range-container { display: flex; align-items: center; gap: 1rem; }<br>&nbsp;&nbsp;.range-container output { font-weight: bold; color: #7c3aed; }<br>&nbsp;&nbsp;textarea { resize: vertical; }<br>&nbsp;&nbsp;.help-text { font-size: 0.8rem; color: #9ca3af; margin-top: 0.25rem; }<br>&nbsp;&nbsp;.required-note { font-size: 0.85rem; color: #9ca3af; margin-bottom: 1.5rem; text-align: center; }<br>&nbsp;&nbsp;button[type=\"submit\"] {<br>&nbsp;&nbsp;&nbsp;&nbsp;width: 100%; padding: 1rem; background: #7c3aed; color: white;<br>&nbsp;&nbsp;&nbsp;&nbsp;border: none; border-radius: 0.75rem; font: inherit;<br>&nbsp;&nbsp;&nbsp;&nbsp;font-size: 1.1rem; font-weight: 600; cursor: pointer;<br>&nbsp;&nbsp;&nbsp;&nbsp;transition: background 0.2s, transform 0.1s;<br>&nbsp;&nbsp;}<br>&nbsp;&nbsp;button:hover { background: #6d28d9; }<br>&nbsp;&nbsp;button:active { background: #5b21b6; transform: scale(0.99); }<br>&lt;/style&gt;</code>\n\nSave and refresh. The form should now have a clean, card-based design with a purple accent color. The fieldsets appear as white cards on a light gray background, radio/checkbox colors match the theme, and the submit button is prominent and inviting.",
      },
      config: {
        type: "explanation",
        demoCode:
          '/* Survey form card-based design */\nbody { background-color: #f9fafb; }\nh1 { text-align: center; color: #7c3aed; }\nfieldset {\n  border: none;\n  background: white;\n  border-radius: 1rem;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n  box-shadow: 0 1px 3px rgba(0,0,0,0.1);\n}\nlegend { font-size: 1.2rem; font-weight: 700; color: #7c3aed; }\ninput[type="checkbox"],\ninput[type="radio"],\ninput[type="range"] {\n  accent-color: #7c3aed;\n}\nbutton[type="submit"] {\n  width: 100%; padding: 1rem;\n  background: #7c3aed; color: white;\n  border: none; border-radius: 0.75rem;\n  font-weight: 600; cursor: pointer;\n}\nbutton:hover { background: #6d28d9; }',
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-survey-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: Your complete survey form",
        body: "Here's the complete survey form. Review the code, make sure you understand every part, then customize it!\n\nIdeas for customization:\n<ul><li>Change the color scheme from purple to teal or orange</li><li>Add a \"How often do you use CloudNote?\" radio group (Daily / Weekly / Monthly / Rarely)</li><li>Add a <code>type=\"number\"</code> field for \"How many notes do you create per week?\"</li><li>Add validation feedback colors with <code>:valid</code> and <code>:invalid</code></li><li>Add a second datalist for \"How did you discover CloudNote?\" with suggestions</li><li>Add <code>:focus-visible</code> styles for keyboard users</li></ul>\n\nThis is your playground — experiment freely!",
      },
      config: {
        type: "free-edit",
        starterCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>CloudNote User Survey</title>\n  <style>\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body {\n      font-family: system-ui, -apple-system, sans-serif;\n      max-width: 640px; margin: 2rem auto; padding: 0 1rem;\n      color: #1f2937; line-height: 1.6; background-color: #f9fafb;\n    }\n    h1 { text-align: center; color: #7c3aed; margin-bottom: 0.25rem; }\n    .intro { text-align: center; color: #6b7280; margin-bottom: 1rem; }\n    .required-note { font-size: 0.85rem; color: #9ca3af; margin-bottom: 1.5rem; text-align: center; }\n    fieldset {\n      border: none; background: white; border-radius: 1rem;\n      padding: 1.5rem; margin-bottom: 1.5rem;\n      box-shadow: 0 1px 3px rgba(0,0,0,0.1);\n    }\n    legend { font-size: 1.2rem; font-weight: 700; color: #7c3aed; margin-bottom: 1rem; }\n    .form-group { margin-bottom: 1.25rem; }\n    label { display: block; margin-bottom: 0.25rem; }\n    .question { font-weight: 600; margin-bottom: 0.5rem; }\n    input[type="text"], input[type="email"], select, textarea {\n      width: 100%; padding: 0.75rem; border: 2px solid #e5e7eb;\n      border-radius: 0.5rem; font: inherit;\n      transition: border-color 0.2s, box-shadow 0.2s;\n    }\n    input:focus, select:focus, textarea:focus {\n      outline: none; border-color: #7c3aed;\n      box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);\n    }\n    input[type="checkbox"], input[type="radio"] { accent-color: #7c3aed; }\n    input[type="range"] { width: 100%; accent-color: #7c3aed; }\n    .range-container { display: flex; align-items: center; gap: 1rem; }\n    .range-container output { font-weight: bold; color: #7c3aed; min-width: 2rem; }\n    textarea { resize: vertical; }\n    .help-text { font-size: 0.8rem; color: #9ca3af; margin-top: 0.25rem; }\n    button[type="submit"] {\n      width: 100%; padding: 1rem; background: #7c3aed; color: white;\n      border: none; border-radius: 0.75rem; font: inherit;\n      font-size: 1.1rem; font-weight: 600; cursor: pointer;\n      transition: background 0.2s, transform 0.1s;\n    }\n    button:hover { background: #6d28d9; }\n    button:active { background: #5b21b6; transform: scale(0.99); }\n    button:focus-visible { outline: 2px solid #7c3aed; outline-offset: 2px; }\n  </style>\n</head>\n<body>\n  <h1>CloudNote User Survey</h1>\n  <p class="intro">Help us improve CloudNote! This survey takes about 3 minutes.</p>\n  <p class="required-note">Fields marked with <span aria-hidden="true">*</span> are required.</p>\n\n  <form action="/survey" method="post">\n    <div aria-live="polite" id="survey-status"></div>\n\n    <fieldset>\n      <legend>About You</legend>\n\n      <div class="form-group">\n        <label for="name">Name (optional)</label>\n        <input type="text" id="name" name="name" placeholder="Your name">\n      </div>\n\n      <div class="form-group">\n        <label for="email">Email <span aria-hidden="true">*</span></label>\n        <input type="email" id="email" name="email" required\n          placeholder="you@example.com">\n      </div>\n\n      <div class="form-group">\n        <label for="age-range">Age Range <span aria-hidden="true">*</span></label>\n        <select id="age-range" name="age_range" required>\n          <option value="" disabled selected>Select...</option>\n          <option value="18-24">18-24</option>\n          <option value="25-34">25-34</option>\n          <option value="35-44">35-44</option>\n          <option value="45-54">45-54</option>\n          <option value="55+">55+</option>\n        </select>\n      </div>\n    </fieldset>\n\n    <fieldset>\n      <legend>Your Experience</legend>\n\n      <div class="form-group">\n        <p class="question">How satisfied are you with CloudNote? <span aria-hidden="true">*</span></p>\n        <label><input type="radio" name="satisfaction" value="very-satisfied" required> Very Satisfied</label>\n        <label><input type="radio" name="satisfaction" value="satisfied"> Satisfied</label>\n        <label><input type="radio" name="satisfaction" value="neutral"> Neutral</label>\n        <label><input type="radio" name="satisfaction" value="dissatisfied"> Dissatisfied</label>\n        <label><input type="radio" name="satisfaction" value="very-dissatisfied"> Very Dissatisfied</label>\n      </div>\n\n      <div class="form-group">\n        <p class="question">Which features do you use? (select all that apply)</p>\n        <label><input type="checkbox" name="features" value="notes"> Note Taking</label>\n        <label><input type="checkbox" name="features" value="folders"> Folder Organization</label>\n        <label><input type="checkbox" name="features" value="search"> Search</label>\n        <label><input type="checkbox" name="features" value="sharing"> Sharing</label>\n        <label><input type="checkbox" name="features" value="sync"> Cloud Sync</label>\n        <label><input type="checkbox" name="features" value="tags"> Tags</label>\n      </div>\n    </fieldset>\n\n    <fieldset>\n      <legend>Feature Feedback</legend>\n\n      <div class="form-group">\n        <label for="feature-request">Feature you\'d most like to see</label>\n        <input type="text" id="feature-request" name="feature_request"\n          list="feature-suggestions" placeholder="Type or select...">\n        <datalist id="feature-suggestions">\n          <option value="Dark mode">\n          <option value="Markdown support">\n          <option value="Offline mode">\n          <option value="AI assistant">\n          <option value="Collaboration">\n          <option value="Templates">\n          <option value="Calendar integration">\n          <option value="Mobile app">\n        </datalist>\n      </div>\n\n      <div class="form-group">\n        <label for="recommend">How likely are you to recommend CloudNote? (1-10)</label>\n        <div class="range-container">\n          <input type="range" id="recommend" name="recommend_score"\n            min="1" max="10" value="5" step="1">\n          <output for="recommend">5</output>\n        </div>\n      </div>\n\n      <div class="form-group">\n        <label for="comments">Additional Comments</label>\n        <textarea id="comments" name="comments" rows="4"\n          placeholder="Anything else you\'d like to share..."\n          maxlength="500" aria-describedby="comments-help"></textarea>\n        <p id="comments-help" class="help-text">Maximum 500 characters.</p>\n      </div>\n    </fieldset>\n\n    <button type="submit">Submit Survey</button>\n  </form>\n</body>\n</html>',
        language: "both",
      },
      validation: { type: "contains-tag", criteria: { tag: "form" } },
      hints: [
        "Try changing #7c3aed (purple) to #0d9488 (teal) or #ea580c (orange) throughout.",
        "Add a new radio group inside a form-group: Daily / Weekly / Monthly / Rarely.",
        "Add <input type=\"number\" min=\"0\" max=\"100\" step=\"1\"> for notes per week.",
        "Add input:not(:placeholder-shown):valid { border-color: #22c55e; } for validation colors.",
      ],
    },
  ],
};
