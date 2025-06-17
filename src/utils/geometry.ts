import { type Shape } from '../models/shapes';

export const pointInShape = (shape: Shape, x: number, y: number): boolean => {
  const dx = x - shape.x;
  const dy = y - shape.y;
  switch (shape.type) {
    case 'circle':
      return Math.hypot(dx, dy) <= shape.size;
    case 'square':
      return Math.abs(dx) <= shape.size / 2 && Math.abs(dy) <= shape.size / 2;
    case 'triangle': {
      const p0 = { x: shape.x, y: shape.y - shape.size / 2 };
      const p1 = { x: shape.x - shape.size / 2, y: shape.y + shape.size / 2 };
      const p2 = { x: shape.x + shape.size / 2, y: shape.y + shape.size / 2 };
      const det = (p1.y - p2.y) * (p0.x - p2.x) + (p2.x - p1.x) * (p0.y - p2.y);
      const s = ((p1.y - p2.y) * (x - p2.x) + (p2.x - p1.x) * (y - p2.y)) / det;
      const t = ((p2.y - p0.y) * (x - p2.x) + (p0.x - p2.x) * (y - p2.y)) / det;
      const u = 1 - s - t;
      return s >= 0 && t >= 0 && u >= 0;
    }
    default:
      return false;
  }
};
