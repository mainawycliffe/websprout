import type { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'css-animations-transforms',
  slug: 'transforms',
  title: 'Transforms: Move, Scale, Rotate',
  description: 'Learn how transform lets you move and reshape elements visually without changing the document flow.',
  order: 3,
  steps: [
    {
      id: 'why-transform',
      type: 'explanation',
      instruction: {
        heading: 'transform changes how an element is drawn',
        body: `The <code>transform</code> property changes an element's visual appearance after the browser has already laid it out. That means you can move, rotate, or scale an element without making the rest of the page recalculate around it.

This is why transforms are so common in animation. If a button grows slightly on hover, you usually want it to <em>look</em> larger without pushing its neighbors away. If a badge rotates, you want it to spin in place, not change the entire layout. Transform gives you exactly that kind of visual-only movement.`,
        docLinks: [
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
            body: 'Transforms usually perform better than animating layout properties like <code>top</code>, <code>left</code>, <code>width</code>, or <code>height</code>. They often avoid expensive layout recalculation.',
          },
        ],
      },
      config: { type: 'explanation' },
      validation: { type: 'none', criteria: {} },
      hints: [],
    },
    {
      id: 'translate-vs-top-left',
      type: 'explanation',
      instruction: {
        heading: 'translate is different from top and left',
        body: `When beginners want to move something, they often reach for <code>top</code> or <code>left</code>. But those properties belong to positioning and layout. They can affect how the browser calculates where the element belongs.

<code>translate()</code>, on the other hand, moves the element visually after layout. That makes it a better fit for interface motion like hover lifts, slide-ins, and subtle nudges. The element still occupies the same place in the document flow — it just appears somewhere else for the user.`,
      },
      config: {
        type: 'explanation',
        demoCode: `.tile:hover {
  transform: translateY(-6px);
}`,
        demoLanguage: 'css',
      },
      validation: { type: 'none', criteria: {} },
      hints: [],
    },
    {
      id: 'transform-functions',
      type: 'explanation',
      instruction: {
        heading: 'Common transform functions',
        body: `The most common transform functions are:

<ul><li><code>translate()</code> — move an element</li><li><code>scale()</code> — make it larger or smaller</li><li><code>rotate()</code> — spin it around a point</li><li><code>skew()</code> — slant it</li></ul>

You can combine multiple transforms in one value. For example, a card can both lift and scale a little on hover: <code>transform: translateY(-4px) scale(1.02);</code>. The order matters, because the browser applies the transform functions in sequence.`,
      },
      config: {
        type: 'explanation',
        demoCode: `<style>
  .row { display: flex; gap: 12px; font-family: system-ui, sans-serif; }
  .chip {
    padding: 12px 16px;
    border-radius: 16px;
    background: #DBEAFE;
    color: #1E3A8A;
    transition: transform 0.25s ease;
  }
  .chip:nth-child(1):hover { transform: translateY(-6px); }
  .chip:nth-child(2):hover { transform: scale(1.08); }
  .chip:nth-child(3):hover { transform: rotate(-6deg); }
</style>
<div class="row">
  <div class="chip">translate</div>
  <div class="chip">scale</div>
  <div class="chip">rotate</div>
</div>`,
        demoLanguage: 'html',
      },
      validation: { type: 'none', criteria: {} },
      hints: [],
    },
    {
      id: 'fill-transform-value',
      type: 'gap-fill',
      instruction: {
        heading: 'Choose the right transform',
        body: `Fill in the value that makes the button slightly bigger on hover.`,
      },
      config: {
        type: 'gap-fill',
        template: `.button:hover {
  transform: {{transform_value}};
}`,
        gaps: [
          {
            id: 'transform_value',
            placeholder: 'transform value',
            acceptedAnswers: ['scale(1.05)', 'scale(1.08)', 'scale(1.1)'],
            caseSensitive: false,
          },
        ],
      },
      validation: { type: 'exact-match', criteria: {} },
      hints: ['Use scale() when you want the element to grow.', 'A subtle value like 1.05 works well.'],
    },
    {
      id: 'build-transform-hover',
      type: 'free-edit',
      instruction: {
        heading: 'Animate with transform',
        body: `Turn this feature tile into something that feels alive. Add a transition and use <code>transform</code> on hover. You can lift it, scale it, rotate it slightly, or combine those effects.

Aim for the kind of motion you'd expect on a polished dashboard card or playlist tile — subtle, clear, and intentional.`,
      },
      config: {
        type: 'free-edit',
        starterCode: `<div class="tile">
  <strong>Weekly progress</strong>
  <p>7 lessons completed this week.</p>
</div>

<style>
  .tile {
    width: 260px;
    padding: 18px;
    border-radius: 18px;
    background: linear-gradient(135deg, #8B5CF6, #6366F1);
    color: white;
    font-family: system-ui, sans-serif;
    box-shadow: 0 12px 24px rgba(99, 102, 241, 0.25);
    /* Add a transition */
  }

  .tile:hover {
    /* Add a transform */
  }
</style>`,
        language: 'both',
      },
      validation: {
        type: 'contains-css',
        criteria: { property: 'transform' },
      },
      hints: [
        'Add transition: transform 0.2s ease; to .tile.',
        'Then try transform: translateY(-4px) scale(1.02); on hover.',
      ],
    },
  ],
};
