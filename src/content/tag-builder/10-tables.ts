import type { Lesson } from "@/types/lesson";

export const lesson: Lesson = {
  id: "tag-builder-tables",
  slug: "tables",
  title: "HTML Tables",
  description:
    "Organize data into rows and columns — like a spreadsheet built right into your webpage.",
  order: 10,
  steps: [
    {
      id: "tables-intro",
      type: "explanation",
      instruction: {
        heading: "Tables: rows and columns for data",
        body: "Tables were created to solve a specific problem: displaying data that has a natural grid structure — like a class schedule, sports scores, or a pricing comparison. Before tables, there was no way to align data in rows and columns on the web.\n\nEvery spreadsheet you have ever used (Google Sheets, Excel) is essentially a table. On the web, sites like ESPN use tables for standings, Amazon uses them for product comparisons, and Wikipedia is full of data tables.\n\nA table is built from the outside in: <table> is the container, <tr> (table row) creates each horizontal row, and <td> (table data) creates each cell within a row. For header cells, use <th> instead of <td> — it bolds the text and tells screen readers \"this cell labels the others.\"",
        analogy:
          "Think of a table like a bookshelf with labeled shelves. The <table> is the entire bookshelf. Each <tr> is a shelf (a row). Each <td> is a book sitting on that shelf (a cell). And <th> cells are the labels stuck on the shelf edge telling you what category of books goes there.",
        infoBoxes: [
          {
            variant: "standard",
            title: "Tables are for data, not layouts",
            body: "Tables should only be used for tabular data — information that naturally belongs in a grid. In the early web (1990s–2000s), developers misused tables to create page layouts. This is now considered a serious anti-pattern because it breaks screen readers and makes responsive design nearly impossible. Use CSS Grid or Flexbox for layouts instead.",
          },
        ],
        docLinks: [
          {
            label: "<table>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table",
            type: "html-element",
          },
          {
            label: "<tr> table row",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr",
            type: "html-element",
          },
          {
            label: "<td> table data",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td",
            type: "html-element",
          },
          {
            label: "<th> table header",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th",
            type: "html-element",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<table>\n  <tr>\n    <th>Subject</th>\n    <th>Grade</th>\n  </tr>\n  <tr>\n    <td>Math</td>\n    <td>A</td>\n  </tr>\n  <tr>\n    <td>Science</td>\n    <td>B+</td>\n  </tr>\n</table>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "tables-sections",
      type: "explanation",
      instruction: {
        heading: "Sections and captions",
        body: "Just like an HTML page has a <head> and <body>, a table can be split into sections. <thead> wraps the header row(s) — the labels at the top. <tbody> wraps the data rows. And <caption> gives the whole table a visible title, displayed above it by default.\n\nWhy bother? Two reasons. First, screen readers announce the caption and header cells so visually impaired users understand the table's structure. Second, browsers can independently scroll <tbody> while keeping <thead> fixed — useful for long data tables like stock tickers or leaderboards.",
        analogy:
          "If a table is a report card, <caption> is the title ('Fall Semester Grades'), <thead> holds the column labels ('Subject', 'Grade', 'Teacher'), and <tbody> holds all the actual grade rows. Organizing it this way helps anyone skimming the report find what they need quickly.",
        infoBoxes: [
          {
            variant: "standard",
            title: "Caption accessibility",
            body: "The <caption> element must be the first child of <table>. It serves the same role as a figure caption — it identifies the table for all users. WCAG accessibility guidelines recommend every data table include a caption or aria-label.",
          },
        ],
        docLinks: [
          {
            label: "<thead>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead",
            type: "html-element",
          },
          {
            label: "<tbody>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody",
            type: "html-element",
          },
          {
            label: "<caption>",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption",
            type: "html-element",
          },
        ],
      },
      config: {
        type: "explanation",
        demoCode:
          '<table>\n  <caption>Class Schedule</caption>\n  <thead>\n    <tr>\n      <th>Time</th>\n      <th>Monday</th>\n      <th>Tuesday</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>9:00 AM</td>\n      <td>Math</td>\n      <td>English</td>\n    </tr>\n    <tr>\n      <td>10:00 AM</td>\n      <td>Science</td>\n      <td>History</td>\n    </tr>\n  </tbody>\n</table>',
        demoLanguage: "html",
      },
      validation: { type: "none", criteria: {} },
      hints: [],
    },
    {
      id: "tables-gap-basic",
      type: "gap-fill",
      instruction: {
        heading: "Complete the table",
        body: "Fill in the blanks to finish this grade table. Pay attention to which tag creates a header cell vs. a data cell — the header uses <th> to tell browsers and screen readers \"this labels the column.\"",
        infoBoxes: [
          {
            variant: "tip",
            title: "Header cells matter",
            body: "A common mistake is using <td> for header cells. While it looks similar visually, <th> carries semantic meaning — screen readers announce it differently, and browsers bold it by default. Always use <th> for cells that label rows or columns.",
          },
        ],
        docLinks: [],
      },
      config: {
        type: "gap-fill",
        template:
          '<table>\n  <tr>\n    <{{header_tag}}>Name</{{header_tag}}>\n    <th>Score</th>\n  </tr>\n  <{{row_tag}}>\n    <td>Alice</td>\n    <{{data_tag}}>95</{{data_tag}}>\n  </{{row_tag}}>\n</table>',
        gaps: [
          {
            id: "header_tag",
            placeholder: "header cell tag",
            acceptedAnswers: ["th"],
            caseSensitive: true,
          },
          {
            id: "row_tag",
            placeholder: "row tag",
            acceptedAnswers: ["tr"],
            caseSensitive: true,
          },
          {
            id: "data_tag",
            placeholder: "data cell tag",
            acceptedAnswers: ["td"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "Header cells use the <th> tag — it stands for 'table header'.",
        "Each row is wrapped in a <tr> tag — 'table row'.",
        "Regular data cells use <td> — 'table data'.",
      ],
    },
    {
      id: "tables-gap-sections",
      type: "gap-fill",
      instruction: {
        heading: "Add a caption and header section",
        body: "Fill in the missing tags to give this table a title and properly mark its header row. The caption describes the table to all users, and <thead> groups the header row so the browser treats it specially.",
        docLinks: [],
      },
      config: {
        type: "gap-fill",
        template:
          '<table>\n  <{{caption_tag}}>Top Scores</{{caption_tag}}>\n  <{{thead_tag}}>\n    <tr>\n      <th>Player</th>\n      <th>Points</th>\n    </tr>\n  </{{thead_tag}}>\n  <tbody>\n    <tr>\n      <td>Kai</td>\n      <td>120</td>\n    </tr>\n  </tbody>\n</table>',
        gaps: [
          {
            id: "caption_tag",
            placeholder: "table title tag",
            acceptedAnswers: ["caption"],
            caseSensitive: true,
          },
          {
            id: "thead_tag",
            placeholder: "header section tag",
            acceptedAnswers: ["thead"],
            caseSensitive: true,
          },
        ],
      },
      validation: { type: "exact-match", criteria: {} },
      hints: [
        "The tag that gives a table a visible title is <caption>.",
        "The tag that wraps header rows is <thead> — think 'table head'.",
      ],
    },
    {
      id: "tables-free-edit",
      type: "free-edit",
      instruction: {
        heading: "Create a data table",
        body: "Build a table from scratch that displays any data you like — a school schedule, game high scores, a list of your favorite movies with ratings, or a comparison of phone specs. Your table must include: a <caption>, at least 2 columns using <th> headers, and at least 3 data rows. Use <thead> and <tbody> to organize it properly.\n\nThis is the same structure Wikipedia uses for nearly every data table on the site.",
        infoBoxes: [
          {
            variant: "tip",
            title: "Keep rows consistent",
            body: "Make sure every row has the same number of cells. If one row has 3 <td> elements and another has 2, the table will look broken — cells won't align to their columns.",
          },
          {
            variant: "standard",
            title: "The scope attribute",
            body: 'For large or complex tables, add the scope attribute to <th> elements: scope="col" for column headers, scope="row" for row headers. This helps screen readers navigate the table correctly.',
          },
        ],
        docLinks: [
          {
            label: "Table accessibility",
            url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Table_accessibility",
            type: "html-concept",
          },
        ],
      },
      config: {
        type: "free-edit",
        starterCode:
          "<table>\n  <caption><!-- Your table title --></caption>\n  <thead>\n    <tr>\n      <th></th>\n      <th></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td></td>\n      <td></td>\n    </tr>\n  </tbody>\n</table>",
        language: "html",
      },
      validation: { type: "contains-tag", criteria: { tag: "table" } },
      hints: [
        "Start by filling in the <caption> with your table's title.",
        "Put column names inside the <th> tags — like 'Movie' and 'Rating'.",
        "Add more rows by copying a <tr> block and changing the cell contents.",
        "Add a third column by adding another <th> to the header and another <td> to each data row.",
      ],
    },
  ],
};
