
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Hero from "@/components/agents/AgentHero";
import Benefits from "@/components/agents/AgentBenefits";
import ContentPreview from "@/components/agents/AgentContentPreview";
import SubscriptionForm from "@/components/SubscriptionForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingSubscribeButton from "@/components/FloatingSubscribeButton";
import PromotionBanner from "@/components/PromotionBanner";

export default function AIAgents() {
  return (
    <>
      <Helmet>
        <title>AI Agents Directory - Discover and Compare AI Agents</title>
        <meta name="description" content="Explore our comprehensive directory of AI agents. Find, compare and integrate the perfect AI solution for your needs." />
        <meta name="keywords" content="AI agents, artificial intelligence directory, AI tools, AI comparison" />
        <meta property="og:title" content="AI Agents Directory - Your AI Agent Discovery Platform" />
        <meta property="og:description" content="Browse and compare the latest AI agents from around the world." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        <PromotionBanner />
        <Header />
        <main>
          <Hero />
          <Benefits />
          <ContentPreview />
          <SubscriptionForm />
          <FAQ />
        </main>
        <Footer />
        <FloatingSubscribeButton />
      </div>
    </>
  );
}
