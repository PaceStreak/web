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
    q: "Is a streak just a guilt machine?",
    a: "It is, if it's built badly. That's why the streak counts against a target you set, rest days count as kept, and you can repair a missed day once a month. The goal is showing up over a year, not a perfect record you abandon in week three.",
    featured: true,
  },
  {
    q: "Do I have to log sets, reps and weight?",
    a: "No. A session counts with one tap. Detail is there when you want it — for PRs and volume trends — but it is never required to keep the chain.",
    featured: true,
  },
  {
    q: "Do I need a watch or a wearable?",
    a: "No. PaceStreak is manual by design — you tell it you trained, which takes a tap. Anything that depends on a device you might forget, or a battery that might be flat, is one more reason to break the chain, and the point is not to hand you one.",
    featured: true,
  },
  {
    q: "When can I use it?",
    a: "It's early. This page is the honest state of things: the product is being built in the open, and early access goes out in batches rather than all at once. Mail hello@pacestreak.com and you'll be in the next one.",
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
    q: "Is there a social side?",
    a: "Yes, and it's optional. Follows need your approval, groups share only your handle, streak and week's progress, and a coach sees your sessions only if you switch that on. Leaderboards are opt-in and rank consistency, streaks, season XP and personal records. There is no board for weight, distance or anything body-related. Under 16s are private-only.",
  },
  {
    q: "Does XP reward lifting more?",
    a: "No. Two people of very different strength earn identical XP for the same week. XP comes from training days, kept weeks, streak milestones, logging detail, personal records measured against your own history, and achievements. You can switch the whole game layer off.",
  },
  {
    q: "Can I track more than one discipline?",
    a: "Yes. Keep one streak across everything, or separate chains per discipline. Lifting and running on separate chains is a common setup.",
  },
  {
    q: "Will my data be locked in?",
    a: "No. Export everything as JSON, as CSVs of workouts, sets and body metrics, or as a calendar file, whenever you like. Deleting your account schedules it 30 days out, so a mistake is recoverable, and then it's gone.",
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
