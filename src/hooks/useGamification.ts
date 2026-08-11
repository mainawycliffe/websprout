"use client";

import { useCallback, useEffect, useState } from "react";
import { readPlayerRecord, writePlayerRecord } from "@/hooks/useIndexedDB";
import {
  awardXp as applyAward,
  createPlayer,
  type AwardOutcome,
  type PlayerRecord,
  type XpEvent,
} from "@/lib/gamification";

/**
 * One shared player record for the whole app.
 *
 * `useState` alone would give every hook instance its own copy, so the header
 * rank chip would keep showing a stale rank after the practice runner awarded
 * XP. Instead the record lives module-level and instances subscribe to it.
 */
let cachedPlayer: PlayerRecord | null = null;
const subscribers = new Set<(player: PlayerRecord) => void>();

function publish(player: PlayerRecord) {
  cachedPlayer = player;
  for (const notify of subscribers) notify(player);
}

async function loadPlayer(): Promise<PlayerRecord> {
  const stored = await readPlayerRecord<PlayerRecord>();
  return stored ?? createPlayer();
}

/**
 * Every XP write funnels through this one chain — two awards racing on the same
 * single-row record would otherwise read-modify-write over each other.
 *
 * The `.catch` is load-bearing: `.then` on a rejected promise re-propagates the
 * rejection, so without it a single IndexedDB failure would poison the chain and
 * silently disable all XP, streaks and badges for the rest of the session.
 */
let writeChain: Promise<void> = Promise.resolve();

export function useGamification() {
  const [player, setPlayer] = useState<PlayerRecord | null>(cachedPlayer);
  const [isReady, setIsReady] = useState(cachedPlayer !== null);

  useEffect(() => {
    subscribers.add(setPlayer);
    return () => {
      subscribers.delete(setPlayer);
    };
  }, []);

  useEffect(() => {
    if (cachedPlayer) return;
    let cancelled = false;
    loadPlayer()
      .then((loaded) => {
        if (cancelled) return;
        publish(loaded);
        setIsReady(true);
      })
      .catch(() => {
        // Storage unavailable (private mode, quota, eviction). Fall back to an
        // in-memory player so the UI still renders rather than staying blank.
        if (cancelled) return;
        publish(createPlayer());
        setIsReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const refresh = useCallback(async () => {
    const loaded = await loadPlayer();
    publish(loaded);
    return loaded;
  }, []);

  const award = useCallback(async (event: XpEvent): Promise<AwardOutcome | null> => {
    let outcome: AwardOutcome | null = null;

    const run = writeChain
      .then(async () => {
        const current = cachedPlayer ?? (await loadPlayer());
        outcome = applyAward(current, event);
        await writePlayerRecord(outcome.player);
        publish(outcome.player);
      })
      .catch((error) => {
        // Swallow so the chain stays usable for the next award.
        console.error("Failed to award XP:", error);
        outcome = null;
      });

    writeChain = run;
    await run;
    return outcome;
  }, []);

  return { player, isReady, award, refresh };
}
