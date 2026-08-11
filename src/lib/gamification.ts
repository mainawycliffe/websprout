import type { DifficultyLevel } from "@/types/lesson";

/**
 * Pure XP / streak / rank / badge logic. No React, no IndexedDB — everything
 * here is a plain function so it can be reasoned about and tested directly.
 *
 * "Level" means question difficulty. Player progression is a **rank**, so the
 * two never get confused in the UI.
 */

export interface PlayerStats {
  lessonStepsCompleted: number;
  lessonsCompleted: number;
  quizzesCorrect: number;
  quizzesFirstTry: number;
  challengesSolved: number;
  practiceSolved: number;
  solvedByLevel: Record<DifficultyLevel, number>;
  noHintSolves: number;
  modulesCompleted: number;
}

export interface PlayerRecord {
  id: "player";
  xp: number;
  /** Local calendar day, "YYYY-MM-DD". */
  lastActiveDay: string | null;
  currentStreak: number;
  longestStreak: number;
  stats: PlayerStats;
  /** Badge id → unlock timestamp. Presence means unlocked. */
  badges: Record<string, number>;
}

export function createPlayer(): PlayerRecord {
  return {
    id: "player",
    xp: 0,
    lastActiveDay: null,
    currentStreak: 0,
    longestStreak: 0,
    stats: {
      lessonStepsCompleted: 0,
      lessonsCompleted: 0,
      quizzesCorrect: 0,
      quizzesFirstTry: 0,
      challengesSolved: 0,
      practiceSolved: 0,
      solvedByLevel: { easy: 0, intermediate: 0, advanced: 0 },
      noHintSolves: 0,
      modulesCompleted: 0,
    },
    badges: {},
  };
}

/* ---------------- ranks ---------------- */

export interface Rank {
  id: string;
  name: string;
  minXp: number;
  icon: string;
}

export const RANKS: Rank[] = [
  { id: "seedling", name: "Seedling", minXp: 0, icon: "🌱" },
  { id: "sprout", name: "Sprout", minXp: 150, icon: "🌿" },
  { id: "sapling", name: "Sapling", minXp: 500, icon: "🪴" },
  { id: "tree", name: "Tree", minXp: 1200, icon: "🌳" },
  { id: "redwood", name: "Redwood", minXp: 3000, icon: "🌲" },
];

export interface RankProgress {
  current: Rank;
  next: Rank | null;
  /** 0-1 through the current rank; 1 when there is no next rank. */
  progress: number;
  xpIntoRank: number;
  xpForNextRank: number;
}

export function getRank(xp: number): RankProgress {
  let current = RANKS[0];
  for (const rank of RANKS) {
    if (xp >= rank.minXp) current = rank;
  }
  const next = RANKS[RANKS.indexOf(current) + 1] ?? null;

  if (!next) {
    return { current, next: null, progress: 1, xpIntoRank: xp - current.minXp, xpForNextRank: 0 };
  }

  const span = next.minXp - current.minXp;
  const into = xp - current.minXp;
  return {
    current,
    next,
    progress: span === 0 ? 1 : Math.min(1, into / span),
    xpIntoRank: into,
    xpForNextRank: span,
  };
}

/* ---------------- badges ---------------- */

export interface Badge {
  id: string;
  name: string;
  icon: string;
  /** Shown on locked badges, so they read as goals rather than mysteries. */
  requirement: string;
  earned: (player: PlayerRecord) => boolean;
}

export const BADGES: Badge[] = [
  {
    id: "first-steps",
    name: "First Steps",
    icon: "🌱",
    requirement: "Complete your first step",
    earned: (p) => p.stats.lessonStepsCompleted + p.stats.practiceSolved >= 1,
  },
  {
    id: "sharpshooter",
    name: "Sharpshooter",
    icon: "🎯",
    requirement: "Get 10 quizzes right on the first try",
    earned: (p) => p.stats.quizzesFirstTry >= 10,
  },
  {
    id: "bug-squasher",
    name: "Bug Squasher",
    icon: "🐛",
    requirement: "Solve 10 code challenges",
    earned: (p) => p.stats.challengesSolved >= 10,
  },
  {
    id: "no-hints",
    name: "No Hints Needed",
    icon: "🧠",
    requirement: "Solve 5 questions without using a hint",
    earned: (p) => p.stats.noHintSolves >= 5,
  },
  {
    id: "peak-climber",
    name: "Peak Climber",
    icon: "⛰️",
    requirement: "Solve an advanced question",
    earned: (p) => p.stats.solvedByLevel.advanced >= 1,
  },
  {
    id: "week-streak",
    name: "Week Streak",
    icon: "🔥",
    requirement: "Practise 7 days in a row",
    earned: (p) => p.longestStreak >= 7,
  },
  {
    id: "module-master",
    name: "Module Master",
    icon: "📚",
    requirement: "Complete every lesson in a module",
    earned: (p) => p.stats.modulesCompleted >= 1,
  },
  {
    id: "centurion",
    name: "Centurion",
    icon: "💯",
    requirement: "Solve 100 practice questions",
    earned: (p) => p.stats.practiceSolved >= 100,
  },
];

/* ---------------- XP ---------------- */

export const XP = {
  lessonStep: 5,
  lessonComplete: 25,
  practiceByLevel: { easy: 10, intermediate: 25, advanced: 50 } as Record<DifficultyLevel, number>,
  /** Multiplier applied when solved with no wrong attempt and no hint. */
  firstTryMultiplier: 1.5,
  dailyBonus: 10,
} as const;

export type XpEvent =
  | { kind: "lesson-step" }
  | { kind: "lesson-complete"; moduleCompleted?: boolean }
  | {
      kind: "practice-solved";
      level: DifficultyLevel;
      questionKind: "Quiz" | "Code" | "Fill-in";
      firstTry: boolean;
      usedHint: boolean;
    };

export interface AwardOutcome {
  player: PlayerRecord;
  xpGained: number;
  newBadges: Badge[];
  rankUp: Rank | null;
  streakExtended: boolean;
}

/** Local calendar day. Deliberately not UTC — a UTC boundary breaks streaks
 *  for anyone west of Greenwich in the evening. */
export function localDay(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function daysBetween(from: string, to: string): number {
  const [fy, fm, fd] = from.split("-").map(Number);
  const [ty, tm, td] = to.split("-").map(Number);
  const a = Date.UTC(fy, fm - 1, fd);
  const b = Date.UTC(ty, tm - 1, td);
  return Math.round((b - a) / 86400000);
}

/**
 * The single place XP, streaks, stats and badges change.
 *
 * `today` and `now` are injected so this stays pure and testable.
 */
export function awardXp(
  player: PlayerRecord,
  event: XpEvent,
  today: string = localDay(),
  now: number = Date.now()
): AwardOutcome {
  const beforeRank = getRank(player.xp).current;
  const stats: PlayerStats = {
    ...player.stats,
    solvedByLevel: { ...player.stats.solvedByLevel },
  };

  let xpGained = 0;

  switch (event.kind) {
    case "lesson-step":
      xpGained += XP.lessonStep;
      stats.lessonStepsCompleted += 1;
      break;

    case "lesson-complete":
      xpGained += XP.lessonComplete;
      stats.lessonsCompleted += 1;
      if (event.moduleCompleted) stats.modulesCompleted += 1;
      break;

    case "practice-solved": {
      const base = XP.practiceByLevel[event.level];
      // A hint still pays full base XP — it only forfeits the first-try bonus.
      xpGained += event.firstTry && !event.usedHint ? Math.round(base * XP.firstTryMultiplier) : base;
      stats.practiceSolved += 1;
      stats.solvedByLevel[event.level] += 1;
      if (!event.usedHint) stats.noHintSolves += 1;
      if (event.questionKind === "Code") stats.challengesSolved += 1;
      if (event.questionKind === "Quiz") {
        stats.quizzesCorrect += 1;
        if (event.firstTry) stats.quizzesFirstTry += 1;
      }
      break;
    }
  }

  // Streak: same day is a no-op, exactly one day on extends, any bigger gap resets.
  let { currentStreak, longestStreak } = player;
  let streakExtended = false;
  if (player.lastActiveDay !== today) {
    const gap = player.lastActiveDay ? daysBetween(player.lastActiveDay, today) : null;
    currentStreak = gap === 1 ? currentStreak + 1 : 1;
    longestStreak = Math.max(longestStreak, currentStreak);
    xpGained += XP.dailyBonus;
    streakExtended = true;
  }

  const candidate: PlayerRecord = {
    ...player,
    xp: player.xp + xpGained,
    lastActiveDay: today,
    currentStreak,
    longestStreak,
    stats,
    badges: { ...player.badges },
  };

  const newBadges: Badge[] = [];
  for (const badge of BADGES) {
    if (!candidate.badges[badge.id] && badge.earned(candidate)) {
      candidate.badges[badge.id] = now;
      newBadges.push(badge);
    }
  }

  const afterRank = getRank(candidate.xp).current;

  return {
    player: candidate,
    xpGained,
    newBadges,
    rankUp: afterRank.id !== beforeRank.id ? afterRank : null,
    streakExtended,
  };
}
