// What the product actually does, in one place.
//
// Every claim on /features, /streaks, /social and /security reads from here,
// and every number below is taken from the code in PaceStreak/api and
// PaceStreak/app - not from a plan. If the code changes, change this file;
// a marketing page that describes a feature the product does not have is a
// bug, not copy.

export const facts = {
  disciplines: 11,
  exercises: 78,
  starterRoutines: 8,
  achievementRules: 25,
  leaderboards: 4,
  freezeEvery: 4,
  freezeCap: 2,
  deletionGraceDays: 30,
  minAge: 13,
  socialMinAge: 16,
  passwordMin: 16,
  planTemplates: 4,
  maxBuddies: 5,
  encouragements: 6,
};

export const disciplines = [
  "Strength",
  "Run",
  "Ride",
  "Swim",
  "Walk & hike",
  "Climb",
  "Row",
  "Conditioning",
  "Yoga & mobility",
  "Sport",
  "Other",
];

export interface FeatureGroup {
  id: string;
  kicker: string;
  title: string;
  lede: string;
  items: { title: string; body: string }[];
}

export const featureGroups: FeatureGroup[] = [
  {
    id: "logging",
    kicker: "Logging",
    title: "Ten seconds, or as much detail as you like.",
    lede: "One tap records a session. Everything else is optional, and none of it is ever required to keep the streak.",
    items: [
      {
        title: "Quick log",
        body: `Pick one of ${11} disciplines and tap done. That counts. Duration, distance, elevation, feel and effort are there when you want them.`,
      },
      {
        title: "Set-level strength logging",
        body: `Sets, reps, load and RPE against a built-in library of ${78} exercises, each with a movement pattern, equipment and a coaching cue. Add your own movements as custom exercises.`,
      },
      {
        title: "Live workout mode",
        body: "Start a session, work through it set by set, and let the rest timer run between them. The workout saves as you go, not at the end.",
      },
      {
        title: "Routines",
        body: `Save the sessions you repeat. ${8} starter routines ship with the app; edit them or build your own.`,
      },
      {
        title: "Train for a race",
        body: "Pick 5 km, 10 km, a half or a marathon and the date. You get a running plan to race day: mostly easy running, one faster session a week once there's a base, a lighter week every fourth, a taper and a recovery week after. It says no when a race is too soon to train for safely.",
      },
      {
        title: "Training blocks",
        body: "A few weeks where each asks a little more, from about 3 reps in reserve down to 1, then a lighter week. Every exercise shows the week's target. After a session, two optional taps (soreness and pump) can suggest a set more or fewer next time.",
      },
      {
        title: "Training plans",
        body: `A schedule of suggested sessions over several weeks. Start from one of ${4} conservative templates (from two gentle sessions a week to 5 km to 10 km) or build your own, week by week, and share it as a file. Today shows the day's session, and what you log completes it, even if you moved it to another day.`,
      },
      {
        title: "Timers and calculators",
        body: "A rest timer between sets, an interval timer for intervals, EMOM and Tabata that keeps time correctly with the screen locked, a plate calculator, 1RM and pace.",
      },
      {
        title: "Progression hints",
        body: "Last time's numbers next to every exercise, with a suggestion for this time: a little more weight when every set hit the top of the range, one more rep, or a few more seconds on a hold. Stuck at one weight for three sessions? It suggests stepping back 10% and building again. Turn on auto-fill and ticking an empty set logs the suggestion.",
      },
      {
        title: "Type your sets",
        body: "Type 100x5x3, 3x5@100 or just 12 and the sets are logged, no tapping between numbers.",
      },
      {
        title: "Gyms and pinned notes",
        body: "Tell it what each place you train has. The exercise list narrows to that equipment and the plate calculator loads the plates actually there. Pin a note to an exercise, such as seat height or a cue, and it shows every time you do it.",
      },
      {
        title: "Supersets and warm-ups",
        body: "Link exercises into a superset and the rest timer waits until the last one. One tap adds warm-up sets that ramp from the empty bar to your working weight in steps your plates can make.",
      },
      {
        title: "Splits and heart rate from your watch",
        body: "Import a GPX or FIT file and see every kilometre's time and your time in five heart-rate zones, from your own max heart rate or an estimate. Private, like the rest of your session.",
      },
      {
        title: "Tags, search and gear",
        body: "Tag sessions privately (#hills, #with-sam) and search every note, title, exercise and tag, offline. Exercise search forgives a typo and puts what you do most first. Track how far your shoes and bikes have gone, with a reminder when they are due for replacing.",
      },
      {
        title: "Units that never corrupt",
        body: "Everything is stored in kilograms and metres and converted only for display. Switching kg to lb changes what you see, never what was recorded.",
      },
    ],
  },
  {
    id: "streaks",
    kicker: "Streaks",
    title: "A streak that respects rest.",
    lede: "The unit is the kept week, not the day. Hit your own weekly target and the week counts. Rest days in between cost nothing.",
    items: [
      {
        title: "Your target, your week",
        body: "Choose how many days a week counts as kept, and which day your week starts. Change it later and old weeks are still judged by the target that applied then.",
      },
      {
        title: "Freezes you earn",
        body: `Every ${4} kept weeks earns a freeze, holding up to ${2}. A missed week spends one automatically, and only when there is a streak to protect.`,
      },
      {
        title: "One repair a month",
        body: "Missed a week you shouldn't have? Repair one recent missed week per month, by hand. Forgiveness is part of the design.",
      },
      {
        title: "The open week never breaks",
        body: "The week in progress is open until it closes. The app tells you how many sessions you still need and how many days are left, and never nags on day two.",
      },
      {
        title: "Pause for injury or illness",
        body: "Hurt, ill, or life got in the way? Declare a pause. Any week it covers for four days or more can't break the streak, and reminders stop until you're back. Paused weeks don't add to the streak or earn XP, and pauses are capped so they can't stand in for training.",
      },
      {
        title: "Separate chains, balanced weeks",
        body: "One streak across everything, or a chain per discipline. A chain can also ask for a balanced week, such as at least two runs and one strength day, and old weeks are never judged by a rule added later.",
      },
      {
        title: "Reminders at your time",
        body: "Nudges can learn when you usually train and arrive an hour before, never during quiet hours. Or pick a fixed time.",
      },
      {
        title: "A lighter week, when you need one",
        body: "After four hard weeks, or sessions that keep feeling rough, the app suggests an easier week. When one lift stops moving, it suggests a lighter week on that lift alone. After a real miss ends a long streak, it suggests starting again gently.",
      },
      {
        title: "A wager, if you want one",
        body: "Promise one more day than your target in a week. Keep it and earn a freeze; miss it and nothing happens. Opt-in, and once a month.",
      },
      {
        title: "Not feeling 100%?",
        body: "Adjust today instead of skipping it: a lighter version, a hot-weather one, something very easy when you're under the weather, a short one, or rest. The plan day still counts. A three-tap morning check-in can suggest it for you.",
      },
      {
        title: "Lifting and running in one week",
        body: "Heavy legs yesterday and a run today? It suggests keeping the run easy, and the other way round. A training-load chart shows when a week jumps well past your usual.",
      },
      {
        title: "Travel mode",
        body: "When your phone changes timezone, the app offers to follow it, or to pause the streak for the trip. Sessions already logged keep their dates.",
      },
      {
        title: "Recomputed from history",
        body: "Streaks are rebuilt from your logs on every read. Edit last month's session and every streak, record and total after it corrects itself.",
      },
    ],
  },
  {
    id: "progress",
    kicker: "Progress",
    title: "Proof that it's working.",
    lede: "The grid is the receipt. The charts are the trend. Both are about you against you.",
    items: [
      {
        title: "The year grid",
        body: "A heatmap of every training day. Six months of filled squares is a harder thing to abandon than a list.",
      },
      {
        title: "Planned rest on the grid",
        body: "Tell it which days you plan to train and the others show as planned rest, not as gaps. Paused days are marked too. A three-day plan reads as a plan, not four failures a week.",
      },
      {
        title: "A weekly recap, and a year in review",
        body: "Monday morning: last week in one screen. At any time: the year so far, in weeks kept, days shown up, the best month and the records that moved. Attendance, never volume.",
      },
      {
        title: "Look back, and share if you like",
        body: "Two optional lines on each weekly recap (what went well, what to change) that you can search later. Turn a week or your grid into an image made on your phone. It shows days and weeks, never your name or anything about your body.",
      },
      {
        title: "Monthly goals and rest days",
        body: "Set yourself a number of active days for the month. Log a rest day on purpose (sleep, mobility, just rest) and the grid shows it as a choice, not a gap. Neither touches the streak.",
      },
      {
        title: "Personal records, with their history",
        body: "Estimated one-rep maxes and best efforts, each compared only with your own history, and a timeline of every time each one moved. Implausible jumps are recorded but never rewarded or announced.",
      },
      {
        title: "Exercise history",
        body: "Every set of every movement you have logged, with the trend, so you can see the bar moving over months rather than sessions.",
      },
      {
        title: "Consistency score",
        body: "How closely you have kept to your own plan over the last 4, 12 and 52 weeks, capped at 100%. Training beyond the plan can't raise it, and it survives a broken streak.",
      },
      {
        title: "A monthly strength recap",
        body: "Each main lift's best this month against its best before it, and a PR streak: four-week blocks in a row with a record, any lift, any size. No volume totals.",
      },
      {
        title: "Recovery map and strength standards",
        body: "Each muscle by how long since you trained it, and which you haven't touched in a month. If you want it, where your squat, bench, deadlift and press sit against published standards at your bodyweight. Only you see either.",
      },
      {
        title: "Body, privately",
        body: "Weigh in as often as you like: after waking, before or after training, before bed. A 7-day trend with the change in kilos and percent, an optional goal with small milestones and a projected date, and measurements. Progress photos stay on your phone and are never uploaded. None of it is shared, ranked or rewarded.",
      },
    ],
  },
  {
    id: "game",
    kicker: "XP, levels and badges",
    title: "Rewards for showing up, not for lifting more.",
    lede: "Two people of very different strength earn identical XP for the same week. That is the whole rule.",
    items: [
      {
        title: "XP for attendance",
        body: "A training day pays. A kept week pays more. Splitting one workout into five pays nothing extra, and training every single day is not rewarded over a plan with rest in it.",
      },
      {
        title: "Levels that mean something",
        body: "Titles run from Novice to Veteran and describe how long and how steadily you have shown up. A consistent beginner outranks a strong lifter who trains when they feel like it.",
      },
      {
        title: `${facts.achievementRules} achievements`,
        body: "Badges reward breadth, finishing, honest records, early and late sessions, and coming back after a break. None rewards maximum weight, body weight or training through a rest week.",
      },
      {
        title: "Weekly quests",
        body: "Three small habits a week: an early start, a balanced week, an honest effort rating, a short session that still counts. Never more volume or weight.",
      },
      {
        title: "Seasons",
        body: "XP and records also count per quarter, so someone who started this season has something to play for.",
      },
      {
        title: "Turn it all off",
        body: "Some people want the streak and nothing else. Gamification is a switch in settings.",
      },
      {
        title: "A gentle first fortnight",
        body: "New here? Getting started asks for three days in your first two weeks. Short sessions count; that's the point.",
      },
    ],
  },
  {
    id: "social",
    kicker: "Social",
    title: "Train with people, on your terms.",
    lede: "Follows, a feed, kudos, groups and challenges, all behind privacy rules that are checked every time something is read.",
    items: [
      {
        title: "Follows with approval",
        body: "Private by default. People ask to follow; you decide. Block anyone, any time, and it applies retroactively.",
      },
      {
        title: "A feed of what happened",
        body: "Sessions, kept weeks, milestones and records from people you follow. Give kudos and leave plain-text comments.",
      },
      {
        title: "Buddy streaks",
        body: `Keep a streak with someone: a week counts when you both keep yours. Pauses and freezes work exactly as they do for you alone. Only with people you follow or who follow you, up to ${5} at a time. A buddy sees your progress for the week, never your sessions or why you paused.`,
      },
      {
        title: "Crews and coaching groups",
        body: "Invite-code groups share your handle, streak and week's progress with members, and nothing else. Each group keeps a shared streak too: a week counts when enough of the crew keep theirs. A coach sees your sessions only if you turn that on.",
      },
      {
        title: "Encouragement, not comments",
        body: `A tap sends one of ${6} kind messages to someone who follows you, a buddy or a group member. Never free text, and at most one a day to each person.`,
      },
      {
        title: "A verified official account",
        body: "Only PaceStreak's own account can hold the PaceStreak name, and it carries a verified mark. Nobody else can use the name in a handle or display name, however it's spelled.",
      },
      {
        title: "Challenges",
        body: "Attendance-based: most active days, keeping your weekly target, or following one plan together, where every planned session done counts. Never volume, never weight.",
      },
      {
        title: "Coaching and announcements",
        body: "A coach can suggest a plan to a member who shares their training; it only starts if the member starts it. Group owners can post announcements that members read, with nothing between members to moderate.",
      },
      {
        title: `${4} opt-in leaderboards`,
        body: "Consistency, streak, season XP and season records, globally, among people you follow, among people who train about as often as you, or inside a group. There is no board for weight, distance or anything body-related.",
      },
    ],
  },
  {
    id: "data",
    kicker: "Your data",
    title: "It's yours. It leaves with you.",
    lede: "Full export, import, and a deletion that actually deletes.",
    items: [
      {
        title: "Export in three formats",
        body: "A complete JSON archive, CSVs of workouts, sets and body metrics for a spreadsheet, and an ICS calendar of your training.",
      },
      {
        title: "Import from your watch",
        body: "Upload GPX, FIT or CSV files exported from a watch or another app. Duplicates are skipped, so uploading twice is harmless. No account linking, no third-party sync.",
      },
      {
        title: "A calendar that stays in sync",
        body: "Subscribe to a private calendar link and your sessions, pauses and planned training days appear in the calendar you already use. Revoke it any time.",
      },
      {
        title: "Import a PaceStreak export",
        body: "Bring a PaceStreak export back in, on this account or a new one.",
      },
      {
        title: "A monthly backup reminder",
        body: "Opt in and, on the first of each month, you get a nudge to download a copy of everything. The reminder links into the app; it never carries your data.",
      },
      {
        title: "Delete with a safety net",
        body: `Deletion is scheduled ${30} days out and signs you out everywhere. Sign back in during that window to cancel it; after it, the account is gone.`,
      },
      {
        title: "Moderation never touches your log",
        body: "A suspension removes social privileges only. A suspended person can still log, see their own history and export it.",
      },
    ],
  },
  {
    id: "anywhere",
    kicker: "Offline and installable",
    title: "Works in a basement with no signal.",
    lede: "A progressive web app that installs to your home screen and doesn't need the network to log.",
    items: [
      {
        title: "Offline-first logging",
        body: "Every save lands on your device first, so a log is instant and survives a dead connection or a closed tab. Weigh-ins and measurements too. It syncs when you are back above ground.",
      },
      {
        title: "Multi-device sync",
        body: "Edits and deletions made on one device arrive on the others. Retrying is always safe, so a flaky connection can't duplicate a session.",
      },
      {
        title: "Install it",
        body: "Sign-in and navigation in English, Spanish and German, with more of the app to follow. Add it to your home screen and it opens like an app. Its icon badge can show unread notifications or the days still to go this week. Long-press the icon to jump straight to logging a session, a live workout or last week's recap.",
      },
      {
        title: "Notifications you choose",
        body: "An in-app inbox for everything, plus web push and email per category. One-click unsubscribe from any email, no login needed.",
      },
    ],
  },
  {
    id: "security",
    kicker: "Security",
    title: "Built like it holds health data, because it does.",
    lede: "The boring, careful version of every security decision.",
    items: [
      {
        title: "Passkeys",
        body: "Sign in with your fingerprint, face or device PIN. Nothing to type, nothing to phish, and it counts as two-factor on its own. Only a public key is stored.",
      },
      {
        title: "Two-factor authentication",
        body: "Authenticator-app codes with single-use recovery codes you can replace at any time. A recovery code also gets you back in if you lose both your password and your email.",
      },
      {
        title: "Session control",
        body: "See every signed-in device, end any one of them, or sign out everywhere at once.",
      },
      {
        title: "Stolen-token detection",
        body: "Refresh tokens rotate on every use. If an old one is ever presented again, the whole session is revoked.",
      },
      {
        title: "Security history",
        body: "Sign-ins, password, passkey and two-factor changes are logged to your account, where you can review them. A sign-in from a device you've never used gets you an alert.",
      },
      {
        title: "No third parties at all",
        body: "No analytics, no trackers, no font CDNs, no embedded widgets. A content security policy makes the browser refuse them.",
      },
    ],
  },
];
