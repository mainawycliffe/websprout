"use client";

import Link from "next/link";

interface HeaderProps {
  title?: string;
  backHref?: string;
  rightContent?: React.ReactNode;
}

export default function Header({ title, backHref, rightContent }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-card/70 backdrop-blur-md border-b border-border/50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {backHref && (
            <Link
              href={backHref}
              className="text-text-muted hover:text-text transition-colors text-lg"
              aria-label="Go back"
            >
              &#8592;
            </Link>
          )}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">&#127793;</span>
            <span className="font-bold text-lg bg-linear-to-r from-(--color-gradient-start) to-(--color-gradient-end) bg-clip-text text-transparent">
              {title ?? "WebSprout"}
            </span>
          </Link>
        </div>
        {rightContent && <div>{rightContent}</div>}
      </div>
    </header>
  );
}
