
import { Calendar, FileText, MessageSquare, TrendingUp } from "lucide-react";

export default function ContentPreview() {
  return (
    <section id="preview" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-aiblue">
            Tech Horizon: Your Daily AI Insights
          </h2>
          <p className="text-gray-600 text-lg md:text-xl">
            Stay informed with our expertly curated AI news and analysis
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {/* Newsletter Header */}
          <div className="bg-gradient-to-r from-aiblue to-aipurple p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-heading text-xl font-bold">Tech Horizon</h3>
                <div className="flex items-center text-white/80 text-sm mt-1">
                  <Calendar className="w-4 h-4 mr-1" /> 
                  <time dateTime="2025-04-29">April 29, 2025</time>
                </div>
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
                Latest Edition
              </div>
            </div>
          </div>
          
          {/* Newsletter Content */}
          <div className="p-6 md:p-8" itemScope itemType="https://schema.org/Article">
            <article className="border-b border-gray-100 pb-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="ml-3 font-heading font-bold text-xl">Breaking AI News</h4>
              </div>
              
              <h5 className="font-heading font-bold text-lg mb-3" itemProp="headline">
                Google's DeepMind Achieves Breakthrough in Protein Structure Prediction
              </h5>
              <p className="text-gray-600" itemProp="description">
                Google DeepMind's latest algorithm can predict protein structures with unprecedented accuracy, potentially revolutionizing drug discovery and biomedical research. Scientists believe this could accelerate development of new treatments for currently incurable diseases.
              </p>
              <meta itemProp="datePublished" content="2025-04-29" />
            </article>
            
            <article className="border-b border-gray-100 pb-6 mb-6" itemScope itemType="https://schema.org/Article">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="ml-3 font-heading font-bold text-xl">Market Insights</h4>
              </div>
              
              <h5 className="font-heading font-bold text-lg mb-3" itemProp="headline">
                AI Chip Market Grows 35% in Q1 2025, NVIDIA Maintains Leadership
              </h5>
              <p className="text-gray-600" itemProp="description">
                The global AI chip market has expanded by 35% in Q1 2025, reaching $42.3 billion in revenue. NVIDIA continues to dominate with 63% market share, while new entrants from China and Europe are beginning to capture specialized segments of the enterprise market.
              </p>
              <meta itemProp="datePublished" content="2025-04-29" />
            </article>
            
            <article itemScope itemType="https://schema.org/Article">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h4 className="ml-3 font-heading font-bold text-xl">Expert Analysis</h4>
              </div>
              
              <h5 className="font-heading font-bold text-lg mb-3" itemProp="headline">
                Navigating AI Regulation in a Multi-Polar World
              </h5>
              <p className="text-gray-600" itemProp="description">
                Dr. Amara Okafor, AI Policy Researcher at Oxford, analyzes the diverging regulatory approaches between the EU, US, and China, offering insights on how companies can develop compliance strategies that work across jurisdictions while maintaining innovation.
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
