"use client";

import { memo, useEffect, useRef, useState } from "react";

interface HtmlPreviewProps {
  html: string;
  className?: string;
}

const HtmlPreview = memo(function HtmlPreview({
  html,
  className = "",
}: HtmlPreviewProps) {
  const [debouncedHtml, setDebouncedHtml] = useState(html);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setDebouncedHtml(html), 500);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [html]);

  const srcdoc = `<!DOCTYPE html><html><head><style>body{font-family:system-ui,-apple-system,sans-serif;padding:16px;margin:0;color:#1e293b;font-size:16px;line-height:1.6;}</style></head><body>${debouncedHtml}</body></html>`;

  return (
    <div
      className={`rounded-[var(--radius-md)] overflow-hidden shadow-card ${className}`}
    >
      <div className="flex items-center px-4 py-2 bg-bg-warm text-xs text-text-muted border-b border-border">
        <span>PREVIEW</span>
      </div>
      <div className="bg-white min-h-[120px]">
        <iframe
          title="HTML Preview"
          sandbox="allow-same-origin"
          srcDoc={srcdoc}
          className="w-full min-h-[120px] border-0"
          style={{ height: "200px" }}
        />
      </div>
    </div>
  );
});

export default HtmlPreview;
