import React from 'react';
import { Circle as CircleIcon, Square as SquareIcon, Triangle as TriangleIcon, Eraser } from 'lucide-react';
import { type ShapeType } from '../../models/shapes';

interface Props {
  tool: ShapeType | 'erase';
  setTool: (t: ShapeType | 'erase') => void;
}

export default function Toolbar({ tool, setTool }: Props) {
  const btn = (t: string) => ({
    margin: '0.5rem',
    padding: '0.5rem 0.75rem',
    border: tool === t ? '2px solid #00aaff' : '1px solid #555',
    background: 'transparent',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '0.25rem',
    cursor: 'pointer',
    width: '90%',
  });

  const label: React.CSSProperties = { fontSize: '0.7rem' };

  return (
    <aside
      style={{
        width: '130px',
        borderLeft: '1px solid #444',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <button style={btn('circle')} onClick={() => setTool('circle')}>
        <CircleIcon size={20} />
        <span style={label}>Circle</span>
      </button>
      <button style={btn('square')} onClick={() => setTool('square')}>
        <SquareIcon size={20} />
        <span style={label}>Square</span>
      </button>
      <button style={btn('triangle')} onClick={() => setTool('triangle')}>
        <TriangleIcon size={20} />
        <span style={label}>Triangle</span>
      </button>
      <button style={btn('erase')} onClick={() => setTool('erase')}>
        <Eraser size={20} />
        <span style={label}>Erase</span>
      </button>
    </aside>
  );
}
