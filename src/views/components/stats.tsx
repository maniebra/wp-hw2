import React from 'react';
import { useStatsVM } from '../../viewmodels/stats-vm';
import { useCanvasVM } from '../../viewmodels/canvas-vm';

interface Props {
  vm: ReturnType<typeof useCanvasVM>;
}

export default function Stats({ vm }: Props) {
  const c = useStatsVM(vm.shapes);
  return (
    <footer style={{ textAlign: "center", alignItems: "center", backgroundColor: "#222", width: "98vw", margin: "0.5rem", padding: "1.5rem 0.5rem", borderRadius: "1rem" }}>
      Circles: {c.circle} | Squares: {c.square} | Triangles: {c.triangle}
    </footer>
  );
}
