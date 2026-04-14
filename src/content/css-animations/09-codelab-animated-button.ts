import type { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'css-animations-codelab-animated-button',
  slug: 'codelab-animated-button',
  title: 'Codelab: Animated Button States',
  description: 'Build a real call-to-action button with hover, press, loading, and reduced-motion states.',
  order: 9,
  steps: [
    {
      id: 'button-lab-setup',
      type: 'explanation',
      instruction: {
        heading: 'Set up your button lab',
        body: `In this codelab, you'll build a single button that teaches a lot of animation fundamentals: hover feedback, press feedback, a loading pulse, and a reduced-motion fallback. Buttons are the perfect place to practice because they're everywhere — checkout buttons, sign-up buttons, save buttons, upload buttons, and play buttons all rely on tiny motion cues.

Open a terminal on Linux with <strong>Ctrl + Alt + T</strong>, then run these commands one by one:

<ul><li><code>mkdir ~/animation-button-lab</code> — create a new project folder in your home directory</li><li><code>cd ~/animation-button-lab</code> — move into that folder</li><li><code>touch index.html style.css</code> — create the HTML and CSS files</li><li><code>code .</code> — open the folder in VS Code</li></ul>

If you use a different text editor, that is completely fine — the important thing is saving plain text files.`,
        infoBoxes: [
          {
            variant: 'tip',
            title: 'Tip',
            body: 'If <code>code .</code> does not work, open your editor manually and choose <strong>File → Open Folder</strong>, then select <code>~/animation-button-lab</code>.',
          },
        ],
      },
      config: {
        type: 'explanation',
        demoCode: `mkdir ~/animation-button-lab
cd ~/animation-button-lab
touch index.html style.css
code .`,
      },
      validation: { type: 'none', criteria: {} },
      hints: [],
    },
    {
      id: 'button-lab-html',
      type: 'explanation',
      instruction: {
        heading: 'Write the HTML first',
        body: `Put this into <code>index.html</code>. We are keeping the markup intentionally small so the motion is easier to understand. The button has a label and a small helper message below it.

After saving, open the file in your browser with <code>xdg-open index.html</code>. It will look plain at first — that is expected.`,
        docLinks: [
          {
            label: 'MDN: button element',
            url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button',
            type: 'html-element',
          },
        ],
      },
      config: {
        type: 'explanation',
        demoCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Animated Button Lab</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main class="page">
    <button class="cta">Save changes</button>
    <p class="helper">Hover, press, and load states should all feel clear.</p>
  </main>
</body>
</html>`,
        demoLanguage: 'html',
      },
      validation: { type: 'none', criteria: {} },
      hints: [],
    },
    {
      id: 'button-lab-base-styles',
      type: 'explanation',
      instruction: {
        heading: 'Add the still-state styles',
        body: `Now write the base CSS in <code>style.css</code>. Before animating anything, make the button look good while still. This is the same rule you used in the capstone: content and controls should make sense before motion is added.

Save with <strong>Ctrl + S</strong>, then refresh the browser with <strong>Ctrl + R</strong>.`,
      },
      config: {
        type: 'explanation',
        demoCode: `* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #0F172A;
  color: white;
  font-family: system-ui, sans-serif;
}

.page {
  text-align: center;
}

.cta {
  padding: 14px 20px;
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, #8B5CF6, #6366F1);
  color: white;
  font: 700 15px system-ui, sans-serif;
  box-shadow: 0 16px 28px rgba(99, 102, 241, 0.35);
}

.helper {
  margin-top: 14px;
  color: #CBD5E1;
}`,
        demoLanguage: 'css',
      },
      validation: { type: 'none', criteria: {} },
      hints: [],
    },
    {
      id: 'button-lab-hover-press',
      type: 'explanation',
      instruction: {
        heading: 'Add hover and press feedback',
        body: `Add transitions so the button lifts on hover and settles slightly on press. This is the most common animation pattern on the web because it mirrors real-world physical interaction: hover feels like your finger approaching, active feels like pressing downward.

Use <code>transform</code> for the movement and keep it small — this is feedback, not theater.`,
      },
      config: {
        type: 'explanation',
        demoCode: `.cta {
  transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease;
}

.cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 32px rgba(99, 102, 241, 0.42);
}

.cta:active {
  transform: translateY(0);
  filter: brightness(0.96);
}`,
        demoLanguage: 'css',
      },
      validation: { type: 'none', criteria: {} },
      hints: [],
    },
    {
      id: 'button-lab-loading-state',
      type: 'explanation',
      instruction: {
        heading: 'Add a loading pulse',
        body: `Sometimes a button needs to communicate that work is happening — saving, uploading, requesting, or checking. In a real app, JavaScript would toggle a loading class. For this codelab, we will simulate the loading version with a separate class.

The pulse should be subtle. A loading state is feedback, not a dance routine.`,
      },
      config: {
        type: 'explanation',
        demoCode: `@keyframes soft-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.03);
  }
}

.cta.loading {
  animation: soft-pulse 1s ease-in-out infinite;
}`,
        demoLanguage: 'css',
      },
      validation: { type: 'none', criteria: {} },
      hints: [],
    },
    {
      id: 'button-lab-reduced-motion',
      type: 'explanation',
      instruction: {
        heading: 'Respect reduced motion',
        body: `Finish the button by adding a reduced-motion rule. Hover and press feedback can remain very quick or nearly instant, but the looping loading pulse should stop for users who asked for less motion.

This is a great real-world example of animation as enhancement: the button is still readable, clickable, and useful without the pulse.`,
      },
      config: {
        type: 'explanation',
        demoCode: `@media (prefers-reduced-motion: reduce) {
  .cta,
  .cta.loading {
    animation: none;
    transition-duration: 0.01ms;
  }
}`,
        demoLanguage: 'css',
      },
      validation: { type: 'none', criteria: {} },
      hints: [],
    },
    {
      id: 'button-lab-checkpoint',
      type: 'free-edit',
      instruction: {
        heading: 'Checkpoint: Customize the button',
        body: `Now make the button your own. Try one or more of these:

<ul><li>Change the color palette</li><li>Swap the lift for a tiny scale-up instead</li><li>Make the loading state fade instead of pulse</li><li>Add a focus-visible style for keyboard users</li><li>Change the label to something from a real product, game, or portfolio site</li></ul>

Change values, save, refresh, test, and repeat — that is the real front-end workflow.`,
        docLinks: [
          {
            label: 'MDN: :focus-visible',
            url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible',
            type: 'css-selector',
          },
        ],
      },
      config: {
        type: 'free-edit',
        starterCode: `<button class="cta loading">Save changes</button>

<style>
  .cta {
    padding: 14px 20px;
    border: none;
    border-radius: 999px;
    background: linear-gradient(135deg, #8B5CF6, #6366F1);
    color: white;
    font: 700 15px system-ui, sans-serif;
    transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease;
    animation: soft-pulse 1s ease-in-out infinite;
  }

  .cta:hover {
    transform: translateY(-3px);
  }

  @keyframes soft-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.03); }
  }

  /* Add your customizations here */
</style>`,
        language: 'both',
      },
      validation: { type: 'none', criteria: {} },
      hints: ['Try adding a :focus-visible outline so keyboard users get clear feedback too.'],
    },
  ],
};
