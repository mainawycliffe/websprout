"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Card from "@/components/ui/Card";
import ProgressIndicator from "@/components/ui/ProgressIndicator";
import { getModule, getPrerequisiteModules } from "@/content/modules";
import PrerequisitesList from "@/components/ui/PrerequisitesList";
import { useIndexedDB } from "@/hooks/useIndexedDB";
import { useEffect, useState } from "react";

const mod = getModule("js-fetch")!;

export default function JsFetchPage() {
  const { isReady, getProgress } = useIndexedDB();
  const [lessonProgress, setLessonProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!isReady) return;
    Promise.all(
      mod.lessons.map(async (lesson) => {
        const progress = await getProgress(lesson.id);
        const total = lesson.steps.length;
        const completed = progress?.completedSteps.length ?? 0;
        return { id: lesson.id, progress: total > 0 ? completed / total : 0 };
      })
    ).then((results) => {
      const map: Record<string, number> = {};
      results.forEach((r) => (map[r.id] = r.progress));
      setLessonProgress(map);
    });
  }, [isReady, getProgress]);

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{mod.icon}</span>
          <h1 className="text-3xl font-bold bg-linear-to-r from-(--color-gradient-start) to-(--color-gradient-end) bg-clip-text text-transparent">
            {mod.title}
          </h1>
        </div>
        <p className="text-text-muted">{mod.description}</p>
        <PrerequisitesList prerequisites={getPrerequisiteModules(mod)} linked />
      </motion.div>
      <div className="flex flex-col gap-4">
        {mod.lessons.map((lesson, i) => {
          const progress = lessonProgress[lesson.id] ?? 0;
          const isComplete = progress === 1;
          return (
            <motion.div key={lesson.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
              <Link href={`/js-fetch/${lesson.slug}`}>
                <Card hoverable>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${isComplete ? "bg-success text-white" : "bg-secondary-light/30 text-secondary"}`}>
                      {isComplete ? "\u2713" : lesson.order}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text">{lesson.title}</h3>
                      <p className="text-sm text-text-muted truncate">{lesson.description}</p>
                    </div>
                    <div className="w-24 flex-shrink-0">
                      <ProgressIndicator progress={progress} size="sm" color="var(--color-secondary)" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
