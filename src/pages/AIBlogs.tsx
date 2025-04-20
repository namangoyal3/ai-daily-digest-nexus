
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// This would typically come from an API
const blogs = [
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
  },
  // More blog posts...
];

const categories = ["All", "AI Trends", "Deep Learning", "AI Ethics", "Machine Learning", "AI Applications"];

export default function AIBlogs() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const filteredBlogs = selectedCategory === "All" 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>AI Daily Digest - Latest AI Insights and Analysis</title>
        <meta name="description" content="Discover the latest insights, trends, and analysis in artificial intelligence. Stay informed with our expert articles on AI technology, ethics, and applications." />
        <meta name="keywords" content="AI blogs, artificial intelligence articles, AI insights, tech blog, AI analysis, AI trends" />
        <meta property="og:title" content="AI Daily Digest - Latest AI Insights and Analysis" />
        <meta property="og:description" content="Expert articles and analysis on the latest developments in artificial intelligence." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        <Header />
        
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-aiblue">
              AI Insights & Analysis
            </h1>
            <p className="text-gray-600 text-lg md:text-xl">
              Discover in-depth articles about artificial intelligence, machine learning, and their impact on various industries
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full transition-all hover:shadow-md ${
                  selectedCategory === category 
                    ? "bg-gradient-to-r from-aiblue to-aipurple hover:from-aiblue-dark hover:to-aipurple-dark text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredBlogs.map((blog) => (
              <Link to={`/ai-blogs/${blog.id}`} key={blog.id}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <FileText className="h-4 w-4" />
                      <span>{blog.category}</span>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </div>
                    <CardTitle className="text-xl mb-2 line-clamp-2 group-hover:text-aiblue transition-colors">{blog.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{blog.excerpt}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
