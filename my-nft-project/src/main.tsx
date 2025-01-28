// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Path to your global styles
import App from './App'; // Path to your App component

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
