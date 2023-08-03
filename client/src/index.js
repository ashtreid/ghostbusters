import App from './App';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);