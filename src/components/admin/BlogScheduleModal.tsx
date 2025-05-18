
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getScheduleConfig, setScheduleConfig, ScheduleConfig } from "@/lib/schedulingService";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const scheduleFormSchema = z.object({
  isActive: z.boolean().default(false),
  frequency: z.enum(["daily", "weekly", "monthly"]),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "Time must be in 24-hour format (HH:MM)",
  }),
  daysOfWeek: z.array(z.number().min(0).max(6)).optional(),
  dayOfMonth: z.number().min(1).max(31).optional(),
  categories: z.array(z.string()),
});

type ScheduleFormValues = z.infer<typeof scheduleFormSchema>;

interface BlogScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BlogScheduleModal({ open, onOpenChange }: BlogScheduleModalProps) {
  const [isActive, setIsActive] = useState(false);

  // Categories for blog generation
  const availableCategories = [
    "AI Trends",
    "Deep Learning",
    "AI Ethics",
    "Machine Learning",
    "AI Applications",
    "Computer Vision",
    "Natural Language Processing",
    "Robotics",
  ];

  // Days of the week for weekly scheduling
  const daysOfWeek = [
    { value: 0, label: "Sunday" },
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thursday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
  ];

  // Create form with default values from current config
  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: getScheduleConfig(),
  });

  // Update isActive state when form value changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "isActive") {
        setIsActive(value.isActive as boolean);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  // Initialize isActive state on mount
  useEffect(() => {
    setIsActive(form.getValues("isActive"));
  }, [form]);

  // Update form defaults when modal is opened
  useEffect(() => {
    if (open) {
      const config = getScheduleConfig();
      form.reset(config);
      setIsActive(config.isActive);
    }
  }, [open, form]);

  // Handle form submission
  const onSubmit = (data: ScheduleFormValues) => {
    try {
      // Ensure all required fields are present for ScheduleConfig
      const configToSave: ScheduleConfig = {
        isActive: data.isActive,
        time: data.time,
        frequency: data.frequency,
        categories: data.categories,
        // Include optional fields conditionally
        ...(data.daysOfWeek && { daysOfWeek: data.daysOfWeek }),
        ...(data.dayOfMonth && { dayOfMonth: data.dayOfMonth }),
      };
      
      // Save schedule configuration
      setScheduleConfig(configToSave);
      
      toast.success("Schedule settings saved", {
        description: data.isActive 
          ? "Automatic blog generation has been scheduled" 
          : "Automatic blog generation has been disabled",
      });
      
      // Close the modal
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving schedule:", error);
      toast.error("Failed to save schedule", {
        description: "Please try again",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Blog Publication Schedule</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[75vh]">
          <div className="p-1">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Automated Publishing</FormLabel>
                        <FormDescription>
                          Enable automatic blog post generation on schedule
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                {isActive && (
                  <>
                    <FormField
                      control={form.control}
                      name="frequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Frequency</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time of day (24-hour format)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="14:00"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            The time when blog posts will be generated (in your local time zone)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {form.watch("frequency") === "weekly" && (
                      <FormField
                        control={form.control}
                        name="daysOfWeek"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel className="text-base">Days of the week</FormLabel>
                              <FormDescription>
                                Select which days to publish posts
                              </FormDescription>
                            </div>
                            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                              {daysOfWeek.map((day) => (
                                <FormField
                                  key={day.value}
                                  control={form.control}
                                  name="daysOfWeek"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={day.value}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(day.value)}
                                            onCheckedChange={(checked) => {
                                              const currentValue = field.value || [];
                                              return checked
                                                ? field.onChange([...currentValue, day.value])
                                                : field.onChange(
                                                    currentValue.filter(
                                                      (value) => value !== day.value
                                                    )
                                                  );
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                          {day.label}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {form.watch("frequency") === "monthly" && (
                      <FormField
                        control={form.control}
                        name="dayOfMonth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Day of month</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                max="31"
                                placeholder="1"
                                {...field}
                                onChange={event => field.onChange(parseInt(event.target.value))}
                              />
                            </FormControl>
                            <FormDescription>
                              The day of the month when blog posts will be generated (1-31)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    <FormField
                      control={form.control}
                      name="categories"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-base">Blog Categories</FormLabel>
                            <FormDescription>
                              Select which categories to generate content for
                            </FormDescription>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {availableCategories.map((category) => (
                              <FormField
                                key={category}
                                control={form.control}
                                name="categories"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={category}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(category)}
                                          onCheckedChange={(checked) => {
                                            const currentValue = field.value || [];
                                            return checked
                                              ? field.onChange([...currentValue, category])
                                              : field.onChange(
                                                  currentValue.filter(
                                                    (value) => value !== category
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {category}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" type="button">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save Schedule</Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
