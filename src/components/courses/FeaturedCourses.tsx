
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CourseCard } from "./CourseCard";
import { motion } from "framer-motion";

// Sample course data (in a real app, this would come from an API)
const courses = [
  {
    id: "machine-learning-basics",
    title: "Machine Learning Fundamentals",
    description: "Master the fundamentals of machine learning from theory to practical implementation across various domains.",
    instructor: "Dr. Sarah Johnson",
    instructorRole: "AI Research Lead",
    instructorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
    level: "Intermediate" as const,
    duration: "12 weeks",
    rating: 4.8,
    students: 12500,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
    price: 129.99,
    category: "Machine Learning",
    featured: true
  },
  {
    id: "deep-learning-specialization",
    title: "Deep Learning Specialization",
    description: "Dive into neural networks architecture, optimization algorithms, and applied deep learning projects.",
    instructor: "Prof. Mark Chen",
    instructorRole: "Deep Learning Engineer",
    instructorAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=faces",
    level: "Advanced" as const,
    duration: "16 weeks",
    rating: 4.9,
    students: 8750,
    image: "https://images.unsplash.com/photo-1655721530791-618daf2d25f1?w=800&h=400&fit=crop",
    price: 199.99,
    category: "Deep Learning"
  },
  {
    id: "ai-ethics",
    title: "AI Ethics & Responsibility",
    description: "Explore the ethical implications of artificial intelligence and approaches to responsible AI development.",
    instructor: "Dr. Maya Patel",
    instructorRole: "AI Ethics Researcher",
    instructorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces",
    level: "All Levels" as const,
    duration: "6 weeks",
    rating: 4.7,
    students: 5320,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=400&fit=crop",
    price: 89.99,
    category: "AI Ethics"
  },
  {
    id: "ai-for-beginners",
    title: "AI for Absolute Beginners",
    description: "A gentle introduction to artificial intelligence concepts with no technical background required.",
    instructor: "Alex Rivera",
    instructorRole: "AI Educator",
    instructorAvatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=faces",
    level: "Beginner" as const,
    duration: "8 weeks",
    rating: 4.9,
    students: 18600,
    image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800&h=400&fit=crop",
    price: "Free" as const,
    category: "AI Fundamentals"
  }
];

export default function FeaturedCourses() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-neural/5 via-luminous/5 to-teal/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-neural mb-2">
                Featured AI Courses
              </h2>
              <p className="text-gray-600 max-w-2xl">
                Expand your skills with our expertly crafted AI courses designed for all experience levels.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button 
                variant="outline"
                className="border-neural text-neural hover:bg-neural hover:text-white"
                asChild
              >
                <Link to="/ai-courses">
                  View All Courses
                </Link>
              </Button>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-10 text-center">
            <Button asChild className="cta-button px-10 py-6 text-lg">
              <Link to="/ai-courses">Explore All Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
