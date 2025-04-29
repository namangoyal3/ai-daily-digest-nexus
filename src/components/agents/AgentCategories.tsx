
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const categories = [
  {
    title: "Chat Assistants",
    description: "Conversational AI tools for customer support, writing, and personal assistance",
    icon: "💬",
    color: "from-blue-500 to-indigo-600",
    examples: ["ChatGPT", "Claude", "Gemini"]
  },
  {
    title: "Image Generation",
    description: "Tools that create and edit images with AI",
    icon: "🖼️",
    color: "from-pink-500 to-rose-600",
    examples: ["DALL-E", "Midjourney", "Stable Diffusion"]
  },
  {
    title: "Code Assistants",
    description: "AI-powered coding and programming tools",
    icon: "👨‍💻",
    color: "from-green-500 to-emerald-600",
    examples: ["GitHub Copilot", "Cursor", "Sourcegraph Cody"]
  },
  {
    title: "Video Creation",
    description: "AI tools for creating and editing video content",
    icon: "🎬",
    color: "from-orange-500 to-amber-600",
    examples: ["Runway", "Synthesia", "Descript"]
  },
  {
    title: "Research Tools",
    description: "AI-powered research and information analysis",
    icon: "🔍",
    color: "from-purple-500 to-violet-600",
    examples: ["Consensus", "Perplexity AI", "Elicit"]
  },
  {
    title: "Data Analysis",
    description: "Tools for analyzing and visualizing data using AI",
    icon: "📊",
    color: "from-cyan-500 to-blue-600",
    examples: ["Tableau", "PowerBI", "IBM Watson"]
  }
];

export default function AgentCategories() {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleCategoryClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const handleCategoryAction = (category) => {
    // Navigate to the relevant section of the agent grid using fragment identifiers
    const element = document.getElementById(category.title.toLowerCase().replace(/\s+/g, '-'));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      toast({
        title: `${category.title}`,
        description: `Exploring ${category.title} tools`,
        duration: 3000,
      });
    } else {
      // If no element found, scroll to the agent grid
      const agentGrid = document.querySelector('section.py-12.md\\:py-16.bg-gray-50');
      if (agentGrid) {
        agentGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        toast({
          title: `${category.title}`,
          description: `Exploring ${category.title} tools`,
          duration: 3000,
        });
      }
    }
  };
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover AI tools and agents organized by functionality to find the perfect solution for your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`relative rounded-xl p-6 overflow-hidden transition-all duration-300 cursor-pointer ${
                activeIndex === index ? 'ring-2 ring-aiblue bg-white shadow-lg' : 'bg-white/80 shadow hover:shadow-md'
              }`}
              onClick={() => handleCategoryClick(index)}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5`} />
              
              <div className="relative z-10">
                <div className={`inline-block p-3 text-2xl mb-4 rounded-lg bg-gradient-to-br ${category.color} bg-opacity-10`}>
                  {category.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                
                <div className={`transition-all duration-300 overflow-hidden ${
                  activeIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="mb-4">
                    <p className="font-medium text-sm text-gray-500">Popular examples:</p>
                    <ul className="flex flex-wrap gap-2 mt-2">
                      {category.examples.map((example, i) => (
                        <li key={i} className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryAction(category);
                    }}
                    variant="ghost" 
                    className="text-aiblue hover:text-aiblue-dark flex items-center gap-1 p-0"
                  >
                    <span>Explore {category.title}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
