
import { Helmet } from "react-helmet";
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
  // State for filter sidebar
  const [filterOpen, setFilterOpen] = useState(false);
  // State for active filter
  const [activeSort, setActiveSort] = useState("Most Popular");

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

  // Course filter categories
  const filterCategories = [
    { 
      title: "Skill Level", 
      options: ["Beginner", "Intermediate", "Advanced", "All Levels"] 
    },
    { 
      title: "Duration", 
      options: ["0-2 hours", "2-6 hours", "6-12 hours", "12+ hours"] 
    },
    { 
      title: "Rating", 
      options: ["4.5 & up", "4.0 & up", "3.5 & up", "3.0 & up"] 
    },
    { 
      title: "Price", 
      options: ["Free", "Paid", "$10-$50", "$50-$100", "$100+"] 
    },
    { 
      title: "Features", 
      options: ["With Certificate", "With Hands-on Projects", "With Downloadable Resources"] 
    },
  ];

  // Sample course data
  const courses = [
    {
      title: "Machine Learning A-Z: Hands-On Python & R In Data Science",
      instructor: "Dr. Angela Smith",
      rating: 4.7,
      students: 452380,
      skillLevel: "Intermediate",
      duration: "42 hours",
      price: "$29.99",
      originalPrice: "$149.99",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
      bestseller: true
    },
    {
      title: "Python for Data Science and Machine Learning Bootcamp",
      instructor: "Jose Portilla",
      rating: 4.6,
      students: 356209,
      skillLevel: "All Levels",
      duration: "38 hours",
      price: "$19.99",
      originalPrice: "$129.99",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Deep Learning A-Z: Hands-On Artificial Neural Networks",
      instructor: "Kirill Eremenko",
      rating: 4.5,
      students: 184532,
      skillLevel: "Advanced",
      duration: "35 hours",
      price: "$34.99",
      originalPrice: "$149.99",
      image: "https://images.unsplash.com/photo-1558402529-d2638a7023e9?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Natural Language Processing with PyTorch",
      instructor: "David Williams",
      rating: 4.8,
      students: 87920,
      skillLevel: "Intermediate",
      duration: "28 hours",
      price: "$24.99",
      originalPrice: "$139.99",
      image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=600&q=80",
      isNew: true
    },
    {
      title: "Computer Vision & OpenCV for Beginners",
      instructor: "Sarah Johnson",
      rating: 4.4,
      students: 65480,
      skillLevel: "Beginner",
      duration: "18 hours",
      price: "$19.99",
      originalPrice: "$99.99",
      image: "https://images.unsplash.com/photo-1563170423-ea33dcfb57f7?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "AI Ethics and Governance",
      instructor: "Michael Thompson",
      rating: 4.9,
      students: 32145,
      skillLevel: "All Levels",
      duration: "15 hours",
      price: "$22.99",
      originalPrice: "$119.99",
      image: "https://images.unsplash.com/photo-1507668339897-8a035aa9527d?auto=format&fit=crop&w=600&q=80",
      bestseller: true
    },
    {
      title: "Reinforcement Learning: Hands-On Python",
      instructor: "Li Wei",
      rating: 4.6,
      students: 41830,
      skillLevel: "Advanced",
      duration: "32 hours",
      price: "$29.99",
      originalPrice: "$149.99",
      image: "https://images.unsplash.com/photo-1516397281156-ca07cf9746fc?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Introduction to AI for Business Leaders",
      instructor: "Jessica Brown",
      rating: 4.7,
      students: 54260,
      skillLevel: "Beginner",
      duration: "12 hours",
      price: "$17.99",
      originalPrice: "$89.99",
      image: "https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=600&q=80",
      isNew: true
    }
  ];

  // Featured new courses
  const newCourses = [
    {
      title: "Large Language Models: From Theory to Application",
      instructor: "Dr. Alan Johnson",
      rating: 4.9,
      students: 12450,
      skillLevel: "Intermediate",
      duration: "24 hours",
      price: "$34.99",
      originalPrice: "$159.99",
      image: "https://images.unsplash.com/photo-1625014618611-fb102327bbc4?auto=format&fit=crop&w=600&q=80",
      isNew: true
    },
    {
      title: "Generative AI: Creating Art with DALL-E and Stable Diffusion",
      instructor: "Maria Garcia",
      rating: 4.8,
      students: 8760,
      skillLevel: "All Levels",
      duration: "18 hours",
      price: "$24.99",
      originalPrice: "$129.99",
      image: "https://images.unsplash.com/photo-1692607431259-7b6c595c27e7?auto=format&fit=crop&w=600&q=80",
      isNew: true
    },
    {
      title: "AI Agents and Autonomous Systems",
      instructor: "Robert Chen",
      rating: 4.7,
      students: 6520,
      skillLevel: "Advanced",
      duration: "28 hours",
      price: "$29.99",
      originalPrice: "$149.99",
      image: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&w=600&q=80",
      isNew: true
    },
    {
      title: "Practical Machine Learning Engineering",
      instructor: "Emily Watson",
      rating: 4.9,
      students: 9840,
      skillLevel: "Intermediate",
      duration: "32 hours",
      price: "$27.99",
      originalPrice: "$139.99",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80",
      isNew: true
    }
  ];

  // Free courses
  const freeCourses = [
    {
      title: "Introduction to AI: Fundamentals and Applications",
      instructor: "David Miller",
      rating: 4.5,
      students: 125680,
      skillLevel: "Beginner",
      duration: "6 hours",
      price: "Free",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Python Basics for AI and Machine Learning",
      instructor: "Jennifer Lee",
      rating: 4.6,
      students: 98740,
      skillLevel: "Beginner",
      duration: "8 hours",
      price: "Free",
      image: "https://images.unsplash.com/photo-1649180556628-9ba704115795?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Introduction to Data Science with Pandas",
      instructor: "Carlos Rodriguez",
      rating: 4.4,
      students: 76590,
      skillLevel: "Beginner",
      duration: "5 hours",
      price: "Free",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "AI Ethics: Understanding Responsible AI",
      instructor: "Sarah Thompson",
      rating: 4.7,
      students: 42380,
      skillLevel: "All Levels",
      duration: "4 hours",
      price: "Free",
      image: "https://images.unsplash.com/photo-1591696331111-ef9586a5b17a?auto=format&fit=crop&w=600&q=80"
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

  // Sort options
  const sortOptions = ["Most Popular", "Highest Rated", "Newest", "Price: Low to High", "Price: High to Low"];

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

          {/* Course Explorer Section */}
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore AI Courses</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Find the perfect AI course to advance your skills and career, from beginner tutorials to advanced specializations.
                </p>
              </div>

              {/* Search and Filter Bar */}
              <div className="bg-white rounded-xl shadow-md mb-8">
                <div className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Search for AI courses, topics, or skills..." 
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-aiblue focus:border-aiblue"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2"
                      onClick={() => setFilterOpen(!filterOpen)}
                    >
                      <Filter className="h-4 w-4" />
                      <span className="hidden sm:inline">Filters</span>
                    </Button>
                    
                    <div className="relative w-full md:w-auto">
                      <select 
                        className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:ring-aiblue focus:border-aiblue w-full"
                        value={activeSort}
                        onChange={(e) => setActiveSort(e.target.value)}
                      >
                        {sortOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content Grid with Sidebar */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filter Sidebar - Only visible on larger screens or when toggled */}
                <div className={`lg:block ${filterOpen ? 'block' : 'hidden'} bg-white p-6 rounded-xl shadow-md h-fit`}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg flex items-center">
                      <SlidersHorizontal className="h-5 w-5 mr-2" />
                      Filters
                    </h3>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      Clear All
                    </Button>
                  </div>
                  
                  {filterCategories.map((category, index) => (
                    <FilterCategory 
                      key={index}
                      title={category.title}
                      options={category.options}
                      expanded={index === 0} // Expand first category by default
                    />
                  ))}

                  <div className="mt-6">
                    <Button className="w-full bg-aiblue hover:bg-aiblue-dark">
                      Apply Filters
                    </Button>
                  </div>
                </div>
                
                {/* Courses Grid */}
                <div className="lg:col-span-3">
                  {/* Featured Course Carousel */}
                  <div className="mb-12">
                    <h3 className="text-2xl font-bold mb-6">Featured Courses</h3>
                    <Carousel className="w-full">
                      <CarouselContent>
                        {[...courses.slice(0, 4)].map((course, index) => (
                          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <CourseCard {...course} />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <div className="hidden md:block">
                        <CarouselPrevious />
                        <CarouselNext />
                      </div>
                    </Carousel>
                  </div>
                  
                  {/* New & Noteworthy Courses */}
                  <div className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold flex items-center">
                        <Tags className="h-5 w-5 mr-2 text-green-500" />
                        New & Noteworthy
                      </h3>
                      <Button variant="link" className="text-aiblue">
                        View All <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {newCourses.slice(0, 3).map((course, index) => (
                        <CourseCard key={index} {...course} />
                      ))}
                    </div>
                  </div>

                  {/* Free Getting Started Courses */}
                  <div className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-orange-500" />
                        Free Courses to Get Started
                      </h3>
                      <Button variant="link" className="text-aiblue">
                        View All <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {freeCourses.slice(0, 3).map((course, index) => (
                        <CourseCard key={index} {...course} />
                      ))}
                    </div>
                  </div>
                  
                  {/* All Courses */}
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold">All Courses</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {courses.map((course, index) => (
                        <CourseCard key={index} {...course} />
                      ))}
                    </div>
                    <div className="mt-8 text-center">
                      <Button variant="outline" size="lg">
                        Load More Courses
                      </Button>
                    </div>
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
