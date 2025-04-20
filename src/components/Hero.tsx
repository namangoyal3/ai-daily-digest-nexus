import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown, Brain, Zap, LineChart, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const scrollToSubscribe = () => {
    document.getElementById('subscribe')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.1,
        duration: 0.6,
        ease: "easeOut" 
      }
    })
  };

  const cardHover = {
    rest: { scale: 1, transition: { duration: 0.2 } },
    hover: { scale: 1.03, transition: { duration: 0.2 } }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-aiblue/5 via-aipurple/5 to-aiteal/5 py-12 md:py-20">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-10 w-72 h-72 bg-aipurple/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-aiblue/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="w-full md:w-1/2 md:pr-12 mb-8 md:mb-0"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2, delayChildren: 0.3 }
              }
            }}
          >
            <motion.h1 
              className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-aiblue leading-tight mb-4 md:mb-6"
              variants={fadeIn}
              custom={0}
            >
              Stay Ahead with AI Insights Delivered Daily
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-8 max-w-lg"
              variants={fadeIn}
              custom={1}
            >
              Curated AI news, breakthroughs, and analysis in a 5-minute daily read. 
              Perfect for busy professionals who need to stay informed.
            </motion.p>
            
            <motion.div 
              className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-lg mb-8 border border-aiblue/10"
              variants={fadeIn}
              custom={2}
            >
              <h2 className="font-heading font-medium text-lg text-aiblue mb-3">What You'll Get</h2>
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  className="flex items-center bg-gradient-to-r from-aiblue/5 to-aipurple/5 p-4 rounded-lg hover:shadow-md transition-all"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Brain className="h-8 w-8 text-aiblue mr-3 flex-shrink-0" />
                  <span className="text-sm font-medium">AI Breakthroughs</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center bg-gradient-to-r from-aipurple/5 to-aiteal/5 p-4 rounded-lg hover:shadow-md transition-all"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Zap className="h-8 w-8 text-aipurple mr-3 flex-shrink-0" />
                  <span className="text-sm font-medium">Industry Insights</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center bg-gradient-to-r from-aiteal/5 to-aiblue/5 p-4 rounded-lg hover:shadow-md transition-all"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <LineChart className="h-8 w-8 text-aiteal mr-3 flex-shrink-0" />
                  <span className="text-sm font-medium">Market Trends</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center bg-gradient-to-r from-aiblue/5 to-aipurple/5 p-4 rounded-lg hover:shadow-md transition-all"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <BarChart3 className="h-8 w-8 text-aiblue mr-3 flex-shrink-0" />
                  <span className="text-sm font-medium">Growth Stats</span>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div
              variants={fadeIn}
              custom={3}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button 
                  id="hero-subscribe"
                  className="rounded-full bg-gradient-to-r from-aiblue to-aipurple hover:from-aiblue-dark hover:to-aipurple-dark text-white font-medium px-8 py-6 text-lg shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all"
                  onClick={scrollToSubscribe}
                  aria-label="Subscribe to AI Daily Digest"
                >
                  Subscribe Now
                  <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
                </Button>
              </motion.div>
              
              <div className="mt-6 flex items-center">
                <div className="flex -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=faces"
                    alt="AI enthusiast avatar"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=faces"
                    alt="Tech professional avatar"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop&crop=faces"
                    alt="Data scientist avatar"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=faces"
                    alt="AI researcher avatar"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                </div>
                <p className="ml-4 text-sm text-gray-500">
                  Joined by <span className="font-semibold text-aiblue">2,000+</span> AI enthusiasts
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="w-full md:w-1/2 px-4 md:px-0"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { delay: 0.6, duration: 0.6 } }
            }}
          >
            <motion.div 
              className="bg-white rounded-xl shadow-xl p-4 md:p-6 transform hover:rotate-0 transition-transform duration-300"
              initial={{ rotate: 1 }}
              whileHover="hover"
              variants={cardHover}
            >
              <div className="bg-gradient-to-r from-aiblue-light to-aipurple rounded-lg p-2 text-white text-sm font-medium mb-4 inline-block">
                Today's Edition
              </div>
              <h3 className="font-heading text-xl md:text-2xl font-bold mb-4">
                Google's DeepMind Reveals New AI Breakthrough in Protein Folding
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-4">
                DeepMind's latest algorithm now predicts protein structures with atomic-level accuracy, 
                opening doors for revolutionary drug discovery methods and personalized medicine approaches.
                This advancement could reduce drug development timelines by years...
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium">Read time:</span>
                <span className="ml-1">5 min</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-4 md:p-6 transform hover:rotate-0 transition-transform duration-300 z-10"
              initial={{ rotate: -2 }}
              whileHover="hover"
              variants={cardHover}
            >
              <div className="bg-gradient-to-r from-aiteal to-aiteal-light rounded-lg p-2 text-white text-sm font-medium mb-4 inline-block">
                AI Market Trends
              </div>
              <h3 className="font-heading text-lg md:text-xl font-bold mb-2">
                Top 5 AI Startups Securing Major Funding This Week
              </h3>
              <p className="text-gray-600 line-clamp-2">
                Exclusive analysis of venture capital movements in the AI landscape...
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
