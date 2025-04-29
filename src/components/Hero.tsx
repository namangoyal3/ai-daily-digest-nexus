
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Users, Brain, Zap, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const scrollToSubscribe = () => {
    document.getElementById('subscribe-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section className="relative overflow-hidden w-full bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 py-16 md:py-24">
      {/* Decorative Blur Circles */}
      <div className="absolute top-12 right-10 w-80 h-80 bg-aipurple/20 rounded-full blur-3xl opacity-30 animate-pulse-slow" />
      <div className="absolute bottom-0 left-5 w-60 h-60 bg-aiblue/20 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-20 left-10 w-24 h-24 bg-aipurple rounded-full blur-xl" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-aiblue rounded-full blur-xl" />
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-aiteal rounded-full blur-lg" />
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-aipurple rounded-full blur-lg" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Text Area */}
          <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-3xl md:text-5xl lg:text-6xl font-heading font-extrabold text-aiblue leading-tight mb-4"
            >
              Stay Ahead with <span className="text-aipurple">AI Insights</span> Daily
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg"
            >
              Get handpicked AI news, breakthroughs, and practical guides&nbsp;
              <span className="text-aipurple font-medium">in a 5-minute read</span> — trusted by industry pros.
            </motion.p>
            {/* Features */}
            <motion.ul 
              className="flex flex-col gap-4 mb-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.18 } }
              }}
            >
              <motion.li
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                className="flex items-center gap-3 text-base text-aiblue"
              >
                <Brain className="h-6 w-6 text-aiblue" /> Real breakthroughs explained simply
              </motion.li>
              <motion.li
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                className="flex items-center gap-3 text-aipurple"
              >
                <Zap className="h-6 w-6 text-aipurple" /> Actionable guides and top trends
              </motion.li>
              <motion.li
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                className="flex items-center gap-3 text-aiteal"
              >
                <LayoutGrid className="h-6 w-6 text-aiteal" /> Designed to save you time, daily
              </motion.li>
            </motion.ul>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex gap-3 items-center"
            >
              <Button 
                id="hero-subscribe"
                className="rounded-full bg-gradient-to-r from-aiblue to-aipurple hover:from-aiblue-dark hover:to-aipurple-dark text-white font-bold px-8 py-6 text-lg shadow-lg transition-all"
                onClick={scrollToSubscribe}
                aria-label="Subscribe to AI Daily Digest"
              >
                Subscribe Now
                <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
              </Button>
              <span className="text-xs text-gray-500 hidden md:inline">
                No spam. Unsubscribe any time.
              </span>
            </motion.div>
            {/* Avatars */}
            <div className="mt-7 flex items-center">
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
              <span className="ml-4 text-sm text-gray-500">
                <Users className="inline h-4 w-4 mr-1 text-aiblue" />
                <span className="font-semibold text-aiblue">25,000+</span> AI pros already subscribed
              </span>
            </div>
          </div>
          
          {/* Right Featured Card Area with enhanced visuals */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative">
              {/* Main card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="bg-white/95 rounded-2xl shadow-xl border border-aiblue/10 p-7 md:p-10 flex flex-col max-w-[440px] relative z-10"
              >
                <div className="bg-gradient-to-r from-aiblue-light to-aipurple rounded-lg px-3 py-2 text-white text-xs md:text-sm font-bold mb-4 inline-block">
                  Today's AI Highlight
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-bold mb-2 text-aiblue">
                  Google DeepMind's new breakthrough in protein folding
                </h3>
                <p className="text-gray-600 mb-4 text-base">
                  DeepMind's latest algorithm now predicts protein structures with atomic-level accuracy, opening doors for revolutionary drug discovery.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="font-medium">Read time:</span>
                  <span className="ml-1">5 min</span>
                </div>
                
                {/* Decorative image elements */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-100 rounded-lg rotate-6 shadow-sm z-0">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop" 
                    alt="AI visualization"
                    className="w-full h-full object-cover rounded-lg opacity-80"
                  />
                </div>
              </motion.div>
              
              {/* Decorative floating elements */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -top-10 -right-8 w-40 h-40 rounded-xl overflow-hidden shadow-lg"
              >
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=300&fit=crop" 
                  alt="AI code visualization"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-aipurple/20 backdrop-blur-sm"></div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 0.9, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute -bottom-8 -left-6 w-32 h-32 rounded-lg overflow-hidden shadow-md"
              >
                <img 
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=200&h=200&fit=crop" 
                  alt="AI technology"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-aiblue/10 backdrop-blur-[1px]"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
