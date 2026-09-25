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

/* PERU WORLD BANK */
{ file: "peru-worldbank-growth.html", category: "Peru", color: "terra", headline: "Peru Will Grow Faster Than Latin America Again. The World Bank Says That Is Not Enough.", deck: "The World Bank projects 2.7 percent growth for Peru in 2026, ahead of the regional average.", date: "Jun 10, 2026", verdict: "confirmed" },

/* NASA ROMAN */
{ file: "nasa-roman-telescope.html", category: "Science", color: "amber", headline: "NASA's New Telescope Sees 100 Times More Sky Than Hubble", deck: "The Nancy Grace Roman Space Telescope launched August 30, 2026, and could find around 100,000 new planets.", date: "Aug 31, 2026", verdict: null },

/* LGBTQ YOUTH DATA */
{ file: "lgbtq-youth-suicide-data.html", category: "LGBTQ+ Rights", color: "sage", headline: "What September's Numbers Actually Show About LGBTQ+ Youth", deck: "One in five LGBTQ+ high schoolers attempted suicide in the past year, per the CDC.", date: "Sep 7, 2026", verdict: "confirmed" },

/* SHUTDOWN FALL 2025 */
// HIDDEN until the page is uploaded — remove the // to publish:
// { file: "shutdown-fall-2025.html", category: "US Politics", color: "slate", headline: "America Just Had Its Longest Government Shutdown Ever", deck: "A 43-day standoff over healthcare subsidies furloughed roughly 750,000 federal workers and cost an estimated $11 billion.", date: "Nov 13, 2025", verdict: "confirmed" },

/* VA NJ ELECTIONS 2025 */
// HIDDEN until the page is uploaded — remove the // to publish:
// { file: "va-nj-elections-2025.html", category: "US Politics", color: "slate", headline: "Democrats Just Swept the First Elections of Trump's Second Term", deck: "Abigail Spanberger and Mikie Sherrill won Virginia and New Jersey by wide margins, an early signal for 2026.", date: "Nov 5, 2025", verdict: "confirmed" },

/* SHUTDOWN SPRING 2026 */
{ file: "shutdown-spring-2026.html", category: "US Politics", color: "slate", headline: "DHS Was Shut Down for 76 Days. Here's Why.", deck: "A funding lapse limited to Homeland Security dragged on for 76 days, the longest on record, though far narrower than last fall's shutdown.", date: "Apr 30, 2026", verdict: "confirmed" },

/* CHILES V SALAZAR */
{ file: "chiles-v-salazar-ruling.html", category: "LGBTQ+ Rights", color: "sage", headline: "Supreme Court Sides With Therapist, Undermines Conversion Therapy Bans Nationwide", deck: "An 8-1 ruling in Chiles v. Salazar found Colorado's ban regulates speech based on viewpoint.", date: "Apr 3, 2026", verdict: "confirmed" },

];
/* Keep newest-first automatically, regardless of the order
   articles were added above — no manual reordering needed. */
ARTICLES.sort((a, b) => new Date(b.date) - new Date(a.date),);
