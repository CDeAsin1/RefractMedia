/* ============================================================
   REFRACT — ARTICLES DATABASE
   
   To publish a new article:
   1. Add a new object to the top of the ARTICLES array (newest first)
   2. Upload this file + your new article HTML to GitHub
   That's it. Every page updates automatically.

   COLOR OPTIONS for "color":
     "sage"  → LGBTQ+ Rights
     "terra" → Peru & Latin America
     "slate" → US Politics
     "amber" → Science / Fact-Check

   VERDICT OPTIONS (fact-check only, otherwise set to null):
     "confirmed" | "false" | "misleading" | null
============================================================ */

const ARTICLES = [

  /* ➕ ADD NEW ARTICLES HERE — newest at the top */

  /* EXAMPLE — delete this when you publish your first real article:
  {
    file:     "your-article-slug.html",
    category: "LGBTQ+ Rights",
    color:    "sage",
    headline: "Your headline here",
    deck:     "One or two sentence summary of the article.",
    date:     "Mar 20, 2026",
    verdict:  null,
  },
  */

];

/* Keep newest-first automatically, regardless of the order
   articles were added above — no manual reordering needed. */
ARTICLES.sort((a, b) => new Date(b.date) - new Date(a.date));
