
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
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

export default function MidjourneyDetails() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Midjourney details
  const agent = {
    name: "Midjourney",
    category: "Image Generation",
    rating: 4.9,
    reviews: 1876,
    description: "AI-powered image generation tool for creating stunning artwork",
    longDescription: "Midjourney is an advanced AI image generator that transforms text prompts into high-quality artwork. The tool is known for its aesthetic sophistication and has become a favorite among artists, designers, and creative professionals. Midjourney v6, the latest version, offers enhanced photorealism, more accurate prompt following, and improved composition capabilities.",
    features: [
      "Text-to-Image Generation", 
      "Style Customization", 
      "High Resolution Output", 
      "Discord Integration",
      "Batch Processing",
      "Variation Creation"
    ],
    pricing: {
      model: "Subscription",
      startingPrice: "$10/month",
      details: "Basic plan at $10/month; Standard plan at $30/month; Pro plan at $60/month; Mega plan at $120/month"
    },
    company: {
      name: "Midjourney, Inc.",
      website: "https://www.midjourney.com",
      founded: "2022",
      headquarters: "San Francisco, CA"
    },
    integrations: ["Discord", "API (Limited Access)", "Web Interface (Beta)", "Third-party Applications"],
    useCases: [
      "Concept Art",
      "Marketing Visuals",
      "Interior Design",
      "Fashion Design",
      "Book Covers",
      "Character Design"
    ],
    limitations: [
      "Limited control over specific elements",
      "Text rendering challenges",
      "Occasional anatomical distortions",
      "Primary access via Discord"
    ],
    releaseDate: "July 2022 (Latest version: April 2024)",
    logo: "https://images.unsplash.com/photo-1678382178331-bea07b0fe97b?auto=format&fit=crop&w=100&h=100&q=80",
    relatedAgents: ["dall-e-3", "stable-diffusion", "firefly", "imagen"]
  };

  // Sample images
  const sampleImages = [
    "https://images.unsplash.com/photo-1633186650811-38021092dbf0",
    "https://images.unsplash.com/photo-1618331835717-801e976710b2",
    "https://images.unsplash.com/photo-1614729375296-a4726f254410",
    "https://images.unsplash.com/photo-1617791160505-6f00504e3519"
  ];

  // Alternative tools
  const alternatives = [
    {
      name: "DALL-E 3",
      description: "OpenAI's image generation model with strong text understanding",
      logo: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=60&h=60&q=80",
      slug: "dall-e-3"
    },
    {
      name: "Stable Diffusion",
      description: "Open source image generation model with advanced capabilities",
      logo: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=60&h=60&q=80",
      slug: "stable-diffusion"
    },
    {
      name: "Adobe Firefly",
      description: "Commercial-focused image generator with designer-friendly tools",
      logo: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=60&h=60&q=80",
      slug: "firefly"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30">
      <Helmet>
        <title>Midjourney Review 2025 | AI Image Generator | Features, Pricing & Alternatives</title>
        <meta name="description" content="Comprehensive Midjourney review with pricing, features, use cases, and alternatives. Discover if this leading AI image generator is right for your creative projects." />
        <meta name="keywords" content="Midjourney, AI image generator, text to image AI, Midjourney review, Midjourney pricing, Midjourney alternatives, Midjourney vs DALL-E" />
        <meta property="og:title" content="Midjourney Review 2025 | AI Image Generator" />
        <meta property="og:description" content="In-depth Midjourney review with pricing details, key features, and alternatives to help you choose the right AI image generation tool." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://aidailydigest.com/images/midjourney-review.jpg" />
        <link rel="canonical" href="https://aidailydigest.com/agent/midjourney" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Midjourney",
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Web-based",
              "description": "AI-powered image generation tool for creating stunning artwork",
              "offers": {
                "@type": "Offer",
                "price": "10.00",
                "priceCurrency": "USD",
                "priceValidUntil": "2025-12-31"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "1876"
              },
              "review": {
                "@type": "Review",
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": "4.9"
                },
                "author": {
                  "@type": "Organization",
                  "name": "AI Daily Digest"
                },
                "reviewBody": "Midjourney is a revolutionary AI image generator that produces stunning artwork from text prompts. With its latest version, it offers enhanced photorealism and composition capabilities."
              }
            }
          `}
        </script>
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
              <Link to="/category/image-generation" className="hover:text-aiblue">Image Generation</Link>
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
                  <h2 className="text-xl font-semibold mb-4">Sample Images</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {sampleImages.map((image, index) => (
                      <div key={index} className="overflow-hidden rounded-lg">
                        <img 
                          src={image} 
                          alt={`${agent.name} sample ${index + 1}`}
                          className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
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
              
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Alternatives</h2>
                  <div className="space-y-4">
                    {alternatives.map((alt) => (
                      <Link key={alt.slug} to={`/agent/${alt.slug}`} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <img src={alt.logo} alt={alt.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <h3 className="font-medium text-gray-900">{alt.name}</h3>
                          <p className="text-sm text-gray-500 line-clamp-1">{alt.description}</p>
                        </div>
                      </Link>
                    ))}
                    <Button variant="outline" asChild className="w-full mt-2">
                      <Link to="/category/image-generation">
                        View All Image Generation Tools
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Agents Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related AI Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {agent.relatedAgents.map(relatedSlug => (
                <Link 
                  to={`/agent/${relatedSlug}`} 
                  key={relatedSlug}
                  className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-start gap-3"
                >
                  <img 
                    src={`https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?auto=format&fit=crop&w=60&h=60&q=80`}
                    alt={relatedSlug}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 capitalize">{relatedSlug.replace(/-/g, ' ')}</h3>
                    <p className="text-sm text-gray-600">View details →</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Article Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Midjourney Guides & Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link to="/article/midjourney-beginner-guide" className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="aspect-video">
                  <img 
                    src="https://images.unsplash.com/photo-1618172193622-ae2d025f2c85" 
                    alt="Midjourney Beginner Guide"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">Beginner's Guide to Midjourney</h3>
                  <p className="text-sm text-gray-600 mt-2">Learn how to get started with Midjourney and create your first AI-generated images.</p>
                </div>
              </Link>
              
              <Link to="/article/midjourney-vs-dall-e" className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="aspect-video">
                  <img 
                    src="https://images.unsplash.com/photo-1620121692029-d088224ddc74" 
                    alt="Midjourney vs DALL-E"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">Midjourney vs DALL-E: Which AI Art Generator Is Better?</h3>
                  <p className="text-sm text-gray-600 mt-2">A comprehensive comparison of the two leading AI image generation tools.</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
