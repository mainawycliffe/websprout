import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "web-accessibility-keyboard-navigation",
  slug: "keyboard-navigation",
  title: "Keyboard Navigation & Focus",
  description:
    "Learn how keyboard users navigate the web, how tab order works, and how to build skip links and visible focus indicators.",
  order: 4,
  steps: [
    {
      id: "why-keyboard-matters",
      type: "explanation",
      instruction: {
        heading: "Why keyboard navigation matters",
        body: "Not everyone uses a mouse. People with motor disabilities, repetitive strain injuries, or vision impairments often navigate entirely by keyboard. Some use specialized devices like switch controls, sip-and-puff devices, or eye-tracking systems that all ultimately translate to keyboard-like interactions. Even power users frequently prefer keyboard shortcuts — try watching a developer work and you will see them reach for the keyboard far more than the mouse.\n\nEvery interactive element on your page must be reachable and operable by keyboard alone. If a user cannot tab to a button, activate a link, or fill out a form without a mouse, your site has a critical accessibility barrier.\n\nThe basic keyboard navigation model works like this:\n\n- <strong>Tab</strong> moves focus forward to the next interactive element (links, buttons, form inputs).\n- <strong>Shift + Tab</strong> moves focus backward to the previous interactive element.\n- <strong>Enter</strong> activates links and buttons.\n- <strong>Space</strong> activates buttons, toggles checkboxes, and opens select dropdowns.\n- <strong>Arrow keys</strong> navigate within groups — radio buttons, select options, tabs, menu items.\n- <strong>Escape</strong> closes modals, dropdowns, and tooltips.\n\nNative HTML interactive elements — <a>, <button>, <input>, <select>, <textarea> — are keyboard-accessible by default. They receive focus when tabbed to, and they respond to Enter and Space keypresses. This is one of the biggest reasons to use native elements instead of divs with click handlers. A <div onclick=\"doSomething()\"> is completely invisible to keyboard users — they cannot tab to it, and pressing Enter or Space does nothing. A <button onclick=\"doSomething()\"> is fully keyboard-accessible without any extra code.\n\nTry it right now: press Tab on this page and watch the focus move between interactive elements. Notice the visual indicator (usually a blue or black outline) that shows which element has focus. That indicator is essential — without it, keyboard users have no idea where they are on the page.",
        analogy: "Keyboard navigation is like using a TV remote to browse a streaming service. You press the arrow keys to move between shows, Enter to select one, and Back to return to the menu. If a show thumbnail does not highlight when you navigate to it, you have no idea what you are about to select. The highlight is the focus indicator — and on the web, it is just as essential.",
        docLinks: [
          {
            label: "MDN: Keyboard-navigable JavaScript widgets",
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "WCAG Success Criterion 2.1.1 (Keyboard) requires that all functionality is operable through a keyboard interface. This is a Level A requirement — the most basic level. If even one interactive element on your page cannot be reached or activated by keyboard, you fail this criterion.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "Quick accessibility test you can do right now: unplug your mouse (or on a laptop, do not touch the trackpad) and try to complete a task on your website using only the keyboard. Can you navigate to every link and button? Can you fill out every form? Can you always see where the focus is? If you get stuck anywhere, keyboard users will too.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "<!-- These are keyboard-accessible by default: -->\n<a href=\"/about\">About Us</a>\n<button onclick=\"save()\">Save</button>\n<input type=\"text\" placeholder=\"Your name\">\n<select>\n  <option>Option 1</option>\n  <option>Option 2</option>\n</select>\n\n<!-- This is NOT keyboard-accessible: -->\n<div onclick=\"save()\" class=\"fake-button\">Save</div>\n<!-- Cannot tab to it, Enter/Space does nothing -->",
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "tab-order-and-tabindex",
      type: "explanation",
      instruction: {
        heading: "Tab order and tabindex",
        body: "The tab order is the sequence in which elements receive focus when a user presses Tab. By default, the tab order follows the DOM order — the order elements appear in your HTML source code. This means the first interactive element in your HTML is the first to receive focus, and the last is the last. This default behavior is almost always correct, because your HTML order should match the visual layout order.\n\nThe tabindex attribute lets you modify this default behavior, but it must be used carefully:\n\n<strong>tabindex=\"0\"</strong> — Adds an element to the natural tab order. Use this when you have a non-interactive element that needs to be focusable (like a custom widget built from divs). The element is inserted into the tab order at its position in the DOM. This is the safe, recommended value.\n\n<strong>tabindex=\"-1\"</strong> — Makes an element focusable programmatically (via JavaScript's .focus() method) but removes it from the tab order. The user cannot tab to it, but your code can move focus to it. Use this for elements that should receive focus only in specific situations — like a modal dialog that should be focused when it opens, or an error message that should be focused when it appears.\n\n<strong>tabindex=\"1\" or higher</strong> — Moves an element to the front of the tab order. DO NOT USE THIS. Positive tabindex values create a confusing, unpredictable tab order that is nearly impossible to manage. If element A has tabindex=\"5\" and element B has tabindex=\"3\", B gets focus before A, regardless of their position in the HTML. When you mix positive tabindex values with elements that have no tabindex (which default to 0), the navigation order becomes chaotic. The W3C explicitly recommends against positive tabindex values.\n\nThe correct approach is to arrange your HTML in a logical reading order. If the tab order does not match the visual order, fix the HTML or CSS layout — do not patch it with positive tabindex values.",
        docLinks: [
          {
            label: "MDN: tabindex",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex",
            type: "html-attribute",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "WCAG Success Criterion 2.4.3 (Focus Order) requires that when interactive elements receive focus, they do so in an order that preserves meaning and operability. If your tab order jumps randomly around the page, users lose context and cannot predict where focus will go next.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "Never use tabindex values greater than 0. Every accessibility expert and the W3C itself warns against this. If you need to change the tab order, rearrange your HTML instead. The tab order should match the visual and logical reading order of the page.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "<!-- tabindex=\"0\": adds a custom element to the tab order -->\n<div tabindex=\"0\" role=\"button\" onclick=\"toggle()\">\n  Custom toggle\n</div>\n\n<!-- tabindex=\"-1\": focusable by JS only, not by Tab -->\n<div id=\"error-message\" tabindex=\"-1\">\n  Please fix the errors above.\n</div>\n<script>\n  // Focus the error message when form validation fails:\n  document.getElementById('error-message').focus();\n</script>\n\n<!-- BAD: positive tabindex creates chaos -->\n<button tabindex=\"3\">Third?</button>\n<button tabindex=\"1\">First?</button>\n<button tabindex=\"2\">Second?</button>\n<!-- DO NOT do this. Rearrange your HTML instead. -->",
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "focus-indicators",
      type: "explanation",
      instruction: {
        heading: "Focus indicators: showing where you are",
        body: "A focus indicator is the visual cue that shows which element currently has keyboard focus. By default, browsers show a focus ring — usually a blue or black outline — around the focused element. This indicator is absolutely essential for keyboard users. Without it, pressing Tab is like walking through a building with the lights off — you know you are moving, but you have no idea where you are.\n\nUnfortunately, many developers remove the default focus indicator because they think it looks ugly. They add CSS like <code>outline: none</code> or <code>:focus { outline: 0 }</code> to get rid of the ring. This is one of the most harmful accessibility mistakes you can make. It is the equivalent of removing all the signs from a building because you do not like the font.\n\nThe correct approach is to customize the focus indicator, not remove it. Modern CSS provides the <code>:focus-visible</code> pseudo-class, which only shows the focus indicator when the user is navigating by keyboard — not when they click with a mouse. This gives you the best of both worlds: keyboard users see a clear focus ring, and mouse users do not see outlines on elements they click.\n\nHere is the recommended pattern:\n1. Remove the default outline for all focus events (mouse and keyboard).\n2. Add a custom focus indicator only for keyboard navigation using <code>:focus-visible</code>.\n3. Make the indicator high-contrast and clearly visible — at least 2px wide and a color that contrasts with the background.\n\nGoogle, GitHub, and YouTube all use custom focus indicators. Try tabbing through github.com — you will see a clear blue outline appear around every link and button, but only when you use the keyboard.",
        docLinks: [
          {
            label: "MDN: :focus-visible",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible",
            type: "css-selector",
          },
          {
            label: "MDN: outline",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/outline",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "WCAG Success Criterion 2.4.7 (Focus Visible) requires that keyboard focus indicators are visible. WCAG 2.2 added Success Criterion 2.4.11 (Focus Not Obscured) requiring that focused elements are not entirely hidden by other content, and 2.4.13 (Focus Appearance) recommending a minimum size and contrast for focus indicators. These criteria exist because removing focus indicators is one of the most common and most damaging accessibility failures.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "Never write <code>*:focus { outline: none; }</code> or <code>a:focus { outline: 0; }</code> without providing a replacement focus indicator. If you must remove the default outline, always add a visible alternative using :focus-visible. A good pattern: outline: 2px solid #2563EB; outline-offset: 2px; on :focus-visible.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "/* Bad: removes focus indicator entirely */\n*:focus {\n  outline: none; /* Don't do this! */\n}\n\n/* Good: custom focus indicator for keyboard only */\n*:focus-visible {\n  outline: 2px solid #2563EB;\n  outline-offset: 2px;\n  border-radius: 2px;\n}\n\n/* Remove default outline but replace with focus-visible */\nbutton:focus {\n  outline: none;\n}\nbutton:focus-visible {\n  outline: 3px solid #7C3AED;\n  outline-offset: 2px;\n}",
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "skip-links",
      type: "explanation",
      instruction: {
        heading: "Skip links: jumping past navigation",
        body: "Imagine you are a keyboard user visiting Amazon.com. You want to read the product description, but first you have to Tab through the entire header: the logo, the search bar, the delivery address selector, the account menu, the orders link, the cart icon, and dozens of category navigation links — potentially 50 or more tab stops before you even reach the main content. Now imagine doing this on every single page you visit. That is the reality for keyboard users on sites without skip links.\n\nA skip link is a hidden anchor link that appears at the very top of the page and jumps directly to the main content when activated. It is visually hidden by default but becomes visible when it receives keyboard focus — so the very first Tab press on the page reveals it. The user can press Enter to skip straight to the main content, or press Tab again to continue through the normal navigation.\n\nThe implementation is simple:\n1. Add an anchor link as the first element in <body> that points to the main content's id.\n2. Style it to be visually hidden by default using CSS positioning.\n3. Style it to become visible on <code>:focus</code> — typically by positioning it on-screen.\n4. Add an id to the <main> element (or the beginning of your primary content) so the skip link has a target.\n\nThis technique has been standard practice for over a decade. Try it on github.com: press Tab once and you will see a \"Skip to content\" link appear at the top of the page. Press Enter and focus jumps directly to the main content area. YouTube, Wikipedia, and most well-designed sites include skip links.",
        docLinks: [
          {
            label: "MDN: Skip navigation links",
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Operable#skip_navigation_links",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "WCAG Success Criterion 2.4.1 (Bypass Blocks) requires a mechanism to bypass blocks of content (like navigation) that are repeated on multiple pages. A skip link is the most common way to satisfy this requirement. It is a Level A criterion — meaning it is a baseline requirement for accessibility conformance.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "Make sure the skip link target (<main id=\"main-content\">) has tabindex=\"-1\" if it is not natively focusable. Some browsers will scroll to the anchor but not move keyboard focus without tabindex. Adding tabindex=\"-1\" ensures focus actually moves to the target, so the next Tab press goes to the first interactive element inside the main content.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "<!-- Skip link: first element in body -->\n<a href=\"#main-content\" class=\"skip-link\">\n  Skip to main content\n</a>\n\n<header>\n  <nav>\n    <a href=\"/\">Home</a>\n    <a href=\"/products\">Products</a>\n    <a href=\"/about\">About</a>\n    <a href=\"/contact\">Contact</a>\n  </nav>\n</header>\n\n<main id=\"main-content\" tabindex=\"-1\">\n  <h1>Welcome</h1>\n  <p>Main content starts here.</p>\n</main>\n\n<style>\n.skip-link {\n  position: absolute;\n  top: -100%;\n  left: 16px;\n  padding: 8px 16px;\n  background: #1E293B;\n  color: white;\n  z-index: 100;\n  border-radius: 4px;\n}\n.skip-link:focus {\n  top: 16px;\n}\n</style>",
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "tabindex-gapfill",
      type: "gap-fill",
      instruction: {
        heading: "Make it focusable",
        body: "This custom dialog needs to receive focus when opened by JavaScript, but users should NOT be able to tab to it in the normal tab order. Which tabindex value should you use?",
      },
      config: {
        type: "gap-fill",
        template:
          "<div id=\"dialog\" role=\"dialog\" tabindex=\"{{value}}\">\n  <h2>Confirm Action</h2>\n  <p>Are you sure?</p>\n  <button>Yes</button>\n  <button>No</button>\n</div>",
        gaps: [
          {
            id: "value",
            placeholder: "number",
            acceptedAnswers: ["-1"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "tabindex=\"-1\" makes an element focusable by JavaScript but not by Tab.",
        "tabindex=\"0\" would add it to the tab order. tabindex=\"-1\" keeps it out of the tab order.",
      ],
    },
    {
      id: "fix-keyboard-access",
      type: "free-edit",
      instruction: {
        heading: "Fix keyboard accessibility",
        body: "The code below has a clickable div that is not keyboard-accessible. Replace it with a proper semantic element that is natively focusable and responds to keyboard input. Also add a visible focus indicator style.",
        docLinks: [
          {
            label: "MDN: <button>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "The <button> element is focusable, responds to Enter and Space, and is announced as \"button\" by screen readers — all for free. A div needs tabindex, role, and keyboard event handlers to achieve the same thing. Always choose the native element.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          "<div onclick=\"deleteItem()\" class=\"delete-btn\">\n  Delete Item\n</div>\n\n<style>\n.delete-btn {\n  padding: 8px 16px;\n  background: #EF4444;\n  color: white;\n  border-radius: 4px;\n  cursor: pointer;\n}\n</style>",
        language: "html",
      },
      validation: {
        type: "contains-tag",
        criteria: { tag: "button" },
      },
      hints: [
        "Replace the <div> with a <button> element.",
        "The <button> element is keyboard-accessible by default — no tabindex or key handlers needed.",
        "Add a :focus-visible style so keyboard users can see when the button has focus.",
      ],
    },
  ],
};
