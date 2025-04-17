
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { AnimationSettings } from '@/types/contentTypes';
import { Zap } from 'lucide-react';

export default function AnimationSettingsManager() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<AnimationSettings>({
    textAnimationSpeed: 10
  });
  const [isEditing, setIsEditing] = useState(false);
  const [draftSettings, setDraftSettings] = useState<AnimationSettings>(settings);

  useEffect(() => {
    const storedSettings = localStorage.getItem('animationSettings');
    if (storedSettings) {
      try {
        const parsedSettings = JSON.parse(storedSettings);
        setSettings(parsedSettings);
        setDraftSettings(parsedSettings);
      } catch (error) {
        console.error("Error parsing animation settings:", error);
      }
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setSettings(draftSettings);
    localStorage.setItem('animationSettings', JSON.stringify(draftSettings));
    setIsEditing(false);
    
    // Force update on any existing active promotion
    const storedPromotion = localStorage.getItem('activePromotion');
    if (storedPromotion) {
      try {
        const promotion = JSON.parse(storedPromotion);
        promotion.animationSpeed = draftSettings.textAnimationSpeed;
        localStorage.setItem('activePromotion', JSON.stringify(promotion));
      } catch (error) {
        console.error("Error updating promotion with new animation speed:", error);
      }
    }
    
    toast({
      title: "Animation Settings Updated",
      description: "Your changes have been saved successfully."
    });
  };

  const handleCancel = () => {
    setDraftSettings(settings);
    setIsEditing(false);
  };

  const handleSpeedChange = (value: string) => {
    const speed = parseFloat(value);
    if (!isNaN(speed) && speed > 0) {
      setDraftSettings(prev => ({
        ...prev,
        textAnimationSpeed: speed,
      }));
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Animation Settings</CardTitle>
        <div className="flex space-x-2">
          {!isEditing ? (
            <Button size="sm" onClick={handleEdit}>Edit</Button>
          ) : (
            <>
              <Button size="sm" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save
              </Button>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="text-animation-speed" className="flex items-center">
              <Zap className="h-4 w-4 mr-2 text-yellow-500" />
              Text Animation Speed
            </Label>
            <span className="text-sm font-medium">
              {isEditing ? draftSettings.textAnimationSpeed : settings.textAnimationSpeed}s
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <Input
              id="text-animation-speed-input"
              type="number"
              min="0.1"
              step="0.1"
              value={isEditing ? draftSettings.textAnimationSpeed : settings.textAnimationSpeed}
              onChange={(e) => handleSpeedChange(e.target.value)}
              disabled={!isEditing}
              className="w-24"
            />
            <span className="text-sm">seconds</span>
          </div>

          <p className="text-xs text-muted-foreground">
            Controls the speed of text animations across the site. Lower values = faster animation.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
