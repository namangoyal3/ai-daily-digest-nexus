
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Promotion {
  id: string;
  code: string;
  message: string;
  isActive: boolean;
}

export default function PromotionBanner() {
  const [activePromotion, setActivePromotion] = useState<Promotion | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const storedPromotion = localStorage.getItem('activePromotion');
    if (storedPromotion) {
      setActivePromotion(JSON.parse(storedPromotion));
    }
  }, []);

  if (!activePromotion || !isVisible) {
    return null;
  }

  return (
    <div className="bg-aiblue text-white py-2 px-4 flex items-center justify-center relative animate-fade-in">
      <p className="text-center text-sm md:text-base">{activePromotion.message}</p>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 text-white hover:text-white/80"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
