
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { submitToGoogleSheets } from "@/lib/googleSheets";

export default function FooterSubscribeSection() {
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
      console.log("Submitting to Google Sheets footer form:", email);
      const result = await submitToGoogleSheets(email, 'footer');
      console.log("Google Sheets result (footer):", result);
      
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
      console.error("Error in footer handleSubmit:", err);
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
    <div className="w-full max-w-xl mx-auto bg-gradient-to-r from-[#9b87f5] to-[#7c3aed] rounded-xl p-6 md:p-8 flex flex-col items-center shadow-lg border border-white/10">
      <h3 className="text-white text-2xl md:text-3xl font-bold mb-2 text-center">
        Subscribe for Daily AI Insights
      </h3>
      <p className="text-white/80 mb-6 text-center text-sm md:text-base max-w-sm">
        Get exclusive news, tips, and resources delivered straight to your inbox. Never miss a breakthrough.
      </p>
      
      <form
        className="w-full flex flex-col sm:flex-row gap-2"
        onSubmit={handleSubmit}
      >
        <div className="flex-1 relative">
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            className="h-12 border-none rounded-md bg-white/90 focus:ring-2 focus:ring-white text-gray-900 text-base px-4"
            onChange={e => setEmail(e.target.value)}
            disabled={status === "loading" || status === "success"}
            autoComplete="email"
            aria-label="Email address"
            required
          />
        </div>
        
        <Button
          type="submit"
          className="h-12 px-6 text-base font-semibold rounded-md bg-aiblue hover:bg-blue-700 text-white transition"
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
      
      <div className="h-4 mt-2 w-full">
        {status === "error" && error && (
          <div className="flex items-center text-pink-100 text-sm">
            <AlertCircle className="h-4 w-4 mr-1" /> {error}
          </div>
        )}
        {status === "success" && (
          <div className="flex items-center text-green-100 text-sm">
            <Check className="h-4 w-4 mr-1" /> Thank you! Check your inbox to confirm.
          </div>
        )}
      </div>
      
      <div className="mt-3 text-center text-xs text-white/70">
        We never send spam &mdash; unsubscribe any time.
      </div>
    </div>
  );
}
