import React, { useEffect, useRef } from 'react';
import { drawShapes } from '../../utils/drawing';
import { type ShapeType } from '../../models/shapes';
import { useCanvasVM } from '../../viewmodels/canvas-vm';
import { pointInShape } from '../../utils/geometry';

interface Props {
  vm: ReturnType<typeof useCanvasVM>;
  tool: ShapeType | 'erase';
}

export default function Canvas({ vm, tool }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const dragRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);

  const repaint = () => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawShapes(ctx, vm.shapes);
  };

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
  }, []);

  useEffect(repaint, [vm.shapes]);

  useEffect(() => {
    const canvas = ref.current!;

    const cursorPos = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onMouseDown = (e: MouseEvent) => {
      const { x, y } = cursorPos(e);
      for (let i = vm.shapes.length - 1; i >= 0; i--) {
        const s = vm.shapes[i];
        if (pointInShape(s, x, y)) {
          if (tool === 'erase') {
            vm.removeAt(x, y);
          } else {
            dragRef.current = { id: s.id, offsetX: x - s.x, offsetY: y - s.y };
          }
          return;
        }
      }
      if (tool !== 'erase') vm.add(tool as ShapeType, x, y);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!dragRef.current) return;
      const { x, y } = cursorPos(e);
      const { id, offsetX, offsetY } = dragRef.current;
      vm.updateShapePosition(id, x - offsetX, y - offsetY);
    };

    const endDrag = () => {
      dragRef.current = null;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', endDrag);
    canvas.addEventListener('mouseleave', endDrag);

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', endDrag);
      canvas.removeEventListener('mouseleave', endDrag);
    };
  }, [tool, vm]);

  return (
    <canvas
      ref={ref}
      style={{ 
        flex: 1,
        cursor: tool === 'erase' ? 'not-allowed' : 'pointer',
        borderRadius: '1rem',
        border: '1px solid #555',
        margin: "0 0.5rem"
      }}
    />
  );
}
