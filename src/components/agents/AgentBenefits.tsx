
import { Check, Search, BarChart, Shield, Link } from "lucide-react";

const benefits = [
  {
    icon: <Search className="h-5 w-5 text-white" />,
    title: "Comprehensive Directory",
    description: "Access our extensive collection of AI agents across 25+ categories and various use cases."
  },
  {
    icon: <BarChart className="h-5 w-5 text-white" />,
    title: "Detailed Comparisons",
    description: "Compare features, pricing, and integration options to find the perfect fit for your needs."
  },
  {
    icon: <Shield className="h-5 w-5 text-white" />,
    title: "User Reviews & Ratings",
    description: "Read authentic user experiences and ratings to make informed decisions."
  },
  {
    icon: <Link className="h-5 w-5 text-white" />,
    title: "Integration Guides",
    description: "Get step-by-step guidance on integrating AI agents into your workflow or applications."
  }
];

export default function AgentBenefits() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12 text-aiblue">
            Why Choose Our Directory?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="mt-1 bg-gradient-to-br from-aiblue to-aipurple rounded-full p-1">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
