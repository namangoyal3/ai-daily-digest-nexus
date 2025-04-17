
import { Bot, Zap, Code } from "lucide-react";

const categories = [
  {
    icon: Bot,
    title: "AI Chatbots",
    count: "50+ Agents",
    description: "Discover conversational AI agents for customer service, sales, and support."
  },
  {
    icon: Zap,
    title: "Productivity Tools",
    count: "30+ Agents",
    description: "Explore AI-powered tools to automate tasks and boost your workflow."
  },
  {
    icon: Code,
    title: "Development Assistants",
    count: "25+ Agents",
    description: "Find AI coding assistants and development automation tools."
  }
];

export default function AgentContentPreview() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4 text-aiblue">
            Popular Categories
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore our most popular AI agent categories and find the perfect solution for your needs.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-gradient-to-br from-aiblue to-aipurple rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-sm text-aipurple font-medium mb-3">{category.count}</p>
                <p className="text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
