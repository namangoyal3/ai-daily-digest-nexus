
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SheetIcon, Clipboard, AlertCircle, CheckCircle2 } from "lucide-react";
import { extractGoogleSheetId } from "@/lib/googleSheets";
import { useToast } from "@/components/ui/use-toast";

export default function GoogleSheetsSetup() {
  const [sheetUrl, setSheetUrl] = useState("");
  const [scriptUrl, setScriptUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Example Google Apps Script code
  const googleAppsScriptCode = `
function doPost(e) {
  try {
    // Access the spreadsheet
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName("Subscribers") || spreadsheet.insertSheet("Subscribers");
    
    // Check if we have data
    if (!e || !e.parameter) {
      return ContentService
        .createTextOutput(JSON.stringify({ 'status': 'error', 'message': 'No data received' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get form data
    var email = e.parameter.email || 'Not provided';
    var source = e.parameter.source || 'Not provided';
    var date = e.parameter.date || new Date().toISOString();
    var location = e.parameter.location || 'Not provided';
    
    // Add headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Email', 'Source', 'Date', 'Location', 'Timestamp']);
    }
    
    // Add the data to the sheet
    sheet.appendRow([email, source, date, location, new Date().toISOString()]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 'status': 'success', 'message': 'Data added' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 'status': 'error', 'message': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  // Test endpoint
  return ContentService
    .createTextOutput(JSON.stringify({ 'status': 'success', 'message': 'The web app is working correctly' }))
    .setMimeType(ContentService.MimeType.JSON);
}
`.trim();

  // Copy the script code to the clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(googleAppsScriptCode);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Google Apps Script code copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate a URL with the sheetId parameter
  const generateTestUrl = () => {
    // Extract the Google Sheet ID
    const extractedId = extractGoogleSheetId(sheetUrl);
    if (!extractedId) {
      toast({
        title: "Invalid Sheet URL",
        description: "Please enter a valid Google Sheets URL",
        variant: "destructive"
      });
      return;
    }
    
    // Generate the URL with the scriptId
    const scriptId = scriptUrl.trim().split('/').pop()?.replace('/exec', '') || '';
    if (!scriptId) {
      toast({
        title: "Invalid Script URL",
        description: "Please enter a valid Google Apps Script URL",
        variant: "destructive"
      });
      return;
    }
    
    // Create the test URL
    const testUrl = `${window.location.origin}?sheetId=${scriptId}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(testUrl);
    toast({
      title: "URL Copied!",
      description: "Test URL copied to clipboard. You can use this URL to test your integration.",
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SheetIcon className="h-5 w-5" />
          Google Sheets Integration Setup
        </CardTitle>
        <CardDescription>
          Follow these steps to connect your newsletter to Google Sheets
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            This integration requires you to create a Google Apps Script web app 
            and deploy it with access to your Google Sheet.
          </AlertDescription>
        </Alert>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Step 1: Create a Google Sheet</h3>
          <p className="text-sm text-gray-600">
            Create a new Google Sheet where you want to store your subscribers. Copy its URL below:
          </p>
          <div className="space-y-2">
            <Label htmlFor="sheet-url">Google Sheet URL</Label>
            <Input
              id="sheet-url"
              placeholder="https://docs.google.com/spreadsheets/d/..."
              value={sheetUrl}
              onChange={(e) => setSheetUrl(e.target.value)}
            />
          </div>
          
          <h3 className="text-lg font-semibold mt-4">Step 2: Create a Google Apps Script</h3>
          <p className="text-sm text-gray-600">
            Go to Extensions {'>'} Apps Script in your Google Sheet and create a new script.
            Copy and paste the following code:
          </p>
          <div className="relative">
            <pre className="bg-gray-50 p-4 rounded-md text-xs overflow-auto max-h-64">
              {googleAppsScriptCode}
            </pre>
            <Button 
              variant="outline" 
              size="sm" 
              className="absolute top-2 right-2" 
              onClick={handleCopyCode}
            >
              {copied ? <CheckCircle2 className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
            </Button>
          </div>
          
          <h3 className="text-lg font-semibold mt-4">Step 3: Deploy as a Web App</h3>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
            <li>Click on "Deploy" {'>'} "New deployment"</li>
            <li>Select "Web app" as the deployment type</li>
            <li>Set "Execute as" to "Me"</li>
            <li>Set "Who has access" to "Anyone"</li>
            <li>Click "Deploy" and authorize the application</li>
            <li>Copy the Web app URL and paste it below:</li>
          </ol>
          
          <div className="space-y-2">
            <Label htmlFor="script-url">Google Apps Script Web App URL</Label>
            <Input
              id="script-url"
              placeholder="https://script.google.com/macros/s/..."
              value={scriptUrl}
              onChange={(e) => setScriptUrl(e.target.value)}
            />
          </div>
          
          <h3 className="text-lg font-semibold mt-4">Step 4: Test Your Integration</h3>
          <p className="text-sm text-gray-600">
            Click the button below to generate a test URL with your Script ID. 
            Use this URL to test your form submissions.
          </p>
          
          <Button onClick={generateTestUrl}>
            Generate Test URL
          </Button>
          
          <div className="bg-green-50 border border-green-200 p-4 rounded-md mt-4 text-sm">
            <p className="font-medium">How does it work?</p>
            <p className="mt-2">
              When someone submits your form, the subscriber data will be saved to your 
              PostgreSQL database AND sent to your Google Sheet. The Google Apps Script acts 
              as a bridge between your website and Google Sheets.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
