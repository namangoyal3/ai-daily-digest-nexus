
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
    const formData = new FormData();
    formData.append('email', email);
    formData.append('source', source);
    formData.append('timestamp', new Date().toISOString());

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors' // This is important for CORS issues with Google Scripts
    });

    // Due to no-cors mode, we can't read the response
    // We assume success if no error is thrown
    return { success: true };
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}
