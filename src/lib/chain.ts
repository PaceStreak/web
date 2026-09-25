// A faithful, simplified port of api/app/game/streak.py for the /streaks demo.
//
// Same rules, same order: the open week never breaks, a missed week spends a
// freeze only when there is a run to protect, one freeze per four kept weeks,
// at most two held. Repairs are omitted - they are a user action, not a rule
// the demo can show by itself. Used both at build time (so the page is correct
// with JavaScript off) and in the browser (so toggling a day recomputes).

export const FREEZE_EVERY = 4;
export const FREEZE_CAP = 2;

export type Status = "kept" | "frozen" | "missed" | "open";

export interface Week {
  days: number;
  status: Status;
  run: number;
}

export interface Chain {
  weeks: Week[];
  current: number;
  longest: number;
  freezes: number;
}

/** `grid[w][d]` is true when day d of week w was trained. The last week is
    the one in progress. */
export function computeChain(grid: boolean[][], target: number): Chain {
  const weeks: Week[] = [];
  let freezes = 0;
  let towardFreeze = 0;
  let run = 0;
  let longest = 0;

  grid.forEach((week, index) => {
    const days = week.filter(Boolean).length;
    const isCurrent = index === grid.length - 1;
    let status: Status;

    if (isCurrent) status = days >= target ? "kept" : "open";
    else if (days >= target) status = "kept";
    else if (freezes > 0 && run > 0) {
      status = "frozen";
      freezes -= 1;
    } else status = "missed";

    if (status === "kept" && !isCurrent) {
      towardFreeze += 1;
      if (towardFreeze >= FREEZE_EVERY) {
        towardFreeze = 0;
        freezes = Math.min(FREEZE_CAP, freezes + 1);
      }
    }

    if (status === "kept" || status === "frozen") run += 1;
    else if (status === "missed") run = 0;
    longest = Math.max(longest, run);
    weeks.push({ days, status, run });
  });

  return { weeks, current: run, longest, freezes };
}

/** The demo's starting history: a realistic run with one bad week that a
    freeze covers, and a current week still open. */
export const DEMO_GRID: boolean[][] = [
  [true, false, true, false, true, false, false],
  [true, false, true, false, false, true, false],
  [false, true, false, true, false, true, false],
  [true, false, true, false, true, false, true],
  [true, false, false, false, false, false, false],
  [true, true, false, true, false, false, false],
  [false, true, false, true, false, true, false],
  [true, false, false, false, false, false, false],
];

export const STATUS_LABEL: Record<Status, string> = {
  kept: "Kept",
  frozen: "Frozen",
  missed: "Missed",
  open: "Open",
};
