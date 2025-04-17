
import { useState } from "react";
import { Plus, Trash2, MoveHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
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

export default function PromotionsManager() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [newCode, setNewCode] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [selectedColor, setSelectedColor] = useState("#1E3A8A");
  const [textMoving, setTextMoving] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(20);
  const { toast } = useToast();

  const handleAddPromotion = () => {
    if (!newCode || !newMessage) {
      toast({
        title: "Error",
        description: "Please fill in both code and message fields",
        variant: "destructive",
      });
      return;
    }

    const newPromotion: Promotion = {
      id: Math.random().toString(36).substring(2),
      code: newCode,
      message: newMessage,
      isActive: false,
      backgroundColor: selectedColor,
      textMoving: textMoving,
      animationSpeed: animationSpeed
    };

    setPromotions([...promotions, newPromotion]);
    setNewCode("");
    setNewMessage("");
    
    toast({
      title: "Success",
      description: "Promotion added successfully",
    });
  };

  const togglePromotion = (id: string) => {
    setPromotions(promotions.map(promo => {
      if (promo.id === id) {
        if (!promo.isActive) {
          return { ...promo, isActive: true };
        }
        return { ...promo, isActive: false };
      }
      return promo.isActive ? { ...promo, isActive: false } : promo;
    }));

    const activePromo = promotions.find(p => p.id === id && !p.isActive);
    if (activePromo) {
      localStorage.setItem('activePromotion', JSON.stringify({
        ...activePromo,
        isActive: true
      }));
    } else {
      localStorage.removeItem('activePromotion');
    }
  };

  const updatePromotionStyle = (
    id: string, 
    updates: Partial<Pick<Promotion, 'backgroundColor' | 'textMoving' | 'animationSpeed'>>
  ) => {
    setPromotions(promotions.map(promo => {
      if (promo.id === id) {
        return { ...promo, ...updates };
      }
      return promo;
    }));

    if (promotions.find(p => p.id === id)?.isActive) {
      const updatedPromo = promotions.find(p => p.id === id);
      if (updatedPromo) {
        localStorage.setItem('activePromotion', JSON.stringify({
          ...updatedPromo,
          ...updates
        }));
      }
    }
  };

  const handleAnimationSpeedChange = (id: string, value: string) => {
    const speedValue = parseFloat(value);
    if (!isNaN(speedValue) && speedValue > 0) {
      updatePromotionStyle(id, { animationSpeed: speedValue });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Promotions Management</h1>
        <p className="text-muted-foreground">
          Create and manage promotional campaigns and coupon codes
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Promotion</CardTitle>
          <CardDescription>
            Create a new promotional campaign or coupon code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Coupon Code
              </label>
              <Input
                placeholder="e.g., SUMMER2025"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                className="max-w-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Promotion Message
              </label>
              <Input
                placeholder="e.g., Summer Sale! Use code SUMMER2025 for 20% off"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="max-w-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Ribbon Color
              </label>
              <Input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-20 h-10"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Switch
                  checked={textMoving}
                  onCheckedChange={setTextMoving}
                />
                <span className="text-sm">Enable text movement</span>
              </div>
              {textMoving && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Animation Speed (seconds)
                  </label>
                  <div className="flex items-center gap-4">
                    <Input 
                      type="number" 
                      min="0.1"
                      step="0.1"
                      value={animationSpeed}
                      onChange={(e) => setAnimationSpeed(parseFloat(e.target.value) || 20)}
                      className="w-[100px]"
                    />
                    <span className="text-sm">seconds</span>
                  </div>
                </div>
              )}
            </div>
            <Button onClick={handleAddPromotion}>
              <Plus className="h-4 w-4 mr-2" />
              Add Promotion
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {promotions.map((promotion) => (
          <Card key={promotion.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">{promotion.code}</h3>
                  <p className="text-sm text-muted-foreground">
                    {promotion.message}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <label className="text-sm">Color:</label>
                      <Input
                        type="color"
                        value={promotion.backgroundColor}
                        onChange={(e) => updatePromotionStyle(promotion.id, { backgroundColor: e.target.value })}
                        className="w-10 h-10"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <MoveHorizontal className="h-4 w-4" />
                      <Switch
                        checked={promotion.textMoving}
                        onCheckedChange={(checked) => 
                          updatePromotionStyle(promotion.id, { textMoving: checked })
                        }
                      />
                    </div>
                    {promotion.textMoving && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Speed:</span>
                        <Input
                          type="number"
                          min="0.1"
                          step="0.1"
                          value={promotion.animationSpeed}
                          onChange={(e) => handleAnimationSpeedChange(promotion.id, e.target.value)}
                          className="w-[80px]"
                        />
                        <span className="text-sm">s</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={promotion.isActive}
                      onCheckedChange={() => togglePromotion(promotion.id)}
                    />
                    <span className="text-sm">
                      {promotion.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setPromotions(promotions.filter(p => p.id !== promotion.id));
                      if (promotion.isActive) {
                        localStorage.removeItem('activePromotion');
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
