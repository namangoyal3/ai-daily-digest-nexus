
import { Button } from "@/components/ui/button";

export default function AgentHero() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-aiblue to-aipurple">
            Discover the Perfect AI Agent for Your Needs
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Browse our curated directory of AI agents from around the world. Compare features, read reviews, and find the perfect AI solution for your specific use case.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-gradient-to-r from-aiblue to-aipurple hover:from-aiblue-dark hover:to-aipurple-dark text-white px-8 py-6 text-lg h-auto"
              onClick={() => document.getElementById('subscribe')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started
            </Button>
            <Button 
              variant="outline"
              className="border-aiblue text-aiblue hover:bg-aiblue hover:text-white px-8 py-6 text-lg h-auto"
            >
              Browse Directory
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
