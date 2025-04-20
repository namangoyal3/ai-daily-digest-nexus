
import { Button } from "@/components/ui/button";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";

export default function AgentHero() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-aiblue to-aipurple">
            Discover and Compare AI Tools
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Find the perfect AI solution from our curated collection of tools, agents, and services
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search AI tools..." 
                  className="pl-10 pr-4 py-3 w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-aiblue focus:border-transparent bg-white shadow-sm transition-all duration-200 hover:shadow-md"
                />
              </div>
              <Button 
                variant="outline"
                className="flex items-center gap-2 px-6 py-3 h-auto rounded-xl border-gray-300 hover:border-aiblue transition-all duration-200"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Button variant="outline" className="rounded-full bg-white/50 hover:bg-white">
                All Categories
              </Button>
              <Button variant="outline" className="rounded-full bg-white/50 hover:bg-white">
                Text Generation
              </Button>
              <Button variant="outline" className="rounded-full bg-white/50 hover:bg-white">
                Image Generation
              </Button>
              <Button variant="outline" className="rounded-full bg-white/50 hover:bg-white">
                Code Assistant
              </Button>
              <Button variant="outline" className="rounded-full bg-white/50 hover:bg-white">
                Chat Bots
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
