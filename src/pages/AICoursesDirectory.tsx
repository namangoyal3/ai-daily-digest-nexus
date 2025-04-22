
import { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Search, Filter, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const courses = [
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    instructor: "Dr. Sarah Chen",
    level: "Beginner",
    duration: "6 weeks",
    price: "$49.99",
    rating: 4.8,
    students: 3245,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    description: "Learn the fundamentals of artificial intelligence and machine learning in this comprehensive beginner course."
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering Masterclass",
    instructor: "James Wilson",
    level: "Intermediate",
    duration: "4 weeks",
    price: "$79.99",
    rating: 4.9,
    students: 2189,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    description: "Master the art of prompt engineering for ChatGPT, MidJourney, DALL-E and other AI models."
  },
  {
    id: "nlp-deep-dive",
    title: "Natural Language Processing Deep Dive",
    instructor: "Dr. Michael Rodriguez",
    level: "Advanced",
    duration: "8 weeks",
    price: "$129.99",
    rating: 4.7,
    students: 1456,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    description: "An advanced course on natural language processing covering transformers, BERT, GPT and more."
  },
  {
    id: "computer-vision",
    title: "Computer Vision with Python",
    instructor: "Emma Davis",
    level: "Intermediate",
    duration: "6 weeks",
    price: "$89.99",
    rating: 4.6,
    students: 1872,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    description: "Learn to build computer vision applications using Python, OpenCV, and deep learning techniques."
  },
  {
    id: "ai-ethics",
    title: "AI Ethics and Responsible AI",
    instructor: "Prof. Amara Johnson",
    level: "All Levels",
    duration: "4 weeks",
    price: "$59.99",
    rating: 4.9,
    students: 2543,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    description: "Understand the ethical implications of AI and learn frameworks for responsible AI development."
  },
  {
    id: "deep-learning",
    title: "Deep Learning Specialization",
    instructor: "Prof. Alex Nguyen",
    level: "Advanced",
    duration: "12 weeks",
    price: "$199.99",
    rating: 4.8,
    students: 3210,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    description: "Master deep learning from the fundamentals to advanced topics like GANs, reinforcement learning, and more."
  }
];

export default function AICoursesDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState("All Levels");

  const filters = ["All Levels", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter === "All Levels" || course.level === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search Results",
      description: `Found ${filteredCourses.length} courses matching "${searchTerm}"`,
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      <Helmet>
        <title>AI Courses Directory | Learn AI Skills Online</title>
        <meta name="description" content="Browse our curated collection of AI courses covering everything from basics to advanced topics. Learn machine learning, NLP, computer vision and more." />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-aiblue mb-6">AI Courses Directory</h1>
          <p className="text-lg text-gray-600">Discover top-rated courses to enhance your AI skills and advance your career</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search courses by name, instructor, or topic..." 
                className="pl-10 pr-4 py-3 w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-aiblue focus:border-transparent bg-white shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  type="button"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button type="submit">Search Courses</Button>
          </form>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {filters.map((filter) => (
              <Button 
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"} 
                className={`rounded-full ${activeFilter === filter ? "bg-aiblue" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredCourses.map((course) => (
            <motion.div key={course.id} variants={itemVariants}>
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <CardDescription>by {course.instructor}</CardDescription>
                    </div>
                    <span className="bg-aiblue text-white text-xs font-bold px-2 py-1 rounded-full">
                      {course.level}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600">{course.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                      <span className="font-bold text-lg text-aiblue">{course.price}</span>
                    </div>
                    <div className="text-sm text-gray-500">{course.duration}</div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full bg-gradient-to-r from-aiblue to-aipurple" onClick={() => {
                    toast({
                      title: "Course Selected",
                      description: `You selected "${course.title}" course`,
                    });
                  }}>
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
