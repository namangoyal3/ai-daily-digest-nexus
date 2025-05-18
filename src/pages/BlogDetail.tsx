
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft, Calendar, Share2, Bookmark, User } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import BlogContent from "@/components/blog/BlogContent";
import BlogSkeleton from "@/components/skeletons/BlogSkeleton";
import { getBlogById } from "@/lib/blogService";
import { Blog } from "@/types/blog";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function BlogDetail() {
  const { blogId } = useParams<{ blogId: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        if (!blogId) {
          throw new Error("Blog ID not provided");
        }
        
        const blogData = await getBlogById(blogId);
        setBlog(blogData);
        setError(null);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to load the blog post. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
    // Scroll to top when navigating to a new blog
    window.scrollTo(0, 0);
  }, [blogId]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        <Header />
        <div className="container mx-auto px-4 py-16 flex flex-col items-center">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-xl w-full text-center">
            <h2 className="text-2xl font-heading font-bold text-gray-800 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button asChild>
              <Link to="/ai-blogs">Return to Blog List</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        {/* Only add Helmet if blog exists to avoid the Symbol error */}
        {blog && (
          <Helmet>
            <title>{blog.title} | NeuralNextGen</title>
            <meta name="description" content={blog.excerpt} />
            <meta property="og:title" content={blog.title} />
            <meta property="og:description" content={blog.excerpt} />
            <meta property="og:image" content={blog.image} />
            <meta property="og:type" content="article" />
            <meta property="article:published_time" content={blog.date} />
            <meta property="article:section" content={blog.category} />
            <meta name="keywords" content={`AI, artificial intelligence, ${blog.category}, machine learning, technology`} />
          </Helmet>
        )}
        
        <Header />
        
        <main className="container mx-auto px-4 py-8 md:py-16">
          <Link 
            to="/ai-blogs" 
            className="inline-flex items-center text-aiblue hover:text-aipurple mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to All Articles</span>
          </Link>

          {isLoading ? (
            <BlogSkeleton />
          ) : blog ? (
            <>
              <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="w-full h-64 md:h-[400px] relative">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                    <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-white/90 mb-3">
                      <span className="bg-aipurple/80 backdrop-blur-sm px-3 py-1 rounded-full">
                        {blog.category}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {blog.date}
                      </span>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </div>
                    <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                      {blog.title}
                    </h1>
                  </div>
                </div>

                <div className="p-4 sm:p-6 md:p-8 lg:p-10">
                  <div className="flex flex-wrap items-center justify-between mb-6 md:mb-8 gap-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">NeuralNextGen</p>
                        <p className="text-xs text-gray-500">AI Research Team</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="rounded-full hover:bg-gray-100">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full hover:bg-gray-100">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <BlogContent content={blog.content} />

                  <Separator className="my-8" />

                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-6">
                    <div>
                      <h3 className="font-heading font-semibold mb-3">Share this article</h3>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="rounded-full">Twitter</Button>
                        <Button variant="outline" size="sm" className="rounded-full">LinkedIn</Button>
                        <Button variant="outline" size="sm" className="rounded-full">Facebook</Button>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <h3 className="font-heading font-semibold mb-3">Subscribe to our newsletter</h3>
                      <Button className="bg-gradient-to-r from-aiblue to-aipurple text-white hover:from-aipurple hover:to-aiblue transition-all">
                        Subscribe Now
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            </>
          ) : (
            <div className="text-center py-20">
              <h2 className="font-heading text-2xl text-gray-800">Blog post not found</h2>
              <p className="text-gray-600 mt-2 mb-6">The article you're looking for doesn't exist or has been moved.</p>
              <Button asChild>
                <Link to="/ai-blogs">Return to Blog List</Link>
              </Button>
            </div>
          )}

          {blog && <RelatedBlogs currentBlogId={blog.id.toString()} category={blog.category} />}
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}
