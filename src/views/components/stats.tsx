import React from 'react';
import { useStatsVM } from '../../viewmodels/stats-vm';
import { useCanvasVM } from '../../viewmodels/canvas-vm';

interface Props {
  vm: ReturnType<typeof useCanvasVM>;
}

export default function Stats({ vm }: Props) {
  const c = useStatsVM(vm.shapes);
  return (
    <footer style={{ textAlign: "center" }}>
      Circles: {c.circle} | Squares: {c.square} | Triangles: {c.triangle}
    </footer>
  );
}
