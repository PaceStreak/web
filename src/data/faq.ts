// One source of truth for the FAQ.
//
// The landing page shows a subset and /faq shows all of them, so an answer
// cannot drift between the two — and the FAQPage structured data on /faq is
// generated from the same array rather than hand-maintained beside it.
export interface FaqItem {
  q: string;
  a: string;
  /** Shown on the landing page as well as /faq. */
  featured?: boolean;
}

export const faqs: FaqItem[] = [
  {
    q: "I deleted something by mistake. Can I get it back?",
    a: "Yes. Every delete offers Undo straight away, and everything you delete waits in the trash (Settings, then Data) for 30 days. Restoring brings it back exactly as it was, history included.",
  },
  {
    q: "Are the insights and the coach AI?",
    a: "No. Both are worked out on our server with fixed rules and plain statistics from what you logged. Nothing is sent to an AI company, nothing is invented, and a pattern only shows when there are enough days on both sides for it not to be chance.",
    featured: true,
  },
  {
    q: "Can I track food? Who sees it?",
    a: "Yes: meals, calories and macros against optional targets, saved foods, recipes and barcode lookup. It's private like your weight: never in a feed, a leaderboard, XP or a badge. Scanning sends the barcode number to Open Food Facts and nothing about you.",
  },
  {
    q: "Can I bring my history from another habit app?",
    a: "Yes. Import Loop Habit Tracker's export, or any CSV with a date column and habit names. You see a preview first, habits with the same name merge, and days you've already logged here are never overwritten.",
  },
  {
    q: "Is it only for fitness?",
    a: "No. Training is one part; habits are the rest. Reading, a language, an instrument, water, sleep, meditation, calling home, money, or something you're giving up. Each habit keeps its own weekly streak, and an optional whole-life streak counts any of them.",
    featured: true,
  },
  {
    q: "Can I use it to break a habit? Who can see that?",
    a: "Yes. Every day is clean unless you log a slip, and you choose how many clean days keep the week, so one slip doesn't cost it. Nobody else can ever see your habits: not followers, not groups, not leaderboards. Badges never name a habit.",
  },
  {
    q: "Is a streak just a guilt machine?",
    a: "It is, if it's built badly. That's why the streak counts against a target you set, rest days count as kept, and you can repair a missed day once a month. The goal is showing up over a year, not a perfect record you abandon in week three.",
    featured: true,
  },
  {
    q: "Do I have to log sets, reps and weight?",
    a: "No. A session or a habit counts with one tap. Detail is there when you want it — for PRs and volume trends — but it is never required to keep the chain.",
    featured: true,
  },
  {
    q: "Do I need a watch or a wearable?",
    a: "No. PaceStreak is manual by design — you tell it you trained, which takes a tap. Anything that depends on a device you might forget, or a battery that might be flat, is one more reason to break the chain, and the point is not to hand you one.",
    featured: true,
  },
  {
    q: "When can I use it?",
    a: "Now. Create an account at app.pacestreak.com and start your first week today.",
    featured: true,
  },
  {
    q: "What counts as breaking the streak?",
    a: "Falling short of the weekly target you set. Not a missed calendar day — a target of four sessions a week means three rest days cost you nothing at all.",
  },
  {
    q: "What happens if I miss a week?",
    a: "Every four kept weeks earns a freeze, and you can hold two. A missed week spends one automatically if you have a streak to protect. If none is left, you can repair one missed week per month by hand. A frozen or repaired week keeps the streak but earns no XP.",
  },
  {
    q: "What if I'm injured or ill?",
    a: "Pause the streak. Any week the pause covers for four days or more can't break it, and reminders stop until you tap \"I'm back\". Paused weeks don't add to your streak or earn XP, and a pause can start up to two weeks back, because nobody opens a fitness app on the day they get hurt.",
  },
  {
    q: "Can I bring in history from my watch?",
    a: "Yes. Export GPX, FIT or CSV files from your watch or another app and upload them. Duplicates are skipped. Imported history counts for your streak and your grid, but not for challenges or records, so backfilling can't top a board.",
  },
  {
    q: "Is there a social side?",
    a: "Yes, and it's optional. Follows need your approval, groups share only your handle, streak and week's progress, and a coach sees your sessions only if you switch that on. Leaderboards are opt-in and rank consistency, streaks, season XP and personal records. There is no board for weight, distance or anything body-related. Under 16s are private-only.",
  },
  {
    q: "Does XP reward lifting more?",
    a: "No. Two people of very different strength earn identical XP for the same week. XP comes from training days, habits (capped per habit and per day), kept weeks, weekly quests, streak milestones, logging detail, personal records measured against your own history, and achievements. You can switch the whole game layer off.",
  },
  {
    q: "Can I track more than one discipline?",
    a: "Yes. Keep one streak across everything, or separate chains per discipline. Lifting and running on separate chains is a common setup.",
  },
  {
    q: "Will my data be locked in?",
    a: "No. Export everything as JSON, as CSVs of workouts, sets, habits and body metrics, or as a calendar file, whenever you like. Deleting your account schedules it 30 days out, so a mistake is recoverable, and then it's gone.",
  },
  {
    q: "Does it work without signal?",
    a: "Yes. Every session saves on your phone first, so logging is instant with no signal at all, and it syncs when you're back above ground. The app installs to your home screen like any other.",
  },
  {
    q: "Is any of this open source?",
    a: "The infrastructure and this site are being built in the open, and the whole organisation is AGPL-3.0. The blog at blog.pacestreak.com covers what is being built and what broke while building it.",
  },
];

export const featuredFaqs = faqs.filter((f) => f.featured);
