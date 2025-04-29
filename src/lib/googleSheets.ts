
/**
 * Google Sheets integration utility
 * This file provides functions for sending data to Google Sheets via their API
 */

// Type for the Google Sheets API response
interface GoogleSheetsResponse {
  success: boolean;
  error?: string;
}

// Define the Google Apps Script URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzD1_vqkNQYjdd6zJgd9A1FHh9C34__sDYECFZDN2dVk4a3kQ49YZVxv6fOCbhpjpf4/exec';

/**
 * Function to send subscriber data to a Google Sheet
 * @param email - The email of the subscriber
 * @param source - The source of the subscription (e.g. 'website', 'landing-page')
 */
export async function addSubscriberToGoogleSheet(
  email: string, 
  source: string = 'website'
): Promise<GoogleSheetsResponse> {
  try {
    console.log(`Sending data to Google Sheet via Apps Script`);
    
    // Prepare form data (Google Apps Script web apps expect form data)
    const formData = new FormData();
    formData.append('email', email);
    formData.append('source', source);
    formData.append('date', new Date().toISOString());
    formData.append('location', window.location.href);

    // Send the data to the Google Apps Script
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors' // Required for Google Apps Script web apps
    });

    // Since we're using no-cors, we won't get a proper JSON response
    // So we assume it worked if there was no error
    console.log('Data sent to Google Sheet successfully');
    return { success: true };
  } catch (error: any) {
    console.error('Error sending data to Google Sheet:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to send data to Google Sheet' 
    };
  }
}

/**
 * Helper function to extract Google Sheet ID from the full URL
 * @param url - The full Google Sheet URL
 */
export function extractGoogleSheetId(url: string): string | null {
  if (!url) return null;
  
  try {
    // Extract the ID from Google Sheets URL
    // Format: https://docs.google.com/spreadsheets/d/SHEET_ID/edit#gid=0
    const match = url.match(/\/d\/([\w-]+)/);
    return match ? match[1] : null;
  } catch (error) {
    console.error('Error extracting Google Sheet ID:', error);
    return null;
  }
}
