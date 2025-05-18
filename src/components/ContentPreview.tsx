
import { Calendar, FileText, MessageSquare, TrendingUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ContentPreview() {
  const isMobile = useIsMobile();
  
  return (
    <section id="preview" className="w-full py-12 md:py-16 lg:py-24 px-0 overflow-x-hidden">
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
        }

        #root {
          width: 100vw;
          max-width: 100vw;
          margin: 0 auto;
          padding: 0;
        }
      `}</style>
      
      <div className="w-full max-w-full">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12 lg:mb-16 px-4">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-aiblue">
            Tech Horizon: Your Daily AI Insights
          </h2>
          <p className="text-gray-600 text-base md:text-lg lg:text-xl">
            Stay informed with our expertly curated AI news and analysis
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg md:rounded-2xl shadow-lg overflow-hidden border border-gray-100 mx-4 sm:mx-6 md:mx-auto">
          {/* Newsletter Header */}
          <div className="bg-gradient-to-r from-aiblue to-aipurple p-4 md:p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-heading text-lg md:text-xl font-bold">Tech Horizon</h3>
                <div className="flex items-center text-white/80 text-xs md:text-sm mt-1">
                  <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1" /> 
                  <time dateTime="2025-04-29">April 29, 2025</time>
                </div>
              </div>
              <div className="bg-white/20 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm">
                Latest Edition
              </div>
            </div>
          </div>
          
          {/* Newsletter Content */}
          <div className="p-4 md:p-6 lg:p-8" itemScope itemType="https://schema.org/Article">
            <article className="border-b border-gray-100 pb-4 md:pb-6 mb-4 md:mb-6">
              <div className="flex items-center mb-3 md:mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                  <FileText className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <h4 className="ml-3 font-heading font-bold text-lg md:text-xl">Breaking AI News</h4>
              </div>
              
              <h5 className="font-heading font-bold text-base md:text-lg mb-2 md:mb-3" itemProp="headline">
                Google's DeepMind Achieves Breakthrough in Protein Structure Prediction
              </h5>
              <p className="text-gray-600 text-sm md:text-base" itemProp="description">
                Google DeepMind's latest algorithm can predict protein structures with unprecedented accuracy, potentially revolutionizing drug discovery and biomedical research.
              </p>
              <meta itemProp="datePublished" content="2025-04-29" />
            </article>
            
            <article className="border-b border-gray-100 pb-4 md:pb-6 mb-4 md:mb-6" itemScope itemType="https://schema.org/Article">
              <div className="flex items-center mb-3 md:mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <h4 className="ml-3 font-heading font-bold text-lg md:text-xl">Market Insights</h4>
              </div>
              
              <h5 className="font-heading font-bold text-base md:text-lg mb-2 md:mb-3" itemProp="headline">
                AI Chip Market Grows 35% in Q1 2025, NVIDIA Maintains Leadership
              </h5>
              <p className="text-gray-600 text-sm md:text-base" itemProp="description">
                The global AI chip market has expanded by 35% in Q1 2025, reaching $42.3 billion in revenue. NVIDIA continues to dominate with 63% market share.
              </p>
              <meta itemProp="datePublished" content="2025-04-29" />
            </article>
            
            <article itemScope itemType="https://schema.org/Article">
              <div className="flex items-center mb-3 md:mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <MessageSquare className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <h4 className="ml-3 font-heading font-bold text-lg md:text-xl">Expert Analysis</h4>
              </div>
              
              <h5 className="font-heading font-bold text-base md:text-lg mb-2 md:mb-3" itemProp="headline">
                Navigating AI Regulation in a Multi-Polar World
              </h5>
              <p className="text-gray-600 text-sm md:text-base" itemProp="description">
                Dr. Amara Okafor, AI Policy Researcher at Oxford, analyzes the diverging regulatory approaches between the EU, US, and China, offering insights on compliance strategies.
              </p>
              <meta itemProp="datePublished" content="2025-04-29" />
              <meta itemProp="author" content="Dr. Amara Okafor" />
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
