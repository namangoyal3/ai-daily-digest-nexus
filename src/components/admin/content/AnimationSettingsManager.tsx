
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
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
      const parsedSettings = JSON.parse(storedSettings);
      setSettings(parsedSettings);
      setDraftSettings(parsedSettings);
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
      const promotion = JSON.parse(storedPromotion);
      promotion.animationSpeed = draftSettings.textAnimationSpeed;
      localStorage.setItem('activePromotion', JSON.stringify(promotion));
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
          <Slider
            id="text-animation-speed"
            min={1}
            max={20}
            step={0.5}
            value={[isEditing ? draftSettings.textAnimationSpeed : settings.textAnimationSpeed]}
            onValueChange={(value) => {
              setDraftSettings(prev => ({
                ...prev,
                textAnimationSpeed: value[0],
              }));
            }}
            disabled={!isEditing}
            className="py-2"
          />
          <p className="text-xs text-muted-foreground">
            Controls the speed of text animations across the site. Lower values = faster animation.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
