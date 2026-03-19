"use client";

import { useEffect, useRef, useState, startTransition } from "react";
import { parseHtml } from "@/lib/html-parser";
import { validateTags } from "@/lib/tag-validator";
import type { TagNode, ValidationError } from "@/types/tag-builder";

interface ValidationResult {
  parsedTree: TagNode[];
  errors: ValidationError[];
}

const EMPTY_RESULT: ValidationResult = { parsedTree: [], errors: [] };

export function useCodeValidation(code: string, debounceMs = 400) {
  const [result, setResult] = useState<ValidationResult>(EMPTY_RESULT);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      if (!code.trim()) {
        setResult(EMPTY_RESULT);
        return;
      }
      const tree = parseHtml(code);
      const errs = validateTags(tree);
      startTransition(() => {
        setResult({ parsedTree: tree, errors: errs });
      });
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [code, debounceMs]);

  return result;
}
