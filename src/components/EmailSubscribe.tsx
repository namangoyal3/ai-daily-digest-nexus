
import { useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Lottie from "lottie-react";

/**
 * Props:
 * - containerClassName for container (Footer/background styling)
 * - inputClassName for customizing input
 * - buttonClassName for customizing button
 * - lottiePath for custom animation json url
 * - bg: boolean, set true if you want purple background
 */
interface EmailSubscribeProps {
  containerClassName?: string;
  inputClassName?: string;
  buttonClassName?: string;
  lottiePath?: string;
  bg?: boolean;
}

export default function EmailSubscribe({
  containerClassName = "",
  inputClassName = "",
  buttonClassName = "",
  lottiePath = "/lovable-uploads/party-celebration-11702446.json",
  bg = false,
}: EmailSubscribeProps) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
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
    <div
      className={
        containerClassName ||
        (bg
          ? "w-full bg-gradient-to-r from-[#9b87f5] to-[#7c3aed] py-12 px-2"
          : "")
      }
    >
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Stay Updated with AI Trends
        </h3>
        <p className="text-gray-200 mb-6">
          Join 20,000+ subscribers receiving our weekly AI insights newsletter.<br />
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
            className={
              inputClassName ||
              "w-full sm:w-96 h-12 px-4 rounded-lg bg-white/10 border border-white/30 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#fff] text-base"
            }
            disabled={submitting}
            autoComplete="email"
          />
          <button
            type="submit"
            className={
              buttonClassName ||
              "h-12 min-w-[120px] font-semibold px-6 rounded-lg bg-[#fff] text-[#622cd2] hover:bg-[#9b87f5] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            }
            disabled={submitting}
          >
            {submitting ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
        {error && (
          <div className="text-red-200 text-sm mt-2">{error}</div>
        )}
      </div>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md bg-white rounded-2xl text-center p-8 shadow-xl">
          <div className="flex justify-center mb-2">
            <div className="w-36 h-36 mx-auto flex items-center justify-center">
              <Lottie
                animationData={require("../../public/lovable-uploads/party-celebration-11702446.json")}
                loop={false}
                autoplay
                style={{ width: "130px", height: "130px" }}
              />
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
    </div>
  );
}
