import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { 
  Newspaper, Bot, GraduationCap, ArrowRight, Brain, Zap, 
  Users, Code, BarChart, LineChart, CheckCircle, Award,
  Briefcase, Building, Lightbulb, Sparkles, Share2, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NewHomepageSubscribeSection from "@/components/NewHomepageSubscribeSection";

export default function ParentLanding() {
  return (
    <>
      <Helmet>
        <title>NeuralNextGen - Your AI Technology Partner</title>
        <meta name="description" content="Bridging AI gaps with comprehensive solutions: AI Agents Marketplace, Daily AI Newsletter, and AI Courses. Making artificial intelligence accessible and practical." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "NeuralNextGen",
              "url": "https://neuralnextgen.com/",
              "description": "Your gateway to AI knowledge, tools, and skills development.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://neuralnextgen.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30">
        <Header />
        
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 relative overflow-hidden">
          <div className="absolute top-20 right-0 w-96 h-96 bg-blue-300/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 left-0 w-96 h-96 bg-purple-300/10 rounded-full filter blur-3xl"></div>
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-aiblue mb-6 leading-tight">
                  Bridging the AI Gap for Everyone
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  NeuralNextGen makes artificial intelligence accessible, practical, and easy to understand. 
                  Your trusted partner in navigating the AI revolution.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-gradient-to-r from-aiblue to-aipurple text-white">
                    <Link to="/ai-digest">
                      Explore AI Daily Digest
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-aiblue text-aiblue">
                    <Link to="/ai-agents">
                      Browse AI Agents
                    </Link>
                  </Button>
                </div>
                
                <div className="mt-8 flex items-center">
                  <div className="flex -space-x-2 mr-4">
                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop&crop=faces" alt="User avatar" className="w-8 h-8 rounded-full border-2 border-white"/>
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=faces" alt="User avatar" className="w-8 h-8 rounded-full border-2 border-white"/>
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=faces" alt="User avatar" className="w-8 h-8 rounded-full border-2 border-white"/>
                  </div>
                  <p className="text-sm text-gray-600">
                    Trusted by <span className="font-semibold text-aiblue">25,000+</span> AI professionals
                  </p>
                </div>
              </div>
              
              <div className="relative animate-fade-in" style={{animationDelay: '0.3s'}}>
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80" 
                  alt="AI Technology Visualization" 
                  className="w-full rounded-xl shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg w-40 md:w-64">
                  <div className="flex items-center mb-2">
                    <Brain className="h-5 w-5 text-aiblue mr-2" />
                    <h4 className="font-medium text-sm">AI Market Growth</h4>
                  </div>
                  <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-aiblue to-aipurple" style={{width: '83%'}}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">83% of companies prioritize AI integration</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Subscribe Section */}
        <NewHomepageSubscribeSection />

        {/* Products Section */}
        <section className="py-16 bg-gradient-to-br from-aiblue/5 to-aipurple/5">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our AI Solutions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our comprehensive AI ecosystem designed to keep you informed,
                equipped, and skilled in the rapidly evolving world of artificial intelligence.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {/* AI Daily Digest Card */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-br from-blue-500/90 to-purple-600/90 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Newspaper className="w-20 h-20 text-white/80" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                    <h3 className="text-white text-xl font-bold">AI Daily Digest</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-6">
                    Stay updated with the latest AI breakthroughs, news, and insights delivered to your inbox daily.
                    Curated by experts for both technical and non-technical readers.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-sm">39.3% open rate</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-aiblue mr-2" />
                      <span className="text-sm">2,000+ subscribers</span>
                    </div>
                  </div>
                  <Button asChild className="w-full bg-gradient-to-r from-aiblue to-aipurple">
                    <Link to="/ai-digest" className="flex items-center justify-center">
                      Read Digest <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* AI Agents Card */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-br from-purple-500/90 to-pink-600/90 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Bot className="w-20 h-20 text-white/80" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                    <h3 className="text-white text-xl font-bold">AI Agents Marketplace</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-6">
                    Discover and compare the best AI agents for your specific needs. From chatbots to productivity tools,
                    find the perfect AI solution.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-sm">500+ tools listed</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-aiblue mr-2" />
                      <span className="text-sm">30+ categories</span>
                    </div>
                  </div>
                  <Button asChild className="w-full bg-gradient-to-r from-aiblue to-aipurple">
                    <Link to="/ai-agents" className="flex items-center justify-center">
                      Explore Agents <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* AI Courses Card */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="h-48 bg-gradient-to-br from-green-500/90 to-blue-600/90 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GraduationCap className="w-20 h-20 text-white/80" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                    <h3 className="text-white text-xl font-bold">AI Courses</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-6">
                    Learn AI concepts through practical, hands-on courses designed for all skill levels.
                    Advance your career with in-demand AI skills.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-sm">85% completion rate</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-aiblue mr-2" />
                      <span className="text-sm">20+ courses</span>
                    </div>
                  </div>
                  <Button asChild className="w-full bg-gradient-to-r from-aiblue to-aipurple">
                    <Link to="/ai-courses" className="flex items-center justify-center">
                      Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why AI Matters Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why AI Matters</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Artificial intelligence is transforming industries, creating new opportunities,
                and reshaping how we work and live. Stay ahead of the curve.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 mb-16">
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold mb-6 text-aiblue">The Rising Impact of AI</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-12 w-12 bg-aiblue/10 rounded-lg flex items-center justify-center">
                      <BarChart className="h-6 w-6 text-aiblue" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Explosive Market Growth</h4>
                      <p className="text-gray-600">The global AI market is valued at over $390 billion and projected to increase by over 5x in the next 5 years.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-12 w-12 bg-aipurple/10 rounded-lg flex items-center justify-center">
                      <LineChart className="h-6 w-6 text-aipurple" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Accelerating Adoption</h4>
                      <p className="text-gray-600">Global AI adoption is expanding at a CAGR of 35.9% between 2025 and 2030.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-12 w-12 bg-aiteal/10 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-aiteal" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Job Creation</h4>
                      <p className="text-gray-600">By 2025, approximately 97 million people will be needed to fill work demands in the surging AI industry.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 bg-gradient-to-br from-aiblue/5 to-aipurple/5 p-6 rounded-xl">
                <h3 className="text-2xl font-bold mb-6 text-aiblue">Business Impact</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Companies prioritizing AI</span>
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">83%</span>
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-aiblue h-full" style={{width: "83%"}}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Small businesses using AI</span>
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">89%</span>
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-aipurple h-full" style={{width: "89%"}}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">YoY AI spending increase</span>
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">14%</span>
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-aiteal h-full" style={{width: "14%"}}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Companies hiring AI roles</span>
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">43%</span>
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-purple-500 h-full" style={{width: "43%"}}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Profits attributed to AI</span>
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">53%</span>
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full" style={{width: "53%"}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-10">
              <h3 className="text-2xl font-bold mb-6 text-center">AI Impact Timeline</h3>
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-aiblue via-aipurple to-aiteal"></div>
                
                <div className="flex flex-col gap-12">
                  <div className="flex odd:flex-row-reverse even:flex-row gap-8 items-center">
                    <div className="w-1/2 text-right sm:pr-8">
                      <h4 className="font-bold text-lg">Early AI Development</h4>
                      <p className="text-gray-600">Initial AI research and foundational algorithms establish the field.</p>
                    </div>
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white border-4 border-aiblue z-10"></div>
                    <div className="w-1/2 sm:pl-8">
                      <span className="font-semibold text-aiblue">1950-2010</span>
                    </div>
                  </div>
                  
                  <div className="flex odd:flex-row even:flex-row-reverse gap-8 items-center">
                    <div className="w-1/2 text-right sm:pr-8">
                      <span className="font-semibold text-aipurple">2011-2019</span>
                    </div>
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white border-4 border-aipurple z-10"></div>
                    <div className="w-1/2 sm:pl-8">
                      <h4 className="font-bold text-lg">Deep Learning Revolution</h4>
                      <p className="text-gray-600">Breakthroughs in neural networks drive advances in vision, speech, and language.</p>
                    </div>
                  </div>
                  
                  <div className="flex odd:flex-row-reverse even:flex-row gap-8 items-center">
                    <div className="w-1/2 text-right sm:pr-8">
                      <h4 className="font-bold text-lg">Foundation Model Era</h4>
                      <p className="text-gray-600">Large language models and multimodal AI systems transform capabilities.</p>
                    </div>
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white border-4 border-aiteal z-10"></div>
                    <div className="w-1/2 sm:pl-8">
                      <span className="font-semibold text-aiteal">2020-2023</span>
                    </div>
                  </div>
                  
                  <div className="flex odd:flex-row even:flex-row-reverse gap-8 items-center">
                    <div className="w-1/2 text-right sm:pr-8">
                      <span className="font-semibold text-purple-500">2024-Present</span>
                    </div>
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white border-4 border-purple-500 z-10"></div>
                    <div className="w-1/2 sm:pl-8">
                      <h4 className="font-bold text-lg">Mainstream Adoption</h4>
                      <p className="text-gray-600">AI becomes essential across industries with widespread integration.</p>
                    </div>
                  </div>
                  
                  <div className="flex odd:flex-row-reverse even:flex-row gap-8 items-center">
                    <div className="w-1/2 text-right sm:pr-8">
                      <h4 className="font-bold text-lg">Future Innovation</h4>
                      <p className="text-gray-600">The next generation of AI capabilities and applications.</p>
                    </div>
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white border-4 border-blue-500 z-10"></div>
                    <div className="w-1/2 sm:pl-8">
                      <span className="font-semibold text-blue-500">2025+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Use Cases Section */}
        <section className="py-16 bg-gradient-to-br from-white via-blue-50/20 to-purple-50/20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">AI in Action</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover how AI is transforming industries and creating new possibilities
                across various sectors and applications.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <Lightbulb className="h-6 w-6 text-aiblue" />
                  </div>
                  <CardTitle>Content Creation</CardTitle>
                  <CardDescription>Generate text, images, and videos with AI</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    AI tools can now create professional-quality content in seconds, from writing 
                    articles to generating photorealistic images and editing videos.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/ai-agents" className="text-aiblue hover:underline text-sm flex items-center">
                    Discover content creation tools
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardFooter>
              </Card>
              
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                    <Briefcase className="h-6 w-6 text-aipurple" />
                  </div>
                  <CardTitle>Business Automation</CardTitle>
                  <CardDescription>Streamline operations and reduce manual tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Businesses are using AI to automate repetitive tasks, process documents, 
                    analyze data, and enhance customer service capabilities.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/ai-agents" className="text-aiblue hover:underline text-sm flex items-center">
                    Find automation solutions
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardFooter>
              </Card>
              
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Personal Productivity</CardTitle>
                  <CardDescription>Work smarter with AI assistance</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    AI tools are helping individuals organize information, prioritize tasks,
                    draft emails, summarize documents, and manage time more effectively.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/ai-agents" className="text-aiblue hover:underline text-sm flex items-center">
                    Enhance your workflow
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardFooter>
              </Card>
              
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                    <LineChart className="h-6 w-6 text-orange-500" />
                  </div>
                  <CardTitle>Data Analysis</CardTitle>
                  <CardDescription>Turn data into actionable insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    AI systems can process vast amounts of data, identify patterns,
                    generate visualizations, and provide recommendations in seconds.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/ai-agents" className="text-aiblue hover:underline text-sm flex items-center">
                    Explore data tools
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardFooter>
              </Card>
              
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                    <Share2 className="h-6 w-6 text-red-500" />
                  </div>
                  <CardTitle>Customer Engagement</CardTitle>
                  <CardDescription>Personalize and enhance customer interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    AI is powering chatbots, recommendation engines, and customer service
                    tools that provide personalized, 24/7 support across channels.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/ai-agents" className="text-aiblue hover:underline text-sm flex items-center">
                    View engagement tools
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardFooter>
              </Card>
              
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center mb-4">
                    <GraduationCap className="h-6 w-6 text-aiteal" />
                  </div>
                  <CardTitle>Education & Learning</CardTitle>
                  <CardDescription>Transform how we learn and develop skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    AI tools are creating personalized learning experiences, generating
                    practice materials, and helping students master complex concepts.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to="/ai-courses" className="text-aiblue hover:underline text-sm flex items-center">
                    Discover learning tools
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of professionals and organizations who rely on our AI ecosystem
                to stay informed, equipped, and skilled.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100" 
                      alt="Testimonial author" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Michael Chen</h4>
                    <p className="text-sm text-gray-600">CTO, TechFuture Inc.</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "The AI Daily Digest has become my morning ritual. The insights we've gained
                  have directly influenced our product roadmap and saved us countless hours of research."
                </p>
                <div className="flex text-yellow-400 mt-4">
                  <Star className="w-5 h-5 fill-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100" 
                      alt="Testimonial author" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <p className="text-sm text-gray-600">Marketing Director, GrowFast</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "The AI agents we discovered through NeuralNextGen have transformed our content
                  production. We're creating twice the content in half the time with better results."
                </p>
                <div className="flex text-yellow-400 mt-4">
                  <Star className="w-5 h-5 fill-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100" 
                      alt="Testimonial author" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Priya Patel</h4>
                    <p className="text-sm text-gray-600">Founder, EdTech AI</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "The AI Courses are fantastic for our team's learning and upskilling. The format is intuitive,
                  and the material stays updated with fast-moving AI trends."
                </p>
                <div className="flex text-yellow-400 mt-4">
                  <Star className="w-5 h-5 fill-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400" />
                  <Star className="w-5 h-5 fill-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
