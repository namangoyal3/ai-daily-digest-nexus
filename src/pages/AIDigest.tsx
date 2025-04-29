
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import ContentPreview from "@/components/ContentPreview";
import SubscriptionForm from "@/components/SubscriptionForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingSubscribeButton from "@/components/FloatingSubscribeButton";
import RecentBlogs from "@/components/RecentBlogs";
import EarlySubscribeSection from "@/components/EarlySubscribeSection";
import { motion } from "framer-motion";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function AIDigest() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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

  useEffect(() => {
    // Check if we should scroll to the early subscribe section
    if (location.state && location.state.scrollToEarlySubscribe) {
      setTimeout(() => {
        const earlySubscribeSection = document.querySelector('.bg-gradient-to-r.from-\\[\\#9b87f5\\].to-\\[\\#7c3aed\\].py-12');
        if (earlySubscribeSection) {
          earlySubscribeSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 500); // Small delay to ensure the page has loaded
    }
  }, [location]);

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
        <title>AI Digest by NeuralNextGen: Curated AI News & Trends</title>
        <meta name="description" content="Get the latest AI news, breakthroughs, and trends with AI Digest. Curated by NeuralNextGen for enthusiasts, professionals, and innovators." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <meta name="keywords" content="AI news, artificial intelligence digest, AI insights, tech newsletter, AI updates, daily AI news" />
        
        <meta property="og:title" content="AI Digest: Curated AI News & Trends" />
        <meta property="og:description" content="Stay informed with AI Digest – your source for curated artificial intelligence news, expert analysis, and industry updates." />
        <meta property="og:url" content="https://neuralnextgen.com/ai-digest" />
        <meta property="og:image" content="https://neuralnextgen.com/images/ai-digest-og.jpg" />
        <meta property="og:site_name" content="NeuralNextGen" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Digest by NeuralNextGen: Curated AI News & Trends" />
        <meta name="twitter:description" content="Explore the latest in AI with AI Digest – curated news, expert insights, and trends from NeuralNextGen." />
        <meta name="twitter:image" content="https://neuralnextgen.com/images/ai-digest-og.jpg" />
        
        <link rel="canonical" href="https://neuralnextgen.com/ai-digest" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AI Digest by NeuralNextGen",
              "url": "https://neuralnextgen.com/ai-digest",
              "logo": "https://neuralnextgen.com/images/logo.png",
              "sameAs": [
                "https://twitter.com/NeuralNextGen",
                "https://linkedin.com/company/neural-next-gen"
              ],
              "description": "Get the latest AI news, breakthroughs, and trends with AI Digest. Curated by NeuralNextGen for enthusiasts, professionals, and innovators."
            }
          `}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        <header className={`sticky top-0 z-30 w-full transition-all duration-300 ${
          scrolled ? "shadow-md bg-white/95 backdrop-blur-sm" : "bg-white"
        }`}>
          <Header />
        </header>
        
        <main className="w-full overflow-hidden">
          <ErrorBoundary>
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
                id="early-subscribe-section"
              >
                <EarlySubscribeSection />
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
              >
                <RecentBlogs />
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
          </ErrorBoundary>
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
