import type { DifficultyLevel } from '@/types/lesson';

interface DifficultyBadgeProps {
  level: DifficultyLevel;
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * The level is always spelled out alongside the colour — never colour alone —
 * so it stays readable in greyscale and for colour-blind students.
 */
const LEVEL_STYLES: Record<DifficultyLevel, { label: string; className: string }> = {
  easy: { label: 'Easy', className: 'bg-success-light/30 text-success' },
  intermediate: { label: 'Intermediate', className: 'bg-warning-light/30 text-warning' },
  advanced: { label: 'Advanced', className: 'bg-error-light/30 text-error' },
};

const SIZE_STYLES = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
};

export default function DifficultyBadge({ level, size = 'sm', className = '' }: DifficultyBadgeProps) {
  const style = LEVEL_STYLES[level];

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold whitespace-nowrap ${style.className} ${SIZE_STYLES[size]} ${className}`}
    >
      {style.label}
    </span>
  );
}
