
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Check, AlertCircle } from "lucide-react";
import { submitToGoogleSheets } from "@/lib/googleSheets";
import { useToast } from "@/components/ui/use-toast";

export default function EarlySubscribeSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [error, setError] = useState("");
  const { toast } = useToast();

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    
    setStatus("loading");
    
    try {
      console.log("Submitting to Google Sheets early form:", email);
      const result = await submitToGoogleSheets(email, 'early-section');
      console.log("Google Sheets result (early-section):", result);
      
      if (result.success) {
        setStatus("success");
        setEmail("");
        
        toast({
          title: "Successfully subscribed!",
          description: "Thank you for subscribing to our AI learning newsletter.",
        });
      } else {
        setError(result.error || "Something went wrong. Please try again.");
        setStatus("error");
        
        toast({
          title: "Subscription Failed",
          description: "There was a problem signing you up. Please try again.",
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error("Error in early section handleSubmit:", err);
      setStatus("error");
      setError("Something went wrong. Please try again.");
      
      toast({
        title: "Connection Error",
        description: "We couldn't reach our service. Please try again later.",
        variant: "destructive"
      });
    }
  }

  return (
    <section className="py-12 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-aiblue mb-2">
              Subscribe Now to AI Daily Digest
            </h2>
            <p className="text-gray-600">
              Join 25,000+ professionals getting AI insights every morning.
            </p>
          </div>
          
          <form
            className="max-w-lg mx-auto flex flex-col sm:flex-row gap-3"
            onSubmit={handleSubmit}
          >
            <div className="flex-1 relative">
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                className={`h-12 text-base ${error ? "border-red-300" : ""}`}
                onChange={e => setEmail(e.target.value)}
                disabled={status === "loading" || status === "success"}
                autoComplete="email"
                aria-label="Email address"
                required
              />
            </div>
            
            <Button
              type="submit"
              className="h-12 px-6 text-base font-semibold bg-gradient-to-r from-aiblue to-aipurple hover:from-aiblue-dark hover:to-aipurple-dark text-white shadow-sm"
              disabled={status === "loading" || status === "success"}
            >
              {status === "loading" ? (
                <span className="flex items-center gap-1">
                  <Mail className="animate-spin h-5 w-5" /> Subscribing...
                </span>
              ) : status === "success" ? (
                <span className="flex items-center gap-1">
                  <Check className="h-5 w-5" /> Subscribed!
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Mail className="h-5 w-5" /> Subscribe
                </span>
              )}
            </Button>
          </form>
          
          <div className="h-5 mt-2 text-center">
            {status === "error" && error && (
              <div className="flex items-center justify-center text-red-500 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" /> {error}
              </div>
            )}
            {status === "success" && (
              <div className="flex items-center justify-center text-green-600 text-sm">
                <Check className="h-4 w-4 mr-1" /> Thank you! Check your inbox to confirm.
              </div>
            )}
          </div>
          
          <div className="mt-3 text-center text-xs text-gray-500">
            No spam, just daily AI insights. Unsubscribe anytime.
          </div>
        </div>
      </div>
    </section>
  );
}
