
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Ensure page loads at top position
window.onbeforeunload = function() {
  window.scrollTo(0, 0);
};

// Create root and render app
const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<App />);
} else {
  console.error("Could not find root element");
}
