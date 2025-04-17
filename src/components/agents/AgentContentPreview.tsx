import { Bot, Code, Image, Video, Brain, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const categories = [
  {
    icon: Bot,
    title: "AI Chatbots",
    count: "50+ Agents",
    description: "Conversational AI agents for customer service, sales, and support.",
    slug: "gpt-4o"
  },
  {
    icon: Image,
    title: "AI Image Generators",
    count: "35+ Agents",
    description: "Tools that create and edit images based on text descriptions."
  },
  {
    icon: Video,
    title: "AI Video Tools",
    count: "28+ Agents",
    description: "Solutions for video creation, editing, and enhancement."
  },
  {
    icon: Brain,
    title: "AI Research Assistants",
    count: "30+ Agents",
    description: "Tools that help with analysis, summarization, and research."
  },
  {
    icon: Code,
    title: "AI Coding Tools",
    count: "42+ Agents",
    description: "Development assistants and code generation solutions."
  },
  {
    icon: MessageSquare,
    title: "AI Customer Service",
    count: "38+ Agents",
    description: "Support agents that handle customer inquiries and requests."
  }
];

export default function AgentContentPreview() {
  return (
    <section id="categories" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4 text-aiblue">
            Browse by Category
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Explore our comprehensive collection of AI agents across various categories. We've curated the best tools and solutions to help you find the perfect AI agent for your specific needs.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="bg-gradient-to-br from-aiblue to-aipurple rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-sm text-aipurple font-medium mb-3">{category.count}</p>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-aiblue text-aiblue hover:bg-aiblue hover:text-white"
                  asChild
                >
                  <Link to={`/agent/${category.slug}`}>
                    View Details
                  </Link>
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button 
              className="bg-gradient-to-r from-aiblue to-aipurple hover:from-aiblue-dark hover:to-aipurple-dark text-white px-8 py-3 text-lg"
            >
              View All 25+ Categories
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
