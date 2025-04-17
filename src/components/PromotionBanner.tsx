
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Promotion {
  id: string;
  code: string;
  message: string;
  isActive: boolean;
  backgroundColor: string;
  textMoving: boolean;
  animationSpeed: number;
}

export default function PromotionBanner() {
  const [activePromotion, setActivePromotion] = useState<Promotion | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const storedPromotion = localStorage.getItem('activePromotion');
    const storedAnimationSettings = localStorage.getItem('animationSettings');
    
    if (storedPromotion) {
      const promotion = JSON.parse(storedPromotion);
      
      // If we have global animation settings, use those for the speed
      if (storedAnimationSettings) {
        const animationSettings = JSON.parse(storedAnimationSettings);
        if (animationSettings.textAnimationSpeed) {
          promotion.animationSpeed = animationSettings.textAnimationSpeed;
        }
      }
      
      setActivePromotion(promotion);
    }
  }, []);

  if (!activePromotion || !isVisible) {
    return null;
  }

  return (
    <div 
      className={cn(
        "py-2 px-4 flex items-center justify-center relative",
        activePromotion.textMoving && "overflow-hidden"
      )}
      style={{ backgroundColor: activePromotion.backgroundColor }}
    >
      <p 
        className={cn(
          "text-white text-center text-sm md:text-base",
          activePromotion.textMoving && "whitespace-nowrap"
        )}
        style={{
          animation: activePromotion.textMoving 
            ? `slide ${activePromotion.animationSpeed}s linear infinite` 
            : "none"
        }}
      >
        {activePromotion.message}
      </p>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 text-white hover:text-white/80"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
      </Button>

      <style>
        {`
          @keyframes slide {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </div>
  );
}
