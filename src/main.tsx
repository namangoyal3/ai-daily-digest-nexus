
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize Google Analytics
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Create root and render app
const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<App />);
} else {
  console.error("Could not find root element");
}
