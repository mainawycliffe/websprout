import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "tag-builder-codelab",
  slug: "codelab",
  title: "Codelab: Your First Webpage",
  description:
    "Step-by-step guide to creating a real HTML & CSS webpage on your own computer.",
  order: 14,
  steps: [
    {
      id: "codelab-setup",
      type: "explanation",
      instruction: {
        heading: "Set up your workspace",
        body: "Up until now, you've been writing HTML and CSS inside WebSprout's built-in editor. That's great for learning, but real web developers write code in files on their own computer and open them in a browser. Let's do that right now!\n\nFirst, you need a terminal — a text-based way to talk to your computer. Instead of clicking icons, you type short commands and press Enter. It looks like a dark window with blinking text, and it's one of the most powerful tools a developer has.\n\nOn Linux, press Ctrl + Alt + T to open a terminal. You'll see a blinking cursor waiting for your commands. Now type these three commands, pressing Enter after each one:\n\n• mkdir ~/my-website — This creates a new folder called \"my-website\". The command mkdir stands for \"make directory\" (directory is just another word for folder). The ~ symbol is a shortcut that means \"my home folder\" — so the full path is something like /home/yourname/my-website.\n\n• cd ~/my-website — This moves you into that folder. The command cd stands for \"change directory\". Think of it like double-clicking a folder to open it, but with text.\n\n• code . — This opens VS Code (a popular code editor) in the current folder. The dot . means \"right here\" — it tells VS Code to open whatever folder you're currently in.",
        analogy:
          "The terminal is like texting your computer instead of tapping buttons. You type a short message (a command), press Enter (send), and the computer does what you asked. It feels unfamiliar at first, but once you learn a few commands, it becomes faster than clicking through menus.",
        infoBoxes: [
          {
            variant: "tip",
            body: "If VS Code isn't installed, you can download it free from code.visualstudio.com — or use any text editor like gedit or nano. The important thing is having a program that saves plain text files. Don't use a word processor like LibreOffice Writer — it adds invisible formatting that browsers can't read.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "# Open a terminal with Ctrl + Alt + T, then type:\n\nmkdir ~/my-website\ncd ~/my-website\ncode .",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-create-file",
      type: "explanation",
      instruction: {
        heading: "Create index.html",
        body: 'In VS Code, click File → New File (or press Ctrl + N). Then click File → Save As (or Ctrl + Shift + S) and name the file index.html. Make sure you save it inside your my-website folder.\n\nThe name index.html is special in web development. When a web server receives a visitor, it looks for a file called index.html by default — it\'s like the front door of your website. Every website you visit (google.com, wikipedia.org) has an index.html as its starting page.\n\nNow type the following code into your file. This is called the HTML boilerplate — the essential skeleton that every HTML page needs. Let\'s break down every single line:\n\n• <!DOCTYPE html> — This isn\'t a tag; it\'s a declaration that tells the browser "this document is written in HTML5" (the current version of HTML). Without it, browsers might render your page in a quirky, outdated mode.\n• <html lang="en"> — The root element that wraps everything. The lang="en" attribute tells browsers and screen readers the page is in English.\n• <head> — This section holds invisible metadata — information about the page that doesn\'t show up on screen.\n• <meta charset="UTF-8"> — Tells the browser which character encoding to use. UTF-8 supports every language\'s characters (English, Arabic, Chinese, emoji) — it\'s the universal standard.\n• <meta name="viewport" ...> — Makes your page display correctly on phones and tablets by setting the width to match the device screen.\n• <title> — Sets the text that appears in the browser tab. Try something fun like "My Profile Page"!\n• <body> — Everything visible on your page goes here. This is where you\'ll add your content.',
        analogy:
          "The boilerplate is like the foundation and framing of a house. Visitors don't see the concrete foundation or wooden studs, but without them the house can't stand. The <head> is the behind-the-scenes paperwork (permits, blueprints), and the <body> is the rooms people actually walk through.",
        infoBoxes: [
          {
            variant: "standard",
            body: 'In WebSprout lessons, the boilerplate was handled for you behind the scenes. In real files, you always need it. VS Code shortcut: type ! (exclamation mark) and press Tab — VS Code will generate the entire boilerplate automatically. This is called an Emmet abbreviation.',
          },
        ],
        docLinks: [
          {
            label: "<!DOCTYPE>",
            url: "https://developer.mozilla.org/en-US/docs/Glossary/Doctype",
            type: "html-concept",
          },
          {
            label: "<html> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html",
            type: "html-element",
          },
          {
            label: "<head> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head",
            type: "html-element",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My Profile Page</title>\n</head>\n<body>\n  <!-- Your content will go here -->\n</body>\n</html>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-open-browser",
      type: "explanation",
      instruction: {
        heading: "Open in your browser",
        body: "Time to see your page in a real browser! Save your file in VS Code (Ctrl + S), then switch to your terminal and type:\n\nxdg-open index.html\n\nThe xdg-open command is a Linux utility that opens a file with whatever program is set as the default for that file type. For .html files, that's your web browser (Firefox, Chrome, etc.). It's like double-clicking a file in your file manager.\n\nYou can also open the file without the terminal: find index.html in your file manager (usually in Home → my-website), then double-click it or right-click → Open With → your preferred browser.\n\nYou'll see... a blank page! That's completely correct — your <body> is empty, so there's nothing to display yet. But look at the browser tab at the top — it should say \"My Profile Page\" (or whatever you put in your <title> tag). That proves the browser is reading your HTML!",
        analogy:
          "Opening your HTML file in a browser is like printing a document to see how it looks on paper. The browser is your 'viewer' — it reads the HTML instructions and draws the result on screen.",
        infoBoxes: [
          {
            variant: "tip",
            body: "HTML files don't need a web server to work. Your browser reads the file directly from your computer's hard drive. This is different from websites on the internet (which need a server to deliver files to visitors), but for learning and building, local files work perfectly. You'll notice the address bar shows something like file:///home/yourname/my-website/index.html instead of https://.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode: "# In your terminal, type:\n\nxdg-open index.html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-add-content",
      type: "explanation",
      instruction: {
        heading: "Add your content",
        body: "Now for the fun part — let's fill your page with real content! Go back to VS Code and add the following inside your <body> tag (between <body> and </body>):\n\n• An <h1> with your name (or a made-up name) — this is the main heading, the biggest text on the page.\n• A <p> with a short bio — a sentence or two about yourself, your hobbies, or anything you like.\n• An <img> tag to display a picture — we'll use a placeholder image for now. The src attribute tells the browser where the image lives, and alt describes the image for screen readers and in case the image fails to load.\n• An <a> link to your favorite website — the href attribute is the URL, and the text between the tags is what the user clicks.\n\nAfter adding your content, you need to do two things:\n• Save the file: Press Ctrl + S in VS Code\n• Refresh the browser: Switch to your browser and press Ctrl + R (or F5)\n\nYou should see your heading, paragraph, image, and link appear on the page!",
        infoBoxes: [
          {
            variant: "tip",
            body: "Every time you make a change in your code: Save (Ctrl+S) → Switch to browser → Refresh (Ctrl+R). This save-refresh cycle is the core workflow of web development. You'll do it hundreds of times. Some developers set up auto-refresh tools later, but the manual cycle is important to understand first.",
          },
        ],
        docLinks: [
          {
            label: "<h1>–<h6> headings",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements",
            type: "html-element",
          },
          {
            label: "<p> paragraph",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p",
            type: "html-element",
          },
          {
            label: "<img> image",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img",
            type: "html-element",
          },
          {
            label: "<a> anchor (link)",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a",
            type: "html-element",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<body>\n  <h1>Alex Rivera</h1>\n  <p>Hi! I\'m a student learning web development. I love music, hiking, and building things with code.</p>\n  <img src="https://via.placeholder.com/150" alt="Profile photo of Alex">\n  <a href="https://developer.mozilla.org">Visit MDN Web Docs</a>\n</body>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-add-css",
      type: "explanation",
      instruction: {
        heading: "Create style.css and link it",
        body: "Your page has content, but it looks plain — just black text on a white background with a default font. Let's change that with CSS!\n\nIn VS Code, create a new file (File → New File) and save it as style.css in the same folder as your index.html. This is an external stylesheet — a separate file dedicated entirely to styling.\n\nNext, you need to tell your HTML to load this CSS file. In index.html, add this line inside <head> (right before </head>):\n\n<link rel=\"stylesheet\" href=\"style.css\">\n\nThe <link> tag connects your HTML to an external resource. The rel=\"stylesheet\" attribute says \"this linked file is a stylesheet,\" and href=\"style.css\" is the path to the file. Since both files are in the same folder, you just need the filename.\n\nNow open style.css and add your CSS rules! Target the elements you created: body, h1, p, a, and img. You can also add a class like .profile for custom styling.\n\nWhy use a separate CSS file instead of a <style> tag? External stylesheets can be shared across multiple pages — so if your website has 10 pages, they all link to the same style.css and get the same look. Change one rule in the CSS file, and every page updates. The <style> tag (which we used in WebSprout) only applies to the single page it's in.",
        analogy:
          "Think of the HTML file as a book's manuscript — all the words and content. The CSS file is like a separate design guide that the publisher uses: font choices, colors, spacing, layout. The same manuscript could be styled differently by different designers, and the same design guide could be applied to different manuscripts.",
        infoBoxes: [
          {
            variant: "standard",
            body: "Professional websites almost always use external .css files. The <style> tag is fine for quick experiments, but for real projects, keeping CSS in separate files makes your code organized, reusable, and easier for teams to work on together.",
          },
        ],
        docLinks: [
          {
            label: "<link> element",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link",
            type: "html-element",
          },
          {
            label: "How CSS is structured",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Getting_started",
            type: "css-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<!-- In index.html, add this inside <head>: -->\n<link rel="stylesheet" href="style.css">\n\n\n/* ---- style.css ---- */\n\nbody {\n  font-family: Arial, sans-serif;\n  max-width: 600px;\n  margin: 40px auto;\n  padding: 20px;\n  background-color: #f5f5f5;\n  color: #333;\n}\n\nh1 {\n  color: #2d3a8c;\n}\n\np {\n  line-height: 1.6;\n}\n\nimg {\n  border-radius: 50%;\n  border: 3px solid #2d3a8c;\n}\n\na {\n  color: #6366f1;\n  text-decoration: none;\n}\n\na:hover {\n  text-decoration: underline;\n}\n\n.profile {\n  text-align: center;\n  padding: 30px;\n  background-color: white;\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}',
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-experiment",
      type: "explanation",
      instruction: {
        heading: "Experiment and explore",
        body: "You now have a working webpage with HTML and CSS — congratulations! But the best way to really learn is to experiment. Try changing things and see what happens:\n\n• Change a color value and refresh — what looks good? What looks terrible? Both are valuable experiments.\n• Adjust font-size values (try 24px, 16px, 2em).\n• Add border-radius: 12px to elements to round their corners.\n• Try a new font: font-family: 'Georgia', serif;\n• Add more HTML elements: lists (<ul>, <li>), another heading (<h2>), a horizontal rule (<hr>).\n\nNow here's something powerful: right-click any element on your page in the browser and click \"Inspect\" (or press F12). This opens Developer Tools — the same professional tools that every web developer on the planet uses daily.\n\nIn the Developer Tools, you'll see two panels:\n• Elements panel (left): Shows your HTML structure. Click any element to highlight it on the page.\n• Styles panel (right): Shows the CSS rules applied to the selected element. You can edit CSS values right here and see changes instantly!\n\nChanges you make in Developer Tools are temporary — they don't save to your files. This makes it a perfect sandbox for experimenting without fear of breaking anything.",
        infoBoxes: [
          {
            variant: "tip",
            body: "Developer Tools (F12) are your best friend as a web developer. Every professional uses them constantly — to debug layout problems, test color changes, find performance issues, and understand how other websites are built. Try visiting your favorite website and pressing F12 to peek behind the curtain!",
          },
        ],
        docLinks: [
          {
            label: "What are browser developer tools?",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Tools_and_setup/What_are_browser_developer_tools",
            type: "html-concept",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          "/* Try these CSS experiments in style.css: */\n\nbody {\n  background-color: #1a1a2e;  /* dark background */\n  color: #e0e0e0;             /* light text */\n}\n\nh1 {\n  font-size: 2.5em;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n}\n\nimg {\n  border-radius: 50%;          /* perfect circle */\n  width: 150px;\n  height: 150px;\n  object-fit: cover;           /* crops to fit */\n}\n\na {\n  background-color: #6366f1;\n  color: white;\n  padding: 10px 20px;\n  border-radius: 8px;\n  text-decoration: none;\n  display: inline-block;\n}",
        demoLanguage: "css",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "codelab-checkpoint",
      type: "free-edit",
      instruction: {
        heading: "Checkpoint: Write the boilerplate from memory",
        body: "Before you wrap up this codelab, let's test what you've learned. Write a minimal but complete HTML page from memory — no peeking at the previous steps!\n\nYour page must include:\n• The <!DOCTYPE html> declaration\n• An <html> tag with the lang attribute\n• A <head> section containing <meta charset=\"UTF-8\"> and a <title>\n• A <body> section with at least one heading (<h1>) and one paragraph (<p>)\n\nThis is the same structure you'll write at the start of every HTML file you ever create. Professional developers type this from muscle memory — and now you're building that same muscle memory.",
        analogy:
          "This is like learning to tie your shoes. The first few times you need instructions, but eventually your hands just know what to do. The HTML boilerplate is the same — awkward now, automatic later.",
        infoBoxes: [
          {
            variant: "standard",
            body: "If you can write the HTML boilerplate from memory, you've internalized the foundation of every webpage. This exact structure — DOCTYPE, html, head, body — has been the skeleton of web pages since HTML5 was finalized in 2014.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode: "",
        language: "html",
      },
      validation: { type: "contains-tag", criteria: { tag: "html" } },
      hints: [
        "Start with <!DOCTYPE html> — this tells the browser you're using HTML5.",
        'Next, open the root element: <html lang="en">',
        "Inside <head>, add <meta charset=\"UTF-8\"> and <title>Your Title</title>",
        "Inside <body>, add your visible content: an <h1> heading and a <p> paragraph.",
        "Don't forget to close every tag you open: </head>, </body>, </html>",
      ],
    },
  ],
};
