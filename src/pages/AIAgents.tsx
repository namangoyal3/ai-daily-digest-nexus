
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Hero from "@/components/agents/AgentHero";
import AgentGrid from "@/components/agents/AgentGrid";
import Footer from "@/components/Footer";
import FloatingSubscribeButton from "@/components/FloatingSubscribeButton";
import PromotionBanner from "@/components/PromotionBanner";
import { motion } from "framer-motion";
import FeaturedAgents from "@/components/agents/FeaturedAgents";
import AgentCategories from "@/components/agents/AgentCategories";
import RelatedContent from "@/components/agents/RelatedContent";
import { Link } from "react-router-dom";

export default function AIAgents() {
  return (
    <>
      <Helmet>
        <title>AI Agents by NeuralNextGen: Explore Autonomous AI Solutions</title>
        <meta name="description" content="Discover the latest in AI agents-autonomous, intelligent systems transforming industries. Insights, tools, and trends curated by NeuralNextGen." />
        <meta name="keywords" content="AI agents, artificial intelligence directory, AI tools comparison, AI chatbots, AI image generators, AI coding tools, AI video creation, AI writing assistants" />
        <meta property="og:title" content="AI Agents by NeuralNextGen: Explore Autonomous AI Solutions" />
        <meta property="og:description" content="Dive into the world of AI agents with NeuralNextGen. Learn about autonomous AI, industry applications, and the future of intelligent automation." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://neuralnextgen.com/images/ai-agents-og.jpg" />
        <link rel="canonical" href="https://neuralnextgen.com/ai-agents" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "AI Agents Directory",
              "url": "https://neuralnextgen.com/ai-agents",
              "description": "Comprehensive directory of AI agents and tools from around the world",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://neuralnextgen.com/ai-agents/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "mainEntity": {
                "@type": "ItemList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "ChatGPT",
                    "url": "https://neuralnextgen.com/agent/gpt-4o"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Claude",
                    "url": "https://neuralnextgen.com/agent/claude-3-opus"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Midjourney",
                    "url": "https://neuralnextgen.com/agent/midjourney"
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
          <RelatedContent />

          {/* Breadcrumb Navigation for SEO */}
          <div className="container mx-auto px-4 py-6">
            <nav className="text-sm text-gray-500">
              <ol className="flex flex-wrap items-center">
                <li>
                  <Link to="/" className="hover:text-aiblue">Home</Link>
                </li>
                <span className="mx-2">/</span>
                <li className="font-medium text-gray-700">AI Agents Directory</li>
              </ol>
            </nav>
          </div>
        </main>
        <Footer />
        <FloatingSubscribeButton />
      </motion.div>
    </>
  );
}
