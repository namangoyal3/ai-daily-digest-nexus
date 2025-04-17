
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
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

interface Promotion {
  id: string;
  code: string;
  message: string;
  isActive: boolean;
}

export default function PromotionsManager() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [newCode, setNewCode] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  const generateUniqueId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

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
      id: generateUniqueId(),
      code: newCode,
      message: newMessage,
      isActive: false,
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
        // Deactivate other promotions when activating a new one
        if (!promo.isActive) {
          return { ...promo, isActive: true };
        }
        return { ...promo, isActive: false };
      }
      return promo.isActive ? { ...promo, isActive: false } : promo;
    }));

    localStorage.setItem('activePromotion', JSON.stringify(
      promotions.find(p => p.id === id && !p.isActive)
    ));
  };

  const deletePromotion = (id: string) => {
    setPromotions(promotions.filter(promo => promo.id !== id));
    toast({
      title: "Success",
      description: "Promotion deleted successfully",
    });
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
                <div>
                  <h3 className="font-semibold">{promotion.code}</h3>
                  <p className="text-sm text-muted-foreground">
                    {promotion.message}
                  </p>
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
                    onClick={() => deletePromotion(promotion.id)}
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
