import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { testDatabaseConnection, addSubscriber } from "@/lib/postgres";
import { Check, X, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DatabaseConnectionTest() {
  const [status, setStatus] = useState<"idle" | "checking" | "success" | "error">("idle");
  const [result, setResult] = useState<any>(null);
  const [testEmail, setTestEmail] = useState<string>("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [subscribeResult, setSubscribeResult] = useState<any>(null);
  const { toast } = useToast();

  const environmentInfo = {
    baseUrl: window.location.origin,
    hostname: window.location.hostname,
    apiPath: window.location.hostname.includes('lovableproject.com') ? '/api' : `${window.location.origin}/api`,
  };

  // Function to test database connection
  const checkConnection = async () => {
    setStatus("checking");
    setResult(null);
    
    try {
      console.log("Testing database connection...");
      const connectionResult = await testDatabaseConnection();
      console.log("Connection test result:", connectionResult);
      
      setResult(connectionResult);
      setStatus(connectionResult.success ? "success" : "error");
      
      toast({
        title: connectionResult.success ? "Connection Successful" : "Connection Failed",
        description: connectionResult.success 
          ? "Successfully connected to the database!" 
          : `Failed to connect: ${connectionResult.error?.message || "Unknown error"}`,
        variant: connectionResult.success ? "default" : "destructive",
      });
    } catch (error) {
      console.error("Error testing connection:", error);
      setStatus("error");
      setResult({ success: false, error: { message: String(error) }});
      
      toast({
        title: "Connection Test Error",
        description: `An unexpected error occurred: ${String(error)}`,
        variant: "destructive",
      });
    }
  };

  // Function to test subscription
  const testSubscription = async () => {
    if (!testEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(testEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setSubscribeStatus("sending");
    setSubscribeResult(null);
    
    try {
      console.log("Testing subscription with email:", testEmail);
      const subscriptionResult = await addSubscriber(testEmail, 'connection-test');
      console.log("Subscription test result:", subscriptionResult);
      
      setSubscribeResult(subscriptionResult);
      setSubscribeStatus(subscriptionResult.success ? "success" : "error");
      
      toast({
        title: subscriptionResult.success ? "Subscription Successful" : "Subscription Failed",
        description: subscriptionResult.success 
          ? "Successfully subscribed to the newsletter!" 
          : `Failed to subscribe: ${subscriptionResult.error?.message || "Unknown error"}`,
        variant: subscriptionResult.success ? "default" : "destructive",
      });
    } catch (error) {
      console.error("Error testing subscription:", error);
      setSubscribeStatus("error");
      setSubscribeResult({ success: false, error: { message: String(error) }});
      
      toast({
        title: "Subscription Test Error",
        description: `An unexpected error occurred: ${String(error)}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Database Connection Test</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Connection Test Card */}
        <Card>
          <CardHeader>
            <CardTitle>API Health Check Test</CardTitle>
            <CardDescription>
              Tests the connection to the database via the /api/health-check endpoint
            </CardDescription>
          </CardHeader>
          <CardContent>
            {status === "checking" && (
              <div className="flex items-center justify-center p-4">
                <Database className="h-6 w-6 animate-pulse text-primary mr-2" />
                <span>Testing connection...</span>
              </div>
            )}
            
            {status === "success" && (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <div>
                    <h3 className="text-sm font-medium text-green-800">Connection Successful</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <pre className="overflow-auto p-2 rounded bg-green-100 text-xs">
                        {JSON.stringify(result, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {status === "error" && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <Database className="h-5 w-5 text-red-500 mr-2" />
                  <div>
                    <h3 className="text-sm font-medium text-red-800">Connection Failed</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{result?.error?.message || "Unknown error occurred"}</p>
                      <pre className="overflow-auto p-2 rounded bg-red-100 text-xs mt-2">
                        {JSON.stringify(result, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={checkConnection}
              disabled={status === "checking"} 
              className="w-full"
            >
              {status === "checking" ? (
                <span className="flex items-center">
                  <Database className="animate-spin mr-2 h-4 w-4" />
                  Testing...
                </span>
              ) : (
                "Test Database Connection"
              )}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Subscription Test Card */}
        <Card>
          <CardHeader>
            <CardTitle>Newsletter Subscription Test</CardTitle>
            <CardDescription>
              Tests the subscription functionality via the /api/subscribe endpoint
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="test-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Test Email Address
                </label>
                <Input
                  id="test-email"
                  type="email"
                  placeholder="test@example.com"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="w-full"
                />
              </div>
              
              {subscribeStatus === "sending" && (
                <div className="flex items-center justify-center p-4">
                  <Database className="h-6 w-6 animate-pulse text-primary mr-2" />
                  <span>Processing subscription...</span>
                </div>
              )}
              
              {subscribeStatus === "success" && (
                <div className="rounded-md bg-green-50 p-4">
                  <div className="flex">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <div>
                      <h3 className="text-sm font-medium text-green-800">Subscription Successful</h3>
                      <div className="mt-2 text-sm text-green-700">
                        <pre className="overflow-auto p-2 rounded bg-green-100 text-xs">
                          {JSON.stringify(subscribeResult, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {subscribeStatus === "error" && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <X className="h-5 w-5 text-red-500 mr-2" />
                    <div>
                      <h3 className="text-sm font-medium text-red-800">Subscription Failed</h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>{subscribeResult?.error?.message || "Unknown error occurred"}</p>
                        <pre className="overflow-auto p-2 rounded bg-red-100 text-xs mt-2">
                          {JSON.stringify(subscribeResult, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={testSubscription}
              disabled={subscribeStatus === "sending" || !testEmail} 
              className="w-full"
            >
              {subscribeStatus === "sending" ? (
                <span className="flex items-center">
                  <Database className="animate-spin mr-2 h-4 w-4" />
                  Subscribing...
                </span>
              ) : (
                "Test Newsletter Subscription"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Troubleshooting Tips</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>If connection fails, check the API endpoint URL in <code>postgres.ts</code></li>
          <li>Verify that the database credentials in the API files are correct</li>
          <li>Check for CORS issues in browser console (API endpoints might need CORS headers)</li>
          <li>Ensure network connectivity to the database server</li>
          <li>Check if PostgreSQL is running and accessible from your deployment environment</li>
        </ul>
      </div>
    </div>
  );
}
