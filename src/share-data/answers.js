// Canned assistant answers for the shareable (offline) demo build.
// Grounded in the real channel snapshot in ./tv-packages.json.
// The live free-text AI is not available in the shared build, so the
// suggestion pills map to these responses and anything else gets a
// friendly fallback that points people back to the chips.

const ANSWERS = {
  sports:
    "For sports, Everything TV is the standout. It carries ESPN, ESPN2, ESPNU, ESPNEWS and ESPN Deportes, plus the ACC Network, SEC Network, NFL Network, MSG Networks, CBS Sports Network, The Golf Channel and Tennis Channel. Extra TV covers the basics (ESPN, ESPN2, ESPNU), while Entertainment TV has no national sports networks.",
  news:
    "For news, both Extra TV and Everything TV carry the major national outlets — CNN, FOX News Channel, CNBC, FOX Business Network, Bloomberg TV and Newsmax — alongside local News 12. Entertainment TV only includes local News 12 and BBC. If news is your priority, Extra TV is the best value.",
  difference:
    "Here's the quick breakdown:\n\nEntertainment TV — $20/mo, ~47 channels. Your local networks and basic cable.\n\nExtra TV — $95/mo, ~113 channels. Adds ESPN and national news (CNN, FOX News, CNBC) plus more kids channels.\n\nEverything TV — $150/mo, ~191 channels. The full lineup: complete sports (ACC, SEC, NFL, MSG, Golf, Tennis) and the Starz Encore movie suite.",
  popular:
    "Extra TV is the most popular pick. At $95/mo for ~113 channels it hits the sweet spot — adding ESPN and the major national news networks to the local basics, without stepping up to the full $150 lineup.",
  kids:
    "For kids, Extra TV covers the essentials — Disney Channel, Disney Junior, Nickelodeon, Cartoon Network and PBS Kids. Everything TV adds even more with Disney XD, Nick Jr. and Boomerang. Entertainment TV only includes Nickelodeon and Nick Jr.",
  movies:
    "For movies, Everything TV is the best choice — it includes the full Starz Encore suite (Action, Black, Classic, Family, Suspense, Westerns and more) plus HDNet Movies, IFC and SundanceTV. You can also add premium channels like HBO, SHOWTIME and STARZ to any plan.",
  local:
    "Local channels are included in every plan. Even Entertainment TV at $20/mo carries your local broadcast networks and News 12. Stepping up to Extra TV or Everything TV keeps all of your locals and layers national cable networks on top.",
};

const FALLBACK =
  "This is a shareable demo, so live answers are limited to the suggested questions. Tap one of the chips above — like \u201CBest TV plan for sports?\u201D — to see how the assistant responds.";

// Keyword routing so light rewording of a pill still resolves.
export function answerFor(question) {
  const q = String(question || "").toLowerCase();
  if (/\bsport/.test(q)) return ANSWERS.sports;
  if (/\bnews\b|\bnews/.test(q)) return ANSWERS.news;
  if (/differ|package|between|compare/.test(q)) return ANSWERS.difference;
  if (/popular|best plan\b|recommend/.test(q)) return ANSWERS.popular;
  if (/\bkid|children|family/.test(q)) return ANSWERS.kids;
  if (/movie|film|cinema/.test(q)) return ANSWERS.movies;
  if (/local|broadcast|abc|nbc|cbs|fox affiliate/.test(q)) return ANSWERS.local;
  return FALLBACK;
}
