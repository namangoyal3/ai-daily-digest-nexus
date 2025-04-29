
/**
 * Utility for submitting data to Google Sheets via Google Apps Script
 */

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyR9qlAxuuRrWICH5NwclkWKDQdRbVYKQvZMUHwcx9EQmnhh0tYnqUG1h4JD7aF0nZc4g/exec";

interface SubmissionResult {
  success: boolean;
  error?: string;
}

// Convert FormData to URL encoded string
function formDataToUrlEncoded(formData: FormData): string {
  const params = new URLSearchParams();
  
  // Properly handle FormDataEntryValue types
  formData.forEach((value, key) => {
    // Convert any non-string values to strings
    params.append(key, value instanceof File ? value.name : String(value));
  });
  
  return params.toString();
}

export async function submitToGoogleSheets(email: string, source: string): Promise<SubmissionResult> {
  try {
    // Create form data for POST request
    const formData = new FormData();
    formData.append('email', email);
    formData.append('source', source);
    formData.append('timestamp', new Date().toISOString());
    
    // Use a hidden iframe approach to avoid CORS issues with Google Apps Script
    return new Promise((resolve) => {
      // Create a unique ID for the form and iframe
      const uniqueId = `form_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      // Create a hidden iframe to target the form submission
      const iframe = document.createElement('iframe');
      iframe.name = uniqueId;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Create a hidden form
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = GOOGLE_SCRIPT_URL;
      form.target = uniqueId;
      form.style.display = 'none';
      
      // Add form fields
      formData.forEach((value, key) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        // Ensure all values are strings
        input.value = value instanceof File ? value.name : String(value);
        form.appendChild(input);
      });
      
      // Add the form to the document
      document.body.appendChild(form);
      
      // Set a timeout to consider the submission successful after 3 seconds
      // Google Apps Script often doesn't return a proper response but the data gets submitted
      const timer = setTimeout(() => {
        cleanUp();
        console.log("Google Sheets submission completed (timeout)");
        resolve({ success: true });
      }, 3000);
      
      // Listen for iframe load events
      iframe.onload = () => {
        cleanUp();
        console.log("Google Sheets submission completed (iframe loaded)");
        resolve({ success: true });
      };
      
      // Error handler
      iframe.onerror = () => {
        cleanUp();
        console.error("Error in Google Sheets iframe submission");
        resolve({ success: false, error: "Failed to connect to Google Sheets" });
      };
      
      // Clean up function
      function cleanUp() {
        clearTimeout(timer);
        // Give a small delay before removing DOM elements to ensure the request completes
        setTimeout(() => {
          document.body.removeChild(form);
          document.body.removeChild(iframe);
        }, 500);
      }
      
      // Submit the form
      console.log("Submitting to Google Sheets via iframe form");
      form.submit();
    });
    
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}
