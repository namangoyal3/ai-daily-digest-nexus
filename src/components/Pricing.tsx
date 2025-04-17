import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleCheck, CircleDollarSign } from "lucide-react";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  
  const handleApplyCoupon = () => {
    if (!couponCode) return;
    
    setIsApplyingCoupon(true);
    
    // Simulate API call for coupon validation
    setTimeout(() => {
      setCouponApplied(true);
      setIsApplyingCoupon(false);
    }, 1000);
  };
  
  const pricingPlans = [
    {
      name: "Free Trial",
      price: { monthly: 0, annual: 0 },
      description: "Get a taste of our daily AI insights",
      features: [
        "7-day free access",
        "Basic AI news summaries",
        "Limited article access",
        "Web reading only"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Premium",
      price: { monthly: 799, annual: 649 },
      description: "Full access to all AI Daily Digest content",
      features: [
        "Complete daily digests",
        "In-depth analysis & insights",
        "Market trends & predictions",
        "Email and mobile access",
        "Audio versions of articles",
        "Exclusive interviews"
      ],
      cta: "Subscribe Now",
      popular: true
    },
    {
      name: "Enterprise",
      price: { monthly: 2499, annual: 1999 },
      description: "Team access with additional features",
      features: [
        "Everything in Premium",
        "Multi-user access (5 seats)",
        "Custom topic tracking",
        "Quarterly industry reports",
        "API access",
        "Priority support"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-aiblue">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600 text-lg md:text-xl mb-8">
            Choose the plan that's right for you
          </p>
          
          <div className="flex items-center justify-center">
            <span className={`mr-3 ${!isAnnual ? 'font-medium text-aiblue' : 'text-gray-500'}`}>
              Monthly
            </span>
            <div 
              className="relative inline-flex h-6 w-11 cursor-pointer rounded-full bg-gray-300"
              onClick={() => setIsAnnual(!isAnnual)}
            >
              <span 
                className={`absolute transform transition-transform duration-200 ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 rounded-full bg-white mt-1`} 
              />
            </div>
            <span className={`ml-3 flex items-center ${isAnnual ? 'font-medium text-aiblue' : 'text-gray-500'}`}>
              Annual
              <span className="ml-1.5 py-0.5 px-2 text-xs font-semibold text-white bg-green-500 rounded-full">
                Save 20%
              </span>
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`
                bg-white rounded-xl border overflow-hidden
                ${plan.popular 
                  ? 'border-aipurple shadow-lg transform md:-translate-y-4' 
                  : 'border-gray-200 shadow-sm'
                }
              `}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-aipurple to-aipurple-dark text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-6 md:p-8">
                <h3 className="font-heading text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">
                      ₹{isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="text-gray-500 ml-2">/ month</span>
                  </div>
                  {isAnnual && (
                    <div className="text-sm text-green-600 mt-1">
                      Billed annually (₹{(isAnnual ? plan.price.annual : plan.price.monthly) * 12})
                    </div>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CircleCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular
                      ? 'bg-gradient-to-r from-aiblue to-aipurple hover:from-aiblue-dark hover:to-aipurple-dark'
                      : plan.name === 'Free Trial' 
                        ? 'bg-gray-800 hover:bg-gray-900' 
                        : 'bg-white text-aiblue border-2 border-aiblue hover:bg-aiblue hover:text-white'
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="max-w-lg mx-auto mt-16 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center mb-4">
            <CircleDollarSign className="h-6 w-6 text-aipurple mr-2" />
            <h3 className="font-heading font-semibold text-lg">Have a coupon code?</h3>
          </div>
          
          <div className="flex space-x-2">
            <Input
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter your code"
              disabled={couponApplied}
              className={couponApplied ? 'bg-green-50 border-green-500' : ''}
            />
            <Button 
              variant="outline"
              className={
                couponApplied 
                  ? "border-green-500 text-green-600" 
                  : "border-aipurple text-aipurple hover:bg-aipurple hover:text-white"
              }
              onClick={handleApplyCoupon}
              disabled={!couponCode || couponApplied || isApplyingCoupon}
            >
              {isApplyingCoupon ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-aipurple mr-1"></div>
                  <span>Applying...</span>
                </div>
              ) : couponApplied ? (
                <div className="flex items-center">
                  <CircleCheck className="h-4 w-4 mr-1" />
                  <span>Applied</span>
                </div>
              ) : "Apply"}
            </Button>
          </div>
          
          {couponApplied && (
            <p className="mt-2 text-sm text-green-600">
              Coupon applied successfully! 25% discount will be applied at checkout.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
