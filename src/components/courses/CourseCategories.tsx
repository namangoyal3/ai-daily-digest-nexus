
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, BookOpen, Brain, Briefcase, Users, Building, Lightbulb } from "lucide-react";

interface CategoryProps {
  icon: React.ReactNode;
  name: string;
  count: number;
}

const CategoryCard = ({ icon, name, count }: CategoryProps) => (
  <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
    <div className="bg-gradient-to-br from-blue-50 to-violet-50 p-3 rounded-md">
      {icon}
    </div>
    <div>
      <h3 className="font-medium text-gray-900">{name}</h3>
      <p className="text-sm text-gray-500">{count} courses</p>
    </div>
  </div>
);

export default function CourseCategories() {
  const categories = [
    { icon: <Code className="h-5 w-5 text-blue-600" />, name: "Programming & Development", count: 325 },
    { icon: <Brain className="h-5 w-5 text-purple-600" />, name: "Generative AI", count: 187 },
    { icon: <Briefcase className="h-5 w-5 text-emerald-600" />, name: "Business & Strategy", count: 143 },
    { icon: <BookOpen className="h-5 w-5 text-amber-600" />, name: "Machine Learning", count: 256 },
    { icon: <Users className="h-5 w-5 text-rose-600" />, name: "Ethics & Society", count: 78 },
    { icon: <Building className="h-5 w-5 text-slate-600" />, name: "Enterprise AI", count: 92 },
    { icon: <Lightbulb className="h-5 w-5 text-orange-600" />, name: "AI Tools & Applications", count: 215 },
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Explore AI Course Categories</h2>
          <p className="text-gray-600">Browse our comprehensive collection of AI courses by category</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="bg-white p-1 shadow-sm">
              <TabsTrigger value="all">All Categories</TabsTrigger>
              <TabsTrigger value="free">Free Resources</TabsTrigger>
              <TabsTrigger value="premium">Premium Courses</TabsTrigger>
              <TabsTrigger value="certification">Certifications</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <CategoryCard key={index} {...category} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="free" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categories.slice(0, 4).map((category, index) => (
                <CategoryCard key={index} {...category} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="premium" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categories.slice(2, 6).map((category, index) => (
                <CategoryCard key={index} {...category} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="certification" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categories.slice(1, 5).map((category, index) => (
                <CategoryCard key={index} {...category} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
