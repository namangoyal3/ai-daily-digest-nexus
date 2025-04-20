
import React from 'react';
import { Button } from "@/components/ui/button";
import { GraduationCap, Book, Award } from 'lucide-react';

export default function CoursesHero() {
  return (
    <div className="relative min-h-[90vh] flex items-center">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: "url('/photo-1488590528505-98d2b5aba04b')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10 px-4 py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-heading">
            Master Artificial Intelligence
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Comprehensive AI courses designed by industry experts. Learn practical skills in machine learning, deep learning, and AI applications.
          </p>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: GraduationCap,
                title: "Expert-Led Training",
                description: "Learn from industry professionals"
              },
              {
                icon: Book,
                title: "Practical Projects",
                description: "Build real-world AI applications"
              },
              {
                icon: Award,
                title: "Certification",
                description: "Earn recognized credentials"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20"
              >
                <feature.icon className="h-8 w-8 text-white mb-4" />
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/80 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8"
            >
              Explore Courses
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 px-8"
            >
              View Curriculum
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
