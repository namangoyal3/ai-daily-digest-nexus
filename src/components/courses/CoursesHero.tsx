
import React from 'react';
import { Button } from "@/components/ui/button";
import { GraduationCap, Book, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CoursesHero() {
  return (
    <div className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-aiblue/5 via-aipurple/5 to-aiteal/5">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-10 w-72 h-72 bg-aipurple/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-aiblue/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-aiblue mb-6 font-heading"
          >
            Master AI Technology with Expert-Led Courses
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 leading-relaxed"
          >
            Comprehensive AI courses designed by industry experts. Learn practical skills in machine learning, deep learning, and AI applications through hands-on projects.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {[
              {
                icon: GraduationCap,
                title: "Expert-Led Training",
                description: "Learn from industry professionals with real-world AI experience"
              },
              {
                icon: Book,
                title: "Practical Projects",
                description: "Build production-ready AI applications and tools"
              },
              {
                icon: Award,
                title: "Certification",
                description: "Earn recognized credentials trusted by employers"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <feature.icon className="h-8 w-8 text-aiblue mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-aiblue to-aipurple text-white font-medium hover:opacity-90"
            >
              Explore Courses
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-aiblue text-aiblue hover:bg-aiblue hover:text-white"
            >
              View Curriculum
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
