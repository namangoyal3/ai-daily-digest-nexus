
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { getRelatedBlogs } from "@/lib/blogService";
import { Blog } from "@/types/blog";
import BlogCardSkeleton from "@/components/skeletons/BlogCardSkeleton";

interface RelatedBlogsProps {
  currentBlogId: string;
  category?: string;
}

export default function RelatedBlogs({ currentBlogId, category }: RelatedBlogsProps) {
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedBlogs = async () => {
      setIsLoading(true);
      try {
        if (!category) {
          setRelatedBlogs([]);
          return;
        }
        
        const blogs = await getRelatedBlogs(currentBlogId, category);
        setRelatedBlogs(blogs);
      } catch (error) {
        console.error("Error fetching related blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedBlogs();
  }, [currentBlogId, category]);

  if (relatedBlogs.length === 0 && !isLoading) return null;

  return (
    <section className="max-w-6xl mx-auto mt-16 md:mt-24">
      <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-aiblue">
        Related Articles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {isLoading ? (
          Array(3).fill(0).map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))
        ) : (
          relatedBlogs.map((blog) => (
            <Link to={`/ai-blogs/${blog.id}`} key={blog.id} className="focus:outline-none focus:ring-2 focus:ring-aiblue">
              <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                  <img 
                    src={blog.image_url || 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485'} 
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
                    <span>{blog.read_time}</span>
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
    </section>
  );
}
