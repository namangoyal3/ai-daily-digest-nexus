
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Key, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function BlogApiKeyForm() {
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem("perplexity_api_key");
    if (storedKey) {
      // Mask the key for display
      setApiKey("•".repeat(20) + storedKey.slice(-5));
      setSaved(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey || apiKey.includes("•")) {
      setError("Please enter a valid API key");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Test the API key with a simple request
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
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
      
      if (!response.ok) {
        throw new Error(`API key validation failed: ${response.status}`);
      }
      
      // Save to localStorage if valid
      localStorage.setItem("perplexity_api_key", apiKey);
      setSaved(true);
      
      // Reset form state after successful save
      setApiKey("•".repeat(20) + apiKey.slice(-5));
      
    } catch (err) {
      console.error("API key validation error:", err);
      setError("Invalid API key. Please check and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    localStorage.removeItem("perplexity_api_key");
    setApiKey("");
    setSaved(false);
    setError(null);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5 text-aiblue" />
          Perplexity API Setup
        </CardTitle>
        <CardDescription>
          Configure your Perplexity API key to enable AI-generated blog content
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
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setSaved(false);
                  setError(null);
                }}
                className="font-mono text-sm"
              />
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-700 p-2 rounded-md text-sm flex items-center gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            {saved && !error && (
              <div className="bg-green-50 text-green-700 p-2 rounded-md text-sm flex items-center gap-2">
                <CheckCircle className="h-4 w-4 flex-shrink-0" />
                <span>API key saved successfully</span>
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
          </div>
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleReset}
            disabled={loading || !saved}
          >
            Reset
          </Button>
          <Button 
            type="submit" 
            disabled={loading || (saved && apiKey.includes("•"))}
          >
            {loading ? "Validating..." : saved ? "Validated" : "Save Key"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
