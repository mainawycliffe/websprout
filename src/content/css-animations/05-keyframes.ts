import type { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'css-animations-keyframes',
  slug: 'keyframes',
  title: 'Keyframes: Multi-Step Motion',
  description:
    'Learn when transitions are not enough and how @keyframes gives you full control over multiple animation stages.',
  order: 5,
  steps: [
    {
      id: 'transitions-vs-keyframes',
      type: 'explanation',
      instruction: {
        heading: 'When transitions stop being enough',
        body: `Transitions are perfect when you have two states: before and after. But sometimes motion has more than two stages. A loader might pulse over and over. A badge might rise, rotate, and settle. A notification might fade in, overshoot, then snap into place.

That is where <code>@keyframes</code> comes in. Keyframes let you define multiple checkpoints across time — like 0%, 50%, and 100% — and the browser animates between all of them.`,
        docLinks: [
          {
            label: 'MDN: @keyframes',
            url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes',
            type: 'css-concept',
          },
        ],
      },
      config: { type: 'explanation' },
      validation: { type: 'none', criteria: {} },
      hints: [],
    },
    {
      id: 'anatomy-of-keyframes',
      type: 'explanation',
      instruction: {
        heading: '0%, 50%, 100% are moments in time',
        body: `A keyframe animation works in two parts:

<ul><li>First, you define the motion path with <code>@keyframes</code>.</li><li>Then, you attach that animation to an element using properties like <code>animation-name</code>, <code>animation-duration</code>, and <code>animation-iteration-count</code>.</li></ul>

The percentages represent moments in the animation timeline. <code>0%</code> is the start. <code>100%</code> is the end. Any values in between let you create richer motion than a simple state change.`,
      },
      config: {
        type: 'explanation',
        demoCode: `@keyframes float-up {
  0% {
    transform: translateY(0);
    opacity: 0.7;
  }

  50% {
    transform: translateY(-8px);
    opacity: 1;
  }

  100% {
    transform: translateY(0);
    opacity: 0.7;
  }
}

.badge {
  animation: float-up 1.4s ease-in-out infinite;
}`,
        demoLanguage: 'css',
      },
      validation: { type: 'none', criteria: {} },
      hints: [],
    },
    {
      id: 'animation-shorthand',
      type: 'explanation',
      instruction: {
        heading: 'The animation shorthand',
        body: `The <code>animation</code> shorthand often includes these pieces:

<ul><li>name</li><li>duration</li><li>timing function</li><li>delay</li><li>iteration count</li><li>direction</li><li>fill mode</li></ul>

A common real-world example is <code>animation: pulse 1.2s ease-in-out infinite;</code>. That reads like a sentence: use the <code>pulse</code> animation, let it run for 1.2 seconds, ease in and out, and keep repeating forever.`,
        infoBoxes: [
          {
            variant: 'tip',
            title: 'Tip',
            body: 'Use infinite animation carefully. It is useful for loaders, live indicators, and subtle ambient motion — but it can become distracting very quickly if overused.',
          },
        ],
      },
      config: {
        type: 'explanation',
        demoCode: `.loader-dot {
  animation: pulse 1s ease-in-out infinite;
}`,
        demoLanguage: 'css',
      },
      validation: { type: 'none', criteria: {} },
      hints: [],
    },
    {
      id: 'fill-keyframe-stop',
      type: 'gap-fill',
      instruction: {
        heading: 'Complete the timeline',
        body: `Fill in the ending keyframe so the animation returns the badge to its original position at the end of the loop.`,
      },
      config: {
        type: 'gap-fill',
        template: `@keyframes float-badge {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }

  {{end_stop}} {
    transform: translateY(0);
  }
}`,
        gaps: [
          {
            id: 'end_stop',
            placeholder: 'ending percentage',
            acceptedAnswers: ['100%'],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: 'exact-match', criteria: {} },
      hints: ['Animations end at 100%.'],
    },
    {
      id: 'build-floating-badge',
      type: 'free-edit',
      instruction: {
        heading: 'Create a floating badge',
        body: `Give this promo badge a gentle looping motion. Add an <code>@keyframes</code> block and apply it with the <code>animation</code> property. A small up-and-down float or pulse works well.

Imagine this as a "New" or "Limited" badge on a product card — it should attract attention without screaming for it.`,
      },
      config: {
        type: 'free-edit',
        starterCode: `<div class="card">
  <span class="badge">New</span>
  <h2>Animation Toolkit</h2>
  <p>Small, purposeful motion patterns for real interfaces.</p>
</div>

<style>
  .card {
    width: 280px;
    padding: 20px;
    border-radius: 20px;
    background: white;
    font-family: system-ui, sans-serif;
    box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
  }

  .badge {
    display: inline-block;
    padding: 6px 10px;
    border-radius: 999px;
    background: #FDE68A;
    color: #92400E;
    font-size: 0.85rem;
    font-weight: 700;
    margin-bottom: 14px;
    /* Add your animation here */
  }

  /* Add @keyframes here */
</style>`,
        language: 'both',
      },
      validation: {
        type: 'contains-css',
        criteria: { property: '@keyframes' },
      },
      hints: [
        'Create an @keyframes block first.',
        'Then add animation: your-name 1.2s ease-in-out infinite; to .badge.',
      ],
    },
  ],
};
