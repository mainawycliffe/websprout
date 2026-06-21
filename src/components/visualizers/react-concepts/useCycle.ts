'use client';

import { useEffect, useState } from 'react';

/**
 * Advances an index 0..count-1, wrapping around, every `ms` milliseconds.
 * Used to drive the looping concept animations (highlight the next node,
 * swap the next page, move to the next timeline phase, …).
 */
export function useCycle(count: number, ms = 1400): number {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (count <= 0) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, ms);
    return () => clearInterval(id);
  }, [count, ms]);

  return index;
}
