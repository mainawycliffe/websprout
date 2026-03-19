"use client";

interface SliderProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  color?: string;
  disabled?: boolean;
  onChange: (value: number) => void;
}

export default function Slider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = "px",
  color = "var(--color-primary)",
  disabled = false,
  onChange,
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-text-muted">{label}</label>
        <span className="text-sm font-mono font-semibold" style={{ color }}>
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        style={{
          background: `linear-gradient(to right, ${color} 0%, ${color} ${percentage}%, var(--color-border) ${percentage}%, var(--color-border) 100%)`,
        }}
      />
    </div>
  );
}
