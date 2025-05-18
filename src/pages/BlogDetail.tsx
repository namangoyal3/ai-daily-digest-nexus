
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft, Calendar, User } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { submitToGoogleSheets } from "@/lib/googleSheets";

export default function BlogDetail() {
  const { blogId } = useParams<{ blogId: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");

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

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Add blog post ID as source for tracking
      const result = await submitToGoogleSheets(email, 'blog-post-' + blogId);
      
      if (result.success) {
        toast.success("Thanks for subscribing!");
        setEmail("");
      } else {
        setEmailError(result.error || "Something went wrong. Please try again.");
        toast.error("Subscription failed. Please try again.");
      }
    } catch (err) {
      console.error("Error in blog subscription:", err);
      setEmailError("Failed to subscribe. Please try again later.");
      toast.error("Connection error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        
        <main className="container mx-auto px-4 md:px-6 py-8 md:py-16">
          <div className="max-w-5xl mx-auto">
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
                <article className="bg-white rounded-xl shadow-sm overflow-hidden mb-12">
                  <div className="w-full h-64 md:h-[400px] lg:h-[450px] relative">
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
                    <div className="flex flex-wrap items-center justify-between mb-6 md:mb-8 gap-4 max-w-5xl mx-auto">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">NeuralNextGen</p>
                          <p className="text-xs text-gray-500">AI Research Team</p>
                        </div>
                      </div>
                    </div>

                    <div className="max-w-5xl mx-auto">
                      <BlogContent content={blog.content} />
                    </div>

                    <Separator className="my-8 max-w-5xl mx-auto" />

                    {/* Blog Subscription Form */}
                    <div className="max-w-5xl mx-auto mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
                      <div className="text-center mb-6">
                        <h3 className="font-heading font-bold text-xl md:text-2xl text-aiblue mb-2">
                          Subscribe Now for More AI Insights
                        </h3>
                        <p className="text-gray-600 max-w-lg mx-auto">
                          Join our newsletter and get exclusive access to cutting-edge AI research, expert analyses, and industry trends delivered to your inbox.
                        </p>
                      </div>
                      
                      <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                        <div className="mb-4">
                          <Label htmlFor="blog-subscribe-email" className="sr-only">
                            Email address
                          </Label>
                          <Input
                            id="blog-subscribe-email"
                            type="email"
                            placeholder="you@example.com"
                            className={`h-12 text-base ${emailError ? "border-red-500" : ""}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isSubmitting}
                          />
                          {emailError && (
                            <p className="mt-1 text-sm text-red-500">{emailError}</p>
                          )}
                        </div>
                        <Button 
                          type="submit"
                          className="w-full h-12 bg-gradient-to-r from-aiblue to-aipurple text-white hover:from-aipurple hover:to-aiblue transition-all font-medium"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Subscribing..." : "Subscribe Now"}
                        </Button>
                        <p className="mt-2 text-xs text-center text-gray-500">
                          By subscribing, you agree to our privacy policy and terms of service.
                        </p>
                      </form>
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
          </div>
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}
