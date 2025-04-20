
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    name: "AI Chatbots",
    description: "Conversational AI models for natural language interaction",
    icon: "💬",
    slug: "ai-chatbots",
    count: 46,
  },
  {
    name: "Image Generation",
    description: "Create stunning visuals with AI-powered image generators",
    icon: "🖼️",
    slug: "image-generation",
    count: 38,
  },
  {
    name: "Video Creation",
    description: "Transform text into compelling video content automatically",
    icon: "🎥",
    slug: "video-creation",
    count: 24,
  },
  {
    name: "Code Assistants",
    description: "AI tools that help write, debug and optimize code",
    icon: "💻",
    slug: "code-assistants",
    count: 31,
  },
  {
    name: "Writing & Editing",
    description: "Enhance your writing with AI-powered editing tools",
    icon: "✍️",
    slug: "writing-editing",
    count: 42,
  },
  {
    name: "Marketing Tools",
    description: "AI solutions for content marketing, SEO, and analysis",
    icon: "📈",
    slug: "marketing-tools",
    count: 35,
  },
  {
    name: "Research Assistants",
    description: "AI tools for academic and business research support",
    icon: "🔍",
    slug: "research-assistants",
    count: 18,
  },
  {
    name: "Data Analysis",
    description: "Process and visualize complex data with AI assistance",
    icon: "📊",
    slug: "data-analysis",
    count: 27,
  },
];

export default function AgentCategories() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore AI tools organized by category to find the perfect solution for your specific needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Link to={`/category/${category.slug}`}>
                  <Card className="h-full hover:shadow-md transition-all cursor-pointer border border-gray-200">
                    <CardContent className="p-6">
                      <div className="text-4xl mb-4">{category.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                      <span className="text-aiblue text-sm font-medium">
                        {category.count} tools
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
