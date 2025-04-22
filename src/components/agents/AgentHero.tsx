
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export default function AgentHero() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const categories = [
    "All Categories", 
    "Text Generation", 
    "Image Generation",
    "Video Creation",
    "Code Assistant",
    "Chat Bots",
    "Research Tools",
    "Writing & Editing",
    "Marketing Tools",
    "Data Analysis"
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      toast({
        title: "Search initiated",
        description: `Searching for "${searchTerm}"...`,
        duration: 3000,
      });
      // In a real app, navigate to search results
      navigate(`/ai-agents?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    toast({
      title: "Category selected",
      description: `Showing ${category}`,
      duration: 2000,
    });
    
    // In a real app, navigate to category filter
    if (category !== "All Categories") {
      navigate(`/category/${category.toLowerCase().replace(/\s+/g, '-')}`);
    } else {
      navigate('/ai-agents');
    }
  };

  const handleBadgeClick = (filter: string) => {
    toast({
      title: "Filter applied",
      description: `Showing ${filter}`,
      duration: 2000,
    });
    // In a real app, apply the filter
  };

  // Framer motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1 
            variants={itemVariants}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-aiblue to-aipurple"
          >
            Discover and Compare AI Tools
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Find the perfect AI solution from our curated collection of tools, agents, and services
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="max-w-2xl mx-auto"
          >
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 justify-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search AI tools by name, category, or feature..." 
                  className="pl-10 pr-4 py-3 w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-aiblue focus:border-transparent bg-white shadow-sm transition-all duration-200 hover:shadow-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Clear search"
                    type="button"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <Button 
                variant="outline"
                type="button"
                className="flex items-center gap-2 px-6 py-3 h-auto rounded-xl border-gray-300 hover:border-aiblue transition-all duration-200"
                onClick={() => {
                  toast({
                    title: "Advanced Filters",
                    description: "Filter options are now available",
                    duration: 2000,
                  });
                }}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Advanced</span> Filters
              </Button>
            </form>
            
            <motion.div 
              variants={itemVariants}
              className="mt-8 flex flex-wrap gap-3 justify-center"
            >
              {categories.map((category) => (
                <Button 
                  key={category}
                  variant="outline" 
                  className={`rounded-full transition-all ${
                    activeCategory === category 
                      ? "bg-gradient-to-r from-aiblue to-aipurple text-white border-transparent" 
                      : "bg-white/50 hover:bg-white"
                  }`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </Button>
              ))}
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="mt-6 flex flex-wrap gap-3 justify-center"
            >
              <Badge variant="outline" className="bg-white/80 cursor-pointer hover:bg-white" onClick={() => handleBadgeClick("Free Tools")}>
                Free Tools
              </Badge>
              <Badge variant="outline" className="bg-white/80 cursor-pointer hover:bg-white" onClick={() => handleBadgeClick("Trending")}>
                Trending
              </Badge>
              <Badge variant="outline" className="bg-white/80 cursor-pointer hover:bg-white" onClick={() => handleBadgeClick("New Releases")}>
                New Releases
              </Badge>
              <Badge variant="outline" className="bg-white/80 cursor-pointer hover:bg-white" onClick={() => handleBadgeClick("Most Popular")}>
                Most Popular
              </Badge>
              <Badge variant="outline" className="bg-white/80 cursor-pointer hover:bg-white" onClick={() => handleBadgeClick("Enterprise Grade")}>
                Enterprise Grade
              </Badge>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
