import React, { useEffect, useRef } from 'react';
import { drawShapes } from '../../utils/drawing';
import { type ShapeType } from '../../models/shapes';
import { useCanvasVM } from '../../viewmodels/canvas-vm';


interface Props {
  vm: ReturnType<typeof useCanvasVM>;
  tool: ShapeType | 'erase';
}

export default function Canvas({ vm, tool }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  const repaint = () => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawShapes(ctx, vm.shapes);
  };

  // fit to parent + redraw on resize
  useEffect(() => {
    const canvas = ref.current!;
    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        repaint();
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(repaint, [vm.shapes]);

  // click to draw / erase
  useEffect(() => {
    const canvas = ref.current!;
    const handler = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      tool === 'erase' ? vm.removeAt(x, y) : vm.add(tool as ShapeType, x, y);
    };
    canvas.addEventListener('click', handler);
    return () => canvas.removeEventListener('click', handler);
  }, [tool, vm]);

  return <canvas ref={ref} style={{ flex: 1, background: 'transparent' }} />;
}
