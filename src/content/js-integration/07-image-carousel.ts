import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "js-integration-image-carousel",
  slug: "image-carousel",
  title: "Build an Image Carousel",
  description:
    "Track an index in JavaScript, mutate transform: translateX in CSS. Build a smooth slide carousel with prev/next buttons.",
  order: 7,
  steps: [
    {
      id: "carousel-explain",
      type: "explanation",
      instruction: {
        heading: "The carousel pattern: index + transform",
        body: "<p>Carousels look complex but the core is simple:</p><ol><li>Stack all the slides in a row inside a wrapper. Each slide is the same width.</li><li>Use <code>overflow: hidden</code> on the parent so only one slide is visible at a time.</li><li>Track an integer <code>index</code> in JavaScript.</li><li>On 'next', increment the index. On 'prev', decrement. (Clamp or wrap as needed.)</li><li>Set <code>style.transform = 'translateX(-' + (index * 100) + '%)'</code> on the row of slides.</li></ol><p>CSS transitions do the smooth animation; JavaScript only changes the number.</p>",
        analogy:
          "Picture a film reel pulled across a projector. The frames are all in a long strip; only the one currently in front of the lens is visible. Pulling the strip is the transform.",
        docLinks: [
          {
            label: "MDN: transform",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/transform",
            type: "css-property",
          },
        ],
      },
      config: { type: "explanation" },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "carousel-build",
      type: "free-edit",
      instruction: {
        heading: "Build it: prev/next carousel",
        body: "<p>Wire <code>#prev</code> and <code>#next</code> to move through three slides. Track an index variable; on click update <code>track.style.transform</code>. Use <code>Math.max</code> and <code>Math.min</code> (or modulo) to keep the index in range.</p>",
      },
      config: {
        type: "free-edit",
        starterCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<style>\n  body { font-family: system-ui, sans-serif; max-width: 360px; margin: 0 auto; padding: 24px; }\n  .viewport { overflow: hidden; border-radius: 12px; background: #0f172a; }\n  .track { display: flex; transition: transform 0.4s ease; }\n  .slide { min-width: 100%; height: 200px; display: flex; align-items: center; justify-content: center; color: white; font-size: 32px; font-weight: 700; }\n  .s1 { background: linear-gradient(135deg, #6366f1, #ec4899); }\n  .s2 { background: linear-gradient(135deg, #f97316, #facc15); }\n  .s3 { background: linear-gradient(135deg, #10b981, #06b6d4); }\n  .controls { display: flex; justify-content: space-between; margin-top: 12px; }\n  button { padding: 8px 16px; border: none; border-radius: 8px; background: #6366f1; color: white; font-weight: 600; cursor: pointer; }\n</style>\n</head>\n<body>\n  <div class="viewport">\n    <div class="track" id="track">\n      <div class="slide s1">Sukuma</div>\n      <div class="slide s2">Tomatoes</div>\n      <div class="slide s3">Onions</div>\n    </div>\n  </div>\n  <div class="controls">\n    <button id="prev">‹ Prev</button>\n    <button id="next">Next ›</button>\n  </div>\n\n  <script>\n    // TODO:\n    // 1. let index = 0;\n    // 2. const track = document.querySelector("#track");\n    // 3. function update() { track.style.transform = `translateX(-${index * 100}%)`; }\n    // 4. wire #prev and #next click handlers that adjust index then call update()\n  </script>\n</body>\n</html>',
        language: "html-js",
      },
      validation: {
        type: "contains-js",
        criteria: { keywords: ["addEventListener", "translateX"] },
      },
      hints: [
        "let index = 0; const track = document.querySelector('#track');",
        "function update() { track.style.transform = `translateX(-${index * 100}%)`; }",
        "document.querySelector('#next').addEventListener('click', () => { index = Math.min(index + 1, 2); update(); });",
        "document.querySelector('#prev').addEventListener('click', () => { index = Math.max(index - 1, 0); update(); });",
      ],
    },
  ],
};
