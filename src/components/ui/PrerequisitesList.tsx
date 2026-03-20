"use client";

import Link from "next/link";
import type { Module } from "@/types/lesson";

interface PrerequisitesListProps {
  prerequisites: Module[];
  linked?: boolean;
}

const chipClassName =
  "inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-bg-warm text-text-muted transition-colors";

export default function PrerequisitesList({
  prerequisites,
  linked = false,
}: PrerequisitesListProps) {
  if (prerequisites.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-text-muted">Prerequisites:</span>
      {prerequisites.map((prereq) =>
        linked ? (
          <Link
            key={prereq.id}
            href={`/${prereq.slug}`}
            className={`${chipClassName} hover:bg-primary/10 hover:text-primary`}
          >
            <span>{prereq.icon}</span>
            <span>{prereq.title}</span>
          </Link>
        ) : (
          <span key={prereq.id} className={chipClassName}>
            <span>{prereq.icon}</span>
            <span>{prereq.title}</span>
          </span>
        )
      )}
    </div>
  );
}
