
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, Send } from "lucide-react";

export default function SubscriptionForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [acceptsOffers, setAcceptsOffers] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone: string) => {
    // Basic phone validation - accepts different formats
    const regex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return regex.test(phone);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({ email: "", phone: "" });
    
    // Validate inputs
    let valid = true;
    
    if (!validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: "Please enter a valid email address" }));
      valid = false;
    }
    
    if (!validatePhone(phone)) {
      setErrors(prev => ({ ...prev, phone: "Please enter a valid phone number" }));
      valid = false;
    }
    
    if (valid) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 800); // Reduced from 1500ms to 800ms for better UX
    }
  };

  const resetForm = () => {
    setEmail("");
    setPhone("");
    setAcceptsOffers(false);
    setSubmitted(false);
    setErrors({ email: "", phone: "" });
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
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email" className="text-base">
                          Email address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          className={`mt-1 h-12 ${errors.email ? 'border-red-500' : ''}`}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="phone" className="text-base">
                          Phone number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(123) 456-7890"
                          className={`mt-1 h-12 ${errors.phone ? 'border-red-500' : ''}`}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="offers" 
                        checked={acceptsOffers}
                        onCheckedChange={(checked) => setAcceptsOffers(checked as boolean)}
                      />
                      <label
                        htmlFor="offers"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I'd like to receive special offers and updates
                      </label>
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-aiblue to-aipurple hover:from-aiblue-dark hover:to-aipurple-dark text-white font-medium h-12"
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
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
