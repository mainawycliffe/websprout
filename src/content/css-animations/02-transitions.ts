import type { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'css-animations-transitions',
  slug: 'transitions',
  title: 'Transitions: The Simplest Animation',
  description: 'Learn how CSS transitions animate the change between two states like default and hover.',
  order: 2,
  steps: [
    {
      id: 'transition-two-states',
      type: 'explanation',
      instruction: {
        heading: 'A transition animates between states',
        body: `A transition does not animate forever on its own. It only runs when an element changes from one state to another. That state change might come from <code>:hover</code>, <code>:focus</code>, <code>:active</code>, a class being added, or some other CSS change.

Without a transition, the browser jumps instantly from old values to new values. With a transition, the browser fills in the in-between frames for you. This is why transitions are the best place to start with animation: you already understand state changes from normal CSS. Transitions just make the change smooth instead of abrupt.`,
        docLinks: [
          {
            label: 'MDN: transition',
            url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/transition',
            type: 'css-property',
          },
        ],
      },
      config: {
        type: 'explanation',
        demoCode: `<style>
  .card {
    width: 220px;
    padding: 18px;
    border-radius: 16px;
    background: white;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
    font-family: system-ui, sans-serif;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .card:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 36px rgba(15, 23, 42, 0.16);
  }
</style>
<div class="card">
  <strong>Hover me</strong>
  <p style="margin: 8px 0 0; color: #475569;">The browser animates the change between the two states.</p>
</div>`,
        demoLanguage: 'html',
      },
      validation: { type: 'none', criteria: {} },
      hints: [],
    },
    {
      id: 'anatomy-of-transition',
      type: 'explanation',
      instruction: {
        heading: 'The four parts of a transition',
        body: `A transition is usually described with four parts:

<ul><li><strong>property</strong> — what should animate, like <code>transform</code> or <code>background-color</code></li><li><strong>duration</strong> — how long the motion lasts, like <code>0.2s</code></li><li><strong>timing function</strong> — how the motion speeds up or slows down, like <code>ease</code></li><li><strong>delay</strong> — how long to wait before starting</li></ul>

You can write them separately with <code>transition-property</code>, <code>transition-duration</code>, and so on, or combine them into the shorthand <code>transition</code>. Most real projects use the shorthand because it keeps related motion details together in one place.`,
        infoBoxes: [
          {
            variant: 'tip',
            title: 'Tip',
            body: 'A solid beginner default is <code>transition: transform 0.2s ease;</code>. It is fast, readable, and works well for subtle interface polish.',
          },
        ],
      },
      config: {
        type: 'explanation',
        demoCode: `.button {
  transition: background-color 0.2s ease 0s;
}`,
        demoLanguage: 'css',
      },
      validation: { type: 'none', criteria: {} },
      hints: [],
    },
    {
      id: 'fill-transition-property',
      type: 'gap-fill',
      instruction: {
        heading: 'Fill in the transition',
        body: `Complete the shorthand so the card animates its movement over <code>0.25s</code> with an <code>ease</code> timing function.`,
      },
      config: {
        type: 'gap-fill',
        template: `.card {
  transition: {{property}} {{duration}} {{timing}};
}`,
        gaps: [
          {
            id: 'property',
            placeholder: 'property',
            acceptedAnswers: ['transform'],
            caseSensitive: false,
          },
          {
            id: 'duration',
            placeholder: 'duration',
            acceptedAnswers: ['0.25s', '.25s'],
            caseSensitive: false,
          },
          {
            id: 'timing',
            placeholder: 'timing function',
            acceptedAnswers: ['ease'],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: 'exact-match', criteria: {} },
      hints: [
        'The property we want to animate is transform.',
        'Use 0.25s for the duration.',
        'The timing function is ease.',
      ],
    },
    {
      id: 'build-hover-card',
      type: 'free-edit',
      instruction: {
        heading: 'Build a hover transition',
        body: `Make this card feel interactive. Add a transition on the card, then animate either <code>transform</code>, <code>box-shadow</code>, or both when the user hovers.

Try to make it feel calm and deliberate — like a product card on an e-commerce site, not like it's trying to escape the page.`,
        docLinks: [
          {
            label: 'MDN: box-shadow',
            url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow',
            type: 'css-property',
          },
        ],
      },
      config: {
        type: 'free-edit',
        starterCode: `<div class="card">
  <h2>Study Playlist</h2>
  <p>Focus-friendly music for reading, coding, and note-taking.</p>
</div>

<style>
  .card {
    width: 260px;
    padding: 18px;
    border-radius: 18px;
    background: white;
    color: #0F172A;
    font-family: system-ui, sans-serif;
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
    /* Add your transition here */
  }

  .card:hover {
    /* Animate the card here */
  }
</style>`,
        language: 'both',
      },
      validation: {
        type: 'contains-css',
        criteria: { property: 'transition' },
      },
      hints: [
        'Start by adding transition: transform 0.2s ease; to .card.',
        'Then add transform: translateY(-4px); in .card:hover.',
        'You can also animate box-shadow at the same time.',
      ],
    },
  ],
};
