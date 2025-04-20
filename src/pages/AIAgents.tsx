import React from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowRight, Star, Clock, Users, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditableText from "@/components/admin/edit/EditableText";
import EditableImage from "@/components/admin/edit/EditableImage";

interface AIAgentsProps {
  isEditMode?: boolean;
}

export default function AIAgents({ isEditMode = false }: AIAgentsProps) {
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

  const agents = [
    {
      id: 1,
      name: "AI Research Assistant",
      description: "Accelerate your research with AI-powered literature review, data analysis, and insight generation.",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=300&auto=format&fit=crop",
      rating: 4.8,
      reviews: 124,
      users: 1250,
      category: "Research",
      featured: true,
      new: false
    },
    {
      id: 2,
      name: "Content Creator Pro",
      description: "Generate blog posts, social media content, and marketing copy with AI that matches your brand voice.",
      image: "https://images.unsplash.com/photo-1664575198308-3959904fa430?q=80&w=300&auto=format&fit=crop",
      rating: 4.7,
      reviews: 98,
      users: 980,
      category: "Content",
      featured: false,
      new: true
    },
    {
      id: 3,
      name: "Data Analyst AI",
      description: "Transform raw data into actionable insights with automated analysis, visualization, and reporting.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300&auto=format&fit=crop",
      rating: 4.9,
      reviews: 156,
      users: 1420,
      category: "Data",
      featured: true,
      new: false
    },
    {
      id: 4,
      name: "Code Assistant",
      description: "Write better code faster with AI that helps debug, optimize, and document your programming projects.",
      image: "https://images.unsplash.com/photo-1623479322729-28b25c16b011?q=80&w=300&auto=format&fit=crop",
      rating: 4.6,
      reviews: 87,
      users: 760,
      category: "Development",
      featured: false,
      new: false
    },
    {
      id: 5,
      name: "Meeting Summarizer",
      description: "Never miss important details with AI that transcribes, summarizes, and extracts action items from meetings.",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=300&auto=format&fit=crop",
      rating: 4.5,
      reviews: 64,
      users: 520,
      category: "Productivity",
      featured: false,
      new: true
    },
    {
      id: 6,
      name: "Legal Document Analyzer",
      description: "Review contracts and legal documents with AI that identifies risks, obligations, and key terms.",
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=300&auto=format&fit=crop",
      rating: 4.7,
      reviews: 42,
      users: 310,
      category: "Legal",
      featured: false,
      new: false
    }
  ];

  const categories = [
    "All Categories",
    "Research",
    "Content",
    "Data",
    "Development",
    "Productivity",
    "Legal",
    "Finance",
    "Healthcare",
    "Education"
  ];

  return (
    <>
      <Helmet>
        <title>AI Agents Marketplace - NeuralNextGen</title>
        <meta name="description" content="Discover and deploy powerful AI agents to automate tasks, enhance productivity, and solve complex problems." />
      </Helmet>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-aiblue/5 via-aipurple/5 to-aiteal/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-aiblue leading-tight mb-6">
                  {renderText("AI Agents Marketplace", "aiagents.hero.title")}
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-lg">
                  {renderText("Discover and deploy powerful AI agents to automate tasks, enhance productivity, and solve complex problems.", "aiagents.hero.description")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-gradient-to-r from-aiblue to-aipurple hover:from-aiblue-dark hover:to-aipurple-dark text-white">
                    {renderText("Browse Agents", "aiagents.hero.primaryCta")}
                  </Button>
                  <Button variant="outline" className="border-aiblue text-aiblue hover:bg-aiblue hover:text-white">
                    {renderText("How It Works", "aiagents.hero.secondaryCta")}
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2">
                {renderImage(
                  "https://images.unsplash.com/photo-1677442135136-760c813dce93?q=80&w=600&auto=format&fit=crop",
                  "AI Agents illustration",
                  "aiagents.hero.image",
                  "w-full rounded-xl shadow-lg"
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input 
                    placeholder="Search for AI agents..." 
                    className="pl-10"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category, index) => (
                        <SelectItem key={index} value={category.toLowerCase().replace(' ', '-')}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Agents Listing Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-8">
                  <TabsTrigger value="all">All Agents</TabsTrigger>
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                  <TabsTrigger value="new">New</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agents.map((agent) => (
                      <div key={agent.id} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                        <div className="relative h-48 overflow-hidden">
                          {renderImage(
                            agent.image,
                            agent.name,
                            `aiagents.agent.${agent.id}.image`,
                            "w-full h-full object-cover"
                          )}
                          {agent.featured && (
                            <Badge className="absolute top-3 left-3 bg-amber-100 text-amber-800 hover:bg-amber-200">
                              Featured
                            </Badge>
                          )}
                          {agent.new && (
                            <Badge className="absolute top-3 left-3 bg-green-100 text-green-800 hover:bg-green-200">
                              New
                            </Badge>
                          )}
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="text-xs">
                              {renderText(agent.category, `aiagents.agent.${agent.id}.category`)}
                            </Badge>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-amber-500 mr-1" />
                              <span className="text-sm font-medium">{agent.rating}</span>
                              <span className="text-xs text-gray-500 ml-1">({agent.reviews})</span>
                            </div>
                          </div>
                          <h3 className="font-heading font-bold text-xl mb-2">
                            {renderText(agent.name, `aiagents.agent.${agent.id}.name`)}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4">
                            {renderText(agent.description, `aiagents.agent.${agent.id}.description`)}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <Users className="h-4 w-4 mr-1" />
                              <span>{agent.users}+ users</span>
                            </div>
                            <Button variant="ghost" size="sm" className="text-aiblue hover:text-aiblue-dark hover:bg-aiblue/5">
                              View Details
                              <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="featured" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agents.filter(agent => agent.featured).map((agent) => (
                      <div key={agent.id} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                        <div className="relative h-48 overflow-hidden">
                          <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
                          <Badge className="absolute top-3 left-3 bg-amber-100 text-amber-800 hover:bg-amber-200">
                            Featured
                          </Badge>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="text-xs">{agent.category}</Badge>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-amber-500 mr-1" />
                              <span className="text-sm font-medium">{agent.rating}</span>
                              <span className="text-xs text-gray-500 ml-1">({agent.reviews})</span>
                            </div>
                          </div>
                          <h3 className="font-heading font-bold text-xl mb-2">{agent.name}</h3>
                          <p className="text-gray-600 text-sm mb-4">{agent.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <Users className="h-4 w-4 mr-1" />
                              <span>{agent.users}+ users</span>
                            </div>
                            <Button variant="ghost" size="sm" className="text-aiblue hover:text-aiblue-dark hover:bg-aiblue/5">
                              View Details
                              <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="new" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agents.filter(agent => agent.new).map((agent) => (
                      <div key={agent.id} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                        <div className="relative h-48 overflow-hidden">
                          <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
                          <Badge className="absolute top-3 left-3 bg-green-100 text-green-800 hover:bg-green-200">
                            New
                          </Badge>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="text-xs">{agent.category}</Badge>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-amber-500 mr-1" />
                              <span className="text-sm font-medium">{agent.rating}</span>
                              <span className="text-xs text-gray-500 ml-1">({agent.reviews})</span>
                            </div>
                          </div>
                          <h3 className="font-heading font-bold text-xl mb-2">{agent.name}</h3>
                          <p className="text-gray-600 text-sm mb-4">{agent.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <Users className="h-4 w-4 mr-1" />
                              <span>{agent.users}+ users</span>
                            </div>
                            <Button variant="ghost" size="sm" className="text-aiblue hover:text-aiblue-dark hover:bg-aiblue/5">
                              View Details
                              <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="popular" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agents.sort((a, b) => b.users - a.users).slice(0, 3).map((agent) => (
                      <div key={agent.id} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                        <div className="relative h-48 overflow-hidden">
                          <img src={agent.image} alt={agent.name} className="w-full h-full object-cover" />
                          <Badge className="absolute top-3 left-3 bg-blue-100 text-blue-800 hover:bg-blue-200">
                            Popular
                          </Badge>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="text-xs">{agent.category}</Badge>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-amber-500 mr-1" />
                              <span className="text-sm font-medium">{agent.rating}</span>
                              <span className="text-xs text-gray-500 ml-1">({agent.reviews})</span>
                            </div>
                          </div>
                          <h3 className="font-heading font-bold text-xl mb-2">{agent.name}</h3>
                          <p className="text-gray-600 text-sm mb-4">{agent.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <Users className="h-4 w-4 mr-1" />
                              <span>{agent.users}+ users</span>
                            </div>
                            <Button variant="ghost" size="sm" className="text-aiblue hover:text-aiblue-dark hover:bg-aiblue/5">
                              View Details
                              <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="text-center">
              <Button variant="outline" className="border-aiblue text-aiblue hover:bg-aiblue hover:text-white">
                Load More Agents
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-aiblue mb-4">
                {renderText("How AI Agents Work", "aiagents.how.title")}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {renderText("Our AI agents are designed to seamlessly integrate into your workflow and deliver immediate value.", "aiagents.how.description")}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-aiblue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-aiblue" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">
                  {renderText("1. Choose Your Agent", "aiagents.how.step1.title")}
                </h3>
                <p className="text-gray-600">
                  {renderText("Browse our marketplace and select the AI agent that best fits your specific needs and use case.", "aiagents.how.step1.description")}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-aipurple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-aipurple" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">
                  {renderText("2. Quick Setup", "aiagents.how.step2.title")}
                </h3>
                <p className="text-gray-600">
                  {renderText("Connect your data sources and customize settings to align the agent with your specific requirements.", "aiagents.how.step2.description")}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-aiteal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-aiteal" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">
                  {renderText("3. Deploy & Scale", "aiagents.how.step3.title")}
                </h3>
                <p className="text-gray-600">
                  {renderText("Deploy your agent instantly and scale usage as needed. Pay only for what you use with no long-term commitments.", "aiagents.how.step3.description")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-aiblue to-aipurple text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              {renderText("Ready to Transform Your Workflow?", "aiagents.cta.title")}
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              {renderText("Join thousands of professionals using our AI agents to automate tasks and boost productivity.", "aiagents.cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-aiblue hover:bg-gray-100">
                {renderText("Get Started Free", "aiagents.cta.primaryButton")}
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                {renderText("Schedule a Demo", "aiagents.cta.secondaryButton")}
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {isEditMode && (
        <div className="fixed bottom-20 right-6 bg-black/80 text-white px-4 py-2 rounded text-sm">
          Edit mode active for AI Agents page
        </div>
      )}
    </>
  );
}
