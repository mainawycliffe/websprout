"use client";

import { motion } from "motion/react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "success";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-linear-to-r from-(--color-gradient-start) to-(--color-gradient-end) text-white hover:opacity-90 shadow-card",
  secondary: "bg-secondary/10 text-secondary border border-secondary/30 hover:bg-secondary/20",
  ghost: "bg-transparent text-text-muted hover:bg-border/40 hover:text-text",
  success: "bg-success text-white hover:bg-success/90 shadow-card",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-sm rounded-full",
  md: "px-5 py-2.5 text-base rounded-full",
  lg: "px-7 py-3.5 text-lg rounded-full",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  disabled,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      className={`
        inline-flex items-center justify-center gap-2
        font-semibold transition-all cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
