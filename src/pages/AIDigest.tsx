import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import ContentPreview from "@/components/ContentPreview";
import SubscriptionForm from "@/components/SubscriptionForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingSubscribeButton from "@/components/FloatingSubscribeButton";
import PromotionBanner from "@/components/PromotionBanner";
import { motion } from "framer-motion";

export default function AIDigest() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>AI Daily Digest - Stay Ahead with AI Insights | AI News & Updates 2025</title>
        <meta 
          name="description" 
          content="Get curated AI news, breakthroughs, and analysis in a 5-minute daily read. Join 2000+ professionals staying ahead with AI Daily Digest, your trusted source for AI insights."
        />
        <meta 
          name="keywords" 
          content="AI news, artificial intelligence digest, AI insights, tech newsletter, AI updates, daily AI news, AI breakthroughs 2025"
        />
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        <PromotionBanner />
        <div className={`sticky top-[40px] z-30 transition-all duration-300 ${
          scrolled ? "shadow-md bg-white/95 backdrop-blur-sm" : ""
        }`}>
          <Header />
        </div>
        
        <main>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.section variants={fadeIn}>
              <Hero />
            </motion.section>
            
            <motion.section 
              variants={fadeIn}
              viewport={{ once: true, amount: 0.2 }}
              initial="hidden"
              whileInView="visible"
            >
              <Benefits />
            </motion.section>
            
            <motion.section 
              variants={fadeIn}
              viewport={{ once: true, amount: 0.2 }}
              initial="hidden"
              whileInView="visible"
            >
              <ContentPreview />
            </motion.section>
            
            <motion.section 
              variants={fadeIn}
              viewport={{ once: true, amount: 0.2 }}
              initial="hidden"
              whileInView="visible"
              id="subscribe-section"
            >
              <SubscriptionForm />
            </motion.section>
            
            <motion.section 
              variants={fadeIn}
              viewport={{ once: true, amount: 0.2 }}
              initial="hidden"
              whileInView="visible"
            >
              <FAQ />
            </motion.section>
          </motion.div>
        </main>
        
        <Footer />
        
        {scrolled && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FloatingSubscribeButton />
          </motion.div>
        )}
      </div>
    </>
  );
}
