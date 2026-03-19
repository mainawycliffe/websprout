"use client";

import { motion } from "motion/react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = "",
  hoverable = false,
  onClick,
}: CardProps) {
  return (
    <motion.div
      whileHover={hoverable ? { y: -4, boxShadow: "var(--shadow-card-hover)" } : undefined}
      className={`
        bg-card rounded-[var(--radius-lg)] p-6
        shadow-[var(--shadow-card)]
        ${hoverable ? "cursor-pointer" : ""}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
