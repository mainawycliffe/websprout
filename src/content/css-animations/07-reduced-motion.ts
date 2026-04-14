import type { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'css-animations-reduced-motion',
  slug: 'reduced-motion',
  title: 'Animation Accessibility and Reduced Motion',
  description:
    'Learn how to respect motion sensitivity with prefers-reduced-motion and design animations that remain optional.',
  order: 7,
  steps: [
    {
      id: 'motion-is-optional',
      type: 'explanation',
      instruction: {
        heading: 'Not everyone experiences motion the same way',
        body: `Some animations that feel fun or polished to one person can feel distracting, disorienting, or even nauseating to someone else. Large parallax motion, constant movement, zooming interfaces, and sliding panels can all be difficult for users with vestibular disorders, migraines, attention challenges, or plain motion sensitivity.

That is why animation should be treated as <strong>optional enhancement</strong>, not a requirement for understanding the page. The content and controls must still work when motion is reduced or removed.`,
        docLinks: [
          {
            label: 'MDN: prefers-reduced-motion',
            url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion',
            type: 'css-concept',
          },
        ],
        infoBoxes: [
          {
            variant: 'standard',
            title: 'Web Standard',
            body: 'The <code>prefers-reduced-motion</code> media feature lets the browser tell your CSS when the user has asked for less motion at the operating-system level.',
          },
        ],
      },
      config: { type: 'explanation' },
      validation: { type: 'none', criteria: {} },
      hints: [],
    },
    {
      id: 'media-query-for-motion',
      type: 'explanation',
      instruction: {
        heading: 'Use a media query to tone motion down',
        body: `The most common pattern is to keep your default animation, then override it inside a reduced-motion media query. That override might remove the animation completely, shorten it, or replace a large movement with a smaller opacity change.

The goal is not always to kill all animation instantly. The goal is to remove the kinds of motion that are most likely to cause discomfort while keeping the interface understandable.`,
      },
      config: {
        type: 'explanation',
        demoCode: `@media (prefers-reduced-motion: reduce) {
  .card,
  .button,
  .menu {
    animation: none;
    transition-duration: 0.01ms;
    transform: none;
  }
}`,
        demoLanguage: 'css',
      },
      validation: { type: 'none', criteria: {} },
      hints: [],
    },
    {
      id: 'fill-reduced-motion-query',
      type: 'gap-fill',
      instruction: {
        heading: 'Complete the accessibility query',
        body: `Fill in the media feature that targets users who have asked for reduced motion.`,
      },
      config: {
        type: 'gap-fill',
        template: `@media ({{feature_name}}: reduce) {
  .loader {
    animation: none;
  }
}`,
        gaps: [
          {
            id: 'feature_name',
            placeholder: 'media feature',
            acceptedAnswers: ['prefers-reduced-motion'],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: 'exact-match', criteria: {} },
      hints: ['The full name is prefers-reduced-motion.'],
    },
    {
      id: 'respect-motion-preference',
      type: 'free-edit',
      instruction: {
        heading: 'Add a reduced-motion fallback',
        body: `This call-to-action uses a looping pulse animation. Add a reduced-motion media query that stops the pulse and leaves the button stable.

The button should still look good and remain fully usable — it just should not keep moving for users who asked for less motion.`,
      },
      config: {
        type: 'free-edit',
        starterCode: `<button class="cta">Join the workshop</button>

<style>
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  .cta {
    padding: 12px 18px;
    border: none;
    border-radius: 999px;
    background: #8B5CF6;
    color: white;
    font: 700 15px system-ui, sans-serif;
    animation: pulse 1.3s ease-in-out infinite;
  }

  /* Add your reduced-motion media query here */
</style>`,
        language: 'both',
      },
      validation: {
        type: 'contains-css',
        criteria: { property: 'prefers-reduced-motion' },
      },
      hints: [
        'Start with @media (prefers-reduced-motion: reduce) { ... }',
        'Inside it, remove the animation from .cta.',
      ],
    },
  ],
};
