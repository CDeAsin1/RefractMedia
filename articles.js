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
/* LGBTQ PANIC LAW */
{ file: "lgbtq-panic-defense-peru.html", category: "LGBTQ+ Rights", color: "sage", headline: "The Legal Defense That Lets Justify Crimes Under the Justification of Someone's Queerness", deck: "In 30 U.S. states, a defense attorney can still tell a jury that a victim's own LGBTQ+ identity is what triggered their killer's violence...", date: "Jul 19, 2026", verdict: null }

];

/* Keep newest-first automatically, regardless of the order
   articles were added above — no manual reordering needed. */
ARTICLES.sort((a, b) => new Date(b.date) - new Date(a.date));
