import type { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'css-animations-capstone',
  slug: 'capstone-animated-product-card',
  title: 'Capstone: Animated Product Card',
  description:
    'Combine transitions, transforms, keyframes, performance choices, and reduced-motion support into a polished product card.',
  order: 8,
  steps: [
    {
      id: 'project-brief',
      type: 'explanation',
      instruction: {
        heading: "What you're building",
        body: `In this capstone, you'll build an animated product card like the ones you see on ecommerce websites, online course platforms, and app marketplaces. The card should feel polished, not flashy:

<ul><li>a hover lift using <code>transform</code></li><li>a smooth shadow transition</li><li>a subtle badge animation using <code>@keyframes</code></li><li>a reduced-motion fallback</li></ul>

This is where the module comes together. You're not learning one property in isolation anymore — you're combining motion techniques into one real UI component.`,
        infoBoxes: [
          {
            variant: 'tip',
            title: 'Tip',
            body: 'If you ever feel lost in a capstone, go back to jobs: one motion for feedback, one for attention, one fallback for accessibility. Small purposeful pieces add up to a polished whole.',
          },
        ],
      },
      config: { type: 'explanation' },
      validation: { type: 'none', criteria: {} },
      hints: [],
    },
    {
      id: 'card-structure',
      type: 'explanation',
      instruction: {
        heading: 'Start with clean structure',
        body: `Write the card structure first. Motion comes later. The card needs a badge, a title, a description, a price, and a call-to-action button. The animation will sit on top of that structure — it should never replace it.

This is an important front-end habit: build the content so it already makes sense in a still state, then layer motion on top.`,
      },
      config: {
        type: 'explanation',
        demoCode: `<div class="card">
  <span class="badge">New</span>
  <h2>Motion Patterns Pack</h2>
  <p>Reusable hover, focus, and feedback animations for real product interfaces.</p>
  <strong class="price">$24</strong>
  <button class="cta">Add to cart</button>
</div>`,
        demoLanguage: 'html',
      },
      validation: { type: 'none', criteria: {} },
      hints: [],
    },
    {
      id: 'layer-the-motion',
      type: 'explanation',
      instruction: {
        heading: 'Layer motion in the right order',
        body: `For this card, layer the motion in this order:

<ul><li><strong>Feedback first</strong> — hover lift and shadow change on the card</li><li><strong>Attention second</strong> — a subtle looping badge animation</li><li><strong>Accessibility third</strong> — reduce or remove motion when requested</li></ul>

That order matters because the hover effect responds directly to user action, while the badge animation is ambient. Feedback should usually be stronger than ambient decoration, because it is tied to a task.`,
      },
      config: {
        type: 'explanation',
        demoCode: `.card {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.card:hover {
  transform: translateY(-6px);
}

.badge {
  animation: float-badge 1.5s ease-in-out infinite;
}`,
        demoLanguage: 'css',
      },
      validation: { type: 'none', criteria: {} },
      hints: [],
    },
    {
      id: 'build-the-card',
      type: 'free-edit',
      instruction: {
        heading: 'Build the animated card',
        body: `Finish the card. Add:

<ul><li>a transition-driven hover state on the card</li><li>a transform-based hover lift</li><li>an <code>@keyframes</code> animation on the badge</li><li>a reduced-motion fallback</li></ul>

When you're done, your card should feel polished on desktop, stable on reduced-motion systems, and understandable even before any animation plays.`,
        docLinks: [
          {
            label: 'MDN: @media',
            url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media',
            type: 'css-concept',
          },
        ],
      },
      config: {
        type: 'free-edit',
        starterCode: `<div class="card">
  <span class="badge">New</span>
  <h2>Motion Patterns Pack</h2>
  <p>Reusable hover, focus, and feedback animations for real product interfaces.</p>
  <strong class="price">$24</strong>
  <button class="cta">Add to cart</button>
</div>

<style>
  .card {
    width: 300px;
    padding: 22px;
    border-radius: 24px;
    background: white;
    color: #0F172A;
    font-family: system-ui, sans-serif;
    box-shadow: 0 16px 32px rgba(15, 23, 42, 0.08);
    /* Add transition styles */
  }

  .badge {
    display: inline-block;
    padding: 6px 10px;
    border-radius: 999px;
    background: #DDD6FE;
    color: #5B21B6;
    font-size: 0.8rem;
    font-weight: 800;
    margin-bottom: 14px;
    /* Add animation styles */
  }

  .price {
    display: block;
    margin: 16px 0 14px;
    font-size: 1.35rem;
  }

  .cta {
    padding: 12px 18px;
    border: none;
    border-radius: 999px;
    background: #8B5CF6;
    color: white;
    font: 700 15px system-ui, sans-serif;
  }

  .card:hover {
    /* Add hover motion */
  }

  /* Add @keyframes */

  /* Add reduced-motion fallback */
</style>`,
        language: 'both',
      },
      validation: {
        type: 'contains-css',
        criteria: { property: '@media' },
      },
      hints: [
        'Start with transition: transform 0.25s ease, box-shadow 0.25s ease; on .card.',
        'Use transform: translateY(-6px); on .card:hover.',
        'Add @media (prefers-reduced-motion: reduce) to disable the looping badge animation.',
      ],
    },
  ],
};
