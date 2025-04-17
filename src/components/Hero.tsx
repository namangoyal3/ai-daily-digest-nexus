
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const scrollToSubscribe = () => {
    document.getElementById('subscribe')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50 py-16 md:py-24">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-aiblue leading-tight mb-6">
                Stay Ahead with AI Insights Delivered Daily
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                Curated AI news, breakthroughs, and analysis in a 5-minute daily read. 
                Never miss important developments in artificial intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-gradient-to-r from-aiblue to-aipurple hover:from-aiblue-dark hover:to-aipurple-dark text-white font-medium px-6 py-6 text-lg"
                  onClick={scrollToSubscribe}
                >
                  Subscribe Now
                  <ArrowDown className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" className="border-aiblue text-aiblue hover:bg-aiblue hover:text-white px-6 py-6 text-lg">
                  View Sample
                </Button>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded-full border-2 border-white bg-gray-200"
                      style={{
                        backgroundImage: `url('/placeholder.svg')`,
                        backgroundSize: 'cover'
                      }}
                    ></div>
                  ))}
                </div>
                <p className="ml-4 text-sm text-gray-500">
                  Joined by <span className="font-semibold text-aiblue">2,000+</span> AI enthusiasts
                </p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="bg-white rounded-xl shadow-xl p-4 md:p-6 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="bg-gradient-to-r from-aiblue-light to-aipurple rounded-lg p-2 text-white text-sm font-medium mb-4 inline-block">
                Today's Edition
              </div>
              <h3 className="font-heading text-xl md:text-2xl font-bold mb-4">
                Google's DeepMind Reveals New AI Breakthrough in Protein Folding
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-4">
                DeepMind's latest algorithm now predicts protein structures with atomic-level accuracy, 
                opening doors for revolutionary drug discovery methods and personalized medicine approaches.
                This advancement could reduce drug development timelines by years...
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium">Read time:</span>
                <span className="ml-1">5 min</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-4 md:p-6 transform -rotate-2 hover:rotate-0 transition-transform duration-300 z-10">
              <div className="bg-gradient-to-r from-aiteal to-aiteal-light rounded-lg p-2 text-white text-sm font-medium mb-4 inline-block">
                AI Market Trends
              </div>
              <h3 className="font-heading text-lg md:text-xl font-bold mb-2">
                Top 5 AI Startups Securing Major Funding This Week
              </h3>
              <p className="text-gray-600 line-clamp-2">
                Exclusive analysis of venture capital movements in the AI landscape...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
