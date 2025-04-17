
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Newspaper, Bot, GraduationCap, ArrowRight, Brain, Zap, Users, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function ParentLanding() {
  return (
    <>
      <Helmet>
        <title>NeuralNextGen - Your AI Technology Partner</title>
        <meta name="description" content="Bridging AI gaps with comprehensive solutions: AI Agents Marketplace, Daily AI Newsletter, and AI Courses. Making artificial intelligence accessible and practical." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30">
        <Header />
        
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-aiblue mb-6">
                Bridging the AI Gap
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                NeuralNextGen makes artificial intelligence accessible, practical, and easy to understand. 
                Your trusted partner in navigating the AI revolution.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-purple-100">
                <Brain className="w-12 h-12 text-aiblue mb-4" />
                <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                <p className="text-gray-600">
                  To democratize AI technology by making it understandable and accessible to everyone, 
                  from beginners to experts.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg border border-purple-100">
                <Users className="w-12 h-12 text-aiblue mb-4" />
                <h3 className="text-xl font-bold mb-2">Our Vision</h3>
                <p className="text-gray-600">
                  A world where AI is not just a tool for tech experts, but a helpful companion for everyone 
                  in their daily lives and work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 bg-gradient-to-br from-aiblue/5 to-aipurple/5">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Our Products</h2>
            
            <div className="grid gap-8 md:grid-cols-3">
              {/* AI Agents Card */}
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <Bot className="w-12 h-12 text-aiblue mb-4" />
                <h3 className="text-xl font-bold mb-2">AI Agents Marketplace</h3>
                <p className="text-gray-600 mb-4">
                  Discover and compare the best AI agents for your specific needs. From chatbots to productivity tools.
                </p>
                <Button asChild className="w-full bg-gradient-to-r from-aiblue to-aipurple">
                  <Link to="/ai-agents" className="flex items-center justify-center">
                    Explore Agents <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* AI Daily Digest Card */}
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <Newspaper className="w-12 h-12 text-aiblue mb-4" />
                <h3 className="text-xl font-bold mb-2">AI Daily Digest</h3>
                <p className="text-gray-600 mb-4">
                  Stay updated with the latest AI breakthroughs, news, and insights delivered to your inbox daily.
                </p>
                <Button asChild className="w-full bg-gradient-to-r from-aiblue to-aipurple">
                  <Link to="/ai-digest" className="flex items-center justify-center">
                    Read Digest <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* AI Courses Card */}
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <GraduationCap className="w-12 h-12 text-aiblue mb-4" />
                <h3 className="text-xl font-bold mb-2">AI Courses</h3>
                <p className="text-gray-600 mb-4">
                  Learn AI concepts through practical, hands-on courses designed for all skill levels.
                </p>
                <Button asChild className="w-full bg-gradient-to-r from-aiblue to-aipurple">
                  <Link to="/ai-courses" className="flex items-center justify-center">
                    Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* USPs Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Choose Us</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <Zap className="w-12 h-12 text-aiblue mx-auto mb-4" />
                <h3 className="font-bold mb-2">Up-to-Date Content</h3>
                <p className="text-gray-600">Daily updates and the latest in AI technology</p>
              </div>
              
              <div className="text-center">
                <Users className="w-12 h-12 text-aiblue mx-auto mb-4" />
                <h3 className="font-bold mb-2">Community-Driven</h3>
                <p className="text-gray-600">Learn and grow with fellow AI enthusiasts</p>
              </div>
              
              <div className="text-center">
                <Brain className="w-12 h-12 text-aiblue mx-auto mb-4" />
                <h3 className="font-bold mb-2">Expert Curation</h3>
                <p className="text-gray-600">Carefully selected resources and tools</p>
              </div>
              
              <div className="text-center">
                <Code className="w-12 h-12 text-aiblue mx-auto mb-4" />
                <h3 className="font-bold mb-2">Practical Focus</h3>
                <p className="text-gray-600">Real-world applications and solutions</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
