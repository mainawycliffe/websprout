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
  primary: "bg-primary text-white hover:bg-primary-dark shadow-card",
  secondary: "bg-secondary text-white hover:bg-secondary/90 shadow-card",
  ghost: "bg-transparent text-text hover:bg-border/50",
  success: "bg-success text-white hover:bg-success/90 shadow-card",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm rounded-[var(--radius-sm)]",
  md: "px-5 py-2.5 text-base rounded-[var(--radius-md)]",
  lg: "px-7 py-3.5 text-lg rounded-[var(--radius-lg)]",
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
        font-semibold transition-colors cursor-pointer
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
