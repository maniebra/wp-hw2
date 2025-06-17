import { useState, useEffect, useCallback } from 'react';
import { type Shape, type ShapeType } from '../models/shapes';
import { loadShapes, saveShapes } from '../utils/storage';
import { pointInShape } from '../utils/geometry';


const SIZE = 40;
const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

export const useCanvasVM = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);

  // hydrated state
  useEffect(() => setShapes(loadShapes), []);
  // persist
  useEffect(() => saveShapes(shapes), [shapes]);

  const add = useCallback((type: ShapeType, x: number, y: number) => {
    setShapes((prev) => [...prev, { id: uid(), type, x, y, size: SIZE }]);
  }, []);

  const removeAt = useCallback((x: number, y: number) => {
    setShapes((prev) => prev.filter((s) => !pointInShape(s, x, y)));
  }, []);

  return { shapes, add, removeAt } as const;
};
