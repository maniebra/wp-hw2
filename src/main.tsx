import React from 'react';
import ReactDOM from 'react-dom/client';
import APP from './app';
import "./index.css";

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('No #root element found');

document.documentElement.classList.add('dark');

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <APP />
  </React.StrictMode>
);
