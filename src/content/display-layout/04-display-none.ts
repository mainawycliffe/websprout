import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "display-layout-display-none",
  slug: "display-none",
  title: "Hiding Elements",
  description:
    "Two ways to hide elements — display: none removes them, visibility: hidden makes them invisible.",
  order: 4,
  steps: [
    {
      id: "why-hide-elements",
      type: "explanation",
      instruction: {
        heading: "Why hide elements?",
        body: "Websites often need to hide things: dropdown menus that appear on click, error messages that show when something goes wrong, mobile navigation that only appears on small screens. CSS gives you two very different ways to hide elements, and choosing the wrong one leads to confusing layout bugs. Understanding the difference is essential for building real interactive pages.",
        analogy:
          "display: none is like removing a chair from the room — the gap closes up and other furniture shifts over. visibility: hidden is like covering a chair with an invisibility cloak — you can't see it, but it still takes up space and you'll trip over it.",
        docLinks: [
          {
            label: "display",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/display",
            type: "css-property",
          },
          {
            label: "visibility",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/visibility",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Screen readers skip elements with display: none entirely — the content becomes invisible to both sighted users and assistive technology. If you want to hide something visually but keep it accessible to screen readers, use a different technique (like the 'visually-hidden' pattern).",
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
      id: "display-none-vs-visibility-hidden",
      type: "explanation",
      instruction: {
        heading: "display: none vs visibility: hidden",
        body: "Look at the gap! With display: none (top group), Box B is completely removed — A and C are right next to each other. With visibility: hidden (bottom group), Box B is invisible but still takes up space — notice the empty gap between A and C. Real-world example: YouTube's search bar on mobile uses display: none to hide the search input until you tap the search icon — the other header elements shift to fill the space. Amazon's \"Add to Cart\" confirmation popup is hidden with display: none until you click the button.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "A common mistake is using visibility: hidden when you want display: none, or vice versa. Think about whether the surrounding content should shift to fill the gap (use display: none) or stay in place (use visibility: hidden).",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<p style="font-weight:bold; margin-bottom:4px;">display: none — element is removed</p>\n<div style="background: #DBEAFE; padding: 12px; margin: 4px;">Box A — visible</div>\n<div style="display: none; background: #FCA5A5; padding: 12px; margin: 4px;">Box B — display: none</div>\n<div style="background: #D1FAE5; padding: 12px; margin: 4px;">Box C — visible</div>\n\n<hr style="margin: 16px 0;">\n\n<p style="font-weight:bold; margin-bottom:4px;">visibility: hidden — element is invisible but present</p>\n<div style="background: #DBEAFE; padding: 12px; margin: 4px;">Box A — visible</div>\n<div style="visibility: hidden; background: #FCA5A5; padding: 12px; margin: 4px;">Box B — visibility: hidden</div>\n<div style="background: #D1FAE5; padding: 12px; margin: 4px;">Box C — visible</div>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "remove-from-page",
      type: "gap-fill",
      instruction: {
        heading: "Remove from the page",
        body: "Write CSS to completely remove an element from the page layout — no space left behind. The element should be gone as if it were never in the HTML.",
      },
      config: {
        type: "gap-fill",
        template: ".hidden-element {\n  display: {{value}};\n}",
        gaps: [
          {
            id: "value",
            placeholder: "value",
            acceptedAnswers: ["none"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "This value removes the element from the layout entirely.",
        "The answer is 'none'.",
      ],
    },
    {
      id: "invisible-but-present",
      type: "gap-fill",
      instruction: {
        heading: "Invisible but present",
        body: "What CSS property makes an element invisible while keeping its space in the layout? The element should be hidden from view, but surrounding content should not shift.",
      },
      config: {
        type: "gap-fill",
        template: ".ghost-element {\n  {{property}}: hidden;\n}",
        gaps: [
          {
            id: "property",
            placeholder: "property",
            acceptedAnswers: ["visibility"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "It's not the display property — this is a different property.",
        "The answer is 'visibility'.",
      ],
    },
    {
      id: "hide-and-seek",
      type: "free-edit",
      instruction: {
        heading: "Hide and seek",
        body: "Practice both hiding techniques: use display: none to completely hide the spoiler paragraph (removing it from the layout), and use visibility: hidden to make the draft badge invisible while keeping its space. This mirrors real patterns — spoiler content should be fully removed, but a badge placeholder keeps the layout stable.",
      },
      config: {
        type: "free-edit",
        starterCode:
          '<p class="spoiler">The hero was the villain all along!</p>\n<span class="draft-badge">DRAFT</span>\n<p>This article is being reviewed.</p>\n\n<style>\n/* Hide the spoiler completely */\n\n/* Make the draft badge invisible but keep its space */\n\n</style>',
        language: "both",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "display" },
      },
      hints: [
        "Use .spoiler { display: none; } to hide the spoiler.",
        "Use .draft-badge { visibility: hidden; } to make the badge invisible.",
      ],
    },
  ],
};
