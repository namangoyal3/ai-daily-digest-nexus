import React from "react";
import AICoursesHero from "@/components/AICoursesHero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, Book, Code, Brain, ArrowRight, Users, CheckCircle, 
  Award, BarChart, LineChart, Briefcase, Building, Lightbulb, Zap, 
  Clock, LucideIcon, ChevronDown, ChevronUp, Star, BadgeCheck,
  Search, Filter, SlidersHorizontal, Tags, BookOpen
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// FAQ Item component
interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        className="flex justify-between items-center w-full text-left font-medium text-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="h-5 w-5 flex-shrink-0" /> : <ChevronDown className="h-5 w-5 flex-shrink-0" />}
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

// Learning Path component
interface LearningPathProps {
  title: string;
  icon: LucideIcon;
  description: string;
  timeCommitment: string;
  skills: string[];
  color: string;
}

const LearningPath = ({ title, icon: Icon, description, timeCommitment, skills, color }: LearningPathProps) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg border-t-4 ${color} p-6 hover:shadow-xl transition-shadow`}>
      <div className="flex items-start">
        <div className={`p-3 rounded-lg ${color.replace('border', 'bg').replace('-500', '-100')} mr-4`}>
          <Icon className={`h-6 w-6 ${color.replace('border', 'text')}`} />
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Clock className="h-4 w-4 mr-1" />
            <span>{timeCommitment}</span>
          </div>
          <div className="mb-4">
            <h4 className="font-medium text-sm mb-2">Skills You'll Gain:</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">{skill}</span>
              ))}
            </div>
          </div>
          <Button variant="outline" size="sm" className="mt-2">
            Explore Path <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Course Card Component
interface CourseProps {
  title: string;
  instructor: string;
  rating: number;
  students: number;
  skillLevel: string;
  duration: string;
  price: string;
  originalPrice?: string;
  image: string;
  bestseller?: boolean;
  isNew?: boolean;
}

const CourseCard = ({ 
  title, 
  instructor, 
  rating, 
  students, 
  skillLevel, 
  duration, 
  price, 
  originalPrice, 
  image,
  bestseller,
  isNew
}: CourseProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        {bestseller && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
            BESTSELLER
          </div>
        )}
        {isNew && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            NEW
          </div>
        )}
        
        {isHovered && (
          <div className="absolute inset-0 bg-black/75 p-4 flex flex-col justify-center text-white transition-opacity duration-300">
            <h4 className="font-medium mb-2">What you'll learn:</h4>
            <ul className="text-sm space-y-1 list-disc pl-4">
              <li>Core principles and techniques</li>
              <li>Practical implementation skills</li>
              <li>Real-world project experience</li>
            </ul>
            <Button variant="secondary" size="sm" className="mt-4">
              Quick View
            </Button>
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow">
        <h3 className="font-bold text-lg mb-1 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">{instructor}</p>
        
        <div className="flex items-center mb-1">
          <span className="text-yellow-500 font-bold mr-1">{rating}</span>
          <div className="flex text-yellow-500">
            {Array(5).fill(0).map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({students.toLocaleString()})</span>
        </div>
        
        <div className="flex items-center text-xs text-gray-600 space-x-2 mb-3">
          <span>{skillLevel}</span>
          <span>•</span>
          <span>{duration}</span>
        </div>
        
        <div className="flex items-center">
          <span className="font-bold text-lg">{price}</span>
          {originalPrice && (
            <span className="text-gray-500 line-through text-sm ml-2">{originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

// Filter Category Component
interface FilterCategoryProps {
  title: string;
  options: string[];
  expanded?: boolean;
}

const FilterCategory = ({ title, options, expanded = false }: FilterCategoryProps) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        className="flex justify-between items-center w-full text-left font-medium"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>{title}</span>
        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      
      {isExpanded && (
        <div className="mt-3 space-y-2">
          {options.map((option, index) => (
            <div key={index} className="flex items-center">
              <input 
                type="checkbox" 
                id={`${title.toLowerCase()}-${index}`}
                className="h-4 w-4 rounded border-gray-300 text-aiblue focus:ring-aiblue"
              />
              <label htmlFor={`${title.toLowerCase()}-${index}`} className="ml-2 text-sm text-gray-600">
                {option}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function AICourses() {
  return (
    <>
      <AICoursesHero />
    </>
  );
}
