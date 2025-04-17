
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  ExternalLink, 
  Share2, 
  ThumbsUp, 
  ArrowLeft, 
  CheckCircle, 
  Info, 
  Calendar,
  Zap,
  Layers,
  UserCheck
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromotionBanner from "@/components/PromotionBanner";

// Database of agents
const agentDatabase = {
  // AI Chatbots
  "gpt-4o": {
    name: "GPT-4o",
    category: "AI Chatbots",
    rating: 4.9,
    reviews: 1245,
    description: "Advanced language model with multimodal capabilities",
    longDescription: "GPT-4o is OpenAI's most advanced system, producing safer and more useful responses. It can handle complex tasks across text, images, audio, and creative projects. GPT-4o represents a significant advancement in multimodal AI technology, offering high performance at reduced latency.",
    features: [
      "Multimodal Input/Output", 
      "Advanced Reasoning", 
      "Code Generation", 
      "Creative Writing",
      "Contextual Understanding",
      "Real-time Processing"
    ],
    pricing: {
      model: "Subscription + Usage",
      startingPrice: "$20/month",
      details: "Basic access via ChatGPT Plus subscription; additional costs for API usage based on tokens"
    },
    company: {
      name: "OpenAI",
      website: "https://openai.com",
      founded: "2015",
      headquarters: "San Francisco, CA"
    },
    integrations: ["API", "Web Interface", "Plugin Support", "Mobile Apps", "Microsoft Products", "Third-party Applications"],
    useCases: [
      "Content Creation",
      "Code Development",
      "Data Analysis",
      "Research",
      "Education",
      "Customer Support"
    ],
    limitations: [
      "Knowledge cutoff date limitations",
      "Occasional factual errors",
      "Text hallucinations possible",
      "Limited reasoning in complex scenarios"
    ],
    releaseDate: "May 2024",
    logo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=100&h=100&q=80",
    relatedAgents: ["claude-3-opus", "gemini-pro", "llama-3", "pi", "mistral-large"]
  },
  "claude-3-opus": {
    name: "Claude 3 Opus",
    category: "AI Chatbots",
    rating: 4.8,
    reviews: 756,
    description: "High-performance AI assistant with strong reasoning capabilities",
    longDescription: "Claude 3 Opus is Anthropic's most capable AI assistant, offering exceptional performance across complex tasks. It features advanced reasoning, detailed analysis, and thoughtful responses to challenging questions. The model excels at tasks requiring nuanced understanding and careful problem-solving.",
    features: [
      "Advanced Reasoning",
      "Multimodal Capabilities",
      "Factual Accuracy",
      "Nuanced Understanding",
      "Code Generation",
      "Document Analysis"
    ],
    pricing: {
      model: "Subscription + API Usage",
      startingPrice: "$20/month",
      details: "Claude Pro subscription for individual use; enterprise pricing available for API access"
    },
    company: {
      name: "Anthropic",
      website: "https://anthropic.com",
      founded: "2021",
      headquarters: "San Francisco, CA"
    },
    integrations: ["API", "Web Interface", "AWS Claude", "Claude in Slack", "Third-party Applications"],
    useCases: [
      "Research Analysis",
      "Content Creation",
      "Programming Assistance",
      "Data Analysis",
      "Enterprise Decision Support",
      "Education"
    ],
    limitations: [
      "Limited real-time information",
      "Occasional reasoning errors",
      "Restricted tool use capabilities",
      "Potential cultural biases"
    ],
    releaseDate: "March 2024",
    logo: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=100&h=100&q=80",
    relatedAgents: ["gpt-4o", "gemini-pro", "llama-3", "pi", "mistral-large"]
  },
  "gemini-pro": {
    name: "Gemini Pro",
    category: "AI Chatbots",
    rating: 4.7,
    reviews: 890,
    description: "Multimodal AI system designed to understand text, images, and code",
    longDescription: "Gemini Pro is Google's advanced multimodal AI model capable of understanding and generating text, code, and images. It offers strong performance across a wide range of tasks and can be accessed through Google AI Studio and the Gemini API. The model features improved reasoning and creative abilities.",
    features: [
      "Multimodal Understanding",
      "Code Generation",
      "Image Analysis",
      "Reasoning Capabilities",
      "Creative Content",
      "Google Knowledge Integration"
    ],
    pricing: {
      model: "Freemium + API",
      startingPrice: "Free tier available",
      details: "Free access with limits; Gemini Advanced at $20/month; API pricing based on usage"
    },
    company: {
      name: "Google",
      website: "https://deepmind.google",
      founded: "1998",
      headquarters: "Mountain View, CA"
    },
    integrations: ["Google AI Studio", "API", "Google Cloud", "Android Integration", "Google Workspace", "Third-party Applications"],
    useCases: [
      "App Development",
      "Content Creation",
      "Research",
      "Education",
      "Customer Support",
      "Data Analysis"
    ],
    limitations: [
      "Information cutoff limitations",
      "Less specialized than domain-specific models",
      "Occasional factual errors",
      "Limited third-party integrations"
    ],
    releaseDate: "December 2023 (Updated in 2024)",
    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=100&h=100&q=80",
    relatedAgents: ["gpt-4o", "claude-3-opus", "llama-3", "bard", "palm-2"]
  },
  // More agents could be defined here
};

export default function AgentDetails() {
  const { agentSlug } = useParams();
  
  // Get agent data based on slug
  const agent = agentDatabase[agentSlug as keyof typeof agentDatabase] || {
    name: "Agent Not Found",
    category: "Unknown",
    rating: 0,
    reviews: 0,
    description: "This agent does not exist in our database.",
    longDescription: "We couldn't find the agent you're looking for. Please check the URL or browse our categories to find another AI agent.",
    features: [],
    pricing: {
      model: "N/A",
      startingPrice: "N/A",
      details: "No pricing information available"
    },
    company: {
      name: "Unknown",
      website: "#",
      founded: "N/A",
      headquarters: "N/A"
    },
    integrations: [],
    useCases: [],
    limitations: [],
    releaseDate: "N/A",
    logo: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=100&h=100&q=80",
    relatedAgents: []
  };

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [agentSlug]);

  // Function to handle smooth scroll to top when clicking related agents
  const handleRelatedAgentClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30">
      <Helmet>
        <title>{agent.name} - AI Agent Directory | NeuralNextGen</title>
        <meta name="description" content={agent.description} />
        <meta name="keywords" content={`${agent.name}, ${agent.category}, AI agent, artificial intelligence, ${agent.company.name}`} />
        <meta property="og:title" content={`${agent.name} - AI Agent Details`} />
        <meta property="og:description" content={agent.description} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://neuralnextgen.com/agent/${agentSlug}`} />
      </Helmet>

      <PromotionBanner />
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb & Back Button */}
          <div className="mb-6">
            <Button variant="ghost" size="sm" className="mb-4" asChild>
              <Link to="/ai-agents">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to All Agents
              </Link>
            </Button>
            
            <nav className="flex text-sm text-gray-600">
              <Link to="/" className="hover:text-aiblue">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/ai-agents" className="hover:text-aiblue">AI Agents</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-800">{agent.name}</span>
            </nav>
          </div>
          
          {/* Header Section */}
          <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
            <div className="flex items-start gap-6 mb-4">
              <div className="w-20 h-20 flex-shrink-0">
                <img 
                  src={agent.logo} 
                  alt={agent.name} 
                  className="w-full h-full object-cover rounded-lg border border-gray-200"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{agent.name}</h1>
                  <Badge variant="secondary" className="bg-gradient-to-r from-aiblue to-aipurple text-white">
                    {agent.pricing.model}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <Badge variant="outline">{agent.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{agent.rating}</span>
                    <span className="text-sm text-gray-500">({agent.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Released: {agent.releaseDate}</span>
                  </div>
                </div>
                <p className="text-gray-600">{agent.description}</p>
                
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button className="bg-gradient-to-r from-aiblue to-aipurple text-white">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Official Website
                  </Button>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="md:col-span-2 space-y-8">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Info className="h-5 w-5 text-aiblue" />
                    About
                  </h2>
                  <p className="text-gray-600 leading-relaxed">{agent.longDescription}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-aiblue" />
                    Key Features
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {agent.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Layers className="h-5 w-5 text-aiblue" />
                    Use Cases
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {agent.useCases.map((useCase) => (
                      <Badge key={useCase} variant="secondary" className="justify-center py-2">
                        {useCase}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Info className="h-5 w-5 text-aiblue" />
                    Limitations
                  </h2>
                  <ul className="space-y-2">
                    {agent.limitations.map((limitation) => (
                      <li key={limitation} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></span>
                        <span className="text-gray-600">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Pricing & Integration */}
            <div className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Pricing</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Model</span>
                      <span className="font-medium">{agent.pricing.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Starting at</span>
                      <span className="font-medium">{agent.pricing.startingPrice}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-sm text-gray-500">{agent.pricing.details}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Company</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name</span>
                      <span className="font-medium">{agent.company.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Founded</span>
                      <span className="font-medium">{agent.company.founded}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Headquarters</span>
                      <span className="font-medium">{agent.company.headquarters}</span>
                    </div>
                    <div className="pt-3">
                      <Button variant="outline" className="w-full" onClick={() => window.open(agent.company.website, '_blank')}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Website
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-aiblue" />
                    Integration Methods
                  </h2>
                  <div className="space-y-2">
                    {agent.integrations.map((integration) => (
                      <div key={integration} className="flex items-center gap-2">
                        <ThumbsUp className="h-4 w-4 text-aiblue" />
                        <span>{integration}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Agents Section */}
          {agent.relatedAgents && agent.relatedAgents.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Related AI Agents</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agent.relatedAgents.map(relatedSlug => {
                  const relatedAgent = agentDatabase[relatedSlug as keyof typeof agentDatabase];
                  if (!relatedAgent) return null;
                  
                  return (
                    <Link 
                      to={`/agent/${relatedSlug}`} 
                      key={relatedSlug}
                      className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-3"
                      onClick={handleRelatedAgentClick}
                    >
                      <img 
                        src={relatedAgent.logo || "https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=100&h=100&q=80"} 
                        alt={relatedAgent.name} 
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{relatedAgent.name}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{relatedAgent.description}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
