
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Users, Award, Star, CheckCircle, BookOpen, Play } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { useState } from "react";

// Sample course data (in a real app, this would come from an API)
const courseData = {
  id: "machine-learning-basics",
  title: "Machine Learning Fundamentals",
  description: "Build a solid foundation in machine learning concepts and practical applications with hands-on projects and real-world examples.",
  longDescription: "This comprehensive course takes you from the basics of Machine Learning to implementing advanced algorithms. Through hands-on projects, you'll learn to preprocess data, select appropriate algorithms, train models, and evaluate results. By the end of the course, you'll have built a portfolio of ML projects and gained the skills to apply machine learning techniques to real-world problems.",
  instructor: "Dr. Sarah Johnson",
  instructorRole: "AI Research Lead",
  instructorBio: "Dr. Sarah Johnson has over 15 years of experience in machine learning research and application. Previously a lead researcher at DeepMind, she now focuses on making AI education accessible to everyone.",
  instructorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
  level: "Intermediate",
  duration: "12 weeks",
  hours: 36,
  lessons: 48,
  rating: 4.8,
  students: 12500,
  image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
  price: 129.99,
  category: "Machine Learning",
  featured: true,
  chapters: [
    {
      title: "Introduction to Machine Learning",
      lessons: [
        { title: "What is Machine Learning?", duration: "15:20" },
        { title: "Types of Machine Learning", duration: "22:45" },
        { title: "Machine Learning Workflow", duration: "18:30" }
      ]
    },
    {
      title: "Data Preprocessing",
      lessons: [
        { title: "Data Cleaning Techniques", duration: "24:15" },
        { title: "Feature Extraction", duration: "28:40" },
        { title: "Data Normalization", duration: "19:55" }
      ]
    },
    {
      title: "Supervised Learning Algorithms",
      lessons: [
        { title: "Linear Regression", duration: "32:10" },
        { title: "Decision Trees", duration: "26:30" },
        { title: "Support Vector Machines", duration: "29:45" }
      ]
    },
    {
      title: "Unsupervised Learning",
      lessons: [
        { title: "Clustering Methods", duration: "25:20" },
        { title: "Dimensionality Reduction", duration: "30:45" },
        { title: "Principal Component Analysis", duration: "27:15" }
      ]
    }
  ]
};

export default function CourseDetail() {
  const { courseId } = useParams();
  const { toast } = useToast();
  const [enrolled, setEnrolled] = useState(false);
  
  // In a real app, you would fetch the course data based on courseId
  const course = courseData;
  
  const handleEnroll = () => {
    toast({
      title: "Enrollment Successful!",
      description: `You're now enrolled in ${course.title}`,
      variant: "default",
    });
    setEnrolled(true);
  };
  
  return (
    <>
      <Helmet>
        <title>{course.title} | NeuralNextGen AI Courses</title>
        <meta name="description" content={course.description} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-white via-neural/5 to-luminous/5">
        <Header />
        
        <main className="pt-8 pb-16">
          {/* Hero Section */}
          <section className="container mx-auto px-4 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-neural mb-4">{course.title}</h1>
                <p className="text-lg text-gray-600 mb-6">{course.description}</p>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-neural mr-2" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-luminous mr-2" />
                    <span>{course.lessons} lessons</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-teal mr-2" />
                    <span>{course.level}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gold mr-2" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                </div>
                
                <div className="mb-6 flex items-center">
                  <div className="flex mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`h-5 w-5 ${star <= Math.floor(course.rating) ? 'text-gold fill-gold' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold mr-2">{course.rating}</span>
                  <span className="text-gray-600">({course.students} reviews)</span>
                </div>
                
                <div className="flex items-center mb-8">
                  <img 
                    src={course.instructorAvatar} 
                    alt={course.instructor} 
                    className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-white shadow-md" 
                  />
                  <div>
                    <p className="font-medium text-neural">{course.instructor}</p>
                    <p className="text-sm text-gray-600">{course.instructorRole}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="neural-card neural-card-hover overflow-hidden sticky top-20">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full aspect-video object-cover" 
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-3xl font-bold">${course.price}</span>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-neural mr-2" />
                        <span className="text-sm">{course.hours} hours</span>
                      </div>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        className="w-full py-6 mb-4 bg-gradient-to-r from-neural to-luminous hover:from-neural-dark hover:to-luminous-dark text-lg"
                        onClick={handleEnroll}
                        disabled={enrolled}
                      >
                        {enrolled ? "Already Enrolled" : "Enroll Now"}
                      </Button>
                    </motion.div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Full lifetime access</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Access on mobile and desktop</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Certificate of completion</span>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">30-day money-back guarantee</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Course Content Tabs */}
          <section className="container mx-auto px-4">
            <Tabs defaultValue="overview" className="w-full lg:w-2/3">
              <TabsList className="w-full grid grid-cols-3 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="neural-card p-6">
                <h2 className="text-2xl font-heading font-bold text-neural mb-4">About This Course</h2>
                <p className="text-gray-700 mb-6">{course.longDescription}</p>
                
                <h3 className="text-xl font-heading font-bold text-neural mb-3">What You'll Learn</h3>
                <div className="grid md:grid-cols-2 gap-3 mb-6">
                  {[
                    "Understand machine learning fundamentals",
                    "Preprocess and clean data effectively",
                    "Implement supervised learning algorithms",
                    "Build and evaluate machine learning models",
                    "Apply ML to real-world problems",
                    "Create a portfolio of ML projects",
                    "Optimize model performance",
                    "Interpret model results"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                
                <h3 className="text-xl font-heading font-bold text-neural mb-3">Requirements</h3>
                <ul className="list-disc pl-5 space-y-2 mb-6">
                  <li>Basic understanding of Python programming</li>
                  <li>Familiarity with fundamental statistics concepts</li>
                  <li>No prior machine learning experience required</li>
                </ul>
                
                <h3 className="text-xl font-heading font-bold text-neural mb-3">Who This Course Is For</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Software developers looking to add ML to their skillset</li>
                  <li>Data analysts wanting to move into machine learning</li>
                  <li>Students with programming experience interested in AI</li>
                  <li>Professionals seeking to apply ML in their field</li>
                </ul>
              </TabsContent>
              
              <TabsContent value="curriculum" className="neural-card p-6">
                <h2 className="text-2xl font-heading font-bold text-neural mb-4">Course Content</h2>
                <div className="text-sm text-gray-600 mb-6">
                  <span className="font-medium">{course.chapters.length} chapters</span> • <span className="font-medium">{course.lessons} lessons</span> • <span className="font-medium">Total {course.hours} hours</span>
                </div>
                
                <div className="space-y-4">
                  {course.chapters.map((chapter, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-4 flex justify-between items-center">
                        <h3 className="font-medium">{index + 1}. {chapter.title}</h3>
                        <span className="text-sm text-gray-600">{chapter.lessons.length} lessons</span>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {chapter.lessons.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className="flex justify-between items-center p-4 hover:bg-gray-50">
                            <div className="flex items-center">
                              <Play className="h-4 w-4 text-neural mr-3" />
                              <span>{lesson.title}</span>
                            </div>
                            <span className="text-sm text-gray-500">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="instructor" className="neural-card p-6">
                <div className="flex items-center mb-6">
                  <img 
                    src={course.instructorAvatar} 
                    alt={course.instructor} 
                    className="w-20 h-20 rounded-full mr-6 object-cover border-2 border-white shadow-md" 
                  />
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-neural">{course.instructor}</h2>
                    <p className="text-gray-600">{course.instructorRole}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6 text-center text-sm">
                  <div className="bg-neural/5 p-3 rounded-lg">
                    <p className="font-bold text-lg text-neural">15+</p>
                    <p>Years Experience</p>
                  </div>
                  <div className="bg-luminous/5 p-3 rounded-lg">
                    <p className="font-bold text-lg text-luminous">48k+</p>
                    <p>Students</p>
                  </div>
                  <div className="bg-teal/5 p-3 rounded-lg">
                    <p className="font-bold text-lg text-teal">12</p>
                    <p>Courses</p>
                  </div>
                  <div className="bg-gold/5 p-3 rounded-lg">
                    <p className="font-bold text-lg text-neural">4.9</p>
                    <p>Average Rating</p>
                  </div>
                </div>
                
                <p className="text-gray-700">{course.instructorBio}</p>
              </TabsContent>
            </Tabs>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
