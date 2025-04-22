
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Star, BookOpen } from "lucide-react";

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
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-extrabold text-aiblue leading-tight mb-4">
            Master AI, Promptly.
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
            Comprehensive, hands-on courses to upskill in AI — fast. Curated by industry leaders and rated&nbsp;
            <span className="inline-flex items-center text-aipurple font-semibold">
              4.9 <Star className="ml-1 h-4 w-4" fill="#7c3aed" />
            </span>
            &nbsp;by 2,500+ learners.
          </p>
          <div className="flex gap-4 items-center">
            <Button
              className="rounded-full bg-gradient-to-r from-aiblue to-aipurple hover:from-aiblue-dark hover:to-aipurple-dark text-white font-bold px-8 py-5 text-lg shadow-lg transition-all"
              onClick={scrollToCourses}
              aria-label="Browse AI Courses"
            >
              Browse Courses
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
            <div className="flex items-center text-gray-400/80 text-xs ml-3 whitespace-nowrap">
              <BookOpen className="h-4 w-4 mr-1 text-aipurple" /> All levels
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <img
            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400"
            alt="AI Courses Hero"
            className="rounded-xl shadow-lg w-[340px] h-[280px] object-cover border border-white/60"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
}
