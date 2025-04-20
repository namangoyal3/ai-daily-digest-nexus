
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface AgentCardProps {
  name: string;
  description: string;
  category: string;
  rating: number;
  image: string;
  price: string;
  slug: string;
  isNew?: boolean;
  isTrending?: boolean;
}

const AgentCard = ({ name, description, category, rating, image, price, slug, isNew, isTrending }: AgentCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-200 overflow-hidden group">
        <CardHeader className="p-0">
          <div className="relative overflow-hidden aspect-video">
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <Badge className="absolute top-3 right-3 bg-white/90 text-aiblue">
              {category}
            </Badge>
            {isNew && (
              <Badge className="absolute top-3 left-3 bg-green-500 text-white">
                New
              </Badge>
            )}
            {isTrending && (
              <Badge className="absolute top-3 left-3 bg-orange-500 text-white">
                Trending
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-3">
            <CardTitle className="text-xl font-bold">{name}</CardTitle>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          </div>
          <CardDescription className="mb-4 line-clamp-2">
            {description}
          </CardDescription>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-aiblue">{price}</span>
            <Button variant="outline" className="hover:bg-aiblue hover:text-white">
              <Link to={`/agent/${slug}`}>Learn More</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function AgentGrid() {
  const agents = [
    {
      name: "ChatGPT",
      description: "Advanced language model for natural conversations and content generation",
      category: "Chat Bot",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
      price: "Free - $20/mo",
      slug: "gpt-4o",
      isTrending: true
    },
    {
      name: "Claude",
      description: "AI assistant with advanced reasoning capabilities and long context windows",
      category: "Chat Bot",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1678382178331-bea07b0fe97b",
      price: "From $20/mo",
      slug: "claude-3-opus",
      isTrending: true
    },
    {
      name: "GitHub Copilot",
      description: "AI pair programmer that helps you write better code faster",
      category: "Code Assistant",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1661961110671-77b71b929d52",
      price: "$10/mo",
      slug: "github-copilot"
    },
    {
      name: "Midjourney",
      description: "Create beautiful artwork using advanced AI image generation",
      category: "Image Generation",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1633186640043-61586b2e2de5",
      price: "From $10/mo",
      slug: "midjourney"
    },
    {
      name: "Gemini",
      description: "Google's multimodal AI for text, images, and complex reasoning",
      category: "Multimodal AI",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd",
      price: "Free - $20/mo",
      slug: "gemini-pro"
    },
    {
      name: "Perplexity AI",
      description: "AI search engine that provides answers with real-time information and citations",
      category: "Search Engine",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
      price: "Free - $20/mo",
      slug: "perplexity-ai",
      isNew: true
    },
    {
      name: "Anthropic Claude",
      description: "Advanced reasoning assistant for complex tasks and long-context understanding",
      category: "Research Assistant",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2",
      price: "$20/mo",
      slug: "anthropic-claude"
    },
    {
      name: "DALL-E 3",
      description: "OpenAI's latest image generation model with enhanced creative capabilities",
      category: "Image Generation",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679",
      price: "Credit-based",
      slug: "dall-e-3",
      isNew: true
    },
    {
      name: "Jasper AI",
      description: "AI copywriting tool for marketing content creation and SEO optimization",
      category: "Content Creation",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1542435503-956c469947f6",
      price: "From $39/mo",
      slug: "jasper-ai"
    },
    {
      name: "Sora",
      description: "OpenAI's text-to-video model for creating realistic video content",
      category: "Video Generation",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1535016120720-40c646be5580",
      price: "Invite only",
      slug: "sora-ai",
      isNew: true
    },
    {
      name: "Synthesia",
      description: "Create professional AI videos with virtual presenters in minutes",
      category: "Video Creation",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1603766806347-783e0cba8eaf",
      price: "From $22/mo",
      slug: "synthesia"
    },
    {
      name: "Grammarly",
      description: "AI-powered writing assistant for grammar, clarity, and style improvements",
      category: "Writing Assistant",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3",
      price: "Free - $30/mo",
      slug: "grammarly"
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, index) => (
            <AgentCard key={index} {...agent} />
          ))}
        </div>
      </div>
    </section>
  );
}
