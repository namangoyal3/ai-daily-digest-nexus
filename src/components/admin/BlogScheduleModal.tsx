
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ScheduleConfig, saveScheduleConfig, getScheduleConfig } from "@/lib/schedulingService";
import { toast } from "sonner";

interface BlogScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DAYS_OF_WEEK = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

const CATEGORIES = ["AI Trends", "Deep Learning", "AI Ethics", "Machine Learning", "AI Applications"];

export default function BlogScheduleModal({ open, onOpenChange }: BlogScheduleModalProps) {
  const [config, setConfig] = useState<ScheduleConfig>(getScheduleConfig());

  // Reset to saved config when modal opens
  useEffect(() => {
    if (open) {
      setConfig(getScheduleConfig());
    }
  }, [open]);

  const handleFrequencyChange = (value: string) => {
    setConfig({
      ...config,
      frequency: value as 'daily' | 'weekly' | 'monthly',
      // Reset related fields
      daysOfWeek: value === 'weekly' ? [1] : undefined, // Default to Monday
      dayOfMonth: value === 'monthly' ? 1 : undefined, // Default to 1st
    });
  };

  const toggleDayOfWeek = (day: number) => {
    const newDays = config.daysOfWeek ? [...config.daysOfWeek] : [];
    
    if (newDays.includes(day)) {
      // Remove day if it's the only day, don't allow empty selection
      if (newDays.length > 1) {
        setConfig({
          ...config,
          daysOfWeek: newDays.filter(d => d !== day),
        });
      }
    } else {
      setConfig({
        ...config,
        daysOfWeek: [...newDays, day],
      });
    }
  };
  
  const toggleCategory = (category: string) => {
    const newCategories = [...config.categories];
    
    if (newCategories.includes(category)) {
      // Don't allow empty selection
      if (newCategories.length > 1) {
        setConfig({
          ...config,
          categories: newCategories.filter(c => c !== category),
        });
      }
    } else {
      setConfig({
        ...config,
        categories: [...newCategories, category],
      });
    }
  };

  const handleSave = () => {
    saveScheduleConfig(config);
    toast.success("Schedule configuration saved", {
      description: config.isActive 
        ? "Automatic blog generation has been activated" 
        : "Schedule settings saved but not activated",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Configure Publication Schedule</DialogTitle>
          <DialogDescription>
            Set up when to automatically generate and publish blog posts
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="schedule-active">Enable automatic publishing</Label>
            <Switch 
              id="schedule-active" 
              checked={config.isActive}
              onCheckedChange={(checked) => setConfig({ ...config, isActive: checked })}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="schedule-frequency">Frequency</Label>
              <Select 
                value={config.frequency} 
                onValueChange={handleFrequencyChange}
              >
                <SelectTrigger id="schedule-frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="schedule-time">Time (24h)</Label>
              <Input 
                id="schedule-time" 
                type="time" 
                value={config.time}
                onChange={(e) => setConfig({ ...config, time: e.target.value })}
              />
            </div>
          </div>
          
          {config.frequency === "weekly" && (
            <div className="space-y-2">
              <Label>Days of week</Label>
              <div className="grid grid-cols-7 gap-2">
                {DAYS_OF_WEEK.map((day) => (
                  <div key={day.value} className="flex flex-col items-center">
                    <Checkbox 
                      id={`day-${day.value}`}
                      checked={config.daysOfWeek?.includes(day.value)}
                      onCheckedChange={() => toggleDayOfWeek(day.value)}
                      className="mb-1"
                    />
                    <Label 
                      htmlFor={`day-${day.value}`}
                      className="text-xs"
                    >
                      {day.label.substring(0, 3)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {config.frequency === "monthly" && (
            <div className="space-y-2">
              <Label htmlFor="day-of-month">Day of month</Label>
              <Input 
                id="day-of-month"
                type="number" 
                min={1} 
                max={31} 
                value={config.dayOfMonth || 1}
                onChange={(e) => setConfig({ 
                  ...config, 
                  dayOfMonth: Math.min(31, Math.max(1, parseInt(e.target.value) || 1)) 
                })}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label>Content categories</Label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category}`}
                    checked={config.categories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  />
                  <Label htmlFor={`category-${category}`}>{category}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save configuration</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
