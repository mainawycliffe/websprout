import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "responsive-design-responsive-images",
  slug: "responsive-images",
  title: "Responsive Images",
  description:
    "Learn how to make images adapt to any screen size without wasting bandwidth or breaking layouts.",
  order: 6,
  steps: [
    {
      id: "why-images-need-help",
      type: "explanation",
      instruction: {
        heading: "Why images need special treatment",
        body: "By default, an image displays at its natural pixel dimensions. A 2000px-wide photo will be 2000px wide on screen — blowing past the edges of a phone screen and creating a horizontal scrollbar. Unlike text, which naturally wraps to fit its container, images are rigid rectangles. They don't reflow.\n\nBut the problem goes deeper than layout. A 2000px-wide image might be 500KB or more. On a phone screen that's only 375px wide, most of those pixels are wasted — the browser downloads a huge file and then shrinks it down visually. The user waits for a massive download they can't even see at full resolution. On slow mobile connections (3G, spotty Wi-Fi), this can mean several seconds of loading time for a single image. Instagram solves this by serving different image sizes for different screens: a small image for phone thumbnails, a medium image for the feed, and the full resolution only when you zoom in. Responsive images give you the same power — serve the right image for the right screen.",
        analogy:
          "Imagine ordering a poster to hang in a small frame. The store sends you a billboard-sized poster because that's the original size. You have to cut it down to fit your frame, but you still paid for shipping a billboard. Responsive images are like a store that asks 'what size frame do you have?' and sends exactly the right size — saving shipping costs (bandwidth) and fitting perfectly.",
        docLinks: [
          {
            label: "MDN: Responsive images",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images",
            type: "html-concept",
          },
          {
            label: "MDN: <img> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "Images are typically the largest files on a web page — often 50-80% of total page weight. The Lighthouse performance audit specifically checks for properly sized images. Serving oversized images is one of the most common performance problems on the web, and responsive images are the standard solution.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- This image will overflow on small screens! -->\n<img src="hero.jpg" alt="Hero image" width="2000" height="1000">\n\n<!-- This CSS makes ANY image responsive -->\n<style>\nimg {\n  max-width: 100%;\n  height: auto;\n}\n</style>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "max-width-100",
      type: "explanation",
      instruction: {
        heading: "The max-width: 100% technique",
        body: "The simplest and most important responsive image technique is just two CSS lines:\n\nimg { max-width: 100%; height: auto; }\n\nmax-width: 100% means the image will never exceed the width of its parent container. If the parent is 375px wide (phone), the image shrinks to 375px. If the parent is 1200px wide (desktop), the image can be up to 1200px — but never larger than its natural size. A 800px-wide image in a 1200px container stays at 800px; it doesn't stretch and get blurry.\n\nheight: auto preserves the aspect ratio. Without it, if you also set a fixed height, the image would squash or stretch. With auto, the height adjusts proportionally as the width changes.\n\nThis technique is so fundamental that many CSS resets and frameworks (including Tailwind CSS) include it by default. Every image on your page should have these rules. It costs nothing (two lines of CSS) and prevents the most common image layout problem (overflow on small screens).",
        docLinks: [
          {
            label: "MDN: max-width",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/max-width",
            type: "css-property",
          },
          {
            label: "MDN: object-fit",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit",
            type: "css-property",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Put img { max-width: 100%; height: auto; } in your global CSS reset — at the very top of your stylesheet. This ensures every image on your site is responsive by default. You never have to think about it on a per-image basis.",
          },
          {
            variant: "standard",
            title: "Web Standard",
            body: "The object-fit property gives you finer control over how an image fills its container. object-fit: cover scales the image to fill the container completely (cropping edges if needed). object-fit: contain scales it to fit inside the container without cropping. These work like background-size: cover and contain but for <img> elements.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "/* Make all images responsive by default */\nimg {\n  max-width: 100%;\n  height: auto;\n}\n\n/* For images that must fill a fixed container */\n.hero-img {\n  width: 100%;\n  height: 300px;\n  object-fit: cover; /* Crop to fill, no distortion */\n}\n\n/* For thumbnails that must fit inside a box */\n.thumbnail {\n  width: 100px;\n  height: 100px;\n  object-fit: contain; /* Fit inside, no cropping */\n}",
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "srcset-and-sizes",
      type: "explanation",
      instruction: {
        heading: "srcset: serving different images for different screens",
        body: "max-width: 100% solves the layout problem, but it doesn't solve the bandwidth problem. A phone still downloads the full 2000px image even though it only displays it at 375px. The srcset attribute on <img> lets you provide multiple versions of the same image at different sizes. The browser picks the best one based on the screen width and pixel density.\n\nThe sizes attribute tells the browser how wide the image will be displayed at different breakpoints — this helps it choose the right source before the image loads. Without sizes, the browser has to guess, and it often guesses wrong.\n\nIn the example below, the browser on a phone (375px wide, 2x pixel density) would pick hero-800.jpg — 800px covers 375 x 2 = 750 effective pixels. On a laptop (1200px wide, 1x density), it would pick hero-1200.jpg. On a 4K monitor, it would pick hero-2000.jpg. Each device downloads only what it needs.",
        docLinks: [
          {
            label: "MDN: srcset",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#srcset",
            type: "html-attribute",
          },
          {
            label: "MDN: sizes",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#sizes",
            type: "html-attribute",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The 'w' descriptor in srcset stands for the image's intrinsic width in pixels (e.g., 800w means the image file is 800 pixels wide). The browser uses this combined with the sizes attribute and the device's pixel ratio to select the optimal image. This is a purely declarative approach — the browser makes the final decision, which allows it to factor in things like network speed and battery level.",
          },
          {
            variant: "tip",
            title: "Tip",
            body: "You don't have to manually create multiple image sizes. Tools like Sharp (Node.js), Squoosh (browser-based), and image CDNs like Cloudinary or Imgix can automatically generate multiple sizes from a single upload.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<img\n  src="hero-800.jpg"\n  srcset="\n    hero-400.jpg 400w,\n    hero-800.jpg 800w,\n    hero-1200.jpg 1200w,\n    hero-2000.jpg 2000w\n  "\n  sizes="\n    (max-width: 600px) 100vw,\n    (max-width: 1200px) 50vw,\n    33vw\n  "\n  alt="A beautiful landscape"\n>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "picture-element",
      type: "explanation",
      instruction: {
        heading: "The <picture> element: art direction",
        body: "srcset lets the browser choose between different sizes of the same image. But sometimes you need a completely different image for different screens — this is called art direction. A wide panoramic photo works great on desktop but looks too small and detailed on a phone. You might want to show a cropped, zoomed-in version on mobile.\n\nThe <picture> element lets you specify completely different image sources for different conditions. Each <source> element has a media attribute (like a media query) and a srcset. The browser uses the first <source> whose media query matches. The <img> at the end is the fallback for browsers that don't support <picture>.\n\nNetflix uses art direction for movie posters: on desktop you see a wide cinematic banner; on mobile you see a tight portrait crop of the main character. Same content, different visual treatment for different screens.",
        docLinks: [
          {
            label: "MDN: <picture> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture",
            type: "html-element",
          },
          {
            label: "MDN: <source> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Always include an <img> tag inside <picture> as the last child. It serves as the fallback and is required for the element to work. The alt attribute goes on the <img>, not on <picture> or <source>.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<picture>\n  <!-- Mobile: cropped portrait version -->\n  <source\n    media="(max-width: 767px)"\n    srcset="hero-mobile.jpg"\n  >\n  <!-- Tablet: medium crop -->\n  <source\n    media="(max-width: 1023px)"\n    srcset="hero-tablet.jpg"\n  >\n  <!-- Desktop: full panoramic -->\n  <img src="hero-desktop.jpg" alt="Mountain landscape">\n</picture>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "responsive-img-css",
      type: "gap-fill",
      instruction: {
        heading: "Make images responsive",
        body: "Complete the CSS to make images responsive. They should never exceed their container's width, and their height should adjust automatically to prevent distortion.",
      },
      config: {
        type: "gap-fill",
        template:
          "img {\n  {{max_prop}}: 100%;\n  height: {{height_val}};\n}",
        gaps: [
          {
            id: "max_prop",
            placeholder: "property",
            acceptedAnswers: ["max-width"],
            caseSensitive: true,
          },
          {
            id: "height_val",
            placeholder: "value",
            acceptedAnswers: ["auto"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The property that limits width without forcing it is max-width.",
        "To maintain the aspect ratio, height should be auto.",
      ],
    },
    {
      id: "responsive-gallery",
      type: "free-edit",
      instruction: {
        heading: "Build a responsive image gallery",
        body: "Create CSS for a responsive image gallery. Make all images responsive (max-width: 100%), use a CSS grid that changes from 1 column on mobile to 2 on tablet (768px) to 3 on desktop (1024px), and use object-fit: cover on the images so they fill their grid cells without distortion.",
        docLinks: [
          {
            label: "MDN: CSS Grid",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout",
            type: "css-concept",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          "/* Make all images responsive */\nimg {\n\n}\n\n/* Gallery grid — mobile first */\n.gallery {\n  display: grid;\n  gap: 0.5rem;\n}\n\n.gallery img {\n  width: 100%;\n  height: 200px;\n  /* Make images fill their cells without distortion */\n}\n\n/* Tablet: 2 columns */\n\n/* Desktop: 3 columns */\n",
        language: "css",
      },
      validation: {
        type: "contains-css",
        criteria: { property: "object-fit" },
      },
      hints: [
        "Add max-width: 100% and height: auto to the img rule.",
        "Add object-fit: cover to .gallery img so images fill their cells.",
        "Use @media (min-width: 768px) for tablet and @media (min-width: 1024px) for desktop.",
      ],
    },
  ],
};
