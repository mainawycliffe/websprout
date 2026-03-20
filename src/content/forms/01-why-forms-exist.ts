import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "forms-why-forms-exist",
  slug: "why-forms-exist",
  title: "Why Forms Exist",
  description:
    "Discover why HTML forms are the backbone of every interactive website and how they let users communicate with the web.",
  order: 1,
  steps: [
    {
      id: "forms-are-the-backbone",
      type: "explanation",
      instruction: {
        heading: "Forms are the backbone of the interactive web",
        body: "Every time you search on Google, log into Instagram, sign up for a new account, or place an order on Amazon, you are using an HTML form. Forms are the primary way users send information to a website. Without forms, the web would be read-only — you could look at content, but you could never interact with it.\n\nThink about your daily internet usage. You type a query into a search bar and press Enter. You enter your email and password to log in. You fill out your shipping address to receive a package. You write a comment under a YouTube video. Every single one of those actions happens through an HTML <code>&lt;form&gt;</code> element behind the scenes.\n\nForms have existed since the earliest days of the web — they were part of HTML 2.0 in 1995. The reason is simple: the web was always meant to be a two-way communication channel, not just a digital magazine. Tim Berners-Lee designed HTML with forms because he wanted researchers to be able to submit data, not just read documents. Today, forms power everything from simple contact pages to complex multi-step checkout flows.",
        analogy: "Imagine visiting a doctor's office. The receptionist hands you a paper questionnaire: your name, date of birth, insurance info, symptoms. You fill it out with a pen and hand it back. The doctor's office processes the information you provided. An HTML form works exactly the same way — the website presents fields for you to fill in, you type your answers, and when you click Submit, your data is sent to the server for processing. The form is the questionnaire; the browser is the pen; the Submit button is handing the clipboard back to the receptionist.",
        docLinks: [
          {
            label: "MDN: Web forms",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms",
            type: "html-concept",
          },
          {
            label: "MDN: Your first form",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Your_first_form",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "HTML forms are defined in the HTML Living Standard maintained by WHATWG. The <code>&lt;form&gt;</code> element and its associated input elements are among the most thoroughly specified parts of HTML because they handle user data — getting them right is critical for usability, accessibility, and security.",
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
      id: "categories-of-forms",
      type: "explanation",
      instruction: {
        heading: "Categories of forms you use every day",
        body: "Forms come in many shapes and sizes, but they generally fall into a few common categories. Recognizing these patterns will help you understand what to build and how to structure your HTML.\n\n<strong>Search forms:</strong> The simplest form on the web — a single text field and a submit button. Google's homepage is essentially one form. When you type a query and press Enter, the form sends your search term to Google's servers, which return matching results.\n\n<strong>Login forms:</strong> Usually two fields (email/username and password) plus a submit button. Every website that has user accounts — Gmail, Netflix, Twitter, GitHub — uses a login form. These forms send your credentials to the server, which checks if they match a known account.\n\n<strong>Registration/signup forms:</strong> More fields than a login form — name, email, password, maybe date of birth or phone number. Instagram's signup form, for example, asks for your name, email, username, and password. These forms create a new account on the server.\n\n<strong>Payment/checkout forms:</strong> The most complex and high-stakes forms. Amazon's checkout asks for shipping address, payment method, and billing details. These forms must be extremely clear and error-free because mistakes cost real money.\n\n<strong>Feedback/contact forms:</strong> A way for visitors to send messages — name, email, subject, message body. Nearly every business website has a \"Contact Us\" form. These typically send an email or create a support ticket.\n\n<strong>Survey/poll forms:</strong> Multiple questions with various answer types — multiple choice, rating scales, open-ended text. Google Forms is an entire product built around this category.",
        docLinks: [
          {
            label: "MDN: How to structure a web form",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/How_to_structure_a_web_form",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "When building any form, start by asking: \"What information do I need from the user, and what is the minimum number of fields required?\" Every extra field increases the chance that a user will abandon the form. Research shows that reducing form fields from 11 to 4 can increase conversion rates by 120%.",
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
      id: "what-happens-on-submit",
      type: "explanation",
      instruction: {
        heading: "What happens when you click Submit",
        body: "When you fill out a form and click the Submit button, a specific sequence of events occurs. Understanding this flow — even at a high level — will make everything else about forms click into place.\n\n<strong>Step 1: The browser collects the data.</strong> The browser looks at every form field inside the <code>&lt;form&gt;</code> element. For each field that has a <code>name</code> attribute, it pairs the name with the value the user entered. For example, if you have an input named \"email\" and the user typed \"alex@example.com\", the browser creates the pair <code>email=alex@example.com</code>.\n\n<strong>Step 2: The browser packages the data.</strong> All those name-value pairs are combined into a single package. The format depends on the form's settings — either appended to the URL (like <code>?email=alex@example.com&password=secret</code>) or placed in the body of an HTTP request.\n\n<strong>Step 3: The browser sends the data.</strong> The packaged data is sent to the address specified in the form's <code>action</code> attribute. This is typically a URL on the web server. The browser makes an HTTP request — either GET or POST — to that address.\n\n<strong>Step 4: The server processes the data.</strong> The server receives the data, does something with it (saves it to a database, checks credentials, runs a search), and sends back a response — usually a new web page.\n\nThis entire process is automatic. You don't need JavaScript to make it work — it is built into HTML itself. Forms have been submitting data this way since 1995.",
        analogy: "Think of submitting a form like sealing a letter and mailing it. You write your message on paper (filling out the fields), put the paper in an envelope (the browser packaging the data), write the recipient's address on the envelope (the <code>action</code> attribute), and drop it in the mailbox (clicking Submit). The postal service delivers it to the recipient (the server), who reads it and may send a reply back to you (the server's response). You don't need to understand how the postal system works internally — you just need to fill out the letter, address it correctly, and mail it.",
        docLinks: [
          {
            label: "MDN: Sending form data",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Sending_and_retrieving_form_data",
            type: "html-concept",
          },
        ],
        infoBoxes: [
          {
            variant: "standard",
            title: "Web Standard",
            body: "The form submission process follows the HTTP protocol — the same protocol that powers every web page load. When you visit a URL, your browser sends a GET request. When you submit a form, your browser sends either a GET or POST request depending on the form's <code>method</code> attribute. Forms and page navigation use the exact same underlying mechanism.",
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
      id: "explore-basic-form",
      type: "free-edit",
      instruction: {
        heading: "Explore a basic working form",
        body: "Below is a simple HTML form with a text input and a submit button. Look at the structure: the <code>&lt;form&gt;</code> element wraps everything, the <code>&lt;label&gt;</code> tells the user what to type, the <code>&lt;input&gt;</code> is where they type it, and the <code>&lt;button&gt;</code> lets them submit.\n\nTry modifying the form — change the label text, add another input field, or change the button text. Watch the preview update as you type. This is your first hands-on experience with an HTML form!",
        infoBoxes: [
          {
            variant: "tip",
            title: "Tip",
            body: "Notice that the <code>&lt;input&gt;</code> element is self-closing — it has no closing tag. This is because inputs don't contain other content; they are interactive fields that the user fills in. Most form fields work this way, with the notable exception of <code>&lt;textarea&gt;</code> and <code>&lt;select&gt;</code>.",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My First Form</title>\n</head>\n<body>\n  <h1>Contact Us</h1>\n  <form action="/submit" method="post">\n    <label for="name">Your Name:</label><br>\n    <input type="text" id="name" name="name" placeholder="Enter your name"><br><br>\n\n    <label for="message">Message:</label><br>\n    <input type="text" id="message" name="message" placeholder="Type your message"><br><br>\n\n    <button type="submit">Send</button>\n  </form>\n</body>\n</html>',
        language: "html",
      },
      validation: { type: "contains-tag", criteria: { tag: "form" } },
      hints: [
        "Make sure you keep the <form> element in your code.",
        "Try adding another input field between the existing ones — give it a label, an id, and a name attribute.",
        "You can change the button text by editing the content between <button> and </button>.",
      ],
    },
  ],
};
