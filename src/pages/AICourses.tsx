import React, { useState } from "react";
import { Helmet } from "react-helmet";
import AICoursesHero from "@/components/AICoursesHero";
import CourseCategories from "@/components/courses/CourseCategories";
import TrendingCourses from "@/components/courses/TrendingCourses";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FooterSubscribeSection from "@/components/FooterSubscribeSection";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, BookOpen, Code, Brain, ArrowRight, Users, CheckCircle, 
  Award, BarChart, LineChart, Briefcase, Building, Lightbulb, Zap, 
  Clock, ChevronDown, ChevronUp, Star, BadgeCheck, Search
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  icon: React.ElementType;
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

export default function AICourses() {
  // Learning paths data
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

  // FAQ data
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
      <Helmet>
        <title>AI Courses Directory | NeuralNextGen</title>
        <meta name="description" content="Browse our comprehensive directory of AI courses, from free tutorials to premium certifications. Find courses on machine learning, generative AI, prompt engineering, and more." />
        <meta name="keywords" content="AI courses, machine learning courses, prompt engineering, generative AI, free AI tutorials, AI certification" />
      </Helmet>
      <Header />
      <AICoursesHero />
      
      {/* Course Categories Section */}
      <CourseCategories />
      
      {/* Trending Courses Section */}
      <TrendingCourses />
      
      {/* Free vs Premium Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Free Resources & Premium Courses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you're just starting out or looking to advance your skills, we have learning options for every budget
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Resources */}
            <Card className="bg-white shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mr-4">
                    <Zap className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold">Free Resources</h3>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>500+ Free tutorials and guides</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Community discussion forums</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Basic project examples</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Self-paced learning</span>
                  </li>
                </ul>
                
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Browse Free Resources
                </Button>
              </CardContent>
            </Card>
            
            {/* Premium Courses */}
            <Card className="bg-gradient-to-br from-aiblue to-aipurple text-white shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Premium Courses</h3>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0 mt-0.5" />
                    <span>Certification on completion</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0 mt-0.5" />
                    <span>Expert instructor feedback</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0 mt-0.5" />
                    <span>Real-world projects & portfolio</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-white mr-2 flex-shrink-0 mt-0.5" />
                    <span>Career support & networking</span>
                  </li>
                </ul>
                
                <Button className="w-full bg-white text-aipurple hover:bg-gray-100">
                  Explore Premium Courses
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Learning Paths Section */}
      <section className="bg-white py-16">
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
          
          <div className="text-center mt-10">
            <Link to="/ai-courses/directory">
              <Button className="bg-gradient-to-r from-aiblue to-aipurple hover:opacity-90">
                View All Learning Paths
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Student Success Section */}
      <section className="bg-gray-50 py-16">
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
                  <div className="bg-white rounded-xl p-8 shadow-sm">
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
                  <div className="bg-white rounded-xl p-8 shadow-sm">
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
      <section className="bg-white py-16">
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
          
          <div className="text-center mt-10">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Button variant="outline">
              Contact Us for Support
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}
