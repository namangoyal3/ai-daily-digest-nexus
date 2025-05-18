
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Key, CheckCircle, AlertCircle, Loader2, RefreshCcw } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function BlogApiKeyForm() {
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // Check if API key is already set in Supabase
  useEffect(() => {
    checkApiKeyStatus();
  }, []);

  const checkApiKeyStatus = async () => {
    try {
      setChecking(true);
      setConnectionError(null);
      
      console.log("Checking Perplexity API key status...");
      
      // Call a function to check if the API key is configured
      const { data, error } = await supabase.functions.invoke('check-api-key-status', { 
        body: { key_name: 'PERPLEXITY_API_KEY' } 
      });
      
      if (error) {
        console.error('Error checking API key status:', error);
        setConnectionError(`Connection error: ${error.message}`);
        toast.error("Failed to check API key status", {
          description: error.message
        });
      } else if (data && data.configured) {
        console.log("API key is configured in Supabase secrets");
        // API key is configured in Supabase secrets
        setApiKey("•".repeat(20) + " (CONFIGURED)");
        setSaved(true);
        toast.success("Perplexity API key is configured", {
          description: "Your API key is properly set up"
        });
      } else {
        console.log("API key is not configured in Supabase secrets");
        setApiKey("");
        setSaved(false);
      }
    } catch (err) {
      console.error('Error checking key status:', err);
      const message = err instanceof Error ? err.message : "Unknown error";
      setConnectionError(`Error checking key status: ${message}`);
      toast.error("Connection error", {
        description: message
      });
    } finally {
      setChecking(false);
    }
  };

  const validateApiKey = async (key: string) => {
    if (!key) {
      setError("Please enter a valid API key");
      return false;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log("Testing Perplexity API key...");
      
      // Test the API key with a simple request
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'user',
              content: 'Hello, brief test.'
            }
          ],
          temperature: 0.1,
          max_tokens: 10,
        }),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        const errorMsg = responseData.error?.message || `API key validation failed: ${response.status}`;
        console.error("API validation error:", errorMsg);
        throw new Error(errorMsg);
      }
      
      // If valid, inform user to add it to Supabase secrets
      toast.success("API key is valid!", {
        description: "Please add this key to your Supabase Edge Function secrets with name PERPLEXITY_API_KEY"
      });
      
      // Store masked key for display
      setApiKey("•".repeat(20) + key.slice(-5));
      setSaved(true);
      return true;
      
    } catch (err) {
      console.error("API key validation error:", err);
      setError(err instanceof Error ? err.message : "Invalid API key. Please check and try again.");
      toast.error("API Key Validation Error", {
        description: err instanceof Error ? err.message : "Please check your key and try again",
      });
      return false;
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey || apiKey.includes("•")) {
      setError("Please enter a valid API key");
      return;
    }
    
    await validateApiKey(apiKey);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setApiKey(value);
    setSaved(false);
    setError(null);
    
    // If input field is cleared, don't validate
    if (!value) return;
    
    // Auto-validate after a short delay when typing stops
    if (value.length > 20) {
      // Validate immediately if pasting a full API key
      validateApiKey(value);
    }
  };

  const handleReset = () => {
    setApiKey("");
    setSaved(false);
    setError(null);
  };

  if (checking) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-aiblue" />
          </div>
          <p className="text-center text-gray-500">Checking API key configuration...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5 text-aiblue" />
          Perplexity API Setup
        </CardTitle>
        <CardDescription>
          Configure your Perplexity API key for AI-generated blog content
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="apiKey" className="text-sm font-medium">
                API Key
              </label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your Perplexity API key"
                value={apiKey}
                onChange={handleInputChange}
                className="font-mono text-sm"
              />
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-700 p-2 rounded-md text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            {connectionError && (
              <div className="bg-orange-50 text-orange-700 p-2 rounded-md text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{connectionError}</span>
              </div>
            )}
            
            {saved && !error && (
              <div className="bg-green-50 text-green-700 p-2 rounded-md text-sm flex items-center gap-2">
                <CheckCircle className="h-4 w-4 flex-shrink-0" />
                <span>API key validated</span>
              </div>
            )}
            
            <div className="text-sm text-gray-500">
              <p>You'll need a Perplexity API key to use our automatic blog generation feature.</p>
              <p className="mt-1">
                <a 
                  href="https://docs.perplexity.ai/docs/getting-started" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-aiblue hover:text-aipurple flex items-center gap-1"
                >
                  <span>Get your API key here</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </p>
            </div>
            
            <div className="bg-blue-50 text-blue-700 p-3 rounded-md text-sm">
              <p className="font-medium mb-1">Important: Add to Supabase Secrets</p>
              <p>After validating your key, you'll need to add it to your Supabase Edge Function secrets:</p>
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>Go to your Supabase project dashboard</li>
                <li>Navigate to Edge Functions</li>
                <li>Click on "Secrets"</li>
                <li>Add a new secret with name <code className="bg-blue-100 px-1">PERPLEXITY_API_KEY</code> and your API key as the value</li>
                <li>After adding the secret, click the "Refresh" button below</li>
              </ol>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <div className="flex justify-between w-full">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleReset}
              disabled={loading}
            >
              Reset
            </Button>
            <Button 
              type="submit" 
              disabled={loading || (saved && apiKey.includes("•"))}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Validating...
                </>
              ) : saved ? "Validated" : "Validate Key"}
            </Button>
          </div>
          
          <Button 
            type="button" 
            variant="outline" 
            className="w-full" 
            onClick={checkApiKeyStatus}
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Refresh Key Status
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
