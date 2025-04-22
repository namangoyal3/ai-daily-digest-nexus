
import { useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Lottie from "lottie-react";
import confettiPopper from "/lovable-uploads/fc69bfdc-de2c-4160-8c32-bb094a4cb0ed.png"; // Placeholder - replace with Lottie JSON

export default function NewHomepageSubscribeSection() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");

  // For accessibility on close
  const inputRef = useRef<HTMLInputElement>(null);

  const validateEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setSubmitting(true);
    try {
      // Replace URL below with real backend endpoint
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setModalOpen(true);
      setEmail("");
      inputRef.current?.blur();
    } catch (err) {
      setError("Failed to subscribe. Please try again!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-[#181C28] py-12 md:py-16 px-2">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Stay Updated with AI Trends
        </h2>
        <p className="text-lg mb-6 text-gray-300">
          Join 20,000+ subscribers receiving our weekly AI insights newsletter.
          No spam, just the latest in AI.
        </p>
        <form
          className="flex flex-col sm:flex-row items-center gap-3 justify-center"
          onSubmit={handleSubmit}
        >
          <input
            ref={inputRef}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full sm:w-96 h-12 px-4 rounded-lg bg-[#222632] border border-[#34384a] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9b87f5] text-base"
            disabled={submitting}
            autoComplete="email"
          />
          <button
            type="submit"
            className="h-12 min-w-[120px] font-semibold px-6 rounded-lg bg-[#fff] text-[#1A1F2C] hover:bg-[#9b87f5] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={submitting}
          >
            {submitting ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
        {error && (
          <div className="text-red-400 text-sm mt-2">{error}</div>
        )}
      </div>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md bg-white rounded-2xl text-center p-8 shadow-xl">
          <div className="flex justify-center mb-2">
            <div className="w-36 h-36 mx-auto flex items-center justify-center">
              {/* This should be a Lottie animation JSON (confetti popper) */}
              <img src={confettiPopper} alt="Confetti Celebration" className="w-32 h-32 object-contain mx-auto" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-[#1A1F2C] mb-2">Subscribed!</h3>
          <p className="text-gray-700 mb-6">
            🎉 Welcome to AI-Digest. You'll receive the latest AI insights in your inbox!
          </p>
          <button
            className="bg-[#1A1F2C] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4428a6] transition"
            onClick={() => setModalOpen(false)}
          >
            Close
          </button>
        </DialogContent>
      </Dialog>
    </section>
  );
}
