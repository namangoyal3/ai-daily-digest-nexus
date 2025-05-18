
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { testDatabaseConnection } from "@/lib/supabase-client";

export default function ApiRouteCheck() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [result, setResult] = useState<any>(null);

  const checkApiRoute = async () => {
    setStatus("loading");
    setResult(null);
    
    try {
      console.log("Checking Supabase connection...");
      const connectionResult = await testDatabaseConnection();
      console.log("Connection test result:", connectionResult);
      
      setResult(connectionResult);
      setStatus(connectionResult.success ? "success" : "error");
    } catch (error) {
      console.error("Error testing Supabase connection:", error);
      setStatus("error");
      setResult({ success: false, error: { message: String(error) } });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Supabase Connection Check</span>
          <div className="flex items-center space-x-2">
            {status === "success" && (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            )}
            {status === "error" && (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              {status === "idle" && <p>Click the button to check Supabase connection</p>}
              {status === "loading" && <p>Testing connection...</p>}
              {status === "success" && <p className="text-green-600">Connection successful</p>}
              {status === "error" && <p className="text-red-600">Connection failed</p>}
            </div>
            <Button 
              onClick={checkApiRoute}
              disabled={status === "loading"}
              variant={status === "error" ? "destructive" : "default"}
              size="sm"
            >
              {status === "loading" ? (
                <RotateCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RotateCw className="h-4 w-4 mr-2" />
              )}
              Test Connection
            </Button>
          </div>
          
          {result && (
            <div className="mt-4 p-3 bg-gray-50 rounded-md overflow-x-auto text-sm">
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
