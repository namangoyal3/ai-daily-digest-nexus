
// Types for schedule configuration
export interface ScheduleConfig {
  isActive: boolean;
  time: string;
  categories: string[];
  frequency: 'daily' | 'weekly' | 'monthly';
  daysOfWeek?: number[]; // 0-6 for Sunday-Saturday, used for weekly schedule
  dayOfMonth?: number; // 1-31, used for monthly schedule
}

// Default schedule configuration
export const defaultScheduleConfig: ScheduleConfig = {
  isActive: false,
  time: '08:00',
  categories: ['AI Trends', 'Deep Learning'],
  frequency: 'daily',
};

// Get the schedule config from localStorage
export function getScheduleConfig(): ScheduleConfig {
  const storedConfig = localStorage.getItem('blog_schedule_config');
  return storedConfig ? JSON.parse(storedConfig) : defaultScheduleConfig;
}

// Save the schedule config to localStorage
export function saveScheduleConfig(config: ScheduleConfig): void {
  localStorage.setItem('blog_schedule_config', JSON.stringify(config));
}

// Calculate the next scheduled time for blog generation
export function getNextScheduledTime(config: ScheduleConfig): Date {
  const now = new Date();
  const [hours, minutes] = config.time.split(':').map(Number);
  
  const scheduledTime = new Date(now);
  scheduledTime.setHours(hours, minutes, 0, 0);
  
  // If the time today has already passed, schedule for tomorrow
  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }
  
  // Handle weekly schedule
  if (config.frequency === 'weekly' && config.daysOfWeek?.length) {
    // Find the next day that matches our schedule
    let daysToAdd = 0;
    const currentDayOfWeek = scheduledTime.getDay();
    
    // Find the next scheduled day
    for (let i = 0; i < 7; i++) {
      const checkDay = (currentDayOfWeek + i) % 7;
      if (config.daysOfWeek.includes(checkDay)) {
        daysToAdd = i;
        break;
      }
    }
    
    scheduledTime.setDate(scheduledTime.getDate() + daysToAdd);
  }
  
  // Handle monthly schedule
  if (config.frequency === 'monthly' && config.dayOfMonth) {
    scheduledTime.setDate(config.dayOfMonth);
    
    // If this month's day has already passed, move to next month
    if (scheduledTime <= now) {
      scheduledTime.setMonth(scheduledTime.getMonth() + 1);
    }
  }
  
  return scheduledTime;
}

// Initialize scheduling
export function initializeScheduling(onGenerate: () => Promise<void>): () => void {
  let timeoutId: number | undefined;
  
  const scheduleNext = () => {
    const config = getScheduleConfig();
    
    // Clear any existing timeout
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
    
    // If scheduling is not active, don't schedule anything
    if (!config.isActive) {
      return;
    }
    
    const nextTime = getNextScheduledTime(config);
    const timeUntilNext = nextTime.getTime() - Date.now();
    
    // Schedule the next run
    timeoutId = window.setTimeout(async () => {
      // Generate the blog
      await onGenerate();
      
      // Schedule the next one
      scheduleNext();
    }, timeUntilNext);
    
    console.log(`Blog generation scheduled for ${nextTime.toLocaleString()}`);
  };
  
  // Initial scheduling
  scheduleNext();
  
  // Return cleanup function to clear timeout
  return () => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
  };
}
