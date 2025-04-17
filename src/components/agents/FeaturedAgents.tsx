
import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredAgents = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    company: "OpenAI",
    description: "Advanced language model with multimodal capabilities, supporting text, image, and audio inputs and outputs.",
    category: "AI Chatbots",
    pricing: "Paid",
    rating: 4.9,
    reviewCount: 1245,
    logo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    id: "astra",
    name: "Project Astra",
    company: "Google DeepMind",
    description: "AI assistant with advanced reasoning and problem-solving capabilities for complex tasks.",
    category: "AI Research Assistants",
    pricing: "Enterprise",
    rating: 4.8,
    reviewCount: 867,
    logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    id: "autogpt",
    name: "Auto-GPT",
    company: "Toran Bruce Richards",
    description: "Autonomous AI agent capable of completing complex tasks with minimal human intervention.",
    category: "AI Productivity Agents",
    pricing: "Freemium",
    rating: 4.6,
    reviewCount: 1032,
    logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    id: "devin",
    name: "Devin AI",
    company: "Cognition Labs",
    description: "AI software engineer capable of developing complete applications and solving complex coding problems.",
    category: "AI Coding Tools",
    pricing: "Paid",
    rating: 4.7,
    reviewCount: 593,
    logo: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=100&h=100&q=80"
  }
];

export default function FeaturedAgents() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-white via-blue-50/20 to-purple-50/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-aiblue mb-2">
                Featured AI Agents
              </h2>
              <p className="text-gray-600 max-w-2xl">
                Discover the most popular and innovative AI agents that are changing the way we work and create.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button 
                variant="outline"
                className="border-aiblue text-aiblue hover:bg-aiblue hover:text-white"
              >
                View All Agents
              </Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {featuredAgents.map((agent) => (
              <div 
                key={agent.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex p-6">
                  <div className="w-20 h-20 mr-6 flex-shrink-0">
                    <img 
                      src={agent.logo} 
                      alt={agent.name} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-heading text-xl font-semibold">{agent.name}</h3>
                      <span className="text-sm font-medium text-white bg-gradient-to-r from-aiblue to-aipurple px-3 py-1 rounded-full">
                        {agent.pricing}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">by {agent.company}</p>
                    <p className="text-gray-700 mb-3 line-clamp-2">{agent.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < Math.floor(agent.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">({agent.reviewCount})</span>
                      </div>
                      <span className="text-sm text-aipurple font-medium">{agent.category}</span>
                    </div>
                  </div>
                </div>
                <div className="flex border-t border-gray-100">
                  <Button 
                    variant="ghost" 
                    className="flex-1 rounded-none py-3 text-aiblue hover:bg-gray-50"
                  >
                    View Details
                  </Button>
                  <div className="w-px bg-gray-100"></div>
                  <Button 
                    variant="ghost"
                    className="flex-1 rounded-none py-3 text-aiblue hover:bg-gray-50"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Website
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
