
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Check, AlertCircle } from "lucide-react";
import { submitToGoogleSheets } from "@/lib/googleSheets";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

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
          description: "Thank you for subscribing to our AI Daily Insights newsletter.",
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
    <section className="w-full bg-gradient-to-r from-[#9b87f5] to-[#7c3aed] py-12 px-2">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Stay Updated with AI Trends
        </h3>
        <p className="text-gray-200 mb-6">
          Join 25,000+ AI professionals receiving our daily AI insights newsletter.<br />
          No spam, just the latest in AI.
        </p>
        <form
          className="flex flex-col sm:flex-row items-center gap-3 justify-center"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full sm:w-96 h-12 px-4 rounded-lg bg-white/10 border border-white/30 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#fff] text-base"
            disabled={status === "loading" || status === "success"}
            autoComplete="email"
          />
          <Button
            type="submit"
            className="h-12 min-w-[120px] font-semibold px-6 rounded-lg bg-[#fff] text-[#622cd2] hover:bg-[#9b87f5] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
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
            <div className="flex items-center justify-center text-red-200 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" /> {error}
            </div>
          )}
          {status === "success" && (
            <div className="flex items-center justify-center text-green-200 text-sm">
              <Check className="h-4 w-4 mr-1" /> Thank you! Check your inbox to confirm.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
