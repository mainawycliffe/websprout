"use client";

import { motion } from "motion/react";
import type { DocLink } from "@/types/lesson";

interface DocLinksProps {
  links: DocLink[];
}

const typeLabels: Record<string, string> = {
  "html-element": "HTML",
  "html-attribute": "Attr",
  "html-concept": "HTML",
  "css-property": "CSS",
  "css-selector": "CSS",
  "css-concept": "CSS",
};

function isHtmlType(type?: string) {
  return type === "html-element" || type === "html-attribute" || type === "html-concept";
}

export default function DocLinks({ links }: DocLinksProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-2"
    >
      <div className="flex items-center gap-1.5 text-text-muted">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        <span className="text-xs font-semibold">Learn more on MDN</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => {
          const html = isHtmlType(link.type);
          return (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium
                rounded-[var(--radius-sm)] border transition-colors duration-150
                ${
                  html
                    ? "border-primary/20 text-primary/80 hover:bg-primary/5 hover:text-primary"
                    : "border-secondary/20 text-secondary/80 hover:bg-secondary/5 hover:text-secondary"
                }
              `}
            >
              {link.type && (
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    html ? "text-primary/50" : "text-secondary/50"
                  }`}
                >
                  {typeLabels[link.type]}
                </span>
              )}
              {link.label}
            </a>
          );
        })}
      </div>
    </motion.div>
  );
}
