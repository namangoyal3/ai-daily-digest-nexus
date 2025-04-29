
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function FloatingSubscribeButton() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const subscribeSection = document.getElementById('subscribe-section');
    const earlySubscribeSection = document.querySelector('.bg-gradient-to-r.from-\\[\\#9b87f5\\].to-\\[\\#7c3aed\\].py-12');
    
    const handleScroll = () => {
      if (!subscribeSection && !earlySubscribeSection) return;
      
      let isSubscribeSectionOutOfView = true;
      
      if (subscribeSection) {
        const subscribeRect = subscribeSection.getBoundingClientRect();
        // Only show button when subscribe section is out of view (either above or below viewport)
        isSubscribeSectionOutOfView = subscribeRect.top > window.innerHeight || subscribeRect.bottom < 0;
      }
      
      let isEarlySubscribeSectionOutOfView = true;
      
      if (earlySubscribeSection) {
        const earlySubscribeRect = earlySubscribeSection.getBoundingClientRect();
        isEarlySubscribeSectionOutOfView = earlySubscribeRect.top > window.innerHeight || earlySubscribeRect.bottom < 0;
      }
      
      setIsVisible(isSubscribeSectionOutOfView && isEarlySubscribeSectionOutOfView);
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const scrollToSubscribe = () => {
    // Check if we're on the AI Daily Digest page
    if (location.pathname === '/ai-digest') {
      // Find the early subscribe section
      const earlySubscribeSection = document.querySelector('.bg-gradient-to-r.from-\\[\\#9b87f5\\].to-\\[\\#7c3aed\\].py-12');
      
      if (earlySubscribeSection) {
        earlySubscribeSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
      } else {
        // Fallback to the original subscribe section if early section not found
        const subscribeSection = document.getElementById('subscribe-section');
        if (subscribeSection) {
          subscribeSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
          });
        }
      }
    } else {
      // If we're not on the AI Digest page, navigate to it and set state to scroll
      navigate('/ai-digest', { 
        state: { scrollToEarlySubscribe: true } 
      });
    }
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
        className="rounded-full bg-gradient-to-r from-aiblue to-aipurple hover:from-aiblue-dark hover:to-aipurple-dark text-white font-medium px-6 py-5 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        aria-label="Subscribe to AI Daily Digest newsletter"
      >
        <span>Subscribe Now</span>
        <ArrowUp className="ml-2 h-4 w-4 animate-bounce" />
      </Button>
    </div>
  );
}
