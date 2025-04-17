
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, Book, Code, Brain, ArrowRight, Users, CheckCircle, 
  Award, BarChart, LineChart, Briefcase, Building, Lightbulb, Zap, 
  Clock, LucideIcon, ChevronDown, ChevronUp, Star, BadgeCheck
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";

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

export default function AICourses() {
  // Stats for Why Learn AI section
  const aiStats = [
    { label: "AI market growth", value: "5x", subtext: "projected over next 5 years" },
    { label: "Salary increase", value: "50%", subtext: "higher than median tech salary" },
    { label: "AI job demand", value: "97M", subtext: "positions by 2025" },
    { label: "Career advancement", value: "3x", subtext: "faster with AI skills" }
  ];

  // Learning paths data
  const learningPaths = [
    {
      title: "AI for Software Developers",
      icon: Code,
      description: "Master AI development using Python, TensorFlow, and PyTorch to build intelligent applications.",
      timeCommitment: "6-8 months",
      skills: ["Python", "TensorFlow", "PyTorch", "Neural Networks", "Model Deployment"],
      color: "border-blue-500"
    },
    {
      title: "AI for Business Professionals",
      icon: Briefcase,
      description: "Learn how to implement AI strategies and manage AI projects in business contexts.",
      timeCommitment: "3-4 months",
      skills: ["AI Strategy", "Implementation Planning", "ROI Analysis", "Vendor Evaluation"],
      color: "border-purple-500"
    },
    {
      title: "AI for Data Scientists",
      icon: BarChart,
      description: "Advance your data science skills with cutting-edge machine learning and deep learning techniques.",
      timeCommitment: "8-10 months",
      skills: ["Advanced ML", "Deep Learning", "NLP", "Computer Vision", "Reinforcement Learning"],
      color: "border-green-500"
    },
    {
      title: "AI for Beginners",
      icon: Lightbulb,
      description: "Build a solid foundation in AI concepts, ethics, and practical applications with no prior experience needed.",
      timeCommitment: "2-3 months",
      skills: ["AI Fundamentals", "Ethics", "Applications", "Basic Python"],
      color: "border-orange-500"
    },
    {
      title: "AI for Industry Specialists",
      icon: Building,
      description: "Specialized AI training for professionals in healthcare, finance, manufacturing, and education.",
      timeCommitment: "4-6 months",
      skills: ["Industry-specific AI", "Domain Applications", "Compliance", "Implementation"],
      color: "border-red-500"
    },
    {
      title: "AI Research & Innovation",
      icon: Brain,
      description: "Explore cutting-edge AI research areas and contribute to advancing the state of the art.",
      timeCommitment: "12+ months",
      skills: ["Advanced Algorithms", "Research Methods", "Paper Publishing", "Innovation"],
      color: "border-teal-500"
    }
  ];

  // Curriculum categories
  const curriculumCategories = [
    {
      title: "AI Fundamentals",
      description: "Core concepts and principles of artificial intelligence",
      icon: Brain,
      courses: ["Introduction to AI", "History of AI", "AI Ethics & Responsibility", "AI Applications Survey"]
    },
    {
      title: "Machine Learning",
      description: "Algorithms that allow computers to learn from data",
      icon: LineChart,
      courses: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Feature Engineering"]
    },
    {
      title: "Deep Learning",
      description: "Neural network architectures and applications",
      icon: Code,
      courses: ["Neural Networks Fundamentals", "CNNs", "RNNs & LSTMs", "Transformers & Attention"]
    },
    {
      title: "Natural Language Processing",
      description: "Teaching computers to understand human language",
      icon: Book,
      courses: ["Text Processing", "Language Models", "Sentiment Analysis", "Machine Translation"]
    }
  ];

  // FAQ data
  const faqItems = [
    {
      question: "Do I need programming experience to learn AI?",
      answer: "While some programming knowledge (particularly Python) is helpful for certain paths, we offer beginner courses that start with no assumptions about programming experience. Our 'AI for Beginners' and 'AI for Business Professionals' tracks require minimal coding experience."
    },
    {
      question: "How long does it take to become proficient in AI?",
      answer: "The timeline varies based on your background and goals. Our structured paths range from 2-12 months, with most students seeing meaningful results within 3-4 months of consistent study. Many students are able to apply AI concepts to their work within weeks of starting."
    },
    {
      question: "What makes your AI courses different from others?",
      answer: "Our courses combine theoretical knowledge with practical, hands-on projects using real-world datasets. We emphasize applied learning, provide mentorship from industry experts, and offer career support. Our completion rates are 85% higher than industry averages."
    },
    {
      question: "Are there any prerequisites for the advanced courses?",
      answer: "Advanced courses typically require foundational knowledge in mathematics (statistics, linear algebra, calculus), programming (particularly Python), and basic machine learning concepts. We provide assessment tools to help you determine if you're ready."
    },
    {
      question: "Do you offer certifications for completed courses?",
      answer: "Yes, all our courses include industry-recognized certifications upon successful completion. Our certifications are valued by employers and can be directly shared to your LinkedIn profile. Many students report a 27% salary increase within one year of certification."
    }
  ];

  return (
    <>
      <Helmet>
        <title>AI Education Hub | Comprehensive AI Learning Resources</title>
        <meta name="description" content="Master artificial intelligence through comprehensive courses, learning paths, and educational resources designed for all skill levels. Advance your career with in-demand AI skills." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "AI Education Hub",
              "url": "https://neuralnextgen.com/ai-courses",
              "description": "Comprehensive AI education resources including courses, guides, and handbooks.",
              "offers": {
                "@type": "Offer",
                "category": "Educational Courses",
                "availability": "https://schema.org/InStock"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "AI Courses Catalog",
                "itemListElement": [
                  {
                    "@type": "Course",
                    "name": "AI Fundamentals",
                    "description": "Introduction to artificial intelligence concepts and applications",
                    "provider": {
                      "@type": "Organization",
                      "name": "AI Education Hub"
                    }
                  }
                ]
              }
            }
          `}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="py-16 md:py-24 px-4 relative overflow-hidden">
            <div className="absolute top-20 right-0 w-96 h-96 bg-blue-300/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-20 left-0 w-96 h-96 bg-purple-300/10 rounded-full filter blur-3xl"></div>
            
            <div className="container mx-auto max-w-6xl relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="animate-fade-in">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-aiblue mb-6 leading-tight">
                    Master AI Skills That Matter
                  </h1>
                  <p className="text-xl text-gray-600 mb-8">
                    Comprehensive, structured learning paths for every skill level. Build practical AI skills with 
                    expert-led courses, hands-on projects, and industry-relevant curriculum.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button size="lg" className="bg-gradient-to-r from-aiblue to-aipurple text-white">
                      Explore Curriculum
                    </Button>
                    <Button variant="outline" size="lg" className="border-aiblue text-aiblue">
                      Download Free AI Handbook
                    </Button>
                  </div>
                  
                  <div className="mt-8 flex items-center">
                    <div className="flex -space-x-2 mr-4">
                      <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop&crop=faces" alt="Student avatar" className="w-8 h-8 rounded-full border-2 border-white"/>
                      <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=faces" alt="Student avatar" className="w-8 h-8 rounded-full border-2 border-white"/>
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=faces" alt="Student avatar" className="w-8 h-8 rounded-full border-2 border-white"/>
                    </div>
                    <p className="text-sm text-gray-600">
                      Joined by <span className="font-semibold text-aiblue">25,000+</span> AI learners worldwide
                    </p>
                  </div>
                </div>
                
                <div className="relative animate-fade-in" style={{animationDelay: '0.3s'}}>
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80" 
                    alt="Student learning AI concepts on laptop" 
                    className="w-full rounded-xl shadow-xl"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg w-64">
                    <div className="flex items-center mb-2">
                      <BadgeCheck className="h-5 w-5 text-green-500 mr-2" />
                      <h4 className="font-medium text-sm">Learning Outcomes</h4>
                    </div>
                    <p className="text-xs text-gray-500">85% of our graduates report applying AI skills directly in their workplace within 3 months</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AI Curriculum Overview Section */}
          <section className="py-16 bg-gradient-to-br from-aiblue/5 to-aipurple/5">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive AI Curriculum</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our structured learning approach takes you from foundational concepts to advanced applications,
                  with clear progression paths based on your goals and experience level.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                {curriculumCategories.map((category, index) => (
                  <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-aiblue/10 to-aipurple/10 flex items-center justify-center mb-4">
                        <category.icon className="h-6 w-6 text-aiblue" />
                      </div>
                      <CardTitle>{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.courses.map((course, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{course}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View Courses
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center bg-white px-4 py-2 rounded-full text-sm shadow mb-8">
                  <BadgeCheck className="h-4 w-4 text-green-500 mr-2" />
                  <span>All courses include hands-on projects and industry-recognized certifications</span>
                </div>
                <Button size="lg" className="bg-gradient-to-r from-aiblue to-aipurple text-white">
                  View Full Curriculum
                </Button>
              </div>
            </div>
          </section>

          {/* Learning Resources Section */}
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">AI Learning Resources</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Access a comprehensive library of educational materials designed to supplement
                  your learning journey and provide practical reference guides.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Book className="w-16 h-16 text-white/80" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">AI Handbooks & Guides</h3>
                    <p className="text-gray-600 mb-4">
                      Comprehensive reference materials covering AI concepts, techniques, and applications.
                      Perfect for both beginners and practitioners.
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm">20+ guides</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-aiblue mr-2" />
                        <span className="text-sm">45K+ downloads</span>
                      </div>
                    </div>
                    <Button className="w-full">Access Library</Button>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-500 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Code className="w-16 h-16 text-white/80" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Code Repositories & Projects</h3>
                    <p className="text-gray-600 mb-4">
                      Hands-on projects with source code and step-by-step tutorials to build
                      practical AI applications and models.
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm">50+ projects</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-aiblue mr-2" />
                        <span className="text-sm">12K+ contributors</span>
                      </div>
                    </div>
                    <Button className="w-full">Explore Projects</Button>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-green-500 to-teal-500 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BarChart className="w-16 h-16 text-white/80" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Research Papers & Case Studies</h3>
                    <p className="text-gray-600 mb-4">
                      Curated collection of influential AI research papers and real-world case studies with
                      analysis and implementation guidance.
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm">100+ papers</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-aiblue mr-2" />
                        <span className="text-sm">30+ case studies</span>
                      </div>
                    </div>
                    <Button className="w-full">Access Collection</Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-6">Popular Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start bg-gray-50 p-4 rounded-lg">
                    <div className="bg-blue-100 p-2 rounded mr-4">
                      <Book className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-medium">The Complete AI Ethics Handbook</h4>
                      <p className="text-sm text-gray-600 mt-1">Comprehensive guide to ethical AI development and implementation</p>
                      <div className="flex items-center mt-2">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">23k+ downloads</span>
                        <Button variant="link" size="sm" className="text-aiblue p-0 h-auto ml-2">Download</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start bg-gray-50 p-4 rounded-lg">
                    <div className="bg-purple-100 p-2 rounded mr-4">
                      <Code className="h-5 w-5 text-purple-700" />
                    </div>
                    <div>
                      <h4 className="font-medium">Python for Machine Learning Cheat Sheet</h4>
                      <p className="text-sm text-gray-600 mt-1">Essential Python functions and libraries for ML development</p>
                      <div className="flex items-center mt-2">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">18k+ downloads</span>
                        <Button variant="link" size="sm" className="text-aiblue p-0 h-auto ml-2">Download</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start bg-gray-50 p-4 rounded-lg">
                    <div className="bg-green-100 p-2 rounded mr-4">
                      <BarChart className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <h4 className="font-medium">AI Implementation Roadmap Template</h4>
                      <p className="text-sm text-gray-600 mt-1">Strategic planning document for AI project implementation</p>
                      <div className="flex items-center mt-2">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">15k+ downloads</span>
                        <Button variant="link" size="sm" className="text-aiblue p-0 h-auto ml-2">Download</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start bg-gray-50 p-4 rounded-lg">
                    <div className="bg-orange-100 p-2 rounded mr-4">
                      <Briefcase className="h-5 w-5 text-orange-700" />
                    </div>
                    <div>
                      <h4 className="font-medium">AI Career Paths Guide</h4>
                      <p className="text-sm text-gray-600 mt-1">Comprehensive overview of AI career options and requirements</p>
                      <div className="flex items-center mt-2">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">12k+ downloads</span>
                        <Button variant="link" size="sm" className="text-aiblue p-0 h-auto ml-2">Download</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AI Learning Paths Section */}
          <section className="py-16 bg-gradient-to-br from-aiblue/5 to-aipurple/5">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">AI Learning Paths</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Structured educational journeys designed for specific career goals and starting points.
                  Follow a clear progression from fundamentals to mastery.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {learningPaths.map((path, index) => (
                  <LearningPath key={index} {...path} />
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <Button variant="outline" size="lg" className="border-aiblue text-aiblue">
                  Take Skills Assessment <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </section>

          {/* Why Learn AI Section */}
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Learn AI Now</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Artificial intelligence is transforming industries and creating unprecedented career opportunities.
                  Developing AI skills today positions you at the forefront of the technological revolution.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-aiblue">The Rising Demand for AI Skills</h3>
                  
                  <div className="grid grid-cols-2 gap-8 mb-8">
                    {aiStats.map((stat, index) => (
                      <div key={index} className="text-center bg-white p-6 rounded-xl shadow-lg">
                        <div className="text-3xl md:text-4xl font-bold text-aiblue mb-2">{stat.value}</div>
                        <div className="text-sm text-gray-500">{stat.label}</div>
                        <div className="text-xs text-gray-500 mt-2">{stat.subtext}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 h-12 w-12 bg-aiblue/10 rounded-lg flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-aiblue" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Career Acceleration</h4>
                        <p className="text-gray-600">Professionals with AI certifications report an average 27% salary increase within one year</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 h-12 w-12 bg-aipurple/10 rounded-lg flex items-center justify-center">
                        <Building className="h-6 w-6 text-aipurple" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Industry Transformation</h4>
                        <p className="text-gray-600">83% of companies claim that AI is a top priority in their business plans</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 h-12 w-12 bg-aiteal/10 rounded-lg flex items-center justify-center">
                        <Zap className="h-6 w-6 text-aiteal" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Innovation Potential</h4>
                        <p className="text-gray-600">AI-skilled professionals are 3.5x more likely to drive innovation initiatives in their organizations</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold mb-6 text-center">AI Skills in High Demand</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Machine Learning</span>
                        <span className="text-sm font-semibold text-aiblue">92%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-aiblue h-full" style={{width: '92%'}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Deep Learning</span>
                        <span className="text-sm font-semibold text-aipurple">87%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-aipurple h-full" style={{width: '87%'}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Natural Language Processing</span>
                        <span className="text-sm font-semibold text-aiteal">83%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-aiteal h-full" style={{width: '83%'}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Computer Vision</span>
                        <span className="text-sm font-semibold text-orange-500">78%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-orange-500 h-full" style={{width: '78%'}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">AI Ethics & Governance</span>
                        <span className="text-sm font-semibold text-red-500">72%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full" style={{width: '72%'}}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Average Salary Range</span>
                      <span className="text-sm font-semibold text-aiblue">$110k - $180k</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Based on industry data for professionals with AI certifications and 2+ years of experience</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-aiblue to-aipurple text-white rounded-xl p-8 shadow-lg">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-6 md:mb-0 md:mr-8">
                    <h3 className="text-2xl font-bold mb-2">Ready to advance your AI skills?</h3>
                    <p className="text-white/80">Join 25,000+ professionals who have accelerated their careers with our AI education programs.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="bg-white text-aiblue hover:bg-gray-100" size="lg">
                      Explore Courses
                    </Button>
                    <Button variant="outline" className="text-white border-white hover:bg-white/10" size="lg">
                      Take Free Assessment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Social Proof Section */}
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Hear from professionals who have transformed their careers through our AI education programs.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100" 
                        alt="Testimonial author" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">Michael Chen</h4>
                      <p className="text-sm text-gray-600">Data Scientist, TechFuture Inc.</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic mb-4">
                    "The AI for Data Scientists path completely transformed my career. Within 6 months of completion,
                    I was leading AI initiatives at my company and secured a 35% salary increase."
                  </p>
                  <div className="flex text-yellow-400">
                    <Star className="w-5 h-5 fill-yellow-400" />
                    <Star className="w-5 h-5 fill-yellow-400" />
                    <Star className="w-5 h-5 fill-yellow-400" />
                    <Star className="w-5 h-5 fill-yellow-400" />
                    <Star className="w-5 h-5 fill-yellow-400" />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100" 
                        alt="Testimonial author" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">Sarah Johnson</h4>
                      <p className="text-sm text-gray-600">Product Manager, GrowFast</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic mb-4">
                    "As a non-technical professional, I was hesitant about learning AI. The Business Professionals
                    track was perfect—practical, accessible, and immediately applicable to my work."
                  </p>
                  <div className="flex text-yellow-400">
                    <Star className="w-5 h-5 fill-yellow-400" />
                    <Star className="w-5 h-5 fill-yellow-400" />
                    <Star className="w-5 h-5 fill-yellow-400" />
                    <Star className="w-5 h-5 fill-yellow-400" />
                    <Star className="w-5 h-5" />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100" 
                        alt="Testimonial author" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">David Patel</h4>
                      <p className="text-sm text-gray-600">Software Engineer, CodeX Solutions</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic mb-4">
                    "The practical projects and code repositories were invaluable. I built a portfolio of AI
                    applications that impressed interviewers and landed my dream job in AI development."
                  </p>
                  <div className="flex text-yellow-400">
                    <Star className="w-5 h-5 fill-yellow-400" />
                    <Star className="w-5 h-5 fill-yellow-400" />
                    <Star className="w-5 h-5 fill-yellow-400" />
                    <Star className="w-5 h-5 fill-yellow-400" />
                    <Star className="w-5 h-5 fill-yellow-400" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-6 text-center">Trusted by Organizations Worldwide</h3>
                <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
                  <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
                    <Building className="w-8 h-8 text-gray-500" />
                  </div>
                  <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
                    <Code className="w-8 h-8 text-gray-500" />
                  </div>
                  <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
                    <Brain className="w-8 h-8 text-gray-500" />
                  </div>
                  <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
                    <Briefcase className="w-8 h-8 text-gray-500" />
                  </div>
                  <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
                    <Award className="w-8 h-8 text-gray-500" />
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center mt-8 gap-x-12 gap-y-4 text-center text-gray-600">
                  <div>
                    <div className="text-2xl font-bold text-aiblue">50,000+</div>
                    <div className="text-sm">Students Trained</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-aipurple">85%</div>
                    <div className="text-sm">Course Completion Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-aiteal">92%</div>
                    <div className="text-sm">Student Satisfaction</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-500">27%</div>
                    <div className="text-sm">Avg. Salary Increase</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 bg-gradient-to-br from-aiblue/5 to-aipurple/5">
            <div className="container mx-auto max-w-4xl px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Find answers to the most common questions about our AI education offerings.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg">
                {faqItems.map((item, index) => (
                  <FAQItem key={index} question={item.question} answer={item.answer} />
                ))}
                
                <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                  <p className="mb-4 text-gray-600">Still have questions? We're here to help.</p>
                  <Button variant="outline" className="border-aiblue text-aiblue">
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="py-16 px-4 bg-gradient-to-br from-aiblue via-aipurple to-blue-600 text-white">
            <div className="container mx-auto max-w-4xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your AI Journey Today</h2>
                <p className="text-xl opacity-90 max-w-3xl mx-auto">
                  Join our community of AI learners and practitioners. Gain the skills that will
                  shape the future and advance your career in the age of artificial intelligence.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
                <Button size="lg" variant="secondary" className="flex-1">
                  Browse Curriculum
                </Button>
                <Button size="lg" className="flex-1 bg-white text-aiblue hover:bg-gray-100">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="flex-1 text-white border-white hover:bg-white/10">
                  Download Resources
                </Button>
              </div>
              
              <p className="text-center text-sm opacity-80 mt-6">
                Join 25,000+ professionals who are already advancing their careers with AI skills.
                Start learning at your own pace today.
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
