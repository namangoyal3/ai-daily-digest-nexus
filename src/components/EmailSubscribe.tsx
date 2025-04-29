import { useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Lottie from "lottie-react";
import { useToast } from "@/components/ui/use-toast";
import { addSubscriber } from "@/lib/postgres";

/**
 * Props:
 * - containerClassName for container (Footer/background styling)
 * - inputClassName for customizing input
 * - buttonClassName for customizing button
 * - lottiePath for custom animation json url
 * - bg: boolean, set true if you want purple background
 * - source: string to track where the subscription came from
 */
interface EmailSubscribeProps {
  containerClassName?: string;
  inputClassName?: string;
  buttonClassName?: string;
  lottiePath?: string;
  bg?: boolean;
  source?: string;
}

export default function EmailSubscribe({
  containerClassName = "",
  inputClassName = "",
  buttonClassName = "",
  lottiePath = "/lovable-uploads/party-celebration-11702446.json",
  bg = false,
  source = "main-signup",
}: EmailSubscribeProps) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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
      // Use our postgres utility function to add the subscriber
      const result = await addSubscriber(email, source);
      
      if (result.success) {
        setModalOpen(true);
        setEmail("");
        inputRef.current?.blur();
        toast({
          title: "Success!",
          description: "You've been added to our newsletter list.",
        });
      } else {
        if (result.error && result.error.code === '23505') {
          setError("This email is already subscribed to our newsletter.");
        } else {
          setError("Failed to subscribe. Please try again!");
        }
        toast({
          title: "Subscription Failed",
          description: "There was a problem signing you up. Please try again.",
          variant: "destructive"
        });
      }
    } catch (err) {
      setError("Failed to subscribe. Please try again!");
      toast({
        title: "Subscription Failed",
        description: "There was a problem connecting to our service. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const partyAnimationData = {
    "v": "5.7.6",
    "fr": 30,
    "ip": 0,
    "op": 60,
    "w": 1080,
    "h": 1080,
    "nm": "Party-celebration",
    "ddd": 0,
    "assets": [],
    "layers": [
      {
        "ddd": 0,
        "ind": 1,
        "ty": 4,
        "nm": "Confetti",
        "sr": 1,
        "ks": {
          "o": { "a": 0, "k": 100, "ix": 11 },
          "r": { "a": 0, "k": 0, "ix": 10 },
          "p": { "a": 0, "k": [540, 540, 0], "ix": 2, "l": 2 },
          "a": { "a": 0, "k": [0, 0, 0], "ix": 1, "l": 2 },
          "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 }
        },
        "ao": 0,
        "shapes": [
          {
            "ty": "gr",
            "it": [
              {
                "d": 1,
                "ty": "el",
                "s": { "a": 0, "k": [20, 20], "ix": 2 },
                "p": { "a": 0, "k": [0, 0], "ix": 3 },
                "nm": "Ellipse Path 1",
                "mn": "ADBE Vector Shape - Ellipse",
                "hd": false
              },
              {
                "ty": "fl",
                "c": { "a": 0, "k": [0.9, 0.2, 0.2, 1], "ix": 4 },
                "o": { "a": 0, "k": 100, "ix": 5 },
                "r": 1,
                "bm": 0,
                "nm": "Fill 1",
                "mn": "ADBE Vector Graphic - Fill",
                "hd": false
              },
              {
                "ty": "tr",
                "p": { "a": 1, "k": [{ "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 0, "s": [0, -200], "to": [33.333, 66.667], "ti": [-33.333, -66.667] }, { "t": 60, "s": [200, 200] }], "ix": 2 },
                "a": { "a": 0, "k": [0, 0], "ix": 1 },
                "s": { "a": 0, "k": [100, 100], "ix": 3 },
                "r": { "a": 0, "k": 0, "ix": 6 },
                "o": { "a": 0, "k": 100, "ix": 7 },
                "sk": { "a": 0, "k": 0, "ix": 4 },
                "sa": { "a": 0, "k": 0, "ix": 5 },
                "nm": "Transform"
              }
            ],
            "nm": "Confetti 1",
            "np": 2,
            "cix": 2,
            "bm": 0,
            "ix": 1,
            "mn": "ADBE Vector Group",
            "hd": false
          },
          {
            "ty": "gr",
            "it": [
              {
                "ty": "rc",
                "d": 1,
                "s": { "a": 0, "k": [20, 20], "ix": 2 },
                "p": { "a": 0, "k": [0, 0], "ix": 3 },
                "r": { "a": 0, "k": 0, "ix": 4 },
                "nm": "Rectangle Path 1",
                "mn": "ADBE Vector Shape - Rect",
                "hd": false
              },
              {
                "ty": "fl",
                "c": { "a": 0, "k": [0.2, 0.5, 0.9, 1], "ix": 4 },
                "o": { "a": 0, "k": 100, "ix": 5 },
                "r": 1,
                "bm": 0,
                "nm": "Fill 1",
                "mn": "ADBE Vector Graphic - Fill",
                "hd": false
              },
              {
                "ty": "tr",
                "p": { "a": 1, "k": [{ "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 0, "s": [0, -200], "to": [-33.333, 66.667], "ti": [33.333, -66.667] }, { "t": 60, "s": [-200, 200] }], "ix": 2 },
                "a": { "a": 0, "k": [0, 0], "ix": 1 },
                "s": { "a": 0, "k": [100, 100], "ix": 3 },
                "r": { "a": 1, "k": [{ "i": { "x": [0.833], "y": [0.833] }, "o": { "x": [0.167], "y": [0.167] }, "t": 0, "s": [0] }, { "t": 60, "s": [180] }], "ix": 6 },
                "o": { "a": 0, "k": 100, "ix": 7 },
                "sk": { "a": 0, "k": 0, "ix": 4 },
                "sa": { "a": 0, "k": 0, "ix": 5 },
                "nm": "Transform"
              }
            ],
            "nm": "Confetti 2",
            "np": 2,
            "cix": 2,
            "bm": 0,
            "ix": 2,
            "mn": "ADBE Vector Group",
            "hd": false
          },
          {
            "ty": "gr",
            "it": [
              {
                "ty": "sr",
                "d": 1,
                "pt": { "a": 0, "k": 5, "ix": 3 },
                "p": { "a": 0, "k": [0, 0], "ix": 4 },
                "or": { "a": 0, "k": 10, "ix": 7 },
                "ir": { "a": 0, "k": 5, "ix": 6 },
                "is": { "a": 0, "k": 0, "ix": 8 },
                "ix": 1,
                "nm": "Polystar Path 1",
                "mn": "ADBE Vector Shape - Star",
                "hd": false
              },
              {
                "ty": "fl",
                "c": { "a": 0, "k": [0.9, 0.7, 0.2, 1], "ix": 4 },
                "o": { "a": 0, "k": 100, "ix": 5 },
                "r": 1,
                "bm": 0,
                "nm": "Fill 1",
                "mn": "ADBE Vector Graphic - Fill",
                "hd": false
              },
              {
                "ty": "tr",
                "p": { "a": 1, "k": [{ "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 0, "s": [-100, -200], "to": [0, 66.667], "ti": [0, -66.667] }, { "t": 60, "s": [-100, 200] }], "ix": 2 },
                "a": { "a": 0, "k": [0, 0], "ix": 1 },
                "s": { "a": 0, "k": [100, 100], "ix": 3 },
                "r": { "a": 1, "k": [{ "i": { "x": [0.833], "y": [0.833] }, "o": { "x": [0.167], "y": [0.167] }, "t": 0, "s": [0] }, { "t": 60, "s": [180] }], "ix": 6 },
                "o": { "a": 0, "k": 100, "ix": 7 },
                "sk": { "a": 0, "k": 0, "ix": 4 },
                "sa": { "a": 0, "k": 0, "ix": 5 },
                "nm": "Transform"
              }
            ],
            "nm": "Confetti 3",
            "np": 2,
            "cix": 2,
            "bm": 0,
            "ix": 3,
            "mn": "ADBE Vector Group",
            "hd": false
          },
          {
            "ty": "gr",
            "it": [
              {
                "ty": "sr",
                "d": 1,
                "pt": { "a": 0, "k": 5, "ix": 3 },
                "p": { "a": 0, "k": [0, 0], "ix": 4 },
                "or": { "a": 0, "k": 10, "ix": 7 },
                "ir": { "a": 0, "k": 5, "ix": 6 },
                "is": { "a": 0, "k": 0, "ix": 8 },
                "ix": 1,
                "nm": "Polystar Path 1",
                "mn": "ADBE Vector Shape - Star",
                "hd": false
              },
              {
                "ty": "fl",
                "c": { "a": 0, "k": [0.2, 0.9, 0.5, 1], "ix": 4 },
                "o": { "a": 0, "k": 100, "ix": 5 },
                "r": 1,
                "bm": 0,
                "nm": "Fill 1",
                "mn": "ADBE Vector Graphic - Fill",
                "hd": false
              },
              {
                "ty": "tr",
                "p": { "a": 1, "k": [{ "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 0, "s": [100, -200], "to": [0, 66.667], "ti": [0, -66.667] }, { "t": 60, "s": [100, 200] }], "ix": 2 },
                "a": { "a": 0, "k": [0, 0], "ix": 1 },
                "s": { "a": 0, "k": [100, 100], "ix": 3 },
                "r": { "a": 1, "k": [{ "i": { "x": [0.833], "y": [0.833] }, "o": { "x": [0.167], "y": [0.167] }, "t": 0, "s": [0] }, { "t": 60, "s": [180] }], "ix": 6 },
                "o": { "a": 0, "k": 100, "ix": 7 },
                "sk": { "a": 0, "k": 0, "ix": 4 },
                "sa": { "a": 0, "k": 0, "ix": 5 },
                "nm": "Transform"
              }
            ],
            "nm": "Confetti 4",
            "np": 2,
            "cix": 2,
            "bm": 0,
            "ix": 4,
            "mn": "ADBE Vector Group",
            "hd": false
          }
        ],
        "ip": 0,
        "op": 60,
        "st": 0,
        "bm": 0
      }
    ],
    "markers": []
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
                animationData={partyAnimationData}
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
