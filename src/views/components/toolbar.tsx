import React from 'react';
import { Circle as CircleIcon, Square as SquareIcon, Triangle as TriangleIcon, SaveIcon, UploadIcon, Eraser } from 'lucide-react';
import { type ShapeType } from '../../models/shapes';

interface Props {
  tool: ShapeType | 'erase';
  setTool: (t: ShapeType | 'erase') => void;
  onSave: () => void;
  onLoad: () => void;
}

export default function Toolbar({ tool, setTool, onSave, onLoad }: Props) {
  const btn = (t?: string) => ({
    padding: '0.5rem 0.75rem',
    border: t ? (tool === t ? '2px solid #00aaff' : '1px solid #555') : '1px solid #555',
    background: 'transparent',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '0.25rem',
    cursor: 'pointer',
    width: '80%',
  });

  const label: React.CSSProperties = { fontSize: '0.7rem' };

  return (
    <aside
      style={{
        backgroundColor: '#222',
        borderRadius: "1rem",
        width: '100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <button style={btn('circle')} onClick={() => setTool('circle')}>
        <CircleIcon size={16} />
        <span style={label}>Circle</span>
      </button>
      <button style={btn('square')} onClick={() => setTool('square')}>
        <SquareIcon size={16} />
        <span style={label}>Square</span>
      </button>
      <button style={btn('triangle')} onClick={() => setTool('triangle')}>
        <TriangleIcon size={16} />
        <span style={label}>Triangle</span>
      </button>
      <button style={btn('erase')} onClick={() => setTool('erase')}>
        <Eraser size={16} />
        <span style={label}>Erase</span>
      </button>

      <div style={{ width: '70%', borderTop: '1px solid #555', margin: '0.5rem 0' }} />

      <button style={btn()} onClick={onSave}>
        <SaveIcon size={20} />
        <span style={label}>Save</span>
      </button>
      <button style={btn()} onClick={onLoad}>
        <UploadIcon size={20} />
        <span style={label}>Load</span>
      </button>
    </aside>
  );
}
