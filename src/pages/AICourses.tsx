
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { GraduationCap, Book, Code, Brain } from "lucide-react";

export default function AICourses() {
  return (
    <>
      <Helmet>
        <title>AI Courses - NeuralNextGen</title>
        <meta name="description" content="Learn AI through practical, hands-on courses designed for all skill levels. Master artificial intelligence concepts with our comprehensive curriculum." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="py-20 px-4">
            <div className="container mx-auto max-w-6xl text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-aiblue mb-6">
                Master AI with Our Courses
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Comprehensive AI courses designed to take you from beginner to expert. 
                Learn at your own pace with practical, hands-on projects.
              </p>
              <Button className="bg-gradient-to-r from-aiblue to-aipurple text-white px-8 py-6 text-lg">
                Browse Courses
              </Button>
            </div>
          </section>

          {/* Course Categories */}
          <section className="py-16 bg-gradient-to-br from-aiblue/5 to-aipurple/5">
            <div className="container mx-auto max-w-6xl px-4">
              <h2 className="text-3xl font-bold text-center mb-16">Course Categories</h2>
              
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <Book className="w-12 h-12 text-aiblue mb-4" />
                  <h3 className="text-xl font-bold mb-2">AI Fundamentals</h3>
                  <p className="text-gray-600 mb-4">
                    Master the basics of artificial intelligence and machine learning.
                  </p>
                  <Button variant="outline" className="w-full">Learn More</Button>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <Code className="w-12 h-12 text-aiblue mb-4" />
                  <h3 className="text-xl font-bold mb-2">AI Development</h3>
                  <p className="text-gray-600 mb-4">
                    Learn to build and deploy AI models and applications.
                  </p>
                  <Button variant="outline" className="w-full">Learn More</Button>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <Brain className="w-12 h-12 text-aiblue mb-4" />
                  <h3 className="text-xl font-bold mb-2">Advanced AI</h3>
                  <p className="text-gray-600 mb-4">
                    Dive deep into advanced AI concepts and architectures.
                  </p>
                  <Button variant="outline" className="w-full">Learn More</Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
