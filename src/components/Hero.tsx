
import { Button } from "@/components/ui/button";
import { ArrowDown, Brain, Zap, LineChart, BarChart3 } from "lucide-react";
import EditableText from "@/components/admin/edit/EditableText";
import EditableImage from "@/components/admin/edit/EditableImage";

interface HeroProps {
  isEditMode?: boolean;
}

export default function Hero({ isEditMode = false }: HeroProps) {
  const scrollToSubscribe = () => {
    document.getElementById('subscribe')?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderText = (text: string, path: string, className?: string) => {
    return isEditMode ? (
      <EditableText path={path} className={className}>{text}</EditableText>
    ) : (
      <span className={className}>{text}</span>
    );
  };

  const renderImage = (src: string, alt: string, path: string, className?: string) => {
    return isEditMode ? (
      <EditableImage src={src} alt={alt} path={path} className={className} />
    ) : (
      <img src={src} alt={alt} className={className} />
    );
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-aiblue/5 via-aipurple/5 to-aiteal/5 py-16 md:py-24">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-10 w-72 h-72 bg-aipurple/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-aiblue/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-aiblue leading-tight mb-6">
                {renderText("Stay Ahead with AI Insights Delivered Daily", "hero.heading")}
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                {renderText("Curated AI news, breakthroughs, and analysis in a 5-minute daily read. Perfect for busy professionals who need to stay informed.", "hero.subheading")}
              </p>
              
              {/* AI Infographic */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg mb-8 border border-aiblue/10">
                <h2 className="font-heading font-medium text-lg text-aiblue mb-3">
                  {renderText("What You'll Get", "hero.infographic.title")}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center bg-gradient-to-r from-aiblue/5 to-aipurple/5 p-3 rounded-lg">
                    <Brain className="h-8 w-8 text-aiblue mr-3 flex-shrink-0" />
                    <span className="text-sm font-medium">
                      {renderText("AI Breakthroughs", "hero.infographic.item1")}
                    </span>
                  </div>
                  <div className="flex items-center bg-gradient-to-r from-aipurple/5 to-aiteal/5 p-3 rounded-lg">
                    <Zap className="h-8 w-8 text-aipurple mr-3 flex-shrink-0" />
                    <span className="text-sm font-medium">
                      {renderText("Industry Insights", "hero.infographic.item2")}
                    </span>
                  </div>
                  <div className="flex items-center bg-gradient-to-r from-aiteal/5 to-aiblue/5 p-3 rounded-lg">
                    <LineChart className="h-8 w-8 text-aiteal mr-3 flex-shrink-0" />
                    <span className="text-sm font-medium">
                      {renderText("Market Trends", "hero.infographic.item3")}
                    </span>
                  </div>
                  <div className="flex items-center bg-gradient-to-r from-aiblue/5 to-aipurple/5 p-3 rounded-lg">
                    <BarChart3 className="h-8 w-8 text-aiblue mr-3 flex-shrink-0" />
                    <span className="text-sm font-medium">
                      {renderText("Growth Stats", "hero.infographic.item4")}
                    </span>
                  </div>
                </div>
              </div>
              
              <Button 
                id="hero-subscribe"
                className="rounded-full bg-gradient-to-r from-aiblue to-aipurple hover:from-aiblue-dark hover:to-aipurple-dark text-white font-medium px-8 py-6 text-lg"
                onClick={scrollToSubscribe}
                aria-label="Subscribe to AI Daily Digest"
              >
                {renderText("Subscribe Now", "hero.cta.buttonText")}
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
              <div className="mt-6 flex items-center">
                <div className="flex -space-x-2">
                  {renderImage(
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=faces",
                    "AI enthusiast avatar",
                    "hero.avatar1",
                    "w-8 h-8 rounded-full border-2 border-white object-cover"
                  )}
                  {renderImage(
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=faces",
                    "Tech professional avatar",
                    "hero.avatar2",
                    "w-8 h-8 rounded-full border-2 border-white object-cover"
                  )}
                  {renderImage(
                    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop&crop=faces",
                    "Data scientist avatar",
                    "hero.avatar3",
                    "w-8 h-8 rounded-full border-2 border-white object-cover"
                  )}
                  {renderImage(
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=faces",
                    "AI researcher avatar",
                    "hero.avatar4",
                    "w-8 h-8 rounded-full border-2 border-white object-cover"
                  )}
                </div>
                <p className="ml-4 text-sm text-gray-500">
                  Joined by <span className="font-semibold text-aiblue">
                    {renderText("2,000+", "hero.subscriberCount")}
                  </span> AI enthusiasts
                </p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="bg-white rounded-xl shadow-xl p-4 md:p-6 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="bg-gradient-to-r from-aiblue-light to-aipurple rounded-lg p-2 text-white text-sm font-medium mb-4 inline-block">
                {renderText("Today's Edition", "hero.card1.badge")}
              </div>
              <h3 className="font-heading text-xl md:text-2xl font-bold mb-4">
                {renderText("Google's DeepMind Reveals New AI Breakthrough in Protein Folding", "hero.card1.title")}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-4">
                {renderText("DeepMind's latest algorithm now predicts protein structures with atomic-level accuracy, opening doors for revolutionary drug discovery methods and personalized medicine approaches. This advancement could reduce drug development timelines by years...", "hero.card1.content")}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium">Read time:</span>
                <span className="ml-1">{renderText("5 min", "hero.card1.readTime")}</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-4 md:p-6 transform -rotate-2 hover:rotate-0 transition-transform duration-300 z-10">
              <div className="bg-gradient-to-r from-aiteal to-aiteal-light rounded-lg p-2 text-white text-sm font-medium mb-4 inline-block">
                {renderText("AI Market Trends", "hero.card2.badge")}
              </div>
              <h3 className="font-heading text-lg md:text-xl font-bold mb-2">
                {renderText("Top 5 AI Startups Securing Major Funding This Week", "hero.card2.title")}
              </h3>
              <p className="text-gray-600 line-clamp-2">
                {renderText("Exclusive analysis of venture capital movements in the AI landscape...", "hero.card2.content")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
