import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "web-accessibility-testing-tools",
  slug: "testing-tools",
  title: "Accessibility Testing Tools & Techniques",
  description:
    "Learn how to audit your site with Lighthouse, axe DevTools, screen readers, and manual keyboard testing.",
  order: 6,
  steps: [
    {
      id: "testing-overview",
      type: "explanation",
      instruction: {
        heading: "Why you need to test accessibility",
        body: "Building an accessible website requires testing — you cannot rely on good intentions alone. Just as you would test a website in multiple browsers to catch rendering bugs, you need to test for accessibility to catch barriers that prevent people from using your site.\n\nAccessibility testing happens at multiple levels:\n\n<strong>Automated testing</strong> catches roughly 30-50% of accessibility issues. Tools can detect missing alt text, insufficient color contrast, missing form labels, empty links, and incorrect heading hierarchies. They are fast, consistent, and should be your first line of defense. But they have significant limitations — they cannot judge whether alt text is meaningful (\"image123\" passes automated tests but is useless), whether keyboard navigation makes logical sense, or whether content is actually understandable.\n\n<strong>Manual testing</strong> catches the issues that automated tools miss. This includes keyboard navigation testing (can you use the entire site without a mouse?), screen reader testing (does the site make sense when read aloud?), cognitive testing (are instructions clear and error messages helpful?), and visual testing (are focus indicators visible, is content readable at 200% zoom?).\n\n<strong>User testing with people with disabilities</strong> catches the issues that even careful developers miss. Real users have workflow patterns, assistive technology configurations, and expectations that developers may not anticipate. This is the gold standard of accessibility testing, though it is not always possible for every project.\n\nThe good news is that you already have powerful testing tools available for free, right in your browser. Let us walk through the most important ones.",
        docLinks: [
          {
            label: "MDN: Accessibility tools",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/Tooling",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "WCAG itself does not prescribe specific testing tools, but the W3C provides a comprehensive list of evaluation tools at w3.org/WAI/ER/tools/. The key principle: no single tool catches everything. A robust testing strategy combines automated scanning, manual keyboard testing, and screen reader testing.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "Start with automated tools (they are fast and free), then do manual keyboard testing (costs nothing but time), then try a screen reader (free on every operating system). Each layer catches issues the previous one missed. Even just the first two layers will catch the majority of common accessibility problems.",
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
      id: "lighthouse-audit",
      type: "explanation",
      instruction: {
        heading: "Lighthouse accessibility audit",
        body: "Lighthouse is a free, built-in auditing tool in Google Chrome that can scan any webpage for accessibility issues. It is the easiest way to get started with automated accessibility testing because it requires no installation — it is already in your browser.\n\nHere is how to run a Lighthouse accessibility audit:\n\n1. Open any webpage in Google Chrome.\n2. Press F12 or Ctrl+Shift+I to open DevTools.\n3. Click the \"Lighthouse\" tab (you may need to click the >> arrow to find it if your DevTools panel is narrow).\n4. Under \"Categories,\" make sure \"Accessibility\" is checked. You can uncheck the others (Performance, SEO, etc.) to speed up the scan.\n5. Click \"Analyze page load\" (or \"Generate report\").\n6. Wait 10-30 seconds for the scan to complete.\n\nLighthouse will produce a score from 0 to 100 and a detailed list of issues grouped by category. Each issue includes:\n- A description of the problem.\n- The specific elements that have the issue (you can click to find them in the DOM).\n- A link to learn more about why it matters and how to fix it.\n\nCommon issues Lighthouse catches:\n- Images missing alt attributes.\n- Form inputs missing associated labels.\n- Insufficient color contrast.\n- Links with no discernible text (empty or icon-only links without aria-label).\n- Missing document language (<html lang=\"...\">).\n- Heading levels that skip (e.g., h1 followed by h3).\n- Missing page title (<title> element).\n\nA Lighthouse score of 100 does NOT mean your site is fully accessible — it means you have passed all the automated checks. Many critical accessibility issues (keyboard traps, illogical focus order, unhelpful alt text, confusing user flows) cannot be detected by any automated tool. Lighthouse is a starting point, not a finish line.\n\nTry it right now: open any website you use frequently, run a Lighthouse accessibility audit, and see what score it gets. You might be surprised — even major websites often have issues.",
        docLinks: [
          {
            label: "Chrome Lighthouse",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/Tooling#lighthouse",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Run Lighthouse in an incognito window to avoid browser extensions interfering with the results. Some extensions inject elements into the page that can affect the accessibility score. Incognito mode gives you a clean baseline.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "Steps to run a Lighthouse audit:\n\n1. Open a webpage in Google Chrome\n2. Press F12 to open DevTools\n3. Click the \"Lighthouse\" tab\n4. Check \"Accessibility\" category\n5. Click \"Analyze page load\"\n6. Review the score and issue list\n\nCommon issues detected:\n• Missing alt text on images\n• Missing form labels\n• Insufficient color contrast\n• Empty or non-descriptive links\n• Missing lang attribute on <html>\n• Skipped heading levels",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "axe-devtools",
      type: "explanation",
      instruction: {
        heading: "axe DevTools: deeper automated testing",
        body: "axe DevTools is a browser extension (available for Chrome, Firefox, and Edge) created by Deque Systems, one of the leading accessibility consultancies. It is free for basic use and catches more issues than Lighthouse in many cases, with more detailed guidance on how to fix each problem.\n\nTo install and use axe DevTools:\n1. Search \"axe DevTools\" in the Chrome Web Store (or Firefox Add-ons) and install it.\n2. Open any webpage and press F12 to open DevTools.\n3. You will see a new \"axe DevTools\" tab in your DevTools panel.\n4. Click \"Scan ALL of my page\" to run a full accessibility scan.\n5. Review the results — each issue shows the element, the rule it violates, a description of the problem, and a link to detailed remediation advice.\n\naxe DevTools groups issues by severity:\n- <strong>Critical:</strong> Blocks people from using the site entirely (e.g., a form that cannot be submitted by keyboard).\n- <strong>Serious:</strong> Makes the site very difficult to use (e.g., missing form labels).\n- <strong>Moderate:</strong> Creates friction but the user can work around it (e.g., missing landmarks).\n- <strong>Minor:</strong> Best practice violations that affect quality but not basic usability.\n\nOne powerful feature of axe DevTools is the ability to highlight specific elements on the page. When you click on an issue, the affected element is highlighted in the browser, making it easy to locate and fix.\n\nAnother key advantage: axe is also available as an npm package (@axe-core/cli) that you can integrate into your automated testing pipeline. Many teams run axe checks on every pull request to prevent accessibility regressions from being merged.\n\nBoth Lighthouse and axe use the same underlying engine (axe-core) for many of their checks, but axe DevTools exposes more rules and provides more detailed guidance. Using both tools gives you the best automated coverage.",
        docLinks: [
          {
            label: "axe-core on GitHub",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/Tooling#axe_tools",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "axe-core tests against WCAG 2.0, WCAG 2.1, and WCAG 2.2 success criteria. It also checks Section 508 compliance and best practices that go beyond the formal WCAG requirements. The rules are open-source, well-documented, and map directly to specific WCAG success criteria.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "Run axe DevTools on your page after you fix Lighthouse issues. axe often catches additional problems that Lighthouse misses — especially around ARIA usage, focus management, and form labeling. The two tools complement each other well.",
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
      id: "screen-reader-basics",
      type: "explanation",
      instruction: {
        heading: "Testing with a screen reader",
        body: "A screen reader is software that reads the content of a web page aloud, allowing blind and low-vision users to navigate and interact with websites. Testing with a screen reader gives you a fundamentally different perspective on your site — you experience it the way many users with disabilities do.\n\nEvery major operating system includes a free screen reader:\n\n<strong>VoiceOver (macOS / iOS):</strong> Built into every Mac and iPhone. On Mac, activate it with Cmd + F5. Navigate with VO keys (Ctrl + Option) plus arrow keys. Press VO + U to open the rotor — a navigation menu that lists all headings, links, landmarks, and form controls on the page.\n\n<strong>NVDA (Windows):</strong> Free, open-source screen reader. Download from nvaccess.org. Navigate with Tab (interactive elements), arrow keys (content), and shortcut keys: H for next heading, D for next landmark, F for next form control, K for next link.\n\n<strong>TalkBack (Android):</strong> Built into Android devices. Enable in Settings > Accessibility > TalkBack. Navigate by swiping left/right to move between elements.\n\n<strong>Orca (Linux):</strong> Free, open-source screen reader for GNOME desktop. Enable in Settings > Accessibility or press Super + Alt + S.\n\nHere is a basic screen reader testing checklist:\n\n1. <strong>Page title:</strong> When the page loads, does the screen reader announce a meaningful page title? (This comes from the <title> element.)\n2. <strong>Landmarks:</strong> Can you use the screen reader's landmark navigation to find the header, navigation, main content, and footer?\n3. <strong>Headings:</strong> Can you navigate by headings? Does the heading hierarchy make sense as an outline?\n4. <strong>Images:</strong> Do images have meaningful alt text? Are decorative images hidden from the screen reader?\n5. <strong>Links:</strong> Do all links have descriptive text? (No \"click here\" or empty links.)\n6. <strong>Forms:</strong> Are all form inputs associated with labels? Are required fields announced? Are error messages announced?\n7. <strong>Dynamic content:</strong> When content changes (notifications, form errors, loading states), does the screen reader announce the change?\n\nYou do not need to become a screen reader expert. Even 10 minutes of testing will reveal issues you never would have found otherwise. The first time you hear your website read aloud, you will immediately notice things that need improvement.",
        docLinks: [
          {
            label: "MDN: Screen readers",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/Tooling#screen_readers",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Screen readers build an accessibility tree from the DOM — a parallel representation of the page that includes only semantically meaningful elements. Native HTML elements automatically populate this tree correctly. When you use <button>, the accessibility tree shows a button with its label. When you use <div onclick>, the accessibility tree shows... nothing useful. This is why semantic HTML is the foundation of screen reader compatibility.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "Start with VoiceOver on Mac (Cmd + F5) or NVDA on Windows — both are free and widely used. Try navigating a familiar website (like Wikipedia) first to learn the basic commands before testing your own site. The learning curve is short — you can do useful testing within 15 minutes of your first session.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "Screen Reader Keyboard Shortcuts (NVDA on Windows):\n\n• Tab / Shift+Tab  — Move between interactive elements\n• H / Shift+H      — Next / previous heading\n• D / Shift+D      — Next / previous landmark\n• F / Shift+F      — Next / previous form control\n• K / Shift+K      — Next / previous link\n• T / Shift+T      — Next / previous table\n• NVDA+F7          — Elements list (all links/headings/landmarks)\n• Enter            — Activate link or button\n• Space            — Toggle checkbox, press button\n\nVoiceOver on Mac:\n• Cmd+F5           — Toggle VoiceOver on/off\n• VO+Right/Left    — Navigate next/previous element\n• VO+U             — Open rotor (landmarks, headings, links)\n• VO+Space         — Activate element",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "manual-keyboard-testing",
      type: "explanation",
      instruction: {
        heading: "Manual keyboard testing checklist",
        body: "Manual keyboard testing is the single most impactful accessibility test you can do — it is free, requires no tools, and catches critical issues that automated scanners miss. Here is a step-by-step checklist to follow:\n\n<strong>Step 1: Tab through the entire page.</strong>\nStarting from the address bar, press Tab repeatedly and note:\n- Can you reach every interactive element (links, buttons, form inputs, dropdowns)?\n- Is the focus order logical — does it follow the visual layout, or does it jump randomly?\n- Can you always see which element has focus? (Look for the focus indicator.)\n- Are there any \"keyboard traps\" — places where Tab does not advance to the next element and you get stuck?\n\n<strong>Step 2: Test all interactive elements.</strong>\n- Press Enter on links — do they navigate correctly?\n- Press Enter and Space on buttons — do they activate?\n- Tab to form inputs — can you type in text fields?\n- Use Space to toggle checkboxes.\n- Use arrow keys to choose radio buttons and select options.\n- Press Escape to close any modals, dropdowns, or tooltips that have opened.\n\n<strong>Step 3: Test skip links.</strong>\n- Refresh the page and press Tab once. Does a \"Skip to main content\" link appear?\n- Press Enter on the skip link — does focus move to the main content?\n\n<strong>Step 4: Test at 200% zoom.</strong>\n- Press Ctrl + to zoom to 200%. Does the layout still work? Can you still read all content? Does anything overflow or get cut off?\n\n<strong>Step 5: Test with high contrast mode.</strong>\n- On Windows, press Left Alt + Left Shift + Print Screen to toggle High Contrast mode. On Mac, go to System Preferences > Accessibility > Display > Increase Contrast. Does your content remain readable and usable?\n\nIf you find any issues during this checklist, those are real accessibility barriers that affect real users. Fix them before deploying.",
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "WCAG Success Criterion 2.1.2 (No Keyboard Trap) — Level A — requires that if keyboard focus can be moved to a component, focus can also be moved away using only the keyboard. Keyboard traps are one of the most severe accessibility failures because they physically prevent a user from continuing to use the page.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "Make keyboard testing part of your development workflow. Before you commit code, unplug your mouse and try to use the feature you just built. If you can complete the task by keyboard alone, most keyboard-dependent users can too. This 30-second test catches most keyboard accessibility issues.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "Manual Keyboard Testing Checklist:\n\n[ ] Tab through entire page — all elements reachable\n[ ] Focus order matches visual layout\n[ ] Focus indicator always visible\n[ ] No keyboard traps (can always Tab forward)\n[ ] Enter activates links and buttons\n[ ] Space activates buttons and toggles checkboxes\n[ ] Arrow keys work in radio groups and selects\n[ ] Escape closes modals and dropdowns\n[ ] Skip link appears on first Tab\n[ ] Skip link moves focus to main content\n[ ] Page works at 200% zoom\n[ ] Content readable in high contrast mode",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "testing-tools-gapfill",
      type: "gap-fill",
      instruction: {
        heading: "Match the testing tool",
        body: "Fill in which built-in browser tool provides an accessibility score from 0-100, and what percentage of issues automated tools typically catch.",
      },
      config: {
        type: "gap-fill",
        template:
          "The built-in Chrome tool that provides an accessibility score is {{tool}}.\nAutomated tools catch roughly {{percent}}% of accessibility issues.",
        gaps: [
          {
            id: "tool",
            placeholder: "tool name",
            acceptedAnswers: ["Lighthouse", "lighthouse"],
            caseSensitive: false,
          },
          {
            id: "percent",
            placeholder: "percentage",
            acceptedAnswers: ["30-50", "30", "40", "50", "30 to 50"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The tool is built into Chrome DevTools and has a tab in the DevTools panel.",
        "Automated tools catch a minority of issues — roughly 30-50%.",
      ],
    },
  ],
};
