
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { GraduationCap, Clock, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export interface CourseProps {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorRole: string;
  instructorAvatar: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  duration: string;
  rating: number;
  students: number;
  image: string;
  price: number | "Free";
  category: string;
  featured?: boolean;
}

export function CourseCard({ course }: { course: CourseProps }) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="overflow-hidden flex flex-col h-full neural-card neural-card-hover">
        <div className="relative">
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-48 object-cover"
          />
          {course.featured && (
            <Badge className="absolute top-3 right-3 bg-gradient-to-r from-neural to-luminous text-white border-none">
              Featured
            </Badge>
          )}
        </div>

        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <Badge variant="outline" className="bg-luminous/10 text-luminous border-luminous/20">
              {course.category}
            </Badge>
            <div className="flex items-center">
              <Badge variant="outline" className="bg-neural/10 text-neural border-neural/20 flex items-center">
                <GraduationCap className="h-3 w-3 mr-1" />
                {course.level}
              </Badge>
            </div>
          </div>
          <h3 className="font-heading text-xl mt-2 font-bold text-neural line-clamp-2">
            {course.title}
          </h3>
        </CardHeader>

        <CardContent className="flex-grow">
          <p className="text-gray-600 mb-4 line-clamp-2">
            {course.description}
          </p>
          
          <div className="flex items-center mb-4">
            <img 
              src={course.instructorAvatar} 
              alt={course.instructor} 
              className="w-8 h-8 rounded-full mr-2 object-cover" 
            />
            <div>
              <p className="text-sm font-medium">{course.instructor}</p>
              <p className="text-xs text-gray-500">{course.instructorRole}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
              <Clock className="h-4 w-4 text-neural mb-1" />
              <span className="text-xs text-gray-600">{course.duration}</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
              <Star className="h-4 w-4 text-gold mb-1 fill-gold" />
              <span className="text-xs text-gray-600">{course.rating}</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
              <Users className="h-4 w-4 text-luminous mb-1" />
              <span className="text-xs text-gray-600">{course.students.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t pt-4 flex justify-between items-center">
          <div>
            {typeof course.price === "number" ? (
              <span className="text-lg font-bold">${course.price.toFixed(2)}</span>
            ) : (
              <span className="text-lg font-bold text-green-600">{course.price}</span>
            )}
          </div>
          <Link 
            to={`/ai-courses/${course.id}`} 
            className="bg-gradient-to-r from-neural to-luminous text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow"
          >
            View Course
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
