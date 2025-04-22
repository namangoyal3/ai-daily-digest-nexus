
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Users, Clock, ArrowRight, BadgeCheck } from "lucide-react";

interface CourseCardProps {
  title: string;
  provider: string;
  image: string;
  rating: number;
  students: number;
  duration: string;
  free?: boolean;
  price?: string;
  bestSeller?: boolean;
  verified?: boolean;
}

const CourseCard = ({ 
  title, provider, image, rating, students, duration, free, price, bestSeller, verified 
}: CourseCardProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-40 object-cover"
        />
        {bestSeller && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-xs font-semibold px-2 py-1 rounded">
            BESTSELLER
          </div>
        )}
        {free && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
            FREE
          </div>
        )}
      </div>
      
      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="flex items-start mb-2">
          {verified && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full flex items-center mr-2 mt-1">
              <BadgeCheck className="h-3 w-3 mr-0.5" /> Verified
            </span>
          )}
          <h3 className="font-bold text-base line-clamp-2">{title}</h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-2">{provider}</p>
        
        <div className="flex items-center mb-1">
          <span className="text-yellow-500 font-bold mr-1">{rating}</span>
          <div className="flex">
            {Array(5).fill(0).map((_, i) => (
              <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(rating) ? 'fill-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({students.toLocaleString()})</span>
        </div>
        
        <div className="flex items-center text-xs text-gray-600 mb-3">
          <Clock className="h-3 w-3 mr-1" /> {duration}
        </div>
        
        <div className="mt-auto flex items-center">
          {free ? (
            <span className="font-bold text-green-600">Free</span>
          ) : (
            <span className="font-bold text-gray-900">{price}</span>
          )}
          <Button variant="ghost" size="sm" className="ml-auto text-aiblue hover:text-aiblue/90">
            View Details <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TrendingCourses() {
  const courses = [
    {
      title: "Generative AI Fundamentals: ChatGPT, Midjourney & DALL-E",
      provider: "Coursera",
      image: "https://images.unsplash.com/photo-1682687221080-5cb261c645cb?w=500",
      rating: 4.8,
      students: 45250,
      duration: "24 hours",
      free: true,
      verified: true
    },
    {
      title: "Machine Learning Specialization: Zero to Hero",
      provider: "Stanford Online",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500",
      rating: 4.9,
      students: 32780,
      duration: "3 months",
      price: "$49",
      bestSeller: true,
      verified: true
    },
    {
      title: "AI for Business Leaders: Strategy & Implementation",
      provider: "NeuralNextGen",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500",
      rating: 4.7,
      students: 8432,
      duration: "6 weeks",
      price: "$199"
    },
    {
      title: "Ethical AI: Responsible Development Practices",
      provider: "MIT Open Learning",
      image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=500",
      rating: 4.6,
      students: 12540,
      duration: "4 weeks",
      free: true
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-baseline mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Trending This Week</h2>
            <p className="text-gray-600">Popular courses based on student enrollment and ratings</p>
          </div>
          <Button variant="link" className="text-aiblue">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
}
