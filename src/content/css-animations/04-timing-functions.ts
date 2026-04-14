import type { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'css-animations-timing-functions',
  slug: 'timing-functions',
  title: 'Timing Functions and Feel',
  description: 'Learn how easing changes the personality of motion by controlling speed over time.',
  order: 4,
  steps: [
    {
      id: 'why-timing-matters',
      type: 'explanation',
      instruction: {
        heading: 'The path can stay the same while the feeling changes',
        body: `Two animations can move the same distance in the same amount of time and still feel completely different. Why? Because motion has <strong>timing</strong>. A timing function controls how fast the animation moves at each moment during its duration.

This matters because people read motion emotionally. A linear motion feels mechanical and constant. An ease-out motion feels more natural when something settles into place. An ease-in motion feels like something is building momentum. Timing is what turns motion from a raw movement into something expressive.`,
        docLinks: [
          {
            label: 'MDN: animation-timing-function',
            url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function',
            type: 'css-property',
          },
          {
            label: 'MDN: transition-timing-function',
            url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function',
            type: 'css-property',
          },
        ],
      },
      config: { type: 'explanation' },
      validation: { type: 'none', criteria: {} },
      hints: [],
    },
    {
      id: 'common-timing-functions',
      type: 'explanation',
      instruction: {
        heading: 'linear, ease, ease-in, ease-out, ease-in-out',
        body: `These timing functions show up constantly in UI work:

<ul><li><code>linear</code> — constant speed, like a machine</li><li><code>ease</code> — starts and ends gently; a solid default</li><li><code>ease-in</code> — starts slow, ends faster</li><li><code>ease-out</code> — starts fast, ends slow</li><li><code>ease-in-out</code> — slow at the start and end, faster in the middle</li></ul>

Many interface animations feel best with <code>ease</code> or <code>ease-out</code>, especially when elements enter or settle into place.`,
        infoBoxes: [
          {
            variant: 'tip',
            title: 'Tip',
            body: 'A tooltip or menu often feels better with <code>ease-out</code> because the motion slows down as it arrives, which makes it feel settled instead of abrupt.',
          },
        ],
      },
      config: {
        type: 'explanation',
        demoCode: `.menu {
  transition: transform 0.25s ease-out;
}`,
        demoLanguage: 'css',
      },
      validation: { type: 'none', criteria: {} },
      hints: [],
    },
    {
      id: 'fill-timing-function',
      type: 'gap-fill',
      instruction: {
        heading: 'Pick a timing function',
        body: `Fill in a timing function that starts quickly and slows as it reaches the end.`,
      },
      config: {
        type: 'gap-fill',
        template: `.panel {
  transition: transform 0.3s {{timing_value}};
}`,
        gaps: [
          {
            id: 'timing_value',
            placeholder: 'timing function',
            acceptedAnswers: ['ease-out'],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: 'exact-match', criteria: {} },
      hints: ['We want motion that slows down as it settles.', 'The answer is ease-out.'],
    },
    {
      id: 'tune-ui-motion',
      type: 'free-edit',
      instruction: {
        heading: 'Tune the feel of a button',
        body: `This button already moves on hover. Your job is to make it feel better by adjusting the timing function and duration.

Try a few combinations. Which one feels snappy but not harsh? Which one feels sluggish? The goal here is not just to make something move — it is to make the motion feel right for the job.`,
      },
      config: {
        type: 'free-edit',
        starterCode: `<button class="button">Preview lesson</button>

<style>
  .button {
    padding: 12px 18px;
    border: none;
    border-radius: 999px;
    background: #0F172A;
    color: white;
    font: 600 15px system-ui, sans-serif;
    transition-property: transform, background-color;
    transition-duration: 0.2s;
    transition-timing-function: linear;
  }

  .button:hover {
    transform: translateY(-4px);
    background: #1E293B;
  }
</style>`,
        language: 'both',
      },
      validation: {
        type: 'contains-css',
        criteria: { property: 'transition-timing-function' },
      },
      hints: [
        'Try changing linear to ease or ease-out.',
        'A short duration like 0.2s or 0.25s usually feels good for hover motion.',
      ],
    },
  ],
};
