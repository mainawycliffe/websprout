import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "forms-textarea-other-elements",
  slug: "textarea-other-elements",
  title: "Textarea and Other Form Elements",
  description:
    "Learn about <textarea> for multi-line text, button types, fieldset/legend for grouping, and lesser-known elements like <output>, <meter>, and <progress>.",
  order: 7,
  steps: [
    {
      id: "textarea-multiline",
      type: "explanation",
      instruction: {
        heading: "The <textarea> element — multi-line text input",
        body: "When a single-line <code>&lt;input type=\"text\"&gt;</code> isn't enough — like writing a message, a bio, a review, or a comment — you need <code>&lt;textarea&gt;</code>. This element creates a multi-line, resizable text area where users can type paragraphs of text.\n\nUnlike <code>&lt;input&gt;</code>, the <code>&lt;textarea&gt;</code> element is <strong>not</strong> self-closing. It has both an opening and closing tag, and any text placed between them becomes the default content:\n<code>&lt;textarea name=\"message\"&gt;Default text here&lt;/textarea&gt;</code>\n\nKey attributes:\n<ul><li><code>rows</code> — the visible height in lines of text (e.g., <code>rows=\"5\"</code> shows 5 lines)</li><li><code>cols</code> — the visible width in characters (e.g., <code>cols=\"40\"</code> shows about 40 characters wide)</li><li><code>maxlength</code> — the maximum number of characters allowed</li><li><code>minlength</code> — the minimum number of characters required</li><li><code>placeholder</code> — hint text, same as with inputs</li></ul>\n\nMost modern websites style textareas with CSS width and height instead of <code>rows</code>/<code>cols</code>, but the attributes still work and are useful for quick prototyping.\n\nReal-world examples: Twitter's (X's) compose box is a textarea with <code>maxlength=\"280\"</code>. Amazon product reviews, YouTube comments, GitHub issue descriptions — all textareas. Any time you see a large text box on a website, it's a <code>&lt;textarea&gt;</code>.",
        docLinks: [
          {
            label: "MDN: <textarea> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "A very common mistake: trying to set a textarea's default value using a <code>value</code> attribute like an input. Textareas don't use the <code>value</code> attribute — the default text goes <strong>between the opening and closing tags</strong>. Also, any whitespace (including indentation) between the tags counts as content. Write <code>&lt;textarea&gt;&lt;/textarea&gt;</code> with no space between the tags if you want it empty.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<label for="bio">Bio:</label><br>\n<textarea id="bio" name="bio" rows="4" cols="50"\n  placeholder="Tell us about yourself..." maxlength="500"></textarea>\n\n<br><br>\n\n<label for="review">Product Review:</label><br>\n<textarea id="review" name="review" rows="6" cols="50"\n  minlength="20" placeholder="Write your review (at least 20 characters)..."></textarea>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "button-types",
      type: "explanation",
      instruction: {
        heading: "Button types: submit, reset, and button",
        body: "The <code>&lt;button&gt;</code> element creates a clickable button in a form. What many beginners don't realize is that buttons have a <code>type</code> attribute that controls their behavior:\n\n<strong><code>type=\"submit\"</code></strong> — This is the default. When clicked, it submits the form. If you write <code>&lt;button&gt;Send&lt;/button&gt;</code> without specifying a type, it behaves as a submit button. This is the most common button type in forms.\n\n<strong><code>type=\"reset\"</code></strong> — When clicked, it resets all form fields to their initial values. Everything the user typed gets erased. Use this very carefully — accidentally clicking reset can be extremely frustrating. Most modern forms don't include a reset button because the risk of accidental data loss outweighs the benefit.\n\n<strong><code>type=\"button\"</code></strong> — This button does nothing by default. It exists solely to be wired up with JavaScript. Use it for custom actions that shouldn't trigger form submission — like \"Add another item\", \"Show preview\", or \"Copy to clipboard\".\n\nYou might also see the older <code>&lt;input type=\"submit\" value=\"Send\"&gt;</code> syntax. This creates a submit button using an input element. The <code>&lt;button&gt;</code> element is preferred because you can put HTML content inside it (icons, formatted text), whereas <code>&lt;input type=\"submit\"&gt;</code> only shows plain text from its <code>value</code> attribute.",
        docLinks: [
          {
            label: "MDN: <button> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Always explicitly set the <code>type</code> attribute on buttons inside forms. Since the default type is <code>\"submit\"</code>, a <code>&lt;button&gt;</code> without a type will submit the form when clicked — even if you intended it to be a regular JavaScript-powered button. This is one of the most common form bugs. Write <code>&lt;button type=\"button\"&gt;</code> for non-submitting buttons.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<form action="/submit" method="post">\n  <label for="name">Name:</label>\n  <input type="text" id="name" name="name"><br><br>\n\n  <!-- Submits the form -->\n  <button type="submit">Submit Form</button>\n\n  <!-- Resets all fields (use cautiously!) -->\n  <button type="reset">Clear All</button>\n\n  <!-- Does nothing without JavaScript -->\n  <button type="button">Preview</button>\n</form>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "fieldset-legend",
      type: "explanation",
      instruction: {
        heading: "Grouping fields with <fieldset> and <legend>",
        body: "When a form has many fields, grouping related fields together makes the form easier to understand — both visually and for screen reader users. HTML provides two elements specifically for this purpose: <code>&lt;fieldset&gt;</code> and <code>&lt;legend&gt;</code>.\n\n<code>&lt;fieldset&gt;</code> draws a visual box around a group of related fields. <code>&lt;legend&gt;</code> provides a caption/title for the group that appears embedded in the fieldset's border:\n\n<code>&lt;fieldset&gt;<br>&nbsp;&nbsp;&lt;legend&gt;Shipping Address&lt;/legend&gt;<br>&nbsp;&nbsp;&lt;label for=\"street\"&gt;Street:&lt;/label&gt;<br>&nbsp;&nbsp;&lt;input type=\"text\" id=\"street\" name=\"street\"&gt;<br>&nbsp;&nbsp;&lt;label for=\"city\"&gt;City:&lt;/label&gt;<br>&nbsp;&nbsp;&lt;input type=\"text\" id=\"city\" name=\"city\"&gt;<br>&lt;/fieldset&gt;</code>\n\nThis is especially important for <strong>radio button and checkbox groups</strong>. When a screen reader encounters a fieldset, it announces the legend before each input. So a user hears \"Shipping Speed: Standard, radio button\" instead of just \"Standard, radio button\" with no context about what \"Standard\" refers to.\n\nMultiple fieldsets in one form create a clear visual and semantic structure. Think of a checkout form with sections for \"Personal Information\", \"Shipping Address\", \"Billing Address\", and \"Payment Details\" — each section would be a fieldset with a legend.\n\nYou can also use the <code>disabled</code> attribute on a fieldset to disable all form controls inside it at once — very useful for graying out an entire section.",
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
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "WCAG 2.1 Success Criterion 1.3.1 (Info and Relationships) recommends using <code>&lt;fieldset&gt;</code> and <code>&lt;legend&gt;</code> to group related form controls, especially radio buttons and checkboxes. Screen readers use the legend to provide context — without it, users may not understand what a group of radio buttons is asking about.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<form action="/checkout" method="post">\n  <fieldset>\n    <legend>Personal Information</legend>\n    <label for="fname">First Name:</label>\n    <input type="text" id="fname" name="first_name"><br>\n    <label for="lname">Last Name:</label>\n    <input type="text" id="lname" name="last_name"><br>\n  </fieldset>\n\n  <fieldset>\n    <legend>Shipping Speed</legend>\n    <label><input type="radio" name="shipping" value="standard"> Standard (5-7 days)</label><br>\n    <label><input type="radio" name="shipping" value="express"> Express (2-3 days)</label><br>\n    <label><input type="radio" name="shipping" value="overnight"> Overnight</label>\n  </fieldset>\n\n  <button type="submit">Place Order</button>\n</form>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "output-meter-progress",
      type: "explanation",
      instruction: {
        heading: "Other form elements: <output>, <meter>, <progress>",
        body: "HTML provides a few additional form-related elements that you'll encounter less frequently but are worth knowing about.\n\n<strong><code>&lt;output&gt;</code></strong> represents the result of a calculation or user action. It's semantically linked to a form and announces changes to screen readers. Use it to display calculated totals, live character counts, or the current value of a range slider:\n<code>&lt;output name=\"total\"&gt;$0.00&lt;/output&gt;</code>\n\n<strong><code>&lt;meter&gt;</code></strong> represents a scalar measurement within a known range — like a disk usage bar, a password strength indicator, or a relevance score. It is NOT for progress — it's for static measurements:\n<code>&lt;meter value=\"0.7\" min=\"0\" max=\"1\"&gt;70%&lt;/meter&gt;</code>\nThe browser renders it as a colored bar. You can set <code>low</code>, <code>high</code>, and <code>optimum</code> thresholds to change the bar's color: green when in the optimum range, yellow when medium, red when poor.\n\n<strong><code>&lt;progress&gt;</code></strong> represents the completion progress of a task — like a file upload, a multi-step form, or a download. Unlike meter, progress implies something is in-progress:\n<code>&lt;progress value=\"60\" max=\"100\"&gt;60%&lt;/progress&gt;</code>\nIf you omit the <code>value</code> attribute, it shows an indeterminate (animated) progress bar — useful when you don't know how long something will take.\n\nThese elements are semantic — they tell the browser (and assistive technologies) what the data means, not just how it looks. A screen reader can announce \"disk usage: 70%\" for a meter element, which is much more meaningful than reading a styled div.",
        docLinks: [
          {
            label: "MDN: <output> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output",
            type: "html-element",
          },
          {
            label: "MDN: <meter> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter",
            type: "html-element",
          },
          {
            label: "MDN: <progress> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Don't confuse <code>&lt;meter&gt;</code> with <code>&lt;progress&gt;</code>. Use <code>&lt;meter&gt;</code> for measurements (disk space, battery level, test scores) and <code>&lt;progress&gt;</code> for things that are ongoing (file uploads, loading, form completion). The visual appearance may be similar, but the semantic meaning is different, and screen readers announce them differently.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- Output for displaying calculated results -->\n<label for="qty">Quantity:</label>\n<input type="number" id="qty" name="quantity" value="2" min="1" max="10">\n<output name="total">$19.98</output>\n\n<!-- Meter for static measurements -->\n<label for="disk">Disk usage:</label>\n<meter id="disk" value="0.7" min="0" max="1" low="0.3" high="0.7" optimum="0.2">70%</meter>\n\n<!-- Progress for ongoing tasks -->\n<label for="upload">Upload progress:</label>\n<progress id="upload" value="60" max="100">60%</progress>\n\n<!-- Indeterminate progress (no value) -->\n<label>Loading:</label>\n<progress>Loading...</progress>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "build-feedback-form",
      type: "free-edit",
      instruction: {
        heading: "Build a feedback form",
        body: "Create a complete feedback form that demonstrates the elements you've learned in this lesson. Your form should include:\n\n<ul><li>A <code>&lt;fieldset&gt;</code> with a <code>&lt;legend&gt;</code> for \"Your Information\"</li><li>Name and email inputs inside the fieldset</li><li>A <code>&lt;textarea&gt;</code> for the feedback message (with rows, placeholder, and maxlength)</li><li>A <code>&lt;button type=\"submit\"&gt;</code> and a <code>&lt;button type=\"reset\"&gt;</code></li><li>Labels for every field</li></ul>",
        docLinks: [
          {
            label: "MDN: <textarea> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea",
            type: "html-element",
          },
          {
            label: "MDN: <fieldset> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset",
            type: "html-element",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          '<form action="/feedback" method="post">\n  <h2>We Value Your Feedback</h2>\n\n  <!-- Fieldset with legend, inputs, textarea, buttons -->\n\n</form>',
        language: "html",
      },
      validation: { type: "contains-tag", criteria: { tag: "textarea" } },
      hints: [
        "Wrap the name and email fields in a <fieldset><legend>Your Information</legend>...</fieldset>.",
        "Use <textarea name=\"feedback\" rows=\"6\" cols=\"50\" maxlength=\"1000\"></textarea> for the message.",
        "Add <button type=\"submit\">Submit</button> and <button type=\"reset\">Clear</button>.",
        "Don't forget <label> elements for every input and the textarea.",
      ],
    },
  ],
};
