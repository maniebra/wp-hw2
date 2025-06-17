import { type Shape } from '../models/shapes';

const KEY = 'paint-line-shapes';
export const loadShapes = (): Shape[] => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Shape[]) : [];
  } catch {
    return [];
  }
};

export const saveShapes = (shapes: Shape[]) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(shapes));
  } catch {}
};
