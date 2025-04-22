
import React, { useState } from "react";
import AICoursesHero from "@/components/AICoursesHero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, BookOpen, Code, Brain, ArrowRight, Users, CheckCircle, 
  Award, BarChart, LineChart, Briefcase, Building, Lightbulb, Zap, 
  Clock, LucideIcon, ChevronDown, ChevronUp, Star, BadgeCheck,
  Search, Filter, SlidersHorizontal, Tags
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
        aria-expanded={isOpen}
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
  // Sample data
  const featuredCourses = [
    {
      title: "Complete AI & Machine Learning Bootcamp 2025",
      instructor: "Dr. Sarah Johnson",
      rating: 4.9,
      students: 12520,
      skillLevel: "Beginner to Advanced",
      duration: "48 hours",
      price: "$94.99",
      originalPrice: "$199.99",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500",
      bestseller: true
    },
    {
      title: "Prompt Engineering Masterclass: ChatGPT & Beyond",
      instructor: "Michael Chang",
      rating: 4.8,
      students: 8340,
      skillLevel: "Intermediate",
      duration: "12 hours",
      price: "$59.99",
      originalPrice: "$119.99",
      image: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=500"
    },
    {
      title: "Building AI Applications with TensorFlow & PyTorch",
      instructor: "Raj Patel, PhD",
      rating: 4.7,
      students: 6780,
      skillLevel: "Advanced",
      duration: "36 hours",
      price: "$84.99",
      originalPrice: "$169.99",
      image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=500"
    },
    {
      title: "AI for Business Leaders: Strategy & Implementation",
      instructor: "Emma Wilson, MBA",
      rating: 4.8,
      students: 5230,
      skillLevel: "All Levels",
      duration: "15 hours",
      price: "$69.99",
      originalPrice: "$139.99",
      image: "https://images.unsplash.com/photo-1581092921461-eab10342d9b3?w=500",
      isNew: true
    }
  ];

  const learningPaths = [
    {
      title: "AI Developer",
      icon: Code,
      description: "Build and deploy cutting-edge AI applications with Python, TensorFlow and PyTorch.",
      timeCommitment: "4-6 months",
      skills: ["Python", "TensorFlow", "PyTorch", "Deep Learning", "API Integration"],
      color: "border-blue-500"
    },
    {
      title: "Prompt Engineer",
      icon: Brain,
      description: "Master the art of crafting effective prompts for LLMs and generative AI systems.",
      timeCommitment: "1-2 months",
      skills: ["Prompt Design", "Context Engineering", "System Optimization", "Content Generation"],
      color: "border-purple-500"
    },
    {
      title: "AI Business Analyst",
      icon: BarChart,
      description: "Learn to leverage AI for business intelligence, analytics and strategic decision-making.",
      timeCommitment: "2-3 months",
      skills: ["Data Analysis", "Business Intelligence", "Strategy", "Decision Science"],
      color: "border-green-500"
    }
  ];

  const faqs = [
    {
      question: "How are NeuralNextGen courses different from free content?",
      answer: "Our courses offer structured learning paths, hands-on projects, expert feedback, and certification. Unlike free content, we provide comprehensive, curated curriculum designed by industry experts with real-world applications and dedicated support."
    },
    {
      question: "Do I get a certificate upon completion?",
      answer: "Yes, all our courses include a verifiable certificate upon successful completion that you can share on LinkedIn and with potential employers."
    },
    {
      question: "How long do I have access to the course materials?",
      answer: "Once enrolled, you have lifetime access to all course materials, including future updates and improvements."
    },
    {
      question: "What if I'm not satisfied with a course?",
      answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied with your purchase, we'll provide a full refund, no questions asked."
    }
  ];

  return (
    <>
      <Header />
      <AICoursesHero />
      
      {/* Featured Courses Section */}
      <section id="courses" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured AI Courses</h2>
              <p className="text-gray-600">Top-rated courses trusted by professionals worldwide</p>
            </div>
            <Link to="/ai-courses/directory" className="text-aiblue font-medium flex items-center mt-4 md:mt-0">
              View All Courses <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Learning Paths Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Career Learning Paths</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Structured curriculum designed to take you from beginner to professional in specific AI career tracks
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningPaths.map((path, index) => (
              <LearningPath key={index} {...path} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Student Success Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Student Success Stories</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              See how our AI courses have helped students advance their careers
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem className="md:basis-1/1">
                  <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4">
                        <img 
                          src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150" 
                          alt="Student" 
                          className="w-20 h-20 object-cover rounded-full mx-auto md:mx-0" 
                        />
                      </div>
                      <div className="md:w-3/4">
                        <div className="flex text-yellow-500 mb-2">
                          {Array(5).fill(0).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400" />
                          ))}
                        </div>
                        <p className="text-gray-700 mb-4">
                          "The AI Developer course completely transformed my career. Within weeks of completing it, I landed a job as a Machine Learning Engineer at a tech startup with a 40% salary increase."
                        </p>
                        <div>
                          <h4 className="font-bold text-lg">David Chen</h4>
                          <p className="text-gray-600">Machine Learning Engineer @ TechAI</p>
                          <div className="flex items-center mt-2">
                            <BadgeCheck className="h-4 w-4 text-blue-600 mr-1" />
                            <span className="text-sm text-blue-600">Verified Graduate</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem className="md:basis-1/1">
                  <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4">
                        <img 
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" 
                          alt="Student" 
                          className="w-20 h-20 object-cover rounded-full mx-auto md:mx-0" 
                        />
                      </div>
                      <div className="md:w-3/4">
                        <div className="flex text-yellow-500 mb-2">
                          {Array(5).fill(0).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400" />
                          ))}
                        </div>
                        <p className="text-gray-700 mb-4">
                          "As a marketer, the Prompt Engineering course helped me leverage AI to create better campaigns. My content performance improved by 200% within 3 months of applying what I learned."
                        </p>
                        <div>
                          <h4 className="font-bold text-lg">Jessica Miller</h4>
                          <p className="text-gray-600">Digital Marketing Director @ GrowthLabs</p>
                          <div className="flex items-center mt-2">
                            <BadgeCheck className="h-4 w-4 text-blue-600 mr-1" />
                            <span className="text-sm text-blue-600">Verified Graduate</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <div className="flex justify-center mt-4">
                <CarouselPrevious className="relative left-0 right-0 translate-y-0 static mx-2" />
                <CarouselNext className="relative left-0 right-0 translate-y-0 static mx-2" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Get answers to common questions about our AI courses
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}
