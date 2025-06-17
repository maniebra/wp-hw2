import React, { useRef } from 'react';

type Props = {
  name: string;
  setName: (n: string) => void;
  onExport: () => void;
  onImport: (file: File) => void;
};

export default function Navbar({ name, setName, onExport, onImport }: Props) {
  const fileInput = useRef<HTMLInputElement | null>(null);

  return (
    <header
      style={{
        width: "95.75vw",
        backgroundColor: '#222',
        padding: '0.75rem 2rem',
        margin: "0.5rem",
        marginBottom: "1rem",
        borderRadius: '100rem',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.5rem',
      }}
    >
      {/* left: editable name */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontSize: '1rem',
          textAlign: 'left',
          outline: 'none',
        }}
      />

      {/* right: import/export buttons */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={onExport}
          style={{ background: 'transparent', color: '#fff', border: '1px solid #555', padding: '0.25rem 0.5rem' }}
        >
          Export JSON
        </button>
        <button
          onClick={() => fileInput.current?.click()}
          style={{ background: 'transparent', color: '#fff', border: '1px solid #555', padding: '0.25rem 0.5rem' }}
        >
          Import JSON
        </button>
        {/* hidden file chooser */}
        <input
          ref={fileInput}
          type="file"
          accept="application/json"
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onImport(file);
            e.target.value = '';
          }}
        />
      </div>
    </header>
  );
}
