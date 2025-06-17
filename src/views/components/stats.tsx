import React from 'react';
import { useStatsVM } from '../../viewmodels/stats-vm';
import { useCanvasVM } from '../../viewmodels/canvas-vm';

interface Props {
  vm: ReturnType<typeof useCanvasVM>;
}

export default function Stats({ vm }: Props) {
  const c = useStatsVM(vm.shapes);
  return (
    <footer className="p-2 border-t border-neutral-700 text-center text-sm">
      Circles: {c.circle} | Squares: {c.square} | Triangles: {c.triangle}
    </footer>
  );
}
