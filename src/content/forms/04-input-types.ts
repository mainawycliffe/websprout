import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "forms-input-types",
  slug: "input-types",
  title: "Input Types",
  description:
    "Discover the many faces of the <input> element — from email and telephone to date pickers, color choosers, and file uploads.",
  order: 4,
  steps: [
    {
      id: "one-element-many-faces",
      type: "explanation",
      instruction: {
        heading: "One element, many faces",
        body: "The <code>&lt;input&gt;</code> element is one of the most remarkable elements in HTML. By changing a single attribute — <code>type</code> — you can transform it from a plain text field into a date picker, a color chooser, a file uploader, a password field, or a numeric slider. The same element does all of these things.\n\nHTML5 (introduced around 2010-2014) dramatically expanded the number of input types available. Before HTML5, developers had to use JavaScript libraries to create date pickers, number spinners, and email validation. Now, the browser does all of this natively with zero JavaScript.\n\nWhy does this matter? Because native browser inputs are:\n<ul><li><strong>Accessible by default</strong> — screen readers understand them, keyboard navigation works automatically</li><li><strong>Mobile-optimized</strong> — setting <code>type=\"email\"</code> shows an email keyboard on phones, <code>type=\"tel\"</code> shows a phone dial pad</li><li><strong>Validated automatically</strong> — <code>type=\"email\"</code> checks for an @ sign, <code>type=\"url\"</code> checks for a valid URL format</li><li><strong>Consistent</strong> — users already know how their phone's native date picker works</li></ul>\n\nLet's explore the most important input types, grouped by what they do.",
        analogy: "Think of the <code>&lt;input&gt;</code> element as a Swiss Army knife — or better yet, a universal toolbox. The <code>type</code> attribute is like picking which tool to pull out. You don't need a separate element for dates, another for emails, another for numbers. It's one element that shapeshifts into whatever you need. Just like a toolbox has a screwdriver, hammer, wrench, and pliers all in one kit, the <code>&lt;input&gt;</code> element has text, email, date, number, color, and file all in one element.",
        docLinks: [
          {
            label: "MDN: <input> types",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "If a browser doesn't recognize an input type, it falls back to <code>type=\"text\"</code>. This means you can safely use modern input types — older browsers will simply show a text field instead. This graceful degradation is built into the HTML specification by design.",
          },
        ],
      },
      config: {
        type: "explanation",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "communication-types",
      type: "explanation",
      instruction: {
        heading: "Communication types: email, tel, url",
        body: "These input types are designed for contact information — the kind of data you enter on almost every signup or contact form.\n\n<strong><code>type=\"email\"</code></strong> creates a text field optimized for email addresses. On mobile phones, the keyboard automatically includes the @ symbol and the .com shortcut. The browser also performs basic validation — it checks that the value contains an @ sign and a domain. Gmail, Outlook, and every email signup form use this type.\n\n<strong><code>type=\"tel\"</code></strong> creates a text field for phone numbers. On mobile devices, this brings up the numeric phone dial pad instead of the full keyboard, making it much easier to type a phone number. Note that the browser does not validate the phone number format (because phone number formats vary wildly across countries) — it just optimizes the keyboard.\n\n<strong><code>type=\"url\"</code></strong> creates a text field for web addresses. On mobile, the keyboard may include shortcuts for <code>www.</code>, <code>.com</code>, and the <code>/</code> character. The browser validates that the value looks like a URL (starts with a protocol like <code>http://</code> or <code>https://</code>).\n\nThe key insight here is that these types don't just change what the field looks like on desktop — they fundamentally change the <em>keyboard</em> that appears on mobile devices. Since more than half of web traffic is mobile, choosing the right input type dramatically improves the user experience.",
        docLinks: [
          {
            label: "MDN: <input type=\"email\">",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email",
            type: "html-element",
          },
          {
            label: "MDN: <input type=\"tel\">",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/tel",
            type: "html-element",
          },
          {
            label: "MDN: <input type=\"url\">",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/url",
            type: "html-element",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<form action="/contact" method="post">\n  <label for="email">Email:</label>\n  <input type="email" id="email" name="email" placeholder="you@example.com">\n\n  <label for="phone">Phone:</label>\n  <input type="tel" id="phone" name="phone" placeholder="555-123-4567">\n\n  <label for="website">Website:</label>\n  <input type="url" id="website" name="website" placeholder="https://yoursite.com">\n\n  <button type="submit">Submit</button>\n</form>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "numeric-types",
      type: "explanation",
      instruction: {
        heading: "Numeric types: number and range",
        body: "When you need users to enter a numeric value, HTML gives you two specialized input types.\n\n<strong><code>type=\"number\"</code></strong> creates a text field with up/down spinner arrows. Users can type a number directly or click the arrows to increment/decrement. You can control the valid range with <code>min</code>, <code>max</code>, and <code>step</code> attributes:\n<code>&lt;input type=\"number\" min=\"1\" max=\"100\" step=\"1\"&gt;</code>\n\nThis is perfect for quantities (shopping cart), ages, ratings, or any bounded numeric value. The browser prevents the user from entering values outside the specified range and only allows valid numbers.\n\n<strong><code>type=\"range\"</code></strong> creates a horizontal slider. Users drag the slider thumb to select a value within a range. Like <code>number</code>, it supports <code>min</code>, <code>max</code>, and <code>step</code>:\n<code>&lt;input type=\"range\" min=\"0\" max=\"100\" step=\"5\"&gt;</code>\n\nRange sliders are great for settings where the exact number matters less than the approximate position — volume controls, brightness adjusters, price filters on shopping sites. Zillow and Amazon use range sliders for price filtering.\n\nThe <code>step</code> attribute controls the increment. <code>step=\"1\"</code> allows whole numbers only. <code>step=\"0.1\"</code> allows one decimal place. <code>step=\"5\"</code> jumps by fives.",
        docLinks: [
          {
            label: "MDN: <input type=\"number\">",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number",
            type: "html-element",
          },
          {
            label: "MDN: <input type=\"range\">",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "The <code>&lt;input type=\"range\"&gt;</code> slider does not show its current value by default. Users have no idea what number they've selected unless you display it separately. Always pair a range input with an <code>&lt;output&gt;</code> element or a visible number to show the current value.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<label for="qty">Quantity (1-10):</label>\n<input type="number" id="qty" name="quantity" min="1" max="10" step="1" value="1">\n\n<label for="vol">Volume:</label>\n<input type="range" id="vol" name="volume" min="0" max="100" step="5" value="50">',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "date-time-types",
      type: "explanation",
      instruction: {
        heading: "Date and time types: date, time, datetime-local",
        body: "Before HTML5, creating a date picker required a JavaScript library (like jQuery UI's datepicker). Now, browsers have built-in date and time pickers that are accessible, mobile-friendly, and require zero JavaScript.\n\n<strong><code>type=\"date\"</code></strong> shows a calendar picker. The user can click to open a calendar widget and select a date. The value is stored in ISO format: <code>YYYY-MM-DD</code> (e.g., <code>2025-03-15</code>). You can constrain the selectable range with <code>min</code> and <code>max</code>:\n<code>&lt;input type=\"date\" min=\"2024-01-01\" max=\"2025-12-31\"&gt;</code>\n\n<strong><code>type=\"time\"</code></strong> shows a time picker. Users select hours and minutes (and optionally seconds). The value is stored as <code>HH:MM</code> in 24-hour format (e.g., <code>14:30</code>). Airlines and appointment booking sites use this.\n\n<strong><code>type=\"datetime-local\"</code></strong> combines both date and time into one picker. The value includes both: <code>2025-03-15T14:30</code>. This is perfect for event scheduling, appointment booking, and anything that needs both a date and a time.\n\nThere's also <code>type=\"month\"</code> (picks a month and year) and <code>type=\"week\"</code> (picks a week number). These are less common but useful for things like credit card expiration dates (<code>month</code>) or weekly planners (<code>week</code>).\n\nThe native date pickers vary in appearance across browsers and operating systems, but they all function the same way and return data in the same standardized format.",
        docLinks: [
          {
            label: "MDN: <input type=\"date\">",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date",
            type: "html-element",
          },
          {
            label: "MDN: <input type=\"time\">",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time",
            type: "html-element",
          },
          {
            label: "MDN: <input type=\"datetime-local\">",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local",
            type: "html-element",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<label for="birthday">Birthday:</label>\n<input type="date" id="birthday" name="birthday">\n\n<label for="meeting">Meeting time:</label>\n<input type="time" id="meeting" name="meeting_time" min="09:00" max="17:00">\n\n<label for="event">Event date & time:</label>\n<input type="datetime-local" id="event" name="event_datetime">',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "visual-special-types",
      type: "explanation",
      instruction: {
        heading: "Visual and special types: color, file, hidden",
        body: "These input types serve specialized purposes that go beyond text entry.\n\n<strong><code>type=\"color\"</code></strong> opens a color picker widget. The user clicks a swatch, and a full color picker appears where they can choose any color. The value is stored as a hex code like <code>#ff6600</code>. This is used in theme customizers, design tools, and any setting where users pick a color. Canva and many website builders use color pickers.\n\n<strong><code>type=\"file\"</code></strong> creates a file upload button. When clicked, it opens the operating system's file browser so the user can select a file from their computer. You can restrict which file types are allowed using the <code>accept</code> attribute:\n<code>&lt;input type=\"file\" accept=\"image/*\"&gt;</code> allows only image files.\n<code>&lt;input type=\"file\" accept=\".pdf,.doc\"&gt;</code> allows only PDFs and Word docs.\nAdd the <code>multiple</code> attribute to allow selecting more than one file. Instagram, Gmail attachments, and job application forms all use file inputs.\n\n<strong><code>type=\"hidden\"</code></strong> creates an input that is completely invisible on the page. The user can't see it or interact with it, but its value is still submitted with the form. This is used to include data that the server needs but the user doesn't need to see — like a CSRF token (a security measure), a page ID, or a timestamp. You'll see hidden inputs in almost every form if you inspect the HTML of popular websites.\n\n<strong><code>type=\"password\"</code></strong> works like a text field but masks the characters with dots or asterisks so that someone looking over the user's shoulder can't read what's being typed. Every login form uses this.",
        docLinks: [
          {
            label: "MDN: <input type=\"color\">",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color",
            type: "html-element",
          },
          {
            label: "MDN: <input type=\"file\">",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file",
            type: "html-element",
          },
          {
            label: "MDN: <input type=\"hidden\">",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/hidden",
            type: "html-element",
          },
          {
            label: "MDN: <input type=\"password\">",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password",
            type: "html-element",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "File uploads require the form to use <code>method=\"post\"</code> and <code>enctype=\"multipart/form-data\"</code>. Without the correct enctype, the server receives the file name instead of the actual file contents. This is one of the most common file upload bugs.",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<label for="fav-color">Favorite color:</label>\n<input type="color" id="fav-color" name="color" value="#3b82f6">\n\n<label for="avatar">Upload photo:</label>\n<input type="file" id="avatar" name="avatar" accept="image/*">\n\n<label for="pw">Password:</label>\n<input type="password" id="pw" name="password">\n\n<input type="hidden" name="form_id" value="profile-edit">',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "build-profile-form",
      type: "free-edit",
      instruction: {
        heading: "Build a user profile form with many input types",
        body: "Put your knowledge to work! Build a user profile form that uses at least 5 different input types. Your form could include fields like:\n\n<ul><li>Name (<code>type=\"text\"</code>)</li><li>Email (<code>type=\"email\"</code>)</li><li>Birthday (<code>type=\"date\"</code>)</li><li>Favorite color (<code>type=\"color\"</code>)</li><li>Profile photo (<code>type=\"file\"</code>)</li><li>Phone number (<code>type=\"tel\"</code>)</li><li>Personal website (<code>type=\"url\"</code>)</li><li>Age (<code>type=\"number\"</code>)</li></ul>\n\nMake sure every input has a <code>&lt;label&gt;</code> and a <code>name</code> attribute!",
      },
      config: {
        type: "free-edit",
        starterCode:
          '<form action="/profile" method="post">\n  <h2>Edit Your Profile</h2>\n\n  <!-- Add at least 5 different input types below -->\n\n  <button type="submit">Save Profile</button>\n</form>',
        language: "html",
      },
      validation: { type: "contains-tag", criteria: { tag: "input" } },
      hints: [
        "Use type=\"text\" for the name, type=\"email\" for email, type=\"date\" for birthday.",
        "Add type=\"color\" for a favorite color picker and type=\"file\" for a profile photo.",
        "Don't forget <label> elements connected with for/id for each input.",
        "Every input needs a name attribute so the data gets submitted.",
      ],
    },
  ],
};
