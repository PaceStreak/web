/* WebMCP: one read-only tool so an AI agent can ask which page covers a
   topic instead of crawling. Static data, no network, nothing about the
   visitor. Does nothing in browsers without WebMCP. */

(function () {
  "use strict";
  var mc = document.modelContext;
  if (!mc || typeof mc.registerTool !== "function") return;

  var PAGES = [
    { url: "/features", title: "Features", topics: "features habits routines focus timer import training workouts exercises food nutrition calories macros barcode recipes insights journal mood coach progress xp badges social export offline" },
    { url: "/streaks", title: "How streaks work", topics: "streak streaks weekly target rest days freezes repair pause simulator" },
    { url: "/social", title: "Social and privacy rules", topics: "social follow friends groups challenges leaderboards feed kudos privacy visibility" },
    { url: "/security", title: "Security", topics: "security passkeys two-factor 2fa password encryption sessions" },
    { url: "/privacy", title: "Privacy", topics: "privacy data collected providers open food facts cloudflare delete export retention" },
    { url: "/faq", title: "FAQ", topics: "faq questions ai price free wearable watch" },
    { url: "/changelog", title: "Changelog", topics: "changelog new updates release" },
    { url: "/about", title: "About", topics: "about why principles company contact" },
    { url: "/terms", title: "Terms", topics: "terms legal conditions" },
    { url: "https://blog.pacestreak.com", title: "Blog", topics: "blog engineering how built posts" },
    { url: "https://app.pacestreak.com/signup", title: "Sign up", topics: "sign up signup register account start get started login" },
  ];

  try {
    mc.registerTool({
      name: "find_page",
      description: "Find the PaceStreak page that covers a topic, such as streaks, food tracking, privacy or signing up. Returns up to three pages with their URLs.",
      inputSchema: {
        type: "object",
        properties: {
          topic: { type: "string", description: "What the visitor wants to know about, in a few words." },
        },
        required: ["topic"],
      },
      annotations: { readOnlyHint: true },
      execute: async function (args) {
        var words = String((args && args.topic) || "").toLowerCase().split(/\W+/).filter(Boolean);
        var ranked = PAGES.map(function (p) {
          var score = words.filter(function (w) { return p.topics.indexOf(w) !== -1 || p.title.toLowerCase().indexOf(w) !== -1; }).length;
          return { page: p, score: score };
        })
          .filter(function (r) { return r.score > 0; })
          .sort(function (a, b) { return b.score - a.score; })
          .slice(0, 3)
          .map(function (r) { return { title: r.page.title, url: new URL(r.page.url, location.origin).href }; });
        return JSON.stringify(ranked.length ? ranked : [{ title: "Features", url: location.origin + "/features" }]);
      },
    });
  } catch (e) {
    // An agent-facing nicety must never break the page.
  }
})();
