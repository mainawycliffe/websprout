import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "web-accessibility-color-contrast",
  slug: "color-contrast",
  title: "Color Contrast & Visual Accessibility",
  description:
    "Understand WCAG contrast ratios, why color alone is not enough, and tools to verify your designs are readable by everyone.",
  order: 5,
  steps: [
    {
      id: "why-contrast-matters",
      type: "explanation",
      instruction: {
        heading: "Why color contrast matters",
        body: "Color contrast is the difference in luminance (brightness) between text and its background. High contrast means the text stands out clearly from the background — like black text on a white page. Low contrast means the text blends into the background — like light gray text on a white page.\n\nContrast matters because not everyone sees color the same way. Approximately 300 million people worldwide have color vision deficiency (commonly called \"color blindness\"). Another 250 million have low vision. Even people with perfect vision struggle to read low-contrast text in certain conditions: bright sunlight washing out a phone screen, a dimly lit room, an aging monitor with poor color reproduction, or simply tired eyes at the end of a long day.\n\nTry this experiment: open any website on your phone and go outside on a sunny day. Suddenly, that light gray text on white that looked fine indoors is completely unreadable. The sun creates a situational contrast problem that affects everyone. Now imagine that difficulty being permanent — that is the everyday experience for someone with low vision.\n\nThe Web Content Accessibility Guidelines define specific contrast ratios to ensure text is readable. These are not arbitrary numbers — they are based on research into human visual perception and were designed to cover the broadest range of visual abilities.\n\nContrast ratio is measured as a ratio between two values, ranging from 1:1 (no contrast — the foreground and background are the same color) to 21:1 (maximum contrast — pure black on pure white). The higher the ratio, the more readable the text is for more people.",
        analogy: "Think of contrast like the volume on a TV. If the dialogue volume is barely louder than the background music, you strain to hear what people are saying — especially in a noisy room or if you have any hearing difficulty. Turning up the dialogue volume (increasing contrast) makes it clear for everyone. WCAG contrast ratios are like a minimum volume requirement — ensuring the \"signal\" (text) is always loud enough to be perceived over the \"noise\" (background).",
        docLinks: [
          {
            label: "MDN: Color contrast",
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "WCAG Success Criterion 1.4.3 (Contrast Minimum) — Level AA — requires a contrast ratio of at least 4.5:1 for normal text (under 18pt or 14pt bold) and at least 3:1 for large text (18pt+ or 14pt+ bold). WCAG Success Criterion 1.4.6 (Contrast Enhanced) — Level AAA — raises these to 7:1 and 4.5:1 respectively. Most laws reference Level AA as the minimum.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "<!-- Low contrast: hard to read -->\n<p style=\"color: #999999; background: #FFFFFF;\">\n  This light gray text on white has a contrast\n  ratio of only 2.85:1 — fails WCAG AA.\n</p>\n\n<!-- Sufficient contrast: passes WCAG AA -->\n<p style=\"color: #595959; background: #FFFFFF;\">\n  This darker gray on white has a contrast\n  ratio of 7:1 — passes even WCAG AAA.\n</p>\n\n<!-- High contrast: maximum readability -->\n<p style=\"color: #000000; background: #FFFFFF;\">\n  Black on white has a contrast ratio of\n  21:1 — the maximum possible.\n</p>",
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "wcag-ratios",
      type: "explanation",
      instruction: {
        heading: "WCAG contrast ratios explained",
        body: "WCAG defines contrast requirements at two levels. Understanding both helps you make informed design decisions:\n\n<strong>Level AA (minimum recommended):</strong>\n- Normal text (smaller than 18pt / 24px, or smaller than 14pt / 18.5px bold): <strong>4.5:1</strong> minimum contrast ratio.\n- Large text (18pt / 24px or larger, or 14pt / 18.5px bold or larger): <strong>3:1</strong> minimum contrast ratio.\n- UI components and graphical objects (icons, borders, form field outlines): <strong>3:1</strong> minimum contrast ratio.\n\n<strong>Level AAA (enhanced):</strong>\n- Normal text: <strong>7:1</strong> minimum contrast ratio.\n- Large text: <strong>4.5:1</strong> minimum contrast ratio.\n\nWhy is large text held to a lower standard? Because larger letters are inherently easier to read — their shapes are more distinguishable even at lower contrast. A 24px heading at 3:1 contrast is roughly as readable as a 14px paragraph at 4.5:1 contrast.\n\nHere are some common color combinations and their contrast ratios:\n- Pure black (#000000) on pure white (#FFFFFF): <strong>21:1</strong> — passes everything.\n- Dark gray (#333333) on white (#FFFFFF): <strong>12.63:1</strong> — passes AAA.\n- Medium gray (#767676) on white (#FFFFFF): <strong>4.54:1</strong> — barely passes AA for normal text.\n- Light gray (#999999) on white (#FFFFFF): <strong>2.85:1</strong> — fails AA.\n- Blue (#0000FF) on white (#FFFFFF): <strong>8.59:1</strong> — passes AAA.\n- Red (#FF0000) on white (#FFFFFF): <strong>3.99:1</strong> — fails AA for normal text, passes for large text.\n\nThat last example surprises many people — pure red on white fails for normal text. Red has lower luminance than you might expect. This is why it is important to check contrast ratios with a tool rather than relying on visual judgment.",
        docLinks: [
          {
            label: "MDN: WCAG contrast requirements",
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "WCAG 2.1 Success Criterion 1.4.11 (Non-text Contrast) extends contrast requirements beyond text to UI components. Form field borders, icon buttons, focus indicators, and chart elements all need at least 3:1 contrast against their adjacent colors. A gray input border on a white background must be dark enough to see.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "The magic number to remember: #767676 is the lightest gray that passes WCAG AA (4.54:1) on a white background for normal text. If your gray text is lighter than #767676, it fails. Many design systems use this as their minimum \"muted text\" color.",
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
      id: "color-not-alone",
      type: "explanation",
      instruction: {
        heading: "Don't rely on color alone",
        body: "Even with sufficient contrast, relying on color as the ONLY way to convey information is a major accessibility problem. Approximately 8% of men and 0.5% of women have some form of color vision deficiency. The most common type (deuteranopia / protanopia) makes it difficult to distinguish red from green — exactly the colors most websites use for success and error states.\n\nConsider these common patterns that rely on color alone:\n\n<strong>Form validation:</strong> An input field turns red when there is an error and green when it is valid. A person with red-green color blindness sees the same color for both states. The fix: also add an icon (a checkmark for success, an X for error) and a text message describing the issue.\n\n<strong>Required fields:</strong> A form marks required fields with a red asterisk. If you cannot see red, the asterisk blends in with regular text. The fix: also add the word \"(required)\" in text, or use aria-required=\"true\" on the input.\n\n<strong>Links within text:</strong> A paragraph contains a link styled only with a blue color — no underline. A person with color blindness may not be able to distinguish the link from surrounding text. The fix: always underline links in body text, or add another visual differentiator like font weight.\n\n<strong>Charts and graphs:</strong> A pie chart uses red, green, and blue slices with only a color legend to distinguish them. A person with color blindness cannot match the slices to the legend. The fix: use patterns, textures, or direct labels in addition to color.\n\n<strong>Status indicators:</strong> A dashboard shows green dots for \"online,\" yellow for \"busy,\" and red for \"offline.\" The fix: add text labels or distinct shapes (circle, triangle, square) alongside the colors.\n\nThe principle is simple: color can enhance information, but it should never be the ONLY channel. Always provide at least one additional visual cue — text, icons, patterns, or shape changes.",
        docLinks: [
          {
            label: "MDN: Use of color",
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable#use_of_color",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "WCAG Success Criterion 1.4.1 (Use of Color) — Level A — states: \"Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.\" This is a Level A requirement, meaning it is one of the most fundamental accessibility rules.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "Quick test: take a screenshot of your page and convert it to grayscale (most image editors can do this, or use a browser extension). Can you still understand all the information? Can you tell which fields have errors, which links are clickable, and which status indicators mean what? If not, you are relying on color alone.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "<!-- Bad: color is the only indicator -->\n<input style=\"border-color: red;\" value=\"invalid@\">\n\n<!-- Good: color + icon + text message -->\n<input style=\"border-color: red;\" value=\"invalid@\">\n<span style=\"color: red;\">❌ Please enter a valid email address</span>\n\n<!-- Bad: link distinguished only by color -->\n<p>Read our <span style=\"color: blue;\">privacy policy</span>.</p>\n\n<!-- Good: link with underline -->\n<p>Read our <a href=\"/privacy\" style=\"color: blue; text-decoration: underline;\">privacy policy</a>.</p>",
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "contrast-ratio-gapfill",
      type: "gap-fill",
      instruction: {
        heading: "WCAG contrast requirements",
        body: "Fill in the minimum contrast ratios required by WCAG 2.1 Level AA.",
      },
      config: {
        type: "gap-fill",
        template:
          "WCAG AA minimum contrast ratios:\n• Normal text: {{normal}}:1\n• Large text (18pt+ or 14pt+ bold): {{large}}:1",
        gaps: [
          {
            id: "normal",
            placeholder: "ratio",
            acceptedAnswers: ["4.5"],
            caseSensitive: false,
          },
          {
            id: "large",
            placeholder: "ratio",
            acceptedAnswers: ["3"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "Normal text requires a higher ratio than large text.",
        "The ratios are 4.5:1 for normal text and 3:1 for large text.",
      ],
    },
    {
      id: "fix-contrast-practice",
      type: "free-edit",
      instruction: {
        heading: "Fix the contrast issues",
        body: "The HTML below has two accessibility problems: the paragraph text has insufficient contrast (light gray on white), and the error message relies on color alone to indicate an error. Fix both issues by: (1) changing the text color to a darker shade that meets WCAG AA (at least 4.5:1 ratio — #767676 or darker on white), and (2) adding a text indicator (like an icon or the word \"Error:\") so the error is not conveyed by color alone.",
        docLinks: [
          {
            label: "MDN: Color contrast",
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Remember: #767676 is the lightest gray that passes WCAG AA on white. Any color with a hex value where all three channels are less than or equal to 76 will pass. Common accessible grays: #595959 (7:1), #666666 (5.74:1), #767676 (4.54:1).",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          "<p style=\"color: #AAAAAA; background: #FFFFFF;\">\n  This text is hard to read because the\n  contrast is too low.\n</p>\n\n<input style=\"border: 2px solid red;\" value=\"bad-email\">\n<!-- No text message — color is the only error indicator -->",
        language: "html",
      },
      validation: {
        type: "contains-tag",
        criteria: { tag: "p" },
      },
      hints: [
        "Change #AAAAAA to a darker color like #595959 or #333333.",
        "Add an error message element below the input, like: <span>Error: Please enter a valid email</span>.",
        "The error message should include text, not just rely on the red border color.",
      ],
    },
  ],
};
