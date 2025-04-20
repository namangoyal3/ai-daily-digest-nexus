import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";
import BlogCardSkeleton from "./skeletons/BlogCardSkeleton";

const recentBlogs = [
  {
    id: 1,
    title: "The Future of AI in 2025: Trends and Predictions",
    excerpt: "Explore the emerging trends and innovations that will shape artificial intelligence in the coming year.",
    date: "2025-04-15",
    readTime: "5 min read",
    category: "AI Trends",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
  },
  {
    id: 2,
    title: "Understanding Large Language Models",
    excerpt: "A comprehensive guide to how LLMs work and their impact on various industries.",
    date: "2025-04-14",
    readTime: "7 min read",
    category: "Deep Learning",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
  },
  {
    id: 3,
    title: "AI Ethics: Navigating the Challenges",
    excerpt: "Key considerations for responsible AI development and implementation.",
    date: "2025-04-13",
    readTime: "6 min read",
    category: "AI Ethics",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
  }
];

export default function RecentBlogs() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-10 md:py-16 bg-gradient-to-br from-white via-purple-50/10 to-blue-50/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-aiblue">
            Latest Insights from AI Daily Digest
          </h2>
          <p className="text-gray-600 text-base md:text-lg px-4">
            Stay informed with our latest articles and analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {isLoading ? (
            Array(3).fill(0).map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))
          ) : (
            recentBlogs.map((blog) => (
              <Link to={`/ai-blogs/${blog.id}`} key={blog.id}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
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
                </Card>
              </Link>
            ))
          )}
        </div>

        <div className="text-center">
          <Button 
            asChild
            className="w-full md:w-auto bg-gradient-to-r from-aiblue to-aipurple text-white hover:from-aiblue-dark hover:to-aipurple-dark font-medium px-6 py-2 hover:shadow-lg transition-all"
          >
            <Link to="/ai-blogs">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
