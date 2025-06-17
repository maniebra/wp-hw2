import { useMemo } from 'react';
import { type Shape } from '../models/shapes';

export function useStatsVM(shapes: Shape[]) {
  return useMemo(() => {
    const counts = {
      circle: 0,
      square: 0,
      triangle: 0,
    } as Record<string, number>;

    shapes.forEach((s) => (counts[s.type] += 1));
    return counts;
  }, [shapes]);
}
