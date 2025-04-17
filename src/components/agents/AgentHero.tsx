
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function AgentHero() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-aiblue to-aipurple">
            Discover the Perfect AI Agent for Your Needs
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Browse our comprehensive directory of AI agents from around the world. Compare features, read reviews, and find the perfect AI solution for your specific use case.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search for AI agents..." 
                className="pl-10 pr-4 py-3 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-aiblue focus:border-transparent"
              />
            </div>
            <Button 
              className="bg-gradient-to-r from-aiblue to-aipurple hover:from-aiblue-dark hover:to-aipurple-dark text-white px-8 py-6 text-lg h-auto"
              onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Categories
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
