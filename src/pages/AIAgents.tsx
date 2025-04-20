import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Hero from "@/components/agents/AgentHero";
import AgentGrid from "@/components/agents/AgentGrid";
import Footer from "@/components/Footer";
import FloatingSubscribeButton from "@/components/FloatingSubscribeButton";
import PromotionBanner from "@/components/PromotionBanner";
import { motion } from "framer-motion";

export default function AIAgents() {
  return (
    <>
      <Helmet>
        <title>AI Agents Directory - Discover and Compare AI Agents</title>
        <meta name="description" content="Explore our comprehensive directory of AI agents. Find, compare and integrate the perfect AI solution for your needs." />
        <meta name="keywords" content="AI agents, artificial intelligence directory, AI tools, AI comparison, AI chatbots, AI image generators, AI coding tools" />
        <meta property="og:title" content="AI Agents Directory - Your AI Agent Discovery Platform" />
        <meta property="og:description" content="Browse and compare the latest AI agents from around the world. Find the perfect AI solution for your specific needs." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://aidailydigest.com/ai-agents" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "AI Agents Directory",
              "url": "https://aidailydigest.com/ai-agents",
              "description": "Comprehensive directory of AI agents from around the world",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://aidailydigest.com/ai-agents/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
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
          <AgentGrid />
        </main>
        <Footer />
        <FloatingSubscribeButton />
      </motion.div>
    </>
  );
}
