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
{ file: "lgbtq-panic-defense-peru.html", category: "LGBTQ+ Rights", color: "sage", headline: "The Legal Defense That Lets Justify Crimes Under the Justification of Someone's Queerness", deck: "In 30 U.S. states, a defense attorney can still tell a jury that a victim's own LGBTQ+ identity is what triggered their killer's violence...", date: "Jul 19, 2026", verdict: null },

/* AI BUBBLE */
{ file: "ai-bubble-economy.html", category: "Science", color: "amber", headline: "Ghost Dollars: Inside the Trillion-Dollar AI Bubble", deck: "OpenAI is spending $1.5 trillion while making $20 billion. Nvidia has quietly stopped being a gamer's company. And the money moving through this boom may not be real at all.", date: "Jul 26, 2026", verdict: null },

/*Terremoto */
{ file: "peru-earthquake-preparedness.html", category: "Peru", color: "terra", headline: "Peru's Latest Earthquake Puts Disaster Preparedness Back in the Spotlight", deck: "A 7.2-magnitude earthquake shook the southern Andes on August 20. With El Nino conditions also building, the real question is whether Peru is ready for the next one.", date: "Aug 24, 2026", verdict: "misleading" },

/*Lo de castro */
{ file: "variable-gravitational-constant.html", category: "Science", color: "amber", headline: "Is the Gravitational Constant Actually Constant?", deck: "A small group of theoretical physicists argue that G may weaken as the universe ages, tied to dark energy and cosmic expansion.", date: "Sep 1, 2026", verdict: null },

];
/* Keep newest-first automatically, regardless of the order
   articles were added above — no manual reordering needed. */
ARTICLES.sort((a, b) => new Date(b.date) - new Date(a.date),);
