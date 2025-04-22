
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Check, AlertCircle } from "lucide-react";

export default function FooterSubscribeSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [error, setError] = useState("");

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
    // Simulate async call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-gradient-to-r from-[#9b87f5] to-[#7c3aed] rounded-xl p-6 md:p-8 flex flex-col items-center shadow-lg border border-white/10">
      <h3 className="text-white text-2xl md:text-3xl font-bold mb-2 text-center">
        Subscribe for Weekly AI Insights
      </h3>
      <p className="text-white/80 mb-4 text-center text-sm md:text-base max-w-sm">
        Get exclusive news, tips, and resources delivered straight to your inbox. Never miss a breakthrough.
      </p>
      <form
        className="w-full flex flex-col sm:flex-row gap-2 mt-1"
        onSubmit={handleSubmit}
      >
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          className="flex-1 h-12 border-none rounded-md bg-white/90 focus:ring-aipurple text-gray-900 text-base"
          onChange={e => setEmail(e.target.value)}
          disabled={status === "loading" || status === "success"}
          autoComplete="email"
          aria-label="Email address"
          required
        />
        <Button
          type="submit"
          className="h-12 px-6 text-base font-semibold rounded-md bg-aiblue hover:bg-aipurple text-white transition"
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
      <div className="h-4 mt-1 w-full">
        {status === "error" && error && (
          <div className="flex items-center text-pink-100 text-xs mt-1">
            <AlertCircle className="h-4 w-4 mr-1" /> {error}
          </div>
        )}
        {status === "success" && (
          <div className="flex items-center text-green-100 text-xs mt-1">
            <Check className="h-4 w-4 mr-1" /> Thank you! Check your inbox to confirm.
          </div>
        )}
      </div>
      <div className="mt-3 text-center text-xs text-white/70 flex items-center justify-center">
        We never send spam &mdash; unsubscribe any time.
      </div>
    </div>
  );
}
