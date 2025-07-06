
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Key, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function BlogApiKeyForm() {
  const [perplexityKey, setPerplexityKey] = useState("");
  const [huggingfaceKey, setHuggingfaceKey] = useState("");
  const [perplexitySaved, setPerplexitySaved] = useState(false);
  const [huggingfaceSaved, setHuggingfaceSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const perplexityStored = localStorage.getItem("perplexity_api_key");
    const huggingfaceStored = localStorage.getItem("huggingface_api_key");
    
    if (perplexityStored) {
      setPerplexityKey("•".repeat(20) + perplexityStored.slice(-5));
      setPerplexitySaved(true);
    }
    
    if (huggingfaceStored) {
      setHuggingfaceKey("•".repeat(20) + huggingfaceStored.slice(-5));
      setHuggingfaceSaved(true);
    }
  }, []);

  const handlePerplexitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!perplexityKey || perplexityKey.includes("•")) {
      setError("Please enter a valid API key");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${perplexityKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [{ role: 'user', content: 'Hello, brief test.' }],
          temperature: 0.1,
          max_tokens: 10,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API key validation failed: ${response.status}`);
      }
      
      localStorage.setItem("perplexity_api_key", perplexityKey);
      setPerplexitySaved(true);
      setPerplexityKey("•".repeat(20) + perplexityKey.slice(-5));
      
    } catch (err) {
      console.error("Perplexity API key validation error:", err);
      setError("Invalid Perplexity API key. Please check and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleHuggingfaceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!huggingfaceKey || huggingfaceKey.includes("•")) {
      setError("Please enter a valid API key");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-large', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${huggingfaceKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: "Test",
          parameters: { max_new_tokens: 5 }
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API key validation failed: ${response.status}`);
      }
      
      localStorage.setItem("huggingface_api_key", huggingfaceKey);
      setHuggingfaceSaved(true);
      setHuggingfaceKey("•".repeat(20) + huggingfaceKey.slice(-5));
      
    } catch (err) {
      console.error("Hugging Face API key validation error:", err);
      setError("Invalid Hugging Face API key. Please check and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePerplexityReset = () => {
    localStorage.removeItem("perplexity_api_key");
    setPerplexityKey("");
    setPerplexitySaved(false);
    setError(null);
  };

  const handleHuggingfaceReset = () => {
    localStorage.removeItem("huggingface_api_key");
    setHuggingfaceKey("");
    setHuggingfaceSaved(false);
    setError(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Tabs defaultValue="perplexity" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="perplexity">Perplexity AI</TabsTrigger>
          <TabsTrigger value="huggingface">Hugging Face</TabsTrigger>
        </TabsList>
        
        <TabsContent value="perplexity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-aiblue" />
                Perplexity API Setup
              </CardTitle>
              <CardDescription>
                Configure your Perplexity API key for advanced AI content generation
              </CardDescription>
            </CardHeader>
            <form onSubmit={handlePerplexitySubmit}>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="perplexityKey" className="text-sm font-medium">
                      API Key
                    </label>
                    <Input
                      id="perplexityKey"
                      type="password"
                      placeholder="Enter your Perplexity API key"
                      value={perplexityKey}
                      onChange={(e) => {
                        setPerplexityKey(e.target.value);
                        setPerplexitySaved(false);
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
                  
                  {perplexitySaved && !error && (
                    <div className="bg-green-50 text-green-700 p-2 rounded-md text-sm flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 flex-shrink-0" />
                      <span>Perplexity API key saved successfully</span>
                    </div>
                  )}
                  
                  <div className="text-sm text-gray-500">
                    <p>Perplexity offers web-connected AI with up-to-date information.</p>
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
                  onClick={handlePerplexityReset}
                  disabled={loading || !perplexitySaved}
                >
                  Reset
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading || (perplexitySaved && perplexityKey.includes("•"))}
                >
                  {loading ? "Validating..." : perplexitySaved ? "Validated" : "Save Key"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="huggingface" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-aiblue" />
                Hugging Face API Setup
              </CardTitle>
              <CardDescription>
                Configure your Hugging Face API key for open-source AI content generation
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleHuggingfaceSubmit}>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="huggingfaceKey" className="text-sm font-medium">
                      API Key
                    </label>
                    <Input
                      id="huggingfaceKey"
                      type="password"
                      placeholder="Enter your Hugging Face API key"
                      value={huggingfaceKey}
                      onChange={(e) => {
                        setHuggingfaceKey(e.target.value);
                        setHuggingfaceSaved(false);
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
                  
                  {huggingfaceSaved && !error && (
                    <div className="bg-green-50 text-green-700 p-2 rounded-md text-sm flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 flex-shrink-0" />
                      <span>Hugging Face API key saved successfully</span>
                    </div>
                  )}
                  
                  <div className="text-sm text-gray-500">
                    <p>Hugging Face provides access to thousands of open-source AI models.</p>
                    <p className="mt-1">
                      <a 
                        href="https://huggingface.co/settings/tokens" 
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
                  onClick={handleHuggingfaceReset}
                  disabled={loading || !huggingfaceSaved}
                >
                  Reset
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading || (huggingfaceSaved && huggingfaceKey.includes("•"))}
                >
                  {loading ? "Validating..." : huggingfaceSaved ? "Validated" : "Save Key"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
