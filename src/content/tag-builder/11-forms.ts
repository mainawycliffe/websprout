import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "tag-builder-forms",
  slug: "forms",
  title: "HTML Forms",
  description:
    "Collect user input with form elements: text fields, buttons, dropdowns, and more.",
  order: 11,
  steps: [
    {
      id: "forms-intro",
      type: "explanation",
      instruction: {
        heading: "Forms let users send information",
        body: "Every time you type into a search bar, log into an account, fill out a survey, or post a comment, you are using an HTML form. Forms exist because the web is not just for reading — it is for interacting. The <form> element is a container that groups input fields together and (when connected to a server) can send the collected data somewhere.\n\nInside a form, the <input> element creates fields where users type or select things. The <label> element gives each input a visible, clickable label. And <button> lets users submit the form. Even without a backend server, understanding forms is essential — they are the building blocks of every login page, checkout flow, and search bar on the web.",
        analogy:
          "A form is like a paper questionnaire. The <form> tag is the sheet of paper itself. Each <input> is a blank line or checkbox. Each <label> is the question text next to the blank. And the <button> is the 'Submit' action at the bottom. Without labels, users would stare at blank lines with no idea what to fill in.",
        infoBoxes: [
          {
            variant: "standard",
            title: "Labels are essential",
            body: "The <label> element is not optional decoration — it is essential for accessibility. Screen readers read the label aloud when a user focuses an input. Clicking the label also focuses the associated input, making forms easier to use on small screens. Connect them with the for attribute matching the input's id.",
          },
        ],
        docLinks: [
          {
            label: "<form>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form",
            type: "html-element",
          },
          {
            label: "<input>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input",
            type: "html-element",
          },
          {
            label: "<label>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label",
            type: "html-element",
          },
          {
            label: "<button>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button",
            type: "html-element",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<form>\n  <label for="username">Username:</label>\n  <input type="text" id="username" name="username"\n    placeholder="Enter your name">\n\n  <label for="email">Email:</label>\n  <input type="email" id="email" name="email"\n    placeholder="you@example.com">\n\n  <button type="submit">Sign Up</button>\n</form>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "forms-input-types",
      type: "explanation",
      instruction: {
        heading: "Different inputs for different data",
        body: 'The type attribute on <input> completely changes what the field looks like and how it behaves. type="text" is a plain text box. type="email" looks similar but the browser validates that the user typed a real email address — and on phones, it shows a keyboard with the @ symbol. type="password" hides what you type with dots. type="checkbox" creates a clickable box. type="radio" creates options where only one can be selected.\n\nThe placeholder attribute shows ghost text inside the field before the user types — like "Enter your email" in gray. The name attribute gives each field a unique identifier so the data can be processed (like a label on a filing cabinet drawer).',
        analogy:
          "Think of input types as different kinds of form fields on a paper form. A 'text' input is a blank line. A 'password' input is a blank line where someone holds a card over what you write. A 'checkbox' is a square you tick. A 'radio' button is a circle where you pick just one. The browser draws the right kind of field based on the type you choose.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Placeholder is not a label",
            body: "Placeholder text disappears as soon as the user starts typing. Never use placeholder as a replacement for <label> — users with cognitive disabilities may forget what the field was for once they start typing and the placeholder vanishes.",
          },
          {
            variant: "standard",
            title: "Types improve user experience",
            body: 'Using the correct input type is not just about appearance. type="email" triggers browser validation, type="tel" shows a phone keypad on mobile, and type="url" checks for a valid URL format. Correct types improve user experience and reduce errors.',
          },
        ],
        docLinks: [
          {
            label: "<input> types",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types",
            type: "html-attribute",
          },
          {
            label: "placeholder attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#placeholder",
            type: "html-attribute",
          },
          {
            label: "name attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name",
            type: "html-attribute",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<form>\n  <label for="pass">Password:</label>\n  <input type="password" id="pass"\n    name="password" placeholder="Enter password">\n\n  <br><br>\n  <label>\n    <input type="checkbox" name="remember"> Remember me\n  </label>\n\n  <br><br>\n  <p>Favorite color:</p>\n  <label>\n    <input type="radio" name="color" value="red"> Red\n  </label>\n  <label>\n    <input type="radio" name="color" value="blue"> Blue\n  </label>\n  <label>\n    <input type="radio" name="color" value="green"> Green\n  </label>\n</form>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "forms-select-textarea",
      type: "explanation",
      instruction: {
        heading: "Select menus and multi-line text",
        body: "Two more form elements round out the toolkit. <select> creates a dropdown menu with <option> elements inside it — perfect for choosing a country, a shirt size, or a category. <textarea> creates a large, resizable text box for multi-line input — like a comment box, a message field, or a bio section.\n\nYou see <select> on every e-commerce checkout (country/state picker), airline booking (number of passengers), and settings page. <textarea> appears wherever users write longer text: social media posts, email bodies, feedback forms, and code editors.",
        infoBoxes: [
          {
            variant: "standard",
            title: "Default option pattern",
            body: 'The first <option> in a <select> is shown by default. It is common to make the first option a non-selectable prompt: <option value="" disabled selected>Choose one...</option>. This guides the user without pre-selecting a real choice.',
          },
        ],
        docLinks: [
          {
            label: "<select>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select",
            type: "html-element",
          },
          {
            label: "<option>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option",
            type: "html-element",
          },
          {
            label: "<textarea>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea",
            type: "html-element",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<form>\n  <label for="country">Country:</label>\n  <select id="country" name="country">\n    <option value="" disabled selected>\n      Choose a country...\n    </option>\n    <option value="us">United States</option>\n    <option value="uk">United Kingdom</option>\n    <option value="ke">Kenya</option>\n    <option value="jp">Japan</option>\n  </select>\n\n  <br><br>\n  <label for="message">Message:</label>\n  <textarea id="message" name="message"\n    rows="4" cols="40"\n    placeholder="Write your message...">\n  </textarea>\n</form>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "forms-gap-label",
      type: "gap-fill",
      instruction: {
        heading: "Wire up a label and input",
        body: "Fill in the blanks to create a properly connected label and text input. The for attribute on the label must match the id on the input — this is how the browser knows they belong together. When they match, clicking the label text will focus the input field.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Case-sensitive match",
            body: 'The for and id values must be identical — including capitalization. for="Email" will NOT connect to id="email". This is one of the most common form bugs.',
          },
        ],
        docLinks: [],
      },
      config: {
        type: "gap-fill",
        template:
          '<form>\n  <label {{for_attr}}="fullname">Full Name:</label>\n  <input type="{{input_type}}" {{id_attr}}="fullname"\n    name="fullname">\n\n  <button type="submit">Submit</button>\n</form>',
        gaps: [
          {
            id: "for_attr",
            placeholder: "label attribute",
            acceptedAnswers: ["for"],
            caseSensitive: true,
          },
          {
            id: "input_type",
            placeholder: "input type",
            acceptedAnswers: ["text"],
            caseSensitive: false,
          },
          {
            id: "id_attr",
            placeholder: "matching attribute",
            acceptedAnswers: ["id"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The attribute on <label> that points to an input is for.",
        'A basic text field uses type="text".',
        "The attribute on <input> that gives it a unique name for the label to reference is id.",
      ],
    },
    {
      id: "forms-gap-select",
      type: "gap-fill",
      instruction: {
        heading: "Complete the dropdown menu",
        body: "Fill in the blanks to create a working dropdown. Each choice inside the dropdown is an <option> element, and the whole list is wrapped in a <select>.",
        docLinks: [],
      },
      config: {
        type: "gap-fill",
        template:
          '<label for="size">T-shirt size:</label>\n<{{select_tag}} id="size" name="size">\n  <option value="s">Small</option>\n  <{{option_tag}} value="m">Medium</{{option_tag}}>\n  <option value="{{lg_value}}">Large</option>\n</{{select_tag}}>',
        gaps: [
          {
            id: "select_tag",
            placeholder: "dropdown tag",
            acceptedAnswers: ["select"],
            caseSensitive: true,
          },
          {
            id: "option_tag",
            placeholder: "choice tag",
            acceptedAnswers: ["option"],
            caseSensitive: true,
          },
          {
            id: "lg_value",
            placeholder: "value for large",
            acceptedAnswers: ["l", "lg", "large"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The dropdown container tag is <select>.",
        "Each choice inside the dropdown is an <option>.",
        "The value should be a short code like 'l' or 'lg' — it's what gets sent to the server, while the text between the tags ('Large') is what the user sees.",
      ],
    },
    {
      id: "forms-free-edit",
      type: "free-edit",
      instruction: {
        heading: "Create a contact form",
        body: "Build a contact form from scratch. Your form must include: a text input for the person's name (with a label), an email input (with a label), a <textarea> for their message, and a submit button. Optionally, add a <select> dropdown for the subject or reason.\n\nThis is the exact same form you find on the \"Contact Us\" page of nearly every business website.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Always use the name attribute",
            body: "Every <input> should have a name attribute, even without a backend server. The name is what identifies each field's data — without it, the form data has no key and would be lost in a real submission.",
          },
          {
            variant: "standard",
            title: "Form action and method",
            body: 'The action attribute on <form> specifies where form data is sent. The method attribute specifies how: GET appends data to the URL (for searches), POST sends it hidden in the request body (for passwords and personal data). Without a server, these attributes have no effect, but they are important concepts.',
          },
        ],
        docLinks: [
          {
            label: "action attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#action",
            type: "html-attribute",
          },
          {
            label: "method attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#method",
            type: "html-attribute",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          "<form>\n  <!-- Name field -->\n\n  <!-- Email field -->\n\n  <!-- Message area -->\n\n  <!-- Submit button -->\n</form>",
        language: "html",
      },
      validation: { type: "contains-tag", criteria: { tag: "form" } },
      hints: [
        'Start with a label and input pair: <label for="name">Name:</label> then <input type="text" id="name" name="name">.',
        'For email, use type="email" — the browser will validate the format automatically.',
        'A textarea doesn\'t use type — just <textarea id="msg" name="message" rows="5"></textarea>.',
        'Add a submit button: <button type="submit">Send Message</button>.',
      ],
    },
  ],
};
