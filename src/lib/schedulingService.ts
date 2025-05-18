
// Types for schedule configuration
export interface ScheduleConfig {
  isActive: boolean;
  time: string;
  categories: string[];
  frequency: 'daily' | 'weekly' | 'monthly';
  daysOfWeek?: number[]; // 0-6 for Sunday-Saturday, used for weekly schedule
  dayOfMonth?: number; // 1-31, used for monthly schedule
  lastExecuted?: number; // Timestamp of last execution
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
// Renamed from saveScheduleConfig to setScheduleConfig to match import in BlogScheduleModal
export function setScheduleConfig(config: ScheduleConfig): void {
  localStorage.setItem('blog_schedule_config', JSON.stringify(config));
}

// Check if it's time to run the scheduled task
export function isTimeToRun(config: ScheduleConfig): boolean {
  // If scheduling is not active, don't run
  if (!config.isActive) {
    return false;
  }
  
  const now = new Date();
  const [hours, minutes] = config.time.split(':').map(Number);
  
  // Current time components
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  
  // Check if we've already executed today or recently
  if (config.lastExecuted) {
    const lastExecution = new Date(config.lastExecuted);
    
    // For daily schedule, check if it was run today after the scheduled time
    if (config.frequency === 'daily') {
      if (
        lastExecution.getDate() === now.getDate() &&
        lastExecution.getMonth() === now.getMonth() &&
        lastExecution.getFullYear() === now.getFullYear() &&
        (lastExecution.getHours() > hours || 
          (lastExecution.getHours() === hours && lastExecution.getMinutes() >= minutes))
      ) {
        return false; // Already executed today after the scheduled time
      }
    }
    
    // For weekly schedule
    if (config.frequency === 'weekly' && config.daysOfWeek && config.daysOfWeek.length > 0) {
      // Check if today is a scheduled day
      const today = now.getDay();
      if (!config.daysOfWeek.includes(today)) {
        return false; // Today is not a scheduled day
      }
      
      // Check if it was already executed today after the scheduled time
      if (
        lastExecution.getDate() === now.getDate() &&
        lastExecution.getMonth() === now.getMonth() &&
        lastExecution.getFullYear() === now.getFullYear() &&
        (lastExecution.getHours() > hours || 
          (lastExecution.getHours() === hours && lastExecution.getMinutes() >= minutes))
      ) {
        return false; // Already executed today after scheduled time
      }
    }
    
    // For monthly schedule
    if (config.frequency === 'monthly' && config.dayOfMonth) {
      // Check if today is the scheduled day of month
      if (now.getDate() !== config.dayOfMonth) {
        return false; // Not the scheduled day of the month
      }
      
      // Check if it was already executed today after the scheduled time
      if (
        lastExecution.getDate() === now.getDate() &&
        lastExecution.getMonth() === now.getMonth() &&
        lastExecution.getFullYear() === now.getFullYear() &&
        (lastExecution.getHours() > hours || 
          (lastExecution.getHours() === hours && lastExecution.getMinutes() >= minutes))
      ) {
        return false; // Already executed today after scheduled time
      }
    }
  }
  
  // Check if current time is past the scheduled time
  return (currentHours > hours || (currentHours === hours && currentMinutes >= minutes));
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

// Update the last execution time in the config
export function updateLastExecutedTime(config: ScheduleConfig): ScheduleConfig {
  const updatedConfig = {
    ...config,
    lastExecuted: Date.now()
  };
  
  saveScheduleConfig(updatedConfig);
  return updatedConfig;
}

// Initialize scheduling
export function initializeScheduling(onGenerate: () => Promise<void>): () => void {
  let timeoutId: number | undefined;
  let checkIntervalId: number | undefined;
  
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
      try {
        // Generate the blog
        await onGenerate();
        
        // Update last executed time
        updateLastExecutedTime(config);
      } catch (error) {
        console.error("Failed to generate scheduled blog:", error);
      } finally {
        // Schedule the next one
        scheduleNext();
      }
    }, timeUntilNext);
    
    console.log(`Blog generation scheduled for ${nextTime.toLocaleString()}`);
  };
  
  // Set up an interval to check every minute if we need to run the schedule
  // This acts as a backup in case the timeout is missed (e.g., if the browser was closed)
  const checkSchedule = () => {
    const config = getScheduleConfig();
    
    if (config.isActive && isTimeToRun(config)) {
      onGenerate()
        .then(() => {
          updateLastExecutedTime(config);
          console.log("Scheduled blog generation completed");
          
          // Reschedule for next time
          scheduleNext();
        })
        .catch(err => {
          console.error("Failed to generate scheduled blog:", err);
        });
    }
  };
  
  // Initial scheduling
  scheduleNext();
  
  // Check every minute if we need to run
  checkIntervalId = window.setInterval(checkSchedule, 60000); // Check every minute
  
  // Return cleanup function to clear timeout and interval
  return () => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
    if (checkIntervalId) {
      window.clearInterval(checkIntervalId);
    }
  };
}
