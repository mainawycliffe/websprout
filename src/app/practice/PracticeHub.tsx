"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import DifficultyBadge from "@/components/ui/DifficultyBadge";
import ProgressIndicator from "@/components/ui/ProgressIndicator";
import Tooltip from "@/components/ui/Tooltip";
import { useGamification } from "@/hooks/useGamification";
import { useIndexedDB } from "@/hooks/useIndexedDB";
import { BADGES, getRank } from "@/lib/gamification";
import { practiceQuestions, pickRandomQuestion } from "@/content/practice";
import {
  PRACTICE_CATEGORIES,
  getPracticeKind,
  getPracticeLevel,
  type PracticeCategory,
  type PracticeQuestion,
  type PracticeStatus,
} from "@/types/practice";
import type { DifficultyLevel } from "@/types/lesson";

type LevelFilter = DifficultyLevel | "all";
type KindFilter = "Quiz" | "Code" | "Fill-in" | "all";
type StatusFilter = "all" | "unsolved" | "solved";
type CategoryFilter = PracticeCategory | "all";

const LEVELS: LevelFilter[] = ["all", "easy", "intermediate", "advanced"];
const KINDS: KindFilter[] = ["all", "Quiz", "Code", "Fill-in"];
const STATUSES: StatusFilter[] = ["all", "unsolved", "solved"];
const CATEGORIES: CategoryFilter[] = ["all", ...PRACTICE_CATEGORIES];

const STATUS_STYLES: Record<PracticeStatus, { className: string; label: string; mark: string }> = {
  solved: { className: "bg-success text-white", label: "Solved", mark: "✓" },
  attempted: { className: "bg-warning text-white", label: "Attempted", mark: "·" },
  unsolved: { className: "bg-bg-warm text-text-muted", label: "Not started", mark: "" },
};

interface PillProps<T extends string> {
  options: T[];
  value: T;
  onChange: (next: T) => void;
  /** Count shown alongside each option, so a filter never leads to a dead end. */
  countFor?: (option: T) => number;
  label: string;
}

function PillGroup<T extends string>({ options, value, onChange, countFor, label }: PillProps<T>) {
  return (
    <div role="group" aria-label={label} className="flex gap-1.5 flex-wrap">
      {options.map((option) => {
        const count = countFor?.(option);
        const isEmpty = count === 0 && option !== value;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            disabled={isEmpty}
            onClick={() => onChange(option)}
            className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
              value === option
                ? "bg-primary text-white"
                : isEmpty
                  ? "bg-bg-warm/50 text-text-muted/40 cursor-not-allowed"
                  : "bg-bg-warm text-text-muted hover:text-text hover:bg-border"
            }`}
          >
            {option === "all" ? `All ${label.toLowerCase()}` : option}
            {count !== undefined && <span className="ml-1.5 opacity-60">{count}</span>}
          </button>
        );
      })}
    </div>
  );
}

function QuestionRow({
  question,
  status,
}: {
  question: PracticeQuestion;
  status: PracticeStatus;
}) {
  const style = STATUS_STYLES[status];
  return (
    <Link href={`/practice/${question.slug}`} className="block group">
      <div className="flex items-center gap-3 px-4 py-3 rounded-md border border-border/60 bg-card hover:border-primary/40 hover:shadow-card transition-all">
        <span
          className={`w-6 h-6 shrink-0 rounded-full grid place-items-center text-xs font-bold ${style.className}`}
          aria-hidden="true"
        >
          {style.mark}
        </span>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-text truncate group-hover:text-primary transition-colors">
            {question.title}
            <span className="sr-only"> — {style.label}</span>
          </p>
          <p className="text-xs text-text-muted truncate">{question.topics.join(" · ")}</p>
        </div>

        <span className="hidden sm:inline text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold shrink-0">
          {getPracticeKind(question)}
        </span>
        <DifficultyBadge level={getPracticeLevel(question)} className="shrink-0" />
      </div>
    </Link>
  );
}

export default function PracticeHub() {
  const router = useRouter();
  const { isReady, getAllPracticeResults } = useIndexedDB();
  const { player, isReady: playerReady } = useGamification();
  const searchRef = useRef<HTMLInputElement>(null);

  const [statuses, setStatuses] = useState<Map<string, PracticeStatus>>(new Map());
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<LevelFilter>("all");
  const [kind, setKind] = useState<KindFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [category, setCategory] = useState<CategoryFilter>("all");

  useEffect(() => {
    if (!isReady) return;
    let cancelled = false;
    getAllPracticeResults().then((records) => {
      if (cancelled) return;
      setStatuses(new Map(records.map((r) => [r.questionId, r.status])));
    });
    return () => {
      cancelled = true;
    };
  }, [isReady, getAllPracticeResults]);

  // "/" focuses search — the list is long enough that hunting is the slow path.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing = target && /^(INPUT|TEXTAREA)$/.test(target.tagName);
      if (event.key === "/" && !typing) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const statusOf = useCallback(
    (question: PracticeQuestion): PracticeStatus => statuses.get(question.id) ?? "unsolved",
    [statuses]
  );

  const normalisedQuery = query.trim().toLowerCase();

  const matchesSearch = useCallback(
    (question: PracticeQuestion) => {
      if (!normalisedQuery) return true;
      const haystack = [question.title, question.category, ...question.topics].join(" ").toLowerCase();
      return normalisedQuery.split(/\s+/).every((term) => haystack.includes(term));
    },
    [normalisedQuery]
  );

  /** Everything except the named dimension, so each pill can show a live count. */
  const passesExcept = useCallback(
    (question: PracticeQuestion, except: "level" | "kind" | "status" | "category") => {
      if (!matchesSearch(question)) return false;
      if (except !== "level" && level !== "all" && getPracticeLevel(question) !== level) return false;
      if (except !== "kind" && kind !== "all" && getPracticeKind(question) !== kind) return false;
      if (except !== "category" && category !== "all" && question.category !== category) return false;
      if (except !== "status" && status !== "all") {
        const solved = statusOf(question) === "solved";
        if (status === "solved" && !solved) return false;
        if (status === "unsolved" && solved) return false;
      }
      return true;
    },
    [matchesSearch, level, kind, category, status, statusOf]
  );

  const visible = useMemo(
    () =>
      practiceQuestions.filter(
        (q) =>
          passesExcept(q, "level") &&
          passesExcept(q, "kind") &&
          passesExcept(q, "status") &&
          passesExcept(q, "category")
      ),
    [passesExcept]
  );

  const countBy = useCallback(
    (dimension: "level" | "kind" | "status" | "category", value: string) => {
      return practiceQuestions.filter((q) => {
        if (!passesExcept(q, dimension)) return false;
        if (value === "all") return true;
        if (dimension === "level") return getPracticeLevel(q) === value;
        if (dimension === "kind") return getPracticeKind(q) === value;
        if (dimension === "category") return q.category === value;
        const solved = statusOf(q) === "solved";
        return value === "solved" ? solved : !solved;
      }).length;
    },
    [passesExcept, statusOf]
  );

  /** Group by category only when the user has not already picked one. */
  const grouped = useMemo(() => {
    if (category !== "all") return null;
    const groups = new Map<PracticeCategory, PracticeQuestion[]>();
    for (const question of visible) {
      const list = groups.get(question.category) ?? [];
      list.push(question);
      groups.set(question.category, list);
    }
    return [...groups.entries()].sort(
      (a, b) => PRACTICE_CATEGORIES.indexOf(a[0]) - PRACTICE_CATEGORIES.indexOf(b[0])
    );
  }, [visible, category]);

  const solvedCount = useMemo(
    () => practiceQuestions.filter((q) => statusOf(q) === "solved").length,
    [statusOf]
  );
  const total = practiceQuestions.length;
  const hasFilters = Boolean(normalisedQuery) || level !== "all" || kind !== "all" || status !== "all" || category !== "all";

  function clearFilters() {
    setQuery("");
    setLevel("all");
    setKind("all");
    setStatus("all");
    setCategory("all");
  }

  function goRandomUnsolved() {
    const pool = visible.filter((q) => statusOf(q) !== "solved");
    const pick = pickRandomQuestion(pool.length > 0 ? pool : visible);
    if (pick) router.push(`/practice/${pick.slug}`);
  }

  const rank = playerReady && player ? getRank(player.xp) : null;

  const solvedByLevel = useMemo(() => {
    const counts: Record<DifficultyLevel, { solved: number; total: number }> = {
      easy: { solved: 0, total: 0 },
      intermediate: { solved: 0, total: 0 },
      advanced: { solved: 0, total: 0 },
    };
    for (const q of practiceQuestions) {
      const l = getPracticeLevel(q);
      counts[l].total += 1;
      if (statusOf(q) === "solved") counts[l].solved += 1;
    }
    return counts;
  }, [statusOf]);

  return (
    <div className="max-w-5xl mx-auto w-full px-4 py-8 flex flex-col gap-5">
      <div>
        <h1 className="text-3xl font-bold text-text">Practice</h1>
        <p className="text-text-muted mt-1">
          {total} standalone problems with instant feedback. Every option is explained — including the
          ones you did not pick.
        </p>
      </div>

      {/* progress + gamification */}
      <Card className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl leading-none">{rank?.current.icon ?? "🌱"}</span>
            <div>
              <p className="font-bold text-text leading-tight">{rank?.current.name ?? "Seedling"}</p>
              <p className="text-xs text-text-muted">
                {player?.xp ?? 0} XP
                {rank?.next && ` · ${rank.next.minXp - (player?.xp ?? 0)} to ${rank.next.name}`}
              </p>
            </div>
          </div>

          {player && player.currentStreak > 0 && (
            <div className="text-center">
              <p className="text-xl font-bold text-warning leading-tight">🔥 {player.currentStreak}</p>
              <p className="text-xs text-text-muted">day streak</p>
            </div>
          )}

          <div className="flex-1 min-w-45">
            <div className="flex justify-between text-xs text-text-muted mb-1">
              <span>Solved</span>
              <span>
                {solvedCount} / {total}
              </span>
            </div>
            <ProgressIndicator progress={total === 0 ? 0 : solvedCount / total} />
            <div className="flex gap-3 mt-2 flex-wrap">
              {(["easy", "intermediate", "advanced"] as DifficultyLevel[]).map((l) => (
                <span key={l} className="flex items-center gap-1.5 text-xs text-text-muted">
                  <DifficultyBadge level={l} />
                  {solvedByLevel[l].solved}/{solvedByLevel[l].total}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap border-t border-border/60 pt-3">
          {BADGES.map((badge) => {
            const earned = Boolean(player?.badges[badge.id]);
            return (
              <Tooltip key={badge.id} content={earned ? badge.name : `${badge.name} — ${badge.requirement}`}>
                <span
                  className={`text-2xl leading-none ${earned ? "" : "grayscale opacity-30"}`}
                  aria-label={earned ? `${badge.name} (unlocked)` : `${badge.name} — locked. ${badge.requirement}`}
                >
                  {badge.icon}
                </span>
              </Tooltip>
            );
          })}
        </div>
      </Card>

      {/* search + filters, sticky so they stay reachable down a long list */}
      <div className="sticky top-14 z-30 -mx-4 px-4 py-3 bg-bg/85 backdrop-blur-md border-b border-border/50 flex flex-col gap-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm" aria-hidden="true">
              ⌕
            </span>
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Escape" && setQuery("")}
              placeholder="Search by title or topic…"
              aria-label="Search questions"
              className="w-full pl-9 pr-16 py-2 rounded-full bg-card border border-border text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
            />
            {!query && (
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-muted border border-border rounded px-1.5 py-0.5 hidden sm:block">
                /
              </kbd>
            )}
          </div>
          <Button size="sm" onClick={goRandomUnsolved}>
            Random
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <PillGroup
            label="Topics"
            options={CATEGORIES}
            value={category}
            onChange={setCategory}
            countFor={(option) => countBy("category", option)}
          />
          <div className="flex gap-x-4 gap-y-2 flex-wrap">
            <PillGroup
              label="Levels"
              options={LEVELS}
              value={level}
              onChange={setLevel}
              countFor={(option) => countBy("level", option)}
            />
            <PillGroup
              label="Types"
              options={KINDS}
              value={kind}
              onChange={setKind}
              countFor={(option) => countBy("kind", option)}
            />
            <PillGroup
              label="Status"
              options={STATUSES}
              value={status}
              onChange={setStatus}
              countFor={(option) => countBy("status", option)}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <p className="text-text-muted" aria-live="polite">
          {visible.length === total ? `${total} questions` : `${visible.length} of ${total} questions`}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-primary hover:underline text-sm font-medium"
          >
            Clear filters
          </button>
        )}
      </div>

      {visible.length === 0 ? (
        <Card className="text-center py-12 flex flex-col items-center gap-3">
          <span className="text-4xl" aria-hidden="true">
            🔍
          </span>
          <p className="font-semibold text-text">No questions match</p>
          <p className="text-sm text-text-muted max-w-sm">
            {status === "solved"
              ? "You have not solved anything matching these filters yet."
              : "Try a different search term, or widen the filters."}
          </p>
          <Button size="sm" variant="secondary" onClick={clearFilters}>
            Clear filters
          </Button>
        </Card>
      ) : grouped ? (
        <div className="flex flex-col gap-6">
          {grouped.map(([groupCategory, questions]) => (
            <section key={groupCategory} className="flex flex-col gap-2">
              <h2 className="text-sm font-bold text-text-muted uppercase tracking-wide">
                {groupCategory}
                <span className="ml-2 font-medium normal-case tracking-normal opacity-70">
                  {questions.filter((q) => statusOf(q) === "solved").length}/{questions.length} solved
                </span>
              </h2>
              <div className="flex flex-col gap-2">
                {questions.map((question) => (
                  <QuestionRow key={question.id} question={question} status={statusOf(question)} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {visible.map((question) => (
            <QuestionRow key={question.id} question={question} status={statusOf(question)} />
          ))}
        </div>
      )}
    </div>
  );
}
