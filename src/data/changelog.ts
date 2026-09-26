// What changed in the product, newest first.
//
// Written by hand, for people, from the conventional commits in
// PaceStreak/api and PaceStreak/app. Each entry is something a person using
// the app would notice; refactors, tests and infrastructure stay out. Dates
// are when the change was built, and "not yet released" stays true until the
// app is open to the public - a changelog that claims availability the
// product doesn't have is a bug, like any other wrong claim on this site.

export interface Release {
  date: string; // ISO
  title: string;
  items: { area: string; text: string }[];
}

export const released = false;

export const releases: Release[] = [
  {
    date: "2026-09-26",
    title: "Weigh-ins, quests, gyms and a monthly strength recap",
    items: [
      { area: "Body", text: "Weigh in several times a day, tagged after waking, before or after training, or before bed, with a 7-day trend and the change in kilos and percent." },
      { area: "Body", text: "An optional private weight goal with small milestones and a projected date. No rewards attached, on purpose." },
      { area: "Body", text: "Progress photos with a side-by-side slider. They stay on your phone and are never uploaded." },
      { area: "Training", text: "Type sets as 100x5x3. Search forgives typos. Pin a note to an exercise." },
      { area: "Training", text: "Gyms: the exercise list and plate calculator fit what each place has." },
      { area: "Training", text: "A 10% step back when a lift stalls, optional auto-fill of suggestions, and a card when one lift stops moving." },
      { area: "Progress", text: "A recovery map, strength standards if you want them, a monthly strength recap and a PR streak." },
      { area: "Streaks", text: "An opt-in wager: one extra day earns a freeze, and missing it costs nothing." },
      { area: "XP", text: "Three weekly quests for habits, never for volume." },
      { area: "Social", text: "Leaderboards among people who train about as often as you." },
      { area: "Offline", text: "Weigh-ins and measurements save with no signal and sync later." },
    ],
  },
  {
    date: "2026-09-25",
    title: "Recovery, smarter reminders, supersets and plans together",
    items: [
      { area: "Security", text: "Lost your password and your email? A two-factor recovery code sets a new password. Change your email address from Settings." },
      { area: "Getting started", text: "A short checklist on Today for your first days: training days, a first session, reminders, a passkey." },
      { area: "Streaks", text: "Reminders can learn when you usually train and arrive an hour before." },
      { area: "Streaks", text: "Suggestions for a lighter week after a hard block, and for starting again gently after a streak ends." },
      { area: "Progress", text: "Monthly goals, and rest days you log on purpose, marked on the grid." },
      { area: "Training", text: "Supersets, one-tap warm-up sets, and kilometre splits from imported runs and rides." },
      { area: "Training", text: "Share a plan as a file, and import one." },
      { area: "Social", text: "Challenges where everyone follows the same plan." },
      { area: "Social", text: "Coaches can suggest a plan; group owners can post announcements." },
      { area: "Social", text: "A nudge when your buddy is one session short near the end of their week." },
    ],
  },
  {
    date: "2026-09-25",
    title: "Passkeys, training plans and buddy streaks",
    items: [
      { area: "Security", text: "Sign in with a passkey: fingerprint, face or device PIN, from a button or the email field's autofill. It counts as two-factor on its own." },
      { area: "Security", text: "Make a new set of two-factor recovery codes from Settings, and get a warning when you're running low." },
      { area: "Training", text: "Training plans: start from one of four templates or build your own. Today shows the day's session, and what you log completes it." },
      { area: "Training", text: "An interval timer for intervals, EMOM and Tabata that keeps time correctly with the screen locked." },
      { area: "Training", text: "Private tags on sessions, and search across notes, titles, exercises and tags, offline." },
      { area: "Training", text: "Gear: track how far your shoes and bikes have gone, with a replacement reminder." },
      { area: "Training", text: "Progression hints for bodyweight exercises and timed holds." },
      { area: "Streaks", text: "Balanced weeks: a streak can ask for at least so many days of a kind, like two runs and a strength day." },
      { area: "Streaks", text: "Consistency over 12 and 52 weeks, alongside the last 4." },
      { area: "Streaks", text: "Travel: when your phone changes timezone, switch to it or pause the streak for the trip." },
      { area: "Progress", text: "A year in review, and a timeline behind every personal record." },
      { area: "Social", text: "Buddy streaks: a week counts when you both keep yours." },
      { area: "Social", text: "Group streaks, with a threshold the group's owner sets." },
      { area: "Social", text: "Encourage someone with one tap, from six kind messages. No free text." },
      { area: "App", text: "The icon badge can show the days still to go this week." },
      { area: "Your data", text: "An opt-in monthly reminder to download a backup. Exports now include tags, gear and plans." },
    ],
  },
  {
    date: "2026-09-25",
    title: "Pauses, planned rest and your data, your way",
    items: [
      { area: "Streaks", text: "Pause the streak for injury, illness or life. Weeks it covers can't break it." },
      { area: "Progress", text: "Planned rest days show on the grid as rest, not gaps. A weekly recap every Monday." },
      { area: "Your data", text: "Import GPX, FIT and CSV files from a watch. Subscribe to your training as a private calendar." },
      { area: "Social", text: "Mute a group: nothing pushed or emailed, everything still in your inbox." },
      { area: "App", text: "Long-press the home-screen icon to jump straight to logging." },
    ],
  },
];
