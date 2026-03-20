import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "forms-checkboxes-radios",
  slug: "checkboxes-radios",
  title: "Checkboxes and Radio Buttons",
  description:
    "Learn when to use checkboxes (pick many) vs radio buttons (pick one), how grouping works, and why labels are even more critical for these small targets.",
  order: 5,
  steps: [
    {
      id: "checkboxes-pick-many",
      type: "explanation",
      instruction: {
        heading: "Checkboxes — pick as many as you want",
        body: "A checkbox lets the user toggle an option on or off. Unlike a text input where the user types something, a checkbox is a simple yes/no choice. When the form is submitted, only checked boxes send their data — unchecked boxes send nothing.\n\nYou create a checkbox with <code>&lt;input type=\"checkbox\"&gt;</code>. Each checkbox needs:\n<ul><li><code>name</code> — the key sent to the server</li><li><code>value</code> — the value sent when the box is checked (if omitted, the browser sends \"on\")</li></ul>\n\nThe <code>checked</code> attribute makes a checkbox pre-selected when the page loads:\n<code>&lt;input type=\"checkbox\" name=\"newsletter\" value=\"yes\" checked&gt;</code>\n\nCheckboxes are independent — checking one has no effect on others. This is the key difference from radio buttons. Use checkboxes when the user can select <strong>zero, one, or many</strong> options from a list.\n\nReal-world examples everywhere: Amazon's filter sidebar (\"Free Shipping\", \"Prime\", \"4 Stars & Up\" — you can check multiple), Gmail's message selection (check multiple emails to delete or archive), and Instagram's interest selection during signup (pick all topics that interest you).",
        analogy: "Think of checkboxes like a grocery shopping list. You walk down the aisle and check off items as you put them in your cart: eggs, milk, bread, butter. You can check as many items as you want, skip items, or check all of them. Each item is independent — getting eggs has nothing to do with getting bread. That's exactly how checkboxes work.",
        docLinks: [
          {
            label: "MDN: <input type=\"checkbox\">",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox",
            type: "html-element",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<form action="/preferences" method="post">\n  <p>Select your interests:</p>\n\n  <label>\n    <input type="checkbox" name="interests" value="music"> Music\n  </label><br>\n\n  <label>\n    <input type="checkbox" name="interests" value="sports"> Sports\n  </label><br>\n\n  <label>\n    <input type="checkbox" name="interests" value="cooking" checked> Cooking\n  </label><br>\n\n  <label>\n    <input type="checkbox" name="interests" value="gaming"> Gaming\n  </label><br>\n\n  <button type="submit">Save</button>\n</form>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "radios-pick-one",
      type: "explanation",
      instruction: {
        heading: "Radio buttons — pick exactly one",
        body: "Radio buttons look similar to checkboxes but behave very differently. In a group of radio buttons, the user can only select <strong>one</strong> option. Selecting a new option automatically deselects the previously selected one.\n\nYou create a radio button with <code>&lt;input type=\"radio\"&gt;</code>. The critical concept is <strong>grouping</strong>: radio buttons that share the same <code>name</code> attribute belong to the same group. Within a group, only one radio can be selected at a time.\n\n<code>&lt;input type=\"radio\" name=\"size\" value=\"small\"&gt; Small<br>&lt;input type=\"radio\" name=\"size\" value=\"medium\"&gt; Medium<br>&lt;input type=\"radio\" name=\"size\" value=\"large\"&gt; Large</code>\n\nAll three have <code>name=\"size\"</code>, so they form one group. Selecting \"Large\" automatically deselects \"Small\" or \"Medium\". If you accidentally gave one a different name (like <code>name=\"sz\"</code>), it would be a separate group and the user could select it along with another option — a common bug.\n\nUse radio buttons when the user must choose <strong>exactly one</strong> option from a mutually exclusive list: shirt size (S/M/L/XL), payment method (credit card / debit card / PayPal), shipping speed (standard / express / overnight).\n\nReal-world example: When you order on Amazon and choose a shipping speed, those are radio buttons — you can only pick one speed. Google Forms' multiple-choice questions are radio buttons.",
        analogy: "Think of radio buttons like a multiple-choice exam question. The question says \"Choose ONE answer: A, B, C, or D.\" You can only fill in one bubble. If you change your mind and fill in C, your previous answer B is automatically erased. The name \"radio button\" actually comes from old car radios that had physical buttons — pressing one would pop out the previously pressed button, so only one station could be selected at a time.",
        docLinks: [
          {
            label: "MDN: <input type=\"radio\">",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "The most common radio button bug is forgetting to give all radios in a group the same <code>name</code>. If two radios have different names, the browser treats them as separate groups and the user can select both. Always double-check that all related radios share an identical <code>name</code> value.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<form action="/order" method="post">\n  <p>Choose your size:</p>\n\n  <label>\n    <input type="radio" name="size" value="small"> Small\n  </label><br>\n\n  <label>\n    <input type="radio" name="size" value="medium" checked> Medium\n  </label><br>\n\n  <label>\n    <input type="radio" name="size" value="large"> Large\n  </label><br>\n\n  <button type="submit">Order</button>\n</form>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "labels-for-tiny-targets",
      type: "explanation",
      instruction: {
        heading: "Labels are even more important for checkboxes and radios",
        body: "Checkboxes and radio buttons are tiny targets — small squares or circles that are difficult to click precisely, especially on mobile devices or for users with motor impairments. This is where <code>&lt;label&gt;</code> elements become absolutely critical.\n\nWhen a label is properly associated with a checkbox or radio button, clicking the label text also toggles the control. This dramatically increases the clickable area. Instead of aiming for a tiny 16x16 pixel box, the user can click anywhere on the label text — which might be 200 pixels wide.\n\nYou can use either labeling method:\n\n<strong>Implicit (wrapping):</strong>\n<code>&lt;label&gt;<br>&nbsp;&nbsp;&lt;input type=\"checkbox\" name=\"agree\" value=\"yes\"&gt; I agree to the terms<br>&lt;/label&gt;</code>\n\n<strong>Explicit (for/id):</strong>\n<code>&lt;input type=\"checkbox\" id=\"agree\" name=\"agree\" value=\"yes\"&gt;<br>&lt;label for=\"agree\"&gt;I agree to the terms&lt;/label&gt;</code>\n\nFor checkboxes and radios, the implicit (wrapping) method is very popular because it keeps the input and its text together naturally. Either method is valid.\n\nWithout labels, screen reader users hear \"checkbox\" with no description of what the checkbox is for. With a proper label, they hear \"I agree to the terms, checkbox, not checked\" — complete information about what the control does and its current state.",
        docLinks: [
          {
            label: "MDN: <label> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "WCAG 2.1 Success Criterion 2.5.5 (Target Size) recommends that interactive targets be at least 44x44 CSS pixels. A bare checkbox or radio button is far smaller than this. Associating a <code>&lt;label&gt;</code> effectively extends the target area to include the label text, helping meet this guideline without any CSS changes.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- Implicit labels (wrapping) for checkboxes -->\n<label>\n  <input type="checkbox" name="terms" value="yes"> I agree to the Terms of Service\n</label>\n\n<!-- Explicit labels (for/id) for radios -->\n<input type="radio" id="visa" name="payment" value="visa">\n<label for="visa">Visa</label>\n\n<input type="radio" id="mastercard" name="payment" value="mastercard">\n<label for="mastercard">Mastercard</label>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "practice-radio-group",
      type: "gap-fill",
      instruction: {
        heading: "Complete a radio button group",
        body: "Fill in the blanks to create a working radio button group for selecting a subscription plan. Remember: all radios in the same group must share the same <code>name</code> attribute, and each must have a unique <code>value</code>.",
      },
      config: {
        type: "gap-fill",
        template:
          '<p>Choose a plan:</p>\n\n<label>\n  <input type="{{type}}" name="{{group}}" value="free"> Free\n</label><br>\n\n<label>\n  <input type="{{type}}" name="{{group}}" value="pro"> Pro ($9/mo)\n</label><br>\n\n<label>\n  <input type="{{type}}" name="{{group}}" value="enterprise"> Enterprise ($29/mo)\n</label>',
        gaps: [
          {
            id: "type",
            placeholder: "input type",
            acceptedAnswers: ["radio"],
            caseSensitive: false,
          },
          {
            id: "group",
            placeholder: "group name",
            acceptedAnswers: ["plan", "subscription", "pricing"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "To select only one option, use type=\"radio\".",
        "The name attribute groups radios together — use a descriptive name like \"plan\".",
      ],
    },
    {
      id: "practice-checkbox-group",
      type: "gap-fill",
      instruction: {
        heading: "Complete a checkbox group",
        body: "Fill in the blanks to create a checkbox group for selecting pizza toppings. Checkboxes allow the user to select multiple options. Each checkbox should have the same <code>name</code> and a unique <code>value</code>.",
      },
      config: {
        type: "gap-fill",
        template:
          '<p>Choose your toppings:</p>\n\n<label>\n  <input type="{{type}}" name="{{group}}" value="pepperoni"> Pepperoni\n</label><br>\n\n<label>\n  <input type="{{type}}" name="{{group}}" value="mushrooms"> Mushrooms\n</label><br>\n\n<label>\n  <input type="{{type}}" name="{{group}}" value="olives"> Olives\n</label>',
        gaps: [
          {
            id: "type",
            placeholder: "input type",
            acceptedAnswers: ["checkbox"],
            caseSensitive: false,
          },
          {
            id: "group",
            placeholder: "group name",
            acceptedAnswers: ["toppings", "topping"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "To select multiple options, use type=\"checkbox\".",
        "Use a descriptive name like \"toppings\" for the group.",
      ],
    },
    {
      id: "build-pizza-order",
      type: "free-edit",
      instruction: {
        heading: "Build a pizza order form",
        body: "Create a pizza order form that includes:\n\n<ul><li>A <strong>radio button group</strong> for pizza size (Small, Medium, Large) — the user picks exactly one</li><li>A <strong>checkbox group</strong> for toppings (at least 4 options) — the user picks as many as they want</li><li>Labels for every checkbox and radio button</li><li>A submit button</li></ul>\n\nRemember: all radios in the size group need the same <code>name</code>, and all checkboxes in the toppings group need the same <code>name</code>.",
      },
      config: {
        type: "free-edit",
        starterCode:
          '<form action="/order" method="post">\n  <h2>Order Your Pizza</h2>\n\n  <!-- Radio buttons for size -->\n\n  <!-- Checkboxes for toppings -->\n\n  <button type="submit">Place Order</button>\n</form>',
        language: "html",
      },
      validation: { type: "contains-tag", criteria: { tag: "input" } },
      hints: [
        "For the size group, use <input type=\"radio\" name=\"size\" value=\"small\"> etc.",
        "For the toppings group, use <input type=\"checkbox\" name=\"toppings\" value=\"pepperoni\"> etc.",
        "Wrap each input in a <label> element for better usability.",
        "All radios for size must share name=\"size\", all checkboxes share name=\"toppings\".",
      ],
    },
  ],
};
