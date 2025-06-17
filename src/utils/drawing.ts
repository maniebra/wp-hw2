import { type Shape } from '../models/shapes';

export const drawShapes = (
  ctx: CanvasRenderingContext2D,
  shapes: Shape[],
): void => {
  const { width, height } = ctx.canvas;
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;

  shapes.forEach((s) => {
    ctx.beginPath();
    switch (s.type) {
      case 'circle':
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        break;
      case 'square':
        ctx.rect(s.x - s.size / 2, s.y - s.size / 2, s.size, s.size);
        break;
      case 'triangle':
        ctx.moveTo(s.x, s.y - s.size / 2);
        ctx.lineTo(s.x - s.size / 2, s.y + s.size / 2);
        ctx.lineTo(s.x + s.size / 2, s.y + s.size / 2);
        ctx.closePath();
        break;
    }
    ctx.stroke();
  });
};
