"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface LessonCompleteScreenProps {
  lessonTitle: string;
  moduleId: string;
  nextLesson?: { slug: string; title: string };
}

export default function LessonCompleteScreen({
  lessonTitle,
  moduleId,
  nextLesson,
}: LessonCompleteScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center text-center gap-6 py-12"
    >
      <div className="animate-success-pop flex items-center justify-center w-16 h-16 rounded-full bg-success/15 border-2 border-success/30">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 text-success"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-text">Lesson Complete!</h2>
        <p className="text-text-muted">
          You finished <strong className="text-text">{lessonTitle}</strong>
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
        {nextLesson && (
          <Link href={`/${moduleId}/${nextLesson.slug}`}>
            <Button variant="success" size="md">
              Next Lesson &rarr;
            </Button>
          </Link>
        )}
        <Link href={`/${moduleId}`}>
          <Button variant="secondary" size="md">
            Back to Module
          </Button>
        </Link>
        <Link href="/#modules">
          <Button variant="ghost" size="md">
            All Modules
          </Button>
        </Link>
      </div>

      {nextLesson && (
        <p className="text-sm text-text-muted">
          Up next: <strong className="text-text">{nextLesson.title}</strong>
        </p>
      )}
    </motion.div>
  );
}
