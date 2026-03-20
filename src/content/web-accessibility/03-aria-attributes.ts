import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "web-accessibility-aria-attributes",
  slug: "aria-attributes",
  title: "Introduction to ARIA Attributes",
  description:
    "Learn when and how to use ARIA roles, labels, and live regions to enhance accessibility beyond native HTML.",
  order: 3,
  steps: [
    {
      id: "what-is-aria",
      type: "explanation",
      instruction: {
        heading: "What is ARIA and why does it exist?",
        body: "ARIA stands for Accessible Rich Internet Applications. It is a set of HTML attributes that provide additional information to assistive technologies when native HTML elements alone are not enough. ARIA was created by the W3C to bridge the gap between the complex interactive interfaces of modern web applications and the relatively simple document structure that HTML was originally designed for.\n\nConsider a custom dropdown menu built from divs and JavaScript. To a sighted user, it looks and behaves like a dropdown — they can click to open it, see the options, and select one. But to a screen reader, it is just a stack of divs. The screen reader has no idea that it is a dropdown, that it can be opened, what the current selection is, or how to interact with it. ARIA attributes fill in this missing information: they tell the screen reader \"this is a listbox,\" \"it is currently collapsed,\" \"the selected option is Option 2,\" and \"press Enter to open.\"\n\nHowever — and this is critical — ARIA should be your last resort, not your first tool. The most important rule of ARIA is called the \"First Rule of ARIA\": if you can use a native HTML element that already has the semantics and behavior you need, use it instead of adding ARIA to a generic element. A <button> is always better than <div role=\"button\">. A <select> is always better than a custom ARIA listbox. Native elements come with built-in keyboard behavior, focus management, and screen reader support that ARIA cannot fully replicate.\n\nThink of ARIA as a translation layer. Native HTML elements speak the accessibility language fluently — they come with built-in semantics, keyboard behavior, and screen reader support. ARIA is like subtitles — it can convey meaning, but it does not provide the actual behavior. Adding role=\"button\" to a div makes a screen reader announce it as a button, but it does not make it focusable, keyboard-operable, or clickable. You still have to add tabindex, keydown handlers, and click events manually. A real <button> element gives you all of that for free.",
        analogy: "Native HTML elements are like appliances that come with an instruction manual in every language — screen readers, keyboards, and browsers all know exactly how to use them. ARIA is like writing a sticky note in one specific language and taping it to a blank box. The sticky note helps, but the box still does not work like a real appliance. Always use the real appliance (native HTML) when one exists.",
        docLinks: [
          {
            label: "MDN: ARIA",
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA",
            type: "html-concept",
          },
          {
            label: "MDN: ARIA roles",
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The First Rule of ARIA (from the W3C ARIA Authoring Practices): \"If you can use a native HTML element or attribute with the semantics and behavior you require already built in, instead of re-purposing an element and adding an ARIA role, state or property to make it accessible, then do so.\" This is not just a suggestion — it is the official W3C recommendation.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "ARIA never changes the visual appearance or behavior of an element — it only changes what assistive technologies announce. Adding role=\"button\" to a div does not make it look like a button, respond to Enter/Space keypresses, or receive keyboard focus. You still need CSS for styling, tabindex for focus, and JavaScript for keyboard events. This is why native <button> is almost always the better choice.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "<!-- Bad: div with ARIA — missing keyboard support, focus, etc. -->\n<div role=\"button\" onclick=\"submit()\">Submit</div>\n\n<!-- Good: native button — accessible by default -->\n<button onclick=\"submit()\">Submit</button>\n\n<!-- ARIA is appropriate when no native element exists -->\n<div role=\"tablist\">\n  <button role=\"tab\" aria-selected=\"true\">Tab 1</button>\n  <button role=\"tab\" aria-selected=\"false\">Tab 2</button>\n</div>",
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "aria-label-and-labelledby",
      type: "explanation",
      instruction: {
        heading: "aria-label and aria-labelledby",
        body: "Two of the most commonly used ARIA attributes are aria-label and aria-labelledby. Both provide an accessible name for an element — the text that a screen reader announces when the user focuses on it. They solve different problems:\n\n<strong>aria-label</strong> provides an accessible name directly as a string attribute. Use it when there is no visible text that labels the element. For example, an icon-only button with a magnifying glass icon has no text content — a screen reader would announce just \"button\" with no indication of what it does. Adding aria-label=\"Search\" tells the screen reader to announce \"Search button.\"\n\nOn Google's homepage, the search button is visually represented by a magnifying glass icon. Without aria-label (or equivalent), a screen reader user would hear \"button\" and have no idea it means \"search.\"\n\n<strong>aria-labelledby</strong> points to another element whose text content becomes the accessible name. Use it when there IS visible text on the page that labels the element, but the element is not programmatically associated with that text. The value of aria-labelledby is the id of the labeling element.\n\nFor example, if you have a section with a visible heading \"Shopping Cart\" and you want a screen reader to associate that heading with the entire section, you can use aria-labelledby to point the section to the heading's id.\n\nThe key difference: aria-label is the text itself; aria-labelledby is a pointer to another element that contains the text. When both are present, aria-labelledby takes precedence.",
        docLinks: [
          {
            label: "MDN: aria-label",
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label",
            type: "html-attribute",
          },
          {
            label: "MDN: aria-labelledby",
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby",
            type: "html-attribute",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The accessible name computation follows a priority order: aria-labelledby > aria-label > native label (<label for=\"...\"> for inputs) > element text content. This means aria-labelledby always wins when present. Understanding this order helps you predict what a screen reader will announce.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "Do not use aria-label on elements that already have visible text content. If a button already says \"Submit,\" adding aria-label=\"Submit form\" creates a mismatch between what sighted users see and what screen reader users hear. Use aria-label only when there is no visible label.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "<!-- aria-label: when there is no visible text -->\n<button aria-label=\"Search\">\n  <svg><!-- magnifying glass icon --></svg>\n</button>\n\n<!-- aria-label on nav: distinguish multiple navs -->\n<nav aria-label=\"Main navigation\">\n  <a href=\"/\">Home</a>\n  <a href=\"/about\">About</a>\n</nav>\n<nav aria-label=\"Footer navigation\">\n  <a href=\"/privacy\">Privacy</a>\n  <a href=\"/terms\">Terms</a>\n</nav>\n\n<!-- aria-labelledby: point to existing visible text -->\n<section aria-labelledby=\"cart-heading\">\n  <h2 id=\"cart-heading\">Shopping Cart</h2>\n  <ul>\n    <li>Widget - $9.99</li>\n  </ul>\n</section>",
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "aria-hidden-and-live",
      type: "explanation",
      instruction: {
        heading: "aria-hidden and aria-live",
        body: "<strong>aria-hidden=\"true\"</strong> removes an element from the accessibility tree entirely. Screen readers will not announce it, and keyboard users cannot focus on it. Use it for purely decorative content that adds no information — decorative icons, visual separators, or duplicate content that would be confusing if read twice.\n\nFor example, many websites show a decorative icon next to a button label: a trash can icon next to the word \"Delete.\" Without aria-hidden, a screen reader might announce \"trash can icon Delete button\" — the icon description is redundant because the button already says \"Delete.\" Adding aria-hidden=\"true\" to the icon hides it from screen readers: they just hear \"Delete button.\"\n\nBe very careful with aria-hidden. If you hide an element that contains focusable children (like links or buttons), those children become unreachable by screen readers but still focusable by keyboard — creating a confusing situation where a user can tab to something they cannot hear. Never use aria-hidden on an ancestor of focusable elements.\n\n<strong>aria-live</strong> creates a \"live region\" — an area of the page that screen readers monitor for changes. When the content inside a live region updates, the screen reader automatically announces the new content without the user having to navigate to it. This is essential for dynamic content: status messages, error alerts, chat messages, stock tickers, or loading indicators.\n\naria-live has two main values:\n- <strong>\"polite\"</strong> — the screen reader waits until it finishes its current announcement, then reads the update. Use this for non-urgent updates like \"Item added to cart\" or \"3 new messages.\"\n- <strong>\"assertive\"</strong> — the screen reader interrupts whatever it is currently saying to announce the update immediately. Use this sparingly, only for urgent information like form validation errors or critical alerts.\n\nOn Amazon, when you add an item to your cart, a notification appears saying \"Added to Cart.\" Without aria-live, a screen reader user would never know the item was added — they would have to manually navigate to the cart to check. With aria-live=\"polite\" on the notification area, the screen reader automatically announces \"Added to Cart\" as soon as the text appears.",
        docLinks: [
          {
            label: "MDN: aria-hidden",
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden",
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
            body: "The HTML <output> element has an implicit aria-live=\"polite\" — it is designed specifically for announcing results of calculations or actions. The role=\"alert\" has an implicit aria-live=\"assertive\". When possible, use these native elements instead of manually setting aria-live.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "A common mistake with aria-live is adding the attribute at the same time as the content. The live region must already exist in the DOM (even if empty) BEFORE the content changes. If you inject both the container and the content at the same time, the screen reader may not detect the change. Create the live region in your HTML, then update its content dynamically.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "<!-- aria-hidden: hide decorative content -->\n<button>\n  <span aria-hidden=\"true\">🗑️</span>\n  Delete\n</button>\n\n<!-- aria-live polite: non-urgent updates -->\n<div aria-live=\"polite\" id=\"cart-status\">\n  <!-- JS updates this: \"Item added to cart\" -->\n</div>\n\n<!-- aria-live assertive: urgent alerts -->\n<div aria-live=\"assertive\" id=\"error-message\">\n  <!-- JS updates this: \"Error: Email is required\" -->\n</div>\n\n<!-- role=\"alert\" has implicit aria-live=\"assertive\" -->\n<div role=\"alert\">\n  Your session will expire in 2 minutes.\n</div>",
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "aria-label-gapfill",
      type: "gap-fill",
      instruction: {
        heading: "Label the icon button",
        body: "This button contains only an icon — no visible text. Add the correct ARIA attribute so screen readers know what the button does.",
      },
      config: {
        type: "gap-fill",
        template:
          "<button {{attr}}=\"{{value}}\">\n  <svg><!-- hamburger menu icon --></svg>\n</button>",
        gaps: [
          {
            id: "attr",
            placeholder: "attribute",
            acceptedAnswers: ["aria-label"],
            caseSensitive: true,
          },
          {
            id: "value",
            placeholder: "label text",
            acceptedAnswers: [
              "Open menu",
              "open menu",
              "Menu",
              "menu",
              "Toggle menu",
              "toggle menu",
              "Open navigation",
              "open navigation",
              "Navigation menu",
              "navigation menu",
            ],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "Icon-only buttons need aria-label to provide a text name.",
        "Describe what the button does, like \"Open menu\" or \"Menu\".",
      ],
    },
    {
      id: "aria-live-gapfill",
      type: "gap-fill",
      instruction: {
        heading: "Set up a live region",
        body: "This div will be updated by JavaScript to show status messages like \"Item added to cart.\" Add the correct attribute so screen readers automatically announce changes. The updates are non-urgent, so the screen reader should wait until it finishes speaking before announcing.",
      },
      config: {
        type: "gap-fill",
        template: "<div {{attr}}=\"{{value}}\" id=\"status-message\">\n</div>",
        gaps: [
          {
            id: "attr",
            placeholder: "attribute",
            acceptedAnswers: ["aria-live"],
            caseSensitive: true,
          },
          {
            id: "value",
            placeholder: "urgency level",
            acceptedAnswers: ["polite"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The attribute that creates a live region is aria-live.",
        "For non-urgent updates, use the \"polite\" value — the screen reader waits to finish speaking before announcing.",
      ],
    },
    {
      id: "add-aria-practice",
      type: "free-edit",
      instruction: {
        heading: "Add ARIA to a navigation",
        body: "The page below has two navigation sections, but screen readers cannot tell them apart — both are announced as just \"navigation.\" Add aria-label attributes to distinguish the main navigation from the footer navigation. Also, the decorative star icon in the footer is being announced unnecessarily — hide it from screen readers with aria-hidden.",
        docLinks: [
          {
            label: "MDN: aria-label",
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label",
            type: "html-attribute",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "When a page has multiple <nav> elements, you MUST give each one a unique aria-label so screen reader users can tell them apart. Without labels, a user hearing \"navigation, navigation\" has no idea which is the main menu and which is the footer links.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          "<header>\n  <nav>\n    <a href=\"/\">Home</a>\n    <a href=\"/products\">Products</a>\n    <a href=\"/about\">About</a>\n  </nav>\n</header>\n\n<main>\n  <h1>Welcome</h1>\n  <p>Content here.</p>\n</main>\n\n<footer>\n  <nav>\n    <span>⭐</span>\n    <a href=\"/privacy\">Privacy</a>\n    <a href=\"/terms\">Terms</a>\n  </nav>\n</footer>",
        language: "html",
      },
      validation: {
        type: "contains-tag",
        criteria: { tag: "nav" },
      },
      hints: [
        "Add aria-label=\"Main navigation\" to the first nav.",
        "Add aria-label=\"Footer navigation\" to the second nav.",
        "Add aria-hidden=\"true\" to the decorative star span.",
      ],
    },
  ],
};
