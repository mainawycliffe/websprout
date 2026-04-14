import type { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'css-animations-performance',
  slug: 'performance',
  title: 'Performance and Smooth Motion',
  description:
    'Learn why some animations feel silky and others feel janky, and why transform and opacity are usually the safest choices.',
  order: 6,
  steps: [
    {
      id: 'transform-and-opacity',
      type: 'explanation',
      instruction: {
        heading: 'Why transform and opacity are your safest defaults',
        body: `When you animate <code>transform</code> and <code>opacity</code>, the browser can often update the element more cheaply than when you animate layout-heavy properties like <code>width</code>, <code>height</code>, <code>top</code>, or <code>left</code>.

That does not mean other properties can never be animated. It means that for common interface polish — hover lifts, fades, small entrances, presses, nudges — <code>transform</code> and <code>opacity</code> are usually the most reliable place to start if you want smooth motion.`,
        docLinks: [
          {
            label: 'MDN: opacity',
            url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/opacity',
            type: 'css-property',
          },
          {
            label: 'MDN: transform',
            url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/transform',
            type: 'css-property',
          },
        ],
        infoBoxes: [
          {
            variant: 'standard',
            title: 'Web Standard',
            body: 'Smooth animation is not just a luxury. Janky motion can make an interface feel broken, slow, or cheap even when the rest of the UI is correct.',
          },
        ],
      },
      config: { type: 'explanation' },
      validation: { type: 'none', criteria: {} },
      hints: [],
    },
    {
      id: 'paint-layout-cost',
      type: 'explanation',
      instruction: {
        heading: 'Layout work is more expensive than visual-only motion',
        body: `Imagine animating a card from left to right using <code>left</code>. The browser may need to reconsider layout and repaint more of the page as the element moves. If you animate with <code>transform: translateX()</code> instead, the browser can often keep the layout stable and just redraw the element's visual position.

That is why you'll hear front-end developers say: <strong>animate how the element is drawn, not where the browser thinks it lives in the layout</strong>.`,
        infoBoxes: [
          {
            variant: 'tip',
            title: 'Tip',
            body: 'If an effect could be done with either <code>top</code>/<code>left</code> or <code>transform</code>, choose <code>transform</code> first unless you have a strong reason not to.',
          },
        ],
      },
      config: {
        type: 'explanation',
        demoCode: `.card:hover {
  transform: translateX(12px);
  opacity: 0.95;
}`,
        demoLanguage: 'css',
      },
      validation: { type: 'none', criteria: {} },
      hints: [],
    },
    {
      id: 'will-change-caution',
      type: 'explanation',
      instruction: {
        heading: 'Be careful with will-change',
        body: `You may see advice online to add <code>will-change: transform;</code> everywhere. That is not a good default. <code>will-change</code> is a hint to the browser that an element is about to animate, but using it too broadly can waste resources.

Use it sparingly and only when you have a real performance problem to solve. Most simple interface animations do not need it at all.`,
        docLinks: [
          {
            label: 'MDN: will-change',
            url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/will-change',
            type: 'css-property',
          },
        ],
      },
      config: { type: 'explanation' },
      validation: { type: 'none', criteria: {} },
      hints: [],
    },
    {
      id: 'swap-layout-motion',
      type: 'free-edit',
      instruction: {
        heading: 'Replace a layout-heavy hover with transform',
        body: `This card already moves on hover, but it uses a layout-style property. Replace that approach with a transform-based motion pattern instead.

You are not changing the idea of the effect — just the way it is implemented.`,
      },
      config: {
        type: 'free-edit',
        starterCode: `<div class="card">Performance matters</div>

<style>
  .card {
    position: relative;
    left: 0;
    width: 240px;
    padding: 18px;
    border-radius: 16px;
    background: #E0F2FE;
    color: #0C4A6E;
    font: 700 1rem system-ui, sans-serif;
    transition: left 0.2s ease;
  }

  .card:hover {
    left: 12px;
  }
</style>`,
        language: 'both',
      },
      validation: {
        type: 'contains-css',
        criteria: { property: 'transform' },
      },
      hints: [
        'Change the transition so it animates transform instead of left.',
        'Then replace left: 12px with transform: translateX(12px).',
      ],
    },
  ],
};
