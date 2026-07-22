// Canned assistant answers for the shareable (offline) demo build.
// Grounded in the real channel snapshot in ./tv-packages.json.
//
// Response rules (mirrors the team's agreed style):
//   1. Verdict first — lead with the cheapest plan that covers them.
//   2. Bold plan names, one line each — scannable, not prose.
//   3. Rank best -> worst fit; frame the last plan by what's MISSING.
//   4. Differentiate, don't repeat — each line states the real difference.
//
// Rendering: "\n" splits into separate lines and **text** renders bold.

const ANSWERS = {
  sports: [
    "For sports, Extra TV is the cheapest plan that covers you.",
    "**Extra TV** — $95/mo. Cheapest with live sports: ESPN, ESPN2 and ESPNU.",
    "**Everything TV** — $150/mo. Only worth the jump for regional and league networks — MSG, NFL Network, ACC/SEC, Golf and Tennis.",
    "**Entertainment TV** — $20/mo. Missing sports entirely — no ESPN or any national sports network.",
  ].join("\n"),

  news: [
    "For news, Extra TV is the cheapest plan that covers you.",
    "**Extra TV** — $95/mo. Cheapest with national news: CNN, FOX News, CNBC, FOX Business, Bloomberg and Newsmax.",
    "**Everything TV** — $150/mo. Same national news as Extra — the extra $55 buys sports and movies, not news.",
    "**Entertainment TV** — $20/mo. Missing national news — only local News 12 and BBC.",
  ].join("\n"),

  difference: [
    "The real difference is what each tier adds on top of the last.",
    "**Entertainment TV** — $20/mo, ~47 channels. Locals and basic cable only.",
    "**Extra TV** — $95/mo, ~113 channels. Adds national sports (ESPN) and news (CNN, FOX News, CNBC).",
    "**Everything TV** — $150/mo, ~191 channels. Adds regional/league sports (MSG, NFL Network) and the Starz movie suite.",
  ].join("\n"),

  popular: [
    "Extra TV is the most popular pick — the best balance of price and channels.",
    "**Extra TV** — $95/mo, ~113 channels. The sweet spot: adds ESPN and national news to the basics.",
    "**Everything TV** — $150/mo, ~191 channels. Step up only for regional sports and the Starz movie suite.",
    "**Entertainment TV** — $20/mo, ~47 channels. Missing national sports, news and most kids/movies — locals only.",
  ].join("\n"),

  kids: [
    "For kids, Extra TV is the cheapest plan that covers the essentials.",
    "**Extra TV** — $95/mo. Cheapest with the core kids lineup: Disney, Disney Junior, Nickelodeon, Cartoon Network and PBS Kids.",
    "**Everything TV** — $150/mo. Only adds extras (Disney XD, Boomerang, Nick Jr.) — skip it unless you want those.",
    "**Entertainment TV** — $20/mo. Missing most kids TV — only Nickelodeon and Nick Jr., no Disney or Cartoon Network.",
  ].join("\n"),

  movies: [
    "For movies, Everything TV is the only plan that really covers you.",
    "**Everything TV** — $150/mo. Real movie coverage: the full Starz Encore suite plus HDNet Movies, IFC and SundanceTV.",
    "**Extra TV** — $95/mo. Thin on movies — mostly HDNet Movies and Movies! Network.",
    "**Entertainment TV** — $20/mo. Missing movie channels — just IFC and SundanceTV. (HBO, SHOWTIME and STARZ can be added to any plan.)",
  ].join("\n"),

  local: [
    "Every plan includes your local channels — so pick the cheapest that has what else you want.",
    "**Entertainment TV** — $20/mo. Cheapest and already includes all your locals plus News 12.",
    "**Extra TV** — $95/mo. Same locals, plus national sports and news.",
    "**Everything TV** — $150/mo. Same locals — only worth it for regional sports and movies.",
  ].join("\n"),
};

const FALLBACK =
  "This is a shareable demo, so live answers are limited to the suggested questions. Tap one of the chips above — like \u201CBest TV plan for sports?\u201D — to see how the assistant responds.";

// Keyword routing so light rewording of a pill still resolves.
export function answerFor(question) {
  const q = String(question || "").toLowerCase();
  if (/\bsport/.test(q)) return ANSWERS.sports;
  if (/\bnews/.test(q)) return ANSWERS.news;
  if (/differ|package|between|compare/.test(q)) return ANSWERS.difference;
  if (/popular|best plan\b|recommend/.test(q)) return ANSWERS.popular;
  if (/\bkid|children|family/.test(q)) return ANSWERS.kids;
  if (/movie|film|cinema/.test(q)) return ANSWERS.movies;
  if (/local|broadcast|abc|nbc|cbs|fox affiliate/.test(q)) return ANSWERS.local;
  return FALLBACK;
}
