import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

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
        <CardContent className="p-4 sm:p-6">
          <div className="flex justify-between items-start mb-3">
            <CardTitle className="text-lg sm:text-xl font-bold">{name}</CardTitle>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          </div>
          <CardDescription className="mb-4 line-clamp-2 text-sm sm:text-base">
            {description}
          </CardDescription>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-aiblue text-sm sm:text-base">{price}</span>
            <Button size="sm" variant="outline" className="text-xs sm:text-sm hover:bg-aiblue hover:text-white">
              <Link to={`/agent/${slug}`}>Learn More</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function AgentGrid() {
  const isMobile = useIsMobile();
  
  const agents = [
    {
      name: "ChatGPT",
      description: "Advanced language model for natural conversations and content generation",
      category: "Chat Bot",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1673187172310-98108bbcd0ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      price: "Free - $20/mo",
      slug: "gpt-4o",
      isTrending: true
    },
    {
      name: "Claude",
      description: "AI assistant with advanced reasoning capabilities and long context windows",
      category: "Chat Bot",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      price: "From $20/mo",
      slug: "claude-3-opus",
      isTrending: true
    },
    {
      name: "GitHub Copilot",
      description: "AI pair programmer that helps you write better code faster",
      category: "Code Assistant",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
      price: "$10/mo",
      slug: "github-copilot"
    },
    {
      name: "Midjourney",
      description: "Create beautiful artwork using advanced AI image generation",
      category: "Image Generation",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1614729375474-902d70cafafa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      price: "From $10/mo",
      slug: "midjourney"
    },
    {
      name: "Gemini",
      description: "Google's multimodal AI for text, images, and complex reasoning",
      category: "Multimodal AI",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      price: "Free - $20/mo",
      slug: "gemini-pro"
    },
    {
      name: "Perplexity AI",
      description: "AI search engine that provides answers with real-time information and citations",
      category: "Search Engine",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
      price: "Free - $20/mo",
      slug: "perplexity-ai",
      isNew: true
    },
    {
      name: "Anthropic Claude",
      description: "Advanced reasoning assistant for complex tasks and long-context understanding",
      category: "Research Assistant",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      price: "$20/mo",
      slug: "anthropic-claude"
    },
    {
      name: "DALL-E 3",
      description: "OpenAI's latest image generation model with enhanced creative capabilities",
      category: "Image Generation",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1684891963316-7c21b0718c66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
      price: "Credit-based",
      slug: "dall-e-3",
      isNew: true
    },
    {
      name: "Jasper AI",
      description: "AI copywriting tool for marketing content creation and SEO optimization",
      category: "Content Creation",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1495592822108-9e6261896da8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      price: "From $39/mo",
      slug: "jasper-ai"
    },
    {
      name: "Sora",
      description: "OpenAI's text-to-video model for creating realistic video content",
      category: "Video Generation",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1551817958-d9d86fb29431?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      price: "Invite only",
      slug: "sora-ai",
      isNew: true
    },
    {
      name: "Synthesia",
      description: "Create professional AI videos with virtual presenters in minutes",
      category: "Video Creation",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1615598255772-be0e66da48cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      price: "From $22/mo",
      slug: "synthesia"
    },
    {
      name: "Grammarly",
      description: "AI-powered writing assistant for grammar, clarity, and style improvements",
      category: "Writing Assistant",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80",
      price: "Free - $30/mo",
      slug: "grammarly"
    },
  ];

  return (
    <section className="py-8 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {agents.map((agent, index) => (
            <div id={agent.category.toLowerCase().replace(/\s+/g, '-')} key={index}>
              <AgentCard {...agent} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
