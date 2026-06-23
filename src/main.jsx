import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Helper to resolve static assets absolute URL based on the Vite base path
const getBaseAssetUrl = (filename) => {
  const base = import.meta.env.BASE_URL || '/';
  let resolvedBase = base;
  if (base.startsWith('.')) {
    const pathname = window.location.pathname;
    const dir = pathname.substring(0, pathname.lastIndexOf('/') + 1);
    resolvedBase = dir + base.slice(1);
  }
  resolvedBase = resolvedBase.replace(/\/+/g, '/');
  return new URL(resolvedBase + filename, window.location.origin).toString();
};

// Register Service Worker for offline capability
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(getBaseAssetUrl('sw.js'))
      .then(reg => console.log('Service Worker registered successfully:', reg.scope))
      .catch(err => console.error('Service Worker registration failed:', err));
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
