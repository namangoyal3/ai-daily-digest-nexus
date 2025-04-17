
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

export default function FloatingSubscribeButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const heroButton = document.getElementById('hero-subscribe');
    
    const handleScroll = () => {
      if (!heroButton) return;
      
      const heroButtonRect = heroButton.getBoundingClientRect();
      const isHeroButtonOutOfView = heroButtonRect.bottom < 0;
      
      setIsVisible(isHeroButtonOutOfView);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSubscribe = () => {
    document.getElementById('subscribe')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
    }`}>
      <Button 
        onClick={scrollToSubscribe}
        className="rounded-full bg-gradient-to-r from-aiblue to-aipurple hover:from-aiblue-dark hover:to-aipurple-dark text-white font-medium px-6 py-5 shadow-lg"
      >
        Subscribe Now
        <ArrowUp className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
