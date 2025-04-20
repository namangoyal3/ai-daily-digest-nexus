import React from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, ArrowRight } from "lucide-react";
import EditableText from "@/components/admin/edit/EditableText";
import EditableImage from "@/components/admin/edit/EditableImage";

interface AICoursesProps {
  isEditMode?: boolean;
}

export default function AICourses({ isEditMode = false }: AICoursesProps) {
  const courses = [
    {
      id: "ai-fundamentals",
      title: "AI Fundamentals",
      description: "Learn the core concepts of artificial intelligence and machine learning",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      level: "Beginner",
      duration: "4 weeks",
      students: 1245,
      rating: 4.8,
      price: "₹4,999",
      popular: true
    },
    {
      id: "deep-learning",
      title: "Deep Learning Masterclass",
      description: "Master neural networks, CNN, RNN and transformer architectures",
      image: "https://images.unsplash.com/photo-1677442135136-760c813028c0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      level: "Intermediate",
      duration: "8 weeks",
      students: 892,
      rating: 4.9,
      price: "₹7,999",
      popular: true
    },
    {
      id: "nlp-course",
      title: "Natural Language Processing",
      description: "Build AI systems that understand and generate human language",
      image: "https://images.unsplash.com/photo-1655720828018-7467e9fa5e22?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      level: "Advanced",
      duration: "6 weeks",
      students: 678,
      rating: 4.7,
      price: "₹6,999"
    },
    {
      id: "computer-vision",
      title: "Computer Vision Applications",
      description: "Create AI systems that can see and interpret visual information",
      image: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      level: "Intermediate",
      duration: "6 weeks",
      students: 745,
      rating: 4.6,
      price: "₹6,499"
    },
    {
      id: "ai-ethics",
      title: "AI Ethics & Governance",
      description: "Understand the ethical implications and governance of AI systems",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      level: "All Levels",
      duration: "3 weeks",
      students: 512,
      rating: 4.5,
      price: "₹3,999"
    },
    {
      id: "ai-business",
      title: "AI for Business Leaders",
      description: "Learn how to implement AI strategies in your organization",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      level: "Intermediate",
      duration: "4 weeks",
      students: 823,
      rating: 4.7,
      price: "₹5,999",
      new: true
    }
  ];

  const renderText = (text: string, path: string, className?: string) => {
    return isEditMode ? (
      <EditableText path={path} className={className}>{text}</EditableText>
    ) : (
      <span className={className}>{text}</span>
    );
  };

  const renderImage = (src: string, alt: string, path: string, className?: string) => {
    return isEditMode ? (
      <EditableImage src={src} alt={alt} path={path} className={className} />
    ) : (
      <img src={src} alt={alt} className={className} />
    );
  };

  return (
    <>
      <Helmet>
        <title>AI Courses - NeuralNextGen</title>
        <meta name="description" content="Comprehensive AI courses for all skill levels. Learn AI fundamentals, deep learning, NLP, computer vision and more." />
      </Helmet>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-aiblue/5 via-aipurple/5 to-aiteal/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-aiblue leading-tight mb-6">
                  {renderText("Master AI Skills with Expert-Led Courses", "courses.hero.title")}
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  {renderText("Comprehensive, practical AI education for beginners to advanced practitioners. Learn at your own pace with hands-on projects.", "courses.hero.description")}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-gradient-to-r from-aiblue to-aipurple hover:from-aiblue-dark hover:to-aipurple-dark">
                    {renderText("Browse Courses", "courses.hero.primaryCta")}
                  </Button>
                  <Button variant="outline" className="border-aiblue text-aiblue hover:bg-aiblue hover:text-white">
                    {renderText("View Course Catalog", "courses.hero.secondaryCta")}
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2">
                {renderImage(
                  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                  "AI Education",
                  "courses.hero.image",
                  "rounded-xl shadow-lg w-full"
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Course Listing */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-aiblue">
                {renderText("Our AI Courses", "courses.listing.title")}
              </h2>
              <p className="text-gray-600 text-lg">
                {renderText("Comprehensive curriculum designed by AI experts and industry professionals", "courses.listing.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    {renderImage(
                      course.image,
                      course.title,
                      `courses.${course.id}.image`,
                      "w-full h-full object-cover"
                    )}
                    {(course.popular || course.new) && (
                      <div className="absolute top-2 right-2">
                        {course.popular && (
                          <Badge className="bg-amber-500 text-white hover:bg-amber-600">
                            Popular
                          </Badge>
                        )}
                        {course.new && (
                          <Badge className="bg-green-500 text-white hover:bg-green-600 ml-2">
                            New
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-heading font-bold text-xl">
                        {renderText(course.title, `courses.${course.id}.title`)}
                      </h3>
                      <div className="flex items-center text-amber-500">
                        <Star className="fill-current h-4 w-4" />
                        <span className="ml-1 text-sm font-medium">
                          {renderText(course.rating.toString(), `courses.${course.id}.rating`)}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {renderText(course.description, `courses.${course.id}.description`)}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="bg-gray-100">
                        {renderText(course.level, `courses.${course.id}.level`)}
                      </Badge>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="h-3 w-3 mr-1" />
                        {renderText(course.duration, `courses.${course.id}.duration`)}
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Users className="h-3 w-3 mr-1" />
                        {renderText(course.students.toString(), `courses.${course.id}.students`)} students
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-lg text-aiblue">
                        {renderText(course.price, `courses.${course.id}.price`)}
                      </div>
                      <Button size="sm" className="bg-aiblue hover:bg-aiblue-dark">
                        Enroll Now <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" className="border-aiblue text-aiblue hover:bg-aiblue hover:text-white">
                {renderText("View All Courses", "courses.listing.viewAllCta")}
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-aiblue">
                {renderText("Why Choose Our AI Courses", "courses.whyChoose.title")}
              </h2>
              <p className="text-gray-600 text-lg">
                {renderText("What makes our AI education stand out from the rest", "courses.whyChoose.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-aiblue/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-aiblue" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">
                  {renderText("Expert Instructors", "courses.whyChoose.feature1.title")}
                </h3>
                <p className="text-gray-600">
                  {renderText("Learn from AI practitioners with real-world experience at top tech companies and research labs.", "courses.whyChoose.feature1.description")}
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-aipurple/10 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-aipurple" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">
                  {renderText("Practical Projects", "courses.whyChoose.feature2.title")}
                </h3>
                <p className="text-gray-600">
                  {renderText("Build real-world AI applications that you can showcase in your portfolio and apply to real problems.", "courses.whyChoose.feature2.description")}
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-aiteal/10 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-aiteal" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">
                  {renderText("Flexible Learning", "courses.whyChoose.feature3.title")}
                </h3>
                <p className="text-gray-600">
                  {renderText("Study at your own pace with lifetime access to course materials and regular content updates.", "courses.whyChoose.feature3.description")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-aiblue to-aipurple text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                {renderText("Ready to Start Your AI Journey?", "courses.cta.title")}
              </h2>
              <p className="text-xl opacity-90 mb-8">
                {renderText("Join thousands of students already learning AI with our comprehensive courses", "courses.cta.description")}
              </p>
              <Button size="lg" className="bg-white text-aiblue hover:bg-gray-100">
                {renderText("Get Started Today", "courses.cta.buttonText")}
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {isEditMode && (
        <div className="fixed bottom-20 right-6 bg-black/80 text-white px-4 py-2 rounded text-sm">
          Edit mode active for AI Courses page
        </div>
      )}
    </>
  );
}
