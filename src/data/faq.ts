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
    q: "Can I track more than one discipline?",
    a: "Yes. Keep one streak across everything, or separate chains per discipline. Lifting and running on separate chains is a common setup.",
  },
  {
    q: "Will my data be locked in?",
    a: "No. Full JSON and CSV export from day one. It's your training history and you should be able to walk out with it.",
  },
  {
    q: "Does it work without signal?",
    a: "That's the intent. Gym basements have terrible reception, and a log you cannot save is a streak you lose to the building. Sessions are logged locally and sync when you're back above ground.",
  },
  {
    q: "Is any of this open source?",
    a: "The infrastructure and this site are being built in the open, and the whole organisation is AGPL-3.0. The build log at blog.pacestreak.com covers what is being built and what broke while building it.",
  },
];

export const featuredFaqs = faqs.filter((f) => f.featured);
