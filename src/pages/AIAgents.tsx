import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Hero from "@/components/agents/AgentHero";
import AgentGrid from "@/components/agents/AgentGrid";
import Footer from "@/components/Footer";
import PromotionBanner from "@/components/PromotionBanner";
import { motion } from "framer-motion";
import FeaturedAgents from "@/components/agents/FeaturedAgents";
import AgentCategories from "@/components/agents/AgentCategories";

export default function AIAgents() {
  return (
    <>
      <Helmet>
        <title>AI Agents Directory 2025 | Find and Compare 500+ AI Tools</title>
        <meta 
          name="description" 
          content="Explore our comprehensive directory of 500+ AI agents and tools. Compare features, pricing, and reviews to find the perfect AI solution for your specific needs." 
        />
        <meta name="keywords" content="AI agents, artificial intelligence directory, AI tools comparison, AI chatbots, AI image generators, AI coding tools, AI video creation, AI writing assistants" />
        <meta property="og:title" content="AI Agents Directory 2025 | Find and Compare 500+ AI Tools" />
        <meta property="og:description" content="Browse and compare the latest AI agents from around the world. Find detailed reviews, pricing, and alternatives for popular tools like ChatGPT, Midjourney, DALL-E, Claude and more." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://aidailydigest.com/images/ai-agents-directory.jpg" />
        <link rel="canonical" href="https://aidailydigest.com/ai-agents" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "AI Agents Directory",
              "url": "https://aidailydigest.com/ai-agents",
              "description": "Comprehensive directory of AI agents and tools from around the world",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://aidailydigest.com/ai-agents/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "mainEntity": {
                "@type": "ItemList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "ChatGPT",
                    "url": "https://aidailydigest.com/agent/gpt-4o"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Claude",
                    "url": "https://aidailydigest.com/agent/claude-3-opus"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Midjourney",
                    "url": "https://aidailydigest.com/agent/midjourney"
                  }
                ]
              }
            }
          `}
        </script>
      </Helmet>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30"
      >
        <PromotionBanner />
        <Header />
        <main>
          <Hero />
          <FeaturedAgents />
          <AgentCategories />
          <AgentGrid />
          
          <div className="container mx-auto px-4 py-6">
            <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center">
                <li>
                  <a href="/" className="hover:text-aiblue">Home</a>
                </li>
                <span className="mx-2">/</span>
                <li className="font-medium text-gray-700">AI Agents Directory</li>
              </ol>
            </nav>
          </div>
        </main>
        <Footer />
      </motion.div>
    </>
  );
}
