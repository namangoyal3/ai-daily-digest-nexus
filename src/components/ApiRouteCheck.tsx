
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

/**
 * Simple component to test if API routes are accessible
 */
export default function ApiRouteCheck() {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<{route: string, status: string, message: string}[]>([]);

  // Function to test if a route exists
  const testRoute = async (route: string) => {
    try {
      const url = route.startsWith('http') ? route : `${window.location.origin}${route}`;
      console.log(`Testing route: ${url}`);
      
      const response = await fetch(url, {
        method: 'OPTIONS',
        headers: { 'Accept': 'application/json' }
      });
      
      return {
        route,
        status: response.ok ? 'success' : 'error',
        message: `Status: ${response.status} ${response.statusText}`
      };
    } catch (error) {
      console.error(`Error testing route ${route}:`, error);
      return {
        route,
        status: 'error',
        message: `Error: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  };

  const runTests = async () => {
    setTesting(true);
    setResults([]);
    
    // Routes to test
    const routes = [
      '/api/health-check',
      '/api/subscribe',
      '/health-check',
      '/subscribe'
    ];
    
    const testResults = [];
    
    for (const route of routes) {
      const result = await testRoute(route);
      testResults.push(result);
      // Update state after each test to show progress
      setResults([...testResults]);
    }
    
    setTesting(false);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>API Route Accessibility Test</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button 
            onClick={runTests} 
            disabled={testing}
            className="w-full"
          >
            {testing ? "Testing Routes..." : "Test API Routes"}
          </Button>
          
          {results.length > 0 && (
            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-semibold">Results:</h3>
              <div className="space-y-2">
                {results.map((result, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-md ${
                      result.status === 'success' ? 'bg-green-50' : 'bg-red-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="font-mono text-sm">{result.route}</span>
                      <ArrowRight className="mx-2 h-3 w-3" />
                      <span className={`text-sm ${
                        result.status === 'success' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {result.message}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-4 p-4 bg-gray-50 rounded-md text-sm">
            <h3 className="font-semibold mb-2">Environment Information:</h3>
            <div className="space-y-1">
              <p><strong>Hostname:</strong> {window.location.hostname}</p>
              <p><strong>Origin:</strong> {window.location.origin}</p>
              <p><strong>Protocol:</strong> {window.location.protocol}</p>
              <p><strong>API Base:</strong> {window.location.hostname.includes('lovableproject.com') ? '/api' : `${window.location.origin}/api`}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
