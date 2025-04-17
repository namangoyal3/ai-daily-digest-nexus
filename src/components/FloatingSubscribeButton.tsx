
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";

export default function FloatingSubscribeButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroButton = document.querySelector('#hero-subscribe');
      if (heroButton) {
        const rect = heroButton.getBoundingClientRect();
        setIsVisible(rect.bottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSubscribe = () => {
    document.getElementById('subscribe')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <Button
        onClick={scrollToSubscribe}
        className="rounded-full bg-gradient-to-r from-aiblue to-aipurple hover:from-aiblue-dark hover:to-aipurple-dark text-white font-medium px-8 py-6 text-lg shadow-lg"
      >
        Subscribe Now
      </Button>
    </div>
  );
}
