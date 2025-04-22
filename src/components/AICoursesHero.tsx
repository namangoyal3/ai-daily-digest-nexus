
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Brain, Code, Lightbulb, CircuitBoard, Search, CheckCircle, BookOpen, Users } from "lucide-react";

export default function AICoursesHero() {
  const scrollToCourses = () => {
    document.getElementById('courses')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-[#f5f7fe] via-[#e5e5ff] to-[#e3f3fa] py-20 md:py-28 overflow-hidden">
      {/* Decorative AI-themed Circles */}
      <div className="absolute right-12 top-16 w-60 h-60 bg-aipurple/10 rounded-full blur-2xl opacity-40" />
      <div className="absolute left-0 -top-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl opacity-40" />
      <div className="container mx-auto px-4 z-10 relative flex flex-col md:flex-row items-center">
        {/* Hero Left */}
        <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-10">
          <span className="bg-aipurple/20 text-aipurple font-medium px-4 py-1.5 rounded-full text-sm inline-flex items-center mb-4">
            <Brain className="h-5 w-5 mr-2 text-aipurple" />
            The World’s Most Comprehensive AI Courses Directory
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-extrabold text-aiblue leading-tight mb-4">
            <span className="block">Discover, Compare &</span>
            <span className="block text-aipurple">Master AI</span>
            <span className="block">with Top-Rated Online Courses</span>
          </h1>
          <h2 className="sr-only">Best Free AI Courses, Certifications, AI Learning for Beginners & Professionals</h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
            Unlock access to over <span className="font-bold text-aipurple">2,500+ curated AI & Machine Learning courses</span> from leading universities and top platforms—covering everything from Generative AI, LLMs, Prompt Engineering, to AI Tools. Start learning for free, or get premium certification!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6">
            <Button
              className="rounded-full bg-gradient-to-r from-aiblue to-aipurple hover:from-aiblue-dark hover:to-aipurple-dark text-white font-bold px-8 py-5 text-lg shadow-lg transition-all"
              onClick={scrollToCourses}
              aria-label="Browse AI Courses Directory"
            >
              Explore Courses
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
            <div className="flex items-center text-gray-500 text-sm ml-3">
              <Search className="h-4 w-4 mr-1 text-aipurple" />
              <span>Filter courses by skill, topic & type</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="flex items-center bg-white/80 shadow rounded-full px-3 py-1 text-sm font-medium">
              <CircuitBoard className="h-4 w-4 text-aipurple mr-2" />
              Learn with Real AI Models
            </div>
            <div className="flex items-center bg-white/80 shadow rounded-full px-3 py-1 text-sm font-medium">
              <Lightbulb className="h-4 w-4 text-blue-500 mr-2" />
              Up-to-date with Latest AI Trends
            </div>
            <div className="flex items-center bg-white/80 shadow rounded-full px-3 py-1 text-sm font-medium">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              500+ Free Resources
            </div>
            <div className="flex items-center bg-white/80 shadow rounded-full px-3 py-1 text-sm font-medium">
              <Users className="h-4 w-4 text-aipurple mr-2" />
              Trusted by professionals
            </div>
          </div>
        </div>
        {/* Hero Right */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
          {/* Decorative Circle */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-100 rounded-full z-0"></div>
          {/* AI-themed image */}
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600"
            alt="AI models and machine learning brain illustration"
            className="rounded-xl shadow-xl w-[400px] h-[300px] object-cover border-4 border-white relative z-10"
            draggable={false}
            loading="eager"
          />
          {/* Highlight Badge */}
          <div className="absolute -bottom-3 -left-3 bg-white shadow-lg rounded-lg p-3 z-20 flex items-center">
            <BookOpen className="h-5 w-5 text-aipurple mr-1" />
            <span className="font-bold mr-1">2500+</span>
            <span className="text-gray-500 text-sm">courses indexed</span>
          </div>
        </div>
      </div>
      {/* SEO Subheading for Accessibility */}
      <h2 className="sr-only">AI Courses Directory - Best Free & Paid Machine Learning, LLM, and Generative AI Online Courses</h2>
    </section>
  );
}
