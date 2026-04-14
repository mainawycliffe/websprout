import type { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'css-animations-why-animation',
  slug: 'why-animation',
  title: 'Why Animation Matters',
  description:
    'Learn why websites use motion for feedback, attention, and guidance — and why good animation is purposeful, not decorative noise.',
  order: 1,
  steps: [
    {
      id: 'why-motion-exists',
      type: 'explanation',
      instruction: {
        heading: 'Why the web uses motion at all',
        body: `Animation on the web is not just about making things look cool. Good motion answers a question for the user: <strong>What just changed?</strong> When a button darkens on hover, it tells you the element is interactive. When a card gently lifts, it tells you it can be clicked. When a menu slides open, it shows where the new content came from instead of making it appear out of nowhere.

Look at websites you already know. Amazon product cards lift or change shadow on hover. iPhone app store buttons pulse and change state when tapped. Google uses tiny loading animations to show that work is happening in the background. In every case, motion is acting like punctuation in a sentence — it helps the user understand meaning, sequence, and feedback faster than text alone can.`,
        analogy:
          'Think of animation like body language in a conversation. A nod means yes. A raised eyebrow means something changed. A pointing gesture guides your attention. Motion on a website plays the same role — it helps the interface communicate without long explanations.',
        docLinks: [
          {
            label: 'MDN: CSS animations',
            url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations',
            type: 'css-concept',
          },
          {
            label: 'MDN: CSS transitions',
            url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions',
            type: 'css-concept',
          },
        ],
        infoBoxes: [
          {
            variant: 'standard',
            title: 'Web Standard',
            body: 'The best motion is <strong>meaningful motion</strong>. It should explain state changes, reinforce hierarchy, or give feedback. Motion that exists only to show off can slow down tasks, distract users, and even make some people nauseous or uncomfortable.',
          },
          {
            variant: 'tip',
            title: 'Tip',
            body: 'Whenever you add an animation, ask: <em>What job is this motion doing?</em> If the answer is unclear, the animation probably should not be there.',
          },
        ],
      },
      config: {
        type: 'explanation',
        demoCode: `<style>
  .cta {
    padding: 14px 22px;
    border: none;
    border-radius: 999px;
    background: #2563EB;
    color: white;
    font: 600 16px system-ui, sans-serif;
    transition: transform 0.2s ease, background-color 0.2s ease;
  }

  .cta:hover {
    transform: translateY(-2px);
    background: #1D4ED8;
  }
</style>
<button class="cta">Start Learning</button>`,
        demoLanguage: 'html',
      },
      validation: { type: 'none', criteria: {} },
      hints: [],
    },
    {
      id: 'feedback-and-orientation',
      type: 'explanation',
      instruction: {
        heading: 'Feedback, attention, and orientation',
        body: `Most interface motion fits into three buckets:

<ul><li><strong>Feedback</strong> — a button changes when you hover, press, or complete an action.</li><li><strong>Attention</strong> — a badge pops, a toast fades in, or a sale label pulses so your eye notices it.</li><li><strong>Orientation</strong> — a panel slides in from the side, showing where it came from instead of teleporting onto the screen.</li></ul>

This matters because browsers update the page instantly. Without motion, changes can feel abrupt and disconnected. Animation adds a tiny bridge between the old state and the new one, helping the user follow the story of the interface.`,
        infoBoxes: [
          {
            variant: 'tip',
            title: 'Tip',
            body: 'A hover animation on a button is usually feedback. A modal fading and scaling in is orientation. A pulsing dot on a notification icon is attention. Learn the job first — then choose the motion.',
          },
        ],
      },
      config: {
        type: 'explanation',
        demoCode: `<style>
  .stage {
    display: flex;
    gap: 14px;
    align-items: center;
    font-family: system-ui, sans-serif;
  }
  .pill {
    padding: 8px 14px;
    border-radius: 999px;
    background: #E2E8F0;
    color: #0F172A;
  }
  .pill.notice {
    background: #FDE68A;
  }
</style>
<div class="stage">
  <span class="pill">Feedback</span>
  <span class="pill notice">Attention</span>
  <span class="pill">Orientation</span>
</div>`,
        demoLanguage: 'html',
      },
      validation: { type: 'none', criteria: {} },
      hints: [],
    },
    {
      id: 'motion-needs-restraint',
      type: 'explanation',
      instruction: {
        heading: 'Motion helps — until it gets in the way',
        body: `The most common beginner mistake is animating <strong>too much</strong>. If every card wiggles, every heading fades in, every panel bounces, and every button spins, the page stops feeling polished and starts feeling exhausting. Motion should make tasks easier, not noisier.

Good animation is usually quick, subtle, and tied to interaction. It should not delay the user from clicking, reading, or moving on. Later in this module you'll also learn why some users need reduced motion settings, which means your animations should be designed to be optional from the start.`,
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
            body: 'Animation is part of accessibility. Some people experience dizziness, nausea, or distraction from motion. Respecting reduced-motion preferences is a standards-friendly way to keep interfaces usable for more people.',
          },
        ],
      },
      config: { type: 'explanation' },
      validation: { type: 'none', criteria: {} },
      hints: [],
    },
  ],
};
