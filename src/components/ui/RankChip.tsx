"use client";

import Link from "next/link";
import { useGamification } from "@/hooks/useGamification";
import { getRank } from "@/lib/gamification";

/**
 * Compact rank + XP indicator for the header. Renders nothing until the player
 * record has loaded, so the header never flashes a wrong rank.
 */
export default function RankChip() {
  const { player, isReady } = useGamification();

  if (!isReady || !player) return null;

  const rank = getRank(player.xp);

  return (
    <Link
      href="/practice"
      className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors"
      title={
        rank.next
          ? `${player.xp} XP — ${rank.next.minXp - player.xp} to ${rank.next.name}`
          : `${player.xp} XP — top rank`
      }
    >
      <span className="text-base leading-none">{rank.current.icon}</span>
      <span className="flex flex-col gap-0.5">
        <span className="text-xs font-semibold text-text leading-none">{rank.current.name}</span>
        <span className="block w-16 h-1 rounded-full bg-border overflow-hidden">
          <span
            className="block h-full rounded-full bg-linear-to-r from-(--color-gradient-start) to-(--color-gradient-end)"
            style={{ width: `${Math.round(rank.progress * 100)}%` }}
          />
        </span>
      </span>
      {player.currentStreak > 1 && (
        <span className="text-xs font-semibold text-warning" title={`${player.currentStreak}-day streak`}>
          🔥{player.currentStreak}
        </span>
      )}
    </Link>
  );
}
