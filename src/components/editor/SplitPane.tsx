"use client";

interface SplitPaneProps {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
}

export default function SplitPane({ left, right, className = "" }: SplitPaneProps) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 ${className}`}>
      <div className="min-w-0">{left}</div>
      <div className="min-w-0">{right}</div>
    </div>
  );
}
