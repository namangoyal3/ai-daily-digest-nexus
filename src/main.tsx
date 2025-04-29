
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

// Google Analytics tracking function
function trackPageView() {
  if (window.gtag) {
    window.gtag('config', 'G-SDLMH7Y8ZZ', {
      page_path: window.location.pathname + window.location.search
    });
  }
}

// Create root and render app
const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<App />);
  
  // Track initial page view
  trackPageView();
} else {
  console.error("Could not find root element");
}
