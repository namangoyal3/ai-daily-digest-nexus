
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import ContentPreview from "@/components/ContentPreview";
import SubscriptionForm from "@/components/SubscriptionForm";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingSubscribeButton from "@/components/FloatingSubscribeButton";
import { Helmet } from "react-helmet";

export default function Index() {
  return (
    <>
      <Helmet>
        <title>AI Daily Digest - Stay Ahead with AI Insights</title>
        <meta name="description" content="Get curated AI news, breakthroughs, and analysis in a 5-minute daily read. Join 2000+ professionals staying ahead with AI Daily Digest." />
        <meta name="keywords" content="AI news, artificial intelligence digest, AI insights, tech newsletter, AI updates, daily AI news" />
        <meta property="og:title" content="AI Daily Digest - Daily AI Insights Newsletter" />
        <meta property="og:description" content="Stay informed with curated AI news and insights delivered daily to your inbox." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://aidailydigest.com" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AI Daily Digest",
              "url": "https://aidailydigest.com",
              "logo": "https://aidailydigest.com/logo.png",
              "sameAs": [
                "https://twitter.com/AIDailyDigest",
                "https://linkedin.com/company/ai-daily-digest"
              ],
              "description": "Curated AI news, breakthroughs, and analysis in a 5-minute daily read."
            }
          `}
        </script>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        <Header />
        <main>
          <Hero />
          <Benefits />
          <ContentPreview />
          <Pricing />
          <SubscriptionForm />
          <FAQ />
        </main>
        <Footer />
        <FloatingSubscribeButton />
      </div>
    </>
  );
}
