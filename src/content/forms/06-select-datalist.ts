import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "forms-select-datalist",
  slug: "select-datalist",
  title: "Select Dropdowns and Datalists",
  description:
    "Learn how to create dropdown menus with <select>, organize options with <optgroup>, and build autocomplete fields with <datalist>.",
  order: 6,
  steps: [
    {
      id: "select-dropdown",
      type: "explanation",
      instruction: {
        heading: "The <select> dropdown — pick from a list",
        body: "The <code>&lt;select&gt;</code> element creates a dropdown menu — a collapsed list that expands when the user clicks on it, revealing a set of predefined options. It's one of the most familiar form controls on the web.\n\nA select dropdown is built from two elements working together:\n<ul><li><code>&lt;select&gt;</code> — the container that creates the dropdown</li><li><code>&lt;option&gt;</code> — each choice inside the dropdown</li></ul>\n\nEach <code>&lt;option&gt;</code> has a <code>value</code> attribute (what gets sent to the server) and text content (what the user sees). These can be different:\n<code>&lt;option value=\"us\"&gt;United States&lt;/option&gt;</code>\nThe user sees \"United States\" but the server receives <code>country=us</code>.\n\nIf you omit the <code>value</code> attribute, the text content is used as the value instead.\n\nUse <code>&lt;select&gt;</code> when you have a fixed list of 4-15 options. For fewer options, radio buttons are often better (all options visible at once). For very long lists (like all countries), a select still works but consider a searchable input.\n\nReal-world example: On Amazon, the country/region selector during checkout is a <code>&lt;select&gt;</code> dropdown. Airline booking sites use selects for the number of passengers, class of service, and departure airports.",
        analogy: "Think of a <code>&lt;select&gt;</code> dropdown like a vending machine. The machine shows you a list of options (A1: Chips, A2: Candy, B1: Soda, B2: Water). You press a button to make your choice, and the machine gives you that item. The code on the button (A1, B1) is like the <code>value</code> attribute — it's the identifier the machine uses internally. The label next to the button (\"Chips\", \"Soda\") is like the text content — it's what you, the user, read to make your decision.",
        docLinks: [
          {
            label: "MDN: <select> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select",
            type: "html-element",
          },
          {
            label: "MDN: <option> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Always include a placeholder-style first option like <code>&lt;option value=\"\"&gt;Choose a country...&lt;/option&gt;</code>. Without it, the first real option is pre-selected and the user might submit the form without realizing they need to make an active choice. Adding <code>disabled selected</code> to this placeholder option prevents it from being re-selected after the user picks something else.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<label for="country">Country:</label>\n<select id="country" name="country">\n  <option value="" disabled selected>Choose a country...</option>\n  <option value="us">United States</option>\n  <option value="uk">United Kingdom</option>\n  <option value="ca">Canada</option>\n  <option value="au">Australia</option>\n  <option value="de">Germany</option>\n</select>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "optgroup-and-multiple",
      type: "explanation",
      instruction: {
        heading: "Organizing options with <optgroup> and allowing multiple selections",
        body: "When a dropdown has many options, you can organize them into labeled groups using <code>&lt;optgroup&gt;</code>. The <code>label</code> attribute on <code>&lt;optgroup&gt;</code> provides a non-selectable heading for each group:\n\n<code>&lt;select name=\"car\"&gt;<br>&nbsp;&nbsp;&lt;optgroup label=\"Swedish Cars\"&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;option value=\"volvo\"&gt;Volvo&lt;/option&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;option value=\"saab\"&gt;Saab&lt;/option&gt;<br>&nbsp;&nbsp;&lt;/optgroup&gt;<br>&nbsp;&nbsp;&lt;optgroup label=\"German Cars\"&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;option value=\"bmw\"&gt;BMW&lt;/option&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;&lt;option value=\"audi\"&gt;Audi&lt;/option&gt;<br>&nbsp;&nbsp;&lt;/optgroup&gt;<br>&lt;/select&gt;</code>\n\nThe group labels (\"Swedish Cars\", \"German Cars\") appear as bold, non-clickable headings in the dropdown. Users can only select the actual options within each group.\n\nYou can also allow users to select <strong>multiple</strong> options by adding the <code>multiple</code> attribute to the <code>&lt;select&gt;</code> element. This transforms the dropdown into a visible list box where users can hold Ctrl (or Cmd on Mac) to select multiple items:\n<code>&lt;select name=\"languages\" multiple&gt;</code>\n\nHowever, the multiple-select interaction (Ctrl+click) is not intuitive for many users. For multiple selections, a group of checkboxes is often a better user experience. Use <code>multiple</code> select only when you have a very long list where checkboxes would be impractical.",
        docLinks: [
          {
            label: "MDN: <optgroup> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup",
            type: "html-element",
          },
          {
            label: "MDN: select multiple attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#multiple",
            type: "html-attribute",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The <code>&lt;optgroup&gt;</code> element cannot be nested — you can't put an <code>&lt;optgroup&gt;</code> inside another <code>&lt;optgroup&gt;</code>. The HTML specification only allows one level of grouping. If you need deeper hierarchy, you may need a custom JavaScript-based dropdown component instead.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<label for="course">Choose a course:</label>\n<select id="course" name="course">\n  <option value="" disabled selected>Select a course...</option>\n  <optgroup label="Web Development">\n    <option value="html">HTML Fundamentals</option>\n    <option value="css">CSS Mastery</option>\n    <option value="js">JavaScript Essentials</option>\n  </optgroup>\n  <optgroup label="Design">\n    <option value="ui">UI Design</option>\n    <option value="ux">UX Research</option>\n  </optgroup>\n</select>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "datalist-autocomplete",
      type: "explanation",
      instruction: {
        heading: "The <datalist> element — autocomplete suggestions",
        body: "The <code>&lt;datalist&gt;</code> element is a hybrid between a text input and a dropdown. It provides a list of suggestions that appear as the user types, but unlike <code>&lt;select&gt;</code>, the user can also type a completely custom value that isn't in the list.\n\nTo use a datalist, you:\n<ol><li>Create a regular <code>&lt;input&gt;</code> element with a <code>list</code> attribute</li><li>Create a <code>&lt;datalist&gt;</code> element with an <code>id</code> that matches the input's <code>list</code> value</li><li>Fill the datalist with <code>&lt;option&gt;</code> elements</li></ol>\n\n<code>&lt;input type=\"text\" name=\"browser\" list=\"browsers\"&gt;<br>&lt;datalist id=\"browsers\"&gt;<br>&nbsp;&nbsp;&lt;option value=\"Chrome\"&gt;<br>&nbsp;&nbsp;&lt;option value=\"Firefox\"&gt;<br>&nbsp;&nbsp;&lt;option value=\"Safari\"&gt;<br>&nbsp;&nbsp;&lt;option value=\"Edge\"&gt;<br>&lt;/datalist&gt;</code>\n\nAs the user types, the browser filters the suggestions to match. Type \"Ch\" and only \"Chrome\" appears. But the user can also type \"Brave\" — a value not in the list — and it will be accepted.\n\nThis is perfect for fields where you want to suggest common answers but allow custom input: city names (suggest popular cities but allow any), programming languages, job titles, or ingredient lists.\n\nReal-world example: Google search's autocomplete is conceptually similar to a datalist — it suggests popular searches as you type, but you can always type something completely different.",
        docLinks: [
          {
            label: "MDN: <datalist> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "The <code>list</code> attribute on the input and the <code>id</code> on the datalist must match exactly. This connection is case-sensitive. If they don't match, the suggestions simply won't appear — there's no error message. Double-check the spelling!",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<label for="city">City:</label>\n<input type="text" id="city" name="city" list="cities" placeholder="Start typing...">\n\n<datalist id="cities">\n  <option value="New York">\n  <option value="Los Angeles">\n  <option value="Chicago">\n  <option value="Houston">\n  <option value="Phoenix">\n  <option value="Philadelphia">\n  <option value="San Antonio">\n  <option value="San Diego">\n</datalist>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "practice-select-optgroups",
      type: "gap-fill",
      instruction: {
        heading: "Build a select dropdown with option groups",
        body: "Fill in the blanks to create a dropdown menu for choosing a programming language, organized into groups by type.",
      },
      config: {
        type: "gap-fill",
        template:
          '<label for="lang">Programming Language:</label>\n<{{select}} id="lang" name="language">\n  <option value="" disabled selected>Choose a language...</option>\n  <{{group}} label="Frontend">\n    <option value="js">JavaScript</option>\n    <option value="ts">TypeScript</option>\n  </{{group}}>\n  <{{group}} label="Backend">\n    <option value="py">Python</option>\n    <option value="go">Go</option>\n  </{{group}}>\n</{{select}}>',
        gaps: [
          {
            id: "select",
            placeholder: "dropdown element",
            acceptedAnswers: ["select"],
            caseSensitive: false,
          },
          {
            id: "group",
            placeholder: "grouping element",
            acceptedAnswers: ["optgroup"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The dropdown container element is <select>.",
        "The element that groups options under a heading is <optgroup>.",
      ],
    },
    {
      id: "practice-datalist-wiring",
      type: "gap-fill",
      instruction: {
        heading: "Wire a datalist to an input",
        body: "Fill in the blanks to connect the text input to the datalist. Remember: the input's <code>list</code> attribute must match the datalist's <code>id</code>.",
      },
      config: {
        type: "gap-fill",
        template:
          '<label for="color">Favorite Color:</label>\n<input type="text" id="color" name="color" {{attr}}="color-options">\n\n<{{element}} id="color-options">\n  <option value="Red">\n  <option value="Blue">\n  <option value="Green">\n  <option value="Purple">\n</{{element}}>',
        gaps: [
          {
            id: "attr",
            placeholder: "connecting attribute",
            acceptedAnswers: ["list"],
            caseSensitive: false,
          },
          {
            id: "element",
            placeholder: "suggestion element",
            acceptedAnswers: ["datalist"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The attribute on the input that connects it to suggestions is \"list\".",
        "The element that provides autocomplete suggestions is <datalist>.",
      ],
    },
    {
      id: "build-travel-booking",
      type: "free-edit",
      instruction: {
        heading: "Build a travel booking form",
        body: "Create a travel booking form that uses select dropdowns and a datalist. Include:\n\n<ul><li>A <code>&lt;select&gt;</code> dropdown for trip type (one-way, round-trip, multi-city)</li><li>A text input with a <code>&lt;datalist&gt;</code> for the departure city (suggest 5+ cities but allow custom entry)</li><li>A text input with a <code>&lt;datalist&gt;</code> for the destination city</li><li>A <code>&lt;select&gt;</code> with <code>&lt;optgroup&gt;</code> for class of service (Economy group: Basic Economy, Economy; Premium group: Premium Economy, Business, First)</li><li>Labels for every field and a submit button</li></ul>",
        docLinks: [
          {
            label: "MDN: <select> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select",
            type: "html-element",
          },
          {
            label: "MDN: <datalist> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist",
            type: "html-element",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          '<form action="/book" method="post">\n  <h2>Book Your Trip</h2>\n\n  <!-- Trip type select, city datalists, class select with optgroups -->\n\n  <button type="submit">Search Flights</button>\n</form>',
        language: "html",
      },
      validation: { type: "contains-tag", criteria: { tag: "select" } },
      hints: [
        "Start with a <select name=\"trip_type\"> for one-way / round-trip / multi-city.",
        "Create an <input list=\"cities-from\"> paired with a <datalist id=\"cities-from\">.",
        "Use <optgroup label=\"Economy\"> and <optgroup label=\"Premium\"> inside the class select.",
        "Don't forget labels for every field!",
      ],
    },
  ],
};
