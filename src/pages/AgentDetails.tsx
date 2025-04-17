
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, Share2, ThumbsUp } from "lucide-react";

export default function AgentDetails() {
  const { agentSlug } = useParams();
  
  // This would normally come from an API, hardcoding for demo
  const agent = {
    name: "GPT-4o",
    category: "Language Models",
    rating: 4.8,
    reviews: 245,
    description: "Advanced language model with multimodal capabilities",
    longDescription: "GPT-4o is OpenAI's most advanced system, producing safer and more useful responses. It can handle complex tasks across text, images, and creative projects.",
    features: ["Multimodal Input", "Advanced Reasoning", "Code Generation", "Creative Writing"],
    pricing: {
      model: "Paid",
      startingPrice: "$20/month",
      details: "Based on usage"
    },
    company: {
      name: "OpenAI",
      website: "https://openai.com"
    },
    integrations: ["API", "Web Interface", "Plugin Support"],
    useCases: [
      "Content Creation",
      "Code Development",
      "Data Analysis",
      "Research"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30">
      <Helmet>
        <title>{agent.name} - AI Agent Directory</title>
        <meta name="description" content={agent.description} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{agent.name}</h1>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{agent.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{agent.rating}</span>
                    <span className="text-sm text-gray-500">({agent.reviews} reviews)</span>
                  </div>
                </div>
                <p className="text-gray-600">{agent.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button className="bg-gradient-to-r from-aiblue to-aipurple text-white">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Website
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="md:col-span-2 space-y-8">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">About</h2>
                  <p className="text-gray-600">{agent.longDescription}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Key Features</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {agent.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <ThumbsUp className="h-4 w-4 text-aiblue" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Use Cases</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {agent.useCases.map((useCase) => (
                      <Badge key={useCase} variant="secondary" className="justify-center py-2">
                        {useCase}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Pricing & Integration */}
            <div className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Pricing</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Model</span>
                      <span className="font-medium">{agent.pricing.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Starting at</span>
                      <span className="font-medium">{agent.pricing.startingPrice}</span>
                    </div>
                    <div className="pt-2">
                      <p className="text-sm text-gray-500">{agent.pricing.details}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Integration Methods</h2>
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
        </div>
      </div>
    </div>
  );
}
