"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Badge, Rank } from "@/lib/gamification";

export interface XpNotice {
  /** Stable key so re-renders don't restart the animation. */
  id: string;
  xpGained: number;
  newBadges: Badge[];
  rankUp: Rank | null;
}

interface XpToastProps {
  notice: XpNotice | null;
  onDismiss: () => void;
}

/** A rank-up or badge card is worth lingering over; a bare XP pill is not. */
function dismissDelay(notice: XpNotice): number {
  return notice.rankUp || notice.newBadges.length > 0 ? 6000 : 3000;
}

export default function XpToast({ notice, onDismiss }: XpToastProps) {
  // Without this the common XP-only toast has no button and no timer, so it
  // stays pinned over the page for the rest of the session.
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(onDismiss, dismissDelay(notice));
    return () => clearTimeout(timer);
  }, [notice, onDismiss]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 pointer-events-none">
      <AnimatePresence>
        {notice && (
          <motion.div
            key={notice.id}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="flex flex-col items-end gap-2 pointer-events-auto"
          >
            {notice.xpGained > 0 && (
              <button
                type="button"
                onClick={onDismiss}
                aria-label={`Gained ${notice.xpGained} XP. Dismiss.`}
                className="bg-card border border-success-light/50 shadow-(--shadow-float) rounded-full px-4 py-2 text-sm font-bold text-success"
              >
                +{notice.xpGained} XP
              </button>
            )}

            {notice.rankUp && (
              <button
                type="button"
                onClick={onDismiss}
                className="bg-card border border-primary/40 shadow-(--shadow-float) rounded-md px-4 py-3 text-left animate-success-pop max-w-70"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{notice.rankUp.icon}</span>
                  <div>
                    <p className="text-xs text-text-muted">New rank</p>
                    <p className="font-bold text-text">{notice.rankUp.name}</p>
                  </div>
                </div>
              </button>
            )}

            {notice.newBadges.map((badge) => (
              <button
                key={badge.id}
                type="button"
                onClick={onDismiss}
                className="bg-card border border-warning-light/50 shadow-(--shadow-float) rounded-md px-4 py-3 text-left animate-success-pop max-w-70"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{badge.icon}</span>
                  <div>
                    <p className="text-xs text-text-muted">Badge unlocked</p>
                    <p className="font-bold text-text">{badge.name}</p>
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
