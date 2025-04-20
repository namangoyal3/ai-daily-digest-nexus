
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Ensure page loads at top position on route changes
window.onbeforeunload = function() {
  window.scrollTo(0, 0);
};

// Handle anchor links for smooth scrolling to sections
document.addEventListener('DOMContentLoaded', function() {
  // Add event listeners for anchor links
  const handleAnchorLinks = () => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([role="tab"])');
    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
          const headerOffset = 80; // Adjust based on header height
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };
  
  // Initial setup
  handleAnchorLinks();
  
  // Re-apply on route changes (for SPA)
  const observer = new MutationObserver(handleAnchorLinks);
  observer.observe(document.body, { childList: true, subtree: true });
});

// Create root and render app
const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<App />);
} else {
  console.error("Could not find root element");
}
