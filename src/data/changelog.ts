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

export const released = true;

export const releases: Release[] = [
  {
    date: "2026-10-02",
    title: "Faster everywhere, and an undo for everything",
    items: [
      { area: "App", text: "A command palette: Ctrl or ⌘ K to jump anywhere, tick a habit or search. G-then-a-letter shortcuts, and ? lists them." },
      { area: "App", text: "Search everything you've logged, and a one-day view of training, habits, food and mood on any date." },
      { area: "Data", text: "Undo after every delete, and a 30-day trash that restores habits, sessions, meals, recipes and journal entries with their history." },
      { area: "Habits", text: "Swipe to complete, long-press for the amount, and select several days on the calendar to fill them in at once." },
      { area: "Habits", text: "Reminders with Done and Snooze buttons, snooze from the habit page, or one evening summary instead of a reminder each." },
      { area: "App", text: "Log the last session again, or copy yesterday's food, in one tap." },
      { area: "App", text: "Share a photo into the app to scan a barcode or save a progress photo; new home-screen shortcuts; pull to refresh; a habits-left icon badge." },
      { area: "App", text: "Larger text, compact layout and high contrast, and screens that remember their last tab." },
      { area: "Data", text: "An opt-in monthly email with your export attached." },
      { area: "App", text: "Fixed: reloading any page, or opening a shared link, took you back to Today." },
      { area: "Data", text: "All of PaceStreak is now open source: the app, the API and the sites are public on GitHub under AGPL-3.0." },
    ],
  },
  {
    date: "2026-10-01",
    title: "Food, insights, a journal and habit routines",
    items: [
      { area: "Food", text: "Log meals with calories and macros against optional daily targets; save foods and recipes; copy yesterday's meal in one tap." },
      { area: "Food", text: "Scan a barcode from a photo and fill in the numbers from Open Food Facts. Only the barcode is sent, never who scanned it." },
      { area: "Food", text: "An energy-burn estimate from your own food log and weigh-in trend, with a gentle suggested target toward your weight goal." },
      { area: "Insights", text: "Patterns in your own data, like how sleep relates to the habits you keep, shown only when they pass a statistical test." },
      { area: "Today", text: "A daily coach note about yesterday's food, and a one-tap mood check." },
      { area: "Journal", text: "Daily mood and a note, a year-in-pixels grid, and search." },
      { area: "Habits", text: "Routines you step through in order, a focus timer for minutes habits, and import from Loop Habit Tracker or a CSV." },
    ],
  },
  {
    date: "2026-09-27",
    title: "No more dead ends in sign-up and sign-in",
    items: [
      { area: "Account", text: "Verifying your email now takes you straight into the app instead of leaving you on a confirmation screen." },
      { area: "Account", text: "Signing in with an unverified address now takes you to enter the code, instead of a resend button with nowhere to type it." },
      { area: "Account", text: "A signup that partially succeeds no longer shows a confusing \"already registered\" error - it sends you on to verify instead." },
      { area: "Account", text: "Every password field has a show/hide toggle." },
    ],
  },
  {
    date: "2026-09-27",
    title: "Verification and password reset by code, not link",
    items: [
      { area: "Account", text: "Confirming your email, resetting your password and changing your address now use a 6-digit code you type in, not a link you click." },
      { area: "Account", text: "Works everywhere a link didn't: read the code on your phone, enter it on your laptop." },
    ],
  },
  {
    date: "2026-09-27",
    title: "A new look: the wall calendar",
    items: [
      { area: "Design", text: "The whole app, this site and the blog take the structure of a wall calendar, kept on the near-black and lime look rather than the paper-and-red version tried and set aside the same day." },
      { area: "Today", text: "A tear-off date page beside your whole-life chain, and this week as a calendar board: one row per habit, seven boxes to cross off." },
      { area: "Habits", text: "Ticking a day draws a marker X over it; part-done days get a stroke, slips a ring. Each kind of habit has its own marker colour." },
      { area: "Habits", text: "A month calendar for every habit, notes on any day, and a quick sheet with steppers and presets for amounts." },
      { area: "Body", text: "Tape measurements from neck to calf, and optional backup of progress photos to your account." },
    ],
  },
  {
    date: "2026-09-26",
    title: "Beyond training: habits",
    items: [
      { area: "Habits", text: "Track anything worth doing regularly: 68 ready-made habits across health, learning, mind, people, focus, money, home and creative, or your own." },
      { area: "Habits", text: "Tick it, count it or time it, each with its own weekly streak and a slow-moving strength score." },
      { area: "Habits", text: "Break a habit with clean days: a slip is logged, never punished, and it stays private." },
      { area: "Habits", text: "Skills with a long goal and a date at your current pace; cues, reasons and a reminder at the hour you choose." },
      { area: "Habits", text: "Fill in or fix any day in the last 60." },
      { area: "Streaks", text: "An optional whole-life streak across training and every habit, with its own leaderboard." },
      { area: "XP", text: "Habits earn XP, capped so they can't be farmed; four new badges and a new weekly quest." },
    ],
  },
  {
    date: "2026-09-26",
    title: "Race plans, training blocks and adjusting a rough day",
    items: [
      { area: "Plans", text: "Train for a race: 5 km to marathon, built to race day with a taper and a recovery week." },
      { area: "Training", text: "Training blocks with reps in reserve that step down week by week, then a lighter week." },
      { area: "Training", text: "Optional soreness and pump check-ins that suggest a set more or fewer." },
      { area: "Today", text: "Not feeling 100%? Adjust today: lighter, hot, unwell, short on time, or rest. It still counts." },
      { area: "Today", text: "A three-tap morning check-in, and a nudge when yesterday's legs and today's run collide." },
      { area: "Progress", text: "Training load by week, with a warning when a week jumps well past your usual." },
      { area: "Sessions", text: "Heart rate and time in zones from imported GPX and FIT files." },
      { area: "Recap", text: "Two lines to look back on each week, searchable later, and share images made on your phone." },
      { area: "Getting started", text: "Three days in your first two weeks: short sessions count." },
    ],
  },
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
