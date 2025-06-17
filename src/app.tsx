import React, { useState } from 'react';
import Navbar from './views/components/navbar';
import Canvas from './views/components/canvas';
import Toolbar from './views/components/toolbar';
import Stats from './views/components/stats';
import { useCanvasVM } from './viewmodels/canvas-vm';
import { type ShapeType } from './models/shapes';

export default function APP() {
  const [tool, setTool] = useState<ShapeType | 'erase'>('circle');
  const vm = useCanvasVM();

  return (
    <div
      style={{ 
        height: '100vh',
        width: '100vw',
        background: '#111',
        color: '#fff',
        fontFamily: 'sans-serif',
        display: 'flex',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', width: '95.5vw', height: '97%'}}>
        <Navbar />
        <div style={{ display: 'flex', flex: 1 }}>
          <Canvas vm={vm} tool={tool} />
          <Toolbar tool={tool} setTool={setTool} />
        </div>
        <Stats vm={vm} />
      </div>
    </div>
   );
}
