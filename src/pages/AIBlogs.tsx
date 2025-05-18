
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Settings, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCardSkeleton from "@/components/skeletons/BlogCardSkeleton";
import { getBlogs, getBlogsByCategory, generateDailyBlog } from "@/lib/blogService";
import { Blog } from "@/types/blog";
import { toast } from "sonner";

const categories = ["All", "AI Trends", "Deep Learning", "AI Ethics", "Machine Learning", "AI Applications"];

export default function AIBlogs() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const data = await getBlogsByCategory(selectedCategory);
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        toast.error("Failed to load blog posts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [selectedCategory]);

  const handleGeneratePost = async () => {
    setIsGenerating(true);
    try {
      const apiKey = localStorage.getItem('perplexity_api_key');
      if (!apiKey) {
        toast.error("API key is missing", {
          description: "Please add your Perplexity API key in settings",
          action: {
            label: "Settings",
            onClick: () => window.location.href = "/blog-settings",
          },
        });
        return;
      }
      
      const newBlog = await generateDailyBlog();
      
      // Refresh the blog list with the new post
      if (selectedCategory === "All" || selectedCategory === newBlog.category) {
        setBlogs(prevBlogs => [newBlog, ...prevBlogs]);
      }
      
      toast.success("New blog post generated", {
        description: `"${newBlog.title}" has been created`,
        action: {
          label: "View",
          onClick: () => window.location.href = `/ai-blogs/${newBlog.id}`,
        },
      });
    } catch (error) {
      console.error("Error generating blog:", error);
      toast.error("Failed to generate blog post", {
        description: "Please check your API key in settings",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>AI Insights & Analysis - NeuralNextGen</title>
        <meta name="description" content="Discover the latest insights, trends, and analysis in artificial intelligence. Stay informed with our expert articles on AI technology, ethics, and applications." />
        <meta name="keywords" content="AI blogs, artificial intelligence articles, AI insights, tech blog, AI analysis, AI trends" />
        <meta property="og:title" content="AI Insights & Analysis - NeuralNextGen" />
        <meta property="og:description" content="Expert articles and analysis on the latest developments in artificial intelligence." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        <Header />
        
        <main className="container mx-auto px-4 py-8 md:py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-12">
            <div className="max-w-3xl">
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-aiblue">
                AI Insights & Analysis
              </h1>
              <p className="text-gray-600 text-base md:text-lg lg:text-xl">
                Discover in-depth articles about artificial intelligence, machine learning, and their impact on various industries
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleGeneratePost}
                disabled={isGenerating}
                className="whitespace-nowrap"
              >
                <RefreshCcw className={`mr-2 h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} />
                {isGenerating ? "Generating..." : "Generate Post"}
              </Button>
              <Button variant="outline" asChild>
                <Link to="/blog-settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-3 justify-center mb-8 md:mb-12 px-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`text-sm md:text-base rounded-full transition-all hover:shadow-md ${
                  selectedCategory === category 
                    ? "bg-gradient-to-r from-aiblue to-aipurple text-white hover:from-aipurple hover:to-aiblue"
                    : "hover:bg-gray-100 text-aiblue hover:text-aipurple border-aiblue"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            {isLoading ? (
              Array(6).fill(0).map((_, index) => (
                <BlogCardSkeleton key={index} />
              ))
            ) : blogs.length > 0 ? (
              blogs.map((blog) => (
                <Link to={`/ai-blogs/${blog.id}`} key={blog.id} className="focus:outline-none focus:ring-2 focus:ring-aiblue">
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group">
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
            ) : (
              <div className="col-span-1 md:col-span-3 text-center py-12">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No articles found</h3>
                <p className="text-gray-500 mb-6">There are no articles available in this category yet.</p>
                <Button onClick={handleGeneratePost} disabled={isGenerating}>
                  <RefreshCcw className={`mr-2 h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} />
                  {isGenerating ? "Generating..." : "Generate First Post"}
                </Button>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
