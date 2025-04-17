
// Default admin credentials (will be replaced with database values later)
const DEFAULT_ADMIN_USERNAME = "admin";
const DEFAULT_ADMIN_PASSWORD = "Admin123!";

// In-memory storage for login attempts (this would be replaced with database storage)
interface LoginAttemptRecord {
  timestamp: number;
  count: number;
  locked: boolean;
  lockExpiry: number;
}

const loginAttemptsMap = new Map<string, LoginAttemptRecord>();

const MAX_LOGIN_ATTEMPTS = 3;
const LOCK_DURATION_MS = 60 * 60 * 1000; // 1 hour in milliseconds

export const authService = {
  attemptLogin(username: string, password: string): { success: boolean; message: string } {
    // Check if the account is locked
    const currentIp = "user-ip"; // In a real app, you'd get this from the request
    const now = Date.now();
    
    // Get or create attempt record
    let attemptRecord = loginAttemptsMap.get(currentIp);
    if (!attemptRecord) {
      attemptRecord = {
        timestamp: now,
        count: 0,
        locked: false,
        lockExpiry: 0
      };
      loginAttemptsMap.set(currentIp, attemptRecord);
    }
    
    // Check if lock expired
    if (attemptRecord.locked && now > attemptRecord.lockExpiry) {
      attemptRecord.locked = false;
      attemptRecord.count = 0;
    }
    
    // If account is locked, reject login
    if (attemptRecord.locked) {
      const minutesLeft = Math.ceil((attemptRecord.lockExpiry - now) / (60 * 1000));
      return { 
        success: false, 
        message: `Account is temporarily locked. Please try again in ${minutesLeft} minute(s).` 
      };
    }

    // Validate credentials
    const isValidCredentials = 
      username === DEFAULT_ADMIN_USERNAME && 
      password === DEFAULT_ADMIN_PASSWORD;
    
    if (isValidCredentials) {
      // Reset attempts on successful login
      attemptRecord.count = 0;
      return { success: true, message: "Login successful" };
    } else {
      // Increment failed attempts
      attemptRecord.count += 1;
      attemptRecord.timestamp = now;
      
      // Check if max attempts reached
      if (attemptRecord.count >= MAX_LOGIN_ATTEMPTS) {
        attemptRecord.locked = true;
        attemptRecord.lockExpiry = now + LOCK_DURATION_MS;
        
        return { 
          success: false, 
          message: `Too many failed attempts. Your account is locked for 1 hour.` 
        };
      }
      
      const attemptsLeft = MAX_LOGIN_ATTEMPTS - attemptRecord.count;
      return { 
        success: false, 
        message: `Invalid credentials. ${attemptsLeft} attempt(s) remaining before lockout.` 
      };
    }
  },
  
  checkLoginStatus(): boolean {
    return localStorage.getItem("adminAuth") === "true";
  },
  
  logout(): void {
    localStorage.removeItem("adminAuth");
  }
};
