
import { Calendar, FileText, MessageSquare, TrendingUp } from "lucide-react";

export default function ContentPreview() {
  return (
    <section id="preview" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-aiblue">
            Daily AI Insights Delivered to Your Inbox
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
                <h3 className="font-heading text-xl font-bold">AI Daily Digest</h3>
                <div className="flex items-center text-white/80 text-sm mt-1">
                  <Calendar className="w-4 h-4 mr-1" /> 
                  <time dateTime="2025-04-17">April 17, 2025</time>
                </div>
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
                Latest Edition
              </div>
            </div>
          </div>
          
          {/* Newsletter Content */}
          <div className="p-6 md:p-8">
            <article className="border-b border-gray-100 pb-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="ml-3 font-heading font-bold text-xl">Breaking AI News</h4>
              </div>
              
              <h5 className="font-heading font-bold text-lg mb-3">
                OpenAI Unveils Revolutionary Text-to-Video Model
              </h5>
              <p className="text-gray-600">
                OpenAI's new model generates high-quality videos from text prompts, demonstrating remarkable temporal consistency and natural motion. The technology represents a significant leap forward in generative AI capabilities.
              </p>
            </article>
            
            <article className="border-b border-gray-100 pb-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="ml-3 font-heading font-bold text-xl">Market Insights</h4>
              </div>
              
              <h5 className="font-heading font-bold text-lg mb-3">
                AI Hardware Market Expected to Reach ₹10,000 Crore by 2026
              </h5>
              <p className="text-gray-600">
                A new report projects the AI hardware market to grow at 23% CAGR over the next two years. Key drivers include increased demand for specialized AI training chips and edge computing devices.
              </p>
            </article>
            
            <article>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h4 className="ml-3 font-heading font-bold text-xl">Expert Analysis</h4>
              </div>
              
              <h5 className="font-heading font-bold text-lg mb-3">
                The Future of Responsible AI Development
              </h5>
              <p className="text-gray-600">
                Dr. Emily Chen, AI Ethics Researcher at MIT, shares her perspective on balancing innovation and responsible development in the rapidly evolving generative AI space.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
