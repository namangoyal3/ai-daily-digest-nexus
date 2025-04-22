
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Star, BookOpen, Users, CheckCircle, Search } from "lucide-react";

export default function AICoursesHero() {
  const scrollToCourses = () => {
    document.getElementById('courses')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-[#f5f7fe] via-[#e5e5ff] to-[#e3f3fa] py-20 md:py-28 overflow-hidden">
      <div className="absolute right-12 top-16 w-60 h-60 bg-aipurple/10 rounded-full blur-2xl opacity-40" />
      <div className="container mx-auto px-4 z-10 relative flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-10">
          <span className="bg-aipurple/10 text-aipurple font-medium px-4 py-1.5 rounded-full text-sm inline-block mb-4">
            Top-rated AI Education
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-extrabold text-aiblue leading-tight mb-6">
            Discover AI Courses for Every Skill Level
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
            Browse our curated directory of 2,500+ AI courses from beginner to advanced. Find free and premium resources rated&nbsp;
            <span className="inline-flex items-center text-aipurple font-semibold">
              4.9 <Star className="ml-1 h-4 w-4" fill="#7c3aed" />
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6">
            <Button
              className="rounded-full bg-gradient-to-r from-aiblue to-aipurple hover:from-aiblue-dark hover:to-aipurple-dark text-white font-bold px-8 py-5 text-lg shadow-lg transition-all"
              onClick={scrollToCourses}
              aria-label="Browse AI Courses"
            >
              Explore Directory
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
            
            <div className="flex items-center text-gray-500 text-sm ml-3">
              <Search className="h-4 w-4 mr-1 text-aipurple" /> 
              <span>Filter by skill level or topic</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            <div className="flex items-center text-sm">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> 
              <span>500+ Free Resources</span>
            </div>
            <div className="flex items-center text-sm">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> 
              <span>Premium Certifications</span>
            </div>
            <div className="flex items-center text-sm">
              <Users className="h-4 w-4 text-aipurple mr-2" /> 
              <span>Community-vetted</span>
            </div>
            <div className="flex items-center text-sm">
              <BookOpen className="h-4 w-4 text-aipurple mr-2" /> 
              <span>Updated Weekly</span>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-100 rounded-full z-0"></div>
          <img
            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600"
            alt="AI Courses Directory"
            className="rounded-xl shadow-xl w-[400px] h-[300px] object-cover border-4 border-white relative z-10"
            draggable={false}
          />
          <div className="absolute -bottom-3 -left-3 bg-white shadow-lg rounded-lg p-3 z-20 flex items-center">
            <Star className="h-5 w-5 text-yellow-500 mr-1" fill="#EAB308" />
            <span className="font-bold mr-1">4.9</span>
            <span className="text-gray-500 text-sm">(2.5k+ reviews)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
