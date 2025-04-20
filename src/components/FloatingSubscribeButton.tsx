
import { useEffect, useState, memo } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

const FloatingSubscribeButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Use requestAnimationFrame for smoother scroll detection
    let ticking = false;
    const subscribeSection = document.getElementById('subscribe-section');
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!subscribeSection) return;
          
          const subscribeRect = subscribeSection.getBoundingClientRect();
          // Only show button when subscribe section is out of view (either above or below viewport)
          const isSubscribeSectionOutOfView = subscribeRect.top > window.innerHeight || subscribeRect.bottom < 0;
          
          setIsVisible(isSubscribeSectionOutOfView);
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSubscribe = () => {
    const subscribeSection = document.getElementById('subscribe-section');
    subscribeSection?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  };

  return (
    <div 
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isVisible}
    >
      <Button 
        onClick={scrollToSubscribe}
        className="rounded-full bg-gradient-to-r from-aiblue to-aipurple hover:from-aiblue-dark hover:to-aipurple-dark text-white font-medium px-6 py-5 shadow-lg"
        aria-label="Subscribe to AI Daily Digest newsletter"
      >
        Subscribe Now
        <ArrowUp className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(FloatingSubscribeButton);
