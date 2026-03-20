import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "web-accessibility-what-is-a11y",
  slug: "what-is-a11y",
  title: "What is Web Accessibility?",
  description:
    "Understand why accessibility matters, who benefits, and the standards that guide inclusive web design.",
  order: 1,
  steps: [
    {
      id: "why-accessibility-exists",
      type: "explanation",
      instruction: {
        heading: "Why web accessibility exists",
        body: "Web accessibility — often abbreviated as \"a11y\" (the \"11\" stands for the eleven letters between the \"a\" and the \"y\" in \"accessibility\") — means designing and building websites so that everyone can use them, regardless of ability, disability, or situation. The web was invented to be universal. Tim Berners-Lee, the inventor of the World Wide Web, said: \"The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect.\" Yet billions of web pages are built in ways that lock people out — images without descriptions, forms without labels, content that only works with a mouse. Accessibility is the practice of removing those barriers.\n\nThis is not a niche concern. Over one billion people worldwide live with some form of disability — that is roughly 15% of the global population. When a website is inaccessible, it is not just inconvenient; it can prevent someone from applying for a job, ordering groceries, accessing healthcare information, or participating in education. Web accessibility is a fundamental human rights issue, and in many countries it is also a legal requirement.\n\nThe good news: most accessibility improvements are straightforward HTML and CSS practices you can learn right now. They do not require special tools or frameworks. They make your site better for everyone — not just people with disabilities.",
        analogy: "Think about curb cuts — those small ramps at the edges of sidewalks. They were originally designed for wheelchair users, but they also help people pushing strollers, delivery workers with hand trucks, travelers with rolling suitcases, skateboarders, and anyone with a temporary injury using crutches. Making sidewalks accessible to wheelchairs made them better for everyone. Web accessibility works the same way — features designed for people with disabilities end up helping all users. This is called the \"curb cut effect.\"",
        docLinks: [
          {
            label: "MDN: What is accessibility?",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/What_is_accessibility",
            type: "html-concept",
          },
          {
            label: "MDN: Accessibility",
            url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The Web Content Accessibility Guidelines (WCAG) are the international standard for web accessibility, published by the W3C (World Wide Web Consortium — the same organization that maintains HTML and CSS standards). WCAG 2.1 defines three conformance levels: A (minimum), AA (recommended for most sites), and AAA (highest). Most laws and policies worldwide reference WCAG 2.1 Level AA as the baseline requirement.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "\"a11y\" is a numeronym — a word where a number replaces letters. The \"11\" represents the eleven letters between \"a\" and \"y\" in \"accessibility.\" You will see this abbreviation everywhere in developer communities, documentation, and tools.",
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
      id: "who-benefits",
      type: "explanation",
      instruction: {
        heading: "Who benefits from accessibility?",
        body: "Accessibility helps far more people than you might think. Disabilities are not just permanent conditions — they exist on a spectrum that includes permanent, temporary, and situational impairments. Understanding this spectrum changes how you think about building websites.\n\n<strong>Visual disabilities:</strong> A person who is blind uses a screen reader to navigate the web (permanent). Someone recovering from eye surgery might need high contrast and large text for several weeks (temporary). A person using their phone in bright sunlight cannot see a low-contrast screen (situational). All three benefit from the same accessible practices: proper text alternatives, sufficient color contrast, and well-structured headings.\n\n<strong>Motor/physical disabilities:</strong> A person with paralysis navigates entirely by keyboard, voice commands, or assistive switches (permanent). Someone with a broken arm cannot use a mouse for six weeks (temporary). A parent holding a baby in one arm can only use one hand on their phone (situational). All three benefit from keyboard-accessible interfaces and large, easy-to-tap buttons.\n\n<strong>Auditory disabilities:</strong> A person who is deaf relies on captions for video content (permanent). Someone with an ear infection has reduced hearing temporarily. A person in a noisy airport cannot hear audio. All three benefit from captions and visual alternatives to audio.\n\n<strong>Cognitive disabilities:</strong> A person with dyslexia needs clear, simple language and well-organized content (permanent). Someone who is sleep-deprived has reduced cognitive ability (temporary). A user trying to fill out a complex form while multitasking is cognitively overloaded (situational). All three benefit from clear instructions, logical layout, and forgiving form validation.\n\nWhen you build with accessibility in mind, you are building for the full range of human experience — not just for a narrow subset of \"typical\" users. YouTube's auto-captions were built for deaf users but are now used by millions of people watching videos in quiet offices, noisy gyms, and foreign-language contexts. Google's clean, simple search page was designed with clarity in mind, and it serves everyone from first-time internet users to power users equally well.",
        docLinks: [
          {
            label: "MDN: What is accessibility?",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/What_is_accessibility",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "WCAG organizes its guidelines around four principles called POUR: Perceivable (users can see or hear the content), Operable (users can interact with controls and navigation), Understandable (users can comprehend the content and interface), and Robust (content works across assistive technologies). Every accessibility technique you learn maps back to one of these four principles.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "When someone says \"accessibility only helps a small number of people,\" remember the spectrum. Permanent disability affects ~15% of the global population, but temporary and situational impairments affect virtually everyone at some point. Accessibility improvements benefit far more users than the specific group they were designed for.",
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
      id: "legal-requirements",
      type: "explanation",
      instruction: {
        heading: "Legal requirements and real-world impact",
        body: "Web accessibility is not just good practice — it is the law in many countries. In the United States, the Americans with Disabilities Act (ADA) has been interpreted by courts to apply to websites, and thousands of lawsuits have been filed against companies with inaccessible sites. The European Union's European Accessibility Act requires digital products to be accessible. In the UK, the Equality Act 2010 applies to websites. Canada, Australia, Japan, and many other countries have similar legislation.\n\nCompanies have faced real consequences for inaccessible websites. Domino's Pizza was sued because a blind customer could not order pizza through their website or mobile app using a screen reader — the case went all the way to the U.S. Supreme Court. Target settled an accessibility lawsuit for $6 million. Beyonce's website was sued because it lacked alt text on images and had inaccessible drop-down menus.\n\nBeyond legal compliance, accessibility is good for business. Accessible sites reach more customers, perform better in search engines (because search engine crawlers are essentially \"blind\" — they cannot see images or interact with JavaScript the way sighted users do), and tend to have cleaner, more maintainable code. When Amazon adds alt text to product images, screen readers can describe products to blind users — but those same alt texts also help Google index the images for search, helping all users find products faster.",
        docLinks: [
          {
            label: "MDN: Accessibility guidelines and the law",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/What_is_accessibility#accessibility_guidelines_and_the_law",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Section 508 of the U.S. Rehabilitation Act requires all federal government websites to be accessible. WCAG 2.1 Level AA is the most commonly referenced standard in accessibility legislation worldwide. If you learn to build sites that meet WCAG 2.1 AA, you are meeting the legal bar in most jurisdictions.",
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
      id: "wcag-principles-gapfill",
      type: "gap-fill",
      instruction: {
        heading: "The four WCAG principles",
        body: "WCAG is organized around four core principles, remembered by the acronym POUR. Fill in the missing principles.",
      },
      config: {
        type: "gap-fill",
        template:
          "The four WCAG principles are:\n1. {{p1}} — users can perceive the content\n2. {{p2}} — users can operate the interface\n3. {{p3}} — users can understand the content\n4. {{p4}} — content works with assistive technologies",
        gaps: [
          {
            id: "p1",
            placeholder: "first principle",
            acceptedAnswers: ["Perceivable", "perceivable"],
            caseSensitive: false,
          },
          {
            id: "p2",
            placeholder: "second principle",
            acceptedAnswers: ["Operable", "operable"],
            caseSensitive: false,
          },
          {
            id: "p3",
            placeholder: "third principle",
            acceptedAnswers: ["Understandable", "understandable"],
            caseSensitive: false,
          },
          {
            id: "p4",
            placeholder: "fourth principle",
            acceptedAnswers: ["Robust", "robust"],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The acronym is POUR — each letter starts one principle.",
        "P is for Perceivable, O is for Operable, U is for Understandable, R is for Robust.",
      ],
    },
    {
      id: "curb-cut-practice",
      type: "free-edit",
      instruction: {
        heading: "Add alt text to an image",
        body: "One of the simplest and most impactful accessibility improvements is adding alt text to images. The alt attribute provides a text description that screen readers announce to blind users, search engines use for indexing, and browsers display when an image fails to load. Without alt text, a screen reader will either skip the image entirely or announce the file name (\"DSC_0042.jpg\"), which is meaningless.\n\nBelow is an image tag missing its alt attribute. Add an alt attribute with a meaningful description of what the image shows. Good alt text is concise but descriptive — it should convey the same information a sighted user gets from looking at the image. For a logo, describe the brand name. For a photo, describe the scene. For a decorative image that adds no information (like a background swirl), use an empty alt attribute: alt=\"\".",
        docLinks: [
          {
            label: "MDN: alt attribute",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#alt",
            type: "html-attribute",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "WCAG Success Criterion 1.1.1 (Non-text Content) requires that all non-text content has a text alternative. This is a Level A requirement — the most basic level. Every image must have an alt attribute. Decorative images should use alt=\"\" (empty) so screen readers skip them entirely rather than announcing the filename.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "Common mistake: writing alt text like \"image of a sunset\" or \"photo of a cat.\" Screen readers already announce that it is an image — you do not need to say \"image of\" or \"picture of.\" Just describe the content: \"A golden sunset over the Pacific Ocean\" or \"An orange tabby cat sleeping on a windowsill.\"",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode: "<img src=\"sunset-beach.jpg\">",
        language: "html",
      },
      validation: {
        type: "contains-tag",
        criteria: { tag: "img" },
      },
      hints: [
        "Add an alt attribute to the img tag.",
        "Write a description of what the image shows, like: alt=\"A golden sunset over a sandy beach with waves\"",
      ],
    },
  ],
};
