
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqItems = [
    {
      question: "What is AI Daily Digest?",
      answer: "AI Daily Digest is a curated newsletter delivering the most important developments in artificial intelligence directly to your inbox every morning. Each edition includes breaking news, market insights, expert opinions, and analysis to keep you informed about the rapidly evolving AI landscape in just 5 minutes of reading time."
    },
    {
      question: "How often will I receive the newsletter?",
      answer: "The AI Daily Digest is delivered every weekday morning (Monday through Friday) at 7:00 AM EST. We don't send newsletters on weekends or major holidays."
    },
    {
      question: "What topics are covered in the newsletter?",
      answer: "Our newsletter covers a wide range of AI-related topics, including but not limited to: recent breakthroughs in AI research, applications of AI across industries, market trends and investment insights, ethical considerations and regulations, interviews with AI experts, and practical implications of AI advancements for businesses and individuals."
    },
    {
      question: "Can I see a sample before subscribing?",
      answer: "Yes! We offer a free 7-day trial which gives you access to a week's worth of newsletters. You can also preview sample content in the 'Content Preview' section of this website."
    },
    {
      question: "How much does a subscription cost?",
      answer: "We offer several subscription options. Our Premium plan is $9.99/month or $7.99/month when billed annually. We also offer Enterprise plans for teams starting at $29.99/month. All plans come with a 7-day free trial."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription at any time through your account settings. If you cancel during your free trial period, you won't be charged. If you cancel after being billed, you'll retain access until the end of your billing period."
    },
    {
      question: "How does the verification process work?",
      answer: "After submitting your email and phone number, we'll send a 6-digit verification code to your email. Enter this code on our verification page within 10 minutes to complete your subscription. This helps us ensure the security of your account and prevent spam."
    },
    {
      question: "Can I share my subscription with others?",
      answer: "Individual Premium subscriptions are for personal use only and cannot be shared. If you need multi-user access, please consider our Enterprise plan, which includes 5 user seats with options to add more."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, including Visa, Mastercard, American Express, and Discover. We also support PayPal for subscription payments."
    },
    {
      question: "How do I use a coupon code?",
      answer: "If you have a coupon code, you can enter it in the coupon field during the checkout process or in the pricing section of our website. Valid coupon codes will be automatically applied to your subscription."
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-aiblue">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg">
            Everything you need to know about AI Daily Digest
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                <AccordionTrigger className="font-heading font-medium text-left py-6 hover:text-aiblue">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
