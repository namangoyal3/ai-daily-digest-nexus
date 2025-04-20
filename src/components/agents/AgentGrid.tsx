
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface AgentCardProps {
  name: string;
  description: string;
  category: string;
  rating: number;
  image: string;
  price: string;
}

const AgentCard = ({ name, description, category, rating, image, price }: AgentCardProps) => {
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
              Learn More
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
      price: "Free - $20/mo"
    },
    {
      name: "Midjourney",
      description: "AI-powered image generation tool for creating stunning artwork",
      category: "Image Generation",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1678382178331-bea07b0fe97b",
      price: "From $10/mo"
    },
    {
      name: "GitHub Copilot",
      description: "AI pair programmer that helps you write better code faster",
      category: "Code Assistant",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1661961110671-77b71b929d52",
      price: "$10/mo"
    },
    // Add more agents as needed
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
