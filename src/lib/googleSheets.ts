
/**
 * Utility for submitting data to Google Sheets via Google Apps Script
 */

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzD1_vqkNQYjdd6zJgd9A1FHh9C34__sDYECFZDN2dVk4a3kQ49YZVxv6fOCbhpjpf4/exec";

interface SubmissionResult {
  success: boolean;
  error?: string;
}

export async function submitToGoogleSheets(email: string, source: string): Promise<SubmissionResult> {
  try {
    // Create URL with params instead of FormData
    const url = new URL(GOOGLE_SCRIPT_URL);
    url.searchParams.append('email', email);
    url.searchParams.append('source', source);
    url.searchParams.append('timestamp', new Date().toISOString());
    
    // Using JSONP approach with a callback
    const callbackName = 'googleSheetsCallback_' + Math.random().toString(36).substring(2, 15);
    url.searchParams.append('callback', callbackName);
    
    return new Promise((resolve) => {
      // Create a timeout to handle no response cases
      const timeoutId = setTimeout(() => {
        // Clean up
        document.body.removeChild(script);
        delete (window as any)[callbackName];
        
        console.log("Google Sheets request timed out");
        resolve({ success: true }); // Assume success even on timeout (Google Apps Script often doesn't return)
      }, 5000);
      
      // Define the callback function
      (window as any)[callbackName] = (response: any) => {
        clearTimeout(timeoutId);
        document.body.removeChild(script);
        delete (window as any)[callbackName];
        
        console.log("Google Sheets response received:", response);
        resolve({ success: true });
      };
      
      // Create script element for JSONP request
      const script = document.createElement('script');
      script.src = url.toString();
      script.async = true;
      script.onerror = () => {
        clearTimeout(timeoutId);
        document.body.removeChild(script);
        delete (window as any)[callbackName];
        
        console.error("Error loading Google Sheets script");
        resolve({ success: false, error: "Network error" });
      };
      
      // Add script to document to start request
      document.body.appendChild(script);
    });
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}
