
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { addSubscriber } from "@/lib/supabase-client";
import { useToast } from "@/hooks/use-toast";
import { Mail, Check, AlertCircle } from "lucide-react";

export default function SubscriptionTest() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setStatus("loading");
    
    try {
      const subscriptionResult = await addSubscriber(email, 'test');
      console.log("Subscription test result:", subscriptionResult);
      
      setResult(subscriptionResult);
      setStatus(subscriptionResult.success ? "success" : "error");
      
      toast({
        title: subscriptionResult.success ? "Subscription Successful" : "Subscription Failed",
        description: subscriptionResult.success 
          ? "Successfully added to the newsletter!" 
          : `Failed to subscribe: ${subscriptionResult.error?.message || "Unknown error"}`,
        variant: subscriptionResult.success ? "default" : "destructive",
      });
      
      if (subscriptionResult.success) {
        setEmail("");
      }
    } catch (error) {
      console.error("Error testing subscription:", error);
      setStatus("error");
      setResult({ success: false, error: { message: String(error) }});
      
      toast({
        title: "Subscription Test Error",
        description: `An unexpected error occurred: ${String(error)}`,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Test Newsletter Subscription</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubscribe} className="space-y-4">
          <div>
            <label htmlFor="test-email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <Input
              id="test-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full"
              disabled={status === "loading" || status === "success"}
            />
          </div>
          
          {status === "success" && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <div>
                  <h3 className="text-sm font-medium text-green-800">Subscription Successful</h3>
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
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">Subscription Failed</h3>
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
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          type="submit"
          onClick={handleSubscribe}
          disabled={status === "loading" || !email} 
          className="w-full"
        >
          {status === "loading" ? (
            <span className="flex items-center">
              <Mail className="animate-spin mr-2 h-4 w-4" />
              Subscribing...
            </span>
          ) : (
            <span className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              Test Subscription
            </span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
