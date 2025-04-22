
import React from "react";
import { Button } from "@/components/ui/button";
import { Brain, Code, Lightbulb, BookOpen } from "lucide-react";

export default function AICoursesHero() {
  const scrollToCourses = () => {
    document.getElementById('courses')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-[#f5f7fe] via-[#e5e5ff] to-[#e3f3fa] py-20 md:py-32 overflow-hidden">
      {/* AI theme illustration */}
      <div className="absolute right-2 top-5 w-80 h-80 bg-gradient-to-br from-aipurple/20 via-[#ccfbf1] to-[#e3f3fa] rounded-full blur-3xl opacity-30" />
      <div className="container mx-auto px-4 z-10 relative flex flex-col md:flex-row items-center md:justify-between">
        {/* Hero Left */}
        <div className="w-full md:w-6/12 text-center md:text-left">
          <span className="inline-flex items-center bg-gradient-to-r from-aipurple/10 to-blue-100 rounded-full px-4 py-2 mb-6">
            <Brain className="h-6 w-6 text-aipurple mr-2" />
            <strong className="font-semibold text-aipurple">AI & Machine Learning</strong>
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-aiblue leading-tight mb-4">
            <span className="block">Accelerate Your AI Learning</span>
            <span className="block text-aipurple">with Top Online Courses</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-7 max-w-xl mx-auto md:mx-0">
            Browse curated AI & ML courses for all levels. Master generative models, coding, and the latest AI skills.
          </p>
          <Button
            className="rounded-full bg-gradient-to-r from-aiblue to-aipurple hover:opacity-90 text-white font-bold px-8 py-4 text-lg shadow-md transition-all"
            onClick={scrollToCourses}
            aria-label="Browse AI Courses Directory"
          >
            Explore Courses
            <Code className="ml-2 h-5 w-5" />
          </Button>
        </div>
        {/* Hero Right: AI/ML Illustration */}
        <div className="w-full md:w-5/12 mt-12 md:mt-0 flex justify-center md:justify-end relative">
          <div className="absolute -top-8 -right-8 w-36 h-36 bg-purple-100 rounded-full blur-lg opacity-40" />
          <div className="relative z-10 flex items-center justify-center">
            <svg width="320" height="240" viewBox="0 0 320 240" fill="none" className="block rounded-xl shadow-2xl border-4 border-white bg-white">
              {/* Abstract neural network/AI Illustration */}
              <circle cx="80" cy="120" r="50" fill="#ecdefc" />
              <circle cx="240" cy="120" r="50" fill="#d1f0fd" />
              <circle cx="160" cy="70" r="30" fill="#f9fafb" />
              <circle cx="160" cy="170" r="34" fill="#ede9fe" />
              {/* "Connections" */}
              <line x1="80" y1="120" x2="160" y2="70" stroke="#b794f4" strokeWidth="7" strokeLinecap="round" opacity="0.6"/>
              <line x1="240" y1="120" x2="160" y2="70" stroke="#60a5fa" strokeWidth="7" strokeLinecap="round" opacity="0.6"/>
              <line x1="80" y1="120" x2="160" y2="170" stroke="#34d399" strokeWidth="7" strokeLinecap="round" opacity="0.5"/>
              <line x1="240" y1="120" x2="160" y2="170" stroke="#6366f1" strokeWidth="7" strokeLinecap="round" opacity="0.5"/>
              {/* Animated brain dot */}
              <circle cx="160" cy="120" r="26" fill="#c7d2fe">
                <animate attributeName="r" values="24;32;24" dur="2s" repeatCount="indefinite" />
                <animate attributeName="fill" values="#a5b4fc;#dbeafe;#a5b4fc" dur="2s" repeatCount="indefinite" />
              </circle>
              {/* Overlay Lucide icons for visual interest */}
              <g>
                <foreignObject x="147" y="102" width="32" height="32">
                  <div className="flex items-center justify-center">
                    <Brain className="text-aipurple" size={28} />
                  </div>
                </foreignObject>
                <foreignObject x="230" y="148" width="28" height="28">
                  <BookOpen className="text-blue-400" size={24} />
                </foreignObject>
                <foreignObject x="62" y="140" width="28" height="28">
                  <Lightbulb className="text-amber-400" size={20} />
                </foreignObject>
              </g>
            </svg>
          </div>
        </div>
      </div>
      {/* SEO friendly subheading (visually hidden) */}
      <h2 className="sr-only">
        AI Courses Directory: Best Machine Learning, Generative AI, and Prompt Engineering Certifications Online
      </h2>
    </section>
  );
}
