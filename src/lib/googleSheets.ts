
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
    // Create form data for POST request
    const formData = new FormData();
    formData.append('email', email);
    formData.append('source', source);
    formData.append('timestamp', new Date().toISOString());
    
    // Use fetch with POST method
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: formData,
      mode: 'cors',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    // Log for debugging
    console.log("Google Sheets submission attempt completed");
    
    // Google Apps Script typically returns success with a 302 redirect or 200 OK
    // We'll consider anything not throwing an error as success
    return { success: true };
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}
