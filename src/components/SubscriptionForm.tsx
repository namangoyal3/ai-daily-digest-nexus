
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Send } from "lucide-react";
import { addSubscriber } from "@/lib/postgres";
import { useToast } from "@/components/ui/use-toast";

export default function SubscriptionForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ email: "" });
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ email: "" });

    if (!validateEmail(email)) {
      setErrors({ email: "Please enter a valid email address" });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await addSubscriber(email, 'subscription-form');
      
      if (result.success) {
        setSubmitted(true);
        toast({
          title: "Success!",
          description: "You've been added to our newsletter list.",
        });
      } else {
        // Check if it's a duplicate email error
        if (result.error && result.error.code === '23505') {
          setErrors({ email: "This email is already subscribed to our newsletter." });
        } else {
          setErrors({ email: "Something went wrong. Please try again." });
        }
      }
    } catch (err) {
      setErrors({ email: "Failed to subscribe. Please try again later." });
      toast({
        title: "Subscription Failed",
        description: "There was a problem connecting to our service. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setSubmitted(false);
    setErrors({ email: "" });
  };

  return (
    <section id="subscribe" className="py-16 md:py-24 bg-gradient-to-br from-white via-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-6 md:p-8 lg:p-12">
              <div className="max-w-xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-aiblue">
                    Get Your Daily AI Insights
                  </h2>
                  <p className="text-gray-600">
                    Join thousands of professionals staying ahead with our curated AI digest. 
                    No spam, just valuable insights.
                  </p>
                </div>
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="email" className="text-base">
                        Email address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className={`mt-1 h-12 text-lg ${errors.email ? "border-red-500" : ""}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 text-lg font-semibold rounded-xl bg-gradient-to-r from-[#6459ef] to-[#a784fa] hover:from-[#3a33b9] hover:to-[#7e69ab] shadow-md transition-colors"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          <span>Subscribing...</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Send className="mr-2 h-5 w-5" />
                          <span>Subscribe Now</span>
                        </div>
                      )}
                    </Button>
                    <div className="flex items-center justify-center text-xs text-gray-500">
                      <Lock className="h-3 w-3 mr-1" />
                      <span>Your information is secure and will never be shared</span>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-heading font-bold mb-2">Thanks for subscribing!</h3>
                    <p className="text-gray-600 mb-6">
                      Check your inbox for a verification code to complete your subscription.
                    </p>
                    <Button
                      variant="outline"
                      className="border-aiblue text-aiblue hover:bg-aiblue hover:text-white"
                      onClick={resetForm}
                    >
                      Subscribe with another email
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
