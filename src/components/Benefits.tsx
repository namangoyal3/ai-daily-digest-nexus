
import { CircleCheck, Clock, TrendingUp, Zap } from "lucide-react";

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-r from-aiblue-light/10 to-aipurple/10 rounded-full mb-4 text-aipurple">
        {icon}
      </div>
      <h3 className="font-heading font-bold text-xl mb-3 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
}

export default function Benefits() {
  const benefits = [
    {
      icon: <Clock className="w-7 h-7" />,
      title: "Save Time",
      description: "Digest key AI developments in just 5 minutes daily, instead of spending hours searching multiple sources."
    },
    {
      icon: <CircleCheck className="w-7 h-7" />,
      title: "Never Miss Critical Updates",
      description: "Get the most important AI news and breakthroughs delivered directly to your inbox every morning."
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: "Gain Competitive Insights",
      description: "Access exclusive analysis and trends to keep you ahead in the rapidly evolving AI landscape."
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Enhance Decision Making",
      description: "Make better strategic and technical decisions with comprehensive AI development tracking."
    }
  ];

  return (
    <section id="benefits" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-aiblue">
            Why Subscribe to AI Daily Digest?
          </h2>
          <p className="text-gray-600 text-lg md:text-xl">
            Join thousands of professionals who rely on our expertly curated AI insights
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
