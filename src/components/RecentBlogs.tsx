
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import BlogCardSkeleton from "./skeletons/BlogCardSkeleton";

const recentBlogs = [
  {
    id: 1,
    title: "Multimodal AI Systems: The Next Frontier in Human-Computer Interaction",
    excerpt: "How systems that combine vision, language, and audio understanding are transforming the way we interact with technology.",
    date: "2025-04-29",
    readTime: "6 min read",
    category: "Emerging Tech",
    image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a"
  },
  {
    id: 2,
    title: "Quantum Computing and AI: A New Paradigm for Machine Learning",
    excerpt: "Exploring how quantum algorithms are beginning to reshape the foundations of deep learning and neural network design.",
    date: "2025-04-27",
    readTime: "8 min read",
    category: "Quantum AI",
    image: "https://images.unsplash.com/photo-1516192518150-0d8fee5425e3"
  },
  {
    id: 3,
    title: "Edge AI Development: Practical Solutions for Privacy-First Applications",
    excerpt: "Best practices for deploying machine learning models directly on devices without compromising user privacy or security.",
    date: "2025-04-25",
    readTime: "7 min read",
    category: "AI Development",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f"
  }
];

export default function RecentBlogs() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Simulating API fetch with a timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        // In a real app, you would fetch data from an API here
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load blog articles. Please try again later.");
        setIsLoading(false);
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="py-10 md:py-16 w-full max-w-full bg-gradient-to-br from-white via-purple-50/10 to-blue-50/10">
      <style>
        {`
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
        }
        #root {
          width: 100vw;
          max-width: 100vw;
          margin: 0;
          padding: 0;
        }
        `}
      </style>
      
      <div className="container mx-auto px-4 full-width-container">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-aiblue">
            Latest Insights from Tech Horizon
          </h2>
          <p className="text-gray-600 text-base md:text-lg px-4">
            Stay informed with our latest articles and analysis
          </p>
        </div>

        {error ? (
          <div className="text-center py-10">
            <p className="text-red-500 mb-4">{error}</p>
            <Button 
              onClick={() => {setIsLoading(true); setError(null); setTimeout(() => setIsLoading(false), 1000);}}
              className="bg-gradient-to-r from-aiblue to-aipurple text-white"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            {isLoading ? (
              Array(3).fill(0).map((_, index) => (
                <BlogCardSkeleton key={index} />
              ))
            ) : (
              recentBlogs.map((blog) => (
                <Link to={`/ai-blogs/${blog.id}`} key={blog.id} className="focus:outline-none focus:ring-2 focus:ring-aiblue">
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 group relative overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                      <img 
                        src={blog.image} 
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <CardHeader className="p-4 md:p-6">
                      <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-500 mb-2">
                        <FileText className="h-4 w-4 flex-shrink-0" />
                        <span>{blog.category}</span>
                        <span>•</span>
                        <span>{blog.readTime}</span>
                      </div>
                      <CardTitle className="text-lg md:text-xl mb-2 line-clamp-2 group-hover:text-aiblue transition-colors">
                        {blog.title}
                      </CardTitle>
                      <CardDescription className="text-sm md:text-base line-clamp-3">
                        {blog.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                      <span className="text-white font-medium text-sm px-3 py-1 rounded-full bg-aiblue/80 backdrop-blur-sm">
                        Read Article
                      </span>
                    </div>
                  </Card>
                </Link>
              ))
            )}
          </div>
        )}

        <div className="text-center">
          <Button 
            asChild
            className="w-full md:w-auto bg-gradient-to-r from-aiblue to-aipurple text-white hover:from-aipurple hover:to-aiblue font-medium px-8 py-2 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
          >
            <Link to="/ai-blogs" className="flex items-center justify-center">
              <span className="relative z-10">View All Articles</span>
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              <span className="absolute inset-0 bg-gradient-to-r from-aiblue-dark to-aipurple-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
