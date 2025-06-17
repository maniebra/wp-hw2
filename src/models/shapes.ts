export type ShapeType = 'circle' | 'square' | 'triangle';

export interface Shape {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  size: number;
}
